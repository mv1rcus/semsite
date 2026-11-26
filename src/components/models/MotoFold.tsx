import { useEffect, useState } from "react";

/** Oficina de motos classicas, construida do zero a partir de um pin de site coral e branco ("Vintage Moto"): titulo gigante em capitulares, moto recortada cruzando a divisa entre o bloco coral e o branco. Sem foto: a moto e um desenho SVG proprio. Agendamento de revisao que fecha no WhatsApp. */
const INK = "#161413", CO = "#e4514d", CO2 = "#c93e3a", BG = "#ffffff", SOFT = "#fdeceb", MU = "#6b6361";
const SERV = [
  { t: "Revisão completa", d: "Óleo, velas, folgas de válvula, corrente, cabos, freios e uma lista escrita de tudo que foi visto, moto por moto.", p: "a partir de R$ 380" },
  { t: "Motor e câmbio", d: "Abertura, retífica e remontagem de motores boxer, monocilíndricos e dois tempos, com peças medidas e originais quando existem.", p: "sob orçamento" },
  { t: "Elétrica e ignição", d: "Chicote refeito, platinado para ignição eletrônica, carga e bateria. A moto de 1970 pega de primeira de novo.", p: "a partir de R$ 220" },
  { t: "Freios e suspensão", d: "Garfo, amortecedores, cubos e raios. Raios retensionados um por um, roda alinhada no gabarito.", p: "a partir de R$ 290" },
  { t: "Restauração", d: "Da lataria ao banco, com pintura, cromo e registro fotográfico de cada etapa para você acompanhar.", p: "sob orçamento" },
];
const TURNOS = ["Manhã", "Tarde"];
const DOW = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
function nextDays() {
  const out: { label: string }[] = [];
  const t = new Date();
  for (let i = 1; out.length < 7; i++) {
    const x = new Date(t.getFullYear(), t.getMonth(), t.getDate() + i);
    if (x.getDay() === 0) continue;
    out.push({ label: `${DOW[x.getDay()] ?? ""}, ${String(x.getDate()).padStart(2, "0")}/${String(x.getMonth() + 1).padStart(2, "0")}` });
  }
  return out;
}

function Wheel({ cx, cy }: { cx: number; cy: number }) {
  const spokes = Array.from({ length: 32 }, (_, i) => {
    const a = (i / 32) * Math.PI * 2, r1 = 12, r2 = 62;
    const off = i % 2 ? 0.14 : -0.14;
    return <line key={i} x1={cx + Math.cos(a + off) * r1} y1={cy + Math.sin(a + off) * r1} x2={cx + Math.cos(a) * r2} y2={cy + Math.sin(a) * r2} stroke="#8d8d8d" strokeWidth="1.1" />;
  });
  return (
    <g>
      <circle cx={cx} cy={cy} r={74} fill="none" stroke="#141414" strokeWidth="13" />
      <circle cx={cx} cy={cy} r={64} fill="none" stroke="#d6d6d6" strokeWidth="3" />
      {spokes}
      <circle cx={cx} cy={cy} r={17} fill="#bdbdbd" stroke="#2a2a2a" strokeWidth="4" />
      <circle cx={cx} cy={cy} r={6} fill="#2a2a2a" />
    </g>
  );
}

function Moto() {
  return (
    <svg viewBox="0 0 640 320" role="img" aria-label="Moto clássica boxer, desenho" style={{ width: "100%", height: "auto", display: "block" }}>
      <ellipse cx="320" cy="288" rx="270" ry="10" fill="rgba(0,0,0,.28)" />
      <Wheel cx={140} cy={210} />
      <Wheel cx={500} cy={210} />
      {/* paralamas */}
      <path d="M62 190 Q140 118 218 176 L214 186 Q140 134 70 200Z" fill="#161413" />
      <path d="M432 170 Q500 118 574 192 L566 200 Q500 140 438 182Z" fill="#161413" />
      {/* garfo e guidao */}
      <path d="M500 210 L452 104" stroke="#c9c9c9" strokeWidth="9" strokeLinecap="round" />
      <path d="M512 206 L462 100" stroke="#8d8d8d" strokeWidth="5" strokeLinecap="round" />
      <path d="M440 98 L412 84 Q404 80 396 86" stroke="#161413" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M396 86 L378 88" stroke="#161413" strokeWidth="11" strokeLinecap="round" />
      {/* farol */}
      <ellipse cx="474" cy="92" rx="22" ry="24" fill="#161413" />
      <ellipse cx="482" cy="92" rx="14" ry="17" fill="#f2f2f2" stroke="#8d8d8d" strokeWidth="2" />
      {/* quadro */}
      <path d="M140 210 L236 138 L418 130 L452 104" stroke="#161413" strokeWidth="9" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M140 210 L300 214 L430 188" stroke="#161413" strokeWidth="9" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M236 138 L300 214" stroke="#161413" strokeWidth="7" fill="none" />
      {/* motor boxer: carter, caixa de cambio e cabecote do cilindro visto de lado */}
      <path d="M262 196 Q262 178 290 178 L392 178 Q420 178 420 200 L420 236 Q420 246 408 246 L274 246 Q262 246 262 236Z" fill="#a9a9a9" stroke="#161413" strokeWidth="4" />
      <path d="M392 190 L432 196 L432 232 L392 238Z" fill="#8f8f8f" stroke="#161413" strokeWidth="4" />
      <circle cx="322" cy="214" r="34" fill="#c4c4c4" stroke="#161413" strokeWidth="5" />
      {[0, 1, 2, 3, 4].map((i) => <circle key={i} cx="322" cy="214" r={30 - i * 5.5} fill="none" stroke="#161413" strokeWidth="2.2" />)}
      <circle cx="322" cy="214" r="6" fill="#161413" />
      <rect x="300" y="236" width="44" height="12" rx="4" fill="#161413" />
      {/* tanque e banco */}
      <path d="M232 132 Q250 78 330 80 L420 90 Q440 100 428 122 Q400 142 340 142 L242 148Z" fill="#161413" />
      <path d="M262 100 Q300 90 350 96" stroke="#e4514d" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M150 154 Q168 130 232 138 L240 160 Q190 168 150 164Z" fill="#161413" />
      <path d="M172 143 Q196 136 224 140" stroke="#4a4644" strokeWidth="3" fill="none" />
      {/* escape */}
      <path d="M286 232 Q230 252 172 238 L90 236" stroke="#d6d6d6" strokeWidth="11" fill="none" strokeLinecap="round" />
      <path d="M286 232 Q230 252 172 238 L90 236" stroke="#161413" strokeWidth="2" fill="none" />
      <path d="M404 236 Q448 250 486 232" stroke="#d6d6d6" strokeWidth="9" fill="none" strokeLinecap="round" />
      <rect x="82" y="228" width="26" height="14" rx="5" fill="#9b9b9b" stroke="#161413" strokeWidth="3" />
      {/* lanterna traseira */}
      <circle cx="82" cy="172" r="5" fill={CO} />
    </svg>
  );
}

function MotoFront() {
  return (
    <svg viewBox="0 0 260 360" role="img" aria-label="Moto clássica vista de frente, desenho" style={{ width: "100%", height: "auto", display: "block" }}>
      <ellipse cx="130" cy="338" rx="70" ry="9" fill="rgba(0,0,0,.25)" />
      <rect x="116" y="196" width="28" height="138" rx="14" fill="#161413" />
      {Array.from({ length: 10 }, (_, i) => <line key={i} x1={118} y1={206 + i * 12} x2={142} y2={206 + i * 12} stroke="#4a4644" strokeWidth="2" />)}
      <path d="M130 180 L130 120" stroke="#c9c9c9" strokeWidth="14" strokeLinecap="round" />
      <path d="M20 96 L240 96" stroke="#161413" strokeWidth="8" strokeLinecap="round" />
      <rect x="6" y="88" width="30" height="16" rx="7" fill="#161413" />
      <rect x="224" y="88" width="30" height="16" rx="7" fill="#161413" />
      <ellipse cx="130" cy="108" rx="34" ry="36" fill="#161413" />
      <ellipse cx="130" cy="108" rx="24" ry="26" fill="#f2f2f2" stroke="#8d8d8d" strokeWidth="3" />
      <ellipse cx="62" cy="262" rx="44" ry="30" fill="#a5a5a5" stroke="#161413" strokeWidth="5" />
      <ellipse cx="198" cy="262" rx="44" ry="30" fill="#a5a5a5" stroke="#161413" strokeWidth="5" />
      {[0, 1, 2, 3, 4, 5].map((i) => <line key={i} x1={32 + i * 12} y1={236} x2={32 + i * 12} y2={288} stroke="#161413" strokeWidth="2" />)}
      {[0, 1, 2, 3, 4, 5].map((i) => <line key={i} x1={168 + i * 12} y1={236} x2={168 + i * 12} y2={288} stroke="#161413" strokeWidth="2" />)}
      <rect x="104" y="150" width="52" height="86" rx="20" fill="#161413" />
      <path d="M118 158 Q130 150 142 158" stroke="#f4625f" strokeWidth="5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function MotoFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Garagem 74";
  const city = client?.city?.trim() || "Belo Horizonte";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [open, setOpen] = useState(0);
  const [svc, setSvc] = useState(0);
  const [moto, setMoto] = useState("");
  const [day, setDay] = useState(0);
  const [turno, setTurno] = useState(0);
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  const [days] = useState(nextDays);
  useEffect(() => { const f = () => setSc(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero agendar na ${brand}: ${SERV[svc]?.t.toLowerCase()}${moto.trim() ? ` para a minha ${moto.trim()}` : ""}, ${days[day]?.label ?? ""}, ${(TURNOS[turno] ?? "").split(" ")[0]?.toLowerCase()}.`)}`;
  const base = `https://wa.me/${num}`;

  return (
    <div className="mt" style={{ fontFamily: "Jost, system-ui, sans-serif", color: INK, background: BG, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&display=swap');
        .mt *{box-sizing:border-box}.mt a,.mt button,.mt select,.mt input{font-family:inherit}
        .mt .wrap{max-width:1160px;margin:0 auto;padding:0 28px}
        .mt .top{background:${CO};position:relative}
        .mt .nav{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;height:78px}
        .mt .logo{font-weight:700;font-size:22px;letter-spacing:.04em;color:#fff;text-transform:uppercase}
        .mt .links{display:flex;gap:34px}
        .mt .links a{cursor:pointer;color:#fff;font-size:14px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;padding:6px 0;border-bottom:2px solid transparent}
        .mt .links a:hover{border-color:#fff}
        .mt .navcta{justify-self:end;background:#fff;color:${CO2};font-weight:700;font-size:13px;letter-spacing:.12em;text-transform:uppercase;padding:12px 22px;text-decoration:none}
        .mt .burger{display:none;justify-self:end;background:none;border:0;color:#fff;font-size:28px;cursor:pointer}
        .mt .big{font-weight:600;color:#fff;text-align:center;font-size:clamp(54px,11.5vw,148px);line-height:.95;letter-spacing:-.01em;margin:18px 0 0}
        .mt .big .c{font-size:1.16em}
        .mt .big .s{font-size:.82em;text-transform:uppercase}
        .mt .sub{text-align:center;color:#fff;font-size:17px;letter-spacing:.16em;text-transform:uppercase;font-weight:600;margin-top:14px;padding-bottom:34px}
        .mt .stage{position:relative;margin-top:-30px}
        .mt .stage .half{position:absolute;left:0;right:0;bottom:0;height:40%;background:#fff}
        .mt .stage .m{position:relative;max-width:1020px;margin:0 auto;padding:0 20px}
        .mt .cta{display:inline-flex;align-items:center;gap:10px;background:${INK};color:#fff;text-decoration:none;font-weight:600;font-size:14px;letter-spacing:.12em;text-transform:uppercase;padding:16px 30px;border:0;cursor:pointer}
        .mt .cta:hover{background:${CO2}}
        .mt .strip{display:flex;justify-content:center;gap:56px;flex-wrap:wrap;padding:34px 20px 8px;text-align:center}
        .mt .strip b{display:block;font-size:30px;font-weight:600}.mt .strip span{font-size:14px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:#4a4543}
        .mt h2{font-weight:600;font-size:clamp(34px,4.4vw,52px);letter-spacing:.01em;margin:0;line-height:1.05}
        .mt h2 .c{font-size:1.18em}
        .mt .story{padding:96px 0 40px;display:grid;grid-template-columns:1fr 340px;gap:70px;align-items:center;max-width:900px;margin:0 auto}
        .mt .story p{font-size:19px;font-weight:500;line-height:1.7;margin:20px 0 0;color:#2b2625}
        .mt .link{display:inline-block;margin-top:24px;font-weight:700;font-size:14px;letter-spacing:.16em;text-transform:uppercase;border-bottom:2px solid ${CO};padding-bottom:4px;color:${INK};text-decoration:none;cursor:pointer}
        .mt .serv{padding:84px 0 40px}
        .mt .row{border-top:2px solid ${INK};cursor:pointer}
        .mt .row:last-child{border-bottom:2px solid ${INK}}
        .mt .rh{display:grid;grid-template-columns:70px 1fr auto 44px;gap:18px;align-items:center;padding:26px 0}
        .mt .rh .n{font-size:15px;font-weight:600;color:${CO2};letter-spacing:.1em}
        .mt .rh .t{font-size:clamp(24px,3vw,34px);font-weight:600}
        .mt .rh .p{font-size:14px;color:${MU};letter-spacing:.06em}
        .mt .rh .pl{width:34px;height:34px;border:2px solid ${INK};border-radius:50%;display:grid;place-items:center;font-size:22px;line-height:1;transition:.2s}
        .mt .row.on .pl{background:${INK};border-color:${INK};color:#fff}
        .mt .rb{display:grid;grid-template-rows:0fr;transition:grid-template-rows .3s}
        .mt .row.on .rb{grid-template-rows:1fr}
        .mt .rb>div{overflow:hidden}.mt .rb p{margin:0 0 28px 88px;max-width:620px;font-size:17px;line-height:1.65;color:#2b2625}
        .mt .book{background:${CO};margin-top:90px;padding:90px 0 100px;color:#fff;position:relative}
        .mt .book h2{color:#fff;text-align:center;font-size:clamp(40px,6vw,76px)}
        .mt .book .lead{text-align:center;font-size:18px;margin:14px auto 0;max-width:520px}
        .mt .form{max-width:900px;margin:44px auto 0;background:#fff;color:${INK};padding:34px;display:grid;grid-template-columns:repeat(2,1fr);gap:22px}
        .mt .form label{font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:${MU};display:block;margin-bottom:8px}
        .mt .form select,.mt .form input{width:100%;height:52px;border:2px solid ${INK};background:#fff;padding:0 14px;font-size:16px;color:${INK};border-radius:0}
        .mt .form select:focus,.mt .form input:focus{outline:3px solid ${SOFT};border-color:${CO2}}
        .mt .chips{grid-column:span 2;display:flex;flex-wrap:wrap;gap:10px}
        .mt .chip{border:2px solid ${INK};background:#fff;padding:11px 18px;font-size:14px;font-weight:600;cursor:pointer;color:${INK}}
        .mt .chip.on{background:${INK};color:#fff}
        .mt .form .go{grid-column:span 2;justify-content:center;white-space:nowrap}
        .mt .unit{display:grid;grid-template-columns:repeat(3,1fr);gap:0;max-width:900px;margin:0 auto;padding:74px 0 20px;text-align:left}
        .mt .unit div{padding:0 26px;border-left:2px solid ${CO}}
        .mt .unit b{display:block;font-size:14px;letter-spacing:.16em;text-transform:uppercase;color:${CO2};margin-bottom:8px}
        .mt .unit span{font-size:17px;line-height:1.6}
        .mt footer{background:${INK};color:#fff;margin-top:80px;padding:44px 0;font-size:14px}
        .mt footer .fr{display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap}
        .mt footer nav{display:flex;gap:26px}.mt footer a{cursor:pointer;color:#fff;text-transform:uppercase;letter-spacing:.12em;font-size:12px;font-weight:600}
        .mt footer span{color:#cfc8c6}
        .mt .wa{position:fixed;right:20px;bottom:20px;width:58px;height:58px;border-radius:50%;background:#25d366;display:grid;place-items:center;box-shadow:0 8px 22px rgba(0,0,0,.3);z-index:20}
        .mt .mob{display:none}
        @media(max-width:860px){
          .mt .wrap{padding:0 20px}
          .mt .nav{grid-template-columns:1fr auto;height:68px}.mt .links,.mt .navcta{display:none}.mt .burger{display:block}
          .mt .mob{display:block;background:#fff;margin:0 16px 14px;box-shadow:0 8px 24px rgba(0,0,0,.2);position:relative;z-index:6}.mt .mob a{display:block;padding:15px 20px;cursor:pointer;border-top:1px solid #f1e3e2;font-weight:600;letter-spacing:.1em;text-transform:uppercase;font-size:13px}.mt .mob a:first-child{border:0}
          .mt .story{grid-template-columns:1fr;gap:30px;padding-top:60px}.mt .story .fr{max-width:220px;margin:0 auto}
          .mt .rh{grid-template-columns:34px 1fr 38px;gap:12px}.mt .rh .p{display:none}.mt .rb p{margin-left:46px}
          .mt .form{grid-template-columns:1fr;padding:24px 20px}.mt .chips,.mt .form .go{grid-column:span 1}.mt .form .go{justify-self:stretch;padding:16px 12px}
          .mt .unit{grid-template-columns:1fr;gap:26px}
          .mt .strip{gap:28px}
          .mt footer .fr{justify-content:center;text-align:center}
        }
      `}</style>

      <div className="top" id="top">
        <header className="wrap nav">
          <div className="logo">{brand}</div>
          <nav className="links"><a onClick={() => go("servicos")}>Serviços</a><a onClick={() => go("historia")}>Nossa história</a><a onClick={() => go("agendar")}>Agendar</a><a onClick={() => go("unidade")}>Oficina</a></nav>
          <a className="navcta" href={base} target="_blank" rel="noreferrer">WhatsApp</a>
          <button className="burger" onClick={() => setMenu((v) => !v)} aria-label="Menu">{menu ? "×" : "≡"}</button>
        </header>
        {menu && <div className="mob"><a onClick={() => go("servicos")}>Serviços</a><a onClick={() => go("historia")}>Nossa história</a><a onClick={() => go("agendar")}>Agendar</a><a onClick={() => go("unidade")}>Oficina</a></div>}
        <div className="wrap">
          <h1 className="big"><span className="c">G</span><span className="s">aragem</span> <span className="c">7</span><span className="c">4</span></h1>
          <div className="sub">Oficina de motos clássicas · {city}</div>
        </div>
        <div className="stage">
          <div className="half" />
          <div className="m"><Moto /></div>
        </div>
      </div>

      <div className="strip">
        <div><b>1974</b><span>Portas abertas</span></div>
        <div><b>Boxer, Bobber, Café</b><span>Nossas especialidades</span></div>
        <div><b>Laudo escrito</b><span>Em toda revisão</span></div>
      </div>

      <div className="wrap" id="historia">
        <div className="story">
          <div>
            <h2><span className="c">N</span>ossa <span className="c">H</span>istória</h2>
            <p>Abrimos a oficina em 1974, no mesmo galpão da Rua Rio Grande do Norte, porque gostávamos de moto e queríamos que mais gente cuidasse da sua do jeito certo.</p>
            <p>Hoje trabalhamos só com motos clássicas. Cada uma entra com ficha, sai com laudo, e o dono pode ver cada etapa pelo celular. O mais importante é manter a história de cada moto inteira.</p>
            <a className="link" onClick={() => go("servicos")}>Ver serviços ▾</a>
          </div>
          <div className="fr"><MotoFront /></div>
        </div>
      </div>

      <div className="wrap serv" id="servicos">
        <h2 style={{ marginBottom: 36 }}><span className="c">S</span>erviços</h2>
        {SERV.map((s, i) => (
          <div key={s.t} className={`row${open === i ? " on" : ""}`} onClick={() => setOpen(open === i ? -1 : i)}>
            <div className="rh"><span className="n">0{i + 1}</span><span className="t">{s.t}</span><span className="p">{s.p}</span><span className="pl">{open === i ? "−" : "+"}</span></div>
            <div className="rb"><div><p>{s.d}</p></div></div>
          </div>
        ))}
      </div>

      <section className="book" id="agendar">
        <div className="wrap">
          <h2><span className="c">A</span>gende sua <span className="c">R</span>evisão</h2>
          <p className="lead">Conte qual é a moto e o que ela precisa. A gente confirma o horário pelo WhatsApp.</p>
          <div className="form">
            <div className="chips">{SERV.map((s, i) => <button key={s.t} className={`chip${svc === i ? " on" : ""}`} onClick={() => setSvc(i)}>{s.t}</button>)}</div>
            <div style={{ gridColumn: "span 2" }}><label htmlFor="mt-moto">Sua moto</label><input id="mt-moto" value={moto} onChange={(e) => setMoto(e.target.value)} placeholder="Ex.: BMW R75/5, 1972" /></div>
            <div><label htmlFor="mt-dia">Dia</label><select id="mt-dia" value={day} onChange={(e) => setDay(Number(e.target.value))}>{days.map((d, i) => <option key={d.label} value={i}>{d.label}</option>)}</select></div>
            <div><label htmlFor="mt-turno">Turno</label><select id="mt-turno" value={turno} onChange={(e) => setTurno(Number(e.target.value))}>{TURNOS.map((t, i) => <option key={t} value={i}>{t}</option>)}</select></div>
            <a className="cta go" href={wa} target="_blank" rel="noreferrer">Agendar no WhatsApp <span aria-hidden>→</span></a>
          </div>
        </div>
      </section>

      <div className="wrap" id="unidade">
        <div className="unit">
          <div><b>Endereço</b><span>Rua Rio Grande do Norte, 740<br />Funcionários, {city}</span></div>
          <div><b>Horário</b><span>Seg a sex, 8h às 18h<br />Sáb, 8h às 12h</span></div>
          <div><b>Contato</b><span>WhatsApp e ligação<br />Orçamento sem custo</span></div>
        </div>
      </div>

      <footer>
        <div className="wrap fr">
          <div className="logo">{brand}</div>
          <nav><a onClick={() => go("servicos")}>Serviços</a><a onClick={() => go("historia")}>História</a><a onClick={() => go("agendar")}>Agendar</a></nav>
          <span>© {new Date().getFullYear()} {brand}. Todos os direitos reservados.</span>
        </div>
      </footer>

      {sc && <a className="wa" href={base} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 32 32" fill="#fff"><path d="M16 3a13 13 0 0 0-11 19.800L3 29l6.400-1.900A13 13 0 1 0 16 3zm0 2.400a10.600 10.600 0 1 1-5.400 19.700l-.4-.2-3.800 1.100 1.100-3.700-.3-.4A10.600 10.600 0 0 1 16 5.400zm-4 5.300c-.3 0-.7.100-1 .5-.4.400-1.300 1.300-1.300 3.100s1.300 3.600 1.500 3.900c.2.200 2.600 4.100 6.400 5.600 3.200 1.200 3.800 1 4.500.9.700-.1 2.200-.9 2.500-1.800.3-.9.300-1.600.2-1.800-.1-.2-.3-.3-.7-.5l-2.300-1.100c-.3-.1-.5-.2-.8.200l-1 1.200c-.2.300-.4.300-.8.100-.4-.2-1.500-.6-2.900-1.800-1.100-1-1.800-2.200-2-2.500-.2-.4 0-.6.200-.8l.6-.7c.2-.2.200-.4.400-.6.100-.3.100-.5 0-.7l-1-2.400c-.3-.6-.5-.5-.8-.5z" /></svg></a>}
    </div>
  );
}
