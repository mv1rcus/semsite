import { useEffect } from "react";

/** Estúdio de pilates em sótão à risca do pin OMIGH (varredura E-21): hero full-bleed escuro com serifão central e pills, seção creme "novo no reformer", faixa marrom-café com 4 cards de aulas (foto em cima), seção mat pilates com foto close. Reserva fecha no WhatsApp. Nome fictício novo (Ático), nada do pin original. */
const CRM = "#f3efe6", INK = "#2e241c", BROWN = "#3a2c21", BROWN2 = "#4a3a2c", MUT = "#7a6f62", CRMUT = "#c9bfae", LINE = "rgba(46,36,28,.14)";

const CARDS = [
  { img: "/atico-card1.jpg", alt: "Aluna deitada no reformer em exercício de alinhamento", t: "TÉCNICA", d: "Aula estável e focada em alinhamento e ativação dos músculos certos para ganhar força com segurança. Ideal depois da sua aula introdutória, se você prefere um ritmo tranquilo ou está voltando ao movimento após uma lesão." },
  { img: "/atico-card2.jpg", alt: "Instrutora ajustando o pé da aluna nas alças do reformer", t: "TÉCNICA+", d: "Parte da base sólida da Técnica e adiciona desafio com movimentos progressivos, sem perder o foco em precisão e controle. A ponte perfeita entre a Técnica e a Potência." },
  { img: "/atico-card3.jpg", alt: "Aluna fazendo prancha sobre o reformer com instrutora ao lado", t: "POTÊNCIA", d: "Leva força e controle ao próximo nível, com mais intensidade e desafio. Para quem já tem experiência no reformer, boa consciência corporal e nenhuma lesão ativa. Espere trabalhar duro e terminar com nosso alongamento relaxante." },
  { img: "/atico-card4.jpg", alt: "Gestante em aula adaptada de pilates, close no torso", t: "PRÉ E PÓS-PARTO", d: "Ativação do core guiada pela respiração, mobilidade gentil e trabalho focado para você se sentir apoiada, estável e forte. Em turmas pré-pagas; fale com a gente para ver disponibilidade." },
];

export function AticoFold({ client }: { client?: { name?: string; whatsapp?: string; city?: string } }) {
  const brand = client?.name?.trim() || "Ático";
  const city = client?.city?.trim() || "São Paulo";
  const phone = (client?.whatsapp ?? "").replace(/\D/g, "");
  const wa = (m: string) => `https://wa.me/${phone || "5511999999999"}?text=${encodeURIComponent(m)}`;
  const book = (m: string) => window.open(wa(m), "_blank");

  useEffect(() => {
    document.title = `${brand} · Pilates & Reformer em ${city}`;
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..700;1,400..700&family=Jost:ital,wght@0,300..600;1,300..600&display=swap";
    document.head.appendChild(l);
  }, [brand, city]);

  return (
    <div className="atico" style={{ background: CRM, color: INK, fontFamily: "'Jost', sans-serif", minHeight: "100vh" }}>
      <style>{`
        html,body{background:${CRM}!important}
        .atico .wrap{max-width:1180px;margin:0 auto;padding:0 28px}
        .atico .serif{font-family:'Playfair Display',serif;font-weight:500;letter-spacing:.01em;margin:0}
        .atico .pill{display:inline-flex;align-items:center;justify-content:center;border-radius:999px;padding:14px 30px;font:500 12px 'Jost',sans-serif;letter-spacing:.14em;cursor:pointer;border:none;transition:opacity .2s}
        .atico .pill:hover{opacity:.88}
        .atico .pill-l{background:#fff;color:${INK}}
        .atico .pill-d{background:${BROWN};color:#f5f0e8}
        .atico .navlink{background:none;border:none;color:#fff;font:400 13px 'Jost',sans-serif;letter-spacing:.06em;cursor:pointer;opacity:.92}
        .atico .navlink:hover{opacity:1}
        .atico .cards{display:grid;grid-template-columns:repeat(4,1fr);gap:26px}
        .atico .card img{width:100%;aspect-ratio:4/5;object-fit:cover;display:block}
        .atico .card h3{font-family:'Playfair Display',serif;font-weight:500;font-size:19px;letter-spacing:.1em;margin:22px 0 14px;text-align:center}
        .atico .card p{font-size:13.5px;line-height:1.75;color:${CRMUT};margin:0;text-align:center}
        @media (max-width: 1020px){ .atico .cards{grid-template-columns:repeat(2,1fr)} }
        @media (max-width: 900px){
          .atico nav{display:none!important}
          .atico .duo{grid-template-columns:1fr!important}
          .atico .serif-xl{font-size:44px!important}
        }
        @media (max-width: 560px){ .atico .cards{grid-template-columns:1fr} }
      `}</style>

      {/* HERO */}
      <section style={{ position: "relative", minHeight: 640, display: "flex", flexDirection: "column" }}>
        <img src="/atico-hero.jpg" alt="Aula de pilates no reformer em estúdio de teto inclinado com luz suave" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(30,22,16,.55), rgba(30,22,16,.45) 55%, rgba(30,22,16,.62))" }} />
        <header style={{ position: "relative", zIndex: 2, padding: "26px 0" }}>
          <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
            <div>
              <div className="serif" style={{ fontSize: 28, color: "#fff", letterSpacing: ".06em" }}>{brand.toLowerCase()}</div>
              <div style={{ fontSize: 10, letterSpacing: ".4em", color: "rgba(255,255,255,.75)", marginTop: 2 }}>PILATES & REFORMER</div>
            </div>
            <nav style={{ display: "flex", alignItems: "center", gap: 26 }}>
              <button className="navlink" onClick={() => document.getElementById("equipe")?.scrollIntoView({ behavior: "smooth" })}>O Estúdio</button>
              <button className="navlink" onClick={() => document.getElementById("aulas")?.scrollIntoView({ behavior: "smooth" })}>Aulas</button>
              <button className="navlink" onClick={() => document.getElementById("horarios")?.scrollIntoView({ behavior: "smooth" })}>Horários</button>
              <button className="navlink" onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}>Contato</button>
              <button className="pill pill-l" onClick={() => book(`Olá! Quero reservar uma aula no ${brand}.`)}>RESERVAR</button>
            </nav>
          </div>
        </header>
        <div style={{ position: "relative", zIndex: 2, flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "60px 28px 90px" }}>
          <h1 className="serif serif-xl" style={{ fontSize: 72, color: "#fff", letterSpacing: ".12em" }}>NOSSAS AULAS</h1>
          <p style={{ color: "rgba(255,255,255,.92)", fontSize: 14.5, lineHeight: 1.7, maxWidth: 460, margin: "18px 0 34px" }}>Aulas de Reformer e Mat em turmas pequenas, cursos especiais e sessões particulares, tudo conduzido com cuidado no nosso estúdio em {city}.</p>
          <button className="pill pill-l" onClick={() => book("Olá! Quero reservar uma aula de reformer.")}>RESERVAR UMA AULA</button>
        </div>
      </section>

      {/* NOVO NO REFORMER */}
      <section id="equipe" style={{ padding: "90px 0" }}>
        <div className="wrap duo" style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: 64, alignItems: "center" }}>
          <img src="/atico-intro.jpg" alt="Aluna segurando anel de pilates acima da cabeça com instrutora orientando" style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", borderRadius: 14, display: "block" }} />
          <div>
            <h2 className="serif" style={{ fontSize: 40, letterSpacing: ".08em", lineHeight: 1.15 }}>NOVA POR AQUI?<br />COMECE ASSIM</h2>
            <p style={{ fontSize: 14.5, lineHeight: 1.8, color: MUT, margin: "26px 0 0" }}>Antes de entrar numa turma de Reformer, pedimos a todas que reservem uma aula introdutória. É um atendimento individual em que apresentamos o equipamento, entendemos seus objetivos e deixamos você confiante para aproveitar a prática desde o primeiro dia.</p>
            <p style={{ fontSize: 14.5, lineHeight: 1.8, color: MUT, margin: "18px 0 0" }}>Prefere aprender junto com outras pessoas? Nosso curso Fundamentos de três semanas é um jeito leve de começar em grupo.</p>
            <p style={{ fontSize: 14.5, lineHeight: 1.8, color: MUT, margin: "18px 0 0" }}>Não encontrou horário na agenda? Chama no WhatsApp que a gente vê o que pode fazer.</p>
            <div style={{ display: "flex", gap: 16, marginTop: 34, flexWrap: "wrap" }}>
              <button className="pill pill-d" onClick={() => book("Olá! Quero reservar uma aula introdutória de reformer.")}>AULA INTRODUTÓRIA</button>
              <button className="pill pill-d" onClick={() => book("Olá! Quero me inscrever no curso Fundamentos.")}>CURSO FUNDAMENTOS</button>
            </div>
          </div>
        </div>
      </section>

      {/* AULAS EM GRUPO */}
      <section id="aulas" style={{ background: BROWN, padding: "90px 0" }}>
        <div className="wrap">
          <h2 className="serif" style={{ fontSize: 40, letterSpacing: ".12em", color: "#f5f0e8", textAlign: "center" }}>AULAS DE REFORMER EM GRUPO</h2>
          <p style={{ color: CRMUT, fontSize: 14, lineHeight: 1.8, textAlign: "center", maxWidth: 640, margin: "22px auto 56px" }}>Com no máximo cinco alunas por turma e níveis dedicados, nossas turmas pequenas garantem atenção de verdade da instrutora e um acompanhamento sob medida, desafiando e apoiando você no nível certo.</p>
          <div className="cards">
            {CARDS.map((c) => (
              <div className="card" key={c.t}>
                <img src={c.img} alt={c.alt} />
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAT PILATES */}
      <section id="horarios" style={{ padding: "90px 0" }}>
        <div className="wrap duo" style={{ display: "grid", gridTemplateColumns: "6fr 6fr", gap: 64, alignItems: "center" }}>
          <div>
            <h2 className="serif" style={{ fontSize: 40, letterSpacing: ".08em" }}>MAT PILATES</h2>
            <p style={{ fontSize: 14.5, lineHeight: 1.8, color: MUT, margin: "26px 0 0" }}>Onde tudo começou. Usando o próprio corpo e pequenos acessórios, as aulas de Mat constroem controle, força e consciência corporal desde o chão. Abertas a todos os níveis, sem precisar de experiência — os tapetes e acessórios são por nossa conta, é só vir.</p>
            <div style={{ marginTop: 34 }}>
              <button className="pill pill-d" onClick={() => book("Olá! Quero reservar uma aula de mat pilates.")}>RESERVAR MAT</button>
            </div>
          </div>
          <img src="/atico-mat.jpg" alt="Close das mãos da instrutora apoiadas nas costas da aluna" style={{ width: "100%", aspectRatio: "5/4", objectFit: "cover", display: "block" }} />
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contato" style={{ borderTop: `1px solid ${LINE}`, padding: "40px 0" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
          <div>
            <div className="serif" style={{ fontSize: 22, letterSpacing: ".06em" }}>{brand.toLowerCase()}</div>
            <div style={{ fontSize: 12, color: MUT, marginTop: 4 }}>{city} · Pilates & Reformer</div>
          </div>
          <button className="pill pill-d" onClick={() => book(`Olá! Quero falar com o ${brand}.`)}>FALAR NO WHATSAPP</button>
        </div>
      </footer>
    </div>
  );
}
