import { useEffect, useState } from "react";

/** Creche e escola infantil a partir do pin "BabyCare & Kindergarten": fundo claro, azul-marinho, rosa e laranja, rabiscos a lapis, fotos de criancas. */
const N = "#3d3b87", P = "#ff4f87", O = "#ffb020", PALE = "#f3f9fb";
const CHECKS = ["Apoio à personalidade da criança", "Brincadeiras internas e externas para os pequenos", "Professores qualificados e carinhosos", "A melhor escola infantil da região"];
const PROGS = [
  { n: "Contagem com blocos", d: "Os pequenos aprendem números e cores empilhando, separando e contando blocos coloridos.", img: "/pp-blocos.webp" },
  { n: "Arte com pratos de papel", d: "Recorte, cola e tinta para criar bichinhos e máscaras. Muita imaginação e mão na massa.", img: "/pp-tinta.webp" },
  { n: "Desenho com massinha", d: "Modelagem de personagens com massinha para treinar a coordenação e a criatividade.", img: "/pp-massinha.webp" },
];
const NAV: [string, string][] = [["Início", "top"], ["Sobre", "sobre"], ["Eventos", "programas"], ["Programas", "programas"], ["Galeria", "programas"], ["Novidades", "sobre"], ["Contato", "contato"]];
const Dd = ({ children, w = 1.6 }: { children: React.ReactNode; w?: number }) => <svg viewBox="0 0 60 60" fill="none" stroke={N} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" aria-hidden>{children}</svg>;

export function PequenoPasso({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Pequeno Passo";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [menu, setMenu] = useState(false);
  const [toast, setToast] = useState("");
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(""), 1800); return () => clearTimeout(t); }, [toast]);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const wa = (t: string) => `https://wa.me/${num}?text=${encodeURIComponent(t)}`;
  return (
    <div className="pp" id="top">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Caveat:wght@600&display=swap');
        .pp{background:#fff;color:#4b4a6a;font-family:'Poppins',Arial,sans-serif;overflow-x:hidden;font-size:15px;line-height:1.6}
        .pp *{box-sizing:border-box}
        .pp a,.pp button{font-family:inherit;cursor:pointer}
        .pp h1,.pp h2,.pp h3{color:${N};margin:0;font-weight:700;line-height:1.2}
        .pp .in{max-width:1180px;margin:0 auto;padding:0 24px}
        .pp .top{background:${N};color:#fff;font-size:12px}.pp .top .in{display:flex;gap:26px;align-items:center;height:36px}.pp .top span{display:flex;gap:7px;align-items:center}.pp .top svg{width:14px;height:14px}
        .pp nav{background:#fff;position:sticky;top:0;z-index:20;box-shadow:0 1px 0 #eee}.pp nav .in{display:flex;align-items:center;height:72px;gap:40px}
        .pp .logo{display:flex;align-items:center;gap:8px;color:${N};font-weight:700;font-size:20px;text-decoration:none;font-family:'Caveat',cursive;font-size:26px;line-height:1}
        .pp .menu{display:flex;gap:28px;flex:1;justify-content:center}.pp .menu a{font-size:13px;color:#555474;text-decoration:none;padding:6px 0;border-bottom:2px solid transparent}.pp .menu a.on{color:${N};border-color:${P}}
        .pp .tl{display:flex;gap:18px;font-size:12px;color:#555474;align-items:center}.pp .burger{display:none;background:none;border:0;padding:6px}
        .pp .hero{position:relative;min-height:680px;overflow:hidden;background:#f6efe6}
        .pp .hero>img{position:absolute;right:0;top:0;width:68%;height:100%;object-fit:cover;object-position:60% 40%}
        .pp .hero:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#fff 0,#fff 28%,rgba(255,255,255,.75) 42%,rgba(255,255,255,0) 62%)}
        .pp .hc{position:relative;z-index:2;max-width:1180px;margin:0 auto;padding:210px 24px 80px}
        .pp .hc .k{color:${P};font-size:16px;font-weight:500;margin:0 0 18px}
        .pp .hc h1{font-size:50px;max-width:480px;line-height:1.18}
        .pp .btn{display:inline-flex;align-items:center;justify-content:center;border:0;border-radius:50px;font-weight:600;font-size:14px;color:#fff;text-decoration:none;padding:0 38px;height:56px}
        .pp .btn.pk{background:${P};box-shadow:0 8px 20px rgba(255,79,135,.3);margin-top:34px}.pp .btn.or{background:${O};height:50px;box-shadow:0 8px 20px rgba(255,176,32,.3)}
        .pp .bub{position:absolute;z-index:3;right:5%;top:56px;background:#fff;border-radius:50% 50% 50% 8%;padding:26px 30px;width:190px;color:${P};font-weight:600;font-size:15px;line-height:1.35;box-shadow:0 8px 30px rgba(0,0,0,.08)}
        .pp .dd{position:absolute;z-index:3}.pp .dd svg{width:100%;height:100%}
        .pp .notch{position:absolute;z-index:4;left:50%;bottom:-1px;transform:translateX(-50%);width:84px;height:30px;background:#fff;border-radius:60px 60px 0 0;display:grid;place-items:center}
        .pp .intro{padding:84px 0 0;text-align:center;position:relative}.pp .sm{color:${P};font-size:13px;font-weight:500;display:block;margin-bottom:12px}
        .pp .h2{font-size:34px;max-width:520px;margin:0 auto}
        .pp .wave{display:block;margin:12px auto 0;width:46px;height:8px}
        .pp .about{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;max-width:900px;margin:56px auto 0;text-align:left;position:relative}
        .pp .ph{position:relative;aspect-ratio:1/1.1;max-width:420px}.pp .ph .a{position:absolute;inset:0 18% 18% 0;width:82%;height:82%;object-fit:cover;border-radius:14px;box-shadow:0 10px 30px rgba(0,0,0,.15)}
        .pp .ph .b{position:absolute;right:0;bottom:0;width:36%;height:36%;object-fit:cover;border-radius:12px;border:4px solid #fff;box-shadow:0 10px 30px rgba(0,0,0,.2)}
        .pp .about p{font-size:12.5px;color:#7a7992;margin:0 0 22px}.pp .about ul{list-style:none;margin:0 0 28px;padding:0;display:grid;gap:11px}
        .pp .about li{display:flex;gap:10px;align-items:center;font-size:12.5px;font-weight:600;color:${N}}.pp .about li i{flex:none;width:16px;height:16px;border-radius:50%;background:${P};display:grid;place-items:center}
        .pp .progs{background:${PALE};margin-top:84px;padding:76px 0 90px;text-align:center}
        .pp .cards{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:48px;max-width:960px;margin-left:auto;margin-right:auto;text-align:left}
        .pp .card{background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 6px 24px rgba(61,59,135,.08)}.pp .card img{display:block;width:100%;aspect-ratio:4/3;object-fit:cover}
        .pp .card div{padding:22px 24px 28px}.pp .card h3{font-size:17px;margin-bottom:12px}.pp .card p{margin:0;font-size:12px;color:#7a7992;line-height:1.8}
        .pp .card a{display:inline-block;margin-top:14px;color:${P};font-size:13px;font-weight:600;text-decoration:none}
        .pp footer{background:${N};color:#d9d8f0;padding:56px 0 24px;font-size:13px}.pp footer .g{display:grid;grid-template-columns:1.4fr 1fr 1fr 1.2fr;gap:36px}
        .pp footer h4{margin:0 0 12px;color:#fff;font-size:14px}.pp footer a{display:block;color:#d9d8f0;text-decoration:none;margin:6px 0}.pp footer p{margin:0 0 6px}
        .pp footer .dm{border-top:1px solid rgba(255,255,255,.18);margin-top:34px;padding-top:18px;font-size:12px;color:#b9b8dc}
        .pp .wa{position:fixed;right:14px;bottom:14px;width:48px;height:48px;border-radius:50%;background:#25d366;display:grid;place-items:center;z-index:30;box-shadow:0 6px 18px rgba(0,0,0,.3)}
        .pp .toast{position:fixed;left:50%;bottom:76px;transform:translateX(-50%);background:${N};color:#fff;padding:10px 18px;border-radius:30px;font-size:13px;z-index:40}
        @media(max-width:900px){
          .pp .menu,.pp .tl{display:none}.pp .burger{display:block;margin-left:auto}.pp nav .in{height:62px}
          .pp .menu.open{display:flex;position:absolute;left:0;right:0;top:62px;background:#fff;flex-direction:column;gap:0;padding:8px 24px 16px;box-shadow:0 12px 24px rgba(0,0,0,.1)}.pp .menu.open a{padding:12px 0}
          .pp .top .in{gap:14px;font-size:11px;overflow:hidden}.pp .top span:nth-child(2){display:none}
          .pp .hero{min-height:0;display:flex;flex-direction:column}.pp .hero:after{display:none}.pp .hero>img{position:relative;order:2;width:100%;height:340px}
          .pp .hc{padding:40px 24px 36px;order:1}.pp .hc h1{font-size:34px}.pp .btn.pk{height:50px;margin-top:24px}
          .pp .bub{top:auto;bottom:24px;right:14px;width:150px;padding:16px 18px;font-size:12px}.pp .dd.s,.pp .dd.ra{display:none}.pp .notch{display:none}
          .pp .intro{padding-top:56px}.pp .h2{font-size:26px}.pp .about{grid-template-columns:1fr;gap:34px;margin-top:36px;padding:0 24px}.pp .ph{margin:0 auto;width:100%}
          .pp .progs{margin-top:56px;padding:56px 0 64px}.pp .cards{grid-template-columns:1fr;padding:0 24px;margin-top:32px}
          .pp footer .g{grid-template-columns:1fr 1fr}
        }
      `}</style>
      <div className="top"><div className="in"><span><svg viewBox="0 0 24 24" fill={P} aria-hidden><path d="M6 2h4l2 5-2.500 1.500a11 11 0 0 0 5 5L16 11l5 2v4a3 3 0 0 1-3 3A16 16 0 0 1 3 5a3 3 0 0 1 3-3z" /></svg>(32) 98800-9914</span><span><svg viewBox="0 0 24 24" fill={P} aria-hidden><path d="M3 5h18v14H3zM3 6l9 7 9-7" stroke="#fff" strokeWidth="1.500" /></svg>contato@pequenopasso.example</span></div></div>
      <nav><div className="in">
        <a className="logo" href="#top" onClick={(e) => { e.preventDefault(); go("top"); }} aria-label={brand}><svg width="34" height="34" viewBox="0 0 34 34" aria-hidden><path d="M7 20l-2-9 3 1 1-6 3 6 2-5 1 8" stroke={O} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" /><path d="M16 22l-1-8 3 2 2-6 2 6 3-3-1 9" stroke={P} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" /><path d="M7 24c4 4 16 4 20 0" stroke="#2bb6e0" strokeWidth="3" fill="none" strokeLinecap="round" /></svg>{brand}</a>
        <div className={`menu${menu ? " open" : ""}`}>{NAV.map(([t, id], i) => <a key={t} className={i === 0 ? "on" : ""} href={`#${id}`} onClick={(e) => { e.preventDefault(); go(id); }}>{t}</a>)}</div>
        <div className="tl"><span>PT</span><span>BRL</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555474" strokeWidth="2" aria-hidden><path d="M12 21s-8-6-8-12a5 5 0 0 1 8-3 5 5 0 0 1 8 3c0 6-8 12-8 12z" /></svg><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555474" strokeWidth="2" aria-hidden><path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4" /></svg></div>
        <button type="button" className="burger" aria-label="Menu" onClick={() => setMenu((m) => !m)}><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={N} strokeWidth="2.200" strokeLinecap="round" aria-hidden><path d="M4 7h16M4 12h16M4 17h16" /></svg></button>
      </div></nav>

      <header className="hero">
        <img src="/pp-hero.webp" alt="Menino com capacete de aviador de brinquedo, brincando de avião no tapete ao lado de um ursinho" />
        <div className="dd s" style={{ left: "-1%", top: 90, width: 46, height: 46 }}><Dd><circle cx="30" cy="30" r="9" /><path d="M30 8v6M30 46v6M8 30h6M46 30h6M14 14l4 4M42 42l4 4M46 14l-4 4M14 46l4-4" /></Dd></div>
        <div className="dd s" style={{ left: "44%", top: 108, width: 54, height: 54 }}><Dd><path d="M8 34c4-12 18-14 26-8l8-6-2 10c4 4 2 10-4 10-8 2-20 2-28-6z" /><circle cx="36" cy="26" r="1.200" /></Dd></div>
        <div className="dd s" style={{ left: "56%", top: 118, width: 56, height: 56 }}><Dd><path d="M24 40c-8-6-10-18 0-24 10-4 20 4 16 14-2 6-6 8-6 12h-8zM26 48h8M27 53h6M30 4v4M10 14l3 3M50 14l-3 3" /></Dd></div>
        <div className="dd s" style={{ left: "84%", top: 290, width: 52, height: 68 }}><Dd><circle cx="30" cy="12" r="6" /><path d="M30 18v16M30 34l-8 16M30 34l8 16M14 28l16-6 16 6M22 40l8-6 8 6" /></Dd></div>
        <div className="dd" style={{ left: "5%", top: 520, width: 60, height: 52 }}><svg viewBox="0 0 60 52" fill="none" stroke="#3a8fd6" strokeWidth="1.800" strokeLinecap="round" aria-hidden><path d="M6 42l22-32 6 4-22 32-8 4zM28 10l6 4M42 48c10 2 14-6 20-12" strokeDasharray="3 4" /></svg></div>
        <div className="bub">Minha babá favorita! :)</div>
        <div className="hc">
          <p className="k">Creche &amp; Escola Infantil</p>
          <h1>Juntos vamos explorar o novo mundo</h1>
          <a className="btn pk" href={wa("Oi! Quero conhecer a escola.")} target="_blank" rel="noreferrer">Saiba mais</a>
        </div>
        <div className="notch"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={N} strokeWidth="2.400" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 4v16M5 13l7 7 7-7" /></svg></div>
      </header>

      <section className="intro" id="sobre">
        <div className="dd ra" style={{ left: "6%", top: 100, width: 100, height: 72 }}><svg viewBox="0 0 100 72" fill="none" stroke={P} strokeWidth="2.200" strokeLinecap="round" aria-hidden><path d="M8 62a40 40 0 0 1 84 0M20 62a28 28 0 0 1 60 0M32 62a16 16 0 0 1 36 0" /></svg></div>
        <div className="in">
          <span className="sm">Introdução</span>
          <h2 className="h2">Bem-vindo à creche e escola infantil</h2>
          <svg className="wave" viewBox="0 0 46 8" fill="none" stroke="#3a8fd6" strokeWidth="1.600" aria-hidden><path d="M1 4c3-4 5-4 8 0s5 4 8 0 5-4 8 0 5 4 8 0 5-4 8 0" /></svg>
          <div className="about">
            <div className="ph"><img className="a" src="/pp-manual.webp" alt="Mãe e criança em atividade manual com papéis coloridos" /><img className="b" src="/pp-prof.webp" alt="Professora com duas crianças brincando" /></div>
            <div>
              <p>Aqui cada criança é acolhida como único. Cuidamos da rotina, da alimentação e do aprendizado com muito afeto, brincadeira e atenção ao ritmo de cada um, em um ambiente seguro e colorido.</p>
              <ul>{CHECKS.map((c) => <li key={c}><i><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12l5 5 9-10" /></svg></i>{c}</li>)}</ul>
              <a className="btn or" href={wa("Oi! Quero saber mais sobre a escola.")} target="_blank" rel="noreferrer">Descubra mais</a>
            </div>
            <div className="dd s" style={{ right: "-14%", top: "6%", width: 86, height: 110 }}><svg viewBox="0 0 86 110" fill="none" stroke={O} strokeWidth="1.800" strokeLinecap="round" aria-hidden><path d="M10 20l14-6 10 4-12 8zM22 24l-2 8M70 90c14-14-6-30-20-22-10 6-4 18 8 14M72 88l8 6" strokeDasharray="1 5" /></svg></div>
          </div>
        </div>
        <div className="progs" id="programas">
          <div className="in">
            <span className="sm">Escolha um programa</span>
            <h2 className="h2">Nossos programas</h2>
            <svg className="wave" viewBox="0 0 46 8" fill="none" stroke="#3a8fd6" strokeWidth="1.600" aria-hidden><path d="M1 4c3-4 5-4 8 0s5 4 8 0 5-4 8 0 5 4 8 0 5-4 8 0 5 4 8 0" /></svg>
            <div className="cards">{PROGS.map((p) => <article className="card" key={p.n}><img src={p.img} alt={p.n} /><div><h3>{p.n}</h3><p>{p.d}</p><a href={wa(`Oi! Quero saber do programa: ${p.n}.`)} target="_blank" rel="noreferrer">Quero saber mais</a></div></article>)}</div>
          </div>
        </div>
      </section>

      <footer id="contato"><div className="in">
        <div className="g">
          <div><h4>{brand}</h4><p>Creche e escola infantil com carinho, brincadeira e aprendizado em cada passo.</p></div>
          <div><h4>Escola</h4><a onClick={() => go("sobre")}>Sobre nós</a><a onClick={() => go("programas")}>Programas</a><a onClick={() => go("programas")}>Galeria</a></div>
          <div><h4>Famílias</h4><a href={wa("Oi! Quero agendar uma visita.")} target="_blank" rel="noreferrer">Agendar visita</a><a href={wa("Oi! Quero saber das matrículas.")} target="_blank" rel="noreferrer">Matrículas</a></div>
          <div><h4>Contato</h4><p>(32) 98800-9914</p><p>contato@pequenopasso.example</p><p>{client?.city || "Juiz de Fora, MG"}</p></div>
        </div>
        <p className="dm">Fotos, nomes, números, preços e endereço são ilustrativos. Modelo de demonstração.</p>
      </div></footer>
      <a className="wa" href={wa("Oi! Quero falar com a escola.")} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp" onClick={() => setToast("Abrindo WhatsApp")}><svg width="26" height="26" viewBox="0 0 24 24" fill="#fff" aria-hidden><path d="M12 2a10 10 0 0 0-8.600 15l-1.400 5 5.200-1.400A10 10 0 1 0 12 2zm5.200 13.900c-.2.600-1.300 1.200-1.800 1.200-.5.100-1.100.100-1.800-.1-.4-.1-1-.3-1.700-.6-3-1.300-4.900-4.300-5.100-4.500-.1-.2-1.200-1.600-1.200-3s.8-2.100 1-2.400c.3-.3.600-.3.800-.3h.6c.2 0 .4 0 .6.500l.9 2.100c.1.200.1.400 0 .5l-.4.600-.4.400c-.1.200-.3.300-.1.600.2.300.8 1.300 1.700 2.100 1.100 1 2.100 1.300 2.400 1.500.3.100.4.100.6-.1l.8-1c.2-.3.400-.2.600-.1l2 1c.3.100.5.200.5.300.1.200.1.800-.1 1.400z" /></svg></a>
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}
