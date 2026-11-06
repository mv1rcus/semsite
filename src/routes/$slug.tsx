import { createFileRoute, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { demoQuery } from "@/lib/demo-query";
import { DEMO_SLUG_RE } from "@/lib/demonstrations";
import { getDemonstrationIdBySlug } from "@/lib/demonstrations.functions";
import { DemoSite } from "@/components/DemoSite";

export const Route = createFileRoute("/$slug")({
  loader: async ({ params, context }) => {
    if (!DEMO_SLUG_RE.test(params.slug)) throw notFound();
    const id = await getDemonstrationIdBySlug({ data: { slug: params.slug } });
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
  notFoundComponent: () => <main className="p-8 text-center"><h1 className="text-2xl font-bold">Página não encontrada</h1><p className="mt-3 text-muted-foreground">Confira o link que você recebeu.</p></main>,
  component: ShortDemo,
});

function ShortDemo() {
  const demo = Route.useLoaderData();
  const { data } = useSuspenseQuery(demoQuery(demo.id));
  return data ? <DemoSite demo={data} /> : null;
}
