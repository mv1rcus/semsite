import { describe, expect, it } from "vitest";
import { computeAchievements } from "@/lib/achievements";

describe("computeAchievements", () => {
  it("nada feito", () => {
    const r = computeAchievements({ salesDates: [], demoDates: [], firstSearchDay: null });
    expect(r.every((a) => a.earnedAt === null)).toBe(true);
  });
  it("usa a data do N-esimo fechamento", () => {
    const sales = Array.from({ length: 6 }, (_, i) => `2026-11-0${i + 1}T10:00:00Z`);
    const r = computeAchievements({ salesDates: sales.reverse(), demoDates: ["2026-10-01T00:00:00Z"], firstSearchDay: "2026-09-30" });
    const by = Object.fromEntries(r.map((a) => [a.id, a.earnedAt]));
    expect(by["venda_1"]).toBe("2026-11-01T10:00:00Z");
    expect(by["venda_5"]).toBe("2026-11-05T10:00:00Z");
    expect(by["venda_10"]).toBeNull();
    expect(by["primeira_demo"]).toBe("2026-10-01T00:00:00Z");
    expect(by["primeira_busca"]).toBe("2026-09-30");
  });
});

import { isDeveloperId } from "@/components/DeveloperBadge";
describe("primeiros passos", () => {
  it("so conta com busca, demo e contato, na data do ultimo", () => {
    const base = { salesDates: [], demoDates: ["2026-10-02T00:00:00Z"], firstSearchDay: "2026-10-01" };
    expect(computeAchievements(base).find((a) => a.id === "primeiros_passos")!.earnedAt).toBeNull();
    const r = computeAchievements({ ...base, firstContactDate: "2026-10-05T10:00:00Z" }).find((a) => a.id === "primeiros_passos")!;
    expect(r.earnedAt).toBe("2026-10-05T10:00:00.000Z");
  });
});

describe("selo de dev", () => {
  it("so vale para o id do fundador", () => {
    expect(isDeveloperId("60254e77-1a4c-4be8-8b77-3d29a537785f")).toBe(true);
    expect(isDeveloperId("outro")).toBe(false);
    expect(isDeveloperId(undefined)).toBe(false);
  });
});
