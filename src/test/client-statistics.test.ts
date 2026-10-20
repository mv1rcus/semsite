import { describe, expect, it } from "vitest";
import { parseClients, trackClient, updateClient } from "@/lib/follow-up";
import { reportRange, reportSeries, uniqueClientTotals } from "@/lib/client-statistics";
import type { Lead } from "@/lib/leads";
const lead: Lead = { id: "a", name: "Cliente A", address: "", phone: null, intlPhone: null, category: null, rating: null, reviews: null, mapsUrl: null };
const contact = new Date(2026, 9, 20, 10).toISOString();
const close = new Date(2026, 10, 2, 12).toISOString();
function fixture() { const client = trackClient([], lead, "contacted", contact)[0]; if (!client) throw new Error("Missing client"); return updateClient(client, { stage: "closed" }, close); }
describe("Client charts", () => {
  it("preserves a contact in October after closing in November", () => {
    const range = reportRange("month", new Date(2026, 9, 20));
    expect(uniqueClientTotals([fixture()], range.start, range.end)).toEqual({ messages: 1, demos: 0, closed: 0 });
  });
  it("counts closed clients on the day of closing", () => {
    const range = reportRange("day", new Date(2026, 10, 2));
    expect(uniqueClientTotals([fixture()], range.start, range.end).closed).toBe(1);
  });
  it("counts a client once per metric in the year", () => {
    const client = fixture(); client.events.push({ stage: "contacted", date: close });
    const range = reportRange("year", new Date(2026, 9, 20));
    expect(uniqueClientTotals([client], range.start, range.end)).toEqual({ messages: 1, demos: 0, closed: 1 });
  });
  it("counts demonstrations separately", () => {
    const client = fixture(); client.events.push({ stage: "demo_sent", date: contact });
    const range = reportRange("day", new Date(2026, 9, 20));
    expect(uniqueClientTotals([client], range.start, range.end).demos).toBe(1);
  });
  it("groups a month's messages by day", () => { const row = reportSeries([fixture()], "month", new Date(2026, 9, 1)).find((r) => r.label === "20"); expect(row?.messages).toBe(1); });
  it("updates the chart date when the stage date is corrected", () => {
    const client = updateClient(fixture(), { stageDate: contact });
    const range = reportRange("day", new Date(2026, 9, 20));
    expect(uniqueClientTotals([client], range.start, range.end).closed).toBe(1);
  });
  it("reads old records without inventing earlier message dates", () => {
    const { events, ...old } = fixture();
    expect(parseClients(JSON.stringify([old]))[0]?.events).toEqual([{ stage: "closed", date: close }]);
  });
});