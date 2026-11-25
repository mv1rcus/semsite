import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import { Copy, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PIX_KEY_TYPES, PIX_SELLER_KEY, buildPixPayload, parseAmount, type PixKeyType } from "@/lib/pix";

type Seller = { keyType: PixKeyType; key: string; name: string; city: string };
const EMPTY: Seller = { keyType: "phone", key: "", name: "", city: "" };

/** Cobrança por Pix: QR e copia-e-cola gerados no navegador com a chave do vendedor. Nada é enviado a servidor. */
export function PixChargeDialog({ open, onOpenChange, clientName }: { open: boolean; onOpenChange: (o: boolean) => void; clientName: string }) {
  const [seller, setSeller] = useState<Seller>(EMPTY);
  const [amountText, setAmountText] = useState("");
  const [qr, setQr] = useState("");
  const [notice, setNotice] = useState("");
  useEffect(() => {
    try { const raw = localStorage.getItem(PIX_SELLER_KEY); if (raw) setSeller({ ...EMPTY, ...JSON.parse(raw) }); } catch { /* Storage is optional. */ }
  }, []);
  const amount = parseAmount(amountText);
  const result = useMemo(() => amount === "invalid" ? ({ ok: false, error: "Valor inválido." } as const) : buildPixPayload({ ...seller, amount }), [seller, amount]);
  useEffect(() => {
    let alive = true;
    if (!result.ok) { setQr(""); return; }
    QRCode.toDataURL(result.payload, { margin: 1, width: 280, errorCorrectionLevel: "M" }).then((url) => { if (alive) setQr(url); }).catch(() => { if (alive) setQr(""); });
    return () => { alive = false; };
  }, [result]);
  useEffect(() => {
    if (!result.ok) return;
    try { localStorage.setItem(PIX_SELLER_KEY, JSON.stringify(seller)); } catch { /* Remembering is optional. */ }
  }, [seller, result]);
  const hint = PIX_KEY_TYPES.find((t) => t.value === seller.keyType)?.hint;
  async function copy() {
    if (!result.ok) return;
    try { await navigator.clipboard.writeText(result.payload); setNotice("Pix copia e cola copiado!"); } catch { setNotice("Selecione o código abaixo e copie."); }
  }
  return <Dialog open={open} onOpenChange={(o) => { onOpenChange(o); if (!o) setNotice(""); }}>
    <DialogContent className="max-h-[90dvh] max-w-[calc(100%-2rem)] overflow-y-auto sm:max-w-lg">
      <DialogHeader><DialogTitle>Cobrar {clientName} por Pix</DialogTitle><DialogDescription>O dinheiro cai direto na sua conta. Sem intermediário, sem taxa do SemSite. A chave fica salva só neste navegador.</DialogDescription></DialogHeader>
      <div className="grid gap-3 text-sm">
        <label>Tipo da sua chave Pix<select aria-label="Tipo da chave Pix" className="mt-1 h-10 w-full rounded-md border bg-background px-3" value={seller.keyType} onChange={(e) => setSeller({ ...seller, keyType: e.target.value as PixKeyType })}>{PIX_KEY_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}</select></label>
        <label>Sua chave Pix<Input aria-label="Chave Pix" className="mt-1" placeholder={hint} value={seller.key} onChange={(e) => setSeller({ ...seller, key: e.target.value })} /></label>
        <div className="grid gap-3 sm:grid-cols-2">
          <label>Nome do recebedor<Input aria-label="Nome do recebedor" className="mt-1" maxLength={25} value={seller.name} onChange={(e) => setSeller({ ...seller, name: e.target.value })} /></label>
          <label>Cidade<Input aria-label="Cidade do recebedor" className="mt-1" maxLength={15} value={seller.city} onChange={(e) => setSeller({ ...seller, city: e.target.value })} /></label>
        </div>
        <label>Valor em R$ (opcional)<Input aria-label="Valor da cobrança" inputMode="decimal" className="mt-1" placeholder="Ex.: 350,00. Vazio = o cliente digita" value={amountText} onChange={(e) => setAmountText(e.target.value)} /></label>
      </div>
      {result.ok ? <div className="mt-2 space-y-3 text-center">
        {qr ? <img src={qr} alt="QR Code Pix" className="mx-auto size-56 rounded-md bg-white p-2" /> : <QrCode className="mx-auto size-10 text-muted-foreground" />}
        <Input aria-label="Pix copia e cola" readOnly value={result.payload} onFocus={(e) => e.currentTarget.select()} />
        <Button type="button" className="w-full" onClick={copy}><Copy />Copiar Pix copia e cola</Button>
      </div> : <p className="text-xs text-muted-foreground">{seller.key || seller.name || seller.city ? result.error : "Preencha sua chave, nome e cidade para gerar o QR."}</p>}
      {notice && <p role="status" className="text-sm text-primary">{notice}</p>}
    </DialogContent>
  </Dialog>;
}
