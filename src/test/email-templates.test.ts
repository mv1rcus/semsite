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
