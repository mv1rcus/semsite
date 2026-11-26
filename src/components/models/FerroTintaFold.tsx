import { useState } from "react";

/** Estúdio de tatuagem à risca do pin (Tattoo Dominus): hero full-bleed com emblema de caveira e botão, barra de navegação ardósia, About em duas colunas com barras de habilidade, faixa "nossa tinta é nossa marca", 4 retratos de artistas, artista em destaque, projeto recente, números, mosaico, depoimento sobre foto e contato em duas colunas. Paleta ardósia/cinza claro com véu azul-arroxeado nas fotos, Pirata One nos títulos e Poppins no corpo. */
const SL = "#4a4655", LG = "#e6e6e8", INK = "#3d3948", MUT = "#7d7987", WH = "#f4f3f6", LN = "#cfcdd4", EM = "#4a4655", EMD = "#3d3948", TX = INK, PN = "#f4f3f6", CD = "#ececef", MU = MUT;
const ARTISTS = [
  { n: "Dante", s: "Corpo fechado", img: "/ft-art1.webp" },
  { n: "Caio", s: "Tribal e blackwork", img: "/ft-art2.webp" },
  { n: "Otávio", s: "Realismo 3D", img: "/ft-art3.webp" },
  { n: "Murilo", s: "Ilustração", img: "/ft-art4.webp" },
];
const SKILLS = [["Corpo fechado", 90], ["Braços", 85], ["Pernas", 75], ["Fine line", 90]] as const;
const WORKS = ["/ft-w1.webp", "/ft-w2.webp", "/ft-w3.webp", "/ft-w4.webp"];
const GEAR: [string, string][] = [["Rotativa", "M22 44l16-26 4 3-16 26zM40 16l5 3"], ["Pigmento", "M32 18c6 8 10 12 10 18a10 10 0 0 1-20 0c0-6 4-10 10-18z"], ["Agulha", "M20 44l24-24M40 20l4 4M18 46l-2 4 4-2"], ["Estéril", "M32 18v28M18 32h28M22 22l20 20M42 22 22 42"], ["Cicatriza", "M32 46s-12-8-12-16a6 6 0 0 1 12-2 6 6 0 0 1 12 2c0 8-12 16-12 16z"], ["Desenho", "M20 44c4-14 10-20 24-24-4 14-10 20-24 24zM26 38l10-10"]];
const FACTS = [["365", "Cafés por mês"], ["214", "Depoimentos"], ["623", "Horas de música"], ["182", "Clientes felizes"]];
const REVIEWS = [
  { q: "Cheguei com três referências confusas e o Dante transformou num blackwork que parece que sempre foi meu. Três sessões e zero arrependimento.", n: "Igor M.", r: "Braço fechado" },
  { q: "A Ravena tem a mão mais leve que já vi. Minha fine line cicatrizou perfeita e o acompanhamento depois fez toda a diferença.", n: "Caíque T.", r: "Primeira tattoo" },
  { q: "Estúdio impecável, tudo descartável aberto na hora. Voltei três vezes e já marquei a quarta.", n: "Júlia R.", r: "Costela e antebraço" },
];
const STYLES = ["Blackwork", "Fine line", "Old school", "Colorida", "Escrita"];
const ZONES = ["Antebraço", "Braço", "Costas", "Perna", "Costela", "Outra"];
const Skull = () => (
  <svg className="emb" width="150" height="150" viewBox="0 0 150 150" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M75 34c-20 0-33 13-33 31 0 12 6 20 13 25v13h40V90c7-5 13-13 13-25 0-18-13-31-33-31z" fill="rgba(255,255,255,.1)" />
    <circle cx="62" cy="66" r="8" fill="#fff" /><circle cx="88" cy="66" r="8" fill="#fff" />
    <path d="M75 76l-4 9h8zM64 103v10M72 103v10M80 103v10M88 103v10" />
    <path d="M18 54l30 22M132 54l-30 22M14 62l8-10M136 62l-8-10" strokeWidth="3" />
    <path d="M22 118c18 12 38 18 53 18s35-6 53-18" />
  </svg>
);

export function FerroTintaFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Ferro & Tinta";
  const city = client?.city?.trim() || "Porto Alegre";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [style, setStyle] = useState("");
  const [zone, setZone] = useState("");
  const [size, setSize] = useState("Média (10-15cm)");
  const [idea, setIdea] = useState("");
  const [cust, setCust] = useState("");
  const [menu, setMenu] = useState(false);
  const [rev, setRev] = useState(0);
  const [cf, setCf] = useState({ n: "", p: "", a: "", m: "" });
  const start = () => { setStep(1); setOpen(true); setMenu(false); };
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero agendar uma sessão na ${brand}${cust ? ` em nome de ${cust}` : ""}. Estilo: ${style}; região: ${zone}; tamanho: ${size}. Ideia: ${idea || "a combinar"}.`)}`;
  const waC = `https://wa.me/${num}?text=${encodeURIComponent(`Oi, aqui é ${cf.n || "um cliente"}${cf.p ? ` (${cf.p})` : ""}. Assunto: ${cf.a || "orçamento"}. ${cf.m}`)}`;
  const R = REVIEWS[rev]!;

  return (
    <div className="ft" style={{ fontFamily: "Poppins, system-ui, sans-serif", color: TX, background: LG, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Pirata+One&family=Poppins:wght@400;500&display=swap');
        .ft *{box-sizing:border-box}
        .ft a,.ft button{font-family:inherit}
        .ft h1,.ft h2,.ft h3,.ft .ttl{font-family:'Pirata One',serif;font-weight:400;letter-spacing:.5px;text-wrap:balance;margin:0}
        .ft .wrap{max-width:min(1280px,89vw);margin:0 auto;padding:0 28px}
        .ft .tint{position:absolute;inset:0;background:linear-gradient(180deg,rgba(38,32,66,.5),rgba(34,28,58,.62))}
        .ft .hero{position:relative;min-height:min(71vw,1020px);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background-color:#2a2540}
        .ft .hero .inn{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;gap:6px;padding:80px 24px 90px}
        .ft .emb{width:clamp(110px,15vw,230px);height:auto}.ft .hero h1{font-size:clamp(46px,6vw,76px);line-height:1;color:#fff;margin-top:6px}
        .ft .hero .tag{font-size:13px;letter-spacing:4px;color:#e8e6ef;text-transform:uppercase;margin:6px 0 24px}
        .ft .btn{background:${WH};color:${INK};border:0;border-radius:2px;padding:0 28px;min-height:46px;font-weight:500;font-size:13px;letter-spacing:.3px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;text-decoration:none}
        .ft .btn:hover{background:#fff}
        .ft .btn.dk{background:${SL};color:#fff}.ft .btn.dk:hover{background:${EMD}}
        .ft .bar{background:${SL};position:sticky;top:0;z-index:30}
        .ft .barin{display:flex;align-items:center;justify-content:space-between;height:clamp(84px,7.4vw,120px);max-width:min(1280px,89vw);margin:0 auto;padding:0 28px}
        .ft .logo{font-family:'Pirata One',serif;font-size:32px;color:#fff;letter-spacing:.5px;white-space:nowrap}
        .ft .links{display:flex;gap:34px;font-size:13px;font-weight:400}
        .ft .links a{color:#f2f1f6;cursor:pointer}.ft .links a:hover{color:#fff;text-decoration:underline}
        .ft .burger{display:none;background:none;border:0;width:44px;height:44px;cursor:pointer}
        .ft .about{display:grid;grid-template-columns:1fr 1fr;background:${LG}}
        .ft .abl{padding:90px 56px 90px 0;align-items:center;display:flex;justify-content:flex-end}
        .ft .abl>div{max-width:300px;width:100%}
        .ft h2{font-size:clamp(36px,4vw,52px);line-height:1.02;color:${SL}}
        .ft .sub{font-size:14px;line-height:1.85;color:${MUT};margin:22px 0 0}
        .ft .skills{margin-top:40px;display:grid;gap:20px}
        .ft .sk{display:flex;justify-content:space-between;font-size:11px;font-weight:500;letter-spacing:.3px;text-transform:uppercase;color:${INK}}
        .ft .sk span{font-weight:400;color:${MUT}}
        .ft .trk{height:9px;background:#fff;margin-top:7px}.ft .trk i{display:block;height:100%;background:${SL}}
        .ft .abr{background-color:#2a2540;min-height:min(71vw,1020px)}
        .ft .band{position:relative;min-height:min(71vw,1020px);display:flex;align-items:center;justify-content:center;text-align:center;background-color:#2a2540}
        .ft .band .inn{position:relative;z-index:2;max-width:560px;padding:0 24px;display:flex;flex-direction:column;align-items:center;gap:26px}
        .ft .band h2{color:#fff;font-size:clamp(44px,5.4vw,68px);line-height:1}
        .ft .sec{padding:clamp(80px,8vw,130px) 0}
        .ft .intro{font-size:14px;line-height:1.85;color:${MUT};max-width:1000px}
        .ft .head{margin-bottom:34px}
        .ft .head small{display:block;font-size:11px;font-weight:500;letter-spacing:1px;text-transform:uppercase;color:${MUT};margin-top:8px}
        .ft .agrid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.ft .gear{display:flex;justify-content:space-between;gap:24px;margin-top:44px;flex-wrap:wrap}.ft .gear div{display:flex;flex-direction:column;align-items:center;gap:8px;font-size:11px;font-weight:500;letter-spacing:.8px;text-transform:uppercase;color:#3a3744;min-width:96px;text-align:center}.ft .gear svg{display:block}
        .ft .acard{position:relative;overflow:hidden;background:${SL}}
        .ft .acard img{width:100%;aspect-ratio:3/4;object-fit:cover;display:block;filter:saturate(.8)}
        .ft .acard:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(40,34,70,.1),rgba(34,28,58,.78))}
        .ft .acard .lb{position:absolute;left:20px;bottom:18px;z-index:2;color:#fff}
        .ft .acard .lb b{font-family:'Pirata One',serif;font-weight:400;font-size:28px;display:block;line-height:1}
        .ft .acard .lb small{font-size:11px;display:block;margin-top:6px;color:#e8e6ef}
        .ft .feat{position:relative;margin-top:80px;min-height:min(37vw,540px);display:flex;align-items:center;justify-content:center;text-align:center;background-color:#2a2540}
        .ft .feat .inn{position:relative;z-index:2;color:#fff;padding:30px}
        .ft .feat h2{color:#fff;font-size:clamp(42px,5vw,60px);line-height:1}
        .ft .feat b{font-family:'Pirata One',serif;font-weight:400;font-size:28px;display:block;margin-top:18px}
        .ft .feat small{font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#e8e6ef}
        .ft .slate{background:${SL};color:#fff}
        .ft .slate h2{color:#fff}
        .ft .slate .sub{color:#d8d6e0;margin:0}
        .ft .two{display:grid;grid-template-columns:1fr 1.6fr;gap:56px;align-items:center}
        .ft .strip{display:grid;grid-template-columns:repeat(4,1fr)}
        .ft .strip img{width:100%;aspect-ratio:1;object-fit:cover;display:block;filter:saturate(.8) brightness(.95)}
        .ft .news{display:grid;grid-template-columns:1fr 1.3fr;gap:56px;align-items:center;padding-top:clamp(56px,5vw,84px);padding-bottom:clamp(56px,5vw,84px)}
        .ft .news h2{font-size:clamp(30px,3.4vw,42px)}
        .ft .nf{display:flex;gap:12px}
        .ft .nf button{background:${WH};color:${INK};border:0;border-radius:2px;min-height:46px;padding:0 26px;font-size:13px;font-weight:500;cursor:pointer;white-space:nowrap}
        .ft .nf span{flex:1;display:flex;align-items:center;padding:0 16px;font-size:13px;color:#6c6878;background:#fff;border-radius:2px;min-height:46px}
        .ft .facts{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;text-align:center;margin-top:44px}
        .ft .facts b{font-family:Poppins,sans-serif;font-weight:500;font-size:clamp(40px,5vw,60px);color:${SL};display:block;line-height:1}
        .ft .facts span{font-size:11px;color:${MUT};letter-spacing:.5px;display:block;margin-top:12px;text-transform:uppercase}
        .ft .mos{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:min(33vw,480px) min(33vw,480px)}
        .ft .mos>div{position:relative;display:flex;align-items:flex-end;padding:30px 36px;color:#fff;background-size:cover;background-position:center}
        .ft .mos>div:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(38,32,66,.05),rgba(34,28,58,.7))}
        .ft .mos>div>*{position:relative;z-index:2}
        .ft .mos .tall{grid-row:1/3;grid-column:2;cursor:pointer}
        .ft .mos h3{font-size:28px;line-height:1}
        .ft .mos p{font-size:12px;margin:6px 0 0;color:#e8e6ef}
        .ft .tst{position:relative;background-color:#2a2540;padding:0;min-height:min(71vw,1020px);display:flex;align-items:center;color:#fff}.ft .tst>.wrap{width:100%}
        .ft .tst .tint{background:linear-gradient(180deg,rgba(34,28,58,.55),rgba(34,28,58,.72))}
        .ft .tst .wrap{position:relative;z-index:2}
        .ft .tst h2{color:#fff}
        .ft .tq{margin:56px auto 0;max-width:640px;text-align:center}
        .ft .tq p{font-size:15px;line-height:1.8;margin:0;min-height:112px}
        .ft .tq b{font-family:'Pirata One',serif;font-weight:400;font-size:26px;display:block;margin-top:22px}
        .ft .tq small{font-size:11px;color:#d8d6e0;letter-spacing:1px;text-transform:uppercase}
        .ft .tnav{display:flex;gap:10px;justify-content:center;margin-top:26px}
        .ft .tnav button{width:44px;height:44px;border-radius:50%;border:1px solid rgba(255,255,255,.5);background:transparent;color:#fff;cursor:pointer;font-size:16px}
        .ft .tnav button:hover{background:rgba(255,255,255,.14)}
        .ft .contact{display:grid;grid-template-columns:1fr 1fr;background:${LG}}
        .ft .cl{background-color:#2a2540;min-height:min(71vw,1020px);position:relative}
        .ft .cl:after{content:'';position:absolute;inset:0;background:rgba(38,32,66,.35)}
        .ft .cr{padding:88px 56px;max-width:520px;align-self:center}
        .ft .cr small{font-size:11px;letter-spacing:1px;text-transform:uppercase;color:${MUT};display:block;margin:8px 0 28px}
        .ft .fi{width:100%;border:0;background:#fff;min-height:44px;padding:0 14px;font-size:13px;font-family:inherit;margin-bottom:12px;border-radius:2px;color:${INK}}
        .ft textarea.fi{min-height:108px;padding:12px 14px;resize:vertical}
        .ft .cr h3{font-size:30px;color:${SL};margin-top:40px}
        .ft .cr p{font-size:12px;color:${MUT};line-height:1.9;margin:10px 0 0}
        .ft .foot{background:${SL};color:#d8d6e0;padding:64px 0 28px;font-size:12px}
        .ft .footg{display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:40px}
        .ft .foot h4{font-family:'Pirata One',serif;font-weight:400;font-size:26px;color:#fff;margin:0 0 14px}
        .ft .fgal{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;max-width:240px}.ft .fgal img{width:100%;aspect-ratio:1;object-fit:cover;display:block}.ft .foot p,.ft .foot li{line-height:1.9;margin:0}.ft .foot ul{list-style:none;padding:0;margin:0}
        .ft .copy{border-top:1px solid rgba(255,255,255,.2);margin-top:44px;padding-top:22px;text-align:center;font-size:11px;color:#b9b6c4}
        .ft .ov{position:fixed;inset:0;background:rgba(10,6,4,.72);z-index:120;display:flex;align-items:center;justify-content:center;padding:16px}
        .ft .mdl{background:${PN};border:1px solid ${LN};width:100%;max-width:520px;max-height:88vh;overflow:auto;padding:32px;position:relative;color:${TX}}
        .ft .dots{display:flex;gap:8px;justify-content:center;margin-bottom:22px}
        .ft .dots i{width:30px;height:4px;background:${LN}}
        .ft .dots i.on{background:${EM}}
        .ft .chips{display:flex;flex-wrap:wrap;gap:10px;margin:18px 0}
        .ft .chips button{padding:12px 18px;border:1.5px solid ${LN};background:${CD};color:${TX};font-weight:600;font-size:14px;cursor:pointer;border-radius:4px}
        .ft .chips button.on{border-color:${EM};color:${EM};background:rgba(228,87,46,.12)}
        .ft .in{width:100%;border:1.5px solid ${LN};border-radius:4px;min-height:50px;padding:0 16px;font-size:15px;font-family:inherit;margin-bottom:12px;background:${CD};color:${TX};box-sizing:border-box}
        .ft .in:focus{outline:2px solid ${EM};border-color:transparent}
        .ft textarea.in{min-height:96px;padding:14px 16px;resize:vertical}
        .ft .sumr{display:flex;justify-content:space-between;font-size:14px;padding:9px 0;border-bottom:1px dashed ${LN};color:${MU}}
        .ft .sumr b{color:${TX}}
        .ft .x{position:absolute;right:14px;top:14px;width:40px;height:40px;border-radius:50%;border:1px solid ${LN};background:transparent;font-size:17px;cursor:pointer;color:${MU}}
        .ft .links.open{display:flex;position:fixed;left:0;right:0;top:84px;flex-direction:column;background:${SL};padding:22px 28px 30px;gap:20px;box-shadow:0 24px 40px rgba(0,0,0,.35);z-index:110;font-size:15px}
        @media (max-width:900px){
          .ft .links{display:none}.ft .burger{display:block}
          .ft .about,.ft .contact,.ft .two,.ft .news{grid-template-columns:1fr}
          .ft .abl{padding:64px 28px;justify-content:flex-start}.ft .abl>div{max-width:none}
          .ft .abr{min-height:420px}.ft .hero,.ft .band,.ft .tst{min-height:520px}.ft .feat{min-height:260px}.ft .gear{justify-content:center}
          .ft .agrid{grid-template-columns:1fr 1fr}
          .ft .strip{grid-template-columns:1fr 1fr}
          .ft .facts{grid-template-columns:1fr 1fr;row-gap:34px}
          .ft .mos{grid-template-columns:1fr;grid-template-rows:240px 240px 360px}
          .ft .mos .tall{grid-row:auto;grid-column:auto}
          .ft .cl{min-height:380px}.ft .mos{grid-template-rows:240px 240px 360px}.ft .cr{padding:64px 28px;max-width:none}
          .ft .sec{padding:68px 0}.ft .news{gap:22px;padding-top:44px;padding-bottom:44px}
          .ft .footg{grid-template-columns:1fr;gap:28px}
          .ft .hero{min-height:560px}
        }
        @media (max-width:520px){.ft .nf{flex-direction:column}.ft .nf span{min-height:46px}}
      `}</style>

      <section className="hero" id="inicio" style={{ background: 'url("/ft-hero.webp") center 35%/cover no-repeat' }}>
        <div className="tint" />
        <div className="inn">
          <Skull />
          <h1>{brand}</h1>
          <p className="tag">Estúdio de tatuagem · {city}</p>
          <button className="btn" onClick={() => start()}>Agendar sessão</button>
        </div>
      </section>

      <header className="bar">
        <div className="barin">
          <div className="logo">{brand}</div>
          <nav className={menu ? "links open" : "links"}>
            {["Sobre", "Artistas", "Projetos", "Depoimentos", "Contato"].map((t, i) => (
              <a key={t} onClick={() => go(["sobre", "artistas", "projetos", "depoimentos", "contato"][i]!)}>{t}</a>
            ))}
          </nav>
          <button className="burger" aria-label="Menu" onClick={() => setMenu(!menu)}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          </button>
        </div>
      </header>

      <section className="about" id="sobre">
        <div className="abl">
          <div>
            <h2>Sobre o {brand}</h2>
            <p className="sub">Cada peça começa no sketchbook, não num catálogo. A gente estuda tua ideia, tua anatomia e teu tom de pele antes de encostar na agulha, e acompanha a cicatrização por 30 dias. Material 100% descartável, aberto na tua frente.</p>
            <div className="skills">
              {SKILLS.map(([k, v]) => (
                <div key={k}>
                  <div className="sk">{k}<span>{v}%</span></div>
                  <div className="trk"><i style={{ width: `${v}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="abr" style={{ background: 'url("/ft-about.webp") center 22%/cover no-repeat' }} role="img" aria-label="Tatuadora trabalhando no estúdio" />
      </section>

      <section className="band" style={{ background: 'url("/ft-faixa.webp") center/cover no-repeat' }}>
        <div className="tint" />
        <div className="inn">
          <h2>Nossa tinta é a nossa marca</h2>
          <button className="btn" onClick={() => start()}>Agendar sessão</button>
        </div>
      </section>

      <section className="sec" id="artistas">
        <div className="wrap">
          <p className="intro">Blackwork, fine line, tribal e old school desenhados do zero pra tua pele. Estúdio autoral no coração de {city}, com biossegurança de clínica e alma de ateliê. Escolhe o artista que mais combina com a tua ideia.</p>
          <div className="head" style={{ marginTop: 56 }}><h2>Nossos artistas</h2><small>Talentos da casa</small></div>
          <div className="agrid">
            {ARTISTS.map((a) => (
              <div className="acard" key={a.n}>
                <img src={a.img} alt={`${a.n}, tatuador do estúdio`} loading="lazy" />
                <div className="lb"><b>{a.n}</b><small>{a.s}</small></div>
              </div>
            ))}
          </div>
          <div className="feat" style={{ marginTop: 80, background: 'url("/ft-feat.webp") center 30%/cover no-repeat' }}>
            <div className="tint" />
            <div className="inn"><h2>Artista em destaque</h2><b>Ravena Solla</b><small>Fine line e botânico</small></div>
          </div>
          <p className="intro" style={{ marginTop: 44 }}>Toda sexta é dia de fine line com a Ravena, com horário estendido até 22h. Orçamento na hora, desenho exclusivo e primeira sessão no mesmo dia pra peças pequenas.</p>
        </div>
      </section>

      <section className="slate" id="projetos">
        <div className="wrap two" style={{ padding: "64px 28px" }}>
          <div><h2>Projetos recentes</h2><small style={{ display: "block", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: "#c7c4d0", marginTop: 8 }}>Do estúdio, cicatrizadas</small></div>
          <p className="sub">Peças feitas aqui, cicatrizadas e fotografadas. Cada uma nasceu de um desenho exclusivo, e a tua também nasce do zero a partir da tua ideia.</p>
        </div>
        <div className="strip">{WORKS.map((w) => <img key={w} src={w} alt="Tatuagem finalizada no estúdio" loading="lazy" />)}</div>
        <div className="wrap news">
          <div><h2>Receba as novidades</h2><small style={{ display: "block", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: "#c7c4d0", marginTop: 8 }}>Flash e agenda aberta</small></div>
          <div className="nf"><span>Teu melhor e-mail</span><button onClick={() => start()}>Quero receber</button></div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="two" style={{ alignItems: "start" }}>
            <div><h2>Números do estúdio</h2><small style={{ display: "block", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: MUT, marginTop: 8 }}>Nossa rotina</small></div>
            <p className="sub" style={{ margin: 0 }}>Doze anos de agulha, duas convenções premiadas e uma regra que nunca mudou: ninguém sai da cadeira sem gostar do que vê.</p>
          </div>
          <div className="facts">{FACTS.map(([n, l]) => <div key={l}><b>{n}</b><span>{l}</span></div>)}</div>
        </div>
      </section>

      <section className="mos">
        <div style={{ backgroundImage: 'url("/ft-w5.webp")' }}><div><h3>Conheça o time</h3><p>Todo mundo já teve medo da primeira vez</p></div></div>
        <div className="tall" style={{ backgroundImage: 'url("/ft-lamp.webp")' }} onClick={() => start()}><div><h3>Agende uma sessão</h3><p>Escolha um dos nossos artistas</p></div></div>
        <div style={{ backgroundImage: 'url("/ft-w6.webp")' }}><div><h3>Aprenda sobre cuidados</h3><p>Cicatrização em 30 dias</p></div></div>
      </section>

      <section className="sec" style={{ background: LG }}>
        <div className="wrap">
          <div className="two" style={{ alignItems: "start" }}>
            <div><h2>Nosso material</h2><small style={{ display: "block", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: MUT, marginTop: 8 }}>O que a gente usa</small></div>
            <p className="sub" style={{ margin: 0 }}>Máquinas rotativas, pigmentos veganos e descartáveis lacrados na frente do cliente. A mesma bancada para cada sessão, do desenho ao curativo.</p>
          </div>
          <div className="gear">{GEAR.map(([t, d]) => (
            <div key={t}>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#3a3744" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="32" cy="32" r="29" /><path d={d} /></svg>
              {t}
            </div>
          ))}</div>
        </div>
      </section>

      <section className="tst" id="depoimentos" style={{ background: 'url("/ft-lamp.webp") center/cover no-repeat' }}>
        <div className="tint" />
        <div className="wrap">
          <div style={{ textAlign: "center" }}><h2>Depoimentos</h2></div>
          <div className="tq">
            <p>{R.q}</p>
            <b>{R.n}</b><small>{R.r}</small>
            <div className="tnav">
              <button aria-label="Anterior" onClick={() => setRev((rev + REVIEWS.length - 1) % REVIEWS.length)}>‹</button>
              <button aria-label="Próximo" onClick={() => setRev((rev + 1) % REVIEWS.length)}>›</button>
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contato">
        <div className="cl" style={{ background: 'url("/ft-art4.webp") center 25%/cover no-repeat' }} role="img" aria-label="Tatuador do estúdio" />
        <div className="cr">
          <h2>Fale com a gente</h2>
          <small>Manda a ideia, a gente responde no mesmo dia</small>
          <input className="fi" placeholder="Nome" value={cf.n} onChange={(e) => setCf({ ...cf, n: e.target.value })} />
          <input className="fi" placeholder="Telefone" value={cf.p} onChange={(e) => setCf({ ...cf, p: e.target.value })} />
          <input className="fi" placeholder="Assunto" value={cf.a} onChange={(e) => setCf({ ...cf, a: e.target.value })} />
          <textarea className="fi" placeholder="Mensagem" value={cf.m} onChange={(e) => setCf({ ...cf, m: e.target.value })} />
          <a className="btn dk" href={waC} target="_blank" rel="noopener noreferrer">Enviar no WhatsApp</a>
          <h3>{brand}</h3>
          <p>Rua das Andradas, 812, Centro Histórico, {city}<br />Ter a Sáb, 11h às 20h · Sexta fine line até 22h</p>
        </div>
      </section>

      <footer className="foot">
        <div className="wrap footg">
          <div><h4>{brand}</h4><p>Estúdio autoral de tatuagem em {city}. Desenho exclusivo, biossegurança total e acompanhamento de cicatrização.</p></div>
          <div><h4>Links</h4><ul>{["Sobre", "Artistas", "Projetos", "Depoimentos", "Contato"].map((t, i) => <li key={t}><a style={{ color: "inherit", cursor: "pointer" }} onClick={() => go(["sobre", "artistas", "projetos", "depoimentos", "contato"][i]!)}>{t}</a></li>)}</ul></div>
          <div><h4>Galeria</h4><div className="fgal">{["/ft-w1.webp", "/ft-w2.webp", "/ft-w3.webp", "/ft-w4.webp", "/ft-w5.webp", "/ft-w6.webp"].map((k) => <img key={k} src={k} alt="" />)}</div></div>
        </div>
        <div className="wrap copy">{brand} · +18 com documento · Fotos ilustrativas · Site de demonstração SemSite</div>
      </footer>

      {open && (
        <div className="ov" onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div className="mdl">
            <button className="x" onClick={() => setOpen(false)}>✕</button>
            <div className="dots">{[1, 2, 3].map((s) => <i key={s} className={step >= s ? "on" : ""} />)}</div>
            {step === 1 && (
              <div>
                <h2 style={{ fontSize: 30 }}>Qual o estilo?</h2>
                <p className="sub" style={{ fontSize: 14 }}>Escolhe o que mais chega perto da tua ideia.</p>
                <div className="chips">
                  {STYLES.map((s) => (
                    <button key={s} className={style === s ? "on" : ""} onClick={() => setStyle(s)}>{s}</button>
                  ))}
                </div>
                <button className="btn" style={{ width: "100%", justifyContent: "center" }} disabled={!style} onClick={() => setStep(2)}>Continuar</button>
              </div>
            )}
            {step === 2 && (
              <div>
                <h2 style={{ fontSize: 30 }}>Onde e o quê?</h2>
                <p className="sub" style={{ fontSize: 14 }}>Região do corpo, tamanho e a ideia por trás.</p>
                <div className="chips">
                  {ZONES.map((z) => (
                    <button key={z} className={zone === z ? "on" : ""} onClick={() => setZone(z)}>{z}</button>
                  ))}
                </div>
                <div className="chips" style={{ marginTop: 0 }}>
                  {["Pequena (até 10cm)", "Média (10-15cm)", "Grande (15cm+)"].map((z) => (
                    <button key={z} className={size === z ? "on" : ""} onClick={() => setSize(z)}>{z}</button>
                  ))}
                </div>
                <textarea className="inn" placeholder="Conta a ideia em duas linhas" value={idea} onChange={(e) => setIdea(e.target.value)} />
                <button className="btn" style={{ width: "100%", justifyContent: "center" }} disabled={!zone} onClick={() => setStep(3)}>Continuar</button>
                <button className="btn o" style={{ width: "100%", justifyContent: "center", marginTop: 10 }} onClick={() => setStep(1)}>Voltar</button>
              </div>
            )}
            {step === 3 && (
              <div>
                <h2 style={{ fontSize: 30 }}>Fecha o pedido</h2>
                <input className="inn" placeholder="Teu nome" value={cust} onChange={(e) => setCust(e.target.value)} />
                <div style={{ marginTop: 8 }}>
                  <div className="sumr"><span>Estilo</span><b>{style}</b></div>
                  <div className="sumr"><span>Região</span><b>{zone}</b></div>
                  <div className="sumr"><span>Tamanho</span><b>{size}</b></div>
                  <div className="sumr"><span>Ideia</span><b>{idea || "a combinar"}</b></div>
                  <p className="sub" style={{ fontSize: 13, marginTop: 14 }}>O estúdio responde no mesmo dia com orçamento, desenho de caminho e datas. Sinal de 30% só depois do desenho aprovado.</p>
                </div>
                <a className="btn" style={{ width: "100%", justifyContent: "center" }} href={wa} target="_blank" rel="noopener noreferrer">Enviar no WhatsApp</a>
                <button className="btn o" style={{ width: "100%", justifyContent: "center", marginTop: 10 }} onClick={() => setStep(2)}>Voltar</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
