import { useState } from "react";
import { MessageCircle, MapPin, ArrowUpRight, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { demoPhoneLink, type Demonstration } from "@/lib/demonstrations";

export function DemoContact({ demo, interest }: { demo: Demonstration; interest: string }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState("");
  const contact = demoPhoneLink(demo.phone);
  return <section className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-2">
    <div><p className="text-sm font-semibold text-primary">Contato</p><h1 className="mt-3 break-words text-3xl font-bold">Converse com {demo.name}</h1><p className="mt-4 leading-relaxed text-muted-foreground">Consulte informações, disponibilidade e condições diretamente com a equipe.</p>
      {demo.address && <div className="mt-7"><p className="flex items-start gap-3"><MapPin className="size-5 shrink-0 text-primary" />{demo.address}</p><Button asChild variant="outline" className="mt-4"><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${demo.name} ${demo.address}`)}`} target="_blank" rel="noreferrer">Abrir localização<ArrowUpRight /></a></Button></div>}
      {demo.phone && <p className="mt-6 flex items-center gap-3"><Phone className="size-5 text-primary" />{demo.phone}</p>}
      {contact && <Button asChild variant="whatsapp" className="mt-6"><a href={contact} target="_blank" rel="noreferrer"><MessageCircle />Abrir WhatsApp</a></Button>}
    </div>
    <form className="space-y-5 border-t pt-6 md:border-l md:border-t-0 md:pl-10 md:pt-0" onSubmit={event => {
      event.preventDefault();
      if (!contact) { setNotice("Este conceito ainda não tem telefone. O responsável precisa preencher o contato antes de receber mensagens."); return; }
      const text = `Olá! Meu nome é ${name.trim()}. ${interest ? `Tenho interesse em ${interest}. ` : ""}${message.trim()}`;
      window.open(`${contact}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
      setNotice("Mensagem preparada no WhatsApp. Confirme o envio por lá.");
    }}><h2 className="text-2xl font-bold">Como podemos ajudar?</h2>{interest && <p className="text-sm text-primary">Interesse: {interest}</p>}
      <label className="block text-sm"><span className="mb-2 block">Seu nome</span><Input required maxLength={100} value={name} onChange={event => setName(event.target.value)} placeholder="Como você se chama?" /></label>
      <label className="block text-sm"><span className="mb-2 block">Sua mensagem</span><Textarea required maxLength={1000} className="min-h-32" value={message} onChange={event => setMessage(event.target.value)} placeholder="Conte o que você procura" /></label>
      <Button type="submit" variant="whatsapp" className="w-full"><MessageCircle />Preparar no WhatsApp</Button>
      {notice && <p role="status" className="text-sm text-muted-foreground">{notice}</p>}
    </form>
  </section>;
}