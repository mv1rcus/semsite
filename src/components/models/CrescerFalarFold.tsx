import React, { useState } from "react";

const PINK = "#f2527e";
const PINKD = "#e13f6c";
const INDIGO = "#46479c";
const INDIGOD = "#3b3d8c";
const CYAN = "#2fb3e8";
const YELLOW = "#ffc63f";
const CREAM = "#f6f4ef";
const INK = "#33335c";
const MUT = "#7a7a95";
const display = "'Fredoka', 'Jost', sans-serif";
const sans = "'Jost', 'Inter', sans-serif";

const D = {
  fala: ["M6 5h16v11H12l-4 4v-4H6Z", "M10 10.5h8", "M10 13h5"],
  chat: ["M5 6h11v8H9l-3 3v-3H5Z", "M13 4h6v8h-2v3l-3-3h-3"],
  som: ["M5 11v6h4l6 5V6l-6 5Z", "M18 10a5 5 0 0 1 0 8", "M20.5 7.5a9 9 0 0 1 0 13"],
  mao: ["M8 13V6a1.6 1.6 0 0 1 3.2 0v5", "M11.2 11V4.4a1.6 1.6 0 0 1 3.2 0V11", "M14.4 11V5.6a1.6 1.6 0 0 1 3.2 0v6", "M17.6 11.6V8a1.6 1.6 0 0 1 3.2 0v7c0 4.4-2.8 8-7.2 8-3.4 0-5-1.4-7-4.4L4 14.6c-.8-1.2.8-2.6 2-1.6l2 1.8"],
  avalia: ["M9 4h6v3H9Z", "M9 5.5H6.5v15h11v-15H15", "M9 12l2 2 4-4.5"],
  escuta: ["M6 14a8 8 0 0 1 16 0", "M6 14v4a2 2 0 0 0 2 2h1v-8H8a2 2 0 0 0-2 2Z", "M22 14v4a2 2 0 0 1-2 2h-1v-8h1a2 2 0 0 1 2 2Z"],
  estrela: ["M14 3l3.2 7 7.5.8-5.6 5.1 1.5 7.4L14 19.8l-6.6 3.5 1.5-7.4L3.3 10.8l7.5-.8Z"],
  coracao: ["M14 23S4.5 17 4.5 10.5A5 5 0 0 1 14 8a5 5 0 0 1 9.5 2.5C23.5 17 14 23 14 23Z"],
  bloco: ["M5 5h8v8H5Z", "M15 11h8v8h-8Z", "M11 17h4", "M15 15h8"],
  livro: ["M4 5c3-1.5 6-1.5 8 0v14c-2-1.5-5-1.5-8 0Z", "M20 5c-3-1.5-6-1.5-8 0v14c2-1.5 5-1.5 8 0Z"],
  sol: ["M14 10a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z", "M14 2v3", "M14 23v3", "M3 14h3", "M22 14h3", "M6 6l2 2", "M20 20l2 2", "M22 6l-2 2", "M8 20l-2 2"],
  pessoa: ["M14 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z", "M4.5 24c1-5 4.7-7.5 9.5-7.5s8.5 2.5 9.5 7.5"],
  prato: ["M14 24c6 0 10.5-4.5 10.5-10.5H3.5C3.5 19.5 8 24 14 24Z", "M4 13.5C4 8 8.5 4 14 4s10 4 10 9.5", "M14 4V2"],
  cerebro: ["M10 4a3.5 3.5 0 0 0-3.5 3.5A3.5 3.5 0 0 0 4 11c0 1 .4 1.9 1 2.5A3.5 3.5 0 0 0 6.5 19 3.5 3.5 0 0 0 13 21V8a4 4 0 0 0-3-4Z", "M18 4a3.5 3.5 0 0 1 3.5 3.5A3.5 3.5 0 0 1 24 11c0 1-.4 1.9-1 2.5a3.5 3.5 0 0 1-1.5 5.5A3.5 3.5 0 0 1 15 21V8a4 4 0 0 1 3-4Z"],
};

const Ic = ({ k, s = 26, c = "currentColor", w = 1.7 }: { k: string; s?: number; c?: string; w?: number }) => (
  <svg width={s} height={s} viewBox="0 0 28 28" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    {(D[k as keyof typeof D] || []).map((d, i) => <path key={i} d={d} />)}
  </svg>
);

const Scallop = ({ fill, flip }: { fill: string; flip?: boolean }) => (
  <svg viewBox="0 0 1440 46" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 46, transform: flip ? "scaleY(-1)" : undefined, marginBottom: flip ? 0 : -1, marginTop: flip ? -1 : 0 }} aria-hidden>
    <path d="M0 46h1440V24c-40 0-40 20-80 20s-40-20-80-20-40 20-80 20-40-20-80-20-40 20-80 20-40-20-80-20-40 20-80 20-40-20-80-20-40 20-80 20-40-20-80-20-40 20-80 20-40-20-80-20-40 20-80 20-40-20-80-20-40 20-80 20-40-20-80-20-40 20-80 20-40-20-80-20-40 20-80 20S40 0 0 24Z" fill={fill} />
  </svg>
);

export function CrescerFalarFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Crescer & Falar";
  const city = client?.city?.trim() || "São Paulo";
  const phone = (client?.whatsapp || "5511999999999").replace(/\D/g, "");
  const wa = (t: string) => `https://wa.me/${phone}?text=${encodeURIComponent(t)}`;
  const [imgOk, setImgOk] = useState<Record<string, boolean>>({});
  const ok = (k: string) => () => setImgOk((m) => ({ ...m, [k]: true }));
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const Img = ({ src, alt, k, style, pos }: { src: string; alt: string; k: string; style?: React.CSSProperties; pos?: string }) => (
    <div style={{ background: `linear-gradient(160deg, #e8e6f4, #d4dcf0)`, overflow: "hidden", ...style }}>
      <img src={src} alt={alt} loading="lazy" onLoad={ok(k)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: pos || "center", display: "block", opacity: imgOk[k] ? 1 : 0, transition: "opacity .4s" }} />
    </div>
  );

  const Kicker = ({ children, light }: { children: React.ReactNode; light?: boolean }) => (
    <p style={{ fontFamily: sans, fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: light ? "#b9baf0" : PINK, margin: "0 0 10px", textAlign: "center" }}>{children}</p>
  );

  const passos = [
    { ic: "som", t: "Som em sílaba", d: "A criança aprende os sons da fala brincando, sílaba por sílaba, no tempo dela." },
    { ic: "chat", t: "Conversação", d: "Jogos e rodas de conversa pra destravar o vocabulário e a vontade de falar." },
    { ic: "fala", t: "Articulação", d: "Exercícios lúdicos que treinam a boca, a língua e a respiração pra falar claro." },
  ];

  const especialidades = [
    { ic: "pessoa", t: "Primeiros passos da fala" },
    { ic: "mao", t: "Motricidade orofacial" },
    { ic: "cerebro", t: "Terapia ocupacional" },
    { ic: "avalia", t: "Avaliação da fala" },
    { ic: "escuta", t: "Escuta terapêutica" },
  ];

  const ofertas = [
    { ic: "cerebro", t: "Terapia ocupacional", c: PINK },
    { ic: "estrela", t: "Educação especial", c: CYAN },
    { ic: "prato", t: "Alimentação saudável", c: "#8a5cb8" },
    { ic: "mao", t: "Fisioterapia infantil", c: INDIGO },
    { ic: "chat", t: "Análise do comportamento", c: "#e0873c" },
    { ic: "fala", t: "Fonoaudiologia", c: "#4caf7d" },
  ];

  const depoimentos = [
    { q: "Eu só queria que meu filho tivesse uma infância feliz e normal, brincando com outras crianças. Hoje ele conta o dia inteiro pra gente!", n: "Mariana S.", img: "/fono-a1.jpg" },
    { q: "A equipe transformou a fala da minha filha em poucos meses. Ela entra na clínica rindo e sai rindo.", n: "Camila K.", img: "/fono-a2.jpg" },
    { q: "Do primeiro dia avaliação ao plano de terapia, tudo foi explicado com calma. Nos sentimos parte do processo.", n: "Eleonora A.", img: "/fono-a3.jpg" },
  ];

  const Btn = ({ children, bg, onClick }: { children: React.ReactNode; bg: string; onClick?: () => void }) => (
    <button onClick={onClick} style={{ fontFamily: sans, fontWeight: 600, fontSize: 13.5, letterSpacing: 1, padding: "14px 30px", background: bg, color: "#fff", border: "none", borderRadius: 30, cursor: "pointer", boxShadow: "0 8px 18px rgba(51,51,92,.16)" }}>{children}</button>
  );

  return (
    <div style={{ background: "#fff", color: INK, fontFamily: sans }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Jost:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        html, body { background: ${INDIGO} !important; }
        .cf-nav { display: flex; gap: 28px; }
        .cf-nav a { color: ${INK}; text-decoration: none; font-size: 13.5px; font-weight: 500; }
        .cf-nav a:hover { color: ${PINK}; }
        .cf-hero { display: grid; grid-template-columns: 1fr 1.1fr; gap: 56px; align-items: center; }
        .cf-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; }
        .cf-nivel { display: grid; grid-template-columns: 1.05fr 1fr; gap: 56px; align-items: center; }
        .cf-espec { display: grid; grid-template-columns: repeat(5, 1fr); gap: 24px; }
        .cf-cards { display: grid; grid-template-columns: 1fr 1fr 1.15fr; gap: 32px; align-items: start; }
        .cf-ofertas { display: grid; grid-template-columns: repeat(3, 1fr); gap: 36px 48px; }
        .cf-deps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; }
        .cf-foot-grid { display: grid; grid-template-columns: 1.4fr 1fr 1.2fr; gap: 48px; }
        .cf-tabs button { border: none; background: transparent; font-family: ${sans}; font-weight: 600; font-size: 13px; padding: 10px 18px; border-radius: 20px; cursor: pointer; color: ${MUT}; }
        @media (max-width: 860px) {
          .cf-hero, .cf-nivel, .cf-cards, .cf-foot-grid { grid-template-columns: 1fr !important; gap: 40px; }
          .cf-steps, .cf-deps { grid-template-columns: 1fr !important; gap: 36px; }
          .cf-espec { grid-template-columns: repeat(2, 1fr) !important; }
          .cf-ofertas { grid-template-columns: 1fr !important; }
          .cf-nav { display: none; }
          .cf-hours { position: static !important; margin-top: 16px; }
        }
      `}</style>

      {/* topbar */}
      <div style={{ background: "#fff", borderBottom: "1px solid #eceaf2", padding: "8px 48px", display: "flex", justifyContent: "space-between", fontSize: 12.5, color: MUT }}>
        <span>Unidade {city} · Atendimento de segunda a sábado</span>
        <span>Fale conosco no WhatsApp</span>
      </div>

      {/* header */}
      <header style={{ background: "#fff", padding: "18px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 20, boxShadow: "0 2px 14px rgba(51,51,92,.06)" }}>
        <a href="#" onClick={(e) => e.preventDefault()} style={{ textDecoration: "none", fontFamily: display, fontWeight: 700, fontSize: 27, letterSpacing: .5 }}>
          <span style={{ color: PINK }}>Crescer</span><span style={{ color: INDIGO }}> &amp; Falar</span>
        </a>
        <nav className="cf-nav">
          <a href="#inicio">Início</a>
          <a href="#servicos">Serviços</a>
          <a href="#sobre">Sobre</a>
          <a href="#depoimentos">Depoimentos</a>
          <a href="#contato">Contato</a>
        </nav>
        <Btn bg={PINK} onClick={() => window.open(wa(`Olá, ${brand}! Quero agendar uma avaliação.`), "_blank")}>Agendar avaliação</Btn>
      </header>

      {/* hero */}
      <section id="inicio" style={{ background: "#fff", padding: "72px 48px 90px", position: "relative", overflow: "hidden" }}>
        <Ic k="estrela" s={30} c={YELLOW} w={1.4} />
        <div className="cf-hero" style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div>
            <h1 style={{ fontFamily: display, fontWeight: 600, fontSize: "clamp(36px, 3.8vw, 54px)", lineHeight: 1.16, margin: "0 0 20px", color: INK }}>
              Aqui, terapia parece <span style={{ color: PINK }}>brincadeira</span>.
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: MUT, maxWidth: 440, margin: "0 0 32px" }}>
              Fonoaudiologia e terapias infantis com o melhor time e muito carinho, pra cada criança falar, brincar e aprender no seu tempo.
            </p>
            <Btn bg={PINK} onClick={() => go("sobre")}>Sobre nós</Btn>
          </div>
          <div style={{ position: "relative" }}>
            <svg viewBox="0 0 200 200" style={{ position: "absolute", right: -24, top: -30, width: 90 }} aria-hidden>
              <path d="M20 100a55 55 0 0 1 110 0" fill="none" stroke={CYAN} strokeWidth={7} strokeLinecap="round" />
              <path d="M45 100a30 30 0 0 1 60 0" fill="none" stroke={PINK} strokeWidth={7} strokeLinecap="round" />
              <path d="M150 130a25 25 0 0 1 40 15" fill="none" stroke={YELLOW} strokeWidth={7} strokeLinecap="round" />
            </svg>
            <Img src="/fono-hero.jpg" alt="Terapeuta brincando com menino em sala clara" k="hero" pos="50% 35%" style={{ aspectRatio: "4/3.6", borderRadius: 18 }} />
          </div>
        </div>
      </section>

      {/* como funciona */}
      <section style={{ background: CREAM, padding: "88px 48px" }}>
        <Kicker>O que fazemos</Kicker>
        <h2 style={{ fontFamily: display, fontWeight: 600, fontSize: "clamp(30px, 3vw, 42px)", textAlign: "center", margin: "0 0 60px", color: INK }}>Como funciona</h2>
        <div className="cf-steps" style={{ maxWidth: 1120, margin: "0 auto" }}>
          {passos.map((p, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ width: 108, height: 108, margin: "0 auto 22px", borderRadius: "50%", border: `2px dashed ${[PINK, CYAN, YELLOW][i]}`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <Ic k={p.ic} s={40} c={[PINK, CYAN, "#e0a91f"][i] ?? PINK} />
                <span style={{ position: "absolute", top: -6, right: -2 }}><Ic k="estrela" s={18} c={[PINK, CYAN, YELLOW][i] ?? PINK} w={1.6} /></span>
              </div>
              <h3 style={{ fontFamily: display, fontWeight: 600, fontSize: 21, margin: "0 0 10px", color: INK }}>{p.t}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: MUT, margin: 0, maxWidth: 300, marginLeft: "auto", marginRight: "auto" }}>{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* proximo nivel */}
      <section id="sobre" style={{ background: "#fff", padding: "96px 48px" }}>
        <div className="cf-nivel" style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ position: "relative", paddingBottom: 60 }}>
            <Img src="/fono-nivel1.jpg" alt="Menina sorrindo em atividade com terapeuta" k="n1" style={{ aspectRatio: "4/3", borderRadius: 18, width: "62%", marginLeft: "auto" }} />
            <Img src="/fono-nivel2.jpg" alt="Menino brincando com blocos em mesa" k="n2" style={{ aspectRatio: "4/3", borderRadius: 18, width: "58%", marginTop: -70, border: "8px solid #fff" }} />
            <div className="cf-hours" style={{ position: "absolute", left: 0, top: 30, background: PINK, color: "#fff", borderRadius: 14, padding: "20px 24px", boxShadow: "0 14px 30px rgba(242,82,126,.3)", zIndex: 2 }}>
              <p style={{ fontFamily: display, fontWeight: 600, fontSize: 17, margin: "0 0 10px" }}>Horários</p>
              {([["Seg – Sex", "8h às 19h"], ["Sábado", "8h às 13h"], ["Domingo", "fechado"]] as [string, string][]).map(([d, h]) => (
                <p key={d} style={{ display: "flex", justifyContent: "space-between", gap: 18, fontSize: 13, margin: "5px 0", opacity: .95 }}><span>{d}</span><span>{h}</span></p>
              ))}
            </div>
          </div>
          <div>
            <Kicker light={false}><span style={{ color: PINK }}>Sobre a clínica</span></Kicker>
            <h2 style={{ fontFamily: display, fontWeight: 600, fontSize: "clamp(28px, 2.8vw, 40px)", lineHeight: 1.2, margin: "0 0 20px", color: INK, textAlign: "left" }}>
              Fala &amp; linguagem pra criança subir de nível
            </h2>
            <div className="cf-tabs" style={{ display: "flex", gap: 6, margin: "0 0 18px" }}>
              <button style={{ background: PINK, color: "#fff" }}>Nossa visão</button>
              <button>Nossa missão</button>
              <button>Nosso jeito</button>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: MUT, margin: "0 0 14px" }}>
              Um mundo onde toda criança comunica o que sente e o que pensa. Trabalhamos com planos individuais, família por perto e metas claras a cada ciclo.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: MUT, margin: "0 0 30px" }}>
              Nada de sessões frias: aqui o aprendizado acontece no tapete, na mesa de jogos e no parquinho, com ciência por trás de cada brincadeira.
            </p>
            <Btn bg={CYAN} onClick={() => window.open(wa(`Olá, ${brand}! Quero conhecer a clínica.`), "_blank")}>Conhecer a clínica</Btn>
          </div>
        </div>
      </section>

      {/* faixa especialidades */}
      <div style={{ background: "#fff" }}><Scallop fill={INDIGO} /></div>
      <section style={{ background: INDIGO, padding: "64px 48px 76px" }}>
        <Kicker light>O que fazemos</Kicker>
        <h2 style={{ fontFamily: display, fontWeight: 600, fontSize: "clamp(28px, 2.8vw, 40px)", textAlign: "center", margin: "0 0 54px", color: "#fff" }}>Como ajudamos</h2>
        <div className="cf-espec" style={{ maxWidth: 1180, margin: "0 auto" }}>
          {especialidades.map((e, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ width: 92, height: 92, margin: "0 auto 16px", borderRadius: "50%", background: "rgba(255,255,255,.09)", border: "2px dashed rgba(255,255,255,.45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Ic k={e.ic} s={36} c={[CYAN, YELLOW, "#7ee0c3", PINK, "#b9baf0"][i] ?? CYAN} />
              </div>
              <p style={{ fontFamily: display, fontWeight: 500, fontSize: 15.5, color: "#fff", margin: 0, lineHeight: 1.35 }}>{e.t}</p>
            </div>
          ))}
        </div>
      </section>
      <div style={{ background: "#fff" }}><Scallop fill={INDIGO} flip /></div>

      {/* cards terapia + agendamento */}
      <section id="servicos" style={{ background: "#fff", padding: "80px 48px 96px" }}>
        <Kicker>Terapias</Kicker>
        <h2 style={{ fontFamily: display, fontWeight: 600, fontSize: "clamp(28px, 2.8vw, 40px)", textAlign: "center", margin: "0 0 54px", color: INK }}>Acompanhamento de perto</h2>
        <div className="cf-cards" style={{ maxWidth: 1240, margin: "0 auto" }}>
          {[
            { img: "/fono-card1.jpg", t: "Terapia infantil", s: "Fonoaudiologia", alt: "Sessão de terapia com criança e brinquedos" },
            { img: "/fono-card2.jpg", t: "Equidade &amp; inclusão", s: "TDAH e TEA", alt: "Terapeuta com criança em atividade de fala" },
          ].map((c, i) => (
            <div key={i}>
              <Img src={c.img} alt={c.alt} k={`c${i}`} style={{ aspectRatio: "4/3.1", borderRadius: 16 }} />
              <h3 style={{ fontFamily: display, fontWeight: 600, fontSize: 21, margin: "18px 0 4px", color: INK }} dangerouslySetInnerHTML={{ __html: c.t }} />
              <p style={{ fontSize: 13.5, color: PINK, fontWeight: 600, margin: 0 }}>{c.s}</p>
            </div>
          ))}
          <div style={{ background: "#fff", border: "2px solid #eceaf2", borderRadius: 20, padding: "34px 30px", boxShadow: "0 18px 40px rgba(51,51,92,.09)", textAlign: "center" }}>
            <h3 style={{ fontFamily: display, fontWeight: 600, fontSize: 23, margin: "0 0 12px", color: INK }}>Agende uma avaliação</h3>
            <p style={{ fontSize: 14.5, lineHeight: 1.7, color: MUT, margin: "0 0 24px" }}>
              A primeira conversa é sem compromisso: contamos como funciona e entendemos o momento do seu filho.
            </p>
            <Btn bg={CYAN} onClick={() => window.open(wa(`Olá, ${brand}! Quero agendar uma avaliação para meu filho(a).`), "_blank")}>Chamar no WhatsApp</Btn>
            <p style={{ fontSize: 12.5, color: MUT, margin: "18px 0 0" }}>Respondemos em horário comercial</p>
          </div>
        </div>
      </section>

      {/* o que oferecemos */}
      <section style={{ background: CREAM, padding: "88px 48px" }}>
        <Kicker>Especialidades</Kicker>
        <h2 style={{ fontFamily: display, fontWeight: 600, fontSize: "clamp(28px, 2.8vw, 40px)", textAlign: "center", margin: "0 0 56px", color: INK }}>O que oferecemos</h2>
        <div className="cf-ofertas" style={{ maxWidth: 1120, margin: "0 auto" }}>
          {ofertas.map((o, i) => (
            <div key={i} style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
              <div style={{ width: 62, height: 62, flex: "0 0 62px", borderRadius: 18, background: "#fff", boxShadow: "0 8px 18px rgba(51,51,92,.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Ic k={o.ic} s={30} c={o.c} />
              </div>
              <div>
                <h3 style={{ fontFamily: display, fontWeight: 600, fontSize: 18.5, margin: "4px 0 8px", color: INK }}>{o.t}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.65, color: MUT, margin: 0 }}>Atendimento individual, com metas claras e devolutiva pra família a cada ciclo.</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* depoimentos */}
      <div style={{ background: CREAM }}><Scallop fill={PINK} /></div>
      <section id="depoimentos" style={{ background: PINK, padding: "64px 48px 90px" }}>
        <Kicker light><span style={{ color: "#ffd3e0" }}>Depoimentos</span></Kicker>
        <h2 style={{ fontFamily: display, fontWeight: 600, fontSize: "clamp(28px, 2.8vw, 40px)", textAlign: "center", margin: "0 0 60px", color: "#fff" }}>O que os pais dizem</h2>
        <div className="cf-deps" style={{ maxWidth: 1120, margin: "0 auto" }}>
          {depoimentos.map((d, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ width: 96, height: 96, margin: "0 auto 18px", borderRadius: "50%", border: "3px solid rgba(255,255,255,.7)", padding: 4 }}>
                <Img src={d.img} alt={`Foto de ${d.n}`} k={`a${i}`} style={{ width: "100%", height: "100%", borderRadius: "50%" }} />
              </div>
              <p style={{ fontFamily: display, fontWeight: 600, fontSize: 18, color: "#fff", margin: "0 0 4px" }}>{d.n}</p>
              <p style={{ fontSize: 12, color: "#ffd3e0", textTransform: "uppercase", letterSpacing: 1.5, margin: "0 0 14px" }}>Família atendida</p>
              <p style={{ fontSize: 14.5, lineHeight: 1.75, color: "rgba(255,255,255,.92)", margin: 0, fontStyle: "italic" }}>&ldquo;{d.q}&rdquo;</p>
            </div>
          ))}
        </div>
      </section>
      <div style={{ background: INDIGOD }}><Scallop fill={PINK} flip /></div>

      {/* footer */}
      <footer id="contato" style={{ background: INDIGOD, padding: "56px 48px 36px", color: "#fff" }}>
        <div className="cf-foot-grid" style={{ maxWidth: 1180, margin: "0 auto 44px" }}>
          <div>
            <span style={{ fontFamily: display, fontWeight: 700, fontSize: 25 }}><span style={{ color: PINK }}>Crescer</span> &amp; Falar</span>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#b9baf0", margin: "14px 0 22px", maxWidth: 320 }}>
              Clínica infantil de fonoaudiologia e terapias integradas em {city}. Aqui cada criança é recebida pelo que ela tem de melhor.
            </p>
            <Btn bg={PINK} onClick={() => window.open(wa(`Olá, ${brand}! Vim pelo site e quero conversar.`), "_blank")}>Fale conosco</Btn>
          </div>
          <div>
            <p style={{ fontFamily: display, fontWeight: 600, fontSize: 17, margin: "0 0 16px" }}>Links úteis</p>
            {([["Início", "inicio"], ["Serviços", "servicos"], ["Sobre", "sobre"], ["Depoimentos", "depoimentos"]] as [string, string][]).map(([t, id]) => (
              <p key={id} style={{ margin: "8px 0" }}><a href={`#${id}`} onClick={(e) => { e.preventDefault(); go(id); }} style={{ color: "#b9baf0", textDecoration: "none", fontSize: 14 }}>{t}</a></p>
            ))}
          </div>
          <div>
            <p style={{ fontFamily: display, fontWeight: 600, fontSize: 17, margin: "0 0 16px" }}>Horários</p>
            {([["Seg – Sex", "8h às 19h"], ["Sábado", "8h às 13h"], ["Domingo", "fechado"]] as [string, string][]).map(([d, h]) => (
              <p key={d} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#b9baf0", margin: "8px 0", maxWidth: 260 }}><span>{d}</span><span>{h}</span></p>
            ))}
          </div>
        </div>
        <p style={{ textAlign: "center", fontSize: 12.5, color: "#b9baf0", borderTop: "1px solid rgba(255,255,255,.14)", paddingTop: 26, margin: 0 }}>
          © {new Date().getFullYear()} {brand} · Clínica infantil · {city}
        </p>
      </footer>
    </div>
  );
}
