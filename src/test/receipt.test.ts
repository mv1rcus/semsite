import { describe, expect, it } from "vitest";
import { paymentSplit, receiptClientName, receiptCompanyLine, receiptPrefill } from "@/lib/receipt-pdf";

describe("paymentSplit", () => {
  it("à vista cobra 100% agora", () => expect(paymentSplit(700, "vista")).toEqual({ now: 700, later: 0 }));
  it("50/50 divide entrada e entrega", () => expect(paymentSplit(800, "metade")).toEqual({ now: 400, later: 400 }));
});

describe("receiptPrefill", () => {
  const base = { client: "", doc: "", phone: "", business: "", total: 0, mode: "vista" as const, pix: "", seller: "" };
  it("leva o nome do cliente para a empresa e o telefone para o recibo", () => {
    expect(receiptPrefill({ name: "Padaria do João", phone: "(34) 99772-0121", address: "Uberlândia" })).toEqual({ ...base, business: "Padaria do João", phone: "(34) 99772-0121" });
  });
  it("deixa telefone vazio quando o cliente não tem telefone", () => {
    expect(receiptPrefill({ name: "Bar do Zé", phone: null, address: "" }).phone).toBe("");
  });
});

describe("receiptClientName", () => {
  const base = { client: "", doc: "", phone: "", business: "", total: 0, mode: "vista" as const, pix: "", seller: "" };
  it("usa o nome digitado quando existe", () => expect(receiptClientName({ ...base, client: "João", business: "Padaria" })).toBe("João"));
  it("cai para o nome da empresa quando o nome fica em branco", () => expect(receiptClientName({ ...base, business: "Padaria do João" })).toBe("Padaria do João"));
  it("fica vazio quando nada foi preenchido", () => expect(receiptClientName(base)).toBe(""));
});

describe("receiptCompanyLine", () => {
  const base = { client: "", doc: "", phone: "", business: "", total: 0, mode: "vista" as const, pix: "", seller: "" };
  it("some a linha Empresa quando é o mesmo nome do cliente", () => expect(receiptCompanyLine({ ...base, business: "ESPAÇO LAÍS PEZZATO" })).toBe(""));
  it("aparece quando empresa e pessoa são diferentes", () => expect(receiptCompanyLine({ ...base, client: "João", business: "Padaria do João" })).toBe("Padaria do João"));
});
