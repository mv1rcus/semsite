import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Lock, Search, MonitorSmartphone, MessageCircle, Eye, Star, FileText, X } from "lucide-react";
import logo from "@/assets/semsite-mark.png";
import presentation from "@/assets/semsite-apresentacao.mp4.asset.json";
import barber from "@/assets/demo-barber.jpg";
import dentist from "@/assets/demo-dentist.jpg";
import pizza from "@/assets/demo-pizzeria.jpg";
import beauty from "@/assets/demo-beauty.jpg";
import services from "@/assets/demo-services.jpg";
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

        <section className="login-wave relative flex flex-col items-center justify-center gap-6 overflow-hidden rounded-3xl border border-border p-4 text-center sm:p-8">
          <div className="space-y-2">
            <p className="text-sm font-bold">Conheça o SemSite</p>
            <p className="text-xs text-muted-foreground">Dê o play e descubra como encontrar seus próximos clientes.</p>
          </div>
          <video src={presentation.url} controls playsInline preload="metadata" aria-label="Vídeo de apresentação do SemSite" className="aspect-video w-full rounded-lg object-contain" />
        </section>
      </div>

      <section className="mx-auto mt-10 grid max-w-6xl grid-cols-3 gap-3 text-center">
        {[["+60", "ramos de negócio"], ["1 clique", "site de demonstração"], ["100%", "WhatsApp de celular"]].map(([n, l]) => (
          <div key={l} className="login-card rounded-2xl p-4">
            <p className="font-display text-3xl text-primary sm:text-5xl">{n}</p>
            <p className="text-[0.7rem] text-muted-foreground sm:text-sm">{l}</p>
          </div>
        ))}
      </section>

      <FanShowcase />

      <section className="mx-auto mt-14 max-w-6xl">
        <p className="text-[0.7rem] font-bold tracking-[0.25em] text-primary">/ COMO FUNCIONA</p>
        <h2 className="mt-2 font-display text-5xl leading-none">3 passos pro <span className="text-primary">próximo cliente.</span></h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            [Search, "1. Busque", "Escolha a cidade e o ramo. O SemSite mostra só quem ainda não tem site."],
            [MonitorSmartphone, "2. Demonstre", "Envie um site pronto com a cara do cliente antes mesmo dele pedir."],
            [MessageCircle, "3. Feche", "Mensagem pronta e roteiro de vendas pra responder qualquer dúvida."],
          ].map(([Icon, t, d]) => {
            const I = Icon as typeof Search;
            return (
              <div key={t as string} className="login-card rounded-2xl p-6">
                <span className="grid size-11 place-items-center rounded-xl bg-primary/15 text-primary"><I className="size-5" /></span>
                <h3 className="mt-4 font-display text-3xl">{t as string}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d as string}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-6xl">
        <p className="text-[0.7rem] font-bold tracking-[0.25em] text-primary">/ DIFERENCIAIS</p>
        <h2 className="mt-2 font-display text-5xl leading-none">Tudo pra você <span className="text-primary">vender mais.</span></h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            [Star, "Demonstrações de impacto", "Visual próprio por ramo, fotos do segmento e avaliações reais do Google."],
            [Eye, "Saiba quem abriu", "Veja na hora se o cliente entrou no link que você enviou."],
            [FileText, "Roteiro de vendas", "Dor do cliente, respostas pras objeções e mensagem pronta."],
            [MessageCircle, "Painel de clientes", "Etapas, lembretes de retorno e gráficos dos seus resultados."],
          ].map(([Icon, t, d]) => {
            const I = Icon as typeof Search;
            return (
              <div key={t as string} className="login-card flex gap-4 rounded-2xl p-5">
                <I className="mt-1 size-5 shrink-0 text-primary" />
                <div><h3 className="font-bold">{t as string}</h3><p className="text-sm text-muted-foreground">{d as string}</p></div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="login-wave mx-auto mt-14 mb-6 max-w-6xl rounded-3xl border border-border p-8 text-center">
        <h2 className="font-display text-5xl leading-none">Seu próximo cliente <span className="text-primary">já está esperando.</span></h2>
        <p className="mt-3 text-sm text-muted-foreground">Entre com o Google e comece a prospectar agora.</p>
        <button type="button" disabled={loading} onClick={signIn} className="login-cta mx-auto mt-6 flex items-center gap-3 rounded-2xl px-6 py-3 font-bold disabled:opacity-60">
          {loading ? "Entrando…" : "Começar agora com Google"} <ArrowRight className="size-5" />
        </button>
      </section>
    </main>
  );
}

const FAN = [
  { name: "Barbearia", img: barber, slug: "bigodonbarbeariaebardemo" },
  { name: "Dentista", img: dentist, slug: "draadeliaaraujoodontologiaespecializadademo" },
  { name: "Pizzaria", img: pizza, slug: "serranapizzariaerestaurantedemo" },
  { name: "Clínica de Estética", img: beauty, slug: "silstudiosfashiondemo" },
  { name: "Serviços", img: services, slug: "mastervidrosvidracariaemuberlandiademo" },
];

/** Ramos que também têm demonstração pronta, além dos 5 em destaque. */
const MORE_SECTORS = [
  "Ótica", "Pet Shop", "Advogado", "Academia", "Confeitaria", "Marmitaria",
  "Espetinho", "Cílios", "Depilação", "Climatização", "Pintor", "Gesseiro",
  "Auto Escola", "Moto Peças", "Açaí", "Eletricista",
];

function FanShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(2);
  const [preview, setPreview] = useState<(typeof FAN)[number] | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { setOpen(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!preview) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [preview]);
  return (
    <section className="mx-auto mt-14 max-w-6xl overflow-hidden">
      <p className="text-[0.7rem] font-bold tracking-[0.25em] text-primary">/ CATÁLOGO DE DEMONSTRAÇÕES</p>
      <h2 className="mt-2 font-display text-5xl leading-none">Sites prontos dos ramos <span className="text-primary">que mais vendem.</span></h2>
      <p className="mt-2 text-sm text-muted-foreground">Estes 5 são só uma amostra — o catálogo tem mais de 60 ramos prontos. Toque em um modelo para destacar e veja a prévia.</p>
      <div ref={ref} className="relative mx-auto mt-6 h-[340px] w-full sm:h-[440px]">
        {FAN.map((d, i) => {
          const off = i - active;
          const sel = off === 0;
          const style = {
            transform: open
              ? `translateX(calc(-50% + ${off} * min(17vw, 170px))) translateY(${sel ? -14 : Math.abs(off) * 22}px) rotate(${off * 9}deg) scale(${sel ? 1.08 : 0.86})`
              : "translateX(-50%) translateY(40px) rotate(0deg) scale(0.86)",
            transitionDelay: open ? "0ms" : `${Math.abs(i - 2) * 80}ms`,
            zIndex: 20 - Math.abs(off),
            opacity: open ? (Math.abs(off) > 2 ? 0 : 1) : 0.6,
          };
          return (
            <div key={d.slug} style={style} onClick={() => setActive(i)} role="button" tabIndex={0} aria-label={`Destacar ${d.name}`}
              className={`absolute left-1/2 top-6 w-[42vw] max-w-[230px] cursor-pointer origin-bottom overflow-hidden rounded-2xl border bg-card shadow-2xl transition-all duration-500 ease-out ${sel ? "border-primary" : "border-border"}`}>
              <img src={d.img} alt={`Demonstração de ${d.name}`} loading="lazy" className="aspect-[3/4] w-full object-cover" />
              {sel && (
                <div className="absolute inset-x-0 top-0 flex justify-center bg-gradient-to-b from-background/90 to-transparent p-2 pb-8">
                  <button type="button" onClick={(e) => { e.stopPropagation(); setPreview(d); }} className="login-cta rounded-full px-4 py-1.5 text-xs font-bold">Acessar prévia</button>
                </div>
              )}
              <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 to-transparent p-2 pt-6 text-center text-xs font-bold sm:text-sm">{d.name}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        {MORE_SECTORS.map((s) => (
          <span key={s} className="rounded-full border border-border bg-card px-3 py-1 text-[0.7rem] font-semibold text-muted-foreground">{s}</span>
        ))}
        <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[0.7rem] font-bold text-primary">+40 outros ramos</span>
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">Não viu o seu? Qualquer outro ramo também sai pronto em 1 clique.</p>
      {preview && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur" role="dialog" aria-label={`Prévia ${preview.name}`}>
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <p className="font-display text-2xl">{preview.name}</p>
            <button type="button" onClick={() => setPreview(null)} aria-label="Fechar prévia" className="rounded-full border border-border p-2"><X className="size-5" /></button>
          </div>
          <iframe title={`Prévia ${preview.name}`} src={`/${preview.slug}`} className="w-full flex-1 bg-card" />
        </div>
      )}
    </section>
  );
}
