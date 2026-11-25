import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
import { FOLLOW_UP_KEY } from "@/lib/follow-up";

const DISMISS_KEY = "first-steps-dismissed-v1";

function read(key: string): unknown {
  try { return JSON.parse(localStorage.getItem(key) ?? "null"); } catch { return null; }
}

/** Passos concluídos lidos só do que o navegador já guarda (buscas recentes, links de demo, clientes). */
export function firstStepsStatus() {
  const recent = read("recent-searches-v1");
  const demos = read("site-demo-links");
  const clients = read(FOLLOW_UP_KEY);
  const list = Array.isArray(clients) ? clients as { stage?: string; events?: { stage?: string }[] }[] : [];
  const sent = list.some(c => (c.stage && c.stage !== "new") || (c.events ?? []).some(e => e.stage && e.stage !== "new"));
  return { search: Array.isArray(recent) && recent.length > 0, demo: Array.isArray(demos) && demos.length > 0, sent };
}

export function FirstStepsCard() {
  const [state, setState] = useState<ReturnType<typeof firstStepsStatus> | null>(null);
  const [dismissed, setDismissed] = useState(true);
  useEffect(() => {
    const update = () => setState(firstStepsStatus());
    update();
    setDismissed(localStorage.getItem(DISMISS_KEY) === "1");
    window.addEventListener("storage", update);
    const t = window.setInterval(update, 3000);
    return () => { window.removeEventListener("storage", update); window.clearInterval(t); };
  }, []);
  if (!state || dismissed || (state.search && state.demo && state.sent)) return null;
  const steps = [
    { done: state.search, label: "Buscar clientes sem site", to: "/buscar" as const, hash: undefined },
    { done: state.demo, label: "Gerar uma demonstração", to: "/demonstracoes" as const, hash: undefined },
    { done: state.sent, label: "Enviar no WhatsApp", to: "/demonstracoes" as const, hash: "links" },
  ];
  return (
    <div className="relative mt-5 rounded-2xl border border-border bg-card/80 p-4 backdrop-blur">
      <button type="button" aria-label="Dispensar primeiros passos" onClick={() => { localStorage.setItem(DISMISS_KEY, "1"); setDismissed(true); }} className="absolute right-3 top-3 text-muted-foreground"><X className="size-4" /></button>
      <p className="text-xs font-bold uppercase tracking-wider text-primary">Primeiros passos · {steps.filter(s => s.done).length}/3</p>
      <ol className="mt-3 grid gap-2 sm:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.label}>
            <Link to={s.to} {...(s.hash ? { hash: s.hash } : {})} className="flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm">
              <span className={`grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold ${s.done ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"}`}>{s.done ? <Check className="size-3.5" /> : i + 1}</span>
              <span className={s.done ? "text-muted-foreground line-through" : "font-semibold"}>{s.label}</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
