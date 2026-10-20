CREATE TABLE public.site_demonstrations (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 160),
 category text NOT NULL CHECK (char_length(category) BETWEEN 2 AND 120),
 address text NOT NULL DEFAULT '' CHECK (char_length(address) <= 400),
 phone text NOT NULL DEFAULT '' CHECK (char_length(phone) <= 40),
 headline text NOT NULL CHECK (char_length(headline) BETWEEN 2 AND 200),
 description text NOT NULL CHECK (char_length(description) BETWEEN 2 AND 1000),
 created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.site_demonstrations TO anon, authenticated;
GRANT ALL ON public.site_demonstrations TO service_role;
ALTER TABLE public.site_demonstrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public demonstration reads" ON public.site_demonstrations FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public immutable demonstration creation" ON public.site_demonstrations FOR INSERT TO anon, authenticated WITH CHECK (true);
COMMENT ON TABLE public.site_demonstrations IS 'Public immutable website concepts containing only business information intended for sharing. No account-owned lead records.';