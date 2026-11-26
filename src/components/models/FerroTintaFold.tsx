import { useState } from "react";

/** Estúdio de tatuagem escuro e artístico, partindo de um pin de site de estúdio (Tattoo Dominus: hero full-bleed com foto, faixa com frase-manifesto, grid de artistas, contadores) adaptado: marrom-sépia + laranja-ember, Bebas Neue, flash da semana em line-art e agendamento em 3 passos no WhatsApp. */
const BG = "#17100b", PN = "#211712", CD = "#1d1410", TX = "#f3e9dc", MU = "#d0c1b1", EM = "#e4572e", EMD = "#b03c1c", LN = "#3a2a20", EMT = "#f0683c";
const ARTISTS = [
  { n: "Dante Ferreira", s: "Blackwork e old school pesado", img: "/ft-a1.webp", y: "12 anos de agulha" },
  { n: "Ravena Solla", s: "Fine line e blackwork botânico", img: "/ft-a2.webp", y: "8 anos de agulha" },
];
const FLASH = [
  { n: "Rosa tradicional", p: "R$ 280", d: "M12 21c-5-4-8-7-8-11a5 5 0 0 1 8-4 5 5 0 0 1 8 4c0 4-3 7-8 11zM12 6v15" },
  { n: "Serpente e adaga", p: "R$ 420", d: "M12 2v10m0 0c-4 0-6 2-6 5 0 2.7 2.7 4 6 4s6-1.3 6-4c0-3-2-5-6-5zM9 5l3-3 3 3" },
  { n: "Mariposa noturna", p: "R$ 350", d: "M12 8c-3-4-8-4-8 0s3 6 8 3c5 3 8 1 8-3s-5-4-8 0zM12 8v10M9 18c1 2 5 2 6 0" },
  { n: "Mão e lua", p: "R$ 380", d: "M15 3a8 8 0 1 0 6 13A9 9 0 0 1 15 3zM7 12h6" },
  { n: "Caveira chicana", p: "R$ 450", d: "M12 3a7 7 0 0 0-7 7c0 3 2 5 3 6v3h8v-3c1-1 3-3 3-6a7 7 0 0 0-7-7zM9 10h.01M15 10h.01M10 16h4" },
  { n: "Espada e flor", p: "R$ 320", d: "M12 2l2 4-2 12-2-12zM12 18v4M8 8c2 1 6 1 8 0" },
];
const STEPS = [
  { t: "Conversa e referência", d: "Manda tua ideia, referências e região do corpo no WhatsApp. A gente devolve caminho e orçamento no mesmo dia." },
  { t: "Desenho exclusivo", d: "Nada de catálogo repetido: cada peça nasce no sketchbook, desenhada pra tua anatomia e pro teu tom de pele." },
  { t: "Sessão com biossegurança", d: "Material 100% descartável e aberto na tua frente, bancada estéril e acompanhamento da cicatrização por 30 dias." },
];
const REVIEWS = [
  { q: "Cheguei com três referências confusas e o Dante transformou num blackwork que parece que sempre foi meu. Três sessões e zero arrependimento.", n: "Igor M., braço fechado" },
  { q: "A Ravena tem a mão mais leve que já vi. Minha fine line cicatrizou perfeita e o acompanhamento depois fez toda a diferença.", n: "Caíque T., primeiro tattoo" },
  { q: "Estúdio impecável, tudo descartável aberto na hora. Voltei três vezes e já marquei a quarta.", n: "Júlia R., costela e antebraço" },
];
const STYLES = ["Blackwork", "Fine line", "Old school", "Colorida", "Escrita"];
const ZONES = ["Antebraço", "Braço", "Costas", "Perna", "Costela", "Outra"];
const Ic = ({ d, s = 40, c = EM }: { d: string; s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);

export function FerroTintaFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Ferro & Tinta";
  const city = client?.city?.trim() || "Porto Alegre";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [style, setStyle] = useState("");
  const [zone, setZone] = useState("");
  const [size, setSize] = useState("Média (10-15cm)");
  const [idea, setIdea] = useState("");
  const [cust, setCust] = useState("");
  const [menu, setMenu] = useState(false);
  const start = () => { setStep(1); setOpen(true); setMenu(false); };
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero agendar uma sessão na ${brand}${cust ? ` em nome de ${cust}` : ""}. Estilo: ${style}; região: ${zone}; tamanho: ${size}. Ideia: ${idea || "a combinar"}.`)}`;

  return (
    <div className="ft" style={{ fontFamily: "Inter, system-ui, sans-serif", color: TX, background: BG, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800&display=swap');
        .ft *{box-sizing:border-box}
        .ft a,.ft button{font-family:inherit}
        .ft .wrap{max-width:1160px;margin:0 auto;padding:0 24px}
        .ft .nav{display:flex;align-items:center;justify-content:space-between;height:84px;gap:20px;position:absolute;top:0;left:0;right:0;z-index:20;max-width:1160px;margin:0 auto;padding:0 24px}
        .ft .logo{font-family:'Bebas Neue',sans-serif;font-size:30px;letter-spacing:2px;color:${TX};white-space:nowrap}
        .ft .logo em{color:${EMT};font-style:normal}
        .ft .links{display:flex;gap:28px;font-size:14px;font-weight:600;letter-spacing:.5px;text-transform:uppercase}
        .ft .links a{color:${MU};cursor:pointer;transition:color .2s}.ft .links a:hover{color:${TX}}
        .ft .btn{background:${EM};color:#fff;border:0;border-radius:4px;padding:0 26px;min-height:50px;font-weight:700;font-size:14px;letter-spacing:1px;text-transform:uppercase;cursor:pointer;display:inline-flex;align-items:center;gap:10px;text-decoration:none}
        .ft .btn:hover{background:${EMD}}
        .ft .btn.o{background:transparent;color:${TX};border:1.5px solid ${TX}}
        .ft .btn.o:hover{border-color:${EM};color:${EM}}
        .ft .burger{display:none;background:none;border:0;width:44px;height:44px;cursor:pointer}
        .ft .hero{position:relative;display:flex;align-items:flex-end}
        .ft .hero::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(23,16,11,.66) 0%,rgba(23,16,11,.5) 40%,rgba(23,16,11,.97) 100%)}
        .ft .heroin{position:relative;z-index:2;width:100%;max-width:1160px;margin:0 auto;padding:210px 24px 72px}
        .ft .kick{display:inline-block;border:1px solid ${EMT};color:${EMT};font-weight:700;font-size:12px;letter-spacing:3px;text-transform:uppercase;padding:8px 14px}
        .ft h1{font-family:'Bebas Neue',sans-serif;font-size:clamp(56px,8vw,110px);line-height:.95;margin:22px 0 0;color:${TX};letter-spacing:1px;max-width:700px}
        .ft h1 .hl{color:${EMT}}
        .ft .lead{font-size:17px;line-height:1.7;color:${MU};margin:22px 0 30px;max-width:480px}
        .ft .herometa{display:flex;gap:26px;flex-wrap:wrap;margin-top:34px;border-top:1px solid ${LN};padding-top:22px}
        .ft .herometa div b{font-family:'Bebas Neue',sans-serif;font-size:30px;color:${TX};display:block;letter-spacing:1px}
        .ft .herometa div span{font-size:12.5px;color:${MU};letter-spacing:1.5px;text-transform:uppercase}
        .ft .sec{padding:84px 0}
        .ft .kick2{color:${EMT};font-weight:700;font-size:12px;letter-spacing:3px;text-transform:uppercase}
        .ft h2{font-family:'Bebas Neue',sans-serif;font-size:clamp(38px,4.6vw,58px);margin:12px 0 0;color:${TX};line-height:.98;letter-spacing:1px}
        .ft .sub{color:${MU};font-size:16px;margin-top:14px;line-height:1.7}
        .ft .aboutg{display:grid;grid-template-columns:1.05fr .95fr;gap:56px;align-items:center}
        .ft .aboutg img{width:100%;display:block;border:1px solid ${LN}}
        .ft .facts{display:grid;grid-template-columns:repeat(3,1fr);gap:0;margin-top:36px;border:1px solid ${LN}}
        .ft .fact{padding:22px;text-align:center}
        .ft .fact+.fact{border-left:1px solid ${LN}}
        .ft .fact b{font-family:'Bebas Neue',sans-serif;font-size:38px;color:${EMT};display:block;letter-spacing:1px}
        .ft .fact span{font-size:12px;color:${MU};letter-spacing:1.5px;text-transform:uppercase}
        .ft .band{position:relative;padding:110px 0;text-align:center}
        .ft .band::after{content:'';position:absolute;inset:0;background:rgba(23,16,11,.88)}
        .ft .bandin{position:relative;z-index:2;max-width:760px;margin:0 auto;padding:0 24px}
        .ft .band h2{font-size:clamp(44px,6vw,80px)}
        .ft .band .sub{color:${MU}}
        .ft .agrid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px;margin-top:44px}
        .ft .acard{position:relative;border:1px solid ${LN};overflow:hidden}
        .ft .acard img{width:100%;aspect-ratio:3/4;object-fit:cover;display:block;filter:saturate(.85)}
        .ft .acard .lb{position:absolute;left:0;right:0;bottom:0;padding:44px 22px 20px;background:linear-gradient(180deg,transparent,rgba(23,16,11,.95))}
        .ft .acard .lb b{font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:1px;display:block;color:${TX}}
        .ft .acard .lb small{color:${MU};font-size:13px;display:block;margin-top:2px}
        .ft .acard .lb em{color:${EMT};font-style:normal;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;display:block;margin-top:8px}
        .ft .atext{border:1px dashed ${LN};display:flex;flex-direction:column;justify-content:center;padding:32px;background:${CD}}
        .ft .atext b{font-family:'Bebas Neue',sans-serif;font-size:30px;letter-spacing:1px;color:${TX};line-height:1}
        .ft .atext p{color:${MU};font-size:14.5px;line-height:1.7;margin:14px 0 20px}
        .ft .flash{background:${PN};padding:84px 0}
        .ft .fgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:44px}
        .ft .fcard{background:${CD};border:1px solid #4a3328;padding:30px 26px;text-align:center;transition:border-color .2s}
        .ft .fcard:hover{border-color:${EM}}
        .ft .fcard .fi{height:88px;display:grid;place-items:center;margin-bottom:16px}
        .ft .fcard b{font-family:'Bebas Neue',sans-serif;font-size:21px;letter-spacing:1px;color:${TX};display:block}
        .ft .fcard .p{font-family:'Bebas Neue',sans-serif;font-size:24px;color:${EMT};display:block;margin:8px 0 16px;letter-spacing:1px}
        .ft .fcard button{background:transparent;border:1.5px solid #8a4526;color:${TX};border-radius:4px;min-height:42px;padding:0 18px;font-weight:700;font-size:12px;letter-spacing:1px;text-transform:uppercase;cursor:pointer;white-space:nowrap}
        .ft .fcard button:hover{border-color:${EM};color:${EM}}
        .ft .steps{display:grid;grid-template-columns:repeat(3,1fr);gap:0;margin-top:44px;border:1px solid ${LN}}
        .ft .step{padding:34px 30px;background:${CD}}
        .ft .step+.step{border-left:1px solid ${LN}}
        .ft .step .n{font-family:'Bebas Neue',sans-serif;font-size:44px;color:${EMT};letter-spacing:1px}
        .ft .step b{font-family:'Bebas Neue',sans-serif;font-size:23px;display:block;color:${TX};margin-top:8px;letter-spacing:1px}
        .ft .step p{color:${MU};font-size:14px;line-height:1.7;margin:10px 0 0}
        .ft .revs{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:44px}
        .ft .rev{background:${CD};border:1px solid ${LN};padding:30px}
        .ft .rev .mk{font-family:'Bebas Neue',sans-serif;font-size:52px;color:${EMT};line-height:.6;display:block;margin-bottom:14px}
        .ft .rev q{font-size:14.5px;line-height:1.75;color:${TX};display:block;quotes:'“' '”'}
        .ft .rev small{color:${MU};font-weight:600;font-size:13px;display:block;margin-top:16px;letter-spacing:.5px}
        .ft .cta{background:${EM};color:#fff;padding:80px 0;text-align:center}
        .ft .cta h2{color:#fff}
        .ft .cta .sub{color:#4a1710}
        .ft .cta .btn{background:#17100b;color:#fff}
        .ft .cta .btn:hover{background:#000}
        .ft .foot{background:#100a07;color:#8d7f72;padding:56px 0 30px;font-size:14px}
        .ft .footg{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:36px}
        .ft .foot h4{color:${TX};font-size:12px;text-transform:uppercase;letter-spacing:2.5px;margin:0 0 16px}
        .ft .foot .logo{font-size:34px;margin-bottom:14px}
        .ft .copy{border-top:1px solid #241a13;margin-top:40px;padding-top:22px;display:flex;justify-content:space-between;gap:14px;flex-wrap:wrap;font-size:13px;color:#8d7f72}
        .ft .ov{position:fixed;inset:0;background:rgba(10,6,4,.72);z-index:120;display:flex;align-items:center;justify-content:center;padding:16px}
        .ft .mdl{background:${PN};border:1px solid ${LN};width:100%;max-width:520px;max-height:88vh;overflow:auto;padding:32px;position:relative;color:${TX}}
        .ft .dots{display:flex;gap:8px;justify-content:center;margin-bottom:22px}
        .ft .dots i{width:30px;height:4px;background:${LN}}
        .ft .dots i.on{background:${EM}}
        .ft .chips{display:flex;flex-wrap:wrap;gap:10px;margin:18px 0}
        .ft .chips button{padding:12px 18px;border:1.5px solid ${LN};background:${CD};color:${TX};font-weight:600;font-size:14px;cursor:pointer;border-radius:4px}
        .ft .chips button.on{border-color:${EM};color:${EM};background:rgba(228,87,46,.12)}
        .ft .in{width:100%;border:1.5px solid ${LN};border-radius:4px;min-height:50px;padding:0 16px;font-size:15px;font-family:inherit;margin-bottom:12px;background:${CD};color:${TX};box-sizing:border-box}
        .ft .in:focus{outline:2px solid ${EM};border-color:transparent}
        .ft textarea.in{min-height:96px;padding:14px 16px;resize:vertical}
        .ft .sumr{display:flex;justify-content:space-between;font-size:14px;padding:9px 0;border-bottom:1px dashed ${LN};color:${MU}}
        .ft .sumr b{color:${TX}}
        .ft .x{position:absolute;right:14px;top:14px;width:40px;height:40px;border-radius:50%;border:1px solid ${LN};background:transparent;font-size:17px;cursor:pointer;color:${MU}}
        .ft .links.open{display:flex;position:fixed;left:0;right:0;top:84px;flex-direction:column;background:#100a07;padding:22px 24px 30px;gap:20px;box-shadow:0 24px 40px rgba(0,0,0,.5);z-index:110;font-size:16px}
        @media (max-width:1020px){
          .ft .agrid{grid-template-columns:1fr 1fr}
          .ft .atext{grid-column:1/-1}
          .ft .fgrid{grid-template-columns:repeat(3,1fr)}
          .ft .steps{grid-template-columns:1fr}
          .ft .step+.step{border-left:0;border-top:1px solid ${LN}}
          .ft .footg{grid-template-columns:1fr 1fr}
        }
        @media (max-width:860px){
          .ft .links{display:none}
          .ft .nav .btn{display:none}
          .ft .burger{display:block}
          .ft .aboutg{grid-template-columns:1fr}
          .ft .revs{grid-template-columns:1fr}
          .ft .sec{padding:60px 0}
          .ft .flash{padding:60px 0}
          .ft .heroin{padding:170px 24px 52px}
        }
        @media (max-width:560px){
          .ft .fgrid{grid-template-columns:1fr 1fr;gap:10px}
          .ft .fcard{padding:22px 14px}
          .ft .fcard button{font-size:10.5px;padding:0 10px;letter-spacing:.5px}
          .ft .kick2{font-size:13px}
          .ft .rev q{font-size:15px;line-height:1.8}
          .ft .sub{font-size:16.5px}
          .ft .agrid{grid-template-columns:1fr}
          .ft .footg{grid-template-columns:1fr}
          .ft .facts{grid-template-columns:1fr 1fr}
          .ft .fact:nth-child(3){border-left:0;border-top:1px solid ${LN};grid-column:1/-1}
        }
      `}</style>

      <header className="nav">
        <div className="logo">FERRO<em>&</em>TINTA</div>
        <nav className={menu ? "links open" : "links"}>
          {["Artistas", "Flash", "Processo", "Avaliações"].map((t, i) => (
            <a key={t} onClick={() => go(["artistas", "flash", "processo", "revs"][i] ?? "artistas")}>{t}</a>
          ))}
        </nav>
        <button className="btn" onClick={() => start()}>Agendar sessão</button>
        <button className="burger" aria-label="Menu" onClick={() => setMenu(!menu)}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={TX} strokeWidth="1.8" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        </button>
      </header>

      <section className="hero" style={{ background: 'url("/ft-hero.webp") center 30%/cover no-repeat' }}>
        <div className="heroin">
          <span className="kick">Estúdio de tatuagem · {city}</span>
          <h1>A nossa tinta <span className="hl">é a nossa marca</span></h1>
          <p className="lead">Blackwork, fine line e old school desenhados do zero pra tua pele. Estúdio autoral no coração de {city}, com biossegurança de clínica e alma de ateliê.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="btn" onClick={() => start()}>Agendar sessão</button>
            <button className="btn o" onClick={() => go("flash")}>Ver flash da semana</button>
          </div>
          <div className="herometa">
            <div><b>12</b><span>anos de estúdio</span></div>
            <div><b>4.800+</b><span>tatuagens feitas</span></div>
            <div><b>100%</b><span>material descartável</span></div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap aboutg">
          <div>
            <span className="kick2">Desde 2013</span>
            <h2>Ateliê de pele, não linha de produção</h2>
            <p className="sub">Cada peça começa no sketchbook, não num catálogo. A gente estuda tua ideia, tua anatomia e teu tom de pele antes de encostar na agulha — e acompanha a cicatrização até o fim.</p>
            <div className="facts">
              <div className="fact"><b>2</b><span>artistas residentes</span></div>
              <div className="fact"><b>3</b><span>prêmios em convenções</span></div>
              <div className="fact"><b>30d</b><span>de acompanhamento</span></div>
            </div>
          </div>
          <img src="/ft-about.webp" alt="Artista do Ferro & Tinta desenhando no sketchbook" />
        </div>
      </section>

      <section className="band" style={{ background: 'url("/ft-feat.webp") center 35%/cover no-repeat' }}>
        <div className="bandin">
          <span className="kick2">Artista da casa</span>
          <h2>Ravena Solla comanda a sexta de fine line</h2>
          <p className="sub">Toda sexta é dia de fine line com horário estendido até 22h. Orçamento na hora, desenho exclusivo e primeira sessão no mesmo dia pra peças pequenas.</p>
          <div style={{ marginTop: 28 }}>
            <button className="btn" onClick={() => start()}>Garantir horário de sexta</button>
          </div>
        </div>
      </section>

      <section className="sec" id="artistas">
        <div className="wrap">
          <span className="kick2">Quem tatua</span>
          <h2>Os artistas da casa</h2>
          <div className="agrid">
            {ARTISTS.map((a) => (
              <div className="acard" key={a.n}>
                <img src={a.img} alt={a.n} />
                <div className="lb"><b>{a.n}</b><small>{a.s}</small><em>{a.y}</em></div>
              </div>
            ))}
            <div className="atext">
              <b>Guest artists todo mês</b>
              <p>Recebemos tatuadores convidados de todo o país pra temporadas de uma semana. Entra no WhatsApp e pede pra entrar na lista: a agenda dos guests abre primeiro pra ela.</p>
              <div><button className="btn o" onClick={() => start()}>Entrar na lista</button></div>
            </div>
          </div>
        </div>
      </section>

      <section className="flash" id="flash">
        <div className="wrap">
          <span className="kick2">Desenho pronto, preço fechado</span>
          <h2>Flash da semana</h2>
          <p className="sub" style={{ maxWidth: 560 }}>Peças autorais em line-art, disponíveis pra tatuar uma única vez cada. Gostou, chama no WhatsApp que a gente reserva por 48h.</p>
          <div className="fgrid">
            {FLASH.map((f) => (
              <div className="fcard" key={f.n}>
                <div className="fi"><Ic d={f.d} s={64} /></div>
                <b>{f.n}</b>
                <span className="p">{f.p}</span>
                <button onClick={() => start()}>Reservar flash</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="processo">
        <div className="wrap">
          <span className="kick2">Sem mistério</span>
          <h2>Como funciona</h2>
          <div className="steps">
            {STEPS.map((s, i) => (
              <div className="step" key={s.t}>
                <span className="n">0{i + 1}</span>
                <b>{s.t}</b>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="revs" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <span className="kick2">Na pele e na palavra</span>
          <h2>Quem saiu da cadeira</h2>
          <div className="revs">
            {REVIEWS.map((r) => (
              <div className="rev" key={r.n}>
                <span className="mk">“</span>
                <q>{r.q}</q>
                <small>{r.n}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap">
          <span className="kick2" style={{ color: "#3d0f04" }}>A ideia já tá na tua cabeça</span>
          <h2>Bora botar na pele</h2>
          <p className="sub" style={{ maxWidth: 480, margin: "14px auto 30px" }}>Manda a referência no WhatsApp e recebe caminho, orçamento e agenda no mesmo dia.</p>
          <button className="btn" onClick={() => start()}>Agendar sessão</button>
        </div>
      </section>

      <footer className="foot">
        <div className="wrap footg">
          <div>
            <div className="logo">FERRO<em>&</em>TINTA</div>
            <p>Estúdio autoral de tatuagem em {city}. Desenho exclusivo, biossegurança total e acompanhamento de cicatrização.</p>
          </div>
          <div>
            <h4>Visite o estúdio</h4>
            Rua das Andradas, 812<br />Centro Histórico, {city}<br />Ter a Sáb, 11h às 20h<br />Sexta fine line até 22h
          </div>
          <div>
            <h4>Agenda</h4>
            Orçamento no mesmo dia<br />Flash reservado por 48h<br />Sinal de 30% pra agendar
          </div>
        </div>
        <div className="wrap copy">
          <span>{brand} — estúdio de tatuagem autoral</span>
          <span>+18 com documento · Fotos ilustrativas · Site de demonstração SemSite</span>
        </div>
      </footer>

      {open && (
        <div className="ov" onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div className="mdl">
            <button className="x" onClick={() => setOpen(false)}>✕</button>
            <div className="dots">{[1, 2, 3].map((s) => <i key={s} className={step >= s ? "on" : ""} />)}</div>
            {step === 1 && (
              <div>
                <h2 style={{ fontSize: 30 }}>Qual o estilo?</h2>
                <p className="sub" style={{ fontSize: 14 }}>Escolhe o que mais chega perto da tua ideia.</p>
                <div className="chips">
                  {STYLES.map((s) => (
                    <button key={s} className={style === s ? "on" : ""} onClick={() => setStyle(s)}>{s}</button>
                  ))}
                </div>
                <button className="btn" style={{ width: "100%", justifyContent: "center" }} disabled={!style} onClick={() => setStep(2)}>Continuar</button>
              </div>
            )}
            {step === 2 && (
              <div>
                <h2 style={{ fontSize: 30 }}>Onde e o quê?</h2>
                <p className="sub" style={{ fontSize: 14 }}>Região do corpo, tamanho e a ideia por trás.</p>
                <div className="chips">
                  {ZONES.map((z) => (
                    <button key={z} className={zone === z ? "on" : ""} onClick={() => setZone(z)}>{z}</button>
                  ))}
                </div>
                <div className="chips" style={{ marginTop: 0 }}>
                  {["Pequena (até 10cm)", "Média (10-15cm)", "Grande (15cm+)"].map((z) => (
                    <button key={z} className={size === z ? "on" : ""} onClick={() => setSize(z)}>{z}</button>
                  ))}
                </div>
                <textarea className="in" placeholder="Conta a ideia em duas linhas" value={idea} onChange={(e) => setIdea(e.target.value)} />
                <button className="btn" style={{ width: "100%", justifyContent: "center" }} disabled={!zone} onClick={() => setStep(3)}>Continuar</button>
                <button className="btn o" style={{ width: "100%", justifyContent: "center", marginTop: 10 }} onClick={() => setStep(1)}>Voltar</button>
              </div>
            )}
            {step === 3 && (
              <div>
                <h2 style={{ fontSize: 30 }}>Fecha o pedido</h2>
                <input className="in" placeholder="Teu nome" value={cust} onChange={(e) => setCust(e.target.value)} />
                <div style={{ marginTop: 8 }}>
                  <div className="sumr"><span>Estilo</span><b>{style}</b></div>
                  <div className="sumr"><span>Região</span><b>{zone}</b></div>
                  <div className="sumr"><span>Tamanho</span><b>{size}</b></div>
                  <div className="sumr"><span>Ideia</span><b>{idea || "a combinar"}</b></div>
                  <p className="sub" style={{ fontSize: 13, marginTop: 14 }}>O estúdio responde no mesmo dia com orçamento, desenho de caminho e datas. Sinal de 30% só depois do desenho aprovado.</p>
                </div>
                <a className="btn" style={{ width: "100%", justifyContent: "center" }} href={wa} target="_blank" rel="noopener noreferrer">Enviar no WhatsApp</a>
                <button className="btn o" style={{ width: "100%", justifyContent: "center", marginTop: 10 }} onClick={() => setStep(2)}>Voltar</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
