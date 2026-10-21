export type Sector = "health" | "beauty" | "food" | "gym" | "law" | "pet" | "auto" | "services";
export type CatalogItem = { title: string; text: string; photo?: "pizza" | "burger" | "plate" | "dessert" };

export const SECTOR_HEADLINE: Record<Sector, string> = {
  health: "Um novo olhar para o seu cuidado.",
  beauty: "Seu estilo merece esse cuidado.",
  food: "Uma boa experiência começa à mesa.",
  gym: "Seu melhor treino começa aqui.",
  law: "Orientação jurídica com clareza e confiança.",
  pet: "Carinho e cuidado para quem você ama.",
  auto: "Seu carro em boas mãos.",
  services: "Seu próximo atendimento começa aqui.",
};

/** Itens ilustrativos para o cliente revisar — nada de preços inventados. */
export const SECTOR_CATALOG: Record<Sector, { title: string; items: CatalogItem[] }> = {
  food: { title: "Cardápio", items: [
    { title: "Pizzas", text: "Sabores tradicionais e especiais, direto do forno.", photo: "pizza" },
    { title: "Lanches", text: "Hambúrgueres e porções para todos os gostos.", photo: "burger" },
    { title: "Pratos do dia", text: "Refeições completas e caseiras.", photo: "plate" },
    { title: "Sobremesas", text: "Doces e cafés para fechar com chave de ouro.", photo: "dessert" },
  ] },
  health: { title: "Serviços", items: [
    { title: "Consultas", text: "Atendimento com hora marcada." },
    { title: "Avaliação inicial", text: "Primeiro contato para entender sua necessidade." },
    { title: "Acompanhamento", text: "Retornos e cuidado contínuo." },
    { title: "Exames e procedimentos", text: "Consulte a disponibilidade com a equipe." },
  ] },
  beauty: { title: "Serviços", items: [
    { title: "Cortes", text: "Estilo do clássico ao moderno." },
    { title: "Barba e acabamento", text: "Cuidado nos detalhes." },
    { title: "Coloração e química", text: "Transforme o visual com segurança." },
    { title: "Estética", text: "Tratamentos para pele e bem-estar." },
  ] },
  gym: { title: "Modalidades", items: [
    { title: "Musculação", text: "Área completa de pesos e máquinas." },
    { title: "Aeróbico", text: "Esteiras, bikes e elípticos." },
    { title: "Aulas coletivas", text: "Treinos em grupo com energia." },
    { title: "Acompanhamento", text: "Orientação para montar seu treino." },
  ] },
  law: { title: "Áreas de atuação", items: [
    { title: "Direito Civil", text: "Contratos, indenizações e família." },
    { title: "Direito Trabalhista", text: "Orientação para empregados e empresas." },
    { title: "Direito Previdenciário", text: "Aposentadorias e benefícios." },
    { title: "Consultoria", text: "Atendimento para entender o seu caso." },
  ] },
  pet: { title: "Serviços", items: [
    { title: "Banho e tosa", text: "Seu pet limpinho e cheiroso." },
    { title: "Produtos", text: "Rações, petiscos e acessórios." },
    { title: "Cuidados", text: "Atenção ao bem-estar do seu animal." },
    { title: "Agendamento", text: "Marque o melhor horário pelo WhatsApp." },
  ] },
  auto: { title: "Serviços", items: [
    { title: "Revisão", text: "Manutenção preventiva do seu veículo." },
    { title: "Troca de óleo", text: "Rápido e com qualidade." },
    { title: "Freios e suspensão", text: "Segurança em primeiro lugar." },
    { title: "Diagnóstico", text: "Avaliação para encontrar o problema." },
  ] },
  services: { title: "Serviços", items: [
    { title: "Atendimento", text: "Fale com a equipe e tire suas dúvidas." },
    { title: "Orçamento", text: "Solicite sem compromisso." },
    { title: "Agendamento", text: "Escolha o melhor horário." },
    { title: "Suporte", text: "Acompanhamento depois do serviço." },
  ] },
};
