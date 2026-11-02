import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { UserRound } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { supabase } from "@/integrations/supabase/client";

type Row = { username: string; display_name: string; avatar_url: string; bio: string; verified: boolean };
export type FollowKind = "followers" | "following";

export function FollowListDialog({ username, kind, onClose }: { username: string; kind: FollowKind | null; onClose: () => void }) {
  const [rows, setRows] = useState<Row[] | null>(null);
  useEffect(() => {
    if (!kind) return;
    setRows(null);
    supabase.rpc("follow_list", { uname: username, kind }).then(({ data }) => setRows((data as Row[] | null) ?? []));
  }, [username, kind]);

  return (
    <Dialog open={!!kind} onOpenChange={o => { if (!o) onClose(); }}>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{kind === "following" ? "Seguindo" : "Seguidores"}</DialogTitle></DialogHeader>
        {rows === null && <p className="text-sm text-muted-foreground">Carregando…</p>}
        {rows?.length === 0 && <p className="text-sm text-muted-foreground">{kind === "following" ? "Ainda não segue ninguém." : "Ainda sem seguidores."}</p>}
        <div className="space-y-1">
          {rows?.map(r => (
            <Link key={r.username} to="/u/$username" params={{ username: r.username }} onClick={onClose} className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted">
              {r.avatar_url ? <img src={r.avatar_url} alt="" width={40} height={40} referrerPolicy="no-referrer" className="size-10 rounded-full object-cover" /> : <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary"><UserRound className="size-5" /></div>}
              <div className="min-w-0">
                <p className="flex items-center gap-1 truncate font-semibold">{r.display_name || "Sem nome"}{r.verified && <VerifiedBadge size={15} />}</p>
                <p className="truncate text-sm text-muted-foreground">@{r.username}</p>
              </div>
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
