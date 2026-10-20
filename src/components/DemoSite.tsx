import beauty from "@/assets/demo-beauty.jpg";
import health from "@/assets/demo-health.jpg";
import food from "@/assets/demo-food.jpg";
import services from "@/assets/demo-services.jpg";
import { demoPhoneLink, demoSector, type Demonstration } from "@/lib/demonstrations";
import { Button } from "./ui/button";
import { MapPin, MessageCircle, ArrowUpRight } from "lucide-react";
export function DemoSite({ demo }: { demo: Demonstration }) {
  const images = { beauty, health, food, services };
  const contact = demoPhoneLink(demo.phone);
  return <div className="demo-site">
    <div className="border-b px-5 py-2 text-center text-xs text-muted-foreground">Demonstração de site • proposta visual, não é o site oficial • imagem ilustrativa</div>
    <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5"><span className="max-w-full break-words font-display text-xl font-bold">{demo.name}</span><span className="text-sm text-primary">{demo.category}</span></header>
    <section className="demo-cover relative isolate flex min-h-[470px] items-end overflow-hidden px-6 py-12 sm:min-h-[530px]">
      <img src={images[demoSector(demo.category)]} width={1280} height={720} alt={`Imagem ilustrativa para ${demo.category}`} className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="demo-cover-shade absolute inset-0 -z-10" />
      <div className="mx-auto w-full max-w-6xl"><p className="mb-4 text-sm font-semibold">{demo.headline}</p><h1 className="max-w-3xl break-words text-4xl font-extrabold leading-tight sm:text-6xl">{demo.name}</h1><p className="mt-5 max-w-xl text-base leading-relaxed">{demo.description}</p>
        {contact && <Button asChild className="mt-7" variant="whatsapp"><a href={contact} target="_blank" rel="noreferrer"><MessageCircle />Fale com a equipe</a></Button>}
      </div>
    </section>
    <section className="mx-auto grid max-w-6xl gap-8 px-6 py-10 sm:grid-cols-2"><div><p className="text-xs font-semibold uppercase text-primary">Conheça {demo.name}</p><h2 className="mt-3 text-2xl font-bold">{demo.category}</h2><p className="mt-3 text-muted-foreground">Entre em contato para consultar serviços, disponibilidade e atendimento.</p></div><div><h2 className="text-2xl font-bold">Vamos conversar?</h2>{demo.address && <p className="mt-4 flex items-start gap-2 text-muted-foreground"><MapPin className="size-5 shrink-0" />{demo.address}</p>}{demo.phone && <p className="mt-3">{demo.phone}</p>}{demo.address && <Button asChild variant="link" className="mt-2 px-0"><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${demo.name} ${demo.address}`)}`} target="_blank" rel="noreferrer">Ver localização<ArrowUpRight /></a></Button>}</div></section>
    <footer className="border-t px-6 py-6 text-center text-xs text-muted-foreground">{demo.name} • Conceito preparado por Marcus</footer>
  </div>;
}