import { useEffect, useState } from "react";

/** Agencia de viagens a partir do pin "Wanderly Travel & Tours": verde-floresta escuro, lima, serifada com script, hero de paisagem, destinos em cards. */
const D = "#0b3a35", D2 = "#0e2f2c", L = "#8fe36d", CR = "#f7f5ec";
const NAV: [string, string][] = [["Início", "top"], ["Destinos", "destinos"], ["Sobre", "sobre"], ["Serviços", "viagens"], ["Pacotes", "viagens"], ["Blog", "novidades"], ["Contato", "contato"]];
const DESTS = [
  { n: "Ilhas de Bali, Indonésia", t: "Praias, Cultura, Aventura", img: "/rt-d1.webp" },
  { n: "Costa Rica", t: "Natureza, Vida selvagem", img: "/rt-d2.webp" },
  { n: "Machu Picchu, Peru", t: "História, Cultura, Aventura", img: "/rt-d3.webp" },
  { n: "Bora Bora", t: "Luxo, Relaxamento, Romance", img: "/rt-d4.webp" },
];
const TRIPS = [
  { n: "AVENTURA", d: "Experiências emocionantes para quem busca adrenalina.", b: "Escolher aventura", img: "/rt-t1.webp", ic: "m3 20 6-11 4 6 3-4 5 9z" },
  { n: "RELAXAMENTO", d: "Fugas tranquilas e momentos de paz para recarregar.", b: "Escolher relaxamento", img: "/rt-t2.webp", ic: "M12 4v2M4.900 7.900l1.400 1.400M19.100 7.900l-1.400 1.400M3 16h18M7 16a5 5 0 0 1 10 0" },
  { n: "CULTURA", d: "Mergulhe em tradições e patrimônios locais.", b: "Escolher cultura", img: "/rt-t3.webp", ic: "M4 20h16M6 20V10M10 20V10M14 20V10M18 20V10M3 10l9-6 9 6z" },
];
const TRUST: [string, string, string][] = [
  ["Viagens confiáveis", "Seguras, sólidas e", "M3 12l4 4 6-8M13 17l3 3 5-9"], ["Melhor preço", "Valor justo, sem", "M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6zM9 12l2 2 4-4"],
  ["Guias especialistas", "Gente local, olhar", "M12 21s-7-6-7-12a7 7 0 0 1 14 0c0 6-7 12-7 12zM12 9v.1"], ["Suporte 24/7", "Estamos com você,", "M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v5H4zM17 14h3v5h-3z"], ["Viagem sustentável", "Melhor para você,", "M12 3C6 5 4 11 8 16c3 3 8 2 10-3 1-4-1-8-6-10zM8 20c1-5 4-8 8-10"],
];
const ARR = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.600" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>;

export function RotaAberta({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Rota Aberta";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [menu, setMenu] = useState(false);
  const [toast, setToast] = useState("");
  const [mail, setMail] = useState("");
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(""), 1800); return () => clearTimeout(t); }, [toast]);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const wa = (t: string) => `https://wa.me/${num}?text=${encodeURIComponent(t)}`;
  const logo = <svg width="38" height="30" viewBox="0 0 38 30" aria-hidden><path d="M2 27 14 6l7 11 4-6 11 16z" fill="none" stroke={L} strokeWidth="2.600" strokeLinejoin="round" /><path d="M9 27l5-9 4 6 3-3" fill={L} /></svg>;
  return (
    <div className="ra" id="top">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Kaushan+Script&family=DM+Sans:wght@400;500;600;700&display=swap');
        .ra{background:${D2};color:#d6e5e0;font-family:'DM Sans',Arial,sans-serif;overflow-x:hidden;font-size:15px;line-height:1.6}
        .ra *{box-sizing:border-box}.ra a,.ra button{font-family:inherit;cursor:pointer}
        .ra h1,.ra h2,.ra h3{font-family:'Playfair Display',Georgia,serif;margin:0;line-height:1.15}
        .ra .in{max-width:1180px;margin:0 auto;padding:0 24px}
        .ra .sc{font-family:'Kaushan Script',cursive;font-weight:400;color:${L}}
        .ra nav{position:absolute;left:0;right:0;top:0;z-index:20;background:rgba(7,38,34,.82)}.ra nav .in{display:flex;align-items:center;height:64px;gap:30px}
        .ra .logo{white-space:nowrap;display:flex;align-items:center;gap:8px;color:#fff;text-decoration:none;line-height:1.05}.ra .logo b{display:block;font:700 19px 'Playfair Display',serif}.ra .logo small{display:block;font-size:8px;letter-spacing:.2em;color:#bcd2cb}
        .ra .menu{display:flex;gap:24px;flex:1;justify-content:center}.ra .menu a{font-size:12.500px;color:#e8f2ee;text-decoration:none;padding:6px 0;border-bottom:2px solid transparent}.ra .menu a.on{border-color:${L}}
        .ra .tl{display:flex;gap:14px;align-items:center;color:#fff}.ra .burger{display:none;background:none;border:0;padding:6px;color:#fff}
        .ra .btn{display:inline-flex;align-items:center;gap:10px;background:${L};color:${D};border:0;border-radius:999px;padding:12px 24px;font-weight:700;font-size:13.500px;text-decoration:none}
        .ra .btn.o{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.55);padding:9px 20px;font-size:12px}
        .ra .btn.s{padding:10px 20px;font-size:12px}
        .ra .hero{position:relative;min-height:520px;background:#123 url(/rt-hero.webp) center/cover;display:flex;align-items:center}
        .ra .hero:before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(6,40,36,.88),rgba(6,40,36,.35) 55%,rgba(6,40,36,0))}
        .ra .hero .in{position:relative;padding-top:70px;width:100%}
        .ra .eb{font-size:11px;letter-spacing:.28em;color:#cfe3dc;margin-bottom:14px}
        .ra .hero h1{font-size:56px;color:#fff;font-weight:700;max-width:480px}.ra .hero h1 .sc{display:block;font-size:60px;line-height:1.05;margin:2px 0}
        .ra .hero p{max-width:380px;margin:14px 0 24px;color:#e2eeea}
        .ra .tag{position:absolute;right:48px;bottom:26px;transform:rotate(-8deg);font-size:24px;text-align:right;line-height:1.15}
        .ra .dest{padding:56px 0 64px;text-align:center;background:radial-gradient(circle at 10% 20%,#144a44,${D2} 60%)}
        .ra .ey{font-size:10.500px;letter-spacing:.24em;color:#9fd9b0;display:flex;align-items:center;gap:14px;justify-content:center;margin-bottom:10px}.ra .ey:before,.ra .ey:after{content:"";width:34px;height:1px;background:#4e8b79}
        .ra .dest h2{font-size:30px;color:#fff}.ra .dest .sub{max-width:520px;margin:10px auto 0;font-size:13.500px;color:#b8cfc8}
        .ra .dh{display:flex;justify-content:space-between;align-items:flex-end;text-align:left;gap:20px}.ra .dh>div{flex:1;text-align:center;padding-left:140px}.ra .dh .btn{flex:none}
        .ra .cards4{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:30px}
        .ra .dc{position:relative;border-radius:16px;overflow:hidden;aspect-ratio:3/4;background:#245 center/cover;text-align:left;border:1px solid rgba(255,255,255,.14)}
        .ra .dc:after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(5,30,28,.92),rgba(5,30,28,0) 55%)}
        .ra .dc .hz{position:absolute;right:12px;top:12px;z-index:2;color:#fff}
        .ra .dc .tx{position:absolute;left:16px;right:60px;bottom:16px;z-index:2;color:#fff}.ra .dc .tx b{display:block;font-size:14.500px;font-weight:700}.ra .dc .tx small{font-size:10.500px;color:#cfe3dc}
        .ra .dc .go{position:absolute;right:14px;bottom:16px;z-index:2;width:30px;height:30px;border-radius:50%;background:${L};color:${D};display:grid;place-items:center;border:0}
        .ra .trip{background:${CR};color:#4a5a55;padding:56px 0 64px;text-align:center;position:relative}
        .ra .trip .ey{color:#1d6a56}.ra .trip .ey:before,.ra .trip .ey:after{background:#9bbdb1}
        .ra .trip h2{font-size:32px;color:${D};max-width:560px;margin:0 auto}.ra .trip h2 .sc{color:#1b8a5c}
        .ra .trip .sub{max-width:520px;margin:10px auto 0;font-size:13.500px}
        .ra .cards3{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:34px;padding-top:20px}
        .ra .tc{position:relative;aspect-ratio:4/5;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;padding:22px;color:#fff;text-align:center}
        .ra .tc:before{content:"";position:absolute;inset:0;border-radius:16px;background:#245 var(--bg) center/cover}.ra .tc:after{content:"";position:absolute;inset:0;border-radius:16px;background:linear-gradient(0deg,rgba(5,30,28,.95),rgba(5,30,28,0) 62%)}.ra .tc>*{position:relative;z-index:2}
        .ra .tc .ci{position:absolute;top:-20px;left:50%;transform:translateX(-50%);width:42px;height:42px;border-radius:50%;background:${D};display:grid;place-items:center;border:3px solid ${CR};z-index:3}
        .ra .tc h3{font:700 14px 'DM Sans',sans-serif;letter-spacing:.1em}.ra .tc p{font-size:12px;color:#dcebe6;margin:4px 0 14px}
        .ra .news{background:linear-gradient(90deg,#082e2a,#0d3d37);border-top:1px solid #1a554c}.ra .news .in{display:flex;align-items:center;gap:28px;padding-top:22px;padding-bottom:22px}
        .ra .news .ps{width:48px;height:60px;border:1.500px solid ${L};border-radius:6px;flex:none;display:grid;place-items:center}
        .ra .news .t{font-size:24px;flex:1;line-height:1.2}.ra .news .t small{display:block;font:400 12px 'DM Sans',sans-serif;color:#b8cfc8;margin-top:2px}
        .ra .news form{display:flex;gap:10px;flex:1;max-width:460px}.ra .news input{flex:1;min-width:0;border:0;border-radius:999px;padding:11px 18px;font-size:13px;font-family:inherit}
        .ra .trust{background:${CR};color:#4a5a55}.ra .trust .in{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;padding-top:26px;padding-bottom:26px;text-align:center}
        .ra .trust b{display:block;font-size:11.500px;letter-spacing:.06em;text-transform:uppercase;color:${D};margin-top:8px}.ra .trust small{font-size:11px;line-height:1.35;display:block;margin-top:3px}
        .ra footer{background:${D2};padding:40px 0 20px;font-size:13px}.ra footer .g{display:grid;grid-template-columns:1.4fr 1fr 1fr 1.3fr;gap:28px}
        .ra footer h4{color:#fff;margin:0 0 10px;font-size:13px}.ra footer a{display:block;color:#b8cfc8;margin:4px 0;font-size:12.500px}.ra footer p{margin:4px 0;color:#b8cfc8;font-size:12.500px}
        .ra .dm{border-top:1px solid #21544b;margin-top:26px;padding-top:14px;font-size:11.500px;color:#8fb0a6;text-align:center}
        .ra .wa{position:fixed;right:14px;bottom:14px;width:48px;height:48px;border-radius:50%;background:#25d366;display:grid;place-items:center;z-index:40;box-shadow:0 6px 16px rgba(0,0,0,.35)}
        .ra .toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:#fff;color:${D};padding:10px 18px;border-radius:999px;font-size:13px;z-index:50}
        .ra .mm{display:none}
        @media(max-width:900px){
          .ra nav .menu,.ra nav .tl .btn,.ra nav .tl .ic{display:none}.ra .burger{display:block;margin-left:auto}
          .ra .mm{display:block;position:absolute;top:64px;left:0;right:0;z-index:19;background:${D};padding:10px 24px 18px}.ra .mm a{display:block;color:#fff;padding:10px 0;border-bottom:1px solid #20564d;font-size:14px}
          .ra .hero{min-height:560px;align-items:flex-end;background-position:78% center}.ra .hero:before{background:linear-gradient(0deg,rgba(6,40,36,.92),rgba(6,40,36,.2) 70%,rgba(6,40,36,.35))}
          .ra .hero .in{padding-bottom:44px;padding-top:0}.ra .hero h1{font-size:40px}.ra .hero h1 .sc{font-size:44px}.ra .tag{display:none}
          .ra .dh{display:block}.ra .dh>div{padding-left:0}.ra .dh .btn{margin-top:16px}
          .ra .cards4{grid-template-columns:1fr 1fr;gap:12px}.ra .dc .tx{right:44px;left:12px;bottom:12px}.ra .dc .tx b{font-size:12.500px}.ra .dc .tx small{display:none}.ra .dc .go{right:8px;bottom:10px;width:26px;height:26px}
          .ra .cards3{grid-template-columns:1fr;gap:34px}.ra .tc{aspect-ratio:4/4.400}
          .ra .news .in{flex-direction:column;align-items:stretch;text-align:center;gap:14px}.ra .news .ps{margin:0 auto}.ra .news form{max-width:none}
          .ra .trust .in{grid-template-columns:1fr 1fr}.ra footer .g{grid-template-columns:1fr 1fr}.ra .trip h2,.ra .dest h2{font-size:26px}
        }
      `}</style>
      <header className="hero" id="inicio">
        <nav><div className="in">
          <a className="logo" href="#top" onClick={(e) => { e.preventDefault(); go("top"); }} aria-label={brand}>{logo}<span><b>{brand}</b><small>VIAGENS &amp; TURISMO</small></span></a>
          <div className="menu">{NAV.map(([l, id], i) => <a key={l} className={i === 0 ? "on" : ""} onClick={() => go(id)}>{l}</a>)}</div>
          <div className="tl"><span className="ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" aria-hidden><path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4" /></svg></span><a className="btn s" href={wa("Oi! Quero planejar minha viagem.")} target="_blank" rel="noreferrer">Planejar viagem {ARR}</a></div>
          <button type="button" className="burger" aria-label="Menu" onClick={() => setMenu((m) => !m)}><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.200" strokeLinecap="round" aria-hidden><path d="M4 7h16M4 12h16M4 17h16" /></svg></button>
        </div>{menu && <div className="mm">{NAV.map(([l, id]) => <a key={l} onClick={() => go(id)}>{l}</a>)}</div>}</nav>
        <div className="in">
          <div className="eb">EXPLORE · DESCUBRA · VIVA</div>
          <h1>Sua próxima <span className="sc">Aventura</span>começa aqui</h1>
          <p>De paisagens de tirar o fôlego a culturas vibrantes, criamos viagens inesquecíveis para você.</p>
          <a className="btn" href="#destinos" onClick={(e) => { e.preventDefault(); go("destinos"); }}>Ver destinos {ARR}</a>
        </div>
        <div className="tag sc">Viaje mais,<br />preocupe-se menos</div>
      </header>

      <section className="dest" id="destinos"><div className="in">
        <div className="dh"><div><div className="ey">DESTINOS EM ALTA</div><h2>Joias escondidas pelo mundo</h2><p className="sub">De praias tropicais a cidades históricas, descubra lugares extraordinários que vão te inspirar.</p></div>
          <a className="btn o" href={wa("Oi! Quero ver todos os destinos.")} target="_blank" rel="noreferrer">Ver todos {ARR}</a></div>
        <div className="cards4">{DESTS.map((d) => (
          <div className="dc" key={d.n} style={{ backgroundImage: `url(${d.img})` }}>
            <span className="hz"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" aria-hidden><path d="M12 21s-8-6-8-12a5 5 0 0 1 8-3 5 5 0 0 1 8 3c0 6-8 12-8 12z" /></svg></span>
            <div className="tx"><b>{d.n}</b><small>{d.t}</small></div>
            <a className="go" href={wa(`Oi! Quero saber da viagem para ${d.n}.`)} target="_blank" rel="noreferrer" aria-label={d.n}>{ARR}</a>
          </div>))}</div>
      </div></section>

      <section className="trip" id="viagens"><div className="in">
        <div className="ey">PLANEJE SUA VIAGEM</div>
        <h2>Faça a viagem que você <span className="sc">sempre sonhou</span></h2>
        <p className="sub">Seja aventura, descanso ou cultura, temos o roteiro certo para você.</p>
        <div className="cards3">{TRIPS.map((t) => (
          <div className="tc" key={t.n} style={{ ["--bg" as string]: `url(${t.img})` }}>
            <span className="ci"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={L} strokeWidth="1.800" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={t.ic} /></svg></span>
            <h3>{t.n}</h3><p>{t.d}</p>
            <a className="btn s" href={wa(`Oi! Quero uma viagem de ${t.n.toLowerCase()}.`)} target="_blank" rel="noreferrer">{t.b} {ARR}</a>
          </div>))}</div>
      </div></section>

      <section className="news" id="novidades"><div className="in">
        <span className="ps"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={L} strokeWidth="1.600" aria-hidden><circle cx="12" cy="12" r="7" /><path d="M5 12h14M12 5c3 3 3 11 0 14M12 5c-3 3-3 11 0 14" /></svg></span>
        <div className="t sc">Receba mais inspiração de viagem<small>Dicas, ofertas e roteiros por e-mail.</small></div>
        <form onSubmit={(e) => { e.preventDefault(); setToast(mail ? "Inscrição enviada" : "Digite seu e-mail"); setMail(""); }}>
          <input type="email" placeholder="Seu e-mail" value={mail} onChange={(e) => setMail(e.target.value)} aria-label="E-mail" /><button type="submit" className="btn s">Participar</button></form>
      </div></section>

      <section className="trust" id="sobre"><div className="in">{TRUST.map(([t, s, p]) => (
        <div key={t}><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#1d7a5a" strokeWidth="1.600" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={p} /></svg><b>{t}</b><small>{s} confiável e transparente.</small></div>))}</div></section>

      <footer id="contato"><div className="in">
        <div className="g">
          <div><a className="logo" style={{ marginBottom: 10 }}>{logo}<span><b>{brand}</b><small>VIAGENS &amp; TURISMO</small></span></a><p>Explore o mundo com quem cuida de cada detalhe para criar memórias que duram a vida toda.</p></div>
          <div><h4>Links</h4><a onClick={() => go("destinos")}>Destinos</a><a onClick={() => go("viagens")}>Pacotes</a><a onClick={() => go("sobre")}>Sobre</a></div>
          <div><h4>Destinos</h4><a onClick={() => go("destinos")}>Bali</a><a onClick={() => go("destinos")}>Peru</a><a onClick={() => go("destinos")}>Bora Bora</a></div>
          <div><h4>Contato</h4><p>(31) 98800-9914</p><p>contato@rotaaberta.example</p><p>{client?.city || "Belo Horizonte, MG"}</p><a className="btn s" style={{ display: "inline-flex", marginTop: 8 }} href={wa("Oi! Quero planejar minha viagem.")} target="_blank" rel="noreferrer">Planejar viagem {ARR}</a></div>
        </div>
        <p className="dm">Fotos, nomes, números, preços e endereço são ilustrativos. Modelo de demonstração.</p>
      </div></footer>
      <a className="wa" href={wa("Oi! Quero falar com a agência.")} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp" onClick={() => setToast("Abrindo WhatsApp")}><svg width="26" height="26" viewBox="0 0 24 24" fill="#fff" aria-hidden><path d="M12 2a10 10 0 0 0-8.600 15l-1.400 5 5.200-1.400A10 10 0 1 0 12 2zm5.200 13.900c-.2.600-1.300 1.200-1.800 1.200-.5.100-1.100.100-1.800-.1-.4-.1-1-.3-1.700-.6-3-1.300-4.900-4.300-5.100-4.500-.1-.2-1.200-1.600-1.200-3s.8-2.100 1-2.400c.3-.3.600-.3.800-.3h.6c.2 0 .4 0 .6.500l.9 2.100c.1.200.1.400 0 .5l-.4.600-.4.400c-.1.200-.3.300-.1.600.2.300.8 1.300 1.700 2.100 1.100 1 2.100 1.300 2.400 1.500.3.100.4.100.6-.1l.8-1c.2-.3.400-.2.600-.1l2 1c.3.100.5.200.5.300.1.200.1.800-.1 1.400z" /></svg></a>
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}
