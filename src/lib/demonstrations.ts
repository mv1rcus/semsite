import { z } from "zod";
import type { Lead } from "./leads";
import { SECTOR_HEADLINE, type Sector } from "./demo-catalog";
export const demoSchema = z.object({
  name: z.string().trim().min(2).max(160), category: z.string().trim().min(2).max(120),
  address: z.string().trim().max(400), phone: z.string().trim().max(40),
  headline: z.string().trim().min(2).max(200), description: z.string().trim().min(2).max(1000),
});
export type Demonstration = z.infer<typeof demoSchema>;
export function demonstrationLink(id: string, origin: string) {
  const url = new URL(origin);
  const local = url.hostname === "localhost" || url.hostname === "127.0.0.1";
  return `${local ? url.origin : "https://cacacliente.lovable.app"}/demo/${encodeURIComponent(id)}`;
}
export function demoSector(category: string): Sector {
  const c = category.toLocaleLowerCase("pt-BR");
  if (/academ|gym|crossfit|pilates|muscula|fitness/.test(c)) return "gym";
  if (/advoga|jurídic|juridic|direito/.test(c)) return "law";
  if (/pet|veterin|banho e tosa/.test(c)) return "pet";
  if (/oficina|mecân|mecan|auto|funilar|pneu|lava/.test(c)) return "auto";
  if (/dent|clín|clinic|saúde|fisi|médic|odonto|psic/.test(c)) return "health";
  if (/barb|beleza|salão|salao|estét|manicure|cabele/.test(c)) return "beauty";
  if (/restaur|padar|caf[eé]|lanch|pizz|hamb|açaí|acai|doce|confeit|comida|bar\b/.test(c)) return "food";
  return "services";
}
export function draftForClient(lead: Lead): Demonstration {
  const category = lead.category || "Serviços locais";
  const sector = demoSector(category);
  return { name: lead.name, category, address: lead.address, phone: lead.intlPhone || lead.phone || "",
    headline: SECTOR_HEADLINE[sector],
    description: `Conheça ${lead.name}. Informações sobre ${category.toLocaleLowerCase("pt-BR")}, localização e contato em um só lugar. Fale com a equipe para saber mais.` };
}
export function demoPhoneLink(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits.startsWith("55") ? digits : `55${digits}`}` : null;
}