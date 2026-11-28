import { describe, expect, it } from "vitest";
import { CITIES, nextSuggestedCity } from "@/lib/cities";
import { demoSector, draftForClient, demonstrationLink, demonstrationCode, demonstrationId, demonstrationSlug } from "@/lib/demonstrations";
describe("Suggested cities", () => {
  it("changes city on the next entry", () => { expect(nextSuggestedCity("Holambra, SP")).toBe("São Miguel Arcanjo, SP"); });
  it("wraps around after the last city", () => { expect(nextSuggestedCity(CITIES.at(-1) ?? null)).toBe("Holambra, SP"); });
  it("never suggests a state capital", () => {
    const capitals = ["São Paulo, SP", "Rio de Janeiro, RJ", "Belo Horizonte, MG", "Porto Alegre, RS", "Curitiba, PR", "Florianópolis, SC", "Salvador, BA", "Recife, PE", "Fortaleza, CE", "Goiânia, GO", "Cuiabá, MT", "Manaus, AM", "Belém, PA", "Maceió, AL", "Aracaju, SE", "Teresina, PI", "São Luís, MA", "Natal, RN", "João Pessoa, PB", "Porto Velho, RO", "Palmas, TO", "Boa Vista, RR", "Rio Branco, AC", "Macapá, AP", "Vitória, ES", "Brasília, DF", "Campo Grande, MS"];
    expect(CITIES.filter(c => capitals.includes(c))).toEqual([]);
  });
});
describe("Client website concepts", () => {
  it("creates readable named links without dropping any identifier information", () => {
    const id = "12345678-1234-4234-8234-123456789abc";
    const code = demonstrationCode(id);
    expect(code).toHaveLength(22);
    expect(demonstrationId(code)).toBe(id);
    expect(demonstrationLink(id, "https://id-preview--example.lovable.app", "Pizzaria São João")).toBe(`https://semsite.lovable.app/site/pizzaria-sao-joao/${code}`);
    expect(demonstrationLink(id, "http://localhost:8080", "Pizzaria São João")).toBe(`http://localhost:8080/site/pizzaria-sao-joao/${code}`);
  });
  it("rejects malformed short codes and sanitizes business names", () => {
    expect(demonstrationId("../../private")).toBeNull();
    expect(demonstrationId("a".repeat(21))).toBeNull();
    expect(demonstrationSlug(" Clínica / São João! ")).toBe("clinica-sao-joao");
    expect(demonstrationSlug("!!!")).toBe("meu-negocio");
  });
  it("shares demonstrations on the current published app, not the obsolete domain", () => {
    expect(demonstrationLink("abc", "https://cacacliente.lovable.app")).toBe("https://semsite.lovable.app/demo/abc");
    expect(demonstrationLink("abc", "https://id-preview--example.lovable.app")).toBe("https://semsite.lovable.app/demo/abc");
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
import { demonstrationLink as shortLink } from "../lib/demonstrations";
import { demoAccessBadge, type DemoActivity } from "@/lib/demo-verification";
describe("Aviso de abertura na lista de links", () => {
  const now = Date.parse("2026-11-07T12:00:00.000Z");
  const clock = (iso: string) => new Date(iso).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  const demo = (lastOpenedAt: string | null): DemoActivity => ({ id: "1", createdAt: "2026-11-01T09:00:00.000Z", lastOpenedAt });
  it("mostra a etiqueta verde com o horário quando o cliente abriu hoje", () => {
    const badge = demoAccessBadge(demo("2026-11-07T09:30:00.000Z"), now);
    expect(badge?.state).toBe("opened");
    expect(badge?.label).toBe("Acessado pelo cliente");
    expect(badge?.detail).toBe(`Aberto hoje às ${clock("2026-11-07T09:30:00.000Z")}`);
  });
  it("diz ontem quando a abertura foi no dia anterior", () => {
    expect(demoAccessBadge(demo("2026-11-06T20:00:00.000Z"), now)?.detail).toBe(`Aberto ontem às ${clock("2026-11-06T20:00:00.000Z")}`);
  });
  it("mostra a data quando a abertura foi mais antiga", () => {
    expect(demoAccessBadge(demo("2026-11-02T08:00:00.000Z"), now)?.detail).toBe(`Aberto em 02/11/2026 às ${clock("2026-11-02T08:00:00.000Z")}`);
  });
  it("avisa que ainda ninguém abriu quando não há acesso", () => {
    const badge = demoAccessBadge(demo(null), now);
    expect(badge?.state).toBe("waiting");
    expect(badge?.label).toBe("Aguardando abertura");
  });
  it("não mostra nada enquanto o acesso ainda não chegou", () => {
    expect(demoAccessBadge(undefined, now)).toBeNull();
  });
});
describe("link curto nomedaempresademo", () => {
  it("usa o endereço curto quando existe", () => {
    expect(shortLink("4821be4e-1251-4766-9d13-764d9c17b339", "https://id-preview--x.lovable.app", "Pizzaria", "pizzariadomarcusdemo")).toBe("https://semsite.lovable.app/pizzariadomarcusdemo");
  });
});

describe("sector for acai and sorveteria labels", () => {
  it("treats all as food", () => { for (const c of ["Açaiteria", "Sorveteria", "Açaiteria e sorveteria", "Açaí", "Acaiteria"]) expect(demoSector(c)).toBe("food"); });
});
