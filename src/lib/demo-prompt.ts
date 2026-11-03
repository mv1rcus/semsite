import { SECTOR_CATALOG } from "./demo-catalog";
import { demoSector, type Demonstration } from "./demonstrations";

/**
 * Briefing pronto para copiar: descreve o site de demonstração com os dados que
 * o próprio negócio forneceu, para a pessoa colar em uma IA que cria sites.
 * Nada de preços, avaliações ou horários inventados.
 */
export function sitePrompt(demo: Demonstration): string {
  const sector = demoSector(demo.category);
  const catalog = SECTOR_CATALOG[sector];
  const items = catalog.items.map((item) => `- ${item.title}: ${item.text}`).join("\n");
  const lines: string[] = [
    "Crie um site completo em português do Brasil para o negócio abaixo.",
    "",
    `Nome: ${demo.name}`,
    `Segmento: ${demo.category}`,
    `Chamada principal: ${demo.headline}`,
    `Sobre o negócio: ${demo.description}`,
  ];
  if (demo.address) lines.push(`Endereço: ${demo.address}`);
  if (demo.phone) lines.push(`Telefone / WhatsApp: ${demo.phone}`);
  lines.push(
    "",
    "O site deve ter três abas funcionais:",
    `1. Início: capa com foto grande relacionada a ${demo.category.toLocaleLowerCase("pt-BR")}, a chamada em destaque, o nome do negócio, um texto de apresentação e dois botões (ver ${catalog.title.toLocaleLowerCase("pt-BR")} e falar no WhatsApp). Abaixo disso, uma prévia do catálogo, uma seção "Sobre o negócio" e perguntas frequentes.`,
    `2. ${catalog.title}: grade de cards, cada um com foto, título, texto curto, botão "Mais detalhes" e botão de interesse que leva até o contato.`,
    "3. Contato: endereço com botão para abrir no Google Maps, telefone, botão de WhatsApp e um formulário que prepara a mensagem no WhatsApp.",
    "",
    `${catalog.title} do site:`,
    items,
    "",
    "Regras:",
    "- Visual limpo e moderno, responsivo no celular, com fotos reais do segmento.",
    "- Não invente preços, avaliações, notas, horários de funcionamento, certificações ou promoções.",
    "- Todo texto e toda foto devem poder ser trocados facilmente depois.",
  );
  return lines.join("\n");
}
