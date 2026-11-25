import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { createStripeClient, type StripeEnv } from "@/lib/stripe.server";

const ACTIVE_STATUSES = ["active", "trialing", "past_due", "unpaid", "incomplete"];
const BUCKETS = ["avatars", "post-media"] as const;

// Apaga os arquivos que o usuário enviou (pasta com o id dele em cada bucket).
async function removeUserFiles(admin: any, userId: string) {
  for (const bucket of BUCKETS) {
    const { data } = await admin.storage.from(bucket).list(userId, { limit: 1000 });
    const paths = (data ?? []).map((f: { name: string }) => `${userId}/${f.name}`);
    if (paths.length) await admin.storage.from(bucket).remove(paths);
  }
}

// E-mail de confirmação. Só sai se houver provedor configurado (RESEND_API_KEY + ACCOUNT_EMAIL_FROM).
async function sendDeletionEmail(to: string): Promise<boolean> {
  const key = process.env["RESEND_API_KEY"];
  const from = process.env["ACCOUNT_EMAIL_FROM"];
  if (!key || !from || !to) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        subject: "Sua conta no SemSite foi excluída",
        text: "Sua conta no SemSite foi excluída e seus dados foram apagados. Se você não fez isso, responda este e-mail. Obrigado por ter usado o SemSite.",
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export const deleteMyAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { confirm: string }) => {
    if (d.confirm !== "EXCLUIR") throw new Error("Confirmação inválida");
    return d;
  })
  .handler(async ({ context }): Promise<{ ok: true; emailSent: boolean } | { ok: false; error: string }> => {
    const { userId, supabase } = context;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const admin = supabaseAdmin as any;
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const email = user?.email ?? "";

      // 1) Cancela assinaturas ativas no Stripe antes de apagar qualquer dado.
      const { data: subs } = await admin
        .from("subscriptions")
        .select("stripe_subscription_id, environment, status")
        .eq("user_id", userId);
      for (const s of (subs ?? []) as { stripe_subscription_id: string; environment: string; status: string }[]) {
        if (!ACTIVE_STATUSES.includes(s.status)) continue;
        if (s.environment !== "sandbox" && s.environment !== "live") continue;
        try {
          await createStripeClient(s.environment as StripeEnv).subscriptions.cancel(s.stripe_subscription_id);
        } catch (e) {
          const msg = e instanceof Error ? e.message : "";
          // Já cancelada no Stripe não impede a exclusão; qualquer outro erro sim.
          if (!/No such subscription|already been canceled|resource_missing/i.test(msg)) {
            return { ok: false, error: "Não foi possível cancelar sua assinatura agora. Nada foi excluído. Tente de novo ou escreva para contatosemsite@gmail.com." };
          }
        }
      }

      // 2) Dados do usuário. Tabelas sem chave estrangeira pra auth.users são apagadas na mão.
      const del = async (table: string, col: string) => {
        const { error } = await admin.from(table).delete().eq(col, userId);
        if (error) throw new Error(`${table}: ${error.message}`);
      };
      await removeUserFiles(admin, userId);
      await del("post_comments", "user_id");
      await del("post_likes", "user_id");
      await del("post_reposts", "user_id");
      await del("posts", "user_id");
      await del("follows", "follower_id");
      await del("follows", "following_id");
      await del("profile_likes", "liker_id");
      await del("profile_likes", "profile_id");
      await del("direct_messages", "sender_id");
      await del("direct_messages", "recipient_id");
      await del("contacted_leads", "user_id");
      await del("search_usage", "user_id");
      await del("subscriptions", "user_id");
      await del("verified_profiles", "profile_id");
      await del("profiles", "id");

      // 3) Conta de login.
      const { error: authErr } = await admin.auth.admin.deleteUser(userId);
      if (authErr) throw new Error(authErr.message);

      // 4) Confirmação por e-mail (depois de tudo apagado).
      const emailSent = await sendDeletionEmail(email);
      return { ok: true, emailSent };
    } catch (e) {
      console.error("deleteMyAccount", e);
      return { ok: false, error: "Não foi possível excluir sua conta agora. Tente de novo ou escreva para contatosemsite@gmail.com." };
    }
  });
