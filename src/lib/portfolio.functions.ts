import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

// Portfólio público (/portfolio/<username>): lista só demos que o dono marcou.
// Nunca expõe owner_id, telefone, endereço ou qualquer contato do negócio.
const USERNAME_RE = /^[a-z0-9_.]{3,30}$/;

export type PortfolioDemo = { id: string; name: string; category: string; slug: string | null; createdAt: string };
export type Portfolio = { username: string; displayName: string; demos: PortfolioDemo[]; portfolioReady: boolean };

export const setPortfolioVisibility = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid(), show: z.boolean() }).parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    // Só o dono liga/desliga o portfólio: o filtro por owner_id impede mexer na demo de outra pessoa.
    const { data: updated, error } = await supabaseAdmin.from("site_demonstrations").update({ show_in_portfolio: data.show }).eq("id", data.id).eq("owner_id", context.userId).select("id");
    if (error) {
      if (/show_in_portfolio/i.test(error.message ?? "")) throw new Error("O portfólio ainda não está ativo neste banco (migração pendente).");
      throw new Error("Não foi possível atualizar o portfólio agora.");
    }
    if (!updated || updated.length === 0) throw new Error("Demonstração não encontrada ou não pertence a você.");
    return { id: data.id, show: data.show };
  });

export const getPortfolio = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ username: z.string().regex(USERNAME_RE) }).parse(input))
  .handler(async ({ data }): Promise<Portfolio | null> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: profile, error: profileError } = await supabaseAdmin.from("profiles").select("id,username,display_name").eq("username", data.username).maybeSingle();
    if (profileError) throw new Error("Não foi possível abrir este portfólio.");
    if (!profile) return null;
    const displayName = String(profile.display_name ?? "").trim() || data.username;
    const now = new Date().toISOString();
    const { data: rows, error } = await supabaseAdmin
      .from("site_demonstrations")
      .select("id,name,category,slug,created_at")
      .eq("owner_id", profile.id)
      .eq("show_in_portfolio", true)
      .or(`expires_at.is.null,expires_at.gt.${now}`)
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) {
      // Coluna ainda não aplicada (migração de portfólio pendente): página abre vazia, sem vazar nada.
      if (/show_in_portfolio/i.test(error.message ?? "")) return { username: data.username, displayName, demos: [], portfolioReady: false };
      throw new Error("Não foi possível abrir este portfólio.");
    }
    const demos = (rows ?? []).map((r: { id: string; name: string; category: string; slug: string | null; created_at: string }) => ({ id: r.id, name: r.name, category: r.category, slug: r.slug ?? null, createdAt: r.created_at }));
    return { username: data.username, displayName, demos, portfolioReady: true };
  });
