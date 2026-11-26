import { useEffect } from "react";

/** Escritório de arquitetura, construído a partir de um pin de pôster "BACS arquitectura": wordmark geométrica gigante + tagline espaçada, título serifado em caixa alta, foto full-bleed de casa orgânica na montanha, desenhos de planta em traço fino nos cantos, texto vertical na lateral e fileira de serviços com ícones de linha. */
const CREAM = "#EFEAE0", CREAM2 = "#E6DFD2", INK = "#171512", INK2 = "#3A362F", GR = "#8C867C", AMBER = "#B97F45", AMBER_TXT = "#8A5A28", AMBER_NUM = "#96662F", WHITE = "#F8F5EE";
const SERVICOS = [
  { t: "Arquitetura de autor", d: "Projetos residenciais exclusivos, desenhados do zero para o seu terreno e o seu modo de viver.", ic: "M6 26 L16 6 L26 26 Z M11 26 V18 h10 v8" },
  { t: "Projetos integrais", d: "Do estudo de viabilidade ao projeto executivo: arquitetura, interiores e paisagismo em uma mão só.", ic: "M7 7 h18 v18 H7 Z M7 16 h18 M16 7 v18" },
  { t: "Design personalizado", d: "Marcenaria, iluminação e materiais especificados peça a peça, nada de catálogo genérico.", ic: "M16 6 a10 10 0 1 0 .1 0 M16 11 v5 l4 3" },
  { t: "Construção e gestão", d: "Acompanhamento de obra semanal e gestão de fornecedores para o projeto sair do papel como foi desenhado.", ic: "M8 26 V12 l8 -6 8 6 v14 M12 26 v-6 h8 v6" },
];
const PROJETOS = [
  { img: "/vao-hero.webp", n: "Casa Curva", l: "Campos do Jordão, SP", a: "380 m²", y: "2025" },
  { img: "/vao-proj1.jpg", n: "Casa Limiar", l: "Gramado, RS", a: "240 m²", y: "2024" },
];
const PASSOS = [
  { n: "01", t: "Escuta e terreno", d: "Tudo começa com uma conversa longa e uma visita ao terreno. Sol, vento, vista e vizinhança viram diretrizes de projeto." },
  { n: "02", t: "Estudo e conceito", d: "Apresentamos o partido em maquete 3D e imagens realistas. Você aprova a ideia antes de qualquer detalhe técnico." },
  { n: "03", t: "Projeto e obra", d: "Executivo completo, compatibilização com engenharia e acompanhamento semanal até a entrega das chaves." },
];
const NUMS = [
  { n: "14", l: "anos de escritório" },
  { n: "120+", l: "projetos entregues" },
  { n: "9", l: "prêmios de arquitetura" },
  { n: "96%", l: "clientes que indicam" },
];
const CHECK = "M7 16l6 6L26 9";
const Ic = ({ d, s = 30, c = "currentColor" }: { d: string; s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);

/** Marca de canto em traço de planta baixa, como os blueprints do pin. */
const Blueprint = ({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) => {
  const style: Record<string, string | number> = { position: "absolute", width: 190, height: 190, opacity: .5, pointerEvents: "none" };
  if (pos === "tl") Object.assign(style, { top: 0, left: 0 });
  if (pos === "tr") Object.assign(style, { top: 0, right: 0, transform: "scaleX(-1)" });
  if (pos === "bl") Object.assign(style, { bottom: 0, left: 0, transform: "scaleY(-1)" });
  if (pos === "br") Object.assign(style, { bottom: 0, right: 0, transform: "scale(-1)" });
  return (
    <svg style={style} viewBox="0 0 190 190" fill="none" stroke={GR} strokeWidth="1" aria-hidden>
      <path d="M10 10 H120 V60 H70 V120 H10 Z" />
      <path d="M70 60 h50 M35 10 v110 M10 90 h60" />
      <circle cx="150" cy="40" r="26" />
      <path d="M150 14 v52 M124 40 h52" />
      <path d="M10 150 h40 M10 160 h40" strokeDasharray="4 4" />
    </svg>
  );
};

export function ArqFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Vão Arquitetura";
  const city = client?.city?.trim() || "Gramado";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const wa = (m: string) => `https://wa.me/${phone || "5511999999999"}?text=${encodeURIComponent(m)}`;
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const geo = "'Archivo', system-ui, sans-serif";
  const serifa = "'Cormorant Garamond', Georgia, serif";
  useEffect(() => {
    const l = document.createElement("link");
    l.href = "https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap";
    l.rel = "stylesheet"; document.head.appendChild(l);
  }, []);
  return (
    <div className="vao" style={{ fontFamily: geo, color: INK, background: CREAM, overflowX: "hidden" }}>
      <style>{`
        html,body{background:${INK}!important}
        .vao h1,.vao h2,.vao h3{font-family:${serifa}!important;font-weight:500;letter-spacing:.02em;text-decoration:none!important;text-transform:uppercase;line-height:1.05;text-wrap:balance}
        .vao blockquote,.vao figure{margin:0}
        .vao .wrap{max-width:1180px;margin:0 auto;padding:0 28px}
        .vao .wordmark{font-family:${geo};font-weight:900;letter-spacing:-.02em;text-transform:uppercase;line-height:.9}
        .vao .btn{display:inline-flex;align-items:center;gap:10px;background:${INK};color:${CREAM};font-family:${geo};font-weight:600;font-size:13px;letter-spacing:.18em;text-transform:uppercase;padding:17px 34px;text-decoration:none;border:none;cursor:pointer;transition:.25s}
        .vao .btn:hover{background:${AMBER};color:${INK}}
        .vao .btn-o{display:inline-flex;align-items:center;gap:10px;background:none;color:${INK};border:1.5px solid ${INK};font-family:${geo};font-weight:600;font-size:12px;letter-spacing:.18em;text-transform:uppercase;padding:15px 30px;cursor:pointer;transition:.25s;text-decoration:none}
        .vao .btn-o:hover{background:${INK};color:${CREAM}}
        .vao .eyebrow{display:inline-flex;align-items:center;gap:14px;font-weight:600;font-size:12px;letter-spacing:.32em;text-transform:uppercase}
        .vao .eyebrow::before{content:"";width:38px;height:1.5px;background:currentColor}
        .vao .vtext{writing-mode:vertical-rl;letter-spacing:.42em;font-size:11px;text-transform:uppercase;font-weight:600;color:${INK2}}
        .vao .srv{border-top:1.5px solid ${INK};padding:26px 4px 0;transition:.25s}
        .vao .srv:hover{background:${CREAM2}}
        .vao .proj{position:relative;overflow:hidden;background:${INK}}
        .vao .proj img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .5s}
        .vao .proj:hover img{transform:scale(1.04)}
        @media (max-width:900px){
          .vao .desk-nav{display:none!important}
          .vao .vtext{display:none!important}
          .vao .bp{display:none!important}
          .vao .hero-h1{font-size:40px!important}
          .vao .hero-wm{font-size:74px!important}
          .vao .hero-wm-sub{font-size:14px!important;letter-spacing:.5em!important}
          .vao .g4{grid-template-columns:1fr 1fr!important}
          .vao .g2{grid-template-columns:1fr!important}
          .vao .proj{min-height:260px!important}
          .vao .hero-pad{padding-bottom:230px!important}
          .vao .hero-fade{background:linear-gradient(180deg, rgba(239,234,224,.96) 0%, rgba(239,234,224,.92) 44%, rgba(239,234,224,.55) 62%, rgba(239,234,224,0) 80%)!important}
        }
        @media (max-width:560px){ .vao .g4{grid-template-columns:1fr!important} .vao .hero-wm{font-size:56px!important} .vao header .btn{display:none!important} }
      `}</style>

      {/* header */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(239,234,224,.95)", backdropFilter: "blur(6px)", borderBottom: `1.5px solid ${INK}` }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 28px" }}>
          <span className="wordmark" style={{ fontSize: 21 }}>{brand.split(" ")[0]}<span style={{ color: AMBER }}>.</span><span style={{ fontWeight: 500, fontSize: 12, letterSpacing: ".34em", marginLeft: 10, verticalAlign: "middle" }}>ARQUITETURA</span></span>
          <nav className="desk-nav" style={{ display: "flex", gap: 30, fontSize: 12, fontWeight: 600, letterSpacing: ".22em", textTransform: "uppercase" }}>
            {[["Projetos", "projetos"], ["Serviços", "servicos"], ["Processo", "processo"], ["Escritório", "escritorio"]].map(([n, id]) => <a key={n} onClick={() => go(id ?? "")} style={{ cursor: "pointer" }}>{n}</a>)}
          </nav>
          <a href={wa("Olá! Quero conversar sobre um projeto com a " + brand + ".")} className="btn" style={{ padding: "12px 22px", fontSize: 11 }}>Iniciar projeto</a>
        </div>
      </header>

      {/* hero: foto full-bleed com a tipografia sobre o céu, como o pôster */}
      <section style={{ position: "relative", overflow: "hidden", background: CREAM }}>
        <img src="/vao-hero.webp" alt={"Casa de arquitetura orgânica projetada pela " + brand + " na serra, concreto e madeira ao pôr do sol"} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 58%" }} />
        <div className="hero-fade" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(239,234,224,.96) 0%, rgba(239,234,224,.9) 32%, rgba(239,234,224,.32) 55%, rgba(239,234,224,0) 68%)" }} />
        <div className="bp"><Blueprint pos="tl" /></div>
        <div className="bp"><Blueprint pos="tr" /></div>
        <div className="vtext" style={{ position: "absolute", left: 26, top: "30%", zIndex: 3, textShadow: "0 0 14px " + CREAM + ", 0 0 4px " + CREAM }}>Projetamos espaços para uma vida extraordinária</div>
        <div className="wrap hero-pad" style={{ position: "relative", zIndex: 2, textAlign: "center", paddingTop: 84, paddingBottom: 340 }}>
          <div className="wordmark hero-wm" style={{ fontSize: 128 }}>VÃO</div>
          <div className="hero-wm-sub" style={{ fontSize: 19, letterSpacing: ".62em", fontWeight: 500, marginTop: 6, textTransform: "lowercase" }}>arquitetura</div>
          <div style={{ width: 56, height: 1.5, background: INK, margin: "26px auto" }} />
          <h1 className="hero-h1" style={{ fontSize: 52, maxWidth: 760, margin: "0 auto" }}>Arquitetura que transcende</h1>
          <div style={{ marginTop: 22, fontSize: 12, fontWeight: 600, letterSpacing: ".34em", textTransform: "uppercase", color: INK, textShadow: "0 1px 12px " + CREAM + ", 0 0 4px " + CREAM }}>Projeto<span style={{ color: AMBER_TXT, margin: "0 14px" }}>·</span>Visão<span style={{ color: AMBER_TXT, margin: "0 14px" }}>·</span>Território</div>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 34, flexWrap: "wrap" }}>
            <a href={wa("Olá! Quero iniciar um projeto de arquitetura com a " + brand + ".")} className="btn">Iniciar meu projeto</a>
            <a onClick={() => go("projetos")} className="btn-o" style={{ background: "rgba(239,234,224,.62)", backdropFilter: "blur(5px)" }}>Ver projetos</a>
          </div>
        </div>
      </section>

      {/* serviços: fileira de ícones de linha como a base do pôster */}
      <section id="servicos" style={{ background: CREAM, padding: "76px 0 84px", borderTop: `1.5px solid ${INK}` }}>
        <div className="wrap">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 18, marginBottom: 46 }}>
            <div>
              <div className="eyebrow" style={{ color: AMBER_TXT }}>O que fazemos</div>
              <h2 style={{ fontSize: 40, marginTop: 14 }}>Da primeira linha à chave na mão</h2>
            </div>
            <p style={{ maxWidth: 380, fontSize: 15, lineHeight: 1.7, color: INK2 }}>Um escritório pequeno por escolha: cada projeto tem dedicação de autor e acompanhamento direto dos sócios.</p>
          </div>
          <div className="g4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 34 }}>
            {SERVICOS.map((s) => (
              <div key={s.t} className="srv">
                <Ic d={s.ic} c={AMBER} />
                <h3 style={{ fontSize: 21, margin: "18px 0 10px", fontFamily: `${geo}!important`, fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase" }}>{s.t}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: INK2 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* projetos */}
      <section id="projetos" style={{ background: INK, color: CREAM, padding: "84px 0" }}>
        <div className="wrap">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 18, marginBottom: 48 }}>
            <div>
              <div className="eyebrow" style={{ color: AMBER }}>Portfólio</div>
              <h2 style={{ fontSize: 40, marginTop: 14, color: CREAM }}>Projetos recentes</h2>
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".3em", textTransform: "uppercase", color: GR }}>2019 — 2026</div>
          </div>
          <div className="g2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 26 }}>
            {PROJETOS.map((p) => (
              <div key={p.n}>
                <div className="proj" style={{ minHeight: 380 }}>
                  <img src={p.img} alt={"Projeto " + p.n + " em " + p.l + ", pela " + brand} loading="lazy" />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 16, borderTop: `1.5px solid ${AMBER}`, paddingTop: 14 }}>
                  <div>
                    <div style={{ fontFamily: serifa, fontSize: 26, textTransform: "uppercase" }}>{p.n}</div>
                    <div style={{ fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: GR, marginTop: 4 }}>{p.l}</div>
                  </div>
                  <div style={{ fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase", color: GR, textAlign: "right" }}>{p.a}<br />{p.y}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* processo */}
      <section id="processo" style={{ background: CREAM, padding: "84px 0" }}>
        <div className="wrap">
          <div className="eyebrow" style={{ color: AMBER_TXT }}>Como trabalhamos</div>
          <h2 style={{ fontSize: 40, margin: "14px 0 48px" }}>Três passos, nenhuma surpresa</h2>
          <div className="g4" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 34 }}>
            {PASSOS.map((p) => (
              <div key={p.n} style={{ borderTop: `3px solid ${INK}`, paddingTop: 22 }}>
                <div style={{ fontFamily: serifa, fontSize: 46, color: AMBER_NUM }}>{p.n}</div>
                <h3 style={{ fontSize: 20, margin: "12px 0 10px", fontFamily: `${geo}!important`, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em" }}>{p.t}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: INK2 }}>{p.d}</p>
              </div>
            ))}
          </div>
          <div className="g4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 26, marginTop: 70, textAlign: "center" }}>
            {NUMS.map((n) => (
              <div key={n.l} style={{ border: `1.5px solid ${INK}`, padding: "30px 10px" }}>
                <div style={{ fontFamily: serifa, fontSize: 44 }}>{n.n}</div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".26em", textTransform: "uppercase", color: INK2, marginTop: 8 }}>{n.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* escritório / citação */}
      <section id="escritorio" style={{ background: CREAM2, padding: "84px 0", borderTop: `1.5px solid ${INK}` }}>
        <div className="wrap" style={{ textAlign: "center", maxWidth: 820 }}>
          <div className="eyebrow" style={{ color: AMBER_TXT, justifyContent: "center" }}>O escritório</div>
          <p style={{ fontFamily: serifa, fontSize: 34, lineHeight: 1.35, marginTop: 26, textTransform: "none" }}>
            "Casa boa é a que some na paisagem e aparece na vida de quem mora. Desenhamos para o lugar, nunca contra ele."
          </p>
          <div style={{ marginTop: 26, fontSize: 12, fontWeight: 600, letterSpacing: ".28em", textTransform: "uppercase" }}>Helena Vão <span style={{ color: INK2 }}>· arquiteta fundadora, CAU RS</span></div>
          <div style={{ marginTop: 34, fontSize: 12, fontWeight: 600, letterSpacing: ".26em", textTransform: "uppercase", color: INK2 }}>Projeto único por cliente<span style={{ color: AMBER_TXT, margin: "0 12px" }}>·</span>Obra acompanhada<span style={{ color: AMBER_TXT, margin: "0 12px" }}>·</span>Sem taxa escondida</div>
        </div>
      </section>

      {/* contato / footer */}
      <footer style={{ background: INK, color: CREAM, padding: "84px 0 40px", position: "relative", overflow: "hidden" }}>
        <div className="bp"><Blueprint pos="br" /></div>
        <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ textAlign: "center", maxWidth: 780, margin: "0 auto" }}>
            <div className="eyebrow" style={{ color: AMBER, justifyContent: "center" }}>Vamos desenhar?</div>
            <h2 style={{ fontSize: 46, margin: "18px 0 16px", color: CREAM }}>Seu terreno tem um projeto esperando</h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: GR, maxWidth: 520, margin: "0 auto" }}>A primeira conversa é gratuita e sem compromisso: você conta a ideia, a gente mostra o caminho.</p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 34, flexWrap: "wrap" }}>
              <a href={wa("Olá! Quero uma conversa gratuita sobre um projeto com a " + brand + ".")} className="btn" style={{ background: AMBER, color: INK }}>Agendar conversa gratuita</a>
              <a href={wa("Olá! Quero receber o portfólio completo da " + brand + ".")} className="btn-o" style={{ color: CREAM, borderColor: CREAM }}>Receber portfólio</a>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14, marginTop: 76, borderTop: "1px solid " + INK2, paddingTop: 26, fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase", color: GR }}>
            <span className="wordmark" style={{ fontSize: 16, color: CREAM }}>{brand.split(" ")[0]}<span style={{ color: AMBER }}>.</span></span>
            <span>{city} · Serra Gaúcha</span>
            <span>Seg–Sex, 9h às 18h</span>
            <span>© 2026 {brand}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
