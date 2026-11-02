import { createFileRoute, Link } from "@tanstack/react-router";
import { FollowListDialog, type FollowKind } from "@/components/FollowListDialog";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, Heart, Link2, MapPin, UserPlus, UserCheck, Send, UserRound } from "lucide-react";
import { profileLinkLabel, splitProfileLinks } from "@/lib/profile-link";
import { ProspectTabs } from "@/components/ProspectTabs";
import { PostFeed } from "@/components/PostFeed";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/u/$username")({
  head: ({ params }) => ({ meta: [{ title: `@${params.username} — SemSite` }, { name: "description", content: `Perfil de @${params.username} no SemSite.` }, { property: "og:title", content: `@${params.username} — SemSite` }, { property: "og:description", content: "Perfil no SemSite." }, { property: "og:type", content: "profile" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" }] }),
  component: PublicProfile,
});

type Profile = { id: string; username: string; display_name: string; city: string; bio: string; avatar_url: string; banner_url: string; link_url: string; followers: number; following: number; likes: number; i_follow: boolean; i_liked: boolean; verified?: boolean };

function PublicProfile() {
  const { username } = Route.useParams();
  const [p, setP] = useState<Profile | null>(null);
  const [me, setMe] = useState("");
  const [state, setState] = useState<"loading" | "ok" | "missing">("loading");
  const [busy, setBusy] = useState(false);
  const [list, setList] = useState<FollowKind | null>(null);

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
      <section className="mx-auto mt-4 max-w-2xl">
        {state === "loading" && <p className="mt-6 text-muted-foreground">Carregando…</p>}
        {state === "missing" && <p className="mt-6">Ninguém usa o @{username}.</p>}
        {p && (
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="relative h-32 bg-gradient-to-br from-primary via-primary/80 to-accent sm:h-44">
              {p.banner_url && <img src={p.banner_url} alt="" referrerPolicy="no-referrer" className="size-full object-cover" />}
              <Link to="/pessoas" aria-label="Voltar" className="absolute left-3 top-3 flex size-9 items-center justify-center rounded-full bg-foreground/60 text-background backdrop-blur"><ArrowLeft className="size-5" /></Link>
            </div>
            <div className="px-4 pb-4 sm:px-6">
              <div className="flex items-start justify-between gap-2">
                <div className="relative z-10 -mt-12 shrink-0 rounded-full border-4 border-card bg-card sm:-mt-16">
                  {p.avatar_url
                    ? <img src={p.avatar_url} alt="" width={128} height={128} referrerPolicy="no-referrer" className="size-24 rounded-full object-cover sm:size-32" />
                    : <div className="flex size-24 items-center justify-center rounded-full bg-muted text-primary sm:size-32"><UserRound className="size-10" /></div>}
                </div>
                {p.id === me ? (
                  <Button asChild variant="outline" className="mt-3 rounded-full font-bold"><Link to="/perfil">Editar perfil</Link></Button>
                ) : (
                  <div className="mt-3 flex items-center gap-2">
                    <Button asChild variant="outline" size="icon" className="rounded-full" aria-label="Mensagem"><Link to="/mensagens/$username" params={{ username: p.username }}><Send /></Link></Button>
                    <Button disabled={busy} variant="outline" size="icon" onClick={() => toggle("like")} className="rounded-full" aria-label={p.i_liked ? "Descurtir perfil" : "Curtir perfil"}><Heart className={p.i_liked ? "fill-primary text-primary" : ""} /></Button>
                    <Button disabled={busy} variant={p.i_follow ? "outline" : "default"} onClick={() => toggle("follow")} className="rounded-full px-5 font-bold">
                      {p.i_follow ? <><UserCheck />Seguindo</> : <><UserPlus />Seguir</>}
                    </Button>
                  </div>
                )}
              </div>
              <h1 className="mt-3 flex items-center gap-2 font-sans text-2xl font-extrabold">{p.display_name || "Sem nome"}{p.verified && <VerifiedBadge size={22} />}</h1>
              <p className="text-muted-foreground">@{p.username}</p>
              {p.bio && <p className="mt-3 whitespace-pre-wrap">{p.bio}</p>}
              {splitProfileLinks(p.link_url).length > 0 && <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">{splitProfileLinks(p.link_url).map(l => <a key={l} href={l} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-link hover:underline"><Link2 className="size-4" />{profileLinkLabel(l)}</a>)}</div>}
              {p.city && <p className="mt-3 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="size-4" />{p.city}</p>}
              <div className="mt-3 flex gap-4 text-sm">
                <button type="button" onClick={() => setList("following")} className="hover:underline"><b className="text-foreground">{p.following}</b> <span className="text-muted-foreground">Seguindo</span></button>
                <button type="button" onClick={() => setList("followers")} className="hover:underline"><b className="text-foreground">{p.followers}</b> <span className="text-muted-foreground">Seguidores</span></button>
                <span><b className="text-foreground">{p.likes}</b> <span className="text-muted-foreground">Curtidas</span></span>
              </div>
            </div>
            <div className="flex border-t border-border">
              <span className="flex-1 py-3 text-center font-bold"><span className="inline-block border-b-4 border-primary pb-2">Posts</span></span>
            </div>
          </div>
        )}
        {p && <FollowListDialog username={p.username} kind={list} onClose={() => setList(null)} />}
        {p && <div className="mt-4"><PostFeed onlyUser={p.username} canPost={false} /></div>}
      </section>
    </main>
  );
}
