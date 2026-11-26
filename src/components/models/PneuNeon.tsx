import { useEffect, useState } from "react";

/** Loja de pneus de alta performance a partir do pin "Tires built for legends": preto com verde-limão neon, títulos itálicos condensados, pneu gigante diante de supercarro em garagem. */
const LIME = "#c6f000";
const MODELS = [
  { n: "Cupê Amarelo", c: 24, img: "/vt-c1.webp" },
  { n: "Esportivo Verde", c: 18, img: "/vt-c2.webp" },
  { n: "Supercarro Prata", c: 21, img: "/vt-c3.webp" },
  { n: "SUV Esportivo", c: 16, img: "/vt-c4.webp" },
];
const TIRES = [
  { n: "Trofeo Apex R", s: "305/30 ZR20", a: ["Pista", "Verão"], p: 1299, img: "/vt-t1.webp" },
  { n: "Sport Touring 4S", s: "295/35 ZR21", a: ["Esportivo", "Todas as estações"], p: 899, img: "/vt-t2.webp" },
  { n: "Potenza Veloce", s: "285/35 ZR20", a: ["Alta aderência", "Verão"], p: 1199, img: "/vt-t3.webp" },
  { n: "Contact Sport 7", s: "275/40 ZR19", a: ["Conforto", "Todas as estações"], p: 949, img: "/vt-t4.webp" },
];
const BEN = [
  { t: "Frete grátis", d: "Em pedidos acima de R$ 1.500", i: <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7M7 19a1.5 1.5 0 1 0 0-.01M17 19a1.5 1.5 0 1 0 0-.01" /> },
  { t: "Pagamento seguro", d: "100% protegido", i: <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4" /> },
  { t: "Troca fácil", d: "30 dias para devolver", i: <path d="M4 12a8 8 0 0 1 14-5l2 2M20 12a8 8 0 0 1-14 5l-2-2M20 4v5h-5M4 20v-5h5" /> },
  { t: "Suporte especializado", d: "Time pronto para ajudar", i: <path d="M4 14v-3a8 8 0 0 1 16 0v3M4 14h3v5H5a1 1 0 0 1-1-1zM20 14h-3v5h2a1 1 0 0 0 1-1zM17 19c0 2-2 2-5 2" /> },
];
const FEAT = [
  { t: "Máximo desempenho", d: "Aderência e resposta em qualquer velocidade", i: <path d="M12 3v3M4 13a8 8 0 0 1 16 0M12 13l4-4" /> },
  { t: "Qualidade certificada", d: "Padrão exigido por montadoras", i: <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4" /> },
  { t: "Envio para todo o país", d: "Entrega rápida e rastreada", i: <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /> },
];
const Ico = ({ children, s = 26, c = LIME }: { children: React.ReactNode; s?: number; c?: string }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{children}</svg>;
const money = (v: number) => `R$ ${v.toLocaleString("pt-BR")}`;
const Arrow = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M4 12h16M14 6l6 6-6 6" /></svg>;

export function PneuNeon({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = (client?.name?.trim() || "Voltar Tires").toUpperCase();
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [cart, setCart] = useState<string[]>([]);
  const [menu, setMenu] = useState(false);
  const [toast, setToast] = useState("");
  const [mod, setMod] = useState("");
  const [yr, setYr] = useState("");
  const [size, setSize] = useState("");
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(""), 1800); return () => clearTimeout(t); }, [toast]);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const add = (n: string) => { setCart((c) => [...c, n]); setToast(`${n} no carrinho`); };
  const wa = (t: string) => `https://wa.me/${num}?text=${encodeURIComponent(t)}`;
  const search = wa(`Oi! Procuro pneus na ${brand}. Modelo: ${mod || "não informado"}, ano: ${yr || "não informado"}, medida: ${size || "não informada"}.`);
  const order = wa(`Oi! Quero pedir na ${brand}: ${cart.length ? cart.join(", ") : "ajuda para escolher pneus"}.`);
  const Logo = () => (
    <a className="logo" href="#top" onClick={(e) => { e.preventDefault(); go("top"); }} aria-label={brand}>
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden><path d="M4 4h6l16 22h-6z" fill={LIME} /><path d="M26 4h-6L4 26h6z" fill="#fff" opacity=".0" /><path d="M10 26V4M10 17l8-8" stroke={LIME} strokeWidth="3" fill="none" /></svg>
      <span>{brand}</span>
    </a>
  );
  return (
    <div className="pn" id="top">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@1,700;1,800&family=Inter:wght@400;500;600&display=swap');
        .pn{background:#050505;color:#fff;font-family:'Inter',Arial,sans-serif;overflow-x:hidden}
        .pn *{box-sizing:border-box}
        .pn a,.pn button,.pn select{font-family:inherit}
        .pn h1,.pn h2,.pn h3,.pn h4{font-family:'Barlow Condensed','Arial Narrow',Impact,sans-serif;font-style:italic;font-weight:800;text-transform:uppercase;margin:0;line-height:.95;letter-spacing:-.01em;text-wrap:balance}
        .pn .in{width:min(94%,1180px);margin:0 auto}
        .pn .nav{display:flex;align-items:center;gap:28px;height:72px}
        .pn .logo{display:flex;align-items:center;gap:9px;color:#fff;text-decoration:none;font-family:'Barlow Condensed',sans-serif;font-style:italic;font-weight:800;font-size:22px;letter-spacing:.02em;min-height:44px}
        .pn .nl{display:flex;gap:26px;margin-left:30px;flex:1}
        .pn .nl a{color:#fff;font-size:14px;font-weight:500;text-decoration:none;cursor:pointer;min-height:44px;display:inline-flex;align-items:center}
        .pn .nl a:hover{color:${LIME}}
        .pn .srch{display:flex;align-items:center;gap:8px;border:1px solid #333;border-radius:999px;height:40px;padding:0 16px;font-size:13px;color:#cfcfcf;width:210px}
        .pn .ib{position:relative;width:44px;height:44px;display:grid;place-items:center;background:none;border:0;color:#fff;cursor:pointer}
        .pn .bd{position:absolute;right:3px;top:3px;background:${LIME};color:#000;border-radius:50%;width:17px;height:17px;font-size:11px;font-weight:600;display:grid;place-items:center}
        .pn .burger{display:none}
        .pn .mob{display:none}
        .pn .hero{position:relative;min-height:470px;overflow:hidden;border-bottom:1px solid #1a1a1a}
        .pn .hero>img{position:absolute;right:0;top:0;width:82%;height:100%;object-fit:cover;object-position:50% 58%}
        .pn .hero:before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,#050505 22%,rgba(5,5,5,.8) 38%,rgba(5,5,5,0) 62%),linear-gradient(0deg,#050505,rgba(5,5,5,0) 22%)}
        .pn .hc{position:relative;z-index:2;padding:44px 0 50px;max-width:470px}
        .pn .eb{display:flex;align-items:center;gap:10px;color:${LIME};font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase}
        .pn .eb:before{content:"";width:26px;height:2px;background:${LIME}}
        .pn h1{font-size:clamp(48px,6.6vw,84px);margin:14px 0 16px}
        .pn h1 em{color:${LIME};font-style:italic;display:block}
        .pn .hc p{font-size:16px;line-height:1.55;color:#d6d6d6;max-width:38ch;margin:0 0 22px}
        .pn .btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:48px;padding:0 26px;border-radius:4px;font-size:13px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;cursor:pointer;border:1.5px solid ${LIME};background:${LIME};color:#000}
        .pn .btn.o{background:transparent;color:#fff;border-color:#fff}
        .pn .btn:hover{filter:brightness(1.1)}
        .pn .hb{display:flex;gap:14px;flex-wrap:wrap}
        .pn .ft{display:flex;gap:26px;margin-top:30px;flex-wrap:wrap}
        .pn .ft div{display:flex;gap:10px;align-items:center;max-width:190px}
        .pn .ft b{display:block;font-size:12px;font-weight:600;line-height:1.25}
        .pn .ft span{display:block;font-size:11px;color:#bdbdbd;line-height:1.3}
        .pn .appr{position:absolute;z-index:3;right:5%;top:34px;display:flex;align-items:center;gap:10px;border:1px solid #3a3a3a;background:rgba(0,0,0,.55);padding:10px 14px;border-radius:4px;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#fff;text-decoration:none;min-height:44px}
        .pn .spec{position:absolute;z-index:3;right:5%;bottom:44px;display:flex;align-items:center;gap:14px;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#e6e6e6;text-align:right;line-height:1.5}
        .pn .spec i{width:44px;height:44px;border:1px solid ${LIME};border-radius:50%;display:grid;place-items:center;color:${LIME};font-style:normal;font-size:22px}
        .pn .mc{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;padding:14px 0 40px}
        .pn .mk{position:relative;aspect-ratio:2/1;border-radius:6px;overflow:hidden;border:1px solid #222;background:#000;cursor:pointer;padding:0;color:#fff;text-align:left}
        .pn .mk img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.95}
        .pn .mk:after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(0,0,0,.95),rgba(0,0,0,.6) 38%,rgba(0,0,0,0) 65%)}
        .pn .mk div{position:absolute;z-index:2;left:16px;right:16px;bottom:16px;display:flex;justify-content:space-between;align-items:flex-end}
        .pn .mk h3{font-size:19px}
        .pn .mk small{display:block;font-size:11px;letter-spacing:.14em;color:${LIME};margin-top:4px;font-weight:600}
        .pn .mk i{width:44px;height:44px;border-radius:50%;border:1px solid ${LIME};display:grid;place-items:center;color:${LIME}}
        .pn .sec{padding:10px 0 50px}
        .pn .hd{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:28px;gap:12px}
        .pn h2{font-size:clamp(38px,5vw,60px)}
        .pn h2 em{color:${LIME};font-style:italic}
        .pn .va{color:#fff;font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;display:inline-flex;gap:8px;align-items:center;cursor:pointer;background:none;border:0;min-height:44px;white-space:nowrap}
        .pn .pg{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
        .pn .pc{background:#0c0c0c;border:1px solid #232323;border-radius:6px;padding:16px;display:flex;flex-direction:column}
        .pn .pc img{width:100%;aspect-ratio:1.3;object-fit:cover;object-position:50% 30%;background:#000;border-radius:4px}
        .pn .pc h3{font-size:19px;margin:14px 0 4px}
        .pn .pc>small{color:#bdbdbd;font-size:12px}
        .pn .ch{display:flex;gap:6px;margin:12px 0;flex-wrap:wrap}
        .pn .ch span{border:1px solid #333;border-radius:3px;padding:4px 8px;font-size:11px;color:#d6d6d6}
        .pn .pf{display:flex;justify-content:space-between;align-items:center;margin-top:auto}
        .pn .pf b{font-size:20px;font-weight:600}
        .pn .cb{width:44px;height:44px;border-radius:4px;background:${LIME};border:0;display:grid;place-items:center;cursor:pointer;color:#000}
        .pn .ban{position:relative;min-height:290px;overflow:hidden;border-top:1px solid #1a1a1a;border-bottom:1px solid #1a1a1a;display:grid;align-items:center}
        .pn .ban .l,.pn .ban .r{position:absolute;top:0;bottom:0;width:52%;object-fit:cover}
        .pn .ban .l{left:0;clip-path:polygon(0 0,100% 0,82% 100%,0 100%)}
        .pn .ban .r{right:0;clip-path:polygon(18% 0,100% 0,100% 100%,0 100%)}
        .pn .ban:before{content:"";position:absolute;z-index:1;left:50%;top:-10%;bottom:-10%;width:3px;background:${LIME};transform:translateX(-50%) skewX(-12deg);box-shadow:0 0 16px ${LIME}}
        .pn .ban .t{position:relative;z-index:2;text-align:left;width:min(90%,380px);margin:0 0 0 40%;padding:20px;background:linear-gradient(90deg,rgba(0,0,0,.7),rgba(0,0,0,.35))}
        .pn .ban .t small{color:${LIME};letter-spacing:.2em;font-size:11px;font-weight:600}
        .pn .ban h2{margin:10px 0 18px;font-size:clamp(40px,5vw,60px)}
        .pn .ban .dv{position:absolute;z-index:2;right:2%;top:50%;writing-mode:vertical-rl;transform:translateY(-50%) rotate(180deg);color:${LIME};font-family:'Barlow Condensed',sans-serif;font-style:italic;font-weight:700;letter-spacing:.16em;font-size:14px;white-space:nowrap}
        .pn .bn{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;padding:34px 0;border-bottom:1px solid #1a1a1a}
        .pn .bn div{display:flex;gap:14px;align-items:center}
        .pn .bn b{display:block;font-size:14px;font-weight:600}
        .pn .bn span{font-size:12px;color:#bdbdbd}
        .pn .more{position:relative;min-height:380px;overflow:hidden;display:flex;align-items:center}
        .pn .more>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
        .pn .more:before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(5,5,5,.9) 30%,rgba(5,5,5,.1) 75%)}
        .pn .more .in{position:relative;z-index:2;display:flex;justify-content:space-between;align-items:center;gap:30px;padding:36px 0}
        .pn .more h2{font-size:clamp(38px,5vw,64px);margin:12px 0 24px}
        .pn .more h2 em{color:${LIME};display:block}
        .pn .gl{width:min(100%,300px);background:rgba(20,20,20,.6);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.18);border-radius:8px;padding:24px;display:grid;gap:12px}
        .pn .gl h3{font-size:24px;margin-bottom:4px}
        .pn .gl label{font-size:11px;color:#cfcfcf;letter-spacing:.08em;text-transform:uppercase}
        .pn .gl select{width:100%;height:46px;background:#0b0b0b;color:#fff;border:1px solid #333;border-radius:4px;padding:0 12px;font-size:14px;margin-top:5px}
        .pn .gl .btn{width:100%}
        .pn footer{padding:34px 0 44px;text-align:center;color:#a5a5a5;font-size:12px}
        .pn footer .logo{justify-content:center;margin-bottom:10px}
        .pn .wa{position:fixed;right:14px;bottom:14px;width:48px;height:48px;border-radius:50%;background:#25d366;display:grid;place-items:center;z-index:30;box-shadow:0 6px 18px rgba(0,0,0,.5)}
        .pn .toast{position:fixed;left:50%;bottom:74px;transform:translateX(-50%);background:${LIME};color:#000;padding:12px 20px;border-radius:4px;font-size:13px;font-weight:600;z-index:40}
        .pn a:focus-visible,.pn button:focus-visible,.pn select:focus-visible{outline:2px solid ${LIME};outline-offset:2px}
        @media(max-width:900px){
          .pn .nl,.pn .srch{display:none}.pn .nav{justify-content:space-between}.pn .burger{display:grid}.pn .ibs{display:flex;margin-left:auto}
          .pn .mob{display:grid;background:#0a0a0a;border-top:1px solid #222;padding:8px 5%}.pn .mob a{color:#fff;padding:0;min-height:48px;display:flex;align-items:center;cursor:pointer;border-bottom:1px solid #1c1c1c;font-size:15px}
          .pn .hero{min-height:0}.pn .hero>img{position:relative;width:100%;height:300px;display:block}.pn .hero:before{display:none}
          .pn .hc{padding:28px 0 40px}.pn .appr{top:12px;right:3%;font-size:10px;padding:8px 10px}.pn .spec{display:none}
          .pn .mc,.pn .pg{grid-template-columns:1fr 1fr}.pn .bn{grid-template-columns:1fr 1fr}
          .pn .more .in{flex-direction:column;align-items:flex-start}.pn .ban .l{width:100%;clip-path:none}.pn .ban .t{margin:0 auto;text-align:center;background:rgba(0,0,0,.55)}.pn .mk{aspect-ratio:1.4/1}.pn .ban .r{display:none}.pn .ban:before{display:none}.pn .ban .dv{display:none}
          .pn .ft div{max-width:none}
        }
        @media(max-width:520px){.pn .mc,.pn .pg{gap:10px}.pn .pc{padding:10px}.pn .pc h3{font-size:17px}.pn .mk h3{font-size:16px}.pn .mk div{left:10px;right:10px;bottom:10px}.pn .mk{aspect-ratio:1/1}.pn .pf b{font-size:16px}.pn .more>img{object-position:70% 50%}}
      `}</style>
      <header>
        <div className="in nav">
          <Logo />
          <nav className="nl" aria-label="Principal">
            <a onClick={() => go("loja")}>Loja</a><a onClick={() => go("loja")}>Pneus</a><a onClick={() => go("modelos")}>Performance</a><a onClick={() => go("sobre")}>Sobre</a><a href={wa("Oi! Preciso de suporte.")} target="_blank" rel="noreferrer">Suporte</a>
          </nav>
          <div className="srch"><Ico s={16} c="#cfcfcf"><path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4" /></Ico>Buscar pneus</div>
          <div className="ibs" style={{ display: "flex" }}>
            <a className="ib" href={wa("Oi! Quero falar com o time.")} target="_blank" rel="noreferrer" aria-label="Conta"><Ico s={22} c="#fff"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 20c1-4 4-6 8-6s7 2 8 6" /></Ico></a>
            <a className="ib" href={order} target="_blank" rel="noreferrer" aria-label={`Carrinho, ${cart.length} itens`}><Ico s={22} c="#fff"><path d="M3 4h3l2 11h10l2-8H7M10 20h.01M17 20h.01" /></Ico><span className="bd">{cart.length}</span></a>
            <button type="button" className="ib burger" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu(!menu)}><Ico s={24} c="#fff"><path d="M4 7h16M4 12h16M4 17h16" /></Ico></button>
          </div>
        </div>
        {menu && <div className="mob"><a onClick={() => go("loja")}>Loja</a><a onClick={() => go("loja")}>Pneus</a><a onClick={() => go("modelos")}>Performance</a><a onClick={() => go("sobre")}>Sobre</a><a href={wa("Oi! Preciso de suporte.")} target="_blank" rel="noreferrer">Suporte</a></div>}
      </header>

      <section className="hero">
        <img src="/vt-hero.webp" alt="Pneu esportivo gigante diante de um supercarro verde-limão em garagem escura com luzes neon" />
        <a className="appr" href={wa("Oi! Quero saber dos pneus aprovados para supercarros.")} target="_blank" rel="noreferrer"><Ico s={20}><path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6zM9 12l2 2 4-4" /></Ico>Pneus aprovados para supercarros <Arrow /></a>
        <div className="in"><div className="hc">
          <div className="eb">Feitos para extremos</div>
          <h1>Pneus feitos <em>para lendas</em></h1>
          <p>Pneus de alta performance para quem leva cada curva ao limite. Aderência, precisão e controle em cada quilômetro.</p>
          <div className="hb"><a className="btn" onClick={() => go("loja")} href="#loja">Comprar pneus <Arrow /></a><a className="btn o" onClick={() => go("modelos")} href="#modelos">Ver modelos</a></div>
          <div className="ft">{FEAT.map((f) => <div key={f.t}><Ico s={28}>{f.i}</Ico><span><b>{f.t}</b><span>{f.d}</span></span></div>)}</div>
        </div>
        <div className="spec"><span>Trofeo Apex R<br />305/30 ZR20<br />Performance todas as estações</span><i>+</i></div>
        </div>
      </section>

      <section className="in mc" id="modelos" aria-label="Modelos">
        {MODELS.map((m) => <button type="button" className="mk" key={m.n} onClick={() => { setMod(m.n); go("sobre"); }} aria-label={`${m.n}, ${m.c} produtos`}><img src={m.img} alt="" /><div><span><h3>{m.n}</h3><small>{m.c} PRODUTOS</small></span><i><Arrow /></i></div></button>)}
      </section>

      <section className="in sec" id="loja">
        <div className="hd"><div style={{ display: "flex", alignItems: "baseline", gap: 28, flexWrap: "wrap" }}><h2>Pneus em <em>destaque</em></h2><span style={{ fontSize: 12, color: "#bdbdbd", maxWidth: 220, lineHeight: 1.4 }}>Máximo desempenho. Máxima segurança. Escolhidos por donos de supercarros.</span></div><button type="button" className="va" onClick={() => window.open(wa("Oi! Quero ver todos os pneus."), "_blank")}>Ver todos <Arrow /></button></div>
        <div className="pg">
          {TIRES.map((t) => (
            <article className="pc" key={t.n}>
              <img src={t.img} alt={`Pneu ${t.n}`} />
              <h3>{t.n}</h3><small>{t.s}</small>
              <div className="ch">{t.a.map((a) => <span key={a}>{a}</span>)}</div>
              <div className="pf"><b>{money(t.p)}</b><button type="button" className="cb" aria-label={`Adicionar ${t.n} ao carrinho`} onClick={() => add(t.n)}><Ico s={20} c="#000"><path d="M3 4h3l2 11h10l2-8H7M10 20h.01M17 20h.01" /></Ico></button></div>
            </article>
          ))}
        </div>
      </section>

      <section className="ban" aria-label="Desempenho incomparável">
        <img className="l" src="/vt-ban1.webp" alt="Pneu esportivo com pinça de freio verde-limão" />
        <img className="r" src="/vt-ban2.webp" alt="Carro esportivo em estrada molhada ao entardecer" />
        <span className="dv">Dirija sem limites</span>
        <div className="t"><small>DESEMPENHO INCOMPARÁVEL</small><h2>Desempenho <em style={{ color: LIME }}>sem igual</em></h2><a className="btn o" href={wa("Oi! Quero saber mais sobre os pneus de performance.")} target="_blank" rel="noreferrer">Saiba mais <Arrow /></a></div>
      </section>

      <section className="in bn" aria-label="Benefícios">
        {BEN.map((b) => <div key={b.t}><Ico s={32}>{b.i}</Ico><span><b>{b.t}</b><span>{b.d}</span></span></div>)}
      </section>

      <section className="more" id="sobre">
        <img src="/vt-more.webp" alt="Supercarro verde-limão em garagem subterrânea com luzes neon" />
        <div className="in">
          <div><div className="eb">Mais que pneus</div><h2>Um padrão <em>mais alto</em></h2><a className="btn o" href={wa("Oi! Quero conhecer a história da loja.")} target="_blank" rel="noreferrer">Nossa história <Arrow /></a></div>
          <form className="gl" onSubmit={(e) => { e.preventDefault(); window.open(search, "_blank"); }}>
            <h3>Encontre o encaixe perfeito</h3>
            <label>Modelo<select value={mod} onChange={(e) => setMod(e.target.value)}><option value="">Selecione o modelo</option>{MODELS.map((m) => <option key={m.n}>{m.n}</option>)}</select></label>
            <label>Ano<select value={yr} onChange={(e) => setYr(e.target.value)}><option value="">Selecione o ano</option>{[2026, 2025, 2024, 2023, 2022, 2021, 2020].map((y) => <option key={y}>{y}</option>)}</select></label>
            <label>Medida do pneu<select value={size} onChange={(e) => setSize(e.target.value)}><option value="">Selecione a medida</option>{TIRES.map((t) => <option key={t.s}>{t.s}</option>)}</select></label>
            <button type="submit" className="btn">Buscar pneus <Arrow /></button>
          </form>
        </div>
      </section>

      <footer><div className="in"><Logo /><p style={{ margin: 0 }}>Fotos, nomes, números, preços e endereço são ilustrativos. Modelo de demonstração.</p></div></footer>
      <a className="wa" href={order} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp"><svg width="26" height="26" viewBox="0 0 24 24" fill="#fff" aria-hidden><path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2zm5.2 13.9c-.2.6-1.300 1.200-1.800 1.200-.5.100-1.100.100-1.800-.100-.4-.100-1-.300-1.700-.600-3-1.300-4.900-4.300-5.100-4.500-.1-.2-1.200-1.600-1.200-3s.8-2.100 1-2.400c.3-.3.600-.3.800-.3h.6c.2 0 .5-.1.700.5l.9 2.200c.1.200.1.400 0 .6l-.4.600c-.1.200-.3.300-.1.600.2.300.8 1.300 1.700 2.100 1.200 1 2.100 1.300 2.400 1.500.3.100.5.100.7-.1l.9-1.100c.2-.3.400-.2.700-.1l2 1c.3.100.5.200.5.300.1.100.1.700-.1 1.300z" /></svg></a>
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}
