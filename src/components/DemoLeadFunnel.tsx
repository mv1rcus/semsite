import { FUNNEL_STAGES, NOTES_MAX, type FunnelEntry, type FunnelStage } from "@/lib/demo-funnel";

/** Etapa editável e notas de um lead dentro da lista de "Meus links". */
export function DemoLeadFunnel({ name, entry, onStage, onNotes }: { name: string; entry: FunnelEntry; onStage: (s: FunnelStage) => void; onNotes: (n: string) => void }) {
  return <div className="mt-3 grid gap-2 sm:grid-cols-[12rem_minmax(0,1fr)]">
    <label className="text-xs text-muted-foreground">Etapa do funil
      <select aria-label={`Etapa de ${name}`} className="mt-1 h-9 w-full rounded-md border bg-background px-2 text-sm text-foreground" value={entry.stage} onChange={(e) => onStage(e.target.value as FunnelStage)}>{FUNNEL_STAGES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}</select>
    </label>
    <label className="text-xs text-muted-foreground">Notas
      <textarea aria-label={`Notas de ${name}`} className="mt-1 min-h-9 w-full rounded-md border bg-background px-2 py-1.5 text-sm text-foreground" rows={1} maxLength={NOTES_MAX} placeholder="Ex.: pediu orçamento, ligar na sexta" value={entry.notes} onChange={(e) => onNotes(e.target.value)} />
    </label>
  </div>;
}
