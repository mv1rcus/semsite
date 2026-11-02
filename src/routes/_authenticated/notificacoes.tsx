import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, MessageCircle, UserPlus, UserRound } from "lucide-react";
import { ProspectTabs } from "@/components/ProspectTabs";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { supabase } from "@/integrations/supabase/client";
import { markNotificationsSeen } from "@/lib/social-unread";

export const Route = createFileRoute("/_authenticated/notificacoes")({
  head: () => ({ meta: [{ title: "Notificações — SemSite" }, { name: "description", content: "Quem te seguiu, curtiu e comentou no SemSite." }, { property: "og:title", content: "Notificações — SemSite" }, { property: "og:description", content: "Suas notificações no SemSite." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" }] }),
  component: Notificacoes,
});

type N = { kind: "follow" | "profile_like" | "post_like" | "comment"; created_at: string; username: string | null; display_name: string; avatar_url: string; verified: boolean; post_id: string | null; snippet: string | null };

const TEXT: Record<N["kind"], string> = { follow: "começou a seguir você", profile_like: "curtiu seu perfil", post_like: "curtiu sua publicação", comment: "comentou na sua publicação" };
const ICON = { follow: UserPlus, profile_like: Heart, post_like: Heart, comment: MessageCircle };

function Notificacoes() {
  const [items, setItems] = useState<N[] | null>(null);
  const [seenBefore, setSeenBefore] = useState(0);
  useEffect(() => {
    setSeenBefore(markNotificationsSeen());
    supabase.rpc("my_notifications").then(({ data }) => setItems((data as N[] | null) ?? []));
  }, []);

  return (
    <main className="relative min-h-screen px-4 pb-16">
      <ProspectTabs active="notifications" />
      <section className="mx-auto mt-6 max-w-2xl">
        <h1 className="text-5xl">Notifica<span className="text-primary">ções</span></h1>
        <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card">
          {items === null && <p className="p-4 text-sm text-muted-foreground">Carregando…</p>}
          {items?.length === 0 && <p className="p-4 text-sm text-muted-foreground">Nada por aqui ainda. Quando alguém te seguir, curtir ou comentar, aparece aqui.</p>}
          {items?.map((n, i) => {
            const Icon = ICON[n.kind];
            const isNew = new Date(n.created_at).getTime() > seenBefore;
            return (
              <div key={i} className={`flex gap-3 border-b border-border p-4 last:border-0 ${isNew ? "bg-primary/5" : ""}`}>
                <Icon className={`mt-1 size-5 shrink-0 ${n.kind === "follow" || n.kind === "comment" ? "text-primary" : "fill-primary text-primary"}`} />
                <div className="min-w-0 flex-1">
                  {n.avatar_url ? <img src={n.avatar_url} alt="" width={32} height={32} referrerPolicy="no-referrer" className="size-8 rounded-full object-cover" /> : <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary"><UserRound className="size-4" /></div>}
                  <p className="mt-1">
                    {n.username ? <Link to="/u/$username" params={{ username: n.username }} className="font-bold">{n.display_name || `@${n.username}`}</Link> : <b>{n.display_name || "Alguém"}</b>}
                    {n.verified && <> <VerifiedBadge size={14} /></>} {TEXT[n.kind]}
                  </p>
                  {n.snippet && <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{n.kind === "comment" ? `“${n.snippet}”` : n.snippet}</p>}
                  <time className="text-xs text-muted-foreground">{new Date(n.created_at).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</time>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
