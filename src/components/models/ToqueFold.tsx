import { useEffect } from "react";

/** Estúdio de massoterapia, construído do zero a partir de um pin de price list editorial verde-escuro e dourado (serifada clássica + script). Lista de rituais como artefato central, sem fotos. */
const INK = "#14150d", PANEL = "#1c1e12", PANEL2 = "#232619", GOLD = "#c9a86a", GOLDL = "#e6d2a4", CREAM = "#ece5d3", MUTED = "#b0ab96", LINE = "rgba(201,168,106,.35)", LINE2 = "rgba(201,168,106,.18)";
const RITUAIS = [
  { t: "Massagem Clássica", d: "Toque profundo e contínuo para aliviar a tensão muscular e melhorar a performance do dia a dia.", m: "60 min", p: "R$ 160", i: "M9 20c-3-2-4-5-4-8a8 8 0 0 1 16 0c0 3-1 6-4 8M12 24h8" },
  { t: "Drenagem Linfática", d: "Técnica suave e rítmica que estimula o fluxo linfático, reduz o inchaço e desintoxica.", m: "60 min", p: "R$ 190", i: "M16 5c-4 5-7 8-7 12a7 7 0 0 0 14 0c0-4-3-7-7-12z" },
  { t: "Pedras Quentes", d: "Calor vulcânico aplicado em pontos-chave para derreter contraturas e acalmar o sistema nervoso.", m: "75 min", p: "R$ 220", i: "M7 20a9 9 0 0 1 18 0M10 15c1.5-2 4-2 5.5 0M16 11c1.5-2 4-2 5.5 0" },
  { t: "Massagem Profunda", d: "Pressão firme em camadas profundas para liberar dores crônicas de treino e postura.", m: "50 min", p: "R$ 180", i: "M6 22c3-1 4-3 4-6 2 1 3 0 3-2 0-2 2-4 5-4 2 0 4-1 5-3l3 3c-1 4-3 6-6 7" },
];
const BENEF = [
  { t: "Alívio de dores crônicas", d: "Protocolos específicos para lombar, cervical e ombros sobrecarregados.", i: "M16 4a12 12 0 1 0 0 24 12 12 0 0 0 0-24zM16 11v5l3 3" },
  { t: "Sono profundo", d: "O toque lento ativa o parassimpático: o corpo entende que pode desligar.", i: "M22 6a10 10 0 1 0 4 16A12 12 0 0 1 22 6z" },
  { t: "Menos ansiedade", d: "Sessões regulares reduzem cortisol e devolvem a sensação de presença.", i: "M16 26s-9-6.5-9-13a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.5-9 13-9 13z" },
  { t: "Postura e mobilidade", d: "Liberação miofascial que devolve amplitude aos movimentos.", i: "M8 24c4-2 5-5 5-8s2-5 5-6 5-3 6-6" },
];
const PASSOS = [
  { n: "01", t: "Escuta", d: "Cada sessão começa com uma conversa curta: onde dói, como você dormiu, o que o corpo está pedindo." },
  { n: "02", t: "Toque", d: "A técnica é adaptada ao seu corpo naquele dia. Nenhuma sessão é igual à anterior." },
  { n: "03", t: "Silêncio", d: "Ao final, alguns minutos de descanso com chá. Você sai no seu tempo, sem pressa." },
];
const TESTI = [
  { n: "Patrícia Lemos", r: "Dor crônica na lombar", t: "Anos de escritório travaram minha lombar. Com a massagem profunda quinzenal, voltei a praticar corrida sem medo." },
  { n: "Eduardo Vasques", r: "Insônia e estresse", t: "Saio da pedras quentes num estado que nenhum remédio me deu. Durmo como há muito tempo não dormia." },
  { n: "Marina Couto", r: "Pós-treino", t: "A Renata enxerga o corpo de um jeito raro. A drenagem virou parte do meu ciclo de treinos, não um luxo." },
];
const CHECK = "M7 16l6 6L26 9";
const Ic = ({ d, s = 22, c = "currentColor" }: { d: string; s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);

export function ToqueFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Estúdio Toque";
  const city = client?.city?.trim() || "Ribeirão Preto";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const wa = (m: string) => `https://wa.me/${phone || "5516999999999"}?text=${encodeURIComponent(m)}`;
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const serif = "'Cinzel', Georgia, serif";
  const script = "'Great Vibes', cursive";
  useEffect(() => {
    const l = document.createElement("link");
    l.href = "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Great+Vibes&family=Jost:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap";
    l.rel = "stylesheet"; document.head.appendChild(l);
  }, []);
  return (
    <div className="tq" style={{ fontFamily: "'Jost', system-ui, sans-serif", color: CREAM, background: INK, overflowX: "hidden" }}>
      <style>{`
        body{background:${INK}}
        .tq h1,.tq h2,.tq h3{font-family:${serif}!important;font-weight:600;letter-spacing:.02em;text-decoration:none!important}
        .tq blockquote,.tq figure{margin:0}
        .tq .wrap{max-width:1120px;margin:0 auto;padding:0 28px}
        .tq .btn{display:inline-flex;align-items:center;gap:10px;background:${GOLD};color:${INK};font-weight:600;font-size:14.5px;letter-spacing:.06em;text-transform:uppercase;padding:16px 30px;border-radius:2px;text-decoration:none;border:none;cursor:pointer;transition:.25s}
        .tq .btn:hover{background:${GOLDL};transform:translateY(-2px)}
        .tq .btn-o{display:inline-flex;align-items:center;gap:10px;background:none;color:${CREAM};border:1px solid ${LINE};font-weight:500;font-size:14px;letter-spacing:.06em;text-transform:uppercase;padding:15px 28px;border-radius:2px;cursor:pointer;transition:.25s;text-decoration:none}
        .tq .btn-o:hover{border-color:${GOLD};color:${GOLDL}}
        .tq .eyebrow{display:inline-flex;align-items:center;gap:12px;color:${GOLD};font-weight:500;font-size:12.5px;letter-spacing:2.6px;text-transform:uppercase}
        .tq .eyebrow::before,.tq .eyebrow.center::after{content:"";width:34px;height:1px;background:${LINE}}
        .tq .hov{transition:transform .25s,box-shadow .25s,border-color .25s}
        .tq .hov:hover{transform:translateY(-4px);box-shadow:0 24px 50px -30px rgba(0,0,0,.8);border-color:${LINE}!important}
        .tq .vtext{writing-mode:vertical-rl;letter-spacing:6px;font-size:10.5px;text-transform:uppercase;color:${MUTED}}
        @media (max-width:900px){
          .tq .hero-g{grid-template-columns:1fr!important}
          .tq .hero-art{min-height:380px!important}
          .tq .hero-arch{height:360px!important}
          .tq .desk-nav{display:none!important}
          .tq .vtext,.tq .hero-branch{display:none!important}
          .tq .brand{font-size:16px!important;letter-spacing:2px!important}
          .tq .hdr-cta-full{display:none!important}
          .tq .hdr-cta-short{display:inline!important}
          .tq .pl-grid{grid-template-columns:1fr!important}
          .tq .pl-side{min-height:280px}
          .tq .pl-contact{grid-template-columns:1fr!important}
          .tq .pl-contact>div{border-left:none!important;border-top:1px solid rgba(20,21,13,.15)}
          .tq .pl-contact>div:first-child{border-top:none!important}
          .tq .pl-card{padding:4px 20px!important}
          .tq .pl-row{display:grid!important;grid-template-columns:52px minmax(0,1fr) auto;gap:4px 14px;align-items:start;padding:20px 0!important}
          .tq .pl-ic{width:52px!important;height:52px!important;grid-row:1/span 3}
          .tq .pl-dv{display:none!important}
          .tq .pl-pr{font-size:19px!important;padding:6px 0 0!important}
        }
      `}</style>

      {/* header */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(20,21,13,.92)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${LINE2}` }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 28px" }}>
          <span className="brand" style={{ fontFamily: serif, fontSize: 21, letterSpacing: 3, color: CREAM }}>{brand.toUpperCase()}</span>
          <nav style={{ display: "flex", gap: 28, fontSize: 12, fontWeight: 500, letterSpacing: 2.4, textTransform: "uppercase", color: MUTED }} className="desk-nav">
            {[["Rituais", "rituais"], ["Benefícios", "beneficios"], ["O ritual", "ritual"], ["Depoimentos", "depoimentos"]].map(([n, id]) => <a key={n} onClick={() => go(id ?? "")} style={{ cursor: "pointer" }}>{n}</a>)}
          </nav>
          <a href={wa("Olá! Quero agendar um horário no " + brand + ".")} className="btn" style={{ padding: "12px 22px", fontSize: 12 }}><span className="hdr-cta-full">Agendar horário</span><span className="hdr-cta-short" style={{ display: "none" }}>Agendar</span></a>
        </div>
      </header>

      {/* hero */}
      <section style={{ position: "relative", padding: "90px 0 100px", overflow: "hidden", background: `radial-gradient(1100px 500px at 85% -10%, rgba(201,168,106,.14), transparent 60%), radial-gradient(900px 520px at -10% 110%, rgba(201,168,106,.1), transparent 55%), linear-gradient(160deg, #191a10 0%, ${INK} 55%)` }}>
        <svg viewBox="0 0 120 220" className="hero-branch" style={{ position: "absolute", right: 30, top: 60, width: 150, opacity: .55 }} aria-hidden>
          <path d="M60 220 C60 150 60 80 60 10" fill="none" stroke={GOLD} strokeWidth="1.4" />
          {[30, 70, 110, 150].map((y, k) => <g key={k}><path d={`M60 ${y} C38 ${y - 8} 30 ${y - 26} 30 ${y - 40} C48 ${y - 34} 58 ${y - 18} 60 ${y}`} fill="none" stroke={GOLD} strokeWidth="1.1" /><path d={`M60 ${y + 20} C82 ${y + 12} 90 ${y - 6} 90 ${y - 20} C72 ${y - 14} 62 ${y + 2} 60 ${y + 20}`} fill="none" stroke={GOLD} strokeWidth="1.1" /></g>)}
        </svg>
        <span className="vtext" style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)" }}>toque · ritual · bem-estar</span>
        <div className="wrap hero-g" style={{ position: "relative", display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: 56, alignItems: "center" }}>
          <div>
            <span className="eyebrow">Massoterapia · {city}</span>
            <h1 style={{ marginTop: 20, fontSize: "clamp(54px,7.5vw,108px)", lineHeight: 1.02, color: CREAM }}>
              HORA DE<br /><span style={{ fontFamily: script, fontWeight: 400, fontSize: "1.16em", color: GOLD, letterSpacing: 0 }}>relaxar.</span>
            </h1>
            <p style={{ marginTop: 20, fontSize: 16.5, lineHeight: 1.75, color: MUTED, maxWidth: 470 }}>
              Massagem terapêutica com escuta de verdade: cada sessão é desenhada para o que o seu corpo traz naquele dia. Ambiente silencioso, agenda limitada, toque preciso.
            </p>
            <div style={{ display: "flex", gap: 14, marginTop: 30, flexWrap: "wrap" }}>
              <a className="btn" href={wa("Olá! Quero agendar uma sessão no " + brand + ".")}>Agendar sessão →</a>
              <a className="btn-o" onClick={() => go("rituais")}>Ver rituais →</a>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: "30px 0 0", display: "grid", gap: 10 }}>
              {["Primeira sessão com avaliação inclusa", "Salas individuais com aromaterapia", "Pacotes com até 20% de desconto"].map((c) => (
                <li key={c} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14.5, color: CREAM }}><Ic d={CHECK} s={15} c={GOLD} />{c}</li>
              ))}
            </ul>
          </div>
          <div className="hero-art" style={{ position: "relative", minHeight: 480, marginBottom: 30 }}>
            <img className="hero-arch" src="/toque-marmore.jpg" alt="Textura de mármore claro com ramo de folhagem, como no cartaz de referência" style={{ position: "absolute", right: 0, top: 0, width: "min(320px,74%)", height: 470, objectFit: "cover", objectPosition: "68% 50%", borderRadius: "160px 160px 16px 16px", border: `1px solid ${LINE}`, boxShadow: "0 40px 90px -50px rgba(0,0,0,.85)" }} />
            <div style={{ position: "absolute", left: 4, bottom: 30, width: 204, height: 204, borderRadius: "50%", background: `radial-gradient(circle at 35% 30%, ${PANEL2}, ${PANEL} 70%)`, border: `1px solid ${LINE}`, display: "grid", placeItems: "center", boxShadow: "0 30px 80px -40px rgba(0,0,0,.9)" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: serif, fontSize: 52, color: GOLD, letterSpacing: 4 }}>ET</div>
                <div style={{ width: 44, height: 1, background: LINE, margin: "12px auto" }} />
                <div style={{ fontSize: 10, letterSpacing: 4.5, color: MUTED, textTransform: "uppercase" }}>{brand}</div>
              </div>
            </div>
            <span style={{ position: "absolute", right: 8, bottom: -20, background: PANEL, border: `1px solid ${LINE}`, borderRadius: 2, padding: "10px 18px", fontSize: 12.5, letterSpacing: 1.5, textTransform: "uppercase", color: GOLDL }}>Agenda da semana aberta</span>
          </div>
        </div>
      </section>

      {/* rituais / price list — à risca do pin: título serif+script gigante, card de vidro com ícones circulares, mármore à direita, "Hora de RELAXAR", barra bege de contato */}
      <section id="rituais" style={{ padding: "100px 0 90px", background: PANEL, position: "relative", overflow: "hidden" }}>
        <div className="wrap" style={{ position: "relative" }}>
          <div className="pl-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 300px", gap: 48, alignItems: "stretch" }}>
            <div>
              <span className="eyebrow">Menu de rituais</span>
              <div style={{ position: "relative", marginTop: 18 }}>
                <h2 style={{ fontSize: "clamp(52px,7vw,86px)", lineHeight: 1, letterSpacing: 5, color: CREAM, textTransform: "uppercase" }}>Lista de</h2>
                <div style={{ fontFamily: script, fontWeight: 400, fontSize: "clamp(46px,6vw,74px)", color: GOLD, lineHeight: .7, margin: "-6px 0 0 96px" }}>preços</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 22, color: MUTED, fontSize: 11.5, letterSpacing: 3.5, textTransform: "uppercase" }}>
                <span style={{ width: 40, height: 1, background: LINE }} />
                Massoterapia
                <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden><rect x="1.8" y="1.8" width="4.4" height="4.4" transform="rotate(45 4 4)" fill="none" stroke="${GOLD}" strokeWidth="1" /></svg>
                <span style={{ width: 40, height: 1, background: LINE }} />
              </div>

              <div className="pl-card" style={{ marginTop: 36, background: "rgba(236,229,211,.045)", border: `1px solid ${LINE}`, borderRadius: 8, padding: "8px 30px", boxShadow: "0 30px 70px -50px rgba(0,0,0,.9)" }}>
                {RITUAIS.map((r, idx) => (
                  <article key={r.t} className="pl-row" style={{ display: "flex", gap: 24, alignItems: "center", padding: "24px 0", ...(idx > 0 ? { borderTop: `1px solid ${LINE2}` } : {}) }}>
                    <span className="pl-ic" style={{ width: 72, height: 72, borderRadius: "50%", border: `1px solid ${LINE}`, display: "grid", placeItems: "center", flexShrink: 0 }}><Ic d={r.i} s={32} c={GOLD} /></span>
                    <span style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ fontSize: 18.5, color: CREAM, letterSpacing: 2.2, textTransform: "uppercase" }}>{r.t}</h3>
                      <p style={{ fontSize: 14.5, lineHeight: 1.6, color: MUTED, margin: "6px 0 8px", maxWidth: 380 }}>{r.d}</p>
                      <span style={{ fontSize: 11.5, fontWeight: 500, letterSpacing: 2.5, textTransform: "uppercase", color: GOLD }}>{r.m}</span>
                    </span>
                    <span className="pl-dv" style={{ width: 1, alignSelf: "stretch", background: LINE2 }} />
                    <span className="pl-pr" style={{ fontFamily: serif, fontSize: "clamp(24px,5vw,30px)", color: GOLD, whiteSpace: "nowrap", paddingLeft: 6 }}>{r.p}</span>
                  </article>
                ))}
              </div>
            </div>

            <div className="pl-side" style={{ position: "relative", display: "flex", alignItems: "stretch", gap: 18 }}>
              <span className="vtext" style={{ alignSelf: "center", flexShrink: 0 }}>relax · recharge · renew</span>
              <div style={{ flex: 1, borderRadius: "170px 170px 8px 8px", overflow: "hidden", border: `1px solid ${LINE2}`, minHeight: 420 }}>
                <img src="/toque-marmore.jpg" alt="Textura de mármore com ramo de eucalipto" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "68% 50%", display: "block" }} />
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: 72 }}>
            <div style={{ fontFamily: script, fontWeight: 400, fontSize: "clamp(26px,3vw,34px)", color: GOLD }}>Hora de</div>
            <div style={{ fontFamily: serif, fontSize: "clamp(48px,6.5vw,76px)", letterSpacing: 12, color: CREAM, textTransform: "uppercase", lineHeight: 1.15, marginTop: 2 }}>Relaxar</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginTop: 16, color: MUTED, fontSize: 11.5, letterSpacing: 3, textTransform: "uppercase" }}>
              <span style={{ width: 46, height: 1, background: LINE }} />
              <Ic d="M16 5c-4 5-7 8-7 12a7 7 0 0 0 14 0c0-4-3-7-7-12z" s={16} c={GOLD} />
              Seu bem-estar é a nossa prioridade
              <span style={{ width: 46, height: 1, background: LINE }} />
            </div>
          </div>

          <div className="pl-contact" style={{ marginTop: 40, background: CREAM, color: INK, borderRadius: 8, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", overflow: "hidden" }}>
            {[
              { i: "M9 5h4l2 5-3 2c1.2 3 3 5 6 6.2l2-3 5 2v4c0 1.1-.9 2-2 2C12 23.8 6.2 18 5.7 7c0-1.1.9-2 1.3-2z", t: phone ? `+${phone}` : "(16) 99999-9999", s: "Agende sua sessão" },
              { i: "M5 9h22v15H5zM5 10l11 8 11-8", t: "contato@estudiotoque.com.br", s: "Envie um email" },
              { i: "M16 4a8 8 0 0 1 8 8c0 6-8 16-8 16S8 18 8 12a8 8 0 0 1 8-8zM16 14a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z", t: `Estúdio Toque · ${city}`, s: "Atendimento com hora marcada" },
            ].map((c, idx) => (
              <div key={c.t} style={{ display: "flex", alignItems: "center", gap: 14, padding: "20px 24px", ...(idx > 0 ? { borderLeft: "1px solid rgba(20,21,13,.15)" } : {}) }}>
                <span style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(20,21,13,.35)", display: "grid", placeItems: "center", flexShrink: 0 }}><Ic d={c.i} s={20} c={INK} /></span>
                <span>
                  <div style={{ fontFamily: serif, fontSize: 14.5, letterSpacing: .6, fontWeight: 600 }}>{c.t}</div>
                  <div style={{ fontSize: 11.5, letterSpacing: 1.6, textTransform: "uppercase", opacity: .75, marginTop: 3 }}>{c.s}</div>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* benefícios */}
      <section id="beneficios" style={{ padding: "90px 0", background: INK }}>
        <div className="wrap">
          <span className="eyebrow">Benefícios</span>
          <h2 style={{ marginTop: 12, fontSize: "clamp(32px,4vw,52px)", color: CREAM }}>O que o toque certo <span style={{ fontFamily: script, fontWeight: 400, color: GOLD, fontSize: "1.15em" }}>desbloqueia</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20, marginTop: 40 }}>
            {BENEF.map((b) => (
              <article key={b.t} className="hov" style={{ background: PANEL, border: `1px solid ${LINE2}`, borderRadius: 4, padding: "28px 26px", height: "100%" }}>
                <span style={{ width: 48, height: 48, borderRadius: "50%", border: `1px solid ${LINE}`, display: "grid", placeItems: "center", marginBottom: 18 }}><Ic d={b.i} s={24} c={GOLD} /></span>
                <h3 style={{ fontSize: 17, color: CREAM, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 10 }}>{b.t}</h3>
                <p style={{ fontSize: 15.5, lineHeight: 1.65, color: MUTED }}>{b.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* o ritual */}
      <section id="ritual" style={{ padding: "90px 0", background: PANEL }}>
        <div className="wrap">
          <div style={{ textAlign: "center" }}>
            <span className="eyebrow center">A experiência</span>
            <h2 style={{ marginTop: 14, fontSize: "clamp(32px,4vw,52px)", color: CREAM }}>Como é uma sessão</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20, marginTop: 44 }}>
            {PASSOS.map((p) => (
              <article key={p.n} style={{ border: `1px solid ${LINE2}`, borderRadius: 4, padding: "30px 28px", background: INK, height: "100%" }}>
                <div style={{ fontFamily: serif, fontSize: 34, color: GOLD, opacity: .85 }}>{p.n}</div>
                <h3 style={{ fontSize: 19, color: CREAM, letterSpacing: 1.5, textTransform: "uppercase", margin: "14px 0 10px" }}>{p.t}</h3>
                <p style={{ fontSize: 15.5, lineHeight: 1.65, color: MUTED }}>{p.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* depoimentos */}
      <section id="depoimentos" style={{ padding: "90px 0", background: INK }}>
        <div className="wrap">
          <span className="eyebrow">Clientes</span>
          <h2 style={{ marginTop: 12, fontSize: "clamp(32px,4vw,52px)", color: CREAM }}>Quem sai outra pessoa</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20, marginTop: 40 }}>
            {TESTI.map((t) => (
              <figure key={t.n} className="hov" style={{ background: PANEL, border: `1px solid ${LINE2}`, borderRadius: 4, padding: "28px 28px", height: "100%" }}>
                <div style={{ fontFamily: script, fontSize: 44, color: GOLD, lineHeight: .6 }}>"</div>
                <blockquote style={{ fontSize: 15.5, lineHeight: 1.7, color: CREAM, margin: "10px 0 18px" }}>{t.t}</blockquote>
                <figcaption style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ width: 40, height: 40, borderRadius: "50%", border: `1px solid ${LINE}`, background: PANEL2, display: "grid", placeItems: "center", fontFamily: serif, fontSize: 13, color: GOLD }}>{t.n.split(" ").map((x) => x[0]).join("")}</span>
                  <span>
                    <div style={{ fontSize: 14.5, fontWeight: 500, color: CREAM }}>{t.n}</div>
                    <div style={{ fontSize: 12.5, color: MUTED }}>{t.r}</div>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "100px 0", background: `radial-gradient(800px 400px at 50% 0%, rgba(201,168,106,.12), transparent 65%), ${PANEL}`, textAlign: "center" }}>
        <div className="wrap">
          <span className="eyebrow center">Agenda limitada</span>
          <h2 style={{ marginTop: 16, fontSize: "clamp(38px,5vw,64px)", color: CREAM }}>Hora de <span style={{ fontFamily: script, fontWeight: 400, color: GOLD, fontSize: "1.15em" }}>relaxar.</span></h2>
          <p style={{ color: MUTED, fontSize: 15.5, marginTop: 12 }}>Poucos horários por dia para manter cada sessão inteira. Reserve o seu.</p>
          <a className="btn" href={wa("Olá! Quero reservar um horário no " + brand + ".")} style={{ marginTop: 28 }}>Reservar meu horário →</a>
        </div>
      </section>

      {/* footer */}
      <footer style={{ borderTop: `1px solid ${LINE2}`, padding: "26px 0", background: INK }}>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <span style={{ fontFamily: serif, fontSize: 16, letterSpacing: 3, color: CREAM }}>{brand.toUpperCase()}</span>
          <span style={{ fontSize: 12.5, letterSpacing: 2, textTransform: "uppercase", color: MUTED }}>{city} · Massoterapia e bem-estar</span>
        </div>
      </footer>
    </div>
  );
}
