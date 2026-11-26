import { useEffect, useRef, useState } from "react";

/** Loja de bikes e e-bikes a partir do pin "Move the city": amarelo, azul royal e branco, tipo itálico pesado, cortes inclinados, numeração 01/02 gigante. */
const Y = "#ffe600", B = "#1b2fd6", K = "#0a0a0a", GR = "#e9e9ec";
const RANGE = [
  { n: "E-bikes", d: "Passeios urbanos sem esforço", img: "/gb-cat1.webp", bg: Y, fg: K },
  { n: "Bikes urbanas", d: "Ágeis. Elegantes. Todo dia.", img: "/gb-cat2.webp", bg: GR, fg: K },
  { n: "Gravel", d: "Versáteis em qualquer terreno", img: "/gb-cat3.webp", bg: B, fg: "#fff" },
  { n: "Cargo", d: "Leve mais, vá mais longe", img: "/gb-cat4.webp", bg: "#16161a", fg: "#fff" },
];
const GEAR = [
  { n: "Capacete urbano", p: 89, img: "/gb-a1.webp" },
  { n: "Mochila de trajeto", p: 129, img: "/gb-a2.webp" },
  { n: "Farol e lanterna", p: 59, img: "/gb-a3.webp" },
  { n: "Cadeado inteligente", p: 99, img: "/gb-a4.webp" },
];
const SERV = [
  { n: "Revisão", i: <path d="M14 4l6 6-3 3-6-6zM11 7l-7 7 3 3 7-7M5 19l-2 2" /> },
  { n: "Reparo", i: <path d="M14 6a4 4 0 0 0-5 5l-6 6 3 3 6-6a4 4 0 0 0 5-5l-3 3-2-2z" /> },
  { n: "Troca de peças", i: <path d="M5 12a7 7 0 0 1 12-5M19 12a7 7 0 0 1-12 5M17 3v4h-4M7 21v-4h4" /> },
  { n: "Checagem de segurança", i: <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4" /> },
];
const ROUTES = [
  { n: "Voltas urbanas", k: "5 a 15 km", i: <path d="M3 17a3 3 0 1 0 0-.01M17 17a3 3 0 1 0 0-.01M6 17l4-8h5l2 8M10 9l-1-3h-2" /> },
  { n: "Corrida no rio", k: "12 a 25 km", i: <path d="M3 18l6-10 4 6 3-4 5 8z" /> },
  { n: "Cinturão verde", k: "20 a 40 km", i: <path d="M12 3l5 8h-3l4 7H6l4-7H7zM12 18v3" /> },
];
const FEAT = [
  { t: "Até 120 km de autonomia", i: <path d="M13 2L5 14h6l-1 8 8-12h-6z" /> },
  { t: "Quadro leve (18,5 kg)", i: <path d="M20 4c-8 0-14 4-14 12l-2 4M20 4c0 8-4 12-12 12M10 14l4-4" /> },
  { t: "App inteligente e antifurto", i: <path d="M8 2h8a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM11 19h2" /> },
  { t: "Garantia de 2 anos", i: <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /> },
];
const CI = [
  <path key="a" d="M12 21a9 9 0 1 1 9-9M12 12l4-4M12 6v1" />,
  <path key="b" d="M5 8h14l2 12H3zM9 8a3 3 0 0 1 6 0" />,
  <path key="c" d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v3M12 19v3M2 12h3M19 12h3" />,
  <path key="d" d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11zM12 7v6M9 10h6" />,
];
const COMP = [
  ["Autonomia", "120 km", "—", "—"],
  ["Peso", "18,5 kg", "13,2 kg", "12,8 kg"],
  ["Marchas", "10 vel.", "8 vel.", "11 vel."],
  ["Ideal para", "Cidade", "Trajeto diário", "Terreno misto"],
];
const Ico = ({ children, s = 20, c = "currentColor", w = 1.8 }: { children: React.ReactNode; s?: number; c?: string; w?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" aria-hidden>{children}</svg>;
const Arr = ({ s = 16 }: { s?: number }) => <Ico s={s} w={2.4}><path d="M5 12h14M13 6l6 6-6 6" /></Ico>;
const Cart = ({ s = 18 }: { s?: number }) => <Ico s={s}><path d="M3 4h3l2 11h10l2-8H7M10 20h.01M17 20h.01" /></Ico>;
const brl = (v: number) => `R$ ${v.toLocaleString("pt-BR")}`;

export function BikeMove({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = (client?.name?.trim() || "Giro Bikes").toUpperCase();
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [cart, setCart] = useState<string[]>([]);
  const [menu, setMenu] = useState(false);
  const gl = useRef<HTMLDivElement>(null);
  const [toast, setToast] = useState("");
  const [mail, setMail] = useState("");
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(""), 1800); return () => clearTimeout(t); }, [toast]);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const add = (n: string) => { setCart((c) => [...c, n]); setToast(`${n} no carrinho`); };
  const wa = (t: string) => `https://wa.me/${num}?text=${encodeURIComponent(t)}`;
  const order = wa(`Oi! Quero pedir na ${brand}: ${cart.length ? cart.join(", ") : "ajuda para escolher uma bike"}.`);
  const Logo = ({ c = K }: { c?: string }) => (
    <a className="logo" href="#top" style={{ color: c }} onClick={(e) => { e.preventDefault(); go("top"); }} aria-label={brand}>
      <svg width="24" height="22" viewBox="0 0 24 22" aria-hidden><path d="M1 21L9 1h4L5 21zM9 21L17 1h4l-8 20z" fill={c === "#fff" ? Y : K} /></svg><span>{brand}</span>
    </a>
  );
  return (
    <div className="gb" id="top">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@1,700;1,800&family=Inter:wght@400;500;600;700&display=swap');
        .gb{background:#fff;color:${K};font-family:'Inter',Arial,sans-serif;overflow-x:hidden}
        .gb *{box-sizing:border-box}
        .gb a,.gb button,.gb input{font-family:inherit}
        .gb h1,.gb h2,.gb h3,.gb h4{font-family:'Barlow Condensed','Arial Narrow',Impact,sans-serif;font-style:italic;font-weight:800;text-transform:uppercase;margin:0;line-height:.92;text-wrap:balance}
        .gb .in{width:min(94%,1200px);margin:0 auto}
        .gb .top{position:relative;background:#fff;z-index:5}
        .gb .top:after{content:"";position:absolute;right:0;top:0;bottom:0;width:22%;background:${B};clip-path:polygon(18% 0,100% 0,100% 100%,0 100%);z-index:0}
        .gb .nav{position:relative;z-index:1;display:flex;align-items:center;gap:30px;height:64px}
        .gb .logo{display:flex;align-items:center;gap:8px;text-decoration:none;font-family:'Barlow Condensed',sans-serif;font-style:italic;font-weight:800;font-size:23px;min-height:44px}
        .gb .nl{display:flex;gap:28px;margin:0 auto}
        .gb .nl a{font-size:13px;font-weight:600;cursor:pointer;color:${K};min-height:44px;display:inline-flex;align-items:center;text-decoration:none}
        .gb .ibs{display:flex;color:#fff}
        .gb .ib{position:relative;width:44px;height:44px;display:grid;place-items:center;background:none;border:0;color:#fff;cursor:pointer;text-decoration:none}
        .gb .bd{position:absolute;right:4px;top:4px;background:${Y};color:${K};border-radius:50%;width:16px;height:16px;font-size:10px;font-weight:700;display:grid;place-items:center}
        .gb .burger{display:none}
        .gb .mob{display:none}
        .gb .hero{position:relative;min-height:580px;background:${B};overflow:hidden}
        .gb .hero>img{position:absolute;right:0;top:0;width:76%;height:100%;object-fit:cover;object-position:60% 40%}
        .gb .hero:before{content:"";position:absolute;inset:0;z-index:1;background:${Y};clip-path:polygon(0 0,36% 0,25% 100%,0 100%)}
        .gb .hero:after{content:"";position:absolute;z-index:1;right:0;top:0;bottom:0;width:22%;background:linear-gradient(90deg,rgba(27,47,214,0),rgba(27,47,214,.85));}
        .gb .hc{position:relative;z-index:3;padding:34px 0 40px;width:min(94%,1200px);margin:0 auto;min-height:580px}
        .gb .hc h1{font-size:clamp(64px,9.6vw,136px);max-width:5.2em;margin:0 0 22px;line-height:.86}
        .gb .hc p{font-size:15px;line-height:1.5;max-width:23ch;margin:0 0 22px;font-weight:500}
        .gb .btn{display:inline-flex;align-items:center;gap:10px;min-height:46px;padding:0 22px;border-radius:2px;font-size:13px;font-weight:700;text-decoration:none;cursor:pointer;border:0;background:${K};color:#fff}
        .gb .btn.y{background:${Y};color:${K}}
        .gb .btn.o{background:transparent;color:${K};border:1.5px solid ${K};border-radius:999px}
        .gb .big{position:absolute;z-index:2;left:48%;top:4%;font-family:'Barlow Condensed',sans-serif;font-style:italic;font-weight:800;font-size:clamp(200px,30vw,380px);line-height:.8;color:rgba(255,255,255,.88);pointer-events:none;mix-blend-mode:screen}
        .gb .vl{position:absolute;z-index:3;right:3%;top:16%;display:grid;gap:9px;text-align:right;font-size:11px;font-weight:600;letter-spacing:.14em;color:#fff;text-transform:uppercase}
        .gb .nc{position:absolute;z-index:3;right:3%;bottom:7%;text-align:right;color:#fff;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase}
        .gb .nc b{display:block;font-family:'Barlow Condensed',sans-serif;font-style:italic;font-weight:800;font-size:34px;color:${Y};letter-spacing:0;margin-top:2px}
        .gb .nc i{display:block;color:${Y};margin:0 0 12px auto;width:max-content;font-style:normal;font-size:22px}
        .gb .rg{display:grid;grid-template-columns:320px 1fr;gap:30px;align-items:center;padding:68px 0}
        .gb h2{text-wrap:balance}.gb .rg h2,.gb .plan h2,.gb .gg h2,.gb .svc h2{font-size:clamp(38px,4.2vw,50px);line-height:.9}.gb .svc h2{font-size:clamp(34px,3.2vw,42px)}.gb .svc h2:before{content:'///';color:${Y};font-style:italic;margin-right:8px}
        .gb .rg p{font-size:14px;font-weight:600;text-transform:uppercase;margin:20px 0 0;line-height:1.35;max-width:14ch}
        .gb .rg .ln{height:1px;background:${K};width:130px;margin-top:20px;position:relative}
        .gb .rc{display:grid;grid-template-columns:repeat(4,1fr);gap:0}
        .gb .rk{position:relative;height:210px;overflow:hidden;border:0;padding:0;cursor:pointer;text-align:left;margin-left:-26px;clip-path:polygon(26px 0,100% 0,calc(100% - 26px) 100%,0 100%)}
        .gb .rk:first-child{margin-left:0}
        .gb .rk img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 58%}
        .gb .rk .t{position:absolute;left:0;right:0;bottom:0;padding:34px 40px 12px 38px;display:flex;justify-content:space-between;align-items:flex-end;gap:8px}
        .gb .rk .t:before{content:"";position:absolute;inset:0;background:linear-gradient(0deg,var(--bg) 62%,transparent)}
        .gb .rk .t>*{position:relative}
        .gb .rk h3{font-size:19px;line-height:1;font-style:italic}
        .gb .rk small{display:block;font-size:11px;font-weight:600;font-family:'Inter',sans-serif;font-style:normal;text-transform:none;margin-top:3px;opacity:.9}
        .gb .rk i{width:30px;height:30px;border-radius:50%;border:1.5px solid currentColor;display:grid;place-items:center;flex:none}
        .gb .pr{background:#fafafb;position:relative;overflow:hidden}
        .gb .pr .in{display:grid;grid-template-columns:1.15fr .9fr;gap:0;align-items:stretch}
        .gb .pl{position:relative;display:grid;grid-template-columns:1fr 250px;align-items:center;padding:30px 20px 30px 0;min-height:460px}
        .gb .pl .n2{position:absolute;left:-10px;top:10px;font-family:'Barlow Condensed',sans-serif;font-style:italic;font-weight:800;font-size:clamp(150px,20vw,250px);line-height:.8;color:${B};z-index:0}
        .gb .pl img{position:relative;z-index:1;width:122%;margin-left:-20%;max-width:none;mix-blend-mode:multiply;filter:brightness(1.07) contrast(1.06);margin-top:50px}
        .gb .pd{position:relative;z-index:2;display:grid;gap:12px}
        .gb .pd h3{font-size:28px;line-height:1.02}
        .gb .pd .new{display:inline-block;background:${Y};font-size:10px;font-weight:800;padding:2px 7px;font-style:italic;vertical-align:top;margin-left:8px;font-family:'Inter',sans-serif;text-transform:uppercase}
        .gb .pd p{font-size:14px;line-height:1.45;margin:0;color:#333}
        .gb .pd ul{list-style:none;padding:0;margin:4px 0;display:grid;gap:9px;font-size:13px}
        .gb .pd li{display:flex;gap:9px;align-items:center}
        .gb .pd .pc{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:32px;margin:6px 0}
        .gb .cm{background:#fff;border-left:1px solid #e3e3e8;padding:26px 24px;display:grid;gap:12px}
        .gb .cm h3{font-size:22px}
        .gb .ct{display:grid;grid-template-columns:112px repeat(3,1fr);font-size:12px;align-items:center}
        .gb .ct>div{padding:10px 4px;border-bottom:1px solid #ececf0;text-align:center}
        .gb .ct>div:nth-child(4n+1){text-align:left;font-weight:500;color:#444}
        .gb .ct .h img{display:block;width:100%;height:36px;object-fit:contain;mix-blend-mode:multiply;margin:0 auto 4px}.gb .ct .h{border:0;font-weight:700;font-size:12px;line-height:1.3}
        .gb .ct .hy{background:${Y};font-weight:800}
        .gb .ct b{font-weight:700}.gb .cl{display:flex;align-items:center;gap:8px}
        .gb .plan{position:relative;display:grid;grid-template-columns:.9fr 1fr;min-height:360px;background:#0f1013;overflow:hidden;color:#fff}
        .gb .plan .mp{position:relative;padding:56px 3% 36px max(3%,calc((100vw - 1200px)/2));z-index:2}
        
        .gb .plan p{font-size:12px;line-height:1.5;max-width:24ch;color:#cfd1d6;margin:14px 0 18px}
        .gb .plan svg.map{position:absolute;inset:0;width:62%;height:100%;opacity:.95}
        .gb .plan .ph{position:absolute;right:0;top:0;bottom:0;width:60%;object-fit:cover;object-position:60% 50%;clip-path:polygon(14% 0,100% 0,100% 100%,0 100%)}
        .gb .plan .rts{position:absolute;right:4%;top:50%;transform:translateY(-50%);z-index:3;display:grid;gap:10px}
        .gb .plan .rt{display:flex;gap:12px;align-items:center;background:#fff;color:${K};padding:10px 14px;min-width:160px;font-size:12px;font-weight:700}
        .gb .plan .rt small{display:block;font-weight:500;color:#555;font-size:11px}
        .gb .gear{display:grid;grid-template-columns:1.35fr 1fr;gap:20px;padding:68px 0}
        .gb .gg h2{margin-bottom:6px}
        .gb .gl{display:grid;grid-auto-flow:column;grid-auto-columns:calc((100% - 24px)/3);gap:12px;margin-top:18px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none}.gb .gl::-webkit-scrollbar{display:none}.gb .gc{scroll-snap-align:start}.gb .car{display:flex;gap:10px;margin-top:14px}.gb .car button{width:44px;height:44px;border-radius:50%;border:1.5px solid #777;background:#fff;display:grid;place-items:center;cursor:pointer;color:#111}
        .gb .gc{background:#fff;border-radius:14px;box-shadow:0 2px 14px rgba(20,20,40,.1);padding:14px 12px 12px;display:flex;flex-direction:column}
        .gb .gc img{width:100%;aspect-ratio:1;object-fit:contain}
        .gb .gc b{font-size:12px;font-weight:600;margin-top:6px}
        .gb .gc div{display:flex;justify-content:space-between;align-items:center;margin-top:6px;font-size:14px;font-weight:700}
        .gb .gc button{width:44px;height:44px;border-radius:50%;background:${Y};border:0;display:grid;place-items:center;cursor:pointer;color:${K}}
        .gb .svc{background:${B};color:#fff;padding:26px 28px;display:grid;grid-template-columns:1fr 1.1fr;gap:20px;position:relative}
        
        .gb .svc p{font-size:12px;line-height:1.5;margin:10px 0 16px;color:#dfe3ff;max-width:22ch}
        .gb .sl{display:grid;gap:0}
        .gb .sl a{display:flex;align-items:center;gap:12px;min-height:48px;border-bottom:1px solid rgba(255,255,255,.2);color:#fff;font-size:12px;text-decoration:none;cursor:pointer}
        .gb .sl a span{margin-left:auto}
        .gb footer{background:${K};color:#fff;padding:30px 0 26px}
        .gb footer .in{display:grid;grid-template-columns:1.1fr repeat(3,.7fr) 1.4fr;gap:26px}
        .gb footer h4{font-size:12px;font-family:'Inter',sans-serif;font-style:normal;font-weight:700;margin-bottom:10px;text-transform:none}
        .gb footer a{display:block;color:#cfcfd4;font-size:12px;text-decoration:none;padding:3px 0;cursor:pointer}
        .gb footer p{font-size:12px;color:#cfcfd4;margin:10px 0 0}
        .gb .soc{display:flex;gap:10px;margin-top:12px}.gb .soc a{width:44px;height:44px;border:1.5px solid #4a4a50;border-radius:50%;display:grid;place-items:center;color:#fff;cursor:pointer}.gb .nl2{display:flex;margin-top:8px}.gb .nl2 input{flex:1;min-width:0;height:44px;border:0;padding:0 12px;font-size:12px}.gb .nl2 button{width:48px;border:0;background:${Y};cursor:pointer;display:grid;place-items:center}
        .gb .dm{grid-column:1/-1;border-top:1px solid #2a2a2e;padding-top:14px;margin-top:6px;font-size:12px;color:#a8a8ae}
        .gb .wa{position:fixed;right:14px;bottom:14px;width:48px;height:48px;border-radius:50%;background:#25d366;display:grid;place-items:center;z-index:30;box-shadow:0 6px 18px rgba(0,0,0,.35)}
        .gb .toast{position:fixed;left:50%;bottom:74px;transform:translateX(-50%);background:${Y};color:${K};padding:12px 20px;font-size:13px;font-weight:700;z-index:40}
        .gb a:focus-visible,.gb button:focus-visible,.gb input:focus-visible{outline:3px solid ${B};outline-offset:2px}
        @media(max-width:960px){
          .gb .top:after{width:40%}.gb .nl{display:none}.gb .burger{display:grid}.gb .nav{justify-content:space-between}.gb .ibs{margin-left:auto}
          .gb .mob{display:grid;background:#fff;padding:6px 5%;border-bottom:1px solid #ddd}.gb .mob a{min-height:48px;display:flex;align-items:center;border-bottom:1px solid #eee;font-size:15px;font-weight:600;color:${K};cursor:pointer}
          .gb .hero{min-height:0;display:flex;flex-direction:column}.gb .hero>img{position:relative;width:100%;height:260px;order:2}.gb .hero:before{clip-path:polygon(0 0,100% 0,100% 100%,0 100%);height:auto;bottom:260px}.gb .hero:after{display:none}
          .gb .hc{min-height:0;padding:28px 0 30px;order:1}.gb .hc h1{font-size:68px}.gb .big,.gb .vl{display:none}.gb .nc{bottom:10px}.gb .hero>img+.nc{}.gb .rk .t{padding:30px 14px 10px 14px;flex-direction:column;align-items:flex-start}.gb .rk .t i{position:absolute;right:10px;top:10px}.gb .rk .t{padding:30px 12px 12px 14px}.gb .nc{left:0;right:0;bottom:0;padding:40px 5% 12px;background:linear-gradient(0deg,rgba(10,12,40,.85),rgba(10,12,40,0))}.gb .nc i{display:none}.gb .wa{right:10px;bottom:10px}
          .gb .rg{grid-template-columns:1fr;gap:20px}.gb .rc{grid-template-columns:1fr 1fr;gap:8px}.gb .rk{margin:0;clip-path:none;height:170px}
          .gb .pr .in{grid-template-columns:1fr}.gb .pl{grid-template-columns:1fr;padding:20px 0}.gb .pl .n2{font-size:150px}.gb .pl img{margin-top:70px;width:100%;margin-left:0}.gb .cm{border-left:0}
          .gb .plan{grid-template-columns:1fr}.gb .plan .mp{padding:30px 5%}.gb .plan svg.map{position:relative;width:100%;height:200px}.gb .plan .ph{position:relative;width:100%;height:240px;clip-path:none}.gb .plan .rts{position:relative;right:auto;top:auto;transform:none;padding:14px 5%;background:#0f1013}
          .gb .gear{grid-template-columns:1fr}.gb .gl{grid-auto-columns:calc((100% - 12px)/2)}.gb .svc{grid-template-columns:1fr}.gb footer .in{grid-template-columns:1fr 1fr}
        }
      `}</style>
      <header className="top">
        <div className="in nav">
          <Logo />
          <nav className="nl" aria-label="Principal"><a onClick={() => go("linha")}>Bikes</a><a onClick={() => go("linha")}>E-bikes</a><a onClick={() => go("acess")}>Acessórios</a><a onClick={() => go("servico")}>Serviços</a><a onClick={() => go("rotas")}>Histórias</a></nav>
          <div className="ibs">
            <a className="ib" href={wa("Oi! Quero buscar uma bike.")} target="_blank" rel="noreferrer" aria-label="Buscar"><Ico s={20} c="#fff"><path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4" /></Ico></a>
            <a className="ib" href={wa("Oi! Quero falar com o time.")} target="_blank" rel="noreferrer" aria-label="Conta"><Ico s={20} c="#fff"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 20c1-4 4-6 8-6s7 2 8 6" /></Ico></a>
            <a className="ib" href={order} target="_blank" rel="noreferrer" aria-label={`Carrinho, ${cart.length} itens`}><Cart s={20} /><span className="bd">{cart.length}</span></a>
            <button type="button" className="ib burger" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu(!menu)}><Ico s={24} c="#fff"><path d="M4 7h16M4 12h16M4 17h16" /></Ico></button>
          </div>
        </div>
        {menu && <div className="mob"><a onClick={() => go("linha")}>Bikes</a><a onClick={() => go("linha")}>E-bikes</a><a onClick={() => go("acess")}>Acessórios</a><a onClick={() => go("servico")}>Serviços</a><a onClick={() => go("rotas")}>Histórias</a></div>}
      </header>

      <section className="hero">
        <img src="/gb-hero.webp" alt="Ciclista de jaqueta amarela numa e-bike cinza e branca atravessando a cidade em movimento" />
        <span className="big" aria-hidden>01</span>
        <div className="hc">
          <h1>Mova<br />a<br />cidade</h1>
          <p>Bicicletas, e-bikes e mobilidade urbana para uma vida mais rápida, limpa e livre.</p>
          <a className="btn" href="#linha" onClick={(e) => { e.preventDefault(); go("linha"); }}>Ver bikes <Arr /></a>
        </div>
        <div className="vl" aria-hidden><span>Urbana</span><span>E-bike</span><span>Híbrida</span><span>Gravel</span><span>Cargo</span></div>
        <div className="nc"><i aria-hidden>↗</i>Nova coleção<b>2025</b></div>
      </section>

      <section className="in rg" id="linha">
        <div><h2>Conheça<br />a linha</h2><p>Feita para a cidade, a trilha e além.</p><div className="ln" /></div>
        <div className="rc">
          {RANGE.map((r) => (
            <button type="button" className="rk" key={r.n} style={{ background: r.bg, color: r.fg, ["--bg" as string]: r.bg }} onClick={() => window.open(wa(`Oi! Quero ver as ${r.n}.`), "_blank")} aria-label={r.n}>
              <img src={r.img} alt="" /><span className="t"><span><h3>{r.n}</h3><small>{r.d}</small></span><i><Arr s={13} /></i></span>
            </button>
          ))}
        </div>
      </section>

      <section className="pr" id="destaque"><div className="in">
        <div className="pl">
          <span className="n2" aria-hidden>02</span>
          <img src="/gb-prod.webp" alt="E-bike urbana cinza e branca com detalhes amarelos" />
          <div className="pd">
            <h3>Giro<br />E-City Pro<span className="new">Novo</span></h3>
            <p>Uma e-bike potente e conectada, pensada para a vida urbana moderna.</p>
            <ul>{FEAT.map((f) => <li key={f.t}><Ico s={16}>{f.i}</Ico>{f.t}</li>)}</ul>
            <div className="pc">{brl(12499)}</div>
            <button type="button" className="btn y" onClick={() => add("Giro E-City Pro")}><Cart s={16} /> Adicionar ao carrinho</button>
            <a className="btn" href={wa("Oi! Quero ver a E-City Pro em ação.")} target="_blank" rel="noreferrer" style={{ background: "transparent", color: K, padding: 0 }}><span style={{ width: 28, height: 28, borderRadius: "50%", background: K, display: "grid", placeItems: "center" }}><Ico s={12} c="#fff"><path d="M8 5v14l11-7z" /></Ico></span>Ver em ação</a>
          </div>
        </div>
        <div className="cm">
          <h3>Compare as bikes</h3>
          <div className="ct" role="table" aria-label="Comparação">
            <div className="h" /><div className="h hy"><img src="/gb-prod.webp" alt="" />E-City Pro<br />{brl(12499)}</div><div className="h"><img src="/gb-cat2.webp" alt="" />Urban Lite<br />{brl(7499)}</div><div className="h"><img src="/gb-cat3.webp" alt="" />Gravel X<br />{brl(9499)}</div>
            {COMP.map((r, ri) => r.map((c, i) => <div key={`${r[0]}${i}`} style={i === 1 ? { fontWeight: 700 } : undefined}>{i === 0 ? <span className="cl"><Ico s={15} c="#444">{CI[ri]}</Ico>{c}</span> : c}</div>))}
          </div>
          <a className="btn o" href={wa("Oi! Quero a comparação completa das bikes.")} target="_blank" rel="noreferrer" style={{ justifyContent: "center" }}>Ver comparação completa <Arr s={14} /></a>
        </div>
      </div></section>

      <section className="plan" id="rotas">
        <svg className="map" viewBox="0 0 500 320" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <rect width="500" height="320" fill="#0f1013" />
          {Array.from({ length: 14 }).map((_, i) => <path key={i} d={`M${-20 + i * 40} 0L${60 + i * 40} 320`} stroke="#23262d" strokeWidth="6" />)}
          {Array.from({ length: 8 }).map((_, i) => <path key={"h" + i} d={`M0 ${20 + i * 45}L500 ${i * 45 - 10}`} stroke="#1d2027" strokeWidth="5" />)}
          <path d="M60 270L120 230L150 250L190 190L170 150L250 130L300 90L340 40" stroke={Y} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="60" cy="270" r="7" fill={Y} /><circle cx="340" cy="40" r="7" fill={Y} />
          <rect x="262" y="150" width="62" height="26" fill={Y} /><text x="293" y="168" textAnchor="middle" fontSize="13" fontWeight="700" fill={K}>12,4 km</text>
        </svg>
        <img className="ph" src="/gb-city.webp" alt="Ciclista em ciclovia amarela à beira do rio ao anoitecer, com a cidade ao fundo" />
        <div className="mp"><h2>Planeje<br />seu próximo<br />giro</h2><p>Rotas urbanas selecionadas, trilhas cênicas e atalhos para o trajeto.</p><a className="btn y" href={wa("Oi! Quero explorar as rotas.")} target="_blank" rel="noreferrer">Explorar rotas <Arr /></a></div>
        <div className="rts">{ROUTES.map((r) => <div className="rt" key={r.n}><Ico s={22}>{r.i}</Ico><span>{r.n}<small>{r.k}</small></span></div>)}</div>
      </section>

      <section className="in gear" id="acess">
        <div className="gg"><h2>Equipe-se<br />e pedale melhor</h2><div className="car"><button type="button" aria-label="Anterior" onClick={() => gl.current?.scrollBy({ left: -230, behavior: "smooth" })}><Ico s={18} w={2.4}><path d="M19 12H5M11 6l-6 6 6 6" /></Ico></button><button type="button" aria-label="Próximo" onClick={() => gl.current?.scrollBy({ left: 230, behavior: "smooth" })}><Arr s={18} /></button></div>
          <div className="gl" ref={gl}>{GEAR.map((g) => <article className="gc" key={g.n}><img src={g.img} alt={g.n} /><b>{g.n}</b><div>{brl(g.p)}<button type="button" aria-label={`Adicionar ${g.n} ao carrinho`} onClick={() => add(g.n)}><Cart s={16} /></button></div></article>)}</div>
        </div>
        <div className="svc" id="servico">
          <div><h2>Agende<br />uma revisão</h2><p>Mantenha sua bike em forma. Serviço rápido e especializado na loja mais próxima.</p><a className="btn y" href={wa("Oi! Quero agendar uma revisão.")} target="_blank" rel="noreferrer">Agendar agora <Arr /></a></div>
          <div className="sl">{SERV.map((s) => <a key={s.n} href={wa(`Oi! Quero agendar: ${s.n}.`)} target="_blank" rel="noreferrer"><Ico s={20} c="#fff">{s.i}</Ico>{s.n}<span><Arr s={13} /></span></a>)}</div>
        </div>
      </section>

      <footer><div className="in">
        <div><Logo c="#fff" /><p>Pedale com mais inteligência. Mova-se com liberdade.</p></div>
        <div><h4>Loja</h4><a onClick={() => go("linha")}>Bikes</a><a onClick={() => go("linha")}>E-bikes</a><a onClick={() => go("acess")}>Acessórios</a></div>
        <div><h4>Suporte</h4><a onClick={() => go("servico")}>Central de ajuda</a><a onClick={() => go("servico")}>Garantia</a><a onClick={() => go("servico")}>Agendar revisão</a></div>
        <div><h4>Sobre</h4><a onClick={() => go("rotas")}>Nossa história</a><a onClick={() => go("rotas")}>Sustentabilidade</a><a onClick={() => go("rotas")}>Lojas</a></div>
        <div><h4>Fique por dentro</h4><p style={{ marginTop: 0 }}>Novidades, dicas de pedal e ofertas.</p>
          <form className="nl2" onSubmit={(e) => { e.preventDefault(); window.open(wa(`Oi! Quero receber novidades da ${brand}. Meu e-mail: ${mail || "não informado"}`), "_blank"); }}><input type="email" aria-label="Seu e-mail" placeholder="Seu e-mail" value={mail} onChange={(e) => setMail(e.target.value)} /><button type="submit" aria-label="Enviar"><Arr /></button></form><div className="soc">{[["Instagram",<path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />],["YouTube",<path d="M3 8a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zM10 9v6l5-3z" />],["TikTok",<path d="M14 3v11a4 4 0 1 1-4-4M14 3c0 3 2 5 5 5" />]].map(([n,d]) => <a key={n as string} href={wa(`Oi! Vi o ${n} da ${brand}.`)} target="_blank" rel="noreferrer" aria-label={n as string}><Ico s={18} c="#fff">{d}</Ico></a>)}</div></div>
        <p className="dm">Fotos, nomes, números, preços e endereço são ilustrativos. Modelo de demonstração.</p>
      </div></footer>
      <a className="wa" href={order} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp"><svg width="26" height="26" viewBox="0 0 24 24" fill="#fff" aria-hidden><path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2zm5.2 13.9c-.2.6-1.300 1.200-1.800 1.200-.5.100-1.100.100-1.800-.100-.4-.100-1-.300-1.700-.600-3-1.300-4.900-4.300-5.100-4.500-.1-.2-1.200-1.600-1.200-3s.8-2.100 1-2.400c.3-.3.600-.3.800-.3h.6c.2 0 .5-.1.700.5l.9 2.200c.1.200.1.400 0 .6l-.4.600c-.1.200-.3.300-.1.600.2.300.8 1.300 1.700 2.100 1.200 1 2.100 1.300 2.400 1.500.3.100.5.100.7-.1l.9-1.100c.2-.3.400-.2.700-.1l2 1c.3.100.5.200.5.300.1.100.1.700-.1 1.300z" /></svg></a>
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}
