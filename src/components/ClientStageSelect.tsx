import { STAGES, type Stage } from "@/lib/follow-up";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
export function ClientStageSelect({ value, onChange, label = "Etapa do cliente" }: { value: Stage; onChange: (stage: Stage) => void; label?: string }) {
  return <Select value={value} onValueChange={(stage) => { const valid = STAGES.find((s) => s.value === stage); if (valid) onChange(valid.value); }}><SelectTrigger aria-label={label}><SelectValue /></SelectTrigger><SelectContent>{STAGES.map((stage) => <SelectItem key={stage.value} value={stage.value}>{stage.label}</SelectItem>)}</SelectContent></Select>;
}