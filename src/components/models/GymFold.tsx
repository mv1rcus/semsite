import { useEffect, useState } from "react";

/** Academia nova, construida do zero a partir de um pin escuro em preto e verde limao. Aula experimental em 3 passos que fecha no WhatsApp. */
const L = "#c8f230", BK = "#0a0b0a", CARD = "#141614", LINE = "#262a26", MUT = "#c3c9c3";
const CL = [
  { n: "Musculação", d: "Treino de força com acompanhamento.", img: "/gym-t1.webp" },
  { n: "Yoga e mobilidade", d: "Flexibilidade, postura e foco.", img: "/gym-t2.webp" },
  { n: "Cardio", d: "Resistência e queima de energia.", img: "/gym-t3.webp" },
  { n: "Boxe funcional", d: "Técnica, ritmo e condicionamento.", img: "/gym-t4.webp" },
];
const FEAT = [
  { t: "Treinadores experientes", d: "Orientação de verdade", ic: "M16 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM5 28c0-6 5-9 11-9s11 3 11 9" },
  { t: "Aparelhos modernos", d: "Equipamento de ponta", ic: "M3 12v8M7 9v14M25 9v14M29 12v8M7 16h18" },
  { t: "Planos flexíveis", d: "Sem fidelidade", ic: "M4 8h24v18H4zM4 14h24M10 4v6M22 4v6" },
  { t: "Comunidade", d: "Treine junto", ic: "M11 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM21 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM3 26c0-5 4-7 8-7s8 2 8 7M19 20c4 0 10 1 10 6" },
];
const STATS = [["10 mil+", "Alunos ativos"], ["12", "Modalidades"], ["98%", "Satisfação"], ["50+", "Aulas por semana"]];
const TR = [
  { n: "Rafael Souza", r: "Musculação e força", img: "/gym-c1.webp" },
  { n: "Carla Mendes", r: "Funcional e yoga", img: "/gym-c2.webp" },
  { n: "Diego Alves", r: "Boxe e condicionamento", img: "/gym-c3.webp" },
];
const TESTI = [
  { q: "Em 3 meses mudei minha rotina. Os treinadores acompanham de perto e o ambiente motiva demais.", n: "Bianca L.", img: "/gym-c2.webp" },
  { q: "Academia limpa, aparelhos novos e horário que cabe no meu dia. Marquei a aula experimental pelo site.", n: "Thiago R.", img: "/gym-c1.webp" },
];
const TIMES = ["06:00", "08:00", "10:00", "12:00", "17:00", "19:00"];
const DOW = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
function nextDays() {
  const out: { dow: string; d: number; label: string }[] = [];
  const t = new Date();
  for (let i = 1; out.length < 6; i++) {
    const x = new Date(t.getFullYear(), t.getMonth(), t.getDate() + i);
    if (x.getDay() === 0) continue;
    const w = DOW[x.getDay()] ?? "";
    out.push({ dow: w, d: x.getDate(), label: `${w}, ${String(x.getDate()).padStart(2, "0")}/${String(x.getMonth() + 1).padStart(2, "0")}` });
  }
  return out;
}
const Ic = ({ d, s = 28, c = L }: { d: string; s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);
const DB = "M3 12v8M7 9v14M25 9v14M29 12v8M7 16h18";

export function GymFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Força Viva";
  const city = client?.city?.trim() || "Goiânia";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [mod, setMod] = useState(CL[0]!.n);
  const [day, setDay] = useState(0);
  const [time, setTime] = useState("");
  const [cust, setCust] = useState("");
  const [ti, setTi] = useState(0);
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  const [days] = useState(nextDays);
  useEffect(() => { const f = () => setSc(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const start = (s?: string) => { if (s) setMod(s); setStep(1); setTime(""); setOpen(true); setMenu(false); };
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero marcar uma aula experimental na ${brand}${cust ? `, sou ${cust}` : ""}: ${mod}, ${days[day]?.label ?? ""} às ${time}.`)}`;
  const t = TESTI[ti]!;

  return (
    <div className="gf" style={{ fontFamily: "Barlow, system-ui, sans-serif", color: "#fff", background: BK, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@600;700;800&display=swap');
        .gf *{box-sizing:border-box}
        .gf a,.gf button{font-family:inherit}
        .gf .wrap{max-width:1180px;margin:0 auto;padding:0 24px}
        .gf .nav{display:flex;align-items:center;justify-content:space-between;height:78px;gap:20px}
        .gf .logo{display:flex;align-items:center;gap:10px;font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:28px;letter-spacing:.5px;text-transform:uppercase}
        .gf .links{display:flex;gap:30px;font-size:15px;font-weight:500}
        .gf .links a{color:#d8ddd8;cursor:pointer}.gf .links a.on{color:${L}}
        .gf .btn{background:${L};color:#0a0b0a;border:0;border-radius:10px;padding:0 26px;min-height:50px;font-weight:700;font-size:15.5px;cursor:pointer;display:inline-flex;align-items:center;gap:10px;text-decoration:none}
        .gf .btn:hover{filter:brightness(1.08)}
        .gf .btn.o{background:transparent;color:#fff;border:1.5px solid #3a3f3a}
        .gf .btn.o:hover{border-color:${L}}
        .gf .burger{display:none;background:none;border:0;width:44px;height:44px;cursor:pointer}
        .gf .hero{position:relative;overflow:hidden;background:radial-gradient(ellipse at 75% 40%,#1f2a12 0,#0a0b0a 62%)}
        .gf .herogrid{display:grid;grid-template-columns:1fr 1fr;align-items:end;gap:10px;min-height:640px}
        .gf .kick{display:inline-flex;align-items:center;gap:8px;font-size:13px;letter-spacing:3px;text-transform:uppercase;font-weight:600;color:${L}}
        .gf h1{font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:clamp(54px,7.4vw,100px);line-height:.95;margin:18px 0 0;text-transform:uppercase;letter-spacing:-.5px}
        .gf h1 em{font-style:normal;color:${L}}
        .gf .lead{font-size:18px;line-height:1.6;color:#c5cbc5;margin:24px 0 32px;max-width:470px}
        .gf .herophoto{position:relative;overflow:visible;display:flex;justify-content:center;align-items:flex-end;align-self:stretch;min-height:520px}
        .gf .slash{position:absolute;right:-40px;top:70px;bottom:0;width:62%;background:linear-gradient(160deg,#c8f230 0,#9cc21a 100%);clip-path:polygon(38% 0,100% 0,100% 100%,0 100%);opacity:.92;z-index:0}
        .gf .herophoto img{height:660px;margin-bottom:-10px;width:auto;max-width:100%;object-fit:contain;position:relative;z-index:2;filter:drop-shadow(0 0 40px rgba(200,242,48,.18))}
        .gf .glow{position:absolute;bottom:40px;width:420px;height:420px;border-radius:50%;background:radial-gradient(circle,rgba(200,242,48,.28),rgba(200,242,48,0) 68%);z-index:1}
        .gf .feats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:-2px;position:relative;z-index:3;padding-bottom:30px}
        .gf .feat{background:rgba(20,22,20,.92);border:1px solid ${LINE};border-radius:14px;padding:18px;display:flex;gap:14px;align-items:center}
        .gf .feat i{width:46px;height:46px;border-radius:50%;background:#1d2a0e;display:grid;place-items:center;flex:none}
        .gf .feat b{display:block;font-size:15.5px}.gf .feat span{font-size:13.5px;color:${MUT}}
        .gf .sec{padding:76px 0}
        .gf .eyebrow{font-size:13px;letter-spacing:3px;text-transform:uppercase;font-weight:600;color:${L}}
        .gf h2{font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:clamp(36px,4.6vw,58px);line-height:1;margin:12px 0 0;text-transform:uppercase}
        .gf h2 em{font-style:normal;color:${L}}
        .gf .cls{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:36px}
        .gf .cl{position:relative;border:1px solid ${LINE};border-radius:16px;overflow:hidden;aspect-ratio:3/4.1;cursor:pointer;background:${CARD};text-align:left;padding:0;color:#fff}
        .gf .cl img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .4s}
        .gf .cl:hover img{transform:scale(1.05)}
        .gf .cl:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 40%,rgba(0,0,0,.88))}
        .gf .cl div{position:absolute;left:18px;right:18px;bottom:16px;z-index:2}
        .gf .cl b{font-family:'Barlow Condensed',sans-serif;font-size:26px;text-transform:uppercase;display:block}
        .gf .cl span{font-size:14.5px;color:#e2e6e2;display:block;margin:2px 0 8px;min-height:44px}
        .gf .cl u{text-decoration:none;color:${L};font-weight:600;font-size:14px}
        .gf .aboutgrid{display:grid;grid-template-columns:1.05fr 1fr;gap:54px;align-items:center}
        .gf .aimg{position:relative}.gf .aimg img{width:100%;aspect-ratio:16/11;object-fit:cover;border-radius:20px;display:block;border:1px solid ${LINE}}
        .gf .aimg .chip2{position:absolute;right:-12px;bottom:-18px;background:${L};color:#0a0b0a;border-radius:14px;padding:14px 20px;font-weight:700;line-height:1.15}
        .gf .aimg .chip2 b{font-family:'Barlow Condensed',sans-serif;font-size:34px;display:block}
        .gf .ck{display:grid;grid-template-columns:1fr 1fr;gap:12px 18px;margin:26px 0 30px;font-size:15.5px}
        .gf .ck div{display:flex;gap:10px;align-items:center}
        .gf .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:50px}
        .gf .st{border:1px solid ${LINE};background:${CARD};border-radius:14px;padding:22px;text-align:center}
        .gf .st b{font-family:'Barlow Condensed',sans-serif;font-size:44px;color:${L};display:block;line-height:1}
        .gf .st span{font-size:14px;color:${MUT}}
        .gf .trs{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:36px}
        .gf .tr{border:1px solid ${LINE};border-radius:16px;overflow:hidden;background:${CARD}}
        .gf .tr img{width:100%;aspect-ratio:4/4.4;object-fit:cover;object-position:top;display:block}
        .gf .tr div{padding:16px 18px}.gf .tr b{font-size:18px;display:block}.gf .tr span{font-size:14px;color:${MUT}}
        .gf .tst{display:grid;grid-template-columns:1.2fr 1fr;gap:20px;margin-top:36px;align-items:stretch}
        .gf .qc{background:${CARD};border:1px solid ${LINE};border-radius:18px;padding:30px;display:flex;flex-direction:column;gap:16px}
        .gf .qc p{font-size:20px;line-height:1.55;margin:0;font-weight:500}
        .gf .face{width:54px;height:54px;border-radius:50%;object-fit:cover;object-position:top}
        .gf .arr{width:44px;height:44px;border-radius:50%;border:1.5px solid #3a3f3a;background:transparent;color:#fff;cursor:pointer;font-size:17px}
        .gf .arr:hover{border-color:${L};color:${L}}
        .gf .ctab{border-radius:20px;overflow:hidden;position:relative;border:1px solid ${LINE};display:flex;flex-direction:column;justify-content:center;padding:34px;background:linear-gradient(120deg,rgba(10,11,10,.92),rgba(10,11,10,.5)),url(/gym-wide.webp) center/cover}
        .gf .ctab h3{font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:38px;line-height:1;margin:0 0 10px;text-transform:uppercase}
        .gf .ctab h3 em{font-style:normal;color:${L}}
        .gf .ctab p{margin:0 0 22px;color:#cfd5cf}
        .gf footer{border-top:1px solid ${LINE};padding:34px 0}
        .gf .fr{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap}
        .gf .fr nav{display:flex;gap:26px;font-size:14.5px}.gf .fr nav a{color:#d8ddd8;cursor:pointer}
        .gf .wa{position:fixed;right:18px;bottom:18px;z-index:40;width:58px;height:58px;border-radius:50%;background:#25d366;display:grid;place-items:center;box-shadow:0 8px 24px rgba(0,0,0,.5)}
        .gf .ov{position:fixed;inset:0;z-index:100;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;padding:16px}
        .gf .md{background:#121412;border:1px solid ${LINE};width:100%;max-width:520px;max-height:92vh;overflow:auto;padding:32px;border-radius:22px;position:relative}
        .gf .md h3{font-family:'Barlow Condensed',sans-serif;font-size:34px;text-transform:uppercase;margin:6px 0 4px}
        .gf .tag{display:inline-block;background:#1d2a0e;color:${L};border-radius:999px;padding:6px 14px;font-size:13px;font-weight:600}
        .gf .bars{display:flex;gap:6px;margin:14px 0 20px}.gf .bars i{flex:1;height:4px;border-radius:4px;background:#2a2e2a}.gf .bars i.on{background:${L}}
        .gf .opt{display:flex;justify-content:space-between;width:100%;padding:15px 18px;margin-bottom:10px;border:1.5px solid #2e332e;border-radius:12px;background:#181b18;color:#fff;cursor:pointer;font-size:15.5px;min-height:52px;text-align:left}
        .gf .opt.on{border-color:${L};background:#1d2a0e}
        .gf .chip{padding:12px 6px;border:1.5px solid #2e332e;border-radius:12px;background:#181b18;color:#fff;cursor:pointer;font-size:15px;text-align:center;min-height:46px}
        .gf .chip.on{background:${L};color:#0a0b0a;border-color:${L}}
        .gf .x{position:absolute;right:14px;top:12px;width:44px;height:44px;border:0;background:none;color:#fff;font-size:26px;cursor:pointer}
        .gf .mob{display:none}
        @media(max-width:900px){
          .gf .links,.gf .navbtn{display:none}.gf .burger{display:block}.gf .nav{height:68px}.gf .logo{font-size:24px}
          .gf .herogrid{grid-template-columns:1fr;min-height:0;gap:0;padding-top:20px}.gf .herophoto{min-height:380px;margin-top:10px}.gf .herophoto img{height:430px}.gf .glow{width:300px;height:300px}.gf .slash{width:80%}
          .gf .feats{grid-template-columns:1fr 1fr;gap:10px}.gf .feat{padding:14px;flex-direction:column;align-items:flex-start;gap:10px}
          .gf .cls{grid-template-columns:1fr 1fr;gap:12px}.gf .cl b{font-size:22px}
          .gf .aboutgrid{grid-template-columns:1fr;gap:40px}.gf .ck{grid-template-columns:1fr}.gf .stats{grid-template-columns:1fr 1fr}
          .gf .trs{grid-template-columns:1fr 1fr 1fr;gap:10px}.gf .tr div{padding:10px}.gf .tr b{font-size:14px}.gf .tr span{font-size:12px}
          .gf .tst{grid-template-columns:1fr}.gf .qc p{font-size:18px}.gf .ctab{padding:26px 22px}
          .gf .fr{justify-content:center;text-align:center}.gf .fr nav{gap:18px;flex-wrap:wrap;justify-content:center}
          .gf .mob{display:block;background:#141614;border:1px solid ${LINE};border-radius:14px;margin:0 16px 10px}.gf .mob a{display:block;padding:15px 20px;font-size:15px;cursor:pointer;border-top:1px solid ${LINE}}.gf .mob a:first-child{border:0}
          .gf .md{padding:26px 20px}
        }
      `}</style>

      <div className="hero">
        <header style={{ position: "relative", zIndex: 3 }}>
          <div className="wrap nav">
            <div className="logo"><Ic d={DB} s={34} />{brand}</div>
            <nav className="links"><a className="on" onClick={() => go("top")}>Início</a><a onClick={() => go("aulas")}>Aulas</a><a onClick={() => go("sobre")}>Sobre</a><a onClick={() => go("equipe")}>Treinadores</a><a onClick={() => go("contato")}>Contato</a></nav>
            <button type="button" className="btn navbtn" onClick={() => start()}>Aula experimental</button>
            <button type="button" className="burger" aria-label="Menu" onClick={() => setMenu((m) => !m)}><svg width="26" height="26" viewBox="0 0 26 26" stroke="#fff" strokeWidth="2"><path d="M3 7h20M3 13h20M3 19h20" /></svg></button>
          </div>
          {menu && <div className="mob"><a onClick={() => go("aulas")}>Aulas</a><a onClick={() => go("sobre")}>Sobre</a><a onClick={() => go("equipe")}>Treinadores</a><a onClick={() => go("contato")}>Contato</a><a onClick={() => start()} style={{ color: L, fontWeight: 700 }}>Aula experimental</a></div>}
        </header>

        <section id="top">
          <div className="wrap herogrid">
            <div style={{ alignSelf: "center", paddingBottom: 30 }}>
              <span className="kick">Mais forte · Mais saudável · {city}</span>
              <h1>Seu corpo,<br /><em>nossa prioridade</em></h1>
              <p className="lead">Treine com orientação de verdade, aparelhos modernos e um ambiente que te empurra para frente. Sua primeira aula é por nossa conta. Planos a partir de R$ 89/mês.</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button type="button" className="btn" onClick={() => start()}>Começar agora <span aria-hidden>→</span></button>
                <button type="button" className="btn o" onClick={() => go("aulas")}>Ver aulas</button>
              </div>
            </div>
            <div className="herophoto"><div className="slash" /><div className="glow" /><img src="/gym-hero.webp" alt="Atleta treinando com halteres" /></div>
          </div>
          <div className="wrap feats">
            {FEAT.map((f) => (<div className="feat" key={f.t}><i><Ic d={f.ic} s={24} /></i><div><b>{f.t}</b><span>{f.d}</span></div></div>))}
          </div>
        </section>
      </div>

      <section className="sec" id="aulas"><div className="wrap">
        <div className="eyebrow">Nossas aulas</div>
        <h2>Ache o treino <em>perfeito</em> pra você</h2>
        <div className="cls">
          {CL.map((c) => (
            <button type="button" className="cl" key={c.n} onClick={() => start(c.n)}>
              <img src={c.img} alt={c.n} loading="lazy" />
              <div><b>{c.n}</b><span>{c.d}</span><u>Experimentar →</u></div>
            </button>
          ))}
        </div>
      </div></section>

      <section className="sec" id="sobre" style={{ paddingTop: 20 }}><div className="wrap">
        <div className="aboutgrid">
          <div className="aimg"><img src="/gym-wide.webp" alt="Salão de musculação" loading="lazy" /><div className="chip2"><b>1ª aula</b>grátis</div></div>
          <div>
            <div className="eyebrow">Sobre a {brand}</div>
            <h2>Construindo uma versão <em>mais forte</em> de você</h2>
            <p style={{ color: "#c5cbc5", lineHeight: 1.7, fontSize: 16.5, margin: "18px 0 0", maxWidth: 480 }}>Unimos estrutura completa, treinadores atentos e uma comunidade que treina junto. Aqui você evolui no seu ritmo.</p>
            <div className="ck">{["Avaliação física inicial", "Treino personalizado", "Aulas coletivas inclusas", "Vestiário e armários"].map((x) => (<div key={x}><Ic d="M6 16l7 7 13-14" s={20} />{x}</div>))}</div>
            <button type="button" className="btn" onClick={() => start()}>Agendar aula experimental</button>
          </div>
        </div>
        <div className="stats">{STATS.map(([a, b]) => (<div className="st" key={b}><b>{a}</b><span>{b}</span></div>))}</div>
      </div></section>

      <section className="sec" id="equipe" style={{ paddingTop: 20 }}><div className="wrap">
        <div className="eyebrow">Equipe</div>
        <h2>Conheça nossos <em>treinadores</em></h2>
        <div className="trs">{TR.map((p) => (<div className="tr" key={p.n}><img src={p.img} alt={p.n} loading="lazy" /><div><b>{p.n}</b><span>{p.r}</span></div></div>))}</div>
      </div></section>

      <section className="sec" id="depoimentos" style={{ paddingTop: 10 }}><div className="wrap">
        <div className="eyebrow">Depoimentos</div>
        <h2>O que dizem os <em>alunos</em></h2>
        <div className="tst">
          <div className="qc">
            <span style={{ color: L, fontSize: 46, lineHeight: 0.5, fontFamily: "Barlow Condensed,sans-serif" }}>“</span>
            <p>{t.q}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <img className="face" src={t.img} alt={t.n} /><div style={{ flex: 1 }}><b>{t.n}</b><div style={{ color: L, letterSpacing: 2, fontSize: 14 }}>★★★★★</div></div>
              <button type="button" className="arr" aria-label="Anterior" onClick={() => setTi((ti + TESTI.length - 1) % TESTI.length)}>←</button>
              <button type="button" className="arr" aria-label="Próximo" onClick={() => setTi((ti + 1) % TESTI.length)}>→</button>
            </div>
          </div>
          <div className="ctab">
            <h3>Pronto pra <em>transformar</em> seu corpo?</h3>
            <p>Agende sua aula experimental grátis. Planos a partir de <b style={{ color: L }}>R$ 89/mês</b>, sem fidelidade.</p>
            <div><button type="button" className="btn" onClick={() => start()}>Quero treinar <span aria-hidden>→</span></button></div>
          </div>
        </div>
      </div></section>

      <footer id="contato"><div className="wrap">
        <div className="fr">
          <div className="logo"><Ic d={DB} s={30} />{brand}</div>
          <nav><a onClick={() => go("top")}>Início</a><a onClick={() => go("aulas")}>Aulas</a><a onClick={() => go("sobre")}>Sobre</a><a onClick={() => go("equipe")}>Treinadores</a></nav>
          <div style={{ fontSize: 15, color: "#c5cbc5", lineHeight: 1.6 }}>Av. Central, 480, Setor Bueno, {city}<br />Seg a sex 5h às 23h · Sáb 8h às 14h<br /><a href={`https://wa.me/${num}`} target="_blank" rel="noreferrer" style={{ color: L, fontWeight: 600 }}>Falar no WhatsApp</a></div>
        </div>
      </div></footer>

      {sc && <a className="wa" href={`https://wa.me/${num}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg></a>}

      {open && (
        <div className="ov" onClick={(e) => e.target === e.currentTarget && setOpen(false)} role="dialog" aria-modal="true" aria-label="Aula experimental">
          <div className="md">
            <button type="button" className="x" aria-label="Fechar" onClick={() => setOpen(false)}>×</button>
            <span className="tag">Passo {step} de 3</span>
            <h3>{["Qual aula?", "Dia e horário", "Confirme sua aula"][step - 1]}</h3>
            <div className="bars">{[1, 2, 3].map((n) => <i key={n} className={n <= step ? "on" : ""} />)}</div>
            {step === 1 && CL.map((s) => (<button type="button" key={s.n} className={`opt${mod === s.n ? " on" : ""}`} onClick={() => setMod(s.n)}><span>{s.n}</span>{mod === s.n && <span style={{ color: L }}>✓</span>}</button>))}
            {step === 2 && (<div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 16 }}>
                {days.map((d, i) => (<button type="button" key={d.label} className={`chip${day === i ? " on" : ""}`} onClick={() => setDay(i)}><small style={{ display: "block", textTransform: "uppercase", fontSize: 11, letterSpacing: 1 }}>{d.dow}</small><b style={{ fontSize: 18 }}>{d.d}</b></button>))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                {TIMES.map((x) => (<button type="button" key={x} className={`chip${time === x ? " on" : ""}`} onClick={() => setTime(x)}>{x}</button>))}
              </div>
            </div>)}
            {step === 3 && (<div>
              <div style={{ background: "#181b18", border: "1.5px solid #2e332e", borderRadius: 12, padding: 18, fontSize: 15.5, lineHeight: 1.9 }}>
                <b>{mod}</b><br />{days[day]?.label} às {time}<br /><span style={{ color: MUT, fontSize: 14 }}>{brand}, {city}</span>
              </div>
              <input value={cust} onChange={(e) => setCust(e.target.value)} placeholder="Seu nome" aria-label="Seu nome" style={{ width: "100%", marginTop: 14, minHeight: 50, padding: "0 16px", border: "1.5px solid #2e332e", borderRadius: 12, fontSize: 15.5, background: "#181b18", color: "#fff" }} />
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
