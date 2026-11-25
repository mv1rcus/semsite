import { FUNNEL_STAGES, type FunnelMetrics, type FunnelStage } from "@/lib/demo-funnel";

type Filter = FunnelStage | "all";

/** Painel de métricas do funil: números no topo e filtro por etapa. */
export function DemoFunnelPanel({ metrics, filter, onFilter }: { metrics: FunnelMetrics; filter: Filter; onFilter: (f: Filter) => void }) {
  const cards = [
    { label: "Leads", value: metrics.total },
    { label: "Abriram o link", value: metrics.opened },
    { label: "Contatados", value: metrics.contacted },
    { label: "Responderam", value: metrics.replied },
    { label: "Fechados", value: metrics.closed },
    { label: "Taxa de fechamento", value: metrics.closeRate === null ? "—" : `${metrics.closeRate}%` },
  ];
  return <div className="mt-5 space-y-4" aria-label="Funil de vendas">
    <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{cards.map((c) => <div key={c.label} className="rounded-lg border p-3"><dt className="text-xs text-muted-foreground">{c.label}</dt><dd className="mt-1 text-2xl font-bold">{c.value}</dd></div>)}</dl>
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por etapa">
      <button type="button" aria-pressed={filter === "all"} onClick={() => onFilter("all")} className={`rounded-full border px-3 py-1 text-xs font-semibold ${filter === "all" ? "bg-primary text-primary-foreground" : ""}`}>Todos ({metrics.total})</button>
      {FUNNEL_STAGES.map((s) => <button key={s.value} type="button" aria-pressed={filter === s.value} onClick={() => onFilter(s.value)} className={`rounded-full border px-3 py-1 text-xs font-semibold ${filter === s.value ? "bg-primary text-primary-foreground" : ""}`}>{s.label} ({metrics.byStage[s.value]})</button>)}
    </div>
  </div>;
}
