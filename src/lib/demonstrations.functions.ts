import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";
import { demonstrationLink } from "./demonstrations";
import { demonstrationPageIsAvailable, type DemoVerification } from "./demo-verification";

export const verifyDemonstrationLink = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }): Promise<DemoVerification> => {
    let status: DemoVerification["status"] = "failed";
    try {
      const response = await fetch(demonstrationLink(data.id, "https://cacacliente.lovable.app"), {
        redirect: "error", signal: AbortSignal.timeout(15000),
        headers: { Accept: "text/html", "Cache-Control": "no-cache" },
      });
      if (demonstrationPageIsAvailable(response.status, await response.text())) status = "ok";
    } catch { /* Unreachable links are never marked as verified. */ }
    return { status, checkedAt: new Date().toISOString() };
  });

export const getDemonstration = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
    if (!url || !key) throw new Error("Demonstrações indisponíveis no momento.");
    const client = createClient<Database>(url, key, { auth: { persistSession: false, autoRefreshToken: false }, global: { fetch: (input, init) => {
      const headers = new Headers(init?.headers);
      if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
      headers.set("apikey", key);
      return fetch(input, { ...init, headers });
    } } });
    const { data: demo, error } = await client.from("site_demonstrations").select("id,name,category,address,phone,headline,description").eq("id", data.id).maybeSingle();
    if (error) throw new Error("Não foi possível abrir esta demonstração.");
    return demo;
  });