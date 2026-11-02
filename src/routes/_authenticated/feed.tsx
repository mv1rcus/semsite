import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus } from "lucide-react";
import { ProspectTabs } from "@/components/ProspectTabs";
import { PostFeed } from "@/components/PostFeed";

export const Route = createFileRoute("/_authenticated/feed")({
  head: () => ({ meta: [{ title: "Feed — SemSite" }, { name: "description", content: "Publique fotos, vídeos e novidades no SemSite." }, { property: "og:title", content: "Feed — SemSite" }, { property: "og:description", content: "Publicações da comunidade SemSite." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" }] }),
  component: Feed,
});

function Feed() {
  const [tab, setTab] = useState<"all" | "following">("all");
  return (
    <main className="relative min-h-screen px-4 pb-24">
      <ProspectTabs active="feed" />
      <section className="mx-auto mt-4 max-w-2xl">
        <h1 className="sr-only">Feed</h1>
        <div className="sticky top-[var(--app-bar-h,0px)] z-10 mb-3 flex rounded-2xl border border-border bg-card/90 backdrop-blur">
          {([["all", "Para você"], ["following", "Seguindo"]] as const).map(([k, l]) => (
            <button key={k} type="button" onClick={() => setTab(k)} className={`flex-1 py-3 text-center ${tab === k ? "font-bold" : "text-muted-foreground hover:bg-muted"}`}>
              <span className={`inline-block pb-2 ${tab === k ? "border-b-4 border-primary" : ""}`}>{l}</span>
            </button>
          ))}
        </div>
        <PostFeed key={tab} followingOnly={tab === "following"} />
      </section>
      <button type="button" aria-label="Nova publicação" onClick={() => { const f = document.getElementById("compor"); f?.scrollIntoView({ behavior: "smooth", block: "center" }); f?.querySelector("textarea")?.focus(); }}
        className="fixed bottom-6 right-6 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105">
        <Plus className="size-7" />
      </button>
    </main>
  );
}
