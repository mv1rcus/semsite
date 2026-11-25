export type AchievementId = "primeiros_passos" | "ofensiva_7" | "resposta_lead" | "primeira_busca" | "primeira_demo" | "venda_1" | "venda_5" | "venda_10" | "venda_25" | "venda_50";

export type AchievementDef = { id: AchievementId; name: string; description: string; emoji: string };

export const ACHIEVEMENTS: AchievementDef[] = [
  { id: "primeiros_passos", name: "Primeiros passos", description: "Buscou clientes, criou uma demonstração e enviou a primeira mensagem.", emoji: "🏁" },
  { id: "ofensiva_7", name: "Ofensiva", description: "Usou o SemSite em dias seguidos (busca, demonstração, contato ou venda). O contador sobe enquanto você mantém a ofensiva e a badge sai do perfil se você parar.", emoji: "📆" },
  { id: "resposta_lead", name: "Primeira resposta de lead", description: "Um lead respondeu e avançou para demo enviada no funil.", emoji: "💬" },
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
export function computeAchievements(input: { salesDates: string[]; demoDates: string[]; firstSearchDay: string | null; firstContactDate?: string | null; activityDates?: string[]; now?: Date; leadReplyDates?: string[] }): AchievementProgress[] {
  const sales = [...input.salesDates].sort();
  const demos = [...input.demoDates].sort();
  const steps = [input.firstSearchDay, demos[0] ?? null, input.firstContactDate ?? null];
  const stepsDone = steps.every(Boolean) ? (steps as string[]).map((x) => new Date(x.length === 10 ? `${x}T12:00:00Z` : x).getTime()).reduce((a, b) => Math.max(a, b)) : null;
  const streak = currentStreak(input.activityDates ?? [], input.now);
  return ACHIEVEMENTS.map((d) => {
    if (d.id === "ofensiva_7") return { ...d, name: streak.count >= 1 ? `Ofensiva de ${streak.count} ${streak.count === 1 ? "dia" : "dias"}` : d.name, earnedAt: streak.count >= 1 ? streak.start : null };
    if (d.id === "resposta_lead") return { ...d, earnedAt: [...(input.leadReplyDates ?? [])].sort()[0] ?? null };
    if (d.id === "primeiros_passos") return { ...d, earnedAt: stepsDone === null ? null : new Date(stepsDone).toISOString(), progress: { current: steps.filter(Boolean).length, target: 3 } };
    if (d.id === "primeira_busca") return { ...d, earnedAt: input.firstSearchDay };
    if (d.id === "primeira_demo") return { ...d, earnedAt: demos[0] ?? null };
    const target = SALES_STEPS.find(([id]) => id === d.id)![1];
    return { ...d, earnedAt: (sales.length >= target ? sales[target - 1] : null) as string | null, progress: { current: Math.min(sales.length, target), target } };
  });
}

/** Dia local (Brasil, UTC-3) em YYYY-MM-DD. */
export function localDay(iso: string): string {
  if (iso.length === 10) return iso;
  return new Date(new Date(iso).getTime() - 3 * 3600 * 1000).toISOString().slice(0, 10);
}

/** Dia em que fechou a primeira sequencia de `target` dias seguidos, ou null. */
export function streakReachedOn(dates: string[], target: number): string | null {
  const days = [...new Set(dates.map(localDay))].sort();
  let run = 0;
  let prev: number | null = null;
  for (const d of days) {
    const t = Date.parse(`${d}T00:00:00Z`);
    run = prev !== null && t - prev === 86400000 ? run + 1 : 1;
    prev = t;
    if (run >= target) return d;
  }
  return null;
}

/** Ofensiva atual: dias seguidos terminando hoje (ou ontem, ainda dá tempo de manter). Se parou antes, zera. */
export function currentStreak(dates: string[], now: Date = new Date()): { count: number; reachedOn: string | null; start: string | null } {
  const days = new Set(dates.map(localDay));
  const today = localDay(now.toISOString());
  const dayMs = 86400000;
  const shift = (d: string, n: number) => new Date(Date.parse(`${d}T00:00:00Z`) + n * dayMs).toISOString().slice(0, 10);
  let end = days.has(today) ? today : shift(today, -1);
  if (!days.has(end)) return { count: 0, reachedOn: null, start: null };
  let count = 0;
  let cur = end;
  while (days.has(cur)) { count++; cur = shift(cur, -1); }
  const start = shift(end, -(count - 1));
  return { count, reachedOn: count >= 7 ? shift(start, 6) : null, start };
}
