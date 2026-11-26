import { useEffect } from "react";

/** Psicóloga clínica (TCC) à risca do pin escuro/dourado (varredura E-23): hero escuro com partículas gold, monograma circular, checklist e retrato; faixa "Agende sua sessão" com 5 features; seção "NÃO É NORMAL E NÃO É SAUDÁVEL" com cérebro light-painting e 8 sintomas com marcador pérola; divisor bege; atendimento online com laptop em círculos gold; depoimentos em itálico; sobre com foto em poltrona sobre painel bege diagonal + selo circular. Reserva fecha no WhatsApp. Nome fictício novo (Helena Duarte), nada da marca/nome do pin. */
const BG = "#171009", BG2 = "#211810", GOLD = "#c9a86a", GOLDL = "#e6cd96", TXT = "#f2ead9", MUT = "#a89880", BEGE = "#e7dcc5", INK = "#241a0e", LINE = "rgba(230,205,150,.16)";

const CHECK = ["Produtividade", "Inteligência Emocional", "Relacionamentos Saudáveis", "Desenvolvimento de Hábitos Saudáveis"];

const FEATS = ["50 Minutos", "Vídeo em tempo real", "Sigilo Absoluto", "Ambiente Seguro e Livre de Julgamento", "Sem sair de casa, com conforto e praticidade"];

const SINTOMAS = [
  "ESTAR ANSIOSO O TEMPO TODO",
  "ESTAR IRRITADO O TEMPO TODO",
  "SE PREOCUPAR COM A OPINIÃO ALHEIA O TEMPO TODO",
  "ESTAR TRISTE O TEMPO TODO",
  "SENSAÇÃO DE CANSAÇO O TEMPO TODO",
  "ESTAR EM LUTA O TEMPO TODO",
  "QUERER AGRADAR A TODOS O TEMPO TODO",
  "SE COBRAR DEMAIS",
];

const DEPO = [
  { t: "A Helena é incrível! Conduz a terapia de forma leve e busca sempre entender nossas angústias. Saio de cada sessão com clareza sobre o que levar para a vida.", n: "Camila" },
  { t: "Me ajudou a superar medos e travas com técnicas simples para controlar a ansiedade. Hoje entendo muito melhor minhas reações e sigo um caminho que é meu.", n: "Renata" },
  { t: "Profissional incrível, sempre me deixou confortável desde a primeira sessão. Recuperei uma qualidade de vida que eu não tinha há anos.", n: "Diego" },
];

function Ph({ src, alt, ratio, wide, pos, soft }: { src: string; alt: string; ratio: string; wide?: boolean; pos?: string; soft?: boolean }) {
  return (
    <div style={{ position: "relative", aspectRatio: ratio, background: soft ? "transparent" : `linear-gradient(160deg, ${BG2}, ${BG})`, overflow: "hidden", width: "100%" }}>
      <img src={src} alt={alt} loading={wide ? undefined : "lazy"} onLoad={(e) => { e.currentTarget.style.opacity = "1"; }} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: pos || "center", display: "block", opacity: 0,
            ...(soft ? { mixBlendMode: "lighten" as const, WebkitMaskImage: "radial-gradient(ellipse 92% 90% at 50% 50%, #000 55%, transparent 85%)", maskImage: "radial-gradient(ellipse 92% 90% at 50% 50%, #000 55%, transparent 85%)" } : {}), transition: "opacity .4s" }} />
    </div>
  );
}

function Selo({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 128 128" width={size} height={size} aria-hidden style={{ display: "block" }}>
      <defs><path id="hd-circ" d="M 64,64 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0" /></defs>
      <text textLength="288" lengthAdjust="spacingAndGlyphs" style={{ font: "500 10px 'Jost',sans-serif", letterSpacing: ".1em", fill: GOLD }}>
        <textPath href="#hd-circ">HELENA DUARTE · PSICÓLOGA CLÍNICA ·</textPath>
      </text>
      <text x="64" y="72" textAnchor="middle" style={{ font: "400 30px 'Playfair Display',serif", letterSpacing: ".06em", fill: GOLD }}>HD</text>
    </svg>
  );
}

export function HelenaFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Helena Duarte";
  const city = client?.city?.trim() || "São Paulo";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const wa = (m: string) => `https://wa.me/${phone || "5511999999999"}?text=${encodeURIComponent(m)}`;
  const book = (m: string) => window.open(wa(m), "_blank");

  useEffect(() => {
    document.title = `${brand} · Psicóloga Clínica em ${city}`;
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..700;1,400..700&family=Jost:ital,wght@0,200..600;1,200..600&display=swap";
    document.head.appendChild(l);
  }, [brand, city]);

  return (
    <div className="helena" style={{ background: BG, color: TXT, fontFamily: "'Jost', sans-serif", minHeight: "100vh" }}>
      <style>{`
        html,body{background:${BG}!important}
        .helena .wrap{max-width:1180px;margin:0 auto;padding:0 28px}
        .helena .h{font-family:'Jost',sans-serif;font-weight:300;letter-spacing:.01em;margin:0;color:${TXT}}
        .helena .caps{font:400 11px 'Jost',sans-serif;letter-spacing:.3em;color:${GOLD};margin:0}
        .helena .pill{display:inline-flex;align-items:center;justify-content:center;border-radius:999px;padding:14px 34px;font:500 13px 'Jost',sans-serif;letter-spacing:.08em;cursor:pointer;border:none;transition:opacity .2s}
        .helena .pill:hover{opacity:.88}
        .helena .pill-g{background:linear-gradient(180deg,${GOLDL},${GOLD});color:${INK}}
        .helena .pill-d{background:${INK};color:${GOLDL};border:1px solid rgba(230,205,150,.25)}
        .helena .grid2{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center}
        .helena .feats{display:grid;grid-template-columns:repeat(5,1fr)}
        .helena .feat{display:flex;align-items:center;gap:12px;padding:18px 20px;font:300 13px 'Jost',sans-serif;line-height:1.5;color:${TXT}}
        .helena .feat + .feat{border-left:1px solid ${LINE}}
        .helena .sin{display:flex;align-items:center;gap:16px;padding:13px 0;border-bottom:1px solid ${LINE};font:400 12.5px 'Jost',sans-serif;letter-spacing:.14em;color:${TXT}}
        .helena .pearl{flex:none;width:17px;height:17px;border-radius:50%;background:radial-gradient(circle at 34% 30%, #fffdf6, #e9dcc0 58%, #b7a887);box-shadow:0 1px 4px rgba(0,0,0,.45)}
        .helena .depo{display:grid;grid-template-columns:repeat(3,1fr);gap:44px}
        .helena .depo p{font-family:'Playfair Display',serif;font-style:italic;font-weight:400;font-size:15.5px;line-height:1.8;color:${TXT};margin:0}
        .helena .depo .n{font:400 12px 'Jost',sans-serif;letter-spacing:.14em;color:${MUT};margin-top:18px}
        .helena .bullet{display:flex;gap:12px;margin:0 0 20px;font-size:14.5px;line-height:1.75;color:${TXT}}
        .helena .bullet b{font-weight:500;color:${GOLDL}}
        .helena .diamond{flex:none;width:7px;height:7px;background:${GOLD};transform:rotate(45deg);margin-top:9px}
        @media (max-width: 900px){
          .helena .grid2{grid-template-columns:1fr!important;gap:40px}
          .helena .feats{grid-template-columns:1fr 1fr}
          .helena .feat + .feat{border-left:none}
          .helena .feat{border-top:1px solid ${LINE}}
          .helena .depo{grid-template-columns:1fr;gap:34px}
          .helena .hero-in{min-height:0!important;padding-top:110px!important}
        }
      `}</style>

      {/* HERO escuro com partículas */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: 780 }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background:
          "radial-gradient(circle at 8% 22%, rgba(230,205,150,.5) 0 1.5px, transparent 2.5px)," +
          "radial-gradient(circle at 16% 58%, rgba(230,205,150,.35) 0 2px, transparent 3px)," +
          "radial-gradient(circle at 4% 78%, rgba(230,205,150,.28) 0 3px, transparent 5px)," +
          "radial-gradient(circle at 88% 14%, rgba(230,205,150,.45) 0 2px, transparent 3.5px)," +
          "radial-gradient(circle at 94% 44%, rgba(230,205,150,.3) 0 3px, transparent 5px)," +
          "radial-gradient(circle at 78% 8%, rgba(230,205,150,.22) 0 5px, transparent 9px)," +
          "radial-gradient(circle at 70% 88%, rgba(230,205,150,.25) 0 4px, transparent 8px)," +
          "radial-gradient(circle at 30% 90%, rgba(230,205,150,.18) 0 5px, transparent 10px)" }} />
        <div className="wrap hero-in" style={{ position: "relative", zIndex: 2, minHeight: 780, display: "flex", flexDirection: "column", justifyContent: "center", padding: "70px 28px" }}>
          <div style={{ position: "absolute", top: 34, left: 28 }}><Selo size={92} /></div>
          <div className="grid2" style={{ alignItems: "center" }}>
            <div>
              <h1 className="h" style={{ fontSize: 42, lineHeight: 1.22, maxWidth: 480 }}>Conquiste sua <span style={{ color: GOLDL }}>autonomia emocional</span> e bem-estar.</h1>
              <div style={{ margin: "30px 0 26px" }}>
                {CHECK.map((c) => (
                  <div key={c} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, fontSize: 15, fontWeight: 300, color: TXT }}>
                    <span aria-hidden style={{ flex: "none", width: 13, height: 13, borderRadius: "50%", border: `1.5px solid ${GOLD}`, position: "relative" }}>
                      <span style={{ position: "absolute", inset: 3, borderRadius: "50%", background: GOLD }} />
                    </span>
                    {c}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap" }}>
                <span style={{ fontSize: 12, lineHeight: 1.6, color: MUT, maxWidth: 150 }}>seu futuro começa com a decisão que você toma hoje</span>
                <button className="pill pill-g" onClick={() => book(`Olá! Quero agendar uma sessão com a ${brand}.`)}>Agendar sessão</button>
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <Ph src="/psico-hero.jpg" alt="Retrato de psicóloga sorridente de blazer escuro em fundo escuro com bokeh dourado" ratio="4/5" />
              <div aria-hidden style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, ${BG} 0%, transparent 26%), linear-gradient(0deg, ${BG} 0%, transparent 18%), linear-gradient(270deg, ${BG} 0%, transparent 10%)` }} />
            </div>
          </div>
        </div>
      </section>

      {/* FAIXA AGENDE SUA SESSÃO */}
      <section style={{ padding: "70px 0 60px", borderTop: `1px solid ${LINE}` }}>
        <div className="wrap">
          <h2 className="h" style={{ fontSize: 30, marginBottom: 34 }}>Agende sua sessão.</h2>
          <div className="feats">
            {FEATS.map((f) => (
              <div key={f} className="feat">
                <span aria-hidden style={{ flex: "none", width: 8, height: 8, borderRadius: "50%", background: GOLD }} />
                {f}
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.8, color: MUT, maxWidth: 560, margin: "34px 0 0" }}>O seu futuro começa com a decisão que você toma hoje, não decidir também é uma decisão, seja sua prioridade e cuide de você!</p>
        </div>
      </section>

      {/* NÃO É NORMAL */}
      <section style={{ padding: "90px 0", background: BG2, borderTop: `1px solid ${LINE}` }}>
        <div className="wrap grid2" style={{ gridTemplateColumns: "5fr 6fr" }}>
          <div><Ph src="/psico-cerebro.jpg" alt="Cérebro desenhado em rabiscos de luz branca sobre fundo escuro" ratio="1/1" pos="28% 50%" soft /></div>
          <div>
            <h2 className="h" style={{ fontSize: 32, lineHeight: 1.3, marginBottom: 30 }}>NÃO É NORMAL E NÃO É SAUDÁVEL</h2>
            {SINTOMAS.map((s) => (
              <div key={s} className="sin"><span className="pearl" aria-hidden />{s}</div>
            ))}
            <p style={{ fontSize: 13.5, lineHeight: 1.8, color: MUT, margin: "26px 0 0" }}>Tais sintomas não é você, são apenas um estado que você pode aprender a controlar e equilibrar.</p>
            <p style={{ fontSize: 13.5, lineHeight: 1.8, color: MUT, margin: "14px 0 0" }}>Não acumule suas dificuldades e tensões do dia-a-dia, cuide de sua saúde mental.</p>
          </div>
        </div>
      </section>

      {/* DIVISOR BEGE */}
      <section style={{ background: BEGE, padding: "34px 0" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 28, flexWrap: "wrap" }}>
          <p style={{ fontSize: 14.5, lineHeight: 1.7, fontWeight: 300, color: INK, maxWidth: 620, margin: 0 }}>Em minha atuação clínica, priorizo um atendimento de escuta empática e acolhedora, possibilitando o desenvolvimento de um plano terapêutico objetivo e eficiente para cada caso.</p>
          <button className="pill pill-d" onClick={() => book(`Olá! Quero agendar uma sessão com a ${brand}.`)}>Agendar sessão</button>
        </div>
      </section>

      {/* ATENDIMENTO ONLINE */}
      <section style={{ padding: "100px 0", borderTop: `1px solid ${LINE}` }}>
        <div className="wrap grid2">
          <div>
            <h2 className="h" style={{ fontSize: 34, lineHeight: 1.25, maxWidth: 420 }}>Atendimento psicológico de onde estiver.</h2>
            <p style={{ fontSize: 14.5, lineHeight: 1.85, fontWeight: 300, color: TXT, margin: "30px 0 0" }}>Meu objetivo é auxiliar você a lidar com questões que estejam te trazendo desconforto, atrapalhando seu bem-estar, suas atividades ou relações.</p>
            <p style={{ fontSize: 14.5, lineHeight: 1.85, fontWeight: 300, color: TXT, margin: "18px 0 0" }}>Na primeira parte do atendimento eu vou te ouvir, conhecer suas queixas e o que te motivou a me procurar.</p>
            <p style={{ fontSize: 14.5, lineHeight: 1.85, fontWeight: 500, color: GOLDL, margin: "18px 0 0" }}>É o seu momento de desabafar e contar o que você tem feito até agora para lidar com os desafios.</p>
            <p style={{ fontSize: 14.5, lineHeight: 1.85, fontWeight: 300, color: TXT, margin: "18px 0 0" }}>Feito isso, te explico como a terapia cognitivo comportamental funciona para seu caso, desenvolvendo um plano terapêutico para que você continue e se mantenha no rumo certo em direção aos seus objetivos.</p>
          </div>
          <div style={{ position: "relative", padding: 40 }}>
            <div aria-hidden style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `1px solid rgba(230,205,150,.35)` }} />
            <div aria-hidden style={{ position: "absolute", inset: 26, borderRadius: "50%", border: `1px solid rgba(230,205,150,.22)` }} />
            <div style={{ position: "relative" }}>
              <div style={{ border: "12px solid #0d0a07", borderBottomWidth: 22, borderRadius: "16px 16px 0 0", overflow: "hidden", background: "#0d0a07", boxShadow: "0 30px 80px rgba(0,0,0,.55)" }}>
                <div aria-hidden style={{ position: "absolute", top: 6, left: "50%", width: 5, height: 5, marginLeft: -2.5, borderRadius: "50%", background: "#3d342a", zIndex: 3 }} />
                <Ph src="/psico-video.jpg" alt="Psicóloga atendendo por videochamada, vista da tela do laptop" ratio="16/10" wide />
              </div>
              <div aria-hidden style={{ height: 16, margin: "0 -7%", background: "linear-gradient(180deg, #4a4034 0%, #2b2116 55%, #191009 100%)", borderRadius: "0 0 14px 14px", boxShadow: "0 18px 40px rgba(0,0,0,.5)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section style={{ padding: "40px 0 100px" }}>
        <div className="wrap">
          <h2 className="h" style={{ fontSize: 30, marginBottom: 40 }}>O que estão falando das sessões</h2>
          <div className="depo">
            {DEPO.map((d) => (
              <div key={d.n}>
                <p>“{d.t}”</p>
                <div className="n">{d.n}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section style={{ padding: "100px 0", background: BG2, borderTop: `1px solid ${LINE}` }}>
        <div className="wrap grid2" style={{ gridTemplateColumns: "6fr 5fr" }}>
          <div>
            <h2 className="h" style={{ fontSize: 32, marginBottom: 34 }}>{brand}:</h2>
            <p className="bullet"><span className="diamond" aria-hidden /><span><b>Abordagem:</b> Terapia cognitivo comportamental.</span></p>
            <p className="bullet"><span className="diamond" aria-hidden /><span><b>Especialidades:</b> Transtornos de ansiedade, TOC, Síndrome do pânico, Fobia Social, Transtornos depressivos, procrastinação, questões sexuais, demandas de relacionamentos. Modificações e desenvolvimento de hábitos saudáveis.</span></p>
            <p className="bullet"><span className="diamond" aria-hidden /><span>(A partir de 18 anos)</span></p>
            <p className="bullet"><span className="diamond" aria-hidden /><span><b>Experiência da profissional</b> – A psicóloga conta com uma bagagem e experiência de mais de 2.500 consultas realizadas, de forma que você vai ter uma pessoa com muitas horas de atendimento na bagagem.</span></p>
            <p className="bullet"><span className="diamond" aria-hidden /><span><b>Neurociência</b> – Atualmente dentro da psicologia, o conhecimento sobre a neurociência dos principais problemas e transtornos torna o atendimento muito mais assertivo.</span></p>
          </div>
          <div style={{ position: "relative" }}>
            <div aria-hidden style={{ position: "absolute", inset: "8% -3% 0 10%", background: BEGE, clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0 100%)" }} />
            <div style={{ position: "relative", maxWidth: 360, marginLeft: "auto", marginTop: "8%", marginRight: "4%" }}>
              <Ph src="/psico-sobre.jpg" alt="Psicóloga sentada em poltrona clara sorrindo, roupa em tom bege" ratio="4/5" />
              <div style={{ position: "absolute", top: -34, left: -34, transform: "rotate(-8deg)" }}><Selo size={110} /></div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: BEGE, padding: "40px 0" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <p style={{ fontSize: 13.5, lineHeight: 1.7, fontWeight: 300, color: INK, maxWidth: 440, margin: 0 }}>Você pode encontrá-la também nas redes sociais ou falar direto com o consultório.</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button className="pill pill-d" onClick={() => book(`Olá! Vi o Instagram da ${brand} e quero agendar uma sessão.`)}>Instagram</button>
            <button className="pill pill-d" onClick={() => book(`Olá! Quero falar com a ${brand}.`)}>Falar no WhatsApp</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
