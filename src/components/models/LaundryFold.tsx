import { useEffect, useState } from "react";

/** Lavanderia nova, construida do zero a partir de um pin creme com cards coloridos (laranja, amarelo, azul). Pedido de coleta que fecha no WhatsApp. */
const BG = "#fff7ec", TAN = "#ecdcc7", RUST = "#c9460d", YEL = "#fbbf24", BLU = "#2a5fc4", INK = "#1d1712", MUT = "#5b4f43";
const FEATS_L = [
  { t: "Roupas macias, frescas e renovadas", ic: "M16 4l2.500 6.500L25 13l-6.500 2.500L16 22l-2.500-6.500L7 13l6.500-2.500zM25 21l1 2.500 2.500 1-2.500 1-1 2.500-1-2.500-2.500-1 2.500-1z" },
  { t: "Tecidos delicados com cuidado de especialista", ic: "M16 27s-11-6.500-11-14a6 6 0 0 1 11-3 6 6 0 0 1 11 3c0 7.500-11 14-11 14z" },
];
const FEATS_R = [
  { t: "Lavagem a seco com resultado impecável", ic: "M6 6h20v20H6zM16 22a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" },
  { t: "Atendimento todos os dias, das 7h às 21h", ic: "M16 5a11 11 0 1 0 0 22 11 11 0 0 0 0-22zM16 10v7l4 3" },
];
const SERVICES = [
  { n: "Lavagem Rápida", d: "Roupas do dia a dia lavadas, secas e dobradas em até 24 horas.", bg: RUST, fg: "#fff", ic: "M6 4h20v24H6zM6 10h20M11 7h.01M15 7h.01M16 24a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" },
  { n: "Passadoria", d: "Camisas, vestidos e ternos passados a vapor, prontos para vestir.", bg: YEL, fg: INK, ic: "M4 22c0-7 5-12 12-12h10c2 0 2 3 0 3h-6l-2 9H4zM8 26h20" },
  { n: "Tira-Manchas", d: "Tratamento especial para manchas difíceis em tecidos delicados.", bg: BLU, fg: "#fff", ic: "M10 6l-6 5 4 4 2-2v13h12V13l2 2 4-4-6-5c-1 3-3 4-5 4s-4-1-5-4z" },
];
const MILES = [
  { t: "Começo", d: "Nascemos de uma pequena lavanderia de bairro.", img: "/lav-t1.webp" },
  { t: "Lojas", d: "Abrimos o balcão e atendemos todo mundo da rua.", img: "/lav-t2.webp" },
  { t: "Hoje", d: "Equipe treinada e máquinas de última geração.", img: "/lav-t3.webp" },
  { t: "Coleta em casa", d: "Buscamos e entregamos, sem você sair.", img: "/lav-t4.webp" },
];
const STEPS = [
  { t: "Peça a coleta", d: "Mande uma mensagem e escolha o horário." },
  { t: "A gente lava", d: "Separamos por cor e tecido e lavamos com cuidado." },
  { t: "Passa e dobra", d: "Tudo conferido, passado e dobrado." },
  { t: "Entrega em casa", d: "Suas roupas voltam limpas e cheirosas." },
];
const SC = [RUST, YEL, "#7a5a3a", BLU];
const Ic = ({ d, c = INK, s = 26 }: { d: string; c?: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);

export function LaundryFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Pano Limpo";
  const city = client?.city?.trim() || "Campinas";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 600); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const wa = (what?: string) => `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero ${what ?? "pedir uma coleta de roupas"} na ${brand}.`)}`;

  return (
    <div className="pl" style={{ fontFamily: "Manrope, system-ui, sans-serif", color: INK, background: TAN, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
        .pl *{box-sizing:border-box}
        .pl a,.pl button{font-family:inherit}
        .pl .page{background:${BG};max-width:1240px;margin:14px auto;border-radius:26px;overflow:hidden;width:calc(100% - 28px)}
        .pl .wrap{max-width:1040px;margin:0 auto;padding:0 28px}
        .pl .nav{display:flex;align-items:center;justify-content:space-between;height:78px;padding:0 34px;gap:20px;position:relative}
        .pl .logo{font-weight:800;font-size:22px;letter-spacing:-.5px}
        .pl .links{display:flex;gap:44px;font-size:14.5px;font-weight:500}
        .pl .links a{color:${INK};cursor:pointer;padding-bottom:4px;border-bottom:1.5px solid transparent}.pl .links a.on{border-color:${INK}}
        .pl .btn{background:${RUST};color:#fff;border:0;border-radius:999px;padding:0 26px;min-height:48px;font-weight:700;font-size:15px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:8px;text-decoration:none}
        .pl .btn:hover{filter:brightness(1.08)}
        .pl .btn.s{min-height:40px;padding:0 20px;font-size:14px}
        .pl .burger{display:none;background:none;border:0;width:44px;height:44px;cursor:pointer}
        .pl .hero{background:${TAN};border-radius:24px;margin:0 12px;padding:54px 30px 0;text-align:center;position:relative;overflow:hidden;min-height:720px}
        .pl h1{font-weight:700;font-size:clamp(34px,5.4vw,58px);line-height:1.1;margin:0 auto;max-width:640px;letter-spacing:-1.5px;text-transform:none;font-style:normal;font-family:inherit}
        .pl .hs{max-width:620px;margin:16px auto 0;color:${MUT};font-size:17px;line-height:1.55;text-wrap:balance}
        .pl .hbtn{margin-top:24px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
        .pl .hero .img{width:400px;max-width:72%;display:block;margin:40px auto 0;position:relative;z-index:1}
        .pl .fl,.pl .fr{position:absolute;top:300px;display:flex;flex-direction:column;gap:70px;width:230px;z-index:2}
        .pl .fl{left:40px;text-align:left}.pl .fr{right:40px;text-align:left}
        .pl .ft{display:flex;flex-direction:column;gap:10px;font-size:14.5px;line-height:1.4;font-weight:500;color:${INK}}
        .pl .ft i{width:44px;height:44px;border-radius:50%;background:#fff7ec;display:grid;place-items:center;box-shadow:0 2px 8px rgba(0,0,0,.05)}
        .pl h2{font-weight:700;font-size:clamp(28px,3.6vw,40px);line-height:1.12;margin:0;letter-spacing:-1px;text-transform:none;font-style:normal;font-family:inherit}
        .pl .wrap.sec{padding:72px 28px 40px}
        .pl .about{display:grid;grid-template-columns:1fr 1fr;gap:50px;align-items:center}
        .pl .about p{color:${MUT};line-height:1.65;font-size:16px;margin:16px 0 22px}
        .pl .big{font-size:52px;font-weight:800;letter-spacing:-2px;line-height:1}.pl .bigl{color:${MUT};font-size:15px;margin-top:4px}
        .pl .col{display:grid;grid-template-columns:1.1fr 1fr;grid-template-rows:1fr 1fr;gap:12px;height:380px}
        .pl .col img{width:100%;height:100%;object-fit:cover;border-radius:16px;display:block}
        .pl .col img:first-child{grid-row:1/3}
        .pl .ctr{text-align:center}
        .pl .sv{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:34px}
        .pl .sv div{border-radius:18px;padding:30px 26px 34px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:12px}
        .pl .sv b{font-size:21px;font-weight:700}.pl .sv p{margin:0;font-size:15px;line-height:1.5;opacity:.92}
        .pl .sv a{margin-top:8px;font-weight:700;font-size:14px;color:inherit;border:1.5px solid currentColor;border-radius:999px;padding:9px 18px;text-decoration:none;cursor:pointer}
        .pl .tl{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:30px}
        .pl .tl img{width:100%;aspect-ratio:1.25;object-fit:cover;border-radius:14px;display:block}
        .pl .tlw .ln{height:1.5px;background:${INK};margin:22px 0 14px;position:relative}
        .pl .tlw .ln:before{content:"";position:absolute;left:0;top:-4px;width:9px;height:9px;border-radius:50%;background:${INK}}
        .pl .tlw:last-child .ln:after{content:"";position:absolute;right:0;top:-4px;width:9px;height:9px;border-right:1.5px solid ${INK};border-top:1.5px solid ${INK};transform:rotate(45deg)}
        .pl .tlw b{display:block;font-size:16px}
        .pl .tld{font-size:14px;color:${MUT};line-height:1.45;margin-top:4px}
        .pl .steps{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:40px;position:relative}
        .pl .steps:before{content:"";position:absolute;left:12%;right:12%;top:18px;height:2.5px;background:#b9a07f}
        .pl .st{text-align:center;position:relative;font-size:14px;color:${MUT};line-height:1.45}
        .pl .st i{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;margin:0 auto 14px;font-style:normal;font-weight:800;color:#fff;font-size:16px;position:relative}
        .pl .st b{display:block;color:${INK};font-size:16px;margin-bottom:4px}
        .pl .cta{display:grid;grid-template-columns:1fr 1.1fr;gap:34px;align-items:center;padding:0 0 60px}
        .pl .cta .ph{border-radius:20px;overflow:hidden;position:relative;aspect-ratio:1.2}
        .pl .cta .ph img{width:100%;height:100%;object-fit:cover;display:block}
        .pl .cta p{color:${MUT};line-height:1.6;font-size:16px;margin:14px 0 22px}
        .pl .foot{background:${INK};color:#d8cbbb;margin:0 12px 12px;border-radius:22px;padding:40px 34px;display:flex;justify-content:space-between;gap:30px;flex-wrap:wrap;font-size:14.5px;line-height:1.8}
        .pl .foot b{color:#fff}
        .pl .wa{position:fixed;right:18px;bottom:18px;z-index:40;width:58px;height:58px;border-radius:50%;background:#25d366;display:grid;place-items:center;box-shadow:0 8px 24px rgba(0,0,0,.3)}
        .pl .mmenu{position:absolute;top:78px;left:16px;right:16px;background:#fff;border-radius:16px;padding:10px;z-index:9;display:flex;flex-direction:column;box-shadow:0 12px 30px rgba(0,0,0,.15)}
        .pl .mmenu a{padding:14px;font-weight:600;cursor:pointer;color:${INK}}
        @media(max-width:980px){.pl .fl,.pl .fr{position:static;width:auto;flex-direction:row;gap:14px;margin-top:22px;text-align:left}.pl .fl .ft,.pl .fr .ft{flex:1}.pl .hero{min-height:0;padding-bottom:0}}
        @media(max-width:760px){
          .pl .links,.pl .nav .btn{display:none}.pl .burger{display:block}.pl .nav{padding:0 18px}
          .pl .about,.pl .cta{grid-template-columns:1fr;gap:28px}
          .pl .sv{grid-template-columns:1fr}
          .pl .tl{grid-template-columns:1fr 1fr;gap:22px 14px}
          .pl .steps{grid-template-columns:1fr 1fr;gap:26px 12px}.pl .steps:before{display:none}
          .pl .col{height:300px}
          .pl .hero{margin:0 8px;padding:40px 18px 0}
          .pl .fl,.pl .fr{flex-direction:column;gap:14px;margin-top:16px}
          .pl .wrap.sec{padding:56px 20px 24px}.pl .cta{padding:0 0 40px}
          .pl .wrap{padding-left:20px;padding-right:20px}
        }
      `}</style>

      <div className="page">
        <div className="nav" id="top">
          <div className="logo">{brand}</div>
          <div className="links"><a className="on">Início</a><a onClick={() => go("servicos")}>Serviços</a><a onClick={() => go("processo")}>Como funciona</a><a onClick={() => go("contato")}>Contato</a></div>
          <a className="btn s" href={wa()} target="_blank" rel="noreferrer">Pedir coleta</a>
          <button type="button" className="burger" aria-label="Menu" onClick={() => setMenu((m) => !m)}><svg width="26" height="26" viewBox="0 0 26 26" stroke={INK} strokeWidth="2"><path d="M3 7h20M3 13h20M3 19h20" /></svg></button>
          {menu && <div className="mmenu"><a onClick={() => go("servicos")}>Serviços</a><a onClick={() => go("processo")}>Como funciona</a><a onClick={() => go("contato")}>Contato</a></div>}
        </div>

        <div className="hero">
          <h1>Roupa limpa, passada e entregue no seu ritmo</h1>
          <p className="hs">Coleta e entrega em {city}. Você escolhe o horário, a gente cuida de cada peça.</p>
          <div className="hbtn"><a className="btn" href={wa()} target="_blank" rel="noreferrer">Pedir coleta →</a></div>
          <div className="fl">{FEATS_L.map((f) => (<div className="ft" key={f.t}><i><Ic d={f.ic} /></i>{f.t}</div>))}</div>
          <div className="fr">{FEATS_R.map((f) => (<div className="ft" key={f.t}><i><Ic d={f.ic} /></i>{f.t}</div>))}</div>
          <img className="img" src="/lav-hero.webp" alt="Mãos segurando uma pilha de roupas coloridas dobradas" />
        </div>

        <div className="wrap sec">
          <div className="about">
            <div>
              <h2>Muito além do que você espera de uma lavanderia</h2>
              <p>A {brand} cuida das suas roupas com o capricho de casa: separamos por cor e tecido, usamos produtos suaves e devolvemos tudo dobrado, cheiroso e no prazo combinado.</p>
              <div className="big">800+</div><div className="bigl">Clientes felizes por mês</div>
            </div>
            <div className="col"><img src="/lav-a1.webp" alt="Roupas no cabide e máquinas de lavar" loading="lazy" /><img src="/lav-a2.webp" alt="Atendente dobrando toalhas" loading="lazy" /><img src="/lav-a3.webp" alt="Mãos dobrando roupas coloridas" loading="lazy" /></div>
          </div>
        </div>

        <div className="wrap sec ctr" id="servicos">
          <h2>Serviços de lavanderia, entregues fresquinhos</h2>
          <div className="sv">
            {SERVICES.map((s) => (<div key={s.n} style={{ background: s.bg, color: s.fg }}><Ic d={s.ic} c={s.fg} s={44} /><b>{s.n}</b><p>{s.d}</p><a href={wa(`o serviço de ${s.n.toLowerCase()}`)} target="_blank" rel="noreferrer">Pedir agora</a></div>))}
          </div>
        </div>

        <div className="wrap sec">
          <h2>De uma lavanderia de bairro até o seu portão</h2>
          <div className="tl">
            {MILES.map((m) => (<div className="tlw" key={m.t}><img src={m.img} alt={m.t} loading="lazy" /><div className="ln" /><b>{m.t}</b><div className="tld">{m.d}</div></div>))}
          </div>
        </div>

        <div className="wrap sec ctr" id="processo">
          <h2>Um processo simples para roupa fresca toda vez</h2>
          <div className="steps">{STEPS.map((s, i) => (<div className="st" key={s.t}><i style={{ background: SC[i], color: i === 1 ? INK : "#fff" }}>{i + 1}</i><b>{s.t}</b>{s.d}</div>))}</div>
        </div>

        <div className="wrap sec" id="contato">
          <div className="cta">
            <div>
              <h2>Seu dia sem fila de lavanderia, com a {brand}</h2>
              <p>Mande uma mensagem, escolha o horário da coleta e receba tudo limpo, passado e dobrado em casa.</p>
              <a className="btn" href={wa()} target="_blank" rel="noreferrer">Falar no WhatsApp →</a>
            </div>
            <div className="ph"><img src="/lav-cta.webp" alt="Cliente sorrindo com roupas limpas dobradas" loading="lazy" /></div>
          </div>
        </div>

        <div className="foot">
          <div><b style={{ fontSize: 20 }}>{brand}</b><br />Lavanderia com coleta e entrega</div>
          <div><b>Endereço</b><br />Rua das Hortênsias, 215, {city}</div>
          <div><b>Horário</b><br />Seg a sáb, 7h às 21h · Dom, 8h às 14h</div>
          <div><b>Contato</b><br />WhatsApp: {phone || "(00) 00000-0000"}</div>
        </div>
      </div>
      {sc && <a className="wa" href={wa()} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 32 32" fill="#fff"><path d="M16 3a13 13 0 0 0-11 19.800L3 29l6.400-1.900A13 13 0 1 0 16 3zm0 2.400a10.600 10.600 0 1 1-5.400 19.700l-.4-.2-3.800 1.100 1.100-3.700-.3-.4A10.600 10.600 0 0 1 16 5.400zm-4 5.300c-.3 0-.7.100-1 .5-.4.400-1.300 1.300-1.300 3.100s1.300 3.600 1.500 3.800c.2.300 2.600 4.100 6.400 5.600 3.100 1.200 3.700 1 4.400.9.700-.1 2.200-.9 2.500-1.800.3-.9.3-1.600.2-1.800-.1-.2-.4-.3-.8-.5s-2.200-1.100-2.600-1.200c-.3-.1-.6-.2-.8.200-.3.400-.9 1.200-1.100 1.400-.2.300-.4.300-.8.100-.4-.2-1.600-.6-3-1.900-1.100-1-1.900-2.300-2.100-2.700-.2-.4 0-.6.200-.8l.6-.7c.2-.2.200-.4.400-.6.100-.3.100-.5 0-.7l-1.200-3c-.3-.7-.6-.7-.9-.7z" /></svg></a>}
    </div>
  );
}
