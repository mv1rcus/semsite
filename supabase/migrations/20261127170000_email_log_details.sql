-- Registro de e-mails no Painel: guarda para quem e o assunto de cada envio.
-- ATENÇÃO: rodar manualmente no SQL editor do Lovable Cloud (as migrações não rodam sozinhas), antes de publicar.
ALTER TABLE public.email_log ADD COLUMN IF NOT EXISTS to_email text;
ALTER TABLE public.email_log ADD COLUMN IF NOT EXISTS subject text;
CREATE INDEX IF NOT EXISTS email_log_created_idx ON public.email_log (created_at DESC);
