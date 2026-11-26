import { useEffect, useRef, useState } from "react";

/** Sorveteria a partir do pin "Frosted Delights": vidro fosco (glassmorphism) sobre faixas menta, rosa, creme e vinho, pote e casquinhas em foto recortada, carrinho em vidro que fecha no WhatsApp. */
const INK = "#1c1c1c", MINT = "#c9ecdf", PINK = "#f6cdd6", CREAM = "#f8f1e5";
const FLAVORS = [
  { n: "Menta com chocolate", d: "Creme de menta com pedacinhos de chocolate amargo", p: 14.9, img: "/ic-cone0.webp", tint: "rgba(120,220,180,.55)" },
  { n: "Frutas vermelhas", d: "Creme rosa com calda de frutas vermelhas", p: 14.9, img: "/ic-cone1.webp", tint: "rgba(255,110,140,.5)" },
  { n: "Chocolate belga", d: "Chocolate intenso com calda de chocolate quente", p: 16.9, img: "/ic-cone2.webp", tint: "rgba(150,100,70,.5)" },
];
const STORY = [
  { t: "Leite orgânico", c: "rgba(160,230,200,.6)", i: <path d="M8 3h8l-1 4 2 3v10a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V10l2-3-1-4zM8 12h8" /> },
  { t: "Sabores autorais", c: "rgba(255,200,130,.65)", i: <path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 1.5-2s0-2 1.5-2h2a3 3 0 0 0 3-3c0-6-4-11-8-11zM8 11h.01M12 8h.01M16 11h.01" /> },
  { t: "Purê de fruta de verdade", c: "rgba(255,170,190,.65)", i: <path d="M12 7c-3-2-8-1-8 5 0 5 4 9 8 9s8-4 8-9c0-6-5-7-8-5zM12 7c0-2 1-3 3-4" /> },
  { t: "Sem aditivos artificiais", c: "rgba(190,170,250,.65)", i: <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M8 15h8" /> },
];
const SIZES = ["Pote 500 ml", "Pote 1 L", "Casquinha", "Sundae"];
const Ico = ({ children }: { children: React.ReactNode }) => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{children}</svg>;
const money = (v: number) => `R$ ${v.toFixed(2).replace(".", ",")}`;

export function SorvGlassFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Neve Doce";
  const city = client?.city?.trim() || "Florianópolis";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [cart, setCart] = useState<Record<string, number>>({ "Pote de baunilha": 1, "Casquinha de chocolate": 1 });
  const [addr, setAddr] = useState("");
  const [tel, setTel] = useState("");
  const [promo, setPromo] = useState("");
  const [menu, setMenu] = useState(false);
  const [toast, setToast] = useState("");
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [sz, setSz] = useState("");
  const [fl, setFl] = useState("");
  const [nm, setNm] = useState("");
  const mdRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const PRICE: Record<string, number> = { "Pote de baunilha": 32, "Casquinha de chocolate": 14.9, ...Object.fromEntries(FLAVORS.map((f) => [f.n + " (casquinha)", f.p])) };
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
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const startOrder = () => { setStep(1); setSz(""); setFl(""); setOpen(true); setMenu(false); };
  const flash = (m: string) => { setToast(m); setTimeout(() => setToast(""), 1800); };
  const add = (k: string) => { setCart((c) => ({ ...c, [k]: (c[k] ?? 0) + 1 })); flash("Adicionado ao carrinho"); };
  const lines = Object.entries(cart).filter(([, q]) => q > 0);
  const total = lines.reduce((s, [k, q]) => s + (PRICE[k] ?? 0) * q, 0);
  const waCart = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero fazer um pedido na ${brand}: ${lines.map(([k, q]) => `${q}x ${k}`).join(", ")}. Total: ${money(total)}. Endereço: ${addr || "a combinar"}. Telefone: ${tel || "-"}.${promo ? ` Cupom: ${promo}.` : ""}`)}`;
  const waOrder = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero pedir na ${brand}: ${sz}, sabor ${fl}${nm ? `, em nome de ${nm}` : ""}.`)}`;
  const stepTitle = step === 1 ? "O que você quer?" : step === 2 ? "Qual sabor?" : "Quase lá";

  return (
    <div className="sg" style={{ fontFamily: "'Inter', Arial, sans-serif", color: INK, background: CREAM, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Kaushan+Script&display=swap');
        .sg *{box-sizing:border-box}
        .sg a,.sg button,.sg input{font-family:inherit}
        .sg h1,.sg h2,.sg h3,.sg h4{font-family:inherit;font-weight:700;text-wrap:balance;margin:0}
        .sg .glass{background:linear-gradient(135deg,rgba(255,255,255,.5),rgba(255,255,255,.22));backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.7);box-shadow:0 10px 34px rgba(60,60,60,.12),inset 0 1px 0 rgba(255,255,255,.8)}
        .sg .top{background:linear-gradient(180deg,#bfe8d9,#d7f1e7 60%,#cbeee0);padding:24px 0 52px;position:relative;overflow:hidden}
        .sg .nav{width:min(92%,1080px);margin:0 auto;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;border-radius:22px;padding:6px 26px;position:relative;z-index:6}
        .sg .nl{display:flex;align-items:center;gap:26px;font-size:14px}
        .sg .nl.r{justify-content:flex-end}
        .sg .nl a{color:${INK};cursor:pointer;min-height:44px;display:inline-flex;align-items:center;text-decoration:none}
        .sg .nl i{width:1px;height:16px;background:${INK};opacity:.7}
        .sg .logo{text-align:center;line-height:1}
        .sg .logo b{display:block;font-family:'Kaushan Script',cursive;font-weight:400;font-size:25px}
        .sg .logo span{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase}
        .sg .burger{display:none;background:none;border:0;width:46px;height:46px;cursor:pointer;place-items:center}
        .sg .mob{display:none}
        .sg .hero{width:min(92%,1080px);margin:22px auto 0;border-radius:30px;min-height:clamp(400px,41vw,500px);position:relative;overflow:hidden}
        .sg .tub{position:absolute;left:50%;top:54%;width:clamp(280px,38vw,440px);transform:translate(-54%,-50%);z-index:3;filter:drop-shadow(0 14px 18px rgba(80,60,40,.25))}
        .sg .lbl{position:absolute;left:calc(50% - clamp(17px,2.3vw,26px));top:calc(54% - clamp(28px,3.8vw,44px));transform:translate(-50%,-50%);width:clamp(74px,9.5vw,112px);text-align:center;z-index:4;font-family:'Kaushan Script',cursive;font-size:clamp(17px,2.2vw,24px);line-height:1;color:#5a3a24;pointer-events:none}
        .sg .vc{position:absolute;left:-26px;top:20px;width:clamp(120px,15vw,170px);filter:blur(4px);z-index:1}
        .sg .cs{position:absolute;right:-30px;top:-36px;width:clamp(150px,22vw,260px);filter:blur(5px);z-index:1;transform:rotate(8deg)}
        .sg .ctr{position:absolute;left:30px;top:30%;display:flex;align-items:center;gap:12px;font-size:12px;z-index:4}
        .sg .ctr i{display:block;width:80px;height:1.5px;background:${INK}}
        .sg .echo{position:absolute;left:30px;top:37%;z-index:2;font-size:clamp(34px,5vw,52px);line-height:1;font-weight:700;letter-spacing:-.03em;white-space:nowrap}
        .sg .sub{position:absolute;left:30px;top:58%;font-size:clamp(18px,2.3vw,24px);line-height:1.25;z-index:2;font-weight:500;letter-spacing:-.01em}
        .sg .ht{position:absolute;right:30px;top:32%;z-index:4;font-size:clamp(34px,5vw,52px);line-height:1;letter-spacing:-.03em}
        .sg .hb{position:absolute;right:30px;top:calc(32% + clamp(120px,16vw,170px));z-index:4;display:flex;gap:12px}
        .sg .pill{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:0 22px;border-radius:999px;font-size:13px;font-weight:500;cursor:pointer;color:${INK};text-decoration:none;white-space:nowrap}
        .sg .pill.o{background:rgba(255,255,255,.2);border:1.5px solid ${INK}}
        .sg .pill.g{background:rgba(255,255,255,.55);border:1px solid #fff;box-shadow:0 4px 14px rgba(0,0,0,.08)}
        .sg .story{background:linear-gradient(180deg,${PINK},#f8d3da);padding:110px 0 120px;position:relative;overflow:hidden}
        .sg .in{width:min(92%,1080px);margin:0 auto;position:relative;z-index:2}
        .sg .story .in{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
        .sg h2{font-size:clamp(28px,3.6vw,40px);letter-spacing:-.02em;line-height:1.1;text-transform:uppercase}
        .sg .story p{font-size:16px;line-height:1.6;margin:22px 0 0;max-width:34ch;font-weight:400}
        .sg .story p b{font-weight:700}
        .sg .sc{display:grid;grid-template-columns:1fr 1fr;gap:16px}
        .sg .sk{border-radius:22px;min-height:112px;padding:14px 10px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;text-align:center;text-transform:uppercase;font-size:12px;font-weight:700;letter-spacing:.02em;line-height:1.3;border:1px solid rgba(255,255,255,.8);box-shadow:0 8px 24px rgba(0,0,0,.08)}
        .sg .fr{position:absolute;pointer-events:none;z-index:1}
        .sg .flv{padding:120px 0 90px}
        .sg .flv h2{text-align:center}
        .sg .fg{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:54px}
        .sg .fc{border-radius:26px;padding:22px 20px 22px;text-align:center;position:relative;overflow:hidden}
        .sg .fc img{width:auto;height:250px;margin:0 auto 6px;display:block;filter:drop-shadow(0 10px 12px rgba(0,0,0,.2))}
        .sg .fc h3{font-size:16px;text-transform:uppercase;letter-spacing:-.01em}
        .sg .fc p{font-size:13px;line-height:1.5;margin:8px 0 4px;min-height:40px}
        .sg .fc .pr{font-size:14px;font-weight:500;margin:6px 0 14px}
        .sg .fc .pill{width:100%;max-width:200px}
        .sg .bub{position:absolute;z-index:3;border-radius:16px;padding:10px 14px;font-size:12px;display:flex;align-items:center;gap:10px;white-space:nowrap}
        .sg .bub s{text-decoration:none;color:#f0a30a;letter-spacing:2px;font-size:11px;display:block}
        .sg .bub b{display:block;font-size:12px;font-weight:700}
        .sg .cartb{background:linear-gradient(180deg,#a8508a,#8b3f74);padding:110px 0 90px;position:relative;overflow:hidden;color:#fff}
        .sg .cp{border-radius:26px;padding:34px;display:grid;grid-template-columns:1fr 1fr;gap:34px;position:relative;z-index:3;background:linear-gradient(135deg,rgba(255,255,255,.3),rgba(255,255,255,.12));color:${INK}}
        .sg .cp h2{font-size:clamp(26px,3vw,32px);margin-bottom:22px}
        .sg .cp label{display:block;font-size:13px;font-weight:500;margin:14px 0 6px}
        .sg .cp input{width:100%;min-height:44px;border-radius:999px;border:1px solid rgba(255,255,255,.7);background:rgba(255,255,255,.4);padding:0 16px;font-size:14px;color:${INK}}
        .sg .cp input::placeholder{color:#3d2f38}
        .sg .tb{width:100%;border-collapse:collapse;font-size:13px}
        .sg .tb th{font-weight:500;text-align:left;padding:0 0 8px;border-bottom:1px solid rgba(0,0,0,.25)}
        .sg .tb td{padding:12px 0;border-bottom:1px solid rgba(0,0,0,.2)}
        .sg .tb .q{display:inline-flex;align-items:center;gap:4px}
        .sg .tb .q button{width:44px;height:44px;border:0;background:none;font-size:18px;cursor:pointer;color:${INK}}
        .sg .tot{display:flex;justify-content:space-between;margin:16px 0;font-size:14px;font-weight:500}
        .sg .cta{display:flex;align-items:center;justify-content:center;min-height:48px;border-radius:999px;font-size:13px;font-weight:700;letter-spacing:.03em;text-transform:uppercase;color:${INK};text-decoration:none;width:100%;border:1px solid #fff;background:rgba(255,255,255,.5);cursor:pointer}
        .sg .sd{position:absolute;right:0;top:-100px;width:170px;z-index:4;filter:drop-shadow(0 12px 14px rgba(0,0,0,.25))}
        .sg .rt{position:relative}
        .sg footer{padding:30px 0 28px;background:${CREAM}}
        .sg .fb{border-radius:22px;padding:16px 24px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;width:min(92%,1080px);margin:-70px auto 0;position:relative;z-index:5}
        .sg .fb .logo{text-align:left}
        .sg .fb a{color:${INK};font-size:13px;min-height:44px;display:inline-flex;align-items:center;text-decoration:none;cursor:pointer}
        .sg .dm{width:min(92%,1080px);margin:22px auto 0;font-size:12px;color:#444;line-height:1.5}
        .sg .wa{position:fixed;right:18px;bottom:18px;z-index:40;width:58px;height:58px;border-radius:50%;background:#25d366;display:grid;place-items:center;box-shadow:0 8px 24px rgba(0,0,0,.3)}
        .sg .toast{position:fixed;left:50%;bottom:92px;transform:translateX(-50%);z-index:60;background:${INK};color:#fff;font-size:13px;padding:10px 18px;border-radius:999px}
        .sg .ov{position:fixed;inset:0;z-index:100;background:rgba(30,20,30,.55);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:16px}
        .sg .md{background:${CREAM};border-radius:26px;width:100%;max-width:500px;max-height:92vh;overflow:auto;padding:32px;position:relative}
        .sg .md h3{font-size:26px;margin:6px 0 4px}
        .sg .eb{font-size:12px;letter-spacing:.12em;text-transform:uppercase;font-weight:500;color:#6a5a60}
        .sg .bars{display:flex;gap:6px;margin:14px 0 20px}.sg .bars i{flex:1;height:4px;background:#e4d9cf;border-radius:4px}.sg .bars i.on{background:#8b3f74}
        .sg .opt{padding:14px 12px;border:1.5px solid ${INK};border-radius:999px;background:none;cursor:pointer;font-size:14px;font-weight:500;text-align:center;min-height:50px;color:${INK}}
        .sg .opt:hover{background:rgba(139,63,116,.1)}.sg .opt.on{background:${INK};color:#fff}
        .sg .x{position:absolute;right:12px;top:14px;width:44px;height:44px;border:0;background:none;font-size:28px;cursor:pointer;color:${INK}}
        .sg .md input{width:100%;min-height:48px;border:1.5px solid ${INK};border-radius:999px;padding:0 18px;font-size:15px;background:#fff}
        .sg .md .cta{background:${INK};color:#fff;border:0}
        .sg :focus-visible{outline:3px solid #7a2f64;outline-offset:2px}
        .sg .cartb :focus-visible{outline-color:#fff}
        @media(max-width:860px){
          .sg .nav{grid-template-columns:auto 1fr;padding:6px 10px 6px 18px}
          .sg .nl{display:none}.sg .burger{display:grid;justify-self:end}
          .sg .logo{text-align:left}
          .sg .mob{display:block;width:min(92%,1080px);margin:8px auto 0;border-radius:18px;padding:8px;position:relative;z-index:6}
          .sg .mob a{display:flex;align-items:center;min-height:48px;padding:0 14px;font-size:14px;cursor:pointer;color:${INK};text-decoration:none}
          .sg .hero{min-height:560px}
          .sg .tub{top:30%;transform:translate(-50%,-30%);width:230px}
          .sg .lbl{display:none}
          .sg .ctr,.sg .echo{display:none}
          .sg .sub{left:22px;top:auto;bottom:84px;font-size:18px}
          .sg .ht{left:22px;right:22px;top:auto;bottom:142px;font-size:32px;text-align:left}
          .sg .hb{left:22px;right:auto;top:auto;bottom:20px}
          .sg .vc{left:-40px;top:auto;bottom:210px;width:110px}
          .sg .cs{width:140px;right:-36px;top:-24px}
          .sg .story .in{grid-template-columns:1fr;gap:34px}
          .sg .story{padding:80px 0 90px}
          .sg .fg{grid-template-columns:1fr;gap:22px;margin-top:40px}
          .sg .bub{display:none}
          .sg .cp{grid-template-columns:1fr;padding:24px 20px;gap:26px}
          .sg .sd{width:92px;top:0;right:0}
          .sg .story .fr{display:none}
          .sg .fb{flex-direction:column;align-items:flex-start}
          .sg .md{padding:28px 20px}
        }
      `}</style>

      <div className="top" id="top">
        <nav className="nav glass" aria-label="Principal">
          <div className="nl"><a onClick={() => go("historia")}>Sobre</a><i /><a onClick={() => go("sabores")}>Sabores</a></div>
          <div className="logo"><b>{brand}</b><span>Sorveteria artesanal</span></div>
          <div className="nl r"><a onClick={startOrder}>Pedir</a><i /><a onClick={() => go("contato")}>Contato</a></div>
          <button type="button" className="burger" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu((m) => !m)}><svg width="24" height="24" viewBox="0 0 26 26" stroke={INK} strokeWidth="2" strokeLinecap="round"><path d="M4 8h18M4 13h18M4 18h18" /></svg></button>
        </nav>
        {menu && <div className="mob glass"><a onClick={() => go("historia")}>Sobre</a><a onClick={() => go("sabores")}>Sabores</a><a onClick={startOrder}>Pedir</a><a onClick={() => go("contato")}>Contato</a></div>}
        <section className="hero glass" aria-label="Destaque">
          <img className="vc" src="/ic-vcone.webp" alt="" aria-hidden />
          <img className="cs" src="/ic-cscoop.webp" alt="" aria-hidden />
          <div className="ctr" aria-hidden>05 <i /> →</div>
          <div className="echo" aria-hidden>ENTREGUE-SE À</div>
          <div className="sub">Sorvete artesanal<br />de pequenos lotes</div>
          <img className="tub" src="/ic-tub.webp" alt="Pote de sorvete de baunilha com calda de caramelo, flores e favas de baunilha" />
          <div className="lbl" aria-hidden>Baunilha<br />Swirl</div>
          <h1 className="ht">ENTREGUE-SE<br />À {brand.toUpperCase()}</h1>
          <div className="hb">
            <a className="pill o" onClick={() => go("sabores")}>Ver sabores</a>
            <button type="button" className="pill g" onClick={startOrder}>Pedir agora</button>
          </div>
        </section>
      </div>

      <section className="story" id="historia">
        <img className="fr" src="/ic-f0.webp" alt="" aria-hidden style={{ left: 8, top: 40, width: 96 }} />
        <img className="fr" src="/ic-f4.webp" alt="" aria-hidden style={{ left: 40, top: 300, width: 40, filter: "blur(1px)" }} />
        <img className="fr" src="/ic-f3.webp" alt="" aria-hidden style={{ left: 0, bottom: 70, width: 78 }} />
        <img className="fr" src="/ic-f7.webp" alt="" aria-hidden style={{ right: 36, top: 36, width: 56 }} />
        <img className="fr" src="/ic-f1.webp" alt="" aria-hidden style={{ right: 6, bottom: 60, width: 84 }} />
        <img className="fr" src="/ic-f8.webp" alt="" aria-hidden style={{ left: "46%", bottom: 36, width: 40 }} />
        <div className="in">
          <div>
            <h2>Nossa história</h2>
            <p><b>Fruta de verdade</b>, sorvete natural para quem busca uma vida mais leve, sem abrir mão do sabor.</p>
            <p>Feito com frutas e legumes frescos, sem açúcar demais e sem conservantes. Tudo produzido em {city}, em lotes pequenos, toda semana.</p>
          </div>
          <div className="sc">
            {STORY.map((s) => <div key={s.t} className="sk" style={{ background: s.c }}><Ico>{s.i}</Ico><span>{s.t}</span></div>)}
          </div>
        </div>
      </section>

      <section className="flv" id="sabores">
        <div className="in" style={{ position: "relative" }}>
          <h2>Sabores da casa</h2>
          <div className="bub glass" style={{ left: -34, top: 170 }} aria-hidden><div><s>★★★★★</s><b>Casquinha clássica</b>{money(14.9)}</div></div>
          <div className="bub glass" style={{ right: -34, top: 170 }} aria-hidden><div><s>★★★★★</s><b>Sundae da casa</b>{money(24.9)}</div></div>
          <div className="fg">
            {FLAVORS.map((f) => (
              <div key={f.n} className="fc glass" style={{ background: `linear-gradient(180deg,${f.tint},rgba(255,255,255,.35) 70%)` }}>
                <img src={f.img} alt={`Casquinha de sorvete de ${f.n.toLowerCase()}`} />
                <h3>{f.n}</h3>
                <p>{f.d}</p>
                <div className="pr">{money(f.p)}</div>
                <button type="button" className="pill g" onClick={() => add(f.n + " (casquinha)")}>Adicionar</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cartb" id="pedido">
        <img className="fr" src="/ic-vcone.webp" alt="" aria-hidden style={{ left: -10, top: 30, width: 190, transform: "rotate(-8deg)" }} />
        <img className="fr" src="/ic-plate.webp" alt="" aria-hidden style={{ right: -50, bottom: -20, width: 300 }} />
        <img className="fr" src="/ic-f4.webp" alt="" aria-hidden style={{ right: 330, bottom: 20, width: 46 }} />
        <img className="fr" src="/ic-f8.webp" alt="" aria-hidden style={{ right: 370, bottom: 60, width: 40 }} />
        <div className="in">
          <div className="cp glass">
            <div>
              <h2>Seu pedido</h2>
              <label htmlFor="sg-a">Endereço de entrega</label>
              <input id="sg-a" value={addr} onChange={(e) => setAddr(e.target.value)} placeholder="Rua, número e bairro" autoComplete="street-address" />
              <label htmlFor="sg-t">Telefone</label>
              <input id="sg-t" value={tel} onChange={(e) => setTel(e.target.value)} placeholder="(00) 00000-0000" inputMode="tel" autoComplete="tel" />
              <label htmlFor="sg-p">Cupom</label>
              <input id="sg-p" value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="Opcional" />
            </div>
            <div className="rt">
              <img className="sd" src="/ic-sundae.webp" alt="Taça de sundae em camadas com chantilly e cereja" />
              <table className="tb" style={{ marginTop: 170 }}>
                <thead><tr><th>Item</th><th>Qtd.</th><th style={{ textAlign: "right" }}>Valor</th></tr></thead>
                <tbody>
                  {lines.length === 0 && <tr><td colSpan={3}>Seu carrinho está vazio. Escolha um sabor acima.</td></tr>}
                  {lines.map(([k, q]) => (
                    <tr key={k}>
                      <td>{k}</td>
                      <td><span className="q"><button type="button" aria-label={`Diminuir ${k}`} onClick={() => setCart((c) => ({ ...c, [k]: Math.max(0, (c[k] ?? 0) - 1) }))}>−</button>{q}<button type="button" aria-label={`Aumentar ${k}`} onClick={() => setCart((c) => ({ ...c, [k]: (c[k] ?? 0) + 1 }))}>+</button></span></td>
                      <td style={{ textAlign: "right" }}>{money((PRICE[k] ?? 0) * q)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="tot"><span>Total</span><span>{money(total)}</span></div>
              <a className="cta" href={waCart} target="_blank" rel="noreferrer" aria-disabled={lines.length === 0}>Finalizar pelo WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      <footer id="contato">
        <div className="fb glass">
          <div className="logo"><b>{brand}</b><span>{city}</span></div>
          <a onClick={() => go("sabores")}>Sabores</a>
          <a onClick={startOrder}>Pedir agora</a>
          <a href={`https://wa.me/${num}`} target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
        <p className="dm">Fotos, nomes, números, preços e endereço são ilustrativos. Modelo de demonstração.</p>
      </footer>

      <a className="wa" href={`https://wa.me/${num}`} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp"><svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" aria-hidden><path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2zm5.2 13.9c-.2.6-1.300 1.200-1.800 1.200-.5.100-1.100.100-1.800-.100-.4-.100-1-.300-1.700-.600-3-1.300-4.900-4.300-5.100-4.500-.1-.2-1.200-1.600-1.200-3s.8-2.100 1-2.400c.3-.3.600-.3.800-.3h.6c.2 0 .5-.1.700.5l.9 2.200c.1.200.1.400 0 .6l-.4.600c-.1.200-.3.300-.1.600.2.300.8 1.300 1.700 2.100 1.200 1 2.100 1.300 2.400 1.500.3.100.5.100.7-.1l.9-1.100c.2-.3.400-.2.700-.1l2 1c.3.100.5.200.5.300.1.100.1.700-.1 1.300z" /></svg></a>
      {toast && <div className="toast" role="status">{toast}</div>}

      {open && (
        <div className="ov" onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div className="md" ref={mdRef} role="dialog" aria-modal="true" aria-label="Fazer pedido">
            <button type="button" className="x" aria-label="Fechar" onClick={() => setOpen(false)}>×</button>
            <div className="eb">Passo {step} de 3</div>
            <div className="bars" aria-hidden><i className="on" /><i className={step >= 2 ? "on" : ""} /><i className={step >= 3 ? "on" : ""} /></div>
            <h3>{stepTitle}</h3>
            <div style={{ display: "grid", gap: 10, marginTop: 18 }}>
              {step === 1 && SIZES.map((s) => <button type="button" key={s} className={`opt${sz === s ? " on" : ""}`} onClick={() => { setSz(s); setStep(2); }}>{s}</button>)}
              {step === 2 && FLAVORS.map((f) => <button type="button" key={f.n} className={`opt${fl === f.n ? " on" : ""}`} onClick={() => { setFl(f.n); setStep(3); }}>{f.n}</button>)}
              {step === 3 && (<>
                <label htmlFor="sg-n" style={{ fontSize: 13 }}>Seu nome</label>
                <input id="sg-n" value={nm} onChange={(e) => setNm(e.target.value)} placeholder="Nome" autoComplete="name" />
                <a className="cta" href={waOrder} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Enviar pelo WhatsApp</a>
              </>)}
            </div>
            {step > 1 && <button type="button" className="opt" style={{ marginTop: 14, width: "100%", borderColor: "transparent", textDecoration: "underline" }} onClick={() => setStep(step - 1)}>Voltar</button>}
          </div>
        </div>
      )}
    </div>
  );
}
