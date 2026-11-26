import { useEffect, useState } from "react";

/** Pousada boutique na serra, do zero a partir de um pin verde-floresta com serifada (ELARA Eco Resort). Reserva em 3 passos que fecha no WhatsApp. */
const GREEN = "#122419", GREEN2 = "#1d3a29", CR = "#f3ede0", CR2 = "#e9dfc9", INK = "#182018", MU = "#5a6156", GOLD = "#c9903f";
const ROOMS = [
  { n: "Suíte Vista Serra", d: "Casal • varanda com vista", p: "a partir de R$ 520/noite", img: "/pou-s1.webp" },
  { n: "Chalé Lareira", d: "Casal • lareira de pedra", p: "a partir de R$ 640/noite", img: "/pou-s2.webp" },
  { n: "Suíte Varanda do Sol", d: "Casal • rede e nascer do sol", p: "a partir de R$ 580/noite", img: "/pou-s3.webp" },
  { n: "Chalé Família", d: "Até 5 • dois ambientes", p: "a partir de R$ 790/noite", img: "/pou-s4.webp" },
];
const PERKS = [
  { t: "Café colonial da casa", d: "Bolinhos, queijos e frutas da região", ic: "M4 8h13v7a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8zm13 1h2a2 2 0 0 1 0 4h-2M7 3v2m4-2v2" },
  { t: "Lareira e vinho à noite", d: "Salão de estar aquecido o ano todo", ic: "M12 2c2 4-2 5-2 8a2 2 0 0 0 4 0c0-1-.5-2-.5-2s3.5 1.5 3.5 5a5 5 0 0 1-10 0c0-5 5-6 5-11z" },
  { t: "Cachoeiras por perto", d: "8 quedas a menos de 20 minutos", ic: "M12 3v18m0-18c-3 2-5 2-7 2v6c2 0 4 0 7 2m0-10c3 2 5 2 7 2v6c-2 0-4 0-7 2" },
  { t: "Wi-fi e sossego", d: "Internet boa, barulho só de passarinho", ic: "M2 9a15 15 0 0 1 20 0M5.5 12.5a10 10 0 0 1 13 0M9 16a5 5 0 0 1 6 0M12 19.5h.01" },
];
const EXPS = [
  { n: "Cachoeiras cristalinas", d: "Poços e quedas na mata atlântica", img: "/pou-ex1.webp" },
  { n: "Trilhas entre araucárias", d: "Do passeio leve ao cume da Pedra Selada", img: "/pou-ex2.webp" },
  { n: "Piscina com vista", d: "Deck de madeira de frente pro vale", img: "/pou-ex3.webp" },
  { n: "Cavalgada ao amanhecer", d: "Passeio guiado pelas fazendas da região", img: "/pou-ex4.webp" },
];
const REVIEWS = [
  { q: "O café da manhã na varanda com aquele vale embaixo é coisa de filme. Voltamos todo ano.", n: "Patrícia e Rui, Belo Horizonte" },
  { q: "Chalé com lareira acesa esperando a gente chegar. Reserva pelo WhatsApp rapidinho, sem burocracia.", n: "Fernanda C., Rio de Janeiro" },
  { q: "Fomos com as crianças e os avós. Chalé família enorme, limpo, e a piscina com a vista mais bonita de Mauá.", n: "Marcelo A., São Paulo" },
];
const Ic = ({ d, s = 26, c = GOLD }: { d: string; s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);
const LEAF = "M11 20A7 7 0 0 1 4 13c0-4 3-8 8-10 5-2 8-1 8-1s-1 8-5 11c-2.4 1.8-4 2-4 2zm0 0c-2-3-2-6 1-9";

export function PousadaFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Pousada Serra do Vento";
  const city = client?.city?.trim() || "Visconde de Mauá, RJ";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [room, setRoom] = useState(ROOMS[0]!.n);
  const [inD, setInD] = useState("");
  const [outD, setOutD] = useState("");
  const [guests, setGuests] = useState(2);
  const [cust, setCust] = useState("");
  const [sc, setSc] = useState(false);
  const [menu, setMenu] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const start = (r?: string) => { if (r) setRoom(r); setStep(1); setOpen(true); setMenu(false); };
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const fmt = (v: string) => { const d = new Date(v + "T12:00:00"); return isNaN(d.getTime()) ? "-" : d.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "2-digit" }); };
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero reservar na ${brand}${cust ? ` em nome de ${cust}` : ""}: ${room}, check-in ${fmt(inD)}, check-out ${fmt(outD)}, ${guests} hóspede${guests > 1 ? "s" : ""}.`)}`;

  return (
    <div className="pf" style={{ fontFamily: "Manrope, system-ui, sans-serif", color: INK, background: CR, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Manrope:wght@400;500;600;700&display=swap');
        .pf *{box-sizing:border-box}
        .pf a,.pf button{font-family:inherit}
        .pf .wrap{max-width:1180px;margin:0 auto;padding:0 24px}
        .pf .nav{display:flex;align-items:center;justify-content:space-between;height:88px;gap:20px}
        .pf .logo{display:flex;align-items:center;gap:10px;font-family:'Cormorant Garamond',serif;font-weight:600;font-size:26px;color:#f3ede0;letter-spacing:.5px}
        .pf .logo .mark{width:40px;height:40px;border-radius:50%;border:1.5px solid ${GOLD};display:grid;place-items:center;flex:none}
        .pf .links{display:flex;gap:30px;font-size:14.5px;font-weight:600}
        .pf .links a{color:#c8cfc2;cursor:pointer;transition:color .2s}.pf .links a:hover{color:#fff}
        .pf .btn{background:${GOLD};color:#1c1408;border:0;border-radius:999px;padding:0 26px;min-height:50px;font-weight:700;font-size:15px;cursor:pointer;display:inline-flex;align-items:center;gap:10px;text-decoration:none}
        .pf .btn:hover{background:#d9a44f}
        .pf .btn.o{background:transparent;color:#f3ede0;border:1.5px solid rgba(243,237,224,.7)}
        .pf .btn.o:hover{border-color:${GOLD};color:#fff}
        .pf .burger{display:none;background:none;border:0;width:44px;height:44px;cursor:pointer}
        .pf .hero{background:${GREEN};color:${CR};padding-bottom:70px}
        .pf .herogrid{display:grid;grid-template-columns:1.05fr 1fr;align-items:center;gap:44px;min-height:620px}
        .pf .kick{font-size:12.5px;letter-spacing:3.5px;text-transform:uppercase;font-weight:700;color:${GOLD}}
        .pf h1{font-family:'Cormorant Garamond',serif;font-weight:500;font-size:clamp(44px,5.6vw,74px);line-height:1.02;margin:16px 0 0;color:#f6f1e4;letter-spacing:-.5px}
        .pf h1 em{font-style:italic;color:${GOLD}}
        .pf .lead{font-size:17.5px;line-height:1.7;color:#b9c2b2;margin:20px 0 28px;max-width:460px}
        .pf .feats{display:flex;gap:28px;margin-top:40px;flex-wrap:wrap}
        .pf .feats div{display:flex;flex-direction:column;align-items:center;gap:8px;font-size:13px;text-align:center;color:#c4ccbd;font-weight:600;max-width:110px}
        .pf .himg{position:relative}
        .pf .himg .arch{position:absolute;inset:-26px 8% auto;height:60%;border:1.5px solid #3c4f3e;border-radius:300px 300px 0 0}
        .pf .himg img{position:relative;width:100%;max-height:560px;object-fit:cover;border-radius:280px 280px 18px 18px;display:block}
        .pf .himg .badge{position:absolute;left:-16px;bottom:34px;background:${CR};color:${GREEN};border-radius:14px;padding:12px 18px;font-family:'Cormorant Garamond',serif;font-size:19px;font-style:italic;box-shadow:0 14px 30px rgba(0,0,0,.35)}
        .pf .sec{padding:74px 0}
        .pf .center{text-align:center;max-width:660px;margin:0 auto}
        .pf h2{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:clamp(32px,3.6vw,46px);margin:0;color:${GREEN};line-height:1.1}
        .pf h2 em{font-style:italic;font-weight:500;color:#6e4e14}
        .pf .sub{color:${MU};font-size:16px;margin-top:12px;line-height:1.65}
        .pf .grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:40px}
        .pf .card{background:#fffdf7;border:1px solid ${CR2};border-radius:18px;overflow:hidden;transition:transform .3s,box-shadow .3s;cursor:pointer;display:flex;flex-direction:column}
        .pf .card:hover{transform:translateY(-6px);box-shadow:0 18px 36px rgba(24,32,24,.14)}
        .pf .card img{width:100%;aspect-ratio:1/1.05;object-fit:cover;display:block}
        .pf .card .lb{padding:14px 16px 16px;display:flex;flex-direction:column;flex:1}
        .pf .card b{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:600;display:block;color:${GREEN}}
        .pf .card small{color:${MU};font-size:13.5px;display:block;margin-top:3px}
        .pf .card .pr{margin-top:auto;padding-top:10px;display:flex;align-items:center;justify-content:space-between;gap:8px}
        .pf .card .pr span{color:${GREEN};font-weight:700;font-size:13px;white-space:nowrap}
        .pf .card .go{width:30px;height:30px;border-radius:50%;background:${GREEN};color:${CR};display:grid;place-items:center;font-size:14px;flex:none}
        .pf .split{display:grid;grid-template-columns:1.05fr 1fr;gap:54px;align-items:center}
        .pf .bigimg{position:relative;border-radius:20px;overflow:hidden}
        .pf .bigimg img{width:100%;aspect-ratio:4/3.6;object-fit:cover;display:block}
        .pf .bigimg .tag{position:absolute;left:20px;bottom:18px;color:#fff;font-size:12.5px;letter-spacing:3px;text-transform:uppercase;font-weight:700;text-shadow:0 2px 12px rgba(0,0,0,.6)}
        .pf .plist{display:grid;grid-template-columns:1fr 1fr;gap:18px 22px;margin-top:28px}
        .pf .plist .pi{display:flex;gap:12px;align-items:flex-start}
        .pf .plist .pk{flex:none;width:42px;height:42px;border-radius:50%;background:#fffdf7;border:1px solid ${CR2};display:grid;place-items:center}
        .pf .plist b{font-size:15px;font-weight:700;display:block;color:${GREEN}}
        .pf .plist p{margin:2px 0 0;font-size:13.5px;color:${MU};line-height:1.5}
        .pf .exgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:40px}
        .pf .ex{position:relative;border-radius:18px;overflow:hidden;min-height:340px;display:flex;align-items:flex-end}
        .pf .ex img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .5s}
        .pf .ex:hover img{transform:scale(1.05)}
        .pf .ex .ov{position:relative;width:100%;padding:60px 16px 16px;background:linear-gradient(180deg,rgba(10,18,12,0) 0%,rgba(10,18,12,.92) 70%);color:#fff}
        .pf .ex b{font-family:'Cormorant Garamond',serif;font-size:21px;font-weight:600;display:block}
        .pf .ex small{font-size:13px;color:#d8dccd;display:block;margin-top:4px}
        .pf .dark{background:${GREEN};color:${CR}}
        .pf .dark h2{color:#f6f1e4}
        .pf .revs{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px}
        .pf .rev{background:${GREEN2};border:1px solid #2c4736;border-radius:18px;padding:26px}
        .pf .rev .st{color:${GOLD};letter-spacing:3px;font-size:13px}
        .pf .rev p{margin:12px 0 14px;font-size:15px;line-height:1.65;color:#dfe4d8}
        .pf .rev b{font-family:'Cormorant Garamond',serif;font-size:16.5px;color:${GOLD};font-weight:600}
        .pf .band{position:relative;border-radius:24px;overflow:hidden;margin:8px 0 70px}
        .pf .band img{width:100%;height:340px;object-fit:cover;display:block;filter:brightness(.42)}
        .pf .band .in{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;text-align:center;color:#fff;padding:20px}
        .pf .band h3{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:clamp(28px,3.4vw,44px);margin:0}
        .pf footer{background:#0c1a11;color:#bcc6b4}
        .pf .fg{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:36px;padding:54px 0 40px}
        .pf footer h4{font-family:'Cormorant Garamond',serif;color:#f3ede0;font-size:19px;margin:0 0 14px;font-weight:600}
        .pf footer p,.pf footer a{font-size:14px;line-height:1.8;color:#bcc6b4;text-decoration:none;display:block}
        .pf footer a:hover{color:#fff;cursor:pointer}
        .pf .fbot{border-top:1px solid #223324;padding:18px 0;font-size:12.5px;color:#93a08a;display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap}
        .pf .modal{position:fixed;inset:0;z-index:50;display:grid;place-items:center;padding:16px;background:rgba(10,16,11,.72);backdrop-filter:blur(4px)}
        .pf .mbox{background:${CR};border-radius:22px;width:min(560px,100%);max-height:92vh;overflow:auto;padding:30px;position:relative}
        .pf .mbox h3{font-family:'Cormorant Garamond',serif;font-size:29px;font-weight:600;margin:0;color:${GREEN}}
        .pf .mbox .stp{display:flex;gap:6px;margin:16px 0 22px}
        .pf .mbox .stp i{flex:1;height:4px;border-radius:99px;background:#ddd2ba}
        .pf .mbox .stp i.on{background:${GOLD}}
        .pf .opt{display:grid;gap:10px}
        .pf .opt button{text-align:left;background:#fffdf7;border:1.5px solid ${CR2};border-radius:14px;padding:13px 16px;cursor:pointer;font-size:15px;font-weight:600;color:${INK};display:flex;justify-content:space-between;gap:10px;align-items:center}
        .pf .opt button.sel{border-color:${GREEN};box-shadow:0 0 0 1px ${GREEN}}
        .pf .opt small{font-weight:500;color:${MU}}
        .pf .fld{margin-bottom:14px}
        .pf .fld label{display:block;font-size:13px;font-weight:700;color:${GREEN};margin-bottom:6px}
        .pf .fld input{width:100%;border:1.5px solid ${CR2};border-radius:12px;padding:12px 14px;font-size:15px;background:#fffdf7;font-family:inherit;color:${INK}}
        .pf .fld2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
        .pf .stepper{display:flex;align-items:center;gap:14px}
        .pf .stepper button{width:42px;height:42px;border-radius:50%;border:1.5px solid ${CR2};background:#fffdf7;font-size:20px;cursor:pointer;color:${GREEN}}
        .pf .stepper b{font-size:17px;min-width:70px;text-align:center}
        .pf .mnav{display:flex;gap:10px;margin-top:22px}
        .pf .mnav .btn{flex:1;justify-content:center}
        .pf .mnav .btn.ghost{background:transparent;color:${GREEN};border:1.5px solid ${CR2}}
        .pf .close{position:absolute;right:16px;top:16px;width:38px;height:38px;border-radius:50%;border:0;background:#e5dac4;font-size:16px;cursor:pointer;color:${GREEN}}
        .pf .sum{background:#fffdf7;border:1px solid ${CR2};border-radius:14px;padding:16px;font-size:14.5px;line-height:1.9;color:${INK}}
        .pf .sum b{color:${GREEN}}
        .pf .fab{position:fixed;right:18px;bottom:18px;z-index:40;display:none}
        .pf .mmenu{position:fixed;inset:0;z-index:60;background:${GREEN};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:26px}
        .pf .mmenu a{color:#f3ede0;font-family:'Cormorant Garamond',serif;font-size:32px;cursor:pointer}
        .pf .mmenu .x{position:absolute;top:20px;right:20px;background:none;border:0;color:#f3ede0;font-size:26px;cursor:pointer}
        @media (max-width:900px){
          .pf .sec{padding:52px 0}
          .pf .band img{height:280px}
          .pf .links{display:none}
          .pf .burger{display:block}
          .pf .herogrid,.pf .split{grid-template-columns:1fr;min-height:0}
          .pf .himg{margin-top:10px}
          .pf .grid4,.pf .exgrid{grid-template-columns:repeat(2,1fr)}
          .pf .revs{grid-template-columns:1fr}
          .pf .fg{grid-template-columns:1fr}
          .pf .fab{display:block}
          .pf .nav{height:72px}
          .pf .nav .btn{display:none}
        }
        @media (max-width:520px){ .pf .grid4,.pf .exgrid{grid-template-columns:1fr} .pf .fld2{grid-template-columns:1fr} }

        .pf .hero{position:relative;color:#f6f1e4;padding:0;background:${GREEN};overflow:hidden}
        .pf .hbg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:60% 50%}
        .pf .hshade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(10,18,12,.72) 0%,rgba(10,18,12,.38) 42%,rgba(10,18,12,0) 70%),linear-gradient(180deg,rgba(10,18,12,.35) 0%,rgba(10,18,12,0) 25%,rgba(10,18,12,.45) 100%)}
        .pf .hin{position:relative;z-index:2;padding-bottom:150px}
        .pf .hcopy{padding:70px 0 54px;max-width:520px}
        .pf h1{font-family:'Cormorant Garamond',serif;font-weight:500;font-size:clamp(42px,5.2vw,68px);line-height:1.04;margin:16px 0 0;color:#fff;letter-spacing:-.3px;text-wrap:balance}
        .pf .lead{color:#e3e8dc;font-size:16.5px;line-height:1.65;max-width:440px}
        .pf .btn.cream{background:#f3ede0;color:#182018}.pf .btn.cream:hover{background:#fff}
        .pf .feats{display:flex;gap:46px;margin-top:0;flex-wrap:wrap;justify-content:space-between;max-width:760px}
        .pf .feats div{max-width:150px;color:#f3ede0;font-size:14px;font-weight:500}
        .pf .hcopy .lead{text-shadow:0 1px 12px rgba(0,0,0,.35)}
        .pf .wave{position:absolute;left:0;right:0;bottom:-1px;width:100%;height:90px;z-index:3;display:block}
        .pf h2{font-weight:500;line-height:1.08;text-wrap:balance;margin:12px 0 0}
        .pf .rooms{display:grid;grid-template-columns:1fr 1.05fr;gap:54px;align-items:center}
        .pf .rimgs{position:relative;padding-bottom:70px}
        .pf .rimgs .r1{width:84%;aspect-ratio:4/5;object-fit:cover;border-radius:320px 320px 24px 24px;display:block}
        .pf .rimgs .r2{position:absolute;right:0;bottom:0;width:48%;aspect-ratio:1;object-fit:cover;border-radius:50%;border:8px solid ${CR};display:block}
        .pf .rcards{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:30px}
        .pf .rc{cursor:pointer}
        .pf .rc img{width:100%;aspect-ratio:1/1;object-fit:cover;border-radius:16px;display:block;transition:transform .3s}
        .pf .rc:hover img{transform:translateY(-4px)}
        .pf .rc b{display:block;font-family:'Cormorant Garamond',serif;font-weight:600;font-size:18px;color:${GREEN};margin-top:10px}
        .pf .rc small{display:block;color:${MU};font-size:12.5px;margin-top:2px}
        .pf .dine{position:relative;background:${GREEN};color:${CR};padding:96px 0}
        .pf .dine .wv{position:absolute;left:0;width:100%;height:46px;display:block}
        .pf .dine .wv.t{top:-1px}.pf .dine .wv.b{bottom:-1px}
        .pf .dgrid{display:grid;grid-template-columns:.9fr 1.1fr;gap:50px;align-items:center}
        .pf .dine h2{color:#f6f1e4}.pf .dine .sub{color:#b9c2b2;margin:14px 0 24px}
        .pf .dgrid img{width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:22px;display:block}
        .pf .expw{display:grid;grid-template-columns:.7fr 2fr;gap:36px;align-items:center}
        .pf .exgrid{margin-top:0;grid-template-columns:repeat(4,1fr)}
        .pf .ex{min-height:0;aspect-ratio:3/4;border-radius:16px}
        .pf .ex .ov{padding:40px 12px 12px}
        .pf .ex b{font-size:16px;font-weight:600}
        .pf .revs{margin-top:0}
        .pf .rev{background:#fffdf7;border:1px solid ${CR2}}
        .pf .rev p{color:${INK}}.pf .rev b{color:#6e4e14}
        .pf .band img{filter:brightness(.55);height:300px}
        .pf .btn{font-size:14px}
        .pf .card small{font-size:12.5px}
        @media (max-width:900px){
          .pf .hshade{background:linear-gradient(180deg,rgba(10,18,12,.6) 0%,rgba(10,18,12,.55) 55%,rgba(10,18,12,.35) 100%)}
          .pf .hin{padding-bottom:110px}.pf .hcopy{padding:34px 0 36px}
          .pf .feats{gap:18px;justify-content:flex-start}
          .pf .rooms,.pf .dgrid,.pf .expw{grid-template-columns:1fr;gap:30px}
          .pf .rcards{grid-template-columns:1fr 1fr 1fr}
          .pf .exgrid{grid-template-columns:repeat(2,1fr)}
          .pf .dine{padding:70px 0}
        }
        @media (max-width:520px){.pf .rcards{grid-template-columns:1fr}.pf .rc img{aspect-ratio:16/10}}
      `}</style>

      <div className="hero">
        <img className="hbg" src="/pou-hero2.webp" alt="Chalé de madeira e pedra com piscina ao pôr do sol na serra" />
        <div className="hshade" />
        <div className="wrap hin">
          <nav className="nav">
            <div className="logo"><span className="mark"><Ic d={LEAF} s={20} /></span> Serra do Vento</div>
            <div className="links">
              <a onClick={() => go("quartos")}>Acomodações</a>
              <a onClick={() => go("cafe")}>Café da manhã</a>
              <a onClick={() => go("exp")}>Experiências</a>
              <a onClick={() => go("avals")}>Avaliações</a>
              <a onClick={() => go("contato")}>Contato</a>
            </div>
            <button className="btn cream" onClick={() => start()}>Reserve pelo WhatsApp</button>
            <button className="burger" onClick={() => setMenu(true)} aria-label="menu"><Ic d="M4 7h16M4 12h16M4 17h16" s={26} c="#f3ede0" /></button>
          </nav>
          <div className="hcopy">
            <h1>Um refúgio de montanha pra desacelerar</h1>
            <p className="lead">Chalés de madeira e pedra no alto da serra, café colonial servido na varanda e cachoeiras a poucos minutos. A {brand} é daquele lugar que a gente volta antes de ir embora.</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
              <button className="btn cream" onClick={() => start()}>Planeje sua escapada →</button>
              <button className="btn o" onClick={() => go("quartos")}>Conheça os chalés</button>
            </div>
          </div>
          <div className="feats">
            {PERKS.map((p) => <div key={p.t}><Ic d={p.ic} s={26} c="#f3ede0" />{p.t}</div>)}
          </div>
        </div>
        <svg className="wave" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden><path d="M0 50c180 50 360 50 540 14s360-60 540-30 270 34 360 6v50H0z" fill={CR} /></svg>
      </div>

      <section className="sec" id="quartos" style={{ paddingTop: 30 }}>
        <div className="wrap rooms">
          <div className="rimgs">
            <img className="r1" src="/pou-quarto.webp" alt="Quarto de chalé com cama de linho e janela para a floresta" loading="lazy" />
            <img className="r2" src="/pou-banheira.webp" alt="Ofurô de madeira na floresta com velas" loading="lazy" />
          </div>
          <div className="rtxt">
            <h2>Chalés e suítes com cheiro de serra</h2>
            <p className="sub">Poucas unidades, muito cuidado. Todas com roupa de cama de algodão, aquecimento e vista pro verde.</p>
            <div className="rcards">
              {ROOMS.slice(0, 3).map((r) => (
                <div className="rc" key={r.n} onClick={() => start(r.n)}>
                  <img src={r.img} alt={r.n} loading="lazy" />
                  <b>{r.n}</b>
                  <small>{r.p}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="dine" id="cafe">
        <svg className="wv t" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden><path d="M0 0h1440v20c-240 40-480 40-720 10S240 0 0 30z" fill={CR} /></svg>
        <div className="wrap dgrid">
          <div>
            <h2>Café da manhã e jantar de fazenda</h2>
            <p className="sub">Pão de queijo saindo do forno, bolo de fubá, queijo minas da região e geleias feitas em casa. Tudo incluso na diária, com a serra de companhia.</p>
            <button className="btn cream" onClick={() => go("exp")}>Ver experiências →</button>
          </div>
          <img src="/pou-prato.webp" alt="Prato de salmão grelhado com legumes e flor comestível" loading="lazy" />
        </div>
        <svg className="wv b" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden><path d="M0 60V28c240-34 480-34 720-4s480 30 720 6v30z" fill={CR} /></svg>
      </section>

      <section className="sec" id="exp" style={{ paddingTop: 26 }}>
        <div className="wrap expw">
          <div className="etxt">
            <h2>Mais que uma estadia</h2>
            <p className="sub">A gente monta o roteiro com você: cachoeira de manhã, trilha depois do almoço e lareira com vinho à noite.</p>
          </div>
          <div className="exgrid">
            {EXPS.map((e) => (
              <div className="ex" key={e.n}>
                <img src={e.img} alt={e.n} loading="lazy" />
                <div className="ov"><b>{e.n}</b></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="avals" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="revs">
            {REVIEWS.map((r) => (
              <div className="rev" key={r.n}>
                <span className="st">★★★★★</span>
                <p>"{r.q}"</p>
                <b>{r.n}</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="wrap">
        <div className="band">
          <img src="/pou-banner.webp" alt="Montanhas ao nascer do sol com névoa" loading="lazy" />
          <div className="in">
            <h3>Sua próxima escapada está a uma mensagem de distância</h3>
            <span style={{ fontSize: 14, color: "#dfe4d8" }}>1. Escolha o chalé · 2. Escolha as datas · 3. Confirme no WhatsApp</span>
            <button className="btn cream" onClick={() => start()}>Ver datas e reservar</button>
          </div>
        </div>
      </div>

      <footer id="contato">
        <div className="wrap fg">
          <div>
            <div className="logo" style={{ marginBottom: 14 }}><span className="mark"><Ic d={LEAF} s={20} /></span> Serra do Vento</div>
            <p>Pousada boutique no alto da serra da Mantiqueira. Chalés, café colonial e o silêncio que só a montanha tem.</p>
          </div>
          <div>
            <h4>Endereço</h4>
            <p>Estrada do Vale, km 3<br />{city}<br />Check-in 14h · Check-out 12h</p>
          </div>
          <div>
            <h4>Fale com a gente</h4>
            <a href={`https://wa.me/${num}`} target="_blank" rel="noreferrer">WhatsApp da recepção</a>
            <a onClick={() => start()}>Reservar estadia</a>
            <a onClick={() => go("quartos")}>Ver acomodações</a>
          </div>
        </div>
        <div className="wrap fbot"><span>© {new Date().getFullYear()} {brand}</span><span>Feito com calma na serra</span></div>
      </footer>

      {sc && <div className="fab"><button className="btn" onClick={() => start()}>Reservar</button></div>}

      {menu && (
        <div className="mmenu">
          <button className="x" onClick={() => setMenu(false)} aria-label="fechar">✕</button>
          <a onClick={() => go("quartos")}>Acomodações</a>
          <a onClick={() => go("cafe")}>Café da manhã</a>
          <a onClick={() => go("exp")}>Experiências</a>
          <a onClick={() => go("avals")}>Avaliações</a>
          <a onClick={() => start()}>Reservar</a>
        </div>
      )}

      {open && (
        <div className="modal" onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div className="mbox">
            <button className="close" onClick={() => setOpen(false)} aria-label="fechar">✕</button>
            <h3>Reserve sua estadia</h3>
            <div className="stp">{[1, 2, 3].map((i) => <i key={i} className={step >= i ? "on" : ""} />)}</div>
            {step === 1 && (
              <div>
                <p style={{ margin: "0 0 14px", color: MU, fontSize: 14.5 }}>Escolha a acomodação:</p>
                <div className="opt">
                  {ROOMS.map((r) => (
                    <button key={r.n} className={room === r.n ? "sel" : ""} onClick={() => setRoom(r.n)}>
                      <span>{r.n}<br /><small>{r.d}</small></span><small>{r.p}</small>
                    </button>
                  ))}
                </div>
                <div className="mnav"><button className="btn" onClick={() => setStep(2)}>Continuar</button></div>
              </div>
            )}
            {step === 2 && (
              <div>
                <p style={{ margin: "0 0 14px", color: MU, fontSize: 14.5 }}>Datas e hóspedes:</p>
                <div className="fld2">
                  <div className="fld"><label>Check-in</label><input type="date" value={inD} onChange={(e) => setInD(e.target.value)} /></div>
                  <div className="fld"><label>Check-out</label><input type="date" value={outD} onChange={(e) => setOutD(e.target.value)} /></div>
                </div>
                <div className="fld"><label>Hóspedes</label>
                  <div className="stepper">
                    <button onClick={() => setGuests((g) => Math.max(1, g - 1))}>−</button>
                    <b>{guests} {guests > 1 ? "pessoas" : "pessoa"}</b>
                    <button onClick={() => setGuests((g) => Math.min(6, g + 1))}>+</button>
                  </div>
                </div>
                <div className="mnav">
                  <button className="btn ghost" onClick={() => setStep(1)}>Voltar</button>
                  <button className="btn" onClick={() => setStep(3)} disabled={!inD || !outD} style={!inD || !outD ? { opacity: .5 } : undefined}>Continuar</button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div>
                <p style={{ margin: "0 0 14px", color: MU, fontSize: 14.5 }}>Confere e finaliza no WhatsApp:</p>
                <div className="sum">
                  <b>{room}</b><br />
                  Check-in: <b>{fmt(inD)}</b> · Check-out: <b>{fmt(outD)}</b><br />
                  Hóspedes: <b>{guests}</b>
                </div>
                <div className="fld" style={{ marginTop: 14 }}><label>Seu nome (opcional)</label><input value={cust} onChange={(e) => setCust(e.target.value)} placeholder="Como a gente te chama?" /></div>
                <div className="mnav">
                  <button className="btn ghost" onClick={() => setStep(2)}>Voltar</button>
                  <a className="btn" href={wa} target="_blank" rel="noreferrer">Finalizar no WhatsApp</a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
