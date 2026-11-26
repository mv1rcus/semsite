import { useEffect, useRef, useState } from "react";

/** Barbearia nova, construida do zero a partir de um pin claro e elegante (creme, preto e dourado). Agendamento de verdade em 4 passos que fecha no WhatsApp. */
const INK = "#141414", GOLD = "#7d5c2e", CREAM = "#faf8f4", SAND = "#f1ede6", DARK = "#16211e";
const SERVICES = [
  { id: "corte", n: "Corte", p: 55, min: 40, img: "/barber-s1.webp" },
  { id: "barba", n: "Barba", p: 40, min: 30, img: "/barber-s2.webp" },
  { id: "lavagem", n: "Lavagem", p: 25, min: 15, img: "/barber-s3.webp" },
  { id: "kids", n: "Corte infantil", p: 45, min: 30, img: "/barber-s4.webp" },
];
const EXTRA = [{ n: "Corte + Barba", p: 85 }, { n: "Sobrancelha", p: 15 }, { n: "Pigmentação", p: 50 }, { n: "Hidratação capilar", p: 35 }];
const TEAM = [{ n: "Rafael", r: "Degradês e navalhado", img: "/barber-b1.webp" }, { n: "Thiago", r: "Cortes modernos", img: "/barber-b2.webp" }, { n: "Seu Nilton", r: "Barba e clássicos", img: "/barber-b3.webp" }];
const TIMES = ["09:00", "10:00", "11:00", "13:30", "14:30", "15:30", "16:30", "18:00"];
const brl = (v: number) => `R$ ${v.toFixed(0)}`;
const DOW = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];

const Ic = ({ d, s = 28 }: { d: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);
const I = {
  chair: "M10 4h12v12H10zM8 16h16v5H8zM16 21v6M10 27h12",
  razor: "M5 22l16-14 4 4-14 14zM21 8l3-3 3 3-3 3",
  cal: "M5 8h22v19H5zM5 14h22M11 4v6M21 4v6M10 19h3M15 19h3M20 19h3",
  shield: "M16 3l11 4v8c0 7-5 12-11 14C10 27 5 22 5 15V7zM11 16l4 4 7-8",
  pin: "M16 29s9-8 9-15a9 9 0 0 0-18 0c0 7 9 15 9 15zM16 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  phone: "M8 4h5l2 6-3 2a14 14 0 0 0 8 8l2-3 6 2v5a3 3 0 0 1-3 3C14 27 5 18 5 7a3 3 0 0 1 3-3z",
  clock: "M16 4a12 12 0 1 0 0 24 12 12 0 0 0 0-24zM16 9v7l5 3",
  mail: "M4 7h24v18H4zM4 8l12 10L28 8",
  scissors: "M8 9a3 3 0 1 0 0-.1M8 23a3 3 0 1 0 0-.1M10 11l17 12M10 21L27 9",
};

function nextDays() {
  const out: { key: string; dow: string; d: number; label: string }[] = [];
  const t = new Date();
  for (let i = 1; out.length < 7; i++) {
    const x = new Date(t.getFullYear(), t.getMonth(), t.getDate() + i);
    if (x.getDay() === 0) continue;
    out.push({ key: x.toISOString().slice(0, 10), dow: DOW[x.getDay()] ?? "", d: x.getDate(), label: `${DOW[x.getDay()] ?? ""}, ${String(x.getDate()).padStart(2, "0")}/${String(x.getMonth() + 1).padStart(2, "0")}` });
  }
  return out;
}

export function BarberFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Dom Navalha";
  const city = client?.city?.trim() || "Porto Alegre";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [svc, setSvc] = useState<string[]>([]);
  const [who, setWho] = useState("Qualquer barbeiro");
  const [day, setDay] = useState(0);
  const [time, setTime] = useState("");
  const [cust, setCust] = useState("");
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const car = useRef<HTMLDivElement>(null);
  const days = useRef(nextDays()).current;
  const all = [...SERVICES.map((s) => ({ n: s.n, p: s.p })), ...EXTRA];
  const chosen = all.filter((s) => svc.includes(s.n));
  const total = chosen.reduce((a, s) => a + s.p, 0);
  const toggle = (n: string) => setSvc((c) => (c.includes(n) ? c.filter((x) => x !== n) : [...c, n]));
  const start = (pre?: string) => { setSvc(pre ? [pre] : []); setStep(1); setTime(""); setOpen(true); setMenu(false); };
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero agendar na ${brand}${cust ? `, sou ${cust}` : ""}: ${chosen.map((s) => s.n).join(" + ")} com ${who}, ${days[day]?.label ?? ""} às ${time}. Total ${brl(total)}.`)}`;
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };

  return (
    <div className="bf" style={{ fontFamily: "Jost, system-ui, sans-serif", color: INK, background: CREAM, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600&family=Cormorant+Garamond:wght@400;500;600&family=Allura&display=swap');
        .bf *{box-sizing:border-box}
        .bf a,.bf button{font-family:inherit}
        .bf .wrap{max-width:1180px;margin:0 auto;padding:0 24px}
        .bf .top{background:#0e0e0e;color:#fff;text-align:center;font-size:12.5px;letter-spacing:1.6px;text-transform:uppercase;padding:11px 12px;display:flex;gap:10px;justify-content:center;align-items:center}
        .bf .nav{display:flex;align-items:center;justify-content:space-between;height:84px}
        .bf .logo{font-family:'Cormorant Garamond',serif;font-size:34px;font-weight:500;letter-spacing:7px;line-height:1;text-align:center;text-transform:uppercase}
        .bf .logo small{display:block;font-family:Jost;font-size:9px;letter-spacing:5px;color:${GOLD};margin-top:5px;font-weight:500}
        .bf .links{display:flex;gap:40px;font-size:13px;letter-spacing:1.6px;text-transform:uppercase;font-weight:500}
        .bf .links a{color:${INK};text-decoration:none;cursor:pointer;padding:6px 0;border-bottom:1.5px solid transparent}
        .bf .links a:hover{border-color:${GOLD}}
        .bf .btn{background:${INK};color:#fff;border:0;padding:0 30px;min-height:48px;font-size:12.5px;letter-spacing:1.8px;text-transform:uppercase;font-weight:500;cursor:pointer;display:inline-flex;align-items:center;gap:12px}
        .bf .btn:hover{background:#2b2b2b}
        .bf .btn.o{background:transparent;color:${INK};border:1px solid ${INK}}
        .bf .btn.o:hover{background:${INK};color:#fff}
        .bf .burger{display:none;background:none;border:0;width:44px;height:44px;cursor:pointer}
        .bf .hero{position:relative;min-height:600px;background:${CREAM}}
        .bf .heroimg{position:absolute;top:0;right:0;bottom:0;width:66%;background:url(/barber-hero.webp) 60% center/cover}
        .bf .heroimg:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,${CREAM} 0%,rgba(250,248,244,.85) 12%,rgba(250,248,244,0) 42%)}
        .bf .herotxt{position:relative;z-index:2;padding:70px 0 80px;max-width:480px}
        .bf .eyebrow{font-size:13px;letter-spacing:3px;text-transform:uppercase;color:${GOLD};font-weight:600}
        .bf .trio .a .eyebrow{color:#dcbd88}
        .bf h1{font-family:'Cormorant Garamond',serif;font-weight:400;font-size:clamp(50px,6.6vw,86px);line-height:1;margin:22px 0 0;letter-spacing:-1px}
        .bf h1 em{font-style:normal;color:${GOLD}}
        .bf .rule{width:42px;height:2px;background:${GOLD};margin:28px 0 24px}
        .bf .lead{font-size:17px;line-height:1.7;margin:0 0 32px;color:#2a2a2a}
        .bf .happy{display:flex;align-items:center;gap:14px;margin-top:38px;font-size:12px;letter-spacing:1.6px;text-transform:uppercase;font-weight:500}
        .bf .avs{display:flex}
        .bf .avs span{width:38px;height:38px;border-radius:50%;border:2px solid ${CREAM};margin-left:-10px;display:grid;place-items:center;color:#fff;font-size:13px;font-weight:600}
        .bf .avs span:first-child{margin-left:0}
        .bf .feat{background:${SAND};border-top:1px solid #e8e2d8;border-bottom:1px solid #e8e2d8}
        .bf .featgrid{display:grid;grid-template-columns:repeat(4,1fr)}
        .bf .f{display:flex;gap:16px;align-items:center;padding:34px 26px;border-right:1px solid #ddd6ca}
        .bf .f:last-child{border:0}
        .bf .f b{display:block;font-size:13.5px;letter-spacing:1.5px;text-transform:uppercase;font-weight:600;margin-bottom:5px}
        .bf .f span.s{font-size:15px;line-height:1.5;color:#3a3a3a}
        .bf .sec{padding:84px 0}
        .bf h2{font-family:'Cormorant Garamond',serif;font-weight:400;font-size:clamp(36px,4.4vw,52px);line-height:1.08;margin:14px 0 0}
        .bf h2 em{font-style:normal;color:${GOLD}}
        .bf .svcgrid{display:grid;grid-template-columns:330px 1fr;gap:56px;align-items:center}
        .bf .car{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none}
        .bf .car::-webkit-scrollbar{display:none}
        .bf .sc{flex:0 0 min(230px,70%);scroll-snap-align:start;background:#fff;cursor:pointer;border:0;padding:0;text-align:left;transition:transform .2s,box-shadow .2s}
        .bf .sc:hover{transform:translateY(-4px);box-shadow:0 14px 30px rgba(0,0,0,.12)}
        .bf .sc img{width:100%;aspect-ratio:4/5;object-fit:cover;display:block}
        .bf .sc .b{padding:18px 20px 20px;background:#f3f0ea}
        .bf .sc .b b{font-size:13.5px;letter-spacing:1.6px;text-transform:uppercase;font-weight:600;display:block}
        .bf .sc .b span{display:block;margin-top:8px;font-size:15px}
        .bf .sc .b .ag{display:block;margin-top:14px;padding-top:12px;border-top:1px solid #d6cfc1;font-size:12.5px;letter-spacing:1.6px;text-transform:uppercase;font-weight:600;text-decoration:none;color:${INK}}
        .bf .ar{width:44px;height:44px;border-radius:50%;border:1px solid ${INK};background:transparent;cursor:pointer;font-size:18px}
        .bf .ar:hover{background:${INK};color:#fff}
        .bf .trio{display:grid;grid-template-columns:.85fr 1.1fr 1fr}
        .bf .trio .a{background:${DARK};color:#fff;padding:60px 44px;display:flex;flex-direction:column;justify-content:center}
        .bf .trio .a h3{font-family:'Cormorant Garamond',serif;font-weight:400;font-size:clamp(34px,3.6vw,46px);line-height:1.1;margin:18px 0 20px}
        .bf .trio .a p{font-size:15.5px;line-height:1.7;opacity:.85;margin:0 0 28px}
        .bf .sig{font-family:Allura,cursive;font-size:38px;color:${GOLD};line-height:1}
        .bf .trio .b{background:url(/barber-shop.webp) center/cover;min-height:360px}
        .bf .trio .c{background:#ebe7df;padding:60px 44px;display:flex;flex-direction:column;justify-content:center}
        .bf .trio .c h3{font-family:'Cormorant Garamond',serif;font-weight:400;font-size:clamp(32px,3.4vw,42px);line-height:1.12;margin:16px 0 28px}
        .bf .team{display:grid;grid-template-columns:repeat(3,1fr);gap:26px;margin-top:44px}
        .bf .tm img{width:100%;aspect-ratio:1/1;object-fit:cover;display:block;filter:grayscale(.15)}
        .bf .tm b{display:block;font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:500;margin-top:16px}
        .bf .tm span{font-size:13px;letter-spacing:1.5px;text-transform:uppercase;color:${GOLD};font-weight:500}
        .bf .price{display:grid;grid-template-columns:1fr 1fr;gap:0 70px;margin-top:40px}
        .bf .row{display:flex;align-items:baseline;gap:12px;padding:20px 0;border-bottom:1px solid #ddd6ca;font-size:16px}
        .bf .row b{font-weight:500}
        .bf .row small{color:#777;font-size:13px}
        .bf .row .dots{flex:1;border-bottom:2px dotted #8f8776;transform:translateY(-4px)}
        .bf .row .pr{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:600}
        .bf footer{background:#fff;border-top:1px solid #e8e2d8;padding:60px 0 28px}
        .bf .fg{display:grid;grid-template-columns:1.1fr .8fr 1.1fr 1.2fr;gap:0}
        .bf .fc{padding:0 30px;border-left:1px solid #e3ddd1}
        .bf .fc:first-child{border:0;padding-left:0}
        .bf .fc h4{font-size:12.5px;letter-spacing:1.8px;text-transform:uppercase;font-weight:600;margin:0 0 18px}
        .bf .fc a,.bf .fc p{display:flex;gap:12px;align-items:flex-start;font-size:14.5px;line-height:1.6;color:#444;margin:0 0 11px;text-decoration:none;cursor:pointer}
        .bf .news{display:flex;border:1px solid #d6cfc1;margin-top:6px}
        .bf .news input{flex:1;min-width:0;border:0;outline:0;padding:0 14px;min-height:48px;font-size:14px;background:transparent}
        .bf .news button{width:52px;border:0;border-left:1px solid #d6cfc1;background:transparent;cursor:pointer;font-size:18px}
        .bf .wa{position:fixed;right:18px;bottom:18px;z-index:40;width:58px;height:58px;border-radius:50%;background:#25d366;display:grid;place-items:center;box-shadow:0 8px 24px rgba(0,0,0,.28);border:0;cursor:pointer}
        .bf .ov{position:fixed;inset:0;z-index:100;background:rgba(10,10,10,.6);display:flex;align-items:center;justify-content:center;padding:16px}
        .bf .md{background:${CREAM};width:100%;max-width:560px;max-height:92vh;overflow:auto;padding:34px 34px 30px;position:relative}
        .bf .md h3{font-family:'Cormorant Garamond',serif;font-weight:500;font-size:34px;margin:6px 0 4px}
        .bf .dots2{display:flex;gap:6px;margin:14px 0 22px}
        .bf .dots2 i{flex:1;height:3px;background:#ddd6ca}
        .bf .dots2 i.on{background:${GOLD}}
        .bf .opt{display:flex;justify-content:space-between;align-items:center;width:100%;padding:15px 16px;margin-bottom:10px;border:1px solid #d9d2c5;background:#fff;cursor:pointer;font-size:15.5px;text-align:left;min-height:52px}
        .bf .opt.on{border-color:${INK};box-shadow:inset 0 0 0 1px ${INK}}
        .bf .chip{padding:12px 6px;border:1px solid #d9d2c5;background:#fff;cursor:pointer;font-size:15px;text-align:center;min-height:46px}
        .bf .chip.on{background:${INK};color:#fff;border-color:${INK}}
        .bf .x{position:absolute;right:14px;top:12px;width:44px;height:44px;border:0;background:none;font-size:26px;cursor:pointer}
        .bf .mob{display:none}
        @media(max-width:900px){
          .bf .links,.bf .navbtn{display:none}.bf .burger{display:block}
          .bf .nav{height:68px}.bf .logo{font-size:26px;letter-spacing:5px}
          .bf .hero{min-height:0;display:flex;flex-direction:column}
          .bf .heroimg{position:relative;width:100%;height:340px;order:2;background-position:62% center}
          .bf .heroimg:after{background:linear-gradient(180deg,${CREAM} 0%,rgba(250,248,244,0) 30%)}
          .bf .herotxt{padding:34px 0 8px;max-width:none}
          .bf .happy{margin-top:26px}
          .bf .featgrid{grid-template-columns:1fr 1fr}.bf .f{padding:22px 14px;border-bottom:1px solid #ddd6ca;flex-direction:column;align-items:flex-start;gap:10px}.bf .f:nth-child(2n){border-right:0}
          .bf .sec{padding:56px 0}.bf .svcgrid{grid-template-columns:1fr;gap:30px}
          .bf .trio{grid-template-columns:1fr}.bf .trio .a,.bf .trio .c{padding:44px 24px}.bf .trio .b{min-height:260px}
          .bf .team{grid-template-columns:1fr 1fr;gap:16px}.bf .tm:nth-child(3){grid-column:1/-1}.bf .tm:nth-child(3) img{aspect-ratio:2/1}
          .bf .price{grid-template-columns:1fr}
          .bf .fg{grid-template-columns:1fr 1fr;gap:34px 0}.bf .fc{padding:0 16px 0 0;border:0}.bf .fc:nth-child(2n){padding-left:16px}
          .bf .top{font-size:11px;letter-spacing:1px}
          .bf .mob{display:block;background:#fff;border-bottom:1px solid #e8e2d8}.bf .mob a{display:block;padding:16px 24px;font-size:13px;letter-spacing:1.6px;text-transform:uppercase;border-top:1px solid #f0ebe2;cursor:pointer}
          .bf .md{padding:28px 20px 24px}
        }
      `}</style>

      <div className="top"><Ic d={I.scissors} s={16} />Agende online e ganhe 10% na primeira visita</div>
      <header style={{ background: CREAM }}>
        <div className="wrap nav">
          <div className="logo">{brand}<small>BARBEARIA</small></div>
          <nav className="links"><a onClick={() => go("top")}>Início</a><a onClick={() => go("servicos")}>Serviços</a><a onClick={() => go("equipe")}>Equipe</a><a onClick={() => go("precos")}>Preços</a><a onClick={() => go("contato")}>Contato</a></nav>
          <button type="button" className="btn navbtn" onClick={() => start()}>Agendar</button>
          <button type="button" className="burger" aria-label="Menu" onClick={() => setMenu((m) => !m)}><svg width="26" height="26" viewBox="0 0 26 26" stroke={INK} strokeWidth="1.8"><path d="M3 7h20M3 13h20M3 19h20" /></svg></button>
        </div>
        {menu && <div className="mob"><a onClick={() => go("servicos")}>Serviços</a><a onClick={() => go("equipe")}>Equipe</a><a onClick={() => go("precos")}>Preços</a><a onClick={() => go("contato")}>Contato</a><a onClick={() => start()} style={{ fontWeight: 600 }}>Agendar horário</a></div>}
      </header>

      <section className="hero" id="top">
        <div className="heroimg" role="img" aria-label="Barbeiro fazendo degradê em cliente" />
        <div className="wrap">
          <div className="herotxt">
            <div className="eyebrow">Bem-estar e estilo</div>
            <h1>Mais que um <em>corte</em></h1>
            <div className="rule" />
            <p className="lead">Corte preciso, degradê limpo e barba no capricho. Cuidado de verdade para o homem de hoje, em {city}.</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button type="button" className="btn" onClick={() => start()}>Agendar horário <span aria-hidden>→</span></button>
              <button type="button" className="btn o" onClick={() => go("servicos")}>Ver serviços</button>
            </div>
            <div className="happy">
              
              <div>1.200+ clientes<br /><span style={{ color: "#c9962e", letterSpacing: 2, fontSize: 14 }}>★★★★★</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="feat"><div className="wrap featgrid">
        {[[I.chair, "Barbeiros especialistas", "Profissionais que cuidam de cada detalhe."], [I.razor, "Produtos premium", "Só usamos produtos de primeira linha."], [I.cal, "Agenda fácil", "Marque em segundos, sem fila de espera."], [I.shield, "Higiene em 1º lugar", "Material esterilizado a cada cliente."]].map(([d, t, s]) => (
          <div className="f" key={t}><Ic d={d as string} s={44} /><div><b>{t}</b><span className="s">{s}</span></div></div>
        ))}
      </div></section>

      <section className="sec" id="servicos"><div className="wrap svcgrid">
        <div>
          <div className="eyebrow">Nossos serviços</div>
          <h2>Precisão em cada <em>detalhe</em></h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, margin: "22px 0 30px", color: "#444" }}>Dos cortes clássicos aos estilos atuais, a gente resolve. Toque num serviço para agendar.</p>
          <button type="button" className="btn" onClick={() => go("precos")}>Ver todos os serviços</button>
        </div>
        <div>
          <div className="car" ref={car}>
            {SERVICES.map((s) => (
              <button type="button" className="sc" key={s.id} onClick={() => start(s.n)}>
                <img src={s.img} alt={s.n} loading="lazy" />
                <div className="b"><b>{s.n}</b><span>{brl(s.p)} · {s.min} min</span><u className="ag">Agendar →</u></div>
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 22 }}>
            <button type="button" className="ar" aria-label="Anterior" onClick={() => car.current?.scrollBy({ left: -250, behavior: "smooth" })}>←</button>
            <button type="button" className="ar" aria-label="Próximo" onClick={() => car.current?.scrollBy({ left: 250, behavior: "smooth" })}>→</button>
          </div>
        </div>
      </div></section>

      <section className="trio">
        <div className="a">
          <div className="eyebrow">Chegue sem hora ou agende</div>
          <h3>Seu estilo,<br />sua paixão.</h3>
          <p>O jeito certo de cuidar do visual, com conforto, calma e atenção do começo ao fim.</p>
          <span className="sig">{brand}</span>
        </div>
        <div className="b" role="img" aria-label="Interior da barbearia" />
        <div className="c">
          <div className="eyebrow">Pronto pra um visual novo?</div>
          <h3>Agende seu horário hoje</h3>
          <div><button type="button" className="btn" onClick={() => start()}>Agendar agora <span aria-hidden>→</span></button></div>
        </div>
      </section>

      <section className="sec" id="equipe"><div className="wrap">
        <div className="eyebrow">Nossa equipe</div>
        <h2>Quem cuida do <em>seu visual</em></h2>
        <div className="team">
          {TEAM.map((t) => (<div className="tm" key={t.n}><img src={t.img} alt={t.n} loading="lazy" /><b>{t.n}</b><span>{t.r}</span></div>))}
        </div>
      </div></section>

      <section className="sec" id="precos" style={{ background: SAND }}><div className="wrap">
        <div className="eyebrow">Tabela de preços</div>
        <h2>Valores <em>claros</em>, sem surpresa</h2>
        <div className="price">
          {[...SERVICES.map((s) => ({ n: s.n, p: s.p, m: `${s.min} min` })), ...EXTRA.map((e) => ({ n: e.n, p: e.p, m: "" }))].map((r) => (
            <div className="row" key={r.n}><b>{r.n}</b>{r.m && <small>{r.m}</small>}<span className="dots" /><span className="pr">{brl(r.p)}</span></div>
          ))}
        </div>
        <div style={{ marginTop: 40 }}><button type="button" className="btn" onClick={() => start()}>Agendar horário <span aria-hidden>→</span></button></div>
      </div></section>

      <footer id="contato"><div className="wrap">
        <div className="fg">
          <div className="fc"><div className="logo" style={{ textAlign: "left", fontSize: 26 }}>{brand}<small>BARBEARIA</small></div><p style={{ marginTop: 20, display: "block" }}>Corte preciso. Barba no capricho. Cuidado para o homem de hoje.</p></div>
          <div className="fc"><h4>Serviços</h4>{["Corte", "Barba", "Lavagem", "Corte infantil"].map((s) => <a key={s} onClick={() => start(s)}>{s}</a>)}</div>
          <div className="fc"><h4>Contato</h4>
            <p><Ic d={I.pin} s={20} />Rua das Acácias, 123, Centro, {city}</p>
            <a href={`https://wa.me/${num}`} target="_blank" rel="noreferrer"><Ic d={I.phone} s={20} />Chamar no WhatsApp</a>
            <p><Ic d={I.clock} s={20} />Seg a sáb, 9h às 20h</p>
          </div>
          <div className="fc"><h4>Novidades</h4><p style={{ display: "block", fontSize: 14 }}>Receba ofertas e dicas de estilo.</p><div className="news"><input placeholder="Seu e-mail" aria-label="E-mail" /><button type="button" aria-label="Enviar">→</button></div></div>
        </div>
        <p style={{ textAlign: "center", color: "#8a8478", fontSize: 13, marginTop: 44, display: "block" }}>© 2026 {brand}. Todos os direitos reservados.</p>
      </div></footer>

      {sc && <a className="wa" href={`https://wa.me/${num}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg></a>}

      {open && (
        <div className="ov" onClick={(e) => e.target === e.currentTarget && setOpen(false)} role="dialog" aria-modal="true" aria-label="Agendar horário">
          <div className="md">
            <button type="button" className="x" aria-label="Fechar" onClick={() => setOpen(false)}>×</button>
            <div className="eyebrow">Passo {step} de 4</div>
            <h3>{["Escolha o serviço", "Escolha o barbeiro", "Dia e horário", "Confirme seu agendamento"][step - 1]}</h3>
            <div className="dots2">{[1, 2, 3, 4].map((n) => <i key={n} className={n <= step ? "on" : ""} />)}</div>
            {step === 1 && (<div>{all.map((s) => (<button type="button" key={s.n} className={`opt${svc.includes(s.n) ? " on" : ""}`} onClick={() => toggle(s.n)}><span>{svc.includes(s.n) ? "✓ " : ""}{s.n}</span><b style={{ fontWeight: 600 }}>{brl(s.p)}</b></button>))}</div>)}
            {step === 2 && (<div>{["Qualquer barbeiro", ...TEAM.map((t) => t.n)].map((n) => (<button type="button" key={n} className={`opt${who === n ? " on" : ""}`} onClick={() => setWho(n)}><span>{n}</span>{who === n && <span>✓</span>}</button>))}</div>)}
            {step === 3 && (<div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 18 }}>
                {days.map((d, i) => (<button type="button" key={d.key} className={`chip${day === i ? " on" : ""}`} onClick={() => setDay(i)}><small style={{ display: "block", textTransform: "uppercase", fontSize: 11, letterSpacing: 1 }}>{d.dow}</small><b style={{ fontSize: 18, fontWeight: 500 }}>{d.d}</b></button>))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
                {TIMES.map((t) => (<button type="button" key={t} className={`chip${time === t ? " on" : ""}`} onClick={() => setTime(t)}>{t}</button>))}
              </div>
            </div>)}
            {step === 4 && (<div>
              <div style={{ background: "#fff", border: "1px solid #d9d2c5", padding: 18, fontSize: 15.5, lineHeight: 1.9 }}>
                <div><b>{chosen.map((s) => s.n).join(" + ")}</b></div>
                <div>com {who}</div>
                <div>{days[day]?.label} às {time}</div>
                <div style={{ marginTop: 6, fontSize: 20, fontFamily: "'Cormorant Garamond',serif", fontWeight: 600 }}>Total {brl(total)}</div>
              </div>
              <input value={cust} onChange={(e) => setCust(e.target.value)} placeholder="Seu nome" aria-label="Seu nome" style={{ width: "100%", marginTop: 14, minHeight: 50, padding: "0 14px", border: "1px solid #d9d2c5", fontSize: 15.5, background: "#fff" }} />
            </div>)}
            <div style={{ display: "flex", gap: 10, marginTop: 22, justifyContent: "space-between" }}>
              {step > 1 ? <button type="button" className="btn o" onClick={() => setStep(step - 1)}>Voltar</button> : <span />}
              {step < 4 ? (
                <button type="button" className="btn" disabled={(step === 1 && !svc.length) || (step === 3 && !time)} style={{ opacity: (step === 1 && !svc.length) || (step === 3 && !time) ? 0.4 : 1 }} onClick={() => setStep(step + 1)}>Continuar</button>
              ) : (
                <a className="btn" href={wa} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>Confirmar no WhatsApp</a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
