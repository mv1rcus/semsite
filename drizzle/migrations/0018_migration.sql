ALTER TABLE public.site_demonstrations
  ADD COLUMN IF NOT EXISTS place_id text,
  ADD COLUMN IF NOT EXISTS google_rating numeric,
  ADD COLUMN IF NOT EXISTS google_rating_count integer,
  ADD COLUMN IF NOT EXISTS google_reviews jsonb NOT NULL DEFAULT '[]'::jsonb;