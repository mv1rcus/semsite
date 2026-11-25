export type AchievementId = "primeira_busca" | "primeira_demo" | "venda_1" | "venda_5" | "venda_10" | "venda_25" | "venda_50";

export type AchievementDef = { id: AchievementId; name: string; description: string; emoji: string };

export const ACHIEVEMENTS: AchievementDef[] = [
  { id: "primeira_busca", name: "Primeira busca", description: "Fez a primeira busca de clientes sem site.", emoji: "🔎" },
  { id: "primeira_demo", name: "Primeira demonstração", description: "Criou o primeiro site de demonstração.", emoji: "🎨" },
  { id: "venda_1", name: "Primeiro site fechado", description: "Fechou o primeiro site.", emoji: "🤝" },
  { id: "venda_5", name: "5 sites fechados", description: "Fechou 5 sites.", emoji: "⭐" },
  { id: "venda_10", name: "10 sites fechados", description: "Fechou 10 sites.", emoji: "🔥" },
  { id: "venda_25", name: "25 sites fechados", description: "Fechou 25 sites.", emoji: "🚀" },
  { id: "venda_50", name: "50 sites fechados", description: "Fechou 50 sites.", emoji: "👑" },
];

const SALES_STEPS: [AchievementId, number][] = [["venda_1", 1], ["venda_5", 5], ["venda_10", 10], ["venda_25", 25], ["venda_50", 50]];

export type AchievementProgress = AchievementDef & { earnedAt: string | null; progress?: { current: number; target: number } };

/** Datas em ISO. salesDates: datas dos fechamentos; demoDates: criacao das demos; firstSearchDay: dia da primeira busca. */
export function computeAchievements(input: { salesDates: string[]; demoDates: string[]; firstSearchDay: string | null }): AchievementProgress[] {
  const sales = [...input.salesDates].sort();
  const demos = [...input.demoDates].sort();
  return ACHIEVEMENTS.map((d) => {
    if (d.id === "primeira_busca") return { ...d, earnedAt: input.firstSearchDay };
    if (d.id === "primeira_demo") return { ...d, earnedAt: demos[0] ?? null };
    const target = SALES_STEPS.find(([id]) => id === d.id)![1];
    return { ...d, earnedAt: (sales.length >= target ? sales[target - 1] : null) as string | null, progress: { current: Math.min(sales.length, target), target } };
  });
}
