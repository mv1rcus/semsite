import { useMemo, useState } from "react";

/** Farmácia de bairro calorosa, partindo de um pin de loja de farmácia clássica (DrugStore: categorias, ofertas com preço, entrega) modernizado: branco + teal profundo + âmbar, pedido rápido em 3 passos no WhatsApp com total estimado. */
const TEAL = "#0d7a6f", TEALD = "#095349", AMBER = "#f5a524", INK = "#17201d", MU = "#5f6b67", BG = "#ffffff", SOFT = "#f2f7f5", LN = "#e2ebe8";
const ITEMS = [
  { id: "vitc", n: "Vitamina C 500mg", d: "60 cápsulas", p: 42.9, old: 54.9, img: "/fa-i1.webp" },
  { id: "fps", n: "Protetor Solar FPS 50", d: "toque seco, 120g", p: 58.9, old: 0, img: "/fa-i2.webp" },
  { id: "fralda", n: "Fraldas Conforto M", d: "pacote com 36 unidades", p: 62.9, old: 74.9, img: "/fa-i3.webp" },
  { id: "termo", n: "Termômetro Digital + Kit", d: "ponta flexível + necessaire", p: 24.9, old: 0, img: "/fa-i4.webp" },
];
const CATS = [
  { n: "Vitaminas", ic: "M12 2v4m0 12v4M2 12h4m12 0h4M7 7l2.5 2.5M14.5 14.5 17 17M17 7l-2.5 2.5M9.5 14.5 7 17" },
  { n: "Dor e febre", ic: "M12 3v18M5 8c2 2 5 2 7 0s5-2 7 0M5 16c2-2 5-2 7 0s5 2 7 0" },
  { n: "Bebês", ic: "M12 21c-4-3-8-5.5-8-10a8 8 0 0 1 16 0c0 4.5-4 7-8 10zM9 10h.01M15 10h.01" },
  { n: "Dermocosméticos", ic: "M12 3c3 4 6 6.5 6 10a6 6 0 0 1-12 0c0-3.5 3-6 6-10z" },
  { n: "Higiene", ic: "M7 3h10v4H7zM9 7v13a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V7" },
  { n: "Primeiros socorros", ic: "M12 8v8M8 12h8M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" },
];
const HOW = [
  { t: "Manda a lista ou a receita", d: "Foto da receita, nome do remédio ou a lista de sempre: a gente entende tudo no WhatsApp.", ic: "M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2z" },
  { t: "Confirmamos o total", d: "Farmacêutica confere doses e interações antes de fechar o pedido. Segurança primeiro.", ic: "M20 6 9 17l-5-5" },
  { t: "Entrega em até 1h", d: "No bairro e arredores. Prefere buscar? Retira no balcão sem fila, já separado.", ic: "M12 2v10l6 4M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z" },
];
const REVIEWS = [
  { q: "Mandei a receita da minha mãe às 19h e às 19h40 o motoboy tocou a campainha. Ainda ligaram pra confirmar a dosagem.", n: "Sônia R., Aldeota" },
  { q: "Preço melhor que as redes grandes e ainda lembro dos meus remédios de uso contínuo. Virou a farmácia da família.", n: "José A., Meireles" },
  { q: "Precisei de fralda de madrugada no sábado. Até 22h abertos e atendimento no WhatsApp na hora. Salvou demais.", n: "Marina C., Papicu" },
];
const Ic = ({ d, s = 24, c = INK }: { d: string; s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);
const CROSS = "M9 3h6v6h6v6h-6v6H9v-6H3V9h6z";

export function FarmaciaSaviaFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Farmácia Sávia";
  const city = client?.city?.trim() || "Fortaleza";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [sel, setSel] = useState<string[]>([]);
  const [mode, setMode] = useState<"entrega" | "retirada">("entrega");
  const [cust, setCust] = useState("");
  const [menu, setMenu] = useState(false);
  const start = (i?: (typeof ITEMS)[number]) => { if (i) setSel([i.id]); setStep(1); setOpen(true); setMenu(false); };
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const toggle = (id: string) => setSel((xs) => xs.includes(id) ? xs.filter((x) => x !== id) : [...xs, id]);
  const chosen = useMemo(() => ITEMS.filter((i) => sel.includes(i.id)), [sel]);
  const total = chosen.reduce((a, i) => a + i.p, 0);
  const money = (v: number) => `R$ ${v.toFixed(2).replace(".", ",")}`;
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero pedir na ${brand}${cust ? ` em nome de ${cust}` : ""}: ${chosen.map((i) => i.n).join(", ") || "itens a combinar"} (${mode === "entrega" ? "entrega" : "retirada no balcão"}; total estimado ${money(total)}).`)}`;

  return (
    <div className="fa" style={{ fontFamily: "Hanken Grotesk, system-ui, sans-serif", color: INK, background: BG, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;600;700;800&family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap');
        .fa *{box-sizing:border-box}
        .fa a,.fa button{font-family:inherit}
        .fa .wrap{max-width:1160px;margin:0 auto;padding:0 24px}
        .fa .strip{background:${TEALD};color:#cde8e2;font-size:12.5px;font-weight:600;padding:9px 0;text-align:center;letter-spacing:.4px}
        .fa .nav{display:flex;align-items:center;justify-content:space-between;height:82px;gap:20px}
        .fa .logo{display:flex;align-items:center;gap:10px;font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:24px;color:${INK};white-space:nowrap}
        .fa .logo .mk{width:38px;height:38px;border-radius:12px;background:${TEAL};display:grid;place-items:center}
        .fa .links{display:flex;gap:28px;font-size:15px;font-weight:600}
        .fa .links a{color:${MU};cursor:pointer;transition:color .2s}.fa .links a:hover{color:${TEAL}}
        .fa .btn{background:${TEAL};color:#fff;border:0;border-radius:14px;padding:0 24px;min-height:50px;font-weight:700;font-size:15px;cursor:pointer;display:inline-flex;align-items:center;gap:10px;text-decoration:none;box-shadow:0 3px 0 ${TEALD}}
        .fa .btn:hover{background:${TEALD}}
        .fa .btn.o{background:#fff;color:${TEAL};border:2px solid ${TEAL};box-shadow:none}
        .fa .btn.o:hover{background:${SOFT}}
        .fa .burger{display:none;background:none;border:0;width:44px;height:44px;cursor:pointer}
        .fa .hero{background:linear-gradient(180deg,${SOFT} 0%,#fff 100%);padding:44px 0 64px}
        .fa .herogrid{display:grid;grid-template-columns:1.05fr 1fr;gap:44px;align-items:center}
        .fa .kick{display:inline-flex;align-items:center;gap:8px;background:#fff;border:1.5px solid ${LN};color:${TEAL};font-weight:800;font-size:12px;letter-spacing:2px;text-transform:uppercase;padding:8px 14px;border-radius:999px}
        .fa h1{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:clamp(40px,4.8vw,62px);line-height:1.03;margin:20px 0 0;color:${INK};letter-spacing:-1.5px}
        .fa h1 .hl{color:${TEAL}}
        .fa .lead{font-size:17px;line-height:1.7;color:${MU};margin:22px 0 26px;max-width:470px}
        .fa .trust{display:flex;gap:18px;flex-wrap:wrap;margin-top:26px}
        .fa .trust span{display:flex;align-items:center;gap:8px;font-size:13.5px;font-weight:700;color:${INK}}
        .fa .himg{position:relative}
        .fa .himg img{width:100%;border-radius:24px;display:block;box-shadow:0 24px 48px rgba(9,83,73,.18)}
        .fa .himg .pill{position:absolute;left:-16px;bottom:26px;background:#fff;border-radius:16px;padding:14px 18px;box-shadow:0 14px 30px rgba(23,32,29,.16);display:flex;gap:12px;align-items:center}
        .fa .himg .pill b{display:block;font-size:14.5px}
        .fa .himg .pill small{color:${MU};font-size:12px;font-weight:600}
        .fa .banners{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:22px}
        .fa .bann{border-radius:18px;padding:22px 24px;display:flex;justify-content:space-between;align-items:center;gap:14px}
        .fa .bann.a{background:${AMBER};color:#4a3200}
        .fa .bann.b{background:${TEAL};color:#fff}
        .fa .bann b{font-family:'Bricolage Grotesque',sans-serif;font-size:21px;font-weight:800;display:block;line-height:1.15}
        .fa .bann small{font-size:13px;font-weight:700;opacity:.95}
        .fa .sec{padding:72px 0}
        .fa .center{text-align:center;max-width:620px;margin:0 auto}
        .fa .kick2{color:${TEAL};font-weight:800;font-size:12px;letter-spacing:3px;text-transform:uppercase}
        .fa h2{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:clamp(30px,3.6vw,44px);margin:10px 0 0;color:${INK};line-height:1.08;letter-spacing:-1px}
        .fa .sub{color:${MU};font-size:16px;margin-top:12px;line-height:1.65}
        .fa .cats{display:grid;grid-template-columns:repeat(6,1fr);gap:12px;margin-top:38px}
        .fa .cat{background:#fff;border:1.5px solid ${LN};border-radius:18px;padding:20px 12px;text-align:center;cursor:pointer;transition:border-color .15s,transform .15s}
        .fa .cat:hover{border-color:${TEAL};transform:translateY(-3px)}
        .fa .cat .ci{width:48px;height:48px;border-radius:14px;background:#e0efe9;display:grid;place-items:center;margin:0 auto 10px}
        .fa .cat b{font-size:13.5px;font-weight:700;color:${INK};display:block;line-height:1.25}
        .fa .grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:38px}
        .fa .card{background:#fff;border:1.5px solid ${LN};border-radius:20px;overflow:hidden;display:flex;flex-direction:column;transition:box-shadow .2s,border-color .2s}
        .fa .card:hover{box-shadow:0 16px 34px rgba(9,83,73,.12);border-color:${TEAL}}
        .fa .card .ph{position:relative}
        .fa .card img{width:100%;aspect-ratio:1/1;object-fit:cover;display:block}
        .fa .card .off{position:absolute;left:12px;top:12px;background:${AMBER};color:#4a3200;font-size:11.5px;font-weight:800;padding:6px 10px;border-radius:8px;letter-spacing:.5px}
        .fa .card .lb{padding:16px;display:flex;flex-direction:column;flex:1}
        .fa .card b{font-size:15.5px;font-weight:700;color:${INK};display:block}
        .fa .card small{color:${MU};font-size:12.5px;font-weight:600;display:block;margin-top:2px}
        .fa .card .pr{margin-top:10px;display:flex;align-items:baseline;gap:8px}
        .fa .card .pr strong{font-family:'Bricolage Grotesque',sans-serif;font-size:21px;color:${TEAL}}
        .fa .card .pr s{color:#7d8a86;font-size:13px;font-weight:600}
        .fa .card .go{margin-top:auto;padding-top:14px}
        .fa .card .go button{width:100%;background:${TEAL};border:0;color:#fff;border-radius:12px;min-height:44px;font-weight:700;font-size:14px;cursor:pointer}
        .fa .card .go button:hover{background:${TEALD}}
        .fa .steps{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:38px}
        .fa .step{background:#fff;border:1.5px solid ${LN};border-radius:20px;padding:26px 24px}
        .fa .step .ic{width:50px;height:50px;border-radius:14px;background:${TEAL};display:grid;place-items:center;margin-bottom:16px}
        .fa .step b{font-family:'Bricolage Grotesque',sans-serif;font-size:19px;display:block;color:${INK}}
        .fa .step p{color:${MU};font-size:14px;line-height:1.6;margin:8px 0 0}
        .fa .about{background:${SOFT};padding:72px 0}
        .fa .aboutg{display:grid;grid-template-columns:1fr 1fr;gap:44px;align-items:center}
        .fa .aboutg img{width:100%;border-radius:24px;display:block}
        .fa .aboutg p{color:${MU};font-size:15.5px;line-height:1.75;margin-top:18px}
        .fa .rowc{display:flex;gap:12px;flex-wrap:wrap;margin-top:22px}
        .fa .rowc span{background:#fff;border:1.5px solid ${LN};color:${INK};font-size:13px;font-weight:700;padding:9px 14px;border-radius:999px}
        .fa .revs{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:38px}
        .fa .rev{background:#fff;border:1.5px solid ${LN};border-radius:20px;padding:26px}
        .fa .rev q{font-size:14.5px;line-height:1.7;color:${INK};display:block;quotes:'“' '”'}
        .fa .rev small{color:${MU};font-weight:700;font-size:13px;display:block;margin-top:14px}
        .fa .cta{background:${TEAL};color:#fff;padding:72px 0;text-align:center}
        .fa .cta h2{color:#fff}
        .fa .cta .sub{color:#bfe3dc}
        .fa .cta .btn{background:#fff;color:${TEALD};box-shadow:0 3px 0 rgba(0,0,0,.2)}
        .fa .cta .btn:hover{background:#f0f9f6}
        .fa .foot{background:${INK};color:#9fb3ae;padding:52px 0 30px;font-size:14px}
        .fa .footg{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:36px}
        .fa .foot h4{color:#fff;font-size:13px;text-transform:uppercase;letter-spacing:2px;margin:0 0 14px}
        .fa .foot .logo{color:#fff;margin-bottom:12px}
        .fa .copy{border-top:1px solid #2c3a36;margin-top:36px;padding-top:22px;display:flex;justify-content:space-between;gap:14px;flex-wrap:wrap;font-size:13px;color:#9fb3ae}
        .fa .ov{position:fixed;inset:0;background:rgba(12,20,17,.55);z-index:120;display:flex;align-items:center;justify-content:center;padding:16px}
        .fa .mdl{background:#fff;border-radius:24px;width:100%;max-width:520px;max-height:88vh;overflow:auto;padding:30px;position:relative}
        .fa .dots{display:flex;gap:8px;justify-content:center;margin-bottom:20px}
        .fa .dots i{width:30px;height:6px;border-radius:3px;background:${LN}}
        .fa .dots i.on{background:${TEAL}}
        .fa .selitem{display:flex;gap:14px;align-items:center;padding:12px;border:1.5px solid ${LN};border-radius:16px;cursor:pointer;margin-bottom:10px;transition:border-color .15s}
        .fa .selitem.on{border-color:${TEAL};background:${SOFT}}
        .fa .selitem img{width:56px;height:56px;border-radius:12px;object-fit:cover}
        .fa .selitem b{font-size:14.5px;display:block}
        .fa .selitem small{color:${MU};font-size:12.5px;font-weight:600}
        .fa .selitem .p{margin-left:auto;text-align:right;white-space:nowrap}
        .fa .selitem .p strong{font-size:15px;color:${TEAL};display:block}
        .fa .selitem .p s{color:${MU};font-size:11.5px}
        .fa .modes{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:14px 0}
        .fa .modes button{padding:16px;border:1.5px solid ${LN};border-radius:14px;background:#fff;font-weight:700;font-size:14px;cursor:pointer;color:${INK}}
        .fa .modes button.on{border-color:${TEAL};background:${SOFT};color:${TEAL}}
        .fa .in{width:100%;border:1.5px solid ${LN};border-radius:12px;min-height:50px;padding:0 16px;font-size:15px;font-family:inherit;margin-bottom:12px;background:#fff;color:${INK};box-sizing:border-box}
        .fa .in:focus{outline:2px solid ${TEAL};border-color:transparent}
        .fa .sumr{display:flex;justify-content:space-between;font-size:14px;padding:8px 0;border-bottom:1px dashed ${LN};color:${MU}}
        .fa .sumr b{color:${INK}}
        .fa .sumt{display:flex;justify-content:space-between;padding:14px 0 2px;font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:19px}
        .fa .sumt .v{color:${TEAL}}
        .fa .x{position:absolute;right:16px;top:16px;width:40px;height:40px;border-radius:50%;border:0;background:${SOFT};font-size:18px;cursor:pointer;color:${MU}}
        .fa .links.open{display:flex;position:fixed;left:0;right:0;top:98px;flex-direction:column;background:#fff;padding:20px 24px 28px;gap:18px;box-shadow:0 24px 40px rgba(0,0,0,.14);z-index:110;font-size:17px}
        @media (max-width:1020px){
          .fa .cats{grid-template-columns:repeat(3,1fr)}
          .fa .grid4{grid-template-columns:1fr 1fr}
          .fa .steps{grid-template-columns:1fr;max-width:520px;margin-left:auto;margin-right:auto}
          .fa .footg{grid-template-columns:1fr 1fr}
        }
        @media (max-width:860px){
          .fa .links{display:none}
          .fa .nav .btn{display:none}
          .fa .burger{display:block}
          .fa .herogrid{grid-template-columns:1fr}
          .fa .himg{order:2}
          .fa .himg .pill{left:12px}
          .fa .banners{grid-template-columns:1fr}
          .fa .aboutg{grid-template-columns:1fr}
          .fa .revs{grid-template-columns:1fr}
          .fa .sec{padding:52px 0}
          .fa .about,.fa .cta{padding:52px 0}
        }
        @media (max-width:560px){
          .fa .cats{grid-template-columns:1fr 1fr}
          .fa .grid4{grid-template-columns:1fr 1fr;gap:10px}
          .fa .footg{grid-template-columns:1fr}
          .fa .card .lb{padding:12px}
          .fa .lead{font-size:17.5px}
          .fa .card small{font-size:13px}
          .fa .card b{font-size:15px}
          .fa .step p{font-size:15px}
          .fa .rev q{font-size:15px}
          .fa .foot{font-size:15px}
          .fa .sub{font-size:16.5px}
        }
      `}</style>

      <div className="strip">Entrega em até 1h no bairro · Abertos todos os dias até as 22h · Receita digital aceita</div>
      <header className="wrap nav">
        <div className="logo">
          <span className="mk"><Ic d={CROSS} s={20} c="#fff" /></span>
          {brand}
        </div>
        <nav className={menu ? "links open" : "links"}>
          {["Ofertas", "Categorias", "Como funciona", "Sobre", "Avaliações"].map((t, i) => (
            <a key={t} onClick={() => go(["ofertas", "cats", "como", "sobre", "revs"][i] ?? "ofertas")}>{t}</a>
          ))}
        </nav>
        <button className="btn" onClick={() => start()}>Pedir no WhatsApp</button>
        <button className="burger" aria-label="Menu" onClick={() => setMenu(!menu)}>
          <Ic d="M4 7h16M4 12h16M4 17h16" />
        </button>
      </header>

      <section className="hero">
        <div className="wrap herogrid">
          <div>
            <span className="kick"><Ic d={CROSS} s={14} c={TEAL} /> Farmácia de bairro · {city}</span>
            <h1>A farmácia do seu bairro, agora <span className="hl">no seu WhatsApp</span></h1>
            <p className="lead">Remédios, vitaminas e itens de cuidado com entrega rápida e atendimento de farmacêutica de verdade. Sem app pra baixar, sem cadastro: só um "oi" e a gente resolve.</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="btn" onClick={() => start()}>Montar meu pedido no WhatsApp</button>
              <button className="btn o" onClick={() => go("ofertas")}>Ver ofertas da semana</button>
            </div>
            <div className="trust">
              <span><Ic d="M12 2v10l6 4M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z" s={16} c={TEAL} /> Entrega em 1h</span>
              <span><Ic d="M20 6 9 17l-5-5" s={16} c={TEAL} /> Abertos até 22h</span>
              <span><Ic d="M7 3h10v18H7zM7 8h10M10 13h4" s={16} c={TEAL} /> Receita digital aceita</span>
            </div>
          </div>
          <div className="himg">
            <img src="/fa-hero.webp" alt="Farmacêutica da Sávia atendendo no balcão" />
            <div className="pill">
              <Ic d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2z" s={22} c={TEAL} />
              <div><b>Resposta em minutos</b><small>Seg a Sáb, 7h às 22h · Dom, 8h às 20h</small></div>
            </div>
          </div>
        </div>
        <div className="wrap banners">
          <div className="bann a">
            <div><b>−15% em todas as vitaminas</b><small>C, D, Zinco e complexos. Só esta semana.</small></div>
            <Ic d="M12 2v4m0 12v4M2 12h4m12 0h4" s={30} c="#4a3200" />
          </div>
          <div className="bann b">
            <div><b>Entrega grátis acima de R$ 60</b><small>No bairro e em todo o raio de 4 km.</small></div>
            <Ic d="M12 2v10l6 4M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z" s={30} c="#fff" />
          </div>
        </div>
      </section>

      <section className="sec" id="cats">
        <div className="wrap">
          <div className="center">
            <span className="kick2">Tudo por aqui</span>
            <h2>Categorias que resolvem o seu dia</h2>
          </div>
          <div className="cats">
            {CATS.map((c) => (
              <div className="cat" key={c.n} onClick={() => start()}>
                <div className="ci"><Ic d={c.ic} s={24} c={TEAL} /></div>
                <b>{c.n}</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="ofertas" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="center">
            <span className="kick2">Só até domingo</span>
            <h2>Ofertas da semana</h2>
            <p className="sub">Preço de balcão, sem app e sem cadastro. Pediu no WhatsApp, a gente separa na hora.</p>
          </div>
          <div className="grid4">
            {ITEMS.map((i) => (
              <div className="card" key={i.id}>
                <div className="ph">
                  <img src={i.img} alt={i.n} />
                  {i.old > 0 && <span className="off">−{Math.round((1 - i.p / i.old) * 100)}%</span>}
                </div>
                <div className="lb">
                  <b>{i.n}</b>
                  <small>{i.d}</small>
                  <div className="pr"><strong>{money(i.p)}</strong>{i.old > 0 && <s>{money(i.old)}</s>}</div>
                  <div className="go"><button onClick={() => start(i)}>Adicionar ao pedido</button></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="como" style={{ background: SOFT, paddingTop: 72 }}>
        <div className="wrap">
          <div className="center">
            <span className="kick2">Simples assim</span>
            <h2>Como funciona o pedido</h2>
          </div>
          <div className="steps">
            {HOW.map((s) => (
              <div className="step" key={s.t}>
                <div className="ic"><Ic d={s.ic} s={24} c="#fff" /></div>
                <b>{s.t}</b>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about" id="sobre">
        <div className="wrap aboutg">
          <img src="/fa-store.webp" alt="Fachada da Farmácia Sávia ao entardecer" />
          <div>
            <span className="kick2">Desde 1998</span>
            <h2>A vizinha que cuida do bairro</h2>
            <p>Nascemos numa esquina de {city} e continuamos no mesmo ponto. Conhecemos os clientes pelo nome, lembramos dos remédios de uso contínuo e avisamos quando a caixa nova chega. Farmacêutica no balcão o dia inteiro, pronta pra orientar.</p>
            <div className="rowc">
              <span>CRF ativo</span>
              <span>Farmacêutica presente</span>
              <span>Mais de 20 mil entregas</span>
              <span>Aberto todo dia até 22h</span>
            </div>
            <div style={{ marginTop: 26 }}>
              <button className="btn" onClick={() => start()}>Pedir agora no WhatsApp</button>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" id="revs">
        <div className="wrap">
          <div className="center">
            <span className="kick2">Quem é daqui</span>
            <h2>O bairro recomenda</h2>
          </div>
          <div className="revs">
            {REVIEWS.map((r) => (
              <div className="rev" key={r.n}>
                <q>{r.q}</q>
                <small>{r.n}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap">
          <span className="kick2" style={{ color: "#bfe3dc" }}>Tá com a receita na mão?</span>
          <h2>Manda no WhatsApp que a gente separa</h2>
          <p className="sub" style={{ maxWidth: 480, margin: "12px auto 28px" }}>Foto da receita, nome do remédio ou a lista de sempre. Entregamos em até 1h ou deixamos pronto pra retirada.</p>
          <button className="btn" onClick={() => start()}>Montar meu pedido no WhatsApp</button>
        </div>
      </section>

      <footer className="foot">
        <div className="wrap footg">
          <div>
            <div className="logo">
              <span className="mk"><Ic d={CROSS} s={20} c="#fff" /></span>
              {brand}
            </div>
            <p>A farmácia de bairro que entrega rápido e atende de verdade, todos os dias até as 22h.</p>
          </div>
          <div>
            <h4>Visite a gente</h4>
            Rua das Acácias, 450<br />{city}<br />Seg a Sáb, 7h às 22h<br />Dom, 8h às 20h
          </div>
          <div>
            <h4>Pedidos</h4>
            WhatsApp e retirada no balcão<br />Entrega em até 1h no bairro<br />Aceitamos receita digital
          </div>
        </div>
        <div className="wrap copy">
          <span>{brand} — farmácia de bairro com entrega em 1h</span>
          <span>CRF em dia · Foto ilustrativa · Site de demonstração SemSite</span>
        </div>
      </footer>

      {open && (
        <div className="ov" onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div className="mdl">
            <button className="x" onClick={() => setOpen(false)}>✕</button>
            <div className="dots">{[1, 2, 3].map((s) => <i key={s} className={step >= s ? "on" : ""} />)}</div>
            {step === 1 && (
              <div>
                <h2 style={{ fontSize: 24 }}>O que você precisa?</h2>
                <p className="sub" style={{ fontSize: 14 }}>Marque os itens ou chame direto no WhatsApp pra algo que não esteja aqui.</p>
                <div style={{ marginTop: 16 }}>
                  {ITEMS.map((i) => (
                    <div key={i.id} className={sel.includes(i.id) ? "selitem on" : "selitem"} onClick={() => toggle(i.id)}>
                      <img src={i.img} alt={i.n} />
                      <div><b>{i.n}</b><small>{i.d}</small></div>
                      <div className="p"><strong>{money(i.p)}</strong>{i.old > 0 && <s>{money(i.old)}</s>}</div>
                    </div>
                  ))}
                </div>
                <button className="btn" style={{ width: "100%", justifyContent: "center" }} disabled={sel.length === 0} onClick={() => setStep(2)}>
                  Continuar{chosen.length > 0 && ` (${money(total)})`}
                </button>
              </div>
            )}
            {step === 2 && (
              <div>
                <h2 style={{ fontSize: 24 }}>Entrega ou retirada?</h2>
                <div className="modes">
                  <button className={mode === "entrega" ? "on" : ""} onClick={() => setMode("entrega")}>Entrega em 1h</button>
                  <button className={mode === "retirada" ? "on" : ""} onClick={() => setMode("retirada")}>Retirar no balcão</button>
                </div>
                <input className="in" placeholder="Seu nome" value={cust} onChange={(e) => setCust(e.target.value)} />
                <button className="btn" style={{ width: "100%", justifyContent: "center" }} onClick={() => setStep(3)}>Revisar pedido</button>
                <button className="btn o" style={{ width: "100%", justifyContent: "center", marginTop: 10 }} onClick={() => setStep(1)}>Voltar</button>
              </div>
            )}
            {step === 3 && (
              <div>
                <h2 style={{ fontSize: 24 }}>Resumo do pedido</h2>
                <div style={{ marginTop: 14 }}>
                  {chosen.map((i) => (
                    <div className="sumr" key={i.id}><span>{i.n}</span><b>{money(i.p)}</b></div>
                  ))}
                  <div className="sumr"><span>Modalidade</span><b>{mode === "entrega" ? "Entrega em 1h" : "Retirada no balcão"}</b></div>
                  <div className="sumt"><span>Total estimado</span><span className="v">{money(total)}</span></div>
                  <p className="sub" style={{ fontSize: 13 }}>A farmacêutica confirma disponibilidade, orienta sobre o uso e fecha o total exato no WhatsApp.</p>
                </div>
                <a className="btn" style={{ width: "100%", justifyContent: "center" }} href={wa} target="_blank" rel="noopener noreferrer">
                  Enviar pedido no WhatsApp
                </a>
                <button className="btn o" style={{ width: "100%", justifyContent: "center", marginTop: 10 }} onClick={() => setStep(2)}>Voltar</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
