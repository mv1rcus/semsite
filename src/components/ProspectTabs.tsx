import { Link } from "@tanstack/react-router";
import { Search, PanelsTopLeft, Users } from "lucide-react";
import { Button } from "./ui/button";
export function ProspectTabs({ active }: { active: "search" | "demos" | "clients" }) {
  return <nav aria-label="Áreas" className="mx-auto mt-6 flex max-w-6xl flex-wrap gap-2 border-b pb-3">
    <Button asChild variant={active === "search" ? "secondary" : "ghost"}><Link to="/buscar"><Search />Caçar clientes</Link></Button>
    <Button asChild variant={active === "demos" ? "secondary" : "ghost"}><Link to="/demonstracoes"><PanelsTopLeft />Demonstrações</Link></Button>
    <Button asChild variant={active === "clients" ? "secondary" : "ghost"}><Link to="/clientes"><Users />Clientes</Link></Button>
  </nav>;
}