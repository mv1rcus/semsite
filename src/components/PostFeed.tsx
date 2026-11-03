import { signPostMedia } from "@/lib/post-media.functions";
import { Link, useNavigate } from "@tanstack/react-router";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PostText } from "@/components/PostText";
import { Heart, MessageCircle, Share2, ImagePlus, Send, Trash2, UserRound, X, Repeat2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
  url?: string;
  reposts?: number;
  i_reposted?: boolean;
  reposted_by?: string | null;
  reposted_by_name?: string | null;
};

type Suggestion = { username: string; display_name: string; avatar_url: string };

function ago(d: string) {
  const s = (Date.now() - new Date(d).getTime()) / 1000;
  if (s < 60) return "agora";
  if (s < 3600) return `${Math.floor(s / 60)} min`;
  if (s < 86400) return `${Math.floor(s / 3600)} h`;
  if (s < 604800) return `${Math.floor(s / 86400)} d`;
  return new Date(d).toLocaleDateString("pt-BR", { day: "numeric", month: "short" });
}

export function PostFeed({ onlyUser, tag, canPost = true, followingOnly = false, composerOpen = true, onPosted }: { onlyUser?: string; tag?: string; canPost?: boolean; followingOnly?: boolean; composerOpen?: boolean; onPosted?: () => void }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [me, setMe] = useState("");
  const [loading, setLoading] = useState(true);
  const [body, setBody] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [myAvatar, setMyAvatar] = useState("");
  const [followIds, setFollowIds] = useState<Set<string> | null>(null);
  const [caret, setCaret] = useState(0);
  const [people, setPeople] = useState<Suggestion[]>([]);
  const navigate = useNavigate();

  function openPost(e: React.MouseEvent, id: string) {
    if ((e.target as HTMLElement).closest("a,button,video")) return;
    navigate({ to: "/post/$postId", params: { postId: id } });
  }

  const load = useCallback(async () => {
    setLoading(true);
    const [{ data: { user } }, res] = await Promise.all([
      supabase.auth.getUser(),
      tag ? supabase.rpc("posts_by_tag", { p_tag: tag }) : supabase.rpc("feed_posts", onlyUser ? { only_user: onlyUser } : {}),
    ]);
    setMe(user?.id ?? "");
    if (user && canPost && !tag) supabase.from("profiles").select("avatar_url").eq("id", user.id).maybeSingle().then(({ data: pr }) => setMyAvatar(pr?.avatar_url ?? ""));
    if (user && followingOnly && !tag) { const { data: fl } = await supabase.from("follows").select("following_id").eq("follower_id", user.id); setFollowIds(new Set([user.id, ...(fl ?? []).map(x => x.following_id)])); }
    const rows = (((res.data as unknown) as Post[] | null) ?? []).map(r => ({ ...r, likes: Number(r.likes ?? 0), reposts: Number(r.reposts ?? 0) }));
    const paths = rows.map(r => r.media_path).filter((p): p is string => !!p);
    if (paths.length) {
      const map = await signPostMedia({ data: { paths } }).catch(() => ({} as Record<string, string>));
      rows.forEach(r => { const u = r.media_path ? map[r.media_path] : undefined; if (u) r.url = u; });
    }
    setPosts(rows); setLoading(false);
  }, [onlyUser, tag, followingOnly, canPost]);
  useEffect(() => { load(); }, [load]);

  const mention = useMemo(() => {
    const m = /(?:^|\s)@([0-9a-zA-Z_]{1,30})$/.exec(body.slice(0, caret));
    return m && m[1] ? m[1] : null;
  }, [body, caret]);

  useEffect(() => {
    if (mention === null) { setPeople([]); return; }
    const t = setTimeout(async () => {
      const { data } = await supabase.rpc("search_profiles", { q: mention });
      setPeople(((data as Suggestion[] | null) ?? []).slice(0, 5));
    }, 250);
    return () => clearTimeout(t);
  }, [mention]);

  function pickMention(u: string) {
    const next = body.slice(0, caret).replace(/@([0-9a-zA-Z_]{1,30})$/, "@" + u + " ");
    setBody(next + body.slice(caret));
    setPeople([]);
    requestAnimationFrame(() => {
      const el = document.getElementById("compor-texto") as HTMLTextAreaElement | null;
      if (el) { el.focus(); el.setSelectionRange(next.length, next.length); setCaret(next.length); }
    });
  }

  function pick(f?: File) {
    if (!f) return;
    if (!/^(image|video)\//.test(f.type)) { setError("Escolha uma foto ou um vídeo."); return; }
    if (f.size > 50 * 1024 * 1024) { setError("Arquivo muito grande (máx. 50 MB)."); return; }
    setError(""); setFile(f); setPreview(URL.createObjectURL(f));
  }

  async function publish(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim() && !file) return;
    setSending(true); setError("");
    let media_path: string | null = null, media_type: string | null = null;
    if (file) {
      media_path = `${me}/${crypto.randomUUID()}.${file.name.split(".").pop() || "bin"}`;
      media_type = file.type.startsWith("video") ? "video" : "image";
      const { error: up } = await supabase.storage.from("post-media").upload(media_path, file, { contentType: file.type });
      if (up) { setError("Não deu pra enviar o arquivo. Tente de novo."); setSending(false); return; }
    }
    const { error: ins } = await supabase.from("posts").insert({ body: body.trim().slice(0, 2000), media_path, media_type });
    if (ins) setError("Não deu pra publicar. Tente de novo.");
    else { setBody(""); setFile(null); setPreview(""); setCaret(0); await load(); onPosted?.(); }
    setSending(false);
  }

  async function like(p: Post) {
    if (p.i_liked) await supabase.from("post_likes").delete().eq("user_id", me).eq("post_id", p.id);
    else await supabase.from("post_likes").insert({ post_id: p.id });
    setPosts(ps => ps.map(x => x.id === p.id ? { ...x, i_liked: !x.i_liked, likes: x.likes + (x.i_liked ? -1 : 1) } : x));
  }

  async function repost(p: Post) {
    const now = !p.i_reposted;
    if (now) await supabase.from("post_reposts").insert({ post_id: p.id });
    else await supabase.from("post_reposts").delete().eq("user_id", me).eq("post_id", p.id);
    setPosts(ps => ps.map(x => x.id === p.id ? { ...x, i_reposted: now, reposts: (x.reposts ?? 0) + (now ? 1 : -1) } : x));
  }

  async function remove(p: Post) {
    if (!confirm("Apagar esta publicação?")) return;
    await supabase.from("posts").delete().eq("id", p.id);
    if (p.media_path) await supabase.storage.from("post-media").remove([p.media_path]);
    setPosts(ps => ps.filter(x => x.id !== p.id));
  }

  async function share(p: Post) {
    const url = p.username ? `${window.location.origin}/u/${p.username}` : window.location.origin;
    try { if (navigator.share) await navigator.share({ text: p.body.slice(0, 120), url }); else await navigator.clipboard.writeText(url); } catch { /* cancelado */ }
  }

  const shown = followingOnly && followIds ? posts.filter(p => followIds.has(p.user_id)) : posts;
  const Avatar = ({ src, size = 40 }: { src: string | null; size?: number }) => src
    ? <img src={src} alt="" width={size} height={size} referrerPolicy="no-referrer" className="shrink-0 rounded-full object-cover" style={{ width: size, height: size }} />
    : <div className="flex shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary" style={{ width: size, height: size }}><UserRound className="size-5" /></div>;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      {canPost && composerOpen && (
        <form id="compor" onSubmit={publish} className="relative flex gap-3 border-b border-border p-4">
          <Avatar src={myAvatar} />
          <div className="min-w-0 flex-1 space-y-3">
            <Textarea id="compor-texto" value={body} maxLength={2000} rows={2} autoFocus={!!onPosted}
              onChange={e => { setBody(e.target.value); setCaret(e.target.selectionStart); }}
              onSelect={e => setCaret(e.currentTarget.selectionStart)}
              onKeyUp={e => setCaret(e.currentTarget.selectionStart)}
              onClick={e => setCaret(e.currentTarget.selectionStart)}
              placeholder="O que está acontecendo?" className="resize-none border-0 bg-transparent px-0 text-lg shadow-none focus-visible:ring-0" />
            {preview && (
              <div className="relative">
                {file?.type.startsWith("video") ? <video src={preview} controls className="max-h-80 w-full rounded-lg" /> : <img src={preview} alt="" className="max-h-80 w-full rounded-lg object-cover" />}
                <button type="button" aria-label="Tirar arquivo" onClick={() => { setFile(null); setPreview(""); }} className="absolute right-2 top-2 rounded-full bg-background/90 p-1"><X className="size-4" /></button>
              </div>
            )}
            <div className="flex items-center justify-between gap-2">
              <label className="cursor-pointer rounded-full p-2 text-primary hover:bg-primary/10" title="Foto ou vídeo" aria-label="Foto ou vídeo"><ImagePlus size={20} />
                <input type="file" accept="image/*,video/*" className="sr-only" onChange={e => pick(e.target.files?.[0])} /></label>
              <Button type="submit" disabled={sending || (!body.trim() && !file)} className="gap-2 rounded-full px-5 font-bold"><Send />{sending ? "Postando…" : "Postar"}</Button>
            </div>
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          </div>
          {mention !== null && people.length > 0 && (
            <ul onMouseDown={e => e.preventDefault()} className="absolute left-0 right-0 top-full z-30 mt-1 overflow-hidden rounded-xl border border-border bg-card shadow-xl">
              {people.map(p => (
                <li key={p.username}>
                  <button type="button" onClick={() => pickMention(p.username)} className="flex w-full items-center gap-3 px-3 py-2 text-left transition hover:bg-muted">
                    <Avatar src={p.avatar_url || null} size={32} />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold">{p.display_name || "Sem nome"}</span>
                      <span className="block truncate text-xs text-muted-foreground">@{p.username}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </form>
      )}
      {loading && <p className="p-4 text-sm text-muted-foreground">Carregando publicações…</p>}
      {!loading && shown.length === 0 && <p className="p-6 text-center text-sm text-muted-foreground">{tag ? "Nenhuma publicação com esse assunto ainda." : followingOnly ? "Quem você segue ainda não postou nada." : "Nenhuma publicação ainda."}</p>}
      {shown.map(p => (
        <article key={p.id} className="border-b border-border p-4 transition last:border-0 hover:bg-muted/40">
          {p.reposted_by && (
            <p className="mb-1.5 flex items-center gap-1.5 pl-12 text-xs text-muted-foreground">
              <Repeat2 className="size-3.5 shrink-0" />
              <span className="truncate">{p.reposted_by_name || p.reposted_by} repostou</span>
            </p>
          )}
          <div className="flex gap-3" onClick={e => openPost(e, p.id)} role="link" tabIndex={0} onKeyDown={e => { if (e.key === "Enter") navigate({ to: "/post/$postId", params: { postId: p.id } }); }}>
            {p.username ? <Link to="/u/$username" params={{ username: p.username }}><Avatar src={p.avatar_url} /></Link> : <Avatar src={p.avatar_url} />}
            <div className="min-w-0 flex-1 cursor-pointer">
              <header className="flex items-center gap-1 text-sm">
                <span className="truncate font-bold">{p.display_name || "Sem nome"}</span>
                {p.verified && <VerifiedBadge size={15} />}
                {p.username && <Link to="/u/$username" params={{ username: p.username }} className="truncate text-muted-foreground">@{p.username}</Link>}
                <span className="text-muted-foreground">·</span>
                <time title={new Date(p.created_at).toLocaleString("pt-BR")} className="shrink-0 text-muted-foreground">{ago(p.created_at)}</time>
                {p.user_id === me && <button type="button" onClick={() => remove(p)} aria-label="Apagar publicação" title="Apagar" className="ml-auto rounded-full p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Trash2 size={16} /></button>}
              </header>
              <PostText body={p.body} />
              {p.url && (p.media_type === "video" ? <video src={p.url} controls className="mt-3 max-h-[28rem] w-full rounded-2xl border border-border" /> : <img src={p.url} alt="" loading="lazy" className="mt-3 max-h-[28rem] w-full rounded-2xl border border-border object-cover" />)}
              <footer className="mt-2 flex max-w-sm justify-between text-sm text-muted-foreground">
                <Link to="/post/$postId" params={{ postId: p.id }} aria-label="Comentar" className="group flex items-center gap-1.5 hover:text-primary"><span className="rounded-full p-1.5 group-hover:bg-primary/10"><MessageCircle size={18} /></span></Link>
                <button type="button" onClick={() => repost(p)} aria-label="Repostar" className={`group flex items-center gap-1.5 hover:text-primary ${p.i_reposted ? "text-primary" : ""}`}><span className="rounded-full p-1.5 group-hover:bg-primary/10"><Repeat2 size={18} /></span>{p.reposts || ""}</button>
                <button type="button" onClick={() => like(p)} aria-label="Curtir" className={`group flex items-center gap-1.5 hover:text-primary ${p.i_liked ? "text-primary" : ""}`}><span className="rounded-full p-1.5 group-hover:bg-primary/10"><Heart size={18} className={p.i_liked ? "fill-primary" : ""} /></span>{p.likes || ""}</button>
                <button type="button" onClick={() => share(p)} aria-label="Compartilhar" className="group flex items-center hover:text-primary"><span className="rounded-full p-1.5 group-hover:bg-primary/10"><Share2 size={18} /></span></button>
              </footer>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
