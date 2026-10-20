export const CITIES = ["Campinas, SP", "São Paulo, SP", "Belo Horizonte, MG", "Curitiba, PR", "Rio de Janeiro, RJ", "Fortaleza, CE"];
export function nextSuggestedCity(previous: string | null) {
  return CITIES[(CITIES.indexOf(previous ?? "") + 1) % CITIES.length] ?? "Campinas, SP";
}