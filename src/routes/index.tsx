import { createFileRoute, Link } from "@tanstack/react-router";
import { OceanScene } from "@/components/OceanScene";
import { Button } from "@/components/ui/button";
import logo from "@/assets/semsite-mark.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SemSite — Acessar" },
      { name: "description", content: "Encontre negócios sem site e ofereça seu trabalho pelo WhatsApp." },
      { property: "og:title", content: "SemSite — Encontre negócios sem site e ofereça seu trabalho pelo WhatsApp" },
      { property: "og:description", content: "Encontre negócios sem site e ofereça seu trabalho pelo WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Login,
});

function Login() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-5 py-12">
      <OceanScene />
      <h1>
        <span className="flex items-center gap-3"><img src={logo} alt="" width={416} height={410} className="h-16 w-auto sm:h-20" /><span className="font-display text-7xl leading-none tracking-wide sm:text-8xl">Sem<span className="text-primary">Site</span></span></span>
      </h1>
      <p className="mt-4 max-w-md text-center text-muted-foreground">
        Negócios sem site, prontos pra receber sua proposta no WhatsApp.
      </p>
      <Button asChild size="lg" className="mt-10 w-full max-w-sm text-base font-bold">
        <Link to="/buscar">Acessar</Link>
      </Button>
    </main>
  );
}
