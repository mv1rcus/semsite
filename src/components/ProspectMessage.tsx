import { useState } from "react";
import { Check, Copy, MessageCircle } from "lucide-react";
import type { Lead } from "@/lib/leads";
import { buildMessage } from "@/lib/message";
import { agendaWhatsApp } from "@/lib/contact-agenda";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

export function ProspectMessage({ lead, close, markContacted }: { lead: Lead; close: () => void; markContacted: () => boolean }) {
  const [message, setMessage] = useState(() => buildMessage(lead.name));
  const [notice, setNotice] = useState("");
  const url = agendaWhatsApp({ phone: lead.phone, intlPhone: lead.intlPhone }, message);
  return <Dialog open onOpenChange={(open) => { if (!open) close(); }}>
    <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] overflow-y-auto rounded-lg">
      <DialogHeader><DialogTitle className="break-words pr-6 leading-snug">Contato com {lead.name}</DialogTitle><DialogDescription>Mensagem de apresentação</DialogDescription></DialogHeader>
      <Textarea aria-label="Mensagem deste contato" value={message} onChange={(event) => setMessage(event.target.value)} className="min-h-64" />
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" disabled={!message.trim()} onClick={async () => { try { await navigator.clipboard.writeText(message); setNotice("Mensagem copiada."); } catch { setNotice("Não foi possível copiar. Selecione o texto da mensagem."); } }}><Copy />Copiar</Button>
        {url && <Button asChild variant="whatsapp" disabled={!message.trim()}><a href={url} target="_blank" rel="noreferrer"><MessageCircle />Abrir WhatsApp</a></Button>}
      </div>
      <Button variant="secondary" onClick={() => { if (markContacted()) setNotice("Cliente marcado como contatado."); else setNotice("Não foi possível salvar o contato neste navegador."); }}><Check />Já enviei a mensagem</Button>
      {notice && <p role="status" className="text-sm text-primary">{notice}</p>}
    </DialogContent>
  </Dialog>;
}