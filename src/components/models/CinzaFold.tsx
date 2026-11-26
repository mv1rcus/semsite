import { useEffect, useState } from "react";

/** Atelie de ceramica novo, construido do zero a partir de um pin grafite ("Author's Ceramics"): hero escuro em degrade com titulo fino em caixa alta e botao de contorno, grupo de jarras sobre mesa branca, secoes Pecas, Aulas e Filosofia. Fotos reais (Gemini). Reserva de aula que fecha no WhatsApp. */
const BG = "#1f1f1f", BG2 = "#272727", LT = "#efeeec", MU = "#9a9894", CL = "#c9a58a";
const PECAS = [
  { t: "Jarra de mesa", d: "Grês cinza, esmalte fosco, 1 litro. Torneada e queimada a 1280 °C.", p: "R$ 190" },
  { t: "Vaso garrafa", d: "Branco gelo, 32 cm. Vem em trio ou avulso.", p: "R$ 240" },
  { t: "Caneca de grês", d: "Esmalte cinza com borda aparente, 320 ml.", p: "R$ 95" },
];
const AULAS = [
  { t: "Torno, iniciante", d: "Quatro encontros de duas horas. Centrar, abrir e levantar a peça.", w: "Terças e quintas, 19h" },
  { t: "Modelagem à mão", d: "Placas, roletes e beliscado. Sem torno, com esmalte no fim.", w: "Sábados, 10h" },
  { t: "Oficina de esmaltes", d: "Testes de cor e queima. Para quem já torneia.", w: "Primeiro domingo do mês" },
];

export function CinzaFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Ateliê Cinza";
  const city = client?.city?.trim() || "Belo Horizonte";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [au, setAu] = useState(0);
  const [nome, setNome] = useState("");
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const base = `https://wa.me/${num}`;
  const wa = `${base}?text=${encodeURIComponent(`Oi! Quero reservar uma vaga na aula "${AULAS[au]?.t ?? ""}" no ${brand}.${nome.trim() ? ` Meu nome é ${nome.trim()}.` : ""}`)}`;
  const buy = `${base}?text=${encodeURIComponent(`Oi! Quero ver as peças do ${brand}.`)}`;

  return (
    <div className="cz" style={{ fontFamily: "'Source Sans 3', system-ui, sans-serif", color: LT, background: "#5d5d5b", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@200;300;400&display=swap');
        .cz *{box-sizing:border-box}.cz a,.cz button,.cz input{font-family:inherit}
        .cz h1,.cz h2,.cz h3{font-family:'Source Sans 3',system-ui,sans-serif!important;font-weight:300!important;letter-spacing:.12em!important;text-transform:uppercase!important;margin:0;text-wrap:balance}
        .cz .stage{position:relative;max-width:1240px;margin:0 auto;padding:0 20px 60px;display:grid;grid-template-columns:42% 58%;background:#5d5d5b}
        .cz .left{background:#2a2826;margin-right:-6%;padding-bottom:30px;position:relative;z-index:1;align-self:start}
        .cz .right{position:relative;z-index:2;margin-top:44px;background:#e9e9e8;color:#2b2b2b;box-shadow:0 20px 60px rgba(0,0,0,.45);align-self:start;margin-left:6%}
        .cz .lab{font-size:11px;letter-spacing:.24em;color:${MU};text-transform:uppercase;margin-bottom:14px}
        .cz .left .blk{padding:44px 40px 0}
        .cz .left h2{font-size:18px;color:#e9e7e4;margin-bottom:6px}
        .cz .car{position:relative;height:230px;margin-top:18px;background:#1a1a1a url(/cinza-vasos.webp) center 80%/cover no-repeat}
        .cz .car:after{content:"";position:absolute;right:0;top:0;bottom:0;width:21%;background:#1a1a1a url(/cinza-copo.webp) center/cover no-repeat;border-left:1px solid #2a2927}
        .cz .dots{z-index:2;display:flex;gap:6px;position:absolute;left:50%;bottom:10px;transform:translateX(-50%)}.cz .dots i{width:4px;height:4px;border-radius:50%;background:#fff;opacity:.5}.cz .dots i:first-child{opacity:1}
        .cz .pcs{margin-top:18px}.cz .pc{display:flex;justify-content:space-between;gap:16px;border-top:1px solid #3c3a37;padding:12px 0}
        .cz .pc h3{font-size:12px;letter-spacing:.14em;color:#e9e7e4}.cz .pc p{font-size:12px;line-height:1.55;color:#a9a7a3;margin:4px 0 0;font-weight:300;letter-spacing:0}.cz .pc b{font-weight:300;letter-spacing:.1em;color:${CL};font-size:12px;white-space:nowrap}
        .cz .more{display:inline-flex;gap:12px;align-items:center;margin-top:20px;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#d8d6d2;text-decoration:none;cursor:pointer}.cz .more:after{content:"";width:46px;border-top:1px solid #d8d6d2}
        .cz .mc{position:relative;margin-top:44px;min-height:470px;background:#1a1a1a url(/cinza-torno.webp) center/cover no-repeat;padding:36px 40px}
        .cz .mc:before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(20,20,20,.8),rgba(20,20,20,.55) 50%,rgba(20,20,20,.75))}
        .cz .mc>*{position:relative}
        .cz .mc h2{font-size:18px}
        .cz .al{list-style:none;margin:16px 0 0;padding:0}.cz .al li{border-top:1px solid rgba(255,255,255,.2);padding:10px 0;cursor:pointer}
        .cz .al li b{display:block;font-weight:300;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#bdbbb7}.cz .al li.on b{color:#fff}
        .cz .al li span{display:none;font-size:12px;line-height:1.55;color:#d0cecb;margin-top:6px;font-weight:300}.cz .al li.on span{display:block}.cz .al li em{display:none;font-style:normal;font-size:11px;letter-spacing:.1em;color:${CL};margin-top:4px}.cz .al li.on em{display:block}
        .cz .fm{display:flex;gap:10px;margin-top:16px;flex-wrap:wrap}.cz .fm input{flex:1;min-width:130px;background:transparent;border:0;border-bottom:1px solid #8a8985;color:#fff;padding:8px 2px;font-size:13px;outline:none}
        .cz .btn{display:inline-block;border:1px solid #cfcdc9;color:#f1f0ee;background:transparent;font-size:10px;letter-spacing:.2em;text-transform:uppercase;padding:11px 22px;text-decoration:none;cursor:pointer}
        .cz .btn:hover{background:#f1f0ee;color:#1f1f1f}
        .cz .we{display:grid;grid-template-columns:1fr 150px;gap:24px;padding:44px 40px 10px;align-items:end}
        .cz .we p{font-size:12px;line-height:1.6;color:#a9a7a3;font-weight:300;margin:10px 0 0}
        .cz .we .ph{height:190px;background:#161616 url(/cinza-caneca.webp) center/cover no-repeat}
        .cz nav.top{position:absolute;top:0;left:0;right:0;z-index:5;display:flex;align-items:center;justify-content:space-between;padding:22px 34px;font-size:8px;letter-spacing:.1em;text-transform:uppercase}
        .cz nav.top .links{display:flex;gap:16px}.cz nav.top a{color:#d8d6d2;text-decoration:none;cursor:pointer;padding-bottom:3px;border-bottom:1px solid transparent}.cz nav.top a.on{border-color:#d8d6d2;color:#fff}
        .cz nav.top .lg{font-weight:300;color:#fff;font-size:9px}.cz .burger{display:none;background:none;border:0;color:#fff;font-size:26px;cursor:pointer}
        .cz .mob{position:fixed;inset:0;z-index:20;background:#1b1b1b;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:30px;font-size:15px;letter-spacing:.2em;text-transform:uppercase}.cz .mob a{color:#fff;cursor:pointer}
        .cz .hero{position:relative;color:#f3f2f0;background:linear-gradient(180deg,#2d2e30 0,#2d2e30 43%,rgba(45,46,48,0) 64%),url(/cinza-hero.webp) 45% 100%/135% auto no-repeat,#e9e9e8;padding:150px 0 0}
        .cz .hero .in{padding:0 12%;position:relative;z-index:2}
        .cz .hero h1{font-size:clamp(24px,2.8vw,34px);color:#f3f2f0;line-height:1.15}
        .cz .hero p{margin:12px 0 22px;font-size:11px;letter-spacing:.04em;color:#bdbbb7;font-weight:300}
        .cz .hero .btn{font-size:9px;padding:9px 20px}
        .cz .hero .pic{height:0;padding-bottom:76%;margin-top:-10px}
        .cz .fil{padding:34px 12% 46px}
        .cz .fil h2{font-size:clamp(22px,2.6vw,30px);color:#3a3a39;margin-bottom:26px}
        .cz .fil .cols{display:grid;grid-template-columns:1fr 1fr;gap:34px}.cz .fil p{font-size:12px;line-height:1.7;color:#5a5a58;font-weight:300;margin:0}
        .cz .fil .more{color:#3a3a39}.cz .fil .more:after{border-color:#3a3a39}
        .cz footer{background:#2a2826;padding:22px 20px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:${MU}}.cz footer .wrap{max-width:1200px;margin:0 auto;display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap}
        .cz .wa{position:fixed;right:22px;bottom:22px;width:56px;height:56px;border-radius:50%;background:#25d366;display:flex;align-items:center;justify-content:center;z-index:15;box-shadow:0 8px 22px rgba(0,0,0,.4)}
        @media(max-width:860px){
          .cz .stage{grid-template-columns:1fr;padding:0;background:#2a2826;display:flex;flex-direction:column}
          .cz .right{order:1;margin:0;box-shadow:none}.cz .left{order:2;margin:0}
          .cz nav.top{padding:18px 20px;font-size:10px}.cz nav.top .links{display:none}.cz .burger{display:block}
          .cz .hero{padding-top:110px}.cz .hero .in{padding:0 24px}.cz .fil{padding:30px 24px 40px}.cz .fil .cols{grid-template-columns:1fr;gap:18px}
          .cz .left .blk,.cz .we{padding-left:24px;padding-right:24px}.cz .mc{padding:30px 24px}.cz .car{height:200px}
        }
      `}</style>

      {menu && <div className="mob"><a onClick={() => go("pecas")}>Peças</a><a onClick={() => go("aulas")}>Aulas</a><a onClick={() => go("filosofia")}>Filosofia</a><a onClick={() => go("sobre")}>Sobre</a><a onClick={() => setMenu(false)}>Fechar ×</a></div>}

      <div className="stage" id="top">
        <aside className="left">
          <div className="blk" id="pecas">
            <div className="lab">Peças</div>
            <h2>Feitas à mão, uma por vez</h2>
            <div className="car" role="img" aria-label="Três vasos de cerâmica branca sobre mesa"><div className="dots"><i /><i /><i /><i /></div></div>
            <div className="pcs">{PECAS.map((p) => <div className="pc" key={p.t}><div><h3>{p.t}</h3><p>{p.d}</p></div><b>{p.p}</b></div>)}</div>
            <a className="more" href={buy} target="_blank" rel="noreferrer">Ir para a loja</a>
          </div>

          <div className="mc" id="aulas">
            <div className="lab">Aulas</div>
            <h2>Aulas de torno</h2>
            <ul className="al">{AULAS.map((a, i) => <li key={a.t} className={au === i ? "on" : ""} onClick={() => setAu(i)}><b>{a.t}</b><span>{a.d}</span><em>{a.w}</em></li>)}</ul>
            <div className="fm"><input aria-label="Seu nome" placeholder="Seu nome" value={nome} onChange={(e) => setNome(e.target.value)} /><a className="btn" href={wa} target="_blank" rel="noreferrer">Reservar vaga</a></div>
          </div>

          <div className="we" id="sobre">
            <div>
              <div className="lab">Somos</div>
              <h2>Marca e mãos</h2>
              <p>O {brand} é um ateliê pequeno em {city}. Torneamos, esmaltamos e queimamos tudo no próprio forno, e cada peça sai com a marca do ateliê no fundo.</p>
              <div style={{ marginTop: 18 }}><a className="btn" href={base} target="_blank" rel="noreferrer">Falar com o ateliê</a></div>
            </div>
            <div className="ph" role="img" aria-label="Mão segurando caneca de grês" />
          </div>
        </aside>

        <main className="right">
          <header className="hero">
            <nav className="top">
              <div className="links"><a className="on" onClick={() => go("top")}>Início</a><a onClick={() => go("filosofia")}>Filosofia</a><a onClick={() => go("pecas")}>Peças</a><a onClick={() => go("aulas")}>Aulas</a><a onClick={() => go("sobre")}>Sobre</a></div>
              <div className="lg">{brand.toUpperCase()}</div>
              <button className="burger" onClick={() => setMenu(true)} aria-label="Menu">≡</button>
            </nav>
            <div className="in">
              <h1>{brand}</h1>
              <p>O melhor presente para você e para quem você ama.</p>
              <a className="btn" href={buy} target="_blank" rel="noreferrer">Comprar agora</a>
            </div>
            <div className="pic" role="img" aria-label="Jarras de cerâmica sobre mesa branca" />
          </header>
          <section className="fil" id="filosofia">
            <h2>Filosofia</h2>
            <div className="cols">
              <p>Trabalhamos de um jeito improvisado, e cada peça é um novo começo. Da escultura ao uso diário, a argila deixa espaço para a forma que a mão encontra.</p>
              <p>Cerâmica é tato, beleza e subjetividade, e carrega o que a gente sente. Ela deixa lugar para interpretação e dá forma à urgência de imaginar.</p>
            </div>
            <a className="more" style={{ marginTop: 26 }} onClick={() => go("sobre")}>Sobre nós</a>
          </section>
        </main>
      </div>

      <footer><div className="wrap"><span>{brand} · {city}</span><span>Quinta a sábado, 10h às 18h</span></div></footer>
      {sc && <a className="wa" href={base} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg></a>}
    </div>
  );
}
