import { describe, expect, it } from "vitest";
import { countStageEventsInRange, formatBRL, monthRange, parseReaisToCents } from "@/lib/results";
import { dueToday, trackClient } from "@/lib/follow-up";
import type { Lead } from "@/lib/leads";

const lead: Lead = { id: "a", name: "Cliente", address: "", phone: null, intlPhone: null, category: null, mapsUrl: null, rating: null, reviews: null };

describe("monthRange", () => {
  it("cobre o mês inteiro da data", () => {
    const { start, end } = monthRange(new Date(2026, 10, 25, 14, 30));
    expect(start).toEqual(new Date(2026, 10, 1));
    expect(end).toEqual(new Date(2026, 11, 1));
  });
});

describe("countStageEventsInRange", () => {
  it("conta clientes únicos com evento no período", () => {
    const { start, end } = monthRange(new Date(2026, 10, 25));
    const clients = [
      trackClient([], lead, "demo_sent", "2026-11-10T12:00:00.000Z")[0]!,
      trackClient([], { ...lead, id: "b" }, "demo_sent", "2026-10-05T12:00:00.000Z")[0]!,
      trackClient([], { ...lead, id: "c" }, "contacted", "2026-11-12T12:00:00.000Z")[0]!,
    ];
    expect(countStageEventsInRange(clients, "demo_sent", start, end)).toBe(1);
    expect(countStageEventsInRange(clients, "contacted", start, end)).toBe(1);
  });
});

describe("formatBRL / parseReaisToCents", () => {
  it("formata centavos em reais", () => {
    expect(formatBRL(35000)).toContain("350");
    expect(formatBRL(0)).toContain("0");
  });
  it("lê valores brasileiros", () => {
    expect(parseReaisToCents("350")).toBe(35000);
    expect(parseReaisToCents("1.200,00")).toBe(120000);
    expect(parseReaisToCents("99,90")).toBe(9990);
  });
  it("rejeita vazio, texto e negativo", () => {
    expect(parseReaisToCents("")).toBe("invalid");
    expect(parseReaisToCents("abc")).toBe("invalid");
    expect(parseReaisToCents("-50")).toBe("invalid");
  });
});

describe("dueToday", () => {
  it("inclui atrasados e os de hoje, exclui amanhã e fechados", () => {
    const now = new Date(2026, 10, 25, 14, 0);
    const client = trackClient([], lead, "contacted", "2026-11-20T12:00:00.000Z")[0]!;
    expect(dueToday({ ...client, nextContact: new Date(2026, 10, 24, 10, 0).toISOString() }, now)).toBe(true);
    expect(dueToday({ ...client, nextContact: new Date(2026, 10, 25, 23, 30).toISOString() }, now)).toBe(true);
    expect(dueToday({ ...client, nextContact: new Date(2026, 10, 26, 0, 1).toISOString() }, now)).toBe(false);
    expect(dueToday({ ...client, nextContact: "" }, now)).toBe(false);
    expect(dueToday({ ...client, nextContact: new Date(2026, 10, 24, 10, 0).toISOString(), stage: "closed" }, now)).toBe(false);
  });
});
