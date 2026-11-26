import { Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { img, type PremiumModel } from "@/lib/premium-models";

export function VitrineCard({ m, verified }: { m: PremiumModel; verified: boolean }) {
  return verified ? (
              <Link to="/vitrine/$id" params={{ id: m.id }} className="group relative block overflow-hidden rounded-2xl border border-border bg-card">
                <img src={m.cover.startsWith("/") ? m.cover : img(m.cover, 800, 560)} alt="" loading="lazy" className="aspect-[10/7] w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-bold text-white">{m.ramoLabel}</span>
                <div className="px-4 py-3"><p className="font-bold">{m.name}</p><p className="text-xs text-muted-foreground">{m.style}</p></div>
              </Link>
            ) : (
              <Link to="/verificado" className="group relative block overflow-hidden rounded-2xl border border-border bg-card" title="Só para quem tem o selo Verificado">
                <img src={m.cover} alt="" className="aspect-[10/7] w-full scale-110 object-cover blur-md" />
                <span className="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-bold text-white">{m.ramoLabel}</span>
                <span className="absolute inset-x-0 top-0 flex aspect-[10/7] items-center justify-center"><span className="inline-flex items-center gap-1.5 rounded-full bg-black/75 px-3 py-1.5 text-sm font-bold text-white"><Lock className="size-4" />Verificado</span></span>
                <div className="px-4 py-3"><p className="font-bold blur-[3px]">{m.name}</p><p className="text-xs text-muted-foreground">{m.style}</p></div>
              </Link>
            );
}
