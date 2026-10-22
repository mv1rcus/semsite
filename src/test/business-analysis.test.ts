import { describe, expect, it } from "vitest";
import { analysisMessage, analysisWhatsApp, businessAnalysisInput, businessAnalysisOutput, analysisError } from "@/lib/business-analysis";

describe("business analysis", () => {
  const input = { name: "Bella Vista", segment: "Pizzaria", city: "Campinas", website: "unknown", services: "Pizza", social: "", notes: "", senderName: "Ana" };
  it("requires establishment and segment before analysis", () => {
    expect(businessAnalysisInput.safeParse({ ...input, segment: "" }).success).toBe(false);
    expect(businessAnalysisInput.safeParse({ ...input, name: "" }).success).toBe(false);
    expect(businessAnalysisInput.parse(input).website).toBe("unknown");
  });
  it("includes the personalized sender rather than Marcus", () => {
    expect(analysisMessage("Uma ideia para Bella Vista.", "Ana")).toContain("Me chamo Ana.");
    expect(analysisMessage("Uma ideia.", "")).not.toContain("Me chamo");
  });
  it("preserves the delivery promise of up to one week", () => {
    expect(analysisMessage("Uma ideia.", "Ana")).toContain("entrega em até uma semana");
  });
  it("encodes the personalized WhatsApp approach", () => {
    expect(analysisWhatsApp("(11) 99999-8888", "Olá & Bella")).toBe("https://wa.me/5511999998888?text=Ol%C3%A1%20%26%20Bella");
    expect(analysisWhatsApp("123", "Oi")).toBeNull();
  });
  it("rejects an incomplete model response", () => {
    expect(businessAnalysisOutput.safeParse({ summary: "Resumo" }).success).toBe(false);
  });
  it("does not silently retry an uncertain generation", () => {
    expect(analysisError("timeout")).toContain("não vamos repetir automaticamente");
    expect(analysisError("payment_required")).toContain("adicionar créditos");
  });
});