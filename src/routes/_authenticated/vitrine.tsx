import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ProspectTabs } from "@/components/ProspectTabs";
import { ModelMiniPreview } from "@/components/ModelMiniPreview";
import { ALL_MODELS, LAYOUT_KEYS, LAYOUT_LABEL, PALETTES, RAMOS, filterModels, type LayoutKey } from "@/lib/site-models";

export const Route = createFileRoute("/_authenticated/vitrine")({
  head: () => ({ meta: [{ title: "Vitrine de sites | SemSite" }, { name: "description", content: "Modelos de site prontos por ramo, inclusive em 3D, para usar com seus clientes." }] }),
  component: Vitrine,
});

const PAGE = 24;

function Vitrine() {
  const [q, setQ] = useState("");
  const [ramo, setRamo] = useState("");
  const [layout, setLayout] = useState<LayoutKey | "3d" | "">("");
  const [palette, setPalette] = useState("");
  const [shown, setShown] = useState(PAGE);
  const list = useMemo(() => filterModels({ q, ramo, layout, palette }), [q, ramo, layout, palette]);
  const counts = useMemo(() => { const m = new Map<string, number>(); for (const x of ALL_MODELS) m.set(x.ramo, (m.get(x.ramo) ?? 0) + 1); return m; }, []);
  const reset = () => setShown(PAGE);
  const chip = (active: boolean) => `shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${active ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground hover:bg-muted"}`;
  return (
    <>
      <ProspectTabs active="vitrine" />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <p className="kicker-pill mb-3">/ VITRINE</p>
        <h1 className="font-display text-4xl leading-none sm:text-5xl">Modelos de site <span className="text-gradient-primary">prontos pra usar.</span></h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">Escolha o ramo, ache um estilo e abra o modelo. Troque nome, WhatsApp e cidade do seu cliente e copie o link pra mandar.</p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <label className="relative flex-1"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><input value={q} onChange={(e) => { setQ(e.target.value); reset(); }} placeholder="Buscar modelo (ex: pizzaria, 3D, noite)" aria-label="Buscar modelo" className="h-11 w-full rounded-xl border border-border bg-card pl-9 pr-3 text-sm outline-none focus:border-primary" /></label>
          <select value={ramo} onChange={(e) => { setRamo(e.target.value); reset(); }} aria-label="Ramo" className="h-11 rounded-xl border border-border bg-card px-3 text-sm">
            <option value="">Todos os ramos</option>
            {RAMOS.map((r) => <option key={r.key} value={r.key}>{r.emoji} {r.label} ({counts.get(r.key)})</option>)}
          </select>
          <select value={palette} onChange={(e) => { setPalette(e.target.value); reset(); }} aria-label="Cor" className="h-11 rounded-xl border border-border bg-card px-3 text-sm">
            <option value="">Todas as cores</option>
            {PALETTES.map((p) => <option key={p.key} value={p.key}>{p.label}</option>)}
          </select>
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          <button type="button" className={chip(layout === "")} onClick={() => { setLayout(""); reset(); }}>Todos os estilos</button>
          <button type="button" className={chip(layout === "3d")} onClick={() => { setLayout("3d"); reset(); }}>✨ Só 3D</button>
          {LAYOUT_KEYS.filter((l) => !l.endsWith("3d")).map((l) => <button key={l} type="button" className={chip(layout === l)} onClick={() => { setLayout(l); reset(); }}>{LAYOUT_LABEL[l]}</button>)}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{list.length.toLocaleString("pt-BR")} {list.length === 1 ? "modelo" : "modelos"}{ramo ? ` de ${RAMOS.find((r) => r.key === ramo)?.label.toLocaleLowerCase("pt-BR")}` : ""}</p>

        {list.length === 0 ? <p className="mt-10 text-center text-muted-foreground">Nenhum modelo com esses filtros.</p> : (
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {list.slice(0, shown).map((m) => (
              <li key={m.id}>
                <Link to="/vitrine/$id" params={{ id: m.id }} className="block overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-0.5 hover:border-primary">
                  <ModelMiniPreview model={m} />
                  <div className="px-3 py-2"><p className="truncate text-sm font-bold">{m.ramoLabel}</p><p className="truncate text-xs text-muted-foreground">{m.layoutLabel} · {m.paletteLabel}</p></div>
                </Link>
              </li>
            ))}
          </ul>
        )}
        {shown < list.length && <div className="mt-6 text-center"><button type="button" onClick={() => setShown((n) => n + PAGE * 2)} className="rounded-full border border-border px-6 py-2.5 text-sm font-semibold hover:bg-muted">Carregar mais ({(list.length - shown).toLocaleString("pt-BR")} restantes)</button></div>}
      </main>
    </>
  );
}
