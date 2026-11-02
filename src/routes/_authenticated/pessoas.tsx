import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AtSign, MapPin, UserRound } from "lucide-react";
import { ProspectTabs } from "@/components/ProspectTabs";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/pessoas")({
  head: () => ({ meta: [{ title: "Pessoas — SemSite" }, { name: "description", content: "Encontre outros perfis do SemSite pelo @." }, { property: "og:title", content: "Pessoas — SemSite" }, { property: "og:description", content: "Busque perfis pelo @ do usuário." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" }] }),
  component: Pessoas,
});

type P = { username: string; display_name: string; city: string; bio: string; avatar_url: string };

function Pessoas() {
  const [q, setQ] = useState("");
  const [list, setList] = useState<P[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const term = q.trim().replace(/^@/, "");
    if (!term) { setList([]); return; }
    setLoading(true);
    const t = setTimeout(async () => {
      const { data } = await supabase.rpc("search_profiles", { q: term });
      setList((data as P[]) ?? []); setLoading(false);
    }, 300);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <main className="relative min-h-screen px-4 pb-16">
      <ProspectTabs active="people" />
      <section className="mx-auto mt-8 max-w-2xl">
        <h1 className="text-5xl">Encontrar <span className="text-primary">pessoas</span></h1>
        <p className="mt-1 text-muted-foreground">Digite o @ ou o nome de alguém.</p>
        <div className="relative mt-6">
          <AtSign className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input autoFocus autoCapitalize="none" value={q} onChange={e => setQ(e.target.value)} placeholder="usuario" className="h-12 pl-10 text-base" />
        </div>
        <div className="mt-5 space-y-3">
          {loading && <p className="text-sm text-muted-foreground">Buscando…</p>}
          {!loading && q.trim() && list.length === 0 && <p className="text-sm text-muted-foreground">Ninguém encontrado com esse @.</p>}
          {list.map(p => (
            <Link key={p.username} to="/u/$username" params={{ username: p.username }} className="glass flex gap-4 rounded-xl p-4 transition hover:border-primary">
              {p.avatar_url
                ? <img src={p.avatar_url} alt="" width={56} height={56} referrerPolicy="no-referrer" className="size-14 shrink-0 rounded-full object-cover" />
                : <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><UserRound /></div>}
              <div className="min-w-0">
                <p className="truncate font-semibold">{p.display_name || "Sem nome"}</p>
                <p className="text-sm text-primary">@{p.username}</p>
                {p.city && <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="size-3.5" />{p.city}</p>}
                {p.bio && <p className="mt-1 text-sm">{p.bio}</p>}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
