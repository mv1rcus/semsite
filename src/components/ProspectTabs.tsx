import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { notificationsSeenAt } from "@/lib/social-unread";
import { supabase } from "@/integrations/supabase/client";
import { Search, PanelsTopLeft, Users, ChartNoAxesCombined, MessageSquareText, Sparkles, LogOut, UserRound, Newspaper, Bell, Send } from "lucide-react";
import logoMark from "@/assets/semsite-mark.png";

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
  const dot = (k: number) => k > 0 ? <span className="absolute -right-1 -top-1 min-w-4 rounded-full bg-primary px-1 text-center text-[10px] font-bold leading-4 text-primary-foreground">{k > 9 ? "9+" : k}</span> : null;
  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  }
  return (
    <header className="mx-auto mt-6 max-w-6xl">
      <div className="flex items-center justify-between gap-3">
      <Link to="/buscar" aria-label="Início" className="flex w-fit items-center gap-2">
        <img src={logoMark} alt="" width={420} height={420} loading="lazy" className="h-9 w-auto" />
        <span className="hidden font-display text-2xl tracking-wide sm:inline">SemSite</span>
      </Link>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <Link to="/notificacoes" aria-label="Notificações" title="Notificações" className={`relative ${active === "notifications" ? "tab-pill tab-pill-active" : "tab-pill"}`}><Bell size={16} />{dot(unread.n)}</Link>
        <Link to="/mensagens" aria-label="Mensagens" title="Mensagens" className={`relative ${active === "dm" ? "tab-pill tab-pill-active" : "tab-pill"}`}><Send size={16} />{dot(unread.dm)}</Link>
        <Link to="/feed" aria-label="Feed" title="Feed" className={active === "feed" ? "tab-pill tab-pill-active" : "tab-pill"}><Newspaper size={16} /></Link>
        <Link to="/pessoas" aria-label="Pesquisar pessoas" title="Pesquisar pessoas" className={active === "people" ? "tab-pill tab-pill-active" : "tab-pill"}><Search size={16} /></Link>
        <Link to="/perfil" aria-label="Meu perfil" title="Meu perfil" className={active === "profile" ? "tab-pill tab-pill-active" : "tab-pill"}><UserRound size={16} /></Link>
        <button type="button" onClick={signOut} aria-label="Sair" title="Sair" className="tab-pill"><LogOut size={16} /></button>
      </div>
      </div>
      <nav aria-label="Áreas" className="no-scrollbar -mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-1">
        {TABS.map(({ key, to, label, icon: Icon }) => {
          const isActive = active === key;
          return (
            <Link
              key={key}
              to={to}
              aria-current={isActive ? "page" : undefined}
              className={isActive ? "tab-pill tab-pill-active" : "tab-pill"}
            >
              <Icon size={16} strokeWidth={isActive ? 2.4 : 2} />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-3 border-b border-border/50" />
    </header>
  );
}
