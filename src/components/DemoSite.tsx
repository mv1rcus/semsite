import { useState } from "react";
import { demonstrationPhoto } from "@/lib/demo-photos";
import pizza from "@/assets/food-pizza.jpg";
import burger from "@/assets/food-burger.jpg";
import plate from "@/assets/food-plate.jpg";
import dessert from "@/assets/food-dessert.jpg";
import { demoPhoneLink, demoSector, type Demonstration } from "@/lib/demonstrations";
import { SECTOR_CATALOG } from "@/lib/demo-catalog";
import { Button } from "./ui/button";
import { DemoContact } from "./DemoContact";
import { DemoPrompt } from "./DemoPrompt";
import { ArrowRight, MessageCircle, Plus, Minus, MapPin } from "lucide-react";
const photos = { pizza, burger, plate, dessert };
type View = "home" | "catalog" | "contact";
export function DemoSite({ demo }: { demo: Demonstration }) {
  const [view, setView] = useState<View>("home");
  const [interest, setInterest] = useState("");
  const [detail, setDetail] = useState<string | null>(null);
  const sector = demoSector(demo.category);
  const cover = demonstrationPhoto(demo.category);
  const catalog = SECTOR_CATALOG[sector];
  const contact = demoPhoneLink(demo.phone);
  const choose = (item: string) => { setInterest(item); setView("contact"); };
  const catalogCards = (compact: boolean) => <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{catalog.items.map((item, index) => <article key={item.title} className="flex min-w-0 flex-col overflow-hidden rounded-lg border bg-card">
    <img src={item.photo ? photos[item.photo] : cover} alt={`${item.title} — imagem ilustrativa`} width={816} height={612} loading="lazy" className="aspect-[4/3] w-full object-cover" />
    <div className="flex flex-1 flex-col p-5"><p className="mb-2 text-xs font-semibold text-primary">0{index + 1} · {demo.category}</p><h3 className="break-words text-xl font-bold">{item.title}</h3><p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
      {!compact && <><Button variant="ghost" className="mt-4 justify-between px-0" onClick={() => setDetail(detail === item.title ? null : item.title)} aria-expanded={detail === item.title}>Mais detalhes{detail === item.title ? <Minus /> : <Plus />}</Button>{detail === item.title && <p className="border-t pt-3 text-sm text-muted-foreground">Consulte a equipe para confirmar disponibilidade, condições e informações sobre {item.title.toLowerCase()}.</p>}</>}
      <Button variant="outline" className="mt-5 w-full" onClick={() => choose(item.title)}>{sector === "food" ? "Consultar pedido" : "Tenho interesse"}<ArrowRight /></Button>
    </div></article>)}</div>;
  return <div className="demo-site">
    <div className="border-b px-5 py-2 text-center text-xs text-muted-foreground">Conceito de site · não é o site oficial · fotos e catálogo ilustrativos</div>
    <header className="mx-auto max-w-6xl px-6 py-5"><div className="flex flex-wrap items-center justify-between gap-4"><span className="max-w-full break-words font-display text-xl font-bold">{demo.name}</span><span className="text-xs text-muted-foreground">{demo.category}</span></div>
      <nav role="tablist" aria-label={`Páginas de ${demo.name}`} className="mt-5 flex gap-2 border-t pt-4">{([{ id: "home", label: "Início" }, { id: "catalog", label: catalog.title }, { id: "contact", label: "Contato" }] as const).map(tab => <Button key={tab.id} role="tab" id={`demo-tab-${tab.id}`} aria-controls={`demo-panel-${tab.id}`} aria-selected={view === tab.id} variant={view === tab.id ? "default" : "ghost"} className="h-auto min-h-9 min-w-0 whitespace-normal px-3 text-xs sm:text-sm" onClick={() => setView(tab.id)}>{tab.label}</Button>)}</nav>
    </header>
    <div role="tabpanel" id={`demo-panel-${view}`} aria-labelledby={`demo-tab-${view}`}>
    {view === "home" && <>
      <section className="demo-cover relative isolate flex min-h-[400px] items-end overflow-hidden px-6 py-10 sm:min-h-[490px]">
        <img src={cover} width={1280} height={720} alt={`Imagem ilustrativa para ${demo.category}`} className="absolute inset-0 -z-20 h-full w-full object-cover" /><div className="demo-cover-shade absolute inset-0 -z-10" />
        <div className="mx-auto w-full max-w-6xl"><p className="mb-4 text-sm font-semibold">{demo.headline}</p><h1 className="max-w-3xl break-words text-3xl font-extrabold leading-tight sm:text-5xl">{demo.name}</h1><p className="mt-5 max-w-xl text-base leading-relaxed">{demo.description}</p><div className="mt-7 flex flex-wrap gap-3"><Button onClick={() => setView("catalog")}>Conhecer {catalog.title.toLowerCase()}<ArrowRight /></Button><Button variant="whatsapp" onClick={() => setView("contact")}><MessageCircle />Fale com a equipe</Button></div></div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-12"><p className="text-xs font-semibold uppercase text-primary">{demo.category}</p><div className="mt-3 flex flex-wrap items-center justify-between gap-3"><h2 className="text-3xl font-bold">{catalog.title}</h2><Button variant="link" onClick={() => setView("catalog")}>Ver catálogo completo<ArrowRight /></Button></div>{catalogCards(true)}</section>
      <section className="border-y bg-muted"><div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-2"><div><p className="text-sm font-semibold text-primary">Sobre o negócio</p><h2 className="mt-3 break-words text-3xl font-bold">Conheça {demo.name}</h2><p className="mt-5 leading-relaxed text-muted-foreground">{demo.description}</p>{demo.address && <p className="mt-5 flex gap-2 text-sm"><MapPin className="size-4 shrink-0 text-primary" />{demo.address}</p>}<Button variant="outline" className="mt-6" onClick={() => setView("contact")}>Entre em contato<ArrowRight /></Button></div><img src={cover} alt={`Conceito visual de ${demo.category}`} width={1280} height={720} loading="lazy" className="aspect-[16/10] w-full rounded-lg object-cover" /></div></section>
      <section className="mx-auto max-w-6xl px-6 py-12"><h2 className="text-3xl font-bold">Perguntas frequentes</h2><div className="mt-6 divide-y border-y">{[{ q: sector === "food" ? "Como consultar um pedido?" : "Como solicitar atendimento?", a: "Escolha um item do catálogo e fale com a equipe pelo WhatsApp para consultar disponibilidade e condições." }, { q: "Onde encontro o endereço?", a: demo.address || "O endereço ainda não foi informado neste conceito. Confirme com o responsável pelo negócio." }, { q: "Este é o site oficial?", a: "Não. Esta é uma proposta visual. Imagens e itens do catálogo são exemplos e precisam ser confirmados pelo negócio." }].map(item => <details key={item.q} className="py-5"><summary className="cursor-pointer font-semibold">{item.q}</summary><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p></details>)}</div></section>
    </>}
    {view === "catalog" && <><section className="mx-auto max-w-6xl px-6 py-10"><p className="text-sm font-semibold text-primary">{demo.name}</p><h1 className="mt-3 text-4xl font-bold">{catalog.title}</h1><p className="mt-4 max-w-2xl text-muted-foreground">Explore as opções deste conceito e consulte a equipe sobre o que você procura. Itens ilustrativos, sujeitos à confirmação pelo negócio.</p>{catalogCards(false)}</section><section className="border-t bg-muted px-6 py-10 text-center"><h2 className="text-2xl font-bold">Não encontrou o que procura?</h2><Button className="mt-5" onClick={() => choose("")}>Converse com a equipe<ArrowRight /></Button></section></>}
    {view === "contact" && <DemoContact demo={demo} interest={interest} />}
    </div>
    <DemoPrompt demo={demo} />
    <footer className="border-t"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-6 py-7"><div><p className="break-words font-bold">{demo.name}</p><p className="mt-1 text-xs text-muted-foreground">{demo.category} · Proposta visual de site</p></div>{contact && <Button asChild variant="whatsapp"><a href={contact} target="_blank" rel="noreferrer"><MessageCircle />WhatsApp</a></Button>}</div></footer>
  </div>;
}
