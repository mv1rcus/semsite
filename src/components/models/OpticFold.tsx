import { useEffect, useState } from "react";

/** Otica, construida do zero a partir de um pin claro em creme com serifada e botao preto. Agendamento de exame em 3 passos que fecha no WhatsApp. */
const BG = "#f6f1e9", CR = "#efe7da", INK = "#1d1a16", MU = "#5d554b", OL = "#5c6650";
const FRAMES = [
  { n: "Armação de acetato", d: "Clássica e marcante", p: "a partir de R$ 299", img: "/opt-s1.webp" },
  { n: "Armação de metal", d: "Leve e discreta", p: "a partir de R$ 349", img: "/opt-s2.webp" },
  { n: "Óculos de sol", d: "Proteção com estilo", p: "a partir de R$ 259", img: "/opt-s3.webp" },
  { n: "Infantil", d: "Resistente pra brincar", p: "a partir de R$ 199", img: "/opt-s4.webp" },
];
const PERKS = [
  { t: "Exame de vista na loja", d: "Com optometrista, sem custo na compra", ic: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7zM12 12m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0" },
  { t: "Lentes em 1 hora", d: "Grau pronto no mesmo dia", ic: "M12 2v10l6 4M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z" },
  { t: "Garantia de ajuste", d: "Apertou, folgou? A gente regula", ic: "M14.7 6.3a4.5 4.5 0 0 0-6 6L3 18l3 3 5.7-5.7a4.5 4.5 0 0 0 6-6L14 13l-3-3 3.7-3.7z" },
  { t: "Troca em 7 dias", d: "Não amou? Troca sem burocracia", ic: "M3 12a9 9 0 0 1 15.5-6.4L21 8M21 12a9 9 0 0 1-15.5 6.4L3 16M21 3v5h-5M3 21v-5h5" },
];
const REVIEWS = [
  { q: "Exame cuidadoso e o óculos ficou pronto na hora do almoço. Nunca fui tão bem atendida.", n: "Marília T.", img: "/opt-guest.webp" },
  { q: "Me ajudaram a escolher a armação certa pro meu rosto, sem empurrar a mais cara.", n: "João P.", img: "/opt-guest.webp" },
  { q: "Levei minha filha e saímos os dois de óculos novos. Preço justo e lente fina de verdade.", n: "Renata S.", img: "/opt-guest.webp" },
];
const TIMES = ["09:00", "10:30", "13:30", "15:00", "16:30", "18:00"];
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
const Ic = ({ d, s = 26, c = INK }: { d: string; s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);
const GLASS = "M2 12h3m14 0h3M5 12a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0zm7 0a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0zm-7 0h7";

export function OpticFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Ótica Prisma";
  const city = client?.city?.trim() || "Fortaleza";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [kind, setKind] = useState("Óculos de grau");
  const [day, setDay] = useState(0);
  const [time, setTime] = useState("");
  const [cust, setCust] = useState("");
  const [sc, setSc] = useState(false);
  const [menu, setMenu] = useState(false);
  const [days] = useState(nextDays);
  useEffect(() => { const f = () => setSc(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const start = () => { setStep(1); setTime(""); setOpen(true); setMenu(false); };
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero agendar uma visita na ${brand}${cust ? ` em nome de ${cust}` : ""}: interesse em ${kind}, ${days[day]?.label ?? ""} às ${time}.`)}`;

  return (
    <div className="of" style={{ fontFamily: "Jost, system-ui, sans-serif", color: INK, background: BG, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=Jost:wght@400;500;600&family=Caveat:wght@600&display=swap');
        .of *{box-sizing:border-box}
        .of a,.of button{font-family:inherit}
        .of .wrap{max-width:1180px;margin:0 auto;padding:0 24px}
        .of .nav{display:flex;align-items:center;justify-content:space-between;height:84px;gap:20px}
        .of .logo{display:flex;align-items:center;gap:10px;font-family:Fraunces,serif;font-weight:600;font-size:24px;color:${INK}}
        .of .links{display:flex;gap:32px;font-size:15px;font-weight:500}
        .of .links a{color:${MU};cursor:pointer;transition:color .2s}.of .links a:hover{color:${INK}}
        .of .btn{background:${INK};color:#f6f1e9;border:0;border-radius:999px;padding:0 26px;min-height:50px;font-weight:600;font-size:15px;cursor:pointer;display:inline-flex;align-items:center;gap:10px;text-decoration:none}
        .of .btn:hover{background:#36302a}
        .of .btn.o{background:transparent;color:${INK};border:1.5px solid #c9bda9;box-shadow:none}
        .of .btn.o:hover{border-color:${INK}}
        .of .burger{display:none;background:none;border:0;width:44px;height:44px;cursor:pointer}
        .of .hero{background:linear-gradient(180deg,${BG},${CR})}
        .of .herogrid{display:grid;grid-template-columns:1fr 1.1fr;align-items:center;gap:20px;min-height:600px}
        .of .himg{position:relative;align-self:stretch;display:flex;align-items:flex-end;justify-content:center}
        .of .himg .arch{position:absolute;inset:9% 10% 0;background:#e6dcc9;border-radius:280px 280px 0 0}
        .of .himg img{position:relative;z-index:2;width:min(80%,430px);filter:drop-shadow(0 18px 34px rgba(60,50,35,.28))}
        .of .himg .script{position:absolute;z-index:3;right:4%;top:12%;font-family:Caveat,cursive;font-size:40px;line-height:1.05;color:${INK};transform:rotate(3deg);text-align:center}
        .of .kick{font-size:12.5px;letter-spacing:3.5px;text-transform:uppercase;font-weight:600;color:${OL}}
        .of h1{font-family:Fraunces,serif;font-weight:600;font-size:clamp(42px,5.4vw,72px);line-height:1.05;margin:16px 0 0;color:${INK};letter-spacing:-1px}
        .of h1 em{font-style:italic;font-weight:500}
        .of .lead{font-size:17.5px;line-height:1.7;color:${MU};margin:20px 0 28px;max-width:440px}
        .of .feats{display:flex;gap:30px;margin-top:36px;flex-wrap:wrap}
        .of .feats div{display:flex;flex-direction:column;align-items:center;gap:8px;font-size:13px;text-align:center;color:${MU};font-weight:500}
        .of .sec{padding:68px 0}
        .of .center{text-align:center;max-width:640px;margin:0 auto}
        .of h2{font-family:Fraunces,serif;font-weight:600;font-size:clamp(30px,3.4vw,42px);margin:0;color:${INK};line-height:1.12}
        .of h2 em{font-style:italic}
        .of .sub{color:${MU};font-size:16px;margin-top:12px;line-height:1.6}
        .of .grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:38px}
        .of .card{background:#fff;border:1px solid #e7ddcb;border-radius:16px;overflow:hidden;transition:transform .3s,box-shadow .3s;cursor:pointer;display:flex;flex-direction:column}
        .of .card .lb{margin-top:auto}
        .of .card .pr2{color:${INK};font-weight:600;font-size:13px;display:block;margin-top:3px}
        .of .card:hover{transform:translateY(-6px);box-shadow:0 16px 34px rgba(60,50,35,.14)}
        .of .card img{width:100%;aspect-ratio:1/1.02;object-fit:cover;display:block}
        .of .card .lb{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:13px 15px}
        .of .card b{font-family:Fraunces,serif;font-size:17px;font-weight:600;display:block;text-align:left}
        .of .card small{color:${MU};font-size:12.5px;display:block;margin-top:2px;text-align:left}
        .of .card .go{width:30px;height:30px;border-radius:50%;background:${INK};color:#f6f1e9;display:grid;place-items:center;font-size:14px;flex:none}
        .of .split{display:grid;grid-template-columns:1.05fr 1fr;gap:52px;align-items:center}
        .of .bigimg{position:relative;border-radius:20px;overflow:hidden}
        .of .bigimg img{width:100%;aspect-ratio:4/4.4;object-fit:cover;display:block}
        .of .bigimg .tag{position:absolute;left:20px;bottom:18px;color:#fff;font-size:12.5px;letter-spacing:3px;text-transform:uppercase;font-weight:600;text-shadow:0 2px 12px rgba(0,0,0,.6)}
        .of .plist{display:grid;grid-template-columns:1fr 1fr;gap:18px 22px;margin-top:28px}
        .of .plist .pi{display:flex;gap:12px;align-items:flex-start}
        .of .plist .pk{flex:none;width:42px;height:42px;border-radius:50%;background:#fff;border:1px solid #e0d5c0;display:grid;place-items:center}
        .of .plist b{font-size:15px;font-weight:600;display:block}
        .of .plist p{margin:2px 0 0;font-size:13.5px;color:${MU};line-height:1.5}
        .of .revs{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:38px}
        .of .rev{background:#faf5ec;border:1px solid #e7ddcb;border-radius:16px;padding:24px}
        .of .rev .hd{display:flex;align-items:center;gap:12px;margin-bottom:12px}
        .of .rev img{width:46px;height:46px;border-radius:50%;object-fit:cover}
        .of .rev b{font-family:Fraunces,serif;font-size:16px;display:block}
        .of .rev .st{color:#c9a227;letter-spacing:2px;font-size:12px}
        .of .rev p{margin:0;font-size:14.5px;line-height:1.6;color:#4a443c}
        .of .band{position:relative;border-radius:24px;overflow:hidden;margin:10px 0 64px}
        .of .band img{width:100%;height:320px;object-fit:cover;display:block;filter:brightness(.45)}
        .of .band .in{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;text-align:center;color:#fff;padding:20px}
        .of .band h3{font-family:Fraunces,serif;font-weight:600;font-size:clamp(26px,3.2vw,40px);margin:0}
        .of .band .script2{font-family:Caveat,cursive;font-size:34px;color:#ffe9b8;transform:rotate(-2deg)}
        .of .band .btn{background:#f6f1e9;color:${INK}}
        .of footer{background:${INK};color:#cfc6b8;padding:40px 0}
        .of .fr{display:flex;align-items:flex-start;justify-content:space-between;gap:24px;flex-wrap:wrap}
        .of .fr .logo{color:#f6f1e9}
        .of .fr nav{display:flex;gap:24px;font-size:14.5px}.of .fr nav a{cursor:pointer;color:#cfc6b8}.of .fr nav a:hover{color:#fff}
        .of .fr .ct{font-size:14.5px;line-height:1.8}
        .of .fr .ct a{color:#e8c97a;font-weight:600}
        .of .wa{position:fixed;right:18px;bottom:18px;z-index:40;width:58px;height:58px;border-radius:50%;background:#25d366;display:grid;place-items:center;box-shadow:0 8px 24px rgba(0,0,0,.3)}
        .of .ov{position:fixed;inset:0;z-index:100;background:rgba(30,25,18,.55);display:flex;align-items:center;justify-content:center;padding:16px}
        .of .md{background:${BG};width:100%;max-width:540px;max-height:92vh;overflow:auto;padding:32px;border-radius:22px;position:relative}
        .of .md h3{font-family:Fraunces,serif;font-size:28px;margin:8px 0 4px;color:${INK}}
        .of .tagp{display:inline-block;background:${CR};color:${OL};border-radius:999px;padding:6px 14px;font-size:12.5px;font-weight:600;letter-spacing:1px;text-transform:uppercase}
        .of .bars{display:flex;gap:6px;margin:16px 0 20px}.of .bars i{flex:1;height:4px;border-radius:4px;background:#e0d5c0}.of .bars i.on{background:${INK}}
        .of .chip{padding:12px 8px;border:1.5px solid #d8ccb5;border-radius:12px;background:#fff;cursor:pointer;font-size:14.5px;text-align:center;min-height:48px;color:${INK}}
        .of .chip.on{background:${INK};color:#f6f1e9;border-color:${INK}}
        .of .chip small{color:inherit;opacity:.75}
        .of .x{position:absolute;right:14px;top:12px;width:44px;height:44px;border:0;background:none;font-size:26px;cursor:pointer;color:${MU}}
        .of .sum{background:#fff;border:1.5px solid #d8ccb5;border-radius:14px;padding:18px;font-size:15px;line-height:1.9}
        .of .inp{width:100%;margin-top:14px;min-height:50px;padding:0 16px;border:1.5px solid #d8ccb5;border-radius:14px;font-size:15px;background:#fff;color:${INK}}
        .of .cta-m{display:none}
        .of .mob{display:none}
        @media(max-width:900px){
          .of .links,.of .navbtn{display:none}.of .burger{display:block}.of .nav{height:68px}.of .logo{font-size:19px;white-space:nowrap}
          .of .cta-m{display:inline-flex;min-height:44px;padding:0 18px;margin-left:auto;margin-right:4px;font-size:14px}
          .of .herogrid{grid-template-columns:1fr;min-height:0;gap:0;padding-top:4px}
          .of .himg{order:2;min-height:430px;margin-top:26px}.of .himg .arch{inset:10% 6% 0}
          .of .himg .script{font-size:30px;right:2%;top:8%}
          .of .feats{gap:18px}
          .of .grid4{grid-template-columns:1fr 1fr;gap:12px}
          .of .card b{font-size:16px}.of .card small{font-size:13px}
          .of .split{grid-template-columns:1fr;gap:30px}
          .of .plist{grid-template-columns:1fr}
          .of .revs{grid-template-columns:1fr;gap:12px}
          .of .rev p{font-size:15.5px}
          .of .plist p{font-size:14.5px}
          .of .feats div{font-size:12.5px}
          .of .band .in h3{font-size:26px}
          .of .band img{height:380px}
          .of .fr{flex-direction:column;align-items:center;text-align:center}
          .of .fr nav{flex-wrap:wrap;justify-content:center}
          .of .md{padding:26px 20px}
          .of .mob{display:block;background:#fff;border:1px solid #e7ddcb;border-radius:16px;margin:0 16px 10px}.of .mob a{display:block;padding:15px 20px;font-size:15px;cursor:pointer;border-top:1px solid #f0e8d8;color:${MU}}.of .mob a:first-child{border:0}
        }
      `}</style>

      <div className="hero" id="top">
        <header>
          <div className="wrap nav">
            <div className="logo"><Ic d={GLASS} s={28} />{brand}</div>
            <nav className="links"><a onClick={() => go("colecao")}>Coleção</a><a onClick={() => go("sobre")}>Sobre</a><a onClick={() => go("avaliacoes")}>Avaliações</a><a onClick={() => go("contato")}>Contato</a></nav>
            <button type="button" className="btn navbtn" onClick={start}>Agendar visita</button>
            <button type="button" className="btn cta-m" onClick={start}>Agendar</button>
            <button type="button" className="burger" aria-label="Menu" onClick={() => setMenu((m) => !m)}><svg width="26" height="26" viewBox="0 0 26 26" stroke={INK} strokeWidth="2"><path d="M3 7h20M3 13h20M3 19h20" /></svg></button>
          </div>
          {menu && <div className="mob"><a onClick={() => go("colecao")}>Coleção</a><a onClick={() => go("sobre")}>Sobre</a><a onClick={() => go("avaliacoes")}>Avaliações</a><a onClick={start} style={{ color: OL, fontWeight: 600 }}>Agendar visita</a></div>}
        </header>
        <section>
          <div className="wrap herogrid">
            <div style={{ padding: "30px 0" }}>
              <span className="kick">Ótica premium · {city}</span>
              <h1>Veja o mundo<br />com <em>mais estilo</em></h1>
              <p className="lead">Armações de grife, lentes feitas na hora e exame de vista na loja. O par perfeito pro seu rosto e pro seu bolso.</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button type="button" className="btn" onClick={start}>Agendar visita <span aria-hidden>→</span></button>
                <button type="button" className="btn o" onClick={() => go("colecao")}>Ver coleção</button>
              </div>
              <div className="feats">
                <div><Ic d={PERKS[0]!.ic} s={34} />Exame na loja</div>
                <div><Ic d={PERKS[1]!.ic} s={34} />Lentes em 1h</div>
                <div><Ic d={PERKS[3]!.ic} s={34} />Troca em 7 dias</div>
              </div>
            </div>
            <div className="himg"><div className="arch" /><img src="/opt-hero.webp" alt={`Cliente da ${brand} usando óculos novos`} /><span className="script">Visão clara,<br />estilo melhor</span></div>
          </div>
        </section>
      </div>

      <section className="sec" id="colecao"><div className="wrap">
        <div className="center">
          <span className="kick">Nossa coleção</span>
          <h2 style={{ marginTop: 12 }}>Encontre sua <em>armação perfeita</em></h2>
          <p className="sub">Do clássico ao moderno, temos o par ideal pra cada estilo e cada grau.</p>
        </div>
        <div className="grid4">
          {FRAMES.map((f) => (
            <div className="card" key={f.n} onClick={start} role="button" tabIndex={0}>
              <img src={f.img} alt={f.n} loading="lazy" />
              <div className="lb"><span><b>{f.n}</b><small>{f.d}</small><small className="pr2">{f.p}</small></span><span className="go" aria-hidden>→</span></div>
            </div>
          ))}
        </div>
      </div></section>

      <section className="sec" id="sobre" style={{ paddingTop: 6, background: CR }}><div className="wrap">
        <div className="split">
          <div className="bigimg"><img src="/opt-store.webp" alt={`Interior da loja ${brand}`} loading="lazy" /><span className="tag">Feita pra durar</span></div>
          <div>
            <span className="kick">Sobre a {brand}</span>
            <h2 style={{ margin: "12px 0 0" }}>Mais que <em>óculos</em></h2>
            <p className="sub" style={{ marginBottom: 0 }}>A gente acredita que óculos bom é o que você esquece que está usando: leve, certeiro e com a sua cara.</p>
            <div className="plist">
              {PERKS.map((p) => (
                <div className="pi" key={p.t}><span className="pk"><Ic d={p.ic} s={22} c={OL} /></span><div><b>{p.t}</b><p>{p.d}</p></div></div>
              ))}
            </div>
            <button type="button" className="btn" style={{ marginTop: 30 }} onClick={start}>Agendar exame <span aria-hidden>→</span></button>
          </div>
        </div>
      </div></section>

      <section className="sec" id="avaliacoes"><div className="wrap">
        <div className="center">
          <span className="kick">Gente de verdade</span>
          <h2 style={{ marginTop: 12 }}>O que nossos <em>clientes dizem</em></h2>
        </div>
        <div className="revs">
          {REVIEWS.map((r) => (
            <div className="rev" key={r.n}>
              <div className="hd"><img src={r.img} alt={r.n} loading="lazy" /><div><b>{r.n}</b><span className="st">★★★★★</span></div></div>
              <p>“{r.q}”</p>
            </div>
          ))}
        </div>
      </div></section>

      <div className="wrap"><div className="band">
        <img src="/opt-exam.webp" alt="Equipamento de exame de vista" loading="lazy" />
        <div className="in">
          <span className="script2">Sua próxima lente</span>
          <h3>Seu próximo par está<br />a uma visita de distância</h3>
          <button type="button" className="btn" onClick={start}>Agendar visita <span aria-hidden>→</span></button>
        </div>
      </div></div>

      <footer id="contato"><div className="wrap">
        <div className="fr">
          <div className="logo"><Ic d={GLASS} s={26} c="#f6f1e9" />{brand}</div>
          <nav><a onClick={() => go("top")}>Início</a><a onClick={() => go("colecao")}>Coleção</a><a onClick={() => go("sobre")}>Sobre</a><a onClick={() => go("avaliacoes")}>Avaliações</a></nav>
          <div className="ct">Av. Beira Mar, 900, Meireles, {city}<br />Seg a sáb, 9h às 19h<br />Instagram @{brand.normalize("NFD").toLowerCase().replace(/[^a-z]+/g, "")}<br /><a href={`https://wa.me/${num}`} target="_blank" rel="noreferrer">Falar no WhatsApp</a></div>
        </div>
      </div></footer>

      {sc && <a className="wa" href={`https://wa.me/${num}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 32 32" fill="#fff"><path d="M16 3a13 13 0 0 0-11 19.800L3 29l6.400-1.900A13 13 0 1 0 16 3zm0 2.400a10.600 10.600 0 1 1-5.400 19.700l-.4-.2-3.800 1.100 1.100-3.700-.3-.4A10.600 10.600 0 0 1 16 5.400zm-4 5.300c-.3 0-.7.100-1 .5-.4.400-1.300 1.300-1.300 3.100s1.300 3.600 1.500 3.800c.2.300 2.600 4.100 6.400 5.600 3.100 1.200 3.700 1 4.400.9.700-.1 2.200-.9 2.500-1.800.3-.9.3-1.600.2-1.800-.1-.2-.4-.3-.8-.5s-2.200-1.100-2.600-1.200c-.3-.1-.6-.2-.8.200-.3.400-.9 1.200-1.100 1.400-.2.300-.4.300-.8.100-.4-.2-1.600-.6-3-1.900-1.100-1-1.900-2.300-2.100-2.700-.2-.4 0-.6.200-.8l.6-.7c.2-.2.200-.4.400-.6.100-.3.100-.5 0-.7l-1.200-3c-.3-.7-.6-.7-.9-.7z" /></svg></a>}

      {open && (
        <div className="ov" onClick={(e) => e.target === e.currentTarget && setOpen(false)} role="dialog" aria-modal="true" aria-label="Agendar visita">
          <div className="md">
            <button type="button" className="x" aria-label="Fechar" onClick={() => setOpen(false)}>×</button>
            <span className="tagp">Passo {step} de 3</span>
            <h3>{["O que você procura?", "Dia e horário", "Confirme sua visita"][step - 1]}</h3>
            <div className="bars">{[1, 2, 3].map((n) => <i key={n} className={n <= step ? "on" : ""} />)}</div>
            {step === 1 && (<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {["Óculos de grau", "Óculos de sol", "Lentes de contato", "Exame de vista"].map((k) => (<button type="button" key={k} className={`chip${kind === k ? " on" : ""}`} onClick={() => setKind(k)}>{k}</button>))}
            </div>)}
            {step === 2 && (<div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 14 }}>
                {days.map((d, i) => (<button type="button" key={d.label} className={`chip${day === i ? " on" : ""}`} onClick={() => setDay(i)}><small style={{ display: "block", textTransform: "uppercase", fontSize: 11, letterSpacing: 1 }}>{d.dow}</small><b style={{ fontSize: 17 }}>{d.d}</b></button>))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                {TIMES.map((x) => (<button type="button" key={x} className={`chip${time === x ? " on" : ""}`} onClick={() => setTime(x)}>{x}</button>))}
              </div>
            </div>)}
            {step === 3 && (<div>
              <div className="sum">
                <b>{kind}</b><br />{days[day]?.label} às {time}<br /><span style={{ color: MU, fontSize: 13.5 }}>{brand}, {city}</span>
              </div>
              <input className="inp" value={cust} onChange={(e) => setCust(e.target.value)} placeholder="Seu nome" aria-label="Seu nome" />
            </div>)}
            <div style={{ display: "flex", gap: 10, marginTop: 22, justifyContent: "space-between" }}>
              {step > 1 ? <button type="button" className="btn o" onClick={() => setStep(step - 1)}>Voltar</button> : <span />}
              {step < 3 ? (
                <button type="button" className="btn" disabled={step === 2 && !time} style={{ opacity: step === 2 && !time ? 0.4 : 1 }} onClick={() => setStep(step + 1)}>Continuar</button>
              ) : (
                <a className="btn" href={wa} target="_blank" rel="noreferrer">Confirmar no WhatsApp</a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
