import { useEffect, useState } from "react";

const RED = "#e03131";
const INK = "#0f0f10";
const cond = "'Barlow Condensed', 'Arial Narrow', sans-serif";
const sans = "'Inter', system-ui, sans-serif";

const CATS: [string, string][] = [
  ["Corrida", "/passo-running.jpg"],
  ["Casual", "/passo-lifestyle.jpg"],
  ["Basquete", "/passo-basket.jpg"],
  ["Treino", "/passo-training.jpg"],
  ["Skate", "/passo-skate.jpg"],
  ["Lançamentos", "/passo-new.jpg"],
];

const PRODS: { img: string; name: string; price: string; old?: string; tag?: string; stars: string }[] = [
  { img: "/passo-hero.jpg", name: "Cano Alto Vulcão", price: "R$ 599,90", tag: "NOVO", stars: "4.9 (512)" },
  { img: "/passo-running.jpg", name: "Corrida Aura", price: "R$ 449,90", stars: "4.8 (428)" },
  { img: "/passo-lifestyle.jpg", name: "Clássico P&B", price: "R$ 379,90", tag: "MAIS VENDIDO", stars: "4.9 (1.204)" },
  { img: "/passo-basket.jpg", name: "Basquete Ignite", price: "R$ 529,90", stars: "4.7 (296)" },
  { img: "/passo-training.jpg", name: "Treino Sombra", price: "R$ 399,90", old: "R$ 499,90", tag: "OFERTA", stars: "4.8 (377)" },
  { img: "/passo-skate.jpg", name: "Skate Lona", price: "R$ 329,90", stars: "4.8 (210)" },
];

const BRANDS = ["VULTO", "Atom", "PANTERA", "norte*", "ZEPHYR", "ÓRBITA"];

function Stars({ label, dark }: { label: string; dark?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span style={{ color: "#f5a623", fontSize: 13, letterSpacing: 1 }}>★★★★★</span>
      <span style={{ fontSize: 12, color: dark ? "#9ca3af" : "#6b7280" }}>{label}</span>
    </div>
  );
}

export function PassoAltoFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const nome = client?.name || "Passo Alto Sneakers";
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    document.title = nome + " — Tênis que elevam seu estilo";
  }, [nome]);
  const wa = client?.whatsapp ? `https://wa.me/${client.whatsapp.replace(/\D/g, "")}` : "#contato";
  return (
    <div className="passo" style={{ fontFamily: sans, color: INK, background: "#fff" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Inter:wght@400;500;600;700;800&display=swap');
        .passo a{text-decoration:none;color:inherit}
        .passo .nav-desk{display:flex;gap:26px}
        .passo .hamb{display:none;background:none;border:0;cursor:pointer;padding:6px}
        .passo .mob-menu{display:none}
        .passo .cats{grid-template-columns:repeat(6,1fr)}
        .passo .prods{grid-template-columns:repeat(3,1fr)}
        .passo .trust{grid-template-columns:repeat(4,1fr)}
        .passo .bans{grid-template-columns:1fr 1fr}
        .passo .foot{grid-template-columns:2fr 1fr 1fr 1fr 1.4fr}
        .passo .hero-grid{grid-template-columns:1.05fr .95fr}
        .passo .hero{padding:72px 6vw}
        @media(max-width:1000px){
          .passo .cats{grid-template-columns:repeat(3,1fr)}
          .passo .prods{grid-template-columns:repeat(2,1fr)}
          .passo .trust{grid-template-columns:repeat(2,1fr)}
          .passo .foot{grid-template-columns:1fr 1fr}
        }
        @media(max-width:720px){
          .passo .nav-desk{display:none}
          .passo .hamb{display:block}
          .passo .mob-menu.open{display:flex;flex-direction:column;gap:2px;padding:10px 5vw 16px;background:#fff;border-bottom:1px solid #eee}
          .passo .hero-grid{grid-template-columns:1fr}
          .passo .hero{padding:52px 6vw 60px}
          .passo .bans{grid-template-columns:1fr}
          .passo .cats{grid-template-columns:repeat(2,1fr)}
          .passo .prods{grid-template-columns:1fr}
          .passo .foot{grid-template-columns:1fr}
          .passo .topbar span.mid{display:none}
          .passo .busca{display:none}
        }`}</style>

      {/* top bar */}
      <div className="topbar" style={{ background: INK, color: "#d4d4d4", fontSize: 12, display: "flex", justifyContent: "space-between", gap: 12, padding: "8px 5vw" }}>
        <span>Frete grátis em pedidos acima de R$ 299</span>
        <span className="mid">Devolução fácil em 30 dias</span>
        <span>★ 4.8 (2K+ avaliações)</span>
      </div>

      {/* header */}
      <header style={{ background: "#fff", borderBottom: "1px solid #eee", position: "sticky", top: 0, zIndex: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 28, padding: "14px 5vw" }}>
          <a href="#topo" style={{ fontFamily: cond, fontWeight: 700, fontSize: 30, letterSpacing: ".04em" }}>
            PASSO<span style={{ color: RED }}>ALTO</span>
          </a>
          <nav className="nav-desk" style={{ fontSize: 14, fontWeight: 600, marginLeft: 8 }}>
            <a href="#topo" style={{ color: RED }}>Início</a>
            <a href="#categorias">Categorias</a>
            <a href="#destaques">Destaques</a>
            <a href="#drops">Lançamentos</a>
            <a href="#ofertas">Ofertas</a>
          </nav>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 14 }}>
            <input className="busca" placeholder="Buscar tênis..." style={{ border: "1px solid #e5e5e5", borderRadius: 999, padding: "9px 16px", fontSize: 13, width: 180, outline: "none" }} />
            <a href={wa} aria-label="Carrinho" style={{ fontSize: 20 }}>🛒</a>
            <button className="hamb" onClick={() => setMenu(!menu)} aria-label="Menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0f0f10" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
            </button>
          </div>
        </div>
        <div className={menu ? "mob-menu open" : "mob-menu"}>
          {[["Início", "#topo"], ["Categorias", "#categorias"], ["Destaques", "#destaques"], ["Lançamentos", "#drops"], ["Ofertas", "#ofertas"]].map(([l, h]) => (
            <a key={l} href={h} onClick={() => setMenu(false)} style={{ padding: "10px 4px", fontWeight: 600, fontSize: 15, borderBottom: "1px solid #f3f3f3" }}>{l}</a>
          ))}
        </div>
      </header>

      {/* hero */}
      <section id="topo" className="hero" style={{ background: "radial-gradient(80% 120% at 78% 20%, #2a1214 0%, #111112 55%)", position: "relative", overflow: "hidden" }}>
        <div className="hero-grid" style={{ display: "grid", alignItems: "center", gap: 40, maxWidth: 1280, margin: "0 auto" }}>
          <div>
            <p style={{ color: RED, fontWeight: 700, fontSize: 13, letterSpacing: ".28em", margin: "0 0 14px" }}>LANÇAMENTOS</p>
            <h1 style={{ fontFamily: cond, fontWeight: 700, fontSize: "clamp(48px,7vw,96px)", lineHeight: .95, letterSpacing: ".01em", color: "#f5f5f4", margin: "0 0 18px", textTransform: "uppercase" }}>
              Suba de nível<br />no seu estilo
            </h1>
            <p style={{ color: "#b6b6b6", fontSize: 16, lineHeight: 1.6, maxWidth: 420, margin: "0 0 28px" }}>
              Os tênis mais desejados das ruas, com conforto premium e estilo icônico.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a href="#destaques" style={{ background: RED, color: "#fff", fontWeight: 700, fontSize: 14, padding: "14px 26px", borderRadius: 8, letterSpacing: ".06em" }}>COMPRAR AGORA →</a>
              <a href="#categorias" style={{ border: "1.5px solid #4b4b4e", color: "#e5e5e5", fontWeight: 700, fontSize: 14, padding: "14px 26px", borderRadius: 8, letterSpacing: ".06em" }}>EXPLORAR COLEÇÃO</a>
            </div>
          </div>
          <div style={{ position: "relative", textAlign: "center" }}>
            <img src="/passo-hero.jpg" alt="Tênis cano alto vermelho, preto e branco" style={{ width: "100%", maxWidth: 560, borderRadius: 18, filter: "drop-shadow(0 40px 60px rgba(224,49,49,.28))" }} />
            <div style={{ position: "absolute", top: 6, right: "6%" }}>
              <svg width="128" height="128" viewBox="0 0 128 128" style={{ textRendering: "optimizeLegibility" }}>
                <defs><path id="circ" d="M64,64 m-48,0 a48,48 0 1,1 96,0 a48,48 0 1,1 -96,0"/></defs>
                <circle cx="64" cy="64" r="48" fill="none" stroke={RED} strokeWidth="1.5" strokeDasharray="3 4" />
                <text fill={RED} fontSize="15.5" fontWeight="700" letterSpacing="3" style={{ fontFamily: cond }}>
                  <textPath href="#circ" textLength="301" lengthAdjust="spacingAndGlyphs">ATÉ 30% OFF • ATÉ 30% OFF • </textPath>
                </text>
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: RED, fontFamily: cond, fontWeight: 700 }}>
                <span style={{ fontSize: 13, letterSpacing: ".1em" }}>ATÉ</span>
                <span style={{ fontSize: 34, lineHeight: 1 }}>30%</span>
                <span style={{ fontSize: 13, letterSpacing: ".1em" }}>OFF</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* trust bar */}
      <section style={{ borderBottom: "1px solid #eee", background: "#fff" }}>
        <div className="trust" style={{ display: "grid", maxWidth: 1280, margin: "0 auto", padding: "22px 5vw", gap: 18 }}>
          {[
            ["M3 7h11v10H3z M14 10h4l3 3v4h-7z M7 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm11 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z", "FRETE GRÁTIS", "Em pedidos acima de R$ 299"],
            ["M4 9V5h16v4M4 9h16v10H4z M9 13l2 2 4-4", "DEVOLUÇÃO FÁCIL", "30 dias pra trocar"],
            ["M12 3l8 3v6c0 5-3.4 9.4-8 11-4.6-1.6-8-6-8-11V6z M9 12l2.5 2.5L16 10", "PRODUTOS AUTÊNTICOS", "100% originais"],
            ["M8 17a8 8 0 1 1 8 0 M8 17v2a2 2 0 0 0 2 2h1v-5H9a1 1 0 0 1-1 1zm8 0v2a2 2 0 0 1-2 2h-1v-5h2a1 1 0 0 0 1 1z", "SUPORTE", "Atendimento todos os dias"],
          ].map(([d, t, s]) => (
            <div key={t} style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={RED} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
              <div>
                <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 16, letterSpacing: ".05em" }}>{t}</div>
                <div style={{ fontSize: 12.5, color: "#6b7280" }}>{s}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* categorias */}
      <section id="categorias" style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 5vw 10px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 22 }}>
          <h2 style={{ fontFamily: cond, fontWeight: 700, fontSize: "clamp(26px,3vw,36px)", margin: 0, textTransform: "uppercase", letterSpacing: ".02em" }}>Compre por categoria</h2>
          <a href="#categorias" style={{ fontSize: 13, fontWeight: 700, color: RED }}>VER TODAS →</a>
        </div>
        <div className="cats" style={{ display: "grid", gap: 14 }}>
          {CATS.map(([c, img]) => (
            <a key={c} href="#destaques" style={{ background: "#f5f5f4", borderRadius: 14, padding: "14px 14px 12px", textAlign: "center", display: "block" }}>
              <img src={img} alt={"Tênis " + c} style={{ width: "100%", height: 110, objectFit: "contain" }} />
              <div style={{ fontWeight: 700, fontSize: 14, marginTop: 8 }}>{c}</div>
              <div style={{ fontSize: 12, color: "#6b7280" }}>Comprar →</div>
            </a>
          ))}
        </div>
      </section>

      {/* destaques */}
      <section id="destaques" style={{ maxWidth: 1280, margin: "0 auto", padding: "52px 5vw 10px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 22 }}>
          <h2 style={{ fontFamily: cond, fontWeight: 700, fontSize: "clamp(26px,3vw,36px)", margin: 0, textTransform: "uppercase", letterSpacing: ".02em" }}>Tênis em destaque</h2>
          <a href="#destaques" style={{ fontSize: 13, fontWeight: 700, color: RED }}>VER TODOS OS PRODUTOS →</a>
        </div>
        <div className="prods" style={{ display: "grid", gap: 16 }}>
          {PRODS.map((p) => (
            <div key={p.name} style={{ border: "1px solid #eee", borderRadius: 16, overflow: "hidden", background: "#fff" }}>
              <div style={{ position: "relative", background: "#f5f5f4", padding: 18 }}>
                {p.tag && (
                  <span style={{ position: "absolute", top: 12, left: 12, background: p.tag === "OFERTA" ? RED : INK, color: "#fff", fontSize: 10.5, fontWeight: 800, letterSpacing: ".08em", padding: "4px 9px", borderRadius: 5 }}>{p.tag}</span>
                )}
                <img src={p.img} alt={p.name} style={{ width: "100%", height: 170, objectFit: "contain" }} />
              </div>
              <div style={{ padding: "14px 16px 16px" }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{p.name}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, margin: "6px 0" }}>
                  <span style={{ color: RED, fontWeight: 800, fontSize: 16 }}>{p.price}</span>
                  {p.old && <span style={{ color: "#9ca3af", fontSize: 12.5, textDecoration: "line-through" }}>{p.old}</span>}
                </div>
                <Stars label={p.stars} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* banners */}
      <section id="ofertas" style={{ maxWidth: 1280, margin: "0 auto", padding: "52px 5vw 10px" }}>
        <div className="bans" style={{ display: "grid", gap: 16 }}>
          <div style={{ background: INK, borderRadius: 18, padding: "34px 30px", display: "flex", alignItems: "center", gap: 20, overflow: "hidden" }}>
            <div style={{ flex: 1 }}>
              <p style={{ color: RED, fontSize: 11.5, fontWeight: 800, letterSpacing: ".18em", margin: "0 0 8px" }}>OFERTA POR TEMPO LIMITADO</p>
              <h3 style={{ fontFamily: cond, fontWeight: 700, fontSize: "clamp(24px,2.6vw,34px)", color: "#f5f5f4", margin: "0 0 8px", textTransform: "uppercase", lineHeight: 1.02 }}>20% OFF em itens selecionados</h3>
              <a href="#destaques" style={{ display: "inline-block", marginTop: 12, background: "#fff", color: INK, fontWeight: 800, fontSize: 13, padding: "11px 20px", borderRadius: 8 }}>COMPRAR OFERTAS →</a>
            </div>
            <img src="/passo-hero.jpg" alt="Tênis cano alto vermelho e preto em fundo escuro" style={{ width: "42%", maxWidth: 220, filter: "drop-shadow(0 24px 30px rgba(224,49,49,.35))" }} />
          </div>
          <div id="drops" style={{ background: "#f5f5f4", borderRadius: 18, padding: "34px 30px", display: "flex", alignItems: "center", gap: 20, overflow: "hidden" }}>
            <div style={{ flex: 1 }}>
              <p style={{ color: RED, fontSize: 11.5, fontWeight: 800, letterSpacing: ".18em", margin: "0 0 8px" }}>COLEÇÃO EXCLUSIVA</p>
              <h3 style={{ fontFamily: cond, fontWeight: 700, fontSize: "clamp(24px,2.6vw,34px)", margin: "0 0 8px", textTransform: "uppercase", lineHeight: 1.02 }}>Novos drops toda semana</h3>
              <p style={{ fontSize: 13.5, color: "#6b7280", margin: "0 0 4px" }}>Não perca os lançamentos mais quentes.</p>
              <a href="#destaques" style={{ display: "inline-block", marginTop: 10, background: INK, color: "#fff", fontWeight: 800, fontSize: 13, padding: "11px 20px", borderRadius: 8 }}>EXPLORAR AGORA →</a>
            </div>
            <img src="/passo-drops.jpg" alt="Par de tênis brancos novos" style={{ width: "46%", maxWidth: 250, borderRadius: 12 }} />
          </div>
        </div>
      </section>

      {/* marcas */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "52px 5vw 14px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 20 }}>
          <h2 style={{ fontFamily: cond, fontWeight: 700, fontSize: "clamp(22px,2.4vw,30px)", margin: 0, textTransform: "uppercase", letterSpacing: ".02em" }}>Marcas da casa</h2>
          <a href="#topo" style={{ fontSize: 13, fontWeight: 700, color: RED }}>VER TODAS →</a>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "18px 44px", alignItems: "center", justifyContent: "space-between" }}>
          {BRANDS.map((b, i) => (
            <span key={b} style={{ fontSize: 24, color: "#1c1c1e", fontFamily: i % 2 ? "Georgia, serif" : cond, fontStyle: i % 2 ? "italic" : "normal", fontWeight: 700, letterSpacing: i % 2 ? 0 : ".06em" }}>{b}</span>
          ))}
        </div>
      </section>

      {/* newsletter */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "26px 5vw 60px" }}>
        <div style={{ background: INK, borderRadius: 18, padding: "34px 30px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 18 }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <h3 style={{ fontFamily: cond, fontWeight: 700, fontSize: "clamp(22px,2.4vw,30px)", color: "#f5f5f4", margin: "0 0 6px", textTransform: "uppercase" }}>Fique por dentro do <span style={{ color: RED }}>loop</span></h3>
            <p style={{ color: "#9ca3af", fontSize: 13.5, margin: 0 }}>Ofertas especiais, brindes e lançamentos em primeira mão.</p>
          </div>
          <div style={{ display: "flex", gap: 10, flex: 1, minWidth: 260, maxWidth: 460 }}>
            <input placeholder="Digite seu e-mail" style={{ flex: 1, background: "#1c1c1e", border: "1px solid #333", borderRadius: 9, padding: "13px 16px", color: "#f5f5f4", fontSize: 14, outline: "none" }} />
            <a href={wa} style={{ background: RED, color: "#fff", fontWeight: 800, fontSize: 13, padding: "13px 20px", borderRadius: 9, letterSpacing: ".05em", display: "inline-flex", alignItems: "center" }}>ASSINAR</a>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer id="contato" style={{ background: INK, color: "#9ca3af" }}>
        <div className="foot" style={{ display: "grid", maxWidth: 1280, margin: "0 auto", padding: "48px 5vw 30px", gap: 26 }}>
          <div>
            <div style={{ fontFamily: cond, fontWeight: 700, fontSize: 26, color: "#f5f5f4" }}>PASSO<span style={{ color: RED }}>ALTO</span></div>
            <p style={{ fontSize: 13, lineHeight: 1.6, marginTop: 10, maxWidth: 260 }}>Seu destino para tênis premium de rua. Suba de nível no seu estilo.</p>
          </div>
          <div>
            <div style={{ color: "#f5f5f4", fontWeight: 700, fontSize: 13, letterSpacing: ".1em", marginBottom: 12 }}>LOJA</div>
            {["Masculino", "Feminino", "Infantil", "Lançamentos", "Ofertas"].map((l) => <div key={l} style={{ fontSize: 13.5, marginBottom: 8 }}><a href="#destaques">{l}</a></div>)}
          </div>
          <div>
            <div style={{ color: "#f5f5f4", fontWeight: 700, fontSize: 13, letterSpacing: ".1em", marginBottom: 12 }}>AJUDA</div>
            {["Trocas e devoluções", "Guia de tamanhos", "Rastrear pedido", "Fale conosco"].map((l) => <div key={l} style={{ fontSize: 13.5, marginBottom: 8 }}><a href={wa}>{l}</a></div>)}
          </div>
          <div>
            <div style={{ color: "#f5f5f4", fontWeight: 700, fontSize: 13, letterSpacing: ".1em", marginBottom: 12 }}>A LOJA</div>
            {["Sobre nós", "Autenticidade", "Trabalhe conosco", "Blog"].map((l) => <div key={l} style={{ fontSize: 13.5, marginBottom: 8 }}><a href="#topo">{l}</a></div>)}
          </div>
          <div>
            <div style={{ color: "#f5f5f4", fontWeight: 700, fontSize: 13, letterSpacing: ".1em", marginBottom: 12 }}>CONTATO</div>
            <div style={{ fontSize: 13.5, marginBottom: 8 }}>Juiz de Fora — MG</div>
            <div style={{ fontSize: 13.5, marginBottom: 8 }}><a href={wa}>WhatsApp da loja</a></div>
            <div style={{ fontSize: 13.5 }}>contato@passoalto.com.br</div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #222", textAlign: "center", padding: "16px 5vw", fontSize: 12 }}>© 2026 {nome}. Todos os direitos reservados.</div>
      </footer>
    </div>
  );
}
