import { useEffect } from "react";

/** Escola de natação construída do zero a partir de um pin de pôster tipográfico: a palavra repetida em letras condensadas gigantes preenchidas com água, sobre fundo creme, com um turbilhão de fitas de onda cortando a composição. Pôster 100% tipográfico sem fotos: o artefato central é o quadro semanal de turmas. */
const CR = "#f3edde", CR2 = "#e9e1cc", AZ = "#17a2c0", AZ2 = "#0b6e8c", AZ3 = "#7fdcf0", INK = "#10222b", WH = "#fbf8f0";
const TURMAS = [
  { t: "Baby", f: "6 meses – 3 anos", d: "SÁB", h: "09h00", v: "4 vagas" },
  { t: "Infantil 1", f: "4 – 7 anos", d: "SEG · QUA", h: "17h00", v: "3 vagas", hot: true },
  { t: "Infantil 2", f: "8 – 12 anos", d: "TER · QUI", h: "18h00", v: "5 vagas" },
  { t: "Adolescente", f: "13 – 17 anos", d: "SEG · QUA", h: "19h00", v: "2 vagas", hot: true },
  { t: "Adulto iniciante", f: "zero → 25 m crawl", d: "TER · QUI", h: "07h00 e 20h00", v: "6 vagas" },
  { t: "Adulto avançado", f: "técnica dos 4 nados", d: "SEG · QUA · SEX", h: "06h30", v: "4 vagas" },
  { t: "Hidro 55+", f: "baixo impacto", d: "SEG · QUA · SEX", h: "10h00", v: "8 vagas" },
  { t: "Master", f: "competição", d: "TER · QUI · SÁB", h: "20h30", v: "seletiva" },
];
const PLANOS = [
  { n: "2× por semana", t: "Base", p: "R$ 189", per: "/mês", feats: ["1 turma fixa de sua escolha", "Avaliação de nível a cada ciclo", "Graduação de toucas", "Reposição em até 7 dias"], cta: "Começar na base" },
  { n: "3× por semana", t: "Ritmo", p: "R$ 239", per: "/mês", feats: ["Até 2 turmas combinadas", "Planilha de técnica mensal", "Vídeo-análise do nado a cada ciclo", "Prioridade na troca de horário"], cta: "Pegar ritmo", hot: true },
  { n: "Livre + Master", t: "Fundo", p: "R$ 289", per: "/mês", feats: ["Acesso a todas as turmas", "Treinos de competição Master", "Planilha de volume semanal", "Inscrição nos jogos internos"], cta: "Ir fundo" },
];
const PASSOS = [
  { n: "01", t: "Aula experimental", d: "Você entra na água com um professor só pra você. A gente avalia seu nível real, sem compromisso e sem custo." },
  { n: "02", t: "Turma certa", d: "Nada de turma lotada: no máximo 6 alunos por raia, separados por faixa e nível. Você nada com quem nada como você." },
  { n: "03", t: "Graduação por toucas", d: "Cada estágio conquistado troca a cor da sua touca: branca, amarela, verde, azul e preta. Progresso que dá pra ver de fora da piscina." },
];
const NUMEROS = [
  { v: "12", l: "anos de escola" },
  { v: "940+", l: "alunos formados" },
  { v: "31 °C", l: "água o ano inteiro" },
  { v: "4.9", l: "avaliação dos alunos" },
];
const TESTI = [
  { n: "Renata Vasquez", r: "Mãe do Theo, Infantil 1", t: "Meu filho tinha pavor de água. Em quatro meses de turma ele atravessa a piscina rindo. O esquema das toucas vira obsessão de criança: ele conta os dias pra trocar de cor." },
  { n: "Paulo H. Mendes", r: "Adulto iniciante, 52 anos", t: "Passei 50 anos dizendo que não levava jeito. Na aula experimental o professor identificou o erro em dez minutos. Hoje nado 1 km antes do trabalho." },
  { n: "Dra. Sílvia Nóbrega", r: "Hidro 55+", t: "Entrei por indicação do ortopedista, pra coluna. Fiquei pela turma: pontualidade britânica, água quentinha e professor que sabe o nome de todo mundo." },
];
const TOUCAS = ["#fbf8f0", "#ffd23f", "#3fae5a", "#17a2c0", "#10222b"];

/** Onda de fitas que corta o pôster, estilo turbilhão do pin. */
const Swirl = () => (
  <g fill="none" strokeLinecap="round">
    <path d="M1180 285 C 900 375, 980 490, 640 545 S 240 680, 60 835" stroke={AZ2} strokeWidth="26" />
    <path d="M1200 330 C 940 420, 1000 520, 680 575 S 300 715, 120 860" stroke={AZ} strokeWidth="16" />
    <path d="M1160 245 C 860 340, 940 475, 600 530 S 180 645, 20 810" stroke={AZ3} strokeWidth="10" />
    <path d="M1210 380 C 980 455, 1030 545, 740 600 S 380 750, 200 885" stroke={WH} strokeWidth="6" />
    <path d="M1140 210 C 830 315, 910 455, 570 510 S 140 615, -10 780" stroke={AZ2} strokeWidth="8" />
  </g>
);

export function CardumeFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Cardume";
  const city = client?.city?.trim() || "Maceió";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const wa = (m: string) => `https://wa.me/${phone || "5511999999999"}?text=${encodeURIComponent(m)}`;
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const display = "'Barlow Condensed', 'Arial Narrow', sans-serif";
  useEffect(() => {
    const l = document.createElement("link");
    l.href = "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=Barlow:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap";
    l.rel = "stylesheet"; document.head.appendChild(l);
  }, []);
  return (
    <div className="cardume" style={{ fontFamily: "'Barlow', system-ui, sans-serif", color: INK, background: CR, overflowX: "hidden" }}>
      <style>{`
        body{background:${CR}}
        .cardume h1,.cardume h2,.cardume h3{font-family:${display}!important;font-weight:800;letter-spacing:.005em;text-decoration:none!important;text-transform:uppercase;line-height:.9}
        .cardume blockquote,.cardume figure{margin:0}
        .cardume .wrap{max-width:1180px;margin:0 auto;padding:0 28px}
        .cardume .btn{display:inline-flex;align-items:center;gap:10px;background:${INK};color:${CR};font-weight:700;font-size:15px;letter-spacing:.04em;text-transform:uppercase;padding:17px 34px;text-decoration:none;border:none;cursor:pointer;transition:.22s;border-radius:999px}
        .cardume .btn:hover{background:${AZ2};transform:translateY(-2px)}
        .cardume .btn-b{display:inline-flex;align-items:center;gap:10px;background:${AZ3};color:${INK};font-weight:700;font-size:15px;letter-spacing:.04em;text-transform:uppercase;padding:17px 34px;cursor:pointer;transition:.22s;text-decoration:none;border-radius:999px}
        .cardume .btn-b:hover{background:${AZ3}}
        .cardume .eyebrow{font-size:13.5px;font-weight:700;letter-spacing:.22em;text-transform:uppercase}
        .cardume .rule{height:2px;background:${INK};opacity:.85}
        .cardume .marq{overflow:hidden;white-space:nowrap}
        .cardume .marq-in{display:inline-block;animation:cardume-marq 30s linear infinite}
        @keyframes cardume-marq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .cardume .trow{display:grid;grid-template-columns:1.5fr 1.2fr .9fr .9fr .7fr;gap:14px;align-items:center;padding:20px 4px;border-top:2px solid ${INK}}
        .cardume .trow:last-child{border-bottom:2px solid ${INK}}
        .cardume .card{background:${WH};border:2px solid ${INK};border-radius:18px;padding:30px 28px;display:flex;flex-direction:column;gap:0}
        .cardume .card.hot{background:${INK};color:${CR}}
        .cardume .chip{display:inline-block;background:${AZ};color:${INK};font-weight:700;font-size:12.5px;letter-spacing:.08em;text-transform:uppercase;padding:5px 12px;border-radius:999px}
        .cardume .tcard{background:${WH};border:2px solid ${INK};border-radius:18px;padding:28px}
        .cardume .mono{width:52px;height:52px;border-radius:999px;background:${AZ};color:${INK};display:flex;align-items:center;justify-content:center;font-family:${display};font-weight:800;font-size:22px}
        @media(max-width:860px){
          .cardume .trow{grid-template-columns:1fr auto;grid-template-areas:"t v" "f f" "d d" "h h";row-gap:4px}
          .cardume .thead{display:none}
          .cardume .tt{grid-area:t}.cardume .tv{grid-area:v;justify-self:end}.cardume .tf{grid-area:f}.cardume .td{grid-area:d}.cardume .th{grid-area:h}
        }
      `}</style>

      {/* HERO — pôster tipográfico */}
      <section style={{ position: "relative", paddingTop: 26 }}>
        <div className="wrap">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <span className="eyebrow">{brand} <span aria-hidden style={{ color: AZ2 }}>≈</span> Escola de Natação</span>
            <span className="eyebrow" style={{ color: AZ2 }}>{city} · desde 2013</span>
          </div>
          <div className="rule" style={{ marginTop: 14 }} />
        </div>
        <div className="wrap" style={{ textAlign: "center", paddingTop: 34 }}>
          <p className="eyebrow" style={{ color: AZ2, marginBottom: 6, textWrap: "balance", maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>Do primeiro banho de piscina ao pódio</p>
          <h1 style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>{brand} Escola de Natação em {city}: aulas de natação para bebês, crianças, adultos e hidroginástica</h1>
          <svg viewBox="0 0 1200 880" role="img" aria-label="Pôster com a palavra Cardume repetida em letras gigantes preenchidas com água" style={{ width: "100%", maxWidth: 980, height: "auto", display: "block", margin: "0 auto" }}>
            <defs>
              <linearGradient id="cd-water" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={AZ3} />
                <stop offset=".45" stopColor={AZ} />
                <stop offset="1" stopColor={AZ2} />
              </linearGradient>
              <filter id="cd-wf" x="0" y="0" width="100%" height="100%">
                <feTurbulence type="fractalNoise" baseFrequency="0.028 0.042" numOctaves="3" seed="11" />
                <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  3.2 3.2 3.2 0 -4.4" />
              </filter>
              <filter id="cd-wf2" x="0" y="0" width="100%" height="100%">
                <feTurbulence type="fractalNoise" baseFrequency="0.016 0.026" numOctaves="3" seed="4" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.04  0 0 0 0 0.36  0 0 0 0 0.55  2.6 2.6 2.6 0 -3.6" />
              </filter>
              <pattern id="cd-caustic" width="340" height="340" patternUnits="userSpaceOnUse">
                <rect width="340" height="340" filter="url(#cd-wf)" />
              </pattern>
              <pattern id="cd-depth" width="380" height="380" patternUnits="userSpaceOnUse">
                <rect width="380" height="380" filter="url(#cd-wf2)" />
              </pattern>
            </defs>
            <Swirl />
            <g fontFamily={display} fontWeight="800" fontSize="215" textAnchor="middle" letterSpacing="2">
              {[175, 340, 505, 670, 825].map((y) => (
                <g key={y}>
                  <text x="600" y={y} fill="url(#cd-water)">CARDUME</text>
                  <text x="600" y={y} fill="url(#cd-depth)">CARDUME</text>
                  <text x="600" y={y} fill="url(#cd-caustic)">CARDUME</text>
                </g>
              ))}
            </g>
          </svg>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginTop: 30 }}>
            <a className="btn" href={wa(`Olá! Quero agendar uma aula experimental de natação na ${brand}.`)} target="_blank" rel="noreferrer">Aula experimental grátis</a>
            <button className="btn-b" onClick={() => go("turmas")}>Ver quadro de turmas</button>
          </div>
          <div className="rule" style={{ marginTop: 40 }} />
          <div style={{ display: "flex", justifyContent: "space-between", gap: 14, flexWrap: "wrap", padding: "14px 0 34px" }}>
            <span className="eyebrow" style={{ fontSize: 12.5 }}>Bebês · crianças · adultos · 55+</span>
            <span className="eyebrow" style={{ fontSize: 12.5, color: AZ2 }}>Máx. 6 alunos por raia</span>
          </div>
        </div>
      </section>

      {/* FAIXA MARQUEE */}
      <div style={{ background: AZ2, padding: "16px 0", transform: "rotate(-1.1deg)", margin: "0 -10px" }} className="marq" aria-hidden>
        <div className="marq-in">
          {[0, 1].map((k) => (
            <span key={k} style={{ fontFamily: display, fontWeight: 700, fontSize: 30, color: CR, textTransform: "uppercase", letterSpacing: ".04em" }}>
              {"Nado livre ≈ Borboleta ≈ Peito ≈ Costas ≈ Medley ≈ Hidroginástica ≈ Natação baby ≈ ".repeat(2)}
            </span>
          ))}
        </div>
      </div>

      {/* QUADRO DE TURMAS */}
      <section id="turmas" style={{ paddingTop: 92, paddingBottom: 96 }}>
        <div className="wrap">
          <p className="eyebrow" style={{ color: AZ2, marginBottom: 10 }}>Artefato da escola</p>
          <h2 style={{ fontSize: "clamp(44px,6.5vw,88px)", margin: "0 0 8px" }}>Quadro de turmas</h2>
          <p style={{ fontSize: 17, maxWidth: 560, lineHeight: 1.6, margin: "0 0 34px" }}>
            O quadro da semana, afixado na entrada da piscina e aqui. Turmas pequenas, horários fixos e vaga garantida na matrícula.
          </p>
          <div className="trow thead" style={{ borderTop: "none", padding: "0 4px 10px" }}>
            {["Turma", "Faixa / objetivo", "Dias", "Horário", "Vagas"].map((h) => (
              <span key={h} className="eyebrow" style={{ fontSize: 12, color: AZ2 }}>{h}</span>
            ))}
          </div>
          {TURMAS.map((r) => (
            <div className="trow" key={r.t}>
              <span className="tt" style={{ fontFamily: display, fontWeight: 800, fontSize: "clamp(26px,3.2vw,38px)", textTransform: "uppercase", color: AZ2, lineHeight: 1 }}>{r.t}</span>
              <span className="tf" style={{ fontSize: 14.5, fontWeight: 600 }}>{r.f}</span>
              <span className="td" style={{ fontSize: 14.5, fontWeight: 700, letterSpacing: ".06em" }}>{r.d}</span>
              <span className="th" style={{ fontSize: 14.5 }}>{r.h}</span>
              <span className="tv">{r.hot ? <span className="chip">{r.v}</span> : <span style={{ fontSize: 14, fontWeight: 600, color: AZ2 }}>{r.v}</span>}</span>
            </div>
          ))}
          <p style={{ fontSize: 14, marginTop: 18, color: INK, opacity: .8 }}>Quadro do mês corrente. Horários de feriado e férias escolares são avisados no grupo da turma. <span className="chip" style={{ fontSize: 11 }}>azul</span> = últimas vagas (3 ou menos).</p>
        </div>
      </section>

      {/* PLANOS */}
      <section style={{ background: AZ2, paddingTop: 92, paddingBottom: 100, position: "relative" }}>
        <div className="wrap">
          <p className="eyebrow" style={{ color: CR, marginBottom: 10 }}>Sem taxa de matrícula</p>
          <h2 style={{ fontSize: "clamp(44px,6.5vw,88px)", color: CR, margin: "0 0 40px" }}>Planos de nado</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(300px,100%),1fr))", gap: 22 }}>
            {PLANOS.map((p) => (
              <div className={`card${p.hot ? " hot" : ""}`} key={p.n}>
                <span style={{ fontFamily: display, fontWeight: 800, fontSize: 34, textTransform: "uppercase", lineHeight: 1 }}>{p.n}</span>
                <span className="eyebrow" style={{ fontSize: 12, color: p.hot ? AZ3 : AZ2, marginTop: 6 }}>{p.t}</span>
                <div style={{ margin: "20px 0 18px" }}>
                  <span style={{ fontFamily: display, fontWeight: 800, fontSize: 58, lineHeight: 1 }}>{p.p}</span>
                  <span style={{ fontSize: 15, fontWeight: 600 }}>{p.per}</span>
                </div>
                <ul style={{ listStyle: "none", margin: "0 0 26px", padding: 0, display: "grid", gap: 11 }}>
                  {p.feats.map((f) => (
                    <li key={f} style={{ display: "flex", gap: 10, fontSize: 15, lineHeight: 1.45 }}>
                      <svg width="18" height="18" viewBox="0 0 32 32" fill="none" stroke={p.hot ? AZ3 : AZ2} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden style={{ flexShrink: 0, marginTop: 2 }}><path d="M7 16l6 6L26 9" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href={wa(`Olá! Quero me matricular no plano ${p.n} da ${brand}.`)} target="_blank" rel="noreferrer" className={p.hot ? "btn-b" : "btn"} style={{ marginTop: "auto", justifyContent: "center" }}>{p.cta}</a>
              </div>
            ))}
          </div>
          <p style={{ color: CR, fontSize: 15, marginTop: 24 }}>Todos os planos incluem a aula experimental, armário no vestiário e o grupo da turma no WhatsApp. Cancelamento quando quiser, sem multa.</p>
          <div style={{ marginTop: 30 }}><a className="btn-b" href={wa(`Olá! Quero agendar uma aula experimental de natação na ${brand}.`)} target="_blank" rel="noreferrer">Aula experimental grátis</a></div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section style={{ paddingTop: 92, paddingBottom: 96 }}>
        <div className="wrap">
          <p className="eyebrow" style={{ color: AZ2, marginBottom: 10 }}>Como funciona</p>
          <h2 style={{ fontSize: "clamp(44px,6.5vw,88px)", margin: "0 0 44px" }}>Do deck pra raia</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(300px,100%),1fr))", gap: 22 }}>
            {PASSOS.map((s) => (
              <div className="tcard" key={s.n}>
                <span style={{ fontFamily: display, fontWeight: 800, fontSize: 52, color: AZ, lineHeight: 1 }}>{s.n}</span>
                <h3 style={{ fontSize: 30, margin: "14px 0 10px" }}>{s.t}</h3>
                <p style={{ fontSize: 15.5, lineHeight: 1.6, margin: 0 }}>{s.d}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 36, flexWrap: "wrap" }}>
            <span className="eyebrow" style={{ fontSize: 12.5, color: AZ2 }}>Escala de toucas:</span>
            {TOUCAS.map((c, i) => (
              <span key={i} title={["Branca", "Amarela", "Verde", "Azul", "Preta"][i]} style={{ width: 44, height: 33, background: c, border: `2px solid ${INK}`, borderRadius: "22px 22px 8px 8px" }} />
            ))}
            <span style={{ fontSize: 15 }}>branca → preta, cada cor um estágio conquistado na água.</span>
          </div>
        </div>
      </section>

      {/* NÚMEROS */}
      <section style={{ background: INK, paddingTop: 56, paddingBottom: 60 }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(220px,100%),1fr))", gap: 26, textAlign: "center" }}>
          {NUMEROS.map((n) => (
            <div key={n.l}>
              <div style={{ fontFamily: display, fontWeight: 800, fontSize: "clamp(48px,5.5vw,74px)", color: AZ3, lineHeight: 1 }}>{n.v}</div>
              <div className="eyebrow" style={{ color: CR, fontSize: 12.5, marginTop: 8 }}>{n.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section style={{ paddingTop: 92, paddingBottom: 96 }}>
        <div className="wrap">
          <p className="eyebrow" style={{ color: AZ2, marginBottom: 10 }}>Quem já nada com a gente</p>
          <h2 style={{ fontSize: "clamp(40px,5.5vw,72px)", margin: "0 0 40px" }}>Vozes do deck</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(320px,100%),1fr))", gap: 22 }}>
            {TESTI.map((t) => (
              <figure className="tcard" key={t.n}>
                <blockquote style={{ fontSize: 16, lineHeight: 1.65, margin: 0 }}>&ldquo;{t.t}&rdquo;</blockquote>
                <figcaption style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 22 }}>
                  <span className="mono">{t.n.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span>
                  <span>
                    <strong style={{ display: "block", fontSize: 15.5 }}>{t.n}</strong>
                    <span style={{ fontSize: 13.5, color: AZ2, fontWeight: 600 }}>{t.r}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ background: AZ2, position: "relative", overflow: "hidden" }}>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 60, display: "block" }}>
          <path d="M0 0h1200v20c-100 26-200-14-300 8s-200 30-300 6-200-26-300 0-200 32-300 8V0z" fill={CR} />
        </svg>
        <div className="wrap" style={{ textAlign: "center", paddingTop: 120, paddingBottom: 104 }}>
          <p className="eyebrow" style={{ color: CR, marginBottom: 18 }}>Aula experimental gratuita</p>
          <h2 style={{ fontSize: "clamp(58px,10vw,140px)", color: CR, margin: "0 0 22px", letterSpacing: ".01em" }}>Mergulha.</h2>
          <p style={{ fontSize: 18, color: CR, maxWidth: 540, margin: "0 auto 40px", lineHeight: 1.6, opacity: .92 }}>
            Chama no WhatsApp, escolhe o horário e vem com roupa de banho e toalha. A primeira aula é por nossa conta: avaliação de nível e braçada de presente.
          </p>
          <a className="btn" href={wa(`Olá! Quero mergulhar: agendar a aula experimental gratuita na ${brand}.`)} target="_blank" rel="noreferrer" style={{ fontSize: 16, padding: "20px 46px", background: CR, color: INK }}>Chamar no WhatsApp</a>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer style={{ background: INK, borderTop: `3px solid ${AZ}` }}>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 18, flexWrap: "wrap", paddingTop: 34, paddingBottom: 34 }}>
          <div>
            <span style={{ fontFamily: display, fontWeight: 800, fontSize: 22, color: AZ3, textTransform: "uppercase" }}>{brand} <span style={{ color: CR }}>≈ Escola de Natação</span></span>
            <p style={{ fontSize: 13.5, color: CR, margin: "8px 0 0", opacity: .8 }}>Piscina coberta e aquecida · {city} · Seg a Sáb, 06h às 21h</p>
          </div>
          <div style={{ display: "flex", gap: 26, flexWrap: "wrap", alignItems: "center" }}>
            <a href={wa("Olá! Vim pelo site e quero saber mais sobre as aulas.")} target="_blank" rel="noreferrer" style={{ color: CR, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>WhatsApp</a>
            <span style={{ color: CR, fontSize: 13, opacity: .7 }}>Modelo da Vitrine SemSite</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
