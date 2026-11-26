import { useEffect, useState } from "react";

/** Psicologa infantil, construida do zero a partir de um pin claro em creme e marrom. Agendamento de sessao em 3 passos que fecha no WhatsApp. */
const DK = "#2f251d", DK2 = "#3c2f24", TN = "#8f7055", TN2 = "#c9ae8b", BG = "#f7f2ea", CR = "#efe5d8", INK = "#2b211a", CRM = "#f4ebdf";
const SERVICES = [
  { t: "Atendimento psicológico infantil", d: "Sessões lúdicas para crianças a partir de 5 anos" },
  { t: "Orientação para pais e responsáveis", d: "Encontros para alinhar caminhos e rotinas" },
  { t: "Acompanhamento do desenvolvimento", d: "Escuta atenta em cada fase do crescimento" },
  { t: "Intervenção em situações específicas", d: "Ansiedade, TDAH, luto, separação e autoestima" },
];
const TESTI = [
  { n: "Ana Paula", t: "Minha filha esperava a semana inteira pela sessão. Em poucos meses ela voltou a dormir tranquila e a falar do que sente. A Marina acolheu nossa família inteira.", a: "/psy-a1.webp" },
  { n: "João Guilherme", t: "Como pai, eu me sentia perdido depois da separação. A orientação me deu caminhos práticos e meu filho voltou a sorrir na escola. Recomendo de olhos fechados.", a: "/psy-a2.webp" },
  { n: "Luana Santos", t: "Profissional incrível. Meu filho tem TDAH e pela primeira vez ele se sentiu entendido, não rotulado. O relatório pra escola ajudou demais nas adaptações.", a: "/psy-a3.webp" },
  { n: "Cláudia Ramos", t: "Meu filho era muito ansioso antes das provas. As técnicas que ele aprendeu nas sessões mudaram a rotina da casa. Vale cada encontro, presencial ou online.", a: "/psy-a4.webp" },
  { n: "Gustavo Pereira", t: "Procurei ajuda para minha sobrinha que criei. Fui recebido sem julgamento e com muito carinho. Hoje ela tem mais segurança e eu tenho mais clareza do meu papel.", a: "/psy-a5.webp" },
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
const LEAF = "M6 26C6 12 14 5 27 5c0 13-7 21-21 21zM6 26c4-8 9-12 15-14";
const Ic = ({ d, s = 30, c = "currentColor" }: { d: string; s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);

export function PsyFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Marina Costa";
  const city = client?.city?.trim() || "Santos";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [who, setWho] = useState("Criança (5 a 9 anos)");
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
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero agendar uma sessão com a Dra. ${brand}${cust ? `, em nome de ${cust}` : ""}: ${who.toLowerCase()}, ${days[day]?.label ?? ""} às ${time}.`)}`;
  const wa2 = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Sou ${cust2 || "..."} e quero agendar uma consulta gratuita com a Dra. ${brand}.`)}`;

  return (
    <div className="psy" style={{ fontFamily: "Jost, system-ui, sans-serif", color: INK, background: BG, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=Jost:wght@400;500;600&display=swap');
        .psy *{box-sizing:border-box}
        .psy a,.psy button{font-family:inherit}
        .psy .wrap{max-width:1180px;margin:0 auto;padding:0 24px}
        .psy .nav{position:absolute;top:0;left:0;right:0;z-index:5;padding:26px 0}
        .psy .navin{display:flex;align-items:center;justify-content:space-between;gap:20px}
        .psy .logo{display:flex;align-items:center;gap:10px;font-family:'Cormorant Garamond',serif;font-weight:600;font-style:italic;font-size:29px;color:#fff}
        .psy .links{display:flex;gap:30px;font-size:15px;font-weight:500}
        .psy .links a{color:#f3e9db;cursor:pointer;padding-bottom:6px;border-bottom:2px solid transparent}
        .psy .links a:hover{border-color:${TN2}}
        .psy .btn{background:${TN2};color:${DK};border:0;border-radius:999px;padding:0 30px;min-height:52px;font-weight:600;font-size:13.5px;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;display:inline-flex;align-items:center;gap:10px;text-decoration:none;box-shadow:0 10px 24px rgba(30,20,12,.25)}
        .psy .btn:hover{filter:brightness(1.07)}
        .psy .btn.o{background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,.55);box-shadow:none}
        .psy .btn.d{background:${DK};color:${CRM}}
        .psy .burger{display:none;background:none;border:0;width:44px;height:44px;cursor:pointer}
        .psy .hero{position:relative;min-height:660px;display:flex;align-items:center;background:${DK}}
        .psy .heroimg{position:absolute;inset:0}
        .psy .heroimg img{width:100%;height:100%;object-fit:cover;object-position:68% 40%;display:block}
        .psy .heroshade{position:absolute;inset:0;background:linear-gradient(92deg,rgba(30,21,14,.9) 0%,rgba(30,21,14,.66) 40%,rgba(30,21,14,.12) 68%,rgba(30,21,14,0) 100%)}
        .psy .hero .wrap{position:relative;z-index:2;width:100%}
        .psy h1{font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:500;font-size:clamp(40px,5.4vw,66px);line-height:1.12;margin:0;color:#fff;max-width:520px;text-shadow:0 2px 30px rgba(20,12,6,.5)}
        .psy .lead{font-size:17.5px;line-height:1.65;color:#efe3d3;margin:22px 0 32px;max-width:400px}
        .psy .kick{display:inline-block;font-size:12px;letter-spacing:3.5px;text-transform:uppercase;font-weight:600;color:${TN2};margin-bottom:18px}
        .psy .sec{padding:76px 0}
        .psy h2{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:clamp(32px,4vw,46px);margin:0;line-height:1.1}
        .psy h2 em{font-style:italic;font-weight:500}
        .psy .servgrid{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
        .psy .lap{transform:rotate(-3deg);border-radius:22px;overflow:hidden;box-shadow:0 30px 60px rgba(0,0,0,.45);border:6px solid #241b14}
        .psy .lap img{width:100%;display:block;aspect-ratio:4/3.1;object-fit:cover}
        .psy .sv{display:flex;flex-direction:column;gap:14px;margin-top:30px}
        .psy .sv button{display:flex;align-items:center;justify-content:space-between;gap:14px;background:${TN2};color:${DK};border:0;border-radius:999px;padding:13px 22px;font-size:16px;font-weight:500;cursor:pointer;text-align:left;transition:transform .25s}
        .psy .sv button:hover{transform:translateX(8px)}
        .psy .sv small{display:block;font-weight:400;font-size:13px;opacity:.75;margin-top:2px}
        .psy .sv .dot{flex:none;width:26px;height:26px;border-radius:50%;border:2px solid ${DK};display:grid;place-items:center;font-size:12px}
        .psy .aboutgrid{display:grid;grid-template-columns:1.15fr .85fr;gap:56px;align-items:center}
        .psy .about p{font-size:15.5px;line-height:1.75;color:#fdf6ec;margin:0 0 16px}
        .psy .arch{border-radius:200px 200px 26px 26px;overflow:hidden;border:8px solid ${DK};box-shadow:0 24px 50px rgba(30,20,12,.3)}
        .psy .arch img{width:100%;display:block;aspect-ratio:3/3.9;object-fit:cover}
        .psy .stats{display:flex;gap:34px;margin-top:26px}
        .psy .stats b{display:block;font-family:'Cormorant Garamond',serif;font-size:38px;font-weight:600;color:#fff;line-height:1}
        .psy .stats span{font-size:13.5px;color:#f4e8d8}
        .psy .tcards{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;padding:6px 4px 22px;scrollbar-width:none}
        .psy .tcards::-webkit-scrollbar{display:none}
        .psy .tcard{flex:0 0 222px;scroll-snap-align:start;background:#6f5844;color:${CRM};border-radius:18px;padding:22px 16px;display:flex;flex-direction:column;gap:12px}
        .psy .tcard img{width:52px;height:52px;border-radius:50%;object-fit:cover;border:2.5px solid ${TN2}}
        .psy .tcard b{font-size:16.5px;font-weight:600}
        .psy .tcard p{margin:0;font-size:13.5px;line-height:1.6;color:#e8dac6;flex:1}
        .psy .trow{display:flex;align-items:center;gap:14px;margin-top:30px}
        .psy .arr{flex:none;width:46px;height:46px;border-radius:50%;border:1.5px solid ${DK};background:transparent;color:${DK};cursor:pointer;font-size:17px}
        .psy .arr:hover{background:${DK};color:${CRM}}
        .psy .stars{color:#d8b06a;letter-spacing:2px;font-size:13px}
        .psy .cta{text-align:center}
        .psy .cta h2{color:#fff;max-width:640px;margin:0 auto}
        .psy .cta p{color:#f6ecdd;font-size:16px;margin:18px auto 30px;max-width:460px;line-height:1.6}
        .psy .ctaform{display:flex;flex-direction:column;gap:12px;max-width:340px;margin:0 auto}
        .psy .ctaform input{min-height:54px;border-radius:999px;border:0;padding:0 26px;font-size:15.5px;font-family:inherit;background:#fff;color:${INK};text-align:center}
        .psy footer{background:${DK};color:#d9c8b4;padding:40px 0 26px}
        .psy .fr{display:flex;align-items:flex-start;justify-content:space-between;gap:26px;flex-wrap:wrap}
        .psy .fr nav{display:flex;gap:24px;font-size:14.5px}
        .psy .fr nav a{cursor:pointer;color:#e9dcc9}
        .psy .fr nav a:hover{color:#fff}
        .psy .copy{text-align:center;font-size:13px;color:#a68d74;margin-top:30px}
        .psy .wa{position:fixed;right:18px;bottom:calc(18px + env(safe-area-inset-bottom));z-index:40;width:58px;height:58px;border-radius:50%;background:#25d366;display:grid;place-items:center;box-shadow:0 8px 24px rgba(0,0,0,.3)}
        .psy .ov{position:fixed;inset:0;z-index:100;background:rgba(32,22,14,.62);display:flex;align-items:center;justify-content:center;padding:16px}
        .psy .md{background:${BG};width:100%;max-width:520px;max-height:92vh;overflow:auto;padding:32px;border-radius:26px;position:relative}
        .psy .md h3{font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:600;margin:8px 0 4px;color:${DK}}
        .psy .tag{display:inline-block;background:${CR};color:${DK};border-radius:999px;padding:6px 14px;font-size:13px;font-weight:600}
        .psy .bars{display:flex;gap:6px;margin:14px 0 20px}.psy .bars i{flex:1;height:4px;border-radius:4px;background:#e2d2bf}.psy .bars i.on{background:${TN}}
        .psy .chip{padding:12px 8px;border:1.5px solid #ddc9b2;border-radius:14px;background:#fff;cursor:pointer;font-size:15px;text-align:center;min-height:46px;color:${INK}}
        .psy .chip.on{background:${DK};color:#fff;border-color:${DK}}
        .psy .x{position:absolute;right:14px;top:12px;width:44px;height:44px;border:0;background:none;font-size:26px;cursor:pointer;color:${DK}}
        .psy .mob{display:none}
        @media(max-width:900px){
          .psy .wa{width:46px;height:46px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom))}
          .psy .wa svg{width:24px;height:24px}
          .psy{padding-bottom:70px}
          .psy .links,.psy .navbtn{display:none}.psy .burger{display:block}
          .psy .hero{min-height:560px}.psy .heroimg img{object-position:72% 30%}
          .psy .heroshade{background:linear-gradient(180deg,rgba(30,21,14,.45) 0%,rgba(30,21,14,.75) 60%,rgba(30,21,14,.9) 100%)}
          .psy .hero{display:block;min-height:0}.psy .nav{position:relative}.psy .hero .wrap{padding-top:34px;padding-bottom:60px}
          .psy h1{max-width:340px}
          .psy .servgrid{grid-template-columns:1fr;gap:40px}
          .psy .aboutgrid{grid-template-columns:1fr;gap:36px}
          .psy .arch{max-width:340px;margin:0 auto}
          .psy .sec{padding:56px 0}
          .psy .stats{gap:22px}.psy .stats b{font-size:30px}
          .psy .tcard{flex-basis:236px}
          .psy .mob{display:block;background:#fff;border-radius:16px;margin:0 16px;box-shadow:0 8px 24px rgba(30,20,12,.16)}
          .psy .mob a{display:block;padding:15px 20px;font-size:15px;cursor:pointer;border-top:1px solid #f0e4d4;color:${INK}}
          .psy .mob a:first-child{border:0}
          .psy .md{padding:26px 20px}
        }
      `}</style>

      <div className="hero" id="top">
        <div className="heroimg"><img src="/psy-hero.webp" alt="Consultório acolhedor da psicóloga" /></div>
        <div className="heroshade" />
        <header className="nav"><div className="wrap navin">
          <div className="logo"><Ic d={LEAF} s={30} c={TN2} />Dra. {brand}</div>
          <nav className="links"><a onClick={() => go("top")}>Início</a><a onClick={() => go("servicos")}>Serviços</a><a onClick={() => go("sobre")}>Sobre mim</a><a onClick={() => go("depoimentos")}>Depoimentos</a><a onClick={() => go("contato")}>Contato</a></nav>
          <button type="button" className="btn navbtn" onClick={() => start()}>Agende sua sessão</button>
          <button type="button" className="burger" aria-label="Menu" onClick={() => setMenu((m) => !m)}><svg width="26" height="26" viewBox="0 0 26 26" stroke="#fff" strokeWidth="2"><path d="M3 7h20M3 13h20M3 19h20" /></svg></button>
        </div>
        {menu && <div className="wrap"><div className="mob"><a onClick={() => go("servicos")}>Serviços</a><a onClick={() => go("sobre")}>Sobre mim</a><a onClick={() => go("depoimentos")}>Depoimentos</a><a onClick={() => go("contato")}>Contato</a><a onClick={() => start()} style={{ color: TN, fontWeight: 700 }}>Agende sua sessão</a></div></div>}
        </header>
        <div className="wrap">
          <span className="kick">Psicologia infantil · {city}</span>
          <h1>Ajudamos seu filho a lidar com emoções e desafios desde cedo.</h1>
          <p className="lead">Cuidar da saúde emocional na infância é investir em um futuro mais leve e equilibrado.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button type="button" className="btn" onClick={() => start()}>Agende sua sessão</button>
            </div>
        </div>
      </div>

      <section className="sec" id="servicos" style={{ background: DK }}><div className="wrap servgrid">
        <div className="lap"><img src="/psy-laptop.webp" alt="Atendimento online por videochamada" loading="lazy" /></div>
        <div>
          <h2 style={{ color: "#fff" }}>Nossos <em>serviços</em></h2>
          <div className="sv">
            {SERVICES.map((s) => (
              <button type="button" key={s.t} onClick={() => start(s.t)}>
                <span>{s.t}<small>{s.d}</small></span>
                <span className="dot" aria-hidden><Ic d="M10 8l8 8-8 8" s={13} c={DK} /></span>
              </button>
            ))}
          </div>
          <p style={{ color: "#cbb59c", fontSize: 14, marginTop: 22 }}>Atendimento presencial em {city} e online para todo o Brasil.</p>
        </div>
      </div></section>

      <section className="sec about" id="sobre" style={{ background: TN }}><div className="wrap aboutgrid">
        <div>
          <h2 style={{ color: "#fff" }}>Sobre <em>mim</em></h2>
          <div style={{ marginTop: 22 }}>
            <p>Olá! Sou Dra. {brand}, psicóloga clínica (CRP 00/00000), especializada em psicoterapia infantil.</p>
            <p>Minha abordagem é baseada na Terapia Cognitivo-Comportamental Infantil, com formação em Psicologia do Desenvolvimento e anos de escuta dedicada a crianças e famílias.</p>
            <p>Atendo crianças a partir de 5 anos, acompanhando casos de ansiedade, TDAH, dificuldades escolares, luto, separação dos pais e questões de autoestima.</p>
            <p>Ofereço um espaço seguro e afetuoso, onde cada criança é acolhida em sua individualidade e cada família é escutada com cuidado e orientação.</p>
          </div>
          <div className="stats">
            <div><b>+8</b><span>anos de clínica</span></div>
            <div><b>+300</b><span>famílias acompanhadas</span></div>
            <div><b>100%</b><span>sigilo e acolhimento</span></div>
          </div>
        </div>
        <div className="arch"><img src="/psy-sobre.webp" alt={`Dra. ${brand} em seu consultório`} loading="lazy" /></div>
      </div></section>

      <section className="sec" id="depoimentos"><div className="wrap">
        <h2 style={{ textAlign: "center", color: INK }}>Depoimentos de <em>pacientes</em></h2>
        <div className="trow">
          <button type="button" className="arr" aria-label="Anterior" onClick={() => setTi((ti + TESTI.length - 1) % TESTI.length)}>←</button>
          <div className="tcards" style={{ flex: 1 }}>
            {TESTI.map((t, i) => (
              <div className="tcard" key={t.n} style={i === ti ? { outline: `2.5px solid ${TN}`, outlineOffset: 3 } : undefined}>
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

      <section className="sec cta" style={{ background: TN }}><div className="wrap">
        <h2>Seu próximo passo é simples: <em>agende uma consulta gratuita</em></h2>
        <p>Com uma primeira conversa sem compromisso, entendemos o momento do seu filho e desenhamos juntos o caminho ideal.</p>
        <div className="ctaform">
          <input value={cust2} onChange={(e) => setCust2(e.target.value)} placeholder="Digite seu nome" aria-label="Seu nome" />
          <a className="btn d" style={{ justifyContent: "center", boxShadow: "none" }} href={wa2} target="_blank" rel="noreferrer">Continuar <span aria-hidden>→</span></a>
        </div>
      </div></section>

      <footer id="contato"><div className="wrap">
        <div className="fr">
          <div className="logo" style={{ fontSize: 24 }}><Ic d={LEAF} s={26} c={TN2} />Dra. {brand}</div>
          <nav><a onClick={() => go("top")}>Início</a><a onClick={() => go("servicos")}>Serviços</a><a onClick={() => go("sobre")}>Sobre mim</a><a onClick={() => go("depoimentos")}>Depoimentos</a></nav>
          <div style={{ fontSize: 14.5, lineHeight: 1.7 }}>
            Av. Ana Costa, 456, Gonzaga, {city}<br />
            Seg a sex, 8h às 19h · Sáb, 8h às 12h<br />
            Instagram @{brand.normalize("NFD").toLowerCase().replace(/[^a-z]+/g, "")}psi · <a href={`https://wa.me/${num}`} target="_blank" rel="noreferrer" style={{ color: TN2, fontWeight: 600 }}>Falar no WhatsApp</a>
          </div>
        </div>
        <div className="copy">© 2025 {brand} · Psicóloga clínica · CRP 00/00000</div>
      </div></footer>

      {sc && <a className="wa" href={`https://wa.me/${num}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg></a>}

      {open && (
        <div className="ov" onClick={(e) => e.target === e.currentTarget && setOpen(false)} role="dialog" aria-modal="true" aria-label="Agendar sessão">
          <div className="md">
            <button type="button" className="x" aria-label="Fechar" onClick={() => setOpen(false)}>×</button>
            <span className="tag">Passo {step} de 3</span>
            <h3>{["Quem será atendido?", "Dia e horário", "Confirme o agendamento"][step - 1]}</h3>
            <div className="bars">{[1, 2, 3].map((n) => <i key={n} className={n <= step ? "on" : ""} />)}</div>
            {step === 1 && (<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {["Criança (5 a 9 anos)", "Pré-adolescente (10 a 12)", "Adolescente (13+)", "Orientação para pais"].map((w) => (<button type="button" key={w} className={`chip${who === w ? " on" : ""}`} onClick={() => setWho(w)}>{w}</button>))}
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
              <div style={{ background: "#fff", border: "1.5px solid #ddc9b2", borderRadius: 14, padding: 18, fontSize: 15.5, lineHeight: 1.9 }}>
                <b>{who}</b><br />{days[day]?.label} às {time}<br /><span style={{ color: "#7a6450", fontSize: 14 }}>Dra. {brand}, {city}</span>
              </div>
              <input value={cust} onChange={(e) => setCust(e.target.value)} placeholder="Seu nome" aria-label="Seu nome" style={{ width: "100%", marginTop: 14, minHeight: 50, padding: "0 16px", border: "1.5px solid #ddc9b2", borderRadius: 14, fontSize: 15.5, background: "#fff", fontFamily: "inherit" }} />
            </div>)}
            <div style={{ display: "flex", gap: 10, marginTop: 22, justifyContent: "space-between" }}>
              {step > 1 ? <button type="button" className="btn d" style={{ background: "#e9dcc9", color: DK, boxShadow: "none" }} onClick={() => setStep(step - 1)}>Voltar</button> : <span />}
              {step < 3 ? (
                <button type="button" className="btn d" disabled={step === 2 && !time} style={{ opacity: step === 2 && !time ? 0.4 : 1 }} onClick={() => setStep(step + 1)}>Continuar</button>
              ) : (
                <a className="btn d" href={wa} target="_blank" rel="noreferrer">Confirmar no WhatsApp</a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
