import { useEffect, useState, type ReactNode } from "react";

export const RED = "#dc4f3f", NAVY = "#2a2748";
/** Ilustrações em SVG (o pin é ilustração vetorial flat). */
const Shadow = ({ cx = 110, cy = 126, rx = 78 }: { cx?: number; cy?: number; rx?: number }) => <ellipse cx={cx} cy={cy} rx={rx} ry="10" fill="#bdb9a6" opacity=".75" />;
const Rice = () => (<g>
  <path d="M26 84C24 58 60 52 102 52S178 58 176 84C176 112 140 118 100 118S28 112 26 84Z" fill="#fbf3c8" />
  <path d="M120 54C160 56 178 66 176 86C176 110 146 117 108 118 150 108 156 80 120 54Z" fill="#efe3a4" />
  <path d="M44 74c6-8 16-12 30-14" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".7" fill="none" />
</g>);
export const Nigiri = ({ kind, w = 200 }: { kind: "salmao" | "atum" | "camarao" | "ovo"; w?: number }) => {
  let top: ReactNode;
  if (kind === "ovo") top = (<g>
    <path d="M22 66L40 28 150 22 178 58 160 80 38 88Z" fill="#f9c846" /><path d="M38 88L22 66 40 28 52 50Z" fill="#e9a92c" /><path d="M160 80L178 58 150 22 140 44Z" fill="#fbd96a" />
    <path d="M78 14L112 12 120 108 84 112Z" fill="#0b1f1a" /><path d="M96 14L106 14 110 104 100 106Z" fill="#1c3b34" opacity=".8" />
  </g>);
  else if (kind === "camarao") top = (<g>
    <path d="M20 76C30 36 80 24 130 30 168 34 188 56 190 72 150 62 100 72 60 84 40 88 26 86 20 76Z" fill="#f56a36" />
    <path d="M50 52c20-10 40-10 60-8M44 66c24-8 52-8 78-4M60 78c18-4 38-6 56-4" stroke="#ffb27a" strokeWidth="5" strokeLinecap="round" fill="none" />
    <path d="M186 60c14 2 18 16 10 22M178 52c10-8 22-6 26 4" stroke="#f04c25" strokeWidth="6" strokeLinecap="round" fill="none" />
  </g>);
  else top = (<g>
    <path d="M22 72C34 30 84 20 130 26 168 32 188 54 184 70 146 60 100 70 60 82 38 88 24 84 22 72Z" fill={kind === "atum" ? "#f98a2c" : "#f2493a"} />
    <path d="M30 62C50 40 90 32 128 36 160 40 172 52 176 62 140 54 96 58 60 72 44 78 34 74 30 62Z" fill={kind === "atum" ? "#fdb04b" : "#ff6a52"} opacity=".9" />
    <path d="M48 46c24-14 62-16 90-6" stroke="#fff" strokeWidth="6" strokeLinecap="round" fill="none" opacity=".85" />
    <path d="M70 60c20-6 50-8 70-2M86 72c14-3 34-4 50-1" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity=".5" />
  </g>);
  return <svg width={w} viewBox="0 0 210 140" aria-hidden style={{ display: "block", maxWidth: "100%", height: "auto" }}><Shadow /><Rice />{top}</svg>;
};
export const Gunkan = ({ w = 160 }: { w?: number }) => (
  <svg width={w} viewBox="0 0 170 160" aria-hidden style={{ display: "block", maxWidth: "100%", height: "auto" }}>
    <ellipse cx="96" cy="146" rx="62" ry="9" fill="#bdb9a6" opacity=".75" />
    <path d="M26 62V120C26 138 146 138 146 120V62Z" fill="#0b1f1a" /><path d="M118 66V126C136 124 146 120 146 118V62Z" fill="#16352e" />
    <path d="M38 70c4 18 3 38 0 52" stroke="#2f5a4e" strokeWidth="4" strokeLinecap="round" fill="none" />
    <ellipse cx="86" cy="62" rx="60" ry="18" fill="#c93a1e" />
    {[[48, 58], [66, 52], [86, 50], [106, 54], [124, 60], [58, 66], [78, 62], [98, 64], [116, 68], [70, 56], [92, 56], [38, 62], [134, 64]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="8" fill={i % 3 ? "#f4511e" : "#ff7a3d"} stroke="#b02e14" strokeWidth="1" />)}
    {[[45, 55], [64, 49], [84, 47], [104, 51], [122, 57]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2" fill="#fff" opacity=".8" />)}
  </svg>
);
export const Maki = ({ w = 150, filling = "#f0412e" }: { w?: number; filling?: string }) => (
  <svg width={w} viewBox="0 0 160 150" aria-hidden style={{ display: "block", maxWidth: "100%", height: "auto" }}>
    <ellipse cx="86" cy="138" rx="60" ry="9" fill="#bdb9a6" opacity=".75" />
    <path d="M22 58V112C22 134 140 134 140 112V58Z" fill="#0b1f1a" /><path d="M112 62V122C128 120 140 116 140 112V58Z" fill="#16352e" />
    <path d="M32 66c4 16 3 34 0 46" stroke="#2f5a4e" strokeWidth="4" strokeLinecap="round" fill="none" />
    <ellipse cx="81" cy="58" rx="59" ry="26" fill="#0b1f1a" /><ellipse cx="81" cy="58" rx="49" ry="20" fill="#fbf3c8" />
    <ellipse cx="81" cy="58" rx="20" ry="9" fill={filling} /><path d="M70 55c6-3 16-3 22 0" stroke="#fff" strokeWidth="2.500" strokeLinecap="round" fill="none" opacity=".7" />
    {[[44, 56], [58, 70], [104, 70], [116, 54], [94, 44], [60, 44]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.800" fill="#fff" />)}
  </svg>
);
export const Roll = ({ w = 120, cut = "#f0412e", green = false }: { w?: number; cut?: string; green?: boolean }) => (
  <svg width={w} viewBox="0 0 120 100" aria-hidden style={{ display: "block", maxWidth: "100%", height: "auto" }}>
    <ellipse cx="60" cy="52" rx="52" ry="40" fill={green ? "#e4f1d8" : "#fbf3c8"} stroke="#0b1f1a" strokeWidth="9" /><ellipse cx="60" cy="52" rx="28" ry="22" fill="#fff" />
    <ellipse cx="60" cy="50" rx="16" ry="12" fill={green ? "#7cc06a" : cut} /><circle cx="52" cy="46" r="3" fill="#fff" opacity=".7" />
  </svg>
);
export const Bowl = ({ w = 120, fill = "#8a5a2c" }: { w?: number; fill?: string }) => (
  <svg width={w} viewBox="0 0 120 70" aria-hidden style={{ display: "block", maxWidth: "100%", height: "auto" }}>
    <ellipse cx="60" cy="60" rx="40" ry="7" fill="#bdb9a6" opacity=".7" />
    <path d="M10 28C12 56 36 62 60 62S108 56 110 28Z" fill="#f6f2ea" /><path d="M80 30C96 32 108 30 110 28 108 52 92 60 72 62 82 52 84 40 80 30Z" fill="#e3ded1" />
    <ellipse cx="60" cy="28" rx="50" ry="14" fill="#fffdf8" /><ellipse cx="60" cy="28" rx="40" ry="10" fill={fill} /><path d="M40 28c10-6 30-6 40 0M44 31c10 3 24 3 34 0" stroke="#5b3a1b" strokeWidth="2" fill="none" opacity=".6" /><circle cx="52" cy="26" r="3" fill="#d9a769" /><circle cx="72" cy="30" r="2.500" fill="#d9a769" />
  </svg>
);
export const Sauce = ({ w = 150 }: { w?: number }) => (
  <svg width={w} viewBox="0 0 150 110" aria-hidden style={{ display: "block", maxWidth: "100%", height: "auto" }}>
    <ellipse cx="75" cy="98" rx="54" ry="9" fill="#ccc" opacity=".8" />
    <path d="M12 38C14 82 44 94 75 94S136 82 138 38Z" fill="#e8662a" /><path d="M104 40C122 42 136 40 138 38 134 78 116 90 90 94 104 80 108 56 104 40Z" fill="#c24f1c" />
    <ellipse cx="75" cy="38" rx="63" ry="20" fill="#f08a45" /><ellipse cx="75" cy="38" rx="52" ry="15" fill="#2c1a10" />
    {[[56, 32], [74, 40], [92, 34], [66, 42], [84, 30]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="4" ry="2.500" fill={i % 2 ? "#6b3d1d" : "#9b6a37"} />)}
  </svg>
);
export const Temaki = ({ w = 120 }: { w?: number }) => (
  <svg width={w} viewBox="0 0 120 130" aria-hidden style={{ display: "block", maxWidth: "100%", height: "auto" }}>
    <path d="M10 40L70 8 112 78 36 122Z" fill="#0b1f1a" /><path d="M70 8L112 78 96 88 60 28Z" fill="#16352e" />
    <path d="M24 44L66 20 82 46 38 70Z" fill="#fbf3c8" /><circle cx="46" cy="44" r="7" fill="#f56a36" /><circle cx="62" cy="38" r="6" fill="#7cc06a" /><circle cx="54" cy="54" r="5" fill="#fff" />
  </svg>
);
export const Sakura = ({ s = 22 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden><g fill={RED}>{[0, 72, 144, 216, 288].map((r) => <circle key={r} cx="12" cy="6.500" r="5" transform={`rotate(${r} 12 12)`} />)}</g><circle cx="12" cy="12" r="3.500" fill="#fff" opacity=".9" /><circle cx="12" cy="12" r="1.600" fill="#f3a21a" /></svg>
);
export const Leaf = ({ s = 16, r = 0 }: { s?: number; r?: number }) => (
  <svg width={s} height={s * 0.5} viewBox="0 0 24 12" aria-hidden style={{ transform: `rotate(${r}deg)` }}><path d="M1 6C6 0 18 0 23 6 18 12 6 12 1 6Z" fill="#6cc04a" /><path d="M3 6h18" stroke="#fff" strokeWidth="1" opacity=".6" /></svg>
);
export const Chop = ({ w = 220, c = "#c98a4b" }: { w?: number; c?: string }) => (
  <svg width={w} viewBox="0 0 220 40" aria-hidden style={{ display: "block", maxWidth: "100%", height: "auto" }}><path d="M0 6L220 18 220 24 0 12Z" fill={c} /><path d="M0 20L220 26 220 32 0 26Z" fill={c} opacity=".85" /></svg>
);
export const Tray = ({ w = 300 }: { w?: number }) => (
  <svg width={w} viewBox="0 0 300 170" aria-hidden style={{ display: "block", maxWidth: "100%", height: "auto" }}>
    <path d="M10 110L120 40 290 100 190 164Z" fill="#14161c" /><path d="M10 110L190 164 190 176 10 122Z" fill="#000" /><path d="M190 164L290 100 290 112 190 176Z" fill="#23262f" />
    <g transform="translate(70 4) scale(.78)"><Nigiri kind="camarao" w={200} /></g>
  </svg>
);
export const Brush = ({ w = 560, id = "b" }: { w?: number; id?: string }) => (
  <svg width={w} viewBox="0 0 560 560" aria-hidden style={{ display: "block", maxWidth: "100%", height: "auto" }}>
    <path d="M280 20C410 10 540 110 546 270 552 420 430 548 282 546 140 548 18 430 18 284 18 140 140 28 280 20Z" fill={RED} />
    <path d="M540 190C548 150 520 110 480 80M60 400c20 60 80 100 150 116M30 250c-6-60 24-120 70-150" stroke="#fff" strokeWidth="6" strokeLinecap="round" fill="none" opacity=".25" />
    <path d="M120 420C60 340 70 200 160 130M200 500C330 540 480 470 520 340M470 140C420 60 330 40 250 56" stroke="#fff" strokeWidth="10" strokeLinecap="round" fill="none" opacity=".3" />
    <path d="M130 160C190 100 300 80 380 130M110 300c-10-60 10-100 40-130" stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none" opacity=".4" />
  </svg>
);

/** Japonês/sushi a partir do pin "Oishi": ilustrações vetoriais flat, vermelho #dc4f3f, azul-marinho, pincelada e flores de cerejeira. */
const MENU = [
  { n: "Sushi de salmão", p: 24, k: "salmao" as const }, { n: "Sushi de atum", p: 22, k: "atum" as const }, { n: "Sushi de camarão", p: 20, k: "camarao" as const },
  { n: "Sushi de ovo", p: 19, k: "ovo" as const }, { n: "Gunkan de ovas", p: 24, k: "gunkan" as const }, { n: "Maki de salmão", p: 24, k: "maki" as const },
];
const NAVL: [string, string][] = [["Menu", "menu"], ["Pratos", "menu"], ["Serviços", "reserva"], ["Sobre nós", "sobre"]];
const TABS: string[] = ["Todos", "Sushi Maré", "Ramen Maré", "Udon Maré", "Dango Maré", "Outros"];
const fm = (v: number) => `R$ ${v.toFixed(2).replace(".", ",")}`;
const Art = ({ k, w }: { k: (typeof MENU)[number]["k"]; w: number }) => k === "gunkan" ? <Gunkan w={w * 0.8} /> : k === "maki" ? <Maki w={w * 0.8} /> : <Nigiri kind={k} w={w} />;

export function MareSushi({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Maré Sushi";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [tab, setTab] = useState(0);
  const [menu, setMenu] = useState(false);
  const [toast, setToast] = useState("");
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(""), 1800); return () => clearTimeout(t); }, [toast]);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const wa = (t: string) => `https://wa.me/${num}?text=${encodeURIComponent(t)}`;
  const items = tab <= 1 ? MENU : [];
  const Logo = () => (<a className="logo" href="#top" onClick={(e) => { e.preventDefault(); go("top"); }} aria-label={brand}><span className="lc"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.200" strokeLinecap="round" aria-hidden><path d="M2 9c3-3 5-3 8 0s5 3 8 0 3-2 4-2M2 16c3-3 5-3 8 0s5 3 8 0 3-2 4-2" /></svg></span>{brand}</a>);
  return (
    <div className="ms" id="top">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kdam+Thmor+Pro&family=Lora:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500&display=swap');
        .ms{background:#fdfcfb;color:${NAVY};font-family:'Lora',Georgia,serif;overflow-x:hidden;position:relative}
        .ms *{box-sizing:border-box}.ms a,.ms button{font-family:inherit;cursor:pointer}
        .ms h1,.ms h2,.ms h3{font-family:'Kdam Thmor Pro','Arial Narrow',sans-serif;font-weight:400;margin:0;color:${NAVY};text-transform:uppercase;letter-spacing:.02em;line-height:1.28}
        .ms .in{max-width:1100px;margin:0 auto;padding:0 28px;position:relative}
        .ms nav{position:sticky;top:0;z-index:20;background:rgba(253,252,251,.96)}.ms nav .in{display:flex;align-items:center;height:76px;justify-content:space-between}
        .ms .logo{display:flex;align-items:center;gap:8px;color:${NAVY};text-decoration:none;font-size:22px;font-weight:500}.ms .lc{width:36px;height:36px;border-radius:50%;background:${RED};display:grid;place-items:center}
        .ms .links{display:flex;gap:42px;align-items:center}.ms .links a{color:#6c6a80;text-decoration:none;font-size:14px;position:relative}.ms .links a.on{color:${RED}}.ms .links a.on:after{content:"";position:absolute;left:-12px;right:-12px;bottom:-9px;height:4px;border-radius:4px;background:${RED}}
        .ms .cta{border:1.5px solid ${RED};color:${RED};background:#fff;border-radius:8px;padding:11px 26px;font-size:13px;font-weight:600;text-decoration:none;display:inline-block}
        .ms .burger{display:none;background:none;border:0}
        .ms .hero{position:relative;padding:48px 0 70px}.ms .hero .in{display:grid;grid-template-columns:1fr 1.05fr;align-items:center;gap:20px;min-height:540px}
        .ms .hero h1{font-size:44px;max-width:470px}.ms .hero p{font-family:'Plus Jakarta Sans',sans-serif;color:#8a889b;font-size:13px;line-height:1.9;max-width:420px;margin:34px 0 36px}
        .ms .row{display:flex;align-items:center;gap:26px;flex-wrap:wrap}
        .ms .bt{position:relative;display:inline-block;color:#fff;font-size:14px;font-weight:600;text-decoration:none;padding:15px 44px 15px 34px;background:${RED};clip-path:polygon(0 12%,3% 0,86% 6%,100% 40%,96% 70%,84% 96%,5% 100%,0 80%);border:0}
        .ms .how{display:flex;align-items:center;gap:12px;color:${RED};text-decoration:none;font-size:14px}.ms .how i{width:46px;height:46px;border:1.5px solid ${RED};border-radius:50%;display:grid;place-items:center}
        .ms .art{position:relative;aspect-ratio:1/1;width:100%;max-width:560px;justify-self:end}.ms .art>*{position:absolute}
        .ms .fl{position:absolute;pointer-events:none}
        .ms .about{padding:56px 0 20px}.ms .about .in{display:grid;grid-template-columns:.8fr 1.2fr;gap:70px;align-items:center}
        .ms .rc{background:${RED};border-radius:14px;aspect-ratio:.82/1;display:grid;place-items:center;position:relative;overflow:hidden}
        .ms .rc:before{content:"";position:absolute;inset:0;background:repeating-radial-gradient(circle at 130% 110%,transparent 0 22px,rgba(255,255,255,.12) 23px 24px)}.ms .rc>*{position:relative}
        .ms .kick{color:${RED};font-size:16px;margin-bottom:8px;display:block}.ms .about h2{font-size:32px;margin-bottom:22px}
        .ms .txt{font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;line-height:1.9;color:#8a889b;margin:0 0 16px}
        .ms .smenu{padding:40px 0 30px}.ms .smenu .in{display:grid;grid-template-columns:1.2fr .8fr;gap:70px;align-items:center}
        .ms .smenu h2{font-size:34px;margin:6px 0 26px}.ms .smenu ul{list-style:none;padding:0;margin:0;display:grid;gap:20px}.ms .smenu li{display:flex;gap:14px;align-items:flex-start}.ms .smenu li p{margin:0}
        .ms .disc{padding:60px 0 20px;text-align:center}.ms .disc h2{font-size:34px;margin-bottom:46px}
        .ms .mg{display:grid;grid-template-columns:150px 1fr;gap:40px;text-align:left;max-width:960px;margin:0 auto}
        .ms .tabs{display:flex;flex-direction:column;gap:30px;padding-top:36px}.ms .tabs button{background:none;border:0;text-align:left;color:#9a98ab;font-size:17px;padding:0;position:relative}.ms .tabs button.on{color:${RED};font-weight:500}.ms .tabs button.on:after{content:"";position:absolute;left:0;right:-20px;bottom:-8px;height:4px;border-radius:4px;background:${RED}}
        .ms .cards{display:grid;grid-template-columns:repeat(3,1fr);gap:22px 18px}
        .ms .mc{background:#fff;text-align:center;padding-bottom:22px}.ms .rib{margin:0 0 6px;position:relative;background:${RED} repeating-linear-gradient(135deg,rgba(255,255,255,.08) 0 6px,transparent 6px 12px);color:#fff;font-size:14px;padding:18px 8px;text-align:center;font-family:'Plus Jakarta Sans',sans-serif;border-left:8px solid ${NAVY};border-right:8px solid ${NAVY}}
        .ms .mc .im{height:170px;display:grid;place-items:center;margin:10px 0 4px}.ms .mc b{display:block;font-weight:500;font-size:17px}.ms .mc .pr{color:${RED};font-size:13px;margin-top:8px;display:block}
        .ms .empty{grid-column:1/-1;text-align:center;color:#8a889b;padding:60px 0}
        .ms .more{display:inline-block;margin:42px 0 0;border:1.5px solid ${RED};color:${RED};background:#fff;border-radius:8px;padding:12px 28px;font-size:13px;font-weight:600;text-decoration:none}
        .ms .book{margin-top:70px;background:${RED};color:#fff;text-align:center;position:relative;overflow:hidden;padding:70px 0 74px}
        .ms .book:before{content:"";position:absolute;inset:0;background:repeating-radial-gradient(ellipse at 20% 120%,transparent 0 26px,rgba(255,255,255,.08) 27px 28px)}.ms .book>*{position:relative}
        .ms .book h2{font-family:'Lora',serif;text-transform:none;color:#fff;font-size:46px;font-weight:400;margin:6px 0 24px}.ms .book p{font-family:'Plus Jakarta Sans',sans-serif;font-size:12px;line-height:1.9;max-width:420px;margin:0 auto 28px;color:#ffe3dd}
        .ms .book .cta{background:transparent;color:#fff;border-color:#fff}
        .ms .bl{position:absolute!important;left:3%;top:50%;transform:translateY(-50%) rotate(-12deg)}.ms .br{position:absolute!important;right:0;top:50%;transform:translateY(-44%)}
        .ms footer{padding:38px 0 26px}.ms footer .t{display:flex;justify-content:space-between;align-items:center;padding-bottom:28px;border-bottom:1px solid #f3dcd6}.ms footer .t div{display:flex;gap:34px}.ms footer a{color:#8a889b;text-decoration:none;font-size:13px}
        .ms footer .b{display:flex;justify-content:space-between;padding-top:20px;font-size:13px;color:#8a889b;gap:20px;flex-wrap:wrap}
        .ms .dm{margin:0;font-family:'Plus Jakarta Sans',sans-serif;font-size:12px;color:#8a889b;padding-top:14px}
        .ms .wa{position:fixed;right:14px;bottom:14px;width:48px;height:48px;border-radius:50%;background:#25d366;display:grid;place-items:center;z-index:30;box-shadow:0 6px 18px rgba(0,0,0,.25)}
        .ms .toast{position:fixed;left:50%;bottom:76px;transform:translateX(-50%);background:${NAVY};color:#fff;padding:10px 18px;border-radius:30px;font-size:13px;z-index:40}
        @media(max-width:900px){
          .ms .links{display:none}.ms .burger{display:block}.ms .links.open{display:flex;position:absolute;left:0;right:0;top:76px;background:#fdfcfb;flex-direction:column;gap:16px;padding:18px 28px;box-shadow:0 14px 24px rgba(0,0,0,.08);align-items:flex-start}
          .ms nav .in>.cta,.ms .fl{display:none}.ms .hero{padding:20px 0 40px}.ms .hero .in{grid-template-columns:1fr;min-height:0}.ms .hero h1{font-size:30px}.ms .hero p{margin:22px 0 26px}.ms .art{justify-self:center;max-width:420px;margin-top:20px}
          .ms .about .in{grid-template-columns:1fr;gap:30px}.ms .rc{max-width:340px;margin:0 auto;width:100%}.ms .about h2,.ms .smenu h2,.ms .disc h2{font-size:25px}
          .ms .smenu .in{grid-template-columns:1fr;gap:30px}.ms .smenu .rc{order:-1;max-width:340px;margin:0 auto;width:100%}
          .ms .mg{grid-template-columns:1fr;gap:20px}.ms .tabs{flex-direction:row;overflow-x:auto;gap:22px;padding:0 0 14px}.ms .tabs button{white-space:nowrap;font-size:15px}.ms .tabs button.on:after{right:0}
          .ms .cards{grid-template-columns:1fr 1fr}.ms .mc .im{height:120px}.ms .book h2{font-size:30px}.ms .bl,.ms .br{opacity:.5}.ms .bl{left:-40px}.ms .br{right:-80px}
          .ms footer .t{flex-direction:column;align-items:flex-start;gap:20px}.ms footer .t div{flex-wrap:wrap;gap:16px 24px}
        }
      `}</style>
      <nav><div className="in"><Logo />
        <div className={`links${menu ? " open" : ""}`}>{NAVL.map(([t, id], i) => <a key={t} className={i === 0 ? "on" : ""} href={`#${id}`} onClick={(e) => { e.preventDefault(); go(id); }}>{t}</a>)}</div>
        <a className="cta" href={wa("Oi! Quero falar com a casa.")} target="_blank" rel="noreferrer">Fale conosco</a>
        <button type="button" className="burger" aria-label="Menu" onClick={() => setMenu((m) => !m)}><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="2.200" strokeLinecap="round" aria-hidden><path d="M4 7h16M4 12h16M4 17h16" /></svg></button>
      </div></nav>

      <header className="hero"><div className="in">
        <div className="fl" style={{ left: 40, top: 10 }}><Sakura s={22} /></div>
        <div className="fl" style={{ left: 130, top: 36 }}><Leaf r={30} /></div>
        <div>
          <h1>Culinária japonesa e sushi no melhor nível</h1>
          <p>A {brand} reinventa o “washoku” com pratos autorais e um toque moderno: kaiseki e sushi feitos na hora, com ingredientes frescos selecionados todos os dias.</p>
          <div className="row"><a className="bt" href={wa("Oi! Quero fazer uma reserva.")} target="_blank" rel="noreferrer">Reservar</a><a className="how" href="#reserva" onClick={(e) => { e.preventDefault(); go("reserva"); }}><i><svg width="14" height="14" viewBox="0 0 24 24" fill={RED} aria-hidden><path d="M7 4l13 8-13 8z" /></svg></i>Como reservar</a></div>
        </div>
        <div className="art" role="img" aria-label="Prato de sushis variados sobre uma mancha vermelha de pincel">
          <div style={{ inset: 0 }}><Brush w={560} /></div>
          <div style={{ left: "38%", top: "-2%", width: "66%" }}><Tray w={340} /></div>
          <div style={{ left: "50%", top: "2%", width: "26%" }}><Roll w={130} /></div>
          <div style={{ left: "75%", top: "4%", width: "24%" }}><Roll w={120} green /></div>
          <div style={{ left: "64%", top: "20%", width: "34%" }}><Bowl w={170} fill="#8a5a2c" /></div>
          <div style={{ left: "20%", top: "27%", width: "30%" }}><Maki w={160} /></div>
          <div style={{ left: "14%", top: "43%", width: "30%" }}><Maki w={150} filling="#ff8a3d" /></div>
          <div style={{ left: "46%", top: "32%", width: "32%" }}><Gunkan w={170} /></div>
          <div style={{ left: "66%", top: "42%", width: "36%" }}><Gunkan w={190} /></div>
          <div style={{ left: "36%", top: "52%", width: "28%" }}><Temaki w={150} /></div>
          <div style={{ left: "6%", top: "58%", width: "24%" }}><Gunkan w={120} /></div>
          <div style={{ left: "-2%", top: "70%", width: "32%" }}><Sauce w={160} /></div>
          <div style={{ left: "62%", top: "60%", width: "38%" }}><Chop w={200} c="#4a3220" /></div>
          <div style={{ left: "8%", top: "2%" }}><Sakura s={26} /></div>
          <div style={{ left: "94%", top: "0%" }}><Sakura s={22} /></div>
          <div style={{ left: "56%", top: "92%" }}><Sakura s={22} /></div>
        </div>
      </div></header>

      <section className="about" id="sobre"><div className="in">
        <div className="rc"><div style={{ width: "104%", marginLeft: "-2%", transform: "rotate(-6deg)" }}><Nigiri kind="ovo" w={360} /></div></div>
        <div>
          <span className="kick">Quem somos</span>
          <h2>Culinária japonesa e sushi</h2>
          <p className="txt">A {brand} é uma casa de culinária japonesa (kaiseki e sushi) que busca reinterpretar o “washoku”, o conceito tradicional de refeição japonesa*, com técnica e pratos de vanguarda feitos com um toque moderno. *O washoku foi reconhecido como Patrimônio Cultural Imaterial da Humanidade pela UNESCO.</p>
          <p className="txt">Cada peça é montada na hora, com arroz temperado no ponto certo e peixes frescos escolhidos todas as manhãs.</p>
        </div>
      </div></section>

      <section className="smenu" id="menu"><div className="in">
        <div>
          <span className="kick">Menu de sushi</span>
          <h2>Menu especial de sushi de salmão da {brand}</h2>
          <ul>{["O salmão é um peixe de água salgada que desova em água doce, muito usado em cortes nobres e defumados.", "O sushi de salmão ganhou fama em nossa casa por ser leve, saboroso e acessível a todo mundo.", "Com a longa história do sushi, o salmão só virou clássico há poucas décadas e hoje é o favorito da mesa."].map((t, i) => <li key={i}><Sakura s={22} /><p className="txt">{t}</p></li>)}</ul>
        </div>
        <div className="rc" style={{ aspectRatio: ".72/1", maxWidth: 300, justifySelf: "end", width: "100%" }}><div style={{ width: "124%", marginLeft: "-4%", transform: "rotate(-4deg)" }}><Nigiri kind="salmao" w={380} /></div></div>
      </div></section>

      <section className="disc"><div className="in">
        <h2>Descubra nosso cardápio</h2>
        <div className="mg">
          <div className="tabs">{TABS.map((t, i) => <button key={t} type="button" className={i === tab ? "on" : ""} onClick={() => setTab(i)}>{t}</button>)}</div>
          <div className="cards">{items.length ? items.map((m) => <article className="mc" key={m.n}><div className="rib">{m.n}</div><div className="im"><Art k={m.k} w={200} /></div><b>{m.n}</b><span className="pr">{fm(m.p)}</span></article>) : <div className="empty">Esse cardápio completo vai pelo WhatsApp.<br /><a className="more" style={{ marginTop: 18 }} href={wa(`Oi! Quero ver o cardápio: ${TABS[tab]}.`)} target="_blank" rel="noreferrer">Pedir cardápio</a></div>}</div>
        </div>
        <a className="more" href={wa("Oi! Quero ver o cardápio completo.")} target="_blank" rel="noreferrer">Ver mais do menu</a>
      </div></section>

      <section className="book" id="reserva">
        <div className="bl"><Roll w={170} cut="#f0412e" /></div>
        <div className="br" style={{ width: "26%", minWidth: 220 }}><Tray w={340} /></div>
        <div className="in"><span style={{ fontSize: 15 }}>Peça agora</span><h2>Reserve uma mesa para o jantar</h2><p>Basta um contato e reservamos a mesa para você. Também é possível escolher o espaço de acordo com o número de pessoas da família.</p><a className="cta" href={wa("Oi! Quero reservar uma mesa para o jantar.")} target="_blank" rel="noreferrer">Fale conosco agora</a></div>
      </section>

      <footer><div className="in">
        <div className="t"><Logo /><div>{NAVL.map(([t, id]) => <a key={t} href={`#${id}`} onClick={(e) => { e.preventDefault(); go(id); }}>{t}</a>)}</div></div>
        <div className="b"><span>© 2026 {brand}. Todos os direitos reservados.</span><div style={{ display: "flex", gap: 28 }}><a>Segurança</a><a>Privacidade</a><a>Termos</a></div></div>
        <p className="dm">Fotos, nomes, números, preços e endereço são ilustrativos. Modelo de demonstração.</p>
      </div></footer>
      <a className="wa" href={wa("Oi! Quero reservar na " + brand + ".")} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp" onClick={() => setToast("Abrindo WhatsApp")}><svg width="26" height="26" viewBox="0 0 24 24" fill="#fff" aria-hidden><path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2zm5.2 13.9c-.2.6-1.3 1.2-1.8 1.2-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.2-1.6-1.2-3s.8-2.1 1-2.4c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2.1 1.3 2.4 1.5.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.8-.1 1.4z" /></svg></a>
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}
