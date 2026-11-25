import { SECTOR_CATALOG, SECTOR_HEADLINE, SECTOR_REVIEWS, type Sector } from "@/lib/demo-catalog";

/** Modelos de site: layouts e textos originais do SemSite, combinados por ramo, estilo e paleta. */
export type LayoutKey = "split" | "centered" | "bold" | "magazine" | "minimal" | "cubo3d" | "vitrine3d" | "orbita3d";

export const LAYOUT_LABEL: Record<LayoutKey, string> = {
  split: "Clássico", centered: "Centralizado", bold: "Impacto", magazine: "Revista", minimal: "Minimalista",
  cubo3d: "3D Cubo", vitrine3d: "3D Vitrine", orbita3d: "3D Órbita",
};
export const LAYOUT_KEYS = Object.keys(LAYOUT_LABEL) as LayoutKey[];
export const is3dLayout = (l: LayoutKey) => l.endsWith("3d");

export type Palette = { key: string; label: string; primary: string; bg: string; fg: string; soft: string; dark: boolean };
export const PALETTES: Palette[] = [
  { key: "fogo", label: "Fogo", primary: "#e11d48", bg: "#fff7f5", fg: "#1c0f12", soft: "#ffe4e0", dark: false },
  { key: "noite", label: "Noite", primary: "#f43f5e", bg: "#0c0a0b", fg: "#f5f0f0", soft: "#1f1416", dark: true },
  { key: "oceano", label: "Oceano", primary: "#0ea5e9", bg: "#f2faff", fg: "#0b1a24", soft: "#d9f0fc", dark: false },
  { key: "floresta", label: "Floresta", primary: "#16a34a", bg: "#f4fbf5", fg: "#0d1a10", soft: "#d8f2de", dark: false },
  { key: "ouro", label: "Ouro", primary: "#d4a017", bg: "#0e0c07", fg: "#f7f1de", soft: "#221d0d", dark: true },
  { key: "lavanda", label: "Lavanda", primary: "#7c3aed", bg: "#faf7ff", fg: "#17102a", soft: "#e9defc", dark: false },
  { key: "coral", label: "Coral", primary: "#f97316", bg: "#fff9f3", fg: "#26130a", soft: "#ffe6d1", dark: false },
  { key: "grafite", label: "Grafite", primary: "#e5e7eb", bg: "#111315", fg: "#f3f4f6", soft: "#1d2023", dark: true },
  { key: "menta", label: "Menta", primary: "#14b8a6", bg: "#f2fcfa", fg: "#0a1f1c", soft: "#d1f5ef", dark: false },
  { key: "uva", label: "Uva", primary: "#c026d3", bg: "#12081a", fg: "#f6e9fb", soft: "#241230", dark: true },
  { key: "areia", label: "Areia", primary: "#b45309", bg: "#fbf6ee", fg: "#2a1c0c", soft: "#f1e3cd", dark: false },
  { key: "azulmarinho", label: "Azul-marinho", primary: "#3b82f6", bg: "#0a1220", fg: "#e8effc", soft: "#13203a", dark: true },
  { key: "rosa", label: "Rosa", primary: "#ec4899", bg: "#fff5fa", fg: "#2a0e1d", soft: "#fde0ee", dark: false },
  { key: "limao", label: "Limão", primary: "#84cc16", bg: "#0d1005", fg: "#f1f7e0", soft: "#1c2209", dark: true },
];

export type Ramo = { key: string; label: string; sector: Sector; emoji: string; names: string[] };
export const RAMOS: Ramo[] = [
  { key: "pizzaria", label: "Pizzaria", sector: "food", emoji: "🍕", names: ["Forno Vivo", "Massa & Brasa"] },
  { key: "hamburgueria", label: "Hamburgueria", sector: "food", emoji: "🍔", names: ["Burger Lab", "Chapa Quente"] },
  { key: "restaurante", label: "Restaurante", sector: "food", emoji: "🍽️", names: ["Sabor da Casa", "Mesa Posta"] },
  { key: "padaria", label: "Padaria", sector: "food", emoji: "🥖", names: ["Pão Nosso", "Fornada Fresca"] },
  { key: "cafeteria", label: "Cafeteria", sector: "food", emoji: "☕", names: ["Grão Dourado", "Café Pausa"] },
  { key: "acaiteria", label: "Açaiteria", sector: "food", emoji: "🍇", names: ["Açaí Tropical", "Roxo Gelado"] },
  { key: "confeitaria", label: "Confeitaria", sector: "food", emoji: "🍰", names: ["Doce Ateliê", "Bolo & Afeto"] },
  { key: "barbearia", label: "Barbearia", sector: "beauty", emoji: "💈", names: ["Navalha Real", "Barba de Respeito"] },
  { key: "salao", label: "Salão de beleza", sector: "beauty", emoji: "💇", names: ["Studio Fio", "Espelho Meu"] },
  { key: "estetica", label: "Estética", sector: "beauty", emoji: "✨", names: ["Pele Viva", "Essência Estética"] },
  { key: "manicure", label: "Nail designer", sector: "beauty", emoji: "💅", names: ["Esmalte & Arte", "Unha Nobre"] },
  { key: "clinica", label: "Clínica médica", sector: "health", emoji: "🩺", names: ["Clínica Vida", "Cuidar Mais"] },
  { key: "dentista", label: "Odontologia", sector: "health", emoji: "🦷", names: ["Sorriso Pleno", "Odonto Prime"] },
  { key: "psicologia", label: "Psicologia", sector: "health", emoji: "🧠", names: ["Mente Leve", "Espaço Acolher"] },
  { key: "fisio", label: "Fisioterapia", sector: "health", emoji: "🦴", names: ["Movimento Certo", "Fisio Corpo"] },
  { key: "academia", label: "Academia", sector: "gym", emoji: "🏋️", names: ["Força Total", "Iron Box"] },
  { key: "pilates", label: "Pilates e yoga", sector: "gym", emoji: "🧘", names: ["Equilíbrio", "Corpo em Foco"] },
  { key: "advocacia", label: "Advocacia", sector: "law", emoji: "⚖️", names: ["Silva & Lima", "Justa Causa"] },
  { key: "petshop", label: "Pet shop", sector: "pet", emoji: "🐾", names: ["Amigo Fiel", "Patinhas"] },
  { key: "veterinaria", label: "Veterinária", sector: "pet", emoji: "🐶", names: ["VetCare", "Bicho Bem"] },
  { key: "oficina", label: "Oficina mecânica", sector: "auto", emoji: "🔧", names: ["Auto Center Prime", "Motor Certo"] },
  { key: "lavajato", label: "Lava jato", sector: "auto", emoji: "🚗", names: ["Brilho Total", "Lava Express"] },
  { key: "eletricista", label: "Eletricista", sector: "services", emoji: "💡", names: ["Fio Terra", "Volt Serviços"] },
  { key: "contabilidade", label: "Contabilidade", sector: "services", emoji: "📊", names: ["Conta Certa", "Número Um"] },
];

export type SiteModel = {
  id: string; ramo: string; ramoLabel: string; sector: Sector; emoji: string;
  layout: LayoutKey; layoutLabel: string; palette: string; paletteLabel: string; name: string; is3d: boolean;
};

function build(): SiteModel[] {
  const out: SiteModel[] = [];
  let n = 0;
  for (const p of PALETTES) for (const l of LAYOUT_KEYS) for (const r of RAMOS) {
    out.push({
      id: `${r.key}-${l}-${p.key}`, ramo: r.key, ramoLabel: r.label, sector: r.sector, emoji: r.emoji,
      layout: l, layoutLabel: LAYOUT_LABEL[l], palette: p.key, paletteLabel: p.label,
      name: r.names[n++ % r.names.length] ?? r.label, is3d: is3dLayout(l),
    });
  }
  // Embaralha com semente fixa para a galeria misturar ramos, estilos e 3D desde a primeira página.
  let seed = 20261125;
  const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [out[i], out[j]] = [out[j]!, out[i]!]; }
  return out;
}

export const ALL_MODELS: SiteModel[] = build();
const BY_ID = new Map(ALL_MODELS.map((m) => [m.id, m]));
export const getModel = (id: string) => BY_ID.get(id);
export const getPalette = (key: string) => PALETTES.find((p) => p.key === key) ?? PALETTES[0]!;

export type ModelFilter = { q?: string; ramo?: string; layout?: LayoutKey | "3d" | ""; palette?: string };
export function filterModels(f: ModelFilter, list: SiteModel[] = ALL_MODELS): SiteModel[] {
  const q = (f.q ?? "").trim().toLocaleLowerCase("pt-BR");
  return list.filter((m) => {
    if (f.ramo && m.ramo !== f.ramo) return false;
    if (f.layout === "3d" ? !m.is3d : f.layout ? m.layout !== f.layout : false) return false;
    if (f.palette && m.palette !== f.palette) return false;
    if (q && !`${m.name} ${m.ramoLabel} ${m.layoutLabel} ${m.paletteLabel}`.toLocaleLowerCase("pt-BR").includes(q)) return false;
    return true;
  });
}

export type ModelClient = { name?: string; whatsapp?: string; city?: string };
export function modelContent(m: SiteModel, c: ModelClient = {}) {
  const name = (c.name ?? "").trim() || m.name;
  const digits = (c.whatsapp ?? "").replace(/\D/g, "");
  const wa = digits ? `https://wa.me/${digits.startsWith("55") ? digits : `55${digits}`}` : "#contato";
  return {
    name, city: (c.city ?? "").trim(), wa, hasWa: !!digits,
    headline: SECTOR_HEADLINE[m.sector], catalog: SECTOR_CATALOG[m.sector], reviews: SECTOR_REVIEWS[m.sector],
  };
}

export function modelLink(origin: string, id: string, c: ModelClient = {}): string {
  const p = new URLSearchParams();
  if (c.name?.trim()) p.set("n", c.name.trim());
  if (c.whatsapp?.replace(/\D/g, "")) p.set("w", c.whatsapp.replace(/\D/g, ""));
  if (c.city?.trim()) p.set("c", c.city.trim());
  const qs = p.toString();
  return `${origin}/vitrine/${id}${qs ? `?${qs}` : ""}`;
}
