import { useEffect, useState } from "react";

/** Juice bar construida do zero a partir de um pin com paineis empilhados coloridos, palavra gigante branca atras da garrafa e seletor de tamanho. Sem fotos: garrafas e frutas em SVG. Pedido que fecha no WhatsApp. */
const INK = "#1d2a14", BGG = "#86d63a";
type P = { w: string; flavor: string; desc: string; a: string; b: string; bot: string; fruit: "lime" | "berry" | "orange" | "blue"; prices: [string, string, string] };
const PANELS: P[] = [
  { w: "FRESCO", flavor: "Pepino e limão", desc: "Pepino, maçã verde, limão e gengibre prensados a frio. Sem açúcar, sem água, só o suco que sai da fruta.", a: "#3f9b5a", b: "#5cb870", bot: "#a6d834", fruit: "lime", prices: ["R$ 11", "R$ 16", "R$ 28"] },
  { w: "VIVO", flavor: "Beterraba e morango", desc: "Beterraba, morango, maçã e um toque de limão. Cor intensa, gosto doce e energia para a tarde toda.", a: "#c4304f", b: "#e05a73", bot: "#d9275b", fruit: "berry", prices: ["R$ 12", "R$ 17", "R$ 30"] },
  { w: "SOL", flavor: "Laranja e cenoura", desc: "Laranja-pera, cenoura, abacaxi e açafrão. Um copo inteiro de vitamina C e cor de manhã de domingo.", a: "#e3601a", b: "#f08a40", bot: "#f5b733", fruit: "orange", prices: ["R$ 10", "R$ 15", "R$ 26"] },
  { w: "ROXO", flavor: "Uva e açaí", desc: "Uva roxa, açaí, mirtilo e banana. Cremoso, escuro e com antioxidante de sobra.", a: "#5d1fa8", b: "#8438d1", bot: "#c13cc4", fruit: "blue", prices: ["R$ 13", "R$ 19", "R$ 33"] },
];
const SIZES = ["300 ml", "500 ml", "1 litro"];
const STEPS = [
  { t: "Escolha o sabor", d: "Quatro receitas fixas e uma especial da semana, todas sem açúcar adicionado." },
  { t: "Prensamos a frio", d: "A fruta entra na prensa de manhã cedo. Nada de calor, nada de conservante." },
  { t: "Entrega em 24 horas", d: "Garrafa gelada na sua porta em até um dia, com retorno do vidro." },
];
const KITS = [
  { n: "Detox 3 dias", p: "R$ 129", d: "9 garrafas de 300 ml com os quatro sabores.", c: "#3f9b5a" },
  { n: "Semana inteira", p: "R$ 239", d: "14 garrafas de 500 ml, entrega a cada 2 dias.", c: "#ee7d3c" },
  { n: "Para o time", p: "R$ 349", d: "20 garrafas de 300 ml para escritório ou treino.", c: "#5d1fa8" },
];

const Fruit = ({ k }: { k: P["fruit"] }) => {
  if (k === "lime") return (<svg viewBox="0 0 100 100" aria-hidden><circle cx="50" cy="50" r="46" fill="#b8e04a" stroke="#fff" strokeWidth="6" /><g stroke="#fff" strokeWidth="3"><path d="M50 8v84M8 50h84M20 20l60 60M80 20L20 80" /></g><circle cx="50" cy="50" r="6" fill="#fff" /></svg>);
  if (k === "orange") return (<svg viewBox="0 0 100 100" aria-hidden><circle cx="50" cy="50" r="46" fill="#ffb347" stroke="#fff3e0" strokeWidth="6" /><g stroke="#fff3e0" strokeWidth="3"><path d="M50 8v84M8 50h84M20 20l60 60M80 20L20 80" /></g></svg>);
  if (k === "berry") return (<svg viewBox="0 0 100 100" aria-hidden><path d="M50 92C24 76 14 54 24 36c8-12 20-10 26-4 6-6 18-8 26 4 10 18 0 40-26 56z" fill="#ff4a6e" /><g fill="#ffd1da">{[[38, 46], [58, 46], [48, 62], [34, 62], [62, 62], [48, 78]].map(([x, y], i) => (<ellipse key={i} cx={x} cy={y} rx="2.800" ry="4" />))}</g><path d="M40 28c4-8 16-8 20 0-6-2-14-2-20 0z" fill="#3a8a3a" /></svg>);
  return (<svg viewBox="0 0 100 100" aria-hidden><circle cx="38" cy="58" r="26" fill="#3b2a8a" /><circle cx="68" cy="50" r="22" fill="#4d38b0" /><circle cx="52" cy="76" r="14" fill="#2e2070" /><g fill="#9b8cf0"><path d="M38 52l4 4-4 4-4-4zM68 44l3 3-3 3-3-3z" /></g></svg>);
};
const Bottle = ({ c, w }: { c: string; w: string }) => (
  <svg viewBox="0 0 120 300" className="bot" role="img" aria-label={`Garrafa de suco ${w.toLowerCase()}`}>
    <ellipse cx="60" cy="290" rx="44" ry="8" fill="#000" opacity=".22" />
    <rect x="40" y="6" width="40" height="26" rx="6" fill="#fff" />
    <rect x="36" y="28" width="48" height="12" rx="4" fill="#eaeaea" />
    <path d="M38 40h44c6 0 10 6 10 12v224c0 8-6 14-14 14H42c-8 0-14-6-14-14V52c0-6 4-12 10-12z" fill={c} />
    <path d="M38 40h44c6 0 10 6 10 12v18H28V52c0-6 4-12 10-12z" fill="#000" opacity=".12" />
    <rect x="28" y="110" width="64" height="120" fill="#fff" opacity=".94" />
    <text x="60" y="150" textAnchor="middle" fontFamily="Oswald, sans-serif" fontWeight="700" fontSize="24" fill="#1d2a14">GOTA</text>
    <text x="60" y="174" textAnchor="middle" fontFamily="Oswald, sans-serif" fontWeight="700" fontSize="24" fill={c}>VIVA</text>
    <rect x="42" y="190" width="36" height="3" fill="#1d2a14" opacity=".6" /><rect x="46" y="200" width="28" height="3" fill="#1d2a14" opacity=".35" />
    <path d="M40 56c-4 40-4 120 0 200" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".35" fill="none" />
  </svg>
);

export function SucoFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Gota Viva";
  const city = client?.city?.trim() || "Florianópolis";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [sel, setSel] = useState<number[]>([1, 1, 1, 1]);
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const wa = (what?: string) => `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero ${what ?? "fazer um pedido de sucos"} na ${brand}.`)}`;

  return (
    <div className="sj" style={{ fontFamily: "Inter, system-ui, sans-serif", color: INK, background: `radial-gradient(120% 80% at 50% 0%, #a6e84f, ${BGG} 45%, #6cc22a)`, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');
        .sj *{box-sizing:border-box}
        .sj a,.sj button{font-family:inherit}
        .sj .os{font-family:Oswald,Impact,sans-serif;text-transform:uppercase}
        .sj .card{max-width:1180px;margin:46px auto 0;width:calc(100% - 56px);border-radius:14px 14px 0 0;overflow:hidden;box-shadow:0 30px 60px rgba(20,60,0,.35);position:relative}
        .sj .nav{position:absolute;top:0;left:0;right:0;z-index:20;display:flex;align-items:center;justify-content:space-between;padding:18px 44px;color:#fff}
        .sj .logo{font-family:Oswald;font-size:26px;font-weight:700;text-transform:uppercase;letter-spacing:.01em;line-height:1}
        .sj .links{display:flex;gap:26px;font-size:13.5px;font-weight:500}
        .sj .links a{cursor:pointer;color:#fff}
        .sj .pill{background:#fff;color:${INK};border:0;border-radius:999px;padding:0 20px;min-height:36px;font-weight:600;font-size:13.5px;cursor:pointer;display:inline-flex;align-items:center;gap:8px;text-decoration:none}
        .sj .burger{display:none;background:none;border:0;width:44px;height:44px;cursor:pointer}
        .sj .mmenu{position:absolute;top:64px;left:12px;right:12px;background:#fff;border-radius:14px;padding:8px;z-index:30;display:flex;flex-direction:column;box-shadow:0 12px 30px rgba(0,0,0,.25)}
        .sj .mmenu a{padding:14px 12px;font-weight:600;cursor:pointer;color:${INK}}
        .sj .pan{position:relative;color:#fff;border-radius:18px 18px 0 0;margin-top:-34px;min-height:340px;padding:0 44px;display:grid;grid-template-columns:1fr 1.5fr 1fr;align-items:center;overflow:hidden}
        .sj .pan:first-of-type{margin-top:0;border-radius:0;padding-top:46px}
        .sj .pan .tx{position:relative;z-index:3;padding-top:34px;max-width:300px}
        .sj .pan .tx h3{font-family:Inter;font-weight:600;font-size:28px;line-height:1.1;letter-spacing:-.02em;margin:0 0 14px}
        .sj .pan .tx p{font-size:13.5px;line-height:1.55;margin:0 0 16px;opacity:.95}
        .sj .pan .tx a{color:#fff;font-weight:700;font-size:13.5px;text-decoration:none;border-bottom:1.5px solid #fff;padding-bottom:1px}
        .sj .mid{position:relative;height:340px}
        .sj .word{position:absolute;left:50%;top:38px;transform:translateX(-50%);font-family:Oswald;font-weight:700;font-size:min(var(--fs),var(--fm));line-height:1;color:#fff;white-space:nowrap;letter-spacing:-.01em}
        .sj .bot{position:absolute;left:50%;top:14px;width:104px;transform:translateX(-50%);z-index:2;filter:drop-shadow(0 14px 18px rgba(0,0,0,.25))}
        .sj .fr{position:absolute;width:86px;z-index:3;right:6%;bottom:36px}
        .sj .rt{position:relative;z-index:3;justify-self:end;text-align:right;padding-top:34px}
        .sj .rt small{display:block;font-size:12.5px;opacity:.9;margin-bottom:12px}
        .sj .sz{display:flex;gap:10px;justify-content:flex-end}
        .sj .sz button{width:56px;height:56px;border-radius:50%;border:0;cursor:pointer;background:rgba(255,255,255,.4);color:#fff;font-weight:700;text-shadow:0 1px 2px rgba(0,0,0,.18);font-size:12.5px;line-height:1.15}
        .sj .sz button.on{background:#fff;color:${INK}}
        .sj .price{font-family:Oswald;font-size:38px;font-weight:600;margin:16px 0 10px;letter-spacing:.01em}
        .sj .buy{background:#fff;color:${INK};border:0;border-radius:999px;padding:0 22px;min-height:42px;font-weight:700;font-size:14px;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center}
        .sj .sec{background:#fbfff3;padding:90px 0;position:relative;margin-top:-34px;border-radius:18px 18px 0 0}
        .sj .wrap{max-width:1000px;margin:0 auto;padding:0 28px}
        .sj h2{font-family:Oswald;font-weight:700;text-transform:uppercase;font-size:clamp(34px,5vw,60px);line-height:1.06;margin:0 0 14px;letter-spacing:-.005em;text-wrap:balance}
        .sj .lead{font-size:17px;line-height:1.5;color:#46583a;max-width:520px;margin:0 0 44px}
        .sj .st{display:grid;grid-template-columns:repeat(3,1fr);gap:26px}
        .sj .st div{border-top:3px solid ${INK};padding-top:18px}
        .sj .st i{font-family:Oswald;font-style:normal;font-size:60px;font-weight:700;display:block;line-height:1;margin-bottom:8px}
        .sj .st b{font-size:18px;display:block;margin-bottom:6px}
        .sj .st span{color:#46583a;font-size:15px;line-height:1.5}
        .sj .kits{background:${INK};color:#fff;padding:90px 0}
        .sj .kg{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px}
        .sj .kg div{border-radius:18px;padding:28px 24px;color:#fff;display:flex;flex-direction:column;gap:8px}
        .sj .kg b{font-family:Oswald;font-size:26px;text-transform:uppercase;font-weight:600}
        .sj .kg strong{font-family:Oswald;font-size:50px;font-weight:700;line-height:1}
        .sj .kg span{font-size:15px;line-height:1.45;opacity:.95;margin-bottom:12px}
        .sj .cta{padding:100px 20px 90px;text-align:center;color:${INK}}
        .sj .cta h2{font-size:clamp(46px,9vw,110px);margin:0}
        .sj .cta p{max-width:480px;margin:18px auto 28px;font-size:17px;line-height:1.5}
        .sj .cta .buy{background:${INK};color:#fff;min-height:54px;padding:0 32px;font-size:16px}
        .sj .foot{background:${INK};color:#cbd9bd;display:grid;grid-template-columns:1.2fr 1fr 1fr 1fr;gap:26px;padding:36px 32px;font-size:14.5px;line-height:1.6}
        .sj .foot b{color:#fff}
        .sj .wa{position:fixed;right:18px;bottom:18px;z-index:40;width:58px;height:58px;border-radius:50%;background:#25d366;display:grid;place-items:center;box-shadow:0 8px 24px rgba(0,0,0,.35)}
        @media(max-width:900px){.sj .pan{grid-template-columns:1fr;padding:0 24px 30px;min-height:0}.sj .mid{height:300px;order:1;margin-top:60px}.sj .tx{order:2;padding-top:6px;max-width:none}.sj .rt{order:3;justify-self:start;text-align:left;padding-top:18px}.sj .sz{justify-content:flex-start}.sj .fr{right:10%}.sj .st,.sj .kg{grid-template-columns:1fr}}
        @media(max-width:760px){
          .sj .card{margin-top:0;width:100%;border-radius:0}
          .sj .links,.sj .nav .pill{display:none}.sj .burger{display:block}.sj .nav{padding:10px 12px 0 18px}
          .sj .word{font-size:var(--ms);top:44px}.sj .mid{height:270px}.sj .bot{width:92px}.sj .fr{width:64px;bottom:20px}
          .sj .pan{margin-top:-28px}.sj .wrap{padding:0 20px}.sj .sec,.sj .kits{padding:64px 0}.sj .cta{padding:70px 20px}
          .sj .foot{grid-template-columns:1fr 1fr;padding:30px 20px}
        }
      `}</style>

      <div className="card" id="top">
        <div className="nav">
          <div className="logo">{brand}</div>
          <div className="links"><a onClick={() => go("sabores")}>Sabores</a><a onClick={() => go("como")}>Como funciona</a><a onClick={() => go("kits")}>Kits</a><a onClick={() => go("pedido")}>Contato</a></div>
          <a className="pill" href={wa()} target="_blank" rel="noreferrer">Fazer pedido ↗</a>
          <button type="button" className="burger" aria-label="Menu" onClick={() => setMenu((m) => !m)}><svg width="26" height="26" viewBox="0 0 26 26" stroke="#fff" strokeWidth="2"><path d="M3 7h20M3 13h20M3 19h20" /></svg></button>
          {menu && <div className="mmenu"><a onClick={() => go("sabores")}>Sabores</a><a onClick={() => go("kits")}>Kits</a><a onClick={() => go("pedido")}>Fazer pedido</a></div>}
        </div>

        <div id="sabores">
          {PANELS.map((p, i) => (
            <div className="pan" key={p.w} style={{ background: `linear-gradient(110deg, ${p.a}, ${p.b} 70%)`, zIndex: i + 1 }}>
              <div className="tx"><h3>{p.flavor}</h3><p>{p.desc}</p><a href={wa(`saber mais do suco ${p.w.toLowerCase()}`)} target="_blank" rel="noreferrer">Ver ingredientes</a></div>
              <div className="mid"><div className="word" style={{ ["--fs" as string]: p.w.length > 5 ? "12.6vw" : "16vw", ["--fm" as string]: p.w.length > 5 ? "158px" : "205px", ["--ms" as string]: p.w.length > 5 ? "22vw" : "27vw" }}>{p.w}</div><Bottle c={p.bot} w={p.w} /><div className="fr"><Fruit k={p.fruit} /></div></div>
              <div className="rt">
                <small>Sabor {p.flavor.toLowerCase()}</small>
                <div className="sz">{SIZES.map((s, k) => (<button key={s} type="button" className={sel[i] === k ? "on" : ""} onClick={() => setSel((a) => a.map((v, j) => (j === i ? k : v)))}>{s.replace(" ", "\n")}</button>))}</div>
                <div className="price">{p.prices[sel[i] ?? 1]}</div>
                <a className="buy" href={wa(`pedir o suco ${p.w.toLowerCase()} de ${SIZES[sel[i] ?? 1]}`)} target="_blank" rel="noreferrer">Pedir agora ↗</a>
              </div>
            </div>
          ))}
        </div>

        <div className="sec" id="como" style={{ zIndex: 6 }}>
          <div className="wrap">
            <h2>Suco de verdade, do jeito que sai da fruta</h2>
            <p className="lead">Prensado a frio em {city}, engarrafado no mesmo dia e entregue gelado. Sem açúcar adicionado, sem concentrado, sem conservante.</p>
            <div className="st">{STEPS.map((s, i) => (<div key={s.t}><i>0{i + 1}</i><b>{s.t}</b><span>{s.d}</span></div>))}</div>
          </div>
        </div>

        <div className="kits" id="kits">
          <div className="wrap">
            <h2>Kits para a semana</h2>
            <p className="lead" style={{ color: "#c6d8b4", marginBottom: 0 }}>Assine e economize até 18%. Pause ou cancele quando quiser.</p>
            <div className="kg">{KITS.map((k) => (<div key={k.n} style={{ background: k.c }}><b>{k.n}</b><strong>{k.p}</strong><span>{k.d}</span><a className="buy" style={{ alignSelf: "flex-start" }} href={wa(`o kit ${k.n.toLowerCase()}`)} target="_blank" rel="noreferrer">Quero este ↗</a></div>))}</div>
          </div>
        </div>
      </div>

      <div className="cta" id="pedido">
        <h2>Beba o que é vivo</h2>
        <p>Peça pelo WhatsApp e receba suco prensado hoje, em {city} e região.</p>
        <a className="buy" href={wa()} target="_blank" rel="noreferrer">Pedir pelo WhatsApp ↗</a>
      </div>
      <div style={{ maxWidth: 1180, margin: "0 auto", width: "calc(100% - 56px)" }}>
        <div className="foot">
          <div><b className="os" style={{ fontSize: 22 }}>{brand}</b><br />Sucos prensados a frio</div>
          <div><b>Endereço</b><br />Rua das Palmeiras, 310, {city}</div>
          <div><b>Horário</b><br />Seg a sáb, 8h às 19h · Dom, 9h às 14h</div>
          <div><b>Contato</b><br />WhatsApp: {phone || "(00) 00000-0000"}</div>
        </div>
      </div>
      {sc && <a className="wa" href={wa()} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg></a>}
    </div>
  );
}
