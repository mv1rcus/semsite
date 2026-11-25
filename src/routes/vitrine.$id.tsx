import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { SiteModelView } from "@/components/SiteModelView";
import { PremiumSite } from "@/components/PremiumSite";
import { getPremium } from "@/lib/premium-models";
import { getModel, modelLink, type ModelClient } from "@/lib/site-models";

type Search = { n?: string; w?: string; c?: string };

export const Route = createFileRoute("/vitrine/$id")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    ...(typeof s["n"] === "string" ? { n: s["n"].slice(0, 80) } : {}),
    ...(typeof s["w"] === "string" ? { w: s["w"].replace(/\D/g, "").slice(0, 15) } : {}),
    ...(typeof s["c"] === "string" ? { c: s["c"].slice(0, 60) } : {}),
  }),
  loader: ({ params }) => { const m = getPremium(params.id) ?? getModel(params.id); if (!m) throw notFound(); return m.id; },
  head: ({ params }) => { const m = getPremium(params.id) ?? getModel(params.id); return { meta: [{ title: `${m ? m.ramoLabel : "Modelo"} | Vitrine SemSite` }, { name: "robots", content: "noindex" }] }; },
  notFoundComponent: () => <main className="p-8 text-center"><h1 className="text-2xl font-bold">Modelo não encontrado</h1><Link to="/vitrine" className="mt-4 inline-block underline">Voltar para a vitrine</Link></main>,
  component: Viewer,
});

function Viewer() {
  const { id } = Route.useParams();
  const sp = Route.useSearch();
  const premium = getPremium(id);
  const model = getModel(id);
  const [client, setClient] = useState<ModelClient>({ name: sp.n ?? "", whatsapp: sp.w ?? "", city: sp.c ?? "" });
  const [copied, setCopied] = useState(false);
  const field = "h-9 min-w-0 flex-1 rounded-lg border border-border bg-card px-2.5 text-sm outline-none focus:border-primary";
  async function copy() {
    try { await navigator.clipboard.writeText(modelLink(window.location.origin, id, client)); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* Clipboard blocked. */ }
  }
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="sticky top-0 z-50 border-b border-border bg-background/95 px-3 py-2 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-2">
          <Link to="/vitrine" className="text-sm font-bold hover:underline">← Vitrine</Link>
          <input value={client.name ?? ""} onChange={(e) => setClient({ ...client, name: e.target.value })} placeholder="Nome do cliente" aria-label="Nome do cliente" className={field} />
          <input value={client.whatsapp ?? ""} onChange={(e) => setClient({ ...client, whatsapp: e.target.value })} placeholder="WhatsApp (DDD + número)" inputMode="tel" aria-label="WhatsApp" className={field} />
          <input value={client.city ?? ""} onChange={(e) => setClient({ ...client, city: e.target.value })} placeholder="Cidade" aria-label="Cidade" className={field} />
          <button type="button" onClick={copy} className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-bold text-primary-foreground">{copied ? <Check className="size-4" /> : <Copy className="size-4" />}{copied ? "Copiado!" : "Copiar link"}</button>
        </div>
        <p className="mx-auto mt-1 max-w-5xl text-[11px] text-muted-foreground">Modelo ilustrativo. Serviços, preços e avaliações são exemplos para o cliente revisar.</p>
      </div>
      {premium ? <PremiumSite model={premium} client={client} /> : model ? <SiteModelView model={model} client={client} /> : null}
    </div>
  );
}
