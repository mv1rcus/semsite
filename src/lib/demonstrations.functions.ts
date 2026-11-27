import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { Json } from "@/integrations/supabase/types";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { demonstrationLink, demoSchema, demoDeviceFromUserAgent } from "./demonstrations";
import { demonstrationPageIsAvailable, type DemoVerification } from "./demo-verification";
import { DEFAULT_EXPIRY_DAYS, expiryDate, isExpired, isNewOpenSession } from "./demo-expiry";
import { filterOwnedDemonstrations } from "./demo-ownership";

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
const DEMO_COLUMNS = "id,name,category,address,phone,headline,description,google_rating,google_rating_count,google_reviews";
export const getDemonstration = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    type DemoRow = { id: string; name: string; category: string; address: string; phone: string; headline: string; description: string; google_rating: number | null; google_rating_count: number | null; google_reviews: Json; expires_at?: string | null; open_count?: number; last_opened_at?: string | null };
    let res: { data: unknown; error: unknown } = await supabaseAdmin.from("site_demonstrations").select(`${DEMO_COLUMNS},expires_at,open_count,last_opened_at`).eq("id", data.id).maybeSingle();
    if (res.error) {
      // Colunas novas ainda não aplicadas (migração de validade pendente): abre a demo sem validade nem contador.
      res = await supabaseAdmin.from("site_demonstrations").select(DEMO_COLUMNS).eq("id", data.id).maybeSingle();
    }
    if (res.error) throw new Error("Não foi possível abrir esta demonstração.");
    const row = res.data as DemoRow | null;
    if (!row) return null;
    const { expires_at, open_count, last_opened_at, ...demo } = row;
    const expiresAt = expires_at ?? null;
    // Prévia vencida: não mostra o conteúdo nem conta como abertura.
    if (isExpired(expiresAt)) {
      return { id: demo.id, name: demo.name, category: "", address: "", phone: "", headline: "", description: "", google_rating: null, google_rating_count: null, google_reviews: [] as Json, expired: true, expiresAt };
    }
    const { getRequest } = await import("@tanstack/react-start/server");
    const device = demoDeviceFromUserAgent(getRequest().headers.get("user-agent"));
    // Só grava o aparelho quando o acesso veio de um navegador de verdade (ignora bots de prévia).
    const openedAt = new Date().toISOString();
    // Bot de prévia/rastreador não grava nada: cada write aqui custa Compute e banco.
    if (device) {
      const counts = isNewOpenSession(last_opened_at ?? null);
      const tracked = await supabaseAdmin.from("site_demonstrations").update({ last_opened_at: openedAt, last_opened_device: device, ...(counts && open_count !== undefined ? { open_count: open_count + 1 } : {}) }).eq("id", demo.id);
      if (tracked.error) {
        // Coluna ainda não aplicada (migração 0019 pendente): registra só o horário até lá.
        await supabaseAdmin.from("site_demonstrations").update({ last_opened_at: openedAt }).eq("id", demo.id);
      }
    }
    return { ...demo, expired: false, expiresAt };
  });

// Resolves a short public address (e.g. pizzariadomarcusdemo) to its demonstration id.
export const getDemonstrationIdBySlug = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ slug: z.string().regex(/^[a-z0-9]{1,40}demo\d*$/) }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row } = await supabaseAdmin.from("site_demonstrations").select("id").eq("slug", data.slug).maybeSingle();
    return row?.id ?? null;
  });

// Endereço curto público da demo: nome do negócio sem acentos e espaços + "demo" (ex.: pizzariadomarcusdemo).
function demoSlugBase(name: string) {
  const base = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 40);
  return `${base || "meunegocio"}demo`;
}

// Primeiro slug livre para o negócio; se já existir, tenta sufixo numérico (pizzariadomarcusdemo2, demo3...).
async function uniqueDemoSlug(supabaseAdmin: any, name: string): Promise<string> {
  const base = demoSlugBase(name);
  for (let attempt = 0; attempt < 10; attempt++) {
    const slug = attempt === 0 ? base : `${base}${attempt + 1}`;
    const { data } = await supabaseAdmin.from("site_demonstrations").select("id").eq("slug", slug).maybeSingle();
    if (!data) return slug;
  }
  return `${base}${Date.now() % 100000}`;
}

// Colunas que podem faltar enquanto a migração correspondente não roda: tenta sem elas antes de desistir.
const OPTIONAL_DEMO_COLUMNS = ["owner_id", "expires_at", "slug"] as const;
async function insertDemonstration(supabaseAdmin: any, row: Record<string, unknown>) {
  let attempt = { ...row };
  for (;;) {
    const returning = ["id", "name", ...("slug" in attempt ? ["slug"] : [])].join(",");
    const { data, error } = await supabaseAdmin.from("site_demonstrations").insert(attempt).select(returning).single();
    if (!error) return { row: { slug: null, ...data } as { id: string; name: string; slug: string | null }, error: null };
    const message = String((error as { message?: string } | null)?.message ?? "").toLowerCase();
    const optional = OPTIONAL_DEMO_COLUMNS.find((column) => column in attempt && message.includes(column));
    if (!optional) return { row: null, error };
    const { [optional]: _dropped, ...rest } = attempt;
    attempt = rest;
  }
}

export const createDemonstration = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => demoSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { data: verified } = await context.supabase.rpc("am_i_verified");
    if (!verified) throw new Error("Demonstrações são exclusivas para contas verificadas.");
    const { placeId, expiresInDays, ...fields } = data;
    const google = placeId ? await fetchGoogleReviews(placeId) : null;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const slug = await uniqueDemoSlug(supabaseAdmin, fields.name);
    const base = { ...fields, place_id: placeId ?? null, google_rating: google?.rating ?? null, google_rating_count: google?.count ?? null, google_reviews: google?.reviews ?? [] };
    const expires_at = expiryDate(expiresInDays ?? DEFAULT_EXPIRY_DAYS);
    // Toda demo nova registra o dono (usuário logado): só ele ajusta validade e vê a atividade.
    const { row, error } = await insertDemonstration(supabaseAdmin, { ...base, slug, expires_at, owner_id: context.userId });
    if (error || !row) throw new Error("Não foi possível salvar a demonstração.");
    return row;
  });

export const setDemonstrationExpiry = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid(), days: z.number().int().min(1).max(365) }).parse(input))
  .handler(async ({ data, context }) => {
    const { data: verified } = await context.supabase.rpc("am_i_verified");
    if (!verified) throw new Error("Demonstrações são exclusivas para contas verificadas.");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const expires_at = expiryDate(data.days);
    // Só o dono muda a validade: o filtro por owner_id impede mexer na demo de outra pessoa.
    // Demos antigas sem dono (owner_id NULL) não batem no filtro e ficam congeladas.
    const { data: updated, error } = await supabaseAdmin.from("site_demonstrations").update({ expires_at }).eq("id", data.id).eq("owner_id", context.userId).select("id");
    if (error) throw new Error("Não foi possível ajustar a validade agora.");
    if (!updated || updated.length === 0) throw new Error("Demonstração não encontrada ou não pertence a você.");
    return { id: data.id, expiresAt: expires_at };
  });

export const getDemonstrationActivity = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ ids: z.array(z.string().uuid()).max(30) }).parse(input))
  .handler(async ({ data, context }) => {
    if (data.ids.length === 0) return [];
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    type ActivityRow = { id: string; slug: string | null; created_at: string; last_opened_at: string | null; last_opened_device: string | null; open_count?: number | null; expires_at?: string | null; owner_id?: string | null; show_in_portfolio?: boolean | null };
    // Só o dono vê a atividade: filtra por owner_id no banco e de novo na saída (defesa em profundidade).
    let rows: ActivityRow[] | null = (await supabaseAdmin.from("site_demonstrations").select("id,slug,created_at,last_opened_at,last_opened_device,open_count,expires_at,owner_id,show_in_portfolio").in("id", data.ids).eq("owner_id", context.userId)).data;
    if (rows === null) {
      // Colunas de validade/contador podem faltar: tenta o conjunto anterior antes de desistir.
      rows = (await supabaseAdmin.from("site_demonstrations").select("id,slug,created_at,last_opened_at,last_opened_device,owner_id").in("id", data.ids).eq("owner_id", context.userId)).data as ActivityRow[] | null;
    }
    if (rows === null) {
      // Coluna ainda não aplicada (migração 0019 pendente): responde sem o aparelho até lá.
      const fallback = await supabaseAdmin.from("site_demonstrations").select("id,slug,created_at,last_opened_at,owner_id").in("id", data.ids).eq("owner_id", context.userId);
      if (fallback.error) {
        // owner_id ainda não aplicado (migração de dono pendente): falha fechado, sem atividade até lá.
        if (/owner_id/i.test(fallback.error.message ?? "")) return [];
        throw new Error("Não foi possível consultar os acessos.");
      }
      rows = (fallback.data ?? []).map((r) => ({ ...r, last_opened_device: null }));
    }
    return filterOwnedDemonstrations(rows ?? [], context.userId).map((r) => ({ id: r.id, slug: r.slug, createdAt: r.created_at, lastOpenedAt: r.last_opened_at, lastOpenedDevice: r.last_opened_device, openCount: r.open_count ?? 0, expiresAt: r.expires_at ?? null, showInPortfolio: r.show_in_portfolio ?? false }));
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
