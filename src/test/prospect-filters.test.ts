import { describe, expect, it } from "vitest";
import { filterProspects } from "@/lib/prospect-filters";
import { trackClient } from "@/lib/follow-up";
import type { Lead } from "@/lib/leads";

const base: Lead = { id: "a", name: "Clínica Árvore", address: "Campinas", category: "Saúde", phone: null, intlPhone: null, rating: null, reviews: null, mapsUrl: null };
const high: Lead = { ...base, id: "b", name: "Academia", phone: "11999999999", rating: 4.5, reviews: 30 };
describe("local prospect filters", () => {
  it("shows only businesses with an available phone", () => { expect(filterProspects([base, high], [], "reachable", "priority").map((lead) => lead.id)).toEqual(["b"]); });
  it("uses observable priority rather than guessed sales", () => { expect(filterProspects([base, high, { ...base, id: "c", phone: "123", rating: 3 }], [], "priority", "priority").map((lead) => lead.id)).toEqual(["b"]); });
  it("excludes explicitly contacted clients from new results", () => { const clients = trackClient([], high, "contacted"); expect(filterProspects([base, high], clients, "new", "priority").map((lead) => lead.id)).toEqual(["a"]); });
  it("searches names ignoring accents", () => { expect(filterProspects([base, high], [], "all", "priority", "arvore").map((lead) => lead.id)).toEqual(["a"]); });
  it("orders by actual review totals and deduplicates", () => { expect(filterProspects([base, high, high], [], "all", "reviews").map((lead) => lead.id)).toEqual(["b", "a"]); });
});