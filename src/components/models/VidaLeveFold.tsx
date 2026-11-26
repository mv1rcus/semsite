import React, { useState } from "react";

const CREAM = "#fbfaf4";
const SAGE = "#eef3e6";
const GREEN = "#47603c";
const GREEND = "#354a2d";
const LEAF = "#79a85a";
const INK = "#24301d";
const MUT = "#68765c";
const LINE = "#e3e9d8";
const serif = "'Fraunces', Georgia, serif";
const sans = "'Jost', 'Inter', sans-serif";
const script = "'Caveat', cursive";

const PATHS: Record<string, string[]> = {
  folha: ["M6 22C6 12 13 5 24 4c0 11-6 18-16 18", "M6 22c3-6 8-11 14-14"],
  prancheta: ["M9 5H6.5A1.5 1.5 0 0 0 5 6.5v15A1.5 1.5 0 0 0 6.5 23h15a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 21.5 5H19", "M11 3h6v4h-6Z", "M10 14l2.5 2.5L18 11"],
  balanca: ["M14 5v3", "M8 8h12l2 13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2Z", "M11 14a3 3 0 0 0 6 0"],
  digestao: ["M14 4c4.5 0 7.5 3 7.5 7 0 2.5-1.2 4.3-3 5.5-1.4 1-2.5 1.8-2.5 3.5 0 2.2-1.8 4-4 4-2.8 0-5.5-2.6-5.5-6.5 0-2 .8-3.6 2-4.8C9.7 11.5 10.5 10.6 10.5 9c0-2.8 1.6-5 3.5-5Z", "M14 9.5c1.6 0 3 1.2 3 3"],
  pessoa: ["M14 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z", "M4.5 24c1-5 4.7-7.5 9.5-7.5s8.5 2.5 9.5 7.5", "M21 5.5l.9 2 2 .9-2 .9-.9 2-.9-2-2-.9 2-.9Z"],
  prato: ["M14 24c6 0 10.5-4.5 10.5-10.5H3.5C3.5 19.5 8 24 14 24Z", "M4 13.5C4 8 8.5 4 14 4s10 4 10 9.5", "M14 4V2"],
  coracao: ["M14 23S4.5 17 4.5 10.5A5 5 0 0 1 14 8a5 5 0 0 1 9.5 2.5C23.5 17 14 23 14 23Z"],
  evidencia: ["M11 3h6v4h-6Z", "M9 5H6.5A1.5 1.5 0 0 0 5 6.5v15A1.5 1.5 0 0 0 6.5 23h15a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 21.5 5H19", "M10 12h8", "M10 16h5"],
  habito: ["M20 10a7 7 0 1 0 2 5", "M22 3v5h-5"],
  check: ["M5 15l6 6L25 8"],
  play: ["M11 8l12 7-12 7Z"],
  seta: ["M6 14h18", "M17 7l7 7-7 7"],
  estrela: ["M14 3l3.2 7 7.5.8-5.6 5.1 1.5 7.4L14 19.8l-6.6 3.5 1.5-7.4L3.3 10.8l7.5-.8Z"],
  fone: ["M7 15a9 9 0 0 1 18 0", "M7 15v5a2 2 0 0 0 2 2h2v-8H9a2 2 0 0 0-2 1Z", "M25 15v5a2 2 0 0 1-2 2h-2v-8h2a2 2 0 0 1 2 1Z"],
  pin: ["M14 26s-8-7.6-8-13a8 8 0 1 1 16 0c0 5.4-8 13-8 13Z", "M14 15.5a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6Z"],
};

const Ic = ({ k, s = 24, c = "currentColor", w = 1.8 }: { k: string; s?: number; c?: string; w?: number }) => (
  <svg width={s} height={s} viewBox="0 0 28 28" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    {(PATHS[k as keyof typeof PATHS] || []).map((d, i) => <path key={i} d={d} />)}
  </svg>
);

export function VidaLeveFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Vida Leve Nutrição";
  const city = client?.city?.trim() || "São Paulo";
  const phone = (client?.whatsapp || "5511999999999").replace(/\D/g, "");
  const wa = (t: string) => `https://wa.me/${phone}?text=${encodeURIComponent(t)}`;
  const [imgOk, setImgOk] = useState<Record<string, boolean>>({});
  const ok = (k: string) => () => setImgOk((m) => ({ ...m, [k]: true }));
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const Ph = ({ src, alt, ratio, k, pos, radius = 22 }: { src: string; alt: string; ratio: string; k: string; pos?: string; radius?: number }) => (
    <div style={{ position: "relative", aspectRatio: ratio, background: `linear-gradient(160deg, ${SAGE}, #dde7cf)`, overflow: "hidden", width: "100%", borderRadius: radius }}>
      <img src={src} alt={alt} loading="lazy" onLoad={ok(k)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: pos || "center", display: "block", opacity: imgOk[k] ? 1 : 0, transition: "opacity .4s" }} />
    </div>
  );

  const servicos = [
    { ic: "prancheta", t: "Consultas individuais", d: "Acompanhamento personalizado pra você alcançar seus objetivos no seu ritmo." },
    { ic: "balanca", t: "Controle de peso", d: "Emagrecimento saudável e sustentável, sem dietas restritivas nem sofrimento." },
    { ic: "digestao", t: "Saúde digestiva", d: "Melhore a digestão e alivie o inchaço com a nutrição certa pro seu corpo." },
    { ic: "pessoa", t: "Nutrição hormonal", d: "Equilíbrio hormonal e mais bem-estar de forma natural, inclusive na SOP." },
    { ic: "prato", t: "Planos alimentares", d: "Planos sob medida que cabem na sua rotina e nas suas preferências." },
  ];

  const stats = [
    ["7+", "Anos de experiência"],
    ["1000+", "Clientes acompanhadas"],
    ["100%", "Planos personalizados"],
    ["Ciência", "Base em evidências"],
  ];

  const depoimentos = [
    { q: "A orientação da Camila me ajudou a perder 9 quilos e me sentir mais confiante do que nunca!", n: "Sofia R.", img: "/nutri-a1.jpg" },
    { q: "Minha energia, minha digestão e minha saúde como um todo melhoraram muito!", n: "Tiago M.", img: "/nutri-a2.jpg" },
    { q: "O plano personalizado era fácil de seguir e gostoso de verdade!", n: "Paula A.", img: "/nutri-a3.jpg" },
  ];

  const receitas = [
    ["/nutri-r1.jpg", "Bowl de smoothie com frutas vermelhas"],
    ["/nutri-r2.jpg", "Suco verde detox"],
    ["/nutri-r3.jpg", "Salada colorida com grãos"],
    ["/nutri-r4.jpg", "Panquecas com frutas"],
    ["/nutri-r5.jpg", "Sopa cremosa de abóbora"],
    ["/nutri-r6.jpg", "Bolinhas energéticas"],
  ];

  return (
    <div className="vidaleve" style={{ background: CREAM, color: INK, fontFamily: sans }}>
      <style>{`
        html,body{background:${CREAM} !important}
        .vidaleve .wrap{max-width:1240px;margin:0 auto;padding:0 28px}
        .vidaleve .kick{color:${GREEN};font-size:12.5px;letter-spacing:.32em;font-weight:600;text-transform:uppercase}
        .vidaleve .pill-g{display:inline-flex;align-items:center;gap:10px;background:${GREEN};color:#fbfaf4;font-weight:600;font-size:14.5px;letter-spacing:.05em;padding:15px 30px;border-radius:8px;border:0;cursor:pointer;text-decoration:none;text-transform:uppercase}
        .vidaleve .pill-g:hover{background:${GREEND}}
        .vidaleve .pill-o{display:inline-flex;align-items:center;gap:10px;background:transparent;color:${INK};font-weight:600;font-size:14.5px;padding:14px 26px;border-radius:8px;border:1.5px solid ${INK};text-decoration:none;text-transform:uppercase;letter-spacing:.05em}
        .vidaleve .h2{font-family:${serif};font-weight:600;font-size:clamp(30px,4.2vw,48px);letter-spacing:-.01em;line-height:1.1;margin:14px 0 12px}
        .vidaleve .sub{color:${MUT};font-size:16.5px;line-height:1.65;max-width:620px}
        .vidaleve .nav-a{background:none;border:0;color:${INK};font:inherit;font-size:14.5px;letter-spacing:.06em;cursor:pointer;padding:6px 2px;text-transform:uppercase}
        .vidaleve .nav-a:hover{color:${GREEN}}
        .vidaleve .grid2{display:grid;gap:56px;align-items:center}
        .vidaleve .card{background:#fff;border-radius:16px;padding:30px 26px 26px;border:1px solid ${LINE};box-shadow:0 14px 38px rgba(36,48,29,.06)}
        .vidaleve .feats{display:grid;gap:26px}
        @media (max-width: 860px){
          .vidaleve .grid2{grid-template-columns:1fr !important;gap:34px !important}
          .vidaleve .feats{grid-template-columns:1fr !important;gap:14px !important}
          .vidaleve .cards5{grid-template-columns:1fr !important}
          .vidaleve .cards3{grid-template-columns:1fr !important}
          .vidaleve .grid6{grid-template-columns:1fr 1fr !important;gap:12px !important}
          .vidaleve .stats4{grid-template-columns:1fr 1fr !important;gap:14px !important}
          .vidaleve .footgrid{grid-template-columns:1fr !important;gap:26px !important}
          .vidaleve .hero-grid{grid-template-columns:1fr !important}
          .vidaleve nav .nav-a{display:none}
          .vidaleve .sobre-bowl{display:none}
        }
        @media (min-width: 861px){
          .vidaleve .feats{grid-template-columns:repeat(3,1fr)}
          .vidaleve .cards5{display:grid;grid-template-columns:repeat(5,1fr);gap:20px}
          .vidaleve .cards3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
          .vidaleve .grid6{display:grid;grid-template-columns:repeat(6,1fr);gap:14px}
          .vidaleve .stats4{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
          .vidaleve .footgrid{display:grid;grid-template-columns:1.4fr 1fr 1fr 1.2fr;gap:40px}
          .vidaleve .hero-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:50px;align-items:center}
        }
      `}</style>

      {/* HEADER */}
      <header style={{ background: CREAM, borderBottom: `1px solid ${LINE}` }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 18, paddingBottom: 18, gap: 18 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Ic k="folha" s={30} c={GREEN} w={1.9} />
            <span style={{ lineHeight: 1 }}>
              <span style={{ fontFamily: serif, fontWeight: 700, fontSize: 21, letterSpacing: ".06em", color: GREEN, display: "block" }}>VIDA LEVE</span>
              <span style={{ fontSize: 10.5, letterSpacing: ".42em", color: MUT }}>NUTRIÇÃO</span>
            </span>
          </span>
          <nav style={{ display: "flex", gap: 26, alignItems: "center" }}>
            {([["Início", "topo"], ["Sobre", "sobre"], ["Serviços", "servicos"], ["Receitas", "receitas"], ["Depoimentos", "depoimentos"]] as [string, string][]).map(([l, id]) => (
              <button key={id} className="nav-a" onClick={() => go(id)}>{l}</button>
            ))}
          </nav>
          <a className="pill-g" href={wa("Olá! Quero agendar uma consulta com a Vida Leve Nutrição.")} target="_blank" rel="noreferrer" style={{ padding: "12px 22px", fontSize: 13 }}>Agendar consulta</a>
        </div>
      </header>

      {/* HERO */}
      <section id="topo" style={{ background: CREAM, padding: "72px 0 84px" }}>
        <div className="wrap hero-grid">
          <div>
            <p className="kick">Nutricionista &amp; coach de bem-estar</p>
            <h1 style={{ fontFamily: serif, fontWeight: 600, fontSize: "clamp(38px,5vw,60px)", letterSpacing: "-.015em", lineHeight: 1.08, margin: "16px 0 20px", color: INK }}>
              Nutrição de verdade,<br /><span style={{ color: GREEN }}>vida mais leve.</span>
            </h1>
            <p className="sub" style={{ marginBottom: 32 }}>Planos de nutrição personalizados que cabem no seu estilo de vida, pra você se sentir bem e alcançar suas metas de saúde.</p>
            <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap", marginBottom: 44 }}>
              <a className="pill-g" href={wa("Olá! Quero começar meu acompanhamento com a Vida Leve.")} target="_blank" rel="noreferrer">Trabalhe comigo <Ic k="seta" s={15} c="#fbfaf4" w={2.2} /></a>
              <a className="pill-o" href={wa("Olá! Quero conhecer melhor o trabalho da Camila.")} target="_blank" rel="noreferrer">
                <span style={{ width: 26, height: 26, borderRadius: "50%", border: `1.5px solid ${INK}`, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Ic k="play" s={11} c={INK} w={2} /></span>
                Assista ao vídeo
              </a>
            </div>
            <div className="feats">
              {[["prancheta", "Planos personalizados", "Feitos pra você"], ["evidencia", "Base científica", "Nutrição com evidência"], ["habito", "Hábitos sustentáveis", "Sem dieta maluca"]].map(([ic, t, d]) => (
                <div key={t as string} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ width: 44, height: 44, borderRadius: "50%", border: `1.5px solid ${LEAF}`, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Ic k={ic as string} s={21} c={GREEN} w={1.7} /></span>
                  <span>
                    <span style={{ fontSize: 15, fontWeight: 600, display: "block" }}>{t}</span>
                    <span style={{ fontSize: 13.5, color: MUT }}>{d}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Ph src="/nutri-hero.jpg" alt="Nutricionista de jaleco branco apoiada em bancada com salada e legumes frescos" ratio="4/4.6" k="hero" pos="50% 30%" radius={24} />
          </div>
        </div>
      </section>

      {/* FAIXA AGENDAR */}
      <section style={{ background: SAGE, padding: "34px 0" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <span style={{ width: 52, height: 52, borderRadius: 14, background: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", border: `1px solid ${LINE}`, flexShrink: 0 }}><Ic k="prancheta" s={26} c={GREEN} w={1.7} /></span>
            <div>
              <p style={{ fontFamily: serif, fontSize: 21, fontWeight: 600, margin: 0 }}>Pronta pra começar sua <span style={{ color: GREEN }}>jornada de saúde</span>?</p>
              <p style={{ margin: "4px 0 0", color: MUT, fontSize: 14.5 }}>Agende uma conversa inicial gratuita.</p>
            </div>
          </div>
          <a className="pill-g" href={wa("Olá! Quero agendar minha conversa inicial gratuita com a Vida Leve.")} target="_blank" rel="noreferrer">Agendar pelo WhatsApp <Ic k="seta" s={15} c="#fbfaf4" w={2.2} /></a>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" style={{ background: CREAM, padding: "96px 0 100px" }}>
        <div className="wrap">
          <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 54px" }}>
            <p className="kick">Como eu posso te ajudar</p>
            <h2 className="h2">Soluções de nutrição <span style={{ color: GREEN }}>pra cada você</span></h2>
          </div>
          <div className="cards5">
            {servicos.map((sv) => (
              <div key={sv.t} className="card" style={{ textAlign: "center" }}>
                <span style={{ width: 64, height: 64, borderRadius: "50%", border: `1.5px solid ${LEAF}`, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}><Ic k={sv.ic} s={29} c={GREEN} w={1.6} /></span>
                <h3 style={{ fontFamily: serif, fontSize: 19, fontWeight: 600, margin: "0 0 10px" }}>{sv.t}</h3>
                <p style={{ color: MUT, fontSize: 14, lineHeight: 1.6, margin: 0 }}>{sv.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" style={{ background: "#fff", padding: "100px 0", borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
        <div className="wrap grid2" style={{ gridTemplateColumns: ".85fr 1.05fr .62fr" }}>
          <div style={{ position: "relative" }}>
            <Ph src="/nutri-sobre.jpg" alt="Camila Ferraz escrevendo em um caderno em mesa de cozinha clara com legumes" ratio="4/4.4" k="sobre" pos="50% 25%" radius={20} />
            <div style={{ position: "absolute", left: 18, bottom: 18, background: "#fff", borderRadius: 16, padding: "18px 22px", boxShadow: "0 18px 44px rgba(36,48,29,.16)", border: `1px solid ${LINE}`, textAlign: "center" }}>
              <Ic k="folha" s={26} c={GREEN} w={1.8} />
              <p style={{ fontFamily: serif, fontSize: 30, fontWeight: 700, color: GREEN, margin: "6px 0 2px" }}>7+</p>
              <p style={{ margin: 0, fontSize: 12.5, color: MUT, lineHeight: 1.4 }}>Anos de experiência<br />ajudando pessoas</p>
            </div>
          </div>
          <div>
            <p className="kick">Sobre mim</p>
            <h2 className="h2" style={{ marginBottom: 4 }}>Oi, eu sou a Camila!</h2>
            <p style={{ fontFamily: script, fontSize: 30, color: GREEN, margin: "0 0 18px" }}>Sua parceira de nutrição</p>
            <p className="sub" style={{ marginBottom: 28 }}>Sou nutricionista e coach de bem-estar, apaixonada por ajudar você a construir uma relação saudável com a comida e com o seu corpo. Minha abordagem é realista, flexível e focada em resultados que duram.</p>
            <div className="stats4" style={{ marginBottom: 32 }}>
              {stats.map(([v, l]) => (
                <div key={l} style={{ textAlign: "center", border: `1px solid ${LINE}`, borderRadius: 14, padding: "16px 10px", background: CREAM }}>
                  <p style={{ fontFamily: serif, fontSize: 24, fontWeight: 700, color: GREEN, margin: 0 }}>{v}</p>
                  <p style={{ margin: "4px 0 0", fontSize: 12.5, color: MUT, lineHeight: 1.35 }}>{l}</p>
                </div>
              ))}
            </div>
            <a className="pill-g" href={wa("Olá, Camila! Quero conhecer mais sobre você e seu trabalho.")} target="_blank" rel="noreferrer">Mais sobre mim <Ic k="seta" s={15} c="#fbfaf4" w={2.2} /></a>
          </div>
          <div className="sobre-bowl">
            <Ph src="/nutri-bowl.jpg" alt="Bowl colorido com grão-de-bico, folhas verdes, batata-doce e abacate visto de cima" ratio="1/1" k="bowl" pos="50% 45%" radius={130} />
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section id="depoimentos" style={{ background: CREAM, padding: "96px 0" }}>
        <div className="wrap">
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 50px" }}>
            <p className="kick">Clientes</p>
            <h2 className="h2">Pessoas reais, <span style={{ color: GREEN }}>resultados reais</span></h2>
          </div>
          <div className="cards3">
            {depoimentos.map((d) => (
              <div key={d.n} className="card" style={{ textAlign: "center", padding: "34px 28px 28px" }}>
                <div style={{ width: 76, height: 76, borderRadius: "50%", overflow: "hidden", margin: "0 auto 18px", background: `linear-gradient(160deg, ${SAGE}, #dde7cf)`, border: `2px solid ${LEAF}` }}>
                  <img src={d.img} alt={`Foto de ${d.n}`} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <p style={{ fontSize: 15.5, lineHeight: 1.65, color: INK, margin: "0 0 16px", fontStyle: "italic" }}>&ldquo;{d.q}&rdquo;</p>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 14.5, color: GREEN }}>— {d.n}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECEITAS */}
      <section id="receitas" style={{ background: SAGE, padding: "96px 0" }}>
        <div className="wrap">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap", marginBottom: 40 }}>
            <div>
              <p className="kick">Inspiração saudável</p>
              <h2 className="h2" style={{ margin: "10px 0 0" }}>Receitas da semana</h2>
            </div>
            <a className="pill-o" href={wa("Olá! Quero receber as receitas da semana da Vida Leve.")} target="_blank" rel="noreferrer" style={{ borderColor: GREEN, color: GREEN }}>Ver todas as receitas <Ic k="seta" s={14} c={GREEN} w={2.2} /></a>
          </div>
          <div className="grid6">
            {receitas.map(([src, alt], i) => (
              <Ph key={i} src={src as string} alt={alt as string} ratio="1/1" k={`r${i}`} radius={14} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ background: GREEN, padding: "64px 0" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 26, flexWrap: "wrap" }}>
          <div>
            <p style={{ fontFamily: serif, fontSize: "clamp(24px,3vw,34px)", fontWeight: 600, color: "#fbfaf4", margin: "0 0 8px" }}>Se inspire, coma bem, viva melhor.</p>
            <p style={{ margin: 0, color: "#cfdcc4", fontSize: 15.5 }}>Dicas saudáveis, receitas e um plano feito pra você, direto no seu WhatsApp.</p>
          </div>
          <a className="pill-g" href={wa("Olá! Quero receber dicas e receitas da Vida Leve Nutrição.")} target="_blank" rel="noreferrer" style={{ background: "#fbfaf4", color: GREEND }}>Chamar no WhatsApp <Ic k="seta" s={15} c={GREEND} w={2.2} /></a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: GREEND, color: "#dfe8d5", padding: "64px 0 0" }}>
        <div className="wrap footgrid">
          <div>
            <span style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <Ic k="folha" s={28} c={LEAF} w={1.9} />
              <span style={{ lineHeight: 1 }}>
                <span style={{ fontFamily: serif, fontWeight: 700, fontSize: 19, letterSpacing: ".06em", color: "#fbfaf4", display: "block" }}>VIDA LEVE</span>
                <span style={{ fontSize: 10, letterSpacing: ".42em", color: "#a9bb96" }}>NUTRIÇÃO</span>
              </span>
            </span>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: "#b9c7a8", margin: 0, maxWidth: 300 }}>Ajudando você a construir hábitos saudáveis e uma vida melhor através de nutrição personalizada.</p>
          </div>
          <div>
            <p style={{ fontSize: 12.5, letterSpacing: ".24em", color: "#a9bb96", margin: "0 0 14px" }}>LINKS</p>
            {([["Início", "topo"], ["Sobre", "sobre"], ["Serviços", "servicos"], ["Receitas", "receitas"]] as [string, string][]).map(([l, id]) => (
              <button key={id} className="nav-a" onClick={() => go(id)} style={{ display: "block", color: "#dfe8d5", padding: "5px 0", fontSize: 14.5, textTransform: "none", letterSpacing: 0 }}>{l}</button>
            ))}
          </div>
          <div>
            <p style={{ fontSize: 12.5, letterSpacing: ".24em", color: "#a9bb96", margin: "0 0 14px" }}>SERVIÇOS</p>
            {servicos.map((sv) => (
              <p key={sv.t} style={{ margin: "0 0 9px", fontSize: 14.5 }}>{sv.t}</p>
            ))}
          </div>
          <div>
            <p style={{ fontSize: 12.5, letterSpacing: ".24em", color: "#a9bb96", margin: "0 0 14px" }}>CONTATO</p>
            <p style={{ margin: "0 0 8px", fontSize: 14.5, display: "flex", gap: 8, alignItems: "center" }}><Ic k="pin" s={16} c={LEAF} w={1.8} /> {city}</p>
            <a href={wa("Olá! Vim pelo site da Vida Leve Nutrição.")} target="_blank" rel="noreferrer" style={{ display: "inline-flex", gap: 8, alignItems: "center", color: LEAF, fontSize: 14.5, textDecoration: "none", fontWeight: 600 }}><Ic k="fone" s={16} c={LEAF} w={1.8} /> Fale conosco</a>
            <p style={{ fontFamily: script, fontSize: 22, color: LEAF, margin: "14px 0 0" }}>Sua saúde, do seu jeito.</p>
          </div>
        </div>
        <div className="wrap" style={{ borderTop: "1px solid rgba(255,255,255,.12)", marginTop: 44, paddingTop: 22, paddingBottom: 22, display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <p style={{ margin: 0, fontSize: 13, color: "#a9bb96" }}>© 2026 {brand} · Todos os direitos reservados</p>
          <p style={{ margin: 0, fontSize: 13, color: "#a9bb96" }}>Feito com carinho em {city}</p>
        </div>
      </footer>
    </div>
  );
}
