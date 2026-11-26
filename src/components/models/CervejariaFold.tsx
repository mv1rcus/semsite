import { useEffect, useState } from "react";

/** Cervejaria artesanal construida do zero a partir de um pin escuro com tipografia gigante em contorno, cards inclinados e circulos de ingredientes. Sem fotos: tudo em SVG e tipografia. Reserva de mesa que fecha no WhatsApp. */
const BG = "#120d08", CREAM = "#f3e3c8", AMB = "#e5a53a", MUT = "#c9b79a", LINE = "#3a2d1e";
const RULES = [
  { t: "Sem xarope de atalho", d: "O malte é moído aqui às seis da manhã e mexido na mão. O bagaço vai para um sítio da serra, e os porcos têm opinião." },
  { t: "Sem lager apressada", d: "Nossas lagers descansam perto de zero grau por seis semanas. Cervejaria grande chamaria de tanque parado. A gente chama de motivo do sabor limpo." },
  { t: "Sem lúpulo velho", d: "O lúpulo chega selado a vácuo e é usado dentro do mês. O que passa disso vai para casa com a equipe, que não reclama." },
  { t: "Sem filtrar até morrer", d: "Filtramos o bastante para ficar brilhante, nunca o bastante para ficar sem graça. Se tem gosto de comunicado, não sai do tanque." },
];
const TAPS = [
  { n: "01", name: "Fumaça Doce", st: "Porter defumada", abv: "6,2%", ibu: "28 IBU", pr: "R$ 22", c: "#3a1f10" },
  { n: "02", name: "Neblina Estática", st: "Hazy IPA", abv: "6,8%", ibu: "45 IBU", pr: "R$ 26", c: "#e5a53a" },
  { n: "03", name: "Seis Semanas", st: "Pilsen curta", abv: "4,8%", ibu: "22 IBU", pr: "R$ 18", c: "#f1cf6a" },
  { n: "04", name: "Casca de Laranja", st: "Witbier", abv: "5,0%", ibu: "14 IBU", pr: "R$ 20", c: "#f0b85a" },
];
const AGENDA = [
  { d: "QUI", t: "Noite do barril aberto", h: "19h · cada barril, uma receita nova" },
  { d: "SEX", t: "Música ao vivo na cervejaria", h: "20h · entrada livre" },
  { d: "SÁB", t: "Visita guiada à fábrica", h: "14h · degustação de 4 copos incluída" },
];

const Glass = ({ c, s = 120 }: { c: string; s?: number }) => (
  <svg width={s} height={s * 1.3} viewBox="0 0 100 130" aria-hidden>
    <path d="M18 8h64l-7 112a8 8 0 0 1-8 7H33a8 8 0 0 1-8-7z" fill={c} stroke={CREAM} strokeWidth="3" />
    <path d="M18 8h64l-1.500 24H19.500z" fill={CREAM} />
    <path d="M30 40l4 70M44 40l2 70" stroke={CREAM} strokeOpacity=".3" strokeWidth="3" strokeLinecap="round" />
    <circle cx="62" cy="80" r="3" fill={CREAM} opacity=".5" /><circle cx="56" cy="62" r="2" fill={CREAM} opacity=".5" /><circle cx="66" cy="98" r="2" fill={CREAM} opacity=".5" />
  </svg>
);
const HeroArt = () => (
  <div className="hart" role="img" aria-label="Copo de cerveja âmbar em um círculo dourado, cercado por ingredientes">
    <svg viewBox="0 0 520 440" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <defs><clipPath id="cpEl"><ellipse cx="260" cy="230" rx="62" ry="170" /></clipPath></defs>
      <circle cx="260" cy="230" r="170" fill={AMB} />
      <image href="/cald-copo.webp" x="198" y="60" width="124" height="340" preserveAspectRatio="xMidYMid slice" clipPath="url(#cpEl)" />
      <circle cx="362" cy="352" r="36" fill={CREAM} />
    </svg>
    <img src="/cald-graos.webp" alt="" style={{ position: "absolute", left: "-34%", top: "32%", width: "18%", borderRadius: "50%", objectFit: "cover", aspectRatio: "1" }} />
    <img src="/cald-ouro.webp" alt="" style={{ position: "absolute", left: "72%", top: "9%", width: "19%", borderRadius: "50%", objectFit: "cover", aspectRatio: "1" }} />
  </div>
);
const DISC = { grain: "/cald-trigo.webp", hop: "/cald-lupulo.webp", citrus: "/cald-bokeh.webp", malt: "/cald-cevada.webp" };
const Disc = ({ k }: { k: "grain" | "hop" | "citrus" | "malt" }) => (
  <img src={DISC[k]} alt="" aria-hidden style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", aspectRatio: "1", display: "block" }} />
);

export function CervejariaFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Caldeira Brava";
  const city = client?.city?.trim() || "Blumenau";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const wa = (what?: string) => `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero ${what ?? "reservar uma mesa"} na ${brand}.`)}`;

  return (
    <div className="cv" style={{ fontFamily: "'Archivo', system-ui, sans-serif", color: CREAM, background: BG, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;500;600;700&display=swap');
        .cv *{box-sizing:border-box}
        .cv a,.cv button{font-family:inherit}
        .cv .an{font-family:Anton,Impact,sans-serif;font-weight:400;text-transform:uppercase;letter-spacing:.005em;line-height:.95}
        .cv .out{color:transparent;-webkit-text-stroke:2px ${CREAM}}
        .cv .wrap{max-width:1080px;margin:0 auto;padding:0 28px}
        .cv .nav{display:flex;align-items:center;justify-content:space-between;height:68px;padding:0 32px;gap:20px;position:relative}
        .cv .logo{font-family:Anton,sans-serif;font-size:22px;text-transform:uppercase;line-height:1}
        .cv .logo small{display:block;font-family:Archivo;font-size:9.5px;letter-spacing:.2em;color:${MUT};margin-top:3px;font-weight:500}
        .cv .links{display:flex;gap:26px;font-family:Anton,sans-serif;font-size:14px;letter-spacing:.04em;text-transform:uppercase}
        .cv .links a{color:${CREAM};cursor:pointer;border-bottom:1.5px solid ${CREAM};padding-bottom:1px}
        .cv .btn{background:${CREAM};color:${BG};border:0;border-radius:6px;padding:0 20px;min-height:46px;font-family:Anton,sans-serif;font-size:15px;letter-spacing:.05em;text-transform:uppercase;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;text-decoration:none}
        .cv .btn:hover{background:#fff}.cv .btn.s{min-height:40px;padding:0 18px;font-size:14.5px}.cv .tap .btn.s{min-height:46px;padding:0 30px;font-size:16px}
        .cv .btn.am{background:${AMB}}
        .cv .burger{display:none;background:none;border:0;width:44px;height:44px;cursor:pointer}
        .cv .mmenu{position:absolute;top:68px;left:12px;right:12px;background:#1d140c;border:1px solid ${LINE};border-radius:10px;padding:8px;z-index:9;display:flex;flex-direction:column}
        .cv .mmenu a{padding:14px 12px;font-family:Anton;text-transform:uppercase;letter-spacing:.04em;cursor:pointer}
        .cv .hero{text-align:center;padding:30px 20px 0;position:relative}
        .cv .hero h1{margin:0}
        .cv .h1a{font-size:clamp(34px,7.4vw,86px);display:block;color:transparent;-webkit-text-stroke:2px ${CREAM}}
        .cv .h1b{font-size:clamp(44px,10.2vw,124px);display:block;margin-top:4px}
        .cv .hart{position:relative;width:min(520px,86%);aspect-ratio:520/440;display:block;margin:-6px auto 0}
        .cv .strip{display:grid;grid-template-columns:1fr auto 1fr;gap:22px;align-items:center;margin:34px auto 0;max-width:1200px;padding:0 28px;font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;font-weight:600;color:#ecdcc0}
        .cv .strip .l{border-top:1.5px dotted #6b5a42;position:relative;height:0}
        .cv .strip .l span{position:absolute;top:-8px;background:${BG};padding:0 12px;white-space:nowrap}
        .cv .strip .l.r span{right:0}
        .cv .strip .mid{display:flex;gap:16px;align-items:center}
        .cv .strip .mid a:last-child{color:${CREAM};border-bottom:1.5px solid ${CREAM};text-decoration:none;font-family:Anton;font-size:13px;letter-spacing:.06em;padding-bottom:1px}
        .cv .sec{padding:120px 0 0}
        .cv .t2{font-size:clamp(34px,5.6vw,66px);line-height:1.08;text-align:center;margin:0 0 56px}
        .cv .rules{position:relative;max-width:410px;margin:0 auto}
        .cv .rule{background:#17100a;border:1px solid ${LINE};border-radius:10px;margin-bottom:-4px}
        .cv .rule h3{margin:0;background:${CREAM};color:${BG};font-family:Anton;font-weight:400;text-transform:uppercase;font-size:19px;padding:12px 18px;border-radius:8px 8px 0 0;display:flex;justify-content:space-between;align-items:center}
        .cv .rule h3:before,.cv .rule h3:after{content:"";width:6px;height:6px;border-radius:50%;background:${BG}}
        .cv .rule p{margin:0;padding:20px 26px 26px;font-size:17px;line-height:1.5;text-align:center;color:#ece0c9}
        .cv .rule:nth-child(1){transform:rotate(-1.200deg)}.cv .rule:nth-child(2){transform:translateX(56px) rotate(1deg)}.cv .rule:nth-child(3){transform:translateX(-10px) rotate(-1.500deg)}.cv .rule:nth-child(4){transform:translateX(46px) rotate(1.200deg)}
        .cv .discs{position:absolute;top:0;bottom:0;left:calc(50% - 50vw);width:100vw;pointer-events:none}
        
        .cv .dr{display:none;justify-content:center;gap:14px;margin:-22px 0 26px}.cv .dr img{width:52px!important;height:52px!important;flex:none}
        .cv .rwrap{position:relative;max-width:900px;margin:0 auto;padding-bottom:10px}
        .cv .pour{text-align:center;padding:130px 0 0}
        .cv .pour .a{font-size:clamp(28px,4vw,46px)}
        .cv .pour .b{font-size:clamp(70px,20vw,250px);line-height:.9;letter-spacing:-.01em;display:block;margin-top:6px}
        .cv .taps{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:44px}
        .cv .tap{background:#1a120b;border:1px solid ${LINE};border-radius:12px;padding:22px 18px 20px;text-align:center;display:flex;flex-direction:column;align-items:center}
        .cv .tap .n{font-family:Anton;font-size:44px;color:transparent;-webkit-text-stroke:1.5px ${AMB};line-height:1}
        .cv .tap b{font-family:Anton;font-weight:400;text-transform:uppercase;font-size:24px;margin:10px 0 2px}
        .cv .tap .st{font-size:13px;color:${MUT};letter-spacing:.08em;text-transform:uppercase;margin-bottom:14px}
        .cv .tap .m{display:flex;gap:10px;font-size:14.5px;font-weight:500;color:#e2d2b5;margin:12px 0 4px}
        .cv .tap .pr{font-family:Anton;font-size:24px;color:${AMB};margin-bottom:14px}
        .cv .ag{display:grid;gap:0;margin-top:40px;border-top:1px solid ${LINE}}
        .cv .ag div{display:grid;grid-template-columns:90px 1fr auto;gap:20px;align-items:center;padding:22px 4px;border-bottom:1px solid ${LINE}}
        .cv .ag .d{font-family:Anton;font-size:34px;color:${AMB}}
        .cv .ag b{font-family:Anton;font-weight:400;text-transform:uppercase;font-size:22px;display:block}
        .cv .ag span{color:${MUT};font-size:14.5px}
        .cv .cta{text-align:center;padding:130px 20px 100px}
        .cv .cta p{max-width:520px;margin:20px auto 28px;color:${MUT};font-size:17px;line-height:1.5}
        .cv .foot{border-top:1px solid ${LINE};display:grid;grid-template-columns:1.2fr 1fr 1fr 1fr;gap:26px;padding:36px 32px;font-size:14.5px;line-height:1.6;color:${MUT};max-width:1240px;margin:0 auto}
        .cv .foot b{color:${CREAM}}
        .cv .wa{position:fixed;right:18px;bottom:18px;z-index:40;width:58px;height:58px;border-radius:50%;background:#25d366;display:grid;place-items:center;box-shadow:0 8px 24px rgba(0,0,0,.5)}
        @media(max-width:900px){.cv .taps{grid-template-columns:1fr 1fr}.cv .strip{grid-template-columns:1fr;text-align:center}.cv .strip .l{display:none}}
        @media(max-width:760px){
          .cv .links,.cv .nav .btn{display:none}.cv .burger{display:block}.cv .nav{padding:0 12px 0 18px}
          .cv .wrap{padding:0 20px}.cv .sec{padding-top:76px}.cv .pour{padding-top:84px}
          .cv .out,.cv .h1a{-webkit-text-stroke-width:1.5px}
          .cv .rwrap{max-width:350px}.cv .rules{max-width:270px;margin-left:0}.cv .rule h3{font-size:15px;padding:10px 14px}.cv .rule p{font-size:14px;padding:16px 18px 20px}
          .cv .rule:nth-child(2){transform:translateX(40px) rotate(1deg)}.cv .rule:nth-child(4){transform:translateX(34px) rotate(1.200deg)}
          .cv .discs{display:none}.cv .dr{display:flex!important}
          .cv .taps{grid-template-columns:1fr}
          .cv .ag div{grid-template-columns:62px 1fr;gap:12px}.cv .ag .btn{grid-column:2;justify-self:start}
          .cv .foot{grid-template-columns:1fr 1fr;padding:30px 20px}
          .cv .cta{padding:84px 20px 70px}
        }
      `}</style>

      <div className="nav" id="top">
        <div className="logo">{brand}<small>CERVEJARIA ARTESANAL</small></div>
        <div className="links"><a onClick={() => go("regras")}>Receita</a><a onClick={() => go("torneira")}>Torneira</a><a onClick={() => go("agenda")}>Agenda</a><a onClick={() => go("reservas")}>Visite</a></div>
        <a className="btn s" href={wa()} target="_blank" rel="noreferrer">Reservar mesa</a>
        <button type="button" className="burger" aria-label="Menu" onClick={() => setMenu((m) => !m)}><svg width="26" height="26" viewBox="0 0 26 26" stroke={CREAM} strokeWidth="2"><path d="M3 7h20M3 13h20M3 19h20" /></svg></button>
        {menu && <div className="mmenu"><a onClick={() => go("torneira")}>Torneira</a><a onClick={() => go("agenda")}>Agenda</a><a onClick={() => go("reservas")}>Reservar mesa</a></div>}
      </div>

      <div className="hero">
        <h1 className="an"><span className="h1a">A chaleira é brava.</span><span className="h1b">A cerveja é mais.</span></h1>
        <HeroArt />
      </div>
      <div className="strip"><div className="l"><span>NA TORNEIRA · 04</span></div><div className="mid"><a className="btn" href="#torneira" onClick={(e) => { e.preventDefault(); go("torneira"); }}>Ver a torneira</a><a href="#reservas" onClick={(e) => { e.preventDefault(); go("reservas"); }}>ONDE FICA</a></div><div className="l r"><span>NEBLINA ESTÁTICA · HAZY IPA 6,8%</span></div></div>

      <div className="wrap sec" id="regras">
        <h2 className="an t2">Quatro coisas que nunca entram na chaleira</h2>
        <div className="dr"><Disc k="grain" /><Disc k="hop" /><Disc k="malt" /><Disc k="citrus" /></div>
        <div className="rwrap">
          <div className="discs">
            <div style={{ position: "absolute", left: "6%", top: "2%", width: "17vw", height: "17vw" }}><Disc k="grain" /></div>
            <div style={{ position: "absolute", right: "9%", top: "16%", width: "11vw", height: "11vw" }}><Disc k="hop" /></div>
            <div style={{ position: "absolute", left: "13%", top: "58%", width: "10vw", height: "10vw" }}><Disc k="malt" /></div>
            <div style={{ position: "absolute", right: "6%", top: "74%", width: "18vw", height: "18vw" }}><Disc k="citrus" /></div>
          </div>
          <div className="rules">{RULES.map((r) => (<div className="rule" key={r.t}><h3>{r.t}</h3><p>{r.d}</p></div>))}</div>
        </div>
      </div>

      <div className="wrap pour" id="torneira">
        <span className="an a">O que está</span>
        <span className="an out b">Saindo</span>
        <div className="taps">{TAPS.map((t) => (
          <div className="tap" key={t.n}>
            <span className="n">{t.n}</span>
            <Glass c={t.c} s={104} />
            <b>{t.name}</b><div className="st">{t.st}</div>
            <div className="m"><span>{t.abv}</span><span>·</span><span>{t.ibu}</span></div>
            <div className="pr">{t.pr}</div>
            <a className="btn s am" href={wa(`pedir um copo de ${t.name}`)} target="_blank" rel="noreferrer">Quero</a>
          </div>))}
        </div>
      </div>

      <div className="wrap sec" id="agenda">
        <h2 className="an t2" style={{ marginBottom: 0 }}>Semana na fábrica</h2>
        <div className="ag">{AGENDA.map((a) => (<div key={a.d}><span className="d">{a.d}</span><div style={{ display: "block", padding: 0, border: 0 }}><b>{a.t}</b><span>{a.h}</span></div><a className="btn s" href={wa(`garantir lugar em: ${a.t.toLowerCase()}`)} target="_blank" rel="noreferrer">Garantir lugar</a></div>))}</div>
      </div>

      <div className="cta" id="reservas">
        <h2 className="an" style={{ fontSize: "clamp(40px,8vw,96px)", margin: 0 }}>Sua mesa <span className="out">na fábrica</span></h2>
        <p>Reserve pelo WhatsApp. Segunda a quinta das 17h às 23h, sexta e sábado das 14h à 1h.</p>
        <a className="btn am" href={wa()} target="_blank" rel="noreferrer">Reservar pelo WhatsApp</a>
      </div>

      <div className="foot">
        <div><b className="an" style={{ fontSize: 22 }}>{brand}</b><br />Cervejaria artesanal e taproom</div>
        <div><b>Endereço</b><br />Rua das Chaminés, 48, {city}</div>
        <div><b>Horário</b><br />Seg a qui, 17h às 23h · Sex e sáb, 14h à 1h</div>
        <div><b>Contato</b><br />WhatsApp: {phone || "(00) 00000-0000"}</div>
      </div>
      {sc && <a className="wa" href={wa()} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg></a>}
    </div>
  );
}
