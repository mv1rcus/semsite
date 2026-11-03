import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

// Signs post media for signed-in users, only for paths attached to an existing post.
export const signPostMedia = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ paths: z.array(z.string().min(1).max(300)).max(100) }).parse(d))
  .handler(async ({ data }) => {
    const paths = [...new Set(data.paths)];
    if (!paths.length) return {} as Record<string, string>;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows } = await supabaseAdmin.from("posts").select("media_path").in("media_path", paths);
    const valid = (rows ?? []).map((r) => r.media_path).filter((p): p is string => !!p);
    if (!valid.length) return {} as Record<string, string>;
    const { data: signed } = await supabaseAdmin.storage.from("post-media").createSignedUrls(valid, 3600);
    const out: Record<string, string> = {};
    for (const s of signed ?? []) if (s.path && s.signedUrl) out[s.path] = s.signedUrl;
    return out;
  });
