import type { PremiumKey, PremiumModel } from "./premium-models";

const SECTIONS: Record<PremiumKey, string> = {
  escola: "fundo verde profundo, título gigante em caixa alta, adesivos coloridos, cards de cursos e aula experimental em 3 passos",
  hamburgueria: "hero escuro com burger grande e etiqueta de preço, abas de categorias, grade de cards com foto/preço/descrição e botão Adicionar", pizzaria: "hero de foto em tela cheia, faixa de texto rolando, cardápio em lista com preços, seção de história com foto",
  barbearia: "hero dividido com foto da barbearia, tabela de serviços com preços pontilhados, galeria assimétrica", academia: "hero com título gigante vazado, faixa de números, três planos com destaque no do meio, fotos lado a lado",
  restaurante: "hero com foto em arco, pratos da casa em cards com foto, depoimento em citação", dentista: "hero com foto e cartão flutuante de avaliação, grade de tratamentos, faixa de números",
  floricultura: "buquês em cartões brancos sobre fundo rosa, carrinho que fecha no WhatsApp", coworking: "palavra gigante da marca sobre foto de fundo, barra de reserva em pílula, carrossel de espaços e contadores", cafeteria: "mosaico de fotos, cartão escuro de apresentação, cardápio em lista ao lado de foto redonda", tatuagem: "foto do artista em arco no hero, lista de serviços com checks, grade de estilos com preços, passos numerados, equipe e depoimento", poster: "pôster com palavra gigante atrás do produto recortado e círculo, parallax em camadas, cards de produtos",
  salao: "cabeçalho centralizado, três fotos em arco, lista de serviços em rosa", pet: "pôster com a palavra PET gigante atrás do cachorro recortado, cards de serviços em azul", advocacia: "hero com foto escura em parallax, áreas de atuação em cartões com linha dourada",
  oficina: "faixa amarela no topo, hero dividido com foto do motor, serviços numerados", imobiliaria: "hero em tela cheia com caixa de busca, imóveis em destaque com foto e preço", psicologia: "hero em tela cheia com foto acolhedora e título em serif itálica, lista de serviços em pílulas, sobre com foto em arco, depoimentos em cards escuros, CTA final",
};
export function buildModelPrompt(m: PremiumModel, c: { name?: string; whatsapp?: string; city?: string } = {}) {
  return `Crie um site de uma página (React + Tailwind, responsivo, mobile primeiro) para ${c.name || m.name}, ${m.ramoLabel.toLowerCase()}${c.city || m.city ? ` em ${c.city || m.city}` : ""}.
Estilo: ${m.style}. Cor de destaque ${m.accent}. Seções: ${SECTIONS[m.ramo]}.
Use fotos reais do ramo (Unsplash), tipografia forte, animações leves ao rolar (reveal e parallax, desligadas com prefers-reduced-motion).
Todos os botões chamam no WhatsApp${c.whatsapp ? ` (${c.whatsapp})` : ""}. Textos em português do Brasil, preços e depoimentos ilustrativos.
Referência visual: modelo "${m.name}" da Vitrine do SemSite (/vitrine/${m.id}).`;
}

