-- Cache compartilhado das buscas do OpenStreetMap (fonte gratuita de leads).
-- Os dados de mapa mudam devagar; resultados são reutilizados por até 30 dias
-- para não depender da disponibilidade das instâncias públicas do Overpass.
-- A busca funciona mesmo sem esta tabela (o código ignora erro e segue sem cache).
create table if not exists public.osm_search_cache (
  cache_key text primary key,
  payload jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.osm_search_cache enable row level security;

-- Leitura para usuários autenticados; escrita só via service role (servidor).
create policy "osm_search_cache_select_authenticated"
  on public.osm_search_cache for select
  to authenticated
  using (true);
