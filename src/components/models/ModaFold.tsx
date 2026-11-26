import { useEffect, useState } from "react";

/** Loja de roupas autoral nova, construida a partir de um pin preto com titulo gigante em branco, fotos P&B e secao New in. Sacola com tamanho que fecha no WhatsApp. */
const BK = "#0c0c0c", WH = "#f4f2ee", GR = "#b8b8b3", LN = "rgba(244,242,238,.22)";
const ITEMS = [
  { n: "Blazer Alfaiataria", p: 689, img: "/roupa-p1.webp", c: "Alfaiataria" },
  { n: "Camisa Oversized", p: 359, img: "/roupa-p2.webp", c: "Básicos" },
  { n: "Calça Pantalona Lã", p: 529, img: "/roupa-p3.webp", c: "Alfaiataria" },
  { n: "Cardigan Longo", p: 599, img: "/roupa-p4.webp", c: "Tricô" },
];
const SIZES = ["P", "M", "G", "GG"];
const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const Plus = ({ s = 22 }: { s?: number }) => (<svg width={s} height={s} viewBox="0 0 24 24" stroke={WH} strokeWidth="1.2" aria-hidden><path d="M12 1v22M1 12h22" /></svg>);

export function ModaFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Alto Corte";
  const city = client?.city?.trim() || "São Paulo";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [bag, setBag] = useState<{ i: number; s: string; q: number }[]>([]);
  const [size, setSize] = useState<Record<number, string>>({});
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [name, setName] = useState("");
  const [added, setAdded] = useState<number | null>(null);
  const [filter, setFilter] = useState("Tudo");
  const [sc, setSc] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 700); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const add = (i: number) => { const s = size[i] ?? "M"; setBag((b) => { const k = b.findIndex((x) => x.i === i && x.s === s); if (k >= 0) return b.map((x, j) => (j === k ? { ...x, q: x.q + 1 } : x)); return [...b, { i, s, q: 1 }]; }); setAdded(i); setTimeout(() => setAdded(null), 1200); };
  const qty = (k: number, d: number) => setBag((b) => b.map((x, j) => (j === k ? { ...x, q: x.q + d } : x)).filter((x) => x.q > 0));
  const count = bag.reduce((a, x) => a + x.q, 0);
  const total = bag.reduce((a, x) => a + x.q * ITEMS[x.i]!.p, 0);
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero comprar na ${brand}: ${bag.map((x) => `${x.q}x ${ITEMS[x.i]!.n} (${x.s})`).join(", ")}. Total ${brl(total)}.${name ? ` Em nome de ${name}.` : ""}`)}`;
  const cats = ["Tudo", "Alfaiataria", "Básicos", "Tricô"];

  return (
    <div className="mo" style={{ fontFamily: "Manrope, system-ui, sans-serif", color: WH, background: BK, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;800;900&family=Manrope:wght@400;500;600;700&display=swap');
        .mo *{box-sizing:border-box}.mo a,.mo button,.mo input{font-family:inherit}
        .mo .wrap{max-width:1240px;margin:0 auto;padding:0 28px}
        .mo .ar{font-family:Archivo,system-ui,sans-serif;font-weight:800;text-transform:uppercase;letter-spacing:-.02em;line-height:.9}
        .mo .nav{display:flex;align-items:center;justify-content:space-between;height:76px;font-size:12.5px;letter-spacing:2.5px;text-transform:uppercase;font-weight:600}
        .mo .nav .l,.mo .nav .r{display:flex;gap:30px;align-items:center;flex:1}.mo .nav .r{justify-content:flex-end}.mo .nav a{cursor:pointer}
        .mo .nav .logo{font-family:Archivo,sans-serif;font-weight:800;font-size:15px;letter-spacing:4px;text-align:center}
        .mo .bagb{position:relative;background:none;border:0;color:${WH};cursor:pointer;font-size:12.5px;letter-spacing:2.5px;text-transform:uppercase;font-weight:600;min-height:44px;padding:0 4px}
        .mo .burger{display:none;background:none;border:0;width:44px;height:44px;cursor:pointer}
        .mo .btn{background:${WH};color:${BK};border:0;padding:0 34px;min-height:54px;font-weight:700;font-size:12.5px;letter-spacing:3px;text-transform:uppercase;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:10px;text-decoration:none}
        .mo .btn.o{background:transparent;color:${WH};border:1px solid ${WH}}
        .mo .hero{position:relative;padding:20px 28px 90px}
        .mo .hero h1{font-size:clamp(70px,13.6vw,190px);margin:0;position:relative;z-index:2}
        .mo .hero .ph{position:absolute;right:28px;top:-10px;width:min(30%,330px);z-index:1}
        .mo .hero .ph img{width:100%;aspect-ratio:3/4;object-fit:cover;display:block;filter:grayscale(1)}
        .mo .hero .tx{display:flex;gap:60px;margin-top:36px;align-items:flex-start;flex-wrap:wrap}
        .mo .hero p{font-size:16px;line-height:1.7;color:${GR};max-width:380px;margin:0 0 26px}
        .mo .stm{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center;padding:60px 28px 90px;position:relative}
        .mo .stm h2{font-size:clamp(54px,9vw,128px);margin:0}
        .mo .stm .ph{display:flex;gap:18px;justify-content:flex-end}
        .mo .stm .ph img{width:44%;aspect-ratio:3/4;object-fit:cover;display:block;filter:grayscale(1)}.mo .stm .ph img:last-child{margin-top:60px}
        .mo .stm .pl{position:absolute;left:46%;top:30px}.mo .stm .pl2{position:absolute;left:4%;bottom:40px}
        .mo .sec{border-top:1px solid ${LN};padding:80px 0}
        .mo .head{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;flex-wrap:wrap;margin-bottom:40px}
        .mo h2.t{font-size:clamp(40px,6vw,76px);margin:0}
        .mo .tabs{display:flex;gap:6px;flex-wrap:wrap}
        .mo .tab{background:none;border:1px solid transparent;color:${GR};padding:0 16px;min-height:44px;font-size:12.5px;letter-spacing:2.5px;text-transform:uppercase;cursor:pointer;font-weight:600}
        .mo .tab.on{border-color:${WH};color:${WH}}
        .mo .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:26px}
        .mo .pc .im{background:#d9d9d6;aspect-ratio:3/4;overflow:hidden}.mo .pc img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s}.mo .pc:hover img{transform:scale(1.04)}
        .mo .pc h3{font-family:Archivo,sans-serif;font-weight:700;font-size:15px;letter-spacing:1px;text-transform:uppercase;margin:16px 0 4px}
        .mo .pc .pr{color:${GR};font-size:15px}
        .mo .sz{display:flex;gap:6px;margin:12px 0}.mo .sz button{min-width:44px;min-height:44px;border:1px solid ${LN};background:none;color:${WH};font-size:14px;font-weight:600;cursor:pointer}.mo .sz button.on{background:${WH};color:${BK};border-color:${WH}}
        .mo .pc .ad{width:100%;background:none;border:1px solid ${WH};color:${WH};min-height:48px;font-size:12px;letter-spacing:3px;text-transform:uppercase;font-weight:700;cursor:pointer}
        .mo .pc .ad:hover{background:${WH};color:${BK}}
        .mo .col{display:grid;grid-template-columns:1.5fr 1fr;gap:50px;align-items:center}
        .mo .col img{width:100%;aspect-ratio:16/9;object-fit:cover;display:block;filter:grayscale(1)}
        .mo .col p{color:${GR};font-size:16px;line-height:1.75;margin:20px 0 28px}
        .mo .big{font-size:clamp(60px,12vw,170px);text-align:center;margin:0;padding:30px 0 10px;color:${WH}}
        .mo footer{border-top:1px solid ${LN};padding:60px 0 40px}
        .mo .fg{display:grid;grid-template-columns:1.4fr 1fr 1fr 1.4fr;gap:40px}
        .mo footer h5{font-size:12px;letter-spacing:3px;text-transform:uppercase;margin:0 0 16px;color:${GR};font-weight:600}
        .mo footer a{display:block;cursor:pointer;font-size:15px;margin-bottom:10px}
        .mo .nl{display:flex;border:1px solid ${LN}}.mo .nl input{flex:1;background:none;border:0;color:${WH};padding:0 14px;min-height:50px;font-size:14.5px;}.mo .nl a{background:${WH};color:${BK};display:grid;place-items:center;padding:0 18px;margin:0}
        .mo .fl{position:fixed;right:18px;bottom:18px;z-index:40;background:${WH};color:${BK};border:0;padding:0 24px;min-height:52px;font-weight:700;font-size:12px;letter-spacing:2.5px;text-transform:uppercase;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,.5)}
        .mo .ov{position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:60}
        .mo .dw{position:fixed;right:0;top:0;bottom:0;width:min(440px,100%);background:#161616;z-index:61;padding:30px 28px;overflow:auto;border-left:1px solid ${LN}}
        .mo .dw h3{font-family:Archivo,sans-serif;font-weight:800;text-transform:uppercase;font-size:30px;margin:0 0 4px}
        .mo .x{position:absolute;right:12px;top:10px;width:44px;height:44px;border:0;background:none;font-size:28px;cursor:pointer;color:${WH}}
        .mo .li{display:flex;gap:14px;align-items:center;padding:14px 0;border-bottom:1px solid ${LN}}.mo .li img{width:56px;height:75px;object-fit:cover}
        .mo .qn{display:inline-flex;align-items:center;gap:10px;border:1px solid ${LN};padding:0 4px;margin-top:6px}.mo .qn button{width:32px;height:32px;border:0;background:none;font-size:18px;cursor:pointer;color:${WH}}
        .mo input.f{width:100%;margin-top:14px;padding:14px 16px;border:1px solid ${LN};font-size:15px;background:#0c0c0c;color:${WH}}
        .mo .mob{display:none}
        @media(max-width:860px){
          .mo .nav .l a,.mo .nav .r a{display:none}.mo .burger{display:block}.mo .nav{height:68px}
          .mo .hero .ph{position:relative;right:auto;top:auto;width:62%;margin:26px 0 0 auto}.mo .hero{padding:20px 20px 60px}.mo .wrap{padding-left:20px;padding-right:20px}
          .mo .stm{grid-template-columns:1fr;padding:40px 20px 60px}.mo .stm .pl,.mo .stm .pl2{display:none}
          .mo .sec{padding:56px 0}.mo .grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:22px 14px}.mo .pc h3{font-size:13px}.mo .sz{gap:3px}.mo .sz button{flex:1;min-width:0}
          .mo .col{grid-template-columns:1fr;gap:26px}.mo .fg{grid-template-columns:1fr 1fr}
          .mo .mob{display:block;border-top:1px solid ${LN};border-bottom:1px solid ${LN};background:#141414}.mo .mob a{display:block;padding:15px 28px;font-size:13px;letter-spacing:2.5px;text-transform:uppercase;cursor:pointer;border-top:1px solid ${LN}}
        }
      `}</style>
      <div className="wrap">
        <div className="nav">
          <div className="l"><a onClick={() => go("novo")}>Novidades</a><a onClick={() => go("colecao")}>Coleção</a></div>
          <div className="logo">{brand}</div>
          <div className="r"><a onClick={() => go("loja")}>A loja</a><button type="button" className="bagb" onClick={() => setOpen(true)} aria-label="Abrir sacola">Sacola ({count})</button>
            <button type="button" className="burger" aria-label="Menu" onClick={() => setMenu((m) => !m)}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={WH} strokeWidth="1.6"><path d="M4 8h16M4 16h16" /></svg></button></div>
        </div>
      </div>
      {menu && <div className="mob"><a onClick={() => go("novo")}>Novidades</a><a onClick={() => go("colecao")}>Coleção</a><a onClick={() => go("loja")}>A loja</a></div>}

      <div className="wrap hero">
        <h1 className="ar">{brand.split(" ").map((w, i) => (<span key={i} style={{ display: "block" }}>{w}</span>))}</h1>
        <div className="ph"><img src="/roupa-hero.webp" alt="Modelo com casaco preto longo" /></div>
        <div className="tx">
          <div><p>Roupa de corte reto, tecido bom e cor que dura mais de uma estação. Feita e vendida em {city}.</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}><button type="button" className="btn" onClick={() => go("novo")}>Ver novidades</button><button type="button" className="btn o" onClick={() => setOpen(true)}>Minha sacola</button></div></div>
          <div style={{ paddingTop: 6 }}><Plus s={30} /></div>
        </div>
      </div>

      <div className="wrap stm">
        <h2 className="ar">Estilo<br />sem<br />pressa.</h2>
        <div className="ph"><img src="/roupa-m2.webp" alt="Modelo com vestido preto de alfaiataria" loading="lazy" /><img src="/roupa-hero.webp" alt="Modelo com casaco preto" loading="lazy" style={{ objectPosition: "50% 20%" }} /></div>
        <span className="pl"><Plus /></span><span className="pl2"><Plus s={30} /></span>
      </div>

      <section className="sec" id="novo"><div className="wrap">
        <div className="head"><h2 className="ar t">Novidades</h2>
          <div className="tabs">{cats.map((c) => (<button key={c} type="button" className={`tab${filter === c ? " on" : ""}`} onClick={() => setFilter(c)}>{c}</button>))}</div></div>
        <div className="grid">
          {ITEMS.map((it, i) => (filter === "Tudo" || it.c === filter) && (
            <div className="pc" key={it.n}>
              <div className="im"><img src={it.img} alt={it.n} loading="lazy" /></div>
              <h3>{it.n}</h3><div className="pr">{brl(it.p)}</div>
              <div className="sz" role="group" aria-label="Tamanho">{SIZES.map((s) => (<button key={s} type="button" className={(size[i] ?? "M") === s ? "on" : ""} onClick={() => setSize((z) => ({ ...z, [i]: s }))}>{s}</button>))}</div>
              <button type="button" className="ad" onClick={() => add(i)}>{added === i ? "Na sacola ✓" : "Adicionar"}</button>
            </div>
          ))}
        </div>
      </div></section>

      <section className="sec" id="colecao"><div className="wrap col">
        <img src="/roupa-wide.webp" alt="Dois modelos caminhando com casacos pretos longos" loading="lazy" />
        <div><h2 className="ar t">Coleção<br />Inverno</h2><p>Casacos longos, alfaiataria e tricô em tons neutros. Poucas peças, bem cortadas, que combinam entre si.</p><button type="button" className="btn" onClick={() => go("novo")}>Ver peças</button></div>
      </div></section>

      <section className="sec" id="loja"><div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 40 }}>
        {[["Troca grátis", "Não serviu? Troque em até 30 dias, sem burocracia."], ["Ajuste na casa", "Barra e manga ajustadas pela nossa costureira."], ["Provador em " + city, "Agende um horário e experimente com calma."]].map(([a, b]) => (<div key={a}><Plus /><h3 style={{ fontFamily: "Archivo,sans-serif", textTransform: "uppercase", fontSize: 18, margin: "14px 0 8px", fontWeight: 700 }}>{a}</h3><p style={{ color: GR, fontSize: 15.5, lineHeight: 1.65, margin: 0 }}>{b}</p></div>))}
      </div></section>

      <div className="big ar" aria-hidden>Sempre elegante</div>

      <footer id="contato"><div className="wrap fg">
        <div><div className="logo" style={{ fontFamily: "Archivo,sans-serif", fontWeight: 800, letterSpacing: 4, textTransform: "uppercase" }}>{brand}</div><p style={{ color: GR, fontSize: 14.5, lineHeight: 1.7, marginTop: 14 }}>Rua Oscar Freire, 820, Jardins, {city}.<br />Seg a sáb, 11h às 20h.</p></div>
        <div><h5>Loja</h5><a onClick={() => go("novo")}>Novidades</a><a onClick={() => go("colecao")}>Coleção</a><a onClick={() => setOpen(true)}>Sacola</a></div>
        <div><h5>Ajuda</h5><a onClick={() => go("loja")}>Trocas</a><a onClick={() => go("contato")}>Contato</a></div>
        <div><h5>Lançamentos</h5><div className="nl"><input placeholder="Seu WhatsApp" aria-label="Seu WhatsApp" /><a href={`https://wa.me/${num}?text=${encodeURIComponent("Oi! Quero receber os lançamentos.")}`} target="_blank" rel="noreferrer" aria-label="Enviar">→</a></div><p style={{ color: GR, fontSize: 13.5, marginTop: 14 }}>Instagram @{brand.toLowerCase().replace(/[^a-z]/g, "")}</p></div>
      </div></footer>

      {sc && count === 0 && <button type="button" className="fl" onClick={() => go("novo")}>Ver novidades</button>}
      {sc && count > 0 && <button type="button" className="fl" onClick={() => setOpen(true)}>Sacola · {count} · {brl(total)}</button>}

      {open && (<>
        <div className="ov" onClick={() => setOpen(false)} />
        <aside className="dw" role="dialog" aria-label="Sua sacola">
          <button type="button" className="x" aria-label="Fechar" onClick={() => setOpen(false)}>×</button>
          <h3>Sua sacola</h3>
          <span style={{ color: GR, fontSize: 14 }}>{count === 0 ? "Nada na sacola ainda" : `${count} ${count === 1 ? "peça" : "peças"}`}</span>
          {count === 0 ? (
            <div style={{ margin: "34px 0", textAlign: "center" }}><p style={{ color: GR }}>Escolha uma peça e o tamanho para começar.</p><button type="button" className="btn" onClick={() => { setOpen(false); go("novo"); }}>Ver novidades</button></div>
          ) : (<>
            {bag.map((x, k) => (
              <div className="li" key={`${x.i}-${x.s}`}><img src={ITEMS[x.i]!.img} alt="" />
                <div style={{ flex: 1 }}><b style={{ fontSize: 14.5 }}>{ITEMS[x.i]!.n}</b><div style={{ color: GR, fontSize: 13.5 }}>Tamanho {x.s}</div><div style={{ fontWeight: 700 }}>{brl(ITEMS[x.i]!.p)}</div>
                  <div className="qn"><button type="button" aria-label="Menos" onClick={() => qty(k, -1)}>−</button><span>{x.q}</span><button type="button" aria-label="Mais" onClick={() => qty(k, 1)}>+</button></div></div></div>
            ))}
            <input className="f" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} aria-label="Seu nome" />
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 20, borderTop: `1px solid ${LN}`, paddingTop: 12, marginTop: 20 }}><span>Total</span><span>{brl(total)}</span></div>
            <a className="btn" style={{ width: "100%", marginTop: 16 }} href={wa} target="_blank" rel="noreferrer">Finalizar no WhatsApp</a>
          </>)}
        </aside>
      </>)}
    </div>
  );
}
