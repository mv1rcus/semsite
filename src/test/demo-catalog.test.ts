import { describe, it, expect } from "vitest";
import { demoCatalog } from "@/lib/demo-catalog";
describe("demoCatalog", () => {
  it("lava jato não usa catálogo de oficina", () => {
    expect(demoCatalog("Lava jato", "auto").items[0]?.title).toBe("Lavagem completa");
  });
  it("oficina mantém catálogo de oficina", () => {
    expect(demoCatalog("Oficina mecânica", "auto").items[0]?.title).toBe("Revisão");
  });
});
