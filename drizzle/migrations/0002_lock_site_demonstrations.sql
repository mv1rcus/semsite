DROP POLICY IF EXISTS "Public demonstration reads" ON public.site_demonstrations;
DROP POLICY IF EXISTS "Public immutable demonstration creation" ON public.site_demonstrations;
REVOKE ALL ON public.site_demonstrations FROM anon, authenticated;
GRANT ALL ON public.site_demonstrations TO service_role;