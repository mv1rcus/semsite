import { useState, type CSSProperties, type ReactNode } from "react";
import { MessageCircle, Phone, MapPin, Clock, Instagram, Menu, X } from "lucide-react";
import { img, type PremiumModel } from "@/lib/premium-models";
import { BUILDERS, CONFIG, FAQ, GALLERY, REVIEWS, type SiteConfig } from "@/lib/premium-config";
import type { ModelClient } from "@/lib/site-models";

export const PLACEHOLDER_WA = "5511999990000";
const digits = (s?: string) => (s ?? "").replace(/\D/g, "");
export const waLink = (c: ModelClient, text?: string) => { const d = digits(c.whatsapp); const n = d ? (d.length <= 11 ? `55${d}` : d) : PLACEHOLDER_WA; return `https://wa.me/${n}${text ? `?text=${encodeURIComponent(text)}` : ""}`; };
const phoneText = (c: ModelClient) => { const d = digits(c.whatsapp); const n = d.length >= 10 ? d.slice(-11) : "11999990000"; return n.length === 11 ? `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}` : `(${n.slice(0, 2)}) ${n.slice(2, 6)}-${n.slice(6)}`; };
const insta = (name: string) => name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");

export const CSS = `.ps *{box-sizing:border-box}.ps .pg-wrap{max-width:1180px;margin:0 auto}.ps .pg-grid{display:grid;gap:20px}.ps .pg-nav{display:flex;gap:26px;align-items:center}.ps .pg-burger{display:none;background:none;border:0;color:inherit;cursor:pointer}.ps .pg-link{background:none;border:0;color:inherit;font:inherit;cursor:pointer;padding:6px 0;opacity:.8;border-bottom:2px solid transparent;white-space:nowrap}.ps .pg-link:hover{opacity:1}.ps .pg-link[data-on="1"]{opacity:1;border-bottom-color:currentColor}.ps .pg-side{display:block}@media(max-width:860px){.ps .pg-nav{display:none}.ps .pg-burger{display:block}.ps .pg-two{grid-template-columns:minmax(0,1fr)!important}.ps .pg-hide-m{display:none!important}.ps .pg-pad{padding-left:20px!important;padding-right:20px!important}.ps .pg-sidebar{position:static!important;width:auto!important}.ps .pg-sidemain{margin-left:0!important}}@media(min-width:861px){.ps .pg-menu-m{display:none!important}.ps .pg-sidemain{margin-left:240px}.ps header.pg-sidehead{position:fixed!important;top:34px;left:0;bottom:0;right:auto!important;width:240px;flex-direction:column!important;align-items:flex-start!important;justify-content:flex-start!important;padding:36px 28px!important;border-bottom:0!important;border-right:1px solid rgba(128,128,128,.25);gap:36px!important}.ps header.pg-sidehead .pg-nav{flex-direction:column;align-items:flex-start;gap:14px}.ps header.pg-sidehead .pg-nav .pg-link{font-size:17px}}.ps .pg-logo{white-space:nowrap}@media(max-width:560px){.ps .pg-logo{font-size:20px!important}.ps .pg-cta{padding:8px 12px!important;font-size:12px!important}}`;

function useNavItems(cfg: SiteConfig, id: string): [string, string][] {
  const b = BUILDERS[id];
  return [cfg.nav[0]!, cfg.nav[1]!, ["gallery", "Galeria"], ...(b ? ([["builder", b.title.split(" ").slice(0, 2).join(" ")]] as [string, string][]) : []), cfg.nav[2]!, cfg.nav[3]!];
}

export function Frame({ model, name, client, page, setPage, home, children }: { model: PremiumModel; name: string; client: ModelClient; page: string; setPage: (p: string) => void; home: boolean; children: ReactNode }) {
  const cfg = CONFIG[model.id]!; const th = cfg.theme; const [open, setOpen] = useState(false);
  const items = useNavItems(cfg, model.id); const side = ["navalha-real","grao-dourado","studio-fio","silva-lima"].includes(model.id);
  const overlay = cfg.header === "overlay" && home && !side; const center = cfg.header === "center" && !side;
  const go = (p: string) => { setPage(p); setOpen(false); };
  const link = (p: string, l: string) => <button key={p} className="pg-link" data-on={page === p ? 1 : 0} onClick={() => go(p)}>{l}</button>;
  const bar: CSSProperties = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "18px 5vw", background: overlay ? "transparent" : (th.navBg ?? th.bg), color: overlay ? (th.navFg ?? "#fff") : (th.navFg ?? th.fg), position: overlay ? "absolute" : "sticky", top: 0, left: 0, right: 0, zIndex: 30, borderBottom: overlay ? "0" : `1px solid ${th.fg}22`, fontSize: 14, fontFamily: "Inter,sans-serif", flexDirection: center ? "column" : "row" };
  const logo = <b className="pg-logo" style={{ fontFamily: th.heading, fontSize: 26, letterSpacing: 0.5, cursor: "pointer" }} onClick={() => go("home")}>{name}</b>;
  const cta = <a className="pg-cta" href={waLink(client, `Olá! Vim pelo site da ${name}.`)} style={{ background: th.accent, color: th.onAccent, padding: "10px 20px", borderRadius: th.radius > 12 ? 99 : th.radius, fontWeight: 700, fontSize: 13, whiteSpace: "nowrap" }}>{cfg.cta}</a>;
  return <div style={{ background: th.bg, color: th.fg, position: "relative", minHeight: "100vh" }}>
    <style>{CSS}</style>
    <header className={side ? "pg-sidehead" : ""} style={bar}>
      {center ? <><div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}><span className="pg-hide-m" style={{ width: 120 }} />{logo}<span style={{ display: "flex", gap: 10, alignItems: "center" }}>{cta}<button className="pg-burger" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></span></div><nav className="pg-nav" style={{ gap: 28 }}>{items.map(([p, l]) => link(p, l))}</nav></>
        : <>{logo}<nav className="pg-nav">{items.map(([p, l]) => link(p, l))}</nav><span style={{ display: "flex", gap: 10, alignItems: "center" }}>{cta}<button className="pg-burger" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></span></>}
    </header>
    {open && <div className="pg-menu-m" style={{ position: "fixed", inset: "0 0 0 0", top: 0, zIndex: 60, background: th.bg, color: th.fg, padding: 24, display: "flex", flexDirection: "column", gap: 4 }}><button aria-label="Fechar" onClick={() => setOpen(false)} style={{ alignSelf: "flex-end", background: "none", border: 0, color: "inherit" }}><X size={28} /></button>{items.map(([p, l]) => <button key={p} onClick={() => go(p)} style={{ background: "none", border: 0, color: "inherit", textAlign: "left", fontFamily: th.heading, fontSize: 32, padding: "10px 0", opacity: page === p ? 1 : 0.7 }}>{l}</button>)}<div style={{ marginTop: 20 }}>{cta}</div></div>}
    <div className={side ? "pg-sidemain" : ""}>{children}
    <Footer model={model} name={name} client={client} setPage={setPage} cfg={cfg} /></div>
    <a aria-label="Falar no WhatsApp" href={waLink(client, `Olá! Vim pelo site da ${name}.`)} style={{ position: "fixed", right: 16, bottom: 16, zIndex: 40, width: 60, height: 60, borderRadius: "50%", background: "#25D366", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(0,0,0,.35)" }} data-float><MessageCircle size={30} /></a>
  </div>;
}

function Footer({ name, client, cfg, model, setPage }: { name: string; client: ModelClient; cfg: SiteConfig; model: PremiumModel; setPage: (p: string) => void }) {
  const th = cfg.theme; const city = client.city?.trim() || model.city;
  return <footer style={{ background: "#000", color: "#ddd", padding: "56px 6vw 40px", fontFamily: "Inter,sans-serif", fontSize: 14 }}>
    <div className="pg-grid pg-two" style={{ gridTemplateColumns: "1.4fr 1fr 1fr", gap: 40 }}>
      <div><b style={{ fontFamily: th.heading, fontSize: 28, color: "#fff" }}>{name}</b><p style={{ opacity: 0.7, marginTop: 10, maxWidth: 320, lineHeight: 1.6 }}>{cfg.listIntro}</p></div>
      <div><b style={{ color: "#fff" }}>Contato</b><p style={{ marginTop: 10, lineHeight: 1.9 }}><a href={waLink(client)} >WhatsApp {phoneText(client)}</a><br />{cfg.street}, {city}<br />@{insta(name)}</p></div>
      <div><b style={{ color: "#fff" }}>Horários</b><p style={{ marginTop: 10, lineHeight: 1.9 }}>{cfg.hours.map((h) => <span key={h}>{h}<br /></span>)}</p></div>
    </div>
    <p style={{ marginTop: 30, opacity: 0.5, fontSize: 12 }}>Modelo ilustrativo · Fotos Unsplash · feito com SemSite</p>
  </footer>;
}

const Wrap = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => <div className="pg-pad" style={{ padding: "64px 6vw 88px", fontFamily: "Inter,sans-serif", ...style }}><div className="pg-wrap">{children}</div></div>;
const H = ({ cfg, children, sub }: { cfg: SiteConfig; children: ReactNode; sub?: string }) => <div style={{ marginBottom: 36 }}><h1 style={{ fontFamily: cfg.theme.heading, fontSize: "clamp(40px,6vw,76px)", lineHeight: 1, fontWeight: cfg.theme.heading.startsWith("Inter") ? 800 : 500, letterSpacing: -1 }}>{children}</h1>{sub && <p style={{ color: cfg.theme.muted, marginTop: 12, maxWidth: 520, lineHeight: 1.6 }}>{sub}</p>}</div>;
const Rs = (v: string) => <b style={{ whiteSpace: "nowrap" }}>R$ {v}</b>;

export function ListPage({ model, client }: { model: PremiumModel; client: ModelClient }) {
  const cfg = CONFIG[model.id]!; const th = cfg.theme; const k = cfg.listKind; const order = (t: string) => waLink(client, `Olá! Quero pedir: ${t}`);
  return <Wrap><H cfg={cfg} sub={cfg.listIntro}>{cfg.listTitle}</H>
    {k === "cards" && <div className="pg-grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,260px),1fr))" }}>{cfg.items.map((it) => <div key={it.t} style={{ background: th.card, borderRadius: th.radius, overflow: "hidden" }}>{it.img && <img src={img(it.img, 700, 480)} alt="" loading="lazy" style={{ width: "100%", height: 200, objectFit: "cover" }} />}<div style={{ padding: 20 }}><div style={{ display: "flex", justifyContent: "space-between", gap: 10, fontWeight: 800, fontSize: 18 }}><span>{it.t}</span>{it.p && Rs(it.p)}</div><p style={{ color: th.muted, margin: "8px 0 16px", fontSize: 14, lineHeight: 1.5 }}>{it.d}</p><a href={order(it.t)} style={{ background: th.accent, color: th.onAccent, padding: "9px 18px", borderRadius: 99, fontWeight: 700, fontSize: 13 }}>Pedir</a></div></div>)}</div>}
    {k === "rows" && <div className="pg-grid pg-two" style={{ gridTemplateColumns: "1fr 1fr", gap: "8px 56px" }}>{cfg.items.map((it) => <a key={it.t} href={order(it.t)} style={{ display: "block", padding: "20px 0", borderBottom: `1px solid ${th.fg}22` }}><div style={{ display: "flex", justifyContent: "space-between", fontFamily: th.heading, fontSize: 24 }}><span>{it.t}</span><span style={{ color: th.accent }}>{it.p && `R$ ${it.p}`}</span></div><p style={{ color: th.muted, marginTop: 6, fontSize: 14 }}>{it.d}</p></a>)}</div>}
    {k === "table" && <div style={{ maxWidth: 760 }}>{cfg.items.map((it) => <a key={it.t} href={order(it.t)} style={{ display: "flex", alignItems: "baseline", gap: 14, padding: "18px 0", borderBottom: `1px dashed ${th.accent}55` }}><span style={{ fontSize: 20 }}>{it.t}<small style={{ display: "block", color: th.muted, fontSize: 13, marginTop: 3 }}>{it.d}</small></span><i style={{ flex: 1 }} /><b style={{ color: th.accent, fontFamily: th.heading, fontSize: 22 }}>R$ {it.p}</b></a>)}</div>}
    {k === "tiles" && <div className="pg-grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,280px),1fr))" }}>{cfg.items.map((it, i) => <div key={it.t} style={{ background: th.card, borderRadius: th.radius, padding: 28, borderTop: `4px solid ${th.accent}` }}><small style={{ color: th.accent, fontWeight: 800 }}>{String(i + 1).padStart(2, "0")}</small><p style={{ fontFamily: th.heading, fontSize: 26, margin: "6px 0 8px" }}>{it.t}</p><p style={{ color: th.muted, fontSize: 14, lineHeight: 1.6 }}>{it.d}</p>{it.p && <p style={{ color: th.accent, fontWeight: 800, marginTop: 14, fontSize: 20 }}>a partir de R$ {it.p}</p>}<a href={order(it.t)} style={{ display: "inline-block", marginTop: 16, background: th.accent, color: th.onAccent, padding: "9px 18px", borderRadius: th.radius > 12 ? 99 : th.radius, fontWeight: 700, fontSize: 13 }}>Quero esse</a></div>)}</div>}
  </Wrap>;
}

export function GalleryPage({ model }: { model: PremiumModel; client: ModelClient }) {
  const cfg = CONFIG[model.id]!; const imgs = GALLERY[model.id] ?? []; const v = model.id.length % 3; const [big, setBig] = useState<string | null>(null);
  const shape = (i: number): CSSProperties => v === 0 ? { gridColumn: i === 0 ? "span 2" : "auto", gridRow: i === 0 ? "span 2" : "auto" } : v === 1 ? { gridRow: i % 3 === 0 ? "span 2" : "auto" } : { gridColumn: i % 5 === 0 ? "span 2" : "auto" };
  return <Wrap><H cfg={cfg} sub="Um pouco do nosso dia a dia.">Galeria</H>
    <div className="pg-grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,220px),1fr))", gridAutoRows: 200 }}>{imgs.map((p, i) => <button key={i} onClick={() => setBig(p)} style={{ ...shape(i), border: 0, padding: 0, overflow: "hidden", borderRadius: cfg.theme.radius, cursor: "zoom-in", background: cfg.theme.card }}><img src={img(p, 800, 800)} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", filter: i % 2 ? "saturate(1.1)" : "none" }} /></button>)}</div>
    {big && <div onClick={() => setBig(null)} style={{ position: "fixed", inset: 0, zIndex: 80, background: "rgba(0,0,0,.88)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, cursor: "zoom-out" }}><img src={img(big, 1600)} alt="" style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: 12 }} /></div>}
  </Wrap>;
}

export function BuilderPage({ model, client, name }: { model: PremiumModel; client: ModelClient; name: string }) {
  const cfg = CONFIG[model.id]!; const th = cfg.theme; const b = BUILDERS[model.id]!;
  const [sel, setSel] = useState<Record<string, string[]>>(() => Object.fromEntries(b.groups.map((g) => [g.label, g.multi ? [] : [g.opts[0]![0]]])));
  const toggle = (g: string, o: string, multi?: boolean) => setSel((s) => ({ ...s, [g]: multi ? (s[g]!.includes(o) ? s[g]!.filter((x) => x !== o) : [...s[g]!, o]) : [o] }));
  const total = b.groups.reduce((a, g) => a + g.opts.filter(([o]) => sel[g.label]!.includes(o)).reduce((x, [, p]) => x + p, 0), 0);
  const text = `Olá! Vim pelo site da ${name}.\n${b.groups.map((g) => `${g.label}: ${sel[g.label]!.join(", ") || "nenhum"}`).join("\n")}${b.showTotal ? `\nTotal estimado: R$ ${total.toFixed(2).replace(".", ",")}` : ""}`;
  return <Wrap><H cfg={cfg} sub={b.intro}>{b.title}</H>
    <div className="pg-grid pg-two" style={{ gridTemplateColumns: "1.6fr 1fr", alignItems: "start", gap: 32 }}>
      <div>{b.groups.map((g) => <div key={g.label} style={{ marginBottom: 28 }}><p style={{ fontWeight: 800, letterSpacing: 1, fontSize: 12, color: th.muted, marginBottom: 12 }}>{g.label.toUpperCase()}{g.multi ? " (VÁRIOS)" : ""}</p><div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>{g.opts.map(([o, p]) => { const on = sel[g.label]!.includes(o); return <button key={o} onClick={() => toggle(g.label, o, g.multi)} style={{ border: `2px solid ${on ? th.accent : th.fg + "33"}`, background: on ? th.accent : "transparent", color: on ? th.onAccent : th.fg, padding: "11px 18px", borderRadius: th.radius > 12 ? 99 : th.radius, fontWeight: 700, cursor: "pointer", fontSize: 14, transition: "all .2s" }}>{o}{p > 0 && b.showTotal ? ` · +R$ ${p}` : ""}</button>; })}</div></div>)}</div>
      <aside style={{ background: th.card, borderRadius: th.radius, padding: 28, position: "sticky", top: 90 }}><p style={{ fontFamily: th.heading, fontSize: 26, marginBottom: 14 }}>Seu pedido</p>{b.groups.map((g) => <p key={g.label} style={{ fontSize: 14, padding: "7px 0", borderBottom: `1px solid ${th.fg}15`, color: th.muted }}><b style={{ color: th.fg }}>{g.label}:</b> {sel[g.label]!.join(", ") || "—"}</p>)}{b.showTotal && <p style={{ fontFamily: th.heading, fontSize: 42, color: th.accent, margin: "18px 0 6px" }}>R$ {total.toFixed(2).replace(".", ",")}</p>}<a href={waLink(client, text)} style={{ display: "block", textAlign: "center", marginTop: 14, background: "#25D366", color: "#fff", padding: "14px", borderRadius: 99, fontWeight: 800 }}>{b.cta} no WhatsApp</a></aside>
    </div></Wrap>;
}

export function AboutPage({ model, client }: { model: PremiumModel; client: ModelClient }) {
  const cfg = CONFIG[model.id]!; const th = cfg.theme; const [open, setOpen] = useState<number | null>(0);
  return <Wrap><div className="pg-grid pg-two" style={{ gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}><div><H cfg={cfg}>{cfg.aboutTitle}</H>{cfg.aboutText.map((t) => <p key={t} style={{ color: th.muted, lineHeight: 1.8, marginBottom: 14, fontSize: 17 }}>{t}</p>)}<a href={waLink(client)} style={{ display: "inline-block", marginTop: 12, background: th.accent, color: th.onAccent, padding: "13px 26px", borderRadius: th.radius > 12 ? 99 : th.radius, fontWeight: 800 }}>{cfg.cta}</a></div><img src={img(cfg.aboutImg, 1000, 1100)} alt="" loading="lazy" style={{ width: "100%", height: 460, objectFit: "cover", borderRadius: th.radius }} /></div>
    <div className="pg-grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", margin: "64px 0", textAlign: "center" }}>{cfg.facts.map(([a, b]) => <div key={b} style={{ background: th.card, borderRadius: th.radius, padding: 28 }}><div style={{ fontFamily: th.heading, fontSize: 52, color: th.accent, lineHeight: 1 }}>{a}</div><div style={{ color: th.muted, marginTop: 8 }}>{b}</div></div>)}</div>
    <h2 style={{ fontFamily: th.heading, fontSize: 38, marginBottom: 20 }}>O que dizem os clientes</h2><div className="pg-grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))", marginBottom: 64 }}>{REVIEWS.map(([t, n]) => <div key={n} style={{ background: th.card, borderRadius: th.radius, padding: 24 }}><div style={{ color: th.accent, letterSpacing: 2 }}>★★★★★</div><p style={{ margin: "10px 0 14px", lineHeight: 1.6 }}>{t}</p><b style={{ fontSize: 13 }}>{n}</b></div>)}</div>
    <h2 style={{ fontFamily: th.heading, fontSize: 38, marginBottom: 20 }}>Perguntas frequentes</h2><div style={{ maxWidth: 760 }}>{FAQ.map(([q, a], i) => <div key={q} style={{ borderBottom: `1px solid ${th.fg}22` }}><button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", textAlign: "left", background: "none", border: 0, color: "inherit", padding: "18px 0", fontWeight: 700, fontSize: 17, display: "flex", justifyContent: "space-between", cursor: "pointer" }}>{q}<span style={{ color: th.accent }}>{open === i ? "−" : "+"}</span></button>{open === i && <p style={{ color: th.muted, paddingBottom: 18, lineHeight: 1.6 }}>{a}</p>}</div>)}</div></Wrap>;
}

export function ContactPage({ model, client, name }: { model: PremiumModel; client: ModelClient; name: string }) {
  const cfg = CONFIG[model.id]!; const th = cfg.theme; const city = client.city?.trim() || model.city; const addr = `${cfg.street}, ${city}`;
  const row = (icon: ReactNode, t: string, d: ReactNode, href?: string) => <a href={href} style={{ display: "flex", gap: 16, alignItems: "flex-start", background: th.card, borderRadius: th.radius, padding: 20 }}><span style={{ color: th.accent, marginTop: 2 }}>{icon}</span><span><b style={{ display: "block" }}>{t}</b><span style={{ color: th.muted, lineHeight: 1.7 }}>{d}</span></span></a>;
  return <Wrap><H cfg={cfg} sub="Chame no WhatsApp ou venha até a gente.">{cfg.contactTitle}</H>
    <div className="pg-grid pg-two" style={{ gridTemplateColumns: "1fr 1.3fr", gap: 32 }}><div className="pg-grid">
      {row(<MessageCircle />, "WhatsApp", phoneText(client), waLink(client, `Olá! Vim pelo site da ${name}.`))}
      {row(<Phone />, "Telefone", phoneText(client), `tel:+${digits(client.whatsapp) || PLACEHOLDER_WA}`)}
      {row(<Instagram />, "Instagram", `@${insta(name)}`, `https://instagram.com/${insta(name)}`)}
      {row(<MapPin />, "Endereço", addr, `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addr)}`)}
      {row(<Clock />, "Horários", cfg.hours.map((h) => <span key={h}>{h}<br /></span>))}
    </div><iframe title="Mapa" loading="lazy" src={`https://www.google.com/maps?q=${encodeURIComponent(addr)}&output=embed`} style={{ border: 0, width: "100%", minHeight: 420, borderRadius: th.radius, background: th.card }} /></div></Wrap>;
}

const hash = (id: string) => Array.from(id).reduce((a, c) => a + c.charCodeAt(0), 0);
const STATS: Record<string, [string, string][]> = {};
export function HomeExtras({ model, client, name }: { model: PremiumModel; client: ModelClient; name: string }) {
  const cfg = CONFIG[model.id]!; const th = cfg.theme; const h = hash(model.id); const imgs = GALLERY[model.id] ?? [];
  const [rv, setRv] = useState(0); const [sent, setSent] = useState(false); const b = BUILDERS[model.id];
  const form = { n: "", t: "", s: b?.groups[0]?.opts[0]?.[0] ?? "", d: "" }; const [f, setF] = useState(form);
  const stats = <div data-rv className="pg-grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", margin: "0 auto", maxWidth: 1180, background: h % 2 ? th.card : "transparent", border: h % 2 ? 0 : `1px solid ${th.fg}22`, borderRadius: th.radius, padding: "28px 24px", textAlign: "center" }}>{cfg.facts.map(([a, l]) => <div key={l}><div style={{ fontFamily: th.heading, fontSize: 46, color: th.accent, lineHeight: 1 }}>{a}</div><div style={{ color: th.muted, fontSize: 13, marginTop: 6 }}>{l}</div></div>)}</div>;
  const gallery = <div data-rv style={{ maxWidth: 1180, margin: "0 auto" }}><h2 style={{ fontFamily: th.heading, fontSize: 38, marginBottom: 20 }}>Por dentro</h2><div className="pg-grid" style={{ gridTemplateColumns: h % 3 === 0 ? "2fr 1fr 1fr" : h % 3 === 1 ? "1fr 2fr 1fr" : "repeat(4,1fr)", gridAutoRows: 190, gap: 12 }}>{imgs.slice(0, h % 3 === 2 ? 4 : 5).map((p, i) => <img key={i} src={img(p, 700, 700)} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: th.radius, gridRow: i === 0 && h % 3 !== 2 ? "span 2" : "auto" }} />)}</div></div>;
  const r = REVIEWS[rv]!;
  const reviews = <div data-rv style={{ maxWidth: 1180, margin: "0 auto" }}><h2 style={{ fontFamily: th.heading, fontSize: 38, marginBottom: 20 }}>O que dizem</h2>{h % 2 ? <div style={{ background: th.card, borderRadius: th.radius, padding: "32px 28px", maxWidth: 760 }}><div style={{ color: th.accent, letterSpacing: 3 }}>★★★★★ <small style={{ color: th.muted }}>5,0</small></div><p style={{ fontSize: 22, lineHeight: 1.5, margin: "14px 0" }}>“{r[0]}”</p><b>{r[1]}</b><div style={{ display: "flex", gap: 8, marginTop: 18 }}>{REVIEWS.map((_, i) => <button key={i} aria-label={`Depoimento ${i + 1}`} onClick={() => setRv(i)} style={{ width: i === rv ? 28 : 10, height: 10, borderRadius: 9, border: 0, background: i === rv ? th.accent : th.fg + "33", cursor: "pointer", transition: "all .3s" }} />)}</div></div> : <div className="pg-grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,250px),1fr))" }}>{REVIEWS.map(([t, n]) => <div key={n} style={{ background: th.card, borderRadius: th.radius, padding: 24 }}><div style={{ color: th.accent, letterSpacing: 2 }}>★★★★★</div><p style={{ margin: "10px 0 14px", lineHeight: 1.6 }}>{t}</p><b style={{ fontSize: 13 }}>{n}</b></div>)}</div>}</div>;
  const inp: CSSProperties = { width: "100%", padding: "14px 16px", borderRadius: Math.min(th.radius, 12), border: `1px solid ${th.fg}33`, background: th.bg, color: th.fg, font: "inherit" };
  const formEl = <div data-rv className="pg-grid pg-two" style={{ maxWidth: 1180, margin: "0 auto", gridTemplateColumns: "1fr 1fr", gap: 32, background: th.card, borderRadius: th.radius, padding: "40px 32px", alignItems: "center" }}><div><p style={{ color: th.accent, fontWeight: 800, letterSpacing: 2, fontSize: 12 }}>{b ? "ENVIE SEU PEDIDO" : "FALE COM A GENTE"}</p><h2 style={{ fontFamily: th.heading, fontSize: 40, lineHeight: 1.05, margin: "10px 0" }}>{cfg.contactTitle}</h2><p style={{ color: th.muted, lineHeight: 1.6 }}>Preencha e a gente responde rapidinho. {cfg.hours[0]}.</p></div>
    {sent ? <div style={{ textAlign: "center", padding: 20 }}><div style={{ fontSize: 44 }}>✓</div><p style={{ fontFamily: th.heading, fontSize: 26 }}>Recebemos, {f.n.split(" ")[0] || "obrigado"}!</p><p style={{ color: th.muted }}>Retornamos em breve (modelo ilustrativo).</p></div>
    : <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: "grid", gap: 12 }}><input required placeholder="Seu nome" value={f.n} onChange={(e) => setF({ ...f, n: e.target.value })} style={inp} /><input required placeholder="Telefone" inputMode="tel" value={f.t} onChange={(e) => setF({ ...f, t: e.target.value })} style={inp} />{b && <select value={f.s} onChange={(e) => setF({ ...f, s: e.target.value })} style={inp}>{b.groups[0]!.opts.map(([o]) => <option key={o}>{o}</option>)}</select>}<input type="date" value={f.d} onChange={(e) => setF({ ...f, d: e.target.value })} style={inp} /><button style={{ background: th.accent, color: th.onAccent, border: 0, padding: 15, borderRadius: Math.min(th.radius, 99), fontWeight: 800, fontSize: 15, cursor: "pointer" }}>{cfg.cta}</button></form>}</div>;
  const all = [stats, gallery, reviews, formEl]; const order = [[0, 1, 2, 3], [1, 0, 3, 2], [0, 2, 1, 3], [2, 0, 1, 3]][h % 4]!;
  return <div className="pg-pad" style={{ padding: "24px 6vw 80px", display: "grid", gridTemplateColumns: "minmax(0,1fr)", gap: 72, fontFamily: "Inter,sans-serif", background: th.bg, color: th.fg }}>{order.map((i) => <div key={i}>{all[i]}</div>)}</div>;
}
