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
    const { data: demo, error } = await supabaseAdmin.from("site_demonstrations").select("id,name,category,address,phone,headline,description").eq("id", data.id).maybeSingle();
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

export const getDemonstrationSlugs = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ ids: z.array(z.string().uuid()).max(30) }).parse(input))
  .handler(async ({ data }) => {
    if (data.ids.length === 0) return [];
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows } = await supabaseAdmin.from("site_demonstrations").select("id,slug").in("id", data.ids);
    return (rows ?? []).map((r) => ({ id: r.id, slug: r.slug }));
  });

export const createDemonstration = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => demoSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { data: verified } = await context.supabase.rpc("am_i_verified");
    if (!verified) throw new Error("Demonstrações são exclusivas para contas verificadas.");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin.from("site_demonstrations").insert(data).select("id,name,slug").single();
    if (error || !row) throw new Error("Não foi possível salvar a demonstração.");
    return row;
  });

export const getDemonstrationActivity = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ ids: z.array(z.string().uuid()).max(30) }).parse(input))
  .handler(async ({ data }) => {
    if (data.ids.length === 0) return [];
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin.from("site_demonstrations").select("id,created_at,last_opened_at").in("id", data.ids);
    if (error) throw new Error("Não foi possível consultar os acessos.");
    return (rows ?? []).map((r) => ({ id: r.id, createdAt: r.created_at, lastOpenedAt: r.last_opened_at }));
  });
