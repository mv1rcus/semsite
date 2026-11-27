import { useEffect, useState } from "react";

/** Energia solar a partir do pin "Solar Solutions" (desktop): hero com foto e filtro azul, titulo central, botao laranja e tres cartoes (casa, empresa, usina). */
const IM = { hero: "/sm-hero.webp", casa: "/sm-casa.webp", empresa: "/sm-empresa.webp", usina: "/sm-usina.webp", eng: "/sm-eng.webp", close: "/sm-close.webp" };
const CARDS = [
  { t: "SOLAR PARA A SUA CASA", b: "Projeto sob medida para o telhado da sua casa. Você reduz a conta de luz já no primeiro mês e valoriza o imóvel.", img: IM.casa, alt: "Instalador de capacete instalando painéis solares em um telhado de telhas cerâmicas" },
  { t: "SOLAR PARA A SUA EMPRESA", b: "Painéis no telhado do comércio ou da indústria. Menos custo fixo e energia limpa para o seu negócio crescer.", img: IM.empresa, alt: "Vista aérea de prédios comerciais com painéis solares no telhado" },
  { t: "SOLAR PARA USINAS", b: "Projetos de maior porte em terreno aberto, com estudo de geração, instalação e acompanhamento da produção.", img: IM.usina, alt: "Fileiras de painéis solares em um campo aberto" },
];
const STEPS = [
  { n: "01", t: "Visita e projeto", b: "Medimos o telhado, analisamos sua conta de luz e desenhamos o sistema ideal.", img: IM.eng, alt: "Engenheira de capacete conferindo o projeto em um tablet ao lado de painéis solares" },
  { n: "02", t: "Instalação e acompanhamento", b: "Nossa equipe instala, liga o sistema e acompanha a geração nos primeiros meses.", img: IM.close, alt: "Detalhe de uma placa solar com células azuis" },
];

export function SolDeMinas({ client }: { client?: { name?: string; city?: string; whatsapp?: string } }) {
  const brand = client?.name?.trim() || "Sol de Minas";
  const city = client?.city || "Uberaba, MG";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const shown = phone ? phone.replace(/^55/, "").replace(/(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3") : "(34) 99999-0000";
  const wa = (t: string) => `https://wa.me/${num}?text=${encodeURIComponent(t)}`;
  const [toast, setToast] = useState("");
  const [f, setF] = useState({ n: "", t: "" });
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(""), 2200); return () => clearTimeout(t); }, [toast]);
  const send = () => {
    if (!f.n.trim() || f.t.replace(/\D/g, "").length < 10) { setToast("Preencha nome e telefone"); return; }
    setToast("Recebido. Vamos ligar para você."); setF({ n: "", t: "" });
  };
  return (
    <div className="sm" id="top">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&family=Open+Sans:wght@400;600&display=swap');
        .sm{background:#fff;color:#4a4a4a;font-family:'Open Sans',Arial,sans-serif;font-weight:400;font-size:15px;line-height:1.7;overflow-x:hidden}
        .sm h1,.sm h2,.sm h3,.sm .lg{font-family:'Montserrat',Arial,sans-serif;font-weight:500;text-wrap:balance}
        .sm .toast{position:fixed;left:50%;bottom:26px;transform:translateX(-50%);background:#16275e;color:#fff;padding:11px 18px;font-size:13px;z-index:60}
        .sm .hero{position:relative;color:#fff;min-height:620px;background:#16275e}
        .sm .hero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:40% 18%}
        .sm .hero:before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(20,40,110,.62),rgba(20,40,110,.5));z-index:1}
        .sm nav{position:relative;z-index:2;display:flex;justify-content:space-between;align-items:center;padding:30px 88px}
        .sm .lg{font-size:22px;letter-spacing:.03em;text-transform:uppercase;color:#fff;text-decoration:none;line-height:1.1}
        .sm .call{font-size:13px;color:#fff;text-decoration:none}.sm .call b{font-weight:600}
        .sm .hc{position:relative;z-index:2;text-align:center;padding:170px 24px 120px;max-width:900px;margin:0 auto}
        .sm .hc .a{font-family:'Montserrat',Arial,sans-serif;font-weight:400;font-size:30px;line-height:1.15;margin:0;text-transform:uppercase;letter-spacing:.02em}
        .sm h1{font-size:40px;line-height:1.1;margin:4px 0 16px;text-transform:uppercase;letter-spacing:0}
        .sm .hc p{font-size:19px;margin:0 0 34px;font-weight:400}
        .sm .bt{display:inline-block;background:#ee7a1f;color:#fff;border:0;border-radius:30px;padding:15px 52px;font-family:'Montserrat',Arial,sans-serif;font-weight:500;font-size:15px;letter-spacing:.04em;text-transform:uppercase;text-decoration:none;cursor:pointer}
        .sm .bt:hover{background:#d9680f}
        .sm .cards{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;max-width:1000px;margin:12px auto 0;padding:0 40px}
        .sm .cards img{width:100%;aspect-ratio:4/3;object-fit:cover;display:block}
        .sm .cards h3{font-size:15px;line-height:1.25;color:#ee7a1f;text-align:center;margin:26px 0 12px;letter-spacing:.01em}
        .sm .cards p{font-size:14px;text-align:center;margin:0 14px 10px}
        .sm .st{max-width:1000px;margin:110px auto 0;padding:0 40px}
        .sm .st h2{font-size:30px;line-height:1.2;color:#16275e;text-align:center;margin:0 0 56px}
        .sm .row{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;margin-bottom:56px}.sm .row.r .tx{order:2}
        .sm .row img{width:100%;aspect-ratio:4/3;object-fit:cover;display:block}
        .sm .row .n{font-family:'Montserrat',Arial,sans-serif;font-size:34px;color:#ee7a1f;line-height:1}
        .sm .row h3{font-size:22px;line-height:1.2;color:#16275e;margin:8px 0 10px}.sm .row p{margin:0;max-width:380px}
        .sm .ct{background:#16275e;color:#fff;margin-top:70px;padding:84px 24px;text-align:center}
        .sm .ct h2{font-size:30px;line-height:1.2;margin:0 0 10px}.sm .ct p{margin:0 0 34px;color:#d7def2}
        .sm .fm{display:flex;gap:14px;justify-content:center;max-width:760px;margin:0 auto;flex-wrap:wrap}
        .sm .fm input{flex:1;min-width:200px;border:0;border-radius:30px;padding:15px 22px;font:inherit;font-size:14px;outline:none}
        .sm footer{padding:30px 88px;display:flex;justify-content:space-between;font-size:12px;color:#777;flex-wrap:wrap;gap:8px}
        @media(max-width:860px){
          .sm nav{padding:20px 22px;flex-direction:column;gap:8px;align-items:flex-start}
          .sm .hero{min-height:0}.sm .hc{padding:80px 22px 80px}.sm .hc .a{font-size:21px}.sm h1{font-size:28px}.sm .hc p{font-size:16px}
          .sm .cards{grid-template-columns:1fr;padding:0 22px;gap:34px;margin-top:34px}
          .sm .st{padding:0 22px;margin-top:80px}.sm .st h2{font-size:26px;margin-bottom:36px}
          .sm .row{grid-template-columns:1fr;gap:20px}.sm .row.r .tx{order:0}
          .sm .ct{padding:64px 22px}.sm footer{padding:24px 22px}
        }
      `}</style>
      <header className="hero">
        <img src={IM.hero} alt="Instalador de capacete branco fixando painéis solares em um telhado" />
        <nav>
          <a className="lg" href="#top">{brand}</a>
          <a className="call" href={wa("Oi! Quero um orçamento de energia solar.")} target="_blank" rel="noreferrer">Ligue hoje: <b>{shown}</b></a>
        </nav>
        <div className="hc">
          <p className="a">O melhor custo-benefício e qualidade</p>
          <h1>Soluções em energia solar</h1>
          <p>Use o sol, economize energia.</p>
          <a className="bt" href="#contato" onClick={(e) => { e.preventDefault(); document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" }); }}>Comece agora</a>
        </div>
      </header>

      <section className="cards">
        {CARDS.map((c) => (
          <div key={c.t}><img src={c.img} alt={c.alt} /><h3>{c.t}</h3><p>{c.b}</p></div>
        ))}
      </section>

      <section className="st">
        <h2>Como funciona</h2>
        {STEPS.map((s, k) => (
          <div key={s.n} className={`row${k % 2 ? " r" : ""}`}>
            <img src={s.img} alt={s.alt} />
            <div className="tx"><span className="n">{s.n}</span><h3>{s.t}</h3><p>{s.b}</p></div>
          </div>
        ))}
      </section>

      <section className="ct" id="contato">
        <h2>Peça seu orçamento</h2>
        <p>Atendemos {city} e região. Deixe seu contato e retornamos no mesmo dia.</p>
        <div className="fm">
          <input placeholder="Seu nome" value={f.n} onChange={(e) => setF({ ...f, n: e.target.value })} aria-label="Nome" />
          <input placeholder="Telefone com DDD" value={f.t} onChange={(e) => setF({ ...f, t: e.target.value })} aria-label="Telefone" />
          <button className="bt" onClick={send}>Enviar</button>
        </div>
      </section>
      <footer><span>© 2026 {brand}. Todos os direitos reservados.</span><span>{city}</span></footer>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
