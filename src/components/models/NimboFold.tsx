import { useState } from "react";

/** Vitrine de agencia criativa ("Nimbo Estudio"), feita a partir de um pin com um hero unico em azul royal e lilas: titulo com degrade, homem deitado numa nuvem roxa, cards de vidro flutuantes, icones de cristal e faixa de clientes. */
const SERV = [
  ["UI/UX Design", "Bonito e usável", "M4 20l4-1 11-11-3-3L5 16l-1 4z"],
  ["Desenvolvimento web", "Rápido e escalável", "M8 7l-5 5 5 5M16 7l5 5-5 5"],
  ["Soluções criativas", "Ideias com impacto", "M13 2L4 14h7l-1 8 9-12h-7l1-8z"],
  ["Foco no cliente", "O seu sucesso", "M12 21s-7-4.500-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.500-9 9-9 9z"],
] as const;
const CLIENTS = ["Lumiar", "Orbita", "Vértice", "Prisma", "Fluxo"];
const WORK = [["Marca e site para fintech", "Branding · Web", "linear-gradient(135deg,#2a47c9,#8a6ff0)"], ["App de delivery regional", "UI/UX · App", "linear-gradient(135deg,#5b3fd0,#e7a3e0)"], ["Loja virtual de cosméticos", "E-commerce", "linear-gradient(135deg,#1f9fd8,#7c6ef0)"]];

function Ico({ d, s = 18 }: { d: string; s?: number }) {
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>;
}

export function NimboFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Nimbo";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const base = `https://wa.me/${num}`;
  const wa = (t: string) => `${base}?text=${encodeURIComponent(t)}`;
  const [menu, setMenu] = useState(false);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const links: [string, string][] = [["Início", "top"], ["Sobre", "sobre"], ["Serviços", "servicos"], ["Portfólio", "portfolio"], ["Blog", "contato"], ["Contato", "contato"]];
  return (
    <div className="nb" id="top" style={{ fontFamily: "'Outfit', system-ui, sans-serif", color: "#fff", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Caveat:wght@500&display=swap');
        .nb *{box-sizing:border-box}.nb a,.nb button{font-family:inherit}
        .nb h1,.nb h2,.nb h3,.nb .lg{font-family:'Outfit',system-ui,sans-serif!important;font-weight:700!important;font-style:normal!important;text-transform:none!important;margin:0;letter-spacing:-.02em!important;text-wrap:balance}
        .nb .sky{background:radial-gradient(ellipse 60% 70% at 78% 30%,rgba(214,170,240,.6),transparent 70%),linear-gradient(135deg,rgba(23,56,159,.9) 0%,rgba(46,85,214,.78) 38%,rgba(111,111,226,.6) 70%,rgba(189,164,236,.55) 100%),url(/nimbo-ceu.webp) center/cover,#2e55d6;position:relative;overflow:hidden}
        .nb .sky:after{content:"";position:absolute;left:0;right:0;bottom:0;height:22%;background:linear-gradient(180deg,transparent,rgba(190,170,240,.55));pointer-events:none}
        .nb .hero{min-height:800px;max-width:1440px;margin:0 auto;position:relative;padding:0 64px}
        .nb .nv{display:flex;align-items:center;justify-content:space-between;padding-top:26px;position:relative;z-index:5}
        .nb .lg{display:flex;align-items:center;gap:8px;font-size:22px}.nb .lg i{width:24px;height:26px;border-radius:7px;background:linear-gradient(135deg,#8ee6ff,#9a6bff);display:inline-block}
        .nb .lk{display:flex;gap:40px;font-size:14px;font-weight:400}.nb .lk a{cursor:pointer;padding-bottom:6px;color:#e6ebff}.nb .lk a.on{color:#fff;border-bottom:2px solid #6fd0ff}
        .nb .cta{display:inline-flex;align-items:center;gap:10px;background:linear-gradient(90deg,#2a5bf0,#4a7cff);border:1px solid rgba(255,255,255,.4);color:#fff;font-size:14px;font-weight:500;padding:13px 26px;border-radius:99px;text-decoration:none;box-shadow:0 8px 24px rgba(30,60,200,.45);cursor:pointer}
        .nb .bg{display:none;background:none;border:0;cursor:pointer}
        .nb .cp{position:absolute;right:4%;top:8%;width:46%;aspect-ratio:.9;background:url(/nimbo-nuvem.webp) 30% 40%/cover;-webkit-mask-image:radial-gradient(ellipse 50% 50% at 50% 50%,#000 58%,transparent 100%);mask-image:radial-gradient(ellipse 50% 50% at 50% 50%,#000 58%,transparent 100%);z-index:1}
        .nb .tx{position:relative;z-index:3;padding-top:64px;max-width:620px}
        .nb .ch{display:inline-flex;align-items:center;gap:10px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.22);padding:12px 20px;border-radius:14px;font-size:15px;font-weight:400;backdrop-filter:blur(8px)}
        .nb h1{font-size:clamp(46px,5.4vw,76px);line-height:1.04;margin-top:26px!important;color:#fff}
        .nb h1 em{display:block;font-style:normal!important;background:linear-gradient(90deg,#5fe6e0 0%,#7aa6ff 40%,#b56dff 100%);-webkit-background-clip:text;background-clip:text;color:transparent;position:relative;padding-bottom:4px}
        .nb h1 em:after{content:"";position:absolute;left:3%;bottom:-2px;width:22%;height:3px;border-radius:3px;background:linear-gradient(90deg,#a98bff,transparent)}
        .nb .sub{font-size:19px;line-height:1.6;color:#d3dcff;font-weight:300;margin:30px 0 0;max-width:430px}
        .nb .ft{display:flex;gap:16px;margin-top:34px;flex-wrap:nowrap}.nb .ft div{display:flex;gap:9px;align-items:center;font-size:12px;font-weight:500;line-height:1.3}.nb .ft small{display:block;font-size:10px;color:#aebcf2;font-weight:300}
        .nb .ft i{width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.28);display:grid;place-items:center;flex:none}
        .nb .bt{display:flex;gap:18px;align-items:center;margin-top:34px}
        .nb .bt .cta{padding:17px 30px;font-size:16px;background:linear-gradient(90deg,#4b6bff,#b56dff)}
        .nb .pl{display:inline-flex;align-items:center;gap:12px;border:1px solid rgba(255,255,255,.3);border-radius:99px;padding:8px 26px 8px 8px;font-size:15px;color:#fff;cursor:pointer;background:rgba(255,255,255,.06)}.nb .pl i{width:42px;height:42px;border-radius:50%;background:rgba(255,255,255,.16);display:grid;place-items:center}
        .nb .gl{position:absolute;z-index:4;background:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.45);backdrop-filter:blur(10px);border-radius:18px;box-shadow:0 10px 30px rgba(60,40,160,.25);font-size:15px}
        .nb .g1{left:55%;top:17%;padding:14px 20px 14px 14px;display:flex;gap:12px;align-items:center;font-weight:500}.nb .g1 i{width:36px;height:36px;border-radius:50%;background:#3b5be0;display:grid;place-items:center}.nb .g1 u{display:block;height:5px;width:90px;border-radius:5px;background:rgba(255,255,255,.35);margin-top:5px;text-decoration:none;position:relative}.nb .g1 u:after{content:"";position:absolute;inset:0 40% 0 0;border-radius:5px;background:#8f7bff}
        .nb .g2{right:5%;top:41%;padding:12px 22px 12px 12px;display:flex;gap:10px;align-items:center;font-size:12px;font-weight:500}.nb .g2 i{width:30px;height:30px;border-radius:50%;background:#fff;display:grid;place-items:center}.nb .g2 small{display:block;font-size:10px;font-weight:300;color:#e3e6ff}
        .nb .sc{position:absolute;right:11%;top:11%;font-family:'Caveat',cursive;font-size:24px;line-height:1.05;color:#fff;z-index:4;transform:rotate(-8deg);opacity:.92}
        .nb .cr{position:absolute;z-index:4;border-radius:20px;background:linear-gradient(135deg,rgba(255,255,255,.65),rgba(140,120,255,.55) 45%,rgba(120,200,255,.5));border:1px solid rgba(255,255,255,.7);box-shadow:0 14px 30px rgba(50,30,160,.3);display:grid;place-items:center}
        .nb .c1{right:2%;top:25%;width:78px;height:86px;transform:rotate(14deg)}.nb .c2{left:43%;bottom:17%;width:96px;height:96px;transform:rotate(-8deg);border:0;box-shadow:none;background:url(/nimbo-cristal.webp) center/cover;mix-blend-mode:screen;border-radius:0;-webkit-mask-image:radial-gradient(closest-side,#000 55%,transparent 100%);mask-image:radial-gradient(closest-side,#000 55%,transparent 100%)}.nb .c3{right:6%;bottom:30%;width:60px;height:60px;border-radius:50%;background:transparent;border:7px solid rgba(190,220,255,.7);box-shadow:0 8px 20px rgba(50,30,160,.3)}
        .nb .bar{position:absolute;left:64px;right:64px;bottom:34px;display:flex;justify-content:space-between;align-items:flex-end;z-index:4;font-size:12px;color:#d3dcff}
        .nb .cl{display:flex;gap:34px;align-items:center;margin-top:10px;font-size:20px;font-weight:600;color:rgba(255,255,255,.82)}.nb .cl span:nth-child(3n){font-weight:300}.nb .cl span:nth-child(even){letter-spacing:.06em}
        .nb .scr{display:flex;align-items:center;gap:8px;font-size:11px}.nb .scr i{width:20px;height:30px;border:2px solid #fff;border-radius:12px;display:block;position:relative}.nb .scr i:after{content:"";position:absolute;left:7px;top:5px;width:2px;height:6px;background:#fff;border-radius:2px}
        .nb .sec{background:#0d1640;padding:92px 64px}.nb .in{max-width:1180px;margin:0 auto}
        .nb h2{font-size:clamp(32px,3.6vw,48px);line-height:1.08;color:#fff}.nb h2 em{font-style:normal;background:linear-gradient(90deg,#5fe6e0,#b56dff);-webkit-background-clip:text;background-clip:text;color:transparent}
        .nb .k{font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:#8fa6ff;margin-bottom:14px}
        .nb .sb{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center}.nb .sb p{font-size:18px;line-height:1.7;color:#c4cff5;font-weight:300;margin:20px 0 0}
        .nb .nm{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.nb .nm div{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);border-radius:20px;padding:26px 18px}.nb .nm b{display:block;font-size:40px;font-weight:700;background:linear-gradient(90deg,#7aa6ff,#c07dff);-webkit-background-clip:text;background-clip:text;color:transparent}.nb .nm span{font-size:13px;color:#aebcf2}
        .nb .sv{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:44px}.nb .sv div{background:linear-gradient(160deg,rgba(255,255,255,.12),rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.18);border-radius:22px;padding:28px 22px}.nb .sv i{width:46px;height:46px;border-radius:50%;background:linear-gradient(135deg,#3f66f0,#a370ff);display:grid;place-items:center;margin-bottom:20px}.nb .sv b{display:block;font-size:19px;font-weight:600}.nb .sv span{font-size:14px;color:#aebcf2;font-weight:300}
        .nb .wk{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}.nb .wk a{display:flex;flex-direction:column;justify-content:flex-end;min-height:260px;border-radius:24px;padding:26px;color:#fff;text-decoration:none;position:relative;overflow:hidden;cursor:pointer}.nb .wk a:before{content:"";position:absolute;right:-30px;top:-30px;width:150px;height:150px;border-radius:50%;background:rgba(255,255,255,.2);filter:blur(4px)}.nb .wk b{font-size:22px;font-weight:600;position:relative}.nb .wk span{font-size:13px;opacity:.85;position:relative}
        .nb .fim{text-align:center;padding:96px 28px}.nb .fim h2{max-width:720px;margin:0 auto}.nb .fim p{font-size:18px;color:#e0e6ff;font-weight:300;margin:18px 0 32px}
        .nb .ff{background:#0a1236;text-align:center;font-size:13px;color:#8d9bd6;padding:26px}
        .nb .wa{position:fixed;right:18px;bottom:18px;z-index:60;width:56px;height:56px;border-radius:50%;background:#25d366;display:grid;place-items:center;box-shadow:0 8px 24px rgba(0,0,0,.35)}
        .nb .mn{position:absolute;left:20px;right:20px;top:70px;z-index:9;background:#14246d;border:1px solid rgba(255,255,255,.2);border-radius:18px;padding:16px 22px;display:flex;flex-direction:column;gap:14px;font-size:15px}
        @media(max-width:900px){
          .nb .hero{padding:0 20px;min-height:0;padding-bottom:30px}.nb .lk,.nb .nv>.cta{display:none}.nb .bg{display:block}
          .nb .tx{padding-top:30px}.nb .cp{position:relative;right:auto;top:auto;width:100%;margin-top:10px;aspect-ratio:1}.nb .g1{left:5%;right:auto;top:92px;font-size:12px}.nb .g2,.nb .c1,.nb .c2,.nb .c3,.nb .sc{display:none}.nb .ft{flex-wrap:wrap}
          .nb .bar{position:relative;left:auto;right:auto;bottom:auto;margin-top:28px;flex-direction:column;align-items:flex-start;gap:20px}.nb .cl{flex-wrap:wrap;gap:20px;font-size:17px}
          .nb .sec{padding:64px 20px}.nb .sb,.nb .wk{grid-template-columns:1fr}.nb .sv{grid-template-columns:1fr 1fr}.nb .nm b{font-size:30px}
        }
      `}</style>
      <section className="sky"><div className="hero">
        <div className="nv">
          <b className="lg"><i />{brand}</b>
          <div className="lk">{links.slice(0, 5).map(([t, id], k) => <a key={t} className={k === 0 ? "on" : ""} onClick={() => go(id)}>{t}</a>)}</div>
          <a className="cta" href={wa("Olá! Quero começar um projeto com a " + brand + ".")} target="_blank" rel="noreferrer">Começar agora <span>→</span></a>
          <button className="bg" aria-label="Menu" onClick={() => setMenu(!menu)}><svg width="28" height="28" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16" /></svg></button>
        </div>
        {menu && <div className="mn">{links.map(([t, id]) => <a key={t} onClick={() => go(id)}>{t}</a>)}</div>}
        <div className="cp" role="img" aria-label="Homem relaxado sobre uma nuvem lilás" />
        <div className="gl g1"><i><Ico d="M4 6h16v10H8l-4 4V6z" s={16} /></i><div>Grandes sonhos<br />Resultados reais<u /></div></div>
        <div className="sc">Criar<br />Construir<br />Crescer</div>
        <div className="cr c1"><Ico d="M8 7l-5 5 5 5M16 7l5 5-5 5" s={30} /></div>
        <div className="cr c2" />
        <div className="cr c3" />
        <div className="gl g2"><i><svg width="16" height="16" viewBox="0 0 24 24" fill="#6b4fe0"><path d="M12 21s-7-4.500-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.500-9 9-9 9z" /></svg></i><div>Ideias criativas<small>Que importam</small></div></div>
        <div className="tx">
          <span className="ch"><svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M12 2l2.200 7.800L22 12l-7.800 2.200L12 22l-2.200-7.800L2 12l7.800-2.200z" /></svg>Transforme ideias em realidade</span>
          <h1>Sonhe maior<em>Crie melhor</em></h1>
          <p className="sub">Criamos experiências digitais que inspiram, constroem marcas e dão vida às suas ideias.</p>
          <div className="ft">{SERV.map(([a, b, d]) => <div key={a}><i><Ico d={d} s={15} /></i><span>{a}<small>{b}</small></span></div>)}</div>
          <div className="bt"><a className="cta" onClick={() => go("portfolio")}>Ver nossos trabalhos <span>→</span></a><a className="pl" href={wa("Olá! Quero ver um vídeo da " + brand + ".")} target="_blank" rel="noreferrer"><i><svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M7 4l13 8-13 8z" /></svg></i>Assistir vídeo</a></div>
        </div>
        <div className="bar"><div>— Quem confia na gente<div className="cl">{CLIENTS.map((c) => <span key={c}>{c}</span>)}</div></div><div className="scr"><i />Role para explorar</div></div>
      </div></section>
      <section className="sec" id="sobre"><div className="in sb">
        <div><div className="k">Sobre a {brand}</div><h2>Um estúdio que <em>transforma ideias</em> em marcas e sites que vendem</h2><p>Somos um time pequeno de designers e desenvolvedores. Do primeiro rascunho ao site no ar, cuidamos de cada detalhe para a sua marca aparecer bem e converter mais.</p></div>
        <div className="nm"><div><b>120+</b><span>projetos entregues</span></div><div><b>8 anos</b><span>de estrada</span></div><div><b>98%</b><span>clientes que voltam</span></div></div>
      </div></section>
      <section className="sec" id="servicos" style={{ background: "#0a1236" }}><div className="in"><div className="k">Serviços</div><h2>O que a gente <em>faz por você</em></h2>
        <div className="sv">{SERV.map(([a, b, d]) => <div key={a}><i><Ico d={d} s={20} /></i><b>{a}</b><span>{b}</span></div>)}</div></div></section>
      <section className="sec" id="portfolio"><div className="in"><div className="k">Portfólio</div><h2>Trabalhos <em>recentes</em></h2>
        <div className="wk">{WORK.map(([t, s, bg]) => <a key={t} style={{ background: bg }} href={wa("Olá! Gostei do projeto: " + t)} target="_blank" rel="noreferrer"><b>{t}</b><span>{s}</span></a>)}</div></div></section>
      <section className="sky fim" id="contato"><h2>Vamos criar algo <em style={{ background: "linear-gradient(90deg,#8ff0e8,#e0b8ff)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>incrível juntos?</em></h2><p>Conte sua ideia e receba uma proposta em até 48 horas.</p><a className="cta" href={wa("Olá! Quero uma proposta da " + brand + ".")} target="_blank" rel="noreferrer">Falar no WhatsApp <span>→</span></a></section>
      <div className="ff">© {new Date().getFullYear()} {brand} Estúdio · {client?.city?.trim() || "São Paulo"}</div>
      <a className="wa" href={base} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="28" height="28" viewBox="0 0 32 32" fill="#fff"><path d="M16 3a13 13 0 0 0-11 19.800L3 29l6.400-2A13 13 0 1 0 16 3zm0 2.400a10.600 10.600 0 1 1-5.600 19.600l-.4-.2-3.800 1.200 1.200-3.700-.3-.4A10.600 10.600 0 0 1 16 5.400zm-3.600 5.200c-.3 0-.7.100-1 .5-.4.400-1.300 1.300-1.300 3.100s1.400 3.600 1.600 3.800c.2.300 2.700 4.200 6.600 5.700 3.200 1.200 3.800 1 4.500.9.700-.1 2.200-.9 2.500-1.800.3-.9.300-1.600.2-1.800-.1-.2-.4-.3-.8-.5l-2.600-1.300c-.4-.1-.6-.1-.9.200l-1.200 1.500c-.2.300-.5.300-.8.100-.4-.2-1.600-.6-3-1.900-1.100-1-1.900-2.300-2.100-2.700-.2-.4 0-.6.200-.8l.6-.7c.2-.2.300-.4.400-.7.100-.3.100-.5 0-.7l-1.200-3c-.3-.7-.6-.7-.9-.7z" /></svg></a>
    </div>
  );
}
