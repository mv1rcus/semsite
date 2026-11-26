import { useEffect, useRef, useState } from "react";

/** Espaço de eventos a partir de um pin de venue: coluna lateral fixa com logo serifado empilhado e menu vertical em caixa-alta, hero em foto cheia com título serifado centrado, bloco de vídeo, faixa de dança, três lugares, depoimento sobre foto escura e contato. Consulta em 4 passos que fecha no WhatsApp. */
const SA = "#c9684f", SD = "#9c4a35", BK = "#1b1b1b", MU = "#4d4d4d", LN = "#e3ddd5", OF = "#efeae3";
const TYPES = ["Casamento", "Aniversário", "Formatura", "Evento corporativo", "Confraternização", "Outro evento"];
const GUESTS = ["Até 50", "50 a 100", "100 a 200", "Mais de 200"];
const TIMES = ["Esta temporada", "Próximos 6 meses", "Ano que vem", "Ainda não sei"];
const PLACES = [
  { k: "Salão Cristal", img: "/ev-c1.webp", d: "Até 220 convidados, ar-condicionado e pista de dança." },
  { k: "Celeiro das Bandeirolas", img: "/ev-c2.webp", d: "Até 160 convidados, madeira aparente e luzes quentes." },
  { k: "Pavilhão do Pomar", img: "/ev-c3.webp", d: "Até 120 convidados, aberto para o jardim." },
];
const Dots = () => <span aria-hidden style={{ display: "inline-flex", gap: 7 }}>{[SA, "#fff", "#fff"].map((c, i) => <i key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: c, opacity: i ? 0.6 : 1 }} />)}</span>;

export function EspacoFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Recanto Verde Eventos";
  const city = client?.city?.trim() || "Lagoa Santa";
  const [l1, l2] = brand.replace(/ Eventos$/i, "").split(" ").length > 1 ? [brand.replace(/ Eventos$/i, "").split(" ")[0]!, brand.replace(/ Eventos$/i, "").split(" ").slice(1).join(" ")] : [brand, ""];
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
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero consultar datas no ${brand}${cust ? ` em nome de ${cust}` : ""}. Evento: ${tp}. Convidados: ${gs}. Quando: ${tm}.`)}`;
  const stepTitle = step === 1 ? "Que evento vai ser?" : step === 2 ? "Quantos convidados?" : step === 3 ? "Para quando?" : "Quase lá!";

  const NAV: [string, string][] = [["Início", "top"], ["Espaços", "espacos"], ["Galeria", "galeria"], ["Depoimentos", "depo"], ["Contato", "contato"]];
  return (
    <div className="ev" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: BK, background: "#fff", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Oswald:wght@400;500&family=Lato:wght@400;700&display=swap');
        .ev *{box-sizing:border-box}
        .ev a,.ev button{font-family:inherit}
        .ev h1,.ev h2,.ev h3{font-family:inherit}
        .ev .sans{font-family:'Lato',system-ui,sans-serif}
        .ev .lay{display:grid;grid-template-columns:184px 1fr}
        .ev aside{position:sticky;top:0;height:100vh;max-height:900px;background:#fff;display:flex;flex-direction:column;align-items:center;padding:34px 10px 28px;text-align:center}
        .ev .lg{font-size:30px;line-height:1.05;font-weight:400;letter-spacing:.01em}
        .ev .sn{display:flex;flex-direction:column;gap:6px;margin-top:46px;font-family:'Oswald',sans-serif;font-size:13px;letter-spacing:.14em;text-transform:uppercase}
        .ev .sn a{cursor:pointer;color:${BK};padding:11px 8px;min-height:44px;display:flex;align-items:center;justify-content:center}.ev .sn a:hover,.ev .sn a.on{color:${SD}}
        .ev .fol{margin-top:auto;font-family:'Lato',sans-serif;font-size:14.5px;color:${MU}}
        .ev .top{display:none}
        .ev .btn{background:${OF};color:${BK};border:0;border-radius:0;padding:0 26px;min-height:46px;font-family:'Lato',sans-serif;font-size:14px;letter-spacing:.04em;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;text-decoration:none;font-weight:700}
        .ev .btn:hover{background:#fff;box-shadow:inset 0 0 0 2px ${BK}}
        .ev .btn.d{background:${BK};color:#fff}.ev .btn.d:hover{background:${SD};box-shadow:none}
        .ev .hero{position:relative;min-height:640px;display:grid;place-items:center;text-align:center;color:#fff;padding:60px 24px;background:#222 center/cover}
        .ev .hero:before,.ev .dance:before{content:"";position:absolute;inset:0;background:rgba(0,0,0,.56)}
        .ev .hero>div,.ev .dance>div{position:relative;max-width:760px;text-shadow:0 1px 14px rgba(0,0,0,.55)}
        .ev .hero h1{font-size:clamp(46px,7vw,84px);font-weight:400;margin:0 0 14px;line-height:1.05}
        .ev .hero p{font-family:'Lato',sans-serif;font-size:18px;line-height:1.6;margin:0 auto 22px;max-width:560px}
        .ev .hd{position:absolute;bottom:22px;left:0;right:0;display:flex;justify-content:center}
        .ev .vid{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;max-width:860px;margin:0 auto;padding:90px 24px}
        .ev .vb{position:relative;border:0;padding:0;cursor:pointer;display:block;background:none}
        .ev .vb img{display:block;width:100%;aspect-ratio:1.4/1;object-fit:cover}
        .ev .vb i{position:absolute;left:50%;top:50%;width:56px;height:56px;margin:-28px 0 0 -28px;border-radius:50%;background:rgba(255,255,255,.92);display:grid;place-items:center}
        .ev .vb i:after{content:"";border-left:16px solid ${BK};border-top:10px solid transparent;border-bottom:10px solid transparent;margin-left:5px}
        .ev h2{font-size:clamp(30px,3.6vw,38px);font-weight:400;margin:0}
        .ev .sub{display:flex;align-items:center;gap:10px;font-size:15px;font-style:italic;color:${MU};margin:10px 0 18px}.ev .sub:before,.ev .sub:after{content:"";width:46px;height:1px;background:#bbb}
        .ev .vid .sub{justify-content:flex-start}
        .ev .p{font-family:'Lato',sans-serif;font-size:16px;line-height:1.7;color:${MU};margin:0 0 20px}
        .ev .dance{position:relative;min-height:320px;display:grid;place-items:center;text-align:center;color:#fff;padding:50px 24px;background:#222 center/cover}
        .ev .dance h2{margin-bottom:12px}
        .ev .dance p{font-family:'Lato',sans-serif;font-size:18px;line-height:1.6;margin:0 auto 20px;max-width:520px}
        .ev .pl{max-width:900px;margin:0 auto;padding:80px 24px 40px;text-align:center}
        .ev .pl .sub{justify-content:center}
        .ev .pg{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:34px}
        .ev .pc{background:none;border:0;padding:0;cursor:pointer;text-align:center;color:${BK}}
        .ev .pc img{display:block;width:100%;aspect-ratio:1.3/1;object-fit:cover}
        .ev .pc b{display:block;font-weight:500;font-size:19px;margin-top:16px}
        .ev .pc small{display:block;font-family:'Lato',sans-serif;font-size:15.5px;color:${MU};line-height:1.55;margin:8px 4px 0}
        .ev .pc span{display:inline-block;font-family:'Oswald',sans-serif;font-size:13px;letter-spacing:.14em;text-transform:uppercase;margin-top:12px;border-bottom:2px solid ${SA};padding-bottom:3px}
        .ev .depo{position:relative;min-height:340px;display:grid;place-items:center;text-align:center;color:#fff;padding:60px 24px;background:#111 center/cover}
        .ev .depo:before{content:"";position:absolute;inset:0;background:rgba(0,0,0,.45)}
        .ev .depo>div{position:relative;max-width:620px}
        .ev .depo h3{font-weight:400;font-size:30px;margin:0 0 12px}.ev .depo p{font-family:'Lato',sans-serif;font-size:16px;line-height:1.7;margin:0 0 14px}.ev .depo b{font-weight:500;font-size:17px;display:block}.ev .depo small{font-style:italic;font-size:13px}
        .ev .ct{display:grid;grid-template-columns:1fr 1fr;gap:34px;max-width:860px;margin:0 auto;padding:90px 24px}
        .ev .ct img{display:block;width:100%;height:100%;min-height:240px;object-fit:cover}
        .ev .ct h2{margin-bottom:14px}
        .ev .fld{display:block;width:100%;border:1px solid ${LN};background:#fff;padding:0 14px;min-height:46px;font-family:'Lato',sans-serif;font-size:15px;color:${BK};margin-bottom:10px;cursor:pointer}
        .ev .fld::placeholder{color:${MU};opacity:1}
        .ev .lb{display:block;font-family:'Lato',sans-serif;font-size:13px;font-weight:700;margin-bottom:5px}
        .ev footer{background:#1f1f1f;color:#e8e4de;padding:54px 24px 22px;text-align:center}
        .ev .fg{display:grid;grid-template-columns:1fr 1.3fr 1fr;gap:30px;max-width:860px;margin:0 auto;font-family:'Lato',sans-serif;font-size:14.5px;line-height:1.8;align-items:start}
        .ev .fg h4{font-family:'Playfair Display',serif;font-weight:500;font-size:20px;color:#fff;margin:0 0 10px}
        .ev .fg .big{font-family:'Playfair Display',serif;font-size:32px;color:#fff;margin-bottom:10px}
        .ev .fg a{color:#fff;cursor:pointer;display:block;padding:5px 0}
        .ev .dm{border-top:1px solid rgba(255,255,255,.2);margin:30px auto 0;padding-top:16px;max-width:860px;font-family:'Lato',sans-serif;font-size:14px;color:#e8e4de}
        .ev .wa{position:fixed;right:18px;bottom:18px;z-index:40;width:58px;height:58px;border-radius:50%;background:#25d366;display:grid;place-items:center;box-shadow:0 8px 24px rgba(0,0,0,.3)}
        .ev .ov{position:fixed;inset:0;z-index:100;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;padding:16px}
        .ev .md{background:#fff;width:100%;max-width:520px;max-height:92vh;overflow:auto;padding:34px;position:relative;border-top:6px solid ${SA}}
        .ev .md h3{font-weight:400;font-size:32px;margin:8px 0 4px}
        .ev .eb2{font-family:'Oswald',sans-serif;font-size:13px;color:${SD};text-transform:uppercase;letter-spacing:.16em}
        .ev .bars{display:flex;gap:6px;margin:14px 0 20px}.ev .bars i{flex:1;height:4px;background:${LN}}.ev .bars i.on{background:${SA}}
        .ev .opt{padding:14px 10px;border:1.5px solid ${LN};background:#fff;cursor:pointer;font-family:'Lato',sans-serif;font-size:15.5px;font-weight:700;text-align:center;min-height:52px;color:${BK}}
        .ev .opt:hover{border-color:${BK}}.ev .opt.on{background:${BK};color:#fff;border-color:${BK}}
        .ev .x{position:absolute;right:12px;top:14px;width:44px;height:44px;border:0;background:none;font-size:28px;cursor:pointer;color:${BK}}
        .ev .mob{display:none}
        .ev :focus-visible{outline:3px solid ${SD};outline-offset:2px}
        .ev .hero :focus-visible,.ev .dance :focus-visible,.ev footer :focus-visible{outline-color:#fff}
        @media(max-width:900px){
          .ev .lay{grid-template-columns:1fr}
          .ev aside{display:none}
          .ev .top{display:flex;align-items:center;justify-content:space-between;padding:12px 20px;background:#fff}
          .ev .top .lg{font-size:24px;line-height:1.05}
          .ev .burger{background:none;border:1.5px solid ${BK};width:46px;height:46px;cursor:pointer;display:grid;place-items:center}
          .ev .mob{display:block;border-top:1px solid ${LN};background:#fff}.ev .mob a{display:block;padding:15px 20px;font-family:'Oswald',sans-serif;font-size:14px;letter-spacing:.14em;text-transform:uppercase;border-bottom:1px solid ${LN};cursor:pointer}
          .ev .hero{min-height:520px}
          .ev .vid{grid-template-columns:1fr;gap:26px;padding:56px 20px}
          .ev .pg{grid-template-columns:1fr;gap:34px}
          .ev .ct{grid-template-columns:1fr;padding:56px 20px}
          .ev .fg{grid-template-columns:1fr}
          .ev .md{padding:28px 20px}
        }
      `}</style>

      <div className="lay" id="top">
        <aside>
          <div className="lg">{l1}<br />{l2}</div>
          <nav className="sn">{NAV.map(([t, id], i) => (<a key={id} className={i === 0 ? "on" : ""} onClick={() => go(id)}>{t}</a>))}</nav>
          <div className="fol">Siga-nos<br />@recantoverde</div>
        </aside>
        <main>
          <div className="top">
            <div className="lg">{l1} {l2}</div>
            <button type="button" className="burger" aria-label="Menu" onClick={() => setMenu((m) => !m)}><svg width="22" height="22" viewBox="0 0 26 26" stroke={BK} strokeWidth="2" strokeLinecap="round"><path d="M3 7h20M3 13h20M3 19h20" /></svg></button>
          </div>
          {menu && <div className="mob">{NAV.map(([t, id]) => (<a key={id} onClick={() => go(id)}>{t}</a>))}</div>}

          <section className="hero" style={{ backgroundImage: 'url("/ev-h1.webp")' }}>
            <div>
              <h1>O melhor lugar para a sua festa</h1>
              <p>Jardim, celeiro e salão em {city}. Do casamento à formatura, a gente cuida do espaço e você cuida de convidar.</p>
              <button type="button" className="btn" onClick={() => start()}>Consultar datas</button>
            </div>
            <div className="hd"><Dots /></div>
          </section>

          <section className="vid" id="galeria">
            <button type="button" className="vb" onClick={() => start()} aria-label="Agendar uma visita ao espaço"><img src="/ev-v1.webp" alt="Mesa longa com velas em celeiro rústico" loading="lazy" /><i /></button>
            <div>
              <h2>Visita e degustação</h2>
              <div className="sub">conheça o espaço</div>
              <p className="p">Venha ver o jardim e o celeiro montados, provar o cardápio dos nossos parceiros e tirar todas as dúvidas com a equipe, sem compromisso.</p>
              <button type="button" className="btn d" onClick={() => start()}>Agendar visita</button>
            </div>
          </section>

          <section className="dance" style={{ backgroundImage: 'url("/ev-d1.webp")' }}>
            <div>
              <h2>Pista cheia até o fim</h2>
              <p>Som liberado até as 4h, pista de madeira e estacionamento para 150 carros.</p>
              <button type="button" className="btn" onClick={() => start()}>Quero conhecer</button>
            </div>
          </section>

          <section className="pl" id="espacos">
            <h2>Três ambientes, uma festa</h2>
            <div className="sub">escolha o seu</div>
            <div className="pg">
              {PLACES.map((s) => (
                <button type="button" className="pc" key={s.k} onClick={() => start()}>
                  <img src={s.img} alt={s.k} loading="lazy" />
                  <b>{s.k}</b><small>{s.d}</small><span>Consultar data</span>
                </button>
              ))}
            </div>
          </section>

          <section className="depo" id="depo" style={{ backgroundImage: 'url("/ev-t1.webp")' }}>
            <div>
              <h3>Casamos no jardim e foi perfeito</h3>
              <p>A equipe montou tudo antes de chegarmos, o cronograma foi seguido à risca e o jardim ficou lindo nas fotos. Já indicamos para a família inteira.</p>
              <b>Letícia e André</b><small>casamento de 140 convidados</small>
            </div>
          </section>

          <section className="ct" id="contato">
            <img src="/ev-c3.webp" alt="Pavilhão aberto com mesas redondas" loading="lazy" />
            <div>
              <h2>Fale com a gente</h2>
              <label className="lb">Nome<input className="fld" readOnly placeholder="Seu nome" onFocus={() => start()} onClick={() => start()} /></label>
              <label className="lb">Telefone<input className="fld" readOnly placeholder="Seu telefone" onFocus={() => start()} onClick={() => start()} /></label>
              <button type="button" className="btn d" onClick={() => start()}>Enviar pedido</button>
            </div>
          </section>

          <footer>
            <div className="fg">
              <div><h4>Contato</h4>Rua das Mangueiras, 320, {city}<br />Visitas de ter a sáb, com hora marcada</div>
              <div><div className="big">{brand.replace(/ Eventos$/i, "")}</div><a href={`https://wa.me/${num}`} target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>WhatsApp: fale com a gente</a>Instagram: @recantoverde</div>
              <div><h4>Links</h4><a onClick={() => go("espacos")}>Espaços</a><a onClick={() => go("galeria")}>Galeria</a><a onClick={() => start()}>Consultar datas</a></div>
            </div>
            <div className="dm">Site de demonstração: fotos, nomes dos clientes, números e endereço são ilustrativos.</div>
          </footer>
        </main>
      </div>

      {sc && !open && (<a className="wa" href={`https://wa.me/${num}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg></a>)}

      {open && (
        <div className="ov" onClick={() => setOpen(false)}>
          <div className="md" ref={mdRef} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Consultar datas do espaço">
            <button type="button" className="x" aria-label="Fechar" onClick={() => setOpen(false)}>×</button>
            <span className="eb2">Consulta sem compromisso</span>
            <h3>{stepTitle}</h3>
            <div className="bars">{[1, 2, 3, 4].map((n) => (<i key={n} className={n <= step ? "on" : ""} />))}</div>
            {step === 1 && (<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>{TYPES.map((l) => (<button type="button" key={l} className={`opt${tp === l ? " on" : ""}`} onClick={() => { setTp(l); setStep(2); }}>{l}</button>))}</div>)}
            {step === 2 && (<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>{GUESTS.map((l) => (<button type="button" key={l} className={`opt${gs === l ? " on" : ""}`} onClick={() => { setGs(l); setStep(3); }}>{l}</button>))}</div>)}
            {step === 3 && (<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>{TIMES.map((x) => (<button type="button" key={x} className={`opt${tm === x ? " on" : ""}`} onClick={() => { setTm(x); setStep(4); }}>{x}</button>))}</div>)}
            {step === 4 && (
              <div>
                <label style={{ fontSize: 14.5, fontWeight: 500 }}>Seu nome<input value={cust} onChange={(e) => setCust(e.target.value)} placeholder="Como podemos te chamar?" style={{ display: "block", width: "100%", marginTop: 8, padding: "15px 16px", border: `1.5px solid ${LN}`, fontSize: 16, background: "#fff" }} /></label>
                <p style={{ fontSize: 14.5, color: MU, margin: "14px 0 18px" }}>{tp} · {gs} · {tm}</p>
                <a className="btn" style={{ width: "100%" }} href={wa} target="_blank" rel="noreferrer">Confirmar no WhatsApp</a>
                <p style={{ fontSize: 13, color: MU, textAlign: "center", margin: "12px 0 0" }}>Abre o WhatsApp com a mensagem pronta. Nada é enviado antes de você tocar em enviar.</p>
              </div>
            )}
            {step > 1 && <button type="button" onClick={() => setStep(step - 1)} style={{ background: "none", border: 0, marginTop: 14, color: SD, fontWeight: 500, cursor: "pointer", fontSize: 14.5, minHeight: 44 }}>← Voltar</button>}
          </div>
        </div>
      )}
    </div>
  );
}
