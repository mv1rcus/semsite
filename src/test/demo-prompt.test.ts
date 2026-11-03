import { describe, expect, it } from "vitest";
import { sitePrompt } from "@/lib/demo-prompt";
import type { Demonstration } from "@/lib/demonstrations";

const demo: Demonstration = {
  name: "Pizzaria São João",
  category: "Pizzaria",
  headline: "Uma boa experiência começa à mesa.",
  description: "Conheça Pizzaria São João. Informações sobre pizzaria, localização e contato em um só lugar.",
  address: "Rua das Flores, 10",
  phone: "+5511999998888",
};

describe("site prompt for copying", () => {
  it("carries the business data that was typed in", () => {
    const prompt = sitePrompt(demo);
    expect(prompt).toContain("Nome: Pizzaria São João");
    expect(prompt).toContain("Segmento: Pizzaria");
    expect(prompt).toContain("Chamada principal: Uma boa experiência começa à mesa.");
    expect(prompt).toContain("Endereço: Rua das Flores, 10");
    expect(prompt).toContain("Telefone / WhatsApp: +5511999998888");
  });

  it("lists the sector catalog as the site content", () => {
    const prompt = sitePrompt(demo);
    expect(prompt).toContain("Cardápio do site:");
    expect(prompt).toContain("- Pizzas:");
    expect(prompt).toContain("- Sobremesas:");
  });

  it("asks for three functional tabs", () => {
    const prompt = sitePrompt(demo);
    expect(prompt).toContain("O site deve ter três abas funcionais:");
    expect(prompt).toContain("3. Contato:");
  });

  it("forbids invented prices, reviews and opening hours", () => {
    expect(sitePrompt(demo)).toContain("Não invente preços, avaliações, notas, horários de funcionamento");
  });

  it("drops the address and phone lines when they were not informed", () => {
    const prompt = sitePrompt({ ...demo, address: "", phone: "" });
    expect(prompt).not.toContain("Endereço:");
    expect(prompt).not.toContain("Telefone / WhatsApp:");
  });
});
