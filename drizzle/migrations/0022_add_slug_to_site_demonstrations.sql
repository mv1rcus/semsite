-- Endereço curto público da demonstração (ex.: /pizzariadomarcusdemo).
-- Demos antigas sem slug continuam abrindo pelo link longo (/site/nome/codigo).
ALTER TABLE public.site_demonstrations ADD COLUMN IF NOT EXISTS slug text;

CREATE UNIQUE INDEX IF NOT EXISTS site_demonstrations_slug_key ON public.site_demonstrations (slug);
