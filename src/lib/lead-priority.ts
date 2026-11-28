import { isMobilePhone, type Lead } from "./leads";
import { detectNiche } from "./business-niche";

/** Temperatura do lead: quem vale abordar primeiro. Regras fixas, sem IA nem custo. */
export type LeadHeat = "quente" | "morno" | "frio";

export const HEAT_LABEL: Record<LeadHeat, string> = { quente: "Quente", morno: "Morno", frio: "Frio" };

/** Segmentos que costumam fechar site rápido: decisão simples e dono acessível pelo WhatsApp. */
const HIGH_CONVERSION_RE = /\b(?:barbear|barber|pizz|odonto|dentist|sal[aã]o|cabele|est[ée]tica|oficina|mec[aâ]nic)/i;

export function leadHeatScore(lead: Lead): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];
  if (isMobilePhone(lead)) { score += 3; reasons.push("Tem WhatsApp"); }
  const niche = detectNiche(lead.name, lead.category);
  if (HIGH_CONVERSION_RE.test(niche)) { score += 2; reasons.push("Segmento que fecha rápido"); }
  if (lead.instagram) { score += 1; reasons.push("Tem Instagram"); }
  if (lead.address.trim()) { score += 1; reasons.push("Endereço completo"); }
  return { score, reasons };
}

export function leadHeat(lead: Lead): LeadHeat {
  const { score } = leadHeatScore(lead);
  return score >= 5 ? "quente" : score >= 3 ? "morno" : "frio";
}

/** Ordena pela temperatura do lead; empate cai pra reputação (avaliações). */
export function rankByHeat(leads: Lead[]): Lead[] {
  return [...leads].sort((a, b) => leadHeatScore(b).score - leadHeatScore(a).score || (b.reviews ?? 0) - (a.reviews ?? 0) || a.name.localeCompare(b.name, "pt-BR"));
}

/** Motivo de abordagem em 1 linha, pronto pra adaptar na primeira mensagem. */
export function approachReason(lead: Lead, city?: string): string {
  const niche = detectNiche(lead.name, lead.category).toLocaleLowerCase("pt-BR");
  const where = city?.trim() ? ` em ${city.trim()}` : " na sua cidade";
  return `Vi que a ${lead.name} não tem site. Quem procura ${niche}${where} no Google não te acha — e acaba indo no concorrente.`;
}
