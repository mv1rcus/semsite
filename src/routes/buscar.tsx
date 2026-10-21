import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useRef, useState } from "react";
import { MapPin, MessageCircle, Phone, Search, Star, Check, Loader2, ExternalLink, PanelsTopLeft, AlertTriangle, RefreshCw, SearchX, Store, X, History } from "lucide-react";
import { searchLeads, type Lead } from "@/lib/leads.functions";
import { clientSearchError } from "@/lib/search-errors";
import { whatsappLink } from "@/lib/message";
import { Letters3D } from "@/components/Letters3D";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OceanScene } from "@/components/OceanScene";
import { prospectPriority, rankProspects } from "@/lib/leads";
import { nextSuggestedCity } from "@/lib/cities";
import { CityPicker } from "@/components/CityPicker";
import { draftForClient } from "@/lib/demonstrations";
import { ProspectTabs } from "@/components/ProspectTabs";
import { useFollowUp } from "@/lib/use-follow-up";
import { ClientStageSelect } from "@/components/ClientStageSelect";

export const Route = createFileRoute("/buscar")({
  head: () => ({
    meta: [
      { title: "Buscar clientes sem site — Caça Clientes" },
      { name: "description", content: "Busque negócios sem site em qualquer cidade." },
      { property: "og:title", content: "Buscar clientes — Caça Clientes" },
      { property: "og:description", content: "Busque negócios sem site em qualquer cidade." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Buscar,
});

type Query = { category: string; city: string };
const RECENT_KEY = "recent-searches-v1";
const GROUPS: { label: string; items: string[] }[] = [
  { label: "Saúde", items: ["Médico", "Dentista", "Clínica", "Fisioterapia", "Psicólogo", "Nutricionista", "Farmácia", "Laboratório"] },
  { label: "Comida", items: ["Restaurante", "Pizzaria", "Lanchonete", "Hamburgueria", "Padaria", "Cafeteria", "Açaí", "Sorveteria"] },
  { label: "Beleza", items: ["Barbearia", "Salão de beleza", "Manicure", "Estética", "Sobrancelha", "Tatuagem"] },
  { label: "Automotivo", items: ["Oficina mecânica", "Auto elétrica", "Lava jato", "Borracharia", "Funilaria", "Autopeças"] },
  { label: "Casa", items: ["Eletricista", "Encanador", "Marcenaria", "Vidraçaria", "Serralheria", "Material de construção"] },
  { label: "Pets", items: ["Pet shop", "Veterinário", "Banho e tosa", "Adestrador"] },
  { label: "Fitness", items: ["Academia", "Crossfit", "Pilates", "Personal trainer"] },
  { label: "Serviços", items: ["Contabilidade", "Advogado", "Imobiliária", "Assistência técnica", "Costureira", "Gráfica"] },
];

function Buscar() {
  const followUp = useFollowUp();
  const navigate = useNavigate();
  const search = useServerFn(searchLeads);
  const [category, setCategory] = useState("");
  const [group, setGroup] = useState(GROUPS[0].label);
  const [city, setCity] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [next, setNext] = useState<string | null>(null);
  const [scanned, setScanned] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryToken, setRetryToken] = useState<string | null>(null);
  const [contacted, setContacted] = useState<Set<string>>(new Set());
  const [searched, setSearched] = useState(false);
  const [activeQuery, setActiveQuery] = useState<Query | null>(null);
  const [recent, setRecent] = useState<Query[]>([]);
  const busy = useRef(false);
  const queryChanged = activeQuery && (activeQuery.category !== category.trim() || activeQuery.city !== city.trim());
  const ranked = useMemo(() => rankProspects(leads).sort((a, b) => Number(contacted.has(a.id)) - Number(contacted.has(b.id))), [leads, contacted]);

  useEffect(() => {
    try { const suggested = nextSuggestedCity(localStorage.getItem("last-suggested-city")); setCity(suggested); localStorage.setItem("last-suggested-city", suggested); }
    catch { setCity(nextSuggestedCity(null)); }
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
    if (!pageToken) { setLeads([]); setScanned(0); setNext(null); setSearched(false); }
    try {
      const r = await search({ data: { ...query, pageToken } });
      setLeads((prev) => rankProspects(pageToken ? [...prev, ...r.leads] : r.leads));
      setScanned((s) => (pageToken ? s + r.scanned : r.scanned));
      setNext(r.nextPageToken);
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
    followUp.track(l);
    const updated = new Set(contacted).add(l.id);
    setContacted(updated);
    try { localStorage.setItem("contacted-leads", JSON.stringify([...updated])); }
    catch { /* The current session still tracks contacted leads. */ }
  }
  function demonstrate(lead: Lead) {
    followUp.track(lead);
    try { sessionStorage.setItem("site-demo-draft", JSON.stringify(draftForClient(lead))); navigate({ to: "/demonstracoes" }); }
    catch { setError("Permita o armazenamento deste navegador para preparar a demonstração do cliente."); }
  }

  return (
    <main className="relative min-h-screen px-4 pb-20 pt-8 sm:px-8">
      <OceanScene />
      <ProspectTabs active="search" />

      <section className="mx-auto mt-10 max-w-6xl">
        <h1 className="text-4xl font-extrabold leading-tight sm:text-6xl">
          <Letters3D text="Quem ainda" /> <br />
          <Letters3D text="não tem site?" className="text-gradient" />
        </h1>

        <form onSubmit={(e) => { e.preventDefault(); run(); }} className="glass mt-8 grid gap-5 rounded-2xl p-4 sm:p-6">
          <div className="grid gap-2">
            <label htmlFor="busca-negocio" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">1 · O que você quer caçar?</label>
            <div className="relative">
              <Store className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-primary" />
              <Input id="busca-negocio" aria-label="Tipo de negócio" required minLength={2} maxLength={80} disabled={loading} placeholder="Ex: barbearia, pet shop…" value={category} onChange={(e) => setCategory(e.target.value)} className="h-12 pl-10 pr-10 text-base" />
              {category && !loading && (
                <button type="button" aria-label="Limpar tipo de negócio" onClick={() => setCategory("")} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"><X className="size-4" /></button>
              )}
            </div>
            <div className="city-scroller -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap">
              {GROUPS.map((g) => (
                <button key={g.label} type="button" aria-pressed={group === g.label} onClick={() => setGroup(g.label)}
                  className={`shrink-0 rounded-md px-3 py-1.5 text-xs font-bold uppercase tracking-wide ${group === g.label ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"}`}>{g.label}</button>
              ))}
            </div>
            <div className="city-scroller -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap">
              {(GROUPS.find((g) => g.label === group)?.items ?? []).map((s) => {
                const on = category.trim().toLowerCase() === s.toLowerCase();
                return (
                  <Button key={s} type="button" disabled={loading} variant={on ? "default" : "outline"} size="sm" aria-pressed={on} className="shrink-0 rounded-full" onClick={() => setCategory(s)}>
                    {on && <Check className="size-3.5" />}{s}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">2 · Em qual cidade?</label>
            <CityPicker value={city} disabled={loading} onChange={setCity} />
          </div>

          <Button type="submit" size="lg" disabled={loading} className="h-14 text-base font-bold shadow-[var(--shadow-glow)]">
            {loading ? <Loader2 className="size-5 animate-spin" /> : <Search className="size-5" />}
            <span className="truncate">{loading ? "Caçando clientes…" : category.trim() && city.trim() ? `Caçar ${category.trim().toLowerCase()} em ${city.split(",")[0]}` : "Caçar clientes"}</span>
          </Button>

          {recent.length > 0 && (
            <div className="grid gap-2 border-t border-border pt-4">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground"><History className="size-3.5" />Buscas recentes</p>
              <div className="city-scroller -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap">
                {recent.map((r) => (
                  <Button key={`${r.category}|${r.city}`} type="button" variant="secondary" size="sm" disabled={loading} className="shrink-0 rounded-full" onClick={() => { setCategory(r.category); setCity(r.city); run(undefined, r); }}>
                    {r.category} · {r.city.split(",")[0]}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </form>
        <p className="mt-4 text-sm text-muted-foreground">Mostramos só negócios sem site no Google, priorizando quem tem telefone e boa reputação. Fechamento não é garantido.</p>

        {error && (
          <div role="alert" className="mt-6 flex flex-col gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex gap-2 text-sm text-destructive"><AlertTriangle className="mt-0.5 size-4 shrink-0" />{error}</p>
            <Button size="sm" variant="outline" disabled={loading} onClick={() => run(retryToken ?? undefined)}><RefreshCw className="size-4" />Tentar novamente</Button>
          </div>
        )}
        {followUp.storageError && <p role="alert" className="mt-4 text-destructive">{followUp.storageError}</p>}
        {loading && (
          <div aria-live="polite" className="mt-8">
            <p className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="size-4 animate-spin" />Procurando negócios sem site no Google Maps…</p>
            {leads.length === 0 && <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[0, 1, 2].map((i) => <div key={i} className="glass h-56 animate-pulse rounded-lg" />)}</div>}
          </div>
        )}
        {searched && !loading && !error && leads.length === 0 && (
          <div className="glass mt-8 rounded-lg p-6 text-center">
            <SearchX className="mx-auto size-8 text-muted-foreground" />
            <p className="mt-3 font-semibold">{scanned === 0 ? "Nenhum local encontrado para essa pesquisa." : `Todos os ${scanned} locais encontrados já têm site.`}</p>
            <p className="mt-1 text-sm text-muted-foreground">{next ? "Busque mais resultados ou tente outra categoria ou cidade." : "Tente outra categoria, um termo mais comum ou uma cidade vizinha."}</p>
          </div>
        )}
        {scanned > 0 && (
          <p className="mt-8 text-sm text-muted-foreground">
            <span className="font-bold text-primary">{leads.length}</span> sem site, de {scanned} locais analisados
          </p>
        )}

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
           {ranked.map((l) => {
            const done = contacted.has(l.id);
            const priority = prospectPriority(l);
            return (
              <article
                key={l.id}
                className="glass flex flex-col rounded-lg p-5"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-bold">{l.name}</h3>
                  {done && <span className="flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs text-primary"><Check className="size-3" />Enviado</span>}
                </div>
                {l.category && <p className="text-xs uppercase tracking-wide text-primary">{l.category}</p>}
                {priority.score >= 65 && <p className="mt-2 text-xs font-semibold text-primary">Prioridade alta</p>}
                {priority.reasons.length > 0 && <p className="mt-1 text-xs text-muted-foreground">{priority.reasons.join(" · ")}</p>}
                <p className="mt-2 flex gap-1.5 text-sm text-muted-foreground"><MapPin className="mt-0.5 size-4 shrink-0" />{l.address}</p>
                {l.phone && <p className="mt-1 flex gap-1.5 text-sm text-muted-foreground"><Phone className="mt-0.5 size-4 shrink-0" />{l.phone}</p>}
                {l.rating && <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground"><Star className="size-4" />{l.rating} ({l.reviews} avaliações)</p>}
                <div className="mt-4"><ClientStageSelect value={followUp.clients.find((client) => client.id === l.id)?.stage ?? "new"} onChange={(stage) => followUp.track(l, stage)} label={`Etapa de ${l.name}`} /></div>
                <Button variant="ghost" size="sm" className="mt-2" onClick={() => { if (followUp.track(l)) navigate({ to: "/clientes" }); }}>Acompanhar e definir lembrete</Button>
                <Button variant="outline" className="mt-4" onClick={() => demonstrate(l)}><PanelsTopLeft />Demonstração do site</Button>
                <div className="mt-auto flex gap-2 pt-4">
                  {(l.intlPhone || l.phone) ? (
                    <Button asChild variant="whatsapp" className="flex-1" onClick={() => markContacted(l)}>
                      <a href={whatsappLink(l.intlPhone || `+55${l.phone?.replace(/\D/g, "")}`, l.name)} target="_blank" rel="noreferrer">
                        <MessageCircle className="size-4" /> Mandar mensagem
                      </a>
                    </Button>
                  ) : (
                    <span className="flex-1 text-sm text-muted-foreground">Sem telefone cadastrado</span>
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
    </main>
  );
}
