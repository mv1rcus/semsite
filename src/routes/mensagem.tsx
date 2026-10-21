import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, RotateCcw, Save } from "lucide-react";
import { ProspectTabs } from "@/components/ProspectTabs";
import { OceanScene } from "@/components/OceanScene";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DEFAULT_SETTINGS, MESSAGE_SUGGESTIONS, fillTemplate, loadMessageSettings, saveMessageSettings, type MessageSettings } from "@/lib/message";

export const Route = createFileRoute("/mensagem")({
  head: () => ({ meta: [{ title: "Mensagem de boas-vindas — Caça Clientes" }, { name: "description", content: "Personalize a primeira mensagem de WhatsApp enviada aos negócios sem site." }, { property: "og:title", content: "Mensagem de boas-vindas — Caça Clientes" }, { property: "og:description", content: "Escolha uma sugestão ou escreva sua própria mensagem de WhatsApp." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Mensagem,
});

function Mensagem() {
  const [settings, setSettings] = useState<MessageSettings>(DEFAULT_SETTINGS);
  useEffect(() => setSettings(loadMessageSettings()), []);
  const [status, setStatus] = useState("");
  const preview = fillTemplate(settings.template, "Pizzaria Bella Vista", settings.senderName);
  function save() {
    if (!settings.template.trim()) return setStatus("Escreva uma mensagem antes de salvar.");
    saveMessageSettings(settings); setStatus("Mensagem salva! Ela já vale para os próximos contatos.");
  }
  return <main className="relative min-h-screen px-4 pb-16">
    <OceanScene />
    <ProspectTabs active="message" />
    <section className="mx-auto mt-6 grid max-w-6xl gap-6 lg:grid-cols-2">
      <div className="glass space-y-5 rounded-xl p-5">
        <div><h1 className="font-display text-2xl font-bold">Mensagem de boas-vindas</h1><p className="mt-1 text-sm text-muted-foreground">É o texto que abre no WhatsApp quando você toca em um cliente.</p></div>
        <label className="block space-y-2"><span className="text-sm font-semibold">Seu nome</span>
          <Input value={settings.senderName} placeholder="Ex: Ana, João…" onChange={(e) => setSettings({ ...settings, senderName: e.target.value })} /></label>
        <div className="space-y-2"><span className="text-sm font-semibold">Sugestões</span>
          <div className="flex flex-wrap gap-2">{MESSAGE_SUGGESTIONS.map((s) => { const on = s.template === settings.template; return <Button key={s.label} type="button" size="sm" variant={on ? "default" : "outline"} onClick={() => setSettings({ ...settings, template: s.template })}>{on && <Check />}{s.label}</Button>; })}</div>
        </div>
        <label className="block space-y-2"><span className="text-sm font-semibold">Sua mensagem</span>
          <Textarea rows={10} value={settings.template} onChange={(e) => setSettings({ ...settings, template: e.target.value })} />
          <span className="block text-xs text-muted-foreground">Use {"{seu_nome}"} para o seu nome e {"{empresa}"} para o nome do negócio.</span></label>
        <div className="flex flex-wrap gap-2"><Button type="button" onClick={save}><Save />Salvar mensagem</Button><Button type="button" variant="ghost" onClick={() => setSettings({ ...settings, template: DEFAULT_SETTINGS.template })}><RotateCcw />Voltar ao padrão</Button></div>
        {status && <p role="status" className="text-sm text-primary">{status}</p>}
      </div>
      <div className="glass rounded-xl p-5"><p className="text-sm font-semibold">Prévia (exemplo: Pizzaria Bella Vista)</p>
        <div className="mt-3 whitespace-pre-wrap rounded-lg border bg-card p-4 text-sm leading-relaxed">{preview}</div></div>
    </section>
  </main>;
}
