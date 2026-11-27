import type { BusinessAnalysis, BusinessAnalysisInput } from "./business-analysis";

// Análise 100% local e determinística: usa apenas os dados informados manualmente,
// sem chamar IA e sem consumir saldo. A versão com IA fica reservada para o plano Pro
// (src/lib/business-analysis.functions.ts), fora do alcance desta página.

export type Opening = { label: string; text: string };
export type FollowUp = { label: string; when: string; text: string };
export type LocalAnalysis = BusinessAnalysis & { openings: Opening[]; followUps: FollowUp[] };

/** Acrescenta a assinatura do vendedor ao texto de acompanhamento. */
export function withSignature(text: string, senderName: string) {
  const name = senderName.trim();
  return name ? `${text}\n\n${name}` : text;
}

const norm = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

// Palavra que começa com o termo. Termo terminado em "!" só vale como palavra inteira
// (evita "bar!" casar com "barbearia").
function has(text: string, ...words: string[]) {
  const t = norm(text);
  return words.some((word) => {
    const w = norm(word);
    const whole = w.endsWith("!");
    const term = whole ? w.slice(0, -1) : w;
    return new RegExp(`(^|[^a-z0-9])${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}${whole ? "($|[^a-z0-9])" : ""}`).test(t);
  });
}

type Segment = { words: string[]; section: string; opportunity: { title: string; benefit: string; hypothesis: string } };

// Ordem importa: o primeiro segmento que casar vence. Todo texto é condicional e parte de hipótese a confirmar.
const SEGMENTS: Segment[] = [
  { words: ["escola", "curso", "idioma", "ingles", "reforco", "auto escola", "cfc!", "aula"], section: "Cursos, turmas e matrícula",
    opportunity: { title: "Cursos e matrícula pelo WhatsApp", benefit: "Uma página com cursos, turmas, horários e botão de matrícula pelo WhatsApp pode tirar as dúvidas mais comuns antes mesmo da primeira conversa.", hypothesis: "informações sobre turmas e valores passadas só individualmente" } },
  { words: ["oficina", "mecan", "auto", "funilar", "borrach", "pneu", "lava jato", "lavagem", "polimento", "insulfilm"], section: "Serviços e orçamentos",
    opportunity: { title: "Serviços e pedido de orçamento", benefit: "Um site com a lista de serviços e um botão para pedir orçamento pelo WhatsApp pode agilizar o primeiro contato e passar mais confiança a quem ainda não conhece a oficina.", hypothesis: "orçamentos pedidos só por telefone ou mensagem" } },
  { words: ["barb", "salao", "beleza", "estetic", "manicure", "unha", "sobrancel", "cilio", "depila", "tattoo", "tatu"], section: "Serviços, fotos dos trabalhos e agendamento",
    opportunity: { title: "Agendamento facilitado", benefit: "Uma página com serviços, fotos dos trabalhos e botão direto para o WhatsApp pode simplificar o agendamento e mostrar a qualidade do trabalho.", hypothesis: "agendamentos feitos só por mensagem solta" } },
  { words: ["restaur", "pizz", "lanch", "padaria", "cafe", "bar!", "food", "hamburg", "acai", "sorvet", "confeit", "doceria", "marmit", "espetinh"], section: "Cardápio com fotos",
    opportunity: { title: "Cardápio digital com fotos", benefit: "Um cardápio online com fotos e botão de pedido pelo WhatsApp pode facilitar a escolha do cliente e reduzir perguntas repetidas no atendimento.", hypothesis: "cardápio hoje divulgado apenas presencialmente ou por redes" } },
  { words: ["advog", "juridic"], section: "Áreas de atuação",
    opportunity: { title: "Credibilidade e áreas de atuação", benefit: "Um site sóbrio com áreas de atuação, apresentação do profissional e contato pode passar confiança a quem pesquisa antes de ligar. Em serviços jurídicos, vale seguir as regras de publicidade da OAB.", hypothesis: "clientes chegam só por indicação" } },
  { words: ["academ", "gym", "fitness", "crossfit", "pilates", "yoga", "personal"], section: "Modalidades e horários",
    opportunity: { title: "Modalidades, horários e aula experimental", benefit: "Uma página com modalidades, grade de horários e um botão para marcar aula experimental pelo WhatsApp pode facilitar o primeiro contato de quem está decidindo onde treinar.", hypothesis: "horários e valores explicados caso a caso, por mensagem" } },
  { words: ["dent", "odonto", "clinic", "saude", "fisio", "psic", "nutri", "otica", "laborat"], section: "Especialidades e equipe",
    opportunity: { title: "Especialidades, equipe e agendamento", benefit: "Um site com especialidades, apresentação da equipe e contato direto pode passar segurança a novos pacientes. Em saúde, vale confirmar as regras de publicidade do conselho da área.", hypothesis: "novos pacientes chegam principalmente por indicação" } },
  { words: ["pet", "veterin", "adestra"], section: "Serviços para pets",
    opportunity: { title: "Serviços para pets com agendamento", benefit: "Uma página com banho e tosa, serviços e botão de agendamento pelo WhatsApp pode facilitar a vida do tutor e reduzir idas e vindas de mensagem.", hypothesis: "agendamento feito por mensagem avulsa" } },
  { words: ["imobili", "corretor"], section: "Imóveis em destaque",
    opportunity: { title: "Vitrine de imóveis", benefit: "Uma página com imóveis em destaque, fotos e contato direto pode ajudar o interessado a conhecer as opções sem depender só de portais e redes sociais.", hypothesis: "imóveis divulgados só em portais e redes" } },
  { words: ["contab", "contador"], section: "Serviços contábeis",
    opportunity: { title: "Serviços contábeis explicados", benefit: "Um site que explique de forma simples os serviços (abertura de empresa, impostos, folha) e ofereça contato rápido pode ajudar o pequeno empreendedor a entender como a contabilidade pode ajudar.", hypothesis: "clientes chegam só por indicação" } },
  { words: ["constru", "reforma", "pedreiro", "eletricist", "encanad", "hidraul", "marcenar", "serralh", "vidrac", "gesso", "pintor", "climatiz", "ar condicionado", "material"], section: "Serviços e obras realizadas",
    opportunity: { title: "Portfólio de obras e pedido de orçamento", benefit: "Um site com fotos de trabalhos realizados e botão de orçamento pelo WhatsApp pode mostrar a qualidade do serviço a quem ainda não conhece o profissional.", hypothesis: "trabalhos mostrados só por mensagem ou indicação" } },
  { words: ["loja", "boutique", "roupa", "calcado", "moda", "presente", "floricult", "flores", "papelaria", "variedade", "perfumaria"], section: "Produtos em destaque",
    opportunity: { title: "Vitrine online de produtos", benefit: "Uma vitrine com produtos em destaque, fotos e botão para perguntar pelo WhatsApp pode ajudar o cliente a conhecer a loja antes de ir até ela.", hypothesis: "produtos divulgados só presencialmente ou nas redes" } },
  { words: ["buffet", "festa", "evento", "fotograf", "decora"], section: "Galeria de eventos e orçamento",
    opportunity: { title: "Galeria de trabalhos e orçamento", benefit: "Uma galeria com fotos de eventos realizados e um botão de orçamento pode ajudar quem está planejando uma festa a ver o trabalho antes de escolher.", hypothesis: "trabalhos mostrados só em redes sociais" } },
  { words: ["pousada", "hotel", "hospedagem", "hostel"], section: "Quartos, fotos e reservas",
    opportunity: { title: "Quartos, fotos e pedido de reserva", benefit: "Uma página com fotos dos quartos, comodidades e botão de reserva pelo WhatsApp pode ajudar o hóspede a decidir sem depender só de plataformas de terceiros.", hypothesis: "reservas dependentes de plataformas de terceiros ou de mensagem" } },
  { words: ["limpeza", "lavanderia", "diarista", "dedetiz", "chaveiro", "mudanca", "frete", "costur", "alfaiat", "assistencia", "celular", "informatica", "conserto"], section: "Serviços e pedido de orçamento",
    opportunity: { title: "Serviços e contato rápido", benefit: "Uma página objetiva com os serviços, a região atendida e um botão de WhatsApp pode ajudar quem precisa do serviço com urgência a chamar rapidamente.", hypothesis: "clientes chegam só por indicação" } },
];

export function analyzeBusinessLocally(input: BusinessAnalysisInput): LocalAnalysis {
  const name = input.name.trim();
  const segment = input.segment.trim();
  const city = input.city.trim();
  const services = input.services.trim();
  const social = input.social.trim();
  const notes = input.notes.trim();

  const opportunities: BusinessAnalysis["opportunities"] = [];

  if (input.website === "none") {
    opportunities.push({
      title: "Presença digital própria",
      benefit: "Sem site próprio, o negócio depende de indicação e de redes sociais. Um site pode reunir serviços, fotos e contato em um só lugar e passar mais confiança a quem ainda não conhece.",
      basis: "Dado informado: o estabelecimento não possui site.",
    });
  } else if (input.website === "existing") {
    opportunities.push({
      title: "Evolução do site atual",
      benefit: "Um site renovado pode destacar melhor os serviços, facilitar o contato pelo WhatsApp e funcionar bem no celular — vale avaliar o site atual antes de propor mudanças.",
      basis: "Dado informado: o estabelecimento já possui site. Hipótese a confirmar: pontos de melhoria no site atual.",
    });
  } else {
    opportunities.push({
      title: "Confirmar a presença digital",
      benefit: "Antes de propor qualquer coisa, vale confirmar se já existe um site. Se não houver, um site próprio pode reunir serviços, fotos e contato; se houver, pode haver espaço para melhorias.",
      basis: "Dado informado: não se sabe se o estabelecimento possui site.",
    });
  }

  if (services) {
    opportunities.push({
      title: "Catálogo de serviços organizado",
      benefit: "Apresentar os serviços em seções claras, com descrição e chamada para o WhatsApp, pode ajudar o visitante a entender rápido o que o negócio oferece.",
      basis: `Dado informado: serviços citados — ${services.slice(0, 180)}.`,
    });
  }

  if (social) {
    opportunities.push({
      title: "Site conectado às redes sociais",
      benefit: "Se as redes já têm conteúdo, um site pode aproveitar esse material e dar um endereço próprio ao negócio, sem depender só do alcance das redes.",
      basis: `Dado informado: presença em redes — ${social.slice(0, 180)}.`,
    });
  }

  const segmentProfile = `${segment} ${services} ${notes}`;
  const match = SEGMENTS.find((item) => has(segment, ...item.words)) ?? SEGMENTS.find((item) => has(segmentProfile, ...item.words));

  if (opportunities.length < 3 && match) {
    opportunities.push({
      title: match.opportunity.title,
      benefit: match.opportunity.benefit,
      basis: `Hipótese a confirmar: ${match.opportunity.hypothesis}. Segmento informado: ${segment}.`,
    });
  } else if (opportunities.length < 3) {
    opportunities.push({
      title: "Aparecer nas buscas da região",
      benefit: city
        ? `Um site com endereço, horário e contato pode ajudar pessoas de ${city} a encontrar o negócio quando procuram por ${segment} na região.`
        : `Um site com endereço, horário e contato pode ajudar pessoas da região a encontrar o negócio quando procuram por ${segment}.`,
      basis: "Hipótese a confirmar: o negócio depende hoje de indicação para ser encontrado.",
    });
  }

  const sections = ["Início com apresentação do negócio", "Serviços ou produtos", "Sobre o estabelecimento", "Contato com botão de WhatsApp"];
  if (match) sections.splice(2, 0, match.section);
  sections.push("Localização com mapa");

  const summary = `${name} atua no segmento de ${segment}${city ? ` em ${city}` : ""}. ${
    input.website === "none"
      ? "Como não possui site, há espaço para uma presença digital própria reunindo serviços, fotos e contato."
      : input.website === "existing"
        ? "Como já possui site, a conversa pode partir de uma avaliação do site atual e de possíveis melhorias."
        : "O primeiro passo é confirmar se já existe um site antes de propor qualquer solução."
  }${services ? " Os serviços informados podem virar seções claras no site." : ""}${notes ? " As observações registradas ajudam a personalizar a proposta." : ""}`;

  const approach = `Comece comentando algo específico de ${name} — um serviço, uma foto ou o atendimento — para mostrar interesse genuíno. Depois, mencione a oportunidade de forma leve e condicional, sem afirmar problemas que você não verificou. Ofereça mostrar uma ideia de site sem compromisso e deixe o cliente conduzir o ritmo da conversa.`;

  const questions = [
    input.website === "existing" ? "O que você mudaria no site atual, se pudesse?" : "Vocês já têm um site ou página própria hoje?",
    "Como os clientes costumam encontrar vocês atualmente?",
    services ? "Quais serviços vocês mais gostariam de destacar?" : "Quais serviços vocês gostariam de destacar em um site?",
    "Faz sentido eu preparar uma ideia de site para vocês avaliarem sem compromisso?",
  ];

  const where = city ? ` em ${city}` : "";
  const field = segment.toLowerCase();
  // Aberturas sem afirmar nada que a pessoa não verificou: sem "vi seu trabalho", sem preço e sem prometer demonstração pronta.
  const siteLine =
    input.website === "none" ? `Pelo que sei, ${name} ainda não tem site próprio.`
    : input.website === "existing" ? `Pensei em algumas ideias para o site de ${name}.`
    : `Pensei em uma ideia de site para ${name}.`;
  const openings: Opening[] = [
    { label: "Curta e direta", text: `${siteLine} Acredito que um site simples poderia ajudar mais clientes${where} a encontrar e chamar vocês pelo WhatsApp.` },
    { label: "Consultiva", text: `Trabalho com sites para negócios de ${field}${where} e pensei em ${name}. Um site com serviços, fotos e botão de WhatsApp pode facilitar o contato de quem ainda não conhece vocês, e queria trocar uma ideia sobre isso.` },
    { label: "Começando por uma pergunta", text: `Uma pergunta rápida sobre ${name}: hoje, como os clientes novos costumam encontrar vocês? Pergunto porque trabalho com sites para ${field} e queria entender se uma presença online própria faria sentido para vocês.` },
  ];
  const followUps: FollowUp[] = [
    { label: "1º acompanhamento", when: "2 a 3 dias depois, se não houver resposta", text: `Oi! Passando só para retomar minha mensagem sobre um site para ${name}. Sem pressa: se fizer sentido, posso mandar uma ideia por aqui mesmo. Se não for o momento, tudo bem também.` },
    { label: "2º acompanhamento", when: "cerca de 1 semana depois, última tentativa", text: `Olá! Esta é minha última mensagem, para não incomodar. Se um dia ${name} quiser ver uma ideia de site, é só me chamar, sem compromisso. Obrigado pela atenção!` },
  ];
  const opening = openings[0]!.text;

  return {
    summary,
    opportunities: opportunities.slice(0, 4),
    sections: [...new Set(sections)].slice(0, 6),
    approach,
    questions: questions.slice(0, 4),
    opening,
    openings,
    followUps,
  };
}
