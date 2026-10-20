import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { lazy, Suspense, useEffect, useState } from "react";
import { MapPin, MessageCircle, Phone, Search, Star, Check, LogOut, Loader2, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { searchLeads, type Lead } from "@/lib/leads.functions";
import { whatsappLink } from "@/lib/message";
import { Letters3D } from "@/components/Letters3D";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const OceanScene = lazy(() => import("@/components/OceanScene").then((m) => ({ default: m.OceanScene })));

export const Route = createFileRoute("/_authenticated/buscar")({
  head: () => ({
    meta: [
      { title: "Buscar clientes sem site — Caça Clientes" },
      { name: "description", content: "Busque negócios sem site em qualquer cidade." },
      { property: "og:title", content: "Buscar clientes — Caça Clientes" },
      { property: "og:description", content: "Busque negócios sem site em qualquer cidade." },
    ],
  }),
  component: Buscar,
});

const SUGGESTIONS = ["Barbearia", "Salão de beleza", "Pet shop", "Oficina mecânica", "Restaurante", "Academia", "Dentista", "Padaria"];

function Buscar() {
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

  useEffect(() => {
    supabase.from("contacted_leads").select("place_id").then(({ data }) => {
      if (data) setContacted(new Set(data.map((r) => r.place_id)));
    });
  }, []);

  async function run(pageToken?: string) {
    if (!category.trim() || !city.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const r = await search({ data: { category, city, pageToken } });
      setLeads((prev) => (pageToken ? [...prev, ...r.leads] : r.leads));
      setScanned((s) => (pageToken ? s + r.scanned : r.scanned));
      setNext(r.nextPageToken);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro na busca");
    }
    setLoading(false);
  }

  async function markContacted(l: Lead) {
    setContacted((s) => new Set(s).add(l.id));
    await supabase.from("contacted_leads").upsert(
      { place_id: l.id, name: l.name, phone: l.intlPhone, city },
      { onConflict: "user_id,place_id", ignoreDuplicates: true },
    );
  }

  return (
    <main className="relative min-h-screen px-4 pb-20 pt-8 sm:px-8">
      <Suspense fallback={null}>
        <OceanScene />
      </Suspense>
      <header className="mx-auto flex max-w-6xl items-center justify-between">
        <span className="font-display text-lg font-bold text-gradient">Caça Clientes</span>
        <Button variant="ghost" size="sm" onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/" }); }}>
          <LogOut className="size-4" /> Sair
        </Button>
      </header>

      <section className="mx-auto mt-10 max-w-6xl">
        <h1 className="text-4xl font-extrabold leading-tight sm:text-6xl">
          <Letters3D text="Quem ainda" /> <br />
          <Letters3D text="não tem site?" className="text-gradient" />
        </h1>

        <form onSubmit={(e) => { e.preventDefault(); run(); }} className="glass mt-8 grid gap-3 rounded-2xl p-4 sm:grid-cols-[1fr_1fr_auto]">
          <Input placeholder="Tipo de negócio (ex: barbearia)" value={category} onChange={(e) => setCategory(e.target.value)} />
          <Input placeholder="Cidade (ex: Campinas, SP)" value={city} onChange={(e) => setCity(e.target.value)} />
          <Button type="submit" disabled={loading}>
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4" />} Buscar
          </Button>
        </form>
        <div className="mt-3 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button key={s} onClick={() => setCategory(s)} className="rounded-full border px-3 py-1 text-xs text-muted-foreground transition hover:border-primary hover:text-primary">
              {s}
            </button>
          ))}
        </div>

        {error && <p className="mt-6 text-destructive">{error}</p>}
        {scanned > 0 && (
          <p className="mt-8 text-sm text-muted-foreground">
            <span className="font-bold text-primary">{leads.length}</span> sem site, de {scanned} locais analisados
          </p>
        )}

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {leads.map((l, i) => {
            const done = contacted.has(l.id);
            return (
              <article
                key={l.id}
                className="glass tilt-card animate-in fade-in slide-in-from-bottom-6 fill-mode-both flex flex-col rounded-2xl p-5"
                style={{ animationDelay: `${(i % 20) * 50}ms` }}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-bold">{l.name}</h3>
                  {done && <span className="flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs text-primary"><Check className="size-3" />Enviado</span>}
                </div>
                {l.category && <p className="text-xs uppercase tracking-wide text-primary">{l.category}</p>}
                <p className="mt-2 flex gap-1.5 text-sm text-muted-foreground"><MapPin className="mt-0.5 size-4 shrink-0" />{l.address}</p>
                {l.phone && <p className="mt-1 flex gap-1.5 text-sm text-muted-foreground"><Phone className="mt-0.5 size-4 shrink-0" />{l.phone}</p>}
                {l.rating && <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground"><Star className="size-4" />{l.rating} ({l.reviews} avaliações)</p>}
                <div className="mt-auto flex gap-2 pt-4">
                  {l.intlPhone ? (
                    <Button asChild variant="whatsapp" className="flex-1" onClick={() => markContacted(l)}>
                      <a href={whatsappLink(l.intlPhone, l.name)} target="_blank" rel="noreferrer">
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

        {next && (
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
