import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Save, UserRound } from "lucide-react";
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

type Form = { display_name: string; phone: string; city: string; bio: string; avatar_url: string };
const EMPTY: Form = { display_name: "", phone: "", city: "", bio: "", avatar_url: "" };

function Perfil() {
  const [form, setForm] = useState<Form>(EMPTY);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [useInMessages, setUseInMessages] = useState(true);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<"" | "saving" | "saved" | "error">("");

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id); setEmail(user.email ?? "");
      const { data } = await supabase.from("profiles").select("display_name, phone, city, bio, avatar_url").eq("id", user.id).maybeSingle();
      const meta = user.user_metadata ?? {};
      setForm(data ?? { ...EMPTY, display_name: String(meta["full_name"] ?? meta["name"] ?? ""), avatar_url: String(meta["avatar_url"] ?? "") });
      setLoading(false);
    })();
  }, []);

  function update(patch: Partial<Form>) { setForm(f => ({ ...f, ...patch })); setStatus(""); }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    const clean = { display_name: form.display_name.trim().slice(0, 60), phone: form.phone.trim().slice(0, 30), city: form.city.trim().slice(0, 80), bio: form.bio.trim().slice(0, 300) };
    const { error } = await supabase.from("profiles").upsert({ id: userId, ...clean, avatar_url: form.avatar_url, updated_at: new Date().toISOString() });
    if (error) { setStatus("error"); return; }
    if (useInMessages && clean.display_name) saveMessageSettings({ ...loadMessageSettings(), senderName: clean.display_name });
    setStatus("saved");
  }

  const initials = form.display_name.trim().split(/\s+/).map(p => p[0]).slice(0, 2).join("").toUpperCase();

  return (
    <main className="relative min-h-screen px-4 pb-16">
      <ProspectTabs active="profile" />
      <section className="mx-auto mt-8 max-w-2xl">
        <h1 className="text-5xl">Meu <span className="text-primary">perfil</span></h1>
        <p className="mt-1 text-muted-foreground">Seus dados aparecem só pra você e podem ir nas suas mensagens.</p>

        <form onSubmit={save} className="glass mt-6 space-y-5 rounded-xl p-5 sm:p-7">
          <div className="flex items-center gap-4">
            {form.avatar_url
              ? <img src={form.avatar_url} alt="" width={64} height={64} referrerPolicy="no-referrer" className="size-16 rounded-full object-cover" />
              : <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 font-display text-2xl text-primary">{initials || <UserRound />}</div>}
            <div className="min-w-0">
              <p className="truncate font-semibold">{form.display_name || "Sem nome"}</p>
              <p className="truncate text-sm text-muted-foreground">{email}</p>
            </div>
          </div>

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
          {status === "error" && <p role="alert" className="text-sm text-destructive">Não foi possível salvar. Tente de novo.</p>}
        </form>
      </section>
    </main>
  );
}
