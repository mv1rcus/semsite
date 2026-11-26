import { useEffect } from "react";

/** Assessoria de corrida, construída do zero a partir de um pin de cartaz "21.1 km City Half Marathon" (azul royal + verde-limão, tipografia ultra-bold, faixa diagonal, faixa xadrez e grade de informações). Cartaz 100% tipográfico sem fotos: o artefato central é a planilha semanal de treinos renderizada como a grade do cartaz. */
const AZ = "#2038e0", AZ2 = "#15239c", INK = "#0b1040", LM = "#d9f24f", LM2 = "#eaff70", WH = "#f6f8ff", WH2 = "#dfe4ff", MUT = "#aab4f2";
const PLANILHA = [
  { d: "SEG", t: "Descanso ativo", dist: "30 min caminhada", pace: "livre", tag: "Recuperação" },
  { d: "TER", t: "Tiros 8 × 400 m", dist: "7 km total", pace: "4:35–4:45 /km", tag: "Velocidade", hot: true },
  { d: "QUA", t: "Corrida leve", dist: "8 km", pace: "5:40–5:55 /km", tag: "Base" },
  { d: "QUI", t: "Ritmo de prova", dist: "6 km", pace: "5:00–5:10 /km", tag: "Específico", hot: true },
  { d: "SEX", t: "Descanso", dist: "—", pace: "—", tag: "Recuperação" },
  { d: "SÁB", t: "Longão progressivo", dist: "16 km", pace: "5:30 → 5:00 /km", tag: "Resistência", hot: true },
  { d: "DOM", t: "Regenerativo", dist: "5 km", pace: "6:10+ /km", tag: "Base" },
];
const PLANOS = [
  { n: "5K", t: "Sai do sofá", p: "R$ 79", per: "/mês", feats: ["Planilha para os primeiros 5 km", "2 treinos presenciais por mês", "Grupo de alunos no WhatsApp", "Ajuste a cada 4 semanas"], cta: "Começar nos 5K" },
  { n: "10K", t: "Ritmo", p: "R$ 99", per: "/mês", feats: ["Planilha semanal individual", "Feedback de cada treino em 24h", "Planilha de força complementar", "Prova-alvo a cada ciclo"], cta: "Assinar o 10K", hot: true },
  { n: "21K", t: "Meia-maratona", p: "R$ 129", per: "/mês", feats: ["Ciclo completo de 16 semanas", "Teste de limiar e zonas de pace", "Estratégia de prova e nutrição", "1 treino longo acompanhado por mês"], cta: "Mirar a meia" },
  { n: "42K", t: "Maratona", p: "R$ 159", per: "/mês", feats: ["Ciclo completo de 20 semanas", "Acompanhamento semanal por voz", "Simulados de 30 km com suporte", "Plano de prova detalhado por km"], cta: "Mirar os 42K" },
];
const PASSOS = [
  { n: "01", t: "Avaliação de verdade", d: "Você conta histórico, rotina e objetivo. A gente avalia seu condicionamento atual e define a prova-alvo do ciclo." },
  { n: "02", t: "Planilha toda segunda", d: "Sua semana chega pronta: tiros, leves, longão e descanso, cada um com distância e pace alvo. Nada de treino genérico de internet." },
  { n: "03", t: "Feedback por corrida", d: "Cada treino registrado volta com comentário do treinador em até 24h. A planilha da semana seguinte já reflete a sua resposta." },
];
const NUMEROS = [
  { v: "180+", l: "corredores assessorados" },
  { v: "97%", l: "concluem a prova-alvo" },
  { v: "−42s", l: "de média por km em 12 semanas" },
  { v: "4.9", l: "avaliação dos alunos" },
];
const TESTI = [
  { n: "Camila Ferraz", r: "Aluna do 21K há 8 meses", t: "Saí de 1h08 nos 10 km para a minha primeira meia em 2h11. A planilha mudou tudo: parei de treinar no achismo e comecei a evoluir toda semana." },
  { n: "Rafael Duarte", r: "Aluno do 42K há 1 ano", t: "Aos 47 anos completei minha primeira maratona sem parar uma vez. O feedback em cada treino é o que me manteve consistente o ciclo inteiro." },
  { n: "Beatriz Nogueira", r: "Aluna do 10K há 5 meses", t: "Eu achava que assessoria era coisa de atleta. Em 12 semanas baixei 4 minutos nos 10 km e, mais importante, parei de me lesionar." },
];
const CHECK = "M7 16l6 6L26 9";
const Ic = ({ d, s = 22, c = "currentColor" }: { d: string; s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);

/** Faixa xadrez estilo chegada de corrida, estilo pictograma de cartaz, desenhada em CSS. */
const Xadrez = ({ a = LM, b = INK, h = 26 }: { a?: string; b?: string; h?: number }) => (
  <div aria-hidden style={{ height: h, background: `repeating-conic-gradient(${a} 0 25%, ${b} 0 50%) 0 0/${h * 2}px ${h * 2}px` }} />
);

export function FolegoFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Fôlego Assessoria";
  const city = client?.city?.trim() || "Belo Horizonte";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const wa = (m: string) => `https://wa.me/${phone || "5511999999999"}?text=${encodeURIComponent(m)}`;
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const display = "'Archivo Black', 'Arial Narrow', sans-serif";
  useEffect(() => {
    const l = document.createElement("link");
    l.href = "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap";
    l.rel = "stylesheet"; document.head.appendChild(l);
  }, []);
  return (
    <div className="folego" style={{ fontFamily: "'Archivo', system-ui, sans-serif", color: WH, background: AZ, overflowX: "hidden" }}>
      <style>{`
        body{background:${INK}}
        .folego h1,.folego h2,.folego h3{font-family:${display}!important;font-weight:400;letter-spacing:-.01em;text-decoration:none!important;text-transform:uppercase;line-height:.92}
        .folego blockquote,.folego figure{margin:0}
        .folego .wrap{max-width:1160px;margin:0 auto;padding:0 28px}
        .folego .btn{display:inline-flex;align-items:center;gap:10px;background:${LM};color:${INK};font-weight:800;font-size:15px;letter-spacing:.02em;text-transform:uppercase;padding:17px 32px;text-decoration:none;border:none;cursor:pointer;transition:.22s;box-shadow:7px 7px 0 ${INK}}
        .folego .btn:hover{background:${LM2};transform:translate(-2px,-2px);box-shadow:9px 9px 0 ${INK}}
        .folego .btn-o{display:inline-flex;align-items:center;gap:10px;background:none;color:${WH};border:3px solid ${WH};font-weight:800;font-size:14px;letter-spacing:.02em;text-transform:uppercase;padding:14px 28px;cursor:pointer;transition:.22s;text-decoration:none}
        .folego .btn-o:hover{background:${WH};color:${AZ}}
        .folego .eyebrow{font-size:12.5px;font-weight:800;letter-spacing:.24em;text-transform:uppercase}
        .folego .diag1{position:absolute;left:-8%;width:116%;height:34px;background:${LM};transform:rotate(-2.4deg)}
        .folego .diag2{position:absolute;left:-8%;width:116%;height:12px;background:${WH};transform:rotate(-2.4deg)}
        .folego .card{background:${WH};color:${INK};padding:34px 30px;display:flex;flex-direction:column;box-shadow:8px 8px 0 ${INK}}
        .folego .card.hot{background:${LM};box-shadow:8px 8px 0 ${WH}}
        .folego .tcard{background:${AZ2};border:2px solid rgba(246,248,255,.22);padding:30px}
        .folego .step{border-top:5px solid ${LM};padding-top:22px}
        @media(max-width:900px){
          .folego .hero-km{font-size:clamp(96px,30vw,150px)!important}
          .folego .grid4{grid-template-columns:1fr 1fr!important}
          .folego .grid3{grid-template-columns:1fr!important}
          .folego .hero-pad{padding-top:110px!important}
        }
        @media(max-width:560px){
          .folego .grid4{grid-template-columns:1fr!important}
          .folego .row-l{display:grid!important;grid-template-columns:62px 1fr auto;grid-template-areas:"dia treino treino" "dia dist pace" "dia tag tag";gap:3px 12px;padding:16px 16px!important}
          .folego .row-l .cell{padding:0!important;width:auto!important;text-align:left!important}
          .folego .c-dia{grid-area:dia}
          .folego .c-treino{grid-area:treino}
          .folego .c-dist{grid-area:dist}
          .folego .c-pace{grid-area:pace;text-align:right!important}
          .folego .c-tag{grid-area:tag}
          .folego .row-l.row-h{display:none!important}
        }
      `}</style>

      {/* HERO */}
      <header style={{ position: "relative", background: AZ, overflow: "hidden" }}>
        <nav className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 26, paddingBottom: 26, gap: 16, flexWrap: "wrap", position: "relative", zIndex: 2 }}>
          <span className="eyebrow" style={{ color: LM }}>{brand} · {city}</span>
          <div style={{ display: "flex", gap: 22, alignItems: "center", flexWrap: "wrap" }}>
            <button onClick={() => go("planilha")} className="eyebrow" style={{ background: "none", border: "none", color: WH, cursor: "pointer", padding: 0 }}>Planilha</button>
            <button onClick={() => go("planos")} className="eyebrow" style={{ background: "none", border: "none", color: WH, cursor: "pointer", padding: 0 }}>Planos</button>
            <a className="btn" style={{ padding: "12px 22px", fontSize: 13 }} href={wa(`Olá! Quero uma avaliação gratuita com a ${brand}.`)} target="_blank" rel="noreferrer">Avaliação grátis</a>
          </div>
        </nav>
        <div className="wrap hero-pad" style={{ paddingTop: 96, paddingBottom: 170, position: "relative", zIndex: 2 }}>
          <p className="eyebrow" style={{ color: WH, marginBottom: 18 }}>Planilha individual · feedback em 24h · prova-alvo por ciclo</p>
          <div style={{ display: "flex", alignItems: "baseline", gap: 20, flexWrap: "wrap" }}>
            <span className="hero-km" style={{ fontFamily: display, fontSize: 210, color: LM, lineHeight: .85, letterSpacing: "-.03em" }}>42.2</span>
            <span style={{ fontFamily: display, fontSize: 56, color: WH, lineHeight: 1, textTransform: "uppercase" }}>km</span>
          </div>
          <h1 style={{ fontSize: "clamp(38px,5.6vw,68px)", color: WH, margin: "30px 0 22px", maxWidth: 760 }}>
            Da primeira corrida à primeira maratona.
          </h1>
          <p style={{ fontSize: 18.5, lineHeight: 1.55, color: WH2, maxWidth: 560, margin: "0 0 36px" }}>
            Assessoria de corrida com planilha semanal individual, feedback do treinador em cada treino e um ciclo inteiro construído para a sua prova-alvo. Sem treino genérico, sem achismo.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a className="btn" href={wa(`Olá! Quero começar com a avaliação gratuita da ${brand}.`)} target="_blank" rel="noreferrer">Começar com avaliação grátis</a>
            <button className="btn-o" onClick={() => go("planilha")}>Ver a planilha da semana</button>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 66, left: 0, right: 0, height: 0 }}>
          <div className="diag2" style={{ bottom: 22 }} />
          <div className="diag1" style={{ bottom: 0 }} />
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <Xadrez />
        </div>
      </header>

      {/* FAIXA DE INFORMAÇÕES (grade do cartaz) */}
      <section style={{ background: LM, color: INK }}>
        <div className="wrap grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(min(260px,100%),1fr))", gap: 0 }}>
          {[
            { t: "Planilha toda segunda", d: "A semana chega pronta no app: tiros, leves e longão, cada treino com distância e pace alvo." },
            { t: "Feedback em até 24h", d: "Cada treino registrado volta com comentário do treinador. A semana seguinte já ajusta." },
            { t: "Grupo no WhatsApp", d: "Longões de sábado marcados, dúvidas respondidas e uma comunidade que puxa junto." },
          ].map((f, i) => (
            <div key={f.t} style={{ padding: "34px 30px", borderLeft: i ? `2px solid ${INK}` : "none" }}>
              <h3 style={{ fontSize: 19, margin: "0 0 10px" }}>{f.t}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.55, margin: 0, color: "#2b2b1a" }}>{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PLANILHA (artefato central) */}
      <section id="planilha" style={{ background: AZ, padding: "96px 0 90px" }}>
        <div className="wrap">
          <p className="eyebrow" style={{ color: LM, marginBottom: 14 }}>O artefato</p>
          <h2 style={{ fontSize: "clamp(34px,4.6vw,56px)", margin: "0 0 14px" }}>A planilha da semana</h2>
          <p style={{ fontSize: 17, color: WH2, maxWidth: 620, margin: "0 0 44px", lineHeight: 1.55 }}>
            Exemplo real de uma semana do ciclo de meia-maratona. Cada aluno recebe a sua: individual, ajustada a cada feedback e com o pace exato de cada treino.
          </p>
          <div style={{ border: `3px solid ${WH}`, boxShadow: `10px 10px 0 ${INK}` }}>
            <div className="row-l row-h" style={{ display: "flex", background: LM, color: INK, fontWeight: 800, fontSize: 13, letterSpacing: ".1em", textTransform: "uppercase" }}>
              <span className="cell" style={{ width: 90, padding: "16px 18px" }}>Dia</span>
              <span className="cell" style={{ flex: 2, padding: "16px 18px" }}>Treino</span>
              <span className="cell" style={{ flex: 1.4, padding: "16px 18px" }}>Distância</span>
              <span className="cell" style={{ flex: 1.4, padding: "16px 18px" }}>Pace alvo</span>
              <span className="cell" style={{ width: 160, padding: "16px 18px", textAlign: "right" }}>Tipo</span>
            </div>
            {PLANILHA.map((r, i) => (
              <div key={r.d} className="row-l" style={{ display: "flex", alignItems: "center", background: r.hot ? AZ2 : i % 2 ? "rgba(246,248,255,.05)" : "transparent", borderTop: "2px solid rgba(246,248,255,.16)" }}>
                <span className="cell c-dia" style={{ width: 90, padding: "17px 18px", fontFamily: display, fontSize: 20, color: r.hot ? LM : WH }}>{r.d}</span>
                <span className="cell c-treino" style={{ flex: 2, padding: "17px 18px", fontWeight: 700, fontSize: 16 }}>{r.t}</span>
                <span className="cell c-dist" style={{ flex: 1.4, padding: "17px 18px", fontSize: 15, color: WH2 }}>{r.dist}</span>
                <span className="cell c-pace" style={{ flex: 1.4, padding: "17px 18px", fontSize: 15, color: r.hot ? LM : WH2, fontWeight: r.hot ? 700 : 500 }}>{r.pace}</span>
                <span className="cell c-tag" style={{ width: 160, padding: "17px 18px", textAlign: "right", fontSize: 12, fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase", color: MUT }}>{r.tag}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 14.5, color: MUT, marginTop: 22, lineHeight: 1.5 }}>
            Ciclo de 16 semanas para a Meia de BH · semana 9 de 16 · volume de 44 km. A sua planilha considera histórico, rotina e resposta aos últimos treinos.
          </p>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section style={{ background: WH, color: INK, padding: "92px 0" }}>
        <div className="wrap">
          <p className="eyebrow" style={{ color: AZ, marginBottom: 14 }}>Como funciona</p>
          <h2 style={{ fontSize: "clamp(34px,4.6vw,56px)", margin: "0 0 54px", color: INK }}>Três passos, zero achismo</h2>
          <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(min(280px,100%),1fr))", gap: 44 }}>
            {PASSOS.map((s) => (
              <div key={s.n} className="step">
                <span style={{ fontFamily: display, fontSize: 54, color: AZ, lineHeight: 1 }}>{s.n}</span>
                <h3 style={{ fontSize: 22, margin: "14px 0 12px", color: INK }}>{s.t}</h3>
                <p style={{ fontSize: 15.5, lineHeight: 1.6, color: "#3d4266", margin: 0 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANOS */}
      <section id="planos" style={{ background: AZ2, padding: "96px 0" }}>
        <div className="wrap">
          <p className="eyebrow" style={{ color: LM, marginBottom: 14 }}>Planos por objetivo</p>
          <h2 style={{ fontSize: "clamp(34px,4.6vw,56px)", margin: "0 0 14px" }}>Escolha a sua distância</h2>
          <p style={{ fontSize: 17, color: WH2, maxWidth: 600, margin: "0 0 48px", lineHeight: 1.55 }}>
            Todo plano começa com avaliação gratuita e inclui planilha individual. Sem fidelidade: o ciclo é seu, o ritmo é nosso.
          </p>
          <div className="grid4" style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(min(230px,100%),1fr))", gap: 22 }}>
            {PLANOS.map((p) => (
              <div key={p.n} className={`card${p.hot ? " hot" : ""}`}>
                {p.hot && <span style={{ alignSelf: "flex-start", background: INK, color: LM, fontSize: 11.5, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", padding: "6px 12px", marginBottom: 16 }}>Mais escolhido</span>}
                <span style={{ fontFamily: display, fontSize: 52, lineHeight: 1, color: p.hot ? INK : AZ }}>{p.n}</span>
                <span style={{ fontWeight: 800, fontSize: 15, textTransform: "uppercase", letterSpacing: ".08em", margin: "8px 0 18px", color: "#3d4266" }}>{p.t}</span>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 20 }}>
                  <span style={{ fontFamily: display, fontSize: 34, color: INK }}>{p.p}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#3d4266" }}>{p.per}</span>
                </div>
                <ul style={{ listStyle: "none", margin: "0 0 26px", padding: 0, display: "grid", gap: 11, flex: 1 }}>
                  {p.feats.map((f) => (
                    <li key={f} style={{ display: "flex", gap: 10, fontSize: 14.5, lineHeight: 1.45, color: "#23263f" }}>
                      <Ic d={CHECK} s={17} c={p.hot ? INK : AZ} />{f}
                    </li>
                  ))}
                </ul>
                <a href={wa(`Olá! Quero assinar o plano ${p.n} da ${brand}.`)} target="_blank" rel="noreferrer" style={{ textAlign: "center", background: INK, color: p.hot ? LM : WH, fontWeight: 800, fontSize: 13.5, letterSpacing: ".04em", textTransform: "uppercase", padding: "15px 10px", textDecoration: "none" }}>{p.cta}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NÚMEROS */}
      <section style={{ background: LM, color: INK }}>
        <div className="wrap grid4" style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(min(200px,100%),1fr))", gap: 28, paddingTop: 52, paddingBottom: 52 }}>
          {NUMEROS.map((n) => (
            <div key={n.l}>
              <span style={{ fontFamily: display, fontSize: 52, lineHeight: 1, color: INK }}>{n.v}</span>
              <p style={{ fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", margin: "10px 0 0", color: "#2b2b1a" }}>{n.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section style={{ background: AZ, padding: "96px 0" }}>
        <div className="wrap">
          <p className="eyebrow" style={{ color: LM, marginBottom: 14 }}>Quem corre com a gente</p>
          <h2 style={{ fontSize: "clamp(34px,4.6vw,56px)", margin: "0 0 52px" }}>Evolução medida em pace</h2>
          <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(min(280px,100%),1fr))", gap: 22 }}>
            {TESTI.map((t) => (
              <div key={t.n} className="tcard">
                <p style={{ fontSize: 16.5, lineHeight: 1.6, color: WH, margin: "0 0 26px" }}>&ldquo;{t.t}&rdquo;</p>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ width: 46, height: 46, borderRadius: "50%", background: LM, color: INK, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: display, fontSize: 16 }}>{t.n.split(" ").map((x) => x[0]).join("").slice(0, 2)}</span>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 15 }}>{t.n}</div>
                    <div style={{ fontSize: 13, color: MUT }}>{t.r}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ background: INK, position: "relative" }}>
        <Xadrez />
        <div className="wrap" style={{ textAlign: "center", paddingTop: 92, paddingBottom: 96 }}>
          <p className="eyebrow" style={{ color: LM, marginBottom: 18 }}>Avaliação gratuita, sem compromisso</p>
          <h2 style={{ fontSize: "clamp(46px,8vw,104px)", color: WH, margin: "0 0 22px", letterSpacing: "-.02em" }}>Bora<br />correr.</h2>
          <p style={{ fontSize: 18, color: WH2, maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.55 }}>
            Conta seu objetivo no WhatsApp e receba a proposta de ciclo com a primeira semana de planilha. O próximo bloco de treinos começa segunda.
          </p>
          <a className="btn" href={wa(`Olá! Quero bora correr com a ${brand}: avaliação gratuita, por favor.`)} target="_blank" rel="noreferrer" style={{ fontSize: 16, padding: "20px 44px" }}>Chamar no WhatsApp</a>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer style={{ background: INK, borderTop: "2px solid rgba(246,248,255,.16)" }}>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 18, flexWrap: "wrap", paddingTop: 34, paddingBottom: 34 }}>
          <div>
            <span style={{ fontFamily: display, fontSize: 20, color: LM, textTransform: "uppercase" }}>{brand}</span>
            <p style={{ fontSize: 13.5, color: MUT, margin: "8px 0 0" }}>Assessoria de corrida · {city} · Treinos presenciais no Parque das Mangabeiras</p>
          </div>
          <div style={{ display: "flex", gap: 26, flexWrap: "wrap", alignItems: "center" }}>
            <a href={wa("Olá! Vim pelo site e quero saber mais.")} target="_blank" rel="noreferrer" style={{ color: WH2, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>WhatsApp</a>
            <span style={{ color: MUT, fontSize: 13 }}>Modelo da Vitrine SemSite</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
