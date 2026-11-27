-- Tickets de suporte: numeração sequencial (#1, #2...) e mensagens.
-- ATENÇÃO: rodar manualmente no SQL editor do Lovable Cloud (as migrações não rodam sozinhas), antes de publicar.
CREATE TABLE IF NOT EXISTS public.tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  number bigint GENERATED ALWAYS AS IDENTITY UNIQUE,
  user_id uuid,
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open','answered','closed')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS public.ticket_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid NOT NULL REFERENCES public.tickets(id) ON DELETE CASCADE,
  author text NOT NULL CHECK (author IN ('customer','admin')),
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS tickets_email_created_idx ON public.tickets (email, created_at DESC);
CREATE INDEX IF NOT EXISTS tickets_created_idx ON public.tickets (created_at DESC);
CREATE INDEX IF NOT EXISTS ticket_messages_ticket_idx ON public.ticket_messages (ticket_id, created_at);
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_messages ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.tickets FROM anon, authenticated;
REVOKE ALL ON public.ticket_messages FROM anon, authenticated;
-- Sem policies: só o servidor (service role) lê e escreve.
