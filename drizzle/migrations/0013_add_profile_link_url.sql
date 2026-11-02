ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS link_url text NOT NULL DEFAULT '';
COMMENT ON COLUMN public.profiles.link_url IS 'Site ou link que o usuário escolhe mostrar no perfil, clicável.';

DROP FUNCTION public.get_public_profile(text);
CREATE FUNCTION public.get_public_profile(uname text)
RETURNS TABLE (id uuid, username text, display_name text, city text, bio text, avatar_url text, banner_url text, link_url text, followers bigint, following bigint, likes bigint, i_follow boolean, i_liked boolean, verified boolean)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT p.id, p.username, p.display_name, p.city, p.bio, p.avatar_url, p.banner_url, p.link_url,
    (SELECT count(*) FROM follows f WHERE f.following_id = p.id),
    (SELECT count(*) FROM follows f WHERE f.follower_id = p.id),
    (SELECT count(*) FROM profile_likes l WHERE l.profile_id = p.id),
    EXISTS (SELECT 1 FROM follows f WHERE f.following_id = p.id AND f.follower_id = auth.uid()),
    EXISTS (SELECT 1 FROM profile_likes l WHERE l.profile_id = p.id AND l.liker_id = auth.uid()),
    EXISTS (SELECT 1 FROM verified_profiles v WHERE v.profile_id = p.id)
  FROM profiles p WHERE auth.uid() IS NOT NULL AND lower(p.username) = lower(trim(both '@ ' from uname)) LIMIT 1
$$;
REVOKE ALL ON FUNCTION public.get_public_profile(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_public_profile(text) TO authenticated;