import { useEffect, useState } from "react";

/** Loja de gadgets nova, construida do zero a partir de um pin escuro roxo neon ("TechMart"): hero com titulo grande (segunda linha em degrade roxo), relogio e fones sobre podio com anel neon, faixa de categorias, produtos em alta com preco, banner de oferta, diferenciais, blog e newsletter. Fotos reais (Gemini). Compra fecha no WhatsApp. */
const PU = "#8b3dff", PU2 = "#b44dff", BG = "#07060b", CARD = "#100e17", LN = "#1f1b2c", MU = "#a8a3b8";
const CATS = ["Celulares", "Notebooks", "Fones", "Relógios", "Câmeras", "Games"];
const PROD = [
  { n: "Celular Pro 256 GB", p: "R$ 5.499", o: "R$ 6.299", r: "4,8", c: "2,5 mil", img: "/tech-celular.webp" },
  { n: "Fones sem fio Pro 2", p: "R$ 1.199", o: "R$ 1.449", r: "4,7", c: "1,2 mil", img: "/tech-fones.webp" },
  { n: "Relógio Galaxy Fit", p: "R$ 1.799", o: "R$ 2.199", r: "4,8", c: "980", img: "/tech-relogio.webp" },
  { n: "Console 5 + controle", p: "R$ 3.699", o: "R$ 4.199", r: "4,8", c: "1,1 mil", img: "/tech-console.webp" },
];
const DIF = [["Qualidade premium", "Só marcas originais e com nota fiscal."], ["Frete rápido e grátis", "Entrega em todo o Brasil."], ["Pagamento seguro", "Pix, cartão e boleto."], ["Suporte 24/7", "Atendimento direto no WhatsApp."]];
const BLOG = [["20 out 2026", "10 notebooks para trabalho e estudo", "/tech-notebook.webp"], ["18 out 2026", "Melhores fones sem fio do ano", "/tech-fones2.webp"], ["15 out 2026", "O que o seu smartwatch faz por você", "/tech-relogio2.webp"]];

function Ic({ k }: { k: string }) {
  const p = { width: 26, height: 26, viewBox: "0 0 24 24", fill: "none", stroke: "#fff", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (k === "Celulares") return <svg {...p}><rect x="7" y="2.5" width="10" height="19" rx="2" /><path d="M11 18.5h2" /></svg>;
  if (k === "Notebooks") return <svg {...p}><rect x="4" y="5" width="16" height="11" rx="1.5" /><path d="M2 19h20" /></svg>;
  if (k === "Fones") return <svg {...p}><path d="M4 15v-3a8 8 0 0 1 16 0v3" /><rect x="3" y="14" width="4" height="6" rx="1.5" /><rect x="17" y="14" width="4" height="6" rx="1.5" /></svg>;
  if (k === "Relógios") return <svg {...p}><rect x="7" y="6" width="10" height="12" rx="3" /><path d="M9 6l.5-3h5l.5 3M9 18l.5 3h5l.5-3M12 10v2.5l1.5 1" /></svg>;
  if (k === "Câmeras") return <svg {...p}><path d="M3 8h4l1.5-2h7L17 8h4v11H3z" /><circle cx="12" cy="13.5" r="3.5" /></svg>;
  return <svg {...p}><rect x="2.5" y="7" width="19" height="10" rx="5" /><path d="M7 10v4M5 12h4M16 11h.01M18 13h.01" /></svg>;
}

function DIcon({ k }: { k: string }) {
  const p = { width: 28, height: 28, viewBox: "0 0 24 24", fill: "none", stroke: "#b06cff", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (/Frete/.test(k)) return <svg {...p}><path d="M2 6h12v10H2zM14 9h4l3 3v4h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></svg>;
  if (/Pagamento/.test(k)) return <svg {...p}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></svg>;
  if (/Suporte/.test(k)) return <svg {...p}><path d="M4 14v-2a8 8 0 0116 0v2" /><rect x="3" y="13" width="4" height="6" rx="1.5" /><rect x="17" y="13" width="4" height="6" rx="1.5" /><path d="M19 19c0 1.5-2 2.5-5 2.5" /></svg>;
  return <svg {...p}><path d="M6 3h12l4 6-10 12L2 9z" /><path d="M2 9h20M9 3l3 6 3-6M12 21L9 9M12 21l3-12" /></svg>;
}

export function TechFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "TechMart";
  const b1 = brand.length > 4 ? brand.slice(0, brand.length - 4) : brand;
  const b2 = brand.length > 4 ? brand.slice(-4) : "";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [cart, setCart] = useState<string[]>([]);
  const [fav, setFav] = useState<string[]>([]);
  const [mail, setMail] = useState("");
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const base = `https://wa.me/${num}`;
  const wa = (t: string) => `${base}?text=${encodeURIComponent(t)}`;
  const order = wa(cart.length ? `Oi! Quero comprar na ${brand}: ${cart.join(", ")}.` : `Oi! Quero ver as ofertas da ${brand}.`);
  const tog = (n: string) => setCart((c) => (c.includes(n) ? c.filter((x) => x !== n) : [...c, n]));

  return (
    <div className="tm" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: "#fff", background: BG, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .tm *{box-sizing:border-box}.tm a,.tm button,.tm input{font-family:inherit}
        .tm h1,.tm h2,.tm h3{font-family:'Plus Jakarta Sans',system-ui,sans-serif!important;font-weight:800!important;letter-spacing:-.02em!important;text-transform:none!important;margin:0}
        .tm .w{max-width:1180px;margin:0 auto;padding:0 28px}
        .tm .nav{display:flex;align-items:center;justify-content:space-between;padding:22px 0;font-size:13px;font-weight:500}
        .tm .lg{display:flex;align-items:center;gap:10px;font-weight:800;font-size:20px}.tm .lg svg{width:30px;height:30px}.tm .lg b{color:${PU2};font-weight:800}
        .tm .lk{display:flex;gap:30px}.tm .lk a{color:#e6e3f0;text-decoration:none;cursor:pointer;padding-bottom:6px;border-bottom:2px solid transparent}.tm .lk a.on{border-color:${PU};color:#fff}
        .tm .ic{display:flex;gap:18px;align-items:center}.tm .ic button{background:none;border:0;color:#fff;cursor:pointer;position:relative;padding:0}.tm .ic .n{position:absolute;top:-8px;right:-9px;background:${PU};border-radius:99px;font-size:9px;padding:1px 5px}
        .tm .burger{display:none}
        .tm .hero{position:relative;min-height:640px;padding-bottom:70px;overflow:hidden;background:radial-gradient(ellipse 50% 50% at 75% 40%,rgba(120,50,255,.28),transparent 70%),${BG}}
        .tm .hero:after{content:"";position:absolute;left:0;right:0;bottom:0;height:110px;background:linear-gradient(180deg,transparent,${BG});z-index:2;pointer-events:none}
        .tm .hero .tx{position:relative;z-index:3;padding-top:40px;max-width:640px}
        .tm .kick{display:flex;align-items:center;gap:14px;font-size:12px;font-weight:700;letter-spacing:.2em;text-transform:uppercase}.tm .kick:after{content:"";width:60px;border-top:1px solid ${PU}}
        .tm .hero h1{font-size:clamp(34px,4.3vw,58px);line-height:1.04;margin-top:26px}.tm .hero h1 em{white-space:nowrap}.tm .hero h1 em{font-style:normal;background:linear-gradient(90deg,#c55cff,#8b3dff);-webkit-background-clip:text;background-clip:text;color:transparent}
        .tm .hero p{font-size:16px;line-height:1.55;color:#d9d6e6;margin:22px 0 30px;max-width:380px}
        .tm .row{display:flex;gap:16px;align-items:center}
        .tm .bt{display:inline-flex;align-items:center;gap:10px;background:linear-gradient(180deg,#9a4dff,#7a2fe8);color:#fff;border:0;border-radius:99px;padding:14px 26px;font-weight:700;font-size:14px;text-decoration:none;cursor:pointer;box-shadow:0 8px 28px rgba(139,61,255,.45)}
        .tm .vd{display:inline-flex;align-items:center;gap:10px;border:1px solid #3a3550;background:rgba(255,255,255,.04);border-radius:99px;padding:13px 24px;font-weight:600;font-size:14px;color:#fff;text-decoration:none;cursor:pointer}.tm .vd i{width:26px;height:26px;border-radius:50%;border:1px solid #fff;display:flex;align-items:center;justify-content:center;font-size:9px;font-style:normal}
        .tm .stage{position:absolute;right:0;top:0;bottom:0;width:58%;z-index:1;background:url(/tech-hero.webp) right bottom/contain no-repeat;-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 30%);mask-image:linear-gradient(90deg,transparent 0,#000 30%)}
        .tm .cats{position:relative;z-index:4;display:grid;grid-template-columns:repeat(6,1fr);background:#0d0b14;border:1px solid ${LN};border-radius:20px;padding:22px 0;margin-top:0}
        .tm .cats div{display:flex;flex-direction:column;align-items:center;gap:10px;font-size:13px;font-weight:500;border-left:1px solid ${LN};cursor:pointer}.tm .cats div:first-child{border-left:0}
        .tm section{padding:54px 0 0}
        .tm .hd{display:flex;justify-content:space-between;align-items:flex-end;gap:16px}.tm .lab{display:flex;align-items:center;gap:12px;font-size:10px;letter-spacing:.22em;font-weight:700;text-transform:uppercase;margin-bottom:10px}.tm .lab:before{content:"";width:34px;border-top:1px solid ${PU}}
        .tm h2{font-size:clamp(24px,2.6vw,30px)}.tm h2 em{font-style:normal;color:${PU2}}.tm .all{color:${PU2};font-size:12px;font-weight:600;text-decoration:none;cursor:pointer}
        .tm .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:22px}
        .tm .pd{background:${CARD};border:1px solid ${LN};border-radius:18px;padding:14px 14px 16px;position:relative}
        .tm .pd .hr{position:absolute;right:12px;top:12px;width:30px;height:30px;border-radius:50%;background:#0b0911;border:1px solid ${LN};display:flex;align-items:center;justify-content:center;color:#fff;cursor:pointer;z-index:2;font-size:13px}.tm .pd .hr.on{color:${PU2}}
        .tm .pd .im{mix-blend-mode:screen;height:170px;background-size:contain;background-position:center;background-repeat:no-repeat;margin-bottom:12px}
        .tm .pd h3{font-size:14px;font-weight:700!important;letter-spacing:0!important}.tm .pd .pr{margin-top:8px;font-weight:800;font-size:20px}.tm .pd .pr s{white-space:nowrap;font-weight:500;font-size:12px;color:#716c82;margin-left:8px}
        .tm .pd .st{font-size:11px;color:${MU};margin:6px 0 12px}.tm .pd .st b{color:#ffc933}
        .tm .pd button{background:${PU};color:#fff;border:0;border-radius:9px;padding:9px 16px;font-size:12px;font-weight:700;cursor:pointer}.tm .pd button.on{background:#2b1d4a;color:#d9bfff}
        .tm .ban{margin-top:42px;border-radius:22px;border:1px solid #3a2a66;background:linear-gradient(110deg,#150f2a 0,#4a1fa8 60%,#6a2fe0 100%);display:grid;grid-template-columns:1.1fr 1fr;align-items:center;overflow:hidden;min-height:150px}
        .tm .ban .l{padding:26px 34px}.tm .ban .tg{display:inline-block;background:${PU};border-radius:99px;font-size:11px;font-weight:700;padding:6px 14px;margin-bottom:12px}
        .tm .ban h2{font-size:clamp(22px,2.6vw,32px)}.tm .ban h2 em{color:#c9a0ff}.tm .ban .wh{display:inline-block;margin-top:16px;background:#fff;color:#0b0911;border-radius:99px;padding:11px 22px;font-size:13px;font-weight:700;text-decoration:none;cursor:pointer}
        .tm .ban .r{height:100%;min-height:150px;background:url(/tech-banner.webp) right center/cover no-repeat;-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 38%);mask-image:linear-gradient(90deg,transparent 0,#000 38%)}
        .tm .why{display:grid;grid-template-columns:1fr 1.5fr;gap:40px;align-items:center}.tm .why p{font-size:13px;color:${MU};line-height:1.6;margin:10px 0 18px;max-width:260px}
        .tm .dg{display:grid;grid-template-columns:repeat(4,1fr)}.tm .dg div{border-left:1px solid ${LN};padding:6px 18px;align-items:flex-start;font-size:13px;font-weight:600;display:flex;flex-direction:column;gap:10px}.tm .dg small{font-weight:400;color:${MU};font-size:11px;line-height:1.5}
        .tm .bl{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:22px}
        .tm .bp{background:${CARD};border:1px solid ${LN};border-radius:16px;overflow:hidden}.tm .bp .im{height:120px;background-size:cover;background-position:center;position:relative}.tm .bp .im span{position:absolute;right:10px;top:10px;background:rgba(10,8,16,.85);border-radius:9px;font-size:10px;padding:5px 10px}
        .tm .bp div.t{padding:12px 14px 14px;font-size:13px;font-weight:600}.tm .bp div.t a{display:block;color:${PU2};font-size:11px;margin-top:8px}
        .tm .nl{margin-top:44px;border-radius:20px;border:1px solid #3a2a66;background:linear-gradient(100deg,#1a1033,#2a1260);display:grid;grid-template-columns:1.3fr 1fr;gap:20px;align-items:center;padding:26px 34px}
        .tm .nl h2{font-size:20px}.tm .nl p{font-size:12px;color:#c8bfe0;margin:6px 0 0}.tm .nl form{display:flex;gap:10px}.tm .nl input{flex:1;min-width:0;border:0;border-radius:99px;padding:13px 20px;font-size:12px;outline:none}
        .tm footer{margin-top:40px;border-top:1px solid ${LN};padding:28px 0;font-size:11px;color:${MU}}.tm footer .w{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;align-items:center}
        .tm .mob{position:fixed;inset:0;z-index:30;background:#07060b;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:26px;font-size:22px;font-weight:700}.tm .mob a{color:#fff;cursor:pointer}
        .tm .wa{position:fixed;right:20px;bottom:20px;width:56px;height:56px;border-radius:50%;background:#25d366;display:flex;align-items:center;justify-content:center;z-index:15;box-shadow:0 8px 22px rgba(0,0,0,.5)}
        @media(max-width:900px){
          .tm .w{padding:0 18px}.tm .lk,.tm .ic .hide{display:none}.tm .burger{display:block;font-size:24px}
          .tm .hero{min-height:760px;background:${BG}}.tm .hero .tx{padding-top:24px}.tm .stage{width:100%;top:auto;height:50%;background-position:center bottom;-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 30%);mask-image:linear-gradient(180deg,transparent 0,#000 30%)}.tm .pd .pr{font-size:17px}.tm .pd .pr s{margin-left:5px}
          .tm .cats{grid-template-columns:repeat(3,1fr);row-gap:20px}.tm .cats div:nth-child(4){border-left:0}
          .tm .grid{grid-template-columns:1fr 1fr;gap:10px}.tm .pd .im{height:130px}.tm .ban{grid-template-columns:1fr}.tm .ban .r{min-height:150px;-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 35%);mask-image:linear-gradient(180deg,transparent 0,#000 35%)}
          .tm .why{grid-template-columns:1fr}.tm .dg{grid-template-columns:1fr 1fr;row-gap:20px}.tm .bl{grid-template-columns:1fr}.tm .nl{grid-template-columns:1fr;padding:22px 18px}
        }
      `}</style>

      {menu && <div className="mob"><a onClick={() => go("prod")}>Loja</a><a onClick={() => go("oferta")}>Ofertas</a><a onClick={() => go("blog")}>Blog</a><a onClick={() => setMenu(false)}>Fechar ×</a></div>}

      <header className="hero" id="top">
        <div className="w">
          <div className="nav">
            <div className="lg"><svg viewBox="0 0 32 32" fill="none"><path d="M7 11h18l-1.500 16h-15z" fill="#8b3dff" /><path d="M12 11V9a4 4 0 0 1 8 0v2" stroke="#b44dff" strokeWidth="2" /><path d="M13 17c1 2 5 2 6 0" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" /></svg><span>{b1}<b>{b2}</b></span></div>
            <nav className="lk"><a className="on" onClick={() => go("top")}>Início</a><a onClick={() => go("prod")}>Loja</a><a onClick={() => go("prod")}>Categorias ⌄</a><a onClick={() => go("why")}>Sobre</a><a onClick={() => go("blog")}>Blog</a><a href={base} target="_blank" rel="noreferrer">Contato</a></nav>
            <div className="ic"><span className="hide">⌕</span><span className="hide">☺</span><button aria-label="Carrinho" onClick={() => window.open(order, "_blank")}>🛒<span className="n">{cart.length}</span></button><button className="burger" aria-label="Menu" onClick={() => setMenu(true)}>≡</button></div>
          </div>
          <div className="tx">
            <div className="kick">Tecnologia melhor. Vida melhor.</div>
            <h1>Descubra<br /><em>Os melhores gadgets</em><br />e eletrônicos</h1>
            <p>Atualize seu estilo de vida com tecnologia de ponta a preços imbatíveis.</p>
            <div className="row"><a className="bt" onClick={() => go("prod")}>Comprar agora →</a><a className="vd" href={base} target="_blank" rel="noreferrer"><i>▶</i>Ver vídeo</a></div>
          </div>
        </div>
        <div className="stage" role="img" aria-label="Relógio inteligente e fones sem fio sobre pódio com anel de neon roxo" />
      </header>

      <div className="w"><div className="cats">{CATS.map((c) => <div key={c} onClick={() => go("prod")}><Ic k={c} />{c}</div>)}</div></div>

      <section id="prod"><div className="w">
        <div className="hd"><div><div className="lab">Nossos produtos</div><h2>Gadgets em <em>alta</em></h2></div><a className="all" onClick={() => go("oferta")}>Ver todos →</a></div>
        <div className="grid">{PROD.map((p) => (
          <div className="pd" key={p.n}>
            <span className={`hr${fav.includes(p.n) ? " on" : ""}`} onClick={() => setFav((f) => (f.includes(p.n) ? f.filter((x) => x !== p.n) : [...f, p.n]))}>{fav.includes(p.n) ? "♥" : "♡"}</span>
            <div className="im" style={{ backgroundImage: `url(${p.img})` }} />
            <h3>{p.n}</h3><div className="pr">{p.p}<s>{p.o}</s></div>
            <div className="st"><b>★</b> {p.r} ({p.c} avaliações)</div>
            <button className={cart.includes(p.n) ? "on" : ""} onClick={() => tog(p.n)}>{cart.includes(p.n) ? "No carrinho ✓" : "Adicionar"}</button>
          </div>))}</div>
        {cart.length > 0 && <div style={{ marginTop: 18, textAlign: "right" }}><a className="bt" href={order} target="_blank" rel="noreferrer">Finalizar no WhatsApp ({cart.length}) →</a></div>}
      </div></section>

      <div className="w" id="oferta"><div className="ban">
        <div className="l"><span className="tg">Oferta por tempo limitado</span><h2>Até <em>50% off</em><br />nos seus gadgets favoritos</h2><a className="wh" href={wa(`Oi! Quero aproveitar a oferta da ${brand}.`)} target="_blank" rel="noreferrer">Ver oferta →</a></div>
        <div className="r" />
      </div></div>

      <section id="why"><div className="w why">
        <div><div className="lab">Por que nós</div><h2>Sua loja de gadgets de confiança</h2><p>Tecnologia de qualidade com atendimento que resolve.</p><a className="bt" href={base} target="_blank" rel="noreferrer">Saiba mais →</a></div>
        <div className="dg">{DIF.map(([t, d]) => <div key={t}><DIcon k={t ?? ""} />{t}</div>)}</div>
      </div></section>

      <section id="blog"><div className="w">
        <div className="hd"><div><div className="lab">Últimas do blog</div><h2>Fique por dentro da <em>tech</em></h2></div><a className="all">Ver artigos →</a></div>
        <div className="bl">{BLOG.map(([d, t, i]) => <div className="bp" key={t}><div className="im" style={{ backgroundImage: `url(${i})` }}><span>{d}</span></div><div className="t">{t}<a>Ler mais →</a></div></div>)}</div>
        <div className="nl"><div><h2>Assine nossa newsletter</h2><p>Receba ofertas, lançamentos e dicas de tecnologia.</p></div>
          <form onSubmit={(e) => { e.preventDefault(); window.open(wa(`Oi! Quero receber ofertas da ${brand}. Meu e-mail: ${mail}`), "_blank"); }}><input aria-label="Seu e-mail" placeholder="Seu e-mail" value={mail} onChange={(e) => setMail(e.target.value)} /><button className="bt" type="submit">Assinar</button></form></div>
      </div></section>

      <footer><div className="w"><span>© 2026 {brand}. Todos os direitos reservados.</span><span>Política de privacidade · Termos e condições</span></div></footer>
      {sc && <a className="wa" href={base} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 32 32" fill="#fff"><path d="M16 3a13 13 0 0 0-11 19.800L3 29l6.400-1.900A13 13 0 1 0 16 3zm0 2.400a10.600 10.600 0 1 1-5.400 19.700l-.4-.2-3.800 1.100 1.100-3.700-.3-.4A10.600 10.600 0 0 1 16 5.400zm-4 5.300c-.3 0-.7.100-1 .5-.4.400-1.300 1.300-1.300 3.100s1.300 3.600 1.500 3.900c.2.200 2.600 4.100 6.400 5.600 3.200 1.200 3.800 1 4.500.9.700-.1 2.200-.9 2.500-1.800.3-.9.300-1.600.2-1.800-.1-.2-.3-.3-.7-.5l-2.300-1.100c-.3-.1-.5-.2-.8.200l-1 1.200c-.2.300-.4.300-.8.100-.4-.2-1.500-.6-2.900-1.800-1.100-1-1.800-2.200-2-2.500-.2-.4 0-.6.200-.8l.6-.7c.2-.2.200-.4.400-.6.100-.3.100-.5 0-.7l-1-2.400c-.3-.6-.5-.5-.8-.5z" /></svg></a>}
    </div>
  );
}
