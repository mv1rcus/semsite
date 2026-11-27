import type { Lead } from "./leads";
import { detectNiche } from "./business-niche";

export type Script = { pain: string; objections: { q: string; a: string }[]; message: string };

// Sales script built from the lead's sector; uses only real Google data (name, city, rating), never invented numbers.
const sectors: { match: RegExp; pain: string }[] = [
  { match: /restaurante|pizza|lanch|hamburg|comida|padaria|a[çc]a[ií]|doce|confeit|espetinh|buffet|bar\b|caf[eé]|marmit|food/i, pain: "Quem tem fome pesquisa no Google \"onde comer agora\" e pede de quem mostra cardápio na hora. Sem site, o pedido vai pro concorrente ou para o aplicativo de entrega, que fica com uma parte de cada venda." },
  { match: /sal[aã]o|beleza|barb|est[eé]tic|unha|manicure|cabel|spa\b|beauty|hair/i, pain: "Perde tempo o dia inteiro respondendo \"qual o preço?\" no direct. Com um site, os serviços, preços e o botão de agendar ficam num link só." },
  { match: /oficina|mec[aâ]nic|auto|chaveiro|guincho|borrach|el[eé]tric|encanad|lava ?jato|funilar|moto ?pe[cç]|car\b/i, pain: "Quem está com problema tem pressa: pesquisa no Google e liga no primeiro que aparece com botão de chamar. Sem site, esse serviço vai pro vizinho." },
  { match: /dent|odonto|m[eé]dic|cl[ií]nic|psic|nutri|fisio|sa[uú]de|doctor|hospital|farmac|laborat|[oó]tica/i, pain: "Paciente particular pesquisa no Google antes de marcar para ver se o profissional é de confiança. Sem uma página oficial, ele desconfia e marca com quem tem site." },
  { match: /advog|advoca|jur[ií]d|imobili|contab|corretor|lawyer|consult/i, pain: "Ninguém fecha um contrato de valor alto só olhando fotos de rede social. Um site passa seriedade e segurança antes da primeira conversa." },
  { match: /academia|gym|fitness|crossfit|pilates|personal/i, pain: "Quem quer começar a treinar compara academias no Google pelos planos e fotos. Sem site, a pessoa nem chega a perguntar o preço." },
  { match: /pet|veterin|banho e tosa/i, pain: "Dono de pet procura no Google quem é de confiança e perto. Sem site com serviços e contato fácil, ele escolhe outro lugar." },
];

export function buildScript(lead: Lead, city: string): Script {
  // Ramo já resolvido (nome + categoria) primeiro; só então o texto bruto, sempre casando no começo da palavra.
  const niche = detectNiche(lead.name, lead.category);
  const text = `${lead.category ?? ""} ${lead.name}`;
  const at = (re: RegExp, t: string) => new RegExp(`\\b(?:${re.source})`, "i").test(t);
  const pain = (sectors.find((s) => at(s.match, niche)) ?? sectors.find((s) => at(s.match, text)))?.pain
    ?? "Quem procura esse serviço na cidade pesquisa no Google e escolhe quem aparece com página própria. Sem site, esses clientes vão para a concorrência.";
  const good = lead.rating !== null && lead.rating >= 4 && (lead.reviews ?? 0) > 0;
  const where = city ? ` aqui em ${city}` : "";
  return {
    pain,
    objections: [
      { q: "\"Já uso o Instagram\"", a: "Ótimo, o Instagram ajuda! Mas ele só mostra seus posts para quem já te segue. O site aparece no Google para quem ainda não te conhece e está procurando agora. Um completa o outro." },
      { q: "\"Tá caro / não tenho dinheiro agora\"", a: "Entendo! Pensa assim: basta um ou dois clientes novos vindos do Google para o site se pagar. E depois ele continua trazendo clientes todo mês." },
      { q: "\"Vou pensar\"", a: "Claro! Só te aviso que consigo entregar em uma semana e estou fechando poucos projetos este mês. Se quiser, já te mostro como ficaria o seu, sem compromisso." },
    ],
    message: `Olá, ${lead.name}! Conheci vocês${where}${good ? ` com nota ${lead.rating} — parabéns pelo trabalho!` : "."} Notei que ainda não têm site. ${pain} Faço sites profissionais e entrego em uma semana. Posso te mostrar como ficaria o de vocês?`,
  };
}
