import { useMemo, useState } from "react";

/** Hamburgueria nova, construida do zero. Tipo gigante atras do burger recortado, cardapio com abas, combo interativo. */
const F = "Bebas Neue, Oswald, sans-serif";
const OR = "#ff5a1f", BG = "#0b0908", FG = "#f5efe6";
type Item = { n: string; d: string; p: number; img: string; cat: "Burgers" | "Acompanhamentos" | "Bebidas" };
const ITEMS: Item[] = [
  { n: "Smash Duplo", d: "Duas carnes, cheddar, picles e molho da casa", p: 32, img: "/cut-chapa.webp", cat: "Burgers" },
  { n: "Clássico da Chapa", d: "Carne, alface, tomate e queijo prato", p: 27, img: "/cut-classic.webp", cat: "Burgers" },
  { n: "Frango Crocante", d: "Frango empanado, picles e maionese defumada", p: 29, img: "/cut-chicken.webp", cat: "Burgers" },
  { n: "Smash Bacon", d: "Carne prensada, bacon e cheddar derretido", p: 34, img: "/cut-smash.webp", cat: "Burgers" },
  { n: "Batata da Casa", d: "Porção crocante com sal e páprica", p: 18, img: "/cut-fries.webp", cat: "Acompanhamentos" },
  { n: "Milk-shake de Chocolate", d: "400 ml com chantilly", p: 19, img: "/cut-shake.webp", cat: "Bebidas" },
];
const REV = [
  { n: "Rafaela M.", t: "O melhor smash da região. Chega quente e o molho é viciante.", s: 5 },
  { n: "Lucas T.", t: "Pedi o combo duplo pra dividir e sobrou nada. Volto toda semana.", s: 5 },
  { n: "Camila S.", t: "Atendimento rápido, hambúrguer suculento e batata sequinha.", s: 5 },
];
const brl = (v: number) => `R$ ${v.toFixed(2).replace(".", ",")}`;

export function BurgerFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [tab, setTab] = useState<"Burgers" | "Acompanhamentos" | "Bebidas">("Burgers");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [b, setB] = useState(0), [s, setS] = useState(0), [dk, setDk] = useState(0);
  const list = useMemo(() => ITEMS.filter((i) => i.cat === tab), [tab]);
  const count = Object.values(cart).reduce((a, c) => a + c, 0);
  const total = ITEMS.reduce((a, i) => a + (cart[i.n] ?? 0) * i.p, 0);
  const burgers = ITEMS.filter((i) => i.cat === "Burgers"), sides = ITEMS.filter((i) => i.cat === "Acompanhamentos"), drinks = ITEMS.filter((i) => i.cat === "Bebidas");
  const combo = (burgers[b]?.p ?? 0) + (sides[s]?.p ?? 0) + (drinks[dk]?.p ?? 0) - 6;
  const add = (n: string) => setCart((c) => ({ ...c, [n]: (c[n] ?? 0) + 1 }));
  const wa = (text: string) => `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
  const btn = { background: OR, color: BG, fontWeight: 800, padding: "13px 24px", borderRadius: 999, border: 0, cursor: "pointer", display: "inline-block" } as const;
  return (
    <div className="bf" style={{ background: BG, color: FG, fontFamily: "Inter, system-ui, sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
        .bf a{color:inherit;text-decoration:none}
        .bf-nav{display:flex;gap:28px;font-size:14px;opacity:.85;text-transform:none}
        .bf-hero{position:relative;min-height:min(calc(100vh - 80px),820px);display:grid;place-items:center}
        .bf-giant{position:absolute;top:4%;left:0;right:0;text-align:center;font-family:${F};font-size:clamp(130px,30vw,460px);line-height:.8;white-space:nowrap;letter-spacing:4px}
        .bf-img{position:relative;z-index:2;width:min(52vw,540px);margin-top:12vh;filter:drop-shadow(0 40px 50px rgba(0,0,0,.7))}
        .bf-left{position:absolute;left:5vw;bottom:8vh;z-index:3;max-width:360px}
        .bf-price{position:absolute;right:5vw;bottom:8vh;z-index:3;text-align:right}
        .bf-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:20px}
        .bf-two{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center}
        .bf-3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
        .bf-sec{padding:90px 5vw}
        .bf-pills{display:flex;gap:8px;overflow-x:auto;white-space:nowrap;scrollbar-width:none;padding-bottom:4px;margin:28px 0}.bf-pills button{flex:0 0 auto;min-height:44px}
        .bf-add{min-height:44px}.bf-desc{font-size:13px;line-height:1.5;color:#a8a29a}
        .bf-card{transition:transform .3s}.bf-card:hover{transform:translateY(-6px) rotate(-1deg)}
        @media(max-width:820px){
          .bf-nav{display:none}
          .bf-hero{min-height:auto;display:block;padding:10px 5vw 40px;text-align:center}
          .bf-giant{position:relative;top:0;font-size:34vw;margin-top:10px}
          .bf-img{width:66vw;margin:-4vw auto 0;display:block}
          .bf-left,.bf-price{position:static;max-width:none;text-align:center;margin-top:18px}.bf-price div:first-child{font-size:44px!important}
          .bf-left>div{justify-content:center}
          .bf-grid,.bf-3{grid-template-columns:1fr 1fr}
          .bf-two{grid-template-columns:1fr}
          .bf-sec{padding:60px 5vw}
        }
        @media(max-width:520px){.bf-grid,.bf-3{grid-template-columns:1fr}}
      `}</style>

      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 5vw", position: "relative", zIndex: 5 }}>
        <div style={{ fontFamily: F, fontSize: 30, letterSpacing: 2 }}>{brand ? brand.toUpperCase() : <>BRASA<span style={{ color: OR }}>&amp;</span>PÃO</>}</div>
        <nav className="bf-nav"><a href="#cardapio">Cardápio</a><a href="#combo">Monte seu combo</a><a href="#chapa">Nossa chapa</a><a href="#onde">Onde estamos</a></nav>
        <a href="#cardapio" style={{ ...btn, padding: "11px 20px", fontSize: 14 }}>Pedir agora{count ? ` · ${count}` : ""}</a>
      </header>

      <section className="bf-hero">
        <div aria-hidden className="bf-giant">BURGER</div>
        <img className="bf-img" src="/cut-chapa.webp" alt="Smash duplo com cheddar" />
        <div className="bf-left">
          <p style={{ fontSize: 12, letterSpacing: 4, color: OR, fontWeight: 700 }}>SMASH NA CHAPA · DESDE 2019</p>
          <p style={{ marginTop: 10, fontSize: 18, lineHeight: 1.5, opacity: 0.85 }}>Duas carnes prensadas, queijo derretido e o molho da casa. Sai quente, sai rápido.</p>
          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            <a href="#cardapio" style={btn}>Ver cardápio</a>
            <a href="#combo" style={{ border: `1px solid ${FG}aa`, padding: "13px 24px", borderRadius: 999 }}>Combos</a>
          </div>
        </div>
        <div className="bf-price"><div style={{ fontFamily: F, fontSize: 60, lineHeight: 1, color: FG }}>R$ 32</div><div style={{ fontSize: 13, opacity: 0.75 }}>Smash duplo</div></div>
      </section>

      <div style={{ background: OR, color: BG, fontFamily: F, fontSize: 22, letterSpacing: 2, whiteSpace: "nowrap", overflow: "hidden", padding: "10px 0", marginTop: 48 }}>
        <div style={{ display: "inline-block", animation: "bfm 22s linear infinite" }}>{Array.from({ length: 8 }).map((_, i) => <span key={i} style={{ margin: "0 28px" }}>CARNE PRENSADA ✦ PÃO NA MANTEIGA ✦ MOLHO DA CASA ✦</span>)}</div>
        <style>{"@keyframes bfm{to{transform:translateX(-50%)}}@media(prefers-reduced-motion:reduce){.bf div{animation:none!important}}"}</style>
      </div>

      <section id="cardapio" className="bf-sec">
        <h2 style={{ fontFamily: F, fontSize: "clamp(44px,7vw,92px)", lineHeight: 0.95 }}>O QUE SAI<br /><span style={{ color: OR }}>DA CHAPA</span></h2>
        <div className="bf-pills">
          {(["Burgers", "Acompanhamentos", "Bebidas"] as const).map((t) => <button key={t} onClick={() => setTab(t)} style={{ padding: "10px 20px", borderRadius: 999, border: `1px solid ${tab === t ? OR : FG + "44"}`, background: tab === t ? OR : "transparent", color: tab === t ? BG : FG, fontWeight: 700, cursor: "pointer" }}>{t}</button>)}
        </div>
        <div className="bf-grid">
          {list.map((i) => (
            <article key={i.n} className="bf-card" style={{ background: "#16110f", border: "1px solid #ffffff14", borderRadius: 24, padding: 22, textAlign: "center" }}>
              <div style={{ height: 200, display: "grid", placeItems: "center" }}><img src={i.img} alt={i.n} loading="lazy" style={{ maxHeight: 190, maxWidth: "90%", objectFit: "contain", filter: "drop-shadow(0 18px 20px rgba(0,0,0,.6))" }} /></div>
              <h3 style={{ fontFamily: F, fontSize: 30, marginTop: 12, letterSpacing: 1 }}>{i.n}</h3>
              <p className="bf-desc" style={{ minHeight: 40 }}>{i.d}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14 }}>
                <span style={{ fontFamily: F, fontSize: 30, color: OR }}>{brl(i.p)}</span>
                <button className="bf-add" onClick={() => add(i.n)} style={{ ...btn, padding: "10px 18px", fontSize: 14 }}>{cart[i.n] ? `Adicionado (${cart[i.n]})` : "Adicionar"}</button>
              </div>
            </article>
          ))}
        </div>
        {count > 0 && <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}><strong style={{ fontFamily: F, fontSize: 30 }}>{count} item(ns) · {brl(total)}</strong><a style={btn} href={wa(`Oi! Quero pedir: ${ITEMS.filter((i) => cart[i.n]).map((i) => `${cart[i.n]}x ${i.n}`).join(", ")}. Total ${brl(total)}`)}>Finalizar no WhatsApp</a></div>}
      </section>

      <section id="combo" className="bf-sec" style={{ background: "#120e0c" }}>
        <div className="bf-two">
          <div>
            <h2 style={{ fontFamily: F, fontSize: "clamp(44px,7vw,92px)", lineHeight: 0.95 }}>MONTE<br /><span style={{ color: OR }}>SEU COMBO</span></h2>
            {([["Burger", burgers, b, setB], ["Acompanhamento", sides, s, setS], ["Bebida", drinks, dk, setDk]] as const).map(([label, arr, sel, set]) => (
              <div key={label} style={{ marginTop: 22 }}>
                <p style={{ fontSize: 12, letterSpacing: 3, opacity: 0.6 }}>{label.toUpperCase()}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>{arr.map((i, k) => <button key={i.n} onClick={() => set(k)} style={{ padding: "9px 16px", borderRadius: 999, border: `1px solid ${sel === k ? OR : FG + "33"}`, background: sel === k ? OR : "transparent", color: sel === k ? BG : FG, fontWeight: 600, cursor: "pointer" }}>{i.n}</button>)}</div>
              </div>
            ))}
            <p style={{ marginTop: 26, fontFamily: F, fontSize: 56, color: OR }}>{brl(combo)} <small style={{ fontFamily: "Inter", fontSize: 13, opacity: 0.6 }}>combo com R$ 6 off</small></p>
            <a style={btn} href={wa(`Quero o combo: ${burgers[b]?.n} + ${sides[s]?.n} + ${drinks[dk]?.n} por ${brl(combo)}`)}>Pedir esse combo</a>
          </div>
          <div style={{ position: "relative", minHeight: 360, display: "grid", placeItems: "center" }}>
            <div aria-hidden style={{ position: "absolute", width: "78%", aspectRatio: "1", borderRadius: "50%", background: `radial-gradient(circle,${OR}55,transparent 68%)` }} />
            <img src={burgers[b]?.img} alt="" style={{ position: "relative", width: "58%", filter: "drop-shadow(0 30px 30px rgba(0,0,0,.6))" }} />
            <img src={sides[s]?.img} alt="" style={{ position: "absolute", width: "30%", left: "2%", bottom: "4%", filter: "drop-shadow(0 16px 16px rgba(0,0,0,.6))" }} />
            <img src={drinks[dk]?.img} alt="" style={{ position: "absolute", width: "17%", right: "4%", bottom: "6%", filter: "drop-shadow(0 16px 16px rgba(0,0,0,.6))" }} />
          </div>
        </div>
      </section>

      <section id="chapa" style={{ position: "relative", minHeight: 520, display: "grid", placeItems: "center", textAlign: "center", padding: "90px 5vw", backgroundImage: "linear-gradient(#0b0908cc,#0b0908cc),url(/photo-grill.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div>
          <h2 style={{ fontFamily: F, fontSize: "clamp(44px,7vw,92px)", lineHeight: 0.95 }}>CARNE MOÍDA <span style={{ color: OR }}>TODO DIA</span></h2>
          <p style={{ maxWidth: 520, margin: "16px auto 0", opacity: 0.8 }}>Prensada na hora, na chapa bem quente, pra formar aquela crosta que ninguém esquece.</p>
          <div style={{ display: "flex", gap: 40, justifyContent: "center", marginTop: 34, flexWrap: "wrap" }}>
            {[["+12 mil", "burgers por mês"], ["4,9", "nota dos clientes"], ["15 min", "tempo médio"]].map(([a, c]) => <div key={c}><div style={{ fontFamily: F, fontSize: 54, color: OR }}>{a}</div><div style={{ fontSize: 13, opacity: 0.7 }}>{c}</div></div>)}
          </div>
        </div>
      </section>

      <section className="bf-sec">
        <h2 style={{ fontFamily: F, fontSize: "clamp(44px,7vw,92px)", lineHeight: 0.95 }}>QUEM <span style={{ color: OR }}>PROVOU</span></h2>
        <div className="bf-3" style={{ marginTop: 30 }}>
          {REV.map((r) => <figure key={r.n} style={{ margin: 0, background: "#16110f", borderRadius: 20, padding: 24, border: "1px solid #ffffff14" }}><div style={{ color: OR, letterSpacing: 2 }}>{"★".repeat(r.s)}</div><blockquote style={{ margin: "10px 0 14px", lineHeight: 1.5 }}>“{r.t}”</blockquote><figcaption style={{ fontSize: 13, opacity: 0.6 }}>{r.n}</figcaption></figure>)}
        </div>
      </section>

      <section id="onde" className="bf-sec" style={{ background: "#120e0c" }}>
        <div className="bf-two">
          <div>
            <h2 style={{ fontFamily: F, fontSize: "clamp(44px,7vw,92px)", lineHeight: 0.95 }}>ONDE <span style={{ color: OR }}>ESTAMOS</span></h2>
            <p style={{ marginTop: 18, lineHeight: 1.8, opacity: 0.85 }}>Rua das Acácias, 214 · Centro<br />Seg a qui, 18h às 23h · Sex a dom, 18h à 1h</p>
            <a style={{ ...btn, marginTop: 22 }} href={wa("Oi! Vi o site e queria fazer um pedido.")}>Chamar no WhatsApp</a>
          </div>
          <div style={{ borderRadius: 24, minHeight: 280, background: "repeating-linear-gradient(0deg,#1c1613 0 38px,#241c18 38px 40px),#1c1613", position: "relative", border: "1px solid #ffffff14" }}>
            <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-60%)", background: OR, color: BG, borderRadius: "50% 50% 50% 0", width: 44, height: 44, rotate: "-45deg" }} />
            <span style={{ position: "absolute", left: 0, right: 0, bottom: 18, textAlign: "center", fontSize: 13, opacity: 0.7 }}>Rua das Acácias, 214</span>
          </div>
        </div>
      </section>
      <footer style={{ padding: "26px 5vw", fontSize: 13, opacity: 0.6, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}><span>© {brand || "Brasa&Pão"} · Modelo ilustrativo</span><span>@brasaepao</span></footer>
    </div>
  );
}
