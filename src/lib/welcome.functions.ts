import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { sendOnce } from "@/lib/email.server";
import { welcomeEmail } from "@/lib/email-templates";

const NEW_ACCOUNT_WINDOW_MS = 48 * 3600_000;

/** Boas-vindas no primeiro acesso de uma conta nova (criada nas últimas 48h). Envia no máximo uma vez por usuário. Nunca lança erro. */
export const sendWelcomeEmail = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ ok: true }> => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data } = await supabaseAdmin.auth.admin.getUserById(context.userId);
      const u = data?.user;
      if (u?.email && u.created_at && Date.now() - new Date(u.created_at).getTime() < NEW_ACCOUNT_WINDOW_MS) {
        await sendOnce(`welcome-${context.userId}`, "welcome", welcomeEmail(u.email));
      }
    } catch (e) {
      console.error("welcome: erro:", e);
    }
    return { ok: true };
  });
