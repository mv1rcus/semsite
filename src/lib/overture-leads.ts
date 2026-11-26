import { cleanBusinessName, detectNiche } from './business-niche';
import { rankProspects, type Lead } from './leads';

export const normalize = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
export type CityEntry = { name: string; uf: string; count: number; bytes: number; partitioned?: boolean | undefined };
export type PlaceRecord = {
  id: string; n: string; cat: string | null; sub: string | null;
  phones: string[]; websites: string[] | null; socials: string[] | null;
  emails: string[] | null; address: string; confidence: number;
};

// Nomes conhecidos de distritos e vilas (não são municípios) apontando para o município oficial.
const CITY_ALIASES: Record<string, string> = {
  'monte verde,mg': 'camanducaia,mg', 'penedo,rj': 'itatiaia,rj', 'visconde de maua,rj': 'resende,rj',
  'morro de sao paulo,ba': 'cairu,ba', 'alter do chao,pa': 'santarem,pa', 'jericoacoara,ce': 'jijoca de jericoacoara,ce',
  'canoa quebrada,ce': 'aracati,ce', 'capao,ba': 'palmeiras,ba', 'vale do capao,ba': 'palmeiras,ba',
  'anavilhanas,am': 'novo airao,am', 'chapada dos veadeiros,go': 'alto paraiso de goias,go', 'porto velho interior,ro': 'porto velho,ro',
};

function editDistance(a: string, b: string) {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0]!; row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = row[j]!;
      row[j] = Math.min(row[j]! + 1, row[j - 1]! + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return row[b.length]!;
}

export function resolveCity(input: string, cities: Record<string, CityEntry>) {
  let text = normalize(input).replace(/\s*[-/]\s*([a-z]{2})$/, ',$1').replace(/\s*,\s*/g, ',');
  if (/^\d{7}$/.test(text) && cities[text]) return { id: text, ...cities[text]! };
  text = CITY_ALIASES[text] ?? CITY_ALIASES[text.replace(/ ([a-z]{2})$/, ',$1')] ?? text;
  const candidates = Object.entries(cities).filter(([, c]) => {
    const name = normalize(c.name);
    return text === name || text === `${name},${c.uf.toLowerCase()}` || text === `${name} ${c.uf.toLowerCase()}`;
  });
  if (!candidates.length) {
    const m = text.match(/^(.*?)(?:,| )([a-z]{2})$/);
    const base = m ? m[1]! : text;
    const uf = m ? m[2]! : null;
    const near = Object.values(cities)
      .filter((c) => !uf || c.uf.toLowerCase() === uf)
      .map((c) => ({ c, d: editDistance(base, normalize(c.name)) }))
      .filter(({ c, d }) => d <= Math.max(2, Math.floor(normalize(c.name).length / 6)))
      .sort((x, y) => x.d - y.d).slice(0, 3);
    const hint = near.length ? ` Você quis dizer ${near.map(({ c }) => `${c.name}, ${c.uf}`).join(' ou ')}?` : '';
    throw new Error(`Não encontrei esse município.${hint} Use cidade e UF, por exemplo Juiz de Fora, MG.`);
  }
  if (candidates.length > 1) throw new Error('Há mais de um município com esse nome. Informe também a UF.');
  const [id, city] = candidates[0]!;
  return { id, ...city };
}

const SOCIAL_HOSTS = ['instagram.com', 'facebook.com', 'fb.com', 'wa.me', 'whatsapp.com', 'linktr.ee', 'tiktok.com', 'youtube.com', 'beacons.ai'];
export function hasRegisteredWebsite(websites: string[] | null) {
  return (websites ?? []).some((value) => {
    try {
      const host = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`).hostname.toLowerCase().replace(/^www\./, '');
      return !SOCIAL_HOSTS.some((s) => host === s || host.endsWith(`.${s}`));
    } catch { return Boolean(value.trim()); }
  });
}

export function recordToLead(p: PlaceRecord, category: string): Lead | null {
  if (hasRegisteredWebsite(p.websites)) return null;
  if (!p.phones?.[0]) return null;
  const links = [...(p.socials ?? []), ...(p.websites ?? [])];
  let instagram: string | null = null;
  let facebook: string | null = null;
  for (const link of links) {
    try {
      const url = new URL(/^https?:\/\//i.test(link) ? link : `https://${link}`);
      const host = url.hostname.toLowerCase().replace(/^www\./, '');
      if (host === 'instagram.com') {
        const first = url.pathname.split('/').filter(Boolean)[0];
        if (first && !['p', 'reel', 'reels', 'stories', 'explore'].includes(first)) instagram = first;
      }
      if (host === 'facebook.com' || host.endsWith('.facebook.com')) facebook = url.href;
    } catch { /* Incomplete external contact URL. */ }
  }
  return {
    id: `ovt:${p.id}`, name: cleanBusinessName(p.n), address: p.address,
    phone: p.phones[0]!, intlPhone: p.phones[0]!, rating: null, reviews: null,
    category: detectNiche(p.n, null, category), mapsUrl: null,
    email: p.emails?.[0] ?? null, instagram, facebook, source: 'overture',
  };
}

export function filterRecords(rows: PlaceRecord[], category: string) {
  const term = normalize(category);
  const keywords = categoryKeywords(category);
  const matching = rows.filter((r) => {
    return keywords.length ? keywords.some((k) => (r.sub ?? '').includes(k)) : normalize(r.n).includes(term);
  });
  const leads = matching.map((r) => recordToLead(r, category)).filter((l): l is Lead => l !== null);
  return { leads: rankProspects(leads), scanned: matching.length };
}

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

export function categoryKeywords(category: string): string[] {
  return OVERTURE_KEYWORDS.find(([re]) => re.test(normalize(category)))?.[1] ?? [];
}
