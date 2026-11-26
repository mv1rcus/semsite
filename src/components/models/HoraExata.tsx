import { useEffect, useState } from "react";

/** Relojoaria a partir do pin "OPND" (desktop): hero preto com relogio e aneis de especificacao, corte diagonal com card branco, faixa escura, promocoes com foto sobreposta e assinatura. */
const IM = {
  hero: "/hx-hero.webp", sport: "/hx-sport.webp", crono: "/hx-crono.webp",
  pulso: "/hx-pulso.webp", dourado: "/hx-dourado.webp", fivela: "/hx-fivela.webp",
};
const NAV: [string, string][] = [["Coleção", "colecao"], ["Mergulho", "mergulho"], ["Oficina", "oficina"], ["Promoções", "promo"], ["Contato", "assine"]];
type W = { n: string; l: string; mm: number; atm: number; img: string; pos: string; alt: string };
const WATCHES: W[] = [
  { n: "NOIR", l: "Esqueleto automático, couro preto", mm: 42, atm: 5, img: IM.hero, pos: "50% 48%", alt: "Relógio automático preto com mecanismo dourado aparente e pulseira de couro preto" },
  { n: "ABISSO", l: "Mergulhador, borracha preta", mm: 44, atm: 20, img: IM.sport, pos: "50% 50%", alt: "Relógio de mergulho preto com gotas de água e ponteiros luminosos" },
  { n: "CRONO 3", l: "Cronógrafo, aço e couro café", mm: 41, atm: 10, img: IM.crono, pos: "48% 50%", alt: "Cronógrafo de aço com mostrador preto e pulseira de couro marrom sobre uma mesa de madeira" },
  { n: "AURUM", l: "Dourado, malha milanesa", mm: 36, atm: 3, img: IM.dourado, pos: "50% 52%", alt: "Relógio dourado de mostrador preto com pulseira de malha" },
  { n: "FIVELA", l: "Clássico minimalista, couro", mm: 40, atm: 5, img: IM.fivela, pos: "50% 50%", alt: "Relógio de mostrador preto liso com pulseira de couro marrom e fivela de aço" },
];
const PROMO = [
  { t: "CRONÓGRAFO CLÁSSICO", b: "Aço escovado, três subdials e corda automática. Na Hora Exata ele vem revisado, com ajuste de pulseira na hora e garantia de dois anos.", img: IM.pulso, pos: "30% 50%", alt: "Punho com cronógrafo de aço em preto e branco" },
  { t: "LINHA DOURADA", b: "Caixa dourada fina e pulseira de malha ajustável sem ferramenta. Vai bem com roupa social e com camiseta.", img: IM.dourado, pos: "50% 50%", alt: "Relógio dourado sobre veludo preto" },
  { t: "COURO ARTESANAL", b: "Pulseiras de couro curtido, costura à mão e troca sem custo no primeiro mês, se o tamanho não servir.", img: IM.fivela, pos: "50% 50%", alt: "Pulseira de couro marrom com fivela de aço" },
];
const BUL = ["Caixa de aço com vidro de safira", "Ponteiros e índices luminosos", "Resistência à água até 200 m"];
const Ic = () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden><rect x="8" y="3" width="8" height="18" rx="4" /><path d="M12 7v3" /></svg>;
const Ring = ({ v, u }: { v: number; u: string }) => (
  <span className="rg"><svg viewBox="0 0 64 64" aria-hidden><circle cx="32" cy="32" r="29" fill="none" stroke="#f3d77a" strokeWidth="2.4" strokeDasharray="130 60" transform="rotate(-70 32 32)" /></svg><b>{v}</b><i>{u}</i></span>
);

export function HoraExata({ client }: { client?: { name?: string; city?: string; whatsapp?: string } }) {
  const brand = client?.name?.trim() || "Hora Exata";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const city = client?.city || "São Paulo";
  const [i, setI] = useState(0);
  const [p, setP] = useState(0);
  const [menu, setMenu] = useState(false);
  const [toast, setToast] = useState("");
  const [f, setF] = useState({ n: "", e: "", t: "" });
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(""), 2200); return () => clearTimeout(t); }, [toast]);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const wa = (t: string) => `https://wa.me/${num}?text=${encodeURIComponent(t)}`;
  const w = WATCHES[i] as W;
  const pr = PROMO[p] as (typeof PROMO)[number];
  const send = () => {
    if (!f.n.trim() || !/\S+@\S+\.\S+/.test(f.e) || f.t.replace(/\D/g, "").length < 10) { setToast("Preencha nome, e-mail e telefone"); return; }
    setToast("Cadastro recebido. O voucher chega por e-mail."); setF({ n: "", e: "", t: "" });
  };
  return (
    <div className="hx" id="top">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600&family=Open+Sans:wght@300;400;600&display=swap');
        .hx{background:#fff;color:#2b2b2b;font-family:'Open Sans',Arial,sans-serif;font-weight:400;font-size:15px;line-height:1.65;overflow-x:hidden}
        .hx h1,.hx h2,.hx h3,.hx .lg,.hx .bt{font-family:'Montserrat',Arial,sans-serif;text-transform:uppercase}
        .hx .toast{position:fixed;left:50%;bottom:26px;transform:translateX(-50%);background:#111;color:#fff;padding:11px 18px;font-size:13px;z-index:60}
        .hx .hero{background:radial-gradient(120% 90% at 30% 20%,#2a2a2d,#111 55%,#08080a);color:#fff;position:relative;min-height:640px;padding-bottom:70px}
        .hx nav{display:flex;justify-content:space-between;align-items:center;padding:28px 88px}
        .hx .lg{font-weight:600;font-size:20px;letter-spacing:.14em;color:#fff;text-decoration:none}
        .hx .links{display:flex;gap:30px}.hx .links a{color:#d9d9d9;text-decoration:none;font-size:12px;letter-spacing:.14em;text-transform:uppercase;cursor:pointer}
        .hx .links a:hover{color:#f3d77a}
        .hx .burger{width:38px;height:38px;border-radius:50%;background:#fff;color:#111;border:0;display:none;place-items:center;cursor:pointer}
        .hx .mob{display:none}
        .hx .hb{display:grid;grid-template-columns:70px 340px 1fr;gap:34px;align-items:center;padding:46px 88px 0;max-width:1240px;margin:0 auto}
        .hx .ctl{display:flex;flex-direction:column;align-items:center;gap:14px;font-size:10px;letter-spacing:.18em;color:#bdbdbd}
        .hx .ctl button{background:none;border:0;color:#fff;cursor:pointer;padding:2px}
        .hx .ctl .cur{width:22px;height:22px;border-radius:50%;border:5px solid #f3d77a;box-sizing:border-box}
        .hx .ctl .dt{width:8px;height:8px;border-radius:50%;border:1.5px solid #666;background:none;padding:0;cursor:pointer}.hx .ctl .dt.on{border-color:#f3d77a;background:#f3d77a}
        .hx .ctl .ln{width:1px;height:26px;background:#666}
        .hx .wi{height:540px;position:relative;-webkit-mask-image:radial-gradient(ellipse 52% 58% at 50% 50%,#000 40%,transparent 100%);mask-image:radial-gradient(ellipse 52% 58% at 50% 50%,#000 40%,transparent 100%)}
        .hx .wi img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
        .hx .ht{padding-left:20px}
        .hx .ht .rule{width:150px;height:3px;background:#fff;margin:0 auto}
        .hx h1{font-weight:600;font-size:36px;letter-spacing:.1em;text-align:center;margin:18px 0 18px;line-height:1.15}
        .hx .sub{color:#8c8c8c;font-family:'Montserrat',Arial,sans-serif;font-weight:600;font-size:15px;letter-spacing:.14em;text-transform:uppercase;margin:30px 0 24px}
        .hx .spec{display:flex;align-items:center;gap:24px;margin-bottom:28px}
        .hx .spec:before,.hx .spec:after{content:"";height:1px;background:#f3d77a;flex:1;max-width:80px}.hx .spec:after{max-width:90px}
        .hx .rg{position:relative;width:60px;height:60px;display:grid;place-items:center;text-align:center;line-height:1}
        .hx .rg svg{position:absolute;inset:0;width:100%;height:100%}.hx .rg b{font-size:15px;font-weight:600;display:block}.hx .rg i{font-style:normal;font-size:9px;color:#aaa;margin-top:-18px;display:block;position:absolute;bottom:14px}
        .hx .rg b{position:absolute;top:17px}
        .hx .mi{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#8c8c8c}.hx .mi a{color:#f3d77a;font-weight:600;text-decoration:none;cursor:pointer}
        .hx .dg{position:relative;background:#111;color:#fff}
        .hx .dg:before{content:"";position:absolute;left:0;right:0;top:-1px;height:120px;background:#111;clip-path:polygon(0 0,100% 0,100% 100%,0 0)}
        .hx .cut{position:relative;display:grid;grid-template-columns:1fr 1fr;min-height:580px;margin-top:-82px;background:#fff}
        .hx .cut:before{content:"";position:absolute;inset:0;background:#111;clip-path:polygon(0 0,100% 0,100% 0,0 100%);z-index:0;display:none}
        .hx .cl{position:relative;overflow:hidden;background:#000;min-height:580px;clip-path:polygon(0 0,100% 80px,100% 100%,0 100%)}
        .hx .cl img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:60% 50%;opacity:.85}
        .hx .cr{background:#fff;position:relative;clip-path:polygon(0 80px,100% 0,100% 100%,0 100%);margin-left:-1px}
        .hx .cr:after{content:"";position:absolute;right:0;top:0;bottom:0;width:36%;background:#fce38a;z-index:0}
        .hx .card{position:absolute;z-index:3;left:calc(50% - 215px);top:96px;width:400px;background:#fff;box-shadow:0 20px 60px rgba(0,0,0,.28);color:#2b2b2b;padding:70px 44px 40px}
        .hx .ic{position:absolute;left:50%;top:-40px;transform:translateX(-50%);width:80px;height:80px;border-radius:50%;background:#fff;display:grid;place-items:center}
        .hx .ic span{width:62px;height:62px;border-radius:50%;background:#111;color:#f3d77a;display:grid;place-items:center}
        .hx .card h2{font-weight:500;font-size:22px;letter-spacing:.04em;margin:0 0 14px;line-height:1.25}.hx .card h2 b{font-weight:600}
        .hx .card p{font-size:13.5px;color:#555;margin:0 0 20px}
        .hx .card hr{border:0;border-top:3px solid #111;width:120px;margin:0 0 22px}
        .hx .card ul{list-style:none;margin:0 0 26px;padding:0;font-size:13px;color:#333}.hx .card li{display:flex;gap:12px;align-items:center;margin-bottom:10px}.hx .card li:before{content:"";width:9px;height:9px;border-radius:50%;border:3px solid #111;flex:none}
        .hx .bt{display:block;width:100%;background:#111;color:#fff;border:0;padding:14px;font-size:11.5px;font-weight:600;letter-spacing:.14em;cursor:pointer;text-align:center;text-decoration:none}
        .hx .bt:hover{background:#333}
        .hx .band{background:#000;color:#fff;display:grid;grid-template-columns:1fr 1.6fr;min-height:340px;align-items:center;margin-top:0}
        .hx .band .tx{padding:40px 70px}.hx .band .tx h3{font-weight:500;font-size:18px;letter-spacing:.18em;margin:0 0 14px}.hx .band .tx p{font-size:13px;color:#bbb;max-width:300px;margin:0}
        .hx .band .ph{height:340px;position:relative;overflow:hidden}.hx .band .ph img{width:100%;height:100%;object-fit:cover;object-position:50% 45%;display:block;opacity:.9}
        .hx .band .ph:before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#000,transparent 40%);z-index:1}
        .hx .pm{display:grid;grid-template-columns:420px 1fr;gap:20px;max-width:1160px;margin:0 auto;padding:90px 40px 40px;align-items:center}
        .hx .pm .rl{writing-mode:vertical-rl;transform:rotate(180deg);font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:#777;position:absolute;left:30px;top:130px;display:none}
        .hx .pm h2{font-weight:600;font-size:28px;letter-spacing:.06em;margin:0 0 18px;line-height:1.2;border-bottom:3px solid #111;padding-bottom:16px;display:inline-block}
        .hx .pm p{color:#555;margin:0 0 24px;max-width:340px;font-size:14px}
        .hx .pm .bt{display:inline-block;width:auto;padding:14px 36px}
        .hx .pf{position:relative;height:420px}
        .hx .pf:before{content:"";position:absolute;left:0;top:50px;width:150px;height:200px;background:#111}.hx .pf:after{content:"";position:absolute;right:0;bottom:0;width:280px;height:80px;background:#fce38a}
        .hx .pf .im{position:absolute;left:46px;top:0;right:46px;bottom:40px;overflow:hidden;z-index:1}.hx .pf .im img{width:100%;height:100%;object-fit:cover;display:block}
        .hx .pg{display:flex;justify-content:space-between;align-items:center;font-size:12px;letter-spacing:.08em;max-width:1160px;margin:0 auto;padding:0 40px 30px 40px}
        .hx .pg span{white-space:nowrap}.hx .pg b{font-weight:600}.hx .pg .ar{display:flex;gap:10px;align-items:center}.hx .pg button{background:none;border:0;cursor:pointer;font-size:16px;color:#333;padding:2px 6px}
        .hx .sb{max-width:960px;margin:60px auto 0;padding:0 40px}
        .hx .sbt{border:1px solid #333;border-right:0;border-bottom:0;padding:26px 24px 22px;width:min(520px,100%);box-sizing:border-box}
        .hx .sbt h2{font-weight:600;font-size:34px;letter-spacing:.04em;margin:0;line-height:1.15}.hx .sbt h2 span{font-weight:400}.hx .sbt p{color:#555;font-size:16px;margin:6px 0 0;font-weight:300}
        .hx .fm{display:grid;grid-template-columns:repeat(3,1fr);gap:30px;border-top:1px solid #333;margin-top:54px;padding-top:24px}
        .hx .fm input{width:100%;border:0;border-bottom:1px solid #333;padding:10px 0;font:inherit;font-size:14px;background:none;outline:none;box-sizing:border-box}
        .hx .fm input:focus{border-color:#c9a500}
        .hx .sbb{margin-top:24px}
        .hx footer{max-width:960px;margin:44px auto 0;padding:26px 40px 34px;border-top:1px solid #333;text-align:center;font-size:11px;letter-spacing:.06em;color:#333}
        .hx footer .fl{display:flex;gap:24px;justify-content:center;margin:18px 0 8px;text-transform:uppercase;letter-spacing:.1em;flex-wrap:wrap}
        .hx footer a{color:#333;text-decoration:none;cursor:pointer}
        @media(max-width:960px){
          .hx nav{padding:20px 22px}.hx .links{display:none}.hx .burger{display:grid}
          .hx .mob{display:flex;flex-direction:column;position:absolute;z-index:6;left:14px;right:14px;top:70px;background:#fff;padding:10px}.hx .mob a{padding:12px 10px;color:#111;text-decoration:none;font-size:13px;letter-spacing:.12em;text-transform:uppercase}
          .hx .hero{min-height:0;padding-bottom:50px}
          .hx .hb{grid-template-columns:1fr;padding:10px 22px 0;gap:6px}
          .hx .ctl{flex-direction:row;justify-content:center;order:3;margin-top:14px}.hx .ctl .ln{width:26px;height:1px}.hx .ctl .ar{transform:rotate(-90deg)}
          .hx .wi{height:320px;order:1}.hx .ht{padding:0;order:2}
          .hx h1{font-size:28px}.hx .sub{text-align:center;font-size:12.5px;margin:14px 0 18px}.hx .spec{justify-content:center}.hx .mi{text-align:center}
          .hx .cut{grid-template-columns:1fr;margin-top:0;min-height:0}
          .hx .cl{min-height:260px;clip-path:polygon(0 0,100% 40px,100% 100%,0 100%)}
          .hx .cr{clip-path:none;padding:0 20px 40px;margin:0}.hx .cr:after{width:30%}
          .hx .card{position:relative;left:auto;top:auto;width:auto;margin-top:-20px;padding:62px 24px 28px;z-index:3}
          .hx .band{grid-template-columns:1fr}.hx .band .tx{padding:34px 22px}.hx .band .ph{height:240px}
          .hx .pm{grid-template-columns:1fr;padding:60px 22px 20px;gap:30px}.hx .pf{height:320px}
          .hx .pg{padding:0 22px 20px}
          .hx .sb{padding:0 22px;margin-top:40px}.hx .sbt h2{font-size:26px}.hx .fm{grid-template-columns:1fr;gap:16px}
          .hx footer{padding:22px}
        }
      `}</style>

      <header className="hero">
        <nav>
          <a className="lg" href="#top">{brand.toUpperCase()}</a>
          <div className="links">{NAV.map(([l, id]) => <a key={id} onClick={() => go(id)}>{l}</a>)}</div>
          <button className="burger" aria-label="Abrir menu" onClick={() => setMenu(!menu)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M4 7h16M4 12h16M4 17h16" /></svg></button>
          {menu && <div className="mob">{NAV.map(([l, id]) => <a key={id} onClick={() => go(id)}>{l}</a>)}</div>}
        </nav>
        <div className="hb" id="colecao">
          <div className="ctl">
            <button aria-label="Relógio anterior" className="ar" onClick={() => setI((i + WATCHES.length - 1) % WATCHES.length)}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M5 15l7-7 7 7" /></svg></button>
            <button aria-label="Próximo relógio" className="ar" onClick={() => setI((i + 1) % WATCHES.length)}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M5 9l7 7 7-7" /></svg></button>
            <span>{String(i + 1).padStart(2, "0")}/{String(WATCHES.length).padStart(2, "0")}</span>
            <span className="cur" />
            <span className="ln" />
            {WATCHES.slice(1).map((_, k) => <button key={k} className="dt" aria-label={`Ver relógio ${k + 2}`} onClick={() => setI((i + k + 1) % WATCHES.length)} />)}
          </div>
          <div className="wi"><img src={w.img} alt={w.alt} style={{ objectPosition: w.pos }} /></div>
          <div className="ht">
            <div className="rule" />
            <h1>{w.n}</h1>
            <div className="rule" />
            <div className="sub">{w.l}</div>
            <div className="spec"><Ring v={w.mm} u="mm" /><Ring v={w.atm} u="ATM" /></div>
            <div className="mi">Veja <a href={wa(`Oi! Quero saber mais sobre o relógio ${w.n}.`)} target="_blank" rel="noreferrer">mais detalhes</a></div>
          </div>
        </div>
      </header>

      <section className="dg cut" id="mergulho">
        <div className="cl"><img src={IM.sport} alt="Relógio de mergulho preto coberto de gotas de água" /></div>
        <div className="cr" />
        <div className="card">
          <div className="ic"><span><Ic /></span></div>
          <h2>LINHA <b>ABISSO</b></h2>
          <p>Feito para quem não tira o relógio nem para mergulhar. Caixa reforçada, bisel giratório e ponteiros que brilham no escuro.</p>
          <hr />
          <ul>{BUL.map((b) => <li key={b}>{b}</li>)}</ul>
          <a className="bt" href={wa("Oi! Quero conhecer a linha Abisso.")} target="_blank" rel="noreferrer">Ver a linha</a>
        </div>
      </section>

      <section className="band" id="oficina">
        <div className="tx"><h3>OFICINA PRÓPRIA</h3><p>Troca de bateria, vedação, polimento e revisão completa de relógios mecânicos. Tudo feito aqui em {city}, com peças originais.</p></div>
        <div className="ph"><img src={IM.crono} alt="Cronógrafo de aço sobre mesa de madeira ao lado de um livro antigo" /></div>
      </section>

      <section className="pm" id="promo">
        <div>
          <h2>{pr.t}</h2>
          <p>{pr.b}</p>
          <a className="bt" href={wa(`Oi! Vi a promoção ${pr.t.toLowerCase()} e quero saber mais.`)} target="_blank" rel="noreferrer">Quero saber mais</a>
        </div>
        <div className="pf"><div className="im"><img src={pr.img} alt={pr.alt} style={{ objectPosition: pr.pos }} /></div></div>
      </section>
      <div className="pg">
        <span><b>{pr.t}</b> · promoção do mês</span>
        <span className="ar"><button aria-label="Promoção anterior" onClick={() => setP((p + PROMO.length - 1) % PROMO.length)}>‹</button><b>{p + 1}</b> / {PROMO.length}<button aria-label="Próxima promoção" onClick={() => setP((p + 1) % PROMO.length)}>›</button></span>
      </div>

      <section className="sb" id="assine">
        <div className="sbt"><h2>ASSINE <span>HOJE</span></h2><p>Cadastre-se e receba um voucher de 10% na primeira compra.</p></div>
        <div className="fm">
          <input aria-label="Seu nome" placeholder="Seu nome" value={f.n} onChange={(e) => setF({ ...f, n: e.target.value })} />
          <input aria-label="Seu e-mail" placeholder="Seu e-mail" type="email" value={f.e} onChange={(e) => setF({ ...f, e: e.target.value })} />
          <input aria-label="Seu telefone" placeholder="Seu telefone" type="tel" value={f.t} onChange={(e) => setF({ ...f, t: e.target.value })} />
        </div>
        <button className="bt sbb" onClick={send}>Quero meu voucher</button>
      </section>

      <footer>
        <div>© 2026 <b>{brand.toUpperCase()}</b>. Todos os direitos reservados.</div>
        <div className="fl"><a onClick={() => go("top")}>Política de privacidade</a><a onClick={() => go("top")}>Termos de uso</a><a href={wa("Oi! Quero falar com a Hora Exata.")} target="_blank" rel="noreferrer">Fale conosco</a></div>
        <div>{city}</div>
      </footer>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
