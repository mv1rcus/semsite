import { useEffect, useState } from "react";

/** Chocolateria a partir do pin "Choco Factory" (desktop): fundo marrom com brilhos, hero com trufas, sobre, tres caixas em molduras douradas e rodape ondulado. */
const IM = {
  hero: "/cf-hero.webp", fundo: "/cf-fundo.webp", avela: "/cf-avela.webp", caixa: "/cf-caixa.webp",
  rosa: "/cf-rosa.webp", coracao: "/cf-coracao.webp", tigela: "/cf-tigela.webp", bolo: "/cf-bolo.webp",
};
const NAV: [string, string][] = [["Início", "top"], ["Sobre", "sobre"], ["Caixas", "caixas"], ["Monte a sua", "contato"]];
const THUMBS = [
  { img: IM.avela, id: "sobre", alt: "Barra de chocolate com avelãs sobre madeira" },
  { img: IM.bolo, id: "caixas", alt: "Bolo de chocolate com lascas" },
  { img: IM.tigela, id: "caixas", alt: "Tigela com bombons variados" },
];
const BOXES = [
  { n: "01", tag: "caixa de madeira", t: "Caixa Trufa Escura", b: "Doze trufas de cacau 70% em caixa de madeira rústica, recheadas de ganache, nibs e avelã. Feitas em pequenos lotes.", img: IM.caixa, alt: "Caixa de madeira aberta com trufas de chocolate" },
  { n: "02", tag: "caixa rosé", t: "Caixa Dia de Festa", b: "Bombons sortidos em caixa rosé com tampa magnética. Sabores de frutas vermelhas, pistache, caramelo e flor de sal.", img: IM.rosa, alt: "Caixa rosa aberta com bombons sortidos" },
  { n: "03", tag: "caixa coração", t: "Coração Sortido", b: "A caixa para presentear: formato de coração, laço de cetim e bombons escolhidos por você. Personalizamos o cartão.", img: IM.coracao, alt: "Caixa em formato de coração com bombons e laço vermelho" },
];
const Wa = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M3 21l1.6-4.6A8.5 8.5 0 1 1 8 19.6L3 21z" /></svg>;

export function CacauFino({ client }: { client?: { name?: string; city?: string; whatsapp?: string } }) {
  const brand = client?.name?.trim() || "Cacau Fino";
  const city = client?.city || "Belo Horizonte, MG";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const wa = (t: string) => `https://wa.me/${num}?text=${encodeURIComponent(t)}`;
  const [menu, setMenu] = useState(false);
  const [toast, setToast] = useState("");
  const [mail, setMail] = useState("");
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(""), 2200); return () => clearTimeout(t); }, [toast]);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const send = () => {
    if (!/\S+@\S+\.\S+/.test(mail)) { setToast("Digite um e-mail válido"); return; }
    setToast("Pronto. Você vai receber as novidades."); setMail("");
  };
  return (
    <div className="cf" id="top">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=Nunito+Sans:wght@400;600&display=swap');
        .cf{background:#2b1409;color:#ead9c4;font-family:'Nunito Sans',Arial,sans-serif;font-weight:400;font-size:15px;line-height:1.7;overflow-x:hidden;background-image:radial-gradient(60% 40% at 20% 45%,#4a2412,transparent),radial-gradient(60% 40% at 85% 75%,#44200f,transparent)}
        .cf h1,.cf h2,.cf h3,.cf .lg{font-family:'Playfair Display',Georgia,serif;font-weight:400;text-wrap:balance}
        .cf .gold{color:#e0b565}
        .cf .toast{position:fixed;left:50%;bottom:26px;transform:translateX(-50%);background:#e0b565;color:#2b1409;padding:11px 18px;font-size:13px;z-index:60}
        .cf nav{display:flex;justify-content:space-between;align-items:center;padding:26px 80px;position:relative;z-index:5}
        .cf .lg{font-size:24px;color:#e0b565;text-decoration:none;letter-spacing:.02em;line-height:1.1}
        .cf .links{display:flex;gap:38px;align-items:center}.cf .links a{color:#ead9c4;text-decoration:none;font-size:13px;cursor:pointer}.cf .links a:hover{color:#e0b565}
        .cf .nb{display:flex;gap:18px;color:#e0b565;align-items:center}
        .cf .burger{display:none;background:none;border:0;color:#e0b565;cursor:pointer}
        .cf .mob{display:none}
        .cf .hero{position:relative;min-height:640px;overflow:hidden}
        .cf .hero .ph{position:absolute;right:0;top:0;bottom:0;width:64%}
        .cf .hero .ph img{width:100%;height:100%;object-fit:cover;object-position:60% 40%;display:block;-webkit-mask-image:linear-gradient(90deg,transparent,#000 42%),linear-gradient(0deg,transparent,#000 35%);-webkit-mask-composite:source-in;mask-image:linear-gradient(90deg,transparent,#000 42%),linear-gradient(0deg,transparent,#000 35%);mask-composite:intersect}
                .cf .ht{position:relative;z-index:2;padding:90px 80px 0;max-width:620px}
        .cf .eyebrow{font-size:13px;color:#ead9c4;margin:0 0 6px}
        .cf h1{font-size:56px;line-height:1.05;color:#e0b565;margin:0 0 10px;letter-spacing:-.01em}
        .cf .sub{font-size:16px;margin:0 0 34px;color:#ead9c4}
        .cf .ob{display:inline-block;border:1px solid #e0b565;color:#e0b565;padding:13px 40px;font-size:13px;text-decoration:none;cursor:pointer;background:none;font-family:inherit}
        .cf .ob:hover{background:#e0b565;color:#2b1409}
        .cf .th{display:flex;gap:26px;margin-top:70px}
        .cf .th button{width:92px;height:96px;border-radius:12px;border:0;padding:5px;background:linear-gradient(160deg,#a8602c,#6a3515);cursor:pointer}
        .cf .th img{width:100%;height:100%;object-fit:cover;border-radius:8px;display:block}
        .cf .sobre{display:grid;grid-template-columns:1fr 1fr;gap:70px;align-items:center;max-width:1100px;margin:90px auto 0;padding:0 60px}
        .cf .sobre .im{aspect-ratio:4/3;overflow:hidden;border-radius:6px}.cf .sobre .im img{width:100%;height:100%;object-fit:cover;display:block}
        .cf h2{font-size:34px;line-height:1.2;color:#e0b565;margin:0 0 20px;letter-spacing:-.005em}
        .cf .sobre h2:after{content:"";display:block;width:90px;height:2px;background:#e0b565;margin-top:14px}
        .cf .sobre p{margin:0 0 14px;max-width:420px}
        .cf .ex{max-width:1100px;margin:110px auto 0;padding:0 60px}
        .cf .bx{display:grid;grid-template-columns:1fr 1fr;gap:70px;align-items:center;margin-top:70px}
        .cf .bx.r .tx{order:2}
        .cf .nm{font-family:'Playfair Display',Georgia,serif;font-size:48px;color:#e0b565;line-height:1;display:flex;align-items:baseline;gap:12px;margin-bottom:10px}
        .cf .nm small{font-family:'Nunito Sans',Arial,sans-serif;font-size:12px;color:#ead9c4}
        .cf h3{font-size:26px;line-height:1.2;color:#e0b565;margin:0 0 14px}
        .cf .bx p{margin:0 0 24px;max-width:380px;font-size:14px}
        .cf .fr{position:relative;aspect-ratio:4/3}
        .cf .fr:before{content:"";position:absolute;inset:-18px 12% 12% -18px;border:1px solid #e0b565;clip-path:polygon(0 0,100% 0,100% 100%,0 0);display:none}
        .cf .fr .t{position:absolute;inset:0;border:1px solid #e0b565;transform:translate(16px,-16px);border-radius:4px}
        .cf .bx.r .fr .t{transform:translate(-16px,-16px)}
        .cf .fr img{position:relative;width:100%;height:100%;object-fit:cover;display:block;border-radius:4px;box-shadow:0 24px 50px rgba(0,0,0,.45)}
        .cf .ft{position:relative;margin-top:130px;padding:110px 80px 36px;background:#3b1c0c;overflow:hidden}
        .cf .ft .bg{position:absolute;inset:0;opacity:.18}.cf .ft .bg img{width:100%;height:100%;object-fit:cover}
        .cf .ft:before{content:"";position:absolute;left:0;right:0;top:-1px;height:70px;background:#2b1409;border-radius:0 0 50% 50%/0 0 100% 100%;z-index:1}
        .cf .fg{position:relative;z-index:2;max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr 1fr;gap:50px;align-items:start}
        .cf .fg h4{font-family:'Playfair Display',Georgia,serif;font-weight:400;font-size:18px;color:#e0b565;margin:0 0 12px}
        .cf .fg p,.cf .fg a{display:block;font-size:14px;color:#ead9c4;text-decoration:none;margin:0 0 6px;cursor:pointer}
        .cf .fg a:hover{color:#e0b565}
        .cf .fc{text-align:center}.cf .fc .lg{font-size:30px;display:block;margin-bottom:18px}
        .cf .fc img{width:190px;height:190px;border-radius:50%;object-fit:cover;border:6px solid #e0b565;display:block;margin:0 auto}
        .cf .em{display:flex;margin-top:16px;border:1px solid #e0b565}.cf .em input{flex:1;min-width:0;background:none;border:0;color:#ead9c4;padding:12px 14px;font:inherit;font-size:14px;outline:none}.cf .em input::placeholder{color:#b99f86}
        .cf .em button{background:#e0b565;color:#2b1409;border:0;padding:0 18px;cursor:pointer;font:inherit;font-size:13px;font-weight:600}
        .cf .cp{position:relative;z-index:2;max-width:1100px;margin:50px auto 0;display:flex;justify-content:space-between;font-size:12px;color:#b99f86;flex-wrap:wrap;gap:10px}
        @media(max-width:900px){
          .cf nav{padding:20px 22px}.cf .links,.cf .nb{display:none}.cf .burger{display:block}
          .cf .mob{display:flex;flex-direction:column;position:absolute;z-index:6;left:14px;right:14px;top:66px;background:#3b1c0c;border:1px solid #e0b565;padding:10px}.cf .mob a{padding:12px 10px;color:#ead9c4;text-decoration:none;font-size:14px;cursor:pointer}
          .cf .hero{min-height:0}
          .cf .hero .ph{position:relative;width:100%;height:300px;order:2}.cf .hero .ph img{-webkit-mask-image:linear-gradient(180deg,transparent,#000 30%);mask-image:linear-gradient(180deg,transparent,#000 30%)}
          .cf .hero{display:flex;flex-direction:column}
          .cf .ht{padding:20px 22px 0;order:1}.cf h1{font-size:42px}
          .cf .th{margin-top:34px;gap:14px}.cf .th button{width:76px;height:80px}
          .cf .sobre{grid-template-columns:1fr;gap:30px;margin-top:60px;padding:0 22px}
          .cf .ex{padding:0 22px;margin-top:80px}.cf h2{font-size:28px}
          .cf .bx{grid-template-columns:1fr;gap:34px;margin-top:56px}.cf .bx.r .tx{order:0}
          .cf .fr .t,.cf .bx.r .fr .t{transform:translate(8px,-8px)}.cf .fr{margin-right:8px}
          .cf .ft{padding:90px 22px 30px}.cf .fg{grid-template-columns:1fr;gap:34px}.cf .fc{order:-1}
        }
      `}</style>
      <header className="hero">
        <div className="ph"><img src={IM.hero} alt="Trufas de chocolate com fio de leite caindo sobre uma tábua escura" /></div>
        <nav style={{ position: "absolute", left: 0, right: 0, top: 0 }}>
          <a className="lg" href="#top">{brand}</a>
          <div className="links">{NAV.map(([l, id]) => <a key={id} onClick={() => go(id)}>{l}</a>)}</div>
          <div className="nb"><a className="gold" href={wa("Oi! Quero fazer um pedido.")} target="_blank" rel="noreferrer" aria-label="Chamar no WhatsApp"><Wa /></a></div>
          <button className="burger" aria-label="Abrir menu" onClick={() => setMenu(!menu)}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M4 7h16M4 12h16M4 17h16" /></svg></button>
          {menu && <div className="mob">{NAV.map(([l, id]) => <a key={id} onClick={() => go(id)}>{l}</a>)}</div>}
        </nav>
        <div className="ht" style={{ paddingTop: 150 }}>
          <p className="eyebrow">Procurando o melhor chocolate?</p>
          <h1>{brand}</h1>
          <p className="sub">Novidade em {city.split(",")[0]}, feita em pequenos lotes.</p>
          <a className="ob" onClick={() => go("caixas")}>Ver a loja</a>
          <div className="th">{THUMBS.map((t, k) => <button key={k} aria-label={`Ver ${t.alt}`} onClick={() => go(t.id)}><img src={t.img} alt={t.alt} /></button>)}</div>
        </div>
      </header>

      <section className="sobre" id="sobre">
        <div className="im"><img src={IM.avela} alt="Barra de chocolate com avelãs sobre madeira rústica" /></div>
        <div>
          <h2>Sobre nós</h2>
          <p>Somos uma chocolateria artesanal de {city}. Escolhemos cacau de origem, torramos em pequenos lotes e temperamos à mão.</p>
          <p>Nossa equipe cuida de cada bombom, do recheio ao laço da caixa. Venha conhecer a coleção e provar a diferença de um chocolate feito sem pressa.</p>
        </div>
      </section>

      <section className="ex" id="caixas">
        <h2>Explore novos sabores</h2>
        {BOXES.map((b, k) => (
          <div key={b.n} className={`bx${k % 2 ? " r" : ""}`}>
            <div className="tx">
              <div className="nm">{b.n}<small>{b.tag}</small></div>
              <h3>{b.t}</h3>
              <p>{b.b}</p>
              <a className="ob" href={wa(`Oi! Quero saber mais sobre a ${b.t}.`)} target="_blank" rel="noreferrer">Ver mais</a>
            </div>
            <div className="fr"><span className="t" /><img src={b.img} alt={b.alt} /></div>
          </div>
        ))}
      </section>

      <footer className="ft" id="contato">
        <div className="bg"><img src={IM.fundo} alt="" /></div>
        <div className="fg">
          <div>
            <h4>Visite</h4>
            <p>{city}</p>
            <p>Terça a sábado, 10h às 19h</p>
            <h4 style={{ marginTop: 28 }}>Explore</h4>
            <a onClick={() => go("sobre")}>Sobre nós</a><a onClick={() => go("caixas")}>Nossas caixas</a>
            <a href={wa("Oi! Quero saber dos ingredientes.")} target="_blank" rel="noreferrer">Ingredientes</a>
          </div>
          <div className="fc">
            <span className="lg">{brand}</span>
            <img src={IM.tigela} alt="Tigela com bombons variados vista de cima" />
          </div>
          <div>
            <h4>Monte a sua caixa</h4>
            <a href={wa("Oi! Quero montar uma caixa personalizada.")} target="_blank" rel="noreferrer">Chamar no WhatsApp</a>
            <h4 style={{ marginTop: 28 }}>Receba novidades</h4>
            <div className="em"><input type="email" placeholder="Seu e-mail" value={mail} onChange={(e) => setMail(e.target.value)} aria-label="E-mail" /><button onClick={send}>Enviar</button></div>
          </div>
        </div>
        <div className="cp"><span>© 2026 {brand}. Todos os direitos reservados.</span><span>Política de privacidade · Termos de uso</span></div>
      </footer>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
