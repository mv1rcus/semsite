import { describe, expect, it } from "vitest";
import { backupFileName, clientsToCsv, CSV_HEADER, makeBackup, mergeClients, parseBackup, stageLabel } from "@/lib/backup";
import { trackClient, updateClient } from "@/lib/follow-up";
import type { Lead } from "@/lib/leads";
const lead: Lead = { id: "a", name: 'Barbearia "Zé", Ltda', address: "Campinas, SP", phone: "(19) 99999-9999", intlPhone: null, category: null, mapsUrl: null, rating: null, reviews: null };
const now = "2026-10-20T12:00:00.000Z";
const later = "2026-10-21T12:00:00.000Z";
function closedClient() { const tracked = trackClient([], lead, "contacted", now)[0]; if (!tracked) throw new Error("Missing client"); return updateClient(tracked, { stage: "closed" }, later); }
describe("Client backup", () => {
  it("exports a spreadsheet with escaped cells and pt-BR stage labels", () => {
    const csv = clientsToCsv([closedClient()]);
    const [header, row] = csv.split("\r\n");
    expect(header).toBe(CSV_HEADER.map((cell) => `"${cell}"`).join(";"));
    expect(row).toContain('"Barbearia ""Zé"", Ltda"');
    expect(row).toContain('"Fechado"');
    expect(row?.endsWith(`"${now}"`)).toBe(true);
  });
  it("round-trips a saved backup with normalized events", () => {
    const backup = makeBackup([closedClient()], now);
    expect(parseBackup(JSON.stringify(backup))).toEqual([closedClient()]);
  });
  it("rejects files that are not a valid backup", () => {
    expect(parseBackup("nope")).toBeNull();
    expect(parseBackup("[]")).toBeNull();
    expect(parseBackup(JSON.stringify(makeBackup([closedClient()], now)).replace('"version":1', '"version":2'))).toBeNull();
  });
  it("restores by merge, keeping the newest stage date and never losing clients", () => {
    const existing = trackClient([], { ...lead, id: "b", name: "B" }, "new", "2026-10-01T12:00:00.000Z");
    const base = existing[0]; if (!base) throw new Error("Missing client");
    const newer = updateClient(base, { stage: "contacted" }, "2026-10-05T12:00:00.000Z");
    const fresh = trackClient([], { ...lead, id: "c", name: "C" }, "new", "2026-10-10T12:00:00.000Z");
    const merged = mergeClients(existing, [...fresh, newer, base]);
    expect(merged.map((client) => client.id)).toEqual(["c", "b"]);
    expect(merged.find((client) => client.id === "b")?.stage).toBe("contacted");
  });
  it("names backup files by date", () => {
    expect(backupFileName("csv", new Date(2026, 9, 20))).toBe("caca-clientes-2026-10-20.csv");
    expect(backupFileName("json", new Date(2026, 9, 20))).toBe("caca-clientes-2026-10-20.json");
  });
  it("maps every stage to its pt-BR label", () => {
    expect(stageLabel("demo_sent")).toBe("Demonstração enviada");
  });
});
