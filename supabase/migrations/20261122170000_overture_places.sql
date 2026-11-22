-- Base local de negócios da Overture Maps (dataset aberto, CDL-Permissive-2.0).
-- Resolve os dois problemas da busca via Overpass: os servidores públicos vivem
-- congestionados (buscas de 30-90s) e a cobertura do OSM no Brasil é esparsa
-- (ex.: 3 barbearias em Juiz de Fora; a Overture tem 161 na mesma cidade).
-- Os dados chegam por "pacotes de cidade" (src/data/overture-*.json) importados
-- sob demanda pelo servidor na primeira busca daquela cidade.
-- Atribuição exigida: Overture Maps Foundation (https://overturemaps.org).
create table if not exists public.overture_places (
  id text primary key,
  city_key text not null,
  name text not null,
  sub text,
  cat text,
  phone text,
  site text,
  instagram text,
  facebook text,
  address text not null default '',
  imported_at timestamptz not null default now()
);

create index if not exists overture_places_city_idx on public.overture_places (city_key);

alter table public.overture_places enable row level security;

-- Leitura para usuários autenticados; escrita só via service role (servidor).
create policy "overture_places_select_authenticated"
  on public.overture_places for select
  to authenticated
  using (true);
