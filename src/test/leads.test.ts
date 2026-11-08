import { describe, expect, it } from "vitest";
import { isMobilePhone, phoneCallLink, prospectPriority, rankProspects, searchInputSchema, type Lead } from "@/lib/leads";
const base: Lead = { id: "a", name: "Local", address: "", phone: null, intlPhone: null, rating: null, reviews: null, category: null, mapsUrl: null };
describe("Search pagination", () => {
  it("preserves an opaque Google token longer than 1000 characters", () => {
    const pageToken = " aB+/=".repeat(700);
    expect(searchInputSchema.parse({ category: "Dentista", city: "Campinas, SP", pageToken }).pageToken).toBe(pageToken);
  });
  it("allows a first search without a page token", () => {
    expect(searchInputSchema.parse({ category: "Dentista", city: "Campinas, SP" }).pageToken).toBeUndefined();
  });
});
describe("Promising prospects", () => {
  it("prioritizes reachable businesses", () => {
    expect(rankProspects([base, { ...base, id: "b", intlPhone: "+5511999999999" }])[0]?.id).toBe("b");
  });
  it("prioritizes reputation when contact availability is equal", () => {
    expect(rankProspects([{ ...base, phone: "11999999999" }, { ...base, id: "b", phone: "11999999999", rating: 4.5, reviews: 30 }])[0]?.id).toBe("b");
  });
  it("does not invent positive signals for missing information", () => {
    expect(prospectPriority(base)).toEqual({ score: 0, reasons: [] });
  });
  it("treats 9-digit numbers starting with 9 as WhatsApp mobiles and others as landlines", () => {
    expect(isMobilePhone({ phone: null, intlPhone: "+55 34 99772-0121" })).toBe(true);
    expect(isMobilePhone({ phone: "(34) 3822-6337", intlPhone: "+55 34 3822-6337" })).toBe(false);
  });
  it("builds a call link for landlines", () => {
    expect(phoneCallLink({ phone: "(34) 3822-6337", intlPhone: null })).toBe("tel:+553438226337");
  });
  it("deduplicates repeated leads across pages", () => {
    expect(rankProspects([base, base])).toHaveLength(1);
  });
});