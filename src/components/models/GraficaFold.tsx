import { useEffect, useState } from "react";

/** Grafica e estudio de design, construida do zero a partir de um pin creme com tipografia gigante em azul cobalto. Sem fotos: tipografia, blocos de cor e ilustracao em SVG. Pedido de orcamento que fecha no WhatsApp. */
const BG = "#fbf8f1", BLU = "#1a1fd8", INK = "#0e0e1c", MUT = "#33334a", LINE = "#d9d5c9";
const STEPS = [
  { t: "Envie o arquivo ou a ideia" },
  { t: "Escolha papel e acabamento" },
  { t: "Receba em casa ou retire" },
];
const FEATS = [
  { t: "Cartões e papelaria", d: "Cartão de visita, papel timbrado e envelopes com verniz e hot stamping.", ic: "M5 8h22v16H5zM9 13h8M9 17h5" },
  { t: "Adesivos e rótulos", d: "Corte especial, vinil e papel, do lote pequeno ao grande.", ic: "M6 6h14l6 6v14H6zM20 6v6h6" },
  { t: "Banners e fachadas", d: "Lonas, faixas e placas prontas para a sua loja ou evento.", ic: "M4 8h24v12H4zM10 20v6M22 20v6" },
];
const PRICES = [
  { n: "Cartão de visita", p: "100 un · R$ 49", d: "Couchê 300 g, 4x4 cores, laminação fosca." },
  { n: "Adesivo em corte", p: "50 un · R$ 59", d: "Vinil branco 5 x 5 cm, resistente à água." },
  { n: "Banner 80 x 120", p: "1 un · R$ 89", d: "Lona 440 g com ilhós e acabamento reforçado." },
  { n: "Flyer A5", p: "500 un · R$ 119", d: "Couchê 150 g, frente e verso, entrega em 48 h." },
];
const Ic = ({ d, c = BLU, s = 24 }: { d: string; c?: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);

const HeroArt = () => (
  <svg viewBox="0 0 420 520" className="hart" role="img" aria-label="Folhas empilhadas com círculos de cor ciano, magenta e amarelo">
    <defs>
      <pattern id="dots" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="4.500" cy="4.500" r="2.200" fill={INK} /></pattern>
      <radialGradient id="fade" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#fff" stopOpacity="1" /></radialGradient>
      <mask id="mk"><rect width="420" height="520" fill="#fff" /><rect width="420" height="520" fill="url(#fade)" /></mask>
    </defs>
    <g transform="rotate(-8 210 280)"><rect x="70" y="120" width="250" height="340" rx="6" fill="#fff" stroke={INK} strokeWidth="2" /></g>
    <g transform="rotate(5 210 280)"><rect x="80" y="110" width="250" height="340" rx="6" fill="#f1ecdf" stroke={INK} strokeWidth="2" /></g>
    <g>
      <rect x="92" y="96" width="250" height="340" rx="6" fill="#fff" stroke={INK} strokeWidth="2" />
      <rect x="92" y="96" width="250" height="340" rx="6" fill="url(#dots)" opacity=".16" />
      <g style={{ mixBlendMode: "multiply" }}>
        <circle cx="190" cy="226" r="62" fill="#00b7f0" />
        <circle cx="244" cy="226" r="62" fill="#ee2a8e" />
        <circle cx="217" cy="272" r="62" fill="#ffe500" />
      </g>
      <path d="M217 226l0 0" />
      <rect x="116" y="352" width="120" height="10" fill={BLU} />
      <rect x="116" y="372" width="180" height="6" fill={INK} opacity=".7" />
      <rect x="116" y="388" width="150" height="6" fill={INK} opacity=".35" />
      <circle cx="318" cy="120" r="9" fill="none" stroke={INK} strokeWidth="1.500" /><path d="M318 106v28M304 120h28" stroke={INK} strokeWidth="1.500" />
    </g>
    <g stroke={INK} strokeWidth="2"><path d="M370 470h28M384 456v28" /></g>
    <g fontFamily="Unbounded, sans-serif" fontSize="9" fill={INK} letterSpacing="2"><text x="30" y="500">C M Y K 100%</text></g>
  </svg>
);

const PlanetArt = () => (
  <svg viewBox="0 0 300 520" className="part" preserveAspectRatio="xMidYMid slice" aria-hidden>
    <defs>
      <pattern id="h2" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="5" cy="5" r="3.200" fill="#fff" /></pattern>
      <radialGradient id="g2" cx="42%" cy="38%" r="70%"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#000" /></radialGradient>
      <mask id="m2"><circle cx="150" cy="210" r="124" fill="url(#g2)" /></mask>
    </defs>
    <rect width="300" height="520" fill={BLU} />
    <rect width="300" height="520" fill="url(#h2)" mask="url(#m2)" />
    <circle cx="150" cy="210" r="124" fill="none" stroke="#fff" strokeWidth="1.500" />
    <path d="M0 520V430c40-30 70-34 110-18 40 16 70 8 110-14 30-16 56-12 80 0V520z" fill="#fff" />
    <path d="M0 520V460c50-26 90-20 130-4 40 14 90 6 170-24V520z" fill={INK} />
    <g stroke="#fff" strokeWidth="2"><path d="M24 24h22M35 13v22M254 24h22M265 13v22" /></g>
  </svg>
);

export function GraficaFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Cobalto";
  const city = client?.city?.trim() || "Curitiba";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const wa = (what?: string) => `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero ${what ?? "um orçamento de impressão"} na ${brand}.`)}`;

  return (
    <div className="cb" style={{ fontFamily: "'Barlow Semi Condensed', system-ui, sans-serif", color: INK, background: BLU, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700;800&family=Barlow+Semi+Condensed:wght@400;500;600;700&display=swap');
        .cb *{box-sizing:border-box}
        .cb a,.cb button{font-family:inherit}
        .cb .shell{background:linear-gradient(100deg,#3b46ff,#1a1fd8 40%,#7d8aff 100%);padding:46px 0 0}
        .cb .page{background:${BG};max-width:1160px;margin:0 auto;width:calc(100% - 56px)}
        .cb .d{font-family:Unbounded,sans-serif}
        .cb .wrap{max-width:1000px;margin:0 auto;padding:0 28px}
        .cb .nav{display:flex;align-items:center;justify-content:space-between;height:72px;padding:0 34px;gap:20px;border-bottom:1px solid ${LINE};position:relative}
        .cb .logo{font-family:Unbounded,sans-serif;font-weight:700;font-size:17px;letter-spacing:-.3px}
        .cb .logo i{display:inline-block;width:9px;height:9px;background:${BLU};border-radius:50%;margin-left:3px}
        .cb .links{display:flex;gap:34px;font-size:15px;font-weight:500}
        .cb .links a{color:${INK};cursor:pointer}
        .cb .btn{background:${BLU};color:#fff;border:0;border-radius:2px;padding:0 24px;min-height:50px;font-weight:600;font-size:15px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:10px;text-decoration:none}
        .cb .btn:hover{filter:brightness(1.12)}
        .cb .btn.s{min-height:40px;padding:0 18px;font-size:14px}
        .cb .burger{display:none;background:none;border:0;width:44px;height:44px;cursor:pointer}
        .cb .mmenu{position:absolute;top:72px;left:12px;right:12px;background:#fff;border:1px solid ${LINE};padding:8px;z-index:9;display:flex;flex-direction:column;box-shadow:0 12px 30px rgba(0,0,0,.15)}
        .cb .mmenu a{padding:14px 12px;font-weight:600;cursor:pointer}
        .cb .hero{position:relative;padding:34px 34px 0;min-height:600px}
        .cb .big{font-family:Unbounded,sans-serif;font-weight:700;color:${BLU};font-size:clamp(46px,11.6vw,140px);line-height:.95;letter-spacing:-.04em;margin:0;position:relative;z-index:1}
        .cb .hart{position:absolute;right:30px;top:40px;width:min(46%,480px);height:auto;z-index:2}
        .cb .tag{font-family:Unbounded,sans-serif;font-weight:500;font-size:clamp(19px,2.3vw,27px);letter-spacing:-.01em;margin:30px 0 14px;max-width:560px;line-height:1.2}
        .cb .sub{max-width:430px;font-size:17px;line-height:1.45;color:${MUT};margin:0 0 18px}
        .cb .lnk{display:inline-flex;gap:8px;font-weight:600;border-bottom:1.5px solid ${INK};padding-bottom:2px;color:${INK};text-decoration:none;font-size:15px}
        .cb .card{background:${BLU};color:#fff;width:232px;padding:22px 20px 18px;margin-top:34px}
        .cb .card small{font-size:12.5px;letter-spacing:.14em;opacity:.8;display:block;margin-bottom:6px}
        .cb .card b{font-family:Unbounded,sans-serif;font-size:21px;display:block;margin-bottom:16px;font-weight:700}
        .cb .card .n{display:flex;gap:16px;font-family:Unbounded,sans-serif;font-size:21px}.cb .card .n span{display:flex;flex-direction:column;font-family:'Barlow Semi Condensed';font-size:11px;letter-spacing:.12em;opacity:1;gap:2px;font-weight:600}
        .cb .card .n span em{font-family:Unbounded;font-style:normal;font-size:22px;opacity:1;letter-spacing:0}
        .cb .loc{display:flex;align-items:center;gap:10px;margin:26px 0 38px;font-size:14px;letter-spacing:.06em;font-weight:500}
        .cb .stp{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid ${LINE};border-bottom:1px solid ${LINE}}
        .cb .stp div{display:flex;align-items:center;gap:14px;padding:22px 24px;font-size:15.5px;font-weight:500;text-transform:uppercase;letter-spacing:.02em;line-height:1.2}
        .cb .stp div+div{border-left:1px solid ${LINE}}
        .cb .stp i{font-family:Unbounded,sans-serif;font-style:normal;font-size:28px;color:${BLU};font-weight:500}
        .cb .sec{padding:84px 0}
        .cb .ms{display:grid;grid-template-columns:1fr 280px 1fr;gap:36px;align-items:stretch}
        .cb .eye{font-size:13px;letter-spacing:.12em;color:${BLU};font-weight:600;margin-bottom:14px;text-transform:uppercase}
        .cb h2{font-family:Unbounded,sans-serif;font-weight:500;font-size:clamp(22px,2.6vw,30px);line-height:1.18;letter-spacing:-.02em;margin:0 0 20px;text-transform:uppercase}
        .cb .ms p{font-size:16.5px;line-height:1.5;color:${MUT};margin:0 0 20px}
        .cb .pan{overflow:hidden;min-height:460px}.cb .part{width:100%;height:100%;display:block}
        .cb .fs{display:flex;flex-direction:column}
        .cb .f{display:grid;grid-template-columns:52px 1fr;gap:6px 16px;padding:22px 0;border-bottom:1px solid ${LINE}}
        .cb .f:first-child{padding-top:0}.cb .f:last-child{border:0}
        .cb .f i{width:52px;height:52px;border:1px solid ${LINE};display:grid;place-items:center;grid-row:span 2}
        .cb .f b{font-family:Unbounded,sans-serif;font-weight:500;font-size:15px;text-transform:uppercase;letter-spacing:-.01em;align-self:end}
        .cb .f span{font-size:15px;color:${MUT};line-height:1.4}
        .cb .tl{display:grid;grid-template-columns:repeat(4,1fr);gap:0}
        .cb .tl a{aspect-ratio:3/4;padding:20px;display:flex;flex-direction:column;justify-content:space-between;text-decoration:none;color:${INK};position:relative;overflow:hidden}
        .cb .tl small{font-family:Unbounded,sans-serif;font-size:13px;font-weight:500}
        .cb .tl b{font-family:Unbounded,sans-serif;font-weight:700;font-size:clamp(20px,2.6vw,30px);letter-spacing:-.04em;line-height:1;text-transform:uppercase}
        .cb .tl svg{position:absolute;right:-18px;top:40px;width:70%;opacity:.95}
        .cb .pr{background:${INK};color:#fff;padding:84px 0}
        .cb .pr h2{color:#fff}.cb .pr .eye{color:#9aa1ff}
        .cb .pg{display:grid;grid-template-columns:repeat(4,1fr);gap:0;border:1px solid #33334a;margin-top:34px}
        .cb .pc{padding:26px 22px;border-left:1px solid #33334a}.cb .pc:first-child{border:0}
        .cb .pc b{font-family:Unbounded,sans-serif;font-weight:500;font-size:14px;text-transform:uppercase;display:block;margin-bottom:22px;min-height:34px}
        .cb .pc strong{font-family:Unbounded,sans-serif;font-size:18px;color:#fff;display:block;margin-bottom:12px;font-weight:700;letter-spacing:-.02em}
        .cb .pc span{font-size:15px;line-height:1.4;color:#b3b3c6}
        .cb .pc a{display:inline-flex;margin-top:20px;color:#fff;border-bottom:1.5px solid #9aa1ff;text-decoration:none;font-weight:600;font-size:14.5px;padding-bottom:2px}
        .cb .cta{background:${BLU};color:#fff;padding:78px 0 70px;position:relative;overflow:hidden}
        .cb .cta .w{font-family:Unbounded,sans-serif;font-weight:700;font-size:clamp(40px,10vw,128px);letter-spacing:-.045em;line-height:.95;color:#fff;opacity:.16;margin:0 0 14px;white-space:nowrap}
        .cb .cta h2{color:#fff;max-width:600px}
        .cb .cta p{font-size:17px;line-height:1.5;max-width:520px;margin:0 0 26px;opacity:.9}
        .cb .cta .btn{background:#fff;color:${BLU}}
        .cb .foot{background:${INK};color:#cfcfdd;display:grid;grid-template-columns:1.3fr 1fr 1fr 1fr;gap:28px;padding:40px 34px;font-size:14.5px;line-height:1.6}
        .cb .foot b{color:#fff}
        .cb .wa{position:fixed;right:18px;bottom:18px;z-index:40;width:58px;height:58px;border-radius:50%;background:#25d366;display:grid;place-items:center;box-shadow:0 8px 24px rgba(0,0,0,.3)}
        @media(max-width:980px){
          .cb .tl{grid-template-columns:1fr 1fr}
          .cb .hart{position:relative;right:auto;top:auto;width:78%;max-width:340px;margin:8px auto -10px;display:block}
          .cb .hero{min-height:0;padding:26px 20px 0}
          .cb .ms{grid-template-columns:1fr 1fr}.cb .pan{grid-row:1}.cb .pan{min-height:380px}
          .cb .pg{grid-template-columns:1fr 1fr}.cb .pc:nth-child(3){border-left:0}.cb .pc:nth-child(n+3){border-top:1px solid #33334a}
        }
        @media(max-width:760px){
          .cb .shell{padding-top:0}.cb .page{width:100%}
          .cb .links,.cb .nav .btn{display:none}.cb .burger{display:block}.cb .nav{padding:0 14px 0 18px}
          .cb .stp{grid-template-columns:1fr}.cb .stp div+div{border-left:0;border-top:1px solid ${LINE}}.cb .stp div{padding:16px 20px}
          .cb .wrap{padding:0 20px}.cb .wrap.sec{padding:56px 20px}
          .cb .big{font-size:14.6vw}.cb .hart{margin:0 auto -6px}
          .cb .ms{grid-template-columns:1fr;gap:30px}.cb .pan{min-height:300px;max-height:340px;grid-row:auto}
          .cb .pg{grid-template-columns:1fr}.cb .pc{border-left:0!important;border-top:1px solid #33334a}.cb .pc:first-child{border-top:0}
          .cb .pc b{min-height:0;margin-bottom:14px}
          .cb .foot{grid-template-columns:1fr 1fr;padding:32px 20px}
          .cb .card{width:100%}.cb .pr,.cb .cta{padding:56px 0}
        }
      `}</style>

      <div className="shell">
        <div className="page">
          <div className="nav" id="top">
            <div className="logo">{brand.toUpperCase()}<i /></div>
            <div className="links"><a onClick={() => go("sobre")}>Sobre</a><a onClick={() => go("sobre")}>Produtos</a><a onClick={() => go("precos")}>Preços</a><a onClick={() => go("contato")}>Contato</a></div>
            <a className="btn s" href={wa()} target="_blank" rel="noreferrer">Pedir orçamento ↗</a>
            <button type="button" className="burger" aria-label="Menu" onClick={() => setMenu((m) => !m)}><svg width="26" height="26" viewBox="0 0 26 26" stroke={INK} strokeWidth="2"><path d="M3 7h20M3 13h20M3 19h20" /></svg></button>
            {menu && <div className="mmenu"><a onClick={() => go("sobre")}>Produtos</a><a onClick={() => go("precos")}>Preços</a><a onClick={() => go("contato")}>Contato</a></div>}
          </div>

          <div className="hero">
            <h1 className="big">IMPRIMA</h1>
            <HeroArt />
            <div className="tag">O PAPEL NÃO É O LIMITE</div>
            <p className="sub">Gráfica e estúdio de design em {city}. Cartões, adesivos, banners e embalagens com acabamento de quem leva a sério o seu projeto.</p>
            <a className="lnk" href={wa()} target="_blank" rel="noreferrer">Pedir orçamento <span>↗</span></a>
            <div className="card"><small>PRAZO MÉDIO</small><b>ENTREGA EXPRESSA</b><div className="n"><span><em>24</em>HORAS</span><span><em>500+</em>CLIENTES</span><span><em>4x4</em>CORES</span></div></div>
            <div className="loc"><svg width="18" height="18" viewBox="0 0 32 32" fill="none" stroke={INK} strokeWidth="2"><circle cx="16" cy="16" r="12" /><path d="M4 16h24M16 4c-6 6-6 18 0 24M16 4c6 6 6 18 0 24" /></svg>GRÁFICA RÁPIDA · IMPRESSÃO DIGITAL E OFFSET</div>
          </div>

          <div className="stp">{STEPS.map((s, i) => (<div key={s.t}><i>0{i + 1}</i>{s.t}</div>))}</div>

          <div className="wrap sec" id="sobre">
            <div className="ms">
              <div>
                <div className="eye">Nossa missão</div>
                <h2>Levar boas ideias do arquivo ao papel.</h2>
                <p>Na {brand}, cada pedido passa por conferência de arquivo, prova de cor e acabamento manual. Você recebe o material pronto, no prazo combinado.</p>
                <a className="lnk" href={wa("conhecer a gráfica")} target="_blank" rel="noreferrer">Falar com a gente <span>↗</span></a>
              </div>
              <div className="pan"><PlanetArt /></div>
              <div className="fs">{FEATS.map((f) => (<div className="f" key={f.t}><i><Ic d={f.ic} s={30} /></i><b>{f.t}</b><span>{f.d}</span></div>))}</div>
            </div>
          </div>

          <div className="tl">
            {[["#1a1fd8", "#fff", "Cartão", "01", <circle key="a" cx="60" cy="60" r="44" fill="none" stroke="#fff" strokeWidth="10" />],
              ["#ffe500", INK, "Adesivo", "02", <path key="b" d="M10 10h70l30 30v70H10z" fill={INK} />],
              ["#ee2a8e", INK, "Banner", "03", <g key="c"><rect x="6" y="14" width="108" height="56" fill={INK} /><path d="M30 70v40M90 70v40" stroke={INK} strokeWidth="8" /></g>],
              ["#00b7f0", INK, "Flyer", "04", <g key="d"><rect x="22" y="6" width="70" height="104" fill="#fff" stroke={INK} strokeWidth="5" /><path d="M36 30h42M36 46h42M36 62h26" stroke={INK} strokeWidth="6" /></g>]].map(([bg, fg, t, n, shape]) => (
              <a key={t as string} style={{ background: bg as string, color: fg as string }} href={wa(`um orçamento de ${(t as string).toLowerCase()}`)} target="_blank" rel="noreferrer">
                <small>{n as string}</small>
                <svg viewBox="0 0 120 120" aria-hidden>{shape}</svg>
                <b>{t as string} ↗</b>
              </a>
            ))}
          </div>

          <div className="pr" id="precos">
            <div className="wrap">
              <div className="eye">Tabela de preços</div>
              <h2>Pedidos mais pedidos, preço na tela.</h2>
              <div className="pg">{PRICES.map((p) => (<div className="pc" key={p.n}><b>{p.n}</b><strong>{p.p}</strong><span>{p.d}</span><br /><a href={wa(`orçar ${p.n.toLowerCase()}`)} target="_blank" rel="noreferrer">Pedir este ↗</a></div>))}</div>
            </div>
          </div>

          <div className="cta" id="contato">
            <div className="wrap">
              <div className="w">IMPRIMA</div>
              <h2>Seu projeto pronto em 24 horas.</h2>
              <p>Mande o arquivo pelo WhatsApp e receba o orçamento na hora, com prova de cor antes de imprimir.</p>
              <a className="btn" href={wa()} target="_blank" rel="noreferrer">Falar no WhatsApp ↗</a>
            </div>
          </div>

          <div className="foot">
            <div><b className="d" style={{ fontSize: 16 }}>{brand.toUpperCase()}</b><br />Gráfica e estúdio de design</div>
            <div><b>Endereço</b><br />Rua XV de Novembro, 880, {city}</div>
            <div><b>Horário</b><br />Seg a sex, 8h às 18h · Sáb, 9h às 13h</div>
            <div><b>Contato</b><br />WhatsApp: {phone || "(00) 00000-0000"}</div>
          </div>
        </div>
      </div>
      {sc && <a className="wa" href={wa()} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg></a>}
    </div>
  );
}
