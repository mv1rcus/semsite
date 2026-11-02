CREATE TABLE public.posts (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid NOT NULL DEFAULT auth.uid(), body text NOT NULL DEFAULT '' CHECK (length(body) <= 2000), media_path text, media_type text CHECK (media_type IN ('image','video')), created_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT, INSERT, DELETE ON public.posts TO authenticated;
GRANT ALL ON public.posts TO service_role;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read posts" ON public.posts FOR SELECT TO authenticated USING (true);
CREATE POLICY "own post insert" ON public.posts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own post delete" ON public.posts FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.post_likes (user_id uuid NOT NULL DEFAULT auth.uid(), post_id uuid NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE, PRIMARY KEY (user_id, post_id));
GRANT SELECT, INSERT, DELETE ON public.post_likes TO authenticated;
GRANT ALL ON public.post_likes TO service_role;
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read post likes" ON public.post_likes FOR SELECT TO authenticated USING (true);
CREATE POLICY "own post like insert" ON public.post_likes FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own post like delete" ON public.post_likes FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.feed_posts(only_user text DEFAULT NULL)
RETURNS TABLE (id uuid, user_id uuid, body text, media_path text, media_type text, created_at timestamptz, username text, display_name text, avatar_url text, likes bigint, i_liked boolean)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT po.id, po.user_id, po.body, po.media_path, po.media_type, po.created_at, pr.username, pr.display_name, pr.avatar_url,
    (SELECT count(*) FROM post_likes l WHERE l.post_id = po.id),
    EXISTS (SELECT 1 FROM post_likes l WHERE l.post_id = po.id AND l.user_id = auth.uid())
  FROM posts po LEFT JOIN profiles pr ON pr.id = po.user_id
  WHERE auth.uid() IS NOT NULL AND (only_user IS NULL OR lower(pr.username) = lower(only_user))
  ORDER BY po.created_at DESC LIMIT 100
$$;
REVOKE ALL ON FUNCTION public.feed_posts(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.feed_posts(text) TO authenticated;

CREATE POLICY "post media read" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'post-media');
CREATE POLICY "post media own insert" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'post-media' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "post media own delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'post-media' AND (storage.foldername(name))[1] = auth.uid()::text);