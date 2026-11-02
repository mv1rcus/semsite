import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, Send, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/mensagens/$username")({
  head: ({ params }) => ({ meta: [{ title: `Conversa com @${params.username} — SemSite` }, { name: "description", content: "Conversa privada no SemSite." }, { property: "og:title", content: "Conversa — SemSite" }, { property: "og:description", content: "Mensagem direta no SemSite." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" }] }),
  component: Chat,
});

type Other = { id: string; username: string; display_name: string; avatar_url: string; verified?: boolean };
type M = { id: string; sender_id: string; recipient_id: string; body: string; created_at: string };

function Chat() {
  const { username } = Route.useParams();
  const [me, setMe] = useState("");
  const [other, setOther] = useState<Other | null | undefined>(undefined);
  const [msgs, setMsgs] = useState<M[]>([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const bottom = useRef<HTMLDivElement>(null);

  const load = useCallback(async (meId: string, otherId: string) => {
    const { data } = await supabase.from("direct_messages").select("id, sender_id, recipient_id, body, created_at")
      .or(`and(sender_id.eq.${meId},recipient_id.eq.${otherId}),and(sender_id.eq.${otherId},recipient_id.eq.${meId})`)
      .order("created_at").limit(500);
    setMsgs(data ?? []);
    await supabase.from("direct_messages").update({ read_at: new Date().toISOString() }).eq("sender_id", otherId).eq("recipient_id", meId).is("read_at", null);
  }, []);

  useEffect(() => {
    let ch: ReturnType<typeof supabase.channel> | null = null;
    (async () => {
      const [{ data: { user } }, { data }] = await Promise.all([supabase.auth.getUser(), supabase.rpc("get_public_profile", { uname: username })]);
      const o = (data as Other[] | null)?.[0] ?? null;
      setMe(user?.id ?? ""); setOther(o);
      if (!user || !o) return;
      await load(user.id, o.id);
      ch = supabase.channel(`dm-${Math.random().toString(36).slice(2)}`)
        .on("postgres_changes", { event: "INSERT", schema: "public", table: "direct_messages" }, () => load(user.id, o.id)).subscribe();
    })();
    return () => { if (ch) supabase.removeChannel(ch); };
  }, [username, load]);

  useEffect(() => { bottom.current?.scrollIntoView({ block: "end" }); }, [msgs.length]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const body = text.trim().slice(0, 2000);
    if (!body || !other) return;
    setError(""); setText("");
    const { error: err } = await supabase.from("direct_messages").insert({ recipient_id: other.id, body });
    if (err) { setError("Não deu pra enviar. Tente de novo."); setText(body); return; }
    await load(me, other.id);
  }

  return (
    <main className="mx-auto flex h-[100dvh] max-w-2xl flex-col px-4">
      <header className="flex items-center gap-3 border-b border-border py-3">
        <Link to="/mensagens" aria-label="Voltar" className="tab-pill"><ArrowLeft size={16} /></Link>
        {other && (
          <Link to="/u/$username" params={{ username: other.username }} className="flex min-w-0 items-center gap-2">
            {other.avatar_url ? <img src={other.avatar_url} alt="" width={36} height={36} referrerPolicy="no-referrer" className="size-9 rounded-full object-cover" /> : <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary"><UserRound className="size-4" /></div>}
            <div className="min-w-0"><p className="flex items-center gap-1 truncate font-bold">{other.display_name || `@${other.username}`}{other.verified && <VerifiedBadge size={14} />}</p><p className="truncate text-xs text-muted-foreground">@{other.username}</p></div>
          </Link>
        )}
      </header>
      <div className="flex-1 space-y-2 overflow-y-auto py-4">
        {other === undefined && <p className="text-sm text-muted-foreground">Carregando…</p>}
        {other === null && <p>Ninguém usa o @{username}.</p>}
        {other && other.id === me && <p className="text-sm text-muted-foreground">Você não pode mandar mensagem pra você mesmo.</p>}
        {other && msgs.length === 0 && other.id !== me && <p className="text-center text-sm text-muted-foreground">Diga oi pra @{other.username} 👋</p>}
        {msgs.map(m => {
          const mine = m.sender_id === me;
          return (
            <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-2xl px-3 py-2 ${mine ? "rounded-br-sm bg-primary text-primary-foreground" : "rounded-bl-sm bg-muted"}`}>
                <p className="whitespace-pre-wrap break-words">{m.body}</p>
                <time className={`block text-right text-[10px] ${mine ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{new Date(m.created_at).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</time>
              </div>
            </div>
          );
        })}
        <div ref={bottom} />
      </div>
      {other && other.id !== me && (
        <form onSubmit={send} className="flex gap-2 border-t border-border py-3">
          <Input value={text} maxLength={2000} onChange={e => setText(e.target.value)} placeholder="Escreva uma mensagem…" aria-label="Mensagem" />
          <Button type="submit" size="icon" disabled={!text.trim()} aria-label="Enviar mensagem"><Send /></Button>
        </form>
      )}
      {error && <p role="alert" className="pb-2 text-sm text-destructive">{error}</p>}
    </main>
  );
}
