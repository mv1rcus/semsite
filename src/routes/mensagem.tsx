import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Check, RotateCcw, Save, Copy, MessageCircle, Building2, UserRound, Plus, Sparkles } from "lucide-react";
import { ProspectTabs } from "@/components/ProspectTabs";
import { OceanScene } from "@/components/OceanScene";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DEFAULT_SETTINGS, MESSAGE_SUGGESTIONS, fillTemplate, loadMessageSettings, saveMessageSettings, type MessageSettings } from "@/lib/message";

export const Route = createFileRoute("/mensagem")({
  head: () => ({ meta: [{ title: "Mensagem de boas-vindas — SemSite" }, { name: "description", content: "Personalize a primeira mensagem de WhatsApp enviada aos negócios sem site." }, { property: "og:title", content: "Mensagem de boas-vindas — SemSite" }, { property: "og:description", content: "Escolha uma sugestão ou escreva sua própria mensagem de WhatsApp." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Mensagem,
});

function Mensagem() {
  const [settings, setSettings] = useState<MessageSettings>(DEFAULT_SETTINGS);
  const [savedSettings, setSavedSettings] = useState<MessageSettings>(DEFAULT_SETTINGS);
  const editor = useRef<HTMLTextAreaElement>(null);
  useEffect(() => { const saved = loadMessageSettings(); setSettings(saved); setSavedSettings(saved); }, []);
  const [status, setStatus] = useState("");
  const [business, setBusiness] = useState("Pizzaria Bella Vista");
  const preview = fillTemplate(settings.template, business.trim() || "Nome do negócio", settings.senderName);
  const dirty = settings.senderName !== savedSettings.senderName || settings.template !== savedSettings.template;
  function update(patch: Partial<MessageSettings>) { setSettings(previous => ({ ...previous, ...patch })); setStatus(""); }
  function insert(token: string) {
    const field = editor.current;
    const start = field?.selectionStart ?? settings.template.length;
    const end = field?.selectionEnd ?? start;
    update({ template: settings.template.slice(0, start) + token + settings.template.slice(end) });
    requestAnimationFrame(() => { field?.focus(); field?.setSelectionRange(start + token.length, start + token.length); });
  }
  function save() {
    if (!settings.template.trim()) { setStatus("Escreva uma mensagem antes de salvar."); return; }
    try { saveMessageSettings(settings); setSavedSettings({ ...settings }); setStatus("Mensagem salva! Ela já vale para os próximos contatos."); }
    catch { setStatus("Não foi possível salvar neste navegador. Sua mensagem continua aqui para copiar."); }
  }
  async function copy() {
    try { await navigator.clipboard.writeText(preview); setStatus("Prévia copiada!"); }
    catch { setStatus("Não foi possível copiar. Selecione o texto da prévia e copie."); }
  }
  return <main className="relative min-h-screen px-4 py-8 sm:px-8">
    <OceanScene />
    <ProspectTabs active="message" />
    <section className="mx-auto mt-8 max-w-6xl">
      <div className="flex flex-wrap items-start justify-between gap-3"><div><h1 className="text-3xl font-bold">Sua primeira conversa.</h1><p className="mt-2 text-sm text-muted-foreground">Mensagem de boas-vindas · WhatsApp</p></div><span className={`text-sm ${dirty ? "text-chart-demos" : "text-muted-foreground"}`}>{dirty ? "Alterações não salvas" : "Mensagem atual"}</span></div>
      <div className="mt-8 grid items-start gap-8 lg:grid-cols-2">
        <div className="min-w-0 space-y-5">
          <label className="block space-y-2"><span className="flex items-center gap-2 text-sm font-semibold"><UserRound className="size-4 text-accent" />Seu nome</span><Input aria-label="Seu nome" value={settings.senderName} placeholder="Ex: Ana, João…" onChange={e => update({ senderName: e.target.value })} /></label>
          <label className="block space-y-2"><span className="text-sm font-semibold">Sua mensagem</span><Textarea ref={editor} aria-label="Sua mensagem" rows={10} className="min-h-64 leading-relaxed" value={settings.template} onChange={e => update({ template: e.target.value })} /></label>
          <div className="flex flex-wrap items-center gap-2"><Button size="sm" variant="outline" onClick={() => insert("{seu_nome}")}><Plus /><UserRound />Seu nome</Button><Button size="sm" variant="outline" onClick={() => insert("{empresa}")}><Plus /><Building2 />Nome do negócio</Button><span className="ml-auto text-xs text-muted-foreground">{settings.template.length} caracteres</span></div>
          <div className="flex flex-wrap gap-2 border-t pt-5"><Button onClick={save} disabled={!dirty || !settings.template.trim()}><Save />Salvar mensagem</Button><Button variant="ghost" disabled={!dirty} onClick={() => { setSettings({ ...savedSettings }); setStatus(""); }}><RotateCcw />Descartar alterações</Button><Button variant="ghost" onClick={() => update({ template: DEFAULT_SETTINGS.template })}>Voltar ao padrão</Button></div>
          {status && <p role="status" className="text-sm text-primary">{status}</p>}
        </div>
        <div className="min-w-0 border-t pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <h2 className="flex items-center gap-2 text-xl font-semibold"><MessageCircle className="size-5 text-accent" />Prévia da conversa</h2>
          <label className="mt-4 block space-y-2"><span className="text-sm text-muted-foreground">Negócio da prévia</span><Input aria-label="Negócio da prévia" value={business} onChange={e => setBusiness(e.target.value)} /></label>
          <div className="mt-5 overflow-hidden rounded-lg border"><div className="flex items-center gap-3 border-b bg-secondary px-4 py-3"><Building2 className="size-5 shrink-0 text-accent" /><p className="min-w-0 break-words text-sm font-semibold">{business.trim() || "Nome do negócio"}</p></div><div className="bg-muted/30 p-4 sm:p-6"><p className="whitespace-pre-wrap break-words rounded-lg border bg-secondary p-4 text-sm leading-relaxed" aria-label="Texto da prévia">{preview || "Sua mensagem aparecerá aqui."}</p></div></div>
          <Button variant="outline" className="mt-4" disabled={!settings.template.trim()} onClick={copy}><Copy />Copiar prévia</Button>
        </div>
      </div>
      <section className="mt-10 border-t pt-6"><h2 className="flex items-center gap-2 text-xl font-semibold"><Sparkles className="size-5 text-primary" />Ideias para começar</h2><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{MESSAGE_SUGGESTIONS.map(s => { const active = s.template === settings.template; return <Button key={s.label} variant={active ? "secondary" : "outline"} aria-pressed={active} className="h-auto min-h-32 flex-col items-start justify-start gap-3 whitespace-normal rounded-lg p-4 text-left" onClick={() => update({ template: s.template })}><span className="flex w-full items-center justify-between gap-2 font-semibold">{s.label}{active ? <Check className="size-4 text-accent" /> : <Plus className="size-4 text-muted-foreground" />}</span><span className="line-clamp-3 text-xs font-normal leading-relaxed text-muted-foreground">{fillTemplate(s.template, business.trim() || "Nome do negócio", settings.senderName)}</span></Button>; })}</div></section>
    </section>
  </main>;
}
