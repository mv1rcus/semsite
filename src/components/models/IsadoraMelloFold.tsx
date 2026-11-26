import React, { useState } from "react";

const CREAM = "#efe9df";
const CREAM2 = "#e8e1d4";
const PAPER = "#f4f0e8";
const INK = "#38332b";
const MUT = "#7b7264";
const LINE = "#d6cdbd";
const serif = "'Fraunces', Georgia, serif";
const sans = "'Jost', 'Inter', sans-serif";

export function IsadoraMelloFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Isadora Mello";
  const city = client?.city?.trim() || "São Paulo";
  const phone = (client?.whatsapp || "5511999999999").replace(/\D/g, "");
  const wa = (t: string) => `https://wa.me/${phone}?text=${encodeURIComponent(t)}`;
  const [imgOk, setImgOk] = useState<Record<string, boolean>>({});
  const ok = (k: string) => () => setImgOk((m) => ({ ...m, [k]: true }));
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const Img = ({ src, alt, k, style, pos }: { src: string; alt: string; k: string; style?: React.CSSProperties; pos?: string }) => (
    <div style={{ background: `linear-gradient(160deg, ${CREAM2}, #d9d0bf)`, overflow: "hidden", ...style }}>
      <img src={src} alt={alt} loading="lazy" onLoad={ok(k)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: pos || "center", display: "block", opacity: imgOk[k] ? 1 : 0, transition: "opacity .4s" }} />
    </div>
  );

  const navL: [string, string][] = [["Início", "inicio"], ["Sobre", "sobre"], ["Serviços", "servicos"]];
  const navR: [string, string][] = [["Projetos", "projetos"], ["Contato", "contato"]];
  const linkStyle: React.CSSProperties = { color: INK, textDecoration: "none", fontSize: 11.5, letterSpacing: 2.5, textTransform: "uppercase" };

  const projetos = [
    { img: "/int-p1.jpg", nome: "Casa das Flores", alt: "Sala neutra com sofá de linho" },
    { img: "/int-p2.jpg", nome: "Casa do Lago", alt: "Quarto rústico-moderno em tons quentes" },
    { img: "/int-p3.jpg", nome: "Cozinha da Fazenda", alt: "Cozinha de madeira com tábuas e utensílios" },
  ];

  return (
    <div style={{ background: CREAM, color: INK, fontFamily: sans }}>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=Jost:wght@400;500;600&family=Caveat:wght@500;600&display=swap');
html, body { background: ${CREAM} !important; }
        .im-nav { display: flex; gap: 32px; }
        .im-nav a:hover { opacity: .65; }
        .im-hero { display: grid; grid-template-columns: 1.25fr 1fr; }
        .im-projetos { display: grid; grid-template-columns: 1.1fr 1.35fr 1fr; gap: 28px; align-items: start; }
        .im-detalhe { display: grid; grid-template-columns: 1fr 1.1fr; gap: 72px; align-items: center; }
        @media (max-width: 860px) {
          .im-hero { grid-template-columns: 1fr !important; }
          .im-projetos { grid-template-columns: 1fr !important; gap: 40px; }
          .im-detalhe { grid-template-columns: 1fr !important; gap: 48px; }
          .im-navside { display: none; }
        }
      `}</style>

      {/* topbar */}
      <div style={{ background: PAPER, borderBottom: `1px solid ${LINE}`, padding: "9px 48px", display: "flex", justifyContent: "flex-end" }}>
        <a href="#contato" onClick={(e) => { e.preventDefault(); go("contato"); }} style={{ fontSize: 10.5, letterSpacing: 2.5, textTransform: "uppercase", color: MUT, textDecoration: "none" }}>Agende uma consulta gratuita</a>
      </div>

      {/* header */}
      <header style={{ background: CREAM, padding: "26px 48px", display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", borderBottom: `1px solid ${LINE}` }}>
        <nav className="im-nav im-navside">
          {navL.map(([t, id]) => <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); go(id); }} style={linkStyle}>{t}</a>)}
        </nav>
        <a href="#" onClick={(e) => e.preventDefault()} style={{ textDecoration: "none", textAlign: "center", lineHeight: 1.15 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={1.4} style={{ display: "block", margin: "0 auto 6px" }} aria-hidden>
            <path d="M4 21V9l8-6 8 6v12" /><path d="M9 21v-6h6v6" />
          </svg>
          <span style={{ fontFamily: serif, fontSize: 19, letterSpacing: 3, textTransform: "uppercase", color: INK, display: "block" }}>Isadora Mello</span>
          <span style={{ fontSize: 9.5, letterSpacing: 4, textTransform: "uppercase", color: MUT }}>Interiores</span>
        </a>
        <nav className="im-nav im-navside" style={{ justifyContent: "flex-end" }}>
          {navR.map(([t, id]) => <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); go(id); }} style={linkStyle}>{t}</a>)}
        </nav>
      </header>

      {/* hero split */}
      <section id="inicio" className="im-hero" style={{ borderBottom: `1px solid ${LINE}` }}>
        <Img src="/int-hero.jpg" alt="Designer pendurando um quadro em sala clara" k="hero" pos="50% 40%" style={{ aspectRatio: "4/4.2" }} />
        <div style={{ background: PAPER, padding: "72px 56px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-end", textAlign: "right" }}>
          <h1 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(34px, 3.2vw, 46px)", margin: "0 0 34px", color: INK }}>Nosso trabalho</h1>
          <Img src="/int-still.jpg" alt="Cerâmicas e vasos sobre aparador de madeira" k="still" style={{ aspectRatio: "4/3", width: "78%", marginBottom: 34 }} />
          <p style={{ fontSize: 14.5, lineHeight: 1.85, color: MUT, maxWidth: 380, margin: 0 }}>
            Trazemos inspiração nova para espaços com história. Somos especialistas em reformas que honram a beleza rústica do campo e somam um toque moderno e refinado.
          </p>
        </div>
      </section>

      {/* projetos */}
      <section id="projetos" style={{ padding: "96px 48px", background: CREAM }}>
        <div className="im-projetos" style={{ maxWidth: 1240, margin: "0 auto" }}>
          {projetos.map((p, i) => (
            <figure key={i} style={{ margin: 0, marginTop: i === 1 ? 0 : 36 }}>
              <Img src={p.img} alt={p.alt} k={`p${i}`} style={{ aspectRatio: i === 1 ? "4/3.1" : "4/3.4" }} />
              <figcaption style={{ fontSize: 10.5, letterSpacing: 3, textTransform: "uppercase", color: MUT, marginTop: 14 }}>{p.nome}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* detalhe / servicos */}
      <section id="servicos" style={{ padding: "40px 48px 110px", background: CREAM }}>
        <div className="im-detalhe" style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div>
            <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(30px, 3vw, 42px)", margin: "0 0 22px", color: INK }}>Cada detalhe importa</h2>
            <p style={{ fontSize: 14.5, lineHeight: 1.85, color: MUT, margin: "0 0 16px", maxWidth: 460 }}>
              Personalizamos o seu espaço com peças que trazem profundidade e caráter para a sua casa. Do projeto à obra, cuidamos de tudo.
            </p>
            <p style={{ fontSize: 14.5, lineHeight: 1.85, color: MUT, margin: "0 0 34px", maxWidth: 460 }}>
              Trabalhamos com marceneiros e artesãos parceiros para criar móveis e acabamentos únicos, que refletem o seu estilo e elevam o seu interior.
            </p>
            <button onClick={() => window.open(wa(`Olá, ${brand}! Quero conhecer os serviços de design de interiores.`), "_blank")} style={{ fontFamily: sans, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", padding: "15px 32px", background: INK, color: CREAM, border: "none", cursor: "pointer", borderRadius: 2 }}>Ver os serviços</button>
          </div>
          <Img src="/int-maos.jpg" alt="Mãos organizando livros e pastas de tecido" k="maos" pos="50% 60%" style={{ aspectRatio: "4/3.6" }} />
        </div>
      </section>

      {/* footer */}
      <footer id="contato" style={{ background: PAPER, borderTop: `1px solid ${LINE}`, padding: "64px 48px 36px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontFamily: serif, fontSize: 21, letterSpacing: 3, textTransform: "uppercase", color: INK, display: "block" }}>Isadora Mello</span>
          <span style={{ fontSize: 9.5, letterSpacing: 4, textTransform: "uppercase", color: MUT, display: "block", marginTop: 4 }}>Interiores · {city}</span>
          <div style={{ margin: "30px 0 40px" }}>
            <button onClick={() => window.open(wa(`Olá, ${brand}! Vim pelo site e quero agendar uma consulta.`), "_blank")} style={{ fontFamily: sans, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", padding: "15px 32px", background: "transparent", color: INK, border: `1px solid ${INK}`, cursor: "pointer", borderRadius: 2 }}>Agendar consulta</button>
          </div>
          <p style={{ fontSize: 12, color: MUT, margin: 0, borderTop: `1px solid ${LINE}`, paddingTop: 28 }}>
            © {new Date().getFullYear()} {brand} Interiores · Projetos residenciais e comerciais
          </p>
        </div>
      </footer>
    </div>
  );
}
