/** Detector de ramo: corrige categorias genéricas do Google lendo o nome da empresa e o termo pesquisado. */
const norm = (t: string) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const NICHE_WORDS: [RegExp, string][] = [
  [/lava ?jato|lava ?car|lavagem|lavarapido/, "Lava jato"], [/estetica auto|detail|polimento|insulfilm/, "Estética automotiva"],
  [/borrach|pneu/, "Borracharia"], [/auto ?eletric/, "Auto elétrica"], [/funilar/, "Funilaria e pintura"],
  [/moto ?pec|motopec/, "Moto peças"], [/autopec|auto pec/, "Autopeças"], [/oficina|mecanic/, "Oficina mecânica"],
  [/barbear|barber|barba/, "Barbearia"], [/tattoo|tatu|piercing/, "Estúdio de tatuagem"],
  [/manicure|nail|esmalter|unha/, "Manicure"], [/sobrancel|cilio|lash/, "Design de sobrancelhas e cílios"],
  [/depila/, "Depilação"], [/salao|cabele|hair|beauty|beleza/, "Salão de beleza"], [/estetica|spa\b/, "Clínica de estética"],
  [/odonto|dentist|dental|sorriso/, "Dentista"], [/fisio/, "Fisioterapia"], [/psicolog/, "Psicólogo"], [/nutri/, "Nutricionista"],
  [/farmac|drogaria/, "Farmácia"], [/laborat/, "Laboratório"], [/otica/, "Ótica"],
  [/pizz/, "Pizzaria"], [/hamburg|burger|lanchon|lanche/, "Hamburgueria"], [/acai|sorvet/, "Açaiteria e sorveteria"],
  [/confeit|doceria|bolo|cake/, "Confeitaria"], [/padaria|panific/, "Padaria"], [/cafeter|coffee/, "Cafeteria"],
  [/marmit/, "Marmitaria"], [/espetinh/, "Espetinho"], [/buffet/, "Buffet"], [/restaur/, "Restaurante"],
  [/pet ?shop|banho e tosa|veterin|\bpet\b/, "Pet shop"], [/adestra/, "Adestramento"],
  [/academ|crossfit|fitness|gym/, "Academia"], [/pilates/, "Pilates"],
  [/advoca|advogad|juridic|\badv\b/, "Advocacia"], [/contab|contador/, "Contabilidade"], [/imobili|corretor/, "Imobiliária"],
  [/copiador|xerox|copy/, "Copiadora e gráfica"], [/grafica|impress|plotag/, "Gráfica"],
  [/vidrac|vidro|temperad/, "Vidraçaria"], [/serralh/, "Serralheria"], [/marcenar|moveis planej/, "Marcenaria"],
  [/eletricist/, "Eletricista"], [/encanad|hidraul|desentup/, "Encanador"], [/climatiz|ar condicionado|refrigera/, "Climatização"],
  [/gesso|drywall/, "Gesseiro"], [/pintor|pintura residencial/, "Pintor"], [/material.*constr|madeireira|home center/, "Material de construção"],
  [/assistencia tecnica|celular|informatica|conserto/, "Assistência técnica"], [/costur|alfaiat|ateli/, "Costura"],
  [/fotograf|foto ?studio/, "Fotógrafo"], [/auto ?escola|cfc\b/, "Auto escola"], [/idioma|ingles|english/, "Escola de idiomas"],
  [/escola|curso|reforco/, "Escola e cursos"], [/floricult|flores/, "Floricultura"],
];
const GENERIC = /^(servi[cç]os?( locais)?|consultoria|empresa|loja|com[eé]rcio|neg[oó]cio|ponto de interesse|estabelecimento)?$/i;
const find = (t: string) => { const n = norm(t); return NICHE_WORDS.find(([re]) => re.test(n))?.[1]; };
export function detectNiche(name: string, category: string | null | undefined, query?: string): string {
  const cat = (category ?? "").trim();
  return find(name) ?? (!GENERIC.test(cat) && find(cat) ? cat : undefined) ?? (query ? find(query) : undefined) ?? (cat || "Serviços locais");
}
const SMALL = /^(de|da|do|das|dos|e|em|a|o)$/;
/** Limpa nomes do Google: tira slogans após | – - : e normaliza MAIÚSCULAS. */
export function cleanBusinessName(name: string): string {
  let n = name.split(/\s[|–—\-:]\s|\s?\|\s?/)[0].replace(/[!]+$/, "").trim() || name.trim();
  if (n.length > 48) n = n.slice(0, 48).replace(/\s\S*$/, "");
  const letters = n.replace(/[^A-Za-zÀ-ú]/g, "");
  if (letters && letters === letters.toUpperCase()) n = n.toLocaleLowerCase("pt-BR").split(" ").map((w, i) => i && SMALL.test(w) ? w : w.charAt(0).toLocaleUpperCase("pt-BR") + w.slice(1)).join(" ");
  return n;
}
