import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { adminSystem, type SystemInfo } from "@/lib/admin-system.functions";

const fmt = (d: string) => new Date(d).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: "short", timeStyle: "short" });
const KIND: Record<string, string> = {
  payment_confirmed: "Pagamento confirmado", cancellation: "Cancelamento", refund: "Reembolso", ticket_opened: "Ticket recebido",
  ticket_reply: "Resposta de ticket", welcome: "Boas-vindas", expiring: "Selo vence em breve",
};

export function SystemView({ s, run }: { s: SystemInfo; run: () => void }) {
  const pct = Math.min(100, Math.round((s.emails.today / s.emails.limit) * 100));
  return (
    <div className="mt-2">
      <div className="mt-2 flex items-center justify-between"><p className="text-xs text-muted-foreground">Atualizado em {fmt(s.generatedAt)}</p><button className="text-sm text-primary underline" onClick={run}>Atualizar</button></div>
      <section className="mt-6"><h2 className="font-display text-xl tracking-wide">Saúde do sistema</h2>
        <ul className="mt-2 flex flex-col gap-2">
          {s.health.map((h) => (
            <li key={h.name} className="app-card flex items-center justify-between gap-3 p-3 text-sm">
              <span className="flex items-center gap-2 font-semibold"><span aria-hidden className={`inline-block size-2.5 rounded-full ${h.ok ? "bg-green-500" : "bg-red-500"}`} />{h.name}</span>
              <span className="text-right text-muted-foreground">{h.ok ? "OK" : "Atenção"} · {h.detail}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-6"><h2 className="font-display text-xl tracking-wide">E-mails enviados</h2>
        <div className="app-card mt-2 p-4">
          <p className="text-sm text-muted-foreground">Hoje</p>
          <p className="font-display text-3xl text-primary">{s.emails.today} <span className="text-base text-muted-foreground">de {s.emails.limit}</span></p>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted" role="img" aria-label={`${pct}% do limite diário`}><div className="h-full bg-primary" style={{ width: `${pct}%` }} /></div>
          <p className="mt-2 text-xs text-muted-foreground">Últimos 7 dias: {s.emails.last7}{s.emails.byKindToday.length > 0 && ` · Hoje: ${s.emails.byKindToday.map((k) => `${KIND[k.kind] ?? k.kind} (${k.count})`).join(", ")}`}</p>
        </div>
        {!s.emails.hasDetails && <p className="mt-2 text-xs text-muted-foreground">Destinatário e assunto aparecem só nos e-mails enviados depois que a coluna nova for criada no banco.</p>}
        {s.emails.rows.length === 0 ? <p className="mt-3 text-sm text-muted-foreground">Nenhum e-mail registrado ainda.</p> : (
          <ul className="mt-3 flex flex-col gap-2">
            {s.emails.rows.map((r) => (
              <li key={r.key} className="app-card p-3 text-sm">
                <p className="font-semibold">{KIND[r.kind] ?? r.kind}</p>
                {r.subject && <p className="break-words text-muted-foreground">{r.subject}</p>}
                <p className="break-all text-muted-foreground">{r.to ? `Para: ${r.to}` : "Destinatário não registrado"} · {fmt(r.at)}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export function AdminSystem() {
  const load = useServerFn(adminSystem);
  const [s, setS] = useState<SystemInfo | null>(null);
  const [err, setErr] = useState("");
  const run = () => { setErr(""); load().then((r) => { if ("error" in r) setErr(`Não foi possível carregar (${r.error}).`); else setS(r); }).catch(() => setErr("Não foi possível carregar.")); };
  useEffect(run, []); // eslint-disable-line react-hooks/exhaustive-deps
  if (err) return <p className="mt-4 text-destructive">{err}</p>;
  if (!s) return <p className="mt-4 text-muted-foreground">Carregando…</p>;
  return <SystemView s={s} run={run} />;
}
