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
