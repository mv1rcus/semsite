import { useState } from "react";

/** Boutique pet premium partindo de um pin de loja ("owned & adored": hero bege com cão e gato flanqueando tipografia serifada mista romano+itálico, logo em script elegante, tiles de categoria em fundos pastel, seção de customização): bege + preto-tinta, logo script, serifada com itálicos, sem promo-strip — oposto do pet shop verde de ofertas. */
const BG = "#f2ebdd", PN = "#ece3d2", CD = "#faf6ee", TX = "#1d1a15", MU = "#5c5546", AC = "#1d1a15", LN = "#ddd2bd", GR = "#5a6b4e";
const CATS = [
  { n: "Cães", d: "Coleiras, guias e camas pensadas para cada porte", img: "/pp-cat1.webp", bg: "#cfe0e8" },
  { n: "Gatos", d: "Arranhadores, comedouros e mantas de respeito", img: "/pp-cat2.webp", bg: "#ecd7d7" },
  { n: "Filhotes", d: "O enxoval completo para a chegada do novo morador", img: "/pp-cat3.webp", bg: "#efe6d4" },
];
const PRODS = [
  { n: "Coleira de couro vegetal", d: "Couro curtido ao vegetal com fivela de latão e gravação do nome", p: "R$ 189" },
  { n: "Guia de corda trançada", d: "Corda de algodão naval com acabamento em couro e mosquetão de latão", p: "R$ 159" },
  { n: "Comedouro de cerâmica", d: "Peça de ateliê esmaltada, pesada o bastante para não deslizar", p: "R$ 129" },
  { n: "Bandana de linho", d: "Linho lavável com etiqueta de couro e corte assimétrico", p: "R$ 79" },
];
const CUSTOM = [
  { t: "Nome gravado", d: "Gravação a laser na fivela de latão ou no pingente, sem prazo extra." },
  { t: "Medida exata", d: "Cada coleira sai cortada para o pescoço do teu cão, não para uma tabela genérica." },
  { t: "Combinação de cores", d: "Couro, linho e latão em combinações que tu escolhe peça a peça." },
];
const REVIEWS = [
  { q: "A coleira do Bento chegou com o nome gravado perfeito. Couro macio desde o primeiro dia, sem aquele cheiro de fábrica.", n: "Marina L., Shiba Inu" },
  { q: "É a única loja onde eu entro para comprar ração e saio querendo redecorar a casa. Tudo lindo e de qualidade absurda.", n: "Rafael T., dois gatos" },
  { q: "Montaram o enxoval inteiro da minha filhote com calma, explicando cada peça. Nunca mais compro pet shop de oferta.", n: "Camila F., Spitz" },
];
const Ic = ({ d, s = 34, c = TX }: { d: string; s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);

export function PeloEPataFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Pelo & Pata";
  const city = client?.city?.trim() || "São Paulo";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [menu, setMenu] = useState(false);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const wa = (msg: string) => `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;

  return (
    <div className="pp" style={{ fontFamily: "Inter, system-ui, sans-serif", color: TX, background: BG, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Ms+Madi&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600;700&display=swap');
        .pp *{box-sizing:border-box}
        .pp a,.pp button{font-family:inherit}
        .pp .wrap{max-width:1180px;margin:0 auto;padding:0 24px}
        .pp .nav{display:flex;align-items:center;justify-content:space-between;height:88px;gap:20px}
        .pp .logo{font-family:'Ms Madi',cursive;font-size:38px;color:${TX};white-space:nowrap;line-height:1;font-weight:400}
        .pp .links{display:flex;gap:30px;font-size:13px;font-weight:600;letter-spacing:1.6px;text-transform:uppercase}
        .pp .links a{color:${MU};cursor:pointer;transition:color .2s}.pp .links a:hover{color:${TX}}
        .pp .btn{background:${AC};color:#f6f1e7;border:0;border-radius:999px;padding:0 30px;min-height:52px;font-weight:600;font-size:13.5px;letter-spacing:1.2px;text-transform:uppercase;cursor:pointer;display:inline-flex;align-items:center;gap:10px;text-decoration:none}
        .pp .btn:hover{background:#000}
        .pp .btn.o{background:transparent;color:${TX};border:1.5px solid ${TX}}
        .pp .btn.o:hover{background:${TX};color:#f6f1e7}
        .pp .burger{display:none;background:none;border:0;width:44px;height:44px;cursor:pointer}
        .pp .hero{text-align:center;padding:64px 24px 0}
        .pp .kick{font-size:12px;font-weight:600;letter-spacing:4px;text-transform:uppercase;color:${MU}}
        .pp h1{font-family:'Cormorant Garamond',serif;font-weight:500;font-size:clamp(46px,7vw,88px);line-height:1.04;margin:18px auto 8px;max-width:820px;color:${TX}}
        .pp h1 em{font-style:italic;font-weight:400}
        .pp .lead{font-size:16.5px;line-height:1.7;color:${MU};margin:14px auto 30px;max-width:520px}
        .pp .herocta{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:44px}
        .pp .heroimg{border-radius:18px;overflow:hidden;max-width:1180px;margin:0 auto}
        .pp .heroimg img{width:100%;display:block}
        .pp .sec{padding:88px 0}
        .pp .kick2{color:${MU};font-weight:600;font-size:12px;letter-spacing:4px;text-transform:uppercase;text-align:center}
        .pp h2{font-family:'Cormorant Garamond',serif;font-weight:500;font-size:clamp(38px,4.6vw,58px);margin:12px 0 0;color:${TX};line-height:1.05;text-align:center}
        .pp h2 em{font-style:italic;font-weight:400}
        .pp .sub{color:${MU};font-size:16px;margin:14px auto 0;line-height:1.7;text-align:center;max-width:560px}
        .pp .cats{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:48px}
        .pp .cat{border-radius:18px;overflow:hidden;cursor:pointer;transition:transform .25s}
        .pp .cat:hover{transform:translateY(-6px)}
        .pp .catimg{aspect-ratio:1;overflow:hidden}
        .pp .catimg img{width:100%;height:100%;object-fit:cover;display:block}
        .pp .catbody{padding:20px 6px 4px;text-align:center}
        .pp .catbody b{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:26px;display:block}
        .pp .catbody span{font-size:14px;color:${MU};line-height:1.6;display:block;margin-top:4px}
        .pp .col{display:grid;grid-template-columns:1.15fr .85fr;gap:56px;align-items:center}
        .pp .colimg{border-radius:18px;overflow:hidden}
        .pp .colimg img{width:100%;display:block}
        .pp .plist{display:flex;flex-direction:column;margin-top:30px}
        .pp .pitem{display:flex;justify-content:space-between;align-items:baseline;gap:18px;padding:18px 0;border-top:1px solid ${LN}}
        .pp .pitem:last-child{border-bottom:1px solid ${LN}}
        .pp .pitem b{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:21px}
        .pp .pitem small{display:block;font-size:13.5px;color:${MU};margin-top:3px;line-height:1.55;font-weight:400}
        .pp .pitem .pr{font-family:'Cormorant Garamond',serif;font-size:21px;font-style:italic;white-space:nowrap}
        .pp .cust{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:48px}
        .pp .cucard{background:${CD};border:1px solid ${LN};border-radius:18px;padding:30px 26px}
        .pp .cucard b{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:22px;display:block;margin-top:14px}
        .pp .cucard p{font-size:14px;color:${MU};line-height:1.65;margin:8px 0 0}
        .pp .revs{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:48px}
        .pp .rev{background:${CD};border:1px solid ${LN};border-radius:18px;padding:30px 26px}
        .pp .rev .st{color:${GR};letter-spacing:3px;font-size:13px}
        .pp .rev p{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:19px;line-height:1.5;margin:14px 0 16px}
        .pp .rev span{font-size:13px;color:${MU};letter-spacing:.6px;text-transform:uppercase;font-weight:600}
        .pp .band{background:${PN};text-align:center;padding:96px 24px}
        .pp .band .script{font-family:'Ms Madi',cursive;font-size:clamp(40px,5vw,64px);line-height:1.1;color:${TX}}
        .pp .band p{color:${MU};font-size:16px;line-height:1.7;max-width:520px;margin:16px auto 30px}
        .pp footer{background:${TX};color:#e9e2d4;padding:64px 0 40px}
        .pp .foot{display:flex;justify-content:space-between;gap:32px;flex-wrap:wrap}
        .pp .flogo{font-family:'Ms Madi',cursive;font-size:36px;color:#f2ebdd}
        .pp footer p, .pp footer a{color:#b7ad9c;font-size:14px;line-height:1.8;text-decoration:none}
        .pp footer b{display:block;color:#f2ebdd;font-size:12px;letter-spacing:2.5px;text-transform:uppercase;margin-bottom:12px}
        .pp .copy{border-top:1px solid #39332a;margin-top:44px;padding-top:22px;font-size:12.5px;color:#8d8474;display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px}
        @media (max-width:900px){
          .pp .links{display:none}
          .pp .nav .btn{display:none}
          .pp .logo{font-size:34px}
          .pp h1{line-height:1.12}
          .pp .catbody b{font-size:22px;font-weight:500}
          .pp .sec{padding:64px 0}
          .pp .band{padding:72px 24px}
          .pp .burger{display:block}
          .pp .cats,.pp .cust,.pp .revs{grid-template-columns:1fr}
          .pp .col{grid-template-columns:1fr;gap:32px}
          .pp .menuopen{position:fixed;inset:0;background:${BG};z-index:60;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:26px}
          .pp .menuopen a{font-family:'Cormorant Garamond',serif;font-size:32px;color:${TX};cursor:pointer}
        }
      `}</style>

      <div className="wrap">
        <div className="nav">
          <div className="logo">{brand.toLowerCase()}</div>
          <div className="links">
            <a onClick={() => go("categorias")}>Categorias</a>
            <a onClick={() => go("colecao")}>Coleção</a>
            <a onClick={() => go("medida")}>Sob medida</a>
            <a onClick={() => go("loja")}>A loja</a>
          </div>
          <a className="btn" href={wa(`Oi! Quero conhecer a ${brand}.`)} target="_blank" rel="noreferrer">Falar no WhatsApp</a>
          <button className="burger" onClick={() => setMenu(true)} aria-label="Menu">
            <Ic d="M4 7h16M4 12h16M4 17h16" s={26} />
          </button>
        </div>
      </div>
      {menu && (
        <div className="menuopen">
          <a onClick={() => go("categorias")}>Categorias</a>
          <a onClick={() => go("colecao")}>Coleção</a>
          <a onClick={() => go("medida")}>Sob medida</a>
          <a onClick={() => go("loja")}>A loja</a>
          <button className="btn o" onClick={() => setMenu(false)}>Fechar</button>
        </div>
      )}

      <header className="hero">
        <span className="kick">Boutique para cães e gatos · {city}</span>
        <h1>Tudo para quem <em>você mais ama,</em> escolhido <em>a dedo</em></h1>
        <p className="lead">Coleiras, guias, comedouros e mantas de ateliês que tratam pet como família. Nada de prateleira de oferta: curadoria peça a peça.</p>
        <div className="herocta">
          <a className="btn" onClick={() => go("colecao")}>Ver a coleção</a>
          <a className="btn o" href={wa(`Oi! Quero uma indicação de produto na ${brand}.`)} target="_blank" rel="noreferrer">Pedir indicação</a>
        </div>
        <div className="heroimg"><img src="/pp-hero.webp" alt="Labrador e gato lado a lado em fundo bege" /></div>
      </header>

      <section className="sec" id="categorias">
        <div className="wrap">
          <div className="kick2">Compre por categoria</div>
          <h2>Cada um com <em>o seu</em> cantinho</h2>
          <div className="cats">
            {CATS.map((c) => (
              <div className="cat" key={c.n} onClick={() => go("colecao")}>
                <div className="catimg" style={{ background: c.bg }}><img src={c.img} alt={c.n} /></div>
                <div className="catbody"><b>{c.n}</b><span>{c.d}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="colecao" style={{ background: PN }}>
        <div className="wrap">
          <div className="col">
            <div className="colimg"><img src="/pp-flat.webp" alt="Coleira de couro, guia de corda, comedouro de cerâmica e bandana de linho sobre tecido bege" /></div>
            <div>
              <div className="kick2" style={{ textAlign: "left" }}>A coleção essencial</div>
              <h2 style={{ textAlign: "left" }}>Poucas peças, <em>as certas</em></h2>
              <div className="plist">
                {PRODS.map((p) => (
                  <div className="pitem" key={p.n}>
                    <div><b>{p.n}</b><small>{p.d}</small></div>
                    <span className="pr">{p.p}</span>
                  </div>
                ))}
              </div>
              <a className="btn" style={{ marginTop: 26 }} href={wa(`Oi! Quero encomendar uma peça da coleção da ${brand}.`)} target="_blank" rel="noreferrer">Encomendar</a>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" id="medida">
        <div className="wrap">
          <div className="kick2">Feito sob medida</div>
          <h2>Com o nome <em>dele</em> gravado</h2>
          <p className="sub">Toda peça da coleção pode sair personalizada: nome, medida e combinação de cores escolhidos por ti.</p>
          <div className="cust">
            {CUSTOM.map((c, i) => (
              <div className="cucard" key={c.t}>
                <Ic d={["M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z", "M3 12h18M12 3v18M5 6l14 12M19 6L5 18", "M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z"][i] ?? ""} />
                <b>{c.t}</b>
                <p>{c.d}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <a className="btn" href={wa(`Oi! Quero uma peça personalizada na ${brand}.`)} target="_blank" rel="noreferrer">Personalizar uma peça</a>
          </div>
        </div>
      </section>

      <section className="sec" id="loja" style={{ background: PN }}>
        <div className="wrap">
          <div className="col">
            <div>
              <div className="kick2" style={{ textAlign: "left" }}>A loja</div>
              <h2 style={{ textAlign: "left" }}>Um lugar para <em>ficar</em> um pouco</h2>
              <p style={{ color: MU, fontSize: 16, lineHeight: 1.75, marginTop: 16 }}>A {brand} nasceu em {city} da vontade de tratar pet shop como boutique: luz boa, prateleiras de carvalho e tempo para escolher. Traz o teu cão ou gato — a tigela de água e o petisco da casa são por nossa conta.</p>
              <div style={{ display: "flex", gap: 34, marginTop: 28, flexWrap: "wrap" }}>
                <div><b style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 40, fontWeight: 600 }}>480+</b><br /><span style={{ fontSize: 13, color: MU, letterSpacing: 1.5, textTransform: "uppercase" }}>Peças em curadoria</span></div>
                <div><b style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 40, fontWeight: 600 }}>27</b><br /><span style={{ fontSize: 13, color: MU, letterSpacing: 1.5, textTransform: "uppercase" }}>Ateliês parceiros</span></div>
                <div><b style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 40, fontWeight: 600 }}>4.9</b><br /><span style={{ fontSize: 13, color: MU, letterSpacing: 1.5, textTransform: "uppercase" }}>Nota dos clientes</span></div>
              </div>
            </div>
            <div className="colimg"><img src="/pp-about.webp" alt="Interior da boutique com prateleiras de carvalho, coleiras penduradas e luz natural" /></div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="kick2">Quem já passou por aqui</div>
          <h2>Rabos abanando, <em>ronronos</em> ligados</h2>
          <div className="revs">
            {REVIEWS.map((r) => (
              <div className="rev" key={r.n}>
                <div className="st">★★★★★</div>
                <p>“{r.q}”</p>
                <span>{r.n}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="band">
        <div className="script">{brand.toLowerCase()}</div>
        <p>Visita a loja, monta o enxoval ou encomenda uma peça personalizada. A gente responde no WhatsApp no mesmo dia.</p>
        <a className="btn" href={wa(`Oi! Quero visitar a ${brand} em ${city}.`)} target="_blank" rel="noreferrer">Chamar no WhatsApp</a>
      </div>

      <footer>
        <div className="wrap">
          <div className="foot">
            <div style={{ maxWidth: 300 }}>
              <div className="flogo">{brand.toLowerCase()}</div>
              <p>Boutique para cães e gatos em {city}. Curadoria de ateliês, peças sob medida e carinho em cada detalhe.</p>
            </div>
            <div><b>Visita</b><p>Rua das Magnólias, 412<br />Jardins, {city}<br />Seg–Sáb, 10h às 20h</p></div>
            <div><b>Fala com a gente</b><p><a href={wa(`Oi! Quero falar com a ${brand}.`)} target="_blank" rel="noreferrer">WhatsApp</a><br />oi@peloepata.com.br</p></div>
          </div>
          <div className="copy"><span>© {new Date().getFullYear()} {brand}</span><span>Feito com carinho em {city}</span></div>
        </div>
      </footer>
    </div>
  );
}
