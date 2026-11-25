import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { computeAchievements, type AchievementProgress } from "@/lib/achievements";

const fmt = (iso: string) => new Date(iso.length === 10 ? `${iso}T12:00:00` : iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

export function AchievementBadges({ userId }: { userId: string }) {
  const [list, setList] = useState<AchievementProgress[] | null>(null);
  const [open, setOpen] = useState<AchievementProgress | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const [sales, demos, searches, contacts] = await Promise.all([
        supabase.from("closed_sales").select("closed_at").eq("user_id", userId).order("closed_at", { ascending: true }).limit(100),
        supabase.from("site_demonstrations").select("created_at").eq("owner_id", userId).order("created_at", { ascending: true }).limit(1),
        supabase.from("search_usage").select("day").eq("user_id", userId).order("day", { ascending: true }).limit(1),
        supabase.from("contacted_leads").select("created_at").eq("user_id", userId).order("created_at", { ascending: true }).limit(1),
      ]);
      if (!alive) return;
      setList(computeAchievements({
        salesDates: (sales.data ?? []).map((r) => r.closed_at),
        demoDates: (demos.data ?? []).map((r) => r.created_at),
        firstSearchDay: searches.data?.[0]?.day ?? null,
        firstContactDate: contacts.data?.[0]?.created_at ?? null,
      }));
    })();
    return () => { alive = false; };
  }, [userId]);

  if (!list) return null;
  const done = list.filter((a) => a.earnedAt).length;
  return (
    <section className="mt-6" aria-label="Conquistas">
      <h2 className="font-display text-xl tracking-wide">Conquistas <span className="text-sm text-muted-foreground">{done}/{list.length}</span></h2>
      <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
        {list.map((a) => (
          <button key={a.id} type="button" onClick={() => setOpen(a)} className={`flex flex-col items-center gap-1 rounded-2xl border border-border p-3 text-center text-xs font-semibold transition hover:bg-muted ${a.earnedAt ? "bg-card" : "opacity-40 grayscale"}`}>
            <span className="text-2xl" aria-hidden>{a.emoji}</span>
            <span>{a.name}</span>
          </button>
        ))}
      </div>
      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent>
          {open && (
            <>
              <DialogHeader>
                <DialogTitle>{open.emoji} {open.name}</DialogTitle>
                <DialogDescription>{open.description}</DialogDescription>
              </DialogHeader>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Badge</dt><dd className="font-semibold">{open.name}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Conquistada em</dt><dd className="font-semibold">{open.earnedAt ? fmt(open.earnedAt) : "Ainda não"}</dd></div>
                {open.progress && !open.earnedAt && <div className="flex justify-between"><dt className="text-muted-foreground">Progresso</dt><dd className="font-semibold">{open.progress.current}/{open.progress.target}</dd></div>}
              </dl>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
