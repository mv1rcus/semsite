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
