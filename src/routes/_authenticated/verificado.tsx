import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { supabase } from "@/integrations/supabase/client";
import { getStripe, getStripeEnvironment } from "@/lib/stripe";
import { createVerifiedCheckout, createVerifiedPortal } from "@/lib/payments.functions";
import { VERIFIED_PLANS, type VerifiedPriceId } from "@/lib/verified-plans";
import { useVerified } from "@/lib/use-verified";

export const Route = createFileRoute("/_authenticated/verificado")({
  validateSearch: (s: Record<string, unknown>): { pago?: string | undefined } => ({ pago: typeof s['pago'] === "string" ? s['pago'] : undefined }),
  head: () => ({ meta: [{ title: "Obter verificado — SemSite" }, { name: "description", content: "Assine o Verificado do SemSite: selo no perfil, buscas sem limite, demonstrações, mensagem personalizada e análise." }, { property: "og:title", content: "Obter verificado — SemSite" }, { property: "og:description", content: "Selo verificado e acesso completo ao SemSite a partir de R$ 7,99 por mês." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" }] }),
  component: Verificado,
});

const PERKS = ["Selo verificado no perfil", "Buscas de clientes sem limite (grátis: 5 por dia)", "Criar sites de demonstração", "Personalizar a mensagem do WhatsApp", "Análise comercial"];

function TestBanner() {
  const t = import.meta.env['VITE_PAYMENTS_CLIENT_TOKEN'] as string | undefined;
  if (!t) return <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-center text-sm">Pagamentos ainda não ativados no site oficial.</div>;
  if (t.startsWith("pk_test_")) return <div className="rounded-xl border border-accent bg-accent/40 p-3 text-center text-sm">Modo de teste: nenhum pagamento é cobrado de verdade.</div>;
  return null;
}

function Verificado() {
  const { pago } = Route.useSearch();
  const { loading, verified } = useVerified();
  const [plan, setPlan] = useState<VerifiedPriceId | null>(null);
  const [error, setError] = useState("");
  const [sub, setSub] = useState<{ status: string; current_period_end: string | null; cancel_at_period_end: boolean } | null>(null);
  const [waiting, setWaiting] = useState(!!pago);

  useEffect(() => {
    let env: "sandbox" | "live";
    try { env = getStripeEnvironment(); } catch { return; }
    supabase.from("subscriptions").select("status,current_period_end,cancel_at_period_end").eq("environment", env).order("created_at", { ascending: false }).limit(1).maybeSingle().then(({ data }) => setSub(data));
  }, [verified]);

  // After payment the confirmation arrives a few seconds later; poll until the badge is granted.
  useEffect(() => {
    if (!pago || verified) { setWaiting(false); return; }
    let n = 0;
    const id = setInterval(async () => {
      const { data } = await supabase.rpc("am_i_verified");
      if (data || ++n > 20) { clearInterval(id); if (data) window.location.replace("/verificado"); else setWaiting(false); }
    }, 2000);
    return () => clearInterval(id);
  }, [pago, verified]);

  async function openPortal() {
    setError("");
    const r = await createVerifiedPortal({ data: { returnUrl: window.location.href, environment: getStripeEnvironment() } });
    if ("error" in r) { setError(r.error); return; }
    window.open(r.url, "_blank");
  }

  const fetchClientSecret = async () => {
    const r = await createVerifiedCheckout({ data: { priceId: plan!, returnUrl: `${window.location.origin}/verificado?pago=1`, environment: getStripeEnvironment() } });
    if ("error" in r) { setError(r.error); throw new Error(r.error); }
    return r.clientSecret;
  };

  return (
    <main className="mx-auto max-w-xl space-y-5 px-4 py-6">
      <TestBanner />
      <div className="text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10"><VerifiedBadge size={36} /></div>
        <h1 className="mt-3 font-display text-5xl tracking-wide">SemSite Verificado</h1>
      </div>
      {loading || waiting ? (
        <div className="flex flex-col items-center gap-2 py-10 text-muted-foreground"><Loader2 className="size-6 animate-spin" />{waiting && "Confirmando seu pagamento…"}</div>
      ) : verified ? (
        <div className="space-y-3 rounded-2xl border bg-card p-5 text-center">
          <p className="font-bold">Sua conta é verificada. Tudo liberado! 🎉</p>
          {sub && <p className="text-sm text-muted-foreground">{sub.cancel_at_period_end ? "Cancelada — o selo fica até " : "Próxima cobrança em "}{sub.current_period_end ? new Date(sub.current_period_end).toLocaleDateString("pt-BR") : "—"}</p>}
          {sub && <Button variant="outline" className="rounded-full" onClick={openPortal}>Gerenciar ou cancelar assinatura</Button>}
        </div>
      ) : plan ? (
        <div className="space-y-3">
          <Button variant="ghost" onClick={() => { setPlan(null); setError(""); }}>← Trocar plano</Button>
          <div className="overflow-hidden rounded-2xl border bg-card">
            <EmbeddedCheckoutProvider key={plan} stripe={getStripe()} options={{ fetchClientSecret }}><EmbeddedCheckout /></EmbeddedCheckoutProvider>
          </div>
        </div>
      ) : (
        <>
          <ul className="space-y-2 rounded-2xl border bg-card p-5">{PERKS.map(p => <li key={p} className="flex gap-2"><Check className="size-5 shrink-0 text-primary" />{p}</li>)}</ul>
          {sub && !verified && <p className="text-center text-sm text-muted-foreground">Sua última assinatura não está ativa{sub.status === "past_due" || sub.status === "unpaid" ? " porque o pagamento falhou" : ""}. Assine de novo para voltar o selo.</p>}
          <div className="grid gap-3 sm:grid-cols-2">
            {VERIFIED_PLANS.map(p => (
              <button key={p.id} type="button" onClick={() => setPlan(p.id)} className="rounded-2xl border-2 border-border bg-card p-5 text-left transition hover:border-primary">
                <span className="flex items-center justify-between font-bold">{p.label}{p.note && <span className="rounded-full bg-accent px-2 py-0.5 text-xs">{p.note}</span>}</span>
                <span className="mt-1 block text-3xl font-extrabold">{p.price}<span className="text-base font-normal text-muted-foreground">{p.period}</span></span>
                <span className="mt-3 block rounded-full bg-primary py-2 text-center font-bold text-primary-foreground">Assinar</span>
              </button>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground">Cancele quando quiser: o selo continua até o fim do período pago.</p>
        </>
      )}
      {error && <p className="text-center text-sm text-destructive">{error}</p>}
    </main>
  );
}
