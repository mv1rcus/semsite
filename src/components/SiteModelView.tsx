import { useRef, type CSSProperties, type ReactNode } from "react";
import { Star, MessageCircle, MapPin, Clock } from "lucide-react";
import { getPalette, modelContent, type ModelClient, type SiteModel } from "@/lib/site-models";

const CSS3D = `
@keyframes sm-spin { from { transform: rotateX(-18deg) rotateY(0deg); } to { transform: rotateX(-18deg) rotateY(360deg); } }
@keyframes sm-float { 0%,100% { transform: translateY(0) rotateY(-14deg) rotateX(6deg); } 50% { transform: translateY(-14px) rotateY(14deg) rotateX(-4deg); } }
@keyframes sm-orbit { from { transform: rotateY(0deg); } to { transform: rotateY(360deg); } }
.sm-cube { position: relative; width: 180px; height: 180px; transform-style: preserve-3d; animation: sm-spin 14s linear infinite; }
.sm-face { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 56px; border: 2px solid var(--p); background: color-mix(in srgb, var(--p) 18%, transparent); backdrop-filter: blur(2px); }
.sm-orbit { position: relative; width: 240px; height: 240px; transform-style: preserve-3d; animation: sm-orbit 18s linear infinite; }
.sm-planet { position: absolute; left: 50%; top: 50%; width: 76px; height: 76px; margin: -38px; display: flex; align-items: center; justify-content: center; border-radius: 9999px; font-size: 30px; background: var(--p); color: var(--bg); box-shadow: 0 10px 30px color-mix(in srgb, var(--p) 55%, transparent); }
@media (prefers-reduced-motion: reduce) { .sm-cube, .sm-orbit, .sm-float { animation: none !important; } }
`;

function Stars({ n }: { n: number }) {
  return <span className="inline-flex gap-0.5" aria-label={`${n} de 5`}>{Array.from({ length: 5 }, (_, i) => <Star key={i} className="size-3.5" style={{ color: "var(--p)", fill: i < n ? "var(--p)" : "transparent" }} />)}</span>;
}

function Cube({ emoji }: { emoji: string }) {
  const faces = ["rotateY(0deg)", "rotateY(90deg)", "rotateY(180deg)", "rotateY(270deg)", "rotateX(90deg)", "rotateX(-90deg)"];
  return (
    <div style={{ perspective: 900 }} className="flex items-center justify-center py-8" aria-hidden>
      <div className="sm-cube">{faces.map((f) => <div key={f} className="sm-face" style={{ transform: `${f} translateZ(90px)` }}>{emoji}</div>)}</div>
    </div>
  );
}

function Orbit({ emojis }: { emojis: string[] }) {
  return (
    <div style={{ perspective: 800 }} className="flex items-center justify-center py-10" aria-hidden>
      <div className="sm-orbit">{emojis.map((e, i) => <div key={i} className="sm-planet" style={{ transform: `rotateY(${(360 / emojis.length) * i}deg) translateZ(130px)` }}>{e}</div>)}</div>
    </div>
  );
}

function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div style={{ perspective: 700 }} className={className}>
      <div ref={ref} className="h-full rounded-2xl border p-5 transition-transform duration-150" style={{ background: "var(--soft)", borderColor: "color-mix(in srgb, var(--p) 35%, transparent)", transformStyle: "preserve-3d" }}
        onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - 0.5; const y = (e.clientY - r.top) / r.height - 0.5; e.currentTarget.style.transform = `rotateY(${x * 18}deg) rotateX(${-y * 18}deg) translateZ(12px)`; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = ""; }}>{children}</div>
    </div>
  );
}

export function SiteModelView({ model, client }: { model: SiteModel; client?: ModelClient }) {
  const pal = getPalette(model.palette);
  const c = modelContent(model, client);
  const vars = { "--p": pal.primary, "--bg": pal.bg, "--fg": pal.fg, "--soft": pal.soft, background: pal.bg, color: pal.fg } as CSSProperties;
  const btn = (label = "Chamar no WhatsApp", filled = true) => (
    <a href={c.wa} target={c.hasWa ? "_blank" : undefined} rel="noreferrer" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold" style={filled ? { background: "var(--p)", color: pal.dark ? "#000" : "#fff" } : { border: "2px solid var(--p)", color: "var(--p)" }}><MessageCircle className="size-4" />{label}</a>
  );
  const nav = (
    <header className="flex items-center justify-between px-5 py-4 sm:px-10">
      <span className="text-lg font-extrabold tracking-tight">{model.emoji} {c.name}</span>
      <nav className="hidden gap-6 text-sm opacity-80 sm:flex"><a href="#servicos">{c.catalog.title}</a><a href="#avaliacoes">Avaliações</a><a href="#contato">Contato</a></nav>
    </header>
  );
  const services = (cols: string) => (
    <section id="servicos" className="px-5 py-12 sm:px-10">
      <h2 className="text-2xl font-extrabold sm:text-3xl">{c.catalog.title}</h2>
      <div className={`mt-6 grid gap-4 ${cols}`}>
        {c.catalog.items.map((it) => model.layout === "vitrine3d"
          ? <TiltCard key={it.title}><h3 className="font-bold">{it.title}</h3><p className="mt-1 text-sm opacity-75">{it.text}</p>{it.price && <p className="mt-3 text-sm font-bold" style={{ color: "var(--p)" }}>{it.price}</p>}</TiltCard>
          : <div key={it.title} className="rounded-2xl p-5" style={{ background: "var(--soft)" }}><h3 className="font-bold">{it.title}</h3><p className="mt-1 text-sm opacity-75">{it.text}</p>{it.price && <p className="mt-3 text-sm font-bold" style={{ color: "var(--p)" }}>{it.price}</p>}</div>)}
      </div>
    </section>
  );
  const reviews = (
    <section id="avaliacoes" className="px-5 py-12 sm:px-10">
      <h2 className="text-2xl font-extrabold sm:text-3xl">O que dizem os clientes</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {c.reviews.map((r) => <figure key={r.author} className="rounded-2xl p-5" style={{ background: "var(--soft)" }}><Stars n={r.rating} /><blockquote className="mt-2 text-sm opacity-85">“{r.text}”</blockquote><figcaption className="mt-3 text-xs opacity-60">{r.author} · {r.when}</figcaption></figure>)}
      </div>
    </section>
  );
  const contact = (
    <section id="contato" className="m-5 rounded-3xl px-6 py-12 text-center sm:m-10" style={{ background: "var(--p)", color: pal.dark ? "#000" : "#fff" }}>
      <h2 className="text-2xl font-extrabold sm:text-3xl">Vamos conversar?</h2>
      <p className="mx-auto mt-2 max-w-md text-sm opacity-90">Chame no WhatsApp e fale com {c.name}{c.city ? ` em ${c.city}` : ""}.</p>
      <a href={c.wa} target={c.hasWa ? "_blank" : undefined} rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black"><MessageCircle className="size-4" />WhatsApp</a>
    </section>
  );
  const footer = <footer className="flex flex-wrap items-center justify-center gap-4 px-5 py-8 text-xs opacity-60"><span className="inline-flex items-center gap-1"><MapPin className="size-3.5" />{c.city || "Sua cidade"}</span><span className="inline-flex items-center gap-1"><Clock className="size-3.5" />Seg a sáb, 9h às 18h</span><span>© {c.name}</span></footer>;
  const eyebrow = <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "var(--p)" }}>{model.ramoLabel}{c.city ? ` em ${c.city}` : ""}</p>;
  const emojis = [model.emoji, "⭐", "📍", "💬", "🎯"];

  let hero: ReactNode;
  switch (model.layout) {
    case "centered":
      hero = <section className="px-5 py-20 text-center sm:px-10" style={{ background: `radial-gradient(ellipse at top, color-mix(in srgb, var(--p) 28%, transparent), transparent 65%)` }}>{eyebrow}<h1 className="mx-auto mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-6xl">{c.headline}</h1><p className="mx-auto mt-4 max-w-xl opacity-75">{c.name} cuida de tudo com atenção do começo ao fim.</p><div className="mt-8 flex justify-center gap-3">{btn()}{btn("Ver serviços", false)}</div></section>;
      break;
    case "bold":
      hero = <section className="px-5 py-20 sm:px-10"><h1 className="text-5xl font-black uppercase leading-[0.95] sm:text-8xl">{c.name}<span style={{ color: "var(--p)" }}>.</span></h1><p className="mt-4 max-w-lg text-lg opacity-80">{c.headline}</p><div className="mt-8 flex flex-wrap gap-6 text-sm font-bold uppercase tracking-wider">{["Qualidade", "Agilidade", "Confiança"].map((t) => <span key={t} className="border-b-4 pb-1" style={{ borderColor: "var(--p)" }}>{t}</span>)}</div><div className="mt-8">{btn()}</div></section>;
      break;
    case "magazine":
      hero = <section className="grid gap-8 px-5 py-14 sm:grid-cols-5 sm:px-10"><div className="sm:col-span-3">{eyebrow}<h1 className="mt-3 font-serif text-4xl font-bold leading-tight sm:text-6xl">{c.headline}</h1><p className="mt-4 max-w-lg opacity-75">Uma experiência pensada nos detalhes. {c.name}, {model.ramoLabel.toLocaleLowerCase("pt-BR")}{c.city ? ` em ${c.city}` : ""}.</p><div className="mt-6">{btn()}</div></div><div className="flex min-h-48 items-end rounded-3xl p-6 text-7xl sm:col-span-2" style={{ background: `linear-gradient(135deg, var(--p), color-mix(in srgb, var(--p) 30%, var(--soft)))` }}>{model.emoji}</div></section>;
      break;
    case "minimal":
      hero = <section className="mx-auto max-w-2xl px-5 py-24 sm:px-10">{eyebrow}<h1 className="mt-4 text-4xl font-light leading-tight sm:text-6xl">{c.headline}</h1><div className="my-8 h-px w-24" style={{ background: "var(--p)" }} /><p className="opacity-70">{c.name}</p><div className="mt-8">{btn("Falar com a gente", false)}</div></section>;
      break;
    case "cubo3d":
      hero = <section className="grid items-center gap-4 px-5 py-10 sm:grid-cols-2 sm:px-10"><div>{eyebrow}<h1 className="mt-3 text-4xl font-black leading-tight sm:text-6xl">{c.headline}</h1><p className="mt-4 opacity-75">{c.name} em 3D: gire, explore e chame no WhatsApp.</p><div className="mt-6">{btn()}</div></div><Cube emoji={model.emoji} /></section>;
      break;
    case "orbita3d":
      hero = <section className="px-5 py-10 text-center sm:px-10">{eyebrow}<h1 className="mx-auto mt-3 max-w-2xl text-4xl font-black leading-tight sm:text-5xl">{c.headline}</h1><Orbit emojis={emojis} /><div>{btn()}</div></section>;
      break;
    case "vitrine3d":
      hero = <section className="px-5 py-14 sm:px-10"><div style={{ perspective: 900 }}><div style={{ animation: "sm-float 9s ease-in-out infinite", transformStyle: "preserve-3d" }} className="sm-float mx-auto max-w-xl rounded-3xl p-10 text-center shadow-2xl"><div className="rounded-3xl p-10" style={{ background: "var(--soft)", border: "2px solid var(--p)" }}><div className="text-7xl">{model.emoji}</div>{eyebrow}<h1 className="mt-2 text-3xl font-black sm:text-4xl">{c.name}</h1><p className="mt-2 text-sm opacity-75">{c.headline}</p><div className="mt-5">{btn()}</div></div></div></div></section>;
      break;
    default:
      hero = <section className="grid items-center gap-8 px-5 py-14 sm:grid-cols-2 sm:px-10"><div>{eyebrow}<h1 className="mt-3 text-4xl font-black leading-tight sm:text-6xl">{c.headline}</h1><p className="mt-4 max-w-md opacity-75">{c.name} atende você com cuidado e agilidade.</p><div className="mt-6 flex gap-3">{btn()}{btn("Ver serviços", false)}</div></div><div className="flex aspect-square max-h-80 items-center justify-center rounded-[2.5rem] text-8xl" style={{ background: `linear-gradient(145deg, var(--p), color-mix(in srgb, var(--p) 25%, var(--soft)))` }}>{model.emoji}</div></section>;
  }
  const cols = model.layout === "minimal" ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-4";
  return (
    <div style={vars} className="min-h-full font-sans">
      {model.is3d && <style>{CSS3D}</style>}
      {nav}{hero}{services(cols)}{reviews}{contact}{footer}
    </div>
  );
}
