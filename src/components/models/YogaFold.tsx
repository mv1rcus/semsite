import { useEffect, useState } from "react";

/** Estudio de yoga, construido do zero a partir de um pin editorial em verde-oliva e creme. Agendamento de aula experimental que fecha no WhatsApp. */
const OL = "#4a5230", OL2 = "#5b6339", DK = "#2e3320", CRM = "#f5f1e6", CRM2 = "#ede7d6", SAND = "#d9cfae", INK = "#2b2b23", GR = "#6d6a58", CLAY = "#b98a5e", CLAY_TXT = "#8A5A28";
const CLASSES = [
  { t: "Hatha Yoga", d: "Posturas clássicas com ritmo calmo, ideal para construir base e consciência corporal.", lv: "Todos os níveis", dur: "60 min" },
  { t: "Vinyasa Flow", d: "Sequências fluidas ligadas à respiração para força, mobilidade e presença.", lv: "Intermediário", dur: "75 min" },
  { t: "Yin Yoga", d: "Posturas longas e passivas que soltam fáscia e acalmam o sistema nervoso.", lv: "Todos os níveis", dur: "60 min" },
  { t: "Meditação Guiada", d: "Práticas de atenção plena para ansiedade, foco e sono profundo.", lv: "Iniciante", dur: "45 min" },
];
const SCHED = [
  { d: "Segunda e Quarta", h: "7h · 12h · 19h" },
  { d: "Terça e Quinta", h: "6h30 · 18h30 · 20h" },
  { d: "Sábado", h: "8h · 10h" },
];
const PLANS = [
  { t: "Avulsa", p: "R$ 55", u: "/aula", feats: ["1 aula no horário que escolher", "Tapete e props inclusos", "Chá após a prática"] },
  { t: "Mensal", p: "R$ 219", u: "/mês", feats: ["8 aulas por mês", "Todos os estilos", "App com práticas gravadas", "1 workshop por mês"], hot: true },
  { t: "Ilimitado", p: "R$ 329", u: "/mês", feats: ["Aulas ilimitadas", "Prioridade na reserva", "Meditações ao vivo toda manhã", "10% na loja do estúdio"] },
];
const TESTI = [
  { n: "Camila Duarte", r: "Aluna há 2 anos", t: "Cheguei pela dor nas costas e fiquei pela cabeça. As professoras olham para cada aluno, ajustam, perguntam. Virei outra pessoa depois das 19h." },
  { n: "Felipe Andrade", r: "Aluno há 8 meses", t: "Nunca tinha pisado num estúdio e achei que não era para mim. A aula experimental me desarmou: zero julgamento, muito cuidado. Hoje é a melhor parte do meu dia." },
  { n: "Renata Lopes", r: "Aluna há 4 anos", t: "Já pratiquei em vários lugares e nenhum segura a qualidade daqui. O Yin de sexta me salvou de um burnout." },
];
const CHECK = "M7 16l6 6L26 9";
const Ic = ({ d, s = 22, c = "currentColor" }: { d: string; s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
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
        .yga h1,.yga h2,.yga h3{font-family:${serif}!important;font-weight:500;letter-spacing:-.01em;line-height:1.06;text-wrap:balance}
        .yga .wrap{max-width:1140px;margin:0 auto;padding:0 28px}
        .yga .btn{font-family:'Karla',system-ui,sans-serif;display:inline-flex;align-items:center;gap:10px;background:${OL};color:#fff;font-weight:700;font-size:15px;padding:16px 30px;border-radius:999px;text-decoration:none;border:none;cursor:pointer;transition:.2s;letter-spacing:.3px}
        .yga .btn:hover{background:${DK};transform:translateY(-2px)}
        .yga .btn-o{font-family:'Karla',system-ui,sans-serif;text-decoration:none;display:inline-flex;align-items:center;gap:10px;background:none;color:${OL};border:1.5px solid ${OL};font-weight:700;font-size:15px;padding:15px 28px;border-radius:999px;cursor:pointer;transition:.2s}
        .yga .btn-o:hover{background:rgba(74,82,48,.08)}
        .yga .eyebrow{display:inline-flex;align-items:center;gap:8px;color:${CLAY_TXT};font-weight:700;font-size:12px;letter-spacing:2.5px;text-transform:uppercase}
        .yga .eyebrow::before{content:"●";font-size:8px}
        .yga .hov{transition:transform .2s,box-shadow .2s,border-color .2s}
        .yga .hov:hover{transform:translateY(-4px);box-shadow:0 18px 40px -24px rgba(46,51,32,.45);border-color:rgba(185,138,94,.6)!important}
        .yga .hero-comp{min-height:700px}
        @media (max-width:900px){
          .yga .g3y{grid-template-columns:1fr!important}
          .yga .g4y{grid-template-columns:1fr 1fr!important}
          .yga .hero-g{grid-template-columns:1fr!important}
          .yga .hor-g{grid-template-columns:1fr!important;gap:32px!important}
          .yga .desk-nav{display:none!important}
          .yga .hero-comp{min-height:0!important;display:grid;gap:26px}
          .yga .hero-comp .arq{position:static!important;width:min(300px,86%)!important;height:auto!important;aspect-ratio:3/4;margin:0 auto}
          .yga .hero-comp .hojecard{position:static!important}
        }
      `}</style>

      {/* header */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(245,241,230,.92)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(46,51,32,.1)" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 28px" }}>
          <span style={{ fontFamily: serif, fontSize: 22, fontStyle: "italic", color: DK }}>{brand}<span style={{ color: CLAY }}>.</span></span>
          <nav style={{ display: "flex", gap: 26, fontSize: 13.5, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", color: GR }} className="desk-nav">
            {["Aulas", "Horários", "Planos", "Depoimentos"].map((n) => <a key={n} onClick={() => go(n.toLowerCase().replace("á", "a").replace("í", "i"))} style={{ cursor: "pointer" }}>{n}</a>)}
          </nav>
          <a href={wa("Olá! Quero agendar uma aula experimental no " + brand + ".")} className="btn" style={{ padding: "12px 22px", fontSize: 14 }}>Aula experimental</a>
        </div>
      </header>

      {/* hero */}
      <section style={{ position: "relative", padding: "90px 0 80px", overflow: "hidden", background: CRM }}>
        <div style={{ position: "absolute", top: -180, right: -120, width: 560, height: 560, borderRadius: "50%", background: `radial-gradient(circle, ${SAND} 0%, transparent 65%)`, opacity: .8 }} />
        <div className="wrap hero-g" style={{ position: "relative", display: "grid", gridTemplateColumns: "1.15fr .85fr", gap: 56, alignItems: "center" }}>
          <div>
            <span className="eyebrow">Estúdio de yoga · {city}</span>
            <h1 style={{ fontSize: "clamp(46px,6.5vw,84px)", lineHeight: 1.02, margin: "18px 0 22px", color: DK }}>
              Mova.<br /><span style={{ fontStyle: "italic", color: OL2 }}>Respire.</span><br />Torne-se.
            </h1>
            <p style={{ fontSize: 17.5, lineHeight: 1.7, color: GR, maxWidth: 460, marginBottom: 30 }}>
              Práticas de yoga e meditação para quem quer força no corpo e calma na cabeça. Turmas pequenas, professoras experientes e um espaço que abraça.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 30 }}>
              <a className="btn" href={wa("Olá! Quero agendar uma aula experimental no " + brand + ".")}>Agendar aula experimental →</a>
              <button className="btn-o" onClick={() => go("aulas")}>Conhecer as aulas →</button>
            </div>
            <div style={{ display: "flex", gap: 26, fontSize: 13.5, color: "#5c5949", fontWeight: 600, flexWrap: "wrap" }}>
              {["Primeira aula gratuita", "Turmas de até 12 alunos", "Tapete e props inclusos"].map((b) => <span key={b} style={{ display: "inline-flex", gap: 7, alignItems: "center" }}><Ic d={CHECK} s={14} c={OL2} />{b}</span>)}
            </div>
          </div>
          {/* foto da instrutora livre + card de horarios abaixo, sem sobreposicao */}
          <div className="hero-comp" style={{ position: "relative" }}>
            <img src="/raiz-instrutora.webp" alt="Instrutora de yoga em prática no estúdio" className="arq" style={{ position: "absolute", top: 0, right: 0, width: 300, height: 400, borderRadius: "150px 150px 24px 24px", objectFit: "cover" }} />
            <div className="hojecard" style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#fff", borderRadius: 22, padding: "26px 26px 20px", boxShadow: "0 28px 60px -30px rgba(46,51,32,.45)", border: `1px solid ${CRM2}` }}>
              <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: 1.8, color: CLAY_TXT }}>HOJE NO ESTÚDIO</span>
              {[{ h: "6h30", c: "Vinyasa Flow", v: "3 vagas" }, { h: "12h", c: "Hatha Yoga", v: "5 vagas" }, { h: "19h", c: "Yin Yoga", v: "2 vagas" }].map((r) => (
                <div key={r.h} style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 0", borderBottom: `1px solid ${CRM2}` }}>
                  <span style={{ fontFamily: serif, fontSize: 20, fontStyle: "italic", color: DK, minWidth: 56 }}>{r.h}</span>
                  <span style={{ fontWeight: 700, fontSize: 14.5, flex: 1 }}>{r.c}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: OL2, background: "rgba(91,99,57,.12)", borderRadius: 999, padding: "4px 10px" }}>{r.v}</span>
                </div>
              ))}
              <a href={wa("Olá! Quero reservar uma vaga na aula de hoje no " + brand + ".")} style={{ display: "block", textAlign: "center", marginTop: 16, fontWeight: 700, fontSize: 14, color: OL, textDecoration: "none" }}>Reservar vaga →</a>
            </div>
          </div>
        </div>
      </section>

      {/* aulas */}
      <div style={{ background: CRM, lineHeight: 0 }} aria-hidden>
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ width: "100%", height: 70, display: "block" }}><path d="M0 70 C360 0 1080 0 1440 70 L1440 70 L0 70 Z" fill="#ffffff" /></svg>
      </div>
      <section id="aulas" style={{ padding: "60px 0 84px", background: "#fff" }}>
        <div className="wrap">
          <span className="eyebrow">Aulas</span>
          <h2 style={{ marginTop: 12, fontSize: "clamp(30px,3.6vw,44px)", color: DK }}>Descubra a sua prática</h2>
          <div className="g4y" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18, marginTop: 36 }}>
            {CLASSES.map((c, i) => (
              <article key={c.t} className="hov" style={{ borderRadius: 20, border: `1px solid ${CRM2}`, background: CRM, padding: "26px 24px 24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
                  <span style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: 1.6, color: CLAY_TXT, textTransform: "uppercase" }}>{c.dur}</span>
                  <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: 1, color: OL2, textTransform: "uppercase" }}>{c.lv}</span>
                </div>
                <h3 style={{ fontSize: 26, margin: "14px 0 10px", color: DK, fontStyle: "italic" }}>{c.t}</h3>
                <div style={{ width: 42, height: 2, background: CLAY, marginBottom: 14, borderRadius: 2 }} />
                <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "#5c5949" }}>{c.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* horarios */}
      <section id="horarios" style={{ padding: "84px 0", background: OL, color: CRM }}>
        <div className="wrap hor-g" style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 56, alignItems: "center" }}>
          <div>
            <span className="eyebrow" style={{ color: SAND }}>Horários</span>
            <h2 style={{ marginTop: 12, fontSize: "clamp(30px,3.6vw,44px)" }}>Sempre tem uma aula esperando por você</h2>
            <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.7, color: "rgba(245,241,230,.75)" }}>Manhã, almoço ou fim do dia: encaixe a prática na sua rotina, não o contrário.</p>
            <a className="btn" style={{ marginTop: 26, background: SAND, color: DK }} href={wa("Olá! Quero ver os horários disponíveis no " + brand + ".")}>Ver vagas desta semana →</a>
          </div>
          <div>
            {SCHED.map((s) => (
              <div key={s.d} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 4px", borderBottom: "1px solid rgba(245,241,230,.2)" }}>
                <span style={{ fontWeight: 800, fontSize: 17 }}>{s.d}</span>
                <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 19, color: SAND }}>{s.h}</span>
              </div>
            ))}
            <p style={{ marginTop: 16, fontSize: 13.5, color: "rgba(245,241,230,.78)" }}>Domingo: prática restaurativa aberta às 9h, uma vez por mês.</p>
          </div>
        </div>
      </section>

      {/* planos */}
      <section id="planos" style={{ padding: "84px 0" }}>
        <div className="wrap">
          <span className="eyebrow">Planos</span>
          <h2 style={{ marginTop: 12, fontSize: "clamp(30px,3.6vw,44px)", color: DK }}>Comece do seu jeito</h2>
          <div className="g3y" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18, marginTop: 36 }}>
            {PLANS.map((p) => (
              <article key={p.t} className="hov" style={{ background: "#fff", borderRadius: 22, padding: "30px 26px", border: p.hot ? `2px solid ${OL}` : `1px solid ${CRM2}`, position: "relative" }}>
                {p.hot && <span style={{ position: "absolute", top: -13, left: 24, background: OL, color: "#fff", fontSize: 11.5, fontWeight: 800, letterSpacing: 1.2, padding: "5px 14px", borderRadius: 999 }}>MAIS ESCOLHIDO</span>}
                <h3 style={{ fontSize: 22, color: DK }}>{p.t}</h3>
                <div style={{ margin: "14px 0 18px" }}>
                  <span style={{ fontFamily: serif, fontSize: 44, color: DK }}>{p.p}</span>
                  <span style={{ fontSize: 14, color: GR }}> {p.u}</span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 22px", display: "grid", gap: 10 }}>
                  {p.feats.map((f) => <li key={f} style={{ display: "flex", gap: 10, fontSize: 14.5, color: "#4b4a3e", alignItems: "flex-start" }}><Ic d={CHECK} s={16} c={OL2} />{f}</li>)}
                </ul>
                <a className={p.hot ? "btn" : "btn-o"} style={{ width: "100%", justifyContent: "center" }} href={wa(`Olá! Quero assinar o plano ${p.t} do ${brand}.`)}>Começar agora</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* depoimentos */}
      <section id="depoimentos" style={{ background: "#fff", padding: "84px 0" }}>
        <div className="wrap">
          <span className="eyebrow">Depoimentos</span>
          <h2 style={{ marginTop: 12, fontSize: "clamp(30px,3.6vw,44px)", color: DK }}>Quem pratica, sente</h2>
          <div className="g3y" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginTop: 36 }}>
            {TESTI.map((t) => (
              <figure key={t.n} className="hov" style={{ background: CRM, borderRadius: 20, padding: "28px 26px", border: `1px solid ${CRM2}`, display: "flex", flexDirection: "column", gap: 14 }}>
                <span style={{ fontFamily: serif, fontSize: 46, lineHeight: .6, color: CLAY }}>"</span>
                <blockquote style={{ fontSize: 15, lineHeight: 1.7, color: "#4b4a3e" }}>{t.t}</blockquote>
                <figcaption style={{ display: "flex", alignItems: "center", gap: 12, marginTop: "auto" }}>
                  <span style={{ width: 46, height: 46, borderRadius: "50%", background: OL, color: SAND, display: "grid", placeItems: "center", fontWeight: 800, fontSize: 15, flexShrink: 0 }}>{t.n.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span>
                  <span><strong style={{ fontSize: 14.5 }}>{t.n}</strong><br /><span style={{ fontSize: 12.5, color: GR }}>{t.r}</span></span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* cta final */}
      <section style={{ padding: "96px 0", background: DK, color: CRM, textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -160, left: "50%", transform: "translateX(-50%)", width: 620, height: 620, borderRadius: "50%", border: `1.5px solid rgba(217,207,174,.25)` }} />
        <div className="wrap" style={{ position: "relative" }}>
          <span className="eyebrow" style={{ color: SAND, justifyContent: "center" }}>Primeira aula gratuita</span>
          <h2 style={{ margin: "14px auto 18px", fontSize: "clamp(34px,4.5vw,56px)", maxWidth: 700 }}>O seu tapete está <span style={{ fontStyle: "italic", color: SAND }}>esperando.</span></h2>
          <p style={{ fontSize: 16.5, color: "rgba(245,241,230,.75)", maxWidth: 520, margin: "0 auto 32px" }}>Agende a aula experimental gratuita e sinta na pele o que a prática faz por você.</p>
          <a className="btn" style={{ background: CLAY, fontSize: 16, padding: "18px 36px" }} href={wa("Olá! Quero agendar minha aula experimental gratuita no " + brand + ".")}>Agendar pelo WhatsApp →</a>
        </div>
      </section>

      {/* footer */}
      <footer style={{ background: DK, color: "rgba(245,241,230,.55)", borderTop: "1px solid rgba(245,241,230,.12)", padding: "34px 0" }}>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 14, fontSize: 13.5 }}>
          <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 19, color: CRM }}>{brand}<span style={{ color: CLAY }}>.</span></span>
          <span>{city} · Yoga e meditação para todos os corpos</span>
        </div>
      </footer>
    </div>
  );
}
