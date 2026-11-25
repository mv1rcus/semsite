import { createFileRoute, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { demoQuery } from "@/lib/demo-query";
import { demonstrationId } from "@/lib/demonstrations";
import { DemoSite } from "@/components/DemoSite";
import { DemoExpired } from "@/components/DemoExpired";

export const Route = createFileRoute("/site/$slug/$code")({
  loader: async ({ params, context }) => {
    const id = demonstrationId(params.code);
    if (!id) throw notFound();
    const demo = await context.queryClient.ensureQueryData(demoQuery(id));
    if (!demo) throw notFound();
    return demo;
  },
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.name || "Site indisponível"} — Site demonstrativo` },
    { name: "description", content: loaderData?.description || "Demonstração de site para um negócio local." },
    { property: "og:title", content: `${loaderData?.name || "Site indisponível"} — Conheça o site` },
    { property: "og:description", content: loaderData?.description || "Catálogo e contato em uma proposta visual de site." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  notFoundComponent: () => <main className="p-8 text-center"><h1 className="text-2xl font-bold">Demonstração não encontrada</h1><p className="mt-3 text-muted-foreground">Confira o link que você recebeu.</p></main>,
  component: NamedDemo,
});

function NamedDemo() {
  const demo = Route.useLoaderData();
  const { data } = useSuspenseQuery(demoQuery(demo.id));
  return !data ? null : data.expired ? <DemoExpired name={data.name} /> : <DemoSite demo={data} />;
}