import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/** Dados do vendedor (clientes, funil, links salvos) guardados na conta. Tabela user_store com RLS por usuário. */
const kindSchema = z.enum(["client", "funnel", "saved_demo"]);
const itemSchema = z.object({
  id: z.string().min(1).max(300),
  position: z.number().int().min(0).max(100000),
  json: z.string().max(20000).refine((v) => { try { const x = JSON.parse(v); return !!x && typeof x === "object" && !Array.isArray(x); } catch { return false; } }, "Item inválido."),
});

function notReady(message: string | undefined) {
  return /user_store|does not exist|schema cache|relation/i.test(message ?? "");
}

export const loadStore = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ kind: kindSchema }).parse(d))
  .handler(async ({ data, context }) => {
    const { data: rows, error } = await (context.supabase as any).from("user_store").select("item_id,data,position").eq("kind", data.kind).order("position", { ascending: true }).limit(2000);
    // Migração ainda não rodou: o app continua só com o navegador, como antes.
    if (error) { if (notReady(error.message)) return { ready: false as const, items: [] as { id: string; json: string }[] }; throw new Error("Não foi possível carregar seus dados."); }
    return { ready: true as const, items: (rows ?? []).map((r: { item_id: string; data: unknown }) => ({ id: r.item_id, json: JSON.stringify(r.data) })) };
  });

export const saveStore = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ kind: kindSchema, items: z.array(itemSchema).max(2000), knownIds: z.array(z.string().max(300)).max(4000) }).parse(d))
  .handler(async ({ data, context }) => {
    const db = (context.supabase as any).from.bind(context.supabase);
    const now = new Date().toISOString();
    if (data.items.length) {
      const rows = data.items.map((item) => ({ user_id: context.userId, kind: data.kind, item_id: item.id, position: item.position, data: JSON.parse(item.json), updated_at: now }));
      const { error } = await db("user_store").upsert(rows, { onConflict: "user_id,kind,item_id" });
      if (error) throw new Error(notReady(error.message) ? "O salvamento na conta ainda não está ativo." : "Não foi possível salvar na sua conta agora.");
    }
    // Só apaga o que este aparelho já conhecia e removeu: itens criados em outro aparelho ficam.
    const keep = new Set(data.items.map((item) => item.id));
    const gone = data.knownIds.filter((id) => !keep.has(id));
    if (gone.length) {
      const { error } = await db("user_store").delete().eq("kind", data.kind).in("item_id", gone);
      if (error) throw new Error("Não foi possível salvar na sua conta agora.");
    }
    return { ok: true as const };
  });
