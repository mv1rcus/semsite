-- Conquistas visiveis nos perfis publicos.
-- Expoe SO datas (nunca valores, nomes de clientes, telefones ou leads) de um usuario, para calcular as badges.
-- ATENCAO: rodar manualmente no SQL editor do Lovable Cloud (as migracoes nao rodam sozinhas).
CREATE OR REPLACE FUNCTION public.get_public_achievements(_user_id uuid)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT jsonb_build_object(
    'sales', COALESCE((SELECT jsonb_agg(closed_at ORDER BY closed_at) FROM (SELECT closed_at FROM public.closed_sales WHERE user_id = _user_id ORDER BY closed_at LIMIT 100) s), '[]'::jsonb),
    'demos', COALESCE((SELECT jsonb_agg(created_at ORDER BY created_at DESC) FROM (SELECT created_at FROM public.site_demonstrations WHERE owner_id = _user_id ORDER BY created_at DESC LIMIT 500) d), '[]'::jsonb),
    'searches', COALESCE((SELECT jsonb_agg(day ORDER BY day DESC) FROM (SELECT day FROM public.search_usage WHERE user_id = _user_id ORDER BY day DESC LIMIT 500) u), '[]'::jsonb),
    'contacts', COALESCE((SELECT jsonb_agg(created_at ORDER BY created_at DESC) FROM (SELECT created_at FROM public.contacted_leads WHERE user_id = _user_id ORDER BY created_at DESC LIMIT 500) c), '[]'::jsonb),
    'lead_replies', COALESCE((
      SELECT jsonb_agg(ev->>'date')
      FROM public.user_store us, LATERAL jsonb_array_elements(CASE WHEN jsonb_typeof(us.data->'events') = 'array' THEN us.data->'events' ELSE '[]'::jsonb END) ev
      WHERE us.user_id = _user_id AND us.kind = 'client' AND ev->>'stage' = 'demo_sent'
    ), '[]'::jsonb)
  );
$$;

REVOKE ALL ON FUNCTION public.get_public_achievements(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_public_achievements(uuid) TO authenticated;
