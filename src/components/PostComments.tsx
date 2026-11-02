import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Send, Trash2, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { supabase } from "@/integrations/supabase/client";

type C = { id: string; user_id: string; body: string; created_at: string; username: string | null; display_name: string | null; avatar_url: string | null; verified: boolean };

export function PostComments({ postId, me, postOwner, onCount }: { postId: string; me: string; postOwner: string; onCount: (n: number) => void }) {
  const [items, setItems] = useState<C[]>([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const countRef = useRef(onCount); countRef.current = onCount;

  const load = useCallback(async () => {
    const { data } = await supabase.rpc("post_comments_list", { pid: postId });
    const rows = (data as C[] | null) ?? [];
    setItems(rows); countRef.current(rows.length);
  }, [postId]);
  useEffect(() => { load(); }, [load]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const body = text.trim().slice(0, 1000);
    if (!body) return;
    setSending(true); setError("");
    const { error: err } = await supabase.from("post_comments").insert({ post_id: postId, body });
    if (err) setError("Não deu pra comentar. Tente de novo.");
    else { setText(""); await load(); }
    setSending(false);
  }

  async function remove(c: C) {
    if (!confirm("Apagar este comentário?")) return;
    await supabase.from("post_comments").delete().eq("id", c.id);
    await load();
  }

  return (
    <div className="mt-3 space-y-3 border-t border-border pt-3">
      {items.map(c => (
        <div key={c.id} className="flex gap-2">
          {c.avatar_url ? <img src={c.avatar_url} alt="" width={28} height={28} referrerPolicy="no-referrer" className="size-7 rounded-full object-cover" /> : <div className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary"><UserRound className="size-4" /></div>}
          <div className="min-w-0 flex-1 rounded-lg bg-muted px-3 py-2">
            <p className="flex items-center gap-1 text-sm font-semibold">
              {c.username ? <Link to="/u/$username" params={{ username: c.username }}>{c.display_name || `@${c.username}`}</Link> : (c.display_name || "Sem nome")}
              {c.verified && <VerifiedBadge size={14} />}
            </p>
            <p className="whitespace-pre-wrap text-sm">{c.body}</p>
          </div>
          {(c.user_id === me || postOwner === me) && <button type="button" onClick={() => remove(c)} aria-label="Apagar comentário" className="self-start p-1 text-muted-foreground hover:text-destructive"><Trash2 size={14} /></button>}
        </div>
      ))}
      <form onSubmit={send} className="flex gap-2">
        <Input value={text} maxLength={1000} onChange={e => setText(e.target.value)} placeholder="Escreva um comentário…" aria-label="Comentário" />
        <Button type="submit" size="icon" disabled={sending || !text.trim()} aria-label="Enviar comentário"><Send /></Button>
      </form>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
