import { useEffect, useState, type ReactNode } from "react";
import { LAYOUTS, autoLayout, isLayoutId, type LayoutId } from "@/lib/demo-layouts";
import { cleanBusinessName, detectNiche } from "@/lib/business-niche";
import { demonstrationPhoto } from "@/lib/demo-photos";
import pizza from "@/assets/food-pizza.jpg";
import burger from "@/assets/food-burger.jpg";
import plate from "@/assets/food-plate.jpg";
import dessert from "@/assets/food-dessert.jpg";
import { demoPhoneLink, demoSector, demoDescription, type Demonstration, type DemoGoogle, type GoogleReview } from "@/lib/demonstrations";
import { demoCatalog, SECTOR_REVIEWS } from "@/lib/demo-catalog";
import { demoThemeStyle } from "@/lib/demo-theme";
import { Button } from "./ui/button";
import { DemoContact } from "./DemoContact";
import { ArrowRight, MessageCircle, MapPin, Clock, ShieldCheck, Star, Zap, CheckCircle2, Phone, Navigation, Scissors, Sparkles, Stethoscope, Truck } from "lucide-react";
import galBeauty from "@/assets/demo-beauty.jpg";
import galNails from "@/assets/demo-manicure.jpg";
import galSpa from "@/assets/demo-waxing.jpg";
import healthRoom from "@/assets/demo-health.jpg";
import healthLab from "@/assets/demo-lab.jpg";
import foodBakery from "@/assets/demo-bakery.jpg";
import foodCoffee from "@/assets/demo-coffee.jpg";
import foodIce from "@/assets/demo-icecream.jpg";
import foodAcai from "@/assets/demo-acai.jpg";
import foodAcai2 from "@/assets/demo-acai2.jpg";
import foodSorv from "@/assets/demo-sorvete.jpg";
import foodSorv2 from "@/assets/demo-sorvete2.jpg";
import foodPizzeria from "@/assets/demo-pizzeria.jpg";
import foodBurgerShop from "@/assets/demo-burger.jpg";
/** Fotos por ramo de comida: evita bolo no lugar de pão e a mesma foto repetida. Sem ramo específico, usa as fotos do catálogo. */
function foodPhotoSet(category: string): string[] | null {
  const c = category.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  if (/\b(?:padar|panific|confeit|doce|bolo)/.test(c)) return [foodBakery, dessert, foodBakery, foodCoffee];
  const hasAcai = /\bacai/.test(c), hasSorv = /\b(?:sorvet|gelat|picol)/.test(c);
  if (hasAcai && hasSorv) return [foodIce, foodAcai, foodSorv, foodIce];
  if (hasAcai) return [foodAcai, foodAcai2, foodAcai, foodAcai2];
  if (hasSorv) return [foodSorv, foodSorv2, foodSorv, foodSorv2];
  if (/\b(?:cafeter|cafe\b)/.test(c)) return [foodCoffee, dessert, foodBakery, foodCoffee];
  if (/\bpizz/.test(c)) return [foodPizzeria, pizza, foodPizzeria, pizza];
  if (/\b(?:hamb|burger)/.test(c)) return [foodBurgerShop, burger, foodBurgerShop, burger];
  return null;
}
import vipPilates from "@/assets/demo-pilates.jpg";
import vipAuto from "@/assets/demo-auto.jpg";
const beautyGallery = [galBeauty, galNails, galSpa];
const photos = { pizza, burger, plate, dessert };
type View = "home" | "catalog" | "contact";
type Item = { title: string; text: string; price?: string; photo?: keyof typeof photos };

export function DemoSite({ demo: raw, layout: forced }: { demo: Demonstration & DemoGoogle; layout?: LayoutId | undefined }) {
  const reviews = (Array.isArray(raw.google_reviews) ? raw.google_reviews : []) as GoogleReview[];
  const demo = { ...raw, name: cleanBusinessName(raw.name), category: detectNiche(raw.name, raw.category) };
  const [view, setView] = useState<View>("home");
  const [interest, setInterest] = useState("");
  const sector = demoSector(demo.category);
  const description = demoDescription(demo.name, sector, raw.description);
  const city = raw.name.match(/\bem\s+([A-ZÀ-ÿ][A-Za-zÀ-ÿ'.]{2,}(?:\s+[A-ZÀ-ÿ][A-Za-zÀ-ÿ'.]{2,})*)\s*$/)?.[1] ?? null;
  const place = demo.address.trim() ? demo.address : city ? `Atendimento em ${city} e região` : "Atendimento na sua região";
  const cover = demonstrationPhoto(demo.category);
  const catalog = demoCatalog(demo.category, sector);
  const items = catalog.items as Item[];
  const contact = demoPhoneLink(demo.phone);
  const [urlLayout, setUrlLayout] = useState<LayoutId | null>(null);
  useEffect(() => { const m = new URLSearchParams(window.location.search).get("modelo"); if (isLayoutId(m)) setUrlLayout(m); }, []);
  const L = LAYOUTS[forced ?? urlLayout ?? autoLayout(demo.category)];
  const go = (v: View) => { setView(v); if (typeof window !== "undefined") window.scrollTo({ top: 0 }); };
  const choose = (item: string) => {
    if (contact && item && typeof window !== "undefined") { window.open(`${contact}?text=${encodeURIComponent(L.message(item))}`, "_blank", "noopener"); return; }
    setInterest(item); go("contact");
  };
  const img = (item: Item) => item.photo ? photos[item.photo] : cover;
  const rating = raw.google_rating ? raw.google_rating.toLocaleString("pt-BR", { maximumFractionDigits: 1 }) : null;
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(demo.address || demo.name)}`;
  const labels: Record<LayoutId, [string, string, string]> = {
    gastro: ["Início", "Cardápio", "Pedir"], vip: ["Home", "Serviços", "Agendar"], beauty: ["início", "procedimentos", "reservar"],
    health: [/psic|terap|nutri|fisio|pilates|yoga|fono|coach/i.test(demo.category) ? "Início" : "Clínica", /psic|terap|nutri|fisio|pilates|yoga|fono|coach/i.test(demo.category) ? "Atendimentos" : "Tratamentos", "Agendar consulta"], quick: ["Início", "Serviços", "Orçamento"] };
  const nav = (cls: string, active: string, idle: string) => <nav aria-label={`Páginas de ${demo.name}`} className={cls}>{(["home", "catalog", "contact"] as const).map((v, i) => <button key={v} aria-current={view === v ? "page" : undefined} onClick={() => go(v)} className={view === v ? active : idle}>{labels[L.id][i]}</button>)}</nav>;
  const shownReviews: GoogleReview[] = reviews.length > 0 ? reviews : SECTOR_REVIEWS[sector];
  const reviewsBlock = (cls: string) => <section className={cls}><h2 className="text-3xl font-bold">{reviews.length > 0 ? "O que dizem os clientes" : "Quem já passou por aqui"}</h2>{reviews.length > 0 && rating && <p className="mt-1 text-sm text-muted-foreground">⭐ {rating}{raw.google_rating_count ? ` · ${raw.google_rating_count} avaliações` : ""}</p>}{reviews.length === 0 && <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="size-4 fill-current text-primary" />)}</p>}<div className="mt-6 grid gap-4 text-left sm:grid-cols-3">{shownReviews.map((r, i) => <figure key={i} className="rounded-lg border bg-card p-5"><div className="flex gap-0.5 text-primary">{Array.from({ length: r.rating }).map((_, k) => <Star key={k} className="size-4 fill-current" />)}</div><blockquote className="mt-3 line-clamp-6 text-sm">“{r.text}”</blockquote><figcaption className="mt-3 text-xs text-muted-foreground">{r.author}{r.when ? ` · ${r.when}` : ""}</figcaption></figure>)}</div>{reviews.length === 0 && <p className="mt-4 text-xs text-muted-foreground">Avaliações ilustrativas — no site final entram as avaliações reais do negócio.</p>}</section>;
  const whyBlock = (cls: string) => <section className={cls}><h2 className="text-3xl font-bold">Por que escolher {demo.name}?</h2><div className="mt-6 grid gap-4 sm:grid-cols-3">{L.why.map(w => <div key={w.t} className="rounded-lg border bg-card p-5"><h3 className="font-bold">{w.t}</h3><p className="mt-1 text-sm text-muted-foreground">{w.d}</p></div>)}</div></section>;
  const contactView = <><DemoContact demo={demo} interest={interest} address={place} hours={L.hours} /><section className="mx-auto flex max-w-6xl flex-wrap gap-3 px-6 pb-12"><Button asChild variant="outline"><a href={maps} target="_blank" rel="noreferrer"><MapPin />Google Maps</a></Button><Button asChild variant="outline"><a href={`https://waze.com/ul?q=${encodeURIComponent(demo.address || demo.name)}`} target="_blank" rel="noreferrer"><Navigation />Waze</a></Button></section></>;
  const notice = <div className="border-b px-5 py-2 text-center text-xs text-muted-foreground">Conceito de site · não é o site oficial · fotos, preços e avaliações ilustrativos</div>;
  const shell = (body: ReactNode, footer: ReactNode) => <div className={`demo-site demo-layout-${L.id}`} style={demoThemeStyle(demo.category)}>{notice}{body}{footer}</div>;

  const vipSecond: string | null = /\b(?:academ|crossfit|muscul)/i.test(demo.category) ? vipPilates : /\b(?:lava|lavagem|jato|est[eé]tica auto)/i.test(demo.category) ? vipAuto : null;
  const foodSet = foodPhotoSet(demo.category);
  const foodImg = (it: Item, i: number) => foodSet ? foodSet[i % foodSet.length]! : img(it);
  const distinctFood = items.map((it, i) => ({ it, i, src: foodImg(it, i) })).filter((x, k, all) => all.findIndex(y => y.src === x.src) === k);
  const popular = (foodSet ? distinctFood.map(x => x.it) : items).slice(0, 4);
  const popularCols = popular.length >= 4 ? "lg:grid-cols-4" : popular.length === 3 ? "sm:grid-cols-3" : "";
  const heroItems = foodSet ? distinctFood.slice(0, 3).map(x => x.it) : items.slice(0, 3);
  // ---------- GASTRONOMIA: cardápio digital ----------
  if (L.id === "gastro") return shell(<>
    <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-4"><span className="break-words font-display text-2xl font-medium text-primary">{demo.name}</span>{nav("flex gap-1 rounded-full border bg-card p-1 text-sm", "rounded-full bg-primary px-4 py-1.5 font-medium text-primary-foreground", "rounded-full px-4 py-1.5 text-muted-foreground")}</header>
    {view === "home" && <>
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-6 py-8 md:grid-cols-[1fr_1.1fr]">
        <div><img src={cover} alt={`Imagem ilustrativa para ${demo.category}`} className="mb-6 aspect-[16/10] w-full rounded-2xl object-cover md:hidden" /><p className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-medium text-primary"><Truck className="size-4" />{L.ribbon}</p><h1 className="demo-brand mt-5 text-4xl font-normal leading-[1.05] sm:text-6xl">Bateu a fome? <span className="text-primary">A gente resolve.</span></h1><p className="mt-5 max-w-md text-muted-foreground">{description}</p><div className="mt-7 flex flex-wrap gap-3"><Button size="lg" onClick={() => go("catalog")}>Ver cardápio<ArrowRight /></Button><Button size="lg" variant="whatsapp" onClick={() => choose("")}><MessageCircle />{L.cta}</Button></div></div>
        <div className={`grid gap-3 ${heroItems.length > 1 ? "grid-cols-2" : ""}`}>{heroItems.map((it, i) => <button key={it.title} onClick={() => choose(it.title)} className={`group relative overflow-hidden rounded-2xl ${i === 0 ? (heroItems.length > 1 ? "col-span-2 aspect-[16/9]" : "aspect-[4/3]") : (heroItems.length === 2 ? "col-span-2 aspect-[16/7]" : "aspect-square")}`}><img src={foodImg(it, items.indexOf(it))} alt={`${it.title} — ilustrativo`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /><span className="absolute bottom-2 left-2 rounded-full bg-card px-3 py-1 text-xs font-medium">{it.title}</span></button>)}</div>
      </section>
      <section className="bg-primary text-primary-foreground"><div className="mx-auto flex max-w-6xl flex-wrap justify-around gap-4 px-6 py-5 text-sm font-medium">{L.features.map(f => <span key={f.t}>✦ {f.t}</span>)}</div></section>
      <section className="mx-auto max-w-6xl px-6 py-12"><h2 className="font-display text-4xl font-normal">Peça em 3 passos</h2><ol className="mt-6 grid gap-6 sm:grid-cols-3">{L.steps.map((s, i) => <li key={s} className="flex items-center gap-4"><span className="grid size-14 shrink-0 place-items-center rounded-full bg-primary font-display text-2xl text-primary-foreground">{i + 1}</span><span className="font-semibold">{s}</span></li>)}</ol></section>
      {(!foodSet || distinctFood.length > 1) && <section className="mx-auto max-w-6xl px-6 pb-12"><h2 className="font-display text-3xl font-normal sm:text-4xl">Mais pedidos</h2><div className={`mt-6 grid gap-4 sm:grid-cols-2 ${popularCols}`}>{popular.map((it) => <button key={it.title} onClick={() => choose(it.title)} className="overflow-hidden rounded-2xl border bg-card text-left"><img src={foodImg(it, items.indexOf(it))} alt={`${it.title} — ilustrativo`} loading="lazy" className="aspect-[4/3] w-full object-cover" /><span className="block p-4"><span className="block text-base font-medium">{it.title}</span><span className="block text-xs text-muted-foreground">{it.text}</span>{it.price && <span className="mt-1 block text-sm font-medium text-primary">{it.price}</span>}</span></button>)}</div></section>}
      {whyBlock("mx-auto max-w-6xl px-6 pb-12")}
      {reviewsBlock("mx-auto max-w-6xl px-6 pb-12")}
      <section className="mx-auto max-w-3xl px-6 pb-12"><h2 className="font-display text-3xl font-normal sm:text-4xl">Dúvidas comuns</h2><div className="mt-5 divide-y rounded-2xl border bg-card">{[{ q: "Como faço o pedido?", a: "Escolha no cardápio e mande pelo WhatsApp. A gente confirma o valor e o tempo." }, { q: "Vocês entregam?", a: "Entregamos na região e também dá para retirar no balcão. Pergunte pelo WhatsApp o seu endereço." }, { q: "Quais as formas de pagamento?", a: "Combinado no pedido. Pergunte pelo WhatsApp o que está disponível." }, { q: "Aceitam encomendas?", a: "Sim, para quantidades maiores e datas especiais. Chame com antecedência." }].map(f => <details key={f.q} className="p-5"><summary className="cursor-pointer list-none text-sm font-medium">{f.q}</summary><p className="mt-2 text-sm text-muted-foreground">{f.a}</p></details>)}</div></section>
    </>}
    {view === "catalog" && <section className="mx-auto max-w-4xl px-6 py-10"><h1 className="text-center font-display text-5xl font-medium">{catalog.title}</h1><p className="mt-2 text-center text-sm text-muted-foreground">Toque no prato para pedir · itens ilustrativos</p><ul className="mt-8 divide-y border-y">{items.map(it => <li key={it.title}><button onClick={() => choose(it.title)} className="flex w-full items-center gap-4 py-4 text-left"><img src={foodImg(it, items.indexOf(it))} alt="" loading="lazy" className="size-20 shrink-0 rounded-xl object-cover" /><span className="min-w-0 flex-1"><span className="block text-lg font-medium">{it.title}</span><span className="block text-sm text-muted-foreground">{it.text}</span>{it.price && <span className="mt-0.5 block text-sm font-medium text-primary">{it.price}</span>}</span><span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">+</span></button></li>)}</ul></section>}
    {view === "contact" && contactView}
  </>, <footer className="bg-muted"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6 text-sm"><span className="font-medium">{demo.name}</span><span className="flex gap-2 text-muted-foreground"><MapPin className="size-4" />{place}</span><span className="flex gap-2 text-muted-foreground"><Clock className="size-4" />{L.hours}</span></div></footer>);

  // ---------- VIP: clube escuro, tabela de serviços ----------
  if (L.id === "vip") return shell(<>
    {view === "home" ? <section className="demo-cover relative isolate flex min-h-[88vh] flex-col overflow-hidden">
      <img src={cover} alt={`Imagem ilustrativa para ${demo.category}`} className="absolute inset-0 -z-20 h-full w-full object-cover" /><div className="demo-cover-shade absolute inset-0 -z-10" />
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-6"><span className="text-xs font-medium uppercase tracking-[0.3em]">{demo.category}</span>{nav("flex gap-5 text-xs font-medium uppercase tracking-[0.2em]", "border-b-2 border-primary pb-1 text-primary", "pb-1 opacity-80")}</header>
      <div className="mx-auto mt-auto w-full max-w-6xl px-6 pb-14"><p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">{L.ribbon}</p><h1 className="demo-brand mt-4 max-w-4xl break-words text-5xl font-normal uppercase leading-[0.9] sm:text-8xl">{demo.name}</h1><div className="mt-8 flex flex-wrap gap-3"><Button size="lg" onClick={() => choose("")}><Scissors />{L.cta}</Button><Button size="lg" variant="outline" onClick={() => go("catalog")}>Tabela de serviços</Button></div></div>
    </section> : <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 border-b px-6 py-6"><span className="font-display text-xl font-normal uppercase">{demo.name}</span>{nav("flex gap-5 text-xs font-medium uppercase tracking-[0.2em]", "text-primary", "text-muted-foreground")}</header>}
    {view === "home" && <>
      <section className="mx-auto grid max-w-6xl gap-px overflow-hidden border-y bg-border sm:grid-cols-3">{L.features.map((f, i) => <div key={f.t} className="bg-background p-8"><span className="font-display text-5xl font-normal text-primary">0{i + 1}</span><h3 className="mt-3 text-lg font-medium uppercase">{f.t}</h3><p className="mt-1 text-sm text-muted-foreground">{f.d}</p></div>)}</section>
      <section className="mx-auto max-w-6xl px-6 py-14"><p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">Serviços</p>{vipTable(items.slice(0, 4))}</section>
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-6 pb-14 md:grid-cols-2">{vipSecond ? <img src={vipSecond} alt="" loading="lazy" className="aspect-[4/5] w-full object-cover grayscale" /> : <div className="grid aspect-[4/5] w-full grid-cols-2 gap-px overflow-hidden border bg-border">{[{ n: rating ?? "4,9", l: "avaliação" }, { n: `${items.length}+`, l: "serviços" }, { n: "0 min", l: "de espera" }, { n: "100%", l: "hora marcada" }].map(x => <div key={x.l} className="flex flex-col items-center justify-center bg-card p-6 text-center"><span className="font-display text-5xl font-normal text-primary">{x.n}</span><span className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">{x.l}</span></div>)}</div>}<div><h2 className="text-4xl font-normal uppercase">Hora marcada.<br /><span className="text-primary">Zero espera.</span></h2><ul className="mt-6 space-y-3 text-muted-foreground"><li className="flex gap-3"><Clock className="size-5 text-primary" />{L.hours}</li><li className="flex gap-3"><MapPin className="size-5 text-primary" />{place}</li></ul><Button className="mt-8" onClick={() => go("contact")}>Reservar meu horário<ArrowRight /></Button></div></section>
      {whyBlock("mx-auto max-w-6xl px-6 pb-14")}
      {reviewsBlock("mx-auto max-w-6xl px-6 pb-14")}
      <section className="mx-auto max-w-4xl px-6 pb-14"><h2 className="font-display text-3xl font-normal uppercase sm:text-4xl">Dúvidas comuns</h2><div className="mt-5 divide-y border-y">{[{ q: "Preciso agendar?", a: "Atendemos com hora marcada para você não esperar. Chame no WhatsApp e escolha o horário." }, { q: "Posso remarcar?", a: "Pode. Avise com antecedência pelo WhatsApp que a gente encontra outro horário." }, { q: "Como funciona o pagamento?", a: "Combinado antes, sem surpresa. Pergunte pelo WhatsApp as formas disponíveis." }].map(f => <details key={f.q} className="py-4"><summary className="cursor-pointer list-none text-sm font-medium uppercase tracking-[0.1em]">{f.q}</summary><p className="mt-2 text-sm text-muted-foreground">{f.a}</p></details>)}</div></section>
      <section className="mx-auto max-w-4xl px-6 pb-14"><div className="border p-6 sm:p-8"><h2 className="font-display text-3xl font-normal uppercase">Reserve seu horário</h2><p className="mt-1 text-sm text-muted-foreground">Escolha o serviço e a gente continua pelo WhatsApp.</p><div className="mt-5 flex flex-wrap gap-2">{items.slice(0, 4).map(it => <button key={it.title} type="button" onClick={() => setInterest(it.title)} aria-pressed={interest === it.title} className={`border px-4 py-2 text-sm ${interest === it.title ? "border-primary bg-primary text-primary-foreground" : ""}`}>{it.title}</button>)}</div><Button className="mt-6" size="lg" onClick={() => choose(interest)}><MessageCircle />Reservar pelo WhatsApp</Button></div></section>
    </>}
    {view === "catalog" && <section className="mx-auto max-w-4xl px-6 py-12"><h1 className="text-5xl font-normal uppercase">{catalog.title}</h1>{vipTable(items)}</section>}
    {view === "contact" && contactView}
  </>, <footer className="border-t py-8 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">{demo.name}</footer>);

  function vipTable(list: Item[]) { return <ul className="mt-6">{list.map(it => <li key={it.title}><button onClick={() => choose(it.title)} className="flex w-full items-baseline gap-4 border-b py-5 text-left"><span className="text-xl font-medium uppercase">{it.title}</span><span className="flex-1 border-b border-dotted" />{it.price && <span className="shrink-0 text-sm font-bold">{it.price}</span>}<span className="text-sm font-bold text-primary">{L.itemCta} →</span></button><p className="pb-2 pt-1 text-sm text-muted-foreground">{it.text}</p></li>)}</ul>; }

  // ---------- BEAUTY: revista / spa ----------
  if (L.id === "beauty") return shell(<>
    <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6"><div><p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{demo.category}</p><h1 className="demo-brand mt-1 break-words font-display text-3xl font-normal sm:text-4xl">{demo.name}</h1></div>{nav("flex gap-6 text-sm", "text-primary underline underline-offset-8", "text-muted-foreground")}</header>
    {view === "home" && <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-12 pt-4 md:grid-cols-[1fr_1fr]">
        <div><Sparkles className="size-5 text-primary" /><p className="mt-4 font-display text-3xl font-normal leading-tight sm:text-5xl">{L.ribbon}</p><p className="mt-4 max-w-md text-muted-foreground">{description}</p><div className="mt-7 flex flex-wrap gap-3"><Button className="rounded-full px-7" size="lg" onClick={() => choose("")}>Quero reservar meu momento</Button><Button className="rounded-full px-7" size="lg" variant="outline" onClick={() => go("catalog")}>Ver procedimentos</Button></div></div>
        <img src={beautyGallery[0]} alt="Ambiente ilustrativo" className="aspect-[4/5] w-full rounded-t-full rounded-b-3xl object-cover" />
      </section>
      <section className="border-y bg-card"><div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-8 text-center sm:grid-cols-4">{[{ n: rating ?? "4,9", l: "avaliação média" }, { n: `${items.length}+`, l: "procedimentos" }, { n: "100%", l: "hora marcada" }, { n: "1 dia", l: "resposta no WhatsApp" }].map(x => <div key={x.l}><p className="font-display text-3xl font-normal text-primary">{x.n}</p><p className="mt-1 text-xs text-muted-foreground">{x.l}</p></div>)}</div></section>
      <section className="mx-auto max-w-6xl px-6 py-14"><h2 className="font-display text-2xl font-normal sm:text-3xl">Conheça o espaço</h2><div className="mt-6 grid gap-4 sm:grid-cols-3">{beautyGallery.map((g, i) => <figure key={i}><img src={g} alt="Imagem ilustrativa do espaço" loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" /><figcaption className="mt-2 text-xs text-muted-foreground">{["Ambiente", "Cuidado com as mãos", "Sala de tratamentos"][i]}</figcaption></figure>)}</div></section>
      <section className="bg-muted py-14"><div className="mx-auto max-w-3xl px-6"><h2 className="text-center font-display text-2xl font-normal sm:text-3xl">Procedimentos</h2>{beautyList(items.slice(0, 4))}<div className="mt-6 text-center"><Button variant="outline" className="rounded-full" onClick={() => go("catalog")}>Ver todos <ArrowRight /></Button></div></div></section>
      <section className="mx-auto max-w-6xl px-6 py-14"><h2 className="font-display text-2xl font-normal sm:text-3xl">Como funciona</h2><ol className="mt-6 grid gap-4 sm:grid-cols-3">{L.steps.map((st, i) => <li key={st} className="rounded-2xl border bg-card p-5"><span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">{i + 1}</span><p className="mt-3 text-sm font-medium">{st}</p></li>)}</ol></section>
      <section className="mx-auto max-w-3xl px-6 pb-14"><div className="rounded-3xl border bg-card p-6 sm:p-8"><h2 className="font-display text-2xl font-normal">Reserve seu horário</h2><p className="mt-1 text-sm text-muted-foreground">Escolha o procedimento e a gente continua pelo WhatsApp.</p><div className="mt-5 flex flex-wrap gap-2">{items.slice(0, 4).map(it => <button key={it.title} type="button" onClick={() => setInterest(it.title)} aria-pressed={interest === it.title} className={`rounded-full border px-4 py-2 text-sm ${interest === it.title ? "border-primary bg-primary text-primary-foreground" : ""}`}>{it.title}</button>)}</div><Button className="mt-6 w-full rounded-full sm:w-auto sm:px-8" size="lg" onClick={() => choose(interest)}><MessageCircle />Reservar pelo WhatsApp</Button></div></section>
      {whyBlock("mx-auto max-w-6xl px-6 py-10")}
      {reviewsBlock("mx-auto max-w-6xl px-6 py-14")}
    </>}
    {view === "catalog" && <section className="mx-auto max-w-3xl px-6 py-10">{beautyList(items)}</section>}
    {view === "contact" && contactView}
  </>, <footer className="border-t py-10 text-center"><p className="font-display text-lg font-normal text-muted-foreground">{demo.name}</p><p className="mt-2 text-xs text-muted-foreground">{place} · {L.hours}</p></footer>);

  function beautyList(list: Item[]) { return <ul className="mt-8 space-y-4">{list.map((it, i) => <li key={it.title}><button onClick={() => choose(it.title)} className="flex w-full items-center gap-5 rounded-full border bg-card p-2 pr-6 text-left"><img src={it.photo ? photos[it.photo] : beautyGallery[i % beautyGallery.length]} alt="" loading="lazy" className="size-16 shrink-0 rounded-full object-cover" /><span className="min-w-0 flex-1"><span className="block text-base font-medium">{it.title}</span><span className="block text-xs text-muted-foreground">{it.text}</span></span><span className="flex shrink-0 flex-col items-end">{it.price && <span className="text-sm font-medium">{it.price}</span>}<span className="text-sm text-primary">{L.itemCta}</span></span></button></li>)}</ul>; }

  // ---------- HEALTH: clínica (dentista, médico) ou consultório acolhedor (psicologia, nutrição, fisio) ----------
  if (L.id === "health") {
    const soft = /psic|terap|nutri|fisio|pilates|yoga|fono|coach/i.test(demo.category.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
    const gallery = soft ? [cover, healthRoom] : [cover, healthRoom, healthLab];
    const sidePhoto = /psic|terap|coach|fono/i.test(demo.category) ? null : gallery[1];
    const faq = [{ q: "Como marco o primeiro atendimento?", a: "Pelo WhatsApp. Você escolhe o melhor dia e a gente confirma o horário." }, { q: "Quanto tempo dura?", a: "Cada atendimento é pensado para o seu caso. Você sabe o tempo antes de começar." }, { q: "Posso remarcar?", a: "Pode. Avise com antecedência pelo WhatsApp e a gente encontra outro horário." }, { q: "Como é o pagamento?", a: "Combinado antes, sem surpresa. Pergunte pelo WhatsApp as formas disponíveis." }];
    const faqBlock = <section className="mx-auto max-w-3xl px-6 pb-14"><h2 className="font-display text-2xl font-normal sm:text-3xl">Dúvidas comuns</h2><div className="mt-5 divide-y rounded-2xl border bg-card">{faq.map(f => <details key={f.q} className="group p-5"><summary className="cursor-pointer list-none text-sm font-medium">{f.q}</summary><p className="mt-2 text-sm text-muted-foreground">{f.a}</p></details>)}</div></section>;
    const bookBlock = <section className="mx-auto max-w-3xl px-6 pb-14"><div className="rounded-3xl border bg-card p-6 sm:p-8"><h2 className="font-display text-2xl font-normal">{soft ? "Comece com uma conversa" : "Marque sua avaliação"}</h2><p className="mt-1 text-sm text-muted-foreground">Escolha o assunto e a gente continua pelo WhatsApp.</p><div className="mt-5 flex flex-wrap gap-2">{items.slice(0, 4).map(it => <button key={it.title} type="button" onClick={() => setInterest(it.title)} aria-pressed={interest === it.title} className={`rounded-full border px-4 py-2 text-sm ${interest === it.title ? "border-primary bg-primary text-primary-foreground" : ""}`}>{it.title}</button>)}</div><Button className="mt-6 w-full rounded-full sm:w-auto sm:px-8" size="lg" onClick={() => choose(interest)}><MessageCircle />Falar pelo WhatsApp</Button></div></section>;
    if (soft) return shell(<>
      <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6"><span className="break-words font-display text-2xl font-normal">{demo.name}</span>{nav("flex gap-5 text-sm", "text-primary underline underline-offset-8", "text-muted-foreground")}</header>
      {view === "home" && <>
        <section className="mx-auto max-w-3xl px-6 pb-10 pt-6 text-center"><p className="text-xs uppercase tracking-[0.25em] text-primary">{demo.category}</p><h1 className="demo-brand mt-4 font-display text-4xl font-normal leading-tight sm:text-6xl">Um espaço para você ser ouvido com calma.</h1><p className="mx-auto mt-5 max-w-xl text-muted-foreground">{description}</p><Button size="lg" className="mt-7 rounded-full px-8" onClick={() => choose("")}>Agendar primeira conversa</Button></section>
        <section className="mx-auto max-w-6xl px-6"><img src={gallery[0]} alt="Ambiente ilustrativo" className="aspect-[16/8] w-full rounded-[2rem] object-cover" /></section>
        <section className="mx-auto max-w-6xl px-6 py-14"><h2 className="font-display text-2xl font-normal sm:text-3xl">Com o que podemos ajudar</h2><div className="mt-6 flex flex-wrap gap-3">{items.slice(0, 6).map(it => <button key={it.title} onClick={() => choose(it.title)} className="rounded-full border bg-card px-5 py-3 text-left text-sm"><span className="font-medium">{it.title}</span><span className="block text-xs text-muted-foreground">{it.text}</span></button>)}</div></section>
        <section className="bg-muted py-14"><div className={`mx-auto grid max-w-6xl items-center gap-10 px-6 ${sidePhoto ? "md:grid-cols-2" : "max-w-3xl"}`}>{sidePhoto && <img src={sidePhoto} alt="Ambiente ilustrativo" loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover" />}<div><h2 className="font-display text-2xl font-normal sm:text-3xl">Como é a primeira conversa</h2><ol className="mt-5 space-y-4">{L.steps.map((st, i) => <li key={st} className="flex items-start gap-4"><span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-medium text-primary-foreground">{i + 1}</span><p className="pt-1 text-sm">{st}</p></li>)}</ol></div></div></section>
        {whyBlock("mx-auto max-w-6xl px-6 py-14")}
        {reviewsBlock("mx-auto max-w-6xl px-6 pb-14")}
        {faqBlock}{bookBlock}
      </>}
      {view === "catalog" && <section className="mx-auto max-w-3xl px-6 py-10"><h1 className="font-display text-3xl font-normal">{catalog.title}</h1><ul className="mt-6 space-y-3">{items.map(it => <li key={it.title}><button onClick={() => choose(it.title)} className="flex w-full items-center justify-between gap-4 rounded-2xl border bg-card p-5 text-left"><span><span className="block font-medium">{it.title}</span><span className="block text-sm text-muted-foreground">{it.text}</span></span><span className="shrink-0 text-sm text-primary">{L.itemCta}</span></button></li>)}</ul></section>}
      {view === "contact" && contactView}
    </>, <footer className="border-t py-10 text-center"><p className="font-display text-lg font-normal text-muted-foreground">{demo.name}</p><p className="mt-2 text-xs text-muted-foreground">{place} · {L.hours}</p></footer>);
    return shell(<>
    <div className="bg-primary text-primary-foreground"><div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-6 py-2 text-xs"><span className="flex items-center gap-1"><MapPin className="size-3" />{place}</span><span className="flex items-center gap-1"><Clock className="size-3" />{L.hours}</span><span className="flex items-center gap-1"><Phone className="size-3" />Atendimento com hora marcada</span></div></div>
    <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5"><span className="flex items-center gap-2 break-words text-lg font-medium"><Stethoscope className="size-6 text-primary" />{demo.name}</span>{nav("flex gap-2 text-sm", "rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground", "rounded-md px-4 py-2 text-muted-foreground")}</header>
    {view === "home" && <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-10 md:grid-cols-2"><div><p className="text-sm font-medium text-primary">{L.ribbon}</p><h1 className="demo-brand mt-3 font-display text-4xl font-normal leading-tight sm:text-5xl">Cuidado de verdade, do primeiro contato ao resultado.</h1><p className="mt-5 text-muted-foreground">{description}</p><div className="mt-8 flex flex-wrap gap-3"><Button size="lg" onClick={() => choose("")}>{L.cta}<ArrowRight /></Button><Button size="lg" variant="outline" onClick={() => go("catalog")}>Ver tratamentos</Button></div>
        <dl className="mt-10 grid grid-cols-3 gap-4 border-t pt-6 text-center">{[[rating ?? "✓", rating ? "nota dos clientes" : "atendimento humano"], [String(items.length), "tratamentos"], ["1:1", "acompanhamento"]].map(([a, b]) => <div key={b}><dt className="font-display text-3xl font-normal text-primary">{a}</dt><dd className="text-xs text-muted-foreground">{b}</dd></div>)}</dl></div>
        <div className="relative"><img src={gallery[0]} alt={`Imagem ilustrativa para ${demo.category}`} className="aspect-[4/5] w-full rounded-3xl object-cover" /><div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl border bg-card p-4 shadow-lg"><ShieldCheck className="size-8 text-primary" /><span className="text-sm font-medium">Protocolos de segurança</span></div></div></section>
      <section className="mx-auto max-w-6xl px-6 py-14"><h2 className="font-display text-2xl font-normal sm:text-3xl">Nossa estrutura</h2><div className="mt-6 grid gap-4 sm:grid-cols-3">{[cover, healthRoom, healthLab].map((g, i) => <figure key={i}><img src={g} alt="Imagem ilustrativa da estrutura" loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" /><figcaption className="mt-2 text-xs text-muted-foreground">{["Sala de atendimento", "Recepção", "Exames e apoio"][i]}</figcaption></figure>)}</div></section>
      <section className="bg-muted py-14"><div className="mx-auto max-w-6xl px-6"><h2 className="font-display text-2xl font-normal sm:text-3xl">Tratamentos</h2>{healthGrid(items.slice(0, 6))}</div></section>
      <section className="mx-auto max-w-6xl px-6 py-14"><h2 className="font-display text-2xl font-normal sm:text-3xl">Sua jornada</h2><ol className="mt-8 border-l-2 border-primary pl-8">{L.steps.map((st, i) => <li key={st} className="relative pb-8"><span className="absolute -left-[2.6rem] grid size-8 place-items-center rounded-full bg-primary text-sm font-medium text-primary-foreground">{i + 1}</span><p className="font-medium">{st}</p></li>)}</ol></section>
      {whyBlock("mx-auto max-w-6xl px-6 pb-14")}
      {reviewsBlock("mx-auto max-w-6xl px-6 pb-14")}
      {faqBlock}{bookBlock}
    </>}
    {view === "catalog" && <section className="mx-auto max-w-6xl px-6 py-10"><h1 className="font-display text-3xl font-normal">{catalog.title}</h1>{healthGrid(items)}</section>}
    {view === "contact" && contactView}
  </>, <footer className="border-t"><div className="mx-auto max-w-6xl px-6 py-6 text-sm text-muted-foreground">{demo.name} · {demo.category}</div></footer>);
  }

  function healthGrid(list: Item[]) { return <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{list.map(it => <article key={it.title} className="rounded-2xl border bg-card p-6"><span className="grid size-12 place-items-center rounded-xl bg-muted text-primary"><ShieldCheck /></span><h3 className="mt-4 text-base font-medium">{it.title}</h3><p className="mt-2 text-sm text-muted-foreground">{it.text}</p>{it.price && <p className="mt-2 text-sm font-medium text-primary">{it.price}</p>}<button onClick={() => choose(it.title)} className="mt-4 text-sm font-semibold text-primary">{L.itemCta} avaliação →</button></article>)}</div>; }

  // ---------- QUICK: orçamento urgente ----------
  return shell(<>
    <div className="bg-primary text-primary-foreground"><div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-6 py-2 text-sm font-bold"><Zap className="size-4" />Atendimento rápido na sua região · {L.ribbon}</div></div>
    <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4"><span className="break-words text-xl font-black uppercase">{demo.name}</span>{nav("flex gap-4 text-sm font-bold uppercase", "text-primary", "text-muted-foreground")}</header>
    {view === "home" && <>
      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-8 md:grid-cols-[1.2fr_1fr]">
        <div className="rounded-3xl bg-foreground p-8 text-background sm:p-12"><p className="text-xs font-bold uppercase tracking-widest text-primary">{demo.category}</p><h1 className="demo-brand mt-3 text-4xl font-black uppercase leading-none sm:text-6xl">Resolvemos hoje.</h1><ul className="mt-6 space-y-2">{L.features.map(f => <li key={f.t} className="flex gap-2"><CheckCircle2 className="size-5 shrink-0 text-primary" />{f.t} — <span className="opacity-70">{f.d}</span></li>)}</ul><Button size="lg" className="mt-8 h-14 w-full text-base" onClick={() => choose("")}><MessageCircle />{L.cta}</Button></div>
        <img src={cover} alt={`Imagem ilustrativa para ${demo.category}`} className="h-full min-h-72 w-full rounded-3xl object-cover" />
      </section>
      <section className="mx-auto max-w-6xl px-6 py-10"><h2 className="text-3xl font-black uppercase">O que fazemos</h2>{quickGrid(items.slice(0, 6))}</section>
      <section className="border-y bg-muted"><div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 sm:grid-cols-3">{L.steps.map((s, i) => <div key={s} className="flex items-center gap-3"><span className="font-display text-5xl font-black text-primary">{i + 1}</span><span className="font-bold uppercase">{s}</span></div>)}</div></section>
      {whyBlock("mx-auto max-w-6xl px-6 pb-2")}
      {reviewsBlock("mx-auto max-w-6xl px-6 py-12")}
    </>}
    {view === "catalog" && <section className="mx-auto max-w-6xl px-6 py-10"><h1 className="text-4xl font-black uppercase">{catalog.title}</h1>{quickGrid(items)}</section>}
    {view === "contact" && contactView}
  </>, <footer className="bg-foreground text-background"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6"><span className="font-black uppercase">{demo.name}</span><span className="flex items-center gap-2 text-sm opacity-80"><MapPin className="size-4" />{place} · {L.hours}</span>{contact && <Button asChild variant="whatsapp"><a href={contact} target="_blank" rel="noreferrer"><MessageCircle />WhatsApp</a></Button>}</div></footer>);

  function quickGrid(list: Item[]) { return <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{list.map(it => <button key={it.title} onClick={() => choose(it.title)} className="flex items-center gap-4 rounded-xl border-2 bg-card p-4 text-left hover:border-primary"><img src={img(it)} alt="" loading="lazy" className="size-16 shrink-0 rounded-lg object-cover" /><span className="min-w-0 flex-1"><span className="block font-bold">{it.title}</span><span className="block text-xs text-muted-foreground">{it.text}</span>{it.price && <span className="mt-0.5 block text-xs font-bold text-primary">{it.price}</span>}</span><ArrowRight className="size-5 shrink-0 text-primary" /></button>)}</div>; }
}
