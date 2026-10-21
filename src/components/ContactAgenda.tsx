import { useState } from "react";
import { CalendarClock, MessageCircle, ArrowRight, Copy, Check, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { contactAgenda, followUpMessage, scheduleContact, agendaWhatsApp } from "@/lib/contact-agenda";
import { reminderDue, type FollowUpClient } from "@/lib/follow-up";

export function ContactAgenda({ clients, now, update }: {
  clients: FollowUpClient[]; now: number;
  update: (id: string, patch: Partial<Pick<FollowUpClient, "stage" | "stageDate" | "nextContact">>) => boolean;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState("");
  const agenda = now ? contactAgenda(clients, now) : [];
  if (!clients.length) return null;
  return <section className="mt-8 border-y py-6" aria-label="Agenda de contatos">
    <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="flex items-center gap-2 text-xl font-bold"><CalendarClock className="text-primary" />Próximos passos</h2><span className="text-sm text-muted-foreground">{agenda.length} contatos na fila</span></div>
    {agenda.length === 0 ? <p className="mt-4 text-sm text-muted-foreground">Tudo em dia. Nenhum contato previsto para hoje.</p> : <ul className="mt-4 divide-y">{agenda.slice(0, 5).map((client) => {
      const open = selected === client.id;
      const url = agendaWhatsApp(client, message);
      const reason = reminderDue(client, now) ? "Contato pendente" : client.nextContact ? "Agendado para hoje" : client.stage === "demo_sent" ? "Retomar demonstração" : client.stage === "new" ? "Primeiro contato" : "Definir próximo contato";
      return <li key={client.id} className="py-4">
        <div className="flex flex-wrap items-center justify-between gap-3"><div className="min-w-0 flex-1"><h3 className="break-words font-semibold">{client.name}</h3><p className={`mt-1 flex items-center gap-1.5 text-xs ${reminderDue(client, now) ? "text-destructive" : "text-muted-foreground"}`}><Clock className="size-3.5" />{reason}</p></div><Button variant={open ? "secondary" : "outline"} size="sm" onClick={() => { setSelected(open ? null : client.id); setMessage(followUpMessage(client)); setNotice(""); }}><ArrowRight />{open ? "Fechar" : "Preparar contato"}</Button></div>
        {open && <div className="mt-4 space-y-3"><label className="block text-sm"><span className="mb-2 block">Mensagem para {client.name}</span><Textarea aria-label={`Mensagem para ${client.name}`} value={message} onChange={(e) => setMessage(e.target.value)} className="min-h-40" /></label>
          <div className="flex flex-wrap gap-2"><Button variant="outline" size="sm" onClick={async () => { try { await navigator.clipboard.writeText(message); setNotice("Mensagem copiada."); } catch { setNotice("Não foi possível copiar. Selecione a mensagem para copiar."); } }}><Copy />Copiar</Button>{url && <Button asChild variant="whatsapp" size="sm"><a href={url} target="_blank" rel="noreferrer"><MessageCircle />Abrir WhatsApp</a></Button>}{client.stage === "new" && <Button variant="outline" size="sm" onClick={() => { if (update(client.id, { stage: "contacted" })) setNotice("Contato registrado."); }}><Check />Marcar como contatado</Button>}</div>
          <div className="flex flex-wrap items-center gap-2"><span className="w-full text-xs text-muted-foreground sm:w-auto">Próximo contato</span>{[1, 3, 7].map((days) => <Button key={days} variant="outline" size="sm" onClick={() => { if (update(client.id, { nextContact: scheduleContact(days) })) { setSelected(null); setNotice(""); } }}><CalendarClock />{days === 1 ? "Amanhã" : `Em ${days} dias`}</Button>)}</div>
          {notice && <p role="status" className="text-sm text-primary">{notice}</p>}
        </div>}
      </li>;
    })}</ul>}
  </section>;
}