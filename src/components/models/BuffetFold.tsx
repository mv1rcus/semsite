import { useEffect, useRef, useState } from "react";

/** Buffet de festas novo, a partir de um pin rosa e roxo: título serifado com destaque em roxo, colagem de fotos em losangos, faixa roxa de passos, cards de pacote com foto redonda. Orçamento em 3 passos que fecha no WhatsApp. */
const PU = "#8a2a96", PD = "#6b1f75", PK = "#ffd9fb", PS = "#fff0fd", DK = "#1c0a22", MU = "#5e4a63", LN = "#ecd3ef", GR = "#f1eef2", OR = "#e8610a";
const TYPES = ["Aniversário", "Casamento", "Festa infantil", "Corporativo", "Formatura", "Outra festa"];
const PKGS = [
  { k: "Salgados e finger food", p: "R$ 45", u: "por pessoa", img: "/bf-p1.webp", n: "Até 100 convidados" },
  { k: "Churrasco completo", p: "R$ 89", u: "por pessoa", img: "/bf-p2.webp", n: "Carnes e acompanhamentos" },
  { k: "Massas e italiana", p: "R$ 72", u: "por pessoa", img: "/bf-p3.webp", n: "Estação ao vivo" },
  { k: "Doces e bolo", p: "R$ 38", u: "por pessoa", img: "/bf-p4.webp", n: "Mesa decorada" },
];
const SPACES = [
  { k: "Salão Jardim", c: "Até 150 pessoas", img: "/bf-e1.webp" },
  { k: "Terraço Pôr do Sol", c: "Até 80 pessoas", img: "/bf-e2.webp" },
  { k: "Espaço Kids", c: "Até 60 pessoas", img: "/bf-e3.webp" },
  { k: "Sala Executiva", c: "Até 40 pessoas", img: "/bf-e4.webp" },
];
const STEPS = [
  { t: "Conte sobre a festa", d: "Tipo, data e número de convidados, em 1 minuto." },
  { t: "Receba o orçamento", d: "Proposta com cardápio e valor fechado pelo WhatsApp." },
  { t: "Prove e aprove", d: "Degustação para você escolher cada prato com calma." },
  { t: "Aproveite a festa", d: "Equipe de cozinha e salão cuida de tudo no dia." },
];
const REVS = [
  { n: "Camila R.", t: "Casamento com 120 convidados. A comida chegou quentinha e a equipe resolveu tudo sem eu pedir." },
  { n: "Marcos P.", t: "Fizemos a confraria da empresa aqui. Cardápio variado e ninguém ficou esperando prato." },
  { n: "Letícia S.", t: "O aniversário de 15 anos da minha filha ficou lindo. A mesa de doces foi o sucesso da noite." },
];
const GUESTS = ["Até 30", "30 a 60", "60 a 120", "Mais de 120"];
const TIMES = ["Manhã", "Tarde", "Noite", "Ainda não sei"];
const Leaf = ({ c = PU, s = 28 }: { c?: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" fill={c} aria-hidden><path d="M16 4c3 4 3 9 0 13-3-4-3-9 0-13zM7 10c4 1 7 4 8 9-4-1-7-4-8-9zM25 10c-1 5-4 8-8 9 1-5 4-8 8-9zM15 20h2v8h-2z" /></svg>
);
const Ar = () => <span aria-hidden style={{ color: PU, letterSpacing: 2, fontSize: 14 }}>«« </span>;
const Al = () => <span aria-hidden style={{ color: PU, letterSpacing: 2, fontSize: 14 }}> »»</span>;
const DIA: [string, number, number, number, string][] = [
  ["/bf-d1.webp", 27, 22, 44, "Mesa de buffet farta"], ["/bf-d2.webp", 58, 2, 30, "Chef finalizando um prato"], ["/bf-d3.webp", 76, 32, 24, "Convidados brindando"],
  ["/bf-d4.webp", 0, 30, 24, "Canapés em bandeja"], ["/bf-d5.webp", 22, 62, 30, "Mesa de doces"], ["/bf-d6.webp", 54, 58, 26, "Estação de massas"], ["/bf-d7.webp", 80, 62, 18, "Churrasco fatiado"],
];

export function BuffetFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Buffet Casa Ameixa";
  const city = client?.city?.trim() || "Ribeirão Preto";
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
  const start = (pre?: string) => { setStep(pre ? 2 : 1); setTp(pre ?? ""); setGs(""); setTm(""); setOpen(true); setMenu(false); };
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero um orçamento de buffet na ${brand}${cust ? ` em nome de ${cust}` : ""}. Tipo de festa: ${tp}. Convidados: ${gs}. Período: ${tm}.`)}`;
  const stepTitle = step === 1 ? "Que festa vai ser?" : step === 2 ? "Quantos convidados?" : step === 3 ? "Qual período?" : "Quase lá!";

  return (
    <div className="bf" style={{ fontFamily: "'Lora', Georgia, serif", color: DK, background: GR, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=Mulish:wght@400;500;600;700&display=swap');
        .bf *{box-sizing:border-box}
        .bf h1,.bf h2,.bf h3{font-family:inherit}
        .bf a,.bf button{font-family:inherit}
        .bf .wrap{max-width:1140px;margin:0 auto;padding:0 24px}
        .bf .sans{font-family:'Mulish',system-ui,sans-serif}
        .bf .nav{display:flex;align-items:center;gap:24px;height:84px}
        .bf .logo{display:flex;align-items:center;gap:8px;font-weight:700;font-size:20px;color:${PD}}
        .bf .links{display:flex;gap:26px;font-size:13.5px;font-family:'Mulish',sans-serif;font-weight:600;margin-left:auto}
        .bf .links a{cursor:pointer;color:${DK};padding:12px 2px}.bf .links a:hover{color:${PU}}
        .bf .btn{background:${PU};color:#fff;border:2px solid ${PU};border-radius:6px;padding:0 24px;min-height:48px;font-family:'Mulish',sans-serif;font-weight:700;font-size:15px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:8px;transition:background .15s}
        .bf .btn:hover{background:${PD};border-color:${PD}}
        .bf .btn.o{background:transparent;color:${PD};border-color:${PD}}.bf .btn.o:hover{background:${PD};color:#fff}
        .bf .btn.sm{min-height:44px;padding:0 18px;font-size:14px}
        .bf .burger{display:none;flex:none;background:#fff;border:0;border-radius:8px;width:46px;height:46px;cursor:pointer}
        .bf .hero{background:linear-gradient(180deg,${PK},#ffcdf8);border-radius:0 0 28px 28px}
        .bf .hg{display:grid;grid-template-columns:1fr 1fr;gap:30px;align-items:center;padding:30px 0 90px}
        .bf h1{font-size:clamp(34px,4.4vw,54px);line-height:1.15;font-weight:700;margin:0 0 18px}
        .bf h1 em{font-style:normal;color:${PU}}
        .bf .lead{font-family:'Mulish',sans-serif;font-size:17px;line-height:1.65;color:${MU};max-width:440px;margin:0 0 24px}
        .bf .find{display:flex;max-width:440px;background:#fff;border-radius:6px;overflow:hidden;border:2px solid ${PU}}
        .bf .find span{flex:1;padding:0 16px;display:flex;align-items:center;font-family:'Mulish',sans-serif;font-size:15px;color:${MU}}
        .bf .find button{border:0;border-radius:0;min-height:52px}
        .bf .pop{margin-top:22px;font-family:'Mulish',sans-serif;font-weight:700;font-size:14px}
        .bf .chips{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px}
        .bf .chips button{background:#fff;border:0;border-radius:10px;padding:0 16px;min-height:44px;font-family:'Mulish',sans-serif;font-weight:700;font-size:14px;color:${PD};cursor:pointer;box-shadow:0 4px 12px rgba(107,31,117,.12)}
        .bf .chips button:hover{background:${PD};color:#fff}
        .bf .dia{position:relative;width:100%;aspect-ratio:1/1;max-width:520px;margin-left:auto}
        .bf .dia img{position:absolute;object-fit:cover;aspect-ratio:1/1;clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%)}
        .bf .band{background:${PU};color:#fff;margin-top:-1px;padding:30px 0}
        .bf .bg3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;text-align:center;font-family:'Mulish',sans-serif;font-weight:700;font-size:16px}
        .bf .bg3 svg{display:block;margin:0 auto 10px}
        .bf .sec{padding:80px 0 0}
        .bf h2{font-size:clamp(26px,3vw,34px);text-align:center;margin:0;font-weight:700}
        .bf h2 em{font-style:normal;color:${PU}}
        .bf .sub{font-family:'Mulish',sans-serif;text-align:center;font-size:14.5px;color:${MU};max-width:560px;margin:10px auto 0;line-height:1.55}
        .bf .pg{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:70px}
        .bf .pc{background:#fff;border-radius:12px;padding:0 14px 18px;text-align:center;box-shadow:0 8px 24px rgba(28,10,34,.07);display:flex;flex-direction:column;align-items:center}
        .bf .pc img{width:150px;height:150px;border-radius:50%;object-fit:cover;margin-top:-50px;border:4px solid #fff;box-shadow:0 6px 18px rgba(28,10,34,.15)}
        .bf .pc b{font-size:16px;margin-top:12px}.bf .pc small{font-family:'Mulish',sans-serif;font-size:13.5px;color:${MU};margin-top:4px}
        .bf .pc .pr{font-size:22px;font-weight:700;margin:8px 0 12px;color:${DK}}.bf .pc .pr span{font-family:'Mulish',sans-serif;font-size:13px;font-weight:600;color:${MU}}
        .bf .sg{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:40px}
        .bf .sc{background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 8px 24px rgba(28,10,34,.07);padding:0 0 14px;text-align:left;border:0;cursor:pointer;color:${DK}}
        .bf .sc img{display:block;width:100%;aspect-ratio:3/3.6;object-fit:cover}
        .bf .sc b{display:block;margin:12px 14px 0;font-size:16px}.bf .sc small{display:block;margin:2px 14px 0;font-family:'Mulish',sans-serif;font-size:13.5px;color:${MU}}
        .bf .sc .ex{display:block;margin:10px 14px 0;font-family:'Mulish',sans-serif;font-weight:700;font-size:14px;color:${PD}}
        .bf .how{display:grid;grid-template-columns:1fr 1fr;gap:50px;align-items:center}
        .bf .how img{display:block;width:100%;aspect-ratio:4/3.4;object-fit:cover;border-radius:18px}
        .bf .hs{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:22px}
        .bf .hc{background:#fff;border-radius:12px;padding:16px;box-shadow:0 6px 18px rgba(28,10,34,.06)}
        .bf .hc i{font-style:normal;display:inline-grid;place-items:center;width:30px;height:30px;border-radius:50%;background:${PK};color:${PD};font-family:'Mulish',sans-serif;font-weight:800;font-size:14px}
        .bf .hc b{display:block;margin-top:8px;font-size:15.5px}.bf .hc span{display:block;font-family:'Mulish',sans-serif;font-size:14px;line-height:1.5;color:${MU};margin-top:4px}
        .bf .ban{position:relative;border-radius:16px;overflow:hidden;margin-top:80px;min-height:230px;display:grid;place-items:center;background:url("/bf-ban.webp") center/cover}
        .bf .ban div{background:${PD};color:#fff;text-align:center;padding:28px 56px;border-radius:14px;margin:20px}
        .bf .ban b{display:block;font-size:34px}.bf .ban span{display:block;font-family:'Mulish',sans-serif;font-size:16px;margin-top:6px}
        .bf .tiles{display:grid;grid-template-columns:1fr 1fr;margin-top:40px;border-radius:12px;overflow:hidden}
        .bf .tiles button{border:0;min-height:170px;color:#fff;font-size:28px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;background-size:cover;background-position:center;display:grid;place-items:center}
        .bf .tiles button span{border:2px solid rgba(255,255,255,.85);padding:18px 40px;border-radius:6px;background:rgba(28,10,34,.55)}
        .bf .rg{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:36px}
        .bf .rc{background:#fff;border-radius:12px;padding:20px;box-shadow:0 8px 24px rgba(28,10,34,.07)}
        .bf .rc b{display:flex;align-items:center;gap:10px;font-size:15px}.bf .rc b i{font-style:normal;display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:${PU};color:#fff;font-family:'Mulish',sans-serif;font-size:14px}
        .bf .rc p{font-family:'Mulish',sans-serif;font-size:14.5px;line-height:1.6;color:${MU};margin:12px 0}
        .bf .rc .st{color:${OR};letter-spacing:2px;font-size:15px}
        .bf .cta{background:#4a1c54;border-radius:12px;color:#fff;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;padding:30px 34px;margin:70px 0 60px}
        .bf .cta h3{margin:0;font-size:26px}.bf .cta p{font-family:'Mulish',sans-serif;margin:6px 0 0;font-size:15px;color:#f1d9f5}
        .bf footer{background:#1c0a22;color:#e9d7ee;padding:44px 0 26px;border-radius:24px 24px 0 0;font-family:'Mulish',sans-serif}
        .bf .fr{display:flex;justify-content:space-between;gap:26px;flex-wrap:wrap;font-size:14.5px;line-height:1.8}
        .bf .fr nav{display:flex;gap:22px;flex-wrap:wrap;align-items:flex-start}.bf .fr nav a{cursor:pointer;color:#e9d7ee;padding:8px 0}
        .bf .wa{position:fixed;right:18px;bottom:18px;z-index:40;width:58px;height:58px;border-radius:50%;background:#25d366;display:grid;place-items:center;box-shadow:0 8px 24px rgba(0,0,0,.3)}
        .bf .ov{position:fixed;inset:0;z-index:100;background:rgba(28,10,34,.68);display:flex;align-items:center;justify-content:center;padding:16px}
        .bf .md{background:#fff;width:100%;max-width:520px;max-height:92vh;overflow:auto;padding:32px;border-radius:16px;position:relative;border-top:8px solid ${PU}}
        .bf .md h3{font-weight:700;font-size:28px;margin:10px 0 4px}
        .bf .eb{font-family:'Mulish',sans-serif;font-size:13px;font-weight:800;color:${PD};text-transform:uppercase;letter-spacing:.1em}
        .bf .bars{display:flex;gap:6px;margin:14px 0 20px}.bf .bars i{flex:1;height:6px;border-radius:6px;background:${LN}}.bf .bars i.on{background:${PU}}
        .bf .opt{padding:14px 10px;border:2px solid ${LN};border-radius:10px;background:#fff;cursor:pointer;font-family:'Mulish',sans-serif;font-size:15px;font-weight:700;text-align:center;min-height:52px;color:${DK}}
        .bf .opt:hover{border-color:${PU}}.bf .opt.on{background:${PU};color:#fff;border-color:${PU}}
        .bf .x{position:absolute;right:14px;top:16px;width:44px;height:44px;border:0;background:none;font-size:28px;cursor:pointer;color:${DK}}
        .bf .mob{display:none}
        .bf :focus-visible{outline:3px solid ${PD};outline-offset:2px}
        .bf .band :focus-visible,.bf .cta :focus-visible,.bf footer :focus-visible{outline-color:#fff}
        @media(max-width:900px){
          .bf .links{display:none}.bf .burger{display:grid;place-items:center;margin-left:auto}.bf .nav{height:68px;gap:10px}.bf .navbtn{display:none}
          .bf .hg{grid-template-columns:1fr;padding:6px 0 60px}.bf .dia{margin:0 auto;max-width:380px}
          .bf .bg3{grid-template-columns:1fr;gap:18px}
          .bf .sec{padding-top:56px}.bf .pg{grid-template-columns:1fr 1fr;gap:64px 14px}.bf .pc img{width:110px;height:110px;margin-top:-40px}
          .bf .sg{grid-template-columns:1fr 1fr;gap:12px}.bf .how{grid-template-columns:1fr;gap:26px}.bf .hs{grid-template-columns:1fr}
          .bf .ban div{padding:22px 24px}.bf .ban b{font-size:26px}.bf .tiles{grid-template-columns:1fr}.bf .tiles button{min-height:130px;font-size:22px}
          .bf .rg{grid-template-columns:1fr}.bf .cta{padding:26px 22px;margin:50px 0 40px}
          .bf .mob{display:block;background:#fff;border-radius:12px;margin:0 0 12px;box-shadow:0 8px 24px rgba(28,10,34,.15)}.bf .mob a{display:block;padding:15px 20px;font-family:'Mulish',sans-serif;font-size:15px;font-weight:700;cursor:pointer;border-top:1px solid ${LN}}.bf .mob a:first-child{border:0}
          .bf .md{padding:26px 20px}
        }
      `}</style>

      <div className="hero" id="top"><div className="wrap">
        <header className="nav">
          <div className="logo"><Leaf s={26} />{brand}</div>
          <nav className="links"><a onClick={() => go("top")}>Início</a><a onClick={() => go("pacotes")}>Pacotes</a><a onClick={() => go("espacos")}>Espaços</a><a onClick={() => go("como")}>Como funciona</a><a onClick={() => go("avaliacoes")}>Avaliações</a></nav>
          <button type="button" className="btn o sm navbtn" onClick={() => start()}>Orçamento</button>
          <button type="button" className="btn sm navbtn" onClick={() => start()}>Reservar data</button>
          <button type="button" className="burger" aria-label="Menu" onClick={() => setMenu((m) => !m)}><svg width="24" height="24" viewBox="0 0 26 26" stroke={DK} strokeWidth="2.4" strokeLinecap="round"><path d="M3 7h20M3 13h20M3 19h20" /></svg></button>
        </header>
        {menu && <div className="mob"><a onClick={() => go("pacotes")}>Pacotes</a><a onClick={() => go("espacos")}>Espaços</a><a onClick={() => go("como")}>Como funciona</a><a onClick={() => start()}>Pedir orçamento</a></div>}
        <div className="hg">
          <div>
            <h1>Festa <em>completa</em> e comida <em>fresquinha</em> no seu dia</h1>
            <p className="lead">Buffet para casamentos, aniversários e eventos em {city}. Cardápio variado, equipe de salão e degustação antes de fechar.</p>
            <div className="find"><span>Data e número de convidados</span><button type="button" className="btn" onClick={() => start()}>Ver orçamento</button></div>
            <div className="pop">Festas mais pedidas</div>
            <div className="chips">{TYPES.slice(0, 5).map((t) => (<button type="button" key={t} onClick={() => start(t)}>{t}</button>))}</div>
          </div>
          <div className="dia">
            {DIA.map(([src, x, y, w, alt]) => (<img key={src} src={src} alt={alt} style={{ left: `${x}%`, top: `${y}%`, width: `${w * 1.12}%` }} />))}
          </div>
        </div>
      </div></div>

      <div className="band"><div className="wrap bg3">
        <div><Leaf c="#fff" s={30} />Escolha a data da sua festa</div>
        <div><Leaf c="#fff" s={30} />Monte o cardápio da semana</div>
        <div><Leaf c="#fff" s={30} />Tudo chega quente, pronto para servir</div>
      </div></div>

      <section className="sec" id="pacotes"><div className="wrap">
        <h2><Ar />Pacotes de <em>buffet</em><Al /></h2>
        <p className="sub">Quatro formatos prontos, todos com equipe, louça e reposição durante a festa.</p>
        <div className="pg">
          {PKGS.map((c) => (
            <div className="pc" key={c.k}>
              <img src={c.img} alt={c.k} loading="lazy" />
              <b>{c.k}</b><small>{c.n}</small>
              <div className="pr">{c.p} <span>{c.u}</span></div>
              <button type="button" className="btn sm" onClick={() => start()}>Pedir orçamento</button>
            </div>
          ))}
        </div>
      </div></section>

      <section className="sec" id="espacos"><div className="wrap">
        <h2><Ar />Espaços <em>para sua festa</em><Al /></h2>
        <p className="sub">Salões próprios ou levamos o buffet até o local que você já escolheu.</p>
        <div className="sg">
          {SPACES.map((s) => (
            <button type="button" className="sc" key={s.k} onClick={() => start()}>
              <img src={s.img} alt={s.k} loading="lazy" />
              <b>{s.k}</b><small>{s.c}</small><span className="ex">Consultar data →</span>
            </button>
          ))}
        </div>
      </div></section>

      <section className="sec" id="como"><div className="wrap how">
        <div>
          <h2 style={{ textAlign: "left" }}>Como <em>funciona</em></h2>
          <p className="sub" style={{ textAlign: "left", margin: "10px 0 0" }}>Do primeiro contato ao último brinde, a gente cuida do cardápio e da equipe.</p>
          <div className="hs">
            {STEPS.map((s, i) => (<div className="hc" key={s.t}><i>{i + 1}</i><b>{s.t}</b><span>{s.d}</span></div>))}
          </div>
        </div>
        <img src="/bf-t1.webp" alt="Anfitriã planejando uma festa" loading="lazy" />
      </div></section>

      <div className="wrap">
        <div className="ban"><div><b>Festa de segunda a quinta</b><span>10% de desconto em datas de semana este mês</span></div></div>
        <div className="tiles">
          <button type="button" style={{ backgroundImage: 'linear-gradient(rgba(28,10,34,.35),rgba(28,10,34,.35)),url("/bf-t1.webp")' }} onClick={() => start()}><span>Reservar data</span></button>
          <button type="button" style={{ backgroundImage: 'linear-gradient(rgba(28,10,34,.35),rgba(28,10,34,.35)),url("/bf-t2.webp")' }} onClick={() => go("pacotes")}><span>Ver cardápio</span></button>
        </div>
      </div>

      <section className="sec" id="avaliacoes"><div className="wrap">
        <h2><Ar />O que <em>dizem</em> os clientes<Al /></h2>
        <p className="sub">Mais de 400* festas atendidas na região.</p>
        <div className="rg">
          {REVS.map((r) => (<div className="rc" key={r.n}><b><i>{r.n[0]}</i>{r.n}</b><p>{r.t}</p><div className="st" aria-label="5 estrelas">★★★★★</div></div>))}
        </div>
        <div className="cta">
          <div><h3>Ganhe a degustação do cardápio</h3><p>Peça o orçamento e a gente agenda uma prova para até 4 pessoas.</p></div>
          <button type="button" className="btn" style={{ background: "#fff", color: PD, borderColor: "#fff" }} onClick={() => start()}>Pedir orçamento</button>
        </div>
      </div></section>

      <footer><div className="wrap fr">
        <div><span style={{ fontFamily: "Lora,serif", fontWeight: 700, fontSize: 22, color: "#fff" }}>{brand}</span><div style={{ marginTop: 8 }}>Av. Presidente Vargas, 1250, {city}<br />Seg a sáb, 9h às 19h</div></div>
        <nav><a onClick={() => go("pacotes")}>Pacotes</a><a onClick={() => go("espacos")}>Espaços</a><a onClick={() => go("como")}>Como funciona</a><a onClick={() => go("avaliacoes")}>Avaliações</a></nav>
        <div><a href={`https://wa.me/${num}`} target="_blank" rel="noreferrer" style={{ color: "#fff", fontWeight: 700, textDecoration: "underline" }}>WhatsApp: fale com a gente</a><br />Instagram: @casaameixa</div>
      </div><div className="wrap" style={{ marginTop: 22, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.2)", fontSize: 14.5, color: "#f1e3f5" }}>Site de demonstração: fotos, nomes dos clientes, números (*), preços e endereço são ilustrativos.</div></footer>

      {sc && !open && (<a className="wa" href={`https://wa.me/${num}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 32 32" fill="#fff"><path d="M16 3a13 13 0 0 0-11 19.700L3 29l6.500-2A13 13 0 1 0 16 3zm0 2.400A10.600 10.600 0 1 1 9.600 24l-.4-.3-3.800 1.100 1.200-3.700-.3-.4A10.600 10.600 0 0 1 16 5.400zm-4 5.300c-.3 0-.7.100-1 .5-.4.400-1.300 1.300-1.300 3.100s1.400 3.600 1.500 3.800c.2.200 2.600 4.100 6.400 5.600 3.100 1.200 3.800.9 4.500.9.700-.1 2.200-.9 2.500-1.800.3-.9.300-1.600.2-1.800-.1-.2-.3-.3-.7-.5l-2.300-1.100c-.3-.1-.6-.2-.8.200-.2.300-.9 1.100-1.100 1.300-.2.200-.4.300-.7.100-.4-.2-1.500-.6-2.800-1.700-1-.9-1.700-2.100-1.900-2.400-.2-.4 0-.6.200-.8l.5-.6c.2-.2.200-.4.400-.6.100-.3 0-.5 0-.6l-1-2.400c-.3-.6-.5-.5-.7-.5z" /></svg></a>)}

      {open && (
        <div className="ov" onClick={() => setOpen(false)}>
          <div className="md" ref={mdRef} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Pedir orçamento de buffet">
            <button type="button" className="x" aria-label="Fechar" onClick={() => setOpen(false)}>×</button>
            <span className="eb">Orçamento sem compromisso</span>
            <h3>{stepTitle}</h3>
            <div className="bars">{[1, 2, 3, 4].map((n) => (<i key={n} className={n <= step ? "on" : ""} />))}</div>
            {step === 1 && (<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>{TYPES.map((l) => (<button type="button" key={l} className={`opt${tp === l ? " on" : ""}`} onClick={() => { setTp(l); setStep(2); }}>{l}</button>))}</div>)}
            {step === 2 && (<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>{GUESTS.map((l) => (<button type="button" key={l} className={`opt${gs === l ? " on" : ""}`} onClick={() => { setGs(l); setStep(3); }}>{l}</button>))}</div>)}
            {step === 3 && (<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>{TIMES.map((x) => (<button type="button" key={x} className={`opt${tm === x ? " on" : ""}`} onClick={() => { setTm(x); setStep(4); }}>{x}</button>))}</div>)}
            {step === 4 && (
              <div>
                <label style={{ fontSize: 14, fontWeight: 700 }}>Seu nome<input value={cust} onChange={(e) => setCust(e.target.value)} placeholder="Como podemos te chamar?" style={{ display: "block", width: "100%", marginTop: 8, padding: "15px 16px", borderRadius: 14, border: `2px solid ${LN}`, fontSize: 16, fontFamily: "inherit" }} /></label>
                <p style={{ fontSize: 14, color: MU, margin: "14px 0 18px" }}>{tp} · {gs} · {tm}</p>
                <a className="btn" style={{ width: "100%", textDecoration: "none" }} href={wa} target="_blank" rel="noreferrer">Confirmar no WhatsApp</a>
                <p style={{ fontSize: 12.5, color: MU, textAlign: "center", margin: "12px 0 0" }}>Abre o WhatsApp com a mensagem pronta. Nada é enviado antes de você tocar em enviar.</p>
              </div>
            )}
            {step > 1 && <button type="button" onClick={() => setStep(step - 1)} style={{ background: "none", border: 0, marginTop: 14, color: PD, fontWeight: 700, cursor: "pointer", fontSize: 14, minHeight: 44 }}>← Voltar</button>}
          </div>
        </div>
      )}
    </div>
  );
}
