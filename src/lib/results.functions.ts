import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/** Vendas fechadas do usuário (uma linha por negócio fechado). Tabela por usuário com RLS própria. */
const saleInput = z.object({
  clientId: z.string().trim().min(1).max(300),
  clientName: z.string().trim().min(1).max(160),
  amountCents: z.number().int().min(0).max(999999999),
});

function migrationPending(message: string | undefined) {
  return /closed_sales|does not exist|schema cache|relation/i.test(message ?? "");
}

export const recordClosedSale = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => saleInput.parse(d))
  .handler(async ({ data, context }) => {
    // RLS garante user_id = auth.uid(); cada usuário só grava e lê as próprias vendas.
    const { error } = await (context.supabase as any).from("closed_sales").insert({ client_id: data.clientId, client_name: data.clientName, amount_cents: data.amountCents });
    if (error) throw new Error(migrationPending(error.message) ? "O registro de vendas ainda não está ativo. Tente novamente em instantes." : "Não foi possível registrar a venda agora.");
    return { ok: true as const };
  });

export const getClosedSales = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await (context.supabase as any).from("closed_sales").select("client_id,client_name,amount_cents,closed_at").order("closed_at", { ascending: false }).limit(500);
    if (error) {
      // Migração ainda não rodou: painel abre sem o bloco de vendas em vez de quebrar.
      if (migrationPending(error.message)) return [];
      throw new Error("Não foi possível consultar as vendas.");
    }
    return (data ?? []).map((row: { client_id: string; client_name: string; amount_cents: number; closed_at: string }) => ({ clientId: row.client_id, clientName: row.client_name, amountCents: row.amount_cents, closedAt: row.closed_at }));
  });

/** Números do mês para o painel do vendedor: demos (dono) e vendas (RLS), tudo filtrado por usuário. */
export const getMonthlyResults = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const start = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    // Só as demos do usuário logado (owner_id), igual à atividade de demonstrações.
    const { count: created, error: createdError } = await supabaseAdmin.from("site_demonstrations").select("id", { count: "exact", head: true }).eq("owner_id", context.userId).gte("created_at", start);
    const { count: opened, error: openedError } = await supabaseAdmin.from("site_demonstrations").select("id", { count: "exact", head: true }).eq("owner_id", context.userId).gte("last_opened_at", start);
    let closedCount = 0, closedAmountCents = 0, salesReady = true;
    const { data: sales, error: salesError } = await (context.supabase as any).from("closed_sales").select("amount_cents").gte("closed_at", start);
    if (salesError) salesReady = !migrationPending(salesError.message);
    else {
      closedCount = (sales ?? []).length;
      closedAmountCents = (sales ?? []).reduce((total: number, sale: { amount_cents: number }) => total + (sale.amount_cents ?? 0), 0);
    }
    return {
      demosCreated: createdError ? 0 : (created ?? 0),
      demosOpened: openedError ? 0 : (opened ?? 0),
      closedCount,
      closedAmountCents,
      /** false = migração do registro de vendas ainda não rodou no banco. */
      salesReady,
    };
  });
