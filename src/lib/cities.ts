// Apenas cidades pequenas de interior — sem capitais nem grandes centros.
export const CITIES = [
  "Holambra, SP", "São Miguel Arcanjo, SP", "Socorro, SP", "São Bento do Sapucaí, SP",
  "Camanducaia, MG", "São Tomé das Letras, MG", "São Lourenço, MG", "Tiradentes, MG",
  "Itatiaia, RJ", "Resende, RJ", "Paraty, RJ",
  "Morretes, PR", "Antonina, PR", "Lapa, PR",
  "Nova Petrópolis, RS", "Gramado, RS", "Bento Gonçalves, RS",
  "Pomerode, SC", "São Joaquim, SC", "Urubici, SC",
  "Bonito, MS", "Pirenópolis, GO", "Cavalcante, GO",
  "Chapada dos Guimarães, MT", "Poconé, MT",
  "Palmeiras, BA", "Lençóis, BA", "Cairu, BA",
  "Canindé de São Francisco, SE", "São Cristóvão, SE",
  "Maragogi, AL", "Piranhas, AL",
  "Olinda, PE", "Gravatá, PE", "Triunfo, PE",
  "Soure, PA", "Santarém, PA",
  "São Miguel dos Milagres, AL", "Jijoca de Jericoacoara, CE", "Aracati, CE",
  "Guaramiranga, CE", "Parnaíba, PI", "São Raimundo Nonato, PI",
  "Barreirinhas, MA", "Carolina, MA",
  "Touros, RN", "São Miguel do Gostoso, RN",
  "Areia, PB", "Bananeiras, PB",
  "Novo Airão, AM", "Presidente Figueiredo, AM",
  "Guajará-Mirim, RO", "Alto Paraíso de Goiás, GO",
  "Nobres, MT",
];
export function nextSuggestedCity(previous: string | null) {
  return CITIES[(CITIES.indexOf(previous ?? "") + 1) % CITIES.length] ?? "Holambra, SP";
}
