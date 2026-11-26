-- Endurecimento de segurança (auditoria de 26/11/2026).
-- ATENÇÃO: rodar manualmente no SQL editor do Lovable Cloud (as migrações não rodam sozinhas),
-- ANTES de publicar o código deste PR. Cada bloco é independente e pode ser rodado em separado.
-- Nada aqui apaga dados.

-- 1) Privilégios de tabela. As policies de RLS já bloqueiam, mas o banco dá INSERT/UPDATE/DELETE
--    a anon e authenticated em todas as tabelas; aqui fica só o que o app usa (defesa em profundidade).
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon;

REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON public.verified_profiles FROM authenticated;
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON public.subscriptions FROM authenticated;
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON public.search_usage FROM authenticated;
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON public.osm_search_cache FROM authenticated;
REVOKE UPDATE, TRUNCATE ON public.direct_messages FROM authenticated;
GRANT UPDATE (read_at) ON public.direct_messages TO authenticated;
-- Tabelas só de leitura pelo cliente: o cliente nunca atualiza curtidas, reposts, follows, comentários.
REVOKE UPDATE, TRUNCATE ON public.follows, public.post_likes, public.post_reposts, public.post_comments, public.profile_likes, public.posts FROM authenticated;

-- 2) Funções SECURITY DEFINER: só quem está logado (e o servidor) executa; anon não.
DO $$
DECLARE f record;
BEGIN
  FOR f IN
    SELECT p.oid::regprocedure AS sig, p.proname
    FROM pg_proc p JOIN pg_namespace s ON s.oid = p.pronamespace
    WHERE s.nspname = 'public' AND p.prokind = 'f' AND p.prosecdef
      AND p.proname IN ('am_i_verified','consume_search','feed_posts','get_post','post_comments_list',
                        'posts_by_tag','searches_left_today','trending_tags','who_to_follow')
  LOOP
    EXECUTE format('REVOKE ALL ON FUNCTION %s FROM PUBLIC, anon', f.sig);
    EXECUTE format('GRANT EXECUTE ON FUNCTION %s TO authenticated, service_role', f.sig);
  END LOOP;
  -- Funções de gatilho: ninguém chama direto.
  FOR f IN
    SELECT p.oid::regprocedure AS sig
    FROM pg_proc p JOIN pg_namespace s ON s.oid = p.pronamespace
    WHERE s.nspname = 'public' AND p.proname IN ('handle_new_user_profile','sync_subscription_verified')
  LOOP
    EXECUTE format('REVOKE ALL ON FUNCTION %s FROM PUBLIC, anon, authenticated', f.sig);
  END LOOP;
END $$;

-- 3) Pagamento: uma concessão por evento do Stripe (reenvio não soma meses de novo).
CREATE TABLE IF NOT EXISTS public.stripe_events_processed (
  event_id text PRIMARY KEY,
  processed_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.stripe_events_processed ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.stripe_events_processed FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.stripe_events_processed TO service_role;

CREATE OR REPLACE FUNCTION public.grant_paid_months_once(p_event text, p_profile uuid, p_months int)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE inserted int;
BEGIN
  IF p_event IS NULL OR length(p_event) = 0 THEN RAISE EXCEPTION 'missing_event'; END IF;
  INSERT INTO public.stripe_events_processed(event_id) VALUES (p_event) ON CONFLICT DO NOTHING;
  GET DIAGNOSTICS inserted = ROW_COUNT;
  IF inserted = 0 THEN RETURN; END IF; -- já processado
  PERFORM public.grant_paid_months(p_profile, p_months); -- se falhar, desfaz o registro do evento junto
END $$;
REVOKE ALL ON FUNCTION public.grant_paid_months_once(text, uuid, int) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.grant_paid_months_once(text, uuid, int) TO service_role;

-- 4) Limite de uso por conta (contra spam por conta nova). Estoura => erro 'rate_limited'.
CREATE OR REPLACE FUNCTION public.enforce_rate_limit() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE uid uuid; lim int := TG_ARGV[1]::int; n int;
BEGIN
  uid := (to_jsonb(NEW) ->> TG_ARGV[0])::uuid;
  EXECUTE format('SELECT count(*) FROM %I.%I WHERE %I = $1 AND created_at > now() - interval ''1 hour''', TG_TABLE_SCHEMA, TG_TABLE_NAME, TG_ARGV[0])
    INTO n USING uid;
  IF n >= lim THEN RAISE EXCEPTION 'rate_limited'; END IF;
  RETURN NEW;
END $$;
REVOKE ALL ON FUNCTION public.enforce_rate_limit() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS posts_rate_limit ON public.posts;
CREATE TRIGGER posts_rate_limit BEFORE INSERT ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.enforce_rate_limit('user_id', '30');
DROP TRIGGER IF EXISTS post_comments_rate_limit ON public.post_comments;
CREATE TRIGGER post_comments_rate_limit BEFORE INSERT ON public.post_comments
  FOR EACH ROW EXECUTE FUNCTION public.enforce_rate_limit('user_id', '60');
DROP TRIGGER IF EXISTS direct_messages_rate_limit ON public.direct_messages;
CREATE TRIGGER direct_messages_rate_limit BEFORE INSERT ON public.direct_messages
  FOR EACH ROW EXECUTE FUNCTION public.enforce_rate_limit('sender_id', '60');
