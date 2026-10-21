import { z } from "zod";
import { clientSchema, STAGES, type FollowUpClient } from "./follow-up";

const backupSchema = z.object({
  version: z.literal(1),
  exportedAt: z.string(),
  clients: z.array(clientSchema),
});

export function stageLabel(value: string) {
  return STAGES.find((stage) => stage.value === value)?.label ?? value;
}

export const CSV_HEADER = ["Nome", "Telefone", "Endereço", "Categoria", "Etapa", "Data da etapa", "Próximo contato", "Criado em"] as const;

function csvCell(value: string) {
  return `"${value.replace(/"/g, '""')}"`;
}

export function clientsToCsv(clients: FollowUpClient[]): string {
  const rows = clients.map((client) => [client.name, client.phone ?? "", client.address, client.category ?? "", stageLabel(client.stage), client.stageDate, client.nextContact, client.createdAt]);
  return [CSV_HEADER, ...rows].map((row) => row.map(csvCell).join(";")).join("\r\n");
}

export function makeBackup(clients: FollowUpClient[], exportedAt = new Date().toISOString()) {
  return { version: 1 as const, exportedAt, clients };
}

export function backupFileName(kind: "json" | "csv", now = new Date()) {
  const day = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  return `caca-clientes-${day}.${kind}`;
}

export function parseBackup(raw: string): FollowUpClient[] | null {
  try {
    const parsed = backupSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) return null;
    return parsed.data.clients.map((client) => ({ ...client, events: client.events.length ? client.events : [{ stage: client.stage, date: client.stageDate }] }));
  } catch { return null; }
}

export function mergeClients(existing: FollowUpClient[], imported: FollowUpClient[]): FollowUpClient[] {
  const importedNewest = new Map<string, FollowUpClient>();
  for (const client of imported) {
    const current = importedNewest.get(client.id);
    if (!current || client.stageDate > current.stageDate) importedNewest.set(client.id, client);
  }
  const restored = existing.map((current) => {
    const incoming = importedNewest.get(current.id);
    return incoming && incoming.stageDate > current.stageDate ? incoming : current;
  });
  const existingIds = new Set(existing.map((client) => client.id));
  const additions = [...importedNewest.values()].filter((client) => !existingIds.has(client.id));
  return [...additions, ...restored];
}

export function downloadText(filename: string, content: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = "noopener";
  anchor.click();
  URL.revokeObjectURL(url);
}
