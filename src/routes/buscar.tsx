import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useRef, useState } from "react";
import { MapPin, MessageCircle, Phone, Search, Star, Check, ArrowLeft, Loader2, ExternalLink, PanelsTopLeft } from "lucide-react";
import { searchLeads, type Lead } from "@/lib/leads.functions";
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

const SUGGESTIONS = ["Barbearia", "Salão de beleza", "Pet shop", "Oficina mecânica", "Restaurante", "Academia", "Dentista", "Padaria"];

function Buscar() {
  const followUp = useFollowUp();
  const navigate = useNavigate();
  const search = useServerFn(searchLeads);
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [next, setNext] = useState<string | null>(null);
  const [scanned, setScanned] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contacted, setContacted] = useState<Set<string>>(new Set());
  const [manualCity, setManualCity] = useState(false);
  const [searched, setSearched] = useState(false);
  const [activeQuery, setActiveQuery] = useState<{ category: string; city: string } | null>(null);
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
  }, []);

  async function run(pageToken?: string) {
    if (busy.current) return;
    if (category.trim().length < 2 || city.trim().length < 2) { setError("Informe um tipo de negócio e uma cidade com pelo menos 2 caracteres."); return; }
    const query = pageToken ? activeQuery : { category: category.trim(), city: city.trim() };
    if (!query) return;
    busy.current = true;
    setLoading(true);
    setError(null);
    try {
      const r = await search({ data: { ...query, pageToken } });
      setLeads((prev) => rankProspects(pageToken ? [...prev, ...r.leads] : r.leads));
      setScanned((s) => (pageToken ? s + r.scanned : r.scanned));
      setNext(r.nextPageToken);
      setActiveQuery(query);
      setSearched(true);
    } catch (e) {
      const message = e instanceof Error ? e.message : "";
      setError(message.startsWith("[") ? "Não foi possível pesquisar. Confira a cidade e o tipo de negócio e tente novamente." : message || "Erro na busca. Tente novamente.");
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
      <header className="mx-auto flex max-w-6xl items-center justify-between">
        <span className="font-display text-lg font-bold text-gradient">Caça Clientes</span>
        <Button asChild variant="ghost" size="sm">
          <Link to="/"><ArrowLeft className="size-4" /> Voltar</Link>
        </Button>
      </header>
      <ProspectTabs active="search" />

      <section className="mx-auto mt-10 max-w-6xl">
        <h1 className="text-4xl font-extrabold leading-tight sm:text-6xl">
          <Letters3D text="Quem ainda" /> <br />
          <Letters3D text="não tem site?" className="text-gradient" />
        </h1>

        <form onSubmit={(e) => { e.preventDefault(); run(); }} className="mt-8 grid gap-3">
          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <Input aria-label="Tipo de negócio" required minLength={2} maxLength={80} disabled={loading} placeholder="Tipo de negócio (ex: barbearia)" value={category} onChange={(e) => setCategory(e.target.value)} />
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4" />} Buscar
            </Button>
          </div>
          <CityPicker value={city} disabled={loading} onChange={setCity} />
          {manualCity ? (
            <Input aria-label="Cidade" required minLength={2} maxLength={80} disabled={loading} placeholder="Cidade (ex: Campinas, SP)" value={city} autoFocus onChange={(e) => setCity(e.target.value)} />
          ) : (
            <Button type="button" variant="ghost" size="sm" className="justify-self-start" onClick={() => setManualCity(true)}>Digitar outra cidade</Button>
          )}
        </form>
        <div className="mt-3 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <Button key={s} disabled={loading} variant="outline" size="sm" onClick={() => setCategory(s)}>
              {s}
            </Button>
          ))}
        </div>
        <p className="mt-5 text-sm text-muted-foreground">Prioridade para negócios sem site informado no Google, com telefone e boa reputação. Fechamento não é garantido.</p>

        {error && <p role="alert" className="mt-6 text-destructive">{error}</p>}
        {followUp.storageError && <p role="alert" className="mt-4 text-destructive">{followUp.storageError}</p>}
        {searched && !loading && leads.length === 0 && <p className="mt-6 text-muted-foreground">Nenhum negócio sem site informado nesta página. Tente outra categoria ou cidade{next ? ", ou busque mais resultados" : ""}.</p>}
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
