import { PneuNeon } from "@/components/models/PneuNeon";
import { SorvGlassFold } from "@/components/models/SorvGlassFold";
import { DancaFold } from "@/components/models/DancaFold";
import { EspacoFold } from "@/components/models/EspacoFold";
import { CerimonialFold } from "@/components/models/CerimonialFold";
import { BuffetFold } from "@/components/models/BuffetFold";
import { MusicaFold } from "@/components/models/MusicaFold";
import { AutoescolaFold } from "@/components/models/AutoescolaFold";
import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { useFollowUp } from "@/lib/use-follow-up";
import { senderIntro } from "@/lib/message";
import { Check, Download, Lock, Plus, Send, UserRound } from "lucide-react";
import { useVerified } from "@/lib/use-verified";
import { SiteModelView } from "@/components/SiteModelView";
import { PremiumSite } from "@/components/PremiumSite";
import { GymFold } from "@/components/models/GymFold";
import { SalonFold } from "@/components/models/SalonFold";
import { PsyFold } from "@/components/models/PsyFold";
import { NutriFold } from "@/components/models/NutriFold";
import { YogaFold } from "@/components/models/YogaFold";
import { AcuFold } from "@/components/models/AcuFold";
import { MedFold } from "@/components/models/MedFold";
import { ToqueFold } from "@/components/models/ToqueFold";
import { ImpetoFold } from "@/components/models/ImpetoFold";
import { BandoneonFold } from "@/components/models/BandoneonFold";
import { AcaiFold } from "@/components/models/AcaiFold";
import { DarkroomFold } from "@/components/models/DarkroomFold";
import { ArqFold } from "@/components/models/ArqFold";
import { BolaPraFrenteFold } from "@/components/models/BolaPraFrenteFold";
import { CardumeFold } from "@/components/models/CardumeFold";
import { FolegoFold } from "@/components/models/FolegoFold";
import { ContaFold } from "@/components/models/ContaFold";
import { FisioFold } from "@/components/models/FisioFold";
import { FloraFold } from "@/components/models/FloraFold";
import { InglesFold } from "@/components/models/InglesFold";
import { CoworkFold } from "@/components/models/CoworkFold";
import { MotoFold } from "@/components/models/MotoFold";
import { BlackFold } from "@/components/models/BlackFold";
import { AgroFold } from "@/components/models/AgroFold";
import { CinzaFold } from "@/components/models/CinzaFold";
import { ViolaoFold } from "@/components/models/ViolaoFold";
import { FotoFold } from "@/components/models/FotoFold";
import { LinhoFold } from "@/components/models/LinhoFold";
import { PizzaFold } from "@/components/models/PizzaFold";
import { JoiaFold } from "@/components/models/JoiaFold";
import { LivroFold } from "@/components/models/LivroFold";
import { ModaFold } from "@/components/models/ModaFold";
import { SorveteFold } from "@/components/models/SorveteFold";
import { EletroFold } from "@/components/models/EletroFold";
import { PapelFold } from "@/components/models/PapelFold";
import { MovelFold } from "@/components/models/MovelFold";
import { BrechoFold } from "@/components/models/BrechoFold";
import { FizzFold } from "@/components/models/FizzFold";
import { MilkFold } from "@/components/models/MilkFold";
import { PatasFold } from "@/components/models/PatasFold";
import { BakeFold } from "@/components/models/BakeFold";
import { WashFold } from "@/components/models/WashFold";
import { LaundryFold } from "@/components/models/LaundryFold";
import { GraficaFold } from "@/components/models/GraficaFold";
import { CervejariaFold } from "@/components/models/CervejariaFold";
import { SucoFold } from "@/components/models/SucoFold";
import { WineFold } from "@/components/models/WineFold";
import { BikeFold } from "@/components/models/BikeFold";
import { CafeFold } from "@/components/models/CafeFold";
import { TattooFold } from "@/components/models/TattooFold";
import { OpticFold } from "@/components/models/OpticFold";
import { PousadaFold } from "@/components/models/PousadaFold";
import { BurgerPopFold } from "@/components/models/BurgerPopFold";
import { HorizontePrimeFold } from "@/components/models/HorizontePrimeFold";
import { FarmaciaSaviaFold } from "@/components/models/FarmaciaSaviaFold";
import { FerroTintaFold } from "@/components/models/FerroTintaFold";
import { PeloEPataFold } from "@/components/models/PeloEPataFold";
import { LawFold } from "@/components/models/LawFold";
import { DentalFold } from "@/components/models/DentalFold";
import { BarberFold } from "@/components/models/BarberFold";
import { PetFold } from "@/components/models/PetFold";
import { BurgerFold } from "@/components/models/BurgerFold";
import { getPremium } from "@/lib/premium-models";
import { authorizeModelUse, getModelCode } from "@/lib/vitrine.functions";
import { getModel, modelLink, type ModelClient } from "@/lib/site-models";

type Search = { n?: string; w?: string; c?: string };

export const Route = createFileRoute("/vitrine/$id")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    ...(typeof s["n"] === "string" ? { n: s["n"].slice(0, 80) } : {}),
    ...(typeof s["w"] === "string" ? { w: s["w"].replace(/\D/g, "").slice(0, 15) } : {}),
    ...(typeof s["c"] === "string" ? { c: s["c"].slice(0, 60) } : {}),
  }),
  loader: ({ params }) => { if (params.id === "silva-lima") throw redirect({ to: "/vitrine/$id", params: { id: "toledo-azevedo" } }); const m = getPremium(params.id) ?? getModel(params.id); if (!m) throw notFound(); return m.id; },
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
  const primary = "inline-flex h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg bg-foreground px-4 text-sm font-bold text-background hover:opacity-90";
  const btn = "inline-flex h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border border-border px-3 text-sm font-bold hover:bg-muted";
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
        <div className="mx-auto flex max-w-5xl items-center gap-2">
          <Link to="/vitrine" className="mr-auto whitespace-nowrap text-sm font-bold hover:underline">← Vitrine</Link>
          {premium && !verified && <Link to="/verificado" className={primary} title="Só para quem tem o selo Verificado"><Lock className="size-4" />Baixar código<span className="hidden sm:inline"> · Verificado</span></Link>}
          {premium && verified && <button type="button" disabled={done === "w"} onClick={async () => {
            setDone("w");
            try {
              const r = await getModelCode({ data: { id, name: client.name, whatsapp: client.whatsapp, city: client.city } });
              const url = URL.createObjectURL(new Blob([r.html], { type: "text/html;charset=utf-8" }));
              const a = document.createElement("a"); a.href = url; a.download = r.filename; document.body.appendChild(a); a.click(); a.remove();
              setTimeout(() => URL.revokeObjectURL(url), 10000);
              setDone("dl");
            } catch { setDone("err"); }
            setTimeout(() => setDone(""), 3500);
          }} className={primary}>{done === "dl" ? <Check className="size-4" /> : <Download className="size-4" />}{done === "w" ? "Gerando…" : done === "dl" ? "Arquivo baixado" : done === "err" ? "Só para Verificado" : "Baixar código"}</button>}
          <button type="button" disabled title="Em breve" className={`${btn} px-2.5 opacity-50 sm:px-3`}><Plus className="size-4" />Em breve</button>
        </div>
      </div>
{premium?.id === "sala-rubra" ? <DarkroomFold client={client} /> : premium?.id === "villa-acai" ? <AcaiFold client={client} /> : premium?.id === "voltar-pneus" ? <PneuNeon client={client} /> : premium?.id === "neve-doce" ? <SorvGlassFold client={client} /> : premium?.id === "fizzo" ? <FizzFold client={client} /> : premium?.id === "milky-mix" ? <MilkFold client={client} /> : premium?.id === "agro-nova" ? <AgroFold client={client} /> : premium?.id === "vao-arquitetura" ? <ArqFold client={client} /> : premium?.id === "nuvora" ? <BlackFold client={client} /> : premium?.id === "fluxo-urbano" ? <DancaFold client={client} /> : premium?.id === "atelie-cinza" ? <CinzaFold client={client} /> : premium?.id === "recanto-verde" ? <EspacoFold client={client} /> : premium?.id === "aurora-lima" ? <CerimonialFold client={client} /> : premium?.id === "casa-ameixa" ? <BuffetFold client={client} /> : premium?.id === "clinica-meridian" ? <AcuFold client={client} /> : premium?.id === "escola-compasso" ? <MusicaFold client={client} /> : premium?.id === "pelo-e-pata" ? <PeloEPataFold client={client} /> : premium?.id === "tom-maior" ? <ViolaoFold client={client} /> : premium?.id === "rota-certa" ? <AutoescolaFold client={client} /> : premium?.id === "escolinha-bola-pra-frente" ? <BolaPraFrenteFold client={client} /> : premium?.id === "nina-albuquerque" ? <FotoFold client={client} /> : premium?.id === "escola-cardume" ? <CardumeFold client={client} /> : premium?.id === "assessoria-folego" ? <FolegoFold client={client} /> : premium?.id === "casa-bandoneon" ? <BandoneonFold client={client} /> : premium?.id === "estudio-impeto" ? <ImpetoFold client={client} /> : premium?.id === "estudio-toque" ? <ToqueFold client={client} /> : premium?.id === "estudio-serena" ? <MedFold client={client} /> : premium?.id === "raiz-yoga" ? <YogaFold client={client} /> : premium?.id === "estudio-linho" ? <LinhoFold client={client} /> : premium?.id === "vetor-contabilidade" ? <ContaFold client={client} /> : premium?.id === "garagem-74" ? <MotoFold client={client} /> : premium?.id === "atelie-seda" ? <JoiaFold client={client} /> : premium?.id === "folha-corrida" ? <LivroFold client={client} /> : premium?.id === "alto-corte" ? <ModaFold client={client} /> : premium?.id === "doce-pomar" ? <SorveteFold client={client} /> : premium?.id === "volt-e-som" ? <EletroFold client={client} /> : premium?.id === "risco-e-rabisco" ? <PapelFold client={client} /> : premium?.id === "formas-moles" ? <MovelFold client={client} /> : premium?.id === "remix" ? <BrechoFold client={client} /> : premium?.id === "patas-e-cores" ? <PatasFold client={client} /> : premium?.id === "marina-costa" ? <PsyFold client={client} /> : premium?.id === "ponte-ingles" ? <InglesFold client={client} /> : premium?.id === "forno-lume" ? <PizzaFold client={client} /> : premium?.id === "brasa-e-pao" ? <BurgerFold client={client} /> : premium?.id === "focinho-feliz" ? <PetFold client={client} /> : premium?.id === "dom-navalha" ? <BarberFold client={client} /> : premium?.id === "sorriso-verde" ? <DentalFold client={client} /> : premium?.id === "toledo-azevedo" ? <LawFold client={client} /> : premium?.id === "studio-era" ? <SalonFold client={client} /> : premium?.id === "fluxo-cowork" ? <CoworkFold client={client} /> : premium?.id === "jato-azul" ? <WashFold client={client} /> : premium?.id === "pano-limpo" ? <LaundryFold client={client} /> : premium?.id === "cobalto-grafica" ? <GraficaFold client={client} /> : premium?.id === "caldeira-brava" ? <CervejariaFold client={client} /> : premium?.id === "gota-viva" ? <SucoFold client={client} /> : premium?.id === "casa-vinha" ? <WineFold client={client} /> : premium?.id === "roda-livre" ? <BikeFold client={client} /> : premium?.id === "grao-e-prosa" ? <CafeFold client={client} /> : premium?.id === "casa-petala" ? <FloraFold client={client} /> : premium?.id === "massa-mae" ? <BakeFold client={client} /> : premium?.id === "forca-viva" ? <GymFold client={client} /> : premium?.id === "tinta-rara" ? <TattooFold client={client} /> : premium?.id === "otica-prisma" ? <OpticFold client={client} /> : premium?.id === "serra-do-vento" ? <PousadaFold client={client} /> : premium?.id === "livia-prado" ? <NutriFold client={client} /> : premium?.id === "burgeria-pop" ? <BurgerPopFold client={client} /> : premium?.id === "horizonte-prime" ? <HorizontePrimeFold client={client} /> : premium?.id === "farmacia-savia" ? <FarmaciaSaviaFold client={client} /> : premium?.id === "ferro-e-tinta" ? <FerroTintaFold client={client} /> : premium?.id === "daniela-rocha" ? <FisioFold client={client} /> : premium ? <PremiumSite model={premium} client={client} /> : model ? <SiteModelView model={model} client={client} /> : null}


    </div>
  );
}
