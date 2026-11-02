import { Link } from "@tanstack/react-router";
import { Search, PanelsTopLeft, Users, ChartNoAxesCombined, MessageSquareText, Sparkles } from "lucide-react";
import logoMark from "@/assets/semsite-mark.png";

const TABS = [
  { key: "search", to: "/buscar", label: "Buscar clientes", icon: Search },
  { key: "demos", to: "/demonstracoes", label: "Demonstrações", icon: PanelsTopLeft },
  { key: "clients", to: "/clientes", label: "Clientes", icon: Users },
  { key: "charts", to: "/graficos", label: "Gráficos", icon: ChartNoAxesCombined },
  { key: "message", to: "/mensagem", label: "Mensagem", icon: MessageSquareText },
  { key: "analysis", to: "/analise", label: "Análise", icon: Sparkles },
] as const;

export type ProspectTabKey = (typeof TABS)[number]["key"];

export function ProspectTabs({ active }: { active: ProspectTabKey }) {
  return (
    <header className="mx-auto mt-6 max-w-6xl">
      <Link to="/" aria-label="Início" className="flex w-fit items-center gap-2">
        <img src={logoMark} alt="" width={420} height={420} loading="lazy" className="h-9 w-auto" />
        <span className="font-display text-lg font-bold tracking-tight">SemSite</span>
      </Link>
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
