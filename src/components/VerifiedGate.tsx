import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { useVerified } from "@/lib/use-verified";

export function VerifiedGate({ feature, children }: { feature: string; children: ReactNode }) {
  const { loading, verified } = useVerified();
  if (loading) return <div className="flex justify-center py-24"><Loader2 className="size-6 animate-spin text-muted-foreground" /></div>;
  if (verified) return <>{children}</>;
  return (
    <div className="mx-auto max-w-md px-4 py-16 text-center">
      <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10"><VerifiedBadge size={36} /></div>
      <h1 className="mt-4 font-display text-4xl tracking-wide">{feature} é do Verificado</h1>
      <p className="mt-2 text-muted-foreground">Assine o Verificado para liberar {feature.toLowerCase()}, buscas sem limite e o selo no seu perfil.</p>
      <Button asChild className="mt-6 rounded-full font-bold"><Link to="/verificado">Obter verificado</Link></Button>
    </div>
  );
}
