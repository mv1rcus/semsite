-- Registro de vendas fechadas por usuário (dashboard de resultados do vendedor).
-- Uma linha por negócio fechado: valor em centavos e data do fechamento.
-- ATENÇÃO: rodar manualmente no SQL editor do Lovable Cloud (as migrações não rodam sozinhas).
CREATE TABLE IF NOT EXISTS public.closed_sales (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users (id) ON DELETE CASCADE,
  client_id text NOT NULL,
  client_name text NOT NULL,
  amount_cents integer NOT NULL DEFAULT 0 CHECK (amount_cents >= 0),
  closed_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS closed_sales_user_closed_idx ON public.closed_sales (user_id, closed_at);

ALTER TABLE public.closed_sales ENABLE ROW LEVEL SECURITY;

-- Cada usuário só vê e grava as próprias vendas.
DROP POLICY IF EXISTS "own sales select" ON public.closed_sales;
CREATE POLICY "own sales select" ON public.closed_sales FOR SELECT TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "own sales insert" ON public.closed_sales;
CREATE POLICY "own sales insert" ON public.closed_sales FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "own sales delete" ON public.closed_sales;
CREATE POLICY "own sales delete" ON public.closed_sales FOR DELETE TO authenticated USING (auth.uid() = user_id);
