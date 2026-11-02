import { VerifiedGate } from "@/components/VerifiedGate";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Copy, ExternalLink, Loader2, MessageCircle, PanelsTopLeft, CircleCheck, CircleAlert, Clock, RefreshCw, Eye, Search, ArrowRight, Plus, Trash2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { createDemonstration, getDemonstrationActivity, verifyDemonstrationLink } from "@/lib/demonstrations.functions";
import { isInactiveDemo, removeSavedDemos, savedDemoSchema, verificationState, type DemoActivity, type SavedDemo } from "@/lib/demo-verification";
import { demoSchema, draftForClient, demonstrationLink, demonstrationSlug, demonstrationCode, type Demonstration } from "@/lib/demonstrations";
import { SECTOR_HEADLINE } from "@/lib/demo-catalog";
import { DemoSite } from "@/components/DemoSite";
import { ProspectTabs } from "@/components/ProspectTabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { OceanScene } from "@/components/OceanScene";
export const Route = createFileRoute("/_authenticated/demonstracoes")({
  head: () => ({ meta: [{ title: "Criar demonstração — SemSite" }, { name: "description", content: "Prepare uma proposta visual de site personalizada para seu cliente." }, { property: "og:title", content: "Demonstrações de sites — SemSite" }, { property: "og:description", content: "Crie uma demonstração relacionada ao negócio do cliente e compartilhe o link." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <VerifiedGate feature="Demonstrações"><Demonstracoes /></VerifiedGate>,
});
const blank = draftForClient({ id: "", name: "", category: "Serviços locais", address: "", phone: null, intlPhone: null, rating: null, reviews: null, mapsUrl: null });
function Demonstracoes() {
  const [tab, setTab] = useState("edit");
  const [historyQuery, setHistoryQuery] = useState("");
  const [demo, setDemo] = useState<Demonstration>(blank);
  const [saved, setSaved] = useState<SavedDemo[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [pendingDelete, setPendingDelete] = useState<string[]>([]);
  const [checking, setChecking] = useState<string | null>(null);
  const [now, setNow] = useState(0);
  const verifyLink = useServerFn(verifyDemonstrationLink);
  const loadActivity = useServerFn(getDemonstrationActivity);
  const [activity, setActivity] = useState<Record<string, DemoActivity>>({});
  const [removed, setRemoved] = useState<string[]>([]);
  const [activityLoaded, setActivityLoaded] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const [origin, setOrigin] = useState("");
  useEffect(() => {
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 60000);
    setOrigin(window.location.origin);
    try {
      const draft = sessionStorage.getItem("site-demo-draft");
      if (draft) { const parsed = demoSchema.safeParse(JSON.parse(draft)); if (parsed.success) setDemo(parsed.data); sessionStorage.removeItem("site-demo-draft"); }
      const list: unknown = JSON.parse(localStorage.getItem("site-demo-links") || "[]");
      if (Array.isArray(list)) setSaved(list.flatMap((item) => { const parsed = savedDemoSchema.safeParse(item); return parsed.success && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(parsed.data.id) ? [parsed.data] : []; }));
    } catch { /* Storage is optional. */ }
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    if (!origin) return;
    try { localStorage.setItem("site-demo-links", JSON.stringify(saved)); } catch { /* History is optional. */ }
  }, [saved, origin]);
  useEffect(() => {
    if (!origin || activityLoaded || saved.length === 0) return;
    setActivityLoaded(true);
    loadActivity({ data: { ids: saved.map((s) => s.id) } }).then((rows) => {
      const map: Record<string, DemoActivity> = Object.fromEntries(rows.map((r) => [r.id, r]));
      setActivity(map);
      const stamp = Date.now();
      const gone = saved.filter((s) => { const a = map[s.id]; return a ? isInactiveDemo(a, stamp) : false; });
      if (gone.length) { setRemoved(gone.map((g) => g.name)); setSaved((list) => list.filter((s) => !gone.some((g) => g.id === s.id))); }
    }).catch(() => setNotice("Não foi possível carregar os últimos acessos agora."));
  }, [origin, saved, activityLoaded, loadActivity]);
  async function check(item: SavedDemo) {
    if (checking) return;
    setChecking(item.id);
    try {
      const verification = await verifyLink({ data: { id: item.id } });
      setSaved((list) => list.map((entry) => entry.id === item.id ? { ...entry, verification } : entry));
      setNow(Date.now());
    } catch { setNotice("Não foi possível concluir a verificação. Tente novamente."); }
    finally { setChecking(null); }
  }
  const link = id && origin ? demonstrationLink(id, origin, demo.name) : "";
  function edit(key: keyof Demonstration, value: string) { setDemo((old) => ({ ...old, [key]: value })); setId(null); setNotice(""); }
  async function save() {
    if (loading) return;
    const parsed = demoSchema.safeParse(demo);
    if (!parsed.success) { setNotice("Preencha o nome, o segmento, a chamada e a descrição antes de criar o link."); return; }
    setLoading(true); setNotice("");
    try {
      const data = await createDemonstration({ data: parsed.data });
      setId(data.id);
      const updated = [data, ...saved].slice(0, 30); setSaved(updated);
      try { localStorage.setItem("site-demo-links", JSON.stringify(updated)); } catch { /* Link remains available. */ }
      setNotice("Demonstração salva. O link está pronto para enviar.");
    } catch (e) { setNotice(e instanceof Error ? e.message : "Não foi possível criar o link."); }
    finally { setLoading(false); }
  }
  async function copy() { try { await navigator.clipboard.writeText(link); setNotice("Link copiado!"); } catch { setNotice("Selecione o link abaixo e copie para enviar."); } }
  async function copySaved(item: SavedDemo) { try { await navigator.clipboard.writeText(demonstrationLink(item.id, origin, item.name)); setNotice(`Link de ${item.name} copiado.`); } catch { setNotice("Não foi possível copiar. Abra a demonstração e copie o endereço."); } }
  const history = saved.filter(item => item.name.toLocaleLowerCase("pt-BR").includes(historyQuery.toLocaleLowerCase("pt-BR")));
  const selectedIds = selected.filter(key => saved.some(item => item.id === key));
  const deleting = saved.filter(item => pendingDelete.includes(item.id));
  function confirmRemoval() {
    if (!deleting.length) { setPendingDelete([]); return; }
    const ids = deleting.map(item => item.id);
    const updated = removeSavedDemos(saved, ids);
    try { localStorage.setItem("site-demo-links", JSON.stringify(updated)); }
    catch { setNotice("Não foi possível excluir os links neste navegador. Tente novamente."); setPendingDelete([]); return; }
    setSaved(updated);
    setSelected(previous => previous.filter(key => !ids.includes(key)));
    setPendingDelete([]);
    setNotice(`${deleting.length} ${deleting.length === 1 ? "link removido" : "links removidos"} da lista. Os sites compartilhados continuam disponíveis.`);
  }
  return <main className="min-h-screen px-4 py-8 sm:px-8"><OceanScene /><ProspectTabs active="demos" />
    <section className="mx-auto mt-8 max-w-6xl"><div className="flex flex-wrap items-start justify-between gap-4"><div><h1 className="text-3xl font-bold">Sites de demonstração.</h1><p className="mt-2 text-sm text-muted-foreground">Uma proposta com a cara de cada negócio.</p></div><Button variant="outline" onClick={() => { setDemo(blank); setId(null); setNotice(""); setTab("edit"); }}><Plus />Nova demonstração</Button></div>
      <div role="tablist" aria-label="Gerenciar demonstrações" className="mt-7 flex flex-wrap gap-2 border-b pb-4">{[{ id: "edit", label: "Criar", icon: PanelsTopLeft }, { id: "preview", label: "Prévia", icon: Eye }, { id: "history", label: `Meus links (${saved.length})`, icon: ExternalLink }].map(item => <Button key={item.id} role="tab" aria-selected={tab === item.id} variant={tab === item.id ? "default" : "outline"} onClick={() => setTab(item.id)}><item.icon />{item.label}</Button>)}</div>
      {notice && <p role="status" className="mt-4 text-sm text-primary">{notice}</p>}
      {tab === "edit" && <div className="mt-6 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"><form onSubmit={(e) => { e.preventDefault(); save(); }} className="space-y-4">
        <h2 className="text-xl font-semibold">Dados do negócio</h2>
        {([{ key: "name", label: "Nome do cliente", max: 160 }, { key: "category", label: "Segmento", max: 120 }, { key: "address", label: "Endereço", max: 400 }, { key: "phone", label: "Telefone", max: 40 }, { key: "headline", label: "Chamada", max: 200 }] as const).map((field) => <label key={field.key} className="block text-sm"><span className="mb-2 block">{field.label}</span><Input aria-label={field.label} value={demo[field.key]} maxLength={field.max} disabled={loading} onChange={(e) => edit(field.key, e.target.value)} /></label>)}
        <label className="block text-sm"><span className="mb-2 block">Descrição</span><Textarea aria-label="Descrição" value={demo.description} maxLength={1000} disabled={loading} onChange={(e) => edit("description", e.target.value)} /></label>
        <Button type="submit" className="w-full" disabled={loading || !!id}>{loading ? <Loader2 className="animate-spin" /> : <PanelsTopLeft />}Criar link da demonstração</Button>
        {id && <div className="space-y-3 border-t pt-4"><Input aria-label="Link da demonstração" readOnly value={link} /><div className="flex flex-wrap gap-2"><Button type="button" variant="outline" onClick={copy}><Copy />Copiar link</Button><Button asChild variant="outline"><Link to="/site/$slug/$code" params={{ slug: demonstrationSlug(demo.name), code: demonstrationCode(id) }}><ExternalLink />Abrir</Link></Button><Button asChild variant="whatsapp"><a href={`https://wa.me/?text=${encodeURIComponent(`Olá! Preparei uma ideia de site para ${demo.name}, sem compromisso: ${link}`)}`} target="_blank" rel="noreferrer"><MessageCircle />Enviar</a></Button></div></div>}
      </form><div className="min-w-0 border-t pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"><h2 className="text-xl font-semibold">Escolha o estilo do negócio</h2><div className="mt-5 grid grid-cols-2 gap-3">{[{ label: "Restaurante", sector: "food" }, { label: "Academia", sector: "gym" }, { label: "Advogado", sector: "law" }, { label: "Clínica", sector: "health" }, { label: "Salão de beleza", sector: "beauty" }, { label: "Pet shop", sector: "pet" }, { label: "Oficina", sector: "auto" }, { label: "Serviços locais", sector: "services" }].map(item => <Button key={item.label} type="button" variant={demo.category === item.label ? "secondary" : "outline"} className="h-auto min-h-12 whitespace-normal" disabled={loading} onClick={() => { setDemo(old => ({ ...old, category: item.label, headline: SECTOR_HEADLINE[item.sector as keyof typeof SECTOR_HEADLINE] })); setId(null); setNotice(""); }}>{item.label}</Button>)}</div><div className="mt-7 border-y py-5"><p className="break-words text-2xl font-bold">{demo.name || "Nome do seu cliente"}</p><p className="mt-2 text-sm text-muted-foreground">{demo.headline}</p></div><Button type="button" variant="outline" className="mt-6 w-full" onClick={() => setTab("preview")}><Eye />Ver site completo<ArrowRight /></Button></div></div>}
      {tab === "preview" && <div className="mt-6"><div className="mb-5 flex flex-wrap items-center justify-between gap-3"><h2 className="text-xl font-semibold">Prévia do site</h2><Button variant="outline" onClick={() => setTab("edit")}>Voltar à edição</Button></div><DemoSite key={demo.category} demo={{ ...demo, name: demo.name || "Nome do seu cliente" }} /></div>}
      {removed.length > 0 && <div role="alert" className="mt-10 flex items-start justify-between gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm"><p className="flex gap-2 text-destructive"><CircleAlert className="mt-0.5 size-4 shrink-0" /><span>{removed.length === 1 ? `"${removed[0]}" foi removida da lista porque ninguém abriu o link nas últimas 24 horas.` : `${removed.length} demonstrações foram removidas da lista porque ninguém abriu o link nas últimas 24 horas: ${removed.join(", ")}.`}</span></p><Button type="button" size="sm" variant="ghost" onClick={() => setRemoved([])}>OK</Button></div>}
      {tab === "history" && <section className="mt-6"><h2 className="text-xl font-semibold">Demonstrações criadas neste navegador</h2><div className="relative mt-4"><Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" /><Input aria-label="Buscar demonstração" placeholder="Buscar pelo nome do negócio" className="pl-10" value={historyQuery} onChange={event => setHistoryQuery(event.target.value)} /></div>{history.length === 0 && <div className="py-12 text-center"><p className="text-muted-foreground">{saved.length ? "Nenhum link encontrado." : "Nenhuma demonstração criada ainda."}</p><Button variant="outline" className="mt-4" onClick={() => setTab("edit")}><Plus />Criar demonstração</Button></div>}<ul className="mt-4 divide-y">{history.map((item) => {
        const state = verificationState(item.verification, now);
        const Icon = state === "recent" ? CircleCheck : state === "failed" ? CircleAlert : Clock;
        const label = state === "recent" ? "Verificado nas últimas 24h" : state === "failed" ? "Link indisponível na última tentativa" : state === "stale" ? "Verificação há mais de 24h" : "Ainda não verificado";
        return <li key={item.id} className="flex flex-col items-start justify-between gap-4 py-5 sm:flex-row sm:items-center">
          <Checkbox aria-label={`Selecionar ${item.name}`} checked={selectedIds.includes(item.id)} onCheckedChange={checked => setSelected(previous => checked === true ? [...new Set([...previous, item.id])] : previous.filter(key => key !== item.id))} />
          <div className="min-w-0 flex-1"><Button asChild variant="link" className="h-auto max-w-full justify-start whitespace-normal px-0 text-left"><Link to="/site/$slug/$code" params={{ slug: demonstrationSlug(item.name), code: demonstrationCode(item.id) }}><ExternalLink className="shrink-0" /><span className="break-words">{item.name}</span></Link></Button>
            <p className="mt-1 break-all text-xs text-muted-foreground">{demonstrationLink(item.id, origin || "https://semsite.lovable.app", item.name).replace(/^https?:\/\//, "")}</p>
            <p role="status" className={`mt-1 flex items-start gap-2 text-xs ${state === "recent" ? "text-primary" : state === "failed" ? "text-destructive" : "text-muted-foreground"}`}><Icon className="size-4 shrink-0" />{label}</p>
            {activity[item.id] && <p className="mt-1 flex items-center gap-1.5 text-xs text-foreground"><Eye className="size-3.5 shrink-0" />{activity[item.id]?.lastOpenedAt ? <>Último acesso: <time dateTime={activity[item.id]?.lastOpenedAt ?? ""}>{new Date(activity[item.id]?.lastOpenedAt ?? 0).toLocaleString("pt-BR")}</time></> : "Ninguém abriu ainda — sai da lista 24h após a criação"}</p>}
            {item.verification && <p className="mt-1 text-xs text-muted-foreground">Última tentativa: <time dateTime={item.verification.checkedAt}>{new Date(item.verification.checkedAt).toLocaleString("pt-BR")}</time></p>}
          </div><div className="flex flex-wrap gap-2"><Button type="button" variant="outline" size="sm" onClick={() => copySaved(item)} aria-label={`Copiar link de ${item.name}`}><Copy />Copiar</Button><Button type="button" variant="outline" size="sm" disabled={checking !== null} onClick={() => check(item)} aria-label={`Verificar link de ${item.name}`}>
            {checking === item.id ? <Loader2 className="animate-spin" /> : <RefreshCw />} {checking === item.id ? "Verificando…" : "Verificar link"}
          </Button><Button type="button" variant="ghost" size="icon" aria-label={`Excluir link de ${item.name}`} title={`Excluir link de ${item.name}`} onClick={() => setPendingDelete([item.id])}><Trash2 className="size-4 text-destructive" /></Button></div>
        </li>;
      })}</ul></section>}
      {tab === "history" && history.length > 0 && <div className="flex flex-wrap items-center gap-3 border-y py-3"><label className="flex cursor-pointer items-center gap-2 text-sm"><Checkbox aria-label="Selecionar links exibidos" checked={history.every(item => selectedIds.includes(item.id)) ? true : history.some(item => selectedIds.includes(item.id)) ? "indeterminate" : false} onCheckedChange={checked => setSelected(previous => checked === true ? [...new Set([...previous, ...history.map(item => item.id)])] : previous.filter(key => !history.some(item => item.id === key)))} />Selecionar exibidos</label>{selectedIds.length > 0 && <><span className="text-sm text-muted-foreground">{selectedIds.length} selecionados</span><Button variant="destructive" size="sm" onClick={() => setPendingDelete(selectedIds)}><Trash2 />Excluir selecionados</Button><Button variant="ghost" size="sm" onClick={() => setSelected([])}>Cancelar seleção</Button></>}</div>}
      <AlertDialog open={pendingDelete.length > 0} onOpenChange={open => { if (!open) setPendingDelete([]); }}><AlertDialogContent className="max-h-[85dvh] max-w-[calc(100%-2rem)] overflow-y-auto sm:max-w-lg"><AlertDialogHeader><AlertDialogTitle>Excluir {deleting.length === 1 ? `o link de ${deleting[0]?.name}` : `${deleting.length} links`}?</AlertDialogTitle><AlertDialogDescription>Os links serão removidos apenas da lista deste navegador. Os sites de demonstração continuarão abrindo para quem já recebeu o endereço. A remoção da lista não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader><ul className="max-h-32 overflow-y-auto text-sm">{deleting.map(item => <li key={item.id} className="break-words py-1">{item.name}</li>)}</ul><AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><Button variant="destructive" disabled={!deleting.length} onClick={confirmRemoval}><Trash2 />Confirmar exclusão</Button></AlertDialogFooter></AlertDialogContent></AlertDialog>
    </section>
  </main>;
}