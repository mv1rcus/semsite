import { useEffect, useRef, useState } from "react";

/** Autoescola nova, construída do zero a partir de um pin escuro com vermelho forte, cards de categoria e tabela de planos. Simulação de matrícula em 3 passos que fecha no WhatsApp. */
const RD = "#d62828", DK = "#121212", DK2 = "#1f1f1f", PA = "#f5f3f0", GY = "#5b5b5b", LN = "#e2dfda";
const CATS = [
  { k: "Carro", cat: "Categoria B", d: "Primeira habilitação com aulas práticas em carro novo e instrutor paciente.", img: "/auto-carro.webp" },
  { k: "Moto", cat: "Categoria A", d: "Equilíbrio, pilotagem segura e prova prática no mesmo lugar.", img: "/auto-moto.webp" },
  { k: "Carro + Moto", cat: "Categoria AB", d: "As duas habilitações juntas, com desconto e agenda combinada.", img: "/auto-combo.webp" },
];
const PLANS = [
  { n: "Teórico", p: "Curso teórico", items: ["45 horas de aula", "Simulados ilimitados", "Aulas online e presenciais"], hi: false },
  { n: "Essencial", p: "Habilitação B", items: ["Teórico completo", "20 aulas práticas", "Taxas acompanhadas"], hi: false },
  { n: "Completo", p: "Mais escolhido", items: ["Teórico + 25 aulas", "Carro para o exame", "Aula extra de baliza"], hi: true },
  { n: "Moto", p: "Habilitação A", items: ["Teórico completo", "20 aulas de pilotagem", "Capacete e colete"], hi: false },
];
const TEACH = [
  { n: "Marcos", r: "Instrutor de carro", img: "/auto-i1.webp" },
  { n: "Patrícia", r: "Instrutora de carro", img: "/auto-i2.webp" },
  { n: "Rogério", r: "Instrutor de moto", img: "/auto-i3.webp" },
];
const FACTS = [
  { t: "Taxa de aprovação alta", d: "Simulados toda semana e revisão antes da prova." },
  { t: "Horários flexíveis", d: "Aulas de segunda a sábado, de manhã, tarde ou noite." },
  { t: "Carros novos e adaptados", d: "Frota revisada, com duplo pedal em todos os carros." },
  { t: "Apoio com a papelada", d: "A gente cuida do processo, exames e agendamentos." },
];
const CHOICES = ["Carro (B)", "Moto (A)", "Carro + Moto (AB)", "Só o teórico"];
const TIMES = ["Manhã", "Tarde", "Noite", "Sábado"];
const Ic = ({ d, s = 26, c = "#fff" }: { d: string; s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);
const ICONS = ["M6 24l4-12h12l4 12M4 24h24M10 24v3M22 24v3", "M4 16h24M16 4v24M8 8l16 16M24 8L8 24", "M16 4l10 4v8c0 6-4 10-10 12C10 26 6 22 6 16V8z", "M6 8h20v16H6zM6 14h20"];

export function AutoescolaFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Rota Certa";
  const city = client?.city?.trim() || "Goiânia";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [cat, setCat] = useState("");
  const [tm, setTm] = useState("");
  const [cust, setCust] = useState("");
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const mdRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement as HTMLElement | null;
    const sel = 'button,a[href],input,[tabindex]:not([tabindex="-1"])';
    setTimeout(() => mdRef.current?.querySelector<HTMLElement>(".opt,input,a.btn")?.focus(), 30);
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
  const start = (pre?: string) => { setStep(pre ? 2 : 1); setCat(pre ?? ""); setTm(""); setOpen(true); setMenu(false); };
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero me matricular na ${brand}${cust ? ` em nome de ${cust}` : ""}. Habilitação: ${cat}. Melhor período: ${tm}.`)}`;

  return (
    <div className="ra" style={{ fontFamily: "Manrope, system-ui, sans-serif", color: DK, background: PA, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
        .ra *{box-sizing:border-box}
        .ra a,.ra button{font-family:inherit}
        .ra .wrap{max-width:1180px;margin:0 auto;padding:0 24px}
        .ra .disp{font-family:'Poppins',Manrope,sans-serif;font-weight:700;letter-spacing:-.01em;line-height:1.08;text-transform:uppercase}
        .ra .hero{background:linear-gradient(90deg,rgba(18,18,18,.93) 0%,rgba(18,18,18,.72) 42%,rgba(18,18,18,.25) 75%,rgba(18,18,18,.15) 100%),url("/auto-hero.webp") center/cover no-repeat,${DK};color:#fff;position:relative;overflow:hidden}
        .ra .nav{display:flex;align-items:center;justify-content:space-between;height:82px;gap:20px;position:relative;z-index:3}
        .ra .logo{display:flex;align-items:center;gap:12px;font-family:'Poppins',sans-serif;font-weight:600;font-size:20px;text-transform:none;letter-spacing:0;color:#fff}
        .ra .logo b{display:grid;place-items:center;width:42px;height:42px;background:${RD};border-radius:10px;border:2px solid #fff}
        .ra .links{display:flex;gap:30px;font-size:14.5px;font-weight:700}
        .ra .links a{color:#fff;cursor:pointer;padding:12px 4px;min-height:44px;box-sizing:border-box;border-bottom:3px solid transparent}.ra .links a:hover,.ra .links a.on{border-color:#fff}
        .ra .btn{background:${RD};color:#fff;border:2px solid ${RD};border-radius:10px;padding:0 28px;min-height:54px;font-weight:800;font-size:15.5px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:10px;text-transform:uppercase;letter-spacing:.02em;transition:transform .15s,background .15s}
        .ra .btn:hover{transform:translateY(-2px);background:#b81f1f;border-color:#b81f1f}
        .ra .btn.w{background:#fff;color:${RD};border-color:#fff}.ra .btn.w:hover{background:#f1eeea;border-color:#f1eeea}
        .ra .btn.o{background:transparent;border-color:#fff;color:#fff}.ra .btn.o:hover{background:rgba(255,255,255,.12)}
        .ra .btn.sm{min-height:44px;padding:0 20px;font-size:13.5px}
        .ra .burger{flex:none;min-width:46px;display:none;background:rgba(255,255,255,.14);border:0;border-radius:10px;width:46px;height:46px;cursor:pointer}
        .ra .herogrid{display:grid;grid-template-columns:1.4fr 1fr;gap:40px;align-items:center;padding:64px 0 110px;position:relative;z-index:2}
        .ra .herogrid>*{min-width:0}.ra .side{display:flex;flex-direction:column;gap:16px;align-items:flex-end}
        .ra .side .qc{width:100%;max-width:340px}.ra .side .qc:nth-child(2){box-shadow:inset -5px 0 0 ${RD},0 14px 30px rgba(0,0,0,.3)}
        .ra h1{font-size:clamp(34px,4.6vw,64px);margin:0;color:#fff}
        .ra h1 em{font-style:normal;color:${RD};-webkit-text-stroke:0;background:#fff;padding:0 .14em;display:inline-block;transform:skewX(-6deg)}
        .ra .lead{font-size:18.5px;line-height:1.6;max-width:500px;margin:26px 0 32px;color:#e9e6e2}
        .ra .eyebrow{font-family:'Poppins',sans-serif;font-weight:300;font-size:22px;letter-spacing:.01em;padding-bottom:14px;border-bottom:1px solid rgba(255,255,255,.55);display:inline-block;min-width:160px}
        .ra h1 .lt{font-weight:300}
        .ra .tag{display:inline-flex;align-items:center;gap:8px;border:2px solid #fff;border-radius:999px;padding:7px 16px;font-size:12.5px;font-weight:800;text-transform:uppercase;letter-spacing:.06em}
        .ra .hp{position:relative;border-radius:18px;overflow:hidden;box-shadow:0 30px 60px rgba(0,0,0,.45);border:6px solid #fff}
        .ra .hp img{display:block;width:100%;aspect-ratio:4/4.3;object-fit:cover}
                .ra .qc{background:#fff;color:#b01919;border-radius:12px;padding:10px;display:flex;align-items:center;gap:14px;box-shadow:0 14px 30px rgba(0,0,0,.3)}
        .ra .qc img{flex:none;width:72px;height:72px;object-fit:cover;border-radius:8px}
        .ra .qc span{font-size:15px;font-weight:600;line-height:1.4}
        .ra .stats{background:${DK2};color:#fff;position:relative;z-index:4}
        .ra .stats .wrap{display:grid;grid-template-columns:repeat(4,1fr)}
        .ra .stats div.s{padding:26px 20px;border-left:1px solid rgba(255,255,255,.14)}.ra .stats div.s:first-child{border:0}
        .ra .stats b{font-family:'Poppins',sans-serif;font-weight:700;font-size:34px;display:block;color:#fff}
        .ra .stats span{font-size:13.5px;color:#cfcac4;font-weight:600}
        .ra .sec{padding:100px 0 0}
        .ra h2{font-size:clamp(32px,4.2vw,54px);margin:14px 0 0}
        .ra .eb{display:inline-block;color:${RD};font-weight:800;font-size:13px;text-transform:uppercase;letter-spacing:.14em;border-left:4px solid ${RD};padding-left:12px}
        .ra .ab{display:grid;grid-template-columns:1fr 1.1fr;gap:56px;align-items:center}
        .ra .abp{position:relative}.ra .abp img{display:block;width:100%;aspect-ratio:4/4.4;object-fit:cover;border-radius:16px}
        .ra .abp:before{content:"";position:absolute;left:-16px;top:-16px;width:60%;height:60%;border-left:8px solid ${RD};border-top:8px solid ${RD};border-radius:16px 0 0 0;z-index:-1}
        .ra .fg{display:grid;grid-template-columns:1fr 1fr;gap:26px 24px;margin-top:34px}
        .ra .fi{display:flex;gap:14px}.ra .fi i{flex:none;width:46px;height:46px;border-radius:10px;background:${RD};display:grid;place-items:center}
        .ra .fi b{display:block;font-size:16.5px;font-weight:800}.ra .fi span{display:block;font-size:14.5px;line-height:1.5;color:${GY};margin-top:4px}
        .ra .red{background:${RD};margin-top:100px;padding:84px 0;color:#fff}
        .ra .cg{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:40px}
        .ra .cc{background:#fff;color:${DK};border-radius:16px;overflow:hidden;cursor:pointer;border:0;text-align:left;padding:0;transition:transform .2s;box-shadow:0 14px 30px rgba(0,0,0,.18);display:flex;flex-direction:column}
        .ra .cc:hover{transform:translateY(-6px)}
        .ra .cc img{display:block;width:100%;aspect-ratio:16/10;object-fit:cover}
        .ra .cc .in{padding:22px 24px 26px;display:flex;flex-direction:column;gap:8px;flex:1}
        .ra .cc em{font-style:normal;font-size:12.5px;font-weight:800;color:${RD};text-transform:uppercase;letter-spacing:.1em}
        .ra .cc h3{font-family:'Poppins',sans-serif;font-weight:700;font-size:26px;margin:0;text-transform:uppercase}
        .ra .cc p{margin:0;font-size:15px;line-height:1.55;color:${GY}}
        .ra .cc .go{margin-top:auto;padding-top:10px;font-weight:800;font-size:14px;color:${RD}}
        .ra .info{display:grid;grid-template-columns:repeat(3,1fr);gap:0;background:#fff;border-radius:16px;margin-top:-1px;box-shadow:0 10px 30px rgba(18,18,18,.08);overflow:hidden;border:1px solid ${LN}}
        .ra .info div{padding:24px 26px;border-left:1px solid ${LN}}.ra .info div:first-child{border:0}
        .ra .info b{display:block;font-size:12.5px;text-transform:uppercase;letter-spacing:.12em;color:${RD};font-weight:800}
        .ra .info span{display:block;margin-top:6px;font-size:16px;font-weight:700;line-height:1.4}
        .ra .pg{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:44px;align-items:stretch}
        .ra .pc{background:${DK2};color:#fff;border-radius:16px;padding:32px 24px;display:flex;flex-direction:column;gap:16px;position:relative}
        .ra .pc.hi{background:${RD};transform:translateY(-14px);box-shadow:0 24px 44px rgba(214,40,40,.35)}
        .ra .pc em{font-style:normal;font-size:12.5px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;opacity:1;font-size:13.5px}
        .ra .pc h3{font-family:'Poppins',sans-serif;font-weight:700;font-size:30px;margin:0;text-transform:uppercase}
        .ra .pc ul{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:12px;font-size:16px;line-height:1.45;flex:1;color:#fff}
        .ra .pc li{display:flex;gap:10px}.ra .pc li:before{content:"✓";font-weight:700;color:${RD}}.ra .pc.hi li:before{color:#fff}
        .ra .tg3{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:40px}
        .ra .tc{background:#fff;border-radius:16px;overflow:hidden;border:1px solid ${LN}}
        .ra .tc img{display:block;width:100%;aspect-ratio:4/4.2;object-fit:cover}
        .ra .tc div{padding:18px 22px 22px;border-top:5px solid ${RD}}
        .ra .tc b{font-family:'Poppins',sans-serif;font-weight:700;font-size:22px;text-transform:uppercase;display:block}
        .ra .tc span{font-size:14.5px;color:${GY};font-weight:600}
        .ra .cta{background:${DK};border-radius:20px;color:#fff;display:grid;grid-template-columns:1.2fr 1fr;gap:30px;align-items:center;padding:54px 52px;margin:100px 0 70px;position:relative;overflow:hidden}
        .ra .cta:after{content:"";position:absolute;right:-60px;top:-20%;width:300px;height:140%;background:${RD};transform:skewX(-14deg)}
        .ra .cta h3{font-size:clamp(32px,4vw,52px);margin:0;position:relative;z-index:2}.ra .cta p{margin:16px 0 28px;font-size:17px;line-height:1.55;color:#e0dcd7;max-width:460px;position:relative;z-index:2}
        .ra .cta .bw{position:relative;z-index:2}
        .ra footer{background:${DK};color:#d6d2cc;padding:38px 0}
        .ra .fr{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;font-size:14.5px}
        .ra .fr nav{display:flex;gap:26px}.ra .fr nav a{cursor:pointer;color:#d6d2cc}
        .ra .wa{position:fixed;right:18px;bottom:18px;z-index:40;width:58px;height:58px;border-radius:50%;background:#25d366;display:grid;place-items:center;box-shadow:0 8px 24px rgba(0,0,0,.3)}
        .ra .ov{position:fixed;inset:0;z-index:100;background:rgba(18,18,18,.7);display:flex;align-items:center;justify-content:center;padding:16px}
        .ra .md{background:#fff;width:100%;max-width:520px;max-height:92vh;overflow:auto;padding:32px;border-radius:18px;position:relative;border-top:8px solid ${RD}}
        .ra .md h3{font-family:'Poppins',sans-serif;font-weight:700;font-size:28px;margin:12px 0 4px;text-transform:uppercase}
        .ra .bars{display:flex;gap:6px;margin:14px 0 20px}.ra .bars i{flex:1;height:6px;border-radius:6px;background:${LN}}.ra .bars i.on{background:${RD}}
        .ra .opt{padding:14px 10px;border:2px solid ${LN};border-radius:10px;background:#fff;cursor:pointer;font-size:15px;font-weight:700;text-align:center;min-height:52px;color:${DK}}
        .ra .opt:hover{border-color:${RD}}.ra .opt.on{background:${RD};color:#fff;border-color:${RD}}
        .ra .x{position:absolute;right:14px;top:16px;width:44px;height:44px;border:0;background:none;font-size:28px;cursor:pointer;color:${DK}}
        .ra .mob{display:none}
        .ra :focus-visible{outline:3px solid #fff;outline-offset:2px;box-shadow:0 0 0 6px ${DK}}
        .ra .md :focus-visible,.ra .cc:focus-visible{outline:3px solid ${RD};box-shadow:none}
        @media(max-width:900px){
          .ra .links{display:none}.ra .burger{display:grid;place-items:center}.ra .nav{height:68px;gap:8px}.ra .logo{font-size:17px}.ra .logo b{width:36px;height:36px}.ra .navbtn{margin-left:auto;min-height:44px!important;padding:0 14px!important;font-size:12.5px!important;white-space:nowrap}
          .ra .hero{background:linear-gradient(180deg,rgba(18,18,18,.88) 0%,rgba(18,18,18,.8) 100%),url("/auto-hero.webp") center/cover no-repeat,${DK}}
          .ra .side{align-items:stretch}.ra .side .qc{max-width:none}
          .ra .herogrid{grid-template-columns:1fr;gap:40px;padding:14px 0 50px}.ra h1{font-size:clamp(30px,9vw,50px)}
          
          .ra .stats .wrap{grid-template-columns:1fr 1fr;padding:0}.ra .stats div.s{padding:20px 22px;border-left:0;border-top:1px solid rgba(255,255,255,.14)}.ra .stats div.s:nth-child(-n+2){border-top:0}.ra .stats div.s:nth-child(even){border-left:1px solid rgba(255,255,255,.14)}.ra .stats b{font-size:28px}
          .ra .sec{padding-top:64px}.ra .ab{grid-template-columns:1fr;gap:36px}.ra .fg{grid-template-columns:1fr}
          .ra .red{margin-top:64px;padding:60px 0}.ra .cg{grid-template-columns:1fr;gap:18px}
          .ra .info{grid-template-columns:1fr}.ra .info div{border-left:0;border-top:1px solid ${LN}}.ra .info div:first-child{border-top:0}
          .ra .pg{grid-template-columns:minmax(0,1fr);gap:14px}.ra .pc{padding:24px 18px}.ra .pc.hi{transform:none}.ra .pc h3{font-size:24px}
          .ra .tg3{grid-template-columns:1fr;gap:16px}.ra .tc{display:grid;grid-template-columns:130px 1fr}.ra .tc img{aspect-ratio:1;height:100%}.ra .tc div{border-top:0;border-left:5px solid ${RD};align-self:stretch;display:flex;flex-direction:column;justify-content:center}
          .ra .cta{grid-template-columns:1fr;padding:38px 26px;margin:64px 0 50px}.ra .cta:after{width:120px;right:-50px;top:-10%}
          .ra .fr{justify-content:center;text-align:center}.ra .fr nav{gap:18px;flex-wrap:wrap;justify-content:center}
          .ra .mob{display:block;background:#fff;color:${DK};border-radius:12px;margin:0 0 12px;box-shadow:0 8px 24px rgba(0,0,0,.3)}.ra .mob a{display:block;padding:15px 20px;font-size:15px;font-weight:700;cursor:pointer;border-top:1px solid ${LN}}.ra .mob a:first-child{border:0}
          .ra .md{padding:26px 20px}
        }
      `}</style>

      <div className="hero" id="top">
        <div className="wrap">
          <header className="nav">
            <div className="logo">{brand}</div>
            <nav className="links"><a className="on" onClick={() => go("top")}>Início</a><a onClick={() => go("categorias")}>Habilitação</a><a onClick={() => go("planos")}>Planos</a><a onClick={() => go("instrutores")}>Instrutores</a><a onClick={() => go("contato")}>Contato</a></nav>
            <button type="button" className="btn w sm navbtn" onClick={() => start()}>Matricular</button>
            <button type="button" className="burger" aria-label="Menu" onClick={() => setMenu((m) => !m)}><svg width="24" height="24" viewBox="0 0 26 26" stroke="#fff" strokeWidth="2.4" strokeLinecap="round"><path d="M3 7h20M3 13h20M3 19h20" /></svg></button>
          </header>
          {menu && <div className="mob"><a onClick={() => go("categorias")}>Habilitação</a><a onClick={() => go("planos")}>Planos</a><a onClick={() => go("instrutores")}>Instrutores</a><a onClick={() => go("contato")}>Contato</a></div>}
          <div className="herogrid">
            <div>
              <div className="eyebrow">A escolha certa</div>
              <h1 className="disp" style={{ marginTop: 18 }}>Autoescola<br />e cursos de<br />habilitação<br /><span className="lt">em {city}</span></h1>
              <p className="lead">Instrutores pacientes, carros novos e aulas no seu horário. Do teórico à prova prática, a gente vai com você.</p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <button type="button" className="btn" onClick={() => start()}>Quero tirar minha CNH</button>
                <button type="button" className="btn o" onClick={() => go("planos")}>Ver planos</button>
              </div>
            </div>
            <div className="side">
              {[{ i: "/auto-carro.webp", t: "Aulas práticas em carro novo, com instrutor ao lado." }, { i: "/auto-moto.webp", t: "Pátio de treino e pilotagem segura para a categoria A." }, { i: "/auto-combo.webp", t: "Pacote carro + moto com desconto e agenda combinada." }].map((c) => (
                <div className="qc" key={c.i}><img src={c.i} alt="" /><span>{c.t}</span></div>
              ))}
            </div>
          </div>
        </div>
        <div className="stats"><div className="wrap">
          <div className="s"><b>15 anos</b><span>de estrada</span></div>
          <div className="s"><b>+4.000</b><span>habilitados*</span></div>
          <div className="s"><b>12 carros</b><span>novos e adaptados</span></div>
          <div className="s"><b>Seg a sáb</b><span>manhã, tarde e noite</span></div>
        </div></div>
      </div>

      <section className="sec" id="sobre"><div className="wrap ab">
        <div className="abp"><img src="/auto-about.webp" alt="Aluna sorrindo com a chave do carro" loading="lazy" /></div>
        <div>
          <span className="eb">Por que a {brand}</span>
          <h2 className="disp">Aprender a dirigir<br />do jeito certo</h2>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: GY, margin: "18px 0 0", maxWidth: 520 }}>Nada de pressão. Você aprende no seu ritmo, com instrutor ao lado e suporte do começo ao fim do processo.</p>
          <div className="fg">
            {FACTS.map((f, i) => (<div className="fi" key={f.t}><i><Ic d={ICONS[i]!} /></i><div><b>{f.t}</b><span>{f.d}</span></div></div>))}
          </div>
        </div>
      </div></section>

      <section className="red" id="categorias"><div className="wrap">
        <span className="eb" style={{ color: "#fff", borderColor: "#fff" }}>Habilitação</span>
        <h2 className="disp">Escolha sua<br />categoria</h2>
        <div className="cg">
          {CATS.map((c) => (
            <button type="button" className="cc" key={c.k} onClick={() => start(`${c.k} (${c.cat.replace("Categoria ", "")})`)}>
              <img src={c.img} alt={c.k} loading="lazy" />
              <div className="in"><em>{c.cat}</em><h3>{c.k}</h3><p>{c.d}</p><span className="go">Quero essa →</span></div>
            </button>
          ))}
        </div>
      </div></section>

      <section style={{ marginTop: -30, position: "relative", zIndex: 2 }}><div className="wrap">
        <div className="info">
          <div><b>Endereço</b><span>Av. Goiás, 1200, {city}</span></div>
          <div><b>Atendimento</b><span>Seg a sex 7h às 21h<br />Sáb 8h às 14h</span></div>
          <div><b>Matrícula</b><span>Leve RG, CPF e comprovante de residência</span></div>
        </div>
      </div></section>

      <section className="sec" id="planos"><div className="wrap">
        <span className="eb">Planos</span>
        <h2 className="disp">Pacotes para<br />cada bolso</h2>
        <p style={{ color: GY, fontSize: 16, margin: "14px 0 0" }}>Valores e parcelas combinados na matrícula, sem surpresa.</p>
        <div className="pg">
          {PLANS.map((p) => (
            <div className={`pc${p.hi ? " hi" : ""}`} key={p.n}>
              <em>{p.p}</em><h3>{p.n}</h3>
              <ul>{p.items.map((i) => (<li key={i}>{i}</li>))}</ul>
              <button type="button" className={`btn sm${p.hi ? " w" : ""}`} onClick={() => start()}>Quero esse</button>
            </div>
          ))}
        </div>
      </div></section>

      <section className="sec" id="instrutores"><div className="wrap">
        <span className="eb">Instrutores</span>
        <h2 className="disp">Quem vai<br />te ensinar</h2>
        <div className="tg3">
          {TEACH.map((p) => (<div className="tc" key={p.n}><img src={p.img} alt={p.n} loading="lazy" /><div><b>{p.n}</b><span>{p.r}</span></div></div>))}
        </div>
      </div></section>

      <section id="contato"><div className="wrap">
        <div className="cta">
          <div>
            <h3 className="disp">Comece hoje<br />sua habilitação</h3>
            <p>Escolha a categoria e o melhor período. A gente confirma a matrícula pelo WhatsApp.</p>
            <div className="bw"><button type="button" className="btn" onClick={() => start()}>Quero me matricular</button></div>
          </div>
          <div />
        </div>
      </div></section>

      <footer><div className="wrap fr">
        <div><span style={{ fontFamily: "Poppins,sans-serif", fontWeight: 700, fontSize: 21, color: "#fff", textTransform: "uppercase" }}>{brand}</span><div style={{ marginTop: 8, lineHeight: 1.6 }}>Av. Goiás, 1200, {city}<br />Seg a sex, 7h às 21h · Sáb, 8h às 14h</div></div>
        <nav><a onClick={() => go("categorias")}>Habilitação</a><a onClick={() => go("planos")}>Planos</a><a onClick={() => go("instrutores")}>Instrutores</a></nav>
        <div style={{ lineHeight: 1.7 }}><a href={`https://wa.me/${num}`} target="_blank" rel="noreferrer" style={{ color: "#fff", fontWeight: 800, textDecoration: "underline" }}>WhatsApp: fale com a gente</a><br />Instagram: @rotacertago</div>
      </div><div className="wrap" style={{ marginTop: 22, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.18)", fontSize: 13, color: "#b8b3ad" }}>Site de demonstração: fotos, nomes, números de aprovação (*) e endereço são ilustrativos.</div></footer>

      {sc && !open && (<a className="wa" href={`https://wa.me/${num}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg></a>)}

      {open && (
        <div className="ov" onClick={() => setOpen(false)}>
          <div className="md" ref={mdRef} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Iniciar matrícula">
            <button type="button" className="x" aria-label="Fechar" onClick={() => setOpen(false)}>×</button>
            <span className="eb">Matrícula rápida</span>
            <h3>{step === 1 ? "Qual habilitação?" : step === 2 ? "Melhor período?" : "Quase lá!"}</h3>
            <div className="bars">{[1, 2, 3].map((n) => (<i key={n} className={n <= step ? "on" : ""} />))}</div>
            {step === 1 && (<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>{CHOICES.map((l) => (<button type="button" key={l} className={`opt${cat === l ? " on" : ""}`} onClick={() => { setCat(l); setStep(2); }}>{l}</button>))}</div>)}
            {step === 2 && (<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>{TIMES.map((x) => (<button type="button" key={x} className={`opt${tm === x ? " on" : ""}`} onClick={() => { setTm(x); setStep(3); }}>{x}</button>))}</div>)}
            {step === 3 && (
              <div>
                <label style={{ fontSize: 14, fontWeight: 700 }}>Seu nome<input value={cust} onChange={(e) => setCust(e.target.value)} placeholder="Como podemos te chamar?" style={{ display: "block", width: "100%", marginTop: 8, padding: "15px 16px", borderRadius: 10, border: `2px solid ${LN}`, fontSize: 16, fontFamily: "inherit" }} /></label>
                <p style={{ fontSize: 14, color: GY, margin: "14px 0 18px" }}>Habilitação: <b>{cat}</b> · Período: <b>{tm}</b></p>
                <a className="btn" style={{ width: "100%", textDecoration: "none" }} href={wa} target="_blank" rel="noreferrer">Confirmar no WhatsApp</a>
                <p style={{ fontSize: 12.5, color: GY, textAlign: "center", margin: "12px 0 0" }}>Abre o WhatsApp com a mensagem pronta. Nada é enviado antes de você tocar em enviar.</p>
              </div>
            )}
            {step > 1 && <button type="button" onClick={() => setStep(step - 1)} style={{ background: "none", border: 0, marginTop: 14, color: RD, fontWeight: 800, cursor: "pointer", fontSize: 14, minHeight: 44 }}>← Voltar</button>}
          </div>
        </div>
      )}
    </div>
  );
}
