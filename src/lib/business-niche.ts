/** Detector de ramo: corrige categorias genéricas do Google lendo o nome da empresa e o termo pesquisado. */
const norm = (t: string) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
// Termos fortes: dizem o ramo sozinhos ("pizzaria", "barbearia").
const NICHE_WORDS: [RegExp, string][] = [
  [/lava ?jato|lava ?car|lavagem|lavarapido/, "Lava jato"], [/estetica auto|insulfilm/, "Estética automotiva"],
  [/borrach|pneu/, "Borracharia"], [/auto ?eletric/, "Auto elétrica"], [/funilar/, "Funilaria e pintura"],
  [/moto ?pec|motopec/, "Moto peças"], [/autopec|auto pec/, "Autopeças"], [/mecanic/, "Oficina mecânica"],
  [/barbear|barber|barba\b/, "Barbearia"], [/tattoo|tatuag|tatu\b|piercing/, "Estúdio de tatuagem"],
  [/manicure|nail|esmalter|unha/, "Manicure"], [/sobrancel|cilio|lash/, "Design de sobrancelhas e cílios"],
  [/depila/, "Depilação"], [/salao|cabele/, "Salão de beleza"],
  [/odonto|dentist|dental/, "Dentista"], [/fisio/, "Fisioterapia"], [/psicolog/, "Psicólogo"], [/nutricion/, "Nutricionista"],
  [/farmac|drogaria/, "Farmácia"], [/laborat/, "Laboratório"], [/otica/, "Ótica"],
  [/pizz/, "Pizzaria"], [/hamburg|burger|lanchon|lanche/, "Hamburgueria"], [/acai|sorvet/, "Açaiteria e sorveteria"],
  [/confeit|doceria/, "Confeitaria"], [/padaria|panific/, "Padaria"], [/cafeter|coffee/, "Cafeteria"],
  [/marmit/, "Marmitaria"], [/espetinh/, "Espetinho"], [/buffet/, "Buffet"], [/restaur/, "Restaurante"],
  [/pet ?shop|banho e tosa|veterin/, "Pet shop"], [/adestra/, "Adestramento"],
  [/academ|crossfit|fitness|gym/, "Academia"], [/pilates/, "Pilates"],
  [/advoca|advogad|juridic|\badv\b/, "Advocacia"], [/contab|contador/, "Contabilidade"], [/imobili/, "Imobiliária"], [/seguros?\b/, "Corretora de seguros"],
  [/copiador/, "Copiadora e gráfica"], [/grafica|plotag/, "Gráfica"],
  [/vidrac|temperad/, "Vidraçaria"], [/serralh/, "Serralheria"], [/marcenar|moveis planej/, "Marcenaria"],
  [/eletricist/, "Eletricista"], [/encanad|hidraul|desentup/, "Encanador"], [/climatiz|ar condicionado|refrigera/, "Climatização"],
  [/gesso|drywall/, "Gesseiro"], [/pintor|pintura residencial/, "Pintor"], [/material.*constr|madeireira|home center/, "Material de construção"],
  [/assistencia tecnica/, "Assistência técnica"], [/costur|alfaiat/, "Costura"],
  [/fotograf/, "Fotógrafo"], [/auto ?escola|cfc\b/, "Auto escola"], [/escola de samba|bloco carnavalesco/, "Escola de samba"],
  [/floricult/, "Floricultura"],
];
// Termos fracos: palavra comum que também aparece em nome de outro ramo ("Oficina do Lanche", "Beleza Pet").
// Só decidem quando nenhum termo forte aparece no nome.
const NICHE_WEAK: [RegExp, string][] = [
  [/oficina(?! (de |da |do )?(arte|criativ|teatro|danca|musica|moda|brinquedo|ceramica|artesanato|cultural|pao|bolo))/, "Oficina mecânica"],
  [/detail|polimento/, "Estética automotiva"], [/estetica|spa\b/, "Clínica de estética"], [/hair|beauty|beleza/, "Salão de beleza"],
  [/sorriso/, "Dentista"], [/nutri\b|nutri[^c]/, "Nutricionista"],
  [/bolos?\b|\w*cake|doces?\b/, "Confeitaria"], [/\bpet\b/, "Pet shop"],
  [/xerox|copy|impress/, "Gráfica"], [/vidro/, "Vidraçaria"], [/corretor/, "Imobiliária"],
  [/celular|informatica|conserto/, "Assistência técnica"], [/ateli/, "Costura"], [/foto ?studio|foto\b/, "Fotógrafo"],
  [/idioma|ingles|english/, "Escola de idiomas"], [/escola\b|cursos?\b|reforco/, "Escola e cursos"], [/flores\b(?! da cunha)/, "Floricultura"],
];
const GENERIC = /^(servi[cç]os?( locais)?|consultoria|empresa|loja|com[eé]rcio|neg[oó]cio|ponto de interesse|estabelecimento)?$/i;
// Cada termo só casa no começo de uma palavra ("unha" não casa em "Cunha"). Termo forte vence fraco; entre termos do
// mesmo grupo vale o último do nome ("Oficina do Lanche" é lanche); empate de posição segue a ordem da lista.
const start = (list: [RegExp, string][]) => list.map(([re, label]) => [new RegExp(`\\b(?:${re.source})`), label] as [RegExp, string]);
const STRONG = start(NICHE_WORDS);
const WEAK = start(NICHE_WEAK);
const last = (n: string, list: [RegExp, string][]) => {
  let best: { at: number; label: string } | undefined;
  for (const [re, label] of list) {
    const m = re.exec(n);
    if (m && (!best || m.index > best.at)) best = { at: m.index, label };
  }
  return best?.label;
};
const find = (t: string) => { const n = norm(t); return last(n, STRONG) ?? last(n, WEAK); };
export function detectNiche(name: string, category: string | null | undefined, query?: string): string {
  const cat = (category ?? "").trim();
  const structured = !GENERIC.test(cat) && find(cat) ? cat : undefined;
  // Categoria estruturada (Overture/Google) vence o nome; o nome decide quando a categoria falta ou é genérica.
  return structured ?? find(name) ?? (query ? find(query) : undefined) ?? (cat || "Serviços locais");
}
const SMALL = /^(de|da|do|das|dos|e|em|a|o)$/;
/** Limpa nomes do Google: tira slogans após | – - : e normaliza MAIÚSCULAS. */
export function cleanBusinessName(name: string): string {
  let n = (name.split(/\s[|–—\-:]\s|\s?\|\s?/)[0]?.replace(/[!]+$/, "").trim() ?? "") || name.trim();
  if (n.length > 48) n = n.slice(0, 48).replace(/\s\S*$/, "");
  const letters = n.replace(/[^A-Za-zÀ-ú]/g, "");
  if (letters && letters === letters.toUpperCase()) n = n.toLocaleLowerCase("pt-BR").split(" ").map((w, i) => i && SMALL.test(w) ? w : w.charAt(0).toLocaleUpperCase("pt-BR") + w.slice(1)).join(" ");
  return n;
}
/** Ramo reconhecido pelo nome ou pela categoria (ignora categorias genéricas). */
export function knownNiche(name: string, category?: string | null): string | undefined {
  const cat = (category ?? "").trim();
  return find(name) ?? (GENERIC.test(cat) ? undefined : find(cat));
}
/** Busca X traz só X: descarta resultados de um ramo reconhecido diferente do pesquisado. */
export function matchesSearch(name: string, category: string | null | undefined, query: string): boolean {
  const wanted = find(query);
  if (!wanted) return true;
  const got = knownNiche(name, category);
  return !got || got === wanted;
}
