import { Clock } from "lucide-react";

/** Tela mostrada ao cliente quando a prévia do site passou da validade. */
export function DemoExpired({ name }: { name: string }) {
  return <main className="flex min-h-screen items-center justify-center p-8 text-center"><div className="max-w-md">
    <Clock className="mx-auto size-10 text-muted-foreground" aria-hidden />
    <h1 className="mt-4 text-2xl font-bold">Esta prévia expirou</h1>
    <p className="mt-3 text-muted-foreground">A demonstração de site de {name || "este negócio"} saiu do ar. Fale com quem enviou o link para reativar a prévia.</p>
  </div></main>;
}
