import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { UserRound } from "lucide-react";
import { ProspectTabs } from "@/components/ProspectTabs";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/mensagens/")({
  head: () => ({ meta: [{ title: "Mensagens diretas — SemSite" }, { name: "description", content: "Suas conversas privadas no SemSite." }, { property: "og:title", content: "Mensagens diretas — SemSite" }, { property: "og:description", content: "Converse com outras pessoas do SemSite." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" }] }),
  component: Inbox,
});

type T = { other_id: string; username: string | null; display_name: string; avatar_url: string; verified: boolean; last_body: string; last_at: string; last_from_me: boolean; unread: number };

function Inbox() {
  const [items, setItems] = useState<T[] | null>(null);
  useEffect(() => {
    const load = () => supabase.rpc("dm_threads").then(({ data }) => setItems((data as T[] | null) ?? []));
    load();
    const ch = supabase.channel(`dm-inbox-${Math.random().toString(36).slice(2)}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "direct_messages" }, load).subscribe();
    return () => { supabase.removeChannel(ch); };
  }, []);

  return (
    <main className="relative min-h-screen px-4 pb-16">
      <ProspectTabs active="dm" />
      <section className="mx-auto mt-6 max-w-2xl">
        <h1 className="text-5xl">Mensa<span className="text-primary">gens</span></h1>
        <p className="mt-1 text-sm text-muted-foreground">Pra começar uma conversa, abra o perfil de alguém e toque em <b>Mensagem</b>.</p>
        <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card">
          {items === null && <p className="p-4 text-sm text-muted-foreground">Carregando…</p>}
          {items?.length === 0 && <p className="p-4 text-sm text-muted-foreground">Nenhuma conversa ainda.</p>}
          {items?.filter(t => t.username).map(t => (
            <Link key={t.other_id} to="/mensagens/$username" params={{ username: t.username! }} className="flex items-center gap-3 border-b border-border p-4 last:border-0 hover:bg-muted">
              {t.avatar_url ? <img src={t.avatar_url} alt="" width={48} height={48} referrerPolicy="no-referrer" className="size-12 rounded-full object-cover" /> : <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary"><UserRound className="size-5" /></div>}
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1 truncate"><b>{t.display_name || `@${t.username}`}</b>{t.verified && <VerifiedBadge size={14} />}<span className="truncate text-sm text-muted-foreground">@{t.username}</span></p>
                <p className={`truncate text-sm ${Number(t.unread) > 0 ? "font-bold" : "text-muted-foreground"}`}>{t.last_from_me ? "Você: " : ""}{t.last_body}</p>
              </div>
              {Number(t.unread) > 0 && <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">{t.unread}</span>}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
