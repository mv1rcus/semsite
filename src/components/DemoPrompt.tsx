import { useEffect, useState } from "react";
import { Check, Copy, ClipboardList } from "lucide-react";
import { Button } from "./ui/button";
import { sitePrompt } from "@/lib/demo-prompt";
import type { Demonstration } from "@/lib/demonstrations";

/** Copia pelo caminho antigo: funciona quando a área de transferência moderna é bloqueada. */
function legacyCopy(text: string) {
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.top = "-1000px";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  let ok = false;
  try { ok = document.execCommand("copy"); } catch { ok = false; }
  document.body.removeChild(area);
  return ok;
}

export function DemoPrompt({ demo }: { demo: Demonstration }) {
  const [copied, setCopied] = useState(false);
  const [notice, setNotice] = useState("");
  const prompt = sitePrompt(demo);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 5000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copy() {
    const done = "Prompt copiado! Cole em uma IA que cria sites e peça para gerar o seu.";
    const failed = "Não deu para copiar sozinho. Toque no texto abaixo, selecione tudo e copie.";
    try {
      const write = navigator.clipboard?.writeText(prompt) ?? Promise.reject(new Error("sem área de transferência"));
      const timeout = new Promise<never>((_, reject) => window.setTimeout(() => reject(new Error("demorado")), 1500));
      await Promise.race([write, timeout]);
      setCopied(true); setNotice(done);
    } catch {
      if (legacyCopy(prompt)) { setCopied(true); setNotice(done); }
      else setNotice(failed);
    }
  }

  return (
    <section className="border-y bg-muted" aria-labelledby="demo-prompt-title">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div>
          <p className="text-sm font-semibold text-primary">Quer um site assim?</p>
          <h2 id="demo-prompt-title" className="mt-3 text-3xl font-bold">Copie o prompt deste site</h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            Este texto descreve o site que você está vendo. Copie e cole em uma IA que cria sites
            (como Lovable, v0 ou Bolt) e peça para gerar o seu do zero.
          </p>
          <Button className="mt-6" onClick={copy} aria-label="Copiar prompt do site">
            {copied ? <Check /> : <Copy />}
            {copied ? "Prompt copiado" : "Copiar prompt"}
          </Button>
          {notice && <p role="status" className="mt-3 text-sm text-primary">{notice}</p>}
          <p className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
            <ClipboardList className="mt-0.5 size-3.5 shrink-0" />
            O prompt usa apenas os dados deste negócio. Preços, avaliações e horários não são inventados.
          </p>
        </div>
        <div className="min-w-0">
          <pre
            tabIndex={0}
            aria-label="Prompt do site para copiar"
            className="max-h-80 overflow-auto whitespace-pre-wrap break-words rounded-lg border bg-card p-4 text-xs leading-relaxed"
          >
            {prompt}
          </pre>
        </div>
      </div>
    </section>
  );
}
