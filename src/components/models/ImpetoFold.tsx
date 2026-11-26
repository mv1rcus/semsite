import { useEffect } from "react";

/** Estúdio de pole dance e dança, construído do zero a partir de um pin de schedule tipográfico verde-água e rosa (condensada pesada + script, estrelas sparkle, filetes). Grade de horários como artefato central, sem fotos. */
const TEAL = "#15a08c", TEALD = "#0e7d6d", PINK = "#e7549b", PINKL = "#f492c2", NAVY = "#123a4e", CREAM = "#fbf6ec", CREAM2 = "#f3ead7", WHITE = "#fffdf8", GR = "#4a5c66";
const GRADE = [
  { d: "SEG", full: "Segunda", classes: [ { h: "19h00", n: "Pole Sport", niv: "Iniciante" }, { h: "20h15", n: "Exotic Flow", niv: "Todos os níveis" } ] },
  { d: "QUA", full: "Quarta", classes: [ { h: "18h30", n: "Tricks & Combos", niv: "Inter/Avançado" }, { h: "19h45", n: "Slow & Sensual", niv: "Todos os níveis" } ] },
  { d: "SEX", full: "Sexta", classes: [ { h: "19h00", n: "Pole Sport", niv: "Intermediário" }, { h: "20h15", n: "Flexibilidade", niv: "Todos os níveis" } ] },
  { d: "SÁB", full: "Sábado", classes: [ { h: "10h00", n: "Condicionamento", niv: "Todos os níveis" }, { h: "11h15", n: "Aula aberta", niv: "Livre" } ] },
];
const AULAS = [
  { t: "Pole Sport", d: "Força, giros e figuras no pole estático e giratório. A base técnica de tudo.", tag: "Técnica", bg: "#e3f2ee", i: "M16 4v24M10 10l6-6 6 6M10 22l6 6 6-6" },
  { t: "Exotic Flow", d: "Coreografia fluida com salto opcional: ondas, transições de chão e presença de palco.", tag: "Coreografia", bg: "#fbe9f1", i: "M6 20c4-8 8-8 10-4s6 4 10-4" },
  { t: "Slow & Sensual", d: "Movimento lento e consciente para destravar o corpo e a autoconfiança.", tag: "Expressão", bg: "#e9eef7", i: "M16 26s-9-6.5-9-13a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.5-9 13-9 13z" },
  { t: "Flexibilidade", d: "Mobilidade ativa e alongamento profundo para conquistar amplitude com segurança.", tag: "Mobilidade", bg: "#fdf3e3", i: "M8 24c4-2 5-5 5-8s2-5 5-6 5-3 6-6" },
];
const NIVEIS = [
  { n: "01", t: "Iniciante", d: "Nunca encostou num pole? Perfeito. Força e coordenação se constroem do zero, sem pré-requisito." },
  { n: "02", t: "Intermediário", d: "Inversões, combinações e as primeiras figuras no giratório. O vício começa aqui." },
  { n: "03", t: "Avançado", d: "Combos dinâmicos, drops e linhas estáticas. Preparação para competições, se você quiser." },
];
const PLANOS = [
  { n: "Experimental", p: "Grátis", per: "primeira aula", feats: ["Qualquer aula da grade", "Sem pré-requisito", "Roupão e toalha por nossa conta"], cta: "Agendar grátis" },
  { n: "2x por semana", p: "R$ 219", per: "/mês", feats: ["8 aulas por mês", "Todas as modalidades", "Aula de reposição", "Grupo de alunas no WhatsApp"], cta: "Assinar 2x", hot: true },
  { n: "Livre", p: "R$ 289", per: "/mês", feats: ["Aulas ilimitadas", "Aula aberta de sábado", "10% em workshops", "Acompanhamento de evolução"], cta: "Assinar livre" },
];
const TESTI = [
  { n: "Aline Ribeiro", r: "Aluna há 8 meses", t: "Cheguei sem força nenhuma nos braços e morrendo de vergonha. Hoje faço inversão e o estúdio é meu lugar favorito no mundo." },
  { n: "Débora Sales", r: "Aluna há 1 ano", t: "O Slow & Sensual mudou minha relação com o meu corpo. Não é só aula, é terapia em movimento." },
  { n: "Carol Nogueira", r: "Aluna há 2 anos", t: "As professoras corrigem cada detalhe com carinho e segurança. Evoluí mais aqui em um ano do que em três de academia." },
];
const CHECK = "M7 16l6 6L26 9";
const SPARK = "M16 2c1.5 7 4 10 14 12-10 2-12.5 5-14 12-1.5-7-4-10-14-12 10-2 12.5-5 14-12z";
const Ic = ({ d, s = 22, c = "currentColor" }: { d: string; s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);
const Spark = ({ s = 18, c = PINK }: { s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" fill={c} aria-hidden><path d={SPARK} /></svg>
);

export function ImpetoFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Estúdio Ímpeto";
  const city = client?.city?.trim() || "Fortaleza";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const wa = (m: string) => `https://wa.me/${phone || "5585999999999"}?text=${encodeURIComponent(m)}`;
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const display = "'Anton', 'Arial Narrow', sans-serif";
  const script = "'Ms Madi', cursive";
  useEffect(() => {
    const l = document.createElement("link");
    l.href = "https://fonts.googleapis.com/css2?family=Anton&family=Ms+Madi&family=Work+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap";
    l.rel = "stylesheet"; document.head.appendChild(l);
  }, []);
  return (
    <div className="imp" style={{ fontFamily: "'Work Sans', system-ui, sans-serif", color: NAVY, background: TEAL, overflowX: "hidden" }}>
      <style>{`
        body{background:${TEAL}}
        .imp h1,.imp h2,.imp h3{font-family:${display}!important;font-weight:400;letter-spacing:.01em;text-decoration:none!important;text-transform:uppercase}
        .imp blockquote,.imp figure{margin:0}
        .imp .wrap{max-width:1140px;margin:0 auto;padding:0 28px}
        .imp .btn{display:inline-flex;align-items:center;gap:10px;background:${PINK};color:${WHITE};font-weight:600;font-size:14.5px;letter-spacing:.05em;text-transform:uppercase;padding:16px 30px;border-radius:999px;text-decoration:none;border:none;cursor:pointer;transition:.25s;box-shadow:0 10px 26px -14px rgba(18,58,78,.55)}
        .imp .btn:hover{background:${PINKL};transform:translateY(-2px)}
        .imp .btn-o{display:inline-flex;align-items:center;gap:10px;background:none;color:${WHITE};border:2px solid rgba(255,255,255,.85);font-weight:600;font-size:14px;letter-spacing:.05em;text-transform:uppercase;padding:14px 28px;border-radius:999px;cursor:pointer;transition:.25s;text-decoration:none}
        .imp .btn-o:hover{background:rgba(255,255,255,.14)}
        .imp .eyebrow{display:inline-flex;align-items:center;gap:12px;color:${WHITE};font-weight:600;font-size:12.5px;letter-spacing:3px;text-transform:uppercase}
        .imp .hov{transition:transform .25s,box-shadow .25s}
        .imp .hov:hover{transform:translateY(-4px);box-shadow:0 20px 44px -26px rgba(18,58,78,.5)}
        .imp .vtext{writing-mode:vertical-rl;letter-spacing:4px;font-size:13px;text-transform:uppercase;color:rgba(255,255,255,.95);font-weight:700}
        @media (max-width:900px){
          .imp .hero-g{grid-template-columns:1fr!important}
          .imp .desk-nav{display:none!important}
          .imp .vtext{display:none!important}
          .imp .sched-day{font-size:44px!important}
          .imp .sched-row{flex-wrap:wrap;gap:16px!important}
          .imp .sched-row .sched-day{min-width:0!important}
          .imp .sched-row>span[style*="flex: 1"]{flex-basis:100%!important}
          .imp .sched-cls{flex-wrap:wrap!important;row-gap:4px!important}
          .imp .sched-niv{margin-left:0!important;flex-basis:100%!important;text-align:left!important}
          .imp .hdr-cta-full{display:none!important}
          .imp .hdr-cta-short{display:inline!important}
        }
      `}</style>

      {/* header */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(21,160,140,.92)", backdropFilter: "blur(10px)", borderBottom: "2px solid rgba(255,255,255,.25)" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 28px" }}>
          <span style={{ fontFamily: script, fontSize: 34, color: WHITE, lineHeight: 1 }}>{brand}</span>
          <nav style={{ display: "flex", gap: 28, fontSize: 12.5, fontWeight: 600, letterSpacing: 2.2, textTransform: "uppercase", color: WHITE }} className="desk-nav">
            {[["Aulas", "aulas"], ["Horários", "horarios"], ["Níveis", "niveis"], ["Planos", "planos"]].map(([n, id]) => <a key={n} onClick={() => go(id ?? "")} style={{ cursor: "pointer" }}>{n}</a>)}
          </nav>
          <a href={wa("Olá! Quero agendar minha aula experimental gratuita no " + brand + ".")} className="btn" style={{ padding: "12px 22px", fontSize: 12.5 }}><span className="hdr-cta-full">Aula experimental grátis</span><span className="hdr-cta-short" style={{ display: "none" }}>Aula grátis</span></a>
        </div>
      </header>

      {/* hero */}
      <section style={{ position: "relative", padding: "88px 0 96px", background: `radial-gradient(900px 480px at 90% 0%, rgba(231,84,155,.28), transparent 60%), radial-gradient(700px 500px at 0% 100%, rgba(14,125,109,.7), transparent 60%), ${TEAL}`, overflow: "hidden" }}>
        <span className="vtext" style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)" }}>força · ritmo · confiança</span>
        <Spark s={26} c={PINKL} />
        <div className="wrap hero-g" style={{ position: "relative", display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 48, alignItems: "center" }}>
          <div>
            <span className="eyebrow" style={{ color: "#ffffff", fontWeight: 700 }}>Pole dance & dança · {city}</span>
            <h1 style={{ marginTop: 20, fontSize: "clamp(58px,8.5vw,116px)", lineHeight: .98, color: WHITE }}>
              SEU CORPO,<br /><span style={{ color: PINK }}>SEU</span> <span style={{ fontFamily: script, textTransform: "none", fontSize: ".92em", color: PINKL, letterSpacing: 0 }}>ritmo.</span>
            </h1>
            <p style={{ marginTop: 22, fontSize: 16.5, lineHeight: 1.75, color: "rgba(255,255,255,.92)", maxWidth: 480 }}>
              Aulas de pole dance, exotic flow e flexibilidade para todos os corpos e todos os níveis. Sem pré-requisito, sem julgamento: você chega como está e sai mais forte.
            </p>
            <div style={{ display: "flex", gap: 14, marginTop: 30, flexWrap: "wrap" }}>
              <a className="btn" href={wa("Olá! Quero agendar minha aula experimental gratuita no " + brand + ".")}>Começar com aula grátis →</a>
              <a className="btn-o" onClick={() => go("horarios")}>Ver horários →</a>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: "30px 0 0", display: "grid", gap: 10 }}>
              {["Turmas pequenas, no máximo 8 alunas", "Professoras certificadas e corpos reais", "Primeira aula gratuita, sem compromisso"].map((c) => (
                <li key={c} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14.5, color: WHITE }}><Ic d={CHECK} s={15} c={PINKL} />{c}</li>
              ))}
            </ul>
          </div>
          <div style={{ position: "relative", display: "grid", placeItems: "center", minHeight: 380 }}>
            <div style={{ position: "absolute", width: 330, height: 330, borderRadius: "50%", border: "2px dashed rgba(255,255,255,.5)" }} />
            <div style={{ position: "absolute", width: 240, height: 240, borderRadius: "50%", border: "2px solid rgba(231,84,155,.65)" }} />
            <div style={{ position: "relative", textAlign: "center" }}>
              <div style={{ fontFamily: display, fontSize: 92, color: WHITE, lineHeight: 1, textTransform: "uppercase" }}>Pole</div>
              <div style={{ fontFamily: script, fontSize: 58, color: PINKL, lineHeight: 1, marginTop: -6 }}>para todas</div>
              <div style={{ marginTop: 14, display: "inline-flex", alignItems: "center", gap: 10, background: NAVY, color: WHITE, borderRadius: 999, padding: "10px 20px", fontSize: 12.5, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" }}><Spark s={14} c={PINK} /> desde 2019 <Spark s={14} c={PINK} /></div>
            </div>
            <Spark s={22} c={WHITE} />
          </div>
        </div>
      </section>

      {/* horários — artefato no formato do pin */}
      <section id="horarios" style={{ padding: "84px 0", background: TEALD, position: "relative", overflow: "hidden" }}>
        <span className="vtext" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,.9)" }}>aulas toda semana</span>
        <div className="wrap">
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: display, fontSize: "clamp(46px,6vw,74px)", color: PINK, textTransform: "uppercase", lineHeight: 1 }}>Grade da semana</div>
            <div style={{ fontFamily: script, fontSize: 34, color: WHITE, marginTop: 8 }}>com as professoras da casa</div>
          </div>
          <div style={{ maxWidth: 860, margin: "42px auto 0" }}>
            {GRADE.map((g) => (
              <div key={g.d} className="sched-row" style={{ position: "relative", display: "flex", gap: 26, alignItems: "center", padding: "24px 6px", borderTop: "2px solid rgba(255,255,255,.75)" }}>
                <span style={{ position: "absolute", right: 22, top: -11, background: TEALD, padding: "0 8px", lineHeight: 1 }}><Spark s={14} c={PINK} /></span>
                <span className="sched-day" style={{ fontFamily: display, fontSize: 60, color: PINK, minWidth: 150, lineHeight: 1 }}>{g.d}<span style={{ display: "block", fontFamily: "'Work Sans',sans-serif", fontSize: 12.5, fontWeight: 600, letterSpacing: 2.5, color: WHITE, textTransform: "uppercase", marginTop: 6 }}>{g.full}</span></span>
                <Spark s={18} c={WHITE} />
                <span style={{ flex: 1, display: "grid", gap: 14 }}>
                  {g.classes.map((c) => (
                    <span key={c.h + c.n} className="sched-cls" style={{ display: "flex", alignItems: "baseline", gap: 14, borderLeft: "3px solid " + PINK, paddingLeft: 14 }}>
                      <span style={{ fontWeight: 700, fontSize: 15.5, color: WHITE, whiteSpace: "nowrap" }}>{c.h}</span>
                      <span style={{ fontWeight: 600, fontSize: 15.5, color: WHITE, textTransform: "uppercase", letterSpacing: 1 }}>{c.n}</span>
                      <span className="sched-niv" style={{ fontSize: 12.5, fontWeight: 600, color: "#ffffff", letterSpacing: 1.5, textTransform: "uppercase", marginLeft: "auto", textAlign: "right" }}>{c.niv}</span>
                    </span>
                  ))}
                </span>
              </div>
            ))}
            <div style={{ position: "relative", borderTop: "2px solid rgba(255,255,255,.75)" }}><span style={{ position: "absolute", right: 22, top: -11, background: TEALD, padding: "0 8px", lineHeight: 1 }}><Spark s={14} c={PINK} /></span></div>
          </div>
          <p style={{ textAlign: "center", marginTop: 26, color: WHITE, fontSize: 14.5 }}>Aulas particulares e turmas de level-up fora da grade: <a style={{ color: "#ffffff", fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 3 }} href={wa("Olá! Quero saber sobre aulas particulares no " + brand + ".")}>chama no WhatsApp</a>.</p>
        </div>
      </section>

      {/* aulas */}
      <section id="aulas" style={{ padding: "88px 0", background: CREAM }}>
        <div className="wrap">
          <span className="eyebrow" style={{ color: "#b81e68" }}>Modalidades</span>
          <h2 style={{ marginTop: 12, fontSize: "clamp(34px,4.4vw,56px)", color: NAVY }}>Uma aula para cada <span style={{ fontFamily: script, textTransform: "none", color: PINK, fontSize: "1.05em" }}>vontade</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20, marginTop: 40 }}>
            {AULAS.map((a) => (
              <article key={a.t} className="hov" style={{ background: a.bg, borderRadius: 22, padding: "28px 26px", border: `2px solid ${CREAM2}`, height: "100%" }}>
                <span style={{ width: 52, height: 52, borderRadius: "50%", background: WHITE, border: `2px solid ${PINK}`, display: "grid", placeItems: "center", marginBottom: 16 }}><Ic d={a.i} s={26} c={PINK} /></span>
                <h3 style={{ fontSize: 19, color: NAVY, marginBottom: 10 }}>{a.t}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: GR, marginBottom: 12 }}>{a.d}</p>
                <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: PINK }}>{a.tag}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* níveis */}
      <section id="niveis" style={{ padding: "84px 0", background: NAVY, color: CREAM }}>
        <div className="wrap">
          <div style={{ textAlign: "center" }}>
            <span className="eyebrow" style={{ color: PINKL }}>Do zero ao avançado</span>
            <h2 style={{ marginTop: 12, fontSize: "clamp(32px,4vw,52px)", color: WHITE }}>Comece de onde você está</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20, marginTop: 44 }}>
            {NIVEIS.map((n) => (
              <article key={n.n} style={{ background: "rgba(255,255,255,.06)", border: "1.5px solid rgba(255,255,255,.22)", borderRadius: 22, padding: "30px 28px", height: "100%" }}>
                <div style={{ fontFamily: display, fontSize: 36, color: PINK }}>{n.n}</div>
                <h3 style={{ fontSize: 20, color: WHITE, margin: "12px 0 10px" }}>{n.t}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: "rgba(251,246,236,.85)" }}>{n.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* planos */}
      <section id="planos" style={{ padding: "88px 0", background: CREAM }}>
        <div className="wrap">
          <div style={{ textAlign: "center" }}>
            <span className="eyebrow" style={{ color: "#b81e68" }}>Planos</span>
            <h2 style={{ marginTop: 12, fontSize: "clamp(34px,4.4vw,56px)", color: NAVY }}>Primeira aula por nossa conta</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: 20, marginTop: 44, alignItems: "stretch" }}>
            {PLANOS.map((p) => (
              <article key={p.n} className="hov" style={{ position: "relative", background: p.hot ? NAVY : WHITE, color: p.hot ? CREAM : NAVY, borderRadius: 24, padding: "32px 30px", border: p.hot ? "none" : `2px solid ${CREAM2}`, display: "flex", flexDirection: "column", height: "100%" }}>
                {p.hot && <span style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: PINK, color: WHITE, borderRadius: 999, padding: "6px 16px", fontSize: 11.5, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", whiteSpace: "nowrap" }}>Mais escolhido</span>}
                <h3 style={{ fontSize: 17, color: p.hot ? WHITE : NAVY }}>{p.n}</h3>
                <div style={{ margin: "14px 0 20px" }}>
                  <span style={{ fontFamily: display, fontSize: 44, color: p.hot ? PINKL : PINK }}>{p.p}</span>
                  <span style={{ fontSize: 13.5, color: p.hot ? "rgba(251,246,236,.75)" : GR, marginLeft: 8 }}>{p.per}</span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "grid", gap: 10, flex: 1 }}>
                  {p.feats.map((f) => <li key={f} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 14.5 }}><Ic d={CHECK} s={15} c={p.hot ? PINKL : TEAL} />{f}</li>)}
                </ul>
                <a href={wa("Olá! Quero o plano " + p.n + " no " + brand + ".")} className="btn" style={{ justifyContent: "center", background: p.hot ? PINK : NAVY }}>{p.cta}</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* depoimentos */}
      <section id="depoimentos" style={{ padding: "88px 0", background: CREAM2 }}>
        <div className="wrap">
          <span className="eyebrow" style={{ color: "#b81e68" }}>Alunas</span>
          <h2 style={{ marginTop: 12, fontSize: "clamp(34px,4.4vw,56px)", color: NAVY }}>Quem subiu no pole <span style={{ fontFamily: script, textTransform: "none", color: PINK, fontSize: "1.05em" }}>conta</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20, marginTop: 40 }}>
            {TESTI.map((t) => (
              <figure key={t.n} className="hov" style={{ background: WHITE, border: `2px solid ${CREAM2}`, borderRadius: 22, padding: "28px 28px", height: "100%" }}>
                <Spark s={20} c={PINK} />
                <blockquote style={{ fontSize: 15.5, lineHeight: 1.7, color: NAVY, margin: "12px 0 18px" }}>{t.t}</blockquote>
                <figcaption style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ width: 42, height: 42, borderRadius: "50%", background: TEAL, display: "grid", placeItems: "center", fontFamily: display, fontSize: 15, color: WHITE }}>{t.n.split(" ").map((x) => x[0]).join("")}</span>
                  <span>
                    <div style={{ fontSize: 14.5, fontWeight: 600, color: NAVY }}>{t.n}</div>
                    <div style={{ fontSize: 12.5, color: GR }}>{t.r}</div>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "96px 0", background: `radial-gradient(800px 400px at 50% 0%, rgba(231,84,155,.3), transparent 65%), ${TEAL}`, textAlign: "center" }}>
        <div className="wrap">
          <Spark s={26} c={WHITE} />
          <h2 style={{ marginTop: 16, fontSize: "clamp(42px,6vw,76px)", color: WHITE, lineHeight: 1 }}>Sua primeira aula é <span style={{ color: PINK }}>grátis.</span></h2>
          <p style={{ color: "rgba(255,255,255,.92)", fontSize: 16, marginTop: 14 }}>Escolhe um horário da grade e vem. Roupa confortável, vontade de se divertir e nada mais.</p>
          <a className="btn" href={wa("Olá! Quero minha primeira aula grátis no " + brand + ".")} style={{ marginTop: 28 }}>Quero minha aula grátis →</a>
        </div>
      </section>

      {/* footer */}
      <footer style={{ borderTop: "2px solid rgba(255,255,255,.25)", padding: "26px 0", background: NAVY }}>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <span style={{ fontFamily: script, fontSize: 26, color: WHITE }}>{brand}</span>
          <span style={{ fontSize: 12.5, letterSpacing: 2, textTransform: "uppercase", color: "rgba(251,246,236,.7)" }}>{city} · Pole dance & dança</span>
        </div>
      </footer>
    </div>
  );
}
