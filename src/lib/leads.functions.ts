import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { searchInputSchema } from './leads';
export type { Lead } from './leads';

export const searchLeads = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => searchInputSchema.parse(d))
  .handler(async ({ data, context }) => {
    const { readCursor, searchOverture } = await import('./overture-search.server');
    // Validate the signed, query-bound cursor before allowing a free extra page.
    const offset = readCursor(data.pageToken, data.category, data.city, context.userId);
    let searchesLeft = -1;
    if (!data.pageToken) {
      const { data: left, error } = await context.supabase.rpc('consume_search');
      if (error) throw new Error(error.message.includes('search_limit_reached') ? 'Você usou suas 5 buscas de hoje. Assine o Verificado para buscar sem limite.' : 'Não foi possível conferir seu limite de buscas.');
      searchesLeft = Number(left);
    }
    try {
      const result = await searchOverture(data.category, data.city, offset, context.userId);
      return { ...result, searchesLeft };
    } catch (e) {
      const message = e instanceof Error ? e.message : '';
      if (/^(Não encontrei|Há mais|A base|Não foi possível ler|Arquivo de cidade|Essa cidade|Esse recorte)/.test(message)) throw new Error(message);
      console.error('Overture search failed', e instanceof Error ? e.name : 'unknown');
      throw new Error('Não foi possível concluir a busca na Overture agora. Tente novamente em instantes.');
    }
  });
