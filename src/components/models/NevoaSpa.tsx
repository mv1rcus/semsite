import { useEffect, useState } from "react";

/** Spa hotel de luxo de montanha a partir do pin "Spaxury": hero escuro em moldura de vidro, serif elegante, estatisticas e depoimento. */
const SV = [
  { n: "Suítes com vista", d: "Quartos amplos com lareira, varanda e janelas do chão ao teto para a montanha.", img: "/nv-s1.webp" },
  { n: "Sauna e termas", d: "Circuito de sauna seca, vapor e piscina aquecida de borda infinita sob a neve.", img: "/nv-s2.webp" },
  { n: "Massagens e rituais", d: "Terapias com óleos locais, pedras quentes e silêncio absoluto, sob medida para você.", img: "/nv-s3.webp" },
];
const NAV: [string, string][] = [["Início", "top"], ["Serviços", "servicos"], ["Quartos", "servicos"], ["Contato", "contato"]];
const Ar = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.200" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M7 17L17 7M8 7h9v9" /></svg>;

export function NevoaSpa({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Névoa Spa Hotel";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const city = client?.city || "Campos do Jordão";
  const [menu, setMenu] = useState(false);
  const [toast, setToast] = useState("");
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(""), 1800); return () => clearTimeout(t); }, [toast]);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const wa = (t: string) => `https://wa.me/${num}?text=${encodeURIComponent(t)}`;
  return (
    <div className="nv" id="top">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500;600&display=swap');
        .nv{background:#0c121b;color:#e9edf3;font-family:'Inter',Arial,sans-serif;overflow-x:hidden;position:relative}
        .nv *{box-sizing:border-box}.nv a,.nv button{font-family:inherit;cursor:pointer}
        .nv h1,.nv h2,.nv h3{font-family:'Newsreader',Georgia,serif;font-weight:400;margin:0;color:#f4f6fa}
        .nv .frame{position:relative;margin:26px;min-height:calc(100vh - 52px);min-height:760px;border-radius:26px;overflow:hidden;border:3px solid rgba(255,255,255,.32);box-shadow:0 0 0 1px rgba(0,0,0,.5),0 30px 80px rgba(0,0,0,.6)}
        .nv .frame>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:60% 50%}
        .nv .frame:before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(8,14,24,.78) 0,rgba(8,14,24,.35) 48%,rgba(8,14,24,.05) 100%),linear-gradient(180deg,rgba(8,14,24,.5),rgba(8,14,24,0) 22%,rgba(8,14,24,0) 70%,rgba(8,14,24,.55))}
        .nv .z{position:relative;z-index:2}
        .nv .bar{display:flex;gap:34px;padding:20px 40px 0;font-size:12px;color:#dfe6ef}.nv .bar span{display:flex;gap:8px;align-items:center}.nv .bar .r{margin-left:auto}
        .nv .bar svg{width:14px;height:14px}
        .nv nav{display:flex;align-items:center;gap:60px;padding:18px 40px 0}.nv .logo{font-family:'Newsreader',serif;font-size:21px;color:#fff;text-decoration:none;letter-spacing:.02em}
        .nv .links{display:flex;gap:34px;flex:1}.nv .links a{color:#dfe6ef;text-decoration:none;font-size:14px;opacity:.9}
        .nv .bk{display:inline-flex;align-items:center;gap:10px;background:rgba(255,255,255,.14);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.28);color:#fff;border-radius:40px;padding:12px 22px;font-size:14px;text-decoration:none}
        .nv .bk i{width:34px;height:34px;border-radius:50%;background:#fff;color:#0c121b;display:grid;place-items:center;margin:-6px -12px -6px 4px}
        .nv .burger{display:none;background:none;border:0;color:#fff}
        .nv .hc{padding:150px 64px 0;max-width:760px}.nv .stars{display:flex;gap:10px;align-items:center;font-size:13px;color:#e4eaf2;margin-bottom:28px}.nv .stars b{color:#f3c04e;letter-spacing:2px;font-weight:400}
        .nv h1{max-width:470px;font-size:58px;line-height:1.08;letter-spacing:-.01em}.nv .hc p{font-size:16px;line-height:1.7;color:#c4cddb;max-width:380px;margin:22px 0 26px;font-weight:300}
        .nv .pill{position:absolute;z-index:2;right:25%;top:36%;background:rgba(15,22,34,.55);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.2);border-radius:30px;padding:9px 18px;font-size:13px;display:flex;gap:8px;align-items:center}
        .nv .st{position:absolute;z-index:2;left:64px;bottom:44px;display:flex;gap:44px;align-items:center}.nv .st div{display:flex;flex-direction:column}.nv .st b{font-family:'Newsreader',serif;font-weight:400;font-size:46px;line-height:1;color:#fff}.nv .st span{font-size:13px;color:#b5c0cf;margin-top:8px}.nv .st i{width:1px;height:70px;background:rgba(255,255,255,.3)}
        .nv .tm{position:absolute;z-index:2;right:44px;bottom:44px;width:420px;background:rgba(18,26,40,.5);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.18);border-radius:22px;padding:18px;display:flex;gap:16px;align-items:center}
        .nv .tm img{width:84px;height:84px;border-radius:16px;object-fit:cover;flex:none}.nv .tm p{margin:0 0 8px;font-size:14px;line-height:1.5;color:#e6ecf4}.nv .tm small{font-size:12px;color:#aab6c6}
        .nv .sec{padding:90px 40px 40px;max-width:1240px;margin:0 auto}.nv .sec .k{font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:#8fa3bd}
        .nv .sec h2{font-size:48px;margin:12px 0 44px;max-width:620px}
        .nv .cards{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}.nv .card{background:#131b28;border:1px solid rgba(255,255,255,.08);border-radius:22px;overflow:hidden}
        .nv .card img{display:block;width:100%;aspect-ratio:4/3;object-fit:cover}.nv .card div{padding:24px 26px 30px}.nv .card h3{font-size:26px;margin-bottom:10px}.nv .card p{margin:0 0 18px;font-size:14px;line-height:1.7;color:#aab6c6;font-weight:300}
        .nv .card a{color:#fff;text-decoration:none;font-size:14px;display:inline-flex;gap:8px;align-items:center;border-bottom:1px solid rgba(255,255,255,.4);padding-bottom:3px}
        .nv footer{padding:50px 40px 36px;max-width:1240px;margin:0 auto;display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:30px;font-size:14px;color:#aab6c6;border-top:1px solid rgba(255,255,255,.1);margin-top:60px}
        .nv footer h4{margin:0 0 12px;color:#fff;font-weight:500;font-size:14px}.nv footer p,.nv footer a{margin:0 0 6px;display:block;color:#aab6c6;text-decoration:none}.nv footer .dm{grid-column:1/-1;font-size:12px;padding-top:14px;border-top:1px solid rgba(255,255,255,.1)}
        .nv .wa{position:fixed;right:14px;bottom:14px;width:48px;height:48px;border-radius:50%;background:#25d366;display:grid;place-items:center;z-index:30;box-shadow:0 6px 18px rgba(0,0,0,.35)}
        .nv .toast{position:fixed;left:50%;bottom:76px;transform:translateX(-50%);background:#fff;color:#0c121b;padding:10px 18px;border-radius:30px;font-size:13px;z-index:40}
        @media(max-width:960px){
          .nv .frame{margin:10px;border-radius:20px;min-height:0;display:flex;flex-direction:column;padding-bottom:22px}
          .nv .bar{padding:16px 20px 0;gap:14px;font-size:11px}.nv .bar .r,.nv .bar span:nth-child(2){display:none}
          .nv nav{padding:14px 20px 0;gap:0}.nv .links,.nv nav>.bk{display:none}.nv .burger{display:block;margin-left:auto}.nv .links.open{display:flex;position:absolute;left:14px;right:14px;top:96px;background:rgba(12,18,27,.96);border-radius:16px;flex-direction:column;gap:14px;padding:20px;z-index:5}
          .nv .hc{padding:90px 24px 0}.nv h1{font-size:44px}.nv .hc p{font-size:15px}.nv .pill{position:relative;z-index:2;right:auto;top:auto;margin:20px 24px 0;align-self:flex-start}
          .nv .st{position:relative;z-index:2;left:auto;bottom:auto;padding:30px 24px 0;gap:24px}.nv .st b{font-size:34px}
          .nv .tm{position:relative;z-index:2;right:auto;bottom:auto;width:auto;margin:26px 20px 0}.nv .tm img{width:64px;height:64px}
          .nv .sec{padding:60px 20px 20px}.nv .sec h2{font-size:34px}.nv .cards{grid-template-columns:1fr}.nv footer{grid-template-columns:1fr;padding:40px 20px 30px}
        }
      `}</style>
      <header className="frame">
        <img src="/nv-hero.webp" alt="Casa de vidro e madeira nas montanhas ao anoitecer, com piscina de borda infinita iluminada" />
        <div className="bar z"><span><svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.800" aria-hidden><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z" /><circle cx="12" cy="10" r="2.500" /></svg>Estrada da Serra 27, {city}, SP</span><span className="r"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.800" aria-hidden><path d="M6 3h4l2 5-2.500 1.500a11 11 0 0 0 5 5L16 12l5 2v4a3 3 0 0 1-3 3A16 16 0 0 1 3 6a3 3 0 0 1 3-3z" /></svg>+55 12 98800-9914</span><span><svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.800" aria-hidden><path d="M3 5h18v14H3zM3 6l9 7 9-7" /></svg>reservas@nevoaspa.example</span></div>
        <nav className="z">
          <a className="logo" href="#top" onClick={(e) => { e.preventDefault(); go("top"); }}>{brand}</a>
          <div className={`links${menu ? " open" : ""}`}>{NAV.map(([t, id]) => <a key={t} href={`#${id}`} onClick={(e) => { e.preventDefault(); go(id); }}>{t}</a>)}</div>
          <a className="bk" href={wa("Oi! Quero reservar uma estadia.")} target="_blank" rel="noreferrer">Reservar estadia<i><Ar /></i></a>
          <button type="button" className="burger" aria-label="Menu" onClick={() => setMenu((m) => !m)}><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M4 7h16M4 12h16M4 17h16" /></svg></button>
        </nav>
        <div className="hc z">
          <div className="stars"><b>★★★★★</b>5.000+ hóspedes satisfeitos</div>
          <h1>Onde o silêncio fala em luxo</h1>
          <p>Nosso spa de luxo une natureza, arquitetura e cuidado integral para criar momentos que ficam na memória.</p>
          <a className="bk" href={wa("Oi! Quero reservar uma estadia.")} target="_blank" rel="noreferrer">Reservar estadia<i><Ar /></i></a>
        </div>
        <div className="pill"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" aria-hidden><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z" /><circle cx="12" cy="10" r="2.500" /></svg>{city}, SP</div>
        <div className="st"><div><b>1.700</b><span>metros de altitude</span></div><i /><div><b>365°</b><span>vistas panorâmicas</span></div></div>
        <div className="tm"><img src="/nv-guest.webp" alt="Retrato de hóspede sorrindo" /><div><p>“Um santuário como nenhum outro. Mais que um spa, é uma experiência que vou repetir.”</p><small>Sofia L., hóspede</small></div></div>
      </header>

      <section className="sec" id="servicos"><span className="k">Serviços</span><h2>Quartos, termas e rituais para desacelerar</h2>
        <div className="cards">{SV.map((s) => <article className="card" key={s.n}><img src={s.img} alt={s.n} /><div><h3>{s.n}</h3><p>{s.d}</p><a href={wa(`Oi! Quero saber mais: ${s.n}.`)} target="_blank" rel="noreferrer">Saber mais <Ar /></a></div></article>)}</div>
      </section>
      <footer id="contato">
        <div><h4>{brand}</h4><p>Spa hotel de luxo nas montanhas. Silêncio, calor e vistas que ficam com você.</p></div>
        <div><h4>Reservas</h4><a href={wa("Oi! Quero reservar uma estadia.")} target="_blank" rel="noreferrer">Reservar estadia</a><a href={wa("Oi! Quero saber dos pacotes de spa.")} target="_blank" rel="noreferrer">Pacotes de spa</a></div>
        <div><h4>Contato</h4><p>+55 12 98800-9914</p><p>reservas@nevoaspa.example</p><p>{city}, SP</p></div>
        <p className="dm">Fotos, nomes, números, preços e endereço são ilustrativos. Modelo de demonstração.</p>
      </footer>
      <a className="wa" href={wa("Oi! Quero reservar na " + brand + ".")} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp" onClick={() => setToast("Abrindo WhatsApp")}><svg width="26" height="26" viewBox="0 0 24 24" fill="#fff" aria-hidden><path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2zm5.2 13.9c-.2.6-1.3 1.2-1.8 1.2-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.2-1.6-1.2-3s.8-2.1 1-2.4c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2.1 1.3 2.4 1.5.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.8-.1 1.4z" /></svg></a>
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}
