import { useEffect, useState } from "react";

/** Livraria independente nova, construida a partir de um pin cinza-bege com titulo gigante em sans, estante 3D e cards escuros numerados. Reserva de livros com retirada que fecha no WhatsApp. */
const NAVY = "#1b2030", BG = "#e5e2db", BG2 = "#f1efea", ORG = "#e0502a", MUT = "#4a4f5c";
const BOOKS = [
  { n: "O Que a Maré Deixou", a: "Helena Duarte", p: 54.9, img: "/livro-b1.webp", c: "Romance" },
  { n: "Cartas para o Sul", a: "Rafael Moura", p: 49.9, img: "/livro-b2.webp", c: "Crônicas" },
  { n: "A Lua de Terracota", a: "Iara Campos", p: 62.9, img: "/livro-b3.webp", c: "Fantasia" },
  { n: "Jardim de Dentro", a: "Bia Nogueira", p: 44.9, img: "/livro-b4.webp", c: "Poesia" },
];
const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const Stars = () => (<span aria-label="5 estrelas" style={{ color: ORG, letterSpacing: 2, fontSize: 13 }}>★★★★★</span>);

export function LivroFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Folha Corrida";
  const city = client?.city?.trim() || "Porto Alegre";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [cart, setCart] = useState<Record<number, number>>({});
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [name, setName] = useState("");
  const [mode, setMode] = useState("Retirar na livraria");
  const [added, setAdded] = useState<number | null>(null);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Todos");
  const [sc, setSc] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const add = (i: number) => { setCart((c) => ({ ...c, [i]: (c[i] ?? 0) + 1 })); setAdded(i); setTimeout(() => setAdded(null), 1200); };
  const qty = (i: number, d: number) => setCart((c) => { const n = (c[i] ?? 0) + d; const o = { ...c }; if (n <= 0) delete o[i]; else o[i] = n; return o; });
  const items = Object.entries(cart).map(([k, n]) => ({ i: Number(k), q: n, it: BOOKS[Number(k)]! }));
  const count = items.reduce((a, x) => a + x.q, 0);
  const total = items.reduce((a, x) => a + x.q * x.it.p, 0);
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero reservar na ${brand}: ${items.map((x) => `${x.q}x ${x.it.n}`).join(", ")}. Total ${brl(total)}. ${mode}.${name ? ` Em nome de ${name}.` : ""}`)}`;
  const cats = ["Todos", "Romance", "Crônicas", "Fantasia", "Poesia"];
  const shown = BOOKS.map((b, i) => ({ b, i })).filter(({ b }) => (cat === "Todos" || b.c === cat) && (!q.trim() || (b.n + " " + b.a).toLowerCase().includes(q.trim().toLowerCase())));

  return (
    <div className="lv" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: NAVY, background: BG, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700&display=swap');
        .lv *{box-sizing:border-box}.lv a,.lv button,.lv input{font-family:inherit}
        .lv .wrap{max-width:1200px;margin:0 auto;padding:0 28px}
        .lv .bg{font-family:'Bricolage Grotesque',system-ui,sans-serif}
        .lv .nav{display:flex;align-items:center;gap:30px;height:88px}
        .lv .logo{font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:26px;letter-spacing:-.5px;white-space:nowrap}
        .lv .logo i{font-style:normal;color:${ORG}}
        .lv .srch{flex:1;max-width:520px;display:flex;align-items:center;background:${BG2};border-radius:10px;padding:0 16px;min-height:48px}
        .lv .srch input{flex:1;border:0;background:none;font-size:15px;min-width:0;color:${NAVY};outline:none}
        .lv .links{display:flex;gap:30px;font-size:15px;font-weight:500;margin-left:auto}.lv .links a{cursor:pointer}
        .lv .cartb{position:relative;width:48px;height:48px;border-radius:50%;background:${NAVY};border:0;cursor:pointer;display:grid;place-items:center}
        .lv .cartb b{position:absolute;right:-4px;top:-4px;min-width:20px;height:20px;border-radius:10px;background:${ORG};color:#fff;font-size:11.5px;display:grid;place-items:center;padding:0 5px}
        .lv .burger{display:none;background:none;border:0;width:44px;height:44px;cursor:pointer}
        .lv .btn{background:${NAVY};color:#fff;border:0;border-radius:8px;padding:0 30px;min-height:54px;font-weight:600;font-size:14.5px;letter-spacing:.5px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:10px;text-decoration:none}
        .lv .btn.o{background:transparent;color:${NAVY};border:1.5px solid ${NAVY}}
        .lv .btn.or{background:${ORG}}
        .lv .hero{display:grid;grid-template-columns:1.1fr 1fr;gap:40px;align-items:center;padding:40px 28px 60px;min-height:620px}
        .lv .hero h1{font-family:'Bricolage Grotesque',sans-serif;font-weight:600;font-size:clamp(58px,8vw,112px);line-height:.96;letter-spacing:-3px;margin:0}
        .lv .hero p{font-size:17px;line-height:1.6;color:${MUT};margin:26px 0 34px;max-width:420px}
        .lv .hero .im{position:relative;display:flex;justify-content:center}
        .lv .hero .im img{width:min(100%,460px);aspect-ratio:4/5;object-fit:cover;border-radius:24px;display:block}
        .lv .hero .im .tag{position:absolute;left:0;bottom:30px;background:${NAVY};color:#fff;border-radius:14px;padding:16px 20px;font-size:13.5px}.lv .hero .im .tag b{display:block;font-family:'Bricolage Grotesque',sans-serif;font-size:24px;margin-bottom:2px}
        .lv .sec{padding:100px 0}
        .lv .sec.d{background:${NAVY};color:#fff}
        .lv h2{font-family:'Bricolage Grotesque',sans-serif;font-weight:600;font-size:clamp(32px,3.6vw,48px);letter-spacing:-1.2px;margin:0;line-height:1.05}
        .lv .head{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;flex-wrap:wrap;margin-bottom:34px}
        .lv .chips{display:flex;gap:8px;flex-wrap:wrap}
        .lv .chip{border:1.5px solid ${NAVY};background:none;border-radius:999px;padding:0 18px;min-height:44px;font-size:14.5px;font-weight:500;cursor:pointer;color:${NAVY}}
        .lv .chip.on{background:${NAVY};color:#fff}
        .lv .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:22px}
        .lv .bk{background:${NAVY};color:#fff;border-radius:16px;overflow:hidden;position:relative;display:flex;flex-direction:column}
        .lv .bk .num{position:absolute;right:16px;top:12px;font-family:'Bricolage Grotesque',sans-serif;font-size:44px;font-weight:700;color:rgba(27,32,48,.3);line-height:1}
        .lv .bk .cv{background:#dcd9d2;aspect-ratio:3/4}.lv .bk .cv img{width:100%;height:100%;object-fit:cover;display:block}
        .lv .bk .tx{padding:18px 20px 8px;flex:1}
        .lv .bk h3{font-family:'Bricolage Grotesque',sans-serif;font-size:21px;font-weight:600;margin:6px 0 4px;line-height:1.15;min-height:2.3em}
        .lv .bk .au{color:#c1c7d8;font-size:14.5px}
        .lv .bk .pr{display:flex;justify-content:space-between;align-items:center;margin-top:10px;font-weight:600;font-size:18px}
        .lv .bk .ad{margin:12px 20px 20px;background:#f1efea;color:${NAVY};border:0;border-radius:8px;min-height:48px;font-weight:600;font-size:14px;cursor:pointer}
        .lv .split{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
        .lv .split img{width:100%;height:440px;object-fit:cover;border-radius:24px;display:block}
        .lv .split p{font-size:17px;line-height:1.7;color:#c4c8d8;margin:20px 0 28px;max-width:440px}
        .lv .tabs3{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
        .lv .tabs3 div{background:${BG2};border-radius:16px;padding:28px}.lv .tabs3 b{display:block;font-family:'Bricolage Grotesque',sans-serif;font-size:22px;margin-bottom:8px}.lv .tabs3 span{color:${MUT};font-size:15.5px;line-height:1.6}
        .lv footer{background:${NAVY};color:#fff;padding:64px 0 36px}
        .lv .fg{display:grid;grid-template-columns:1.4fr 1fr 1fr 1.4fr;gap:40px}
        .lv footer h5{font-size:13px;letter-spacing:2px;text-transform:uppercase;margin:0 0 16px;color:#c1c7d8;font-weight:600}
        .lv footer a{display:block;cursor:pointer;color:#e8eaf3;font-size:15px;margin-bottom:10px}
        .lv .nl{display:flex;background:#fff;border-radius:8px;overflow:hidden}.lv .nl input{flex:1;border:0;padding:0 14px;min-height:50px;font-size:14.5px;min-width:0}.lv .nl a{background:${ORG};color:#fff;display:grid;place-items:center;padding:0 18px;margin:0}
        .lv .fl{position:fixed;right:18px;bottom:18px;z-index:40;background:${ORG};color:#fff;border:0;border-radius:999px;padding:0 24px;min-height:52px;font-weight:600;font-size:14.5px;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,.25)}
        .lv .ov{position:fixed;inset:0;background:rgba(27,32,48,.55);z-index:60}
        .lv .dw{position:fixed;right:0;top:0;bottom:0;width:min(440px,100%);background:${BG2};z-index:61;padding:30px 28px;overflow:auto}
        .lv .dw h3{font-family:'Bricolage Grotesque',sans-serif;font-size:30px;margin:0 0 4px}
        .lv .x{position:absolute;right:12px;top:10px;width:44px;height:44px;border:0;background:none;font-size:28px;cursor:pointer}
        .lv .li{display:flex;gap:14px;align-items:center;padding:14px 0;border-bottom:1px solid #d6d3cc}.lv .li img{width:52px;height:70px;object-fit:cover;border-radius:6px}
        .lv .qn{display:inline-flex;align-items:center;gap:10px;border:1px solid #cfccc4;border-radius:8px;padding:0 4px;margin-top:6px}.lv .qn button{width:32px;height:32px;border:0;background:none;font-size:18px;cursor:pointer}
        .lv .chp{padding:12px 6px;border:1px solid #cfccc4;border-radius:8px;background:#fff;cursor:pointer;font-size:14px;text-align:center;min-height:46px}.lv .chp.on{background:${NAVY};color:#fff;border-color:${NAVY}}
        .lv input.f{width:100%;margin-top:14px;padding:14px 16px;border:1px solid #cfccc4;border-radius:8px;font-size:15px;background:#fff}
        .lv .mob{display:none}
        @media(max-width:860px){
          .lv .srch,.lv .links{display:none}.lv .burger{display:block;margin-left:auto}.lv .nav{height:72px;gap:12px}.lv .logo{font-size:23px}
          .lv .hero{grid-template-columns:1fr;gap:30px;padding:24px 22px 50px;min-height:0}.lv .hero h1{letter-spacing:-2px}.lv .hero .im .tag{left:10px}
          .lv .sec{padding:56px 0}.lv .grid{grid-template-columns:repeat(2,1fr);gap:14px}.lv .bk h3{font-size:17px}.lv .bk .ad{margin:10px 14px 16px}.lv .bk .tx{padding:14px 14px 4px}
          .lv .split{grid-template-columns:1fr;gap:30px}.lv .split img{height:280px}.lv .tabs3{grid-template-columns:1fr}.lv .fg{grid-template-columns:1fr 1fr}
          .lv .mob{display:block;background:${BG2};margin:0 16px 10px;border-radius:12px;box-shadow:0 8px 24px rgba(27,32,48,.15)}.lv .mob a{display:block;padding:15px 20px;font-size:16px;cursor:pointer;border-top:1px solid #dcd9d2}
        }
      `}</style>
      <div className="wrap nav">
        <div className="logo">{brand}<i>.</i></div>
        <label className="srch"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.500-3.500" /></svg><input aria-label="Buscar livro" placeholder="Buscar por título ou autor" value={q} onChange={(e) => { setQ(e.target.value); go("livros"); }} style={{ marginLeft: 10 }} /></label>
        <nav className="links"><a onClick={() => go("livros")}>Livros</a><a onClick={() => go("clube")}>Clube</a><a onClick={() => go("loja")}>A loja</a><a onClick={() => go("contato")}>Contato</a></nav>
        <button type="button" className="cartb" aria-label="Abrir sacola" onClick={() => setOpen(true)}>
          <svg width="22" height="22" viewBox="0 0 26 26" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round"><path d="M5 9h16l-1.500 13h-13zM9 9V7a4 4 0 0 1 8 0v2" /></svg>{count > 0 && <b>{count}</b>}</button>
        <button type="button" className="burger" aria-label="Menu" onClick={() => setMenu((m) => !m)}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="1.8"><path d="M4 8h16M4 16h16" /></svg></button>
      </div>
      {menu && <div className="mob"><a onClick={() => go("livros")}>Livros</a><a onClick={() => go("clube")}>Clube</a><a onClick={() => go("loja")}>A loja</a><a onClick={() => go("contato")}>Contato</a></div>}

      <div className="wrap hero">
        <div>
          <h1>Ache seu próximo livro favorito.</h1>
          <p>Livraria independente em {city}. Curadoria da casa, conversa de balcão e reserva pelo WhatsApp para retirar sem pressa.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button type="button" className="btn" onClick={() => go("livros")}>Ver os livros</button>
            <button type="button" className="btn o" onClick={() => go("clube")}>Clube de leitura</button>
          </div>
        </div>
        <div className="im"><img src="/livro-hero.webp" alt="Estante de madeira com livros de capas coloridas" /><div className="tag"><b>+1.200</b>títulos na casa</div></div>
      </div>

      <section className="sec" id="livros"><div className="wrap">
        <div className="head"><h2>Livros do mês</h2>
          <div className="chips">{cats.map((c) => (<button key={c} type="button" className={`chip${cat === c ? " on" : ""}`} onClick={() => setCat(c)}>{c}</button>))}</div></div>
        {shown.length === 0 ? <p style={{ color: MUT }}>Nenhum livro encontrado. Chame no WhatsApp que a gente procura.</p> : (
          <div className="grid">
            {shown.map(({ b, i }) => (
              <div className="bk" key={b.n}>
                <span className="num">0{i + 1}</span>
                <div className="cv"><img src={b.img} alt={`Capa de ${b.n}`} loading="lazy" /></div>
                <div className="tx"><Stars /><h3>{b.n}</h3><div className="au">{b.a}</div><div className="pr"><span>{brl(b.p)}</span></div></div>
                <button type="button" className="ad" onClick={() => add(i)}>{added === i ? "Reservado ✓" : "Reservar"}</button>
              </div>
            ))}
          </div>)}
      </div></section>

      <section className="sec d" id="clube"><div className="wrap split">
        <div>
          <h2>Clube de leitura da casa</h2>
          <p>Um livro por mês, escolhido pela equipe, com desconto para sócios e encontro mensal na livraria. Café incluso.</p>
          <a className="btn or" href={`https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero entrar no clube de leitura da ${brand}.`)}`} target="_blank" rel="noreferrer">Entrar no clube</a>
        </div>
        <img src="/livro-int.webp" alt="Interior da livraria com estantes de madeira" loading="lazy" id="loja" />
      </div></section>

      <section className="sec"><div className="wrap tabs3">
        <div><b>Reserva sem compromisso</b><span>Separamos o livro por 3 dias. Você passa e retira quando puder.</span></div>
        <div><b>Entrega em {city}</b><span>Mandamos por moto na cidade, em até um dia útil.</span></div>
        <div><b>Embrulho de presente</b><span>Papel kraft e um bilhete escrito à mão, sem custo.</span></div>
      </div></section>

      <footer id="contato"><div className="wrap fg">
        <div><div className="logo">{brand}<i>.</i></div><p style={{ color: "#c1c7d8", fontSize: 14.5, lineHeight: 1.7, marginTop: 14 }}>Rua da República, 410, Cidade Baixa, {city}.<br />Seg a sáb, 10h às 20h.</p></div>
        <div><h5>Livraria</h5><a onClick={() => go("livros")}>Livros</a><a onClick={() => go("clube")}>Clube</a><a onClick={() => setOpen(true)}>Sacola</a></div>
        <div><h5>Ajuda</h5><a onClick={() => go("loja")}>A loja</a><a onClick={() => go("contato")}>Contato</a></div>
        <div><h5>Novidades</h5><div className="nl"><input placeholder="Seu WhatsApp" aria-label="Seu WhatsApp" /><a href={`https://wa.me/${num}?text=${encodeURIComponent("Oi! Quero receber os lançamentos.")}`} target="_blank" rel="noreferrer" aria-label="Enviar">→</a></div><p style={{ color: "#c1c7d8", fontSize: 13.5, marginTop: 14 }}>Instagram @{brand.toLowerCase().replace(/[^a-z]/g, "")}</p></div>
      </div></footer>

      {sc && count === 0 && <button type="button" className="fl" onClick={() => go("livros")}>Ver os livros</button>}
      {sc && count > 0 && <button type="button" className="fl" onClick={() => setOpen(true)}>Sacola · {count} · {brl(total)}</button>}

      {open && (<>
        <div className="ov" onClick={() => setOpen(false)} />
        <aside className="dw" role="dialog" aria-label="Sua sacola">
          <button type="button" className="x" aria-label="Fechar" onClick={() => setOpen(false)}>×</button>
          <h3>Sua sacola</h3>
          <span style={{ color: MUT, fontSize: 14 }}>{count === 0 ? "Nada reservado ainda" : `${count} ${count === 1 ? "livro" : "livros"}`}</span>
          {count === 0 ? (
            <div style={{ margin: "34px 0", textAlign: "center" }}><p style={{ color: MUT }}>Escolha um livro para reservar.</p><button type="button" className="btn" onClick={() => { setOpen(false); go("livros"); }}>Ver os livros</button></div>
          ) : (<>
            {items.map((x) => (
              <div className="li" key={x.i}><img src={x.it.img} alt="" />
                <div style={{ flex: 1 }}><b style={{ fontSize: 15 }}>{x.it.n}</b><div style={{ color: MUT, fontSize: 13.5 }}>{x.it.a}</div><div style={{ fontWeight: 700 }}>{brl(x.it.p)}</div>
                  <div className="qn"><button type="button" aria-label="Menos" onClick={() => qty(x.i, -1)}>−</button><span>{x.q}</span><button type="button" aria-label="Mais" onClick={() => qty(x.i, 1)}>+</button></div></div></div>
            ))}
            <div style={{ marginTop: 20, fontSize: 12.5, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700 }}>Como receber</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>{["Retirar na livraria", `Entrega em ${city}`].map((m) => (<button key={m} type="button" className={`chp${mode === m ? " on" : ""}`} onClick={() => setMode(m)}>{m}</button>))}</div>
            <input className="f" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} aria-label="Seu nome" />
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 20, borderTop: "1px solid #d6d3cc", paddingTop: 12, marginTop: 20 }}><span>Total</span><span>{brl(total)}</span></div>
            <a className="btn or" style={{ width: "100%", marginTop: 16 }} href={wa} target="_blank" rel="noreferrer">Reservar pelo WhatsApp</a>
          </>)}
        </aside>
      </>)}
    </div>
  );
}
