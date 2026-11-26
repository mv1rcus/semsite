export type PremiumKey = "poster" | "salao" | "pet" | "advocacia" | "oficina" | "imobiliaria" | "hamburgueria" | "pizzaria" | "barbearia" | "academia" | "restaurante" | "dentista" | "cafeteria";
export type PremiumModel = { id: string; ramo: PremiumKey; ramoLabel: string; style: string; name: string; city: string; cover: string; accent: string; tags: string[] };

export const img = (id: string, w = 1200, h?: number) => `https://images.unsplash.com/${id}?w=${w}${h ? `&h=${h}` : ""}&q=75&auto=format&fit=crop`;

export const PHOTO = {
  pizza: "photo-1513104890138-7c749659a591", barber: "photo-1585747860715-2ba37e788b70", gym: "photo-1517836357463-d25dfeac3438",
  gym2: "photo-1571019613454-1cb2f99b2d8b", terrace: "photo-1559339352-11d035aa65de", brunch: "photo-1493770348161-369560ae357d",
  salon: "photo-1521590832167-7bcbfaa6381f", dentist: "photo-1606811841689-23dfddce3e95", coffee: "photo-1495474472287-4d71bcdd2085",
  burger1: "photo-1568901346375-23c9450c58cd", burger2: "photo-1550547660-d9450f859349", burger3: "photo-1571091718767-18b5b1457add", burger4: "photo-1551782450-a2132b4ba21d", burger5: "photo-1550317138-10000687a72b", salmon: "photo-1467003909585-2f8a72700288", pasta: "photo-1473093295043-cdd812d0e601", ribs: "photo-1544025162-d76694265947",
  house: "photo-1600585154340-be6161a56a0c", law: "photo-1589829545856-d10d557cf95f", engine: "photo-1486262715619-67b85e0b08d3", dog: "photo-1587300003388-59208cc962cb",
  bread: "photo-1509440159596-0249088772ff", clinic: "photo-1519494026892-80bbd2d6fd0d",
} as const;

const LIVE_PREMIUM = ["brasa-e-pao", "focinho-feliz", "dom-navalha", "sorriso-verde"]; // modelos refeitos no padrao novo e liberados
const ALL_PREMIUM: PremiumModel[] = [
  { id: "brasa-e-pao", ramo: "hamburgueria", ramoLabel: "Hamburgueria", style: "Escuro com tipo gigante atrás do burger recortado", name: "Brasa&Pão", city: "Campinas", cover: "/brasa-cover.jpg", accent: "#ff5a1f", tags: ["hamburguer", "burger", "lanchonete", "smash", "escuro", "delivery"] },
  { id: "focinho-feliz", ramo: "pet", ramoLabel: "Pet shop", style: "Claro e verde, loja com carrinho e ofertas", name: "Focinho Feliz", city: "Curitiba", cover: "/pet-cover.jpg", accent: "#16491c", tags: ["pet", "petshop", "racao", "cachorro", "loja", "verde", "claro", "ecommerce"] },
  { id: "dom-navalha", ramo: "barbearia", ramoLabel: "Barbearia", style: "Claro e elegante, creme e dourado, com agendamento", name: "Dom Navalha", city: "Porto Alegre", cover: "/barber-cover.jpg", accent: "#a98457", tags: ["barbearia", "barbeiro", "claro", "elegante", "agendamento"] },
  { id: "sorriso-verde", ramo: "dentista", ramoLabel: "Odontologia", style: "Claro em verde menta, dente 3D e agendamento", name: "Sorriso Verde", city: "Florianópolis", cover: "/dental-cover.jpg", accent: "#12423a", tags: ["dentista", "odontologia", "clinica", "saude", "claro", "verde", "agendamento"] },
  { id: "smash-poster", ramo: "poster", ramoLabel: "Hamburgueria", style: "Pôster com tipo gigante e parallax", name: "Smash Poster", city: "São Paulo", cover: PHOTO.burger1, accent: "#ef3b2d", tags: ["hamburguer", "burger", "poster", "tipografia", "parallax", "escuro"] },
  { id: "amigo-fiel", ramo: "pet", ramoLabel: "Pet shop", style: "Pôster colorido com tipo gigante", name: "Amigo Fiel", city: "Curitiba", cover: PHOTO.dog, accent: "#ff7a1a", tags: ["pet", "petshop", "cachorro", "veterinaria", "poster", "colorido"] },
  { id: "studio-fio", ramo: "salao", ramoLabel: "Salão de beleza", style: "Editorial rosé", name: "Studio Fio", city: "Belo Horizonte", cover: PHOTO.salon, accent: "#b5546b", tags: ["salao", "beleza", "cabelo", "estetica", "editorial", "claro"] },
  { id: "silva-lima", ramo: "advocacia", ramoLabel: "Advocacia", style: "Sóbrio azul-marinho", name: "Silva & Lima", city: "Brasília", cover: PHOTO.law, accent: "#c9a24b", tags: ["advocacia", "advogado", "juridico", "escritorio", "sobrio"] },
  { id: "motor-certo", ramo: "oficina", ramoLabel: "Oficina mecânica", style: "Industrial amarelo", name: "Motor Certo", city: "Campinas", cover: PHOTO.engine, accent: "#ffc61a", tags: ["oficina", "mecanica", "carro", "auto", "industrial"] },
  { id: "casa-alta", ramo: "imobiliaria", ramoLabel: "Imobiliária", style: "Tela cheia com busca", name: "Casa Alta", city: "Rio de Janeiro", cover: PHOTO.house, accent: "#2f6f5e", tags: ["imobiliaria", "imovel", "casa", "corretor", "aluguel"] },
  { id: "chapa-quente", ramo: "hamburgueria", ramoLabel: "Hamburgueria", style: "Escuro com destaque", name: "Chapa Quente", city: "São Paulo", cover: PHOTO.burger4, accent: "#ef3b2d", tags: ["hamburguer", "burger", "lanche", "escuro"] },
  { id: "forno-vivo", ramo: "pizzaria", ramoLabel: "Pizzaria", style: "Editorial escuro", name: "Forno Vivo", city: "Porto Alegre", cover: PHOTO.pizza, accent: "#e0452b", tags: ["pizza", "escuro", "editorial"] },
  { id: "navalha-real", ramo: "barbearia", ramoLabel: "Barbearia", style: "Preto e dourado", name: "Navalha Real", city: "Belo Horizonte", cover: PHOTO.barber, accent: "#c9a24b", tags: ["barbearia", "dourado", "classico"] },
  { id: "iron-box", ramo: "academia", ramoLabel: "Academia", style: "Impacto neon", name: "Iron Box", city: "Rio de Janeiro", cover: PHOTO.gym, accent: "#c6ff3d", tags: ["academia", "neon", "bold", "fitness"] },
  { id: "mesa-posta", ramo: "restaurante", ramoLabel: "Restaurante", style: "Elegante claro", name: "Mesa Posta", city: "Florianópolis", cover: PHOTO.terrace, accent: "#8a5a3c", tags: ["restaurante", "elegante", "claro"] },
  { id: "sorriso-pleno", ramo: "dentista", ramoLabel: "Odontologia", style: "Clínico moderno", name: "Sorriso Pleno", city: "Curitiba", cover: PHOTO.dentist, accent: "#0ea5a4", tags: ["dentista", "clinica", "saude", "claro"] },
  { id: "grao-dourado", ramo: "cafeteria", ramoLabel: "Cafeteria", style: "Aconchego artesanal", name: "Grão Dourado", city: "Recife", cover: PHOTO.coffee, accent: "#b8642a", tags: ["cafe", "cafeteria", "artesanal"] },
];
// Reset geral: todos os modelos antigos ficam fora do ar. Novos modelos entram um a um (codigo antigo segue no historico do git).
export const HIDDEN_PREMIUM = new Set(ALL_PREMIUM.map((m) => m.id).filter((id) => !LIVE_PREMIUM.includes(id)));
export const PREMIUM_MODELS: PremiumModel[] = ALL_PREMIUM.filter((m) => !HIDDEN_PREMIUM.has(m.id));
export const getPremium = (id: string) => PREMIUM_MODELS.find((m) => m.id === id);

const SYN: Record<string, string> = {
  hamburgueria: "hamburgueria hamburguer hambúrguer burger lanche lanchonete smash", pizzaria: "pizzaria pizza pizzaiolo forno", barbearia: "barbearia barbeiro barba corte cabelo masculino",
  academia: "academia musculação treino fitness crossfit", restaurante: "restaurante comida almoço jantar gastronomia", dentista: "dentista odontologia odonto clínica sorriso saúde",
  cafeteria: "cafeteria café padaria confeitaria doceria", poster: "hamburgueria hamburguer hambúrguer burger lanche smash pôster", salao: "salão beleza cabelo cabeleireiro estética manicure unhas",
  pet: "pet petshop pet shop cachorro gato veterinária banho tosa", advocacia: "advocacia advogado jurídico escritório direito", oficina: "oficina mecânica carro auto automotivo", imobiliaria: "imobiliária imóveis imóvel casa apartamento corretor aluguel",
};
const norm = (t: string) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
export const searchPremium = (q: string, list: PremiumModel[] = PREMIUM_MODELS) => {
  const words = norm(q).split(/\s+/).filter(Boolean);
  return words.length === 0 ? list : list.filter((m) => { const hay = norm([m.name, m.ramoLabel, m.style, ...m.tags, SYN[m.ramo] ?? ""].join(" ")); return words.every((w) => hay.includes(w)); });
};
