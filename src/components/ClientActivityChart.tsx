import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export type ChartFormat = "bar" | "line" | "pie";
const metrics = [
  { key: "messages", label: "Mensagens registradas", color: "var(--chart-messages)" },
  { key: "demos", label: "Demonstrações enviadas", color: "var(--chart-demos)" },
  { key: "closed", label: "Fechados", color: "var(--chart-closed)" },
] as const;
type Totals = { messages: number; demos: number; closed: number };

export function ClientActivityChart({ format, rows, totals }: { format: ChartFormat; rows: (Totals & { label: string })[]; totals: Totals }) {
  const grid = <CartesianGrid stroke="var(--border)" vertical={false} />;
  const xAxis = <XAxis dataKey="label" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} axisLine={false} tickLine={false} minTickGap={16} />;
  const yAxis = <YAxis allowDecimals={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} axisLine={false} tickLine={false} />;
  const tooltip = <Tooltip content={({ active, payload, label }) => active && payload?.length ? <div className="rounded-md border bg-popover p-3 text-sm text-popover-foreground"><p className="mb-2 font-semibold">{label}</p>{payload.map((item, index) => <p key={index}>{item.name}: {item.value}</p>)}</div> : null} cursor={false} />;
  const margin = { top: 10, right: 12, bottom: 5, left: -25 };
  return <ResponsiveContainer width="100%" height="100%">
    {format === "pie" ? <PieChart>{tooltip}<Pie data={metrics.map(metric => ({ name: metric.label, value: totals[metric.key], color: metric.color })).filter(item => item.value > 0)} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius="85%" stroke="var(--background)" strokeWidth={3} isAnimationActive={false}>{metrics.filter(metric => totals[metric.key] > 0).map(metric => <Cell key={metric.key} fill={metric.color} />)}</Pie></PieChart>
      : format === "line" ? <LineChart data={rows} margin={margin}>{grid}{xAxis}{yAxis}{tooltip}{metrics.map(metric => <Line key={metric.key} dataKey={metric.key} name={metric.label} stroke={metric.color} strokeWidth={2} dot={false} activeDot={{ r: 5 }} type="linear" isAnimationActive={false} />)}</LineChart>
        : <BarChart data={rows} margin={margin}>{grid}{xAxis}{yAxis}{tooltip}{metrics.map(metric => <Bar key={metric.key} dataKey={metric.key} name={metric.label} fill={metric.color} maxBarSize={24} isAnimationActive={false} />)}</BarChart>}
  </ResponsiveContainer>;
}