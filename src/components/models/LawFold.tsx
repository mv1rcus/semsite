import { useEffect, useState } from "react";

/** Escritorio de advocacia novo, construido do zero a partir de um pin em azul marinho e dourado. Consulta em 3 passos que fecha no WhatsApp. */
const NV = "#0f2a3b", NV2 = "#17394f", GD = "#c9a24b", BG = "#f6f4ef", INK = "#10202b", MUT = "#51606b";
const AREAS = [
  { n: "Direito Empresarial", d: "Contratos, societário e consultoria para o seu negócio.", img: "/law-a1.webp" },
  { n: "Direito Civil", d: "Defesa dos seus direitos em disputas e indenizações.", img: "/law-a2.webp" },
  { n: "Direito de Família", d: "Divórcio, guarda e inventário com sensibilidade.", img: "/law-a3.webp" },
  { n: "Direito Imobiliário", d: "Compra, venda e regularização de imóveis.", img: "/law-a4.webp" },
];
const STATS = [["10+", "Anos de atuação"], ["95%", "Casos com êxito"], ["250+", "Clientes atendidos"], ["100%", "Sigilo garantido"]];
const TEAM = [
  { n: "Dra. Helena Toledo", r: "Sócia, Empresarial", img: "/law-t1.webp" },
  { n: "Dr. Marcelo Azevedo", r: "Sócio, Civil", img: "/law-t2.webp" },
  { n: "Dra. Renata Lima", r: "Família e Sucessões", img: "/law-t3.webp" },
];
const VALS = [
  { t: "Integridade", ic: "M16 3l11 4v8c0 7-5 12-11 14C10 27 5 22 5 15V7zM11 16l4 4 7-8" },
  { t: "Experiência", ic: "M16 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM5 28c0-6 5-9 11-9s11 3 11 9" },
  { t: "Atendimento direto", ic: "M5 6h22v15H12l-7 6zM10 12h12M10 16h8" },
];
const TIMES = ["09:00", "10:30", "11:30", "14:00", "15:30", "17:00"];
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
const Ic = ({ d, s = 28, c = GD }: { d: string; s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);
const SCALE = "M16 4v22M9 26h14M6 9h20M6 9l-3 8a4 4 0 0 0 6 0zM26 9l-3 8a4 4 0 0 0 6 0z";

export function LawFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Toledo & Azevedo";
  const city = client?.city?.trim() || "Recife";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [area, setArea] = useState(AREAS[0]!.n);
  const [day, setDay] = useState(0);
  const [time, setTime] = useState("");
  const [cust, setCust] = useState("");
  const [ai, setAi] = useState(0);
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  const [days] = useState(nextDays);
  useEffect(() => { const f = () => setSc(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const start = (s?: string) => { if (s) setArea(s); setStep(1); setTime(""); setOpen(true); setMenu(false); };
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Olá! Gostaria de agendar uma consulta no ${brand}${cust ? `, sou ${cust}` : ""}: ${area}, ${days[day]?.label ?? ""} às ${time}.`)}`;
  const vis = [0, 1, 2].map((k) => AREAS[(ai + k) % AREAS.length]!);

  return (
    <div className="lf" style={{ fontFamily: "Inter, system-ui, sans-serif", color: INK, background: BG, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap');
        .lf *{box-sizing:border-box}
        .lf a,.lf button{font-family:inherit}
        .lf .wrap{max-width:1180px;margin:0 auto;padding:0 24px}
        .lf .nav{display:flex;align-items:center;justify-content:space-between;height:84px;gap:20px}
        .lf .logo{display:flex;align-items:center;gap:10px;font-family:'Playfair Display',serif;font-weight:700;font-size:23px;color:#fff}
        .lf .links{display:flex;gap:30px;font-size:14.5px;font-weight:500}.lf .links a{color:#dbe5ec;cursor:pointer}.lf .links a.on{color:${GD}}
        .lf .btn{background:${GD};color:#10202b;border:0;border-radius:10px;padding:0 24px;min-height:48px;font-weight:700;font-size:15px;cursor:pointer;display:inline-flex;align-items:center;gap:10px;text-decoration:none}
        .lf .btn:hover{filter:brightness(1.07)}
        .lf .btn.o{background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,.4)}
        .lf .btn.d{background:${NV};color:#fff}
        .lf .burger{display:none;background:none;border:0;width:44px;height:44px;cursor:pointer}
        .lf .heroOuter{padding:14px 14px 0}
        .lf .hero{background:radial-gradient(ellipse at 80% 30%,${NV2},${NV} 65%);border-radius:28px;color:#fff;position:relative;overflow:hidden}
        .lf .herogrid{display:grid;grid-template-columns:1.1fr 1fr;gap:10px;align-items:end;min-height:560px}
        .lf .kick{display:inline-flex;gap:8px;align-items:center;font-size:12.5px;letter-spacing:2.5px;text-transform:uppercase;font-weight:700;color:#8a6a22}.lf .dark .eb,.lf .hero .eb,.lf .heroc .eb{color:${GD}}
        .lf h1{font-family:'Playfair Display',serif;font-weight:700;font-size:clamp(40px,5.2vw,68px);line-height:1.06;margin:18px 0 0}
        .lf h1 em{font-style:italic;color:${GD}}
        .lf .lead{font-size:17.5px;line-height:1.65;color:#cdd9e2;margin:22px 0 30px;max-width:480px}
        .lf .heroimg{display:flex;justify-content:center;align-items:flex-end;align-self:stretch;position:relative}
        .lf .heroimg:before{content:"";position:absolute;bottom:0;width:420px;height:420px;border-radius:50%;background:radial-gradient(circle,rgba(201,162,75,.35),rgba(201,162,75,0) 70%)}
        .lf .heroimg img{height:560px;width:auto;max-width:100%;object-fit:contain;position:relative}
        .lf .stats{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(255,255,255,.14);position:relative;z-index:2}
        .lf .stats div{padding:22px 24px;border-right:1px solid rgba(255,255,255,.14)}.lf .stats div:last-child{border:0}
        .lf .stats b{font-family:'Playfair Display',serif;font-size:34px;color:${GD};display:block;line-height:1}
        .lf .stats span{font-size:16px;display:block;margin-top:10px;color:#cdd9e2}
        .lf .sec{padding:88px 0}
        .lf .eb{font-size:13.5px;letter-spacing:3px;text-transform:uppercase;font-weight:700;color:#8a6a22}.lf .dark .eb,.lf .hero .eb,.lf .heroc .eb{color:${GD}}
        .lf h2{font-family:'Playfair Display',serif;font-weight:700;font-size:clamp(30px,3.8vw,46px);line-height:1.1;margin:12px 0 0;color:${NV}}
        .lf h2 em{font-style:italic;color:#a8832f}
        .lf .aboutgrid{display:grid;grid-template-columns:1fr 1.1fr;gap:56px;align-items:center}
        .lf .office{position:relative}.lf .office img{width:100%;aspect-ratio:16/11;object-fit:cover;border-radius:22px;display:block;box-shadow:0 22px 46px rgba(15,42,59,.22)}
        .lf .badge{position:absolute;left:0;bottom:-20px;background:${GD};color:#10202b;border-radius:14px;padding:14px 20px;font-weight:700;line-height:1.2}
        .lf .badge b{font-family:'Playfair Display',serif;font-size:30px;display:block}
        .lf .vals{display:flex;flex-direction:column;gap:14px;margin:26px 0 30px}
        .lf .val{display:flex;gap:14px;align-items:center;font-weight:600;font-size:16px}
        .lf .val i{width:46px;height:46px;border-radius:50%;background:${NV};display:grid;place-items:center;flex:none}
        .lf .dark{background:${NV};border-radius:28px;color:#fff;margin:0 14px;padding:88px 0}
        .lf .dark h2{color:#fff}.lf .dark h2 em{color:${GD}}
        .lf .ah{display:flex;align-items:flex-end;justify-content:space-between;gap:20px}
        .lf .arr{width:46px;height:46px;border-radius:50%;border:1.5px solid rgba(255,255,255,.35);background:transparent;color:#fff;cursor:pointer;font-size:17px}
        .lf .arr:hover{border-color:${GD};color:${GD}}
        .lf .ac{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:36px}
        .lf .card{background:#fff;color:${INK};border-radius:18px;overflow:hidden;text-align:left;border:0;padding:0;cursor:pointer;display:flex;flex-direction:column}
        .lf .card img{width:100%;aspect-ratio:16/10;object-fit:cover;display:block}
        .lf .card div{padding:20px 22px 22px;display:flex;flex-direction:column;gap:8px;flex:1}
        .lf .card b{font-family:'Playfair Display',serif;font-size:21px}
        .lf .card p{margin:0;font-size:15px;line-height:1.55;color:${MUT};flex:1}
        .lf .card u{text-decoration:none;color:#8a6a22;font-weight:600;font-size:14.5px}
        .lf .tm{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:36px}
        .lf .tc{background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 10px 26px rgba(15,42,59,.1)}
        .lf .tc img{width:100%;aspect-ratio:4/4.4;object-fit:cover;object-position:top;display:block}
        .lf .tc div{padding:16px 18px}.lf .tc b{display:block;font-size:17px}.lf .tc span{font-size:14px;color:${MUT}}
        .lf .tt{display:grid;grid-template-columns:1.2fr 1fr;gap:22px;margin-top:36px}
        .lf .qc{background:#fff;border-radius:20px;padding:30px;box-shadow:0 10px 26px rgba(15,42,59,.1)}
        .lf .qc p{font-family:'Playfair Display',serif;font-size:21px;line-height:1.5;margin:10px 0 18px;font-style:italic}
        .lf .qc img{width:54px;height:54px;border-radius:50%;object-fit:cover}
        .lf .cta{background:linear-gradient(120deg,${NV},${NV2});border-radius:20px;color:#fff;padding:34px;display:flex;flex-direction:column;justify-content:center;gap:14px}
        .lf .cta h3{font-family:'Playfair Display',serif;font-size:30px;margin:0;line-height:1.15}.lf .cta h3 em{color:${GD}}
        .lf .cta p{margin:0;color:#cdd9e2}
        .lf footer{background:${NV};color:#cdd9e2;margin:20px 14px 14px;border-radius:24px;padding:36px 0}
        .lf .fr{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap}
        .lf .fr nav{display:flex;gap:26px;font-size:14.5px}.lf .fr nav a{cursor:pointer;color:#e7eef3}
        .lf .wa{position:fixed;right:18px;bottom:18px;z-index:40;width:58px;height:58px;border-radius:50%;background:#25d366;display:grid;place-items:center;box-shadow:0 8px 24px rgba(0,0,0,.35)}
        .lf .ov{position:fixed;inset:0;z-index:100;background:rgba(5,16,24,.65);display:flex;align-items:center;justify-content:center;padding:16px}
        .lf .md{background:${BG};width:100%;max-width:520px;max-height:92vh;overflow:auto;padding:32px;border-radius:22px;position:relative}
        .lf .md h3{font-family:'Playfair Display',serif;font-size:28px;margin:6px 0 4px;color:${NV}}
        .lf .tag{display:inline-block;background:#ece4cf;color:#6e5316;border-radius:999px;padding:6px 14px;font-size:13px;font-weight:600}
        .lf .bars{display:flex;gap:6px;margin:14px 0 20px}.lf .bars i{flex:1;height:4px;border-radius:4px;background:#dcd6c8}.lf .bars i.on{background:${GD}}
        .lf .opt{display:flex;justify-content:space-between;width:100%;padding:15px 18px;margin-bottom:10px;border:1.5px solid #dcd6c8;border-radius:12px;background:#fff;cursor:pointer;font-size:15.5px;min-height:52px;text-align:left}
        .lf .opt.on{border-color:${NV};background:#eef2f5}
        .lf .chip{padding:12px 6px;border:1.5px solid #dcd6c8;border-radius:12px;background:#fff;cursor:pointer;font-size:15px;text-align:center;min-height:46px}
        .lf .chip.on{background:${NV};color:#fff;border-color:${NV}}
        .lf .x{position:absolute;right:14px;top:12px;width:44px;height:44px;border:0;background:none;font-size:26px;cursor:pointer}
        .lf .mob{display:none}
        @media(max-width:900px){
          .lf .links,.lf .navbtn{display:none}.lf .burger{display:block}.lf .nav{height:68px}.lf .logo{font-size:20px}
          .lf .herogrid{grid-template-columns:1fr;min-height:0;gap:0;padding-top:10px}.lf .heroimg img{height:400px}.lf .heroimg:before{width:300px;height:300px}
          .lf .stats{grid-template-columns:1fr 1fr}.lf .stats div{padding:16px 18px}.lf .stats div:nth-child(2){border-right:0}.lf .stats div:nth-child(-n+2){border-bottom:1px solid rgba(255,255,255,.14)}
          .lf .aboutgrid{grid-template-columns:1fr;gap:40px}
          .lf .ac{grid-template-columns:1fr}.lf .tm{grid-template-columns:1fr 1fr 1fr;gap:10px}.lf .tc div{padding:10px}.lf .tc b{font-size:13.5px}.lf .tc span{font-size:12px}
          .lf .tt{grid-template-columns:1fr}.lf .dark{padding:50px 0}
          .lf .fr{justify-content:center;text-align:center}.lf .fr nav{gap:18px;flex-wrap:wrap;justify-content:center}
          .lf .mob{display:block;background:rgba(255,255,255,.08);border-radius:14px;margin:0 16px 10px}.lf .mob a{display:block;padding:15px 20px;font-size:15px;color:#fff;cursor:pointer;border-top:1px solid rgba(255,255,255,.12)}.lf .mob a:first-child{border:0}
          .lf .md{padding:26px 20px}
        }
      `}</style>

      <div className="heroOuter"><div className="hero">
        <header style={{ position: "relative", zIndex: 3 }}>
          <div className="wrap nav">
            <div className="logo"><Ic d={SCALE} s={32} />{brand}</div>
            <nav className="links"><a className="on" onClick={() => go("top")}>Início</a><a onClick={() => go("sobre")}>Sobre</a><a onClick={() => go("areas")}>Áreas de atuação</a><a onClick={() => go("equipe")}>Equipe</a><a onClick={() => go("contato")}>Contato</a></nav>
            <button type="button" className="btn navbtn" onClick={() => start()}>Agendar consulta</button>
            <button type="button" className="burger" aria-label="Menu" onClick={() => setMenu((m) => !m)}><svg width="26" height="26" viewBox="0 0 26 26" stroke="#fff" strokeWidth="2"><path d="M3 7h20M3 13h20M3 19h20" /></svg></button>
          </div>
          {menu && <div className="mob"><a onClick={() => go("sobre")}>Sobre</a><a onClick={() => go("areas")}>Áreas de atuação</a><a onClick={() => go("equipe")}>Equipe</a><a onClick={() => go("contato")}>Contato</a><a onClick={() => start()} style={{ color: GD, fontWeight: 700 }}>Agendar consulta</a></div>}
        </header>
        <section id="top">
          <div className="wrap herogrid">
            <div style={{ alignSelf: "center", padding: "20px 0 40px" }}>
              <span className="kick">Advocacia em {city}</span>
              <h1>Seu parceiro em <em>soluções jurídicas</em></h1>
              <p className="lead">Atendimento direto, estratégia clara e compromisso com o resultado. Defendemos os seus direitos com ética e transparência.</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button type="button" className="btn" onClick={() => start()}>Agendar consulta <span aria-hidden>→</span></button>
                <button type="button" className="btn o" onClick={() => go("areas")}>Áreas de atuação</button>
              </div>
            </div>
            <div className="heroimg"><img src="/law-hero.webp" alt="Advogado sócio do escritório" /></div>
          </div>
          <div className="stats">{STATS.map(([a, b]) => (<div key={b}><b>{a}</b><span>{b}</span></div>))}</div>
        </section>
      </div></div>

      <section className="sec" id="sobre"><div className="wrap aboutgrid">
        <div className="office"><img src="/law-office.webp" alt="Escritório" loading="lazy" /><div className="badge"><b>Desde 2014</b>de atuação</div></div>
        <div>
          <span className="eb">Sobre o escritório</span>
          <h2>Construído sobre integridade, <em>guiado pela justiça</em></h2>
          <p style={{ color: MUT, lineHeight: 1.7, fontSize: 16.5, margin: "18px 0 0", maxWidth: 480 }}>Somos um escritório que une atendimento próximo e preparo técnico. Cada caso recebe atenção do início ao fim.</p>
          <div className="vals">{VALS.map((v) => (<div className="val" key={v.t}><i><Ic d={v.ic} s={22} /></i>{v.t}</div>))}</div>
          <button type="button" className="btn d" onClick={() => start()}>Falar com um advogado</button>
        </div>
      </div></section>

      <section className="dark" id="areas"><div className="wrap">
        <div className="ah">
          <div><span className="eb">Áreas de atuação</span><h2>Especialização <em>de confiança</em></h2></div>
          <div style={{ display: "flex", gap: 10 }}>
            <button type="button" className="arr" aria-label="Anterior" onClick={() => setAi((ai + AREAS.length - 1) % AREAS.length)}>←</button>
            <button type="button" className="arr" aria-label="Próximo" onClick={() => setAi((ai + 1) % AREAS.length)}>→</button>
          </div>
        </div>
        <div className="ac">
          {vis.map((a) => (
            <button type="button" className="card" key={a.n} onClick={() => start(a.n)}>
              <img src={a.img} alt={a.n} loading="lazy" /><div><b>{a.n}</b><p>{a.d}</p><u>Agendar consulta →</u></div>
            </button>
          ))}
        </div>
      </div></section>

      <section className="sec" id="equipe"><div className="wrap">
        <span className="eb">Nossa equipe</span>
        <h2>Conheça quem vai <em>cuidar do seu caso</em></h2>
        <div className="tm">{TEAM.map((p) => (<div className="tc" key={p.n}><img src={p.img} alt={p.n} loading="lazy" /><div><b>{p.n}</b><span>{p.r}</span></div></div>))}</div>
      </div></section>

      <section className="sec" style={{ paddingTop: 0 }}><div className="wrap">
        <span className="eb">Depoimentos</span>
        <h2>Clientes que <em>confiaram</em></h2>
        <div className="tt">
          <div className="qc">
            <div style={{ color: GD, letterSpacing: 2 }}>★★★★★</div>
            <p>“Fui atendido com clareza e respeito do início ao fim. Meu processo foi resolvido mais rápido do que eu esperava.”</p>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}><img src="/law-guest.webp" alt="Cliente" /><div><b>Roberto F.</b><div style={{ fontSize: 14, color: MUT }}>Empresário</div></div></div>
          </div>
          <div className="cta">
            <h3>Precisa de orientação <em>jurídica?</em></h3>
            <p>Agende uma consulta e converse com um advogado do escritório.</p>
            <div><button type="button" className="btn" onClick={() => start()}>Agendar consulta <span aria-hidden>→</span></button></div>
          </div>
        </div>
      </div></section>

      <footer id="contato"><div className="wrap">
        <div className="fr">
          <div className="logo"><Ic d={SCALE} s={30} />{brand}</div>
          <nav><a onClick={() => go("top")}>Início</a><a onClick={() => go("sobre")}>Sobre</a><a onClick={() => go("areas")}>Áreas</a><a onClick={() => go("equipe")}>Equipe</a></nav>
          <div style={{ fontSize: 15, lineHeight: 1.6 }}>Av. Boa Viagem, 1200, sala 804, {city}<br />Seg a sex, 9h às 18h<br /><a href={`https://wa.me/${num}`} target="_blank" rel="noreferrer" style={{ color: GD, fontWeight: 600 }}>Falar no WhatsApp</a></div>
        </div>
      </div></footer>

      {sc && <a className="wa" href={`https://wa.me/${num}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg></a>}

      {open && (
        <div className="ov" onClick={(e) => e.target === e.currentTarget && setOpen(false)} role="dialog" aria-modal="true" aria-label="Agendar consulta">
          <div className="md">
            <button type="button" className="x" aria-label="Fechar" onClick={() => setOpen(false)}>×</button>
            <span className="tag">Passo {step} de 3</span>
            <h3>{["Qual área?", "Dia e horário", "Confirme sua consulta"][step - 1]}</h3>
            <div className="bars">{[1, 2, 3].map((n) => <i key={n} className={n <= step ? "on" : ""} />)}</div>
            {step === 1 && AREAS.map((s) => (<button type="button" key={s.n} className={`opt${area === s.n ? " on" : ""}`} onClick={() => setArea(s.n)}><span>{s.n}</span>{area === s.n && <span>✓</span>}</button>))}
            {step === 2 && (<div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 16 }}>
                {days.map((d, i) => (<button type="button" key={d.label} className={`chip${day === i ? " on" : ""}`} onClick={() => setDay(i)}><small style={{ display: "block", textTransform: "uppercase", fontSize: 11, letterSpacing: 1 }}>{d.dow}</small><b style={{ fontSize: 18 }}>{d.d}</b></button>))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                {TIMES.map((x) => (<button type="button" key={x} className={`chip${time === x ? " on" : ""}`} onClick={() => setTime(x)}>{x}</button>))}
              </div>
            </div>)}
            {step === 3 && (<div>
              <div style={{ background: "#fff", border: "1.5px solid #dcd6c8", borderRadius: 12, padding: 18, fontSize: 15.5, lineHeight: 1.9 }}>
                <b>{area}</b><br />{days[day]?.label} às {time}<br /><span style={{ color: MUT, fontSize: 14 }}>{brand}, {city}</span>
              </div>
              <input value={cust} onChange={(e) => setCust(e.target.value)} placeholder="Seu nome" aria-label="Seu nome" style={{ width: "100%", marginTop: 14, minHeight: 50, padding: "0 16px", border: "1.5px solid #dcd6c8", borderRadius: 12, fontSize: 15.5, background: "#fff" }} />
            </div>)}
            <div style={{ display: "flex", gap: 10, marginTop: 22, justifyContent: "space-between" }}>
              {step > 1 ? <button type="button" className="btn d" onClick={() => setStep(step - 1)}>Voltar</button> : <span />}
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
