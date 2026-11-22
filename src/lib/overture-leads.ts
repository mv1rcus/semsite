import { cleanBusinessName, detectNiche } from "./business-niche";
import type { Lead } from "./leads";

/**
 * Fonte principal de leads: Overture Maps (dataset aberto, gratuito, CDL-Permissive-2.0).
 * https://overturemaps.org — atribuição: Overture Maps Foundation.
 *
 * Por que existe: o Overpass (OpenStreetMap ao vivo) depende de servidores públicos
 * congestionados (30-90s por busca) e o OSM tem poucos negócios mapeados no Brasil
 * (3 barbearias em Juiz de Fora). A Overture tem ~17 mil negócios com telefone na
 * mesma cidade; importados para o banco, a busca é local e instantânea.
 *
 * Como funciona:
 * - "Pacotes de cidade" (src/data/overture-*.json) gerados por scripts/overture-extract.py
 *   a partir do release mensal da Overture. Só entram lugares COM telefone, e rede
 *   social/link bio NÃO conta como site (o pitch é pra quem não tem site próprio).
 * - Na primeira busca de uma cidade coberta, o pacote é importado para a tabela
 *   `overture_places` (upsert em lotes); depois a busca é um SELECT com filtro de
 *   categoria (taxonomia da Overture + nome) e o mesmo filtro "sem site" de sempre.
 * - Cidade sem pacote: retorna null e quem chama cai no Overpass (caminho antigo).
 */

const norm = (t: string) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

export type OverturePlace = {
  n: string; cat: string | null; sub: string | null; p: string | null;
  w: string | null; ig: string | null; fb: string | null; a: string;
};

type CityPack = { cityKey: string; display: string; load: () => Promise<{ default: OverturePlace[] }> };

// Para adicionar uma cidade: rode scripts/overture-extract.py com o bbox do Nominatim
// e registre o pacote aqui. A chave é o nome da cidade normalizado (sem acento).
const PACKS: CityPack[] = [
  { cityKey: "juiz de fora", display: "Juiz de Fora, MG", load: () => import("../data/overture-juiz-de-fora.json") },
];

/** Categoria em pt-BR -> trechos a procurar na taxonomia da Overture (sub e cat).
 *  O primeiro regex que bate vence; o nome do negócio sempre entra como fallback. */
const OVERTURE_KEYWORDS: [match: RegExp, keywords: string[]][] = [
  [/^medic/, ["doctor", "medical", "health_care", "clinic"]],
  [/dentist|odonto/, ["dent"]],
  [/clinic/, ["clinic", "health_care"]],
  [/fisio/, ["physical_medicine", "rehabilitation"]],
  [/psicolog/, ["mental_health", "psych"]],
  [/nutri/, ["nutrition"]],
  [/farmac|drogari/, ["pharmacy", "drug"]],
  [/laborat/, ["lab", "diagnostics"]],
  [/otic/, ["vision", "eye", "opti"]],
  [/pizz/, ["pizza"]],
  [/lanchon|hamburg|espetinh/, ["fast_food", "burger", "casual_eatery"]],
  [/marmit|restaur/, ["restaurant", "eatery"]],
  [/padaria|panific/, ["bakery"]],
  [/cafeter|coffee/, ["cafe", "coffee"]],
  [/acai|sorvet/, ["ice_cream", "smoothie", "juice"]],
  [/confeit|doceri|bolo/, ["confection", "pastry", "cake", "dessert"]],
  [/barbear|barber/, ["barber"]],
  [/salao|cabele/, ["hair", "beauty"]],
  [/manicure|unha|esmalte/, ["nail", "beauty"]],
  [/sobrancelh|cilio|lash|depilac|estetic/, ["beauty", "wellness"]],
  [/tatuag|tattoo|piercing/, ["tattoo", "piercing"]],
  [/lava ?jato|lava ?car/, ["car_wash"]],
  [/borrach|pneu/, ["tire", "tyre"]],
  [/auto ?eletric/, ["auto_electric", "automotive"]],
  [/auto ?pec/, ["auto_parts", "vehicle_parts"]],
  [/moto ?pec/, ["motorcycle"]],
  [/oficina|mecanic|funilari|estetica automotiva/, ["automotive", "car_repair", "auto_repair"]],
  [/eletricist/, ["electric"]],
  [/encanad|hidraul/, ["plumb"]],
  [/marcenar/, ["carpent", "woodwork"]],
  [/vidrac|vidro/, ["glaz", "glass"]],
  [/serralh/, ["metal"]],
  [/material.*constr|madeireira/, ["hardware", "construction"]],
  [/pintor/, ["paint"]],
  [/gesso|gesseir|drywall/, ["drywall", "plaster"]],
  [/climatiz|ar condicionado|refrigera/, ["hvac", "air_condition"]],
  [/banho e tosa/, ["pet_grooming", "animal_or_pet"]],
  [/veterin/, ["veterin"]],
  [/pet ?shop|\bpet\b/, ["pet", "animal"]],
  [/adestra/, ["animal_train", "pet_train"]],
  [/academ|crossfit|pilates|personal|fitness/, ["gym", "fitness"]],
  [/contab/, ["account"]],
  [/advog|advocac|juridic/, ["attorney", "law", "legal"]],
  [/imobili|corretor/, ["real_estate"]],
  [/assistencia tecnica|conserto|celular|informatica/, ["repair", "technical_service", "electronics"]],
  [/costur|alfaiat/, ["tailor", "sew", "dressmak"]],
  [/grafic|copiadora|xerox|impress/, ["print", "copy"]],
  [/fotograf/, ["photo"]],
  [/floricult|flores/, ["flower", "florist"]],
  [/idioma|ingles/, ["language_school"]],
  [/auto ?escola|cfc/, ["driving_school"]],
];

type PlaceRow = {
  id: string; name: string; sub: string | null; cat: string | null;
  phone: string | null; site: string | null; instagram: string | null;
  facebook: string | null; address: string;
};

// Cliente Supabase solto de propósito: a tabela não consta nos tipos gerados e
// qualquer falha deve virar "sem Overture" (cai no Overpass), nunca quebrar a busca.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Db = { from: (table: string) => any };

export function keywordsForCategory(category: string): string[] {
  const n = norm(category);
  return OVERTURE_KEYWORDS.find(([re]) => re.test(n))?.[1] ?? [];
}

/** Escapa texto do usuário para ir num filtro ilike do PostgREST. */
function ilikeSafe(text: string): string {
  return text.replace(/[%_(),."]/g, " ").replace(/\s+/g, " ").trim();
}

function packRowId(cityKey: string, p: OverturePlace): string {
  return `ovt|${cityKey}|${norm(p.n)}|${(p.p ?? "").replace(/\D/g, "")}`;
}

function igHandle(url: string | null): string | null {
  const m = url?.match(/instagram\.com\/(?:p\/)?([A-Za-z0-9_.]+)/);
  return m?.[1] ?? null;
}

export function placeRowToLead(row: PlaceRow, category: string): Lead | null {
  if (row.site) return null; // já tem site próprio: não é lead
  const name = cleanBusinessName(row.name);
  const query = `${name} ${row.address}`.trim();
  return {
    id: `ovt:${row.id}`,
    name,
    address: row.address,
    phone: row.phone,
    intlPhone: row.phone,
    rating: null,
    reviews: null,
    category: detectNiche(row.name, row.sub ?? row.cat, category),
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
    email: null,
    instagram: igHandle(row.instagram),
    facebook: row.facebook,
    source: "overture",
  };
}

/** Garante que a cidade do pacote está na tabela; importa na primeira vez.
 *  Retorna false quando a tabela não existe/falha (caller cai no Overpass). */
async function ensureCityLoaded(db: Db, pack: CityPack): Promise<boolean> {
  try {
    const head = await db.from("overture_places").select("id", { count: "exact", head: true }).eq("city_key", pack.cityKey);
    if (head.error) return false;
    if ((head.count ?? 0) > 0) return true;
    const { default: places } = await pack.load();
    for (let i = 0; i < places.length; i += 1000) {
      const batch = places.slice(i, i + 1000).map((p) => ({
        id: packRowId(pack.cityKey, p),
        city_key: pack.cityKey,
        name: p.n, sub: p.sub, cat: p.cat, phone: p.p,
        site: p.w, instagram: p.ig, facebook: p.fb, address: p.a,
      }));
      const { error } = await db.from("overture_places").upsert(batch);
      if (error) return false;
    }
    return true;
  } catch {
    return false;
  }
}

export type OvertureSearchResult = { leads: Lead[]; scanned: number };

/** Busca local na base Overture. null = cidade sem pacote (usar Overpass). */
export async function searchOvertureLeads(
  category: string,
  city: string,
  db: Db,
): Promise<OvertureSearchResult | null> {
  const cityNorm = norm(city);
  const pack = PACKS.find((p) => cityNorm === p.cityKey || cityNorm.startsWith(`${p.cityKey},`) || cityNorm.startsWith(`${p.cityKey} `));
  if (!pack) return null;
  if (!(await ensureCityLoaded(db, pack))) return null;

  const keywords = keywordsForCategory(category);
  const nameTerm = ilikeSafe(category);
  const filters = [
    ...keywords.map((k) => `sub.ilike.%${k}%`),
    ...keywords.map((k) => `cat.ilike.%${k}%`),
    ...(nameTerm ? [`name.ilike.%${nameTerm}%`] : []),
  ];
  const { data, error } = await db
    .from("overture_places")
    .select("id, name, sub, cat, phone, site, instagram, facebook, address")
    .eq("city_key", pack.cityKey)
    .or(filters.join(","))
    .limit(1000);
  if (error || !Array.isArray(data)) return null;

  const seen = new Set<string>();
  const leads: Lead[] = [];
  for (const row of data as PlaceRow[]) {
    const lead = placeRowToLead(row, category);
    if (!lead) continue;
    if (seen.has(lead.id)) continue;
    seen.add(lead.id);
    leads.push(lead);
  }
  return { leads, scanned: (data as PlaceRow[]).length };
}
