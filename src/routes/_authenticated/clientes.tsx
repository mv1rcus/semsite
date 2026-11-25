import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { draftForClient } from "@/lib/demonstrations";
import { useEffect, useMemo, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Bell, CalendarClock, Download, FileUp, MessageCircle, Plus, Search, Check, PanelsTopLeft, Trash2, MessageCircleOff, Users, Trophy, FileText, Banknote, PanelsTopLeft as DemoIcon, Eye, SendHorizonal } from "lucide-react";
import { OceanScene } from "@/components/OceanScene";
import { ProspectTabs } from "@/components/ProspectTabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { ClientStageSelect } from "@/components/ClientStageSelect";
import { useFollowUp } from "@/lib/use-follow-up";
import { dueToday, localDateInput, reminderDue, STAGES } from "@/lib/follow-up";
import { getClosedSales, getMonthlyResults, recordClosedSale } from "@/lib/results.functions";
import { countStageEventsInRange, formatBRL, monthRange, parseReaisToCents } from "@/lib/results";
import { whatsappLink } from "@/lib/message";
import { ContactAgenda } from "@/components/ContactAgenda";
import { backupFileName, clientsToCsv, downloadText, makeBackup, parseBackup } from "@/lib/backup";

export const Route = createFileRoute("/_authenticated/clientes")({
  head: () => ({ meta: [{ title: "Painel de clientes — SemSite" }, { name: "description", content: "Acompanhe clientes, etapas de negociação e lembretes de próximo contato." }, { property: "og:title", content: "Painel de clientes — SemSite" }, { property: "og:description", content: "Organize contatos, demonstrações enviadas e negócios fechados." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Clientes,
});
function Clientes() {
  const { clients, track, update, restore, remove, storageError } = useFollowUp();
  const navigate = useNavigate();
  function demonstrate(c: (typeof clients)[number]) {
    try { sessionStorage.setItem("site-demo-draft", JSON.stringify(draftForClient({ id: c.id, name: c.name, address: c.address, phone: c.phone, intlPhone: c.intlPhone, category: c.category, mapsUrl: c.mapsUrl, rating: null, reviews: null }))); navigate({ to: "/demonstracoes" }); } catch { /* Storage blocked. */ }
  }
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [now, setNow] = useState(0);
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [importError, setImportError] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [pendingDelete, setPendingDelete] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const [limit, setLimit] = useState(12);
  const fileRef = useRef<HTMLInputElement>(null);
  const loadResults = useServerFn(getMonthlyResults);
  const loadSales = useServerFn(getClosedSales);
  const saveSale = useServerFn(recordClosedSale);
  const [results, setResults] = useState<{ demosCreated: number; demosOpened: number; closedCount: number; closedAmountCents: number; salesReady: boolean } | null>(null);
  const [sales, setSales] = useState<{ clientId: string; amountCents: number }[]>([]);
  const [saleValue, setSaleValue] = useState("");
  const [saleSaving, setSaleSaving] = useState(false);
  useEffect(() => { setNow(Date.now()); const timer = window.setInterval(() => setNow(Date.now()), 30000); return () => window.clearInterval(timer); }, []);
  function refreshResults() { loadResults().then(setResults).catch(() => setResults(null)); }
  useEffect(() => {
    refreshResults();
    loadSales().then((rows) => setSales(rows.map((row: { clientId: string; amountCents: number }) => ({ clientId: row.clientId, amountCents: row.amountCents })))).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const salesByClient = useMemo(() => new Map(sales.map((sale) => [sale.clientId, sale.amountCents])), [sales]);
  const { start: monthStart, end: monthEnd } = monthRange(new Date());
  const sentThisMonth = countStageEventsInRange(clients, "demo_sent", monthStart, monthEnd);
  async function registerSale(client: (typeof clients)[number]) {
    if (saleSaving) return;
    const amountCents = parseReaisToCents(saleValue);
    if (amountCents === "invalid") { setNotice("Digite o valor do fechamento em reais (ex.: 350 ou 1.200,00)."); return; }
    setSaleSaving(true);
    try {
      await saveSale({ data: { clientId: client.id, clientName: client.name, amountCents } });
      setSales((old) => [{ clientId: client.id, amountCents }, ...old]);
      setSaleValue("");
      setNotice(`Venda de ${client.name} registrada: ${formatBRL(amountCents)}.`);
      refreshResults();
    } catch (e) { setNotice(e instanceof Error ? e.message : "Não foi possível registrar a venda agora."); }
    finally { setSaleSaving(false); }
  }
  const due = clients.filter((client) => reminderDue(client, now));
  const today = clients.filter((client) => dueToday(client));
  const unanswered = clients.filter((client) => client.noResponse && client.stage !== "closed");
  const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");
  const visible = clients.filter((client) => (filter === "all" || (filter === "no_response" ? client.noResponse && client.stage !== "closed" : filter === "due" ? reminderDue(client, now) : filter === "today" ? dueToday(client) : client.stage === filter)) && normalize(`${client.name} ${client.address} ${client.phone || ""}`).includes(normalize(query.trim()))).sort((a, b) => Number(reminderDue(b, now)) - Number(reminderDue(a, now)) || (a.nextContact || "9999").localeCompare(b.nextContact || "9999"));
  const displayed = visible.slice(0, limit);
  const selectedIds = selected.filter((id) => clients.some((client) => client.id === id));
  const deleting = clients.filter((client) => pendingDelete.includes(client.id));
  function changeFilter(value: string) { setFilter(value); setSelected([]); setLimit(12); }
  return <main className="min-h-screen px-4 py-8 sm:px-8"><OceanScene /><ProspectTabs active="clients" />
    <section className="mx-auto mt-8 max-w-6xl"><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="page-kicker mb-3">/ PAINEL</p><h1 className="font-display text-4xl tracking-wide sm:text-5xl">Seus <span className="text-gradient-primary">clientes.</span></h1><p className="mt-2 text-sm text-muted-foreground">Contatos, próximos passos e negócios fechados.</p></div><Button onClick={() => setAdding(!adding)} variant="outline"><Plus />Adicionar cliente</Button></div>
      <section aria-label="Resultados do mês" className="mt-7 border-y py-5">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Resultados do mês</h2>
        <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-5">
          {[
            { label: "Demos geradas", value: results ? String(results.demosCreated) : "…", icon: DemoIcon },
            { label: "Demos abertas", value: results ? String(results.demosOpened) : "…", icon: Eye },
            { label: "Enviadas", value: String(sentThisMonth), icon: SendHorizonal },
            { label: "Fechadas", value: results ? String(results.closedCount) : "…", icon: Trophy },
            { label: "Valor fechado", value: results ? formatBRL(results.closedAmountCents) : "…", icon: Banknote },
          ].map(item => <div key={item.label}><item.icon className="mb-2 size-4 text-primary" /><p className="text-2xl font-bold">{item.value}</p><p className="mt-1 text-xs text-muted-foreground">{item.label}</p></div>)}
        </div>
        {results && !results.salesReady && <p className="mt-3 text-xs text-muted-foreground">O registro de vendas ainda não está ativo neste banco; "Fechadas" e "Valor fechado" zerados até a migração rodar.</p>}
      </section>
      <div className="mt-7 grid grid-cols-2 gap-x-5 gap-y-6 border-b pb-5 sm:grid-cols-4">
        {[{ label: "Total de clientes", count: clients.length, icon: Users }, { label: "Contato pendente", count: due.length, icon: Bell }, { label: "Sem resposta", count: unanswered.length, icon: MessageCircleOff }, { label: "Fechados", count: clients.filter(c => c.stage === "closed").length, icon: Trophy }].map(item => <div key={item.label}><item.icon className="mb-2 size-4 text-primary" /><p className="text-2xl font-bold">{item.count}</p><p className="mt-1 text-xs text-muted-foreground">{item.label}</p></div>)}
      </div>
      {adding && <form className="mt-6 grid gap-3 border-y py-5 sm:grid-cols-[1fr_1fr_auto]" onSubmit={(event) => { event.preventDefault(); if (!name.trim()) return; if (track({ id: crypto.randomUUID(), name: name.trim(), phone: phone.trim() || null, intlPhone: null, address: "", category: null, rating: null, reviews: null, mapsUrl: null })) { setName(""); setPhone(""); setAdding(false); } }}><Input aria-label="Nome do cliente" placeholder="Nome do cliente" required maxLength={160} value={name} onChange={(e) => setName(e.target.value)} /><Input aria-label="Telefone do cliente" placeholder="Telefone com DDD" maxLength={40} value={phone} onChange={(e) => setPhone(e.target.value)} /><Button type="submit"><Check />Salvar cliente</Button></form>}
      {storageError && <p role="alert" className="mt-4 text-destructive">{storageError}</p>}
      {importError && <p role="alert" className="mt-4 text-destructive">{importError}</p>}
      {notice && <p role="status" className="mt-4 text-primary">{notice}</p>}
      <details className="mt-5 border-b pb-4"><summary className="cursor-pointer text-sm text-muted-foreground">Cópia de segurança</summary>
      <div className="mt-4 flex flex-wrap gap-2" aria-label="Cópia de segurança">
        <Button variant="outline" disabled={!clients.length} onClick={() => downloadText(backupFileName("csv"), `\ufeff${clientsToCsv(clients)}`, "text/csv;charset=utf-8")}><Download />Exportar planilha</Button>
        <Button variant="outline" disabled={!clients.length} onClick={() => downloadText(backupFileName("json"), JSON.stringify(makeBackup(clients), null, 2), "application/json")}><Download />Salvar backup</Button>
        <Button variant="outline" onClick={() => fileRef.current?.click()}><FileUp />Restaurar backup</Button>
        <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" aria-label="Arquivo de backup" onChange={async (event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (!file) return;
          try {
            const imported = parseBackup(await file.text());
            if (!imported) { setImportError("Este arquivo não é um backup válido do SemSite."); return; }
            setImportError("");
            if (restore(imported)) setNotice("Backup restaurado.");
          } catch { setImportError("Não foi possível abrir o arquivo. Tente selecionar o backup novamente."); }
        }} />
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Clientes salvos na sua conta.</p></details>
      <details className="mt-4 border-b pb-4"><summary className="cursor-pointer text-sm font-medium">Agenda de contatos</summary><ContactAgenda clients={clients} now={now} update={update} /></details>
      {due.length > 0 && <div role="status" className="mt-6 flex items-center gap-3 border-l-2 border-destructive bg-muted p-4"><Bell className="size-5 shrink-0 text-destructive" /><span>{due.length} {due.length === 1 ? "contato pendente" : "contatos pendentes"}</span><Button variant="ghost" size="sm" onClick={() => setFilter("due")}>Ver</Button></div>}
      <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_260px]"><div className="relative"><Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" /><Input aria-label="Buscar cliente" placeholder="Nome, cidade ou telefone" className="pl-10" value={query} onChange={(e) => { setQuery(e.target.value); setSelected([]); setLimit(12); }} /></div>
        <Select value={filter} onValueChange={changeFilter}><SelectTrigger aria-label="Filtrar clientes"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Todos ({clients.length})</SelectItem><SelectItem value="no_response">Sem resposta ({unanswered.length})</SelectItem><SelectItem value="due">Contato pendente ({due.length})</SelectItem><SelectItem value="today">Pra hoje ({today.length})</SelectItem>{STAGES.map(stage => <SelectItem key={stage.value} value={stage.value}>{stage.label} ({clients.filter(c => c.stage === stage.value).length})</SelectItem>)}</SelectContent></Select>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3"><p className="text-xs text-muted-foreground">{visible.length} {visible.length === 1 ? "cliente" : "clientes"}</p><Button variant="outline" size="sm" disabled={!unanswered.length} onClick={() => setPendingDelete(unanswered.map(c => c.id))}><Trash2 />Limpar sem resposta ({unanswered.length})</Button></div>
      {visible.length > 0 && <div className="mt-4 flex flex-wrap items-center gap-3 border-y py-3"><label className="flex cursor-pointer items-center gap-2 text-sm"><Checkbox aria-label="Selecionar clientes exibidos" checked={displayed.length > 0 && displayed.every(c => selectedIds.includes(c.id)) ? true : displayed.some(c => selectedIds.includes(c.id)) ? "indeterminate" : false} onCheckedChange={checked => setSelected(checked === true ? [...new Set([...selectedIds, ...displayed.map(c => c.id)])] : selectedIds.filter(id => !displayed.some(c => c.id === id)))} />Selecionar exibidos</label>{selectedIds.length > 0 && <><span className="text-xs text-muted-foreground">{selectedIds.length} selecionados</span><Button variant="destructive" size="sm" onClick={() => setPendingDelete(selectedIds)}><Trash2 />Excluir selecionados</Button><Button variant="ghost" size="sm" onClick={() => setSelected([])}>Cancelar seleção</Button></>}</div>}
      {visible.length === 0 && <div className="py-16 text-center"><h2 className="text-lg font-semibold">{clients.length ? "Nenhum cliente neste filtro" : "Nenhum cliente acompanhado ainda"}</h2>{!clients.length && <Button asChild variant="outline" className="mt-4"><Link to="/buscar"><Search />Buscar clientes</Link></Button>}</div>}
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{displayed.map((client) => <article key={client.id} className={`app-card app-card-hover min-w-0 p-5 ${selectedIds.includes(client.id) ? "ring-1 ring-accent" : ""}`}><div className="flex items-start gap-3"><Checkbox className="mt-1.5" aria-label={`Selecionar ${client.name}`} checked={selectedIds.includes(client.id)} onCheckedChange={checked => setSelected(checked === true ? [...new Set([...selectedIds, client.id])] : selectedIds.filter(id => id !== client.id))} /><h2 className="min-w-0 flex-1 break-words text-lg font-bold">{client.name}</h2><Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground" aria-label={`Excluir ${client.name}`} title={`Excluir ${client.name}`} onClick={() => setPendingDelete([client.id])}><Trash2 className="size-4" /></Button></div>{client.address && <p className="mt-1 text-sm text-muted-foreground">{client.address}</p>}
        <div className="mt-4 space-y-4"><label className="block text-sm"><span className="mb-2 block">Etapa</span><ClientStageSelect value={client.stage} onChange={(stage) => update(client.id, { stage })} label={`Etapa de ${client.name}`} /></label>
          {client.stage !== "closed" && <label className="flex cursor-pointer items-center gap-2 text-sm"><Checkbox aria-label={`Sem resposta de ${client.name}`} checked={client.noResponse} onCheckedChange={checked => update(client.id, { noResponse: checked === true })} /><MessageCircleOff className="size-4 text-muted-foreground" />Sem resposta</label>}
          <details><summary className="cursor-pointer text-xs text-muted-foreground">Datas e lembrete</summary><div className="mt-3 space-y-3"><label className="block text-sm"><span className="mb-2 block">Próximo passo</span><Input aria-label={`Próximo passo com ${client.name}`} placeholder="Ex.: mandar contrato, cobrar Pix…" maxLength={300} value={client.nextStep} onChange={(e) => update(client.id, { nextStep: e.target.value })} /></label><label className="block text-sm"><span className="mb-2 block">Data da etapa</span><Input type="datetime-local" aria-label={`Data da etapa de ${client.name}`} value={localDateInput(client.stageDate)} onChange={(e) => { if (e.target.value) update(client.id, { stageDate: new Date(e.target.value).toISOString() }); }} /></label>
          <label className="block text-sm"><span className="mb-2 flex items-center gap-2"><CalendarClock className="size-4" />Próximo contato</span><Input type="datetime-local" aria-label={`Próximo contato de ${client.name}`} value={localDateInput(client.nextContact)} onChange={(e) => update(client.id, { nextContact: e.target.value ? new Date(e.target.value).toISOString() : "" })} /></label>
          {reminderDue(client, now) && <p className="flex items-center gap-2 text-sm text-destructive"><Bell className="size-4" />Contato pendente</p>}
          {client.nextContact && <Button variant="ghost" size="sm" onClick={() => update(client.id, { nextContact: "" })}>Limpar lembrete</Button>}
          </div></details>
          {client.nextContact && <p className="text-xs text-muted-foreground">Próximo contato: {new Date(client.nextContact).toLocaleString("pt-BR")}</p>}
          {client.nextStep && <p className="text-xs text-muted-foreground">Próximo passo: {client.nextStep}</p>}
          {client.stage === "closed" && (salesByClient.has(client.id)
            ? <p className="flex items-center gap-2 text-sm font-semibold text-primary"><Banknote className="size-4" />Venda registrada: {formatBRL(salesByClient.get(client.id) ?? 0)}</p>
            : <div className="space-y-2 rounded-md border border-dashed border-border p-3"><label className="block text-sm"><span className="mb-2 block">Valor do fechamento (R$)</span><Input aria-label={`Valor do fechamento de ${client.name}`} inputMode="decimal" placeholder="Ex.: 350 ou 1.200,00" value={saleValue} onChange={(e) => setSaleValue(e.target.value)} /></label><Button size="sm" disabled={saleSaving} onClick={() => registerSale(client)}><Banknote />{saleSaving ? "Registrando…" : "Registrar valor"}</Button></div>)}
          {(client.intlPhone || client.phone) && <Button asChild variant="whatsapp" className="w-full"><a href={whatsappLink(client.intlPhone || `+55${client.phone?.replace(/\D/g, "")}`, client.name)} target="_blank" rel="noreferrer"><MessageCircle />Abrir WhatsApp</a></Button>}
          <Button variant="outline" className="w-full" onClick={() => demonstrate(client)}><PanelsTopLeft />Demonstração do site</Button>
          <Button variant="outline" className="w-full" onClick={() => navigate({ to: "/recibo", search: { c: client.id } })}><FileText />Recibo e contrato</Button>
        </div></article>)}</div>
      {visible.length > limit && <div className="mt-6 text-center"><Button variant="outline" onClick={() => setLimit(limit + 12)}>Mostrar mais clientes ({visible.length - limit})</Button></div>}
      <p className="mt-8 text-xs text-muted-foreground">Os lembretes aparecem aqui enquanto o painel está aberto; não são enviados fora do site.</p>
      <AlertDialog open={pendingDelete.length > 0} onOpenChange={open => { if (!open) setPendingDelete([]); }}><AlertDialogContent className="max-h-[85dvh] max-w-[calc(100%-2rem)] overflow-y-auto sm:max-w-lg"><AlertDialogHeader><AlertDialogTitle>Excluir {deleting.length === 1 ? deleting[0]?.name : `${deleting.length} clientes`}?</AlertDialogTitle><AlertDialogDescription>Os contatos, lembretes e históricos serão removidos deste navegador, inclusive dos gráficos. Os links de demonstração continuarão disponíveis. Esta ação não pode ser desfeita sem um backup.</AlertDialogDescription></AlertDialogHeader><ul className="max-h-32 overflow-y-auto text-sm">{deleting.map(c => <li key={c.id} className="break-words py-1">{c.name}</li>)}</ul><Button variant="outline" onClick={() => downloadText(backupFileName("json"), JSON.stringify(makeBackup(clients), null, 2), "application/json")}><Download />Salvar backup antes de excluir</Button><AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><Button variant="destructive" disabled={!deleting.length} onClick={() => { if (remove(deleting.map(c => c.id))) { setNotice(`${deleting.length} ${deleting.length === 1 ? "cliente excluído" : "clientes excluídos"}.`); setSelected([]); setPendingDelete([]); } }}><Trash2 />Confirmar exclusão</Button></AlertDialogFooter></AlertDialogContent></AlertDialog>
    </section></main>;
}
