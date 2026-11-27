import { describe, expect, it } from "vitest";
import { analyzeBusinessLocally, withSignature } from "@/lib/business-analysis-local";
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
    expect(result.opportunities[0]?.title).toBe("Presença digital própria");
    expect(result.opportunities.length).toBeGreaterThanOrEqual(1);
    expect(result.opportunities.length).toBeLessThanOrEqual(4);
    expect(result.sections.length).toBeGreaterThanOrEqual(1);
    expect(result.sections.length).toBeLessThanOrEqual(6);
  });

  it("não afirma ausência de site quando o status é desconhecido", () => {
    const result = analyzeBusinessLocally({ ...base, website: "unknown", services: "", social: "" });
    expect(allText(result)).not.toContain("o estabelecimento não possui site");
    expect(result.opportunities[0]?.basis).toContain("não se sabe");
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
    expect(result.opportunities[0]?.title).toBe("Evolução do site atual");
  });
});

describe("melhorias da Análise", () => {
  it("reconhece mais segmentos e não confunde barbearia com bar", () => {
    const barber = analyzeBusinessLocally({ ...base, name: "Barbearia do Zé", segment: "Barbearia", services: "", social: "", website: "unknown" });
    expect(barber.opportunities.map((o) => o.title)).toContain("Agendamento facilitado");
    const casos: [string, string][] = [["Imobiliária", "Vitrine de imóveis"], ["Contabilidade", "Serviços contábeis explicados"], ["Escola de idiomas", "Cursos e matrícula pelo WhatsApp"], ["Estética automotiva", "Serviços e pedido de orçamento"], ["Floricultura", "Vitrine online de produtos"], ["Pousada", "Quartos, fotos e pedido de reserva"]];
    for (const [segment, title] of casos) {
      const r = analyzeBusinessLocally({ ...base, name: "Negócio X", segment, services: "", social: "", website: "unknown" });
      expect(r.opportunities.map((o) => o.title), segment).toContain(title);
    }
  });

  it("oferece 3 aberturas sem afirmar que viu o trabalho, sem preço e com o nome", () => {
    for (const website of ["none", "existing", "unknown"] as const) {
      const r = analyzeBusinessLocally({ ...base, website });
      expect(r.openings).toHaveLength(3);
      expect(r.opening).toBe(r.openings[0]!.text);
      for (const o of r.openings) {
        expect(o.text).toContain("Pizzaria Bella Vista");
        expect(o.text.toLowerCase()).not.toContain("acompanhei");
        expect(o.text.toLowerCase()).not.toContain("r$");
      }
    }
    expect(analyzeBusinessLocally({ ...base, website: "unknown" }).openings[0]!.text).not.toContain("ainda não tem site");
  });

  it("gera 2 mensagens de acompanhamento e assina com o nome", () => {
    const r = analyzeBusinessLocally(base);
    expect(r.followUps).toHaveLength(2);
    expect(withSignature(r.followUps[0]!.text, "Ana")).toMatch(/\n\nAna$/);
    expect(withSignature(r.followUps[0]!.text, " ")).toBe(r.followUps[0]!.text);
  });
});
