import { z } from "zod";
import type { Lead } from "./leads";

export const STAGES = [
  { value: "new", label: "Novo" },
  { value: "contacted", label: "Contatado" },
  { value: "demo_sent", label: "Demonstração enviada" },
  { value: "closed", label: "Fechado" },
] as const;
export type Stage = (typeof STAGES)[number]["value"];
const clientSchema = z.object({
  id: z.string(), name: z.string(), address: z.string(), phone: z.string().nullable(),
  intlPhone: z.string().nullable(), category: z.string().nullable(), mapsUrl: z.string().nullable(),
  stage: z.enum(["new", "contacted", "demo_sent", "closed"]),
  stageDate: z.string(), nextContact: z.string(), createdAt: z.string(),
});
export type FollowUpClient = z.infer<typeof clientSchema>;
export const FOLLOW_UP_KEY = "client-follow-up-v1";
export function parseClients(raw: string | null): FollowUpClient[] {
  try { const parsed = z.array(clientSchema).safeParse(JSON.parse(raw ?? "[]")); return parsed.success ? parsed.data : []; }
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
  };
  return previous ? clients.map((old) => old.id === lead.id ? client : old) : [client, ...clients];
}
export function reminderDue(client: FollowUpClient, now = Date.now()) {
  return client.stage !== "closed" && !!client.nextContact && new Date(client.nextContact).getTime() <= now;
}
export function localDateInput(value: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}