import { z } from "zod";

export const verificationSchema = z.object({
  checkedAt: z.string().datetime(),
  status: z.enum(["ok", "failed"]),
});
export type DemoVerification = z.infer<typeof verificationSchema>;
export const savedDemoSchema = z.object({
  id: z.string(), name: z.string(), slug: z.string().nullish(), verification: verificationSchema.optional(),
});
export type SavedDemo = z.infer<typeof savedDemoSchema>;
/** Remove only selected entries from local history, preserving other links. */
export function removeSavedDemos(saved: SavedDemo[], ids: string[]) {
  const selected = new Set(ids);
  return saved.filter(item => !selected.has(item.id));
}
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
export const INACTIVE_DEMO_MS = 24 * 60 * 60 * 1000;
export type DemoActivity = { id: string; slug?: string | null; createdAt: string; lastOpenedAt: string | null };
/** A demonstration is inactive when nobody opened it in the last 24h (or since creation, if never opened). */
export function isInactiveDemo(activity: DemoActivity, now: number) {
  const last = Date.parse(activity.lastOpenedAt ?? activity.createdAt);
  return Number.isFinite(last) && now - last >= INACTIVE_DEMO_MS;
}

const DAY_MS = 24 * 60 * 60 * 1000;
function startOfDay(ms: number) { const day = new Date(ms); day.setHours(0, 0, 0, 0); return day.getTime(); }

export type DemoAccessBadge = {
  /** "opened" = the client clicked the link; "waiting" = nobody opened it yet. */
  state: "opened" | "waiting";
  label: string;
  /** Human readable moment, e.g. "Aberto hoje às 14:30". */
  detail: string;
};

/** Turn a demonstration's open record into the badge shown next to the client name. */
export function demoAccessBadge(activity: DemoActivity | undefined, now: number): DemoAccessBadge | null {
  if (!activity) return null;
  const openedAt = activity.lastOpenedAt ? Date.parse(activity.lastOpenedAt) : NaN;
  if (!Number.isFinite(openedAt)) {
    return { state: "waiting", label: "Aguardando abertura", detail: "Ninguém abriu o link ainda" };
  }
  const time = new Date(openedAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  const days = Math.round((startOfDay(now) - startOfDay(openedAt)) / DAY_MS);
  if (days <= 0) return { state: "opened", label: "Acessado pelo cliente", detail: `Aberto hoje às ${time}` };
  if (days === 1) return { state: "opened", label: "Acessado pelo cliente", detail: `Aberto ontem às ${time}` };
  const date = new Date(openedAt).toLocaleDateString("pt-BR");
  return { state: "opened", label: "Acessado pelo cliente", detail: `Aberto em ${date} às ${time}` };
}
