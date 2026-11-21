import { z } from "zod";
import type { Lead } from "./leads";
import { detectNiche } from "./business-niche";
import { SECTOR_HEADLINE, type Sector } from "./demo-catalog";
export const demoSchema = z.object({
  name: z.string().trim().min(2).max(160), category: z.string().trim().min(2).max(120),
  address: z.string().trim().max(400), phone: z.string().trim().max(40),
  headline: z.string().trim().min(2).max(200), description: z.string().trim().min(2).max(1000),
  placeId: z.string().regex(/^[A-Za-z0-9_-]{5,300}$/).optional(),
});
export type GoogleReview = { author: string; rating: number; text: string; when: string };
export type DemoGoogle = { google_rating?: number | null; google_rating_count?: number | null; google_reviews?: unknown };
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
export const DEMO_SLUG_RE = /^[a-z0-9]{1,40}demo\d*$/;
export function demonstrationLink(id: string, origin: string, name?: string, slug?: string | null) {
  const url = new URL(origin);
  const local = url.hostname === "localhost" || url.hostname === "127.0.0.1";
  const path = slug && DEMO_SLUG_RE.test(slug) ? `/${slug}` : name ? `/site/${demonstrationSlug(name)}/${demonstrationCode(id)}` : `/demo/${encodeURIComponent(id)}`;
  return `${local ? url.origin : "https://semsite.lovable.app"}${path}`;
}
export function demoSector(category: string): Sector {
  const c = category.toLocaleLowerCase("pt-BR");
  if (/academ|gym|crossfit|pilates|muscula|fitness/.test(c)) return "gym";
  if (/copiador|gr[aá]fic/.test(c)) return "services";
  if (/advoga|jurídic|juridic|direito/.test(c)) return "law";
  if (/pet|veterin|banho e tosa/.test(c)) return "pet";
  if (/oficina|mecân|mecan|auto|funilar|pneu|lava/.test(c)) return "auto";
  if (/dent|clín|clinic|saúde|fisi|médic|odonto|psic/.test(c)) return "health";
  if (/barb|beleza|salão|salao|estét|manicure|cabele/.test(c)) return "beauty";
  if (/restaur|padar|caf[eé]|lanch|pizz|hamb|açaí|acai|doce|confeit|comida|bar\b/.test(c)) return "food";
  return "services";
}

/** Frase de benefício por setor para o subtítulo da demo (substitui o texto genérico antigo). */
export const SECTOR_TAGLINE: Record<Sector, (name: string) => string> = {
  food: (n) => `${n}: cardápio completo com preços, pedido pelo WhatsApp e entrega quentinha ou retirada no balcão.`,
  health: (n) => `${n}: agende sua avaliação pelo WhatsApp. Tratamentos, horários e resposta rápida em um só lugar.`,
  beauty: (n) => `${n}: reserve seu horário pelo WhatsApp. Procedimentos, preços e disponibilidade em um só lugar.`,
  gym: (n) => `${n}: planos, modalidades e aulas com acompanhamento. Comece pelo WhatsApp.`,
  law: (n) => `${n}: orientação clara e atendimento pelo WhatsApp. Primeira conversa sem compromisso.`,
  pet: (n) => `${n}: banho, tosa e cuidados com agendamento fácil pelo WhatsApp.`,
  auto: (n) => `${n}: diagnóstico honesto e preço combinado antes do serviço. Agende pelo WhatsApp.`,
  services: (n) => `${n}: orçamento grátis e resposta no mesmo dia. Serviços e preços em um só lugar.`,
};

/** Reconhece o subtítulo genérico gerado antes desta melhoria (demos antigas salvas com ele). */
export const GENERIC_DESCRIPTION_RE = /^Conheça .{2,160}?\. Informações sobre .+ em um só lugar\./;

/** Descrição exibida na demo: usa a salva quando é específica; senão gera a frase de benefício do setor. */
export function demoDescription(name: string, sector: Sector, stored?: string | null): string {
  const s = (stored ?? "").trim();
  return s && !GENERIC_DESCRIPTION_RE.test(s) ? s : SECTOR_TAGLINE[sector](name);
}

export function draftForClient(lead: Lead, query?: string): Demonstration {
  const category = detectNiche(lead.name, lead.category, query);
  const sector = demoSector(category);
  return { name: lead.name, category, address: lead.address, phone: lead.intlPhone || lead.phone || "",
    headline: SECTOR_HEADLINE[sector], ...(/^[A-Za-z0-9_-]{5,300}$/.test(lead.id) ? { placeId: lead.id } : {}),
    description: SECTOR_TAGLINE[sector](lead.name) };
}
export function demoPhoneLink(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits.startsWith("55") ? digits : `55${digits}`}` : null;
}
