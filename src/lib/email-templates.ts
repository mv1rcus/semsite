// Textos dos e-mails transacionais do SemSite (PT-BR, assinados só "SemSite").
import type { MailMessage } from "@/lib/email.server";

const SITE = "https://semsite.lovable.app";
const CONTACT = "semsiteapp@gmail.com";
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const fmtDate = (iso?: string | null) => {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "America/Sao_Paulo" });
};

function layout(title: string, paragraphs: string[], cta?: { label: string; href: string }) {
  const body = paragraphs.map((p) => `<p style="margin:0 0 14px;font-size:15px;line-height:1.55;color:#e8e8ee">${esc(p)}</p>`).join("");
  const button = cta
    ? `<p style="margin:22px 0"><a href="${cta.href}" style="background:#e5134b;color:#fff;text-decoration:none;padding:12px 20px;border-radius:10px;font-weight:600;font-size:15px;display:inline-block">${esc(cta.label)}</a></p>`
    : "";
  return `<!doctype html><html lang="pt-BR"><body style="margin:0;background:#0d0d12;padding:24px 12px;font-family:Arial,Helvetica,sans-serif">
<div style="max-width:520px;margin:0 auto;background:#16161d;border-radius:14px;padding:28px">
<img src="${SITE}/favicon.png" width="40" height="40" alt="SemSite" style="display:block;margin-bottom:18px;border-radius:8px">
<h1 style="margin:0 0 16px;font-size:20px;color:#fff">${esc(title)}</h1>${body}${button}
<p style="margin:22px 0 0;font-size:13px;color:#9a9aa8">SemSite · dúvidas? Responda este e-mail ou escreva para ${CONTACT}</p>
</div></body></html>`;
}

function plain(title: string, paragraphs: string[], cta?: { label: string; href: string }) {
  return [title, "", ...paragraphs, ...(cta ? ["", `${cta.label}: ${cta.href}`] : []), "", `SemSite · ${CONTACT}`].join("\n");
}

function build(to: string, subject: string, title: string, paragraphs: string[], cta?: { label: string; href: string }): MailMessage {
  return { to, subject, html: layout(title, paragraphs, cta), text: plain(title, paragraphs, cta) };
}

export function paymentConfirmedEmail(to: string, months?: number | null, untilIso?: string | null): MailMessage {
  const until = fmtDate(untilIso);
  const periodo = months && months > 0 ? `${months} ${months === 1 ? "mês" : "meses"}` : null;
  return build(
    to,
    "Pagamento confirmado: obrigado por assinar o SemSite",
    "Obrigado pelo pagamento!",
    [
      "Recebemos seu pagamento e o selo Verificado já está ativo na sua conta.",
      ...(periodo ? [`Período contratado: ${periodo}${until ? `, válido até ${until}` : ""}.`] : until ? [`Válido até ${until}.`] : []),
      "O pagamento é único por período e não renova sozinho: você só paga de novo se quiser mais um período.",
    ],
    { label: "Ver meu selo Verificado", href: `${SITE}/verificado` },
  );
}

export function cancellationEmail(to: string, endsIso?: string | null, endedNow = false): MailMessage {
  const ends = fmtDate(endsIso);
  return build(
    to,
    "Cancelamento confirmado no SemSite",
    "Cancelamento confirmado",
    endedNow
      ? ["Sua assinatura do SemSite foi encerrada e não haverá novas cobranças.", "Você pode voltar quando quiser."]
      : [
          "Recebemos seu cancelamento e não haverá novas cobranças.",
          ends ? `Você continua com o selo Verificado até ${ends}, que é o fim do período já pago.` : "Você continua com o selo Verificado até o fim do período já pago.",
          "O mês já pago não é estornado.",
        ],
    { label: "Voltar ao SemSite", href: SITE },
  );
}

export function refundEmail(to: string): MailMessage {
  return build(
    to,
    "Reembolso confirmado no SemSite",
    "Reembolso confirmado",
    [
      "Seu reembolso foi processado e o selo Verificado dessa compra foi removido.",
      "O valor volta para a forma de pagamento usada na compra. Dependendo do banco ou do cartão, pode levar alguns dias úteis para aparecer.",
    ],
    { label: "Voltar ao SemSite", href: SITE },
  );
}

export function ticketOpenedEmail(to: string, number: number, subject: string): MailMessage {
  return build(
    to,
    `Recebemos seu ticket #${number}`,
    `Ticket #${number} recebido`,
    [
      `Recebemos sua mensagem sobre "${subject}". Seu número de atendimento é #${number}.`,
      "Vamos responder por e-mail assim que possível. Guarde este número se precisar falar de novo sobre o mesmo assunto.",
    ],
  );
}

export function ticketReplyEmail(to: string, number: number, subject: string, reply: string): MailMessage {
  const paragraphs = reply.split(/\n+/).map((p) => p.trim()).filter(Boolean);
  return build(
    to,
    `Resposta ao seu ticket #${number}`,
    `Resposta ao ticket #${number}`,
    [`Sobre: ${subject}`, ...paragraphs, "Se precisar de mais alguma coisa, abra um novo ticket em " + SITE + "/suporte citando o número #" + number + "."],
  );
}
