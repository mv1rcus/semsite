import { useEffect, useRef, useState } from "react";

/** Coworking novo, construido do zero a partir de um pin cinza e branco com palavra gigante sobre a foto. Reserva em uma barra que fecha no WhatsApp. */
const DK = "#232323", BG = "#f5f5f4", INK = "#161616", MUT = "#44443f";
const SPACES = [
  { n: "Sala de reunião", d: "Espaço privativo", img: "/cw-focus.webp" },
  { n: "Café comunitário", d: "Lounge e café", img: "/cw-cafe.webp" },
  { n: "Estúdio criador", d: "Produção de conteúdo", img: "/cw-creator.webp" },
  { n: "Mesas abertas", d: "Estações compartilhadas", img: "/cw-work.webp" },
];
const PERKS = [
  { t: "Estações completas", d: "Wi-Fi rápido, cadeiras ergonômicas e monitor pronto pra usar.", ic: "M6 8h20v13H6zM3 25h26" },
  { t: "Salas de reunião", d: "Salas privativas para calls, apresentações e brainstorms.", ic: "M4 24c0-6 3-9 6-9s4 2 6 2 3-2 6-2 6 3 6 9M6 15a4 4 0 1 1 6-3M20 12a4 4 0 1 1 6 3" },
  { t: "Estúdio de conteúdo", d: "Cantinhos fotográficos prontos para gravar e postar.", ic: "M4 9h24v16H4zM11 9l2-4h6l2 4M16 22a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" },
];
const ROOMS = ["Estação aberta", "Sala de reunião", "Estúdio criador"];
const DOW = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
function nextDays() {
  const out: { label: string }[] = [];
  const t = new Date();
  for (let i = 0; i < 7; i++) { const x = new Date(t); x.setDate(t.getDate() + i); out.push({ label: `${DOW[x.getDay()]}, ${String(x.getDate()).padStart(2, "0")}/${String(x.getMonth() + 1).padStart(2, "0")}` }); }
  return out;
}
const Ic = ({ d, c = INK }: { d: string; c?: string }) => (
  <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);

export function CoworkFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Fluxo";
  const city = client?.city?.trim() || "Curitiba";
  const word = brand.toLowerCase().replace(/\s*cowork(ing)?\s*$/i, "");
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [days] = useState(nextDays);
  const [day, setDay] = useState(0);
  const [ppl, setPpl] = useState(1);
  const [room, setRoom] = useState(0);
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  const car = useRef<HTMLDivElement>(null);
  useEffect(() => { const f = () => setSc(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const slide = (dir: number) => { const c = car.current; if (c) c.scrollBy({ left: dir * (c.clientWidth * 0.6), behavior: "smooth" }); };
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero reservar na ${brand}: ${ROOMS[room]}, ${days[day]?.label}, ${ppl} ${ppl === 1 ? "pessoa" : "pessoas"}.`)}`;

  return (
    <div className="cw" style={{ fontFamily: "Outfit, system-ui, sans-serif", color: INK, background: BG, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
        .cw *{box-sizing:border-box}
        .cw h1,.cw h2{font-family:Outfit,system-ui,sans-serif;text-transform:none;font-style:normal}
        .cw a,.cw button,.cw select{font-family:inherit}
        .cw .wrap{max-width:1180px;margin:0 auto;padding:0 24px}
        .cw .hero{position:relative;margin:8px;border-radius:30px;overflow:hidden;min-height:760px;color:#fff;display:flex;flex-direction:column;background:#222}
        .cw .hero>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
        .cw .hero:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.55),rgba(0,0,0,.25) 38%,rgba(0,0,0,.82))}
        .cw .hero>*{position:relative;z-index:2}
        .cw .nav{display:flex;justify-content:space-between;align-items:center;height:84px;gap:20px;font-size:15px;font-weight:400}
        .cw .nav a{color:#fff;cursor:pointer;opacity:.85}.cw .nav a:hover{opacity:1}
        .cw .nav .l{display:flex;gap:56px}
        .cw .burger{display:none;background:none;border:0;width:44px;height:44px;cursor:pointer}
        .cw .big{font-weight:800;letter-spacing:-.06em;line-height:.82;font-size:clamp(120px,27vw,400px);margin:30px 0 0;text-align:center;text-shadow:0 8px 40px rgba(0,0,0,.25)}
        .cw .hrow{display:flex;justify-content:space-between;align-items:flex-end;gap:30px;margin-top:auto;padding-bottom:26px;padding-top:70px}
        .cw .hrow{text-shadow:0 2px 16px rgba(0,0,0,.6)}
        .cw .hrow h1{font-size:clamp(22px,2.6vw,32px);font-weight:400;line-height:1.15;margin:0;max-width:380px}
        .cw .hrow p{margin:0;font-size:16px;line-height:1.55;max-width:340px;opacity:.88}
        .cw .pill{background:#fff;color:${INK};border-radius:999px;display:flex;align-items:center;gap:6px;padding:8px 8px 8px 26px;margin:0 auto 34px;width:max-content;max-width:calc(100% - 32px);box-shadow:0 14px 40px rgba(0,0,0,.25)}
        .cw .pill label{display:flex;flex-direction:column;font-size:11px;color:${MUT};padding:0 18px;border-right:1px solid #e3e3e0;text-transform:uppercase;letter-spacing:1.4px}
        .cw .pill label:nth-of-type(3){border:0}
        .cw .pill select{border:0;background:transparent;font-size:16px;font-weight:500;color:${INK};outline:none;cursor:pointer;padding:2px 0;min-height:28px}
        .cw .btn{background:${DK};color:#fff;border:0;border-radius:999px;padding:0 30px;min-height:54px;font-weight:600;font-size:16px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:8px;text-decoration:none}
        .cw .btn:hover{background:#000}
        .cw .btn.w{background:#fff;color:${INK}}
        .cw .intro{display:grid;grid-template-columns:1fr 1.5fr;gap:50px;padding:80px 0 50px;align-items:start}
        .cw .intro small{font-size:16px;color:${MUT};line-height:1.5;max-width:220px;display:block}
        .cw .intro h2{font-weight:400;font-size:clamp(26px,3.3vw,40px);line-height:1.2;margin:0;letter-spacing:-.5px}
        .cw .car{display:flex;gap:20px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding-bottom:6px}
        .cw .car::-webkit-scrollbar{display:none}
        .cw .sp{flex:0 0 calc(33.33% - 14px);scroll-snap-align:start;min-width:260px}
        .cw .sp img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:20px;display:block}
        .cw .sp b{display:block;font-size:26px;font-weight:500;margin-top:16px;letter-spacing:-.4px}
        .cw .sp span{font-size:15.5px;color:${MUT}}
        .cw .cnav{display:flex;justify-content:space-between;align-items:center;margin:26px 0 0}
        .cw .bar{flex:1;height:2px;background:#d4d4d0;margin-right:24px;position:relative}.cw .bar:before{content:"";position:absolute;left:0;top:0;height:2px;width:30%;background:${INK}}
        .cw .arr{width:46px;height:46px;border-radius:50%;border:1.5px solid #c8c8c4;background:#fff;cursor:pointer;font-size:17px;margin-left:8px}
        .cw .stats{display:grid;grid-template-columns:repeat(3,1fr);gap:36px;padding:70px 0 80px}
        .cw .stats b{font-size:clamp(40px,5vw,60px);font-weight:400;letter-spacing:-1.5px;display:block;line-height:1}
        .cw .stats span{display:block;font-size:16px;color:${MUT};margin-top:12px;line-height:1.5;max-width:300px}
        .cw .dark{background:${DK};color:#fff;padding:90px 0}
        .cw .dgrid{display:grid;grid-template-columns:1fr 1.15fr;gap:96px;align-items:center}
        .cw .dgrid small{font-size:15.5px;opacity:.88}
        .cw .dgrid h2{font-weight:400;font-size:clamp(28px,3.4vw,42px);line-height:1.15;margin:22px 0 40px;letter-spacing:-.5px}
        .cw .dimg{position:relative}
        .cw .dimg>img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:22px;display:block}
        .cw .perks{position:absolute;left:-110px;bottom:-34px;display:flex;flex-direction:column;gap:12px;width:360px}
        .cw .perk{background:#fff;color:${INK};border-radius:12px;padding:14px 16px;display:flex;gap:14px;align-items:center}
        .cw .perk i{width:46px;height:46px;border-radius:50%;background:#f1f1ef;display:grid;place-items:center;flex:none}
        .cw .perk b{display:block;font-size:18px;font-weight:500}.cw .perk span{font-size:14.5px;color:${MUT};line-height:1.35;display:block}
        .cw .cta{text-align:center;padding:100px 0 70px}
        .cw .cta h2{font-weight:500;font-size:clamp(32px,4.4vw,56px);letter-spacing:-1.5px;margin:0 0 14px;line-height:1.05}
        .cw .cta p{color:${MUT};margin:0 0 30px;font-size:17px}
        .cw footer{background:${DK};color:#cfcfca;margin:8px;border-radius:26px;padding:44px 0;font-size:14.5px}
        .cw footer .wrap{display:flex;justify-content:space-between;gap:30px;flex-wrap:wrap;line-height:1.8}
        .cw footer b{font-size:26px;color:#fff;font-weight:700;letter-spacing:-1px}
        .cw .wa{position:fixed;right:18px;bottom:18px;z-index:40;width:58px;height:58px;border-radius:50%;background:#25d366;display:grid;place-items:center;box-shadow:0 8px 24px rgba(0,0,0,.3)}
        .cw .mmenu{position:absolute;top:84px;left:16px;right:16px;background:#fff;color:${INK};border-radius:18px;padding:12px;z-index:5;display:flex;flex-direction:column}
        .cw .mmenu a{padding:14px;font-size:17px;font-weight:500;cursor:pointer;color:${INK};opacity:1}
        @media(max-width:860px){
          .cw .nav .l,.cw .nav .btn{display:none}.cw .burger{display:block}
          .cw .hero{min-height:720px;border-radius:24px}
          .cw .hrow{flex-direction:column;align-items:flex-start;gap:14px;padding-top:40px}
          .cw .pill{flex-direction:column;align-items:stretch;border-radius:24px;padding:16px;width:calc(100% - 32px);gap:8px}
          .cw .pill label{border:0;border-bottom:1px solid #e3e3e0;padding:6px 4px 10px}.cw .pill label:nth-of-type(3){border-bottom:0}
          .cw .intro{grid-template-columns:1fr;gap:20px;padding:56px 0 34px}
          .cw .sp{flex-basis:78%}
          .cw .stats{grid-template-columns:1fr;gap:30px;padding:50px 0 56px}
          .cw .dark{padding:60px 0}
          .cw .dgrid{grid-template-columns:1fr;gap:34px}
          .cw .perks{position:static;width:100%;margin-top:14px}
          .cw .cta{padding:70px 0 50px}
        }
      `}</style>

      <div className="hero" id="top">
        <img src="/cw-hero.webp" alt="Espaço de coworking amplo com mesas compartilhadas e luz natural" />
        <div className="wrap" style={{ width: "100%" }}>
          <div className="nav">
            <b style={{ fontSize: 20, letterSpacing: -0.5 }}>{brand}</b>
            <div className="l"><a onClick={() => go("espacos")}>Espaços</a><a onClick={() => go("planos")}>Planos</a><a onClick={() => go("estrutura")}>Estrutura</a><a onClick={() => go("contato")}>Contato</a></div>
            <a className="btn w" style={{ minHeight: 44, padding: "0 22px", opacity: 1, fontSize: 15 }} href={wa} target="_blank" rel="noreferrer">Reservar</a>
            <button type="button" className="burger" aria-label="Menu" onClick={() => setMenu((m) => !m)}><svg width="26" height="26" viewBox="0 0 26 26" stroke="#fff" strokeWidth="2"><path d="M3 7h20M3 13h20M3 19h20" /></svg></button>
          </div>
          {menu && <div className="mmenu"><a onClick={() => go("espacos")}>Espaços</a><a onClick={() => go("planos")}>Planos</a><a onClick={() => go("estrutura")}>Estrutura</a><a onClick={() => go("contato")}>Contato</a></div>}
          <div className="big" aria-label={brand}>{word}</div>
        </div>
        <div className="wrap hrow" style={{ width: "100%" }}>
          <h1>Trabalhe, estude e reúna a equipe em um coworking aconchegante e amplo</h1>
          <p>Estações abertas, salas privativas, mesas equipadas e cantinhos de conteúdo, tudo em {city}.</p>
        </div>
        <div className="pill" id="planos">
          <label>Data<select value={day} onChange={(e) => setDay(Number(e.target.value))} aria-label="Data">{days.map((d, i) => <option key={d.label} value={i}>{d.label}</option>)}</select></label>
          <label>Pessoas<select value={ppl} onChange={(e) => setPpl(Number(e.target.value))} aria-label="Pessoas">{[1, 2, 3, 4, 6, 8].map((n) => <option key={n} value={n}>{n}</option>)}</select></label>
          <label>Tipo de espaço<select value={room} onChange={(e) => setRoom(Number(e.target.value))} aria-label="Tipo de espaço">{ROOMS.map((r, i) => <option key={r} value={i}>{r}</option>)}</select></label>
          <a className="btn" href={wa} target="_blank" rel="noreferrer">Reservar</a>
        </div>
      </div>

      <div className="wrap" id="espacos">
        <div className="intro">
          <small>Tudo que você precisa para trabalhar, criar e crescer em um só lugar</small>
          <h2>De salas de reunião privativas a áreas abertas e cantos de conteúdo, reunimos tudo para um dia de trabalho produtivo em um ambiente moderno.</h2>
        </div>
        <div className="car" ref={car}>
          {SPACES.map((s) => (<div className="sp" key={s.n}><img src={s.img} alt={s.n} loading="lazy" /><b>{s.n}</b><span>{s.d}</span></div>))}
        </div>
        <div className="cnav"><div className="bar" /><div><button type="button" className="arr" aria-label="Anterior" onClick={() => slide(-1)}>←</button><button type="button" className="arr" aria-label="Próximo" onClick={() => slide(1)}>→</button></div></div>
        <div style={{ textAlign: "center", marginTop: 30 }}><a className="btn" href={wa} target="_blank" rel="noreferrer">Ver espaços disponíveis</a></div>
        <div className="stats">
          <div><b>1.200 m²</b><span>Ambiente amplo pensado para trabalho produtivo, reuniões e criação.</span></div>
          <div><b>15+ zonas</b><span>Áreas flexíveis para foco, networking, brainstorm e conteúdo.</span></div>
          <div><b>200+ lugares</b><span>Estações equipadas para freelancers, times e negócios em crescimento.</span></div>
        </div>
      </div>

      <div className="dark" id="estrutura">
        <div className="wrap dgrid">
          <div>
            <small>Espaços confortáveis para dias produtivos</small>
            <h2>Tudo que você precisa para trabalhar, reunir e criar, em um só lugar</h2>
            <p style={{ opacity: 0.88, lineHeight: 1.6, maxWidth: 360, margin: "0 0 34px", fontSize: 16 }}>Espaços flexíveis, equipamentos modernos, lounge aconchegante e salas completas para freelancers, times e criadores que valorizam conforto e estética.</p>
            <a className="btn w" href={wa} target="_blank" rel="noreferrer">Reservar um lugar</a>
          </div>
          <div className="dimg">
            <img src="/cw-work.webp" alt="Estações de trabalho equipadas com luminárias redondas" loading="lazy" />
            <div className="perks">{PERKS.map((p) => (<div className="perk" key={p.t}><i><Ic d={p.ic} /></i><div><b>{p.t}</b><span>{p.d}</span></div></div>))}</div>
          </div>
        </div>
      </div>

      <div className="wrap cta" id="contato">
        <h2>Vem conhecer a {brand}</h2>
        <p>Agende uma visita ou reserve seu lugar direto pelo WhatsApp.</p>
        <a className="btn" href={wa} target="_blank" rel="noreferrer">Falar no WhatsApp</a>
      </div>
      <footer>
        <div className="wrap">
          <div><b>{brand}</b><br />Coworking em {city}</div>
          <div>Av. Central, 450, {city}<br />Seg a sex, 7h às 22h · Sáb, 8h às 16h</div>
          <div>WhatsApp: {phone || "(00) 00000-0000"}</div>
        </div>
      </footer>
      {sc && <a className="wa" href={`https://wa.me/${num}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg></a>}
    </div>
  );
}
