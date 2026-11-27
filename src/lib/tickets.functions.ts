import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { sendOnce } from "@/lib/email.server";
import { ticketOpenedEmail, ticketReplyEmail } from "@/lib/email-templates";

// Dono do site (mesma conta que vê "Contas do site"). Checado no servidor pelo id do usuário autenticado.
const OWNER_ID = "60254e77-1a4c-4be8-8b77-3d29a537785f";
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export type TicketStatus = "open" | "answered" | "closed";
export type TicketRow = { id: string; number: number; name: string; email: string; subject: string; status: TicketStatus; created_at: string; updated_at: string };
export type TicketMessage = { id: string; author: "customer" | "admin"; body: string; created_at: string };

async function db() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin as any;
}
function requireAdmin(userId: unknown) {
  if (userId !== OWNER_ID) throw new Error("Não autorizado");
}

/** Cliente abre um ticket (sem login). Limites: 3 por e-mail/hora, 30 no site/hora, 60 no site/dia (o relay envia no máx. 80 e-mails/dia). */
export const createTicket = createServerFn({ method: "POST" })
  .inputValidator((d: { name: string; email: string; subject: string; message: string; website?: string }) => d)
  .handler(async ({ data }): Promise<{ ok: true; number: number } | { ok: false; error: string }> => {
    // Campo escondido: robô preenche, gente não. Finge sucesso.
    if (data.website) return { ok: true, number: 0 };
    const name = String(data.name ?? "").trim().slice(0, 80);
    const email = String(data.email ?? "").trim().toLowerCase().slice(0, 200);
    const subject = String(data.subject ?? "").trim().slice(0, 120);
    const message = String(data.message ?? "").trim().slice(0, 4000);
    if (name.length < 2) return { ok: false, error: "Escreva seu nome." };
    if (!EMAIL_RE.test(email)) return { ok: false, error: "E-mail inválido." };
    if (subject.length < 3) return { ok: false, error: "Escreva um assunto." };
    if (message.length < 10) return { ok: false, error: "Descreva melhor o que você precisa (mínimo 10 caracteres)." };
    try {
      const admin = await db();
      const since = (h: number) => new Date(Date.now() - h * 3600_000).toISOString();
      const [byEmail, hour, day] = await Promise.all([
        admin.from("tickets").select("id", { count: "exact", head: true }).eq("email", email).gte("created_at", since(1)),
        admin.from("tickets").select("id", { count: "exact", head: true }).gte("created_at", since(1)),
        admin.from("tickets").select("id", { count: "exact", head: true }).gte("created_at", since(24)),
      ]);
      if ((byEmail.count ?? 0) >= 3 || (hour.count ?? 0) >= 30 || (day.count ?? 0) >= 60) {
        return { ok: false, error: "Muitos pedidos em pouco tempo. Tente de novo mais tarde." };
      }
      const t = await admin.from("tickets").insert({ name, email, subject }).select("id, number").single();
      if (t.error || !t.data) throw new Error(t.error?.message ?? "sem retorno");
      const m = await admin.from("ticket_messages").insert({ ticket_id: t.data.id, author: "customer", body: message });
      if (m.error) throw new Error(m.error.message);
      await sendOnce(`ticket-open-${t.data.number}`, "ticket_opened", ticketOpenedEmail(email, Number(t.data.number), subject));
      return { ok: true, number: Number(t.data.number) };
    } catch (e) {
      console.error("tickets: falha ao criar:", e);
      return { ok: false, error: "Não foi possível enviar agora. Tente de novo ou escreva para semsiteapp@gmail.com." };
    }
  });

export const adminListTickets = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ tickets: TicketRow[]; counts: { total: number; open: number; answered: number; closed: number } }> => {
    requireAdmin(context.userId);
    const admin = await db();
    const { data, error } = await admin.from("tickets").select("id, number, name, email, subject, status, created_at, updated_at").order("number", { ascending: false }).limit(500);
    if (error) throw new Error("Erro ao carregar tickets");
    const tickets = (data ?? []) as TicketRow[];
    const count = (s: TicketStatus) => tickets.filter((t) => t.status === s).length;
    return { tickets, counts: { total: tickets.length, open: count("open"), answered: count("answered"), closed: count("closed") } };
  });

export const adminGetTicket = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => {
    if (!/^[0-9a-f-]{36}$/i.test(d.id)) throw new Error("id inválido");
    return d;
  })
  .handler(async ({ context, data }): Promise<{ ticket: TicketRow; messages: TicketMessage[] }> => {
    requireAdmin(context.userId);
    const admin = await db();
    const t = await admin.from("tickets").select("id, number, name, email, subject, status, created_at, updated_at").eq("id", data.id).single();
    if (t.error || !t.data) throw new Error("Ticket não encontrado");
    const m = await admin.from("ticket_messages").select("id, author, body, created_at").eq("ticket_id", data.id).order("created_at", { ascending: true });
    return { ticket: t.data as TicketRow, messages: (m.data ?? []) as TicketMessage[] };
  });

export const adminReplyTicket = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string; body: string }) => {
    if (!/^[0-9a-f-]{36}$/i.test(d.id)) throw new Error("id inválido");
    const body = String(d.body ?? "").trim().slice(0, 4000);
    if (body.length < 2) throw new Error("Escreva a resposta");
    return { id: d.id, body };
  })
  .handler(async ({ context, data }): Promise<{ ok: true; emailed: boolean }> => {
    requireAdmin(context.userId);
    const admin = await db();
    const t = await admin.from("tickets").select("id, number, email, subject").eq("id", data.id).single();
    if (t.error || !t.data) throw new Error("Ticket não encontrado");
    const m = await admin.from("ticket_messages").insert({ ticket_id: data.id, author: "admin", body: data.body }).select("id").single();
    if (m.error || !m.data) throw new Error("Não foi possível salvar a resposta");
    await admin.from("tickets").update({ status: "answered", updated_at: new Date().toISOString() }).eq("id", data.id);
    await sendOnce(`ticket-reply-${m.data.id}`, "ticket_reply", ticketReplyEmail(t.data.email, Number(t.data.number), t.data.subject, data.body));
    const sent = await admin.from("email_log").select("dedupe_key", { head: true, count: "exact" }).eq("dedupe_key", `ticket-reply-${m.data.id}`);
    return { ok: true, emailed: (sent.count ?? 0) > 0 };
  });

export const adminSetTicketStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string; status: TicketStatus }) => {
    if (!/^[0-9a-f-]{36}$/i.test(d.id)) throw new Error("id inválido");
    if (!["open", "answered", "closed"].includes(d.status)) throw new Error("status inválido");
    return d;
  })
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    requireAdmin(context.userId);
    const admin = await db();
    const r = await admin.from("tickets").update({ status: data.status, updated_at: new Date().toISOString() }).eq("id", data.id);
    if (r.error) throw new Error("Não foi possível atualizar");
    return { ok: true };
  });
