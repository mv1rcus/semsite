export type Sector = "health" | "beauty" | "food" | "gym" | "law" | "pet" | "auto" | "services";
export type CatalogItem = { title: string; text: string; price?: string; photo?: "pizza" | "burger" | "plate" | "dessert" };

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

/** Itens e preços ilustrativos para o cliente revisar — o aviso no topo da demo deixa isso claro. */
export const SECTOR_CATALOG: Record<Sector, { title: string; items: CatalogItem[] }> = {
  food: { title: "Cardápio", items: [
    { title: "Pizzas", text: "Sabores tradicionais e especiais, direto do forno.", photo: "pizza" },
    { title: "Lanches", text: "Hambúrgueres e porções para todos os gostos.", photo: "burger" },
    { title: "Pratos do dia", text: "Refeições completas e caseiras.", photo: "plate" },
    { title: "Sobremesas", text: "Doces e cafés para fechar com chave de ouro.", photo: "dessert" },
  ] },
  health: { title: "Serviços", items: [
    { title: "Consultas", text: "Atendimento com hora marcada.", price: "a partir de R$ 150" },
    { title: "Avaliação inicial", text: "Primeiro contato para entender sua necessidade.", price: "a partir de R$ 60" },
    { title: "Acompanhamento", text: "Retornos e cuidado contínuo.", price: "a partir de R$ 100" },
    { title: "Exames e procedimentos", text: "Consulte a disponibilidade com a equipe.", price: "valores sob consulta" },
  ] },
  beauty: { title: "Serviços", items: [
    { title: "Cortes", text: "Estilo do clássico ao moderno.", price: "a partir de R$ 40" },
    { title: "Barba e acabamento", text: "Cuidado nos detalhes.", price: "a partir de R$ 30" },
    { title: "Coloração e química", text: "Transforme o visual com segurança.", price: "a partir de R$ 90" },
    { title: "Estética", text: "Tratamentos para pele e bem-estar.", price: "a partir de R$ 70" },
  ] },
  gym: { title: "Modalidades", items: [
    { title: "Musculação", text: "Área completa de pesos e máquinas.", price: "a partir de R$ 89/mês" },
    { title: "Aeróbico", text: "Esteiras, bikes e elípticos.", price: "a partir de R$ 89/mês" },
    { title: "Aulas coletivas", text: "Treinos em grupo com energia.", price: "a partir de R$ 99/mês" },
    { title: "Acompanhamento", text: "Orientação para montar seu treino.", price: "a partir de R$ 100" },
  ] },
  law: { title: "Áreas de atuação", items: [
    { title: "Direito Civil", text: "Contratos, indenizações e família.", price: "valores sob consulta" },
    { title: "Direito Trabalhista", text: "Orientação para empregados e empresas.", price: "valores sob consulta" },
    { title: "Direito Previdenciário", text: "Aposentadorias e benefícios.", price: "valores sob consulta" },
    { title: "Consultoria", text: "Atendimento para entender o seu caso.", price: "valores sob consulta" },
  ] },
  pet: { title: "Serviços", items: [
    { title: "Banho e tosa", text: "Seu pet limpinho e cheiroso.", price: "a partir de R$ 50" },
    { title: "Produtos", text: "Rações, petiscos e acessórios.", price: "a partir de R$ 15" },
    { title: "Cuidados", text: "Atenção ao bem-estar do seu animal.", price: "valores sob consulta" },
    { title: "Agendamento", text: "Marque o melhor horário pelo WhatsApp.", price: "grátis" },
  ] },
  auto: { title: "Serviços", items: [
    { title: "Revisão", text: "Manutenção preventiva do seu veículo.", price: "a partir de R$ 200" },
    { title: "Troca de óleo", text: "Rápido e com qualidade.", price: "a partir de R$ 120" },
    { title: "Freios e suspensão", text: "Segurança em primeiro lugar.", price: "a partir de R$ 180" },
    { title: "Diagnóstico", text: "Avaliação para encontrar o problema.", price: "a partir de R$ 80" },
  ] },
  services: { title: "Serviços", items: [
    { title: "Atendimento", text: "Fale com a equipe e tire suas dúvidas.", price: "valores sob consulta" },
    { title: "Orçamento", text: "Solicite sem compromisso.", price: "grátis" },
    { title: "Agendamento", text: "Escolha o melhor horário.", price: "grátis" },
    { title: "Suporte", text: "Acompanhamento depois do serviço.", price: "valores sob consulta" },
  ] },
};

type Catalog = { title: string; items: CatalogItem[] };
const s = (title: string, list: [string, string][], photo?: CatalogItem["photo"][], prices?: string[]): Catalog =>
  ({ title, items: list.map(([t, x], i) => ({ title: t, text: x, ...(photo?.[i] ? { photo: photo[i] } : {}), ...(prices?.[i] ? { price: prices[i] } : {}) })) });

/** Catálogos específicos por ramo (testados em ordem); caem no catálogo do setor se nada bater. */
const NICHES: [RegExp, Catalog][] = [
  [/copiador|xerox/, s("Serviços", [["Cópias e impressões", "Preto e branco ou coloridas, na hora."], ["Encadernação", "Espiral e capa para seus trabalhos."], ["Plastificação", "Documentos protegidos."], ["Impressão de fotos", "Fotos e documentos com qualidade."]], undefined, ["a partir de R$ 1", "a partir de R$ 15", "a partir de R$ 5", "a partir de R$ 10"])],
  [/advoca|advogad|jur[ií]dic/, s("Áreas de atuação", [["Direito trabalhista", "Orientação para empregados e empresas."], ["Direito de família", "Divórcio, pensão e guarda."], ["Direito previdenciário", "Aposentadorias e benefícios."], ["Direito do consumidor", "Defesa contra cobranças e abusos."]], undefined, ["valores sob consulta", "valores sob consulta", "valores sob consulta", "valores sob consulta"])],
  [/[oó]tica/, s("Produtos", [["Óculos de grau", "Armações para todos os estilos."], ["Óculos de sol", "Proteção com estilo."], ["Lentes", "Multifocais, antirreflexo e mais."], ["Ajustes", "Conserto e regulagem."]], undefined, ["a partir de R$ 200", "a partir de R$ 150", "a partir de R$ 300", "a partir de R$ 20"])],
  [/auto ?escola|cfc/, s("Cursos", [["Primeira habilitação", "Carro e moto."], ["Adição de categoria", "Acrescente A ou B."], ["Aulas para habilitados", "Perca o medo de dirigir."], ["Renovação", "Orientação completa."]], undefined, ["a partir de R$ 1.200", "valores sob consulta", "a partir de R$ 80/aula", "valores sob consulta"])],
  [/marmit/, s("Cardápio", [["Marmita tradicional", "Arroz, feijão, carne e salada."], ["Marmita fitness", "Leve e equilibrada."], ["Prato do dia", "Muda todo dia."], ["Entrega", "Consulte a região."]], ["plate", "plate", "plate"], ["a partir de R$ 15", "a partir de R$ 18", "a partir de R$ 16", "consulte a região"])],
  [/espetinh|churrasc/, s("Cardápio", [["Espetinhos", "Carne, frango, linguiça e mais."], ["Jantinha", "Espeto com acompanhamentos."], ["Porções", "Para dividir."], ["Bebidas", "Geladas."]], ["plate", "plate", "plate"], ["a partir de R$ 8", "a partir de R$ 15", "a partir de R$ 20", "a partir de R$ 5"])],
  [/buffet/, s("Serviços", [["Festas infantis", "Decoração e cardápio completos."], ["Casamentos", "O grande dia sem preocupação."], ["Eventos corporativos", "Coffee break e jantares."], ["Orçamento", "Conte a data do evento."]], undefined, ["a partir de R$ 50/pessoa", "valores sob consulta", "valores sob consulta", "grátis"])],
  [/depila/, s("Serviços", [["Depilação com cera", "Rápida e cuidadosa."], ["Depilação a laser", "Resultado duradouro."], ["Pacotes", "Mais áreas, melhor preço."], ["Avaliação", "Tire suas dúvidas."]], undefined, ["a partir de R$ 30", "a partir de R$ 80", "valores sob consulta", "grátis"])],
  [/climatiz|ar condicionado|refrigera/, s("Serviços", [["Instalação de ar", "Split e janela."], ["Limpeza e higienização", "Ar mais saudável."], ["Manutenção", "Preventiva e corretiva."], ["Orçamento", "Sem compromisso."]], undefined, ["a partir de R$ 400", "a partir de R$ 120", "valores sob consulta", "grátis"])],
  [/gesseir|gesso|drywall/, s("Serviços", [["Forro de gesso", "Acabamento liso e bonito."], ["Drywall", "Paredes e divisórias."], ["Sancas e molduras", "Iluminação embutida."], ["Orçamento", "Visita técnica."]], undefined, ["a partir de R$ 60/m²", "a partir de R$ 80/m²", "valores sob consulta", "grátis"])],
  [/pintor|pintura residencial/, s("Serviços", [["Pintura interna", "Paredes limpas e renovadas."], ["Pintura externa", "Fachadas e muros."], ["Textura e grafiato", "Acabamentos especiais."], ["Orçamento", "Sem compromisso."]], undefined, ["a partir de R$ 25/m²", "a partir de R$ 30/m²", "valores sob consulta", "grátis"])],
  [/moto ?pe[cç]|motope/, s("Produtos", [["Peças de motor", "Kits e reparos."], ["Pneus e câmaras", "Várias medidas."], ["Acessórios", "Capacetes e baús."], ["Óleo e revisão", "Troca rápida."]], undefined, ["a partir de R$ 50", "a partir de R$ 150", "a partir de R$ 30", "a partir de R$ 25"])],
  [/pet|veterin|banho e tosa/, s("Serviços", [["Banho e tosa", "Seu pet cheiroso e bonito."], ["Consulta veterinária", "Cuidado com quem você ama."], ["Ração e petiscos", "As melhores marcas."], ["Acessórios", "Coleiras, camas e brinquedos."]], undefined, ["a partir de R$ 50", "a partir de R$ 120", "a partir de R$ 20", "a partir de R$ 15"])],
  [/academ|crossfit|fitness|muscula/, s("Planos", [["Musculação", "Treino com acompanhamento."], ["Aulas coletivas", "Funcional, dança e mais."], ["Avaliação física", "Conheça seu ponto de partida."], ["Planos", "Mensal, trimestral e anual."]], undefined, ["a partir de R$ 89/mês", "a partir de R$ 99/mês", "grátis", "a partir de R$ 89/mês"])],
  [/lava|lavagem|est[eé]tica auto|polimento|detail/, s("Serviços", [["Lavagem completa", "Por fora e por dentro, com acabamento caprichado."], ["Higienização interna", "Bancos, carpetes e teto limpos e sem odor."], ["Polimento", "Pintura revitalizada e com brilho de novo."], ["Cristalização e proteção", "Proteção extra para a pintura durar mais."]], undefined, ["a partir de R$ 60", "a partir de R$ 150", "a partir de R$ 300", "a partir de R$ 500"])],
  [/borrach|pneu/, s("Serviços", [["Conserto de pneus", "Remendo rápido para você seguir viagem."], ["Venda de pneus", "Opções novas e para vários modelos."], ["Alinhamento e balanceamento", "Mais segurança e economia de pneu."], ["Calibragem", "Pressão certa em poucos minutos."]], undefined, ["a partir de R$ 25", "a partir de R$ 300", "a partir de R$ 80", "grátis"])],
  [/el[eé]tric.*auto|auto.*el[eé]tric/, s("Serviços", [["Bateria", "Teste, carga e troca de bateria."], ["Partida e alternador", "Carro que não pega? A gente resolve."], ["Iluminação", "Faróis, lanternas e setas funcionando."], ["Diagnóstico elétrico", "Avaliação para achar a falha."]], undefined, ["a partir de R$ 80", "a partir de R$ 150", "a partir de R$ 60", "a partir de R$ 100"])],
  [/funilar|pintura/, s("Serviços", [["Funilaria", "Amassados e batidas recuperados."], ["Pintura", "Cor igual à original."], ["Martelinho de ouro", "Pequenos amassados sem pintar."], ["Orçamento", "Mande uma foto e peça seu orçamento."]], undefined, ["valores sob consulta", "valores sob consulta", "a partir de R$ 150", "grátis"])],
  [/autope[cç]/, s("Produtos", [["Peças de motor", "Filtros, correias, velas e mais."], ["Freios e suspensão", "Pastilhas, discos e amortecedores."], ["Elétrica", "Lâmpadas, baterias e acessórios."], ["Encomendas", "Não achou? Consulte pelo WhatsApp."]], undefined, ["a partir de R$ 30", "a partir de R$ 80", "a partir de R$ 20", "valores sob consulta"])],
  [/barb/, s("Serviços", [["Corte degradê e clássico", "Do tradicional ao moderno."], ["Barboterapia", "Barba feita com toalha quente."], ["Combo barba e cabelo", "O pacote completo para sair na régua."], ["Pigmentação e acabamento", "Detalhes que fazem a diferença."]], undefined, ["a partir de R$ 35", "a partir de R$ 40", "a partir de R$ 60", "a partir de R$ 25"])],
  [/manicure|unha|nail/, s("Serviços", [["Manicure e pedicure", "Unhas bem feitas e cuidadas."], ["Unhas em gel", "Alongamento e manutenção."], ["Esmaltação em gel", "Mais durabilidade e brilho."], ["Spa dos pés", "Hidratação e relaxamento."]], undefined, ["a partir de R$ 30", "a partir de R$ 120", "a partir de R$ 60", "a partir de R$ 40"])],
  [/sobrancel|c[ií]lio|lash/, s("Serviços", [["Design de sobrancelhas", "Formato que valoriza seu rosto."], ["Henna", "Preenchimento natural."], ["Extensão de cílios", "Olhar marcante todos os dias."], ["Lash lifting", "Curvatura natural sem extensão."]], undefined, ["a partir de R$ 40", "a partir de R$ 30", "a partir de R$ 150", "a partir de R$ 120"])],
  [/tatu|tattoo|piercing/, s("Serviços", [["Tatuagem personalizada", "Desenho criado junto com você."], ["Fine line", "Traços delicados e minimalistas."], ["Cobertura", "Renove uma tatuagem antiga."], ["Orçamento", "Mande sua ideia pelo WhatsApp."]], undefined, ["a partir de R$ 200", "a partir de R$ 250", "valores sob consulta", "grátis"])],
  [/sal[aã]o|cabele|beleza|est[eé]tic/, s("Serviços", [["Corte e escova", "Cabelo pronto para qualquer ocasião."], ["Coloração e mechas", "Transforme o visual com segurança."], ["Hidratação e tratamentos", "Fios fortes e com brilho."], ["Limpeza de pele", "Pele renovada e cuidada."]], undefined, ["a partir de R$ 50", "a partir de R$ 120", "a partir de R$ 60", "a partir de R$ 80"])],
  [/dent|odonto/, s("Tratamentos", [["Avaliação e limpeza", "Check-up e profilaxia."], ["Clareamento dental", "Sorriso mais branco."], ["Implantes e próteses", "Recupere a função e a estética."], ["Aparelho e alinhadores", "Dentes alinhados com acompanhamento."]], undefined, ["a partir de R$ 150", "a partir de R$ 400", "valores sob consulta", "valores sob consulta"])],
  [/fisio/, s("Tratamentos", [["Fisioterapia ortopédica", "Recuperação de lesões e dores."], ["RPG e postura", "Corrija a postura com acompanhamento."], ["Pilates clínico", "Fortalecimento com segurança."], ["Avaliação", "Entenda o seu caso."]], undefined, ["a partir de R$ 120", "a partir de R$ 100", "a partir de R$ 90", "a partir de R$ 80"])],
  [/psic/, s("Atendimentos", [["Terapia individual", "Escuta acolhedora e sigilosa."], ["Terapia de casal", "Mais diálogo e entendimento."], ["Atendimento online", "Sessões de onde você estiver."], ["Primeira conversa", "Tire suas dúvidas antes de começar."]], undefined, ["a partir de R$ 120", "a partir de R$ 150", "a partir de R$ 100", "grátis"])],
  [/nutri/, s("Atendimentos", [["Consulta nutricional", "Plano alimentar sob medida."], ["Emagrecimento", "Resultados com saúde."], ["Nutrição esportiva", "Mais rendimento nos treinos."], ["Retorno", "Acompanhamento da evolução."]], undefined, ["a partir de R$ 150", "valores sob consulta", "valores sob consulta", "a partir de R$ 80"])],
  [/pizz/, s("Cardápio", [["Pizzas tradicionais", "Os sabores clássicos de sempre."], ["Pizzas especiais", "Receitas da casa."], ["Pizzas doces", "Para fechar com chave de ouro."], ["Bebidas", "Refrigerantes e sucos."]], ["pizza", "pizza", "dessert", "plate"], ["a partir de R$ 35", "a partir de R$ 45", "a partir de R$ 25", "a partir de R$ 5"])],
  [/hamb|burger|lanch/, s("Cardápio", [["Hambúrgueres artesanais", "Pão macio e carne suculenta."], ["Combos", "Lanche, batata e bebida."], ["Porções", "Para dividir com a galera."], ["Sobremesas", "Doces para finalizar."]], ["burger", "burger", "plate", "dessert"], ["a partir de R$ 25", "a partir de R$ 35", "a partir de R$ 20", "a partir de R$ 12"])],
  [/a[cç]a[ií]|sorvet/, s("Cardápio", [["Açaí no copo", "Monte do seu jeito."], ["Sorvetes", "Vários sabores."], ["Adicionais", "Frutas, caldas e granola."], ["Milkshakes", "Cremosos e gelados."]], ["dessert", "dessert", "dessert", "dessert"], ["a partir de R$ 12", "a partir de R$ 10", "a partir de R$ 3", "a partir de R$ 15"])],
  [/padar|confeit|doce|bolo/, s("Produtos", [["Pães fresquinhos", "Saindo do forno todo dia."], ["Bolos e tortas", "Também por encomenda."], ["Salgados", "Para o lanche ou festa."], ["Café", "Acompanhamento perfeito."]], ["dessert", "dessert", "plate", "dessert"], ["a partir de R$ 8", "a partir de R$ 25", "a partir de R$ 6", "a partir de R$ 4"])],
  [/eletricist/, s("Serviços", [["Instalações elétricas", "Tomadas, disjuntores e fiação."], ["Manutenção", "Conserto de curtos e quedas de energia."], ["Iluminação", "Lustres, LED e projetos."], ["Orçamento", "Visita para avaliar o serviço."]], undefined, ["a partir de R$ 80", "a partir de R$ 100", "valores sob consulta", "grátis"])],
  [/encanad|hidr[aá]ul/, s("Serviços", [["Vazamentos", "Detecção e conserto."], ["Desentupimento", "Pias, ralos e esgoto."], ["Instalações", "Chuveiros, torneiras e caixas d'água."], ["Orçamento", "Visita para avaliar o serviço."]], undefined, ["a partir de R$ 100", "a partir de R$ 120", "valores sob consulta", "grátis"])],
  [/marcen|m[oó]veis/, s("Produtos", [["Móveis planejados", "Feitos sob medida para o seu espaço."], ["Cozinhas", "Funcionais e bonitas."], ["Guarda-roupas", "Organização para o quarto."], ["Projeto", "Desenho antes de produzir."]], undefined, ["valores sob consulta", "valores sob consulta", "valores sob consulta", "grátis"])],
  [/vidra/, s("Serviços", [["Box para banheiro", "Vários modelos e acabamentos."], ["Janelas e portas", "Vidro temperado sob medida."], ["Espelhos", "Corte e instalação."], ["Orçamento", "Medição no local."]], undefined, ["a partir de R$ 400", "valores sob consulta", "a partir de R$ 200", "grátis"])],
  [/serralh/, s("Serviços", [["Portões", "Manuais e automáticos."], ["Grades e corrimãos", "Segurança e acabamento."], ["Estruturas metálicas", "Coberturas e mezaninos."], ["Orçamento", "Visita para medir."]], undefined, ["a partir de R$ 500", "a partir de R$ 150", "valores sob consulta", "grátis"])],
  [/constru/, s("Produtos", [["Material básico", "Cimento, areia, tijolo e mais."], ["Elétrica e hidráulica", "Tudo para a obra."], ["Acabamento", "Pisos, tintas e louças."], ["Entrega", "Consulte a entrega na sua região."]], undefined, ["a partir de R$ 10", "valores sob consulta", "valores sob consulta", "consulte a região"])],
  [/contab/, s("Serviços", [["Abertura de empresa", "Do CNPJ ao alvará."], ["MEI", "Declaração e regularização."], ["Contabilidade mensal", "Impostos e folha em dia."], ["Imposto de renda", "Declaração sem dor de cabeça."]], undefined, ["a partir de R$ 300", "a partir de R$ 150", "a partir de R$ 200/mês", "a partir de R$ 250"])],
  [/imobili/, s("Imóveis", [["Casas à venda", "Opções para sua família."], ["Aluguel", "Imóveis para morar ou trabalhar."], ["Avaliação", "Descubra quanto vale seu imóvel."], ["Anuncie conosco", "Venda ou alugue mais rápido."]], undefined, ["valores sob consulta", "valores sob consulta", "valores sob consulta", "grátis"])],
  [/assist[eê]ncia|celular|inform[aá]tica/, s("Serviços", [["Troca de tela", "Celulares e tablets."], ["Bateria", "Troca rápida."], ["Computadores", "Formatação e manutenção."], ["Orçamento", "Avaliação do aparelho."]], undefined, ["a partir de R$ 100", "a partir de R$ 80", "a partir de R$ 60", "grátis"])],
  [/costur/, s("Serviços", [["Ajustes", "Barras, cinturas e mangas."], ["Consertos", "Zíperes e reparos."], ["Sob medida", "Peças feitas para você."], ["Orçamento", "Traga sua peça."]], undefined, ["a partir de R$ 15", "a partir de R$ 20", "valores sob consulta", "grátis"])],
  [/gr[aá]fic/, s("Produtos", [["Cartões de visita", "Impressão de qualidade."], ["Banners e faixas", "Para divulgar seu negócio."], ["Adesivos", "Personalizados."], ["Arte", "Criação do layout."]], undefined, ["a partir de R$ 30", "a partir de R$ 50", "a partir de R$ 20", "a partir de R$ 40"])],
  [/fot[oó]gra/, s("Serviços", [["Ensaios", "Fotos com o seu estilo."], ["Casamentos", "Cobertura completa do grande dia."], ["Eventos", "Aniversários e festas."], ["Orçamento", "Conte a sua data."]], undefined, ["a partir de R$ 300", "a partir de R$ 1.500", "a partir de R$ 500", "grátis"])],
  [/escola|curso|refor[cç]o|idioma/, s("Cursos", [["Aulas regulares", "Turmas com acompanhamento."], ["Reforço", "Ajuda para melhorar as notas."], ["Aulas particulares", "Atenção individual."], ["Matrícula", "Garanta sua vaga."]], undefined, ["a partir de R$ 200/mês", "a partir de R$ 150/mês", "a partir de R$ 60/aula", "valores sob consulta"])],
  [/floric|flor/, s("Produtos", [["Buquês", "Para todas as ocasiões."], ["Arranjos", "Decoração com flores."], ["Cestas", "Presentes especiais."], ["Entrega", "Consulte a entrega."]], undefined, ["a partir de R$ 60", "a partir de R$ 80", "a partir de R$ 90", "consulte a região"])],
];


/** Avaliações ilustrativas por setor — usadas só quando a demo ainda não tem avaliações reais do Google. */
export const SECTOR_REVIEWS: Record<Sector, { author: string; rating: number; text: string; when: string }[]> = {
  food: [
    { author: "Mariana S.", rating: 5, text: "Pedido chegou quentinho e antes do prazo. Virou o favorito de sexta-feira aqui em casa.", when: "há 2 semanas" },
    { author: "Carlos M.", rating: 5, text: "Comida de verdade, porção generosa e preço justo.", when: "há 1 mês" },
    { author: "Fernanda L.", rating: 4, text: "Atendimento rápido no WhatsApp e retirada sem fila. Recomendo.", when: "há 3 semanas" },
  ],
  health: [
    { author: "Patrícia R.", rating: 5, text: "Atendimento atencioso do início ao fim, tudo explicado com calma.", when: "há 1 semana" },
    { author: "João P.", rating: 5, text: "Clínica organizada, sem atraso no horário marcado.", when: "há 3 semanas" },
    { author: "Luciana A.", rating: 5, text: "Profissional cuidadoso, resultado melhor do que eu esperava.", when: "há 1 mês" },
  ],
  beauty: [
    { author: "Camila T.", rating: 5, text: "Saí de lá me sentindo outra pessoa. Ambiente lindo e acolhedor.", when: "há 2 semanas" },
    { author: "Rafaela M.", rating: 5, text: "Agendamento fácil pelo WhatsApp e horário respeitado.", when: "há 1 mês" },
    { author: "Bruno C.", rating: 4, text: "Profissionais muito atenciosos, resultado impecável.", when: "há 3 semanas" },
  ],
  gym: [
    { author: "Diego F.", rating: 5, text: "Aparelhos novos e treino montado para mim. Evoluí muito em 3 meses.", when: "há 2 semanas" },
    { author: "Aline R.", rating: 5, text: "Aulas coletivas com energia demais, viciei.", when: "há 1 mês" },
    { author: "Marcos V.", rating: 4, text: "Ambiente bom e horários flexíveis.", when: "há 3 semanas" },
  ],
  law: [
    { author: "Roberto S.", rating: 5, text: "Explicaram meu caso com clareza e resolveram mais rápido que o esperado.", when: "há 1 mês" },
    { author: "Juliana C.", rating: 5, text: "Atendimento humano e profissional. Recomendo de olhos fechados.", when: "há 2 meses" },
    { author: "Paulo H.", rating: 5, text: "Retorno rápido e tudo combinado por escrito. Muita segurança.", when: "há 3 semanas" },
  ],
  pet: [
    { author: "Tatiana L.", rating: 5, text: "Meu cachorro voltou cheiroso e tranquilo. Dá para ver que gostam de animais.", when: "há 1 semana" },
    { author: "Eduardo M.", rating: 5, text: "Preço justo e serviço de qualidade, tosaram com muito cuidado.", when: "há 3 semanas" },
    { author: "Beatriz N.", rating: 5, text: "Agendei pelo WhatsApp em 2 minutos. Muito prático.", when: "há 1 mês" },
  ],
  auto: [
    { author: "André P.", rating: 5, text: "Diagnóstico certeiro e preço combinado antes do serviço. Sem surpresa.", when: "há 2 semanas" },
    { author: "Marcelo R.", rating: 5, text: "Carro ficou pronto no prazo e funcionando perfeitamente.", when: "há 1 mês" },
    { author: "Sandra K.", rating: 4, text: "Atendimento honesto, explicaram cada item do orçamento.", when: "há 3 semanas" },
  ],
  services: [
    { author: "Renato G.", rating: 5, text: "Orçamento no mesmo dia e serviço muito bem feito.", when: "há 1 semana" },
    { author: "Cláudia B.", rating: 5, text: "Equipe pontual e caprichosa, resolveu de primeira.", when: "há 2 semanas" },
    { author: "Fábio T.", rating: 5, text: "Preço justo e garantia do serviço. Indico.", when: "há 1 mês" },
  ],
};

export function demoCatalog(category: string, sector: Sector): Catalog {
  const c = category.toLocaleLowerCase("pt-BR");
  return NICHES.find(([re]) => re.test(c))?.[1] ?? SECTOR_CATALOG[sector];
                                }
