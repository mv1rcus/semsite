// ============= Full file contents =============

import { createFileRoute, Link } from "@tanstack/react-router";
import { PauseCircle, ArrowLeft } from "lucide-react";
import { ProspectTabs } from "@/components/ProspectTabs";
import { OceanScene } from "@/components/OceanScene";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/analise")({
  head: () => ({ meta: [{ title: "Análise comercial pausada — Caça Clientes" }, { name: "description", content: "A análise comercial está pausada e volta na versão Pro do Caça Clientes." }, { property: "og:title", content: "Análise comercial pausada — Caça Clientes" }, { property: "og:description", content: "Este recurso está pausado no momento." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { name: "robots", content: "noindex" }] }),
  component: PausedAnalysisPage,
});

// The full studio is kept in src/components/AnalysisStudio.tsx for the paid Pro version.
// Nothing here imports the analysis server function, so opening this page never uses AI credit.
function PausedAnalysisPage() {
  return <main className="relative min-h-screen px-4 py-8 sm:px-8">
    <OceanScene /><ProspectTabs active="search" />
    <section className="mx-auto mt-14 max-w-xl rounded-2xl border bg-card/60 p-8 text-center">
      <PauseCircle className="mx-auto size-10 text-accent" />
      <h1 className="mt-5 text-2xl font-bold">Análise comercial pausada</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Este recurso volta na versão Pro do Caça Clientes. Nada que você salvou foi perdido: clientes, demonstrações, mensagens e gráficos continuam no seu navegador.</p>
      <Button asChild size="lg" className="mt-6"><Link to="/buscar"><ArrowLeft />Voltar para a busca</Link></Button>
    </section>
  </main>;
}
