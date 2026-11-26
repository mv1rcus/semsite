import { useEffect, useState } from "react";

/** Loja de eletronicos autoral, construida a partir de um pin escuro verde-menta com degrade lima, hero com fone em podio, categorias e mais vendidos. Carrinho que fecha no WhatsApp. */
const BG = "#060c0d", CARD = "#0e1a1b", LN = "rgba(180,240,220,.14)", MINT = "#6fe3c1", LIME = "#e6f08f", TX = "#eaf5f1", MU = "#b9d3cc";
const ITEMS = [
  { n: "Fone Aura X1", p: 799, old: 999, tag: "-20%", img: "/eletro-fone.webp", r: "4,9", c: "Fones" },
  { n: "Relógio Fit Pro", p: 649, old: 799, tag: "-15%", img: "/eletro-rel.webp", r: "4,7", c: "Relógios" },
  { n: "Buds Menta 2", p: 349, old: 0, tag: "", img: "/eletro-buds.webp", r: "4,6", c: "Fones" },
  { n: "Caixa de Som Orbe", p: 499, old: 0, tag: "", img: "/eletro-spk.webp", r: "4,9", c: "Som" },
  { n: "Carregador Wireless", p: 189, old: 0, tag: "", img: "/eletro-chg.webp", r: "4,5", c: "Acessórios" },
  { n: "Mochila Tech 20L", p: 429, old: 479, tag: "-10%", img: "/eletro-bag.webp", r: "4,8", c: "Acessórios" },
];
const CATS = ["Todos", "Fones", "Relógios", "Som", "Acessórios"];
const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const Star = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill={LIME} aria-hidden><path d="M12 2l3 7 7 .6-5.3 4.7 1.6 7.2L12 17.8 5.7 21.5l1.6-7.2L2 9.6 9 9z" /></svg>);

export function EletroFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Volt & Som";
  const city = client?.city?.trim() || "Recife";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [bag, setBag] = useState<{ i: number; q: number }[]>([]);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [name, setName] = useState("");
  const [added, setAdded] = useState<number | null>(null);
  const [cat, setCat] = useState("Todos");
  const [sc, setSc] = useState(false);
  const [left, setLeft] = useState(() => 2 * 86400 + 14 * 3600 + 36 * 60 + 45);
  useEffect(() => { const f = () => setSc(window.scrollY > 700); f(); window.addEventListener("scroll", f, { passive: true }); const t = setInterval(() => setLeft((l) => (l > 0 ? l - 1 : l)), 1000); return () => { window.removeEventListener("scroll", f); clearInterval(t); }; }, []);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const add = (i: number) => { setBag((b) => { const k = b.findIndex((x) => x.i === i); if (k >= 0) return b.map((x, j) => (j === k ? { ...x, q: x.q + 1 } : x)); return [...b, { i, q: 1 }]; }); setAdded(i); setTimeout(() => setAdded(null), 1200); };
  const qty = (k: number, d: number) => setBag((b) => b.map((x, j) => (j === k ? { ...x, q: x.q + d } : x)).filter((x) => x.q > 0));
  const count = bag.reduce((a, x) => a + x.q, 0);
  const total = bag.reduce((a, x) => a + x.q * ITEMS[x.i]!.p, 0);
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero comprar na ${brand}: ${bag.map((x) => `${x.q}x ${ITEMS[x.i]!.n}`).join(", ")}. Total ${brl(total)}.${name ? ` Em nome de ${name}.` : ""}`)}`;
  const d = Math.floor(left / 86400), h = Math.floor((left % 86400) / 3600), m = Math.floor((left % 3600) / 60), s = left % 60;
  const p2 = (v: number) => String(v).padStart(2, "0");

  return (
    <div className="el" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: TX, background: `radial-gradient(900px 500px at 85% -5%, rgba(111,227,193,.13), transparent 60%), ${BG}`, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Sora:wght@600;700&display=swap');
        .el *{box-sizing:border-box}.el a,.el button,.el input{font-family:inherit}
        .el .wrap{max-width:1200px;margin:0 auto;padding:0 24px}
        .el .so{font-family:Sora,system-ui,sans-serif;letter-spacing:-.02em}
        .el .top{background:linear-gradient(90deg,#123a35,#3a4a1f);font-size:14px;text-align:center;padding:10px 16px;color:${TX}}
        .el .top b{color:${LIME}}
        .el .nav{display:flex;align-items:center;gap:28px;height:76px}
        .el .logo{font-family:Sora,sans-serif;font-weight:700;font-size:20px;letter-spacing:.14em;text-transform:uppercase;display:flex;flex-direction:column;line-height:1.1}
        .el .logo small{font-size:10px;letter-spacing:.35em;color:${MU};font-weight:600}
        .el .nav .m{display:flex;gap:26px;font-size:15px;font-weight:500;color:${MU}}.el .nav .m a{cursor:pointer}.el .nav .m a:hover{color:${TX}}
        .el .srch{flex:1;max-width:340px;margin-left:auto;display:flex;align-items:center;gap:8px;background:${CARD};border:1px solid ${LN};border-radius:99px;padding:0 16px;min-height:44px;color:${MU};font-size:14.5px}
        .el .ib{background:none;border:0;color:${TX};cursor:pointer;min-width:44px;min-height:44px;display:grid;place-items:center;position:relative}
        .el .ib i{position:absolute;top:4px;right:2px;background:${MINT};color:#04201a;font-style:normal;font-size:11px;font-weight:800;min-width:18px;height:18px;border-radius:99px;display:grid;place-items:center}
        .el .burger{display:none}
        .el .hero{position:relative;border-radius:28px;overflow:hidden;min-height:480px;background:linear-gradient(100deg,#07161a 0%,#0c2e2c 48%,#9fb86a 130%);border:1px solid ${LN};display:grid;grid-template-columns:1.05fr 1fr;align-items:center}
        .el .hero .tx{padding:52px 48px;position:relative;z-index:2}
        .el .hero .pill{display:inline-block;background:rgba(255,255,255,.08);border:1px solid ${LN};border-radius:99px;font-size:13px;padding:5px 14px;margin-bottom:18px;color:${MU}}
        .el .hero h1{font-size:clamp(48px,6.6vw,84px);line-height:1.02;margin:0 0 18px;color:${MINT};font-weight:700}
        .el .hero h1 i{display:block;color:${LIME}}
        .el .hero p{font-size:17px;line-height:1.6;color:#c4dad4;max-width:420px;margin:0 0 28px}
        .el .btn{background:${MINT};color:#04201a;border:0;border-radius:99px;padding:0 28px;min-height:50px;font-weight:700;font-size:15.5px;cursor:pointer}
        .el .btn.o{background:none;color:${TX};border:1px solid rgba(234,245,241,.4)}
        .el .hero .im{height:100%;min-height:380px;filter:drop-shadow(0 0 40px rgba(111,227,193,.25))}.el .hero .im img{width:100%;height:100%;object-fit:cover;object-position:center;display:block;-webkit-mask-image:linear-gradient(to right,transparent 0,#000 30%);mask-image:linear-gradient(to right,transparent 0,#000 30%)}
        .el .sh{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin:46px 0 18px}
        .el .sh h2{font-size:24px;margin:0;font-weight:700}.el .sh a{color:${MU};font-size:14.5px;cursor:pointer}
        .el .cats{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px}
        .el .cc{position:relative;border-radius:20px;overflow:hidden;aspect-ratio:1.1;border:1px solid ${LN};cursor:pointer;background:${CARD};text-align:left;padding:0;color:${TX}}
        .el .cc img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s}.el .cc:hover img{transform:scale(1.05)}
        .el .cc .lb{position:absolute;left:0;right:0;bottom:0;padding:34px 14px 12px;background:linear-gradient(transparent,rgba(3,10,10,.92));display:flex;justify-content:space-between;align-items:center;font-weight:700;font-size:15px}
        .el .cc .lb span{display:grid;place-items:center;width:30px;height:30px;border-radius:99px;background:${LIME};color:#1b2205}
        .el .tabs{display:flex;gap:8px;flex-wrap:wrap}.el .tab{border:1px solid ${LN};background:none;color:${MU};border-radius:99px;min-height:40px;padding:0 16px;font-size:14.5px;font-weight:600;cursor:pointer}
        .el .tab.on{background:${TX};color:#06201a;border-color:${TX}}
        .el .gr{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
        .el .pc{background:${CARD};border:1px solid ${LN};border-radius:22px;padding:12px 12px 16px;position:relative}
        .el .pc .im{border-radius:16px;overflow:hidden;aspect-ratio:1.15;background:#0a1516}.el .pc .im img{width:100%;height:100%;object-fit:cover;display:block}
        .el .pc .bd{position:absolute;top:22px;left:22px;background:${MINT};color:#04201a;font-size:12.5px;font-weight:800;border-radius:8px;padding:3px 9px}
        .el h1,.el h2,.el h3{font-family:Sora,system-ui,sans-serif;letter-spacing:-.02em}.el .pc h3{font-size:17px;margin:14px 4px 4px;font-weight:700}
        .el .rt{display:flex;align-items:center;gap:4px;margin:0 4px 10px;font-size:14.5px;color:${MU}}
        .el .pr{display:flex;justify-content:space-between;align-items:center;margin:0 4px}
        .el .pr b{font-size:20px}.el .pr s{color:${MU};font-size:14px;margin-left:8px}
        .el .ad{width:44px;height:44px;border-radius:12px;border:0;background:${MINT};color:#04201a;font-weight:800;font-size:20px;cursor:pointer}
        .el .sale{border-radius:24px;background:linear-gradient(100deg,#2f9c88,#bfd37a 80%,#e7f090);color:#06201a;display:flex;justify-content:space-between;align-items:center;gap:24px;padding:34px 44px;flex-wrap:wrap;margin-top:46px}
        .el .sale h2{font-size:clamp(30px,4vw,44px);margin:6px 0 8px;line-height:1.05}.el .sale p{margin:0;font-size:16px}
        .el .cd{display:flex;gap:10px}.el .cd div{background:rgba(255,255,255,.35);border-radius:14px;min-width:70px;padding:10px 6px;text-align:center}
        .el .cd b{display:block;font-family:Sora,sans-serif;font-size:30px}.el .cd span{font-size:12.5px;font-weight:600}
        .el .sale .btn{background:#06201a;color:${TX}}
        .el .ben{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-top:46px;background:${CARD};border:1px solid ${LN};border-radius:22px;padding:24px}
        .el .ben b{display:block;font-size:15.5px;margin-bottom:4px;color:${MINT}}.el .ben span{font-size:15px;color:${MU};line-height:1.45}
        .el .rv{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
        .el .rv>div{background:${CARD};border:1px solid ${LN};border-radius:20px;padding:22px}
        .el .rv p{margin:10px 0 14px;font-size:15.5px;line-height:1.55}.el .rv span{font-size:15px;color:${MU}}
        .el .nl{border-radius:24px;background:linear-gradient(100deg,#2c8f7d,#e0ec88);color:#06201a;padding:30px 36px;display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap;margin-top:46px}
        .el .nl h3{font-size:26px;margin:0 0 4px}.el .nl p{margin:0;font-size:15px}
        .el .nl form{display:flex;gap:10px;flex-wrap:wrap}.el .nl input{min-height:48px;border-radius:99px;border:0;padding:0 20px;font-size:15px;min-width:230px;background:rgba(255,255,255,.55);color:#06201a}
        .el .nl a{background:#06201a;color:${TX};border-radius:99px;min-height:48px;padding:0 26px;display:grid;place-items:center;font-weight:700;text-decoration:none}
        .el footer{margin-top:56px;padding:40px 0 34px;border-top:1px solid ${LN}}
        .el .fg{display:grid;grid-template-columns:1.6fr 1fr 1fr 1.2fr;gap:30px;font-size:16px;color:${MU}}
        .el .fg h5{font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:${TX};margin:0 0 12px}.el .fg a{display:block;padding:5px 0;cursor:pointer}
        .el .fl{position:fixed;left:50%;transform:translateX(-50%);bottom:20px;z-index:30;background:${MINT};color:#04201a;border:0;border-radius:99px;min-height:50px;padding:0 26px;font-weight:700;font-size:15px;box-shadow:0 10px 30px rgba(111,227,193,.3);cursor:pointer}
        .el .ov{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:40}
        .el .dw{position:fixed;top:0;right:0;bottom:0;width:min(420px,100%);background:#0b1516;border-left:1px solid ${LN};z-index:41;padding:26px 24px;overflow:auto}
        .el .dw h3{font-family:Sora,sans-serif;font-size:26px;margin:0 0 4px}
        .el .x{position:absolute;top:14px;right:14px;width:44px;height:44px;border:0;background:none;font-size:28px;cursor:pointer;color:${TX}}
        .el .li{display:flex;gap:12px;padding:14px 0;border-bottom:1px solid ${LN}}.el .li img{width:64px;height:64px;border-radius:12px;object-fit:cover}
        .el .qn{display:inline-flex;align-items:center;gap:10px;margin-top:6px}.el .qn button{width:34px;height:34px;border-radius:99px;border:1px solid ${LN};background:none;color:${TX};font-size:18px;cursor:pointer}
        .el input.f{width:100%;margin-top:14px;padding:14px 16px;border:1px solid ${LN};border-radius:14px;font-size:15px;background:${CARD};color:${TX}}
        .el .mob{display:none}
        @media(max-width:900px){
          .el .nav .m,.el .srch{display:none}.el .burger{display:grid}.el .nav{height:64px;gap:0;justify-content:space-between}
          .el .hero{grid-template-columns:1fr;min-height:0}.el .hero .tx{padding:32px 22px 6px}.el .hero .im{min-height:280px;height:300px}.el .hero .im img{-webkit-mask-image:linear-gradient(to bottom,transparent 0,#000 25%);mask-image:linear-gradient(to bottom,transparent 0,#000 25%)}
          .el .cats{grid-template-columns:repeat(2,minmax(0,1fr))}.el .gr{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
          .el .pc{padding:9px 9px 14px}.el .pc h3{font-size:15px}.el .pr b{font-size:17px}.el .pr s{display:none}
          .el .sale{padding:26px 22px}.el .cd div{min-width:62px}.el .ben,.el .rv{grid-template-columns:1fr 1fr}.el .rv{grid-template-columns:1fr}
          .el .fg{grid-template-columns:1fr 1fr}.el .wrap{padding:0 16px}.el .nl{padding:26px 22px}
          .el .mob{display:block;background:${CARD};border:1px solid ${LN};border-radius:16px;margin-bottom:8px}.el .mob a{display:block;padding:14px 20px;font-size:15px;cursor:pointer}
        }
      `}</style>

      <div className="top">Oferta de verão no ar: até <b>40% OFF</b> em fones e relógios · Frete grátis acima de R$ 599</div>
      <div className="wrap">
        <div className="nav">
          <div className="logo">{brand}<small>Eletrônicos</small></div>
          <div className="m"><a onClick={() => go("cats")}>Categorias</a><a onClick={() => go("vendidos")}>Mais vendidos</a><a onClick={() => go("oferta")}>Ofertas</a><a onClick={() => go("contato")}>Loja</a></div>
          <div className="srch"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>Buscar produtos</div>
          <button type="button" className="ib" onClick={() => setOpen(true)} aria-label="Abrir carrinho"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 7h14l-1.2 12H6.2zM9 7a3 3 0 016 0" /></svg>{count > 0 && <i>{count}</i>}</button>
          <button type="button" className="ib burger" aria-label="Menu" onClick={() => setMenu((v) => !v)}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 8h16M4 16h16" /></svg></button>
        </div>
        {menu && <div className="mob"><a onClick={() => go("cats")}>Categorias</a><a onClick={() => go("vendidos")}>Mais vendidos</a><a onClick={() => go("oferta")}>Ofertas</a><a onClick={() => go("contato")}>Loja</a></div>}

        <div className="hero">
          <div className="tx">
            <span className="pill">Coleção {new Date().getFullYear()}</span>
            <h1 className="so">Eleve o seu<i>dia a dia.</i></h1>
            <p>Fones, relógios e acessórios com design limpo e som de verdade. Garantia de 1 ano e retirada em {city}.</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}><button type="button" className="btn" onClick={() => go("vendidos")}>Comprar agora →</button><button type="button" className="btn o" onClick={() => go("cats")}>Ver coleção</button></div>
          </div>
          <div className="im"><img src="/eletro-hero.webp" alt="Fone de ouvido verde-menta sobre pódio iluminado" /></div>
        </div>

        <div className="sh" id="cats"><h2 className="so">Categorias</h2><a onClick={() => go("vendidos")}>Ver tudo →</a></div>
        <div className="cats">
          {([["Fones", "/eletro-fone.webp", "24"], ["Relógios", "/eletro-rel.webp", "18"], ["Som", "/eletro-spk.webp", "16"], ["Acessórios", "/eletro-chg.webp", "32"], ["Mochilas", "/eletro-bag.webp", "12"]] as const).map(([c, img, n]) => (
            <button type="button" className="cc" key={c} onClick={() => { setCat(c === "Mochilas" ? "Acessórios" : c); go("vendidos"); }}><img src={img} alt={c} loading="lazy" /><div className="lb"><div>{c}<div style={{ fontSize: 12.5, color: MU, fontWeight: 500 }}>{n} produtos</div></div><span>→</span></div></button>
          ))}
        </div>

        <div className="sh" id="vendidos"><h2 className="so">Mais vendidos</h2><div className="tabs">{CATS.map((c) => (<button key={c} type="button" className={`tab${cat === c ? " on" : ""}`} onClick={() => setCat(c)}>{c}</button>))}</div></div>
        <div className="gr">
          {ITEMS.map((it, i) => (cat === "Todos" || it.c === cat) && (
            <div className="pc" key={it.n}>
              <div className="im"><img src={it.img} alt={it.n} loading="lazy" /></div>
              {it.tag && <span className="bd">{it.tag}</span>}
              <h3>{it.n}</h3>
              <div className="rt"><Star />{it.r} · avaliação dos clientes</div>
              <div className="pr"><div><b>{brl(it.p)}</b>{it.old > 0 && <s>{brl(it.old)}</s>}</div>
                <button type="button" className="ad" aria-label={`Adicionar ${it.n}`} onClick={() => add(i)}>{added === i ? "✓" : "+"}</button></div>
            </div>
          ))}
        </div>

        <div className="sale" id="oferta">
          <div><span style={{ fontSize: 13.5, fontWeight: 700 }}>Oferta por tempo limitado</span><h2 className="so">Verão com até 40% OFF</h2><p>Não perca a maior liquidação da estação.</p></div>
          <div className="cd">{([[d, "Dias"], [h, "Horas"], [m, "Min"], [s, "Seg"]] as const).map(([v, l]) => (<div key={l}><b>{p2(v)}</b><span>{l}</span></div>))}</div>
          <button type="button" className="btn" onClick={() => go("vendidos")}>Comprar a oferta →</button>
        </div>

        <div className="ben">
          {[["Qualidade premium", "Produtos testados e escolhidos a dedo."], ["Frete grátis", "Em compras acima de R$ 599 para todo o Brasil."], ["Troca fácil", "30 dias para trocar, sem burocracia."], ["Suporte no WhatsApp", `Atendimento humano, de segunda a sábado, em ${city}.`]].map(([a, b]) => (<div key={a}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={MINT} strokeWidth="2" aria-hidden style={{ marginBottom: 8 }}><circle cx="12" cy="12" r="9" /><path d="M8 12.5l3 3 5-6" /></svg><b>{a}</b><span>{b}</span></div>))}
        </div>

        <div className="sh"><h2 className="so">O que dizem os clientes</h2></div>
        <div className="rv">
          {[["Ana Beatriz", "O fone é leve e o som é muito limpo. Chegou em dois dias."], ["Marcos Lima", "Atendimento rápido no WhatsApp e produto igual ao da foto. Recomendo."], ["Camila Duarte", "Comprei o relógio e o carregador juntos, tudo funcionando perfeito."]].map(([n, t]) => (<div key={n}><div style={{ display: "flex", gap: 3 }}>{[0, 1, 2, 3, 4].map((k) => <Star key={k} />)}</div><p>“{t}”</p><span>{n} · compra verificada</span></div>))}
        </div>

        <div className="nl">
          <div><h3 className="so">Fique por dentro</h3><p>Receba ofertas e lançamentos no seu WhatsApp.</p></div>
          <form onSubmit={(e) => e.preventDefault()}><input placeholder="Seu WhatsApp" aria-label="Seu WhatsApp" /><a href={`https://wa.me/${num}?text=${encodeURIComponent("Oi! Quero receber as ofertas.")}`} target="_blank" rel="noreferrer">Quero receber</a></form>
        </div>

        <footer id="contato"><div className="fg">
          <div><div className="logo" style={{ color: TX }}>{brand}<small>Eletrônicos</small></div><p style={{ lineHeight: 1.65, marginTop: 14 }}>Tecnologia com design e preço justo.<br />Rua da Aurora, 120, Boa Vista, {city}.<br />Seg a sáb, 9h às 19h.</p></div>
          <div><h5>Loja</h5><a onClick={() => go("vendidos")}>Mais vendidos</a><a onClick={() => go("oferta")}>Ofertas</a><a onClick={() => setOpen(true)}>Carrinho</a></div>
          <div><h5>Ajuda</h5><a>Trocas e devoluções</a><a>Garantia</a><a>Rastrear pedido</a></div>
          <div><h5>Contato</h5><a href={`https://wa.me/${num}?text=${encodeURIComponent("Oi! Tenho uma dúvida.")}`} target="_blank" rel="noreferrer">WhatsApp</a><a>Instagram</a></div>
        </div></footer>
      </div>

      {sc && count === 0 && <button type="button" className="fl" onClick={() => go("vendidos")}>Ver mais vendidos</button>}
      {sc && count > 0 && <button type="button" className="fl" onClick={() => setOpen(true)}>Carrinho · {count} · {brl(total)}</button>}

      {open && (<>
        <div className="ov" onClick={() => setOpen(false)} />
        <aside className="dw" role="dialog" aria-label="Seu carrinho">
          <button type="button" className="x" aria-label="Fechar" onClick={() => setOpen(false)}>×</button>
          <h3>Seu carrinho</h3>
          <span style={{ color: MU, fontSize: 14 }}>{count === 0 ? "Nada por aqui ainda" : `${count} ${count === 1 ? "item" : "itens"}`}</span>
          {count === 0 ? (
            <div style={{ margin: "34px 0", textAlign: "center" }}><p style={{ color: MU }}>Escolha um produto para começar.</p><button type="button" className="btn" onClick={() => { setOpen(false); go("vendidos"); }}>Ver mais vendidos</button></div>
          ) : (<>
            {bag.map((x, k) => (
              <div className="li" key={x.i}><img src={ITEMS[x.i]!.img} alt="" />
                <div style={{ flex: 1 }}><b style={{ fontSize: 15 }}>{ITEMS[x.i]!.n}</b><div style={{ fontWeight: 700, color: MINT }}>{brl(ITEMS[x.i]!.p)}</div>
                  <div className="qn"><button type="button" aria-label="Menos" onClick={() => qty(k, -1)}>−</button><b>{x.q}</b><button type="button" aria-label="Mais" onClick={() => qty(k, 1)}>+</button></div></div>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", margin: "18px 0 4px", fontSize: 18, fontWeight: 700 }}><span>Total</span><span>{brl(total)}</span></div>
            <input className="f" placeholder="Seu nome" aria-label="Seu nome" value={name} onChange={(e) => setName(e.target.value)} />
            <a className="btn" href={wa} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 14, textDecoration: "none" }}>Fechar compra no WhatsApp</a>
          </>)}
        </aside>
      </>)}
    </div>
  );
}
