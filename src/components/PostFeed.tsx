import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Heart, ImagePlus, Send, Trash2, UserRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

type Post = { id: string; user_id: string; body: string; media_path: string | null; media_type: string | null; created_at: string; username: string | null; display_name: string | null; avatar_url: string | null; likes: number; i_liked: boolean; url?: string };

export function PostFeed({ onlyUser, canPost = true }: { onlyUser?: string; canPost?: boolean }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [me, setMe] = useState("");
  const [loading, setLoading] = useState(true);
  const [body, setBody] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    const [{ data: { user } }, { data }] = await Promise.all([supabase.auth.getUser(), supabase.rpc("feed_posts", { only_user: onlyUser ?? undefined })]);
    setMe(user?.id ?? "");
    const rows = (data as Post[] | null) ?? [];
    const paths = rows.map(r => r.media_path).filter((p): p is string => !!p);
    if (paths.length) {
      const { data: signed } = await supabase.storage.from("post-media").createSignedUrls(paths, 3600);
      const map = new Map(signed?.map(s => [s.path, s.signedUrl]));
      rows.forEach(r => { if (r.media_path) r.url = map.get(r.media_path) ?? undefined; });
    }
    setPosts(rows); setLoading(false);
  }, [onlyUser]);
  useEffect(() => { load(); }, [load]);

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
    else { setBody(""); setFile(null); setPreview(""); await load(); }
    setSending(false);
  }

  async function like(p: Post) {
    if (p.i_liked) await supabase.from("post_likes").delete().eq("user_id", me).eq("post_id", p.id);
    else await supabase.from("post_likes").insert({ post_id: p.id });
    setPosts(ps => ps.map(x => x.id === p.id ? { ...x, i_liked: !x.i_liked, likes: x.likes + (x.i_liked ? -1 : 1) } : x));
  }

  async function remove(p: Post) {
    if (!confirm("Apagar esta publicação?")) return;
    await supabase.from("posts").delete().eq("id", p.id);
    if (p.media_path) await supabase.storage.from("post-media").remove([p.media_path]);
    setPosts(ps => ps.filter(x => x.id !== p.id));
  }

  return (
    <div className="space-y-4">
      {canPost && (
        <form onSubmit={publish} className="glass space-y-3 rounded-xl p-4">
          <Textarea value={body} maxLength={2000} rows={3} onChange={e => setBody(e.target.value)} placeholder="O que você quer compartilhar?" />
          {preview && (
            <div className="relative">
              {file?.type.startsWith("video") ? <video src={preview} controls className="max-h-80 w-full rounded-lg" /> : <img src={preview} alt="" className="max-h-80 w-full rounded-lg object-cover" />}
              <button type="button" aria-label="Tirar arquivo" onClick={() => { setFile(null); setPreview(""); }} className="absolute right-2 top-2 rounded-full bg-background/90 p-1"><X className="size-4" /></button>
            </div>
          )}
          <div className="flex items-center justify-between gap-2">
            <label className="tab-pill cursor-pointer"><ImagePlus size={16} />Foto ou vídeo
              <input type="file" accept="image/*,video/*" className="sr-only" onChange={e => pick(e.target.files?.[0])} /></label>
            <Button type="submit" disabled={sending || (!body.trim() && !file)} className="gap-2 font-bold"><Send />{sending ? "Publicando…" : "Publicar"}</Button>
          </div>
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        </form>
      )}
      {loading && <p className="text-sm text-muted-foreground">Carregando publicações…</p>}
      {!loading && posts.length === 0 && <p className="text-sm text-muted-foreground">Nenhuma publicação ainda.</p>}
      {posts.map(p => (
        <article key={p.id} className="glass rounded-xl p-4">
          <header className="flex items-center gap-3">
            {p.avatar_url ? <img src={p.avatar_url} alt="" width={40} height={40} referrerPolicy="no-referrer" className="size-10 rounded-full object-cover" /> : <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary"><UserRound className="size-5" /></div>}
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{p.display_name || "Sem nome"}</p>
              {p.username ? <Link to="/u/$username" params={{ username: p.username }} className="text-sm text-primary">@{p.username}</Link> : null}
            </div>
            <time className="text-xs text-muted-foreground">{new Date(p.created_at).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</time>
          </header>
          {p.body && <p className="mt-3 whitespace-pre-wrap">{p.body}</p>}
          {p.url && (p.media_type === "video" ? <video src={p.url} controls className="mt-3 max-h-[28rem] w-full rounded-lg" /> : <img src={p.url} alt="" loading="lazy" className="mt-3 max-h-[28rem] w-full rounded-lg object-cover" />)}
          <footer className="mt-3 flex items-center gap-2">
            <button type="button" onClick={() => like(p)} className="tab-pill"><Heart size={16} className={p.i_liked ? "fill-primary text-primary" : ""} />{p.likes}</button>
            {p.user_id === me && <button type="button" onClick={() => remove(p)} aria-label="Apagar" className="tab-pill ml-auto"><Trash2 size={16} /></button>}
          </footer>
        </article>
      ))}
    </div>
  );
}
