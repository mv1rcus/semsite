import { useEffect, useState } from "react";

/** Vitrine de moda automobilistica ("Velocity Club"), feita a partir de um pin preto e vermelho: hero com piloto na arquibancada, faixas diagonais, produtos em destaque, tecido, colecao de pista, vida de corrida e newsletter. */
const RD = "#e10d1c", BK = "#0a0a0b", LT = "#e9eaed";
const PROD = [
  { n: "Jaqueta Race Team", p: "R$ 1.249", img: "/velocity-jaqueta.webp" },
  { n: "Polo Pit Lane", p: "R$ 449", img: "/velocity-polo.webp" },
  { n: "Moletom Track", p: "R$ 649", img: "/velocity-moletom.webp" },
  { n: "Boné VC Racing", p: "R$ 249", img: "/velocity-bone.webp" },
];
const FEAT = ["Tecido respirável de alta performance", "Conforto que afasta o suor", "Leve e durável", "Caimento de pista"];

function Fi({ i }: { i: number }) {
  const p = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "#fff", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (i === 0) return <svg {...p}><path d="M3 8h10a2.5 2.5 0 1 0-2.5-2.5M3 12h15a2.5 2.5 0 1 1-2.5 2.5M3 16h8a2.5 2.5 0 1 1-2.5 2.5" /></svg>;
  if (i === 1) return <svg {...p}><path d="M12 3s6 6.2 6 10.5a6 6 0 0 1-12 0C6 9.200 12 3 12 3z" /></svg>;
  if (i === 2) return <svg {...p}><path d="M12 3l9 4.500-9 4.500-9-4.500zM3 12l9 4.500 9-4.500M3 16.500L12 21l9-4.500" /></svg>;
  return <svg {...p}><path d="M4 4h4v4H4zM12 4h4v4h-4zM8 8h4v4H8zM16 8h4v4h-4zM4 12h4v4H4zM12 12h4v4h-4zM8 16h4v4H8z" /></svg>;
}
function Flag({ s = 30 }: { s?: number }) {
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="#fff"><path d="M3 4h5v5H3zM13 4h5v5h-5zM8 9h5v5H8zM18 9h4v5h-4zM3 14h5v5H3zM13 14h5v5h-5z" /></svg>;
}

export function VelocityFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Velocity Club";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [cart, setCart] = useState<string[]>([]);
  const [mail, setMail] = useState("");
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const base = `https://wa.me/${num}`;
  const wa = (t: string) => `${base}?text=${encodeURIComponent(t)}`;
  const order = wa(cart.length ? `Oi! Quero comprar na ${brand}: ${cart.join(", ")}.` : `Oi! Quero ver a coleção da ${brand}.`);
  const tog = (n: string) => setCart((c) => (c.includes(n) ? c.filter((x) => x !== n) : [...c, n]));

  return (
    <div className="vc" style={{ fontFamily: "'Barlow', system-ui, sans-serif", color: "#fff", background: BK, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Exo+2:ital,wght@1,700;1,800&display=swap');
        .vc *{box-sizing:border-box}.vc a,.vc button,.vc input{font-family:inherit}
        .vc h1,.vc h2,.vc h3,.vc .lg,.vc .tt{font-family:'Exo 2',system-ui,sans-serif!important;font-style:italic!important;font-weight:800!important;text-transform:uppercase!important;letter-spacing:-.01em!important;margin:0;text-wrap:balance}
        .vc .w{max-width:1180px;margin:0 auto;padding:0 28px;position:relative}
        .vc .hero{position:relative;min-height:760px;overflow:hidden;background:#07070a}
        .vc .hero .ph{position:absolute;right:0;top:0;bottom:70px;width:68%;background:url(/velocity-hero.webp) 70% 42%/cover no-repeat;-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 34%);mask-image:linear-gradient(90deg,transparent 0,#000 34%)}
        .vc .hero .car{position:absolute;left:0;bottom:70px;width:44%;height:210px;background:url(/velocity-carro.webp) 50% 55%/cover no-repeat;-webkit-mask-image:linear-gradient(90deg,#000 55%,transparent),linear-gradient(0deg,transparent,#000 30%);-webkit-mask-composite:source-in;mask-composite:intersect;clip-path:polygon(0 0,100% 0,88% 100%,0 100%)}
        .vc .nav{position:relative;z-index:5;display:flex;align-items:center;justify-content:space-between;padding:22px 0;font-size:12px;font-weight:500;letter-spacing:.16em;text-transform:uppercase}
        .vc .lg{display:flex;align-items:center;gap:10px;font-size:19px;line-height:.95;max-width:130px}
        .vc .lk{display:flex;gap:44px}.vc .lk a{color:#fff;cursor:pointer}
        .vc .ic{display:flex;gap:22px;align-items:center}.vc .ic button{background:none;border:0;color:#fff;cursor:pointer;position:relative;padding:0}.vc .ic .n{position:absolute;top:-8px;right:-9px;background:${RD};border-radius:99px;font-size:10px;min-width:15px;height:15px;display:flex;align-items:center;justify-content:center}
        .vc .burger{display:none}
        .vc .hero .tx{position:relative;z-index:3;padding-top:34px;max-width:520px}
        .vc .kick{font-size:13px;letter-spacing:.22em;text-transform:uppercase;font-weight:500}
        .vc .hero h1{font-size:clamp(56px,7.6vw,96px);line-height:.92;margin-top:20px}.vc .hero h1 em{color:${RD};font-style:italic}
        .vc .hero p{font-size:15px;letter-spacing:.14em;text-transform:uppercase;line-height:1.7;margin:32px 0 30px;max-width:300px;border-top:1px solid #fff;padding-top:20px;font-weight:500}
        .vc .bt{display:inline-flex;align-items:center;gap:12px;background:${RD};color:#fff;padding:15px 28px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;font-weight:600;text-decoration:none;cursor:pointer;border:0;clip-path:polygon(0 0,100% 0,100% 100%,6% 100%)}
        .vc .band{position:relative;z-index:4;margin-top:-70px;height:130px;display:grid;grid-template-columns:42% 58%;overflow:hidden}
        .vc .band .a{background:url(/velocity-capacete.webp) 50% 40%/cover;filter:grayscale(1) contrast(1.1);clip-path:polygon(0 24%,100% 0,88% 100%,0 100%)}
        .vc .band .b{background:linear-gradient(100deg,#c40d1a,#8a0710);margin-left:-8%;padding:0 44px 0 12%;display:flex;align-items:center;justify-content:space-between;gap:20px;clip-path:polygon(8% 0,100% 0,100% 100%,0 100%)}
        .vc .band .tt{font-size:22px;line-height:1.1;max-width:180px}
        .vc .band ul{list-style:none;margin:0;padding:0 0 0 30px;border-left:1px solid rgba(255,255,255,.5);font-size:13px;letter-spacing:.16em;text-transform:uppercase;line-height:1.7}
        .vc .feat{background:${LT};color:#0a0a0b;padding:46px 0 52px;margin-top:-26px;position:relative;z-index:3;clip-path:polygon(0 24px,100% 0,100% 100%,0 100%);padding-top:64px}
        .vc .feat .w{display:grid;grid-template-columns:200px 1fr;gap:28px;align-items:center}
        .vc .feat h2{font-size:38px;line-height:.95;display:flex;flex-direction:column;gap:6px}
        .vc .feat p{font-size:13px;letter-spacing:.12em;text-transform:uppercase;line-height:1.6;margin:22px 0 0;color:#333}
        .vc .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
        .vc .pd{background:#d7d9de;position:relative;display:flex;flex-direction:column}.vc .pd .bm{flex:1}
        .vc .pd .im{height:196px;background-size:cover;background-position:center}
        .vc .pd .bm{background:#e9eaed;padding:12px 12px 12px;display:flex;justify-content:space-between;align-items:flex-end;margin:0}
        .vc .pd h3{font-size:12px!important;font-style:normal!important;font-weight:700!important;letter-spacing:.08em!important}
        .vc .pd .pr{font-weight:600;font-size:15px;margin-top:6px}
        .vc .pd button{background:${RD};border:0;color:#fff;width:34px;height:30px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px}.vc .pd button.on{background:#0a0a0b}
        .vc .mov{position:relative;background:#0b0b0c;min-height:250px;display:grid;grid-template-columns:1.2fr 1fr 1fr;align-items:center;overflow:hidden}
        .vc .mov .ph{position:absolute;left:0;top:0;bottom:0;width:48%;background:url(/velocity-jaqueta.webp) 12% 38%/190% auto;filter:contrast(1.15) saturate(1.2);-webkit-mask-image:linear-gradient(90deg,#000 55%,transparent);mask-image:linear-gradient(90deg,#000 55%,transparent)}
        .vc .mov .w{grid-column:1/4;display:grid;grid-template-columns:1.2fr 1fr 1fr;align-items:center;padding-top:34px;padding-bottom:34px}
        .vc .mov h2{grid-column:2;font-size:clamp(34px,4vw,48px);line-height:1}.vc .mov h2 em{color:${RD}}
        .vc .mov ul{list-style:none;margin:0;padding:0;display:grid;gap:14px;grid-column:3;font-size:11px;letter-spacing:.14em;text-transform:uppercase;font-weight:500}
        .vc .mov li{display:flex;gap:14px;align-items:center}
        .vc .trk{position:relative;min-height:300px;background:linear-gradient(100deg,#9c0813 0,#c40d1a 50%,#111 100%);overflow:hidden;display:flex;align-items:center}
        .vc .trk .ph{position:absolute;right:0;top:0;bottom:0;width:66%;background:url(/velocity-curva.webp) 40% 60%/cover;clip-path:polygon(14% 0,100% 0,100% 100%,0 100%);-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 20%);mask-image:linear-gradient(90deg,transparent 0,#000 20%)}
        .vc .trk .w{width:100%}.vc .trk .tx{position:relative;z-index:2;max-width:470px}
        .vc .trk .nd{font-size:11px;letter-spacing:.2em;color:#ff7480;text-transform:uppercase}
        .vc .trk h2{font-size:clamp(38px,4.6vw,58px);line-height:.98;margin:8px 0 14px}
        .vc .trk p{font-size:12px;letter-spacing:.14em;text-transform:uppercase;line-height:1.7;margin:0 0 22px;max-width:260px}
        .vc .trk .wb{display:inline-block;background:#fff;color:#0a0a0b;padding:13px 24px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;font-weight:600;text-decoration:none;cursor:pointer}
        .vc .trk .cb{position:absolute;right:48px;bottom:48px;z-index:3;background:${RD};padding:14px 26px;text-align:center;clip-path:polygon(8% 0,100% 0,92% 100%,0 100%);font-size:11px;letter-spacing:.2em;text-transform:uppercase}.vc .trk .cb b{display:block;font-family:'Exo 2';font-style:italic;font-size:26px;letter-spacing:0}
        .vc .life{background:${LT};color:#0a0a0b;padding:54px 0}
        .vc .life .w{display:grid;grid-template-columns:200px 1fr;gap:28px;align-items:center}
        .vc .life h2{font-size:38px;line-height:.95}.vc .life h2 em{color:${RD};display:block}
        .vc .life .lp{font-size:12px;letter-spacing:.12em;text-transform:uppercase;line-height:1.6;color:#333;margin-top:22px}
        .vc .cards{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
        .vc .cd{position:relative;height:190px;overflow:hidden;background-size:cover;background-position:center;cursor:pointer}
        .vc .cd:after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(0,0,0,.78),transparent 55%)}
        .vc .cd span{position:absolute;left:14px;bottom:12px;z-index:2;color:#fff;font-size:11px;letter-spacing:.14em;text-transform:uppercase;font-weight:600}
        .vc .nl{position:relative;min-height:180px;display:flex;align-items:center;background:#0a0a0b;overflow:hidden}
        .vc .nl .fl{position:absolute;left:0;top:0;bottom:0;width:36%;background:repeating-conic-gradient(#fff 0 25%,#111 0 50%) 0 0/54px 54px;clip-path:polygon(0 0,100% 0,78% 100%,0 100%);opacity:.92}
        .vc .nl .w{display:grid;grid-template-columns:36% 1fr 1fr;gap:30px;align-items:center;padding-top:30px;padding-bottom:30px;width:100%}
        .vc .nl h2{font-size:26px;line-height:1.05}.vc .nl h2 em{color:${RD};display:block}.vc .nl p{font-size:11px;letter-spacing:.12em;text-transform:uppercase;line-height:1.7;margin:12px 0 0}
        .vc .nl form{display:flex;border:1px solid #fff}.vc .nl input{flex:1;min-width:0;background:transparent;border:0;color:#fff;padding:14px 16px;font-size:13px;outline:none}.vc .nl form button{background:${RD};border:0;color:#fff;width:54px;cursor:pointer;font-size:16px}
        .vc footer{background:#050506;padding:22px 0;font-size:12px;color:#8c8c94}.vc footer .w{display:flex;justify-content:space-between;gap:12px}
        .vc .wa{position:fixed;right:20px;bottom:20px;width:54px;height:54px;border-radius:50%;background:#25d366;display:flex;align-items:center;justify-content:center;z-index:50}
        .vc .mn{display:none}
        @media(max-width:860px){
          .vc .lk,.vc .ic .h{display:none}.vc .burger{display:block}.vc .mn{display:flex;flex-direction:column;gap:14px;background:#111;padding:18px 28px;font-size:13px;letter-spacing:.14em;text-transform:uppercase;position:relative;z-index:6}
          .vc .w{padding:0 20px}.vc .hero{min-height:760px}
          .vc .hero{min-height:740px}.vc .hero .ph{width:100%;top:auto;bottom:70px;height:400px;background-position:74% 25%;-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 38%);mask-image:linear-gradient(180deg,transparent 0,#000 38%)}
          .vc .hero .car{display:none}.vc .hero h1{font-size:54px}.vc .hero p{margin:22px 0 24px}.vc .hero .tx{padding-top:14px}
          .vc .band{grid-template-columns:1fr;height:auto;margin-top:-70px}.vc .band .a{height:110px}.vc .band .b{margin:0;padding:22px 20px;clip-path:none;flex-direction:column;align-items:flex-start}.vc .band ul{border-left:0;padding-left:0}
          .vc .feat .w,.vc .life .w{grid-template-columns:1fr}.vc .grid{grid-template-columns:repeat(2,1fr)}.vc .pd .im{height:150px}
          .vc .mov .w{grid-template-columns:1fr;gap:22px;padding-top:150px}.vc .mov h2,.vc .mov ul{grid-column:1}.vc .mov .ph{width:100%;height:150px;bottom:auto;-webkit-mask-image:linear-gradient(180deg,#000 55%,transparent);mask-image:linear-gradient(180deg,#000 55%,transparent);background-size:cover;background-position:30% 35%}
          .vc .trk{min-height:420px;align-items:flex-start;padding:34px 0}.vc .trk .ph{width:100%;top:auto;height:55%;clip-path:none}.vc .trk .cb{right:20px;bottom:20px}
          .vc .cards{grid-template-columns:1fr}.vc .nl .w{grid-template-columns:1fr;padding-top:120px}.vc .nl .fl{width:100%;height:100px;bottom:auto;clip-path:none}
        }
      `}</style>

      <header className="hero">
        <div className="ph" role="img" aria-label="Homem de jaqueta vermelha olhando a arquibancada com a bandeira quadriculada" />
        <div className="car" role="img" aria-label="Carro de corrida vermelho derrapando na pista" />
        <div className="w">
          <div className="nav">
            <div className="lg"><Flag s={34} />{brand}</div>
            <div className="lk"><a onClick={() => go("shop")}>Loja</a><a onClick={() => go("shop")}>Coleções</a><a onClick={() => go("life")}>Sobre</a><a onClick={() => go("life")}>Diário</a></div>
            <div className="ic">
              <button className="h" aria-label="Buscar"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6"><circle cx="11" cy="11" r="6.500" /><path d="M16 16l4 4" /></svg></button>
              <button className="h" aria-label="Conta"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6"><circle cx="12" cy="8" r="4" /><path d="M4 21c1-5 15-5 16 0" /></svg></button>
              <button aria-label="Carrinho" onClick={() => window.open(order, "_blank")}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6"><path d="M5 7h14l-1.500 12h-11zM9 7a3 3 0 0 1 6 0" /></svg>{cart.length > 0 && <span className="n">{cart.length}</span>}</button>
              <button className="burger" aria-label="Menu" onClick={() => setMenu(!menu)}><svg width="24" height="24" viewBox="0 0 24 24" stroke="#fff" strokeWidth="1.8"><path d="M4 7h16M4 12h16M4 17h16" /></svg></button>
            </div>
          </div>
          {menu && <div className="mn"><a onClick={() => go("shop")}>Loja</a><a onClick={() => go("shop")}>Coleções</a><a onClick={() => go("life")}>Sobre</a><a onClick={() => go("life")}>Diário</a></div>}
          <div className="tx">
            <div className="kick">Moda automobilística premium</div>
            <h1>Vista<br />a <em>pista</em></h1>
            <p>Roupas de performance para quem vive em plena velocidade.</p>
            <a className="bt" onClick={() => go("shop")}>Ver a coleção →</a>
          </div>
        </div>
      </header>

      <div className="band">
        <div className="a" role="img" aria-label="Piloto de capacete" />
        <div className="b"><div className="tt">Streetwear inspirado nas pistas</div><ul><li>Jaquetas /</li><li>Polos /</li><li>Moletons /</li><li>Bonés /</li><li>Acessórios</li></ul></div>
      </div>

      <section className="feat" id="shop"><div className="w">
        <div><h2>Peças<span>em destaque</span></h2><p>Estilo de pista. Todo dia.</p></div>
        <div className="grid">{PROD.map((p) => (
          <div className="pd" key={p.n}>
            <div className="im" style={{ backgroundImage: `url(${p.img})` }} />
            <div className="bm"><div><h3>{p.n}</h3><div className="pr">{p.p}</div></div><button className={cart.includes(p.n) ? "on" : ""} aria-label={`Adicionar ${p.n}`} onClick={() => tog(p.n)}>{cart.includes(p.n) ? "✓" : "+"}</button></div>
          </div>))}</div>
      </div></section>

      <section className="mov"><div className="ph" role="img" aria-label="Detalhe do tecido vermelho e preto da jaqueta" /><div className="w">
        <span />
        <h2>Feito para <em>movimento</em></h2>
        <ul>{FEAT.map((f, i) => <li key={f}><Fi i={i} />{f}</li>)}</ul>
      </div></section>

      <section className="trk">
        <div className="ph" role="img" aria-label="Curva do autódromo ao pôr do sol" />
        <div className="w"><div className="tx">
          <div className="nd">Novidade</div>
          <h2>Coleção Pista</h2>
          <p>Inspirada nos circuitos mais icônicos do mundo.</p>
          <a className="wb" href={wa(`Oi! Quero ver a Coleção Pista da ${brand}.`)} target="_blank" rel="noreferrer">Ver a coleção →</a>
        </div></div>
        <div className="cb">Circuito 01<b>Monza</b></div>
      </section>

      <section className="life" id="life"><div className="w">
        <div><h2>A vida<em>de corrida</em></h2><div className="lp">Roupas, pessoas, circuitos, histórias.</div></div>
        <div className="cards">
          <div className="cd" style={{ backgroundImage: "url(/velocity-capacete.webp)", backgroundPosition: "55% 40%" }}><span>Histórias do time →</span></div>
          <div className="cd" style={{ backgroundImage: "url(/velocity-curva.webp)", backgroundPosition: "75% 40%" }}><span>Guia de circuitos →</span></div>
          <div className="cd" style={{ backgroundImage: "url(/velocity-bone.webp)" }}><span>Cuidados com a peça →</span></div>
        </div>
      </div></section>

      <section className="nl"><div className="fl" /><div className="w">
        <span />
        <div><h2>Entre para o <em>{brand}</em></h2><p>Lançamentos antecipados, peças exclusivas e experiências para membros.</p></div>
        <form onSubmit={(e) => { e.preventDefault(); window.open(wa(`Oi! Quero receber novidades da ${brand}. Meu e-mail: ${mail}`), "_blank"); }}><input aria-label="Seu e-mail" placeholder="Seu e-mail" value={mail} onChange={(e) => setMail(e.target.value)} /><button aria-label="Enviar">→</button></form>
      </div></section>

      <footer><div className="w"><span>© 2026 {brand}. Todos os direitos reservados.</span><span>Política de privacidade · Termos</span></div></footer>
      {sc && <a className="wa" href={base} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="28" height="28" viewBox="0 0 32 32" fill="#fff"><path d="M16 3a13 13 0 0 0-11 19.800L3 29l6.400-1.900A13 13 0 1 0 16 3zm0 2.400a10.600 10.600 0 1 1-5.600 19.600l-.4-.2-3.700 1.100 1.100-3.600-.3-.4A10.600 10.600 0 0 1 16 5.400z" /></svg></a>}
    </div>
  );
}
