import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus } from "lucide-react";
import { ProspectTabs } from "@/components/ProspectTabs";
import { PostFeed } from "@/components/PostFeed";
import { TrendingTags, WhoToFollow } from "@/components/FeedSide";

export const Route = createFileRoute("/_authenticated/feed")({
  head: () => ({ meta: [{ title: "Feed — SemSite" }, { name: "description", content: "Publique fotos, vídeos e novidades no SemSite." }, { property: "og:title", content: "Feed — SemSite" }, { property: "og:description", content: "Publicações da comunidade SemSite." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" }] }),
  component: Feed,
});

function Feed() {
  const [tab, setTab] = useState<"all" | "following">("all");
  const [compose, setCompose] = useState(false);
  const [refresh, setRefresh] = useState(0);
  return (
    <main className="relative min-h-screen px-4 pb-24">
      <ProspectTabs active="feed" />
      <div className="mx-auto mt-4 grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section className="mx-auto w-full max-w-2xl">
          <h1 className="sr-only">Feed</h1>
          <div className="sticky top-[var(--app-bar-h,0px)] z-10 mb-3 flex rounded-2xl border border-border bg-card/90 backdrop-blur">
            {([["all", "Para você"], ["following", "Seguindo"]] as const).map(([k, l]) => (
              <button key={k} type="button" onClick={() => setTab(k)} className={`flex-1 py-3 text-center ${tab === k ? "font-bold" : "text-muted-foreground hover:bg-muted"}`}>
                <span className={`inline-block pb-2 ${tab === k ? "border-b-4 border-primary" : ""}`}>{l}</span>
              </button>
            ))}
          </div>
          <PostFeed key={tab} followingOnly={tab === "following"} composerOpen={compose} onPosted={() => { setCompose(false); setRefresh(r => r + 1); }} />
        </section>
        <aside className="mx-auto w-full max-w-2xl space-y-4 lg:max-w-none">
          <TrendingTags key={refresh} />
          <WhoToFollow key={refresh} />
        </aside>
      </div>
      <button type="button" aria-label="Nova publicação" onClick={() => { setCompose(c => !c); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        className="fixed bottom-6 right-6 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105">
        <Plus className={`size-7 transition-transform ${compose ? "rotate-45" : ""}`} />
      </button>
    </main>
  );
}
