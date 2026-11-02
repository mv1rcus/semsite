CREATE TABLE public.verified_profiles (profile_id uuid PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE, created_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT ON public.verified_profiles TO authenticated;
GRANT ALL ON public.verified_profiles TO service_role;
ALTER TABLE public.verified_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read verified" ON public.verified_profiles FOR SELECT TO authenticated USING (true);

DROP FUNCTION public.search_profiles(text);
CREATE FUNCTION public.search_profiles(q text)
RETURNS TABLE (username text, display_name text, city text, bio text, avatar_url text, verified boolean)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT p.username, p.display_name, p.city, p.bio, p.avatar_url, EXISTS (SELECT 1 FROM verified_profiles v WHERE v.profile_id = p.id) FROM public.profiles p
  WHERE auth.uid() IS NOT NULL AND p.username IS NOT NULL AND length(trim(q)) >= 1
    AND (p.username ILIKE '%' || replace(replace(lower(trim(both '@ ' from q)),'%',''),'_','\_') || '%'
      OR p.display_name ILIKE '%' || replace(trim(both '@ ' from q),'%','') || '%')
  ORDER BY (lower(p.username) = lower(trim(both '@ ' from q))) DESC, p.username LIMIT 20
$$;
REVOKE ALL ON FUNCTION public.search_profiles(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.search_profiles(text) TO authenticated;

DROP FUNCTION public.get_public_profile(text);
CREATE FUNCTION public.get_public_profile(uname text)
RETURNS TABLE (id uuid, username text, display_name text, city text, bio text, avatar_url text, followers bigint, following bigint, likes bigint, i_follow boolean, i_liked boolean, verified boolean)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT p.id, p.username, p.display_name, p.city, p.bio, p.avatar_url,
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

DROP FUNCTION public.feed_posts(text);
CREATE FUNCTION public.feed_posts(only_user text DEFAULT NULL)
RETURNS TABLE (id uuid, user_id uuid, body text, media_path text, media_type text, created_at timestamptz, username text, display_name text, avatar_url text, likes bigint, i_liked boolean, verified boolean)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT po.id, po.user_id, po.body, po.media_path, po.media_type, po.created_at, pr.username, pr.display_name, pr.avatar_url,
    (SELECT count(*) FROM post_likes l WHERE l.post_id = po.id),
    EXISTS (SELECT 1 FROM post_likes l WHERE l.post_id = po.id AND l.user_id = auth.uid()),
    EXISTS (SELECT 1 FROM verified_profiles v WHERE v.profile_id = po.user_id)
  FROM posts po LEFT JOIN profiles pr ON pr.id = po.user_id
  WHERE auth.uid() IS NOT NULL AND (only_user IS NULL OR lower(pr.username) = lower(only_user))
  ORDER BY po.created_at DESC LIMIT 100
$$;
REVOKE ALL ON FUNCTION public.feed_posts(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.feed_posts(text) TO authenticated;