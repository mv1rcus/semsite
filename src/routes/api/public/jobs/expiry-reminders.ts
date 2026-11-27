import { createFileRoute } from "@tanstack/react-router";
import { authenticateCronRequest } from "@/integrations/supabase/cron-auth";
import { emailOfUser, sendOnce } from "@/lib/email.server";
import { expiringEmail } from "@/lib/email-templates";

// Job diário: avisa quem tem selo de pagamento único (source = 'one_time') vencendo nos próximos 3 dias.
// Um aviso por usuário e por data de vencimento (dedupe no email_log).
export const Route = createFileRoute("/api/public/jobs/expiry-reminders")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const authFailure = await authenticateCronRequest(request);
        if (authFailure) return authFailure;
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const admin = supabaseAdmin as any;
        const now = new Date();
        const limit = new Date(now.getTime() + 3 * 24 * 3600_000);
        const { data, error } = await admin
          .from("verified_profiles")
          .select("profile_id, expires_at")
          .eq("source", "one_time")
          .gt("expires_at", now.toISOString())
          .lte("expires_at", limit.toISOString())
          .limit(200);
        if (error) return Response.json({ error: error.message }, { status: 500 });
        let sent = 0;
        for (const row of (data ?? []) as { profile_id: string; expires_at: string }[]) {
          const to = await emailOfUser(row.profile_id);
          if (!to) continue;
          await sendOnce(`expiring:${row.profile_id}:${row.expires_at.slice(0, 10)}`, "expiring", expiringEmail(to, row.expires_at));
          sent++;
        }
        return Response.json({ success: true, checked: sent });
      },
    },
  },
});
