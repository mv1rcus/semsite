import { useEffect, useState } from "react";

/** Oficina de motos classicas, construida do zero a partir de um pin de site coral e branco ("Vintage Moto"): titulo gigante em capitulares, moto recortada cruzando a divisa entre o bloco coral e o branco. Foto real da moto (Gemini). Agendamento de revisao que fecha no WhatsApp. */
const INK = "#161413", CO = "#f77170", CO2 = "#e85a59", BG = "#ffffff", SOFT = "#fdeceb", MU = "#6b6361";
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
        .mt h1,.mt h2,.mt h3{font-family:Jost,system-ui,sans-serif!important;font-weight:600!important;letter-spacing:0!important}
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
        .mt .stage{position:relative;margin-top:6px}
        .mt .stage .half{position:absolute;left:0;right:0;bottom:0;height:40%;background:#fff}
        .mt .story .fr{position:relative}.mt .story .fr .fsh{position:absolute;left:25%;right:25%;bottom:-6px;height:18px;background:radial-gradient(ellipse at center,rgba(0,0,0,.35),transparent 70%);filter:blur(3px)}.mt .story .fr img{position:relative}.mt .stage .m .sh{position:absolute;left:14%;right:10%;bottom:34px;height:26px;background:radial-gradient(ellipse at center,rgba(0,0,0,.28),transparent 70%);filter:blur(4px)}.mt .stage .m img{position:relative}.mt .stage .m{position:relative;max-width:940px;margin:0 auto;padding:0 20px 30px}
        .mt .cta{display:inline-flex;align-items:center;gap:10px;background:${INK};color:#fff;text-decoration:none;font-weight:600;font-size:14px;letter-spacing:.12em;text-transform:uppercase;padding:16px 30px;border:0;cursor:pointer}
        .mt .cta:hover{background:${CO2}}
        .mt .strip{display:flex;justify-content:center;gap:56px;flex-wrap:wrap;padding:34px 20px 8px;text-align:center}
        .mt .strip b{display:block;font-size:30px;font-weight:600}.mt .strip span{font-size:14px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:#4a4543}
        .mt h2{font-weight:600;font-size:clamp(34px,4.4vw,52px);letter-spacing:.01em;margin:0;line-height:1.05}
        .mt h2 .c{font-size:1.18em}
        .mt .story{padding:96px 0 40px;display:grid;grid-template-columns:1fr 250px;gap:90px;align-items:center;max-width:900px;margin:0 auto}
        .mt .story h2{font-size:clamp(26px,2.8vw,38px)}.mt .story p{font-size:16px;font-weight:500;line-height:1.7;margin:20px 0 0;color:#2b2625}
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
          <div className="m"><div className="sh" /><img src="/garagem-lado.webp" alt="Moto clássica boxer preta de perfil" style={{ width: "100%", height: "auto", display: "block" }} /></div>
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
          <div className="fr"><div className="fsh" /><img src="/garagem-frente.webp" alt="Moto clássica boxer vista de frente" style={{ width: "100%", height: "auto", display: "block" }} /></div>
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

      {sc && <a className="wa" href={base} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg></a>}
    </div>
  );
}
