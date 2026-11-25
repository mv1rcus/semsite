import { getPalette, type SiteModel } from "@/lib/site-models";

/** Miniatura leve (só CSS) para a galeria: dá pra listar milhares sem renderizar o site inteiro. */
export function ModelMiniPreview({ model }: { model: SiteModel }) {
  const p = getPalette(model.palette);
  const bar = { background: p.fg, opacity: 0.25 } as const;
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden" style={{ background: p.bg, color: p.fg }} aria-hidden>
      <div className="flex items-center justify-between px-3 py-2"><span className="text-[10px] font-extrabold">{model.emoji} {model.name}</span><span className="flex gap-1"><i className="h-1 w-4 rounded" style={bar} /><i className="h-1 w-4 rounded" style={bar} /></span></div>
      {model.layout === "bold" ? (
        <div className="px-3 pt-4"><div className="text-2xl font-black uppercase leading-none">{model.name}<span style={{ color: p.primary }}>.</span></div><i className="mt-3 block h-1.5 w-2/3 rounded" style={bar} /><i className="mt-5 block h-6 w-20 rounded-full" style={{ background: p.primary }} /></div>
      ) : model.layout === "minimal" ? (
        <div className="px-4 pt-8"><i className="block h-2 w-10 rounded" style={{ background: p.primary }} /><i className="mt-3 block h-3 w-4/5 rounded" style={bar} /><i className="mt-2 block h-3 w-3/5 rounded" style={bar} /><i className="mt-6 block h-5 w-16 rounded-full border-2" style={{ borderColor: p.primary }} /></div>
      ) : model.layout === "centered" ? (
        <div className="px-3 pt-6 text-center" style={{ background: `radial-gradient(ellipse at top, ${p.primary}44, transparent 70%)` }}><i className="mx-auto block h-3 w-4/5 rounded" style={bar} /><i className="mx-auto mt-2 block h-3 w-3/5 rounded" style={bar} /><i className="mx-auto mt-5 block h-6 w-20 rounded-full" style={{ background: p.primary }} /></div>
      ) : model.is3d ? (
        <div className="flex h-28 items-center justify-center" style={{ perspective: 400 }}>
          <div style={{ transform: model.layout === "orbita3d" ? "rotateX(60deg)" : "rotateX(-20deg) rotateY(35deg)", transformStyle: "preserve-3d" }}>
            {model.layout === "orbita3d"
              ? <div className="size-20 rounded-full border-2" style={{ borderColor: p.primary, boxShadow: `0 0 0 8px ${p.primary}22` }} />
              : <div className="flex size-16 items-center justify-center rounded-lg border-2 text-3xl" style={{ borderColor: p.primary, background: `${p.primary}33`, boxShadow: `10px 10px 0 ${p.primary}55` }}>{model.emoji}</div>}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-2 px-3 pt-4"><div className="col-span-3"><i className="block h-3 w-full rounded" style={bar} /><i className="mt-2 block h-3 w-3/4 rounded" style={bar} /><i className="mt-4 block h-5 w-14 rounded-full" style={{ background: p.primary }} /></div><div className="col-span-2 flex h-16 items-center justify-center rounded-2xl text-2xl" style={{ background: p.primary }}>{model.emoji}</div></div>
      )}
      <div className="mt-4 grid grid-cols-3 gap-1.5 px-3">{[0, 1, 2].map((i) => <i key={i} className="block h-10 rounded-lg" style={{ background: p.soft }} />)}</div>
      <div className="absolute inset-x-3 bottom-3 h-7 rounded-xl" style={{ background: p.primary, opacity: 0.9 }} />
      {model.is3d && <span className="absolute right-2 top-9 rounded-full px-1.5 py-0.5 text-[9px] font-black" style={{ background: p.primary, color: p.dark ? "#000" : "#fff" }}>3D</span>}
    </div>
  );
}
