import { describe, expect, it } from "vitest";
import { subscriptionGrantsAccess, VERIFIED_PLANS, FREE_DAILY_SEARCHES } from "@/lib/verified-plans";
const now = new Date("2026-11-02T12:00:00Z");
describe("verificado", () => {
  it("monthly costs R$ 8,99", () => expect(VERIFIED_PLANS.find(p => p.id === "verificado_mensal")?.price).toBe("R$ 8,99"));
  it("offers only monthly and annual plans", () => expect(VERIFIED_PLANS.map(p => p.id)).toEqual(["verificado_mensal", "verificado_anual_avista"]));
  it("annual one-time costs R$ 69,90", () => expect(VERIFIED_PLANS.find(p => p.id === "verificado_anual_avista")?.price).toBe("R$ 69,90"));
  it("free accounts get 5 searches a day", () => expect(FREE_DAILY_SEARCHES).toBe(5));
  it("cancelled keeps access until period end", () => expect(subscriptionGrantsAccess("active", "2026-11-20T00:00:00Z", now)).toBe(true));
  it("access ends after period end", () => expect(subscriptionGrantsAccess("active", "2026-11-01T00:00:00Z", now)).toBe(false));
  it("failed payment removes access at once", () => expect(subscriptionGrantsAccess("past_due", "2026-11-20T00:00:00Z", now)).toBe(false));
});
