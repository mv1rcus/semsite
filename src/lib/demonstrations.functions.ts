import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { demonstrationLink, demoSchema } from "./demonstrations";
import { demonstrationPageIsAvailable, type DemoVerification } from "./demo-verification";

export const verifyDemonstrationLink = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }): Promise<DemoVerification> => {
    let status: DemoVerification["status"] = "failed";
    try {
      const response = await fetch(demonstrationLink(data.id, "https://semsite.lovable.app"), {
        redirect: "error", signal: AbortSignal.timeout(15000),
        headers: { Accept: "text/html", "Cache-Control": "no-cache" },
      });
      if (demonstrationPageIsAvailable(response.status, await response.text())) status = "ok";
    } catch {
      // The published worker cannot fetch its own domain; confirm the record the share page reads instead.
      try {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data: row } = await supabaseAdmin.from("site_demonstrations").select("id").eq("id", data.id).maybeSingle();
        if (row) status = "ok";
      } catch { /* Unreachable links are never marked as verified. */ }
    }
    return { status, checkedAt: new Date().toISOString() };
  });

// The table has no public policies: rows are only reachable by exact id (never listed) through these functions.
export const getDemonstration = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: demo, error } = await supabaseAdmin.from("site_demonstrations").select("id,name,category,address,phone,headline,description,google_rating,google_rating_count,google_reviews").eq("id", data.id).maybeSingle();
    if (error) throw new Error("Não foi possível abrir esta demonstração.");
    if (demo) await supabaseAdmin.from("site_demonstrations").update({ last_opened_at: new Date().toISOString() }).eq("id", demo.id);
    return demo;
  });

// Resolves a short public address (e.g. pizzariadomarcusdemo) to its demonstration id.
export const getDemonstrationIdBySlug = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ slug: z.string().regex(/^[a-z0-9]{1,40}demo\d*$/) }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row } = await supabaseAdmin.from("site_demonstrations").select("id").eq("slug", data.slug).maybeSingle();
    return row?.id ?? null;
  });

export const createDemonstration = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => demoSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { data: verified } = await context.supabase.rpc("am_i_verified");
    if (!verified) throw new Error("Demonstrações são exclusivas para contas verificadas.");
    const { placeId, ...fields } = data;
    const google = placeId ? await fetchGoogleReviews(placeId) : null;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin.from("site_demonstrations").insert({ ...fields, place_id: placeId ?? null, google_rating: google?.rating ?? null, google_rating_count: google?.count ?? null, google_reviews: google?.reviews ?? [] }).select("id,name,slug").single();
    if (error || !row) throw new Error("Não foi possível salvar a demonstração.");
    return row;
  });

export const getDemonstrationActivity = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ ids: z.array(z.string().uuid()).max(30) }).parse(input))
  .handler(async ({ data }) => {
    if (data.ids.length === 0) return [];
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin.from("site_demonstrations").select("id,slug,created_at,last_opened_at").in("id", data.ids);
    if (error) throw new Error("Não foi possível consultar os acessos.");
    return (rows ?? []).map((r) => ({ id: r.id, slug: r.slug, createdAt: r.created_at, lastOpenedAt: r.last_opened_at }));
  });

// Real Google reviews (max 5, Google's choice) fetched once at creation; failures just leave the section hidden.
async function fetchGoogleReviews(placeId: string) {
  const ownKey = process.env["GOOGLE_PLACES_API_KEY"];
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const mapsKey = process.env["GOOGLE_MAPS_API_KEY"];
  if (!ownKey && (!lovableKey || !mapsKey)) return null;
  const base = ownKey ? "https://places.googleapis.com" : "https://connector-gateway.lovable.dev/google_maps/places";
  const headers: Record<string, string> = ownKey ? { "X-Goog-Api-Key": ownKey } : { Authorization: `Bearer ${lovableKey}`, "X-Connection-Api-Key": mapsKey! };
  try {
    const res = await fetch(`${base}/v1/places/${encodeURIComponent(placeId)}?languageCode=pt-BR`, { signal: AbortSignal.timeout(10000), headers: { ...headers, "X-Goog-FieldMask": "rating,userRatingCount,reviews" } });
    if (!res.ok) { console.error(`Place reviews failed [${res.status}]: ${await res.text()}`); return null; }
    const j = await res.json() as { rating?: number; userRatingCount?: number; reviews?: { rating?: number; text?: { text?: string }; originalText?: { text?: string }; authorAttribution?: { displayName?: string }; relativePublishTimeDescription?: string }[] };
    const reviews = (j.reviews ?? []).map(r => ({ author: (r.authorAttribution?.displayName ?? "Cliente do Google").slice(0, 80), rating: Math.max(1, Math.min(5, Math.round(r.rating ?? 5))), text: (r.text?.text ?? r.originalText?.text ?? "").slice(0, 600), when: (r.relativePublishTimeDescription ?? "").slice(0, 60) })).filter(r => r.text.trim());
    return { rating: j.rating ?? null, count: j.userRatingCount ?? null, reviews };
  } catch (e) { console.error("Place reviews error", e); return null; }
}
