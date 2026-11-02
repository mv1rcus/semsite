import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { OceanScene } from "@/components/OceanScene";
import { Button } from "@/components/ui/button";
import logo from "@/assets/semsite-mark.png";
import { lovable } from "@/integrations/lovable";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SemSite — Entrar" },
      { name: "description", content: "Encontre negócios sem site e ofereça seu trabalho pelo WhatsApp." },
      { property: "og:title", content: "SemSite — Encontre negócios sem site e ofereça seu trabalho pelo WhatsApp" },
      { property: "og:description", content: "Encontre negócios sem site e ofereça seu trabalho pelo WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { if (data.session) navigate({ to: "/buscar" }); });
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) navigate({ to: "/buscar" });
    });
    return () => data.subscription.unsubscribe();
  }, [navigate]);

  async function signIn() {
    setLoading(true); setError("");
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (result.error) { setError("Não foi possível entrar com o Google. Tente novamente."); setLoading(false); return; }
    if (result.redirected) return;
    navigate({ to: "/buscar" });
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-5 py-12">
      <OceanScene />
      <h1>
        <span className="flex items-center gap-3"><img src={logo} alt="" width={416} height={410} className="h-16 w-auto sm:h-20" /><span className="font-display text-7xl leading-none tracking-wide sm:text-8xl">Sem<span className="text-primary">Site</span></span></span>
      </h1>
      <p className="mt-4 max-w-md text-center text-muted-foreground">
        Negócios sem site, prontos pra receber sua proposta no WhatsApp.
      </p>
      <Button size="lg" variant="outline" disabled={loading} onClick={signIn} className="mt-10 w-full max-w-sm gap-3 bg-card text-base font-bold">
        <svg viewBox="0 0 48 48" className="size-5" aria-hidden><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>
        {loading ? "Entrando…" : "Entrar com Google"}
      </Button>
      {error && <p role="alert" className="mt-3 text-sm text-destructive">{error}</p>}
    </main>
  );
}
