import { useEffect, useState } from "react";

/** Papelaria fofa autoral, construida a partir de um pin pastel (amarelo, rosa, lavanda) com titulo desenhado a mao, faixas onduladas, cartoes de categoria coloridos e produtos em destaque. Carrinho que fecha no WhatsApp. */
const BG = "#fff6f3", INK = "#1d1a3a", PINK = "#ffc6dc", PINK2 = "#fbd9e6", YEL = "#fff0a6", LAV = "#dccdf6", MINT = "#bfecd6", SKY = "#bfe5f2", MU = "#5b5878";
const ITEMS = [
  { n: "Caderno Espiral Pastel", p: 38, img: "/papel-cad.webp", c: "Cadernos", bg: PINK, btn: PINK },
  { n: "Kit Canetas Gel Pastel", p: 29, img: "/papel-can.webp", c: "Canetas", bg: SKY, btn: MINT },
  { n: "Planner Lavanda 2027", p: 64, img: "/papel-pla.webp", c: "Planners", bg: YEL, btn: LAV },
  { n: "Washi Tape (6 rolos)", p: 24, img: "/papel-was.webp", c: "Washi", bg: PINK2, btn: YEL },
  { n: "Estojo Margaridas", p: 42, img: "/papel-est.webp", c: "Acessórios", bg: MINT, btn: PINK },
  { n: "Caderno Liso Folhas Creme", p: 33, img: "/papel-ban.webp", c: "Cadernos", bg: LAV, btn: MINT },
];
const CATS = [["Cadernos", "/papel-cad.webp", PINK], ["Canetas", "/papel-can.webp", SKY], ["Planners", "/papel-pla.webp", YEL], ["Washi", "/papel-was.webp", PINK2], ["Acessórios", "/papel-est.webp", MINT]] as const;
const TABS = ["Todos", "Cadernos", "Canetas", "Planners", "Washi", "Acessórios"];
const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const Heart = ({ s = 18, c = "#ff8fb8" }: { s?: number; c?: string }) => (<svg width={s} height={s} viewBox="0 0 24 24" fill={c} stroke={INK} strokeWidth="1.6" aria-hidden><path d="M12 20s-7-4.4-7-9.5A4 4 0 0112 8a4 4 0 017 2.5C19 15.6 12 20 12 20z" /></svg>);
const Wave = ({ color, flip }: { color: string; flip?: boolean }) => (<svg viewBox="0 0 1200 40" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 34, transform: flip ? "scaleY(-1)" : undefined }} aria-hidden><path d="M0 20 C100 0 200 40 300 20 S500 0 600 20 S800 40 900 20 S1100 0 1200 20 V40 H0Z" fill={color} /></svg>);

export function PapelFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Risco & Rabisco";
  const city = client?.city?.trim() || "Florianópolis";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [bag, setBag] = useState<{ i: number; q: number }[]>([]);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [name, setName] = useState("");
  const [added, setAdded] = useState<number | null>(null);
  const [cat, setCat] = useState("Todos");
  const [sc, setSc] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 700); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const add = (i: number) => { setBag((b) => { const k = b.findIndex((x) => x.i === i); if (k >= 0) return b.map((x, j) => (j === k ? { ...x, q: x.q + 1 } : x)); return [...b, { i, q: 1 }]; }); setAdded(i); setTimeout(() => setAdded(null), 1200); };
  const qty = (k: number, d: number) => setBag((b) => b.map((x, j) => (j === k ? { ...x, q: x.q + d } : x)).filter((x) => x.q > 0));
  const count = bag.reduce((a, x) => a + x.q, 0);
  const total = bag.reduce((a, x) => a + x.q * ITEMS[x.i]!.p, 0);
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero comprar na ${brand}: ${bag.map((x) => `${x.q}x ${ITEMS[x.i]!.n}`).join(", ")}. Total ${brl(total)}.${name ? ` Em nome de ${name}.` : ""}`)}`;

  return (
    <div className="pp" style={{ fontFamily: "'Nunito', system-ui, sans-serif", color: INK, background: BG, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat+Brush&family=Londrina+Solid:wght@400;900&family=Nunito:wght@500;600;700;800&display=swap');
        .pp *{box-sizing:border-box}.pp a,.pp button,.pp input{font-family:inherit}
        .pp .wrap{max-width:1200px;margin:0 auto;padding:0 24px}
        .pp .sc{font-family:'Caveat Brush',cursive;font-weight:400}
        .pp .ld{font-family:'Londrina Solid',sans-serif;font-weight:900;text-transform:uppercase;letter-spacing:.01em}
        .pp .nav{display:flex;align-items:center;gap:30px;height:82px}
        .pp .logo{font-family:'Caveat Brush',cursive;font-size:40px;line-height:.85;display:flex;align-items:center;gap:8px;text-shadow:2px 2px 0 rgba(255,255,255,.7)}.pp .logo .lt{display:flex;flex-direction:column;align-items:center}
        .pp .logo small{display:block;font-family:'Nunito',sans-serif;font-size:11px;font-weight:800;letter-spacing:.3em;text-transform:uppercase;color:${INK};margin-top:4px;text-shadow:none}
        .pp .nav .m{display:flex;gap:30px;margin:0 auto;font-size:13.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase}.pp .nav .m a{cursor:pointer}.pp .nav .m a:hover{color:#e0578f}
        .pp .ib{background:none;border:0;color:${INK};cursor:pointer;min-width:44px;min-height:44px;display:grid;place-items:center;position:relative}
        .pp .ib i{position:absolute;top:4px;right:2px;background:#ff8fb8;color:${INK};font-style:normal;font-size:11px;font-weight:800;min-width:18px;height:18px;border-radius:99px;display:grid;place-items:center;border:1.5px solid ${INK}}
        .pp .burger{display:none}
        .pp .heroBg{background:linear-gradient(110deg,#ffd6e6 0%,#fdddea 45%,#f3dcf6 100%);position:relative;overflow:hidden}
        .pp .heroBg .blob{position:absolute;border-radius:50%;z-index:0}
        .pp .hero{position:relative;z-index:1;display:grid;grid-template-columns:1fr 1.05fr;align-items:center;gap:20px;min-height:470px}
        .pp .hero .tx{padding:34px 0 60px}
        .pp .hero .sc{font-size:34px;display:flex;align-items:center;gap:10px;margin-bottom:-6px;transform:rotate(-3deg);transform-origin:left}
        .pp .hero h1{font-size:clamp(70px,9.6vw,122px);line-height:.88;margin:0 0 18px;color:${INK};text-shadow:3px 3px 0 rgba(255,255,255,.55);transform:rotate(-2deg);transform-origin:left}
        .pp .hero p{font-size:18px;line-height:1.55;font-weight:600;max-width:380px;margin:0 0 26px}
        .pp .btn{background:#ff8fb8;color:${INK};border:2.5px solid ${INK};border-radius:99px;padding:0 32px;min-height:54px;font-weight:800;font-size:14.5px;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;display:inline-flex;align-items:center;gap:8px;text-decoration:none;box-shadow:3px 3px 0 ${INK}}
        .pp .btn:hover{transform:translate(1px,1px);box-shadow:2px 2px 0 ${INK}}
        .pp .hero .im{position:relative;align-self:stretch;min-height:380px}.pp .hero .im img{position:absolute;top:0;bottom:0;left:0;right:calc(50% - 50vw);width:auto;min-width:100%;height:100%;object-fit:cover;object-position:center;border-radius:36px 0 0 36px;-webkit-mask-image:linear-gradient(to right,transparent 0,#000 12%);mask-image:linear-gradient(to right,transparent 0,#000 12%)}
        .pp .band{background:${YEL}}
        .pp .ben{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px;text-align:center;padding:8px 0 26px}
        .pp .ben b{display:block;font-size:13px;letter-spacing:.08em;text-transform:uppercase;margin:8px 0 4px}.pp .ben span{font-size:14px;color:${MU};line-height:1.4;font-weight:600}
        .pp .sh{text-align:center;margin:54px 0 24px;display:flex;align-items:center;justify-content:center;gap:16px;flex-wrap:wrap}
        .pp .sh h2{font-size:clamp(30px,4vw,42px);margin:0;letter-spacing:.04em}
        .pp .cats{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px}
        .pp .cc{position:relative;border-radius:22px;overflow:hidden;aspect-ratio:.92;cursor:pointer;text-align:center;padding:0;border:0;color:${INK}}
        .pp .cc img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s}.pp .cc:hover img{transform:scale(1.06)}
        .pp .cc .lb{position:absolute;left:12%;right:12%;bottom:14px;background:#fffaf0;border-radius:99px;padding:8px 10px;font-family:'Caveat Brush',cursive;font-size:22px;transform:rotate(-3deg);box-shadow:0 3px 0 rgba(29,26,58,.15)}
        .pp .tabs{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-bottom:22px}.pp .tab{border:2px solid ${INK};background:none;color:${INK};border-radius:99px;min-height:40px;padding:0 16px;font-size:14px;font-weight:800;cursor:pointer}
        .pp .tab.on{background:${INK};color:#fff}
        .pp .gr{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
        .pp .pc{text-align:center}
        .pp .pc .im{border-radius:20px;overflow:hidden;aspect-ratio:1.1;position:relative}.pp .pc .im img{width:100%;height:100%;object-fit:cover;display:block}
        .pp .pc h3{font-family:'Nunito',sans-serif;font-size:16.5px;margin:14px 0 2px;font-weight:800}.pp .pc .pr{font-size:17px;font-weight:700;margin-bottom:10px}
        .pp .ad{border:2px solid ${INK};border-radius:99px;min-height:44px;padding:0 24px;font-weight:800;font-size:13px;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;color:${INK}}
        .pp .mk{position:relative;overflow:hidden;border-radius:34px;background:linear-gradient(110deg,#e9dcfb,#f6dcf0);margin-top:60px;display:grid;grid-template-columns:1fr 1fr;align-items:center}
        .pp .mk .tx{padding:44px 48px;position:relative;z-index:2}.pp .mk .sc{font-size:38px;display:block;transform:rotate(-3deg)}
        .pp .mk h2{font-size:clamp(56px,7vw,92px);line-height:.9;margin:0 0 14px;transform:rotate(-2deg);transform-origin:left}.pp .mk p{font-size:17px;font-weight:600;margin:0 0 22px;max-width:320px;line-height:1.5}
        .pp .mk .btn{background:#bfecd6}
        .pp .mk .im{align-self:stretch;min-height:300px;position:relative}.pp .mk .im img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;-webkit-mask-image:linear-gradient(to right,transparent 0,#000 25%);mask-image:linear-gradient(to right,transparent 0,#000 25%)}
        .pp .rv{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
        .pp .rv>div{border-radius:22px;padding:24px;border:2px solid ${INK}}
        .pp .rv p{margin:10px 0 14px;font-size:16px;line-height:1.55;font-weight:600}.pp .rv span{font-size:14.5px;font-weight:800}
        .pp footer{margin-top:60px;background:${INK};color:#f3ecff;padding:44px 0 34px}
        .pp .fg{display:grid;grid-template-columns:1.6fr 1fr 1fr 1.2fr;gap:30px;font-size:15.5px;color:#d9d2ef}
        .pp .fg h5{font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#fff;margin:0 0 12px}.pp .fg a{display:block;padding:5px 0;cursor:pointer}
        .pp .fl{position:fixed;left:50%;transform:translateX(-50%);bottom:20px;z-index:30;background:#ffb3d0;color:${INK};border:2px solid ${INK};border-radius:99px;min-height:50px;padding:0 26px;font-weight:800;font-size:14.5px;box-shadow:3px 3px 0 ${INK};cursor:pointer}
        .pp .ov{position:fixed;inset:0;background:rgba(29,26,58,.5);z-index:40}
        .pp .dw{position:fixed;top:0;right:0;bottom:0;width:min(420px,100%);background:${BG};z-index:41;padding:26px 24px;overflow:auto;border-left:2px solid ${INK}}
        .pp .dw h3{font-family:'Caveat Brush',cursive;font-weight:400;font-size:36px;margin:0 0 4px}
        .pp .x{position:absolute;top:14px;right:14px;width:44px;height:44px;border:0;background:none;font-size:28px;cursor:pointer;color:${INK}}
        .pp .li{display:flex;gap:12px;padding:14px 0;border-bottom:1.5px dashed rgba(29,26,58,.25)}.pp .li img{width:64px;height:64px;border-radius:14px;object-fit:cover}
        .pp .qn{display:inline-flex;align-items:center;gap:10px;margin-top:6px}.pp .qn button{width:34px;height:34px;border-radius:99px;border:2px solid ${INK};background:none;color:${INK};font-size:18px;cursor:pointer}
        .pp input.f{width:100%;margin-top:14px;padding:14px 16px;border:2px solid ${INK};border-radius:14px;font-size:15px;background:#fff;color:${INK}}
        .pp .mob{display:none}
        @media(max-width:900px){
          .pp .logo{font-size:34px}.pp .nav .m{display:none}.pp .burger{display:grid}.pp .nav{height:66px;gap:0}.pp .nav .sp{flex:1}
          .pp .hero{grid-template-columns:1fr;min-height:0;gap:0}.pp .hero .tx{padding:20px 0 6px}.pp .hero h1{font-size:76px}.pp .hero .im{min-height:270px;height:290px;margin:0 -16px}.pp .hero .im img{right:0;width:100%;border-radius:28px 28px 0 0;-webkit-mask-image:none;mask-image:none}
          .pp .ben{grid-template-columns:repeat(2,minmax(0,1fr));gap:18px 10px}.pp .ben>div:last-child{grid-column:span 2}
          .pp .cats{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.pp .cc:last-child{grid-column:span 2;aspect-ratio:2}
          .pp .gr{grid-template-columns:repeat(2,minmax(0,1fr));gap:14px 12px}.pp .pc h3{font-size:14.5px}.pp .ad{padding:0 14px;font-size:12px}
          .pp .mk{grid-template-columns:1fr}.pp .mk .tx{padding:30px 24px 8px}.pp .mk .im{min-height:240px}.pp .mk .im img{-webkit-mask-image:linear-gradient(to bottom,transparent 0,#000 25%);mask-image:linear-gradient(to bottom,transparent 0,#000 25%)}
          .pp .rv{grid-template-columns:1fr}.pp .fg{grid-template-columns:1fr 1fr}.pp .wrap{padding:0 16px}
          .pp .mob{display:block;background:#fff;border:2px solid ${INK};border-radius:16px;margin-bottom:8px}.pp .mob a{display:block;padding:14px 20px;font-size:15px;font-weight:800;cursor:pointer}
        }
      `}</style>

      <div className="heroBg">
        <div className="blob" style={{ width: 220, height: 220, background: LAV, left: -80, top: -60 }} />
        <div className="blob" style={{ width: 200, height: 200, background: YEL, left: -70, bottom: 30 }} />
        <div className="blob" style={{ width: 150, height: 150, background: MINT, left: -40, bottom: 10 }} /><div className="blob" style={{ width: 130, height: 130, background: MINT, right: -30, top: 60, opacity: .8 }} />
        <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
          <div className="nav">
            <div className="logo"><span className="lt"><span>{brand}</span><small>Papelaria</small></span><Heart s={24} /></div>
            <div className="m"><a onClick={() => go("cats")}>Categorias</a><a onClick={() => go("destaques")}>Loja</a><a onClick={() => go("faca")}>Sobre</a><a onClick={() => go("contato")}>Contato</a></div>
            <div className="sp" />
            <button type="button" className="ib" onClick={() => setOpen(true)} aria-label="Abrir carrinho"><svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M5 7h14l-1.2 12H6.2zM9 7a3 3 0 016 0" /></svg>{count > 0 && <i>{count}</i>}</button>
            <button type="button" className="ib burger" aria-label="Menu" onClick={() => setMenu((v) => !v)}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M4 8h16M4 16h16" /></svg></button>
          </div>
          {menu && <div className="mob"><a onClick={() => go("cats")}>Categorias</a><a onClick={() => go("destaques")}>Loja</a><a onClick={() => go("faca")}>Sobre</a><a onClick={() => go("contato")}>Contato</a></div>}
          <div className="hero">
            <div className="tx">
              <span className="sc">papelaria fofa para<Heart s={22} c="#ff8fb8" /></span>
              <h1 className="ld">Dias mais<br />coloridos</h1>
              <p>Cadernos, canetas, planners e mais, para as suas metas do dia a dia. Loja em {city}.</p>
              <button type="button" className="btn" onClick={() => go("destaques")}>Ver tudo →</button>
            </div>
            <div className="im"><img src="/papel-hero.webp" alt="Cadernos espiral pastel com copo de canetas e fitas washi" /></div>
          </div>
        </div>
      </div>
      <div style={{ background: `linear-gradient(${"#f3dcf6"},${"#f3dcf6"})` }}><Wave color={YEL} flip /></div>
      <div className="band"><div className="wrap"><div className="ben">
        {[["Envio rápido", "Sai no mesmo dia", "M2 6h11v9H2zM13 9h4l3 3v3h-7M6 18a1.6 1.6 0 100 .1M16 18a1.6 1.6 0 100 .1"], ["Clientes felizes", "Milhares de sorrisos", "M12 20s-7-4.4-7-9.5A4 4 0 0112 8a4 4 0 017 2.5C19 15.6 12 20 12 20z"], ["Todo o Brasil", "Enviamos para o país", "M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"], ["Qualidade", "Feito para durar", "M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8 6.6 19.7l1.1-6.1L3.2 9.4l6.1-.8z"], ["Presentes", "Para quem você ama", "M4 10h16v10H4zM3 7h18v3H3zM12 7v13M12 7c-3-4-6-2-4 0M12 7c3-4 6-2 4 0"]].map(([a, b, ic]) => (<div key={a}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden style={{ display: "block", margin: "0 auto" }}><path d={ic} /></svg><b>{a}</b><span>{b}</span></div>))}
      </div></div></div>
      <div style={{ background: YEL }}><Wave color={BG} /></div>

      <div style={{ background: "linear-gradient(transparent 0,transparent 20px,#d9f4e6 20px,#d9f4e6 calc(100% - 20px),transparent calc(100% - 20px))", paddingBottom: 36, paddingTop: 16 }}><div className="wrap">
        <div className="sh" id="cats" style={{ marginTop: 30 }}><h2 className="sc">Escolha o seu cantinho</h2></div>
        <div className="cats">
          {CATS.map(([c, img, col]) => (
            <button type="button" className="cc" key={c} style={{ background: col }} onClick={() => { setCat(c); go("destaques"); }}><img src={img} alt={c} loading="lazy" /><div className="lb">{c}</div></button>
          ))}
        </div>

        </div></div><div className="wrap">
        <div className="sh" id="destaques"><Heart s={20} /><h2 className="ld">Produtos em destaque</h2><Heart s={20} c="#bfecd6" /></div>
        <div className="tabs">{TABS.map((c) => (<button key={c} type="button" className={`tab${cat === c ? " on" : ""}`} onClick={() => setCat(c)}>{c}</button>))}</div>
        <div className="gr">
          {ITEMS.map((it, i) => (cat === "Todos" || it.c === cat) && (
            <div className="pc" key={it.n}>
              <div className="im" style={{ background: it.bg }}><img src={it.img} alt={it.n} loading="lazy" /></div>
              <h3>{it.n}</h3>
              <div className="pr">{brl(it.p)}</div>
              <button type="button" className="ad" style={{ background: it.btn }} aria-label={`Adicionar ${it.n}`} onClick={() => add(i)}>{added === i ? "Na sacola ✓" : "Quero"}</button>
            </div>
          ))}
        </div>

        <div className="mk" id="faca">
          <div className="tx"><span className="sc">faça do seu jeito</span><h2 className="ld">Seu<br />estilo</h2><p>Papelaria que inspira os seus grandes planos. Escolha, combine e monte o seu kit.</p><button type="button" className="btn" onClick={() => go("destaques")}>Montar meu kit →</button></div>
          <div className="im"><img src="/papel-ban.webp" alt="Caderno aberto com xícara de chá" loading="lazy" /></div>
        </div>

        <div className="sh"><h2 className="sc">Quem usa, ama</h2></div>
        <div className="rv">
          {[["Bia Moreira", "O planner é lindo e o papel é ótimo de escrever. Chegou em dois dias.", PINK2], ["Letícia Prado", "Atendimento rápido no WhatsApp e tudo igualzinho às fotos. Já pedi de novo.", YEL], ["Júlia Camargo", "Comprei o kit de washi e as canetas de presente. A caixa chegou perfeita.", MINT]].map(([n, t, col]) => (<div key={n} style={{ background: col }}><div style={{ display: "flex", gap: 3 }}>{[0, 1, 2, 3, 4].map((k) => <Heart key={k} s={16} />)}</div><p>“{t}”</p><span>{n} · compra verificada</span></div>))}
        </div>
      </div>

      <footer id="contato"><div className="wrap"><div className="fg">
        <div><div className="logo" style={{ color: "#fff", textShadow: "none" }}>{brand}<Heart s={18} /></div><p style={{ lineHeight: 1.65, marginTop: 14 }}>Papelaria fofa feita com carinho.<br />Rua Felipe Schmidt, 410, Centro, {city}.<br />Seg a sáb, 9h às 19h.</p></div>
        <div><h5>Loja</h5><a onClick={() => go("destaques")}>Destaques</a><a onClick={() => go("cats")}>Categorias</a><a onClick={() => setOpen(true)}>Sacola</a></div>
        <div><h5>Ajuda</h5><a>Trocas e devoluções</a><a>Envio</a><a>Presentes</a></div>
        <div><h5>Contato</h5><a href={`https://wa.me/${num}?text=${encodeURIComponent("Oi! Tenho uma dúvida.")}`} target="_blank" rel="noreferrer">WhatsApp</a><a>Instagram</a></div>
      </div></div></footer>

      {sc && count === 0 && <button type="button" className="fl" onClick={() => go("destaques")}>Ver destaques</button>}
      {sc && count > 0 && <button type="button" className="fl" onClick={() => setOpen(true)}>Sacola · {count} · {brl(total)}</button>}

      {open && (<>
        <div className="ov" onClick={() => setOpen(false)} />
        <aside className="dw" role="dialog" aria-label="Sua sacola">
          <button type="button" className="x" aria-label="Fechar" onClick={() => setOpen(false)}>×</button>
          <h3>Sua sacola</h3>
          <span style={{ color: MU, fontSize: 14, fontWeight: 600 }}>{count === 0 ? "Nada por aqui ainda" : `${count} ${count === 1 ? "item" : "itens"}`}</span>
          {count === 0 ? (
            <div style={{ margin: "34px 0", textAlign: "center" }}><p style={{ color: MU }}>Escolha algo fofo para começar.</p><button type="button" className="btn" onClick={() => { setOpen(false); go("destaques"); }}>Ver destaques</button></div>
          ) : (<>
            {bag.map((x, k) => (
              <div className="li" key={x.i}><img src={ITEMS[x.i]!.img} alt="" />
                <div style={{ flex: 1 }}><b style={{ fontSize: 15 }}>{ITEMS[x.i]!.n}</b><div style={{ fontWeight: 800 }}>{brl(ITEMS[x.i]!.p)}</div>
                  <div className="qn"><button type="button" aria-label="Menos" onClick={() => qty(k, -1)}>−</button><b>{x.q}</b><button type="button" aria-label="Mais" onClick={() => qty(k, 1)}>+</button></div></div>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", margin: "18px 0 4px", fontSize: 18, fontWeight: 800 }}><span>Total</span><span>{brl(total)}</span></div>
            <input className="f" placeholder="Seu nome" aria-label="Seu nome" value={name} onChange={(e) => setName(e.target.value)} />
            <a className="btn" href={wa} target="_blank" rel="noreferrer" style={{ display: "flex", justifyContent: "center", marginTop: 14 }}>Fechar compra no WhatsApp</a>
          </>)}
        </aside>
      </>)}
    </div>
  );
}
