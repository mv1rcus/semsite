import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { type StripeEnv, createStripeClient, getStripeErrorMessage } from "@/lib/stripe.server";

// Only the owner account (@mvthebest) can list or refund charges.
const OWNER_ID = "60254e77-1a4c-4be8-8b77-3d29a537785f";
const isEnv = (e: unknown): e is StripeEnv => e === "sandbox" || e === "live";

export type ChargeRow = {
  id: string; amount: number; refunded: number; currency: string; created: string;
  email: string | null; method: string | null; status: "pago" | "reembolsado" | "parcial" | "falhou" | "pendente"; description: string | null;
};

export const listCharges = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { environment: StripeEnv }) => { if (!isEnv(d.environment)) throw new Error("Ambiente inválido"); return d; })
  .handler(async ({ data, context }): Promise<{ charges: ChargeRow[] } | { error: string }> => {
    if (context.userId !== OWNER_ID) return { error: "Acesso negado." };
    try {
      const stripe = createStripeClient(data.environment);
      const list = await stripe.charges.list({ limit: 100 });
      return {
        charges: list.data.map((c) => ({
          id: c.id, amount: c.amount / 100, refunded: c.amount_refunded / 100, currency: c.currency,
          created: new Date(c.created * 1000).toISOString(),
          email: c.billing_details?.email ?? c.receipt_email ?? null,
          method: c.payment_method_details?.type ?? null,
          description: c.description ?? null,
          status: c.status === "failed" ? "falhou" : c.status === "pending" ? "pendente" : c.refunded ? "reembolsado" : c.amount_refunded > 0 ? "parcial" : "pago",
        })),
      };
    } catch (e) { return { error: getStripeErrorMessage(e) }; }
  });

export const refundCharge = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { environment: StripeEnv; chargeId: string }) => {
    if (!isEnv(d.environment)) throw new Error("Ambiente inválido");
    if (!/^(ch|py)_[A-Za-z0-9]+$/.test(d.chargeId)) throw new Error("Cobrança inválida");
    return d;
  })
  .handler(async ({ data, context }): Promise<{ ok: true } | { error: string }> => {
    if (context.userId !== OWNER_ID) return { error: "Acesso negado." };
    try {
      await createStripeClient(data.environment).refunds.create({ charge: data.chargeId });
      return { ok: true };
    } catch (e) { return { error: getStripeErrorMessage(e) }; }
  });
