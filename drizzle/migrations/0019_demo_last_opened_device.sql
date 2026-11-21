ALTER TABLE public.site_demonstrations ADD COLUMN IF NOT EXISTS last_opened_device text;
COMMENT ON COLUMN public.site_demonstrations.last_opened_device IS 'Rotulo curto do aparelho/navegador (ex.: "iPhone · Safari") lido do User-Agent na ultima abertura publica; NULL para bots e previas de link.';
