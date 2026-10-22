import { useEffect, useState } from "react";
import { Sparkles, Building2, ArrowRight, Copy, MessageCircle, Target, ListChecks } from "lucide-react";
import { ProspectTabs } from "@/components/ProspectTabs";
import { OceanScene } from "@/components/OceanScene";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { businessAnalysisInput, analysisMessage, analysisWhatsApp, type BusinessAnalysis, type BusinessAnalysisInput } from "@/lib/business-analysis";
import { analyzeBusinessLocally } from "@/lib/business-analysis-local";
import { loadMessageSettings } from "@/lib/message";

const initial: BusinessAnalysisInput = { name: "", segment: "", city: "", website: "unknown", services: "", social: "", notes: "", senderName: "" };

// Análise 100% local: calcula oportunidades e mensagem apenas com os dados digitados,
// sem chamar IA e sem consumir saldo. A versão com IA fica reservada para o plano Pro.
export function AnalysisStudio() {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ name: string; analysis: BusinessAnalysis } | null>(null);
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [notice, setNotice] = useState("");
  useEffect(() => { setForm(previous => ({ ...previous, senderName: loadMessageSettings().senderName })); }, []);
  function update(key: keyof BusinessAnalysisInput, value: string) { setForm(previous => ({ ...previous, [key]: value })); }
  function submit(event: React.FormEvent) {
    event.preventDefault();
    const parsed = businessAnalysisInput.safeParse(form);
    if (!parsed.success) { setError(parsed.error.issues[0]?.message || "Revise os dados do estabelecimento."); return; }
    setError(""); setNotice("");
    const analysis = analyzeBusinessLocally(parsed.data);
    setResult({ name: parsed.data.name, analysis });
    setMessage(analysisMessage(analysis.opening, parsed.data.senderName));
  }
  async function copy() {
    try { await navigator.clipboard.writeText(message); setNotice("Mensagem copiada."); }
    catch { setNotice("Não foi possível copiar. Selecione e copie o texto da mensagem."); }
  }
  function whatsapp() {
    const url = analysisWhatsApp(phone, message);
    if (!url) { setNotice("Informe um WhatsApp com DDD ou código do país."); return; }
    window.open(url, "_blank", "noopener,noreferrer");
    setNotice("Mensagem preparada. Confirme o envio no WhatsApp.");
  }
  return <main className="relative min-h-screen px-4 py-8 sm:px-8">
    <OceanScene /><ProspectTabs active="analysis" />
    <section className="mx-auto mt-8 max-w-6xl">
      <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-accent"><Sparkles className="size-4" />Inteligência comercial</p>
      <h1 className="text-3xl font-bold">Um negócio. Uma boa proposta.</h1>
      <p className="mt-3 text-sm text-muted-foreground">Oportunidades e hipóteses calculadas a partir dos dados informados — sem garantia de vendas e sem uso de IA.</p>
      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <form onSubmit={submit} className="min-w-0 space-y-5">
          <h2 className="flex items-center gap-2 text-xl font-semibold"><Building2 className="size-5 text-accent" />Dados do estabelecimento</h2>
          <div className="space-y-5">
            <label className="block space-y-2"><span className="text-sm font-semibold">Nome do estabelecimento *</span><Input required minLength={2} maxLength={120} value={form.name} onChange={e => update("name", e.target.value)} placeholder="Ex: Pizzaria Bella Vista" /></label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block space-y-2"><span className="text-sm font-semibold">Segmento *</span><Input required minLength={2} maxLength={100} value={form.segment} onChange={e => update("segment", e.target.value)} placeholder="Ex: Pizzaria, advocacia…" /></label>
              <label className="block space-y-2"><span className="text-sm font-semibold">Cidade</span><Input maxLength={120} value={form.city} onChange={e => update("city", e.target.value)} placeholder="Cidade, estado" /></label>
            </div>
            <div className="space-y-2"><span id="website-label" className="text-sm font-semibold">Site atual</span><Select value={form.website} onValueChange={value => update("website", value)}><SelectTrigger aria-labelledby="website-label"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="unknown">Não sei se possui site</SelectItem><SelectItem value="none">Não possui site</SelectItem><SelectItem value="existing">Já possui site</SelectItem></SelectContent></Select></div>
            <label className="block space-y-2"><span className="text-sm font-semibold">Produtos ou serviços</span><Textarea rows={3} maxLength={1200} value={form.services} onChange={e => update("services", e.target.value)} placeholder="O que o estabelecimento oferece?" /></label>
            <label className="block space-y-2"><span className="text-sm font-semibold">Presença nas redes sociais</span><Input maxLength={500} value={form.social} onChange={e => update("social", e.target.value)} placeholder="Ex: Instagram com fotos; pedidos por WhatsApp" /></label>
            <label className="block space-y-2"><span className="text-sm font-semibold">Outras informações</span><Textarea rows={3} maxLength={1500} value={form.notes} onChange={e => update("notes", e.target.value)} placeholder="Público, diferenciais ou dificuldades que você conhece" /></label>
            <label className="block space-y-2"><span className="text-sm font-semibold">Seu nome</span><Input maxLength={80} value={form.senderName} onChange={e => update("senderName", e.target.value)} placeholder="Nome para a apresentação" /></label>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">Informe apenas dados comerciais, sem dados sensíveis. A análise é feita no seu navegador, sem uso de IA e sem custo.</p>
          <Button type="submit" size="lg" className="w-full"><Sparkles />{result ? "Gerar nova análise" : "Identificar oportunidades"}<ArrowRight /></Button>
          {error && <p role="alert" className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm">{error}</p>}
        </form>
        <div className="min-w-0 border-t pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          {!result ? <div className="py-12"><Target className="mb-5 size-12 text-accent" /><h2 className="text-2xl font-semibold">Oportunidades do estabelecimento</h2><div className="mt-8 space-y-4 text-sm text-muted-foreground"><p className="border-b pb-4">Possibilidades para o site</p><p className="border-b pb-4">Seções adequadas ao segmento</p><p>Abordagem comercial e mensagem de WhatsApp</p></div></div> : <div className="space-y-7 break-words">
            <div><p className="text-xs text-accent">Análise local · baseada só nos dados informados — confirme as hipóteses</p><h2 className="mt-2 text-2xl font-semibold">{result.name}</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{result.analysis.summary}</p></div>
            <section><h3 className="flex items-center gap-2 text-lg font-semibold"><Target className="size-5 text-primary" />Oportunidades de site</h3><div className="mt-4 space-y-3">{result.analysis.opportunities.map((item, index) => <article key={index} className="rounded-lg border bg-card p-4"><h4 className="font-semibold">{item.title}</h4><p className="mt-2 text-sm leading-relaxed">{item.benefit}</p><p className="mt-3 text-xs leading-relaxed text-muted-foreground">Base da sugestão: {item.basis}</p></article>)}</div></section>
            <section className="border-t pt-5"><h3 className="flex items-center gap-2 text-lg font-semibold"><ListChecks className="size-5 text-accent" />Seções sugeridas</h3><ul className="mt-3 list-inside list-disc space-y-2 text-sm text-muted-foreground">{result.analysis.sections.map((item, index) => <li key={index}>{item}</li>)}</ul></section>
            <section className="border-t pt-5"><h3 className="text-lg font-semibold">Como iniciar a conversa</h3><p className="mt-3 text-sm leading-relaxed">{result.analysis.approach}</p><h4 className="mt-5 text-sm font-semibold">Perguntas para confirmar</h4><ul className="mt-3 list-inside list-disc space-y-2 text-sm text-muted-foreground">{result.analysis.questions.map((item, index) => <li key={index}>{item}</li>)}</ul></section>
            <section className="border-t pt-5"><label className="block space-y-3"><span className="flex items-center gap-2 text-lg font-semibold"><MessageCircle className="size-5 text-accent" />Abordagem personalizada</span><Textarea rows={8} value={message} maxLength={3000} onChange={e => setMessage(e.target.value)} /></label><label className="mt-4 block space-y-2"><span className="text-sm font-semibold">WhatsApp do estabelecimento</span><Input type="tel" maxLength={25} value={phone} onChange={e => setPhone(e.target.value)} placeholder="DDD + número" /></label><div className="mt-4 flex flex-wrap gap-2"><Button variant="outline" onClick={copy} disabled={!message.trim()}><Copy />Copiar mensagem</Button><Button onClick={whatsapp} disabled={!message.trim()}><MessageCircle />Abrir WhatsApp</Button></div>{notice && <p role="status" className="mt-3 text-sm text-accent">{notice}</p>}</section>
          </div>}
        </div>
      </div>
    </section>
  </main>;
}
