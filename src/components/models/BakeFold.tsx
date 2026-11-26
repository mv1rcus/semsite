import { useEffect, useState } from "react";

/** Padaria artesanal nova, construida a partir de um pin editorial creme com titulo grande em serifa. Encomenda com retirada que fecha no WhatsApp. */
const RED = "#a3281d", INK = "#1d130d", CREAM = "#f8f2e9", PAPER = "#fbf7f0", DK = "#2a1a14";
const ITEMS = [
  { n: "Pão de fermentação natural", d: "Fermentado por 24 horas, casca crocante e miolo aberto.", p: 28, img: "/pao-p1.webp" },
  { n: "Croissant de manteiga", d: "Camadas folhadas com manteiga de verdade, assado toda manhã.", p: 14, img: "/pao-p2.webp" },
  { n: "Multigrãos com sementes", d: "Mistura de grãos integrais e sementes, fermentação lenta.", p: 24, img: "/pao-p3.webp" },
];
const DOW = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
function nextDays() {
  const out: { label: string }[] = [];
  const t = new Date();
  for (let i = 1; out.length < 4; i++) {
    const x = new Date(t.getFullYear(), t.getMonth(), t.getDate() + i);
    if (x.getDay() === 0) continue;
    out.push({ label: `${DOW[x.getDay()]}, ${String(x.getDate()).padStart(2, "0")}/${String(x.getMonth() + 1).padStart(2, "0")}` });
  }
  return out;
}
const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const Wheat = ({ s = 90, c = "#6b4a36" }: { s?: number; c?: string }) => (
  <svg width={s} height={s * 1.6} viewBox="0 0 50 80" fill="none" stroke={c} strokeWidth="1.1" strokeLinecap="round" aria-hidden>
    <path d="M10 78C18 54 26 34 40 6" />
    {[{ x: 22, y: 50 }, { x: 27, y: 40 }, { x: 32, y: 30 }, { x: 36, y: 20 }].map(({ x, y }, i) => (<g key={i}><path d={`M${x} ${y}c-8-1-10-7-9-12 7 1 10 6 9 12z`} /><path d={`M${x + 1} ${y - 2}c7-3 11-8 10-13-6 2-10 7-10 13z`} /></g>))}
  </svg>
);
const Mark = ({ c = INK }: { c?: string }) => (<svg width="26" height="30" viewBox="0 0 30 36" fill="none" stroke={c} strokeWidth="1.2" strokeLinecap="round" aria-hidden><path d="M6 34C10 22 14 14 22 3M14 22c-4 0-6-3-6-6 4 0 6 2 6 6zM18 16c-4 0-6-3-6-6 4 0 6 2 6 6zM22 10c4-1 6-4 5-7-4 1-6 4-5 7z" /></svg>);

export function BakeFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Massa Mãe";
  const city = client?.city?.trim() || "São Paulo";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [cart, setCart] = useState<Record<number, number>>({});
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  const [days] = useState(nextDays);
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState("Manhã");
  const [name, setName] = useState("");
  const [added, setAdded] = useState<number | null>(null);
  useEffect(() => { const f = () => setSc(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const add = (i: number) => { setCart((c) => ({ ...c, [i]: (c[i] ?? 0) + 1 })); setAdded(i); setTimeout(() => setAdded(null), 1200); };
  const qty = (i: number, d: number) => setCart((c) => { const n = (c[i] ?? 0) + d; const o = { ...c }; if (n <= 0) delete o[i]; else o[i] = n; return o; });
  const items = Object.entries(cart).map(([k, q]) => ({ i: Number(k), q, it: ITEMS[Number(k)]! }));
  const count = items.reduce((a, x) => a + x.q, 0);
  const total = items.reduce((a, x) => a + x.q * x.it.p, 0);
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero encomendar na ${brand}: ${items.map((x) => `${x.q}x ${x.it.n}`).join(", ")}. Retirada ${days[day]?.label ?? ""}, ${slot.toLowerCase()}. Total ${brl(total)}.${name ? ` Em nome de ${name}.` : ""}`)}`;

  return (
    <div className="bk" style={{ fontFamily: "Inter, system-ui, sans-serif", color: INK, background: CREAM, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&display=swap');
        .bk *{box-sizing:border-box}.bk a,.bk button{font-family:inherit}
        .bk .wrap{max-width:1180px;margin:0 auto;padding:0 28px}
        .bk .serif{font-family:Cormorant Garamond,Georgia,serif}
        .bk .hero{position:relative;min-height:640px;color:${INK};background:#efe3d2}
        .bk .hero>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:75% 50%}
        .bk .hero:before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(248,242,233,.96) 0,rgba(248,242,233,.82) 34%,rgba(248,242,233,0) 62%)}
        .bk .nav{position:relative;z-index:3;display:flex;align-items:center;justify-content:space-between;height:92px;gap:20px}
        .bk .logo{display:flex;align-items:center;gap:12px;font-family:Cormorant Garamond,serif;font-weight:600;font-size:28px;letter-spacing:3px;text-transform:uppercase;line-height:1}
        .bk .logo small{display:block;font-family:Inter,sans-serif;font-size:9.5px;letter-spacing:3.5px;font-weight:500;color:#6b5546;margin-top:6px}
        .bk .links{display:flex;gap:38px;font-family:Cormorant Garamond,serif;font-size:19px;font-weight:600}
        .bk .links a{cursor:pointer;color:${INK};padding-bottom:4px;border-bottom:1.5px solid transparent}.bk .links a:hover{border-color:${RED}}
        .bk .cartb{position:relative;background:none;border:0;cursor:pointer;width:46px;height:46px;display:grid;place-items:center}
        .bk .cartb b{position:absolute;right:2px;top:4px;min-width:20px;height:20px;border-radius:10px;background:${RED};color:#fff;font-size:11.5px;display:grid;place-items:center;padding:0 5px}
        .bk .burger{display:none;background:none;border:0;width:44px;height:44px;cursor:pointer}
        .bk .btn{background:${RED};color:#fff;border:0;border-radius:3px;padding:0 30px;min-height:54px;font-weight:600;font-size:13.5px;letter-spacing:2.5px;text-transform:uppercase;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:14px;text-decoration:none;transition:background .2s}
        .bk .btn:hover{background:#8a1f16}
        .bk .btn.o{background:transparent;color:${INK};border:1.5px solid ${INK}}.bk .btn.o:hover{background:${INK};color:#fff}
        .bk h1{font-family:Cormorant Garamond,serif;font-weight:500;font-size:clamp(58px,8vw,108px);line-height:.94;letter-spacing:-2px;margin:0;max-width:640px}
        .bk .lead{font-size:19px;line-height:1.6;color:#3b2c22;margin:26px 0 34px;max-width:420px}
        .bk .herob{position:relative;z-index:2;padding:56px 0 100px}
        .bk .eyebrow{display:flex;align-items:center;justify-content:center;gap:16px;font-size:12.5px;letter-spacing:4px;text-transform:uppercase;font-weight:600;color:#5b463a}.bk .eyebrow i{width:46px;height:1px;background:#b9a592;display:block}
        .bk h2{font-family:Cormorant Garamond,serif;font-weight:500;font-size:clamp(38px,4.8vw,60px);line-height:1.04;margin:16px 0 0;letter-spacing:-.5px}
        .bk .sec{padding:104px 0;background:${PAPER}}
        .bk .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;margin-top:52px}
        .bk .card{background:${CREAM};border-radius:6px;overflow:hidden;box-shadow:0 10px 30px rgba(42,26,20,.08);display:flex;flex-direction:column}
        .bk .card .im{overflow:hidden;aspect-ratio:4/3}.bk .card img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .6s}.bk .card:hover img{transform:scale(1.05)}
        .bk .card .tx{padding:22px 24px 8px;flex:1}
        .bk .card h3{min-height:2.2em}.bk .card .row{display:flex;justify-content:space-between;gap:12px;align-items:baseline}
        .bk .card h3{font-family:Cormorant Garamond,serif;font-weight:600;font-size:27px;line-height:1.1;margin:0}
        .bk .card .pr{font-family:Cormorant Garamond,serif;font-size:26px;font-weight:600;color:${RED};white-space:nowrap}
        .bk .card p{color:#5a463a;font-size:15.5px;line-height:1.55;margin:10px 0 0}
        .bk .add{margin:18px 24px 24px;border:0;border-top:1px solid #dccfbf;background:none;padding:18px 0 0;font-size:13px;letter-spacing:3px;text-transform:uppercase;font-weight:700;cursor:pointer;color:${INK};display:flex;justify-content:space-between;align-items:center}
        .bk .add:hover{color:${RED}}
        .bk .proc{display:grid;grid-template-columns:1fr 1fr;min-height:540px}
        .bk .proc img{width:100%;height:100%;object-fit:cover;display:block}
        .bk .proc .tx{background:${PAPER};padding:70px 64px;display:flex;flex-direction:column;justify-content:center;position:relative}
        .bk .proc .sprig{position:absolute;right:28px;bottom:26px;opacity:.85;pointer-events:none}
        .bk .proc ul{list-style:none;margin:30px 0 0;padding:0;display:flex;gap:26px;flex-wrap:wrap;font-size:12px;letter-spacing:2.5px;text-transform:uppercase;color:#6b5546;font-weight:600}
        .bk .proc ul li{border-top:1px solid #cdbba8;padding-top:10px}
        .bk .vis{background:${CREAM};padding:70px 0}
        .bk .visg{display:grid;grid-template-columns:repeat(3,1fr);gap:32px;text-align:center}
        .bk .visg b{display:block;font-family:Cormorant Garamond,serif;font-size:26px;font-weight:600;margin-bottom:6px}.bk .visg span{color:#5a463a;font-size:15.5px;line-height:1.6}
        .bk footer{background:${DK};color:#e9dccd;padding:56px 0 40px}
        .bk .fg{display:grid;grid-template-columns:1.2fr 1fr 1fr 1.3fr;gap:40px}
        .bk footer h5{font-size:12.5px;letter-spacing:3px;text-transform:uppercase;margin:0 0 16px;color:#e2d3bf;font-weight:600}
        .bk footer a{display:block;cursor:pointer;color:#f2e8da;font-size:15px;margin-bottom:10px}
        .bk .nl{display:flex;border:1px solid #6b5546;border-radius:3px;overflow:hidden}.bk .nl input{flex:1;background:none;border:0;color:#fff;padding:0 14px;min-height:50px;font-size:14.5px;min-width:0}.bk .nl a{margin:0;background:${RED};display:grid;place-items:center;padding:0 18px}
        .bk .wa{position:fixed;right:18px;bottom:18px;z-index:40;width:58px;height:58px;border-radius:50%;background:#25d366;display:grid;place-items:center;box-shadow:0 8px 24px rgba(0,0,0,.3)}
        .bk .ov{position:fixed;inset:0;z-index:100;background:rgba(29,19,13,.55);display:flex;justify-content:flex-end}
        .bk .dw{background:${PAPER};width:100%;max-width:450px;height:100%;overflow:auto;padding:30px;position:relative}
        .bk .dw h3{font-family:Cormorant Garamond,serif;font-size:34px;font-weight:600;margin:0 0 4px}
        .bk .x{position:absolute;right:12px;top:10px;width:44px;height:44px;border:0;background:none;font-size:28px;cursor:pointer}
        .bk .li{display:flex;gap:14px;align-items:center;padding:14px 0;border-bottom:1px solid #e3d6c6}
        .bk .li img{width:78px;height:62px;object-fit:cover;border-radius:4px}
        .bk .q{display:inline-flex;align-items:center;gap:10px;border:1px solid #cdbba8;border-radius:3px;padding:0 4px;margin-top:6px}.bk .q button{width:32px;height:32px;border:0;background:none;font-size:18px;cursor:pointer}
        .bk .chip{padding:12px 6px;border:1px solid #cdbba8;border-radius:3px;background:#fff;cursor:pointer;font-size:14px;text-align:center;min-height:46px}.bk .chip.on{background:${INK};color:#fff;border-color:${INK}}
        .bk input.f{width:100%;margin-top:14px;padding:14px 16px;border:1px solid #cdbba8;border-radius:3px;font-size:15px;background:#fff}
        .bk .mob{display:none}
        @media(max-width:900px){
          .bk .links,.bk .navbtn{display:none}.bk .burger{display:block}.bk .nav{height:72px}.bk .logo{font-size:23px}
          .bk .hero{min-height:0}.bk .hero:before{background:linear-gradient(180deg,rgba(248,242,233,.95) 0,rgba(248,242,233,.78) 55%,rgba(248,242,233,.25) 100%)}.bk .hero>img{object-position:70% 100%}
          .bk .herob{padding:30px 0 230px}.bk .lead{font-size:17px}
          .bk .grid{grid-template-columns:1fr;gap:22px}.bk .sec{padding:60px 0}
          .bk .proc{grid-template-columns:1fr}.bk .proc img{height:280px}.bk .proc .tx{padding:44px 28px}.bk .proc .sprig{display:none}
          .bk .visg{grid-template-columns:1fr;gap:26px}.bk .fg{grid-template-columns:1fr 1fr;gap:30px}.bk .fg>div:first-child,.bk .fg>div:last-child{grid-column:span 2}
          .bk .mob{display:block;background:#fff;margin:0 16px 10px;border-radius:6px;box-shadow:0 8px 24px rgba(42,26,20,.15)}.bk .mob a{display:block;padding:15px 20px;font-size:16px;cursor:pointer;border-top:1px solid #f0e6d8;font-family:Cormorant Garamond,serif;font-weight:600}.bk .mob a:first-child{border:0}
        }
      `}</style>

      <section className="hero" id="top">
        <img src="/pao-hero.webp" alt="Pão de fermentação natural sobre tábua de madeira" />
        <header style={{ position: "relative", zIndex: 3 }}>
          <div className="wrap nav">
            <div className="logo"><Mark /><div>{brand}<small>Padaria artesanal</small></div></div>
            <nav className="links"><a onClick={() => go("padaria")}>Padaria</a><a onClick={() => go("historia")}>Nossa história</a><a onClick={() => go("visita")}>Visite</a><a onClick={() => go("contato")}>Contato</a></nav>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <button type="button" className="cartb" aria-label="Encomenda" onClick={() => setOpen(true)}>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 9h16l-1.500 13h-13zM9 9V7a4 4 0 0 1 8 0v2" /></svg>
                {count > 0 && <b>{count}</b>}
              </button>
              <button type="button" className="burger" aria-label="Menu" onClick={() => setMenu((m) => !m)}><svg width="26" height="26" viewBox="0 0 26 26" stroke={INK} strokeWidth="2"><path d="M3 7h20M3 13h20M3 19h20" /></svg></button>
            </div>
          </div>
          {menu && <div className="mob"><a onClick={() => go("padaria")}>Padaria</a><a onClick={() => go("historia")}>Nossa história</a><a onClick={() => go("visita")}>Visite</a><a onClick={() => go("contato")}>Contato</a></div>}
        </header>
        <div className="wrap herob">
          <h1>Bom dia começa devagar.</h1>
          <p className="lead">Pães de fermentação natural e folhados feitos à mão, assados todas as manhãs em {city}.</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button type="button" className="btn" onClick={() => go("padaria")}>Ver a padaria <span aria-hidden>→</span></button>
            <button type="button" className="btn o" onClick={() => setOpen(true)}>Encomendar</button>
          </div>
        </div>
      </section>

      <section className="sec" id="padaria"><div className="wrap" style={{ textAlign: "center" }}>
        <div className="eyebrow"><i />Nossa padaria<i /></div>
        <h2>Pães de todo dia. Momentos fora do comum.</h2>
        <div className="grid" style={{ textAlign: "left" }}>
          {ITEMS.map((it, i) => (
            <div className="card" key={it.n}>
              <div className="im"><img src={it.img} alt={it.n} loading="lazy" /></div>
              <div className="tx"><div className="row"><h3>{it.n}</h3><span className="pr">{brl(it.p)}</span></div><p>{it.d}</p></div>
              <button type="button" className="add" onClick={() => add(i)}><span>{added === i ? "Adicionado ✓" : "Adicionar à encomenda"}</span><span aria-hidden>→</span></button>
            </div>
          ))}
        </div>
      </div></section>

      <section className="proc" id="historia">
        <img src="/pao-proc.webp" alt="Massa descansando com farinha" loading="lazy" />
        <div className="tx">
          <div className="sprig"><Wheat /></div>
          <span style={{ fontSize: 12, letterSpacing: 4, textTransform: "uppercase", fontWeight: 600, color: "#5b463a" }}>O processo</span>
          <h2 style={{ marginBottom: 20 }}>O tempo faz um pão mais gentil.</h2>
          <p style={{ fontSize: 17.5, lineHeight: 1.7, color: "#4b392e", maxWidth: 420, margin: "0 0 30px" }}>Acreditamos que um bom pão não pode ter pressa. Com poucos ingredientes, fermentação longa e muito cuidado, fazemos pães e folhados com gosto de casa.</p>
          <div><button type="button" className="btn" onClick={() => setOpen(true)}>Fazer minha encomenda <span aria-hidden>→</span></button></div>
          <ul><li>Ingredientes melhores</li><li>Dias mais lentos</li><li>Amanhãs mais gostosos</li></ul>
        </div>
      </section>

      <section className="vis" id="visita"><div className="wrap visg">
        <div><b>Assado toda manhã</b><span>Primeira fornada às 6h30, de segunda a sábado.</span></div>
        <div><b>Retire na padaria</b><span>Encomende pelo site e busque no horário que escolher.</span></div>
        <div><b>Feito em fermentação lenta</b><span>Fermento natural, farinha selecionada e nada de pressa.</span></div>
      </div></section>

      <footer id="contato"><div className="wrap">
        <div className="fg">
          <div><div className="logo" style={{ color: "#fff" }}><Mark c="#fff" /><div>{brand}<small style={{ color: "#bfa992" }}>Padaria artesanal</small></div></div><p style={{ color: "#bfa992", fontSize: 14.5, lineHeight: 1.6, marginTop: 18 }}>Rua dos Trigais, 88, Vila Madalena, {city}<br />Seg a sáb, 6h30 às 19h · Dom, 7h às 13h</p></div>
          <div><h5>Padaria</h5><a onClick={() => go("padaria")}>Pães</a><a onClick={() => go("padaria")}>Folhados</a><a onClick={() => setOpen(true)}>Encomendas</a></div>
          <div><h5>Sobre</h5><a onClick={() => go("historia")}>Nossa história</a><a onClick={() => go("visita")}>Visite</a><a href={`https://wa.me/${num}`} target="_blank" rel="noreferrer">Contato</a></div>
          <div><h5>Avisos de fornada</h5><div className="nl"><input placeholder="Seu WhatsApp" aria-label="Seu WhatsApp" /><a href={`https://wa.me/${num}?text=${encodeURIComponent("Oi! Quero receber o aviso das fornadas especiais.")}`} target="_blank" rel="noreferrer" aria-label="Enviar">→</a></div><p style={{ color: "#bfa992", fontSize: 13.5, marginTop: 14 }}>Instagram @{brand.normalize("NFD").toLowerCase().replace(/[^a-z]+/g, "")}</p></div>
        </div>
      </div></footer>

      {sc && <a className="wa" href={`https://wa.me/${num}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 32 32" fill="#fff"><path d="M16 3a13 13 0 0 0-11 19.800L3 29l6.400-1.900A13 13 0 1 0 16 3zm0 2.400a10.600 10.600 0 1 1-5.400 19.700l-.4-.2-3.800 1.100 1.100-3.700-.3-.4A10.600 10.600 0 0 1 16 5.400zm-4 5.300c-.3 0-.7.100-1 .5-.4.400-1.300 1.300-1.300 3.100s1.300 3.600 1.500 3.800c.2.300 2.600 4.100 6.400 5.600 3.100 1.200 3.700.9 4.400.9.700-.1 2.200-.9 2.500-1.800.3-.9.300-1.600.2-1.800-.1-.2-.3-.3-.7-.5l-2.300-1.100c-.3-.1-.5-.2-.8.200-.2.300-.9 1.100-1.100 1.300-.2.200-.4.300-.7.100-.4-.2-1.500-.5-2.800-1.700-1-.9-1.700-2-1.900-2.400-.2-.3 0-.5.200-.7l.5-.6c.2-.2.200-.4.300-.6.100-.2.100-.4 0-.6l-1-2.400c-.3-.6-.5-.5-.8-.5z" /></svg></a>}

      {open && (
        <div className="ov" onClick={(e) => e.target === e.currentTarget && setOpen(false)} role="dialog" aria-modal="true" aria-label="Encomenda">
          <div className="dw">
            <button type="button" className="x" aria-label="Fechar" onClick={() => setOpen(false)}>×</button>
            <h3>Sua encomenda</h3>
            <span style={{ color: "#6b5546", fontSize: 14 }}>{count === 0 ? "Nada na cesta ainda" : `${count} ${count === 1 ? "item" : "itens"} · retirada na padaria`}</span>
            {count === 0 ? (
              <div style={{ margin: "34px 0", textAlign: "center" }}><Wheat s={50} /><p style={{ color: "#6b5546" }}>Escolha um pão ou folhado para começar.</p><button type="button" className="btn" onClick={() => { setOpen(false); go("padaria"); }}>Ver a padaria</button></div>
            ) : (
              <>
                <div style={{ marginTop: 10 }}>
                  {items.map((x) => (
                    <div className="li" key={x.i}>
                      <img src={x.it.img} alt={x.it.n} />
                      <div style={{ flex: 1 }}><b style={{ fontSize: 15 }}>{x.it.n}</b><div style={{ color: RED, fontWeight: 700 }}>{brl(x.it.p)}</div>
                        <div className="q"><button type="button" aria-label="Menos" onClick={() => qty(x.i, -1)}>−</button><b>{x.q}</b><button type="button" aria-label="Mais" onClick={() => qty(x.i, 1)}>+</button></div></div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 20, fontSize: 12, letterSpacing: 2.5, textTransform: "uppercase", fontWeight: 700 }}>Retirada</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8, marginTop: 10 }}>{days.map((d, i) => (<button type="button" key={d.label} className={`chip${day === i ? " on" : ""}`} onClick={() => setDay(i)}>{d.label}</button>))}</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8, marginTop: 8 }}>{["Manhã", "Tarde"].map((s) => (<button type="button" key={s} className={`chip${slot === s ? " on" : ""}`} onClick={() => setSlot(s)}>{s}</button>))}</div>
                <input className="f" value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" aria-label="Seu nome" />
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 20, borderTop: "1px solid #e3d6c6", paddingTop: 12, marginTop: 20 }}><span>Total</span><span>{brl(total)}</span></div>
                <a className="btn" href={wa} target="_blank" rel="noreferrer" style={{ marginTop: 18, width: "100%" }}>Enviar encomenda no WhatsApp</a>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
