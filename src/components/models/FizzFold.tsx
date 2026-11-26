import { useEffect, useState } from "react";

/** Loja de refrigerante e suco gaseificado autoral, construida a partir de um pin claro com lata roxa e verde-limao gigante, titulo condensado azul-marinho, cards de sabores com respingos, faixa de estilo de vida, clube de pontos roxo e cards coloridos. Carrinho que fecha no WhatsApp. */
const PUR = "#6a3bff", NAVY = "#15124f", LIME = "#8fd12f", INK = "#1b1850";
const FLAV = [
  { n: "Uva e Limão", p: 8, c: "#efe6ff", img: "/fizz-uva.webp" },
  { n: "Pêssego e Manga", p: 8, c: "#ffe2d9", img: "/fizz-pessego.webp" },
  { n: "Limão e Kiwi", p: 8, c: "#e7f6cf", img: "/fizz-limao.webp" },
  { n: "Abacaxi e Maracujá", p: 8, c: "#fff0b8", img: "/fizz-abacaxi.webp" },
  { n: "Mirtilo e Yuzu", p: 8, c: "#d8edff", img: "/fizz-mirtilo.webp" },
];
const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 });
const Ic = ({ d, c = PUR }: { d: string; c?: string }) => (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>);

export function FizzFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Fizzo";
  const city = client?.city?.trim() || "Juiz de Fora";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [bag, setBag] = useState<{ i: number; q: number }[]>([]);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [name, setName] = useState("");
  const [added, setAdded] = useState<number | null>(null);
  const [sc, setSc] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 700); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const add = (i: number) => { setBag((b) => { const k = b.findIndex((x) => x.i === i); if (k >= 0) return b.map((x, j) => (j === k ? { ...x, q: x.q + 1 } : x)); return [...b, { i, q: 1 }]; }); setAdded(i); setTimeout(() => setAdded(null), 1200); };
  const qty = (k: number, d: number) => setBag((b) => b.map((x, j) => (j === k ? { ...x, q: x.q + d } : x)).filter((x) => x.q > 0));
  const count = bag.reduce((a, x) => a + x.q, 0);
  const total = bag.reduce((a, x) => a + x.q * FLAV[x.i]!.p, 0);
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero pedir na ${brand}: ${bag.map((x) => `${x.q}x ${FLAV[x.i]!.n}`).join(", ")}. Total ${brl(total)}.${name ? ` Em nome de ${name}.` : ""}`)}`;

  return (
    <div className="fz" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: INK, background: "#f6f3ff", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600&family=Unbounded:wght@600&display=swap');
        .fz *{box-sizing:border-box}.fz h1,.fz h2,.fz h3,.fz h4,.fz h5{font-family:'Bebas Neue',Impact,sans-serif;font-weight:400;font-style:normal;text-transform:uppercase;margin:0}.fz a,.fz button{font-family:inherit}
        .fz .bg{background:radial-gradient(900px 600px at 85% 8%,#ddd0ff 0,transparent 60%),linear-gradient(180deg,#fff 0,#f6f3ff 100%)}
        .fz .nav{max-width:1180px;margin:0 auto;display:flex;align-items:center;gap:40px;padding:26px 28px}
        .fz .logo{font-family:'Unbounded',sans-serif;font-weight:600;font-size:30px;color:${PUR};letter-spacing:-.04em;line-height:1}
        .fz .nav .m{display:flex;gap:30px;margin-left:auto;font-weight:500;font-size:14px}.fz .nav .m a{cursor:pointer}
        .fz .ib{background:none;border:0;cursor:pointer;position:relative;display:grid;place-items:center;width:40px;height:40px;color:${NAVY}}
        .fz .ib i{position:absolute;top:2px;right:0;background:${PUR};color:#fff;font-style:normal;font-size:10px;font-weight:600;min-width:17px;height:17px;border-radius:99px;display:grid;place-items:center}
        .fz .burger{display:none}
        .fz .hg{max-width:1180px;margin:0 auto;padding:0 28px;display:grid;grid-template-columns:1fr 1.05fr;align-items:center;min-height:520px}
        .fz h1{font-size:clamp(66px,8.2vw,112px);line-height:.9;letter-spacing:.005em;color:${NAVY};text-wrap:balance}
        .fz .hg p{font-size:16px;line-height:1.55;max-width:340px;margin:22px 0 28px;font-weight:400}
        .fz .ben{display:flex;gap:30px;margin-bottom:34px}.fz .ben div{display:flex;flex-direction:column;gap:6px;font-size:10.5px;font-weight:500;letter-spacing:.03em;text-transform:uppercase;line-height:1.3}
        .fz .btn{background:${PUR};color:#fff;border:2px solid ${PUR};border-radius:10px;padding:14px 28px;font-weight:600;font-size:13px;letter-spacing:.04em;text-transform:uppercase;cursor:pointer;text-decoration:none;display:inline-block}.fz .btn.o{background:#fff;color:${PUR};margin-left:12px}
        .fz .can{position:relative;justify-self:end;width:min(100%,620px)}.fz .can img{width:100%;display:block;mix-blend-mode:multiply}
        .fz .badge{position:absolute;right:2%;top:12%;width:96px;height:96px;border-radius:50%;border:1.5px solid ${PUR};display:grid;place-items:center;text-align:center;font-size:9.5px;font-weight:600;line-height:1.25;color:${PUR};text-transform:uppercase;background:rgba(255,255,255,.55)}
        .fz .wrap{max-width:1180px;margin:0 auto;padding:0 28px}
        .fz .panel{background:#fff;border-radius:22px;padding:26px 24px 28px;box-shadow:0 20px 50px rgba(80,50,200,.08)}
        .fz .ph{font-family:'Plus Jakarta Sans',sans-serif;font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;margin:0 0 18px}
        .fz .fl{display:grid;grid-template-columns:repeat(5,1fr);gap:16px}
        .fz .fc{border-radius:16px;overflow:hidden;background:#fff;border:1px solid #ece7ff}.fz .fc .im{aspect-ratio:1;display:grid;place-items:end center;position:relative}.fz .fc .im img{width:100%;height:100%;object-fit:cover;mix-blend-mode:multiply}
        .fz .fc .b{padding:12px 12px 14px;text-align:left}.fz .fc h3{font-family:'Plus Jakarta Sans',sans-serif;text-transform:uppercase;font-size:11.5px;font-weight:600;letter-spacing:.03em;margin:0 0 4px}.fz .fc .pr{font-size:12px;opacity:.7;margin-bottom:10px}
        .fz .fc button{width:100%;background:#fff;color:${PUR};border:1.5px solid ${PUR};border-radius:9px;padding:9px;font-weight:600;font-size:10.5px;letter-spacing:.05em;text-transform:uppercase;cursor:pointer}
        .fz .row{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:20px}
        .fz .why4{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;align-content:center}.fz .why4 div{background:#f6f3ff;border-radius:14px;padding:22px 10px;text-align:center;font-size:11.5px;font-weight:600;line-height:1.3;display:flex;flex-direction:column;align-items:center;gap:10px;text-transform:uppercase}.fz .why4 span{display:block;font-weight:400;opacity:.65;text-transform:none;font-size:11px}
        .fz .vibe{position:relative;border-radius:22px;overflow:hidden;min-height:250px;background:#2a2a6e;color:#fff;display:flex;align-items:center}.fz .vibe img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.fz .vibe:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(10,8,50,.55),transparent 62%)}
        .fz .vibe .t{position:relative;z-index:2;padding:30px}.fz .vibe h2{font-size:clamp(46px,5vw,66px);line-height:.92;margin-bottom:16px}
        .fz .club{background:linear-gradient(140deg,#7c4dff,#4b23d6);color:#fff;border-radius:22px;padding:30px 30px;display:grid;grid-template-columns:.9fr 1.4fr;gap:20px;align-items:center}
        .fz .club h2{font-size:clamp(44px,5vw,64px);line-height:.92}.fz .club p{font-size:13px;opacity:.9;margin:14px 0 0;line-height:1.5}
        .fz .bar{background:rgba(255,255,255,.14);border-radius:14px;padding:18px 18px 16px;font-size:12px;font-weight:600}.fz .bar .tr{height:10px;border-radius:99px;background:rgba(255,255,255,.2);margin:10px 0 12px;overflow:hidden}.fz .bar .tr i{display:block;height:100%;width:60%;background:linear-gradient(90deg,#ffd23c,${LIME});border-radius:99px}
        .fz .perks{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;font-size:10px;text-align:center;font-weight:500;opacity:.95;margin-top:6px}
        .fz .pts{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.fz .pts div{border-radius:18px;padding:22px 16px;color:#fff;text-align:center;min-height:210px;display:flex;flex-direction:column;justify-content:flex-end;align-items:center}
        .fz .pts b{font-family:'Bebas Neue',sans-serif;font-weight:400;font-size:46px;line-height:1}.fz .pts span{font-size:11.5px;opacity:.95;margin-top:4px}
        .fz footer{margin-top:60px;background:${NAVY};color:#fff;padding:48px 0 32px}.fz .fg{display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:30px;font-size:13.5px}.fz .fg h5{font-family:'Plus Jakarta Sans',sans-serif;text-transform:uppercase;font-size:12px;font-weight:600;letter-spacing:.06em;margin-bottom:12px;color:#c9b8ff}.fz .fg a{display:block;margin:8px 0;opacity:.85;cursor:pointer;color:#fff;text-decoration:none}
        .fz .fb{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:30;background:${PUR};color:#fff;border:0;border-radius:99px;padding:14px 26px;font-weight:600;font-size:13px;cursor:pointer;box-shadow:0 10px 30px rgba(40,20,140,.4)}
        .fz .ov{position:fixed;inset:0;background:rgba(10,8,50,.5);z-index:40}.fz .dw{position:fixed;top:0;right:0;bottom:0;width:min(400px,100%);background:#fff;z-index:41;padding:26px;overflow:auto;color:${INK}}
        .fz .dw h3{font-size:34px}.fz .dw .x{position:absolute;top:14px;right:18px;background:none;border:0;font-size:30px;cursor:pointer;color:${INK}}
        .fz .li{display:flex;gap:12px;padding:14px 0;border-bottom:1px solid rgba(0,0,0,.1);align-items:center}.fz .li .th{width:56px;height:56px;border-radius:12px;overflow:hidden;flex:none}.fz .li .th img{width:100%;height:100%;object-fit:cover;mix-blend-mode:multiply}
        .fz .qn{display:inline-flex;align-items:center;gap:10px;margin-top:6px}.fz .qn button{width:30px;height:30px;border-radius:99px;border:1.5px solid ${PUR};background:none;font-size:17px;cursor:pointer;color:${PUR}}
        .fz input.f{width:100%;margin-top:14px;padding:13px 16px;border:1.5px solid ${PUR};border-radius:12px;font-size:15px;background:#fff;color:${INK}}
        .fz .mob{display:none}
        @media(max-width:900px){
          .fz .nav{padding:18px;gap:10px}.fz .nav .m{display:none}.fz .burger{display:grid;margin-left:auto}.fz .nav .ib.cart{margin-left:0}
          .fz .hg{grid-template-columns:1fr;padding:0 20px;min-height:0}.fz .can{justify-self:center;width:112%;margin:-10px -6% 0}
          .fz .ben{gap:18px}.fz .badge{width:76px;height:76px;font-size:8px;top:6%}
          .fz .btn{padding:13px 20px}.fz .btn.o{margin-left:8px}
          .fz .wrap{padding:0 16px}.fz .fl{grid-template-columns:repeat(2,1fr)}.fz .row{grid-template-columns:1fr}.fz .club{grid-template-columns:1fr}.fz .pts{grid-template-columns:1fr 1fr}.fz .pts div{min-height:170px}.fz .fg{grid-template-columns:1fr 1fr}
          .fz .mob{display:block;background:#fff;border-radius:16px;margin:0 16px 10px;box-shadow:0 10px 30px rgba(80,50,200,.12)}.fz .mob a{display:block;padding:14px 20px;font-weight:600;cursor:pointer}
        }
      `}</style>
      <div className="bg">
        <div className="nav">
          <div className="logo">{brand.toLowerCase()}</div>
          <div className="m"><a onClick={() => go("sabores")}>Sabores</a><a onClick={() => go("vibe")}>Estilo de vida</a><a onClick={() => go("clube")}>Clube</a><a onClick={() => go("contato")}>Contato</a></div>
          <button type="button" className="ib cart" aria-label="Carrinho" onClick={() => setOpen(true)}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>{count > 0 && <i>{count}</i>}</button>
          <button type="button" className="ib burger" aria-label="Menu" onClick={() => setMenu((v) => !v)}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg></button>
        </div>
        {menu && <div className="mob"><a onClick={() => go("sabores")}>Sabores</a><a onClick={() => go("clube")}>Clube</a><a onClick={() => go("contato")}>Contato</a></div>}
        <div className="hg">
          <div><h1>Sabor de verdade.<br />Sem exagero.</h1>
            <p>Suco gaseificado com frutas de verdade, sem açúcar e sem conservantes.</p>
            <div className="ben"><div><Ic d="M12 3 4 7v5c0 4.500 3.400 7.700 8 9 4.600-1.300 8-4.500 8-9V7l-8-4Z" />Ingredientes<br />limpos</div><div><Ic d="m12 3 2.700 5.600 6.100.9-4.400 4.300 1 6.100L12 17l-5.400 2.900 1-6.100L3.200 9.500l6.100-.9L12 3Z" />Sabores<br />ousados</div><div><Ic d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />Energia<br />leve</div></div>
            <button type="button" className="btn" onClick={() => go("sabores")}>Comprar agora</button><button type="button" className="btn o" onClick={() => go("sabores")}>Ver sabores</button></div>
          <div className="can"><img src="/fizz-hero.webp" alt="Lata de suco gaseificado roxa e verde com uvas, limão e respingos" /><span className="badge">Sem açúcar<br />Sem conservantes</span></div>
        </div>
        <div className="wrap" id="sabores"><div className="panel">
          <h2 className="ph">Nossos sabores</h2>
          <div className="fl">
            {FLAV.map((f, i) => (<div className="fc" key={f.n}><div className="im" style={{ background: f.c }}><img src={f.img} alt={f.n} loading="lazy" /></div>
              <div className="b"><h3>{f.n}</h3><div className="pr">{brl(f.p)} a lata</div><button type="button" onClick={() => add(i)}>{added === i ? "Adicionado ✓" : "Adicionar"}</button></div></div>))}
          </div></div>
          <div className="row" id="vibe">
            <div className="panel why4"><div><Ic d="M5 5l14 14M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z" />Sem açúcar<span>Zero culpa</span></div><div><Ic d="M5 19c8 0 14-6 14-14C11 5 5 11 5 19Z" />Sabor natural<span>Extratos de fruta</span></div><div><Ic d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-3 9 2 2 4-4" />Sem conservantes<span>Limpo e honesto</span></div><div><Ic d="M12 20c-5-3-8-6-8-10a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 4-3 7-8 10Z" />Baixa caloria<span>Leve e fresco</span></div></div>
            <div className="vibe"><img src="/fizz-vibe.webp" alt="Amigos na pista de skate com uma lata roxa" loading="lazy" /><div className="t"><h2>Refresque<br />o seu astral.</h2><button type="button" className="btn" onClick={() => go("sabores")}>Ver os sabores</button></div></div>
          </div>
          <div className="club" id="clube" style={{ marginTop: 20 }}>
            <div><h2>Entre pro<br />clube.</h2><p>Mais pontos. Mais vantagens. Mais sabor.</p></div>
            <div className="bar">Ganhe pontos a cada compra · Nível 2<div className="tr"><i /></div><div className="perks"><span>Ofertas<br />exclusivas</span><span>Brinde de<br />aniversário</span><span>Acesso<br />antecipado</span><span>Eventos<br />do clube</span></div></div>
          </div>
          <div style={{ margin: "34px 0 6px", fontFamily: "'Bebas Neue',sans-serif", fontSize: 34, letterSpacing: ".01em" }}>POR QUE O {brand.toUpperCase()}?</div>
          <div className="pts">{[["200+", "Pontos pelo cadastro", "linear-gradient(160deg,#ff7b86,#e9475a)"], ["500+", "Pontos por pedido", "linear-gradient(160deg,#8a5bff,#5b2fe0)"], ["1000+", "Pontos por indicação", "linear-gradient(160deg,#ffc83a,#f5a60f)"], ["1500+", "Pontos nos marcos", "linear-gradient(160deg,#6cc6ff,#3d8fe8)"]].map(([b, s, g]) => (<div key={b} style={{ background: g }}><b>{b}</b><span>{s}</span></div>))}</div>
        </div>
      </div>
      <footer id="contato"><div className="wrap"><div className="fg">
        <div><div className="logo" style={{ color: "#fff", fontSize: 26 }}>{brand.toLowerCase()}</div><p style={{ lineHeight: 1.65, marginTop: 14, opacity: .85 }}>Suco gaseificado com frutas de verdade.<br />Av. Rio Branco, 1800, Centro, {city}.<br />Seg a sáb, 9h às 19h.</p></div>
        <div><h5>Loja</h5><a onClick={() => go("sabores")}>Sabores</a><a onClick={() => go("clube")}>Clube</a><a onClick={() => setOpen(true)}>Carrinho</a></div>
        <div><h5>Ajuda</h5><a>Entrega</a><a>Trocas</a><a>Perguntas</a></div>
        <div><h5>Contato</h5><a href={`https://wa.me/${num}?text=${encodeURIComponent("Oi! Tenho uma dúvida.")}`} target="_blank" rel="noreferrer">WhatsApp</a><a>Instagram</a></div>
      </div></div></footer>

      {sc && count === 0 && <button type="button" className="fb" onClick={() => go("sabores")}>Ver sabores</button>}
      {sc && count > 0 && <button type="button" className="fb" onClick={() => setOpen(true)}>Carrinho · {count} · {brl(total)}</button>}
      {open && (<>
        <div className="ov" onClick={() => setOpen(false)} />
        <aside className="dw" role="dialog" aria-label="Seu carrinho">
          <button type="button" className="x" aria-label="Fechar" onClick={() => setOpen(false)}>×</button>
          <h3>Seu carrinho</h3>
          <span style={{ opacity: .7, fontSize: 14 }}>{count === 0 ? "Nada por aqui ainda" : `${count} ${count === 1 ? "item" : "itens"}`}</span>
          {count === 0 ? (<div style={{ margin: "34px 0", textAlign: "center" }}><p style={{ opacity: .7 }}>Escolha um sabor.</p><button type="button" className="btn" onClick={() => { setOpen(false); go("sabores"); }}>Ver sabores</button></div>) : (<>
            {bag.map((x, k) => (<div className="li" key={x.i}><div className="th" style={{ background: FLAV[x.i]!.c }}><img src={FLAV[x.i]!.img} alt="" /></div>
              <div style={{ flex: 1 }}><b style={{ fontSize: 15 }}>{FLAV[x.i]!.n}</b><div style={{ fontWeight: 600 }}>{brl(FLAV[x.i]!.p)}</div>
                <div className="qn"><button type="button" aria-label="Menos" onClick={() => qty(k, -1)}>−</button><b>{x.q}</b><button type="button" aria-label="Mais" onClick={() => qty(k, 1)}>+</button></div></div></div>))}
            <div style={{ display: "flex", justifyContent: "space-between", margin: "18px 0 4px", fontSize: 18, fontWeight: 600 }}><span>Total</span><span>{brl(total)}</span></div>
            <input className="f" placeholder="Seu nome" aria-label="Seu nome" value={name} onChange={(e) => setName(e.target.value)} />
            <a className="btn" href={wa} target="_blank" rel="noreferrer" style={{ display: "flex", justifyContent: "center", marginTop: 14 }}>Fechar pedido no WhatsApp</a>
          </>)}
        </aside>
      </>)}
    </div>
  );
}
