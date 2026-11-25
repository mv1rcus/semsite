import { z } from "zod";
import type { DemoActivity } from "./demo-verification";

/** Funil de vendas de "Meus links": uma etapa por lead, guardada na conta do vendedor. */
export const FUNNEL_STAGES = [
  { value: "found", label: "Encontrado" },
  { value: "preview", label: "Prévia pronta" },
  { value: "contacted", label: "Contatado" },
  { value: "replied", label: "Respondeu" },
  { value: "closed", label: "Fechado" },
  { value: "discarded", label: "Descartado" },
] as const;
export type FunnelStage = (typeof FUNNEL_STAGES)[number]["value"];
const stageEnum = z.enum(["found", "preview", "contacted", "replied", "closed", "discarded"]);
export const FUNNEL_KEY = "site-demo-funnel-v1";
export const DEFAULT_STAGE: FunnelStage = "preview";
export const NOTES_MAX = 600;

export const funnelEntrySchema = z.object({
  stage: stageEnum, notes: z.string().max(NOTES_MAX).default(""), updatedAt: z.string(),
  events: z.array(z.object({ stage: stageEnum, date: z.string() })).default([]),
});
export type FunnelEntry = z.infer<typeof funnelEntrySchema>;
export type FunnelMap = Record<string, FunnelEntry>;

export function parseFunnel(raw: string | null): FunnelMap {
  try {
    const parsed = z.record(z.string(), funnelEntrySchema).safeParse(JSON.parse(raw ?? "{}"));
    return parsed.success ? parsed.data : {};
  } catch { return {}; }
}

export function stageLabel(stage: FunnelStage) {
  return FUNNEL_STAGES.find((s) => s.value === stage)?.label ?? stage;
}

export function entryFor(map: FunnelMap, id: string, now = new Date().toISOString()): FunnelEntry {
  return map[id] ?? { stage: DEFAULT_STAGE, notes: "", updatedAt: now, events: [{ stage: DEFAULT_STAGE, date: now }] };
}

export function setStage(map: FunnelMap, id: string, stage: FunnelStage, now = new Date().toISOString()): FunnelMap {
  const current = entryFor(map, id, now);
  if (current.stage === stage && map[id]) return map;
  return { ...map, [id]: { ...current, stage, updatedAt: now, events: [...current.events, { stage, date: now }] } };
}

export function setNotes(map: FunnelMap, id: string, notes: string, now = new Date().toISOString()): FunnelMap {
  const current = entryFor(map, id, now);
  return { ...map, [id]: { ...current, notes: notes.slice(0, NOTES_MAX), updatedAt: now } };
}

export function removeFromFunnel(map: FunnelMap, ids: string[]): FunnelMap {
  const gone = new Set(ids);
  return Object.fromEntries(Object.entries(map).filter(([id]) => !gone.has(id)));
}

const REACHED: Record<"contacted" | "replied" | "closed", FunnelStage[]> = {
  contacted: ["contacted", "replied", "closed"],
  replied: ["replied", "closed"],
  closed: ["closed"],
};
function reached(entry: FunnelEntry, level: keyof typeof REACHED) {
  return entry.events.some((e) => REACHED[level].includes(e.stage)) || REACHED[level].includes(entry.stage);
}

export type FunnelMetrics = {
  total: number; byStage: Record<FunnelStage, number>;
  opened: number; contacted: number; replied: number; closed: number;
  /** Fechados sobre contatados, em %; null quando ainda ninguém foi contatado. */
  closeRate: number | null;
};

export function funnelMetrics(ids: string[], map: FunnelMap, activity: Record<string, DemoActivity> = {}): FunnelMetrics {
  const byStage = { found: 0, preview: 0, contacted: 0, replied: 0, closed: 0, discarded: 0 } as Record<FunnelStage, number>;
  let opened = 0, contacted = 0, replied = 0, closed = 0;
  for (const id of ids) {
    const entry = entryFor(map, id);
    byStage[entry.stage] += 1;
    if (activity[id]?.lastOpenedAt) opened += 1;
    if (reached(entry, "contacted")) contacted += 1;
    if (reached(entry, "replied")) replied += 1;
    if (reached(entry, "closed")) closed += 1;
  }
  return { total: ids.length, byStage, opened, contacted, replied, closed, closeRate: contacted ? Math.round((closed / contacted) * 100) : null };
}
