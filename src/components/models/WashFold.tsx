import { useEffect, useState } from "react";

/** Lava-jato novo, construido do zero a partir de um pin escuro em azul marinho com respingo de agua. Cada servico abre o agendamento no WhatsApp. */
const BG = "#050c1c", BG2 = "#0a1630", BL = "#2f6bff", LT = "#f2f5fa", INK = "#0b1530", MUT = "#4a5675";
const SERVICES = [
  { n: "Lavagem Básica", d: "Lavagem externa, enxágue, brilho nos pneus e aromatizante.", p: "R$ 49", img: "/wash-s1.webp", ic: "M5 20l2-7h18l2 7v6H5zM9 20h.01M23 20h.01M8 13l2-5h12l2 5" },
  { n: "Lavagem Completa", d: "Externa e interna, aspiração, limpeza de vidros e pneus.", p: "R$ 89", img: "/wash-s2.webp", pop: true, ic: "M6 22c0-8 4-14 10-17 6 3 10 9 10 17a10 10 0 0 1-20 0z" },
  { n: "Detalhamento Premium", d: "Higienização interna e externa, polimento, cera e hidratação de bancos.", p: "R$ 249", img: "/wash-s3.webp", ic: "M16 3l3 8 8 1-6 6 2 9-7-5-7 5 2-9-6-6 8-1z" },
  { n: "Vitrificação Cerâmica", d: "Proteção de longa duração, hidrofobia e brilho profundo na pintura.", p: "R$ 890", img: "/wash-s4.webp", ic: "M16 3l11 4v8c0 7-5 12-11 14C10 27 5 22 5 15V7zM11 16l4 4 7-8" },
];
const TRUST = [
  { t: "Produtos ecológicos", ic: "M6 26C6 12 14 5 27 5c0 13-7 21-21 21zM6 26c4-8 9-12 15-14" },
  { t: "Satisfação garantida", ic: "M16 3l11 4v8c0 7-5 12-11 14C10 27 5 22 5 15V7zM11 16l4 4 7-8" },
  { t: "Equipe certificada", ic: "M16 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM7 28l3-8 6 4 6-4 3 8" },
];
const WHY = [
  { t: "Produtos de qualidade", ic: "M8 10h16v16H8zM12 10V6h8v4" },
  { t: "Atenção aos detalhes", ic: "M14 25a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM22 22l6 6" },
  { t: "Rápido e confiável", ic: "M16 5a11 11 0 1 0 0 22 11 11 0 0 0 0-22zM16 10v7l4 3" },
  { t: "Preço justo", ic: "M16 4v24M21 9c-1-2-3-3-5-3-3 0-5 2-5 4s2 4 5 4 5 2 5 4-2 4-5 4c-2 0-4-1-5-3" },
  { t: "Cliente satisfeito", ic: "M16 4l3.500 7.500 8 1-6 5.500 1.700 8L16 22l-7.200 3.900 1.700-8-6-5.500 8-1z" },
];
const STEPS = [
  { t: "Escolha o serviço", d: "Selecione a lavagem ideal para o seu carro.", ic: "M5 20l2-7h18l2 7v6H5zM9 20h.01M23 20h.01" },
  { t: "Escolha o horário", d: "Dia e hora que forem melhores para você.", ic: "M6 6h20v20H6zM6 12h20M12 3v6M20 3v6" },
  { t: "Pronto, é com a gente", d: "Cuidamos do seu carro enquanto você descansa.", ic: "M16 4l3.500 7.500 8 1-6 5.500 1.700 8L16 22l-7.200 3.900 1.700-8-6-5.500 8-1z" },
];
const Ic = ({ d, c = BL, s = 28 }: { d: string; c?: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);
const Drop = ({ s = 34 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" aria-hidden><path d="M16 2C10 10 5 15 5 21a11 11 0 0 0 22 0c0-6-5-11-11-19z" fill={BL} /><path d="M11 22a5 5 0 0 0 5 5" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
);

export function WashFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Jato Azul";
  const city = client?.city?.trim() || "Fortaleza";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const wa = (what?: string) => `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero agendar ${what ?? "uma lavagem"} na ${brand}.`)}`;

  return (
    <div className="jw" style={{ fontFamily: "Inter, system-ui, sans-serif", color: INK, background: LT, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        .jw *{box-sizing:border-box}
        .jw a,.jw button{font-family:inherit}
        .jw .wrap{max-width:1180px;margin:0 auto;padding:0 24px}
        .jw .strip{background:${BG};color:#c8d3ee;font-size:13px;border-bottom:1px solid rgba(255,255,255,.08)}
        .jw .strip .wrap{display:flex;justify-content:space-between;height:38px;align-items:center;gap:12px}
        .jw .hero{position:relative;background:${BG};color:#fff;overflow:hidden;padding-bottom:210px}
        .jw .hero>img{position:absolute;right:0;top:0;height:100%;width:70%;object-fit:cover;object-position:60% 40%;-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 38%);mask-image:linear-gradient(90deg,transparent 0,#000 38%)}
        .jw .hero>*:not(img){position:relative;z-index:2}
        .jw .nav{display:flex;align-items:center;justify-content:space-between;height:86px;gap:20px}
        .jw .logo{display:flex;align-items:center;gap:10px;font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:30px;letter-spacing:1px;text-transform:uppercase;line-height:1}
        .jw .logo small{display:block;font-family:Inter,sans-serif;font-size:10px;letter-spacing:3px;color:#9fb2dc;font-weight:500;margin-top:3px}
        .jw .links{display:flex;gap:34px;font-size:14.5px;font-weight:500;text-transform:uppercase;letter-spacing:.5px}
        .jw .links a{color:#fff;cursor:pointer;padding-bottom:6px;border-bottom:2px solid transparent;opacity:.9}.jw .links a.on{border-color:${BL}}
        .jw .btn{background:${BL};color:#fff;border:0;border-radius:6px;padding:0 26px;min-height:52px;font-weight:600;font-size:15px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:10px;text-decoration:none;text-transform:uppercase;letter-spacing:.5px}
        .jw .btn:hover{filter:brightness(1.12)}
        .jw .btn.o{background:transparent;border:1.5px solid rgba(255,255,255,.6)}
        .jw .burger{display:none;background:none;border:0;width:44px;height:44px;cursor:pointer}
        .jw .kick{color:#7ea4ff;text-shadow:0 1px 10px rgba(0,0,0,.7);font-weight:600;font-size:13.5px;letter-spacing:2.5px;text-transform:uppercase;margin-top:54px}
        .jw h1{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:clamp(46px,6.6vw,84px);line-height:.98;margin:16px 0 0;text-transform:uppercase;max-width:640px;font-style:normal;letter-spacing:0}
        .jw h1 em{font-style:normal;color:#4a82ff}
        .jw .lead{font-size:18px;line-height:1.6;color:#eaf0ff;text-shadow:0 1px 12px rgba(0,0,0,.6);margin:22px 0 32px;max-width:440px}
        .jw .btns{display:flex;gap:14px;flex-wrap:wrap}
        .jw .trust{display:flex;gap:26px;margin-top:40px;flex-wrap:wrap}
        .jw .trust div{display:flex;align-items:center;gap:12px;font-size:14px;font-weight:500;line-height:1.3;max-width:150px}
        .jw .trust i{width:46px;height:46px;border-radius:50%;border:1.5px solid rgba(255,255,255,.35);display:grid;place-items:center;flex:none}
        .jw .panel{background:#fff;border-radius:22px;margin:-170px auto 0;position:relative;z-index:5;padding:34px 34px 38px;box-shadow:0 24px 60px rgba(5,12,28,.25);max-width:1180px;width:calc(100% - 40px)}
        .jw .ph{display:flex;justify-content:space-between;align-items:flex-end;gap:16px;margin-bottom:26px}
        .jw .eyebrow{color:${BL};font-weight:700;font-size:13px;letter-spacing:2px;text-transform:uppercase}
        .jw h2{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:clamp(32px,4vw,46px);line-height:1;margin:8px 0 0;text-transform:uppercase;color:${INK};font-style:normal;letter-spacing:0}
        .jw .more{color:${BL};font-weight:600;font-size:15px;cursor:pointer;white-space:nowrap}
        .jw .sg{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
        .jw .sc{position:relative;border:1.5px solid #e4e9f3;border-radius:16px;padding:22px 20px 20px;display:flex;flex-direction:column;gap:10px;background:#fff;text-align:center;align-items:center}
        .jw .sc.pop{border-color:${BL};box-shadow:0 12px 30px rgba(47,107,255,.2)}
        .jw .tag{position:absolute;top:-12px;right:14px;background:${BG};color:#fff;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:5px 10px;border-radius:6px}
        .jw .sc i{width:58px;height:58px;border-radius:50%;background:${BL};display:grid;place-items:center}
        .jw .sc b{min-height:2.1em;display:flex;align-items:center;font-family:'Barlow Condensed',sans-serif;font-size:24px;line-height:1.05;text-transform:uppercase;letter-spacing:.5px}
        .jw .sc p{margin:0;font-size:14.5px;line-height:1.55;color:${MUT};flex:1}
        .jw .sc img{width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:10px;display:block;margin-top:4px}
        .jw .sc .row{display:flex;justify-content:space-between;align-items:center;width:100%;margin-top:6px}
        .jw .sc .row strong{font-size:22px;line-height:1.1}.jw .sc .row strong small{display:block;font-size:11.5px;font-weight:500;color:${MUT};letter-spacing:.3px}.jw .sc .row a{background:${BL};color:#fff;font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:.5px;cursor:pointer;text-decoration:none;padding:11px 16px;border-radius:6px}.jw .sc:not(.pop) .row a{background:#e6edff;color:#1f4fd8}
        .jw .why{background:${BG};color:#fff;margin:34px auto 0;max-width:1180px;width:calc(100% - 40px);border-radius:18px;padding:34px;display:grid;grid-template-columns:1.6fr 1fr;gap:30px;align-items:center}
        .jw .wl{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-top:22px}
        .jw .wl div{display:flex;flex-direction:column;align-items:center;gap:10px;text-align:center;font-size:15.5px;color:#e4ebfb;font-weight:500;padding:0 6px}
        .jw .plan{border:1.5px dashed rgba(255,255,255,.3);border-radius:14px;padding:22px;display:flex;align-items:center;gap:20px}
        .jw .plan .seal{width:76px;height:76px;border-radius:50%;background:${BL};display:grid;place-items:center;font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:34px;flex:none}
        .jw .plan small{color:#8fb0ff;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:600}
        .jw .plan b{display:block;font-family:'Barlow Condensed',sans-serif;font-size:28px;text-transform:uppercase;line-height:1.05;margin:4px 0 4px}
        .jw .plan span{font-size:14px;color:#c8d3ee;display:block;margin-bottom:12px}
        .jw .book{display:grid;grid-template-columns:1fr 1.2fr;gap:44px;align-items:center;padding:70px 0 40px}
        .jw .book .ph2 img{width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:16px;display:block}
        .jw .steps{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin:34px 0 34px}
        .jw .st{display:flex;flex-direction:column;gap:8px;font-size:15px;color:${MUT};line-height:1.45}
        .jw .st i{width:48px;height:48px;border-radius:12px;background:#e6edff;display:grid;place-items:center;position:relative}
        .jw .st i em{position:absolute;top:-10px;right:-10px;width:22px;height:22px;border-radius:50%;background:${BL};color:#fff;font-size:12px;font-style:normal;font-weight:700;display:grid;place-items:center}
        .jw .st b{color:${INK};font-size:15.5px}
        .jw .about{display:grid;grid-template-columns:1fr 1.1fr;gap:30px;align-items:center;padding:30px 0 70px}
        .jw .about img{width:100%;max-width:520px;display:block;filter:drop-shadow(0 24px 24px rgba(5,12,28,.35))}
        .jw .about p{color:${MUT};line-height:1.65;font-size:16.5px;margin:14px 0 18px;max-width:440px}
        .jw .nums{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:6px}
        .jw .nums b{display:block;font-family:'Barlow Condensed',sans-serif;font-size:42px;color:${INK};line-height:1}
        .jw .nums span{font-size:15px;color:${MUT}}
        .jw footer{background:${BG};color:#c8d3ee;padding:44px 0;font-size:14.5px;line-height:1.8}
        .jw footer .wrap{display:flex;justify-content:space-between;gap:30px;flex-wrap:wrap}
        .jw footer b{color:#fff}
        .jw .wa{position:fixed;right:18px;bottom:18px;z-index:40;width:58px;height:58px;border-radius:50%;background:#25d366;display:grid;place-items:center;box-shadow:0 8px 24px rgba(0,0,0,.35)}
        .jw .mmenu{position:absolute;top:86px;left:16px;right:16px;background:#fff;color:${INK};border-radius:14px;padding:10px;z-index:9;display:flex;flex-direction:column}
        .jw .mmenu a{padding:14px;font-weight:600;cursor:pointer;color:${INK}}
        @media(max-width:960px){
          .jw .sg{grid-template-columns:repeat(2,1fr)}
          .jw .why{grid-template-columns:1fr}.jw .wl{grid-template-columns:repeat(3,1fr);gap:18px}
          .jw .book,.jw .about{grid-template-columns:1fr}
        }
        @media(max-width:760px){
          .jw .links,.jw .nav .btn{display:none}.jw .burger{display:block}
          .jw .strip .wrap span:nth-child(n+2){display:none}
          .jw .hero{padding-bottom:190px}
          .jw .hero>img{width:100%;height:56%;opacity:.55;-webkit-mask-image:linear-gradient(180deg,#000 40%,transparent);mask-image:linear-gradient(180deg,#000 40%,transparent);object-position:70% 30%}
          .jw .kick{margin-top:30px}
          .jw .panel{padding:24px 16px 28px;margin-top:-150px}
          .jw .sg{grid-template-columns:1fr}
          .jw .ph{flex-direction:column;align-items:flex-start}
          .jw .wl{grid-template-columns:repeat(2,1fr)}
          .jw .plan{flex-direction:column;text-align:center}
          .jw .steps{grid-template-columns:1fr}
          .jw .nums{grid-template-columns:repeat(2,1fr);gap:22px}
          .jw .book{padding:50px 0 20px}
        }
      `}</style>

      <div className="strip"><div className="wrap"><span>Seg a sáb, 8h às 20h · Dom, 8h às 16h</span><span>Aspiração grátis em toda lavagem</span><span>WhatsApp: {phone || "(00) 00000-0000"}</span></div></div>
      <div className="hero" id="top">
        <img src="/wash-hero.webp" alt="Carro preto recebendo jato de água em lava-jato premium" />
        <div className="wrap">
          <div className="nav">
            <div className="logo"><Drop /><div>{brand}<small>LAVA-JATO</small></div></div>
            <div className="links"><a className="on">Início</a><a onClick={() => go("servicos")}>Serviços</a><a onClick={() => go("plano")}>Plano mensal</a><a onClick={() => go("agendar")}>Agendar</a><a onClick={() => go("sobre")}>Sobre</a></div>
            <a className="btn" href={wa()} target="_blank" rel="noreferrer">Agendar</a>
            <button type="button" className="burger" aria-label="Menu" onClick={() => setMenu((m) => !m)}><svg width="26" height="26" viewBox="0 0 26 26" stroke="#fff" strokeWidth="2"><path d="M3 7h20M3 13h20M3 19h20" /></svg></button>
          </div>
          {menu && <div className="mmenu"><a onClick={() => go("servicos")}>Serviços</a><a onClick={() => go("plano")}>Plano mensal</a><a onClick={() => go("agendar")}>Agendar</a><a onClick={() => go("sobre")}>Sobre</a></div>}
          <div className="kick">Carro limpo. Cabeça leve. Vida em ordem.</div>
          <h1>Lavagem premium <em>& detalhamento</em> automotivo</h1>
          <p className="lead">Brilho, proteção e cuidado de verdade para o seu carro, com produtos de primeira e equipe treinada em {city}.</p>
          <div className="btns"><a className="btn" href={wa()} target="_blank" rel="noreferrer">Agendar agora →</a><a className="btn o" onClick={() => go("servicos")}>Ver serviços →</a></div>
          <div className="trust">{TRUST.map((t) => (<div key={t.t}><i><Ic d={t.ic} c="#fff" s={22} /></i>{t.t}</div>))}</div>
        </div>
      </div>

      <div className="panel" id="servicos">
        <div className="ph"><div><div className="eyebrow">Nossos serviços</div><h2>Escolha a lavagem ideal</h2></div><a className="more" href={wa()} target="_blank" rel="noreferrer">Ver todos os serviços →</a></div>
        <div className="sg">
          {SERVICES.map((s) => (
            <div className={`sc${s.pop ? " pop" : ""}`} key={s.n}>
              {s.pop && <span className="tag">Mais pedida</span>}
              <i><Ic d={s.ic} c="#fff" s={26} /></i>
              <b>{s.n}</b>
              <p>{s.d}</p>
              <img src={s.img} alt={s.n} loading="lazy" />
              <div className="row"><strong><small>A partir de</small>{s.p}</strong><a href={wa(`a ${s.n}`)} target="_blank" rel="noreferrer">Agendar →</a></div>
            </div>
          ))}
        </div>
      </div>

      <div className="why" id="plano">
        <div>
          <div className="eyebrow">Por que escolher a gente</div>
          <h2 style={{ color: "#fff" }}>Mais que uma lavagem</h2>
          <div className="wl">{WHY.map((w) => (<div key={w.t}><Ic d={w.ic} s={30} />{w.t}</div>))}</div>
        </div>
        <div className="plan">
          <div className="seal">%</div>
          <div><small>Plano mensal</small><b>Lavagens ilimitadas</b><span>A partir de R$ 99 por mês</span><a className="btn" style={{ minHeight: 42, padding: "0 20px", fontSize: 13.5 }} href={wa("o plano mensal")} target="_blank" rel="noreferrer">Quero saber mais →</a></div>
        </div>
      </div>

      <div className="wrap book" id="agendar">
        <div className="ph2"><img src="/wash-tunnel.webp" alt="Carro passando pelo túnel de lavagem com escovas azuis" loading="lazy" /></div>
        <div>
          <div className="eyebrow">Agendamento</div>
          <h2>Agende sua lavagem em 3 passos</h2>
          <div className="steps">{STEPS.map((s, i) => (<div className="st" key={s.t}><i><em>{i + 1}</em><Ic d={s.ic} s={26} /></i><b>{s.t}</b>{s.d}</div>))}</div>
          <a className="btn" href={wa()} target="_blank" rel="noreferrer">Agendar no WhatsApp →</a>
        </div>
      </div>

      <div className="wrap about" id="sobre">
        <div><img src="/wash-about.webp" alt="Sedã preto brilhando depois da lavagem" loading="lazy" /></div>
        <div>
          <div className="eyebrow">Sobre a {brand}</div>
          <h2>A gente cuida do seu carro como se fosse o nosso</h2>
          <p>Nossa missão é dar um serviço de qualidade, com honestidade, paixão e atenção a cada detalhe. É por isso que o cliente volta.</p>
          <div className="nums"><div><b>10+</b><span>Anos de experiência</span></div><div><b>25 mil+</b><span>Clientes felizes</span></div><div><b>50 mil+</b><span>Carros lavados</span></div><div><b>4,9</b><span>Nota dos clientes</span></div></div>
        </div>
      </div>

      <footer>
        <div className="wrap">
          <div><b style={{ fontSize: 22, fontFamily: "'Barlow Condensed',sans-serif", textTransform: "uppercase" }}>{brand}</b><br />Lavagem premium e estética automotiva</div>
          <div><b>Endereço</b><br />Av. das Palmeiras, 880, {city}</div>
          <div><b>Horário</b><br />Seg a sáb, 8h às 20h · Dom, 8h às 16h</div>
          <div><b>Contato</b><br />WhatsApp: {phone || "(00) 00000-0000"}</div>
        </div>
      </footer>
      {sc && <a className="wa" href={wa()} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg></a>}
    </div>
  );
}
