export type PremiumKey = "hamburgueria" | "pizzaria" | "barbearia" | "academia" | "restaurante" | "dentista" | "cafeteria";
export type PremiumModel = { id: string; ramo: PremiumKey; ramoLabel: string; style: string; name: string; city: string; cover: string; accent: string; tags: string[] };

export const img = (id: string, w = 1200, h?: number) => `https://images.unsplash.com/${id}?w=${w}${h ? `&h=${h}` : ""}&q=75&auto=format&fit=crop`;

export const PHOTO = {
  pizza: "photo-1513104890138-7c749659a591", barber: "photo-1585747860715-2ba37e788b70", gym: "photo-1517836357463-d25dfeac3438",
  gym2: "photo-1571019613454-1cb2f99b2d8b", terrace: "photo-1559339352-11d035aa65de", brunch: "photo-1493770348161-369560ae357d",
  salon: "photo-1521590832167-7bcbfaa6381f", dentist: "photo-1606811841689-23dfddce3e95", coffee: "photo-1495474472287-4d71bcdd2085",
  burger1: "photo-1568901346375-23c9450c58cd", burger2: "photo-1550547660-d9450f859349", burger3: "photo-1571091718767-18b5b1457add", burger4: "photo-1551782450-a2132b4ba21d", burger5: "photo-1550317138-10000687a72b", salmon: "photo-1467003909585-2f8a72700288", pasta: "photo-1473093295043-cdd812d0e601", ribs: "photo-1544025162-d76694265947",
  bread: "photo-1509440159596-0249088772ff", clinic: "photo-1519494026892-80bbd2d6fd0d",
} as const;

export const PREMIUM_MODELS: PremiumModel[] = [
  { id: "chapa-quente", ramo: "hamburgueria", ramoLabel: "Hamburgueria", style: "Escuro com destaque", name: "Chapa Quente", city: "Juiz de Fora", cover: PHOTO.burger4, accent: "#ef3b2d", tags: ["hamburguer", "burger", "lanche", "escuro"] },
  { id: "forno-vivo", ramo: "pizzaria", ramoLabel: "Pizzaria", style: "Editorial escuro", name: "Forno Vivo", city: "Juiz de Fora", cover: PHOTO.pizza, accent: "#e0452b", tags: ["pizza", "escuro", "editorial"] },
  { id: "navalha-real", ramo: "barbearia", ramoLabel: "Barbearia", style: "Preto e dourado", name: "Navalha Real", city: "Juiz de Fora", cover: PHOTO.barber, accent: "#c9a24b", tags: ["barbearia", "dourado", "classico"] },
  { id: "iron-box", ramo: "academia", ramoLabel: "Academia", style: "Impacto neon", name: "Iron Box", city: "Juiz de Fora", cover: PHOTO.gym, accent: "#c6ff3d", tags: ["academia", "neon", "bold", "fitness"] },
  { id: "mesa-posta", ramo: "restaurante", ramoLabel: "Restaurante", style: "Elegante claro", name: "Mesa Posta", city: "Juiz de Fora", cover: PHOTO.terrace, accent: "#8a5a3c", tags: ["restaurante", "elegante", "claro"] },
  { id: "sorriso-pleno", ramo: "dentista", ramoLabel: "Odontologia", style: "Clínico moderno", name: "Sorriso Pleno", city: "Juiz de Fora", cover: PHOTO.dentist, accent: "#0ea5a4", tags: ["dentista", "clinica", "saude", "claro"] },
  { id: "grao-dourado", ramo: "cafeteria", ramoLabel: "Cafeteria", style: "Aconchego artesanal", name: "Grão Dourado", city: "Juiz de Fora", cover: PHOTO.coffee, accent: "#b8642a", tags: ["cafe", "cafeteria", "artesanal"] },
];
export const getPremium = (id: string) => PREMIUM_MODELS.find((m) => m.id === id);
