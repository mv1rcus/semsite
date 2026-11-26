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

const HTML_LOADERS: Record<string, () => Promise<{ default: string }>> = {
  "focinho-feliz": () => import("./standalone-html/focinho-feliz.html?raw"),
  "brasa-e-pao": () => import("./standalone-html/brasa-e-pao.html?raw"),
  "dom-navalha": () => import("./standalone-html/dom-navalha.html?raw"),
  "grao-e-prosa": () => import("./standalone-html/grao-e-prosa.html?raw"),
  "toledo-azevedo": () => import("./standalone-html/toledo-azevedo.html?raw"),
  "sorriso-verde": () => import("./standalone-html/sorriso-verde.html?raw"),
  "forca-viva": () => import("./standalone-html/forca-viva.html?raw"),
};

/** Codigo do modelo: um .html unico (JS, CSS e imagens dentro), montado so no servidor e so para quem tem o selo Verificado. */
export const getModelCode = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => promptSchema.parse(d))
  .handler(async ({ data, context }) => {
    const { assertVerified } = await import("./verified-guard.server");
    await assertVerified(context.supabase, "O código do site");
    const { getPremium } = await import("./premium-models");
    const m = getPremium(data.id);
    const load = HTML_LOADERS[data.id];
    if (!m || !load) throw new Error("Modelo não encontrado.");
    const { default: html } = await load();
    const client = { ...(data.name ? { name: data.name } : {}), ...(data.whatsapp ? { whatsapp: data.whatsapp.replace(/\D/g, "") } : {}), ...(data.city ? { city: data.city } : {}) };
    const json = JSON.stringify(client).replace(/</g, "\\u003c");
    const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    return { html: html.replace("/*__SEMSITE_CLIENT__*/{}", () => json).replace("__SEMSITE_TITLE__", () => esc(data.name || m.name)), filename: `${m.id}.html` };
  });
