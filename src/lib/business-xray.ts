import { isMobilePhone, type Lead } from "./leads";
import { detectNiche } from "./business-niche";
import { HEAT_LABEL, leadHeat, leadHeatScore, type LeadHeat } from "./lead-priority";

export type XrayItem = { label: string; value: string; ok: boolean | null; href?: string };
export type BusinessXray = {
  heat: LeadHeat; heatLabel: string; reasons: string[];
  presence: XrayItem[]; reputation: { text: string; tone: "forte" | "media" | "fraca" | "sem-dados" };
  niche: string; channel: string; opportunity: string;
};

function profileUrl(raw: string, base: string): string {
  const v = raw.trim();
  if (/^https?:\/\//i.test(v)) return v;
  if (/^(www\.)?(instagram|facebook)\.com/i.test(v)) return `https://${v.replace(/^www\./i, "")}`;
  return `${base}${v.replace(/^@/, "").replace(/^\/+/, "")}`;
}

function whatsappUrl(lead: Lead): string | undefined {
  const digits = (lead.intlPhone || lead.phone || "").replace(/\D/g, "");
  if (!digits) return undefined;
  return `https://wa.me/${digits.startsWith("55") ? digits : `55${digits}`}`;
}

/** Raio-X do negócio: leitura rápida do lead só com os dados que a busca já trouxe. Sem custo e sem consulta externa. */
export function buildBusinessXray(lead: Lead, city: string): BusinessXray {
  const mobile = isMobilePhone(lead);
  const hasPhone = !!(lead.phone || lead.intlPhone);
  const presence: XrayItem[] = [
    { label: "Site próprio", value: "Não encontrado", ok: false },
    { label: "WhatsApp", value: mobile ? "Abrir conversa" : hasPhone ? "Só telefone fixo" : "Sem telefone", ok: mobile, ...(mobile && whatsappUrl(lead) ? { href: whatsappUrl(lead)! } : {}) },
    { label: "E-mail", value: lead.email ? lead.email : "Não encontrado", ok: !!lead.email, ...(lead.email ? { href: `mailto:${lead.email}` } : {}) },
    { label: "Instagram", value: lead.instagram ? `@${lead.instagram.replace(/^@/, "").replace(/^https?:\/\/(www\.)?instagram\.com\//i, "").replace(/\/$/, "")}` : "Não encontrado", ok: !!lead.instagram, ...(lead.instagram ? { href: profileUrl(lead.instagram, "https://instagram.com/") } : {}) },
    { label: "Facebook", value: lead.facebook ? "Abrir página" : "Não encontrado", ok: !!lead.facebook, ...(lead.facebook ? { href: profileUrl(lead.facebook, "https://facebook.com/") } : {}) },
    { label: "Google Maps", value: lead.mapsUrl ? "Abrir no Google Maps" : "Sem link", ok: !!lead.mapsUrl, ...(lead.mapsUrl ? { href: lead.mapsUrl } : {}) },
  ];
  const rating = lead.rating, reviews = lead.reviews ?? 0;
  let reputation: BusinessXray["reputation"];
  if (rating == null) reputation = { text: "Sem avaliações públicas. Dá pra falar que a pessoa ainda não é achada nem avaliada online.", tone: "sem-dados" };
  else if (rating >= 4.5 && reviews >= 20) reputation = { text: `Nota ${rating} com ${reviews} avaliações. Clientes gostam, só falta um site pra transformar isso em mais contato.`, tone: "forte" };
  else if (rating >= 4) reputation = { text: `Nota ${rating} com ${reviews} avaliações. Boa base, um site ajuda a mostrar isso melhor.`, tone: "media" };
  else reputation = { text: `Nota ${rating} com ${reviews} avaliações. Um site bem feito ajuda a contar a história do negócio.`, tone: "fraca" };
  const niche = detectNiche(lead.name, lead.category);
  const channel = mobile ? "WhatsApp: celular, é o caminho mais rápido." : hasPhone ? "Ligação: o número é fixo, ligue pra oferecer." : lead.instagram ? `Instagram: mande direct pra @${lead.instagram}.` : lead.email ? "E-mail: é o único contato direto." : "Sem contato direto. Vá pelo Google Maps.";
  const heat = leadHeat(lead);
  const { reasons } = leadHeatScore(lead);
  const opportunity = `${lead.name}${niche ? ` (${niche})` : ""} não tem site${city ? ` em ${city}` : ""}. Quem procura no Google não acha e acaba no concorrente.`;
  return { heat, heatLabel: HEAT_LABEL[heat], reasons, presence, reputation, niche, channel, opportunity };
}
