import { useEffect, useState } from "react";

/** Estudio de pilates novo, construido do zero a partir de um pin de site em verde sálvia e linho ("Lex Fish"): hero em cartao arredondado com cortina de linho, trio de paineis verdes, serifa leve. Fotos reais (Gemini). Aula experimental que fecha no WhatsApp. */
const FOR = "#2f4a3c", SAGE = "#9aa89a", SAGE2 = "#667a69", LIN = "#f1eee7", LIN2 = "#e6e1d6", INK = "#1f2b24", MU = "#55625a";
const MODS = [
  { t: "Reformer", d: "Aparelho com molas, para força e alinhamento. Turmas de até 5 pessoas." },
  { t: "Mat", d: "Solo, bola e faixa. Fundamentos do pilates para qualquer idade." },
  { t: "Barre", d: "Postura, pés e coxas em ritmo contínuo, com música." },
];
const HORAS = ["07:00", "08:30", "12:15", "18:00", "19:15"];
const DOW = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
function nextDays() {
  const out: { label: string }[] = [];
  const t = new Date();
  for (let i = 1; out.length < 6; i++) {
    const x = new Date(t.getFullYear(), t.getMonth(), t.getDate() + i);
    if (x.getDay() === 0) continue;
    out.push({ label: `${DOW[x.getDay()] ?? ""}, ${String(x.getDate()).padStart(2, "0")}/${String(x.getMonth() + 1).padStart(2, "0")}` });
  }
  return out;
}

function Arcs() {
  return <svg width="64" height="40" viewBox="0 0 64 40" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M2 38a30 30 0 0 1 60 0" /><path d="M14 38a18 18 0 0 1 36 0" /><path d="M26 38a6 6 0 0 1 12 0" /></svg>;
}
export function LinhoFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Estúdio Linho";
  const city = client?.city?.trim() || "Florianópolis";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [mod, setMod] = useState(0);
  const [day, setDay] = useState(0);
  const [hora, setHora] = useState("08:30");
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  const [days] = useState(nextDays);
  useEffect(() => { const f = () => setSc(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const base = `https://wa.me/${num}`;
  const wa = `${base}?text=${encodeURIComponent(`Oi! Quero marcar uma aula experimental de ${MODS[mod]?.t} no ${brand}, ${days[day]?.label ?? ""} às ${hora}.`)}`;
  const baseNote = `${base}?text=${encodeURIComponent(`Oi! Quero conhecer o ${brand}.`)}`;

  return (
    <div className="ln" style={{ fontFamily: "Figtree, system-ui, sans-serif", color: INK, background: LIN, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;1,6..72,300;1,6..72,400&display=swap');
        .ln *{box-sizing:border-box}.ln a,.ln button,.ln select{font-family:inherit}
        .ln h1,.ln h2,.ln h3{font-family:Newsreader,Georgia,serif!important;font-weight:300!important;letter-spacing:0!important;text-transform:none!important}
        .ln .wrap{max-width:1080px;margin:0 auto;padding:0 24px}
        .ln .bar{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;height:70px}
        .ln .bar .pill{justify-self:start;display:flex;gap:10px;align-items:center}
        .ln .tag{background:${SAGE};color:#fff;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;padding:6px 12px;border-radius:4px;cursor:pointer;border:0}
        .ln .bar .sm{font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;cursor:pointer}
        .ln .logo{font-size:15px;font-weight:600;letter-spacing:.42em;text-transform:uppercase;color:${FOR};padding-left:.42em}
        .ln .dl{display:flex;gap:26px;justify-self:end}.ln .dl a{cursor:pointer;font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:${FOR}}.ln .burger{display:none;justify-self:end;background:none;border:0;cursor:pointer;color:${FOR};font-size:26px}
        .ln .drop{background:#fff;border-radius:10px;margin:0 24px 12px;box-shadow:0 10px 30px rgba(31,43,36,.14);overflow:hidden}
        .ln .drop a{display:block;padding:16px 22px;cursor:pointer;border-top:1px solid ${LIN2};font-weight:600;font-size:13px;letter-spacing:.14em;text-transform:uppercase}.ln .drop a:first-child{border:0}
        .ln .hero{position:relative;border-radius:14px;overflow:hidden;min-height:560px;margin-top:6px;background:
          linear-gradient(90deg,rgba(255,255,255,.0) 0,rgba(255,255,255,.55) 9%,rgba(0,0,0,.05) 15%,rgba(255,255,255,.35) 24%,rgba(0,0,0,.06) 33%,rgba(255,255,255,.5) 44%,rgba(0,0,0,.05) 52%,rgba(255,255,255,.4) 63%,rgba(0,0,0,.07) 72%,rgba(255,255,255,.5) 83%,rgba(0,0,0,.05) 92%,rgba(255,255,255,.2) 100%),
          linear-gradient(180deg,#e8e1d3 0%,#d9d0bf 70%,#cfc5b2 100%)}
        .ln .hero::after{display:none;content:"";position:absolute;inset:0;background:radial-gradient(ellipse 60% 70% at 78% 30%,rgba(255,255,255,.55),transparent 70%);pointer-events:none}
        .ln .hero .fig{z-index:1;position:absolute;right:5%;bottom:0;width:min(38%,400px)}
        .ln .hero .in{position:relative;padding:110px 7% 0;max-width:640px}
        .ln .hero h1{font-size:clamp(34px,4.6vw,56px);line-height:1.12;color:${FOR};margin:0}
        .ln .btn{display:inline-block;background:${FOR};color:#fff;text-decoration:none;font-weight:700;font-size:13px;letter-spacing:.14em;text-transform:uppercase;padding:18px 32px;border-radius:5px;border:0;cursor:pointer}
        .ln .btn:hover{background:#243a2e}
        .ln .btn.lt{background:rgba(255,255,255,.92);color:${FOR}}
        .ln .hero .btn{margin-top:30px}
        .ln .hero .bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:100% 30%;z-index:0}
        .ln .hero::before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(20,30,24,.45),rgba(20,30,24,.1) 60%);z-index:1}
        .ln .hero .in{z-index:2;max-width:500px;padding-right:0}.ln .hero h1{font-size:clamp(30px,3.7vw,46px)}.ln .hero .btn{white-space:nowrap}.ln .hero h1{color:#fff;text-wrap:balance}
        .ln .pose{border-radius:14px;overflow:hidden;position:relative}.ln .pose img{width:100%;height:auto;display:block}
        .ln .trio .c{position:relative;overflow:hidden}.ln .trio .c>*{position:relative;z-index:1}.ln .trio .cbg{position:absolute!important;inset:0;width:100%;height:100%;object-fit:cover;z-index:0!important}
        .ln .c2:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(20,30,24,.75),rgba(20,30,24,.15) 50%,rgba(20,30,24,.55));z-index:0}
        .ln .about{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;padding:96px 0 80px}
        .ln .eyebrow{font-size:13px;font-weight:700;letter-spacing:.26em;text-transform:uppercase;color:${FOR}}
        .ln .about h2{font-size:clamp(28px,3.4vw,40px);line-height:1.3;margin:22px 0 28px;color:${INK}}
        .ln .about h2 b{font-weight:600!important}
        .ln .arch{background:${LIN2};border-radius:200px 200px 14px 14px;padding:54px 30px 26px;position:relative}
        .ln .arch .st{display:none}
        .ln .trio{display:grid;grid-template-columns:repeat(3,1fr);min-height:340px}
        .ln .trio .c{padding:30px 28px;display:flex;flex-direction:column;justify-content:space-between;color:#fff;min-height:340px}
        .ln .trio h3{font-size:36px;margin:14px 0 10px}
        .ln .trio p{margin:0;font-size:18px;line-height:1.5;max-width:320px;color:#fff;font-weight:500}
        .ln .c1{background:${FOR}}.ln .c2{background:${SAGE2}}.ln .c3{background:${SAGE}}.ln .c3 p,.ln .c3 h3{color:#13201a}.ln .c3{background:#a9b6a8}
        .ln .ghost{align-self:flex-start;background:#fff;color:${FOR};font-weight:600;font-size:11px;letter-spacing:.14em;text-transform:uppercase;padding:11px 16px;border-radius:4px;cursor:pointer;border:0}
        .ln .book{display:grid;grid-template-columns:1.05fr .95fr;gap:60px;align-items:center;padding:100px 0 80px}
        .ln .book h2{font-size:clamp(30px,3.8vw,46px);line-height:1.2;margin:0}
        .ln .book h2 em{font-style:italic}
        .ln .book p.l{font-size:17px;line-height:1.65;color:${MU};margin:18px 0 0;max-width:500px;padding-right:0}.ln .hero h1{font-size:clamp(30px,3.7vw,46px)}.ln .hero .btn{white-space:nowrap}
        .ln .card{background:#fff;border-radius:14px;padding:30px;box-shadow:0 14px 40px rgba(31,43,36,.1)}
        .ln .card h4{font-size:12px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:${MU};margin:0 0 14px}
        .ln .chips{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:22px}
        .ln .chip{border:1.5px solid ${FOR};background:#fff;color:${FOR};border-radius:999px;padding:10px 18px;font-weight:600;font-size:14px;cursor:pointer}
        .ln .chip.on{background:${FOR};color:#fff}
        .ln .md{font-size:15px;line-height:1.55;color:${MU};margin:-8px 0 22px;min-height:46px}
        .ln .row2{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:22px}
        .ln select{width:100%;height:50px;border:1.5px solid ${LIN2};background:${LIN};border-radius:8px;padding:0 12px;font-size:15px;color:${INK}}
        .ln .card .btn{width:100%;text-align:center}
        .ln .info{display:grid;grid-template-columns:repeat(3,1fr);gap:0;padding:0 0 30px}
        .ln .info div{padding:0 26px;border-left:1.5px solid ${SAGE}}
        .ln .info b{display:block;font-size:12px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:${SAGE2};margin-bottom:8px}
        .ln .info span{font-size:16px;line-height:1.6}
        .ln footer{background:${FOR};color:#e6ece6;padding:44px 0;margin-top:40px}
        .ln footer .fr{display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap;font-size:14px}
        .ln footer .logo{color:#fff}
        .ln footer nav{display:flex;gap:24px}.ln footer a{cursor:pointer;font-size:12px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#fff}
        .ln .wa{position:fixed;right:20px;bottom:20px;width:58px;height:58px;border-radius:50%;background:#25d366;display:grid;place-items:center;box-shadow:0 8px 22px rgba(0,0,0,.28);z-index:20}
        @media(max-width:820px){
          .ln .wrap{padding:0 14px}.ln .bar{grid-template-columns:1fr auto}.ln .bar .pill{display:none}.ln .logo{padding-left:0}.ln .bar .sm,.ln .dl{display:none}.ln .burger{display:block}
          .ln .hero{min-height:0}.ln .hero .in{padding:60px 24px 28px}.ln .hero{min-height:460px}
          .ln .about,.ln .book{grid-template-columns:1fr;gap:34px;padding:60px 0 50px}
          .ln .trio{grid-template-columns:1fr}.ln .trio .c{min-height:220px}
          .ln .info{grid-template-columns:1fr;gap:22px}
          .ln footer .fr{justify-content:center;text-align:center}
        }
      `}</style>

      <div className="wrap">
        <header className="bar">
          <div className="pill"><button className="tag" onClick={() => go("agendar")}>Aula experimental</button><span className="sm" onClick={() => go("modalidades")}>Aulas</span></div>
          <div className="logo">{brand.replace(/^Estúdio\s+/i, "Estúdio ")}</div>
          <div className="dl"><a onClick={() => go("sobre")}>Sobre</a><a onClick={() => go("agendar")}>Agendar</a><a onClick={() => go("contato")}>Contato</a></div><button className="burger" onClick={() => setMenu((v) => !v)} aria-label="Menu">{menu ? "×" : "≡"}</button>
        </header>
        {menu && <div className="drop"><a onClick={() => go("sobre")}>Sobre</a><a onClick={() => go("modalidades")}>Modalidades</a><a onClick={() => go("agendar")}>Agendar</a><a onClick={() => go("contato")}>Contato</a></div>}

        <section className="hero" id="top">
          <div className="in">
            <h1>Esculpa o corpo e acalme a mente para ser a melhor versão de você.</h1>
            <button className="btn lt" onClick={() => go("agendar")}>Agende sua aula experimental</button>
          </div>
          <img className="bg" src="/linho-hero.webp" alt="Mulher em pé sobre o colchonete diante de cortinas brancas" />
        </section>
      </div>

      <div className="wrap" id="sobre">
        <div className="about">
          <div>
            <span className="eyebrow">Mover · Esculpir · Tonificar</span>
            <h2>Movimento para <b>cada corpo</b> e para cada <b>estilo de vida</b>, criado pela Helena Prado.</h2>
            <a className="btn" href={baseNote} target="_blank" rel="noreferrer">Conhecer o estúdio</a>
          </div>
          <div className="pose"><img src="/linho-pose.webp" alt="Mulher fazendo alongamento de perna no colchonete" /></div>
        </div>
      </div>

      <section className="trio" id="modalidades">
        <div className="c c1"><div><Arcs /><h3>Reformer</h3><p>Aparelho com molas e turmas de até cinco pessoas.</p></div><button className="ghost" onClick={() => { setMod(0); go("agendar"); }}>Marcar aula →</button></div>
        <div className="c c2"><img className="cbg" src="/linho-card.webp" alt="Mulher ajoelhada no colchonete" /><div><Arcs /><h3>Mat</h3><p>Solo, bola e faixa. Fundamentos para qualquer idade.</p></div><button className="ghost" onClick={() => { setMod(1); go("agendar"); }}>Marcar aula →</button></div>
        <div className="c c3"><div><Arcs /><h3>Barre</h3><p>Postura, pés e coxas em ritmo contínuo, com música.</p></div><button className="ghost" onClick={() => { setMod(2); go("agendar"); }}>Marcar aula →</button></div>
      </section>

      <div className="wrap" id="agendar">
        <div className="book">
          <div>
            <h2>Venha <em>mover</em> com a gente, a primeira aula é por nossa conta.</h2>
            <p className="l">Escolha a modalidade, o dia e o horário. A Helena confirma pelo WhatsApp e separa seu aparelho.</p>
          </div>
          <div className="card">
            <h4>Modalidade</h4>
            <div className="chips">{MODS.map((m, i) => <button key={m.t} className={`chip${mod === i ? " on" : ""}`} onClick={() => setMod(i)}>{m.t}</button>)}</div>
            <p className="md">{MODS[mod]?.d}</p>
            <div className="row2">
              <div><h4>Dia</h4><select value={day} onChange={(e) => setDay(Number(e.target.value))} aria-label="Dia">{days.map((d, i) => <option key={d.label} value={i}>{d.label}</option>)}</select></div>
              <div><h4>Horário</h4><select value={hora} onChange={(e) => setHora(e.target.value)} aria-label="Horário">{HORAS.map((h) => <option key={h}>{h}</option>)}</select></div>
            </div>
            <a className="btn" href={wa} target="_blank" rel="noreferrer">Marcar no WhatsApp</a>
          </div>
        </div>
      </div>

      <div className="wrap" id="contato">
        <div className="info">
          <div><b>Endereço</b><span>Rua Bocaiúva, 1.210<br />Centro, {city}</span></div>
          <div><b>Horário</b><span>Seg a sex, 6h30 às 20h30<br />Sáb, 8h às 12h</span></div>
          <div><b>Contato</b><span>WhatsApp e Instagram<br />Aula experimental gratuita</span></div>
        </div>
      </div>

      <footer>
        <div className="wrap fr">
          <div className="logo">{brand}</div>
          <nav><a onClick={() => go("sobre")}>Sobre</a><a onClick={() => go("modalidades")}>Aulas</a><a onClick={() => go("agendar")}>Agendar</a></nav>
          <span>© {new Date().getFullYear()} {brand}. Todos os direitos reservados.</span>
        </div>
      </footer>

      {sc && <a className="wa" href={base} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg></a>}
    </div>
  );
}
