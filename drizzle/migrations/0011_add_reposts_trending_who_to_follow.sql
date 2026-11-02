-- Reposts (retweet) + trending hashtags + who-to-follow suggestions

CREATE TABLE public.post_reposts (
  user_id uuid NOT NULL DEFAULT auth.uid(),
  post_id uuid NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, post_id)
);

GRANT SELECT, INSERT, DELETE ON public.post_reposts TO authenticated;
GRANT ALL ON public.post_reposts TO service_role;

ALTER TABLE public.post_reposts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "read reposts" ON public.post_reposts FOR SELECT TO authenticated USING (true);
CREATE POLICY "own repost insert" ON public.post_reposts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own repost delete" ON public.post_reposts FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE INDEX post_reposts_post_idx ON public.post_reposts (post_id);

DROP FUNCTION IF EXISTS public.feed_posts(text);

CREATE OR REPLACE FUNCTION public.feed_posts(only_user text DEFAULT NULL)
 RETURNS TABLE(id uuid, user_id uuid, body text, media_path text, media_type text,
   created_at timestamptz, username text, display_name text, avatar_url text,
   likes bigint, i_liked boolean, verified boolean,
   reposts bigint, i_reposted boolean, reposted_by text, reposted_by_name text)
 LANGUAGE sql STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT po.id, po.user_id, po.body, po.media_path, po.media_type, e.at,
    pr.username, pr.display_name, pr.avatar_url,
    (SELECT count(*) FROM post_likes l WHERE l.post_id = po.id),
    EXISTS (SELECT 1 FROM post_likes l WHERE l.post_id = po.id AND l.user_id = auth.uid()),
    EXISTS (SELECT 1 FROM verified_profiles v WHERE v.profile_id = po.user_id),
    (SELECT count(*) FROM post_reposts r WHERE r.post_id = po.id),
    EXISTS (SELECT 1 FROM post_reposts r WHERE r.post_id = po.id AND r.user_id = auth.uid()),
    rp.username, rp.display_name
  FROM (
    SELECT po0.id AS post_id, po0.created_at AS at, NULL::uuid AS rep_by
    FROM posts po0
    WHERE (only_user IS NULL AND NOT EXISTS (SELECT 1 FROM post_reposts r WHERE r.post_id = po0.id))
       OR (only_user IS NOT NULL AND lower((SELECT username FROM profiles WHERE id = po0.user_id)) = lower(only_user))
    UNION ALL
    SELECT r.post_id, r.created_at, r.user_id
    FROM post_reposts r JOIN posts po1 ON po1.id = r.post_id
    WHERE only_user IS NULL
      AND (r.post_id, r.created_at, r.user_id) = (
        SELECT r2.post_id, r2.created_at, r2.user_id FROM post_reposts r2
        WHERE r2.post_id = r.post_id ORDER BY r2.created_at DESC, r2.user_id LIMIT 1)
    UNION ALL
    SELECT r.post_id, r.created_at, r.user_id
    FROM post_reposts r JOIN posts po2 ON po2.id = r.post_id
    WHERE only_user IS NOT NULL
      AND lower((SELECT username FROM profiles WHERE id = r.user_id)) = lower(only_user)
      AND lower((SELECT username FROM profiles WHERE id = po2.user_id)) <> lower(only_user)
  ) e
  JOIN posts po ON po.id = e.post_id
  LEFT JOIN profiles pr ON pr.id = po.user_id
  LEFT JOIN profiles rp ON rp.id = e.rep_by
  WHERE auth.uid() IS NOT NULL
  ORDER BY e.at DESC
  LIMIT 100
$function$;

CREATE OR REPLACE FUNCTION public.trending_tags()
 RETURNS TABLE(tag text, uses bigint)
 LANGUAGE sql STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT lower(substring(m[1] from 2)) AS tag, count(*)::bigint AS uses
  FROM posts po, LATERAL regexp_matches(po.body, '#\w{2,30}', 'g') AS m
  WHERE po.body LIKE '%#%' AND po.created_at > now() - interval '30 days'
  GROUP BY 1
  ORDER BY count(*) DESC, 1
  LIMIT 8
$function$;

CREATE OR REPLACE FUNCTION public.who_to_follow()
 RETURNS TABLE(username text, display_name text, city text, bio text, avatar_url text, verified boolean, followers bigint)
 LANGUAGE sql STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT p.username, p.display_name, p.city, p.bio, p.avatar_url,
    EXISTS (SELECT 1 FROM verified_profiles v WHERE v.profile_id = p.id),
    (SELECT count(*) FROM follows f WHERE f.following_id = p.id)
  FROM profiles p
  WHERE auth.uid() IS NOT NULL AND p.username IS NOT NULL AND p.id <> auth.uid()
    AND NOT EXISTS (SELECT 1 FROM follows f WHERE f.follower_id = auth.uid() AND f.following_id = p.id)
  ORDER BY (SELECT count(*) FROM follows f WHERE f.following_id = p.id) DESC, random()
  LIMIT 5
$function$;

CREATE OR REPLACE FUNCTION public.posts_by_tag(p_tag text)
 RETURNS TABLE(id uuid, user_id uuid, body text, media_path text, media_type text,
   created_at timestamptz, username text, display_name text, avatar_url text,
   likes bigint, i_liked boolean, verified boolean, reposts bigint, i_reposted boolean)
 LANGUAGE sql STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT po.id, po.user_id, po.body, po.media_path, po.media_type, po.created_at,
    pr.username, pr.display_name, pr.avatar_url,
    (SELECT count(*) FROM post_likes l WHERE l.post_id = po.id),
    EXISTS (SELECT 1 FROM post_likes l WHERE l.post_id = po.id AND l.user_id = auth.uid()),
    EXISTS (SELECT 1 FROM verified_profiles v WHERE v.profile_id = po.user_id),
    (SELECT count(*) FROM post_reposts r WHERE r.post_id = po.id),
    EXISTS (SELECT 1 FROM post_reposts r WHERE r.post_id = po.id AND r.user_id = auth.uid())
  FROM posts po LEFT JOIN profiles pr ON pr.id = po.user_id
  WHERE auth.uid() IS NOT NULL
    AND trim(both '#' from coalesce(p_tag, '')) ~ '^[0-9a-zA-Z_]{2,30}$'
    AND po.body ~* ('#' || trim(both '#' from p_tag) || '\y')
  ORDER BY po.created_at DESC
  LIMIT 60
$function$;

GRANT EXECUTE ON FUNCTION public.trending_tags() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.who_to_follow() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.posts_by_tag(text) TO authenticated, service_role;