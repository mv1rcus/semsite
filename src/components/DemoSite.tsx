import beauty from "@/assets/demo-beauty.jpg";
import health from "@/assets/demo-health.jpg";
import food from "@/assets/demo-food.jpg";
import services from "@/assets/demo-services.jpg";
import gym from "@/assets/demo-gym.jpg";
import law from "@/assets/demo-law.jpg";
import pet from "@/assets/demo-pet.jpg";
import auto from "@/assets/demo-auto.jpg";
import pizza from "@/assets/food-pizza.jpg";
import burger from "@/assets/food-burger.jpg";
import plate from "@/assets/food-plate.jpg";
import dessert from "@/assets/food-dessert.jpg";
import { demoPhoneLink, demoSector, type Demonstration } from "@/lib/demonstrations";
import { SECTOR_CATALOG } from "@/lib/demo-catalog";
import { Button } from "./ui/button";
import { MapPin, MessageCircle, ArrowUpRight, Check } from "lucide-react";

const covers = { beauty, health, food, services, gym, law, pet, auto };
const photos = { pizza, burger, plate, dessert };

export function DemoSite({ demo }: { demo: Demonstration }) {
  const sector = demoSector(demo.category);
  const catalog = SECTOR_CATALOG[sector];
  const contact = demoPhoneLink(demo.phone);
  const ask = (item: string) => contact ? `${contact}?text=${encodeURIComponent(`Olá! Gostaria de saber mais sobre: ${item}`)}` : null;
  return <div className="demo-site">
    <div className="border-b px-5 py-2 text-center text-xs text-muted-foreground">Demonstração de site • proposta visual, não é o site oficial • imagens e itens ilustrativos</div>
    <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
      <span className="max-w-full break-words font-display text-xl font-bold">{demo.name}</span>
      <nav className="flex gap-4 text-sm"><a href="#catalogo" className="text-primary">{catalog.title}</a><a href="#contato" className="text-muted-foreground">Contato</a></nav>
    </header>
    <section className="demo-cover relative isolate flex min-h-[470px] items-end overflow-hidden px-6 py-12 sm:min-h-[560px]">
      <img src={covers[sector]} width={1280} height={720} alt={`Imagem ilustrativa para ${demo.category}`} className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="demo-cover-shade absolute inset-0 -z-10" />
      <div className="mx-auto w-full max-w-6xl"><p className="mb-4 text-sm font-semibold">{demo.headline}</p><h1 className="max-w-3xl break-words text-4xl font-extrabold leading-tight sm:text-6xl">{demo.name}</h1><p className="mt-5 max-w-xl text-base leading-relaxed">{demo.description}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          {contact && <Button asChild variant="whatsapp"><a href={contact} target="_blank" rel="noreferrer"><MessageCircle />Fale com a equipe</a></Button>}
          <Button asChild variant="outline"><a href="#catalogo">Ver {catalog.title.toLocaleLowerCase("pt-BR")}</a></Button>
        </div>
      </div>
    </section>

    <section id="catalogo" className="mx-auto max-w-6xl px-6 py-12">
      <p className="text-xs font-semibold uppercase text-primary">{demo.category}</p>
      <h2 className="mt-2 text-3xl font-bold">{catalog.title}</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {catalog.items.map((item) => { const link = ask(item.title); return <article key={item.title} className="flex flex-col overflow-hidden rounded-lg border bg-card">
          {item.photo && <img src={photos[item.photo]} alt={item.title} loading="lazy" width={816} height={816} className="aspect-[4/3] w-full object-cover" />}
          <div className="flex flex-1 flex-col p-4"><h3 className="font-bold">{item.title}</h3><p className="mt-1 flex-1 text-sm text-muted-foreground">{item.text}</p>
            {link && <a href={link} target="_blank" rel="noreferrer" className="mt-3 text-sm font-semibold text-primary">{sector === "food" ? "Pedir pelo WhatsApp" : "Consultar"} →</a>}
          </div>
        </article>; })}
      </div>
    </section>

    <section className="border-y bg-card/40">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 sm:grid-cols-3">
        {["Atendimento pelo WhatsApp", "Localização fácil no mapa", "Informações sempre à mão"].map((t) => <p key={t} className="flex items-center gap-2 font-semibold"><Check className="size-5 text-primary" />{t}</p>)}
      </div>
    </section>

    <section id="contato" className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-2"><div><p className="text-xs font-semibold uppercase text-primary">Conheça {demo.name}</p><h2 className="mt-3 text-2xl font-bold">{demo.category}</h2><p className="mt-3 text-muted-foreground">Entre em contato para consultar {catalog.title.toLocaleLowerCase("pt-BR")}, disponibilidade e atendimento.</p></div><div><h2 className="text-2xl font-bold">Vamos conversar?</h2>{demo.address && <p className="mt-4 flex items-start gap-2 text-muted-foreground"><MapPin className="size-5 shrink-0" />{demo.address}</p>}{demo.phone && <p className="mt-3">{demo.phone}</p>}{demo.address && <Button asChild variant="link" className="mt-2 px-0"><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${demo.name} ${demo.address}`)}`} target="_blank" rel="noreferrer">Ver localização<ArrowUpRight /></a></Button>}</div></section>
    <footer className="border-t px-6 py-6 text-center text-xs text-muted-foreground">{demo.name} • Conceito preparado por Marcus</footer>
  </div>;
}
