import { Link } from "@tanstack/react-router";
import { Search, PanelsTopLeft, Users, ChartNoAxesCombined } from "lucide-react";
import { Button } from "./ui/button";
import logoMark from "@/assets/logo-mark.png";
export function ProspectTabs({ active }: { active: "search" | "demos" | "clients" | "charts" }) {
  return <header className="mx-auto mt-6 max-w-6xl border-b pb-3">
    <Link to="/" aria-label="Início" className="mb-3 flex items-center gap-2">
      <img src={logoMark} alt="" width={412} height={420} loading="lazy" className="h-8 w-auto" />
      <span className="font-display text-lg font-bold tracking-tight">Caça Clientes</span>
    </Link>
    <nav aria-label="Áreas" className="flex flex-wrap gap-2">
      <Button asChild variant={active === "search" ? "secondary" : "ghost"}><Link to="/buscar"><Search />Caçar clientes</Link></Button>
      <Button asChild variant={active === "demos" ? "secondary" : "ghost"}><Link to="/demonstracoes"><PanelsTopLeft />Demonstrações</Link></Button>
      <Button asChild variant={active === "clients" ? "secondary" : "ghost"}><Link to="/clientes"><Users />Clientes</Link></Button>
      <Button asChild variant={active === "charts" ? "secondary" : "ghost"}><Link to="/graficos"><ChartNoAxesCombined />Gráficos</Link></Button>
    </nav>
  </header>;
}
