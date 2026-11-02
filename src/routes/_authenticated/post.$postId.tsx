import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, Heart, Repeat2, Share2, Trash2, UserRound } from "lucide-react";
import { PostComments } from "@/components/PostComments";
import { PostText } from "@/components/PostText";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { supabase } from "@/integrations/supabase/client";

type Post = {
  id: string;
  user_id: string;
  body: string;
  media_path: string | null;
  media_type: string | null;
  created_at: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  likes: number;
  i_liked: boolean;
  verified?: boolean;
  reposts?: number;
  i_reposted?: boolean;
  url?: string;
};

export const Route = createFileRoute("/_authenticated/post/$postId")({
  head: () => ({
    meta: [
      { title: "Publicação · SemSite" },
      { name: "description", content: "Veja a publicação e participe dos comentários no SemSite." },
      { property: "og:title", content: "Publicação · SemSite" },
      { property: "og:description", content: "Veja a publicação e participe dos comentários no SemSite." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PostPage,
});

function PostPage() {
  const { postId } = Route.useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [me, setMe] = useState("");
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState(0);

  const load = useCallback(async () => {
    setLoading(true);
    const [{ data: { user } }, { data }] = await Promise.all([
      supabase.auth.getUser(),
      supabase.rpc("get_post", { pid: postId }),
    ]);
    setMe(user?.id ?? "");
    const row = ((data as unknown as Post[] | null) ?? [])[0] ?? null;
    if (row?.media_path) {
      const { data: signed } = await supabase.storage.from("post-media").createSignedUrl(row.media_path, 3600);
      if (signed?.signedUrl) row.url = signed.signedUrl;
    }
    setPost(row);
    setLoading(false);
  }, [postId]);
  useEffect(() => { load(); }, [load]);

  async function like() {
    if (!post) return;
    if (post.i_liked) await supabase.from("post_likes").delete().eq("user_id", me).eq("post_id", post.id);
    else await supabase.from("post_likes").insert({ post_id: post.id });
    setPost(p => p ? { ...p, i_liked: !p.i_liked, likes: p.likes + (p.i_liked ? -1 : 1) } : p);
  }

  async function repost() {
    if (!post) return;
    const now = !post.i_reposted;
    if (now) await supabase.from("post_reposts").insert({ post_id: post.id });
    else await supabase.from("post_reposts").delete().eq("user_id", me).eq("post_id", post.id);
    setPost(p => p ? { ...p, i_reposted: now, reposts: (p.reposts ?? 0) + (now ? 1 : -1) } : p);
  }

  async function remove() {
    if (!post || !confirm("Apagar esta publicação?")) return;
    await supabase.from("posts").delete().eq("id", post.id);
    if (post.media_path) await supabase.storage.from("post-media").remove([post.media_path]);
    window.history.back();
  }

  async function share() {
    if (!post) return;
    const url = `${window.location.origin}/post/${post.id}`;
    try { if (navigator.share) await navigator.share({ text: post.body.slice(0, 120), url }); else await navigator.clipboard.writeText(url); } catch { /* cancelado */ }
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-24 pt-4">
      <Link to="/feed" className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Voltar ao Feed
      </Link>
      {loading && <p className="p-4 text-sm text-muted-foreground">Carregando publicação…</p>}
      {!loading && !post && <p className="rounded-2xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">Publicação não encontrada. Talvez tenha sido apagada.</p>}
      {post && (
        <article className="rounded-2xl border border-border bg-card p-4">
          <div className="flex gap-3">
            {post.avatar_url
              ? <img src={post.avatar_url} alt="" width={44} height={44} referrerPolicy="no-referrer" className="size-11 shrink-0 rounded-full object-cover" />
              : <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><UserRound className="size-5" /></div>}
            <div className="min-w-0 flex-1">
              <header className="flex items-center gap-1 text-sm">
                <span className="truncate font-bold">{post.display_name || "Sem nome"}</span>
                {post.verified && <VerifiedBadge size={15} />}
                {post.username && <Link to="/u/$username" params={{ username: post.username }} className="truncate text-muted-foreground">@{post.username}</Link>
                }
                {post.user_id === me && <button type="button" onClick={remove} aria-label="Apagar publicação" title="Apagar" className="ml-auto rounded-full p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Trash2 size={16} /></button>}
              </header>
              <time className="text-xs text-muted-foreground">{new Date(post.created_at).toLocaleString("pt-BR")}</time>
              <div className="mt-1"><PostText body={post.body} /></div>
              {post.url && (post.media_type === "video"
                ? <video src={post.url} controls className="mt-3 max-h-[30rem] w-full rounded-2xl border border-border" />
                : <img src={post.url} alt="" className="mt-3 max-h-[30rem] w-full rounded-2xl border border-border object-cover" />)}
              <footer className="mt-3 flex max-w-sm justify-between border-t border-border pt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">{comments} comentário{comments === 1 ? "" : "s"}</span>
                <button type="button" onClick={repost} aria-label="Repostar" className={`group flex items-center gap-1.5 hover:text-primary ${post.i_reposted ? "text-primary" : ""}`}><span className="rounded-full p-1.5 group-hover:bg-primary/10"><Repeat2 size={18} /></span>{post.reposts || ""}</button>
                <button type="button" onClick={like} aria-label="Curtir" className={`group flex items-center gap-1.5 hover:text-primary ${post.i_liked ? "text-primary" : ""}`}><span className="rounded-full p-1.5 group-hover:bg-primary/10"><Heart size={18} className={post.i_liked ? "fill-primary" : ""} /></span>{post.likes || ""}</button>
                <button type="button" onClick={share} aria-label="Compartilhar" className="group flex items-center hover:text-primary"><span className="rounded-full p-1.5 group-hover:bg-primary/10"><Share2 size={18} /></span></button>
              </footer>
              <PostComments postId={post.id} me={me} postOwner={post.user_id} onCount={setComments} autoFocus />
            </div>
          </div>
        </article>
      )}
    </div>
  );
}
