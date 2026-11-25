import { Check, X, Minus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { type Lead } from "@/lib/leads";
import { buildBusinessXray } from "@/lib/business-xray";

export function BusinessXrayDialog({ lead, city, close }: { lead: Lead; city: string; close: () => void }) {
  const x = buildBusinessXray(lead, city);
  return (
    <Dialog open onOpenChange={(open) => { if (!open) close(); }}>
      <DialogContent className="max-h-[90vh] max-w-md overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Raio-X: {lead.name}</DialogTitle>
          <DialogDescription>Leitura rápida do negócio antes de abordar.</DialogDescription>
        </DialogHeader>
        <section className="space-y-1">
          <h3 className="text-sm font-semibold">Oportunidade</h3>
          <p className="rounded-md bg-muted p-3 text-sm">{x.opportunity}</p>
          <p className="text-xs text-muted-foreground">Lead {x.heatLabel.toLowerCase()}{x.reasons.length ? `: ${x.reasons.join(", ").toLowerCase()}` : ""}.</p>
        </section>
        <section className="space-y-2">
          <h3 className="text-sm font-semibold">Presença digital</h3>
          <ul className="space-y-1.5 text-sm">
            {x.presence.map((i) => (
              <li key={i.label} className="flex items-center gap-2">
                {i.ok === true ? <Check className="size-4 shrink-0 text-green-500" /> : i.ok === false ? <X className="size-4 shrink-0 text-primary" /> : <Minus className="size-4 shrink-0 text-muted-foreground" />}
                <span className="font-medium">{i.label}</span>
                {i.href ? <a href={i.href} target={i.href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer" className="min-w-0 break-all text-primary underline underline-offset-2">{i.value}</a> : <span className="min-w-0 break-all text-muted-foreground">{i.value}</span>}
              </li>
            ))}
          </ul>
        </section>
        <section className="space-y-1">
          <h3 className="text-sm font-semibold">Reputação</h3>
          <p className="rounded-md border p-3 text-sm text-muted-foreground">{x.reputation.text}</p>
        </section>
        <section className="space-y-1">
          <h3 className="text-sm font-semibold">Melhor caminho</h3>
          <p className="rounded-md border p-3 text-sm text-muted-foreground">{x.channel}</p>
        </section>
      </DialogContent>
    </Dialog>
  );
}
