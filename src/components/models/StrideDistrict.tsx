import React from "react";

const ORANGE = "#ff6a00";
const GREEN = "#7dff3a";
const BLACK = "#0b0b0c";
const INK = "#111113";
const LIGHT = "#f2f0ec";
const head = "'Barlow Condensed', 'Oswald', Impact, sans-serif";
const script = "'Permanent Marker', 'Caveat', cursive";
const sans = "'Inter', 'Helvetica Neue', Arial, sans-serif";

const PRODUCTS = [
  { img: "/st-sneaker.webp", name: "High Top Retro 85", cat: "Tênis", price: 180 },
  { img: "/st-slide.webp", name: "Foam Slide Sand", cat: "Tênis", price: 70 },
  { img: "/st-hoodie-gray.webp", name: "Heavyweight Hoodie Grey", cat: "Roupas", price: 110 },
  { img: "/st-dadshoe.webp", name: "Runner 9060 Chunky", cat: "Tênis", price: 150 },
  { img: "/st-hoodie-black.webp", name: "Essential Hoodie Black", cat: "Roupas", price: 90 },
  { img: "/st-cap.webp", name: "Curved Brim Cap", cat: "Acessórios", price: 28 },
];

const REVIEWS = [
  { name: "Jordan T.", text: "Caimento perfeito e chegou rápido. Os high tops retrô são ainda melhores pessoalmente." },
  { name: "Miguel L.", text: "Melhor loja de streetwear da cidade. Pares originais, preço justo e troca sem dor de cabeça." },
  { name: "Alyssa R.", text: "Comprei o moletom cinza pro meu irmão e acabei levando um pra mim também. Muito macio." },
];

const BRANDS = ["NORTHLINE", "KICKLAB", "URBANOX", "SOLEWORKS", "FLUXWEAR", "DISTRICT 9"];

function Smiley() {
  return (
    <svg viewBox="0 0 120 120" width="100%" height="100%" aria-hidden>
      <defs>
        <filter id="sd-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.2" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <g fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" filter="url(#sd-glow)">
        <circle cx="60" cy="60" r="48" />
        <path d="M38 46 q6 -9 12 0" />
        <path d="M70 46 q6 -9 12 0" />
        <path d="M34 68 q26 30 52 0" />
      </g>
    </svg>
  );
}

export function StrideDistrict({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = String(client?.name || "").trim() || "Stride District";
  const parts = brand.split(" ");
  const first = parts[0];
  const rest = parts.slice(1).join(" ");
  const phone = String(client?.whatsapp || "5511999999999").replace(/\D/g, "");
  const wa = (t: string) => `https://wa.me/${phone}?text=${encodeURIComponent(t)}`;
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const [slide, setSlide] = React.useState(0);
  const [cart, setCart] = React.useState(0);
  const track = React.useRef<HTMLDivElement>(null);

  const scrollTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement | undefined;
    if (card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
    setSlide(i);
  };

  const nav: [string, string][] = [["LANÇAMENTOS", "novidades"], ["TÊNIS", "categorias"], ["ROUPAS", "categorias"], ["ACESSÓRIOS", "categorias"], ["MARCAS", "marcas"]];

  return (
    <div className="sd-root" style={{ background: BLACK, color: "#fff", fontFamily: sans }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;1,800;1,900&family=Permanent+Marker&family=Inter:wght@400;500;600;700&display=swap');
        .sd-root *{box-sizing:border-box}
        .sd-root a,.sd-root button{font-family:inherit}
        .sd-top{background:${ORANGE};color:#111;font-family:${head};font-weight:700;letter-spacing:1.6px;font-size:13px;text-transform:uppercase;display:flex;justify-content:space-between;gap:16px;padding:8px 40px}
        .sd-top span:nth-child(2){opacity:.85}
        .sd-hdr{background:${BLACK};display:flex;align-items:center;justify-content:space-between;padding:18px 40px;border-bottom:1px solid #222;position:sticky;top:0;z-index:20}
        .sd-logo{font-family:${head};font-style:italic;font-weight:900;font-size:30px;letter-spacing:1px;text-transform:uppercase;line-height:1;cursor:pointer}
        .sd-logo b{color:${ORANGE};font-weight:900}
        .sd-nav{display:flex;gap:28px;font-family:${head};font-weight:700;letter-spacing:1.8px;font-size:15px}
        .sd-nav a{color:#fff;text-decoration:none;cursor:pointer}
        .sd-nav a:hover{color:${ORANGE}}
        .sd-nav a.sale{color:${ORANGE}}
        .sd-icons{display:flex;gap:18px;align-items:center}
        .sd-cartbtn{background:none;border:1px solid #333;color:#fff;border-radius:999px;padding:8px 14px;font-family:${head};font-weight:700;letter-spacing:1.4px;cursor:pointer;font-size:14px}
        .sd-hero{position:relative;display:grid;grid-template-columns:1.05fr 1fr;min-height:660px;background:#000;overflow:hidden}
        .sd-hero-txt{padding:72px 40px 56px 40px;position:relative;z-index:2;display:flex;flex-direction:column;justify-content:center}
        .sd-script{font-family:${script};color:${GREEN};font-size:clamp(34px,5vw,64px);line-height:1;transform:rotate(-3deg);margin:0 0 6px;text-shadow:0 0 18px rgba(125,255,58,.35)}
        .sd-h1{font-family:${head};font-weight:900;font-style:italic;font-size:clamp(48px,7.4vw,108px);line-height:.92;margin:0;text-transform:uppercase;letter-spacing:-.5px}
        .sd-h1 em{color:${ORANGE};font-style:italic}
        .sd-sub{color:#b9b9bd;max-width:430px;line-height:1.55;margin:22px 0 28px;font-size:16px}
        .sd-btns{display:flex;gap:14px;flex-wrap:wrap}
        .sd-btn{font-family:${head};font-weight:800;letter-spacing:1.6px;font-size:16px;padding:16px 28px;border-radius:2px;cursor:pointer;text-transform:uppercase;border:2px solid ${ORANGE}}
        .sd-btn.p{background:${ORANGE};color:#111}
        .sd-btn.o{background:transparent;color:#fff;border-color:#fff}
        .sd-btn:hover{filter:brightness(1.1)}
        .sd-badges{display:flex;gap:26px;margin-top:38px;flex-wrap:wrap}
        .sd-badge{display:flex;gap:10px;align-items:center;font-family:${head};font-weight:700;letter-spacing:1.2px;font-size:13px;text-transform:uppercase;color:#d8d8dc}
        .sd-badge i{width:30px;height:30px;border:1.5px solid ${ORANGE};border-radius:50%;display:grid;place-items:center;color:${ORANGE};font-style:normal;font-size:14px}
        .sd-hero-img{position:relative}
        .sd-hero-img img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:60% 40%}
        .sd-hero-img:before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#000 0%,rgba(0,0,0,.55) 22%,rgba(0,0,0,0) 55%);z-index:1}
        .sd-count{position:absolute;right:28px;bottom:24px;z-index:2;font-family:${head};font-weight:700;letter-spacing:2px;color:#fff}
        .sd-count b{color:${ORANGE}}
        .sd-cats{background:${LIGHT};color:${INK};padding:64px 40px}
        .sd-sec{font-family:${head};font-weight:900;font-style:italic;font-size:clamp(32px,4vw,48px);text-transform:uppercase;text-align:center;margin:0 0 6px;letter-spacing:.5px}
        .sd-sec.l{color:#fff}
        .sd-sec span{color:${ORANGE}}
        .sd-secsub{text-align:center;color:#77777c;margin:0 0 34px;font-size:15px}
        .sd-catgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;max-width:1240px;margin:0 auto}
        .sd-cat{position:relative;aspect-ratio:3/4;background:radial-gradient(circle at 50% 38%,#4a4a52,#141416 78%);overflow:hidden;cursor:pointer;border-radius:2px;color:#fff}
        .sd-cat img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;padding:10% 8% 24%;transition:transform .4s}
        .sd-cat img.cover{object-fit:cover;padding:0;opacity:.88}
        .sd-cat:hover img{transform:scale(1.06)}
        .sd-cat:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 55%,rgba(0,0,0,.85));pointer-events:none}
        .sd-cat .t{position:absolute;left:18px;right:18px;bottom:16px;z-index:2;display:flex;justify-content:space-between;align-items:flex-end}
        .sd-cat .t b{font-family:${head};font-size:26px;font-weight:800;letter-spacing:1px;text-transform:uppercase;font-style:italic}
        .sd-cat .t u{text-decoration:none;color:${ORANGE};font-family:${head};font-weight:700;font-size:14px;letter-spacing:1.5px}
        .sd-cat .tag{position:absolute;top:14px;left:16px;z-index:2;font-family:${script};color:${GREEN};font-size:22px;transform:rotate(-4deg)}
        .sd-new{background:#0f0f11;padding:64px 40px 56px}
        .sd-track{display:grid;grid-auto-flow:column;grid-auto-columns:calc((100% - 5*18px)/6);gap:18px;max-width:1360px;margin:0 auto;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding-bottom:6px}
        .sd-track::-webkit-scrollbar{display:none}
        .sd-prod{scroll-snap-align:start;background:#17171a;border:1px solid #232327;display:flex;flex-direction:column}
        .sd-prod .ph{aspect-ratio:1/1;display:grid;place-items:center;padding:12px;background:radial-gradient(circle at 50% 40%,#4a4a52,#1b1b1e 75%)}
        .sd-prod .ph img{max-width:100%;max-height:100%;object-fit:contain;filter:drop-shadow(0 14px 14px rgba(0,0,0,.55))}
        .sd-prod .in{padding:14px 14px 16px;display:flex;flex-direction:column;gap:4px;flex:1}
        .sd-prod .c{font-family:${head};color:${ORANGE};font-weight:700;letter-spacing:1.4px;font-size:12px;text-transform:uppercase}
        .sd-prod .n{font-weight:600;font-size:14px;line-height:1.3}
        .sd-prod .p{font-family:${head};font-size:22px;font-weight:800;margin-top:auto;padding-top:8px}
        .sd-add{margin-top:8px;background:#fff;color:#111;border:0;font-family:${head};font-weight:800;letter-spacing:1.2px;font-size:14px;padding:11px;cursor:pointer;text-transform:uppercase}
        .sd-add:hover{background:${ORANGE}}
        .sd-dots{display:flex;gap:8px;justify-content:center;margin-top:24px}
        .sd-dots button{width:9px;height:9px;border-radius:50%;border:0;background:#3a3a40;cursor:pointer;padding:0}
        .sd-dots button.on{background:${ORANGE}}
        .sd-sale{background:${ORANGE};color:#111;position:relative;overflow:hidden;display:grid;grid-template-columns:1fr auto;align-items:center;gap:20px;padding:46px 40px;min-height:230px}
        .sd-sale h3{margin:0;font-family:${head};font-weight:900;font-style:italic;font-size:clamp(34px,5.4vw,76px);line-height:.95;text-transform:uppercase}
        .sd-sale p{margin:10px 0 0;font-weight:600;max-width:520px}
        .sd-smile{width:170px;height:170px;background:#111;border-radius:50%;padding:22px;box-shadow:0 0 40px rgba(0,0,0,.35)}
        .sd-cult{background:${BLACK};padding:68px 40px}
        .sd-cultgrid{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;max-width:1300px;margin:30px auto 34px}
        .sd-cultgrid .ph{position:relative;aspect-ratio:3/4;overflow:hidden;background:#17171a}
        .sd-cultgrid .ph img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s}
        .sd-cultgrid .ph:hover img{transform:scale(1.05)}
        .sd-rev{background:${LIGHT};color:${INK};padding:64px 40px}
        .sd-revgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;max-width:1100px;margin:0 auto}
        .sd-card{background:#fff;padding:26px;border-radius:2px;box-shadow:0 8px 24px rgba(0,0,0,.06)}
        .sd-stars{color:${ORANGE};letter-spacing:3px;font-size:16px}
        .sd-card p{line-height:1.6;color:#44444a;margin:12px 0 16px;font-size:15px}
        .sd-card b{font-family:${head};letter-spacing:1.4px;text-transform:uppercase;font-size:15px}
        .sd-brands{background:#fff;color:#111;padding:30px 40px;display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;align-items:center}
        .sd-brands span{font-family:${head};font-weight:800;font-size:24px;letter-spacing:3px;opacity:.55;font-style:italic}
        .sd-foot{background:#070708;padding:58px 40px 30px;display:grid;grid-template-columns:1.2fr 1fr 1fr 1.2fr;gap:36px;border-top:1px solid #1d1d20}
        .sd-foot h4{font-family:${head};letter-spacing:1.8px;margin:0 0 14px;font-size:16px;text-transform:uppercase}
        .sd-foot a{display:block;color:#a8a8ad;text-decoration:none;margin:8px 0;font-size:14px;cursor:pointer}
        .sd-foot a:hover{color:${ORANGE}}
        .sd-news{display:flex;margin-top:12px}
        .sd-news input{flex:1;min-width:0;background:#141416;border:1px solid #2a2a2e;color:#fff;padding:13px;font-size:14px;outline:none}
        .sd-news button{background:${ORANGE};border:0;color:#111;font-family:${head};font-weight:800;letter-spacing:1.2px;padding:0 18px;cursor:pointer}
        .sd-app{display:flex;gap:10px;margin-top:16px;flex-wrap:wrap}
        .sd-app span{border:1px solid #333;border-radius:8px;padding:8px 12px;font-size:12px;color:#ddd;line-height:1.2}
        .sd-copy{grid-column:1/-1;border-top:1px solid #1d1d20;padding-top:20px;color:#77777c;font-size:13px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px}
        @media(max-width:980px){
          .sd-top{padding:8px 16px;font-size:11px}.sd-top span:nth-child(3),.sd-top span:nth-child(4){display:none}
          .sd-hdr{padding:14px 16px}.sd-nav{display:none}.sd-logo{font-size:24px}
          .sd-hero{grid-template-columns:1fr;min-height:0}
          .sd-hero-img{order:-1;height:430px}
          .sd-hero-img:before{background:linear-gradient(180deg,rgba(0,0,0,0) 45%,#000 100%)}
          .sd-hero-txt{padding:10px 20px 40px}
          .sd-cats,.sd-new,.sd-cult,.sd-rev{padding:44px 16px}
          .sd-catgrid{grid-template-columns:repeat(2,1fr);gap:12px}
          .sd-track{grid-auto-columns:62%}
          .sd-sale{grid-template-columns:1fr;padding:34px 20px}.sd-smile{width:110px;height:110px;padding:14px}
          .sd-cultgrid{grid-template-columns:repeat(2,1fr)}
          .sd-cultgrid .ph:nth-child(5){grid-column:1/-1;aspect-ratio:4/3}
          .sd-revgrid{grid-template-columns:1fr}
          .sd-brands{padding:24px 16px;justify-content:center}.sd-brands span{font-size:18px}
          .sd-foot{grid-template-columns:minmax(0,1fr) minmax(0,1fr);padding:40px 16px 24px}.sd-foot>div:nth-child(1),.sd-foot>div:nth-child(4){grid-column:1/-1}
          .sd-cat .t b{font-size:19px}.sd-cat .t u{display:none}.sd-cat .tag{font-size:17px}
          .sd-copy{flex-direction:column}.sd-sale{min-height:0}
        }
      `}</style>

      <div className="sd-top">
        <span>Frete grátis acima de R$ 150</span>
        <span>Drop novo toda sexta</span>
        <span>Nossas lojas</span>
        <span>Ajuda</span>
      </div>

      <header className="sd-hdr">
        <div className="sd-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          {first} {rest && <b>{rest}</b>}
        </div>
        <nav className="sd-nav">
          {nav.map(([l, id]) => <a key={l} onClick={() => go(id)}>{l}</a>)}
          <a className="sale" onClick={() => go("sale")}>OFERTAS</a>
        </nav>
        <div className="sd-icons">
          <button className="sd-cartbtn" onClick={() => window.open(wa(`Olá! Quero fazer um pedido na ${brand}.`), "_blank")}>SACOLA ({cart})</button>
        </div>
      </header>

      <section className="sd-hero">
        <div className="sd-hero-txt">
          <p className="sd-script">Domine as ruas</p>
          <h1 className="sd-h1">Feito pro<br /><em>Movimento</em></h1>
          <p className="sd-sub">Tênis novos, fits limpos e essenciais de rua. Tudo pra você se destacar e se mover com confiança.</p>
          <div className="sd-btns">
            <button className="sd-btn p" onClick={() => go("novidades")}>Ver lançamentos</button>
            <button className="sd-btn o" onClick={() => go("cultura")}>Explorar looks</button>
          </div>
          <div className="sd-badges">
            <div className="sd-badge"><i>✓</i>100% original</div>
            <div className="sd-badge"><i>↺</i>Troca fácil</div>
            <div className="sd-badge"><i>🔒</i>Compra segura</div>
          </div>
        </div>
        <div className="sd-hero-img">
          <img src="/st-hero.jpg" alt="Modelo agachado em frente a um muro de grafite com tênis laranja e branco" />
          <div className="sd-count"><b>01</b> / 03</div>
        </div>
      </section>

      <section className="sd-cats" id="categorias">
        <h2 className="sd-sec">Compre por <span>categoria</span></h2>
        <p className="sd-secsub">Ache seu fit, ache seu estilo.</p>
        <div className="sd-catgrid">
          <div className="sd-cat" onClick={() => go("novidades")}>
            <img src="/st-sneaker.webp" alt="Tênis" />
            <div className="t"><b>Tênis</b><u>VER →</u></div>
          </div>
          <div className="sd-cat" onClick={() => go("novidades")}>
            <span className="tag">Seja você</span>
            <img src="/st-hoodie-black.webp" alt="Moletons" />
            <div className="t"><b>Moletons</b><u>VER →</u></div>
          </div>
          <div className="sd-cat" onClick={() => go("novidades")}>
            <img src="/st-cap.webp" alt="Acessórios" />
            <div className="t"><b>Acessórios</b><u>VER →</u></div>
          </div>
          <div className="sd-cat" onClick={() => go("cultura")}>
            <img className="cover" src="/st-l3.jpg" alt="Camisetas" style={{ objectPosition: "30% 40%" }} />
            <div className="t"><b>Camisetas</b><u>VER →</u></div>
          </div>
        </div>
      </section>

      <section className="sd-new" id="novidades">
        <h2 className="sd-sec l">Novos <span>lançamentos</span></h2>
        <p className="sd-secsub" style={{ color: "#8d8d93" }}>Drops fresquinhos. Quantidade limitada.</p>
        <div className="sd-track" ref={track} onScroll={(e) => {
          const el = e.currentTarget; const c = el.children[0] as HTMLElement | undefined;
          if (c) setSlide(Math.min(PRODUCTS.length - 1, Math.round(el.scrollLeft / (c.offsetWidth + 18))));
        }}>
          {PRODUCTS.map((p) => (
            <article className="sd-prod" key={p.name}>
              <div className="ph"><img src={p.img} alt={p.name} loading="lazy" /></div>
              <div className="in">
                <span className="c">{p.cat}</span>
                <span className="n">{p.name}</span>
                <span className="p">R$ {p.price}</span>
                <button className="sd-add" onClick={() => { setCart((n) => n + 1); window.open(wa(`Olá! Quero o ${p.name} (R$ ${p.price}).`), "_blank"); }}>Adicionar</button>
              </div>
            </article>
          ))}
        </div>
        <div className="sd-dots">
          {PRODUCTS.map((p, i) => <button key={p.name} aria-label={`Produto ${i + 1}`} className={i === slide ? "on" : ""} onClick={() => scrollTo(i)} />)}
        </div>
      </section>

      <section className="sd-sale" id="sale">
        <div>
          <h3>Até 40% off<br />em estilos selecionados</h3>
          <p>Por tempo limitado. Enquanto durar o estoque.</p>
          <div className="sd-btns" style={{ marginTop: 22 }}>
            <button className="sd-btn" style={{ background: "#111", color: "#fff", borderColor: "#111" }} onClick={() => go("novidades")}>Ver ofertas</button>
          </div>
        </div>
        <div className="sd-smile"><Smiley /></div>
      </section>

      <section className="sd-cult" id="cultura">
        <h2 className="sd-sec l">Mais que uma marca.<br /><span>É uma cultura.</span></h2>
        <div className="sd-cultgrid">
          {[["/st-l1.jpg", "50% 30%"], ["/st-l3.jpg", "50% 40%"], ["/st-l5.jpg", "60% 50%"], ["/st-l2.jpg", "50% 35%"], ["/st-l4.jpg", "50% 60%"]].map(([src, pos], i) => (
            <div className="ph" key={src}><img src={src} alt={`Estilo de rua ${i + 1}`} loading="lazy" style={{ objectPosition: pos }} /></div>
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <button className="sd-btn p" onClick={() => window.open(wa("Olá! Quero entrar pro District."), "_blank")}>Entre pro District</button>
        </div>
      </section>

      <section className="sd-rev">
        <h2 className="sd-sec">O que nossos <span>clientes</span> dizem</h2>
        <p className="sd-secsub">Gente de verdade. Estilo de verdade.</p>
        <div className="sd-revgrid">
          {REVIEWS.map((r) => (
            <div className="sd-card" key={r.name}>
              <div className="sd-stars">★★★★★</div>
              <p>{r.text}</p>
              <b>{r.name}</b>
            </div>
          ))}
        </div>
      </section>

      <div className="sd-brands" id="marcas">
        {BRANDS.map((b) => <span key={b}>{b}</span>)}
      </div>

      <footer className="sd-foot">
        <div>
          <div className="sd-logo" style={{ fontSize: 26 }}>{first} {rest && <b>{rest}</b>}</div>
          <p style={{ color: "#8d8d93", fontSize: 14, lineHeight: 1.6, maxWidth: 260 }}>Streetwear, tênis e essenciais pro dia a dia de quem não para.</p>
        </div>
        <div>
          <h4>Loja</h4>
          <a onClick={() => go("novidades")}>Lançamentos</a>
          <a onClick={() => go("categorias")}>Tênis</a>
          <a onClick={() => go("categorias")}>Roupas</a>
          <a onClick={() => go("sale")}>Ofertas</a>
        </div>
        <div>
          <h4>Ajuda</h4>
          <a onClick={() => window.open(wa("Olá! Preciso de ajuda com um pedido."), "_blank")}>Fale conosco</a>
          <a>Entregas</a>
          <a>Trocas</a>
          <a>Nossas lojas</a>
        </div>
        <div>
          <h4>Entre pro District</h4>
          <div style={{ color: "#8d8d93", fontSize: 14 }}>Receba os drops e as ofertas em primeira mão.</div>
          <div className="sd-news">
            <input placeholder="Seu e-mail" aria-label="E-mail" />
            <button onClick={() => window.open(wa("Olá! Me coloca na lista de drops."), "_blank")}>ENTRAR</button>
          </div>
          <div className="sd-app"><span>Baixe na<br /><b>App Store</b></span><span>Disponível no<br /><b>Google Play</b></span></div>
        </div>
        <div className="sd-copy"><span>© {brand}. Todos os direitos reservados.</span><span>Privacidade · Termos</span></div>
      </footer>
    </div>
  );
}
