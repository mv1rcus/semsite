import { useEffect } from "react";

/** Estudio de yoga a risca do pin editorial em verde-oliva e creme: hero full-bleed, 3 cards largos, secao escura com foto, faixa de beneficios. Agendamento fecha no WhatsApp. */
const OL = "#4a5230", DK = "#2e3320", CRM = "#f5f1e6", CRM2 = "#ede7d6", SAND = "#d9cfae", INK = "#2b2b23", GR = "#6d6a58", CLAY_TXT = "#8A5A28";
const CARDS = [
  { img: "/raiz-c1.jpg", t: "Yoga", d: "Encontre equilíbrio, mais flexibilidade e uma mente calma.", ic: "lotus" },
  { img: "/raiz-c2.jpg", t: "Mobilidade", d: "Mova-se melhor, sinta-se melhor e destrave todo o seu potencial.", ic: "move" },
  { img: "/raiz-c3.jpg", t: "Treino Personal", d: "Treino sob medida para construir força, confiança e constância.", ic: "heart" },
];
const BENEFITS = [
  { t: "Abordagem holística", d: "Corpo, mente e alma em perfeito equilíbrio.", ic: "lotus" },
  { t: "Acompanhamento experiente", d: "Orientação que motiva e transforma.", ic: "person" },
  { t: "Horário flexível", d: "Aulas e sessões que cabem na sua rotina.", ic: "cal" },
  { t: "Comunidade acolhedora", d: "Parte de um espaço positivo e leve.", ic: "heart" },
];
const PATHS: Record<string, string[]> = {
  lotus: ["M16 26c-5 0-9-3-10-7 3 1 5 0 6-2-1-3 0-6 4-8 4 2 5 5 4 8 1 2 3 3 6 2-1 4-5 7-10 7Z", "M8 27c3 2 5 3 8 3s5-1 8-3"],
  move: ["M16 6v20", "M9 13l7-7 7 7", "M9 19l7 7 7-7"],
  heart: ["M16 26S6 19 6 12a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 7-8 14-8 14Z"],
  person: ["M16 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z", "M6 27c1-6 5-8 10-8s9 2 10 8"],
  cal: ["M8 8h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2Z", "M6 13h20", "M11 5v5", "M21 5v5"],
};
const Ic = ({ k, s = 24, c = "currentColor", w = 1.8 }: { k: string; s?: number; c?: string; w?: number }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    {PATHS[k].map((d, i) => <path key={i} d={d} />)}
  </svg>
);

export function YogaFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Studio Raiz";
  const city = client?.city?.trim() || "Florianópolis";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const wa = (m: string) => `https://wa.me/${phone || "5548999999999"}?text=${encodeURIComponent(m)}`;
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const serif = "Fraunces, Georgia, serif";
  useEffect(() => {
    const l = document.createElement("link");
    l.href = "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Karla:wght@300..800&display=swap";
    l.rel = "stylesheet"; document.head.appendChild(l);
  }, []);
  return (
    <div className="yga" style={{ fontFamily: "'Karla', system-ui, sans-serif", color: INK, background: CRM, overflowX: "hidden" }}>
      <style>{`
        .yga h1,.yga h2,.yga h3{font-family:${serif}!important;font-weight:500;letter-spacing:-.01em;line-height:1.04;text-wrap:balance}
        .yga .wrap{max-width:1180px;margin:0 auto;padding:0 28px}
        .yga .btn{display:inline-flex;align-items:center;gap:12px;background:${DK};color:${CRM};font-weight:700;font-size:14px;letter-spacing:1.2px;text-transform:uppercase;padding:18px 32px;text-decoration:none;border:none;cursor:pointer;transition:.2s}
        .yga .btn:hover{background:${OL};transform:translateY(-2px)}
        .yga .btn-pill{display:inline-flex;align-items:center;gap:8px;background:${OL};color:#fff;font-weight:700;font-size:14px;padding:13px 26px;border-radius:999px;text-decoration:none;border:none;cursor:pointer;transition:.2s}
        .yga .btn-pill:hover{background:${DK}}
        .yga .btn-sand{display:inline-flex;align-items:center;gap:12px;background:${SAND};color:${DK};font-weight:700;font-size:14px;letter-spacing:1.2px;text-transform:uppercase;padding:18px 32px;text-decoration:none;border:none;cursor:pointer;transition:.2s}
        .yga .btn-sand:hover{background:${CRM};transform:translateY(-2px)}
        .yga .nav-a{font-weight:700;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${INK};text-decoration:none;cursor:pointer;background:none;border:none;padding:0}
        .yga .nav-a:hover{color:${OL}}
        @media (max-width:900px){
          .yga .g3y{grid-template-columns:1fr!important}
          .yga .g4y{grid-template-columns:1fr 1fr!important}
          .yga .g2y{grid-template-columns:1fr!important}
          .yga .nav-c{display:none!important}
          .yga .sobre-foto{min-height:380px!important}
          .yga .hero-tt{font-size:clamp(44px,13vw,64px)!important}
          .yga .hero-sec{min-height:100svh!important}
          .yga .hero-img{object-position:60% 72%!important}
          .yga .hero-ov{background:linear-gradient(180deg, ${CRM}fc 0%, ${CRM}f5 40%, ${CRM}d9 55%, ${CRM}8c 70%, ${CRM}4d 100%)!important}
          .yga .hero-k{font-size:11px!important;letter-spacing:2px!important}
        }
        @media (max-width:560px){
          .yga .g4y{grid-template-columns:1fr!important}
        }
      `}</style>

      {/* HEADER */}
      <header style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 20, padding: "22px 0" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
          <span style={{ fontFamily: serif, fontSize: 27, color: DK, letterSpacing: "-.01em" }}>{brand}<span style={{ color: CLAY_TXT }}>.</span></span>
          <nav className="nav-c" style={{ display: "flex", gap: 34 }}>
            {["Aulas", "Sobre", "Benefícios", "Contato"].map((l, i) => (
              <button key={l} className="nav-a" onClick={() => go(["aulas", "sobre", "beneficios", "contato"][i])}>{l}</button>
            ))}
          </nav>
          <a href={wa("Olá! Quero agendar uma aula experimental.")} target="_blank" rel="noreferrer" className="btn-pill">Agendar</a>
        </div>
      </header>

      {/* HERO full-bleed */}
      <section className="hero-sec" style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <img className="hero-img" src="/raiz-hero.jpg" alt={`Prática de yoga no ${brand}`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "70% 30%" }} />
        <div className="hero-ov" style={{ position: "absolute", inset: 0, background: `linear-gradient(100deg, ${CRM}f2 0%, ${CRM}d9 30%, ${CRM}66 52%, transparent 70%)` }} />
        <div className="wrap" style={{ position: "relative", zIndex: 2, width: "100%", paddingTop: 90, paddingBottom: 60 }}>
          <p className="hero-k" style={{ margin: "0 0 22px", fontWeight: 700, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: DK }}>Corpo forte. Mente calma. Melhor você.</p>
          <h1 className="hero-tt" style={{ margin: 0, fontSize: "clamp(54px,7.2vw,102px)", color: DK }}>
            Mova.<br />Respire.<br />Torne-se.
          </h1>
          <p style={{ margin: "26px 0 34px", maxWidth: 400, fontSize: 17, lineHeight: 1.65, color: INK }}>Yoga. Força. Mobilidade.<br />Uma jornada para o seu melhor.</p>
          <a href={wa("Olá! Quero começar minha jornada com uma aula experimental.")} target="_blank" rel="noreferrer" className="btn">Comece sua jornada <span aria-hidden>→</span></a>
        </div>
      </section>

      {/* FAIXA + TITULO + 3 CARDS LARGOS */}
      <section id="aulas" style={{ padding: "90px 0 96px", background: CRM }}>
        <div className="wrap">
          <p style={{ margin: "0 0 16px", textAlign: "center", fontWeight: 700, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: CLAY_TXT }}>Pratique. Progrida. Transforme.</p>
          <h2 style={{ margin: "0 auto 60px", textAlign: "center", fontSize: "clamp(32px,4vw,52px)", color: DK, maxWidth: 760 }}>Treine seu corpo. Eleve sua vida.</h2>
          <div className="g3y" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 34 }}>
            {CARDS.map((c) => (
              <figure key={c.t} style={{ margin: 0 }}>
                <img src={c.img} alt={c.t} style={{ width: "100%", aspectRatio: "4/3.2", objectFit: "cover", display: "block" }} />
                <figcaption style={{ display: "flex", gap: 16, alignItems: "flex-start", paddingTop: 22 }}>
                  <span style={{ flexShrink: 0, width: 46, height: 46, borderRadius: "50%", background: OL, color: CRM, display: "grid", placeItems: "center" }}><Ic k={c.ic} s={22} /></span>
                  <span>
                    <span style={{ display: "block", fontWeight: 800, fontSize: 15, letterSpacing: 1.6, textTransform: "uppercase", color: DK, marginBottom: 6 }}>{c.t}</span>
                    <span style={{ display: "block", fontSize: 15, lineHeight: 1.55, color: GR }}>{c.d}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* SECAO ESCURA com foto sangrando a borda direita */}
      <section id="sobre" style={{ background: DK }}>
        <div className="g2y" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "stretch" }}>
          <div style={{ padding: "104px 64px 104px max(28px, calc((100vw - 1180px)/2 + 28px))", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h2 style={{ margin: "0 0 24px", fontSize: "clamp(34px,3.8vw,52px)", color: CRM }}>Seu corpo.<br />Sua respiração.<br />Sua jornada.</h2>
            <p style={{ margin: "0 0 36px", fontSize: 17, lineHeight: 1.65, color: SAND }}>Você não precisa ser perfeita.<br />Só precisa começar.</p>
            <div><a href={wa("Olá! Quero agendar uma sessão.")} target="_blank" rel="noreferrer" className="btn-sand">Agendar uma sessão <span aria-hidden>→</span></a></div>
          </div>
          <div className="sobre-foto" style={{ position: "relative", minHeight: 560 }}>
            <img src="/raiz-c3.jpg" alt={`Sessão de meditação no ${brand}`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(46,51,32,.35), rgba(46,51,32,.12) 40%, rgba(46,51,32,.3))" }} />
          </div>
        </div>
      </section>

      {/* FAIXA DE BENEFICIOS */}
      <section id="beneficios" style={{ background: CRM, padding: "84px 0" }}>
        <div className="wrap g4y" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 40 }}>
          {BENEFITS.map((b) => (
            <div key={b.t}>
              <Ic k={b.ic} s={30} c={OL} />
              <h3 style={{ margin: "16px 0 8px", fontFamily: "'Karla',system-ui,sans-serif", fontWeight: 800, fontSize: 15, letterSpacing: 1.4, textTransform: "uppercase", color: DK, lineHeight: 1.3 }}>{b.t}</h3>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: GR }}>{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contato" style={{ background: DK, padding: "56px 0" }}>
        <div className="wrap" style={{ display: "flex", flexWrap: "wrap", gap: 28, alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 14 }}>
            {["M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-6-4h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4Zm14 3.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z", "M18 5h3v6h-3v6h-4v-6h-3V8h3V6a4 4 0 0 1 4-4Z", "M4 6l8 7 8-7M4 6h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"].map((d, i) => (
              <a key={i} href={wa("Olá! Vim pelo site e quero falar com o estúdio.")} target="_blank" rel="noreferrer" aria-label="Rede social" style={{ width: 38, height: 38, borderRadius: "50%", border: `1px solid ${SAND}55`, display: "grid", placeItems: "center", color: SAND }}>
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
              </a>
            ))}
          </div>
          <p style={{ margin: 0, fontSize: 13, letterSpacing: 1.4, textTransform: "uppercase", color: SAND }}>© 2026 {brand}. Todos os direitos reservados.</p>
          <p style={{ margin: 0, fontFamily: serif, fontSize: 17, color: CRM }}>Viva melhor. Mova-se livre. Seja você.</p>
        </div>
        <div className="wrap" style={{ marginTop: 18 }}>
          <p style={{ margin: 0, fontSize: 12, letterSpacing: 1.2, color: `${SAND}88` }}>{city} · Yoga e meditação para todos os corpos</p>
        </div>
      </footer>
    </div>
  );
}
