import { describe, expect, it } from "vitest";
import { paymentSplit } from "@/lib/receipt-pdf";

describe("paymentSplit", () => {
  it("à vista cobra 100% agora", () => expect(paymentSplit(700, "vista")).toEqual({ now: 700, later: 0 }));
  it("50/50 divide entrada e entrega", () => expect(paymentSplit(800, "metade")).toEqual({ now: 400, later: 400 }));
});
