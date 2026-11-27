import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { createStripeClient } from "@/lib/stripe.server";

// Dono do site (mesma conta que vê "Contas do site"). Checado no servidor pelo id do usuário autenticado.
const OWNER_ID = "60254e77-1a4c-4be8-8b77-3d29a537785f";
const DAILY_LIMIT = 80; // teto de e-mails por dia do relay (Apps Script da semsiteapp)

export type EmailRow = { key: string; kind: string; to: string | null; subject: string | null; at: string };
export type SystemInfo = {
  generatedAt: string;
  emails: { today: number; limit: number; last7: number; byKindToday: { kind: string; count: number }[]; rows: EmailRow[]; hasDetails: boolean };
  health: { name: string; ok: boolean; detail: string }[];
};

const BR_DAY = (d: Date | string) => new Date(d).toLocaleDateString("sv-SE", { timeZone: "America/Sao_Paulo" });

async function compute(): Promise<SystemInfo> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const admin = supabaseAdmin as any;
  const now = Date.now();
  const health: SystemInfo["health"] = [];

  let rows: EmailRow[] = [];
  let hasDetails = true;
  let all: { kind: string; created_at: string }[] = [];
  let dbOk = true;
  {
    const withDetails = await admin.from("email_log").select("dedupe_key, kind, to_email, subject, created_at").order("created_at", { ascending: false }).limit(300);
    let data = withDetails.data as any[] | null;
    if (withDetails.error) {
      hasDetails = false;
      const basic = await admin.from("email_log").select("dedupe_key, kind, created_at").order("created_at", { ascending: false }).limit(300);
      data = basic.data;
      if (basic.error) dbOk = false;
    }
    all = (data ?? []).map((r) => ({ kind: r.kind, created_at: r.created_at }));
    rows = (data ?? []).slice(0, 50).map((r) => ({ key: r.dedupe_key, kind: r.kind, to: r.to_email ?? null, subject: r.subject ?? null, at: r.created_at }));
  }
  health.push({ name: "Banco de dados", ok: dbOk, detail: dbOk ? "respondendo" : "falhou ao ler o registro de e-mails" });

  const today = BR_DAY(new Date(now));
  const todayRows = all.filter((r) => BR_DAY(r.created_at) === today);
  const byKind = new Map<string, number>();
  for (const r of todayRows) byKind.set(r.kind, (byKind.get(r.kind) ?? 0) + 1);
  const last7 = all.filter((r) => new Date(r.created_at).getTime() > now - 7 * 86400_000).length;

  const relayOk = Boolean(process.env["MAIL_RELAY_URL"] && process.env["MAIL_RELAY_TOKEN"]);
  health.push({ name: "Envio de e-mail (relay)", ok: relayOk, detail: relayOk ? "configurado" : "sem URL/token: e-mails não saem" });
  health.push({ name: "Limite diário de e-mails", ok: todayRows.length < DAILY_LIMIT * 0.8, detail: `${todayRows.length} de ${DAILY_LIMIT} hoje` });

  const t0 = Date.now();
  try {
    await createStripeClient("live").balance.retrieve();
    health.push({ name: "Stripe", ok: true, detail: `respondendo (${Date.now() - t0} ms)` });
  } catch (e) {
    console.error("system: stripe:", e);
    health.push({ name: "Stripe", ok: false, detail: "não respondeu" });
  }

  return {
    generatedAt: new Date().toISOString(),
    emails: { today: todayRows.length, limit: DAILY_LIMIT, last7, byKindToday: [...byKind.entries()].map(([kind, count]) => ({ kind, count })), rows, hasDetails },
    health,
  };
}

export const adminSystem = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<SystemInfo | { error: string }> => {
    if (context.userId !== OWNER_ID) throw new Error("Não autorizado");
    try {
      return await compute();
    } catch (e) {
      console.error("system: falha:", e);
      return { error: e instanceof Error ? e.message.slice(0, 300) : "erro desconhecido" };
    }
  });
