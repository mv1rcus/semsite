import { useEffect } from "react";

/** Clínica de estética à risca do pin LUMIÈRE (varredura E-22): hero creme com serifão editorial e retrato vertical com selo circular, 3 cards de tratamentos (foto em cima), faixa full-bleed da recepção da clínica com overlay, linha de selos. Reserva fecha no WhatsApp. Nome fictício novo (Alva), nada da marca do pin. */
const CRM = "#f5f0ea", BEGE = "#e8ded2", INK = "#2b2118", GOLD = "#b09a7e", MUT = "#8a7d6e", CARD = "#fdfbf8", LINE = "rgba(43,33,24,.14)";

const CARDS = [
  { img: "/alva-pele.jpg", alt: "Close de tratamento facial com aparelho na bochecha da cliente", t: "PELE", d: "Tratamentos avançados para rejuvenescer, restaurar e refrescar." },
  { img: "/alva-facial.jpg", alt: "Esteticista aplicando sérum com pincel no rosto da cliente", t: "FACIAL", d: "Limpeza profunda, hidratação e glow sob medida para você." },
  { img: "/alva-corpo.jpg", alt: "Aparelho de contorno corporal deslizando na cintura da cliente", t: "CORPO", d: "Esculpir, tonificar e contornar com tecnologia de ponta." },
];

const SEALS = ["PROFISSIONAIS CERTIFICADAS", "TECNOLOGIA AVANÇADA", "CUIDADO PERSONALIZADO", "RESULTADOS NATURAIS"];

function Ph({ src, alt, ratio, wide }: { src: string; alt: string; ratio: string; wide?: boolean }) {
  return (
    <div style={{ position: "relative", aspectRatio: ratio, background: `linear-gradient(160deg, ${BEGE}, ${CRM})`, overflow: "hidden", width: "100%" }}>
      <img src={src} alt={alt} loading={wide ? undefined : "lazy"} onLoad={(e) => { e.currentTarget.style.opacity = "1"; }} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0, transition: "opacity .4s" }} />
    </div>
  );
}

export function AlvaFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Alva";
  const city = client?.city?.trim() || "São Paulo";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const wa = (m: string) => `https://wa.me/${phone || "5511999999999"}?text=${encodeURIComponent(m)}`;
  const book = (m: string) => window.open(wa(m), "_blank");

  useEffect(() => {
    document.title = `${brand} · Clínica de Estética em ${city}`;
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..700;1,400..700&family=Jost:ital,wght@0,300..600;1,300..600&display=swap";
    document.head.appendChild(l);
  }, [brand, city]);

  return (
    <div className="alva" style={{ background: CRM, color: INK, fontFamily: "'Jost', sans-serif", minHeight: "100vh" }}>
      <style>{`
        html,body{background:${CRM}!important}
        .alva .wrap{max-width:1180px;margin:0 auto;padding:0 28px}
        .alva .serif{font-family:'Playfair Display',serif;font-weight:500;letter-spacing:.01em;margin:0}
        .alva .caps{font:400 11px 'Jost',sans-serif;letter-spacing:.3em;color:${MUT};margin:0}
        .alva .pill{display:inline-flex;align-items:center;justify-content:center;border-radius:999px;padding:14px 30px;font:500 12px 'Jost',sans-serif;letter-spacing:.14em;cursor:pointer;border:none;transition:opacity .2s}
        .alva .pill:hover{opacity:.88}
        .alva .pill-d{background:${INK};color:#f5f0ea}
        .alva .pill-c{background:${CRM};color:${INK}}
        .alva .pill-g{background:${GOLD};color:#fff}
        .alva .pill-o{background:transparent;color:${INK};border:1px solid rgba(43,33,24,.3)}
        .alva .navlink{background:none;border:none;color:${INK};font:400 12px 'Jost',sans-serif;letter-spacing:.12em;cursor:pointer;opacity:.75}
        .alva .navlink:hover{opacity:1}
        .alva .cards{display:grid;grid-template-columns:repeat(3,1fr);gap:26px}
        .alva .card{background:${CARD};padding-bottom:30px}
        .alva .card .in{padding:26px 28px 0}
        .alva .card h3{font-family:'Playfair Display',serif;font-weight:500;font-size:19px;letter-spacing:.14em;margin:16px 0 12px}
        .alva .card p{font-size:13.5px;line-height:1.75;color:${MUT};margin:0}
        .alva .card a{display:inline-block;margin-top:18px;font:500 11px 'Jost',sans-serif;letter-spacing:.2em;color:${INK};text-decoration:none;border-bottom:1px solid ${LINE};padding-bottom:4px;cursor:pointer}
        .alva .seals{display:grid;grid-template-columns:repeat(4,1fr)}
        .alva .seal{display:flex;align-items:center;justify-content:center;gap:12px;padding:30px 10px;font:500 11px 'Jost',sans-serif;letter-spacing:.16em;color:${INK};text-align:center}
        .alva .seal + .seal{border-left:1px solid ${LINE}}
        .alva .badge{position:absolute;right:-26px;bottom:-26px;width:128px;height:128px;animation:spin 18s linear infinite}
        @keyframes spin{to{transform:rotate(360deg)}}
        @media (max-width: 900px){
          .alva nav{display:none!important}
          .alva .band > div:first-child{aspect-ratio:auto!important;min-height:560px}
          .alva .duo{grid-template-columns:1fr!important}
          .alva .serif-xl{font-size:42px!important}
          .alva .hero-photo{max-width:440px;margin:0 auto;width:100%}
          .alva .seals{grid-template-columns:repeat(2,1fr)}
          .alva .seal + .seal{border-left:none}
          .alva .badge{right:0;bottom:-20px;width:104px;height:104px}
        }
        @media (max-width: 560px){ .alva .cards{grid-template-columns:1fr} }
      `}</style>

      {/* HEADER */}
      <header style={{ padding: "22px 0" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <div>
            <div className="serif" style={{ fontSize: 26, letterSpacing: ".08em" }}>{brand.toLowerCase()}</div>
            <div style={{ fontSize: 9, letterSpacing: ".34em", color: MUT, marginTop: 2 }}>CLÍNICA DE ESTÉTICA</div>
          </div>
          <nav style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {["INÍCIO", "SOBRE", "TRATAMENTOS", "RESULTADOS", "CONTATO"].map((n) => (
              <button key={n} className="navlink">{n}</button>
            ))}
          </nav>
          <button className="pill pill-o" style={{ padding: "12px 24px" }} onClick={() => book(`Olá! Quero agendar uma avaliação na ${brand}.`)}>AGENDAR</button>
        </div>
      </header>

      {/* HERO */}
      <section style={{ padding: "60px 0 90px" }}>
        <div className="wrap duo" style={{ display: "grid", gridTemplateColumns: "6fr 6fr", gap: 64, alignItems: "center" }}>
          <div>
            <p className="caps">CUIDADO AVANÇADO. RESULTADOS NATURAIS.</p>
            <h1 className="serif serif-xl" style={{ fontSize: 64, lineHeight: 1.08, margin: "26px 0 0" }}>SUA MELHOR<br />VERSÃO,<br />REFINADA.</h1>
            <div style={{ width: 44, height: 2, background: GOLD, margin: "30px 0" }} />
            <p style={{ fontSize: 15, lineHeight: 1.8, color: MUT, maxWidth: 420, margin: 0 }}>Tratamentos estéticos personalizados, desenhados para revelar a sua beleza natural e elevar a sua confiança.</p>
            <div style={{ marginTop: 36 }}>
              <button className="pill pill-g" onClick={() => book(`Olá! Quero agendar uma avaliação na ${brand}.`)}>AGENDAR AVALIAÇÃO</button>
            </div>
          </div>
          <div className="hero-photo" style={{ position: "relative" }}>
            <Ph src="/alva-hero.jpg" alt="Retrato editorial de mulher com pele radiante em fundo bege com sombras de folhas" ratio="4/5" />
            <svg className="badge" viewBox="0 0 128 128" aria-hidden>
              <defs><path id="circ" d="M 64,64 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0" /></defs>
              <circle cx="64" cy="64" r="64" fill={CRM} opacity=".92" />
              <text style={{ font: "500 10.5px 'Jost',sans-serif", letterSpacing: ".24em", fill: INK }}>
                <textPath href="#circ">CIÊNCIA · BELEZA NATURAL · RESULTADOS REAIS ·</textPath>
              </text>
              <text x="64" y="74" textAnchor="middle" style={{ font: "500 34px 'Playfair Display',serif", fill: INK }}>a</text>
            </svg>
          </div>
        </div>
      </section>

      {/* TRATAMENTOS */}
      <section id="tratamentos" style={{ padding: "90px 0", borderTop: `1px solid ${LINE}` }}>
        <div className="wrap">
          <p className="caps" style={{ textAlign: "center" }}>NOSSOS TRATAMENTOS</p>
          <h2 className="serif" style={{ fontSize: 40, letterSpacing: ".1em", textAlign: "center", margin: "18px 0 14px" }}>FEITOS PARA VOCÊ</h2>
          <div style={{ width: 44, height: 2, background: GOLD, margin: "0 auto 56px" }} />
          <div className="cards">
            {CARDS.map((c) => (
              <div className="card" key={c.t}>
                <Ph src={c.img} alt={c.alt} ratio="4/3" />
                <div className="in">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.3" aria-hidden>
                    <path d="M12 3c2.5 3 4.5 5.5 4.5 8.5a4.5 4.5 0 1 1-9 0C7.5 8.5 9.5 6 12 3z" />
                    <path d="M12 21v-6" />
                  </svg>
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                  <a onClick={() => book(`Olá! Quero conhecer o tratamento ${c.t.toLowerCase()} da ${brand}.`)}>CONHECER →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAIXA CLÍNICA */}
      <section id="sobre" className="band" style={{ position: "relative" }}>
        <Ph src="/alva-clinica.jpg" alt="Recepção elegante de clínica de estética com balcão de pedra e poltronas claras" ratio="16/7" wide />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(43,33,24,.42), rgba(43,33,24,.06) 55%)" }} />
        <div className="wrap" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center" }}>
          <div style={{ maxWidth: 460 }}>
            <p className="caps" style={{ color: "#efe7db" }}>BELEZA. CONFIANÇA. VOCÊ.</p>
            <h2 className="serif" style={{ fontSize: 46, lineHeight: 1.14, color: "#fff", margin: "20px 0 0" }}>A CONFIANÇA<br />COMEÇA<br />COM VOCÊ.</h2>
            <div style={{ width: 44, height: 2, background: "#fff", opacity: .7, margin: "26px 0" }} />
            <button className="pill pill-g" onClick={() => book(`Olá! Quero agendar uma avaliação na ${brand}.`)}>AGENDE SUA AVALIAÇÃO →</button>
          </div>
        </div>
      </section>

      {/* SELOS */}
      <section style={{ borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
        <div className="wrap seals">
          {SEALS.map((s) => (
            <div className="seal" key={s}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.3" aria-hidden>
                <path d="M12 3c2.5 3 4.5 5.5 4.5 8.5a4.5 4.5 0 1 1-9 0C7.5 8.5 9.5 6 12 3z" />
              </svg>
              {s}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contato" style={{ padding: "40px 0" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
          <div>
            <div className="serif" style={{ fontSize: 22, letterSpacing: ".08em" }}>{brand.toLowerCase()}</div>
            <div style={{ fontSize: 12, color: MUT, marginTop: 4 }}>{city} · Clínica de Estética</div>
          </div>
          <button className="pill pill-d" onClick={() => book(`Olá! Quero falar com a ${brand}.`)}>FALAR NO WHATSAPP</button>
        </div>
      </footer>
    </div>
  );
}
