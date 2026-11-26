import { useEffect, useState } from "react";

/** Wine bar e adega construido do zero a partir de um pin: hero creme com garrafa, uvas e taca, bloco de boas-vindas com foto do salao, 4 pilares com icones de traco, 3 cards escuros e faixa bordo. Reserva pelo WhatsApp. */
const BORDO = "#5b1424", CREME = "#f7efe6", OURO = "#b8894a", INK = "#2a1a1a", MUT = "#5c4a45";
const PILLARS = [
  { t: "Vinhos excepcionais", d: "Rótulos escolhidos a dedo de vinícolas pequenas e clássicos do mundo todo.", ic: "M10 3h12l-1 9a5 5 0 0 1-10 0zM16 17v10M11 28h10" },
  { t: "Adega reservada", d: "Safras raras e seleções exclusivas para quem entende e para quem quer aprender.", ic: "M9 5h14c2 4 2 18 0 22H9c-2-4-2-18 0-22zM9 12h14M9 20h14" },
  { t: "Ambiente intimista", d: "Um espaço calmo para desacelerar, conversar e aproveitar o momento.", ic: "M6 12h20M10 12v14M22 12v14M13 12c0-4 6-4 6 0" },
  { t: "Boa companhia", d: "Porque os melhores vinhos foram feitos para ser divididos.", ic: "M16 5c3 0 5 2 5 4s-2 3-2 3 4 0 4 4-3 5-5 5-2 4-2 4-2-4-2-4-5-1-5-5 4-4 4-4-2-1-2-3 2-4 5-4z" },
];
const CARDS = [
  { t: "Nossos vinhos", d: "Explore a carta por taça ou por garrafa.", img: "/wine-taca.webp", a: "Ver carta de vinhos", w: "ver a carta de vinhos" },
  { t: "A adega", d: "Entre no nosso mundo de safras raras e rótulos especiais.", img: "/wine-adega.webp", a: "Conhecer a adega", w: "conhecer a adega" },
  { t: "Eventos e degustações", d: "Participe de noites de degustação e encontros com produtores.", img: "/wine-brinde.webp", a: "Ver eventos", w: "saber dos eventos e degustações" },
];

export function WineFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Casa Vinha";
  const city = client?.city?.trim() || "Porto Alegre";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [sc, setSc] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const wa = (what?: string) => `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero ${what ?? "reservar uma mesa"} na ${brand}.`)}`;
  const [email, setEmail] = useState("");

  return (
    <div className="wn0" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: INK, background: CREME, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Jost:wght@300;400;500&display=swap');
        .wn0 *{box-sizing:border-box}
        .wn0 a,.wn0 button,.wn0 input{font-family:'Jost',system-ui,sans-serif}
        .wn0 h1,.wn0 h2,.wn0 h3{font-family:'Cormorant Garamond',Georgia,serif !important;font-weight:500 !important;text-transform:uppercase}
        .wn0 .eb{font-family:'Jost',sans-serif;font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:#8a5f26;font-weight:500}
        .wn0 .hero{position:relative;min-height:600px;display:flex;align-items:center;background:linear-gradient(90deg,#f6e7da 0%,#f6e7da 36%,transparent 70%)}
        .wn0 .hero img.bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:right center;z-index:0}
        .wn0 .hero .shade{position:absolute;inset:0;background:linear-gradient(90deg,#f6e8db 0%,#f6e8db 53%,rgba(246,232,219,0) 72%);z-index:1}
        .wn0 .hin{position:relative;z-index:2;padding:90px 7vw;max-width:640px}
        .wn0 h1{font-weight:400;font-size:clamp(46px,6.4vw,84px);line-height:1.02;letter-spacing:.08em;margin:14px 0 22px}
        .wn0 .rule{display:flex;align-items:center;gap:10px;color:${OURO};margin-bottom:22px}.wn0 .rule i{display:block;width:70px;height:1px;background:${OURO}}
        .wn0 .hin p{font-family:'Jost',sans-serif;font-weight:400;font-size:16px;line-height:1.8;color:#4a3a36;max-width:340px;margin:0 0 30px}
        .wn0 .bt{display:inline-flex;align-items:center;gap:12px;background:${BORDO};color:#fff;text-decoration:none;font-family:'Jost',sans-serif;font-size:12.5px;letter-spacing:.2em;text-transform:uppercase;padding:0 30px;min-height:54px}
        .wn0 .bt.o{background:transparent;color:${BORDO};border:1px solid ${OURO}}
        .wn0 .wl{display:grid;grid-template-columns:1fr 1.45fr;background:#f1e6da}
        .wn0 .wl .tx{padding:90px 7vw 90px 7vw}
        .wn0 h2{font-weight:400;font-size:clamp(32px,3.6vw,48px);line-height:1.12;letter-spacing:.05em;margin:12px 0 22px;text-transform:uppercase}
        .wn0 .wl p{font-family:'Jost',sans-serif;font-weight:300;font-size:16px;line-height:1.85;color:${MUT};margin:0 0 30px;max-width:380px}
        .wn0 .wl img{width:100%;height:100%;min-height:440px;object-fit:cover;display:block}
        .wn0 .pl{display:grid;grid-template-columns:repeat(4,1fr);padding:70px 5vw;background:#f8f1e9;text-align:center}
        .wn0 .pl>div{padding:0 26px;border-left:1px solid #e2d2c2}.wn0 .pl>div:first-child{border-left:0}
        .wn0 .pl b{display:block;font-family:'Jost',sans-serif;font-weight:500;font-size:13px;letter-spacing:.16em;text-transform:uppercase;margin:16px 0 10px}
        .wn0 .pl span{font-family:'Jost',sans-serif;font-weight:400;font-size:15.5px;line-height:1.7;color:#4a3a36}
        .wn0 .more{padding:80px 5vw 90px;background:#efe3d6;text-align:center}
        .wn0 .more h2{margin-bottom:44px}
        .wn0 .cds{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;max-width:1160px;margin:0 auto;text-align:left}
        .wn0 .cd{position:relative;min-height:380px;overflow:hidden;background:#1d1210;display:flex;align-items:flex-end}
        .wn0 .cd img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.9}
        .wn0 .cd:after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(18,10,8,.95) 0%,rgba(18,10,8,.7) 42%,rgba(18,10,8,0) 72%)}
        .wn0 .cd div{position:relative;z-index:2;padding:26px;color:#fff}
        .wn0 .cd b{display:block;font-family:'Jost',sans-serif;font-weight:500;font-size:13px;letter-spacing:.16em;text-transform:uppercase;margin-bottom:8px}
        .wn0 .cd p{font-family:'Jost',sans-serif;font-weight:400;font-size:15px;line-height:1.6;margin:0 0 14px;color:#eadccf}
        .wn0 .cd a{color:#f0cf9a;text-decoration:none;font-family:'Jost',sans-serif;font-size:12px;letter-spacing:.18em;text-transform:uppercase}
        .wn0 .ft{background:${BORDO};color:#f3e6da;display:grid;grid-template-columns:1fr 1fr;gap:0;padding:60px 7vw;align-items:center}
        .wn0 .ft .l{display:flex;gap:26px;align-items:center;padding-right:40px;border-right:1px solid rgba(240,207,154,.35)}
        .wn0 .ft .ic{flex:none;width:76px;height:76px;border:1px solid ${OURO};border-radius:50%;display:grid;place-items:center}
        .wn0 .ft h3{font-weight:400;font-size:clamp(24px,2.6vw,32px);letter-spacing:.08em;line-height:1.25;margin:0 0 18px;color:#e6c48c;text-transform:uppercase}
        .wn0 .ft .r{padding-left:44px}
        .wn0 .ft .r b{display:block;font-family:'Jost',sans-serif;font-weight:400;font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:#e6c48c;margin-bottom:10px}
        .wn0 .ft .r p{font-family:'Jost',sans-serif;font-weight:300;font-size:14.5px;line-height:1.7;margin:0 0 16px}
        .wn0 .em{display:flex}.wn0 .em input{flex:1;min-width:0;min-height:48px;background:transparent;border:1px solid ${OURO};border-right:0;color:#fff;padding:0 16px;font-size:14px}.wn0 .em input::placeholder{color:#c9b3a6}
        .wn0 .em a{width:54px;background:#f0d9b8;color:${BORDO};display:grid;place-items:center;text-decoration:none;font-size:20px}
        .wn0 .info{background:#3f0d18;color:#d9c3b4;display:grid;grid-template-columns:repeat(3,1fr);gap:24px;padding:30px 7vw;font-family:'Jost',sans-serif;font-size:14px;line-height:1.7}.wn0 .info b{color:#fff;font-weight:500}
        .wn0 .wa{position:fixed;right:18px;bottom:18px;z-index:40;width:58px;height:58px;border-radius:50%;background:#25d366;display:grid;place-items:center;box-shadow:0 8px 24px rgba(0,0,0,.3)}
        @media(max-width:900px){
          .wn0 .hero{display:block;min-height:0;background:none}.wn0 .hero img.bg{position:relative;display:block;width:100%;height:400px;object-position:72% top}
          .wn0 .hero .shade{display:none}
          .wn0 .hin{padding:34px 24px 44px;max-width:none;margin-top:0;background:#f6e8db}.wn0 h1{letter-spacing:.06em}
          .wn0 .wl{grid-template-columns:1fr}.wn0 .wl .tx{padding:56px 24px}.wn0 .wl img{min-height:300px}
          .wn0 .pl{grid-template-columns:1fr 1fr;padding:50px 16px;row-gap:34px}.wn0 .pl>div{padding:0 12px}.wn0 .pl>div:nth-child(3){border-left:0}
          .wn0 .cds{grid-template-columns:1fr}.wn0 .cd{min-height:320px}
          .wn0 .ft{grid-template-columns:1fr;padding:48px 24px;gap:34px}.wn0 .ft .l{border-right:0;padding-right:0;border-bottom:1px solid rgba(240,207,154,.35);padding-bottom:34px}.wn0 .ft .r{padding-left:0}
          .wn0 .info{grid-template-columns:1fr;padding:28px 24px}.wn0 .more{padding:56px 20px 64px}
        }
      `}</style>

      <section className="hero">
        <img className="bg" src="/wine-hero.webp" alt="Garrafa de vinho tinto, uvas e taça sobre mármore" />
        <div className="shade" />
        <div className="hin">
          <div className="eb">Noites longas. Bons vinhos.</div>
          <h1>BOA<br />COMPANHIA.</h1>
          <div className="rule"><i /><span>✦</span></div>
          <p>A {brand} é mais que um wine bar. É um lugar para desacelerar, provar vinhos excepcionais e viver a arte da boa companhia, em {city}.</p>
          <a className="bt" href={wa()} target="_blank" rel="noreferrer">Reservar uma mesa <span>→</span></a>
        </div>
      </section>

      <section className="wl">
        <div className="tx">
          <div className="eb">Bem-vindo à {brand}</div>
          <h2>Um tesouro escondido para quem ama vinho</h2>
          <p>Nossa missão é simples: reunir pessoas em volta dos melhores vinhos do mundo. De pequenos produtores a clássicos atemporais, cada garrafa tem uma história. Estamos aqui para ajudar você a descobrir a sua.</p>
          <a className="bt o" href={wa("conhecer a casa")} target="_blank" rel="noreferrer">Saiba mais</a>
        </div>
        <img src="/wine-lounge.webp" alt="Salão aconchegante do wine bar com adega ao fundo" loading="lazy" />
      </section>

      <section className="pl">
        {PILLARS.map((p) => (
          <div key={p.t}>
            <svg width="46" height="46" viewBox="0 0 32 32" fill="none" stroke="#9a6d2e" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"><path d={p.ic} /></svg>
            <b>{p.t}</b><span>{p.d}</span>
          </div>
        ))}
      </section>

      <section className="more">
        <div className="eb">Descubra a {brand}</div>
        <h2>Mais que apenas vinho</h2>
        <div className="cds">
          {CARDS.map((c) => (
            <div className="cd" key={c.t}>
              <img src={c.img} alt={c.t} loading="lazy" />
              <div><b>{c.t}</b><p>{c.d}</p><a href={wa(c.w)} target="_blank" rel="noreferrer">{c.a} →</a></div>
            </div>
          ))}
        </div>
      </section>

      <section className="ft">
        <div className="l">
          <div className="ic"><svg width="34" height="34" viewBox="0 0 32 32" fill="none" stroke={OURO} strokeWidth="1.2" strokeLinecap="round"><path d="M10 3h12l-1 9a5 5 0 0 1-10 0zM16 17v10M11 28h10" /></svg></div>
          <div><h3>Venha para uma noite inesquecível</h3><a className="bt o" style={{ color: "#f3e6da", borderColor: OURO }} href={wa()} target="_blank" rel="noreferrer">Reserve sua mesa <span>→</span></a></div>
        </div>
        <div className="r">
          <b>Fique por dentro</b>
          <p>Receba novidades sobre vinhos, eventos e ofertas especiais.</p>
          <div className="em"><input type="email" placeholder="Seu e-mail" aria-label="Seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} /><a href={wa("receber as novidades")} target="_blank" rel="noreferrer" aria-label="Enviar">→</a></div>
        </div>
      </section>

      <div className="info">
        <div><b>{brand}</b><br />Wine bar e adega</div>
        <div><b>Endereço</b><br />Rua das Videiras, 340, {city}</div>
        <div><b>Horário</b><br />Ter a dom, das 17h à meia-noite</div>
      </div>
      {sc && <a className="wa" href={wa()} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg></a>}
    </div>
  );
}
