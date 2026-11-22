import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { useVerified } from "@/lib/use-verified";

const UNLOCKED = ["Buscas de clientes sem limite", "Sites de demonstração pra mandar ao cliente", "Mensagem escrita do seu jeito", "Selo verificado no seu perfil"];

export function VerifiedGate({ feature, children }: { feature: string; children: ReactNode }) {
  const { loading, verified } = useVerified();
  if (loading) return <div className="flex justify-center py-24"><Loader2 className="size-6 animate-spin text-muted-foreground" /></div>;
  if (verified) return <>{children}</>;
  return (
    <div className="mx-auto max-w-md px-4 py-12 text-center">
      <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10"><VerifiedBadge size={36} /></div>
      <h1 className="mt-4 font-display text-4xl tracking-wide">{feature} é do Verificado</h1>
      <p className="mt-2 text-muted-foreground">Agora você tem 5 buscas por dia e o resto travado. Com o Verificado você busca sem limite e mostra um site de verdade antes de falar de preço.</p>
      <ul className="mx-auto mt-5 max-w-xs space-y-2 text-left">
        {UNLOCKED.map(u => <li key={u} className="flex items-start gap-2 text-sm"><Check className="size-4 shrink-0 text-primary" />{u}</li>)}
      </ul>
      <Button asChild className="mt-6 w-full rounded-full py-6 font-display text-2xl tracking-wide"><Link to="/verificado">Obter verificado por R$ 8,99/mês</Link></Button>
      <p className="mt-2 text-xs text-muted-foreground">Sem cobrança automática: o selo vale até o fim do período pago.</p>
    </div>
  );
}
