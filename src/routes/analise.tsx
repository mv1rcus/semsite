import { createFileRoute } from "@tanstack/react-router";
import { AnalysisStudio } from "@/components/AnalysisStudio";

// A análise é 100% local (src/lib/business-analysis-local.ts): nenhum código desta
// página importa a função de servidor de IA, então abrir a página nunca consome saldo.
export const Route = createFileRoute("/analise")({
  head: () => ({ meta: [{ title: "Análise comercial — SemSite" }, { name: "description", content: "Identifique oportunidades de site e monte uma abordagem comercial personalizada a partir dos dados do estabelecimento, sem uso de IA." }, { property: "og:title", content: "Análise comercial — SemSite" }, { property: "og:description", content: "Oportunidades de site e mensagem de abordagem calculadas localmente, sem custo." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { name: "robots", content: "noindex" }] }),
  component: AnalysisStudio,
});
