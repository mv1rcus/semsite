import { describe, expect, it } from "vitest";
import { CITIES, nextSuggestedCity } from "@/lib/cities";
import { demoSector, draftForClient, demonstrationLink, demonstrationCode, demonstrationId, demonstrationSlug } from "@/lib/demonstrations";
describe("Suggested cities", () => {
  it("changes city on the next entry", () => { expect(nextSuggestedCity("Campinas, SP")).toBe("São Paulo, SP"); });
  it("wraps around after the last city", () => { expect(nextSuggestedCity(CITIES.at(-1) ?? null)).toBe("Campinas, SP"); });
});
describe("Client website concepts", () => {
  it("creates readable named links without dropping any identifier information", () => {
    const id = "12345678-1234-4234-8234-123456789abc";
    const code = demonstrationCode(id);
    expect(code).toHaveLength(22);
    expect(demonstrationId(code)).toBe(id);
    expect(demonstrationLink(id, "https://id-preview--example.lovable.app", "Pizzaria São João")).toBe(`https://cacacliente.lovable.app/site/pizzaria-sao-joao/${code}`);
    expect(demonstrationLink(id, "http://localhost:8080", "Pizzaria São João")).toBe(`http://localhost:8080/site/pizzaria-sao-joao/${code}`);
  });
  it("rejects malformed short codes and sanitizes business names", () => {
    expect(demonstrationId("../../private")).toBeNull();
    expect(demonstrationId("a".repeat(21))).toBeNull();
    expect(demonstrationSlug(" Clínica / São João! ")).toBe("clinica-sao-joao");
    expect(demonstrationSlug("!!!")).toBe("meu-negocio");
  });
  it("shares demonstrations on the current published app, not the obsolete domain", () => {
    expect(demonstrationLink("abc", "https://cacacliente.lovable.app")).toBe("https://cacacliente.lovable.app/demo/abc");
    expect(demonstrationLink("abc", "https://id-preview--example.lovable.app")).toBe("https://cacacliente.lovable.app/demo/abc");
  });
  it("keeps local demonstration verification on the same origin", () => {
    expect(demonstrationLink("abc", "http://localhost:8080")).toBe("http://localhost:8080/demo/abc");
  });
  it("uses the selected client details", () => {
    const demo = draftForClient({ id: "1", name: "Clínica Horizonte", category: "Dentista", address: "Rua Teste, Campinas", intlPhone: "+5511999999999", phone: null, rating: null, reviews: null, mapsUrl: null });
    expect(demo.name).toBe("Clínica Horizonte"); expect(demo.address).toBe("Rua Teste, Campinas"); expect(demo.phone).toBe("+5511999999999"); expect(demoSector(demo.category)).toBe("health");
  });
  it("selects imagery related to the client business", () => { expect(demoSector("Restaurante")).toBe("food"); expect(demoSector("Barbearia")).toBe("beauty"); expect(demoSector("Oficina mecânica")).toBe("auto"); expect(demoSector("Academia")).toBe("gym"); expect(demoSector("Advogado")).toBe("law"); expect(demoSector("Pet shop")).toBe("pet"); expect(demoSector("Contabilidade")).toBe("services"); });
});