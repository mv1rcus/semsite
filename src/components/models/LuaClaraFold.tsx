import React, { useState } from "react";

const DARK = "#31362c";
const DARK2 = "#2a2f26";
const CREAM = "#f3efe3";
const CREAM2 = "#ece7d6";
const INK = "#2c3128";
const MUTD = "#c9c4b2";
const MUT = "#6f6f60";
const LINE = "#d8d2bf";
const serif = "'Fraunces', Georgia, serif";
const sans = "'Jost', 'Inter', sans-serif";
const script = "'Caveat', cursive";

const Moon = ({ s = 22, c = CREAM }: { s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M20 13.2A8.2 8.2 0 1 1 10.8 4 6.6 6.6 0 0 0 20 13.2Z" fill={c} />
  </svg>
);

const Spark = ({ s = 18, c = CREAM, style }: { s?: number; c?: string; style?: React.CSSProperties }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill={c} style={style} aria-hidden>
    <path d="M12 2l1.8 6.4L20 10l-6.2 1.6L12 18l-1.8-6.4L4 10l6.2-1.6Z" />
  </svg>
);

const Sun = ({ s = 44, c = "#8a8468" }: { s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 48 48" fill="none" stroke={c} strokeWidth={1.6} strokeLinecap="round" aria-hidden>
    <circle cx="24" cy="24" r="8" />
    {Array.from({ length: 12 }).map((_, i) => {
      const a = (i * Math.PI) / 6;
      const x1 = 24 + Math.cos(a) * 13, y1 = 24 + Math.sin(a) * 13;
      const x2 = 24 + Math.cos(a) * (i % 2 ? 18 : 20), y2 = 24 + Math.sin(a) * (i % 2 ? 18 : 20);
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
    })}
  </svg>
);

const Butterfly = ({ s = 40, c = "#8a8468" }: { s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 48 48" fill="none" stroke={c} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M24 20c-2-6-8-10-13-8-4 1.6-4 7 0 9-2.6.8-4 4-2 6.6 2.4 3.2 8 .4 11-3.6" />
    <path d="M24 20c2-6 8-10 13-8 4 1.6 4 7 0 9 2.6.8 4 4 2 6.6-2.4 3.2-8 .4-11-3.6" />
    <path d="M24 18v14" />
    <path d="M22 14c.6 1.4 3.4 1.4 4 0" />
  </svg>
);

export function LuaClaraFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Lua Clara Doula";
  const city = client?.city?.trim() || "São Paulo";
  const phone = (client?.whatsapp || "5511999999999").replace(/\D/g, "");
  const wa = (t: string) => `https://wa.me/${phone}?text=${encodeURIComponent(t)}`;
  const [imgOk, setImgOk] = useState<Record<string, boolean>>({});
  const ok = (k: string) => () => setImgOk((m) => ({ ...m, [k]: true }));
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const Img = ({ src, alt, k, style, pos }: { src: string; alt: string; k: string; style?: React.CSSProperties; pos?: string }) => (
    <div style={{ background: `linear-gradient(160deg, ${DARK2}, #454b3c)`, overflow: "hidden", ...style }}>
      <img src={src} alt={alt} loading="lazy" onLoad={ok(k)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: pos || "center", display: "block", opacity: imgOk[k] ? 1 : 0, transition: "opacity .4s" }} />
    </div>
  );

  const Btn = ({ children, dark, onClick }: { children: React.ReactNode; dark?: boolean; onClick?: () => void }) => (
    <button onClick={onClick} style={{ fontFamily: sans, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", padding: "15px 34px", background: "transparent", border: `1px solid ${dark ? INK : CREAM}`, color: dark ? INK : CREAM, cursor: "pointer", borderRadius: 2 }}>{children}</button>
  );

  const passos = [
    { t: "Chamada de conexão", d: "Uma conversa online, sem compromisso, pra gente se conhecer e você contar o que sonha pro seu parto." },
    { t: "Reserva do acompanhamento", d: "Fechamos o plano ideal pra você: parto, pós-parto ou os dois, com encontros presenciais." },
    { t: "Apoio contínuo", d: "Estou por perto do início ao fim: dúvidas, visitas, o grande dia e as primeiras semanas." },
  ];

  return (
    <div style={{ background: CREAM, color: INK, fontFamily: sans }}>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=Jost:wght@400;500;600&family=Caveat:wght@500;600&display=swap');
html, body { background: ${DARK} !important; }
        .lc-nav { display: flex; gap: 34px; }
        .lc-nav a { color: ${CREAM}; text-decoration: none; font-size: 11.5px; letter-spacing: 2.5px; text-transform: uppercase; opacity: .85; }
        .lc-nav a:hover { opacity: 1; }
        .lc-hero { display: grid; grid-template-columns: 1.05fr .95fr; gap: 0 56px; align-items: center; }
        .lc-hero-right { position: relative; }
        .lc-hold { display: grid; grid-template-columns: 1fr 1.1fr; gap: 64px; align-items: center; }
        .lc-hold-photos { position: relative; }
        .lc-about { display: grid; grid-template-columns: .9fr 1.1fr; gap: 72px; align-items: center; }
        .lc-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 48px; }
        .lc-foot-grid { display: flex; justify-content: space-between; align-items: center; gap: 24px; flex-wrap: wrap; }
        @media (max-width: 860px) {
          .lc-hero { grid-template-columns: 1fr !important; gap: 40px; }
          .lc-hold { grid-template-columns: 1fr !important; gap: 48px; }
          .lc-about { grid-template-columns: 1fr !important; gap: 48px; }
          .lc-steps { grid-template-columns: 1fr !important; gap: 40px; }
          .lc-hero-oval { display: none; }
          .lc-nav, .lc-moon { display: none; }
        }
      `}</style>

      {/* header */}
      <header style={{ background: DARK, padding: "22px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
        <a href="#" onClick={(e) => e.preventDefault()} style={{ textDecoration: "none", lineHeight: 1 }}>
          <span style={{ fontFamily: serif, fontSize: 22, color: CREAM, letterSpacing: 1 }}>Lua Clara</span>
          <span style={{ display: "block", fontFamily: script, fontSize: 15, color: MUTD, marginTop: 2 }}>doula &amp; pós-parto</span>
        </a>
        <span className="lc-moon" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}><Moon /></span>
        <nav className="lc-nav">
          <a href="#inicio">Início</a>
          <a href="#acompanhamento">Acompanhamento</a>
          <a href="#sobre">Sobre</a>
          <a href="#contato">Contato</a>
        </nav>
      </header>

      {/* hero */}
      <section id="inicio" style={{ background: DARK, padding: "48px 48px 96px", position: "relative" }}>
        <div className="lc-hero" style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Img src="/doula-hero.jpg" alt="Mãe com bebê no colo ao ar livre" k="hero" pos="50% 30%" style={{ aspectRatio: "4/4.7", borderRadius: 18 }} />
          <div className="lc-hero-right">
            <div style={{ position: "relative" }}>
              <Spark s={16} style={{ position: "absolute", left: -34, top: 6 }} />
              <Spark s={11} style={{ position: "absolute", right: 40, top: -18 }} />
              <h1 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(34px, 3.6vw, 52px)", lineHeight: 1.18, color: CREAM, margin: "0 0 28px", letterSpacing: .5 }}>
                Estou aqui para acolher, apoiar e fortalecer você
              </h1>
            </div>
            <p style={{ fontFamily: sans, fontSize: 16, lineHeight: 1.75, color: MUTD, maxWidth: 460, margin: "0 0 36px" }}>
              Acompanhamento de doula para gestantes e famílias: informação, presença e carinho em cada etapa da gravidez, do parto e do pós-parto.
            </p>
            <Btn onClick={() => window.open(wa(`Olá, ${brand}! Quero conhecer o acompanhamento de doula.`), "_blank")}>Conversar comigo</Btn>
            <div className="lc-hero-oval" style={{ position: "absolute", right: -60, top: -40, width: 220, pointerEvents: "none" }}>
              <div style={{ borderRadius: "50%", border: `1px solid ${MUTD}`, padding: 10 }}>
                <Img src="/doula-jardim.jpg" alt="Gestante em meio ao verde" k="jardim" pos="50% 35%" style={{ aspectRatio: "1/1.25", borderRadius: "50%" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* hold your hand */}
      <section id="acompanhamento" style={{ background: CREAM, padding: "110px 48px" }}>
        <div className="lc-hold" style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div>
            <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(30px, 3vw, 44px)", lineHeight: 1.22, margin: "0 0 18px", color: INK }}>
              Queria muito segurar a sua mão nessa jornada mágica
            </h2>
            <p style={{ fontFamily: script, fontSize: 27, color: "#8a8468", margin: "0 0 20px" }}>Acompanhamento de parto &amp; pós-parto</p>
            <p style={{ fontSize: 15.5, lineHeight: 1.8, color: MUT, margin: "0 0 14px", maxWidth: 480 }}>
              Ser doula é estar ao seu lado com escuta, informação confiável e colo quando precisar. Do primeiro encontro às primeiras semanas do bebê, você não passa por nada sozinha.
            </p>
            <p style={{ fontSize: 15.5, lineHeight: 1.8, color: MUT, margin: 0, maxWidth: 480 }}>
              Cada acompanhamento é desenhado pra sua história: encontros de preparação, presença no parto e visitas no pós-parto, sempre no seu ritmo.
            </p>
          </div>
          <div className="lc-hold-photos">
            <Img src="/doula-bebe.jpg" alt="Recém-nascido dormindo em cama de linho" k="bebe" style={{ aspectRatio: "4/3.4", borderRadius: 4, width: "88%", marginLeft: "auto" }} />
            <Img src="/doula-bracos.jpg" alt="Bebê pequeno nos braços" k="bracos" style={{ aspectRatio: "4/3.2", borderRadius: 4, width: "46%", position: "absolute", left: 0, bottom: -44, border: `8px solid ${CREAM}` }} />
          </div>
        </div>
      </section>

      {/* about */}
      <section id="sobre" style={{ background: DARK, padding: "110px 48px" }}>
        <div className="lc-about" style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div>
            <Img src="/doula-doula.jpg" alt="Clara, doula, ao pôr do sol" k="doula" pos="50% 35%" style={{ aspectRatio: "4/4.6", borderRadius: 4 }} />
            <div style={{ textAlign: "center", marginTop: 26 }}><Butterfly /></div>
          </div>
          <div>
            <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(32px, 3.2vw, 46px)", letterSpacing: 1, color: CREAM, margin: "0 0 14px" }}>Sou a Clara</h2>
            <p style={{ fontFamily: sans, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: MUTD, margin: "0 0 26px" }}>Doula de parto e pós-parto · {city}</p>
            <p style={{ fontSize: 15.5, lineHeight: 1.85, color: MUTD, margin: "0 0 16px", maxWidth: 520 }}>
              Me encontrei na doulagem depois de viver de perto o quanto uma presença preparada transforma a experiência do parto. Desde então, acompanho famílias com informação baseada em evidências e muito afeto.
            </p>
            <p style={{ fontSize: 15.5, lineHeight: 1.85, color: MUTD, margin: "0 0 38px", maxWidth: 520 }}>
              Acredito que toda gestante merece se sentir segura, ouvida e protagonista. Meu trabalho é garantir que a sua voz esteja no centro de cada decisão.
            </p>
            <Btn onClick={() => window.open(wa("Olá! Quero saber mais sobre você e seu trabalho como doula."), "_blank")}>Me conhecer</Btn>
          </div>
        </div>
      </section>

      {/* process */}
      <section style={{ background: CREAM, padding: "110px 48px 120px", textAlign: "center" }}>
        <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(34px, 3.4vw, 50px)", letterSpacing: 1, color: INK, margin: "0 0 72px" }}>O processo</h2>
        <div className="lc-steps" style={{ maxWidth: 1120, margin: "0 auto 64px" }}>
          {passos.map((p, i) => (
            <div key={i}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}><Sun /></div>
              <p style={{ fontFamily: script, fontSize: 28, color: INK, margin: "0 0 12px" }}>{p.t}</p>
              <p style={{ fontSize: 14.5, lineHeight: 1.75, color: MUT, margin: 0, maxWidth: 300, marginLeft: "auto", marginRight: "auto" }}>{p.d}</p>
            </div>
          ))}
        </div>
        <Btn dark onClick={() => window.open(wa("Olá! Quero conhecer os acompanhamentos da Lua Clara Doula."), "_blank")}>Ver acompanhamentos</Btn>
      </section>

      {/* footer */}
      <footer id="contato" style={{ background: DARK2, padding: "72px 48px 40px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div className="lc-foot-grid" style={{ paddingBottom: 40, borderBottom: `1px solid rgba(243,239,227,.14)` }}>
            <div>
              <span style={{ fontFamily: serif, fontSize: 24, color: CREAM }}>Lua Clara</span>
              <span style={{ display: "block", fontFamily: script, fontSize: 16, color: MUTD, marginTop: 3 }}>doula &amp; pós-parto</span>
            </div>
            <nav className="lc-nav">
              <a href="#inicio">Início</a>
              <a href="#acompanhamento">Acompanhamento</a>
              <a href="#sobre">Sobre</a>
            </nav>
            <Btn onClick={() => window.open(wa(`Olá, ${brand}! Vim pelo site e quero conversar.`), "_blank")}>Fale comigo</Btn>
          </div>
          <p style={{ fontSize: 12.5, color: MUTD, opacity: .7, margin: "28px 0 0", textAlign: "center" }}>
            © {new Date().getFullYear()} {brand} · {city} · Atendimento presencial e online
          </p>
        </div>
      </footer>
    </div>
  );
}
