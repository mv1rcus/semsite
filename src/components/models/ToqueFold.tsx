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

      {/* rituais / price list */}
      <section id="rituais" style={{ padding: "90px 0", background: PANEL }}>
        <div className="wrap">
          <div style={{ textAlign: "center" }}>
            <span className="eyebrow center">Menu de rituais</span>
            <h2 style={{ marginTop: 14, fontSize: "clamp(34px,4.2vw,54px)", color: CREAM }}>LISTA DE <span style={{ color: GOLD }}>PREÇOS</span></h2>
            <p style={{ color: MUTED, fontSize: 15.5, marginTop: 10 }}>Valores por sessão. Pacotes de 4 e 8 sessões com desconto progressivo.</p>
          </div>
          <div style={{ maxWidth: 920, margin: "48px auto 0" }}>
            {RITUAIS.map((r, idx) => (
              <article key={r.t} style={{ display: "flex", gap: 24, alignItems: "center", padding: "26px 8px", borderTop: `1px solid ${LINE}`, ...(idx === RITUAIS.length - 1 ? { borderBottom: `1px solid ${LINE}` } : {}) }}>
                <span style={{ width: 64, height: 64, borderRadius: "50%", border: `1px solid ${LINE}`, background: PANEL2, display: "grid", placeItems: "center", flexShrink: 0 }}><Ic d={r.i} s={30} c={GOLD} /></span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                    <h3 style={{ fontSize: 21, color: CREAM, letterSpacing: 2, textTransform: "uppercase" }}>{r.t}</h3>
                    <span style={{ fontFamily: serif, fontSize: "clamp(24px,6vw,32px)", color: GOLD, whiteSpace: "nowrap" }}>{r.p}</span>
                  </span>
                  <p style={{ fontSize: 15.5, lineHeight: 1.65, color: MUTED, margin: "6px 0 8px" }}>{r.d}</p>
                  <span style={{ fontSize: 12, fontWeight: 500, letterSpacing: 2.5, textTransform: "uppercase", color: GOLD }}>{r.m}</span>
                </span>
              </article>
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
