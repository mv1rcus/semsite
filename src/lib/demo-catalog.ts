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

type Catalog = { title: string; items: CatalogItem[] };
const s = (title: string, list: [string, string][], photo?: CatalogItem["photo"][]): Catalog =>
  ({ title, items: list.map(([t, x], i) => ({ title: t, text: x, ...(photo?.[i] ? { photo: photo[i] } : {}) })) });

/** Catálogos específicos por ramo (testados em ordem); caem no catálogo do setor se nada bater. */
const NICHES: [RegExp, Catalog][] = [
  [/copiador|xerox/, s("Serviços", [["Cópias e impressões", "Preto e branco ou coloridas, na hora."], ["Encadernação", "Espiral e capa para seus trabalhos."], ["Plastificação", "Documentos protegidos."], ["Impressão de fotos", "Fotos e documentos com qualidade."]])],
  [/advoca|advogad|jur[ií]dic/, s("Áreas de atuação", [["Direito trabalhista", "Orientação para empregados e empresas."], ["Direito de família", "Divórcio, pensão e guarda."], ["Direito previdenciário", "Aposentadorias e benefícios."], ["Direito do consumidor", "Defesa contra cobranças e abusos."]])],
  [/[oó]tica/, s("Produtos", [["Óculos de grau", "Armações para todos os estilos."], ["Óculos de sol", "Proteção com estilo."], ["Lentes", "Multifocais, antirreflexo e mais."], ["Ajustes", "Conserto e regulagem."]])],
  [/auto ?escola|cfc/, s("Cursos", [["Primeira habilitação", "Carro e moto."], ["Adição de categoria", "Acrescente A ou B."], ["Aulas para habilitados", "Perca o medo de dirigir."], ["Renovação", "Orientação completa."]])],
  [/marmit/, s("Cardápio", [["Marmita tradicional", "Arroz, feijão, carne e salada."], ["Marmita fitness", "Leve e equilibrada."], ["Prato do dia", "Muda todo dia."], ["Entrega", "Consulte a região."]], ["plate", "plate", "plate"])],
  [/espetinh|churrasc/, s("Cardápio", [["Espetinhos", "Carne, frango, linguiça e mais."], ["Jantinha", "Espeto com acompanhamentos."], ["Porções", "Para dividir."], ["Bebidas", "Geladas."]], ["plate", "plate", "plate"])],
  [/buffet/, s("Serviços", [["Festas infantis", "Decoração e cardápio completos."], ["Casamentos", "O grande dia sem preocupação."], ["Eventos corporativos", "Coffee break e jantares."], ["Orçamento", "Conte a data do evento."]])],
  [/depila/, s("Serviços", [["Depilação com cera", "Rápida e cuidadosa."], ["Depilação a laser", "Resultado duradouro."], ["Pacotes", "Mais áreas, melhor preço."], ["Avaliação", "Tire suas dúvidas."]])],
  [/climatiz|ar condicionado|refrigera/, s("Serviços", [["Instalação de ar", "Split e janela."], ["Limpeza e higienização", "Ar mais saudável."], ["Manutenção", "Preventiva e corretiva."], ["Orçamento", "Sem compromisso."]])],
  [/gesso|drywall/, s("Serviços", [["Forro de gesso", "Acabamento liso e bonito."], ["Drywall", "Paredes e divisórias."], ["Sancas e molduras", "Iluminação embutida."], ["Orçamento", "Visita técnica."]])],
  [/pintor|pintura residencial/, s("Serviços", [["Pintura interna", "Paredes limpas e renovadas."], ["Pintura externa", "Fachadas e muros."], ["Textura e grafiato", "Acabamentos especiais."], ["Orçamento", "Sem compromisso."]])],
  [/moto ?pe[cç]|motope/, s("Produtos", [["Peças de motor", "Kits e reparos."], ["Pneus e câmaras", "Várias medidas."], ["Acessórios", "Capacetes e baús."], ["Óleo e revisão", "Troca rápida."]])],
  [/pet|veterin|banho e tosa/, s("Serviços", [["Banho e tosa", "Seu pet cheiroso e bonito."], ["Consulta veterinária", "Cuidado com quem você ama."], ["Ração e petiscos", "As melhores marcas."], ["Acessórios", "Coleiras, camas e brinquedos."]])],
  [/academ|crossfit|fitness|muscula/, s("Planos", [["Musculação", "Treino com acompanhamento."], ["Aulas coletivas", "Funcional, dança e mais."], ["Avaliação física", "Conheça seu ponto de partida."], ["Planos", "Mensal, trimestral e anual."]])],
  [/lava|lavagem|est[eé]tica auto|polimento|detail/, s("Serviços", [["Lavagem completa", "Por fora e por dentro, com acabamento caprichado."], ["Higienização interna", "Bancos, carpetes e teto limpos e sem odor."], ["Polimento", "Pintura revitalizada e com brilho de novo."], ["Cristalização e proteção", "Proteção extra para a pintura durar mais."]])],
  [/borrach|pneu/, s("Serviços", [["Conserto de pneus", "Remendo rápido para você seguir viagem."], ["Venda de pneus", "Opções novas e para vários modelos."], ["Alinhamento e balanceamento", "Mais segurança e economia de pneu."], ["Calibragem", "Pressão certa em poucos minutos."]])],
  [/el[eé]tric.*auto|auto.*el[eé]tric/, s("Serviços", [["Bateria", "Teste, carga e troca de bateria."], ["Partida e alternador", "Carro que não pega? A gente resolve."], ["Iluminação", "Faróis, lanternas e setas funcionando."], ["Diagnóstico elétrico", "Avaliação para achar a falha."]])],
  [/funilar|pintura/, s("Serviços", [["Funilaria", "Amassados e batidas recuperados."], ["Pintura", "Cor igual à original."], ["Martelinho de ouro", "Pequenos amassados sem pintar."], ["Orçamento", "Mande uma foto e peça seu orçamento."]])],
  [/autope[cç]/, s("Produtos", [["Peças de motor", "Filtros, correias, velas e mais."], ["Freios e suspensão", "Pastilhas, discos e amortecedores."], ["Elétrica", "Lâmpadas, baterias e acessórios."], ["Encomendas", "Não achou? Consulte pelo WhatsApp."]])],
  [/barb/, s("Serviços", [["Corte degradê e clássico", "Do tradicional ao moderno."], ["Barboterapia", "Barba feita com toalha quente."], ["Combo barba e cabelo", "O pacote completo para sair na régua."], ["Pigmentação e acabamento", "Detalhes que fazem a diferença."]])],
  [/manicure|unha|nail/, s("Serviços", [["Manicure e pedicure", "Unhas bem feitas e cuidadas."], ["Unhas em gel", "Alongamento e manutenção."], ["Esmaltação em gel", "Mais durabilidade e brilho."], ["Spa dos pés", "Hidratação e relaxamento."]])],
  [/sobrancel|c[ií]lio|lash/, s("Serviços", [["Design de sobrancelhas", "Formato que valoriza seu rosto."], ["Henna", "Preenchimento natural."], ["Extensão de cílios", "Olhar marcante todos os dias."], ["Lash lifting", "Curvatura natural sem extensão."]])],
  [/tatu|tattoo|piercing/, s("Serviços", [["Tatuagem personalizada", "Desenho criado junto com você."], ["Fine line", "Traços delicados e minimalistas."], ["Cobertura", "Renove uma tatuagem antiga."], ["Orçamento", "Mande sua ideia pelo WhatsApp."]])],
  [/sal[aã]o|cabele|beleza|est[eé]tic/, s("Serviços", [["Corte e escova", "Cabelo pronto para qualquer ocasião."], ["Coloração e mechas", "Transforme o visual com segurança."], ["Hidratação e tratamentos", "Fios fortes e com brilho."], ["Limpeza de pele", "Pele renovada e cuidada."]])],
  [/dent|odonto/, s("Tratamentos", [["Avaliação e limpeza", "Check-up e profilaxia."], ["Clareamento dental", "Sorriso mais branco."], ["Implantes e próteses", "Recupere a função e a estética."], ["Aparelho e alinhadores", "Dentes alinhados com acompanhamento."]])],
  [/fisio/, s("Tratamentos", [["Fisioterapia ortopédica", "Recuperação de lesões e dores."], ["RPG e postura", "Corrija a postura com acompanhamento."], ["Pilates clínico", "Fortalecimento com segurança."], ["Avaliação", "Entenda o seu caso."]])],
  [/psic/, s("Atendimentos", [["Terapia individual", "Escuta acolhedora e sigilosa."], ["Terapia de casal", "Mais diálogo e entendimento."], ["Atendimento online", "Sessões de onde você estiver."], ["Primeira conversa", "Tire suas dúvidas antes de começar."]])],
  [/nutri/, s("Atendimentos", [["Consulta nutricional", "Plano alimentar sob medida."], ["Emagrecimento", "Resultados com saúde."], ["Nutrição esportiva", "Mais rendimento nos treinos."], ["Retorno", "Acompanhamento da evolução."]])],
  [/pizz/, s("Cardápio", [["Pizzas tradicionais", "Os sabores clássicos de sempre."], ["Pizzas especiais", "Receitas da casa."], ["Pizzas doces", "Para fechar com chave de ouro."], ["Bebidas", "Refrigerantes e sucos."]], ["pizza", "pizza", "dessert", "plate"])],
  [/hamb|burger|lanch/, s("Cardápio", [["Hambúrgueres artesanais", "Pão macio e carne suculenta."], ["Combos", "Lanche, batata e bebida."], ["Porções", "Para dividir com a galera."], ["Sobremesas", "Doces para finalizar."]], ["burger", "burger", "plate", "dessert"])],
  [/a[cç]a[ií]|sorvet/, s("Cardápio", [["Açaí no copo", "Monte do seu jeito."], ["Sorvetes", "Vários sabores."], ["Adicionais", "Frutas, caldas e granola."], ["Milkshakes", "Cremosos e gelados."]], ["dessert", "dessert", "dessert", "dessert"])],
  [/padar|confeit|doce|bolo/, s("Produtos", [["Pães fresquinhos", "Saindo do forno todo dia."], ["Bolos e tortas", "Também por encomenda."], ["Salgados", "Para o lanche ou festa."], ["Café", "Acompanhamento perfeito."]], ["dessert", "dessert", "plate", "dessert"])],
  [/eletricist/, s("Serviços", [["Instalações elétricas", "Tomadas, disjuntores e fiação."], ["Manutenção", "Conserto de curtos e quedas de energia."], ["Iluminação", "Lustres, LED e projetos."], ["Orçamento", "Visita para avaliar o serviço."]])],
  [/encanad|hidr[aá]ul/, s("Serviços", [["Vazamentos", "Detecção e conserto."], ["Desentupimento", "Pias, ralos e esgoto."], ["Instalações", "Chuveiros, torneiras e caixas d'água."], ["Orçamento", "Visita para avaliar o serviço."]])],
  [/marcen|m[oó]veis/, s("Produtos", [["Móveis planejados", "Feitos sob medida para o seu espaço."], ["Cozinhas", "Funcionais e bonitas."], ["Guarda-roupas", "Organização para o quarto."], ["Projeto", "Desenho antes de produzir."]])],
  [/vidra/, s("Serviços", [["Box para banheiro", "Vários modelos e acabamentos."], ["Janelas e portas", "Vidro temperado sob medida."], ["Espelhos", "Corte e instalação."], ["Orçamento", "Medição no local."]])],
  [/serralh/, s("Serviços", [["Portões", "Manuais e automáticos."], ["Grades e corrimãos", "Segurança e acabamento."], ["Estruturas metálicas", "Coberturas e mezaninos."], ["Orçamento", "Visita para medir."]])],
  [/constru/, s("Produtos", [["Material básico", "Cimento, areia, tijolo e mais."], ["Elétrica e hidráulica", "Tudo para a obra."], ["Acabamento", "Pisos, tintas e louças."], ["Entrega", "Consulte a entrega na sua região."]])],
  [/contab/, s("Serviços", [["Abertura de empresa", "Do CNPJ ao alvará."], ["MEI", "Declaração e regularização."], ["Contabilidade mensal", "Impostos e folha em dia."], ["Imposto de renda", "Declaração sem dor de cabeça."]])],
  [/imobili/, s("Imóveis", [["Casas à venda", "Opções para sua família."], ["Aluguel", "Imóveis para morar ou trabalhar."], ["Avaliação", "Descubra quanto vale seu imóvel."], ["Anuncie conosco", "Venda ou alugue mais rápido."]])],
  [/assist[eê]ncia|celular|inform[aá]tica/, s("Serviços", [["Troca de tela", "Celulares e tablets."], ["Bateria", "Troca rápida."], ["Computadores", "Formatação e manutenção."], ["Orçamento", "Avaliação do aparelho."]])],
  [/costur/, s("Serviços", [["Ajustes", "Barras, cinturas e mangas."], ["Consertos", "Zíperes e reparos."], ["Sob medida", "Peças feitas para você."], ["Orçamento", "Traga sua peça."]])],
  [/gr[aá]fic/, s("Produtos", [["Cartões de visita", "Impressão de qualidade."], ["Banners e faixas", "Para divulgar seu negócio."], ["Adesivos", "Personalizados."], ["Arte", "Criação do layout."]])],
  [/fot[oó]gra/, s("Serviços", [["Ensaios", "Fotos com o seu estilo."], ["Casamentos", "Cobertura completa do grande dia."], ["Eventos", "Aniversários e festas."], ["Orçamento", "Conte a sua data."]])],
  [/escola|curso|refor[cç]o|idioma/, s("Cursos", [["Aulas regulares", "Turmas com acompanhamento."], ["Reforço", "Ajuda para melhorar as notas."], ["Aulas particulares", "Atenção individual."], ["Matrícula", "Garanta sua vaga."]])],
  [/floric|flor/, s("Produtos", [["Buquês", "Para todas as ocasiões."], ["Arranjos", "Decoração com flores."], ["Cestas", "Presentes especiais."], ["Entrega", "Consulte a entrega."]])],
];

export function demoCatalog(category: string, sector: Sector): Catalog {
  const c = category.toLocaleLowerCase("pt-BR");
  return NICHES.find(([re]) => re.test(c))?.[1] ?? SECTOR_CATALOG[sector];
}
