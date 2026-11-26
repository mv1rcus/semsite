import { useEffect } from "react";

/** Clínica de acupuntura, refeita à risca do pin: hero navy com foto da mão em acupuntura e círculos de linha dourada, seção pêssego com 6 ícones de linha, depoimento centralizado e formulário de contato escuro. Agendamento que fecha no WhatsApp. */
const NV = "#12294d", NV2 = "#0c1d38", GD = "#c9a45c", CRM = "#f7f3ea", CRM2 = "#ece4d0", INK = "#1d2433", GR = "#46506a";
const PEACH = "#f5e2c4", PEACH_TXT = "#6d6046";
const INDIC = [
  { t: "Dor física", d: "Dor crônica, lombar, cervical e muscular tratada no ponto de origem, com protocolo individual por ciclo.", i: "M8 15V7a2 2 0 1 1 4 0v7m0-4a2 2 0 1 1 4 0v4m0-3a2 2 0 1 1 4 0v5m0-2a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-1a8 8 0 0 1-8-8v-3a2 2 0 1 1 4 0" },
  { t: "Distúrbios de pele", d: "Eczema, psoríase e alergias tratados pela regulação interna que a medicina chinesa faz do organismo.", i: "M11 5c2.4 3.4 4.6 5.6 4.6 8a4.6 4.6 0 1 1-9.2 0c0-2.4 2.2-4.6 4.6-8zM22 12c1.7 2.4 3.2 4 3.2 5.7a3.2 3.2 0 1 1-6.4 0c0-1.7 1.5-3.3 3.2-5.7z" },
  { t: "Acupuntura estética", d: "Estímulo de colágeno e circulação facial para firmeza e viço, sem procedimentos invasivos.", i: "M16 5l2.2 6.3 6.3 2.2-6.3 2.2L16 22l-2.2-6.3-6.3-2.2 6.3-2.2zM24 22l.9 2.4 2.4.9-2.4.9-.9 2.4-.9-2.4-2.4-.9 2.4-.9z" },
  { t: "Cabeça, olhos, ouvidos e garganta", d: "Enxaqueca, vertigem, zumbido e sinusite com pontos sistêmicos e auriculoterapia combinada.", i: "M10 6a6 6 0 0 1 12 4c0 4-3 5-5 8s-2 6-6 6-6-4-6-8V6m5 5a3 3 0 0 1 6 2c0 2-2 2.5-2 4.5" },
  { t: "Recuperação pós-cirúrgica", d: "Cicatrização, edema e dor pós-operatória com estímulo suave que acelera a recuperação.", i: "M16 27V13m0 1c-5 0-8.5-3-8.5-8.5C13 5.5 16 8.5 16 14zm0 0c5 0 8.5-3 8.5-8.5C19 5.5 16 8.5 16 14z" },
  { t: "Controle de peso", d: "Ansiedade, compulsão e metabolismo tratados em conjunto, com suporte entre as sessões.", i: "M16 27c0-7 0-14 0-21m0 5c-4.5 0-7.5-2.5-8-7 4.5 0 7.5 2.5 8 7zm0 5c4.5 0 7.5-2.5 8-7-4.5 0-7.5 2.5-8 7z" },
];
const Ic = ({ d, s = 22, c = "currentColor" }: { d: string; s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);

export function AcuFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Clínica Meridian";
  const city = client?.city?.trim() || "Porto Alegre";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const wa = (m: string) => `https://wa.me/${phone || "5551999999999"}?text=${encodeURIComponent(m)}`;
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const serif = "'Cormorant Garamond', Georgia, serif";
  useEffect(() => {
    const l = document.createElement("link");
    l.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400..700;1,400..700&family=Jost:wght@300..700&display=swap";
    l.rel = "stylesheet"; document.head.appendChild(l);
  }, []);
  return (
    <div className="acu" style={{ fontFamily: "'Jost', system-ui, sans-serif", color: INK, background: CRM, overflowX: "hidden" }}>
      <style>{`
        body{background:#0c1d38}
        .acu h1,.acu h2,.acu h3{font-family:${serif}!important;font-weight:600;letter-spacing:0;text-decoration:none!important}
        .acu blockquote,.acu figure{margin:0}
        .acu .wrap{max-width:1140px;margin:0 auto;padding:0 28px}
        .acu .btn{display:inline-flex;align-items:center;gap:10px;background:${GD};color:${NV2};font-weight:600;font-size:15px;padding:16px 30px;border-radius:8px;text-decoration:none;border:none;cursor:pointer;transition:.2s;letter-spacing:.4px}
        .acu .btn:hover{background:#d8b772;transform:translateY(-2px)}
        .acu .btn-w{display:inline-flex;align-items:center;gap:10px;background:#fff;color:${NV};font-weight:600;font-size:13px;letter-spacing:2px;text-transform:uppercase;padding:17px 34px;border-radius:2px;text-decoration:none;border:none;cursor:pointer;transition:.2s}
        .acu .btn-w:hover{background:${CRM2}}
        .acu .btn-n{display:inline-flex;align-items:center;gap:10px;background:${NV};color:#fff;font-weight:600;font-size:13px;letter-spacing:2px;text-transform:uppercase;padding:17px 34px;border-radius:2px;text-decoration:none;border:none;cursor:pointer;transition:.2s}
        .acu .btn-n:hover{background:${NV2}}
        .acu .dots{background-image:radial-gradient(rgba(201,164,92,.3) 1.3px, transparent 1.3px);background-size:22px 22px}
        .acu .ring{position:absolute;border-radius:50%;border:1px solid rgba(201,164,92,.4);pointer-events:none}
        .acu .vtext{writing-mode:vertical-rl;letter-spacing:4px;font-size:11px;font-weight:600;text-transform:uppercase;color:rgba(255,255,255,.55)}
        .acu .field{background:none;border:none;border-bottom:1px solid rgba(255,255,255,.3);color:#fff;font:inherit;font-size:14.5px;padding:12px 2px;outline:none;width:100%}
        .acu .field::placeholder{color:rgba(255,255,255,.45)}
        .acu .field:focus{border-bottom-color:${GD}}
        @media (max-width:560px){ .acu .peach-pad{padding:48px 26px!important} }
        @media (max-width:900px){
          .acu .hero-g{grid-template-columns:1fr!important}
          .acu .hero-art{min-height:380px!important}
          .acu .vtext{display:none!important}
          .acu .desk-nav{display:none!important}
          .acu .grid2{grid-template-columns:1fr!important}
        }
      `}</style>

      {/* header */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: NV, borderBottom: "1px solid rgba(201,164,92,.25)" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 28px" }}>
          <span style={{ fontFamily: serif, fontSize: 24, color: "#fff" }}>{brand}<span style={{ color: GD }}>.</span></span>
          <nav style={{ display: "flex", gap: 26, fontSize: 13, fontWeight: 500, letterSpacing: 1.6, textTransform: "uppercase", color: "rgba(255,255,255,.72)" }} className="desk-nav">
            {[["Indicações", "indic"], ["Especialista", "sobre"], ["Contato", "contato"]].map(([n, id]) => <a key={n} onClick={() => go(id ?? "")} style={{ cursor: "pointer" }}>{n}</a>)}
          </nav>
          <a href={wa("Olá! Quero agendar uma avaliação na " + brand + ".")} className="btn" style={{ padding: "11px 22px", fontSize: 13.5 }}>Agendar avaliação</a>
        </div>
      </header>

      {/* hero: navy, foto da mão à direita, círculos de linha e pontilhados dourados */}
      <section style={{ position: "relative", padding: "96px 0 104px", background: `linear-gradient(165deg, ${NV} 0%, ${NV2} 100%)`, color: "#fff", overflow: "hidden" }}>
        <div className="ring" style={{ width: 340, height: 340, top: -130, right: -90 }} />
        <div className="ring" style={{ width: 340, height: 340, top: -104, right: -116 }} />
        <div className="ring" style={{ width: 150, height: 150, bottom: 42, left: "47%", opacity: .6 }} />
        <div className="dots" style={{ position: "absolute", width: 150, height: 190, top: 70, left: "44%", opacity: .55 }} />
        <div className="dots" style={{ position: "absolute", width: 120, height: 150, bottom: 60, left: 26, opacity: .4 }} />
        <div className="wrap hero-g" style={{ position: "relative", display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: 56, alignItems: "center" }}>
          <div>
            <h1 style={{ fontSize: "clamp(46px,6vw,78px)", lineHeight: 1.02, margin: "0 0 22px" }}>
              Acupuntura<br />Saúde &amp; Equilíbrio
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,.72)", maxWidth: 440, marginBottom: 34 }}>
              Medicina tradicional chinesa com rigor clínico: acupuntura, ventosa, Tui Na e fitoterapia para dor, ansiedade e sono, sem depender de remédio.
            </p>
            <a className="btn-w" href={wa("Olá! Quero agendar uma avaliação na " + brand + ".")}>Agendar avaliação</a>
          </div>
          <div className="hero-art" style={{ position: "relative", minHeight: 460 }}>
            <div className="ring" style={{ width: 210, height: 210, top: -34, right: -24 }} />
            <img src="/meridian-mao.jpg" alt={"Mão de paciente em sessão de acupuntura na " + brand} style={{ width: "100%", height: 460, objectFit: "cover", objectPosition: "center 30%", border: "1px solid rgba(201,164,92,.45)", boxShadow: "0 34px 70px -34px rgba(0,0,0,.6)", display: "block" }} />
            <span className="vtext" style={{ position: "absolute", right: -34, bottom: 20 }}>Tratamentos →</span>
            <div className="dots" style={{ position: "absolute", width: 110, height: 140, bottom: -30, left: -30, opacity: .5 }} />
            <span style={{ position: "absolute", bottom: -8, left: "38%", width: 12, height: 12, borderRadius: "50%", border: `2px solid ${GD}`, opacity: .8 }} />
          </div>
        </div>
      </section>

      {/* indicações: painel pêssego, 6 ícones de linha em 2 colunas */}
      <section id="indic" style={{ background: CRM, padding: "84px 0" }}>
        <div className="wrap" style={{ maxWidth: 980 }}>
          <div className="peach-pad" style={{ background: PEACH, padding: "72px 64px", boxShadow: "0 30px 70px -40px rgba(18,41,77,.25)" }}>
            <div className="grid2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "52px 72px" }}>
              {INDIC.map((it) => (
                <div key={it.t} style={{ textAlign: "center" }}>
                  <Ic d={it.i} s={44} c={NV} />
                  <h3 style={{ fontSize: 19, margin: "14px 0 10px", color: NV }}>{it.t}</h3>
                  <p style={{ fontSize: 13.5, lineHeight: 1.65, color: PEACH_TXT, maxWidth: 340, margin: "0 auto 14px" }}>{it.d}</p>
                  <a onClick={() => go("contato")} style={{ cursor: "pointer", fontSize: 11.5, fontWeight: 600, letterSpacing: 2.4, textTransform: "uppercase", color: NV }}>Ver detalhes</a>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 58 }}>
              <a className="btn-n" href={wa("Olá! Quero agendar uma avaliação na " + brand + ".")}>Agendar avaliação</a>
            </div>
          </div>
        </div>
      </section>

      {/* depoimento central */}
      <section id="sobre" style={{ background: "#fff", padding: "88px 0" }}>
        <div className="wrap" style={{ maxWidth: 800, textAlign: "center" }}>
          <img src="/meridian-helena.webp" alt="Dra. Helena Vaz, fundadora e acupunturista" style={{ width: 84, height: 84, borderRadius: "50%", objectFit: "cover", objectPosition: "center 20%", border: `2px solid ${GD}`, marginBottom: 18 }} />
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: 1.6, color: INK, marginBottom: 26 }}>Conheça a Dra. Helena Vaz</div>
          <blockquote style={{ fontFamily: serif, fontStyle: "italic", fontSize: "clamp(20px,2.6vw,26px)", lineHeight: 1.55, color: "#3c4358" }}>
            "Agulha nenhuma substitui escuta. O tratamento começa quando o paciente é ouvido de verdade: cada sessão dura o tempo que precisa durar, e cada plano é revisto a cada ciclo."
          </blockquote>
        </div>
      </section>

      {/* contato: painel escuro com info à esquerda e formulário à direita */}
      <section id="contato" style={{ background: `linear-gradient(170deg, ${NV}, ${NV2})`, color: "#fff", padding: "88px 0" }}>
        <div className="wrap grid2" style={{ display: "grid", gridTemplateColumns: ".8fr 1.2fr", gap: 72 }}>
          <div style={{ display: "grid", gap: 30, alignContent: "start" }}>
            {[
              ["Endereço", "Rua das Acácias, 1234\n" + city, "M16 4a9 9 0 0 1 9 9c0 6-9 15-9 15S7 19 7 13a9 9 0 0 1 9-9zm0 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"],
              ["Telefone", "(51) 99999-9999", "M8 6h5l3 7-4 3a18 18 0 0 0 8 8l3-4 7 3v5a2 2 0 0 1-2 2A24 24 0 0 1 6 8a2 2 0 0 1 2-2z"],
              ["E-mail", "contato@clinicameridian.com.br", "M5 9h22v15H5zM5 10l11 8 11-8"],
            ].map(([t, v, i]) => (
              <div key={t as string} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <Ic d={i as string} s={20} c={GD} />
                <span>
                  <span style={{ display: "block", fontSize: 12.5, fontWeight: 600, letterSpacing: 1.8, textTransform: "uppercase", color: GD, marginBottom: 6 }}>{t}</span>
                  <span style={{ fontSize: 14.5, lineHeight: 1.6, color: "rgba(255,255,255,.78)", whiteSpace: "pre-line" }}>{v}</span>
                </span>
              </div>
            ))}
          </div>
          <div>
            <h2 style={{ fontSize: "clamp(30px,3.6vw,46px)", lineHeight: 1.15, marginBottom: 34 }}>Fale com a gente, ligue<br />ou mande mensagem.</h2>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: "grid", gap: 8 }}>
              <div className="grid2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
                <input className="field" placeholder="Nome" aria-label="Nome" />
                <input className="field" placeholder="E-mail" type="email" aria-label="E-mail" />
              </div>
              <textarea className="field" placeholder="Mensagem" rows={3} aria-label="Mensagem" style={{ resize: "vertical", marginTop: 8 }} />
              <div style={{ textAlign: "right", marginTop: 22 }}>
                <a className="btn-w" href={wa("Olá! Quero conversar com a " + brand + " sobre o meu caso.")}>Enviar mensagem</a>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer style={{ background: NV2, color: "rgba(255,255,255,.72)", borderTop: "1px solid rgba(201,164,92,.2)", padding: "34px 0" }}>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 14, fontSize: 13.5 }}>
          <span style={{ fontFamily: serif, fontSize: 21, color: "#fff" }}>{brand}<span style={{ color: GD }}>.</span></span>
          <span>{city} · Acupuntura e medicina tradicional chinesa</span>
        </div>
      </footer>
    </div>
  );
}
