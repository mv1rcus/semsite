import { cleanBusinessName, matchesSearch } from "./business-niche";
import type { Lead } from "./leads";

/**
 * Busca alternativa de leads via OpenStreetMap (Overpass API + Nominatim).
 * Gratuita, sem chave de API e sem Google. Dados © OpenStreetMap contributors (ODbL).
 *
 * Estrutura:
 * - geocodeCity: cidade (texto livre, ex "Juiz de Fora, MG") -> bounding box via Nominatim
 * - buildOverpassQuery: categoria em pt-BR -> seletores de tags OSM + fallback por nome
 * - searchOsmLeads: executa a busca, filtra "sem site" e devolve Lead[]
 * - cache em tabela pública `osm_search_cache` (cidade+categoria, TTL 30 dias).
 *   Se a tabela ainda não existir no Supabase, a busca funciona sem cache.
 */

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";
const OVERPASS_INSTANCES = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass.private.coffee/api/interpreter",
];
const USER_AGENT = "SemSite/1.0 (+https://semsite.lovable.app)";
const CACHE_TTL_DAYS = 30;
const GEOCODE_TTL_DAYS = 90;
const MAX_RESULTS = 200;

const norm = (t: string) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

/** AND de pares chave=valor Overpass (valor pode ser regex QL). */
type TagFilter = [key: string, value: string][];

/** Mapa categoria (pt-BR, regex sem acento) -> lista de filtros OSM (OU entre eles; E dentro de cada um). Ordem importa: o primeiro que bate vence. */
const CATEGORY_TAGS: [match: RegExp, filters: TagFilter[]][] = [
  [/^medic/, [[["amenity", "doctors"]]]],
  [/dentist|odonto/, [[["amenity", "dentist"]]]],
  [/clinic/, [[["amenity", "clinic"]]]],
  [/fisio/, [[["healthcare", "physiotherapist"]], [["amenity", "clinic"]]]],
  [/psicolog/, [[["healthcare", "psychotherapist"]]]],
  [/nutri/, [[["healthcare", "nutrition_counselling"]]]],
  [/farmac|drogari/, [[["amenity", "pharmacy"]]]],
  [/laborat/, [[["healthcare", "laboratory"]]]],
  [/otic/, [[["shop", "optician"]]]],
  [/pizz/, [[["amenity", "^(restaurant|fast_food)$"], ["cuisine", "pizza"]]]],
  [/lanchon|hamburg|espetinh/, [[["amenity", "fast_food"]]]],
  [/marmit|restaur/, [[["amenity", "restaurant"]]]],
  [/padaria|panific/, [[["shop", "bakery"]]]],
  [/cafeter|coffee/, [[["amenity", "cafe"]]]],
  [/acai|sorvet/, [[["amenity", "ice_cream"]], [["shop", "ice_cream"]]]],
  [/confeit|doceri|bolo/, [[["shop", "^(confectionery|pastry)$"]]]],
  [/barbear|barber/, [[["shop", "^(barber|hairdresser)$"]]]],
  [/salao|cabele/, [[["shop", "^(hairdresser|beauty)$"]]]],
  [/manicure|unha|esmalte/, [[["shop", "beauty"]]]],
  [/sobrancelh|cilio|lash|depilac|estetic/, [[["shop", "beauty"]]]],
  [/tatuag|tattoo|piercing/, [[["shop", "tattoo"]]]],
  [/lava ?jato|lava ?car/, [[["amenity", "car_wash"]]]],
  [/borrach|pneu/, [[["shop", "tyres"]]]],
  [/auto ?eletric/, [[["shop", "car_repair"]]]],
  [/auto ?pec/, [[["shop", "car_parts"]]]],
  [/moto ?pec/, [[["shop", "motorcycle"]]]],
  [/oficina|mecanic|funilari|estetica automotiva/, [[["shop", "car_repair"]]]],
  [/eletricist/, [[["craft", "electrician"]]]],
  [/encanad|hidraul/, [[["craft", "plumber"]]]],
  [/marcenar/, [[["craft", "carpenter"]]]],
  [/vidrac|vidro/, [[["craft", "glaziery"]]]],
  [/serralh/, [[["craft", "metal_construction"]]]],
  [/material.*constr|madeireira/, [[["shop", "^(doityourself|hardware|trade)$"]]]],
  [/pintor/, [[["craft", "painter"]]]],
  [/gesso|gesseir|drywall/, [[["craft", "plasterer"]]]],
  [/climatiz|ar condicionado|refrigera/, [[["craft", "hvac"]]]],
  [/banho e tosa/, [[["shop", "^(pet_grooming|pet)$"]]]],
  [/veterin/, [[["amenity", "veterinary"]]]],
  [/pet ?shop|\bpet\b/, [[["shop", "pet"]]]],
  [/adestra/, [[["amenity", "animal_training"]]]],
  [/academ|crossfit|pilates|personal|fitness/, [[["leisure", "fitness_centre"]]]],
  [/contab/, [[["office", "accountant"]]]],
  [/advog|advocac|juridic/, [[["office", "lawyer"]]]],
  [/imobili|corretor/, [[["office", "estate_agent"]]]],
  [/assistencia tecnica|conserto|celular|informatica/, [[["shop", "repair"]], [["craft", "electronics_repair"]]]],
  [/costur|alfaiat/, [[["craft", "dressmaker"]], [["shop", "tailor"]]]],
  [/grafic|copiadora|xerox|impress/, [[["shop", "copyshop"]], [["craft", "printer"]]]],
  [/fotograf/, [[["shop", "photo"]], [["craft", "photographer"]]]],
  [/floricult|flores/, [[["shop", "florist"]]]],
  [/idioma|ingles/, [[["amenity", "language_school"]]]],
  [/auto ?escola|cfc/, [[["amenity", "driving_school"]]]],
];

/** Rótulo pt-BR para as tags OSM mais comuns (exibido no cartão do lead). */
const TAG_LABELS: Record<string, string> = {
  "shop:barber": "Barbearia", "shop:hairdresser": "Salão de beleza", "shop:beauty": "Clínica de estética",
  "shop:tattoo": "Estúdio de tatuagem", "amenity:restaurant": "Restaurante", "amenity:fast_food": "Lanchonete",
  "amenity:cafe": "Cafeteria", "shop:bakery": "Padaria", "shop:confectionery": "Confeitaria",
  "shop:pastry": "Confeitaria", "amenity:ice_cream": "Sorveteria", "shop:ice_cream": "Sorveteria",
  "amenity:pharmacy": "Farmácia", "amenity:dentist": "Dentista", "amenity:doctors": "Médico",
  "amenity:clinic": "Clínica", "amenity:veterinary": "Veterinário", "shop:pet": "Pet shop",
  "shop:pet_grooming": "Banho e tosa", "shop:optician": "Ótica", "shop:car_repair": "Oficina mecânica",
  "amenity:car_wash": "Lava jato", "shop:tyres": "Borracharia", "shop:car_parts": "Autopeças",
  "shop:motorcycle": "Moto peças", "leisure:fitness_centre": "Academia", "amenity:driving_school": "Auto escola",
  "amenity:language_school": "Escola de idiomas", "shop:florist": "Floricultura", "shop:copyshop": "Gráfica",
  "craft:printer": "Gráfica", "shop:tailor": "Costura", "craft:dressmaker": "Costura",
  "craft:electrician": "Eletricista", "craft:plumber": "Encanador", "craft:carpenter": "Marcenaria",
  "craft:glaziery": "Vidraçaria", "craft:metal_construction": "Serralheria", "craft:painter": "Pintor",
  "craft:plasterer": "Gesseiro", "craft:hvac": "Climatização", "office:accountant": "Contabilidade",
  "office:lawyer": "Advogado", "office:estate_agent": "Imobiliária", "shop:doityourself": "Material de construção",
  "shop:hardware": "Material de construção", "shop:trade": "Material de construção",
  "shop:photo": "Fotógrafo", "craft:photographer": "Fotógrafo", "shop:repair": "Assistência técnica",
  "craft:electronics_repair": "Assistência técnica",
  "healthcare:physiotherapist": "Fisioterapia", "healthcare:psychotherapist": "Psicólogo",
  "healthcare:nutrition_counselling": "Nutricionista", "healthcare:laboratory": "Laboratório",
  "amenity:animal_training": "Adestrador",
};

type BBox = { south: number; west: number; north: number; east: number };

type OsmElement = {
  type: "node" | "way" | "relation";
  id: number;
  tags?: Record<string, string>;
};

function tagLabel(tags: Record<string, string>, fallback: string): string {
  for (const key of ["shop", "amenity", "craft", "office", "leisure", "healthcare"]) {
    const value = tags[key];
    const label = value ? TAG_LABELS[`${key}:${value}`] : undefined;
    if (label) return label;
  }
  return fallback;
}

function escapeQlRegex(text: string): string {
  return text.replace(/[\\^$.*+?()[\]{}|"]/g, "\\$&");
}

function bboxClause(b: BBox): string {
  return `(${b.south},${b.west},${b.north},${b.east})`;
}

export function buildOverpassQuery(category: string, b: BBox): string {
  const n = norm(category);
  const mapped = CATEGORY_TAGS.find(([re]) => re.test(n));
  const clauses: string[] = [];
  const bb = bboxClause(b);
  if (mapped) {
    for (const filter of mapped[1]) {
      const cond = filter.map(([k, v]) => (v.includes("(") || v.includes("|") || v.includes("^") ? `["${k}"~"${v}"]` : `["${k}"="${v}"]`)).join("");
      clauses.push(`node${cond}${bb};`, `way${cond}${bb};`);
    }
  }
  // Fallback por nome: pega negócios sem a tag esperada (ex: "Barbearia do Zé" sem shop=*).
  // Usa o texto original (com acentos) para casar com os nomes no OSM.
  // Para categoria mapeada, restringe às chaves mais comuns para manter a consulta leve.
  const nameRe = escapeQlRegex(category.trim());
  const nameKeys = mapped ? ["shop", "amenity"] : ["shop", "amenity", "craft", "office", "leisure", "healthcare"];
  for (const key of nameKeys) {
    clauses.push(`node["name"~"${nameRe}",i]["${key}"]${bb};`, `way["name"~"${nameRe}",i]["${key}"]${bb};`);
  }
  return `[out:json][timeout:25];\n(\n${clauses.join("\n")}\n);\nout tags center ${MAX_RESULTS};`;
}

async function fetchJson(url: string, init: RequestInit, timeoutMs: number): Promise<unknown> {
  const res = await fetch(url, { ...init, signal: AbortSignal.timeout(timeoutMs) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function geocodeCity(city: string): Promise<BBox | null> {
  const params = new URLSearchParams({ format: "jsonv2", limit: "1", countrycodes: "br", q: city });
  const json = (await fetchJson(`${NOMINATIM_URL}?${params}`, { headers: { "User-Agent": USER_AGENT } }, 10000)) as {
    boundingbox?: [string, string, string, string];
  }[];
  const bb = json?.[0]?.boundingbox;
  if (!bb) return null;
  return { south: Number(bb[0]), north: Number(bb[1]), west: Number(bb[2]), east: Number(bb[3]) };
}

async function queryOverpass(query: string): Promise<OsmElement[]> {
  let lastError: unknown = null;
  for (const instance of OVERPASS_INSTANCES) {
    try {
      const json = (await fetchJson(
        instance,
        { method: "POST", headers: { "User-Agent": USER_AGENT, "Content-Type": "application/x-www-form-urlencoded" }, body: `data=${encodeURIComponent(query)}` },
        30000,
      )) as { elements?: OsmElement[] };
      if (Array.isArray(json?.elements)) return json.elements;
    } catch (e) {
      lastError = e;
    }
  }
  throw lastError instanceof Error ? lastError : new Error("Overpass indisponível");
}

function firstTag(tags: Record<string, string>, keys: string[]): string | null {
  for (const key of keys) {
    const value = tags[key]?.trim();
    if (value) return (value.split(";")[0] ?? "").trim();
  }
  return null;
}

function hasWebsite(tags: Record<string, string>): boolean {
  return Boolean(firstTag(tags, ["website", "contact:website", "url", "contact:url"]));
}

function buildAddress(tags: Record<string, string>): string {
  const street = tags["addr:street"];
  const number = tags["addr:housenumber"];
  const district = tags["addr:suburb"] ?? tags["addr:neighbourhood"];
  const city = tags["addr:city"];
  const parts = [
    street ? `${street}${number ? `, ${number}` : ""}` : null,
    district ?? null,
    city ?? null,
  ].filter(Boolean);
  return parts.join(" - ");
}

function toLead(el: OsmElement, categoryLabel: string, query: string): Lead | null {
  const tags = el.tags ?? {};
  const rawName = tags["name"] ?? tags["brand"];
  if (!rawName || hasWebsite(tags)) return null;
  const name = cleanBusinessName(rawName);
  const label = tagLabel(tags, categoryLabel);
  if (!matchesSearch(name, label, query)) return null;
  const phone = firstTag(tags, ["phone", "contact:phone", "contact:mobile"]);
  const whatsapp = firstTag(tags, ["contact:whatsapp", "whatsapp"]);
  const bestPhone = phone ?? whatsapp;
  return {
    id: `osm:${el.type}/${el.id}`,
    name,
    address: buildAddress(tags),
    phone: bestPhone,
    intlPhone: bestPhone,
    rating: null,
    reviews: null,
    category: label,
    mapsUrl: `https://www.openstreetmap.org/${el.type}/${el.id}`,
    email: firstTag(tags, ["email", "contact:email"]),
    instagram: firstTag(tags, ["contact:instagram", "instagram"])?.replace(/^@/, "") ?? null,
    facebook: firstTag(tags, ["contact:facebook", "facebook"]),
    source: "osm",
  };
}

export type OsmSearchResult = { leads: Lead[]; scanned: number; cached: boolean };

// Cliente Supabase solto de propósito: a tabela de cache não consta nos tipos gerados
// e qualquer falha de cache deve virar "sem cache", nunca quebrar a busca.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CacheClient = { from: (table: string) => any };

function cacheKey(city: string, category: string): string {
  return `v1|${norm(city)}|${norm(category)}`;
}

function isFresh(createdAt: string, ttlDays: number): boolean {
  return Date.now() - new Date(createdAt).getTime() < ttlDays * 24 * 60 * 60 * 1000;
}

/** Lê o cache; qualquer erro (tabela ausente, permissão) significa "sem cache". */
async function readCache(client: CacheClient, key: string): Promise<{ leads: Lead[]; scanned: number } | null> {
  try {
    const { data, error } = await client.from("osm_search_cache").select("payload, created_at").eq("cache_key", key).maybeSingle();
    if (error || !data) return null;
    const row = data as { payload?: { leads?: Lead[]; scanned?: number }; created_at?: string };
    if (!row.created_at || !isFresh(row.created_at, CACHE_TTL_DAYS) || !Array.isArray(row.payload?.leads)) return null;
    return { leads: row.payload.leads, scanned: Number(row.payload.scanned) || 0 };
  } catch {
    return null;
  }
}

async function writeCache(client: CacheClient, key: string, payload: { leads: Lead[]; scanned: number }): Promise<void> {
  try {
    await client.from("osm_search_cache").upsert({ cache_key: key, payload });
  } catch {
    // Cache é otimização; a busca nunca falha por causa dele.
  }
}

/** Busca completa: cache -> (geocode + Overpass) -> filtra "sem site" -> Lead[]. */
export async function searchOsmLeads(
  category: string,
  city: string,
  cache: CacheClient | null,
): Promise<OsmSearchResult> {
  const key = cacheKey(city, category);
  if (cache) {
    const hit = await readCache(cache, key);
    if (hit) return { ...hit, cached: true };
  }

  const bbox = await geocodeCity(city);
  if (!bbox) throw new Error("Não encontrei essa cidade no mapa. Confira o nome (ex: Juiz de Fora, MG).");

  const elements = await queryOverpass(buildOverpassQuery(category, bbox));
  const seen = new Set<string>();
  const leads: Lead[] = [];
  for (const el of elements) {
    const lead = toLead(el, category, category);
    if (!lead) continue;
    const dedupeKey = norm(lead.name);
    if (seen.has(dedupeKey)) continue;
    seen.add(dedupeKey);
    leads.push(lead);
  }
  const result = { leads, scanned: elements.length };
  if (cache) await writeCache(cache, key, result);
  return { ...result, cached: false };
}
