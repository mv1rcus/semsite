import { createFileRoute } from "@tanstack/react-router";
import { type StripeEnv, verifyWebhook } from "@/lib/stripe.server";

function periodOf(sub: any) {
  const item = sub.items?.data?.[0];
  const start = item?.current_period_start ?? sub.current_period_start;
  const end = item?.current_period_end ?? sub.current_period_end;
  return {
    item,
    current_period_start: start ? new Date(start * 1000).toISOString() : null,
    current_period_end: end ? new Date(end * 1000).toISOString() : null,
  };
}

async function upsertSubscription(sub: any, env: StripeEnv, statusOverride?: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const userId = sub.metadata?.userId;
  const { item, ...period } = periodOf(sub);
  const priceId = item?.price?.lookup_key || item?.price?.metadata?.lovable_external_id || item?.price?.id || "";
  const productId = typeof item?.price?.product === "string" ? item.price.product : item?.price?.product?.id ?? "";
  const row = {
    stripe_subscription_id: sub.id as string,
    stripe_customer_id: typeof sub.customer === "string" ? sub.customer : sub.customer?.id ?? "",
    product_id: productId,
    price_id: priceId,
    status: statusOverride ?? sub.status,
    ...period,
    cancel_at_period_end: !!sub.cancel_at_period_end,
    environment: env,
    updated_at: new Date().toISOString(),
  };
  if (userId) {
    await supabaseAdmin.from("subscriptions").upsert({ ...row, user_id: userId }, { onConflict: "stripe_subscription_id" });
  } else {
    await supabaseAdmin.from("subscriptions").update(row).eq("stripe_subscription_id", sub.id).eq("environment", env);
  }
}

const isUuid = (v: unknown): v is string =>
  typeof v === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);

/** Pagamento à vista confirmado: concede os meses de selo que foram comprados. */
async function grantPurchasedMonths(session: any) {
  const userId = session?.metadata?.userId;
  const months = Number(session?.metadata?.paid_months || 0);
  if (!isUuid(userId) || !Number.isInteger(months) || months < 1 || months > 60) return;
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin.rpc("grant_paid_months", { p_profile: userId, p_months: months });
  if (error) console.error("grant_paid_months failed:", error.message);
}

/** Devolução do dinheiro: o selo comprado à vista sai do ar na hora. */
async function revokePurchasedBadge(charge: any) {
  const userId = charge?.metadata?.userId;
  if (!isUuid(userId)) return;
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin.from("verified_profiles").delete().eq("profile_id", userId).eq("source", "one_time");
  if (error) console.error("revoke purchased badge failed:", error.message);
}



export const Route = createFileRoute("/api/public/payments/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const rawEnv = new URL(request.url).searchParams.get("env");
        if (rawEnv !== "sandbox" && rawEnv !== "live") return Response.json({ received: true, ignored: "invalid env" });
        const env: StripeEnv = rawEnv;
        try {
          const event = await verifyWebhook(request, env);
          const obj = event.data.object;
          switch (event.type) {
            case "customer.subscription.created":
            case "customer.subscription.updated":
              await upsertSubscription(obj, env);
              break;
            case "customer.subscription.deleted":
              await upsertSubscription(obj, env, "canceled");
              break;
            case "checkout.session.completed":
              // Boleto e Pix avulso avisam antes de o dinheiro cair: só entrega o selo
              // quando o pagamento não está mais pendente.
              if (obj.mode === "payment" && obj.payment_status !== "unpaid") await grantPurchasedMonths(obj);
              break;
            case "checkout.session.async_payment_succeeded":
              if (obj.mode === "payment") await grantPurchasedMonths(obj);
              break;
            case "charge.refunded":
              await revokePurchasedBadge(obj);
              break;
            default:
              break;
          }
          return Response.json({ received: true });
        } catch (e) {
          console.error("Webhook error:", e);
          return new Response("Webhook error", { status: 400 });
        }
      },
    },
  },
});
