import { z } from "zod";
import type { Lead } from "./leads";
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
export function demoSector(category: string) {
  const c = category.toLocaleLowerCase("pt-BR");
  if (/dent|clín|clinic|saúde|fisi|médic/.test(c)) return "health";
  if (/barb|beleza|salão|salao|estét/.test(c)) return "beauty";
  if (/restaur|padar|caf[eé]|lanch|pizz/.test(c)) return "food";
  return "services";
}
export function draftForClient(lead: Lead): Demonstration {
  const category = lead.category || "Serviços locais";
  const sector = demoSector(category);
  return { name: lead.name, category, address: lead.address, phone: lead.intlPhone || lead.phone || "",
    headline: sector === "health" ? "Um novo olhar para o seu cuidado." : sector === "beauty" ? "Seu estilo merece esse cuidado." : sector === "food" ? "Uma boa experiência começa à mesa." : "Seu próximo atendimento começa aqui.",
    description: `Conheça ${lead.name}. Informações sobre ${category.toLocaleLowerCase("pt-BR")}, localização e contato em um só lugar. Fale com a equipe para saber mais.` };
}
export function demoPhoneLink(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits.startsWith("55") ? digits : `55${digits}`}` : null;
}