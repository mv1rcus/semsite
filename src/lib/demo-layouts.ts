import { demoSector } from "./demonstrations";
// Modelo de site por tipo de negócio: muda estrutura, textos e ações (só apresentação).
export type LayoutId = "gastro" | "vip" | "beauty" | "health" | "quick";
export type DemoLayout = { id: LayoutId; label: string; hint: string; cta: string; itemCta: string; message: (item: string) => string; features: { t: string; d: string }[]; why: { t: string; d: string }[]; steps: string[]; ribbon: string; hours: string };
export const LAYOUTS: Record<LayoutId, DemoLayout> = {
  gastro: { id: "gastro", label: "Gastronomia", hint: "Cardápio digital com pedido rápido", cta: "Fazer pedido no WhatsApp", itemCta: "Pedir", message: (i) => `Olá! Vi no cardápio o ${i} e quero fazer um pedido.`, ribbon: "Delivery e retirada no balcão", hours: "Ter a Dom · 18h às 23h",
    features: [{ t: "Feito na hora", d: "Preparo fresquinho a cada pedido." }, { t: "Entrega quentinha", d: "Pedido bem embalado até sua porta." }, { t: "Retire no balcão", d: "Peça antes e só passe para buscar." }],
    why: [{ t: "Ingredientes selecionados", d: "Qualidade que dá para sentir no sabor." }, { t: "Receitas da casa", d: "Sabores que viraram tradição." }, { t: "Pedido sem complicação", d: "Escolheu, chamou, chegou." }],
    steps: ["Escolha no cardápio", "Mande o pedido no WhatsApp", "Receba ou retire no balcão"] },
  vip: { id: "vip", label: "Agendamento VIP", hint: "Visual escuro de alto padrão", cta: "Agendar horário", itemCta: "Agendar", message: (i) => `Olá! Quero agendar um horário para ${i}.`, ribbon: "Atendimento com hora marcada", hours: "Seg a Sáb · 9h às 19h",
    features: [{ t: "Sem fila", d: "Você chega e já é atendido." }, { t: "Especialistas", d: "Profissionais que dominam o que fazem." }, { t: "Ambiente exclusivo", d: "Um lugar pensado para você relaxar." }],
    why: [{ t: "Acabamento impecável", d: "Atenção a cada detalhe." }, { t: "Pontualidade", d: "Seu tempo é respeitado." }, { t: "Experiência completa", d: "Mais que um serviço, um momento seu." }],
    steps: ["Escolha o serviço", "Reserve seu horário", "Chegue e aproveite"] },
  beauty: { id: "beauty", label: "Estética & Cuidados", hint: "Elegante, claro e sofisticado", cta: "Agendar atendimento", itemCta: "Quero esse", message: (i) => `Olá! Tenho interesse em ${i} e quero agendar um atendimento.`, ribbon: "Cuidado que realça sua beleza", hours: "Seg a Sex · 9h às 19h · Sáb 8h às 14h",
    features: [{ t: "Produtos de qualidade", d: "Marcas que cuidam de você." }, { t: "Atendimento acolhedor", d: "Você se sente em casa." }, { t: "Resultado natural", d: "Realçar, sem exagero." }],
    why: [{ t: "Técnicas atualizadas", d: "Profissionais sempre em formação." }, { t: "Higiene rigorosa", d: "Materiais limpos e seguros." }, { t: "Feito para você", d: "Cada atendimento é personalizado." }],
    steps: ["Escolha o procedimento", "Agende pelo WhatsApp", "Saia renovada"] },
  health: { id: "health", label: "Autoridade & Saúde", hint: "Limpo, profissional e confiável", cta: "Marcar avaliação", itemCta: "Marcar", message: (i) => `Olá! Gostaria de marcar uma avaliação sobre ${i}.`, ribbon: "Atendimento humanizado", hours: "Seg a Sex · 8h às 18h",
    features: [{ t: "Ambiente moderno", d: "Estrutura limpa e confortável." }, { t: "Escuta atenta", d: "Seu caso explicado com clareza." }, { t: "Segurança", d: "Protocolos rigorosos em cada etapa." }],
    why: [{ t: "Plano sob medida", d: "Tratamento pensado para você." }, { t: "Tudo explicado antes", d: "Sem surpresas no caminho." }, { t: "Acompanhamento", d: "Cuidado também depois da consulta." }],
    steps: ["Marque sua avaliação", "Converse com o profissional", "Siga seu plano de cuidado"] },
  quick: { id: "quick", label: "Serviços Rápidos", hint: "Direto ao ponto, foco em orçamento", cta: "Pedir orçamento grátis", itemCta: "Orçar", message: (i) => `Olá! Preciso de um orçamento para ${i}.`, ribbon: "Orçamento sem compromisso", hours: "Seg a Sex · 8h às 18h · Sáb 8h às 12h",
    features: [{ t: "Resposta rápida", d: "Retorno no mesmo dia." }, { t: "Preço antes de começar", d: "Você aprova antes do serviço." }, { t: "Garantia", d: "Serviço bem feito e garantido." }],
    why: [{ t: "Experiência", d: "Problemas resolvidos de primeira." }, { t: "Material de qualidade", d: "Nada de gambiarra." }, { t: "Compromisso com prazo", d: "Combinado é cumprido." }],
    steps: ["Conte o que precisa", "Receba o orçamento", "Serviço resolvido"] },
};
export const LAYOUT_IDS = Object.keys(LAYOUTS) as LayoutId[];
const VIP = /\b(?:barb|tatu\b|tatuag|est[eé]tica auto|lava ?jato|lava ?car|lavagem|jato|pub\b|bar\b|choper)/i;
export function autoLayout(category: string): LayoutId {
  if (VIP.test(category)) return "vip";
  const s = demoSector(category);
  if (s === "food") return "gastro";
  if (s === "health") return "health";
  if (s === "beauty") return "beauty";
  if (s === "gym" || s === "law") return s === "law" ? "health" : "vip";
  return "quick";
}
export function isLayoutId(v: unknown): v is LayoutId { return typeof v === "string" && v in LAYOUTS; }
