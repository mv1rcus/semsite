import { it } from 'vitest';

// Opt-in network benchmark of the actual search module. This excludes the
// authenticated route, usage-limit RPC and Lovable production hosting.
it.skipIf(process.env['OVERTURE_LIVE'] !== '1')('measures live municipal file searches', async () => {
  process.env['SUPABASE_SERVICE_ROLE_KEY'] = 'local-benchmark-only-not-a-real-key';
  const { searchOverture } = await import('../lib/overture-search.server');
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
      const tw = performance.now();
      await searchOverture(category!, city!, 0, 'local-benchmark-user');
      console.log(JSON.stringify({ city, category, firstMs: Math.round(elapsed), repeatMs: Math.round(performance.now() - tw), total: r.totalMatches, shown: r.leads.length, scanned: r.scanned, release: r.dataRelease }));
    } catch (e) {
      console.log(JSON.stringify({ city, category, elapsedMs: Math.round(performance.now() - t), error: e instanceof Error ? e.message : String(e) }));
      throw e;
    }
  }
}, 110000);
