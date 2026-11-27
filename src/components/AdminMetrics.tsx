import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { adminMetrics, type AdminMetrics as M, type DayCount } from "@/lib/admin-metrics.functions";

const brl = (c: number) => (c / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const fmt = (d: string) => new Date(d).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: "short", timeStyle: "short" });
const fmtDay = (d: string) => new Date(d + "T12:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });

function Stat({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return <div className="app-card p-4"><p className="text-sm text-muted-foreground">{label}</p><p className="font-display text-3xl text-primary">{value}</p>{sub && <p className="text-xs text-muted-foreground">{sub}</p>}</div>;
}
function Bars({ data, label }: { data: DayCount[]; label: string }) {
  const max = Math.max(1, ...data.map((d) => d.count));
  return (
    <div role="img" aria-label={label} className="mt-2 flex h-24 items-end gap-1">
      {data.map((d) => (
        <div key={d.day} className="flex h-full flex-1 flex-col items-center justify-end" title={`${fmtDay(d.day)}: ${d.count}`}>
          <span className="text-[10px] text-muted-foreground">{d.count || ""}</span>
          <div className="w-full rounded-sm bg-primary" style={{ height: `${Math.max(d.count ? 6 : 2, (d.count / max) * 70)}%`, opacity: d.count ? 1 : 0.25 }} />
          <span className="text-[9px] text-muted-foreground">{fmtDay(d.day).slice(0, 2)}</span>
        </div>
      ))}
    </div>
  );
}
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="mt-6"><h2 className="font-display text-xl tracking-wide">{title}</h2>{children}</section>;
}

export function AdminMetrics() {
  const load = useServerFn(adminMetrics);
  const [m, setM] = useState<M | null>(null);
  const [err, setErr] = useState("");
  const run = () => { setErr(""); load().then(setM).catch(() => setErr("Não foi possível carregar as métricas.")); };
  useEffect(run, []); // eslint-disable-line react-hooks/exhaustive-deps
  if (err) return <p className="mt-4 text-destructive">{err}</p>;
  if (!m) return <p className="mt-4 text-muted-foreground">Carregando…</p>;
  return (
    <div className="mt-2">
      <div className="mt-2 flex items-center justify-between"><p className="text-xs text-muted-foreground">Atualizado em {fmt(m.generatedAt)}</p><button className="text-sm text-primary underline" onClick={run}>Atualizar</button></div>
      <Section title="Cadastros">
        <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4"><Stat label="Total" value={m.signups.total} /><Stat label="Hoje" value={m.signups.today} /><Stat label="7 dias" value={m.signups.d7} /><Stat label="30 dias" value={m.signups.d30} /></div>
        <p className="mt-3 text-sm text-muted-foreground">Últimos 14 dias</p><Bars data={m.signups.perDay} label="Cadastros por dia" />
      </Section>
      <Section title="Assinaturas e selos ativos">
        <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4"><Stat label="Selos ativos" value={m.subs.activeTotal} /><Stat label="Pagamento único" value={m.subs.oneTime} /><Stat label="Assinatura recorrente" value={m.subs.recurring} /><Stat label="Vencidos (30 dias)" value={m.subs.expired30} /></div>
        <p className="mt-3 text-sm font-semibold">Vencem nos próximos 30 dias</p>
        {m.subs.expiringSoon.length === 0 ? <p className="text-sm text-muted-foreground">Ninguém por enquanto.</p> : (
          <ul className="mt-1 flex flex-col gap-1">{m.subs.expiringSoon.map((s, i) => <li key={i} className="app-card flex justify-between gap-2 p-2 text-sm"><span className="break-all">{s.userLabel}</span><span className="shrink-0 text-muted-foreground">{s.kind} · {fmt(s.when)}</span></li>)}</ul>
        )}
      </Section>
      <Section title="Pagamentos recebidos">
        {!m.payments.available ? <p className="mt-2 text-sm text-muted-foreground">Não consegui consultar a Stripe agora. Tente atualizar.</p> : (
          <>
            <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4"><Stat label="7 dias" value={brl(m.payments.gross7Cents)} sub={`${m.payments.count7} pagamentos`} /><Stat label="30 dias" value={brl(m.payments.gross30Cents)} sub={`${m.payments.count30} pagamentos`} /></div>
            <p className="mt-1 text-xs text-muted-foreground">Valores já descontam reembolsos. Não inclui taxas da Stripe.</p>
            {m.payments.last.length > 0 && <ul className="mt-2 flex flex-col gap-1">{m.payments.last.map((p, i) => <li key={i} className="app-card flex justify-between p-2 text-sm"><span>{brl(p.cents)}</span><span className="text-muted-foreground">{p.method} · {fmt(p.at)}</span></li>)}</ul>}
          </>
        )}
      </Section>
      <Section title="Buscas no site">
        <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4"><Stat label="Hoje" value={m.searches.today} /><Stat label="7 dias" value={m.searches.d7} /><Stat label="30 dias" value={m.searches.d30} /><Stat label="Pessoas buscando (7 dias)" value={m.searches.activeUsers7} /></div>
        <p className="mt-3 text-sm text-muted-foreground">Últimos 14 dias</p><Bars data={m.searches.perDay} label="Buscas por dia" />
      </Section>
      <Section title="Demos criadas">
        <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4"><Stat label="Hoje" value={m.demos.today} /><Stat label="7 dias" value={m.demos.d7} /><Stat label="30 dias" value={m.demos.d30} /><Stat label="Aberturas (total)" value={m.demos.opens} sub={`${m.demos.total} demos no total`} /></div>
        {m.demos.topCategories.length > 0 && <p className="mt-3 text-sm"><span className="text-muted-foreground">Categorias mais criadas (30 dias): </span>{m.demos.topCategories.map((c) => `${c.name} (${c.count})`).join(", ")}</p>}
      </Section>
    </div>
  );
}
