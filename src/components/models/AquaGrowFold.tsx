import { useEffect } from "react";

/** Sistemas de aquaponia indoor, construído do zero a partir do pin E-19: verde-noite com coral, hero com sistema vivo, ciclo da aquaponia em 3 passos, 3 sistemas com foto e preço, faixa de sala de estar e CTA final com peixes. Pedido fecha no WhatsApp. */
const NG = "#0d2620", NG2 = "#12332a", CORAL = "#ff8a5c", MINT = "#9fd8b4", CRM = "#f3f7f2", INK = "#14231c", MUT = "#5a6f63";
const SYS = [
  { t: "Nano Pod", d: "Ecossistema compacto para mesas e espaços pequenos.", p: "R$ 1.499", img: "/ag-sys1.jpg", tag: "Para começar" },
  { t: "Home System", d: "Produza mais, mantenha mais peixes e tenha uma horta indoor viva.", p: "R$ 3.499", img: "/ag-sys2.jpg", tag: "Mais vendido", hot: true },
  { t: "Studio System", d: "Sistema expansível para growers sérios e casas modernas.", p: "R$ 6.499", img: "/ag-sys3.jpg", tag: "Alta produção" },
];
const CYCLE = [
  { n: "1", t: "Os peixes produzem nutrientes", d: "Os resíduos naturais viram alimento para as plantas." },
  { n: "2", t: "As plantas crescem e limpam a água", d: "Absorvem os nutrientes e purificam o aquário." },
  { n: "3", t: "A água limpa volta aos peixes", d: "Um ciclo fechado, saudável e equilibrado." },
];
const CHECK = "M7 16l6 6L26 9";
const Ic = ({ d, s = 22, c = "currentColor" }: { d: string; s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);

export function AquaGrowFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "AquaGrow";
  const city = client?.city?.trim() || "Curitiba";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const wa = (m: string) => `https://wa.me/${phone || "5541999999999"}?text=${encodeURIComponent(m)}`;
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const display = "Sora, system-ui, sans-serif";
  useEffect(() => {
    const l = document.createElement("link");
    l.href = "https://fonts.googleapis.com/css2?family=Sora:wght@300..800&family=Karla:wght@300..800&display=swap";
    l.rel = "stylesheet"; document.head.appendChild(l);
  }, []);
  return (
    <div className="agr" style={{ fontFamily: "'Karla', system-ui, sans-serif", color: INK, background: CRM, overflowX: "hidden" }}>
      <style>{`
        .agr h1,.agr h2,.agr h3{font-family:${display}!important;font-weight:700;letter-spacing:-.02em;line-height:1.08;text-wrap:balance}
        .agr .wrap{max-width:1140px;margin:0 auto;padding:0 28px}
        .agr .btn{font-family:'Karla',system-ui,sans-serif;display:inline-flex;align-items:center;gap:10px;background:${CORAL};color:#fff;font-weight:800;font-size:15px;padding:15px 28px;border-radius:999px;text-decoration:none;border:none;cursor:pointer;transition:.2s}
        .agr .btn:hover{background:#ff9d75;transform:translateY(-2px)}
        .agr .btn-o{font-family:'Karla',system-ui,sans-serif;text-decoration:none;display:inline-flex;align-items:center;gap:10px;background:none;color:#fff;border:1.5px solid rgba(255,255,255,.6);font-weight:700;font-size:15px;padding:14px 26px;border-radius:999px;cursor:pointer;transition:.2s}
        .agr .btn-o:hover{background:rgba(255,255,255,.1)}
        .agr .eyebrow{display:inline-flex;align-items:center;gap:8px;color:${MINT};font-weight:800;font-size:12px;letter-spacing:2.5px;text-transform:uppercase}
        .agr .eyebrow::before{content:"●";font-size:8px}
        .agr .hov{transition:transform .2s,box-shadow .2s}
        .agr .hov:hover{transform:translateY(-4px);box-shadow:0 20px 44px -22px rgba(13,38,32,.55)}
        @media (max-width:900px){
          .agr .g3a{grid-template-columns:1fr!important}
          .agr .hero-g{grid-template-columns:1fr!important}
          .agr .cyc-g{grid-template-columns:1fr!important}
          .agr .desk-nav{display:none!important}
        }
      `}</style>

      {/* header */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(13,38,32,.94)", backdropFilter: "blur(10px)" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 28px" }}>
          <span style={{ fontFamily: display, fontSize: 21, fontWeight: 800, color: "#fff", letterSpacing: .3 }}>{brand}<span style={{ color: CORAL }}>.</span></span>
          <nav style={{ display: "flex", gap: 24, fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "rgba(243,247,242,.8)" }} className="desk-nav">
            {( [["Sistemas","sistemas"],["Como funciona","como"],["Contato","contato"]] as [string,string][] ).map(([n, id]) => <a key={id} onClick={() => go(id)} style={{ cursor: "pointer" }}>{n}</a>)}
          </nav>
          <a href={wa("Olá! Quero conhecer os sistemas da " + brand + ".")} className="btn" style={{ padding: "11px 22px", fontSize: 14 }}>Explorar sistemas</a>
        </div>
      </header>

      {/* hero — à risca do pin: verde-noite, sistema vivo à direita */}
      <section style={{ background: `radial-gradient(900px 560px at 80% 20%, ${NG2} 0%, ${NG} 60%)`, color: "#fff" }}>
        <div className="wrap hero-g" style={{ display: "grid", gridTemplateColumns: "1fr .95fr", gap: 48, alignItems: "center", padding: "76px 28px 70px" }}>
          <div>
            <span className="eyebrow">Peixes + Plantas + Você</span>
            <h1 style={{ margin: "16px 0 18px", fontSize: "clamp(40px,5.6vw,68px)" }}>
              Um ecossistema vivo para a <span style={{ color: CORAL }}>sua casa.</span>
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "rgba(243,247,242,.85)", maxWidth: 460, marginBottom: 28 }}>
              Sistemas modulares de aquaponia indoor que cultivam plantas frescas sem químicos enquanto mantêm peixes saudáveis e felizes.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 28 }}>
              <a className="btn" href={wa("Olá! Quero conhecer os sistemas da " + brand + ".")}>Explorar sistemas →</a>
              <button className="btn-o" onClick={() => go("como")}>Como funciona →</button>
            </div>
            <div style={{ display: "flex", gap: 22, fontSize: 13.5, fontWeight: 700, color: "rgba(243,247,242,.85)", flexWrap: "wrap" }}>
              {["Comida fresca indoor", "Economiza até 90% de água", "Ciclo natural fechado"].map((b) => <span key={b} style={{ display: "inline-flex", gap: 7, alignItems: "center" }}><Ic d={CHECK} s={14} c={MINT} />{b}</span>)}
            </div>
          </div>
          <img src="/ag-hero.jpg" alt="Sistema de aquaponia com hortaliças e aquário com peixes" style={{ width: "100%", aspectRatio: "3/3.6", objectFit: "cover", borderRadius: 22, boxShadow: "0 32px 64px -28px rgba(0,0,0,.6)" }} />
        </div>
      </section>

      {/* como funciona */}
      <section id="como" style={{ padding: "84px 0", background: CRM }}>
        <div className="wrap">
          <span className="eyebrow" style={{ color: "#2f7a4f" }}>Como funciona</span>
          <h2 style={{ marginTop: 12, fontSize: "clamp(30px,3.8vw,46px)", color: NG }}>Como a aquaponia <span style={{ color: CORAL }}>funciona</span></h2>
          <p style={{ marginTop: 12, fontSize: 16, color: MUT, maxWidth: 480, lineHeight: 1.7 }}>Um ciclo natural e simbiótico em que peixes e plantas ajudam um ao outro a crescer.</p>
          <div className="cyc-g" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18, marginTop: 38 }}>
            {CYCLE.map((c) => (
              <article key={c.n} className="hov" style={{ background: "#fff", borderRadius: 20, padding: "28px 24px", border: "1px solid #e2eadf" }}>
                <span style={{ width: 46, height: 46, borderRadius: "50%", background: NG, color: MINT, display: "grid", placeItems: "center", fontFamily: display, fontWeight: 800, fontSize: 18 }}>{c.n}</span>
                <h3 style={{ fontSize: 21, margin: "16px 0 8px", color: NG }}>{c.t}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.65, color: MUT }}>{c.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* sistemas */}
      <section id="sistemas" style={{ padding: "84px 0", background: NG, color: "#fff" }}>
        <div className="wrap">
          <span className="eyebrow">Escolha o seu sistema</span>
          <h2 style={{ marginTop: 12, fontSize: "clamp(30px,3.8vw,46px)" }}>Modular, escalável e feito para qualquer espaço</h2>
          <div className="g3a" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginTop: 40 }}>
            {SYS.map((s) => (
              <article key={s.t} className="hov" style={{ background: NG2, borderRadius: 22, overflow: "hidden", border: s.hot ? `2px solid ${CORAL}` : "1px solid rgba(255,255,255,.12)", position: "relative" }}>
                {s.hot && <span style={{ position: "absolute", top: 14, right: 14, zIndex: 2, background: CORAL, color: "#fff", fontSize: 11, fontWeight: 800, letterSpacing: 1.2, padding: "5px 13px", borderRadius: 999 }}>MAIS VENDIDO</span>}
                <img src={s.img} alt={s.t} style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover" }} />
                <div style={{ padding: "22px 22px 24px" }}>
                  <span style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: 1.8, textTransform: "uppercase", color: MINT }}>{s.tag}</span>
                  <h3 style={{ fontSize: 24, margin: "8px 0 8px", color: "#fff" }}>{s.t}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.65, color: "rgba(243,247,242,.8)", minHeight: 46 }}>{s.d}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14 }}>
                    <span style={{ fontFamily: display, fontSize: 22, fontWeight: 800, color: CORAL }}><span style={{ fontSize: 12, color: "rgba(243,247,242,.6)", fontWeight: 600 }}>a partir de </span>{s.p}</span>
                    <a href={wa(`Olá! Tenho interesse no ${s.t} da ${brand}.`)} style={{ background: CORAL, color: "#fff", fontWeight: 800, fontSize: 13.5, padding: "9px 18px", borderRadius: 999, textDecoration: "none" }}>Quero →</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* faixa living */}
      <section style={{ position: "relative", padding: "96px 0", color: "#fff", overflow: "hidden", background: NG }}>
        <img src="/ag-living.jpg" alt="Sistema de aquaponia em uma sala de estar aconchegante" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(13,38,32,.92) 30%, rgba(13,38,32,.35) 75%)" }} />
        <div className="wrap" style={{ position: "relative", maxWidth: 1140 }}>
          <div style={{ maxWidth: 480 }}>
            <span className="eyebrow">Mais que um vaso</span>
            <h2 style={{ marginTop: 12, fontSize: "clamp(28px,3.6vw,44px)" }}>Um sistema de vida <span style={{ color: CORAL }}>autossustentável.</span></h2>
            <div style={{ display: "grid", gap: 12, marginTop: 24 }}>
              {["Colheitas frescas e sem agrotóxicos", "Peixes mais saudáveis e felizes", "Uma casa mais calma e verde"].map((b) => (
                <span key={b} style={{ display: "flex", gap: 10, fontSize: 15.5, fontWeight: 600, alignItems: "center" }}><Ic d={CHECK} s={16} c={MINT} />{b}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* cta final */}
      <section id="contato" style={{ position: "relative", padding: "96px 0", color: "#fff", overflow: "hidden", background: NG, textAlign: "center" }}>
        <img src="/ag-fish.jpg" alt="Peixe dourado embaixo d'água entre plantas" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: .35 }} />
        <div className="wrap" style={{ position: "relative" }}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>Vida sustentável</span>
          <h2 style={{ margin: "14px auto 18px", fontSize: "clamp(30px,4.2vw,52px)", maxWidth: 640 }}>Cultive comida. Cuide de peixes. <span style={{ color: CORAL }}>Feche o ciclo.</span></h2>
          <a className="btn" style={{ fontSize: 16, padding: "17px 34px" }} href={wa("Olá! Quero começar minha jornada na aquaponia com a " + brand + ".")}>Começar pelo WhatsApp →</a>
        </div>
      </section>

      {/* footer */}
      <footer style={{ background: NG, color: "rgba(243,247,242,.6)", borderTop: "1px solid rgba(255,255,255,.12)", padding: "30px 0" }}>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 14, fontSize: 13.5, alignItems: "center" }}>
          <span style={{ fontFamily: display, fontSize: 18, fontWeight: 800, color: "#fff" }}>{brand}<span style={{ color: CORAL }}>.</span></span>
          <span>{city} · Aquaponia indoor para casas vivas</span>
        </div>
      </footer>
    </div>
  );
}
