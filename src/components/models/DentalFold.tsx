import { useEffect, useState } from "react";

/** Clinica odontologica nova, construida do zero a partir de um pin claro em verde menta e verde escuro. Agendamento em 3 passos que fecha no WhatsApp. */
const D = "#12423a", D2 = "#2d6e5f", MINT = "#dbe8e0", BG = "#f8faf8", INK = "#10231f";
const SVC = [
  { n: "Clínico geral", d: "Cuidado de rotina para uma saúde bucal duradoura.", ic: "M8 6c-3 0-5 3-5 7 0 5 2 8 3 13 .5 2 2 2 3 0l2-6c.5-1 1.500-1 2 0l2 6c1 2 2.500 2 3 0 1-5 3-8 3-13 0-4-2-7-5-7-2 0-3 1-4 1S10 6 8 6z" },
  { n: "Ortodontia", d: "Alinhe o sorriso com aparelho fixo ou alinhadores.", ic: "M3 12h26M3 12v-3h6v3M12 12v-3h8v3M23 12v-3h6v3M3 12v3h6v-3M12 12v3h8v-3M23 12v3h6v-3" },
  { n: "Implantes", d: "Recupere o sorriso com firmeza e naturalidade.", ic: "M9 4h14c1 0 1.500 1 1.500 2.500C24 11 22 13 21 14l-1 14h-8l-1-14c-1-1-3-3-2.500-7.500C8.500 5 8 4 9 4zM12 20h8M12 24h8" },
  { n: "Estética", d: "Clareamento e facetas para realçar o seu sorriso.", ic: "M8 8c-3 0-5 3-5 7 0 5 2 8 3 12 .5 1.500 2 1.500 2.500 0l1.500-5c.5-1 1.500-1 2 0l1.500 5c.5 1.500 2 1.500 2.500 0 1-4 3-7 3-12 0-4-2-7-5-7-2 0-3 1-4 1S10 8 8 8zM25 3v6M22 6h6" },
];
const TESTI = [
  { q: "Atendimento excepcional! A equipe é atenciosa, profissional e minha consulta foi super tranquila.", n: "Camila R.", img: "/dent-p1.webp" },
  { q: "Fiz o clareamento e o resultado ficou natural. Marcar pelo site foi rápido e sem fila.", n: "Rodrigo M.", img: "/dent-p2.webp" },
  { q: "Levei meu pai para fazer o implante. Clínica linda e o doutor explicou tudo com calma.", n: "Paulo S.", img: "/dent-p3.webp" },
];
const TIMES = ["08:00", "09:30", "11:00", "14:00", "15:30", "17:00"];
const DOW = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
function nextDays() {
  const out: { dow: string; d: number; label: string }[] = [];
  const t = new Date();
  for (let i = 1; out.length < 6; i++) {
    const x = new Date(t.getFullYear(), t.getMonth(), t.getDate() + i);
    if (x.getDay() === 0 || x.getDay() === 6) continue;
    const w = DOW[x.getDay()] ?? "";
    out.push({ dow: w, d: x.getDate(), label: `${w}, ${String(x.getDate()).padStart(2, "0")}/${String(x.getMonth() + 1).padStart(2, "0")}` });
  }
  return out;
}

const Tooth = ({ s = 36, c = D }: { s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={SVC[0]!.ic} /></svg>
);
const Ic = ({ d, s = 30 }: { d: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke={D} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);

export function DentalFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Sorriso Verde";
  const city = client?.city?.trim() || "Florianópolis";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [svc, setSvc] = useState(SVC[0]!.n);
  const [day, setDay] = useState(0);
  const [time, setTime] = useState("");
  const [cust, setCust] = useState("");
  const [ti, setTi] = useState(0);
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  const [days] = useState(nextDays);
  useEffect(() => { const f = () => setSc(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const start = (s?: string) => { if (s) setSvc(s); setStep(1); setTime(""); setOpen(true); setMenu(false); };
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero agendar uma consulta na ${brand}${cust ? `, sou ${cust}` : ""}: ${svc}, ${days[day]?.label ?? ""} às ${time}.`)}`;
  const t = TESTI[ti]!;

  return (
    <div className="df" style={{ fontFamily: "Plus Jakarta Sans, system-ui, sans-serif", color: INK, background: BG, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;1,9..144,500;1,9..144,600&family=Caveat:wght@500;600&display=swap');
        .df *{box-sizing:border-box}
        .df a,.df button{font-family:inherit}
        .df .wrap{max-width:1160px;margin:0 auto;padding:0 24px}
        .df .nav{display:flex;align-items:center;justify-content:space-between;height:84px;gap:20px}
        .df .logo{display:flex;align-items:center;gap:10px;font-family:Fraunces,serif;font-weight:700;font-size:26px;color:${D}}
        .df .links{display:flex;gap:6px;font-size:15px;font-weight:500}
        .df .links a{padding:9px 18px;border-radius:999px;color:${INK};cursor:pointer;text-decoration:none}
        .df .links a.on{background:${D};color:#fff}
        .df .btn{background:${D};color:#fff;border:0;border-radius:999px;padding:0 26px;min-height:48px;font-weight:600;font-size:15px;cursor:pointer;display:inline-flex;align-items:center;gap:10px;text-decoration:none}
        .df .btn:hover{background:#0b2f29}
        .df .btn.w{background:#fff;color:${INK};box-shadow:0 4px 18px rgba(18,66,58,.12)}
        .df .btn.w:hover{background:#f1f6f3}
        .df .burger{display:none;background:none;border:0;width:44px;height:44px;cursor:pointer}
        .df .hero{position:relative;overflow:hidden}
        .df .hero:after{content:"";position:absolute;left:0;right:0;bottom:0;height:140px;background:linear-gradient(180deg,rgba(248,250,248,0),${BG});z-index:1;pointer-events:none}
        .df .blob{position:absolute;border-radius:50%;background:#bfd3c6;filter:blur(2px)}
        .df .herogrid{display:grid;grid-template-columns:1.05fr 1fr;align-items:center;gap:20px;min-height:560px;position:relative;z-index:2}
        .df .tag{display:inline-block;background:#e8eee9;border-radius:999px;padding:7px 16px;font-size:13.5px;font-weight:500;color:#33504a}
        .df h1{font-family:Fraunces,serif;font-weight:700;font-size:clamp(46px,6.2vw,80px);line-height:1.02;margin:22px 0 0;color:${D};letter-spacing:-1.5px}
        .df h1 em{font-style:italic;font-weight:600;color:${D2}}
        .df .lead{font-size:18px;line-height:1.65;color:#2e4540;margin:24px 0 32px;max-width:460px}
        .df .happy{display:flex;align-items:center;gap:14px;margin-top:34px;font-size:14px;line-height:1.3;color:#3d554f}
        .df .happy b{display:block;color:${INK};font-size:15px}
        .df .avs{display:flex}.df .avs img{width:40px;height:40px;border-radius:50%;object-fit:cover;border:2px solid ${BG};margin-left:-10px}.df .avs img:first-child{margin-left:0}
        .df .toothwrap{position:relative;display:flex;justify-content:center;align-items:center;min-height:460px}
        .df .toothwrap img.t{width:min(440px,92%);height:auto;position:relative;z-index:2;filter:drop-shadow(0 30px 30px rgba(18,66,58,.25))}
        .df .dring{position:absolute;width:560px;height:560px;max-width:120%;border-radius:50%;background:radial-gradient(circle at 40% 40%,#9dc0ae 0%,#bcd5c7 55%,rgba(188,213,199,0) 72%);z-index:1}
        .df .script{position:absolute;top:30px;left:6%;font-family:Caveat,cursive;font-size:30px;line-height:1.05;color:${D};transform:rotate(-7deg);z-index:3}
        .df .leaf{position:absolute;z-index:3}
        .df .eyebrow{display:flex;align-items:center;justify-content:center;gap:14px;font-size:12.5px;letter-spacing:3px;text-transform:uppercase;font-weight:600;color:#40605a}
        .df .eyebrow:before,.df .eyebrow:after{content:"";width:34px;height:1px;background:#9bb3a9}
        .df h2{font-family:Fraunces,serif;font-weight:700;font-size:clamp(32px,4vw,46px);color:${D};margin:14px 0 0;line-height:1.1}
        .df h2 em{font-style:italic;font-weight:600;color:${D2}}
        .df .sec{padding:70px 0}
        .df .cards{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:40px}
        .df .card{background:#eef3ef;border:1px solid #e1eae4;border-radius:22px;padding:26px 24px;text-align:left;cursor:pointer;display:flex;flex-direction:column;gap:10px;min-height:196px;transition:transform .2s,box-shadow .2s}
        .df .card:hover{transform:translateY(-4px);box-shadow:0 16px 34px rgba(18,66,58,.12)}
        .df .card b{font-size:17px;font-weight:600;margin-top:8px}
        .df .card p{margin:0;font-size:14.5px;line-height:1.55;color:#40564f;flex:1}
        .df .go{width:38px;height:38px;border-radius:50%;background:#fff;display:grid;place-items:center;align-self:flex-end;font-size:16px;box-shadow:0 2px 8px rgba(0,0,0,.08)}
        .df .aboutgrid{display:grid;grid-template-columns:1.05fr 1fr;gap:56px;align-items:center}
        .df .photo{position:relative}
        .df .photo img.p{width:100%;aspect-ratio:4/3.3;object-fit:cover;border-radius:34px;display:block;box-shadow:0 20px 44px rgba(18,66,58,.18)}
        .df .safe{position:absolute;left:-14px;bottom:-22px;background:#fff;border-radius:18px;padding:14px 20px;display:flex;gap:12px;align-items:center;box-shadow:0 12px 30px rgba(18,66,58,.18);font-size:14px;line-height:1.3}
        .df .safe b{display:block;font-size:15px}
        .df .abt h2{margin-top:6px}
        .df .abt p{font-size:16.5px;line-height:1.7;color:#35504a;margin:20px 0 28px;max-width:440px}
        .df .perks{display:flex;flex-direction:column;gap:18px;border-left:1px solid #d3dfd8;padding-left:34px}
        .df .perk{display:flex;gap:14px;align-items:center;font-size:14px;line-height:1.35;color:#486058}
        .df .perk b{display:block;color:${INK};font-size:15px}
        .df .perk i{width:46px;height:46px;border-radius:50%;background:${MINT};display:grid;place-items:center;flex:none}
        .df .testi{display:grid;grid-template-columns:auto 1fr auto;gap:30px;align-items:center;margin-top:44px}
        .df .qcard{background:#fff;border-radius:22px;padding:30px 34px;box-shadow:0 14px 34px rgba(18,66,58,.1);position:relative}
        .df .qcard p{font-size:20px;line-height:1.55;margin:6px 0 16px;font-family:Fraunces,serif;font-weight:500;color:${INK}}
        .df .face{width:150px;height:150px;border-radius:44% 56% 52% 48%/48% 44% 56% 52%;object-fit:cover;box-shadow:0 12px 26px rgba(18,66,58,.2)}
        .df .arr{width:46px;height:46px;border-radius:50%;border:0;background:#fff;box-shadow:0 4px 14px rgba(0,0,0,.12);cursor:pointer;font-size:18px}
        .df .cta{background:${D};border-radius:30px;color:#fff;display:flex;align-items:center;gap:30px;padding:34px 44px;margin:30px 0 70px}
        .df .cta h3{font-family:Fraunces,serif;font-weight:600;font-size:clamp(24px,2.6vw,32px);margin:0 0 6px}
        .df .cta p{margin:0;opacity:.85;font-size:15.5px}
        .df footer{padding:10px 0 34px;border-top:1px solid #e1eae4}
        .df .fr{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;padding-top:30px}
        .df .fr nav{display:flex;gap:28px;font-size:14.5px}.df .fr nav a{color:${INK};cursor:pointer}
        .df .wa{position:fixed;right:18px;bottom:18px;z-index:40;width:58px;height:58px;border-radius:50%;background:#25d366;display:grid;place-items:center;box-shadow:0 8px 24px rgba(0,0,0,.28)}
        .df .ov{position:fixed;inset:0;z-index:100;background:rgba(10,30,26,.55);display:flex;align-items:center;justify-content:center;padding:16px}
        .df .md{background:${BG};width:100%;max-width:520px;max-height:92vh;overflow:auto;padding:32px;border-radius:26px;position:relative}
        .df .md h3{font-family:Fraunces,serif;font-size:30px;margin:4px 0 4px;color:${D}}
        .df .bars{display:flex;gap:6px;margin:14px 0 20px}.df .bars i{flex:1;height:4px;border-radius:4px;background:#d3dfd8}.df .bars i.on{background:${D2}}
        .df .opt{display:flex;justify-content:space-between;width:100%;padding:15px 18px;margin-bottom:10px;border:1.5px solid #d3dfd8;border-radius:14px;background:#fff;cursor:pointer;font-size:15.5px;min-height:52px;text-align:left}
        .df .opt.on{border-color:${D};background:#eef5f1}
        .df .chip{padding:12px 6px;border:1.5px solid #d3dfd8;border-radius:12px;background:#fff;cursor:pointer;font-size:15px;text-align:center;min-height:46px}
        .df .chip.on{background:${D};color:#fff;border-color:${D}}
        .df .x{position:absolute;right:14px;top:12px;width:44px;height:44px;border:0;background:none;font-size:26px;cursor:pointer}
        .df .mob{display:none}
        @media(max-width:900px){
          .df .links,.df .navbtn{display:none}.df .burger{display:block}.df .nav{height:70px}.df .logo{font-size:23px}
          .df .herogrid{grid-template-columns:1fr;min-height:0;gap:0}.df .toothwrap{min-height:380px;margin-top:70px}.df .dring{width:380px;height:380px}.df .script{font-size:24px;top:8px}
          .df .cards{grid-template-columns:1fr 1fr;gap:12px}.df .card{padding:20px 16px;min-height:0}
          .df .aboutgrid{grid-template-columns:1fr;gap:44px}.df .abwrap{grid-template-columns:1fr !important}.df .perks{border-left:0;padding-left:0;border-top:1px solid #d3dfd8;padding-top:24px}
          .df .testi{grid-template-columns:1fr;gap:18px;justify-items:center}.df .face{width:110px;height:110px}.df .qcard{padding:22px}.df .qcard p{font-size:18px}
          .df .arrs{display:flex;gap:12px}
          .df .cta{flex-direction:column;align-items:flex-start;padding:28px 24px;gap:18px}
          .df .fr{justify-content:center;text-align:center}.df .fr nav{gap:18px;flex-wrap:wrap;justify-content:center}
          .df .mob{display:block;background:#fff;border-radius:16px;margin:0 16px 10px;box-shadow:0 8px 24px rgba(18,66,58,.12)}.df .mob a{display:block;padding:15px 20px;font-size:15px;cursor:pointer;border-top:1px solid #eef3ef}.df .mob a:first-child{border:0}
          .df .md{padding:26px 20px}
        }
      `}</style>

      <div className="hero" style={{ position: "relative" }}>
        <div className="blob" style={{ right: -120, top: -120, width: 640, height: 620, background: "#c6d9cd" }} />
        <div className="blob" style={{ left: -140, bottom: -60, width: 360, height: 300, background: "#e4ede7" }} />
      <header style={{ position: "relative", zIndex: 3 }}>
        <div className="wrap nav">
          <div className="logo"><Tooth s={34} />{brand}</div>
          <nav className="links"><a className="on" onClick={() => go("top")}>Início</a><a onClick={() => go("servicos")}>Serviços</a><a onClick={() => go("clinica")}>A clínica</a><a onClick={() => go("depoimentos")}>Depoimentos</a><a onClick={() => go("contato")}>Contato</a></nav>
          <button type="button" className="btn navbtn" onClick={() => start()}>Agendar consulta <span aria-hidden>→</span></button>
          <button type="button" className="burger" aria-label="Menu" onClick={() => setMenu((m) => !m)}><svg width="26" height="26" viewBox="0 0 26 26" stroke={D} strokeWidth="2"><path d="M3 7h20M3 13h20M3 19h20" /></svg></button>
        </div>
        {menu && <div className="mob"><a onClick={() => go("servicos")}>Serviços</a><a onClick={() => go("clinica")}>A clínica</a><a onClick={() => go("depoimentos")}>Depoimentos</a><a onClick={() => go("contato")}>Contato</a><a onClick={() => start()} style={{ fontWeight: 700, color: D }}>Agendar consulta</a></div>}
      </header>

      <section id="top">
        <div className="wrap herogrid">
          <div>
            <span className="tag">Odontologia moderna · {city}</span>
            <h1>Sorriso saudável,<br /><em>vida mais feliz</em></h1>
            <p className="lead">Cuidado odontológico de verdade, com atenção a cada paciente, para um sorriso mais bonito e saudável.</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button type="button" className="btn" onClick={() => start()}>Agendar consulta <span aria-hidden>→</span></button>
              <button type="button" className="btn w" onClick={() => go("clinica")}><span style={{ width: 26, height: 26, borderRadius: "50%", background: D, color: "#fff", display: "grid", placeItems: "center", fontSize: 10 }}>▶</span>Conhecer a clínica</button>
            </div>
            <div className="happy">
              <div className="avs"><img src="/dent-p1.webp" alt="" /><img src="/dent-p2.webp" alt="" /><img src="/dent-p3.webp" alt="" /></div>
              <div><b>10 mil+ pacientes felizes</b>Confiança no nosso cuidado</div>
            </div>
          </div>
          <div className="toothwrap">
            <div className="dring" />
            <span className="script">Sorria com<br />confiança</span>
            <img className="leaf" src="/dent-leaf.webp" alt="" style={{ width: 150, left: "4%", bottom: 10, transform: "rotate(-12deg)" }} />
            <img className="t" src="/dent-tooth.webp" alt="Dente" />
            <img className="leaf" src="/dent-leaf.webp" alt="" style={{ width: 130, right: -30, top: 40, transform: "rotate(160deg)" }} />
          </div>
        </div>
      </section>
      </div>

      <section className="sec" id="servicos"><div className="wrap">
        <div className="eyebrow">Nossos serviços</div>
        <h2 style={{ textAlign: "center" }}>Cuidado odontológico completo</h2>
        <div className="cards">
          {SVC.map((s) => (
            <button type="button" className="card" key={s.n} onClick={() => start(s.n)}>
              <Ic d={s.ic} s={34} /><b>{s.n}</b><p>{s.d}</p><span className="go" aria-hidden>→</span>
            </button>
          ))}
        </div>
      </div></section>

      <section className="sec" id="clinica" style={{ paddingTop: 30 }}><div className="wrap aboutgrid" style={{ gridTemplateColumns: undefined }}>
        <div className="photo">
          <img className="p" src="/dent-clinic.webp" alt="Dentista atendendo paciente" loading="lazy" />
          <div className="safe"><Ic d="M16 3l11 4v8c0 7-5 12-11 14C10 27 5 22 5 15V7zM11 16l4 4 7-8" s={34} /><div><b>Seguro e confiável</b>Desde 2010</div></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 30, alignItems: "center" }} className="abwrap">
          <div className="abt">
            <span className="tag">Sobre a {brand}</span>
            <h2>Sua clínica de <em>confiança</em></h2>
            <p>Unimos tecnologia atual e atendimento próximo para que a sua consulta seja a mais tranquila possível.</p>
            <button type="button" className="btn" onClick={() => start()}>Agendar consulta <span aria-hidden>→</span></button>
          </div>
          <div className="perks">
            {[["M16 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM5 28c0-6 5-9 11-9s11 3 11 9", "Equipe experiente", "Mais de 15 anos"], ["M4 6h24v16H4zM12 26h8M16 22v4", "Tecnologia moderna", "Equipamentos de ponta"], ["M16 28s-10-6-10-14a6 6 0 0 1 10-4 6 6 0 0 1 10 4c0 8-10 14-10 14z", "Ambiente acolhedor", "Relaxe, você está bem"]].map(([d, t, s]) => (
              <div className="perk" key={t}><i><Ic d={d as string} s={24} /></i><div><b>{t}</b>{s}</div></div>
            ))}
          </div>
        </div>
      </div></section>

      <section className="sec" id="depoimentos" style={{ paddingTop: 40 }}><div className="wrap">
        <div className="eyebrow">Depoimentos</div>
        <h2 style={{ textAlign: "center" }}>O que dizem os <em>pacientes</em></h2>
        <div className="testi">
          <img className="face" src={t.img} alt={t.n} />
          <div className="qcard"><span style={{ color: D2, fontSize: 40, lineHeight: 0.6, fontFamily: "Fraunces,serif" }}>“</span><p>{t.q}</p><div style={{ color: "#e2a31b", letterSpacing: 2 }}>★★★★★</div><b style={{ fontSize: 14 }}>{t.n}</b></div>
          <div className="arrs" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button type="button" className="arr" aria-label="Anterior" onClick={() => setTi((ti + TESTI.length - 1) % TESTI.length)}>←</button>
            <button type="button" className="arr" aria-label="Próximo" onClick={() => setTi((ti + 1) % TESTI.length)}>→</button>
          </div>
        </div>
      </div></section>

      <div className="wrap"><div className="cta">
        <Tooth s={64} c="#fff" />
        <div style={{ width: 1, alignSelf: "stretch", background: "rgba(255,255,255,.3)" }} />
        <div style={{ flex: 1 }}><h3>Pronto para o seu sorriso perfeito?</h3><p>Agende hoje e dê o primeiro passo para uma saúde bucal melhor.</p></div>
        <button type="button" className="btn w" onClick={() => start()}>Agendar consulta <span aria-hidden>→</span></button>
      </div></div>

      <footer id="contato"><div className="wrap">
        <div className="fr">
          <div className="logo"><Tooth s={30} />{brand}</div>
          <nav><a onClick={() => go("top")}>Início</a><a onClick={() => go("servicos")}>Serviços</a><a onClick={() => go("clinica")}>A clínica</a><a onClick={() => go("depoimentos")}>Depoimentos</a><a href={`https://wa.me/${num}`} target="_blank" rel="noreferrer">WhatsApp</a></nav>
          <div style={{ fontSize: 13.5, color: "#5a6f68", textAlign: "right" }}>Rua das Hortênsias, 210, Centro, {city}<br />Seg a sex, 8h às 18h<br />© 2026 {brand}</div>
        </div>
      </div></footer>

      {sc && <a className="wa" href={`https://wa.me/${num}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 32 32" fill="#fff"><path d="M16 3a13 13 0 0 0-11 19.800L3 29l6.400-1.900A13 13 0 1 0 16 3zm0 2.400a10.600 10.600 0 1 1-5.600 19.600l-.4-.2-3.800 1.100 1.200-3.700-.3-.4A10.600 10.600 0 0 1 16 5.400zm-4 5.200c-.3 0-.7.100-1 .5-.4.4-1.300 1.300-1.300 3.100s1.400 3.600 1.500 3.800c.2.200 2.700 4.200 6.600 5.700 3.300 1.300 4 1 4.700.9.700-.1 2.300-.9 2.600-1.800.3-.9.300-1.600.2-1.800-.1-.2-.4-.3-.8-.5l-2.400-1.200c-.3-.1-.6-.2-.8.200-.2.300-.9 1.100-1.100 1.300-.2.200-.4.300-.7.100-.4-.2-1.500-.6-2.800-1.700-1-.9-1.700-2-1.900-2.400-.2-.4 0-.6.200-.8l.5-.6c.2-.2.200-.4.400-.6.100-.3.100-.5 0-.7l-1.100-2.700c-.3-.7-.6-.6-.8-.6z" /></svg></a>}

      {open && (
        <div className="ov" onClick={(e) => e.target === e.currentTarget && setOpen(false)} role="dialog" aria-modal="true" aria-label="Agendar consulta">
          <div className="md">
            <button type="button" className="x" aria-label="Fechar" onClick={() => setOpen(false)}>×</button>
            <span className="tag">Passo {step} de 3</span>
            <h3>{["Qual atendimento?", "Dia e horário", "Confirme sua consulta"][step - 1]}</h3>
            <div className="bars">{[1, 2, 3].map((n) => <i key={n} className={n <= step ? "on" : ""} />)}</div>
            {step === 1 && SVC.map((s) => (<button type="button" key={s.n} className={`opt${svc === s.n ? " on" : ""}`} onClick={() => setSvc(s.n)}><span>{s.n}</span>{svc === s.n && <span>✓</span>}</button>))}
            {step === 2 && (<div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 16 }}>
                {days.map((d, i) => (<button type="button" key={d.label} className={`chip${day === i ? " on" : ""}`} onClick={() => setDay(i)}><small style={{ display: "block", textTransform: "uppercase", fontSize: 11, letterSpacing: 1 }}>{d.dow}</small><b style={{ fontSize: 18 }}>{d.d}</b></button>))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                {TIMES.map((x) => (<button type="button" key={x} className={`chip${time === x ? " on" : ""}`} onClick={() => setTime(x)}>{x}</button>))}
              </div>
            </div>)}
            {step === 3 && (<div>
              <div style={{ background: "#fff", border: "1.5px solid #d3dfd8", borderRadius: 14, padding: 18, fontSize: 15.5, lineHeight: 1.9 }}>
                <b>{svc}</b><br />{days[day]?.label} às {time}<br /><span style={{ color: "#5a6f68", fontSize: 14 }}>{brand}, {city}</span>
              </div>
              <input value={cust} onChange={(e) => setCust(e.target.value)} placeholder="Seu nome" aria-label="Seu nome" style={{ width: "100%", marginTop: 14, minHeight: 50, padding: "0 16px", border: "1.5px solid #d3dfd8", borderRadius: 14, fontSize: 15.5, background: "#fff" }} />
            </div>)}
            <div style={{ display: "flex", gap: 10, marginTop: 22, justifyContent: "space-between" }}>
              {step > 1 ? <button type="button" className="btn w" onClick={() => setStep(step - 1)}>Voltar</button> : <span />}
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
