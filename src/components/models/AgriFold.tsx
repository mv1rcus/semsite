import { useState } from "react";

/** AgriTech SaaS construido a partir de um pin: hero escuro com foto, titulo branco e lima, barra de numeros, painel ao vivo, 4 solucoes, painel de fazenda com mapa e faixa final. */
const BG = "#0b1a12", CARD = "#101f17", LIME = "#9ccc4a", LINE = "rgba(255,255,255,.09)", MUT = "#a9b8ae";
const SOL = [
  { t: "Gestão de Lavouras", d: "Planeje, acompanhe e gerencie suas culturas com dados em tempo real e análises com IA.", c: "#2f6b3a", ic: "M12 21v-9M12 12c0-4 3-6 7-6 0 4-3 6-7 6zM12 14c0-3-2-5-6-5 0 3 2 5 6 5z" },
  { t: "Irrigação Inteligente", d: "Programação de irrigação que poupa água e garante a saúde ideal da lavoura.", c: "#1d5b6b", ic: "M12 3s6 6.500 6 11a6 6 0 0 1-12 0c0-4.500 6-11 6-11z" },
  { t: "Solo e Saúde do Campo", d: "Analise o solo, receba recomendações e aumente a produtividade.", c: "#6b4423", ic: "M12 4v10M8 10l4 4 4-4M5 19h14" },
  { t: "Mercado e Preços", d: "Dados de mercado e previsões de preço para você vender melhor.", c: "#4b3a8f", ic: "M4 20V10l8-6 8 6v10zM9 20v-6h6v6" },
];
const Leaf = ({ s = 26 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke={LIME} strokeWidth="2.200" strokeLinecap="round" strokeLinejoin="round"><path d="M16 28V15" /><path d="M16 17C16 10 11 6 4 6c0 7 4 11 12 11z" /><path d="M16 14c0-5 3.500-8 10-8 0 5-3.500 8-10 8z" /></svg>
);
const Ic = ({ d, c = "#fff", s = 20 }: { d: string; c?: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.800" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);

export function AgriFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Campo Vivo";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [menu, setMenu] = useState(false);
  const wa = (what?: string) => `https://wa.me/${num}?text=${encodeURIComponent(`Olá! Quero ${what ?? "conhecer as soluções"} da ${brand}.`)}`;
  return (
    <div className="ag0" style={{ fontFamily: "Plus Jakarta Sans, system-ui, sans-serif", background: BG, color: "#fff", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .ag0 *{box-sizing:border-box}.ag0 a,.ag0 button{font-family:inherit;text-decoration:none;color:inherit}
        .ag0 h1,.ag0 h2,.ag0 h3{font-family:'Plus Jakarta Sans',system-ui,sans-serif !important;font-weight:600 !important;letter-spacing:-.02em;text-transform:none;margin:0}
        .ag0 .wrap{max-width:1180px;margin:0 auto;padding:0 32px}
        .ag0 .hero{position:relative;min-height:760px;display:flex;flex-direction:column;background:#10230f}
        .ag0 .hero img.bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:70% center}
        .ag0 .hero:before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(7,18,10,.82) 0%,rgba(7,18,10,.45) 45%,rgba(7,18,10,0) 70%),linear-gradient(180deg,rgba(7,18,10,.5) 0%,rgba(7,18,10,0) 22%,rgba(11,26,18,0) 78%,#0b1a12 100%)}
        .ag0 .nav{position:relative;z-index:3;height:84px;display:flex;align-items:center}
        .ag0 .nav .in{display:flex;align-items:center;width:100%}
        .ag0 .logo{display:flex;align-items:center;gap:10px;line-height:1}.ag0 .logo b{display:block;font-size:19px;font-weight:700;letter-spacing:.14em}.ag0 .logo small{display:block;font-size:10.5px;color:${MUT};margin-top:3px}
        .ag0 .links{display:flex;gap:34px;margin:0 auto;font-size:14px;font-weight:500}
        .ag0 .btn{display:inline-flex;align-items:center;gap:8px;background:${LIME};color:#10230f !important;font-weight:700;font-size:14px;padding:12px 22px;border-radius:999px}
        .ag0 .sun{width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.08);display:grid;place-items:center;margin-left:14px}
        .ag0 .burger{display:none;margin-left:auto;background:none;border:0;width:44px;height:44px;color:#fff}
        .ag0 .mm{position:absolute;top:78px;left:14px;right:14px;z-index:20;background:#13261b;border:1px solid ${LINE};border-radius:14px;padding:8px}.ag0 .mm a{display:block;padding:14px;font-weight:600}
        .ag0 .hc{position:relative;z-index:3;flex:1;display:flex;flex-direction:column;justify-content:center;padding:30px 0 150px}
        .ag0 .pill{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(156,204,74,.4);background:rgba(7,18,10,.55);border-radius:999px;padding:7px 14px;font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#cfe5a8;width:max-content;max-width:100%}
        .ag0 h1{font-size:60px;line-height:1.05;margin:26px 0 22px}.ag0 h1 em{font-style:normal;color:${LIME}}
        .ag0 .sub{max-width:480px;font-size:15.500px;line-height:1.65;color:#e1eae3;margin:0 0 34px}
        .ag0 .ghost{display:inline-flex;align-items:center;gap:12px;font-weight:600;font-size:14px;margin-left:18px}.ag0 .ghost i{width:44px;height:44px;border:1px solid rgba(255,255,255,.4);border-radius:50%;display:grid;place-items:center}
        .ag0 .stats{position:absolute;z-index:4;left:32px;bottom:60px;display:flex;gap:44px;background:rgba(16,31,23,.78);border:1px solid ${LINE};backdrop-filter:blur(8px);border-radius:16px;padding:22px 34px}
        .ag0 .stats div{display:flex;align-items:center;gap:12px}.ag0 .stats b{display:block;font-size:19px;font-weight:700}.ag0 .stats small{font-size:11.500px;color:${MUT}}
        .ag0 .live{position:absolute;z-index:4;right:32px;bottom:60px;width:310px;background:rgba(14,28,20,.85);border:1px solid ${LINE};backdrop-filter:blur(10px);border-radius:14px;padding:18px 20px}
        .ag0 .live h4{margin:0 0 14px;font-size:12.500px;font-weight:600;display:flex;align-items:center;gap:8px}.ag0 .live h4 span{margin-left:auto;color:${LIME};font-size:11px}
        .ag0 .row{display:flex;justify-content:space-between;font-size:12px;margin:0 0 6px}.ag0 .row b{font-weight:600}
        .ag0 .bar{height:3px;background:rgba(255,255,255,.14);border-radius:3px;margin-bottom:14px}.ag0 .bar i{display:block;height:100%;background:${LIME};border-radius:3px}
        .ag0 .eb{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:${LIME}}
        .ag0 .sec{padding:84px 0 0}
        .ag0 .sh{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:end}.ag0 .sh h2{font-size:34px;line-height:1.15;font-weight:500 !important;margin-top:12px}.ag0 .sh p{color:${MUT};font-size:14px;line-height:1.7;max-width:360px;margin:0}
        .ag0 .cards{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:42px}
        .ag0 .card{background:${CARD};border:1px solid ${LINE};border-radius:16px;padding:24px;min-height:262px;display:flex;flex-direction:column}
        .ag0 .card .ci{width:46px;height:46px;border-radius:50%;display:grid;place-items:center;margin-bottom:26px}
        .ag0 .card h3{font-size:17px;font-weight:500 !important;margin-bottom:12px}.ag0 .card p{font-size:13px;line-height:1.65;color:${MUT};margin:0;flex:1}
        .ag0 .card i.go{width:34px;height:34px;border:1px solid rgba(255,255,255,.25);border-radius:50%;display:grid;place-items:center}
        .ag0 .tech{display:grid;grid-template-columns:.8fr 1.6fr;gap:44px;align-items:center}.ag0 .tech h2{font-size:38px;line-height:1.1;font-weight:500 !important;margin:12px 0 16px}
        .ag0 .tech p{font-size:13.500px;line-height:1.7;color:${MUT}}.ag0 .tech li{list-style:none;display:flex;gap:10px;align-items:center;font-size:13.500px;margin-bottom:11px}
        .ag0 .dash{background:#0e1c14;border:1px solid ${LINE};border-radius:14px;display:grid;grid-template-columns:48px 1fr;overflow:hidden}
        .ag0 .dash .rail{border-right:1px solid ${LINE};display:flex;flex-direction:column;gap:18px;align-items:center;padding-top:50px}.ag0 .dash .rail i{width:12px;height:12px;border:1.500px solid #5f7566;border-radius:3px}
        .ag0 .dm{padding:0 16px 16px}.ag0 .dm .top{font-size:12.500px;padding:16px 0 10px}
        .ag0 .g{display:grid;grid-template-columns:1fr 1fr 1fr 1.25fr;gap:10px}.ag0 .t{background:#13261b;border-radius:8px;padding:12px;font-size:10.500px;color:${MUT}}.ag0 .t b{display:block;font-size:24px;color:#fff;font-weight:500;margin-top:6px}
        .ag0 .map{border-radius:8px;overflow:hidden;min-height:150px;background:#233d1c}.ag0 .map img{width:100%;height:100%;object-fit:cover;display:block}
        .ag0 .cta{margin:60px 0 0;position:relative;border-radius:16px;overflow:hidden;background:${CARD};border:1px solid ${LINE};display:grid;grid-template-columns:.9fr 1.1fr 1.1fr;align-items:center;min-height:112px}
        .ag0 .cta img{width:100%;height:100%;object-fit:cover;position:absolute;left:0;top:0;width:36%;mask-image:linear-gradient(90deg,#000 60%,transparent)}
        .ag0 .cta h3{font-size:19px;font-weight:500 !important;margin-bottom:6px}.ag0 .cta p{font-size:12px;color:${MUT};margin:0;line-height:1.5}
        .ag0 .av{display:flex}.ag0 .av i{width:30px;height:30px;border-radius:50%;background:#2f6b3a;border:2px solid ${CARD};margin-left:-8px;display:grid;place-items:center;font-size:10px;font-style:normal;font-weight:700}
        .ag0 .foot{padding:44px 0 90px;color:${MUT};font-size:12.500px;display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap}
        .ag0 .wf{position:fixed;right:18px;bottom:18px;z-index:30;width:56px;height:56px;border-radius:50%;background:#25d366;display:grid;place-items:center;box-shadow:0 8px 22px rgba(0,0,0,.4)}
        @media(max-width:900px){
          .ag0 .wrap{padding:0 20px}.ag0 .links,.ag0 .nav .btn,.ag0 .sun{display:none}.ag0 .burger{display:block}
          .ag0 .hero{min-height:auto}.ag0 .hero:before{background:linear-gradient(180deg,rgba(7,18,10,.55) 0%,rgba(7,18,10,.35) 35%,rgba(11,26,18,.85) 80%,#0b1a12 100%)}
          .ag0 .hero img.bg{object-position:72% center}
          .ag0 h1{font-size:38px}.ag0 .hc{padding:40px 0 30px}
          .ag0 .stats,.ag0 .live{position:relative;left:auto;right:auto;bottom:auto;width:auto;margin:0 20px 16px;z-index:4}
          .ag0 .stats{display:grid;grid-template-columns:1fr 1fr;gap:18px;padding:20px}.ag0 .live{width:auto}
          .ag0 .sh,.ag0 .tech{grid-template-columns:1fr;gap:18px}.ag0 .sh h2{font-size:28px}.ag0 .cards{grid-template-columns:1fr 1fr}
          .ag0 .g{grid-template-columns:1fr 1fr}.ag0 .dash{grid-template-columns:1fr}.ag0 .dash .rail{display:none}
          .ag0 .cta{grid-template-columns:1fr;padding:150px 20px 22px;gap:16px}.ag0 .cta img{width:100%;height:130px;mask-image:linear-gradient(180deg,#000 55%,transparent)}
        }
        @media(max-width:520px){.ag0 .cards{grid-template-columns:1fr}.ag0 .ghost{margin:14px 0 0}}
      `}</style>

      <section className="hero">
        <img className="bg" src="/agri-hero.webp" alt="Produtor rural com tablet em terraços de lavoura ao entardecer" />
        <div className="wrap" style={{ width: "100%" }}>
          <div className="nav"><div className="in">
            <div className="logo"><Leaf /><div><b>{brand.toUpperCase().split(" ")[0]}</b><small>{brand.split(" ").slice(1).join(" ") || "Agro"} Soluções Agro</small></div></div>
            <div className="links"><a href="#" style={{ color: LIME }}>Início</a><a href="#sol">Soluções</a><a href="#tec">Tecnologia</a><a href="#">Conteúdos</a><a href="#">Sobre nós</a><a href="#">Contato</a></div>
            <a className="btn" href={wa("começar")}>Começar <Ic d="M5 12h14M13 6l6 6-6 6" c="#10230f" s={15} /></a>
            <span className="sun"><Ic d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.500 1.500M17.500 17.500L19 19M5 19l1.500-1.500M17.500 6.500L19 5" s={16} /></span>
            <button className="burger" aria-label="Menu" onClick={() => setMenu(!menu)}><Ic d="M4 7h16M4 12h16M4 17h16" /></button>
          </div></div>
          {menu && <div className="mm"><a href="#sol" onClick={() => setMenu(false)}>Soluções</a><a href="#tec" onClick={() => setMenu(false)}>Tecnologia</a><a href={wa("começar")}>Começar</a></div>}
        </div>
        <div className="wrap hc" style={{ width: "100%" }}>
          <span className="pill"><Leaf s={13} /> Soluções inteligentes para um amanhã melhor</span>
          <h1>Cultivando o futuro.<br /><em>Fortalecendo o produtor.</em></h1>
          <p className="sub">A {brand} une tecnologia, dados e práticas sustentáveis para ajudar o produtor a ganhar produtividade, lucro e construir um futuro melhor.</p>
          <div><a className="btn" href="#sol" style={{ padding: "15px 26px" }}>Conhecer soluções <Ic d="M5 12h14M13 6l6 6-6 6" c="#10230f" s={15} /></a>
            <a className="ghost" href={wa("ver a história")}><i><Ic d="M8 5l11 7-11 7z" s={14} /></i>Ver história</a></div>
        </div>
        <div className="stats">
          {([["25 mil+", "Produtores atendidos", "M16 11a3 3 0 1 0 0-6M8 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 20c0-3 3-5 6-5s6 2 6 5M16 15c3 0 6 2 6 5"], ["1,2 mi+", "Hectares monitorados", "M12 3l9 5v2H3V8zM5 12v6M10 12v6M14 12v6M19 12v6M3 20h18"], ["40%", "Ganho médio de produtividade", "M4 18l5-6 4 3 7-9M15 6h5v5"], ["30%", "Economia de água", "M12 3s6 6.500 6 11a6 6 0 0 1-12 0c0-4.500 6-11 6-11z"]] as [string, string, string][]).map(([a, b, d]) => (
            <div key={b}><Ic d={d} c={LIME} s={24} /><span><b>{a}</b><small>{b}</small></span></div>
          ))}
        </div>
        <div className="live">
          <h4><Leaf s={15} /> Monitoramento ao vivo <span>Ver tudo →</span></h4>
          <div className="row"><span>Umidade do solo<br />Ideal</span><b>68%</b></div><div className="bar"><i style={{ width: "68%" }} /></div>
          <div className="row"><span>Temperatura</span><b>24°C</b></div><div className="bar"><i style={{ width: "64%" }} /></div>
          <div className="row"><span>Chance de chuva</span><b>10%</b></div><div className="bar" style={{ marginBottom: 0 }}><i style={{ width: "10%" }} /></div>
        </div>
      </section>

      <section className="wrap sec" id="sol">
        <div className="sh"><div><span className="eb">O que fazemos</span><h2>Soluções inteligentes<br />para cada fazenda</h2></div><p>Do solo ao mercado, entregamos soluções completas que ajudam você a decidir melhor e a crescer de forma sustentável.</p></div>
        <div className="cards">{SOL.map((s) => (
          <div className="card" key={s.t}><span className="ci" style={{ background: s.c }}><Ic d={s.ic} s={20} /></span><h3>{s.t}</h3><p>{s.d}</p><i className="go"><Ic d="M5 12h14M13 6l6 6-6 6" s={14} /></i></div>
        ))}</div>
      </section>

      <section className="wrap sec" id="tec">
        <div className="tech">
          <div><span className="eb">Nossa tecnologia</span><h2>Dados. IA. IoT.<br />Melhores juntos.</h2>
            <p>Usamos tecnologia avançada para coletar dados em tempo real do campo e transformar em ações que você pode confiar.</p>
            <ul style={{ padding: 0, margin: "20px 0 26px" }}>{["Monitoramento de campo em tempo real", "Recomendações com inteligência artificial", "Sensores IoT e dados de satélite", "Fácil de usar no celular e no computador"].map((x) => <li key={x}><span style={{ color: LIME }}>●</span>{x}</li>)}</ul>
            <a className="btn" href={wa("saber mais")}>Saiba mais <Ic d="M5 12h14M13 6l6 6-6 6" c="#10230f" s={15} /></a></div>
          <div className="dash"><div className="rail"><i /><i /><i /><i /><i /></div>
            <div className="dm"><div className="top">Visão da fazenda</div>
              <div className="g">
                <div className="t">Talhões<b>12</b><br />Culturas ativas<b>6</b></div>
                <div className="t">Previsão de produção<b>3,6 <small>t/ha</small></b><svg width="100%" height="40" viewBox="0 0 100 40" preserveAspectRatio="none"><path d="M0 34L25 28 45 30 70 14 100 8" stroke={LIME} fill="none" strokeWidth="1.500" /></svg></div>
                <div className="t">Saúde da lavoura<svg width="86" height="62" viewBox="0 0 86 62" style={{ display: "block", margin: "6px auto 0" }}><path d="M10 54a33 33 0 1 1 66 0" stroke="#233d1c" strokeWidth="7" fill="none" strokeLinecap="round" /><path d="M10 54a33 33 0 0 1 58-22" stroke={LIME} strokeWidth="7" fill="none" strokeLinecap="round" /><text x="43" y="52" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="600">85%</text></svg></div>
                <div className="t">Atividade recente<br /><br />● Irrigação concluída<br />● Adubação aplicada<br />● Controle de pragas</div>
              </div>
              <div className="g" style={{ marginTop: 10, gridTemplateColumns: "2.4fr 1fr" }}>
                <div className="map"><img src="/agri-mapa.webp" alt="Mapa de talhões com índice de vigor da lavoura" /></div>
                <div className="t">Clima<b>24°C</b>Parcialmente nublado<br /><br />Vento 12 km/h<br />Umidade 60%</div>
              </div></div></div>
        </div>
        <div className="cta">
          <img src="/agri-maos.webp" alt="Mãos segurando uma muda brotando da terra" />
          <span />
          <div style={{ padding: "22px 0" }}><h3>Juntos, vamos construir um futuro mais verde e mais próspero.</h3><p>Entre para o movimento por uma agricultura mais sustentável.</p></div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px 28px", justifySelf: "end" }}>
            <div className="av"><i>MA</i><i style={{ background: "#6b4423" }}>JR</i><i style={{ background: "#1d5b6b" }}>LS</i></div>
            <span style={{ fontSize: 11, color: MUT, maxWidth: 92 }}>Confiança de produtores em todo o país</span>
            <a className="btn" href={wa("começar hoje")} style={{ whiteSpace: "nowrap" }}>Começar hoje <Ic d="M5 12h14M13 6l6 6-6 6" c="#10230f" s={15} /></a></div>
        </div>
        <div className="foot"><span>© {brand} Soluções Agro · Ribeirão Preto, SP</span><span>Privacidade · Termos</span></div>
      </section>
    </div>
  );
}
