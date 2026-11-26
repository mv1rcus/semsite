import React, { useState } from "react";

const BG = "#0c1f2b";
const BG2 = "#10303d";
const TEAL = "#22d3be";
const TEALD = "#0ea89a";
const LIGHT = "#f3f7f8";
const CARD = "#ffffff";
const INK = "#0e2a35";
const MUT = "#5b7a85";
const MUTD = "#9fc0c8";
const LINE = "rgba(34,211,190,.16)";
const serif = "'Playfair Display', Georgia, serif";
const sans = "'Jost', 'Inter', sans-serif";

const PATHS: Record<string, string[]> = {
  dente: ["M10 4c-2.6 0-4.5 2-4.5 4.8 0 1.8.7 3 1.2 4.4.6 1.4.9 3 1.2 5 .2 1.3.7 3.8 2 3.8 1.5 0 1.3-3 1.8-5 .3-1.1.8-2.2 1.8-2.2s1.5 1.1 1.8 2.2c.5 2 .3 5 1.8 5 1.3 0 1.8-2.5 2-3.8.3-2 .6-3.6 1.2-5 .5-1.4 1.2-2.6 1.2-4.4 0-2.8-1.9-4.8-4.5-4.8-1.7 0-2.6.8-3.5.8s-1.8-.8-3.5-.8Z"],
  espelho: ["M14 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z", "M12 8.5c-1.6.4-2.8 1.6-3.3 3.2", "M19 19l6 6"],
  alinhador: ["M6 12c0-4 3.6-7 8-7s8 3 8 7c0 1.5-.5 2.6-1.2 3.6-1 1.4-2.6 2.4-4.3 2.4h-5c-1.7 0-3.3-1-4.3-2.4C6.5 14.6 6 13.5 6 12Z", "M9 12.5c1.2 1.2 3 2 5 2s3.8-.8 5-2"],
  implante: ["M9 4h10", "M10 8h8", "M11 12h6", "M11.8 16h4.4", "M12 4c0 9 .6 14 3 18 2.4-4 3-9 3-18"],
  faceta: ["M8 6c-1.8 0-3 1.5-3 3.5 0 1.3.5 2.2.9 3.2.4 1 .6 2.2.8 3.6.1 1 .5 2.7 1.4 2.7 1.1 0 1-2.2 1.3-3.6.2-.8.6-1.6 1.3-1.6s1.1.8 1.3 1.6c.3 1.4.2 3.6 1.3 3.6.9 0 1.3-1.7 1.4-2.7.2-1.4.4-2.6.8-3.6.4-1 .9-1.9.9-3.2 0-2-1.2-3.5-3-3.5-1.2 0-1.8.6-2.4.6S9.2 6 8 6Z", "M19 4l1.2 2.8L23 8l-2.8 1.2L19 12l-1.2-2.8L15 8l2.8-1.2Z"],
  escudo: ["M14 4l8 3v6c0 5-3.4 9.4-8 11-4.6-1.6-8-6-8-11V7Z", "M10.5 13.5l2.5 2.5 4.5-5"],
  escudo2: ["M16 3l10 3.6V14c0 6.2-4.2 11.6-10 14-5.8-2.4-10-7.8-10-14V6.6Z", "M11.5 15l3.5 3.5 6-7"],
  pessoas: ["M11 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z", "M3 25c.8-5 4-7 8-7s7.2 2 8 7", "M21 13.5a3.2 3.2 0 1 0-1.5-6", "M23 18.5c2.8.7 4.8 2.7 5.4 6"],
  estrela: ["M14 3l3.2 7 7.5.8-5.6 5.1 1.5 7.4L14 19.8l-6.6 3.5 1.5-7.4L3.3 10.8l7.5-.8Z"],
  cal: ["M6 5h16a1.5 1.5 0 0 1 1.5 1.5v15A1.5 1.5 0 0 1 22 23H6a1.5 1.5 0 0 1-1.5-1.5v-15A1.5 1.5 0 0 1 6 5Z", "M4.5 11h19", "M10 3v4", "M18 3v4", "M10.5 16.5l2.3 2.3 4.2-4.3"],
  check: ["M5 15l6 6L25 8"],
  play: ["M11 8l12 7-12 7Z"],
  fone: ["M7 15a9 9 0 0 1 18 0", "M7 15v5a2 2 0 0 0 2 2h2v-8H9a2 2 0 0 0-2 1Z", "M25 15v5a2 2 0 0 1-2 2h-2v-8h2a2 2 0 0 1 2 1Z"],
  seta: ["M6 14h18", "M17 7l7 7-7 7"],
  pin: ["M14 26s-8-7.6-8-13a8 8 0 1 1 16 0c0 5.4-8 13-8 13Z", "M14 15.5a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6Z"],
};

const Ic = ({ k, s = 24, c = "currentColor", w = 1.8 }: { k: string; s?: number; c?: string; w?: number }) => (
  <svg width={s} height={s} viewBox="0 0 28 28" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    {(PATHS[k as keyof typeof PATHS] || []).map((d, i) => <path key={i} d={d} />)}
  </svg>
);

const Estrelas = ({ s = 14 }: { s?: number }) => (
  <span style={{ display: "inline-flex", gap: 3 }}>
    {[0, 1, 2, 3, 4].map((i) => (
      <svg key={i} width={s} height={s} viewBox="0 0 28 28" fill={TEAL} stroke="none" aria-hidden><path d={(PATHS["estrela"] || [""])[0]} /></svg>
    ))}
  </span>
);

export function LuminaFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Lumina Odontologia";
  const city = client?.city?.trim() || "São Paulo";
  const phone = (client?.whatsapp || "5511999999999").replace(/\D/g, "");
  const wa = (t: string) => `https://wa.me/${phone}?text=${encodeURIComponent(t)}`;
  const [imgOk, setImgOk] = useState<Record<string, boolean>>({});
  const ok = (k: string) => () => setImgOk((m) => ({ ...m, [k]: true }));
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const Ph = ({ src, alt, ratio, k, pos }: { src: string; alt: string; ratio: string; k: string; pos?: string }) => (
    <div style={{ position: "relative", aspectRatio: ratio, background: `linear-gradient(160deg, ${BG2}, ${BG})`, overflow: "hidden", width: "100%" }}>
      <img src={src} alt={alt} loading="lazy" onLoad={ok(k)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: pos || "center", display: "block", opacity: imgOk[k] ? 1 : 0, transition: "opacity .4s" }} />
    </div>
  );

  const servicos = [
    { ic: "espelho", t: "Clínica geral", d: "Limpeza, restaurações e check-ups completos pra manter a saúde do seu sorriso em dia." },
    { ic: "alinhador", t: "Alinhamento invisível", d: "Alinhadores transparentes e sob medida pra corrigir o sorriso sem aparelho aparente." },
    { ic: "implante", t: "Implantes dentários", d: "Reposição de dentes com implantes de titânio e planejamento digital 3D." },
    { ic: "faceta", t: "Estética do sorriso", d: "Facetas, lentes de contato dental e clareamento pra um sorriso natural e harmônico." },
    { ic: "escudo2", t: "Prevenção", d: "Acompanhamento contínuo, profilaxia e orientação pra evitar problemas antes que apareçam." },
  ];

  const depoimentos = [
    { q: "A melhor experiência que já tive em dentista. A equipe é gentil, profissional e se importa de verdade com o nosso conforto.", n: "Mariana P." },
    { q: "O Dr. Rafael explicou cada etapa com clareza e o processo foi muito mais tranquilo do que eu imaginava. Meu sorriso nunca esteve tão bonito.", n: "Carlos E." },
    { q: "Clínica moderna, limpa e com uma equipe incrível. Recomendo a Lumina pra qualquer pessoa que busca cuidado odontológico de qualidade.", n: "Beatriz L." },
  ];

  return (
    <div className="lumina" style={{ background: BG, color: "#eaf6f6", fontFamily: sans }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        
        .lumina .wrap{max-width:1240px;margin:0 auto;padding:0 28px}
        .lumina .kick{color:${TEAL};font-size:12.5px;letter-spacing:.32em;font-weight:600}
        .lumina .pill-g{display:inline-flex;align-items:center;gap:10px;background:linear-gradient(180deg,${TEAL},${TEALD});color:#052b28;font-weight:700;font-size:15px;letter-spacing:.04em;padding:16px 34px;border-radius:999px;border:0;cursor:pointer;text-decoration:none;box-shadow:0 12px 32px rgba(34,211,190,.28)}
        .lumina .pill-o{display:inline-flex;align-items:center;gap:8px;background:rgba(34,211,190,.08);color:${TEAL};font-weight:600;font-size:14px;padding:12px 22px;border-radius:999px;border:1px solid rgba(34,211,190,.35);text-decoration:none}
        .lumina .h2{font-family:${sans};font-weight:800;font-size:clamp(30px,4.4vw,50px);letter-spacing:-.02em;line-height:1.08;margin:14px 0 12px}
        .lumina .sub{color:${MUT};font-size:16.5px;line-height:1.65;max-width:620px}
        .lumina .card{background:${CARD};border-radius:18px;padding:30px 26px 26px;box-shadow:0 18px 46px rgba(10,30,40,.10);border:1px solid #e4eef0}
        .lumina .nav-a{background:none;border:0;color:#d7ecec;font:inherit;font-size:15px;cursor:pointer;padding:6px 2px}
        .lumina .nav-a:hover{color:${TEAL}}
        .lumina .grid2{display:grid;gap:56px;align-items:center}
        .lumina .checkitem{display:flex;gap:12px;align-items:center;font-size:15.5px;color:#eaf6f6}
        @media (max-width: 860px){
          .lumina .grid2{grid-template-columns:1fr !important;gap:36px !important}
          .lumina .nav-c{display:none !important}
          .lumina .cards5{grid-template-columns:1fr !important}
          .lumina .cards3{grid-template-columns:1fr !important}
          .lumina .feats{grid-template-columns:1fr !important;gap:18px !important}
          .lumina .hero-ph{position:relative !important;right:auto !important;bottom:auto !important;width:100% !important;height:340px !important}
          .lumina .hero-curve{height:42px !important}
          .lumina #topo .wrap{padding-top:120px !important;padding-bottom:26px !important;min-height:0 !important}
          .lumina header .pill-o{display:none !important}
          .lumina header .pill-g{padding:10px 18px !important;font-size:13px !important}
          .lumina .stats{grid-template-columns:1fr 1fr !important;gap:26px !important}
        }
        @media (min-width: 861px){
          .lumina .hero-ph{position:absolute;top:0;right:0;bottom:0;width:56%}
          .lumina .cards5{display:grid;grid-template-columns:repeat(5,1fr);gap:18px}
          .lumina .cards3{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
          .lumina .feats{display:grid;grid-template-columns:repeat(3,1fr);gap:30px}
          .lumina .stats{display:grid;grid-template-columns:1fr;gap:30px}
        }
      `}</style>

      {/* HEADER */}
      <header style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 20, padding: "20px 0" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 40, height: 40, borderRadius: 12, background: `linear-gradient(180deg, ${TEAL}, ${TEALD})`, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Ic k="dente" s={24} c="#052b28" w={2} /></span>
            <span style={{ lineHeight: 1.05 }}>
              <span style={{ display: "block", fontWeight: 800, fontSize: 21, letterSpacing: "-.01em", color: "#fff" }}>Lumina</span>
              <span style={{ display: "block", fontSize: 10, letterSpacing: ".3em", color: TEAL, fontWeight: 600 }}>ODONTOLOGIA</span>
            </span>
          </span>
          <nav className="nav-c" style={{ display: "flex", gap: 32 }}>
            {["Início", "Sobre", "Serviços", "Avaliações", "Contato"].map((l, i) => (
              <button key={l} className="nav-a" onClick={() => go(["topo", "dentista", "servicos", "depoimentos", "agendar"][i] || "topo")}>{l}</button>
            ))}
          </nav>
          <span style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <a className="pill-o" href={wa("Olá! Vim pelo site da Lumina Odontologia.")} target="_blank" rel="noreferrer" style={{ padding: "10px 18px" }}><Ic k="fone" s={15} c={TEAL} w={2} /> Fale conosco</a>
            <a className="pill-g" href={wa("Olá! Quero agendar uma avaliação na Lumina Odontologia.")} target="_blank" rel="noreferrer" style={{ padding: "12px 24px", fontSize: 14 }}>Agendar avaliação <Ic k="seta" s={15} c="#052b28" w={2.2} /></a>
          </span>
        </div>
      </header>

      {/* HERO */}
      <section id="topo" style={{ position: "relative", overflow: "hidden", background: `radial-gradient(1100px 560px at 82% 18%, rgba(34,211,190,.12), transparent 62%), linear-gradient(160deg, ${BG2} 0%, ${BG} 55%)` }}>
        <div className="wrap grid2" style={{ gridTemplateColumns: "1.02fr .98fr", minHeight: 780, paddingTop: 150, paddingBottom: 130, position: "relative", zIndex: 2 }}>
          <div>
            <p className="kick">ODONTOLOGIA MODERNA</p>
            <h1 style={{ fontWeight: 800, fontSize: "clamp(40px,5.6vw,66px)", letterSpacing: "-.025em", lineHeight: 1.04, margin: "16px 0 18px", color: "#fff" }}>
              Sorrisos saudáveis<br /><span style={{ color: TEAL }}>pra vida toda.</span>
            </h1>
            <p className="sub" style={{ color: MUTD, marginBottom: 30 }}>Cuidado odontológico avançado, gentil e personalizado pra toda a família, num ambiente confortável, moderno e acolhedor.</p>
            <div style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap", marginBottom: 44 }}>
              <a className="pill-g" href={wa("Olá! Quero agendar uma avaliação na Lumina Odontologia.")} target="_blank" rel="noreferrer">Agendar avaliação <Ic k="seta" s={16} c="#052b28" w={2.2} /></a>
              <a href={wa("Olá! Quero conhecer a clínica antes de agendar.")} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "#eaf6f6", textDecoration: "none", fontSize: 15.5, fontWeight: 600 }}>
                <span style={{ width: 44, height: 44, borderRadius: "50%", border: `1.5px solid ${TEAL}`, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Ic k="play" s={15} c={TEAL} w={2} /></span>
                Tour pela clínica
              </a>
            </div>
            <div className="feats">
              {[["escudo2", "Tratamentos sem dor"], ["faceta", "Tecnologia de ponta"], ["pessoas", "Para toda a família"]].map(([ic, t]) => (
                <div key={t as string} style={{ display: "flex", gap: 12, alignItems: "center", borderTop: `1px solid ${LINE}`, paddingTop: 18 }}>
                  <Ic k={ic as string} s={26} c={TEAL} w={1.7} />
                  <span style={{ fontSize: 14.5, fontWeight: 600, color: "#d7ecec", lineHeight: 1.3 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div aria-hidden />
        </div>
        <div className="hero-ph">
          <img src="/odo-hero.jpg" alt="Consultório odontológico moderno com letreiro neon de dente" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "58% 50%" }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, rgba(8,24,32,.62) 0%, transparent 24%), linear-gradient(90deg, ${BG} 0%, rgba(8,24,32,.55) 22%, transparent 55%)` }} />
          <div style={{ position: "absolute", left: 88, bottom: 108, background: "rgba(8,24,32,.82)", backdropFilter: "blur(6px)", borderRadius: 14, padding: "13px 18px", display: "flex", gap: 12, alignItems: "center", border: `1px solid ${LINE}` }}>
            <Ic k="pin" s={22} c={TEAL} w={1.8} />
            <span style={{ fontSize: 13.5, lineHeight: 1.35, color: "#d7ecec" }}>Av. Paulista, 1000 · Bela Vista<br />{city}</span>
          </div>
        </div>
        <svg className="hero-curve" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden style={{ position: "absolute", bottom: -1, left: 0, width: "100%", height: 90, display: "block" }}>
          <path d="M0 90 C 420 4 1020 4 1440 90 L1440 90 L0 90 Z" fill={LIGHT} />
        </svg>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" style={{ background: LIGHT, color: INK, padding: "96px 0 100px" }}>
        <div className="wrap">
          <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 54px" }}>
            <p className="kick">NOSSOS SERVIÇOS</p>
            <h2 className="h2" style={{ color: INK }}>Cuidado odontológico <span style={{ color: TEALD }}>completo</span></h2>
            <p className="sub" style={{ margin: "0 auto" }}>Da limpeza de rotina aos tratamentos avançados, seu sorriso coberto do início ao fim.</p>
          </div>
          <div className="cards5">
            {servicos.map((sv) => (
              <div key={sv.t} className="card" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <span style={{ width: 60, height: 60, borderRadius: 16, background: `linear-gradient(160deg, rgba(34,211,190,.16), rgba(14,168,154,.08))`, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Ic k={sv.ic} s={30} c={TEALD} w={1.7} /></span>
                <strong style={{ fontSize: 16.5, letterSpacing: "-.01em" }}>{sv.t}</strong>
                <span style={{ fontSize: 13.8, lineHeight: 1.6, color: MUT, flex: 1 }}>{sv.d}</span>
                <a href={wa(`Olá! Quero saber mais sobre ${sv.t.toLowerCase()} na Lumina Odontologia.`)} target="_blank" rel="noreferrer" style={{ width: 38, height: 38, borderRadius: "50%", border: `1.5px solid ${TEALD}`, display: "inline-flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}><Ic k="seta" s={15} c={TEALD} w={2.2} /></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DENTISTA */}
      <section id="dentista" style={{ background: `linear-gradient(150deg, ${BG2}, ${BG})`, padding: "100px 0" }}>
        <div className="wrap grid2" style={{ gridTemplateColumns: ".92fr 1.08fr" }}>
          <div style={{ position: "relative" }}>
            <div aria-hidden style={{ position: "absolute", inset: "6% -4% -4% 8%", background: `linear-gradient(150deg, ${TEALD}, ${TEAL})`, opacity: .18, borderRadius: 24, transform: "rotate(-3deg)" }} />
            <div style={{ position: "relative", borderRadius: 22, overflow: "hidden", boxShadow: "0 34px 80px rgba(0,0,0,.5)" }}>
              <Ph src="/odo-dentista.jpg" alt="Dr. Rafael Monteiro sorrindo de jaleco no consultório" ratio="4/4.6" k="dr" />
              <div style={{ position: "absolute", right: 16, bottom: 16, background: "rgba(8,24,32,.85)", borderRadius: 13, padding: "10px 16px", border: `1px solid ${LINE}`, display: "flex", gap: 9, alignItems: "center" }}>
                <Estrelas s={13} />
                <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>4.9/5</span>
              </div>
            </div>
          </div>
          <div>
            <p className="kick">CONHEÇA SEU DENTISTA</p>
            <h2 className="h2" style={{ color: "#fff" }}>Dr. Rafael Monteiro</h2>
            <p style={{ color: TEAL, fontWeight: 600, fontSize: 16, margin: "0 0 18px" }}>Odontologia estética e implantes</p>
            <p className="sub" style={{ color: MUTD, maxWidth: 560, marginBottom: 28 }}>Com mais de 10 anos de experiência, o Dr. Rafael se dedica a um cuidado odontológico confortável e de alta qualidade, com foco em saúde bucal duradoura e sorrisos bonitos e naturais.</p>
            <div style={{ display: "grid", gap: 14, marginBottom: 40 }}>
              {["Cuidado gentil focado no paciente", "Especialista em estética e implantes", "Tratamento moderno baseado em evidências"].map((t) => (
                <div key={t} className="checkitem">
                  <span style={{ width: 26, height: 26, borderRadius: "50%", background: `linear-gradient(180deg, ${TEAL}, ${TEALD})`, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Ic k="check" s={14} c="#052b28" w={2.6} /></span>
                  {t}
                </div>
              ))}
            </div>
            <div className="stats" style={{ borderTop: `1px solid ${LINE}`, paddingTop: 32 }}>
              {[["10+", "anos de experiência", "pessoas"], ["2.500+", "pacientes atendidos", "dente"], ["4.9/5", "avaliação dos pacientes", "estrela"]].map(([v, l, ic]) => (
                <div key={l as string} style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <Ic k={ic as string} s={30} c={TEAL} w={1.6} />
                  <span><strong style={{ display: "block", fontSize: 26, letterSpacing: "-.02em", color: "#fff" }}>{v}</strong><span style={{ fontSize: 13.5, color: MUTD }}>{l}</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section id="depoimentos" style={{ background: LIGHT, color: INK, padding: "96px 0 100px" }}>
        <div className="wrap">
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 52px" }}>
            <p className="kick">HISTÓRIAS DE PACIENTES</p>
            <h2 className="h2" style={{ color: INK }}>O que dizem nossos <span style={{ color: TEALD }}>pacientes</span></h2>
          </div>
          <div className="cards3">
            {depoimentos.map((d) => (
              <div key={d.n} className="card" style={{ padding: "34px 30px 28px" }}>
                <span style={{ fontFamily: serif, fontSize: 58, lineHeight: .6, color: TEAL, display: "block", marginBottom: 18 }}>&ldquo;</span>
                <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "#274a55", margin: "0 0 24px", minHeight: 104 }}>{d.q}</p>
                <div style={{ display: "flex", gap: 13, alignItems: "center" }}>
                  <span style={{ width: 46, height: 46, borderRadius: "50%", background: `linear-gradient(150deg, ${TEAL}, ${TEALD})`, color: "#052b28", fontWeight: 800, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{d.n[0]}</span>
                  <span>
                    <strong style={{ display: "block", fontSize: 15 }}>{d.n}</strong>
                    <Estrelas s={13} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AGENDAR */}
      <section id="agendar" style={{ position: "relative", background: `radial-gradient(900px 460px at 18% 20%, rgba(34,211,190,.14), transparent 60%), linear-gradient(150deg, ${BG2}, ${BG})`, padding: "104px 0" }}>
        <div className="wrap grid2" style={{ gridTemplateColumns: "1.05fr .95fr" }}>
          <div>
            <p className="kick">AGENDE SUA VISITA</p>
            <h2 className="h2" style={{ color: "#fff" }}>Agende sua consulta <span style={{ color: TEAL }}>hoje.</span></h2>
            <p className="sub" style={{ color: MUTD, marginBottom: 34 }}>Dê o primeiro passo pra um sorriso mais saudável e bonito. Leva só um minuto: chama no WhatsApp e a equipe encontra o melhor horário pra você.</p>
            <div style={{ display: "grid", gap: 16, maxWidth: 430 }}>
              {[["check", "Resposta rápida em horário comercial"], ["cal", "Horários flexíveis, inclusive sábado"], ["escudo2", "Atendimento particular e principais convênios"]].map(([ic, t]) => (
                <div key={t as string} className="checkitem">
                  <Ic k={ic as string} s={22} c={TEAL} w={1.8} />
                  <span style={{ color: "#d7ecec" }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,.04)", border: `1px solid ${LINE}`, borderRadius: 24, padding: "44px 40px", backdropFilter: "blur(4px)", alignSelf: "center" }}>
            <span style={{ width: 66, height: 66, borderRadius: 18, background: `linear-gradient(180deg, ${TEAL}, ${TEALD})`, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 22 }}><Ic k="dente" s={36} c="#052b28" w={1.9} /></span>
            <h3 style={{ fontSize: 25, fontWeight: 800, letterSpacing: "-.015em", color: "#fff", margin: "0 0 10px" }}>Fale com a Lumina</h3>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: MUTD, margin: "0 0 28px" }}>Conta pra gente o que você precisa — avaliação, limpeza, estética ou urgência — e já deixamos sua consulta pré-agendada.</p>
            <a className="pill-g" href={wa("Olá! Quero agendar uma consulta na Lumina Odontologia.")} target="_blank" rel="noreferrer" style={{ width: "100%", justifyContent: "center", boxSizing: "border-box" }}>Agendar pelo WhatsApp <Ic k="seta" s={16} c="#052b28" w={2.2} /></a>
            <p style={{ fontSize: 13, color: MUTD, margin: "18px 0 0", textAlign: "center" }}>Av. Paulista, 1000 · Bela Vista · {city} · Seg a Sáb, 8h às 19h</p>
          </div>
        </div>
        <div className="wrap" style={{ marginTop: 84, borderTop: `1px solid ${LINE}`, paddingTop: 28, display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 14, color: MUTD }}>
            <Ic k="dente" s={20} c={TEAL} w={1.8} /> {brand} · Cuidado odontológico completo
          </span>
          <span style={{ fontSize: 13.5, color: MUTD }}>Feito com carinho em {city}</span>
        </div>
      </section>
    </div>
  );
}

export default LuminaFold;
