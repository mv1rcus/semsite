export const VERIFIED_PRICE_IDS = ["verificado_mensal_avista", "verificado_anual_avista"] as const;
export type VerifiedPriceId = (typeof VERIFIED_PRICE_IDS)[number];

export type VerifiedPlan = {
  id: VerifiedPriceId;
  label: string;
  price: string;
  period: string;
  note?: string;
  /** Meses de selo que um pagamento à vista entrega; ausente = assinatura que renova sozinha. */
  months?: number;
  /** Formas de pagamento que a Stripe oferece nesse plano. */
  methods: string;
  detail: string;
};

export const VERIFIED_PLANS: VerifiedPlan[] = [
  {
    id: "verificado_mensal_avista",
    label: "1 mês",
    price: "R$ 8,99",
    period: "por mês",
    note: "30 dias de selo",
    months: 1,
    methods: "Pix, débito, crédito, Apple Pay e Google Pay",
    detail: "Pagamento único por mês. Sem cobrança automática: não renova sozinho.",
  },
  {
    id: "verificado_anual_avista",
    label: "1 ano",
    price: "R$ 69,90",
    period: "por ano",
    note: "12 meses de selo",
    months: 12,
    methods: "Pix, débito, crédito, Apple Pay e Google Pay",
    detail: "Um pagamento cobre os 12 meses. Sem cobrança automática.",
  },
];

export const FREE_DAILY_SEARCHES = 5;

/** Paid access: active/trialing inside the paid period. Cancel keeps access until the end; failed payments do not. */
export function subscriptionGrantsAccess(status: string, periodEnd: string | null, now = new Date()): boolean {
  if (status !== "active" && status !== "trialing") return false;
  return !periodEnd || new Date(periodEnd) > now;
}
