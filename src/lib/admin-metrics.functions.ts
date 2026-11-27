import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { createStripeClient } from "@/lib/stripe.server";

// Dono do site (mesma conta que vê "Contas do site"). Checado no servidor pelo id do usuário autenticado.
const OWNER_ID = "60254e77-1a4c-4be8-8b77-3d29a537785f";

export type DayCount = { day: string; count: number };
export type AdminMetrics = {
  generatedAt: string;
  signups: { total: number; today: number; d7: number; d30: number; perDay: DayCount[] };
  subs: {
    activeTotal: number; oneTime: number; recurring: number; manual: number;
    expiringSoon: { when: string; kind: string; userLabel: string }[];
    expired30: number;
  };
  payments: { available: boolean; count30: number; gross30Cents: number; count7: number; gross7Cents: number; last: { at: string; cents: number; method: string }[] };
  searches: { today: number; d7: number; d30: number; activeUsers7: number; perDay: DayCount[] };
  demos: { today: number; d7: number; d30: number; total: number; opens: number; topCategories: { name: string; count: number }[] };
};

const BR_DAY = (d: Date | string) => new Date(d).toLocaleDateString("sv-SE", { timeZone: "America/Sao_Paulo" });

function lastDays(n: number): string[] {
  const out: string[] = [];
  for (let i = n - 1; i >= 0; i--) out.push(BR_DAY(new Date(Date.now() - i * 86400_000)));
  return out;
}

export const adminMetrics = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AdminMetrics | { error: string }> => {
    if (context.userId !== OWNER_ID) throw new Error("Não autorizado");
    try {
      return await compute();
    } catch (e) {
      console.error("metrics: falha:", e);
      return { error: e instanceof Error ? e.message.slice(0, 300) : "erro desconhecido" };
    }
  });

async function compute(): Promise<AdminMetrics> {
  {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const admin = supabaseAdmin as any;
    const now = Date.now();
    const iso = (ms: number) => new Date(ms).toISOString();
    const days14 = lastDays(14);
    const today = days14[days14.length - 1] as string;
    const d7 = days14.slice(-7)[0] as string;
    const d30 = BR_DAY(new Date(now - 29 * 86400_000));

    // Cadastros
    const users: { id: string; email?: string | null; created_at: string }[] = [];
    for (let page = 1; page <= 10; page++) {
      const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 1000 });
      if (error) break;
      users.push(...(data?.users ?? []));
      if ((data?.users?.length ?? 0) < 1000) break;
    }
    const labelOf = new Map(users.map((u) => [u.id, u.email ?? "sem e-mail"]));
    const signupsByDay = new Map<string, number>();
    for (const u of users) { const k = BR_DAY(u.created_at); signupsByDay.set(k, (signupsByDay.get(k) ?? 0) + 1); }
    const inRange = (from: string) => users.filter((u) => BR_DAY(u.created_at) >= from).length;

    // Assinaturas / selos
    const [vp, subs] = await Promise.all([
      admin.from("verified_profiles").select("profile_id, source, expires_at").limit(5000),
      admin.from("subscriptions").select("user_id, status, current_period_end, cancel_at_period_end").limit(5000),
    ]);
    const vrows = (vp.data ?? []) as { profile_id: string; source: string; expires_at: string | null }[];
    const live = vrows.filter((r) => !r.expires_at || new Date(r.expires_at).getTime() > now);
    const oneTime = live.filter((r) => r.source === "one_time").length;
    const recurring = live.filter((r) => r.source === "subscription").length;
    const manual = live.filter((r) => r.source === "manual").length;
    const expiringSoon = live
      .filter((r) => r.expires_at && new Date(r.expires_at).getTime() <= now + 30 * 86400_000 && r.source !== "manual")
      .sort((a, b) => new Date(a.expires_at!).getTime() - new Date(b.expires_at!).getTime())
      .slice(0, 15)
      .map((r) => ({ when: r.expires_at as string, kind: r.source === "one_time" ? "Pagamento único" : "Assinatura", userLabel: String(labelOf.get(r.profile_id) ?? "conta") }));
    const expired30 = vrows.filter((r) => r.source === "one_time" && r.expires_at && new Date(r.expires_at).getTime() <= now && new Date(r.expires_at).getTime() > now - 30 * 86400_000).length;
    void subs;

    // Pagamentos (Stripe ao vivo; se falhar, o painel avisa)
    let payments: AdminMetrics["payments"] = { available: false, count30: 0, gross30Cents: 0, count7: 0, gross7Cents: 0, last: [] };
    try {
      const stripe = createStripeClient("live");
      const since = Math.floor((now - 30 * 86400_000) / 1000);
      const charges = await stripe.charges.list({ created: { gte: since }, limit: 100 });
      const ok = charges.data.filter((c) => c.paid && c.status === "succeeded");
      const net = (c: (typeof ok)[number]) => c.amount - (c.amount_refunded ?? 0);
      const paid = ok.filter((c) => net(c) > 0);
      const cut7 = Math.floor((now - 7 * 86400_000) / 1000);
      payments = {
        available: true,
        count30: paid.length,
        gross30Cents: paid.reduce((s, c) => s + net(c), 0),
        count7: paid.filter((c) => c.created >= cut7).length,
        gross7Cents: paid.filter((c) => c.created >= cut7).reduce((s, c) => s + net(c), 0),
        last: paid.slice(0, 5).map((c) => ({ at: new Date(c.created * 1000).toISOString(), cents: net(c), method: c.payment_method_details?.type ?? "—" })),
      };
    } catch (e) {
      console.error("metrics: stripe indisponível:", e);
    }

    // Buscas
    const su = await admin.from("search_usage").select("user_id, day, count").gte("day", d30).limit(20000);
    const srows = (su.data ?? []) as { user_id: string; day: string; count: number }[];
    const sumFrom = (from: string) => srows.filter((r) => r.day >= from).reduce((s, r) => s + r.count, 0);
    const sByDay = new Map<string, number>();
    for (const r of srows) sByDay.set(r.day, (sByDay.get(r.day) ?? 0) + r.count);

    // Demos
    const dm = await admin.from("site_demonstrations").select("created_at, category, open_count").order("created_at", { ascending: false }).limit(5000);
    const drows = (dm.data ?? []) as { created_at: string; category: string; open_count: number }[];
    const dFrom = (from: string) => drows.filter((r) => BR_DAY(r.created_at) >= from).length;
    const cat = new Map<string, number>();
    for (const r of drows) if (BR_DAY(r.created_at) >= d30) cat.set(r.category, (cat.get(r.category) ?? 0) + 1);

    return {
      generatedAt: new Date().toISOString(),
      signups: { total: users.length, today: inRange(today), d7: inRange(d7), d30: inRange(d30), perDay: days14.map((day) => ({ day, count: signupsByDay.get(day) ?? 0 })) },
      subs: { activeTotal: live.length, oneTime, recurring, manual, expiringSoon, expired30 },
      payments,
      searches: { today: sumFrom(today), d7: sumFrom(d7), d30: sumFrom(d30), activeUsers7: new Set(srows.filter((r) => r.day >= d7).map((r) => r.user_id)).size, perDay: days14.map((day) => ({ day, count: sByDay.get(day) ?? 0 })) },
      demos: { today: dFrom(today), d7: dFrom(d7), d30: dFrom(d30), total: drows.length, opens: drows.reduce((s, r) => s + (r.open_count ?? 0), 0), topCategories: [...cat.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, count]) => ({ name, count })) },
    };
  }
}
