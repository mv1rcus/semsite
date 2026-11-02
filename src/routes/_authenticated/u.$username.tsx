import { createFileRoute, Link } from "@tanstack/react-router";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, Heart, MapPin, UserPlus, UserCheck, UserRound } from "lucide-react";
import { ProspectTabs } from "@/components/ProspectTabs";
import { PostFeed } from "@/components/PostFeed";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/u/$username")({
  head: ({ params }) => ({ meta: [{ title: `@${params.username} — SemSite` }, { name: "description", content: `Perfil de @${params.username} no SemSite.` }, { property: "og:title", content: `@${params.username} — SemSite` }, { property: "og:description", content: "Perfil no SemSite." }, { property: "og:type", content: "profile" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" }] }),
  component: PublicProfile,
});

type Profile = { id: string; username: string; display_name: string; city: string; bio: string; avatar_url: string; followers: number; following: number; likes: number; i_follow: boolean; i_liked: boolean; verified?: boolean };

function PublicProfile() {
  const { username } = Route.useParams();
  const [p, setP] = useState<Profile | null>(null);
  const [me, setMe] = useState("");
  const [state, setState] = useState<"loading" | "ok" | "missing">("loading");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const [{ data: { user } }, { data }] = await Promise.all([supabase.auth.getUser(), supabase.rpc("get_public_profile", { uname: username })]);
    setMe(user?.id ?? "");
    const row = (data as Profile[] | null)?.[0];
    setP(row ?? null); setState(row ? "ok" : "missing");
  }, [username]);
  useEffect(() => { load(); }, [load]);

  async function toggle(kind: "follow" | "like") {
    if (!p || busy) return;
    setBusy(true);
    if (kind === "follow") {
      if (p.i_follow) await supabase.from("follows").delete().eq("follower_id", me).eq("following_id", p.id);
      else await supabase.from("follows").insert({ following_id: p.id });
    } else {
      if (p.i_liked) await supabase.from("profile_likes").delete().eq("liker_id", me).eq("profile_id", p.id);
      else await supabase.from("profile_likes").insert({ profile_id: p.id });
    }
    await load(); setBusy(false);
  }

  return (
    <main className="relative min-h-screen px-4 pb-16">
      <ProspectTabs active="people" />
      <section className="mx-auto mt-6 max-w-2xl">
        <Link to="/pessoas" className="inline-flex items-center gap-1 text-sm text-muted-foreground"><ArrowLeft className="size-4" />Voltar</Link>
        {state === "loading" && <p className="mt-6 text-muted-foreground">Carregando…</p>}
        {state === "missing" && <p className="mt-6">Ninguém usa o @{username}.</p>}
        {p && (
          <div className="glass mt-4 rounded-xl p-6 text-center">
            {p.avatar_url
              ? <img src={p.avatar_url} alt="" width={112} height={112} referrerPolicy="no-referrer" className="mx-auto size-28 rounded-full object-cover" />
              : <div className="mx-auto flex size-28 items-center justify-center rounded-full bg-primary/10 text-primary"><UserRound className="size-10" /></div>}
            <h1 className="mt-3 flex items-center justify-center gap-2 text-4xl">{p.display_name || "Sem nome"}{p.verified && <VerifiedBadge size={26} />}</h1>
            <p className="text-primary">@{p.username}</p>
            {p.city && <p className="mt-1 flex items-center justify-center gap-1 text-sm text-muted-foreground"><MapPin className="size-3.5" />{p.city}</p>}
            {p.bio && <p className="mx-auto mt-3 max-w-md">{p.bio}</p>}
            <div className="mt-5 grid grid-cols-3 gap-2">
              {[["Seguidores", p.followers], ["Seguindo", p.following], ["Curtidas", p.likes]].map(([l, n]) => (
                <div key={l} className="rounded-lg bg-muted/50 p-2"><p className="font-display text-2xl">{n}</p><p className="text-xs text-muted-foreground">{l}</p></div>
              ))}
            </div>
            {p.id === me ? (
              <Button asChild variant="outline" className="mt-5 w-full"><Link to="/perfil">Editar meu perfil</Link></Button>
            ) : (
              <div className="mt-5 grid grid-cols-2 gap-2">
                <Button disabled={busy} variant={p.i_follow ? "outline" : "default"} onClick={() => toggle("follow")} className="gap-2 font-bold">
                  {p.i_follow ? <><UserCheck />Seguindo</> : <><UserPlus />Seguir</>}
                </Button>
                <Button disabled={busy} variant="outline" onClick={() => toggle("like")} className="gap-2 font-bold">
                  <Heart className={p.i_liked ? "fill-primary text-primary" : ""} />{p.i_liked ? "Curtido" : "Curtir"}
                </Button>
              </div>
            )}
          </div>
        )}
        {p && <div className="mt-6"><h2 className="mb-3 text-3xl">Publicações</h2><PostFeed onlyUser={p.username} canPost={false} /></div>}
      </section>
    </main>
  );
}
