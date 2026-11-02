ALTER TABLE public.post_comments ADD COLUMN parent_id uuid REFERENCES public.post_comments(id) ON DELETE CASCADE;

DROP FUNCTION public.post_comments_list(uuid);
CREATE FUNCTION public.post_comments_list(pid uuid)
 RETURNS TABLE(id uuid, user_id uuid, body text, created_at timestamp with time zone, parent_id uuid, reply_to_username text, username text, display_name text, avatar_url text, verified boolean)
 LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $function$
  SELECT c.id, c.user_id, c.body, c.created_at, c.parent_id,
    prp.username, pr.username, pr.display_name, pr.avatar_url,
    EXISTS (SELECT 1 FROM verified_profiles v WHERE v.profile_id = c.user_id)
  FROM post_comments c
  LEFT JOIN profiles pr ON pr.id = c.user_id
  LEFT JOIN post_comments cp ON cp.id = c.parent_id
  LEFT JOIN profiles prp ON prp.id = cp.user_id
  WHERE auth.uid() IS NOT NULL AND c.post_id = pid ORDER BY c.created_at LIMIT 500
$function$;

CREATE FUNCTION public.get_post(pid uuid)
 RETURNS TABLE(id uuid, user_id uuid, body text, media_path text, media_type text, created_at timestamp with time zone, username text, display_name text, avatar_url text, likes bigint, i_liked boolean, verified boolean, reposts bigint, i_reposted boolean)
 LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $function$
  SELECT po.id, po.user_id, po.body, po.media_path, po.media_type, po.created_at,
    pr.username, pr.display_name, pr.avatar_url,
    (SELECT count(*) FROM post_likes l WHERE l.post_id = po.id),
    EXISTS (SELECT 1 FROM post_likes l WHERE l.post_id = po.id AND l.user_id = auth.uid()),
    EXISTS (SELECT 1 FROM verified_profiles v WHERE v.profile_id = po.user_id),
    (SELECT count(*) FROM post_reposts r WHERE r.post_id = po.id),
    EXISTS (SELECT 1 FROM post_reposts r WHERE r.post_id = po.id AND r.user_id = auth.uid())
  FROM posts po LEFT JOIN profiles pr ON pr.id = po.user_id
  WHERE auth.uid() IS NOT NULL AND po.id = pid LIMIT 1
$function$;