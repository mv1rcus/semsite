import { z } from "zod";
import { businessAnalysisInput, type BusinessAnalysisInput } from "./business-analysis";
import type { Lead } from "./leads";

// Histórico e preenchimento da aba Análise. Tudo fica no navegador (localStorage/sessionStorage):
// nada é enviado a servidor e não há custo.

export const ANALYSIS_HISTORY_KEY = "semsite-analises-v1";
export const ANALYSIS_PREFILL_KEY = "analysis-prefill";
export const ANALYSIS_HISTORY_LIMIT = 12;

const entrySchema = z.object({
  id: z.string(),
  savedAt: z.string(),
  form: businessAnalysisInput,
  phone: z.string().max(40).default(""),
  leadId: z.string().optional(),
});
export type AnalysisEntry = z.infer<typeof entrySchema>;

export function parseHistory(raw: string | null): AnalysisEntry[] {
  try {
    const parsed = z.array(entrySchema).safeParse(JSON.parse(raw ?? "[]"));
    return parsed.success ? parsed.data : [];
  } catch { return []; }
}

const slug = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Mesmo negócio (nome + cidade) vira uma única entrada; a mais recente vai para o topo. */
export function entryId(form: Pick<BusinessAnalysisInput, "name" | "city">, leadId?: string) {
  return leadId ?? `manual:${slug(form.name)}:${slug(form.city)}`;
}

export function saveEntry(list: AnalysisEntry[], form: BusinessAnalysisInput, phone: string, leadId?: string, now = new Date().toISOString()): AnalysisEntry[] {
  const id = entryId(form, leadId);
  const entry: AnalysisEntry = { id, savedAt: now, form, phone, ...(leadId ? { leadId } : {}) };
  return [entry, ...list.filter((item) => item.id !== id)].slice(0, ANALYSIS_HISTORY_LIMIT);
}

export function removeEntry(list: AnalysisEntry[], id: string) { return list.filter((item) => item.id !== id); }

// ---- Preenchimento vindo do resultado da busca ----
export type AnalysisPrefill = { form: Partial<BusinessAnalysisInput>; phone: string; leadId: string };

/** Todo lead da busca já vem sem site registrado e com telefone. "Sem site" aqui significa "não consta na base aberta". */
export function prefillFromLead(lead: Lead, city: string): AnalysisPrefill {
  const social = [lead.instagram ? `Instagram @${lead.instagram}` : "", lead.facebook ? "Facebook" : ""].filter(Boolean).join("; ");
  return {
    leadId: lead.id,
    phone: lead.intlPhone || lead.phone || "",
    form: { name: lead.name, segment: lead.category ?? "", city: city.trim(), website: "none", social },
  };
}

const prefillSchema = z.object({
  leadId: z.string(), phone: z.string(),
  form: z.object({ name: z.string(), segment: z.string(), city: z.string(), website: z.enum(["none", "existing", "unknown"]), social: z.string() }).partial(),
});
export function parsePrefill(raw: string | null): AnalysisPrefill | null {
  try { const parsed = prefillSchema.safeParse(JSON.parse(raw ?? "null")); return parsed.success ? (parsed.data as AnalysisPrefill) : null; }
  catch { return null; }
}

/** Lead mínimo para ligar a análise à Demonstração e ao acompanhamento de clientes. */
export function leadFromAnalysis(form: BusinessAnalysisInput, phone: string, leadId?: string): Lead {
  return {
    id: entryId(form, leadId), name: form.name, address: form.city, phone: phone.trim() || null, intlPhone: phone.trim() || null,
    rating: null, reviews: null, category: form.segment, mapsUrl: null,
  };
}
