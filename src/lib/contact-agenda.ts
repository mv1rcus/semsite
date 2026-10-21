import { reminderDue, type FollowUpClient } from "./follow-up";
import { buildMessage, senderIntro } from "./message";

export function contactAgenda(clients: FollowUpClient[], now: number) {
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  return clients.filter((client) => client.stage !== "closed" && (
    client.nextContact ? Date.parse(client.nextContact) <= end.getTime() : true
  )).sort((a, b) => Number(reminderDue(b, now)) - Number(reminderDue(a, now)) ||
    Number(!!b.nextContact) - Number(!!a.nextContact) ||
    (a.nextContact && b.nextContact ? Date.parse(a.nextContact) - Date.parse(b.nextContact) : 0) ||
    Number(b.stage === "demo_sent") - Number(a.stage === "demo_sent") ||
    Date.parse(a.stageDate) - Date.parse(b.stageDate));
}

export function followUpMessage(client: FollowUpClient) {
  if (client.stage === "new") return buildMessage(client.name);
  if (client.stage === "demo_sent") return `${senderIntro()} Tudo bem? Conseguiu olhar a ideia de site que enviei para ${client.name}? Queria saber o que achou e se gostaria de ajustar algum detalhe. Se fizer sentido para vocês, podemos conversar sobre os próximos passos, sem compromisso.`;
  return `${senderIntro()} Estou retomando nossa conversa sobre um site para ${client.name}. Posso te mostrar uma ideia personalizada, sem compromisso? A entrega do site é em até uma semana.`;
}

export function scheduleContact(days: number, now = new Date()) {
  const date = new Date(now);
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

export function agendaWhatsApp(client: FollowUpClient, message: string) {
  const digits = (client.intlPhone || client.phone || "").replace(/\D/g, "");
  return digits ? `https://wa.me/${digits.startsWith("55") ? digits : `55${digits}`}?text=${encodeURIComponent(message)}` : null;
}