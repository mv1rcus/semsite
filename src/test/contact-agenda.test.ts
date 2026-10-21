import { describe, expect, it } from "vitest";
import { contactAgenda, scheduleContact, agendaWhatsApp } from "@/lib/contact-agenda";
import { trackClient } from "@/lib/follow-up";
import type { Lead } from "@/lib/leads";
const lead: Lead = { id: "a", name: "Cliente", address: "", phone: "11999999999", intlPhone: null, category: null, mapsUrl: null, rating: null, reviews: null };
const now = new Date(2026, 9, 21, 12);
const base = trackClient([], lead, "contacted", now.toISOString())[0];
if (!base) throw new Error("Missing fixture");
describe("Contact agenda", () => {
  it("excludes closed clients and future appointments", () => {
    expect(contactAgenda([{ ...base, stage: "closed" }, { ...base, nextContact: scheduleContact(3, now) }], now.getTime())).toEqual([]);
  });
  it("prioritizes overdue reminders before unscheduled demonstrations", () => {
    const due = { ...base, id: "due", nextContact: scheduleContact(-1, now) };
    expect(contactAgenda([{ ...base, id: "demo", stage: "demo_sent" }, due], now.getTime()).map(c => c.id)).toEqual(["due", "demo"]);
  });
  it("includes appointments later today", () => {
    expect(contactAgenda([{ ...base, nextContact: new Date(2026, 9, 21, 18).toISOString() }], now.getTime())).toHaveLength(1);
  });
  it("schedules calendar-day reminders preserving local time", () => {
    expect(new Date(scheduleContact(3, now)).getDate()).toBe(24);
    expect(new Date(scheduleContact(3, now)).getHours()).toBe(12);
  });
  it("opens an editable message without changing the client stage or events", () => {
    const before = JSON.stringify(base);
    expect(agendaWhatsApp(base, "Olá! Ajuste personalizado")).toBe("https://wa.me/5511999999999?text=Ol%C3%A1!%20Ajuste%20personalizado");
    expect(JSON.stringify(base)).toBe(before);
    expect(agendaWhatsApp({ ...base, phone: null }, "Mensagem")).toBeNull();
  });
});