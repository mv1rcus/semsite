import { useState } from "react";

/** Imobiliária editorial à risca do pin (The Mills Group | KW): barra mínima com navegação entre parênteses, marca grande em grotesca bold, foto de piscina emoldurada, parágrafo gigante cinza com trechos em preto, texto miúdo + foto da equipe, imóvel em destaque com miniaturas, três números em serifada itálica, "Case studies" com preços e mosaico de fotos. Creme #efeadf, Inter (corpo e títulos) e Instrument Serif itálico só nos números. */
const CR = "#efeadf", INK = "#161513", GR = "#cfcabd";
const U = { f: "/hp-flint.webp", t1: "/hp-t1.webp", t2: "/hp-t2.webp", t3: "/hp-t3.webp", t4: "/hp-t4.webp", c1: "/hp-c1.webp", c2: "/hp-c2.webp", c3: "/hp-c3.webp", c4: "/hp-c4.webp", c5: "/hp-c5.webp", c6: "/hp-c6.webp", hero: "/hp-hero.webp", team: "/hp-team.webp" };
const THUMBS = [U.f, U.t1, U.t2, U.t3, U.t4];
const NAV = [["Imóveis", "destaque"], ["15 anos", "numeros"], ["Nosso trabalho", "casos"], ["Vendas", "casos"], ["Equipe", "equipe"]] as const;
const FACTS: [string, string][] = [["700+", "Imóveis vendidos"], ["225+", "Famílias atendidas"], ["150+", "Imóveis alugados"]];
const CASES = [
  { p: "R$ 1.899.000", q: "R$ 1.735.000", r: "Comprador", a: "Itaim Bibi", s: "Casa térrea, 4 suítes" },
];
const TILES: [string, string][] = [
  [U.c1, "50% 50%"], [U.c2, "50% 50%"], [U.c3, "50% 50%"], [U.c4, "50% 50%"], [U.c5, "50% 50%"],
  [U.c6, "50% 50%"], [U.c3, "20% 60%"], [U.c1, "80% 40%"], [U.c5, "30% 70%"], [U.c2, "70% 30%"],
  [U.c4, "20% 50%"], [U.c6, "75% 55%"], [U.c2, "30% 60%"], [U.c5, "75% 35%"], [U.c1, "20% 80%"],
];

export function HorizontePrimeFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Horizonte Prime";
  const city = client?.city?.trim() || "São Paulo";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Olá, vim pelo site da ${brand} e quero falar sobre um imóvel.`)}`;
  const [main, setMain] = useState(0);
  const parts = brand.split(" ");
  const first = parts[0] ?? brand;
  const rest = parts.slice(1).join(" ");
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="hp" style={{ fontFamily: "Inter, system-ui, sans-serif", color: INK, background: CR }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@1&display=swap');
        .hp *{box-sizing:border-box}.hp a{color:inherit;text-decoration:none}.hp button{font-family:inherit}
        .hp .pad{padding:0 clamp(14px,1.8vw,26px)}
        .hp .top{display:flex;align-items:center;justify-content:space-between;height:clamp(40px,3.4vw,50px);font-size:clamp(9px,.78vw,11px);letter-spacing:.04em;text-transform:uppercase;font-weight:500}
        .hp .top nav{display:flex;gap:clamp(8px,1.3vw,20px);align-items:center}
        .hp .top nav a{cursor:pointer}.hp .top nav a:before{content:"("}.hp .top nav a:after{content:")"}
        .hp .top nav a.pill{background:${INK};color:${CR};border-radius:99px;padding:4px 10px}.hp .top nav a.pill:before,.hp .top nav a.pill:after{content:""}
        .hp .top small{font-size:inherit;opacity:.75;max-width:130px;line-height:1.2}
        .hp .mark{text-align:center;padding:clamp(4px,.6vw,10px) 0 clamp(10px,1.4vw,22px)}
        .hp .mark h1{margin:0;font-weight:800;font-size:clamp(28px,4.4vw,64px);letter-spacing:-.045em;line-height:.95;text-transform:uppercase}
        .hp .mark h1 i{font-style:normal;font-weight:300;margin:0 .12em}
        .hp .mark p{margin:6px 0 0;font-size:clamp(8px,.72vw,11px);letter-spacing:.06em;text-transform:uppercase;opacity:.7}
        .hp .heroimg{aspect-ratio:2.13;background:#cfd8d4 center/cover no-repeat;margin:0 auto}
        .hp .big{margin:clamp(26px,4.4vw,70px) 0 clamp(26px,3.4vw,52px);font-size:clamp(23px,4.25vw,62px);line-height:1.2;letter-spacing:-.03em;font-weight:400;color:${GR};max-width:84%;text-wrap:balance}
        .hp .big b{font-weight:500;color:${INK}}
        .hp .about{display:grid;grid-template-columns:1fr 41%;gap:clamp(20px,4vw,60px);align-items:end;padding-bottom:clamp(30px,4vw,60px)}
        .hp .about p{margin:0;font-size:clamp(9px,.82vw,12px);line-height:1.65;color:#8a857a;max-width:430px;font-weight:400}
        .hp .team{aspect-ratio:2.25;background:#d8d2c5 center/cover no-repeat}
        .hp .feat{position:relative;aspect-ratio:1.73;background:#8c8c8c center/cover no-repeat;display:flex;align-items:center;justify-content:center;text-align:center;color:#fff;transition:background-image .2s}
        .hp .feat:before{content:"";position:absolute;inset:0;background:rgba(0,0,0,.08)}
        .hp .feat h2{position:relative;margin:0;font-weight:800;font-size:clamp(26px,4vw,58px);letter-spacing:-.04em;text-transform:uppercase;line-height:1;text-shadow:0 2px 24px rgba(0,0,0,.25)}
        .hp .feat small{position:relative;display:block;margin-top:8px;font-size:clamp(9px,.9vw,13px);font-weight:500;letter-spacing:.02em;opacity:.9}
        .hp .ths{position:absolute;right:clamp(8px,1vw,16px);top:clamp(10px,1.6vw,26px);display:flex;flex-direction:column;gap:3px;z-index:2}
        .hp .ths button{width:clamp(30px,6vw,88px);aspect-ratio:1.18;border:0;padding:0;cursor:pointer;background:center/cover no-repeat;opacity:.8;outline:2px solid transparent}.hp .ths button.on{opacity:1;outline-color:#fff}
        .hp .nums{display:grid;grid-template-columns:repeat(3,1fr);text-align:center;padding:clamp(40px,5.5vw,90px) 0 clamp(36px,5vw,80px);max-width:68%;margin:0 auto}
        .hp .nums small{display:block;font-size:clamp(7px,.66vw,10px);letter-spacing:.14em;text-transform:uppercase;font-weight:500;opacity:.7;margin-bottom:6px}
        .hp .nums b{font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-weight:400;font-size:clamp(46px,9vw,140px);line-height:.95;letter-spacing:-.04em}
        .hp .cs{text-align:center;padding:clamp(8px,1vw,16px) 0 clamp(14px,2vw,30px)}
        .hp .cs h3{margin:0;font-weight:800;font-size:clamp(20px,3vw,44px);letter-spacing:-.04em;text-transform:uppercase;display:inline-flex;align-items:center;gap:.25em}
        .hp .cs h3 em{display:inline-block;width:.36em;height:.36em;background:${INK};border-radius:50%}
        .hp .cs p{margin:6px 0 0;font-size:clamp(8px,.72vw,11px);opacity:.65}
        .hp .row{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;padding:clamp(10px,1.6vw,24px) 0 clamp(8px,1vw,14px)}
        .hp .row div.pr{display:flex;gap:clamp(18px,3vw,46px);align-items:flex-end}
        .hp .row .l{display:block;font-size:clamp(7px,.6vw,9px);letter-spacing:.08em;text-transform:uppercase;opacity:.6;margin-bottom:3px}
        .hp .row b{font-weight:500;font-size:clamp(20px,3.4vw,50px);letter-spacing:-.04em;line-height:1}
        .hp .row .rt{text-align:right;font-size:clamp(8px,.72vw,11px);line-height:1.5;opacity:.75}
        .hp .mos{display:grid;grid-template-columns:repeat(5,1fr);gap:2px}
        .hp .mos div{aspect-ratio:1.35;background-size:cover;background-repeat:no-repeat}
        .hp .cta{display:flex;flex-direction:column;align-items:center;text-align:center;padding:clamp(54px,7vw,110px) 0 clamp(48px,6vw,90px)}
        .hp .cta h4{margin:0;font-weight:500;font-size:clamp(24px,4vw,58px);letter-spacing:-.035em;line-height:1.1;max-width:14em;text-wrap:balance}
        .hp .cta a{margin-top:clamp(18px,2vw,30px);background:${INK};color:${CR};border-radius:99px;padding:13px 26px;font-size:13px;font-weight:500;letter-spacing:.01em}
        .hp footer{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;padding:20px 0 28px;border-top:1px solid #d6d0c2;font-size:11px;color:#8a857a}
        @media (max-width:760px){
          .hp .top small,.hp .top .ic{display:none}.hp .top{justify-content:center}.hp .top nav{gap:8px;flex-wrap:wrap;justify-content:center;height:auto;padding:8px 0}.hp .top{height:auto}
          .hp .heroimg{aspect-ratio:1.5}.hp .big{max-width:100%;font-size:26px}.hp .about{grid-template-columns:1fr;gap:20px}.hp .team{aspect-ratio:1.8}
          .hp .feat{aspect-ratio:.95}.hp .ths{top:auto;bottom:10px;right:10px;left:10px;flex-direction:row;justify-content:center}.hp .ths button{width:17%;aspect-ratio:1.2}
          .hp .nums{max-width:100%}.hp .nums b{font-size:48px}.hp .row{flex-direction:column;align-items:flex-start}.hp .row .rt{text-align:left}.hp .row div.pr{gap:22px;flex-wrap:wrap}.hp .row b{font-size:26px}
          .hp .mos{grid-template-columns:repeat(3,1fr)}
        }
      `}</style>

      <div className="pad">
        <div className="top">
          <small>{brand}<br />{city}</small>
          <nav>
            {NAV.map(([t, id]) => <a key={t} onClick={() => go(id)}>{t}</a>)}
            <a className="pill" href={wa} target="_blank" rel="noopener noreferrer">Contato</a>
          </nav>
          <span className="ic" aria-hidden style={{ display: "flex", gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="2"><path d="M3 11l9-8 9 8v10H3z" /></svg>
            <svg width="14" height="14" viewBox="0 0 24 24" fill={INK}><circle cx="12" cy="12" r="9" /></svg>
          </span>
        </div>
        <div className="mark">
          <h1>{first}{rest ? <><i>|</i>{rest}</> : null}</h1>
          <p>Imobiliária em {city} · Curadoria e atendimento próximo</p>
        </div>
        <div className="heroimg" style={{ backgroundImage: `url("${U.hero}")` }} role="img" aria-label="Casa com piscina e varanda" />
        <p className="big">
          Com sede em {city}, a <b>{brand}</b> é uma imobiliária que atende famílias e investidores e que ajuda clientes a <b>construir patrimônio com imóveis</b> entregando hospitalidade fora do comum.
        </p>
        <div className="about" id="equipe">
          <p>A equipe da {brand} reúne corretores, avaliadores e advogados com mais de quinze anos de experiência no mercado imobiliário. Acompanhamos cada negociação de perto, da primeira visita à entrega das chaves, com avaliação transparente, documentação conferida e atendimento direto pelo WhatsApp. Cada imóvel do portfólio passa por vistoria e comparação de mercado antes de ser anunciado, para que o preço combine com o que a casa realmente vale.</p>
          <div className="team" style={{ backgroundImage: `url("${U.team}")` }} role="img" aria-label="Equipe reunida" />
        </div>
      </div>

      <section className="feat" id="destaque" style={{ backgroundImage: `url("${THUMBS[main]}")` }}>
        <div className="ths">
          {THUMBS.map((t, i) => <button key={t} className={i === main ? "on" : ""} aria-label={`Foto ${i + 1}`} onClick={() => setMain(i)} style={{ backgroundImage: `url("${t}")` }} />)}
        </div>
        <div>
          <h2>Pedra Flint</h2>
          <small>R$ 2.790.000</small>
        </div>
      </section>

      <div className="pad" id="numeros">
        <div className="nums">
          {FACTS.map(([v, l]) => <div key={l}><small>{l}</small><b>{v}</b></div>)}
        </div>
        <div className="cs" id="casos">
          <h3>Casos de venda <em /></h3>
          <p>Algumas das nossas negociações mais recentes</p>
        </div>
        <div className="row">
          <div className="pr">
            <div><span className="l">Pedido</span><b>{CASES[0]!.p}</b></div>
            <div><span className="l">Vendido por</span><b>{CASES[0]!.q}</b></div>
            <div><span className="l">Cliente</span><b>{CASES[0]!.r}</b></div>
          </div>
          <div className="rt">{CASES[0]!.a}<br />{CASES[0]!.s}<br />Vendido em 21 dias</div>
        </div>
        <div className="mos">
          {TILES.map(([img, pos], i) => <div key={i} style={{ backgroundImage: `url("${img}")`, backgroundPosition: pos }} />)}
        </div>
        <div className="cta">
          <h4>Vamos encontrar o imóvel certo para você</h4>
          <a href={wa} target="_blank" rel="noopener noreferrer">Falar no WhatsApp</a>
        </div>
        <footer>
          <span>{brand} · {city}</span>
          <span>Fotos ilustrativas · Site de demonstração SemSite</span>
        </footer>
      </div>
    </div>
  );
}
