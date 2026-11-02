DROP FUNCTION IF EXISTS public.who_to_follow();

CREATE OR REPLACE FUNCTION public.who_to_follow()
 RETURNS TABLE(id uuid, username text, display_name text, city text, bio text, avatar_url text, verified boolean, followers bigint)
 LANGUAGE sql STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT p.id, p.username, p.display_name, p.city, p.bio, p.avatar_url,
    EXISTS (SELECT 1 FROM verified_profiles v WHERE v.profile_id = p.id),
    (SELECT count(*) FROM follows f WHERE f.following_id = p.id)
  FROM profiles p
  WHERE auth.uid() IS NOT NULL AND p.username IS NOT NULL AND p.id <> auth.uid()
    AND NOT EXISTS (SELECT 1 FROM follows f WHERE f.follower_id = auth.uid() AND f.following_id = p.id)
  ORDER BY (SELECT count(*) FROM follows f WHERE f.following_id = p.id) DESC, random()
  LIMIT 5
$function$;

GRANT EXECUTE ON FUNCTION public.who_to_follow() TO authenticated, service_role;