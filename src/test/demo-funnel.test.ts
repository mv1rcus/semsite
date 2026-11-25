import { describe, expect, it } from "vitest";
import { entryFor, funnelMetrics, parseFunnel, removeFromFunnel, setNotes, setStage } from "@/lib/demo-funnel";

const t = (n: number) => `2026-11-25T1${n}:00:00.000Z`;
describe("funil de vendas", () => {
  it("lead novo começa em Prévia pronta", () => {
    expect(entryFor({}, "a", t(0)).stage).toBe("preview");
  });
  it("registra a troca de etapa e guarda o histórico", () => {
    let m = setStage({}, "a", "contacted", t(1));
    m = setStage(m, "a", "replied", t(2));
    expect(m["a"]?.stage).toBe("replied");
    expect(m["a"]?.events.map((e) => e.stage)).toEqual(["preview", "contacted", "replied"]);
    expect(setStage(m, "a", "replied", t(3))).toBe(m);
  });
  it("salva notas sem mudar a etapa e limita o tamanho", () => {
    const m = setNotes(setStage({}, "a", "contacted", t(1)), "a", "x".repeat(900), t(2));
    expect(m["a"]?.stage).toBe("contacted");
    expect(m["a"]?.notes).toHaveLength(600);
  });
  it("lê dados inválidos como funil vazio", () => {
    expect(parseFunnel("lixo")).toEqual({});
    expect(parseFunnel(null)).toEqual({});
    const m = setStage({}, "a", "closed", t(1));
    expect(parseFunnel(JSON.stringify(m))).toEqual(m);
  });
  it("calcula métricas pelo que o lead já alcançou", () => {
    let m = setStage({}, "a", "closed", t(1));
    m = setStage(m, "b", "replied", t(1));
    m = setStage(m, "c", "discarded", t(1));
    const metrics = funnelMetrics(["a", "b", "c", "d"], m, { b: { id: "b", createdAt: t(0), lastOpenedAt: t(2) } });
    expect(metrics).toMatchObject({ total: 4, opened: 1, contacted: 2, replied: 2, closed: 1, closeRate: 50 });
    expect(metrics.byStage).toMatchObject({ closed: 1, replied: 1, discarded: 1, preview: 1 });
    expect(funnelMetrics([], {}).closeRate).toBeNull();
  });
  it("remove leads apagados", () => {
    expect(Object.keys(removeFromFunnel(setStage(setStage({}, "a", "closed"), "b", "closed"), ["a"]))).toEqual(["b"]);
  });
});
