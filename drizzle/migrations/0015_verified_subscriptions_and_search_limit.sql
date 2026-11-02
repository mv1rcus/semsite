ALTER TABLE public.verified_profiles ADD COLUMN IF NOT EXISTS source text NOT NULL DEFAULT 'manual';

CREATE TABLE public.subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  stripe_subscription_id text NOT NULL UNIQUE,
  stripe_customer_id text NOT NULL,
  product_id text NOT NULL,
  price_id text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean NOT NULL DEFAULT false,
  environment text NOT NULL DEFAULT 'sandbox',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_subscriptions_user ON public.subscriptions(user_id);
GRANT SELECT ON public.subscriptions TO authenticated;
GRANT ALL ON public.subscriptions TO service_role;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own subscriptions" ON public.subscriptions FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.search_usage (
  user_id uuid NOT NULL,
  day date NOT NULL,
  count int NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, day)
);
GRANT SELECT ON public.search_usage TO authenticated;
GRANT ALL ON public.search_usage TO service_role;
ALTER TABLE public.search_usage ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own usage" ON public.search_usage FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Paid access: active/trialing and inside the paid period. Cancel keeps access until period end
-- (Stripe keeps status active until then); failed payments (past_due/unpaid) remove it at once.
CREATE OR REPLACE FUNCTION public.sync_subscription_verified()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE has_paid boolean;
BEGIN
  SELECT EXISTS (SELECT 1 FROM subscriptions s WHERE s.user_id = NEW.user_id
    AND s.status IN ('active','trialing')
    AND (s.current_period_end IS NULL OR s.current_period_end > now())) INTO has_paid;
  IF has_paid THEN
    INSERT INTO verified_profiles(profile_id, source)
      SELECT NEW.user_id, 'subscription' WHERE EXISTS (SELECT 1 FROM profiles p WHERE p.id = NEW.user_id)
      ON CONFLICT (profile_id) DO NOTHING;
  ELSE
    DELETE FROM verified_profiles WHERE profile_id = NEW.user_id AND source = 'subscription';
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER subscriptions_sync_verified AFTER INSERT OR UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.sync_subscription_verified();

CREATE OR REPLACE FUNCTION public.am_i_verified()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM verified_profiles WHERE profile_id = auth.uid());
$$;
GRANT EXECUTE ON FUNCTION public.am_i_verified() TO authenticated;

CREATE OR REPLACE FUNCTION public.searches_left_today()
RETURNS int LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT CASE WHEN EXISTS (SELECT 1 FROM verified_profiles WHERE profile_id = auth.uid()) THEN -1
    ELSE GREATEST(0, 5 - COALESCE((SELECT count FROM search_usage WHERE user_id = auth.uid() AND day = (now() AT TIME ZONE 'America/Sao_Paulo')::date), 0)) END;
$$;
GRANT EXECUTE ON FUNCTION public.searches_left_today() TO authenticated;

-- Consumes one daily search for non-verified users; returns remaining (-1 = unlimited) or raises.
CREATE OR REPLACE FUNCTION public.consume_search()
RETURNS int LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE uid uuid := auth.uid(); d date := (now() AT TIME ZONE 'America/Sao_Paulo')::date; c int;
BEGIN
  IF uid IS NULL THEN RAISE EXCEPTION 'not_authenticated'; END IF;
  IF EXISTS (SELECT 1 FROM verified_profiles WHERE profile_id = uid) THEN RETURN -1; END IF;
  INSERT INTO search_usage(user_id, day, count) VALUES (uid, d, 0) ON CONFLICT DO NOTHING;
  SELECT count INTO c FROM search_usage WHERE user_id = uid AND day = d FOR UPDATE;
  IF c >= 5 THEN RAISE EXCEPTION 'search_limit_reached'; END IF;
  UPDATE search_usage SET count = c + 1 WHERE user_id = uid AND day = d;
  RETURN 5 - (c + 1);
END $$;
GRANT EXECUTE ON FUNCTION public.consume_search() TO authenticated;