import { useEffect } from "react";

/** Escolinha de futebol construída do zero a partir de um pin de pôster tipográfico ("SPRING INTO ACTION"): palavras condensadas gigantes em azul-marinho empilhadas sobre creme, entremeadas por uma mancha orgânica vermelha que flui atrás das letras, com ecos azul-acinzentados. Pôster 100% tipográfico sem fotos: o artefato central é a tabela do campeonato interno da escolinha. */
const CR = "#f6e7dc", CR2 = "#eeddca", VM = "#f04a1d", VMT = "#c2421a", VM2 = "#ff6a3d", NV = "#1a2350", PL = "#c9d4da", WH = "#fdf8f1";
const TABELA = [
  { pos: 1, t: "Tubarões", b: "Potengi", p: 18, j: 7, v: 6, e: 0, d: 1, sg: "+14" },
  { pos: 2, t: "Relâmpagos", b: "Tirol", p: 16, j: 7, v: 5, e: 1, d: 1, sg: "+9" },
  { pos: 3, t: "Falcões", b: "Petrópolis", p: 13, j: 7, v: 4, e: 1, d: 2, sg: "+6" },
  { pos: 4, t: "Trovões", b: "Alecrim", p: 10, j: 7, v: 3, e: 1, d: 3, sg: "−2" },
  { pos: 5, t: "Cometas", b: "Lagoa Nova", p: 7, j: 7, v: 2, e: 1, d: 4, sg: "−8" },
  { pos: 6, t: "Guerreiros", b: "Candelária", p: 3, j: 7, v: 1, e: 0, d: 6, sg: "−19" },
];
const CATEGORIAS = [
  { n: "Sub-7", i: "6 e 7 anos", d: "TER · QUI", h: "17h00", v: "5 vagas" },
  { n: "Sub-9", i: "8 e 9 anos", d: "TER · QUI", h: "18h00", v: "4 vagas" },
  { n: "Sub-11", i: "10 e 11 anos", d: "SEG · QUA", h: "17h30", v: "3 vagas", hot: true },
  { n: "Sub-13", i: "12 e 13 anos", d: "SEG · QUA", h: "18h30", v: "6 vagas" },
  { n: "Sub-15", i: "14 e 15 anos", d: "TER · QUI", h: "19h30", v: "2 vagas", hot: true },
  { n: "Goleiros", i: "todas as idades", d: "SÁB", h: "08h00", v: "4 vagas" },
];
const PLANOS = [
  { n: "Mensal", t: "Pra experimentar", p: "R$ 149", per: "/mês", feats: ["2 treinos por semana", "Campeonato interno aos sábados", "Avaliação técnica a cada ciclo", "Grupo da categoria no WhatsApp"], cta: "Escolher o mensal" },
  { n: "Trimestral", t: "O preferido", p: "R$ 129", per: "/mês", feats: ["Tudo do plano mensal", "Uniforme oficial do campeonato incluso", "1 treino extra de fundamentos por mês", "Relatório de evolução por ciclo"], cta: "Escolher o trimestral", hot: true, selo: true },
  { n: "Anual", t: "Projeto craque", p: "R$ 109", per: "/mês", feats: ["Tudo do trimestral", "Peneiras e festivais externos", "Acompanhamento escolar-esportivo", "Camisa e agasalho de viagem"], cta: "Escolher o ano" },
];
const PASSOS = [
  { n: "01", t: "Aula experimental", d: "Seu filho treina de graça com a categoria da idade dele. A gente avalia com calma e você assiste de perto, sem compromisso." },
  { n: "02", t: "Categoria certa", d: "Turmas por idade e nível, no máximo 14 alunos por professor. Fundamentos primeiro: passe, condução, finalização e jogo coletivo." },
  { n: "03", t: "Jogo de verdade", d: "Todo sábado tem rodada do campeonato interno. É na tabela, no gol e no apito que o aprendizado da semana vira confiança." },
];
const NUMEROS = [
  { v: "10", l: "anos de escolinha" },
  { v: "320", l: "alunos em atividade" },
  { v: "6", l: "categorias por idade" },
  { v: "4.9/5", l: "avaliação das famílias" },
];
const TESTI = [
  { n: "Karla Dantas", r: "Mãe do Enzo, Sub-9", t: "O Enzo era o menino que ficava no canto na educação física. Em seis meses de escolinha ele virou capitão do time do bairro. O campeonato de sábado é o evento da família." },
  { n: "Sérgio Furtado", r: "Pai da Manu, Sub-13", t: "Professores que ensinam sem gritar, tabela atualizada no grupo e relatório de evolução de verdade. A Manu entrou tímida e hoje cobra até falta." },
  { n: "Patrícia Gomes", r: "Mãe do Davi, Sub-7", t: "Meu filho sai de cada treino contando o que aprendeu. E eu fico tranquila: espaço fechado, água, primeiro socorro e professor que conhece cada criança pelo nome." },
];

/** Manchas orgânicas do pin: duas atrás das letras, uma faixa que cruza POR CIMA do wordmark (entrelaçamento). */
const BlobBackA = () => (
  <path
    d="M830 50 C 990 30, 1065 170, 1005 295 C 955 400, 770 380, 725 480 C 680 580, 905 615, 965 715 C 1025 825, 885 950, 705 930 C 565 915, 605 800, 465 770 C 325 740, 145 800, 92 690 C 40 580, 195 520, 225 430 C 255 340, 125 300, 155 200 C 185 100, 430 80, 575 60 Z"
    fill={VM}
  />
);
const BlobBackB = () => (
  <path
    d="M70 130 C 50 60, 190 25, 275 65 C 360 105, 320 215, 215 235 C 110 255, 90 195, 70 130 Z"
    fill={VM}
  />
);
const BlobFront = () => (
  <path
    d="M-20 235 C 180 195, 400 260, 610 220 C 820 180, 990 250, 1100 225 L 1100 285 C 930 320, 730 255, 530 295 C 330 335, 120 275, -20 305 Z"
    fill={VM}
  />
);
/** Segunda faixa por cima, cruzando o FRENTE na diagonal como a fita laranja sobre o ACTION do pin. */
const BlobFront2 = () => (
  <path
    d="M1100 795 C 920 840, 770 790, 570 830 C 370 872, 190 812, -20 856 L -20 916 C 210 870, 410 934, 610 892 C 810 850, 950 908, 1100 866 Z"
    fill={VM}
  />
);
/** Eco cinza-azulado claro do pin, atrás das letras. */
const BlobGray = () => (
  <path
    d="M118 418 C 58 378, 88 278, 188 283 C 288 288, 318 398, 238 438 C 178 468, 148 443, 118 418 Z"
    fill={PL}
    opacity="0.55"
  />
);

export function BolaPraFrenteFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Bola pra Frente";
  const city = client?.city?.trim() || "Natal";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const wa = (m: string) => `https://wa.me/${phone || "5511999999999"}?text=${encodeURIComponent(m)}`;
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const display = "'Big Shoulders Display', 'Arial Narrow', sans-serif";
  useEffect(() => {
    const l = document.createElement("link");
    l.href = "https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@600;700;800&family=Barlow:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap";
    l.rel = "stylesheet"; document.head.appendChild(l);
  }, []);
  return (
    <div className="bpf" style={{ fontFamily: "'Barlow', system-ui, sans-serif", color: NV, background: CR, overflowX: "hidden" }}>
      <style>{`
        body{background:${CR}}
        .bpf h1,.bpf h2,.bpf h3{font-family:${display}!important;font-weight:800;letter-spacing:.005em;text-decoration:none!important;text-transform:uppercase;line-height:.88}
        .bpf blockquote,.bpf figure{margin:0}
        .bpf .wrap{max-width:1180px;margin:0 auto;padding:0 28px}
        .bpf .btn{display:inline-flex;align-items:center;gap:10px;background:${NV};color:${CR};font-weight:700;font-size:15px;letter-spacing:.04em;text-transform:uppercase;padding:18px 36px;text-decoration:none;border:none;cursor:pointer;transition:.22s}
        .bpf .btn:hover{background:${VM};transform:translateY(-2px)}
        .bpf .btn-v{display:inline-flex;align-items:center;gap:10px;background:${VM};color:${WH};font-weight:700;font-size:15px;letter-spacing:.04em;text-transform:uppercase;padding:18px 36px;cursor:pointer;transition:.22s;text-decoration:none}
        .bpf .btn-v:hover{background:#d93a12}
        .bpf .btn-o{display:inline-flex;align-items:center;gap:10px;background:none;color:${NV};border:2px solid ${NV};font-weight:700;font-size:15px;letter-spacing:.04em;text-transform:uppercase;padding:16px 32px;cursor:pointer;transition:.22s;text-decoration:none}
        .bpf .btn-o:hover{background:${NV};color:${CR}}
        .bpf .eyebrow{font-size:13.5px;font-weight:700;letter-spacing:.2em;text-transform:uppercase}
        .bpf .rule{height:2px;background:${NV}}
        .bpf .marq{overflow:hidden;white-space:nowrap}
        .bpf .marq-in{display:inline-block;animation:bpf-marq 28s linear infinite}
        @keyframes bpf-marq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .bpf .trow{display:grid;grid-template-columns:.5fr 1.7fr .55fr .45fr .4fr .4fr .4fr .6fr;gap:10px;align-items:center;padding:16px 4px;border-top:2px solid ${NV}}
        .bpf .trow:last-child{border-bottom:2px solid ${NV}}
        .bpf .chip{display:inline-block;background:${VMT};color:${WH};font-weight:700;font-size:12.5px;letter-spacing:.08em;text-transform:uppercase;padding:5px 12px;border-radius:999px}
        .bpf .card{background:${WH};border:2px solid ${NV};padding:30px 28px;display:flex;flex-direction:column}
        .bpf .card.hot{background:${NV};color:${CR}}
        .bpf .tcard{background:${WH};border:2px solid ${NV};padding:28px}
        .bpf .mono{width:52px;height:52px;border-radius:999px;background:${VM};color:${WH};display:flex;align-items:center;justify-content:center;font-family:${display};font-weight:800;font-size:22px}
        .bpf .tmeta{display:none;font-size:13.5px;font-weight:600;color:${NV};opacity:.8}
        .bpf .tnum,.bpf .tpts{font-variant-numeric:tabular-nums;text-align:right}
        @media (prefers-reduced-motion: reduce){.bpf .marq-in{animation:none}}
        .bpf .crow{display:grid;grid-template-columns:auto 1fr auto auto;gap:18px;align-items:center;padding:18px 4px;border-top:2px solid ${CR}}
        .bpf .crow:last-child{border-bottom:2px solid ${CR}}
        @media(max-width:860px){
          .bpf .trow{grid-template-columns:auto 1fr auto;grid-template-areas:"p t pt" "p b pt" "n n n";row-gap:2px}
          .bpf .thead{display:none}
          .bpf .tp{grid-area:p}.bpf .tt{grid-area:t}.bpf .tb{grid-area:b}.bpf .tpts{grid-area:pt;justify-self:end}
          .bpf .tnum{display:none}
          .bpf .tmeta{display:block!important}
          .bpf .crow{grid-template-columns:1fr auto;grid-template-areas:"n v" "i i" "d d";row-gap:4px}
          .bpf .cn{grid-area:n}.bpf .ci{grid-area:i}.bpf .cd{grid-area:d}.bpf .cv{grid-area:v;justify-self:end}
        }
      `}</style>

      {/* HERO — pôster tipográfico */}
      <section style={{ position: "relative", paddingTop: 26 }}>
        <div className="wrap">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <span className="eyebrow">{brand} <span aria-hidden style={{ color: VM }}>◆</span> Escolinha de Futebol</span>
            <span className="eyebrow topcity" style={{ color: VMT }}>{city} · desde 2016</span>
            <style>{`@media(max-width:560px){.bpf .topcity{display:none}}`}</style>
          </div>
          <div className="rule" style={{ marginTop: 14 }} />
        </div>
        <div className="wrap" style={{ textAlign: "center", paddingTop: 30 }}>
          <p className="eyebrow" style={{ color: VMT, marginBottom: 20, textWrap: "balance", maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>Todo sábado tem jogo. Toda semana tem evolução.</p>
          <h1 style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>{brand} Escolinha de Futebol em {city}: aulas de futebol infantil do sub-7 ao sub-15 com campeonato interno</h1>
          <svg viewBox="0 0 1080 1000" role="img" aria-label="Pôster com as palavras Bola pra Frente em letras gigantes de ponta a ponta, entremeadas por manchas vermelhas" style={{ width: "100%", height: "auto", display: "block", margin: "0 auto" }}>
            <BlobGray />
            <BlobBackA />
            <BlobBackB />
            <g fontFamily={display} fontWeight="800" textAnchor="middle">
              <g fill={PL} transform="translate(14,16)">
                <text x="540" y="300" fontSize="360" textLength="1020" lengthAdjust="spacingAndGlyphs">BOLA</text>
                <text x="540" y="640" fontSize="360" textLength="1020" lengthAdjust="spacingAndGlyphs">PRA</text>
                <text x="540" y="975" fontSize="360" textLength="1020" lengthAdjust="spacingAndGlyphs">FRENTE</text>
              </g>
              <g fill={NV}>
                <text x="540" y="300" fontSize="360" textLength="1020" lengthAdjust="spacingAndGlyphs">BOLA</text>
                <text x="540" y="640" fontSize="360" textLength="1020" lengthAdjust="spacingAndGlyphs">PRA</text>
                <text x="540" y="975" fontSize="360" textLength="1020" lengthAdjust="spacingAndGlyphs">FRENTE</text>
              </g>
            </g>
            <BlobFront />
            <BlobFront2 />
          </svg>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginTop: 26 }}>
            <a className="btn-v" href={wa(`Olá! Quero agendar uma aula experimental gratuita na escolinha ${brand}.`)} target="_blank" rel="noreferrer">Aula experimental grátis</a>
            <button className="btn-o" onClick={() => go("campeonato")}>Ver tabela do campeonato</button>
          </div>
          <div className="rule" style={{ marginTop: 38 }} />
          <div style={{ display: "flex", justifyContent: "space-between", gap: 14, flexWrap: "wrap", padding: "14px 0 34px" }}>
            <span className="eyebrow" style={{ fontSize: 12.5 }}>Sub-7 · Sub-9 · Sub-11 · Sub-13 · Sub-15 · Goleiros</span>
            <span className="eyebrow" style={{ fontSize: 12.5, color: VMT }}>Máx. 14 alunos por professor</span>
          </div>
        </div>
      </section>

      {/* FAIXA MARQUEE */}
      <div style={{ background: VM, padding: "15px 0", transform: "rotate(-1.1deg)", margin: "0 -10px" }} className="marq" aria-hidden>
        <div className="marq-in">
          {[0, 1].map((k) => (
            <span key={k} style={{ fontFamily: display, fontWeight: 700, fontSize: 30, color: WH, textTransform: "uppercase", letterSpacing: ".05em" }}>
              {"Passe • Condução • Finalização • Jogo coletivo • Campeonato aos sábados • ".repeat(2)}
            </span>
          ))}
        </div>
      </div>

      {/* TABELA DO CAMPEONATO */}
      <section id="campeonato" style={{ paddingTop: 92, paddingBottom: 96 }}>
        <div className="wrap">
          <p className="eyebrow" style={{ color: VMT, marginBottom: 10 }}>Artefato da escolinha</p>
          <h2 style={{ fontSize: "clamp(44px,6.5vw,88px)", margin: "0 0 8px" }}>Tabela do campeonato</h2>
          <p style={{ fontSize: 17, maxWidth: 580, lineHeight: 1.6, margin: "0 0 34px" }}>
            Série Bairros, 8ª rodada a caminho. Seis times, um por bairro, pontos corridos e final em jogo único no fim do trimestre. A tabela de verdade, atualizada toda segunda no grupo das famílias.
          </p>
          <div className="trow thead" style={{ borderTop: "none", padding: "0 4px 10px" }}>
            {["#", "Time", "P", "J", "V", "E", "D", "SG"].map((h) => (
              <span key={h} className="eyebrow" style={{ fontSize: 12, color: VM }}>{h}</span>
            ))}
          </div>
          {TABELA.map((r) => (
            <div className="trow" key={r.t}>
              <span className="tp" style={{ fontFamily: display, fontWeight: 800, fontSize: "clamp(24px,3vw,34px)", color: r.pos === 1 ? VM : NV, lineHeight: 1 }}>{r.pos}º</span>
              <span className="tt" style={{ fontFamily: display, fontWeight: 800, fontSize: "clamp(24px,3vw,34px)", textTransform: "uppercase", lineHeight: 1 }}>{r.t} <span className="tb" style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 600, fontSize: 13, color: VMT, letterSpacing: ".06em" }}>{r.b}</span>
                <span className="tmeta">{r.j}J · {r.v}V {r.e}E {r.d}D · SG {r.sg}</span>
              </span>
              <span className="tpts" style={{ fontFamily: display, fontWeight: 800, fontSize: "clamp(24px,3vw,34px)", lineHeight: 1 }}>{r.p}</span>
              <span className="tnum" style={{ fontSize: 15, fontWeight: 600 }}>{r.j}</span>
              <span className="tnum" style={{ fontSize: 15 }}>{r.v}</span>
              <span className="tnum" style={{ fontSize: 15 }}>{r.e}</span>
              <span className="tnum" style={{ fontSize: 15 }}>{r.d}</span>
              <span className="tnum" style={{ fontSize: 15, fontWeight: 700 }}>{r.sg}</span>
            </div>
          ))}
          <p style={{ fontSize: 14, marginTop: 18, opacity: .8 }}>P = pontos · J = jogos · V/E/D = vitórias, empates e derrotas · SG = saldo de gols. Os 4 primeiros vão ao mata-mata do troféu Série Bairros.</p>
        </div>
      </section>

      {/* CATEGORIAS */}
      <section style={{ background: NV, paddingTop: 92, paddingBottom: 100 }}>
        <div className="wrap">
          <p className="eyebrow" style={{ color: CR, marginBottom: 10 }}>Turmas por idade</p>
          <h2 style={{ fontSize: "clamp(44px,6.5vw,88px)", color: CR, margin: "0 0 40px" }}>Categorias</h2>
          <div style={{ display: "grid", gap: 0 }}>
            {CATEGORIAS.map((c) => (
              <div className="crow" key={c.n}>
                <span className="cn" style={{ fontFamily: display, fontWeight: 800, fontSize: "clamp(30px,4vw,44px)", color: VM, lineHeight: 1, minWidth: 118 }}>{c.n}</span>
                <span className="ci" style={{ fontSize: 15, color: CR, fontWeight: 600 }}>{c.i}</span>
                <span className="cd" style={{ fontSize: 14.5, color: CR, fontWeight: 700, letterSpacing: ".06em" }}>{c.d} · {c.h}</span>
                <span className="cv">{c.hot ? <span className="chip">{c.v}</span> : <span style={{ fontSize: 14, color: PL, fontWeight: 600 }}>{c.v}</span>}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 14, marginTop: 18, color: CR, opacity: .85 }}><span className="chip" style={{ fontSize: 11 }}>vermelho</span> = últimas vagas (3 ou menos). Espera aberta nas turmas lotadas: a vaga é chamada por ordem de chegada.</p>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section style={{ paddingTop: 92, paddingBottom: 96 }}>
        <div className="wrap">
          <p className="eyebrow" style={{ color: VMT, marginBottom: 10 }}>Como funciona</p>
          <h2 style={{ fontSize: "clamp(44px,6.5vw,88px)", margin: "0 0 44px" }}>Do primeiro treino ao apito</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(300px,100%),1fr))", gap: 22 }}>
            {PASSOS.map((s) => (
              <div className="tcard" key={s.n}>
                <span style={{ fontFamily: display, fontWeight: 800, fontSize: 52, color: VM, lineHeight: 1 }}>{s.n}</span>
                <h3 style={{ fontSize: 30, margin: "14px 0 10px" }}>{s.t}</h3>
                <p style={{ fontSize: 16.5, lineHeight: 1.6, margin: 0 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANOS */}
      <section style={{ background: CR2, paddingTop: 92, paddingBottom: 100 }}>
        <div className="wrap">
          <p className="eyebrow" style={{ color: VMT, marginBottom: 10 }}>Sem taxa de matrícula</p>
          <h2 style={{ fontSize: "clamp(44px,6.5vw,88px)", margin: "0 0 40px" }}>Planos</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(300px,100%),1fr))", gap: 22 }}>
            {PLANOS.map((p) => (
              <div className={`card${p.hot ? " hot" : ""}`} key={p.n} style={{ position: "relative" }}>
                {p.hot && <span className="chip" style={{ position: "absolute", top: -15, left: 24 }}>O preferido</span>}
                <span style={{ fontFamily: display, fontWeight: 800, fontSize: 38, textTransform: "uppercase", lineHeight: 1 }}>{p.n}</span>
                <span className="eyebrow" style={{ fontSize: 12, color: p.hot ? CR : VMT, marginTop: 6 }}>{p.t}</span>
                <div style={{ margin: "20px 0 18px" }}>
                  <span style={{ fontFamily: display, fontWeight: 800, fontSize: 62, lineHeight: 1 }}>{p.p}</span>
                  <span style={{ fontSize: 15, fontWeight: 600 }}>{p.per}</span>
                </div>
                <ul style={{ listStyle: "none", margin: "0 0 26px", padding: 0, display: "grid", gap: 11 }}>
                  {p.feats.map((f) => (
                    <li key={f} style={{ display: "flex", gap: 10, fontSize: 15, lineHeight: 1.45 }}>
                      <svg width="18" height="18" viewBox="0 0 32 32" fill="none" stroke={VM} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden style={{ flexShrink: 0, marginTop: 2 }}><path d="M7 16l6 6L26 9" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href={wa(`Olá! Quero matricular meu filho no plano ${p.n} da escolinha ${brand}.`)} target="_blank" rel="noreferrer" className={p.hot ? "btn-v" : "btn"} style={{ marginTop: "auto", justifyContent: "center" }}>{p.cta}</a>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 15, marginTop: 24 }}>Todos os planos incluem a aula experimental, seguro esportivo e a tabela do campeonato atualizada toda segunda. Cancelamento quando quiser, sem multa.</p>
          <div style={{ marginTop: 30 }}><a className="btn-v" href={wa(`Olá! Quero agendar uma aula experimental gratuita na escolinha ${brand}.`)} target="_blank" rel="noreferrer">Aula experimental grátis</a></div>
        </div>
      </section>

      {/* NÚMEROS */}
      <section style={{ background: NV, paddingTop: 56, paddingBottom: 60 }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(220px,100%),1fr))", gap: 26, textAlign: "center" }}>
          {NUMEROS.map((n) => (
            <div key={n.l}>
              <div style={{ fontFamily: display, fontWeight: 800, fontSize: "clamp(52px,6vw,80px)", color: VM2, lineHeight: 1 }}>{n.v}</div>
              <div className="eyebrow" style={{ color: CR, fontSize: 12.5, marginTop: 8 }}>{n.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section style={{ paddingTop: 92, paddingBottom: 96 }}>
        <div className="wrap">
          <p className="eyebrow" style={{ color: VMT, marginBottom: 10 }}>Famílias da arquibancada</p>
          <h2 style={{ fontSize: "clamp(40px,5.5vw,72px)", margin: "0 0 40px" }}>Quem torce por nós</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(320px,100%),1fr))", gap: 22 }}>
            {TESTI.map((t) => (
              <figure className="tcard" key={t.n}>
                <blockquote style={{ fontSize: 16, lineHeight: 1.65, margin: 0 }}>&ldquo;{t.t}&rdquo;</blockquote>
                <figcaption style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 22 }}>
                  <span aria-hidden style={{ fontFamily: display, fontWeight: 800, fontSize: 56, color: VM, lineHeight: .6 }}>&ldquo;</span>
                  <span>
                    <strong style={{ display: "block", fontSize: 16 }}>{t.n}</strong>
                    <span style={{ fontSize: 14, color: VMT, fontWeight: 600 }}>{t.r}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ background: VM, position: "relative" }}>
        <div className="wrap" style={{ textAlign: "center", paddingTop: 96, paddingBottom: 100 }}>
          <p className="eyebrow" style={{ color: WH, marginBottom: 18 }}>Aula experimental gratuita</p>
          <h2 style={{ fontSize: "clamp(56px,9.5vw,132px)", color: WH, margin: "0 0 22px" }}>Chama<br />pro time.</h2>
          <p style={{ fontSize: 18, color: WH, maxWidth: 540, margin: "0 auto 40px", lineHeight: 1.6 }}>
            Manda a idade do seu craque no WhatsApp e a gente agenda a aula experimental na categoria certa. Chuteira não é obrigatória: o primeiro treino é de tênis.
          </p>
          <a className="btn" href={wa(`Olá! Quero chamar pro time: agendar a aula experimental gratuita na escolinha ${brand}.`)} target="_blank" rel="noreferrer" style={{ fontSize: 16, padding: "20px 46px", background: NV, color: CR }}>Chamar no WhatsApp</a>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer style={{ background: NV, borderTop: `3px solid ${VM}` }}>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 18, flexWrap: "wrap", paddingTop: 34, paddingBottom: 34 }}>
          <div>
            <span style={{ fontFamily: display, fontWeight: 800, fontSize: 24, color: VM, textTransform: "uppercase" }}>{brand} <span style={{ color: CR }}>◆ Escolinha de Futebol</span></span>
            <p style={{ fontSize: 13.5, color: CR, margin: "8px 0 0", opacity: .8 }}>Campo society coberto · {city} · Seg a Sáb, 07h às 21h</p>
          </div>
          <div style={{ display: "flex", gap: 26, flexWrap: "wrap", alignItems: "center" }}>
            <a href={wa("Olá! Vim pelo site e quero saber mais sobre a escolinha.")} target="_blank" rel="noreferrer" style={{ color: CR, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>WhatsApp</a>
            <span style={{ color: CR, fontSize: 13, opacity: .7 }}>Modelo da Vitrine SemSite</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
