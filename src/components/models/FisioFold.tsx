import { useEffect, useState } from "react";

/** Fisioterapeuta, construida do zero a partir de um pin em verde-agua, menta e branco. Agendamento de avaliacao gratuita que fecha no WhatsApp. */
const TE = "#0e7c7b", TE2 = "#0a5f5e", TE3 = "#14a3a2", MINT = "#eaf6f4", MINT2 = "#d9efec", INK = "#10333a", DK = "#0f2e33", CRM = "#f7fbfa";
const TREATS = [
  { t: "Fisioterapia", d: "Reabilitação ortopédica e neurológica para dor, lesão e mobilidade.", img: "/fisio-t1.webp", tag: "Fisioterapia" },
  { t: "Pilates", d: "Fortalecimento do core, postura e controle corporal em aulas individuais ou em grupo.", img: "/fisio-t2.webp", tag: "Pilates" },
  { t: "RPG", d: "Técnica para correção postural, dores crônicas e equilíbrio muscular.", img: "/fisio-t3.webp", tag: "RPG" },
  { t: "Recuperação Esportiva", d: "Retorno seguro ao esporte com prevenção e performance.", img: "/fisio-t4.webp", tag: "Rehab" },
];
const STATS = [
  { v: "500+", l: "Pacientes atendidos" },
  { v: "12+", l: "Anos de experiência" },
  { v: "4.9★", l: "Avaliação média" },
  { v: "100%", l: "Planos personalizados" },
];
const PLANS = [
  { t: "Pilates Mensal", p: "R$ 280", u: "/mês", feats: ["4 aulas por mês", "Grupo reduzido até 6 alunos", "Avaliação postural inclusa", "Reposição em caso de falta"] },
  { t: "Combo Saúde", p: "R$ 420", u: "/mês", feats: ["8 sessões combinadas Pilates + Fisioterapia", "Avaliação inicial grátis", "Plano individual personalizado", "Acompanhamento via WhatsApp"], hot: true },
];
const TESTI = [
  { n: "Marcos Vieira", r: "Analista, 44 anos", t: "Vivia com dor lombar há anos e achava que era normal. Em três meses de tratamento com a Daniela voltei a trabalhar sem travar. A avaliação inicial já mostrou o que ninguém tinha visto.", a: "/fisio-a1.webp" },
  { n: "Sônia Pereira", r: "Professora, 56 anos", t: "Depois da cirurgia no joelho, achei que não voltaria a caminhar direito. O plano foi no meu ritmo, sem pressa e sem dor. Hoje faço minhas caminhadas todos os dias.", a: "/fisio-a2.webp" },
  { n: "Lucas Ferreira", r: "Corredor amador, 31 anos", t: "Lesionei o tornozelo na semana de uma prova. A recuperação esportiva me colocou de volta nos treinos em cinco semanas, mais forte do que antes.", a: "/fisio-a3.webp" },
];
const CHECK = "M7 16l6 6L26 9";
const CAL = "M6 8h20v18H6zM6 13h20M11 4v5M21 4v5";
const Ic = ({ d, s = 22, c = "currentColor" }: { d: string; s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke={c} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);

export function FisioFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Daniela Rocha";
  const city = client?.city?.trim() || "Belo Horizonte";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  const [nome, setNome] = useState("");
  const [zap, setZap] = useState("");
  const [trat, setTrat] = useState("Fisioterapia");
  useEffect(() => { const f = () => setSc(window.scrollY > 40); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi, Dra. ${brand}! Quero agendar uma avaliação gratuita${nome ? ` em nome de ${nome}` : ""} (${trat})${zap ? ` - meu WhatsApp: ${zap}` : ""}.`)}`;
  const nav: [string, string][] = [["Início", "ini"], ["Tratamentos", "trat"], ["Planos", "planos"], ["Sobre mim", "sobre"], ["Depoimentos", "depo"], ["Contato", "cont"]];
  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenu(false); };

  return (
    <div className="fis" style={{ fontFamily: "Manrope, system-ui, sans-serif", color: INK, background: CRM, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
        .fis *{box-sizing:border-box;margin:0}
        .fis img{display:block;max-width:100%}
        .fis .wrap{max-width:1140px;margin:0 auto;padding:0 22px}
        .fis .pill{display:inline-flex;align-items:center;gap:8px;background:#fff;border:1.5px solid ${MINT2};color:${TE};font-weight:700;font-size:13px;padding:7px 16px;border-radius:999px}
        .fis .btn-t{display:inline-flex;align-items:center;gap:9px;background:${TE};color:#fff;font-weight:700;font-size:15.5px;padding:14px 26px;border-radius:999px;border:none;cursor:pointer;text-decoration:none;transition:.2s}
        .fis .btn-t:hover{background:${TE2};transform:translateY(-1px)}
        .fis .btn-o{display:inline-flex;align-items:center;gap:9px;background:#fff;color:${TE};font-weight:700;font-size:15.5px;padding:14px 26px;border-radius:999px;border:1.5px solid ${TE};cursor:pointer;text-decoration:none;transition:.2s}
        .fis .btn-o:hover{background:${MINT}}
        .fis h1,.fis h2,.fis h3,.fis h4,.fis strong,.fis button,.fis a{font-family:Manrope,system-ui,sans-serif}
        .fis h2{font-size:clamp(26px,3.4vw,36px);font-weight:800;letter-spacing:-.5px;text-align:center}
        .fis .sub{text-align:center;color:#33555b;font-size:16px;max-width:640px;margin:12px auto 0;line-height:1.6}
        .fis .navlink{background:none;border:none;font:inherit;font-weight:600;font-size:14.5px;color:${INK};cursor:pointer;padding:6px 2px}
        .fis .navlink:hover{color:${TE}}
        @media(max-width:900px){.fis .hgrid{grid-template-columns:1fr !important}.fis .nav-d{display:none !important}.fis .hphoto{order:-1}}
        @media(min-width:901px){.fis .nav-m{display:none !important}}
      `}</style>

      {/* header */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: sc ? "rgba(255,255,255,.95)" : "#fff", backdropFilter: "blur(8px)", borderBottom: `1px solid ${MINT2}` }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", gap: 26, height: 68 }}>
          <button onClick={() => go("ini")} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", font: "inherit" }} aria-label="Início">
            <span style={{ width: 38, height: 38, borderRadius: 12, background: TE, display: "grid", placeItems: "center", color: "#fff" }}><Ic d="M16 5c-4 5-8 7-8 12a8 8 0 0 0 16 0c0-5-4-7-8-12zm0 19v-9" s={22} c="#fff" /></span>
            <span style={{ textAlign: "left", lineHeight: 1.1 }}>
              <strong style={{ fontSize: 16.5, fontWeight: 800, letterSpacing: "-.2px" }}>{brand}</strong><br />
              <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 2.5, color: TE }}>FISIOTERAPIA</span>
            </span>
          </button>
          <nav className="nav-d" style={{ display: "flex", gap: 20, marginLeft: "auto" }}>
            {nav.map(([l, id]) => <button key={id} className="navlink" onClick={() => go(id)}>{l}</button>)}
          </nav>
          <a href={wa} target="_blank" rel="noreferrer" className="btn-t nav-d" style={{ padding: "11px 22px", fontSize: 14 }}>Agendar Consulta</a>
          <button className="nav-m" onClick={() => setMenu(!menu)} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: INK }} aria-label="Menu"><Ic d="M5 9h22M5 16h22M5 23h22" s={26} /></button>
        </div>
        {menu && <div style={{ background: "#fff", borderTop: `1px solid ${MINT2}`, padding: "10px 22px 16px", display: "grid", gap: 4 }}>
          {nav.map(([l, id]) => <button key={id} className="navlink" style={{ textAlign: "left", padding: "10px 0" }} onClick={() => go(id)}>{l}</button>)}
          <a href={wa} target="_blank" rel="noreferrer" className="btn-t" style={{ justifyContent: "center", marginTop: 8 }}>Agendar Consulta</a>
        </div>}
      </header>

      {/* hero */}
      <section id="ini" style={{ background: MINT, padding: "56px 0 64px" }}>
        <div className="wrap hgrid" style={{ display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: 44, alignItems: "center" }}>
          <div>
            <span className="pill">Fisioterapia · Pilates · Reabilitação</span>
            <h1 style={{ fontSize: "clamp(32px,4.6vw,52px)", fontWeight: 800, letterSpacing: "-1px", lineHeight: 1.12, margin: "20px 0 16px" }}>Sua saúde em movimento. Sua vida em equilíbrio.</h1>
            <p style={{ color: "#33555b", fontSize: 16.5, lineHeight: 1.65, maxWidth: 480 }}>Fisioterapia e Pilates especializados para recuperar, fortalecer e cuidar do seu corpo com acolhimento e tecnologia.</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", margin: "26px 0 24px" }}>
              <a href={wa} target="_blank" rel="noreferrer" className="btn-t"><Ic d={CAL} s={20} c="#fff" />Agendar Avaliação Grátis</a>
              <button className="btn-o" onClick={() => go("trat")}>Nossos Tratamentos →</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 10, maxWidth: 560 }}>
              {["Atendimento humanizado", "Profissionais CREFITO", "Resultados comprovados"].map((t) => (
                <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 700, color: TE }}>
                  <span style={{ width: 24, height: 24, borderRadius: "50%", background: TE, display: "grid", placeItems: "center", flexShrink: 0 }}><Ic d={CHECK} s={13} c="#fff" /></span>{t}
                </span>
              ))}
            </div>
          </div>
          <div className="hphoto" style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 24px 60px -24px rgba(15,46,51,.35)" }}>
            <img src="/fisio-hero.webp" alt={`Sessão de fisioterapia com a Dra. ${brand}`} style={{ width: "100%", height: "100%", objectFit: "cover", aspectRatio: "4/3" }} />
          </div>
        </div>
      </section>

      {/* stats */}
      <section style={{ padding: "34px 0 14px", background: "#fff", borderTop: `1px solid ${MINT2}`, borderBottom: `1px solid ${MINT2}` }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 16 }}>
          {STATS.map((s) => (
            <div key={s.l} style={{ background: "#fff", border: `1px solid ${MINT2}`, borderRadius: 18, padding: "22px 16px", textAlign: "center", boxShadow: "0 8px 24px -18px rgba(15,46,51,.25)" }}>
              <div style={{ fontSize: 30, fontWeight: 800, color: TE, letterSpacing: "-.5px" }}>{s.v}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#33555b", marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* tratamentos */}
      <section id="trat" style={{ padding: "64px 0" }}>
        <div className="wrap">
          <h2>Nossos Tratamentos</h2>
          <p className="sub">Cuidado completo para sua recuperação e bem-estar, com abordagens modernas e personalizadas.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 20, marginTop: 36 }}>
            {TREATS.map((t) => (
              <article key={t.t} style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: `1px solid ${MINT2}`, boxShadow: "0 10px 30px -22px rgba(15,46,51,.3)", display: "flex", flexDirection: "column" }}>
                <div style={{ position: "relative" }}>
                  <img src={t.img} alt={t.t} style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover" }} />
                  <span style={{ position: "absolute", top: 12, left: 12, background: TE, color: "#fff", fontSize: 12, fontWeight: 700, padding: "5px 12px", borderRadius: 999 }}>{t.tag}</span>
                </div>
                <div style={{ padding: "18px 18px 20px" }}>
                  <h3 style={{ fontSize: 18.5, fontWeight: 800, marginBottom: 8 }}>{t.t}</h3>
                  <p style={{ fontSize: 15, color: "#33555b", lineHeight: 1.6 }}>{t.d}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* sobre */}
      <section id="sobre" style={{ background: MINT, padding: "64px 0" }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 44, alignItems: "center" }}>
          <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 24px 60px -24px rgba(15,46,51,.35)", maxWidth: 420, margin: "0 auto" }}>
            <img src="/fisio-sobre.webp" alt={`Dra. ${brand}, fisioterapeuta`} style={{ width: "100%", objectFit: "cover" }} />
          </div>
          <div>
            <span className="pill">Sobre mim</span>
            <h2 style={{ textAlign: "left", margin: "18px 0 14px" }}>Cuidado que começa ouvindo o seu corpo</h2>
            <p style={{ color: "#33555b", fontSize: 15.5, lineHeight: 1.7, marginBottom: 14 }}>Sou a Dra. {brand}, fisioterapeuta em {city} há mais de 12 anos. Cada tratamento começa com uma avaliação completa: entendo sua rotina, sua dor e seus objetivos antes de montar qualquer plano.</p>
            <p style={{ color: "#33555b", fontSize: 15.5, lineHeight: 1.7, marginBottom: 22 }}>Aqui você não é um número. As sessões são individuais, com acompanhamento próximo entre um atendimento e outro.</p>
            <div style={{ display: "grid", gap: 10 }}>
              {["CREFITO ativo e especializações em RPG e Pilates", "Sessões individuais de 50 minutos", "Avaliação inicial gratuita e sem compromisso"].map((t) => (
                <span key={t} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14.5, fontWeight: 600 }}>
                  <span style={{ width: 24, height: 24, borderRadius: "50%", background: TE, display: "grid", placeItems: "center", flexShrink: 0 }}><Ic d={CHECK} s={13} c="#fff" /></span>{t}
                </span>
              ))}
            </div>
            <a href={wa} target="_blank" rel="noreferrer" className="btn-t" style={{ marginTop: 24 }}><Ic d={CAL} s={19} c="#fff" />Agendar Avaliação Grátis</a>
          </div>
        </div>
      </section>

      {/* planos */}
      <section id="planos" style={{ padding: "64px 0" }}>
        <div className="wrap">
          <h2>Planos e Preços</h2>
          <p className="sub">Escolha o plano ideal para o seu tratamento. Valores transparentes em reais.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: 22, marginTop: 36, maxWidth: 760, marginInline: "auto" }}>
            {PLANS.map((p) => (
              <article key={p.t} style={{ background: p.hot ? TE : "#fff", color: p.hot ? "#fff" : INK, borderRadius: 22, padding: "28px 24px", border: p.hot ? "none" : `1.5px solid ${MINT2}`, boxShadow: "0 16px 40px -24px rgba(15,46,51,.4)", position: "relative" }}>
                {p.hot && <span style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: "#ffd166", color: DK, fontSize: 11.5, fontWeight: 800, padding: "5px 14px", borderRadius: 999, letterSpacing: .6 }}>MAIS POPULAR</span>}
                <h3 style={{ fontSize: 19, fontWeight: 800 }}>{p.t}</h3>
                <div style={{ margin: "14px 0 18px" }}><span style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-1px" }}>{p.p}</span><span style={{ fontSize: 14, opacity: .75, fontWeight: 600 }}> {p.u}</span></div>
                <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 10, marginBottom: 22 }}>
                  {p.feats.map((f) => <li key={f} style={{ display: "flex", gap: 9, alignItems: "center", fontSize: 14, fontWeight: 600 }}><Ic d={CHECK} s={15} c={p.hot ? "#ffd166" : TE} />{f}</li>)}
                </ul>
                <a href={wa} target="_blank" rel="noreferrer" style={{ display: "block", textAlign: "center", background: p.hot ? "#fff" : "transparent", color: p.hot ? TE : TE, border: p.hot ? "none" : `1.5px solid ${TE}`, borderRadius: 999, padding: "13px 0", fontWeight: 700, fontSize: 15, textDecoration: "none" }}>Escolher plano</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* depoimentos */}
      <section id="depo" style={{ background: MINT, padding: "64px 0" }}>
        <div className="wrap">
          <h2>O que nossos pacientes dizem</h2>
          <p className="sub">Histórias reais de quem recuperou sua qualidade de vida.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20, marginTop: 36 }}>
            {TESTI.map((t) => (
              <figure key={t.n} style={{ background: "#fff", borderRadius: 20, padding: "24px 22px", border: `1px solid ${MINT2}`, boxShadow: "0 10px 30px -22px rgba(15,46,51,.3)", display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ color: "#f5a623", fontSize: 15, letterSpacing: 2 }}>★★★★★</div>
                <blockquote style={{ fontSize: 14.5, lineHeight: 1.65, color: "#3d5a60" }}>"{t.t}"</blockquote>
                <figcaption style={{ display: "flex", alignItems: "center", gap: 12, marginTop: "auto" }}>
                  <img src={t.a} alt={t.n} style={{ width: 46, height: 46, borderRadius: "50%", objectFit: "cover", border: `2px solid ${MINT2}` }} />
                  <span><strong style={{ fontSize: 14.5 }}>{t.n}</strong><br /><span style={{ fontSize: 12.5, color: "#33555b" }}>{t.r}</span></span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* cta */}
      <section style={{ background: TE, padding: "64px 0", color: "#fff" }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 40, alignItems: "center" }}>
          <div>
            <h2 style={{ textAlign: "left", color: "#fff" }}>Pronto para cuidar da sua saúde?</h2>
            <p style={{ color: MINT2, fontSize: 15.5, lineHeight: 1.7, margin: "14px 0 22px" }}>Agende sua avaliação gratuita agora e dê o primeiro passo para uma vida em movimento.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {["Avaliação inicial gratuita", "Resposta em até 1h via WhatsApp", "Horários flexíveis Seg a Sáb", "Resposta em até 1h"].map((t) => (
                <span key={t} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13.5, fontWeight: 600 }}><Ic d={CHECK} s={15} c="#ffd166" />{t}</span>
              ))}
            </div>
          </div>
          <div style={{ background: "#fff", borderRadius: 22, padding: "26px 24px", color: INK, boxShadow: "0 24px 60px -24px rgba(0,0,0,.4)" }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, textAlign: "center", marginBottom: 16 }}>Agende agora</h3>
            <label style={{ fontSize: 13, fontWeight: 700, display: "block", marginBottom: 6 }}>Nome completo</label>
            <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Digite seu nome" style={{ width: "100%", minHeight: 48, padding: "0 15px", border: `1.5px solid ${MINT2}`, borderRadius: 12, fontSize: 15, fontFamily: "inherit", marginBottom: 12 }} />
            <label style={{ fontSize: 13, fontWeight: 700, display: "block", marginBottom: 6 }}>Telefone / WhatsApp</label>
            <input value={zap} onChange={(e) => setZap(e.target.value)} placeholder="(31) 99999-9999" style={{ width: "100%", minHeight: 48, padding: "0 15px", border: `1.5px solid ${MINT2}`, borderRadius: 12, fontSize: 15, fontFamily: "inherit", marginBottom: 12 }} />
            <label style={{ fontSize: 13, fontWeight: 700, display: "block", marginBottom: 6 }}>Tratamento de interesse</label>
            <select value={trat} onChange={(e) => setTrat(e.target.value)} style={{ width: "100%", minHeight: 48, padding: "0 15px", border: `1.5px solid ${MINT2}`, borderRadius: 12, fontSize: 15, fontFamily: "inherit", marginBottom: 18, background: "#fff" }}>
              {TREATS.map((t) => <option key={t.t}>{t.t}</option>)}
            </select>
            <a href={wa} target="_blank" rel="noreferrer" className="btn-t" style={{ display: "flex", justifyContent: "center", width: "100%" }}><Ic d={CAL} s={19} c="#fff" />Agendar agora</a>
            <p style={{ fontSize: 12, color: "#33555b", textAlign: "center", marginTop: 12 }}>*Retornamos em até 1 hora no horário comercial</p>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer id="cont" style={{ background: DK, color: "#cfe6e3", padding: "52px 0 0" }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 32, paddingBottom: 36 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span style={{ width: 38, height: 38, borderRadius: 12, background: TE3, display: "grid", placeItems: "center" }}><Ic d="M16 5c-4 5-8 7-8 12a8 8 0 0 0 16 0c0-5-4-7-8-12zm0 19v-9" s={22} c="#fff" /></span>
              <span style={{ lineHeight: 1.1, color: "#fff" }}><strong style={{ fontSize: 16.5, fontWeight: 800 }}>{brand}</strong><br /><span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 2.5, color: TE3 }}>FISIOTERAPIA</span></span>
            </div>
            <p style={{ fontSize: 13.5, lineHeight: 1.65, opacity: .8 }}>Cuidando da sua saúde e movimento com profissionais qualificados.</p>
          </div>
          <div>
            <h4 style={{ color: "#fff", fontSize: 15, fontWeight: 800, marginBottom: 14 }}>Contato</h4>
            <p style={{ fontSize: 13.5, lineHeight: 2 }}>Rua das Flores, 320 — Savassi, {city}<br />(31) 98765-4321<br />contato@{(brand.split(" ")[0] ?? "daniela").toLowerCase()}fisio.com.br</p>
          </div>
          <div>
            <h4 style={{ color: "#fff", fontSize: 15, fontWeight: 800, marginBottom: 14 }}>Siga-nos</h4>
            <div style={{ display: "flex", gap: 12 }}>
              <a href={wa} target="_blank" rel="noreferrer" style={{ background: TE3, color: "#fff", padding: "10px 18px", borderRadius: 999, fontSize: 13.5, fontWeight: 700, textDecoration: "none" }}>Whatsapp</a>
              <a href="https://maps.google.com/?q=Savassi,Belo+Horizonte" target="_blank" rel="noreferrer" style={{ border: "1.5px solid #2c5257", color: "#cfe6e3", padding: "10px 18px", borderRadius: 999, fontSize: 13.5, fontWeight: 700, textDecoration: "none" }}>Como chegar</a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #1d454a", padding: "18px 0", textAlign: "center", fontSize: 12.5, opacity: .7 }}>© 2026 {brand} · Todos os direitos reservados · Política de Privacidade · Termos de Uso</div>
      </footer>
    </div>
  );
}
