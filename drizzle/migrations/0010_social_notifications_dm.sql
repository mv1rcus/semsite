ALTER TABLE public.post_likes ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT now();

CREATE FUNCTION public.follow_list(uname text, kind text)
RETURNS TABLE (username text, display_name text, avatar_url text, bio text, verified boolean)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  WITH t AS (SELECT id FROM profiles WHERE lower(username) = lower(trim(both '@ ' from uname)) LIMIT 1)
  SELECT p.username, p.display_name, p.avatar_url, p.bio, EXISTS (SELECT 1 FROM verified_profiles v WHERE v.profile_id = p.id)
  FROM follows f JOIN t ON (CASE WHEN kind = 'following' THEN f.follower_id ELSE f.following_id END) = t.id
  JOIN profiles p ON p.id = (CASE WHEN kind = 'following' THEN f.following_id ELSE f.follower_id END)
  WHERE auth.uid() IS NOT NULL AND p.username IS NOT NULL
  ORDER BY f.created_at DESC LIMIT 500
$$;
REVOKE ALL ON FUNCTION public.follow_list(text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.follow_list(text, text) TO authenticated;

CREATE FUNCTION public.my_notifications()
RETURNS TABLE (kind text, created_at timestamptz, username text, display_name text, avatar_url text, verified boolean, post_id uuid, snippet text)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT * FROM (
    SELECT 'follow'::text, f.created_at, p.username, p.display_name, p.avatar_url, EXISTS (SELECT 1 FROM verified_profiles v WHERE v.profile_id = p.id), NULL::uuid, NULL::text
      FROM follows f JOIN profiles p ON p.id = f.follower_id WHERE f.following_id = auth.uid()
    UNION ALL
    SELECT 'profile_like', l.created_at, p.username, p.display_name, p.avatar_url, EXISTS (SELECT 1 FROM verified_profiles v WHERE v.profile_id = p.id), NULL, NULL
      FROM profile_likes l JOIN profiles p ON p.id = l.liker_id WHERE l.profile_id = auth.uid()
    UNION ALL
    SELECT 'post_like', l.created_at, p.username, p.display_name, p.avatar_url, EXISTS (SELECT 1 FROM verified_profiles v WHERE v.profile_id = p.id), po.id, left(po.body, 80)
      FROM post_likes l JOIN posts po ON po.id = l.post_id JOIN profiles p ON p.id = l.user_id WHERE po.user_id = auth.uid() AND l.user_id <> auth.uid()
    UNION ALL
    SELECT 'comment', c.created_at, p.username, p.display_name, p.avatar_url, EXISTS (SELECT 1 FROM verified_profiles v WHERE v.profile_id = p.id), po.id, left(c.body, 120)
      FROM post_comments c JOIN posts po ON po.id = c.post_id JOIN profiles p ON p.id = c.user_id WHERE po.user_id = auth.uid() AND c.user_id <> auth.uid()
  ) n ORDER BY 2 DESC LIMIT 100
$$;
REVOKE ALL ON FUNCTION public.my_notifications() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_notifications() TO authenticated;

CREATE TABLE public.direct_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid NOT NULL DEFAULT auth.uid(),
  recipient_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  body text NOT NULL CHECK (length(trim(body)) BETWEEN 1 AND 2000),
  created_at timestamptz NOT NULL DEFAULT now(),
  read_at timestamptz
);
CREATE INDEX dm_pair_idx ON public.direct_messages (sender_id, recipient_id, created_at);
CREATE INDEX dm_recipient_idx ON public.direct_messages (recipient_id, created_at);
GRANT SELECT, INSERT, UPDATE ON public.direct_messages TO authenticated;
GRANT ALL ON public.direct_messages TO service_role;
ALTER TABLE public.direct_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "dm participants read" ON public.direct_messages FOR SELECT TO authenticated USING (auth.uid() = sender_id OR auth.uid() = recipient_id);
CREATE POLICY "dm send" ON public.direct_messages FOR INSERT TO authenticated WITH CHECK (auth.uid() = sender_id AND recipient_id <> auth.uid());
CREATE POLICY "dm mark read" ON public.direct_messages FOR UPDATE TO authenticated USING (auth.uid() = recipient_id) WITH CHECK (auth.uid() = recipient_id);
REVOKE UPDATE ON public.direct_messages FROM authenticated;
GRANT UPDATE (read_at) ON public.direct_messages TO authenticated;
ALTER PUBLICATION supabase_realtime ADD TABLE public.direct_messages;

CREATE FUNCTION public.dm_threads()
RETURNS TABLE (other_id uuid, username text, display_name text, avatar_url text, verified boolean, last_body text, last_at timestamptz, last_from_me boolean, unread bigint)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  WITH m AS (
    SELECT d.*, CASE WHEN d.sender_id = auth.uid() THEN d.recipient_id ELSE d.sender_id END AS other
    FROM direct_messages d WHERE auth.uid() IN (d.sender_id, d.recipient_id)
  ), last AS (SELECT DISTINCT ON (other) * FROM m ORDER BY other, created_at DESC)
  SELECT l.other, p.username, p.display_name, p.avatar_url, EXISTS (SELECT 1 FROM verified_profiles v WHERE v.profile_id = l.other),
    l.body, l.created_at, l.sender_id = auth.uid(),
    (SELECT count(*) FROM m WHERE m.other = l.other AND m.recipient_id = auth.uid() AND m.read_at IS NULL)
  FROM last l JOIN profiles p ON p.id = l.other ORDER BY l.created_at DESC
$$;
REVOKE ALL ON FUNCTION public.dm_threads() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.dm_threads() TO authenticated;