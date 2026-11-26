import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { ProspectTabs } from "@/components/ProspectTabs";
import { searchPremium, type PremiumModel } from "@/lib/premium-models";
import { listVitrine } from "@/lib/vitrine.functions";
import { VitrineCard } from "@/components/VitrineCard";

export const Route = createFileRoute("/_authenticated/vitrine")({
  head: () => ({ meta: [{ title: "Vitrine de sites | SemSite" }, { name: "description", content: "Modelos de site prontos por ramo para usar com seus clientes." }] }),
  component: Vitrine,
});

type VitrineData = { verified: boolean; models: PremiumModel[] };

// Cache da sessão: ao voltar de um modelo a vitrine não refaz a busca nem pisca vazia.
// TTL curto para modelos novos publicados aparecerem em visitas seguintes.
let cache: { at: number; data: VitrineData } | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000;

// Posição salva ao abrir um modelo, para voltar exatamente onde parou.
const RETURN_KEY = "vitrine:return";
const RETURN_TTL_MS = 30 * 60 * 1000;

function saveReturn(q: string) {
  try { sessionStorage.setItem(RETURN_KEY, JSON.stringify({ at: Date.now(), y: window.scrollY, q })); } catch { /* storage indisponível */ }
}

function takeReturn(): { y: number; q: string } | null {
  try {
    const raw = sessionStorage.getItem(RETURN_KEY);
    sessionStorage.removeItem(RETURN_KEY);
    if (!raw) return null;
    const r = JSON.parse(raw) as { at?: number; y?: number; q?: string };
    if (typeof r.at !== "number" || Date.now() - r.at > RETURN_TTL_MS) return null;
    return { y: typeof r.y === "number" ? r.y : 0, q: typeof r.q === "string" ? r.q : "" };
  } catch { return null; }
}

function Vitrine() {
  const [q, setQ] = useState("");
  const [data, setData] = useState<VitrineData | null>(() => (cache && Date.now() - cache.at < CACHE_TTL_MS ? cache.data : null));
  const restoreY = useRef<number | null>(null);

  // Recupera posição e busca salvas quando volta de um modelo.
  useEffect(() => {
    const r = takeReturn();
    if (r) { restoreY.current = r.y; if (r.q) setQ(r.q); }
  }, []);

  useEffect(() => {
    if (data) return;
    let live = true;
    listVitrine()
      .then((r) => { if (!live) return; const d = r as VitrineData; cache = { at: Date.now(), data: d }; setData(d); })
      .catch(() => { if (live) setData({ verified: false, models: [] }); });
    return () => { live = false; };
  }, [data]);

  // Rola de volta para onde estava assim que a lista renderiza (altura estável: capas têm proporção fixa).
  useEffect(() => {
    if (!data || restoreY.current === null) return;
    const y = restoreY.current;
    restoreY.current = null;
    requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo(0, y)));
  }, [data, q]);

  const all = data?.models ?? [];
  const verified = !!data?.verified;
  const shown = useMemo(() => searchPremium(q, all), [q, all]);
  return (
    <>
      <ProspectTabs active="vitrine" />
      <main className="mx-auto max-w-6xl px-4 py-5">
        <label className="relative block"><Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar referência, estilo ou ramo (ex: hamburgueria, pet, barbearia)" aria-label="Pesquisar modelos" className="h-12 w-full rounded-2xl border border-border bg-card pl-11 pr-4 text-sm outline-none focus:border-primary" /></label>
        <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((m) => (
            <li key={m.id} onClick={() => saveReturn(q)}><VitrineCard m={m} verified={verified} /></li>
          ))}
        </ul>
        {data && shown.length === 0 && <p className="mt-10 text-center text-muted-foreground">{data && all.length === 0 ? "Novos modelos em breve. Estamos refazendo a Vitrine do zero." : "Nenhum modelo encontrado."}</p>}
      </main>
    </>
  );
}
