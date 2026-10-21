import { describe, expect, it } from "vitest";
import { STAGES, trackClient, reminderDue, parseClients, updateClient, removeClients } from "@/lib/follow-up";
import type { Lead } from "@/lib/leads";
const lead: Lead = { id: "local", name: "Cliente", address: "Campinas", phone: null, intlPhone: null, category: null, mapsUrl: null, rating: null, reviews: null };
const now = "2026-10-20T23:39:00.000Z";
describe("Client follow-up", () => {
  it("offers the four requested client stages", () => { expect(STAGES.map((s) => s.label)).toEqual(["Novo", "Contatado", "Demonstração enviada", "Fechado"]); });
  it("starts a client as new with a date", () => { expect(trackClient([], lead, undefined, now)[0]).toMatchObject({ stage: "new", stageDate: now }); });
  it.each(["contacted", "demo_sent", "closed"] as const)("records the date of stage %s without duplicating the client", (stage) => {
    const result = trackClient(trackClient([], lead, undefined, now), lead, stage, "2026-10-21T12:00:00.000Z");
    expect(result).toHaveLength(1); expect(result[0]).toMatchObject({ stage, stageDate: "2026-10-21T12:00:00.000Z" });
  });
  it("preserves the next-contact reminder during stage changes", () => {
    const result = trackClient([], lead, undefined, now).map((c) => ({ ...c, nextContact: "2026-10-22T12:00:00.000Z" }));
    expect(trackClient(result, lead, "contacted", now)[0]?.nextContact).toBe("2026-10-22T12:00:00.000Z");
  });
  it("flags a reminder when its scheduled time arrives", () => {
    const client = trackClient([], lead, "contacted", now)[0]; if (!client) throw new Error("Missing client");
    expect(reminderDue({ ...client, nextContact: now }, Date.parse(now))).toBe(true);
    expect(reminderDue({ ...client, nextContact: "2026-10-21T12:00:00.000Z" }, Date.parse(now))).toBe(false);
    expect(reminderDue({ ...client, nextContact: now, stage: "closed" }, Date.parse(now))).toBe(false);
  });
  it("reads saved stages and dates back", () => { const clients = trackClient([], lead, "demo_sent", now); expect(parseClients(JSON.stringify(clients))).toEqual(clients); });
  it("only marks no response explicitly without altering contact history", () => {
    const client = trackClient([], lead, "contacted", now)[0];
    if (!client) throw new Error("Missing client");
    expect(client.noResponse).toBe(false);
    const marked = updateClient(client, { noResponse: true });
    expect(marked.noResponse).toBe(true);
    expect(marked.events).toEqual(client.events);
    expect(marked.stageDate).toBe(now);
    expect(updateClient(marked, { noResponse: false }).noResponse).toBe(false);
  });
  it("removes only selected clients, leaving other records unchanged", () => {
    const clients = trackClient(trackClient([], lead, "contacted", now), { ...lead, id: "keep" }, "closed", now);
    expect(removeClients(clients, ["local", "missing"])).toEqual(clients.filter(c => c.id === "keep"));
    expect(removeClients(clients, [])).toEqual(clients);
  });
  it("loads legacy clients without a response marker and preserves markers when tracked again", () => {
    const client = trackClient([], lead, "contacted", now)[0];
    if (!client) throw new Error("Missing client");
    const { noResponse, ...legacy } = client;
    expect(parseClients(JSON.stringify([legacy]))[0]?.noResponse).toBe(false);
    expect(trackClient([{ ...client, noResponse: true }], lead)[0]?.noResponse).toBe(true);
  });
});