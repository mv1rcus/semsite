import { useEffect, useState } from "react";

/** Pet shop autoral, construido a partir de um pin amarelo vivo com cachorro recortado, faixa diagonal de categorias coloridas e produtos em circulos. Carrinho que fecha no WhatsApp. */
const YEL = "#fbb12a", RED = "#e2262b", INK = "#2a2118", PAPER = "#fffaf0";
const CATS = [
  { n: "Cachorros", c: "#3fb86a", img: "/patas-pug.webp" },
  { n: "Gatos", c: "#e8731a", img: "/patas-gato.webp" },
  { n: "Aves", c: "#1f9bd1", img: "/patas-ave.webp" },
  { n: "Coelhos", c: "#2f6fe0", img: "/patas-coelho.webp" },
  { n: "Filhotes", c: "#8b57cf", img: "/patas-maltes.webp" },
  { n: "Acessórios", c: "#ef4e6a", img: "/patas-coleira.webp" },
];
const ITEMS = [
  { n: "Ração para cães adultos", p: 189, c: "#fde7a4", cat: "Cachorros", img: "/patas-racao.webp" },
  { n: "Coleira patinhas", p: 59, c: "#fbd0d0", cat: "Acessórios", img: "/patas-coleira.webp" },
  { n: "Bola de borracha colorida", p: 24, c: "#cfeaf8", cat: "Cachorros", img: "/patas-bola.webp" },
];
const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const Paw = ({ s = 44, c = RED }: { s?: number; c?: string }) => (<svg width={s} height={s} viewBox="0 0 48 48" fill={c} aria-hidden><ellipse cx="9" cy="21" rx="5" ry="7" transform="rotate(-20 9 21)" /><ellipse cx="19" cy="10" rx="5" ry="7.5" transform="rotate(-8 19 10)" /><ellipse cx="31" cy="10" rx="5" ry="7.5" transform="rotate(8 31 10)" /><ellipse cx="41" cy="21" rx="5" ry="7" transform="rotate(20 41 21)" /><path d="M24 22c-8 0-15 8-13 15 1.500 5 7 5 13 3 6 2 11.500 2 13-3 2-7-5-15-13-15z" /></svg>);

export function PatasFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Patas & Cores";
  const city = client?.city?.trim() || "Juiz de Fora";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [bag, setBag] = useState<{ i: number; q: number }[]>([]);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [name, setName] = useState("");
  const [added, setAdded] = useState<number | null>(null);
    const [sc, setSc] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 700); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const add = (i: number) => { setBag((b) => { const k = b.findIndex((x) => x.i === i); if (k >= 0) return b.map((x, j) => (j === k ? { ...x, q: x.q + 1 } : x)); return [...b, { i, q: 1 }]; }); setAdded(i); setTimeout(() => setAdded(null), 1200); };
  const qty = (k: number, d: number) => setBag((b) => b.map((x, j) => (j === k ? { ...x, q: x.q + d } : x)).filter((x) => x.q > 0));
  const count = bag.reduce((a, x) => a + x.q, 0);
  const total = bag.reduce((a, x) => a + x.q * ITEMS[x.i]!.p, 0);
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero comprar na ${brand}: ${bag.map((x) => `${x.q}x ${ITEMS[x.i]!.n}`).join(", ")}. Total ${brl(total)}.${name ? ` Em nome de ${name}.` : ""}`)}`;

  return (
    <div className="pf" style={{ fontFamily: "'Nunito', system-ui, sans-serif", color: INK, background: PAPER, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@500;700;800;900&display=swap');
        .pf *{box-sizing:border-box}.pf h1,.pf h2,.pf h3,.pf h4,.pf h5{font-family:inherit;text-transform:none}.pf a,.pf button{font-family:inherit}
        .pf .top{background:${RED};color:#fff;text-align:center;font-size:13px;font-weight:800;padding:8px 12px;letter-spacing:.02em}
        .pf .hero{position:relative;background:${YEL};overflow:hidden}
        .pf .bigpaw{position:absolute;left:34px;top:18px;z-index:2}.pf .nav{max-width:1180px;margin:0 auto;display:flex;align-items:center;gap:34px;padding:22px 28px}
        .pf .nav .m{display:flex;gap:6px;margin-left:auto;font-weight:800;font-size:15px}.pf .nav .m a{cursor:pointer;padding:10px 16px;border-radius:99px}.pf .nav .m a:first-child{background:${RED};color:#fff}
        .pf .wm{display:flex;align-items:center;gap:10px;font-weight:900;font-size:22px}
        .pf .ib{background:${INK};color:#fff;border:0;border-radius:99px;width:46px;height:46px;cursor:pointer;display:grid;place-items:center;position:relative}
        .pf .ib i{position:absolute;top:-5px;right:-5px;background:${RED};font-style:normal;font-size:11px;font-weight:900;min-width:19px;height:19px;border-radius:99px;display:grid;place-items:center}
        .pf .burger{display:none}
        .pf .hg{max-width:1180px;margin:0 auto;padding:10px 28px 0;display:grid;grid-template-columns:1.1fr 1fr;align-items:center;min-height:430px}
        .pf .ht{padding-left:30px}.pf .hg h1{color:#fff;text-shadow:0 2px 0 rgba(0,0,0,.08);text-wrap:balance;font-size:clamp(34px,4.4vw,56px);line-height:1.04;font-weight:900;margin:0 0 18px;letter-spacing:-.02em}
        .pf .hg p{color:#fff;font-size:18px;line-height:1.5;font-weight:500;max-width:430px;margin:0 0 26px}
        .pf .bt{background:${RED};color:#fff;border:0;border-radius:99px;padding:15px 30px;font-weight:900;font-size:15px;cursor:pointer;text-decoration:none;display:inline-block}
        .pf .bt.w{background:#fff;color:${INK};margin-left:10px}
        .pf .pug{position:relative;justify-self:start;align-self:end;width:min(100%,560px)}.pf .pug img{width:100%;display:block;margin-bottom:-6px}
        .pf .paw{display:none}
        .pf .bands{position:relative;display:grid;grid-template-columns:repeat(6,1fr);height:190px;overflow:hidden}
        .pf .bands>button{border:0;cursor:pointer;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.35);position:relative;overflow:hidden;display:flex;align-items:flex-end;justify-content:center;padding:0 0 16px;font-weight:900;font-size:16px;clip-path:polygon(18% 0,100% 0,82% 100%,0 100%);margin-left:-3%}
        .pf .bands>button:first-child{clip-path:polygon(0 0,100% 0,82% 100%,0 100%);margin-left:0}.pf .bands>button:last-child{clip-path:polygon(18% 0,100% 0,100% 100%,0 100%)}
        .pf .bands img{position:absolute;left:50%;bottom:44px;height:110px;width:auto;max-width:62%;object-fit:contain;transform:translateX(-50%)}
        .pf .bands span.e{position:absolute;left:50%;top:26px;transform:translateX(-50%);font-size:44px}
        .pf .wrap{max-width:1180px;margin:0 auto;padding:0 28px}
        .pf .h2{text-align:center;font-weight:800;text-wrap:balance;font-size:clamp(26px,3.2vw,38px);margin:0 0 26px}
        .pf .tabs{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-bottom:34px}
        .pf .tab{border:2px solid ${INK};background:none;border-radius:99px;padding:9px 20px;font-weight:800;font-size:14.5px;cursor:pointer;color:${INK}}.pf .tab.on{background:${INK};color:${YEL}}
        .pf .gr{display:grid;grid-template-columns:repeat(3,1fr);gap:34px 20px;max-width:900px;margin:0 auto}
        .pf .pc{text-align:center;position:relative}
        .pf .pc .ci{width:min(100%,220px);aspect-ratio:1;border-radius:50%;margin:0 auto;display:grid;place-items:center;position:relative}.pf .pc .ci img{width:72%;height:72%;object-fit:contain}
        .pf .pc .pr{position:absolute;right:calc(50% - 118px);top:0;background:#3fb86a;color:#fff;width:62px;height:62px;border-radius:50%;display:grid;place-items:center;font-weight:900;font-size:15px;transform:rotate(8deg)}
        .pf .pc h3{font-size:15px;font-weight:500;margin:14px 0 10px;min-height:42px;text-wrap:balance}
        .pf .pc button{background:${RED};color:#fff;border:0;border-radius:99px;padding:11px 24px;font-weight:900;font-size:14px;cursor:pointer}
        .pf .cta{background:#1b8fc4!important;position:relative;margin-top:110px;background:#26b6ea;color:#fff;display:flex;align-items:center;justify-content:center;gap:24px;flex-wrap:wrap;padding:26px 20px;font-weight:900;font-size:22px}
        .pf .cta a{background:#fff;color:${INK};border-radius:99px;padding:12px 26px;font-size:14px;text-decoration:none}
        .pf .ctc{position:absolute;left:6%;bottom:0;height:240px}.pf .ctp{position:absolute;right:6%;bottom:0;height:210px}.pf .mos{display:grid;grid-template-columns:repeat(4,1fr)}
        .pf .mos>div{padding:34px 26px;color:#fff;min-height:300px;display:flex;flex-direction:column;justify-content:flex-end;position:relative;overflow:hidden}.pf .mos>div img{position:absolute;right:10px;top:18px;height:46%;max-width:60%;object-fit:contain}
        .pf .mos h4{margin:0 0 6px;font-size:20px;font-weight:500}.pf .mos p{margin:0;font-size:13.5px;line-height:1.5;font-weight:400}
        .pf footer{background:#fff;color:${INK};padding:50px 0 34px}
        .pf .fg{display:grid;grid-template-columns:1.4fr 1fr 1fr 1.3fr 1fr;gap:30px;font-size:14.5px}
        .pf .fg h5{margin:0 0 12px;color:${RED};font-size:14px;font-weight:900}.pf .fg a{display:block;margin:8px 0;cursor:pointer;color:${INK};text-decoration:none}
        .pf .fl{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:30;background:${RED};color:#fff;border:0;border-radius:99px;padding:15px 26px;font-weight:900;font-size:15px;cursor:pointer;box-shadow:0 10px 30px rgba(0,0,0,.25)}
        .pf .ov{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:40}
        .pf .dw{position:fixed;top:0;right:0;bottom:0;width:min(400px,100%);background:${PAPER};z-index:41;padding:26px;overflow:auto}
        .pf .dw h3{font-weight:900;font-size:26px;margin:0 0 4px}.pf .dw .x{position:absolute;top:14px;right:18px;background:none;border:0;font-size:30px;cursor:pointer}
        .pf .li{display:flex;gap:12px;padding:14px 0;border-bottom:1px solid rgba(0,0,0,.14);align-items:center}.pf .li .th{width:56px;height:56px;border-radius:50%;display:grid;place-items:center}.pf .li .th img{width:70%;height:70%;object-fit:contain}
        .pf .qn{display:inline-flex;align-items:center;gap:10px;margin-top:6px}.pf .qn button{width:32px;height:32px;border-radius:99px;border:2px solid ${INK};background:none;font-size:18px;cursor:pointer}
        .pf input.f{width:100%;margin-top:14px;padding:14px 16px;border:2px solid ${INK};border-radius:14px;font-size:15px;background:#fff}
        .pf .mob{display:none}
        @media(max-width:900px){
          .pf .nav{padding:16px}.pf .nav .m{display:none}.pf .burger{display:grid;margin-left:auto}
          .pf .hg{grid-template-columns:1fr;padding:6px 20px 0;min-height:0}.pf .ht{padding-left:0;order:-1}.pf .ctc{height:90px;left:2%}.pf .ctp{height:80px;right:2%}.pf .cta{padding-top:50px;margin-top:70px}.pf .bigpaw{display:none}.pf .wm{margin-left:0!important}.pf .hg p{font-size:16.5px}.pf .pug{justify-self:center;margin-top:10px;width:100%}.pf .paw{display:none}
          .pf .bands{grid-template-columns:repeat(3,1fr);height:auto}.pf .bands>button{height:150px;clip-path:none!important;margin:0!important}.pf .bands img{height:84px;bottom:38px}.pf .bands span.e{font-size:36px}
          .pf .gr{grid-template-columns:repeat(3,1fr);gap:16px 8px}.pf .pc .pr{right:-4%;width:42px;height:42px;font-size:11px}.pf .pc button{padding:9px 14px;font-size:12px}.pf .pc h3{font-size:12.5px;min-height:34px}
          .pf .mos{grid-template-columns:1fr 1fr}.pf .mos>div{min-height:230px;padding:20px 16px}.pf .fg{grid-template-columns:1fr 1fr}.pf .wrap{padding:0 16px}
          .pf .mob{display:block;background:#fff;border-radius:16px;margin:0 16px 10px}.pf .mob a{display:block;padding:14px 20px;font-weight:800;cursor:pointer}
        }
      `}</style>
      <div className="top">Frete grátis em compras acima de R$ 150 · {city}</div>
      <div className="hero"><span className="bigpaw"><Paw s={74} /></span>
        <div className="nav">
          <div className="wm" style={{ marginLeft: 70 }}>{brand}</div>
          <div className="m"><a onClick={() => go("catalogo")}>Início</a><a onClick={() => go("cats")}>Categorias</a><a onClick={() => go("catalogo")}>Ofertas</a><a onClick={() => go("contato")}>Contato</a></div>
          <button type="button" className="ib burger" aria-label="Menu" onClick={() => setMenu((v) => !v)}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg></button>
          <button type="button" className="ib" aria-label="Carrinho" onClick={() => setOpen(true)}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinejoin="round"><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>{count > 0 && <i>{count}</i>}</button>
        </div>
        {menu && <div className="mob"><a onClick={() => go("catalogo")}>Ofertas</a><a onClick={() => go("cats")}>Categorias</a><a onClick={() => go("contato")}>Contato</a></div>}
        <div className="hg">
          <div className="pug"><span className="paw"><Paw s={92} /></span><img src="/patas-pug.webp" alt="Pug deitado olhando para a câmera" /></div>
          <div className="ht"><h1>Onde seu pet gosta de fazer compras.</h1><p>Mais de 2.000 produtos para você escolher, e eles vão aprovar com o focinho. Feche o pedido pelo WhatsApp.</p>
            <button type="button" className="bt" onClick={() => go("catalogo")}>Ver ofertas</button><button type="button" className="bt w" onClick={() => go("cats")}>Categorias</button></div>
        </div>
        <div className="bands" id="cats">
          {CATS.map((c) => (<button key={c.n} type="button" style={{ background: c.c }} onClick={() => go("catalogo")}>
            <img src={c.img} alt="" loading="lazy" />{c.n}</button>))}
        </div>
      </div>

      <div className="wrap" style={{ paddingTop: 64 }}>
        <h2 className="h2" id="catalogo">Produtos em destaque</h2>
        <div className="gr">
          {ITEMS.map((it, i) => (
            <div className="pc" key={it.n}>
              <div className="ci" style={{ background: it.c }}><img src={it.img} alt={it.n} loading="lazy" /><span className="pr">{brl(it.p)}</span></div>
              <h3>{it.n}</h3>
              <button type="button" onClick={() => add(i)}>{added === i ? "Adicionado ✓" : "Adicionar"}</button>
            </div>
          ))}
        </div>
      </div>

      <div className="cta"><img className="ctc" src="/patas-gato.webp" alt="" /><img className="ctp" src="/patas-ave.webp" alt="" />Fale com a gente e monte o kit do seu pet <a href={`https://wa.me/${num}?text=${encodeURIComponent("Oi! Quero ajuda para montar um kit para o meu pet.")}`} target="_blank" rel="noreferrer">Chamar no WhatsApp</a></div>
      <div className="mos">
        {[["Banho e tosa", "Agende pelo WhatsApp, atendemos de terça a sábado.", "#e8731a", "/patas-maltes.webp"], ["Ração por assinatura", "Receba todo mês sem esquecer, com 8% de desconto.", "#2e9e58", "/patas-racao.webp"], ["Entrega no mesmo dia", `Para toda ${city} nos pedidos até as 15h.`, "#7a46bf", "/patas-bola.webp"], ["Depoimentos", "“A Mel adorou a ração nova e a entrega chegou no mesmo dia. Já virei cliente.” Carla, Juiz de Fora.", "#e8475f", "/patas-coelho.webp"]].map(([t, d, c, im]) => (<div key={t} style={{ background: c }}>{im && <img src={im} alt="" loading="lazy" />}<h4>{t}</h4><p>{d}</p></div>))}
      </div>

      <footer id="contato"><div className="wrap"><div className="fg">
        <div><div className="wm"><Paw s={30} />{brand}</div><p style={{ lineHeight: 1.65, marginTop: 14 }}>Pet shop completo.<br />Av. Rio Branco, 2100, Centro, {city}.<br />Seg a sáb, 8h às 19h.</p></div>
        <div><h5>Loja</h5><a onClick={() => go("catalogo")}>Ofertas</a><a onClick={() => go("cats")}>Categorias</a><a onClick={() => setOpen(true)}>Carrinho</a></div>
        <div><h5>Ajuda</h5><a>Entrega</a><a>Trocas</a><a>Banho e tosa</a></div>
        <div><h5>Novidades</h5><form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", gap: 6 }}><input aria-label="Seu e-mail" placeholder="Seu e-mail" style={{ flex: 1, minWidth: 0, padding: "10px 12px", border: 0, borderRadius: 8, fontSize: 13, background: "#f1ece2", color: INK }} /><button type="submit" style={{ background: RED, color: "#fff", border: 0, borderRadius: 8, padding: "0 14px", fontWeight: 800, fontSize: 12.5, cursor: "pointer" }}>Assinar</button></form></div>
        <div><h5>Contato</h5><a href={`https://wa.me/${num}?text=${encodeURIComponent("Oi! Tenho uma dúvida.")}`} target="_blank" rel="noreferrer">WhatsApp</a><a>Instagram</a></div>
      </div></div></footer>

      {sc && count === 0 && <button type="button" className="fl" onClick={() => go("catalogo")}>Ver ofertas</button>}
      {sc && count > 0 && <button type="button" className="fl" onClick={() => setOpen(true)}>Carrinho · {count} · {brl(total)}</button>}

      {open && (<>
        <div className="ov" onClick={() => setOpen(false)} />
        <aside className="dw" role="dialog" aria-label="Seu carrinho">
          <button type="button" className="x" aria-label="Fechar" onClick={() => setOpen(false)}>×</button>
          <h3>Seu carrinho</h3>
          <span style={{ opacity: .7, fontSize: 14 }}>{count === 0 ? "Nada por aqui ainda" : `${count} ${count === 1 ? "item" : "itens"}`}</span>
          {count === 0 ? (
            <div style={{ margin: "34px 0", textAlign: "center" }}><p style={{ opacity: .7 }}>Escolha algo para o seu pet.</p><button type="button" className="bt" onClick={() => { setOpen(false); go("catalogo"); }}>Ver ofertas</button></div>
          ) : (<>
            {bag.map((x, k) => (
              <div className="li" key={x.i}><div className="th" style={{ background: ITEMS[x.i]!.c }}><img src={ITEMS[x.i]!.img} alt="" /></div>
                <div style={{ flex: 1 }}><b style={{ fontSize: 15 }}>{ITEMS[x.i]!.n}</b><div style={{ fontWeight: 900 }}>{brl(ITEMS[x.i]!.p)}</div>
                  <div className="qn"><button type="button" aria-label="Menos" onClick={() => qty(k, -1)}>−</button><b>{x.q}</b><button type="button" aria-label="Mais" onClick={() => qty(k, 1)}>+</button></div></div>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", margin: "18px 0 4px", fontSize: 18, fontWeight: 900 }}><span>Total</span><span>{brl(total)}</span></div>
            <input className="f" placeholder="Seu nome" aria-label="Seu nome" value={name} onChange={(e) => setName(e.target.value)} />
            <a className="bt" href={wa} target="_blank" rel="noreferrer" style={{ display: "flex", justifyContent: "center", marginTop: 14 }}>Fechar compra no WhatsApp</a>
          </>)}
        </aside>
      </>)}
    </div>
  );
}
