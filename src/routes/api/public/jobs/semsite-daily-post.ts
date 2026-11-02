import { createFileRoute } from "@tanstack/react-router";
import { authenticateCronRequest } from "@/integrations/supabase/cron-auth";
import { SEMSITE_ACCOUNT_ID, tipForDate } from "@/lib/semsite-daily-tips";

export const Route = createFileRoute("/api/public/jobs/semsite-daily-post")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const authFailure = await authenticateCronRequest(request);
        if (authFailure) return authFailure;

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const body = tipForDate(new Date());
        // Avoid duplicates if the job fires twice the same day.
        const since = new Date(Date.now() - 20 * 3600_000).toISOString();
        const { data: existing } = await supabaseAdmin
          .from("posts").select("id").eq("user_id", SEMSITE_ACCOUNT_ID).eq("body", body).gte("created_at", since).limit(1);
        if (existing && existing.length) return Response.json({ skipped: true });

        const { error } = await supabaseAdmin.from("posts").insert({ user_id: SEMSITE_ACCOUNT_ID, body });
        if (error) return Response.json({ error: error.message }, { status: 500 });
        return Response.json({ success: true });
      },
    },
  },
});
