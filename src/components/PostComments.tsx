import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Send, Trash2, UserRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { supabase } from "@/integrations/supabase/client";

type C = {
  id: string;
  user_id: string;
  body: string;
  created_at: string;
  parent_id: string | null;
  reply_to_username: string | null;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  verified: boolean;
};

function Avatar({ src, size = 28 }: { src: string | null; size?: number }) {
  return src
    ? <img src={src} alt="" width={size} height={size} referrerPolicy="no-referrer" className="shrink-0 rounded-full object-cover" style={{ width: size, height: size }} />
    : <div className="flex shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary" style={{ width: size, height: size }}><UserRound className="size-4" /></div>;
}

export function PostComments({ postId, me, postOwner, onCount, autoFocus = false }: { postId: string; me: string; postOwner: string; onCount: (n: number) => void; autoFocus?: boolean }) {
  const [items, setItems] = useState<C[]>([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [replyTo, setReplyTo] = useState<C | null>(null);
  const countRef = useRef(onCount); countRef.current = onCount;

  const load = useCallback(async () => {
    const { data } = await supabase.rpc("post_comments_list", { pid: postId });
    const rows = (data as C[] | null) ?? [];
    setItems(rows); countRef.current(rows.length);
  }, [postId]);
  useEffect(() => { load(); }, [load]);

  const { top, replies } = useMemo(() => {
    const top: C[] = [];
    const replies = new Map<string, C[]>();
    for (const c of items) {
      if (c.parent_id && items.some(p => p.id === c.parent_id)) {
        replies.set(c.parent_id, [...(replies.get(c.parent_id) ?? []), c]);
      } else {
        top.push(c);
      }
    }
    return { top, replies };
  }, [items]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const body = text.trim().slice(0, 1000);
    if (!body) return;
    setSending(true); setError("");
    const { error: err } = await supabase.from("post_comments").insert({ post_id: postId, body, parent_id: replyTo?.id ?? null });
    if (err) setError("Não deu pra comentar. Tente de novo.");
    else { setText(""); setReplyTo(null); await load(); }
    setSending(false);
  }

  async function remove(c: C) {
    if (!confirm("Apagar este comentário?")) return;
    await supabase.from("post_comments").delete().eq("id", c.id);
    await load();
  }

  function CommentRow({ c, indent = false }: { c: C; indent?: boolean }) {
    return (
      <div className={`flex gap-2 ${indent ? "ml-9" : ""}`}>
        <Avatar src={c.avatar_url} size={indent ? 24 : 28} />
        <div className="min-w-0 flex-1 rounded-lg bg-muted px-3 py-2">
          <p className="flex items-center gap-1 text-sm font-semibold">
            {c.username ? <Link to="/u/$username" params={{ username: c.username }}>{c.display_name || `@${c.username}`}</Link> : (c.display_name || "Sem nome")}
            {c.verified && <VerifiedBadge size={14} />}
          </p>
          {c.reply_to_username && <p className="text-xs text-muted-foreground">Respondendo a @{c.reply_to_username}</p>}
          <p className="whitespace-pre-wrap text-sm">{c.body}</p>
          {!indent && (
            <button type="button" onClick={() => { setReplyTo(c); setText(""); }} className="mt-1 text-xs font-semibold text-muted-foreground hover:text-primary">
              Responder
            </button>
          )}
        </div>
        {(c.user_id === me || postOwner === me) && <button type="button" onClick={() => remove(c)} aria-label="Apagar comentário" className="self-start p-1 text-muted-foreground hover:text-destructive"><Trash2 size={14} /></button>}
      </div>
    );
  }

  return (
    <div className="mt-3 space-y-3 border-t border-border pt-3">
      {top.map(c => (
        <div key={c.id} className="space-y-2">
          <CommentRow c={c} />
          {(replies.get(c.id) ?? []).map(r => <CommentRow key={r.id} c={r} indent />)}
        </div>
      ))}
      {replyTo && (
        <p className="flex items-center justify-between rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
          Respondendo a @{replyTo.username || "comentário"}
          <button type="button" onClick={() => setReplyTo(null)} aria-label="Cancelar resposta" className="p-0.5 hover:text-foreground"><X size={14} /></button>
        </p>
      )}
      <form onSubmit={send} className="flex gap-2">
        <Input value={text} maxLength={1000} autoFocus={autoFocus} onChange={e => setText(e.target.value)}
          placeholder={replyTo ? "Escreva sua resposta…" : "Escreva um comentário…"} aria-label="Comentário" />
        <Button type="submit" size="icon" disabled={sending || !text.trim()} aria-label="Enviar comentário"><Send /></Button>
      </form>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
