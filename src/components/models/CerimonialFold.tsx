import { useEffect, useRef, useState } from "react";

/** Cerimonialista de casamentos a partir de um pin bege, rosa antigo e marrom: logo monograma, título serifado com palavra em itálico rosa, foto grande com cartão de formulário sobreposto, três tiles de serviço com foto, passos em ícones de linha e faixa rosa de consulta de data. Consulta em 4 passos que fecha no WhatsApp. */
const RO = "#a8605b", RD = "#8a4a46", BG = "#ebdfd0", BG2 = "#f4ece1", BR = "#3a2620", MU = "#5a463e", LN = "#d9c8b4";
const TYPES = ["Casamento", "Noivado", "Debutante", "Aniversário", "Evento corporativo", "Outro evento"];
const GUESTS = ["Até 50", "50 a 100", "100 a 200", "Mais de 200"];
const TIMES = ["Assessoria completa", "Assessoria do dia", "Decoração e design", "Ainda não sei"];
const SERV = [
  { k: "Planejamento completo", img: "/ce-t1.webp", d: "Do orçamento ao último brinde, com fornecedores e cronograma." },
  { k: "Assessoria do dia", img: "/ce-t2.webp", d: "Cuidamos de cada detalhe para você só viver o momento." },
  { k: "Decoração e design", img: "/ce-t3.webp", d: "Flores, mesa e iluminação com a cara do casal." },
];
const STEPS = [
  { t: "Consulte a data", d: "Conte o tipo de evento e o número de convidados." },
  { t: "Planejem juntos", d: "Reunião para alinhar estilo, orçamento e fornecedores." },
  { t: "Celebre", d: "Na hora H, a equipe resolve tudo e você aproveita." },
];
const REVS = [
  { n: "Renata e Bruno", t: "Casamento ao ar livre com 140 convidados. Nada atrasou e a gente nem viu os bastidores." },
  { n: "Camila F.", t: "A Aurora organizou os 15 anos da minha filha com um carinho enorme. A família toda elogiou." },
  { n: "Paulo M.", t: "Evento da empresa em duas semanas. Cronograma firme e fornecedores pontuais." },
];
const Mono = ({ c = BR, s = 40 }: { c?: string; s?: number }) => (
  <span aria-hidden style={{ display: "inline-flex", alignItems: "flex-end", color: c, fontFamily: "'Newsreader', Georgia, serif", fontSize: s * 1.15, lineHeight: 1, fontWeight: 400, width: s * 1.2, height: s }}>A<span style={{ marginLeft: -s * 0.22, fontSize: s * 0.82 }}>L</span></span>
);
const Cal = () => (<svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke={BR} strokeWidth="1.6" aria-hidden><rect x="6" y="9" width="32" height="28" rx="3" /><path d="M6 17h32M14 5v7M30 5v7M16 25l4 4 8-8" /></svg>);
const Chat = () => (<svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke={BR} strokeWidth="1.6" aria-hidden><path d="M6 8h22v16H16l-6 5v-5H6zM22 28h10l5 4v-4h2V16H30" strokeLinejoin="round" /></svg>);
const Rings = () => (<svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke={BR} strokeWidth="1.6" aria-hidden><circle cx="16" cy="28" r="9" /><circle cx="28" cy="28" r="9" /><path d="M12 12l4-5 4 5-4 5z" /></svg>);
const ICONS = [Cal, Chat, Rings];

export function CerimonialFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Aurora Lima Cerimonial";
  const city = client?.city?.trim() || "Belo Horizonte";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [tp, setTp] = useState("");
  const [gs, setGs] = useState("");
  const [tm, setTm] = useState("");
  const [cust, setCust] = useState("");
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 700); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
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
  const start = (pre?: string) => { setStep(pre ? 2 : 1); setTp(pre ?? ""); setGs(""); setTm(""); setOpen(true); setMenu(false); };
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero consultar a data do meu evento com a ${brand}${cust ? ` em nome de ${cust}` : ""}. Evento: ${tp}. Convidados: ${gs}. Serviço: ${tm}.`)}`;
  const stepTitle = step === 1 ? "Que evento vai ser?" : step === 2 ? "Quantos convidados?" : step === 3 ? "Qual serviço?" : "Quase lá!";

  return (
    <div className="ce" style={{ fontFamily: "'Newsreader', Georgia, serif", color: BR, background: BG, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400;1,6..72,500&family=Jost:wght@400;500;600&display=swap');
        .ce *{box-sizing:border-box}
        .ce h1,.ce h2,.ce h3{font-family:inherit}
        .ce a,.ce button{font-family:inherit}
        .ce .wrap{max-width:1160px;margin:0 auto;padding:0 28px}
        .ce .sans{font-family:'Jost',system-ui,sans-serif}
        .ce .nav{display:flex;align-items:center;gap:26px;height:88px}
        .ce .logo{display:flex;align-items:center;gap:12px;line-height:1.15}
        .ce .logo b{display:block;font-weight:500;font-size:25px}.ce .logo small{display:block;font-family:'Jost',sans-serif;letter-spacing:.3em;font-size:10.5px;color:${MU};margin-top:2px}
        .ce .logo i{width:1px;height:34px;background:${BR};opacity:.5}
        .ce .links{display:flex;gap:30px;margin-left:auto;font-family:'Jost',sans-serif;font-size:12.5px;letter-spacing:.16em;text-transform:uppercase;font-weight:500}
        .ce .links a{cursor:pointer;padding:14px 2px;color:${BR}}.ce .links a:hover{color:${RO}}
        .ce .btn{background:${RO};color:#fff;border:1.5px solid ${RO};border-radius:2px;padding:0 26px;min-height:48px;font-family:'Jost',sans-serif;font-weight:500;font-size:12.5px;letter-spacing:.16em;text-transform:uppercase;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;text-decoration:none}
        .ce .btn:hover{background:${RD};border-color:${RD}}
        .ce .btn.o{background:transparent;color:${BR};border-color:${BR}}.ce .btn.o:hover{background:${BR};color:#fff}
        .ce .burger{display:none;background:transparent;border:1.5px solid ${BR};border-radius:2px;width:46px;height:46px;cursor:pointer;place-items:center}
        .ce .hg{display:grid;grid-template-columns:.9fr 1.1fr;gap:34px;align-items:start;padding:20px 0 0}
        .ce .eye{font-family:'Jost',sans-serif;letter-spacing:.22em;font-size:12.5px;font-weight:500;color:${MU};text-transform:uppercase;margin:58px 0 14px}
        .ce h1{font-size:clamp(40px,5vw,62px);line-height:1.06;font-weight:400;margin:0 0 22px;letter-spacing:-.01em}
        .ce em{color:${RO};font-style:italic}
        .ce .lead{font-family:'Jost',sans-serif;font-size:17px;line-height:1.65;color:${MU};max-width:420px;margin:0 0 28px}
        .ce .hb{display:flex;gap:12px;flex-wrap:wrap}
        .ce .ph{position:relative}
        .ce .ph img.main{display:block;width:100%;aspect-ratio:1.28/1;object-fit:cover;border-radius:2px}
        .ce .card{position:absolute;left:8%;right:-1%;bottom:-62px;background:#fff;padding:20px 24px 22px;border-radius:4px;box-shadow:0 14px 34px rgba(58,38,32,.16)}
        .ce .card .eb{font-family:'Jost',sans-serif;font-size:12.5px;letter-spacing:.18em;font-weight:600;text-transform:uppercase;display:block;margin-bottom:12px}
        .ce .card .row{display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end}
        .ce .card .lb{flex:1;min-width:120px;font-family:'Jost',sans-serif;font-size:12px;letter-spacing:.14em;text-transform:uppercase;font-weight:500;color:${BR}}.ce .card .fld::placeholder{color:${MU};opacity:1}.ce .card .lb .fld{display:block;width:100%;margin-top:6px;border:1px solid ${LN};padding:0 14px;min-height:46px;display:flex;align-items:center;font-family:'Jost',sans-serif;font-size:14.5px;color:${MU};border-radius:2px;background:#fff;cursor:pointer;text-align:left}
        .ce .tiles{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:100px}
        .ce .tile{position:relative;border:0;padding:0;cursor:pointer;overflow:hidden;border-radius:3px;aspect-ratio:.82/1;background:${BR};display:block}
        .ce .tile img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
        .ce .tile:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(58,38,32,.05),rgba(58,38,32,.72))}
        .ce .tile span{position:absolute;left:0;right:0;bottom:30px;z-index:2;color:#fff;text-align:center;font-size:30px;line-height:1.1;text-transform:uppercase;letter-spacing:.04em;padding:0 14px}
        .ce .tile span:after{content:"";display:block;width:70px;height:1.5px;background:#f0cfc9;margin:14px auto 0}
        .ce .tile small{position:absolute;z-index:2;left:18px;right:18px;bottom:-60px}
        .ce .made{display:grid;grid-template-columns:1.25fr 1fr;gap:56px;align-items:center;margin-top:60px}
        .ce .made img{display:block;width:100%;aspect-ratio:1.5/1;object-fit:cover;border-radius:3px}
        .ce h2{font-size:clamp(30px,3.6vw,44px);font-weight:400;margin:0;line-height:1.15}
        .ce .rule{width:90px;height:1.5px;background:${RO};margin:20px 0}
        .ce .p{font-family:'Jost',sans-serif;font-size:17px;line-height:1.65;color:${MU};max-width:400px;margin:0}
        .ce .steps{text-align:center;margin-top:84px}
        .ce .eyec{font-family:'Jost',sans-serif;letter-spacing:.24em;font-size:13px;font-weight:500;text-transform:uppercase}
        .ce .sg{display:grid;grid-template-columns:1fr auto 1fr auto 1fr;gap:20px;align-items:start;margin-top:30px}
        .ce .st{display:flex;flex-direction:column;align-items:center;gap:10px;font-family:'Jost',sans-serif}
        .ce .st b{font-weight:500;font-size:13.5px;letter-spacing:.14em;text-transform:uppercase}.ce .st span{font-size:15px;line-height:1.5;color:${MU};max-width:230px}
        .ce .ch{color:${RO};font-size:28px;font-family:'Jost',sans-serif;padding-top:6px}
        .ce .rev{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:84px}
        .ce .rc{background:${BG2};border-radius:3px;padding:26px;border:1px solid ${LN}}
        .ce .rc p{font-size:19px;line-height:1.45;margin:0 0 16px}
        .ce .rc b{font-family:'Jost',sans-serif;font-size:13.5px;letter-spacing:.14em;text-transform:uppercase;font-weight:500;color:${BR}}
        .ce .band{background:${RO};color:#fff;text-align:center;padding:38px 20px;margin-top:84px}
        .ce .band h3{margin:0;font-weight:400;font-size:clamp(28px,4vw,48px);letter-spacing:.18em;text-transform:uppercase}
        .ce .band .btn{margin-top:18px;background:#fff;color:${RD};border-color:#fff}.ce .band .btn:hover{background:${BG};color:${RD}}
        .ce footer{background:${BR};color:#eadccd}
        .ce .fr{display:grid;grid-template-columns:auto 1fr;gap:44px;align-items:center;padding:34px 28px}
        .ce .fp{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.ce .fp img{display:block;width:100%;aspect-ratio:1/1;object-fit:cover;border-radius:2px}
        .ce .fl{font-family:'Jost',sans-serif;font-size:14.5px;line-height:1.8;padding:0 28px 22px;display:flex;gap:26px;flex-wrap:wrap;justify-content:space-between;max-width:1160px;margin:0 auto}
        .ce .fl a{color:#fff;cursor:pointer;padding:6px 0}
        .ce .dm{border-top:1px solid rgba(255,255,255,.2);font-family:'Jost',sans-serif;font-size:14.5px;color:#eadccd;padding:16px 28px 22px;max-width:1160px;margin:0 auto}
        .ce .wa{position:fixed;right:18px;bottom:18px;z-index:40;width:58px;height:58px;border-radius:50%;background:#25d366;display:grid;place-items:center;box-shadow:0 8px 24px rgba(0,0,0,.3)}
        .ce .ov{position:fixed;inset:0;z-index:100;background:rgba(58,38,32,.7);display:flex;align-items:center;justify-content:center;padding:16px}
        .ce .md{background:${BG2};width:100%;max-width:520px;max-height:92vh;overflow:auto;padding:34px;border-radius:4px;position:relative;border-top:6px solid ${RO}}
        .ce .md h3{font-weight:400;font-size:32px;margin:8px 0 4px}
        .ce .eb2{font-family:'Jost',sans-serif;font-size:12.5px;font-weight:600;color:${RD};text-transform:uppercase;letter-spacing:.18em}
        .ce .bars{display:flex;gap:6px;margin:14px 0 20px}.ce .bars i{flex:1;height:4px;background:${LN}}.ce .bars i.on{background:${RO}}
        .ce .opt{padding:14px 10px;border:1.5px solid ${LN};border-radius:2px;background:#fff;cursor:pointer;font-family:'Jost',sans-serif;font-size:15.5px;font-weight:500;text-align:center;min-height:52px;color:${BR}}
        .ce .opt:hover{border-color:${RO}}.ce .opt.on{background:${RO};color:#fff;border-color:${RO}}
        .ce .x{position:absolute;right:12px;top:14px;width:44px;height:44px;border:0;background:none;font-size:28px;cursor:pointer;color:${BR}}
        .ce .mob{display:none}
        .ce :focus-visible{outline:3px solid ${RD};outline-offset:2px}
        .ce .band :focus-visible,.ce footer :focus-visible{outline-color:#fff}
        @media(max-width:900px){
          .ce .links,.ce .navbtn{display:none}.ce .burger{display:grid;margin-left:auto}.ce .nav{height:72px}
          .ce .hg{grid-template-columns:1fr;gap:20px}.ce .eye{margin-top:14px}
          .ce .card{position:relative;left:0;right:0;bottom:0;margin:-50px 14px 0}
          .ce .tiles{grid-template-columns:1fr;margin-top:40px}.ce .tile{aspect-ratio:1.3/1}
          .ce .made{grid-template-columns:1fr;gap:26px}
          .ce .sg{grid-template-columns:1fr;gap:26px}.ce .ch{display:none}
          .ce .rev{grid-template-columns:1fr}.ce .steps,.ce .rev,.ce .band{margin-top:60px}
          .ce .fr{grid-template-columns:1fr;gap:22px}
          .ce .mob{display:block;background:${BG2};border:1px solid ${LN};margin:0 0 12px}.ce .mob a{display:block;padding:15px 18px;font-family:'Jost',sans-serif;font-size:14px;letter-spacing:.12em;text-transform:uppercase;font-weight:500;cursor:pointer;border-top:1px solid ${LN}}.ce .mob a:first-child{border-top:0}
          .ce .md{padding:28px 20px}
        }
      `}</style>

      <div className="wrap" id="top">
        <header className="nav">
          <div className="logo"><Mono s={42} /><i /><div><b>{brand.replace(/ Cerimonial$/i, "")}</b><small>CERIMONIAL</small></div></div>
          <nav className="links"><a onClick={() => go("servicos")}>Serviços</a><a onClick={() => go("galeria")}>Galeria</a><a onClick={() => go("sobre")}>Sobre</a><a onClick={() => go("contato")}>Contato</a></nav>
          <button type="button" className="btn navbtn" onClick={() => start()}>Consultar data</button>
          <button type="button" className="burger" aria-label="Menu" onClick={() => setMenu((m) => !m)}><svg width="22" height="22" viewBox="0 0 26 26" stroke={BR} strokeWidth="2" strokeLinecap="round"><path d="M3 7h20M3 13h20M3 19h20" /></svg></button>
        </header>
        {menu && <div className="mob"><a onClick={() => go("servicos")}>Serviços</a><a onClick={() => go("galeria")}>Galeria</a><a onClick={() => go("sobre")}>Sobre</a><a onClick={() => start()}>Consultar data</a></div>}

        <div className="hg">
          <div>
            <p className="eye">{city}</p>
            <h1>Planejamento sereno, casamentos <em>felizes</em></h1>
            <p className="lead">Planejamento atento, design bonito e uma experiência tranquila do primeiro café até a última dança.</p>
            <div className="hb"><button type="button" className="btn" onClick={() => start()}>Consultar data</button><button type="button" className="btn o" onClick={() => go("servicos")}>Saiba mais</button></div>
          </div>
          <div className="ph">
            <img className="main" src="/ce-h1.webp" alt="Mesa de casamento ao ar livre iluminada ao entardecer" />
            <div className="card">
              <span className="eb">Peça informações</span>
              <div className="row"><label className="lb">Nome<input className="fld" readOnly placeholder="Seu nome" onFocus={() => start()} onClick={() => start()} /></label><label className="lb">Telefone<input className="fld" readOnly placeholder="(31) 9" onFocus={() => start()} onClick={() => start()} /></label><button type="button" className="btn" onClick={() => start()}>Enviar pedido</button></div>
            </div>
          </div>
        </div>

        <section className="tiles" id="servicos">
          {SERV.map((s) => (<button type="button" className="tile" key={s.k} onClick={() => start()} aria-label={s.k}><img src={s.img} alt="" loading="lazy" /><span>{s.k}</span></button>))}
        </section>

        <section className="made" id="sobre">
          <img src="/ce-s1.webp" alt="Salão de eventos com janelas grandes e lustre" loading="lazy" />
          <div>
            <h2>Feito para os <em>seus</em> momentos</h2>
            <div className="rule" />
            <p className="p">Planejamento e design sob medida para tirar a sua ideia do papel, com cronograma claro, fornecedores de confiança e uma equipe que cuida de tudo no dia.</p>
          </div>
        </section>

        <section className="steps" id="galeria">
          <div className="eyec">Reservar é simples</div>
          <div className="sg">
            {STEPS.map((s, i) => { const I = ICONS[i]!; return (
              <>
                <div className="st" key={s.t}><I /><b>{s.t}</b><span>{s.d}</span></div>
                {i < 2 && <span className="ch" aria-hidden key={`c${i}`}>›</span>}
              </>
            ); })}
          </div>
        </section>

        <section className="rev">
          {REVS.map((r) => (<div className="rc" key={r.n}><p>“{r.t}”</p><b>{r.n}</b></div>))}
        </section>
      </div>

      <div className="band" id="contato"><h3>Consulte a data</h3><button type="button" className="btn" onClick={() => start()}>Quero consultar</button></div>

      <footer>
        <div className="fr">
          <div className="logo" style={{ color: "#fff" }}><Mono c="#fff" s={42} /><i style={{ background: "#fff" }} /><div><b>{brand.replace(/ Cerimonial$/i, "")}</b><small style={{ color: "#eadccd" }}>CERIMONIAL</small></div></div>
          <div className="fp"><img src="/ce-f1.webp" alt="Buquê de noiva" loading="lazy" /><img src="/ce-t1.webp" alt="Arco de flores" loading="lazy" /><img src="/ce-t3.webp" alt="Mesa com flores e velas" loading="lazy" /><img src="/ce-f4.webp" alt="Cidade ao entardecer" loading="lazy" /></div>
        </div>
        <div className="fl">
          <div>Rua da Bahia, 1480, {city}<br />Atendimento com hora marcada, seg a sáb</div>
          <div><a href={`https://wa.me/${num}`} target="_blank" rel="noreferrer" style={{ textDecoration: "underline", fontWeight: 500 }}>WhatsApp: fale com a gente</a><br />Instagram: @auroralima.cerimonial</div>
        </div>
        <div className="dm">Site de demonstração: fotos, nomes dos clientes, preços e endereço são ilustrativos.</div>
      </footer>

      {sc && !open && (<a className="wa" href={`https://wa.me/${num}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg></a>)}

      {open && (
        <div className="ov" onClick={() => setOpen(false)}>
          <div className="md" ref={mdRef} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Consultar data do evento">
            <button type="button" className="x" aria-label="Fechar" onClick={() => setOpen(false)}>×</button>
            <span className="eb2">Consulta sem compromisso</span>
            <h3>{stepTitle}</h3>
            <div className="bars">{[1, 2, 3, 4].map((n) => (<i key={n} className={n <= step ? "on" : ""} />))}</div>
            {step === 1 && (<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>{TYPES.map((l) => (<button type="button" key={l} className={`opt${tp === l ? " on" : ""}`} onClick={() => { setTp(l); setStep(2); }}>{l}</button>))}</div>)}
            {step === 2 && (<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>{GUESTS.map((l) => (<button type="button" key={l} className={`opt${gs === l ? " on" : ""}`} onClick={() => { setGs(l); setStep(3); }}>{l}</button>))}</div>)}
            {step === 3 && (<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>{TIMES.map((x) => (<button type="button" key={x} className={`opt${tm === x ? " on" : ""}`} onClick={() => { setTm(x); setStep(4); }}>{x}</button>))}</div>)}
            {step === 4 && (
              <div>
                <label style={{ fontFamily: "'Jost',sans-serif", fontSize: 14.5, fontWeight: 500 }}>Seu nome<input value={cust} onChange={(e) => setCust(e.target.value)} placeholder="Como podemos te chamar?" style={{ display: "block", width: "100%", marginTop: 8, padding: "15px 16px", borderRadius: 2, border: `1.5px solid ${LN}`, fontSize: 16, fontFamily: "'Jost',sans-serif", background: "#fff" }} /></label>
                <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 14.5, color: MU, margin: "14px 0 18px" }}>{tp} · {gs} · {tm}</p>
                <a className="btn" style={{ width: "100%" }} href={wa} target="_blank" rel="noreferrer">Confirmar no WhatsApp</a>
                <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 13, color: MU, textAlign: "center", margin: "12px 0 0" }}>Abre o WhatsApp com a mensagem pronta. Nada é enviado antes de você tocar em enviar.</p>
              </div>
            )}
            {step > 1 && <button type="button" onClick={() => setStep(step - 1)} style={{ background: "none", border: 0, marginTop: 14, color: RD, fontFamily: "'Jost',sans-serif", fontWeight: 500, cursor: "pointer", fontSize: 14.5, minHeight: 44 }}>← Voltar</button>}
          </div>
        </div>
      )}
    </div>
  );
}
