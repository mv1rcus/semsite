import type StripeLib from "stripe";
import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { type StripeEnv, createStripeClient, getStripeErrorMessage } from "@/lib/stripe.server";
import { FREE_DAILY_SEARCHES, VERIFIED_PRICE_IDS, VERIFIED_PLANS, type VerifiedPriceId } from "@/lib/verified-plans";

type Stripe = ReturnType<typeof createStripeClient>;

async function resolveOrCreateCustomer(stripe: Stripe, options: { email?: string | undefined; userId: string }): Promise<string> {
  if (!/^[a-zA-Z0-9_-]+$/.test(options.userId)) throw new Error("Invalid userId");
  const found = await stripe.customers.search({ query: `metadata['userId']:'${options.userId}'`, limit: 1 });
  if (found.data[0]) return found.data[0].id;
  if (options.email) {
    const existing = await stripe.customers.list({ email: options.email, limit: 1 });
    const customer = existing.data[0];
    if (customer) {
      if (customer.metadata?.['userId'] !== options.userId) {
        await stripe.customers.update(customer.id, { metadata: { ...customer.metadata, userId: options.userId } });
      }
      return customer.id;
    }
  }
  const created = await stripe.customers.create({ ...(options.email && { email: options.email }), metadata: { userId: options.userId } });
  return created.id;
}

const isEnv = (e: unknown): e is StripeEnv => e === "sandbox" || e === "live";

export const createVerifiedCheckout = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { priceId: VerifiedPriceId; returnUrl: string; environment: StripeEnv }) => {
    if (!VERIFIED_PRICE_IDS.includes(d.priceId)) throw new Error("Plano inválido");
    if (!isEnv(d.environment)) throw new Error("Ambiente inválido");
    if (!/^https?:\/\//.test(d.returnUrl) || d.returnUrl.length > 500) throw new Error("Endereço de retorno inválido");
    return d;
  })
  .handler(async ({ data, context }): Promise<{ clientSecret: string } | { error: string }> => {
    const { supabase, userId } = context;
    const { data: verified } = await supabase.rpc("am_i_verified");
    if (verified) return { error: "Sua conta já é verificada." };
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const stripe = createStripeClient(data.environment);
      const prices = await stripe.prices.list({ lookup_keys: [data.priceId] });
      const price = prices.data[0];
      if (!price) return { error: "Plano não encontrado." };
      const customer = await resolveOrCreateCustomer(stripe, { email: user?.email ?? undefined, userId });
      const plan = VERIFIED_PLANS.find(p => p.id === data.priceId);
      const isRecurring = price.type === "recurring";
      // Pagamento à vista (plano anual no Pix): descreve a cobrança pra ela aparecer
      // com nome no painel de pagamentos.
      let description: string | undefined;
      if (!isRecurring) {
        const productId = typeof price.product === "string" ? price.product : price.product?.id;
        if (productId) description = (await stripe.products.retrieve(productId)).name;
      }
      const session = await stripe.checkout.sessions.create({
        line_items: [{ price: price.id, quantity: 1 }],
        mode: isRecurring ? "subscription" : "payment",
        ui_mode: "embedded_page",
        locale: "pt-BR",
        return_url: data.returnUrl,
        customer,
        // Cartão cobre crédito, débito, Apple Pay e Google Pay; Pix só em pagamento único. Boleto fica de fora.
        ...(isRecurring ? {} : { payment_method_types: ["card", "pix"] as ("card" | "pix")[] }),
        // Automatic tax isn't supported for this seller account country, so no tax automation is added.
        metadata: { userId, managed_payments: "false", ...(plan?.months ? { paid_months: String(plan.months) } : {}) },
        ...(isRecurring
          ? { subscription_data: { metadata: { userId } } }
          : { payment_intent_data: { ...(description ? { description } : {}), metadata: { userId } } }),
      });
      return { clientSecret: session.client_secret ?? "" };
    } catch (error) {
      return { error: getStripeErrorMessage(error) };
    }
  });

export const createVerifiedPortal = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { returnUrl: string; environment: StripeEnv }) => {
    if (!isEnv(d.environment)) throw new Error("Ambiente inválido");
    return d;
  })
  .handler(async ({ data, context }): Promise<{ url: string } | { error: string }> => {
    const { data: sub } = await context.supabase.from("subscriptions").select("stripe_customer_id")
      .eq("user_id", context.userId).eq("environment", data.environment)
      .order("created_at", { ascending: false }).limit(1).maybeSingle();
    if (!sub?.stripe_customer_id) return { error: "Nenhuma assinatura encontrada." };
    try {
      const stripe = createStripeClient(data.environment);
      const portal = await stripe.billingPortal.sessions.create({ customer: sub.stripe_customer_id, return_url: data.returnUrl });
      return { url: portal.url };
    } catch (error) {
      return { error: getStripeErrorMessage(error) };
    }
  });

const REFUND_WINDOW_DAYS = 7;
export const REFUND_REASONS = ["nao_precisei", "nao_gostei", "caro", "nao_funcionou", "comprei_sem_querer", "outro"] as const;
export type RefundReason = (typeof REFUND_REASONS)[number];

type PaidPurchase = { pi: StripeLib.PaymentIntent; charge: StripeLib.Charge };

/** Pagamentos concluídos da conta no Stripe, do mais novo pro mais antigo. */
async function loadPaidPurchases(stripe: Stripe, userId: string): Promise<PaidPurchase[]> {
  const found = await stripe.paymentIntents.search({
    query: `metadata['userId']:'${userId}' AND status:'succeeded'`,
    limit: 20,
    expand: ["data.latest_charge"],
  });
  return found.data
    .map(pi => ({ pi, charge: typeof pi.latest_charge === "object" ? pi.latest_charge : null }))
    .filter((x): x is PaidPurchase => !!x.charge)
    .sort((a, b) => b.pi.created - a.pi.created);
}

/**
 * A pessoa já usou o que o selo libera depois de pagar? Conta como uso: demonstração criada,
 * busca além do limite grátis do dia ou venda registrada. Na dúvida (erro de leitura) vale "usou",
 * e o pedido cai no e-mail pra análise manual.
 */
async function usedPaidFeatures(userId: string, sinceMs: number): Promise<boolean> {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const admin = supabaseAdmin as any;
    const sinceIso = new Date(sinceMs).toISOString();
    const [demos, sales, searches] = await Promise.all([
      admin.from("site_demonstrations").select("id", { count: "exact", head: true }).eq("owner_id", userId).gte("created_at", sinceIso),
      admin.from("closed_sales").select("id", { count: "exact", head: true }).eq("user_id", userId).gte("created_at", sinceIso),
      admin.from("search_usage").select("count").eq("user_id", userId).gte("day", sinceIso.slice(0, 10)).gt("count", FREE_DAILY_SEARCHES).limit(1),
    ]);
    if (demos.error || sales.error || searches.error) return true;
    return (demos.count ?? 0) > 0 || (sales.count ?? 0) > 0 || (searches.data?.length ?? 0) > 0;
  } catch {
    return true;
  }
}

export type PurchaseInfo = {
  /** Texto do plano, ex.: "1 mês" ou "1 ano". */
  plan: string;
  amountCents: number;
  paidAt: string;
  /** Até quando dá pra pedir reembolso pelo botão; null se não dá mais. */
  refundUntil: string | null;
  /** Já houve um reembolso nesta conta (o botão vale uma vez). */
  refundUsed: boolean;
  /** Já usou demonstrações/buscas pagas desde o pagamento: o reembolso passa a ser analisado por e-mail. */
  usedProduct: boolean;
};

/** Dados da compra do selo, só pra mostrar na página. O reembolso em si é conferido de novo em refundMyPurchase. */
export const getMyPurchaseInfo = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { environment: StripeEnv }) => {
    if (!isEnv(d.environment)) throw new Error("Ambiente inválido");
    return d;
  })
  .handler(async ({ data, context }): Promise<{ info: PurchaseInfo | null }> => {
    const { userId } = context;
    if (!/^[a-zA-Z0-9_-]+$/.test(userId)) return { info: null };
    try {
      const paid = await loadPaidPurchases(createStripeClient(data.environment), userId);
      const last = paid[0];
      if (!last) return { info: null };
      const refundUsed = paid.some(x => x.charge.amount_refunded > 0 || x.charge.refunded);
      const until = last.pi.created * 1000 + REFUND_WINDOW_DAYS * 86400_000;
      const usedProduct = await usedPaidFeatures(userId, last.pi.created * 1000);
      const amount = last.charge.amount;
      const plan = VERIFIED_PLANS.find(p => p.price.replace(/\D/g, "") === String(amount))?.label ?? "Selo Verificado";
      return {
        info: {
          plan,
          amountCents: amount,
          paidAt: new Date(last.pi.created * 1000).toISOString(),
          refundUntil: !refundUsed && !usedProduct && paid.length === 1 && Date.now() < until ? new Date(until).toISOString() : null,
          refundUsed,
          usedProduct,
        },
      };
    } catch (error) {
      console.error("getMyPurchaseInfo failed:", getStripeErrorMessage(error));
      return { info: null };
    }
  });

/**
 * Reembolso pedido pelo próprio cliente, até 7 dias depois de pagar (CDC art. 49).
 * O usuário vem do login (nunca do corpo da chamada) e a regra é conferida no Stripe:
 * só a compra à vista mais recente, paga há no máximo 7 dias, ainda sem devolução,
 * sem uso do produto depois de pagar, e uma única vez por conta. Depois de devolver, o selo sai na hora.
 */
export const refundMyPurchase = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { environment: StripeEnv; reason: string; details?: string }) => {
    if (!isEnv(d.environment)) throw new Error("Ambiente inválido");
    if (!REFUND_REASONS.includes(d.reason as RefundReason)) throw new Error("Escolha o motivo do reembolso");
    const details = (d.details ?? "").trim().slice(0, 300);
    if (d.reason === "outro" && details.length < 3) throw new Error("Conte o motivo em poucas palavras");
    return { environment: d.environment, reason: d.reason, details };
  })
  .handler(async ({ data, context }): Promise<{ ok: true; amount: number } | { ok: false; error: string; manual?: boolean }> => {
    const { supabase, userId } = context;
    const contato = "semsiteapp@gmail.com";
    if (!/^[a-zA-Z0-9_-]+$/.test(userId)) return { ok: false, error: "Conta inválida." };
    const { data: status } = await supabase.rpc("verified_status");
    if ((status as { source?: string } | null)?.source !== "one_time") {
      return { ok: false, error: `Só dá pra pedir reembolso por aqui de um selo comprado. Para outros casos, escreva para ${contato}.` };
    }
    try {
      const stripe = createStripeClient(data.environment);
      const paid = await loadPaidPurchases(stripe, userId);
      if (paid.some(x => x.charge.amount_refunded > 0 || x.charge.refunded)) {
        return { ok: false, error: `Esta conta já teve um reembolso. Para novos pedidos, escreva para ${contato}.` };
      }
      const last = paid[0];
      if (!last) return { ok: false, error: `Não encontrei um pagamento seu. Escreva para ${contato} que a gente resolve.` };
      if (paid.length > 1) {
        return { ok: false, error: `Você tem mais de um pagamento na conta. Escreva para ${contato} e dizemos qual devolver.` };
      }
      const ageDays = (Date.now() / 1000 - last.pi.created) / 86400;
      if (ageDays > REFUND_WINDOW_DAYS) {
        return { ok: false, error: `O prazo de ${REFUND_WINDOW_DAYS} dias para reembolso já passou. Se achar que é um caso especial, escreva para ${contato}.` };
      }
      if (await usedPaidFeatures(userId, last.pi.created * 1000)) {
        return { ok: false, error: `Você já usou o SemSite com o selo (demonstrações ou buscas), então o reembolso é analisado pela gente. Escreva para ${contato} contando o motivo e a gente responde.`, manual: true };
      }
      await stripe.refunds.create(
        { payment_intent: last.pi.id, reason: "requested_by_customer", metadata: { userId, via: "self_service", motivo: data.reason, detalhes: data.details } },
        { idempotencyKey: `refund-${last.pi.id}` },
      );
      // Devolução feita: o selo comprado sai agora (o webhook de charge.refunded faz o mesmo, sem problema repetir).
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      await supabaseAdmin.from("verified_profiles").delete().eq("profile_id", userId).eq("source", "one_time");
      return { ok: true, amount: last.charge.amount };
    } catch (error) {
      console.error("refundMyPurchase failed:", getStripeErrorMessage(error));
      return { ok: false, error: `Não consegui processar agora. Nada foi mexido. Tente de novo ou escreva para ${contato}.` };
    }
  });
