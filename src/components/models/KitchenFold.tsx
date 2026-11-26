import { useEffect, useState } from "react";

/** Vitrine de utilidades de cozinha ("KitchenLux"), feita a partir de um pin creme e preto com dourado: hero escuro com air fryer, categorias redondas, dois banners, produtos em alta, casal na cozinha com depoimento e barra de garantias. */
const GD = "#e3b574", GD2 = "#f1d2a0", DK = "#14110f", CR = "#f8f1e7", LN = "#e8dccb", MU = "#6f655a";
const CATS = ["Panelas e assadeiras", "Preparo e corte", "Armazenamento", "Eletroportáteis", "Utensílios", "Bar e bebidas", "Grill e churrasco", "Cozinha inteligente"];
const PROD = [
  { n: "Air Fryer Digital", p: "R$ 899", o: "R$ 1.299", d: "31% OFF", r: "4,8", c: "2,4 mil", img: "/kitchenlux-airfryer.webp" },
  { n: "Processador de Alimentos", p: "R$ 649", o: "R$ 899", d: "25% OFF", r: "4,7", c: "1,8 mil", img: "/kitchenlux-processador.webp" },
  { n: "Jogo de Panelas Antiaderente", p: "R$ 1.299", o: "R$ 1.999", d: "35% OFF", r: "4,9", c: "1,2 mil", img: "/kitchenlux-panelas.webp" },
  { n: "Liquidificador Inteligente", p: "R$ 749", o: "R$ 999", d: "27% OFF", r: "4,8", c: "2,1 mil", img: "/kitchenlux-liquidificador.webp" },
  { n: "Porta-temperos Giratório", p: "R$ 299", o: "R$ 499", d: "40% OFF", r: "4,6", c: "1,4 mil", img: "/kitchenlux-temperos.webp" },
];

function Ci({ i }: { i: number }) {
  const p = { width: 34, height: 34, viewBox: "0 0 24 24", fill: "none", stroke: "#4a3a2a", strokeWidth: 1.3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const s = [
    <svg {...p} key="0"><path d="M4 10h16v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM2 10h2M20 10h2M9 7a3 3 0 0 1 6 0" /></svg>,
    <svg {...p} key="1"><path d="M12 3v8M8 11h8l-1 9H9zM7 5l3 3" /></svg>,
    <svg {...p} key="2"><path d="M6 4h12v4H6zM5 8h14v12H5zM9 12h6" /></svg>,
    <svg {...p} key="3"><path d="M8 4h8l-1 6H9zM7 10h10l-1 10H8zM10 14h4" /></svg>,
    <svg {...p} key="4"><path d="M7 3v8M5 3v4a2 2 0 0 0 4 0V3M7 11v10M16 3c-2 2-2 6 0 8v10" /></svg>,
    <svg {...p} key="5"><path d="M5 4h14l-7 8zM12 12v8M8 20h8" /></svg>,
    <svg {...p} key="6"><path d="M3 9h18M5 9a7 7 0 0 0 14 0M8 5c0-1 1-1 1-2M12 5c0-1 1-1 1-2M16 5c0-1 1-1 1-2M12 16v4M8 20h8" /></svg>,
    <svg {...p} key="7"><rect x="4" y="5" width="16" height="14" rx="3" /><path d="M8 5V3h8v2M9 12h6M12 9v6" /></svg>,
  ];
  return s[i];
}
function Fi({ i }: { i: number }) {
  const p = { width: 26, height: 26, viewBox: "0 0 24 24", fill: "none", stroke: GD, strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (i === 0) return <svg {...p}><path d="M12 3l2.200 5 5.300.5-4 3.600 1.200 5.300L12 14.500 7.300 17.400 8.500 12 4.500 8.500 9.800 8z" /></svg>;
  if (i === 1) return <svg {...p}><path d="M2 6h12v10H2zM14 9h4l3 3v4h-7" /><circle cx="7" cy="17.500" r="1.800" /><circle cx="17" cy="17.500" r="1.800" /></svg>;
  return <svg {...p}><path d="M4 12a8 8 0 0 1 14-5l2 2M20 4v5h-5M20 12a8 8 0 0 1-14 5l-2-2M4 20v-5h5" /></svg>;
}
function Hat({ s = 34 }: { s?: number }) {
  return <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke="#2a2018" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18a5 5 0 1 1 2-9.600 5.500 5.500 0 0 1 10 0A5 5 0 1 1 23 18v7H9zM9 22h14" /></svg>;
}

export function KitchenFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "KitchenLux";
  const b1 = brand.length > 3 ? brand.slice(0, brand.length - 3) : brand;
  const b2 = brand.length > 3 ? brand.slice(-3) : "";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [cart, setCart] = useState<string[]>([]);
  const [fav, setFav] = useState<string[]>([]);
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const base = `https://wa.me/${num}`;
  const wa = (t: string) => `${base}?text=${encodeURIComponent(t)}`;
  const order = wa(cart.length ? `Oi! Quero comprar na ${brand}: ${cart.join(", ")}.` : `Oi! Quero ver os produtos da ${brand}.`);
  const tog = (n: string) => setCart((c) => (c.includes(n) ? c.filter((x) => x !== n) : [...c, n]));

  return (
    <div className="kl" style={{ fontFamily: "'Inter', system-ui, sans-serif", color: DK, background: CR, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap');
        .kl *{box-sizing:border-box}.kl a,.kl button,.kl input{font-family:inherit}
        .kl h1,.kl h2,.kl h3,.kl .lg b{font-family:'Playfair Display',Georgia,serif!important;font-weight:400!important;letter-spacing:-.01em!important;text-transform:none!important;margin:0;text-wrap:balance}
        .kl .w{max-width:1180px;margin:0 auto;padding:0 28px;position:relative}
        .kl .nav{background:${CR};position:relative;z-index:6}.kl .nav .w{display:flex;align-items:center;justify-content:space-between;padding-top:16px;padding-bottom:16px}
        .kl .lg{display:flex;align-items:center;gap:10px}.kl .lg b{font-size:26px;color:#2a2018}.kl .lg small{display:block;font-size:8px;letter-spacing:.14em;color:#6f655a;margin-top:2px}
        .kl .lk{display:flex;gap:34px;font-size:13px}.kl .lk a{cursor:pointer;color:#2a2018;padding-bottom:5px;border-bottom:1px solid transparent}.kl .lk a.on{border-color:#2a2018}
        .kl .ic{display:flex;gap:18px;align-items:center}.kl .ic button{background:none;border:0;cursor:pointer;position:relative;padding:0;color:#2a2018}.kl .ic .n{position:absolute;top:-8px;right:-9px;background:#8a5a22;color:#fff;border-radius:99px;font-size:9px;min-width:14px;height:14px;display:flex;align-items:center;justify-content:center}
        .kl .burger{display:none}
        .kl .hero{position:relative;background:${DK};color:#fff;overflow:hidden;min-height:520px}
        .kl .hero .ph{position:absolute;right:0;top:0;bottom:0;width:66%;background:url(/kitchenlux-hero.webp) 70% 40%/cover no-repeat;-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 38%);mask-image:linear-gradient(90deg,transparent 0,#000 38%)}
        .kl .hero .tx{position:relative;z-index:2;padding-top:44px;padding-bottom:30px;max-width:520px}
        .kl .kick{font-size:11px;letter-spacing:.24em;text-transform:uppercase}
        .kl .hero h1{font-size:clamp(44px,5.4vw,66px);line-height:1.02;margin-top:22px}.kl .hero h1 em{font-style:italic;color:${GD2}}
        .kl .hero p{font-size:16px;line-height:1.55;margin:22px 0 28px;max-width:380px;color:#f1ebe2}
        .kl .row{display:flex;gap:22px;align-items:center}
        .kl .bt{display:inline-flex;align-items:center;gap:10px;background:linear-gradient(180deg,${GD2},${GD});color:#2a1d0e;border-radius:99px;padding:14px 28px;font-size:14px;font-weight:500;text-decoration:none;cursor:pointer;border:0}
        .kl .pl{display:inline-flex;align-items:center;gap:12px;color:#fff;font-size:14px;text-decoration:none}.kl .pl i{width:38px;height:38px;border:1px solid ${GD};border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:12px;color:${GD}}
        .kl .feats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(3,auto);justify-content:start;gap:0;margin-top:36px;max-width:520px}
        .kl .feats div{display:flex;gap:12px;align-items:center;font-size:12px;line-height:1.35;padding:0 22px;border-left:1px solid #4a423a}.kl .feats div:first-child{padding-left:0;border:0}
        .kl section{padding:56px 0 0}
        .kl .hd{display:flex;justify-content:space-between;align-items:flex-end;gap:16px}.kl h2{font-size:clamp(28px,3vw,34px)}.kl .sub{font-size:14px;color:${MU};margin-top:8px}
        .kl .all{font-size:12px;color:#2a2018;text-decoration:none;cursor:pointer}
        .kl .cats{display:grid;grid-template-columns:repeat(8,1fr);gap:16px;margin-top:28px}
        .kl .cats div{display:flex;flex-direction:column;align-items:center;gap:12px;font-size:12px;text-align:center;cursor:pointer;line-height:1.3}
        .kl .cats span{width:84px;height:84px;border-radius:50%;background:#efe3d2;border:1px solid ${LN};display:flex;align-items:center;justify-content:center}
        .kl .bn{display:grid;grid-template-columns:1fr 1fr;gap:16px}
        .kl .b1{position:relative;border-radius:18px;overflow:hidden;background:${DK};color:#fff;min-height:210px;display:flex;align-items:center;justify-content:flex-end}
        .kl .b1:before{content:"";position:absolute;left:0;top:0;bottom:0;width:60%;background:url(/kitchenlux-cozinha.webp) 40% 50%/cover}
        .kl .b1 .t{position:relative;width:52%;padding:26px 26px 26px 0;background:none}.kl .b1:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent 35%,${DK} 56%)}.kl .b1 .t{z-index:2}
        .kl .b1 h2,.kl .b2 h2{font-size:26px;line-height:1.1}.kl .b1 p,.kl .b2 p{font-size:12px;line-height:1.55;margin:10px 0 16px;color:#e5dccf}
        .kl .b2{position:relative;border-radius:18px;overflow:hidden;background:#f0dcc0;min-height:210px;display:flex;align-items:center;padding:0 0 0 55%}
        .kl .b2:before{content:"";position:absolute;left:0;top:0;bottom:0;width:62%;background:url(/kitchenlux-bancada.webp) 50% 70%/cover;-webkit-mask-image:linear-gradient(90deg,#000 60%,transparent);mask-image:linear-gradient(90deg,#000 60%,transparent)}
        .kl .b2 .t{position:relative;z-index:2;padding:20px}.kl .b2 p{color:#5a4d3f}
        .kl .b2 .off{position:absolute;z-index:3;left:40%;top:18px;width:64px;height:64px;border-radius:50%;background:${GD};display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:8px;letter-spacing:.06em;text-align:center;line-height:1.2;color:#2a1d0e}.kl .b2 .off b{font-family:'Playfair Display';font-size:16px;font-weight:500}
        .kl .bt2{display:inline-flex;align-items:center;gap:8px;background:${GD2};color:#2a1d0e;border-radius:99px;padding:11px 20px;font-size:12px;font-weight:500;text-decoration:none;cursor:pointer}
        .kl .grid{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin-top:24px}
        .kl .pd{background:#fff;border:1px solid ${LN};border-radius:12px;overflow:hidden;position:relative}
        .kl .pd .im{height:150px;background-size:cover;background-position:center}
        .kl .pd .hr{position:absolute;right:10px;top:10px;width:26px;height:26px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;cursor:pointer;color:#2a2018}
        .kl .pd .bd{padding:12px 12px 14px}.kl .pd h3{font-family:'Inter'!important;font-size:12px!important;font-weight:500!important}
        .kl .pd .st{font-size:10px;color:${MU};margin:6px 0}.kl .pd .st b{color:#c8872c;font-weight:400}
        .kl .pd .pr{font-size:16px;font-weight:500;margin-top:4px}.kl .pd .pr s{font-size:10px;color:#a0968a;margin-left:6px;font-weight:400}
        .kl .pd .dc{display:inline-block;font-size:9px;background:#8a5a22;color:#fff;border-radius:4px;padding:2px 6px;margin-top:8px}
        .kl .pd button{display:block;width:100%;margin-top:10px;background:#fff;border:1px solid #cfc3b2;border-radius:6px;padding:9px;font-size:11px;cursor:pointer;color:#2a2018}.kl .pd button.on{background:${DK};color:#fff;border-color:${DK}}
        .kl .dr{display:grid;grid-template-columns:1.9fr 1fr;gap:16px}
        .kl .d1{position:relative;border-radius:18px;overflow:hidden;background:${DK};color:#fff;min-height:220px;display:flex;align-items:center}
        .kl .d1:before{content:"";position:absolute;right:0;top:0;bottom:0;width:62%;background:url(/kitchenlux-casal.webp) 45% 40%/cover;-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 30%);mask-image:linear-gradient(90deg,transparent 0,#000 30%)}
        .kl .d1 .t{position:relative;z-index:2;padding:28px 34px;max-width:300px}.kl .d1 .kk{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:#cfc3b2}
        .kl .d1 h2{font-size:30px;line-height:1.1;margin:10px 0 12px}.kl .d1 p{font-size:12px;line-height:1.55;color:#e5dccf;margin:0 0 18px}
        .kl .d2{border-radius:18px;background:${DK};color:#fff;padding:26px;display:flex;flex-direction:column;justify-content:space-between}
        .kl .d2 q{font-size:14px;line-height:1.55;quotes:none;color:#f1ebe2}.kl .d2 .q{font-family:'Playfair Display';font-size:34px;color:${GD};line-height:1}
        .kl .d2 .who{display:flex;align-items:center;gap:12px;font-size:12px;margin-top:18px}.kl .d2 .who i{width:40px;height:40px;border-radius:50%;background:${GD};color:#2a1d0e;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:15px;font-weight:500}.kl .d2 .who span{display:block;color:#b9ad9c;font-size:10px;margin-top:2px}
        .kl .bar{margin-top:16px;border-radius:18px;background:${DK};color:#fff;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:20px 28px}
        .kl .bar .it{display:flex;gap:12px;align-items:center;font-size:11px;line-height:1.4;flex:1;padding:0 20px;border-left:1px solid #3d362f}.kl .bar .it:first-child{border:0;padding-left:0}
        .kl .bar .it i{width:42px;height:42px;border:1px solid ${GD};border-radius:50%;display:flex;align-items:center;justify-content:center;flex:none}
        .kl footer{padding:34px 0;font-size:12px;color:${MU}}.kl footer .w{display:flex;justify-content:space-between;gap:12px}
        .kl .wa{position:fixed;right:20px;bottom:20px;width:54px;height:54px;border-radius:50%;background:#25d366;display:flex;align-items:center;justify-content:center;z-index:50}
        .kl .mn{display:none}
        @media(max-width:900px){
          .kl .lk,.kl .ic .h{display:none}.kl .burger{display:block}.kl .mn{display:flex;flex-direction:column;gap:14px;background:${CR};padding:6px 28px 18px;font-size:14px;position:relative;z-index:6}
          .kl .w{padding:0 20px}.kl .hero .ph{width:100%;opacity:1;-webkit-mask-image:linear-gradient(0deg,#000 20%,transparent);mask-image:linear-gradient(0deg,#000 20%,transparent);top:auto;height:300px}
          .kl .hero{min-height:0;padding-bottom:300px}.kl .hero .tx{padding-bottom:0}.kl .feats{grid-template-columns:1fr;gap:14px}.kl .feats div{border:0;padding:0}
          .kl .cats{grid-template-columns:repeat(4,1fr)}.kl .cats span{width:64px;height:64px}.kl .cats span svg{width:26px;height:26px}
          .kl .bn,.kl .dr{grid-template-columns:1fr}.kl .grid{grid-template-columns:repeat(2,1fr)}.kl .pd .im{height:130px}
          .kl .b1,.kl .b2{display:block;padding:0;min-height:0}.kl .b1:before,.kl .b2:before{position:relative;display:block;width:100%;height:170px;left:auto;top:auto;bottom:auto}.kl .b1:after{display:none}.kl .b1 .t{width:100%;padding:22px;position:relative}.kl .b2 .t{padding:22px}.kl .b2 .off{left:auto;right:18px;top:18px}.kl .b2:before{-webkit-mask-image:none;mask-image:none}.kl .bar{flex-direction:column;align-items:flex-start}.kl .bar .it{border:0;padding:0}
          .kl .d1:before{width:100%;opacity:.5}
        }
      `}</style>

      <div className="nav"><div className="w">
        <div className="lg"><Hat /><div><b>{b1}{b2}</b><small>UTILIDADES. COZINHAR MELHOR.</small></div></div>
        <div className="lk"><a className="on" onClick={() => go("top")}>Início</a><a onClick={() => go("prod")}>Loja ⌄</a><a onClick={() => go("cat")}>Categorias ⌄</a><a onClick={() => go("sobre")}>Sobre</a><a onClick={() => go("sobre")}>Blog</a><a onClick={() => window.open(base, "_blank")}>Contato</a></div>
        <div className="ic">
          <button className="h" aria-label="Buscar"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="11" cy="11" r="6.500" /><path d="M16 16l4 4" /></svg></button>
          <button className="h" aria-label="Conta"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="8" r="4" /><path d="M4 21c1-5 15-5 16 0" /></svg></button>
          <button className="h" aria-label="Favoritos"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 20s-8-5-8-11a4.500 4.500 0 0 1 8-2.500A4.500 4.500 0 0 1 20 9c0 6-8 11-8 11z" /></svg></button>
          <button aria-label="Carrinho" onClick={() => window.open(order, "_blank")}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 7h14l-1.500 12h-11zM9 7a3 3 0 0 1 6 0" /></svg><span className="n">{cart.length}</span></button>
          <button className="burger" aria-label="Menu" onClick={() => setMenu(!menu)}><svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M4 7h16M4 12h16M4 17h16" /></svg></button>
        </div>
      </div>{menu && <div className="mn"><a onClick={() => go("prod")}>Loja</a><a onClick={() => go("cat")}>Categorias</a><a onClick={() => go("sobre")}>Sobre</a></div>}</div>

      <header className="hero" id="top">
        <div className="ph" role="img" aria-label="Air fryer preta com batatas fritas, tomates e ervas sobre mesa de madeira" />
        <div className="w"><div className="tx">
          <div className="kick">Utilidades premium de cozinha</div>
          <h1>Cozinhe melhor<br /><em>Viva melhor</em></h1>
          <p>Descubra utilidades de cozinha inovadoras, feitas para cozinhar com mais facilidade, rapidez e prazer.</p>
          <div className="row"><a className="bt" onClick={() => go("prod")}>Comprar agora →</a><a className="pl" href={base} target="_blank" rel="noreferrer"><i>▶</i>Ver vídeo</a></div>
          <div className="feats">
            {[["Qualidade", "premium"], ["Entrega rápida", "e segura"], ["Troca fácil", "em 30 dias"]].map(([a, b], i) => <div key={a}><Fi i={i} /><span>{a}<br />{b}</span></div>)}
          </div>
        </div></div>
      </header>

      <section id="cat"><div className="w">
        <div className="hd"><div><h2>Compre por categoria</h2><div className="sub">Encontre a utilidade certa para cada refeição.</div></div><a className="all" onClick={() => go("prod")}>Ver todas →</a></div>
        <div className="cats">{CATS.map((c, i) => <div key={c} onClick={() => go("prod")}><span><Ci i={i} /></span>{c}</div>)}</div>
      </div></section>

      <section><div className="w bn">
        <div className="b1"><div className="t"><h2>Toda refeição, especial</h2><p>De cafés da manhã rápidos a jantares gourmet, nossas utilidades ajudam você a cozinhar como um chef, todo dia.</p><a className="bt" onClick={() => go("prod")}>Ver coleção →</a></div></div>
        <div className="b2"><div className="off">ATÉ<b>40%</b>OFF</div><div className="t"><h2>Kits de cozinha premium</h2><p>Tudo o que você precisa em um só kit.</p><a className="bt2" onClick={() => go("prod")}>Comprar agora →</a></div></div>
      </div></section>

      <section id="prod"><div className="w">
        <div className="hd"><div><h2>Utilidades em alta</h2><div className="sub">As preferidas de quem cozinha em casa.</div></div><a className="all" onClick={() => window.open(order, "_blank")}>Ver todos →</a></div>
        <div className="grid">{PROD.map((p) => (
          <div className="pd" key={p.n}>
            <span className="hr" onClick={() => setFav((f) => (f.includes(p.n) ? f.filter((x) => x !== p.n) : [...f, p.n]))}>{fav.includes(p.n) ? "♥" : "♡"}</span>
            <div className="im" style={{ backgroundImage: `url(${p.img})` }} />
            <div className="bd"><h3>{p.n}</h3><div className="st"><b>★★★★★</b> {p.r} ({p.c})</div><div className="pr">{p.p}<s>{p.o}</s></div><span className="dc">{p.d}</span>
              <button className={cart.includes(p.n) ? "on" : ""} onClick={() => tog(p.n)}>{cart.includes(p.n) ? "No carrinho ✓" : "Adicionar ao carrinho"}</button></div>
          </div>))}</div>
      </div></section>

      <section id="sobre"><div className="w">
        <div className="dr">
          <div className="d1"><div className="t"><div className="kk">Cozinhe · Compartilhe · Aproveite</div><h2>Sua cozinha dos sonhos espera</h2><p>Renove sua cozinha com utilidades premium e aproveite um jeito mais fácil e prazeroso de cozinhar.</p><a className="bt2" onClick={() => go("prod")}>Mais vendidos →</a></div></div>
          <div className="d2"><div><div className="q">“</div><q>Qualidade incrível e entrega super rápida. A air fryer mudou meu jeito de cozinhar. Recomendo muito!</q></div>
            <div className="who"><i>M</i><div>Marina Souza<span>Compra verificada</span></div></div></div>
        </div>
        <div className="bar">
          {[["Qualidade premium", "para sua cozinha"], ["Pagamento seguro", "e compra protegida"], ["Troca fácil", "em até 30 dias"]].map(([a, b], i) => <div className="it" key={a}><i><Fi i={i === 1 ? 0 : i === 0 ? 0 : 2} /></i><span>{a}<br />{b}</span></div>)}
          <a className="bt" href={order} target="_blank" rel="noreferrer">Comprar agora →</a>
        </div>
      </div></section>

      <footer><div className="w"><span>© 2026 {brand}. Todos os direitos reservados.</span><span>Política de privacidade · Termos</span></div></footer>
      {sc && <a className="wa" href={base} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="28" height="28" viewBox="0 0 32 32" fill="#fff"><path d="M16 3a13 13 0 0 0-11 19.800L3 29l6.400-1.900A13 13 0 1 0 16 3zm0 2.400a10.600 10.600 0 1 1-5.600 19.600l-.4-.2-3.700 1.100 1.100-3.600-.3-.4A10.600 10.600 0 0 1 16 5.400z" /></svg></a>}
    </div>
  );
}
