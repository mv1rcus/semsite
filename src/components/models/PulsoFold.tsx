import { useEffect, useState } from "react";

/** Vitrine de scooters ("Pulso Scooters"), feita a partir de um pin com tres telas em verde escuro: hero com ano gigante e scooter, sobre a marca com foto de piloto e fabrica, e detalhe do modelo em carrossel de fotos com abas. */
const BG = "#101112", GD = "#d0c39d", PN = "#0c2a24";
const SLIDES = [
  { img: "/pulso-roda.webp", cap: "Freio a disco dianteiro com ABS e roda de liga" },
  { img: "/pulso-traseira.webp", cap: "Rabeta esportiva, escapamento com protetor e roda traseira" },
  { img: "/pulso-amortecedor.webp", cap: "Amortecedor traseiro com mola cromada" },
];
const TABS = ["Destaques", "Galeria", "Ficha técnica", "Acessórios"];
const SPEC = [["Motor", "155 cc, 4 tempos, refrigerado a líquido"], ["Potência", "15 cv a 8.000 rpm"], ["Freios", "Disco dianteiro e traseiro com ABS"], ["Tanque", "5,5 litros"]];

function So() {
  const p = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "#fff", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return [
    <svg {...p} key="i"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.500 6.500h.01" /></svg>,
    <svg {...p} key="t"><path d="M22 5.800a8 8 0 0 1-2.300.6 4 4 0 0 0 1.800-2.200 8 8 0 0 1-2.600 1 4 4 0 0 0-6.800 3.600A11.500 11.500 0 0 1 3.700 4.600a4 4 0 0 0 1.200 5.400 4 4 0 0 1-1.800-.5 4 4 0 0 0 3.200 4 4 4 0 0 1-1.800.1 4 4 0 0 0 3.700 2.800A8 8 0 0 1 2 18.100 11.500 11.500 0 0 0 8.300 20c7.500 0 11.700-6.300 11.400-12 .8-.6 1.600-1.300 2.300-2.200z" /></svg>,
    <svg {...p} key="f"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" /></svg>,
  ];
}
function Side({ onMenu }: { onMenu: () => void }) {
  return <div className="sd"><button aria-label="Menu" onClick={onMenu}><svg width="24" height="24" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2.200" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16" /></svg></button><div className="so">{So()}</div></div>;
}

export function PulsoFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = (client?.name?.trim() || "Pulso").toUpperCase();
  const city = client?.city?.trim() || "Juiz de Fora";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const base = `https://wa.me/${num}`;
  const wa = (t: string) => `${base}?text=${encodeURIComponent(t)}`;
  const [menu, setMenu] = useState(false);
  const [i, setI] = useState(0);
  const [tab, setTab] = useState(0);
  const [sc, setSc] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const n = SLIDES.length;
  const L = SLIDES[(i + n - 1) % n]!, C = SLIDES[i]!, R = SLIDES[(i + 1) % n]!;
  const Nav = ({ on }: { on: number }) => (
    <div className="nv"><b className="lg">{brand}</b><div className="lk">
      {["Revenda", "Modelos", "Peças e acessórios", "Sobre nós"].map((t, k) => <a key={t} className={on === k ? "on" : ""} onClick={() => go(k === 3 ? "sobre" : k === 1 ? "detalhe" : "top")}>{t}</a>)}
      <span>PT ⌄</span></div></div>
  );
  const Tabs = () => <div className="tb">{TABS.map((t, k) => <a key={t} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>+ {t}</a>)}</div>;
  const Foot = () => <div className="ft"><a onClick={() => setI((i + n - 1) % n)}>‹ <span>Zen 125 VVA</span></a><div className="dt">{Array.from({ length: 10 }).map((_, k) => <i key={k} className={k === 7 ? "on" : ""} />)}</div><a onClick={() => setI((i + 1) % n)}><span>Urb Connected</span> ›</a></div>;

  return (
    <div className="pu" style={{ fontFamily: "'Poppins', system-ui, sans-serif", color: "#fff", background: BG, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&family=Montserrat:wght@600;700&display=swap');
        .pu *{box-sizing:border-box}.pu a,.pu button{font-family:inherit}
        .pu h1,.pu h2,.pu .lg,.pu .big{font-family:'Montserrat',system-ui,sans-serif!important;font-weight:700!important;text-transform:uppercase!important;font-style:normal!important;margin:0;letter-spacing:.02em!important;text-wrap:balance}
        .pu .wrap{max-width:1180px;margin:0 auto;padding:36px 28px;display:grid;gap:56px}
        .pu .scr{position:relative;background:radial-gradient(ellipse 70% 80% at 35% 40%,#1c4a3c 0,${PN} 55%,#0a1716 100%);display:grid;grid-template-columns:84px 1fr;min-height:480px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.5)}
        .pu .sd{display:flex;flex-direction:column;align-items:center;padding-top:22px;gap:40px;background:linear-gradient(180deg,rgba(255,255,255,.04),transparent);z-index:3}.pu .sd button{background:none;border:0;cursor:pointer;padding:0}.pu .so{display:flex;flex-direction:column;gap:22px;margin-top:10px}
        .pu .mn{position:absolute;left:84px;top:64px;z-index:9;background:#0a1716;border:1px solid #2a4a42;padding:14px 22px;display:flex;flex-direction:column;gap:12px;font-size:13px}
        .pu .mn a{cursor:pointer}
        .pu .nv{display:flex;justify-content:space-between;align-items:center;padding:22px 34px 0 26px;position:relative;z-index:3}.pu .lg{font-size:24px}
        .pu .lk{display:flex;gap:38px;align-items:center;font-size:12px;font-weight:300}.pu .lk a{cursor:pointer}.pu .lk a.on{font-weight:500}
        .pu .h1{position:relative;min-height:380px}
        .pu .big{position:absolute;left:12%;top:6%;font-size:clamp(150px,21vw,270px);line-height:1;color:rgba(255,255,255,.07);font-weight:700;letter-spacing:0!important;z-index:0}
        .pu .bike{position:absolute;left:3%;top:8%;width:62%;aspect-ratio:16/9;background:url(/pulso-hero.webp) center/cover;-webkit-mask-image:radial-gradient(ellipse 52% 54% at 52% 50%,#000 55%,transparent 100%);mask-image:radial-gradient(ellipse 52% 54% at 52% 50%,#000 55%,transparent 100%);z-index:1}
        .pu .tx{position:absolute;left:61%;top:10%;z-index:2;max-width:330px}
        .pu .tx h1{font-size:clamp(26px,3.1vw,38px);line-height:1.12;color:#fff}.pu .tx h1 span{color:${GD}}
        .pu .pr{margin-top:26px;font-size:9px;letter-spacing:.08em;text-transform:uppercase;font-weight:400}.pu .pr b{display:block;font-size:19px;color:${GD};font-weight:500;letter-spacing:0;margin-top:2px;text-transform:none}
        .pu .bt{display:inline-block;margin-top:18px;border:2px solid ${GD};background:rgba(255,255,255,.04);color:#fff;font-size:11px;letter-spacing:.06em;font-weight:500;padding:13px 20px;border-radius:5px;text-transform:uppercase;text-decoration:none;cursor:pointer}
        .pu .ar{position:absolute;top:34%;z-index:3;font-size:38px;color:${GD};font-weight:300;cursor:pointer;background:none;border:0}.pu .ar.l{left:20px}.pu .ar.r{right:20px}
        .pu .tb{display:flex;gap:44px;font-size:10px;letter-spacing:.04em;text-transform:uppercase;padding:0 0 22px 22%;position:relative;z-index:3}.pu .tb a{cursor:pointer;padding:5px 10px;border-radius:99px}.pu .tb a.on{background:rgba(255,255,255,.18)}
        .pu .ft{grid-column:1/3;display:flex;justify-content:space-between;align-items:center;background:rgba(40,86,76,.55);padding:0 26px;height:48px;font-size:17px;font-weight:300;color:#b8cfc9}.pu .ft a{cursor:pointer;font-size:18px}.pu .ft a span{font-size:15px}
        .pu .dt{display:flex;gap:9px}.pu .dt i{width:5px;height:5px;border-radius:50%;background:#7d958f}.pu .dt i.on{background:#fff}
        .pu .col{display:flex;flex-direction:column}
        .pu .bnr{position:relative;height:150px;background:url(/pulso-piloto.webp) 50% 12%/cover;overflow:hidden}.pu .bnr:before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(10,23,22,.6),transparent 60%)}
        .pu .bnr .lg{position:absolute;left:26px;bottom:14px;font-size:clamp(44px,6vw,70px);line-height:1;z-index:2}
        .pu .bnr .nv{position:absolute;left:0;right:0;top:0;padding-top:20px;z-index:3}.pu .bnr .nv .lg{display:none}
        .pu .ab{display:grid;grid-template-columns:1.1fr 1fr;gap:40px;padding:34px 50px 40px 26px;font-weight:300;font-size:12px;line-height:1.7}
        .pu .ab h2{font-size:25px;font-weight:300!important;line-height:1.15;letter-spacing:.04em!important}.pu .ab .t1{display:grid;grid-template-columns:110px 1fr;gap:16px;margin-bottom:12px}
        .pu .ab p{margin:0 0 10px}
        .pu .ab .ph{width:100%;aspect-ratio:3/2;background:url(/pulso-predio.webp) center/cover;max-width:300px}.pu .ab .cap{font-size:11px;margin:10px 0 14px;font-weight:400}.pu .ab .ad{padding-left:24px;font-size:11px;text-transform:uppercase;line-height:1.8;letter-spacing:.04em}
        .pu .cr{position:relative;height:300px;display:flex;align-items:center;justify-content:center;z-index:2}
        .pu .cd{position:absolute;border-radius:26px;background-size:cover;background-position:center;box-shadow:0 14px 40px rgba(0,0,0,.45)}
        .pu .cd.c{width:326px;height:230px;z-index:3;border-radius:30px}.pu .cd.l,.pu .cd.r{width:200px;height:120px;opacity:.9;border-radius:20px;cursor:pointer}.pu .cd.l{left:calc(50% - 400px)}.pu .cd.r{right:calc(50% - 400px)}
        .pu .cd.c i{position:absolute;left:16px;bottom:10px;font-size:7px;font-style:normal;color:#fff;text-shadow:0 1px 3px #000;max-width:200px}
        .pu .tap{text-align:center;font-size:10px;letter-spacing:.06em;font-weight:500;margin:6px 0 26px;text-transform:uppercase;position:relative;z-index:3}
        .pu .sp{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;padding:0 34px 10px 22%;font-size:11px;font-weight:300;position:relative;z-index:3}.pu .sp b{display:block;font-weight:500;color:${GD};font-size:10px;letter-spacing:.08em;text-transform:uppercase;margin-bottom:3px}
        .pu .wa{position:fixed;right:20px;bottom:20px;width:54px;height:54px;border-radius:50%;background:#25d366;display:flex;align-items:center;justify-content:center;z-index:50}
        @media(max-width:860px){
          .pu .wrap{padding:16px 12px;gap:28px}.pu .scr{grid-template-columns:52px 1fr;min-height:0}.pu .sd{gap:24px}.pu .so{gap:16px}
          .pu .lk a{display:none}.pu .nv{padding:18px 16px 0 6px}.pu .lg{font-size:18px}.pu .mn{left:52px}
          .pu .h1{min-height:520px}.pu .big{left:2%;top:4%;font-size:110px}.pu .bike{left:-12%;top:8%;width:120%}
          .pu .tx{left:6px;top:46%;max-width:92%}.pu .tx h1{font-size:26px}.pu .ar{top:22%}.pu .ar.l{left:4px}.pu .ar.r{right:4px}
          .pu .tb{padding:0 8px 18px;gap:6px;flex-wrap:wrap;justify-content:center}
          .pu .ft{height:42px;padding:0 12px;font-size:12px}.pu .ft a span{font-size:11px}.pu .dt{display:none}
          .pu .ab{grid-template-columns:1fr;padding:22px 16px;gap:22px}.pu .ab .t1{grid-template-columns:1fr}.pu .ab .ad{padding-left:0}
          .pu .bnr .lk{display:none}
          .pu .cr{height:200px}.pu .cd.c{width:220px;height:160px}.pu .cd.l,.pu .cd.r{width:80px;height:80px}.pu .cd.l{left:-20px}.pu .cd.r{right:-20px}
          .pu .sp{grid-template-columns:1fr 1fr;padding:0 16px 10px}
        }
      `}</style>

      <div className="wrap" id="top">
        <section className="scr">
          <Side onMenu={() => setMenu(!menu)} />
          {menu && <div className="mn"><a onClick={() => go("top")}>Revenda</a><a onClick={() => go("detalhe")}>Modelos</a><a onClick={() => go("sobre")}>Sobre nós</a></div>}
          <div className="col"><Nav on={1} />
            <div className="h1">
              <div className="big" aria-hidden="true">2026</div>
              <div className="bike" role="img" aria-label="Scooter prata e preta com rodas douradas sobre fundo verde" />
              <button className="ar l" aria-label="Anterior" onClick={() => setI((i + n - 1) % n)}>‹</button>
              <button className="ar r" aria-label="Próximo" onClick={() => setI((i + 1) % n)}>›</button>
              <div className="tx"><h1>Zen 155<br />Connected<br /><span>ABS</span></h1>
                <div className="pr">Preço base<b>A partir de R$ 17.990</b></div>
                <a className="bt" href={wa(`Oi! Quero encontrar uma revenda da ${brand} em ${city}.`)} target="_blank" rel="noreferrer">Encontrar revenda</a></div>
            </div>
            <Tabs />
          </div>
          <Foot />
        </section>

        <section className="scr" id="sobre">
          <Side onMenu={() => setMenu(!menu)} />
          <div className="col">
            <div className="bnr" role="img" aria-label="Piloto de capacete azul em curva"><Nav on={3} /><b className="lg">{brand}</b></div>
            <div className="ab">
              <div>
                <div className="t1"><h2>Sobre<br />nós</h2><p>A {brand} Scooters é uma fabricante brasileira de scooters urbanas, criada para quem quer chegar rápido, gastar pouco e rodar com conforto na cidade.</p></div>
                <p>Nossa linha reúne modelos de 125 e 155 cc com motor econômico, freios com ABS e acabamento de moto grande. Cada unidade passa por inspeção em fábrica e sai com garantia e revisões programadas na rede de revendas autorizadas.</p>
                <p>Desde a fundação, o foco é o mesmo: projetar scooters confiáveis, bonitas e fáceis de manter, com peças originais disponíveis em todo o país.</p>
              </div>
              <div>
                <div className="ph" role="img" aria-label="Sede da fábrica em prédio de vidro" />
                <div className="cap">Fábrica {brand} Scooters</div>
                <div className="ad">Atendimento pelo WhatsApp<br />Av. das Indústrias, 1200<br />{city} · MG</div>
              </div>
            </div>
          </div>
          <Foot />
        </section>

        <section className="scr" id="detalhe">
          <Side onMenu={() => setMenu(!menu)} />
          <div className="col"><Nav on={1} />
            <div className="big" aria-hidden="true" style={{ top: "9%" }}>2026</div>
            <div className="cr">
              <div className="cd l" style={{ backgroundImage: `url(${L.img})` }} onClick={() => setI((i + n - 1) % n)} />
              <div className="cd c" style={{ backgroundImage: `url(${C.img})` }}><i>{C.cap}</i></div>
              <div className="cd r" style={{ backgroundImage: `url(${R.img})` }} onClick={() => setI((i + 1) % n)} />
              <button className="ar l" style={{ top: "40%" }} aria-label="Anterior" onClick={() => setI((i + n - 1) % n)}>‹</button>
              <button className="ar r" style={{ top: "40%" }} aria-label="Próximo" onClick={() => setI((i + 1) % n)}>›</button>
            </div>
            <div className="tap">Toque para ver mais</div>
            {tab === 2 && <div className="sp">{SPEC.map(([a, b]) => <div key={a}><b>{a}</b>{b}</div>)}</div>}
            <Tabs />
          </div>
          <Foot />
        </section>
      </div>
      {sc && <a className="wa" href={base} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="28" height="28" viewBox="0 0 32 32" fill="#fff"><path d="M16 3a13 13 0 0 0-11 19.800L3 29l6.400-1.900A13 13 0 1 0 16 3zm0 2.400a10.600 10.600 0 1 1-5.600 19.600l-.4-.2-3.700 1.100 1.100-3.600-.3-.4A10.600 10.600 0 0 1 16 5.400z" /></svg></a>}
    </div>
  );
}
