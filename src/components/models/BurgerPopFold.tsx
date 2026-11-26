import { useEffect, useState } from "react";

/** Hamburgueria pop e colorida, do zero a partir de um pin vibrante laranja/amarelo (Vibrant Pizza & Burger). Pedido em 3 passos que fecha no WhatsApp com total estimado. */
const YEL = "#ffb000", RED = "#e8342e", CR = "#fff6ec", INK = "#2b1a12", MU = "#7a5c4e", TEAL = "#0d9488";
const BURGERS = [
  { n: "Smash Clássico", d: "2 carnes, cheddar, alface, tomate e molho pop", p: 27, img: "/bg-b1.webp" },
  { n: "Bacon Explosão", d: "2 carnes, bacon crocante e cebola caramelizada", p: 32, img: "/bg-b2.webp" },
  { n: "Frango Crunch", d: "Frango empanado crocante, coleslaw e picles", p: 29, img: "/bg-b3.webp" },
  { n: "Veggie da Hora", d: "Grão de bico, queijo coalho, abacate e rúcula", p: 28, img: "/bg-b4.webp" },
];
const EXTRAS = [
  { n: "Fritas com cheddar", p: 14, img: "/bg-fries.webp" },
  { n: "Milkshake da casa", p: 16, img: "/bg-shake.webp" },
];
const PERKS = [
  { t: "Smash na chapa", d: "Carne prensada na hora, crosta perfeita", ic: "M12 2c2 4-2 5-2 8a2 2 0 0 0 4 0c0-1-.5-2-.5-2s3.5 1.5 3.5 5a5 5 0 0 1-10 0c0-5 5-6 5-11z" },
  { t: "Pão brioche da casa", d: "Assado toda manhã na nossa cozinha", ic: "M4 10a8 8 0 0 1 16 0c0 2-1 3-2 3v6a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-6c-1 0-2-1-2-3z" },
  { t: "Cheddar de verdade", d: "Derretido na carne, não em cima", ic: "M12 2 2 9l10 7 10-7-10-7zM2 14l10 7 10-7" },
  { t: "Entrega em 40 min", d: "Chega quente ou a próxima é por nossa conta", ic: "M12 2v10l6 4M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z" },
];
const REVIEWS = [
  { q: "O bacon explosão é absurdo de bom. Chegou em meia hora, quentinho, com a caixa mais bonita que já vi.", n: "Lari M., Pedra Branca" },
  { q: "Milkshake de doce de leite com o smash clássico: melhor combinação de Curitiba, sem discussão.", n: "Dudu F., Alto da XV" },
  { q: "Pedi pro escritório inteiro pelo WhatsApp, super prático. O frango crunch virou febre aqui.", n: "Camila R., Batel" },
];
const Ic = ({ d, s = 26, c = INK }: { d: string; s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);
const FLAME = "M12 2c2 4-2 5-2 8a2 2 0 0 0 4 0c0-1-.5-2-.5-2s3.5 1.5 3.5 5a5 5 0 0 1-10 0c0-5 5-6 5-11z";

export function BurgerPopFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Burgeria Pop";
  const city = client?.city?.trim() || "Curitiba";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [burger, setBurger] = useState(BURGERS[0]!);
  const [extras, setExtras] = useState<string[]>([]);
  const [qty, setQty] = useState(1);
  const [cust, setCust] = useState("");
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const start = (b?: (typeof BURGERS)[number]) => { if (b) setBurger(b); setStep(1); setOpen(true); setMenu(false); };
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const toggleEx = (n: string) => setExtras((xs) => xs.includes(n) ? xs.filter((x) => x !== n) : [...xs, n]);
  const exTotal = extras.reduce((acc, n) => acc + (EXTRAS.find((e) => e.n === n)?.p ?? 0), 0);
  const total = burger.p * qty + exTotal;
  const money = (v: number) => `R$ ${v.toFixed(2).replace(".", ",")}`;
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero pedir na ${brand}${cust ? ` em nome de ${cust}` : ""}: ${qty}x ${burger.n}${extras.length ? ` + ${extras.join(", ")}` : ""} (total estimado ${money(total)}).`)}`;

  return (
    <div className="bp" style={{ fontFamily: "Nunito, system-ui, sans-serif", color: INK, background: CR, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Nunito:wght@400;600;700;800&display=swap');
        .bp *{box-sizing:border-box}
        .bp a,.bp button{font-family:inherit}
        .bp .wrap{max-width:1180px;margin:0 auto;padding:0 24px}
        .bp .nav{display:flex;align-items:center;justify-content:space-between;height:84px;gap:20px}
        .bp .logo{display:flex;align-items:center;gap:10px;font-family:'Baloo 2',cursive;font-weight:800;font-size:27px;color:${INK}}
        .bp .logo .mark{width:42px;height:42px;border-radius:50%;background:${RED};display:grid;place-items:center;transform:rotate(-6deg)}
        .bp .links{display:flex;gap:30px;font-size:15.5px;font-weight:700}
        .bp .links a{color:${MU};cursor:pointer;transition:color .2s}.bp .links a:hover{color:${RED}}
        .bp .btn{background:${RED};color:#fff;border:0;border-radius:999px;padding:0 26px;min-height:52px;font-weight:800;font-size:15.5px;cursor:pointer;display:inline-flex;align-items:center;gap:10px;text-decoration:none;box-shadow:0 4px 0 #a51f1b}
        .bp .btn:hover{background:#f04438}
        .bp .btn:active{transform:translateY(2px);box-shadow:0 2px 0 #a51f1b}
        .bp .btn.o{background:#fff;color:${INK};box-shadow:0 4px 0 #e3d3c2}
        .bp .btn.o:hover{background:#fffaf2}
        .bp .burger{display:none;background:none;border:0;width:44px;height:44px;cursor:pointer}
        .bp .hero{background:${YEL};position:relative;overflow:hidden}
        .bp .herogrid{display:grid;grid-template-columns:1fr 1.05fr;align-items:center;gap:34px;min-height:600px;padding:30px 0 64px}
        .bp .sticker{display:inline-block;background:${RED};color:#fff;font-weight:800;font-size:13px;letter-spacing:2.5px;text-transform:uppercase;padding:8px 16px;border-radius:999px;transform:rotate(-2deg);box-shadow:0 3px 0 #a51f1b}
        .bp h1{font-family:'Baloo 2',cursive;font-weight:800;font-size:clamp(46px,5.8vw,76px);line-height:.98;margin:20px 0 0;color:${INK};letter-spacing:-1px}
        .bp h1 .hl{background:${RED};color:#fff;padding:0 14px;border-radius:12px;display:inline-block;transform:rotate(-1.5deg)}
        .bp .lead{font-size:18px;line-height:1.65;color:#5c3a28;margin:22px 0 28px;max-width:450px;font-weight:600}
        .bp .himg{position:relative}
        .bp .himg img{width:100%;border-radius:28px;border:5px solid #fff;box-shadow:0 24px 50px rgba(90,40,0,.3);display:block}
        .bp .himg .off{position:absolute;right:-14px;top:-18px;background:${TEAL};color:#fff;font-family:'Baloo 2',cursive;font-weight:800;font-size:17px;padding:14px 18px;border-radius:16px;transform:rotate(4deg);box-shadow:0 8px 20px rgba(0,0,0,.25)}
        .bp .marq{background:${RED};color:#fff;overflow:hidden;padding:14px 0;transform:rotate(-1deg);margin:-14px -20px 0}
        .bp .marq .in{display:flex;gap:36px;white-space:nowrap;font-family:'Baloo 2',cursive;font-weight:800;font-size:20px;letter-spacing:2px}
        .bp .sec{padding:76px 0}
        .bp .center{text-align:center;max-width:640px;margin:0 auto}
        .bp .kick{color:${RED};font-weight:800;font-size:13px;letter-spacing:3px;text-transform:uppercase}
        .bp h2{font-family:'Baloo 2',cursive;font-weight:800;font-size:clamp(32px,3.8vw,48px);margin:10px 0 0;color:${INK};line-height:1.05}
        .bp .sub{color:${MU};font-size:16.5px;margin-top:12px;line-height:1.6;font-weight:600}
        .bp .grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:42px}
        .bp .card{background:#fff;border-radius:22px;overflow:hidden;transition:transform .25s,box-shadow .25s;cursor:pointer;display:flex;flex-direction:column;border:3px solid transparent}
        .bp .card:hover{transform:translateY(-6px) rotate(-.5deg);box-shadow:0 18px 36px rgba(90,40,0,.18);border-color:${YEL}}
        .bp .card img{width:100%;aspect-ratio:1/1;object-fit:cover;display:block}
        .bp .card .lb{padding:16px 16px 18px;display:flex;flex-direction:column;flex:1}
        .bp .card b{font-family:'Baloo 2',cursive;font-size:21px;font-weight:800;display:block;color:${INK}}
        .bp .card small{color:${MU};font-size:13.5px;display:block;margin-top:3px;font-weight:600}
        .bp .card .pr{margin-top:auto;padding-top:12px;display:flex;align-items:center;justify-content:space-between;gap:8px}
        .bp .card .pr span{color:${RED};font-weight:800;font-size:17px;white-space:nowrap}
        .bp .card .go{width:34px;height:34px;border-radius:50%;background:${YEL};color:${INK};display:grid;place-items:center;font-size:16px;flex:none;font-weight:800}
        .bp .sides{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;margin-top:18px}
        .bp .side{position:relative;border-radius:22px;overflow:hidden;min-height:230px;display:flex;align-items:flex-end;cursor:pointer}
        .bp .side img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .5s}
        .bp .side:hover img{transform:scale(1.05)}
        .bp .side .ov{position:relative;width:100%;padding:52px 20px 18px;background:linear-gradient(180deg,rgba(43,26,18,0) 0%,rgba(43,26,18,.85) 75%);color:#fff;display:flex;justify-content:space-between;align-items:flex-end;gap:10px}
        .bp .side b{font-family:'Baloo 2',cursive;font-size:23px;font-weight:800;display:block}
        .bp .side small{font-size:14px;color:#ffe9d2;font-weight:700}
        .bp .split{display:grid;grid-template-columns:1fr 1fr;gap:44px;align-items:center}
        .bp .split .pic{position:relative}
        .bp .split .pic img{width:100%;border-radius:26px;object-fit:cover;display:block;border:5px solid #fff;box-shadow:0 20px 44px rgba(90,40,0,.18)}
        .bp .split .pic .tag{position:absolute;left:20px;bottom:-18px;background:${YEL};font-family:'Baloo 2',cursive;font-weight:800;font-size:16px;padding:12px 18px;border-radius:14px;transform:rotate(-2deg);box-shadow:0 8px 20px rgba(90,40,0,.25)}
        .bp .perks{margin-top:30px;display:flex;flex-direction:column;gap:20px}
        .bp .perk{display:flex;gap:14px;align-items:flex-start}
        .bp .perk .ic{width:48px;height:48px;flex:none;border-radius:14px;background:#fff;border:2px dashed ${YEL};display:grid;place-items:center}
        .bp .perk b{display:block;font-size:16px;font-family:'Baloo 2',cursive;font-weight:800}
        .bp .perk small{color:${MU};font-size:13.5px;font-weight:600}
        .bp .g3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:42px}
        .bp .rev{background:#fff;border-radius:22px;padding:28px 24px;box-shadow:0 10px 28px rgba(90,40,0,.10)}
        .bp .rev .star{color:${YEL};letter-spacing:3px;font-size:15px}
        .bp .rev p{font-size:15px;line-height:1.65;color:#4a3226;margin:14px 0 16px;font-weight:600}
        .bp .rev b{font-size:13px;font-weight:800;letter-spacing:.4px;color:${INK};display:block}
        .bp .cta{background:${RED};color:#fff;padding:76px 0;position:relative;overflow:hidden;text-align:center}
        .bp .cta h2{color:#fff}
        .bp .cta .sub{color:#ffd9d2}
        .bp .btn.w{background:#fff;color:${INK};box-shadow:0 4px 0 #e3d3c2;margin-top:26px}
        .bp .btn.w:hover{background:#fff8ec}
        .bp .steps{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-top:34px}
        .bp .stp{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.3);color:#fff;padding:10px 18px;border-radius:999px;font-size:14px;font-weight:700}
        .bp .flames{position:absolute;bottom:18px;left:0;right:0;display:flex;justify-content:space-between;padding:0 30px;opacity:.25}
        .bp .foot{background:${INK};color:#e9d5c3;padding:46px 0}
        .bp .foot .row{display:flex;justify-content:space-between;align-items:flex-start;gap:30px;flex-wrap:wrap}
        .bp .foot .logo{color:#fff}
        .bp .foot small{display:block;color:#9c7a64;font-size:13.5px;line-height:1.7;margin-top:10px;max-width:340px;font-weight:600}
        .bp .foot nav{display:flex;gap:22px;font-size:14.5px;font-weight:700}
        .bp .foot nav a{color:#e9d5c3;cursor:pointer}
        .bp .foot nav a:hover{color:${YEL}}
        .bp .foot .cp{text-align:center;margin-top:34px;padding-top:20px;border-top:1px solid rgba(233,213,195,.15);font-size:13px;color:#9c7a64}
        .bp .overlay{position:fixed;inset:0;background:rgba(43,26,18,.6);z-index:60;display:flex;align-items:center;justify-content:center;padding:18px}
        .bp .modal{background:#fff;width:100%;max-width:560px;border-radius:26px;padding:28px;max-height:92vh;overflow-y:auto;border:4px solid ${YEL}}
        .bp .mhead{display:flex;justify-content:space-between;align-items:flex-start}
        .bp .modal h3{margin:0;font-family:'Baloo 2',cursive;font-size:27px;font-weight:800;color:${INK}}
        .bp .modal .x{background:#fff3dc;border:0;width:34px;height:34px;border-radius:50%;font-size:17px;cursor:pointer;color:${INK};font-weight:800}
        .bp .dotrow{display:flex;gap:6px;margin:14px 0 20px}
        .bp .dot{flex:1;height:7px;border-radius:99px;background:#f0e2d2}
        .bp .dot.on{background:${RED}}
        .bp .opts{display:grid;grid-template-columns:1fr 1fr;gap:12px}
        .bp .opt{border:3px solid #f0e2d2;border-radius:16px;padding:12px;display:flex;gap:12px;align-items:center;cursor:pointer;background:#fff;transition:border-color .15s,background .15s}
        .bp .opt.sel{border-color:${RED};background:#fff5f3}
        .bp .opt img{width:56px;height:56px;border-radius:12px;object-fit:cover;flex:none}
        .bp .opt b{display:block;font-size:14.5px;font-family:'Baloo 2',cursive;font-weight:800;color:${INK}}
        .bp .opt small{display:block;color:${MU};font-size:12px;font-weight:600}
        .bp .opt .pl{margin-left:auto;color:${RED};font-weight:800;font-size:13px;white-space:nowrap}
        .bp .xrow{display:flex;flex-direction:column;gap:10px}
        .bp .xopt{border:3px solid #f0e2d2;border-radius:16px;padding:14px 16px;display:flex;gap:14px;align-items:center;cursor:pointer;background:#fff}
        .bp .xopt.sel{border-color:${TEAL};background:#f0faf9}
        .bp .xopt img{width:52px;height:52px;border-radius:12px;object-fit:cover}
        .bp .xopt b{font-size:15px;font-family:'Baloo 2',cursive;font-weight:800;color:${INK}}
        .bp .xopt small{display:block;color:${MU};font-size:12px;font-weight:600}
        .bp .xopt .pl{margin-left:auto;color:${TEAL};font-weight:800;font-size:13.5px}
        .bp .qrow{display:flex;align-items:center;justify-content:center;gap:16px;margin:18px 0 26px}
        .bp .qbtn{width:44px;height:44px;border-radius:50%;border:3px solid ${YEL};background:#fff;font-size:20px;font-weight:800;color:${INK};cursor:pointer}
        .bp .qty{font-family:'Baloo 2',cursive;font-size:26px;font-weight:800;min-width:46px;text-align:center}
        .bp .inp{width:100%;border:3px solid #f0e2d2;border-radius:14px;padding:13px 16px;font:600 15.5px Nunito,sans-serif;color:${INK};background:#fff}
        .bp .inp:focus{outline:none;border-color:${YEL}}
        .bp .mlabel{font-size:13px;font-weight:800;letter-spacing:1.6px;text-transform:uppercase;color:${MU};display:block;margin:0 0 10px}
        .bp .sum{background:#fff8ec;border:2px dashed ${YEL};border-radius:16px;padding:16px 18px;margin-top:18px;font-size:14.5px;font-weight:600}
        .bp .sum .tr{display:flex;justify-content:space-between;padding:3px 0}
        .bp .sum .tot{border-top:2px solid ${YEL};margin-top:8px;padding-top:8px;font-weight:800;font-size:16px;color:${RED}}
        .bp .mact{display:flex;gap:10px;margin-top:24px}
        .bp .mact .btn{flex:1;justify-content:center}
        .bp .mact .back{background:#fff;color:${INK};border:3px solid #f0e2d2;box-shadow:none;flex:0 0 auto;padding:0 20px}
        .bp .fab{position:fixed;bottom:22px;right:22px;z-index:50;transform:translateY(90px);transition:transform .3s}
        .bp .fab.on{transform:none}
        @media(max-width:1024px){.bp .grid4{grid-template-columns:repeat(2,1fr)}.bp .g3{grid-template-columns:1fr}.bp .split{grid-template-columns:1fr;gap:52px}}
        .bp .nav .btn.ctanav{white-space:nowrap}
        @media(max-width:860px){
          .bp .links{display:none}.bp .burger{display:block}
          .bp .nav .btn.ctanav{display:none}
          .bp .logo{font-size:22px;white-space:nowrap}
          .bp .logo .mark{width:36px;height:36px}
          .bp .lead{font-size:17px}
          .bp .himg .off{right:6px;top:-14px;font-size:14px;padding:10px 14px}
          .bp .mnav{position:fixed;inset:0 0 0 auto;width:min(320px,86vw);background:#fff;z-index:70;padding:88px 28px;display:flex;flex-direction:column;gap:6px;transform:translateX(100%);transition:transform .25s;box-shadow:-14px 0 44px rgba(43,26,18,.25)}
          .bp .mnav.on{transform:none}
          .bp .mnav a{padding:14px 12px;font-size:18px;font-weight:800;border-bottom:2px solid #f6eada;cursor:pointer;color:${INK};font-family:'Baloo 2',cursive}
          .bp .herogrid{grid-template-columns:1fr;min-height:unset;padding:24px 0 56px;gap:28px}
          .bp .himg{max-width:520px;margin:0 auto;width:100%}
          .bp .opts{grid-template-columns:1fr}
          .bp .sides{grid-template-columns:1fr}
          .bp .sec{padding:56px 0}
        }
        @media(min-width:861px){.bp .mnav{display:none}}
        @media(prefers-reduced-motion:reduce){.bp *{transition:none!important}}
      `}</style>

      <header className="hero" id="topo">
        <div className="wrap">
          <nav className="nav">
            <span className="logo"><span className="mark"><Ic d={FLAME} s={22} c="#fff" /></span>{brand}</span>
            <div className="links">
              <a onClick={() => go("cardapio")}>Cardápio</a><a onClick={() => go("casa")}>A casa</a><a onClick={() => go("avaliacoes")}>Avaliações</a><a onClick={() => go("contato")}>Contato</a>
            </div>
            <button className="btn ctanav" onClick={() => start()}>Pedir no WhatsApp</button>
            <button className="burger" onClick={() => setMenu(!menu)} aria-label="Abrir menu">
              <Ic d={menu ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"} s={26} />
            </button>
          </nav>
        </div>
        <div className="wrap herogrid">
          <div>
            <span className="sticker">Smash na chapa · {city}</span>
            <h1>O burger mais <span className="hl">colorido</span> da cidade</h1>
            <p className="lead">Carnes prensadas na hora, cheddar derretido de verdade, pão brioche da casa e um cardápio que parece uma festa. Pede no WhatsApp e chega quentinho em 40 minutos.</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="btn" onClick={() => start()}>Montar meu pedido</button>
              <button className="btn o" onClick={() => go("cardapio")}>Ver o cardápio</button>
            </div>
          </div>
          <div className="himg">
            <img src="/bg-hero.webp" alt="Smash burgers do Burgeria Pop sobre fundo laranja" width={1600} height={900} />
            <span className="off">combo do dia −20%</span>
          </div>
        </div>
        <div className="marq"><div className="in">
          <span>SMASH</span><span>·</span><span>CHEDDAR DE VERDADE</span><span>·</span><span>BRIOCHE DA CASA</span><span>·</span><span>FRITAS CROCANTES</span><span>·</span><span>MILKSHAKE</span><span>·</span><span>SMASH</span><span>·</span><span>CHEDDAR DE VERDADE</span><span>·</span><span>BRIOCHE DA CASA</span><span>·</span><span>FRITAS CROCANTES</span><span>·</span><span>MILKSHAKE</span><span>·</span>
        </div></div>
      </header>

      <section className="sec" id="cardapio">
        <div className="wrap">
          <div className="center">
            <span className="kick">Cardápio</span>
            <h2>Escolhe o seu e já pede no WhatsApp</h2>
            <p className="sub">Quatro burgers, todos na chapa, todos com personalidade. Toca em um card para montar o pedido em menos de um minuto.</p>
          </div>
          <div className="grid4">
            {BURGERS.map((b) => (
              <button key={b.n} className="card" style={{ border: "3px solid transparent", textAlign: "left", padding: 0 }} onClick={() => start(b)}>
                <img src={b.img} alt={b.n} width={800} height={800} loading="lazy" />
                <span className="lb">
                  <b>{b.n}</b><small>{b.d}</small>
                  <span className="pr"><span>{money(b.p)}</span><span className="go">+</span></span>
                </span>
              </button>
            ))}
          </div>
          <div className="sides">
            {EXTRAS.map((x) => (
              <button key={x.n} className="side" style={{ border: 0, padding: 0, textAlign: "left" }} onClick={() => start()}>
                <img src={x.img} alt={x.n} width={800} height={800} loading="lazy" />
                <span className="ov"><span><b>{x.n}</b><small>pra acompanhar</small></span><span style={{ fontWeight: 800, fontSize: 16, color: "#ffd166" }}>{money(x.p)}</span></span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="casa" style={{ background: "#ffe3b3" }}>
        <div className="wrap split">
          <div className="pic">
            <img src="/bg-store.webp" alt={`Salão da ${brand} com mesas retrô`} width={1200} height={900} loading="lazy" />
            <span className="tag">desde 2021 em {city}</span>
          </div>
          <div>
            <span className="kick">A casa</span>
            <h2>Um pedacinho de lanchonete americana, com cara de {city}</h2>
            <p className="sub">A {brand} nasceu de um trailer numa feira de rua. Hoje é o point dos smash burgers da cidade: mesas coloridas, playlist animada e aquela chapa que não para. Tudo feito na hora, na sua frente.</p>
            <div className="perks">
              {PERKS.map((p) => (
                <div key={p.t} className="perk">
                  <span className="ic"><Ic d={p.ic} s={24} c={RED} /></span>
                  <span><b>{p.t}</b><small>{p.d}</small></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sec" id="avaliacoes">
        <div className="wrap">
          <div className="center">
            <span className="kick">Avaliações</span>
            <h2>Quem pediu, voltou</h2>
            <p className="sub">4,9 de média nos apps de entrega, com centenas de avaliações cinco estrelas.</p>
          </div>
          <div className="g3">
            {REVIEWS.map((r) => (
              <div key={r.n} className="rev">
                <span className="star">★★★★★</span>
                <p>{r.q}</p>
                <b>{r.n}</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta" id="contato">
        <div className="wrap">
          <span className="sticker" style={{ background: "#fff", color: RED, boxShadow: "0 3px 0 #e3d3c2" }}>Aberto hoje até 23h</span>
          <h2 style={{ marginTop: 18 }}>Bateu a fome?<br />Resolve em 3 passos.</h2>
          <p className="sub" style={{ maxWidth: 460, margin: "14px auto 0" }}>Escolhe o burger, adiciona fritas e shake se quiser, e o pedido chega pronto no nosso WhatsApp. Sem cadastro, sem app, sem enrolação.</p>
          <div className="steps">
            <span className="stp">1 · escolhe o burger</span>
            <span className="stp">2 · adiciona os extras</span>
            <span className="stp">3 · envia no WhatsApp</span>
          </div>
          <button className="btn w" onClick={() => start()}>Começar meu pedido
            <Ic d="M5 12h14m-6-6 6 6-6 6" s={18} c={INK} />
          </button>
          <div className="flames">
            <Ic d={FLAME} s={44} c="#fff" /><Ic d={FLAME} s={60} c="#fff" /><Ic d={FLAME} s={44} c="#fff" />
          </div>
        </div>
      </section>

      <footer className="foot">
        <div className="wrap">
          <div className="row">
            <div>
              <span className="logo"><span className="mark"><Ic d={FLAME} s={22} c="#fff" /></span>{brand}</span>
              <small>Rua das Flores, 1234, Centro, {city}<br />Segunda a sábado, das 18h às 23h</small>
            </div>
            <nav>
              <a onClick={() => go("cardapio")}>Cardápio</a>
              <a onClick={() => go("casa")}>A casa</a>
              <a onClick={() => go("avaliacoes")}>Avaliações</a>
              <a onClick={() => start()}>Pedir agora</a>
            </nav>
          </div>
          <p className="cp">© 2026 {brand}. Site vitrine com pedido por WhatsApp, feito sob medida.</p>
        </div>
      </footer>

      {menu && (
        <>
          <div className="overlay" style={{ background: "rgba(43,26,18,.4)" }} onClick={() => setMenu(false)} />
          <aside className={`mnav ${menu ? "on" : ""}`}>
            <a onClick={() => go("cardapio")}>Cardápio</a>
            <a onClick={() => go("casa")}>A casa</a>
            <a onClick={() => go("avaliacoes")}>Avaliações</a>
            <a onClick={() => go("contato")}>Contato</a>
            <button className="btn" style={{ marginTop: 18, justifyContent: "center" }} onClick={() => start()}>Pedir no WhatsApp</button>
          </aside>
        </>
      )}

      {open && (
        <div className="overlay" onClick={() => setOpen(false)}>
          <div className="modal" role="dialog" aria-modal="true" aria-label="Fazer pedido" onClick={(e) => e.stopPropagation()}>
            <div className="mhead">
              <h3>{step === 1 ? "Escolhe o burger" : step === 2 ? "Turbina o pedido" : "Tudo certo?"}</h3>
              <button className="x" onClick={() => setOpen(false)} aria-label="Fechar">✕</button>
            </div>
            <div className="dotrow"><span className={`dot ${step >= 1 ? "on" : ""}`} /><span className={`dot ${step >= 2 ? "on" : ""}`} /><span className={`dot ${step >= 3 ? "on" : ""}`} /></div>

            {step === 1 && (
              <>
                <div className="opts">
                  {BURGERS.map((b) => (
                    <div key={b.n} className={`opt ${burger.n === b.n ? "sel" : ""}`} onClick={() => setBurger(b)} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && setBurger(b)}>
                      <img src={b.img} alt="" width={56} height={56} />
                      <span><b>{b.n}</b><small>{b.d}</small></span>
                      <span className="pl">{money(b.p)}</span>
                    </div>
                  ))}
                </div>
                <div className="mact"><button className="btn" onClick={() => setStep(2)}>Continuar<Ic d="M5 12h14m-6-6 6 6-6 6" s={18} c="#fff" /></button></div>
              </>
            )}

            {step === 2 && (
              <>
                <label className="mlabel">Quantidade de {burger.n}</label>
                <div className="qrow">
                  <button className="qbtn" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Diminuir">−</button>
                  <span className="qty">{qty}</span>
                  <button className="qbtn" onClick={() => setQty(Math.min(10, qty + 1))} aria-label="Aumentar">+</button>
                </div>
                <label className="mlabel">Quer adicionar?</label>
                <div className="xrow">
                  {EXTRAS.map((x) => (
                    <div key={x.n} className={`xopt ${extras.includes(x.n) ? "sel" : ""}`} onClick={() => toggleEx(x.n)} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && toggleEx(x.n)}>
                      <img src={x.img} alt="" width={52} height={52} />
                      <span><b>{x.n}</b><small>{extras.includes(x.n) ? "adicionado" : "toca pra adicionar"}</small></span>
                      <span className="pl">+{money(x.p)}</span>
                    </div>
                  ))}
                </div>
                <label className="mlabel" style={{ marginTop: 20 }}>Seu nome (opcional)</label>
                <input className="inp" value={cust} onChange={(e) => setCust(e.target.value)} placeholder="Como te chamamos?" />
                <div className="mact">
                  <button className="btn back" onClick={() => setStep(1)}>Voltar</button>
                  <button className="btn" onClick={() => setStep(3)}>Revisar pedido<Ic d="M5 12h14m-6-6 6 6-6 6" s={18} c="#fff" /></button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <label className="mlabel">Resumo do pedido</label>
                <div className="sum">
                  <div className="tr"><span>{qty}x {burger.n}</span><span>{money(burger.p * qty)}</span></div>
                  {extras.map((n) => {
                    const e = EXTRAS.find((x) => x.n === n);
                    return e ? <div key={n} className="tr"><span>+ {e.n}</span><span>{money(e.p)}</span></div> : null;
                  })}
                  <div className="tr tot"><span>Total estimado</span><span>{money(total)}</span></div>
                </div>
                <p style={{ fontSize: 13.5, color: MU, margin: "14px 0 0", fontWeight: 600 }}>A gente confirma o pedido e o tempo de entrega no WhatsApp. Pagamento na entrega ou por Pix.</p>
                <div className="mact">
                  <button className="btn back" onClick={() => setStep(2)}>Voltar</button>
                  <a className="btn" href={wa} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
                    Enviar no WhatsApp
                    <Ic d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 0" s={18} c="#fff" />
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <button className={`fab btn ${sc && !open ? "on" : ""}`} onClick={() => start()} aria-label="Fazer pedido">
        Fazer pedido
      </button>
    </div>
  );
}
