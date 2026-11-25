import { describe, expect, it } from "vitest";
import { computeAchievements, streakReachedOn, currentStreak } from "@/lib/achievements";

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

describe("ofensiva", () => {
  it("7 dias seguidos fecha no setimo dia", () => {
    const days = ["2026-11-01", "2026-11-02", "2026-11-03", "2026-11-04", "2026-11-05", "2026-11-06", "2026-11-07"];
    expect(streakReachedOn(days, 7)).toBe("2026-11-07");
  });
  it("buraco quebra a sequencia", () => {
    const days = ["2026-11-01", "2026-11-02", "2026-11-03", "2026-11-05", "2026-11-06", "2026-11-07", "2026-11-08"];
    expect(streakReachedOn(days, 7)).toBeNull();
  });
  it("conta o dia no fuso do Brasil", () => {
    expect(streakReachedOn(["2026-11-02T01:00:00Z"], 1)).toBe("2026-11-01");
  });
});

describe("ofensiva atual", () => {
  const now = new Date("2026-11-10T15:00:00Z");
  it("conta ate hoje", () => {
    const d = ["2026-11-04","2026-11-05","2026-11-06","2026-11-07","2026-11-08","2026-11-09","2026-11-10","2026-11-11"].slice(0, 7);
    expect(currentStreak(d, now)).toEqual({ count: 7, reachedOn: "2026-11-10" });
  });
  it("ainda vale se o ultimo dia foi ontem", () => {
    expect(currentStreak(["2026-11-08","2026-11-09"], now).count).toBe(2);
  });
  it("zera se parou", () => {
    expect(currentStreak(["2026-11-01","2026-11-02","2026-11-03","2026-11-04","2026-11-05","2026-11-06","2026-11-07"], now).count).toBe(0);
  });
});
