import { useEffect, useState } from "react";

/** Joalheria autoral nova, construida a partir de um pin minimalista taupe com colecao em linha. Cesta com gravacao opcional que fecha no WhatsApp. */
const GOLD = "#7d5526", INK = "#2b2420", BG = "#ece4dd", BG2 = "#f6f2ee", DK = "#d9ccc2";
const ITEMS = [
  { n: "Colar Fio Coração", p: 389, img: "/joia-p1.webp", c: "Colares" },
  { n: "Brincos Gota", p: 329, img: "/joia-p2.webp", c: "Brincos" },
  { n: "Bracelete Aberto", p: 459, img: "/joia-p3.webp", c: "Braceletes" },
  { n: "Argolas Finas", p: 279, img: "/joia-p4.webp", c: "Brincos" },
  { n: "Trio de Anéis", p: 349, img: "/joia-p5.webp", c: "Anéis" },
  { n: "Pingente Círculo", p: 419, img: "/joia-p6.webp", c: "Colares" },
];
const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const Mark = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.2" aria-hidden><path d="M12 2l3 6 6 1-4.500 4.500 1 6.500-5.500-3-5.500 3 1-6.500L3 9l6-1z" /></svg>);

export function JoiaFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Ateliê Seda";
  const city = client?.city?.trim() || "Belo Horizonte";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [cart, setCart] = useState<Record<number, number>>({});
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [engrave, setEngrave] = useState("");
  const [gift, setGift] = useState(false);
  const [name, setName] = useState("");
  const [added, setAdded] = useState<number | null>(null);
  const [filter, setFilter] = useState("Todas");
  const [sc, setSc] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const add = (i: number) => { setCart((c) => ({ ...c, [i]: (c[i] ?? 0) + 1 })); setAdded(i); setTimeout(() => setAdded(null), 1200); };
  const qty = (i: number, d: number) => setCart((c) => { const n = (c[i] ?? 0) + d; const o = { ...c }; if (n <= 0) delete o[i]; else o[i] = n; return o; });
  const items = Object.entries(cart).map(([k, q]) => ({ i: Number(k), q, it: ITEMS[Number(k)]! }));
  const count = items.reduce((a, x) => a + x.q, 0);
  const total = items.reduce((a, x) => a + x.q * x.it.p, 0);
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero comprar na ${brand}: ${items.map((x) => `${x.q}x ${x.it.n}`).join(", ")}. Total ${brl(total)}.${engrave ? ` Gravação: ${engrave}.` : ""}${gift ? " Embalagem de presente." : ""}${name ? ` Em nome de ${name}.` : ""}`)}`;
  const cats = ["Todas", "Colares", "Brincos", "Braceletes", "Anéis"];

  return (
    <div className="jo" style={{ fontFamily: "Jost, system-ui, sans-serif", color: INK, background: BG, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600&family=Gilda+Display&family=Cormorant+Garamond:wght@400;500&display=swap');
        .jo *{box-sizing:border-box}.jo a,.jo button{font-family:inherit}
        .jo .wrap{max-width:1180px;margin:0 auto;padding:0 28px}
        .jo .gd{font-family:'Gilda Display',Georgia,serif;font-weight:400}
        .jo .bar{position:sticky;top:0;z-index:30;background:rgba(236,228,221,.94);backdrop-filter:blur(8px);border-bottom:1px solid ${DK}}
        .jo .nav{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;height:84px}
        .jo .nav .l,.jo .nav .r{display:flex;gap:26px;font-size:11px;letter-spacing:2.2px;text-transform:uppercase;font-weight:500}.jo .nav .r{justify-content:flex-end;align-items:center}
        .jo .nav a{cursor:pointer}
        .jo .logo{font-family:'Cormorant Garamond','Gilda Display',serif;font-weight:500;font-size:27px;letter-spacing:2px;text-transform:uppercase;text-align:center;line-height:.98;display:flex;flex-direction:column;align-items:center;gap:0}
        .jo .burger{display:none;background:none;border:0;width:44px;height:44px;cursor:pointer}
        .jo .cartb{position:relative;background:none;border:0;cursor:pointer;min-width:44px;min-height:44px;display:grid;place-items:center}
        .jo .cartb b{position:absolute;right:2px;top:4px;min-width:19px;height:19px;border-radius:10px;background:${GOLD};color:#fff;font-size:11px;display:grid;place-items:center;padding:0 5px}
        .jo .btn{background:${INK};color:#fff;border:0;padding:0 34px;min-height:52px;font-size:13px;letter-spacing:3px;text-transform:uppercase;font-weight:500;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:10px;text-decoration:none}
        .jo .btn.o{background:transparent;color:${INK};border:1px solid ${INK}}
        .jo .btn.s{background:${DK};color:${INK};min-height:46px;padding:0 26px}
        .jo .hero{background:#f4ece8;max-width:none;padding:0}
        .jo .hg{max-width:1100px;margin:0 auto;padding:28px 40px 110px;display:grid;grid-template-columns:1fr 1.3fr;column-gap:60px;grid-template-areas:"ph tx" "pt im"}
        .jo .hg .ph{grid-area:ph}.jo .hg .ph img{width:100%;aspect-ratio:.68;object-fit:cover;object-position:35% 25%;display:block}
        .jo .hg .tx{grid-area:tx;align-self:center;font-family:'Cormorant Garamond',serif;font-size:clamp(26px,2.7vw,34px);line-height:1.22;color:#3a312b;padding-bottom:20px}
        .jo .hg .pt{grid-area:pt;align-self:center;font-family:'Cormorant Garamond',serif;font-size:18px;line-height:1.6;color:#3a312b;padding-top:24px}
        .jo .hg .pt p{margin:0 0 54px}
        .jo .hg .im{grid-area:im}.jo .hg .im img{width:100%;aspect-ratio:1.04;object-fit:cover;display:block}
        .jo .tg{display:inline-block;background:#e9dfd9;padding:11px 20px;border:1px solid #c9bbb2;font-size:10.5px;letter-spacing:2.5px;text-transform:uppercase;font-weight:500;cursor:pointer;color:#3a312b;font-family:Jost,sans-serif}
        .jo .hero2{display:flex;gap:12px;flex-wrap:wrap;margin-top:26px}
        .jo .sec{padding:100px 0}
        .jo .sec.w{background:${BG2}}.jo .sec+.sec{border-top:1px solid rgba(90,74,63,.14)}
        .jo h2{font-family:'Gilda Display',serif;font-weight:400;font-size:clamp(32px,3.6vw,46px);margin:0;text-align:center;letter-spacing:-.3px}
        .jo .sub{text-align:center;color:#554840;font-size:16px;margin:14px 0 0;font-weight:300}
        .jo .tabs{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin:36px 0 48px}
        .jo .tab{background:none;border:1px solid transparent;padding:0 18px;min-height:44px;font-size:13px;letter-spacing:2.5px;text-transform:uppercase;cursor:pointer;color:#6a5d55}
        .jo .tab.on{border-color:${INK};color:${INK}}
        .jo .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:56px 36px}
        .jo .pc{text-align:center}
        .jo .pc .im{position:relative;background:${BG};aspect-ratio:1;overflow:hidden}
        .jo .pc img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .6s}
        .jo .pc:hover img{transform:scale(1.04)}
        .jo .pc h3{font-family:'Gilda Display',serif;font-weight:400;font-size:22px;margin:22px 0 6px}
        .jo .pc .pr{font-size:17px;color:${GOLD};font-weight:500}
        .jo .pc .ad{margin-top:14px;background:none;border:0;border-bottom:1px solid ${INK};padding:8px 2px;font-size:12.5px;letter-spacing:3px;text-transform:uppercase;font-weight:500;cursor:pointer;min-height:44px}
        .jo .split{display:grid;grid-template-columns:1.1fr 1fr;gap:70px;align-items:center}
        .jo .split img{width:100%;height:480px;object-fit:cover;display:block}
        .jo .split h2{text-align:left}
        .jo .split p{font-size:17.5px;line-height:1.8;color:#3f342d;font-weight:300;margin:22px 0 32px;max-width:440px}
        .jo .vals{display:grid;grid-template-columns:repeat(3,1fr);gap:40px;text-align:center}
        .jo .vals svg{display:block;margin:0 auto}
        .jo .vals b{display:block;font-family:'Gilda Display',serif;font-weight:400;font-size:23px;margin:14px 0 8px}
        .jo .vals span{color:#5a4d45;font-size:15.5px;line-height:1.65;font-weight:300}
        .jo footer{background:${DK};padding:70px 0 40px}
        .jo .fg{display:grid;grid-template-columns:1.3fr 1fr 1fr 1.3fr;gap:44px}
        .jo footer h5{font-size:12.5px;letter-spacing:3px;text-transform:uppercase;margin:0 0 18px;font-weight:600}
        .jo footer a{display:block;cursor:pointer;font-size:15px;margin-bottom:11px;font-weight:300}
        .jo .nl{display:flex;background:#fff}.jo .nl input{flex:1;border:0;padding:0 14px;min-height:50px;font-size:14.5px;min-width:0;background:none}.jo .nl a{background:${INK};color:#fff;display:grid;place-items:center;padding:0 20px;margin:0;font-size:18px}
        .jo .fl{position:fixed;right:18px;bottom:18px;z-index:40;background:${INK};color:#fff;border:0;padding:0 24px;min-height:52px;font-size:12.5px;letter-spacing:2.5px;text-transform:uppercase;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,.25)}
        .jo .ov{position:fixed;inset:0;background:rgba(43,36,32,.5);z-index:60}
        .jo .dw{position:fixed;right:0;top:0;bottom:0;width:min(440px,100%);background:${BG2};z-index:61;padding:30px 28px;overflow:auto}
        .jo .dw h3{font-family:'Gilda Display',serif;font-size:30px;font-weight:400;margin:0 0 4px}
        .jo .x{position:absolute;right:12px;top:10px;width:44px;height:44px;border:0;background:none;font-size:28px;cursor:pointer}
        .jo .li{display:flex;gap:14px;align-items:center;padding:14px 0;border-bottom:1px solid ${DK}}
        .jo .li img{width:64px;height:64px;object-fit:cover}
        .jo .q{display:inline-flex;align-items:center;gap:10px;border:1px solid ${DK};padding:0 4px;margin-top:6px}.jo .q button{width:32px;height:32px;border:0;background:none;font-size:18px;cursor:pointer}
        .jo input.f{width:100%;margin-top:12px;padding:14px 16px;border:1px solid ${DK};font-size:15px;background:#fff}
        .jo .mob{display:none}
        @media(max-width:860px){
          .jo .nav .l,.jo .nav .r a{display:none}.jo .burger{display:block}.jo .nav{height:72px;grid-template-columns:44px 1fr auto}.jo .logo{font-size:24px}
          .jo .hg{grid-template-columns:1fr;grid-template-areas:"tx" "ph" "pt" "im";padding:20px 22px 60px;row-gap:26px}.jo .hg .tx{padding-bottom:0;font-size:26px}.jo .hg .pt{padding-top:0}.jo .hg .pt p{margin-bottom:22px}
          .jo .sec{padding:64px 0}.jo .grid{grid-template-columns:repeat(2,1fr);gap:36px 16px}.jo .pc h3{font-size:18px}
          .jo .split{grid-template-columns:1fr;gap:34px}.jo .split img{height:300px}.jo .vals{grid-template-columns:1fr;gap:30px}.jo .fg{grid-template-columns:1fr 1fr}
          .jo .mob{display:block;background:${BG2};border-bottom:1px solid ${DK}}.jo .mob a{display:block;padding:15px 24px;font-size:14px;letter-spacing:2.5px;text-transform:uppercase;cursor:pointer;border-top:1px solid ${DK}}
        }
      `}</style>
      <div className="bar">
        <div className="wrap nav">
          <nav className="l"><a onClick={() => go("colecao")}>Coleção</a><a onClick={() => go("atelie")}>Ateliê</a></nav>
          <button type="button" className="burger" aria-label="Menu" onClick={() => setMenu((m) => !m)}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="1.6"><path d="M4 8h16M4 16h16" /></svg></button>
          <div className="logo">{brand.split(" ").length > 1 ? (<><span>{brand.split(" ")[0]}</span><span>{brand.split(" ").slice(1).join(" ")}</span></>) : brand}</div>
          <div className="r"><a onClick={() => go("visita")}>Visite</a><a onClick={() => go("contato")}>Contato</a>
            <button type="button" className="cartb" aria-label="Abrir cesta" onClick={() => setOpen(true)}>
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round"><path d="M5 9h16l-1.500 13h-13zM9 9V7a4 4 0 0 1 8 0v2" /></svg>{count > 0 && <b>{count}</b>}</button></div>
        </div>
        {menu && <div className="mob"><a onClick={() => go("colecao")}>Coleção</a><a onClick={() => go("atelie")}>Ateliê</a><a onClick={() => go("visita")}>Visite</a><a onClick={() => go("contato")}>Contato</a></div>}
      </div>

      <div className="hero"><div className="hg">
        <div className="ph"><img src="/joia-hero.webp" alt="Mulher com joias de ouro delicadas" /></div>
        <h1 className="tx" style={{ margin: 0, fontWeight: 400 }}>Joias para quem quer se sentir bonita todos os dias. Peças autorais em ouro 18k e prata, feitas à mão em {city}.</h1>
        <div className="pt"><p>O {brand} cria peças únicas com técnicas tradicionais de ourivesaria e materiais sustentáveis. Cada peça é feita à mão, uma a uma.</p>
          <div className="hero2"><button type="button" className="tg" onClick={() => go("colecao")}>Ver coleção</button><button type="button" className="tg" onClick={() => setOpen(true)}>Minha cesta</button></div></div>
        <div className="im"><img src="/joia-proc.webp" alt="Ourives trabalhando um fio de ouro" /></div>
      </div></div>

      <section className="sec w" id="colecao"><div className="wrap">
        <h2>A coleção</h2><p className="sub">Peças finas para usar sozinhas ou em camadas.</p>
        <div className="tabs">{cats.map((c) => (<button key={c} type="button" className={`tab${filter === c ? " on" : ""}`} onClick={() => setFilter(c)}>{c}</button>))}</div>
        <div className="grid">
          {ITEMS.map((it, i) => (filter === "Todas" || it.c === filter) && (
            <div className="pc" key={it.n}>
              <div className="im"><img src={it.img} alt={it.n} loading="lazy" /></div>
              <h3>{it.n}</h3><div className="pr">{brl(it.p)}</div>
              <button type="button" className="ad" onClick={() => add(i)}>{added === i ? "Adicionada ✓" : "Adicionar à cesta"}</button>
            </div>
          ))}
        </div>
      </div></section>

      <section className="sec" id="atelie"><div className="wrap split">
        <img src="/joia-proc.webp" alt="Ourives trabalhando um fio de ouro" loading="lazy" />
        <div>
          <h2>Feito devagar, com as mãos.</h2>
          <p>Cada peça nasce no nosso ateliê em {city}. Modelamos o fio, polimos e conferimos uma a uma. Se quiser, gravamos um nome ou uma data na parte de dentro.</p>
          <button type="button" className="btn" onClick={() => setOpen(true)}>Encomendar com gravação</button>
        </div>
      </div></section>

      <section className="sec w"><div className="wrap vals">
        <div><Mark /><b>Ouro 18k e prata 950</b><span>Metais nobres, com certificado e garantia de um ano.</span></div>
        <div><Mark /><b>Gravação grátis</b><span>Nome, data ou uma frase curta, sem custo extra.</span></div>
        <div><Mark /><b>Embalagem de presente</b><span>Caixa e cartão escrito à mão, prontos para entregar.</span></div>
      </div></section>

      <section className="sec" id="visita"><div className="wrap" style={{ textAlign: "center" }}>
        <h2>Venha conhecer</h2>
        <p className="sub" style={{ maxWidth: 520, margin: "16px auto 30px" }}>Atendimento com hora marcada no ateliê, rua da Bahia, 1120, Lourdes, {city}. Ter a sáb, 10h às 19h.</p>
        <a className="btn" href={`https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero marcar uma visita na ${brand}.`)}`} target="_blank" rel="noreferrer">Marcar pelo WhatsApp</a>
      </div></section>

      <footer id="contato"><div className="wrap fg">
        <div><div className="logo" style={{ alignItems: "flex-start" }}>{brand}</div><p style={{ fontSize: 14.5, lineHeight: 1.7, marginTop: 16, fontWeight: 300 }}>Joias autorais feitas à mão em {city}.</p></div>
        <div><h5>Loja</h5><a onClick={() => go("colecao")}>Colares</a><a onClick={() => go("colecao")}>Brincos</a><a onClick={() => go("colecao")}>Anéis</a></div>
        <div><h5>Ajuda</h5><a onClick={() => go("atelie")}>Ateliê</a><a onClick={() => go("visita")}>Visite</a><a onClick={() => setOpen(true)}>Minha cesta</a></div>
        <div><h5>Novidades</h5><div className="nl"><input placeholder="Seu WhatsApp" aria-label="Seu WhatsApp" /><a href={`https://wa.me/${num}?text=${encodeURIComponent("Oi! Quero receber novidades das coleções.")}`} target="_blank" rel="noreferrer" aria-label="Enviar">→</a></div><p style={{ fontSize: 13.5, marginTop: 14, fontWeight: 300 }}>Instagram @{brand.toLowerCase().replace(/[^a-z]/g, "")}</p></div>
      </div></footer>

      {sc && count === 0 && <button type="button" className="fl" onClick={() => go("colecao")}>Ver coleção</button>}
      {sc && count > 0 && <button type="button" className="fl" onClick={() => setOpen(true)}>Cesta · {count} · {brl(total)}</button>}

      {open && (<>
        <div className="ov" onClick={() => setOpen(false)} />
        <aside className="dw" role="dialog" aria-label="Sua cesta">
          <button type="button" className="x" aria-label="Fechar" onClick={() => setOpen(false)}>×</button>
          <h3>Sua cesta</h3>
          <span style={{ color: "#6a5d55", fontSize: 14 }}>{count === 0 ? "Nada na cesta ainda" : `${count} ${count === 1 ? "peça" : "peças"}`}</span>
          {count === 0 ? (
            <div style={{ margin: "34px 0", textAlign: "center" }}><Mark /><p style={{ color: "#6a5d55" }}>Escolha uma peça da coleção para começar.</p><button type="button" className="btn" onClick={() => { setOpen(false); go("colecao"); }}>Ver coleção</button></div>
          ) : (<>
            {items.map((x) => (
              <div className="li" key={x.i}><img src={x.it.img} alt="" />
                <div style={{ flex: 1 }}><b style={{ fontSize: 15, fontWeight: 500 }}>{x.it.n}</b><div style={{ color: GOLD, fontWeight: 500 }}>{brl(x.it.p)}</div>
                  <div className="q"><button type="button" aria-label="Menos" onClick={() => qty(x.i, -1)}>−</button><span>{x.q}</span><button type="button" aria-label="Mais" onClick={() => qty(x.i, 1)}>+</button></div></div></div>
            ))}
            <div style={{ marginTop: 22, fontSize: 12.5, letterSpacing: 2.5, textTransform: "uppercase", fontWeight: 600 }}>Personalizar</div>
            <input className="f" placeholder="Gravação (nome, data ou frase curta)" maxLength={24} value={engrave} onChange={(e) => setEngrave(e.target.value)} aria-label="Gravação" />
            <label style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 14, fontSize: 15, minHeight: 44 }}><input type="checkbox" checked={gift} onChange={(e) => setGift(e.target.checked)} /> Embalagem de presente</label>
            <input className="f" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} aria-label="Seu nome" />
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600, fontSize: 20, borderTop: `1px solid ${DK}`, paddingTop: 12, marginTop: 20 }}><span>Total</span><span>{brl(total)}</span></div>
            <a className="btn" style={{ width: "100%", marginTop: 16 }} href={wa} target="_blank" rel="noreferrer">Finalizar no WhatsApp</a>
          </>)}
        </aside>
      </>)}
    </div>
  );
}
