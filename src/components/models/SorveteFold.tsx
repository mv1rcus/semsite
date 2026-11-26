import { useEffect, useState } from "react";

/** Sorveteria artesanal autoral, construida a partir de um pin rosa em bento (cards arredondados, fotos de morango, picoles). Escolhe sabor e formato e fecha no WhatsApp. */
const INK = "#2b0f12", RO = "#b01f4d", WIN = "#a8194b", CR = "#fff1ea";
const FL = [
  { n: "Morango com Pistache", p: 14, img: "/sorv-hero.webp", t: "Cremoso, com pedaços de fruta" },
  { n: "Framboesa Intensa", p: 12, img: "/sorv-pop1.webp", t: "Picolé de fruta, sem corante" },
  { n: "Pistache Verde", p: 13, img: "/sorv-pop2.webp", t: "Picolé crocante de pistache" },
  { n: "Creme de Baunilha", p: 11, img: "/sorv-van.webp", t: "Baunilha de vagem, bem leve" },
];
const FMT: [string, number][] = [["Copo", 0], ["Casquinha", 2], ["Pote 500ml", 24]];
const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function SorveteFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Doce Pomar";
  const city = client?.city?.trim() || "Curitiba";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [bag, setBag] = useState<{ i: number; f: number; q: number }[]>([]);
  const [fm, setFm] = useState<Record<number, number>>({});
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [name, setName] = useState("");
  const [added, setAdded] = useState<number | null>(null);
  const [sc, setSc] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 700); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const price = (i: number, f: number) => FL[i]!.p + FMT[f]![1];
  const add = (i: number) => { const f = fm[i] ?? 0; setBag((b) => { const k = b.findIndex((x) => x.i === i && x.f === f); if (k >= 0) return b.map((x, j) => (j === k ? { ...x, q: x.q + 1 } : x)); return [...b, { i, f, q: 1 }]; }); setAdded(i); setTimeout(() => setAdded(null), 1200); };
  const qty = (k: number, d: number) => setBag((b) => b.map((x, j) => (j === k ? { ...x, q: x.q + d } : x)).filter((x) => x.q > 0));
  const count = bag.reduce((a, x) => a + x.q, 0);
  const total = bag.reduce((a, x) => a + x.q * price(x.i, x.f), 0);
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero pedir na ${brand}: ${bag.map((x) => `${x.q}x ${FL[x.i]!.n} (${FMT[x.f]![0]})`).join(", ")}. Total ${brl(total)}.${name ? ` Em nome de ${name}.` : ""}`)}`;

  return (
    <div className="so" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: INK, background: `linear-gradient(120deg, ${CR} 0%, #fde3dc 55%, #f3c9d8 100%)`, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=DM+Sans:wght@400;500;700&family=Caveat:wght@600&display=swap');
        .so *{box-sizing:border-box}.so a,.so button,.so input{font-family:inherit}
        .so .wrap{max-width:1180px;margin:0 auto;padding:0 24px}
        .so .bg{font-family:'Bricolage Grotesque',system-ui,sans-serif;font-weight:800;letter-spacing:-.03em;line-height:.95}
        .so .sc{font-family:Caveat,cursive;font-weight:600;color:#b0306a;font-size:28px}
        .so .nav{display:flex;align-items:center;justify-content:space-between;height:72px}
        .so .logo{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:21px;letter-spacing:-.02em;display:flex;align-items:center;gap:8px}
        .so .nav .m{display:flex;gap:32px;font-size:15.5px;font-weight:500}.so .nav a{cursor:pointer}
        .so .bagb{position:relative;background:none;border:0;color:${INK};cursor:pointer;min-height:44px;min-width:44px;font-size:14px;font-weight:700;display:flex;align-items:center;gap:6px}
        .so .bagb i{font-style:normal;background:${RO};color:#fff;border-radius:99px;font-size:11px;min-width:20px;height:20px;display:grid;place-items:center}
        .so .burger{display:none;background:none;border:0;width:44px;height:44px;cursor:pointer}
        .so .card{border-radius:28px;overflow:hidden;position:relative}
        .so .card img{width:100%;height:100%;object-fit:cover;display:block}
        .so .tag{position:absolute;left:14px;bottom:14px;background:rgba(255,255,255,.78);backdrop-filter:blur(8px);border-radius:14px;padding:9px 16px;font-size:14px;line-height:1.3}
        .so .tag em{font-family:Caveat,cursive;font-style:normal;font-size:23px;color:#b0306a;display:block;line-height:1}
        .so .b1{display:grid;grid-template-columns:1fr 1.25fr;gap:18px;margin-top:6px}
        .so .b1 .ph{min-height:560px}
        .so .intro{background:rgba(255,255,255,.62);padding:34px 36px}
        .so .intro h1{font-size:clamp(52px,7.4vw,92px);margin:6px 0 16px}.so .intro h1 b{color:${RO}}
        .so .intro p{font-size:16px;line-height:1.6;margin:0 0 20px;max-width:440px}
        .so .btn{background:${RO};color:#fff;border:0;border-radius:99px;padding:0 26px;min-height:48px;font-size:15px;font-weight:700;cursor:pointer}
        .so .btn.o{background:none;color:${INK};border:1.5px solid ${INK}}
        .so .st{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:18px}
        .so .st div{border-radius:24px;padding:20px 22px;min-height:150px;display:flex;flex-direction:column;justify-content:space-between}
        .so .st b{font-family:"Bricolage Grotesque",sans-serif;font-size:58px;letter-spacing:-.03em;line-height:1}.so .st span{font-size:14.5px;font-weight:700}
        .so .rt{display:grid;grid-template-rows:auto 1fr}
        .so .b2{display:grid;grid-template-columns:1fr 1.35fr;gap:18px;margin-top:18px}.so .b2 .card{min-height:300px}
        .so .chips{position:absolute;left:14px;right:14px;bottom:14px;background:rgba(255,255,255,.8);backdrop-filter:blur(8px);border-radius:18px;padding:12px 16px;display:flex;flex-wrap:wrap;gap:8px;align-items:center;font-size:14px}
        .so .chips span.c{border:1px solid rgba(43,15,18,.35);border-radius:99px;padding:4px 14px}
        .so .b3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px;margin-top:18px}.so .b3 .card{min-height:340px}
        .so .win{background:${WIN};color:#fff;padding:30px 28px;display:flex;flex-direction:column;justify-content:space-between}
        .so .win h3{font-size:clamp(32px,3.4vw,42px);margin:8px 0 0;line-height:1.08}
        .so .win .sc{color:#ffc3d6}
        .so .sec{padding:84px 0 20px}
        .so .head{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;flex-wrap:wrap;margin-bottom:26px}
        .so .head h2{font-size:clamp(38px,5vw,60px);margin:0}
        .so .gr{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}
        .so .pc{background:rgba(255,255,255,.7);border-radius:26px;padding:12px 12px 18px}
        .so .pc .im{border-radius:18px;overflow:hidden;aspect-ratio:1;background:#f7d3dc}.so .pc .im img{width:100%;height:100%;object-fit:cover}
        .so .pc h3{font-family:'Bricolage Grotesque',sans-serif;font-size:19px;margin:14px 6px 2px;line-height:1.15}
        .so .pc p{margin:0 6px 10px;font-size:14.5px;color:#6b3a42;line-height:1.4}
        .so .pc .pr{margin:0 6px 10px;font-weight:700;font-size:17px;color:${RO}}
        .so .fm{display:flex;flex-wrap:wrap;gap:6px;margin:0 6px 12px}.so .fm button{border:1.5px solid rgba(43,15,18,.3);background:none;border-radius:99px;min-height:40px;padding:0 13px;font-size:14px;font-weight:600;cursor:pointer;color:${INK}}
        .so .fm button.on{background:${INK};color:#fff;border-color:${INK}}
        .so .ad{margin:0 6px;width:calc(100% - 12px);background:${RO};color:#fff;border:0;border-radius:99px;min-height:44px;font-weight:700;font-size:14.5px;cursor:pointer}
        .so .box{display:grid;grid-template-columns:1fr 1fr;gap:18px;align-items:stretch}
        .so .box .card{min-height:380px}
        .so .box .tx{background:#fadde6;padding:44px 40px;display:flex;flex-direction:column;justify-content:center;gap:16px}
        .so .box .tx h2{font-size:clamp(34px,4.4vw,52px);margin:0}.so .box .tx p{margin:0;font-size:16.5px;line-height:1.65;max-width:460px}
        .so footer{margin-top:84px;padding:40px 0 34px;border-top:1px solid rgba(43,15,18,.15)}
        .so .fg{display:grid;grid-template-columns:1.6fr 1fr 1fr 1fr;gap:30px;font-size:16px}
        .so .fg h5{font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${RO};margin:0 0 12px}.so .fg a{display:block;padding:5px 0;cursor:pointer}
        .so .fl{position:fixed;left:50%;transform:translateX(-50%);bottom:20px;z-index:30;background:${RO};color:#fff;border:0;border-radius:99px;min-height:50px;padding:0 26px;font-weight:700;font-size:15px;box-shadow:0 10px 30px rgba(176,31,77,.35);cursor:pointer}
        .so .ov{position:fixed;inset:0;background:rgba(43,15,18,.45);z-index:40}
        .so .dw{position:fixed;top:0;right:0;bottom:0;width:min(420px,100%);background:${CR};z-index:41;padding:26px 24px;overflow:auto}
        .so .dw h3{font-family:'Bricolage Grotesque',sans-serif;font-size:30px;margin:0 0 4px}
        .so .x{position:absolute;top:14px;right:14px;width:44px;height:44px;border:0;background:none;font-size:28px;cursor:pointer;color:${INK}}
        .so .li{display:flex;gap:12px;padding:14px 0;border-bottom:1px solid rgba(43,15,18,.12)}.so .li img{width:60px;height:60px;border-radius:12px;object-fit:cover}
        .so .qn{display:inline-flex;align-items:center;gap:8px;margin-top:6px}.so .qn button{width:34px;height:34px;border-radius:99px;border:1px solid rgba(43,15,18,.3);background:none;font-size:18px;cursor:pointer}
        .so input.f{width:100%;margin-top:14px;padding:14px 16px;border:1.5px solid rgba(43,15,18,.25);border-radius:14px;font-size:15px;background:#fff}
        .so .mob{display:none}
        @media(max-width:860px){
          .so .nav .m{display:none}.so .burger{display:block}.so .nav{height:64px}
          .so .b1,.so .b2,.so .box{grid-template-columns:1fr}.so .b1 .ph{min-height:420px}.so .intro{padding:26px 22px}
          .so .st b{font-size:40px}.so .st div{padding:16px;min-height:120px}
          .so .b3{grid-template-columns:1fr}.so .b3 .card{min-height:300px}
          .so .gr{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.so .pc{padding:9px 9px 14px}.so .pc h3{font-size:16px}
          .so .box .tx{padding:30px 24px}.so .sec{padding:60px 0 10px}.so .fg{grid-template-columns:1fr 1fr}.so .wrap{padding:0 16px}
          .so .mob{display:block;background:rgba(255,255,255,.7);border-radius:18px;margin-bottom:8px}.so .mob a{display:block;padding:14px 20px;font-size:15px;font-weight:500;cursor:pointer}
        }
      `}</style>

      <div className="wrap">
        <div className="nav">
          <div className="logo"><svg width="22" height="26" viewBox="0 0 22 26" fill="none" stroke={INK} strokeWidth="1.8" aria-hidden><path d="M3 10a8 8 0 0116 0z" fill="#f6b7cb" /><path d="M3 10l8 15 8-15" /></svg>{brand}</div>
          <div className="m"><a onClick={() => go("sabores")}>Sabores</a><a onClick={() => go("historia")}>Nossa história</a><a onClick={() => go("contato")}>Loja</a></div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button type="button" className="bagb" onClick={() => setOpen(true)} aria-label="Abrir pedido">Pedido{count > 0 && <i>{count}</i>}</button>
            <button type="button" className="burger" aria-label="Menu" onClick={() => setMenu((m) => !m)}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="1.8"><path d="M4 8h16M4 16h16" /></svg></button>
          </div>
        </div>
        {menu && <div className="mob"><a onClick={() => go("sabores")}>Sabores</a><a onClick={() => go("historia")}>Nossa história</a><a onClick={() => go("contato")}>Loja</a></div>}

        <div className="b1">
          <div className="card ph"><img src="/sorv-hero.webp" alt="Taça de sorvete de morango com chantilly e pistache" /><div className="tag"><em>Sabor do mês</em>Morango com pistache, nº 01</div></div>
          <div className="rt">
            <div className="card intro">
              <span className="sc">Fruta, creme e rosa</span>
              <h1 className="bg">Morango<br /><b>de verdade.</b></h1>
              <p>Sorvete artesanal feito todas as manhãs com fruta de produtor local, em {city}. Sem corante, sem atalho.</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}><button type="button" className="btn" onClick={() => go("sabores")}>Ver sabores</button><button type="button" className="btn o" onClick={() => setOpen(true)}>Meu pedido</button></div>
            </div>
            <div className="st">
              <div style={{ background: "#f3efc4" }}><b>100%</b><span>fruta de verdade</span></div>
              <div style={{ background: "#f4c3de" }}><b>0</b><span>corantes artificiais</span></div>
              <div style={{ background: "#fdd5b8" }}><b>12h</b><span>de maturação lenta</span></div>
            </div>
          </div>
        </div>

        <div className="b2">
          <div className="card"><img src="/sorv-m2.webp" alt="Bola de sorvete de morango com pedaços de fruta" loading="lazy" /><div className="tag"><em>Pedaços de morango</em>Em cada bola</div></div>
          <div className="card"><img src="/sorv-p1.webp" alt="Morangos, leite, creme, baunilha e pistache sobre mármore" loading="lazy" /><div className="chips"><b>Lá dentro:</b>{["Morango", "Leite", "Creme", "Baunilha", "Pistache"].map((c) => (<span className="c" key={c}>{c}</span>))}</div></div>
        </div>

        <div className="b3" id="historia">
          <div className="card"><img src="/sorv-p2.webp" alt="Cesta de morangos colhidos em plantação ao nascer do sol" loading="lazy" /><div className="tag"><em>Da roça</em>Colhido ao nascer do sol</div></div>
          <div className="card win"><div><span className="sc">Promessa fresca</span><h3 className="bg">Colhido de manhã, batido no mesmo dia.</h3></div><div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{["Produtores locais", "Lotes pequenos"].map((c) => (<span key={c} style={{ background: "rgba(255,255,255,.18)", borderRadius: 99, padding: "5px 14px", fontSize: 12.5 }}>{c}</span>))}</div></div>
          <div className="card"><img src="/sorv-p3.webp" alt="Mão segurando copo rosa com duas bolas de sorvete de morango" loading="lazy" /><div className="tag"><em>Para levar</em>Copo de morango</div></div>
        </div>

        <section className="sec" id="sabores">
          <div className="head"><div><span className="sc">Monte seu pedido</span><h2 className="bg">Os sabores</h2></div><p style={{ margin: 0, maxWidth: 340, fontSize: 15, lineHeight: 1.55 }}>Escolha o sabor e o formato. O pedido fecha no WhatsApp, e a gente separa para você retirar.</p></div>
          <div className="gr">
            {FL.map((it, i) => (
              <div className="pc" key={it.n}>
                <div className="im"><img src={it.img} alt={it.n} loading="lazy" /></div>
                <h3>{it.n}</h3><p>{it.t}</p><div className="pr">{brl(price(i, fm[i] ?? 0))}</div>
                <div className="fm" role="group" aria-label="Formato">{FMT.map(([f], k) => (<button key={f} type="button" className={(fm[i] ?? 0) === k ? "on" : ""} onClick={() => setFm((z) => ({ ...z, [i]: k }))}>{f}</button>))}</div>
                <button type="button" className="ad" onClick={() => add(i)}>{added === i ? "No pedido ✓" : "Adicionar"}</button>
              </div>
            ))}
          </div>
        </section>

        <section className="sec">
          <div className="box">
            <div className="card tx"><span className="sc">Para dividir</span><h2 className="bg">Monte sua caixa.</h2><p>Escolha quatro sabores em potes de 500ml e leve para a mesa. Encomende até as 16h e retire no mesmo dia.</p><div><button type="button" className="btn" onClick={() => go("sabores")}>Escolher sabores</button></div></div>
            <div className="card"><img src="/sorv-box.webp" alt="Caixa com quatro potes de sorvete" loading="lazy" /></div>
          </div>
        </section>

        <footer id="contato"><div className="fg">
          <div><div className="logo">{brand}</div><p style={{ lineHeight: 1.65, marginTop: 12 }}>Doces momentos, feitos de fruta de verdade.<br />Rua XV de Novembro, 410, Centro, {city}.<br />Todos os dias, 12h às 22h.</p></div>
          <div><h5>Explorar</h5><a onClick={() => go("sabores")}>Sabores</a><a onClick={() => go("historia")}>Nossa história</a><a onClick={() => setOpen(true)}>Pedido</a></div>
          <div><h5>Siga</h5><a>Instagram</a><a>TikTok</a></div>
          <div><h5>Ajuda</h5><a href={`https://wa.me/${num}?text=${encodeURIComponent("Oi! Tenho uma dúvida.")}`} target="_blank" rel="noreferrer">WhatsApp</a><a>Retirada na loja</a></div>
        </div></footer>
      </div>

      {sc && count === 0 && <button type="button" className="fl" onClick={() => go("sabores")}>Ver sabores</button>}
      {sc && count > 0 && <button type="button" className="fl" onClick={() => setOpen(true)}>Pedido · {count} · {brl(total)}</button>}

      {open && (<>
        <div className="ov" onClick={() => setOpen(false)} />
        <aside className="dw" role="dialog" aria-label="Seu pedido">
          <button type="button" className="x" aria-label="Fechar" onClick={() => setOpen(false)}>×</button>
          <h3>Seu pedido</h3>
          <span style={{ color: "#6b3a42", fontSize: 14 }}>{count === 0 ? "Nada por aqui ainda" : `${count} ${count === 1 ? "item" : "itens"}`}</span>
          {count === 0 ? (
            <div style={{ margin: "34px 0", textAlign: "center" }}><p style={{ color: "#6b3a42" }}>Escolha um sabor e o formato para começar.</p><button type="button" className="btn" onClick={() => { setOpen(false); go("sabores"); }}>Ver sabores</button></div>
          ) : (<>
            {bag.map((x, k) => (
              <div className="li" key={`${x.i}-${x.f}`}><img src={FL[x.i]!.img} alt="" />
                <div style={{ flex: 1 }}><b style={{ fontSize: 14.5 }}>{FL[x.i]!.n}</b><div style={{ color: "#6b3a42", fontSize: 13.5 }}>{FMT[x.f]![0]}</div><div style={{ fontWeight: 700, color: RO }}>{brl(price(x.i, x.f))}</div>
                  <div className="qn"><button type="button" aria-label="Menos" onClick={() => qty(k, -1)}>−</button><b>{x.q}</b><button type="button" aria-label="Mais" onClick={() => qty(k, 1)}>+</button></div></div>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", margin: "18px 0 4px", fontSize: 18, fontWeight: 700 }}><span>Total</span><span>{brl(total)}</span></div>
            <input className="f" placeholder="Seu nome" aria-label="Seu nome" value={name} onChange={(e) => setName(e.target.value)} />
            <a className="btn" href={wa} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 14, textDecoration: "none" }}>Fechar pedido no WhatsApp</a>
          </>)}
        </aside>
      </>)}
    </div>
  );
}
