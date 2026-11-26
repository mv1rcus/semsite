import type { CSSProperties } from "react";
import { PHOTO, img } from "@/lib/premium-models";
import type { ModelClient } from "@/lib/site-models";
import { Btn, Foot, Sec, wa } from "@/components/PremiumSite";

type P = { n: string; c: ModelClient };
const grid = (min: number, gap = 20): CSSProperties => ({ display: "grid", gridTemplateColumns: `repeat(auto-fit,minmax(${min}px,1fr))`, gap });

/** Pôster: palavra gigante atrás do produto recortado, círculo, parallax em camadas. */
export function Poster({ n, c }: P) {
  const red = "#ef3b2d";
  return <div className="ps" style={{ background: "#0b0b0c", color: "#fff", fontFamily: "Inter,sans-serif" }}>
    
    <div style={{ position: "relative", height: "min(88vh,820px)", overflow: "hidden" }}>
      <div data-par="0.1" data-nopar style={{ position: "absolute", left: "50%", top: "46%", width: "min(54vw,520px)", aspectRatio: "1", marginLeft: "calc(min(54vw,520px) / -2)", marginTop: "calc(min(54vw,520px) / -2)", borderRadius: "50%", background: red }} />
      <div data-par="-0.12" style={{ position: "absolute", left: 0, right: 0, top: "12%", textAlign: "center", fontFamily: "Bebas Neue,sans-serif", fontSize: "clamp(120px,26vw,420px)", lineHeight: 0.86, letterSpacing: -2 }}>SMASH</div>
      <img data-nopar data-par="0.06" src="/vitrine-burger.webp" alt="" style={{ position: "absolute", left: "50%", top: "36%", width: "min(62vw,640px)", transform: "translateX(-50%)", filter: "drop-shadow(0 40px 50px rgba(0,0,0,.6))" }} data-base=" translateX(-50%)" />
      <div style={{ position: "absolute", left: "5vw", top: "30%", maxWidth: 220, fontSize: 13, opacity: 0.8, lineHeight: 1.6 }}>Duas carnes, queijo derretido e molho da casa. Pão tostado na hora.</div>
      <div style={{ position: "absolute", right: "5vw", bottom: 40, display: "flex", gap: 12, alignItems: "center" }}><b style={{ fontFamily: "Bebas Neue,sans-serif", fontSize: 46 }}>R$ 34,90</b><Btn href={wa(c)} bg="transparent" fg="#fff" style={{ border: "1px solid #fff" }}>Pedir agora ↗</Btn></div>
      <div style={{ position: "absolute", left: "5vw", bottom: 40, fontSize: 12, letterSpacing: 3, opacity: 0.6 }}>01 / 04 · ROLE PARA VER</div></div>
    <Sec style={{ ...grid(240, 18) }}>{[[PHOTO.burger2, "Duplo Rústico", "36,90"], [PHOTO.burger3, "Gourmet Sésamo", "32,90"], [PHOTO.burger5, "Bacon Egg", "38,90"]].map(([p, t, v]) => <div key={t} style={{ background: "#151517", borderRadius: 24, overflow: "hidden" }}><img data-nopar src={img(p!, 700, 520)} alt="" style={{ width: "100%", height: 220, objectFit: "cover" }} /><div style={{ padding: 20, display: "flex", justifyContent: "space-between", fontWeight: 800 }}><span>{t}</span><span style={{ color: red }}>R$ {v}</span></div></div>)}</Sec>
    </div>;
}

export function Pet({ n, c }: P) {
  const o = "#ff7a1a";
  return <div className="ps" style={{ background: "#fff4d6", color: "#1d2b64", fontFamily: "Inter,sans-serif" }}>
    
    <div style={{ position: "relative", height: "min(84vh,760px)", overflow: "hidden" }}>
      <div data-par="-0.1" style={{ position: "absolute", left: 0, right: 0, top: "8%", textAlign: "center", fontFamily: "Bebas Neue,sans-serif", fontSize: "clamp(140px,30vw,480px)", lineHeight: 0.85, color: o }}>PET</div>
      <img data-nopar data-par="0.05" src="/vitrine-dog.webp" alt="" style={{ position: "absolute", left: "50%", bottom: 0, width: "min(58vw,620px)", transform: "translateX(-50%)" }} data-base=" translateX(-50%)" />
      <p style={{ position: "absolute", left: "5vw", bottom: 60, maxWidth: 260, lineHeight: 1.6 }}>Banho e tosa, veterinário e tudo pro seu melhor amigo{c.city ? ` em ${c.city}` : ""}.</p></div>
    <Sec style={{ ...grid(220, 18), background: "#1d2b64", color: "#fff" }}>{[["🛁", "Banho e tosa", "a partir de R$ 50"], ["🩺", "Consultas", "R$ 120"], ["🦴", "Pet shop", "rações e petiscos"], ["🏠", "Hotelzinho", "diária R$ 70"]].map(([e, t, d]) => <div key={t} style={{ background: "#273a86", borderRadius: 24, padding: 26 }}><div style={{ fontSize: 40 }}>{e}</div><b style={{ fontSize: 20 }}>{t}</b><p style={{ opacity: 0.7, marginTop: 6 }}>{d}</p></div>)}</Sec>
    </div>;
}

export function Salao({ n, c }: P) {
  const ro = "#b5546b"; const sv = [["Corte e escova", "90"], ["Coloração", "180"], ["Mechas e luzes", "320"], ["Hidratação profunda", "80"], ["Manicure e pedicure", "60"]];
  return <div className="ps" style={{ background: "#fbf3f1", color: "#3a1f27", fontFamily: "Inter,sans-serif" }}>
    
    <div style={{ ...grid(300, 24), padding: "30px 5vw 70px", alignItems: "end" }}>
      <img data-nopar src={img(PHOTO.salon, 900, 1200)} alt="" style={{ width: "100%", height: 560, objectFit: "cover", borderRadius: "400px 400px 0 0" }} />
      <div style={{ paddingBottom: 30 }}><h1 style={{ fontFamily: "Playfair Display,serif", fontSize: "clamp(44px,5.6vw,84px)", fontWeight: 500, lineHeight: 1.02 }}>Realce o que<br />já é <i style={{ color: ro }}>seu.</i></h1><p style={{ margin: "20px 0 28px", opacity: 0.7, lineHeight: 1.7, maxWidth: 380 }}>Cabelo, unhas e cuidado com a pele num espaço pensado pra você relaxar.</p><Btn href={wa(c)} bg={ro} fg="#fff">Agendar pelo WhatsApp</Btn></div>
      <img data-nopar src={img(PHOTO.clinic, 800, 1000)} alt="" style={{ width: "100%", height: 420, objectFit: "cover", borderRadius: "300px 300px 0 0", opacity: 0.9 }} /></div>
    <Sec style={{ background: "#f3dfe0" }}><div style={{ maxWidth: 720, margin: "0 auto" }}><h2 style={{ fontFamily: "Playfair Display,serif", fontSize: 42, fontWeight: 500, textAlign: "center", marginBottom: 34 }}>Serviços</h2>{sv.map(([t, p]) => <div key={t} style={{ display: "flex", gap: 14, padding: "16px 0", borderBottom: "1px solid #dcb9bd", fontSize: 19 }}><span>{t}</span><i style={{ flex: 1 }} /><b style={{ color: ro }}>R$ {p}</b></div>)}</div></Sec>
    </div>;
}

export function Advocacia({ n, c }: P) {
  const g = "#c9a24b"; const ar = [["Direito de Família", "Divórcio, pensão e guarda"], ["Trabalhista", "Defesa de direitos do trabalhador"], ["Cível", "Contratos e indenizações"], ["Previdenciário", "Aposentadoria e benefícios"]];
  return <div className="ps" style={{ background: "#0e1a2e", color: "#eef1f6", fontFamily: "Inter,sans-serif" }}>
    
    <div style={{ position: "relative", minHeight: 640, display: "flex", alignItems: "center" }}><img data-par="0.1" src={img(PHOTO.law, 1800)} alt="" style={{ position: "absolute", inset: "-8% 0", width: "100%", height: "116%", objectFit: "cover", opacity: 0.45 }} /><div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,#0e1a2e 15%,transparent)" }} />
      <div style={{ position: "relative", padding: "0 6vw", maxWidth: 760 }}><p style={{ color: g, letterSpacing: 5, fontSize: 12 }}>ADVOCACIA{c.city ? ` · ${c.city.toUpperCase()}` : ""}</p><h1 style={{ fontFamily: "Playfair Display,serif", fontSize: "clamp(44px,6vw,84px)", fontWeight: 500, lineHeight: 1.05, margin: "18px 0 26px" }}>Seus direitos, defendidos com <i style={{ color: g }}>firmeza.</i></h1><Btn href={wa(c)} bg={g} fg="#0e1a2e" style={{ borderRadius: 2 }}>Falar com um advogado</Btn></div></div>
    <Sec id="a"><div style={grid(240, 22)}>{ar.map(([t, d]) => <div key={t} style={{ border: "1px solid #2a4064", padding: 30 }}><div style={{ width: 36, height: 2, background: g, marginBottom: 18 }} /><p style={{ fontFamily: "Playfair Display,serif", fontSize: 24 }}>{t}</p><p style={{ opacity: 0.65, marginTop: 8, lineHeight: 1.6 }}>{d}</p></div>)}</div></Sec>
    </div>;
}

export function Oficina({ n, c }: P) {
  const y = "#ffc61a"; const sv = [["Revisão completa", "a partir de R$ 280"], ["Troca de óleo", "R$ 140"], ["Freios", "a partir de R$ 220"], ["Suspensão e alinhamento", "R$ 160"], ["Ar-condicionado", "R$ 190"], ["Diagnóstico eletrônico", "R$ 120"]];
  return <div className="ps" style={{ background: "#111", color: "#fff", fontFamily: "Inter,sans-serif" }}>
    
    <div style={{ ...grid(340, 0), minHeight: 600 }}><div style={{ padding: "7vw 5vw", display: "flex", flexDirection: "column", justifyContent: "center" }}><h1 style={{ fontFamily: "Oswald,sans-serif", fontSize: "clamp(52px,7vw,104px)", lineHeight: 0.98 }}>SEU CARRO<br /><span style={{ color: y }}>EM BOAS MÃOS.</span></h1><p style={{ opacity: 0.7, margin: "22px 0 30px", maxWidth: 420, lineHeight: 1.6 }}>Mecânica geral{c.city ? ` em ${c.city}` : ""}, orçamento transparente e peças com garantia.</p><div><Btn href={wa(c)} bg={y} fg="#111" style={{ borderRadius: 4 }}>Pedir orçamento</Btn></div></div>
      <div style={{ position: "relative", overflow: "hidden" }}><img src={img(PHOTO.engine, 1300, 1000)} alt="" style={{ position: "absolute", inset: "-8% 0", width: "100%", height: "116%", objectFit: "cover" }} /></div></div>
    <Sec style={{ background: "#1a1a1a" }}><h2 style={{ fontFamily: "Oswald,sans-serif", fontSize: 44, marginBottom: 30 }}>NOSSOS <span style={{ color: y }}>SERVIÇOS</span></h2><div style={grid(260, 16)}>{sv.map(([t, p], i) => <div key={t} style={{ background: "#232323", borderLeft: `5px solid ${y}`, padding: 22 }}><small style={{ color: y }}>0{i + 1}</small><p style={{ fontWeight: 700, fontSize: 19, margin: "4px 0" }}>{t}</p><p style={{ opacity: 0.6 }}>{p}</p></div>)}</div></Sec>
    </div>;
}

export function Imobiliaria({ n, c }: P) {
  const gr = "#2f6f5e"; const im = [[PHOTO.house, "Casa moderna, 3 quartos", "R$ 890.000"], [PHOTO.terrace, "Cobertura com varanda", "R$ 1.250.000"], [PHOTO.salon, "Apartamento 2 quartos", "R$ 4.200/mês"]];
  return <div className="ps" style={{ background: "#f6f7f4", color: "#16221d", fontFamily: "Inter,sans-serif" }}>
    <div style={{ position: "relative", minHeight: 700, color: "#fff", display: "flex", flexDirection: "column", overflow: "hidden" }}><img data-par="0.12" src={img(PHOTO.house, 1900)} alt="" style={{ position: "absolute", inset: "-8% 0", width: "100%", height: "116%", objectFit: "cover" }} /><div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,.45),rgba(0,0,0,.2) 50%,rgba(0,0,0,.6))" }} />
      
      <div style={{ position: "relative", margin: "auto 5vw 70px" }}><h1 style={{ fontFamily: "Fraunces,serif", fontSize: "clamp(44px,6.4vw,96px)", fontWeight: 400, lineHeight: 1, maxWidth: 800 }}>Encontre o lugar <i>onde a vida acontece.</i></h1>
        <div style={{ background: "#fff", color: "#16221d", borderRadius: 20, padding: 14, display: "flex", gap: 10, flexWrap: "wrap", marginTop: 32, maxWidth: 760 }}>{["Comprar", c.city ?? "Cidade", "Qualquer valor"].map((t) => <span key={t} style={{ flex: 1, minWidth: 140, padding: "14px 16px", background: "#f1f3ee", borderRadius: 12 }}>{t}</span>)}<Btn href={wa(c)} bg={gr} fg="#fff" style={{ borderRadius: 12 }}>Buscar</Btn></div></div></div>
    <Sec><h2 style={{ fontFamily: "Fraunces,serif", fontSize: 40, fontWeight: 400, marginBottom: 28 }}>Imóveis em destaque</h2><div style={grid(280, 22)}>{im.map(([p, t, v]) => <div key={t} style={{ background: "#fff", borderRadius: 20, overflow: "hidden" }}><img data-nopar src={img(p!, 800, 560)} alt="" style={{ width: "100%", height: 230, objectFit: "cover" }} /><div style={{ padding: 20 }}><p style={{ fontWeight: 700, fontSize: 18 }}>{t}</p><p style={{ color: gr, fontWeight: 800, marginTop: 6 }}>{v}</p></div></div>)}</div></Sec>
    </div>;
}
