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
  "rota-certa": () => import("./standalone-html/rota-certa.html?raw"),
  "focinho-feliz": () => import("./standalone-html/focinho-feliz.html?raw"),
  "brasa-e-pao": () => import("./standalone-html/brasa-e-pao.html?raw"),
  "dom-navalha": () => import("./standalone-html/dom-navalha.html?raw"),
  "fluxo-cowork": () => import("./standalone-html/fluxo-cowork.html?raw"),
  "jato-azul": () => import("./standalone-html/jato-azul.html?raw"),
  "pano-limpo": () => import("./standalone-html/pano-limpo.html?raw"),
  "cobalto-grafica": () => import("./standalone-html/cobalto-grafica.html?raw"),
  "caldeira-brava": () => import("./standalone-html/caldeira-brava.html?raw"),
  "gota-viva": () => import("./standalone-html/gota-viva.html?raw"),
  "roda-livre": () => import("./standalone-html/roda-livre.html?raw"),
  "grao-e-prosa": () => import("./standalone-html/grao-e-prosa.html?raw"),
  "ponte-ingles": () => import("./standalone-html/ponte-ingles.html?raw"),
  "toledo-azevedo": () => import("./standalone-html/toledo-azevedo.html?raw"),
  "casa-petala": () => import("./standalone-html/casa-petala.html?raw"),
  "forno-lume": () => import("./standalone-html/forno-lume.html?raw"),
  "nina-albuquerque": () => import("./standalone-html/nina-albuquerque.html?raw"),
  "estudio-linho": () => import("./standalone-html/estudio-linho.html?raw"),
  "garagem-74": () => import("./standalone-html/garagem-74.html?raw"),
  "atelie-seda": () => import("./standalone-html/atelie-seda.html?raw"),
  "folha-corrida": () => import("./standalone-html/folha-corrida.html?raw"),
  "alto-corte": () => import("./standalone-html/alto-corte.html?raw"),
  "doce-pomar": () => import("./standalone-html/doce-pomar.html?raw"),
  "volt-e-som": () => import("./standalone-html/volt-e-som.html?raw"),
  "massa-mae": () => import("./standalone-html/massa-mae.html?raw"),
  "sorriso-verde": () => import("./standalone-html/sorriso-verde.html?raw"),
  "forca-viva": () => import("./standalone-html/forca-viva.html?raw"),
  "studio-era": () => import("./standalone-html/studio-era.html?raw"),
  "tinta-rara": () => import("./standalone-html/tinta-rara.html?raw"),
  "ferro-e-tinta": () => import("./standalone-html/ferro-e-tinta.html?raw"),
  "marina-costa": () => import("./standalone-html/marina-costa.html?raw"),
  "otica-prisma": () => import("./standalone-html/otica-prisma.html?raw"),
  "serra-do-vento": () => import("./standalone-html/serra-do-vento.html?raw"),
  "burgeria-pop": () => import("./standalone-html/burgeria-pop.html?raw"),
  "horizonte-prime": () => import("./standalone-html/horizonte-prime.html?raw"),
  "farmacia-savia": () => import("./standalone-html/farmacia-savia.html?raw"),
  "escolinha-bola-pra-frente": () => import("./standalone-html/escolinha-bola-pra-frente.html?raw"),
  "escola-cardume": () => import("./standalone-html/escola-cardume.html?raw"),
  "assessoria-folego": () => import("./standalone-html/assessoria-folego.html?raw"),
  "casa-bandoneon": () => import("./standalone-html/casa-bandoneon.html?raw"),
  "estudio-impeto": () => import("./standalone-html/estudio-impeto.html?raw"),
  "estudio-toque": () => import("./standalone-html/estudio-toque.html?raw"),
  "estudio-serena": () => import("./standalone-html/estudio-serena.html?raw"),
  "raiz-yoga": () => import("./standalone-html/raiz-yoga.html?raw"),
  "vetor-contabilidade": () => import("./standalone-html/vetor-contabilidade.html?raw"),
  "daniela-rocha": () => import("./standalone-html/daniela-rocha.html?raw"),
  "livia-prado": () => import("./standalone-html/livia-prado.html?raw"),
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
