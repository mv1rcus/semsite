import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, MessageCircle, PanelsTopLeft, CheckCircle2, Target, ChartColumn, ChartLine, ChartPie, CalendarDays } from "lucide-react";
import { ClientActivityChart, type ChartFormat } from "@/components/ClientActivityChart";
import { ProspectTabs } from "@/components/ProspectTabs";
import { OceanScene } from "@/components/OceanScene";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFollowUp } from "@/lib/use-follow-up";
import { reportRange, reportSeries, uniqueClientTotals, type ReportPeriod } from "@/lib/client-statistics";
import { GOAL_KEY, goalProgress, parseGoal } from "@/lib/sales-goal";

export const Route = createFileRoute("/graficos")({
  head: () => ({ meta: [{ title: "Gráficos de clientes — Caça Clientes" }, { name: "description", content: "Veja mensagens registradas, demonstrações enviadas e clientes fechados por dia, mês e ano." }, { property: "og:title", content: "Gráficos de clientes — Caça Clientes" }, { property: "og:description", content: "Acompanhe seus resultados de prospecção por período." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Graficos,
});
function Graficos() {
  const { clients, storageError } = useFollowUp();
  const [period, setPeriod] = useState<ReportPeriod>("month");
  const [date, setDate] = useState<Date | null>(null);
  const [goal, setGoal] = useState(0);
  const [format, setFormat] = useState<ChartFormat>("bar");
  useEffect(() => {
    setDate(new Date());
    try {
      setGoal(parseGoal(localStorage.getItem(GOAL_KEY)));
      const saved = localStorage.getItem("client-chart-format-v1");
      if (saved === "bar" || saved === "line" || saved === "pie") setFormat(saved);
    } catch { /* Charts remain usable without storage. */ }
  }, []);
  function chooseFormat(value: ChartFormat) {
    setFormat(value);
    try { localStorage.setItem("client-chart-format-v1", value); } catch { /* Optional preference. */ }
  }
  const range = date ? reportRange(period, date) : null;
  const totals = range ? uniqueClientTotals(clients, range.start, range.end) : { messages: 0, demos: 0, closed: 0 };
  const rows = date ? reportSeries(clients, period, date) : [];
  const progress = period === "month" ? goalProgress(goal, totals.closed) : null;
  function move(direction: number) {
    if (!date) return;
    const next = new Date(date);
    if (period === "day") next.setDate(next.getDate() + direction);
    else if (period === "month") { next.setDate(1); next.setMonth(next.getMonth() + direction); }
    else next.setFullYear(next.getFullYear() + direction);
    setDate(next);
  }
  function saveGoal(value: string) {
    const next = parseGoal(value ? Number(value) : null);
    setGoal(next);
    try { if (next) localStorage.setItem(GOAL_KEY, String(next)); else localStorage.removeItem(GOAL_KEY); } catch { /* storage unavailable */ }
  }
  const dayValue = date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}` : "";
  const title = date ? date.toLocaleDateString("pt-BR", period === "day" ? { day: "numeric", month: "long", year: "numeric" } : period === "month" ? { month: "long", year: "numeric" } : { year: "numeric" }) : "";
  return <main className="min-h-screen px-4 py-8 sm:px-8"><OceanScene /><ProspectTabs active="charts" />
    <section className="mx-auto mt-8 max-w-6xl"><h1 className="text-3xl font-bold">Seus resultados</h1><p className="mt-2 text-sm text-muted-foreground">Clientes únicos por período · Registros deste navegador</p>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4"><div className="flex gap-2" aria-label="Período do gráfico">{([{ value: "day", label: "Dia" }, { value: "month", label: "Mês" }, { value: "year", label: "Ano" }] as const).map((item) => <Button key={item.value} variant={period === item.value ? "secondary" : "outline"} aria-pressed={period === item.value} onClick={() => setPeriod(item.value)}>{item.label}</Button>)}</div><div className="flex items-center gap-2"><Button variant="ghost" size="icon" aria-label="Período anterior" title="Período anterior" onClick={() => move(-1)}><ChevronLeft /></Button><Input className="w-44" type={period === "month" ? "month" : period === "day" ? "date" : "number"} aria-label="Data do gráfico" value={period === "year" ? date?.getFullYear() ?? "" : period === "month" ? dayValue.slice(0, 7) : dayValue} onChange={(e) => { const value = e.target.value; if (!value) return; const next = period === "year" ? new Date(Number(value), 0, 1) : new Date(`${value}${period === "month" ? "-01" : ""}T12:00:00`); if (!Number.isNaN(next.getTime()) && next.getFullYear() >= 1900 && next.getFullYear() <= 9999) setDate(next); }} /><Button variant="ghost" size="icon" aria-label="Próximo período" title="Próximo período" onClick={() => move(1)}><ChevronRight /></Button></div></div>
      {storageError && <p role="alert" className="mt-4 text-destructive">{storageError}</p>}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">{[{ key: "messages", label: "Clientes com mensagem registrada", icon: MessageCircle, color: "text-chart-messages" }, { key: "demos", label: "Demonstração enviada", icon: PanelsTopLeft, color: "text-chart-demos" }, { key: "closed", label: "Clientes fechados", icon: CheckCircle2, color: "text-chart-closed" }].map((item) => <article key={item.key} className="glass rounded-lg p-5"><item.icon className={`size-5 ${item.color}`} /><h2 className="mt-3 text-sm text-muted-foreground">{item.label}</h2><p className={`mt-2 text-4xl font-bold ${item.color}`} data-testid={`total-${item.key}`}>{totals[item.key as keyof typeof totals]}</p></article>)}</div>
      {period === "month" && <section className="mt-6 border-y py-5" aria-label="Meta do mês"><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="flex items-center gap-2 text-lg font-semibold"><Target className="size-5 text-chart-closed" />Meta de fechamentos no mês</h2><label className="flex items-center gap-2 text-sm">Meta<Input className="w-24" type="number" min={1} max={999} inputMode="numeric" aria-label="Meta de fechamentos no mês" placeholder="Definir" value={goal || ""} onChange={(e) => saveGoal(e.target.value)} /></label></div><p className="mt-3 text-sm text-muted-foreground">{goal ? `${totals.closed} de ${goal} fechados${progress?.remaining ? ` · faltam ${progress.remaining}` : ""}` : "Nenhuma meta definida."}</p>{goal > 0 && <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={progress?.percent} aria-valuemin={0} aria-valuemax={100} aria-label="Progresso da meta do mês"><div className={`h-full rounded-full ${progress?.reached ? "bg-chart-closed" : "bg-chart-demos"}`} style={{ width: `${progress?.percent ?? 0}%` }} /></div>}{progress?.reached && <p className="mt-2 text-sm font-semibold text-chart-closed">Meta batida neste mês.</p>}</section>}
      <section className="mt-8 border-y py-6"><h2 className="text-xl font-semibold capitalize">{title}</h2><div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm"><span className="text-chart-messages">● Mensagens registradas</span><span className="text-chart-demos">● Demonstrações enviadas</span><span className="text-chart-closed">● Fechados</span></div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3"><div className="flex flex-wrap gap-2" aria-label="Formato do gráfico">{([{ value: "bar", label: "Barras", icon: ChartColumn }, { value: "line", label: "Linhas", icon: ChartLine }, { value: "pie", label: "Pizza", icon: ChartPie }] as const).map(item => <Button key={item.value} size="sm" variant={format === item.value ? "default" : "outline"} aria-pressed={format === item.value} onClick={() => chooseFormat(item.value)}><item.icon />{item.label}</Button>)}</div><Button variant="ghost" size="sm" onClick={() => setDate(new Date())}><CalendarDays />Período atual</Button></div>
        <div className="mt-6 h-80 min-w-0" role="img" aria-label={`Gráfico ${format === "pie" ? "pizza" : format === "line" ? "de linhas" : "de barras"} de ${title}: ${totals.messages} clientes com mensagem registrada, ${totals.demos} com demonstração enviada e ${totals.closed} fechados`}>
          {date && (totals.messages || totals.demos || totals.closed ? <ClientActivityChart format={format} rows={rows} totals={totals} /> : <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground"><ChartColumn className="size-9" /><p className="text-sm">Sem atividades registradas neste período.</p></div>)}
        </div>{format === "pie" && <p className="mt-3 text-sm text-muted-foreground">Totais por atividade. Um mesmo cliente pode aparecer em mais de uma categoria.</p>}
      </section>
      <p className="mt-5 text-sm text-muted-foreground">Mensagens são contabilizadas ao marcar o cliente como Contatado; abrir o WhatsApp não confirma o envio. Datas anteriores sem registro não são estimadas.</p>
      <Button asChild variant="outline" className="mt-4"><Link to="/clientes">Atualizar etapas dos clientes</Link></Button>
    </section></main>;
}