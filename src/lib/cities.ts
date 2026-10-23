// Apenas cidades pequenas de interior — sem capitais nem grandes centros.
export const CITIES = [
  "Holambra, SP", "São Miguel Arcanjo, SP", "Socorro, SP", "São Bento do Sapucaí, SP",
  "Monte Verde, MG", "São Thomé das Letras, MG", "São Lourenço, MG", "Tiradentes, MG",
  "Penedo, RJ", "Visconde de Mauá, RJ", "Paraty, RJ",
  "Morretes, PR", "Antonina, PR", "Lapa, PR",
  "Nova Petrópolis, RS", "Gramado, RS", "Bento Gonçalves, RS",
  "Pomerode, SC", "São Joaquim, SC", "Urubici, SC",
  "Bonito, MS", "Pirenópolis, GO", "Cavalcante, GO",
  "Chapada dos Guimarães, MT", "Santo Antônio do Leverger, MT",
  "Capão, BA", "Lençóis, BA", "Morro de São Paulo, BA",
  "Canindé de São Francisco, SE", "São Cristóvão, SE",
  "Maragogi, AL", "Piranhas, AL",
  "Olinda, PE", "Gravatá, PE", "Triunfo, PE",
  "Soure, PA", "Alter do Chão, PA",
  "São Miguel dos Milagres, AL", "Jericoacoara, CE", "Canoa Quebrada, CE",
  "Guaramiranga, CE", "Parnaíba, PI", "São Raimundo Nonato, PI",
  "Barreirinhas, MA", "Carolina, MA",
  "Touros, RN", "São Miguel do Gostoso, RN",
  "Areia, PB", "Bananeiras, PB",
  "Anavilhanas, AM", "Presidente Figueiredo, AM",
  "Porto Velho interior, RO", "Alto Paraíso de Goiás, GO",
  "Nobres, MT", "Chapada dos Veadeiros, GO",
];
export function nextSuggestedCity(previous: string | null) {
  return CITIES[(CITIES.indexOf(previous ?? "") + 1) % CITIES.length] ?? "Holambra, SP";
}
