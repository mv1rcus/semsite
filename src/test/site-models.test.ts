import { describe, expect, it } from "vitest";
import { ALL_MODELS, filterModels, getModel, modelContent, modelLink } from "@/lib/site-models";

describe("site-models", () => {
  it("tem mais de 2000 modelos com ids únicos", () => {
    expect(ALL_MODELS.length).toBeGreaterThanOrEqual(2000);
    expect(new Set(ALL_MODELS.map((m) => m.id)).size).toBe(ALL_MODELS.length);
  });
  it("filtra por ramo, 3D e busca", () => {
    const pizza = filterModels({ ramo: "pizzaria" });
    expect(pizza.length).toBeGreaterThan(0);
    expect(pizza.every((m) => m.ramo === "pizzaria")).toBe(true);
    const d3 = filterModels({ layout: "3d" });
    expect(d3.length).toBeGreaterThan(0);
    expect(d3.every((m) => m.is3d)).toBe(true);
    expect(filterModels({ q: "pizzaria" }).length).toBeGreaterThan(0);
    expect(filterModels({ q: "zzzzzz" })).toHaveLength(0);
  });
  it("getModel acha por id e retorna undefined para desconhecido", () => {
    const m = ALL_MODELS[0]!;
    expect(getModel(m.id)).toBe(m);
    expect(getModel("nada")).toBeUndefined();
  });
  it("aplica cliente no conteúdo e no link", () => {
    const m = ALL_MODELS[0]!;
    const c = modelContent(m, { name: "Bar do Zé", whatsapp: "32999990000", city: "Juiz de Fora" });
    expect(JSON.stringify(c)).toContain("Bar do Zé");
    const link = modelLink("https://x.com", m.id, { name: "Bar do Zé", whatsapp: "32999990000" });
    expect(link.startsWith(`https://x.com/vitrine/${m.id}?`)).toBe(true);
    expect(link).toContain("w=32999990000");
    expect(modelLink("https://x.com", m.id)).toBe(`https://x.com/vitrine/${m.id}`);
  });
});
