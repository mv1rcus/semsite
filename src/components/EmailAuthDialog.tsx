import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

type Mode = "entrar" | "criar" | "esqueci";
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function friendly(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login")) return "E-mail ou senha incorretos.";
  if (m.includes("email not confirmed")) return "Confirme seu e-mail pelo link que enviamos antes de entrar.";
  if (m.includes("already registered") || m.includes("already been registered")) return "Esse e-mail já tem conta. Entre ou use \"Esqueci a senha\".";
  if (m.includes("weak") || m.includes("pwned") || m.includes("easy to guess")) return "Essa senha é fraca ou já vazou em algum site. Escolha outra.";
  if (m.includes("rate limit") || m.includes("too many") || m.includes("security purposes")) return "Muitas tentativas. Espere um minuto e tente de novo.";
  return "Não foi possível agora. Tente novamente.";
}

export function EmailAuthDialog({ onClose, onSignedIn }: { onClose: () => void; onSignedIn: () => void }) {
  const [mode, setMode] = useState<Mode>("entrar");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  function go(m: Mode) { setMode(m); setError(""); setInfo(""); }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setError(""); setInfo("");
    const mail = email.trim().toLowerCase();
    if (!EMAIL_RE.test(mail)) { setError("Digite um e-mail válido."); return; }
    if (mode !== "esqueci" && password.length < 8) { setError("A senha precisa ter pelo menos 8 caracteres."); return; }
    if (mode === "criar" && !accepted) { setError("Aceite os Termos de Uso e a Política de Privacidade para criar a conta."); return; }
    setBusy(true);
    try {
      if (mode === "entrar") {
        const { error: err } = await supabase.auth.signInWithPassword({ email: mail, password });
        if (err) setError(friendly(err.message)); else { try { localStorage.setItem("semsite_terms_ok", "1"); } catch { /* sem storage */ } onSignedIn(); }
      } else if (mode === "criar") {
        const { data, error: err } = await supabase.auth.signUp({ email: mail, password, options: { emailRedirectTo: window.location.origin } });
        if (err) setError(friendly(err.message));
        else if (data.session) { try { localStorage.setItem("semsite_terms_ok", "1"); } catch { /* sem storage */ } onSignedIn(); }
        else setInfo("Conta criada. Enviamos um link de confirmação para o seu e-mail. Confirme e depois entre aqui. Se não achar, olhe o spam.");
      } else {
        const { error: err } = await supabase.auth.resetPasswordForEmail(mail, { redirectTo: `${window.location.origin}/redefinir-senha` });
        if (err) setError(friendly(err.message));
        else setInfo("Se existir uma conta com esse e-mail, enviamos um link para criar uma nova senha. Olhe também o spam.");
      }
    } finally { setBusy(false); }
  }

  const title = mode === "entrar" ? "Entrar com e-mail" : mode === "criar" ? "Criar conta com e-mail" : "Esqueci a senha";
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 px-4" role="dialog" aria-modal="true" aria-labelledby="email-auth-titulo" onClick={onClose}>
      <form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-border bg-background p-6" onClick={(e) => e.stopPropagation()}>
        <h2 id="email-auth-titulo" className="font-display text-2xl">{title}</h2>
        {mode === "esqueci" && <p className="mt-2 text-sm text-muted-foreground">Digite o e-mail da sua conta e enviamos um link para criar uma nova senha.</p>}
        <label className="mt-4 block text-sm font-semibold" htmlFor="ea-email">E-mail</label>
        <input id="ea-email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-xl border border-border bg-transparent px-3 py-3 text-base" />
        {mode !== "esqueci" && (
          <>
            <label className="mt-4 block text-sm font-semibold" htmlFor="ea-senha">Senha</label>
            <input id="ea-senha" type="password" autoComplete={mode === "entrar" ? "current-password" : "new-password"} required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-xl border border-border bg-transparent px-3 py-3 text-base" />
            {mode === "criar" && <p className="mt-1 text-xs text-muted-foreground">Mínimo de 8 caracteres.</p>}
          </>
        )}
        {mode === "criar" && (
          <label className="mt-4 flex cursor-pointer items-start gap-3 text-sm">
            <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} className="mt-0.5 size-5 shrink-0 accent-[var(--primary)]" />
            <span>Li e aceito os <Link to="/termos" target="_blank" className="font-semibold underline">Termos de Uso</Link> e a <Link to="/privacidade" target="_blank" className="font-semibold underline">Política de Privacidade</Link>.</span>
          </label>
        )}
        {error && <p role="alert" className="mt-3 text-sm text-primary">{error}</p>}
        {info && <p role="status" className="mt-3 text-sm text-foreground">{info}</p>}
        <button type="submit" disabled={busy} className="login-cta mt-5 w-full rounded-xl px-4 py-3 font-bold disabled:opacity-50">{busy ? "Aguarde…" : mode === "entrar" ? "Entrar" : mode === "criar" ? "Criar conta" : "Enviar link"}</button>
        <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
          {mode === "entrar" && <><button type="button" onClick={() => go("esqueci")} className="text-left hover:text-foreground">Esqueci a senha</button><button type="button" onClick={() => go("criar")} className="text-left hover:text-foreground">Não tenho conta. Criar agora</button></>}
          {mode === "criar" && <button type="button" onClick={() => go("entrar")} className="text-left hover:text-foreground">Já tenho conta. Entrar</button>}
          {mode === "esqueci" && <button type="button" onClick={() => go("entrar")} className="text-left hover:text-foreground">Voltar</button>}
          <button type="button" onClick={onClose} className="text-left hover:text-foreground">Cancelar</button>
        </div>
      </form>
    </div>
  );
}
