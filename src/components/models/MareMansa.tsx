import { useEffect, useState } from "react";

/** Passeios de stand up paddle a partir do pin "SUP-bordy" (desktop 06): hero arredondado com foto, 4 motivos com numeros grandes, galeria em mosaico, depoimentos, pranchas, roteiros e newsletter. */
const IM = {
  hero: "/mm-1.webp", grupo: "/mm-2.webp", bruços: "/mm-3.webp", remador: "/mm-4.webp",
  sol: "/mm-5.webp", baia: "/mm-6.webp", dupla: "/mm-7.webp", yoga: "/mm-8.webp", riso: "/mm-9.webp", pranchas: "/mm-10.webp",
};
const NAV: [string, string][] = [["Sobre o SUP", "sobre"], ["Galeria", "galeria"], ["Roteiros", "roteiros"], ["Depoimentos", "depoimentos"], ["Contato", "contato"]];
const WHY = [
  { n: "01", t: "Segurança", d: "Risco mínimo de queda, com colete e instrutor ao lado." },
  { n: "02", t: "Atividade", d: "Queima de 300 a 500 kcal por hora, sem sentir." },
  { n: "03", t: "Saúde", d: "Fortalece o coração, as pernas e melhora a postura." },
  { n: "04", t: "Novas emoções", d: "Dá pra ir com criança, com cachorro, com a família." },
];
const PLACES = ["Todos", "Lagoa da Conceição", "Baía Norte", "Jurerê", "Campeche"];
const GAL = [
  { img: IM.bruços, tag: "Jurerê", c: "g1", pos: "50% 50%" },
  { img: IM.remador, tag: "Lagoa da Conceição", c: "g2", pos: "50% 40%" },
  { img: IM.baia, tag: "Baía Norte", c: "g3", pos: "50% 30%" },
  { img: IM.sol, tag: "Campeche", c: "g4", pos: "50% 60%" },
  { img: IM.dupla, tag: "Jurerê", c: "g5", pos: "30% 50%" },
  { img: IM.grupo, tag: "Campeche", c: "g6", pos: "20% 40%" },
  { img: IM.hero, tag: "Baía Norte", c: "g7", pos: "62% 60%" },
];
const OPIN = [
  { n: "Nádia Cardoso", t: "Gostei tanto que quero voltar já. Quem acha que não consegue, tente: o instrutor segura a prancha, a gente sobe sem medo e as emoções são incríveis. Fomos no fim da tarde, vale demais.", p: "Baía Norte, passeio no pôr do sol" },
  { n: "Vitória Prado", t: "Ótimo passeio em família! Dá pra remar com os filhos pequenos, o ritmo é calmo e eles amaram ver as garças de perto. O instrutor explicou tudo com paciência. Foi o melhor dia das férias.", p: "Lagoa da Conceição, passeio na lagoa" },
  { n: "Helena Moura", t: "Descobri um esporte novo este ano. Na primeira aula já fiquei em pé e dei até uma remada sozinha. Equilíbrio, calma e uma vista que não dá pra descrever. Já fiz SUP yoga também.", p: "Campeche, aula de SUP yoga" },
];
const BOARDS = ["Turquesa 11'2\"", "Rosa 11'2\"", "Azul 12'6\"", "Verde 12'6\""];
const ROUTES = [
  { n: "Remada guiada", p: 120, img: IM.baia, pos: "50% 35%" },
  { n: "Pôr do sol no mar", p: 140, img: IM.sol, pos: "50% 60%" },
  { n: "Passeio pela orla", p: 150, img: IM.dupla, pos: "30% 50%" },
  { n: "Passeio a dois", p: 180, img: IM.hero, pos: "50% 70%" },
  { n: "Dia de lagoa", p: 200, img: IM.remador, pos: "50% 45%" },
  { n: "SUP yoga", p: 100, img: IM.yoga, pos: "50% 45%" },
];
const Ic = ({ d }: { d: string }) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>;
const Pin = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 21s-7-6.2-7-11.2A7 7 0 0 1 19 9.8C19 14.800 12 21 12 21Z" /><circle cx="12" cy="10" r="2.500" /></svg>;


export function MareMansa({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Maré Mansa SUP";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const city = client?.city || "Florianópolis";
  const [menu, setMenu] = useState(false);
  const [place, setPlace] = useState("Todos");
  const [toast, setToast] = useState("");
  const [ok, setOk] = useState(true);
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(""), 2000); return () => clearTimeout(t); }, [toast]);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const wa = (t: string) => `https://wa.me/${num}?text=${encodeURIComponent(t)}`;
  const gal = GAL.filter((g) => place === "Todos" || g.tag === place).map((g) => (place === "Todos" ? g : { ...g, c: "gx" }));
  return (
    <div className="mm" id="top">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap');
        .mm{background:#fff;color:#27424a;font-family:'Roboto',Arial,sans-serif;font-weight:400;overflow-x:hidden;font-size:16px;line-height:1.6;padding:0 0 28px}
        .mm *{box-sizing:border-box}.mm a,.mm button,.mm input{font-family:inherit}.mm a,.mm button{cursor:pointer}
        .mm h1,.mm h2,.mm h3{font-family:'Roboto',Arial,sans-serif;font-weight:400;margin:0}
        .mm .w{max-width:1200px;margin:0 auto;padding:0 28px}
        .mm .hero{position:relative;margin:28px auto 0;max-width:1200px;border-radius:20px;overflow:hidden;min-height:720px;color:#fff;width:calc(100% - 56px)}
        .mm .hero>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 80%}
        .mm .hero:before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(180deg,rgba(18,70,90,.5) 0,rgba(18,70,90,.12) 40%,rgba(8,40,56,.0) 62%,rgba(8,40,56,.45) 100%)}
        .mm .z{position:relative;z-index:2}
        .mm nav{display:flex;align-items:center;justify-content:space-between;padding:20px 34px}
        .mm .logo{font-size:18px;color:#fff;text-decoration:none;font-weight:500;letter-spacing:0}
        .mm .links{display:flex;gap:34px;align-items:center}.mm .links a{color:#fff;text-decoration:none;font-size:14px;opacity:.95}
        .mm .ghost{border:1px solid rgba(255,255,255,.85);color:#fff;background:transparent;border-radius:4px;padding:8px 16px;font-size:13px;text-decoration:none}
        .mm .burger{display:none;background:rgba(255,255,255,.2);backdrop-filter:blur(8px);border:0;color:#fff;border-radius:10px;width:42px;height:42px}
        .mm .hc{padding:64px 40px 0}
        .mm .hc p{margin:0 0 6px;font-size:22px;font-weight:300;letter-spacing:.02em}
        .mm .hc h1{font-size:60px;line-height:1.05;letter-spacing:-.01em;text-transform:uppercase;max-width:470px;text-wrap:balance}
        .mm .feat{position:absolute;left:0;right:0;bottom:0;z-index:2;display:flex;gap:46px;padding:0 40px 34px}
        .mm .feat div{display:flex;gap:12px;align-items:center;font-size:13px;line-height:1.35;max-width:190px;color:#fff}
        .mm .sec{padding:84px 0 0}
        .mm .why{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:start}
        .mm .why h2{font-size:17px;font-weight:500;text-transform:uppercase;letter-spacing:.02em;color:#2a4650;padding-top:10px}
        .mm .why p{margin:0;font-size:14px;line-height:1.65;max-width:520px}.mm .why p b{font-weight:400;color:#19b8bd}
        .mm .nums{display:grid;grid-template-columns:1fr 330px;gap:60px;align-items:center;margin-top:60px}
        .mm .grid4{display:grid;grid-template-columns:1fr 1fr;position:relative}
        .mm .grid4:before{content:"";position:absolute;left:50%;top:0;bottom:0;border-left:1px solid #d8dfe1}
        .mm .grid4:after{content:"";position:absolute;top:50%;left:0;right:0;border-top:1px solid #d8dfe1}
        .mm .nm{display:flex;gap:6px;align-items:center;padding:38px 20px;min-height:190px}
        .mm .nm i{font-style:normal;font-size:104px;line-height:1;font-weight:300;color:#d5f0f1;letter-spacing:-.03em;margin-right:-16px;flex:none}
        .mm .nm div{position:relative}.mm .nm h3{font-size:16px;font-weight:500;color:#2a4650}.mm .nm p{margin:2px 0 0;font-size:12.5px;line-height:1.45;max-width:170px}
        .mm .ph{border-radius:18px;overflow:hidden;aspect-ratio:3/4;position:relative}.mm .ph img{width:100%;height:100%;object-fit:cover;object-position:35% 50%;display:block}
        .mm .st{font-size:17px;font-weight:500;text-transform:uppercase;letter-spacing:.02em;color:#2a4650;margin:0 0 22px}
        .mm .tabs{display:flex;gap:26px;flex-wrap:wrap;justify-content:center;margin:0 0 22px}
        .mm .tabs button{background:none;border:0;padding:4px 0;font-size:13px;color:#4c6870;border-bottom:1px solid transparent}.mm .tabs button.on{color:#16a5aa;border-color:#16a5aa;font-weight:500}
        .mm .mos{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:170px;gap:12px;grid-auto-flow:dense}
        .mm .mos figure{margin:0;border-radius:14px;overflow:hidden;background:#dcecef}.mm .mos img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s}.mm .mos figure:hover img{transform:scale(1.04)}
        .mm .g1{grid-column:span 2;grid-row:span 2}.mm .g2{grid-row:span 2}.mm .g3{grid-row:span 1}.mm .g4{grid-column:span 2}.mm .g5{grid-row:span 1}.mm .g6,.mm .g7{grid-row:span 1}
        .mm .op{position:relative;margin-top:84px;padding:46px 0 46px}
        .mm .op:before{content:"";position:absolute;left:0;top:0;bottom:0;width:62%;background:#d9f0f1;border-radius:0 24px 24px 0}
        .mm .ops{position:relative;display:grid;grid-template-columns:repeat(3,1fr);gap:26px;max-width:1200px;margin:0 auto;padding:0 28px 0 90px}
        .mm .oc{background:#fff;border-radius:14px;padding:30px 26px 24px;box-shadow:0 8px 30px rgba(30,80,90,.1);display:flex;flex-direction:column;gap:16px}
        .mm .oc h3{font-size:14px;font-weight:500;text-align:center;color:#2a4650}.mm .oc p{margin:0;font-size:13px;line-height:1.6;text-align:center;flex:1}
        .mm .oc span{display:flex;gap:8px;align-items:center;font-size:12px;color:#4c6870;border-top:1px solid #eef2f3;padding-top:14px}.mm .oc svg{color:#16a5aa;flex:none}
        .mm .bf{max-width:400px;margin:6px auto 0}.mm .bf img{width:100%;display:block;border-radius:16px;aspect-ratio:3/4;object-fit:cover}.mm .bl{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:12px;text-align:center;font-size:12px;color:#2a4650}
        .mm .bd{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:6px}
        .mm .bd div{text-align:center;font-size:12.5px;color:#2a4650;letter-spacing:.01em}.mm .bd .bi{height:260px;margin:0 auto 12px;width:64px}
        .mm .rt{display:grid;grid-template-columns:repeat(3,1fr);gap:26px 22px}
        .mm .rc{text-align:center}.mm .rc .ri{aspect-ratio:4/3;border-radius:16px;overflow:hidden;margin-bottom:12px}.mm .rc img{width:100%;height:100%;object-fit:cover;display:block}
        .mm .rc h3{font-size:16px;font-weight:400;color:#2a4650}.mm .rc p{margin:2px 0 10px;font-size:13px;color:#6b8188}
        .mm .rc a{display:inline-block;border:1px solid #9fb3b8;border-radius:4px;padding:6px 20px;font-size:13px;color:#2a4650;text-decoration:none;background:#fff}
        .mm .nl{display:grid;grid-template-columns:330px 1fr;margin-top:90px;align-items:center}
        .mm .nlc{background:#d9f0f1;border-radius:20px;padding:34px 28px;position:relative;z-index:1;margin:0 -2px 0 0}
        .mm .nlc h2{font-size:16px;font-weight:400;text-transform:uppercase;text-align:center;line-height:1.35;color:#2a4650;text-wrap:balance}
        .mm .nlc p{font-size:12px;text-align:center;margin:18px 0 20px;line-height:1.5}
        .mm .nlc input[type=text],.mm .nlc input[type=tel]{width:100%;border:0;border-bottom:1px solid #9bb9be;background:transparent;padding:9px 2px;font-size:12px;margin-bottom:12px;outline:none;color:#27424a}
        .mm .chk{display:flex;gap:8px;font-size:9.5px;line-height:1.4;color:#5c747b;margin:4px 0 20px}
        .mm .chk i{flex:none;width:14px;height:14px;border:1px solid #16a5aa;border-radius:3px;display:grid;place-items:center;color:#16a5aa;font-style:normal;font-size:10px;cursor:pointer}
        .mm .sub{display:block;margin:0 auto;background:#1cc5c9;border:0;color:#fff;border-radius:4px;padding:10px 26px;font-size:13px}
        .mm .nlp{border-radius:0 18px 18px 0;overflow:hidden;height:330px;margin:12px 0}.mm .nlp img{width:100%;height:100%;object-fit:cover;display:block;object-position:50% 50%}
        .mm footer{margin:44px auto 0;max-width:1200px;width:calc(100% - 56px);background:#d9f0f1;border-radius:18px;padding:32px 36px;display:grid;grid-template-columns:1.1fr 1fr 1fr 1.4fr;gap:26px;font-size:12.5px;line-height:2}
        .mm footer a{display:block;color:#2a4650;text-decoration:none}.mm footer .ad{text-align:right;line-height:1.7}
        .mm .toast{position:fixed;left:50%;bottom:26px;transform:translateX(-50%);background:#16363e;color:#fff;border-radius:10px;padding:11px 18px;font-size:13px;z-index:50}
        .mm .mob{display:none}
        @media(max-width:960px){
          .mm .w{padding:0 20px}.mm .hero{width:calc(100% - 28px);margin-top:14px;min-height:640px;border-radius:18px}
          .mm .links,.mm nav>.ghost{display:none}.mm .burger{display:grid;place-items:center}
          .mm .mob{display:flex;flex-direction:column;gap:4px;position:absolute;z-index:5;left:14px;right:14px;top:70px;background:#fff;border-radius:14px;padding:12px;box-shadow:0 18px 44px rgba(0,0,0,.2)}
          .mm .mob a{padding:11px 10px;color:#27424a;text-decoration:none;font-size:15px;border-radius:8px}
          .mm nav{padding:16px 18px}.mm .hc{padding:46px 22px 0}.mm .hc p{font-size:18px}.mm .hc h1{font-size:40px}
          .mm .feat{flex-direction:column;gap:12px;padding:0 22px 26px}.mm .feat div{max-width:none}
          .mm .sec{padding-top:60px}.mm .why{grid-template-columns:1fr;gap:12px}
          .mm .nums{grid-template-columns:1fr;gap:28px}.mm .nm{padding:22px 8px;min-height:150px}.mm .nm i{font-size:74px;margin-right:-24px}.mm .nm p{font-size:12px}
          .mm .ph{aspect-ratio:4/3}
          .mm .mos{grid-template-columns:repeat(2,1fr);grid-auto-rows:130px}.mm .g1{grid-column:span 2;grid-row:span 2}.mm .g4{grid-column:span 2}
          .mm .op:before{width:100%;border-radius:0}.mm .op{margin-top:60px}
          .mm .ops{grid-template-columns:1fr;padding:0 20px}
          .mm .bd{grid-template-columns:repeat(2,1fr);gap:22px 12px}.mm .bd .bi{height:200px;width:50px}
          .mm .rt{grid-template-columns:1fr 1fr;gap:20px 12px}.mm .rc h3{font-size:15px}.mm .rc a{padding:6px 14px}
          .mm .nl{grid-template-columns:1fr;margin-top:60px}.mm .nlc{margin:0 0 -26px;border-radius:20px}.mm .nlp{border-radius:18px;min-height:260px;padding-top:0}.mm .nlp img{margin-top:0}
          .mm footer{grid-template-columns:1fr 1fr;width:calc(100% - 28px);padding:26px 22px}.mm footer .ad{text-align:left;grid-column:span 2}
        }
      `}</style>

      <header className="hero">
        <img src={IM.hero} alt="Casal sorrindo remando sentado numa prancha de stand up paddle em águas calmas" />
        <nav className="z">
          <a className="logo" href="#top" onClick={(e) => { e.preventDefault(); go("top"); }}>{brand}</a>
          <div className="links">
            {NAV.map(([l, id]) => <a key={l} href={`#${id}`} onClick={(e) => { e.preventDefault(); go(id); }}>{l}</a>)}
            <a className="ghost" href={wa(`Oi! Quero reservar um passeio de SUP com a ${brand}.`)} target="_blank" rel="noreferrer">Ligue pra mim</a>
          </div>
          <button className="burger" aria-label="Abrir menu" onClick={() => setMenu(!menu)}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.800" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg></button>
        </nav>
        {menu && <div className="mob">{NAV.map(([l, id]) => <a key={l} href={`#${id}`} onClick={(e) => { e.preventDefault(); go(id); }}>{l}</a>)}</div>}
        <div className="hc z">
          <p>Passeios inesquecíveis</p>
          <h1>de stand up paddle</h1>
        </div>
        <div className="feat">
          <div><Ic d="M12 6v6l4 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z" />Ensinamos a ficar em pé na prancha em 10 minutos</div>
          <div><Ic d="M8 3 4 7l3 2v11h10V9l3-2-4-4-2 2a3 3 0 0 1-6 0L8 3Z" />Equipamento para crianças e adultos</div>
          <div><Ic d="M4 20c4 0 5-3 8-3s4 3 8 3M14 4l4 4-9 9-4-4 9-9Z" />Instrutor acompanha você durante todo o roteiro</div>
        </div>
      </header>

      <section className="sec w" id="sobre">
        <div className="why">
          <h2>Por que vale experimentar?</h2>
          <p><b>SUP</b> é uma variação do surfe que se pratica em pé numa prancha larga, com a ajuda de um remo. Dizem que é um esporte só para jovens atléticos? Engano. Remar em pé numa prancha inflável é um passatempo para crianças, adolescentes, adultos e idosos.</p>
        </div>
        <div className="nums">
          <div className="grid4">{WHY.map((w) => <div className="nm" key={w.n}><i>{w.n}</i><div><h3>{w.t}</h3><p>{w.d}</p></div></div>)}</div>
          <div className="ph"><img src={IM.grupo} alt="Grupo de amigos na praia segurando pranchas coloridas de SUP" /></div>
        </div>
      </section>

      <section className="sec w" id="galeria">
        <h2 className="st">Galeria dos nossos passeios</h2>
        <div className="tabs">{PLACES.map((p) => <button key={p} className={place === p ? "on" : ""} onClick={() => setPlace(p)}>{p}</button>)}</div>
        <div className="mos">{gal.map((g, i) => <figure key={g.tag + i + g.c} className={g.c}><img src={g.img} alt={`Passeio de SUP em ${g.tag}`} style={{ objectPosition: g.pos }} loading="lazy" /></figure>)}</div>
      </section>

      <section className="op" id="depoimentos">
        <div className="ops">{OPIN.map((o) => <article className="oc" key={o.n}><h3>{o.n}</h3><p>{o.t}</p><span><Pin />{o.p}</span></article>)}</div>
      </section>

      <section className="sec w">
        <h2 className="st">Pranchas para passeio</h2>
        <div className="bf"><img src={IM.pranchas} alt="Quatro pranchas de stand up paddle nas cores turquesa, rosa, azul e verde" /><div className="bl">{BOARDS.map((b) => <span key={b}>{b}</span>)}</div></div>
      </section>

      <section className="sec w" id="roteiros">
        <h2 className="st">Roteiros de SUP</h2>
        <div className="rt">{ROUTES.map((r) => (
          <article className="rc" key={r.n}>
            <div className="ri"><img src={r.img} alt={r.n} style={{ objectPosition: r.pos }} loading="lazy" /></div>
            <h3>{r.n}</h3><p>R$ {r.p},00</p>
            <a href={wa(`Oi! Quero reservar o roteiro "${r.n}" com a ${brand}.`)} target="_blank" rel="noreferrer">Reservar</a>
          </article>))}</div>
      </section>

      <section className="w nl" id="contato">
        <form className="nlc" onSubmit={(e) => { e.preventDefault(); if (!ok) { setToast("Aceite o envio de novidades para continuar"); return; } setToast("Pronto! O cupom de 15% chega no seu WhatsApp"); (e.target as HTMLFormElement).reset(); }}>
          <h2>Assine e ganhe 15% de desconto no primeiro passeio</h2>
          <p>Você fica sabendo das novidades e das ofertas de temporada.</p>
          <input type="text" placeholder="Seu nome" required />
          <input type="tel" placeholder="Seu WhatsApp" required />
          <div className="chk" onClick={() => setOk(!ok)}><i>{ok ? "✓" : ""}</i><span>Ao enviar meus dados, aceito receber novidades da {brand} no WhatsApp, conforme a política de privacidade.</span></div>
          <button className="sub" type="submit">Assinar</button>
        </form>
        <div className="nlp"><img src={IM.riso} alt="Casal rindo e brincando sobre uma prancha de SUP no mar" /></div>
      </section>

      <footer>
        <div><a href="#top" onClick={(e) => { e.preventDefault(); go("top"); }}>Início</a><a href="#sobre" onClick={(e) => { e.preventDefault(); go("sobre"); }}>Sobre o SUP</a><a href="#roteiros" onClick={(e) => { e.preventDefault(); go("roteiros"); }}>Roteiros</a></div>
        <div><a href="#galeria" onClick={(e) => { e.preventDefault(); go("galeria"); }}>Galeria</a><a href="#depoimentos" onClick={(e) => { e.preventDefault(); go("depoimentos"); }}>Depoimentos</a><a href="#contato" onClick={(e) => { e.preventDefault(); go("contato"); }}>Contato</a></div>
        <div><a href={wa("Oi! Quero saber mais sobre os passeios de SUP.")} target="_blank" rel="noreferrer">Parcerias</a><a href="#top" onClick={(e) => { e.preventDefault(); go("top"); }}>Política de privacidade</a></div>
        <div className="ad">{city}, SC<br />Saída pela Praia do Campeche<br />WhatsApp: {phone || "(48) 99999-0000"}</div>
      </footer>
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}
