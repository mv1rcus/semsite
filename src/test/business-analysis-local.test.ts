import { describe, expect, it } from "vitest";
import { analyzeBusinessLocally } from "@/lib/business-analysis-local";
import { analysisMessage, type BusinessAnalysisInput } from "@/lib/business-analysis";

const base: BusinessAnalysisInput = {
  name: "Pizzaria Bella Vista",
  segment: "Pizzaria",
  city: "Campinas",
  website: "none",
  services: "Pizzas tradicionais e delivery",
  social: "Instagram com fotos",
  notes: "",
  senderName: "Marcus",
};

const allText = (a: ReturnType<typeof analyzeBusinessLocally>) =>
  [a.summary, a.approach, a.opening, ...a.sections, ...a.questions, ...a.opportunities.flatMap((o) => [o.title, o.benefit, o.basis])].join("\n").toLowerCase();

describe("analyzeBusinessLocally", () => {
  it("gera análise completa sem site e sugere presença digital própria", () => {
    const result = analyzeBusinessLocally(base);
    expect(result.opportunities[0].title).toBe("Presença digital própria");
    expect(result.opportunities.length).toBeGreaterThanOrEqual(1);
    expect(result.opportunities.length).toBeLessThanOrEqual(4);
    expect(result.sections.length).toBeGreaterThanOrEqual(1);
    expect(result.sections.length).toBeLessThanOrEqual(6);
  });

  it("não afirma ausência de site quando o status é desconhecido", () => {
    const result = analyzeBusinessLocally({ ...base, website: "unknown", services: "", social: "" });
    expect(allText(result)).not.toContain("o estabelecimento não possui site");
    expect(result.opportunities[0].basis).toContain("não se sabe");
  });

  it("nunca inclui preço em nenhum campo", () => {
    for (const website of ["none", "existing", "unknown"] as const) {
      const result = analyzeBusinessLocally({ ...base, website });
      const text = allText(result);
      expect(text).not.toContain("r$");
      expect(text).not.toContain("preço");
      expect(analysisMessage(result.opening, base.senderName)).not.toContain("R$");
    }
  });

  it("personaliza a mensagem com o nome do remetente e entrega em uma semana", () => {
    const result = analyzeBusinessLocally(base);
    const message = analysisMessage(result.opening, "Ana");
    expect(message).toContain("Me chamo Ana.");
    expect(message).toContain("entrega em até uma semana");
    expect(message).toContain("Pizzaria Bella Vista");
  });

  it("é determinística para os mesmos dados", () => {
    expect(analyzeBusinessLocally(base)).toEqual(analyzeBusinessLocally(base));
  });

  it("usa apenas os dados informados como base das oportunidades", () => {
    const result = analyzeBusinessLocally({ ...base, website: "existing", services: "", social: "" });
    for (const opportunity of result.opportunities) {
      expect(opportunity.basis.length).toBeGreaterThan(0);
    }
    expect(result.opportunities[0].title).toBe("Evolução do site atual");
  });
});
