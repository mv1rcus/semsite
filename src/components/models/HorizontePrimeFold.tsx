import { useMemo, useState } from "react";

/** Imobiliária limpa e corporativa inspirada num pin editorial creme (The Mills Group | KW): tipografia mista (serifada leve + grotesca forte), números grandes, catálogo com filtros e agendamento de visita em 3 passos no WhatsApp. */
const CR = "#f6f4ef", INK = "#131313", MU = "#6b6862", BLUE = "#1d4fd7", LN = "#e3dfd5", WHT = "#ffffff";
const PROPS = [
  { id: "vista-parque", n: "Apartamento Vista Parque", b: "Itaim Bibi", t: "apto", tl: "Apartamento", p: "R$ 1.890.000", m: "3 suítes · 2 vagas · 142 m²", img: "/hz-p1.webp" },
  { id: "figueiras", n: "Ed. Figueiras do Morumbi", b: "Morumbi", t: "apto", tl: "Apartamento", p: "R$ 829.000", m: "2 dorm · 1 vaga · 78 m²", img: "/hz-p2.webp" },
  { id: "jardim-europa", n: "Casa Jardim Europa", b: "Jardim Europa", t: "casa", tl: "Casa", p: "R$ 6.400.000", m: "4 suítes · 4 vagas · 320 m²", img: "/hz-p3.webp" },
  { id: "sky-vila-nova", n: "Cobertura Sky Vila Nova", b: "Vila Nova Conceição", t: "cobertura", tl: "Cobertura", p: "R$ 4.150.000", m: "3 suítes · terraço 90 m²", img: "/hz-p4.webp" },
  { id: "faria-lima", n: "Conjunto Corporativo Faria Lima", b: "Itaim Bibi", t: "comercial", tl: "Comercial", p: "R$ 2.980.000", m: "240 m² · 12 vagas", img: "/hz-p5.webp" },
  { id: "alto-pinheiros", n: "Apartamento Alto de Pinheiros", b: "Alto de Pinheiros", t: "apto", tl: "Apartamento", p: "R$ 1.290.000", m: "3 dorm · 2 vagas · 110 m²", img: "/hz-p6.webp" },
];
const FILTERS = [ ["todos","Todos"], ["apto","Apartamentos"], ["casa","Casas"], ["cobertura","Coberturas"], ["comercial","Comercial"] ] as const;
const STATS: [string, string][] = [ ["1.240", "imóveis negociados"], ["98%", "clientes que indicam"], ["15", "anos de mercado"] ];
const STEPS = [
  { n: "01", t: "Curadoria de verdade", d: "Cada imóvel entra no portfólio depois de vistoria, análise de documentação e precificação por dados do bairro." },
  { n: "02", t: "Avaliação transparente", d: "Você recebe o comparativo de mercado completo, sem valor inflado para ganhar a captação." },
  { n: "03", t: "Documentação e financiamento", d: "Cuidamos da due diligence jurídica e da simulação de crédito com os principais bancos." },
];
const REVIEWS = [
  { q: "Venderam meu apartamento em 26 dias, pelo valor que pedi. O relatório semanal de visitas fez toda a diferença.", n: "Ricardo M., vendeu no Itaim Bibi" },
  { q: "Primeira compra e eu não sabia nada de documentação. A equipe cuidou de tudo com o banco e o cartório.", n: "Fernanda L., comprou em Pinheiros" },
  { q: "Aluguei o conjunto da minha empresa em uma semana. Processo impecável do início ao contrato.", n: "Grupo Andrade, Faria Lima" },
];
const DAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const HOURS = ["10h", "11h", "14h", "15h", "16h", "18h"];
const Ic = ({ d, s = 24, c = INK }: { d: string; s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);
const PIN = "M12 21s-7-5.3-7-11a7 7 0 0 1 14 0c0 5.7-7 11-7 11zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z";

export function HorizontePrimeFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Horizonte Prime";
  const city = client?.city?.trim() || "São Paulo";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [filter, setFilter] = useState<string>("todos");
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [prop, setProp] = useState(PROPS[0]!);
  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");
  const [cust, setCust] = useState("");
  const [menu, setMenu] = useState(false);
  const shown = useMemo(() => filter === "todos" ? PROPS : PROPS.filter((p) => p.t === filter), [filter]);
  const start = (p?: (typeof PROPS)[number]) => { if (p) setProp(p); setStep(1); setOpen(true); setMenu(false); };
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero agendar uma visita com a ${brand}${cust ? ` em nome de ${cust}` : ""}: ${prop.n} (${prop.b}), ${day || "dia a combinar"} às ${hour || "horário a combinar"}.`)}`;

  return (
    <div className="hz" style={{ fontFamily: "Archivo, system-ui, sans-serif", color: INK, background: CR, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&family=Fraunces:ital,wght@0,300;0,400;1,300&display=swap');
        .hz *{box-sizing:border-box}
        .hz a,.hz button{font-family:inherit}
        .hz .wrap{max-width:1180px;margin:0 auto;padding:0 24px}
        .hz .topstrip{font-size:11.5px;letter-spacing:2px;text-transform:uppercase;color:${MU};display:flex;justify-content:space-between;padding:14px 0;border-bottom:1px solid ${LN};font-weight:600}
        .hz .nav{display:flex;align-items:center;justify-content:space-between;height:88px;gap:20px}
        .hz .logo{font-family:'Fraunces',serif;font-weight:400;font-size:26px;letter-spacing:.5px;color:${INK};white-space:nowrap}
        .hz .logo b{font-family:'Archivo',sans-serif;font-weight:800;letter-spacing:-.5px}
        .hz .links{display:flex;gap:32px;font-size:15px;font-weight:600}
        .hz .links a{color:${MU};cursor:pointer;transition:color .2s}.hz .links a:hover{color:${BLUE}}
        .hz .btn{background:${INK};color:#fff;border:0;border-radius:999px;padding:0 28px;min-height:54px;font-weight:700;font-size:15px;cursor:pointer;display:inline-flex;align-items:center;gap:10px;text-decoration:none}
        .hz .btn:hover{background:${BLUE}}
        .hz .btn.o{background:transparent;color:${INK};border:1.5px solid ${INK}}
        .hz .btn.o:hover{border-color:${BLUE};color:${BLUE}}
        .hz .burger{display:none;background:none;border:0;width:44px;height:44px;cursor:pointer}
        .hz .hero{padding:34px 0 60px}
        .hz h1{font-weight:400;font-size:clamp(40px,5.4vw,72px);line-height:1.06;margin:34px 0 0;max-width:1050px;color:${INK};letter-spacing:-1px}
        .hz h1 .sf{font-family:'Fraunces',serif;font-weight:300;font-style:italic;color:${MU}}
        .hz h1 .bd{font-weight:800;letter-spacing:-2px}
        .hz .lead{font-size:17px;line-height:1.7;color:${MU};margin:26px 0 30px;max-width:520px}
        .hz .herocard{position:relative;margin-top:46px}
        .hz .herocard img{width:100%;height:520px;object-fit:cover;display:block}
        .hz .herobar{display:flex;justify-content:space-between;align-items:center;gap:18px;padding:16px 4px 0;flex-wrap:wrap}
        .hz .herobar span{font-size:13px;font-weight:600;color:${MU};display:flex;align-items:center;gap:8px}
        .hz .herobar .tag{font-family:'Fraunces',serif;font-style:italic;font-size:15px;color:${INK}}
        .hz .stats{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid ${LN};border-bottom:1px solid ${LN};margin:56px 0 0}
        .hz .stat{padding:44px 28px;text-align:center}
        .hz .stat+.stat{border-left:1px solid ${LN}}
        .hz .stat b{font-family:'Fraunces',serif;font-weight:300;font-size:clamp(48px,5vw,68px);display:block;color:${INK}}
        .hz .stat b i{font-style:normal;color:${BLUE}}
        .hz .stat small{font-size:11.5px;letter-spacing:2.4px;text-transform:uppercase;color:${MU};font-weight:700;display:block;margin-top:8px}
        .hz .sec{padding:80px 0}
        .hz .sechead{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;flex-wrap:wrap}
        .hz .kick{color:${BLUE};font-weight:800;font-size:12px;letter-spacing:3px;text-transform:uppercase}
        .hz h2{font-family:'Fraunces',serif;font-weight:300;font-size:clamp(34px,4vw,52px);margin:10px 0 0;color:${INK};line-height:1.08;letter-spacing:-.5px}
        .hz h2 b{font-family:'Archivo',sans-serif;font-weight:800;letter-spacing:-1px}
        .hz .sub{color:${MU};font-size:16px;margin-top:12px;line-height:1.65;max-width:520px}
        .hz .chips{display:flex;gap:8px;flex-wrap:wrap}
        .hz .chip{border:1.5px solid ${LN};background:transparent;border-radius:999px;padding:9px 18px;font-size:13.5px;font-weight:600;color:${MU};cursor:pointer;transition:all .15s}
        .hz .chip:hover{border-color:${INK};color:${INK}}
        .hz .chip.on{background:${INK};border-color:${INK};color:#fff}
        .hz .grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px}
        .hz .card{background:${WHT};border:1px solid ${LN};overflow:hidden;transition:box-shadow .25s,border-color .25s;display:flex;flex-direction:column}
        .hz .card:hover{box-shadow:0 22px 44px rgba(19,19,19,.10);border-color:${INK}}
        .hz .card .ph{position:relative;overflow:hidden}
        .hz .card img{width:100%;aspect-ratio:3/2;object-fit:cover;display:block;transition:transform .5s}
        .hz .card:hover img{transform:scale(1.04)}
        .hz .card .tl{position:absolute;left:14px;top:14px;background:rgba(246,244,239,.92);font-size:11px;font-weight:800;letter-spacing:1.8px;text-transform:uppercase;padding:7px 12px;color:${INK}}
        .hz .card .lb{padding:20px;display:flex;flex-direction:column;flex:1}
        .hz .card .price{font-family:'Fraunces',serif;font-size:26px;font-weight:400;color:${INK}}
        .hz .card b{font-size:16px;font-weight:700;display:block;margin-top:8px;color:${INK}}
        .hz .card .bd2{font-size:13.5px;color:#55524c;display:flex;align-items:center;gap:6px;margin-top:3px;font-weight:600}
        .hz .card .mt{font-size:13.5px;color:#55524c;margin-top:10px;padding-top:10px;border-top:1px solid ${LN}}
        .hz .card .go{margin-top:auto;padding-top:16px}
        .hz .card .go button{width:100%;background:transparent;border:1.5px solid ${INK};color:${INK};border-radius:999px;min-height:46px;font-weight:700;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px}
        .hz .card .go button:hover{background:${INK};color:#fff}
        .hz .how{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
        .hz .howc{border-top:3px solid ${INK};padding-top:22px}
        .hz .howc .nn{font-size:15px;font-weight:800;letter-spacing:2px;color:${BLUE}}
        .hz .howc b{display:block;font-size:19px;font-weight:800;margin:10px 0 8px;letter-spacing:-.3px}
        .hz .howc p{font-size:14.5px;color:${MU};line-height:1.7;margin:0}
        .hz .split{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center}
        .hz .split .pic img{width:100%;height:480px;object-fit:cover;display:block}
        .hz .checks{margin-top:28px;display:flex;flex-direction:column;gap:14px}
        .hz .chk{display:flex;gap:12px;align-items:flex-start;font-size:15px;font-weight:600}
        .hz .chk svg{flex:none;margin-top:1px}
        .hz .chk small{display:block;color:${MU};font-weight:500;font-size:13.5px;margin-top:2px;line-height:1.55}
        .hz .g3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
        .hz .rev{background:${WHT};border:1px solid ${LN};padding:32px 28px}
        .hz .rev .qm{font-family:'Fraunces',serif;font-size:44px;line-height:1;color:${BLUE};display:block}
        .hz .rev p{font-size:15.5px;line-height:1.7;color:#33302c;margin:14px 0 18px}
        .hz .rev b{font-size:12.5px;font-weight:800;letter-spacing:1.6px;text-transform:uppercase;color:${INK}}
        .hz .cta{background:${INK};color:#f1efe8;padding:88px 0;text-align:center}
        .hz .cta h2{color:#fff}
        .hz .cta .sub{color:#a5a29a;margin-left:auto;margin-right:auto}
        .hz .cta .btn{background:#fff;color:${INK};margin-top:30px}
        .hz .cta .btn:hover{background:${BLUE};color:#fff}
        .hz .minichips{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:34px}
        .hz .mc{border:1px solid rgba(255,255,255,.25);color:#cfccc4;padding:9px 18px;border-radius:999px;font-size:13px;font-weight:600}
        .hz .foot{background:${INK};color:#a5a29a;padding:52px 0 0;border-top:1px solid rgba(255,255,255,.12)}
        .hz .foot .row{display:flex;justify-content:space-between;align-items:flex-start;gap:30px;flex-wrap:wrap}
        .hz .foot .logo{color:#fff}
        .hz .foot small{display:block;font-size:13.5px;line-height:1.7;margin-top:10px;max-width:360px}
        .hz .foot nav{display:flex;gap:24px;font-size:14.5px;font-weight:600}
        .hz .foot nav a{color:#cfccc4;cursor:pointer}
        .hz .foot nav a:hover{color:#fff}
        .hz .foot .cp{margin-top:40px;padding:18px 0;border-top:1px solid rgba(255,255,255,.12);font-size:12.5px;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
        .hz .overlay{position:fixed;inset:0;background:rgba(19,19,19,.55);z-index:60;display:flex;align-items:center;justify-content:center;padding:18px}
        .hz .modal{background:${CR};width:100%;max-width:560px;padding:30px;max-height:92vh;overflow-y:auto;border-top:4px solid ${BLUE}}
        .hz .mhead{display:flex;justify-content:space-between;align-items:flex-start;gap:12px}
        .hz .modal h3{margin:0;font-family:'Fraunces',serif;font-weight:400;font-size:30px;color:${INK}}
        .hz .modal .x{background:transparent;border:1.5px solid ${LN};width:36px;height:36px;border-radius:50%;font-size:16px;cursor:pointer;color:${INK};flex:none}
        .hz .modal .x:hover{border-color:${INK}}
        .hz .dotrow{display:flex;gap:6px;margin:16px 0 22px}
        .hz .dot{flex:1;height:3px;background:${LN}}
        .hz .dot.on{background:${BLUE}}
        .hz .plist{display:flex;flex-direction:column;gap:8px}
        .hz .popt{border:1px solid ${LN};background:${WHT};padding:12px 14px;display:flex;gap:14px;align-items:center;cursor:pointer;transition:border-color .15s}
        .hz .popt.sel{border-color:${BLUE};box-shadow:inset 0 0 0 1px ${BLUE}}
        .hz .popt img{width:76px;height:52px;object-fit:cover;flex:none}
        .hz .popt b{display:block;font-size:14.5px;font-weight:700;color:${INK}}
        .hz .popt small{display:block;color:${MU};font-size:12px;font-weight:600}
        .hz .popt .pl{margin-left:auto;font-family:'Fraunces',serif;font-size:16px;color:${INK};white-space:nowrap}
        .hz .mlabel{font-size:11.5px;font-weight:800;letter-spacing:2.2px;text-transform:uppercase;color:${MU};display:block;margin:0 0 10px}
        .hz .drow{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px}
        .hz .dchip{border:1.5px solid ${LN};background:${WHT};border-radius:999px;padding:9px 16px;font-size:13.5px;font-weight:600;color:${MU};cursor:pointer}
        .hz .dchip.sel{background:${INK};border-color:${INK};color:#fff}
        .hz .inp{width:100%;border:1.5px solid ${LN};background:${WHT};padding:13px 16px;font:600 15px Archivo,sans-serif;color:${INK}}
        .hz .inp:focus{outline:none;border-color:${BLUE}}
        .hz .sum{background:${WHT};border:1px solid ${LN};padding:18px 20px;margin-top:16px;font-size:14.5px}
        .hz .sum .tr{display:flex;justify-content:space-between;padding:4px 0}
        .hz .sum .tr span:first-child{color:${MU};font-weight:600}
        .hz .sum .tr b{font-weight:700;text-align:right}
        .hz .mact{display:flex;gap:10px;margin-top:26px}
        .hz .mact .btn{flex:1;justify-content:center}
        .hz .mact .back{background:transparent;color:${INK};border:1.5px solid ${LN};flex:0 0 auto;padding:0 20px}
        .hz .mact .back:hover{border-color:${INK};background:transparent}
        @media(max-width:1024px){.hz .grid3{grid-template-columns:repeat(2,1fr)}.hz .how{grid-template-columns:1fr}.hz .g3{grid-template-columns:1fr}.hz .split{grid-template-columns:1fr;gap:36px}.hz .split .pic img{height:360px}}
        @media(max-width:860px){
          .hz .links{display:none}.hz .burger{display:block}
          .hz .nav .btn.ctanav{display:none}
          .hz .topstrip span:last-child{display:none}
          .hz .mnav{position:fixed;inset:0 0 0 auto;width:min(320px,86vw);background:${CR};z-index:70;padding:88px 28px;display:flex;flex-direction:column;gap:4px;transform:translateX(100%);transition:transform .25s;box-shadow:-14px 0 44px rgba(19,19,19,.25)}
          .hz .mnav.on{transform:none}
          .hz .mnav a{padding:15px 4px;font-size:19px;font-weight:700;border-bottom:1px solid ${LN};cursor:pointer;color:${INK}}
          .hz .herocard img{height:320px}
          .hz .stats{grid-template-columns:1fr}
          .hz .stat+.stat{border-left:0;border-top:1px solid ${LN}}
          .hz .stat{padding:30px 20px}
          .hz .sec{padding:56px 0}
        }
        @media(min-width:861px){.hz .mnav{display:none}}
        @media(max-width:640px){.hz .grid3{grid-template-columns:1fr}.hz .card img{height:190px;aspect-ratio:auto}}
        @media(prefers-reduced-motion:reduce){.hz *{transition:none!important}}
      `}</style>

      <header className="hero" id="topo">
        <div className="wrap">
          <div className="topstrip"><span>{city} · 34 bairros atendidos</span><span>CRECI 00000-F · desde 2009</span></div>
          <nav className="nav">
            <span className="logo"><b>Horizonte</b>|Prime</span>
            <div className="links">
              <a onClick={() => go("imoveis")}>Imóveis</a><a onClick={() => go("metodo")}>Método</a><a onClick={() => go("sobre")}>A imobiliária</a><a onClick={() => go("depoimentos")}>Depoimentos</a>
            </div>
            <button className="btn ctanav" onClick={() => start()}>Agendar visita</button>
            <button className="burger" onClick={() => setMenu(!menu)} aria-label="Abrir menu">
              <Ic d={menu ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"} s={26} />
            </button>
          </nav>
          <h1>
            <span className="sf">O próximo capítulo da sua vida começa com</span> <span className="bd">um endereço</span> <span className="sf">à altura dos seus planos.</span>
          </h1>
          <p className="lead">A {brand} é a imobiliária de {city} que trata cada imóvel como um investimento: curadoria rigorosa, preço por dados e acompanhamento jurídico do primeiro olhar à entrega das chaves.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="btn" onClick={() => go("imoveis")}>Ver imóveis em destaque</button>
            <button className="btn o" onClick={() => start()}>Agendar uma visita</button>
          </div>
          <div className="herocard">
            <img src="/hz-hero.webp" alt="Casa moderna com piscina e vista anunciada pela Horizonte Prime" width={1600} height={900} />
            <div className="herobar">
              <span><Ic d={PIN} s={15} c={BLUE} /> Casa Jardim Europa · venda exclusiva</span>
              <span className="tag">"O padrão de curadoria que o mercado merecia."</span>
              <span>R$ 6.400.000</span>
            </div>
          </div>
          <div className="stats">
            {STATS.map(([v, l]) => (
              <div key={l} className="stat"><b>{v}{!v.includes("%") && <i>+</i>}</b><small>{l}</small></div>
            ))}
          </div>
        </div>
      </header>

      <section className="sec" id="imoveis">
        <div className="wrap">
          <div className="sechead">
            <div>
              <span className="kick">Portfólio</span>
              <h2>Imóveis <b>em destaque</b></h2>
              <p className="sub">Uma seleção curta de propósito: cada endereço abaixo passou pela nossa vistoria e análise de preço.</p>
            </div>
            <div className="chips">
              {FILTERS.map(([v, l]) => (
                <button key={v} className={`chip ${filter === v ? "on" : ""}`} onClick={() => setFilter(v)}>{l}</button>
              ))}
            </div>
          </div>
          <div className="grid3">
            {shown.map((p) => (
              <article key={p.id} className="card">
                <div className="ph">
                  <img src={p.img} alt={p.n} width={800} height={533} loading="lazy" />
                  <span className="tl">{p.tl}</span>
                </div>
                <div className="lb">
                  <span className="price">{p.p}</span>
                  <b>{p.n}</b>
                  <span className="bd2"><Ic d={PIN} s={14} c={BLUE} /> {p.b}, {city}</span>
                  <span className="mt">{p.m}</span>
                  <div className="go">
                    <button onClick={() => start(p)}>Agendar visita <Ic d="M5 12h14m-6-6 6 6-6 6" s={16} /></button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="metodo" style={{ background: WHT, borderTop: `1px solid ${LN}`, borderBottom: `1px solid ${LN}` }}>
        <div className="wrap">
          <span className="kick">Método</span>
          <h2>Como <b>trabalhamos</b></h2>
          <p className="sub">Sem promessa vazia: três compromissos que valem para compra, venda e locação.</p>
          <div className="how">
            {STEPS.map((s) => (
              <div key={s.n} className="howc">
                <span className="nn">{s.n} —</span>
                <b>{s.t}</b>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="sobre">
        <div className="wrap split">
          <div className="pic">
            <img src="/hz-office.webp" alt={`Escritório da ${brand} em ${city}`} width={1200} height={800} loading="lazy" />
          </div>
          <div>
            <span className="kick">A imobiliária</span>
            <h2>Consultoria, <b>não balcão</b></h2>
            <p className="sub">Somos uma equipe de 12 consultores certificados, com atendimento por indicação e uma regra simples: só anunciamos o que visitamos.</p>
            <div className="checks">
              {[
                ["Avaliação gratuita do seu imóvel", "Comparativo por dados do bairro, entregue em 48h"],
                ["Due diligence jurídica completa", "Certidões, débitos e situação do vendedor antes da proposta"],
                ["Simulação de financiamento", "Comparamos as taxas dos principais bancos para você"],
                ["Gestão de locação", "Para investidores: seleção de inquilino, vistoria e cobrança"],
              ].map(([t, d]) => (
                <div key={t} className="chk">
                  <Ic d="M20 6 9 17l-5-5" s={18} c={BLUE} />
                  <span>{t}<small>{d}</small></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sec" id="depoimentos" style={{ background: "#efede6" }}>
        <div className="wrap">
          <div className="sechead">
            <div>
              <span className="kick">Depoimentos</span>
              <h2>Quem confiou, <b>recomenda</b></h2>
            </div>
            <span className="sub" style={{ margin: 0 }}>4,9 de média em 340 avaliações no Google</span>
          </div>
          <div className="g3">
            {REVIEWS.map((r) => (
              <div key={r.n} className="rev">
                <span className="qm">"</span>
                <p>{r.q}</p>
                <b>{r.n}</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta" id="contato">
        <div className="wrap">
          <span className="kick" style={{ color: "#8ea6f5" }}>Agenda aberta esta semana</span>
          <h2 style={{ marginTop: 14 }}>Pronto para conhecer o seu <b>próximo imóvel?</b></h2>
          <p className="sub">Escolhe o imóvel, o dia e o horário. A visita chega confirmada no seu WhatsApp com o nome do consultor.</p>
          <button className="btn" onClick={() => start()}>Agendar visita
            <Ic d="M5 12h14m-6-6 6 6-6 6" s={18} c={INK} />
          </button>
          <div className="minichips">
            <span className="mc">1 · escolhe o imóvel</span>
            <span className="mc">2 · dia e horário</span>
            <span className="mc">3 · confirmação no WhatsApp</span>
          </div>
        </div>
      </section>

      <footer className="foot">
        <div className="wrap">
          <div className="row">
            <div>
              <span className="logo"><b>Horizonte</b>|Prime</span>
              <small>Av. Brig. Faria Lima, 4000, 12º andar, {city}<br />Segunda a sexta, 9h às 19h · Sábado, 9h às 14h</small>
            </div>
            <nav>
              <a onClick={() => go("imoveis")}>Imóveis</a>
              <a onClick={() => go("metodo")}>Método</a>
              <a onClick={() => go("sobre")}>A imobiliária</a>
              <a onClick={() => start()}>Agendar visita</a>
            </nav>
          </div>
          <div className="cp">
            <span>© 2026 {brand}. Site vitrine com agendamento por WhatsApp, feito sob medida.</span>
            <span>CRECI 00000-F</span>
          </div>
        </div>
      </footer>

      {menu && (
        <>
          <div className="overlay" style={{ background: "rgba(19,19,19,.4)" }} onClick={() => setMenu(false)} />
          <aside className={`mnav ${menu ? "on" : ""}`}>
            <a onClick={() => go("imoveis")}>Imóveis</a>
            <a onClick={() => go("metodo")}>Método</a>
            <a onClick={() => go("sobre")}>A imobiliária</a>
            <a onClick={() => go("depoimentos")}>Depoimentos</a>
            <button className="btn" style={{ marginTop: 18, justifyContent: "center" }} onClick={() => start()}>Agendar visita</button>
          </aside>
        </>
      )}

      {open && (
        <div className="overlay" onClick={() => setOpen(false)}>
          <div className="modal" role="dialog" aria-modal="true" aria-label="Agendar visita" onClick={(e) => e.stopPropagation()}>
            <div className="mhead">
              <h3>{step === 1 ? "Escolhe o imóvel" : step === 2 ? "Dia e horário" : "Confirma a visita"}</h3>
              <button className="x" onClick={() => setOpen(false)} aria-label="Fechar">✕</button>
            </div>
            <div className="dotrow"><span className={`dot ${step >= 1 ? "on" : ""}`} /><span className={`dot ${step >= 2 ? "on" : ""}`} /><span className={`dot ${step >= 3 ? "on" : ""}`} /></div>

            {step === 1 && (
              <>
                <div className="plist">
                  {PROPS.map((p) => (
                    <div key={p.id} className={`popt ${prop.id === p.id ? "sel" : ""}`} onClick={() => setProp(p)} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && setProp(p)}>
                      <img src={p.img} alt="" width={76} height={52} />
                      <span><b>{p.n}</b><small>{p.b} · {p.m}</small></span>
                      <span className="pl">{p.p}</span>
                    </div>
                  ))}
                </div>
                <div className="mact"><button className="btn" onClick={() => setStep(2)}>Continuar<Ic d="M5 12h14m-6-6 6 6-6 6" s={18} c="#fff" /></button></div>
              </>
            )}

            {step === 2 && (
              <>
                <label className="mlabel">Dia da visita</label>
                <div className="drow">
                  {DAYS.map((d) => (
                    <button key={d} className={`dchip ${day === d ? "sel" : ""}`} onClick={() => setDay(d)}>{d}</button>
                  ))}
                </div>
                <label className="mlabel">Horário</label>
                <div className="drow">
                  {HOURS.map((h) => (
                    <button key={h} className={`dchip ${hour === h ? "sel" : ""}`} onClick={() => setHour(h)}>{h}</button>
                  ))}
                </div>
                <label className="mlabel">Seu nome (opcional)</label>
                <input className="inp" value={cust} onChange={(e) => setCust(e.target.value)} placeholder="Como te chamamos?" />
                <div className="mact">
                  <button className="btn back" onClick={() => setStep(1)}>Voltar</button>
                  <button className="btn" onClick={() => setStep(3)}>Revisar agendamento<Ic d="M5 12h14m-6-6 6 6-6 6" s={18} c="#fff" /></button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <label className="mlabel">Resumo da visita</label>
                <div className="sum">
                  <div className="tr"><span>Imóvel</span><b>{prop.n}</b></div>
                  <div className="tr"><span>Bairro</span><b>{prop.b}, {city}</b></div>
                  <div className="tr"><span>Valor</span><b>{prop.p}</b></div>
                  <div className="tr"><span>Data</span><b>{day || "A combinar"}{hour ? ` · ${hour}` : ""}</b></div>
                </div>
                <p style={{ fontSize: 13.5, color: MU, margin: "14px 0 0" }}>O consultor confirma a visita no WhatsApp em até 2 horas, no horário comercial.</p>
                <div className="mact">
                  <button className="btn back" onClick={() => setStep(2)}>Voltar</button>
                  <a className="btn" href={wa} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
                    Confirmar no WhatsApp
                    <Ic d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 0" s={18} c="#fff" />
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
