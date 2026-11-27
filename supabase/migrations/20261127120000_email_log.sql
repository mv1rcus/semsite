-- E-mails transacionais (pagamento, cancelamento, reembolso): registro para não enviar o mesmo e-mail duas vezes
-- quando a Stripe reenvia um evento.
-- ATENÇÃO: rodar manualmente no SQL editor do Lovable Cloud (as migrações não rodam sozinhas), antes de publicar.
CREATE TABLE IF NOT EXISTS public.email_log (
  dedupe_key text PRIMARY KEY,
  kind text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.email_log ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.email_log FROM anon, authenticated;
-- Sem policies: só o servidor (service role) lê e escreve.
