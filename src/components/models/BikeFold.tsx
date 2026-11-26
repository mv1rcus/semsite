import { useEffect, useState } from "react";

/** Bicicletaria construida do zero a partir de um pin branco com mancha amarela, ilustracao em traco preto e titulo gigante. Sem fotos: ciclista e bikes desenhados em SVG. Pedido que fecha no WhatsApp. */
const Y = "#ffc400", INK = "#111111", MUT = "#3d3d3d", LINE = "#e6e2d6";
const SERVICES = [
  { t: "Loja de bikes", d: "Urbanas, mountain bikes e speed, novas e seminovas, com garantia e ajuste de medida.", ic: "M6 22a6 6 0 1 0 0 .1M26 22a6 6 0 1 0 0 .1M6 22l6-10h8l6 10M12 12l4 10M10 8h4" },
  { t: "Oficina", d: "Revisão, freios, câmbio e rolamentos. Sua bike pronta no mesmo dia, com orçamento antes de mexer.", ic: "M8 24l10-10M22 6a5 5 0 0 0-5 7l-9 9a2.500 2.500 0 0 0 4 4l9-9a5 5 0 0 0 7-5l-3 3-3-1-1-3z" },
  { t: "Passeios", d: "Pedal de domingo em grupo, para quem está começando e para quem já ama a estrada.", ic: "M16 4v6M16 22v6M4 16h6M22 16h6M8 8l4 4M20 20l4 4M24 8l-4 4M12 20l-4 4" },
];
const BIKES = [
  { n: "Urbana Brisa", t: "Urbana", p: "R$ 1.890", d: "Quadro de alumínio, 7 marchas, paralama e cestinha.", k: 0 },
  { n: "Serra 29", t: "Mountain bike", p: "R$ 3.490", d: "Suspensão dianteira, 21 marchas e freio a disco.", k: 1 },
  { n: "Estrada Leve", t: "Speed", p: "R$ 4.290", d: "Quadro leve, guidão curvo e 16 marchas.", k: 2 },
];
const PRICES = [
  ["Revisão básica", "R$ 60"], ["Regulagem de freios", "R$ 35"], ["Troca de câmara", "R$ 25"], ["Regulagem de câmbio", "R$ 40"], ["Revisão completa", "R$ 160"], ["Montagem de bike nova", "R$ 90"],
];
const RIDES = [
  { d: "DOM", t: "Pedal da manhã", h: "7h · 25 km · ritmo leve · saída da loja" },
  { d: "QUA", t: "Pedal noturno", h: "19h30 · 18 km · luzes obrigatórias" },
  { d: "SÁB", t: "Escola de pedal", h: "9h · aprenda a pedalar e a trocar câmara" },
];

const Wheel = ({ cx, cy, r }: { cx: number; cy: number; r: number }) => (
  <g stroke={INK} strokeWidth="5" strokeLinecap="round" fill="none">
    <circle cx={cx} cy={cy} r={r} />
    <circle cx={cx} cy={cy} r={r - 7} strokeWidth="2" opacity=".5" />
    {Array.from({ length: 12 }).map((_, i) => { const a = (i * Math.PI) / 6; return <line key={i} x1={cx} y1={cy} x2={cx + Math.cos(a) * (r - 4)} y2={cy + Math.sin(a) * (r - 4)} strokeWidth="1.800" />; })}
    <circle cx={cx} cy={cy} r="8" fill="#fff" />
  </g>
);
const Limb = ({ d, w = 22 }: { d: string; w?: number }) => (
  <g fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} stroke={INK} strokeWidth={w + 8} />
    <path d={d} stroke={Y} strokeWidth={w} />
  </g>
);
const Rider = () => (
  <svg viewBox="0 0 520 430" className="rider" role="img" aria-label="Ilustração de um ciclista de lenço amarelo ao vento">
    <ellipse cx="260" cy="402" rx="230" ry="7" fill={INK} opacity=".85" />
    <Wheel cx={112} cy={304} r={92} />
    <Wheel cx={408} cy={304} r={92} />
    <g stroke={INK} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none">
      {/* quadro: tubo do selim, tubo superior, tubo diagonal, bainhas */}
      <path d="M250 304L222 204M222 204L352 200M352 200L250 304M222 204L112 304M250 304L112 304" />
      {/* garfo e mesa */}
      <path d="M352 196L366 236L408 304M352 196L350 178L384 172" />
      {/* canote e selim */}
      <path d="M222 204L216 184" />
      <path d="M192 182h50" strokeWidth="11" />
      {/* pedivela */}
      <circle cx="250" cy="304" r="15" fill="#fff" />
      <path d="M250 304L280 332M250 304L220 276" />
      <path d="M268 336h26M208 272h26" strokeWidth="10" />
    </g>
    {/* perna de tras */}
    <Limb d="M226 186L238 246L224 280" />
    {/* bermuda */}
    <path d="M206 168c-10 20-6 44 20 52 26 8 46-6 52-26l-28-30z" fill={INK} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
    {/* perna da frente */}
    <Limb d="M236 190L296 246L282 330" />
    {/* tronco */}
    <g fill="none" strokeLinecap="round">
      <path d="M222 180L318 132" stroke={INK} strokeWidth="58" />
      <path d="M222 180L318 132" stroke="#fff" strokeWidth="50" />
      <path d="M252 148l40 10" stroke={INK} strokeWidth="3" />
    </g>
    {/* braco */}
    <Limb d="M316 138L346 164L382 174" w={14} />
    {/* cabeca */}
    <circle cx="352" cy="92" r="27" fill={Y} stroke={INK} strokeWidth="6" />
    <path d="M326 86c-2-26 22-40 40-30 12 6 18 20 12 32z" fill="#fff" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
    <g fill={INK}>{[[330, 62], [346, 54], [362, 56], [374, 66], [324, 74]].map(([x, y], i) => (<circle key={i} cx={x} cy={y} r="10" />))}</g>
    <circle cx="364" cy="98" r="3" fill={INK} />
    <path d="M372 108l8 3" stroke={INK} strokeWidth="4" strokeLinecap="round" fill="none" />
    {/* lenço */}
    <path d="M330 108C300 88 272 100 242 82C212 64 190 78 150 58L142 84C190 98 212 88 242 108C272 128 300 118 326 134z" fill={Y} stroke={INK} strokeWidth="5" strokeLinejoin="round" />
    <path d="M150 58L142 84" stroke={INK} strokeWidth="5" />
    <path d="M30 160h18M50 224h26M14 270h22" stroke={INK} strokeWidth="5" strokeLinecap="round" />
  </svg>
);
const BikeLine = ({ k }: { k: number }) => (
  <svg viewBox="0 0 300 190" className="bk" aria-hidden>
    <g stroke={INK} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <circle cx="64" cy="124" r={k === 1 ? 52 : 48} /><circle cx="236" cy="124" r={k === 1 ? 52 : 48} />
      <circle cx="64" cy="124" r="5" fill={INK} /><circle cx="236" cy="124" r="5" fill={INK} />
      {k === 0 && <path d="M64 124l56 4-18-62h82l-44 62M164 66l-6-20 24-4M104 60l-4-14M98 46h24M236 124l-40-58" />}
      {k === 1 && <path d="M64 124l58 2-20-66h86l-48 66M170 60l-4-22 28-6M236 124l-62-62M206 78l-6-10M104 56h30M180 88l56 36" />}
      {k === 2 && <path d="M64 124l60 2-14-64h92l-56 64M168 62l12-20h26c10 2 14 12 6 18M236 124l-56-62M104 56h32" />}
    </g>
  </svg>
);

export function BikeFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Roda Livre";
  const city = client?.city?.trim() || "Porto Alegre";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const wa = (what?: string) => `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero ${what ?? "saber mais sobre bikes"} na ${brand}.`)}`;

  return (
    <div className="bk0" style={{ fontFamily: "Montserrat, system-ui, sans-serif", color: INK, background: "#fff", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');
        .bk0 *{box-sizing:border-box}
        .bk0 a,.bk0 button{font-family:inherit}
        .bk0 .wrap{max-width:1120px;margin:0 auto;padding:0 32px}
        .bk0 .nav{display:flex;align-items:center;justify-content:space-between;height:74px;padding:0 40px;position:relative;z-index:5}
        .bk0 .logo{font-family:'Times New Roman',Georgia,serif;font-weight:700;font-size:20px;letter-spacing:.04em;text-transform:uppercase}
        .bk0 .links{display:flex;gap:42px;font-size:13px;font-weight:700}
        .bk0 .links a{color:${INK};cursor:pointer}
        .bk0 .ico{display:flex;gap:18px;align-items:center;font-size:13px;font-weight:700}
        .bk0 .btn{background:${Y};color:${INK};border:0;border-radius:999px;padding:0 34px;min-height:54px;font-weight:800;font-size:13.5px;letter-spacing:.02em;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;text-decoration:none;text-transform:uppercase}
        .bk0 .btn:hover{filter:brightness(.96)}
        .bk0 .btn.k{background:${INK};color:#fff}
        .bk0 .burger{display:none;background:none;border:0;width:44px;height:44px;cursor:pointer}
        .bk0 .mmenu{position:absolute;top:70px;left:12px;right:12px;background:#fff;border:2px solid ${INK};border-radius:14px;padding:8px;z-index:30;display:flex;flex-direction:column}
        .bk0 .mmenu a{padding:14px 12px;font-weight:800;cursor:pointer}
        .bk0 .hero{position:relative;min-height:620px;display:grid;grid-template-columns:1.05fr 1fr;align-items:center;margin-top:-74px;padding:74px 40px 40px 0}
        .bk0 .blob{position:absolute;left:0;top:0;width:62%;height:100%;z-index:0}
        .bk0 .rider{position:relative;z-index:1;width:100%;max-width:720px;height:auto;margin-left:-10px}
        .bk0 .ht{position:relative;z-index:2;padding-left:10px}
        .bk0 h1{font-family:'Montserrat',system-ui,sans-serif;font-weight:800;font-size:clamp(38px,5vw,66px);line-height:1.08;letter-spacing:-.02em;margin:0 0 26px;text-align:right}
        .bk0 .ht p{font-size:14.5px;line-height:1.75;color:${MUT};margin:0 0 30px;text-align:right;max-width:440px;margin-left:auto}
        .bk0 .acts{display:flex;gap:18px;justify-content:flex-end;align-items:center}
        .bk0 .play{width:54px;height:54px;border-radius:50%;border:2px solid ${INK};display:grid;place-items:center;background:#fff;cursor:pointer}
        .bk0 .dots{display:flex;gap:10px;justify-content:flex-end;margin-top:60px}.bk0 .dots i{width:12px;height:12px;border-radius:50%;background:#fff;border:2px solid #111}.bk0 .dots i:first-child{background:#111}
        .bk0 .sec{padding:100px 0 0}
        .bk0 h2{font-weight:900;font-size:clamp(30px,4vw,48px);letter-spacing:-.03em;line-height:1.08;margin:0 0 16px}
        .bk0 .lead{font-size:16px;line-height:1.7;color:${MUT};max-width:520px;margin:0 0 44px}
        .bk0 .sv{display:grid;grid-template-columns:repeat(3,1fr);gap:26px}
        .bk0 .sv div{border:2px solid ${INK};border-radius:22px;padding:30px 26px;background:#fff;box-shadow:6px 6px 0 ${Y}}
        .bk0 .sv i{display:grid;place-items:center;width:62px;height:62px;border-radius:50%;background:${Y};margin-bottom:18px}
        .bk0 .sv b{font-size:20px;font-weight:800;display:block;margin-bottom:8px}
        .bk0 .sv span{font-size:14.5px;line-height:1.65;color:${MUT}}
        .bk0 .bg{display:grid;grid-template-columns:repeat(3,1fr);gap:26px}
        .bk0 .bc{border-radius:24px;background:#fff3c4;padding:22px 22px 26px;position:relative}
        .bk0 .bc:nth-child(2){background:${Y}}
        .bk0 .bk{width:100%;height:auto;display:block;margin-bottom:10px}
        .bk0 .bc small{font-size:11.5px;letter-spacing:.14em;text-transform:uppercase;font-weight:700;color:${MUT}}
        .bk0 .bc:nth-child(2) small{color:#5a4600}
        .bk0 .bc b{display:block;font-size:22px;font-weight:900;margin:4px 0 6px;letter-spacing:-.02em}
        .bk0 .bc p{font-size:14px;line-height:1.55;color:#444;margin:0 0 16px}
        .bk0 .bc .pr{font-weight:900;font-size:24px;letter-spacing:-.02em;display:flex;justify-content:space-between;align-items:center}
        .bk0 .bc .pr a{font-size:13px;font-weight:800;text-transform:uppercase;color:#fff;background:${INK};border-radius:999px;padding:10px 18px;text-decoration:none;letter-spacing:.03em}
        .bk0 .of{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start}
        .bk0 .pl{list-style:none;margin:0;padding:0}
        .bk0 .pl li{display:flex;gap:10px;align-items:baseline;padding:14px 0;font-weight:700;font-size:16px}
        .bk0 .pl li:before{content:"";order:2;flex:1;border-bottom:2px dotted #bbb;transform:translateY(-4px)}
        .bk0 .pl li span{order:1}.bk0 .pl li b{order:3;font-weight:900}
        .bk0 .rd{margin-top:100px;background:${Y};padding:80px 0;position:relative;overflow:hidden}
        .bk0 .rd:before{content:"PEDALA";position:absolute;right:-20px;top:-26px;font-weight:900;font-size:clamp(120px,24vw,320px);letter-spacing:-.05em;color:#fff;opacity:.3;line-height:1}
        .bk0 .rl{position:relative;display:grid;gap:0;margin-top:30px}
        .bk0 .rl>div{display:grid;grid-template-columns:96px 1fr auto;gap:22px;align-items:center;padding:20px 0;border-top:2px solid ${INK}}
        .bk0 .rl .d{font-weight:900;font-size:34px;letter-spacing:-.03em}
        .bk0 .rl b{font-size:20px;font-weight:900;display:block}.bk0 .rl span{font-size:14.5px;font-weight:500}
        .bk0 .cta{text-align:center;padding:110px 24px}
        .bk0 .cta h2{font-size:clamp(40px,7vw,86px);margin:0 0 18px}
        .bk0 .cta p{max-width:480px;margin:0 auto 28px;color:${MUT};font-size:16px;line-height:1.7}
        .bk0 .foot{background:${INK};color:#d4d0c4;display:grid;grid-template-columns:1.2fr 1fr 1fr 1fr;gap:26px;padding:38px 40px;font-size:14px;line-height:1.7}
        .bk0 .foot b{color:#fff}
        .bk0 .wa{position:fixed;right:18px;bottom:18px;z-index:40;width:58px;height:58px;border-radius:50%;background:#25d366;display:grid;place-items:center;box-shadow:0 8px 24px rgba(0,0,0,.3)}
        @media(max-width:960px){.bk0 .hero{grid-template-columns:1fr;padding:74px 20px 30px;min-height:0}.bk0 .blob{width:100%;height:62%}.bk0 .rider{margin:20px auto 0;display:block;max-width:480px}.bk0 h1,.bk0 .ht p{text-align:left}.bk0 .ht p{margin-left:0}.bk0 .acts,.bk0 .dots{justify-content:flex-start}.bk0 .sv,.bk0 .bg,.bk0 .of{grid-template-columns:1fr}.bk0 .of{gap:30px}}
        @media(max-width:760px){
          .bk0 .links,.bk0 .ico .btn,.bk0 .ico span{display:none}.bk0 .burger{display:block}.bk0 .nav{padding:0 12px 0 20px}
          .bk0 .wrap{padding:0 20px}.bk0 .sec{padding-top:70px}.bk0 .rd{margin-top:70px;padding:60px 0}
          .bk0 .rl>div{grid-template-columns:74px 1fr;gap:12px}.bk0 .rl .d{font-size:26px}.bk0 .rl .btn{grid-column:2;justify-self:start}
          .bk0 .cta{padding:80px 20px}.bk0 .foot{grid-template-columns:1fr 1fr;padding:30px 20px}
          .bk0 .acts{flex-wrap:wrap}.bk0 .dots{margin-top:36px}
        }
      `}</style>

      <div className="nav" id="top">
        <div className="logo">{brand}</div>
        <div className="links"><a onClick={() => go("servicos")}>Serviços</a><a onClick={() => go("bikes")}>Bikes</a><a onClick={() => go("oficina")}>Oficina</a><a onClick={() => go("passeios")}>Passeios</a></div>
        <div className="ico"><span>Entrar</span><a className="btn s" style={{ minHeight: 40, padding: "0 20px", background: "#fff", border: "2px solid #111" }} href={wa()} target="_blank" rel="noreferrer">Falar com a loja</a></div>
        <button type="button" className="burger" aria-label="Menu" onClick={() => setMenu((m) => !m)}><svg width="26" height="26" viewBox="0 0 26 26" stroke={INK} strokeWidth="2.500"><path d="M3 7h20M3 13h20M3 19h20" /></svg></button>
        {menu && <div className="mmenu"><a onClick={() => go("bikes")}>Bikes</a><a onClick={() => go("oficina")}>Oficina</a><a onClick={() => go("passeios")}>Passeios</a></div>}
      </div>

      <div className="hero">
        <svg className="blob" viewBox="0 0 700 640" preserveAspectRatio="none" aria-hidden><path d="M0 0H470c120 70 150 190 90 290-24 40-10 90 40 120 50 30 40 100-40 130-60 20-140 20-200 100H0z" fill={Y} /></svg>
        <Rider />
        <div className="ht">
          <h1>O mundo é seu.<br />Pedala!</h1>
          <p>Bikes novas e seminovas, oficina com orçamento antes de mexer e passeios em grupo toda semana em {city}. Para quem quer começar e para quem nunca parou.</p>
          <div className="acts"><a className="play" href="#passeios" onClick={(e) => { e.preventDefault(); go("passeios"); }} aria-label="Ver passeios" title="Ver passeios"><svg width="16" height="18" viewBox="0 0 16 18"><path d="M2 1l13 8-13 8z" fill={INK} /></svg></a><a className="btn" href={wa("uma bike")} target="_blank" rel="noreferrer">Quero uma bike</a></div>
          <div className="dots"><i /><i /><i /><i /></div>
        </div>
      </div>

      <div className="wrap sec" id="servicos">
        <h2>Tudo para você pedalar mais</h2>
        <p className="lead">Loja, oficina e grupo de pedal no mesmo endereço, com gente que pedala de verdade.</p>
        <div className="sv">{SERVICES.map((s) => (<div key={s.t}><i><svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke={INK} strokeWidth="2.200" strokeLinecap="round" strokeLinejoin="round"><path d={s.ic} /></svg></i><b>{s.t}</b><span>{s.d}</span><a style={{ display: "block", marginTop: 14, fontWeight: 800, fontSize: 14, color: INK, textDecoration: "underline", textDecorationColor: Y, textDecorationThickness: 3, textUnderlineOffset: 4 }} href={wa(s.t.toLowerCase())} target="_blank" rel="noreferrer">Ver opções →</a></div>))}</div>
      </div>

      <div className="wrap sec" id="bikes">
        <h2>Bikes que valem cada pedalada</h2>
        <p className="lead">Montadas e reguladas na casa. Parcelamos em até 10 vezes e a primeira revisão é por nossa conta.</p>
        <div className="bg">{BIKES.map((b) => (<div className="bc" key={b.n}><BikeLine k={b.k} /><small>{b.t}</small><b>{b.n}</b><p>{b.d}</p><div className="pr"><span>{b.p}</span><a href={wa(`a bike ${b.n}`)} target="_blank" rel="noreferrer">Quero</a></div></div>))}</div>
      </div>

      <div className="wrap sec" id="oficina">
        <div className="of">
          <div><h2>Oficina com preço na parede</h2><p className="lead" style={{ marginBottom: 0 }}>Você vê o valor antes de deixar a bike. Se aparecer algo a mais, a gente liga e só mexe com o seu aval.</p></div>
          <ul className="pl">{PRICES.map(([n, p]) => (<li key={n}><span>{n}</span><b>{p}</b></li>))}</ul>
        </div>
      </div>

      <div className="rd" id="passeios">
        <div className="wrap" style={{ position: "relative" }}>
          <h2>Passeios da semana</h2>
          <div className="rl">{RIDES.map((r) => (<div key={r.d}><span className="d">{r.d}</span><div style={{ display: "block", padding: 0, border: 0 }}><b>{r.t}</b><span>{r.h}</span></div><a className="btn k" style={{ minHeight: 44, padding: "0 22px" }} href={wa(`entrar no ${r.t.toLowerCase()}`)} target="_blank" rel="noreferrer">Entrar</a></div>))}</div>
        </div>
      </div>

      <div className="cta">
        <h2>Bora pedalar?</h2>
        <p>Chame no WhatsApp, conte o que você procura e a gente separa a bike certa para o seu ritmo.</p>
        <a className="btn" href={wa()} target="_blank" rel="noreferrer">Falar no WhatsApp</a>
      </div>

      <div className="foot">
        <div><b style={{ fontSize: 20, fontFamily: "'Times New Roman',serif" }}>{brand}</b><br />Bicicletaria, oficina e passeios</div>
        <div><b>Endereço</b><br />Rua da Ladeira, 120, {city}</div>
        <div><b>Horário</b><br />Seg a sex, 9h às 19h · Sáb, 9h às 15h</div>
        <div><b>Contato</b><br />WhatsApp: {phone || "(00) 00000-0000"}</div>
      </div>
      {sc && <a className="wa" href={wa()} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 32 32" fill="#fff"><path d="M16 3a13 13 0 0 0-11 19.800L3 29l6.400-1.900A13 13 0 1 0 16 3zm0 2.400a10.600 10.600 0 1 1-5.400 19.700l-.4-.2-3.800 1.100 1.100-3.700-.3-.4A10.600 10.600 0 0 1 16 5.400zm-4 5.300c-.3 0-.7.100-1 .5-.4.400-1.300 1.300-1.300 3.100s1.300 3.600 1.500 3.800c.2.300 2.600 4.100 6.400 5.600 3.100 1.200 3.700 1 4.400.9.700-.1 2.200-.9 2.500-1.800.3-.9.3-1.600.2-1.800-.1-.2-.4-.3-.8-.5s-2.200-1.100-2.600-1.200c-.3-.1-.6-.2-.8.200-.3.400-.9 1.200-1.100 1.400-.2.300-.4.300-.8.100-.4-.2-1.600-.6-3-1.900-1.100-1-1.900-2.300-2.100-2.700-.2-.4 0-.6.200-.8l.6-.7c.2-.2.200-.4.400-.6.100-.3.100-.5 0-.7l-1.200-3c-.3-.7-.6-.7-.9-.7z" /></svg></a>}
    </div>
  );
}
