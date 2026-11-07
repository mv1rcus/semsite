import { z } from "zod";

// Google pagination tokens are opaque: preserve the whole string verbatim.
export const searchInputSchema = z.object({
  category: z.string().trim().min(2).max(80),
  city: z.string().trim().min(2).max(80),
  pageToken: z.string().optional(),
});

export type Lead = {
  id: string; name: string; address: string;
  phone: string | null; intlPhone: string | null;
  rating: number | null; reviews: number | null;
  category: string | null; mapsUrl: string | null;
};

// Brazilian mobiles have 9 digits starting with 9 after the DDD; landlines rarely use WhatsApp.
export function isMobilePhone(lead: Pick<Lead, "phone" | "intlPhone">) {
  let digits = (lead.intlPhone || lead.phone || "").replace(/\D/g, "");
  if (digits.startsWith("55") && digits.length >= 12) digits = digits.slice(2);
  if (digits.startsWith("0")) digits = digits.slice(1);
  return digits.length === 11 && digits[2] === "9";
}

export function phoneCallLink(lead: Pick<Lead, "phone" | "intlPhone">) {
  const digits = (lead.intlPhone || lead.phone || "").replace(/\D/g, "");
  if (!digits) return null;
  return `tel:+${digits.startsWith("55") ? digits : `55${digits}`}`;
}

// An outreach priority, not a prediction or probability of closing a sale.
export function prospectPriority(lead: Lead) {
  const reasons: string[] = [];
  let score = 0;
  if (isMobilePhone(lead)) { score += 40; reasons.push("Celular (WhatsApp)"); }
  else if (lead.intlPhone || lead.phone) { score += 15; reasons.push("Telefone fixo"); }
  if (lead.rating !== null && lead.rating >= 4) { score += 25; reasons.push("Boa reputação"); }
  if (lead.reviews !== null && lead.reviews >= 20) { score += 20; reasons.push("20+ avaliações"); }
  return { score, reasons };
}

export function rankProspects(leads: Lead[]) {
  return [...new Map(leads.map((lead) => [lead.id, lead])).values()]
    .sort((a, b) => prospectPriority(b).score - prospectPriority(a).score || (b.reviews ?? 0) - (a.reviews ?? 0));
}