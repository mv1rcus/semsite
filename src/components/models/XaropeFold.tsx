import { useEffect } from "react";

/** Marca de xaropes premium para coquetelaria, montada a partir de um pin de landing de marca de xaropes: fundo quase preto, wordmark em script branca com sublinhado vermelho, hero com fileira de garrafas e respingos de fruta, tira de benefícios com ícones de linha, carrossel de sabores em cards escuros, banner de coquetéis, sobre a marca com checks e bloco "perfeito para", rodapé com newsletter. */
const BG = "#0C090D", BG2 = "#141017", CARD = "#18121B", LINE = "#2A212E", RED = "#E33246", RED_DK = "#B81F33", TXT = "#F5EFE8", TXT2 = "#B9AEB4", WHITE = "#FFFFFF";
const SABORES = [
  { img: "/bar-s1.jpg", n: "Framboesa", d: "Vermelho intenso, doçura de fruta madura colhida no ponto.", cor: "#D9263E" },
  { img: "/bar-s2.jpg", n: "Lichia", d: "Rosa delicado, floral e exótico para drinks autorais.", cor: "#E88BA0" },
  { img: "/bar-s3.jpg", n: "Kiwi", d: "Verde vibrante, azedinho refrescante na medida.", cor: "#6FAF3C" },
  { img: "/bar-s4.jpg", n: "Uva", d: "Roxo profundo, corpo de mosto de uva escura.", cor: "#7A3FA0" },
  { img: "/bar-s5.jpg", n: "Laranja", d: "Cítrico solar, casca e polpa em equilíbrio.", cor: "#E87E22" },
  { img: "/bar-s6.jpg", n: "Goiaba", d: "Magenta tropical, perfume de feira livre.", cor: "#E2546F" },
];
const BENEFICIOS = [
  { t: "Ingredientes naturais", ic: "M16 5 C9 12 7 20 16 27 C25 20 23 12 16 5 Z M16 12 v9" },
  { t: "Perfeitos para coquetéis e drinks", ic: "M9 6 h14 l-7 9 v7 h-2 v-7 Z M12 26 h8 M16 22 v4" },
  { t: "Sabor e aroma intensos", ic: "M16 6 v20 M16 6 c5 1 7 5 7 9 M16 6 c-5 1 -7 5 -7 9" },
  { t: "Qualidade premium", ic: "M16 6 l3 6 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1 Z" },
  { t: "Sabores para cada momento", ic: "M10 8 h12 v10 a6 6 0 0 1 -12 0 Z M22 10 h3 a3 3 0 0 1 0 6 h-3" },
];
const IDEAL = [
  { t: "Coquetéis", ic: "M9 6 h14 l-7 9 v7 h-2 v-7 Z M12 26 h8 M16 22 v4" },
  { t: "Limonadas", ic: "M10 7 h12 l-2 19 h-8 Z M12 12 h8" },
  { t: "Cafés", ic: "M8 10 h13 v7 a5 5 0 0 1 -10 0 v-7 Z M21 11 h2 a3 3 0 0 1 0 6 h-2 M10 24 h11" },
  { t: "Sobremesas", ic: "M8 20 h16 M10 20 v-3 a6 6 0 0 1 12 0 v3 M12 24 h8 M16 11 v-3" },
];
const CHECK = "M7 16l6 6L26 9";
const Ic = ({ d, s = 28, c = RED }: { d: string; s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);

export function XaropeFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Bar Lisse";
  const city = client?.city?.trim() || "São Paulo";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const wa = (m: string) => `https://wa.me/${phone || "5511999999999"}?text=${encodeURIComponent(m)}`;
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const script = "'Allura', cursive";
  const sans = "'Archivo', system-ui, sans-serif";
  useEffect(() => {
    const l = document.createElement("link");
    l.href = "https://fonts.googleapis.com/css2?family=Allura&family=Archivo:wght@400;500;600;700;800;900&display=swap";
    l.rel = "stylesheet"; document.head.appendChild(l);
  }, []);
  return (
    <div className="lisse" style={{ fontFamily: sans, color: TXT, background: BG, overflowX: "hidden" }}>
      <style>{`
        html,body{background:${BG}!important}
        .lisse h1,.lisse h2,.lisse h3{font-family:${sans}!important;font-weight:800;letter-spacing:.01em;text-transform:uppercase;line-height:1.08;text-wrap:balance;text-decoration:none!important}
        .lisse blockquote,.lisse figure{margin:0}
        .lisse .wrap{max-width:1180px;margin:0 auto;padding:0 28px}
        .lisse .wordmark{font-family:${script};font-weight:400;text-transform:none;line-height:1}
        .lisse .wm-under{position:relative;display:inline-block}
        .lisse .wm-under::after{content:"";position:absolute;left:4%;right:2%;bottom:-.08em;height:.1em;background:${RED};border-radius:99px;transform:skewX(-18deg)}
        .lisse .btn{display:inline-flex;align-items:center;gap:10px;background:${RED};color:${WHITE};font-family:${sans};font-weight:700;font-size:13px;letter-spacing:.06em;text-transform:none;padding:15px 30px;border:none;cursor:pointer;transition:.25s;text-decoration:none;border-radius:3px}
        .lisse .btn:hover{background:${RED_DK}}
        .lisse .btn-o{display:inline-flex;align-items:center;gap:8px;background:none;color:${TXT};border:1px solid ${LINE};font-family:${sans};font-weight:600;font-size:12px;letter-spacing:.08em;padding:10px 20px;cursor:pointer;transition:.25s;text-decoration:none;border-radius:3px}
        .lisse .btn-o:hover{border-color:${RED};color:${WHITE}}
        .lisse .sec-t{font-size:30px;color:${TXT}}
        .lisse .sec-t em{font-style:normal;color:${RED}}
        .lisse .flavor{position:relative;border-radius:6px;overflow:hidden;background:${CARD};border:1px solid ${LINE}}
        .lisse .flavor img{display:block;width:100%;aspect-ratio:3/4;object-fit:cover;transition:transform .5s}
        .lisse .flavor:hover img{transform:scale(1.05)}
        .lisse .hero-ovl{background:linear-gradient(90deg, rgba(12,9,13,.96) 0%, rgba(12,9,13,.88) 34%, rgba(12,9,13,.55) 58%, rgba(12,9,13,.15) 82%, rgba(12,9,13,.05) 100%)}
        .lisse .hero-min{min-height:560px;display:flex;flex-direction:column;justify-content:center}
        .lisse .nav-a{cursor:pointer;transition:.2s}
        .lisse .nav-a:hover{color:${WHITE}}
        @media (max-width:900px){
          .lisse .desk-nav{display:none!important}
          .lisse .hero-grid{grid-template-columns:1fr!important}
          .lisse .g5{grid-template-columns:repeat(2,1fr)!important}
          .lisse .g3{grid-template-columns:1fr!important}
          .lisse .g4{grid-template-columns:repeat(2,1fr)!important}
          .lisse .hero-wm{font-size:84px!important}
          .lisse .hero-sub{font-size:26px!important}
          .lisse .sobre-grid{grid-template-columns:1fr!important}
          .lisse .foot-grid{grid-template-columns:1fr 1fr!important}
        }
        @media (max-width:760px){ .lisse .hero-ovl{background:linear-gradient(180deg, rgba(12,9,13,.90) 0%, rgba(12,9,13,.55) 45%, rgba(12,9,13,.85) 100%)} .lisse .hero-min{min-height:0} }
        @media (max-width:560px){ .lisse .g5{grid-template-columns:1fr 1fr!important} .lisse .g4{grid-template-columns:1fr!important} .lisse .hero-wm{font-size:64px!important} .lisse header .btn{display:none!important} .lisse .foot-grid{grid-template-columns:1fr!important} }
      `}</style>

      {/* header */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(12,9,13,.92)", backdropFilter: "blur(6px)", borderBottom: `1px solid ${LINE}` }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 28px" }}>
          <span className="wordmark wm-under" style={{ fontSize: 30, color: WHITE }}>Bar Lisse</span>
          <nav className="desk-nav" style={{ display: "flex", gap: 28, fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: TXT2 }}>
            {[["Sabores", "sabores"], ["Coquetéis", "coqueteis"], ["A marca", "marca"], ["Receitas", "coqueteis"], ["Contato", "contato"]].map(([n, id]) => <a key={n} className="nav-a" onClick={() => go(id ?? "")}>{n}</a>)}
          </nav>
          <a href={wa("Olá! Quero pedir xaropes da " + brand + ".")} className="btn" style={{ padding: "10px 20px", fontSize: 12 }}>Pedir agora</a>
        </div>
      </header>

      {/* hero: wordmark script + título condensado à esquerda, fileira de garrafas à direita */}
      <section style={{ position: "relative", overflow: "hidden", background: BG }}>
        <img src="/bar-hero.jpg" alt={"Fileira de garrafas de xarope " + brand + " com respingos de frutas"} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div className="hero-ovl" style={{ position: "absolute", inset: 0 }} />
        <div className="wrap hero-min" style={{ position: "relative", paddingTop: 92, paddingBottom: 92 }}>
          <div style={{ maxWidth: 560 }}>
            <div className="wordmark wm-under hero-wm" style={{ fontSize: 110, color: WHITE }}>Bar Lisse</div>
            <h1 className="hero-sub" style={{ fontSize: 34, marginTop: 18, letterSpacing: ".02em", color: WHITE }}>Crie a sua<br />história de sabores!</h1>
            <p style={{ marginTop: 18, fontSize: 15, lineHeight: 1.65, color: TXT, maxWidth: 420 }}>Xaropes premium para coquetéis, limonadas, cafés e sobremesas. Sabor natural em cada gota.</p>
            <div style={{ marginTop: 30, display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a href={wa("Olá! Quero escolher meus sabores de xarope da " + brand + ".")} className="btn">Escolher sabor →</a>
            </div>
            <div style={{ display: "flex", gap: 7, marginTop: 34 }}>
              {[0, 1, 2].map((i) => <span key={i} style={{ width: i === 0 ? 22 : 8, height: 4, borderRadius: 99, background: i === 0 ? RED : "rgba(253,248,241,.4)" }} />)}
            </div>
          </div>
        </div>
      </section>

      {/* tira de benefícios */}
      <section style={{ background: BG2, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
        <div className="wrap g5" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 26, padding: "30px 28px" }}>
          {BENEFICIOS.map((b) => (
            <div key={b.t} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <Ic d={b.ic} />
              <span style={{ fontSize: 13, lineHeight: 1.4, color: TXT }}>{b.t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* coleção de sabores */}
      <section id="sabores" style={{ background: BG, padding: "84px 0" }}>
        <div className="wrap">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
            <h2 className="sec-t">Coleção de <em>sabores</em></h2>
            <div style={{ display: "flex", gap: 10 }}>
              <span style={{ width: 40, height: 40, border: `1px solid ${LINE}`, borderRadius: 3, display: "inline-flex", alignItems: "center", justifyContent: "center", color: TXT2, cursor: "pointer" }}>‹</span>
              <span style={{ width: 40, height: 40, border: `1px solid ${LINE}`, borderRadius: 3, display: "inline-flex", alignItems: "center", justifyContent: "center", color: TXT2, cursor: "pointer" }}>›</span>
            </div>
          </div>
          <div className="g3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }}>
            {SABORES.map((s) => (
              <div key={s.n} className="flavor">
                <img src={s.img} alt={"Xarope sabor " + s.n + " da " + brand} loading="lazy" />
                <div style={{ position: "absolute", inset: 0, background: s.cor, mixBlendMode: "color", opacity: .62, pointerEvents: "none" }} />
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "40px 18px 16px", background: "linear-gradient(180deg, transparent, rgba(12,9,13,.92) 55%)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 800, textTransform: "uppercase", color: WHITE }}>{s.n}</div>
                    <div style={{ fontSize: 12, color: TXT2, marginTop: 4 }}>{s.d}</div>
                  </div>
                  <a href={wa("Olá! Quero o xarope de " + s.n + " da " + brand + ".")} className="btn-o" style={{ whiteSpace: "nowrap" }}>Detalhes</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* banner coquetéis */}
      <section id="coqueteis" style={{ background: BG2, borderTop: `1px solid ${LINE}` }}>
        <div className="wrap" style={{ paddingTop: 72, paddingBottom: 72 }}>
          <div style={{ position: "relative", borderRadius: 8, overflow: "hidden", border: `1px solid ${LINE}` }}>
            <img src="/bar-cocktails.jpg" alt={"Fileira de coquetéis coloridos feitos com xaropes " + brand} loading="lazy" style={{ width: "100%", height: 340, objectFit: "cover", display: "block", filter: "brightness(.55)" }} />
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 62% 88% at 50% 50%, rgba(8,6,10,.82) 0%, rgba(8,6,10,.38) 58%, rgba(8,6,10,0) 100%)" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 28 }}>
              <h2 className="sec-t" style={{ color: WHITE }}>Inspiração em<br />cada <em>coquetel</em></h2>
              <p style={{ marginTop: 14, fontSize: 15, color: TXT, maxWidth: 460 }}>Descubra combinações novas e surpreenda seus convidados.</p>
              <a href={wa("Olá! Quero as receitas de coquetéis com os xaropes " + brand + ".")} className="btn" style={{ marginTop: 24 }}>Ver receitas →</a>
            </div>
          </div>
        </div>
      </section>

      {/* sobre + perfeito para */}
      <section id="marca" style={{ background: BG, padding: "84px 0" }}>
        <div className="wrap sobre-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56 }}>
          <div>
            <img src="/bar-sobre.jpg" alt={"Respingo de xarope com frutas frescas, a marca " + brand} loading="lazy" style={{ width: "100%", borderRadius: 6, display: "block", marginBottom: 28 }} />
            <h2 className="sec-t">A marca <em>Bar Lisse</em></h2>
            <p style={{ marginTop: 16, fontSize: 15, lineHeight: 1.7, color: TXT2 }}>A {brand} faz sabores vivos para quem gosta de experimentar e valoriza qualidade. Só ingredientes naturais, para inspirar você em cada dia.</p>
            <div className="g4" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 22px", marginTop: 24 }}>
              {["Controle de qualidade", "Aromas naturais", "Receita balanceada", "Feito com carinho"].map((c) => (
                <div key={c} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: TXT }}>
                  <Ic d={CHECK} s={18} /><span>{c}</span>
                </div>
              ))}
            </div>
            <a href={wa("Olá! Quero conhecer melhor a marca " + brand + ".")} className="btn" style={{ marginTop: 28 }}>Conhecer a marca →</a>
          </div>
          <div style={{ position: "relative", borderRadius: 8, overflow: "hidden", border: `1px solid ${LINE}`, minHeight: 420 }}>
            <img src="/bar-frutas.jpg" alt="Frutas frescas variadas sobre fundo escuro" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.5)" }} />
            <div style={{ position: "relative", zIndex: 2, padding: 36 }}>
              <h2 className="sec-t" style={{ color: WHITE }}>Perfeito <em>para</em></h2>
              <div className="g4" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16, marginTop: 30 }}>
                {IDEAL.map((i) => (
                  <div key={i.t} style={{ background: "rgba(20,16,23,.78)", border: `1px solid ${LINE}`, borderRadius: 6, padding: "26px 18px", textAlign: "center", backdropFilter: "blur(4px)" }}>
                    <Ic d={i.ic} s={34} />
                    <div style={{ marginTop: 14, fontSize: 14, fontWeight: 700, color: TXT }}>{i.t}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* rodapé */}
      <footer id="contato" style={{ background: BG2, borderTop: `1px solid ${LINE}`, padding: "64px 0 32px" }}>
        <div className="wrap foot-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1.4fr 1fr 1fr", gap: 40 }}>
          <div>
            <span className="wordmark wm-under" style={{ fontSize: 30, color: WHITE }}>Bar Lisse</span>
            <p style={{ marginTop: 16, fontSize: 13, lineHeight: 1.6, color: TXT2 }}>Crie a sua história de sabores com a {brand}.</p>
            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              {["IG", "TT", "WA"].map((s) => <span key={s} style={{ width: 34, height: 34, border: `1px solid ${LINE}`, borderRadius: 3, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: TXT2, cursor: "pointer" }}>{s}</span>)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, textTransform: "uppercase", color: TXT }}>Assine as novidades</div>
            <p style={{ marginTop: 12, fontSize: 13, lineHeight: 1.6, color: TXT2 }}>Seja o primeiro a saber de sabores novos, promoções e receitas.</p>
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <span style={{ flex: 1, border: `1px solid ${LINE}`, borderRadius: 3, padding: "12px 14px", fontSize: 13, color: TXT2 }}>Seu e-mail</span>
              <a href={wa("Olá! Quero assinar as novidades da " + brand + ".")} className="btn" style={{ padding: "12px 20px" }}>Assinar</a>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, textTransform: "uppercase", color: TXT }}>Menu</div>
            {[["Sabores", "sabores"], ["Coquetéis", "coqueteis"], ["A marca", "marca"], ["Contato", "contato"]].map(([n, id]) => (
              <div key={n} style={{ marginTop: 12 }}><a className="nav-a" onClick={() => go(id ?? "")} style={{ fontSize: 13, color: TXT2, cursor: "pointer" }}>{n}</a></div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, textTransform: "uppercase", color: TXT }}>Contato</div>
            <div style={{ marginTop: 12, fontSize: 13, lineHeight: 2, color: TXT2 }}>
              {city}, SP<br />Seg–Sex, 9h às 18h<br />© 2026 {brand}
            </div>
          </div>
        </div>
        <div className="wrap" style={{ marginTop: 44, borderTop: `1px solid ${LINE}`, paddingTop: 20, fontSize: 12, color: TXT2, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <span>© 2026 {brand}. Todos os direitos reservados.</span>
          <span>Xaropes premium · {city}</span>
        </div>
      </footer>
    </div>
  );
}
