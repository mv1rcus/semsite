import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { useFollowUp } from "@/lib/use-follow-up";
import { senderIntro } from "@/lib/message";
import { Check, Copy, Lock, Plus, Send, UserRound } from "lucide-react";
import { useVerified } from "@/lib/use-verified";
import { SiteModelView } from "@/components/SiteModelView";
import { PremiumSite } from "@/components/PremiumSite";
import { BurgerFold } from "@/components/models/BurgerFold";
import { getPremium } from "@/lib/premium-models";
import { authorizeModelUse, getModelPrompt } from "@/lib/vitrine.functions";
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
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState("");
  const field = "h-9 min-w-[44%] flex-1 rounded-lg sm:min-w-0 border border-border bg-card px-2.5 text-sm outline-none focus:border-primary";
  const btn = "inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-3 text-sm font-bold hover:bg-muted";
  async function copy(kind: string, text: string) {
    try { await navigator.clipboard.writeText(text); setDone(kind); setTimeout(() => setDone(""), 2000); } catch { /* Clipboard blocked. */ }
  }
  const { verified } = useVerified();
  const { clients: all, update } = useFollowUp();
  const clients = all.filter((c) => c.stage === "contacted" || c.stage === "demo_sent");
  const shown = clients;
  async function sendTo(c: { id?: string; name: string; phone: string | null; intlPhone: string | null } | null) {
    try { await authorizeModelUse({ data: { id } }); } catch { setDone("err"); setTimeout(() => setDone(""), 2500); return; }
    const digits = c ? ((c.intlPhone ?? "").replace(/\D/g, "") || (c.phone ? `55${c.phone.replace(/\D/g, "")}` : "")) : "";
    const cl: ModelClient = c ? { name: c.name, whatsapp: digits.replace(/^55/, ""), city: "" } : {};
    const url = modelLink(window.location.origin, id, cl);
    const msg = `${senderIntro()}${c ? ` Vi a ${c.name} e preparei um modelo de site pra vocês.` : " Preparei um modelo de site pra você."} Dá uma olhada, funciona no celular:\n${url}\nSe gostar, eu ajusto fotos, textos e cores pro seu negócio.`;
    if (c?.id) update(c.id, { stage: "demo_sent" });
    window.open(`https://wa.me/${digits}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  }
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="sticky top-0 z-50 border-b border-border bg-background/95 px-3 py-2 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-2">
          <Link to="/vitrine" className="mr-auto text-sm font-bold hover:underline">← Vitrine</Link>
          {premium && !verified && <Link to="/verificado" className={btn} title="Só para quem tem o selo Verificado"><Lock className="size-4" />Copiar prompt · Verificado</Link>}
          {premium && verified && <button type="button" onClick={async () => { try { const r = await getModelPrompt({ data: { id, name: client.name, whatsapp: client.whatsapp, city: client.city } }); await copy("p", r.prompt); } catch { setDone("err"); setTimeout(() => setDone(""), 2500); } }} className={btn}>{done === "p" ? <Check className="size-4" /> : <Copy className="size-4" />}{done === "p" ? "Prompt copiado!" : done === "err" ? "Só para Verificado" : "Copiar prompt do site"}</button>}
          {!verified && <Link to="/verificado" className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-bold text-primary-foreground" title="Só para quem tem o selo Verificado"><Lock className="size-4" />Usar em um cliente · Verificado</Link>}
          {verified && <button type="button" onClick={() => setOpen(!open)} className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-bold text-primary-foreground"><UserRound className="size-4" />Usar em um cliente</button>}
          <button type="button" disabled title="Em breve" className={`${btn} opacity-50`}><Plus className="size-4" />Em breve</button>
        </div>
        {verified && open && (
          <div className="mx-auto mt-2 max-w-5xl rounded-xl border border-border bg-card p-2">
            <p className="px-2 pb-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">Seus clientes contatados ({clients.length})</p>
            <ul className="max-h-72 overflow-auto">
              {shown.length === 0 && <li className="px-2 py-3 text-sm text-muted-foreground">Nenhum cliente com mensagem enviada ainda. Marque como Contatado na aba Clientes.</li>}
              {shown.map((c) => (
                <li key={c.id}><button type="button" onClick={() => sendTo(c)} className="flex w-full items-center justify-between gap-2 rounded-lg px-2 py-2.5 text-left text-sm hover:bg-muted"><span className="min-w-0"><span className="block truncate font-bold">{c.name}</span><span className="block text-xs text-muted-foreground">{c.stage === "demo_sent" ? "Demonstração enviada" : "Contatado"}</span></span><span className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-[#25D366]"><Send className="size-3.5" />Enviar</span></button></li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {premium?.id === "brasa-e-pao" ? <BurgerFold client={client} /> : premium ? <PremiumSite model={premium} client={client} /> : model ? <SiteModelView model={model} client={client} /> : null}
    </div>
  );
}
