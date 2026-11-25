-- Funil de clientes, funil de "Meus links" e lista de links salvos, por usuário.
-- Antes ficavam só no localStorage do navegador; agora ficam no banco e acompanham a conta.
-- ATENÇÃO: rodar manualmente no SQL editor do Lovable Cloud (as migrações não rodam sozinhas).
CREATE TABLE IF NOT EXISTS public.user_store (
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users (id) ON DELETE CASCADE,
  kind text NOT NULL CHECK (kind IN ('client', 'funnel', 'saved_demo')),
  item_id text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  data jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, kind, item_id)
);

CREATE INDEX IF NOT EXISTS user_store_user_kind_idx ON public.user_store (user_id, kind, position);

ALTER TABLE public.user_store ENABLE ROW LEVEL SECURITY;

-- Cada usuário só enxerga e altera as próprias linhas.
DROP POLICY IF EXISTS "own store select" ON public.user_store;
CREATE POLICY "own store select" ON public.user_store FOR SELECT TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "own store insert" ON public.user_store;
CREATE POLICY "own store insert" ON public.user_store FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "own store update" ON public.user_store;
CREATE POLICY "own store update" ON public.user_store FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "own store delete" ON public.user_store;
CREATE POLICY "own store delete" ON public.user_store FOR DELETE TO authenticated USING (auth.uid() = user_id);
