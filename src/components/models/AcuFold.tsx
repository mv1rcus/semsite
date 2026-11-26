import { useEffect, useState } from "react";

/** Clínica de acupuntura, construída do zero a partir de um pin navy/creme com seções de ícones. Agendamento de avaliação que fecha no WhatsApp. */
const NV = "#12294d", NV2 = "#0c1d38", GD = "#c9a45c", CRM = "#f7f3ea", CRM2 = "#ece4d0", INK = "#1d2433", GR = "#46506a";
const SERV = [
  { t: "Acupuntura Sistêmica", d: "Pontos corporais para dor crônica, enxaqueca, ansiedade e insônia, com protocolo individual.", i: "M16 5v22M9 12l7-7 7 7M9 20l7 7 7-7" },
  { t: "Auriculoterapia", d: "Estímulo de pontos na orelha para compulsão, estresse e tabagismo.", i: "M10 6a6 6 0 0 1 12 4c0 4-3 5-5 8s-2 6-6 6-6-4-6-8V6" },
  { t: "Ventosaterapia", d: "Copos de sucção que relaxam a musculatura e melhoram a circulação local.", i: "M16 6a8 8 0 0 1 8 8c0 5-4 9-8 9s-8-4-8-9a8 8 0 0 1 8-8zM12 10c2-1 6-1 8 0" },
  { t: "Moxabustão", d: "Calor terapêutico com artemísia para dores frias, cansaço e imunidade.", i: "M16 5c3 4 6 6 6 10a6 6 0 0 1-12 0c0-4 3-6 6-10z" },
  { t: "Massagem Tui Na", d: "Técnica manual chinesa para tensão, contraturas e recuperação muscular.", i: "M8 24c2-6 5-9 8-9s6 3 8 9M16 15V6M12 9l4-3 4 3" },
  { t: "Fitoterapia Chinesa", d: "Fórmulas naturais personalizadas como suporte entre as sessões.", i: "M7 25c0-8 5-14 13-16 1 8-4 15-13 16zM7 25c4-6 8-9 13-11" },
];
const COND = ["Dor crônica", "Ansiedade", "Insônia", "Enxaqueca", "Dor lombar", "Fibromialgia", "Estresse", "TPM e cólicas", "Digestivo", "Tabagismo"];
const STEPS = [
  { n: "01", t: "Avaliação completa", d: "Escuta detalhada do histórico, língua e pulso na tradição chinesa. O plano nasce do seu quadro, não de um protocolo pronto." },
  { n: "02", t: "Plano de tratamento", d: "Frequência, técnicas combinadas e metas claras por ciclo de sessões, tudo explicado em linguagem simples." },
  { n: "03", t: "Acompanhamento", d: "Reavaliação a cada ciclo e canal direto no WhatsApp entre as sessões." },
];
const TESTI = [
  { n: "Marta Soares", r: "Enxaqueca há 15 anos", t: "Vivia a base de remédio. No quarto ciclo de sessões as crises caíram de oito para duas por mês. A Dra. Helena trata a causa, não o sintoma." },
  { n: "Paulo Henrique", r: "Dor lombar crônica", t: "Anos de fisioterapia sem resolver. Com a acupuntura e o Tui Na voltei a correr depois de dois anos parado." },
  { n: "Luciana Prado", r: "Insônia e ansiedade", t: "Saio de cada sessão flutuando. Durmo a noite inteira pela primeira vez em anos e sem depender de medicação." },
];
const FAQ = [
  { q: "Acupuntura dói?", a: "As agulhas são finíssimas, muito mais finas que as de injeção. A maioria sente apenas um leve peso ou formigamento no ponto, e muitos pacientes dormem durante a sessão." },
  { q: "Quantas sessões vou precisar?", a: "Depende do quadro. Questões agudas respondem em 3 a 5 sessões; quadros crônicos pedem ciclos de 8 a 10. Na avaliação você recebe uma estimativa clara." },
  { q: "Tem contraindicação?", a: "É segura para quase todos os perfis. Gestantes, cardiopatas e usuários de anticoagulantes recebem protocolos adaptados, avaliados caso a caso." },
  { q: "Convênio ou reembolso?", a: "Emitimos nota e relatório para pedido de reembolso nos principais planos de saúde." },
];
const CHECK = "M7 16l6 6L26 9";
const Ic = ({ d, s = 22, c = "currentColor" }: { d: string; s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);

export function AcuFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Clínica Meridian";
  const city = client?.city?.trim() || "Porto Alegre";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const wa = (m: string) => `https://wa.me/${phone || "5551999999999"}?text=${encodeURIComponent(m)}`;
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const serif = "'Cormorant Garamond', Georgia, serif";
  const [faq, setFaq] = useState(-1);
  useEffect(() => {
    const l = document.createElement("link");
    l.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400..700;1,400..700&family=Jost:wght@300..700&display=swap";
    l.rel = "stylesheet"; document.head.appendChild(l);
  }, []);
  return (
    <div className="acu" style={{ fontFamily: "'Jost', system-ui, sans-serif", color: INK, background: CRM, overflowX: "hidden" }}>
      <style>{`
        .acu h1,.acu h2,.acu h3{font-family:${serif}!important;font-weight:600;letter-spacing:0;text-decoration:none!important}
        .acu blockquote,.acu figure{margin:0}
        .acu .wrap{max-width:1140px;margin:0 auto;padding:0 28px}
        .acu .btn{display:inline-flex;align-items:center;gap:10px;background:${GD};color:${NV2};font-weight:600;font-size:15px;padding:16px 30px;border-radius:8px;text-decoration:none;border:none;cursor:pointer;transition:.2s;letter-spacing:.4px}
        .acu .btn:hover{background:#d8b772;transform:translateY(-2px)}
        .acu .btn-o{display:inline-flex;align-items:center;gap:10px;background:none;color:${GD};border:1.5px solid ${GD};font-weight:600;font-size:15px;padding:15px 28px;border-radius:8px;cursor:pointer;transition:.2s;text-decoration:none}
        .acu .btn-o:hover{background:rgba(201,164,92,.12)}
        .acu .eyebrow{display:inline-flex;align-items:center;gap:10px;color:${GD};font-weight:600;font-size:12px;letter-spacing:3px;text-transform:uppercase}
        .acu .eyebrow::before{content:"—"}
        .acu .hov{transition:transform .2s,box-shadow .2s,border-color .2s}
        .acu .hov:hover{transform:translateY(-4px);box-shadow:0 18px 42px -26px rgba(18,41,77,.45);border-color:rgba(201,164,92,.6)!important}
        @media (max-width:900px){
          .acu .hero-g{grid-template-columns:1fr!important}
          .acu .hero-art{min-height:360px!important}
          .acu .desk-nav{display:none!important}
        }
      `}</style>

      {/* header */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: NV, borderBottom: "1px solid rgba(201,164,92,.25)" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 28px" }}>
          <span style={{ fontFamily: serif, fontSize: 24, color: "#fff" }}>{brand}<span style={{ color: GD }}>.</span></span>
          <nav style={{ display: "flex", gap: 26, fontSize: 13, fontWeight: 500, letterSpacing: 1.6, textTransform: "uppercase", color: "rgba(255,255,255,.72)" }} className="desk-nav">
            {[["Tratamentos", "trat"], ["Como funciona", "como"], ["Especialista", "sobre"], ["FAQ", "faq"]].map(([n, id]) => <a key={n} onClick={() => go(id ?? "")} style={{ cursor: "pointer" }}>{n}</a>)}
          </nav>
          <a href={wa("Olá! Quero agendar uma avaliação na " + brand + ".")} className="btn" style={{ padding: "11px 22px", fontSize: 13.5 }}>Agendar avaliação</a>
        </div>
      </header>

      {/* hero */}
      <section style={{ position: "relative", padding: "88px 0 96px", background: `radial-gradient(800px 500px at 82% 12%, rgba(201,164,92,.16), transparent 62%), linear-gradient(170deg, ${NV} 0%, ${NV2} 100%)`, color: "#fff", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(201,164,92,.14) 1.2px, transparent 1.2px)", backgroundSize: "26px 26px", maskImage: "radial-gradient(ellipse at 78% 45%, black 20%, transparent 68%)" }} />
        <div className="wrap hero-g" style={{ position: "relative", display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: 56, alignItems: "center" }}>
          <div>
            <span className="eyebrow">Acupuntura e terapias integrativas · {city}</span>
            <h1 style={{ fontSize: "clamp(44px,5.8vw,74px)", lineHeight: 1.04, margin: "18px 0 22px" }}>
              O equilíbrio que o seu corpo <span style={{ fontStyle: "italic", color: GD }}>pede.</span>
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "rgba(255,255,255,.78)", maxWidth: 470, marginBottom: 30 }}>
              Medicina tradicional chinesa com rigor clínico: acupuntura, ventosa, Tui Na e fitoterapia para dor, ansiedade e sono, sem depender de remédio.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 30 }}>
              <a className="btn" href={wa("Olá! Quero agendar uma avaliação na " + brand + ".")}>Agendar avaliação →</a>
              <button className="btn-o" onClick={() => go("trat")}>Ver tratamentos →</button>
            </div>
            <div style={{ display: "flex", gap: 24, fontSize: 13.5, color: "rgba(255,255,255,.65)", flexWrap: "wrap", fontWeight: 500 }}>
              {["Primeira consulta com avaliação completa", "Protocolos individuais", "Reembolso em planos de saúde"].map((b) => <span key={b} style={{ display: "inline-flex", gap: 7, alignItems: "center" }}><Ic d={CHECK} s={14} c={GD} />{b}</span>)}
            </div>
          </div>
          {/* composicao CSS: arco com meridiano + card flutuante */}
          <div className="hero-art" style={{ position: "relative", minHeight: 430 }}>
            <img src="/meridian-arco.webp" alt="Sessão de acupuntura na Clínica Meridian" style={{ position: "absolute", top: 0, right: 10, width: 300, height: 400, objectFit: "cover", borderRadius: "150px 150px 18px 18px", border: "1px solid rgba(201,164,92,.55)", boxShadow: "0 30px 60px -30px rgba(0,0,0,.55)" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 60, background: "#fff", borderRadius: 16, padding: "22px 24px", color: INK, boxShadow: "0 26px 56px -26px rgba(0,0,0,.5)" }}>
              <span style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: 2, color: GD, textTransform: "uppercase" }}>Resultados dos pacientes</span>
              <div style={{ display: "flex", gap: 26, marginTop: 12 }}>
                {[["89%", "relatam alívio já no 1º ciclo"], ["12+", "anos de prática clínica"], ["4.9", "avaliação média"]].map(([v, l]) => (
                  <div key={l}><div style={{ fontFamily: serif, fontSize: 30, color: NV }}>{v}</div><div style={{ fontSize: 13.5, color: GR, lineHeight: 1.35, maxWidth: 120 }}>{l}</div></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* como funciona */}
      <section id="como" style={{ padding: "84px 0", background: CRM }}>
        <div className="wrap">
          <span className="eyebrow">Como funciona</span>
          <h2 style={{ marginTop: 12, fontSize: "clamp(30px,3.6vw,46px)", color: NV }}>Tratamento com começo, meio e plano</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18, marginTop: 38 }}>
            {STEPS.map((s) => (
              <article key={s.n} className="hov" style={{ background: "#fff", borderRadius: 14, padding: "28px 26px", border: `1px solid ${CRM2}` }}>
                <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 40, color: GD }}>{s.n}</span>
                <h3 style={{ fontSize: 23, margin: "10px 0 10px", color: NV }}>{s.t}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.65, color: GR }}>{s.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* tratamentos */}
      <section id="trat" style={{ padding: "84px 0", background: "#fff" }}>
        <div className="wrap">
          <span className="eyebrow">Tratamentos</span>
          <h2 style={{ marginTop: 12, fontSize: "clamp(30px,3.6vw,46px)", color: NV }}>Técnicas que se combinam no seu plano</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 18, marginTop: 38 }}>
            {SERV.map((sv) => (
              <article key={sv.t} className="hov" style={{ background: CRM, borderRadius: 14, padding: "26px 24px", border: `1px solid ${CRM2}`, display: "flex", gap: 16 }}>
                <span style={{ width: 52, height: 52, borderRadius: "50%", border: `1.5px solid ${GD}`, background: "rgba(201,164,92,.14)", display: "grid", placeItems: "center", flexShrink: 0 }}><Ic d={sv.i} s={26} c={NV} /></span>
                <span>
                  <h3 style={{ fontSize: 21, marginBottom: 6, color: NV }}>{sv.t}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: GR }}>{sv.d}</p>
                </span>
              </article>
            ))}
          </div>
          <div style={{ marginTop: 36, display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {COND.map((c) => <span key={c} style={{ fontSize: 13, fontWeight: 500, color: NV, border: `1px solid ${CRM2}`, background: "#fff", borderRadius: 999, padding: "8px 16px" }}>{c}</span>)}
          </div>
        </div>
      </section>

      {/* especialista */}
      <section id="sobre" style={{ padding: "84px 0", background: CRM }}>
        <div className="wrap hero-g" style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 56, alignItems: "center" }} >
          <div>
            <span className="eyebrow">Especialista</span>
            <h2 style={{ marginTop: 12, fontSize: "clamp(30px,3.6vw,46px)", color: NV }}>Quem cuida de você</h2>
            <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.7, color: GR }}>
              A {brand} nasceu da convicção de que o corpo tem memória e pressa não cura. Cada sessão dura o tempo que precisa durar, e cada plano é revisto a cada ciclo.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "22px 0 28px", display: "grid", gap: 12 }}>
              {["Biomédica com especialização em Medicina Tradicional Chinesa", "Mais de 4.000 sessões realizadas", "Formação continuada em dor crônica e saúde da mulher"].map((b) => (
                <li key={b} style={{ display: "flex", gap: 10, fontSize: 15, color: "#3c4358", alignItems: "flex-start" }}><Ic d={CHECK} s={17} c={GD} />{b}</li>
              ))}
            </ul>
            <a className="btn" href={wa("Olá! Quero conversar com a Dra. Helena sobre o meu caso.")}>Conversar com a especialista</a>
          </div>
          <div style={{ background: NV, borderRadius: 18, padding: "34px 30px", color: "#fff", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(420px 240px at 88% 0%, rgba(201,164,92,.18), transparent 60%)" }} />
            <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <img src="/meridian-helena.webp" alt="Dra. Helena Vaz, fundadora e acupunturista" style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", objectPosition: "center 20%", border: "2px solid rgba(201,164,92,.6)" }} />
              <span><strong style={{ fontSize: 17, display: "block" }}>Dra. Helena Vaz</strong><span style={{ fontSize: 13, color: GD, fontWeight: 600 }}>Fundadora e acupunturista</span></span>
            </div>
            <p style={{ position: "relative", fontFamily: serif, fontStyle: "italic", fontSize: 21, lineHeight: 1.5, color: "rgba(255,255,255,.88)", marginBottom: 20 }}>"Agulha nenhuma substitui escuta. O tratamento começa quando o paciente é ouvido de verdade."</p>
            <div style={{ position: "relative", display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["MTCh", "Dor crônica", "Saúde da mulher"].map((c) => <span key={c} style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: 1, color: GD, border: "1px solid rgba(201,164,92,.5)", borderRadius: 999, padding: "6px 12px" }}>{c}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* depoimentos */}
      <section style={{ background: "#fff", padding: "84px 0" }}>
        <div className="wrap">
          <span className="eyebrow">Pacientes</span>
          <h2 style={{ marginTop: 12, fontSize: "clamp(30px,3.6vw,46px)", color: NV }}>Histórias de quem voltou a viver sem dor</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20, marginTop: 38 }}>
            {TESTI.map((t) => (
              <figure key={t.n} className="hov" style={{ background: CRM, borderRadius: 14, padding: "28px 26px", border: `1px solid ${CRM2}`, display: "flex", flexDirection: "column", gap: 14 }}>
                <span style={{ fontFamily: serif, fontSize: 52, lineHeight: .55, color: GD }}>"</span>
                <blockquote style={{ margin: 0, padding: 0, width: "100%", fontSize: 15, lineHeight: 1.7, color: "#333c52" }}>{t.t}</blockquote>
                <figcaption style={{ display: "flex", alignItems: "center", gap: 12, marginTop: "auto" }}>
                  <span style={{ width: 46, height: 46, borderRadius: "50%", background: NV, color: GD, display: "grid", placeItems: "center", fontWeight: 600, fontSize: 15, flexShrink: 0 }}>{t.n.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span>
                  <span><strong style={{ fontSize: 14.5 }}>{t.n}</strong><br /><span style={{ fontSize: 12.5, color: GR }}>{t.r}</span></span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* faq */}
      <section id="faq" style={{ padding: "84px 0", background: CRM }}>
        <div className="wrap" style={{ maxWidth: 780 }}>
          <span className="eyebrow">FAQ</span>
          <h2 style={{ margin: "12px 0 28px", fontSize: "clamp(30px,3.6vw,46px)", color: NV }}>Perguntas frequentes</h2>
          <div style={{ display: "grid", gap: 12 }}>
            {FAQ.map((f, i) => (
              <div key={f.q} style={{ background: "#fff", border: `1px solid ${CRM2}`, borderRadius: 12, overflow: "hidden" }}>
                <button onClick={() => setFaq(faq === i ? -1 : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, background: "none", border: "none", cursor: "pointer", font: "inherit", textAlign: "left", padding: "18px 22px", fontWeight: 600, fontSize: 16, color: NV }}>
                  {f.q}
                  <span style={{ color: GD, fontSize: 22, lineHeight: 1, transform: faq === i ? "rotate(45deg)" : "none", transition: ".2s" }}>+</span>
                </button>
                {faq === i && <p style={{ padding: "0 22px 20px", fontSize: 14.5, lineHeight: 1.7, color: GR }}>{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* cta final */}
      <section style={{ padding: "96px 0", background: `linear-gradient(170deg, ${NV2}, ${NV})`, color: "#fff", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(201,164,92,.16) 1.2px, transparent 1.2px)", backgroundSize: "26px 26px", maskImage: "radial-gradient(ellipse at 50% 100%, black 20%, transparent 70%)" }} />
        <div className="wrap" style={{ position: "relative" }}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>Avaliação completa</span>
          <h2 style={{ margin: "14px auto 18px", fontSize: "clamp(34px,4.5vw,58px)", maxWidth: 720 }}>O seu corpo já pediu pausa. <span style={{ fontStyle: "italic", color: GD }}>Escute.</span></h2>
          <p style={{ fontSize: 16.5, color: "rgba(255,255,255,.75)", maxWidth: 540, margin: "0 auto 32px" }}>Agende a avaliação e saia da primeira consulta com um plano claro para o seu caso.</p>
          <a className="btn" style={{ fontSize: 16, padding: "18px 36px" }} href={wa("Olá! Quero agendar minha avaliação na " + brand + ".")}>Agendar pelo WhatsApp →</a>
        </div>
      </section>

      {/* footer */}
      <footer style={{ background: NV2, color: "rgba(255,255,255,.5)", borderTop: "1px solid rgba(201,164,92,.2)", padding: "34px 0" }}>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 14, fontSize: 13.5 }}>
          <span style={{ fontFamily: serif, fontSize: 21, color: "#fff" }}>{brand}<span style={{ color: GD }}>.</span></span>
          <span>{city} · Acupuntura e medicina tradicional chinesa</span>
        </div>
      </footer>
    </div>
  );
}
