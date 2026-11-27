import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createTicket } from "@/lib/tickets.functions";

export const Route = createFileRoute("/suporte")({
  head: () => ({
    meta: [
      { title: "Suporte | SemSite" },
      { name: "description", content: "Abra um ticket de suporte do SemSite. Você recebe o número do atendimento e a resposta por e-mail." },
      { property: "og:title", content: "Suporte | SemSite" },
    ],
  }),
  component: Suporte,
});

function Suporte() {
  const send = useServerFn(createTicket);
  const [f, setF] = useState({ name: "", email: "", subject: "", message: "", website: "" });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [done, setDone] = useState<number | null>(null);
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF((p) => ({ ...p, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true); setErr("");
    try {
      const r = await send({ data: f });
      if (r.ok) setDone(r.number); else setErr(r.error);
    } catch { setErr("Não foi possível enviar agora. Tente de novo."); }
    setBusy(false);
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-10 sm:px-6">
      <Link to="/" className="font-bold hover:underline">← SemSite</Link>
      <h1 className="mt-6 text-3xl font-extrabold">Suporte</h1>
      {done !== null ? (
        <div className="app-card mt-6 p-5" role="status">
          <p className="text-lg font-bold">Ticket {done > 0 ? `#${done} ` : ""}enviado</p>
          <p className="mt-2 text-sm text-muted-foreground">Mandamos a confirmação para o seu e-mail (olhe também o spam). Respondemos por lá.</p>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-6 flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">Conte o que você precisa. Você recebe o número do ticket por e-mail e a resposta chega no mesmo e-mail.</p>
          <label className="flex flex-col gap-1 text-sm font-medium">Seu nome<Input required maxLength={80} value={f.name} onChange={set("name")} autoComplete="name" /></label>
          <label className="flex flex-col gap-1 text-sm font-medium">Seu e-mail<Input required type="email" maxLength={200} value={f.email} onChange={set("email")} autoComplete="email" /></label>
          <label className="flex flex-col gap-1 text-sm font-medium">Assunto<Input required maxLength={120} value={f.subject} onChange={set("subject")} /></label>
          <label className="flex flex-col gap-1 text-sm font-medium">Mensagem<Textarea required rows={6} maxLength={4000} value={f.message} onChange={set("message")} /></label>
          <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }}>
            <label>Não preencha<input tabIndex={-1} autoComplete="off" value={f.website} onChange={set("website")} /></label>
          </div>
          {err && <p role="alert" className="text-sm text-destructive">{err}</p>}
          <Button type="submit" disabled={busy}>{busy ? "Enviando…" : "Enviar ticket"}</Button>
        </form>
      )}
    </main>
  );
}
