import { createStart, createCsrfMiddleware, createMiddleware } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

import { renderErrorPage } from "./lib/error-page";
import { attachSupabaseAuth } from "@/integrations/supabase/auth-attacher";

// Crawlers de IA e scrapers conhecidos não são leitores do site: cada página que
// abrem vira SSR e queima Compute. Resposta seca, sem montar página. Ficam de fora
// de propósito: Googlebot/Bingbot (SEO da home) e os bots de prévia de link
// (WhatsApp, facebookexternalhit, Twitterbot, Applebot), que o produto precisa.
const BOT_UA = /GPTBot|ChatGPT-User|OAI-SearchBot|ClaudeBot|anthropic-ai|Claude-Web|Bytespider|CCBot|Amazonbot|meta-externalagent|AhrefsBot|SemrushBot|MJ12bot|DotBot|PetalBot|DataForSeoBot|BLEXBot|YandexBot|Baiduspider|HeadlessChrome|PhantomJS|python-requests|scrapy/i;

const botWallMiddleware = createMiddleware().server(async ({ next }) => {
  const request = getRequest();
  if (request.method === "GET" || request.method === "HEAD") {
    const ua = request.headers.get("user-agent") ?? "";
    if (BOT_UA.test(ua)) return new Response("Forbidden", { status: 403 });
  }
  return next();
});

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

// Start installs this automatically when src/start.ts is absent; defining the
// file opts out, so re-add it explicitly to keep server functions protected
// from cross-site requests.
const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

export const startInstance = createStart(() => ({
  functionMiddleware: [attachSupabaseAuth],
  requestMiddleware: [botWallMiddleware, errorMiddleware, csrfMiddleware],
}));
