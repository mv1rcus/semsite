import { useEffect, useState } from "react";

/** Cafeteria nova, construida do zero a partir de um pin claro em creme e marrom. Reserva de mesa em 3 passos que fecha no WhatsApp. */
const BR = "#4a2314", AC = "#a4501f", BG = "#fbf4ee", CR = "#f3e6da", DK = "#3b1d12", INK = "#2a1810";
const DRINKS = [
  { n: "Cappuccino clássico", p: "R$ 14", img: "/cafe-d1.webp" },
  { n: "Macchiato de caramelo", p: "R$ 18", img: "/cafe-d2.webp" },
  { n: "Matcha latte", p: "R$ 19", img: "/cafe-d3.webp" },
  { n: "Mocha delícia", p: "R$ 20", img: "/cafe-d4.webp" },
  { n: "Cold brew", p: "R$ 16", img: "/cafe-d5.webp" },
];
const FOODS = [
  { n: "Croissant de manteiga", p: "R$ 12", img: "/cafe-f1.webp" },
  { n: "Bolo de chocolate", p: "R$ 16", img: "/cafe-f2.webp" },
  { n: "Sanduíche grelhado", p: "R$ 22", img: "/cafe-f3.webp" },
];
const HERO_IC = [
  { t: "Café especial", ic: "M5 12h18v6a7 7 0 0 1-7 7H12a7 7 0 0 1-7-7zM23 14h2a3 3 0 0 1 0 6h-2M10 4c0 2 2 2 2 4M15 4c0 2 2 2 2 4" },
  { t: "Comida fresca", ic: "M9 4v9a3 3 0 0 0 3 3v12M15 4v9M12 4v9M22 4c-3 2-4 6-4 10h4v14" },
  { t: "Bom pra trabalhar", ic: "M6 8h20v13H6zM3 25h26" },
  { t: "Ambiente aconchegante", ic: "M4 24c0-6 3-9 6-9s4 2 6 2 3-2 6-2 6 3 6 9M6 15a4 4 0 1 1 6-3M20 12a4 4 0 1 1 6 3" },
];
const PERKS = [
  { t: "Grãos selecionados", d: "De origem certificada", ic: "M16 4c7 0 12 5 12 12S23 28 16 28 4 23 4 16 9 4 16 4zM10 22c2-8 6-12 12-12" },
  { t: "Baristas experientes", d: "Cada xícara com cuidado", ic: "M5 12h18v6a7 7 0 0 1-7 7H12a7 7 0 0 1-7-7zM23 14h2a3 3 0 0 1 0 6h-2" },
  { t: "Ingredientes frescos", d: "Feito no dia", ic: "M6 26C6 12 14 5 27 5c0 13-7 21-21 21zM6 26c4-8 9-12 15-14" },
  { t: "Espaço pra ficar", d: "Wi-Fi e tomadas", ic: "M4 12c6-7 18-7 24 0M9 17c4-4 10-4 14 0M14 22c1.500-1.500 2.500-1.500 4 0" },
];
const TESTI = [
  { q: "Café incrível, ambiente aconchegante e atendimento simpático. Meu lugar favorito pra trabalhar e encontrar amigos.", n: "Emily C." },
  { q: "O cappuccino é o melhor da cidade e o croissant sai quentinho. Reservei a mesa pelo site e foi tudo fácil.", n: "Lucas P." },
];
const TIMES = ["08:00", "09:30", "11:00", "14:00", "15:30", "17:00"];
const DOW = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
function nextDays() {
  const out: { dow: string; d: number; label: string }[] = [];
  const t = new Date();
  for (let i = 1; out.length < 6; i++) {
    const x = new Date(t.getFullYear(), t.getMonth(), t.getDate() + i);
    const w = DOW[x.getDay()] ?? "";
    out.push({ dow: w, d: x.getDate(), label: `${w}, ${String(x.getDate()).padStart(2, "0")}/${String(x.getMonth() + 1).padStart(2, "0")}` });
  }
  return out;
}
const Ic = ({ d, s = 30, c = BR }: { d: string; s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);
const CUP = HERO_IC[0]!.ic;

export function CafeFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Grão & Prosa";
  const city = client?.city?.trim() || "Belo Horizonte";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [ppl, setPpl] = useState(2);
  const [day, setDay] = useState(0);
  const [time, setTime] = useState("");
  const [cust, setCust] = useState("");
  const [ti, setTi] = useState(0);
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  const [days] = useState(nextDays);
  useEffect(() => { const f = () => setSc(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const start = () => { setStep(1); setTime(""); setOpen(true); setMenu(false); };
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero reservar uma mesa na ${brand}${cust ? ` em nome de ${cust}` : ""}: ${ppl} ${ppl === 1 ? "pessoa" : "pessoas"}, ${days[day]?.label ?? ""} às ${time}.`)}`;
  const t = TESTI[ti]!;

  return (
    <div className="cf" style={{ fontFamily: "DM Sans, system-ui, sans-serif", color: INK, background: BG, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;1,9..144,500;1,9..144,600&display=swap');
        .cf *{box-sizing:border-box}
        .cf a,.cf button{font-family:inherit}
        .cf .wrap{max-width:1180px;margin:0 auto;padding:0 24px}
        .cf .top{background:${DK};color:#f1dfd0;font-size:13px}.cf .top .wrap{display:flex;justify-content:space-between;gap:16px;height:38px;align-items:center}
        .cf .nav{display:flex;align-items:center;justify-content:space-between;height:82px;gap:20px}
        .cf .logo{display:flex;align-items:center;gap:10px;font-family:Fraunces,serif;font-weight:700;font-size:25px;color:${BR}}
        .cf .links{display:flex;gap:30px;font-size:15px;font-weight:500}
        .cf .links a{color:${INK};cursor:pointer;padding-bottom:6px;border-bottom:2px solid transparent}.cf .links a.on{border-color:${AC};color:${AC}}
        .cf .btn{background:linear-gradient(180deg,#a95a2a,#7d3c18);color:#fff;border:0;border-radius:999px;padding:0 28px;min-height:50px;font-weight:600;font-size:15px;cursor:pointer;display:inline-flex;align-items:center;gap:10px;text-decoration:none;box-shadow:0 8px 18px rgba(122,60,24,.28)}
        .cf .btn:hover{filter:brightness(1.06)}
        .cf .btn.o{background:#fff8f2;color:${INK};border:1.5px solid #d9c3b1;box-shadow:none}
        .cf .burger{display:none;background:none;border:0;width:44px;height:44px;cursor:pointer}
        .cf .hero{position:relative;overflow:hidden;background:linear-gradient(180deg,#fdf7f1,${CR})}
        .cf .herogrid{display:grid;grid-template-columns:1fr 1.15fr;align-items:center;gap:10px;min-height:560px}
        .cf .kick{font-size:12.5px;letter-spacing:3px;text-transform:uppercase;font-weight:600;color:#6b4430}
        .cf h1{font-family:Fraunces,serif;font-weight:600;font-size:clamp(46px,6vw,78px);line-height:1.02;margin:18px 0 0;color:${INK};letter-spacing:-1.5px}
        .cf h1 em{font-style:italic;font-weight:600;color:${AC}}
        .cf .lead{font-size:18px;line-height:1.65;color:#4b3328;margin:22px 0 30px;max-width:440px}
        .cf .hic{display:grid;grid-template-columns:repeat(4,auto);gap:22px;margin-top:34px;max-width:480px}
        .cf .hic div{display:flex;flex-direction:column;align-items:center;gap:8px;font-size:13px;text-align:center;color:#4b3328;font-weight:500}
        .cf .heroimg{position:relative;align-self:stretch;min-height:520px}
        .cf .heroimg img{position:absolute;right:-220px;top:0;height:100%;width:135%;max-width:none;object-fit:cover;object-position:35% 60%;-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 30%);mask-image:linear-gradient(90deg,transparent 0,#000 30%)}
        .cf .sec{padding:64px 0}
        .cf .sh{display:flex;align-items:center;gap:16px}
        .cf h2{font-family:Fraunces,serif;font-weight:600;font-size:clamp(30px,3.6vw,42px);margin:0;color:${INK};line-height:1.1}
        .cf h2 em{font-style:italic;color:${AC}}
        .cf .sh i{flex:0 0 36px;height:2px;background:${AC};display:block}
        .cf .sh a{margin-left:auto;font-size:14.5px;font-weight:600;color:${BR};cursor:pointer}
        .cf .dr{display:grid;grid-template-columns:repeat(5,1fr);gap:16px;margin-top:30px}
        .cf .dcard{background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 8px 22px rgba(74,35,20,.09);cursor:pointer;border:0;padding:0;text-align:left}
        .cf .dcard img{width:100%;aspect-ratio:1/.95;object-fit:cover;display:block;transition:transform .4s}
        .cf .dcard:hover img{transform:scale(1.05)}.cf .dcard div.im{overflow:hidden}
        .cf .dcard .lb{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:13px 14px;font-weight:600;font-size:14.5px;color:${INK}}
        .cf small{display:block;font-weight:500;font-size:13.5px;color:#8a5a3a;margin-top:2px}.cf .lb span:first-child,.cf .fcard div span:first-child{min-height:44px}.cf .go{width:30px;height:30px;border-radius:50%;background:${AC};color:#fff;display:grid;place-items:center;font-size:14px;flex:none}
        .cf .aboutgrid{display:grid;grid-template-columns:1.2fr 1fr;gap:48px;align-items:center}
        .cf .room{border-radius:30px 30px 30px 120px;overflow:hidden;box-shadow:0 20px 44px rgba(74,35,20,.18)}
        .cf .room img{width:100%;aspect-ratio:16/10.5;object-fit:cover;display:block}
        .cf .eb{font-size:12.5px;letter-spacing:3px;text-transform:uppercase;font-weight:600;color:#6b4430}
        .cf .band{background:${DK};color:#f6e7da;border-radius:24px;display:grid;grid-template-columns:repeat(4,1fr);padding:30px 18px;margin-top:40px}
        .cf .band div{display:flex;flex-direction:column;align-items:center;gap:10px;text-align:center;padding:0 14px;border-right:1px solid rgba(255,255,255,.2);font-size:15px;line-height:1.35}
        .cf .band div:last-child{border:0}.cf .band b{font-weight:600}.cf .band span{color:#ecd9c8;font-size:14.5px}
        .cf .bt{display:grid;grid-template-columns:1.15fr 1fr;gap:34px;align-items:start}
        .cf .fd{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:26px}
        .cf .fcard{background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 8px 20px rgba(74,35,20,.09)}
        .cf .fcard img{width:100%;aspect-ratio:4/3;object-fit:cover;display:block}
        .cf .fcard div{display:flex;justify-content:space-between;align-items:center;padding:12px 14px;font-weight:600;font-size:14.5px;gap:6px}
        .cf .gc{background:#fff;border-radius:20px;box-shadow:0 10px 28px rgba(74,35,20,.1);padding:24px;display:flex;gap:18px;align-items:center;margin-top:26px}
        .cf .gc img{width:96px;height:96px;border-radius:50%;object-fit:cover;flex:none}
        .cf .gc p{margin:6px 0 10px;font-family:Fraunces,serif;font-style:italic;font-size:17px;line-height:1.5}
        .cf .arr{width:40px;height:40px;border-radius:50%;border:1.5px solid #d9c3b1;background:#fff;cursor:pointer;font-size:16px;flex:none}
        .cf .loop{background:linear-gradient(100deg,${DK} 55%,#5a2e1a);border-radius:26px;color:#fff;display:grid;grid-template-columns:1.1fr 1.2fr .8fr;gap:24px;align-items:center;padding:30px 34px;margin:20px 0 60px;overflow:hidden;position:relative}
        .cf .loop h3{font-family:Fraunces,serif;font-weight:600;font-size:clamp(26px,3vw,36px);margin:0;line-height:1.1}.cf .loop h3 em{color:#f0b98a}
        .cf .loop p{margin:0 0 16px;color:#f3e3d4;font-size:16px;line-height:1.5}
        .cf .loop img{width:100%;max-width:230px;aspect-ratio:1;object-fit:cover;border-radius:50%;justify-self:end;box-shadow:0 10px 30px rgba(0,0,0,.4)}
        .cf footer{border-top:1px solid #e6d3c3;padding:34px 0}
        .cf .fr{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap}
        .cf .fr nav{display:flex;gap:26px;font-size:14.5px}.cf .fr nav a{cursor:pointer;color:${INK}}
        .cf .wa{position:fixed;right:18px;bottom:18px;z-index:40;width:58px;height:58px;border-radius:50%;background:#25d366;display:grid;place-items:center;box-shadow:0 8px 24px rgba(0,0,0,.3)}
        .cf .ov{position:fixed;inset:0;z-index:100;background:rgba(40,18,10,.6);display:flex;align-items:center;justify-content:center;padding:16px}
        .cf .md{background:${BG};width:100%;max-width:520px;max-height:92vh;overflow:auto;padding:32px;border-radius:26px;position:relative}
        .cf .md h3{font-family:Fraunces,serif;font-size:30px;margin:6px 0 4px;color:${BR}}
        .cf .tag{display:inline-block;background:${CR};color:${BR};border-radius:999px;padding:6px 14px;font-size:13px;font-weight:600}
        .cf .bars{display:flex;gap:6px;margin:14px 0 20px}.cf .bars i{flex:1;height:4px;border-radius:4px;background:#e6d3c3}.cf .bars i.on{background:${AC}}
        .cf .chip{padding:12px 6px;border:1.5px solid #e0cbb9;border-radius:12px;background:#fff;cursor:pointer;font-size:15px;text-align:center;min-height:46px}
        .cf .chip.on{background:${AC};color:#fff;border-color:${AC}}
        .cf .x{position:absolute;right:14px;top:12px;width:44px;height:44px;border:0;background:none;font-size:26px;cursor:pointer}
        .cf .mob{display:none}
        @media(max-width:900px){
          .cf .top .wrap span:nth-child(n+2){display:none}
          .cf .links,.cf .navbtn{display:none}.cf .burger{display:block}.cf .nav{height:68px}.cf .logo{font-size:22px}
          .cf .herogrid{grid-template-columns:1fr;min-height:0;gap:0}.cf .heroimg{min-height:300px;order:2;margin:20px -24px 0}.cf .heroimg img{position:relative;right:0;width:100%;height:320px;-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 25%);mask-image:linear-gradient(180deg,transparent 0,#000 25%)}
          .cf .hic{grid-template-columns:repeat(4,1fr);gap:8px}.cf .hic div{font-size:11.5px}
          .cf .dr{grid-template-columns:1fr 1fr;gap:12px}.cf .dr .dcard:last-child{grid-column:span 2}
          .cf .aboutgrid{grid-template-columns:1fr;gap:30px}.cf .band{grid-template-columns:1fr 1fr;gap:20px 0}.cf .band div:nth-child(2){border:0}
          .cf .bt{grid-template-columns:1fr;gap:40px}.cf .fd{gap:10px}.cf .fcard div{font-size:12.5px;padding:10px}
          .cf .loop{grid-template-columns:1fr;padding:26px 22px}.cf .loop img{display:none}
          .cf .fr{justify-content:center;text-align:center}.cf .fr nav{gap:18px;flex-wrap:wrap;justify-content:center}
          .cf .mob{display:block;background:#fff;border-radius:16px;margin:0 16px 10px;box-shadow:0 8px 24px rgba(74,35,20,.12)}.cf .mob a{display:block;padding:15px 20px;font-size:15px;cursor:pointer;border-top:1px solid #f3e6da}.cf .mob a:first-child{border:0}
          .cf .md{padding:26px 20px}
        }
      `}</style>

      <div className="top"><div className="wrap"><span>Rua das Acácias, 123, Savassi, {city}</span><span>Seg a sáb, 7h às 20h</span><span>Siga-nos no Instagram</span></div></div>
      <div className="hero">
        <header style={{ position: "relative", zIndex: 3, background: "rgba(255,250,245,.92)" }}>
          <div className="wrap nav">
            <div className="logo"><Ic d={CUP} s={34} />{brand}</div>
            <nav className="links"><a className="on" onClick={() => go("top")}>Início</a><a onClick={() => go("cardapio")}>Cardápio</a><a onClick={() => go("sobre")}>Sobre nós</a><a onClick={() => go("favoritos")}>Favoritos</a><a onClick={() => go("contato")}>Contato</a></nav>
            <button type="button" className="btn navbtn" onClick={start}>Reservar mesa <span aria-hidden>→</span></button>
            <button type="button" className="burger" aria-label="Menu" onClick={() => setMenu((m) => !m)}><svg width="26" height="26" viewBox="0 0 26 26" stroke={BR} strokeWidth="2"><path d="M3 7h20M3 13h20M3 19h20" /></svg></button>
          </div>
          {menu && <div className="mob"><a onClick={() => go("cardapio")}>Cardápio</a><a onClick={() => go("sobre")}>Sobre nós</a><a onClick={() => go("favoritos")}>Favoritos</a><a onClick={() => go("contato")}>Contato</a><a onClick={start} style={{ color: AC, fontWeight: 700 }}>Reservar mesa</a></div>}
        </header>
        <section id="top">
          <div className="wrap herogrid">
            <div style={{ padding: "30px 0" }}>
              <span className="kick">Experiência premium em café</span>
              <h1>Mais que<br /><em>só café</em></h1>
              <p className="lead">Café artesanal, quitutes fresquinhos e um ambiente aconchegante para relaxar, trabalhar e se conectar.</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button type="button" className="btn" onClick={start}>Reservar mesa <span aria-hidden>→</span></button>
                <button type="button" className="btn o" onClick={() => go("contato")}>Como chegar</button>
              </div>
              <div className="hic">{HERO_IC.map((h) => (<div key={h.t}><Ic d={h.ic} s={36} />{h.t}</div>))}</div>
            </div>
            <div className="heroimg"><img src="/cafe-hero.webp" alt="Xícara de latte com cookie" /></div>
          </div>
        </section>
      </div>

      <section className="sec" id="cardapio"><div className="wrap">
        <div className="sh"><h2>Nossas bebidas da casa</h2><i /><a onClick={start}>Reservar mesa →</a></div>
        <div className="dr">
          {DRINKS.map((d) => (
            <button type="button" className="dcard" key={d.n} onClick={start}>
              <div className="im"><img src={d.img} alt={d.n} loading="lazy" /></div>
              <div className="lb"><span>{d.n}<small>{d.p}</small></span><span className="go" aria-hidden>+</span></div>
            </button>
          ))}
        </div>
      </div></section>

      <section className="sec" id="sobre" style={{ paddingTop: 20 }}><div className="wrap">
        <div className="aboutgrid">
          <div className="room"><img src="/cafe-room.webp" alt="Salão da cafeteria" loading="lazy" /></div>
          <div>
            <span className="eb">{brand}</span>
            <h2 style={{ marginTop: 12 }}>Uma cafeteria moderna para <em>quem ama café</em></h2>
            <p style={{ fontSize: 16.5, lineHeight: 1.7, color: "#4b3328", margin: "18px 0 26px", maxWidth: 420 }}>Unimos café de qualidade, comida gostosa e um espaço quente e elegante para cada momento do seu dia.</p>
            <button type="button" className="btn" onClick={start}>Nossa história <span aria-hidden>→</span></button>
          </div>
        </div>
        <div className="band">{PERKS.map((p) => (<div key={p.t}><Ic d={p.ic} s={38} c="#f0b98a" /><b>{p.t}</b><span>{p.d}</span></div>))}</div>
      </div></section>

      <section className="sec" id="favoritos" style={{ paddingTop: 10 }}><div className="wrap bt">
        <div>
          <div className="sh"><h2>Mais vendidos</h2><i /></div>
          <div className="fd">{FOODS.map((f) => (<div className="fcard" key={f.n}><img src={f.img} alt={f.n} loading="lazy" /><div><span>{f.n}<small>{f.p}</small></span><span className="go" aria-hidden>+</span></div></div>))}</div>
        </div>
        <div>
          <div className="sh"><h2>O que dizem os clientes</h2><i /></div>
          <div className="gc">
            <img src="/cafe-guest.webp" alt={t.n} />
            <div style={{ flex: 1 }}>
              <div style={{ color: "#e2a31b", letterSpacing: 2 }}>★★★★★</div>
              <p>“{t.q}”</p><b style={{ fontSize: 14 }}>{t.n}</b>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button type="button" className="arr" aria-label="Anterior" onClick={() => setTi((ti + TESTI.length - 1) % TESTI.length)}>←</button>
              <button type="button" className="arr" aria-label="Próximo" onClick={() => setTi((ti + 1) % TESTI.length)}>→</button>
            </div>
          </div>
        </div>
      </div></section>

      <div className="wrap"><div className="loop">
        <h3>Venha tomar um café <em>com a gente!</em></h3>
        <div><p>Reserve sua mesa e garanta aquele cantinho confortável. Atendemos de segunda a sábado.</p><button type="button" className="btn" onClick={start}>Reservar mesa <span aria-hidden>→</span></button></div>
        <img src="/cafe-cup.webp" alt="Xícara de café" />
      </div></div>

      <footer id="contato"><div className="wrap">
        <div className="fr">
          <div className="logo"><Ic d={CUP} s={30} />{brand}</div>
          <nav><a onClick={() => go("top")}>Início</a><a onClick={() => go("cardapio")}>Cardápio</a><a onClick={() => go("sobre")}>Sobre nós</a><a onClick={() => go("favoritos")}>Favoritos</a></nav>
          <div style={{ fontSize: 15, color: "#4b3328", lineHeight: 1.6 }}>Rua das Acácias, 123, Savassi, {city}<br />Seg a sáb, 7h às 20h · Dom, 8h às 14h<br />Instagram @{brand.normalize("NFD").toLowerCase().replace(/[^a-z]+/g, "")}<br /><a href={`https://wa.me/${num}`} target="_blank" rel="noreferrer" style={{ color: AC, fontWeight: 600 }}>Falar no WhatsApp</a></div>
        </div>
      </div></footer>

      {sc && <a className="wa" href={`https://wa.me/${num}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg></a>}

      {open && (
        <div className="ov" onClick={(e) => e.target === e.currentTarget && setOpen(false)} role="dialog" aria-modal="true" aria-label="Reservar mesa">
          <div className="md">
            <button type="button" className="x" aria-label="Fechar" onClick={() => setOpen(false)}>×</button>
            <span className="tag">Passo {step} de 3</span>
            <h3>{["Quantas pessoas?", "Dia e horário", "Confirme sua reserva"][step - 1]}</h3>
            <div className="bars">{[1, 2, 3].map((n) => <i key={n} className={n <= step ? "on" : ""} />)}</div>
            {step === 1 && (<div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
              {[1, 2, 3, 4, 5, 6].map((n) => (<button type="button" key={n} className={`chip${ppl === n ? " on" : ""}`} onClick={() => setPpl(n)}><b style={{ fontSize: 20 }}>{n}</b><small style={{ display: "block" }}>{n === 1 ? "pessoa" : "pessoas"}</small></button>))}
            </div>)}
            {step === 2 && (<div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 16 }}>
                {days.map((d, i) => (<button type="button" key={d.label} className={`chip${day === i ? " on" : ""}`} onClick={() => setDay(i)}><small style={{ display: "block", textTransform: "uppercase", fontSize: 11, letterSpacing: 1 }}>{d.dow}</small><b style={{ fontSize: 18 }}>{d.d}</b></button>))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                {TIMES.map((x) => (<button type="button" key={x} className={`chip${time === x ? " on" : ""}`} onClick={() => setTime(x)}>{x}</button>))}
              </div>
            </div>)}
            {step === 3 && (<div>
              <div style={{ background: "#fff", border: "1.5px solid #e0cbb9", borderRadius: 14, padding: 18, fontSize: 15.5, lineHeight: 1.9 }}>
                <b>Mesa para {ppl} {ppl === 1 ? "pessoa" : "pessoas"}</b><br />{days[day]?.label} às {time}<br /><span style={{ color: "#7a5a47", fontSize: 14 }}>{brand}, {city}</span>
              </div>
              <input value={cust} onChange={(e) => setCust(e.target.value)} placeholder="Seu nome" aria-label="Seu nome" style={{ width: "100%", marginTop: 14, minHeight: 50, padding: "0 16px", border: "1.5px solid #e0cbb9", borderRadius: 14, fontSize: 15.5, background: "#fff" }} />
            </div>)}
            <div style={{ display: "flex", gap: 10, marginTop: 22, justifyContent: "space-between" }}>
              {step > 1 ? <button type="button" className="btn o" onClick={() => setStep(step - 1)}>Voltar</button> : <span />}
              {step < 3 ? (
                <button type="button" className="btn" disabled={step === 2 && !time} style={{ opacity: step === 2 && !time ? 0.4 : 1 }} onClick={() => setStep(step + 1)}>Continuar</button>
              ) : (
                <a className="btn" href={wa} target="_blank" rel="noreferrer">Confirmar no WhatsApp</a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
