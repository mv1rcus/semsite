import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ProspectTabs } from "@/components/ProspectTabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { brl, downloadReceiptPdf, paymentSplit, type ReceiptData } from "@/lib/receipt-pdf";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/recibo")({
  head: () => ({ meta: [
    { title: "Recibo e Contrato — SemSite" },
    { name: "description", content: "Gere recibo e contrato em PDF para seus clientes de site." },
    { property: "og:title", content: "Recibo e Contrato — SemSite" },
    { property: "og:description", content: "Gere recibo e contrato em PDF para seus clientes de site." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: ReceiptPage,
});

function ReceiptPage() {
  const [d, setD] = useState<ReceiptData>({ client: "", doc: "", phone: "", business: "", total: 0, mode: "vista", pix: "", seller: "" });
  const [busy, setBusy] = useState(false);
  const set = (k: keyof ReceiptData) => (e: React.ChangeEvent<HTMLInputElement>) => setD({ ...d, [k]: k === "total" ? Number(e.target.value.replace(",", ".")) || 0 : e.target.value });
  const s = paymentSplit(d.total, d.mode);
  const field = (k: keyof ReceiptData, label: string, ph = "") => (
    <div className="space-y-1"><Label htmlFor={k}>{label}</Label><Input id={k} placeholder={ph} inputMode={k === "total" ? "decimal" : undefined} onChange={set(k)} /></div>
  );
  async function gen() {
    if (!d.client.trim() || d.total <= 0) { toast.error("Preencha o nome do cliente e o valor."); return; }
    setBusy(true);
    try { await downloadReceiptPdf(d); toast.success("PDF baixado!"); } catch { toast.error("Não deu para gerar o PDF."); } finally { setBusy(false); }
  }
  return (
    <div className="min-h-screen bg-background">
      <ProspectTabs active="receipt" />
      <main className="mx-auto max-w-xl space-y-4 p-4">
        <h1 className="font-display text-4xl tracking-wide">Recibo e Contrato</h1>
        <p className="text-sm text-muted-foreground">Preencha e baixe o PDF pronto para mandar ao cliente. O 1º ano de domínio já sai como bônus incluso.</p>
        <div className="space-y-3 rounded-2xl border border-border bg-card p-4">
          {field("client", "Nome do cliente *", "Ex: João da Silva")}
          {field("doc", "CPF ou CNPJ")}
          {field("phone", "Telefone")}
          {field("business", "Nome da empresa", "Ex: Padaria do João")}
          {field("total", "Valor total do site (R$) *", "Ex: 700")}
          <div className="space-y-1">
            <Label>Forma de pagamento</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button type="button" variant={d.mode === "vista" ? "default" : "outline"} onClick={() => setD({ ...d, mode: "vista" })}>À vista (Pix)</Button>
              <Button type="button" variant={d.mode === "metade" ? "default" : "outline"} onClick={() => setD({ ...d, mode: "metade" })}>50% + 50%</Button>
            </div>
            {d.total > 0 && <p className="text-sm text-muted-foreground">{d.mode === "vista" ? `Pago agora: ${brl(s.now)}` : `Entrada ${brl(s.now)} • Na entrega ${brl(s.later)}`}</p>}
          </div>
          {field("pix", "Sua chave Pix")}
          {field("seller", "Seu nome (para assinatura)", "Ex: Marcus")}
          <Button className="w-full" size="lg" disabled={busy} onClick={gen}>{busy ? "Gerando..." : "Baixar PDF"}</Button>
        </div>
      </main>
    </div>
  );
}
