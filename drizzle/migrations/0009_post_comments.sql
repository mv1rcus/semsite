CREATE TABLE public.post_comments (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), post_id uuid NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE, user_id uuid NOT NULL DEFAULT auth.uid(), body text NOT NULL CHECK (length(trim(body)) between 1 and 1000), created_at timestamptz NOT NULL DEFAULT now());
CREATE INDEX post_comments_post_idx ON public.post_comments(post_id, created_at);
GRANT SELECT, INSERT, DELETE ON public.post_comments TO authenticated;
GRANT ALL ON public.post_comments TO service_role;
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read comments" ON public.post_comments FOR SELECT TO authenticated USING (true);
CREATE POLICY "own comment insert" ON public.post_comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own or post owner delete" ON public.post_comments FOR DELETE TO authenticated USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.posts p WHERE p.id = post_id AND p.user_id = auth.uid()));
CREATE FUNCTION public.post_comments_list(pid uuid)
RETURNS TABLE (id uuid, user_id uuid, body text, created_at timestamptz, username text, display_name text, avatar_url text, verified boolean)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT c.id, c.user_id, c.body, c.created_at, pr.username, pr.display_name, pr.avatar_url, EXISTS (SELECT 1 FROM verified_profiles v WHERE v.profile_id = c.user_id)
  FROM post_comments c LEFT JOIN profiles pr ON pr.id = c.user_id
  WHERE auth.uid() IS NOT NULL AND c.post_id = pid ORDER BY c.created_at LIMIT 200
$$;
REVOKE ALL ON FUNCTION public.post_comments_list(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.post_comments_list(uuid) TO authenticated;