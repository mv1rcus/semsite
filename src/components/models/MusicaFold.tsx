import { useEffect, useRef, useState } from "react";

/** Escola de música nova, construída do zero a partir de um pin claro e arejado: título grande sobre colagem de fotos de instrumentos e CTA vazado. Aula experimental em 3 passos que fecha no WhatsApp. */
const CO = "#d9482b", CD = "#b83a20", NV = "#1d2433", CR = "#fbf6ee", SA = "#f1e6d4", MU = "#566074", LN = "#e6dccb", MT = "#2f7a6b";
const INST = [
  { k: "Violão e guitarra", d: "Do primeiro acorde ao solo. Músicas que você gosta desde o começo.", img: "/mus-violao.webp", n: "Cordas" },
  { k: "Piano e teclado", d: "Leitura de partitura ou cifra, do jeito que combinar com você.", img: "/mus-piano.webp", n: "Teclas" },
  { k: "Canto", d: "Respiração, afinação e confiança para cantar em qualquer palco.", img: "/mus-canto.webp", n: "Voz" },
  { k: "Bateria", d: "Ritmo, coordenação e muita diversão em sala com tratamento acústico.", img: "/mus-bateria.webp", n: "Percussão" },
];
const STEPS = [
  { n: "01", t: "Aula experimental", d: "Você toca ou canta já no primeiro dia, sem compromisso." },
  { n: "02", t: "Plano sob medida", d: "O professor monta o repertório com o que você quer tocar." },
  { n: "03", t: "Apresentação", d: "Duas vezes por ano os alunos tocam no recital da escola." },
];
const TEACH = [
  { n: "Helena", r: "Piano e teoria musical", img: "/mus-t1.webp" },
  { n: "Caio", r: "Violão, guitarra e baixo", img: "/mus-t2.webp" },
  { n: "Bia", r: "Canto e coral infantil", img: "/mus-t3.webp" },
];
const FEATS = ["Aulas individuais ou em dupla", "Crianças a partir de 5 anos", "Instrumentos para estudar na escola", "Recital duas vezes por ano"];
const WHO = ["Eu (adulto)", "Meu filho ou filha", "Um adolescente", "Em grupo ou banda"];
const TIMES = ["Manhã", "Tarde", "Noite", "Sábado"];
const Note = ({ c = CO, s = 28 }: { c?: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke={c} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 24V7l13-3v17" /><circle cx="8.500" cy="24" r="3.500" /><circle cx="21.500" cy="21" r="3.500" /></svg>
);

export function MusicaFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Escola Compasso";
  const city = client?.city?.trim() || "Belo Horizonte";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [ins, setIns] = useState("");
  const [who, setWho] = useState("");
  const [tm, setTm] = useState("");
  const [cust, setCust] = useState("");
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const mdRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement as HTMLElement | null;
    const sel = 'button,a[href],input,[tabindex]:not([tabindex="-1"])';
    setTimeout(() => mdRef.current?.querySelector<HTMLElement>(".opt,input,a.btn")?.focus(), 30);
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); return; }
      if (e.key !== "Tab" || !mdRef.current) return;
      const els = Array.from(mdRef.current.querySelectorAll<HTMLElement>(sel)).filter((x) => x.offsetParent !== null);
      if (!els.length) return;
      const a = els[0]!, z = els[els.length - 1]!;
      if (!mdRef.current.contains(document.activeElement)) { e.preventDefault(); a.focus(); }
      else if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    };
    window.addEventListener("keydown", k);
    return () => { window.removeEventListener("keydown", k); lastFocus.current?.focus(); };
  }, [open]);
  useEffect(() => { if (open && step > 1) mdRef.current?.querySelector<HTMLElement>(".opt,input")?.focus(); }, [step, open]);
  const start = (pre?: string) => { setStep(pre ? 2 : 1); setIns(pre ?? ""); setWho(""); setTm(""); setOpen(true); setMenu(false); };
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero agendar uma aula experimental na ${brand}${cust ? ` em nome de ${cust}` : ""}. Instrumento: ${ins}. Aluno: ${who}. Melhor período: ${tm}.`)}`;
  const stepTitle = step === 1 ? "Qual instrumento?" : step === 2 ? "Quem vai aprender?" : step === 3 ? "Melhor período?" : "Quase lá!";

  return (
    <div className="mu" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: NV, background: CR, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        .mu *{box-sizing:border-box}
        .mu a,.mu button{font-family:inherit}
        .mu .wrap{max-width:1180px;margin:0 auto;padding:0 24px}
        .mu .disp{font-family:'Josefin Sans',sans-serif;font-weight:700;letter-spacing:-.025em;line-height:1.02}
        .mu .nav{display:flex;align-items:center;justify-content:space-between;height:84px;gap:20px}
        .mu .logo{display:flex;align-items:center;font-family:'Josefin Sans',sans-serif;font-weight:600;font-size:19px;letter-spacing:.01em}
        .mu .logo b{display:grid;place-items:center;width:42px;height:42px;border-radius:50%;background:${CO}}
        .mu .links{display:flex;gap:32px;font-size:15px;font-weight:600}
        .mu .links a{cursor:pointer;color:${NV};padding:6px 0;border-bottom:2px solid transparent}.mu .links a:hover{border-color:${CO}}
        .mu .btn{background:${CO};color:#fff;border:2px solid ${CO};border-radius:999px;padding:0 30px;min-height:54px;font-weight:700;font-size:16px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:10px;transition:transform .15s,background .15s}
        .mu .btn:hover{transform:translateY(-2px);background:${CD};border-color:${CD}}
        .mu .btn.o{background:transparent;color:${CD};border-color:${CD}}.mu .btn.o:hover{background:${CD};color:#fff}
        .mu .btn.sm{min-height:44px;padding:0 22px;font-size:14.5px}
        .mu .btn.w{background:#fff;color:${CD};border-color:#fff}
        .mu .burger{display:none;flex:none;min-width:46px;background:${SA};border:0;border-radius:50%;width:46px;height:46px;cursor:pointer}
        .mu .hero{background:linear-gradient(rgba(255,255,255,.7),rgba(255,255,255,.58)),url("/mus-hero.webp") center 30%/cover;min-height:660px;clip-path:polygon(0 0,100% 0,100% 93%,0 100%)}
        .mu .hc{max-width:620px;margin:0 auto;text-align:center;padding:70px 0 150px}
        .mu .hc h1{font-size:clamp(34px,4.2vw,52px);font-weight:600;letter-spacing:.04em;line-height:1.25;text-transform:uppercase;color:${NV};margin:0 0 34px}
        .mu .hc .lead{margin:0 auto 34px;color:${NV};font-weight:400}
        .mu .coll{position:relative;display:grid;grid-template-columns:1fr 1.15fr;gap:22px;margin:-110px auto 0;max-width:980px;align-items:start}
        .mu .coll img{display:block;width:100%;object-fit:cover;border-radius:6px;box-shadow:0 18px 40px rgba(29,36,51,.18)}
        .mu .coll .a{aspect-ratio:4/3}.mu .coll .b{aspect-ratio:4/3;margin-top:70px}.mu .coll .c{aspect-ratio:4/3;grid-column:1;width:75%;margin:-30px 0 0 auto}
        .mu .hc .eb{justify-content:center;margin-bottom:18px;color:${NV};font-size:14px;background:rgba(255,255,255,.88);padding:8px 16px;border-radius:999px}
        .mu .hc .btn.o{background:#fff;color:${CD};border-color:${CD};font-size:17px}.mu .hc .btn.o:hover{background:${CD};color:#fff}
        .mu .eb{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:700;color:${CD};text-transform:uppercase;letter-spacing:.12em}
        .mu h1{font-size:clamp(42px,5vw,70px);margin:18px 0 0}
        .mu h1 i{font-style:italic;color:${CO};font-weight:700}
        .mu .lead{font-size:18.5px;line-height:1.65;color:${MU};max-width:480px;margin:24px 0 32px}
        .mu .col{position:relative;display:grid;grid-template-columns:1.2fr 1fr;grid-template-rows:auto auto;gap:14px}
        .mu .col img{display:block;width:100%;object-fit:cover;border-radius:20px}
        .mu .col .big{grid-row:1/3;aspect-ratio:3/4.4;height:100%;border-radius:200px 200px 20px 20px}
        .mu .col .a{aspect-ratio:1/.9}.mu .col .b{aspect-ratio:1/.9}
        .mu .badge{position:absolute;left:-28px;bottom:36px;background:#fff;border-radius:18px;padding:16px 20px;box-shadow:0 14px 34px rgba(29,36,51,.16);display:flex;gap:12px;align-items:center;z-index:2}
        .mu .badge b{font-family:'Josefin Sans',sans-serif;font-size:32px;color:${CO};line-height:1}.mu .badge span{font-size:13px;font-weight:600;line-height:1.3;color:${NV}}
        .mu .sec{padding:100px 0 0}
        .mu h2{font-size:clamp(34px,4.4vw,56px);margin:14px 0 0}
        .mu .ig{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:42px}
        .mu .ic{border:0;background:#fff;border-radius:22px;overflow:hidden;cursor:pointer;text-align:left;padding:0;box-shadow:0 10px 26px rgba(29,36,51,.08);transition:transform .2s;color:${NV};display:flex;flex-direction:column}
        .mu .ic:hover{transform:translateY(-6px)}
        .mu .ic img{display:block;width:100%;aspect-ratio:4/4.6;object-fit:cover}
        .mu .ic div{padding:20px 22px 24px;display:flex;flex-direction:column;gap:8px;flex:1}
        .mu .ic em{font-style:normal;font-size:13.5px;font-weight:700;color:${MT};text-transform:uppercase;letter-spacing:.12em}
        .mu .ic h3{font-family:'Josefin Sans',sans-serif;font-weight:700;font-size:22px;margin:0;line-height:1.1}
        .mu .ic p{margin:0;font-size:14.5px;line-height:1.55;color:${MU}}
        .mu .ic .go{margin-top:auto;padding-top:8px;font-weight:700;font-size:14px;color:${CD}}
        .mu .how{background:${SA};margin-top:100px;padding:90px 0}
        .mu .hg{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
        .mu .hg img{display:block;width:100%;aspect-ratio:4/4.2;object-fit:cover;border-radius:24px 24px 200px 24px}
        .mu .st{display:flex;gap:20px;padding:22px 0;border-bottom:1px solid #d9cbb3}.mu .st:last-child{border:0}
        .mu .st i{flex:none;font-style:normal;font-family:'Josefin Sans',sans-serif;font-weight:700;font-size:34px;color:${CO};width:56px}
        .mu .st b{display:block;font-family:'Josefin Sans',sans-serif;font-size:22px;font-weight:700}.mu .st span{display:block;font-size:15.5px;line-height:1.55;color:${MU};margin-top:4px}
        .mu .fl{display:flex;flex-wrap:wrap;gap:10px;margin-top:28px}
        .mu .fl span{background:#fff;border-radius:999px;padding:9px 18px;font-size:14px;font-weight:600}
        .mu .tg{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:42px}
        .mu .tc img{display:block;width:100%;aspect-ratio:4/4.6;object-fit:cover;border-radius:200px 200px 22px 22px}
        .mu .tc b{display:block;font-family:'Josefin Sans',sans-serif;font-size:24px;font-weight:700;margin-top:16px;text-align:center}.mu .tc span{display:block;text-align:center;font-size:15px;color:${MU};margin-top:2px}
        .mu .cta{background:${NV};border-radius:32px;color:#fff;display:grid;grid-template-columns:1.2fr 1fr;gap:30px;align-items:center;padding:56px 54px;margin:100px 0 70px;position:relative;overflow:hidden}
        .mu .cta:after{content:"";position:absolute;right:-90px;top:-90px;width:340px;height:340px;border-radius:50%;background:${CO}}
        .mu .cta h3{font-size:clamp(32px,4vw,52px);margin:0;position:relative;z-index:2}.mu .cta p{margin:16px 0 28px;font-size:17px;line-height:1.55;color:#d6dbe6;max-width:460px;position:relative;z-index:2}
        .mu .cta .bw{position:relative;z-index:2}
        .mu footer{background:${NV};color:#cfd5e2;padding:38px 0}
        .mu .fr{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;font-size:14.5px}
        .mu .fr nav{display:flex;gap:26px}.mu .fr nav a{cursor:pointer;color:#cfd5e2}
        .mu .wa{position:fixed;right:18px;bottom:18px;z-index:40;width:58px;height:58px;border-radius:50%;background:#25d366;display:grid;place-items:center;box-shadow:0 8px 24px rgba(0,0,0,.3)}
        .mu .ov{position:fixed;inset:0;z-index:100;background:rgba(29,36,51,.65);display:flex;align-items:center;justify-content:center;padding:16px}
        .mu .md{background:${CR};width:100%;max-width:520px;max-height:92vh;overflow:auto;padding:32px;border-radius:26px;position:relative;border-top:8px solid ${CO}}
        .mu .md h3{font-family:'Josefin Sans',sans-serif;font-weight:700;font-size:30px;margin:10px 0 4px}
        .mu .bars{display:flex;gap:6px;margin:14px 0 20px}.mu .bars i{flex:1;height:6px;border-radius:6px;background:${LN}}.mu .bars i.on{background:${CO}}
        .mu .opt{padding:14px 10px;border:2px solid ${LN};border-radius:14px;background:#fff;cursor:pointer;font-size:15px;font-weight:600;text-align:center;min-height:52px;color:${NV}}
        .mu .opt:hover{border-color:${CO}}.mu .opt.on{background:${CO};color:#fff;border-color:${CO}}
        .mu .x{position:absolute;right:14px;top:16px;width:44px;height:44px;border:0;background:none;font-size:28px;cursor:pointer;color:${NV}}
        .mu .mob{display:none}
        .mu :focus-visible{outline:3px solid ${CD};outline-offset:2px}
        .mu .cta :focus-visible{outline-color:#fff}
        @media(max-width:900px){
          .mu .links{display:none}.mu .burger{display:grid;place-items:center}.mu .nav{height:68px;gap:8px}.mu .logo{font-size:19px}.mu .logo b{width:36px;height:36px}.mu .navbtn{margin-left:auto;min-height:44px!important;padding:0 16px!important;font-size:13.5px!important;white-space:nowrap}
          .mu .hero{min-height:560px}.mu .hc{padding:40px 0 110px}.mu .hc h1{font-size:clamp(28px,8vw,40px)}.mu .coll{grid-template-columns:1fr;margin-top:-80px}.mu .coll .b{margin-top:0}.mu .coll .c{width:100%;margin:0}
          .mu .badge{left:10px;bottom:10px;padding:12px 14px}.mu .badge b{font-size:26px}
          .mu .sec{padding-top:64px}.mu .ig{grid-template-columns:1fr 1fr;gap:12px}.mu .ic div{padding:14px 14px 18px}.mu .ic h3{font-size:18px}.mu .ic p{font-size:14.5px}
          .mu .how{margin-top:64px;padding:60px 0}.mu .hg{grid-template-columns:1fr;gap:34px}
          .mu .tg{grid-template-columns:minmax(0,1fr);gap:26px}.mu .tc{display:grid;grid-template-columns:120px 1fr;gap:16px;align-items:center}.mu .tc img{aspect-ratio:1;border-radius:60px 60px 16px 16px}.mu .tc b,.mu .tc span{text-align:left;margin-top:0}
          .mu .cta{grid-template-columns:1fr;padding:38px 26px;margin:64px 0 50px}.mu .cta:after{width:200px;height:200px;right:-70px;top:-70px}
          .mu .fr{justify-content:center;text-align:center}.mu .fr nav{gap:18px;flex-wrap:wrap;justify-content:center}
          .mu .mob{display:block;background:#fff;border-radius:16px;margin:0 0 12px;box-shadow:0 8px 24px rgba(29,36,51,.15)}.mu .mob a{display:block;padding:15px 20px;font-size:15px;font-weight:600;cursor:pointer;border-top:1px solid ${LN}}.mu .mob a:first-child{border:0}
          .mu .md{padding:26px 20px}
        }
      `}</style>

      <div className="hero" id="top"><div className="wrap">
        <header className="nav">
          <div className="logo">{brand}</div>
          <nav className="links"><a onClick={() => go("top")}>Início</a><a onClick={() => go("instrumentos")}>Instrumentos</a><a onClick={() => go("metodo")}>Como funciona</a><a onClick={() => go("professores")}>Professores</a><a onClick={() => go("contato")}>Contato</a></nav>
          <button type="button" className="btn sm navbtn" onClick={() => start()}>Aula grátis</button>
          <button type="button" className="burger" aria-label="Menu" onClick={() => setMenu((m) => !m)}><svg width="24" height="24" viewBox="0 0 26 26" stroke={NV} strokeWidth="2.4" strokeLinecap="round"><path d="M3 7h20M3 13h20M3 19h20" /></svg></button>
        </header>
        {menu && <div className="mob"><a onClick={() => go("instrumentos")}>Instrumentos</a><a onClick={() => go("metodo")}>Como funciona</a><a onClick={() => go("professores")}>Professores</a><a onClick={() => go("contato")}>Contato</a></div>}
        <div className="hc">
          <span className="eb">Aulas particulares de música em {city}</span>
          <h1 className="disp">Aulas de música com professores profissionais</h1>
          <button type="button" className="btn o" onClick={() => start()}>Agendar aula grátis</button>
        </div>
      </div></div>

      <div className="wrap">
        <div className="coll">
          <img className="a" src="/mus-violao.webp" alt="Aluno tocando violão" />
          <img className="b" src="/mus-canto.webp" alt="Aluna cantando ao microfone" />
          <img className="c" src="/mus-piano.webp" alt="Criança tocando piano" />
        </div>
      </div>

      <section className="sec" id="instrumentos"><div className="wrap">
        <span className="eb"><Note s={20} />Instrumentos</span>
        <h2 className="disp">Escolha o seu som</h2>
        <div className="ig">
          {INST.map((c) => (
            <button type="button" className="ic" key={c.k} onClick={() => start(c.k)}>
              <img src={c.img} alt={c.k} loading="lazy" />
              <div><em>{c.n}</em><h3>{c.k}</h3><p>{c.d}</p><span className="go">Quero aprender →</span></div>
            </button>
          ))}
        </div>
      </div></section>

      <section className="how" id="metodo"><div className="wrap hg">
        <img src="/mus-aula.webp" alt="Aula de música em sala" loading="lazy" />
        <div>
          <span className="eb"><Note s={20} />Como funciona</span>
          <h2 className="disp">Do primeiro<br />acorde ao palco</h2>
          <div style={{ marginTop: 18 }}>
            {STEPS.map((s) => (<div className="st" key={s.n}><i>{s.n}</i><div><b>{s.t}</b><span>{s.d}</span></div></div>))}
          </div>
          <div className="fl">{FEATS.map((f) => (<span key={f}>{f}</span>))}</div>
        </div>
      </div></section>

      <section className="sec" id="professores"><div className="wrap">
        <span className="eb"><Note s={20} />Professores</span>
        <h2 className="disp">Quem vai tocar<br />com você</h2>
        <div className="tg">
          {TEACH.map((p) => (<div className="tc" key={p.n}><img src={p.img} alt={p.n} loading="lazy" /><div><b>{p.n}</b><span>{p.r}</span></div></div>))}
        </div>
      </div></section>

      <section id="contato"><div className="wrap">
        <div className="cta">
          <div>
            <h3 className="disp">Sua primeira aula<br />é por nossa conta</h3>
            <p>Escolha o instrumento e o melhor período. A gente confirma pelo WhatsApp.</p>
            <div className="bw"><button type="button" className="btn w" onClick={() => start()}>Agendar aula grátis</button></div>
          </div>
          <div />
        </div>
      </div></section>

      <footer><div className="wrap fr">
        <div><span style={{ fontFamily: "Josefin Sans,sans-serif", fontWeight: 800, fontSize: 21, color: "#fff" }}>{brand}</span><div style={{ marginTop: 8, lineHeight: 1.6 }}>Rua da Bahia, 880, {city}<br />Seg a sex, 9h às 21h · Sáb, 9h às 14h</div></div>
        <nav><a onClick={() => go("instrumentos")}>Instrumentos</a><a onClick={() => go("metodo")}>Como funciona</a><a onClick={() => go("professores")}>Professores</a></nav>
        <div style={{ lineHeight: 1.7 }}><a href={`https://wa.me/${num}`} target="_blank" rel="noreferrer" style={{ color: "#fff", fontWeight: 700, textDecoration: "underline" }}>WhatsApp: fale com a gente</a><br />Instagram: @escolacompasso</div>
      </div><div className="wrap" style={{ marginTop: 22, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.18)", fontSize: 14.5, color: "#e3e8f2" }}>Site de demonstração: fotos, nomes dos professores, números (*) e endereço são ilustrativos.</div></footer>

      {sc && !open && (<a className="wa" href={`https://wa.me/${num}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 32 32" fill="#fff"><path d="M16 3a13 13 0 0 0-11 19.700L3 29l6.500-2A13 13 0 1 0 16 3zm0 2.400A10.600 10.600 0 1 1 9.600 24l-.4-.3-3.800 1.100 1.200-3.700-.3-.4A10.600 10.600 0 0 1 16 5.400zm-4 5.300c-.3 0-.7.100-1 .5-.4.400-1.300 1.300-1.300 3.100s1.400 3.600 1.500 3.800c.2.200 2.600 4.100 6.400 5.600 3.100 1.200 3.800.9 4.500.9.700-.1 2.200-.9 2.500-1.800.3-.9.300-1.600.2-1.800-.1-.2-.3-.3-.7-.5l-2.300-1.100c-.3-.1-.6-.2-.8.200-.2.300-.9 1.100-1.100 1.300-.2.200-.4.300-.7.100-.4-.2-1.500-.6-2.800-1.700-1-.9-1.700-2.100-1.900-2.400-.2-.4 0-.6.200-.8l.5-.6c.2-.2.200-.4.400-.6.100-.3 0-.5 0-.6l-1-2.400c-.3-.6-.5-.5-.7-.5z" /></svg></a>)}

      {open && (
        <div className="ov" onClick={() => setOpen(false)}>
          <div className="md" ref={mdRef} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Agendar aula experimental">
            <button type="button" className="x" aria-label="Fechar" onClick={() => setOpen(false)}>×</button>
            <span className="eb">Aula experimental grátis</span>
            <h3>{stepTitle}</h3>
            <div className="bars">{[1, 2, 3, 4].map((n) => (<i key={n} className={n <= step ? "on" : ""} />))}</div>
            {step === 1 && (<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>{INST.map((l) => (<button type="button" key={l.k} className={`opt${ins === l.k ? " on" : ""}`} onClick={() => { setIns(l.k); setStep(2); }}>{l.k}</button>))}</div>)}
            {step === 2 && (<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>{WHO.map((l) => (<button type="button" key={l} className={`opt${who === l ? " on" : ""}`} onClick={() => { setWho(l); setStep(3); }}>{l}</button>))}</div>)}
            {step === 3 && (<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>{TIMES.map((x) => (<button type="button" key={x} className={`opt${tm === x ? " on" : ""}`} onClick={() => { setTm(x); setStep(4); }}>{x}</button>))}</div>)}
            {step === 4 && (
              <div>
                <label style={{ fontSize: 14, fontWeight: 700 }}>Seu nome<input value={cust} onChange={(e) => setCust(e.target.value)} placeholder="Como podemos te chamar?" style={{ display: "block", width: "100%", marginTop: 8, padding: "15px 16px", borderRadius: 14, border: `2px solid ${LN}`, fontSize: 16, fontFamily: "inherit" }} /></label>
                <p style={{ fontSize: 14, color: MU, margin: "14px 0 18px" }}>{ins} · {who} · {tm}</p>
                <a className="btn" style={{ width: "100%", textDecoration: "none" }} href={wa} target="_blank" rel="noreferrer">Confirmar no WhatsApp</a>
                <p style={{ fontSize: 12.5, color: MU, textAlign: "center", margin: "12px 0 0" }}>Abre o WhatsApp com a mensagem pronta. Nada é enviado antes de você tocar em enviar.</p>
              </div>
            )}
            {step > 1 && <button type="button" onClick={() => setStep(step - 1)} style={{ background: "none", border: 0, marginTop: 14, color: CD, fontWeight: 700, cursor: "pointer", fontSize: 14, minHeight: 44 }}>← Voltar</button>}
          </div>
        </div>
      )}
    </div>
  );
}
