import { createFileRoute } from "@tanstack/react-router";
import { type StripeEnv, verifyWebhook } from "@/lib/stripe.server";
import { emailOfUser, sendOnce } from "@/lib/email.server";
import { cancellationEmail, paymentConfirmedEmail, refundEmail } from "@/lib/email-templates";

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

/**
 * Pagamento à vista confirmado: concede os meses de selo que foram comprados.
 * Usa grant_paid_months_once (uma concessão por evento do Stripe, então reenvio não soma de novo).
 * Se a concessão falhar, lança o erro: o webhook responde 500 e o Stripe tenta de novo.
 */
async function grantPurchasedMonths(session: any, eventId: string) {
  const userId = session?.metadata?.userId;
  const months = Number(session?.metadata?.paid_months || 0);
  if (!isUuid(userId) || !Number.isInteger(months) || months < 1 || months > 60) return;
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const once = await supabaseAdmin.rpc("grant_paid_months_once" as any, { p_event: eventId, p_profile: userId, p_months: months } as any);
  if (!once.error) return;
  // Migration ainda não rodou: cai na concessão antiga (sem dedupe) em vez de perder o selo.
  if (once.error.code === "PGRST202" || /does not exist|schema cache/i.test(once.error.message)) {
    const { error } = await supabaseAdmin.rpc("grant_paid_months", { p_profile: userId, p_months: months });
    if (!error) return;
    throw new Error(`grant_paid_months failed: ${error.message}`);
  }
  throw new Error(`grant_paid_months_once failed: ${once.error.message}`);
}

/** Devolução do dinheiro: o selo comprado à vista sai do ar na hora. */
async function revokePurchasedBadge(charge: any) {
  const userId = charge?.metadata?.userId;
  if (!isUuid(userId)) return;
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin.from("verified_profiles").delete().eq("profile_id", userId).eq("source", "one_time");
  if (error) console.error("revoke purchased badge failed:", error.message);
}



// ---- E-mails transacionais: best effort, nunca derrubam o webhook (sendOnce/emailOfUser não lançam erro). ----

async function userIdOfSubscription(sub: any, env: StripeEnv): Promise<string | null> {
  if (isUuid(sub?.metadata?.userId)) return sub.metadata.userId;
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin.from("subscriptions").select("user_id").eq("stripe_subscription_id", sub.id).eq("environment", env).maybeSingle();
    return (data as any)?.user_id ?? null;
  } catch {
    return null;
  }
}

async function emailPaymentConfirmed(session: any, eventId: string) {
  const to = session?.customer_details?.email || session?.customer_email || (await emailOfUser(session?.metadata?.userId));
  if (!to) return;
  const months = Number(session?.metadata?.paid_months || 0) || null;
  await sendOnce(`pay:${eventId}`, "payment_confirmed", paymentConfirmedEmail(to, months));
}

/** Cancelamento: aviso quando marca "cancelar no fim do período" e quando a assinatura termina; um só e-mail por assinatura. */
async function emailCancellation(sub: any, env: StripeEnv, ended: boolean, previous?: any) {
  const justScheduled = !ended && sub?.cancel_at_period_end === true && previous && previous.cancel_at_period_end === false;
  if (!ended && !justScheduled) return;
  const userId = await userIdOfSubscription(sub, env);
  const to = await emailOfUser(userId);
  if (!to) return;
  const { current_period_end } = periodOf(sub);
  await sendOnce(`cancel:${sub.id}`, "cancellation", cancellationEmail(to, current_period_end, ended));
}

async function emailRefund(charge: any, eventId: string) {
  const to = charge?.billing_details?.email || (await emailOfUser(charge?.metadata?.userId));
  if (!to) return;
  await sendOnce(`refund:${charge.id}`, "refund", refundEmail(to));
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
              await upsertSubscription(obj, env);
              break;
            case "customer.subscription.updated":
              await upsertSubscription(obj, env);
              await emailCancellation(obj, env, false, (event.data as any).previous_attributes);
              break;
            case "customer.subscription.deleted":
              await upsertSubscription(obj, env, "canceled");
              await emailCancellation(obj, env, true);
              break;
            case "checkout.session.completed":
              // Boleto e Pix avulso avisam antes de o dinheiro cair: só entrega o selo
              // quando o pagamento não está mais pendente.
              if (obj.mode === "payment" && obj.payment_status !== "unpaid") {
                await grantPurchasedMonths(obj, event.id);
                await emailPaymentConfirmed(obj, event.id);
              } else if (obj.mode === "subscription" && obj.payment_status === "paid") {
                await emailPaymentConfirmed(obj, event.id);
              }
              break;
            case "checkout.session.async_payment_succeeded":
              if (obj.mode === "payment") {
                await grantPurchasedMonths(obj, event.id);
                await emailPaymentConfirmed(obj, event.id);
              }
              break;
            case "charge.refunded":
              await revokePurchasedBadge(obj);
              await emailRefund(obj, event.id);
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
