import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChevronLeft, ChevronRight, MessageCircle, PanelsTopLeft, CheckCircle2 } from "lucide-react";
import { ProspectTabs } from "@/components/ProspectTabs";
import { OceanScene } from "@/components/OceanScene";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFollowUp } from "@/lib/use-follow-up";
import { reportRange, reportSeries, uniqueClientTotals, type ReportPeriod } from "@/lib/client-statistics";

export const Route = createFileRoute("/graficos")({
  head: () => ({ meta: [{ title: "Gráficos de clientes — Caça Clientes" }, { name: "description", content: "Veja mensagens registradas, demonstrações enviadas e clientes fechados por dia, mês e ano." }, { property: "og:title", content: "Gráficos de clientes — Caça Clientes" }, { property: "og:description", content: "Acompanhe seus resultados de prospecção por período." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Graficos,
});
function Graficos() {
  const { clients, storageError } = useFollowUp();
  const [period, setPeriod] = useState<ReportPeriod>("month");
  const [date, setDate] = useState<Date | null>(null);
  useEffect(() => setDate(new Date()), []);
  const range = date ? reportRange(period, date) : null;
  const totals = range ? uniqueClientTotals(clients, range.start, range.end) : { messages: 0, demos: 0, closed: 0 };
  const rows = date ? reportSeries(clients, period, date) : [];
  function move(direction: number) {
    if (!date) return;
    const next = new Date(date);
    if (period === "day") next.setDate(next.getDate() + direction);
    else if (period === "month") { next.setDate(1); next.setMonth(next.getMonth() + direction); }
    else next.setFullYear(next.getFullYear() + direction);
    setDate(next);
  }
  const dayValue = date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}` : "";
  const title = date ? date.toLocaleDateString("pt-BR", period === "day" ? { day: "numeric", month: "long", year: "numeric" } : period === "month" ? { month: "long", year: "numeric" } : { year: "numeric" }) : "";
  return <main className="min-h-screen px-4 py-8 sm:px-8"><OceanScene /><header className="mx-auto max-w-6xl"><Link to="/" className="font-display font-bold text-primary">Caça Clientes</Link></header><ProspectTabs active="charts" />
    <section className="mx-auto mt-8 max-w-6xl"><h1 className="text-3xl font-bold">Seus resultados</h1><p className="mt-2 text-sm text-muted-foreground">Clientes únicos por período · Registros deste navegador</p>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4"><div className="flex gap-2" aria-label="Período do gráfico">{([{ value: "day", label: "Dia" }, { value: "month", label: "Mês" }, { value: "year", label: "Ano" }] as const).map((item) => <Button key={item.value} variant={period === item.value ? "secondary" : "outline"} aria-pressed={period === item.value} onClick={() => setPeriod(item.value)}>{item.label}</Button>)}</div><div className="flex items-center gap-2"><Button variant="ghost" size="icon" aria-label="Período anterior" title="Período anterior" onClick={() => move(-1)}><ChevronLeft /></Button><Input className="w-44" type={period === "month" ? "month" : period === "day" ? "date" : "number"} aria-label="Data do gráfico" value={period === "year" ? date?.getFullYear() ?? "" : period === "month" ? dayValue.slice(0, 7) : dayValue} onChange={(e) => { const value = e.target.value; if (!value) return; const next = period === "year" ? new Date(Number(value), 0, 1) : new Date(`${value}${period === "month" ? "-01" : ""}T12:00:00`); if (!Number.isNaN(next.getTime()) && next.getFullYear() >= 1900 && next.getFullYear() <= 9999) setDate(next); }} /><Button variant="ghost" size="icon" aria-label="Próximo período" title="Próximo período" onClick={() => move(1)}><ChevronRight /></Button></div></div>
      {storageError && <p role="alert" className="mt-4 text-destructive">{storageError}</p>}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">{[{ key: "messages", label: "Clientes com mensagem registrada", icon: MessageCircle, color: "text-chart-messages" }, { key: "demos", label: "Demonstração enviada", icon: PanelsTopLeft, color: "text-chart-demos" }, { key: "closed", label: "Clientes fechados", icon: CheckCircle2, color: "text-chart-closed" }].map((item) => <article key={item.key} className="glass rounded-lg p-5"><item.icon className={`size-5 ${item.color}`} /><h2 className="mt-3 text-sm text-muted-foreground">{item.label}</h2><p className={`mt-2 text-4xl font-bold ${item.color}`} data-testid={`total-${item.key}`}>{totals[item.key as keyof typeof totals]}</p></article>)}</div>
      <section className="mt-8 border-y py-6"><h2 className="text-xl font-semibold capitalize">{title}</h2><div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm"><span className="text-chart-messages">● Mensagens registradas</span><span className="text-chart-demos">● Demonstrações enviadas</span><span className="text-chart-closed">● Fechados</span></div>
        <div className="mt-6 h-80 min-w-0" role="img" aria-label={`Gráfico de ${title}: ${totals.messages} clientes com mensagem registrada, ${totals.demos} com demonstração enviada e ${totals.closed} fechados`}>
          {date && <ResponsiveContainer width="100%" height="100%"><BarChart data={rows} margin={{ top: 10, right: 5, bottom: 5, left: -25 }}><CartesianGrid stroke="var(--border)" vertical={false} /><XAxis dataKey="label" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} axisLine={false} tickLine={false} minTickGap={16} /><YAxis allowDecimals={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} axisLine={false} tickLine={false} /><Tooltip content={({ active, payload, label }) => active && payload?.length ? <div className="rounded-md border bg-popover p-3 text-sm text-popover-foreground"><p className="mb-2 font-semibold">{label}</p>{payload.map((item) => <p key={String(item.dataKey)}>{item.name}: {item.value}</p>)}</div> : null} cursor={false} /><Bar dataKey="messages" name="Mensagens registradas" fill="var(--chart-messages)" maxBarSize={24} isAnimationActive={false} /><Bar dataKey="demos" name="Demonstrações enviadas" fill="var(--chart-demos)" maxBarSize={24} isAnimationActive={false} /><Bar dataKey="closed" name="Fechados" fill="var(--chart-closed)" maxBarSize={24} isAnimationActive={false} /></BarChart></ResponsiveContainer>}
        </div>{!totals.messages && !totals.demos && !totals.closed && <p className="mt-3 text-center text-sm text-muted-foreground">Sem atividades registradas neste período.</p>}
      </section>
      <p className="mt-5 text-sm text-muted-foreground">Mensagens são contabilizadas ao marcar o cliente como Contatado; abrir o WhatsApp não confirma o envio. Datas anteriores sem registro não são estimadas.</p>
      <Button asChild variant="outline" className="mt-4"><Link to="/clientes">Atualizar etapas dos clientes</Link></Button>
    </section></main>;
}