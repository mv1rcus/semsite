import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ExternalLink, PanelsTopLeft } from "lucide-react";
import { getPortfolio } from "@/lib/portfolio.functions";
import { demonstrationSlug, demonstrationCode, DEMO_SLUG_RE } from "@/lib/demonstrations";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/portfolio/$username")({
  loader: async ({ params }) => {
    const portfolio = await getPortfolio({ data: { username: params.username } });
    if (!portfolio) throw notFound();
    return portfolio;
  },
  head: ({ loaderData }) => ({ meta: [
    { title: loaderData ? `Portfólio de ${loaderData.displayName} — SemSite` : "Portfólio — SemSite" },
    { name: "description", content: "Sites de demonstração criados com o SemSite." },
  ] }),
  component: PortfolioPage,
  notFoundComponent: () => (
    <main className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold">Portfólio não encontrado</h1>
      <p className="mt-2 text-muted-foreground">Este endereço não existe ou foi digitado errado.</p>
      <Button asChild variant="outline" className="mt-6"><Link to="/">Ir para o início</Link></Button>
    </main>
  ),
});

function PortfolioPage() {
  const portfolio = Route.useLoaderData();
  const origin = typeof window === "undefined" ? "https://semsite.lovable.app" : window.location.origin;
  const hrefFor = (demo: { id: string; name: string; slug: string | null }) =>
    demo.slug && DEMO_SLUG_RE.test(demo.slug) ? `/${demo.slug}` : `/site/${demonstrationSlug(demo.name)}/${demonstrationCode(demo.id)}`;
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <header className="border-b pb-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Portfólio SemSite</p>
        <h1 className="mt-2 text-3xl font-bold">{portfolio.displayName}</h1>
        <p className="mt-1 text-sm text-muted-foreground">@{portfolio.username} · {portfolio.demos.length} {portfolio.demos.length === 1 ? "demonstração" : "demonstrações"}</p>
      </header>
      {!portfolio.portfolioReady && <p className="mt-6 text-sm text-muted-foreground">O portfólio está sendo ativado; volte em instantes.</p>}
      {portfolio.portfolioReady && portfolio.demos.length === 0 && <p className="mt-6 text-muted-foreground">Nenhuma demonstração publicada ainda.</p>}
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {portfolio.demos.map((demo) => (
          <li key={demo.id} className="rounded-lg border p-5">
            <PanelsTopLeft className="size-5 text-primary" />
            <h2 className="mt-3 text-lg font-semibold">{demo.name}</h2>
            {demo.category && <p className="mt-1 text-sm text-muted-foreground">{demo.category}</p>}
            <Button asChild variant="outline" size="sm" className="mt-4">
              <a href={hrefFor(demo)} aria-label={`Abrir demonstração de ${demo.name}`}><ExternalLink />Ver site de demonstração</a>
            </Button>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-center text-xs text-muted-foreground">Feito com <a className="underline" href={origin}>SemSite</a></p>
    </main>
  );
}
