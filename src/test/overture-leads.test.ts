import { describe, it, expect } from "vitest";
import { keywordsForCategory, placeRowToLead } from "../lib/overture-leads";

describe("keywordsForCategory", () => {
  it("mapeia categorias pt-BR para a taxonomia da Overture", () => {
    expect(keywordsForCategory("barbearia")).toEqual(["barber"]);
    expect(keywordsForCategory("Pizzaria")).toEqual(["pizza"]);
    expect(keywordsForCategory("lava jato")).toEqual(["car_wash"]);
  });
  it("categoria desconhecida fica só com o fallback de nome", () => {
    expect(keywordsForCategory("loja de queijos")).toEqual([]);
  });
});

describe("placeRowToLead", () => {
  const base = { id: "x", name: "BARBEARIA DO ZÉ | a melhor", sub: "barber", cat: "personal_or_beauty_service", phone: "+5532999998888", site: null, instagram: "https://www.instagram.com/zebarber/", facebook: null, address: "Rua A, 1 - Centro" };
  it("negócio com site próprio não vira lead", () => {
    expect(placeRowToLead({ ...base, site: "https://zebarber.com.br" }, "barbearia")).toBeNull();
  });
  it("monta lead com rótulo em pt-BR, telefone e instagram tratado", () => {
    const lead = placeRowToLead(base, "barbearia")!;
    expect(lead.name).toBe("Barbearia do Zé");
    expect(lead.category).toBe("Barbearia");
    expect(lead.instagram).toBe("zebarber");
    expect(lead.source).toBe("overture");
    expect(lead.mapsUrl).toContain("google.com/maps");
  });
});
