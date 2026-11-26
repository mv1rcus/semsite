import { useEffect, useState } from "react";

/** Loja Black Friday nova, construida do zero a partir de um pin preto e amarelo-limao ("Nuvora"): hero com BLACK FRIDAY gigante (segunda linha em amarelo), sacola em foto sobre rochas, contagem regressiva real, banner 70% off em cunha amarela, cartoes de categoria, destaques com selo de desconto e faixa de confianca. Fotos reais (Gemini); todo texto e HTML. Compra fecha no WhatsApp. */
const Y = "#e8ff2a", BG = "#050505", CD = "#0f0f0f", LN = "#1d1d1d", MU = "#a3a3a3";
const DEALS = [
  { n: "Fone com cancelamento de ruído", p: "R$ 299", o: "R$ 999", d: "70%", img: "/bf-fone2.webp" },
  { n: "Smartwatch Pro", p: "R$ 399", o: "R$ 999", d: "60%", img: "/bf-watch.webp" },
  { n: "Difusor de aroma", p: "R$ 199", o: "R$ 399", d: "50%", img: "/bf-difusor.webp" },
  { n: "Tênis do dia a dia", p: "R$ 449", o: "R$ 749", d: "40%", img: "/bf-tenis.webp" },
];
const END = () => { const d = new Date(); d.setDate(d.getDate() + 1); d.setHours(23, 59, 59, 0); return d.getTime(); };
const pad = (n: number) => String(n).padStart(2, "0");

export function BlackFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Nuvora";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [end] = useState(END);
  const [now, setNow] = useState(() => Date.now());
  const [cart, setCart] = useState<string[]>([]);
  const [fav, setFav] = useState<string[]>([]);
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  useEffect(() => { const f = () => setSc(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const left = Math.max(0, end - now);
  const dd = Math.floor(left / 864e5), hh = Math.floor(left / 36e5) % 24, mm = Math.floor(left / 6e4) % 60, ss = Math.floor(left / 1e3) % 60;
  const base = `https://wa.me/${num}`;
  const wa = (t: string) => `${base}?text=${encodeURIComponent(t)}`;
  const order = wa(cart.length ? `Oi! Quero comprar na Black Friday da ${brand}: ${cart.join(", ")}.` : `Oi! Quero ver as ofertas da Black Friday da ${brand}.`);
  const tog = (n: string) => setCart((c) => (c.includes(n) ? c.filter((x) => x !== n) : [...c, n]));

  return (
    <div className="bf" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: "#fff", background: BG, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .bf *{box-sizing:border-box}.bf a,.bf button{font-family:inherit}
        .bf h1,.bf h2,.bf h3{font-family:'Plus Jakarta Sans',system-ui,sans-serif!important;font-weight:800!important;text-transform:none!important;margin:0}
        .bf .w{max-width:1160px;margin:0 auto;padding:0 28px}
        .bf .nav{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:24px 0;font-size:13px;font-weight:500}
        .bf .lg{font-weight:700;letter-spacing:.3em;font-size:14px;text-transform:uppercase}
        .bf .lk{display:flex;gap:34px}.bf .lk a{color:#e8e8e8;text-decoration:none;cursor:pointer;padding-bottom:6px;border-bottom:1px solid transparent}.bf .lk a.on{border-color:${Y}}
        .bf .rt{display:flex;gap:18px;align-items:center;justify-self:end}.bf .rt .pill{padding:10px 20px;font-size:12px}
        .bf .pill{display:inline-flex;align-items:center;gap:10px;background:${Y};color:#000;border:0;border-radius:99px;padding:14px 26px;font-weight:700;font-size:14px;text-decoration:none;cursor:pointer}
        .bf .burger{display:none;background:none;border:0;color:#fff;font-size:24px}
        .bf .hero{position:relative;min-height:640px;background:#000 url(/bf-hero.webp) right bottom/auto 100% no-repeat}
        .bf .hero:after{content:"";position:absolute;left:0;top:0;bottom:0;width:60%;background:linear-gradient(90deg,#000 50%,rgba(0,0,0,0));z-index:1}
        .bf .hero .w{position:relative;z-index:2}
        .bf .kick{margin-top:34px;font-size:10px;letter-spacing:.3em;color:#cfcfcf;text-transform:uppercase}
        .bf .hero h1{font-size:clamp(64px,10.4vw,128px);line-height:.92;letter-spacing:-.045em!important;margin-top:18px}.bf .hero h1 span{display:block}.bf .hero h1 span+span{color:${Y}}
        .bf .hero p{font-size:16px;line-height:1.55;color:#e4e4e4;margin:26px 0 28px;max-width:300px}
        .bf .tag{position:absolute;z-index:3;right:14%;top:230px;width:96px;height:130px;background:${Y};color:#000;clip-path:polygon(50% 0,100% 12%,100% 100%,0 100%,0 12%);transform:rotate(18deg);display:flex;flex-direction:column;align-items:center;justify-content:center;font-weight:800;line-height:.95;text-align:center}
        .bf .tag small{font-size:11px}.bf .tag b{font-size:30px;letter-spacing:-.03em}
        .bf .strip{display:grid;grid-template-columns:1fr 1.15fr;gap:14px;margin-top:18px}
        .bf .box{background:${CD};border:1px solid ${LN};border-radius:16px;padding:20px 26px}
        .bf .cd{display:flex;align-items:center;gap:26px}.bf .cd .l{font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:#cfcfcf;display:block;margin-bottom:12px}
        .bf .cd .g{display:flex}.bf .cd .g div{padding:0 22px;border-left:1px solid ${LN};text-align:center}.bf .cd .g div:first-child{border:0;padding-left:0}.bf .cd b{display:block;font-size:30px;font-weight:700;font-variant-numeric:tabular-nums}.bf .cd small{font-size:11px;color:${MU}}
        .bf .tr{display:flex;align-items:center;gap:30px}.bf .tr div{display:flex;align-items:center;gap:14px;font-size:11px;color:${MU};line-height:1.4}.bf .tr b{display:block;color:#fff;font-size:10px;letter-spacing:.06em;text-transform:uppercase}
        .bf .mid{display:grid;grid-template-columns:1.2fr 1fr;gap:14px;margin-top:14px}
        .bf .big{position:relative;border-radius:20px;overflow:hidden;background:#111 url(/bf-fone.webp) right bottom/auto 100% no-repeat;min-height:340px}
        .bf .big .y{position:absolute;left:0;top:0;bottom:0;width:62%;background:${Y};clip-path:polygon(0 0,100% 0,78% 100%,0 100%);padding:34px 30px;color:#000}
        .bf .big .y small{font-weight:700;font-size:16px;display:block}.bf .big .y h2{font-size:clamp(60px,7.6vw,92px);line-height:.88;letter-spacing:-.05em!important;margin:8px 0 0}
        .bf .big .y p{font-size:11px;margin:20px 0 0;font-weight:500}.bf .big .go{position:absolute;left:150px;top:230px;width:46px;height:46px;border-radius:50%;border:1.5px solid #000;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:3}
        .bf .big .bd{position:absolute;right:14px;top:14px;width:54px;height:54px;border-radius:50%;background:#000;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center;text-align:center;line-height:1.1}
        .bf .cats{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:14px}
        .bf .ct{position:relative;border:1px solid ${LN};border-radius:16px;background:${CD} center/cover no-repeat;padding:18px 20px;min-height:150px;cursor:pointer;overflow:hidden}
        .bf .ct:first-child{grid-column:1/3}.bf .ct h3{font-size:15px;font-weight:600!important;letter-spacing:0!important}.bf .ct small{display:block;font-size:11px;color:${MU};margin-top:4px}
        .bf .ct i{position:absolute;left:20px;bottom:18px;width:30px;height:30px;border:1px solid #444;border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:12px}
        .bf .ft{padding-top:50px}.bf .hd{display:flex;justify-content:space-between;align-items:flex-end}.bf .hd .lab{font-size:9px;letter-spacing:.26em;text-transform:uppercase;color:#bdbdbd;margin-bottom:10px}
        .bf .hd h2{font-size:clamp(28px,3.3vw,38px);line-height:1.08;letter-spacing:-.03em!important}.bf .hd a{color:${Y};font-size:13px;font-weight:600;cursor:pointer}
        .bf .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:24px}
        .bf .pd{position:relative;background:${CD};border:1px solid ${LN};border-radius:16px;padding:12px 12px 16px}
        .bf .pd .off{position:absolute;left:10px;top:10px;background:${Y};color:#000;border-radius:7px;font-size:10px;font-weight:700;padding:5px 9px;z-index:2}
        .bf .pd .hr{position:absolute;right:12px;top:10px;font-size:15px;cursor:pointer;z-index:2}.bf .pd .hr.on{color:${Y}}
        .bf .pd .im{height:180px;background-size:contain;background-position:center;background-repeat:no-repeat;margin-bottom:12px}
        .bf .pd h3{font-size:12px;font-weight:500!important;color:#d6d6d6}.bf .pd .pr{margin:6px 0 14px;font-size:19px;font-weight:700}.bf .pd .pr s{font-size:11px;color:#6d6d6d;margin-left:8px;font-weight:500}
        .bf .pd button{width:100%;background:${Y};color:#000;border:0;border-radius:99px;padding:12px;font-weight:700;font-size:13px;cursor:pointer}.bf .pd button.on{background:#2a2e05;color:${Y}}
        .bf .bar{margin-top:36px;border-top:1px solid ${LN};padding:26px 0 40px;display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap}
        .bf .bar .st{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:#cfcfcf}.bf .bar .st div{margin-top:8px;font-size:12px;letter-spacing:0;text-transform:none;color:${MU}}.bf .bar .st b{color:${Y};font-size:14px;letter-spacing:2px}
        .bf .bar .it{display:flex;gap:12px;align-items:center;font-size:11px;color:${MU};line-height:1.4}.bf .bar .it b{display:block;color:#fff;font-size:12px}
        .bf .mob{position:fixed;inset:0;z-index:30;background:#000;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:26px;font-size:24px;font-weight:700}.bf .mob a{color:#fff;cursor:pointer}
        .bf .wa{position:fixed;right:20px;bottom:20px;width:56px;height:56px;border-radius:50%;background:#25d366;display:flex;align-items:center;justify-content:center;z-index:15;box-shadow:0 8px 22px rgba(0,0,0,.5)}
        @media(max-width:900px){
          .bf .w{padding:0 16px}.bf .lk,.bf .rt .pill{display:none}.bf .burger{display:block}.bf .nav{grid-template-columns:1fr auto}.bf .nav .lk{display:none}
          .bf .hero{min-height:760px;background-size:auto 56%;background-position:right bottom}.bf .hero:after{width:100%;background:linear-gradient(180deg,#000 40%,rgba(0,0,0,0))}.bf .tag{right:6%;top:420px;width:78px;height:106px}.bf .tag b{font-size:24px}
          .bf .strip,.bf .mid{grid-template-columns:1fr}.bf .cd{flex-direction:column;align-items:flex-start;gap:14px}.bf .tr{flex-direction:column;align-items:flex-start;gap:14px}
          .bf .grid{grid-template-columns:1fr 1fr;gap:10px}.bf .pd .im{height:130px}.bf .big{min-height:300px}
        }
      `}</style>
      {menu && <div className="mob"><a onClick={() => go("ofertas")}>Ofertas</a><a onClick={() => go("destaques")}>Destaques</a><a href={order} target="_blank" rel="noreferrer">Comprar</a><a onClick={() => setMenu(false)}>Fechar ×</a></div>}

      <header className="hero" id="top">
        <div className="w">
          <div className="nav">
            <div className="lg">{brand}</div>
            <nav className="lk"><a className="on" onClick={() => go("top")}>Loja</a><a onClick={() => go("ofertas")}>Categorias</a><a onClick={() => go("destaques")}>Ofertas</a><a href={base} target="_blank" rel="noreferrer">Sobre</a></nav>
            <div className="rt"><span style={{ fontSize: 17 }}>⌕</span><a className="pill" href={order} target="_blank" rel="noreferrer">Ver ofertas →</a><button className="burger" aria-label="Menu" onClick={() => setMenu(true)}>≡</button></div>
          </div>
          <div className="kick">A maior liquidação do ano</div>
          <h1 aria-label="Black Friday"><span>BLACK</span><span>FRIDAY</span></h1>
          <p>Ofertas imbatíveis nos seus produtos favoritos. Só por tempo limitado.</p>
          <a className="pill" onClick={() => go("destaques")}>Ver todas as ofertas →</a>
        </div>
        <div className="tag"><small>ATÉ</small><b>70%</b><small>OFF</small></div>
      </header>

      <div className="w">
        <div className="strip">
          <div className="box cd"><div><span className="l">A liquidação termina em</span><div className="g"><div><b>{pad(dd)}</b><small>Dias</small></div><div><b>{pad(hh)}</b><small>Horas</small></div><div><b>{pad(mm)}</b><small>Minutos</small></div><div><b>{pad(ss)}</b><small>Segundos</small></div></div></div></div>
          <div className="box tr"><div><span style={{ fontSize: 20 }}>🚚</span><span><b>Frete grátis</b>Em compras acima de R$ 250</span></div><div><span style={{ fontSize: 20 }}>▢</span><span><b>Troca fácil</b>Sem burocracia em até 30 dias</span></div></div>
        </div>

        <div className="mid" id="ofertas">
          <div className="big"><div className="y"><small>ATÉ</small><h2>70%<br />OFF</h2><p>Grandes marcas. Estoque limitado.</p></div><span className="go" onClick={() => go("destaques")}>→</span><span className="bd">MELHOR<br />OFERTA</span></div>
          <div className="cats">
            <div className="ct" style={{ backgroundImage: "url(/bf-laptop.webp)" }}><h3>Tech e gadgets</h3><small>Até 70% off</small><i>→</i></div>
            <div className="ct" style={{ backgroundImage: "url(/bf-casa.webp)" }}><h3>Casa</h3><small>Até 60% off</small><i>→</i></div>
            <div className="ct" style={{ backgroundImage: "url(/bf-oculos.webp)" }}><h3>Estilo e acessórios</h3><small>Até 50% off</small><i>→</i></div>
          </div>
        </div>

        <section className="ft" id="destaques">
          <div className="hd"><div><div className="lab">Ofertas em destaque</div><h2>Não perca estes<br />mais vendidos.</h2></div><a onClick={() => window.open(order, "_blank")}>Ver todos →</a></div>
          <div className="grid">{DEALS.map((p) => (
            <div className="pd" key={p.n}>
              <span className="off">{p.d} OFF</span><span className={`hr${fav.includes(p.n) ? " on" : ""}`} onClick={() => setFav((f) => (f.includes(p.n) ? f.filter((x) => x !== p.n) : [...f, p.n]))}>{fav.includes(p.n) ? "♥" : "♡"}</span>
              <div className="im" style={{ backgroundImage: `url(${p.img})` }} /><h3>{p.n}</h3><div className="pr">{p.p}<s>{p.o}</s></div>
              <button className={cart.includes(p.n) ? "on" : ""} onClick={() => tog(p.n)}>{cart.includes(p.n) ? "No carrinho ✓" : "Adicionar ao carrinho"}</button>
            </div>))}</div>
          {cart.length > 0 && <div style={{ marginTop: 18, textAlign: "right" }}><a className="pill" href={order} target="_blank" rel="noreferrer">Finalizar no WhatsApp ({cart.length}) →</a></div>}
        </section>

        <div className="bar">
          <div className="st">Aprovada por milhares<div><b>★★★★★</b> 4,8/5 em mais de 10 mil avaliações</div></div>
          <div className="it"><span style={{ fontSize: 22 }}>⛨</span><span><b>Pagamento seguro</b>Compra 100% protegida</span></div>
          <div className="it"><span style={{ fontSize: 22 }}>🚚</span><span><b>Frete grátis</b>Acima de R$ 250</span></div>
          <div className="it"><span style={{ fontSize: 22 }}>▢</span><span><b>Troca fácil</b>Política de 30 dias</span></div>
        </div>
      </div>
      {sc && <a className="wa" href={base} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 32 32" fill="#fff"><path d="M16 3a13 13 0 0 0-11 19.800L3 29l6.400-1.900A13 13 0 1 0 16 3zm0 2.400a10.600 10.600 0 1 1-5.400 19.700l-.4-.2-3.800 1.100 1.100-3.700-.3-.4A10.600 10.600 0 0 1 16 5.400zm-4 5.300c-.3 0-.7.100-1 .5-.4.400-1.300 1.300-1.300 3.100s1.300 3.600 1.500 3.900c.2.200 2.600 4.100 6.400 5.600 3.200 1.200 3.800 1 4.500.9.700-.1 2.200-.9 2.500-1.800.3-.9.300-1.600.2-1.800-.1-.2-.3-.3-.7-.5l-2.300-1.100c-.3-.1-.5-.2-.8.200l-1 1.200c-.2.300-.4.300-.8.100-.4-.2-1.500-.6-2.900-1.800-1.100-1-1.800-2.200-2-2.500-.2-.4 0-.6.200-.8l.6-.7c.2-.2.200-.4.400-.6.100-.3.100-.5 0-.7l-1-2.400c-.3-.6-.5-.5-.8-.5z" /></svg></a>}
    </div>
  );
}
