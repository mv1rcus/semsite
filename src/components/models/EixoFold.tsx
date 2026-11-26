import { useEffect } from "react";

/** Estúdio de pilates editorial à risca do pin FORME (varredura E-20): creme + quase-preto + sálvia, sans pesada com contraste em serif itálica, hero split com foto grande, aulas em lista numerada 01/02/03, abordagem com foto grande + painel, planos com foto do nicho. Aula experimental fecha no WhatsApp. Nome fictício novo (Eixo), nada do pin original. */
const CRM = "#f5f1ea", CRM2 = "#ece5d8", INK = "#1b1915", MUT = "#6d675c", SAGE = "#7d8c70", SAGED = "#5f6d55", LINE = "rgba(27,25,21,.16)";

export function EixoFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Eixo";
  const city = client?.city?.trim() || "Belo Horizonte";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const wa = (m: string) => `https://wa.me/${phone || "5531999999999"}?text=${encodeURIComponent(m)}`;
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    document.title = `${brand} · Pilates & Movimento em ${city}`;
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..600&display=swap";
    document.head.appendChild(l);
  }, [brand, city]);

  const AULAS = [
    { n: "01", t: "BASE", d: "Uma introdução consciente ao pilates no reformer." },
    { n: "02", t: "FLUXO", d: "Mobilidade, equilíbrio e conexão do corpo inteiro." },
    { n: "03", t: "FORÇA", d: "Evolua a sua prática com controle e confiança." },
  ];

  return (
    <div className="eixo" style={{ background: CRM, color: INK, fontFamily: "'Archivo', sans-serif", minHeight: "100vh" }}>
      <style>{`
        html,body{background:${CRM}!important}
        .eixo .wrap{max-width:1240px;margin:0 auto;padding:0 28px}
        .eixo h1,.eixo h2{margin:0;font-weight:800;letter-spacing:-.02em;line-height:1.02}
        .eixo .serif{font-family:'Fraunces',serif;font-style:italic;font-weight:400;letter-spacing:0}
        .eixo .eyebrow{display:flex;align-items:center;gap:14px;font-size:12px;font-weight:600;letter-spacing:.22em;color:${MUT}}
        .eixo .eyebrow::after{content:"";flex:0 0 64px;height:1px;background:${LINE}}
        .eixo .btn{display:inline-flex;align-items:center;gap:10px;background:${SAGE};color:#fff;border:none;border-radius:4px;padding:16px 26px;font:600 15px 'Archivo',sans-serif;cursor:pointer;transition:background .2s}
        .eixo .btn:hover{background:${SAGED}}
        .eixo .navlink{background:none;border:none;color:${INK};font:500 13px 'Archivo',sans-serif;cursor:pointer;padding:4px 2px}
        .eixo .navlink:hover{color:${SAGED}}
        .eixo .split{display:grid;grid-template-columns:5fr 6fr;align-items:stretch}
        .eixo .split-r{display:grid;grid-template-columns:6fr 5fr;align-items:stretch}
        .eixo .photo{width:100%;height:100%;object-fit:cover;display:block}
        .eixo .heroimg{min-height:620px}
        .eixo .abordimg{min-height:560px}
        .eixo .arow{display:grid;grid-template-columns:56px 1fr;gap:18px;padding:22px 0;border-top:1px solid ${LINE};align-items:start}
        .eixo .arow:last-child{border-bottom:1px solid ${LINE}}
        .eixo .anum{font-family:'Fraunces',serif;font-style:italic;font-size:22px;color:${MUT}}
        .eixo .aname{font-size:14px;font-weight:700;letter-spacing:.18em}
        .eixo .adesc{margin-top:6px;font-size:14px;line-height:1.55;color:${MUT}}
        @media (max-width: 900px){
          .eixo .split,.eixo .split-r{grid-template-columns:1fr}
          .eixo .heroimg{min-height:0;height:380px}
          .eixo .sideimg{height:340px}
          .eixo .abordimg{min-height:0;height:380px}
          .eixo nav{display:none!important}
          .eixo h1{font-size:44px!important}
          .eixo h2{font-size:36px!important}
        }
      `}</style>

      {/* HEADER */}
      <header style={{ padding: "26px 0" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 30, letterSpacing: "-.02em", lineHeight: 1 }}>{brand.toUpperCase()}</div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".34em", color: MUT, marginTop: 4 }}>PILATES & MOVIMENTO</div>
          </div>
          <nav style={{ display: "flex", alignItems: "center", gap: 26 }}>
            <button className="navlink" onClick={() => go("studio")}>O Studio</button>
            <button className="navlink" onClick={() => go("aulas")}>Aulas</button>
            <button className="navlink" onClick={() => go("abordagem")}>Abordagem</button>
            <button className="navlink" onClick={() => go("planos")}>Planos</button>
            <button className="navlink" style={{ fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 4 }} onClick={() => go("planos")}>Agendar aula</button>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section id="studio" className="split" style={{ borderTop: `1px solid ${LINE}` }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "72px 56px 72px 28px" }}>
          <h1 style={{ fontSize: 68 }}>Mova-se com intenção.</h1>
          <p className="serif" style={{ fontSize: 40, margin: "14px 0 0", color: INK }}>Sinta a diferença.</p>
          <div style={{ width: 52, height: 1, background: INK, margin: "34px 0" }} />
          <p style={{ fontSize: 17, lineHeight: 1.65, color: MUT, maxWidth: 380, margin: 0 }}>Pilates em reformer em turmas pequenas, pensado para o jeito como o seu corpo realmente se move.</p>
          <div style={{ marginTop: 36 }}>
            <button className="btn" onClick={() => go("aulas")}>Conhecer as aulas <span aria-hidden>→</span></button>
          </div>
        </div>
        <div className="heroimg">
          <img className="photo" src="/eixo-hero.jpg" alt="Aluna praticando pilates em reformer em estúdio claro com janelas grandes" />
        </div>
      </section>

      {/* 01 / AULAS */}
      <section id="aulas" className="split" style={{ borderTop: `1px solid ${LINE}` }}>
        <div style={{ padding: "80px 56px 80px 28px" }}>
          <p className="eyebrow">01 / AULAS</p>
          <h2 style={{ fontSize: 52, marginTop: 26 }}>Encontre o seu ritmo.</h2>
          <p className="serif" style={{ fontSize: 22, lineHeight: 1.5, color: INK, maxWidth: 380, margin: "22px 0 40px" }}>Da sua primeira aula no reformer a uma prática mais forte e confiante.</p>
          <div>
            {AULAS.map((a) => (
              <div className="arow" key={a.n}>
                <span className="anum">{a.n}</span>
                <div>
                  <div className="aname">{a.t}</div>
                  <p className="adesc">{a.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="sideimg">
          <img className="photo" src="/eixo-studio.jpg" alt="Fileira de reformers de madeira clara com nicho arqueado iluminado ao fundo" />
        </div>
      </section>

      {/* 02 / ABORDAGEM */}
      <section id="abordagem" className="split-r" style={{ borderTop: `1px solid ${LINE}` }}>
        <div className="sideimg abordimg">
          <img className="photo" src="/eixo-close.jpg" alt="Aluna concentrada apoiada no reformer sob luz natural" />
        </div>
        <div style={{ background: CRM2, display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 28px 80px 56px" }}>
          <p className="eyebrow">02 / NOSSA ABORDAGEM</p>
          <h2 style={{ fontSize: 52, marginTop: 26 }}>O movimento é pessoal.</h2>
          <p className="serif" style={{ fontSize: 30, margin: "12px 0 0" }}>E o nosso jeito de ensinar também.</p>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: MUT, maxWidth: 380, margin: "26px 0 40px" }}>Instrução atenta, turmas menores e espaço para se mover no seu próprio ritmo.</p>
          <img src="/eixo-recepcao.jpg" alt="Recepção minimalista do estúdio com balcão de pedra e folhagem" style={{ width: "62%", aspectRatio: "4/3", objectFit: "cover", display: "block" }} />
        </div>
      </section>

      {/* 03 / PLANOS */}
      <section id="planos" style={{ borderTop: `1px solid ${LINE}`, padding: "80px 0 0" }}>
        <div className="wrap">
          <p className="eyebrow">03 / PLANOS</p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginTop: 26, marginBottom: 44 }}>
            <h2 style={{ fontSize: 52 }}>Sua prática começa aqui.</h2>
            <button className="btn" onClick={() => window.open(wa(`Olá! Quero agendar uma aula experimental no ${brand}.`), "_blank")}>Agendar aula experimental <span aria-hidden>→</span></button>
          </div>
        </div>
        <img src="/eixo-nicho.jpg" alt="Nicho arqueado iluminado com prateleiras de madeira, toalhas e plantas" style={{ width: "100%", height: 460, objectFit: "cover", display: "block" }} />
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${LINE}`, padding: "40px 0" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 22, letterSpacing: "-.02em" }}>{brand.toUpperCase()}</div>
            <div style={{ fontSize: 12, color: MUT, marginTop: 4 }}>{city} · Pilates & movimento</div>
          </div>
          <div style={{ fontSize: 12, color: MUT }}>Seg a Sex, 7h às 20h · Sáb, 8h às 12h</div>
        </div>
      </footer>
    </div>
  );
}
