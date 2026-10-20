export const CITIES = [
  "Campinas, SP", "São Paulo, SP", "Rio de Janeiro, RJ", "Belo Horizonte, MG", "Curitiba, PR", "Fortaleza, CE",
  "Porto Alegre, RS", "Salvador, BA", "Recife, PE", "Goiânia, GO", "Brasília, DF", "Manaus, AM",
  "Belém, PA", "Florianópolis, SC", "Natal, RN", "Maceió, AL", "Santos, SP", "Sorocaba, SP",
  "Ribeirão Preto, SP", "Vitória, ES", "Campo Grande, MS", "Cuiabá, MT", "São Luís, MA", "João Pessoa, PB",
  "Aracaju, SE", "Teresina, PI", "Londrina, PR", "Joinville, SC", "Uberlândia, MG", "Maringá, PR",
];
export function nextSuggestedCity(previous: string | null) {
  return CITIES[(CITIES.indexOf(previous ?? "") + 1) % CITIES.length] ?? "Campinas, SP";
}