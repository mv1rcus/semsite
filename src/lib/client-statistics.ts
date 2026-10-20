import type { FollowUpClient, Stage } from "./follow-up";
export type ReportPeriod = "day" | "month" | "year";
export type Metric = "messages" | "demos" | "closed";
const stageFor: Record<Metric, Stage> = { messages: "contacted", demos: "demo_sent", closed: "closed" };
export function reportRange(period: ReportPeriod, date: Date) {
  const start = new Date(date.getFullYear(), period === "year" ? 0 : date.getMonth(), period === "day" ? date.getDate() : 1);
  const end = new Date(start);
  if (period === "day") end.setDate(end.getDate() + 1);
  else if (period === "month") end.setMonth(end.getMonth() + 1);
  else end.setFullYear(end.getFullYear() + 1);
  return { start, end };
}
export function uniqueClientTotals(clients: FollowUpClient[], start: Date, end: Date): Record<Metric, number> {
  const totals = { messages: 0, demos: 0, closed: 0 };
  for (const metric of Object.keys(stageFor) as Metric[]) {
    totals[metric] = clients.filter((client) => client.events.some((event) => event.stage === stageFor[metric] && Date.parse(event.date) >= start.getTime() && Date.parse(event.date) < end.getTime())).length;
  }
  return totals;
}
export function reportSeries(clients: FollowUpClient[], period: ReportPeriod, date: Date) {
  const { start, end } = reportRange(period, date);
  const rows: ({ label: string } & Record<Metric, number>)[] = [];
  for (let cursor = new Date(start); cursor < end;) {
    const next = new Date(cursor);
    if (period === "day") next.setHours(next.getHours() + 1);
    else if (period === "month") next.setDate(next.getDate() + 1);
    else next.setMonth(next.getMonth() + 1);
    const label = period === "day" ? `${cursor.getHours()}h` : period === "month" ? String(cursor.getDate()).padStart(2, "0") : cursor.toLocaleDateString("pt-BR", { month: "short" });
    rows.push({ label, ...uniqueClientTotals(clients, cursor, next) }); cursor = next;
  }
  return rows;
}