import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { type StripeEnv, createStripeClient, getStripeErrorMessage } from "@/lib/stripe.server";
import { VERIFIED_PRICE_IDS, VERIFIED_PLANS, type VerifiedPriceId } from "@/lib/verified-plans";

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
