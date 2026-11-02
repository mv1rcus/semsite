import { describe, expect, it } from "vitest";
import { normalizeProfileLink, profileLinkLabel } from "@/lib/profile-link";

describe("link do perfil", () => {
  it("aceita endereço digitado sem protocolo", () => {
    expect(normalizeProfileLink("seusite.com.br")).toBe("https://seusite.com.br/");
  });

  it("mantém endereço já completo", () => {
    expect(normalizeProfileLink("https://loja.com.br/promo")).toBe("https://loja.com.br/promo");
  });

  it("recusa texto que não é endereço", () => {
    expect(normalizeProfileLink("oi tudo bem")).toBe("");
    expect(normalizeProfileLink("seusite")).toBe("");
    expect(normalizeProfileLink("javascript:alert(1)")).toBe("");
  });

  it("mostra o endereço curto no perfil", () => {
    expect(profileLinkLabel("https://www.seusite.com.br/")).toBe("seusite.com.br");
    expect(profileLinkLabel("https://loja.com.br/promo")).toBe("loja.com.br/promo");
  });
});

import { normalizeProfileLinks, splitProfileLinks } from "@/lib/profile-link";
describe("vários links", () => {
  it("aceita um por linha e limita a 5", () => {
    expect(normalizeProfileLinks("a.com\nb.com")).toEqual(["https://a.com/", "https://b.com/"]);
    expect(normalizeProfileLinks("a.com\nb.com\nc.com\nd.com\ne.com\nf.com")).toHaveLength(5);
  });
  it("recusa linha inválida", () => { expect(normalizeProfileLinks("a.com\noi tudo")).toBeNull(); });
  it("separa o salvo", () => { expect(splitProfileLinks("https://a.com/\nhttps://b.com/")).toHaveLength(2); });
});
