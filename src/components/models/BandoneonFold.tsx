import { useEffect } from "react";

/** Escola de tango & milonga, construída do zero a partir de um pin de cartaz "Milonga Tango Argentino" (amarelo/preto/vermelho, grotesca condensada, pilha de data gigante, silhuetas planas de casal). Cartaz tipográfico sem fotos: o casal é SVG plano desenhado em código. */
const YEL = "#f2c200", YELL = "#ffd83d", BLK = "#151412", RED = "#c8102e", RED2 = "#b00e2a", CREAM = "#faf3e3", CREAM2 = "#f1e6cc", WHITE = "#fffdf6", GR = "#4f4639";
const AULAS = [
  { n: "01", t: "Tango", d: "A base: abraço, caminhada e oitos. Técnica e musicalidade desde o primeiro passo.", tag: "Salão", bg: BLK, fg: CREAM },
  { n: "02", t: "Milonga", d: "O ritmo rápido e brincalhão que lota a pista de sexta. Traspie, contratempo e swing.", tag: "Pista", bg: RED, fg: CREAM },
  { n: "03", t: "Vals criollo", d: "O 3/4 rodado do tango: giros fluidos, cadenas e a leveza de dançar flutuando.", tag: "Roda", bg: YEL, fg: BLK },
];
const SEXTA = [
  { h: "20h00", n: "Aula aberta de tango", niv: "Todos os níveis" },
  { h: "21h00", n: "Prática guiada", niv: "Com professores" },
  { h: "22h00", n: "Milonga até 1h", niv: "Entrada franca" },
];
const PASSOS = [
  { n: "01", t: "Chega como está", d: "Sem par, sem roupa especial, sem pré-requisito. A primeira aula é de graça e a gente apresenta todo mundo." },
  { n: "02", t: "Aprende caminhando", d: "O tango se aprende andando. Em 8 aulas você já dança uma tanda inteira com segurança." },
  { n: "03", t: "Dança de verdade", d: "Sexta é noite de milonga: pista aberta, DJ da casa e a comunidade inteira junta." },
];
const PLANOS = [
  { n: "Entrada franca", p: "Grátis", per: "primeira aula", feats: ["Aula aberta de sexta", "Sem pré-requisito", "Apresentamos os pares na hora"], cta: "Reservar grátis" },
  { n: "2x por semana", p: "R$ 189", per: "/mês", feats: ["8 aulas por mês", "Tango, milonga e vals", "Prática de sexta inclusa", "Grupo de alunos no WhatsApp"], cta: "Assinar 2x", hot: true },
  { n: "Livre", p: "R$ 259", per: "/mês", feats: ["Aulas ilimitadas", "Milongas da casa inclusas", "10% em workshops", "Acompanhamento de evolução"], cta: "Assinar livre" },
];
const TESTI = [
  { n: "Paulo Andrade", r: "Aluno há 1 ano", t: "Entrei sem saber dar um passo e com vergonha de tentar. Seis meses depois, sexta-feira é o melhor dia da minha semana." },
  { n: "Cecília Moraes", r: "Aluna há 8 meses", t: "Os professores ensinam o abraço antes do passo, e isso muda tudo. A pista da Bandoneón virou minha segunda casa." },
  { n: "Ricardo Tavares", r: "Aluno há 2 anos", t: "Dancei tango em Buenos Aires ano passado e me virei bem graças à base que construí aqui. Nível de ensino absurdo." },
];
const CHECK = "M7 16l6 6L26 9";
const Ic = ({ d, s = 22, c = "currentColor" }: { d: string; s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);

/** Casal de tango em silhueta plana, estilo pictograma de cartaz: ele em preto, ela em vermelho, abraço fechado e perna estendida. */
const Casal = ({ w = 300, him = "#151412" }: { w?: number; him?: string }) => (
  <svg width={w} height={w * 1.42} viewBox="0 0 320 455" fill="none" aria-hidden>
    {/* ele */}
    <circle cx="138" cy="58" r="21" fill={him} />
    <path d="M140 82 L126 178" stroke={him} strokeWidth="30" strokeLinecap="round" />
    <path d="M136 98 L188 128" stroke={him} strokeWidth="22" strokeLinecap="round" />
    <path d="M132 100 L96 142" stroke={him} strokeWidth="22" strokeLinecap="round" />
    <path d="M126 178 L92 300 L80 372" stroke={him} strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M126 178 L170 268 L196 300" stroke={him} strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
    <ellipse cx="76" cy="380" rx="20" ry="9" fill={him} />
    <ellipse cx="204" cy="304" rx="20" ry="9" fill={him} />
    {/* ela */}
    <circle cx="192" cy="66" r="18" fill={RED} />
    <path d="M190 86 L176 152" stroke={RED} strokeWidth="24" strokeLinecap="round" />
    <path d="M186 100 L142 116" stroke={RED} strokeWidth="17" strokeLinecap="round" />
    <path d="M176 150 L138 262 L222 268 Z" fill={RED} />
    <path d="M200 262 L262 340" stroke={RED} strokeWidth="17" strokeLinecap="round" />
    <path d="M262 340 L284 336" stroke={RED} strokeWidth="10" strokeLinecap="round" />
    <path d="M162 264 L150 330" stroke={RED} strokeWidth="17" strokeLinecap="round" />
    <ellipse cx="148" cy="338" rx="16" ry="7" fill={RED} />
  </svg>
);

export function BandoneonFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Casa Bandoneón";
  const city = client?.city?.trim() || "São Paulo";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const wa = (m: string) => `https://wa.me/${phone || "5511999999999"}?text=${encodeURIComponent(m)}`;
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const display = "'Oswald', 'Arial Narrow', sans-serif";
  useEffect(() => {
    const l = document.createElement("link");
    l.href = "https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Barlow:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap";
    l.rel = "stylesheet"; document.head.appendChild(l);
  }, []);
  return (
    <div className="band" style={{ fontFamily: "'Barlow', system-ui, sans-serif", color: BLK, background: YEL, overflowX: "hidden" }}>
      <style>{`
        body{background:${BLK}}
        .band h1,.band h2,.band h3{font-family:${display}!important;font-weight:700;letter-spacing:.005em;text-decoration:none!important;text-transform:uppercase;line-height:.95}
        .band blockquote,.band figure{margin:0}
        .band .wrap{max-width:1140px;margin:0 auto;padding:0 28px}
        .band .btn{display:inline-flex;align-items:center;gap:10px;background:${RED};color:${CREAM};font-family:${display};font-weight:600;font-size:15px;letter-spacing:.06em;text-transform:uppercase;padding:16px 30px;text-decoration:none;border:none;cursor:pointer;transition:.25s;box-shadow:6px 6px 0 ${BLK}}
        .band .btn:hover{background:${BLK};color:${YEL};transform:translate(-2px,-2px);box-shadow:8px 8px 0 ${RED}}
        .band .btn-o{display:inline-flex;align-items:center;gap:10px;background:none;color:${BLK};border:3px solid ${BLK};font-family:${display};font-weight:600;font-size:14px;letter-spacing:.06em;text-transform:uppercase;padding:13px 26px;cursor:pointer;transition:.25s;text-decoration:none}
        .band .btn-o:hover{background:${BLK};color:${YEL}}
        .band .eyebrow{display:inline-flex;align-items:center;gap:12px;font-family:${display};font-weight:600;font-size:13px;letter-spacing:3px;text-transform:uppercase}
        .band .eyebrow::before{content:"";width:34px;height:4px;background:currentColor}
        .band .hov{transition:transform .25s,box-shadow .25s}
        .band .hov:hover{transform:translate(-3px,-3px)}
        .band .vtext{writing-mode:vertical-rl;letter-spacing:5px;font-family:${display};font-size:12px;text-transform:uppercase;font-weight:600}
        @media (max-width:900px){
          .band .hero-g{grid-template-columns:1fr!important}
          .band .desk-nav{display:none!important}
          .band .vtext{display:none!important}
          .band .hdr-cta-full{display:none!important}
          .band .hdr-cta-short{display:inline!important}
          .band .sexta-row{flex-wrap:wrap!important;row-gap:4px!important}
          .band .sexta-niv{margin-left:0!important;flex-basis:100%!important;text-align:left!important}
          .band .hero-date{left:12px!important;top:14px!important}
          .band .hero-date div{font-size:34px!important}
          .band .hero-couple{justify-content:flex-end!important}
        }
      `}</style>

      {/* header */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(21,20,18,.96)", borderBottom: `4px solid ${YEL}` }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 28px" }}>
          <span style={{ fontFamily: display, fontWeight: 700, fontSize: 22, color: CREAM, textTransform: "uppercase", letterSpacing: 1 }}>{brand}<span style={{ color: RED }}>.</span></span>
          <nav style={{ display: "flex", gap: 28, fontFamily: display, fontSize: 13, fontWeight: 500, letterSpacing: 2, textTransform: "uppercase", color: CREAM }} className="desk-nav">
            {[["Aulas", "aulas"], ["Sexta", "sexta"], ["Como começar", "comecar"], ["Planos", "planos"]].map(([n, id]) => <a key={n} onClick={() => go(id ?? "")} style={{ cursor: "pointer" }}>{n}</a>)}
          </nav>
          <a href={wa("Olá! Quero reservar minha primeira aula grátis na " + brand + ".")} className="btn" style={{ padding: "12px 22px", fontSize: 13, boxShadow: `4px 4px 0 ${YEL}` }}><span className="hdr-cta-full">Primeira aula grátis</span><span className="hdr-cta-short" style={{ display: "none" }}>Aula grátis</span></a>
        </div>
      </header>

      {/* hero */}
      <section style={{ position: "relative", padding: "76px 0 0", background: `linear-gradient(160deg, ${YELL} 0%, ${YEL} 55%, #e8b400 100%)`, overflow: "hidden" }}>
        <span className="vtext" style={{ position: "absolute", right: 18, top: "46%", transform: "translateY(-50%)", color: "rgba(21,20,18,.55)" }}>tango · milonga · vals</span>
        <div className="wrap hero-g" style={{ position: "relative", display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: 40, alignItems: "end" }}>
          <div style={{ paddingBottom: 84 }}>
            <span className="eyebrow" style={{ color: BLK }}>Escola de tango & milonga · {city}</span>
            <h1 style={{ fontSize: "clamp(84px, 9.5vw, 150px)", margin: "20px 0 0", color: BLK }}>Tango</h1>
            <h1 style={{ fontSize: "clamp(84px, 9.5vw, 150px)", margin: "-8px 0 0", color: RED2 }}>Milonga</h1>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: "rgba(21,20,18,.85)", maxWidth: 460, margin: "26px 0 0", fontWeight: 500 }}>
              Aula de tango de verdade, do abraço à pista. Turmas pequenas, professores de palco e a milonga de sexta com entrada franca para alunos.
            </p>
            <div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
              <a className="btn" href={wa("Olá! Quero reservar minha primeira aula grátis na " + brand + ".")}>Entrada franca na 1ª aula →</a>
              <a className="btn-o" onClick={() => go("aulas")}>Ver aulas →</a>
            </div>
            <div style={{ display: "flex", gap: 26, marginTop: 34, flexWrap: "wrap", fontFamily: display, fontWeight: 600, fontSize: 14, letterSpacing: 1.5, textTransform: "uppercase", color: BLK }}>
              <span>✦ Turmas de até 10 pares</span>
              <span>✦ Sem pré-requisito</span>
              <span>✦ Sem precisar de par</span>
            </div>
          </div>
          <div className="hero-couple" style={{ position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
            <div style={{ position: "absolute", inset: "6% -6% 0 18%", background: BLK, clipPath: "polygon(28% 0, 100% 0, 100% 100%, 0 100%)" }} />
            <div style={{ position: "relative", padding: "40px 20px 0", filter: "drop-shadow(0 18px 24px rgba(21,20,18,.3))" }}>
              <Casal w={310} him={YEL} />
            </div>
            <div className="hero-date" style={{ position: "absolute", left: 26, top: 30, color: CREAM }}>
              <div style={{ fontFamily: display, fontWeight: 700, fontSize: 88, lineHeight: .92, color: CREAM }}>TODA</div>
              <div style={{ fontFamily: display, fontWeight: 700, fontSize: 88, lineHeight: .92, color: CREAM }}>SEXTA</div>
              <div style={{ fontFamily: display, fontWeight: 700, fontSize: 88, lineHeight: .92, color: CREAM }}>21H</div>
            </div>
          </div>
        </div>
        <div style={{ background: BLK, color: CREAM, marginTop: 0 }}>
          <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14, flexWrap: "wrap", padding: "14px 28px", fontFamily: display, fontWeight: 500, fontSize: 13.5, letterSpacing: 2, textTransform: "uppercase" }}>
            <span style={{ display: "inline-flex", gap: 10, flexWrap: "wrap" }}><span>Rua Augusta, 1240 · Consolação</span><span>{city}</span></span>
            <span style={{ color: YEL }}>Milonga de sexta: aula 20h · pista 22h</span>
          </div>
        </div>
      </section>

      {/* aulas */}
      <section id="aulas" style={{ padding: "88px 0", background: CREAM }}>
        <div className="wrap">
          <span className="eyebrow" style={{ color: RED }}>Aulas</span>
          <h2 style={{ fontSize: "clamp(44px, 5.5vw, 76px)", margin: "16px 0 8px", color: BLK }}>Uma pista, três ritmos</h2>
          <p style={{ fontSize: 16.5, color: GR, maxWidth: 560, margin: "0 0 44px", fontWeight: 500 }}>O tango é a base, a milonga é a festa e o vals é a leveza. Você aprende os três no mesmo pacote.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px,100%), 1fr))", gap: 22 }}>
            {AULAS.map((a) => (
              <article key={a.t} className="hov" style={{ background: a.bg, color: a.fg, padding: "30px 28px", boxShadow: `8px 8px 0 ${a.bg === BLK ? RED : BLK}`, height: "100%" }}>
                <div style={{ fontFamily: display, fontWeight: 700, fontSize: 15, letterSpacing: 2, color: a.bg === YEL ? BLK : YEL }}>{a.n}</div>
                <h3 style={{ fontSize: 34, margin: "12px 0 10px", color: a.fg }}>{a.t}</h3>
                <p style={{ fontSize: 15.5, lineHeight: 1.55, margin: 0, opacity: .92, fontWeight: 500 }}>{a.d}</p>
                <div style={{ marginTop: 22, fontFamily: display, fontWeight: 600, fontSize: 12.5, letterSpacing: 2.5, textTransform: "uppercase", color: a.bg === YEL ? BLK : YEL }}>{a.tag} →</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* noite de sexta */}
      <section id="sexta" style={{ padding: "88px 0", background: BLK, position: "relative", overflow: "hidden" }}>
        <span className="vtext" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "rgba(250,243,227,.35)" }}>pista aberta</span>
        <div className="wrap">
          <span className="eyebrow" style={{ color: YEL }}>Toda sexta-feira</span>
          <h2 style={{ fontSize: "clamp(44px, 5.5vw, 76px)", margin: "16px 0 8px", color: YEL }}>Noite de milonga</h2>
          <p style={{ fontSize: 16.5, color: "rgba(250,243,227,.8)", maxWidth: 560, margin: "0 0 44px", fontWeight: 500 }}>Aula, prática e pista na mesma noite. Alunos entram de graça em tudo.</p>
          <div>
            {SEXTA.map((s) => (
              <div key={s.h} className="sexta-row" style={{ display: "flex", gap: 22, alignItems: "baseline", padding: "20px 4px", borderTop: `2px solid rgba(250,243,227,.35)` }}>
                <span style={{ fontFamily: display, fontWeight: 700, fontSize: 34, color: YEL, minWidth: 120 }}>{s.h}</span>
                <span style={{ fontFamily: display, fontWeight: 600, fontSize: 20, color: CREAM, textTransform: "uppercase", letterSpacing: 1 }}>{s.n}</span>
                <span className="sexta-niv" style={{ fontSize: 13, fontWeight: 600, color: YEL, letterSpacing: 2, textTransform: "uppercase", marginLeft: "auto", textAlign: "right" }}>{s.niv}</span>
              </div>
            ))}
            <div style={{ borderTop: `2px solid rgba(250,243,227,.35)` }} />
          </div>
          <p style={{ marginTop: 26, fontSize: 15, color: "rgba(250,243,227,.75)", fontWeight: 500 }}>Visitantes são bem-vindos na milonga das 22h: <a style={{ color: YELL, fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 3 }} href={wa("Olá! Quero conhecer a milonga de sexta na " + brand + ".")}>chama no WhatsApp</a>.</p>
        </div>
      </section>

      {/* como começar */}
      <section id="comecar" style={{ padding: "88px 0", background: YEL }}>
        <div className="wrap">
          <span className="eyebrow" style={{ color: BLK }}>Do zero à primeira tanda</span>
          <h2 style={{ fontSize: "clamp(44px, 5.5vw, 76px)", margin: "16px 0 44px", color: BLK }}>Comece de onde você está</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px,100%), 1fr))", gap: 22 }}>
            {PASSOS.map((p) => (
              <div key={p.n} style={{ border: `3px solid ${BLK}`, padding: "28px 26px", background: "transparent", height: "100%" }}>
                <div style={{ fontFamily: display, fontWeight: 700, fontSize: 44, color: RED2 }}>{p.n}</div>
                <h3 style={{ fontSize: 26, margin: "10px 0 8px", color: BLK }}>{p.t}</h3>
                <p style={{ fontSize: 15.5, lineHeight: 1.55, margin: 0, color: "rgba(21,20,18,.85)", fontWeight: 500 }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* planos */}
      <section id="planos" style={{ padding: "88px 0", background: CREAM }}>
        <div className="wrap">
          <span className="eyebrow" style={{ color: RED }}>Planos</span>
          <h2 style={{ fontSize: "clamp(44px, 5.5vw, 76px)", margin: "16px 0 44px", color: BLK }}>Primeira aula por nossa conta</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px,100%), 1fr))", gap: 22, alignItems: "stretch" }}>
            {PLANOS.map((p) => (
              <article key={p.n} className="hov" style={{ position: "relative", background: p.hot ? BLK : WHITE, color: p.hot ? CREAM : BLK, padding: "32px 30px", border: `3px solid ${BLK}`, boxShadow: p.hot ? `10px 10px 0 ${RED}` : `10px 10px 0 ${YEL}`, display: "flex", flexDirection: "column", height: "100%" }}>
                {p.hot && <span style={{ position: "absolute", top: -15, left: "50%", transform: "translateX(-50%)", background: RED, color: CREAM, fontFamily: display, fontWeight: 600, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", padding: "6px 16px" }}>Mais escolhido</span>}
                <h3 style={{ fontSize: 22, margin: 0, color: p.hot ? YEL : BLK }}>{p.n}</h3>
                <div style={{ margin: "16px 0 4px" }}>
                  <span style={{ fontFamily: display, fontWeight: 700, fontSize: 56, color: RED }}>{p.p}</span>
                  <span style={{ fontSize: 14.5, fontWeight: 600, color: p.hot ? "rgba(250,243,227,.7)" : GR, marginLeft: 8 }}>{p.per}</span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: "18px 0 26px", display: "grid", gap: 10, flex: 1 }}>
                  {p.feats.map((f) => <li key={f} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 15, fontWeight: 500 }}><Ic d={CHECK} s={15} c={p.hot ? YEL : RED} />{f}</li>)}
                </ul>
                <a href={wa("Olá! Quero " + (p.p === "Grátis" ? "reservar minha primeira aula grátis" : "assinar o plano " + p.n) + " na " + brand + ".")} className="btn" style={{ justifyContent: "center", background: p.hot ? RED : BLK, color: CREAM, boxShadow: "none" }}>{p.cta}</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* depoimentos */}
      <section style={{ padding: "88px 0", background: CREAM2 }}>
        <div className="wrap">
          <span className="eyebrow" style={{ color: RED }}>Da pista</span>
          <h2 style={{ fontSize: "clamp(44px, 5.5vw, 76px)", margin: "16px 0 44px", color: BLK }}>Quem dança com a gente</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px,100%), 1fr))", gap: 22 }}>
            {TESTI.map((t) => (
              <figure key={t.n} className="hov" style={{ background: WHITE, border: `3px solid ${BLK}`, padding: "28px 26px", height: "100%" }}>
                <div style={{ fontFamily: display, fontWeight: 700, fontSize: 30, color: RED, lineHeight: 1 }}>“</div>
                <blockquote style={{ fontSize: 15.5, lineHeight: 1.6, color: BLK, margin: "6px 0 20px", fontWeight: 500 }}>{t.t}</blockquote>
                <figcaption style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ width: 40, height: 40, background: YEL, border: `3px solid ${BLK}`, display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: display, fontWeight: 700, fontSize: 16, color: BLK }}>{t.n.split(" ").map((x) => x[0]).slice(0, 2).join("")}</span>
                  <span>
                    <span style={{ display: "block", fontFamily: display, fontWeight: 600, fontSize: 15, color: BLK, textTransform: "uppercase", letterSpacing: 1 }}>{t.n}</span>
                    <span style={{ display: "block", fontSize: 13, color: GR, fontWeight: 500 }}>{t.r}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section style={{ padding: "96px 0", background: RED, textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div className="wrap">
          <h2 style={{ fontSize: "clamp(46px, 6vw, 84px)", color: CREAM, margin: 0 }}>Sua primeira milonga<br />é <span style={{ color: YEL }}>por nossa conta.</span></h2>
          <p style={{ fontSize: 16.5, color: "rgba(250,243,227,.9)", maxWidth: 520, margin: "22px auto 0", fontWeight: 500 }}>Sexta, 20h, na Rua Augusta. Roupa confortável, vontade de dançar e nada mais.</p>
          <a className="btn" href={wa("Olá! Quero minha primeira aula grátis na " + brand + ".")} style={{ marginTop: 34, background: BLK, color: YEL, boxShadow: `6px 6px 0 rgba(21,20,18,.35)` }}>Quero minha aula grátis →</a>
        </div>
      </section>

      {/* footer */}
      <footer style={{ background: BLK, color: CREAM, padding: "26px 0", borderTop: `4px solid ${YEL}` }}>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <span style={{ fontFamily: display, fontWeight: 700, fontSize: 18, textTransform: "uppercase", letterSpacing: 1 }}>{brand}<span style={{ color: RED }}>.</span></span>
          <span style={{ fontFamily: display, fontSize: 13, fontWeight: 500, letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(250,243,227,.88)" }}>{city} · Tango & Milonga</span>
        </div>
      </footer>
    </div>
  );
}
