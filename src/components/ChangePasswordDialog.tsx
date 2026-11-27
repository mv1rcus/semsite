import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

function friendlyChange(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("weak") || m.includes("pwned") || m.includes("easy to guess")) return "Essa senha é fraca ou já vazou em algum site. Escolha outra.";
  if (m.includes("same") || m.includes("different from the old")) return "A nova senha precisa ser diferente da atual.";
  if (m.includes("rate limit") || m.includes("too many") || m.includes("security purposes")) return "Muitas tentativas. Espere um minuto e tente de novo.";
  return "Não foi possível trocar a senha agora. Tente novamente.";
}

/** Troca de senha com a conta logada: confere a senha atual, grava a nova e encerra as outras sessões. */
export function ChangePasswordDialog({ email, open, onOpenChange }: { email: string; open: boolean; onOpenChange: (open: boolean) => void }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function change(value: boolean) {
    if (busy) return;
    if (!value) { setCurrent(""); setNext(""); setError(""); setDone(false); }
    onOpenChange(value);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    if (!current) { setError("Digite sua senha atual."); return; }
    if (next.length < 8) { setError("A nova senha precisa ter pelo menos 8 caracteres."); return; }
    if (next === current) { setError("A nova senha precisa ser diferente da atual."); return; }
    setBusy(true); setError("");
    try {
      const check = await supabase.auth.signInWithPassword({ email, password: current });
      if (check.error) { setError(check.error.message.toLowerCase().includes("invalid login") ? "Senha atual incorreta." : friendlyChange(check.error.message)); return; }
      const { error: err } = await supabase.auth.updateUser({ password: next });
      if (err) { setError(friendlyChange(err.message)); return; }
      // Mantém este aparelho conectado e derruba todos os outros.
      await supabase.auth.signOut({ scope: "others" });
      setCurrent(""); setNext(""); setDone(true);
    } finally { setBusy(false); }
  }

  return (
    <Dialog open={open} onOpenChange={change}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Alterar senha</DialogTitle>
          <DialogDescription>{done ? "Senha trocada. Os outros aparelhos conectados foram desconectados." : "Digite a senha atual e escolha uma nova. Ao salvar, os outros aparelhos são desconectados."}</DialogDescription>
        </DialogHeader>
        {done ? (
          <Button type="button" onClick={() => change(false)}>Fechar</Button>
        ) : (
          <form onSubmit={submit} className="grid gap-3">
            <label className="text-sm font-semibold" htmlFor="senha-atual">Senha atual</label>
            <Input id="senha-atual" type="password" autoComplete="current-password" required value={current} onChange={(e) => setCurrent(e.target.value)} />
            <label className="text-sm font-semibold" htmlFor="senha-nova">Nova senha</label>
            <Input id="senha-nova" type="password" autoComplete="new-password" required minLength={8} value={next} onChange={(e) => setNext(e.target.value)} />
            <p className="text-xs text-muted-foreground">Mínimo de 8 caracteres. Senhas fracas ou vazadas são recusadas.</p>
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
            <Button type="submit" disabled={busy}>{busy ? "Salvando…" : "Salvar nova senha"}</Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
