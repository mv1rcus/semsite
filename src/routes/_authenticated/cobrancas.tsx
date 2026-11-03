import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useState } from "react";
import { ProspectTabs } from "@/components/ProspectTabs";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { listCharges, refundCharge, type ChargeRow } from "@/lib/charges.functions";
import { getStripeEnvironment } from "@/lib/stripe";

export const Route = createFileRoute("/_authenticated/cobrancas")({
  head: () => ({ meta: [{ title: "Cobranças — SemSite" }, { name: "description", content: "Painel privado de cobranças e reembolsos do SemSite." }, { property: "og:title", content: "Cobranças — SemSite" }, { property: "og:description", content: "Painel privado de cobranças do SemSite." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" }] }),
  component: Cobrancas,
});

const LABEL: Record<ChargeRow["status"], string> = { pago: "Pago", reembolsado: "Reembolsado", parcial: "Reembolso parcial", falhou: "Falhou", pendente: "Pendente" };
const METHOD: Record<string, string> = { card: "Cartão", pix: "Pix", boleto: "Boleto" };
const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function Cobrancas() {
  const list = useServerFn(listCharges);
  const refund = useServerFn(refundCharge);
  const [rows, setRows] = useState<ChargeRow[] | null>(null);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState("");
  const load = useCallback(async () => {
    try {
      const r = await list({ data: { environment: getStripeEnvironment() } });
      if ("error" in r) { setMsg(r.error); setRows([]); } else setRows(r.charges);
    } catch (e) { setMsg(e instanceof Error ? e.message : "Erro ao carregar."); setRows([]); }
  }, [list]);
  useEffect(() => { load(); }, [load]);
  async function doRefund(id: string) {
    setBusy(id);
    const r = await refund({ data: { environment: getStripeEnvironment(), chargeId: id } });
    setBusy("");
    setMsg("error" in r ? `Não deu para reembolsar: ${r.error}` : "Reembolso feito! O dinheiro volta para quem pagou.");
    load();
  }
  const total = rows?.filter(r => r.status === "pago").reduce((a, r) => a + r.amount, 0) ?? 0;
  return (
    <>
      <ProspectTabs active="profile" />
      <main className="mx-auto max-w-3xl px-4 py-6">
        <h1 className="font-display text-4xl tracking-wide">Cobranças</h1>
        {msg && <p role="status" className="mt-3 rounded-lg border bg-card p-3 text-sm">{msg}</p>}
        {rows === null ? <p className="mt-4 text-muted-foreground">Carregando…</p> : rows.length === 0 ? <p className="mt-4 text-muted-foreground">Nenhuma cobrança ainda.</p> : (
          <>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border bg-card p-4"><p className="text-sm text-muted-foreground">Cobranças</p><p className="font-display text-4xl text-primary">{rows.length}</p></div>
              <div className="rounded-xl border bg-card p-4"><p className="text-sm text-muted-foreground">Recebido</p><p className="font-display text-4xl">{brl(total)}</p></div>
            </div>
            <ul className="mt-4 flex flex-col gap-2">
              {rows.map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-3 rounded-xl border bg-card p-3">
                  <div className="min-w-0">
                    <p className="font-bold">{brl(r.amount)} · <span className={r.status === "pago" ? "text-primary" : "text-muted-foreground"}>{LABEL[r.status]}</span></p>
                    <p className="break-all text-sm">{r.email ?? "sem e-mail"}</p>
                    <p className="text-sm text-muted-foreground">{new Date(r.created).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: "short", timeStyle: "short" })} · {METHOD[r.method ?? ""] ?? r.method ?? "—"}</p>
                  </div>
                  {r.status === "pago" && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild><Button variant="destructive" size="sm" disabled={busy === r.id}>{busy === r.id ? "Devolvendo…" : "Reembolsar"}</Button></AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader><AlertDialogTitle>Devolver {brl(r.amount)}?</AlertDialogTitle><AlertDialogDescription>O dinheiro volta para {r.email ?? "quem pagou"} e o selo é retirado. Isso não pode ser desfeito.</AlertDialogDescription></AlertDialogHeader>
                        <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={() => doRefund(r.id)}>Sim, reembolsar</AlertDialogAction></AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </main>
    </>
  );
}
