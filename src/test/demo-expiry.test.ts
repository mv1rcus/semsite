import { describe, expect, it } from "vitest";
import { expiryDate, expiryInfo, isExpired, isNewOpenSession, openCountLabel, urgencyMessage, OPEN_SESSION_MS } from "@/lib/demo-expiry";

const now = Date.parse("2026-11-25T12:00:00.000Z");
describe("validade da prévia", () => {
  it("calcula a data de validade em dias", () => {
    expect(expiryDate(30, now)).toBe("2026-12-25T12:00:00.000Z");
    expect(expiryDate(0, now)).toBe("2026-11-26T12:00:00.000Z");
  });
  it("sem validade nunca expira", () => {
    expect(isExpired(null, now)).toBe(false);
    expect(expiryInfo(undefined, now).state).toBe("none");
  });
  it("marca como expirada depois do prazo", () => {
    expect(isExpired("2026-11-25T12:00:00.000Z", now)).toBe(true);
    expect(isExpired("2026-11-25T12:00:01.000Z", now)).toBe(false);
    expect(expiryInfo("2026-11-20T00:00:00.000Z", now)).toMatchObject({ state: "expired", label: "Expirada" });
  });
  it("avisa quando faltam poucos dias", () => {
    expect(expiryInfo("2026-11-26T08:00:00.000Z", now)).toMatchObject({ state: "soon", daysLeft: 1, label: "Expira em 1 dia" });
    expect(expiryInfo("2026-12-25T12:00:00.000Z", now)).toMatchObject({ state: "active", daysLeft: 30 });
  });
  it("monta o texto de urgência", () => {
    expect(urgencyMessage("Barbearia X", "https://l/x", "2026-12-05T12:00:00.000Z", now)).toContain("só até");
    expect(urgencyMessage("Barbearia X", "https://l/x", "2026-12-05T12:00:00.000Z", now)).toContain("em 10 dias");
    expect(urgencyMessage("Barbearia X", "https://l/x", "2026-11-01T00:00:00.000Z", now)).toContain("saiu do ar");
  });
});
describe("contador de aberturas", () => {
  it("recarregar logo em seguida não conta de novo", () => {
    expect(isNewOpenSession(null, now)).toBe(true);
    expect(isNewOpenSession(new Date(now - 60_000).toISOString(), now)).toBe(false);
    expect(isNewOpenSession(new Date(now - OPEN_SESSION_MS).toISOString(), now)).toBe(true);
  });
  it("escreve a contagem em português", () => {
    expect(openCountLabel(0)).toBe("Ninguém abriu ainda");
    expect(openCountLabel(1)).toBe("O cliente abriu 1 vez");
    expect(openCountLabel(3)).toBe("O cliente abriu 3 vezes");
  });
});
