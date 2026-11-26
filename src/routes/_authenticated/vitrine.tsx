import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ProspectTabs } from "@/components/ProspectTabs";
import { searchPremium, type PremiumModel } from "@/lib/premium-models";
import { listVitrine } from "@/lib/vitrine.functions";
import { VitrineCard } from "@/components/VitrineCard";

export const Route = createFileRoute("/_authenticated/vitrine")({
  head: () => ({ meta: [{ title: "Vitrine de sites | SemSite" }, { name: "description", content: "Modelos de site prontos por ramo para usar com seus clientes." }] }),
  component: Vitrine,
});

function Vitrine() {
  const [q, setQ] = useState("");
  const [data, setData] = useState<{ verified: boolean; models: PremiumModel[] } | null>(null);
  useEffect(() => { listVitrine().then((r) => setData(r as { verified: boolean; models: PremiumModel[] })).catch(() => setData({ verified: false, models: [] })); }, []);
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
            <li key={m.id}><VitrineCard m={m} verified={verified} /></li>
          ))}
        </ul>
        {data && shown.length === 0 && <p className="mt-10 text-center text-muted-foreground">{data && all.length === 0 ? "Novos modelos em breve. Estamos refazendo a Vitrine do zero." : "Nenhum modelo encontrado."}</p>}
      </main>
    </>
  );
}
