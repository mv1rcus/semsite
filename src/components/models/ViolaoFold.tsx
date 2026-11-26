import { useEffect, useState } from "react";

/** Escola de violao nova, construida do zero a partir de um pin escuro e laranja ("Objective Guitar"): logo empilhada com icone, titulo em serifa pesada com a primeira linha laranja, cartao de beneficios sobre o hero, depoimentos e faixa escura com frase. */
const OR = "#e8731f", OR2 = "#c95f12", BG = "#120d0a", CR = "#fbf6f0", PE = "#fdeadb", INK = "#2a211b", MU = "#6a5e55";
const FEAT = [
  { t: "Entenda a música", d: "Aprenda o “porquê” por trás da música, não só o “como”.", i: "note" },
  { t: "Aplique no violão", d: "Ligue a teoria ao que você toca, de um jeito prático e musical.", i: "gt" },
  { t: "Pratique com foco", d: "Exercícios sob medida que constroem habilidade e progresso real.", i: "target" },
];
const OPT = [
  { t: "Curso online", d: "No seu ritmo, de onde você estiver.", c: "Começar grátis" },
  { t: "Aulas presenciais", d: "Acompanhamento individual no estúdio.", c: "Saiba mais" },
  { t: "Aulas por vídeo", d: "1 a 1 com o professor, no conforto de casa.", c: "Saiba mais" },
];
const REV = [
  { q: "Eu só decorava casas e acordes. Agora entendo como a música funciona no violão.", n: "Jonas T.", r: "Intermediário" },
  { q: "Saí da luta com a teoria e entrei na faculdade de música. Fez toda a diferença.", n: "Rafael L.", r: "Estudante de música" },
  { q: "Minha improvisação e minhas composições melhoraram demais. Finalmente me sinto livre.", n: "Melissa K.", r: "Cantora e compositora" },
];

function Icon({ k }: { k: string }) {
  const p = { width: 34, height: 34, viewBox: "0 0 32 32", fill: "none", stroke: OR2, strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (k === "note") return <svg {...p}><path d="M13 22V8l11-2v14" /><circle cx="10" cy="22" r="3" /><circle cx="21" cy="20" r="3" /></svg>;
  if (k === "gt") return <svg {...p}><circle cx="11" cy="21" r="6" /><path d="M15 17l10-10M23 5l4 4M21 7l4 4" /><circle cx="11" cy="21" r="1.5" /></svg>;
  return <svg {...p}><circle cx="16" cy="16" r="11" /><circle cx="16" cy="16" r="6" /><circle cx="16" cy="16" r="1.6" /></svg>;
}

function Logo({ a, b }: { a: string; b: string }) {
  return (
    <div className="lg" aria-label={`${a} ${b}`}>
      <svg width="30" height="42" viewBox="0 0 30 42" fill="none" stroke={OR} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M13 3h5M15.500 3v16" /><path d="M15.500 19c-5 0-5 5-8 7s-3 11 8 11 11-9 8-11-3-7-8-7z" /><circle cx="15.500" cy="29" r="3" />
      </svg>
      <span><b>{a}</b><b className="o">{b}</b></span>
    </div>
  );
}

function Guitar({ rot = 58, sc = 0.82, tx = 230, ty = 340 }: { rot?: number; sc?: number; tx?: number; ty?: number }) {
  return (
    <g transform={`translate(${tx} ${ty}) rotate(${rot}) scale(${sc})`}>
      <ellipse cx="0" cy="200" rx="150" ry="14" fill="#000" opacity=".35" />
      <rect x="-15" y="-470" width="30" height="380" rx="3" fill="#1a1210" />
      {Array.from({ length: 12 }).map((_, i) => <rect key={i} x="-15" y={-420 + i * 28 + i * i * 0.3} width="30" height="2.500" fill="#b9a78d" />)}
      <path d="M-20 -475 h40 l5 -50 h-50z" fill="#2a1a12" />
      {[-12, 0, 12].map((x) => <circle key={x} cx={x > 0 ? 24 : -24} cy={-500 + x * 1.600} r="4" fill="#cdbd9d" />)}
      <path d="M-110 40 C-130 -10 -90 -40 -60 -60 C-40 -75 -40 -110 0 -110 C40 -110 40 -75 60 -60 C90 -40 130 -10 110 40 C150 90 100 170 0 170 C-100 170 -150 90 -110 40Z" fill="url(#wood)" stroke="#3a1c0a" strokeWidth="4" />
      <path d="M-100 40 C-118 -2 -80 -34 -52 -52" fill="none" stroke="#f4b26b" strokeWidth="3" opacity=".5" />
      <circle cx="0" cy="22" r="40" fill="#120a07" /><circle cx="0" cy="22" r="46" fill="none" stroke="#2a1608" strokeWidth="5" /><circle cx="0" cy="22" r="52" fill="none" stroke="#e8c48c" strokeWidth="2" />
      <rect x="-48" y="112" width="96" height="14" rx="5" fill="#1a1210" />
      {[-10, -6, -2, 2, 6, 10].map((x) => <line key={x} x1={x} y1="-480" x2={x * 1.800} y2="119" stroke="#d9d0c0" strokeWidth="1.200" opacity=".85" />)}
    </g>
  );
}

function Scene({ variant }: { variant: "hero" | "desk" | "band" }) {
  const common = { preserveAspectRatio: "xMaxYMid slice" as const, style: { position: "absolute" as const, inset: 0, width: "100%", height: "100%" }, "aria-hidden": true };
  const defs = (
    <defs>
      <linearGradient id="bgh" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0c0806" /><stop offset="1" stopColor="#21160f" /></linearGradient>
      <radialGradient id="lamp" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#ffb55a" stopOpacity=".95" /><stop offset=".35" stopColor="#e8731f" stopOpacity=".35" /><stop offset="1" stopColor="#e8731f" stopOpacity="0" /></radialGradient>
      <radialGradient id="wood" cx=".5" cy=".6" r=".7"><stop offset="0" stopColor="#d1883a" /><stop offset=".6" stopColor="#a35a1e" /><stop offset="1" stopColor="#5a2c0e" /></radialGradient>
    </defs>
  );
  if (variant === "hero")
    return (
      <svg {...common} viewBox="0 0 640 560">{defs}
        <rect width="640" height="560" fill="url(#bgh)" />
        <circle cx="560" cy="110" r="220" fill="url(#lamp)" />
        <circle cx="560" cy="110" r="26" fill="#ffd9a0" /><path d="M560 136v60M534 196h52" stroke="#3a2a20" strokeWidth="6" />
        <rect x="0" y="470" width="640" height="90" fill="#0b0705" opacity=".8" />
        <Guitar />
      </svg>
    );
  if (variant === "desk")
    return (
      <svg {...common} viewBox="0 0 400 440">{defs}
        <rect width="400" height="440" fill="url(#bgh)" /><circle cx="330" cy="70" r="150" fill="url(#lamp)" opacity=".7" />
        <rect x="0" y="330" width="400" height="110" fill="#2a1a10" />
        <rect x="60" y="300" width="190" height="120" rx="4" fill="#efe4d0" transform="rotate(-6 60 300)" /><path d="M80 330h140M80 350h140M80 370h120" stroke="#b7a68b" strokeWidth="2" transform="rotate(-6 60 300)" />
        <Guitar rot={80} sc={0.62} tx={110} ty={190} />
      </svg>
    );
  return (
    <svg {...common} viewBox="0 0 400 200">{defs}
      <rect width="400" height="200" fill="#241911" /><rect y="120" width="400" height="80" fill="#1a110b" />
      <Guitar rot={78} sc={0.4} tx={250} ty={110} />
      <rect x="300" y="60" width="80" height="100" rx="3" fill="#eadfca" transform="rotate(5 300 60)" /><path d="M312 84h56M312 98h56M312 112h44" stroke="#a8977c" strokeWidth="2" transform="rotate(5 300 60)" />
    </svg>
  );
}

export function ViolaoFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Tom Maior";
  const parts = brand.split(" ");
  const a = parts[0] ?? brand;
  const rest = parts.slice(1);
  const b = rest.join(" ") || "Escola";
  const city = client?.city?.trim() || "Curitiba";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [op, setOp] = useState(0);
  const [nivel, setNivel] = useState("Iniciante");
  const [nome, setNome] = useState("");
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  const [rv, setRv] = useState(0);
  useEffect(() => { const f = () => setSc(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const base = `https://wa.me/${num}`;
  const wa = `${base}?text=${encodeURIComponent(`Oi! Quero começar a tocar violão com o ${brand}. ${nome.trim() ? `Meu nome é ${nome.trim()}. ` : ""}Nível: ${nivel}. Formato: ${OPT[op]?.t ?? ""}.`)}`;

  return (
    <div className="vl" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: INK, background: CR, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@600;700&family=DM+Sans:wght@400;500;700&family=Zeyada&display=swap');
        .vl *{box-sizing:border-box}.vl a,.vl button,.vl input{font-family:inherit}
        .vl h1,.vl h2,.vl h3{font-family:'Source Serif 4',Georgia,serif!important;font-weight:700!important;letter-spacing:0!important;text-transform:none!important}
        .vl .hero{position:relative;background:${BG};color:#fff;min-height:720px;overflow:hidden;padding-bottom:150px}
        .vl .hero .ph{position:absolute;top:0;right:0;bottom:0;width:62%;-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 28%);mask-image:linear-gradient(90deg,transparent 0,#000 28%)}
        .vl .hero:before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,${BG} 38.5%,rgba(18,13,10,.6) 52%,rgba(18,13,10,.15) 78%,rgba(18,13,10,0) 100%)}
        .vl .hero>*:not(.ph){position:relative;z-index:2}
        .vl .nav{display:flex;align-items:center;gap:34px;padding:22px 5vw;max-width:1280px;margin:0 auto}
        .vl .lg{display:flex;align-items:center;gap:10px}.vl .lg span{display:flex;flex-direction:column;line-height:1}.vl .lg b{font-family:'Source Serif 4',serif;font-size:21px;font-weight:600;color:#fff}.vl .lg b.o{color:${OR}}
        .vl .nl{display:flex;gap:26px;margin:0 auto}.vl .nl a{cursor:pointer;font-size:13px;font-weight:500;padding:6px 0;border-bottom:2px solid transparent}.vl .nl a:first-child{color:${OR};border-color:${OR}}
        .vl .btn{display:inline-flex;align-items:center;gap:8px;background:${OR};color:#fff;text-decoration:none;font-weight:700;font-size:13px;letter-spacing:.04em;text-transform:uppercase;padding:15px 26px;border:0;border-radius:99px;cursor:pointer}
        .vl .btn.gh{background:transparent;border:1px solid rgba(255,255,255,.7);text-transform:none;letter-spacing:0;font-size:15px;padding:14px 28px;font-weight:500}
        .vl .burger{display:none;background:none;border:0;color:#fff;font-size:28px;cursor:pointer}
        .vl .wrap{max-width:1280px;margin:0 auto;padding:0 5vw}
        .vl .hero h1{margin:70px 0 0;font-size:clamp(40px,5.8vw,78px);line-height:1.08;max-width:760px}
        .vl .hero h1 .o{display:block;color:${OR}}.vl .hero h1 .w{display:block;font-size:1.08em}.vl .hero h1 .s{display:block;font-size:.48em;font-weight:600;margin-top:6px}
        .vl .hero p.l{font-size:19px;line-height:1.5;max-width:480px;margin:26px 0 0}.vl .hero p.l b{color:${OR};font-weight:500}
        .vl .cta{display:flex;gap:14px;margin-top:30px;flex-wrap:wrap}
        .vl .chk{display:flex;gap:24px;margin-top:26px;font-size:14px;color:#f1e6da;flex-wrap:wrap}.vl .chk span:before{content:"✓";display:inline-grid;place-items:center;width:18px;height:18px;border:1.5px solid ${OR};border-radius:50%;color:${OR};font-size:10px;margin-right:8px}
        .vl .quote{position:absolute;z-index:3;right:5vw;top:260px;width:230px;font-size:14px;line-height:1.55;color:#f1e6da}.vl .quote i{display:block;margin-top:12px;font-style:normal;color:${OR};font-size:12px}
        .vl .feat{position:relative;z-index:4;max-width:1180px;margin:-90px auto 0;background:#fff;border-radius:18px;box-shadow:0 20px 50px rgba(0,0,0,.18);display:grid;grid-template-columns:repeat(3,1fr);padding:34px 20px}
        .vl .feat div{display:flex;gap:18px;align-items:center;padding:0 28px;border-right:1px solid #eadfd2}.vl .feat div:last-child{border:0}
        .vl .feat .ic{flex:none;width:70px;height:70px;border-radius:50%;background:${PE};display:grid;place-items:center}
        .vl .feat h3{font-size:18px;margin:0 0 6px;line-height:1.2}.vl .feat p{margin:0;font-size:14px;line-height:1.5;color:${MU}}
        .vl .mission{display:grid;grid-template-columns:1fr 1.1fr;gap:56px;align-items:center;max-width:1180px;margin:0 auto;padding:90px 5vw 70px}
        .vl .mission .im{position:relative;height:400px;border-radius:18px;overflow:hidden;background:#1a110b}
        .vl small.k{display:block;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${OR2};margin-bottom:12px}
        .vl h2{font-size:clamp(28px,3.4vw,42px);line-height:1.18;margin:0 0 18px}.vl h2 em{font-style:normal;color:${OR2}}
        .vl .mission p{font-size:16px;line-height:1.7;color:${MU};margin:0 0 22px}.vl .sig{font-family:Zeyada,cursive;font-size:38px;color:${INK};line-height:1}
        .vl .res{max-width:1180px;margin:0 auto;padding:30px 5vw 80px}
        .vl .cards{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:28px}
        .vl .card{background:#fff;border-radius:16px;padding:28px;box-shadow:0 6px 26px rgba(80,50,20,.08);font-size:15px;line-height:1.6}.vl .card:before{content:"“";display:block;font-family:'Source Serif 4',serif;font-size:56px;line-height:.6;color:${OR};margin-bottom:10px}
        .vl .card b{display:block;margin-top:18px;font-size:14px}.vl .card span{font-size:12px;color:${MU}}
        .vl .path{max-width:1180px;margin:0 auto;padding:0 5vw 80px;display:grid;grid-template-columns:.8fr 2fr;gap:30px;align-items:center}
        .vl .opts{background:#fff;border-radius:16px;display:grid;grid-template-columns:repeat(3,1fr);box-shadow:0 6px 26px rgba(80,50,20,.08)}
        .vl .opts button{text-align:left;background:none;border:0;border-right:1px solid #eadfd2;padding:26px;cursor:pointer;color:${INK}}.vl .opts button:last-child{border:0}
        .vl .opts button.on{background:${PE}}.vl .opts h3{font-size:17px;margin:0 0 8px}.vl .opts p{font-size:14px;color:${MU};margin:0 0 16px;line-height:1.5}.vl .opts span{font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${OR2}}
        .vl .band{position:relative;max-width:1180px;margin:0 auto 80px;height:210px;border-radius:18px;overflow:hidden;background:#241911;color:#fff;display:flex;align-items:center;padding:0 54px}
        .vl .band p{position:relative;z-index:2;font-family:'Source Serif 4',serif;font-weight:600;font-size:clamp(22px,2.6vw,32px);line-height:1.35;max-width:520px;margin:0}.vl .band p em{font-style:normal;color:${OR}}
        .vl .ask{background:${PE};padding:80px 5vw}.vl .ask .in{max-width:760px;margin:0 auto;text-align:center}
        .vl .fm{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:30px;text-align:left}.vl .fm label{display:block;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:${MU};margin-bottom:8px}
        .vl .fm input{width:100%;height:52px;border:1px solid #d9c6b2;background:#fff;border-radius:12px;padding:0 16px;font-size:16px;color:${INK}}
        .vl .sel{display:flex;gap:10px;flex-wrap:wrap}.vl .sel button{border:1px solid #d9c6b2;background:#fff;border-radius:99px;padding:12px 20px;font-size:14px;cursor:pointer;color:${INK}}.vl .sel button.on{background:${OR};border-color:${OR};color:#fff}
        .vl .full{grid-column:span 2}
        .vl footer{background:${BG};color:#d8cabb;padding:50px 5vw;text-align:center}.vl footer nav{display:flex;gap:26px;justify-content:center;margin:20px 0;font-size:13px}.vl footer a{cursor:pointer}.vl footer span{font-size:13px;color:#a8998a}
        .vl .wa{position:fixed;right:18px;bottom:18px;z-index:50;width:56px;height:56px;border-radius:50%;background:#25d366;display:grid;place-items:center;box-shadow:0 8px 24px rgba(0,0,0,.3)}
        .vl .mob{display:none}
        @media(max-width:860px){
          .vl .nl,.vl .nav>.btn{display:none}.vl .burger{display:block;margin-left:auto}
          .vl .mob{display:block;background:#fff;color:${INK};margin:0 16px;border-radius:12px;position:relative;z-index:6}.vl .mob a{display:block;padding:15px 20px;border-top:1px solid #eadfd2;font-size:14px;cursor:pointer}.vl .mob a:first-child{border:0}
          .vl .hero{padding-bottom:110px}.vl .hero .ph{width:100%;opacity:.55}.vl .hero:before{background:linear-gradient(180deg,rgba(18,13,10,.82),rgba(18,13,10,.6))}
          .vl .hero h1{margin-top:44px}.vl .quote{display:none}
          .vl .feat{grid-template-columns:1fr;margin:-70px 16px 0;padding:10px 0}.vl .feat div{border-right:0;border-bottom:1px solid #eadfd2;padding:20px}.vl .feat div:last-child{border:0}
          .vl .mission,.vl .path{grid-template-columns:1fr;gap:30px}.vl .mission{padding-top:70px}.vl .cards,.vl .opts{grid-template-columns:1fr}.vl .opts button{border-right:0;border-bottom:1px solid #eadfd2}
          .vl .band{margin:0 16px 60px;padding:0 26px;height:240px}.vl .fm{grid-template-columns:1fr}.vl .full{grid-column:span 1}
        }
      `}</style>

      <section className="hero" id="top">
        <div className="ph"><img src="/tommaior-violao.webp" alt="Pessoa tocando violão de nylon à luz da janela" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 35%", display: "block" }} /></div>
        <header className="nav">
          <Logo a={a} b={b} />
          <nav className="nl"><a onClick={() => go("topo")}>Início</a><a onClick={() => go("metodo")}>Método</a><a onClick={() => go("sobre")}>Sobre</a><a onClick={() => go("alunos")}>Alunos</a><a onClick={() => go("aula")}>Aulas</a></nav>
          <a className="btn" onClick={() => go("aula")}>Aula grátis</a>
          <button className="burger" onClick={() => setMenu((v) => !v)} aria-label="Menu">{menu ? "×" : "≡"}</button>
        </header>
        {menu && <div className="mob"><a onClick={() => go("metodo")}>Método</a><a onClick={() => go("sobre")}>Sobre</a><a onClick={() => go("alunos")}>Alunos</a><a onClick={() => go("aula")}>Pedir aula grátis</a></div>}
        <div className="wrap" id="topo">
          <h1><span className="o">Entenda a música</span><span className="w">que você toca</span><span className="s">no violão.</span></h1>
          <p className="l">Um método passo a passo que ajuda você a <b>entender</b>, <b>aplicar</b> e <b>tocar</b> com confiança.</p>
          <div className="cta"><a className="btn" onClick={() => go("aula")}>Pedir aula grátis →</a><a className="btn gh" onClick={() => go("metodo")}>Ver o método</a></div>
          <div className="chk"><span>Método em etapas</span><span>Prática de verdade</span><span>Exercícios sob medida</span></div>
        </div>
        <div className="quote">“A {brand} mudou o jeito como eu vejo a música. Hoje toco por prazer, de verdade.”<i>— Rafael L., aluno há 2 anos</i></div>
      </section>

      <div className="feat" id="metodo">{FEAT.map((f) => <div key={f.t}><span className="ic"><Icon k={f.i} /></span><span><h3>{f.t}</h3><p>{f.d}</p></span></div>)}</div>

      <section className="mission" id="sobre">
        <div className="im"><Scene variant="desk" /></div>
        <div>
          <small className="k">Nossa missão</small>
          <h2>Ajudar quem toca a entender a música e tocar com <em>liberdade.</em></h2>
          <p>A maioria dos violonistas decora cifras e posições e trava quando precisa ir além. Nosso método mostra o sistema por trás da música, para você entender, aplicar e criar no seu próprio violão.</p>
          <a className="btn" onClick={() => go("aula")}>Conheça a {brand} →</a>
          <div style={{ marginTop: 24 }}><div className="sig">Caio Brandão</div><span style={{ fontSize: 12, color: MU }}>Fundador e professor · {city}</span></div>
        </div>
      </section>

      <section className="res" id="alunos">
        <small className="k">Resultados dos alunos</small>
        <h2>Gente de verdade. <em>Progresso de verdade.</em></h2>
        <div className="cards">{REV.map((r, i) => <div className="card" key={r.n} style={i === rv ? { outline: `2px solid ${OR}` } : undefined} onMouseEnter={() => setRv(i)}>{r.q}<b>{r.n}</b><span>{r.r}</span></div>)}</div>
      </section>

      <section className="path">
        <div><small className="k">Escolha seu caminho</small><h2 style={{ marginBottom: 0 }}>Comece do jeito que <em>funciona pra você.</em></h2></div>
        <div className="opts">{OPT.map((o, i) => <button key={o.t} className={op === i ? "on" : ""} onClick={() => { setOp(i); go("aula"); }}><h3>{o.t}</h3><p>{o.d}</p><span>{o.c} →</span></button>)}</div>
      </section>

      <div className="band"><Scene variant="band" /><div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,#241911 40%,rgba(36,25,17,.1))" }} /><p>Música é uma linguagem. Ensinamos você a <em>entender</em>, para poder <em>falar</em> no violão.</p></div>

      <section className="ask" id="aula">
        <div className="in">
          <small className="k">Aula experimental gratuita</small>
          <h2>Venha tocar com a gente, <em>sem compromisso</em></h2>
          <div className="fm">
            <div className="full"><label>Formato</label><div className="sel">{OPT.map((o, i) => <button key={o.t} className={op === i ? "on" : ""} onClick={() => setOp(i)}>{o.t}</button>)}</div></div>
            <div><label htmlFor="vl-n">Seu nome</label><input id="vl-n" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Como te chamamos?" /></div>
            <div><label>Seu nível</label><div className="sel">{["Iniciante", "Intermediário"].map((n) => <button key={n} className={nivel === n ? "on" : ""} onClick={() => setNivel(n)}>{n}</button>)}</div></div>
          </div>
          <div style={{ marginTop: 32 }}><a className="btn" href={wa} target="_blank" rel="noreferrer">Pedir aula no WhatsApp →</a></div>
        </div>
      </section>

      <footer>
        <div style={{ display: "flex", justifyContent: "center" }}><Logo a={a} b={b} /></div>
        <nav><a onClick={() => go("metodo")}>Método</a><a onClick={() => go("sobre")}>Sobre</a><a onClick={() => go("alunos")}>Alunos</a><a onClick={() => go("aula")}>Aula grátis</a></nav>
        <span>© {new Date().getFullYear()} {brand} · {city}. Todos os direitos reservados.</span>
      </footer>

      {sc && <a className="wa" href={base} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg></a>}
    </div>
  );
}
