import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { notificationsSeenAt } from "@/lib/social-unread";
import { supabase } from "@/integrations/supabase/client";
import { Search, PanelsTopLeft, Users, ChartNoAxesCombined, MessageSquareText, Sparkles, LogOut, UserRound, Newspaper, Bell, Send, Menu, UserSearch } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import mascot from "@/assets/semsite-mascote-acenando.png";

const TABS = [
  { key: "search", to: "/buscar", label: "Buscar clientes", icon: Search },
  { key: "demos", to: "/demonstracoes", label: "Demonstrações", icon: PanelsTopLeft },
  { key: "clients", to: "/clientes", label: "Clientes", icon: Users },
  { key: "charts", to: "/graficos", label: "Gráficos", icon: ChartNoAxesCombined },
  { key: "message", to: "/mensagem", label: "Mensagem", icon: MessageSquareText },
  { key: "analysis", to: "/analise", label: "Análise", icon: Sparkles },
] as const;

export type ProspectTabKey = (typeof TABS)[number]["key"] | "people" | "profile" | "feed" | "notifications" | "dm";

export function ProspectTabs({ active }: { active: ProspectTabKey }) {
  const navigate = useNavigate();
  const barRef = useRef<HTMLElement>(null);
  const [unread, setUnread] = useState({ n: 0, dm: 0 });
  useEffect(() => {
    let alive = true;
    const load = async () => {
      const [{ data: n }, { data: t }] = await Promise.all([supabase.rpc("my_notifications"), supabase.rpc("dm_threads")]);
      if (!alive) return;
      const seen = notificationsSeenAt();
      setUnread({ n: (n ?? []).filter(x => new Date(x.created_at).getTime() > seen).length, dm: (t ?? []).reduce((a, x) => a + Number(x.unread), 0) });
    };
    load();
    const ch = supabase.channel(`unread-${Math.random().toString(36).slice(2)}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "direct_messages" }, load).subscribe();
    window.addEventListener("semsite-unread", load);
    return () => { alive = false; supabase.removeChannel(ch); window.removeEventListener("semsite-unread", load); };
  }, []);
  // A bolinha do topo mostra a foto do usuário; se ele não tem foto, mostra o bonequinho.
  const [avatar, setAvatar] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  useEffect(() => {
    let alive = true;
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      if (alive) setIsOwner(user.id === "60254e77-1a4c-4be8-8b77-3d29a537785f");
      const { data } = await supabase.from("profiles").select("avatar_url").eq("id", user.id).maybeSingle();
      if (alive) setAvatar(data?.avatar_url ?? "");
    };
    load();
    window.addEventListener("semsite-profile", load);
    return () => { alive = false; window.removeEventListener("semsite-profile", load); };
  }, []);
  const dot = (k: number) => k > 0 ? <span className="absolute -right-1 -top-1 min-w-4 rounded-full bg-primary px-1 text-center text-[10px] font-bold leading-4 text-primary-foreground">{k > 9 ? "9+" : k}</span> : null;
  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  }
  const [open, setOpen] = useState(false);

  // A barra fica fixa no topo: o espaço dela é reservado no corpo da página
  // para nenhum conteúdo ficar escondido embaixo dela.
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const apply = () => {
      const h = `${el.offsetHeight}px`;
      document.body.style.paddingTop = h;
      document.documentElement.style.setProperty("--app-bar-h", h);
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    window.addEventListener("resize", apply);
    return () => { ro.disconnect(); window.removeEventListener("resize", apply); document.body.style.paddingTop = ""; document.documentElement.style.removeProperty("--app-bar-h"); };
  }, []);

  const toolActive = TABS.find(t => t.key === active);
  const TOP = [
    { key: "search", to: "/buscar", label: "Buscar clientes", icon: Search, badge: 0 },
    { key: "feed", to: "/feed", label: "Feed", icon: Newspaper, badge: 0 },
    { key: "people", to: "/pessoas", label: "Pesquisar pessoas", icon: UserSearch, badge: 0 },
    { key: "notifications", to: "/notificacoes", label: "Notificações", icon: Bell, badge: unread.n },
    { key: "dm", to: "/mensagens", label: "Mensagens", icon: Send, badge: unread.dm },
  ] as const;
  const item = (isActive: boolean) => `flex w-full items-center gap-4 rounded-full px-4 py-3 text-lg ${isActive ? "font-bold text-primary" : "text-foreground hover:bg-muted"}`;
  return (
    <header ref={barRef} className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between gap-3 py-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button type="button" aria-label="Abrir menu" className="flex items-center gap-2.5">
                <img src={mascot} alt="Mascote SemSite" width={1024} height={1024} className="h-9 w-9 shrink-0 rounded-full bg-accent object-cover ring-1 ring-border" />
                <Menu className="size-5 text-muted-foreground" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 overflow-y-auto p-4">
              <SheetTitle className="mb-4 font-display text-3xl tracking-wide">Sem<span className="text-primary">Site</span></SheetTitle>
              <nav className="flex flex-col gap-1" aria-label="Menu">
                <Link to="/perfil" onClick={() => setOpen(false)} className={item(active === "profile")}><UserRound className="size-6" />Meu perfil</Link>
                <Link to="/verificado" onClick={() => setOpen(false)} className={item(false)}><VerifiedBadge size={24} />Obter verificado</Link>
                {isOwner && <Link to="/contas" onClick={() => setOpen(false)} className={item(false)}><Users className="size-6" />Contas do site</Link>}
                {TABS.map(({ key, to, label, icon: Icon }) => (
                  <Link key={key} to={to} onClick={() => setOpen(false)} aria-current={active === key ? "page" : undefined} className={item(active === key)}><Icon className="size-6" />{label}</Link>
                ))}
                <div className="my-2 border-t border-border" />
                <button type="button" onClick={signOut} className={item(false)}><LogOut className="size-6" />Sair</button>
              </nav>
            </SheetContent>
          </Sheet>
          <span className="truncate font-display text-2xl tracking-wide">{toolActive ? toolActive.label : "SemSite"}</span>
          <Link to="/perfil" aria-label="Meu perfil" className={`flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full ${active === "profile" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
            {avatar ? <img src={avatar} alt="" referrerPolicy="no-referrer" className="size-full object-cover" /> : <UserRound className="size-5" />}
          </Link>
        </div>
        <nav aria-label="Navegação" className="flex items-center justify-around border-t border-border/50 py-1">
          {TOP.map(({ key, to, label, icon: Icon, badge }) => (
            <Link key={key} to={to} aria-label={label} title={label} className={`relative flex size-11 items-center justify-center rounded-full transition-colors ${active === key ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"}`}>
              <Icon className="size-6" strokeWidth={active === key ? 2.6 : 2} />{dot(badge)}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
