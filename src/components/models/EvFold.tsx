import { useState } from "react";

/** Marca de carro eletrico construida a partir de um pin: hero escuro com carro, barra de 5 numeros, modelos em cards sobre creme, tecnologia com motor, dois paineis de foto, faixa de test drive e rodape. */
const OR = "#ff6a2b", BK = "#0b0b0c", CREAM = "#f1ece4", MUT = "#a7a7a9";
const MODELS = [
  { n: "VOLTRA S", t: "Cupê esportivo", img: "/ev-s.webp", s: [["620 km", "Autonomia"], ["3,2 s", "0-100 km/h"], ["AWD", "Motor duplo"]] },
  { n: "VOLTRA X", t: "SUV elétrico", img: "/ev-x.webp", s: [["580 km", "Autonomia"], ["4,1 s", "0-100 km/h"], ["AWD", "Motor duplo"]] },
  { n: "VOLTRA R", t: "SUV urbano", img: "/ev-r.webp", s: [["540 km", "Autonomia"], ["4,8 s", "0-100 km/h"], ["RWD", "Motor único"]] },
];
const STATS = [
  ["620 km", "Autonomia (WLTP est.)", "M13 2L5 14h6l-1 8 8-12h-6z"],
  ["3,2 s", "0-100 km/h", "M4 18a8 8 0 1 1 16 0M12 18l4-6"],
  ["800 V", "Recarga ultrarrápida", "M8 3h8v18H8zM11 8l2 3h-2l2 3"],
  ["AWD", "Motor duplo", "M7 6h3M14 6h3M7 18h3M14 18h3M8 6v12M16 6v12M8 12h8"],
  ["Zero", "Emissão no escapamento", "M6 20C6 10 12 5 20 4c0 9-5 15-14 16zM6 20l8-8"],
];
const Arrow = ({ c = "currentColor" }: { c?: string }) => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
const Word = ({ b, s = 26 }: { b: string; s?: number }) => (
  <span className="wm" style={{ fontSize: s }}>{b.split("").map((ch, i) => <span key={i} style={ch === "A" ? { color: OR } : undefined}>{ch}</span>)}</span>
);

export function EvFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = (client?.name?.trim() || "Voltra").toUpperCase();
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [menu, setMenu] = useState(false);
  const wa = (what?: string) => `https://wa.me/${num}?text=${encodeURIComponent(`Olá! Quero ${what ?? "agendar um test drive"} na ${brand}.`)}`;
  return (
    <div className="ev0" style={{ fontFamily: "Inter, system-ui, sans-serif", background: BK, color: "#fff", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Saira:wght@400;500;600;700&display=swap');
        .ev0 *{box-sizing:border-box}.ev0 a,.ev0 button{font-family:inherit;text-decoration:none;color:inherit}
        .ev0 h1,.ev0 h2,.ev0 h3{font-family:Saira,system-ui,sans-serif !important;font-weight:500 !important;text-transform:uppercase;margin:0;letter-spacing:-.005em}
        .ev0 .wm{font-family:Saira,sans-serif;font-weight:500;letter-spacing:.2em;color:#fff;white-space:nowrap}
        .ev0 .wrap{max-width:1200px;margin:0 auto;padding:0 32px}
        .ev0 .hero{position:relative;min-height:690px;display:flex;flex-direction:column;background:#141010}
        .ev0 .hero img.bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:78% center}
        .ev0 .hero:before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(8,8,9,.88) 0%,rgba(8,8,9,.55) 38%,rgba(8,8,9,0) 66%),linear-gradient(180deg,rgba(8,8,9,.55),rgba(8,8,9,0) 20%)}
        .ev0 .nav{position:relative;z-index:3;height:84px}.ev0 .nav .in{display:flex;align-items:center;height:100%}
        .ev0 .links{display:flex;gap:40px;margin-left:auto;font-size:13px;font-weight:500;align-items:center}
        .ev0 .btn{display:inline-flex;align-items:center;gap:10px;background:${OR};color:#fff !important;font-weight:500;font-size:13px;padding:13px 22px;border-radius:999px}
        .ev0 .btn.dk{background:#0b0b0c}.ev0 .btn.wh{background:#fff;color:#111 !important}
        .ev0 .burger{display:none;margin-left:auto;background:none;border:0;color:#fff;width:44px;height:44px}
        .ev0 .mm{position:absolute;top:78px;left:14px;right:14px;z-index:20;background:#17171a;border-radius:14px;padding:8px}.ev0 .mm a{display:block;padding:14px;font-weight:500}
        .ev0 .hc{position:relative;z-index:3;flex:1;display:flex;flex-direction:column;justify-content:center;padding:20px 0 110px}
        .ev0 .eb{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#d9d9db}
        .ev0 h1{font-size:62px;line-height:.98;margin:22px 0 22px}.ev0 h1 em{font-style:normal;color:${OR};display:block}
        .ev0 .sub{max-width:360px;font-size:13.500px;line-height:1.6;color:#d6d6d8;margin:0 0 30px}
        .ev0 .ghost{display:inline-flex;align-items:center;gap:10px;font-size:13px;margin-left:20px}.ev0 .ghost i{width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.12);display:grid;place-items:center}
        .ev0 .stats{position:absolute;z-index:4;left:0;right:0;bottom:0;background:rgba(10,10,11,.88);border-top:1px solid rgba(255,255,255,.08)}
        .ev0 .stats .wrap{display:grid;grid-template-columns:repeat(5,1fr);padding:22px 32px}.ev0 .stats div{display:flex;gap:14px;align-items:center;padding-left:22px;border-left:1px solid rgba(255,255,255,.12)}.ev0 .stats div:first-child{border-left:0;padding-left:0}
        .ev0 .stats b{display:block;font-size:15px;font-weight:500}.ev0 .stats small{font-size:11px;color:${MUT}}
        .ev0 .mod{background:${CREAM};color:#111;padding:48px 0}.ev0 .mod .g{display:grid;grid-template-columns:.85fr 2.15fr;gap:32px;align-items:center}
        .ev0 .mod h2{font-size:34px;line-height:1.02;margin:12px 0 14px;color:#111}.ev0 .mod p{font-size:13.500px;line-height:1.6;color:#6d675f;margin:0 0 26px}
        .ev0 .cs{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.ev0 .c{background:#e9e4dc;border-radius:6px;overflow:hidden}.ev0 .c img{width:100%;aspect-ratio:4/2.600;object-fit:cover;display:block;background:#d8d2c8}
        .ev0 .c .b{padding:14px 16px 16px}.ev0 .c b{font-family:Saira,sans-serif;font-weight:500;font-size:15px}.ev0 .c small{display:block;font-size:11px;color:#8a847b;margin:3px 0 12px}.ev0 .c .r{display:flex;justify-content:space-between;font-size:11.500px;font-weight:500}.ev0 .c .r span small{margin:0;font-weight:400;font-size:9.500px}
        .ev0 .tech{padding:56px 0;background:linear-gradient(180deg,#0c0c0d,#111012)}.ev0 .tech .g{display:grid;grid-template-columns:.9fr 1.5fr;gap:36px;align-items:center}
        .ev0 .tech h2{font-size:38px;line-height:1.02;margin:12px 0 18px}.ev0 .tech p{font-size:13.500px;line-height:1.65;color:#cfcfd1;margin:0 0 26px;max-width:320px}
        .ev0 .tech .im{position:relative}.ev0 .tech .im img{width:100%;display:block;border-radius:6px;aspect-ratio:16/9;object-fit:cover;background:#1a1411}
        .ev0 .tag{position:absolute;font-size:10px;line-height:1.35;color:#dedee0}.ev0 .tag:before{content:"";position:absolute;width:6px;height:6px;border-radius:50%;background:${OR};top:3px}
        .ev0 .pn{display:grid;grid-template-columns:1fr 1fr;gap:6px;background:#fff}.ev0 .pn>div{position:relative;min-height:290px;display:flex;align-items:center;padding:0 36px;background:#1a1411;overflow:hidden}
        .ev0 .pn img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.ev0 .pn>div:before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(8,8,9,.7),rgba(8,8,9,0) 60%)}
        .ev0 .pn .t{position:relative;z-index:2}.ev0 .pn h2{font-size:27px;line-height:1.02;margin:8px 0 12px}.ev0 .pn p{font-size:12.500px;line-height:1.55;color:#e5e5e7;margin:0 0 16px;max-width:240px}
        .ev0 .cta{position:relative;min-height:300px;padding:40px 0;display:flex;align-items:center;background:#6b2a0c;overflow:hidden}.ev0 .cta img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:70% center;transform:scaleX(-1)}
        .ev0 .cta:before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(255,106,43,.6),rgba(255,106,43,0) 58%)}.ev0 .cta .wrap{position:relative;z-index:2;width:100%}
        .ev0 .cta h2{font-size:40px;line-height:1.02;margin:10px 0 14px;text-transform:none;font-weight:500 !important}.ev0 .cta p{font-size:13px;line-height:1.55;max-width:300px;margin:0 0 22px;color:#fff}
        .ev0 .foot{padding:36px 0 26px;background:#0b0b0c}.ev0 .foot .g{display:grid;grid-template-columns:1.3fr 1fr 1fr 1fr 1.5fr;gap:24px;font-size:12px;color:${MUT}}
        .ev0 .foot h4{margin:0 0 12px;color:#fff;font-weight:500;font-size:12px}.ev0 .foot a{display:block;margin-bottom:9px}
        .ev0 .em{display:flex;background:#1a1a1c;border:1px solid #2a2a2d;border-radius:6px;padding:4px 4px 4px 12px;align-items:center;justify-content:space-between}.ev0 .em i{width:34px;height:34px;background:${OR};border-radius:6px;display:grid;place-items:center}
        .ev0 .fb{display:flex;justify-content:space-between;margin-top:24px;padding-top:16px;border-top:1px solid #1f1f22;font-size:10.500px;color:#77777a;flex-wrap:wrap;gap:10px}
        @media(max-width:900px){
          .ev0 .wrap{padding:0 20px}.ev0 .links,.ev0 .nav .btn{display:none}.ev0 .burger{display:block}
          .ev0 .hero{min-height:auto}.ev0 .hero img.bg{object-position:58% center}.ev0 .hero:before{background:linear-gradient(180deg,rgba(8,8,9,.6),rgba(8,8,9,.25) 40%,rgba(8,8,9,.9) 85%)}
          .ev0 h1{font-size:40px}.ev0 .hc{padding:260px 20px 24px}
          .ev0 .stats{position:relative}.ev0 .stats .wrap{grid-template-columns:1fr 1fr;gap:18px;padding:20px}.ev0 .stats div{border:0;padding:0}
          .ev0 .mod .g,.ev0 .tech .g{grid-template-columns:1fr}.ev0 .cs{grid-template-columns:1fr}.ev0 .mod h2{font-size:30px}
          .ev0 .pn{grid-template-columns:1fr}.ev0 .cta h2{font-size:30px}.ev0 .foot .g{grid-template-columns:1fr 1fr}.ev0 .tag{display:none}
        }
      `}</style>
      <section className="hero">
        <img className="bg" src="/ev-hero.webp" alt="Carro elétrico cinza com detalhes laranja em um túnel urbano à noite" />
        <div className="wrap" style={{ width: "100%" }}><div className="nav"><div className="in">
          <Word b={brand} />
          <div className="links"><a href="#mod">Modelos</a><a href="#">Design</a><a href="#tec">Tecnologia</a><a href="#">Histórias</a><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg></div>
          <a className="btn" href={wa()} style={{ marginLeft: 40 }}>Agendar test drive <Arrow /></a>
          <button className="burger" aria-label="Menu" onClick={() => setMenu(!menu)}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg></button>
        </div>{menu && <div className="mm"><a href="#mod" onClick={() => setMenu(false)}>Modelos</a><a href="#tec" onClick={() => setMenu(false)}>Tecnologia</a><a href={wa()}>Agendar test drive</a></div>}</div></div>
        <div className="wrap hc" style={{ width: "100%" }}>
          <span className="eb">Elétrico &nbsp;|&nbsp; Inteligente &nbsp;|&nbsp; Centrado nas pessoas</span>
          <h1>Vá além<em>do esperado.</em></h1>
          <p className="sub">A {brand} cria carros elétricos de alto desempenho que unem design marcante, tecnologia inteligente e um amanhã mais consciente.</p>
          <div><a className="btn" href="#mod" style={{ padding: "15px 28px" }}>Conhecer {brand.charAt(0) + brand.slice(1).toLowerCase()}</a>
            <a className="ghost" href={wa("ver o filme")}><i><svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><path d="M6 4l14 8-14 8z" /></svg></i>Assistir ao filme</a></div>
        </div>
        <div className="stats"><div className="wrap">{STATS.map(([a, b, d]) => (
          <div key={b}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e5e5e7" strokeWidth="1.600" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg><span><b>{a}</b><small>{b}</small></span></div>
        ))}</div></div>
      </section>

      <section className="mod" id="mod"><div className="wrap g">
        <div><span className="eb" style={{ color: "#555" }}>Nossos modelos</span><h2>Forma pura.<br />Liberdade real.</h2><p>Personalidades distintas. Uma mesma crença em um futuro mais limpo e mais empolgante.</p>
          <a className="btn dk" href={wa("conhecer os modelos")}>Ver todos os modelos <Arrow /></a></div>
        <div className="cs">{MODELS.map((m) => (
          <div className="c" key={m.n}><img src={m.img} alt={m.n} /><div className="b"><b>{m.n.replace("VOLTRA", brand)}</b><small>{m.t}</small>
            <div className="r">{m.s.map(([a, b]) => <span key={b}>{a}<small style={{ display: "block" }}>{b}</small></span>)}</div></div></div>
        ))}</div>
      </div></section>

      <section className="tech" id="tec"><div className="wrap g">
        <div><span className="eb">Tecnologia</span><h2>A inteligência<br />leva mais longe.</h2><p>Da nossa arquitetura elétrica de nova geração aos sistemas de condução inteligentes, a {brand} reúne engenharia de ponta e uso no mundo real.</p>
          <a className="btn" href={wa("conhecer a tecnologia")}>Conhecer a tecnologia <Arrow /></a></div>
        <div className="im"><img src="/ev-motor.webp" alt="Conjunto elétrico: bateria, motor e controle térmico em vista explodida" />
          <span className="tag" style={{ left: "6%", top: "12%", paddingLeft: 14 }}>Bateria de<br />nova geração</span>
          <span className="tag" style={{ right: "4%", top: "14%", paddingLeft: 14 }}>Motor elétrico<br />de alta eficiência</span>
          <span className="tag" style={{ left: "6%", bottom: "14%", paddingLeft: 14 }}>Controle térmico<br />inteligente</span>
          <span className="tag" style={{ right: "4%", bottom: "8%", paddingLeft: 14 }}>Unidade de<br />tração avançada</span></div>
      </div></section>

      <section className="pn">
        <div><img src="/ev-story.webp" alt="Homem diante de um carro elétrico escuro ao pôr do sol nas montanhas" /><div className="t"><span className="eb">Nossa história</span><h2>Pessoas<br />movem mudanças.</h2><p>Construímos mais que carros. Construímos um amanhã mais limpo para lugares que merecem ser cuidados.</p><a href={wa("conhecer a história")} style={{ color: OR, fontSize: 12.500 }}>Ler nossa história →</a></div></div>
        <div><img src="/ev-interior.webp" alt="Interior do carro com volante e painel digital iluminado" /><div className="t"><span className="eb">Interior</span><h2>Uma condução<br />mais humana.</h2><p>Calma. Conectada. Pensada ao seu redor.</p><a className="btn wh" href={wa("conhecer o interior")}>Explorar interior <Arrow /></a></div></div>
      </section>

      <section className="cta"><img src="/ev-estrada.webp" alt="Carro elétrico em estrada à beira-mar ao pôr do sol" /><div className="wrap"><span className="eb">Agende um test drive</span><h2>Seu próximo<br />capítulo começa aqui.</h2><p>Conheça a {brand} pessoalmente e sinta como um futuro totalmente elétrico pode ser.</p><a className="btn wh" href={wa()}>Agendar test drive <Arrow /></a></div></section>

      <footer className="foot"><div className="wrap"><div className="g">
        <div><Word b={brand} s={22} /><p style={{ margin: "14px 0 0", lineHeight: 1.6 }}>Dirigindo um futuro mais limpo, mais inteligente e mais inspirador.</p></div>
        <div><h4>Modelos</h4><a href="#mod">{brand} S</a><a href="#mod">{brand} X</a><a href="#mod">{brand} R</a></div>
        <div><h4>Empresa</h4><a href="#">Sobre</a><a href="#">Sustentabilidade</a><a href="#">Carreiras</a></div>
        <div><h4>Suporte</h4><a href={wa()}>Agendar test drive</a><a href={wa("encontrar uma loja")}>Encontrar loja</a><a href={wa("suporte")}>Suporte ao proprietário</a></div>
        <div><h4>Acompanhe</h4><p style={{ margin: "0 0 12px" }}>Receba novidades e histórias.</p><div className="em"><span>Seu e-mail</span><i><Arrow c="#fff" /></i></div></div>
      </div><div className="fb"><span>© 2026 {brand}. Todos os direitos reservados.</span><span>Privacidade &nbsp; Termos &nbsp; Cookies</span></div></div></footer>
    </div>
  );
}
