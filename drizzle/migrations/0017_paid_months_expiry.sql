-- Pagamento à vista (plano anual no Pix): o selo passa a ter data de validade.
ALTER TABLE public.verified_profiles ADD COLUMN IF NOT EXISTS expires_at timestamptz;

-- Concede N meses de acesso pago a uma conta (usado pelo aviso de pagamento).
CREATE OR REPLACE FUNCTION public.grant_paid_months(p_profile uuid, p_months int DEFAULT 12)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE cur public.verified_profiles%ROWTYPE;
BEGIN
  IF p_months IS NULL OR p_months < 1 OR p_months > 60 THEN RAISE EXCEPTION 'invalid_months'; END IF;
  IF NOT EXISTS (SELECT 1 FROM profiles WHERE id = p_profile) THEN RETURN; END IF;
  SELECT * INTO cur FROM verified_profiles WHERE profile_id = p_profile;
  IF NOT FOUND THEN
    INSERT INTO verified_profiles(profile_id, source, expires_at)
      VALUES (p_profile, 'one_time', now() + make_interval(months => p_months));
  ELSIF cur.source = 'manual' THEN
    RETURN; -- selo gratuito permanente: nada a somar
  ELSE
    UPDATE verified_profiles
       SET source = 'one_time',
           expires_at = GREATEST(COALESCE(expires_at, now()), now()) + make_interval(months => p_months)
     WHERE profile_id = p_profile;
  END IF;
END $$;
REVOKE ALL ON FUNCTION public.grant_paid_months(uuid, int) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.grant_paid_months(uuid, int) TO service_role;

-- Quem também paga mensal mantém o selo mesmo depois de vencer o período à vista.
CREATE OR REPLACE FUNCTION public.sweep_verified_expiry()
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  UPDATE public.verified_profiles v SET source = 'subscription', expires_at = NULL
   WHERE v.expires_at IS NOT NULL AND v.expires_at <= now()
     AND EXISTS (SELECT 1 FROM subscriptions s WHERE s.user_id = v.profile_id
       AND s.status IN ('active','trialing') AND (s.current_period_end IS NULL OR s.current_period_end > now()));
  DELETE FROM public.verified_profiles v
   WHERE v.expires_at IS NOT NULL AND v.expires_at <= now()
     AND NOT EXISTS (SELECT 1 FROM subscriptions s WHERE s.user_id = v.profile_id
       AND s.status IN ('active','trialing') AND (s.current_period_end IS NULL OR s.current_period_end > now()));
END $$;
REVOKE ALL ON FUNCTION public.sweep_verified_expiry() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.sweep_verified_expiry() TO service_role;

-- As travasparam no segundo em que o período pago termina.
CREATE OR REPLACE FUNCTION public.am_i_verified()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM verified_profiles WHERE profile_id = auth.uid()
    AND (expires_at IS NULL OR expires_at > now()));
$$;
GRANT EXECUTE ON FUNCTION public.am_i_verified() TO authenticated;

CREATE OR REPLACE FUNCTION public.searches_left_today()
RETURNS int LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT CASE WHEN EXISTS (SELECT 1 FROM verified_profiles WHERE profile_id = auth.uid()
      AND (expires_at IS NULL OR expires_at > now())) THEN -1
    ELSE GREATEST(0, 5 - COALESCE((SELECT count FROM search_usage WHERE user_id = auth.uid() AND day = (now() AT TIME ZONE 'America/Sao_Paulo')::date), 0)) END;
$$;
GRANT EXECUTE ON FUNCTION public.searches_left_today() TO authenticated;

CREATE OR REPLACE FUNCTION public.consume_search()
RETURNS int LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE uid uuid := auth.uid(); d date := (now() AT TIME ZONE 'America/Sao_Paulo')::date; c int;
BEGIN
  IF uid IS NULL THEN RAISE EXCEPTION 'not_authenticated'; END IF;
  IF EXISTS (SELECT 1 FROM verified_profiles WHERE profile_id = uid AND (expires_at IS NULL OR expires_at > now())) THEN RETURN -1; END IF;
  INSERT INTO search_usage(user_id, day, count) VALUES (uid, d, 0) ON CONFLICT DO NOTHING;
  SELECT count INTO c FROM search_usage WHERE user_id = uid AND day = d FOR UPDATE;
  IF c >= 5 THEN RAISE EXCEPTION 'search_limit_reached'; END IF;
  UPDATE search_usage SET count = c + 1 WHERE user_id = uid AND day = d;
  RETURN 5 - (c + 1);
END $$;
GRANT EXECUTE ON FUNCTION public.consume_search() TO authenticated;

-- Limpeza horária: selos vencidos saem do ar.
SELECT cron.schedule('verified_expiry_sweep', '17 * * * *', 'SELECT public.sweep_verified_expiry();');