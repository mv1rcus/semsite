// Rotating daily posts for the official @semsite account (no AI cost).
export const SEMSITE_ACCOUNT_ID = "5e5e5e5e-0000-4000-8000-00000000c0de";

export const SEMSITE_TIPS: string[] = [
  "Bom dia, time! 💡 Dica do dia: mande a primeira mensagem entre 9h e 11h. O dono do negócio costuma estar mais disponível. Qual horário funciona melhor pra você? #dicas #prospeccao",
  "Antes de mandar mensagem, abra a demonstração e veja se o nome e o WhatsApp do cliente estão certos. Detalhe pequeno, impressão enorme. #demonstracao",
  "Cliente não respondeu? Espere 2 ou 3 dias e mande algo curto: \"Oi! Conseguiu ver o site que fiz pra vocês?\" Simples funciona. #followup",
  "Negócios com muitas avaliações no Google e sem site são ouro. Eles já têm clientes, só falta presença online. #prospeccao",
  "Pergunta pra comunidade: qual segmento mais fecha site com vocês? Pizzaria, salão, oficina? Conta aqui nos comentários 👇 #comunidade",
  "Não fale de preço na primeira mensagem. Mostre o valor primeiro: a demonstração pronta fala por você. #vendas",
  "Cidades pequenas do interior têm pouca concorrência de quem faz site. Experimente buscar em uma cidade nova hoje! #interior #prospeccao",
  "Personalize a mensagem de boas-vindas com o seu nome na aba Mensagem. Gente confia em gente, não em robô. #whatsapp",
  "Meta da semana: contatar 20 negócios novos. Bora? Comenta \"eu topo\" se você vai junto 💪 #desafio",
  "Use o painel de Clientes pra marcar quem já respondeu e agendar o próximo contato. Organização vende mais. #organizacao",
  "Fechou um cliente? Posta aqui e marca a gente! Adoramos ver o resultado de vocês 🎉 #fechamento",
  "Dica rápida: áudio curto no WhatsApp depois da mensagem escrita aumenta a chance de resposta. Teste! #whatsapp",
  "Mostre que o site fica pronto em uma semana. Prazo claro passa segurança pro cliente. #vendas",
  "Sexta é dia de revisar: quantos contatos você fez na semana? Dá uma olhada nos Gráficos e celebra o progresso 📈 #metas",
];

export function tipForDate(d: Date): string {
  const day = Math.floor(d.getTime() / 86_400_000);
  return SEMSITE_TIPS[day % SEMSITE_TIPS.length] ?? SEMSITE_TIPS[0]!;
}
