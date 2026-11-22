import { createHmac, timingSafeEqual } from 'node:crypto';
import { gunzipSync } from 'node:zlib';
import { z } from 'zod';
import { filterRecords, normalize, resolveCity, type PlaceRecord } from './overture-leads';

// Only open Overture extracts live here. No database imports or Google/OSM calls.
const BASE = 'https://raw.githubusercontent.com/mvthebest/overture-br-municipios/main/data/';
const manifestSchema = z.object({ release: z.string(), cities: z.record(z.object({ name: z.string(), uf: z.string(), count: z.number(), bytes: z.number() })) });
const rowsSchema = z.array(z.object({
  id: z.string(), n: z.string(), cat: z.string().nullable(), sub: z.string().nullable(),
  phones: z.array(z.string()), websites: z.array(z.string()).nullable(), socials: z.array(z.string()).nullable(),
  emails: z.array(z.string()).nullable(), address: z.string(), confidence: z.number(),
}));
const PAGE_SIZE = 20;
const MAX_COMPRESSED = 32 * 1024 * 1024;
const MAX_DECODED = 64 * 1024 * 1024;
const CACHE_BUDGET = 48 * 1024 * 1024;
const TTL = 30 * 60 * 1000;
const cache = new Map<string, { value: PlaceRecord[]; weight: number; expires: number }>();
const pending = new Map<string, Promise<PlaceRecord[]>>();
let manifest: { data: z.infer<typeof manifestSchema>; expires: number } | undefined;

async function bytes(url: string, max: number) {
  const res = await fetch(url, { signal: AbortSignal.timeout(25000) });
  if (!res.ok) throw new Error('A base Overture está indisponível agora. Tente novamente em instantes.');
  if (Number(res.headers.get('content-length')) > max) throw new Error('Arquivo de cidade acima do limite seguro. A busca precisa de um recorte menor.');
  const reader = res.body?.getReader();
  if (!reader) throw new Error('Não foi possível ler a base Overture.');
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > max) { await reader.cancel(); throw new Error('Arquivo de cidade acima do limite seguro.'); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  return Buffer.concat(chunks);
}

async function getManifest() {
  if (manifest && manifest.expires > Date.now()) return manifest.data;
  const data = manifestSchema.parse(JSON.parse((await bytes(`${BASE}manifest.json`, 2 * 1024 * 1024)).toString('utf8')));
  manifest = { data, expires: Date.now() + TTL };
  return data;
}

async function cityRows(id: string, release: string) {
  const key = `${release}/${id}`;
  const hit = cache.get(key);
  if (hit && hit.expires > Date.now()) {
    cache.delete(key); cache.set(key, hit);
    return hit.value;
  }
  if (pending.has(key)) return pending.get(key)!;
  const loading = (async () => {
    const raw = await bytes(`${BASE}${id}.json.gz`, MAX_COMPRESSED);
    const decoded = raw[0] === 0x1f && raw[1] === 0x8b ? gunzipSync(raw, { maxOutputLength: MAX_DECODED }) : raw;
    if (decoded.length > MAX_DECODED) throw new Error('Essa cidade precisa de um recorte menor para buscar com segurança.');
    const rows = rowsSchema.parse(JSON.parse(decoded.toString('utf8')));
    if (decoded.length * 3 < CACHE_BUDGET) {
      const weight = decoded.length * 3;
      let total = [...cache.values()].reduce((sum, v) => sum + v.weight, 0);
      while (total + weight > CACHE_BUDGET && cache.size) {
        const oldest = cache.keys().next().value!;
        total -= cache.get(oldest)!.weight;
        cache.delete(oldest);
      }
      cache.set(key, { value: rows, weight, expires: Date.now() + TTL });
    }
    return rows;
  })().finally(() => pending.delete(key));
  pending.set(key, loading);
  return loading;
}

function signingKey() {
  const key = process.env['SUPABASE_SERVICE_ROLE_KEY'];
  if (!key) throw new Error('Não foi possível validar a página da busca.');
  return key;
}
function sign(body: string) { return createHmac('sha256', signingKey()).update(body).digest('hex'); }
function cursorContext(category: string, city: string) { return `${normalize(category)}|${normalize(city)}`; }
export function readCursor(token: string | undefined, category: string, city: string): number {
  if (!token) return 0;
  try {
    const [body, signature] = token.split('.');
    if (!body || !signature || !/^[0-9a-f]{64}$/.test(signature)) throw 0;
    if (!timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(sign(body), 'hex'))) throw 0;
    const data = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (data.q !== cursorContext(category, city) || data.exp < Date.now() || !Number.isSafeInteger(data.offset) || data.offset < PAGE_SIZE || data.offset % PAGE_SIZE !== 0) throw 0;
    return data.offset as number;
  } catch { throw new Error('A página da busca expirou ou é inválida. Faça a pesquisa novamente.'); }
}
function cursor(offset: number, category: string, city: string) {
  const body = Buffer.from(JSON.stringify({ q: cursorContext(category, city), offset, exp: Date.now() + 60 * 60 * 1000 })).toString('base64url');
  return `${body}.${sign(body)}`;
}

export async function searchOverture(category: string, city: string, offset: number) {
  const data = await getManifest();
  const municipality = resolveCity(city, data.cities);
  const rows = await cityRows(municipality.id, data.release);
  const result = filterRecords(rows, category);
  return {
    leads: result.leads.slice(offset, offset + PAGE_SIZE),
    scanned: offset === 0 ? result.scanned : 0,
    nextPageToken: offset + PAGE_SIZE < result.leads.length ? cursor(offset + PAGE_SIZE, category, city) : null,
    totalMatches: result.leads.length,
    dataRelease: data.release,
  };
}
