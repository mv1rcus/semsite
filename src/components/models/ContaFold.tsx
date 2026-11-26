import { useEffect, useState } from "react";

/** Contabilidade, construida do zero a partir de um pin em azul-marinho profundo e ambar. Diagnostico gratuito que fecha no WhatsApp. */
const NV = "#0b1526", NV2 = "#101f38", NV3 = "#16294a", AM = "#f2a33c", AM2 = "#e08f1d", CRM = "#f6f4ef", INK = "#182338", GR = "#5b6b85";
const AUD = [
  { t: "Pequenas e Médias Empresas", d: "Operação completa e indicadores claros", i: "M6 26h20M8 26V10l8-5 8 5v16M13 26v-6h6v6" },
  { t: "MEIs em Crescimento", d: "Saída do informal sem sustos", i: "M6 24L24 6M8 8a2 2 0 1 0 0 .1M24 24a2 2 0 1 0 0-.1" },
  { t: "Prestadores de Serviço", d: "Impostos sob controle e pró-labore certo", i: "M9 5h10l4 5v14H9zM13 14l3 3 5-6" },
  { t: "Profissionais Liberais", d: "Pessoa jurídica organizada desde o início", i: "M16 7a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM6 25c1-5 5-7 10-7s9 2 10 7" },
  { t: "E-commerces", d: "Notas, marketplaces e margem real", i: "M5 12h22v14H5zM5 17h22M9 23h6" },
];
const SERV = [
  { t: "Contábil", d: "Escrituração completa, balancetes mensais e demonstrativos sempre em dia.", i: "M7 4h14v22H7zM11 9h6M11 14h6M11 19h4" },
  { t: "Fiscal", d: "Apuração de impostos e obrigações acessórias sem multa e sem surpresa.", i: "M9 5h10l4 5v14H9zM13 14l3 3 5-6" },
  { t: "Folha de Pagamento", d: "Admissão, pró-labore, férias e encargos calculados com precisão.", i: "M16 7a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM6 25c1-5 5-7 10-7s9 2 10 7" },
  { t: "Planejamento Tributário", d: "Enquadramento revisado todo ano para pagar só o que deve.", i: "M6 24L24 6M8 8a2 2 0 1 0 0 .1M24 24a2 2 0 1 0 0-.1" },
  { t: "Abertura de Empresa", d: "CNPJ, alvarás e enquadramento certos desde o primeiro dia.", i: "M6 26h20M8 26V10l8-5 8 5v16M13 26v-6h6v6" },
  { t: "BPO Financeiro", d: "Contas a pagar e receber, conciliação e relatórios gerenciais.", i: "M5 12h22v14H5zM5 17h22M9 23h6" },
];
const FAQ = [
  { q: "Quanto custa a contabilidade mensal?", a: "Depende do porte e do regime tributário. MEIs começam em planos enxutos; empresas em crescimento têm escopo sob medida. O diagnóstico gratuito fecha a proposta em até 24h." },
  { q: "Vocês trocam a minha contabilidade atual?", a: "Sim. Cuidamos de toda a transição: pedimos os livros e documentos ao contador anterior, sem você precisar se envolver." },
  { q: "Como funciona o diagnóstico gratuito?", a: "Analisamos CNPJ, regime tributário e últimos impostos pagos. Em uma call de 30 minutos mostramos riscos e oportunidades de economia, sem compromisso." },
  { q: "Atendem empresas de outras cidades?", a: "Sim, o atendimento é 100% digital com reuniões por videochamada e documentos por e-mail e WhatsApp." },
];
const TESTI = [
  { n: "Paulo Menezes", r: "Distribuidora PM, São Paulo", t: "A Vetor encontrou um enquadramento errado que vinha dos últimos três anos. Economizamos mais de R$ 4 mil por mês sem mudar nada da operação." },
  { n: "Juliana Castro", r: "Studio de design, Belo Horizonte", t: "Saí do MEI para uma LTDA com eles cuidando de tudo. Zero burocracia do meu lado e imposto menor do que eu pagava como autônoma." },
  { n: "Rodrigo Alves", r: "Loja online, Curitiba", t: "O BPO financeiro me devolveu as sextas-feiras. Conciliação, notas e relatório pronto toda segunda de manhã." },
];
const CHECK = "M7 16l6 6L26 9";
const CAL = "M6 8h20v18H6zM6 13h20M11 4v5M21 4v5";
const Ic = ({ d, s = 22, c = "currentColor" }: { d: string; s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);

export function ContaFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Vetor Contabilidade";
  const city = client?.city?.trim() || "São Paulo";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const num = phone ? (phone.startsWith("55") ? phone : `55${phone}`) : "5500000000000";
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  const [faq, setFaq] = useState(-1);
  useEffect(() => { const f = () => setSc(window.scrollY > 40); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  const wa = `https://wa.me/${num}?text=${encodeURIComponent(`Oi! Quero agendar um diagnóstico gratuito com a ${brand}.`)}`;
  const nav: [string, string][] = [["Serviços", "serv"], ["Diferenciais", "dif"], ["Metodologia", "met"], ["Equipe", "eq"], ["FAQ", "faq"]];
  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenu(false); };
  const serif = "Fraunces, Georgia, serif";

  return (
    <div className="cta" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: INK, background: CRM, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;1,9..144,500;1,9..144,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .cta *{box-sizing:border-box;margin:0}
        .cta img{display:block;max-width:100%}
        .cta h1,.cta h2,.cta h3,.cta h4,.cta strong,.cta button,.cta a{font-family:'Plus Jakarta Sans',system-ui,sans-serif}
        .cta .wrap{max-width:1140px;margin:0 auto;padding:0 22px}
        .cta .btn-a{display:inline-flex;align-items:center;gap:9px;background:${AM};color:${NV};font-weight:800;font-size:15.5px;padding:14px 26px;border-radius:10px;border:none;cursor:pointer;text-decoration:none;transition:.2s}
        .cta .btn-a:hover{background:${AM2};transform:translateY(-1px)}
        .cta .btn-o{display:inline-flex;align-items:center;gap:9px;background:transparent;color:#fff;font-weight:700;font-size:15.5px;padding:14px 26px;border-radius:10px;border:1.5px solid rgba(255,255,255,.35);cursor:pointer;text-decoration:none;transition:.2s}
        .cta .btn-o:hover{border-color:${AM};color:${AM}}
        .cta .eyebrow{display:inline-flex;align-items:center;gap:8px;color:${AM};font-weight:700;font-size:12px;letter-spacing:2.5px;text-transform:uppercase}
        .cta .eyebrow::before{content:"●";font-size:8px}
        .cta .eyebrow.lite{color:#c07a16}
        .cta .hov{transition:transform .2s,box-shadow .2s,border-color .2s}
        .cta .hov:hover{transform:translateY(-4px);box-shadow:0 18px 40px -22px rgba(11,21,38,.4);border-color:rgba(242,163,60,.55)!important}
        .cta h2{font-size:clamp(26px,3.4vw,36px);font-weight:800;letter-spacing:-.5px}
        .cta .navlink{background:none;border:none;font:inherit;font-weight:600;font-size:13px;letter-spacing:1.2px;color:#cdd8ea;cursor:pointer;padding:6px 2px;text-transform:uppercase}
        .cta .navlink:hover{color:${AM}}
        @media(max-width:900px){.cta .hgrid{grid-template-columns:1fr !important}.cta .nav-d{display:none !important}}
        @media(min-width:901px){.cta .nav-m{display:none !important}}
      `}</style>

      {/* header */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: sc ? "rgba(11,21,38,.96)" : NV, backdropFilter: "blur(8px)", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", gap: 26, height: 70 }}>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", font: "inherit" }} aria-label="Início">
            <span style={{ width: 38, height: 38, borderRadius: 10, background: AM, display: "grid", placeItems: "center" }}><Ic d="M8 24V14M14 24V9M20 24v-7M26 24V5" s={20} c={NV} /></span>
            <span style={{ textAlign: "left", lineHeight: 1.1, color: "#fff" }}>
              <strong style={{ fontSize: 16.5, fontWeight: 800, letterSpacing: "-.2px" }}>{brand}</strong><br />
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: AM }}>CONTABILIDADE</span>
            </span>
          </button>
          <nav className="nav-d" style={{ display: "flex", gap: 20, marginLeft: "auto" }}>
            {nav.map(([l, id]) => <button key={id} className="navlink" onClick={() => go(id)}>{l}</button>)}
          </nav>
          <span className="nav-d" style={{ color: "#cdd8ea", fontSize: 13.5, fontWeight: 600 }}>(11) 99999-9999</span>
          <a href={wa} target="_blank" rel="noreferrer" className="btn-a nav-d" style={{ padding: "11px 20px", fontSize: 13.5 }}>Diagnóstico Gratuito</a>
          <button className="nav-m" onClick={() => setMenu(!menu)} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "#fff" }} aria-label="Menu"><Ic d="M5 9h22M5 16h22M5 23h22" s={26} /></button>
        </div>
        {menu && <div style={{ background: NV2, borderTop: "1px solid rgba(255,255,255,.08)", padding: "10px 22px 18px", display: "grid", gap: 4 }}>
          {nav.map(([l, id]) => <button key={id} className="navlink" style={{ textAlign: "left", padding: "11px 0" }} onClick={() => go(id)}>{l}</button>)}
          <a href={wa} target="_blank" rel="noreferrer" className="btn-a" style={{ justifyContent: "center", marginTop: 8 }}>Diagnóstico Gratuito</a>
        </div>}
      </header>

      {/* hero */}
      <section style={{ position: "relative", background: NV, color: "#fff", padding: "72px 0 80px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(900px 520px at 82% 8%, rgba(242,163,60,.24), transparent 62%), radial-gradient(560px 420px at 74% 46%, rgba(242,163,60,.1), transparent 65%), radial-gradient(700px 500px at 10% 100%, rgba(38,64,110,.5), transparent 65%), linear-gradient(160deg, #0d1930, #0b1526 55%, #091120)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)", backgroundSize: "56px 56px", maskImage: "radial-gradient(ellipse at 60% 40%, black 30%, transparent 75%)" }} />
        <div className="wrap hgrid" style={{ position: "relative", display: "grid", gridTemplateColumns: "1.08fr .92fr", gap: 48, alignItems: "center" }}>
          <div>
            <span className="eyebrow">Atendimento Premium</span>
            <h1 style={{ fontSize: "clamp(34px,5vw,56px)", fontWeight: 800, letterSpacing: "-1.2px", lineHeight: 1.08, margin: "18px 0 18px" }}>
              Contabilidade <em style={{ fontFamily: serif, fontStyle: "italic", fontWeight: 600, color: AM }}>estratégica</em> para proteger seu negócio.
            </h1>
            <p style={{ color: "#b9c6dd", fontSize: 16.5, lineHeight: 1.65, maxWidth: 500 }}>Gestão contábil, fiscal e financeira clara, organizada e sem surpresas. Traduzimos números em crescimento real para sua empresa.</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", margin: "28px 0 26px" }}>
              <a href={wa} target="_blank" rel="noreferrer" className="btn-a">Agendar Consulta →</a>
              <button className="btn-o" onClick={() => go("serv")}>Conhecer Especialidades →</button>
            </div>
            <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
              {["CRC Ativo", "+500 Empresas", `${city}`].map((t) => (
                <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 700, color: "#cdd8ea" }}>
                  <Ic d={CHECK} s={14} c={AM} />{t}
                </span>
              ))}
            </div>
          </div>
          {/* dashboard card */}
          <div style={{ background: "rgba(16,31,56,.92)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 22, padding: "26px 24px", boxShadow: "0 30px 70px -30px rgba(0,0,0,.7)", backdropFilter: "blur(6px)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: 1.8, color: AM }}>ANÁLISE DOS ÚLTIMOS 6 MESES</span>
              <span style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(242,163,60,.15)", display: "grid", placeItems: "center" }}><Ic d="M6 24L13 15l5 6 8-12" s={17} c={AM} /></span>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 130, padding: "0 4px" }}>
                {[42, 58, 50, 72, 66, 92].map((h, i) => (
                  <div key={i} style={{ flex: 1, display: "grid", alignItems: "end", height: "100%" }}>
                    <div style={{ height: `${h}%`, borderRadius: "7px 7px 3px 3px", background: i === 5 ? AM : "rgba(255,255,255,.16)", border: i === 5 ? "none" : "1px solid rgba(255,255,255,.22)" }} />
                  </div>
                ))}
              </div>
              <svg viewBox="0 0 300 130" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} aria-hidden>
                <path d="M10 96 L70 78 L130 84 L190 60 L250 52 L295 22" fill="none" stroke="#f2a33c" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 7" />
              </svg>
              <div style={{ display: "flex", gap: 12, padding: "8px 4px 0" }}>
                {["JUN", "JUL", "AGO", "SET", "OUT", "NOV"].map((m) => <span key={m} style={{ flex: 1, textAlign: "center", fontSize: 10, fontWeight: 700, letterSpacing: 1, color: "#8fa1c0" }}>{m}</span>)}
              </div>
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,.1)", marginTop: 20, paddingTop: 18 }}>
              <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: 1.8, color: "#8fa1c0" }}>PERFORMANCE GLOBAL</span>
              <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-1px", color: "#fff", margin: "4px 0 2px" }}>98.4%</div>
              <span style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: 1, color: AM }}>● ÍNDICE DE RETENÇÃO DE CLIENTES</span>
            </div>
          </div>
        </div>
      </section>

      {/* publico-alvo */}
      <section style={{ padding: "88px 0", background: "#fff" }}>
        <div className="wrap" style={{ textAlign: "center" }}>
          <span className="eyebrow lite">Público-Alvo</span>
          <h2 style={{ marginTop: 12 }}>Soluções pensadas para o seu modelo de negócio</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center", marginTop: 32 }}>
            {AUD.map((a) => (
              <div key={a.t} className="hov" style={{ display: "flex", alignItems: "center", gap: 12, background: CRM, border: "1px solid #e7e2d6", borderRadius: 14, padding: "14px 20px", textAlign: "left", maxWidth: 320 }}>
                <span style={{ width: 38, height: 38, borderRadius: 10, background: NV, display: "grid", placeItems: "center", flexShrink: 0 }}><Ic d={a.i} s={17} c={AM} /></span>
                <span><strong style={{ fontSize: 14, display: "block" }}>{a.t}</strong><span style={{ fontSize: 12, color: GR }}>{a.d}</span></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* servicos */}
      <section id="serv" style={{ padding: "64px 0" }}>
        <div className="wrap">
          <span className="eyebrow lite">Especialidades</span>
          <h2 style={{ marginTop: 12 }}>Tudo que a sua empresa precisa, num só lugar</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18, marginTop: 34 }}>
            {SERV.map((s) => (
              <article key={s.t} className="hov" style={{ background: "#fff", borderRadius: 18, padding: "26px 24px", border: "1px solid #e7e2d6", transition: ".2s", boxShadow: "0 10px 30px -24px rgba(11,21,38,.35)" }}>
                <span style={{ width: 46, height: 46, borderRadius: 13, background: "rgba(242,163,60,.14)", border: "1px solid rgba(242,163,60,.4)", display: "grid", placeItems: "center", marginBottom: 16 }}><Ic d={s.i} s={22} c={AM2} /></span>
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>{s.t}</h3>
                <p style={{ fontSize: 14.5, color: GR, lineHeight: 1.6 }}>{s.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* diferenciais + metodologia */}
      <section id="dif" style={{ background: NV, color: "#fff", padding: "72px 0" }}>
        <div className="wrap">
          <span className="eyebrow">Diferenciais</span>
          <h2 style={{ marginTop: 12, maxWidth: 560 }}>Por que empresas ficam com a {brand}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 18, marginTop: 34 }}>
            {[
              { v: "24h", t: "Resposta garantida", d: "Toda mensagem respondida em até um dia útil." },
              { v: "0", t: "Multas por atraso", d: "Calendário de obrigações monitorado por nós." },
              { v: "100%", t: "Digital", d: "Documentos e relatórios na nuvem, sem papelada." },
              { v: "+12", t: "Anos de mercado", d: "Time sênior com CRC ativo e especializações." },
            ].map((d) => (
              <div key={d.t} style={{ background: NV2, border: "1px solid rgba(255,255,255,.1)", borderRadius: 18, padding: "26px 22px" }}>
                <div style={{ fontSize: 34, fontWeight: 800, color: AM, letterSpacing: "-1px" }}>{d.v}</div>
                <div style={{ fontSize: 15, fontWeight: 800, margin: "8px 0 6px" }}>{d.t}</div>
                <p style={{ fontSize: 13.5, color: "#b9c6dd", lineHeight: 1.6 }}>{d.d}</p>
              </div>
            ))}
          </div>
          <div id="met" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 18, marginTop: 44 }}>
            {[
              { n: "01", t: "Diagnóstico", d: "Analisamos CNPJ, regime e impostos para achar riscos e economia." },
              { n: "02", t: "Plano de ação", d: "Proposta clara de escopo, prazos e valores, sem letra miúda." },
              { n: "03", t: "Rotina tranquila", d: "Obrigações em dia, relatórios mensais e um canal direto com o seu contador." },
            ].map((m) => (
              <div key={m.n} style={{ borderLeft: `3px solid ${AM}`, padding: "6px 0 6px 18px" }}>
                <span style={{ fontFamily: serif, fontStyle: "italic", color: AM, fontSize: 22 }}>{m.n}</span>
                <h3 style={{ fontSize: 17, fontWeight: 800, margin: "6px 0" }}>{m.t}</h3>
                <p style={{ fontSize: 13.5, color: "#b9c6dd", lineHeight: 1.6 }}>{m.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* equipe */}
      <section id="eq" style={{ padding: "72px 0" }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 48, alignItems: "center" }}>
          <div>
            <span className="eyebrow lite">Equipe</span>
            <h2 style={{ margin: "12px 0 16px" }}>Gente que entende de número e de negócio</h2>
            <p style={{ color: GR, fontSize: 15.5, lineHeight: 1.7, marginBottom: 14 }}>A {brand} nasceu em {city} com uma convicção: contabilidade boa é a que o dono da empresa entende. Nada de relatório engavetado.</p>
            <p style={{ color: GR, fontSize: 15.5, lineHeight: 1.7, marginBottom: 22 }}>Cada cliente tem um contador de referência, que conhece a operação e responde direto, sem central de atendimento.</p>
            <div style={{ display: "grid", gap: 10 }}>
              {["CRC ativo e regularizado", "Contador de referência por cliente", "Relatórios mensais em linguagem simples"].map((t) => (
                <span key={t} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14.5, fontWeight: 600 }}>
                  <span style={{ width: 24, height: 24, borderRadius: "50%", background: AM, display: "grid", placeItems: "center", flexShrink: 0 }}><Ic d={CHECK} s={13} c={NV} /></span>{t}
                </span>
              ))}
            </div>
            <a href={wa} target="_blank" rel="noreferrer" className="btn-a" style={{ marginTop: 26 }}>Falar com um contador</a>
          </div>
          <div style={{ maxWidth: 440, margin: "0 auto", width: "100%" }}>
            <div style={{ background: NV, borderRadius: 22, padding: "34px 30px", color: "#fff", boxShadow: "0 26px 60px -26px rgba(11,21,38,.55)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(500px 260px at 90% 0%, rgba(242,163,60,.16), transparent 60%)" }} />
              <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 16, marginBottom: 22 }}>
                <img src="/vetor-socio.webp" alt="Ricardo Nunes, sócio-fundador" style={{ width: 66, height: 66, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "2px solid rgba(242,163,60,.55)" }} />
                <span><strong style={{ fontSize: 17, display: "block" }}>Ricardo Nunes</strong><span style={{ fontSize: 13, color: AM, fontWeight: 700 }}>Sócio-fundador · CRC-SP</span></span>
              </div>
              <p style={{ position: "relative", fontFamily: serif, fontStyle: "italic", fontSize: 19, lineHeight: 1.5, color: "#dbe4f3", marginBottom: 22 }}>"Contabilidade boa é a que o dono da empresa entende. O resto é papelada."</p>
              <div style={{ position: "relative", display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
                {["CRC-SP ativo", "+12 anos de mercado", "Atendimento digital"].map((c) => <span key={c} style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: .6, color: AM, border: "1px solid rgba(242,163,60,.45)", borderRadius: 999, padding: "6px 12px" }}>{c}</span>)}
              </div>
              <div style={{ position: "relative", display: "flex", alignItems: "flex-end", gap: 8, height: 56 }}>
                {[38, 55, 46, 70, 62, 88].map((h, i) => <span key={i} style={{ width: 22, height: `${h}%`, borderRadius: "5px 5px 2px 2px", background: i === 5 ? AM : "rgba(242,163,60,.25)", border: i === 5 ? "none" : "1px solid rgba(242,163,60,.4)" }} />)}
                <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 700, letterSpacing: 1.5, color: "#8fa1c0" }}>CRESCIMENTO<br />DOS CLIENTES</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* depoimentos */}
      <section style={{ background: "#fff", padding: "72px 0" }}>
        <div className="wrap">
          <span className="eyebrow lite">Clientes</span>
          <h2 style={{ marginTop: 12 }}>Quem confia, recomenda</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: 20, marginTop: 34 }}>
            {TESTI.map((t) => (
              <figure key={t.n} className="hov" style={{ background: CRM, borderRadius: 18, padding: "26px 24px", border: "1px solid #e7e2d6", display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ color: AM, fontSize: 15, letterSpacing: 2 }}>★★★★★</div>
                <blockquote style={{ fontSize: 14.5, lineHeight: 1.65, color: "#3c4b66" }}>"{t.t}"</blockquote>
                <figcaption style={{ display: "flex", alignItems: "center", gap: 12, marginTop: "auto" }}>
                  <span style={{ width: 46, height: 46, borderRadius: "50%", background: NV, color: AM, display: "grid", placeItems: "center", fontWeight: 800, fontSize: 15, flexShrink: 0 }}>{t.n.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span>
                  <span><strong style={{ fontSize: 14.5 }}>{t.n}</strong><br /><span style={{ fontSize: 12.5, color: GR }}>{t.r}</span></span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* faq */}
      <section id="faq" style={{ padding: "72px 0" }}>
        <div className="wrap" style={{ maxWidth: 780 }}>
          <span className="eyebrow lite">FAQ</span>
          <h2 style={{ margin: "12px 0 28px" }}>Perguntas frequentes</h2>
          <div style={{ display: "grid", gap: 12 }}>
            {FAQ.map((f, i) => (
              <div key={f.q} style={{ background: "#fff", border: "1px solid #e7e2d6", borderRadius: 14, overflow: "hidden" }}>
                <button onClick={() => setFaq(faq === i ? -1 : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, background: "none", border: "none", cursor: "pointer", font: "inherit", textAlign: "left", padding: "18px 20px", fontWeight: 700, fontSize: 15.5, color: INK }}>
                  {f.q}
                  <span style={{ color: AM2, fontSize: 22, fontWeight: 400, transform: faq === i ? "rotate(45deg)" : "none", transition: ".2s" }}>+</span>
                </button>
                {faq === i && <p style={{ padding: "0 20px 18px", fontSize: 14.5, color: GR, lineHeight: 1.65 }}>{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* cta */}
      <section style={{ background: NV, padding: "72px 0", color: "#fff", textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: 640 }}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>Diagnóstico Gratuito</span>
          <h2 style={{ margin: "14px 0 16px" }}>Descubra se a sua empresa paga imposto a mais</h2>
          <p style={{ color: "#b9c6dd", fontSize: 15.5, lineHeight: 1.7, marginBottom: 28 }}>Em 30 minutos mostramos riscos, economia possível e o caminho para uma contabilidade sem sustos.</p>
          <a href={wa} target="_blank" rel="noreferrer" className="btn-a" style={{ fontSize: 16, padding: "16px 32px" }}><Ic d={CAL} s={19} c={NV} />Agendar diagnóstico gratuito</a>
        </div>
      </section>

      {/* footer */}
      <footer style={{ background: "#070e1b", color: "#8fa1c0", padding: "48px 0 0" }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 30, paddingBottom: 32 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span style={{ width: 38, height: 38, borderRadius: 10, background: AM, display: "grid", placeItems: "center" }}><Ic d="M8 24V14M14 24V9M20 24v-7M26 24V5" s={20} c={NV} /></span>
              <span style={{ lineHeight: 1.1, color: "#fff" }}><strong style={{ fontSize: 16, fontWeight: 800 }}>{brand}</strong><br /><span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: AM }}>CONTABILIDADE</span></span>
            </div>
            <p style={{ fontSize: 13.5, lineHeight: 1.65 }}>Contabilidade estratégica para empresas que querem crescer com segurança.</p>
          </div>
          <div>
            <h4 style={{ color: "#fff", fontSize: 14, fontWeight: 800, marginBottom: 14, letterSpacing: 1 }}>CONTATO</h4>
            <p style={{ fontSize: 13.5, lineHeight: 2 }}>Av. Paulista, 1000 — Bela Vista, {city}<br />(11) 99999-9999<br />contato@vetorcontabil.com.br</p>
          </div>
          <div>
            <h4 style={{ color: "#fff", fontSize: 14, fontWeight: 800, marginBottom: 14, letterSpacing: 1 }}>FALE CONOSCO</h4>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href={wa} target="_blank" rel="noreferrer" style={{ background: AM, color: NV, padding: "10px 18px", borderRadius: 10, fontSize: 13.5, fontWeight: 800, textDecoration: "none" }}>Whatsapp</a>
              <a href="https://maps.google.com/?q=Av+Paulista,Sao+Paulo" target="_blank" rel="noreferrer" style={{ border: "1.5px solid #24365a", color: "#cdd8ea", padding: "10px 18px", borderRadius: 10, fontSize: 13.5, fontWeight: 700, textDecoration: "none" }}>Como chegar</a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #16233d", padding: "18px 0", textAlign: "center", fontSize: 12.5 }}>© 2026 {brand} · CRC 2SP-000000/O · Todos os direitos reservados</div>
      </footer>
    </div>
  );
}
