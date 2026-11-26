import { useEffect, useState } from "react";

/** Estudio de pilates novo, construido do zero a partir de um pin de site em verde sálvia e linho ("Lex Fish"): hero em cartao arredondado com cortina de linho, trio de paineis verdes, serifa leve. Sem foto: as figuras sao tracos desenhados em SVG. Aula experimental que fecha no WhatsApp. */
const FOR = "#2f4a3c", SAGE = "#9aa89a", SAGE2 = "#7f907f", LIN = "#f1eee7", LIN2 = "#e6e1d6", INK = "#1f2b24", MU = "#55625a";
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

/** Figuras em traco com membros afinando: teaser (corpo em V) e alongamento lateral. */
function Limb({ d, w, c = FOR }: { d: string; w: number; c?: string }) {
  return <path d={d} fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />;
}
function Teaser() {
  return (
    <svg viewBox="0 0 420 300" role="img" aria-label="Desenho de uma pessoa fazendo teaser no colchonete" style={{ width: "100%", height: "auto", display: "block" }}>
      <ellipse cx="210" cy="266" rx="190" ry="12" fill={FOR} opacity=".2" />
      <rect x="24" y="248" width="372" height="14" rx="7" fill={FOR} />
      <Limb d="M214 236 Q300 206 372 120" w={20} />
      <Limb d="M368 126 L394 104" w={11} />
      <Limb d="M214 238 Q150 222 122 136" w={36} />
      <Limb d="M146 150 Q238 146 330 112" w={11} c={SAGE2} />
      <circle cx="116" cy="98" r="23" fill={FOR} />
    </svg>
  );
}
function Stretch() {
  return (
    <svg viewBox="0 0 300 270" role="img" aria-label="Desenho de uma pessoa em alongamento lateral" style={{ width: "100%", height: "auto", display: "block" }}>
      <rect x="24" y="238" width="252" height="14" rx="7" fill={FOR} />
      <Limb d="M150 150 L104 234" w={17} />
      <Limb d="M150 150 L198 234" w={17} />
      <Limb d="M150 156 Q146 112 176 76" w={38} />
      <Limb d="M176 76 Q150 40 112 30" w={11} c={SAGE2} />
      <Limb d="M160 100 Q196 118 190 150" w={10} c={SAGE2} />
      <circle cx="194" cy="50" r="21" fill={FOR} />
    </svg>
  );
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
        .ln .burger{justify-self:end;background:none;border:0;cursor:pointer;color:${FOR};font-size:26px}
        .ln .drop{background:#fff;border-radius:10px;margin:0 24px 12px;box-shadow:0 10px 30px rgba(31,43,36,.14);overflow:hidden}
        .ln .drop a{display:block;padding:16px 22px;cursor:pointer;border-top:1px solid ${LIN2};font-weight:600;font-size:13px;letter-spacing:.14em;text-transform:uppercase}.ln .drop a:first-child{border:0}
        .ln .hero{position:relative;border-radius:14px;overflow:hidden;min-height:560px;margin-top:6px;background:
          linear-gradient(90deg,rgba(255,255,255,.0) 0,rgba(255,255,255,.55) 9%,rgba(0,0,0,.05) 15%,rgba(255,255,255,.35) 24%,rgba(0,0,0,.06) 33%,rgba(255,255,255,.5) 44%,rgba(0,0,0,.05) 52%,rgba(255,255,255,.4) 63%,rgba(0,0,0,.07) 72%,rgba(255,255,255,.5) 83%,rgba(0,0,0,.05) 92%,rgba(255,255,255,.2) 100%),
          linear-gradient(180deg,#e8e1d3 0%,#d9d0bf 70%,#cfc5b2 100%)}
        .ln .hero .fig{position:absolute;right:5%;bottom:0;width:min(46%,470px)}
        .ln .hero .in{position:relative;padding:110px 7% 0;max-width:640px}
        .ln .hero h1{font-size:clamp(34px,4.6vw,56px);line-height:1.12;color:${FOR};margin:0}
        .ln .btn{display:inline-block;background:${FOR};color:#fff;text-decoration:none;font-weight:600;font-size:12px;letter-spacing:.16em;text-transform:uppercase;padding:15px 28px;border-radius:5px;border:0;cursor:pointer}
        .ln .btn:hover{background:#243a2e}
        .ln .btn.lt{background:rgba(255,255,255,.92);color:${FOR}}
        .ln .hero .btn{margin-top:30px}
        .ln .about{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;padding:96px 0 80px}
        .ln .eyebrow{font-size:12px;font-weight:600;letter-spacing:.3em;text-transform:uppercase;color:${MU}}
        .ln .about h2{font-size:clamp(28px,3.4vw,40px);line-height:1.3;margin:22px 0 28px;color:${INK}}
        .ln .about h2 b{font-weight:600!important}
        .ln .arch{background:${LIN2};border-radius:200px 200px 14px 14px;padding:54px 30px 26px;position:relative}
        .ln .arch .st{position:absolute;top:-6px;right:10px;color:${SAGE2};font-size:20px}
        .ln .trio{display:grid;grid-template-columns:repeat(3,1fr);min-height:340px}
        .ln .trio .c{padding:30px 28px;display:flex;flex-direction:column;justify-content:space-between;color:#fff;min-height:340px}
        .ln .trio h3{font-size:30px;margin:0 0 10px}
        .ln .trio p{margin:0;font-size:16px;line-height:1.5;max-width:300px;color:rgba(255,255,255,.95);font-weight:500}
        .ln .c1{background:${FOR}}.ln .c2{background:${SAGE2}}.ln .c3{background:${SAGE}}.ln .c3 p,.ln .c3 h3{color:${INK}}
        .ln .ghost{align-self:flex-start;background:#fff;color:${FOR};font-weight:600;font-size:11px;letter-spacing:.14em;text-transform:uppercase;padding:11px 16px;border-radius:4px;cursor:pointer;border:0}
        .ln .book{display:grid;grid-template-columns:1.05fr .95fr;gap:60px;align-items:center;padding:100px 0 80px}
        .ln .book h2{font-size:clamp(30px,3.8vw,46px);line-height:1.2;margin:0}
        .ln .book h2 em{font-style:italic}
        .ln .book p.l{font-size:17px;line-height:1.65;color:${MU};margin:18px 0 0;max-width:430px}
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
          .ln .wrap{padding:0 14px}.ln .bar .sm{display:none}
          .ln .hero{min-height:620px}.ln .hero .in{padding:60px 24px 0}.ln .hero .fig{width:86%;right:7%}
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
          <button className="burger" onClick={() => setMenu((v) => !v)} aria-label="Menu">{menu ? "×" : "≡"}</button>
        </header>
        {menu && <div className="drop"><a onClick={() => go("sobre")}>Sobre</a><a onClick={() => go("modalidades")}>Modalidades</a><a onClick={() => go("agendar")}>Agendar</a><a onClick={() => go("contato")}>Contato</a></div>}

        <section className="hero" id="top">
          <div className="in">
            <h1>Esculpa o corpo e acalme a mente para ser a melhor versão de você.</h1>
            <button className="btn lt" onClick={() => go("agendar")}>Agende sua aula experimental</button>
          </div>
          <div className="fig"><Teaser /></div>
        </section>
      </div>

      <div className="wrap" id="sobre">
        <div className="about">
          <div>
            <span className="eyebrow">Mover · Esculpir · Tonificar</span>
            <h2>Movimento para <b>cada corpo</b> e para cada <b>estilo de vida</b>, criado pela Helena Prado.</h2>
            <a className="btn" href={baseNote} target="_blank" rel="noreferrer">Conhecer o estúdio</a>
          </div>
          <div className="arch"><span className="st">✦</span><Stretch /></div>
        </div>
      </div>

      <section className="trio" id="modalidades">
        <div className="c c1"><div><h3>Reformer</h3><p>Aparelho com molas e turmas de até cinco pessoas.</p></div><button className="ghost" onClick={() => { setMod(0); go("agendar"); }}>Marcar aula →</button></div>
        <div className="c c2"><div><h3>Mat</h3><p>Solo, bola e faixa. Fundamentos para qualquer idade.</p></div><button className="ghost" onClick={() => { setMod(1); go("agendar"); }}>Marcar aula →</button></div>
        <div className="c c3"><div><h3>Barre</h3><p>Postura, pés e coxas em ritmo contínuo, com música.</p></div><button className="ghost" onClick={() => { setMod(2); go("agendar"); }}>Marcar aula →</button></div>
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

      {sc && <a className="wa" href={base} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 32 32" fill="#fff"><path d="M16 3a13 13 0 0 0-11 19.800L3 29l6.400-1.900A13 13 0 1 0 16 3zm0 2.400a10.600 10.600 0 1 1-5.400 19.700l-.4-.2-3.800 1.100 1.100-3.700-.3-.4A10.600 10.600 0 0 1 16 5.400zm-4 5.300c-.3 0-.7.100-1 .5-.4.400-1.300 1.300-1.300 3.100s1.300 3.600 1.500 3.900c.2.200 2.600 4.100 6.400 5.600 3.200 1.200 3.800 1 4.500.9.700-.1 2.200-.9 2.500-1.800.3-.9.300-1.600.2-1.800-.1-.2-.3-.3-.7-.5l-2.300-1.100c-.3-.1-.5-.2-.8.200l-1 1.200c-.2.300-.4.300-.8.100-.4-.2-1.500-.6-2.900-1.800-1.100-1-1.800-2.200-2-2.500-.2-.4 0-.6.200-.8l.6-.7c.2-.2.200-.4.400-.6.100-.3.100-.5 0-.7l-1-2.400c-.3-.6-.5-.5-.8-.5z" /></svg></a>}
    </div>
  );
}
