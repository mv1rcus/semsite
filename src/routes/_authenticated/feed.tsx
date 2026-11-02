import { createFileRoute } from "@tanstack/react-router";
import { ProspectTabs } from "@/components/ProspectTabs";
import { PostFeed } from "@/components/PostFeed";

export const Route = createFileRoute("/_authenticated/feed")({
  head: () => ({ meta: [{ title: "Feed — SemSite" }, { name: "description", content: "Publique fotos, vídeos e novidades no SemSite." }, { property: "og:title", content: "Feed — SemSite" }, { property: "og:description", content: "Publicações da comunidade SemSite." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" }] }),
  component: Feed,
});

function Feed() {
  return (
    <main className="relative min-h-screen px-4 pb-16">
      <ProspectTabs active="feed" />
      <section className="mx-auto mt-8 max-w-2xl">
        <h1 className="text-5xl">Feed</h1>
        <p className="mb-5 mt-1 text-muted-foreground">Compartilhe fotos, vídeos e novidades com a comunidade.</p>
        <PostFeed />
      </section>
    </main>
  );
}
