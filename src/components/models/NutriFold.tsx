import { useEffect, useState } from "react";

/** Nutricionista, construida do zero a partir de um pin em verde escuro, creme e camelo. Agendamento de consulta em 3 passos que fecha no WhatsApp. */
const GR = "#1e4633", GR2 = "#163526", GR3 = "#2a5a43", BG = "#f2ead9", TN = "#d9b98f", TN2 = "#c9a26e", INK = "#21331f", CRM = "#f7f1e3";
const SERVICES = [
  { t: "Avaliação completa", d: "Da sua rotina alimentar e objetivos" },
  { t: "Estratégias específicas", d: "Para recomposição corporal e desempenho físico" },
  { t: "Plano alimentar adaptado", d: "À sua realidade e necessidades" },
  { t: "Acompanhamento contínuo", d: "Para ajustes e otimização dos resultados" },
  { t: "Estado nutricional", d: "Identificação e ajustes personalizados na dieta" },
  { t: "Comparação do progresso", d: "Ao longo de todo o acompanhamento" },
];
const BENEFITS = [
  { t: "Melhoria no desempenho físico", d: "Tenha mais força, energia e resistência para treinos e o dia a dia." },
  { t: "Recomposição corporal eficaz", d: "Perca gordura e ganhe massa magra de forma saudável." },
  { t: "Nutrição alinhada às necessidades femininas", d: "Estratégias para SOP, endometriose, menopausa e metabolismo." },
  { t: "Mais bem-estar e disposição", d: "Alimentação equilibrada para saúde e vitalidade." },
];
const TESTI = [
  { n: "Camila Rocha", t: "Perdi 7kg em quatro meses sem cortar tudo que eu gosto. O plano cabia na minha rotina de verdade, com feijoada no domingo e tudo. Nunca tinha conseguido manter resultado assim.", a: "/nutri-a1.webp" },
  { n: "Ricardo Almeida", t: "Voltei a correr depois dos 40 e a Lívia ajustou minha alimentação para os treinos. A energia mudou completamente e os exames nunca estiveram tão bons.", a: "/nutri-a2.webp" },
  { n: "Beatriz Lima", t: "Como atleta amadora, eu batia no mesmo peso há anos. Com o acompanhamento, ganhei massa magra e melhorei meus tempos. As comparações de progresso me motivam demais.", a: "/nutri-a3.webp" },
  { n: "Helena Duarte", t: "Cheguei na menopausa sem saber mais o que comer. Ela montou um plano pensado para o meu momento, sem terrorismo. Me sinto disposta e em paz com a comida.", a: "/nutri-a4.webp" },
  { n: "Felipe Santos", t: "Trabalho o dia inteiro sentado e vivia beliscando. A avaliação da minha rotina foi tão certeira que os ajustes pareceram fáceis. Três meses depois, menos 5kg e zero sofrimento.", a: "/nutri-a5.webp" },
];
const TIMES = ["08:00", "09:30", "11:00", "14:00", "15:30", "17:00"];
const DOW = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
function nextDays() {
  const out: { dow: string; d: number; label: string }[] = [];
  const t = new Date();
  for (let i = 1; out.length < 6; i++) {
    const x = new Date(t.getFullYear(), t.getMonth(), t.getDate() + i);
    out.push({ dow: DOW[x.getDay()] ?? "", d: x.getDate(), label: `${DOW[x.getDay()]}, ${String(x.getDate()).padStart(2, "0")}/${String(x.getMonth() + 1).padStart(2, "0")}` });
  }
  return out;
}
const APPLE = "M16 7c1-3 3-4 5-4 0 2-1 4-3 5 3 0 6 3 6 8 0 6-4 13-8 13-2 0-3-1-5-1s-3 1-5 1c-4 0-8-7-8-13 0-5 3-8 6-8 2 0 3 1 4 1s2-1 4-1zM10 21c2 1 4 1 6 0";
const TARGET = "M16 4a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm0 5a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm0 4.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z";
const CHECK = "M7 16l6 6L26 9";
const Ic = ({ d, s = 30, c = "currentColor", f = "none" }: { d: string; s?: number; c?: string; f?: string }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" fill={f} stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);

export function NutriFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Lívia Prado";
  const city = client?.city?.trim() || "Campinas";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [who, setWho] = useState("Emagrecimento saudável");
  const [day, setDay] = useState(0);
  const [time, setTime] = useState("");
  const [cust, setCust] = useState("");
  const [cust2, setCust2] = useState("");
  const [ti, setTi] = useState(0);
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  const [days] = useState(nextDays);
  useEffect(() => { const f = () => setSc(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const start = (w?: string) => { if (w) setWho(w); setStep(1); setTime(""); setOpen(true); setMenu(false); };
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero agendar uma consulta com a Dra. ${brand}${cust ? `, em nome de ${cust}` : ""}: ${who.toLowerCase()}, ${days[day]?.label ?? ""} às ${time}.`)}`;
  const wa2 = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Sou ${cust2 || "..."} e quero agendar uma consulta com a Dra. ${brand}.`)}`;

  return (
    <div className="nut" style={{ fontFamily: "Jost, system-ui, sans-serif", color: INK, background: BG, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=Jost:wght@400;500;600&display=swap');
        .nut *{box-sizing:border-box}
        .nut a,.nut button{font-family:inherit}
        .nut .wrap{max-width:1180px;margin:0 auto;padding:0 24px}
        .nut .nav{padding:22px 0;background:${BG}}
        .nut .navin{display:flex;align-items:center;justify-content:space-between;gap:20px}
        .nut .logo{display:flex;align-items:center;gap:12px}
        .nut .logo .mk{width:46px;height:46px;border-radius:50%;border:1.5px solid ${GR};display:grid;place-items:center;font-family:'Cormorant Garamond',serif;font-weight:600;font-size:22px;color:${GR}}
        .nut .logo b{display:block;font-family:'Cormorant Garamond',serif;font-weight:600;font-size:19px;letter-spacing:2.5px;color:${GR};text-transform:uppercase;line-height:1.1}
        .nut .logo small{display:block;font-size:10.5px;letter-spacing:4px;color:${TN2};text-transform:uppercase;font-weight:600}
        .nut .links{display:flex;gap:14px;font-size:13.5px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;align-items:center}
        .nut .links a{color:${GR};cursor:pointer}
        .nut .links a:hover{color:${TN2}}
        .nut .links i{color:${TN2};font-style:normal}
        .nut .btn{background:${GR};color:#fff;border:0;border-radius:6px;padding:0 28px;min-height:52px;font-weight:600;font-size:13px;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;display:inline-flex;align-items:center;gap:10px;text-decoration:none}
        .nut .btn:hover{background:${GR3}}
        .nut .btn.t{background:${TN};color:${INK}}
        .nut .btn.t:hover{background:${TN2}}
        .nut .burger{display:none;background:none;border:0;width:44px;height:44px;cursor:pointer}
        .nut .hero{display:grid;grid-template-columns:1.05fr .95fr;gap:50px;align-items:center;padding:30px 0 70px}
        .nut h1{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:clamp(36px,4.6vw,56px);line-height:1.14;margin:0;color:${GR}}
        .nut h1 em{font-style:italic;font-weight:500}
        .nut .lead{font-size:16.5px;line-height:1.7;color:#4a5844;margin:20px 0 30px;max-width:430px}
        .nut .heroph{position:relative}
        .nut .heroph img{width:100%;display:block;border-radius:18px;aspect-ratio:3/3.7;object-fit:cover;box-shadow:0 24px 50px rgba(20,40,28,.22)}
        .nut .strip{position:relative;z-index:2;margin:-64px auto -64px;max-width:900px;background:${GR};border:1.5px solid ${TN};border-radius:14px;display:grid;grid-template-columns:1fr 1fr}
        .nut .strip>div{display:flex;align-items:center;gap:16px;padding:22px 30px}
        .nut .strip>div+div{border-left:1.5px solid rgba(217,185,143,.45)}
        .nut .strip b{display:block;font-family:'Cormorant Garamond',serif;font-size:19px;font-weight:600;color:#fff;line-height:1.25}
        .nut .sec{padding:76px 0}
        .nut .ktitle{font-size:15px;letter-spacing:4.5px;text-transform:uppercase;font-weight:600;text-align:center;margin:0 0 44px}
        .nut .cards6{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
        .nut .c6{background:${TN};border-radius:12px;min-height:118px;display:flex;align-items:center;justify-content:center;text-align:center;padding:20px 18px}
        .nut .c6 span{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:19px;line-height:1.3;color:${INK}}
        .nut .c6 small{display:block;font-family:Jost,sans-serif;font-weight:400;font-size:13.5px;color:#5a4a33;margin-top:6px;line-height:1.5}
        .nut .bnf{display:grid;grid-template-columns:.9fr 1.1fr;gap:56px;align-items:center}
        .nut .bnf img{width:100%;display:block;aspect-ratio:4/4.4;object-fit:cover}
        .nut .bl{display:flex;flex-direction:column;gap:26px;margin-top:34px}
        .nut .bl>div{display:flex;gap:14px;align-items:flex-start}
        .nut .bl .ck{flex:none;width:26px;height:26px;border-radius:50%;background:${GR};display:grid;place-items:center;margin-top:2px}
        .nut .bl b{display:block;font-size:16.5px;font-weight:600;color:${GR}}
        .nut .bl p{margin:4px 0 0;font-size:14.5px;line-height:1.6;color:#4a5844}
        .nut .about{display:grid;grid-template-columns:.95fr 1.05fr;gap:56px;align-items:center}
        .nut .about img{width:100%;display:block;border-radius:180px 180px 18px 18px;aspect-ratio:3/3.8;object-fit:cover;border:6px solid ${GR}}
        .nut .about p{font-size:15.5px;line-height:1.75;color:#f3ecd9;margin:0 0 16px}
        .nut h2{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:clamp(30px,3.8vw,44px);margin:0;line-height:1.12}
        .nut h2 em{font-style:italic;font-weight:500}
        .nut .stats{display:flex;gap:34px;margin-top:26px}
        .nut .stats b{display:block;font-family:'Cormorant Garamond',serif;font-size:38px;font-weight:600;color:${TN};line-height:1}
        .nut .stats span{font-size:13.5px;color:#e6dcc4}
        .nut .tcards{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;padding:6px 4px 22px;scrollbar-width:none}
        .nut .tcards::-webkit-scrollbar{display:none}
        .nut .tcard{flex:0 0 236px;scroll-snap-align:start;background:#fff;border:1.5px solid #e3d5b8;border-radius:16px;padding:22px 18px;display:flex;flex-direction:column;gap:12px}
        .nut .tcard img{width:52px;height:52px;border-radius:50%;object-fit:cover;border:2.5px solid ${TN}}
        .nut .tcard b{font-size:16px;font-weight:600;color:${GR}}
        .nut .tcard p{margin:0;font-size:13.5px;line-height:1.6;color:#4a5844;flex:1}
        .nut .trow{display:flex;align-items:center;gap:14px;margin-top:30px}
        .nut .arr{flex:none;width:46px;height:46px;border-radius:50%;border:1.5px solid ${GR};background:transparent;color:${GR};cursor:pointer;font-size:17px}
        .nut .arr:hover{background:${GR};color:#fff}
        .nut .stars{color:${TN2};letter-spacing:2px;font-size:13px}
        .nut .cta{text-align:center}
        .nut .cta h2{color:#fff;max-width:640px;margin:0 auto}
        .nut .cta p{color:#e6dcc4;font-size:16px;margin:18px auto 30px;max-width:460px;line-height:1.6}
        .nut .ctaform{display:flex;flex-direction:column;gap:12px;max-width:340px;margin:0 auto}
        .nut .ctaform input{min-height:54px;border-radius:8px;border:0;padding:0 26px;font-size:15.5px;font-family:inherit;background:#fff;color:${INK};text-align:center}
        .nut footer{background:#142c20;color:#cfc4a8;padding:40px 0 26px}
        .nut .fr{display:flex;align-items:flex-start;justify-content:space-between;gap:26px;flex-wrap:wrap}
        .nut .fr nav{display:flex;gap:24px;font-size:14.5px}
        .nut .fr nav a{cursor:pointer;color:#e6dcc4}
        .nut .fr nav a:hover{color:#fff}
        .nut .copy{text-align:center;font-size:13px;color:#8a967f;margin-top:30px}
        .nut .wa{position:fixed;right:18px;bottom:18px;z-index:40;width:58px;height:58px;border-radius:50%;background:#25d366;display:grid;place-items:center;box-shadow:0 8px 24px rgba(0,0,0,.3)}
        .nut .ov{position:fixed;inset:0;z-index:100;background:rgba(16,32,22,.62);display:flex;align-items:center;justify-content:center;padding:16px}
        .nut .md{background:${BG};width:100%;max-width:520px;max-height:92vh;overflow:auto;padding:32px;border-radius:20px;position:relative}
        .nut .md h3{font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:600;margin:8px 0 4px;color:${GR}}
        .nut .tag{display:inline-block;background:${TN};color:${INK};border-radius:999px;padding:6px 14px;font-size:13px;font-weight:600}
        .nut .bars{display:flex;gap:6px;margin:14px 0 20px}.nut .bars i{flex:1;height:4px;border-radius:4px;background:#ddd0b4}.nut .bars i.on{background:${GR}}
        .nut .chip{padding:12px 8px;border:1.5px solid #d8c8a6;border-radius:10px;background:#fff;cursor:pointer;font-size:15px;text-align:center;min-height:46px;color:${INK}}
        .nut .chip.on{background:${GR};color:#fff;border-color:${GR}}
        .nut .x{position:absolute;right:14px;top:12px;width:44px;height:44px;border:0;background:none;font-size:26px;cursor:pointer;color:${GR}}
        .nut .mob{display:none}
        @media(max-width:900px){
          .nut .links{display:none}.nut .burger{display:block}
          .nut .hero{grid-template-columns:1fr;gap:34px;padding:10px 0 60px}
          .nut .heroph{max-width:420px;margin:0 auto;width:100%}
          .nut .strip{grid-template-columns:1fr;margin:-40px 16px 0}
          .nut .strip>div+div{border-left:0;border-top:1.5px solid rgba(217,185,143,.45)}
          .nut .cards6{grid-template-columns:1fr;gap:12px}
          .nut .c6{min-height:0;padding:18px}
          .nut .bnf,.nut .about{grid-template-columns:1fr;gap:36px}
          .nut .about img{max-width:340px;margin:0 auto}
          .nut .sec{padding:56px 0}
          .nut .stats{gap:22px}.nut .stats b{font-size:30px}
          .nut .mob{display:block;background:#fff;border-radius:14px;margin:12px 16px 0;box-shadow:0 8px 24px rgba(20,40,28,.14)}
          .nut .mob a{display:block;padding:15px 20px;font-size:15px;cursor:pointer;border-top:1px solid #eee2c8;color:${INK}}
          .nut .mob a:first-child{border:0}
          .nut .md{padding:26px 20px}
        }
      `}</style>

      <header className="nav" id="top"><div className="wrap navin">
        <div className="logo"><span className="mk">LP</span><span><b>{brand}</b><small>Nutricionista</small></span></div>
        <nav className="links"><a onClick={() => go("top")}>Início</a><i>|</i><a onClick={() => go("servicos")}>Serviços</a><i>|</i><a onClick={() => go("sobre")}>Sobre mim</a><i>|</i><a onClick={() => go("beneficios")}>Benefícios</a></nav>
        <button type="button" className="burger" aria-label="Menu" onClick={() => setMenu((m) => !m)}><svg width="26" height="26" viewBox="0 0 26 26" stroke={GR} strokeWidth="2"><path d="M3 7h20M3 13h20M3 19h20" /></svg></button>
      </div>
      {menu && <div className="mob"><a onClick={() => go("servicos")}>Serviços</a><a onClick={() => go("sobre")}>Sobre mim</a><a onClick={() => go("beneficios")}>Benefícios</a><a onClick={() => go("depoimentos")}>Depoimentos</a><a onClick={() => start()} style={{ color: GR, fontWeight: 700 }}>Agende a sua consulta</a></div>}
      </header>

      <section className="wrap hero">
        <div>
          <h1>Alcance sua melhor performance com uma <em>nutrição feita para o seu corpo</em></h1>
          <p className="lead">Transforme sua composição corporal e melhore seu desempenho físico com um plano alimentar personalizado para suas necessidades.</p>
          <button type="button" className="btn" onClick={() => start()}><Ic d="M16 3a13 13 0 0 0-11 19.8L3 29l6.4-1.9A13 13 0 1 0 16 3z" s={18} c="#fff" f="#fff" />Agende a sua consulta!</button>
        </div>
        <div className="heroph"><img src="/nutri-hero.webp" alt={`Dra. ${brand}, nutricionista`} /></div>
      </section>

      <div className="wrap"><div className="strip">
        <div><Ic d={TARGET} s={34} c={TN} /><b>Foco em<br />resultados reais</b></div>
        <div><Ic d={APPLE} s={34} c={TN} /><b>Nutrição sem<br />restrições extremas</b></div>
      </div></div>

      <section className="sec" id="servicos" style={{ background: GR }}><div className="wrap">
        <p className="ktitle" style={{ color: CRM }}>Consulta nutricional personalizada</p>
        <div className="cards6">
          {SERVICES.map((s) => (
            <button type="button" className="c6" key={s.t} onClick={() => start(s.t)} style={{ border: 0, cursor: "pointer" }}>
              <span>{s.t}<small>{s.d}</small></span>
            </button>
          ))}
        </div>
      </div></section>

      <section className="sec" id="sobre" style={{ background: GR }}><div className="wrap about">
          <img src="/nutri-sobre.webp" alt={`Dra. ${brand} na cozinha`} loading="lazy" />
          <div>
            <h2 style={{ color: "#fff" }}>Sobre <em>mim</em></h2>
            <div style={{ marginTop: 22 }}>
              <p>Olá! Sou Dra. {brand}, nutricionista (CRN 00000), especialista em nutrição funcional e esportiva.</p>
              <p>Acredito que comer bem não é seguir dietas impossíveis: é entender o seu corpo, a sua rotina e os seus objetivos para construir um plano que dura.</p>
              <p>Atendo quem quer emagrecer com saúde, ganhar massa magra, melhorar o desempenho nos treinos ou atravessar fases como SOP, endometriose e menopausa com mais qualidade de vida.</p>
              <p>Cada acompanhamento é próximo e medido: a gente compara o progresso, ajusta o plano e celebra cada resultado real.</p>
            </div>
            <div className="stats">
              <div><b>+9</b><span>anos de prática</span></div>
              <div><b>+500</b><span>pacientes acompanhados</span></div>
              <div><b>100%</b><span>planos personalizados</span></div>
            </div>
          </div>
      </div></section>

      <section className="sec" id="beneficios"><div className="wrap">
        <p className="ktitle" style={{ color: GR }}>Benefícios dos serviços</p>
        <div className="bnf">
          <img src="/nutri-veggies.webp" alt="Vegetais frescos e alimentos naturais" loading="lazy" />
          <div className="bl">
            {BENEFITS.map((b) => (
              <div key={b.t}>
                <span className="ck"><Ic d={CHECK} s={14} c="#fff" /></span>
                <span><b>{b.t}</b><p>{b.d}</p></span>
              </div>
            ))}
          </div>
        </div>
      </div></section>

      <section className="sec" id="depoimentos" style={{ paddingTop: 0 }}><div className="wrap">
        <p className="ktitle" style={{ color: GR }}>Depoimentos de pacientes</p>
        <div className="trow">
          <button type="button" className="arr" aria-label="Anterior" onClick={() => setTi((ti + TESTI.length - 1) % TESTI.length)}>←</button>
          <div className="tcards" style={{ flex: 1 }}>
            {TESTI.map((t, i) => (
              <div className="tcard" key={t.n} style={i === ti ? { outline: `2.5px solid ${GR}`, outlineOffset: 3 } : undefined}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <img src={t.a} alt={t.n} loading="lazy" />
                  <div><b>{t.n}</b><div className="stars">★★★★★</div></div>
                </div>
                <p>“{t.t}”</p>
              </div>
            ))}
          </div>
          <button type="button" className="arr" aria-label="Próximo" onClick={() => setTi((ti + 1) % TESTI.length)}>→</button>
        </div>
      </div></section>

      <section className="sec cta" style={{ background: GR }}><div className="wrap">
        <h2>Seu próximo passo é simples: <em>agende a sua consulta</em></h2>
        <p>Na primeira conversa entendemos seu momento, sua rotina e seus objetivos para desenhar o plano ideal para você.</p>
        <div className="ctaform">
          <input value={cust2} onChange={(e) => setCust2(e.target.value)} placeholder="Digite seu nome" aria-label="Seu nome" />
          <a className="btn t" style={{ justifyContent: "center" }} href={wa2} target="_blank" rel="noreferrer">Continuar <span aria-hidden>→</span></a>
        </div>
      </div></section>

      <footer id="contato"><div className="wrap">
        <div className="fr">
          <div className="logo"><span className="mk" style={{ borderColor: TN, color: TN }}>LP</span><span><b style={{ color: TN }}>{brand}</b><small>Nutricionista</small></span></div>
          <nav><a onClick={() => go("top")}>Início</a><a onClick={() => go("servicos")}>Serviços</a><a onClick={() => go("sobre")}>Sobre mim</a><a onClick={() => go("beneficios")}>Benefícios</a></nav>
          <div style={{ fontSize: 14.5, lineHeight: 1.7 }}>
            Av. Brasil, 850, Jardim Chapadão, {city}<br />
            Seg a sex, 8h às 19h · Sáb, 8h às 12h<br />
            Atendimento presencial e online · <a href={`https://wa.me/${num}`} target="_blank" rel="noreferrer" style={{ color: TN, fontWeight: 600 }}>Falar no WhatsApp</a>
          </div>
        </div>
        <div className="copy">© 2025 {brand} · Nutricionista · CRN 00000</div>
      </div></footer>

      {sc && <a className="wa" href={`https://wa.me/${num}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg></a>}

      {open && (
        <div className="ov" onClick={(e) => e.target === e.currentTarget && setOpen(false)} role="dialog" aria-modal="true" aria-label="Agendar consulta">
          <div className="md">
            <button type="button" className="x" aria-label="Fechar" onClick={() => setOpen(false)}>×</button>
            <span className="tag">Passo {step} de 3</span>
            <h3>{["Qual é o seu objetivo?", "Dia e horário", "Confirme o agendamento"][step - 1]}</h3>
            <div className="bars">{[1, 2, 3].map((n) => <i key={n} className={n <= step ? "on" : ""} />)}</div>
            {step === 1 && (<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {["Emagrecimento saudável", "Ganho de massa magra", "Nutrição esportiva", "Saúde da mulher"].map((w) => (<button type="button" key={w} className={`chip${who === w ? " on" : ""}`} onClick={() => setWho(w)}>{w}</button>))}
            </div>)}
            {step === 2 && (<div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 16 }}>
                {days.map((d, i) => (<button type="button" key={d.label} className={`chip${day === i ? " on" : ""}`} onClick={() => setDay(i)}><small style={{ display: "block", textTransform: "uppercase", fontSize: 11, letterSpacing: 1 }}>{d.dow}</small><b style={{ fontSize: 18 }}>{d.d}</b></button>))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                {TIMES.map((x) => (<button type="button" key={x} className={`chip${time === x ? " on" : ""}`} onClick={() => setTime(x)}>{x}</button>))}
              </div>
            </div>)}
            {step === 3 && (<div>
              <div style={{ background: "#fff", border: "1.5px solid #d8c8a6", borderRadius: 12, padding: 18, fontSize: 15.5, lineHeight: 1.9 }}>
                <b>{who}</b><br />{days[day]?.label} às {time}<br /><span style={{ color: "#6a7a5e", fontSize: 14 }}>Dra. {brand}, {city}</span>
              </div>
              <input value={cust} onChange={(e) => setCust(e.target.value)} placeholder="Seu nome" aria-label="Seu nome" style={{ width: "100%", marginTop: 14, minHeight: 50, padding: "0 16px", border: "1.5px solid #d8c8a6", borderRadius: 12, fontSize: 15.5, background: "#fff", fontFamily: "inherit" }} />
            </div>)}
            <div style={{ display: "flex", gap: 10, marginTop: 22, justifyContent: "space-between" }}>
              {step > 1 ? <button type="button" className="btn" style={{ background: "#e3d5b8", color: INK }} onClick={() => setStep(step - 1)}>Voltar</button> : <span />}
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
