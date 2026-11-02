export const VERIFIED_PRICE_IDS = ["verificado_mensal", "verificado_anual"] as const;
export type VerifiedPriceId = (typeof VERIFIED_PRICE_IDS)[number];

export const VERIFIED_PLANS: { id: VerifiedPriceId; label: string; price: string; period: string; note?: string }[] = [
  { id: "verificado_mensal", label: "Mensal", price: "R$ 7,99", period: "/mês" },
  { id: "verificado_anual", label: "Anual", price: "R$ 79,90", period: "/ano", note: "2 meses grátis" },
];

export const FREE_DAILY_SEARCHES = 5;

/** Paid access: active/trialing inside the paid period. Cancel keeps access until the end; failed payments do not. */
export function subscriptionGrantsAccess(status: string, periodEnd: string | null, now = new Date()): boolean {
  if (status !== "active" && status !== "trialing") return false;
  return !periodEnd || new Date(periodEnd) > now;
}
