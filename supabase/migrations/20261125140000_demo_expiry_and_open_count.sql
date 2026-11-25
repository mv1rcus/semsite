-- Prévia com validade (expires_at) e contador de aberturas (open_count) por demonstração.
-- expires_at NULL = nunca expira. Demos já existentes ganham 30 dias a partir de agora.
ALTER TABLE public.site_demonstrations ADD COLUMN IF NOT EXISTS expires_at timestamptz;
ALTER TABLE public.site_demonstrations ADD COLUMN IF NOT EXISTS open_count integer NOT NULL DEFAULT 0;

UPDATE public.site_demonstrations SET expires_at = now() + interval '30 days' WHERE expires_at IS NULL;
