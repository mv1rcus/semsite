import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { Check, Clock, Infinity as InfinityIcon, Loader2, MessageSquareText, PanelsTopLeft, ShieldCheck, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { VerifiedPanel } from "@/components/VerifiedPanel";
import { supabase } from "@/integrations/supabase/client";
import { getStripe, getStripeEnvironment } from "@/lib/stripe";
import { createVerifiedCheckout, createVerifiedPortal, getMyPurchaseInfo, refundMyPurchase, type PurchaseInfo } from "@/lib/payments.functions";
import { VERIFIED_PLANS, type VerifiedPriceId } from "@/lib/verified-plans";
import { useVerified } from "@/lib/use-verified";

export const Route = createFileRoute("/_authenticated/verificado")({
  validateSearch: (s: Record<string, unknown>): { pago?: string | undefined } => ({ pago: typeof s['pago'] === "string" ? s['pago'] : undefined }),
  head: () => ({ meta: [{ title: "Obter verificado — SemSite" }, { name: "description", content: "Ative o Verificado do SemSite: selo no perfil, buscas sem limite, demonstrações, mensagem personalizada e análise." }, { property: "og:title", content: "Obter verificado — SemSite" }, { property: "og:description", content: "Selo verificado e acesso completo ao SemSite a partir de R$ 8,99 por mês." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" }] }),
  component: Verificado,
});

/** O que a pessoa ganha e o que ela deixa de ter sem o selo. */
const COMPARISON = [
  { free: "5 buscas de clientes por dia", paid: "Buscas sem limite nenhum" },
  { free: "Nenhum site de demonstração", paid: "Demonstração pronta em minutos" },
  { free: "Mensagem travada no padrão", paid: "Mensagem escrita do seu jeito" },
  { free: "Análise comercial bloqueada", paid: "Análise do negócio liberada" },
  { free: "Perfil igual a todos", paid: "Selo verificado no seu nome" },
];

const VANTAGENS = [
  { icon: InfinityIcon, title: "Buscar sem parar", text: "Cidade nova, categoria nova, quantas vezes você quiser. O teto de 5 buscas por dia vai embora." },
  { icon: PanelsTopLeft, title: "Mostrar em vez de prometer", text: "Monte um site de demonstração do cliente e mande o link antes de falar de preço. É assim que se fecha." },
  { icon: MessageSquareText, title: "Mensagem com a sua cara", text: "Escolha entre sugestões, escreva do seu jeito e mande sem parecer mensagem pronta." },
  { icon: Sparkles, title: "Saber o que falar", text: "A análise mostra o que falta no negócio e sugere a abordagem certa pra cada segmento." },
  { icon: ShieldCheck, title: "Confiança antes do sim", text: "O selo aparece do lado do seu nome no perfil, no feed e nas mensagens." },
];

const DUVIDAS = [
  { q: "Quando o selo aparece?", a: "Alguns segundos depois do pagamento confirmado. Você não precisa fazer nada: o selo entra sozinho e tudo é liberado na hora." },
  { q: "Tem cobrança automática?", a: "Não. Pagamento único de R$ 8,99 por mês (ou R$ 69,90 no plano anual). Quando o período termina, o selo sai sozinho e nada é debitado. Para continuar, é só pagar de novo." },
  { q: "Preciso de cartão?", a: "Não. Pague no Pix, débito, crédito, Apple Pay ou Google Pay." },
  { q: "Consigo pagar no Pix?", a: "Sim, nos dois planos: 1 mês por R$ 8,99 ou 1 ano por R$ 69,90." },
  { q: "Posso pedir reembolso?", a: "Pode, até 7 dias depois de pagar. Se você ainda não usou o selo (nenhuma demonstração ou busca paga), o botão \"Pedir reembolso\" nesta página devolve na hora e o selo sai. Se já usou, escreva para contatosemsite@gmail.com e a gente analisa o seu caso." },
  { q: "E se o pagamento falhar?", a: "Nada é cobrado e você pode tentar de novo com outra forma de pagamento, como o Pix." },
];

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
  const chosen = VERIFIED_PLANS.find(p => p.id === plan);
  const [error, setError] = useState("");
  const [sub, setSub] = useState<{ status: string; current_period_end: string | null; cancel_at_period_end: boolean } | null>(null);
  const [status, setStatus] = useState<{ verified: boolean; source?: string; expires_at?: string | null } | null>(null);
  const [waiting, setWaiting] = useState(!!pago);

  useEffect(() => {
    let env: "sandbox" | "live";
    try { env = getStripeEnvironment(); } catch { return; }
    supabase.from("subscriptions").select("status,current_period_end,cancel_at_period_end").eq("environment", env).order("created_at", { ascending: false }).limit(1).maybeSingle().then(({ data }) => setSub(data));
    supabase.rpc("verified_status").then(({ data }) => setStatus(data as { verified: boolean; source?: string; expires_at?: string | null } | null));
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

  const [purchase, setPurchase] = useState<PurchaseInfo | null>(null);
  useEffect(() => {
    if (status?.source !== "one_time") { setPurchase(null); return; }
    let env: "sandbox" | "live";
    try { env = getStripeEnvironment(); } catch { return; }
    getMyPurchaseInfo({ data: { environment: env } }).then(r => setPurchase(r.info)).catch(() => setPurchase(null));
  }, [status?.source]);
  const [refunding, setRefunding] = useState(false);
  const [refundMsg, setRefundMsg] = useState("");
  async function requestRefund(reason: string, details: string) {
    setRefundMsg("");
    setRefunding(true);
    try {
      const r = await refundMyPurchase({ data: { environment: getStripeEnvironment(), reason, details } });
      if (r.ok) { setRefundMsg("Reembolso pedido. O valor volta para a sua forma de pagamento em alguns dias (no Pix, costuma ser mais rápido). Seu selo foi removido."); setTimeout(() => window.location.replace("/verificado"), 4000); }
      else setRefundMsg(r.error);
    } catch { setRefundMsg("Não consegui processar agora. Tente de novo ou escreva para contatosemsite@gmail.com."); }
    setRefunding(false);
  }

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
    <main className="mx-auto max-w-2xl space-y-5 px-4 py-6">
      <TestBanner />
      <div className="text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10"><VerifiedBadge size={36} /></div>
        <h1 className="mt-3 font-display text-5xl tracking-wide">SemSite <span className="text-gradient-primary">Verificado</span></h1>
        <p className="mx-auto mt-2 max-w-md text-lg">O seu próximo cliente não aparece sozinho.<br />O Verificado tira o limite da sua busca e libera tudo o que fecha venda.</p>
      </div>
      {loading || waiting ? (
        <div className="flex flex-col items-center gap-2 py-10 text-muted-foreground"><Loader2 className="size-6 animate-spin" />{waiting && "Confirmando seu pagamento…"}</div>
      ) : verified ? (
        <VerifiedPanel status={status} sub={sub} purchase={purchase} refunding={refunding} refundMsg={refundMsg} onRefund={requestRefund} onPortal={openPortal} />
      ) : plan ? (
        <div className="space-y-3">
          <Button variant="ghost" onClick={() => { setPlan(null); setError(""); }}>← Trocar plano</Button>
          <p className="flex flex-wrap items-center justify-center gap-2 rounded-xl bg-accent p-3 text-center text-sm font-semibold">
            Pague com {chosen?.methods ?? "cartão"}
            <span className="rounded-full border border-border bg-background px-2 py-0.5 text-xs font-normal">{chosen?.label} · {chosen?.price}</span>
          </p>
          <div className="overflow-hidden app-card">
            <EmbeddedCheckoutProvider key={plan} stripe={getStripe()} options={{ fetchClientSecret }}><EmbeddedCheckout /></EmbeddedCheckoutProvider>
          </div>
        </div>
      ) : (
        <>
          <section className="app-card p-5">
            <h2 className="font-display text-3xl tracking-wide">O que muda no seu dia</h2>
            <p className="mt-1 text-sm text-muted-foreground">É a mesma tela, com o limite fora e as portas abertas.</p>
            <ul className="mt-4 space-y-2">
              {COMPARISON.map(c => (
                <li key={c.paid} className="grid gap-1 rounded-xl border border-border bg-muted/30 p-3 sm:grid-cols-2 sm:items-center">
                  <span className="flex items-center gap-2 text-sm text-foreground/70"><X className="size-4 shrink-0 text-destructive" />{c.free}</span>
                  <span className="flex items-center gap-2 font-semibold"><Check className="size-4 shrink-0 text-primary" />{c.paid}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="app-card p-5">
            <h2 className="font-display text-3xl tracking-wide">Por que vale os R$ 8,99</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {VANTAGENS.map((v, i) => (
                <div key={v.title} className={`rounded-xl border border-border bg-background/60 p-4 ${i === VANTAGENS.length - 1 ? "sm:col-span-2" : ""}`}>
                  <v.icon className="size-6 text-primary" />
                  <p className="mt-2 font-bold">{v.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{v.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl bg-accent p-4 text-center">
              <p className="font-display text-3xl tracking-wide">Um site fechado paga o ano inteiro</p>
              <p className="mt-1 text-sm">São menos de 27 centavos por dia pra buscar, demonstrar e falar certo com quem ainda não tem site.</p>
            </div>
          </section>

          <section className="app-card p-5">
            <h2 className="font-display text-3xl tracking-wide">Escolha o seu plano</h2>
            <p className="mt-1 text-sm text-muted-foreground">Pague no Pix, débito, crédito, Apple Pay ou Google Pay.</p>
            {sub && !verified && <p className="mt-1 text-sm text-muted-foreground">Sua última assinatura não está ativa{sub.status === "past_due" || sub.status === "unpaid" ? " porque o pagamento falhou" : ""}. Pague de novo para voltar o selo.</p>}
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {VERIFIED_PLANS.map(p => (
                <button key={p.id} type="button" onClick={() => setPlan(p.id)} className="app-card app-card-hover p-4 text-left">
                  <span className="flex items-center justify-between gap-1 font-bold">{p.label}{p.note && <span className="rounded-full bg-accent px-2 py-0.5 text-xs">{p.note}</span>}</span>
                  <span className="mt-1 block text-2xl font-extrabold">{p.price}<span className="text-sm font-normal text-muted-foreground"> {p.period}</span></span>
                  <span className="mt-2 block text-sm text-muted-foreground">{p.detail}</span>
                  <span className="mt-1 block text-xs font-semibold text-primary">Aceita: {p.methods}</span>
                  <span className="mt-3 block rounded-full bg-primary py-2 text-center font-bold text-primary-foreground">{p.months ? "Pagar agora" : "Assinar agora"}</span>
                </button>
              ))}
            </div>
            <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Check className="size-4 shrink-0 text-primary" />Pagamento único por mês: sem débito automático e sem renovação surpresa.</li>
              <li className="flex items-center gap-2"><Clock className="size-4 shrink-0 text-primary" />O selo entra sozinho, segundos depois do pagamento.</li>
              <li className="flex items-center gap-2"><ShieldCheck className="size-4 shrink-0 text-primary" />Pix, débito, crédito, Apple Pay ou Google Pay, em ambiente seguro.</li>
            </ul>
          </section>

          <section className="app-card p-5">
            <h2 className="font-display text-3xl tracking-wide">Perguntas rápidas</h2>
            <div className="mt-3 space-y-2">
              {DUVIDAS.map(d => (
                <details key={d.q} className="rounded-xl border border-border p-3">
                  <summary className="cursor-pointer font-semibold">{d.q}</summary>
                  <p className="mt-2 text-sm text-muted-foreground">{d.a}</p>
                </details>
              ))}
            </div>
            <Button className="mt-4 w-full rounded-full py-6 font-display text-2xl tracking-wide" onClick={() => setPlan("verificado_mensal_avista")}>Quero o Verificado</Button>
          </section>
        </>
      )}
      {error && <p className="text-center text-sm text-destructive">{error}</p>}
    </main>
  );
              }
