import { z } from "zod";

export const verificationSchema = z.object({
  checkedAt: z.string().datetime(),
  status: z.enum(["ok", "failed"]),
});
export type DemoVerification = z.infer<typeof verificationSchema>;
export const savedDemoSchema = z.object({
  id: z.string(), name: z.string(), verification: verificationSchema.optional(),
});
export type SavedDemo = z.infer<typeof savedDemoSchema>;
export const RECENT_VERIFICATION_MS = 24 * 60 * 60 * 1000;

export function verificationState(verification?: DemoVerification, now = Date.now()) {
  if (!verification) return "unchecked";
  const age = now - Date.parse(verification.checkedAt);
  if (!Number.isFinite(age) || age < 0) return "unchecked";
  if (verification.status === "failed") return "failed";
  return age < RECENT_VERIFICATION_MS ? "recent" : "stale";
}

export function demonstrationPageIsAvailable(status: number, html: string) {
  return status === 200 && /class="demo-site(?:\s|")/.test(html) && /<h1\b/.test(html);
}