export const MESSAGE_KEY = "welcome-message-v1";
export type MessageSettings = { senderName: string; template: string };

export const MESSAGE_SUGGESTIONS: { label: string; template: string }[] = [
  { label: "Completa", template: `Olá, tudo bem? Me chamo {seu_nome} 😊

Vi que o {empresa} ainda não tem um site.

Eu crio sites profissionais que ajudam a aparecer melhor no Google e trazer mais clientes — e entrego em até uma semana.

Posso te mostrar uma ideia de como ficaria o site de vocês, sem compromisso?` },
  { label: "Curta e direta", template: `Oi! Aqui é {seu_nome}. Vi que o {empresa} ainda não tem site. Faço sites profissionais com entrega em até uma semana. Posso te mostrar uma ideia, sem compromisso?` },
  { label: "Amigável", template: `Olá! Tudo bem por aí? 😊 Sou {seu_nome} e adorei conhecer o {empresa}.

Notei que vocês ainda não têm um site e preparei uma ideia de como ele poderia ficar. Fica pronto em até uma semana.

Quer dar uma olhada? É sem compromisso!` },
  { label: "Foco em clientes", template: `Olá! Meu nome é {seu_nome}. Hoje muita gente pesquisa na internet antes de escolher onde ir, e o {empresa} ainda não tem um site próprio.

Posso criar um site para vocês em até uma semana, com WhatsApp, localização e serviços. Posso te mostrar um exemplo sem compromisso?` },
  { label: "Profissional", template: `Olá! Meu nome é {seu_nome}. Vi que {empresa} ainda não tem site e gostaria de apresentar uma proposta de site próprio para o negócio.

Trabalho com sites profissionais, com entrega em até uma semana. Podemos conversar sobre uma ideia, sem compromisso?` },
  { label: "Catálogo e serviços", template: `Olá! Aqui é {seu_nome}. Vi que {empresa} ainda não tem site e pensei em um site para apresentar seus produtos ou serviços e facilitar o contato pelo WhatsApp.

A entrega é em até uma semana. Posso mostrar um exemplo para vocês avaliarem, sem compromisso?` },
  { label: "Conversa leve", template: `Oi! Tudo bem? Sou {seu_nome}. Quem cuida da presença online de {empresa}?

Eu crio sites com entrega em até uma semana e gostaria de conversar sobre uma ideia para o negócio, sem compromisso. Faz sentido para vocês?` },
];

export const DEFAULT_SETTINGS: MessageSettings = { senderName: "", template: MESSAGE_SUGGESTIONS[0]?.template ?? "" };

export function loadMessageSettings(): MessageSettings {
  if (typeof localStorage === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = JSON.parse(localStorage.getItem(MESSAGE_KEY) || "null");
    if (raw && typeof raw.template === "string" && raw.template.trim()) return { senderName: typeof raw.senderName === "string" ? raw.senderName : "", template: raw.template };
  } catch { /* usa padrão */ }
  return DEFAULT_SETTINGS;
}

export function saveMessageSettings(settings: MessageSettings) {
  localStorage.setItem(MESSAGE_KEY, JSON.stringify(settings));
}

/** Preenche {seu_nome} e {empresa}; sem nome, remove a apresentação para não ficar "Me chamo ". */
export function fillTemplate(template: string, businessName: string, senderName: string) {
  const name = senderName.trim();
  let text = template;
  if (!name) text = text.replace(/\s*(Me chamo|Meu nome é|Aqui é|Sou)\s+\{seu_nome\}[.,!]?/gi, "").replace(/\{seu_nome\}/g, "");
  return text.replace(/\{seu_nome\}/g, name).replace(/\{empresa\}/g, businessName).trim();
}

export function buildMessage(businessName: string, settings: MessageSettings = loadMessageSettings()) {
  return fillTemplate(settings.template, businessName, settings.senderName);
}

export function senderIntro(settings: MessageSettings = loadMessageSettings()) {
  const name = settings.senderName.trim();
  return name ? `Olá! Aqui é ${name} 😊` : "Olá! 😊";
}

export function whatsappLink(intlPhone: string, businessName: string) {
  const digits = intlPhone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(buildMessage(businessName))}`;
}
