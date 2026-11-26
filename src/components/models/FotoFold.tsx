import { useEffect, useState } from "react";

/** Fotografa de casamento nova, construida do zero a partir de um pin editorial bordo e creme ("Alora Rachelle"): logo centrada em caixa-alta espacada, titulo em serifa fina com a ultima linha em italico, assinatura em script, faixa bordo com frase em caixa-alta. Sem foto: as imagens sao cenas monocromaticas desenhadas em SVG com grao. Consulta de data que fecha no WhatsApp. */
const OX = "#4a0f14", OX2 = "#5d1a1f", CR = "#efeae1", CR2 = "#e4ddd0", INK = "#1d1315", MU = "#5f5052";
const PKG = [
  { t: "O Casamento", d: "Cobertura do dia inteiro, da arrumação à pista. Entrega em 45 dias, galeria online e álbum.", n: "A partir de R$ 6.800" },
  { t: "Ensaio e Pré-wedding", d: "Meio período, em locação que combina com vocês. Ótimo para save the date e convites.", n: "A partir de R$ 1.900" },
  { t: "Casamento Íntimo", d: "Até 30 convidados, cerimônia e jantar. Cobertura de 5 horas, direto ao ponto.", n: "A partir de R$ 3.900" },
];
const LOGOS = [{ t: "Noivas & Co.", f: "serif", w: 600 }, { t: "REVISTA CASAR", f: "sans", w: 700 }, { t: "Dia D", f: "script", w: 400 }, { t: "CERIMÔNIA", f: "serif", w: 500 }, { t: "Noiva Moderna", f: "script", w: 400 }];

function Grain() {
  return <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, mixBlendMode: "overlay", opacity: 0.55, pointerEvents: "none" }} aria-hidden><filter id="g"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch" /><feColorMatrix values="0 0 0 0 .5  0 0 0 0 .5  0 0 0 0 .5  0 0 0 .9 0" /></filter><rect width="100%" height="100%" filter="url(#g)" /></svg>;
}

function Scene({ k }: { k: 1 | 2 | 3 | 4 }) {
  const common = { viewBox: "0 0 200 260", preserveAspectRatio: "xMidYMid slice" as const, style: { position: "absolute" as const, inset: 0, width: "100%", height: "100%" } };
  if (k === 1)
    return (
      <svg {...common} aria-hidden>
        <defs><linearGradient id="s1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2b2b2b" /><stop offset="1" stopColor="#8c8c8c" /></linearGradient></defs>
        <rect width="200" height="260" fill="url(#s1)" />
        <g stroke="#111" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity=".85"><path d="M0 40 Q40 50 70 20 M30 46 Q50 70 90 64 M10 80 Q50 90 80 120 M60 30 L96 6" /></g>
        <path d="M120 70 Q150 110 140 190 L132 260 L40 260 L72 190 Q90 130 100 90Z" fill="#f3f1ec" opacity=".92" />
        <path d="M100 82 Q70 130 56 250 L46 258" stroke="#fff" strokeWidth="14" fill="none" opacity=".55" strokeLinecap="round" />
        <circle cx="112" cy="70" r="12" fill="#cfc7bd" />
        <path d="M104 62 Q86 70 70 130 Q64 190 52 258" fill="none" stroke="#fff" strokeWidth="3" opacity=".7" />
      </svg>
    );
  if (k === 2)
    return (
      <svg {...common} aria-hidden>
        <defs><linearGradient id="s2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9aa0a8" /><stop offset="1" stopColor="#30343b" /></linearGradient></defs>
        <rect width="200" height="260" fill="url(#s2)" />
        {Array.from({ length: 6 }, (_, r) => Array.from({ length: 5 }, (_, c) => <rect key={`${r}-${c}`} x={10 + c * 38} y={8 + r * 30} width="30" height="22" fill="#c5cad0" opacity={0.25 + ((r * 5 + c) % 4) * 0.12} />))}
        <path d="M60 260 L66 150 Q80 120 100 124 Q124 120 136 150 L142 260Z" fill="#1b1618" />
        <circle cx="100" cy="104" r="17" fill="#1b1618" />
        
      </svg>
    );
  if (k === 3)
    return (
      <svg {...common} aria-hidden>
        <rect width="200" height="260" fill="#241619" />
        <circle cx="100" cy="90" r="70" fill="#3a2125" />
        <path d="M120 70 Q110 140 130 260 L70 260 Q80 150 70 96 Q100 56 120 70Z" fill="#e8dfd2" />
        <circle cx="98" cy="66" r="15" fill="#d8b8a6" />
        <path d="M82 60 Q86 40 108 44 Q104 54 100 62Z" fill="#1a0f11" />
        <rect x="104" y="150" width="42" height="110" fill="#120c0d" />
      </svg>
    );
  return (
    <svg {...common} aria-hidden>
      <rect width="200" height="260" fill="#2c1114" />
      <g transform="rotate(-14 100 130)"><rect x="52" y="60" width="96" height="136" rx="6" fill="#f2ece2" /><path d="M100 138 q-18 -16 -20 -30 a11 11 0 0 1 20 -8 a11 11 0 0 1 20 8 q-2 14 -20 30z" fill="#b1313a" /></g>
      <path d="M130 260 Q150 200 130 170 L170 190 Q190 230 180 260Z" fill="#c7a089" />
    </svg>
  );
}

const PH: Record<number, { src: string; alt: string; pos: string }> = {
  1: { src: "/nina-noiva.webp", alt: "Noiva de véu longo em rua de paralelepípedo, em preto e branco", pos: "50% 30%" },
  2: { src: "/nina-noivo.webp", alt: "Noivo de casaco escuro olhando a rua, em preto e branco", pos: "55% 25%" },
  3: { src: "/nina-retrato.webp", alt: "Retrato da fotógrafa com a câmera, em luz quente", pos: "50% 30%" },
  4: { src: "/nina-maos.webp", alt: "Mãos do casal com alianças sobre o buquê bordô", pos: "50% 50%" },
};

function Frame({ k, style }: { k: 1 | 2 | 3 | 4; style?: React.CSSProperties }) {
  const p = PH[k]!;
  return <div style={{ position: "relative", overflow: "hidden", background: "#222", ...style }}><img src={p.src} alt={p.alt} loading={k <= 2 ? "eager" : "lazy"} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: p.pos }} /></div>;
}

export function FotoFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Nina Albuquerque";
  const first = brand.split(" ")[0] ?? brand;
  const city = client?.city?.trim() || "Belo Horizonte";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [pk, setPk] = useState(0);
  const [data, setData] = useState("");
  const [local, setLocal] = useState("");
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const base = `https://wa.me/${num}`;
  const wa = `${base}?text=${encodeURIComponent(`Oi, ${first}! Vi o seu trabalho e quero saber se você está livre${data ? ` em ${data.split("-").reverse().join("/")}` : " na nossa data"}${local.trim() ? `, em ${local.trim()}` : ""}. Interesse: ${PKG[pk]?.t.toLowerCase()}.`)}`;

  return (
    <div className="ft2" style={{ fontFamily: "Jost, system-ui, sans-serif", color: INK, background: CR, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500;600&family=Mrs+Saint+Delafield&display=swap');
        .ft2 *{box-sizing:border-box}.ft2 a,.ft2 button,.ft2 input,.ft2 select{font-family:inherit}
        .ft2 h1,.ft2 h2,.ft2 h3{font-family:'Cormorant Garamond',Georgia,serif!important;font-weight:300!important;letter-spacing:0!important}
        .ft2 .sc{font-family:'Mrs Saint Delafield',cursive}
        .ft2 .hero{position:relative;background:#1a1a1a;color:#fff;min-height:680px;overflow:hidden}
        .ft2 .hero .ph{position:absolute;top:0;bottom:0;width:50%}.ft2 .hero .ph.l{left:0}.ft2 .hero .ph.r{right:0}
        .ft2 .hero:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,8,8,.62),rgba(10,8,8,.5))}
        .ft2 .hero>*{position:relative;z-index:2}
        .ft2 .nav{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;height:76px;max-width:1160px;margin:0 auto;padding:0 28px}
        .ft2 .logo{text-shadow:0 1px 10px #000;font-family:'Cormorant Garamond',serif;font-size:15px;letter-spacing:.34em;text-transform:uppercase;font-weight:400;padding-left:.34em;text-align:center}
        .ft2 .nl{display:flex;gap:26px}.ft2 .nl a{cursor:pointer;font-size:12px;text-shadow:0 1px 8px #000;letter-spacing:.2em;text-transform:uppercase;font-weight:500}
        .ft2 .nr{justify-self:end;display:flex;gap:22px;align-items:center}
        .ft2 .burger{display:none;background:none;border:0;color:inherit;font-size:26px;cursor:pointer}
        .ft2 .hero h1{text-align:center;text-transform:uppercase;font-size:clamp(34px,4.9vw,66px);line-height:1.1;margin:110px auto 0;max-width:820px;padding:0 20px}
        .ft2 .hero h1{text-shadow:0 2px 18px rgba(0,0,0,.55);font-weight:400}.ft2 .hero h1 em{display:block;text-transform:none;font-style:italic;font-weight:400;font-size:1.08em}
        .ft2 .hero p.s{text-align:center;max-width:480px;margin:26px auto 0;font-size:16px;line-height:1.7;font-weight:400;padding:0 20px}
        .ft2 .btn{display:inline-block;background:${CR};color:${OX};text-decoration:none;font-weight:600;font-size:11px;letter-spacing:.2em;text-transform:uppercase;padding:15px 28px;border:0;cursor:pointer}
        .ft2 .btn.dk{background:${OX};color:#fff}.ft2 .btn.dk:hover{background:#310a0d}
        .ft2 .ctr{text-align:center;margin-top:28px}
        .ft2 .logos{display:flex;align-items:center;gap:44px;padding:30px 28px;max-width:1160px;margin:0 auto;border-bottom:1px solid ${CR2}}
        .ft2 .logos small{font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:${MU};border-right:1px solid ${MU};padding-right:26px;line-height:1.5}
        .ft2 .logos div{display:flex;flex:1;justify-content:space-between;gap:20px;flex-wrap:wrap;align-items:center}
        .ft2 .logos span{font-size:22px;color:#3a3032}
        .ft2 .about{max-width:1000px;margin:0 auto;padding:90px 28px 80px;display:grid;grid-template-columns:420px 1fr;gap:70px;align-items:center}
        .ft2 .col{position:relative;height:440px}
        .ft2 .about .sig{font-size:60px;line-height:.9;color:${OX};margin:8px 0 14px}
        .ft2 .about small{font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:${MU}}
        .ft2 .about p{font-size:16px;line-height:1.75;margin:0 0 14px;font-weight:400;color:#2a1f21}
        .ft2 .band{background:${OX};color:#f4eee4;padding:110px 28px 130px;text-align:center;position:relative;overflow:hidden}
        .ft2 .band h2{text-transform:uppercase;font-size:clamp(34px,5vw,66px);line-height:1.12;margin:0 auto;max-width:780px}
        .ft2 .band .note{font-size:46px;color:#d8b9a8;position:absolute;left:11%;top:56px;transform:rotate(-8deg);line-height:1}
        .ft2 .band p{max-width:520px;margin:26px auto 0;font-size:15px;line-height:1.7;font-weight:300}
        .ft2 .band .fa{position:absolute;right:8%;top:50px;width:90px;height:116px;transform:rotate(7deg);border:3px solid ${OX}}
        .ft2 .band .fb{position:absolute;left:7%;bottom:40px;width:104px;height:130px;transform:rotate(-5deg);border:3px solid ${OX}}
        .ft2 .pk{display:grid;grid-template-columns:repeat(3,1fr)}
        .ft2 .pk button{border:0;text-align:left;cursor:pointer;padding:54px 36px 40px;min-height:380px;display:flex;flex-direction:column;justify-content:space-between;color:#fff}
        .ft2 .pk .p0{background:#1c1b1b}.ft2 .pk .p1{background:#3b0c10}.ft2 .pk .p2{background:#6c2a2e}
        .ft2 .pk h3{font-size:40px;text-transform:uppercase;line-height:1.05;margin:0 0 16px}
        .ft2 .pk p{font-size:15px;line-height:1.65;font-weight:300;margin:0;max-width:300px}
        .ft2 .pk .pr{font-size:12px;letter-spacing:.2em;text-transform:uppercase;font-weight:500;border-bottom:1px solid rgba(255,255,255,.6);padding-bottom:6px;align-self:flex-start}
        .ft2 .pk button.on{outline:3px solid ${CR};outline-offset:-3px}
        .ft2 .ask{max-width:900px;margin:0 auto;padding:100px 28px 70px;text-align:center}
        .ft2 .ask h2{font-size:clamp(32px,4.4vw,54px);line-height:1.15;margin:0;text-transform:uppercase}
        .ft2 .ask h2 em{text-transform:none;font-style:italic}
        .ft2 .fm{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:40px;text-align:left}
        .ft2 .fm label{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:${MU};display:block;margin-bottom:8px;font-weight:500}
        .ft2 .fm input{width:100%;height:52px;border:1px solid ${INK};background:transparent;padding:0 14px;font-size:16px;color:${INK};border-radius:0}
        .ft2 .fm .full{grid-column:span 2}
        .ft2 .sel{display:flex;gap:10px;flex-wrap:wrap}
        .ft2 .sel button{border:1px solid ${INK};background:transparent;padding:12px 18px;font-size:13px;cursor:pointer;color:${INK};font-weight:500}
        .ft2 .sel button.on{background:${OX};border-color:${OX};color:#fff}
        .ft2 .info{max-width:900px;margin:0 auto;padding:0 28px 50px;display:grid;grid-template-columns:repeat(3,1fr);gap:20px;text-align:center}
        .ft2 .info b{display:block;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:${OX};margin-bottom:8px;font-weight:600}
        .ft2 .info span{font-size:16px;line-height:1.6}
        .ft2 footer{background:${OX};color:#f1e9df;padding:46px 28px;text-align:center}
        .ft2 footer nav{display:flex;gap:26px;justify-content:center;margin:18px 0}.ft2 footer a{cursor:pointer;font-size:11px;letter-spacing:.2em;text-transform:uppercase;font-weight:500}
        .ft2 footer span{font-size:13px;color:#d9ccc2}
        .ft2 .wa{position:fixed;right:20px;bottom:20px;width:58px;height:58px;border-radius:50%;background:#25d366;display:grid;place-items:center;box-shadow:0 8px 22px rgba(0,0,0,.35);z-index:20}
        .ft2 .mob{display:none}
        @media(max-width:860px){
          .ft2 .nav{grid-template-columns:1fr auto;padding:0 18px}.ft2 .nl,.ft2 .nr .btn{display:none}.ft2 .burger{display:block}.ft2 .logo{text-align:left;padding:0;font-size:13px}.ft2 .nr{justify-self:end}
          .ft2 .nav>.nl{display:none}
          .ft2 .mob{display:block;background:#fff;color:${INK};margin:0 16px;position:relative;z-index:6}.ft2 .mob a{display:block;padding:15px 20px;cursor:pointer;border-top:1px solid ${CR2};font-size:12px;letter-spacing:.18em;text-transform:uppercase;font-weight:500}.ft2 .mob a:first-child{border:0}
          .ft2 .hero p.s{text-shadow:0 1px 10px #000,0 0 3px #000;font-weight:400}.ft2 .hero{min-height:600px}.ft2 .hero:after{background:rgba(10,8,8,.68)}.ft2 .hero h1{margin-top:50px}
          .ft2 .logos{flex-direction:column;gap:14px;padding:24px 18px}.ft2 .logos small{border:0;padding:0}
          .ft2 .about{grid-template-columns:1fr;gap:34px;padding:60px 20px}.ft2 .col{height:380px;max-width:360px;margin:0 auto;width:100%}
          .ft2 .band{padding:90px 20px 100px}.ft2 .band .fa,.ft2 .band .fb{display:none}.ft2 .band .note{left:6%;top:30px;font-size:36px}
          .ft2 .pk{grid-template-columns:1fr}.ft2 .pk button{min-height:260px}
          .ft2 .fm{grid-template-columns:1fr}.ft2 .fm .full{grid-column:span 1}.ft2 .info{grid-template-columns:1fr}
        }
      `}</style>

      <section className="hero" id="top">
        <Frame k={1} style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "50%" }} />
        <Frame k={2} style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "50%" }} />
        <header className="nav">
          <div className="nl"><a onClick={() => go("sobre")}>Sobre</a><a onClick={() => go("pacotes")}>Pacotes</a></div>
          <div className="logo">{brand}</div>
          <div className="nr"><a className="btn" onClick={() => go("data")}>Consultar data</a><button className="burger" onClick={() => setMenu((v) => !v)} aria-label="Menu">{menu ? "×" : "≡"}</button></div>
        </header>
        {menu && <div className="mob"><a onClick={() => go("sobre")}>Sobre</a><a onClick={() => go("pacotes")}>Pacotes</a><a onClick={() => go("data")}>Consultar data</a></div>}
        <h1>É hora de guardar<br />o seu dia <em>do jeito que ele foi</em></h1>
        <p className="s">Fotografia de casamento com luz natural, sem poses duras. Eu acompanho vocês do primeiro café ao último abraço e entrego histórias, não só fotos.</p>
        <div className="ctr"><button className="btn" onClick={() => go("data")}>Ver minha data</button></div>
      </section>

      <div className="logos">
        <small>Publicada<br />em</small>
        <div>{LOGOS.map((l) => <span key={l.t} className={l.f === "script" ? "sc" : ""} style={{ fontFamily: l.f === "serif" ? "'Cormorant Garamond',serif" : l.f === "sans" ? "Jost,sans-serif" : undefined, fontWeight: l.w, letterSpacing: l.f === "sans" ? ".14em" : 0, fontSize: l.f === "script" ? 30 : l.f === "sans" ? 15 : 24 }}>{l.t}</span>)}</div>
      </div>

      <section className="about" id="sobre">
        <div className="col">
          <Frame k={3} style={{ position: "absolute", left: 0, top: 0, width: 280, height: 380 }} />
          <Frame k={4} style={{ position: "absolute", left: 230, top: 250, width: 130, height: 170, border: `5px solid ${CR}`, boxShadow: "0 10px 30px rgba(0,0,0,.3)" }} />
        </div>
        <div>
          <small>Oi, eu sou a</small>
          <div className="sc sig">{first} Albuquerque</div>
          <p>Fotografo casamentos há 11 anos, hoje só entre 20 e 25 por temporada, para conseguir estar inteira em cada um.</p>
          <p>Meu jeito é ficar perto sem aparecer. Quem casa comigo costuma dizer que esqueceu que tinha fotógrafa, e adorou ver o resultado depois.</p>
          <div style={{ marginTop: 22 }}><a className="btn dk" onClick={() => go("pacotes")}>Conhecer os pacotes</a></div>
        </div>
      </section>

      <section className="band">
        <div className="sc note">memórias que ficam</div>
        <Frame k={4} style={{ position: "absolute", right: "8%", top: 50, width: 90, height: 116, transform: "rotate(7deg)", border: `3px solid ${OX}` }} />
        <Frame k={3} style={{ position: "absolute", left: "7%", bottom: 40, width: 104, height: 130, transform: "rotate(-5deg)", border: `3px solid ${OX}` }} />
        <h2>Casais que querem <br />viver o dia <br />e <em style={{ textTransform: "none", fontStyle: "italic" }}>rever tudo depois</em></h2>
        <p>Sem fila de pose, sem cronograma apertado. Um dia contado com calma, em cor e em preto e branco.</p>
      </section>

      <section className="pk" id="pacotes">
        {PKG.map((p, i) => (
          <button key={p.t} className={`p${i}${pk === i ? " on" : ""}`} onClick={() => { setPk(i); go("data"); }}>
            <div><h3>{p.t}</h3><p>{p.d}</p></div>
            <span className="pr">{p.n}</span>
          </button>
        ))}
      </section>

      <section className="ask" id="data">
        <h2>Vamos ver se eu <em>estou livre</em> na sua data</h2>
        <div className="fm">
          <div className="full"><label>Pacote</label><div className="sel">{PKG.map((p, i) => <button key={p.t} className={pk === i ? "on" : ""} onClick={() => setPk(i)}>{p.t}</button>)}</div></div>
          <div><label htmlFor="ft-d">Data do casamento</label><input id="ft-d" type="date" value={data} onChange={(e) => setData(e.target.value)} /></div>
          <div><label htmlFor="ft-l">Cidade ou local</label><input id="ft-l" value={local} onChange={(e) => setLocal(e.target.value)} placeholder="Ex.: Nova Lima" /></div>
        </div>
        <div className="ctr" style={{ marginTop: 34 }}><a className="btn dk" href={wa} target="_blank" rel="noreferrer">Perguntar no WhatsApp</a></div>
      </section>

      <div className="info">
        <div><b>Atendo em</b><span>{city} e região<br />Destinos pelo Brasil</span></div>
        <div><b>Agenda</b><span>Poucas datas por temporada<br />Resposta em até 24 horas</span></div>
        <div><b>Entrega</b><span>Galeria online em 45 dias<br />Álbum artesanal opcional</span></div>
      </div>

      <footer>
        <div className="logo" style={{ textAlign: "center" }}>{brand}</div>
        <nav><a onClick={() => go("sobre")}>Sobre</a><a onClick={() => go("pacotes")}>Pacotes</a><a onClick={() => go("data")}>Consultar data</a></nav>
        <span>© {new Date().getFullYear()} {brand}. Todos os direitos reservados.</span>
      </footer>

      {sc && <a className="wa" href={base} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 32 32" fill="#fff"><path d="M16 3a13 13 0 0 0-11 19.800L3 29l6.400-1.900A13 13 0 1 0 16 3zm0 2.400a10.600 10.600 0 1 1-5.400 19.700l-.4-.2-3.800 1.100 1.100-3.700-.3-.4A10.600 10.600 0 0 1 16 5.400zm-4 5.300c-.3 0-.7.100-1 .5-.4.400-1.300 1.300-1.300 3.100s1.300 3.600 1.500 3.900c.2.200 2.600 4.100 6.400 5.600 3.200 1.200 3.800 1 4.500.9.700-.1 2.200-.9 2.500-1.800.3-.9.300-1.600.2-1.800-.1-.2-.3-.3-.7-.5l-2.300-1.100c-.3-.1-.5-.2-.8.200l-1 1.200c-.2.300-.4.300-.8.100-.4-.2-1.500-.6-2.900-1.800-1.100-1-1.800-2.200-2-2.500-.2-.4 0-.6.200-.8l.6-.7c.2-.2.200-.4.400-.6.100-.3.100-.5 0-.7l-1-2.400c-.3-.6-.5-.5-.8-.5z" /></svg></a>}
    </div>
  );
}
