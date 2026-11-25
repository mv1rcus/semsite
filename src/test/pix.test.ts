import { describe, expect, it } from "vitest";
import { buildPixPayload, crc16, normalizePixKey, parseAmount, pixText } from "@/lib/pix";

function tlv(payload: string) {
  const out: Record<string, string> = {};
  for (let i = 0; i < payload.length;) { const id = payload.slice(i, i + 2); const len = Number(payload.slice(i + 2, i + 4)); out[id] = payload.slice(i + 4, i + 4 + len); i += 4 + len; }
  return out;
}
describe("Pix estático", () => {
  it("CRC16 confere com o vetor padrão", () => { expect(crc16("123456789")).toBe("29B1"); });
  it("valida chaves por tipo", () => {
    expect(normalizePixKey("cpf", "529.982.247-25")).toBe("52998224725");
    expect(normalizePixKey("cpf", "111.111.111-11")).toBeNull();
    expect(normalizePixKey("cnpj", "11.222.333/0001-81")).toBe("11222333000181");
    expect(normalizePixKey("phone", "(32) 98800-9914")).toBe("+5532988009914");
    expect(normalizePixKey("phone", "+55 32 98800-9914")).toBe("+5532988009914");
    expect(normalizePixKey("phone", "123")).toBeNull();
    expect(normalizePixKey("email", " Eu@Email.com ")).toBe("eu@email.com");
    expect(normalizePixKey("random", "123E4567-E89B-12D3-A456-426614174000")).toBe("123e4567-e89b-12d3-a456-426614174000");
    expect(normalizePixKey("random", "abc")).toBeNull();
  });
  it("limpa nome e cidade", () => {
    expect(pixText("João da Conceição & Cia", 25)).toBe("JOAO DA CONCEICAO CIA");
    expect(pixText("Juiz de Fora - MG", 15)).toBe("JUIZ DE FORA MG");
  });
  it("monta um BR Code válido com valor", () => {
    const r = buildPixPayload({ keyType: "email", key: "eu@email.com", name: "Maria Silva", city: "Juiz de Fora", amount: 350 });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const p = r.payload;
    expect(p.startsWith("000201010211")).toBe(true);
    expect(crc16(p.slice(0, -4))).toBe(p.slice(-4));
    const f = tlv(p);
    expect(f["53"]).toBe("986"); expect(f["54"]).toBe("350.00"); expect(f["58"]).toBe("BR");
    expect(f["59"]).toBe("MARIA SILVA"); expect(f["60"]).toBe("JUIZ DE FORA");
    expect(tlv(f["26"] ?? "")).toMatchObject({ "00": "br.gov.bcb.pix", "01": "eu@email.com" });
  });
  it("sem valor omite o campo 54", () => {
    const r = buildPixPayload({ keyType: "phone", key: "32988009914", name: "Eu", city: "JF" });
    expect(r.ok && tlv(r.payload)["54"]).toBeFalsy();
  });
  it("rejeita entradas ruins", () => {
    expect(buildPixPayload({ keyType: "cpf", key: "1", name: "A", city: "B" }).ok).toBe(false);
    expect(buildPixPayload({ keyType: "email", key: "a@b.co", name: "", city: "B" }).ok).toBe(false);
    expect(buildPixPayload({ keyType: "email", key: "a@b.co", name: "A", city: "B", amount: -5 }).ok).toBe(false);
  });
  it("lê valores em reais", () => {
    expect(parseAmount("")).toBeNull();
    expect(parseAmount("1.250,50")).toBe(1250.5);
    expect(parseAmount("abc")).toBe("invalid");
  });
});
