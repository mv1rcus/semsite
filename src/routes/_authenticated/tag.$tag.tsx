import { createFileRoute } from "@tanstack/react-router";
import { Hash } from "lucide-react";
import { ProspectTabs } from "@/components/ProspectTabs";
import { PostFeed } from "@/components/PostFeed";

export const Route = createFileRoute("/_authenticated/tag/$tag")({
  head: ({ params }) => {
    const t = params.tag ?? "";
    return { meta: [{ title: `#${t} — SemSite` }, { name: "description", content: `Publicações do SemSite com o assunto #${t}.` }, { property: "og:title", content: `#${t} — SemSite` }, { property: "og:description", content: `Veja o que a comunidade SemSite fala sobre #${t}.` }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" }] };
  },
  component: TagPage,
});

function TagPage() {
  const { tag } = Route.useParams();
  return (
    <main className="relative min-h-screen px-4 pb-24">
      <ProspectTabs active="feed" />
      <section className="mx-auto mt-6 max-w-2xl">
        <h1 className="flex items-center gap-2 text-4xl">
          <Hash className="size-8 shrink-0 text-primary" />
          <span className="break-all">{tag}</span>
        </h1>
        <p className="mt-1 text-muted-foreground">Publicações com esse assunto.</p>
        <div className="mt-5">
          <PostFeed key={tag} tag={tag} canPost={false} />
        </div>
      </section>
    </main>
  );
}
