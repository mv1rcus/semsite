import { useState } from "react";
import { Check, Gift, Receipt, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PurchaseInfo } from "@/lib/payments.functions";

const CONTATO = "contatosemsite@gmail.com";
export const REASON_LABELS: Record<string, string> = {
  nao_precisei: "Não precisei do produto",
  nao_gostei: "Não gostei do que o SemSite entrega",
  caro: "Achei caro",
  nao_funcionou: "Algo não funcionou pra mim",
  comprei_sem_querer: "Comprei sem querer",
  outro: "Outro motivo",
};
const mailto = (subject: string, body: string) => `mailto:${CONTATO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export type VerifiedStatus = { verified: boolean; source?: string; expires_at?: string | null };
export type SubInfo = { status: string; current_period_end: string | null; cancel_at_period_end: boolean } | null;

const fmtDate = (iso: string | null | undefined) => iso ? new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" }) : "—";
const fmtMoney = (cents: number) => (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const daysLeft = (iso: string | null | undefined) => iso ? Math.max(0, Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000)) : null;

const INCLUIDO = [
  "Buscas de clientes sem limite",
  "Sites de demonstração prontos em minutos",
  "Mensagem escrita do seu jeito",
  "Análise comercial do negócio",
  "Selo verificado no perfil, no feed e nas mensagens",
];

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="flex items-start justify-between gap-4 border-b border-border/60 py-2.5 last:border-0"><dt className="text-muted-foreground">{label}</dt><dd className="text-right font-semibold">{children}</dd></div>;
}

/** Painel da assinatura para quem já é verificado: plano, validade, o que inclui e reembolso quando couber. */
export function VerifiedPanel({ status, sub, purchase, refunding, refundMsg, onRefund, onPortal }: {
  status: VerifiedStatus | null;
  sub: SubInfo;
  purchase: PurchaseInfo | null;
  refunding: boolean;
  refundMsg: string;
  onRefund: (reason: string, details: string) => void;
  onPortal: () => void;
}) {
  const [asking, setAsking] = useState(false);
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const reasonOk = !!reason && (reason !== "outro" || details.trim().length >= 3);
  const source = status?.source;
  const left = daysLeft(status?.expires_at);
  const recurring = !!sub && ["active", "trialing", "past_due", "unpaid"].includes(sub.status);
  const isGift = source === "manual";
  const isBought = source === "one_time";

  const title = isGift ? "Cortesia SemSite" : isBought ? `Verificado · ${purchase?.plan ?? "pago"}` : "Verificado · assinatura";
  const stateText = isGift ? "Permanente" : left !== null ? (left > 0 ? `Ativo, faltam ${left} ${left === 1 ? "dia" : "dias"}` : "Vence hoje") : "Ativo";

  return (
    <div className="space-y-4">
      <section className="app-card p-5">
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10">{isGift ? <Gift className="size-6 text-primary" /> : <ShieldCheck className="size-6 text-primary" />}</span>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Seu plano</p>
            <h2 className="font-display text-3xl leading-none tracking-wide">{title}</h2>
          </div>
          <span className="ml-auto shrink-0 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-primary">{stateText}</span>
        </div>

        <dl className="mt-4 text-sm">
          <Row label="Situação">Ativo</Row>
          {isGift && <Row label="Tipo">Selo permanente, cortesia do SemSite</Row>}
          {isGift && <Row label="Validade">Sem data de vencimento</Row>}
          {isBought && <Row label="Vence em">{fmtDate(status?.expires_at)}</Row>}
          {isBought && purchase && <Row label="Valor pago">{fmtMoney(purchase.amountCents)}</Row>}
          {isBought && purchase && <Row label="Pago em">{fmtDate(purchase.paidAt)}</Row>}
          {isBought && <Row label="Renovação">Não renova sozinho, sem cobrança automática</Row>}
          {!isGift && !isBought && <Row label={sub?.cancel_at_period_end ? "Selo vale até" : "Próxima cobrança"}>{fmtDate(sub?.current_period_end ?? status?.expires_at)}</Row>}
        </dl>

        {isBought && <p className="mt-3 text-sm text-muted-foreground">Quando o período acabar, o selo sai sozinho e nada é cobrado. Pra continuar, é só pagar de novo nesta página.</p>}
        {isGift && <p className="mt-3 text-sm text-muted-foreground">Você não paga nada e não precisa renovar.</p>}
        {recurring && <Button variant="outline" className="mt-3 rounded-full" onClick={onPortal}>Gerenciar ou cancelar assinatura</Button>}
      </section>

      <section className="app-card p-5">
        <h3 className="font-display text-2xl tracking-wide">O que está incluído</h3>
        <ul className="mt-3 space-y-2 text-sm">
          {INCLUIDO.map(i => <li key={i} className="flex items-center gap-2"><Check className="size-4 shrink-0 text-primary" />{i}</li>)}
        </ul>
      </section>

      {isBought && (
        <section className="app-card p-5 text-sm">
          <h3 className="flex items-center gap-2 font-display text-2xl tracking-wide"><Receipt className="size-5 text-primary" />Reembolso</h3>
          {purchase?.refundUntil ? (
            <>
              <p className="mt-2 text-muted-foreground">Ainda não usou e mudou de ideia? Você pode pedir o reembolso até {fmtDate(purchase.refundUntil)} (7 dias depois do pagamento). O valor volta pra sua forma de pagamento e o selo sai na hora. Vale uma vez por conta.</p>
              {!asking ? (
                <Button variant="outline" size="sm" className="mt-3 rounded-full" onClick={() => setAsking(true)}>Pedir reembolso</Button>
              ) : (
                <form className="mt-3 space-y-3" onSubmit={e => { e.preventDefault(); if (reasonOk && !refunding) onRefund(reason, details); }}>
                  <label className="block font-semibold">Por que você quer o reembolso?
                    <select required aria-label="Motivo do reembolso" className="mt-1 h-10 w-full rounded-md border bg-background px-3 font-normal" value={reason} onChange={e => setReason(e.target.value)}>
                      <option value="">Escolha um motivo</option>
                      {Object.entries(REASON_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
                  </label>
                  <label className="block font-semibold">{reason === "outro" ? "Conte o motivo" : "Quer contar mais? (opcional)"}
                    <textarea aria-label="Detalhes do motivo" maxLength={300} rows={3} className="mt-1 w-full rounded-md border bg-background px-3 py-2 font-normal" value={details} onChange={e => setDetails(e.target.value)} placeholder="Ajuda a gente a melhorar o SemSite" />
                  </label>
                  <p className="text-xs text-muted-foreground">Ao confirmar, o valor volta pra sua forma de pagamento e o selo sai agora. Vale uma vez por conta.</p>
                  <div className="flex gap-2">
                    <Button type="submit" size="sm" className="rounded-full" disabled={!reasonOk || refunding}>{refunding ? "Processando…" : "Confirmar reembolso"}</Button>
                    <Button type="button" variant="ghost" size="sm" className="rounded-full" disabled={refunding} onClick={() => setAsking(false)}>Voltar</Button>
                  </div>
                </form>
              )}
            </>
          ) : purchase?.usedProduct && !purchase.refundUsed ? (
            <>
            <p className="mt-2 text-muted-foreground">O reembolso automático é só para quem ainda não usou o produto. Como você já usou demonstrações ou buscas, conte o motivo por e-mail e a gente analisa o seu caso.</p>
            <a className="mt-3 inline-block rounded-full border px-4 py-1.5 text-sm font-semibold hover:bg-accent" href={mailto("Pedido de reembolso SemSite", "Motivo do pedido de reembolso:\n\n")}>Escrever para {CONTATO}</a>
            </>
          ) : purchase?.refundUsed ? (
            <p className="mt-2 text-muted-foreground">Esta conta já usou o reembolso automático. Se precisar de ajuda, escreva para contatosemsite@gmail.com.</p>
          ) : purchase ? (
            <p className="mt-2 text-muted-foreground">O prazo de 7 dias para reembolso automático já passou. Caso especial? Escreva para contatosemsite@gmail.com.</p>
          ) : (
            <p className="mt-2 text-muted-foreground">Reembolso em até 7 dias depois de pagar. Se o botão não aparecer, escreva para contatosemsite@gmail.com.</p>
          )}
          {refundMsg && <p className="mt-2 font-semibold" role="status">{refundMsg}</p>}
        </section>
      )}
    </div>
  );
}
