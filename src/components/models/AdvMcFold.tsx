import { useEffect } from "react";

/** Escritório de advocacia construído do zero a partir do pin E-18: navy profundo com dourado, serifada clássica, hero com estátua da Justiça, faixa de números, áreas de atuação em cards com foto, painel do escritório e CTA final. Consulta fecha no WhatsApp. */
const NAVY = "#0e1a2b", NAVY2 = "#14243a", GOLD = "#c9a86a", GOLDL = "#e3cd9f", CRM = "#f7f4ee", INK = "#1c2432", MUT = "#5f6b7d";
const AREAS = [
  { t: "Direito Empresarial", d: "Suporte ao seu negócio em cada etapa: contratos, societário e contencioso.", img: "/adv-p1.jpg" },
  { t: "Direito Imobiliário", d: "Orientação segura para as maiores decisões patrimoniais da sua vida.", img: "/adv-p2.jpg" },
  { t: "Direito de Família", d: "Acolhimento e firmeza para divórcio, guarda, pensão e inventário.", img: "/adv-p3.jpg" },
  { t: "Testamentos e Sucessões", d: "Planejamento sucessório que protege o que mais importa.", img: "/adv-p4.jpg" },
];
const NUMS = [
  { v: "1.000+", l: "Clientes representados" },
  { v: "98%", l: "Satisfação dos clientes" },
  { v: "25+", l: "Anos de experiência" },
  { v: "Brasil", l: "Atuação em todo o país" },
];
const CHECK = "M7 16l6 6L26 9";
const Ic = ({ d, s = 22, c = "currentColor" }: { d: string; s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);

export function AdvMcFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Menezes & Prado";
  const city = client?.city?.trim() || "São Paulo";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const wa = (m: string) => `https://wa.me/${phone || "5511999999999"}?text=${encodeURIComponent(m)}`;
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const serif = "Cormorant Garamond, Georgia, serif";
  useEffect(() => {
    const l = document.createElement("link");
    l.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400..700;1,400..700&family=Karla:wght@300..800&display=swap";
    l.rel = "stylesheet"; document.head.appendChild(l);
  }, []);
  return (
    <div className="adv" style={{ fontFamily: "'Karla', system-ui, sans-serif", color: INK, background: CRM, overflowX: "hidden" }}>
      <style>{`
        .adv h1,.adv h2,.adv h3{font-family:${serif}!important;font-weight:600;letter-spacing:-.01em;line-height:1.08;text-wrap:balance}
        .adv .wrap{max-width:1140px;margin:0 auto;padding:0 28px}
        .adv .btn{font-family:'Karla',system-ui,sans-serif;display:inline-flex;align-items:center;gap:10px;background:${GOLD};color:${NAVY};font-weight:800;font-size:14.5px;padding:15px 28px;border-radius:6px;text-decoration:none;border:none;cursor:pointer;transition:.2s;letter-spacing:.4px}
        .adv .btn:hover{background:${GOLDL};transform:translateY(-2px)}
        .adv .btn-o{font-family:'Karla',system-ui,sans-serif;text-decoration:none;display:inline-flex;align-items:center;gap:10px;background:none;color:#fff;border:1px solid rgba(255,255,255,.5);font-weight:700;font-size:14.5px;padding:14px 26px;border-radius:6px;cursor:pointer;transition:.2s}
        .adv .btn-o:hover{background:rgba(255,255,255,.08)}
        .adv .eyebrow{display:inline-flex;align-items:center;gap:10px;color:${GOLD};font-weight:800;font-size:11.5px;letter-spacing:3px;text-transform:uppercase}
        .adv .eyebrow::before{content:"";width:22px;height:1.5px;background:${GOLD}}
        .adv .hov{transition:transform .2s,box-shadow .2s}
        .adv .hov:hover{transform:translateY(-4px);box-shadow:0 22px 48px -24px rgba(14,26,43,.5)}
        @media (max-width:900px){
          .adv .g4a{grid-template-columns:1fr 1fr!important}
          .adv .hero-g{grid-template-columns:1fr!important}
          .adv .nums-g{grid-template-columns:1fr 1fr!important}
          .adv .why-g{grid-template-columns:1fr!important}
          .adv .desk-nav{display:none!important}
        }
        @media (max-width:560px){
          .adv .g4a{grid-template-columns:1fr!important}
        }
      `}</style>

      {/* header */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(14,26,43,.95)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(201,168,106,.25)" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 28px" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontFamily: serif, fontSize: 30, color: GOLD, width: 44, height: 44, border: `1.5px solid ${GOLD}`, display: "grid", placeItems: "center" }}>{brand[0]}</span>
            <span style={{ lineHeight: 1.15 }}>
              <strong style={{ fontFamily: serif, fontSize: 19, color: "#fff", letterSpacing: 2, textTransform: "uppercase", display: "block" }}>{brand}</strong>
              <span style={{ fontSize: 10.5, letterSpacing: 3, color: GOLD, textTransform: "uppercase" }}>Advocacia</span>
            </span>
          </span>
          <nav style={{ display: "flex", gap: 24, fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "rgba(247,244,238,.8)" }} className="desk-nav">
            {( [["Áreas","areas"],["O escritório","escritorio"],["Contato","contato"]] as [string,string][] ).map(([n, id]) => <a key={id} onClick={() => go(id)} style={{ cursor: "pointer" }}>{n}</a>)}
          </nav>
          <a href={wa("Olá! Quero agendar uma consulta com o escritório " + brand + ".")} className="btn" style={{ padding: "11px 22px", fontSize: 13.5 }}>Agendar consulta</a>
        </div>
      </header>

      {/* hero — à risca do pin: navy, serifada grande, estátua da Justiça à direita */}
      <section style={{ background: `linear-gradient(120deg, ${NAVY} 0%, ${NAVY2} 100%)`, color: "#fff" }}>
        <div className="wrap hero-g" style={{ display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: 48, alignItems: "center", padding: "76px 28px 70px" }}>
          <div>
            <span className="eyebrow">Estratégia / Advocacia / Resultados</span>
            <h1 style={{ margin: "18px 0 20px", fontSize: "clamp(42px,5.6vw,70px)" }}>
              Orientação legal para o que vem <span style={{ fontStyle: "italic", color: GOLD }}>a seguir.</span>
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "rgba(247,244,238,.82)", maxWidth: 460, marginBottom: 30 }}>
              Advocacia de confiança para pessoas, empresas e famílias — hoje e para o futuro.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a className="btn" href={wa("Olá! Quero agendar uma consulta com o escritório " + brand + ".")}>Agendar consulta →</a>
              <button className="btn-o" onClick={() => go("areas")}>Áreas de atuação →</button>
            </div>
          </div>
          <img src="/adv-hero.jpg" alt="Estátua da Justiça dourada sobre mármore escuro no escritório" style={{ width: "100%", aspectRatio: "4/4.6", objectFit: "cover", borderRadius: 8, boxShadow: "0 32px 64px -28px rgba(0,0,0,.6)" }} />
        </div>
      </section>

      {/* números */}
      <section style={{ background: NAVY, borderTop: "1px solid rgba(201,168,106,.25)", color: "#fff" }}>
        <div className="wrap nums-g" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, padding: "34px 28px" }}>
          {NUMS.map((n) => (
            <div key={n.l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: serif, fontSize: "clamp(30px,3.4vw,42px)", color: GOLD }}>{n.v}</div>
              <div style={{ fontSize: 12.5, letterSpacing: 1.4, textTransform: "uppercase", color: "rgba(247,244,238,.7)", marginTop: 4 }}>{n.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* áreas */}
      <section id="areas" style={{ padding: "84px 0", background: CRM }}>
        <div className="wrap">
          <span className="eyebrow">Áreas de atuação</span>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap" }}>
            <h2 style={{ marginTop: 12, fontSize: "clamp(32px,4vw,48px)", color: NAVY, maxWidth: 520 }}>Expertise focada. Impacto no mundo real.</h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.7, color: MUT, maxWidth: 380 }}>Da empresa à família, do imóvel ao contencioso: soluções jurídicas práticas com abordagem pessoal.</p>
          </div>
          <div className="g4a" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18, marginTop: 40 }}>
            {AREAS.map((a) => (
              <article key={a.t} className="hov" style={{ position: "relative", borderRadius: 12, overflow: "hidden", minHeight: 300, display: "flex", alignItems: "flex-end" }}>
                <img src={a.img} alt={a.t} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(12deg, rgba(14,26,43,.92) 28%, rgba(14,26,43,.12) 70%)" }} />
                <div style={{ position: "relative", padding: "20px 20px 22px", color: "#fff" }}>
                  <h3 style={{ fontSize: 24, color: "#fff" }}>{a.t}</h3>
                  <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "rgba(247,244,238,.85)", marginTop: 8 }}>{a.d}</p>
                  <a href={wa(`Olá! Preciso de ajuda com ${a.t.toLowerCase()} — escritório ${brand}.`)} style={{ display: "inline-flex", marginTop: 12, color: GOLD, fontWeight: 800, fontSize: 13, textDecoration: "none", letterSpacing: .6 }}>Consultar →</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* o escritório */}
      <section id="escritorio" style={{ background: "#fff", padding: "84px 0" }}>
        <div className="wrap why-g" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          <img src="/adv-office.jpg" alt="Sala de reunião do escritório com vista para a cidade" style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", borderRadius: 12, boxShadow: "0 28px 56px -26px rgba(14,26,43,.45)" }} />
          <div>
            <span className="eyebrow">O escritório</span>
            <h2 style={{ marginTop: 12, fontSize: "clamp(30px,3.8vw,46px)", color: NAVY }}>Um escritório moderno, construído em torno de pessoas.</h2>
            <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.75, color: MUT }}>
              Unimos profundidade técnica e atendimento próximo: cada caso tem um responsável direto, prazos claros e comunicação em linguagem simples.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "22px 0 28px", display: "grid", gap: 12 }}>
              {["Resposta em até 1 dia útil", "Honorários transparentes desde o início", "Atendimento presencial e online"].map((b) => (
                <li key={b} style={{ display: "flex", gap: 10, fontSize: 15, fontWeight: 600, color: INK, alignItems: "center" }}><Ic d={CHECK} s={16} c={GOLD} />{b}</li>
              ))}
            </ul>
            <a className="btn" href={wa("Olá! Quero conhecer melhor o escritório " + brand + ".")}>Falar com a equipe →</a>
          </div>
        </div>
      </section>

      {/* cta final */}
      <section id="contato" style={{ background: `linear-gradient(120deg, ${NAVY} 0%, ${NAVY2} 100%)`, color: "#fff", padding: "84px 0" }}>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 28, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 560 }}>
            <span className="eyebrow">Primeira consulta</span>
            <h2 style={{ marginTop: 12, fontSize: "clamp(30px,3.8vw,46px)" }}>Vamos construir um amanhã mais forte.</h2>
            <p style={{ marginTop: 14, fontSize: 16, color: "rgba(247,244,238,.8)", lineHeight: 1.7 }}>Agende uma consulta e dê o primeiro passo com confiança.</p>
          </div>
          <a className="btn" style={{ fontSize: 15.5, padding: "17px 32px" }} href={wa("Olá! Quero agendar minha primeira consulta com o escritório " + brand + ".")}>Agendar pelo WhatsApp →</a>
        </div>
      </section>

      {/* footer */}
      <footer style={{ background: NAVY, color: "rgba(247,244,238,.6)", borderTop: "1px solid rgba(201,168,106,.25)", padding: "30px 0" }}>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 14, fontSize: 13.5, alignItems: "center" }}>
          <span style={{ fontFamily: serif, fontSize: 18, color: "#fff", letterSpacing: 2, textTransform: "uppercase" }}>{brand}</span>
          <span>{city} · Advocacia estratégica para pessoas e empresas</span>
        </div>
      </footer>
    </div>
  );
}
