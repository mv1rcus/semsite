import { useEffect } from "react";

/** Açaiteria construída do zero a partir do pin E-16: magenta escuro com amarelo, Anton gigante, hero com copos e splash, combos em cards magenta, banners de promoção e monte-seu-açaí com fotos de toppings. Pedido fecha no WhatsApp. */
const MAG = "#6b0f3f", MAGD = "#4a0a2c", MAGL = "#8f1753", YEL = "#ffc727", YELD = "#e0a800", CRM = "#fff6f8", INK = "#33101f", MUT = "#7d5a6c";
const COMBOS = [
  { n: "Combo Love", s: "Açaí com morangos frescos e leite condensado", p: "R$ 18", img: "/acai-combo1.jpg", tag: "O queridinho" },
  { n: "Combo Ninho", s: "Açaí com Nutella e leite em pó", p: "R$ 22", img: "/acai-combo2.jpg", tag: "Mais pedido" },
  { n: "Combo Fit", s: "Açaí com granola crocante e banana", p: "R$ 16", img: "/acai-combo3.jpg", tag: "Leve" },
  { n: "Combo Tropical", s: "Açaí com manga, maracujá e coco", p: "R$ 20", img: "/acai-combo4.jpg", tag: "Refrescante" },
];
const TOPS = [
  { n: "Leite condensado", img: "/acai-top1.jpg" },
  { n: "Nutella", img: "/acai-top2.jpg" },
  { n: "Morango picado", img: "/acai-top3.jpg" },
  { n: "Granola crocante", img: "/acai-top4.jpg" },
];
const EXTRA = ["Leite em pó", "Maracujá", "Banana", "Coco ralado", "Paçoca", "Ovomaltine", "Chantilly", "Calda de chocolate"];
const CHECK = "M7 16l6 6L26 9";
const Ic = ({ d, s = 22, c = "currentColor" }: { d: string; s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke={c} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);

export function AcaiFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Villa Açaí";
  const city = client?.city?.trim() || "Vitória";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const wa = (m: string) => `https://wa.me/${phone || "5527999999999"}?text=${encodeURIComponent(m)}`;
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const display = "Anton, Impact, sans-serif";
  const script = "Yellowtail, cursive";
  useEffect(() => {
    const l = document.createElement("link");
    l.href = "https://fonts.googleapis.com/css2?family=Anton&family=Karla:wght@300..800&family=Yellowtail&display=swap";
    l.rel = "stylesheet"; document.head.appendChild(l);
  }, []);
  return (
    <div className="aca" style={{ fontFamily: "'Karla', system-ui, sans-serif", color: INK, background: CRM, overflowX: "hidden" }}>
      <style>{`
        .aca figure{margin:0}
        .aca h1,.aca h2,.aca h3{font-family:${display}!important;font-weight:400;letter-spacing:.01em;line-height:1;text-wrap:balance;text-transform:uppercase}
        .aca .wrap{max-width:1140px;margin:0 auto;padding:0 28px}
        .aca .btn{font-family:'Karla',system-ui,sans-serif;display:inline-flex;align-items:center;gap:10px;background:${YEL};color:${MAGD};font-weight:800;font-size:15px;padding:15px 28px;border-radius:999px;text-decoration:none;border:none;cursor:pointer;transition:.2s;letter-spacing:.3px}
        .aca .btn:hover{background:#ffd24d;transform:translateY(-2px)}
        .aca .btn-o{font-family:'Karla',system-ui,sans-serif;text-decoration:none;display:inline-flex;align-items:center;gap:10px;background:none;color:#fff;border:1.5px solid rgba(255,255,255,.75);font-weight:700;font-size:15px;padding:14px 26px;border-radius:999px;cursor:pointer;transition:.2s}
        .aca .btn-o:hover{background:rgba(255,255,255,.12)}
        .aca .eyebrow{display:inline-flex;align-items:center;gap:8px;color:${YEL};font-weight:800;font-size:12px;letter-spacing:2.5px;text-transform:uppercase}
        .aca .eyebrow::before{content:"●";font-size:8px}
        .aca .hov{transition:transform .2s,box-shadow .2s}
        .aca .hov:hover{transform:translateY(-4px);box-shadow:0 20px 44px -22px rgba(74,10,44,.5)}
        @media (max-width:900px){
          .aca .g4{grid-template-columns:1fr 1fr!important}
          .aca .hero-g{grid-template-columns:1fr!important}
          .aca .monte-g{grid-template-columns:1fr!important}
          .aca .promo-g{grid-template-columns:1fr!important}
          .aca .desk-nav{display:none!important}
        }
        @media (max-width:560px){
          .aca .g4{grid-template-columns:1fr!important}
          .aca .tops-g{grid-template-columns:1fr 1fr!important}
        }
      `}</style>

      {/* header */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(74,10,44,.94)", backdropFilter: "blur(10px)" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 28px" }}>
          <span style={{ fontFamily: script, fontSize: 30, color: "#fff", lineHeight: 1 }}>{brand}</span>
          <nav style={{ display: "flex", gap: 24, fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "rgba(255,246,248,.8)" }} className="desk-nav">
            {( [["Combos","combos"],["Promoções","promos"],["Monte o seu","monte"],["Contato","contato"]] as [string,string][] ).map(([n, id]) => <a key={id} onClick={() => go(id)} style={{ cursor: "pointer" }}>{n}</a>)}
          </nav>
          <a href={wa("Olá! Quero fazer um pedido no " + brand + ".")} className="btn" style={{ padding: "11px 22px", fontSize: 14 }}>Fazer pedido</a>
        </div>
      </header>

      {/* hero — à risca do pin: magenta escuro, JÁ TOMOU amarelo gigante, copos com splash à direita */}
      <section style={{ background: `radial-gradient(900px 520px at 82% 30%, ${MAGL} 0%, ${MAG} 55%, ${MAGD} 100%)`, color: "#fff", overflow: "hidden" }}>
        <div className="wrap hero-g" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 44, alignItems: "center", padding: "76px 28px 70px" }}>
          <div>
            <span className="eyebrow">Açaiteria · {city}</span>
            <h1 style={{ margin: "16px 0 8px", fontSize: "clamp(56px,8.5vw,110px)", color: YEL }}>Já tomou</h1>
            <p style={{ fontFamily: display, fontSize: "clamp(26px,3.4vw,44px)", textTransform: "uppercase", color: "#fff", margin: "0 0 22px", lineHeight: 1.05 }}>seu açaí hoje?</p>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "rgba(255,246,248,.85)", maxWidth: 440, marginBottom: 30 }}>
              Cremoso, gelado e do jeito que você gosta: monte o seu com até 4 acompanhamentos grátis ou escolha um combo pronto. Delivery em toda a cidade.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 28 }}>
              <a className="btn" href={wa("Olá! Quero pedir um açaí no " + brand + ".")}>Fazer pedido →</a>
              <button className="btn-o" onClick={() => go("combos")}>Ver combos →</button>
            </div>
            <div style={{ display: "flex", gap: 22, fontSize: 13.5, fontWeight: 700, color: "rgba(255,246,248,.85)", flexWrap: "wrap" }}>
              {["Delivery em ~30 min", "4 acompanhamentos grátis", "500ml e 700ml"].map((b) => <span key={b} style={{ display: "inline-flex", gap: 7, alignItems: "center" }}><Ic d={CHECK} s={14} c={YEL} />{b}</span>)}
            </div>
          </div>
          <img src="/acai-hero.jpg" alt="Três copos de açaí com toppings e respingos" style={{ width: "100%", aspectRatio: "16/11", objectFit: "cover", borderRadius: 24, boxShadow: "0 32px 64px -28px rgba(0,0,0,.55)" }} />
        </div>
      </section>

      {/* combos */}
      <section id="combos" style={{ padding: "84px 0 70px", background: CRM }}>
        <div className="wrap">
          <div style={{ textAlign: "center" }}>
            <span className="eyebrow" style={{ color: MAGL, justifyContent: "center" }}>Nossos combos</span>
            <h2 style={{ marginTop: 12, fontSize: "clamp(32px,4vw,48px)", color: MAGD }}>Escolha o seu favorito</h2>
          </div>
          <div className="g4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, marginTop: 40 }}>
            {COMBOS.map((c) => (
              <article key={c.n} className="hov" style={{ background: `linear-gradient(165deg, ${MAGL} 0%, ${MAG} 60%, ${MAGD} 100%)`, borderRadius: 22, overflow: "hidden", color: "#fff", display: "flex", flexDirection: "column" }}>
                <img src={c.img} alt={c.n} style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover" }} />
                <div style={{ padding: "20px 20px 22px", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.8, textTransform: "uppercase", color: YEL }}>{c.tag}</span>
                  <h3 style={{ fontFamily: script + "!important", fontSize: 30, color: "#fff", textTransform: "none", letterSpacing: 0 }}>{c.n}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: "rgba(255,246,248,.85)", flex: 1 }}>{c.s}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6 }}>
                    <span style={{ fontFamily: display, fontSize: 26, color: YEL }}>{c.p}</span>
                    <a href={wa(`Olá! Quero o ${c.n} (${c.p}) do ${brand}.`)} style={{ background: YEL, color: MAGD, fontWeight: 800, fontSize: 13.5, padding: "9px 18px", borderRadius: 999, textDecoration: "none" }}>Pedir</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 34 }}>
            <a className="btn" href={wa("Olá! Quero fazer um pedido no " + brand + ".")}>Fazer pedido →</a>
          </div>
        </div>
      </section>

      {/* promoções */}
      <section id="promos" style={{ padding: "70px 0", background: "#fff" }}>
        <div className="wrap">
          <span className="eyebrow" style={{ color: MAGL }}>Promoções</span>
          <h2 style={{ marginTop: 12, fontSize: "clamp(32px,4vw,48px)", color: MAGD }}>Hmmm... nesse calor o que mais combina?</h2>
          <div className="promo-g" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 36 }}>
            <figure className="hov" style={{ position: "relative", borderRadius: 22, overflow: "hidden", minHeight: 340 }}>
              <img src="/acai-promo1.jpg" alt="Copo gigante de açaí transbordando de toppings" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(10deg, rgba(74,10,44,.88) 20%, rgba(74,10,44,.15) 65%)" }} />
              <figcaption style={{ position: "absolute", left: 24, bottom: 22, right: 24, color: "#fff" }}>
                <span style={{ fontFamily: script, fontSize: 34, color: YEL }}>Gostosura!</span>
                <p style={{ fontFamily: display, textTransform: "uppercase", fontSize: 21, margin: "4px 0 10px" }}>Qualquer combo com gorjeta de açaí por R$ 25</p>
                <a href={wa("Olá! Quero a promoção Gostosura do " + brand + ".")} style={{ color: YEL, fontWeight: 800, fontSize: 14, textDecoration: "none" }}>Quero essa →</a>
              </figcaption>
            </figure>
            <figure className="hov" style={{ position: "relative", borderRadius: 22, overflow: "hidden", minHeight: 340 }}>
              <img src="/acai-promo2.jpg" alt="Barca de açaí com frutas para duas pessoas" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(10deg, rgba(74,10,44,.88) 20%, rgba(74,10,44,.15) 65%)" }} />
              <figcaption style={{ position: "absolute", left: 24, bottom: 22, right: 24, color: "#fff" }}>
                <span style={{ fontFamily: script, fontSize: 34, color: YEL }}>Barca de açaí</span>
                <p style={{ fontFamily: display, textTransform: "uppercase", fontSize: 21, margin: "4px 0 10px" }}>Barca completa 1L + 10 acompanhamentos por R$ 49</p>
                <a href={wa("Olá! Quero a barca de açaí do " + brand + ".")} style={{ color: YEL, fontWeight: 800, fontSize: 14, textDecoration: "none" }}>Chama no delivery →</a>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* monte seu açaí */}
      <section id="monte" style={{ padding: "84px 0", background: `linear-gradient(120deg, ${MAGD} 0%, ${MAG} 100%)`, color: "#fff" }}>
        <div className="wrap monte-g" style={{ display: "grid", gridTemplateColumns: ".9fr 1.1fr", gap: 48, alignItems: "center" }}>
          <div>
            <span className="eyebrow">Monte seu açaí</span>
            <h2 style={{ marginTop: 12, fontSize: "clamp(32px,4.2vw,52px)", color: YEL }}>Quem manda é você</h2>
            <p style={{ marginTop: 16, fontSize: 16.5, lineHeight: 1.7, color: "rgba(255,246,248,.85)" }}>
              Monte o seu açaí do jeito que quiser: escolha a base, os acompanhamentos e a calda. Confira a variedade que temos pra montar um açaí do seu jeito.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 22 }}>
              {EXTRA.map((e) => <span key={e} style={{ fontSize: 13, fontWeight: 700, color: "#fff", border: "1px solid rgba(255,255,255,.35)", borderRadius: 999, padding: "7px 14px" }}>{e}</span>)}
            </div>
            <a className="btn" style={{ marginTop: 28 }} href={wa("Olá! Quero montar meu açaí no " + brand + ".")}>Montar o meu →</a>
          </div>
          <div className="tops-g" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {TOPS.map((t) => (
              <figure key={t.n} className="hov" style={{ borderRadius: 18, overflow: "hidden", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.14)" }}>
                <img src={t.img} alt={t.n} style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover" }} />
                <figcaption style={{ padding: "12px 14px", fontWeight: 700, fontSize: 14, color: "#fff" }}>{t.n}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* contato/footer */}
      <footer id="contato" style={{ background: MAGD, color: "rgba(255,246,248,.75)", padding: "44px 0 34px" }}>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 18 }}>
          <div>
            <span style={{ fontFamily: script, fontSize: 32, color: "#fff" }}>{brand}</span>
            <p style={{ fontSize: 14, marginTop: 6 }}>{city} · Açaí cremoso com delivery rápido</p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a className="btn" href={wa("Olá! Quero fazer um pedido no " + brand + ".")}>Fazer pedido →</a>
          </div>
        </div>
        <div className="wrap" style={{ marginTop: 26, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,.14)", fontSize: 13, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <span>Seg a Dom, 12h às 23h</span>
          <span>Feito com açaí de verdade</span>
        </div>
      </footer>
    </div>
  );
}
