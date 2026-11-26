import { useState } from "react";

/** Loja de drones construida a partir de um pin: hero escuro ciano com drone, faixa de 4 diferenciais, missoes em cards inclinados, acessorios, sistema de voo explodido e faixa de montagem. */
const CY = "#2ee6f2", BK = "#070d12", PN = "#0d161d", LN = "rgba(46,230,242,.22)", MUT = "#9fb2bb";
const FEAT = [
  ["Desempenho\nprofissional", "M12 3v4M12 17v4M3 12h4M17 12h4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"],
  ["Upgrades\nmodulares", "M12 3l9 5-9 5-9-5zM3 13l9 5 9-5M3 17l9 5 9-5"],
  ["Mais tempo\nde voo", "M13 2L5 14h6l-1 8 8-12h-6z"],
  ["Compatível com\ncriadores", "M3 19l6-10 4 6 3-4 5 8zM15 6h.01"],
];
const MISS = [
  { t: "Filmagem\ncinematográfica", img: "/drone-m1.webp", ic: "M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4M9 12h6M12 9v6" },
  { t: "Exploração\ne mapeamento", img: "/drone-m2.webp", ic: "M12 22s7-6.500 7-12a7 7 0 0 0-14 0c0 5.500 7 12 7 12zM12 12.500a2.500 2.500 0 1 0 0-5 2.500 2.500 0 0 0 0 5z" },
  { t: "Levantamento\naéreo", img: "/drone-m3.webp", ic: "M12 3l9 5-9 5-9-5zM3 13l9 5 9-5" },
  { t: "Conteúdo\ncriativo", img: "/drone-m4.webp", ic: "M8 5l11 7-11 7zM3 4h.01" },
];
const ACC = [
  { n: "FlightPack Pro", d: "Bateria inteligente de alta capacidade", p: "R$ 649", img: "/drone-a1.webp" },
  { n: "AeroBlades X", d: "Hélices de baixo ruído e alto desempenho", p: "R$ 249", img: "/drone-a2.webp" },
  { n: "SkyFilter Set", d: "Filtros de precisão ND / CPL / UV", p: "R$ 399", img: "/drone-a3.webp" },
  { n: "Mission Case", d: "Maleta rígida resistente ao tempo", p: "R$ 749", img: "/drone-a4.webp" },
];
const MOD = ["Módulo de propulsão", "Núcleo de controle", "Unidade de imagem", "Gimbal de estabilização", "Sistema de energia"];
const Arr = ({ c = "currentColor" }: { c?: string }) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.400" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
const Ico = ({ d, s = 22, c = "#fff" }: { d: string; s?: number; c?: string }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.600" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>;

export function DroneFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = (client?.name?.trim() || "Aerolume").toUpperCase();
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [menu, setMenu] = useState(false);
  const wa = (what?: string) => `https://wa.me/${num}?text=${encodeURIComponent(`Olá! Quero ${what ?? "montar meu kit"} na ${brand}.`)}`;
  return (
    <div className="dr0" style={{ fontFamily: "Rajdhani, system-ui, sans-serif", background: BK, color: "#fff", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Exo+2:ital,wght@1,700;1,800&display=swap');
        .dr0 *{box-sizing:border-box}.dr0 a,.dr0 button{font-family:inherit;text-decoration:none;color:inherit}
        .dr0 h1,.dr0 h2,.dr0 h3{font-family:'Exo 2',system-ui,sans-serif !important;font-style:italic !important;font-weight:800 !important;text-transform:uppercase;margin:0;line-height:.98}
        .dr0 .wrap{max-width:1200px;margin:0 auto;padding:0 32px}
        .dr0 .hero{position:relative;min-height:600px;display:flex;flex-direction:column;background:radial-gradient(60% 70% at 70% 40%,#16303a,#070d12)}
        .dr0 .hero img.bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:78% center}
        .dr0 .hero:before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(7,13,18,.9) 0%,rgba(7,13,18,.5) 42%,rgba(7,13,18,0) 68%)}
        .dr0 .nav{position:relative;z-index:3;height:70px;border-bottom:1px solid rgba(255,255,255,.06)}.dr0 .nav .in{display:flex;align-items:center;height:100%}
        .dr0 .logo{display:flex;align-items:center;gap:10px;font-weight:700;font-size:19px;letter-spacing:.14em}
        .dr0 .links{display:flex;gap:30px;margin:0 auto;font-size:13.500px;font-weight:600;letter-spacing:.04em}
        .dr0 .btn{display:inline-flex;align-items:center;gap:10px;background:${CY};color:#041014 !important;font-weight:700;font-size:13.500px;letter-spacing:.12em;text-transform:uppercase;padding:14px 26px;clip-path:polygon(0 0,100% 0,92% 100%,0 100%)}
        .dr0 .burger{display:none;margin-left:auto;background:none;border:0;color:#fff;width:44px;height:44px}
        .dr0 .mm{position:absolute;top:66px;left:14px;right:14px;z-index:20;background:#0f1b22;border:1px solid ${LN};padding:8px}.dr0 .mm a{display:block;padding:14px;font-weight:600}
        .dr0 .hc{position:relative;z-index:3;flex:1;display:flex;flex-direction:column;justify-content:center;padding:30px 0 60px}
        .dr0 .eb{font-size:12px;letter-spacing:.3em;text-transform:uppercase;color:#dbe7ea;line-height:1.5}
        .dr0 h1{font-size:68px;margin:22px 0 20px}.dr0 .sub{font-size:13.500px;letter-spacing:.26em;text-transform:uppercase;line-height:1.7;color:#dbe7ea;max-width:340px;margin:0 0 28px}
        .dr0 .side{position:absolute;z-index:3;right:32px;top:230px;display:flex;flex-direction:column;gap:6px;font-size:11px;letter-spacing:.18em;color:#cfe3e6}
        .dr0 .feat{background:#091117;border-top:1px solid ${LN};border-bottom:1px solid ${LN}}.dr0 .feat .wrap{display:grid;grid-template-columns:repeat(4,1fr);padding:22px 32px}
        .dr0 .feat div{display:flex;align-items:center;gap:16px;border-left:1px solid rgba(255,255,255,.1);padding-left:24px;font-size:11.500px;letter-spacing:.18em;text-transform:uppercase;line-height:1.5;white-space:pre-line}.dr0 .feat div:first-child{border:0;padding-left:0}
        .dr0 .mis{display:grid;grid-template-columns:.9fr 3.1fr;background:#0a1319}.dr0 .mis .l{padding:44px 30px 44px 32px;display:flex;flex-direction:column;justify-content:center}
        .dr0 .mis h2{font-size:34px}.dr0 .mis .l i{display:block;width:44px;height:3px;background:${CY};margin-top:22px}.dr0 .mis .eb{font-size:10.500px;margin-bottom:14px;letter-spacing:.22em}
        .dr0 .ms{display:grid;grid-template-columns:repeat(4,1fr);gap:0;padding:0}.dr0 .m{position:relative;min-height:220px;overflow:hidden;clip-path:polygon(9% 0,100% 0,91% 100%,0 100%);margin-left:-22px;background:#16252d}
        .dr0 .m img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.dr0 .m:after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(7,13,18,.85),rgba(7,13,18,0) 55%)}
        .dr0 .m span{position:absolute;z-index:2;left:26%;bottom:16px;font-size:11px;letter-spacing:.2em;text-transform:uppercase;line-height:1.5;white-space:pre-line}.dr0 .m svg{position:absolute;z-index:2;left:26%;bottom:62px}
        .dr0 .acc{padding:36px 0 40px;background:#080f14}.dr0 .ah{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;font-size:13px;letter-spacing:.2em;text-transform:uppercase;font-weight:700}.dr0 .ah a{color:${CY};font-size:11.500px}
        .dr0 .ag{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.dr0 .ac{background:${PN};border:1px solid rgba(255,255,255,.07);border-radius:4px;position:relative;overflow:hidden}
        .dr0 .ac img{width:100%;aspect-ratio:4/3;object-fit:cover;display:block;background:#101b23}.dr0 .ac .b{padding:12px 14px 16px}.dr0 .ac b{display:block;font-size:15px;font-weight:700}.dr0 .ac small{display:block;font-size:11.500px;color:${MUT};margin:2px 0 8px}.dr0 .ac em{font-style:normal;font-weight:600;font-size:15px}
        .dr0 .ac i{position:absolute;right:0;bottom:0;width:50px;height:34px;background:${CY};display:grid;place-items:center;clip-path:polygon(28% 0,100% 0,100% 100%,0 100%)}
        .dr0 .sys{display:grid;grid-template-columns:.8fr 2fr;background:#091016;border-top:1px solid ${LN};border-bottom:1px solid ${LN};align-items:center}
        .dr0 .sys .l{padding:38px 28px 38px 32px}.dr0 .sys h2{font-size:34px;margin-bottom:18px}.dr0 .sys i.bar{display:block;width:40px;height:3px;background:${CY};margin-bottom:22px}
        .dr0 .sys li{list-style:none;font-size:12px;letter-spacing:.18em;text-transform:uppercase;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.08);display:flex;gap:16px}.dr0 .sys li b{color:${CY};font-weight:600}
        .dr0 .sys img{width:100%;display:block;aspect-ratio:16/8;object-fit:cover;background:#0c161d}
        .dr0 .build{position:relative;min-height:220px;display:flex;align-items:center;justify-content:flex-end;background:#13252e;overflow:hidden}
        .dr0 .build img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:30% center}.dr0 .build:before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(270deg,rgba(7,13,18,.85) 0%,rgba(7,13,18,0) 62%)}
        .dr0 .build .t{position:relative;z-index:2;padding:0 60px 0 0;max-width:430px}.dr0 .build h2{font-size:44px}.dr0 .build p{font-size:13px;letter-spacing:.24em;text-transform:uppercase;margin:12px 0 22px}
        .dr0 .foot{padding:26px 0;background:#05090d;font-size:11.500px;letter-spacing:.14em;color:${MUT};text-transform:uppercase}.dr0 .foot .wrap{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
        @media(max-width:900px){
          .dr0 .wrap{padding:0 20px}.dr0 .links,.dr0 .nav .btn{display:none}.dr0 .burger{display:block}
          .dr0 .hero{min-height:auto}.dr0 .hero:before{background:linear-gradient(180deg,rgba(7,13,18,.4),rgba(7,13,18,.25) 40%,rgba(7,13,18,.92) 85%)}
          .dr0 h1{font-size:46px}.dr0 .hc{padding:210px 0 30px}.dr0 .side{display:none}
          .dr0 .feat .wrap{grid-template-columns:1fr 1fr;gap:20px;padding:20px}.dr0 .feat div{border:0;padding:0}
          .dr0 .mis{grid-template-columns:1fr}.dr0 .mis .l{padding:30px 20px 10px}.dr0 .ms{grid-template-columns:1fr 1fr;gap:10px;padding:0 20px 24px}.dr0 .m{margin:0;clip-path:none;min-height:170px}.dr0 .m span,.dr0 .m svg{left:14px}
          .dr0 .ag{grid-template-columns:1fr 1fr}.dr0 .sys{grid-template-columns:1fr}.dr0 .sys .l{padding:30px 20px 10px}
          .dr0 .build{justify-content:flex-start;min-height:300px;align-items:flex-end}.dr0 .build .t{padding:0 20px 28px}.dr0 .build h2{font-size:34px}
        }
      `}</style>
      <section className="hero">
        <img className="bg" src="/drone-hero.webp" alt="Drone preto com detalhes ciano em voo, de frente" />
        <div className="wrap" style={{ width: "100%" }}><div className="nav"><div className="in">
          <span className="logo"><svg width="30" height="26" viewBox="0 0 30 26" fill={CY}><path d="M15 1L29 25H22l-7-12-7 12H1z" /></svg>{brand}<sup style={{ fontSize: 8, marginTop: -8 }}>™</sup></span>
          <div className="links"><a href="#">Loja ⌄</a><a href="#sys">Sistemas</a><a href="#acc">Acessórios</a><a href={wa()}>Monte seu kit</a><a href={wa("suporte")}>Suporte</a></div>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}><Ico d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4" s={18} /><Ico d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c0-4 4-6 8-6s8 2 8 6" s={18} /><Ico d="M6 6h15l-2 9H8zM6 6L5 3H2" s={18} /></div>
          <button className="burger" aria-label="Menu" onClick={() => setMenu(!menu)} style={{ marginLeft: 12 }}><Ico d="M4 7h16M4 12h16M4 17h16" /></button>
        </div>{menu && <div className="mm"><a href="#sys" onClick={() => setMenu(false)}>Sistemas</a><a href="#acc" onClick={() => setMenu(false)}>Acessórios</a><a href={wa()}>Monte seu kit</a></div>}</div></div>
        <div className="wrap hc" style={{ width: "100%" }}>
          <span className="eb">Ecossistema de drones<br />de nova geração</span>
          <h1>Eleve<br />seu voo</h1>
          <p className="sub">Acessórios de precisão para uma perspectiva mais alta</p>
          <div><a className="btn" href="#sys" style={{ padding: "15px 34px" }}>Explorar o sistema <Arr /></a></div>
        </div>
        <div className="side"><span>[ ESTABILIZAR ]</span><span>[ ESTENDER ]</span><span>[ CAPTURAR ]</span><span>[ EVOLUIR ]</span></div>
      </section>
      <section className="feat"><div className="wrap">{FEAT.map(([t, d]) => <div key={t}><Ico d={d as string} s={26} />{t}</div>)}</div></section>
      <section className="mis">
        <div className="l"><span className="eb">O sistema {brand.charAt(0) + brand.slice(1).toLowerCase()}</span><h2>Potência<br />modular<br />para toda<br />missão</h2><i /></div>
        <div className="ms">{MISS.map((m) => <div className="m" key={m.t}><img src={m.img} alt={m.t.replace("\n", " ")} /><Ico d={m.ic} s={20} /><span>{m.t}</span></div>)}</div>
      </section>
      <section className="acc wrap" id="acc" style={{ maxWidth: "none", padding: 0 }}><div className="wrap">
        <div className="ah"><span>[ Acessórios em destaque</span><a href={wa("ver todos os acessórios")}>VER TODOS →</a></div>
        <div className="ag">{ACC.map((a) => <div className="ac" key={a.n}><img src={a.img} alt={a.n} /><div className="b"><b>{a.n}</b><small>{a.d}</small><em>{a.p}</em></div><a href={wa(`comprar o ${a.n}`)} aria-label={`Comprar ${a.n}`}><i><Ico d="M6 6h15l-2 9H8zM6 6L5 3H2" s={16} c="#041014" /></i></a></div>)}</div>
      </div></section>
      <section className="sys" id="sys">
        <div className="l"><h2>Por dentro<br />do sistema<br />de voo</h2><i className="bar" /><ul style={{ padding: 0, margin: 0 }}>{MOD.map((m, i) => <li key={m}><b>0{i + 1}</b>{m}</li>)}</ul></div>
        <img src="/drone-sistema.webp" alt="Drone em vista explodida: casco, núcleo de controle, câmera e gimbal" />
      </section>
      <section className="build"><img src="/drone-build.webp" alt="Piloto de jaqueta com mochila e controle diante de montanhas e lago, com drone ao fundo" /><div className="t"><h2>Monte<br />seu kit</h2><p>Escolha. Personalize. Voe.</p><a className="btn" href={wa()}>Configurar agora <Arr /></a></div></section>
      <footer className="foot"><div className="wrap"><span>© 2026 {brand}. Todos os direitos reservados.</span><span>Privacidade · Termos · Entregas para todo o Brasil</span></div></footer>
    </div>
  );
}
