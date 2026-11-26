import { useMemo, useRef, useState } from "react";

/** Pet shop novo, construido do zero a partir de um pin de pet food claro e verde. Carrinho com checkout de mentira que fecha no WhatsApp. */
const G = "#16491c", G2 = "#1f6b2a", CREAM = "#f6e9b8", INK = "#1d2b1d";
type P = { id: string; n: string; p: number; img: string; cat: "Rações" | "Petiscos"; r: number };
const PRODUCTS: P[] = [
  { id: "r1", n: "Riverfield Frango e Arroz 10 kg", p: 139.9, img: "/pet-bag1.webp", cat: "Rações", r: 128 },
  { id: "r2", n: "Red Paw Carne e Batata-doce 10 kg", p: 159.9, img: "/pet-bag2.webp", cat: "Rações", r: 96 },
  { id: "r3", n: "SunnyBite Frango e Vegetais 10 kg", p: 129.9, img: "/pet-bag3.webp", cat: "Rações", r: 214 },
  { id: "r4", n: "GreenTrail Salmão e Grãos 10 kg", p: 169.9, img: "/pet-bag4.webp", cat: "Rações", r: 73 },
  { id: "p1", n: "Ossinhos com cenoura 300 g", p: 24.9, img: "/pet-pouch1.webp", cat: "Petiscos", r: 88 },
  { id: "p2", n: "Bifinhos de carne 250 g", p: 29.9, img: "/pet-pouch2.webp", cat: "Petiscos", r: 142 },
  { id: "p3", n: "Biscoito patinha 300 g", p: 19.9, img: "/pet-pouch3.webp", cat: "Petiscos", r: 65 },
  { id: "p4", n: "Cubinhos de frango 200 g", p: 26.9, img: "/pet-pouch4.webp", cat: "Petiscos", r: 110 },
];
const brl = (v: number) => `R$ ${v.toFixed(2).replace(".", ",")}`;
const norm = (t: string) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const Paw = ({ c = "#e9d28a", s = 40 }: { c?: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 64 64" fill={c} aria-hidden><ellipse cx="32" cy="42" rx="13" ry="11" /><ellipse cx="14" cy="28" rx="6" ry="8" /><ellipse cx="26" cy="17" rx="6" ry="8" /><ellipse cx="40" cy="17" rx="6" ry="8" /><ellipse cx="52" cy="28" rx="6" ry="8" /></svg>
);
const Leaf = ({ s = 44, r = 0 }: { s?: number; r?: number }) => (
  <svg width={s} height={s} viewBox="0 0 48 48" style={{ transform: `rotate(${r}deg)` }} aria-hidden><path d="M8 40C8 18 22 6 42 6c0 22-12 34-34 34z" fill="#3f9a3a" /><path d="M8 40C18 28 26 20 36 12" stroke="#2c7a2c" strokeWidth="2" fill="none" /></svg>
);
const Ico = ({ d, c = G, s = 30 }: { d: string; c?: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);
const I = {
  leaf: "M6 26C6 12 14 5 26 5c0 13-7 21-20 21zM6 26L18 14",
  vet: "M8 6h16v20H8zM12 16h8M16 12v8",
  nopres: "M16 4a12 12 0 1 0 0 24 12 12 0 0 0 0-24zM9 9l14 14",
  users: "M11 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM3 26c0-5 3-8 8-8s8 3 8 8M22 13a3 3 0 1 0 0-6M25 26c0-3-1-5-3-6",
  bag: "M7 11h18l1 16H6zM11 11a5 5 0 0 1 10 0",
  box: "M4 10l12-6 12 6v12l-12 6-12-6zM4 10l12 6 12-6M16 16v12",
  eye: "M2 16s5-9 14-9 14 9 14 9-5 9-14 9S2 16 2 16zM16 20a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  truck: "M3 9h16v12H3zM19 13h6l4 4v4h-10zM9 24a2 2 0 1 0 0-.1M24 24a2 2 0 1 0 0-.1",
  shield: "M16 3l11 4v8c0 7-5 12-11 14C10 27 5 22 5 15V7zM11 16l4 4 7-8",
  ret: "M6 12a10 10 0 0 1 17-4l3 3M26 8v6h-6M26 20a10 10 0 0 1-17 4l-3-3M6 24v-6h6",
  head: "M5 20v-4a11 11 0 0 1 22 0v4M5 18h4v8H5zM23 18h4v8h-4z",
  cart: "M3 5h4l3 14h14l3-10H8M12 25a1.5 1.5 0 1 0 0-.1M22 25a1.5 1.5 0 1 0 0-.1",
  search: "M14 24a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM22 22l7 7",
};
const Stars = () => <span aria-label="5 estrelas" style={{ color: "#e2a31b", letterSpacing: 1, fontSize: 13 }}>★★★★★</span>;

export function PetFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [q, setQ] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"cart" | "pay" | "done">("cart");
  const car = useRef<HTMLDivElement>(null);
  const best = useRef<HTMLElement>(null);
  const count = Object.values(cart).reduce((a, c) => a + c, 0);
  const sub = PRODUCTS.reduce((a, p) => a + (cart[p.id] ?? 0) * p.p, 0);
  const list = useMemo(() => PRODUCTS.filter((p) => p.cat === "Rações" && norm(p.n).includes(norm(q))), [q]);
  const treats = PRODUCTS.filter((p) => p.cat === "Petiscos");
  const add = (id: string) => { setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 })); setOpen(true); setStep("cart"); };
  const dec = (id: string) => setCart((c) => { const n = (c[id] ?? 0) - 1; const x = { ...c }; if (n <= 0) delete x[id]; else x[id] = n; return x; });
  const order = PRODUCTS.filter((p) => cart[p.id]).map((p) => `${cart[p.id]}x ${p.n}`).join(", ");
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Fiz um pedido no site${brand ? ` da ${brand}` : ""}: ${order}. Total ${brl(sub)}.`)}`;
  const go = (el: React.RefObject<HTMLElement | null>) => el.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  return (
    <div className="pf" style={{ fontFamily: "Poppins, system-ui, sans-serif", color: INK, background: "#fff", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Caveat+Brush&family=Fredoka:wght@500;600;700&family=Lora:ital,wght@1,500;1,600&display=swap');
        .pf *{box-sizing:border-box}
        .pf a,.pf button{font-family:inherit}
        .pf .wrap{max-width:1180px;margin:0 auto;padding:0 20px}
        .pf .nav{display:flex;align-items:center;justify-content:space-between;gap:16px;background:#fff;border-radius:999px;padding:10px 12px 10px 22px;box-shadow:0 6px 24px rgba(40,60,20,.12)}
        .pf .links{display:flex;gap:34px;font-weight:500;font-size:15px}
        .pf .links a{color:${INK};text-decoration:none;cursor:pointer}
        .pf .pill{background:${G};color:#fff;border:0;border-radius:999px;padding:12px 26px;font-weight:600;font-size:15px;cursor:pointer;min-height:44px}
        .pf .h1{font-family:Poppins,sans-serif;font-size:clamp(40px,6.2vw,76px);line-height:1.04;font-weight:700;color:${G};letter-spacing:-1.5px;margin:0}
        .pf .h1 i{font-family:'Caveat Brush',cursive;font-style:normal;font-weight:400;color:#2f8f2f;letter-spacing:0;font-size:1.15em}
        .pf .hero{position:relative;background:${CREAM};padding:22px 0 0;overflow:hidden}
        .pf .herogrid{display:grid;grid-template-columns:1.05fr 1fr;align-items:end;gap:0;min-height:560px}
        .pf .search{width:100%;display:flex;background:#fff;border:1.5px solid #5d9a55;border-radius:999px;overflow:hidden;max-width:470px;margin-top:26px}
        .pf .search input{flex:1;border:0;outline:0;padding:0 22px;font-size:15px;min-height:50px;min-width:0;background:transparent}
        .pf .search button{background:${G};color:#fff;border:0;padding:0 30px;font-weight:600;cursor:pointer;min-height:50px}
        .pf .badges{display:flex;gap:22px;flex-wrap:wrap;margin:26px 0 90px}
        .pf .badge{display:flex;align-items:center;gap:10px;font-size:12.5px;font-weight:600;line-height:1.25;max-width:130px}
        .pf .badge span.c{width:42px;height:42px;border:1.5px solid #5d9a55;border-radius:50%;display:grid;place-items:center;flex:none}
        .pf .wave{position:absolute;left:0;right:0;bottom:0;height:80px;background:${G};border-radius:100% 100% 0 0/100% 100% 0 0;transform:scaleX(1.6)}
        .pf .stats{background:${G};color:#fff;padding:26px 0 30px}
        .pf .statgrid{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;padding:0 20px}
        .pf .stat{display:flex;gap:14px;align-items:center;justify-content:center;padding:4px 12px;border-right:1px solid rgba(255,255,255,.28)}
        .pf .stat:last-child{border:0}
        .pf .stat b{display:block;font-size:26px;font-weight:700;line-height:1}
        .pf .stat small{font-size:12px;opacity:.85}
        .pf .quote{display:grid;grid-template-columns:.9fr 1.1fr;align-items:end;gap:20px;padding-top:6px}
        .pf .quote p{font-family:Lora,serif;font-style:italic;font-weight:600;font-size:clamp(20px,2.4vw,28px);line-height:1.5;color:#5a3a22;text-align:center;margin:30px 0}
        .pf .about{background:#f7f5ee;padding:60px 0 56px;border-radius:50% 50% 0 0/38px 38px 0 0;margin-top:-16px}
        .pf .aboutgrid{display:grid;grid-template-columns:1fr 1.5fr;gap:44px;align-items:center}
        .pf h2.t{font-family:Poppins;font-weight:800;font-size:clamp(28px,4vw,42px);letter-spacing:-.5px;margin:0;color:${INK};text-transform:uppercase}
        .pf h2.t em{font-style:normal;color:${G2}}
        .pf .cards3{display:grid;grid-template-columns:1fr 1.05fr 1fr;gap:16px}
        .pf .c3{border-radius:22px;overflow:hidden;min-height:300px;display:flex;align-items:flex-end;justify-content:center;box-shadow:0 8px 22px rgba(20,50,20,.12)}
        .pf .c3 img{width:92%;height:auto;display:block;max-height:300px;object-fit:contain}
        .pf .ghost{border:1.5px solid #5d9a55;background:#fff;color:${G};border-radius:999px;padding:9px 20px;font-weight:600;font-size:14px;cursor:pointer;min-height:44px}
        .pf .carwrap{position:relative}
        .pf .car{display:flex;gap:18px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding:6px 50px 8px}
        .pf .car::-webkit-scrollbar{display:none}
        .pf .prod{flex:0 0 min(230px,64%);scroll-snap-align:start;text-align:left}
        .pf .prod .im{height:250px;display:flex;align-items:center;justify-content:center}
        .pf .prod img{max-height:240px;max-width:100%;object-fit:contain;filter:drop-shadow(0 10px 12px rgba(0,0,0,.18))}
        .pf .arrow{position:absolute;top:110px;width:44px;height:44px;border-radius:50%;background:#fff;border:0;box-shadow:0 4px 14px rgba(0,0,0,.18);cursor:pointer;font-size:20px;z-index:2}
        .pf .cartbtn{width:44px;height:44px;border-radius:10px;border:0;background:${G};cursor:pointer;display:grid;place-items:center}
        .pf .cartbtn.s{background:#f4eac0;border:1.5px solid #6aa35f}
        .pf .circles{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
        .pf .circ{text-align:center}
        .pf .circ .o{width:min(190px,100%);aspect-ratio:1;border-radius:50%;background:#fff;box-shadow:0 10px 26px rgba(30,60,30,.14);margin:0 auto;display:grid;place-items:center}
        .pf .circ .o img{max-height:68%;max-width:60%}
        .pf .offer{position:relative;background:${G};border-radius:26px;display:grid;grid-template-columns:1.1fr 1fr;align-items:end;margin-top:90px;box-shadow:0 14px 30px rgba(20,60,20,.3)}
        .pf .offer h3{font-family:Fredoka,sans-serif;font-weight:600;font-size:clamp(28px,3.4vw,44px);color:${CREAM};margin:0}
        .pf .offer .big{font-family:Fredoka;font-weight:700;font-size:clamp(54px,7vw,92px);color:${CREAM};line-height:1}
        .pf .ben{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding:34px 0}
        .pf .bn{display:flex;gap:12px;align-items:center;justify-content:center;border-right:1px solid #cfd8cc;font-size:13px;font-weight:600;line-height:1.25}
        .pf .bn:last-child{border:0}
        .pf footer{background:${G};color:#fff;padding:46px 0 22px}
        .pf .fgrid{display:grid;grid-template-columns:1.2fr 1fr 1fr 1fr 1.2fr;gap:26px;font-size:13.5px}
        .pf .fgrid h4{margin:0 0 12px;font-size:16px}
        .pf .fgrid a{display:block;color:#fff;opacity:.9;margin-bottom:8px;text-decoration:none}
        .pf .drawer{position:fixed;inset:0;z-index:80;background:rgba(0,0,0,.4);display:flex;justify-content:flex-end}
        .pf .panel{width:min(420px,100%);background:#fff;height:100%;display:flex;flex-direction:column;padding:20px}
        .pf .qty{display:inline-flex;align-items:center;gap:10px;border:1px solid #cfd8cc;border-radius:999px;padding:2px 6px}
        .pf .qty button{width:34px;height:34px;border:0;background:transparent;font-size:18px;cursor:pointer}
        .pf .badgecnt{position:absolute;top:-4px;right:-4px;background:#e2531a;color:#fff;border-radius:999px;font-size:11px;min-width:20px;height:20px;display:grid;place-items:center;font-weight:700}
        @media(max-width:860px){
          .pf .links{display:none}
          .pf .signup{display:none}
          .pf .nav{padding:8px 10px 8px 16px}
          .pf .wrap{padding:0 16px}
          .pf .herogrid>*{min-width:0}
          .pf .herogrid{grid-template-columns:minmax(0,1fr);min-height:0}
          .pf .heroimg{order:2;margin:10px auto 0;width:92%}
          .pf .badges{margin:22px 0 10px}
          .pf .stats{padding-top:70px;margin-top:-1px}
          .pf .statgrid{grid-template-columns:repeat(2,1fr);row-gap:20px}
          .pf .stat:nth-child(2){border:0}
          .pf .quote,.pf .aboutgrid,.pf .offer{grid-template-columns:1fr}
          .pf .cards3{grid-template-columns:1fr 1fr}
          .pf .cards3 .mid{grid-column:1/-1;order:-1}
          .pf .circles{grid-template-columns:repeat(2,1fr);row-gap:24px}
          .pf .ben{grid-template-columns:repeat(2,1fr);row-gap:20px}
          .pf .bn:nth-child(2){border:0}
          .pf .fgrid{grid-template-columns:1fr 1fr}
          .pf .car{padding:6px 12px 8px}
          .pf .arrow{display:none}
          .pf .offer{margin-top:130px}
        }
      `}</style>

      {/* hero */}
      <section className="hero" id="inicio">
        <div className="wrap" style={{ position: "relative", zIndex: 3 }}>
          <div className="nav">
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 800, fontSize: 21, color: G }}>
              <Paw c={G2} s={30} />
              {brand ? <span>{brand}</span> : <span>Focinho<span style={{ color: "#e2c24f" }}>Feliz</span></span>}
            </div>
            <nav className="links" aria-label="Principal">
              <a onClick={() => go(best)}>Início</a><a href="#sobre">Sobre</a><a href="#racoes">Rações ▾</a><a href="#contato">Contato</a>
            </nav>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button aria-label="Abrir carrinho" onClick={() => { setOpen(true); setStep("cart"); }} style={{ position: "relative", width: 44, height: 44, borderRadius: "50%", border: 0, background: "transparent", cursor: "pointer" }}>
                <Ico d={I.cart} s={26} />{count > 0 && <span className="badgecnt">{count}</span>}
              </button>
              <button className="pill signup" onClick={() => setOpen(true)}>Cadastre-se</button>
            </div>
          </div>
        </div>
        <div className="wrap herogrid" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ paddingTop: 52 }}>
            <div style={{ position: "absolute", left: -10, top: 70, opacity: .55 }}><Paw s={90} /></div>
            <h1 className="h1" style={{ position: "relative" }}>Deixe seu<br /><i>pet</i> Feliz</h1>
            <p style={{ maxWidth: 420, fontSize: 14.5, lineHeight: 1.65, margin: "22px 0 0" }}>Ração, petisco e cuidado de quem entende de bicho. Escolha, pague aqui mesmo e receba em casa.</p>
            <form className="search" onSubmit={(e) => { e.preventDefault(); go(best); }}>
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar ração..." aria-label="Buscar ração" />
              <button type="submit">Buscar</button>
            </form>
            <div className="badges">
              {[["100% ingredientes naturais", I.leaf], ["Aprovado por veterinários", I.vet], ["Sem conservantes artificiais", I.nopres]].map(([t, d]) => (
                <div className="badge" key={t}><span className="c"><Ico d={d as string} s={22} /></span>{t}</div>
              ))}
            </div>
          </div>
          <div className="heroimg" style={{ position: "relative", alignSelf: "end" }}>
            <div style={{ position: "absolute", right: -6, top: 30, display: "grid", gap: 4 }}><Leaf s={36} r={20} /><Leaf s={30} r={-30} /></div>
            <div style={{ position: "absolute", right: 20, bottom: 70 }}><Leaf s={64} r={-10} /></div>
            <img src="/pet-hero.webp" alt="Cachorro feliz com tigela de ração" style={{ width: "100%", maxHeight: 560, objectFit: "contain", objectPosition: "bottom", display: "block", position: "relative", marginBottom: -4 }} />
          </div>
        </div>
        <div className="wave" aria-hidden />
      </section>

      <section className="stats" aria-label="Números">
        <div className="statgrid">
          {[["12 mil+", "Clientes felizes", I.users], ["3 mil+", "Produtos vendidos", I.bag], ["80+", "Entregas por dia", I.box], ["200 mil+", "Visitas ao site", I.eye]].map(([n, l, d]) => (
            <div className="stat" key={l}><Ico d={d as string} c="#fff" s={34} /><div><b>{n}</b><small>{l}</small></div></div>
          ))}
        </div>
      </section>

      <div className="wrap quote">
        <img src="/pet-corgis.webp" alt="Dois filhotes de corgi" style={{ width: "100%", maxWidth: 420, display: "block", margin: "0 auto" }} />
        <div>
          <p>“Do nosso coração à tigela do seu pet. Nutrição de verdade, corpo e alma. Mais forte, mais feliz a cada dia. Em cada mordida, o amor aparece.”</p>
          <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center", marginBottom: 20 }}><span style={{ height: 1, width: 120, background: "#8fbf86" }} /><Leaf s={26} /><span style={{ height: 1, width: 120, background: "#8fbf86" }} /></div>
        </div>
      </div>

      <section className="about" id="sobre">
        <div className="wrap aboutgrid">
          <div>
            <h2 className="t">Sobre <em>nós</em></h2>
            <p style={{ fontSize: 14, lineHeight: 1.75, margin: "18px 0 24px", maxWidth: 380 }}>Somos uma loja de bairro que virou referência em alimentação pet. Escolhemos cada marca com a ajuda de veterinários e entregamos no mesmo dia{client?.city ? ` em ${client.city}` : ""}.</p>
            <button className="pill" onClick={() => go(best)}>Saiba mais →</button>
          </div>
          <div className="cards3">
            <div className="c3" style={{ background: "#f6e9b8" }}><img src="/pet-golden.webp" alt="Filhote golden retriever" /></div>
            <div className="c3 mid" style={{ background: G, color: "#fff", flexDirection: "column", justifyContent: "center", textAlign: "center", padding: 24, gap: 16 }}>
              <Leaf s={30} />
              <div><b style={{ fontSize: 20 }}>Nutrição premium</b><p style={{ fontSize: 13, opacity: .9, margin: "6px 0 0" }}>Ingredientes de alta qualidade para a saúde geral.</p></div>
              <hr style={{ width: "70%", border: 0, borderTop: "1px dashed rgba(255,255,255,.4)" }} />
              <div><b style={{ fontSize: 20 }}>Crescimento saudável</b><p style={{ fontSize: 13, opacity: .9, margin: "6px 0 0" }}>Ajuda ossos e músculos fortes.</p></div>
            </div>
            <div className="c3" style={{ background: "#dfe5bd" }}><img src="/pet-curly.webp" alt="Filhote cavapoo" /></div>
          </div>
        </div>
      </section>

      <section ref={best} className="wrap" id="racoes" style={{ padding: "50px 20px 0", scrollMarginTop: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 className="t"><em>Mais</em> vendidos</h2>
          <button className="ghost">Ver tudo ›</button>
        </div>
        <div className="carwrap" style={{ marginTop: 22 }}>
          <button className="arrow" style={{ left: 0 }} aria-label="Anterior" onClick={() => car.current?.scrollBy({ left: -260, behavior: "smooth" })}>‹</button>
          <button className="arrow" style={{ right: 0 }} aria-label="Próximo" onClick={() => car.current?.scrollBy({ left: 260, behavior: "smooth" })}>›</button>
          <div className="car" ref={car}>
            {list.length === 0 && <p style={{ padding: 30 }}>Nenhuma ração encontrada para essa busca.</p>}
            {list.map((p) => (
              <div className="prod" key={p.id}>
                <div className="im"><img src={p.img} alt={p.n} loading="lazy" /></div>
                <p style={{ fontSize: 13, fontWeight: 600, margin: "14px 0 6px", minHeight: 38 }}>{p.n}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}><b style={{ fontSize: 20 }}>{brl(p.p)}</b><button className="cartbtn" aria-label={`Adicionar ${p.n}`} onClick={() => add(p.id)}><Ico d={I.cart} c="#fff" s={22} /></button></div>
                <div style={{ marginTop: 4 }}><Stars /> <small style={{ opacity: .6 }}>({p.r})</small></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap" style={{ padding: "46px 20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
          <h2 className="t"><em>Pet</em> petiscos</h2>
          <button className="ghost">Ver tudo ›</button>
        </div>
        <div className="circles">
          {treats.map((p) => (
            <div className="circ" key={p.id}>
              <div className="o"><img src={p.img} alt={p.n} loading="lazy" /></div>
              <p style={{ fontSize: 12.5, fontWeight: 600, margin: "10px auto 4px", maxWidth: 170 }}>{p.n}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}><b style={{ fontSize: 17, color: G }}>{brl(p.p)}</b><button className="cartbtn s" aria-label={`Adicionar ${p.n}`} onClick={() => add(p.id)}><Ico d={I.cart} s={20} /></button></div>
            </div>
          ))}
        </div>

        <div className="offer">
          <div style={{ display: "flex", alignItems: "flex-end", gap: 0, marginTop: -64, paddingLeft: 12 }}>
            <img src="/pet-pup2.webp" alt="Filhote golden" style={{ width: "52%", maxWidth: 300, display: "block" }} />
            <img src="/pet-bowl.webp" alt="Tigela de ração" style={{ width: "40%", maxWidth: 230, display: "block", marginBottom: 14 }} />
          </div>
          <div style={{ padding: "26px 30px 30px", textAlign: "center" }}>
            <h3>Oferta especial</h3>
            <div className="big">30% OFF</div>
            <p style={{ color: "#fff", fontFamily: "Fredoka", fontWeight: 500, fontSize: 21, margin: "6px 0 18px" }}>em ração premium</p>
            <button className="pill" style={{ background: CREAM, color: G, padding: "13px 30px" }} onClick={() => { go(best); }}>Comprar agora →</button>
          </div>
        </div>

        <div className="ben">
          {[["Entrega rápida e grátis", I.truck], ["Pagamento seguro", I.shield], ["Troca fácil", I.ret], ["Suporte 24h", I.head]].map(([t, d]) => (
            <div className="bn" key={t}><Ico d={d as string} s={34} />{t}</div>
          ))}
        </div>
      </section>

      <footer id="contato">
        <div className="wrap">
          <div className="fgrid">
            <div><div style={{ display: "flex", gap: 8, alignItems: "center", fontWeight: 800, fontSize: 20, fontStyle: "italic" }}><Paw c="#fff" s={30} />{brand || "Focinho Feliz"}</div></div>
            <div><h4>Informações</h4><a>Como funciona</a><a>Dicas de especialistas</a><a>Perguntas</a></div>
            <div><h4>Sobre nós</h4><a>Início</a><a>Sobre</a><a>Rações</a><a>Contato</a></div>
            <div><h4>Legal</h4><a>Termos de serviço</a><a>Privacidade</a><a>Trocas e devoluções</a></div>
            <div><h4>Contato</h4><a href={`https://wa.me/${num}`} target="_blank" rel="noopener noreferrer">WhatsApp</a><a>contato@seupet.com.br</a><a>{client?.city ? client.city : "Rua das Patinhas, 123"}</a></div>
          </div>
          <p style={{ textAlign: "center", fontSize: 12.5, opacity: .8, marginTop: 28 }}>© 2026 {brand || "Focinho Feliz"}. Todos os direitos reservados.</p>
        </div>
      </footer>

      {open && (
        <div className="drawer" onClick={() => setOpen(false)}>
          <aside className="panel" onClick={(e) => e.stopPropagation()} aria-label="Carrinho">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><b style={{ fontSize: 20 }}>{step === "done" ? "Pedido feito" : step === "pay" ? "Pagamento" : "Seu carrinho"}</b><button onClick={() => setOpen(false)} aria-label="Fechar" style={{ border: 0, background: "none", fontSize: 26, cursor: "pointer", minWidth: 44, minHeight: 44 }}>×</button></div>
            {step === "cart" && (<>
              <div style={{ flex: 1, overflow: "auto", marginTop: 10 }}>
                {count === 0 && <p style={{ opacity: .7 }}>Seu carrinho está vazio.</p>}
                {PRODUCTS.filter((p) => cart[p.id]).map((p) => (
                  <div key={p.id} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 0", borderBottom: "1px solid #eee" }}>
                    <img src={p.img} alt="" style={{ width: 54, height: 64, objectFit: "contain" }} />
                    <div style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>{p.n}<div style={{ color: G }}>{brl(p.p)}</div></div>
                    <div className="qty"><button onClick={() => dec(p.id)} aria-label="Menos">−</button>{cart[p.id]}<button onClick={() => add(p.id)} aria-label="Mais">+</button></div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 18, margin: "14px 0" }}><span>Total</span><span>{brl(sub)}</span></div>
              <button className="pill" disabled={count === 0} style={{ opacity: count === 0 ? .5 : 1, width: "100%" }} onClick={() => setStep("pay")}>Finalizar pedido</button>
            </>)}
            {step === "pay" && (<>
              <div style={{ flex: 1, marginTop: 14, display: "grid", gap: 10, alignContent: "start" }}>
                {["Nome completo", "Endereço de entrega", "WhatsApp"].map((l) => <input key={l} placeholder={l} aria-label={l} style={{ border: "1px solid #cfd8cc", borderRadius: 12, padding: "0 14px", minHeight: 48, fontSize: 15 }} />)}
                <div style={{ display: "flex", gap: 8 }}>{["Pix", "Cartão", "Na entrega"].map((m, i) => <label key={m} style={{ flex: 1, border: "1.5px solid #5d9a55", borderRadius: 12, padding: 12, textAlign: "center", fontSize: 13, fontWeight: 600 }}><input type="radio" name="pay" defaultChecked={i === 0} style={{ marginRight: 6 }} />{m}</label>)}</div>
                <p style={{ fontSize: 12, opacity: .6 }}>Exemplo de demonstração: nenhum pagamento é processado.</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 18, margin: "14px 0" }}><span>Total</span><span>{brl(sub)}</span></div>
              <button className="pill" style={{ width: "100%" }} onClick={() => setStep("done")}>Confirmar pedido</button>
            </>)}
            {step === "done" && (
              <div style={{ flex: 1, display: "grid", alignContent: "center", textAlign: "center", gap: 14 }}>
                <Paw c={G2} s={64} /><b style={{ fontSize: 22 }}>Pedido recebido!</b>
                <p style={{ fontSize: 14, opacity: .8 }}>Envie o resumo no WhatsApp para combinar a entrega.</p>
                <a className="pill" href={wa} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "inline-block", lineHeight: "20px" }}>Enviar no WhatsApp</a>
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
