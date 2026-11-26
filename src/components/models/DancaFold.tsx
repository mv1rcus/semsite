import { useEffect, useRef, useState } from "react";

/** Escola de dança a partir do pin "Play The Urban": fundo quase preto, título itálico largo e gigante com a dançarina recortada na frente, aulas em cards sobre foto, grade semanal em caixas, vídeos e rodapé cinza-claro. Aula experimental em 4 passos que fecha no WhatsApp. */
const BK = "#111111", WH = "#f2f2f2", FT = "#efefef", MU = "#c9c9c9", LN = "#ffffff";
const STYLES = ["Hip hop", "Jazz funk", "Street", "Contemporâneo"];
const LEVELS = ["Iniciante", "Intermediário", "Avançado"];
const TIMES = ["Manhã", "Tarde", "Noite", "Sábado"];
const CLASSES = [
  { t: "Nova turma de hip hop para iniciantes", img: "/dn-c3.webp", s: "Hip hop" },
  { t: "Turma de jazz funk volta a abrir vagas", img: "/dn-c1.webp", s: "Jazz funk" },
  { t: "Aulas de contemporâneo mudam para as quintas", img: "/dn-c2.webp", s: "Contemporâneo" },
];
const DAYS: { d: string; items: { h: string; lv: string; n: string }[] }[] = [
  { d: "SEG 23", items: [{ h: "19h às 20h20", lv: "AVA", n: "Jazz funk, Alexa" }, { h: "20h30 às 21h50", lv: "INI", n: "Hip hop, Juna" }] },
  { d: "TER 24", items: [{ h: "19h às 20h20", lv: "INT", n: "Street, Jimmy" }, { h: "20h30 às 21h50", lv: "INI", n: "Hip hop, Taís" }] },
  { d: "QUA 25", items: [{ h: "19h às 20h20", lv: "INI", n: "Jazz funk, Yeji" }] },
  { d: "QUI 26", items: [{ h: "19h às 20h20", lv: "INT", n: "Street, Yuri" }, { h: "20h30 às 21h50", lv: "INI", n: "Contemporâneo, Ana" }, { h: "21h50 às 23h", lv: "AVA", n: "Hip hop, Jin" }] },
  { d: "SEX 27", items: [{ h: "19h às 20h20", lv: "AVA", n: "Contemporâneo, Sol" }] },
];
const Arrow = () => <svg width="26" height="10" viewBox="0 0 26 10" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden><path d="M0 5h24M20 1l4 4-4 4" /></svg>;

export function DancaFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Fluxo Urbano";
  const city = client?.city?.trim() || "Belo Horizonte";
  const parts = brand.split(" ");
  const [l1, l2] = parts.length > 1 ? [parts[0]!, parts.slice(1).join(" ")] : [brand, ""];
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [st, setSt] = useState("");
  const [lv, setLv] = useState("");
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
    setTimeout(() => mdRef.current?.querySelector<HTMLElement>(".opt,input,a.cta")?.focus(), 30);
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
  const start = (pre?: string) => { setStep(pre ? 2 : 1); setSt(pre ?? ""); setLv(""); setTm(""); setOpen(true); setMenu(false); };
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero agendar uma aula experimental no ${brand}${cust ? ` em nome de ${cust}` : ""}. Estilo: ${st}. Nível: ${lv}. Horário: ${tm}.`)}`;
  const stepTitle = step === 1 ? "Qual estilo você quer?" : step === 2 ? "Qual o seu nível?" : step === 3 ? "Que horário prefere?" : "Quase lá";

  return (
    <div className="dz" style={{ fontFamily: "'Archivo', Arial, sans-serif", color: WH, background: BK, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,100..900;1,62..125,100..900&display=swap');
        .dz *{box-sizing:border-box}
        .dz a,.dz button{font-family:inherit}
        .dz h1,.dz h2,.dz h3,.dz h4{font-family:inherit}
        .dz .it{font-style:italic;font-stretch:125%;font-weight:800}
        .dz .nav{position:absolute;left:0;right:0;top:0;z-index:5;display:flex;align-items:center;justify-content:space-between;padding:22px 5.5%}
        .dz .lg{font-size:15px;line-height:1.05;letter-spacing:.02em;text-transform:uppercase;color:#fff}
        .dz .nl{display:flex;align-items:center;gap:30px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
        .dz .nl a{color:#fff;cursor:pointer;min-height:44px;display:inline-flex;align-items:center}
        .dz .pill{border:1.5px solid #fff;border-radius:999px;padding:0 20px;min-height:44px;background:none;color:#fff;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;display:inline-flex;align-items:center}
        .dz .pill:hover{background:#fff;color:${BK}}
        .dz .burger{display:none;background:none;border:1.5px solid #fff;width:46px;height:46px;cursor:pointer;place-items:center}
        .dz .frame{margin:26px auto 0;width:min(92%,1080px);border:2px solid #fff;border-radius:28px;overflow:hidden;position:relative}
        .dz .hero{position:relative;height:clamp(440px,52vw,600px);background:#2a2018 center/cover;overflow:hidden}
        .dz .hero:before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.45),rgba(0,0,0,0) 30%,rgba(0,0,0,.1))}
        .dz .ttl{position:absolute;left:0;right:0;top:50%;transform:translateY(-44%);text-align:center;margin:0;font-size:clamp(54px,9.6vw,118px);line-height:.88;letter-spacing:-.02em;color:#f4f4f4;text-transform:uppercase;z-index:1;text-shadow:0 2px 24px rgba(0,0,0,.35)}
        .dz .cut{position:absolute;left:50%;bottom:0;height:96%;transform:translateX(-50%);z-index:2;width:auto;filter:drop-shadow(0 10px 18px rgba(0,0,0,.35))}
        .dz .pv{position:absolute;left:24px;bottom:22px;z-index:3;display:flex;align-items:center;gap:12px;background:none;border:0;color:#fff;font-size:13px;text-shadow:0 1px 8px rgba(0,0,0,.8);font-weight:700;letter-spacing:.08em;cursor:pointer;min-height:44px}
        .dz .pv i{width:44px;height:44px;border:1.5px solid #fff;border-radius:50%;display:grid;place-items:center}
        .dz .pv i:after{content:"";border-left:11px solid #fff;border-top:7px solid transparent;border-bottom:7px solid transparent;margin-left:3px}
        .dz .sec{width:min(92%,1080px);margin:0 auto;padding:0 5.5%}
        .dz h2{font-size:clamp(30px,4.4vw,48px);margin:0 0 30px;text-transform:uppercase;line-height:1;color:#fff}
        .dz .cl{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
        .dz .cc{position:relative;border:0;padding:0;cursor:pointer;aspect-ratio:1.6/1;background:#222 center/cover;color:#fff;text-align:left;overflow:hidden}
        .dz .cc:before{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(0,0,0,.78),rgba(0,0,0,.18) 70%)}
        .dz .cc div{position:absolute;left:16px;right:14px;bottom:14px}
        .dz .cc b{display:block;font-size:16px;line-height:1.25;font-weight:700;margin-bottom:8px}
        .dz .cc span{display:inline-flex;align-items:center;gap:8px;font-size:13.5px;font-weight:700}
        .dz .more{display:flex;justify-content:flex-end;margin-top:30px}
        .dz .more a{display:inline-flex;align-items:center;gap:12px;color:#fff;font-size:13px;font-weight:700;cursor:pointer;min-height:44px;text-decoration:none}
        .dz .lgd{margin:12px 0 0;font-size:13px;color:#c9c9c9}
        .dz .wk{display:grid;grid-template-columns:repeat(5,1fr);border:1.5px solid #fff}
        .dz .wd{border-right:1.5px solid #fff;min-height:210px}.dz .wd:last-child{border-right:0}
        .dz .wd h3{margin:0;padding:8px 10px;border-bottom:1.5px solid #fff;text-align:right;font-size:12px;font-weight:700;letter-spacing:.04em}
        .dz .wi{display:block;width:100%;background:none;border:0;color:#fff;text-align:left;padding:12px 10px 8px;min-height:44px;cursor:pointer;font-size:12.5px;line-height:1.45}
        .dz .wi div{display:flex;justify-content:space-between;gap:6px;font-weight:700;font-size:12.5px}
        .dz .wi small{display:block;font-size:13px;font-weight:700;color:#fff;margin-top:3px}
        .dz .wi:hover{background:rgba(255,255,255,.1)}
        .dz .vg{display:grid;grid-template-columns:1.9fr 1fr;gap:14px}
        .dz .vc{display:grid;gap:14px}
        .dz .vb{position:relative;border:0;padding:0;cursor:pointer;background:#222 center/cover;display:block;width:100%;color:#fff;text-align:left}
        .dz .vb.big{aspect-ratio:1.78/1}.dz .vb.sm{aspect-ratio:1.78/1}
        .dz .vb:before{content:"";position:absolute;inset:0;background:rgba(0,0,0,.18)}
        .dz .vb em{position:absolute;left:0;right:0;top:50%;transform:translateY(-50%);text-align:center;font-weight:700;font-style:italic;font-size:clamp(18px,3vw,30px);text-shadow:0 2px 12px rgba(0,0,0,.6)}
        .dz .vb.sm em{font-size:clamp(16px,2.2vw,22px)}
        .dz .cap{font-size:13px;font-weight:700;margin:8px 0 0}
        .dz footer{background:${FT};color:${BK};margin-top:110px;padding:44px 0 26px}
        .dz .fi{width:min(92%,1080px);margin:0 auto;padding:0 5.5%}
        .dz .fg{display:grid;grid-template-columns:2fr 1fr 1fr;gap:30px}
        .dz .fg h4{margin:0 0 16px;font-size:clamp(20px,2.4vw,24px);text-transform:uppercase}
        .dz .fg p{font-size:12.5px;line-height:1.55;font-weight:700;margin:0 0 14px}
        .dz .fg a{display:block;color:${BK};font-size:12px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;cursor:pointer;padding:6px 0;text-decoration:none}
        .dz .fb{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-top:34px;font-size:12px}
        .dz .soc{display:flex;gap:14px}.dz .soc a{width:44px;height:44px;border:1.5px solid ${BK};border-radius:50%;display:grid;place-items:center;padding:0}
        .dz .dm{border-top:1px solid #c8c8c8;margin-top:22px;padding-top:14px;font-size:12.5px;color:#333}
        .dz .wa{position:fixed;right:18px;bottom:18px;z-index:40;width:58px;height:58px;border-radius:50%;background:#25d366;display:grid;place-items:center;box-shadow:0 8px 24px rgba(0,0,0,.4)}
        .dz .ov{position:fixed;inset:0;z-index:100;background:rgba(0,0,0,.75);display:flex;align-items:center;justify-content:center;padding:16px}
        .dz .md{background:${BK};border:2px solid #fff;border-radius:22px;width:100%;max-width:520px;max-height:92vh;overflow:auto;padding:34px;position:relative}
        .dz .md h3{font-size:30px;margin:8px 0 4px;text-transform:uppercase}
        .dz .eb2{font-size:12px;letter-spacing:.14em;text-transform:uppercase;font-weight:700;color:${MU}}
        .dz .bars{display:flex;gap:6px;margin:14px 0 20px}.dz .bars i{flex:1;height:4px;background:#444}.dz .bars i.on{background:#fff}
        .dz .opt{padding:14px 10px;border:1.5px solid #fff;border-radius:999px;background:none;cursor:pointer;font-size:15px;font-weight:700;text-align:center;min-height:52px;color:#fff}
        .dz .opt:hover{background:rgba(255,255,255,.14)}.dz .opt.on{background:#fff;color:${BK}}
        .dz .cta{background:#fff;color:${BK};border-radius:999px;min-height:52px;display:flex;align-items:center;justify-content:center;font-weight:800;text-decoration:none;font-size:15px;width:100%}
        .dz .x{position:absolute;right:12px;top:14px;width:44px;height:44px;border:0;background:none;font-size:28px;cursor:pointer;color:#fff}
        .dz .mob{display:none}
        .dz :focus-visible{outline:3px solid #fff;outline-offset:2px}
        .dz footer :focus-visible{outline-color:${BK}}
        @media(max-width:860px){
          .dz .nl a,.dz .nl .pill{display:none}.dz .burger{display:grid}
          .dz .nav{padding:16px 5%}
          .dz .mob{display:block;position:absolute;left:5%;right:5%;top:70px;z-index:6;background:${BK};border:1.5px solid #fff;border-radius:16px;padding:8px}
          .dz .mob a{display:flex;align-items:center;min-height:48px;padding:0 14px;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;color:#fff}
          .dz .frame{width:94%;border-radius:20px;margin-top:18px}
          .dz .hero{height:460px}
          .dz .ttl{font-size:clamp(32px,9.2vw,54px)}
          .dz .cut{height:72%;left:88%}
          .dz .ttl{text-align:left;padding-left:5%;top:34%}
          .dz .cl{grid-template-columns:1fr}
          .dz .wk{grid-template-columns:1fr}.dz .wd{border-right:0;border-bottom:1.5px solid #fff;min-height:0;padding-bottom:8px}.dz .wd:last-child{border-bottom:0}
          .dz .vg{grid-template-columns:1fr}
          .dz .fg{grid-template-columns:1fr 1fr}.dz .fg>div:first-child{grid-column:1/-1}
          .dz .md{padding:28px 20px}
        }
      `}</style>

      <div id="top" style={{ paddingTop: 0 }}>
        <section className="frame" style={{ border: "2px solid #fff" }}>
          <div className="hero" style={{ backgroundImage: 'url("/dn-h1.webp")' }}>
            <div className="nav">
              <div className="lg it">{l1}<br />{l2}</div>
              <div className="nl">
                <a onClick={() => go("agenda")}>Agenda</a>
                <button type="button" className="pill" onClick={() => start()}>Agendar aula</button>
                <button type="button" className="burger" aria-label="Menu" onClick={() => setMenu((m) => !m)}><svg width="22" height="22" viewBox="0 0 26 26" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M3 7h20M3 13h20M3 19h20" /></svg></button>
              </div>
              {menu && <div className="mob"><a onClick={() => go("aulas")}>Aulas</a><a onClick={() => go("agenda")}>Agenda</a><a onClick={() => go("videos")}>Vídeos</a><a onClick={() => start()}>Agendar aula</a></div>}
            </div>
            <h1 className="ttl it">Escola<br />de dança</h1>
            <img className="cut" src="/dn-cut.webp" alt="Dançarina de calça larga e boné em pose de hip hop" />
            <button type="button" className="pv" onClick={() => start()}><i /> VER AULA</button>
          </div>
        </section>

        <section className="sec" id="aulas" style={{ paddingTop: 80 }}>
          <h2 className="it">Próximas aulas</h2>
          <div className="cl">
            {CLASSES.map((c) => (
              <button type="button" key={c.t} className="cc" style={{ backgroundImage: `url("${c.img}")` }} onClick={() => start(c.s)}>
                <div><b>{c.t}</b><span>mais <Arrow /></span></div>
              </button>
            ))}
          </div>
          <div className="more"><a onClick={() => go("agenda")}>Mais aulas <Arrow /></a></div>
        </section>

        <section className="sec" id="agenda" style={{ paddingTop: 70 }}>
          <h2 className="it">Agenda da semana</h2>
          <div className="wk">
            {DAYS.map((d) => (
              <div className="wd" key={d.d}>
                <h3>{d.d}</h3>
                {d.items.map((it) => (
                  <button type="button" className="wi" key={it.h + it.n} onClick={() => start(it.n.split(",")[0])} aria-label={`${it.n}, ${it.h}, reservar`}>
                    <div><span>{it.h}</span><span>{it.lv}</span></div>
                    <small>{it.n}</small>
                  </button>
                ))}
              </div>
            ))}
          </div>
          <p className="lgd">INI iniciante · INT intermediário · AVA avançado</p>
          <div className="more"><a onClick={() => start()}>Agenda completa <Arrow /></a></div>
        </section>

        <section className="sec" id="videos" style={{ paddingTop: 70 }}>
          <h2 className="it">Últimos vídeos</h2>
          <div className="vg">
            <div>
              <button type="button" className="vb big" style={{ backgroundImage: 'url("/dn-h1.webp")' }} onClick={() => start()} aria-label="Ver vídeo Estúdio vazio"><em>NOITE</em></button>
              <p className="cap">NOITE | Coreografia</p>
            </div>
            <div className="vc">
              <div>
                <button type="button" className="vb sm" style={{ backgroundImage: 'url("/dn-c1.webp")' }} onClick={() => start()} aria-label="Ver vídeo Maré"><em>MARÉ</em></button>
                <p className="cap">MARÉ | Coreografia</p>
              </div>
              <div>
                <button type="button" className="vb sm" style={{ backgroundImage: 'url("/dn-c2.webp")' }} onClick={() => start()} aria-label="Ver vídeo Sol"><em>SOL</em></button>
                <p className="cap">SOL | Coreografia</p>
              </div>
            </div>
          </div>
          <div className="more"><a onClick={() => start()}>Mais vídeos <Arrow /></a></div>
        </section>

        <footer>
          <div className="fi">
            <div className="fg">
              <div><h4 className="it">{brand}</h4><p>{city}<br />Av. do Contorno, 1200, 2º andar</p><p>(31) 99999-0000</p><p>oi@fluxourbano.example</p></div>
              <div><h4 className="it">Serviços</h4><a onClick={() => go("agenda")}>Agenda</a><a onClick={() => go("aulas")}>Professores</a><a onClick={() => go("aulas")}>Estilos</a><a onClick={() => go("videos")}>Vídeos</a></div>
              <div><h4 className="it">Info</h4><a onClick={() => go("top")}>Quem somos</a><a onClick={() => start()}>Contato</a></div>
            </div>
            <div className="fb">
              <span>Todos os direitos reservados.</span>
              <div className="soc">
                <a href={`https://wa.me/${num}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BK} strokeWidth="2"><circle cx="12" cy="12" r="9" /></svg></a>
                <a href={`https://wa.me/${num}`} target="_blank" rel="noreferrer" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BK} strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="5" /><circle cx="12" cy="12" r="3.6" /></svg></a>
                <a href={`https://wa.me/${num}`} target="_blank" rel="noreferrer" aria-label="YouTube"><svg width="18" height="18" viewBox="0 0 24 24" fill={BK}><rect x="3" y="6" width="18" height="12" rx="3" /><path d="M10 9.500v5l4.500-2.500z" fill="#fff" /></svg></a>
              </div>
            </div>
            <div className="dm">Site de demonstração: fotos, nomes, números, preços e endereço são ilustrativos.</div>
          </div>
        </footer>
      </div>

      {sc && !open && (<a className="wa" href={`https://wa.me/${num}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg></a>)}

      {open && (
        <div className="ov" onClick={() => setOpen(false)}>
          <div className="md" ref={mdRef} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Agendar aula experimental">
            <button type="button" className="x" aria-label="Fechar" onClick={() => setOpen(false)}>×</button>
            <span className="eb2">Aula experimental</span>
            <h3 className="it">{stepTitle}</h3>
            <div className="bars">{[1, 2, 3, 4].map((n) => (<i key={n} className={n <= step ? "on" : ""} />))}</div>
            {step === 1 && (<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>{STYLES.map((l) => (<button type="button" key={l} className={`opt${st === l ? " on" : ""}`} onClick={() => { setSt(l); setStep(2); }}>{l}</button>))}</div>)}
            {step === 2 && (<div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>{LEVELS.map((l) => (<button type="button" key={l} className={`opt${lv === l ? " on" : ""}`} onClick={() => { setLv(l); setStep(3); }}>{l}</button>))}</div>)}
            {step === 3 && (<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>{TIMES.map((x) => (<button type="button" key={x} className={`opt${tm === x ? " on" : ""}`} onClick={() => { setTm(x); setStep(4); }}>{x}</button>))}</div>)}
            {step === 4 && (
              <div>
                <label style={{ fontSize: 14.5, fontWeight: 700 }}>Seu nome<input value={cust} onChange={(e) => setCust(e.target.value)} placeholder="Como podemos te chamar?" style={{ display: "block", width: "100%", marginTop: 8, padding: "15px 16px", border: "1.5px solid #fff", borderRadius: 12, fontSize: 16, background: "#1c1c1c", color: "#fff" }} /></label>
                <p style={{ fontSize: 14.5, color: MU, margin: "14px 0 18px" }}>{st} · {lv} · {tm}</p>
                <a className="cta" href={wa} target="_blank" rel="noreferrer">Confirmar no WhatsApp</a>
                <p style={{ fontSize: 13, color: MU, textAlign: "center", margin: "12px 0 0" }}>Abre o WhatsApp com a mensagem pronta. Nada é enviado antes de você tocar em enviar.</p>
              </div>
            )}
            {step > 1 && <button type="button" onClick={() => setStep(step - 1)} style={{ background: "none", border: 0, marginTop: 14, color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14.5, minHeight: 44, textDecoration: "underline" }}>← Voltar</button>}
          </div>
        </div>
      )}
    </div>
  );
}
