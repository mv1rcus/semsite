import { useMemo, useState } from "react";

/** Loja online de farmácia densa, à risca do pin (DrugStore): topo com busca, menu, categorias laterais, banner, ofertas, destaques e vitrines por categoria. Verde-limão + branco, Ubuntu. */
const LIME = "#96d33f", LIMED = "#7fbf2b", BLUE = "#5fbbf5", INK = "#222", MU = "#7a7a7a", LN = "#e6e6e6";
type P = { id: string; n: string; p: number; old: number; img: string; st: number };
const PRODS: P[] = [
  { id: "p1", n: "Própolis em Gotas 30ml", p: 39.9, old: 49.9, img: "/fs-p1.webp", st: 4 },
  { id: "p2", n: "Cálcio + Vitamina D3", p: 54.9, old: 69.9, img: "/fs-p2.webp", st: 4 },
  { id: "p3", n: "Ômega 3 Cápsulas", p: 68.9, old: 89.9, img: "/fs-p3.webp", st: 5 },
  { id: "p4", n: "Fibras Prebiótico Sachê", p: 47.5, old: 0, img: "/fs-p4.webp", st: 4 },
  { id: "p5", n: "Xarope Mel e Própolis", p: 32.9, old: 38.9, img: "/fs-p5.webp", st: 4 },
  { id: "p6", n: "Creme Hidratante Corporal", p: 29.9, old: 0, img: "/fs-p6.webp", st: 5 },
  { id: "p7", n: "Multivitamínico Diário", p: 58.0, old: 72.0, img: "/fs-p7.webp", st: 4 },
  { id: "p8", n: "Colágeno Hidrolisado", p: 79.9, old: 99.9, img: "/fs-p8.webp", st: 5 },
  { id: "p9", n: "Chá Digestivo em Caixa", p: 18.9, old: 0, img: "/fs-p9.webp", st: 4 },
  { id: "p10", n: "Vitamina D em Gotas", p: 36.9, old: 44.9, img: "/fs-p10.webp", st: 4 },
  { id: "p11", n: "Eletrólitos Sachê (12un)", p: 41.9, old: 0, img: "/fs-p11.webp", st: 4 },
];
const byId = (id: string) => PRODS.find((x) => x.id === id)!;
const CATS = ["Bebê e criança", "Cosméticos", "Dieta e nutrição", "Presentes e especiais", "Casa e higiene", "Armário de remédios", "Produtos naturais", "Exclusivos", "Corredores da loja", "Cuidado pessoal", "Saúde sexual", "Por marca"];
const ROWS = [
  { cat: "Bebê e infantil", ids: ["p1", "p2", "p3"] },
  { cat: "Dieta e nutrição", ids: ["p7", "p5", "p10"] },
  { cat: "Produtos naturais", ids: ["p8", "p4", "p9"] },
];
const FEAT = ["p7", "p4", "p8"];
const SPEC = ["p11", "p6", "p3"];
const Stars = ({ n }: { n: number }) => (
  <span className="stars">{"★★★★★".split("").map((s, i) => <i key={i} style={{ color: i < n ? "#f6b924" : "#d8d8d8" }}>{s}</i>)}</span>
);
const Sv = ({ d, s = 22 }: { d: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden style={{ flex: "none" }}><path d={d} /></svg>
);
const DROP = "M12 2c4 5 7 8.5 7 12a7 7 0 0 1-14 0c0-3.5 3-7 7-12z";

export function FarmaciaSaviaFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Farmácia Sávia";
  const city = client?.city?.trim() || "Fortaleza";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [cart, setCart] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"entrega" | "retirada">("entrega");
  const [cust, setCust] = useState("");
  const [tab, setTab] = useState<Record<number, string>>({});
  const money = (v: number) => `R$ ${v.toFixed(2).replace(".", ",")}`;
  const items = useMemo(() => cart.map(byId), [cart]);
  const total = items.reduce((a, i) => a + i.p, 0);
  const add = (id: string) => { setCart((c) => [...c, id]); };
  const rm = (k: number) => setCart((c) => c.filter((_, i) => i !== k));
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero pedir na ${brand}${cust ? ` em nome de ${cust}` : ""}: ${items.map((i) => i.n).join(", ") || "itens a combinar"} (${mode === "entrega" ? "entrega" : "retirada no balcão"}; total estimado ${money(total)}).`)}`;
  const top = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const Card = ({ p }: { p: P }) => (
    <div className="pc">
      <span className="sale">oferta</span>
      <div className="pim"><img src={p.img} alt={p.n} /></div>
      <h4>{p.n}</h4>
      <div className="pr"><b>{money(p.p)}</b>{p.old > 0 && <s>{money(p.old)}</s>}</div>
      <Stars n={p.st} />
      <button className="add" onClick={() => add(p.id)}>Adicionar</button>
      <small><Sv d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z" s={11} /> Lista de desejos</small>
      <small><Sv d="M5 20V10M12 20V4M19 20v-7" s={11} /> Comparar produto</small>
    </div>
  );
  const Side = ({ ids, title }: { ids: string[]; title: string }) => (
    <div className="box">
      <div className="bh">{title}</div>
      {ids.map((id) => { const p = byId(id); return (
        <div className="sl" key={id}>
          <img src={p.img} alt={p.n} />
          <div><span>{p.n}</span><b>{money(p.p)}</b>{p.old > 0 && <s>{money(p.old)}</s>}<Stars n={p.st} /></div>
        </div>
      ); })}
      <div className="va"><a onClick={top}>Ver todos ›</a></div>
    </div>
  );

  return (
    <div className="fa" style={{ fontFamily: "Ubuntu, system-ui, sans-serif", color: INK, background: "#fff", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap');
        .fa *{box-sizing:border-box}
        .fa h1,.fa h2,.fa h3,.fa h4{font-family:Ubuntu,system-ui,sans-serif;font-weight:500;margin:0}
        .fa .wrap{max-width:940px;margin:0 auto;padding:0 20px}
        .fa .tb{display:flex;justify-content:space-between;padding:12px 0 0;font-size:12px;color:${MU}}
        .fa .hd{display:grid;grid-template-columns:230px 1fr 130px 170px 220px;gap:24px;align-items:center;padding:18px 0 22px}
        .fa .logo{display:flex;align-items:center;gap:8px;font-size:28px;font-weight:700;color:${LIME};letter-spacing:-.01em}
        .fa .srch{display:flex;border:2px solid ${LIME};height:36px}
        .fa .srch span{flex:1;padding:8px 10px;font-size:12px;color:#444;font-weight:500}
        .fa .srch b{background:${LIME};color:#fff;font-size:11px;font-weight:500;padding:0 18px;display:flex;align-items:center}
        .fa .hi{font-size:12px;line-height:1.35;color:${MU};cursor:pointer}.fa .hi strong{display:block;color:#333;font-weight:500;font-size:13px}
        .fa .ph{text-align:right;font-size:11px;color:${MU}}.fa .ph b{display:block;font-size:19px;color:#222;font-weight:500;margin-top:2px}
        .fa .nav{border-top:1px solid ${LN};border-bottom:1px solid ${LN};box-shadow:0 2px 4px rgba(0,0,0,.03)}
        .fa .nav .wrap{display:flex;align-items:center;gap:0}
        .fa .nav a{font-size:13px;font-weight:500;padding:19px 24px;border-left:1px solid ${LN};cursor:pointer}
        .fa .nav a:nth-child(3){border-right:1px solid ${LN}}
        .fa .nav .lg{margin-left:auto;color:${LIME};border-right:1px solid ${LN}}
        .fa .grid{display:grid;grid-template-columns:240px 1fr;gap:12px;margin-top:16px}
        .fa .box{border:1px solid ${LN};margin-bottom:12px}
        .fa .bh{background:${LIME};color:#fff;font-size:13px;font-weight:500;letter-spacing:.02em;padding:11px 14px;text-transform:uppercase}
        .fa .ct a{display:flex;justify-content:space-between;padding:11px 14px;font-size:12px;color:#666;border-bottom:1px solid #f0f0f0;cursor:pointer}
        .fa .ct a:last-child{border:0}
        .fa .soc2{display:flex;gap:8px;margin:18px 0 6px}.fa .soc2 a{width:26px;height:26px;border-radius:50%;background:#96d33f;display:flex;align-items:center;justify-content:center}
        .fa .bn{position:relative;aspect-ratio:2/1;background-color:#fff}
        .fa .ar{position:absolute;top:50%;transform:translateY(-50%);width:34px;height:52px;border:0;background:rgba(255,255,255,.75);color:#333;font-size:28px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center}.fa .ar.l{left:0}.fa .ar.r{right:0}.fa .ar:hover{background:#fff}
        .fa .promos{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:12px 0 16px}
        .fa .pm{aspect-ratio:1.43;color:#fff;text-align:center;padding:16px;display:flex;flex-direction:column;justify-content:center;align-items:center;cursor:pointer}
        .fa .pm h3{font-size:24px;font-weight:400;line-height:1.1}
        .fa .pm h2{font-size:46px;font-weight:500;line-height:1.05;letter-spacing:-.02em}
        .fa .pm p{margin:4px 0 0;font-size:11px;opacity:.95}
        .fa .sl{display:grid;grid-template-columns:70px 1fr;gap:12px;align-items:center;padding:20px 12px;border-bottom:1px solid #f0f0f0;font-size:12px}
        .fa .sl img{width:70px;height:70px;object-fit:contain}
        .fa .sl span{display:block;margin-bottom:3px}.fa .sl b{font-weight:700;font-size:13px;margin-right:6px}
        .fa .sl s,.fa .pr s{color:#aaa;font-size:10px}
        .fa .va{padding:14px 12px;text-align:right}.fa .va a{display:inline-block;border:1px solid ${LN};padding:7px 12px;font-size:11px;color:#555;cursor:pointer}
        .fa .stars{display:block;font-size:11px;letter-spacing:1px;margin-top:3px}.fa .stars i{font-style:normal}
        .fa .row{display:grid;grid-template-columns:42px 1fr;border:1px solid ${LN};margin-bottom:22px}
        .fa .vt{writing-mode:vertical-rl;transform:rotate(180deg);text-align:center;font-weight:500;font-size:12px;text-transform:uppercase;letter-spacing:.04em;border-left:1px solid ${LN};background:#fafafa;padding:14px 0}
        .fa .tabs{display:flex;gap:16px;padding:12px 18px;border-bottom:1px solid ${LN};font-size:11px;color:#555}
        .fa .tabs b{font-weight:500;color:#222;cursor:pointer}.fa .tabs span{cursor:pointer}.fa .tabs .on{color:${LIME}}
        .fa .pcs{display:grid;grid-template-columns:repeat(3,1fr)}
        .fa .pc{position:relative;padding:28px 14px 32px;text-align:center;border-right:1px solid #f0f0f0;font-size:11px}
        .fa .pc:last-child{border:0}
        .fa .sale{position:absolute;left:14px;top:14px;background:${BLUE};color:#fff;font-size:10px;padding:2px 6px;z-index:1}
        .fa .pim{height:196px;display:flex;align-items:center;justify-content:center}.fa .pim img{max-height:196px;max-width:196px;object-fit:contain}
        .fa .pc h4{font-size:11px;font-weight:500;color:#444;margin:10px 0 5px;line-height:1.35}
        .fa .pr b{font-size:13px;font-weight:700;margin-right:5px}
        .fa .add{margin:10px 0 8px;background:${LIME};color:#fff;border:0;padding:8px 18px;font:500 10px Ubuntu,system-ui,sans-serif;letter-spacing:.04em;text-transform:uppercase;cursor:pointer}
        .fa .add:hover{background:${LIMED}}
        .fa .pc small{display:flex;align-items:center;justify-content:center;gap:4px;color:#888;font-size:10px;margin-top:3px}
        .fa .vall{padding:12px 18px 14px;text-align:right}.fa .vall a{display:inline-block;border:1px solid ${LN};padding:7px 12px;font-size:11px;color:#555;cursor:pointer}
        .fa .bar{background:${LIME};color:#fff;margin-top:34px;padding:34px 0}
        .fa .bar .wrap{display:grid;grid-template-columns:repeat(3,1fr);gap:30px}
        .fa .bar h3{font-size:15px;font-weight:500;text-transform:uppercase;margin-bottom:8px;display:flex;align-items:center;gap:12px}
        .fa .bar p{margin:0;font-size:11px;line-height:1.55;opacity:.95}
        .fa .ft{padding:56px 0 40px}
        .fa .fg{display:grid;grid-template-columns:repeat(5,1fr);gap:24px;font-size:11px;color:#777}
        .fa .fg h4{font-size:12px;color:#222;font-weight:700;margin-bottom:14px}
        .fa .fg a{display:block;margin-bottom:9px;cursor:pointer}
        .fa .cp{border-top:1px solid ${LN};margin-top:24px;padding-top:16px;font-size:10px;color:#999;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
        .fa .ov{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:60;display:flex;align-items:center;justify-content:center;padding:16px}
        .fa .mdl{background:#fff;width:100%;max-width:440px;max-height:90vh;overflow:auto;padding:26px;position:relative}
        .fa .mdl h2{font-size:22px}.fa .x{position:absolute;right:14px;top:12px;background:0;border:0;font-size:18px;cursor:pointer}
        .fa .ci{display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid #eee;font-size:13px}
        .fa .ci img{width:42px;height:42px;object-fit:contain}.fa .ci span{flex:1}.fa .ci u{cursor:pointer;color:#c33;font-size:11px}
        .fa .modes{display:flex;gap:8px;margin:14px 0}.fa .modes button{flex:1;padding:10px;border:1px solid ${LN};background:#fff;font:400 12px Ubuntu,system-ui,sans-serif;cursor:pointer}
        .fa .modes .on{border-color:${LIME};background:#f4fbe8}
        .fa .in{width:100%;padding:11px;border:1px solid ${LN};font:400 13px Ubuntu,system-ui,sans-serif;margin-bottom:12px}
        .fa .go{display:block;text-align:center;background:${LIME};color:#fff;border:0;padding:12px;font:500 12px Ubuntu,system-ui,sans-serif;text-transform:uppercase;letter-spacing:.04em;width:100%;cursor:pointer;text-decoration:none}
        .fa .tot{display:flex;justify-content:space-between;padding:12px 0;font-weight:500}
        .fa .mob{display:none}
        @media(max-width:1000px){
          .fa .hd{grid-template-columns:1fr 1fr;gap:14px}.fa .srch{grid-column:1/-1;order:5}.fa .ph{display:none}
          .fa .grid{grid-template-columns:1fr}.fa .ct{display:none}.fa .side{display:none}.fa .mob{display:block}
          .fa .tb span:first-child{display:none}.fa .tb{justify-content:flex-end}.fa .bn{aspect-ratio:auto;height:190px}.fa .pm{aspect-ratio:auto;min-height:120px}.fa .promos{grid-template-columns:1fr}.fa .pm h2{font-size:38px}
          .fa .nav a{padding:14px 12px;font-size:12px}.fa .nav .lg{display:none}
          .fa .pim{height:120px}.fa .pim img{max-height:120px;max-width:100%}.fa .pcs{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}.fa .pc:nth-child(2n){border-right:0}.fa .pc:nth-child(3){display:none}
          .fa .bar .wrap{grid-template-columns:1fr;gap:20px}.fa .fg{grid-template-columns:1fr 1fr}
        }
      `}</style>

      <div className="wrap">
        <div className="tb"><span>Português ▾ &nbsp; R$ Real ▾</span><span>Todos os dias, 8h às 19h &nbsp; <b style={{ color: "#222", fontWeight: 500, fontSize: 16 }}>{phone ? `(${phone.slice(-11, -9)}) ${phone.slice(-9, -4)}-${phone.slice(-4)}` : "0800 234 5678"}</b></span></div>
        <div className="hd">
          <div className="logo"><svg width="26" height="30" viewBox="0 0 24 24" fill={LIME}><path d={DROP} /></svg><span>{brand.replace("Farmácia ", "")}<span style={{ color: "#555", fontWeight: 400 }}>Farma</span></span></div>
          <div className="srch"><span>Buscar</span><b>BUSCAR</b></div>
          <div className="hi"><strong>Lista de desejos</strong>0 itens</div>
          <div className="hi" onClick={() => setOpen(true)}><strong>Carrinho: {money(total)}</strong>{cart.length} {cart.length === 1 ? "item" : "itens"}</div>
        </div>
      </div>
      <div className="nav">
        <div className="wrap">
          <a onClick={top}>Início</a><a onClick={() => setOpen(true)}>Minha conta</a><a onClick={() => setOpen(true)}>Carrinho</a><a onClick={() => setOpen(true)}>Finalizar</a>
          <a className="lg" onClick={() => setOpen(true)}>Entrar</a>
        </div>
      </div>

      <div className="wrap grid">
        <aside>
          <div className="box ct"><div className="bh">Categorias</div>{CATS.map((c, i) => <a key={c}>{c}{i === 1 && <span>›</span>}</a>)}</div>
          <div className="side">
            <Side ids={FEAT} title="Destaques" />
            <Side ids={SPEC} title="Ofertas" />
          </div>
        </aside>
        <main>
          <div className="bn" style={{ background: 'url("/fs-banner.webp") center/cover no-repeat' }} role="img" aria-label="Rosto com folha de bananeira"><button className="ar l" aria-label="Anterior" onClick={() => setOpen(true)}>‹</button><button className="ar r" aria-label="Próximo" onClick={() => setOpen(true)}>›</button></div>
          <div className="promos">
            <div className="pm" style={{ background: LIME }} onClick={() => setOpen(true)}><h3>Oferta especial</h3><h2>10% OFF</h2><p>NO PAGAMENTO PELO CARTÃO DE CRÉDITO</p></div>
            <div className="pm" style={{ background: BLUE }} onClick={() => setOpen(true)}><h3>Frete grátis</h3><p style={{ fontSize: 15, margin: "2px 0 8px" }}>em pedidos acima de R$ 99</p><p>Oferta válida em todos os produtos da loja.</p></div>
          </div>
          {ROWS.map((r, k) => {
            const t = tab[k] || "Novos";
            return (
              <div className="row" key={r.cat}>
                <div className="vt">{r.cat}</div>
                <div>
                  <div className="tabs">{["Novos", "Destaques", "Ofertas"].map((n) => <span key={n} className={t === n ? "on" : ""} onClick={() => setTab({ ...tab, [k]: n })}>{n}</span>)}</div>
                  <div className="pcs">{(t === "Novos" ? r.ids : [...r.ids].reverse()).map((id) => <Card key={id + t} p={byId(id)} />)}</div>
                  <div className="vall"><a onClick={top}>Ver todos ›</a></div>
                </div>
              </div>
            );
          })}
        </main>
      </div>

      <section className="bar">
        <div className="wrap">
          <div><h3><Sv d="M1 5h13v11H1zM14 9h5l4 4v3h-9zM6 19a2 2 0 1 0 0-.01M18 19a2 2 0 1 0 0-.01" s={26} />Entrega rápida e grátis</h3><p>Entendemos os nossos produtos e estamos comprometidos em entregar o seu pedido com rapidez.</p></div>
          <div><h3><Sv d="M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4" s={26} />Pagamento seguro</h3><p>Oferecemos compras online com uma variedade de formas de pagamento seguras.</p></div>
          <div><h3><Sv d="M2 5h20v14H2zM2 10h20" s={26} />100% do dinheiro de volta</h3><p>Você pode devolver ou trocar o produto em até cinco dias a partir da data em que o recebeu.</p></div>
        </div>
      </section>

      <footer className="ft">
        <div className="wrap">
          <div className="fg">
            <div><h4>Informações</h4><a>Sobre nós</a><a>Informações de entrega</a><a>Política de privacidade</a><a>Termos e condições</a></div>
            <div><h4>Atendimento</h4><a>Fale conosco</a><a>Devoluções</a><a>Mapa do site</a></div>
            <div><h4>Extras</h4><a>Marcas</a><a>Vale-presente</a><a>Afiliados</a><a>Ofertas</a></div>
            <div><h4>Minha conta</h4><a>Minha conta</a><a>Histórico de pedidos</a><a>Lista de desejos</a><a>Newsletter</a></div>
            <div><h4>Contato</h4><a>Rua das Acácias, 450, {city}</a><a>{phone ? `+${num}` : "0800 234 5678"}</a><a>Todos os dias, 8h às 19h</a></div>
          </div>
          <div className="soc2">{[["f","M14 9h3V5h-3c-2.2 0-4 1.8-4 4v2H7v4h3v6h4v-6h3l1-4h-4V9z"],["t","M22 5.800c-.700.300-1.500.600-2.400.700.900-.500 1.500-1.300 1.800-2.300-.800.500-1.700.800-2.600 1a4.100 4.100 0 0 0-7 3.700C8.400 8.700 5.400 7.100 3.400 4.600c-1 1.800-.500 4.100 1.200 5.300-.700 0-1.300-.200-1.900-.500 0 2 1.400 3.700 3.300 4.100-.600.200-1.200.200-1.900.1.500 1.600 2 2.800 3.800 2.800A8.300 8.300 0 0 1 2 18.500a11.700 11.700 0 0 0 6.300 1.800c7.600 0 11.800-6.300 11.800-11.800v-.5c.800-.6 1.500-1.300 1.900-2.200z"],["i","M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"]].map(([k, d]) => <a key={k} aria-label="Rede social"><svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d={d} /></svg></a>)}</div>
          <div className="cp"><span>{brand} © 2026 · Foto ilustrativa</span><span>Site de demonstração SemSite</span></div>
        </div>
      </footer>

      {open && (
        <div className="ov" onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div className="mdl">
            <button className="x" onClick={() => setOpen(false)}>✕</button>
            <h2>Seu carrinho</h2>
            <div style={{ marginTop: 12 }}>
              {items.length === 0 && <p style={{ fontSize: 13, color: MU }}>Carrinho vazio. Use "Adicionar" nos produtos ou chame direto no WhatsApp.</p>}
              {items.map((i, k) => (<div className="ci" key={k}><img src={i.img} alt="" /><span>{i.n}</span><b>{money(i.p)}</b><u onClick={() => rm(k)}>remover</u></div>))}
            </div>
            <div className="modes">
              <button className={mode === "entrega" ? "on" : ""} onClick={() => setMode("entrega")}>Entrega</button>
              <button className={mode === "retirada" ? "on" : ""} onClick={() => setMode("retirada")}>Retirar no balcão</button>
            </div>
            <input className="in" placeholder="Seu nome" value={cust} onChange={(e) => setCust(e.target.value)} />
            <div className="tot"><span>Total estimado</span><span>{money(total)}</span></div>
            <a className="go" href={wa} target="_blank" rel="noopener noreferrer">Enviar pedido no WhatsApp</a>
          </div>
        </div>
      )}
    </div>
  );
}
