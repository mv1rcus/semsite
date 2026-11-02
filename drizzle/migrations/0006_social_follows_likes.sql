CREATE TABLE public.follows (follower_id uuid NOT NULL DEFAULT auth.uid(), following_id uuid NOT NULL, created_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY (follower_id, following_id), CHECK (follower_id <> following_id));
GRANT SELECT, INSERT, DELETE ON public.follows TO authenticated;
GRANT ALL ON public.follows TO service_role;
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read follows" ON public.follows FOR SELECT TO authenticated USING (true);
CREATE POLICY "own follow insert" ON public.follows FOR INSERT TO authenticated WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "own follow delete" ON public.follows FOR DELETE TO authenticated USING (auth.uid() = follower_id);

CREATE TABLE public.profile_likes (liker_id uuid NOT NULL DEFAULT auth.uid(), profile_id uuid NOT NULL, created_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY (liker_id, profile_id));
GRANT SELECT, INSERT, DELETE ON public.profile_likes TO authenticated;
GRANT ALL ON public.profile_likes TO service_role;
ALTER TABLE public.profile_likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read likes" ON public.profile_likes FOR SELECT TO authenticated USING (true);
CREATE POLICY "own like insert" ON public.profile_likes FOR INSERT TO authenticated WITH CHECK (auth.uid() = liker_id);
CREATE POLICY "own like delete" ON public.profile_likes FOR DELETE TO authenticated USING (auth.uid() = liker_id);

CREATE OR REPLACE FUNCTION public.get_public_profile(uname text)
RETURNS TABLE (id uuid, username text, display_name text, city text, bio text, avatar_url text, followers bigint, following bigint, likes bigint, i_follow boolean, i_liked boolean)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT p.id, p.username, p.display_name, p.city, p.bio, p.avatar_url,
    (SELECT count(*) FROM follows f WHERE f.following_id = p.id),
    (SELECT count(*) FROM follows f WHERE f.follower_id = p.id),
    (SELECT count(*) FROM profile_likes l WHERE l.profile_id = p.id),
    EXISTS (SELECT 1 FROM follows f WHERE f.following_id = p.id AND f.follower_id = auth.uid()),
    EXISTS (SELECT 1 FROM profile_likes l WHERE l.profile_id = p.id AND l.liker_id = auth.uid())
  FROM profiles p WHERE auth.uid() IS NOT NULL AND lower(p.username) = lower(trim(both '@ ' from uname)) LIMIT 1
$$;
REVOKE ALL ON FUNCTION public.get_public_profile(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_public_profile(text) TO authenticated;

CREATE POLICY "avatar read" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "avatar own insert" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "avatar own update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "avatar own delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);