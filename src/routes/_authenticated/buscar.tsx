import { detectNiche } from "@/lib/business-niche";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useRef, useState } from "react";
import { MapPin, MessageCircle, Phone, Search, Star, Check, Loader2, ExternalLink, PanelsTopLeft, AlertTriangle, RefreshCw, SearchX, Store, X, History, Radar, ScanSearch, RotateCw, SlidersHorizontal, HeartPulse, Utensils, Scissors, Car, House, PawPrint, Dumbbell, BriefcaseBusiness, ArrowUpRight, Mail, Instagram, Facebook, Flame, Copy, type LucideIcon } from "lucide-react";
import { searchLeads, type Lead } from "@/lib/leads.functions";
import { clientSearchError } from "@/lib/search-errors";
import { filterProspects, type ProspectFilter, type ProspectOrder } from "@/lib/prospect-filters";
import { ProspectMessage } from "@/components/ProspectMessage";
import { BusinessXrayDialog } from "@/components/BusinessXrayDialog";
import { XrayDialog } from "@/components/XrayDialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OceanScene } from "@/components/OceanScene";
import { isMobilePhone, phoneCallLink, prospectPriority, rankProspects } from "@/lib/leads";
import { approachReason, HEAT_LABEL, leadHeat } from "@/lib/lead-priority";
import { nextSuggestedCity } from "@/lib/cities";
import { draftForClient } from "@/lib/demonstrations";
import { ProspectTabs } from "@/components/ProspectTabs";
import { FirstStepsCard } from "@/components/FirstStepsCard";
import { useFollowUp } from "@/lib/use-follow-up";
import { ClientStageSelect } from "@/components/ClientStageSelect";

export const Route = createFileRoute("/_authenticated/buscar")({
  head: () => ({
    meta: [
      { title: "SemSite | Encontre empresas sem site na sua cidade" },
      { name: "description", content: "Encontre registros de empresas sem site cadastrado na Overture Maps por cidade e segmento. Organize seus contatos, personalize mensagens e prepare demonstrações para suas propostas." },
      { property: "og:title", content: "SemSite — Seu próximo projeto começa aqui" },
      { property: "og:description", content: "Negócios sem site, novas oportunidades. Busque por cidade e segmento, prepare sua mensagem e mostre uma ideia de site ao cliente." },
      { name: "twitter:title", content: "SemSite — Seu próximo projeto começa aqui" },
      { name: "twitter:description", content: "Encontre empresas sem site por cidade e segmento. Prepare mensagens e demonstrações para apresentar seu trabalho." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Buscar,
});

type Query = { category: string; city: string };
const RECENT_KEY = "recent-searches-v1";
const GROUP_ICONS: Record<string, LucideIcon> = { Saúde: HeartPulse, Comida: Utensils, Beleza: Scissors, Automotivo: Car, Casa: House, Pets: PawPrint, Fitness: Dumbbell, Serviços: BriefcaseBusiness };
const GROUPS: { label: string; items: string[] }[] = [
  { label: "Saúde", items: ["Médico", "Dentista", "Clínica", "Fisioterapia", "Psicólogo", "Nutricionista", "Farmácia", "Laboratório", "Ótica"] },
  { label: "Comida", items: ["Restaurante", "Pizzaria", "Lanchonete", "Hamburgueria", "Padaria", "Cafeteria", "Açaí", "Sorveteria", "Confeitaria", "Marmitaria", "Espetinho"] },
  { label: "Beleza", items: ["Barbearia", "Salão de beleza", "Manicure", "Estética", "Sobrancelha", "Tatuagem", "Cílios", "Depilação"] },
  { label: "Automotivo", items: ["Oficina mecânica", "Auto elétrica", "Lava jato", "Borracharia", "Funilaria", "Autopeças", "Estética automotiva", "Moto peças"] },
  { label: "Casa", items: ["Eletricista", "Encanador", "Marcenaria", "Vidraçaria", "Serralheria", "Material de construção", "Pintor", "Gesseiro", "Climatização"] },
  { label: "Pets", items: ["Pet shop", "Veterinário", "Banho e tosa", "Adestrador"] },
  { label: "Fitness", items: ["Academia", "Crossfit", "Pilates", "Personal trainer"] },
  { label: "Serviços", items: ["Contabilidade", "Advogado", "Imobiliária", "Assistência técnica", "Costureira", "Gráfica", "Fotógrafo", "Floricultura", "Escola de idiomas", "Auto escola", "Buffet"] },
];

function Buscar() {
  const followUp = useFollowUp();
  const navigate = useNavigate();
  const search = useServerFn(searchLeads);
  const [category, setCategory] = useState("");
  // Overture only. City files are retrieved on the server, with no map API charge.
  const provider = "overture" as const;
  const [group, setGroup] = useState("Saúde");
  const [target, setTarget] = useState(20);
  const [city, setCity] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [next, setNext] = useState<string | null>(null);
  const [scanned, setScanned] = useState(0);
  const [nearby, setNearby] = useState<string[]>([]);
  const [cityInfo, setCityInfo] = useState<{ name: string; uf: string; places: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryToken, setRetryToken] = useState<string | null>(null);
  const [contacted, setContacted] = useState<Set<string>>(new Set());
  const [searched, setSearched] = useState(false);
  const [searchesLeft, setSearchesLeft] = useState<number | null>(null);
  useEffect(() => { supabase.rpc("searches_left_today").then(({ data }) => { if (typeof data === "number") setSearchesLeft(data); }); }, []);
  const [activeQuery, setActiveQuery] = useState<Query | null>(null);
  const [recent, setRecent] = useState<Query[]>([]);
  const [filter, setFilter] = useState<ProspectFilter>("all");
  const [order, setOrder] = useState<ProspectOrder>("priority");
  const [resultTerm, setResultTerm] = useState("");
  const [messageLead, setMessageLead] = useState<Lead | null>(null);
  const [xrayLead, setXrayLead] = useState<Lead | null>(null);
  const [bizXrayLead, setBizXrayLead] = useState<Lead | null>(null);
  const busy = useRef(false);
  const queryChanged = activeQuery && (activeQuery.category !== category.trim() || activeQuery.city !== city.trim());
  const ranked = useMemo(() => rankProspects(leads), [leads]);
  const visible = useMemo(() => filterProspects(leads, followUp.clients, filter, order, resultTerm), [leads, followUp.clients, filter, order, resultTerm]);
  const reachableCount = ranked.filter((lead) => isMobilePhone(lead)).length;
  const priorityCount = ranked.filter((lead) => prospectPriority(lead).score >= 65).length;

  // Keeps the results when the phone reloads the page after returning from WhatsApp.
  useEffect(() => {
    if (!searched || !activeQuery) return;
    try { sessionStorage.setItem("last-search-overture-v1", JSON.stringify({ leads, scanned, next, activeQuery, provider })); } catch { /* Optional. */ }
  }, [leads, scanned, next, activeQuery, searched, provider]);

  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem("last-search-overture-v1") ?? "null");
      if (saved && Array.isArray(saved.leads) && saved.activeQuery?.city) {
        setLeads(saved.leads); setScanned(Number(saved.scanned) || 0); setNext(typeof saved.next === "string" ? saved.next : null);
        setActiveQuery(saved.activeQuery); setCategory(saved.activeQuery.category); setCity(saved.activeQuery.city); setSearched(true);
      }
    } catch { /* Optional. */ }
    try { if (sessionStorage.getItem("last-search-overture-v1")) throw 0; const suggested = nextSuggestedCity(localStorage.getItem("last-suggested-city")); setCity(suggested); localStorage.setItem("last-suggested-city", suggested); }
    catch (e) { if (e !== 0) setCity(nextSuggestedCity(null)); }
    try {
      const stored: unknown = JSON.parse(localStorage.getItem("contacted-leads") ?? "[]");
      if (Array.isArray(stored)) setContacted(new Set(stored.filter((id): id is string => typeof id === "string")));
    } catch { /* Keep the search usable if browser storage is unavailable. */ }
    try {
      const stored: unknown = JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
      if (Array.isArray(stored)) setRecent(stored.filter((r): r is Query => typeof r?.category === "string" && typeof r?.city === "string").slice(0, 5));
    } catch { /* Recent searches are optional. */ }
  }, []);

  async function run(pageToken?: string, preset?: Query) {
    if (busy.current) return;
    const typed = preset ?? { category: category.trim(), city: city.trim() };
    if (!pageToken && (typed.category.length < 2 || typed.city.length < 2)) { setError("Informe um tipo de negócio e uma cidade com pelo menos 2 caracteres."); return; }
    const query = pageToken ? activeQuery : typed;
    if (!query) return;
    busy.current = true;
    setLoading(true);
    setError(null);
    setRetryToken(null);
    if (!pageToken) { setNearby([]); setLeads([]); setScanned(0); setNext(null); setSearched(false); setFilter("all"); setResultTerm(""); }
    try {
      let acc = pageToken ? leads : [];
      const goal = acc.length + target;
      let token = pageToken;
      let total = 0;
      let nextTok: string | null = null;
      let pages = 0;
      do {
        const r = await search({ data: { ...query, pageToken: token, provider } });
        if (r.searchesLeft >= 0 || !token) setSearchesLeft(r.searchesLeft);
        acc = rankProspects([...acc, ...r.leads]);
        total += r.scanned;
        if (!token) { setNearby(r.nearby); setCityInfo({ name: r.cityName, uf: r.cityUf, places: r.cityPlaces }); }
        nextTok = r.nextPageToken;
        token = nextTok ?? undefined;
        pages++;
        setLeads(acc);
      } while (token && acc.length < goal && pages < 10);
      setScanned((s) => (pageToken ? s + total : total));
      setNext(nextTok);
      setActiveQuery(query);
      setSearched(true);
      if (!pageToken) {
        const key = (q: Query) => `${q.category.toLowerCase()}|${q.city.toLowerCase()}`;
        const updated = [query, ...recent.filter((q) => key(q) !== key(query))].slice(0, 5);
        setRecent(updated);
        try { localStorage.setItem(RECENT_KEY, JSON.stringify(updated)); } catch { /* Optional. */ }
      }
    } catch (e) {
      setRetryToken(pageToken ?? null);
      setError(clientSearchError(e));
    } finally {
      busy.current = false;
      setLoading(false);
    }
  }

  function markContacted(l: Lead) {
    const current = followUp.clients.find((client) => client.id === l.id);
    if (!followUp.track(l, !current || current.stage === "new" ? "contacted" : current.stage)) return false;
    const updated = new Set(contacted).add(l.id);
    setContacted(updated);
    try { localStorage.setItem("contacted-leads", JSON.stringify([...updated])); }
    catch { /* The current session still tracks contacted leads. */ }
    return true;
  }
  function demonstrate(lead: Lead) {
    followUp.track(lead);
    try { sessionStorage.setItem("site-demo-draft", JSON.stringify(draftForClient(lead, activeQuery?.category))); navigate({ to: "/demonstracoes" }); }
    catch { setError("Permita o armazenamento deste navegador para preparar a demonstração do cliente."); }
  }

  return (
    <main className="search-page relative min-h-screen px-4 pb-20 pt-3 sm:px-8">
      <OceanScene />
      <ProspectTabs active="search" />

      <section className="mx-auto mt-7 max-w-6xl sm:mt-10">
        <FirstStepsCard />
        <div className="flex items-start justify-between gap-4">
          <div><p className="kicker-pill mb-3"><span className="pulse-dot" />Radar de oportunidades</p>
            <h1 className="font-display text-5xl leading-[0.92] tracking-wide sm:text-6xl">Buscar <span className="text-gradient-primary">clientes.</span></h1>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">Ache o negócio, mostre o site pronto, feche e cobre. Comece pela busca.</p>
          </div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); run(); }} className="form-card mt-6 grid gap-5 sm:grid-cols-2 sm:gap-6">
          <div className="grid gap-2 sm:col-span-2">
            <label htmlFor="busca-negocio" className="text-sm font-semibold">Qual tipo de negócio?</label>
            <div className="relative">
              <Store className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-primary" />
              <Input id="busca-negocio" aria-label="Tipo de negócio" required minLength={2} maxLength={80} disabled={loading} placeholder="Ex: barbearia, pet shop…" value={category} onChange={(e) => setCategory(e.target.value)} className="h-12 pl-10 pr-10 text-base" />
              {category && !loading && (
                <Button type="button" variant="ghost" size="icon" aria-label="Limpar tipo de negócio" onClick={() => setCategory("")} className="absolute right-2 top-1/2 size-8 -translate-y-1/2 text-muted-foreground"><X className="size-4" /></Button>
              )}
            </div>
            <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-8">
              {GROUPS.map((g) => { const Icon = GROUP_ICONS[g.label] ?? Store; return (
                <Button key={g.label} type="button" disabled={loading} variant="outline" aria-pressed={group === g.label} onClick={() => setGroup(g.label)}
                  className={`h-16 min-w-0 flex-col gap-2 rounded-2xl px-1 text-[11px] sm:h-20 sm:text-xs ${group === g.label ? "cat-tile-on" : "border-border text-muted-foreground"}`}><Icon className="size-5" />{g.label}</Button>
              ); })}
            </div>
            <div className="city-scroller -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap">
              {(GROUPS.find((g) => g.label === group)?.items ?? []).map((s) => {
                const on = category.trim().toLowerCase() === s.toLowerCase();
                return (
                  <Button key={s} type="button" disabled={loading} variant={on ? "default" : "outline"} size="sm" aria-pressed={on} className={`shrink-0 rounded-full ${on ? "chip-on" : ""}`} onClick={() => setCategory(s)}>
                    {on && <Check className="size-3.5" />}{s}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-2">
            <label htmlFor="busca-cidade" className="text-sm font-semibold">Em qual cidade?</label>
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-primary" />
              <Input id="busca-cidade" aria-label="Cidade" required minLength={2} maxLength={80} disabled={loading} placeholder="Digite a cidade, ex: Holambra, SP" value={city} onChange={(e) => setCity(e.target.value)} className="h-12 pl-10 text-base" />
            </div>
          </div>

          <div className="grid gap-2">
            <span className="text-sm font-semibold">Quantidade de clientes</span>
            <div className="seg-control" role="group" aria-label="Quantidade de clientes">
              {[10, 20, 40, 60].map((n) => (
                <Button key={n} type="button" disabled={loading} variant="ghost" aria-pressed={target === n} className={`h-12 rounded-xl text-base font-bold ${target === n ? "seg-on" : "text-muted-foreground"}`} onClick={() => setTarget(n)}>{n}</Button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Resultados em páginas de 20. Você pode carregar mais sem gastar outra busca.</p>
          </div>


          <Button type="submit" size="lg" disabled={loading} className="cta-primary h-14 min-w-0 rounded-2xl pl-5 pr-2 text-base font-extrabold sm:col-span-2">
            {loading ? <Loader2 className="size-5 animate-spin" /> : <Search className="size-5" />}
            <span className="min-w-0 whitespace-normal break-words">{loading ? "Buscando clientes…" : "Encontrar clientes sem site"}</span>
            {!loading && <span className="cta-arrow"><ArrowUpRight className="size-5" /></span>}
          </Button>
          {searchesLeft !== null && searchesLeft >= 0 && <p className="text-center text-sm text-muted-foreground sm:col-span-2">{searchesLeft} de 5 buscas grátis hoje · <Link to="/verificado" className="font-bold text-primary hover:underline">Buscar sem limite</Link></p>}

          {recent.length > 0 && (
            <div className="grid gap-2 border-t border-border pt-4 sm:col-span-2">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground"><History className="size-3.5" />Buscas recentes</p>
              <div className="city-scroller -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap">
                {recent.map((r) => (
                  <Button key={`${r.category}|${r.city}`} type="button" variant="secondary" size="sm" disabled={loading} className="shrink-0 rounded-full" onClick={() => { setCategory(r.category); setCity(r.city); run(undefined, r); }}>
                    <RotateCw className="size-3.5 text-primary" />{r.category} · {r.city.split(",")[0]}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </form>
        <p className="mt-4 text-sm text-muted-foreground">Dados abertos da Overture Maps, com telefone e sem site próprio cadastrado na base. As informações podem estar incompletas ou desatualizadas. Confirme antes de abordar.</p>

        {error && (
          <div role="alert" className="mt-6 flex flex-col gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex gap-2 text-sm text-destructive"><AlertTriangle className="mt-0.5 size-4 shrink-0" />{error}</p>
            <Button size="sm" variant="outline" disabled={loading} onClick={() => run(retryToken ?? undefined)}><RefreshCw className="size-4" />Tentar novamente</Button>
          </div>
        )}
        {followUp.storageError && <p role="alert" className="mt-4 text-destructive">{followUp.storageError}</p>}
        {loading && (
          <div aria-live="polite" className="mt-8">
            <p className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="size-4 animate-spin" />Procurando negócios na Overture Maps…</p>
            {leads.length === 0 && <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[0, 1, 2].map((i) => <div key={i} className="glass h-56 animate-pulse rounded-lg" />)}</div>}
          </div>
        )}
        {searched && !loading && !error && leads.length === 0 && (
          <div className="glass mt-8 rounded-lg p-6 text-center">
            <SearchX className="mx-auto size-8 text-muted-foreground" />
            <p className="mt-3 font-semibold">{scanned === 0 ? "Nenhum registro encontrado nesse recorte da base." : `Os ${scanned} registros encontrados têm site cadastrado na base.`}</p>
            <p className="mt-1 text-sm text-muted-foreground">{next ? "Busque mais resultados ou tente outra categoria ou cidade." : cityInfo && cityInfo.places < 100 ? `A base aberta tem só ${cityInfo.places} lugares com telefone em ${cityInfo.name}, ${cityInfo.uf}. Tente uma categoria mais ampla (ex.: restaurante, salão) ou uma cidade maior por perto; isso não significa que não existam negócios lá.` : "A cobertura varia por município. Tente outra categoria ou cidade; isso não significa que não existam negócios na região."}</p>
          </div>
        )}
        {nearby.length > 0 && !loading && leads.length > 0 && (
          <p className="mt-8 rounded-lg border border-border/60 bg-secondary/40 p-3 text-sm text-muted-foreground">Poucos resultados em {cityInfo?.name ?? "essa cidade"}. Incluí negócios de cidades vizinhas: {nearby.join(", ")}.</p>
        )}
        {scanned > 0 && (
          <p className="mt-8 text-sm text-muted-foreground">
            <span className="font-bold text-primary">{leads.length}</span> sem site cadastrado, de {scanned} locais analisados
             · <a href="https://docs.overturemaps.org/attribution/" target="_blank" rel="noreferrer" className="underline">Overture Maps, fontes e licenças</a>
          </p>
        )}

        {leads.length > 0 && <section aria-label="Filtrar resultados" className="mt-6 border-y py-5">
          <div className="mb-5 grid grid-cols-3 divide-x border-b pb-5">
            {[{ label: "Sem site", value: ranked.length }, { label: "Com WhatsApp", value: reachableCount }, { label: "Prioridade alta", value: priorityCount }].map((metric) => <div key={metric.label} className="px-2 first:pl-0 sm:px-5"><p className="font-display text-3xl font-bold text-primary">{metric.value}</p><p className="mt-1 text-xs text-muted-foreground">{metric.label}</p></div>)}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <SlidersHorizontal className="mr-1 size-4 text-muted-foreground" />
            {([{ value: "all", label: "Todos" }, { value: "reachable", label: "Só celular (WhatsApp)" }, { value: "priority", label: "Prioridade alta" }, { value: "new", label: "Novos" }] as const).map((item) => <Button key={item.value} variant={filter === item.value ? "secondary" : "ghost"} size="sm" aria-pressed={filter === item.value} onClick={() => setFilter(item.value)}>{item.label}</Button>)}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_220px]">
            <Input aria-label="Buscar nos resultados" placeholder="Nome, bairro ou categoria" value={resultTerm} onChange={(event) => setResultTerm(event.target.value)} />
            <Select value={order} onValueChange={(value) => { if (value === "priority" || value === "reviews" || value === "name") setOrder(value); }}><SelectTrigger aria-label="Ordenar resultados"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="priority">Mais quentes</SelectItem><SelectItem value="reviews">Mais avaliações</SelectItem><SelectItem value="name">Nome: A a Z</SelectItem></SelectContent></Select>
          </div>
          <p role="status" className="mt-3 text-xs text-muted-foreground">{visible.length} de {ranked.length} clientes</p>
        </section>}
        {leads.length > 0 && visible.length === 0 && <div className="py-12 text-center"><SearchX className="mx-auto size-7 text-muted-foreground" /><p className="mt-3 font-semibold">Nenhum cliente corresponde aos filtros.</p><Button variant="link" onClick={() => { setFilter("all"); setResultTerm(""); }}>Limpar filtros</Button></div>}

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
           {visible.map((l) => {
            const stage = followUp.clients.find((client) => client.id === l.id)?.stage;
            const done = stage ? stage !== "new" : contacted.has(l.id);
            const priority = prospectPriority(l);
            const heat = leadHeat(l);
            const reason = approachReason(l, activeQuery?.city ?? city);
            return (
              <article
                key={l.id}
                className="glass flex min-w-0 flex-col rounded-lg p-5 transition-colors hover:border-primary/50"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="min-w-0 break-words text-lg font-bold">{l.name}</h3>
                  <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
                    <span title="Temperatura do lead: quem vale abordar primeiro" className={`flex items-center gap-1 rounded-sm px-2 py-0.5 text-xs font-semibold ${heat === "quente" ? "bg-destructive/15 text-destructive" : heat === "morno" ? "bg-amber-500/15 text-amber-500" : "bg-muted text-muted-foreground"}`}><Flame className="size-3" />{HEAT_LABEL[heat]}</span>
                    {done && <span className="flex items-center gap-1 rounded-sm bg-secondary px-2 py-0.5 text-xs text-primary"><Check className="size-3" />Contatado</span>}
                  </div>
                </div>
                <p className="text-xs uppercase tracking-wide text-primary">{detectNiche(l.name, l.category, activeQuery?.category)}</p>
                {priority.score >= 65 && <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-primary"><Radar className="size-3.5" />Prioridade alta</p>}
                {priority.reasons.length > 0 && <p className="mt-1 text-xs text-muted-foreground">{priority.reasons.join(" · ")}</p>}
                <p className="mt-2 flex gap-1.5 break-words text-sm text-muted-foreground"><MapPin className="mt-0.5 size-4 shrink-0" />{l.address}</p>
                {(l.phone || l.intlPhone) && <p className="mt-1 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground"><Phone className="size-4 shrink-0" />{l.phone || l.intlPhone}<span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${isMobilePhone(l) ? "bg-whatsapp/15 text-whatsapp" : "bg-muted text-muted-foreground"}`}>{isMobilePhone(l) ? "Celular (WhatsApp)" : "Fixo"}</span></p>}
                {l.email && <p className="mt-1 flex items-center gap-1.5 break-all text-sm text-muted-foreground"><Mail className="size-4 shrink-0" />{l.email}</p>}
                {(l.instagram || l.facebook) && (
                  <p className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    {l.instagram && <span className="flex items-center gap-1"><Instagram className="size-4 shrink-0" />@{l.instagram}</span>}
                    {l.facebook && <span className="flex items-center gap-1 break-all"><Facebook className="size-4 shrink-0" />{l.facebook}</span>}
                  </p>
                )}
                {l.rating && <p className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground"><Star className="size-4 text-primary" /><span className="font-semibold text-foreground">{l.rating}</span> · {l.reviews ?? 0} avaliações</p>}
                <div className="mt-3 flex items-start gap-1.5 rounded-md border border-dashed border-border p-2">
                  <p className="min-w-0 flex-1 text-xs italic text-muted-foreground">{reason}</p>
                  <Button type="button" variant="ghost" size="icon" aria-label={`Copiar motivo de abordagem de ${l.name}`} title="Copiar motivo de abordagem" className="size-7 shrink-0 text-muted-foreground" onClick={() => { void navigator.clipboard?.writeText(reason).catch(() => {}); }}><Copy className="size-3.5" /></Button>
                </div>
                <div className="mt-4"><ClientStageSelect value={followUp.clients.find((client) => client.id === l.id)?.stage ?? "new"} onChange={(stage) => followUp.track(l, stage)} label={`Etapa de ${l.name}`} /></div>
                <Button variant="ghost" size="sm" className="mt-2" onClick={() => { if (followUp.track(l)) navigate({ to: "/clientes" }); }}>Acompanhar e definir lembrete</Button>
                <Button variant="outline" className="mt-4" onClick={() => demonstrate(l)}><PanelsTopLeft />Demonstração do site</Button>
                <Button variant="outline" className="mt-2" onClick={() => setBizXrayLead(l)}><ScanSearch />Raio-X do negócio</Button>
                <Button variant="outline" className="mt-2" onClick={() => setXrayLead(l)}><Radar />Roteiro de vendas</Button>
                <div className="mt-auto flex gap-2 pt-4">
                  {isMobilePhone(l) ? (
                    <Button variant="whatsapp" className="min-w-0 flex-1" onClick={() => setMessageLead(l)}><MessageCircle className="size-4" />Preparar mensagem</Button>
                  ) : (
                    <span className="flex-1 self-center text-sm text-muted-foreground">{(l.intlPhone || l.phone) ? "Fixo: ligue para oferecer" : "Sem telefone cadastrado"}</span>
                  )}
                  {phoneCallLink(l) && (
                    <Button asChild variant="outline" size="icon" aria-label={`Ligar para ${l.name}`}>
                      <a href={phoneCallLink(l)!}><Phone className="size-4" /></a>
                    </Button>
                  )}
                  {l.mapsUrl && (
                    <Button asChild variant="outline" size="icon" aria-label="Abrir no Maps">
                      <a href={l.mapsUrl} target="_blank" rel="noreferrer"><ExternalLink className="size-4" /></a>
                    </Button>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {next && !queryChanged && (
          <div className="mt-8 text-center">
            <Button variant="secondary" onClick={() => run(next)} disabled={loading}>
              {loading && <Loader2 className="size-4 animate-spin" />} Buscar mais
            </Button>
          </div>
        )}
      </section>
      {messageLead && <ProspectMessage key={messageLead.id} lead={messageLead} close={() => setMessageLead(null)} markContacted={() => markContacted(messageLead)} />}
      {bizXrayLead && <BusinessXrayDialog key={bizXrayLead.id} lead={bizXrayLead} city={activeQuery?.city ?? city} close={() => setBizXrayLead(null)} />}
      {xrayLead && <XrayDialog key={xrayLead.id} lead={xrayLead} others={ranked} city={activeQuery?.city ?? city} close={() => setXrayLead(null)} />}
    </main>
  );
}
