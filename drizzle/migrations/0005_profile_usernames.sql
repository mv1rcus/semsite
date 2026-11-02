ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS username text;
CREATE UNIQUE INDEX IF NOT EXISTS profiles_username_key ON public.profiles (lower(username));
ALTER TABLE public.profiles ADD CONSTRAINT profiles_username_format CHECK (username IS NULL OR username ~ '^[a-z0-9_.]{3,30}$');

CREATE OR REPLACE FUNCTION public.search_profiles(q text)
RETURNS TABLE (username text, display_name text, city text, bio text, avatar_url text)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT p.username, p.display_name, p.city, p.bio, p.avatar_url FROM public.profiles p
  WHERE auth.uid() IS NOT NULL AND p.username IS NOT NULL AND length(trim(q)) >= 1
    AND (p.username ILIKE '%' || replace(replace(lower(trim(both '@ ' from q)),'%',''),'_','\_') || '%'
      OR p.display_name ILIKE '%' || replace(trim(both '@ ' from q),'%','') || '%')
  ORDER BY (lower(p.username) = lower(trim(both '@ ' from q))) DESC, p.username LIMIT 20
$$;
REVOKE ALL ON FUNCTION public.search_profiles(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.search_profiles(text) TO authenticated;