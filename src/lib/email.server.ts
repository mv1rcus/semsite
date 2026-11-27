// Envio de e-mail transacional pelo relay no Google Apps Script da conta semsiteapp@gmail.com.
// Segredos (backend): MAIL_RELAY_URL e MAIL_RELAY_TOKEN. Sem eles, nada é enviado (e nada quebra).
// Regra: falha de e-mail NUNCA pode derrubar o webhook de pagamento nem a concessão do selo.

export type MailMessage = { to: string; subject: string; html: string; text: string };

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

async function postRelay(msg: MailMessage): Promise<boolean> {
  const url = process.env["MAIL_RELAY_URL"];
  const token = process.env["MAIL_RELAY_TOKEN"];
  if (!url || !token) {
    console.error("email: MAIL_RELAY_URL/MAIL_RELAY_TOKEN não configurados, e-mail não enviado");
    return false;
  }
  const res = await fetch(url, {
    method: "POST",
    // text/plain evita o preflight CORS; o Apps Script lê o corpo cru.
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ token, ...msg }),
    redirect: "follow",
    signal: AbortSignal.timeout(15000),
  });
  const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
  if (!data?.ok) {
    console.error("email: relay recusou:", data?.error ?? res.status);
    return false;
  }
  return true;
}

/**
 * Envia no máximo uma vez por `dedupeKey`. Nunca lança erro.
 * Reserva a chave antes de enviar; se o envio falhar, libera a chave para um reenvio da Stripe tentar de novo.
 */
export async function sendOnce(dedupeKey: string, kind: string, msg: MailMessage): Promise<void> {
  try {
    if (!EMAIL_RE.test(msg.to)) return;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    let claim = await supabaseAdmin.from("email_log" as any).insert({ dedupe_key: dedupeKey, kind, to_email: msg.to, subject: msg.subject } as any);
    // Coluna nova ainda não criada no banco (42703): registra sem os detalhes.
    if (claim.error && claim.error.code === "42703") claim = await supabaseAdmin.from("email_log" as any).insert({ dedupe_key: dedupeKey, kind } as any);
    if (claim.error) {
      if (claim.error.code === "23505") return; // já enviado
      console.error("email: não consegui registrar o envio, enviando mesmo assim:", claim.error.message);
    }
    const ok = await postRelay(msg);
    if (!ok && !claim.error) await supabaseAdmin.from("email_log" as any).delete().eq("dedupe_key", dedupeKey);
  } catch (e) {
    console.error("email: erro inesperado:", e);
  }
}

/** E-mail do usuário pelo id (auth). Nunca lança erro. */
export async function emailOfUser(userId: unknown): Promise<string | null> {
  try {
    if (typeof userId !== "string" || !/^[0-9a-f-]{36}$/i.test(userId)) return null;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin.auth.admin.getUserById(userId);
    return data?.user?.email ?? null;
  } catch {
    return null;
  }
}
