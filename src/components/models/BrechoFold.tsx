import { useEffect, useState } from "react";

/** Brecho autoral, construido a partir de um pin creme com titulo gigante em sans larga preta, pilulas rosa e verde-limao, e duas fotos recortadas flutuando em manchas de cor. Carrinho que fecha no WhatsApp. */
const CREAM = "#fbf6e8", PAPER = "#fdfaf0", INK = "#161616", PINK = "#f6a7e6", LIME = "#d7f35c", MU = "#5c5850";
const ITEMS = [
  { n: "Blazer paisley vermelho", p: 189, img: "/brecho-A.webp", c: "Casacos", bg: LIME, tag: "raro" },
  { n: "Jaqueta de couro gasta", p: 249, img: "/brecho-B.webp", c: "Casacos", bg: PINK, tag: "" },
  { n: "Jaqueta jeans desbotada", p: 129, img: "/brecho-C.webp", c: "Casacos", bg: "#f1ead6", tag: "" },
  { n: "Vestido floral anos 70", p: 159, img: "/brecho-D.webp", c: "Vestidos", bg: PINK, tag: "novo" },
  { n: "Bolsa carteiro de couro", p: 139, img: "/brecho-E.webp", c: "Acessórios", bg: LIME, tag: "" },
];
const TABS = ["Todos", "Casacos", "Vestidos", "Acessórios"];
const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

const Swirl = () => (
  <svg viewBox="0 0 120 70" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden><g fill="none" stroke="#fff" strokeWidth="1.6"><ellipse cx="38" cy="30" rx="30" ry="18" transform="rotate(-18 38 30)" /><ellipse cx="70" cy="40" rx="34" ry="17" transform="rotate(24 70 40)" /><ellipse cx="94" cy="22" rx="22" ry="14" transform="rotate(-30 94 22)" /></g></svg>
);

export function BrechoFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = (client?.name?.trim() || "Remix").toUpperCase();
  const city = client?.city?.trim() || "Juiz de Fora";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [bag, setBag] = useState<{ i: number; q: number }[]>([]);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [name, setName] = useState("");
  const [added, setAdded] = useState<number | null>(null);
  const [cat, setCat] = useState("Todos");
  const [fav, setFav] = useState<number[]>([]);
  const [sc, setSc] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 700); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const add = (i: number) => { setBag((b) => { const k = b.findIndex((x) => x.i === i); if (k >= 0) return b.map((x, j) => (j === k ? { ...x, q: x.q + 1 } : x)); return [...b, { i, q: 1 }]; }); setAdded(i); setTimeout(() => setAdded(null), 1200); };
  const qty = (k: number, d: number) => setBag((b) => b.map((x, j) => (j === k ? { ...x, q: x.q + d } : x)).filter((x) => x.q > 0));
  const count = bag.reduce((a, x) => a + x.q, 0);
  const total = bag.reduce((a, x) => a + x.q * ITEMS[x.i]!.p, 0);
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero as peças do ${brand}: ${bag.map((x) => `${x.q}x ${ITEMS[x.i]!.n}`).join(", ")}. Total ${brl(total)}.${name ? ` Em nome de ${name}.` : ""}`)}`;
  const mq = "PEÇA ÚNICA // SEM REPOSIÇÃO // VESTE O QUE SOBROU DE BOM // ";

  return (
    <div className="bf" style={{ fontFamily: "'Inter', system-ui, sans-serif", color: INK, background: CREAM, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@125,800;125,900&family=Inter:wght@400;500;600;700&display=swap');
        .bf *{box-sizing:border-box}.bf a,.bf button,.bf input{font-family:inherit}
        .bf .ex{font-family:'Archivo','Arial Black',system-ui,sans-serif;font-stretch:125%;font-weight:800;letter-spacing:-.02em;text-transform:uppercase}
        .bf .frame{margin:18px auto 0;max-width:1280px;width:calc(100% - 36px);background:${PAPER};border:3px solid ${INK};border-radius:26px;overflow:hidden;position:relative}
        .bf .nav{display:flex;align-items:center;justify-content:space-between;padding:28px 56px}
        .bf .nav .wm{font-family:'Archivo',sans-serif;font-stretch:125%;font-weight:800;font-size:19px;letter-spacing:.02em}
        .bf .nav .m{display:flex;gap:32px;font-size:15px;font-weight:500}.bf .nav .m a{cursor:pointer}
        .bf .ic{display:flex;gap:22px;align-items:center}.bf .ic button{background:none;border:0;cursor:pointer;color:${INK};position:relative;padding:0;display:grid}
        .bf .ic i{position:absolute;top:-8px;right:-9px;background:${INK};color:${LIME};font-style:normal;font-size:10.5px;font-weight:700;min-width:17px;height:17px;border-radius:99px;display:grid;place-items:center}
        .bf .burger{display:none}
        .bf .hl{padding:36px 56px 0;display:flex;flex-direction:column;gap:22px}
        .bf .row{display:flex;align-items:center;gap:22px}
        .bf .h{font-size:clamp(30px,5.05vw,72px);line-height:1;margin:0;white-space:nowrap}
        .bf .pk{width:clamp(70px,9.4vw,122px);height:clamp(40px,5.8vw,74px);border-radius:16px;background:${PINK};overflow:hidden;flex:none}
        .bf .ar{margin-left:auto;width:clamp(120px,16vw,210px);height:clamp(40px,5.8vw,74px);border-radius:16px;background:${LIME};border:0;cursor:pointer;display:grid;place-items:center;flex:none}
        .bf .ol{border:1.5px solid ${INK};border-radius:16px;padding:.06em .28em .02em}
        .bf .lede{font-size:15px;line-height:1.5;max-width:260px;color:#2a2a2a;margin:0}
        .bf .stage{position:relative;height:clamp(380px,40vw,500px);margin-top:20px}
        .bf .bl{position:absolute;bottom:0}
        .bf .bl .pe{position:absolute;bottom:0;left:50%;transform:translateX(-50%);height:100%;width:auto;max-width:none;display:block}
        .bf .L{left:11%;width:30%;height:92%}.bf .R{right:11%;width:30%;height:96%}
        .bf .blob{position:absolute;inset:auto 0 0 0;height:85%}
        .bf .cardx{position:absolute;left:50%;bottom:0;transform:translateX(-50%);width:clamp(170px,17vw,200px);height:clamp(250px,25vw,305px);background:${PAPER};border:2px solid ${INK};border-bottom:0;border-radius:100px 100px 0 0;padding:52px 20px 0;text-align:center;font-size:13.5px;line-height:1.5;z-index:2}
        .bf .cardx b.t{display:block;font-family:'Archivo',sans-serif;font-stretch:125%;font-weight:800;font-size:15px;margin:12px 0 14px}
        .bf .dn{width:42px;height:42px;border-radius:99px;border:1.5px solid ${INK};background:none;margin:18px auto 0;display:grid;place-items:center;cursor:pointer}
        .bf .star{position:absolute;left:calc(50% + 28px);bottom:clamp(235px,24vw,290px);width:90px;height:90px;z-index:3}
        .bf .wrap{max-width:1200px;margin:0 auto;padding:0 28px}
        .bf .h2{font-size:clamp(26px,3.8vw,48px);margin:0 0 22px;line-height:1.02}
        .bf .tabs{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:24px}
        .bf .tab{border:1.5px solid ${INK};background:none;border-radius:99px;padding:10px 20px;font-weight:600;font-size:14.5px;cursor:pointer;color:${INK}}.bf .tab.on{background:${INK};color:${LIME}}
        .bf .gr{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
        .bf .pc .im{position:relative;border:2px solid ${INK};border-radius:22px;aspect-ratio:1;display:grid;place-items:center;overflow:hidden}
        .bf .pc .im img{height:86%;width:auto;max-width:86%;object-fit:contain;display:block}
        .bf .pc .im b{position:absolute;top:12px;left:12px;background:${INK};color:${LIME};font-size:11px;padding:4px 10px;border-radius:99px;text-transform:uppercase;letter-spacing:.06em}
        .bf .hh{position:absolute;top:10px;right:10px;width:36px;height:36px;border-radius:99px;border:1.5px solid ${INK};background:${PAPER};cursor:pointer;display:grid;place-items:center;padding:0}
        .bf .pc h3{font-family:"Inter",sans-serif;font-stretch:100%;text-transform:none;letter-spacing:0;font-size:16px;margin:12px 4px 2px;font-weight:600}
        .bf .pc .rw{display:flex;align-items:center;justify-content:space-between;margin:0 4px}.bf .pc .rw b{font-family:'Archivo',sans-serif;font-stretch:125%;font-size:19px;font-weight:800}
        .bf .ad{width:44px;height:44px;border-radius:14px;border:0;background:${LIME};font-size:22px;font-weight:700;cursor:pointer;color:${INK}}
        .bf .btn{background:${INK};color:${LIME};border:0;border-radius:99px;padding:15px 28px;font-weight:700;font-size:15px;cursor:pointer;text-decoration:none}
        .bf .mqs{background:${INK};color:${LIME};overflow:hidden;white-space:nowrap;padding:16px 0;margin-top:76px;font-family:'Archivo',sans-serif;font-stretch:125%;font-weight:800;font-size:20px;letter-spacing:.02em}
        .bf .mqs div{display:inline-block;animation:bfm 28s linear infinite}@keyframes bfm{to{transform:translateX(-50%)}}
        .bf .how{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:8px}
        .bf .how>div{border:2px solid ${INK};border-radius:24px;padding:28px 26px;min-height:230px}
        .bf .how span{font-family:'Archivo',sans-serif;font-stretch:125%;font-weight:800;font-size:46px;display:block;margin-bottom:12px}
        .bf .how h4{font-size:20px;margin:0 0 8px;font-weight:700}.bf .how p{margin:0;line-height:1.55;font-size:15px;color:#33302a}
        .bf .rv{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
        .bf .rv>div{background:${PINK};border-radius:24px;padding:26px}.bf .rv>div:nth-child(2){background:${LIME}}
        .bf .rv p{font-size:17px;line-height:1.5;margin:0 0 16px;font-weight:500}.bf .rv span{font-size:13px;font-weight:600}
        .bf footer{background:${INK};color:#e9e4d4;margin-top:80px;padding:56px 0 40px}
        .bf .fg{display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:34px;font-size:14.5px}
        .bf .fg h5{margin:0 0 12px;font-family:'Archivo',sans-serif;font-stretch:125%;color:${LIME};font-size:13px;letter-spacing:.06em;text-transform:uppercase}
        .bf .fg a{display:block;margin:8px 0;cursor:pointer;color:#e9e4d4;text-decoration:none}
        .bf .fl{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:30;background:${INK};color:${LIME};border:0;border-radius:99px;padding:15px 26px;font-weight:700;font-size:15px;cursor:pointer;box-shadow:0 10px 30px rgba(0,0,0,.25)}
        .bf .ov{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:40}
        .bf .dw{position:fixed;top:0;right:0;bottom:0;width:min(400px,100%);background:${PAPER};z-index:41;padding:26px;overflow:auto;border-left:3px solid ${INK}}
        .bf .dw h3{font-family:'Archivo',sans-serif;font-stretch:125%;font-weight:800;font-size:24px;margin:0 0 4px;text-transform:uppercase}
        .bf .dw .x{position:absolute;top:16px;right:18px;background:none;border:0;font-size:30px;cursor:pointer;color:${INK}}
        .bf .li{display:flex;gap:12px;padding:14px 0;border-bottom:1px solid rgba(0,0,0,.15)}.bf .li .th{width:64px;height:64px;border-radius:14px;border:1.5px solid ${INK};display:grid;place-items:center;overflow:hidden}.bf .li img{height:90%;width:auto;max-width:90%;object-fit:contain}
        .bf .qn{display:inline-flex;align-items:center;gap:10px;margin-top:6px}.bf .qn button{width:34px;height:34px;border-radius:99px;border:1.5px solid ${INK};background:none;color:${INK};font-size:18px;cursor:pointer}
        .bf input.f{width:100%;margin-top:14px;padding:14px 16px;border:1.5px solid ${INK};border-radius:14px;font-size:15px;background:#fff;color:${INK}}
        .bf .mob{display:none}
        @media(max-width:900px){
          .bf .nav{padding:20px 20px}.bf .nav .m{display:none}.bf .burger{display:grid}
          .bf .hl{padding:20px 20px 0;gap:14px}.bf .row{gap:12px;flex-wrap:wrap}.bf .h{font-size:clamp(24px,7.4vw,40px)}
          .bf .pk{width:60px;height:38px;border-radius:12px}.bf .ar{width:92px;margin:0;height:38px;border-radius:12px}
          .bf .row.r1{flex-wrap:nowrap}.bf .row.r1 .h{font-size:4.5vw}.bf .row.r1 .pk{width:44px;height:30px;border-radius:10px}.bf .row.r1 .ar{width:58px;height:40px;border-radius:12px}.bf .row.r1 .ar svg{height:10px}.bf .row.r1{gap:8px}.bf .lede{max-width:none;font-size:15px}.bf .tabs{flex-wrap:nowrap;overflow-x:auto;padding-bottom:4px}.bf .tab{white-space:nowrap;flex:none}
          .bf .stage{height:330px;margin-top:10px}.bf .L{left:-2%;width:54%}.bf .R{right:-2%;width:54%}.bf .cardx,.bf .star{display:none}
          .bf .gr{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.bf .pc h3{font-size:14px!important}.bf .pc .rw b{font-size:16px}.bf .ad{width:38px;height:38px}
          .bf .how,.bf .rv{grid-template-columns:1fr}.bf .fg{grid-template-columns:1fr 1fr}.bf .wrap{padding:0 16px}
          .bf .mob{display:block;background:${PAPER};border:2px solid ${INK};border-radius:16px;margin:0 16px 12px}.bf .mob a{display:block;padding:14px 20px;font-size:15px;font-weight:600;cursor:pointer}
        }
      `}</style>

      <div className="frame">
        <div className="nav">
          <span className="wm">{brand}.</span>
          <div className="m"><a onClick={() => go("catalogo")}>Novidades</a><a onClick={() => go("catalogo")}>Casacos</a><a onClick={() => go("catalogo")}>Vestidos</a><a onClick={() => go("como")}>Como funciona</a><a onClick={() => go("contato")}>Contato</a></div>
          <div className="ic">
            <button type="button" className="burger" aria-label="Menu" onClick={() => setMenu((v) => !v)}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg></button>
            <button type="button" aria-label="Buscar" onClick={() => go("catalogo")}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg></button>
            <button type="button" aria-label="Favoritos"><svg width="22" height="22" viewBox="0 0 24 24" fill={fav.length ? PINK : "none"} stroke={INK} strokeWidth="1.8" strokeLinejoin="round"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.4A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" /></svg>{fav.length > 0 && <i>{fav.length}</i>}</button>
            <button type="button" aria-label="Carrinho" onClick={() => setOpen(true)}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="1.8" strokeLinejoin="round"><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>{count > 0 && <i>{count}</i>}</button>
          </div>
        </div>
        {menu && <div className="mob"><a onClick={() => go("catalogo")}>Novidades</a><a onClick={() => go("como")}>Como funciona</a><a onClick={() => go("contato")}>Contato</a></div>}

        <div className="hl">
          <div className="row r1"><div className="pk"><Swirl /></div><h1 className="h ex">Roupa vintage</h1><button type="button" className="ar" aria-label="Ver catálogo" onClick={() => go("catalogo")}><svg width="86%" height="14" viewBox="0 0 100 14" fill="none" stroke={INK} strokeWidth="1.4" preserveAspectRatio="none"><path d="M0 7h98M92 1l6 6-6 6" /></svg></button></div>
          <div className="row"><span className="h ex">dos seus</span><span className="h ex ol">sonhos</span><p className="lede">Peças garimpadas em {city}, uma de cada. Veja o que chegou esta semana e feche pelo WhatsApp.</p></div>
        </div>

        <div className="stage">
          <div className="bl L"><svg className="blob" viewBox="0 0 300 400" preserveAspectRatio="none" aria-hidden><path d="M0 150 L45 40 L95 110 L150 0 L185 120 L210 70 L250 175 L300 150 L300 400 L0 400 Z" fill={LIME} /></svg><img className="pe" src="/brecho-A.webp" alt="Homem com blazer paisley vermelho vintage" /></div>
          <svg className="star" viewBox="0 0 100 100" aria-hidden><path d="M50 0 L58 38 L100 30 L64 52 L84 92 L50 62 L18 98 L34 54 L0 40 L40 38Z" fill={LIME} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" /></svg>
          <div className="cardx"><span>#VERÃO26</span><b className="t">{brand}.</b>10% de desconto para estudantes com o cupom <b>ESTUDANTE10</b><button type="button" className="dn" aria-label="Rolar" onClick={() => go("catalogo")}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round"><path d="M12 5v14M6 13l6 6 6-6" /></svg></button></div>
          <div className="bl R"><div className="blob" style={{ left: "-6%", right: "-6%" }}><svg viewBox="0 0 300 340" width="100%" height="100%" preserveAspectRatio="none" aria-hidden><path d="M40 40 C100 -10 230 20 260 90 C300 170 280 260 230 340 L0 340 C-10 250 0 120 40 40Z" fill={PINK} /><g fill="none" stroke="#fff" strokeWidth="3"><ellipse cx="120" cy="150" rx="90" ry="50" transform="rotate(-25 120 150)" /><ellipse cx="170" cy="210" rx="100" ry="46" transform="rotate(20 170 210)" /></g></svg></div><img className="pe" src="/brecho-B.webp" alt="Mulher de cabelo cacheado com jaqueta de couro vintage" /></div>
        </div>
      </div>

      <div className="wrap" style={{ paddingTop: 70 }}>
        <h2 className="h2 ex" id="catalogo">Chegou agora</h2>
        <div className="tabs">{TABS.map((c) => (<button key={c} type="button" className={`tab${cat === c ? " on" : ""}`} onClick={() => setCat(c)}>{c}</button>))}</div>
        <div className="gr">
          {ITEMS.map((it, i) => (cat === "Todos" || it.c === cat) && (
            <div className="pc" key={it.n}>
              <div className="im" style={{ background: it.bg }}><img src={it.img} alt={it.n} loading="lazy" />{it.tag && <b>{it.tag}</b>}
                <button type="button" className="hh" aria-label="Favoritar" onClick={() => setFav((f) => (f.includes(i) ? f.filter((x) => x !== i) : [...f, i]))}><svg width="18" height="18" viewBox="0 0 24 24" fill={fav.includes(i) ? INK : "none"} stroke={INK} strokeWidth="1.8" strokeLinejoin="round"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.4A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" /></svg></button></div>
              <h3>{it.n}</h3>
              <div className="rw"><b>{brl(it.p)}</b><button type="button" className="ad" aria-label={`Adicionar ${it.n}`} onClick={() => add(i)}>{added === i ? "✓" : "+"}</button></div>
            </div>
          ))}
        </div>
      </div>

      <div className="mqs" aria-hidden><div>{mq.repeat(6)}</div></div>

      <div className="wrap" style={{ paddingTop: 70 }} id="como">
        <h2 className="h2 ex">Como funciona</h2>
        <div className="how">
          {[["01", "Escolha", "Cada peça é única. Se gostou, coloca no carrinho antes que alguém leve."], ["02", "Feche no zap", "O carrinho vira uma mensagem pronta no WhatsApp. Pix ou cartão na hora."], ["03", "Receba ou retire", `Retire na loja em ${city} ou receba em casa em até 3 dias úteis.`]].map(([n, t, d]) => (<div key={n}><span>{n}</span><h4>{t}</h4><p>{d}</p></div>))}
        </div>
      </div>

      <div className="wrap" style={{ paddingTop: 70 }}>
        <h2 className="h2 ex">Quem já garimpou</h2>
        <div className="rv">
          {[["Larissa M.", "Achei a jaqueta de couro que procurava há um ano. Chegou do jeitinho da foto."], ["Davi R.", "O blazer é lindo demais. Atendimento no zap foi rapidíssimo."], ["Bianca T.", "Preço justo e peça única. Já virei cliente toda semana."]].map(([n, t]) => (<div key={n}><p>“{t}”</p><span>{n} · compra verificada</span></div>))}
        </div>
      </div>

      <footer id="contato"><div className="wrap"><div className="fg">
        <div><b className="ex" style={{ color: LIME, fontSize: 22 }}>{brand}.</b><p style={{ lineHeight: 1.65, marginTop: 14 }}>Brechó de roupa vintage.<br />Rua Halfeld, 800, Centro, {city}.<br />Seg a sáb, 10h às 19h.</p></div>
        <div><h5>Loja</h5><a onClick={() => go("catalogo")}>Novidades</a><a onClick={() => go("como")}>Como funciona</a><a onClick={() => setOpen(true)}>Carrinho</a></div>
        <div><h5>Ajuda</h5><a>Trocas</a><a>Entrega</a><a>Vender para nós</a></div>
        <div><h5>Contato</h5><a href={`https://wa.me/${num}?text=${encodeURIComponent("Oi! Tenho uma dúvida.")}`} target="_blank" rel="noreferrer">WhatsApp</a><a>Instagram</a></div>
      </div></div></footer>

      {sc && count === 0 && <button type="button" className="fl" onClick={() => go("catalogo")}>Ver peças</button>}
      {sc && count > 0 && <button type="button" className="fl" onClick={() => setOpen(true)}>Carrinho · {count} · {brl(total)}</button>}

      {open && (<>
        <div className="ov" onClick={() => setOpen(false)} />
        <aside className="dw" role="dialog" aria-label="Seu carrinho">
          <button type="button" className="x" aria-label="Fechar" onClick={() => setOpen(false)}>×</button>
          <h3>Seu carrinho</h3>
          <span style={{ color: MU, fontSize: 14 }}>{count === 0 ? "Nada por aqui ainda" : `${count} ${count === 1 ? "item" : "itens"}`}</span>
          {count === 0 ? (
            <div style={{ margin: "34px 0", textAlign: "center" }}><p style={{ color: MU }}>Escolha uma peça para começar.</p><button type="button" className="btn" onClick={() => { setOpen(false); go("catalogo"); }}>Ver peças</button></div>
          ) : (<>
            {bag.map((x, k) => (
              <div className="li" key={x.i}><div className="th" style={{ background: ITEMS[x.i]!.bg }}><img src={ITEMS[x.i]!.img} alt="" /></div>
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
