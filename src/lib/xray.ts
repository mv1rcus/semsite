import { isMobilePhone, type Lead } from "./leads";

export type XrayItem = { tone: "bad" | "warn" | "good"; text: string };

// Diagnosis built only from observable Google data of this search; never invents numbers.
export function buildXray(lead: Lead, others: Lead[], city: string) {
  const items: XrayItem[] = [{ tone: "bad", text: "Sem site cadastrado no Google: quem pesquisa não encontra uma página própria." }];
  const reviews = lead.reviews ?? 0;
  const ahead = others.filter((o) => o.id !== lead.id && (o.reviews ?? 0) > reviews).length;
  if (ahead > 0) items.push({ tone: "warn", text: `${ahead} concorrente${ahead > 1 ? "s" : ""} desta busca ${ahead > 1 ? "têm" : "tem"} mais avaliações no Google.` });
  if (lead.rating !== null && lead.rating >= 4) items.push({ tone: "good", text: `Nota ${lead.rating} com ${reviews} avaliações: reputação boa que um site pode aproveitar.` });
  else if (reviews === 0) items.push({ tone: "warn", text: "Sem avaliações no Google: um site ajuda a passar confiança." });
  if (!isMobilePhone(lead)) items.push({ tone: "warn", text: "Sem celular no Google: falta um botão de WhatsApp para o cliente chamar." });
  const where = city ? ` aqui em ${city}` : "";
  const message = `Olá, ${lead.name}! Estava analisando as buscas no Google${where} e notei que vocês${lead.rating && lead.rating >= 4 ? " têm ótimas avaliações, mas" : ""} estão sem site cadastrado. Fiz um raio-x rápido mostrando onde podem estar perdendo clientes para concorrentes. Posso te enviar?`;
  return { items, message };
}
