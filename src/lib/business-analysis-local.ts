import type { BusinessAnalysis, BusinessAnalysisInput } from "./business-analysis";

// Análise 100% local e determinística: usa apenas os dados informados manualmente,
// sem chamar IA e sem consumir saldo. A versão com IA fica reservada para o plano Pro
// (src/lib/business-analysis.functions.ts), fora do alcance desta página.

function has(text: string, ...words: string[]) {
  return words.some((word) => text.includes(word));
}

export function analyzeBusinessLocally(input: BusinessAnalysisInput): BusinessAnalysis {
  const name = input.name.trim();
  const segment = input.segment.trim();
  const city = input.city.trim();
  const services = input.services.trim();
  const social = input.social.trim();
  const notes = input.notes.trim();
  const profile = `${segment} ${services} ${notes}`.toLowerCase();

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

  if (opportunities.length < 3 && has(profile, "restaur", "pizz", "lanch", "padaria", "café", "cafe", "bar", "food", "hamburg")) {
    opportunities.push({
      title: "Cardápio digital com fotos",
      benefit: "Um cardápio online com fotos e botão de pedido pelo WhatsApp pode facilitar a escolha do cliente e reduzir perguntas repetidas no atendimento.",
      basis: `Hipótese a confirmar: cardápio hoje divulgado apenas presencialmente ou por redes. Segmento informado: ${segment}.`,
    });
  } else if (opportunities.length < 3 && has(profile, "barb", "salão", "salao", "beleza", "estética", "estetica", "manicure")) {
    opportunities.push({
      title: "Agendamento facilitado",
      benefit: "Uma página com serviços, fotos dos trabalhos e botão direto para o WhatsApp pode simplificar o agendamento e mostrar a qualidade do trabalho.",
      basis: `Hipótese a confirmar: agendamentos feitos só por mensagem solta. Segmento informado: ${segment}.`,
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
  if (has(profile, "restaur", "pizz", "lanch", "padaria", "café", "cafe", "bar", "food", "hamburg")) sections.splice(2, 0, "Cardápio com fotos");
  if (has(profile, "advog", "jurídic", "juridic")) sections.splice(2, 0, "Áreas de atuação");
  if (has(profile, "academ", "gym", "fitness", "crossfit", "pilates")) sections.splice(2, 0, "Modalidades e horários");
  if (has(profile, "dent", "clínic", "clinic", "saúde", "saude", "fisio", "psic")) sections.splice(2, 0, "Especialidades e equipe");
  if (has(profile, "pet", "veterin")) sections.splice(2, 0, "Serviços para pets");
  if (has(profile, "oficina", "mecân", "mecan", "auto")) sections.splice(2, 0, "Serviços e orçamentos");
  sections.push("Localização com mapa");

  const summary = `${name} atua no segmento de ${segment}${city ? ` em ${city}` : ""}. ${
    input.website === "none"
      ? "Como não possui site, há espaço para uma presença digital própria reunindo serviços, fotos e contato."
      : input.website === "existing"
        ? "Como já possui site, a conversa pode partir de uma avaliação do site atual e de possíveis melhorias."
        : "O primeiro passo é confirmar se já existe um site antes de propor qualquer solução."
  }${services ? " Os serviços informados podem virar seções claras no site." : ""}${notes ? " As observações registradas ajudam a personalizar a proposta." : ""}`;

  const approach = `Comece comentando algo específico do ${name} — um serviço, uma foto ou o atendimento — para mostrar interesse genuíno. Depois, mencione a oportunidade de forma leve e condicional, sem afirmar problemas que você não verificou. Ofereça mostrar uma ideia de site sem compromisso e deixe o cliente conduzir o ritmo da conversa.`;

  const questions = [
    input.website === "existing" ? "O que você mudaria no site atual, se pudesse?" : "Vocês já têm um site ou página própria hoje?",
    "Como os clientes costumam encontrar vocês atualmente?",
    services ? "Quais serviços vocês mais gostariam de destacar?" : "Quais serviços vocês gostariam de destacar em um site?",
    "Faz sentido eu preparar uma ideia de site para vocês avaliarem sem compromisso?",
  ];

  const opening = `Acompanhei o trabalho do ${name} e achei que um site próprio poderia destacar ainda mais o que vocês fazem no segmento de ${segment}. Pensei em algumas ideias que podem facilitar o contato com novos clientes e queria mostrar para vocês avaliarem.`;

  return {
    summary,
    opportunities: opportunities.slice(0, 4),
    sections: [...new Set(sections)].slice(0, 6),
    approach,
    questions: questions.slice(0, 4),
    opening,
  };
}
