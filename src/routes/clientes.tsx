import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Bell, CalendarClock, MessageCircle, Plus, Search, Check } from "lucide-react";
import { OceanScene } from "@/components/OceanScene";
import { ProspectTabs } from "@/components/ProspectTabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClientStageSelect } from "@/components/ClientStageSelect";
import { useFollowUp } from "@/lib/use-follow-up";
import { localDateInput, reminderDue, STAGES } from "@/lib/follow-up";
import { whatsappLink } from "@/lib/message";
import { ContactAgenda } from "@/components/ContactAgenda";

export const Route = createFileRoute("/clientes")({
  head: () => ({ meta: [{ title: "Painel de clientes — Caça Clientes" }, { name: "description", content: "Acompanhe clientes, etapas de negociação e lembretes de próximo contato." }, { property: "og:title", content: "Painel de clientes — Caça Clientes" }, { property: "og:description", content: "Organize contatos, demonstrações enviadas e negócios fechados." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Clientes,
});
function Clientes() {
  const { clients, track, update, storageError } = useFollowUp();
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [now, setNow] = useState(0);
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  useEffect(() => { setNow(Date.now()); const timer = window.setInterval(() => setNow(Date.now()), 30000); return () => window.clearInterval(timer); }, []);
  const due = clients.filter((client) => reminderDue(client, now));
  const visible = clients.filter((client) => (filter === "all" || (filter === "due" ? reminderDue(client, now) : client.stage === filter)) && `${client.name} ${client.address}`.toLocaleLowerCase("pt-BR").includes(query.toLocaleLowerCase("pt-BR"))).sort((a, b) => Number(reminderDue(b, now)) - Number(reminderDue(a, now)) || (a.nextContact || "9999").localeCompare(b.nextContact || "9999"));
  return <main className="min-h-screen px-4 py-8 sm:px-8"><OceanScene /><header className="mx-auto max-w-6xl"><Link to="/" className="font-display font-bold text-primary">Caça Clientes</Link></header><ProspectTabs active="clients" />
    <section className="mx-auto mt-8 max-w-6xl"><div className="flex flex-wrap items-center justify-between gap-4"><div><h1 className="text-3xl font-bold">Painel de clientes</h1><p className="mt-2 text-sm text-muted-foreground">{clients.length} clientes · Salvos neste navegador</p></div><Button onClick={() => setAdding(!adding)} variant="outline"><Plus />Adicionar cliente</Button></div>
      {adding && <form className="mt-6 grid gap-3 border-y py-5 sm:grid-cols-[1fr_1fr_auto]" onSubmit={(event) => { event.preventDefault(); if (!name.trim()) return; if (track({ id: crypto.randomUUID(), name: name.trim(), phone: phone.trim() || null, intlPhone: null, address: "", category: null, rating: null, reviews: null, mapsUrl: null })) { setName(""); setPhone(""); setAdding(false); } }}><Input aria-label="Nome do cliente" placeholder="Nome do cliente" required maxLength={160} value={name} onChange={(e) => setName(e.target.value)} /><Input aria-label="Telefone do cliente" placeholder="Telefone com DDD" maxLength={40} value={phone} onChange={(e) => setPhone(e.target.value)} /><Button type="submit"><Check />Salvar cliente</Button></form>}
      {storageError && <p role="alert" className="mt-4 text-destructive">{storageError}</p>}
      <ContactAgenda clients={clients} now={now} update={update} />
      {due.length > 0 && <div role="status" className="mt-6 flex items-center gap-3 border-l-2 border-destructive bg-muted p-4"><Bell className="size-5 shrink-0 text-destructive" /><span>{due.length} {due.length === 1 ? "contato pendente" : "contatos pendentes"}</span><Button variant="ghost" size="sm" onClick={() => setFilter("due")}>Ver</Button></div>}
      <div className="mt-6 flex flex-wrap gap-2"><Button variant={filter === "all" ? "secondary" : "outline"} onClick={() => setFilter("all")}>Todos ({clients.length})</Button>{STAGES.map((stage) => <Button key={stage.value} variant={filter === stage.value ? "secondary" : "outline"} onClick={() => setFilter(stage.value)}>{stage.label} ({clients.filter((c) => c.stage === stage.value).length})</Button>)}<Button variant={filter === "due" ? "secondary" : "outline"} onClick={() => setFilter("due")}><Bell />Pendentes ({due.length})</Button></div>
      <div className="relative mt-4"><Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" /><Input aria-label="Buscar cliente" placeholder="Buscar por cliente ou cidade" className="pl-10" value={query} onChange={(e) => setQuery(e.target.value)} /></div>
      {visible.length === 0 && <div className="py-16 text-center"><h2 className="text-lg font-semibold">{clients.length ? "Nenhum cliente neste filtro" : "Nenhum cliente acompanhado ainda"}</h2>{!clients.length && <Button asChild variant="outline" className="mt-4"><Link to="/buscar"><Search />Buscar clientes</Link></Button>}</div>}
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{visible.map((client) => <article key={client.id} className="glass min-w-0 rounded-lg p-5"><h2 className="break-words text-lg font-bold">{client.name}</h2>{client.address && <p className="mt-1 text-sm text-muted-foreground">{client.address}</p>}
        <div className="mt-4 space-y-4"><label className="block text-sm"><span className="mb-2 block">Etapa</span><ClientStageSelect value={client.stage} onChange={(stage) => update(client.id, { stage })} label={`Etapa de ${client.name}`} /></label>
          <label className="block text-sm"><span className="mb-2 block">Data da etapa</span><Input type="datetime-local" aria-label={`Data da etapa de ${client.name}`} value={localDateInput(client.stageDate)} onChange={(e) => { if (e.target.value) update(client.id, { stageDate: new Date(e.target.value).toISOString() }); }} /></label>
          <label className="block text-sm"><span className="mb-2 flex items-center gap-2"><CalendarClock className="size-4" />Próximo contato</span><Input type="datetime-local" aria-label={`Próximo contato de ${client.name}`} value={localDateInput(client.nextContact)} onChange={(e) => update(client.id, { nextContact: e.target.value ? new Date(e.target.value).toISOString() : "" })} /></label>
          {reminderDue(client, now) && <p className="flex items-center gap-2 text-sm text-destructive"><Bell className="size-4" />Contato pendente</p>}
          {client.nextContact && <Button variant="ghost" size="sm" onClick={() => update(client.id, { nextContact: "" })}>Limpar lembrete</Button>}
          {(client.intlPhone || client.phone) && <Button asChild variant="whatsapp" className="w-full"><a href={whatsappLink(client.intlPhone || `+55${client.phone?.replace(/\D/g, "")}`, client.name)} target="_blank" rel="noreferrer"><MessageCircle />Abrir WhatsApp</a></Button>}
        </div></article>)}</div>
      <p className="mt-8 text-xs text-muted-foreground">Os lembretes aparecem aqui enquanto o painel está aberto; não são enviados fora do site.</p>
    </section></main>;
}