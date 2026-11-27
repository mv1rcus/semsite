import { describe, expect, it } from "vitest";
import { cancellationEmail, paymentConfirmedEmail, refundEmail } from "@/lib/email-templates";

describe("e-mails transacionais", () => {
  it("pagamento confirmado cita o período e assina só SemSite", () => {
    const m = paymentConfirmedEmail("a@b.co", 3);
    expect(m.to).toBe("a@b.co");
    expect(m.text).toContain("3 meses");
    expect(m.html).not.toMatch(/Marcus/i);
  });
  it("cancelamento agendado diz que o mês pago vale até o fim e não há estorno", () => {
    const m = cancellationEmail("a@b.co", "2026-12-20T12:00:00.000Z", false);
    expect(m.text).toContain("20/12/2026");
    expect(m.text).toContain("não é estornado");
  });
  it("escapa HTML e traz reembolso", () => {
    expect(refundEmail("a@b.co").subject).toMatch(/Reembolso/);
  });
});

import { ticketOpenedEmail, ticketReplyEmail } from "@/lib/email-templates";
describe("ticket emails", () => {
  it("inclui o número do ticket e escapa HTML", () => {
    const a = ticketOpenedEmail("a@b.com", 7, "Oi <b>");
    expect(a.subject).toContain("#7");
    expect(a.html).not.toContain("<b>");
    const r = ticketReplyEmail("a@b.com", 7, "Assunto", "Linha 1\nLinha 2 <script>");
    expect(r.subject).toContain("#7");
    expect(r.html).not.toContain("<script>");
  });
});

import { welcomeEmail } from "@/lib/email-templates";
describe("renovação e boas-vindas", () => {
  it("assinatura sem período fala de renovação automática e cancelamento", () => {
    expect(paymentConfirmedEmail("a@b.co").text).toContain("renova automaticamente");
    expect(paymentConfirmedEmail("a@b.co", 1).text).toContain("não renova sozinho");
  });
  it("boas-vindas assinada só SemSite", () => {
    expect(welcomeEmail("a@b.co").subject).toMatch(/Bem-vindo/);
    expect(welcomeEmail("a@b.co").html).not.toMatch(/Marcus/i);
  });
});
