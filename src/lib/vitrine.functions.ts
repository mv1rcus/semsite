import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const promptSchema = z.object({ id: z.string().min(1).max(60), name: z.string().max(120).optional(), whatsapp: z.string().max(30).optional(), city: z.string().max(80).optional() });

/** Prompt do modelo: gerado so no servidor e so para quem tem o selo Verificado. A previa continua aberta. */
export const getModelPrompt = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => promptSchema.parse(d))
  .handler(async ({ data, context }) => {
    const { assertVerified } = await import("./verified-guard.server");
    await assertVerified(context.supabase, "O prompt do site");
    const { getPremium } = await import("./premium-models");
    const m = getPremium(data.id);
    if (!m) throw new Error("Modelo não encontrado.");
    const { buildModelPrompt } = await import("./premium-prompt.server");
    return { prompt: buildModelPrompt(m, { ...(data.name ? { name: data.name } : {}), ...(data.whatsapp ? { whatsapp: data.whatsapp } : {}), ...(data.city ? { city: data.city } : {}) }) };
  });

/** Autoriza aplicar o modelo em um cliente (link personalizado, mensagem, etapa do cliente). Checa o selo no servidor antes de qualquer acao. */
export const authorizeModelUse = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().min(1).max(60) }).parse(d))
  .handler(async ({ data, context }) => {
    const { assertVerified } = await import("./verified-guard.server");
    await assertVerified(context.supabase, "Usar o modelo em um cliente");
    const { getPremium } = await import("./premium-models");
    if (!getPremium(data.id)) throw new Error("Modelo não encontrado.");
    return { ok: true as const };
  });

/** Galeria: o servidor decide o que cada conta ve. Sem o selo, a capa real, o nome e o estilo nunca saem do servidor (so uma capa borrada e o ramo). */
export const listVitrine = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { PREMIUM_MODELS } = await import("./premium-models");
    const { data } = await context.supabase.rpc("am_i_verified");
    const verified = !!data;
    return {
      verified,
      models: PREMIUM_MODELS.map((m) => verified ? m : { ...m, name: "Modelo bloqueado", style: "Disponível para quem tem o selo Verificado", city: "", tags: [], accent: "#444", cover: `/cover-locked-${m.id}.jpg` }),
    };
  });
