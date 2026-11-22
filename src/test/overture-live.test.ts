import { it, expect } from 'vitest';
import { writeFileSync } from 'node:fs';

// Opt-in network benchmark of the actual search module. This excludes the
// authenticated route, usage-limit RPC and Lovable production hosting.
it.skipIf(process.env['OVERTURE_LIVE'] !== '1')('measures live municipal file searches', async () => {
  process.env['SUPABASE_SERVICE_ROLE_KEY'] = 'local-benchmark-only-not-a-real-key';
  const { searchOverture, readCursor } = await import('../lib/overture-search.server');
  for (const [city, category] of [
    ['Juiz de Fora, MG', 'Barbearia'],
    ['São Paulo, SP', 'Barbearia'],
    ['São Paulo, SP', 'Restaurante'],
    ['Manaus, AM', 'Dentista'],
    ['Recife, PE', 'Lava jato'],
  ]) {
    const t = performance.now();
    try {
      const r = await searchOverture(category!, city!, 0, 'local-benchmark-user');
      const elapsed = performance.now() - t;
      if (city === 'Juiz de Fora, MG') writeFileSync('/tmp/overture-real-ui-results.json', JSON.stringify(r));
      if (city === 'São Paulo, SP' && category === 'Barbearia') {
        const ids = new Set(r.leads.map(l => l.id));
        let token = r.nextPageToken;
        let pages = 1;
        while (token) {
          const page = await searchOverture(category, city, readCursor(token, category, city, 'local-benchmark-user'), 'local-benchmark-user');
          page.leads.forEach(l => ids.add(l.id));
          token = page.nextPageToken;
          pages++;
        }
        expect(r.totalMatches).toBeGreaterThan(1000);
        expect(ids.size).toBe(r.totalMatches);
        console.log(JSON.stringify({ paginationCity: city, category, pages, distinct: ids.size }));
      }
      const tw = performance.now();
      await searchOverture(category!, city!, 0, 'local-benchmark-user');
      console.log(JSON.stringify({ city, category, firstMs: Math.round(elapsed), repeatMs: Math.round(performance.now() - tw), total: r.totalMatches, shown: r.leads.length, scanned: r.scanned, release: r.dataRelease }));
    } catch (e) {
      console.log(JSON.stringify({ city, category, elapsedMs: Math.round(performance.now() - t), error: e instanceof Error ? e.message : String(e) }));
      throw e;
    }
  }
}, 110000);
