import { describe, expect, it } from "vitest";
import { buildBusinessXray } from "@/lib/business-xray";
import type { Lead } from "@/lib/leads";

const base: Lead = { id: "1", name: "Porti Pizza Bar", address: "Rua A, 1 - Varginha - MG", phone: "+5535991526767", intlPhone: null, rating: 4.6, reviews: 120, category: "pizzaria", mapsUrl: "https://maps.example/x", email: "a@b.com", facebook: "fb.com/x" };

describe("raio-x do negocio", () => {
  it("lista presenca e caminho de abordagem", () => {
    const x = buildBusinessXray(base, "Varginha");
    expect(x.presence.find((i) => i.label === "WhatsApp")?.ok).toBe(true);
    expect(x.presence.find((i) => i.label === "Instagram")?.ok).toBe(false);
    expect(x.presence.find((i) => i.label === "Site próprio")?.ok).toBe(false);
    expect(x.channel).toMatch(/WhatsApp/);
    expect(x.reputation.tone).toBe("forte");
    expect(x.opportunity).toContain("Varginha");
  });
  it("sem avaliacao e sem telefone", () => {
    const x = buildBusinessXray({ ...base, phone: null, rating: null, reviews: null, email: null, facebook: null }, "");
    expect(x.reputation.tone).toBe("sem-dados");
    expect(x.channel).toMatch(/Google Maps/);
  });
  it("fixo manda ligar", () => {
    expect(buildBusinessXray({ ...base, phone: "(35) 3221-1234" }, "").channel).toMatch(/Ligação/);
  });
  it("gera links clicaveis", () => {
    const x = buildBusinessXray({ ...base, instagram: "@porti", facebook: "https://www.facebook.com/200" }, "");
    const href = (l: string) => x.presence.find((i) => i.label === l)?.href;
    expect(href("Instagram")).toBe("https://instagram.com/porti");
    expect(href("Facebook")).toBe("https://www.facebook.com/200");
    expect(href("Google Maps")).toBe("https://maps.example/x");
    expect(href("WhatsApp")).toBe("https://wa.me/5535991526767");
    expect(href("E-mail")).toBe("mailto:a@b.com");
    expect(href("Site próprio")).toBeUndefined();
  });
});
