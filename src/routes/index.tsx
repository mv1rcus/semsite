import { createFileRoute, Link } from "@tanstack/react-router";
import { OceanScene } from "@/components/OceanScene";
import { Letters3D } from "@/components/Letters3D";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Caça Clientes — Acessar" },
      { name: "description", content: "Encontre negócios sem site e ofereça seu trabalho pelo WhatsApp." },
      { property: "og:title", content: "Caça Clientes" },
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
      <img src={logo} alt="Caça Clientes" width={983} height={420} className="w-64 max-w-full sm:w-80" />
      <h1 className="mt-8 text-center text-4xl font-extrabold tracking-tight sm:text-6xl">
        <Letters3D text="Caça" className="text-gradient" />{" "}
        <Letters3D text="Clientes" />
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
