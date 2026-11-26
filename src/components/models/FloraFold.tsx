import { useEffect, useState } from "react";

/** Floricultura nova, construida do zero a partir de um pin rosa (hero com buque, ocasioes, mais vendidos, oferta). Carrinho que fecha o pedido no WhatsApp. */
const PK = "#d94d78", PD = "#b13a5f", BG = "#fff7f8", SOFT = "#fde8ed", INK = "#2a1f26", GR = "#1f3b2e";
const OCC = [
  { n: "Aniversário", img: "/flor-o1.webp" },
  { n: "Bodas e namoro", img: "/flor-o2.webp" },
  { n: "Parabéns", img: "/flor-o3.webp" },
  { n: "Amor e romance", img: "/flor-o4.webp" },
  { n: "Condolências", img: "/flor-o5.webp" },
  { n: "Sem motivo", img: "/flor-o6.webp" },
];
const SELL = [
  { n: "Rosas Vermelhas Clássicas", p: 189.9, r: "124", img: "/flor-s1.webp" },
  { n: "Elegância Rosé", p: 149.9, r: "98", img: "/flor-s2.webp" },
  { n: "Girassóis do Sol", p: 129.9, r: "76", img: "/flor-s3.webp" },
];
const HERO_IC = [
  { t: "Entrega no mesmo dia", ic: "M3 8h17v14H3zM20 13h5l4 4v5h-9M8 26a2.500 2.500 0 1 0 .01 0M24 26a2.500 2.500 0 1 0 .01 0" },
  { t: "Flores sempre frescas", ic: "M6 26C6 12 14 5 27 5c0 13-7 21-21 21zM6 26c4-8 9-12 15-14" },
  { t: "Garantia de encanto", ic: "M16 27S4 19 4 11a6 6 0 0 1 12-2 6 6 0 0 1 12 2c0 8-12 16-12 16z" },
];
const PERKS = [
  { t: "Qualidade premium", d: "Flores selecionadas a dedo", ic: "M16 4l11 9-11 15L5 13z" },
  { t: "Cultivo responsável", d: "Fornecedores sustentáveis", ic: "M6 26C6 12 14 5 27 5c0 13-7 21-21 21z" },
  { t: "Embalagem de presente", d: "Para cada ocasião", ic: "M5 12h22v5H5zM7 17h18v10H7zM16 12v15M16 12c-4 0-7-2-5-5s5 1 5 5c0-4 3-8 5-5s-1 5-5 5" },
  { t: "Atendimento rápido", d: "Respondemos no WhatsApp", ic: "M6 18v-3a10 10 0 0 1 20 0v3M5 18h4v7H5zM23 18h4v7h-4z" },
];
const TESTI = [
  { q: "As rosas chegaram lindas e fresquinhas, minha mãe chorou de emoção. Pedi em dois cliques e o atendimento foi super atencioso.", n: "Camila R." },
  { q: "Montaram um buquê do jeitinho que eu descrevi, com cartão escrito à mão. Já virou a nossa floricultura de todo aniversário.", n: "Rafael T." },
];
const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const Ic = ({ d, s = 30, c = PK }: { d: string; s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);
const FLOWER = "M16 14c-3-6-1-10 0-11 1 1 3 5 0 11zM16 14c-6-1-9-5-9-7 2-1 7 0 9 7zM16 14c6-1 9-5 9-7-2-1-7 0-9 7zM16 14v14M16 22c-3 0-5-2-6-4M16 24c3 0 5-2 6-4";

export function FloraFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Casa Pétala";
  const city = client?.city?.trim() || "Recife";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [cart, setCart] = useState<Record<number, number>>({});
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [ti, setTi] = useState(0);
  const [sc, setSc] = useState(false);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [fav, setFav] = useState<Record<number, boolean>>({});
  const [added, setAdded] = useState<number | null>(null);
  useEffect(() => { const f = () => setSc(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const add = (i: number) => { setCart((c) => ({ ...c, [i]: (c[i] ?? 0) + 1 })); setAdded(i); setTimeout(() => setAdded(null), 1200); };
  const qty = (i: number, d: number) => setCart((c) => { const n = (c[i] ?? 0) + d; const o = { ...c }; if (n <= 0) delete o[i]; else o[i] = n; return o; });
  const items = Object.entries(cart).map(([k, q]) => ({ i: Number(k), q, it: SELL[Number(k)]! }));
  const count = items.reduce((a, x) => a + x.q, 0);
  const sub = items.reduce((a, x) => a + x.q * x.it.p, 0);
  const disc = sub * 0.15;
  const lines = items.map((x) => `${x.q}x ${x.it.n}`).join(", ");
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero fazer um pedido na ${brand}: ${lines}. Código BLOOM15. Total ${brl(sub - disc)}.${name ? ` Em nome de ${name}.` : ""}${msg ? ` Recado no cartão: ${msg}` : ""}`)}`;
  const t = TESTI[ti]!;

  return (
    <div className="fl" style={{ fontFamily: "DM Sans, system-ui, sans-serif", color: INK, background: "#fff", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Caveat:wght@500;600&display=swap');
        .fl *{box-sizing:border-box}.fl a,.fl button{font-family:inherit}
        .fl .wrap{max-width:1180px;margin:0 auto;padding:0 24px}
        .fl .top{background:${GR};color:#e8f3ec;font-size:13px;text-align:center;padding:10px 16px;letter-spacing:.2px}
        .fl .nav{display:flex;align-items:center;justify-content:space-between;height:80px;gap:20px}
        .fl .logo{display:flex;align-items:center;gap:10px;font-family:Playfair Display,serif;font-weight:600;font-size:27px;color:${INK};line-height:1}
        .fl .logo small{display:block;font-family:DM Sans,sans-serif;font-size:9.5px;letter-spacing:2.2px;text-transform:uppercase;color:${PD};font-weight:600;margin-top:5px}
        .fl .links{display:flex;gap:34px;font-size:15px;font-weight:500}
        .fl .links a{cursor:pointer;color:${INK};padding-bottom:6px;border-bottom:2px solid transparent}.fl .links a.on{border-color:${PK};color:${PD}}
        .fl .cartb{position:relative;background:none;border:0;cursor:pointer;width:46px;height:46px;display:grid;place-items:center}
        .fl .cartb b{position:absolute;right:2px;top:2px;min-width:20px;height:20px;border-radius:10px;background:${PK};color:#fff;font-size:11.5px;display:grid;place-items:center;padding:0 5px}
        .fl .btn{background:${PK};color:#fff;border:0;border-radius:999px;padding:0 30px;min-height:52px;font-weight:600;font-size:15px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:10px;text-decoration:none;box-shadow:0 10px 22px rgba(217,77,120,.3);transition:transform .2s,filter .2s}
        .fl .btn:hover{filter:brightness(1.06);transform:translateY(-1px)}
        .fl .btn.o{background:#fff;color:${PD};border:1.5px solid #f2bfcc;box-shadow:none}
        .fl .burger{display:none;background:none;border:0;width:44px;height:44px;cursor:pointer}
        .fl .hero{position:relative;overflow:hidden;background:linear-gradient(115deg,#fff6f7 0%,#fbdde5 70%,#f7cfda 100%)}
        .fl .herogrid{display:grid;grid-template-columns:1fr 1fr;align-items:center;min-height:600px;gap:10px}
        .fl .kick{font-size:14px!important;letter-spacing:3px;text-transform:uppercase;font-weight:700;color:${PD}}
        .fl h1{font-family:Playfair Display,serif;font-weight:600;font-size:clamp(42px,4.9vw,66px);line-height:1.04;margin:18px 0 0;max-width:520px;color:${INK};letter-spacing:-1px}
        .fl h1 em{font-style:normal;color:${PK}}
        .fl .lead{font-size:18px;line-height:1.65;color:#5a4650;margin:22px 0 30px;max-width:450px}
        .fl .hic{display:flex;gap:0;margin-top:38px}
        .fl .hic div{display:flex;flex-direction:column;align-items:flex-start;gap:10px;font-size:15px;font-weight:600;color:#3d2c35;padding:0 24px;border-left:1px solid #efc3cf;max-width:176px;line-height:1.3}
        .fl .hic div:first-child{padding-left:0;border:0}
        .fl .heroimg{position:absolute;right:0;top:0;bottom:0;width:48%}
        .fl .heroimg img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 40%;transform:scale(1.04);transform-origin:50% 35%;-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 24%);mask-image:linear-gradient(90deg,transparent 0,#000 24%)}
        .fl .script{position:absolute;right:28px;bottom:70px;font-family:Caveat,cursive;font-size:44px;line-height:1.02;color:${PD};font-weight:600;transform:rotate(-6deg);text-align:left}
        .fl .sec{padding:70px 0}
        .fl .c{text-align:center}.fl .c p{color:#6b5560;margin:12px 0 0;font-size:16px}
        .fl h2{font-family:Playfair Display,serif;font-weight:600;font-size:clamp(32px,4vw,52px);margin:10px 0 0;color:${INK};line-height:1.12}
        .fl .orn{display:flex;align-items:center;justify-content:center;gap:10px;margin-top:14px;color:${PK}}.fl .orn i{width:44px;height:1.5px;background:#f0b4c4;display:block}
        .fl .occ{display:grid;grid-template-columns:repeat(6,1fr);gap:16px;margin-top:38px}
        .fl .oc{background:#fff;border:1px solid #f6dce3;border-radius:18px;overflow:hidden;cursor:pointer;padding:0;text-align:left;box-shadow:0 8px 22px rgba(217,77,120,.08);transition:transform .25s,box-shadow .25s}
        .fl .oc:hover{transform:translateY(-4px);box-shadow:0 16px 30px rgba(217,77,120,.18)}
        .fl .oc img{width:100%;aspect-ratio:1;object-fit:cover;display:block}
        .fl .oc div{display:flex;justify-content:space-between;align-items:center;padding:16px 14px;font-weight:700;font-size:16px;gap:6px;min-height:56px}
        .fl .oc span:last-child{color:${PK};font-size:16px}
        .fl .best{background:${SOFT}}
        .fl .bgrid{display:grid;grid-template-columns:.8fr 2.2fr;gap:36px;align-items:center}
        .fl .pc{background:#fff;border-radius:20px;padding:16px;box-shadow:0 10px 26px rgba(177,58,95,.1);position:relative;display:flex;flex-direction:column}
        .fl .pc .im{aspect-ratio:4/4.6;display:grid;place-items:center;overflow:hidden;border-radius:12px}
        .fl .pc img{width:100%;height:100%;object-fit:contain;display:block;transition:transform .4s}.fl .pc:hover img{transform:scale(1.05)}
        .fl .heart{position:absolute;right:14px;top:14px;width:38px;height:38px;border-radius:50%;border:0;background:rgba(255,255,255,.9);cursor:pointer;display:grid;place-items:center;box-shadow:0 2px 8px rgba(0,0,0,.1)}
        .fl .pc h4{margin:14px 0 4px;font-size:17px;font-weight:600;line-height:1.3;min-height:40px}
        .fl .pc .pr{font-weight:700;font-size:20px;color:${INK}}
        .fl .stars{color:#f0a91b;font-size:13px;letter-spacing:1.5px;margin:4px 0 12px}.fl .stars span{color:#8a7480;letter-spacing:0;margin-left:6px}
        .fl .pc .btn{min-height:54px;width:100%;border-radius:12px;box-shadow:none;font-size:15.5px;font-weight:700;margin-top:auto}
        .fl .promo{position:relative;overflow:hidden;background:#fbd9e1;min-height:300px;display:flex;align-items:center}
        .fl .promo img{position:absolute;left:0;top:0;height:100%;width:100%;object-fit:cover;object-position:left center}
        .fl .promo .wrap{position:relative;display:grid;grid-template-columns:1fr 1fr}.fl .promo .in{grid-column:2;padding:40px 0}
        .fl .promo .sp{font-family:Caveat,cursive;font-size:38px;font-weight:600;color:${PD};transform:rotate(-5deg);display:inline-block;margin-top:14px}
        .fl .perks{display:grid;grid-template-columns:repeat(4,1fr);padding:34px 0}
        .fl .perks div{display:flex;align-items:center;gap:14px;padding:0 20px;border-right:1px solid #f0d7de;font-size:15px;line-height:1.35}
        .fl .perks div:last-child{border:0}.fl .perks b{display:block;font-weight:700;font-size:16px}.fl .perks span{color:#5a4650;font-size:14.5px}
        .fl .tg{display:grid;grid-template-columns:1fr 1fr;gap:50px;align-items:center}
        .fl .gc{background:#fff;border-radius:22px;box-shadow:0 12px 32px rgba(177,58,95,.12);padding:28px;display:flex;gap:20px;align-items:center;border:1px solid #f8e0e6}
        .fl .gc img{width:120px;height:120px;border-radius:50%;object-fit:cover;flex:none}
        .fl .gc p{margin:8px 0 12px;font-family:Playfair Display,serif;font-style:italic;font-size:17.5px;line-height:1.55}
        .fl .arr{width:42px;height:42px;border-radius:50%;border:1.5px solid #f2bfcc;background:#fff;cursor:pointer;font-size:16px;flex:none;color:${PD}}
        .fl footer{background:${GR};color:#d8e8de;padding:46px 0 34px}
        .fl .fr{display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap}
        .fl footer .logo{color:#fff}.fl footer .logo small{color:#f4b5c7}
        .fl footer nav{display:flex;gap:28px;font-size:15.5px}.fl footer nav a{cursor:pointer;color:#e8f3ec}
        .fl .wa{position:fixed;right:18px;bottom:18px;z-index:40;width:58px;height:58px;border-radius:50%;background:#25d366;display:grid;place-items:center;box-shadow:0 8px 24px rgba(0,0,0,.3)}
        .fl .ov{position:fixed;inset:0;z-index:100;background:rgba(42,31,38,.55);display:flex;justify-content:flex-end}
        .fl .dw{background:#fff;width:100%;max-width:440px;height:100%;overflow:auto;padding:28px;position:relative;display:flex;flex-direction:column}
        .fl .dw h3{font-family:Playfair Display,serif;font-size:28px;margin:0 0 4px}
        .fl .x{position:absolute;right:12px;top:10px;width:44px;height:44px;border:0;background:none;font-size:28px;cursor:pointer}
        .fl .li{display:flex;gap:14px;align-items:center;padding:14px 0;border-bottom:1px solid #f6dce3}
        .fl .li img{width:64px;height:74px;object-fit:contain;background:${BG};border-radius:10px}
        .fl .q{display:inline-flex;align-items:center;gap:10px;border:1.5px solid #f2bfcc;border-radius:999px;padding:2px 6px;margin-top:6px}.fl .q button{width:30px;height:30px;border:0;background:none;font-size:18px;cursor:pointer;color:${PD}}
        .fl input,.fl textarea{width:100%;margin-top:10px;padding:14px 16px;border:1.5px solid #f2bfcc;border-radius:14px;font-size:15px;font-family:inherit;background:#fff}
        .fl .mob{display:none}
        @media(max-width:900px){
          .fl .links,.fl .navbtn{display:none}.fl .burger{display:block}.fl .nav{height:66px}.fl .logo{font-size:23px}
          .fl .herogrid{grid-template-columns:1fr;min-height:0;gap:0}.fl .heroimg{position:relative;width:auto;height:340px;order:2;margin:10px -24px 0}.fl .heroimg img{transform:scale(1.05);-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 22%);mask-image:linear-gradient(180deg,transparent 0,#000 22%)}
          .fl .script{right:16px;bottom:30px;font-size:26px}
          .fl .hic div{padding:0 10px;font-size:13px}.fl .hic{margin-top:28px}
          .fl .occ{grid-template-columns:1fr 1fr;gap:12px}.fl .oc div{font-size:13.5px;padding:12px}
          .fl .bgrid{grid-template-columns:1fr;gap:26px}.fl .bgrid>div:last-child{display:grid!important;grid-template-columns:1fr 1fr!important;gap:12px!important}.fl .bgrid .pc:last-child{grid-column:span 2}
          .fl .promo{display:block}.fl .promo img{position:relative;display:block;height:190px;width:100%}.fl .promo .wrap{display:block;position:relative}.fl .promo .in{padding:26px 0 34px}
          .fl .pc .btn{padding:0 8px;font-size:13px}.fl .pc{padding:12px}.fl .bgrid .pc:last-child .im{aspect-ratio:16/10}
          .fl .perks{grid-template-columns:1fr 1fr;gap:22px 0}.fl .perks div:nth-child(2){border:0}.fl .perks div{padding:0 8px}
          .fl .tg{grid-template-columns:1fr;gap:26px}.fl .gc{padding:20px;flex-wrap:wrap}
          .fl .fr{justify-content:center;text-align:center}.fl footer nav{gap:18px;flex-wrap:wrap;justify-content:center}
          .fl .mob{display:block;background:#fff;border-radius:16px;margin:0 16px 10px;box-shadow:0 8px 24px rgba(177,58,95,.14)}.fl .mob a{display:block;padding:15px 20px;font-size:15px;cursor:pointer;border-top:1px solid #fbe6eb}.fl .mob a:first-child{border:0}
        }
      `}</style>

      <div className="top">Entrega no mesmo dia em {city} para pedidos até as 15h · Use o código BLOOM15 e ganhe 15% off</div>
      <div className="hero">
        <header style={{ position: "relative", zIndex: 3, background: "rgba(255,247,248,.9)" }}>
          <div className="wrap nav">
            <div className="logo"><Ic d={FLOWER} s={38} /><div>{brand}<small>Flores que alegram a vida</small></div></div>
            <nav className="links"><a className="on" onClick={() => go("top")}>Início</a><a onClick={() => go("ocasioes")}>Ocasiões</a><a onClick={() => go("buques")}>Buquês</a><a onClick={() => go("clientes")}>Clientes</a><a onClick={() => go("contato")}>Contato</a></nav>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <button type="button" className="cartb" aria-label="Buscar buquês" onClick={() => go("buques")}><svg width="24" height="24" viewBox="0 0 26 26" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M16.500 16.500L22 22" /></svg></button>
              <button type="button" className="cartb" aria-label="Carrinho" onClick={() => setOpen(true)}>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h3l2.500 11h11l2-8H7M10 21a1 1 0 1 0 .01 0M18 21a1 1 0 1 0 .01 0" /></svg>
                {count > 0 && <b>{count}</b>}
              </button>
              <button type="button" className="burger" aria-label="Menu" onClick={() => setMenu((m) => !m)}><svg width="26" height="26" viewBox="0 0 26 26" stroke={INK} strokeWidth="2"><path d="M3 7h20M3 13h20M3 19h20" /></svg></button>
            </div>
          </div>
          {menu && <div className="mob"><a onClick={() => go("ocasioes")}>Ocasiões</a><a onClick={() => go("buques")}>Buquês</a><a onClick={() => go("clientes")}>Clientes</a><a onClick={() => go("contato")}>Contato</a></div>}
        </header>
        <section id="top">
          <div className="wrap herogrid">
            <div style={{ padding: "30px 0" }}>
              <span className="kick">Flores frescas, dias mais felizes</span>
              <h1>Flores para cada <em>momento especial</em></h1>
              <p className="lead">Buquês feitos à mão, flores de primeira qualidade e presentes pensados com carinho para tornar qualquer ocasião inesquecível.</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button type="button" className="btn" onClick={() => go("buques")}>Comprar agora <span aria-hidden>→</span></button>
                <button type="button" className="btn o" onClick={() => go("ocasioes")}>Ver ocasiões</button>
              </div>
              <div className="hic">{HERO_IC.map((h) => (<div key={h.t}><Ic d={h.ic} s={34} c={GR} />{h.t}</div>))}</div>
            </div>
            <div className="heroimg"><img src="/flor-hero.webp" alt="Buquê de rosas cor-de-rosa com lírio" /><div className="script">mais que<br />só flores ♡</div></div>
          </div>
        </section>
      </div>

      <section className="sec" id="ocasioes"><div className="wrap c">
        <span className="kick">Compre por ocasião</span>
        <h2>Encontre as flores perfeitas</h2>
        <div className="orn"><i /><svg width="14" height="14" viewBox="0 0 24 24" fill={PK}><path d="M12 21S3 14.500 3 8.500A4.500 4.500 0 0 1 12 7a4.500 4.500 0 0 1 9 1.500C21 14.500 12 21 12 21z" /></svg><i /></div>
        <p>Flores lindas para os momentos que importam.</p>
        <div className="occ">
          {OCC.map((o) => (
            <button type="button" className="oc" key={o.n} onClick={() => go("buques")}>
              <img src={o.img} alt={o.n} loading="lazy" />
              <div><span>{o.n}</span><span aria-hidden>→</span></div>
            </button>
          ))}
        </div>
      </div></section>

      <section className="sec best" id="buques"><div className="wrap bgrid">
        <div>
          <span className="kick">Mais vendidos</span>
          <h2 style={{ marginBottom: 14 }}>Nossos buquês mais amados</h2>
          <p style={{ color: "#6b5560", fontSize: 16.5, lineHeight: 1.6, margin: "0 0 26px", maxWidth: 300 }}>Favoritos escolhidos a dedo, feitos para tornar cada momento especial.</p>
          <button type="button" className="btn" onClick={() => setOpen(true)}>Ver meu carrinho <span aria-hidden>→</span></button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
          {SELL.map((s, i) => (
            <div className="pc" key={s.n}>
              <button type="button" className="heart" aria-label="Favoritar" onClick={() => setFav((f) => ({ ...f, [i]: !f[i] }))}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill={fav[i] ? PK : "none"} stroke={PK} strokeWidth="2"><path d="M12 21S3 14.500 3 8.500A4.500 4.500 0 0 1 12 7a4.500 4.500 0 0 1 9 1.500C21 14.500 12 21 12 21z" /></svg>
              </button>
              <div className="im"><img src={s.img} alt={s.n} loading="lazy" /></div>
              <h4>{s.n}</h4>
              <div className="pr">{brl(s.p)}</div>
              <div className="stars">★★★★★<span>({s.r})</span></div>
              <button type="button" className="btn" onClick={() => add(i)}>{added === i ? "Adicionado ✓" : "Adicionar ao carrinho"}</button>
            </div>
          ))}
        </div>
      </div></section>

      <section className="promo">
        <img src="/flor-tulip.webp" alt="Tulipas cor-de-rosa" loading="lazy" />
        <div className="wrap"><div className="in">
          <span className="kick">Oferta especial</span>
          <h2 style={{ marginBottom: 10 }}>Alegre o dia de alguém</h2>
          <p style={{ fontSize: 19, color: "#3d2c35", margin: "0 0 22px" }}>Ganhe 15% de desconto no primeiro pedido.</p>
          <button type="button" className="btn" onClick={() => setOpen(true)}>Usar código BLOOM15 <span aria-hidden>→</span></button><br />
          <span className="sp">espalhe amor hoje</span>
        </div></div>
      </section>

      <div className="wrap"><div className="perks">{PERKS.map((p) => (<div key={p.t}><Ic d={p.ic} s={34} c={GR} /><div style={{ display: "block", padding: 0, border: 0 }}><b>{p.t}</b><span>{p.d}</span></div></div>))}</div></div>

      <section className="sec" id="clientes" style={{ paddingTop: 20, background: BG }}><div className="wrap tg">
        <div>
          <span className="kick">Quem já recebeu</span>
          <h2 style={{ marginBottom: 14 }}>Flores que viram sorriso</h2>
          <p style={{ color: "#6b5560", fontSize: 16.5, lineHeight: 1.65, maxWidth: 400, margin: 0 }}>Cada buquê sai do ateliê no mesmo dia, montado à mão e com cartão personalizado. Peça pelo site e feche tudo pelo WhatsApp.</p>
        </div>
        <div className="gc">
          <img src="/flor-guest.webp" alt={t.n} />
          <div style={{ flex: 1, minWidth: 180 }}>
            <div style={{ color: "#f0a91b", letterSpacing: 2 }}>★★★★★</div>
            <p>“{t.q}”</p><b style={{ fontSize: 14 }}>{t.n}</b>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button type="button" className="arr" aria-label="Anterior" onClick={() => setTi((ti + TESTI.length - 1) % TESTI.length)}>←</button>
            <button type="button" className="arr" aria-label="Próximo" onClick={() => setTi((ti + 1) % TESTI.length)}>→</button>
          </div>
        </div>
      </div></section>

      <footer id="contato"><div className="wrap">
        <div className="fr">
          <div className="logo"><Ic d={FLOWER} s={34} c="#f4b5c7" /><div>{brand}<small>Flores que alegram a vida</small></div></div>
          <nav><a onClick={() => go("top")}>Início</a><a onClick={() => go("ocasioes")}>Ocasiões</a><a onClick={() => go("buques")}>Buquês</a><a onClick={() => go("clientes")}>Clientes</a></nav>
          <div style={{ fontSize: 14.5, lineHeight: 1.7 }}>Rua das Hortênsias, 210, Boa Viagem, {city}<br />Seg a sáb, 8h às 19h · Dom, 8h às 12h<br />Entrega, trocas e pagamento por Pix ou cartão<br />Instagram @{brand.normalize("NFD").toLowerCase().replace(/[^a-z]+/g, "")}<br /><a href={`https://wa.me/${num}`} target="_blank" rel="noreferrer" style={{ color: "#f4b5c7", fontWeight: 600 }}>Chamar no WhatsApp</a></div>
        </div>
      </div></footer>

      {sc && <a className="wa" href={`https://wa.me/${num}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 32 32" fill="#fff"><path d="M16 3a13 13 0 0 0-11 19.800L3 29l6.400-1.900A13 13 0 1 0 16 3zm0 2.400a10.600 10.600 0 1 1-5.400 19.700l-.4-.2-3.800 1.100 1.100-3.700-.3-.4A10.600 10.600 0 0 1 16 5.400zm-4 5.300c-.3 0-.7.100-1 .5-.4.400-1.300 1.300-1.300 3.100s1.300 3.600 1.500 3.800c.2.300 2.600 4.100 6.400 5.600 3.100 1.200 3.700.9 4.400.9.700-.1 2.200-.9 2.500-1.800.3-.9.300-1.600.2-1.800-.1-.2-.3-.3-.7-.5l-2.300-1.100c-.3-.1-.5-.2-.8.200-.2.300-.9 1.100-1.100 1.300-.2.200-.4.300-.7.100-.4-.2-1.500-.5-2.800-1.700-1-.9-1.700-2-1.900-2.400-.2-.3 0-.5.200-.7l.5-.6c.2-.2.200-.4.300-.6.100-.2.100-.4 0-.6l-1-2.400c-.3-.6-.5-.5-.8-.5z" /></svg></a>}

      {open && (
        <div className="ov" onClick={(e) => e.target === e.currentTarget && setOpen(false)} role="dialog" aria-modal="true" aria-label="Carrinho">
          <div className="dw">
            <button type="button" className="x" aria-label="Fechar" onClick={() => setOpen(false)}>×</button>
            <h3>Seu carrinho</h3>
            <span style={{ color: "#6b5560", fontSize: 14 }}>{count === 0 ? "Ainda sem flores por aqui" : `${count} ${count === 1 ? "buquê" : "buquês"}`}</span>
            {count === 0 ? (
              <div style={{ margin: "30px 0", textAlign: "center" }}>
                <Ic d={FLOWER} s={60} />
                <p style={{ color: "#6b5560" }}>Escolha um buquê entre os mais vendidos.</p>
                <button type="button" className="btn" onClick={() => { setOpen(false); go("buques"); }}>Ver buquês</button>
              </div>
            ) : (
              <>
                <div style={{ marginTop: 10 }}>
                  {items.map((x) => (
                    <div className="li" key={x.i}>
                      <img src={x.it.img} alt={x.it.n} />
                      <div style={{ flex: 1 }}>
                        <b style={{ fontSize: 15 }}>{x.it.n}</b>
                        <div style={{ color: PD, fontWeight: 700 }}>{brl(x.it.p)}</div>
                        <div className="q"><button type="button" aria-label="Menos" onClick={() => qty(x.i, -1)}>−</button><b>{x.q}</b><button type="button" aria-label="Mais" onClick={() => qty(x.i, 1)}>+</button></div>
                      </div>
                    </div>
                  ))}
                </div>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" aria-label="Seu nome" />
                <textarea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Recado para o cartão (opcional)" aria-label="Recado para o cartão" rows={2} />
                <div style={{ marginTop: 18, fontSize: 15, lineHeight: 2 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span>Subtotal</span><span>{brl(sub)}</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#2f7d4f" }}><span>Código BLOOM15</span><span>− {brl(disc)}</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 19, borderTop: "1px solid #f6dce3", paddingTop: 8 }}><span>Total</span><span>{brl(sub - disc)}</span></div>
                </div>
                <a className="btn" href={wa} target="_blank" rel="noreferrer" style={{ marginTop: 18 }}>Finalizar no WhatsApp</a>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
