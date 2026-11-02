import { Link } from "@tanstack/react-router";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { useEffect, useState } from "react";
import { Hash, UserRound, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Tag = { tag: string; uses: number };
type Sugg = { id: string; username: string; display_name: string; city: string; bio: string; avatar_url: string; verified?: boolean; followers: number };

export function TrendingTags() {
  const [tags, setTags] = useState<Tag[]>([]);
  useEffect(() => {
    let alive = true;
    supabase.rpc("trending_tags").then(({ data }) => {
      if (alive) setTags(((data as { tag: string; uses: number }[] | null) ?? []).map(t => ({ tag: t.tag, uses: Number(t.uses) })));
    });
    return () => { alive = false; };
  }, []);
  if (!tags.length) return null;
  return (
    <section className="glass rounded-2xl p-4">
      <h2 className="text-lg font-bold">Assuntos do momento</h2>
      <ul className="mt-1">
        {tags.map(t => (
          <li key={t.tag}>
            <Link to="/tag/$tag" params={{ tag: t.tag }} className="flex items-center justify-between gap-3 rounded-lg px-2 py-2 transition hover:bg-muted">
              <span className="flex min-w-0 items-center gap-2 font-semibold">
                <Hash className="size-4 shrink-0 text-primary" />
                <span className="truncate">#{t.tag}</span>
              </span>
              <span className="shrink-0 text-xs text-muted-foreground">{t.uses} {t.uses === 1 ? "publicação" : "publicações"}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function WhoToFollow() {
  const [list, setList] = useState<Sugg[]>([]);
  const [busy, setBusy] = useState("");
  useEffect(() => {
    let alive = true;
    supabase.rpc("who_to_follow").then(({ data }) => {
      if (alive) setList(((data as Sugg[] | null) ?? []).map(x => ({ ...x, followers: Number(x.followers) })));
    });
    return () => { alive = false; };
  }, []);
  if (!list.length) return null;

  async function follow(s: Sugg) {
    setBusy(s.id);
    const { error } = await supabase.from("follows").insert({ following_id: s.id });
    if (!error) setList(l => l.filter(x => x.id !== s.id));
    setBusy("");
  }

  return (
    <section className="glass rounded-2xl p-4">
      <h2 className="text-lg font-bold">Quem seguir</h2>
      <ul className="mt-2 space-y-3">
        {list.map(s => (
          <li key={s.id} className="flex items-center gap-3">
            <Link to="/u/$username" params={{ username: s.username }} className="flex min-w-0 flex-1 items-center gap-3">
              {s.avatar_url
                ? <img src={s.avatar_url} alt="" width={40} height={40} referrerPolicy="no-referrer" className="size-10 shrink-0 rounded-full object-cover" />
                : <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><UserRound className="size-5" /></span>}
              <span className="min-w-0">
                <span className="flex items-center gap-1 truncate text-sm font-semibold">{s.display_name || "Sem nome"}{s.verified && <VerifiedBadge size={14} />}</span>
                <span className="block truncate text-xs text-muted-foreground">@{s.username}</span>
              </span>
            </Link>
            <button type="button" onClick={() => follow(s)} disabled={busy === s.id} aria-label={`Seguir ${s.username}`}
              className="flex shrink-0 items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground transition hover:opacity-90 disabled:opacity-50">
              <UserPlus className="size-3.5" />Seguir
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
