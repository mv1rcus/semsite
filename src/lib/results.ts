import type { FollowUpClient, Stage } from "./follow-up";

/** Início e fim (exclusivo) do mês da data, em horário local. */
export function monthRange(date: Date) {
  return { start: new Date(date.getFullYear(), date.getMonth(), 1), end: new Date(date.getFullYear(), date.getMonth() + 1, 1) };
}

/** Clientes únicos que tiveram um evento da etapa dentro do intervalo (ex.: "demo_sent" no mês). */
export function countStageEventsInRange(clients: FollowUpClient[], stage: Stage, start: Date, end: Date) {
  const from = start.getTime(), to = end.getTime();
  return clients.filter((client) => client.events.some((event) => event.stage === stage && Date.parse(event.date) >= from && Date.parse(event.date) < to)).length;
}

/** Formata centavos como moeda brasileira (R$ 1.234,56). */
export function formatBRL(cents: number) {
  return (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/** Lê "1.234,56" ou "350" em centavos; "invalid" quando não é um valor aceitável. */
export function parseReaisToCents(text: string): number | "invalid" {
  const t = text.trim();
  if (!t) return "invalid";
  const n = Number(t.replace(/\./g, "").replace(",", "."));
  return Number.isFinite(n) && n >= 0 && n <= 9999999.99 ? Math.round(n * 100) : "invalid";
}
