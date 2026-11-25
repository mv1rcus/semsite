import { describe, expect, it } from "vitest";
import { approachReason, HEAT_LABEL, leadHeat, leadHeatScore, rankByHeat } from "@/lib/lead-priority";
import type { Lead } from "@/lib/leads";

function lead(over: Partial<Lead>): Lead {
  return { id: "a1", name: "Barbearia do Zé", address: "Rua A, 10", phone: null, intlPhone: null, rating: null, reviews: null, category: "Barbearia", mapsUrl: null, ...over };
}

describe("leadHeatScore", () => {
  it("soma WhatsApp +3, segmento de alta conversão +2, Instagram +1, endereço +1", () => {
    const quente = lead({ intlPhone: "+5532988887777", instagram: "zebarber" });
    expect(leadHeatScore(quente).score).toBe(7);
    expect(leadHeat(quente)).toBe("quente");
  });
  it("não conta telefone fixo como WhatsApp", () => {
    const fixo = lead({ phone: "(32) 3232-1010", intlPhone: "+553232321010" });
    expect(leadHeatScore(fixo).score).toBe(3); // segmento + endereço
    expect(leadHeat(fixo)).toBe("morno");
  });
  it("lead sem contato e sem endereço é frio", () => {
    const frio = lead({ address: "", category: "Consultoria", name: "Consultoria X" });
    expect(leadHeatScore(frio).score).toBe(0);
    expect(leadHeat(frio)).toBe("frio");
  });
  it("reconhece os segmentos de alta conversão do spec", () => {
    for (const [name, category] of ([["Barbearia A", "Barbearia"], ["Pizzaria B", "Pizzaria"], ["Odonto C", "Dentista"], ["Salão D", "Salão de beleza"], ["Estética E", "Estética"], ["Oficina F", "Oficina mecânica"]] as const)) {
      expect(leadHeatScore(lead({ name, category, address: "" })).score).toBe(2);
    }
  });
  it("limiares: 5+ quente, 3-4 morno, 0-2 frio", () => {
    expect(leadHeat(lead({ intlPhone: "+5532988887777" }))).toBe("quente"); // 3 + 2 + 1
    expect(leadHeat(lead({ instagram: "a" }))).toBe("morno"); // 2 + 1 + 1
    expect(leadHeat(lead({}))).toBe("morno"); // 2 + 1
    expect(leadHeat(lead({ category: "Serviços", name: "Serviços Gerais" }))).toBe("frio"); // 1
  });
  it("HEAT_LABEL cobre todas as temperaturas", () => {
    expect(HEAT_LABEL).toEqual({ quente: "Quente", morno: "Morno", frio: "Frio" });
  });
});

describe("rankByHeat", () => {
  it("ordena por temperatura e desempata por avaliações", () => {
    const frio = lead({ id: "f", address: "", category: "Consultoria", name: "Consultoria", reviews: 99 });
    const quente = lead({ id: "q", intlPhone: "+5532988887777", instagram: "z", reviews: 1 });
    const morno = lead({ id: "m", reviews: 50 });
    expect(rankByHeat([frio, quente, morno]).map((l) => l.id)).toEqual(["q", "m", "f"]);
  });
});

describe("approachReason", () => {
  it("monta a linha com nome, segmento e cidade", () => {
    const text = approachReason(lead({}), "Juiz de Fora");
    expect(text).toContain("Barbearia do Zé");
    expect(text).toContain("barbearia");
    expect(text).toContain("Juiz de Fora");
  });
  it("sem cidade usa 'na sua cidade'", () => {
    expect(approachReason(lead({}))).toContain("na sua cidade");
  });
});
