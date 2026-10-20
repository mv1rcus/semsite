import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Letters3D } from "@/components/Letters3D";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const OceanScene = lazy(() => import("@/components/OceanScene").then((m) => ({ default: m.OceanScene })));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Caça Clientes — Entrar" },
      { name: "description", content: "Encontre negócios sem site e ofereça seu trabalho pelo WhatsApp." },
      { property: "og:title", content: "Caça Clientes" },
      { property: "og:description", content: "Encontre negócios sem site e ofereça seu trabalho pelo WhatsApp." },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/buscar" });
    });
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMsg("E-mail ou senha incorretos.");
      else navigate({ to: "/buscar" });
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      setMsg(error ? error.message : "Conta criada! Confirme pelo link enviado ao seu e-mail.");
    }
    setLoading(false);
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-5 py-12">
      {mounted && (
        <Suspense fallback={null}>
          <OceanScene />
        </Suspense>
      )}
      <h1 className="text-center text-5xl font-extrabold tracking-tight sm:text-7xl">
        <Letters3D text="Caça" className="text-gradient" />
        <br />
        <Letters3D text="Clientes" />
      </h1>
      <p className="mt-4 max-w-md text-center text-muted-foreground">
        Negócios sem site, prontos pra receber sua proposta no WhatsApp.
      </p>
      <form onSubmit={submit} className="glass mt-10 w-full max-w-sm space-y-3 rounded-2xl p-6">
        <Input type="email" placeholder="Seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
        <Button type="submit" className="w-full" disabled={loading}>
          {mode === "in" ? "Entrar" : "Criar minha conta"}
        </Button>
        {msg && <p className="text-center text-sm text-muted-foreground">{msg}</p>}
        <button type="button" onClick={() => setMode(mode === "in" ? "up" : "in")} className="w-full text-center text-xs text-muted-foreground hover:text-primary">
          {mode === "in" ? "Primeiro acesso? Criar conta" : "Já tenho conta"}
        </button>
      </form>
    </main>
  );
}
