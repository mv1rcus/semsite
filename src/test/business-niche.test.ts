import { describe, it, expect } from "vitest";
import { cleanBusinessName, detectNiche } from "@/lib/business-niche";
describe("detector de ramo", () => {
  it("corrige 'Serviços' pelo nome", () => {
    expect(detectNiche("PAPAGAIO COLORIDO GRÁFICA - QUALIDADE", "Serviços")).toBe("Gráfica");
    expect(detectNiche("COPY UDI ART | COPIADORA", "Serviços")).toBe("Copiadora e gráfica");
  });
  it("usa a busca como desempate", () => expect(detectNiche("Silva & Souza", "Consultoria", "advogado")).toBe("Advocacia"));
  it("limpa nome do Google", () => expect(cleanBusinessName("PAPAGAIO COLORIDO GRÁFICA - QUALIDADE EM IMPRESSÃO!")).toBe("Papagaio Colorido Gráfica"));
});
import { matchesSearch } from "@/lib/business-niche";
describe("busca fiel ao ramo", () => {
  it("busca advogado descarta costureira", () => expect(matchesSearch("Ateliê da Maria Costureira", "Serviços", "Advogado")).toBe(false));
  it("busca advogado mantém escritório", () => expect(matchesSearch("Silva Advocacia", "Serviços", "Advogado")).toBe(true));
  it("mantém nome genérico", () => expect(matchesSearch("Silva & Souza", "Consultoria", "Advogado")).toBe(true));
});

describe("ramo não confunde palavra solta", () => {
  const casos: [string, string | null, string][] = [
    ["Oficina do Lanche", null, "Hamburgueria"],
    ["Oficina do Lanche", "Oficina mecânica", "Oficina mecânica"],
    ["Flores da Cunha Material de Construção", null, "Material de construção"],
    ["Tatuí Pizzaria", null, "Pizzaria"],
    ["Bolonha Gesso", null, "Gesseiro"],
    ["Escola de Samba Vai-Vai", null, "Escola de samba"],
    ["Barbosa Auto Peças", null, "Autopeças"],
    ["Barbearia do Zé", null, "Barbearia"],
    ["Oficina do Zé", null, "Oficina mecânica"],
    ["Casa do Bolo", null, "Confeitaria"],
  ];
  for (const [nome, cat, esperado] of casos) it(`${nome} (${cat ?? "sem categoria"})`, () => expect(detectNiche(nome, cat)).toBe(esperado));
  it("busca oficina descarta Oficina do Lanche", () => expect(matchesSearch("Oficina do Lanche", null, "oficina mecânica")).toBe(false));
  it("busca oficina mantém oficina de verdade", () => expect(matchesSearch("Auto Mecânica Silva", null, "oficina mecânica")).toBe(true));
});
