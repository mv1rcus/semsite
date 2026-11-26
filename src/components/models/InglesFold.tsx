import { useEffect, useRef, useState } from "react";

/** Escola de inglês nova, construída do zero a partir de um pin em verde profundo com tipo gigante, adesivos coloridos e CTA laranja. Aula experimental em 3 passos que fecha no WhatsApp. */
const GR = "#2a8a63", DG = "#1f5c45", INK = "#10261d", PK = "#ff6ad5", YE = "#f6c443", BL = "#4a6cf7", PU = "#7b4ff0", OR = "#c2410c", CR = "#fff8e8";
const COURSES = [
  { t: "Conversação em grupo", d: "Turmas de até 6 pessoas, fala desde a primeira aula.", c: YE, tag: "Mais procurado", ic: "M5 8h22v13H14l-6 5v-5H5z" },
  { t: "Inglês para viagem", d: "Aeroporto, hotel, restaurante e papo com gringo.", c: PK, tag: "8 semanas", ic: "M4 18l24-10-8 18-4-7zM16 19l12-11" },
  { t: "Business English", d: "Reuniões, e-mails e entrevistas com confiança.", c: BL, tag: "Para carreira", ic: "M5 11h22v15H5zM12 11V7h8v4M5 18h22" },
  { t: "Teens e Kids", d: "Jogos, música e histórias. Aprender sem perceber.", c: PU, tag: "6 a 16 anos", ic: "M16 27C5 19 5 9 11 8c3-.5 5 2 5 4 0-2 2-4.500 5-4 6 1 6 11-5 19z" },
];
const STEPS = [
  { n: "1", t: "Teste de nível", d: "Uma conversa de 10 minutos para achar a sua turma." },
  { n: "2", t: "Aula experimental", d: "Você participa de uma aula de verdade, sem compromisso." },
  { n: "3", t: "Rotina que cabe", d: "Manhã, noite ou online. Você escolhe os dias." },
];
const TEACHERS = [
  { n: "Camila", r: "Conversação e viagem", img: "/ingles-t1.webp", c: PK },
  { n: "Daniel", r: "Business English", img: "/ingles-t2.webp", c: YE },
  { n: "Renata", r: "Teens e Kids", img: "/ingles-t3.webp", c: BL },
];
const LEVELS = ["Nunca estudei", "Básico", "Intermediário", "Avançado"];
const TIMES = ["Manhã", "Tarde", "Noite", "Sábado"];
const TESTI = [
  { q: "Em dois meses eu já pedia tudo em inglês na viagem. A turma é pequena e ninguém fica com vergonha.", n: "Aluna do curso de viagem" },
  { q: "As aulas são leves e a gente fala o tempo todo. Agendei a experimental pelo site em um minuto.", n: "Aluno da turma de conversação" },
];
const Ic = ({ d, s = 30, c = INK }: { d: string; s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);
const Loop = ({ c = PK }: { c?: string }) => (
  <svg viewBox="0 0 160 300" width="100%" height="100%" fill="none" stroke={c} strokeWidth="26" strokeLinecap="round" aria-hidden><path d="M60 290C-10 200 20 20 90 24c60 4 40 100-10 120s-40 90 20 120" /></svg>
);
const Smile = ({ s = 90 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 100 100" aria-hidden><path d="M50 92C10 62 6 36 22 22c12-10 24-4 28 6 4-10 16-16 28-6 16 14 12 40-28 70z" fill={GR} stroke={YE} strokeWidth="7" /><path d="M50 92C10 62 6 36 22 22c12-10 24-4 28 6 4-10 16-16 28-6 16 14 12 40-28 70z" fill="none" stroke={BL} strokeWidth="3" transform="translate(0 0) scale(1.08) translate(-4 -4)" /><circle cx="38" cy="42" r="3.500" fill="#fff" /><circle cx="62" cy="42" r="3.500" fill="#fff" /><path d="M36 54c6 9 22 9 28 0" stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none" /></svg>
);

export function InglesFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Ponte Inglês";
  const city = client?.city?.trim() || "Curitiba";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [lvl, setLvl] = useState("");
  const [tm, setTm] = useState("");
  const [cust, setCust] = useState("");
  const [ti, setTi] = useState(0);
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const mdRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement as HTMLElement | null;
    const sel = 'button,a[href],input,[tabindex]:not([tabindex="-1"])';
    const first = () => mdRef.current?.querySelector<HTMLElement>(".opt,input,a.btn");
    setTimeout(() => first()?.focus(), 30);
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); return; }
      if (e.key !== "Tab" || !mdRef.current) return;
      const els = Array.from(mdRef.current.querySelectorAll<HTMLElement>(sel)).filter((x) => x.offsetParent !== null);
      if (!els.length) return;
      const a = els[0]!, z = els[els.length - 1]!;
      if (!mdRef.current.contains(document.activeElement)) { e.preventDefault(); a.focus(); }
      else if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    };
    window.addEventListener("keydown", k);
    return () => { window.removeEventListener("keydown", k); lastFocus.current?.focus(); };
  }, [open]);
  useEffect(() => { if (open && step > 1) mdRef.current?.querySelector<HTMLElement>(".opt,input")?.focus(); }, [step, open]);
  const start = () => { setStep(1); setLvl(""); setTm(""); setOpen(true); setMenu(false); };
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero agendar uma aula experimental na ${brand}${cust ? ` em nome de ${cust}` : ""}. Meu nível: ${lvl}. Melhor período: ${tm}.`)}`;
  const t = TESTI[ti]!;

  return (
    <div className="ie" style={{ fontFamily: "Inter, system-ui, sans-serif", color: INK, background: CR, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Inter:wght@400;500;600;700&display=swap');
        .ie *{box-sizing:border-box}
        .ie a,.ie button{font-family:inherit}
        .ie .wrap{max-width:1180px;margin:0 auto;padding:0 24px}
        .ie .disp{font-family:'Bricolage Grotesque',Inter,sans-serif;font-weight:800;letter-spacing:-.03em;line-height:.92;text-transform:uppercase}
        .ie .hero{background:${GR};position:relative;overflow:hidden;color:#fff}
        .ie .nav{display:flex;align-items:center;justify-content:space-between;height:80px;gap:20px;position:relative;z-index:3}
        .ie .logo{display:flex;align-items:center;gap:10px;font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:26px;letter-spacing:-.02em;color:#fff}
        .ie .logo b{display:grid;place-items:center;width:40px;height:40px;border-radius:12px;background:${YE};color:${DG};font-size:24px}
        .ie .links{display:flex;gap:6px;background:rgba(255,255,255,.14);padding:5px;border-radius:999px;font-size:14.5px;font-weight:600}
        .ie .links a{color:#fff;cursor:pointer;padding:9px 18px;border-radius:999px}.ie .links a.on{background:#fff;color:${DG}}
        .ie .btn{background:${OR};color:#fff;border:0;border-radius:14px;padding:0 28px;min-height:54px;font-weight:700;font-size:16px;cursor:pointer;display:inline-flex;align-items:center;gap:10px;box-shadow:0 6px 0 #7c2d0a;transition:transform .15s,box-shadow .15s}
        .ie .btn:hover{transform:translateY(2px);box-shadow:0 4px 0 #7c2d0a}
        .ie .btn.o{background:transparent;color:#fff;border:2px solid rgba(255,255,255,.7);box-shadow:none;border-color:#fff}
        .ie .btn.sm{min-height:44px;padding:0 20px;font-size:14.5px;box-shadow:0 4px 0 #7c2d0a}
        .ie .burger{display:none;background:rgba(255,255,255,.16);border:0;border-radius:12px;width:46px;height:46px;cursor:pointer}
        .ie .herogrid{display:grid;grid-template-columns:1.2fr 1fr;gap:30px;align-items:center;padding:30px 0 80px;position:relative;z-index:2}
        .ie .chip{display:inline-block;border-radius:999px;padding:7px 16px;font-size:13px;font-weight:700;color:${INK}}
        .ie h1{font-size:clamp(56px,8.4vw,128px);margin:22px 0 0;color:#fff}
        .ie h1 span.y{color:${YE}}.ie h1 span.o{color:${PK};display:inline-block;transform:rotate(-3deg)}
        .ie .lead{font-size:19px;line-height:1.6;max-width:470px;margin:26px 0 32px;color:#e7f6ee}
        .ie .photo{position:relative;border-radius:34px;overflow:hidden;border:8px solid ${YE};transform:rotate(2.500deg);box-shadow:0 24px 50px rgba(0,0,0,.28)}
        .ie .photo img{display:block;width:100%;aspect-ratio:4/3.4;object-fit:cover}
        .ie .stk{position:absolute;z-index:3}
        .ie .strip{background:${YE};color:${INK};overflow:hidden;white-space:nowrap;padding:16px 0;transform:rotate(-1.200deg);margin:-34px -20px 0;position:relative;z-index:4}
        .ie .strip div{display:inline-block;animation:iemq 26s linear infinite;font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:22px;text-transform:uppercase;letter-spacing:-.01em}
        @keyframes iemq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .ie .sec{padding:104px 0 0}
        .ie h2{font-size:clamp(38px,5vw,64px);margin:12px 0 0}
        .ie .eb{display:inline-block;background:${PU};color:#fff;border-radius:999px;padding:6px 15px;font-size:13px;font-weight:700}
        .ie .cg{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:38px}
        .ie .cc{border-radius:26px;padding:26px 22px 24px;display:flex;flex-direction:column;gap:12px;min-height:290px;cursor:pointer;border:0;text-align:left;transition:transform .2s;color:${INK}}
        .ie .cc:hover{transform:translateY(-6px) rotate(-1deg)}
        .ie .cc h3{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:25px;line-height:1.05;margin:6px 0 0;letter-spacing:-.02em}
        .ie .cc p{margin:0;font-size:15px;line-height:1.5;opacity:.85}
        .ie .cc .tg{margin-top:auto;display:inline-block;align-self:flex-start;background:${INK};color:#fff;border-radius:999px;padding:6px 14px;font-size:12.5px;font-weight:600}
        .ie .metgrid{display:grid;grid-template-columns:1fr 1.05fr;gap:50px;align-items:center}
        .ie .pic2{border-radius:34px;overflow:hidden;border:8px solid ${PK};transform:rotate(-2deg);box-shadow:0 20px 40px rgba(16,38,29,.2)}
        .ie .pic2 img{display:block;width:100%;aspect-ratio:3/2.3;object-fit:cover}
        .ie .step{display:flex;gap:18px;align-items:flex-start;padding:20px 0;border-bottom:2px dashed rgba(16,38,29,.18)}
        .ie .step:last-child{border:0}
        .ie .step i{flex:none;width:52px;height:52px;border-radius:50%;display:grid;place-items:center;font-style:normal;font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:26px;color:#fff}
        .ie .step b{font-family:'Bricolage Grotesque',sans-serif;font-size:22px;font-weight:800;display:block;letter-spacing:-.02em}
        .ie .step span{font-size:15.5px;line-height:1.5;color:#3d5448}
        .ie .tg3{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:36px}
        .ie .tc{border-radius:28px;overflow:hidden;background:#fff;box-shadow:0 10px 26px rgba(16,38,29,.1)}
        .ie .tc .ph{padding:14px 14px 0}.ie .tc img{display:block;width:100%;aspect-ratio:4/4.4;object-fit:cover;border-radius:20px}
        .ie .tc div.in{padding:16px 20px 22px}.ie .tc b{font-family:'Bricolage Grotesque',sans-serif;font-size:24px;font-weight:800;display:block}
        .ie .band{background:${DG};border-radius:34px;color:#fff;display:grid;grid-template-columns:1.1fr 1fr;gap:34px;align-items:center;padding:0;overflow:hidden;margin-top:30px}
        .ie .band img{display:block;width:100%;height:100%;min-height:340px;object-fit:cover}
        .ie .band .tx{padding:40px 10px 40px 44px}
        .ie .tq{background:#fff;border-radius:28px;padding:30px;display:flex;gap:20px;align-items:center;box-shadow:0 10px 26px rgba(16,38,29,.1);margin-top:34px;border:3px solid ${INK}}
        .ie .tq p{margin:0 0 10px;font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:22px;line-height:1.35;letter-spacing:-.01em}
        .ie .arr{width:44px;height:44px;border-radius:50%;border:2px solid ${INK};background:${YE};cursor:pointer;font-size:17px;flex:none;font-weight:700}
        .ie .cta{background:${PU};border-radius:36px;color:#fff;display:grid;grid-template-columns:1.4fr 1fr;gap:20px;align-items:center;padding:44px 48px;margin:50px 0 70px;position:relative;overflow:hidden}
        .ie .cta h3{font-size:clamp(34px,4.4vw,58px);margin:0}.ie .cta p{margin:16px 0 26px;font-size:17px;line-height:1.5;color:#ece6ff;max-width:440px}
        .ie footer{background:${INK};color:#cfe3d8;padding:36px 0}
        .ie .fr{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;font-size:14.5px}
        .ie .fr nav{display:flex;gap:26px}.ie .fr nav a{cursor:pointer;color:#cfe3d8}
        .ie .wa{position:fixed;right:18px;bottom:18px;z-index:40;width:58px;height:58px;border-radius:50%;background:#25d366;display:grid;place-items:center;box-shadow:0 8px 24px rgba(0,0,0,.3)}
        .ie .ov{position:fixed;inset:0;z-index:100;background:rgba(16,38,29,.65);display:flex;align-items:center;justify-content:center;padding:16px}
        .ie .md{background:${CR};width:100%;max-width:520px;max-height:92vh;overflow:auto;padding:32px;border-radius:30px;position:relative;border:4px solid ${YE}}
        .ie .md h3{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:32px;margin:10px 0 4px;color:${DG};letter-spacing:-.02em}
        .ie .bars{display:flex;gap:6px;margin:14px 0 20px}.ie .bars i{flex:1;height:6px;border-radius:6px;background:#d9e5dc}.ie .bars i.on{background:${GR}}
        .ie .opt{padding:14px 10px;border:2px solid #cfe0d4;border-radius:14px;background:#fff;cursor:pointer;font-size:15px;font-weight:600;text-align:center;min-height:50px}
        .ie .opt.on{background:${GR};color:#fff;border-color:${GR}}
        .ie .x{position:absolute;right:14px;top:12px;width:44px;height:44px;border:0;background:none;font-size:26px;cursor:pointer}
        .ie .mob{display:none}
        @media(max-width:900px){
          .ie .links{display:none}.ie .burger{display:grid;place-items:center}.ie .nav{height:68px;gap:8px}.ie .logo{font-size:20px}.ie .logo b{width:34px;height:34px;font-size:20px}.ie .navbtn{margin-left:auto;min-height:40px!important;padding:0 14px!important;font-size:13.5px!important}.ie .navbtn span{display:none}
          .ie .herogrid{grid-template-columns:1fr;gap:34px;padding:10px 0 70px}.ie h1{font-size:clamp(46px,14vw,70px)}
          .ie .stk.sm1{width:66px!important}.ie .lp{display:none}.ie .st2{width:80px!important;height:80px!important;font-size:13px!important;right:-6px!important;bottom:-30px!important;border-width:4px!important}
          .ie .sec{padding-top:68px}.ie .cg{grid-template-columns:1fr 1fr;gap:12px}.ie .cc{min-height:250px;padding:20px 16px}.ie .cc h3{font-size:21px}.ie .cc p{font-size:14px}
          .ie .metgrid{grid-template-columns:1fr;gap:34px}
          .ie .tg3{grid-template-columns:1fr;gap:16px}.ie .tc{display:grid;grid-template-columns:130px 1fr;align-items:center}.ie .tc .ph{padding:12px}.ie .tc img{aspect-ratio:1}
          .ie .band{grid-template-columns:1fr}.ie .band img{min-height:230px}.ie .band .tx{padding:6px 26px 34px}
          .ie .tq{flex-direction:column;align-items:flex-start;padding:24px}.ie .tq p{font-size:19px}
          .ie .cta{grid-template-columns:1fr;padding:34px 26px}
          .ie .fr{justify-content:center;text-align:center}.ie .fr nav{gap:18px;flex-wrap:wrap;justify-content:center}
          .ie .mob{display:block;background:#fff;color:${INK};border-radius:18px;margin:0 0 12px;box-shadow:0 8px 24px rgba(0,0,0,.2)}.ie .mob a{display:block;padding:15px 20px;font-size:15px;font-weight:600;cursor:pointer;border-top:1px solid #e4efe8}.ie .mob a:first-child{border:0}
          .ie .md{padding:26px 20px}
        }
      `}</style>

      <div className="hero" id="top">
        <div className="stk lp" style={{ left: -40, top: 100, width: 170, height: 470, opacity: .95 }}><Loop /></div>
        <div className="wrap">
          <header className="nav">
            <div className="logo"><b>P</b>{brand}</div>
            <nav className="links"><a className="on" onClick={() => go("top")}>Início</a><a onClick={() => go("cursos")}>Cursos</a><a onClick={() => go("metodo")}>Método</a><a onClick={() => go("professores")}>Professores</a><a onClick={() => go("contato")}>Contato</a></nav>
            <button type="button" className="btn sm navbtn" onClick={start}>Aula grátis <span aria-hidden>→</span></button>
            <button type="button" className="burger" aria-label="Menu" onClick={() => setMenu((m) => !m)}><svg width="24" height="24" viewBox="0 0 26 26" stroke="#fff" strokeWidth="2.400" strokeLinecap="round"><path d="M3 7h20M3 13h20M3 19h20" /></svg></button>
          </header>
          {menu && <div className="mob"><a onClick={() => go("cursos")}>Cursos</a><a onClick={() => go("metodo")}>Método</a><a onClick={() => go("professores")}>Professores</a><a onClick={() => go("contato")}>Contato</a></div>}
          <div className="herogrid">
            <div>
              <span className="chip" style={{ background: PK }}>Turmas pequenas em {city}</span>
              <h1 className="disp">Falar <span className="y">inglês</span><br />ficou <span className="o">simples</span></h1>
              <p className="lead">Aulas em grupo, leves e cheias de conversa. Você sai da primeira aula falando e ganha confiança a cada semana.</p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <button type="button" className="btn" onClick={start}>Agendar aula grátis <span aria-hidden>→</span></button>
                <button type="button" className="btn o" onClick={() => go("cursos")}>Ver cursos</button>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 30 }}>
                <span className="chip" style={{ background: "#d9f5e6" }}>Turmas de até 6 alunos</span>
                <span className="chip" style={{ background: YE }}>Presencial e online</span>
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <div className="photo"><img src="/ingles-hero.webp" alt="Alunos rindo juntos deitados no chão" /></div>
              <div className="stk sm1" style={{ left: -26, bottom: -34, width: 100, transform: "rotate(-8deg)" }}><Smile s={100} /></div>
              <span className="chip stk" style={{ right: -6, top: 18, background: BL, color: "#fff", transform: "rotate(4deg)" }}>Fale desde a aula 1</span>
              <div className="stk st2" style={{ right: -14, bottom: -40, width: 112, height: 112, borderRadius: "50%", background: PU, color: "#fff", display: "grid", placeItems: "center", textAlign: "center", transform: "rotate(10deg)", border: `5px solid ${YE}`, fontFamily: "Bricolage Grotesque,sans-serif", fontWeight: 800, fontSize: 17, lineHeight: 1, textTransform: "uppercase" }}><span>100%<br />fala</span></div>
              <span className="chip stk" style={{ left: 8, top: -14, background: PU, color: "#fff", transform: "rotate(-5deg)" }}>Aula experimental grátis</span>
            </div>
          </div>
        </div>
      </div>
      <div className="strip"><div>{Array.from({ length: 2 }).map((_, i) => (<span key={i}>Speak up ✦ Conversação ✦ Business ✦ Travel ✦ Kids ✦ Teens ✦ Online ✦ Speak up ✦ Conversação ✦ Business ✦ Travel ✦ Kids ✦ Teens ✦ Online ✦ </span>))}</div></div>

      <section className="sec" id="cursos"><div className="wrap">
        <span className="eb">Nossos cursos</span>
        <h2 className="disp">Um curso pra<br />cada objetivo</h2>
        <div className="cg">
          {COURSES.map((c) => (
            <button type="button" className="cc" key={c.t} style={{ background: c.c }} onClick={start}>
              <Ic d={c.ic} s={40} c={c.c === BL || c.c === PU ? "#fff" : INK} />
              <h3 style={{ color: c.c === BL || c.c === PU ? "#fff" : INK }}>{c.t}</h3>
              <p style={{ color: c.c === BL || c.c === PU ? "#fff" : INK }}>{c.d}</p>
              <span className="tg">{c.tag}</span>
            </button>
          ))}
        </div>
      </div></section>

      <section className="sec" id="metodo"><div className="wrap metgrid">
        <div className="pic2"><img src="/ingles-class.webp" alt="Professora e alunos em sala" loading="lazy" /></div>
        <div>
          <span className="eb" style={{ background: GR }}>Como funciona</span>
          <h2 className="disp" style={{ fontSize: "clamp(36px,4.4vw,56px)" }}>Do primeiro oi<br />à conversa fluente</h2>
          <div style={{ marginTop: 14 }}>
            {STEPS.map((s, i) => (<div className="step" key={s.n}><i style={{ background: [PK, BL, OR][i] }}>{s.n}</i><div><b>{s.t}</b><span>{s.d}</span></div></div>))}
          </div>
        </div>
      </div></section>

      <section className="sec" id="professores"><div className="wrap">
        <span className="eb" style={{ background: OR }}>Professores</span>
        <h2 className="disp">Quem vai<br />falar com você</h2>
        <div className="tg3">
          {TEACHERS.map((p) => (
            <div className="tc" key={p.n}>
              <div className="ph" style={{ background: p.c, borderRadius: "28px 28px 0 0" }}><img src={p.img} alt={p.n} loading="lazy" /></div>
              <div className="in"><b>{p.n}</b><span style={{ color: "#3d5448", fontSize: 15 }}>{p.r}</span></div>
            </div>
          ))}
        </div>
        <div className="band">
          <img src="/ingles-online.webp" alt="Aluna em aula online" loading="lazy" />
          <div className="tx">
            <span className="chip" style={{ background: YE }}>Online ao vivo</span>
            <h3 className="disp" style={{ fontSize: "clamp(32px,3.6vw,48px)", margin: "16px 0 0" }}>Sem sair<br />de casa</h3>
            <p style={{ fontSize: 16.5, lineHeight: 1.6, color: "#d6efe2", margin: "16px 0 24px", maxWidth: 380 }}>Mesmas turmas pequenas, mesmos professores, pelo computador ou celular. Você escolhe o formato.</p>
            <button type="button" className="btn sm" onClick={start}>Quero testar <span aria-hidden>→</span></button>
          </div>
        </div>
      </div></section>

      <section className="sec"><div className="wrap">
        <span className="eb" style={{ background: BL }}>Depoimentos</span>
        <h2 className="disp">Quem fala,<br />aprova</h2>
        <div className="tq">
          <img src="/ingles-kids.webp" alt="Turma de crianças com cartões" style={{ width: 150, height: 150, borderRadius: 28, objectFit: "cover", flex: "none", border: `4px solid ${YE}` }} />
          <div style={{ flex: 1 }}>
            <div style={{ color: OR, letterSpacing: 2, marginBottom: 8 }}>★★★★★</div>
            <p>“{t.q}”</p><b style={{ fontSize: 14 }}>{t.n}</b> <span style={{ fontSize: 12, color: "#6a8074" }}>· depoimento ilustrativo</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="button" className="arr" aria-label="Anterior" onClick={() => setTi((ti + TESTI.length - 1) % TESTI.length)}>←</button>
            <button type="button" className="arr" aria-label="Próximo" onClick={() => setTi((ti + 1) % TESTI.length)}>→</button>
          </div>
        </div>
      </div></section>

      <section id="contato"><div className="wrap">
        <div className="cta">
          <div>
            <h3 className="disp">Sua primeira<br />aula é por<br />nossa conta</h3>
            <p>Escolha o nível e o melhor período. A gente confirma pelo WhatsApp.</p>
            <button type="button" className="btn" onClick={start}>Agendar aula grátis <span aria-hidden>→</span></button>
          </div>
          <div style={{ position: "relative", height: 260 }}>
            <div className="stk" style={{ right: 30, top: -20, width: 110, height: 300, transform: "rotate(14deg)" }}><Loop c={PK} /></div>
            <div className="stk" style={{ right: 120, bottom: 0 }}><Smile s={150} /></div>
          </div>
        </div>
      </div></section>

      <footer><div className="wrap fr">
        <div><span style={{ fontFamily: "Bricolage Grotesque,sans-serif", fontWeight: 800, fontSize: 22, color: "#fff" }}>{brand}</span><div style={{ marginTop: 8, lineHeight: 1.6 }}>Rua das Palmeiras, 456, {city}<br />Seg a sex, 8h às 21h · Sáb, 8h às 13h</div></div>
        <nav><a onClick={() => go("cursos")}>Cursos</a><a onClick={() => go("metodo")}>Método</a><a onClick={() => go("professores")}>Professores</a></nav>
        <div style={{ lineHeight: 1.7 }}><a href={`https://wa.me/${num}`} target="_blank" rel="noreferrer" style={{ color: YE, fontWeight: 700, textDecoration: "none" }}>WhatsApp: fale com a gente</a><br />Instagram: @ponteingles</div>
      </div><div className="wrap" style={{ marginTop: 22, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.18)", fontSize: 13, color: "#a9c7b8" }}>Site de demonstração: fotos, nomes de professores, depoimentos e endereço são ilustrativos.</div></footer>

      {sc && !open && (<a className="wa" href={`https://wa.me/${num}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 32 32" fill="#fff"><path d="M16 3a13 13 0 0 0-11 19.700L3 29l6.500-2A13 13 0 1 0 16 3zm0 2.400A10.600 10.600 0 1 1 9.600 24l-.4-.3-3.800 1.100 1.200-3.700-.3-.4A10.600 10.600 0 0 1 16 5.400zm-4 5.300c-.3 0-.7.100-1 .5-.4.400-1.300 1.300-1.300 3.100s1.400 3.600 1.500 3.800c.2.200 2.600 4.100 6.400 5.600 3.100 1.200 3.800.9 4.500.9.700-.1 2.200-.9 2.500-1.800.3-.9.300-1.600.2-1.800-.1-.2-.3-.3-.7-.5l-2.300-1.100c-.3-.1-.6-.2-.8.200-.2.300-.9 1.100-1.100 1.300-.2.200-.4.300-.7.100-.4-.2-1.500-.6-2.800-1.700-1-.9-1.700-2.100-1.900-2.400-.2-.4 0-.6.200-.8l.5-.6c.2-.2.200-.4.400-.6.100-.3 0-.5 0-.6l-1-2.400c-.3-.6-.5-.5-.7-.5z" /></svg></a>)}

      {open && (
        <div className="ov" onClick={() => setOpen(false)}>
          <div className="md" ref={mdRef} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Agendar aula experimental">
            <button type="button" className="x" aria-label="Fechar" onClick={() => setOpen(false)}>×</button>
            <span className="chip" style={{ background: YE }}>Aula experimental grátis</span>
            <h3>{step === 1 ? "Qual é o seu nível?" : step === 2 ? "Melhor período?" : "Quase lá!"}</h3>
            <div className="bars">{[1, 2, 3].map((n) => (<i key={n} className={n <= step ? "on" : ""} />))}</div>
            {step === 1 && (<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>{LEVELS.map((l) => (<button type="button" key={l} className={`opt${lvl === l ? " on" : ""}`} onClick={() => { setLvl(l); setStep(2); }}>{l}</button>))}</div>)}
            {step === 2 && (<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>{TIMES.map((x) => (<button type="button" key={x} className={`opt${tm === x ? " on" : ""}`} onClick={() => { setTm(x); setStep(3); }}>{x}</button>))}</div>)}
            {step === 3 && (
              <div>
                <label style={{ fontSize: 14, fontWeight: 600 }}>Seu nome<input value={cust} onChange={(e) => setCust(e.target.value)} placeholder="Como podemos te chamar?" style={{ display: "block", width: "100%", marginTop: 8, padding: "15px 16px", borderRadius: 14, border: "2px solid #cfe0d4", fontSize: 16, fontFamily: "inherit" }} /></label>
                <p style={{ fontSize: 14, color: "#3d5448", margin: "14px 0 18px" }}>Nível: <b>{lvl}</b> · Período: <b>{tm}</b></p>
                <a className="btn" style={{ width: "100%", justifyContent: "center", textDecoration: "none" }} href={wa} target="_blank" rel="noreferrer">Confirmar no WhatsApp <span aria-hidden>→</span></a>
                <p style={{ fontSize: 12.5, color: "#6a8074", textAlign: "center", margin: "12px 0 0" }}>Abre o WhatsApp com a mensagem pronta. Nada é enviado antes de você tocar em enviar.</p>
              </div>
            )}
            {step > 1 && <button type="button" onClick={() => setStep(step - 1)} style={{ background: "none", border: 0, marginTop: 14, color: DG, fontWeight: 600, cursor: "pointer", fontSize: 14 }}>← Voltar</button>}
          </div>
        </div>
      )}
    </div>
  );
}
