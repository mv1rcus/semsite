import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { assertVerified } from "@/lib/verified-guard.server";
import { buildModelPrompt } from "@/lib/premium-prompt.server";
import { getPremium, HIDDEN_PREMIUM } from "@/lib/premium-models";

// Fake do cliente Supabase: am_i_verified devolve o que a conta de cada estado receberia.
const fake = (res: { data: unknown; error: unknown }) => ({ rpc: async (n: string) => (n === "am_i_verified" ? res : { data: null, error: "x" }) }) as never;

describe("travamento por Verificado (servidor)", () => {
  it("visitante (sem sessao, rpc falha) e bloqueado", async () => {
    await expect(assertVerified(fake({ data: null, error: { message: "not authenticated" } }), "Prompt")).rejects.toThrow(/exclusivo/);
  });
  it("conta gratis sem selo e bloqueada", async () => {
    await expect(assertVerified(fake({ data: false, error: null }), "Prompt")).rejects.toThrow(/exclusivo/);
  });
  it("conta Verificado passa", async () => {
    await expect(assertVerified(fake({ data: true, error: null }), "Prompt")).resolves.toBeUndefined();
  });
});

describe("o texto do prompt nao vai pro navegador", () => {
  const files: string[] = [];
  const walk = (d: string) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : /\.(ts|tsx)$/.test(f) && files.push(p); });
  walk("src");
  it("so vitrine.functions importa o builder do prompt", () => {
    const users = files.filter((f) => !f.includes("/test/") && readFileSync(f, "utf8").includes("premium-prompt.server")).map((f) => f.replace(/\\/g, "/"));
    expect(users).toEqual(["src/lib/vitrine.functions.ts"]);
  });
  it("premium-models (cliente) nao contem o texto do prompt", () => {
    expect(readFileSync("src/lib/premium-models.ts", "utf8")).not.toMatch(/Crie um site de uma p/);
  });
  it("o builder gera o prompt no servidor", () => {
    const first = [...HIDDEN_PREMIUM][0]!; // modelos fora do ar ainda existem no codigo; usa um dado qualquer
    expect(first).toBeTruthy();
    const m = { id: "x", ramo: "hamburgueria", ramoLabel: "Hamburgueria", style: "s", name: "N", city: "C", cover: "", accent: "#000", tags: [] } as never;
    expect(buildModelPrompt(m, {})).toMatch(/Crie um site/);
    expect(getPremium("chapa-quente")).toBeUndefined();
  });
});
