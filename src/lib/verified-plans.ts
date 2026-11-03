export const VERIFIED_PRICE_IDS = ["verificado_mensal", "verificado_anual_avista"] as const;
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
    id: "verificado_mensal",
    label: "Mensal",
    price: "R$ 8,99",
    period: "/mês",
    methods: "Cartão",
    detail: "Renova todo mês. Cancele quando quiser.",
  },
  {
    id: "verificado_anual_avista",
    label: "Anual à vista",
    price: "R$ 69,90",
    period: "à vista",
    note: "12 meses de selo",
    months: 12,
    methods: "Cartão ou Pix",
    detail: "Um pagamento só, sem renovação automática.",
  },
];

export const FREE_DAILY_SEARCHES = 5;

/** Paid access: active/trialing inside the paid period. Cancel keeps access until the end; failed payments do not. */
export function subscriptionGrantsAccess(status: string, periodEnd: string | null, now = new Date()): boolean {
  if (status !== "active" && status !== "trialing") return false;
  return !periodEnd || new Date(periodEnd) > now;
}
