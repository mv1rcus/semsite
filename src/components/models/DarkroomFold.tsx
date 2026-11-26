import { useEffect } from "react";

/** Loja de insumos para laboratório fotográfico analógico construída do zero a partir do pin E-17: preto com vermelho de safelight, hero em foto cheia de laboratório sob luz vermelha, 6 categorias, 2 kits com foto e preço, revelação em casa em 4 passos com foto, comunidade em P&B e CTA final. Pedido fecha no WhatsApp. */
const BLK = "#0b0b0c", PN1 = "#131316", PN2 = "#1a1a1e", RED = "#d92b2b", REDL = "#ef4b4b", CRM = "#f2efe9", MUT = "#a5a3ab", LIN = "rgba(242,239,233,.14)";
const CATS = [
  { t: "Kits de laboratório", img: "/drk-cat1.jpg" },
  { t: "Ampliadores", img: "/drk-cat2.jpg" },
  { t: "Químicos", img: "/drk-cat3.jpg" },
  { t: "Filme & Papel", img: "/drk-cat4.jpg" },
  { t: "Acessórios", img: "/drk-cat5.jpg" },
  { t: "Luz de segurança & Lab", img: "/drk-cat6.jpg" },
];
const KITS = [
  {
    tag: "INICIANTE", t: "Kit Essencial de Laboratório", p: "R$ 1.499",
    d: "Um conjunto completo e fácil de usar para revelar filme e fazer suas primeiras cópias em casa.",
    img: "/drk-kit1.jpg",
    items: ["Tanque de revelação + espirais", "Químicos essenciais (revelador, stop, fixador)", "2 bandejas de ampliação", "Acessórios básicos de ampliação", "Guia do iniciante e videoaulas"],
  },
  {
    tag: "PROFISSIONAL", t: "Kit Studio de Laboratório", p: "R$ 4.299",
    d: "Um setup completo e expansível para fotógrafos analógicos exigentes e impressores de fine art.",
    img: "/drk-kit2.jpg",
    items: ["Ampliador de precisão (35mm / 120)", "Química completa (capacidade 5 L)", "Bandejas e pinças premium", "Focador de grão e timer", "Guia avançado de ampliação e técnicas"],
  },
];
const COMM = [
  { img: "/drk-com1.jpg", alt: "Montanhas com névoa em P&B" },
  { img: "/drk-com2.jpg", alt: "Bonde em rua europeia em P&B" },
  { img: "/drk-com3.jpg", alt: "Retrato feminino na janela em P&B" },
  { img: "/drk-com4.jpg", alt: "Farol com ondas em P&B" },
];
const STEPS = [
  { n: "1", t: "Carregar", d: "Coloque o filme exposto no tanque de revelação, no escuro total.", img: "/drk-step1.jpg" },
  { n: "2", t: "Revelar", d: "Processe com revelador, stop e fixador (tempos precisos inclusos).", img: "/drk-step2.jpg" },
  { n: "3", t: "Lavar & Secar", d: "Lave, pendure e seque os seus negativos para a ampliação.", img: "/drk-step3.jpg" },
  { n: "4", t: "Ampliar", d: "Use o ampliador para criar cópias em papel de alta qualidade.", img: "/drk-step4.jpg" },
];
const TRUST = [
  { t: "Resultados de laboratório", d: "Ferramentas de nível profissional para cópias duradouras e arquivísticas." },
  { t: "Kits completos", d: "Curadoria cuidadosa, prontos para usar assim que saem da caixa." },
  { t: "Aprenda fazendo", d: "Guias, tutoriais e suporte de especialista em cada etapa." },
  { t: "Comunidade criativa", d: "Compartilhe seu trabalho, receba feedback e se inspire." },
];
const CHECK = "M7 16l6 6L26 9";

export function DarkroomFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Sala Rubra";
  const city = client?.city?.trim() || "São Paulo";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const wa = (m: string) => `https://wa.me/${phone || "5511999999999"}?text=${encodeURIComponent(m)}`;
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => {
    const l = document.createElement("link");
    l.href = "https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap";
    l.rel = "stylesheet"; document.head.appendChild(l);
  }, []);
  return (
    <div className="drk" style={{ fontFamily: "'Inter', system-ui, sans-serif", color: CRM, background: BLK, overflowX: "hidden" }}>
      <style>{`
        .drk h1,.drk h2,.drk h3{font-family:'Archivo',system-ui,sans-serif!important;font-weight:800;letter-spacing:-.02em;line-height:1.04;text-wrap:balance}
        .drk .wrap{max-width:1140px;margin:0 auto;padding:0 28px}
        .drk .btn{font-family:'Inter',system-ui,sans-serif;display:inline-flex;align-items:center;gap:10px;background:${RED};color:#fff;font-weight:700;font-size:14.5px;padding:15px 28px;border-radius:6px;text-decoration:none;border:none;cursor:pointer;transition:.2s}
        .drk .btn:hover{background:${REDL};transform:translateY(-2px)}
        .drk .btn-o{font-family:'Inter',system-ui,sans-serif;text-decoration:none;display:inline-flex;align-items:center;gap:10px;background:none;color:#fff;border:1px solid rgba(242,239,233,.4);font-weight:600;font-size:14.5px;padding:14px 26px;border-radius:6px;cursor:pointer;transition:.2s}
        .drk .btn-o:hover{background:rgba(242,239,233,.08)}
        .drk .eyebrow{display:inline-flex;align-items:center;gap:10px;color:${REDL};font-weight:700;font-size:11.5px;letter-spacing:3px;text-transform:uppercase}
        .drk .eyebrow::before{content:"";width:22px;height:1.5px;background:${RED}}
        .drk .cat-card{position:relative;cursor:pointer;transition:.2s}
        .drk .cat-card:hover{transform:translateY(-3px)}
        .drk .cat-card:hover .cat-arrow{color:${RED}}
        .drk .hov{transition:transform .2s,box-shadow .2s}
        .drk .hov:hover{transform:translateY(-4px);box-shadow:0 22px 48px -24px rgba(0,0,0,.8)}
        @media (max-width:900px){
          .drk .g6{grid-template-columns:1fr 1fr 1fr!important}
          .drk .g2{grid-template-columns:1fr!important}
          .drk .g4{grid-template-columns:1fr 1fr!important}
          .drk .desk-nav{display:none!important}
        }
        @media (max-width:560px){
          .drk .g6{grid-template-columns:1fr 1fr!important}
          .drk .g4{grid-template-columns:1fr!important}
        }
      `}</style>

      {/* header */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(11,11,12,.94)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${LIN}` }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 28px" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 14, height: 14, background: RED, borderRadius: 2 }} />
            <span style={{ lineHeight: 1.15 }}>
              <strong style={{ fontFamily: "'Archivo',sans-serif", fontSize: 17, letterSpacing: 1, textTransform: "uppercase", display: "block" }}>{brand}</strong>
              <span style={{ fontSize: 9.5, letterSpacing: 2.5, color: MUT, textTransform: "uppercase" }}>Insumos de laboratório analógico</span>
            </span>
          </span>
          <nav style={{ display: "flex", gap: 24, fontSize: 13, fontWeight: 600, color: "rgba(242,239,233,.75)" }} className="desk-nav">
            {( [["Categorias","categorias"],["Kits","kits"],["Aprenda","aprenda"],["Comunidade","comunidade"]] as [string,string][] ).map(([n, id]) => <a key={id} onClick={() => go(id)} style={{ cursor: "pointer" }}>{n}</a>)}
          </nav>
          <a href={wa("Olá! Quero montar meu laboratório com a " + brand + ".")} className="btn" style={{ padding: "11px 22px", fontSize: 13.5 }}>Ver kits</a>
        </div>
      </header>

      {/* hero — à risca do pin: foto cheia do laboratório sob luz vermelha, texto à esquerda */}
      <section style={{ position: "relative", minHeight: 560, display: "flex", alignItems: "center", overflow: "hidden" }}>
        <img src="/drk-hero.jpg" alt="Laboratório fotográfico sob luz vermelha" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(11,11,12,.95) 0%, rgba(11,11,12,.78) 42%, rgba(11,11,12,.25) 100%)" }} />
        <div className="wrap" style={{ position: "relative", padding: "90px 28px 84px" }}>
          <span className="eyebrow">Filme — Revelação — Ampliação</span>
          <h1 style={{ margin: "18px 0 20px", fontSize: "clamp(40px,5.4vw,66px)", maxWidth: 560 }}>
            Monte o seu laboratório
          </h1>
          <p style={{ fontSize: 16.5, lineHeight: 1.7, color: "rgba(242,239,233,.85)", maxWidth: 440, marginBottom: 30 }}>
            Tudo o que você precisa para revelar filme, fazer cópias e manter a fotografia analógica viva.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 34 }}>
            <a className="btn" href={wa("Olá! Quero ver os kits de laboratório da " + brand + ".")}>Ver kits de laboratório →</a>
            <button className="btn-o" onClick={() => go("aprenda")}>Como funciona ▶</button>
          </div>
          <div style={{ display: "flex", gap: 26, flexWrap: "wrap", fontSize: 12.5, fontWeight: 600, color: "rgba(242,239,233,.8)" }}>
            <span>Kits curados (iniciante ao pro)</span>
            <span>Químicos grau laboratório</span>
            <span>Guia passo a passo</span>
          </div>
        </div>
      </section>

      {/* categorias */}
      <section id="categorias" style={{ background: CRM, color: "#17171a", padding: "72px 0 76px" }}>
        <div className="wrap">
          <span className="eyebrow">Compre por categoria</span>
          <h2 style={{ margin: "14px 0 34px", fontSize: "clamp(28px,3.6vw,42px)" }}>Tudo para o seu laboratório</h2>
          <div className="g6" style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 16 }}>
            {CATS.map((c) => (
              <div key={c.t} className="cat-card" onClick={() => go("kits")}>
                <img src={c.img} alt={c.t} style={{ width: "100%", aspectRatio: "1", objectFit: "cover", display: "block", borderRadius: 10, border: "1px solid rgba(23,23,26,.1)" }} />
                <div style={{ padding: "11px 2px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>{c.t}</span>
                  <span className="cat-arrow" style={{ color: "#8a8a92", fontWeight: 800, transition: ".2s" }}>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* kits */}
      <section id="kits" style={{ padding: "76px 0 80px" }}>
        <div className="wrap">
          <div className="g2" style={{ display: "grid", gridTemplateColumns: ".85fr 2fr", gap: 44, alignItems: "start" }}>
            <div>
              <span className="eyebrow">Kits de laboratório</span>
              <h2 style={{ margin: "14px 0 18px", fontSize: "clamp(30px,3.8vw,46px)" }}>Encontre o kit certo para você</h2>
              <p style={{ fontSize: 15.5, lineHeight: 1.7, color: MUT, marginBottom: 24 }}>
                Do seu primeiro rolo a cópias prontas para exposição, escolha um kit que acompanha a sua experiência.
              </p>
              <a className="btn-o" href={wa("Olá! Quero comparar os kits de laboratório da " + brand + ".")}>Comparar todos os kits →</a>
            </div>
            <div className="g2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
              {KITS.map((k) => (
                <div key={k.t} className="hov" style={{ background: PN1, border: `1px solid ${LIN}`, borderRadius: 12, overflow: "hidden" }}>
                  <span style={{ display: "inline-block", margin: "18px 0 0 22px", padding: "5px 11px", fontSize: 10.5, fontWeight: 800, letterSpacing: 2, color: REDL, border: `1px solid rgba(217,43,43,.55)`, borderRadius: 999 }}>{k.tag}</span>
                  <div style={{ padding: "14px 22px 0" }}>
                    <h3 style={{ fontSize: 24, margin: "6px 0 8px" }}>{k.t}</h3>
                    <p style={{ fontSize: 13.5, lineHeight: 1.6, color: MUT, minHeight: 44 }}>{k.d}</p>
                    <div style={{ fontFamily: "'Archivo',sans-serif", fontSize: 30, fontWeight: 800, margin: "10px 0 14px" }}>{k.p}</div>
                    <a className="btn" href={wa("Olá! Quero pedir o " + k.t + " (" + k.p + ") da " + brand + ".")} style={{ width: "100%", justifyContent: "center", padding: "13px 0" }}>Pedir no WhatsApp</a>
                  </div>
                  <img src={k.img} alt={k.t} style={{ width: "calc(100% - 44px)", margin: "18px 22px 0", aspectRatio: "4/3", objectFit: "cover", borderRadius: 8, display: "block" }} />
                  <ul style={{ listStyle: "none", margin: 0, padding: "18px 22px 24px", display: "grid", gap: 9 }}>
                    {k.items.map((i) => (
                      <li key={i} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 13.5, color: "rgba(242,239,233,.88)" }}>
                        <svg width="16" height="16" viewBox="0 0 32 32" fill="none" stroke={REDL} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden style={{ flexShrink: 0 }}><path d={CHECK} /></svg>
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* aprenda — 4 passos */}
      <section id="aprenda" style={{ background: CRM, color: "#17171a", padding: "72px 0 76px" }}>
        <div className="wrap">
          <div className="g2" style={{ display: "grid", gridTemplateColumns: ".8fr 2.2fr", gap: 44, alignItems: "start" }}>
            <div>
              <span className="eyebrow">Aprenda & crie</span>
              <h2 style={{ margin: "14px 0 18px", fontSize: "clamp(30px,3.8vw,46px)" }}>Revele filme em casa</h2>
              <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "#5a5a62", marginBottom: 24 }}>
                Um processo simples e comprovado. A gente guia você do filme exposto à cópia final — passo a passo.
              </p>
              <a className="btn" href={wa("Olá! Quero o guia completo de revelação da " + brand + ".")}>Ver guia completo →</a>
            </div>
            <div className="g4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 }}>
              {STEPS.map((s) => (
                <div key={s.n}>
                  <img src={s.img} alt={s.t} style={{ width: "100%", aspectRatio: "1", objectFit: "cover", borderRadius: 10, display: "block", marginBottom: 14 }} />
                  <div style={{ fontFamily: "'Archivo',sans-serif", fontSize: 17, fontWeight: 800, marginBottom: 6 }}>{s.n}. {s.t}</div>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: "#5a5a62", margin: 0 }}>{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* comunidade */}
      <section id="comunidade" style={{ padding: "72px 0 76px" }}>
        <div className="wrap">
          <span className="eyebrow">Comunidade</span>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 24, flexWrap: "wrap", marginBottom: 30 }}>
            <h2 style={{ margin: 0, fontSize: "clamp(28px,3.6vw,42px)" }}>Da nossa comunidade de laboratório</h2>
            <a className="btn-o" href={wa("Olá! Quero entrar para a comunidade da " + brand + ".")}>Entrar para a comunidade →</a>
          </div>
          <p style={{ fontSize: 15, color: MUT, maxWidth: 520, margin: "-14px 0 26px" }}>
            Trabalho real de fotógrafos que criam, revelam e ampliam com a {brand}.
          </p>
          <div className="g4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
            {COMM.map((c) => (
              <img key={c.img} src={c.img} alt={c.alt} style={{ width: "100%", aspectRatio: "1", objectFit: "cover", borderRadius: 10, display: "block", filter: "grayscale(1)" }} />
            ))}
          </div>
        </div>
      </section>

      {/* faixa de confiança */}
      <section style={{ borderTop: `1px solid ${LIN}`, borderBottom: `1px solid ${LIN}` }}>
        <div className="wrap g4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 28, padding: "34px 28px" }}>
          {TRUST.map((t) => (
            <div key={t.t}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 5 }}>{t.t}</div>
              <p style={{ fontSize: 12.5, lineHeight: 1.6, color: MUT, margin: 0 }}>{t.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section style={{ position: "relative", overflow: "hidden", textAlign: "center", background: `radial-gradient(70% 120% at 50% 0%, rgba(217,43,43,.28), transparent 60%), ${BLK}` }}>
        <div className="wrap" style={{ padding: "96px 28px 100px" }}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>Mantenha o analógico vivo</span>
          <h2 style={{ margin: "16px auto 18px", fontSize: "clamp(32px,4.4vw,52px)", maxWidth: 640 }}>
            Comece sua jornada no laboratório hoje
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: MUT, maxWidth: 480, margin: "0 auto 32px" }}>
            Kits premium, orientação de especialista e tudo o que você precisa para transformar filme em cópias duradouras.
          </p>
          <a className="btn" href={wa("Olá! Quero montar meu laboratório com a " + brand + ".")} style={{ fontSize: 15.5, padding: "17px 34px" }}>Ver kits de laboratório →</a>
        </div>
      </section>

      {/* rodapé */}
      <footer style={{ borderTop: `1px solid ${LIN}`, padding: "26px 0" }}>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 18, flexWrap: "wrap", fontSize: 12.5, color: MUT }}>
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 10, height: 10, background: RED, borderRadius: 2 }} />
            <strong style={{ color: CRM, fontFamily: "'Archivo',sans-serif", letterSpacing: 1, textTransform: "uppercase" }}>{brand}</strong>
            <span>{city} · Insumos de laboratório analógico</span>
          </span>
          <span>Filme · Revelação · Ampliação</span>
        </div>
      </footer>
    </div>
  );
}
