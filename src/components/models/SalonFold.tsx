import { useEffect, useState } from "react";

/** Salao de beleza novo, construido do zero a partir de um pin rose claro com cards escuros ("Your hair. Your era."). Agendamento em 3 passos que fecha no WhatsApp. */
const INK = "#1c1414", PK = "#e8a0ab", PKD = "#d9828f", BG = "#fcf3f0", BL = "#f1d9d3", DK = "#3a2825", MU = "#6e5753";
const SERV = [
  { id: "Corte", t: "CORTE", d: "Cortes de precisão que definem você.", img: "/salao-cut.webp", p: "a partir de R$ 90" },
  { id: "Cor", t: "COR", d: "Cor rica e brilhante que vira todos os olhares.", img: "/salao-color.webp", p: "a partir de R$ 220" },
  { id: "Penteado", t: "PENTEADO", d: "Escova, ondas e penteados sem esforço.", img: "/salao-style.webp", p: "a partir de R$ 70" },
];
const GLAM = [
  { img: "/salao-g1.webp", tag: "Em alta" }, { img: "/salao-g2.webp", tag: "" }, { img: "/salao-g3.webp", tag: "Novo look" }, { img: "/salao-g4.webp", tag: "" }, { img: "/salao-g5.webp", tag: "" },
];
const TIMES = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];
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
const Spark = ({ s = 16, c = PKD }: { s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill={c} aria-hidden><path d="M12 0c.8 6.300 5.700 11.200 12 12-6.300.8-11.200 5.700-12 12-.8-6.300-5.700-11.200-12-12C6.300 11.200 11.200 6.300 12 0z" /></svg>
);

export function SalonFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Studio Era";
  const city = client?.city?.trim() || "Belo Horizonte";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [svc, setSvc] = useState("Corte");
  const [day, setDay] = useState(0);
  const [time, setTime] = useState("");
  const [cust, setCust] = useState("");
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  const [ba, setBa] = useState(52);
  const [days] = useState(nextDays);
  useEffect(() => { const f = () => setSc(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const start = (s?: string) => { if (s) setSvc(s); setStep(s ? 2 : 1); setTime(""); setOpen(true); setMenu(false); };
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero agendar ${svc.toLowerCase()} no ${brand}${cust ? ` em nome de ${cust}` : ""}: ${days[day]?.label ?? ""} às ${time}.`)}`;
  const handle = brand.normalize("NFD").toLowerCase().replace(/[^a-z]+/g, "");

  return (
    <div className="sf" style={{ fontFamily: "DM Sans, system-ui, sans-serif", color: INK, background: BG, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=DM+Sans:wght@400;500;600;700&family=Allura&display=swap');
        .sf *{box-sizing:border-box}
        .sf a,.sf button{font-family:inherit}
        .sf .wrap{max-width:1180px;margin:0 auto;padding:0 24px}
        .sf .hero{position:relative;overflow:hidden;background:linear-gradient(180deg,#f4dcd6 0,#f8e6e1 55%,${BG} 100%)}
        .sf .nav{display:flex;align-items:center;justify-content:space-between;height:88px;gap:24px;position:relative;z-index:5}
        .sf .logo{font-family:Allura,cursive;font-size:38px;line-height:1;color:${INK};display:flex;align-items:baseline;gap:6px}
        .sf .logo b{font-family:Anton,sans-serif;font-weight:400;font-size:22px;letter-spacing:2px}
        .sf .links{display:flex;gap:34px;font-size:14px;letter-spacing:1.6px;text-transform:uppercase;font-weight:700}
        .sf .links a{cursor:pointer;color:${INK};padding-bottom:4px;border-bottom:2px solid transparent}.sf .links a:hover{border-color:${PK}}
        .sf .pill{background:${PK};color:${INK};border:0;border-radius:999px;padding:0 26px;min-height:46px;font-weight:700;font-size:12.5px;letter-spacing:1.3px;text-transform:uppercase;cursor:pointer;display:inline-flex;align-items:center;gap:10px;text-decoration:none}
        .sf .pill{white-space:nowrap}
        .sf .pill:hover{filter:brightness(1.05)}
        .sf .dkb{background:${DK};color:#fff;border:0;border-radius:16px;padding:0 34px;min-height:60px;font-weight:700;font-size:14.5px;letter-spacing:1.3px;text-transform:uppercase;cursor:pointer;display:inline-flex;align-items:center;gap:14px;text-decoration:none}
        .sf .dkb:hover{background:#2a1b19}
        .sf .burger{display:none;background:none;border:0;width:44px;height:44px;cursor:pointer}
        .sf .herogrid{display:grid;grid-template-columns:1fr 1.25fr;align-items:center;min-height:640px;position:relative}
        .sf .welc{font-size:13px;letter-spacing:2.5px;text-transform:uppercase;font-weight:500;display:flex;align-items:center;gap:8px}
        .sf h1{font-family:Anton,sans-serif;font-weight:400;font-size:clamp(64px,9vw,118px);line-height:.98;margin:20px 0 0;letter-spacing:.5px;text-transform:uppercase}
        .sf h1 span{color:${PK};display:block}
        .sf .sub{font-size:14.5px;letter-spacing:2.6px;text-transform:uppercase;margin:24px 0 32px;color:#3d2e2c}
        .sf .heroimg{position:absolute;right:-8%;top:-88px;bottom:0;width:62%}
        .sf .heroimg img{width:100%;height:100%;object-fit:cover;object-position:60% 22%;-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 28%);mask-image:linear-gradient(90deg,transparent 0,#000 28%)}
        .sf .badge{position:absolute;right:6%;bottom:70px;width:150px;height:150px;border-radius:50%;border:1.5px solid rgba(255,255,255,.85);display:grid;place-items:center;color:#fff;z-index:2;backdrop-filter:blur(2px);background:rgba(40,20,20,.45)}
        .sf .badge i{position:absolute;inset:0;animation:sfspin 22s linear infinite}
        .sf .badge svg{width:100%;height:100%;max-width:100%;overflow:visible}
        .sf .badge b{width:76px;height:76px;border-radius:50%;background:${PK};color:${INK};display:grid;place-items:center;text-align:center;font-family:Anton,sans-serif;font-weight:400;font-size:17px;line-height:1.05;letter-spacing:.5px}
        @keyframes sfspin{to{transform:rotate(360deg)}}
        .sf .sec{padding:70px 0 20px}
        .sf .chip2{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(90deg,#f0b4bb,#f6cfd0);border-radius:999px;padding:11px 20px;font-weight:700;font-size:13px;letter-spacing:1.3px;text-transform:uppercase}
        .sf .cards{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:26px}
        .sf .card{position:relative;border-radius:20px;overflow:hidden;aspect-ratio:3/3.9;background:${DK};border:0;padding:0;cursor:pointer;text-align:left;color:#fff}
        .sf .card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .6s}
        .sf .card:hover img{transform:scale(1.05)}
        .sf .card:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(28,16,14,0) 40%,rgba(28,16,14,.82) 100%)}
        .sf .card .tx{position:absolute;left:28px;right:28px;bottom:26px;z-index:2}
        .sf .card h3{font-family:Anton,sans-serif;font-weight:400;font-size:52px;line-height:1;margin:0 0 10px;letter-spacing:.5px}
        .sf .card p{margin:0;font-size:15px;line-height:1.45;max-width:190px;color:#f7e9e5}
        .sf .card small{display:block;margin-top:10px;color:#f7b9c3;font-weight:700;font-size:15.5px}
        .sf .go{position:absolute;right:22px;bottom:24px;z-index:2;width:46px;height:46px;border-radius:50%;background:${PK};color:${INK};display:grid;place-items:center;font-size:20px;font-weight:700}
        .sf .ba{display:grid;grid-template-columns:.8fr 1.5fr;gap:30px;align-items:center;margin-top:54px}
        .sf h2{font-family:Anton,sans-serif;font-weight:400;font-size:clamp(36px,4.4vw,54px);line-height:1;margin:0;letter-spacing:.5px;text-transform:uppercase;display:flex;align-items:flex-start;gap:8px}
        .sf .ptxt{font-size:15.5px;line-height:1.6;color:${MU};margin:16px 0 24px}
        .sf .slider{position:relative;border-radius:22px;overflow:hidden;aspect-ratio:1/.8;background:#ddd;user-select:none}
        .sf .slider img{position:absolute;top:0;height:100%;width:100%;object-fit:cover;object-position:50% 12%;left:0}
        .sf .slider .cl{position:absolute;inset:0;overflow:hidden}
        .sf .lab{position:absolute;top:18px;z-index:3;background:${PK};border-radius:999px;padding:7px 16px;font-size:12px;font-weight:700;letter-spacing:1.3px}
        .sf .knob{position:absolute;top:0;bottom:0;width:2px;background:#fff;z-index:3}
        .sf .knob b{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:46px;height:46px;border-radius:50%;background:#fff;display:grid;place-items:center;font-size:14px;box-shadow:0 4px 14px rgba(0,0,0,.25);letter-spacing:-2px}
        .sf .slider input{position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:ew-resize;z-index:4;margin:0}
        .sf .glam{display:grid;grid-template-columns:.95fr 4fr;gap:26px;align-items:center;margin-top:54px}
        .sf .gr{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}
        .sf .gi{position:relative;border-radius:16px;overflow:hidden;aspect-ratio:3/4.1}
        .sf .gi img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s}.sf .gi:hover img{transform:scale(1.06)}
        .sf .gi span{position:absolute;top:12px;left:12px;background:${PK};border-radius:999px;padding:6px 13px;font-size:12.5px;font-weight:700;letter-spacing:1px;text-transform:uppercase}
        .sf .band{background:${DK};color:#fff;border-radius:28px;display:grid;grid-template-columns:1.2fr 1fr;gap:30px;align-items:center;padding:40px 46px;margin:60px 0 0}
        .sf .band h3{font-family:Anton,sans-serif;font-weight:400;font-size:clamp(34px,4vw,50px);line-height:1;margin:0;text-transform:uppercase}.sf .band h3 em{font-style:normal;color:${PK}}
        .sf .band p{margin:0 0 18px;color:#ecd9d4;line-height:1.55;font-size:16px}
        .sf footer{background:${DK};color:#f4e4df;margin-top:70px;padding:30px 0}
        .sf .fr{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;font-size:14px;letter-spacing:1.2px;text-transform:uppercase}
        .sf .fr .logo{color:#fff}
        .sf .wa{position:fixed;right:18px;bottom:18px;z-index:40;width:58px;height:58px;border-radius:50%;background:#25d366;display:grid;place-items:center;box-shadow:0 8px 24px rgba(0,0,0,.3)}
        .sf .ov{position:fixed;inset:0;z-index:100;background:rgba(40,20,20,.6);display:flex;align-items:center;justify-content:center;padding:16px}
        .sf .md{background:${BG};width:100%;max-width:520px;max-height:92vh;overflow:auto;padding:32px;border-radius:26px;position:relative}
        .sf .md h3{font-family:Anton,sans-serif;font-weight:400;text-transform:uppercase;font-size:34px;margin:8px 0 4px}
        .sf .tag{display:inline-block;background:${PK};border-radius:999px;padding:6px 14px;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase}
        .sf .bars{display:flex;gap:6px;margin:14px 0 20px}.sf .bars i{flex:1;height:4px;border-radius:4px;background:${BL}}.sf .bars i.on{background:${PKD}}
        .sf .chip{padding:12px 6px;border:1.5px solid #ecd2cc;border-radius:12px;background:#fff;cursor:pointer;font-size:15px;text-align:center;min-height:46px}
        .sf .chip.on{background:${DK};color:#fff;border-color:${DK}}
        .sf .x{position:absolute;right:14px;top:12px;width:44px;height:44px;border:0;background:none;font-size:26px;cursor:pointer}
        .sf .mob{display:none}
        @media(max-width:900px){
          .sf .links,.sf .navbtn{display:none}.sf .burger{display:block}.sf .nav{height:70px}.sf .logo{font-size:32px}
          .sf .herogrid{grid-template-columns:1fr;min-height:0;padding-bottom:0}
          .sf .heroimg{position:relative;right:0;top:0;width:calc(100% + 48px);margin:6px -24px 0;height:380px;order:2}
          .sf .heroimg img{-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 22%);mask-image:linear-gradient(180deg,transparent 0,#000 22%);object-position:60% 20%}
          .sf .badge{width:112px;height:112px;right:40px;bottom:18px}.sf .badge b{width:58px;height:58px;font-size:13px}
          .sf h1{font-size:68px;margin-top:14px}.sf .sub{margin:16px 0 24px;font-size:13px}
          .sf .cards{grid-template-columns:1fr;gap:16px}.sf .card{aspect-ratio:4/4.2}
          .sf .ba,.sf .glam{grid-template-columns:1fr;gap:22px}.sf .slider{aspect-ratio:4/4.4}
          .sf .gr{grid-template-columns:repeat(2,1fr)}.sf .gi:last-child{grid-column:span 2;aspect-ratio:16/9}
          .sf .band{grid-template-columns:1fr;padding:30px 24px}
          .sf .fr{justify-content:center;text-align:center}
          .sf .mob{display:block;background:#fff;border-radius:16px;margin:0 16px 10px;box-shadow:0 8px 24px rgba(60,30,30,.12);position:relative;z-index:6}.sf .mob a{display:block;padding:15px 20px;font-size:14px;letter-spacing:1.2px;text-transform:uppercase;cursor:pointer;border-top:1px solid #f4e2dd}.sf .mob a:first-child{border:0}
          .sf .md{padding:26px 20px}
        }
      `}</style>

      <div className="hero" id="top">
        <header>
          <div className="wrap nav">
            <div className="logo">{brand.split(" ")[0]} <b>{brand.split(" ").slice(1).join(" ").toUpperCase() || "STUDIO"}</b></div>
            <nav className="links"><a onClick={() => go("top")}>Início</a><a onClick={() => go("servicos")}>Serviços</a><a onClick={() => go("looks")}>Looks</a><a onClick={() => go("insta")}>Galeria</a><a onClick={() => start()}>Agendar</a></nav>
            <button type="button" className="pill navbtn" onClick={() => start()}>Agende seu look</button>
            <button type="button" className="burger" aria-label="Menu" onClick={() => setMenu((m) => !m)}><svg width="26" height="26" viewBox="0 0 26 26" stroke={INK} strokeWidth="2"><path d="M3 7h20M3 13h20M3 19h20" /></svg></button>
          </div>
          {menu && <div className="mob"><a onClick={() => go("servicos")}>Serviços</a><a onClick={() => go("looks")}>Looks</a><a onClick={() => go("insta")}>Galeria</a><a onClick={() => start()} style={{ fontWeight: 700 }}>Agende seu look</a></div>}
        </header>
        <div className="wrap herogrid">
          <div style={{ padding: "40px 0 70px", position: "relative", zIndex: 3 }}>
            <div className="welc">Bem-vinda ao {brand} <Spark /></div>
            <h1>Seu cabelo.<span>Sua era.</span></h1>
            <p className="sub">Corte. Cor. Confiança.</p>
            <button type="button" className="dkb" onClick={() => start()}>Agende seu look <span aria-hidden>→</span></button>
          </div>
          <div className="heroimg">
            <img src="/salao-hero.webp" alt="Mulher com cabelo castanho volumoso e luzes caramelo" />
            <div className="badge" aria-hidden>
              <svg className="" viewBox="0 0 150 150" width="150" height="150" style={{ position: "absolute", inset: 0, animation: "sfspin 22s linear infinite" }}><defs><path id="sfc" d="M75 75m-58 0a58 58 0 1 1 116 0a58 58 0 1 1-116 0" /></defs><text fill="#fff" fontSize="12.5" letterSpacing="2.6" fontWeight="800"><textPath href="#sfc">TENDÊNCIA DA ESTAÇÃO ✦ NOVOS LOOKS ✦ </textPath></text></svg>
              <b>NOVOS<br />LOOKS</b>
            </div>
          </div>
        </div>
      </div>

      <section className="sec" id="servicos"><div className="wrap">
        <span className="chip2">Nossos serviços <Spark s={13} /></span>
        <div className="cards">
          {SERV.map((s) => (
            <button type="button" className="card" key={s.id} onClick={() => start(s.id)}>
              <img src={s.img} alt={s.t} loading="lazy" />
              <div className="tx"><h3>{s.t}</h3><p>{s.d}</p><small>{s.p}</small></div>
              <span className="go" aria-hidden>→</span>
            </button>
          ))}
        </div>

        <div className="ba" id="looks">
          <div>
            <h2>Antes &amp; depois <Spark s={18} /></h2>
            <p className="ptxt">Transformações reais.<br />Confiança de verdade.</p>
            <button type="button" className="dkb" onClick={() => start("Cor")}>Quero o meu <span aria-hidden>→</span></button>
          </div>
          <div className="slider">
            <img src="/salao-before.webp" alt="Antes: cabelo liso escuro" loading="lazy" />
            <div className="cl" style={{ clipPath: `inset(0 0 0 ${ba}%)` }}><img src="/salao-after.webp" alt="Depois: ondas com luzes douradas" loading="lazy" /></div>
            <span className="lab" style={{ left: 18 }}>ANTES</span><span className="lab" style={{ right: 18 }}>DEPOIS</span>
            <div className="knob" style={{ left: `${ba}%` }}><b><svg width="22" height="14" viewBox="0 0 22 14" fill="none" stroke="#1c1414" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 2L2 7l5 5M15 2l5 5-5 5" /></svg></b></div>
            <input type="range" min={5} max={95} value={ba} onChange={(e) => setBa(Number(e.target.value))} aria-label="Comparar antes e depois" />
          </div>
        </div>

        <div className="glam" id="insta">
          <div>
            <h2>Insta glam <Spark s={18} /></h2>
            <p className="ptxt">Looks fresquinhos<br />do nosso studio.</p>
            <a className="pill" href={`https://wa.me/${num}`} target="_blank" rel="noreferrer">Seguir @{handle}</a>
          </div>
          <div className="gr">{GLAM.map((g, i) => (<div className="gi" key={i}><img src={g.img} alt="Look do studio" loading="lazy" />{g.tag && <span>{g.tag}</span>}</div>))}</div>
        </div>

        <div className="band">
          <h3>Sua próxima <em>transformação</em> começa aqui</h3>
          <div><p>Escolha o serviço, o dia e o horário em 3 passos. A confirmação sai direto no nosso WhatsApp. Atendemos de terça a sábado.</p><button type="button" className="pill" onClick={() => start()}>Agende seu look <span aria-hidden>→</span></button></div>
        </div>
      </div></section>

      <footer><div className="wrap fr">
        <div className="logo">{brand.split(" ")[0]} <b>{brand.split(" ").slice(1).join(" ").toUpperCase() || "STUDIO"}</b></div>
        <span>Rua das Acácias, 123, Savassi, {city}</span>
        <span>Ter a sáb, 9h às 19h</span>
        <a href={`https://wa.me/${num}`} target="_blank" rel="noreferrer" style={{ color: PK, fontWeight: 700, textDecoration: "none" }}>WhatsApp</a>
      </div>
      <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", marginTop: 22, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,.14)", fontSize: 13.5, color: "#e6cfc9" }}>
        <span>© {new Date().getFullYear()} {brand}. Todos os direitos reservados.</span>
        <span style={{ display: "flex", gap: 14 }} aria-label="Redes sociais">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" aria-label="Instagram"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r=".9" fill="#fff" /></svg>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" aria-label="TikTok"><path d="M14 3v11.500a3.500 3.500 0 1 1-3.500-3.500M14 3c.4 2.600 2 4.200 5 4.400" /></svg>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" aria-label="Pinterest"><circle cx="12" cy="12" r="9" /><path d="M10.500 20.500l2-8M9.500 12.500c0-3 4.500-3.500 4.500-.5 0 2-1.500 3-2.500 2" /></svg>
        </span>
      </div></footer>

      {sc && <a className="wa" href={`https://wa.me/${num}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg></a>}

      {open && (
        <div className="ov" onClick={(e) => e.target === e.currentTarget && setOpen(false)} role="dialog" aria-modal="true" aria-label="Agendar horário">
          <div className="md">
            <button type="button" className="x" aria-label="Fechar" onClick={() => setOpen(false)}>×</button>
            <span className="tag">Passo {step} de 3</span>
            <h3>{["Qual serviço?", "Dia e horário", "Confirme seu horário"][step - 1]}</h3>
            <div className="bars">{[1, 2, 3].map((n) => <i key={n} className={n <= step ? "on" : ""} />)}</div>
            {step === 1 && (<div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
              {SERV.map((s) => (<button type="button" key={s.id} className={`chip${svc === s.id ? " on" : ""}`} onClick={() => setSvc(s.id)}><b style={{ fontSize: 16 }}>{s.id}</b><small style={{ display: "block", opacity: 0.75, marginTop: 2 }}>{s.p.replace("a partir de ", "de ")}</small></button>))}
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
              <div style={{ background: "#fff", border: "1.5px solid #ecd2cc", borderRadius: 14, padding: 18, fontSize: 15.5, lineHeight: 1.9 }}>
                <b>{svc}</b><br />{days[day]?.label} às {time}<br /><span style={{ color: MU, fontSize: 14 }}>{brand}, {city}</span>
              </div>
              <input value={cust} onChange={(e) => setCust(e.target.value)} placeholder="Seu nome" aria-label="Seu nome" style={{ width: "100%", marginTop: 14, minHeight: 50, padding: "0 16px", border: "1.5px solid #ecd2cc", borderRadius: 14, fontSize: 15.5, background: "#fff" }} />
            </div>)}
            <div style={{ display: "flex", gap: 10, marginTop: 22, justifyContent: "space-between" }}>
              {step > 1 ? <button type="button" className="pill" style={{ background: "#fff", border: "1.5px solid #ecd2cc" }} onClick={() => setStep(step - 1)}>Voltar</button> : <span />}
              {step < 3 ? (
                <button type="button" className="dkb" disabled={step === 2 && !time} style={{ opacity: step === 2 && !time ? 0.4 : 1 }} onClick={() => setStep(step + 1)}>Continuar</button>
              ) : (
                <a className="dkb" href={wa} target="_blank" rel="noreferrer">Confirmar no WhatsApp</a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
