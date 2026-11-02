import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CalendarDays, Camera, Check, MapPin, Save, Share2, UserRound } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { PostFeed } from "@/components/PostFeed";
import { ProspectTabs } from "@/components/ProspectTabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { loadMessageSettings, saveMessageSettings } from "@/lib/message";

export const Route = createFileRoute("/_authenticated/perfil")({
  head: () => ({ meta: [{ title: "Meu perfil — SemSite" }, { name: "description", content: "Edite seu nome, telefone, cidade e apresentação." }, { property: "og:title", content: "Meu perfil — SemSite" }, { property: "og:description", content: "Seus dados de perfil no SemSite." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" }] }),
  component: Perfil,
});

type Form = { username: string; display_name: string; phone: string; city: string; bio: string; avatar_url: string };
const EMPTY: Form = { username: "", display_name: "", phone: "", city: "", bio: "", avatar_url: "" };

function Perfil() {
  const [form, setForm] = useState<Form>(EMPTY);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [savedUser, setSavedUser] = useState("");
  const [editing, setEditing] = useState(false);
  const [joined, setJoined] = useState("");
  const [stats, setStats] = useState({ followers: 0, following: 0, likes: 0, verified: false });
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState<Form>(EMPTY);
  const [useInMessages, setUseInMessages] = useState(true);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [status, setStatus] = useState<"" | "saving" | "saved" | "error">("");

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id); setEmail(user.email ?? ""); setJoined(user.created_at);
      const { data } = await supabase.from("profiles").select("username, display_name, phone, city, bio, avatar_url").eq("id", user.id).maybeSingle();
      const meta = user.user_metadata ?? {};
      setForm(data ? { ...data, username: data.username ?? "" } : { ...EMPTY, display_name: String(meta["full_name"] ?? meta["name"] ?? ""), avatar_url: String(meta["avatar_url"] ?? "") });
      setSavedUser(data?.username ?? "");
      if (data) setSaved({ ...data, username: data.username ?? "" });
      setLoading(false);
    })();
  }, []);

  async function pickPhoto(file?: File) {
    if (!file || !file.type.startsWith("image/")) return;
    const img = new Image(); img.src = URL.createObjectURL(file); await img.decode();
    const size = 256, c = document.createElement("canvas"); c.width = c.height = size;
    const m = Math.min(img.width, img.height);
    c.getContext("2d")!.drawImage(img, (img.width - m) / 2, (img.height - m) / 2, m, m, 0, 0, size, size);
    update({ avatar_url: c.toDataURL("image/jpeg", 0.82) });
  }

  function update(patch: Partial<Form>) { setForm(f => ({ ...f, ...patch })); setStatus(""); }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    const username = form.username.trim().replace(/^@/, "").toLowerCase();
    if (username && !/^[a-z0-9_.]{3,30}$/.test(username)) { setStatus("error"); setErr("O @ precisa ter 3 a 30 letras, números, ponto ou _ (sem espaço)."); return; }
    const clean = { username: username || null, display_name: form.display_name.trim().slice(0, 60), phone: form.phone.trim().slice(0, 30), city: form.city.trim().slice(0, 80), bio: form.bio.trim().slice(0, 300) };
    const { error } = await supabase.from("profiles").upsert({ id: userId, ...clean, avatar_url: form.avatar_url, updated_at: new Date().toISOString() });
    if (error) { setStatus("error"); setErr(error.code === "23505" ? "Esse @ já está em uso. Escolha outro." : "Não foi possível salvar. Tente de novo."); return; }
    if (useInMessages && clean.display_name) saveMessageSettings({ ...loadMessageSettings(), senderName: clean.display_name });
    setSavedUser(clean.username ?? "");
    setSaved({ ...form, ...clean, username: clean.username ?? "" });
    setStatus("saved"); setTimeout(() => setEditing(false), 600);
  }

  useEffect(() => {
    if (!savedUser) return;
    supabase.rpc("get_public_profile", { uname: savedUser }).then(({ data }) => {
      const r = (data as { followers: number; following: number; likes: number; verified: boolean }[] | null)?.[0];
      if (r) setStats({ followers: Number(r.followers), following: Number(r.following), likes: Number(r.likes), verified: !!r.verified });
    });
  }, [savedUser]);

  async function share() {
    const url = `${window.location.origin}/u/${savedUser}`;
    try { if (navigator.share) await navigator.share({ title: `@${savedUser} no SemSite`, url }); else { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); } } catch { /* cancelado */ }
  }

  const joinedLabel = joined ? new Date(joined).toLocaleDateString("pt-BR", { month: "long", year: "numeric" }) : "";
  const initials = form.display_name.trim().split(/\s+/).map(p => p[0]).slice(0, 2).join("").toUpperCase();

  return (
    <main className="relative min-h-screen px-4 pb-16">
      <ProspectTabs active="profile" />
      <section className="mx-auto mt-6 max-w-2xl overflow-hidden rounded-2xl border border-border bg-card">
        <div className="h-32 bg-gradient-to-br from-primary via-primary/80 to-accent sm:h-44" />
        <div className="px-4 pb-4 sm:px-6">
          <div className="flex items-end justify-between">
            <div className="-mt-12 rounded-full border-4 border-card bg-card sm:-mt-16">
              {saved.avatar_url
                ? <img src={saved.avatar_url} alt="" width={128} height={128} referrerPolicy="no-referrer" className="size-24 rounded-full object-cover sm:size-32" />
                : <div className="flex size-24 items-center justify-center rounded-full bg-primary/10 font-display text-4xl text-primary sm:size-32">{initials || <UserRound />}</div>}
            </div>
          </div>
          <h1 className="mt-3 flex items-center gap-2 font-sans text-2xl font-extrabold">{saved.display_name || "Sem nome"}{stats.verified && <VerifiedBadge size={22} />}</h1>
          <p className="text-muted-foreground">{savedUser ? `@${savedUser}` : "Escolha seu @ em Editar perfil"}</p>
          {saved.bio && <p className="mt-3 whitespace-pre-wrap">{saved.bio}</p>}
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            {saved.city && <span className="flex items-center gap-1"><MapPin className="size-4" />{saved.city}</span>}
            {joinedLabel && <span className="flex items-center gap-1"><CalendarDays className="size-4" />Entrou em {joinedLabel}</span>}
          </div>
          <div className="mt-3 flex gap-4 text-sm">
            <span><b className="text-foreground">{stats.following}</b> <span className="text-muted-foreground">Seguindo</span></span>
            <span><b className="text-foreground">{stats.followers}</b> <span className="text-muted-foreground">Seguidores</span></span>
            <span><b className="text-foreground">{stats.likes}</b> <span className="text-muted-foreground">Curtidas</span></span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button variant="outline" className="rounded-full font-bold" disabled={!savedUser} onClick={share}><Share2 />{copied ? "Link copiado!" : "Compartilhar perfil"}</Button>
            <Button variant="outline" className="rounded-full font-bold" onClick={() => { setForm(saved); setStatus(""); setEditing(true); }}>Editar perfil</Button>
          </div>
        </div>
        <div className="flex border-t border-border">
          <span className="flex-1 border-b-2 border-primary py-3 text-center font-bold">Posts</span>
          <Link to="/feed" className="flex-1 py-3 text-center text-muted-foreground hover:bg-muted">Feed</Link>
        </div>
      </section>
      <section className="mx-auto mt-4 max-w-2xl">
        {savedUser ? <PostFeed key={savedUser} onlyUser={savedUser} canPost={false} /> : !loading && <p className="text-sm text-muted-foreground">Escolha seu @ em Editar perfil pra ver suas publicações aqui.</p>}
      </section>
      <Dialog open={editing} onOpenChange={setEditing}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Editar perfil</DialogTitle></DialogHeader>
          <p className="text-xs text-muted-foreground">O WhatsApp fica só pra você.</p>
          <form onSubmit={save} className="space-y-5">
          <div className="flex items-center gap-4">
            <label className="relative cursor-pointer" title="Trocar foto">
            <input type="file" accept="image/*" className="sr-only" onChange={e => pickPhoto(e.target.files?.[0])} />
            <span className="absolute -bottom-1 -right-1 rounded-full bg-primary p-1.5 text-primary-foreground"><Camera className="size-3.5" /></span>
            {form.avatar_url
              ? <img src={form.avatar_url} alt="" width={64} height={64} referrerPolicy="no-referrer" className="size-16 rounded-full object-cover" />
              : <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 font-display text-2xl text-primary">{initials || <UserRound />}</div>}
            </label>
            <div className="min-w-0">
              <p className="truncate font-semibold">{form.display_name || "Sem nome"}</p>
              <p className="truncate text-sm text-muted-foreground">{email}</p>
            </div>
          </div>

          <label className="block space-y-1.5"><span className="text-sm font-semibold">Seu @ (pra outras pessoas te acharem)</span>
            <Input disabled={loading} value={form.username} maxLength={31} autoCapitalize="none" onChange={e => update({ username: e.target.value.replace(/\s/g, "").toLowerCase() })} placeholder="@seunome" /></label>
          <label className="block space-y-1.5"><span className="text-sm font-semibold">Nome de usuário</span>
            <Input disabled={loading} value={form.display_name} maxLength={60} onChange={e => update({ display_name: e.target.value })} placeholder="Como você quer ser chamado" /></label>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block space-y-1.5"><span className="text-sm font-semibold">WhatsApp</span>
              <Input disabled={loading} value={form.phone} maxLength={30} inputMode="tel" onChange={e => update({ phone: e.target.value })} placeholder="(11) 99999-9999" /></label>
            <label className="block space-y-1.5"><span className="text-sm font-semibold">Cidade</span>
              <Input disabled={loading} value={form.city} maxLength={80} onChange={e => update({ city: e.target.value })} placeholder="Ex: Campinas, SP" /></label>
          </div>
          <label className="block space-y-1.5"><span className="text-sm font-semibold">Sobre você</span>
            <Textarea disabled={loading} value={form.bio} maxLength={300} rows={3} onChange={e => update({ bio: e.target.value })} placeholder="Ex: Crio sites rápidos para negócios locais." /></label>
          <label className="flex items-center gap-2 text-sm"><Checkbox checked={useInMessages} onCheckedChange={v => setUseInMessages(v === true)} />Usar meu nome nas mensagens do WhatsApp</label>

          <Button type="submit" size="lg" disabled={loading || status === "saving"} className="w-full gap-2 font-bold">
            {status === "saved" ? <><Check />Perfil salvo</> : <><Save />{status === "saving" ? "Salvando…" : "Salvar perfil"}</>}
          </Button>
          {status === "error" && <p role="alert" className="text-sm text-destructive">{err}</p>}
        </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
