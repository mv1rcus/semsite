import { describe, expect, it } from "vitest";
import { leadFromAnalysis, parseHistory, parsePrefill, prefillFromLead, removeEntry, saveEntry, ANALYSIS_HISTORY_LIMIT } from "@/lib/analysis-history";
import type { Lead } from "@/lib/leads";

const form = { name: "Barbearia do Zé", segment: "Barbearia", city: "Juiz de Fora", website: "none" as const, services: "", social: "", notes: "", senderName: "Ana" };
const lead: Lead = { id: "ovt:abc", name: "Barbearia do Zé", address: "Rua A, 1", phone: "32999998888", intlPhone: "+5532999998888", rating: null, reviews: null, category: "Barbearia", mapsUrl: null, instagram: "zebarber", facebook: null };

describe("histórico da Análise", () => {
  it("guarda a análise mais recente no topo e não duplica o mesmo negócio", () => {
    let list = saveEntry([], form, "", undefined, "2026-01-01T00:00:00Z");
    list = saveEntry(list, { ...form, name: "Outro" }, "", undefined, "2026-01-02T00:00:00Z");
    list = saveEntry(list, { ...form, notes: "novo" }, "32999998888", undefined, "2026-01-03T00:00:00Z");
    expect(list.map((e) => e.form.name)).toEqual(["Barbearia do Zé", "Outro"]);
    expect(list[0]!.phone).toBe("32999998888");
  });
  it("limita o tamanho e remove por id", () => {
    let list: ReturnType<typeof saveEntry> = [];
    for (let i = 0; i < 20; i++) list = saveEntry(list, { ...form, name: `Negócio ${i}` }, "");
    expect(list).toHaveLength(ANALYSIS_HISTORY_LIMIT);
    expect(removeEntry(list, list[0]!.id)).toHaveLength(ANALYSIS_HISTORY_LIMIT - 1);
  });
  it("ignora armazenamento corrompido", () => {
    expect(parseHistory("{ruim")).toEqual([]);
    expect(parseHistory(null)).toEqual([]);
    expect(parseHistory(JSON.stringify(saveEntry([], form, "")))).toHaveLength(1);
  });
});

describe("preenchimento a partir da busca", () => {
  it("usa os dados do lead: sem site registrado, redes e telefone", () => {
    const p = prefillFromLead(lead, " Juiz de Fora ");
    expect(p.form).toMatchObject({ name: "Barbearia do Zé", segment: "Barbearia", city: "Juiz de Fora", website: "none", social: "Instagram @zebarber" });
    expect(p.phone).toBe("+5532999998888");
    expect(p.leadId).toBe("ovt:abc");
    expect(parsePrefill(JSON.stringify(p))).toEqual(p);
    expect(parsePrefill("lixo")).toBeNull();
  });
  it("monta um lead para demonstração e acompanhamento", () => {
    expect(leadFromAnalysis(form, "", undefined)).toMatchObject({ name: "Barbearia do Zé", address: "Juiz de Fora", phone: null, category: "Barbearia" });
    expect(leadFromAnalysis(form, "32 99999-8888", "ovt:abc").id).toBe("ovt:abc");
  });
});
