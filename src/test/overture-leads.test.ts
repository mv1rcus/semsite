import { describe, it, expect, vi } from 'vitest';
import { filterRecords, hasRegisteredWebsite, recordToLead, resolveCity, type PlaceRecord } from '../lib/overture-leads';

const place: PlaceRecord = { id: 'a', n: 'Barbearia do Zé', sub: 'barber', cat: 'personal_or_beauty_service', phones: ['+5532999998888'], websites: null, socials: ['https://www.instagram.com/zebarber/'], emails: null, address: 'Rua A, 1 - Juiz de Fora - MG', confidence: .9 };

describe('city resolution', () => {
  const cities = { '3136702': { name: 'Juiz de Fora', uf: 'MG', count: 1, bytes: 5 }, '1': { name: 'Bom Jesus', uf: 'RS', count: 1, bytes: 5 }, '2': { name: 'Bom Jesus', uf: 'PI', count: 1, bytes: 5 } };
  it('requires UF when city names are ambiguous', () => {
    expect(() => resolveCity('Bom Jesus', cities)).toThrow('UF');
    expect(resolveCity('Bom Jesus, PI', cities).id).toBe('2');
  });
  it('accepts accents and common separators without matching nearby cities', () => {
    expect(resolveCity('Juiz de Fora - MG', cities).id).toBe('3136702');
    expect(() => resolveCity('Juiz de Fora, SP', cities)).toThrow();
    expect(() => resolveCity('Juiz de Fora bairro', cities)).toThrow();
  });
});

describe('website and contact evidence', () => {
  it('checks every website, not only the first value', () => {
    expect(hasRegisteredWebsite(['https://instagram.com/test', 'https://business.com'])).toBe(true);
    expect(hasRegisteredWebsite(['https://instagram.com/test'])).toBe(false);
  });
  it('does not mistake a lookalike domain for a social network', () => {
    expect(hasRegisteredWebsite(['https://instagram.com.example.net'])).toBe(true);
  });
  it('does not invent ratings or a map listing', () => {
    const r = recordToLead(place, 'Barbearia')!;
    expect(r.instagram).toBe('zebarber');
    expect(r.rating).toBeNull();
    expect(r.mapsUrl).toBeNull();
    expect(r.source).toBe('overture');
  });
  it('ignores Instagram posts as profile handles', () => {
    expect(recordToLead({ ...place, socials: ['https://instagram.com/p/postcode'] }, 'Barbearia')!.instagram).toBeNull();
  });
});

describe('category filtering', () => {
  it('matches taxonomy and names, excludes all registered websites', () => {
    const r = filterRecords([place, { ...place, id: 'b', websites: ['https://business.com'] }, { ...place, id: 'c', n: 'Dentista', sub: 'dentist' }], 'Barbearia');
    expect(r.leads.map(l => l.id)).toEqual(['ovt:a']);
    expect(r.scanned).toBe(2);
  });
  it('does not silently truncate after 1000 records', () => {
    const rows = Array.from({ length: 1400 }, (_, i) => ({ ...place, id: String(i) }));
    expect(filterRecords(rows, 'Barbearia').leads).toHaveLength(1400);
  });
});

describe('pagination', () => {
  it('rejects unsigned forged cursors before allowing a free page', async () => {
    vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', 'test-only-signing-key');
    const { readCursor } = await import('../lib/overture-search.server');
    expect(readCursor(undefined, 'barbearia', 'Juiz de Fora, MG')).toBe(0);
    expect(() => readCursor('forged.token', 'barbearia', 'Juiz de Fora, MG')).toThrow('inválida');
    vi.unstubAllEnvs();
  });
});

describe('same server search used by the site', () => {
  it('paginates beyond 1000, reuses city data and rejects cross-query cursors', async () => {
    vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', 'test-only-signing-key');
    const { gzipSync } = await import('node:zlib');
    const records = Array.from({ length: 1400 }, (_, i) => ({ ...place, id: String(i) }));
    const compressed = gzipSync(JSON.stringify(records));
    const sourceFetch = vi.fn(async (url: string) => {
      if (url.endsWith('manifest.json')) return new Response(JSON.stringify({ release: 'test-release', cities: { '3136702': { name: 'Juiz de Fora', uf: 'MG', count: 1400, bytes: compressed.length } } }));
      if (url.endsWith('3136702.json.gz')) return new Response(compressed);
      return new Response('', { status: 404 });
    });
    vi.stubGlobal('fetch', sourceFetch);
    try {
      const { searchOverture, readCursor } = await import('../lib/overture-search.server');
      let token: string | undefined;
      const ids = new Set<string>();
      let scanned = 0;
      do {
        const offset = readCursor(token, 'Barbearia', 'Juiz de Fora, MG');
        const page = await searchOverture('Barbearia', 'Juiz de Fora, MG', offset);
        expect(page.totalMatches).toBe(1400);
        page.leads.forEach(l => ids.add(l.id));
        scanned += page.scanned;
        if (page.nextPageToken) expect(() => readCursor(page.nextPageToken!, 'Dentista', 'Juiz de Fora, MG')).toThrow();
        token = page.nextPageToken ?? undefined;
      } while (token);
      expect(ids.size).toBe(1400);
      expect(scanned).toBe(1400);
      expect(sourceFetch).toHaveBeenCalledTimes(2);
    } finally { vi.unstubAllEnvs(); vi.unstubAllGlobals(); }
  });
});
