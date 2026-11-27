import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/redefinir-senha")({
  head: () => ({ meta: [{ title: "Nova senha — SemSite" }, { name: "robots", content: "noindex" }] }),
  component: RedefinirSenha,
});

function RedefinirSenha() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => { if (event === "PASSWORD_RECOVERY") setReady(true); });
    // O link do e-mail já traz a sessão de recuperação; se ela existir, libera o formulário.
    supabase.auth.getSession().then(({ data: s }) => { if (s.session && window.location.hash.includes("type=recovery")) setReady(true); });
    return () => data.subscription.unsubscribe();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    if (password.length < 8) { setError("A senha precisa ter pelo menos 8 caracteres."); return; }
    setBusy(true); setError("");
    const { error: err } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (err) { setError(err.message.toLowerCase().includes("weak") || err.message.toLowerCase().includes("pwned") ? "Essa senha é fraca ou já vazou em algum site. Escolha outra." : "Não foi possível trocar a senha. Peça um novo link."); return; }
    setDone(true);
    setTimeout(() => navigate({ to: "/buscar" }), 1500);
  }

  return (
    <main className="login-page grid min-h-screen place-items-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-background p-6">
        <p className="font-display text-3xl tracking-wide">SEM<span className="text-primary">SITE</span></p>
        <h1 className="mt-4 font-display text-2xl">Criar nova senha</h1>
        {done ? <p role="status" className="mt-3 text-sm">Senha trocada. Entrando…</p> : !ready ? (
          <p className="mt-3 text-sm text-muted-foreground">Abra esta página pelo link que enviamos para o seu e-mail. Se o link expirou, <Link to="/" className="underline">volte ao início</Link> e peça outro em "Esqueci a senha".</p>
        ) : (
          <form onSubmit={submit}>
            <label className="mt-4 block text-sm font-semibold" htmlFor="nova-senha">Nova senha</label>
            <input id="nova-senha" type="password" autoComplete="new-password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-xl border border-border bg-transparent px-3 py-3 text-base" />
            <p className="mt-1 text-xs text-muted-foreground">Mínimo de 8 caracteres.</p>
            {error && <p role="alert" className="mt-3 text-sm text-primary">{error}</p>}
            <button type="submit" disabled={busy} className="login-cta mt-5 w-full rounded-xl px-4 py-3 font-bold disabled:opacity-50">{busy ? "Salvando…" : "Salvar nova senha"}</button>
          </form>
        )}
      </div>
    </main>
  );
}
