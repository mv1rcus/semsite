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
    <div className="cz" style={{ fontFamily: "'Source Sans 3', system-ui, sans-serif", color: LT, background: BG, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@200;300;400;600&display=swap');
        .cz *{box-sizing:border-box}.cz a,.cz button,.cz input{font-family:inherit}
        .cz h1,.cz h2,.cz h3{font-family:'Source Sans 3',system-ui,sans-serif!important;font-weight:300!important;letter-spacing:.14em!important;text-transform:uppercase!important;margin:0}
        .cz .wrap{max-width:1120px;margin:0 auto;padding:0 28px}
        .cz nav.top{position:absolute;top:0;left:0;right:0;z-index:5;display:flex;align-items:center;justify-content:space-between;padding:26px 48px;font-size:11px;letter-spacing:.16em;text-transform:uppercase}
        .cz nav.top .links{display:flex;gap:34px}.cz nav.top a{color:#d8d6d2;text-decoration:none;cursor:pointer;padding-bottom:3px;border-bottom:1px solid transparent}.cz nav.top a.on{border-color:#d8d6d2;color:#fff}
        .cz nav.top .lg{font-weight:300;color:#fff}.cz .burger{display:none;background:none;border:0;color:#fff;font-size:26px;cursor:pointer}
        .cz .mob{position:fixed;inset:0;z-index:20;background:#1b1b1b;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:30px;font-size:15px;letter-spacing:.2em;text-transform:uppercase}.cz .mob a{color:#fff;cursor:pointer}
        .cz .hero{position:relative;min-height:calc(56.25vw + 300px);background:#1c1c1c url(/cinza-hero.webp) center bottom/100% auto no-repeat;display:flex;flex-direction:column;justify-content:flex-start;padding-top:170px;text-align:left}
        .cz .hero:before{content:"";position:absolute;left:0;right:0;top:0;height:calc(100% - 56.25vw + 170px);background:linear-gradient(180deg,#1c1c1c 0,#1c1c1c calc(100% - 170px),rgba(28,28,28,0) 100%)}
        .cz .hero .in{position:relative;z-index:2;max-width:1120px;width:100%;margin:0 auto;padding:0 28px 0 15%}
        .cz .hero h1{font-size:clamp(30px,4.2vw,50px);color:#f3f2f0;line-height:1.1}
        .cz .hero p{margin:18px 0 28px;font-size:14px;letter-spacing:.06em;color:#bdbbb7;font-weight:300}
        .cz .btn{display:inline-block;border:1px solid #cfcdc9;color:#f1f0ee;background:transparent;font-size:11px;letter-spacing:.2em;text-transform:uppercase;padding:13px 26px;text-decoration:none;cursor:pointer}
        .cz .btn:hover{background:#f1f0ee;color:#1f1f1f}
        .cz section{padding:96px 0}
        .cz .lab{font-size:11px;letter-spacing:.24em;color:${MU};text-transform:uppercase;margin-bottom:16px}
        .cz h2{font-size:clamp(24px,3vw,34px);color:#f1f0ee}
        .cz .goods{background:${BG}}
        .cz .band{position:relative;margin-top:44px;height:520px;background:#222 url(/cinza-vasos.webp) center 85%/cover no-repeat}
        .cz .pcs{display:grid;grid-template-columns:repeat(3,1fr);gap:0;margin-top:0;border-top:1px solid #3a3a3a}
        .cz .pc{padding:30px 28px 34px 0;border-right:1px solid #333}.cz .pc:last-child{border-right:0}.cz .pc+.pc{padding-left:28px}
        .cz .pc h3{font-size:14px;letter-spacing:.16em;color:#f1f0ee}.cz .pc p{font-size:14px;line-height:1.6;color:#aaa8a4;margin:10px 0 14px;font-weight:300}.cz .pc b{font-weight:300;letter-spacing:.12em;color:${CL}}
        .cz .more{display:inline-flex;gap:14px;align-items:center;margin-top:34px;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#d8d6d2;text-decoration:none;cursor:pointer}.cz .more:after{content:"";width:60px;border-top:1px solid #d8d6d2}
        .cz .aulas{background:${BG2};padding:0}
        .cz .ag{display:grid;grid-template-columns:1.05fr 1fr;min-height:560px}
        .cz .ag .ph{background:#1a1a1a url(/cinza-torno.webp) center/cover no-repeat;min-height:420px}
        .cz .ag .tx{padding:80px 64px}
        .cz .al{list-style:none;margin:28px 0 0;padding:0}.cz .al li{border-top:1px solid #3d3d3d;padding:16px 0;cursor:pointer}.cz .al li:last-child{border-bottom:1px solid #3d3d3d}
        .cz .al li b{display:block;font-weight:300;font-size:14px;letter-spacing:.16em;text-transform:uppercase;color:#8f8d89}.cz .al li.on b{color:#fff}
        .cz .al li span{display:none;font-size:14px;line-height:1.6;color:#b4b2ae;margin-top:8px;font-weight:300}.cz .al li.on span{display:block}.cz .al li em{display:none;font-style:normal;font-size:12px;letter-spacing:.1em;color:${CL};margin-top:6px}.cz .al li.on em{display:block}
        .cz .fm{display:flex;gap:10px;margin-top:26px;flex-wrap:wrap}.cz .fm input{flex:1;min-width:180px;background:transparent;border:0;border-bottom:1px solid #6b6a67;color:#fff;padding:10px 2px;font-size:14px;outline:none}
        .cz .fil{display:grid;grid-template-columns:1fr 1fr;gap:64px;margin-top:40px}.cz .fil p{font-size:15px;line-height:1.75;color:#b4b2ae;font-weight:300;margin:0}
        .cz .sobre{background:${BG}}
        .cz .sg{display:grid;grid-template-columns:1fr 360px;gap:70px;align-items:center}
        .cz .sg .ph{aspect-ratio:3/4;background:#161616 url(/cinza-caneca.webp) center/cover no-repeat}
        .cz .sg p{font-size:15px;line-height:1.75;color:#b4b2ae;font-weight:300;margin:18px 0 0;max-width:520px}
        .cz footer{border-top:1px solid #333;padding:34px 0;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:${MU}}.cz footer .wrap{display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap}
        .cz .wa{position:fixed;right:22px;bottom:22px;width:56px;height:56px;border-radius:50%;background:#25d366;display:flex;align-items:center;justify-content:center;z-index:15;box-shadow:0 8px 22px rgba(0,0,0,.4)}
        @media(max-width:860px){
          .cz nav.top{padding:20px 22px}.cz nav.top .links{display:none}.cz .burger{display:block}
          .cz .hero{min-height:660px;padding-top:120px;background-size:200% auto;background-position:30% bottom}.cz .hero:before{height:calc(100% - 112vw + 120px);background:linear-gradient(180deg,#1c1c1c 0,#1c1c1c calc(100% - 120px),rgba(28,28,28,0) 100%)}.cz .hero .in{padding:0 24px}
          .cz section{padding:64px 0}.cz .pcs{grid-template-columns:1fr}.cz .pc,.cz .pc+.pc{padding:24px 0;border-right:0;border-bottom:1px solid #333}.cz .band{height:240px}
          .cz .ag{grid-template-columns:1fr}.cz .ag .ph{min-height:300px}.cz .ag .tx{padding:48px 24px}
          .cz .fil{grid-template-columns:1fr;gap:22px}.cz .sg{grid-template-columns:1fr;gap:34px}.cz .sg .ph{max-width:320px}
        }
      `}</style>

      {menu && <div className="mob"><a onClick={() => go("pecas")}>Peças</a><a onClick={() => go("aulas")}>Aulas</a><a onClick={() => go("filosofia")}>Filosofia</a><a onClick={() => go("sobre")}>Sobre</a><a onClick={() => setMenu(false)}>Fechar ×</a></div>}

      <header className="hero" id="top">
        <nav className="top">
          <div className="links"><a className="on" onClick={() => go("top")}>Início</a><a onClick={() => go("filosofia")}>Filosofia</a><a onClick={() => go("pecas")}>Peças</a><a onClick={() => go("aulas")}>Aulas</a><a onClick={() => go("sobre")}>Sobre</a><a href={base} target="_blank" rel="noreferrer">Contato</a></div>
          <div className="lg">{brand.toUpperCase()}</div>
          <button className="burger" onClick={() => setMenu(true)} aria-label="Menu">≡</button>
        </nav>
        <div className="in">
          <h1>{brand}</h1>
          <p>O melhor presente para você e para quem você ama.</p>
          <a className="btn" href={buy} target="_blank" rel="noreferrer">Comprar agora</a>
        </div>
      </header>

      <section className="goods" id="pecas">
        <div className="wrap">
          <div className="lab">Peças</div>
          <h2>Feitas à mão, uma por vez</h2>
        </div>
        <div className="band" role="img" aria-label="Três vasos de cerâmica branca sobre mesa" />
        <div className="wrap">
          <div className="pcs">{PECAS.map((p) => <div className="pc" key={p.t}><h3>{p.t}</h3><p>{p.d}</p><b>{p.p}</b></div>)}</div>
          <a className="more" href={buy} target="_blank" rel="noreferrer">Ir para a loja</a>
        </div>
      </section>

      <section className="aulas" id="aulas">
        <div className="ag">
          <div className="ph" role="img" aria-label="Mãos moldando argila no torno" />
          <div className="tx">
            <div className="lab">Aulas</div>
            <h2>Aulas de torno</h2>
            <ul className="al">{AULAS.map((a, i) => <li key={a.t} className={au === i ? "on" : ""} onClick={() => setAu(i)}><b>{a.t}</b><span>{a.d}</span><em>{a.w}</em></li>)}</ul>
            <div className="fm"><input aria-label="Seu nome" placeholder="Seu nome" value={nome} onChange={(e) => setNome(e.target.value)} /><a className="btn" href={wa} target="_blank" rel="noreferrer">Reservar vaga</a></div>
          </div>
        </div>
      </section>

      <section id="filosofia">
        <div className="wrap">
          <div className="lab">Filosofia</div>
          <h2>Nossa filosofia</h2>
          <div className="fil">
            <p>Trabalhamos de um jeito improvisado, e cada peça é um novo começo. Da escultura ao uso diário, a argila deixa espaço para a forma que a mão encontra.</p>
            <p>Cerâmica é tato, beleza e subjetividade, e carrega o que a gente sente. Ela deixa lugar para interpretação e dá forma à urgência de imaginar.</p>
          </div>
          <a className="more" onClick={() => go("sobre")}>Sobre nós</a>
        </div>
      </section>

      <section className="sobre" id="sobre">
        <div className="wrap sg">
          <div>
            <div className="lab">Somos</div>
            <h2>Marca e mãos</h2>
            <p>O {brand} é um ateliê pequeno em {city}. Torneamos, esmaltamos e queimamos tudo no próprio forno. As peças saem com a marca do ateliê no fundo, uma a uma.</p>
            <p>Quer entender como uma jarra nasce? Venha numa aula, ou passe no ateliê às quintas e veja o forno aberto.</p>
            <div style={{ marginTop: 30 }}><a className="btn" href={base} target="_blank" rel="noreferrer">Falar com o ateliê</a></div>
          </div>
          <div className="ph" role="img" aria-label="Mão segurando caneca de grês cinza" />
        </div>
      </section>

      <footer><div className="wrap"><span>{brand} · {city}</span><span>Quinta a sábado, 10h às 18h</span></div></footer>
      {sc && <a className="wa" href={base} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg></a>}
    </div>
  );
}
