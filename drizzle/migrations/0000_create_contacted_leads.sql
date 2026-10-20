CREATE TABLE public.contacted_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid(),
  place_id text NOT NULL,
  name text NOT NULL,
  phone text,
  city text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, place_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contacted_leads TO authenticated;
GRANT ALL ON public.contacted_leads TO service_role;
ALTER TABLE public.contacted_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own select" ON public.contacted_leads FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own insert" ON public.contacted_leads FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own delete" ON public.contacted_leads FOR DELETE TO authenticated USING (auth.uid() = user_id);