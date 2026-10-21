import { describe, expect, it } from "vitest";
import { fillTemplate, MESSAGE_SUGGESTIONS } from "@/lib/message";

describe("welcome message", () => {
  it("fills the user's own name and the business", () => {
    expect(fillTemplate("Me chamo {seu_nome}. Oi {empresa}!", "Pizzaria X", "Ana")).toBe("Me chamo Ana. Oi Pizzaria X!");
  });
  it("drops the introduction when no name is set", () => {
    expect(fillTemplate("Olá! Me chamo {seu_nome}. Vi o {empresa}.", "Bar Y", "")).toBe("Olá! Vi o Bar Y.");
  });
  it("suggestions never mention price and promise one-week delivery", () => {
    for (const s of MESSAGE_SUGGESTIONS) { expect(s.template).not.toMatch(/R\$|preço|valor/i); expect(s.template).toMatch(/uma semana/); }
  });
});
