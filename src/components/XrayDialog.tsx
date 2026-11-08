import { useState } from "react";
import { Copy, MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { isMobilePhone, type Lead } from "@/lib/leads";
import { buildXray } from "@/lib/xray";

const icon = { bad: "❌", warn: "⚠️", good: "⭐" } as const;

export function XrayDialog({ lead, others, city, close }: { lead: Lead; others: Lead[]; city: string; close: () => void }) {
  const [copied, setCopied] = useState(false);
  const { items, message } = buildXray(lead, others, city);
  const digits = (lead.intlPhone || lead.phone || "").replace(/\D/g, "");
  const wa = isMobilePhone(lead) && digits ? `https://wa.me/${digits.startsWith("55") ? digits : `55${digits}`}?text=${encodeURIComponent(message)}` : null;
  return (
    <Dialog open onOpenChange={(open) => { if (!open) close(); }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Raio-X de {lead.name}</DialogTitle>
          <DialogDescription>Diagnóstico com os dados do Google desta busca.</DialogDescription>
        </DialogHeader>
        <ul className="space-y-2">
          {items.map((i) => <li key={i.text} className="flex gap-2 rounded-md bg-muted p-3 text-sm"><span>{icon[i.tone]}</span>{i.text}</li>)}
        </ul>
        <p className="rounded-md border p-3 text-sm italic text-muted-foreground">{message}</p>
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={() => { navigator.clipboard.writeText(message); setCopied(true); }}><Copy className="size-4" />{copied ? "Copiado!" : "Copiar"}</Button>
          {wa && <Button asChild variant="whatsapp" className="flex-1"><a href={wa} target="_blank" rel="noreferrer"><MessageCircle className="size-4" />WhatsApp</a></Button>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
