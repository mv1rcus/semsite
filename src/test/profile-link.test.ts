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
