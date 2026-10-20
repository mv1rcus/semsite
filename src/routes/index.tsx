import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import { Letters3D } from "@/components/Letters3D";
import { Button } from "@/components/ui/button";

const OceanScene = lazy(() => import("@/components/OceanScene").then((m) => ({ default: m.OceanScene })));

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-5 py-12">
      {mounted && (
        <Suspense fallback={null}>
          <OceanScene />
        </Suspense>
      )}
      <h1 className="text-center text-5xl font-extrabold tracking-tight sm:text-7xl">
        <Letters3D text="Caça" className="text-gradient" />
        <br />
        <Letters3D text="Clientes" />
      </h1>
      <p className="mt-4 max-w-md text-center text-muted-foreground">
        Negócios sem site, prontos pra receber sua proposta no WhatsApp.
      </p>
      <Button asChild className="mt-10 w-full max-w-sm">
        <Link to="/buscar">Acessar</Link>
      </Button>
    </main>
  );
}
