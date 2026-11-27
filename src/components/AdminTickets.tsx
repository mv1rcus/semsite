import { useCallback, useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { adminGetTicket, adminListTickets, adminReplyTicket, adminSetTicketStatus, type TicketMessage, type TicketRow, type TicketStatus } from "@/lib/tickets.functions";

const LABEL: Record<TicketStatus, string> = { open: "Aberto", answered: "Respondido", closed: "Fechado" };
const fmt = (d: string) => new Date(d).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: "short", timeStyle: "short" });

export function AdminTickets() {
  const list = useServerFn(adminListTickets);
  const get = useServerFn(adminGetTicket);
  const reply = useServerFn(adminReplyTicket);
  const setStatus = useServerFn(adminSetTicketStatus);
  const [data, setData] = useState<Awaited<ReturnType<typeof adminListTickets>> | null>(null);
  const [filter, setFilter] = useState<"all" | TicketStatus>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [detail, setDetail] = useState<{ ticket: TicketRow; messages: TicketMessage[] } | null>(null);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");
  const [err, setErr] = useState("");

  const load = useCallback(async () => {
    try { setData(await list()); setErr(""); } catch { setErr("Não foi possível carregar os tickets."); }
  }, [list]);
  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    if (!openId) { setDetail(null); return; }
    get({ data: { id: openId } }).then(setDetail).catch(() => setErr("Não foi possível abrir o ticket."));
  }, [openId, get]);

  async function send() {
    if (!openId || busy) return;
    setBusy(true); setNote(""); setErr("");
    try {
      const r = await reply({ data: { id: openId, body: text } });
      setText("");
      setNote(r.emailed ? "Resposta enviada por e-mail." : "Resposta salva, mas o e-mail não saiu. Tente de novo mais tarde.");
      setDetail(await get({ data: { id: openId } }));
      load();
    } catch { setErr("Não foi possível enviar a resposta."); }
    setBusy(false);
  }
  async function changeStatus(status: TicketStatus) {
    if (!openId) return;
    try { await setStatus({ data: { id: openId, status } }); setDetail(await get({ data: { id: openId } })); load(); } catch { setErr("Não foi possível atualizar."); }
  }

  if (!data) return <p className="mt-4 text-muted-foreground">{err || "Carregando…"}</p>;
  const rows = data.tickets.filter((t) => filter === "all" || t.status === filter);
  const c = data.counts;

  if (openId && detail) {
    const t = detail.ticket;
    return (
      <section className="mt-4">
        <Button variant="ghost" size="sm" onClick={() => { setOpenId(null); setNote(""); }}>← Voltar aos tickets</Button>
        <h2 className="mt-2 break-words text-xl font-bold">#{t.number} · {t.subject}</h2>
        <p className="break-all text-sm text-muted-foreground">{t.name} · {t.email} · {LABEL[t.status]} · aberto em {fmt(t.created_at)}</p>
        <ul className="mt-4 flex flex-col gap-2">
          {detail.messages.map((m) => (
            <li key={m.id} className={`app-card whitespace-pre-wrap break-words p-3 text-sm ${m.author === "admin" ? "border-primary/40" : ""}`}>
              <p className="mb-1 text-xs font-semibold text-muted-foreground">{m.author === "admin" ? "SemSite" : t.name} · {fmt(m.created_at)}</p>
              {m.body}
            </li>
          ))}
        </ul>
        <Textarea aria-label="Resposta" className="mt-4" rows={5} maxLength={4000} placeholder="Escreva a resposta (vai por e-mail para o cliente)" value={text} onChange={(e) => setText(e.target.value)} />
        <div className="mt-2 flex flex-wrap gap-2">
          <Button onClick={send} disabled={busy || text.trim().length < 2}>{busy ? "Enviando…" : "Responder por e-mail"}</Button>
          {t.status !== "closed" ? <Button variant="outline" onClick={() => changeStatus("closed")}>Fechar ticket</Button> : <Button variant="outline" onClick={() => changeStatus("open")}>Reabrir</Button>}
        </div>
        {note && <p role="status" className="mt-2 text-sm text-muted-foreground">{note}</p>}
        {err && <p role="alert" className="mt-2 text-sm text-destructive">{err}</p>}
      </section>
    );
  }

  return (
    <section className="mt-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="app-card p-4"><p className="text-sm text-muted-foreground">Total</p><p className="font-display text-4xl text-primary">{c.total}</p></div>
        <div className="app-card p-4"><p className="text-sm text-muted-foreground">Abertos</p><p className="font-display text-4xl">{c.open}</p></div>
        <div className="app-card p-4"><p className="text-sm text-muted-foreground">Respondidos</p><p className="font-display text-4xl">{c.answered}</p></div>
        <div className="app-card p-4"><p className="text-sm text-muted-foreground">Fechados</p><p className="font-display text-4xl">{c.closed}</p></div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {(["all", "open", "answered", "closed"] as const).map((f) => (
          <Button key={f} size="sm" variant={filter === f ? "default" : "outline"} onClick={() => setFilter(f)}>{f === "all" ? "Todos" : LABEL[f]}</Button>
        ))}
      </div>
      {err && <p role="alert" className="mt-2 text-sm text-destructive">{err}</p>}
      {rows.length === 0 ? <p className="mt-4 text-muted-foreground">Nenhum ticket aqui.</p> : (
        <ul className="mt-4 flex flex-col gap-2">
          {rows.map((t) => (
            <li key={t.id} className="app-card">
              <Button variant="ghost" onClick={() => setOpenId(t.id)} className="h-auto w-full justify-between whitespace-normal p-3 text-left" aria-label={`Abrir ticket ${t.number}`}>
                <span className="min-w-0 flex-1">
                  <p className="break-words font-bold">#{t.number} · {t.subject}</p>
                  <p className="break-all text-sm text-muted-foreground">{t.name} · {t.email}</p>
                  <p className="text-sm text-muted-foreground">{fmt(t.created_at)}</p>
                </span>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${t.status === "open" ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>{LABEL[t.status]}</span>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
