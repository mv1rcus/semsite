import { BadgeCheck } from "lucide-react";

export function VerifiedBadge({ size = 18 }: { size?: number }) {
  return <BadgeCheck size={size} aria-label="Conta verificada" className="inline-block shrink-0 fill-primary text-primary-foreground align-[-3px]" />;
}
