import { useEffect, useState, type ReactNode } from "react";
import { LAYOUTS, autoLayout, isLayoutId, type LayoutId } from "@/lib/demo-layouts";
import { cleanBusinessName, detectNiche } from "@/lib/business-niche";
import { demonstrationPhoto } from "@/lib/demo-photos";
import pizza from "@/assets/food-pizza.jpg";
import burger from "@/assets/food-burger.jpg";
import plate from "@/assets/food-plate.jpg";
import dessert from "@/assets/food-dessert.jpg";
import { demoPhoneLink, demoSector, type Demonstration, type DemoGoogle, type GoogleReview } from "@/lib/demonstrations";
import { demoCatalog } from "@/lib/demo-catalog";
import { demoThemeStyle } from "@/lib/demo-theme";
import { Button } from "./ui/button";
import { DemoContact } from "./DemoContact";
import { ArrowRight, MessageCircle, MapPin, Clock, ShieldCheck, Star, Zap, CheckCircle2, Phone, Navigation, Scissors, Sparkles, Stethoscope, Truck } from "lucide-react";
const photos = { pizza, burger, plate, dessert };
type View = "home" | "catalog" | "contact";
type Item = { title: string; text: string; photo?: keyof typeof photos };

export function DemoSite({ demo: raw, layout: forced }: { demo: Demonstration & DemoGoogle; layout?: LayoutId | undefined }) {
  const reviews = (Array.isArray(raw.google_reviews) ? raw.google_reviews : []) as GoogleReview[];
  const demo = { ...raw, name: cleanBusinessName(raw.name), category: detectNiche(raw.name, raw.category) };
  const [view, setView] = useState<View>("home");
  const [interest, setInterest] = useState("");
  const sector = demoSector(demo.category);
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
    health: ["Clínica", "Tratamentos", "Agendar consulta"], quick: ["Início", "Serviços", "Orçamento"] };
  const nav = (cls: string, active: string, idle: string) => <nav aria-label={`Páginas de ${demo.name}`} className={cls}>{(["home", "catalog", "contact"] as const).map((v, i) => <button key={v} aria-current={view === v ? "page" : undefined} onClick={() => go(v)} className={view === v ? active : idle}>{labels[L.id][i]}</button>)}</nav>;
  const reviewsBlock = (cls: string) => reviews.length > 0 && <section className={cls}><h2 className="text-3xl font-bold">O que dizem no Google</h2>{rating && <p className="mt-1 text-sm text-muted-foreground">⭐ {rating}{raw.google_rating_count ? ` · ${raw.google_rating_count} avaliações` : ""}</p>}<div className="mt-6 grid gap-4 sm:grid-cols-3">{reviews.map((r, i) => <figure key={i} className="rounded-lg border bg-card p-5"><div className="flex gap-0.5 text-primary">{Array.from({ length: r.rating }).map((_, k) => <Star key={k} className="size-4 fill-current" />)}</div><blockquote className="mt-3 line-clamp-6 text-sm">“{r.text}”</blockquote><figcaption className="mt-3 text-xs text-muted-foreground">{r.author}{r.when ? ` · ${r.when}` : ""}</figcaption></figure>)}</div></section>;
  const contactView = <><DemoContact demo={demo} interest={interest} /><section className="mx-auto flex max-w-6xl flex-wrap gap-3 px-6 pb-12"><Button asChild variant="outline"><a href={maps} target="_blank" rel="noreferrer"><MapPin />Google Maps</a></Button><Button asChild variant="outline"><a href={`https://waze.com/ul?q=${encodeURIComponent(demo.address || demo.name)}`} target="_blank" rel="noreferrer"><Navigation />Waze</a></Button></section></>;
  const notice = <div className="border-b px-5 py-2 text-center text-xs text-muted-foreground">Conceito de site · não é o site oficial · fotos e catálogo ilustrativos</div>;
  const shell = (body: ReactNode, footer: ReactNode) => <div className={`demo-site demo-layout-${L.id}`} style={demoThemeStyle(demo.category)}>{notice}{body}{footer}</div>;

  // ---------- GASTRONOMIA: cardápio digital ----------
  if (L.id === "gastro") return shell(<>
    <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-4"><span className="break-words font-display text-2xl font-bold text-primary">{demo.name}</span>{nav("flex gap-1 rounded-full border bg-card p-1 text-sm", "rounded-full bg-primary px-4 py-1.5 font-bold text-primary-foreground", "rounded-full px-4 py-1.5 text-muted-foreground")}</header>
    {view === "home" && <>
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-6 py-8 md:grid-cols-[1fr_1.1fr]">
        <div><p className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-bold text-primary"><Truck className="size-4" />{L.ribbon}</p><h1 className="demo-brand mt-5 text-4xl font-extrabold leading-[1.05] sm:text-6xl">Bateu a fome? <span className="text-primary">A gente resolve.</span></h1><p className="mt-5 max-w-md text-muted-foreground">{demo.description}</p><div className="mt-7 flex flex-wrap gap-3"><Button size="lg" onClick={() => go("catalog")}>Ver cardápio<ArrowRight /></Button><Button size="lg" variant="whatsapp" onClick={() => choose("")}><MessageCircle />{L.cta}</Button></div></div>
        <div className="grid grid-cols-2 gap-3">{items.slice(0, 3).map((it, i) => <button key={it.title} onClick={() => choose(it.title)} className={`group relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"}`}><img src={img(it)} alt={`${it.title} — ilustrativo`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /><span className="absolute bottom-2 left-2 rounded-full bg-card px-3 py-1 text-xs font-bold">{it.title}</span></button>)}</div>
      </section>
      <section className="bg-primary text-primary-foreground"><div className="mx-auto flex max-w-6xl flex-wrap justify-around gap-4 px-6 py-5 text-sm font-bold">{L.features.map(f => <span key={f.t}>✦ {f.t}</span>)}</div></section>
      <section className="mx-auto max-w-6xl px-6 py-12"><h2 className="font-display text-4xl font-bold">Peça em 3 passos</h2><ol className="mt-6 grid gap-6 sm:grid-cols-3">{L.steps.map((s, i) => <li key={s} className="flex items-center gap-4"><span className="grid size-14 shrink-0 place-items-center rounded-full bg-primary font-display text-2xl text-primary-foreground">{i + 1}</span><span className="font-semibold">{s}</span></li>)}</ol></section>
      {reviewsBlock("mx-auto max-w-6xl px-6 pb-12")}
    </>}
    {view === "catalog" && <section className="mx-auto max-w-4xl px-6 py-10"><h1 className="text-center font-display text-5xl font-bold">{catalog.title}</h1><p className="mt-2 text-center text-sm text-muted-foreground">Toque no prato para pedir · itens ilustrativos</p><ul className="mt-8 divide-y border-y">{items.map(it => <li key={it.title}><button onClick={() => choose(it.title)} className="flex w-full items-center gap-4 py-4 text-left"><img src={img(it)} alt="" loading="lazy" className="size-20 shrink-0 rounded-xl object-cover" /><span className="min-w-0 flex-1"><span className="block text-lg font-bold">{it.title}</span><span className="block text-sm text-muted-foreground">{it.text}</span></span><span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">+</span></button></li>)}</ul></section>}
    {view === "contact" && contactView}
  </>, <footer className="bg-muted"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6 text-sm"><span className="font-bold">{demo.name}</span>{demo.address && <span className="flex gap-2 text-muted-foreground"><MapPin className="size-4" />{demo.address}</span>}</div></footer>);

  // ---------- VIP: clube escuro, tabela de serviços ----------
  if (L.id === "vip") return shell(<>
    {view === "home" ? <section className="demo-cover relative isolate flex min-h-[88vh] flex-col overflow-hidden">
      <img src={cover} alt={`Imagem ilustrativa para ${demo.category}`} className="absolute inset-0 -z-20 h-full w-full object-cover" /><div className="demo-cover-shade absolute inset-0 -z-10" />
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-6"><span className="text-xs font-bold uppercase tracking-[0.3em]">{demo.category}</span>{nav("flex gap-5 text-xs font-bold uppercase tracking-[0.2em]", "border-b-2 border-primary pb-1 text-primary", "pb-1 opacity-80")}</header>
      <div className="mx-auto mt-auto w-full max-w-6xl px-6 pb-14"><p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">{L.ribbon}</p><h1 className="demo-brand mt-4 max-w-4xl break-words text-5xl font-black uppercase leading-[0.9] sm:text-8xl">{demo.name}</h1><div className="mt-8 flex flex-wrap gap-3"><Button size="lg" onClick={() => choose("")}><Scissors />{L.cta}</Button><Button size="lg" variant="outline" onClick={() => go("catalog")}>Tabela de serviços</Button></div></div>
    </section> : <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 border-b px-6 py-6"><span className="font-display text-xl font-black uppercase">{demo.name}</span>{nav("flex gap-5 text-xs font-bold uppercase tracking-[0.2em]", "text-primary", "text-muted-foreground")}</header>}
    {view === "home" && <>
      <section className="mx-auto grid max-w-6xl gap-px overflow-hidden border-y bg-border sm:grid-cols-3">{L.features.map((f, i) => <div key={f.t} className="bg-background p-8"><span className="font-display text-5xl font-black text-primary">0{i + 1}</span><h3 className="mt-3 text-lg font-bold uppercase">{f.t}</h3><p className="mt-1 text-sm text-muted-foreground">{f.d}</p></div>)}</section>
      <section className="mx-auto max-w-6xl px-6 py-14"><p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Serviços</p>{vipTable(items.slice(0, 4))}</section>
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-6 pb-14 md:grid-cols-2"><img src={cover} alt="" loading="lazy" className="aspect-[4/5] w-full object-cover grayscale" /><div><h2 className="text-4xl font-black uppercase">Hora marcada.<br /><span className="text-primary">Zero espera.</span></h2><ul className="mt-6 space-y-3 text-muted-foreground"><li className="flex gap-3"><Clock className="size-5 text-primary" />Seg a Sáb · horário a confirmar</li>{demo.address && <li className="flex gap-3"><MapPin className="size-5 text-primary" />{demo.address}</li>}</ul><Button className="mt-8" onClick={() => go("contact")}>Reservar meu horário<ArrowRight /></Button></div></section>
      {reviewsBlock("mx-auto max-w-6xl px-6 pb-14")}
    </>}
    {view === "catalog" && <section className="mx-auto max-w-4xl px-6 py-12"><h1 className="text-5xl font-black uppercase">{catalog.title}</h1>{vipTable(items)}</section>}
    {view === "contact" && contactView}
  </>, <footer className="border-t py-8 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">{demo.name}</footer>);

  function vipTable(list: Item[]) { return <ul className="mt-6">{list.map(it => <li key={it.title}><button onClick={() => choose(it.title)} className="flex w-full items-baseline gap-4 border-b py-5 text-left"><span className="text-xl font-bold uppercase">{it.title}</span><span className="flex-1 border-b border-dotted" /><span className="text-sm font-bold text-primary">{L.itemCta} →</span></button><p className="pb-2 pt-1 text-sm text-muted-foreground">{it.text}</p></li>)}</ul>; }

  // ---------- BEAUTY: revista / spa ----------
  if (L.id === "beauty") return shell(<>
    <header className="px-6 pb-4 pt-10 text-center"><p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">{demo.category}</p><h1 className="demo-brand mx-auto mt-3 max-w-3xl break-words font-display text-4xl italic sm:text-6xl">{demo.name}</h1>{nav("mt-6 flex justify-center gap-8 text-sm italic", "text-primary underline underline-offset-8", "text-muted-foreground")}</header>
    {view === "home" && <>
      <section className="mx-auto grid max-w-6xl grid-cols-3 gap-3 px-6 py-6">{[cover, img(items[0] ?? { title: "", text: "" }), cover].map((s, i) => <img key={i} src={s} alt="Imagem ilustrativa" className={`h-full w-full object-cover ${i === 1 ? "aspect-[3/4] rounded-t-full" : "mt-12 aspect-[3/4] rounded-[2rem]"}`} />)}</section>
      <section className="mx-auto max-w-2xl px-6 py-10 text-center"><Sparkles className="mx-auto size-6 text-primary" /><p className="mt-4 font-display text-2xl italic leading-relaxed sm:text-3xl">“{L.ribbon}.”</p><p className="mt-4 text-muted-foreground">{demo.description}</p><Button className="mt-8 rounded-full px-8" size="lg" onClick={() => choose("")}>Quero reservar meu momento</Button></section>
      <section className="bg-muted py-14"><div className="mx-auto max-w-3xl px-6"><h2 className="text-center font-display text-3xl italic">Procedimentos</h2>{beautyList(items.slice(0, 4))}</div></section>
      {reviewsBlock("mx-auto max-w-6xl px-6 py-14 text-center")}
    </>}
    {view === "catalog" && <section className="mx-auto max-w-3xl px-6 py-10">{beautyList(items)}</section>}
    {view === "contact" && contactView}
  </>, <footer className="py-10 text-center font-display text-lg italic text-muted-foreground">{demo.name}</footer>);

  function beautyList(list: Item[]) { return <ul className="mt-8 space-y-4">{list.map(it => <li key={it.title}><button onClick={() => choose(it.title)} className="flex w-full items-center gap-5 rounded-full border bg-card p-2 pr-6 text-left"><img src={img(it)} alt="" loading="lazy" className="size-16 shrink-0 rounded-full object-cover" /><span className="min-w-0 flex-1"><span className="block font-display text-xl italic">{it.title}</span><span className="block text-xs text-muted-foreground">{it.text}</span></span><span className="text-sm text-primary">{L.itemCta}</span></button></li>)}</ul>; }

  // ---------- HEALTH: clínica de alto padrão ----------
  if (L.id === "health") return shell(<>
    <div className="bg-primary text-primary-foreground"><div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-6 py-2 text-xs">{demo.address && <span className="flex items-center gap-1"><MapPin className="size-3" />{demo.address}</span>}<span className="flex items-center gap-1"><Phone className="size-3" />Atendimento com hora marcada</span></div></div>
    <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5"><span className="flex items-center gap-2 break-words text-lg font-bold"><Stethoscope className="size-6 text-primary" />{demo.name}</span>{nav("flex gap-2 text-sm", "rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground", "rounded-md px-4 py-2 text-muted-foreground")}</header>
    {view === "home" && <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-10 md:grid-cols-2"><div><p className="text-sm font-semibold text-primary">{L.ribbon}</p><h1 className="demo-brand mt-3 text-4xl font-bold leading-tight sm:text-5xl">Cuidado de verdade, do primeiro contato ao resultado.</h1><p className="mt-5 text-muted-foreground">{demo.description}</p><Button size="lg" className="mt-8" onClick={() => choose("")}>{L.cta}<ArrowRight /></Button>
        <dl className="mt-10 grid grid-cols-3 gap-4 border-t pt-6 text-center">{[[rating ?? "✓", rating ? "nota no Google" : "atendimento humano"], [String(items.length), "tratamentos"], ["1:1", "acompanhamento"]].map(([a, b]) => <div key={b}><dt className="text-2xl font-bold text-primary">{a}</dt><dd className="text-xs text-muted-foreground">{b}</dd></div>)}</dl></div>
        <div className="relative"><img src={cover} alt={`Imagem ilustrativa para ${demo.category}`} className="aspect-[4/5] w-full rounded-3xl object-cover" /><div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl border bg-card p-4 shadow-lg"><ShieldCheck className="size-8 text-primary" /><span className="text-sm font-semibold">Protocolos de segurança</span></div></div></section>
      <section className="bg-muted py-14"><div className="mx-auto max-w-6xl px-6"><h2 className="text-3xl font-bold">Tratamentos</h2>{healthGrid(items.slice(0, 6))}</div></section>
      <section className="mx-auto max-w-6xl px-6 py-14"><h2 className="text-3xl font-bold">Sua jornada</h2><ol className="mt-8 border-l-2 border-primary pl-8">{L.steps.map((s, i) => <li key={s} className="relative pb-8"><span className="absolute -left-[2.6rem] grid size-8 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{i + 1}</span><p className="font-semibold">{s}</p></li>)}</ol></section>
      {reviewsBlock("mx-auto max-w-6xl px-6 pb-14")}
    </>}
    {view === "catalog" && <section className="mx-auto max-w-6xl px-6 py-10"><h1 className="text-4xl font-bold">{catalog.title}</h1>{healthGrid(items)}</section>}
    {view === "contact" && contactView}
  </>, <footer className="border-t"><div className="mx-auto max-w-6xl px-6 py-6 text-sm text-muted-foreground">{demo.name} · {demo.category}</div></footer>);

  function healthGrid(list: Item[]) { return <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{list.map(it => <article key={it.title} className="rounded-2xl border bg-card p-6"><span className="grid size-12 place-items-center rounded-xl bg-muted text-primary"><ShieldCheck /></span><h3 className="mt-4 text-lg font-bold">{it.title}</h3><p className="mt-2 text-sm text-muted-foreground">{it.text}</p><button onClick={() => choose(it.title)} className="mt-4 text-sm font-semibold text-primary">{L.itemCta} avaliação →</button></article>)}</div>; }

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
      {reviewsBlock("mx-auto max-w-6xl px-6 py-12")}
    </>}
    {view === "catalog" && <section className="mx-auto max-w-6xl px-6 py-10"><h1 className="text-4xl font-black uppercase">{catalog.title}</h1>{quickGrid(items)}</section>}
    {view === "contact" && contactView}
  </>, <footer className="bg-foreground text-background"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6"><span className="font-black uppercase">{demo.name}</span>{contact && <Button asChild variant="whatsapp"><a href={contact} target="_blank" rel="noreferrer"><MessageCircle />WhatsApp</a></Button>}</div></footer>);

  function quickGrid(list: Item[]) { return <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{list.map(it => <button key={it.title} onClick={() => choose(it.title)} className="flex items-center gap-4 rounded-xl border-2 bg-card p-4 text-left hover:border-primary"><img src={img(it)} alt="" loading="lazy" className="size-16 shrink-0 rounded-lg object-cover" /><span className="min-w-0 flex-1"><span className="block font-bold">{it.title}</span><span className="block text-xs text-muted-foreground">{it.text}</span></span><ArrowRight className="size-5 shrink-0 text-primary" /></button>)}</div>; }
}
