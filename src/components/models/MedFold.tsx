import { useEffect } from "react";

/** Estúdio de meditação e breathwork. Hero à risca do pin: aquarela de folhas ao fundo, wordmark serifada gigante, mockup de celular com a UI do app (sessões, respiração, progresso) e CTA em pílula sálvia. Semana experimental gratuita que fecha no WhatsApp. */
const CRM = "#f4f0e6", CRM2 = "#e7e0cd", DEEP = "#3c4d34", SAGE = "#8ba07a", SAGED = "#5c6f4e", INK = "#243020", GR = "#46523c", PEACH = "#d9a05b", WHITE = "#fffdf8";
const SESS = [
  { t: "Calma da Manhã", d: "Meditação guiada para começar o dia com foco e sem pressa.", m: "10 min", tag: "Guiada", bg: "#edf1e6", i: "M16 4a12 12 0 1 0 0 24 12 12 0 0 0 0-24zM16 10v6l4 4" },
  { t: "História para Dormir", d: "Narração suave com respiração lenta para desligar a mente à noite.", m: "20 min", tag: "Sono", bg: "#e9edf0", i: "M22 6a10 10 0 1 0 4 16A12 12 0 0 1 22 6z" },
  { t: "Foco Profundo", d: "Sessão de concentração para antes do trabalho ou do estudo.", m: "15 min", tag: "Foco", bg: "#f2ede0", i: "M16 6v4M16 22v4M6 16h4M22 16h4M16 13a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" },
  { t: "Pausa Consciente", d: "Micro-prática de 5 minutos para o meio da tarde.", m: "5 min", tag: "Express", bg: "#edf1e6", i: "M8 12h16M10 20h12M12 4h8" },
];
const BREATH = [
  { t: "Box Breathing 4·4·4·4", d: "Inspire, segure, expire e segure no mesmo compasso. Acalma o sistema nervoso em poucos ciclos.", steps: ["Inspire 4s", "Segure 4s", "Expire 4s", "Segure 4s"] },
  { t: "Respiração 4·7·8", d: "O clássico contra insônia e ansiedade: expiração longa que desacelera os batimentos.", steps: ["Inspire 4s", "Segure 7s", "Expire 8s"] },
];
const PLANOS = [
  { n: "Experimental", p: "Grátis", per: "primeira semana", feats: ["Todas as aulas ao vivo", "Biblioteca de sessões essenciais", "Grupo de apoio no WhatsApp"], cta: "Começar grátis" },
  { n: "Serena+", p: "R$ 49", per: "/mês", feats: ["Tudo do plano Experimental", "Sessões novas toda semana", "Trilhas de 21 dias com acompanhamento", "Sessão individual mensal"], cta: "Assinar Serena+", hot: true },
  { n: "Semestral", p: "R$ 240", per: "/semestre", feats: ["Tudo do Serena+", "2 meses de desconto", "Retiro online trimestral"], cta: "Plano semestral" },
];
const TESTI = [
  { n: "Camila Ferraz", r: "Insônia há 3 anos", t: "A História para Dormir virou ritual. Em duas semanas eu pegava no sono antes do fim da narração. Não tomo mais remédio para dormir." },
  { n: "Rafael Bittencourt", r: "Burnout no trabalho", t: "A Pausa Consciente das 15h salvou minhas tardes. Cinco minutos e eu volto para a reunião outra pessoa." },
  { n: "Juliana Prates", r: "Ansiedade generalizada", t: "O box breathing me tira da crise em minutos. Ter as aulas ao vivo me dá um compromisso que eu realmente cumpro." },
];
const HORARIOS = [
  { d: "Segunda a sexta", h: "7h · Calma da Manhã (ao vivo)" },
  { d: "Terça e quinta", h: "12h15 · Pausa Consciente (ao vivo)" },
  { d: "Todos os dias", h: "21h30 · História para Dormir (ao vivo)" },
  { d: "Sábado", h: "9h · Prática longa de breathwork (60 min)" },
];
const CHECK = "M7 16l6 6L26 9";
const Ic = ({ d, s = 22, c = "currentColor" }: { d: string; s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);

export function MedFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Estúdio Serena";
  const city = client?.city?.trim() || "Curitiba";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const wa = (m: string) => `https://wa.me/${phone || "5541999999999"}?text=${encodeURIComponent(m)}`;
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const serif = "'Fraunces', Georgia, serif";
  useEffect(() => {
    const l = document.createElement("link");
    l.href = "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Outfit:wght@300..700&display=swap";
    l.rel = "stylesheet"; document.head.appendChild(l);
  }, []);
  return (
    <div className="med" style={{ fontFamily: "'Outfit', system-ui, sans-serif", color: INK, background: CRM, overflowX: "hidden" }}>
      <style>{`
        .med h1,.med h2,.med h3{font-family:${serif}!important;font-weight:560;letter-spacing:0;text-decoration:none!important}
        .med blockquote,.med figure{margin:0}
        .med .wrap{max-width:1120px;margin:0 auto;padding:0 28px}
        .med .btn{display:inline-flex;align-items:center;gap:10px;background:${DEEP};color:${CRM};font-weight:600;font-size:15px;padding:16px 30px;border-radius:999px;text-decoration:none;border:none;cursor:pointer;transition:.2s}
        .med .btn:hover{background:#2f3d29;transform:translateY(-2px)}
        .med .btn-o{display:inline-flex;align-items:center;gap:10px;background:none;color:${DEEP};border:1.5px solid ${DEEP};font-weight:600;font-size:15px;padding:15px 28px;border-radius:999px;cursor:pointer;transition:.2s;text-decoration:none}
        .med .btn-o:hover{background:rgba(60,77,52,.08)}
        .med .eyebrow{display:inline-flex;align-items:center;gap:10px;color:${DEEP};font-weight:600;font-size:12px;letter-spacing:3px;text-transform:uppercase}
        .med .eyebrow::before{content:"✳";color:${PEACH};letter-spacing:0}
        .med .hov{transition:transform .2s,box-shadow .2s,border-color .2s}
        .med .hov:hover{transform:translateY(-4px);box-shadow:0 18px 40px -26px rgba(60,77,52,.5);border-color:rgba(139,160,122,.9)!important}
        .med .ring{position:absolute;border-radius:50%;border:1.5px solid ${SAGE}}
        @media (max-width:900px){
          .med .hero-g{grid-template-columns:1fr!important}
          .med .hero-art{min-height:340px!important}
          .med .desk-nav{display:none!important}
        }
      `}</style>

      {/* header */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(244,240,230,.9)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${CRM2}` }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 28px" }}>
          <span style={{ fontFamily: serif, fontSize: 26, color: DEEP }}>{brand}</span>
          <nav style={{ display: "flex", gap: 26, fontSize: 13, fontWeight: 500, letterSpacing: 1.6, textTransform: "uppercase", color: GR }} className="desk-nav">
            {[["Sessões", "sess"], ["Respiração", "resp"], ["Horários", "horarios"], ["Planos", "planos"]].map(([n, id]) => <a key={n} onClick={() => go(id ?? "")} style={{ cursor: "pointer" }}>{n}</a>)}
          </nav>
          <a href={wa("Olá! Quero fazer a semana experimental gratuita no " + brand + ".")} className="btn" style={{ padding: "11px 22px", fontSize: 13.5 }}>Semana grátis</a>
        </div>
      </header>

      {/* hero: pin - aquarela de folhas ao fundo, wordmark serifada gigante, mockup de celular com UI do app, CTA em pilula */}
      <section style={{ position: "relative", padding: "76px 0 84px", background: CRM, overflow: "hidden" }}>
        <img src="/serena-aquarela.jpg" alt="" aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: .6, pointerEvents: "none" }} />
        <div className="wrap" style={{ position: "relative", textAlign: "center" }}>
          <h1 className="hero-wm" style={{ fontSize: "clamp(76px,14vw,172px)", lineHeight: .96, color: DEEP, margin: 0 }}>{brand.split(" ").pop()}</h1>
          <p style={{ marginTop: 14, fontSize: "clamp(15px,2vw,21px)", fontWeight: 500, letterSpacing: ".06em", color: SAGE }}>Meditar · Respirar · Encontrar calma</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginTop: 20, color: SAGE }}>
            <span style={{ width: 56, height: 1, background: SAGE, opacity: .6 }} />
            <Ic d="M6 26c8-2 12-8 13-20 6 10 4 18-3 21 4-1 8-1 11 1-6 5-15 4-21-2z" s={18} />
            <Ic d="M4 14h14a4 4 0 1 0-4-4M4 20h18a4 4 0 1 1-4 4M4 26h10a3 3 0 1 1-3 3" s={18} />
            <Ic d="M16 6l2 6 6 2-6 2-2 6-2-6-6-2 6-2zM24 20l1.2 3 3 1.2-3 1.2-1.2 3-1.2-3-3-1.2 3-1.2z" s={18} />
            <span style={{ width: 56, height: 1, background: SAGE, opacity: .6 }} />
          </div>

          {/* mockup do app */}
          <div style={{ width: "min(340px,88vw)", margin: "44px auto 0", background: "#202b1d", borderRadius: 46, padding: 11, boxShadow: "0 34px 70px -34px rgba(36,48,32,.55)", textAlign: "left" }}>
            <div style={{ background: WHITE, borderRadius: 36, padding: "18px 15px 14px", overflow: "hidden" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: serif, fontSize: 19, color: DEEP }}>{brand.split(" ").pop()}</span>
                <span style={{ width: 30, height: 30, borderRadius: "50%", background: CRM2, display: "grid", placeItems: "center" }}><Ic d="M16 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM7 27a9 9 0 0 1 18 0" s={15} c={GR} /></span>
              </div>
              <div style={{ marginTop: 12, background: "#dfe6ec", borderRadius: 15, padding: "15px 14px", textAlign: "center" }}>
                <div style={{ fontSize: 14.5, color: INK }}><strong>Bom dia,</strong><br />reserve um momento para respirar</div>
                <div style={{ marginTop: 6, fontSize: 11.5, color: SAGED }}>Foco de hoje · 5 min</div>
              </div>
              <div style={{ margin: "15px 2px 8px", fontSize: 13, fontWeight: 700, color: INK }}>Sessões de meditação</div>
              {SESS.slice(0, 3).map((s) => (
                <div key={s.t} style={{ display: "flex", alignItems: "center", gap: 10, background: s.bg, borderRadius: 13, padding: "9px 11px", marginBottom: 7 }}>
                  <span style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,.65)", display: "grid", placeItems: "center", flexShrink: 0 }}><Ic d={s.i} s={16} c={DEEP} /></span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: "block", fontSize: 13, fontWeight: 700, color: DEEP }}>{s.t}</span>
                    <span style={{ display: "block", fontSize: 10.5, color: GR }}>{s.m} · {s.tag}</span>
                  </span>
                  <span style={{ width: 25, height: 25, borderRadius: "50%", background: DEEP, display: "grid", placeItems: "center", flexShrink: 0 }}><svg width="9" height="10" viewBox="0 0 9 10" aria-hidden><path d="M1 1l7 4-7 4z" fill={WHITE} /></svg></span>
                </div>
              ))}
              <div style={{ margin: "14px 2px 8px", fontSize: 13, fontWeight: 700, color: INK }}>Exercícios de respiração</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[["Box Breathing", "4·4·4·4 · 3 min", "#e4ebf0"], ["Respiração calma", "4·6 · 2 min", "#dfe7d4"]].map(([t, m, bg]) => (
                  <div key={t} style={{ background: bg, borderRadius: 13, padding: "10px 11px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: DEEP }}>{t}</span>
                      <Ic d="M4 14h14a4 4 0 1 0-4-4M4 20h18a4 4 0 1 1-4 4M4 26h10a3 3 0 1 1-3 3" s={14} c={SAGED} />
                    </div>
                    <div style={{ marginTop: 3, fontSize: 10.5, color: GR }}>{m}</div>
                  </div>
                ))}
              </div>
              <div style={{ margin: "14px 2px 8px", fontSize: 13, fontWeight: 700, color: INK }}>Seu progresso</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, background: WHITE, border: `1px solid ${CRM2}`, borderRadius: 13, padding: "10px 12px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <Ic d="M16 4c2 5-4 7-4 12a8 8 0 0 0 16 0c0-3-1.5-5-3-7-1 2-2.5 3-4 3 .5-3-2-7-5-8z" s={20} c={PEACH} />
                  <span>
                    <span style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: DEEP }}>7 dias seguidos</span>
                    <span style={{ display: "block", fontSize: 10.5, color: GR }}>120 min esta semana</span>
                  </span>
                </span>
                <span style={{ position: "relative", width: 42, height: 42, flexShrink: 0 }}>
                  <svg width="42" height="42" viewBox="0 0 42 42" aria-hidden>
                    <circle cx="21" cy="21" r="16" fill="none" stroke={CRM2} strokeWidth="4" />
                    <circle cx="21" cy="21" r="16" fill="none" stroke={DEEP} strokeWidth="4" strokeLinecap="round" strokeDasharray="100.5" strokeDashoffset="25.1" transform="rotate(-90 21 21)" />
                  </svg>
                  <span style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", fontSize: 9.5, fontWeight: 700, color: DEEP }}>75%</span>
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-around", marginTop: 12, paddingTop: 10, borderTop: `1px solid ${CRM2}` }}>
                <Ic d="M7 26V14l9-7 9 7v12a1 1 0 0 1-1 1h-5v-7h-6v7H8a1 1 0 0 1-1-1z" s={19} c={DEEP} />
                <Ic d="M4 14h14a4 4 0 1 0-4-4M4 20h18a4 4 0 1 1-4 4M4 26h10a3 3 0 1 1-3 3" s={19} c={SAGE} />
                <Ic d="M16 4a12 12 0 1 0 0 24 12 12 0 0 0 0-24zM16 10v6l4 4" s={19} c={SAGE} />
                <Ic d="M16 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM7 27a9 9 0 0 1 18 0" s={19} c={SAGE} />
              </div>
            </div>
          </div>

          <div style={{ marginTop: 38 }}>
            <a className="btn" href={wa("Olá! Quero começar a semana experimental gratuita no " + brand + ".")} style={{ background: SAGE, color: WHITE, fontSize: 16, padding: "17px 34px" }}>Comece sua jornada de calma, grátis hoje</a>
          </div>
        </div>
      </section>

      {/* sessões */}
      <section id="sess" style={{ padding: "84px 0", background: WHITE }}>
        <div className="wrap">
          <span className="eyebrow">Sessões</span>
          <h2 style={{ marginTop: 12, fontSize: "clamp(30px,3.8vw,48px)", color: DEEP }}>Uma prática para cada momento do dia</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(430px,100%),1fr))", gap: 18, marginTop: 38 }}>
            {SESS.map((s) => (
              <article key={s.t} className="hov" style={{ background: s.bg, borderRadius: 18, padding: "24px 24px", border: `1px solid ${CRM2}`, display: "flex", gap: 16, alignItems: "flex-start" }}>
                <span style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(139,160,122,.2)", border: `1.5px solid ${SAGE}`, display: "grid", placeItems: "center", flexShrink: 0 }}><Ic d={s.i} s={28} c={DEEP} /></span>
                <span style={{ flex: 1 }}>
                  <span style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
                    <h3 style={{ fontSize: 21, color: DEEP }}>{s.t}</h3>
                    <span style={{ fontSize: 12.5, fontWeight: 600, color: WHITE, background: DEEP, borderRadius: 999, padding: "3px 11px", whiteSpace: "nowrap" }}>{s.m}</span>
                  </span>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: GR, margin: "6px 0 8px" }}>{s.d}</p>
                  <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.6, textTransform: "uppercase", color: SAGED }}>{s.tag}</span>
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* respiração */}
      <section id="resp" style={{ padding: "84px 0", background: DEEP, color: CRM }}>
        <div className="wrap">
          <span className="eyebrow" style={{ color: SAGE }}>Respiração guiada</span>
          <h2 style={{ marginTop: 12, fontSize: "clamp(30px,3.8vw,48px)", color: CRM }}>Duas técnicas, resultado imediato</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 20, marginTop: 38 }}>
            {BREATH.map((b) => (
              <article key={b.t} style={{ background: "rgba(244,240,230,.06)", border: "1px solid rgba(139,160,122,.45)", borderRadius: 18, padding: "30px 28px", height: "100%" }}>
                <h3 style={{ fontSize: 24, color: CRM, marginBottom: 10 }}>{b.t}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: "rgba(244,240,230,.88)", marginBottom: 20 }}>{b.d}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {b.steps.map((st, k) => (
                    <span key={st} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: CRM, background: "rgba(139,160,122,.18)", border: "1px solid rgba(139,160,122,.5)", borderRadius: 999, padding: "8px 14px" }}>
                      <span style={{ width: 20, height: 20, borderRadius: "50%", background: PEACH, color: INK, display: "grid", placeItems: "center", fontSize: 11, fontWeight: 700 }}>{k + 1}</span>{st}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
          {/* progresso */}
          <div style={{ marginTop: 22, background: CRM, color: INK, borderRadius: 18, padding: "28px 30px", display: "flex", gap: 34, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <span style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: 2, color: SAGE, textTransform: "uppercase" }}>Seu progresso</span>
              <div style={{ fontFamily: serif, fontSize: 26, color: DEEP, marginTop: 6 }}>7 dias seguidos de prática</div>
            </div>
            <div style={{ flex: "1 1 260px", maxWidth: 420 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: GR, marginBottom: 8 }}><span>120 min esta semana</span><span>meta: 150 min</span></div>
              <div style={{ height: 10, borderRadius: 999, background: CRM2 }}><div style={{ width: "80%", height: "100%", borderRadius: 999, background: `linear-gradient(90deg, ${SAGE}, ${DEEP})` }} /></div>
            </div>
            <a className="btn" href={wa("Olá! Quero começar minha sequência de prática no " + brand + ".")}>Começar minha sequência</a>
          </div>
        </div>
      </section>

      {/* horários */}
      <section id="horarios" style={{ padding: "84px 0", background: CRM }}>
        <div className="wrap" style={{ maxWidth: 820 }}>
          <span className="eyebrow">Aulas ao vivo</span>
          <h2 style={{ marginTop: 12, fontSize: "clamp(30px,3.8vw,48px)", color: DEEP }}>Horários da semana</h2>
          <div style={{ marginTop: 32, display: "grid", gap: 0 }}>
            {HORARIOS.map((h, i) => (
              <div key={h.d} style={{ display: "flex", justifyContent: "space-between", gap: 18, flexWrap: "wrap", padding: "18px 6px", borderTop: i === 0 ? "none" : `1px solid ${CRM2}`, alignItems: "baseline" }}>
                <span style={{ fontFamily: serif, fontSize: 20, color: DEEP }}>{h.d}</span>
                <span style={{ fontSize: 14.5, color: GR, fontWeight: 500 }}>{h.h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* planos */}
      <section id="planos" style={{ padding: "84px 0", background: WHITE }}>
        <div className="wrap">
          <span className="eyebrow">Planos</span>
          <h2 style={{ marginTop: 12, fontSize: "clamp(30px,3.8vw,48px)", color: DEEP }}>Comece grátis, continue porque funciona</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20, marginTop: 38 }}>
            {PLANOS.map((p) => (
              <article key={p.n} className="hov" style={{ position: "relative", background: p.hot ? DEEP : CRM, color: p.hot ? CRM : INK, borderRadius: 20, padding: "30px 28px", border: `1px solid ${p.hot ? DEEP : CRM2}` }}>
                {p.hot && <span style={{ position: "absolute", top: -12, right: 22, background: PEACH, color: INK, fontSize: 11.5, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", borderRadius: 999, padding: "5px 12px" }}>Mais escolhido</span>}
                <h3 style={{ fontSize: 22, color: p.hot ? CRM : DEEP }}>{p.n}</h3>
                <div style={{ margin: "14px 0 18px" }}><span style={{ fontFamily: serif, fontSize: 40, color: p.hot ? PEACH : DEEP }}>{p.p}</span> <span style={{ fontSize: 14, color: p.hot ? "rgba(244,240,230,.7)" : GR }}>{p.per}</span></div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "grid", gap: 10 }}>
                  {p.feats.map((f) => <li key={f} style={{ display: "flex", gap: 10, fontSize: 14.5, alignItems: "flex-start", color: p.hot ? "rgba(244,240,230,.85)" : "#3f4a37" }}><Ic d={CHECK} s={16} c={p.hot ? PEACH : DEEP} />{f}</li>)}
                </ul>
                <a className={p.hot ? "btn" : "btn-o"} style={p.hot ? { background: PEACH, color: INK, width: "100%", justifyContent: "center" } : { width: "100%", justifyContent: "center" }} href={wa("Olá! Quero o plano " + p.n + " do " + brand + ".")}>{p.cta}</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* depoimentos */}
      <section style={{ padding: "84px 0", background: CRM }}>
        <div className="wrap">
          <span className="eyebrow">Alunos</span>
          <h2 style={{ marginTop: 12, fontSize: "clamp(30px,3.8vw,48px)", color: DEEP }}>Quem respira com a gente</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20, marginTop: 38 }}>
            {TESTI.map((t) => (
              <figure key={t.n} className="hov" style={{ background: WHITE, borderRadius: 18, padding: "28px 26px", border: `1px solid ${CRM2}`, display: "flex", flexDirection: "column", gap: 14 }}>
                <span style={{ fontFamily: serif, fontSize: 52, lineHeight: .55, color: SAGE }}>"</span>
                <blockquote style={{ margin: 0, padding: 0, width: "100%", fontSize: 15, lineHeight: 1.7, color: "#3f4a37" }}>{t.t}</blockquote>
                <figcaption style={{ display: "flex", alignItems: "center", gap: 12, marginTop: "auto" }}>
                  <span style={{ width: 46, height: 46, borderRadius: "50%", background: DEEP, color: CRM, display: "grid", placeItems: "center", fontWeight: 600, fontSize: 15, flexShrink: 0 }}>{t.n.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span>
                  <span><strong style={{ fontSize: 14.5 }}>{t.n}</strong><br /><span style={{ fontSize: 12.5, color: GR }}>{t.r}</span></span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* cta final */}
      <section style={{ padding: "96px 0", background: `linear-gradient(160deg, ${DEEP} 0%, #2f3d29 100%)`, color: CRM, textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(139,160,122,.25) 1.2px, transparent 1.2px)", backgroundSize: "28px 28px", maskImage: "radial-gradient(ellipse at 50% 0%, black 25%, transparent 72%)" }} />
        <div className="wrap" style={{ position: "relative" }}>
          <span className="eyebrow" style={{ justifyContent: "center", color: SAGE }}>Semana experimental gratuita</span>
          <h2 style={{ margin: "14px auto 18px", fontSize: "clamp(34px,4.6vw,60px)", maxWidth: 720, color: CRM }}>Comece hoje. <span style={{ color: PEACH }}>A calma é treino.</span></h2>
          <p style={{ fontSize: 16.5, color: "rgba(244,240,230,.78)", maxWidth: 540, margin: "0 auto 32px" }}>Sete dias de aulas ao vivo e sessões guiadas, sem cartão e sem compromisso.</p>
          <a className="btn" style={{ fontSize: 16, padding: "18px 36px", background: PEACH, color: INK }} href={wa("Olá! Quero começar a semana experimental gratuita no " + brand + ".")}>Quero minha semana grátis →</a>
        </div>
      </section>

      {/* footer */}
      <footer style={{ background: "#2f3d29", color: "rgba(244,240,230,.55)", borderTop: "1px solid rgba(139,160,122,.3)", padding: "34px 0" }}>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 14, fontSize: 13.5 }}>
          <span style={{ fontFamily: serif, fontSize: 21, color: CRM }}>{brand}</span>
          <span>{city} · Meditação, breathwork e sono</span>
        </div>
      </footer>
    </div>
  );
}
