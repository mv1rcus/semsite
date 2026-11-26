import { useEffect, useState } from "react";

/** Milkshakeria autoral, construida a partir de um pin roxo e rosa lúdico: hero escuro com milkshake gigante recortado, manchas orgânicas, cards brancos, vitrine de copos em tiles coloridos, faixa de combo ondulada e escorrido de leite entre as seções. Carrinho que fecha no WhatsApp. */
const NAVY = "#2b1a63", PINK = "#f6789f", YEL = "#ffc83d", LIL = "#9a86ee", INK = "#26164f", PAPER = "#ffffff";
const ITEMS = [
  { n: "Morango Bliss", d: "Morango fresco com calda e chantilly", p: 22, c: "#f9a3c0", img: "/milk-hero.webp" },
  { n: "Chocolate Crunch", d: "Chocolate belga, calda e raspas", p: 24, c: "#8a5a45", img: "/milk-choc.webp" },
  { n: "Manga Magic", d: "Manga madura com chantilly e hortelã", p: 22, c: "#ffc233", img: "/milk-manga.webp" },
  { n: "Cookies Explosion", d: "Baunilha com biscoito de chocolate triturado", p: 25, c: "#3b95dc", img: "/milk-oreo.webp" },
];
const COMBO = { n: "Combo 2 milkshakes", p: 36, c: "#f9a3c0", img: "/milk-combo.webp" };
const ALL = [...ITEMS, COMBO];
const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const drip = (fill: string, up = false) => {
  const xs = [40, 150, 270, 370, 500, 610, 730, 840, 960, 1080, 1160];
  let d = "M0 0H1200V26";
  [...xs].reverse().forEach((x, i) => { const h = 34 + ((i * 37) % 38), w = 24 + ((i * 11) % 16); d += `H${x + w + 40}C${x + w + 40} 26 ${x + w + 30} ${h + 12} ${x + w} ${h + 12}S${x - w + 16} ${26} ${x - w - 10} 26`; });
  d += "H0Z";
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 90' preserveAspectRatio='none'><path fill='${fill}' d='${d}' ${up ? "transform='translate(0 90) scale(1 -1)'" : ""}/></svg>`;
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
};

export function MilkFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Milky Mix";
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
  const total = bag.reduce((a, x) => a + x.q * ALL[x.i]!.p, 0);
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero pedir na ${brand}: ${bag.map((x) => `${x.q}x ${ALL[x.i]!.n}`).join(", ")}. Total ${brl(total)}.${name ? ` Em nome de ${name}.` : ""}`)}`;

  return (
    <div className="mx" style={{ fontFamily: "'Nunito', system-ui, sans-serif", color: INK, background: PAPER, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@400;500;700&display=swap');
        .mx *{box-sizing:border-box}.mx h1,.mx h2,.mx h3,.mx h4,.mx h5{font-family:'Fredoka',system-ui,sans-serif;text-transform:none;font-style:normal;margin:0}.mx a,.mx button{font-family:inherit}
        .mx .hero{position:relative;background:${NAVY};color:#fff;overflow:hidden;padding-bottom:70px}
        .mx .b1{position:absolute;left:27%;bottom:-33%;width:34%;aspect-ratio:1.15;background:${YEL};border-radius:58% 42% 62% 38%/50% 60% 40% 50%}
        .mx .b2{position:absolute;right:-6%;top:12%;width:58%;aspect-ratio:1;background:${LIL};border-radius:50% 50% 44% 56%/56% 44% 56% 44%}
        .mx .nav{position:relative;z-index:3;max-width:1180px;margin:0 auto;display:flex;align-items:center;gap:36px;padding:26px 28px}
        .mx .wm{font-family:'Fredoka',sans-serif;font-weight:600;font-size:21px;letter-spacing:0}
        .mx .nav .m{display:flex;gap:34px;margin:0 auto;font-weight:500;font-size:13.5px}.mx .nav .m a{cursor:pointer}
        .mx .pill{background:${YEL};color:${NAVY};border:0;border-radius:99px;padding:11px 22px;font-weight:700;font-size:13.5px;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;position:relative}
        .mx .pill i{position:absolute;top:-6px;right:-6px;background:${PINK};color:#fff;font-style:normal;font-size:11px;font-weight:700;min-width:19px;height:19px;border-radius:99px;display:grid;place-items:center}
        .mx .burger{display:none;background:rgba(255,255,255,.14);border:0;border-radius:99px;width:42px;height:42px;cursor:pointer;place-items:center}
        .mx .hg{position:relative;z-index:2;max-width:1180px;margin:0 auto;padding:4px 28px 0;display:grid;grid-template-columns:1fr 1fr;align-items:center;min-height:560px}
        .mx h1{font-weight:700;font-size:clamp(84px,11.5vw,152px);line-height:.88;letter-spacing:-.035em}.mx h1 b{color:${PINK};display:block;font-weight:700}
        .mx .sub{color:${YEL};font-family:'Fredoka',sans-serif;font-weight:600;font-size:24px;line-height:1.2;margin:30px 0 12px;text-wrap:balance}
        .mx .ht p{font-size:15px;line-height:1.6;max-width:340px;opacity:1;margin:0 0 26px;font-weight:400}
        .mx .rate{display:inline-flex;align-items:center;gap:10px;margin-left:22px;vertical-align:middle;font-family:'Fredoka',sans-serif;font-weight:600;font-size:26px}.mx .rate small{display:block;font-family:'Nunito',sans-serif;font-size:12px;font-weight:500;opacity:.95;line-height:1}
        .mx .pk{background:#df3f78;color:#fff;border:0;border-radius:99px;padding:13px 26px;font-weight:700;font-size:14px;cursor:pointer;text-decoration:none;display:inline-block}
        .mx .cup{position:relative;justify-self:end;width:min(110%,600px);align-self:end;margin-bottom:-70px;margin-right:-30px}.mx .cup>img{width:100%;display:block;position:relative;z-index:2;filter:drop-shadow(0 24px 30px rgba(20,8,60,.35))}
        .mx .logo{position:absolute;z-index:3;left:30%;top:52%;width:36%;transform:rotate(-6deg);filter:drop-shadow(0 6px 12px rgba(20,8,60,.3))}.mx .logo svg{display:block;width:100%;height:auto;overflow:visible}
        .mx .card{position:absolute;z-index:4;background:#fff;color:${NAVY};border-radius:18px;padding:12px 16px;font-family:'Fredoka',sans-serif;font-weight:600;font-size:13px;line-height:1.2;box-shadow:0 12px 28px rgba(20,8,60,.25);display:flex;align-items:center;gap:10px;width:152px}.mx .card b{display:block;font-size:17px;font-weight:700}
        .mx .card em{width:34px;height:34px;border-radius:10px;background:${LIL};flex:none;display:grid;place-items:center;font-style:normal;color:#fff}
        .mx .c1{right:-4%;top:52%}.mx .c2{right:-2%;top:72%}
        .mx .dr{position:absolute;left:0;right:0;bottom:-1px;height:86px;background-size:100% 100%;z-index:3}
        .mx .sec{max-width:1180px;margin:0 auto;padding:78px 28px 24px}
        .mx .h2{font-weight:600;font-size:clamp(34px,4.4vw,56px);line-height:1;letter-spacing:-.02em;color:${NAVY};text-wrap:balance}.mx .h2 b{color:${PINK};display:block;font-weight:600}
        .mx .sec>p{font-size:14.5px;line-height:1.6;max-width:320px;margin:16px 0 34px;opacity:.85}
        .mx .gr{display:grid;grid-template-columns:repeat(4,1fr);gap:22px}
        .mx .tl{text-align:center}.mx .tl .im{height:300px;border-radius:26px;display:flex;align-items:flex-end;justify-content:center;overflow:hidden;position:relative}.mx .tl .im img{height:92%;width:auto;max-width:92%;object-fit:contain;margin-bottom:-6px}
        .mx .tl h3{font-weight:600;font-size:20px;line-height:1.1;margin:16px 0 4px;text-wrap:balance}.mx .tl p{margin:0 0 4px;font-size:13px;opacity:.75;line-height:1.4}.mx .tl .pr{font-family:'Fredoka',sans-serif;font-weight:600;font-size:17px;color:${NAVY}}
        .mx .tl button{margin-top:10px;background:${NAVY};color:#fff;border:0;border-radius:99px;padding:10px 22px;font-weight:700;font-size:13px;cursor:pointer}
        .mx .combo{position:relative;max-width:1180px;margin:96px auto 0;padding:0 28px}
        .mx .cb{position:relative;background:${PINK};border-radius:40px 70px 44px 80px/60px 40px 70px 44px;color:#fff;display:grid;grid-template-columns:1fr 1fr;align-items:center;padding:54px 54px;min-height:300px}
        .mx .cb h2{font-weight:700;font-size:clamp(52px,6.4vw,84px);line-height:.92;letter-spacing:-.03em}.mx .cb p{font-size:15px;line-height:1.5;margin:0 0 22px;font-weight:500}.mx .cb .nv{background:${NAVY};color:#fff;border:0;border-radius:99px;padding:13px 28px;font-weight:700;font-size:14px;cursor:pointer}
        .mx .cb img{position:absolute;right:5%;bottom:-12px;height:122%;width:auto;max-width:52%;object-fit:contain;filter:drop-shadow(0 16px 22px rgba(80,10,40,.28))}
        .mx .off{position:absolute;right:3%;bottom:-18px;z-index:3;background:${YEL};color:${NAVY};width:84px;height:84px;border-radius:50%;display:grid;place-items:center;text-align:center;font-family:'Fredoka',sans-serif;font-weight:700;font-size:17px;line-height:.95;transform:rotate(12deg)}
        .mx .why{position:relative;margin-top:130px;background:${LIL};color:#fff;padding:110px 0 80px}.mx .why .t{position:absolute;left:0;right:0;top:-1px;height:86px;background-size:100% 100%;transform:scaleY(1)}
        .mx .why .wrap{max-width:1180px;margin:0 auto;padding:0 28px;display:grid;grid-template-columns:.9fr 2fr;gap:34px;align-items:center}
        .mx .why h2{font-weight:600;font-size:clamp(32px,3.8vw,48px);line-height:1;letter-spacing:-.02em;text-wrap:balance}
        .mx .wg{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.mx .wg div{background:#fff;color:${NAVY};border-radius:18px;padding:20px 14px;text-align:center;font-family:'Fredoka',sans-serif;font-weight:500;font-size:14px;line-height:1.2}.mx .wg i{display:grid;place-items:center;width:38px;height:38px;border-radius:12px;background:#fde1ea;margin:0 auto 10px;font-style:normal;color:${PINK};font-weight:700}
        .mx .rev{max-width:1180px;margin:48px auto 0;padding:0 28px}.mx .rv{background:#fff4cf;color:${NAVY};border-radius:60px;padding:22px 30px;display:flex;gap:18px;align-items:center;max-width:620px}.mx .rv .av{width:56px;height:56px;border-radius:50%;background:${PINK};color:#fff;display:grid;place-items:center;font-family:'Fredoka',sans-serif;font-weight:600;font-size:20px;flex:none}.mx .rv p{margin:0;font-size:14.5px;line-height:1.5}.mx .rv small{display:block;margin-top:6px;font-weight:700;font-size:12.5px}
        .mx footer{background:${NAVY};color:#fff;padding:52px 0 34px}.mx .fg{max-width:1180px;margin:0 auto;padding:0 28px;display:grid;grid-template-columns:1.6fr 1fr 1fr 1.2fr;gap:30px;font-size:14px}.mx .fg h5{font-size:15px;font-weight:600;margin:0 0 12px;color:${YEL}}.mx .fg a{display:block;margin:8px 0;opacity:.85;cursor:pointer;color:#fff;text-decoration:none}
        .mx .fl{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:30;background:${PINK};color:#fff;border:0;border-radius:99px;padding:14px 26px;font-weight:700;font-size:14px;cursor:pointer;box-shadow:0 10px 30px rgba(0,0,0,.28)}
        .mx .ov{position:fixed;inset:0;background:rgba(20,8,60,.5);z-index:40}
        .mx .dw{position:fixed;top:0;right:0;bottom:0;width:min(400px,100%);background:#fff;z-index:41;padding:26px;overflow:auto;color:${INK}}
        .mx .dw h3{font-weight:600;font-size:26px}.mx .dw .x{position:absolute;top:14px;right:18px;background:none;border:0;font-size:30px;cursor:pointer;color:${INK}}
        .mx .li{display:flex;gap:12px;padding:14px 0;border-bottom:1px solid rgba(0,0,0,.12);align-items:center}.mx .li .th{width:58px;height:58px;border-radius:16px;display:flex;align-items:flex-end;justify-content:center;overflow:hidden}.mx .li .th img{height:92%;width:auto;object-fit:contain}
        .mx .qn{display:inline-flex;align-items:center;gap:10px;margin-top:6px}.mx .qn button{width:30px;height:30px;border-radius:99px;border:2px solid ${NAVY};background:none;font-size:17px;cursor:pointer;color:${NAVY}}
        .mx input.f{width:100%;margin-top:14px;padding:13px 16px;border:2px solid ${NAVY};border-radius:14px;font-size:15px;background:#fff;color:${INK}}
        .mx .mob{display:none}
        @media(max-width:900px){
          .mx .nav{padding:18px 18px;gap:12px}.mx .nav .m,.mx .nav .pill.o{display:none}.mx .burger{display:grid;margin-left:auto}
          .mx .wm{margin-right:auto}
          .mx .hg{grid-template-columns:1fr;padding:0 20px;min-height:0}.mx h1{font-size:clamp(72px,22vw,104px)}
          .mx .ht{position:relative;z-index:3;text-align:left}.mx .sub{font-size:20px;margin-top:20px}.mx .rate{margin:18px 0 0}
          .mx .cup{justify-self:center;width:min(86%,360px);margin:16px -10px -70px auto}.mx .b1{left:-20%;bottom:-8%;width:70%}.mx .b2{right:-40%;top:46%;width:120%}
          .mx .c1{right:auto;left:-18%;top:56%}.mx .c2{right:auto;left:-20%;top:76%;display:none}.mx .card{width:136px;padding:10px 12px;font-size:12px}
          .mx .mob{display:block;position:relative;z-index:5;background:#fff;color:${INK};border-radius:16px;margin:0 16px 10px}.mx .mob a{display:block;padding:14px 20px;font-weight:700;cursor:pointer}
          .mx .sec{padding:60px 16px 10px}.mx .gr{grid-template-columns:1fr 1fr;gap:14px}.mx .tl .im{height:220px;border-radius:22px}.mx .tl h3{font-size:16px}
          .mx .combo{padding:0 16px}.mx .cb{grid-template-columns:1fr;padding:34px 24px 250px;border-radius:34px}.mx .cb img{right:50%;transform:translateX(50%);height:auto;width:76%;max-width:76%;bottom:-6px}.mx .off{right:8%;bottom:6px}
          .mx .why .wrap{grid-template-columns:1fr}.mx .wg{grid-template-columns:1fr 1fr}.mx .rev{padding:0 16px}.mx .rv{border-radius:34px;padding:18px}
          .mx .fg{grid-template-columns:1fr 1fr;padding:0 20px}
        }
      `}</style>
      <div className="hero"><span className="b1" /><span className="b2" />
        <div className="nav">
          <div className="wm">{brand.toLowerCase().replace(/\s/g, "")}.com</div>
          <div className="m"><a onClick={() => go("top")}>Início</a><a onClick={() => go("sobre")}>Sobre</a><a onClick={() => go("cardapio")}>Cardápio</a><a onClick={() => go("combo")}>Combo</a><a onClick={() => go("contato")}>Contato</a></div>
          <button type="button" className="pill o" onClick={() => setOpen(true)}>Fazer pedido{count > 0 && <i>{count}</i>}</button>
          <button type="button" className="burger" aria-label="Menu" onClick={() => setMenu((v) => !v)}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg></button>
        </div>
        {menu && <div className="mob"><a onClick={() => go("cardapio")}>Cardápio</a><a onClick={() => go("combo")}>Combo</a><a onClick={() => go("contato")}>Contato</a><a onClick={() => { setMenu(false); setOpen(true); }}>Fazer pedido</a></div>}
        <div className="hg" id="top">
          <div className="ht"><h1>Milky<b>Mix</b></h1>
            <div className="sub">Felicidade batida<br />em cada gole.</div>
            <p>Milkshakes cremosos e cheios de graça, feitos com amor e com os melhores ingredientes.</p>
            <button type="button" className="pk" onClick={() => go("cardapio")}>Ver cardápio</button><span className="rate"><svg width="26" height="26" viewBox="0 0 24 24" fill={YEL}><path d="m12 2 2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.300 5.800 21l1.600-7L2 9.200l7.100-.6z" /></svg><span>4,9<small>(1.023 avaliações)</small></span></span></div>
          <div className="cup"><img src="/milk-hero.webp" alt="Milkshake de morango com chantilly, calda e um morango no topo" />
            <span className="logo" role="img" aria-label={brand}><svg viewBox="0 0 200 120" aria-hidden><rect x="6" y="6" width="188" height="108" rx="54" fill="#3a1f8a" stroke="#fff" strokeWidth="6" /><g fontFamily="'Fredoka',sans-serif" fontWeight="700" textAnchor="middle" fontSize="46" strokeLinejoin="round" paintOrder="stroke"><text x="100" y="62" fill="#fff" stroke="#241257" strokeWidth="5">Milky</text><text x="100" y="102" fill={PINK} stroke="#241257" strokeWidth="5" fontSize="48">Mix</text></g></svg></span>
            <div className="card c1"><em>♥</em><div><b>100%</b>ingredientes reais</div></div>
            <div className="card c2"><em>★</em><div><b>Fresco</b>feito todo dia</div></div></div>
        </div>
        <span className="dr" style={{ backgroundImage: drip("#ffffff", true) }} />
      </div>

      <div className="sec" id="cardapio">
        <h2 className="h2">Nossos milkshakes<b>da casa</b></h2>
        <p id="sobre">Shakes feitos na hora com ingredientes selecionados e muito carinho. Escolha o seu e feche o pedido pelo WhatsApp.</p>
        <div className="gr">
          {ITEMS.map((it, i) => (
            <div className="tl" key={it.n}>
              <div className="im" style={{ background: it.c }}><img src={it.img} alt={it.n} loading="lazy" /></div>
              <h3 style={{ color: it.c === "#8a5a45" ? "#5b3a2c" : it.c === "#ffc233" ? "#a86400" : it.c === "#3b95dc" ? "#2a74b8" : "#c42f62" }}>{it.n}</h3>
              <p>{it.d}</p><div className="pr">{brl(it.p)}</div>
              <button type="button" onClick={() => add(i)}>{added === i ? "Adicionado ✓" : "Adicionar"}</button>
            </div>
          ))}
        </div>
      </div>

      <div className="combo" id="combo"><div className="cb">
        <div style={{ position: "relative", zIndex: 2 }}><h2 style={{ marginBottom: 20 }}>Combo<br />Duplo!</h2><p style={{ maxWidth: 360 }}>Leve 2 milkshakes e ganhe 20% de desconto. Escolha dois sabores e peça pelo WhatsApp.</p><button type="button" className="nv" onClick={() => add(4)}>{added === 4 ? "Adicionado ✓" : `Pedir por ${brl(COMBO.p)}`}</button></div><div />
        <img src="/milk-combo.webp" alt="Dois milkshakes, morango e chocolate" loading="lazy" /><span className="off">20%<br />OFF</span>
      </div></div>

      <div className="why"><span className="t" style={{ backgroundImage: drip("#ffffff") }} />
        <div className="wrap"><h2>Por que você vai amar</h2>
          <div className="wg"><div><i>♥</i>Ingredientes reais</div><div><i>✓</i>Sem aromatizantes artificiais</div><div><i>★</i>Preparado na hora</div><div><i>☺</i>Feito com carinho</div></div></div>
        <div className="rev"><div className="rv"><span className="av">JS</span><div><p>“Os melhores milkshakes que já tomei. Cremoso, saboroso e com um sabor de verdade.”</p><small>Jéssica M. ★★★★★</small></div></div></div>
      </div>

      <footer id="contato"><div className="fg">
        <div><div className="wm">{brand}</div><p style={{ lineHeight: 1.65, marginTop: 14, opacity: .85 }}>Milkshakeria artesanal.<br />Rua Halfeld, 640, Centro, {city}.<br />Todos os dias, 12h às 22h.</p></div>
        <div><h5>Cardápio</h5><a onClick={() => go("cardapio")}>Milkshakes</a><a onClick={() => go("combo")}>Combo duplo</a><a onClick={() => setOpen(true)}>Pedido</a></div>
        <div><h5>Ajuda</h5><a>Entrega</a><a>Perguntas</a></div>
        <div><h5>Siga a gente</h5><a>Instagram</a><a>TikTok</a><a href={`https://wa.me/${num}?text=${encodeURIComponent("Oi! Tenho uma dúvida.")}`} target="_blank" rel="noreferrer">WhatsApp</a></div>
      </div></footer>

      {sc && count === 0 && <button type="button" className="fl" onClick={() => go("cardapio")}>Ver cardápio</button>}
      {sc && count > 0 && <button type="button" className="fl" onClick={() => setOpen(true)}>Pedido · {count} · {brl(total)}</button>}

      {open && (<>
        <div className="ov" onClick={() => setOpen(false)} />
        <aside className="dw" role="dialog" aria-label="Seu pedido">
          <button type="button" className="x" aria-label="Fechar" onClick={() => setOpen(false)}>×</button>
          <h3>Seu pedido</h3>
          <span style={{ opacity: .7, fontSize: 14 }}>{count === 0 ? "Nada por aqui ainda" : `${count} ${count === 1 ? "item" : "itens"}`}</span>
          {count === 0 ? (
            <div style={{ margin: "34px 0", textAlign: "center" }}><p style={{ opacity: .7 }}>Escolha um milkshake.</p><button type="button" className="pk" onClick={() => { setOpen(false); go("cardapio"); }}>Ver cardápio</button></div>
          ) : (<>
            {bag.map((x, k) => (
              <div className="li" key={x.i}><div className="th" style={{ background: ALL[x.i]!.c }}><img src={ALL[x.i]!.img} alt="" /></div>
                <div style={{ flex: 1 }}><b style={{ fontSize: 15 }}>{ALL[x.i]!.n}</b><div style={{ fontWeight: 700 }}>{brl(ALL[x.i]!.p)}</div>
                  <div className="qn"><button type="button" aria-label="Menos" onClick={() => qty(k, -1)}>−</button><b>{x.q}</b><button type="button" aria-label="Mais" onClick={() => qty(k, 1)}>+</button></div></div>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", margin: "18px 0 4px", fontSize: 18, fontWeight: 700 }}><span>Total</span><span>{brl(total)}</span></div>
            <input className="f" placeholder="Seu nome" aria-label="Seu nome" value={name} onChange={(e) => setName(e.target.value)} />
            <a className="pk" href={wa} target="_blank" rel="noreferrer" style={{ display: "flex", justifyContent: "center", marginTop: 14 }}>Fechar pedido no WhatsApp</a>
          </>)}
        </aside>
      </>)}
    </div>
  );
}
