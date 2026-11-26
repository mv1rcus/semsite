import { useEffect, useState } from "react";

/** Estudio de tatuagem, construido do zero a partir de um pin escuro com acento turquesa. Agendamento em 3 passos que fecha no WhatsApp. */
const BG = "#0c0c0e", PN = "#131316", TX = "#f2ede6", MU = "#bdb6ae", TL = "#1dbb9a";
const STYLES = [
  { n: "Fine line", d: "Traços finos e delicados", p: "a partir de R$ 250", img: "/tat-s1.webp" },
  { n: "Blackwork", d: "Preto sólido e geométrico", p: "a partir de R$ 400", img: "/tat-s2.webp" },
  { n: "Aquarela", d: "Cor com mancha de tinta", p: "a partir de R$ 450", img: "/tat-s3.webp" },
  { n: "Realismo", d: "Retrato e sombra pura", p: "a partir de R$ 600", img: "/tat-s4.webp" },
];
const SERVICES = [
  { t: "Tatuagem autoral", d: "Desenho criado só pra você, do rascunho à pele." },
  { t: "Cobertura (cover-up)", d: "A gente apaga o passado com arte nova." },
  { t: "Restauro de tattoo", d: "Reavivamos cor e traço de tatuagens antigas." },
  { t: "Piercing e joias", d: "Aplicação segura, material descartável." },
];
const STEPS = [
  { t: "Conversa inicial", d: "Você conta a ideia, a gente sugere estilo e traço." },
  { t: "Desenho fechado", d: "Aprovamos juntos o rascunho antes de qualquer agulha." },
  { t: "Agendamento", d: "Dia e hora marcados, sem fila e sem aperto." },
  { t: "Sessão e cuidado", d: "Estúdio estéril e orientação completa de cicatrização." },
];
const ARTISTS = [
  { n: "Duda Reis", r: "Fine line e aquarela", img: "/tat-a1.webp" },
  { n: "Rafa Tinta", r: "Blackwork e geométrico", img: "/tat-a2.webp" },
  { n: "Igor Lins", r: "Realismo e retrato", img: "/tat-a3.webp" },
];
const TESTI = { q: "Fechei o braço com o Rafa e foi a melhor experiência possível: estúdio impecável, desenho melhor que o sonho e zero pressa. Já marquei a próxima.", n: "Camila S." };
const TIMES = ["10:00", "13:00", "15:00", "17:00", "19:00"];
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
const Ic = ({ d, s = 26, c = TL }: { d: string; s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);
const NEEDLE = "M4 20L15 9m0 0l2-2 3 3-2 2m-3-3l3 3M18 4l2 2";

export function TattooFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Tinta Rara";
  const city = client?.city?.trim() || "Salvador";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [sty, setSty] = useState(STYLES[0]!.n);
  const [size, setSize] = useState("Média (10-15cm)");
  const [day, setDay] = useState(0);
  const [time, setTime] = useState("");
  const [cust, setCust] = useState("");
  const [sc, setSc] = useState(false);
  const [menu, setMenu] = useState(false);
  const [days] = useState(nextDays);
  useEffect(() => { const f = () => setSc(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const start = () => { setStep(1); setTime(""); setOpen(true); setMenu(false); };
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero agendar uma tattoo no ${brand}${cust ? ` em nome de ${cust}` : ""}: estilo ${sty}, tamanho ${size}, ${days[day]?.label ?? ""} às ${time}.`)}`;

  return (
    <div className="tf" style={{ fontFamily: "Jost, system-ui, sans-serif", color: TX, background: BG, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=Jost:wght@400;500;600&family=Caveat:wght@600&display=swap');
        .tf *{box-sizing:border-box}
        .tf a,.tf button{font-family:inherit}
        .tf .wrap{max-width:1180px;margin:0 auto;padding:0 24px}
        .tf .nav{display:flex;align-items:center;justify-content:space-between;height:84px;gap:20px;position:relative;z-index:5}
        .tf .logo{display:flex;align-items:center;gap:10px;font-family:Fraunces,serif;font-weight:600;font-size:24px;letter-spacing:.5px;color:${TX}}
        .tf .links{display:flex;gap:32px;font-size:15px;font-weight:500}
        .tf .links a{color:${MU};cursor:pointer;transition:color .2s}.tf .links a:hover{color:${TX}}
        .tf .btn{background:${TL};color:#06251f;border:0;border-radius:999px;padding:0 26px;min-height:50px;font-weight:600;font-size:15px;cursor:pointer;display:inline-flex;align-items:center;gap:10px;text-decoration:none;box-shadow:0 10px 26px rgba(29,187,154,.28)}
        .tf .btn:hover{background:#2ad6b2}
        .tf .btn.o{background:transparent;color:${TX};border:1.5px solid #3a3a40;box-shadow:none}
        .tf .btn.o:hover{border-color:${TL};color:${TL}}
        .tf .burger{display:none;background:none;border:0;width:44px;height:44px;cursor:pointer}
        .tf .hero{position:relative;overflow:hidden;background:radial-gradient(900px 500px at 85% -10%,rgba(29,187,154,.08),transparent 60%),${BG}}
        .tf .herogrid{display:grid;grid-template-columns:1fr 1.1fr;align-items:center;gap:20px;min-height:600px}
        .tf .himg{position:relative;align-self:stretch;display:flex;align-items:flex-end;justify-content:center}
        .tf .himg .arch{position:absolute;inset:8% 12% 0;background:${PN};border:1px solid #26262b;border-bottom:0;border-radius:280px 280px 0 0}
        .tf .himg img{position:relative;z-index:2;width:min(78%,420px);filter:drop-shadow(0 20px 40px rgba(0,0,0,.6))}
        .tf .kick{display:inline-flex;align-items:center;gap:10px;font-size:12.5px;letter-spacing:3.5px;text-transform:uppercase;font-weight:600;color:${TL}}
        .tf .kick:before{content:"";width:34px;height:1.5px;background:${TL};display:block}
        .tf h1{font-family:Fraunces,serif;font-weight:600;font-size:clamp(44px,5.6vw,74px);line-height:1.04;margin:18px 0 0;color:${TX};letter-spacing:-1px}
        .tf h1 em{font-style:italic;font-weight:500;color:${TL}}
        .tf .lead{font-size:17.5px;line-height:1.7;color:${MU};margin:22px 0 30px;max-width:460px}
        .tf .stats{display:flex;gap:38px;margin-top:38px}
        .tf .stats b{font-family:Fraunces,serif;font-size:30px;font-weight:600;color:${TX};display:block}
        .tf .stats span{font-size:13.5px;color:${MU}}
        .tf .sec{padding:70px 0}
        .tf .sh{display:flex;align-items:center;gap:16px;margin-bottom:34px}
        .tf h2{font-family:Fraunces,serif;font-weight:600;font-size:clamp(30px,3.4vw,42px);margin:0;color:${TX};line-height:1.12}
        .tf h2 em{font-style:italic;color:${TL}}
        .tf .sh i{flex:1;height:1px;background:#2a2a30;display:block}
        .tf .svc{display:grid;grid-template-columns:1.05fr 1fr;gap:56px;align-items:center}
        .tf .sitem{display:flex;gap:16px;padding:20px 0;border-bottom:1px solid #232328}
        .tf .sitem:last-child{border:0}
        .tf .sitem .ck{flex:none;width:44px;height:44px;border-radius:50%;background:rgba(29,187,154,.12);display:grid;place-items:center}
        .tf .sitem b{font-size:17px;font-weight:600;display:block;margin-bottom:4px}
        .tf .sitem p{margin:0;font-size:14.5px;color:${MU};line-height:1.55}
        .tf .sim{position:relative}
        .tf .sim img{width:100%;aspect-ratio:4/4.6;object-fit:cover;border-radius:18px;display:block}
        .tf .sim .sig{position:absolute;left:22px;bottom:16px;font-family:Caveat,cursive;font-size:44px;color:#fff;text-shadow:0 4px 18px rgba(0,0,0,.7);transform:rotate(-4deg)}
        .tf .grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
        .tf .card{background:${PN};border:1px solid #222227;border-radius:16px;overflow:hidden;transition:transform .3s,border-color .3s}
        .tf .card:hover{transform:translateY(-6px);border-color:${TL}}
        .tf .card img{width:100%;aspect-ratio:1/1.08;object-fit:cover;display:block}
        .tf .card .lb{padding:14px 16px}
        .tf .card b{font-size:15.5px;font-weight:600;display:block}
        .tf .card small{color:${MU};font-size:13px;display:block;margin-top:2px}
        .tf .card .pr{color:${TL};font-size:14.5px;font-weight:600;margin-top:8px;display:block}
        .tf .steps{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
        .tf .stp{background:${PN};border:1px solid #222227;border-radius:16px;padding:26px 22px}
        .tf .stp b{font-family:Fraunces,serif;font-size:34px;color:${TL};font-weight:600;display:block;margin-bottom:12px}
        .tf .stp h3{font-family:Fraunces,serif;font-size:19px;margin:0 0 8px;font-weight:600;color:${TX}}
        .tf .stp p{margin:0;font-size:14px;color:${MU};line-height:1.55}
        .tf .team{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        .tf .tm{background:${PN};border:1px solid #222227;border-radius:16px;overflow:hidden;text-align:center}
        .tf .tm img{width:100%;aspect-ratio:4/4.4;object-fit:cover;object-position:50% 18%;display:block}
        .tf .tm .lb{padding:16px}.tf .tm b{font-size:16.5px;font-weight:600;display:block;color:${TX}}.tf .tm small{color:${MU};font-size:13.5px}
        .tf .quote{background:${PN};border:1px solid #222227;border-radius:20px;padding:36px;display:grid;grid-template-columns:auto 1fr;gap:26px;align-items:center;max-width:860px;margin:0 auto}
        .tf .quote img{width:96px;height:96px;border-radius:50%;object-fit:cover;border:3px solid ${TL}}
        .tf .quote p{margin:8px 0 12px;font-family:Fraunces,serif;font-style:italic;font-size:18.5px;line-height:1.6;color:${TX}}
        .tf .loop{margin:16px 0 64px;border-radius:24px;background:linear-gradient(110deg,#0f2c26,${PN} 65%);border:1px solid #1d4a41;padding:44px 40px;display:flex;align-items:center;justify-content:space-between;gap:28px;flex-wrap:wrap}
        .tf .loop h3{font-family:Fraunces,serif;font-weight:600;font-size:clamp(26px,3vw,36px);margin:0;line-height:1.15;color:${TX}}
        .tf .loop p{margin:10px 0 0;color:${MU};font-size:15.5px}
        .tf footer{border-top:1px solid #222227;padding:36px 0}
        .tf .fr{display:flex;align-items:flex-start;justify-content:space-between;gap:24px;flex-wrap:wrap}
        .tf .fr nav{display:flex;gap:24px;font-size:14.5px}.tf .fr nav a{cursor:pointer;color:${MU}}.tf .fr nav a:hover{color:${TX}}
        .tf .fr .ct{font-size:14.5px;color:${MU};line-height:1.8}
        .tf .fr .ct a{color:${TL};font-weight:600}
        .tf .wa{position:fixed;right:18px;bottom:18px;z-index:40;width:58px;height:58px;border-radius:50%;background:#25d366;display:grid;place-items:center;box-shadow:0 8px 24px rgba(0,0,0,.45)}
        .tf .ov{position:fixed;inset:0;z-index:100;background:rgba(5,5,7,.72);display:flex;align-items:center;justify-content:center;padding:16px}
        .tf .md{background:#141417;border:1px solid #26262c;width:100%;max-width:540px;max-height:92vh;overflow:auto;padding:32px;border-radius:22px;position:relative;color:${TX}}
        .tf .md h3{font-family:Fraunces,serif;font-size:28px;margin:8px 0 4px;color:${TX}}
        .tf .tag{display:inline-block;background:rgba(29,187,154,.14);color:${TL};border-radius:999px;padding:6px 14px;font-size:12.5px;font-weight:600;letter-spacing:1px;text-transform:uppercase}
        .tf .bars{display:flex;gap:6px;margin:16px 0 20px}.tf .bars i{flex:1;height:4px;border-radius:4px;background:#2a2a30}.tf .bars i.on{background:${TL}}
        .tf .chip{padding:12px 8px;border:1.5px solid #2c2c33;border-radius:12px;background:#18181c;color:${TX};cursor:pointer;font-size:14.5px;text-align:center;min-height:48px}
        .tf .chip.on{background:rgba(29,187,154,.16);border-color:${TL};color:${TL}}
        .tf .x{position:absolute;right:14px;top:12px;width:44px;height:44px;border:0;background:none;color:${MU};font-size:26px;cursor:pointer}
        .tf .sum{background:#18181c;border:1.5px solid #2c2c33;border-radius:14px;padding:18px;font-size:15px;line-height:1.9}
        .tf .inp{width:100%;margin-top:14px;min-height:50px;padding:0 16px;border:1.5px solid #2c2c33;border-radius:14px;font-size:15px;background:#0f0f12;color:${TX}}
        .tf .cta-m{display:none}
        .tf .mob{display:none}
        @media(max-width:900px){
          .tf .links,.tf .navbtn{display:none}.tf .burger{display:block}.tf .nav{height:68px}.tf .logo{font-size:21px}
          .tf .cta-m{display:inline-flex;min-height:44px;padding:0 18px;margin-left:auto;margin-right:4px;font-size:14px}
          .tf .herogrid{grid-template-columns:1fr;min-height:0;gap:0;padding-top:6px}
          .tf .himg{order:2;min-height:340px;margin-top:26px}.tf .himg .arch{inset:12% 8% 0}
          .tf .stats{gap:24px;flex-wrap:wrap}
          .tf .svc{grid-template-columns:1fr;gap:34px}
          .tf .grid4{grid-template-columns:1fr;gap:12px}
          .tf .card{display:grid;grid-template-columns:38% 1fr}
          .tf .card img{aspect-ratio:auto;height:100%}
          .tf .card .lb{padding:14px 16px;display:flex;flex-direction:column;justify-content:center}
          .tf .card b{font-size:16.5px}.tf .card small{font-size:13.5px}
          .tf .steps{grid-template-columns:1fr;gap:10px}
          .tf .stp{display:flex;gap:16px;align-items:flex-start;padding:18px 20px}
          .tf .stp b{margin-bottom:0;font-size:26px}
          .tf .stp p{font-size:14.5px}
          .tf .team{grid-template-columns:1fr;gap:12px}
          .tf .tm img{aspect-ratio:4/2.9}
          .tf .quote{grid-template-columns:1fr;text-align:center;justify-items:center;padding:28px 22px}
          .tf .loop{padding:30px 24px}
          .tf .fr{flex-direction:column;align-items:center;text-align:center}
          .tf .fr nav{flex-wrap:wrap;justify-content:center}
          .tf .md{padding:26px 20px}
          .tf .mob{display:block;background:#141417;border:1px solid #26262c;border-radius:16px;margin:0 16px 10px}.tf .mob a{display:block;padding:15px 20px;font-size:15px;cursor:pointer;border-top:1px solid #222228;color:${MU}}.tf .mob a:first-child{border:0}
        }
      `}</style>

      <div className="hero" id="top">
        <header>
          <div className="wrap nav">
            <div className="logo"><Ic d={NEEDLE} s={26} />{brand}</div>
            <nav className="links"><a onClick={() => go("servicos")}>Serviços</a><a onClick={() => go("estilos")}>Estilos</a><a onClick={() => go("processo")}>Processo</a><a onClick={() => go("equipe")}>Artistas</a><a onClick={() => go("contato")}>Contato</a></nav>
            <button type="button" className="btn navbtn" onClick={start}>Agendar sessão</button>
            <button type="button" className="btn cta-m" onClick={start}>Agendar</button>
            <button type="button" className="burger" aria-label="Menu" onClick={() => setMenu((m) => !m)}><svg width="26" height="26" viewBox="0 0 26 26" stroke={TX} strokeWidth="2"><path d="M3 7h20M3 13h20M3 19h20" /></svg></button>
          </div>
          {menu && <div className="mob"><a onClick={() => go("servicos")}>Serviços</a><a onClick={() => go("estilos")}>Estilos</a><a onClick={() => go("processo")}>Processo</a><a onClick={() => go("equipe")}>Artistas</a><a onClick={start} style={{ color: TL, fontWeight: 600 }}>Agendar sessão</a></div>}
        </header>
        <section>
          <div className="wrap herogrid">
            <div className="himg"><div className="arch" /><img src="/tat-hero.webp" alt={`Tatuador do estúdio ${brand}`} /></div>
            <div style={{ padding: "30px 0" }}>
              <span className="kick">Estúdio de tatuagem · {city}</span>
              <h1>Arte na pele,<br /><em>feita à mão</em></h1>
              <p className="lead">Tattoo autoral, traço seguro e estúdio impecável. Sua ideia vira desenho exclusivo, criado com você do início ao fim.</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button type="button" className="btn" onClick={start}>Agendar sessão <span aria-hidden>→</span></button>
                <button type="button" className="btn o" onClick={() => go("estilos")}>Ver estilos</button>
              </div>
              <div className="stats">
                <div><b>9 anos</b><span>de estúdio</span></div>
                <div><b>3.200+</b><span>tatuagens feitas</span></div>
                <div><b>5.0</b><span>nota no Google</span></div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="sec" id="servicos"><div className="wrap">
        <div className="svc">
          <div>
            <span className="kick">Nossos serviços</span>
            <h2 style={{ margin: "14px 0 10px" }}>Tudo pra sua <em>próxima tattoo</em></h2>
            <p style={{ color: MU, fontSize: 15.5, lineHeight: 1.65, margin: "0 0 8px", maxWidth: 440 }}>Do primeiro rascunho ao curativo, você é acompanhado por quem entende do traço.</p>
            <div>{SERVICES.map((s) => (
              <div className="sitem" key={s.t}>
                <span className="ck"><Ic d="M5 13l4 4L19 7" s={22} /></span>
                <div><b>{s.t}</b><p>{s.d}</p></div>
              </div>
            ))}</div>
          </div>
          <div className="sim"><img src="/tat-studio.webp" alt="Interior do estúdio" loading="lazy" /><span className="sig">{brand}</span></div>
        </div>
      </div></section>

      <section className="sec" id="estilos" style={{ paddingTop: 10 }}><div className="wrap">
        <div className="sh"><h2>Estilos que <em>dominamos</em></h2><i /><button type="button" className="btn o" onClick={start}>Agendar →</button></div>
        <div className="grid4">
          {STYLES.map((s) => (
            <div className="card" key={s.n}>
              <img src={s.img} alt={`Tatuagem estilo ${s.n}`} loading="lazy" />
              <div className="lb"><b>{s.n}</b><small>{s.d}</small><span className="pr">{s.p}</span></div>
            </div>
          ))}
        </div>
      </div></section>

      <section className="sec" id="processo" style={{ paddingTop: 10 }}><div className="wrap">
        <div className="sh"><h2>Como <em>funciona?</em></h2><i /></div>
        <div className="steps">
          {STEPS.map((s, i) => (
            <div className="stp" key={s.t}><b>{String(i + 1).padStart(2, "0")}</b><h3>{s.t}</h3><p>{s.d}</p></div>
          ))}
        </div>
      </div></section>

      <section className="sec" id="equipe" style={{ paddingTop: 10 }}><div className="wrap">
        <div className="sh"><h2>Conheça os <em>artistas</em></h2><i /></div>
        <div className="team">
          {ARTISTS.map((a) => (
            <div className="tm" key={a.n}><img src={a.img} alt={a.n} loading="lazy" /><div className="lb"><b>{a.n}</b><small>{a.r}</small></div></div>
          ))}
        </div>
        <div className="quote" style={{ marginTop: 40 }}>
          <img src="/tat-guest.webp" alt={TESTI.n} />
          <div>
            <div style={{ color: TL, letterSpacing: 3, fontSize: 14 }}>★★★★★</div>
            <p>“{TESTI.q}”</p>
            <b style={{ fontSize: 14.5 }}>{TESTI.n}</b>
          </div>
        </div>
      </div></section>

      <div className="wrap"><div className="loop">
        <div>
          <h3>Sua próxima tattoo <em style={{ color: TL, fontStyle: "italic" }}>começa aqui.</em></h3>
          <p>Agende uma conversa sem compromisso. A ideia é sua, o traço é nosso.</p>
        </div>
        <button type="button" className="btn" onClick={start}>Agendar sessão <span aria-hidden>→</span></button>
      </div></div>

      <footer id="contato"><div className="wrap">
        <div className="fr">
          <div className="logo"><Ic d={NEEDLE} s={24} />{brand}</div>
          <nav><a onClick={() => go("top")}>Início</a><a onClick={() => go("servicos")}>Serviços</a><a onClick={() => go("estilos")}>Estilos</a><a onClick={() => go("equipe")}>Artistas</a></nav>
          <div className="ct">Ladeira do Carmo, 45, Santo Antônio, {city}<br />Ter a sáb, 10h às 20h<br />Instagram @{brand.normalize("NFD").toLowerCase().replace(/[^a-z]+/g, "")}<br /><a href={`https://wa.me/${num}`} target="_blank" rel="noreferrer">Falar no WhatsApp</a></div>
        </div>
      </div></footer>

      {sc && <a className="wa" href={`https://wa.me/${num}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg></a>}

      {open && (
        <div className="ov" onClick={(e) => e.target === e.currentTarget && setOpen(false)} role="dialog" aria-modal="true" aria-label="Agendar sessão">
          <div className="md">
            <button type="button" className="x" aria-label="Fechar" onClick={() => setOpen(false)}>×</button>
            <span className="tag">Passo {step} de 3</span>
            <h3>{["Escolha o estilo", "Tamanho, dia e hora", "Confirme sua sessão"][step - 1]}</h3>
            <div className="bars">{[1, 2, 3].map((n) => <i key={n} className={n <= step ? "on" : ""} />)}</div>
            {step === 1 && (<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {STYLES.map((s) => (<button type="button" key={s.n} className={`chip${sty === s.n ? " on" : ""}`} onClick={() => setSty(s.n)}><b style={{ display: "block", fontSize: 15 }}>{s.n}</b><small style={{ color: MU }}>{s.p}</small></button>))}
            </div>)}
            {step === 2 && (<div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 14 }}>
                {["Pequena (até 10cm)", "Média (10-15cm)", "Grande (15cm+)"].map((s) => (<button type="button" key={s} className={`chip${size === s ? " on" : ""}`} onClick={() => setSize(s)}>{s}</button>))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 14 }}>
                {days.map((d, i) => (<button type="button" key={d.label} className={`chip${day === i ? " on" : ""}`} onClick={() => setDay(i)}><small style={{ display: "block", textTransform: "uppercase", fontSize: 11, letterSpacing: 1, color: MU }}>{d.dow}</small><b style={{ fontSize: 17 }}>{d.d}</b></button>))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
                {TIMES.map((x) => (<button type="button" key={x} className={`chip${time === x ? " on" : ""}`} onClick={() => setTime(x)}>{x}</button>))}
              </div>
            </div>)}
            {step === 3 && (<div>
              <div className="sum">
                <b>{sty} · {size}</b><br />{days[day]?.label} às {time}<br /><span style={{ color: MU, fontSize: 13.5 }}>{brand}, {city}</span>
              </div>
              <input className="inp" value={cust} onChange={(e) => setCust(e.target.value)} placeholder="Seu nome" aria-label="Seu nome" />
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
