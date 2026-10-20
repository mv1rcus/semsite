export function buildMessage(businessName: string) {
  return `Olá, tudo bem? Me chamo Marcus 😊

Encontrei o ${businessName} no Google Maps e percebi que vocês ainda não têm um site.

Eu crio sites profissionais que ajudam a aparecer melhor no Google e trazer mais clientes — e entrego em até uma semana.

Posso te mostrar uma ideia de como ficaria o site de vocês, sem compromisso?`;
}

export function whatsappLink(intlPhone: string, businessName: string) {
  const digits = intlPhone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(buildMessage(businessName))}`;
}
