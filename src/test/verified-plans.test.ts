import { describe, expect, it } from "vitest";
import { subscriptionGrantsAccess, VERIFIED_PLANS, FREE_DAILY_SEARCHES } from "@/lib/verified-plans";
const now = new Date("2026-11-02T12:00:00Z");
describe("verificado", () => {
  it("monthly costs R$ 8,99", () => expect(VERIFIED_PLANS.find(p => p.id === "verificado_mensal")?.price).toBe("R$ 8,99"));
  it("monthly one-time costs R$ 6,70", () => expect(VERIFIED_PLANS.find(p => p.id === "verificado_mensal_avista")?.price).toBe("R$ 6,70"));
  it("annual one-time costs R$ 59,99", () => expect(VERIFIED_PLANS.find(p => p.id === "verificado_anual_avista")?.price).toBe("R$ 59,99"));
  it("free accounts get 5 searches a day", () => expect(FREE_DAILY_SEARCHES).toBe(5));
  it("cancelled keeps access until period end", () => expect(subscriptionGrantsAccess("active", "2026-11-20T00:00:00Z", now)).toBe(true));
  it("access ends after period end", () => expect(subscriptionGrantsAccess("active", "2026-11-01T00:00:00Z", now)).toBe(false));
  it("failed payment removes access at once", () => expect(subscriptionGrantsAccess("past_due", "2026-11-20T00:00:00Z", now)).toBe(false));
});
