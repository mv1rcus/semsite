import { describe, it, expect } from "vitest";
import { autoLayout } from "@/lib/demo-layouts";
describe("modelo automático por ramo", () => {
  it("pizzaria usa Gastronomia", () => expect(autoLayout("Pizzaria")).toBe("gastro"));
  it("barbearia usa VIP", () => expect(autoLayout("Barbearia")).toBe("vip"));
  it("dentista usa Saúde", () => expect(autoLayout("Dentista")).toBe("health"));
});
