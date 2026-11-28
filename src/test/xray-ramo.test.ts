import { describe, it, expect } from "vitest";
import { buildScript } from "@/lib/xray";
import type { Lead } from "@/lib/leads";
const lead = (name: string, category: string | null) => ({ id: "1", name, address: "x", phone: "1", intlPhone: "1", rating: null, reviews: null, category, mapsUrl: null, email: null, instagram: null, facebook: null, source: "overture" }) as unknown as Lead;
const pain = (n: string, c: string | null) => buildScript(lead(n, c), "Bento Gonçalves").pain;
describe("roteiro usa o ramo certo", () => {
  it("Oficina do Lanche é comida", () => expect(pain("Oficina do Lanche", "Hamburgueria")).toMatch(/onde comer/));
  it("Barbearia não vira bar", () => expect(pain("Barbearia do Zé", "Barbearia")).not.toMatch(/onde comer/));
  it("Carlos Advocacia não vira carro", () => expect(pain("Carlos Silva Advocacia", "Advocacia")).toMatch(/contrato/));
  it("Clínica de estética é beleza", () => expect(pain("Studio Bela", "Clínica de estética")).toMatch(/direct/));
  it("Oficina de verdade segue oficina", () => expect(pain("Oficina do Zé", "Oficina mecânica")).toMatch(/pressa/));
});
