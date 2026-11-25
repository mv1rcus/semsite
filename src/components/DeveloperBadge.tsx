import { Code2 } from "lucide-react";

export const DEVELOPER_USERNAMES = ["mvthebest", "mv1rcus"];
export const DEVELOPER_USERNAME = "mvthebest";
export const isDeveloperUsername = (u?: string | null) => !!u && DEVELOPER_USERNAMES.includes(u);

export function DeveloperBadge({ size = 18 }: { size?: number }) {
  return (
    <span
      title="Developer"
      aria-label="Developer"
      className="inline-flex shrink-0 items-center gap-0.5 rounded-full bg-primary/15 px-1.5 py-0.5 align-[-3px] text-primary"
    >
      <Code2 size={size} strokeWidth={2.5} />
    </span>
  );
}
