import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Copy, ExternalLink, Loader2, MessageCircle, PanelsTopLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { demoSchema, draftForClient, type Demonstration } from "@/lib/demonstrations";
import { DemoSite } from "@/components/DemoSite";
import { ProspectTabs } from "@/components/ProspectTabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { OceanScene } from "@/components/OceanScene";
export const Route = createFileRoute("/demonstracoes")({
  head: () => ({ meta: [{ title: "Criar demonstração — Caça Clientes" }, { name: "description", content: "Prepare uma proposta visual de site personalizada para seu cliente." }, { property: "og:title", content: "Demonstrações de sites — Caça Clientes" }, { property: "og:description", content: "Crie uma demonstração relacionada ao negócio do cliente e compartilhe o link." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Demonstracoes,
});
const blank = draftForClient({ id: "", name: "", category: "Serviços locais", address: "", phone: null, intlPhone: null, rating: null, reviews: null, mapsUrl: null });
type Saved = { id: string; name: string };
function Demonstracoes() {
  const [demo, setDemo] = useState<Demonstration>(blank);
  const [saved, setSaved] = useState<Saved[]>([]);
  const [id, setId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const [origin, setOrigin] = useState("");
  useEffect(() => {
    setOrigin(window.location.hostname === "localhost" ? window.location.origin : "https://clienteprospectar.lovable.app");
    try {
      const draft = sessionStorage.getItem("site-demo-draft");
      if (draft) { const parsed = demoSchema.safeParse(JSON.parse(draft)); if (parsed.success) setDemo(parsed.data); sessionStorage.removeItem("site-demo-draft"); }
      const list: unknown = JSON.parse(localStorage.getItem("site-demo-links") || "[]");
      if (Array.isArray(list)) setSaved(list.filter((item): item is Saved => !!item && typeof item.id === "string" && typeof item.name === "string"));
    } catch { /* Storage is optional. */ }
  }, []);
  const link = id ? `${origin}/demo/${id}` : "";
  function edit(key: keyof Demonstration, value: string) { setDemo((old) => ({ ...old, [key]: value })); setId(null); setNotice(""); }
  async function save() {
    if (loading) return;
    const parsed = demoSchema.safeParse(demo);
    if (!parsed.success) { setNotice("Preencha o nome, o segmento, a chamada e a descrição antes de criar o link."); return; }
    setLoading(true); setNotice("");
    try {
      const { data, error } = await supabase.from("site_demonstrations").insert(parsed.data).select("id,name").single();
      if (error || !data) throw new Error("Não foi possível salvar a demonstração. Tente novamente.");
      setId(data.id);
      const updated = [data, ...saved].slice(0, 30); setSaved(updated);
      try { localStorage.setItem("site-demo-links", JSON.stringify(updated)); } catch { /* Link remains available. */ }
      setNotice("Demonstração salva. O link está pronto para enviar.");
    } catch (e) { setNotice(e instanceof Error ? e.message : "Não foi possível criar o link."); }
    finally { setLoading(false); }
  }
  async function copy() { try { await navigator.clipboard.writeText(link); setNotice("Link copiado!"); } catch { setNotice("Selecione o link abaixo e copie para enviar."); } }
  return <main className="min-h-screen px-4 py-8 sm:px-8"><OceanScene /><header className="mx-auto flex max-w-6xl items-center justify-between gap-4"><Link to="/" className="font-display font-bold text-primary">Caça Clientes</Link><span className="text-sm text-muted-foreground">Estúdio de demonstrações</span></header><ProspectTabs active="demos" />
    <section className="mx-auto mt-8 max-w-6xl"><h1 className="text-3xl font-bold">Uma ideia de site para seu cliente</h1>
      <div className="mt-6 grid items-start gap-8 lg:grid-cols-[320px_minmax(0,1fr)]"><form onSubmit={(e) => { e.preventDefault(); save(); }} className="space-y-4">
        {([{ key: "name", label: "Nome do cliente", max: 160 }, { key: "category", label: "Segmento", max: 120 }, { key: "address", label: "Endereço", max: 400 }, { key: "phone", label: "Telefone", max: 40 }, { key: "headline", label: "Chamada", max: 200 }] as const).map((field) => <label key={field.key} className="block text-sm"><span className="mb-2 block">{field.label}</span><Input aria-label={field.label} value={demo[field.key]} maxLength={field.max} disabled={loading} onChange={(e) => edit(field.key, e.target.value)} /></label>)}
        <label className="block text-sm"><span className="mb-2 block">Descrição</span><Textarea aria-label="Descrição" value={demo.description} maxLength={1000} disabled={loading} onChange={(e) => edit("description", e.target.value)} /></label>
        <Button type="submit" className="w-full" disabled={loading || !!id}>{loading ? <Loader2 className="animate-spin" /> : <PanelsTopLeft />}Criar link da demonstração</Button>
        {notice && <p role="status" className="text-sm text-primary">{notice}</p>}
        {id && <div className="space-y-3"><Input aria-label="Link da demonstração" readOnly value={link} /><div className="flex flex-wrap gap-2"><Button type="button" variant="outline" onClick={copy}><Copy />Copiar link</Button><Button asChild variant="outline"><Link to="/demo/$id" params={{ id }}><ExternalLink />Abrir</Link></Button><Button asChild variant="whatsapp"><a href={`https://wa.me/?text=${encodeURIComponent(`Olá! Preparei uma ideia de site para ${demo.name}, sem compromisso: ${link}`)}`} target="_blank" rel="noreferrer"><MessageCircle />Enviar</a></Button></div></div>}
      </form><div className="min-w-0 overflow-hidden rounded-lg border"><DemoSite demo={{ ...demo, name: demo.name || "Nome do seu cliente" }} /></div></div>
      {saved.length > 0 && <section className="mt-10 border-t pt-6"><h2 className="text-xl font-semibold">Demonstrações criadas neste navegador</h2><div className="mt-4 flex flex-wrap gap-2">{saved.map((item) => <Button key={item.id} asChild variant="outline" className="h-auto whitespace-normal text-left"><Link to="/demo/$id" params={{ id: item.id }}><ExternalLink />{item.name}</Link></Button>)}</div></section>}
    </section>
  </main>;
}