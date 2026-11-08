import { useState } from "react";
import { Copy, MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { isMobilePhone, type Lead } from "@/lib/leads";
import { buildScript } from "@/lib/xray";

function CopyBtn({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  return <Button size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(text); setOk(true); }}><Copy className="size-4" />{ok ? "Copiado!" : "Copiar"}</Button>;
}

export function XrayDialog({ lead, city, close }: { lead: Lead; others?: Lead[]; city: string; close: () => void }) {
  const { pain, objections, message } = buildScript(lead, city);
  const digits = (lead.intlPhone || lead.phone || "").replace(/\D/g, "");
  const wa = isMobilePhone(lead) && digits ? `https://wa.me/${digits.startsWith("55") ? digits : `55${digits}`}?text=${encodeURIComponent(message)}` : null;
  return (
    <Dialog open onOpenChange={(open) => { if (!open) close(); }}>
      <DialogContent className="max-h-[90vh] max-w-md overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Roteiro de vendas: {lead.name}</DialogTitle>
          <DialogDescription>Argumentos prontos pelo ramo do cliente.</DialogDescription>
        </DialogHeader>
        <section className="space-y-1">
          <h3 className="text-sm font-semibold">1. A dor do cliente</h3>
          <p className="rounded-md bg-muted p-3 text-sm">{pain}</p>
        </section>
        <section className="space-y-2">
          <h3 className="text-sm font-semibold">2. Se ele disser...</h3>
          {objections.map((o) => (
            <div key={o.q} className="space-y-2 rounded-md border p-3 text-sm">
              <p className="font-medium">{o.q}</p>
              <p className="text-muted-foreground">{o.a}</p>
              <CopyBtn text={o.a} />
            </div>
          ))}
        </section>
        <section className="space-y-2">
          <h3 className="text-sm font-semibold">3. Mensagem de abordagem</h3>
          <p className="rounded-md border p-3 text-sm italic text-muted-foreground">{message}</p>
          <div className="flex gap-2">
            <CopyBtn text={message} />
            {wa && <Button asChild size="sm" variant="whatsapp"><a href={wa} target="_blank" rel="noreferrer"><MessageCircle className="size-4" />WhatsApp</a></Button>}
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}
