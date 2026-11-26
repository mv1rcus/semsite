import { useEffect, useState } from "react";

/** Pizzaria nova, construida do zero a partir de um pin editorial creme com massa e farinha ("A Brighter Table"). Reserva de mesa em barra com dia, horario e pessoas, que fecha no WhatsApp. */
const INK = "#2a1a16", RD = "#d94a35", RD2 = "#b9341f", BG = "#faf3ec", DK = "#1b110e", MU = "#6f5a52";
const ING = ["Manjericão", "Muçarela", "Tomate", "Presunto", "Cogumelo", "Pimenta"];
const BAKE = ["Macia", "Clássica", "Crocante", "Bem passada"];
const FACT = [{ t: "Farinha", d: "Italiana tipo 00" }, { t: "Água", d: "Pura e simples" }, { t: "Tempo", d: "48h de fermentação" }, { t: "Paixão", d: "Em cada detalhe" }];
const TIMES = ["18:30", "19:30", "20:00", "20:30", "21:00", "21:30"];
const DOW = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
function nextDays() {
  const out: { dow: string; d: number; label: string }[] = [];
  const t = new Date();
  for (let i = 1; out.length < 6; i++) {
    const x = new Date(t.getFullYear(), t.getMonth(), t.getDate() + i);
    const w = DOW[x.getDay()] ?? "";
    out.push({ dow: w, d: x.getDate(), label: `${w}, ${String(x.getDate()).padStart(2, "0")}/${String(x.getMonth() + 1).padStart(2, "0")}` });
  }
  return out;
}

export function PizzaFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Forno Lume";
  const city = client?.city?.trim() || "Porto Alegre";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [ing, setIng] = useState<string[]>(["Manjericão", "Muçarela"]);
  const [bake, setBake] = useState(1);
  const [day, setDay] = useState(0);
  const [time, setTime] = useState("20:00");
  const [ppl, setPpl] = useState(2);
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  const [days] = useState(nextDays);
  useEffect(() => { const f = () => setSc(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const tog = (n: string) => setIng((a) => (a.includes(n) ? a.filter((x) => x !== n) : [...a, n]));
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero reservar uma mesa na ${brand}: ${ppl} ${ppl === 1 ? "pessoa" : "pessoas"}, ${days[day]?.label ?? ""} às ${time}.${ing.length ? ` Já quero uma pizza com: ${ing.join(", ").toLowerCase()}, massa ${BAKE[bake]?.toLowerCase()}.` : ""}`)}`;

  return (
    <div className="pz" style={{ fontFamily: "DM Sans, system-ui, sans-serif", color: INK, background: BG, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@400;500;600;700&family=Allura&display=swap');
        .pz *{box-sizing:border-box}.pz a,.pz button{font-family:inherit}
        .pz .wrap{max-width:1200px;margin:0 auto;padding:0 28px}
        .pz .serif{font-family:'Cormorant Garamond',serif}
        .pz .hero{position:relative;overflow:hidden;min-height:760px;background:#f6ece4}
        .pz .hero>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:60% 50%}
        .pz .hero:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(250,243,236,.92) 0,rgba(250,243,236,.55) 34%,rgba(250,243,236,0) 58%)}
        .pz .nav{position:relative;z-index:4;display:flex;align-items:center;justify-content:space-between;height:92px;gap:20px}
        .pz .logo{font-family:'Cormorant Garamond',serif;font-size:38px;font-weight:500;line-height:1;color:${INK}}
        .pz .logo small{display:block;font-family:'DM Sans',sans-serif;font-size:9.5px;letter-spacing:2.4px;text-transform:uppercase;color:${MU};margin-top:4px}
        .pz .links{display:flex;gap:12px}
        .pz .links a{cursor:pointer;background:rgba(255,255,255,.72);backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.9);border-radius:999px;padding:11px 22px;font-size:14px;font-weight:500;box-shadow:0 4px 14px rgba(120,60,40,.1)}
        .pz .links a:first-child{background:linear-gradient(180deg,#f2a58c,#e0735a);color:#fff}
        .pz .cta{background:linear-gradient(180deg,#ee6a50,${RD2});color:#fff;border:0;border-radius:999px;padding:0 34px;min-height:60px;font-size:16.5px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:12px;text-decoration:none;box-shadow:0 12px 26px rgba(185,52,31,.38)}
        .pz .cta:hover{filter:brightness(1.06)}
        .pz .burger{display:none;background:none;border:0;width:44px;height:44px;cursor:pointer}
        .pz .hgrid{position:relative;z-index:3;display:grid;grid-template-columns:1fr 1.1fr;min-height:600px;align-items:center}
        .pz .eyebrow{font-size:11.5px;letter-spacing:2.4px;text-transform:uppercase;color:${MU};font-weight:500}
        .pz h1{font-family:'Cormorant Garamond',serif;font-weight:500;font-size:clamp(58px,7vw,92px);line-height:.98;margin:18px 0 0;letter-spacing:-1px}
        .pz .lead{font-size:19px;line-height:1.5;margin:20px 0 30px;color:#4a352e}
        .pz .script{font-family:Allura,cursive;font-size:32px;color:#8f4a37;margin-top:22px;transform:rotate(-4deg);display:inline-block}
        .pz .panel{position:absolute;right:28px;top:20px;width:360px;background:rgba(255,255,255,.55);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.8);border-radius:22px;padding:20px 22px;box-shadow:0 10px 30px rgba(90,60,70,.14);z-index:3}
        .pz .panel h4{margin:0 0 12px;font-size:11px;letter-spacing:2.2px;text-transform:uppercase;color:${MU};font-weight:600}
        .pz .chips{display:flex;flex-wrap:wrap;gap:8px}
        .pz .chip{border:1.5px solid #ecd6cc;background:#fff;border-radius:999px;padding:9px 15px;font-size:13.5px;cursor:pointer;min-height:40px;font-weight:500}
        .pz .chip.on{background:${RD};border-color:${RD};color:#fff}
        .pz .sec{padding:90px 0}
        .pz h2{font-family:'Cormorant Garamond',serif;font-weight:500;font-size:clamp(40px,5vw,60px);line-height:1;margin:14px 0 0}
        .pz .sbox{position:relative;border-radius:34px;overflow:hidden;color:#fff}
        .pz .sbox>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
        .pz .facts{display:grid;gap:14px}
        .pz .fact{display:flex;align-items:center;gap:14px;background:rgba(255,255,255,.82);backdrop-filter:blur(6px);color:${INK};border-radius:18px;padding:14px 18px;width:260px;font-size:14.5px}
        .pz .fact b{display:block;font-size:11px;letter-spacing:1.8px;text-transform:uppercase;color:${MU}}
        .pz .fact i{width:12px;height:12px;border-radius:50%;background:${RD};flex:none}
        .pz .pg{display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:40px}
        .pz .bowl{border-radius:30px;overflow:hidden;box-shadow:0 20px 50px rgba(120,60,40,.18)}.pz .bowl img{width:100%;display:block}
        .pz .seal{width:130px;height:130px;border-radius:50%;border:1.5px solid rgba(255,255,255,.7);display:grid;place-items:center;text-align:center;background:rgba(30,10,5,.4);backdrop-filter:blur(4px);font-size:12px;letter-spacing:1.4px;text-transform:uppercase}
        .pz .seal b{display:block;font-family:'Cormorant Garamond',serif;font-size:42px;line-height:1;letter-spacing:0;text-transform:none}
        .pz .arch{border-radius:200px 200px 24px 24px;overflow:hidden;box-shadow:0 20px 50px rgba(60,30,20,.3);aspect-ratio:3/4;position:relative}.pz .arch img{width:100%;height:100%;object-fit:cover;display:block}
        .pz .book{position:relative;background:${DK};color:#fff;overflow:hidden;padding:100px 0 0}
        .pz .book>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.35}
        .pz .bar{position:relative;display:grid;grid-template-columns:1.3fr 1.3fr 1.1fr auto;gap:10px;background:rgba(0,0,0,.45);border:1px solid rgba(255,255,255,.2);border-radius:999px;padding:10px;margin-top:30px;max-width:900px}
        .pz .bar select{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);color:#fff;border-radius:999px;padding:0 20px;min-height:56px;font-size:15px;font-family:inherit;appearance:none}
        .pz .bar select option{color:#000}
        .pz footer{position:relative;margin-top:90px;padding:46px 0;border-top:1px solid rgba(255,255,255,.14);color:#e9d8cf;font-size:14px}
        .pz .fr{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap}
        .pz .fr nav{display:flex;gap:26px}.pz .fr nav a{cursor:pointer;color:#fff}
        .pz .wa{position:fixed;right:18px;bottom:18px;z-index:40;width:58px;height:58px;border-radius:50%;background:#25d366;display:grid;place-items:center;box-shadow:0 8px 24px rgba(0,0,0,.3)}
        .pz .mob{display:none}
        @media(max-width:900px){
          .pz .links,.pz .navcta{display:none}.pz .burger{display:block}.pz .nav{height:70px}.pz .logo{font-size:30px}
          .pz .hero{min-height:0}.pz .hero>img{object-position:70% 50%;opacity:.9}.pz .hero:after{background:linear-gradient(180deg,rgba(250,243,236,.94) 0,rgba(250,243,236,.7) 55%,rgba(250,243,236,.1) 100%)}
          .pz .hgrid{grid-template-columns:1fr;min-height:0;padding:20px 0 40px}.pz .panel{position:relative;right:0;top:0;width:100%;margin-top:30px}
          .pz .sec{padding:60px 0}.pz .pg{grid-template-columns:1fr;gap:28px}
          .pz .sbox .in{padding:30px 22px!important;min-height:0!important}.pz .fact{width:100%}
          .pz .bar{grid-template-columns:1fr 1fr;border-radius:28px}.pz .bar .cta{grid-column:span 2;justify-content:center}
          .pz .mob{display:block;background:#fff;border-radius:16px;margin:0 16px 10px;box-shadow:0 8px 24px rgba(60,30,20,.12);position:relative;z-index:6}.pz .mob a{display:block;padding:15px 20px;cursor:pointer;border-top:1px solid #f4e5dc}.pz .mob a:first-child{border:0}
          .pz .fr{justify-content:center;text-align:center}
        }
      `}</style>

      <div className="hero" id="top">
        <img src="/pizza-hero.webp" alt="Pizza napolitana sobre massa e farinha" />
        <header style={{ position: "relative", zIndex: 5 }}>
          <div className="wrap nav">
            <div className="logo">{brand}<small>Pizza pra boa companhia</small></div>
            <nav className="links"><a onClick={() => go("top")}>Cardápio</a><a onClick={() => go("historia")}>Nossa história</a><a onClick={() => go("unidade")}>Unidade</a><a onClick={() => go("reserva")}>Reservas</a></nav>
            <button type="button" className="cta navcta" style={{ minHeight: 48, padding: "0 24px", fontSize: 14.5 }} onClick={() => go("reserva")}>Reservar mesa</button>
            <button type="button" className="burger" aria-label="Menu" onClick={() => setMenu((m) => !m)}><svg width="26" height="26" viewBox="0 0 26 26" stroke={INK} strokeWidth="2"><path d="M3 7h20M3 13h20M3 19h20" /></svg></button>
          </div>
          {menu && <div className="mob"><a onClick={() => go("historia")}>Nossa história</a><a onClick={() => go("unidade")}>Unidade</a><a onClick={() => go("reserva")} style={{ color: RD, fontWeight: 700 }}>Reservar mesa</a></div>}
        </header>
        <div className="wrap hgrid">
          <div style={{ padding: "20px 0 60px" }}>
            <span className="eyebrow">Pizza artesanal aproxima pessoas</span>
            <h1>Uma mesa<br />mais feliz</h1>
            <p className="lead">Pizza extraordinária.<br />Momentos que importam.</p>
            <button type="button" className="cta" onClick={() => go("reserva")}>Reservar mesa <span aria-hidden>→</span></button><br />
            <span className="script">Boa pizza, melhor companhia</span>
          </div>
          <div style={{ position: "relative", minHeight: 480 }}>
            <div className="panel">
              <h4>Monte a sua</h4>
              <div className="chips">{ING.map((n) => (<button type="button" key={n} className={`chip${ing.includes(n) ? " on" : ""}`} onClick={() => tog(n)}>{n}</button>))}</div>
              <h4 style={{ marginTop: 18 }}>Ponto da massa</h4>
              <div className="chips">{BAKE.map((n, i) => (<button type="button" key={n} className={`chip${bake === i ? " on" : ""}`} onClick={() => setBake(i)}>{n}</button>))}</div>
            </div>
          </div>
        </div>
      </div>

      <section className="sec" id="historia"><div className="wrap">
        <div className="sbox" style={{ minHeight: 520 }}>
          <img src="/pizza-hand.webp" alt="Mãos polvilhando farinha na massa" loading="lazy" />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(20,10,6,.7) 0,rgba(20,10,6,.1) 60%)" }} />
          <div className="in" style={{ position: "relative", padding: "60px 56px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 30, minHeight: 520, flexWrap: "wrap" }}>
            <div style={{ maxWidth: 400 }}>
              <span className="eyebrow" style={{ color: "#e9cfc2" }}>Das coisas simples</span>
              <h2>Pizza extraordinária</h2>
              <p style={{ fontSize: 17, lineHeight: 1.65, margin: "18px 0 0", color: "#f4e3da" }}>Começamos pelos melhores ingredientes, respeitamos a tradição e deixamos o tempo trabalhar. Comida melhor faz um mundo mais feliz.</p>
            </div>
            <div className="facts">{FACT.map((f) => (<div className="fact" key={f.t}><i /><span><b>{f.t}</b>{f.d}</span></div>))}</div>
          </div>
        </div>
      </div></section>

      <section className="sec" style={{ paddingTop: 0 }}><div className="wrap pg">
        <div className="bowl"><img src="/pizza-bowls.webp" alt="Ingredientes frescos em potinhos" loading="lazy" /></div>
        <div>
          <span className="eyebrow">Ingredientes de verdade</span>
          <h2>Tudo fresco, <em>todo dia</em></h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: MU, margin: "18px 0 26px", maxWidth: 440 }}>Manjericão colhido na manhã, muçarela de búfala, tomate maduro e uma massa que descansa por 48 horas. Escolha seus ingredientes ali em cima e a gente leva pra mesa.</p>
          <button type="button" className="cta" onClick={() => go("reserva")}>Reservar mesa <span aria-hidden>→</span></button>
        </div>
      </div></section>

      <section className="sec" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="sbox" style={{ minHeight: 560 }}>
          <img src="/pizza-oven.webp" alt="Forno a lenha com pizza assando" loading="lazy" />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(30,8,2,.82) 0,rgba(30,8,2,.15) 55%)" }} />
          <div className="in" style={{ position: "relative", padding: "60px 56px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 30, minHeight: 560, flexWrap: "wrap" }}>
            <div style={{ maxWidth: 360, alignSelf: "center" }}>
              <span className="eyebrow" style={{ color: "#f1c9b8" }}>Tradição em movimento</span>
              <h2>O fogo traz<br />a pizza à vida</h2>
              <p style={{ fontSize: 17, lineHeight: 1.6, margin: "16px 0 0", color: "#f6dccf" }}>450 °C, 60 segundos. Uma técnica centenária que transforma ingredientes simples em algo extraordinário.</p>
            </div>
            <div className="seal"><span><b>60s</b>até a perfeição</span></div>
          </div>
        </div>
      </div></section>

      <section className="sec" style={{ paddingTop: 0 }}><div className="wrap pg">
        <div>
          <span className="eyebrow">Mais que pizza</span>
          <h2>Uma mesa<br />para boa companhia</h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: MU, margin: "18px 0 26px", maxWidth: 430 }}>Pizza fica ainda melhor quando é dividida. Chame a turma, peça de tudo um pouco e transforme qualquer noite em celebração.</p>
          <div style={{ display: "flex", gap: 22, fontSize: 12, letterSpacing: 2.4, textTransform: "uppercase", color: MU }}><span>Dividir</span><span>Provar</span><span>Conectar</span><span>Pertencer</span></div>
        </div>
        <div style={{ borderRadius: 30, overflow: "hidden", boxShadow: "0 20px 50px rgba(60,30,20,.25)" }}><img src="/pizza-table.webp" alt="Amigos dividindo pizzas na mesa" loading="lazy" style={{ width: "100%", display: "block" }} /></div>
      </div></section>

      <section className="sec" id="unidade" style={{ paddingTop: 0 }}><div className="wrap pg">
        <div className="arch"><img src="/pizza-room.webp" alt="Salão aconchegante da pizzaria" loading="lazy" /></div>
        <div>
          <span className="eyebrow">Onde estamos</span>
          <h2>A mesma pizza,<br />histórias diferentes</h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: MU, margin: "18px 0 8px" }}>Venha nos visitar em {city} e viva um lugar onde boa comida aproxima as pessoas.</p>
          <p style={{ fontSize: 16, lineHeight: 1.7, margin: 0 }}><b>{brand}, {city}</b><br />Rua das Oliveiras, 210, Moinhos de Vento<br />Ter a dom, 18h às 23h30</p>
        </div>
      </div></section>

      <section className="book" id="reserva">
        <img src="/pizza-room.webp" alt="" aria-hidden />
        <div className="wrap" style={{ position: "relative" }}>
          <span className="eyebrow" style={{ color: "#e9cfc2" }}>Boa companhia a uma reserva de distância</span>
          <h2 style={{ fontSize: "clamp(44px,6vw,76px)" }}>Vamos criar uma<br />mesa mais feliz</h2>
          <p style={{ fontSize: 17, color: "#f0ddd2", margin: "16px 0 0" }}>Reserve sua mesa e faça parte da história.</p>
          <div className="bar">
            <select value={day} onChange={(e) => setDay(Number(e.target.value))} aria-label="Dia">{days.map((d, i) => <option key={d.label} value={i}>{d.label}</option>)}</select>
            <select value={time} onChange={(e) => setTime(e.target.value)} aria-label="Horário">{TIMES.map((t) => <option key={t}>{t}</option>)}</select>
            <select value={ppl} onChange={(e) => setPpl(Number(e.target.value))} aria-label="Pessoas">{[1, 2, 3, 4, 5, 6, 8].map((n) => <option key={n} value={n}>{n} {n === 1 ? "pessoa" : "pessoas"}</option>)}</select>
            <a className="cta" href={wa} target="_blank" rel="noreferrer">Reservar mesa <span aria-hidden>→</span></a>
          </div>
          <footer><div className="fr">
            <div className="logo" style={{ color: "#fff", fontSize: 32 }}>{brand}</div>
            <nav><a onClick={() => go("historia")}>Nossa história</a><a onClick={() => go("unidade")}>Unidade</a><a onClick={() => go("reserva")}>Reservas</a></nav>
            <span>© {new Date().getFullYear()} {brand}. Todos os direitos reservados.</span>
          </div></footer>
        </div>
      </section>

      {sc && <a className="wa" href={`https://wa.me/${num}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 32 32" fill="#fff"><path d="M16 3a13 13 0 0 0-11 19.800L3 29l6.400-1.900A13 13 0 1 0 16 3zm0 2.400a10.600 10.600 0 1 1-5.400 19.700l-.4-.2-3.800 1.100 1.100-3.700-.3-.4A10.600 10.600 0 0 1 16 5.400zm-4 5.300c-.3 0-.7.100-1 .5-.4.400-1.300 1.300-1.300 3.100s1.300 3.600 1.500 3.900c.2.200 2.600 4.100 6.400 5.600 3.200 1.200 3.800 1 4.500.9.700-.1 2.200-.9 2.500-1.800.3-.9.300-1.600.2-1.800-.1-.2-.3-.3-.7-.5l-2.300-1.100c-.3-.1-.5-.2-.8.200l-1 1.200c-.2.300-.4.300-.8.100-.4-.2-1.500-.6-2.900-1.800-1.100-1-1.800-2.200-2-2.500-.2-.4 0-.6.200-.8l.6-.7c.2-.2.200-.4.400-.6.100-.3.100-.5 0-.7l-1-2.400c-.3-.6-.5-.5-.8-.5z" /></svg></a>}
    </div>
  );
}
