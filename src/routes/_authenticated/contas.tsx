import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ProspectTabs } from "@/components/ProspectTabs";

type Account = { email: string | null; created_at: string; last_sign_in_at: string | null; username: string | null; display_name: string | null };

export const Route = createFileRoute("/_authenticated/contas")({
  head: () => ({ meta: [{ title: "Contas do site — SemSite" }, { name: "description", content: "Painel privado com as contas criadas no SemSite." }, { property: "og:title", content: "Contas do site — SemSite" }, { property: "og:description", content: "Painel privado de contas do SemSite." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" }] }),
  component: Contas,
});

const fmt = (d: string | null) => (d ? new Date(d).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: "short", timeStyle: "short" }) : "nunca entrou");

function Contas() {
  const [rows, setRows] = useState<Account[] | null>(null);
  useEffect(() => {
    (supabase.rpc as unknown as (n: string) => Promise<{ data: Account[] | null }>)("admin_accounts").then(({ data }) => setRows(data ?? []));
  }, []);
  const today = new Date().toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });
  const novasHoje = rows?.filter((r) => new Date(r.created_at).toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" }) === today).length ?? 0;
  return (
    <>
      <ProspectTabs active="profile" />
      <main className="mx-auto max-w-3xl px-4 py-6">
        <h1 className="font-display text-4xl tracking-wide">Contas do site</h1>
        {rows === null ? <p className="mt-4 text-muted-foreground">Carregando…</p> : rows.length === 0 ? <p className="mt-4 text-muted-foreground">Nada para mostrar aqui.</p> : (
          <>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border bg-card p-4"><p className="text-sm text-muted-foreground">Total de contas</p><p className="font-display text-4xl text-primary">{rows.length}</p></div>
              <div className="rounded-xl border bg-card p-4"><p className="text-sm text-muted-foreground">Novas hoje</p><p className="font-display text-4xl">{novasHoje}</p></div>
            </div>
            <ul className="mt-4 flex flex-col gap-2">
              {rows.map((r) => (
                <li key={(r.email ?? "") + r.created_at} className="rounded-xl border bg-card p-3">
                  <p className="break-all font-bold">{r.email}</p>
                  {r.username && <p className="text-sm text-primary">@{r.username}</p>}
                  <p className="text-sm text-muted-foreground">Criada: {fmt(r.created_at)} · Último acesso: {fmt(r.last_sign_in_at)}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </main>
    </>
  );
}
