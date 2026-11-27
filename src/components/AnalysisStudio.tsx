import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Sparkles, Building2, ArrowRight, Copy, MessageCircle, Target, ListChecks, History, Trash2, PanelsTopLeft, UserPlus } from "lucide-react";
import { ProspectTabs } from "@/components/ProspectTabs";
import { OceanScene } from "@/components/OceanScene";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { businessAnalysisInput, analysisMessage, analysisWhatsApp, type BusinessAnalysisInput } from "@/lib/business-analysis";
import { analyzeBusinessLocally, withSignature, type LocalAnalysis } from "@/lib/business-analysis-local";
import { ANALYSIS_HISTORY_KEY, ANALYSIS_PREFILL_KEY, leadFromAnalysis, parseHistory, parsePrefill, removeEntry, saveEntry, type AnalysisEntry } from "@/lib/analysis-history";
import { draftForClient } from "@/lib/demonstrations";
import { useFollowUp } from "@/lib/use-follow-up";
import { loadMessageSettings } from "@/lib/message";

const initial: BusinessAnalysisInput = { name: "", segment: "", city: "", website: "unknown", services: "", social: "", notes: "", senderName: "" };

// Análise 100% local: calcula oportunidades e mensagem apenas com os dados digitados,
// sem chamar IA e sem consumir saldo. A versão com IA fica reservada para o plano Pro.
export function AnalysisStudio() {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const followUp = useFollowUp();
  const [result, setResult] = useState<{ name: string; analysis: LocalAnalysis; input: BusinessAnalysisInput } | null>(null);
  const [opening, setOpening] = useState(0);
  const [leadId, setLeadId] = useState<string | undefined>();
  const [history, setHistory] = useState<AnalysisEntry[]>([]);
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [notice, setNotice] = useState("");
  function readHistory() { try { return parseHistory(localStorage.getItem(ANALYSIS_HISTORY_KEY)); } catch { return []; } }
  function writeHistory(list: AnalysisEntry[]) { setHistory(list); try { localStorage.setItem(ANALYSIS_HISTORY_KEY, JSON.stringify(list)); } catch { /* sem storage: segue sem histórico */ } }
  function run(input: BusinessAnalysisInput, phoneValue: string, id?: string) {
    const analysis = analyzeBusinessLocally(input);
    setResult({ name: input.name, analysis, input }); setOpening(0); setLeadId(id);
    setMessage(analysisMessage(analysis.openings[0]!.text, input.senderName));
    writeHistory(saveEntry(readHistory(), input, phoneValue, id));
  }
  useEffect(() => {
    const senderName = loadMessageSettings().senderName;
    setHistory(readHistory());
    let prefill = null;
    try { prefill = parsePrefill(sessionStorage.getItem(ANALYSIS_PREFILL_KEY)); sessionStorage.removeItem(ANALYSIS_PREFILL_KEY); } catch { /* sem storage */ }
    if (!prefill) { setForm(previous => ({ ...previous, senderName })); return; }
    const filled = { ...initial, ...prefill.form, senderName };
    setForm(filled); setPhone(prefill.phone);
    const parsed = businessAnalysisInput.safeParse(filled);
    if (parsed.success) run(parsed.data, prefill.phone, prefill.leadId); else setLeadId(prefill.leadId);
  }, []);
  function update(key: keyof BusinessAnalysisInput, value: string) { setForm(previous => ({ ...previous, [key]: value })); }
  function submit(event: React.FormEvent) {
    event.preventDefault();
    const parsed = businessAnalysisInput.safeParse(form);
    if (!parsed.success) { setError(parsed.error.issues[0]?.message || "Revise os dados do estabelecimento."); return; }
    setError(""); setNotice("");
    run(parsed.data, phone, leadId);
  }
  function reopen(entry: AnalysisEntry) {
    setForm({ ...entry.form, senderName: form.senderName || entry.form.senderName }); setPhone(entry.phone); setError(""); setNotice("");
    run({ ...entry.form, senderName: form.senderName || entry.form.senderName }, entry.phone, entry.leadId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function chooseOpening(index: number) {
    if (!result) return;
    setOpening(index); setMessage(analysisMessage(result.analysis.openings[index]!.text, result.input.senderName));
  }
  function track() {
    if (!result) return;
    const lead = leadFromAnalysis(result.input, phone, leadId);
    if (followUp.track(lead)) navigate({ to: "/clientes" });
  }
  function demo() {
    if (!result) return;
    const lead = leadFromAnalysis(result.input, phone, leadId);
    followUp.track(lead);
    try { sessionStorage.setItem("site-demo-draft", JSON.stringify(draftForClient(lead, result.input.segment))); navigate({ to: "/demonstracoes" }); }
    catch { setNotice("Permita o armazenamento deste navegador para preparar a demonstração."); }
  }
  async function copy(text = message) {
    try { await navigator.clipboard.writeText(text); setNotice("Mensagem copiada."); }
    catch { setNotice("Não foi possível copiar. Selecione e copie o texto da mensagem."); }
  }
  function whatsapp(text = message) {
    const url = analysisWhatsApp(phone, text);
    if (!url) { setNotice("Informe um WhatsApp com DDD ou código do país."); return; }
    window.open(url, "_blank", "noopener,noreferrer");
    setNotice("Mensagem preparada. Confirme o envio no WhatsApp.");
  }
  return <main className="relative min-h-screen px-4 py-8 sm:px-8">
    <OceanScene /><ProspectTabs active="analysis" />
    <section className="mx-auto mt-8 max-w-6xl">
      <p className="kicker-pill mb-3"><Sparkles className="size-3.5" />Inteligência comercial</p>
      <h1 className="font-display text-4xl tracking-wide sm:text-5xl">Um negócio. Uma boa <span className="text-gradient-primary">proposta.</span></h1>
      <p className="mt-3 text-sm text-muted-foreground">Oportunidades e hipóteses calculadas a partir dos dados informados — sem garantia de vendas e sem uso de IA.</p>
      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <form onSubmit={submit} className="min-w-0 space-y-5">
          {history.length > 0 && <section aria-label="Análises recentes" className="rounded-lg border bg-card p-4"><h2 className="flex items-center gap-2 text-sm font-semibold"><History className="size-4 text-primary" />Análises recentes</h2><ul className="mt-3 space-y-1">{history.slice(0, 6).map(entry => <li key={entry.id} className="flex items-center gap-2"><button type="button" className="min-w-0 flex-1 truncate rounded px-2 py-1.5 text-left text-sm hover:bg-muted" onClick={() => reopen(entry)}>{entry.form.name}<span className="text-muted-foreground">{entry.form.city ? ` · ${entry.form.city}` : ""}</span></button><Button type="button" variant="ghost" size="icon" className="size-7 shrink-0 text-muted-foreground" aria-label={`Remover análise de ${entry.form.name}`} onClick={() => writeHistory(removeEntry(history, entry.id))}><Trash2 className="size-4" /></Button></li>)}</ul><p className="mt-2 text-xs text-muted-foreground">Ficam salvas só neste navegador.</p></section>}
          <h2 className="flex items-center gap-2 text-xl font-semibold"><Building2 className="size-5 text-primary" />Dados do estabelecimento</h2>
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
          {!result ? <div className="py-12"><Target className="mb-5 size-12 text-primary" /><h2 className="text-2xl font-semibold">Oportunidades do estabelecimento</h2><div className="mt-8 space-y-4 text-sm text-muted-foreground"><p className="border-b pb-4">Possibilidades para o site</p><p className="border-b pb-4">Seções adequadas ao segmento</p><p>Abordagem comercial e mensagem de WhatsApp</p></div></div> : <div className="space-y-7 break-words">
            <div><p className="text-xs text-primary">Análise local · baseada só nos dados informados — confirme as hipóteses</p><h2 className="mt-2 text-2xl font-semibold">{result.name}</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{result.analysis.summary}</p></div>
            <section><h3 className="flex items-center gap-2 text-lg font-semibold"><Target className="size-5 text-primary" />Oportunidades de site</h3><div className="mt-4 space-y-3">{result.analysis.opportunities.map((item, index) => <article key={index} className="rounded-lg border bg-card p-4"><h4 className="font-semibold">{item.title}</h4><p className="mt-2 text-sm leading-relaxed">{item.benefit}</p><p className="mt-3 text-xs leading-relaxed text-muted-foreground">Base da sugestão: {item.basis}</p></article>)}</div></section>
            <section className="border-t pt-5"><h3 className="flex items-center gap-2 text-lg font-semibold"><ListChecks className="size-5 text-primary" />Seções sugeridas</h3><ul className="mt-3 list-inside list-disc space-y-2 text-sm text-muted-foreground">{result.analysis.sections.map((item, index) => <li key={index}>{item}</li>)}</ul></section>
            <section className="border-t pt-5"><h3 className="text-lg font-semibold">Como iniciar a conversa</h3><p className="mt-3 text-sm leading-relaxed">{result.analysis.approach}</p><h4 className="mt-5 text-sm font-semibold">Perguntas para confirmar</h4><ul className="mt-3 list-inside list-disc space-y-2 text-sm text-muted-foreground">{result.analysis.questions.map((item, index) => <li key={index}>{item}</li>)}</ul></section>
            <section className="border-t pt-5"><label className="block space-y-3"><span className="flex items-center gap-2 text-lg font-semibold"><MessageCircle className="size-5 text-primary" />Abordagem personalizada</span><span className="flex flex-wrap gap-2" role="group" aria-label="Estilo da mensagem">{result.analysis.openings.map((item, index) => <Button key={item.label} type="button" size="sm" variant={index === opening ? "default" : "outline"} aria-pressed={index === opening} onClick={() => chooseOpening(index)}>{item.label}</Button>)}</span><Textarea rows={8} value={message} maxLength={3000} onChange={e => setMessage(e.target.value)} /></label><label className="mt-4 block space-y-2"><span className="text-sm font-semibold">WhatsApp do estabelecimento</span><Input type="tel" maxLength={25} value={phone} onChange={e => setPhone(e.target.value)} placeholder="DDD + número" /></label><div className="mt-4 flex flex-wrap gap-2"><Button variant="outline" onClick={() => copy()} disabled={!message.trim()}><Copy />Copiar mensagem</Button><Button onClick={() => whatsapp()} disabled={!message.trim()}><MessageCircle />Abrir WhatsApp</Button></div>{notice && <p role="status" className="mt-3 text-sm text-primary">{notice}</p>}</section>
            <section className="border-t pt-5"><h3 className="text-lg font-semibold">Se não responderem</h3><p className="mt-1 text-sm text-muted-foreground">Mensagens curtas para retomar a conversa, sem pressionar.</p><div className="mt-4 space-y-4">{result.analysis.followUps.map(item => { const text = withSignature(item.text, result.input.senderName); return <article key={item.label} className="rounded-lg border bg-card p-4"><h4 className="text-sm font-semibold">{item.label} <span className="font-normal text-muted-foreground">· {item.when}</span></h4><p className="mt-2 whitespace-pre-line text-sm leading-relaxed">{text}</p><div className="mt-3 flex flex-wrap gap-2"><Button size="sm" variant="outline" onClick={() => copy(text)}><Copy />Copiar</Button><Button size="sm" variant="outline" onClick={() => whatsapp(text)}><MessageCircle />Abrir WhatsApp</Button></div></article>; })}</div></section>
            <section className="border-t pt-5"><h3 className="text-lg font-semibold">Próximos passos</h3><div className="mt-3 flex flex-wrap gap-2"><Button variant="outline" onClick={demo}><PanelsTopLeft />Gerar demonstração do site</Button><Button variant="outline" onClick={track}><UserPlus />Acompanhar cliente</Button></div></section>
          </div>}
        </div>
      </div>
    </section>
  </main>;
}
