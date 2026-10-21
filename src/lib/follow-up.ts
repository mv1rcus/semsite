import { z } from "zod";
import type { Lead } from "./leads";

export const STAGES = [
  { value: "new", label: "Novo" },
  { value: "contacted", label: "Contatado" },
  { value: "demo_sent", label: "Demonstração enviada" },
  { value: "closed", label: "Fechado" },
] as const;
export type Stage = (typeof STAGES)[number]["value"];
export const clientSchema = z.object({
  id: z.string(), name: z.string(), address: z.string(), phone: z.string().nullable(),
  intlPhone: z.string().nullable(), category: z.string().nullable(), mapsUrl: z.string().nullable(),
  stage: z.enum(["new", "contacted", "demo_sent", "closed"]),
  stageDate: z.string(), nextContact: z.string(), createdAt: z.string(),
  noResponse: z.boolean().default(false),
  events: z.array(z.object({ stage: z.enum(["new", "contacted", "demo_sent", "closed"]), date: z.string() })).default([]),
});
export type FollowUpClient = z.infer<typeof clientSchema>;
export const FOLLOW_UP_KEY = "client-follow-up-v1";
export function parseClients(raw: string | null): FollowUpClient[] {
  try { const parsed = z.array(clientSchema).safeParse(JSON.parse(raw ?? "[]")); return parsed.success ? parsed.data.map((client) => ({ ...client, events: client.events.length ? client.events : [{ stage: client.stage, date: client.stageDate }] })) : []; }
  catch { return []; }
}
export function trackClient(clients: FollowUpClient[], lead: Lead, stage?: Stage, now = new Date().toISOString()) {
  const previous = clients.find((client) => client.id === lead.id);
  const nextStage = stage ?? previous?.stage ?? "new";
  const client: FollowUpClient = {
    id: lead.id, name: lead.name, address: lead.address, phone: lead.phone, intlPhone: lead.intlPhone,
    category: lead.category, mapsUrl: lead.mapsUrl, stage: nextStage,
    stageDate: previous && previous.stage === nextStage ? previous.stageDate : now,
    nextContact: previous?.nextContact ?? "", createdAt: previous?.createdAt ?? now,
    noResponse: previous?.noResponse ?? false,
    events: previous ? previous.stage === nextStage ? previous.events : [...previous.events, { stage: nextStage, date: now }] : [{ stage: nextStage, date: now }],
  };
  return previous ? clients.map((old) => old.id === lead.id ? client : old) : [client, ...clients];
}
export function updateClient(client: FollowUpClient, patch: Partial<Pick<FollowUpClient, "stage" | "stageDate" | "nextContact" | "noResponse">>, now = new Date().toISOString()): FollowUpClient {
  if (patch.stage && patch.stage !== client.stage) return { ...client, ...patch, stageDate: now, events: [...client.events, { stage: patch.stage, date: now }] };
  const events = [...client.events];
  if (patch.stageDate) {
    const index = events.map((event) => event.stage).lastIndexOf(client.stage);
    if (index >= 0) events[index] = { stage: client.stage, date: patch.stageDate };
    else events.push({ stage: client.stage, date: patch.stageDate });
  }
  return { ...client, ...patch, events };
}
export function reminderDue(client: FollowUpClient, now = Date.now()) {
  return client.stage !== "closed" && !!client.nextContact && new Date(client.nextContact).getTime() <= now;
}
export function removeClients(clients: FollowUpClient[], ids: string[]) {
  const selected = new Set(ids);
  return clients.filter((client) => !selected.has(client.id));
}
export function localDateInput(value: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}