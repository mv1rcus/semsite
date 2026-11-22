import { createFileRoute, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { demoQuery } from "@/lib/demo-query";
import { DemoSite } from "@/components/DemoSite";
export const Route = createFileRoute("/demo/$id")({
  loader: async ({ params, context }) => { if (!/^[0-9a-f-]{36}$/i.test(params.id)) throw notFound(); const demo = await context.queryClient.ensureQueryData(demoQuery(params.id)); if (!demo) throw notFound(); return demo; },
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.name || "Site"} — Demonstração de site` }, { name: "description", content: loaderData?.description || "Proposta visual de site para um negócio local." }, { property: "og:title", content: `${loaderData?.name || "Site"} — Demonstração` }, { property: "og:description", content: loaderData?.description || "Proposta visual de site para um negócio local." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  notFoundComponent: () => <main className="p-8 text-center"><h1 className="text-2xl font-bold">Demonstração não encontrada</h1><p className="mt-3 text-muted-foreground">Confira o link que você recebeu.</p></main>,
  component: SharedDemo,
});
function SharedDemo() { const { id } = Route.useParams(); const { data } = useSuspenseQuery(demoQuery(id)); return data ? <DemoSite demo={data} /> : null; }
