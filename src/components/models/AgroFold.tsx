import { useEffect, useState } from "react";

/** Agronegocio novo, construido do zero a partir de um pin escuro verde ("AgriNova"): hero com titulo gigante em caixa alta (primeira metade branca, segunda em degrade verde), trator em foto real entre as letras e a lavoura, quatro cartoes de solucao, secao de impacto e cotacao no WhatsApp. Fotos reais (Gemini). */
const BG = "#0b140e", BG2 = "#101c14", LI = "#9be15d", LI2 = "#6fb43a", TX = "#e9efe6", MU = "#8fa394";
const SOL = [
  { t: "Tecnologia que trabalha no seu campo", k: "Equipamentos", img: "/agro-drone.webp" },
  { t: "Sementes melhores, safras melhores", k: "Sementes", img: "/agro-muda.webp" },
  { t: "Lavoura guiada por dados", k: "Orientação técnica", img: "/agro-tablet.webp" },
  { t: "Terra mais saudável para o amanhã", k: "Futuro sustentável", img: "/agro-campo.webp" },
];

export function AgroFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "AgriNova";
  const up = brand.toUpperCase().replace(/\s+/g, "");
  const cut = up.length > 4 ? Math.ceil(up.length / 2) : 2;
  const a = up.slice(0, cut), b = up.slice(cut);
  const city = client?.city?.trim() || "Rio Verde, GO";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  const [nome, setNome] = useState("");
  const [area, setArea] = useState("Até 100 ha");
  useEffect(() => { const f = () => setSc(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const base = `https://wa.me/${num}`;
  const wa = `${base}?text=${encodeURIComponent(`Oi! Quero um orçamento com a ${brand}. ${nome.trim() ? `Meu nome é ${nome.trim()}. ` : ""}Área: ${area}.`)}`;

  return (
    <div className="ag" style={{ fontFamily: "'Inter', system-ui, sans-serif", color: TX, background: BG, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@500;700;800&family=Inter:wght@400;500;600&family=Caveat:wght@600&display=swap');
        .ag *{box-sizing:border-box}.ag a,.ag button,.ag input,.ag select{font-family:inherit}
        .ag h1,.ag h2,.ag h3{font-family:'Outfit',system-ui,sans-serif!important;font-weight:500!important;letter-spacing:0!important;text-transform:none!important;margin:0;text-wrap:balance}.ag h1.big{font-weight:800!important;text-wrap:nowrap}
        .ag .shell{padding:18px 18px 0}
        .ag .hero{position:relative;border-radius:30px;overflow:hidden;min-height:760px;background:#0f1a12 url(/agro-hero.webp) center bottom/cover no-repeat;padding:26px 36px 0}
        .ag .hero:before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(8,14,10,.5),rgba(8,14,10,0) 45%,rgba(8,14,10,0) 75%,rgba(8,14,10,.45)),linear-gradient(180deg,rgba(8,14,10,.55) 0,rgba(8,14,10,0) 40%,rgba(8,14,10,0) 70%,rgba(11,20,14,.8) 100%)}
        .ag .hero>*{position:relative;z-index:2}
        .ag .nav{display:grid;grid-template-columns:1fr auto 1fr;align-items:center}
        .ag .ham{width:30px;display:grid;gap:6px;background:none;border:0;padding:0;cursor:pointer}.ag .ham i{display:block;height:2px;background:#fff;width:100%}.ag .ham i+i{width:70%}
        .ag .logo{display:flex;align-items:center;gap:8px;font-family:'Outfit',sans-serif;font-weight:700;font-size:20px;color:#fff;justify-content:center}.ag .logo svg{width:22px;height:22px}
        .ag .quote{justify-self:end;background:#f4f6f2;color:#0b140e;border:0;border-radius:99px;padding:10px 20px;font-size:12px;font-weight:600;text-decoration:none;cursor:pointer}
        .ag .kick{margin:30px 0 0;font-size:11px;letter-spacing:.34em;color:#cfd8cc;text-transform:uppercase;line-height:1.7}
        .ag .big{display:flex;justify-content:center;font-family:'Outfit',sans-serif;font-weight:800;font-size:clamp(70px,16.5vw,230px);line-height:.95;margin:6px 0 0;letter-spacing:-.01em;pointer-events:none}
        .ag .big .lo{position:relative;display:inline-block;-webkit-text-fill-color:currentColor}.ag .big .lo svg{position:absolute;left:50%;top:50%;width:.34em;height:.34em;transform:translate(-50%,-50%);color:#2b4a1f;-webkit-text-fill-color:initial}.ag .big span:first-child{color:#f5f6f3}.ag .big span:last-child{background:linear-gradient(90deg,#9be15d,#d4f0b0);-webkit-background-clip:text;background-clip:text;color:transparent}
        .ag .lead{position:absolute!important;left:36px;top:min(27.5vw,420px);max-width:330px}
        .ag .lead h2{font-size:26px;line-height:1.2;color:#fff}.ag .lead p{margin:14px 0 20px;font-size:13px;line-height:1.55;color:#e6ece3;text-shadow:0 1px 8px rgba(0,0,0,.85)}.ag .lead h2,.ag .trust,.ag .stats,.ag .script{text-shadow:0 1px 10px rgba(0,0,0,.8)}
        .ag .pill{display:inline-flex;align-items:center;gap:10px;background:${LI};color:#0b140e;border-radius:99px;padding:12px 22px;font-weight:600;font-size:12px;text-decoration:none;cursor:pointer;border:0}
        .ag .trust{display:flex;align-items:center;gap:10px;margin-top:22px;font-size:12px;color:#d6ddd3}.ag .trust .av{display:flex}.ag .trust .av i{width:30px;height:30px;border-radius:50%;border:2px solid #0b140e;margin-left:-8px;background:#6a7a5a}.ag .trust .av i:first-child{margin-left:0;background:#8a6a4a}.ag .trust .av i:nth-child(3){background:#4a6a5a}
        .ag .script{position:absolute!important;right:60px;top:min(24vw,360px);font-family:'Caveat',cursive;font-size:30px;line-height:1;color:#d8f5b8;transform:rotate(-8deg)}
        .ag .stats{position:absolute!important;right:36px;top:400px;display:grid;gap:18px;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#cfd8cc}
        .ag .sec{padding:70px 18px 0}
        .ag .imp{text-align:center;max-width:620px;margin:0 auto}.ag .imp .lab{font-size:11px;letter-spacing:.24em;color:${LI};text-transform:uppercase}
        .ag .imp h2{font-size:clamp(28px,3.4vw,40px);line-height:1.15;margin:10px 0 14px}.ag .imp h2 b{color:${LI};font-weight:700}.ag .imp p{font-size:14px;line-height:1.6;color:${MU};margin:0}
        .ag .cards{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:40px}
        .ag .cd{position:relative;border-radius:18px;overflow:hidden;background:#142018;border:1px solid #223426;aspect-ratio:.82}
        .ag .cd .im{position:absolute;inset:0 0 38% 0;background-size:cover;background-position:center}
        .ag .cd .tx{position:absolute;left:0;right:0;bottom:0;padding:14px 16px 16px;background:linear-gradient(180deg,rgba(16,28,20,.2),#101c14 30%)}
        .ag .cd small{display:block;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:${LI};margin-bottom:6px}.ag .cd h3{font-size:16px;line-height:1.25;color:#fff}
        .ag .cd .go{position:absolute;right:14px;bottom:14px;width:30px;height:30px;border-radius:50%;border:1px solid #4a6a4a;display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px}
        .ag .cd .tx{padding-right:56px}
        .ag .seed{display:flex;justify-content:center;margin-top:46px}
        .ag .seed div{width:100%;max-width:700px;height:180px;background:url(/agro-muda.webp) center/cover no-repeat;border-radius:20px;-webkit-mask-image:linear-gradient(180deg,#000 40%,transparent);mask-image:linear-gradient(180deg,#000 40%,transparent)}
        .ag .foot{display:flex;justify-content:space-between;gap:20px;margin-top:40px;padding:22px 0;border-top:1px solid #1d2d20;font-size:13px;color:#b7c4b2}
        .ag .foot b{color:#fff;font-weight:600}
        .ag .cot{background:${BG2};border:1px solid #223426;border-radius:24px;padding:44px;display:grid;grid-template-columns:1fr 1fr;gap:40px;margin:70px 18px 0;align-items:center}
        .ag .cot h2{font-size:30px;line-height:1.2}.ag .cot p{color:${MU};font-size:14px;line-height:1.6;margin:12px 0 0}
        .ag .cot .f{display:grid;gap:12px}.ag .cot input,.ag .cot select{background:#0b140e;border:1px solid #2a3f2d;border-radius:12px;color:#fff;padding:14px 16px;font-size:14px;outline:none}
        .ag .cot .pill{justify-content:center;width:100%}
        .ag footer{padding:34px 18px 40px;margin-top:20px;font-size:12px;color:${MU};display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px}
        .ag .mob{position:fixed;inset:0;z-index:20;background:#0b140e;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:28px;font-family:'Outfit',sans-serif;font-size:24px}.ag .mob a{color:#fff;cursor:pointer}
        .ag .wa{position:fixed;right:20px;bottom:20px;width:56px;height:56px;border-radius:50%;background:#25d366;display:flex;align-items:center;justify-content:center;z-index:15;box-shadow:0 8px 22px rgba(0,0,0,.45)}
        @media(max-width:860px){
          .ag .shell{padding:10px 10px 0}.ag .hero{border-radius:22px;min-height:700px;padding:20px 18px 0;background-position:62% bottom}
          .ag .lead{position:relative!important;left:auto;top:auto;margin-top:36px;max-width:100%}.ag .lead h2{font-size:21px}
          .ag .logo{font-size:16px}.ag .quote{white-space:nowrap;padding:9px 14px;font-size:11px}.ag .big{font-size:15vw}.ag .hero:before{background:linear-gradient(180deg,rgba(8,14,10,.78) 0,rgba(8,14,10,.6) 52%,rgba(8,14,10,.1) 78%,rgba(11,20,14,.8) 100%)}
          .ag .script,.ag .stats{display:none}
          .ag .cards{grid-template-columns:1fr 1fr;gap:10px}.ag .cd{aspect-ratio:.8}.ag .cd h3{font-size:13px}
          .ag .cot{grid-template-columns:1fr;padding:26px 20px;margin:50px 10px 0}.ag .sec{padding:50px 10px 0}.ag .foot{flex-direction:column}
        }
      `}</style>

      {menu && <div className="mob"><a onClick={() => go("solucoes")}>Soluções</a><a onClick={() => go("impacto")}>Impacto</a><a onClick={() => go("cotacao")}>Orçamento</a><a onClick={() => setMenu(false)}>Fechar ×</a></div>}

      <div className="shell">
        <header className="hero" id="top">
          <div className="nav">
            <button className="ham" aria-label="Menu" onClick={() => setMenu(true)}><i /><i /></button>
            <div className="logo"><svg viewBox="0 0 24 24" fill="none" stroke={LI} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 20c0-9 5-14 14-15 0 9-5 14-14 15z" /><path d="M5 20c3-5 6-8 10-10" /></svg>{brand}</div>
            <a className="quote" href={wa} target="_blank" rel="noreferrer">Pedir orçamento →</a>
          </div>
          <p className="kick">Agro inteligente<br />Colheitas melhores</p>
          <h1 className="big" aria-label={brand}><span>{a}</span><span>{b.split("").map((ch, i) => ch === "O" && i === 1 ? <span key={i} className="lo">O<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 20c0-9 5-14 14-15 0 9-5 14-14 15z" /><path d="M5 20c3-5 6-8 10-10" /></svg></span> : ch)}</span></h1>
          <div className="lead">
            <h2>Soluções modernas para um campo mais saudável.</h2>
            <p>Unimos tecnologia, inovação e práticas sustentáveis para o produtor colher mais gastando menos.</p>
            <a className="pill" onClick={() => go("solucoes")}>Ver soluções →</a>
            <div className="trust"><span className="av"><i /><i /><i /></span><span>Mais de 10 mil<br />produtores atendidos</span></div>
          </div>
          <div className="script">Plantar hoje,<br />colher melhor.</div>
          <div className="stats"><span>Mais<br />produtividade</span><span>Práticas<br />mais verdes</span><span>Comunidades<br />fortes</span></div>
        </header>
      </div>

      <section className="sec imp" id="impacto">
        <div className="lab">Nosso impacto</div>
        <h2>Agro sustentável para as <b>próximas gerações.</b></h2>
        <p>Do solo à safra, damos ao produtor ferramentas, insumos e orientação técnica para uma produção mais produtiva e sustentável.</p>
      </section>

      <section className="sec" id="solucoes">
        <div className="cards">{SOL.map((s) => <a className="cd" key={s.t} onClick={() => go("cotacao")}><div className="im" style={{ backgroundImage: `url(${s.img})` }} /><div className="tx"><small>{s.k}</small><h3>{s.t}</h3></div><span className="go">→</span></a>)}</div>
        <div className="seed"><div /></div>
        <div className="foot"><span><b>100%</b> compromisso com a agricultura sustentável</span><span><b>Parcerias</b> em todo o país, segurança alimentar para todos</span></div>
      </section>

      <section className="cot" id="cotacao">
        <div><h2>Conte o tamanho da sua lavoura e receba um orçamento.</h2><p>Resposta no mesmo dia, direto no WhatsApp, com a equipe técnica de {city}.</p></div>
        <div className="f">
          <input aria-label="Seu nome" placeholder="Seu nome" value={nome} onChange={(e) => setNome(e.target.value)} />
          <select aria-label="Área" value={area} onChange={(e) => setArea(e.target.value)}><option>Até 100 ha</option><option>100 a 500 ha</option><option>500 a 2.000 ha</option><option>Acima de 2.000 ha</option></select>
          <a className="pill" href={wa} target="_blank" rel="noreferrer">Pedir orçamento no WhatsApp →</a>
        </div>
      </section>

      <footer><span>{brand} · {city}</span><span>Segunda a sábado, 7h às 18h</span></footer>
      {sc && <a className="wa" href={base} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 32 32" fill="#fff"><path d="M16 3a13 13 0 0 0-11 19.800L3 29l6.400-1.900A13 13 0 1 0 16 3zm0 2.400a10.600 10.600 0 1 1-5.400 19.700l-.4-.2-3.800 1.100 1.100-3.700-.3-.4A10.600 10.600 0 0 1 16 5.400zm-4 5.300c-.3 0-.7.100-1 .5-.4.400-1.300 1.300-1.300 3.100s1.300 3.600 1.500 3.900c.2.200 2.600 4.100 6.400 5.600 3.200 1.200 3.800 1 4.500.9.700-.1 2.200-.9 2.500-1.800.3-.9.300-1.600.2-1.800-.1-.2-.3-.3-.7-.5l-2.300-1.100c-.3-.1-.5-.2-.8.200l-1 1.200c-.2.300-.4.300-.8.100-.4-.2-1.500-.6-2.900-1.800-1.100-1-1.800-2.200-2-2.500-.2-.4 0-.6.200-.8l.6-.7c.2-.2.200-.4.400-.6.100-.3.100-.5 0-.7l-1-2.400c-.3-.6-.5-.5-.8-.5z" /></svg></a>}
    </div>
  );
}
