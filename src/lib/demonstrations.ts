import { z } from "zod";
import type { Lead } from "./leads";
import { SECTOR_HEADLINE, type Sector } from "./demo-catalog";
export const demoSchema = z.object({
  name: z.string().trim().min(2).max(160), category: z.string().trim().min(2).max(120),
  address: z.string().trim().max(400), phone: z.string().trim().max(40),
  headline: z.string().trim().min(2).max(200), description: z.string().trim().min(2).max(1000),
});
export type Demonstration = z.infer<typeof demoSchema>;
export function demonstrationSlug(name: string) {
  return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 70).replace(/-$/g, "") || "meu-negocio";
}
export function demonstrationCode(id: string) {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) throw new Error("Identificador inválido.");
  const bytes = id.replace(/-/g, "").match(/.{2}/g) ?? [];
  return btoa(bytes.map(byte => String.fromCharCode(parseInt(byte, 16))).join("")).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
export function demonstrationId(code: string): string | null {
  if (!/^[A-Za-z0-9_-]{22}$/.test(code)) return null;
  try {
    const bytes = atob(code.replace(/-/g, "+").replace(/_/g, "/") + "==");
    const hex = Array.from(bytes, byte => byte.charCodeAt(0).toString(16).padStart(2, "0")).join("");
    const id = `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
    return demonstrationCode(id) === code ? id : null;
  } catch { return null; }
}
export function demonstrationLink(id: string, origin: string, name?: string) {
  const url = new URL(origin);
  const local = url.hostname === "localhost" || url.hostname === "127.0.0.1";
  const path = name ? `/site/${demonstrationSlug(name)}/${demonstrationCode(id)}` : `/demo/${encodeURIComponent(id)}`;
  return `${local ? url.origin : "https://cacacliente.lovable.app"}${path}`;
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