import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ProspectTabs } from "@/components/ProspectTabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { brl, downloadReceiptPdf, paymentSplit, receiptClientName, receiptPrefill, type ReceiptData } from "@/lib/receipt-pdf";
import { useFollowUp } from "@/lib/use-follow-up";
import { toast } from "sonner";

const MEMO_KEY = "receipt-memo-v1";
const EMPTY: ReceiptData = { client: "", doc: "", phone: "", business: "", total: 0, mode: "vista", pix: "", seller: "" };

export const Route = createFileRoute("/_authenticated/recibo")({
  head: () => ({ meta: [
    { title: "Recibo e Contrato — SemSite" },
    { name: "description", content: "Gere recibo e contrato em PDF para seus clientes de site." },
    { property: "og:title", content: "Recibo e Contrato — SemSite" },
    { property: "og:description", content: "Gere recibo e contrato em PDF para seus clientes de site." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  validateSearch: (s: Record<string, unknown>): { c?: string | undefined } => ({ c: typeof s['c'] === "string" ? s['c'] : undefined }),
  component: ReceiptPage,
});

function readMemo(): { pix: string; seller: string } {
  try {
    const m = JSON.parse(localStorage.getItem(MEMO_KEY) || "{}");
    return { pix: typeof m.pix === "string" ? m.pix : "", seller: typeof m.seller === "string" ? m.seller : "" };
  } catch { return { pix: "", seller: "" }; }
}

function ReceiptPage() {
  const { c } = Route.useSearch();
  const navigate = useNavigate();
  const { clients } = useFollowUp();
  const [d, setD] = useState<ReceiptData>(EMPTY);
  const [busy, setBusy] = useState(false);
  const applied = useRef("");
  const set = (k: keyof ReceiptData) => (e: React.ChangeEvent<HTMLInputElement>) => setD({ ...d, [k]: k === "total" ? Number(e.target.value.replace(",", ".")) || 0 : e.target.value });
  const s = paymentSplit(d.total, d.mode);
  const origin = c ? clients.find((client) => client.id === c) : undefined;

  // Guarda a última chave Pix e o último nome digitados para não perguntar de novo.
  useEffect(() => {
    const memo = readMemo();
    setD((prev) => ({ ...prev, pix: prev.pix || memo.pix, seller: prev.seller || memo.seller }));
  }, []);

  // Chegando pela lista de clientes, já abre com o que a gente sabe do cliente.
  useEffect(() => {
    if (!c || !origin || applied.current === c) return;
    applied.current = c;
    const memo = readMemo();
    setD({ ...receiptPrefill(origin), pix: memo.pix, seller: memo.seller });
  }, [c, origin]);

  const field = (k: keyof ReceiptData, label: string, ph = "") => (
    <div className="space-y-1"><Label htmlFor={k}>{label}</Label><Input id={k} placeholder={ph} inputMode={k === "total" ? "decimal" : undefined} value={k === "total" ? (d.total ? String(d.total) : "") : (d[k] as string)} onChange={set(k)} /></div>
  );
  async function gen() {
    if (!receiptClientName(d) || d.total <= 0) { toast.error("Preencha o nome do cliente e o valor."); return; }
    setBusy(true);
    try {
      await downloadReceiptPdf(d);
      try { localStorage.setItem(MEMO_KEY, JSON.stringify({ pix: d.pix, seller: d.seller })); } catch { /* Storage blocked. */ }
      toast.success("PDF baixado!");
    } catch { toast.error("Não deu para gerar o PDF."); } finally { setBusy(false); }
  }
  return (
    <div className="min-h-screen bg-background">
      <ProspectTabs active="receipt" />
      <main className="mx-auto max-w-xl space-y-4 p-4">
        <h1 className="font-display text-4xl tracking-wide">Recibo e <span className="text-gradient-primary">Contrato</span></h1>
        <p className="text-sm text-muted-foreground">Preencha e baixe o PDF pronto para mandar ao cliente. O 1º ano de domínio já sai como bônus incluso.</p>
        {origin && <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-accent bg-accent/40 px-3 py-2 text-sm">
          <span>Preenchido a partir de <strong className="break-words">{origin.name}</strong>.</span>
          <Button variant="ghost" size="sm" onClick={() => { applied.current = ""; setD({ ...EMPTY, ...readMemo() }); navigate({ to: "/recibo", search: {} }); }}>Fazer em branco</Button>
        </div>}
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
