import { Code2 } from "lucide-react";

/** O selo de dev e amarrado ao id da conta, nao ao @usuario: ninguem ganha registrando o @. */
export const DEVELOPER_USER_ID = "60254e77-1a4c-4be8-8b77-3d29a537785f";
export const isDeveloperId = (id?: string | null) => id === DEVELOPER_USER_ID;

export function DeveloperBadge({ size = 18 }: { size?: number }) {
  return (
    <span
      title="Developer"
      aria-label="Developer"
      className="inline-flex shrink-0 items-center gap-0.5 rounded-full bg-primary/20 px-2 py-0.5 align-[-3px] text-primary"
    >
      <Code2 size={size} strokeWidth={2.5} />
    </span>
  );
}
