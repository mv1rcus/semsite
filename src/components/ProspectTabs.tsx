import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { notificationsSeenAt } from "@/lib/social-unread";
import { supabase } from "@/integrations/supabase/client";
import { Search, PanelsTopLeft, Users, ChartNoAxesCombined, MessageSquareText, Sparkles, LogOut, UserRound, Newspaper, Bell, Send, UserSearch, FileText, Zap } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { VerifiedBadge } from "@/components/VerifiedBadge";

const TABS = [
  { key: "search", to: "/buscar", label: "Buscar clientes", icon: Search },
  { key: "demos", to: "/demonstracoes", label: "Demonstrações", icon: PanelsTopLeft },
  { key: "clients", to: "/clientes", label: "Clientes", icon: Users },
  { key: "charts", to: "/graficos", label: "Gráficos", icon: ChartNoAxesCombined },
  { key: "message", to: "/mensagem", label: "Mensagem", icon: MessageSquareText },
  { key: "analysis", to: "/analise", label: "Análise", icon: Sparkles },
  { key: "receipt", to: "/recibo", label: "Recibo e Contrato", icon: FileText },
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
  const dot = (k: number) => k > 0 ? <span className="absolute -right-1 -top-1 min-w-4 rounded-full bg-primary px-1 text-center text-[10px] font-bold leading-4 text-primary-foreground ring-2 ring-background">{k > 9 ? "9+" : k}</span> : null;
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

  const item = (isActive: boolean) => `flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-base transition-colors ${isActive ? "menu-item-active" : "text-foreground hover:bg-muted"}`;
  const close = () => setOpen(false);
  const iconBtn = (isActive: boolean) => `relative flex size-9 items-center justify-center rounded-full transition-colors ${isActive ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`;
  return (
    <header ref={barRef} className="app-bar fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-2">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button type="button" aria-label="Abrir menu" className="flex shrink-0 items-center gap-2">
              <span className="brand-mark"><Zap className="size-4" /></span>
              <span className="font-display text-xl tracking-wide">SEM<span className="text-primary">SITE</span></span>
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 overflow-y-auto p-4">
            <SheetTitle className="mb-4 font-display text-3xl tracking-wide">Sem<span className="text-primary">Site</span></SheetTitle>
            <nav className="flex flex-col gap-4" aria-label="Menu">
              <div className="app-card p-2">
                <p className="px-3 pb-1 pt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Vendas</p>
                {TABS.map(({ key, to, label, icon: Icon }) => (
                  <Link key={key} to={to} onClick={close} aria-current={active === key ? "page" : undefined} className={item(active === key)}><Icon className="size-5" />{key === "message" ? "Mensagem WhatsApp" : label}</Link>
                ))}
              </div>
              <div className="app-card p-2">
                <p className="px-3 pb-1 pt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Minha conta</p>
                <Link to="/perfil" onClick={close} className={item(active === "profile")}><UserRound className="size-5" />Meu perfil</Link>
                <Link to="/feed" onClick={close} className={item(active === "feed")}><Newspaper className="size-5" />Feed</Link>
                <Link to="/pessoas" onClick={close} className={item(active === "people")}><UserSearch className="size-5" />Pesquisar pessoas</Link>
                <Link to="/verificado" onClick={close} className={item(false)}><VerifiedBadge size={20} />Obter verificado</Link>
                {isOwner && <Link to="/contas" onClick={close} className={item(false)}><Users className="size-5" />Contas do site</Link>}
                <button type="button" onClick={signOut} className={item(false)}><LogOut className="size-5" />Sair</button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex shrink-0 items-center gap-1">
          <Link to="/notificacoes" aria-label="Notificações" className={iconBtn(active === "notifications")}><Bell className="size-5" />{dot(unread.n)}</Link>
          <Link to="/mensagens" aria-label="Bate-papo" className={iconBtn(active === "dm")}><Send className="size-5" />{dot(unread.dm)}</Link>
          <Link to="/perfil" aria-label="Meu perfil" className={`ml-1 flex size-9 items-center justify-center overflow-hidden rounded-full bg-muted ring-2 transition-shadow ${active === "profile" ? "ring-primary" : "ring-primary/60"}`}>
            {avatar ? <img src={avatar} alt="" referrerPolicy="no-referrer" className="size-full object-cover" /> : <UserRound className="size-5" />}
          </Link>
        </div>
      </div>
    </header>
  );
}
