import { useEffect, useState } from "react";

/** Loja de moveis autoral, construida a partir de um pin verde-salvia com titulo gigante arredondado sobre a poltrona, cartoes de produto, categorias em cartoes e faixa escura com colecao. Carrinho que fecha no WhatsApp. */
const SAGE = "#a3ab97", CREAM = "#efe8de", DARK = "#2e231f", OLIVE = "#4a5a32", BROWN = "#4a2e1c", TX = "#2b211c", MU = "#6a5f55";
const ITEMS = [
  { n: "Poltrona Koda", p: 2490, img: "/movel-hero.webp", c: "Poltronas", tag: "novo" },
  { n: "Poltrona Dana", p: 2190, img: "/movel-arm.webp", c: "Poltronas", tag: "novo" },
  { n: "Cadeira Verta", p: 890, img: "/movel-cad.webp", c: "Cadeiras", tag: "" },
  { n: "Sofá Curvo Perra", p: 6890, img: "/movel-sof.webp", c: "Sofás", tag: "" },
  { n: "Poltrona Cresta", p: 2790, img: "/movel-p2.webp", c: "Poltronas", tag: "" },
  { n: "Poltrona Terra", p: 2590, img: "/movel-p3.webp", c: "Poltronas", tag: "" },
];
const TABS = ["Todos", "Poltronas", "Cadeiras", "Sofás"];
const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export function MovelFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Formas Moles";
  const city = client?.city?.trim() || "Belo Horizonte";
  const word = brand.split(/\s+/)[0]!.toLowerCase();
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [bag, setBag] = useState<{ i: number; q: number }[]>([]);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [name, setName] = useState("");
  const [added, setAdded] = useState<number | null>(null);
  const [cat, setCat] = useState("Todos");
  const [sc, setSc] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 700); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const add = (i: number) => { setBag((b) => { const k = b.findIndex((x) => x.i === i); if (k >= 0) return b.map((x, j) => (j === k ? { ...x, q: x.q + 1 } : x)); return [...b, { i, q: 1 }]; }); setAdded(i); setTimeout(() => setAdded(null), 1200); };
  const qty = (k: number, d: number) => setBag((b) => b.map((x, j) => (j === k ? { ...x, q: x.q + d } : x)).filter((x) => x.q > 0));
  const count = bag.reduce((a, x) => a + x.q, 0);
  const total = bag.reduce((a, x) => a + x.q * ITEMS[x.i]!.p, 0);
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero comprar na ${brand}: ${bag.map((x) => `${x.q}x ${ITEMS[x.i]!.n}`).join(", ")}. Total ${brl(total)}.${name ? ` Em nome de ${name}.` : ""}`)}`;
  const mq = "EDIÇÃO LIMITADA // COLEÇÃO SECRETA // ";

  return (
    <div className="mf" style={{ fontFamily: "'Nunito', system-ui, sans-serif", color: TX, background: CREAM, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=Nunito:wght@400;600;700;800&display=swap');
        .mf *{box-sizing:border-box}.mf a,.mf button,.mf input{font-family:inherit}
        .mf .dg{font-family:'Dela Gothic One',system-ui,sans-serif;font-weight:400;letter-spacing:-.01em}
        .mf .hero{position:relative;background:#a3ab97;min-height:720px;overflow:hidden}
        .mf .hero .bg{position:absolute;inset:0;background:url(/movel-hero.webp) center 70%/cover no-repeat}
        .mf .nav{position:relative;z-index:3;display:flex;align-items:center;gap:30px;max-width:1200px;margin:0 auto;padding:22px 28px}
        .mf .lg{width:46px;height:46px;border-radius:14px;background:${OLIVE};color:${CREAM};display:grid;place-items:center;font-family:'Dela Gothic One',sans-serif;font-size:24px}
        .mf .nav .m{display:flex;gap:28px;font-size:15.5px;font-weight:700}.mf .nav .m a{cursor:pointer}
        .mf .ib{background:${OLIVE};border:0;color:${CREAM};cursor:pointer;width:46px;height:46px;border-radius:14px;display:grid;place-items:center;position:relative;margin-left:auto}
        .mf .ib i{position:absolute;top:-6px;right:-6px;background:#e6b44c;color:${DARK};font-style:normal;font-size:11px;font-weight:800;min-width:20px;height:20px;border-radius:99px;display:grid;place-items:center}
        .mf .burger{display:none;margin-left:10px}
        .mf .big{position:absolute;z-index:2;left:50%;top:150px;transform:translateX(-62%);color:${CREAM};font-size:clamp(110px,19vw,250px);line-height:1;margin:0;white-space:nowrap;text-shadow:0 6px 0 rgba(0,0,0,.06)}
        .mf .big small{position:absolute;right:4%;bottom:-6%;font-size:.17em;font-family:'Nunito',sans-serif;font-weight:700;color:${CREAM}}
        .mf .cards{position:absolute;z-index:3;right:max(24px,calc(50% - 600px));top:104px;display:grid;gap:12px;width:122px}
        .mf .mc{background:${CREAM};border-radius:24px;padding:8px 8px 10px;text-align:center;font-size:13px;font-weight:700;border:0;cursor:pointer}
        .mf .mc img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:18px;display:block;margin-bottom:6px}
        .mf .mc b{display:block;font-size:10px;background:${OLIVE};color:${CREAM};border-radius:99px;width:fit-content;padding:1px 8px;margin:-24px auto 8px;position:relative}
        .mf .hb{position:absolute;z-index:3;left:max(28px,calc(50% - 600px));bottom:40px;font-size:15px;font-weight:700;line-height:1.35;max-width:230px}
        .mf .hb2{position:absolute;z-index:3;right:max(24px,calc(50% - 600px));bottom:30px}
        .mf .btn{background:${BROWN};color:${CREAM};border:0;border-radius:99px;padding:0 26px;min-height:48px;font-weight:700;font-size:15px;cursor:pointer;display:inline-flex;align-items:center;text-decoration:none}
        .mf .wrap{max-width:1200px;margin:0 auto;padding:0 28px}
        .mf .intro{display:grid;grid-template-columns:1.1fr 1fr;gap:30px;padding-top:70px;align-items:start}
        .mf .intro h2,.mf .h2{font-size:clamp(30px,4.2vw,50px);line-height:1.06;color:${BROWN};margin:0}
        .mf .intro p{font-size:16.5px;line-height:1.6;margin:6px 0 0;color:${TX}}
        .mf .sofa{display:grid;grid-template-columns:1.1fr 1fr;gap:30px;align-items:center;margin-top:10px}
        .mf .sofa .im{border-radius:26px;overflow:hidden;height:130px}.mf .sofa .im img{width:100%;height:100%;object-fit:cover;object-position:center 55%;display:block}
        .mf .sofa small{display:block;margin-top:12px;font-size:14.5px;color:${MU}}
        .mf .cats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:34px}
        .mf .cc .im{border-radius:30px;overflow:hidden;aspect-ratio:.88}.mf .cc .im img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s}.mf .cc:hover .im img{transform:scale(1.04)}
        .mf .cc .r{display:flex;justify-content:space-between;align-items:center;margin-top:12px;font-size:19px;font-weight:700}
        .mf .cc .r button{background:${DARK};color:${CREAM};border:0;border-radius:99px;min-height:40px;padding:0 18px;font-size:14px;font-weight:700;cursor:pointer}
        .mf .tabs{display:flex;gap:8px;flex-wrap:wrap;margin:22px 0}.mf .tab{border:2px solid ${DARK};background:none;color:${DARK};border-radius:99px;min-height:42px;padding:0 18px;font-size:14.5px;font-weight:700;cursor:pointer}
        .mf .tab.on{background:${DARK};color:${CREAM}}
        .mf .gr{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
        .mf .pc{background:#f7f2ea;border-radius:26px;padding:12px 12px 16px}
        .mf .pc .im{border-radius:20px;overflow:hidden;aspect-ratio:1.05;position:relative;background:#ddd5c8}.mf .pc .im img{width:100%;height:100%;object-fit:cover;display:block}
        .mf .pc .im b{position:absolute;top:10px;left:10px;background:${OLIVE};color:${CREAM};font-size:12px;border-radius:99px;padding:2px 10px}
        .mf .pc h3{font-family:'Nunito',sans-serif;font-size:17px;margin:14px 6px 2px;font-weight:800}.mf .pc .row{display:flex;justify-content:space-between;align-items:center;margin:0 6px}
        .mf .pc .row b{font-size:19px}.mf .ad{width:46px;height:46px;border-radius:99px;border:0;background:${OLIVE};color:${CREAM};font-size:22px;font-weight:700;cursor:pointer}
        .mf .dk{background:${DARK};color:${CREAM};margin-top:70px;padding:0 0 50px;overflow:hidden}
        .mf .mqe{white-space:nowrap;font-size:clamp(26px,4vw,44px);font-weight:800;color:rgba(239,232,222,.28);padding:26px 0 30px}
        .mf .col{display:grid;grid-template-columns:.8fr 1.2fr;gap:30px;align-items:stretch}
        .mf .col .im{border-radius:28px;overflow:hidden;min-height:340px}.mf .col .im img{width:100%;height:100%;object-fit:cover;display:block}
        .mf .col h3{font-size:clamp(26px,3.4vw,38px);line-height:1.2;margin:0 0 14px;font-weight:600}.mf .col p{color:#c8bfb3;line-height:1.6;font-size:15.5px;margin:0 0 20px}
        .mf .tr{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;background:${CREAM};border-radius:26px;padding:12px;color:${TX}}
        .mf .tr div{text-align:center;font-weight:700;font-size:15px}.mf .tr img{width:100%;aspect-ratio:1.1;object-fit:cover;border-radius:18px;display:block;margin-bottom:6px}
        .mf .mqf{white-space:nowrap;font-size:clamp(24px,3.4vw,38px);font-weight:800;color:rgba(46,35,31,.35);padding:22px 0;background:#d9d0c3}
        .mf .rv{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:20px}
        .mf .rv>div{background:#f7f2ea;border-radius:24px;padding:24px}.mf .rv p{margin:0 0 14px;line-height:1.55;font-size:15.5px}.mf .rv span{font-weight:800;font-size:14.5px}
        .mf footer{background:${DARK};color:#d9d0c3;padding:44px 0 34px}
        .mf .fg{display:grid;grid-template-columns:1.6fr 1fr 1fr 1.2fr;gap:30px;font-size:15.5px}
        .mf .fg h5{font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:${CREAM};margin:0 0 12px}.mf .fg a{display:block;padding:5px 0;cursor:pointer}
        .mf .fl{position:fixed;left:50%;transform:translateX(-50%);bottom:20px;z-index:30;background:${BROWN};color:${CREAM};border:0;border-radius:99px;min-height:50px;padding:0 26px;font-weight:700;font-size:15px;box-shadow:0 10px 30px rgba(0,0,0,.25);cursor:pointer}
        .mf .ov{position:fixed;inset:0;background:rgba(30,20,15,.55);z-index:40}
        .mf .dw{position:fixed;top:0;right:0;bottom:0;width:min(420px,100%);background:${CREAM};z-index:41;padding:26px 24px;overflow:auto}
        .mf .dw h3{font-family:'Dela Gothic One',sans-serif;font-weight:400;font-size:26px;margin:0 0 4px;color:${BROWN}}
        .mf .x{position:absolute;top:14px;right:14px;width:44px;height:44px;border:0;background:none;font-size:28px;cursor:pointer;color:${TX}}
        .mf .li{display:flex;gap:12px;padding:14px 0;border-bottom:1px solid rgba(46,35,31,.15)}.mf .li img{width:64px;height:64px;border-radius:14px;object-fit:cover}
        .mf .qn{display:inline-flex;align-items:center;gap:10px;margin-top:6px}.mf .qn button{width:34px;height:34px;border-radius:99px;border:2px solid ${DARK};background:none;color:${TX};font-size:18px;cursor:pointer}
        .mf input.f{width:100%;margin-top:14px;padding:14px 16px;border:2px solid ${DARK};border-radius:14px;font-size:15px;background:#fff;color:${TX}}
        .mf .mob{display:none}
        @media(max-width:900px){
          .mf .nav .m{display:none}.mf .burger{display:grid}.mf .nav{padding:16px}.mf .ib{margin-left:auto}
          .mf .hero{min-height:640px}.mf .hero .bg{background-position:42% 80%;background-size:cover}
          .mf .big{top:120px;transform:translateX(-50%);font-size:23vw}.mf .cards{display:none}
          .mf .hb{left:18px;bottom:24px;max-width:170px;font-size:13.5px}.mf .hb2{right:16px;bottom:20px}
          .mf .intro,.mf .sofa,.mf .col{grid-template-columns:1fr}.mf .intro{padding-top:46px}
          .mf .cats{grid-template-columns:1fr;gap:26px}.mf .cc .im{aspect-ratio:1.1}
          .mf .gr{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.mf .pc{padding:9px 9px 14px}.mf .pc h3{font-size:14.5px}.mf .pc .row b{font-size:16px}.mf .ad{width:40px;height:40px}
          .mf .col .im{min-height:280px}.mf .tr{grid-template-columns:repeat(3,1fr)}
          .mf .rv{grid-template-columns:1fr}.mf .fg{grid-template-columns:1fr 1fr}.mf .wrap{padding:0 16px}
          .mf .mob{display:block;background:#f7f2ea;border-radius:16px;margin:0 16px 8px;position:relative;z-index:4}.mf .mob a{display:block;padding:14px 20px;font-size:15px;font-weight:700;cursor:pointer}
        }
      `}</style>

      <div className="hero">
        <div className="bg" role="img" aria-label="Poltrona redonda de veludo verde-oliva" />
        <div className="nav">
          <div className="lg">{brand[0]}</div>
          <div className="m"><a onClick={() => go("sobre")}>Sobre</a><a onClick={() => go("catalogo")}>Catálogo</a><a onClick={() => go("colecao")}>Coleção</a><a onClick={() => go("contato")}>Entrega</a></div>
          <button type="button" className="ib" onClick={() => setOpen(true)} aria-label="Abrir carrinho"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M5 7h14l-1.2 12H6.2zM9 7a3 3 0 016 0" /></svg>{count > 0 && <i>{count}</i>}</button>
          <button type="button" className="ib burger" aria-label="Menu" onClick={() => setMenu((v) => !v)}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M4 8h16M4 16h16" /></svg></button>
        </div>
        {menu && <div className="mob"><a onClick={() => go("sobre")}>Sobre</a><a onClick={() => go("catalogo")}>Catálogo</a><a onClick={() => go("colecao")}>Coleção</a><a onClick={() => go("contato")}>Entrega</a></div>}
        <h1 className="big dg">{word}<small>móveis</small></h1>
        <div className="cards">
          {[[1, "Dana"], [4, "Cresta"], [5, "Terra"]].map(([i, n]) => (<button type="button" key={n} className="mc" onClick={() => add(i as number)}><img src={ITEMS[i as number]!.img} alt={String(n)} /><b>novo</b>{n}</button>))}
        </div>
        <div className="hb">Móveis simples<br />para uma vida macia · {city}</div>
        <div className="hb2"><button type="button" className="btn" onClick={() => go("catalogo")}>Ver mais modelos</button></div>
      </div>

      <div className="wrap" id="sobre">
        <div className="intro"><h2 className="dg">Simplificando a vida com formas macias</h2><p>Criamos mais do que móveis. Criamos peças que tornam o dia mais leve, mais macio e mais confortável: poltronas, sofás e camas em que você quer se jogar. Tudo para você descansar de verdade.</p></div>
        <div className="sofa"><div><div className="im" style={{ borderRadius: 26, overflow: "hidden", height: 130 }}><img src="/movel-sof.webp" alt="Sofá curvo" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /></div><small>Explore as categorias mais procuradas do mês</small></div><h2 className="h2 dg">Conheça a coleção macia</h2></div>
        <div className="cats">
          {([["Poltronas", "/movel-arm.webp"], ["Cadeiras", "/movel-cad.webp"], ["Sofás", "/movel-sof.webp"]] as const).map(([c, img]) => (
            <div className="cc" key={c}><div className="im"><img src={img} alt={c} loading="lazy" /></div><div className="r">{c}<button type="button" onClick={() => { setCat(c); go("catalogo"); }}>Comprar →</button></div></div>
          ))}
        </div>

        <h2 className="h2 dg" id="catalogo" style={{ marginTop: 70 }}>Catálogo</h2>
        <div className="tabs">{TABS.map((c) => (<button key={c} type="button" className={`tab${cat === c ? " on" : ""}`} onClick={() => setCat(c)}>{c}</button>))}</div>
        <div className="gr">
          {ITEMS.map((it, i) => (cat === "Todos" || it.c === cat) && (
            <div className="pc" key={it.n}>
              <div className="im"><img src={it.img} alt={it.n} loading="lazy" />{it.tag && <b>{it.tag}</b>}</div>
              <h3>{it.n}</h3>
              <div className="row"><b>{brl(it.p)}</b><button type="button" className="ad" aria-label={`Adicionar ${it.n}`} onClick={() => add(i)}>{added === i ? "✓" : "+"}</button></div>
            </div>
          ))}
        </div>
      </div>

      <div className="dk" id="colecao">
        <div className="mqe" aria-hidden>{mq.repeat(4)}</div>
        <div className="wrap"><div className="col">
          <div className="im"><img src="/movel-rest.webp" alt="Pés descansando sobre poltrona verde" loading="lazy" /></div>
          <div><h3 className="dg">Sente. Deite. Descanse agora.</h3><p>Uma coleção feita com o designer Erick Lowe. Oito peças para relaxar, desacelerar e ficar à vontade, disponíveis para encomenda só aqui no site. Entrega em todo o Brasil.</p>
            <div className="tr">{[[1, "Dana"], [4, "Cresta"], [5, "Terra"]].map(([i, n]) => (<div key={n}><img src={ITEMS[i as number]!.img} alt={String(n)} loading="lazy" />{n}</div>))}</div></div>
        </div></div>
      </div>
      <div className="mqf" aria-hidden>{mq.repeat(4)}</div>

      <div className="wrap" style={{ paddingTop: 56 }}>
        <h2 className="h2 dg">Quem já descansa</h2>
        <div className="rv">
          {[["Renata Alves", "A poltrona é ainda mais macia ao vivo. Chegou embalada com cuidado e montada."], ["Paulo Mendes", "Atendimento rápido no WhatsApp e o sofá ficou exatamente como na foto."], ["Camila Torres", "Escolhi pelo site, a entrega veio em uma semana. Recomendo muito."]].map(([n, t]) => (<div key={n}><p>“{t}”</p><span>{n} · compra verificada</span></div>))}
        </div>
      </div>

      <footer id="contato" style={{ marginTop: 60 }}><div className="wrap"><div className="fg">
        <div><div style={{ display: "flex", alignItems: "center", gap: 12 }}><div className="lg">{brand[0]}</div><b style={{ color: CREAM, fontSize: 18 }}>{brand}</b></div><p style={{ lineHeight: 1.65, marginTop: 14 }}>Móveis simples para uma vida macia.<br />Rua da Bahia, 1200, Lourdes, {city}.<br />Seg a sáb, 9h às 19h.</p></div>
        <div><h5>Loja</h5><a onClick={() => go("catalogo")}>Catálogo</a><a onClick={() => go("colecao")}>Coleção</a><a onClick={() => setOpen(true)}>Carrinho</a></div>
        <div><h5>Ajuda</h5><a>Entrega e montagem</a><a>Trocas</a><a>Garantia</a></div>
        <div><h5>Contato</h5><a href={`https://wa.me/${num}?text=${encodeURIComponent("Oi! Tenho uma dúvida.")}`} target="_blank" rel="noreferrer">WhatsApp</a><a>Instagram</a></div>
      </div></div></footer>

      {sc && count === 0 && <button type="button" className="fl" onClick={() => go("catalogo")}>Ver catálogo</button>}
      {sc && count > 0 && <button type="button" className="fl" onClick={() => setOpen(true)}>Carrinho · {count} · {brl(total)}</button>}

      {open && (<>
        <div className="ov" onClick={() => setOpen(false)} />
        <aside className="dw" role="dialog" aria-label="Seu carrinho">
          <button type="button" className="x" aria-label="Fechar" onClick={() => setOpen(false)}>×</button>
          <h3>Seu carrinho</h3>
          <span style={{ color: MU, fontSize: 14 }}>{count === 0 ? "Nada por aqui ainda" : `${count} ${count === 1 ? "item" : "itens"}`}</span>
          {count === 0 ? (
            <div style={{ margin: "34px 0", textAlign: "center" }}><p style={{ color: MU }}>Escolha uma peça macia para começar.</p><button type="button" className="btn" onClick={() => { setOpen(false); go("catalogo"); }}>Ver catálogo</button></div>
          ) : (<>
            {bag.map((x, k) => (
              <div className="li" key={x.i}><img src={ITEMS[x.i]!.img} alt="" />
                <div style={{ flex: 1 }}><b style={{ fontSize: 15 }}>{ITEMS[x.i]!.n}</b><div style={{ fontWeight: 800 }}>{brl(ITEMS[x.i]!.p)}</div>
                  <div className="qn"><button type="button" aria-label="Menos" onClick={() => qty(k, -1)}>−</button><b>{x.q}</b><button type="button" aria-label="Mais" onClick={() => qty(k, 1)}>+</button></div></div>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", margin: "18px 0 4px", fontSize: 18, fontWeight: 800 }}><span>Total</span><span>{brl(total)}</span></div>
            <input className="f" placeholder="Seu nome" aria-label="Seu nome" value={name} onChange={(e) => setName(e.target.value)} />
            <a className="btn" href={wa} target="_blank" rel="noreferrer" style={{ display: "flex", justifyContent: "center", marginTop: 14 }}>Fechar compra no WhatsApp</a>
          </>)}
        </aside>
      </>)}
    </div>
  );
}
