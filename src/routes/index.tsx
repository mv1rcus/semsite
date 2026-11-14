import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Lock, Play, Search, MessageCircle, MonitorSmartphone, X } from "lucide-react";
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

const STEPS = [
  { icon: Search, title: "Encontre", text: "Busque comércios sem site em qualquer cidade do interior." },
  { icon: MonitorSmartphone, title: "Mostre", text: "Gere um site de demonstração com o nome e o ramo do cliente." },
  { icon: MessageCircle, title: "Venda", text: "Envie a mensagem pronta no WhatsApp e acompanhe cada cliente." },
];

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [video, setVideo] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { if (data.session) navigate({ to: "/buscar" }); });
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) navigate({ to: "/buscar" });
    });
    return () => data.subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!video) return;
    setStep(0);
    const t = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 3000);
    return () => clearInterval(t);
  }, [video]);

  async function signIn() {
    setLoading(true); setError("");
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (result.error) { setError("Não foi possível entrar com o Google. Tente novamente."); setLoading(false); return; }
    if (result.redirected) return;
    navigate({ to: "/buscar" });
  }

  const Current = STEPS[step];

  return (
    <main className="login-page min-h-screen px-4 py-6 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-4 lg:min-h-[calc(100vh-3rem)] lg:grid-cols-2">
        <section className="login-card flex flex-col justify-center rounded-3xl p-7 sm:p-10">
          <div className="flex items-center gap-2">
            <img src={logo} alt="" width={416} height={410} className="h-9 w-auto" />
            <span className="font-display text-3xl tracking-wide">SEM<span className="text-primary">SITE</span></span>
          </div>
          <p className="mt-10 text-[0.7rem] font-bold tracking-[0.25em] text-primary">/ ACESSE SUA CONTA</p>
          <h1 className="mt-2 font-display text-6xl leading-[0.9] sm:text-7xl">Entre na<br /><span className="text-primary">plataforma.</span></h1>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">Encontre comércios sem site e feche novos clientes pelo WhatsApp.</p>

          <button type="button" disabled={loading} onClick={signIn} className="login-cta mt-8 flex w-full max-w-md items-center justify-between rounded-2xl py-1 pl-5 pr-1 font-bold disabled:opacity-60">
            <span className="flex items-center gap-3">
              <svg viewBox="0 0 48 48" className="size-5 rounded-full bg-foreground p-0.5" aria-hidden><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>
              {loading ? "Entrando…" : "Entrar com Google"}
            </span>
            <span className="grid size-11 place-items-center rounded-xl bg-background/30"><ArrowRight className="size-5" /></span>
          </button>
          {error && <p role="alert" className="mt-3 text-sm text-primary">{error}</p>}
          <p className="mt-6 flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.2em] text-muted-foreground"><Lock className="size-3.5 text-primary" /> AMBIENTE PROTEGIDO</p>
        </section>

        <section className="login-wave relative flex min-h-[26rem] flex-col items-center justify-center overflow-hidden rounded-3xl border border-border p-8 text-center">
          <p className="text-[0.7rem] font-bold tracking-[0.25em] text-muted-foreground">SEMSITE / PROSPECÇÃO</p>
          <h2 className="mt-3 font-display text-6xl leading-none sm:text-7xl">Bem-vindo<br /><span className="font-serif italic normal-case">de volta.</span></h2>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">Sua lista de clientes continua de onde você parou.</p>
          <button type="button" onClick={() => setVideo(true)} className="mt-8 flex flex-col items-center gap-3">
            <span className="login-play grid size-16 place-items-center rounded-full"><Play className="ml-1 size-6 fill-current" /></span>
            <span className="text-[0.7rem] font-bold tracking-[0.25em]">ASSISTA À APRESENTAÇÃO</span>
          </button>
        </section>
      </div>

      {video && (
        <div role="dialog" aria-modal="true" aria-label="Apresentação do SemSite" className="login-page fixed inset-0 z-50 grid place-items-center bg-background/90 p-4 backdrop-blur" onClick={() => setVideo(false)}>
          <div className="login-card relative aspect-video w-full max-w-3xl overflow-hidden rounded-3xl" onClick={(e) => e.stopPropagation()}>
            <button type="button" aria-label="Fechar" onClick={() => setVideo(false)} className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-background/60"><X className="size-4" /></button>
            <div key={step} className="flex h-full animate-in fade-in zoom-in-95 flex-col items-center justify-center p-6 text-center duration-700">
              <Current.icon className="size-12 text-primary" />
              <p className="mt-3 text-[0.7rem] font-bold tracking-[0.25em] text-muted-foreground">PASSO {step + 1} DE 3</p>
              <h3 className="mt-1 font-display text-6xl">{Current.title}</h3>
              <p className="mt-2 max-w-md text-muted-foreground">{Current.text}</p>
            </div>
            <div className="absolute inset-x-6 bottom-4 flex gap-2">
              {STEPS.map((_, i) => <span key={i} className={`h-1 flex-1 rounded-full ${i <= step ? "bg-primary" : "bg-border"}`} />)}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
