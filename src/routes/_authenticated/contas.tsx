import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ProspectTabs } from "@/components/ProspectTabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { matchesAccount } from "@/lib/account-search";

type Account = { email: string | null; created_at: string; last_sign_in_at: string | null; username: string | null; display_name: string | null };

export const Route = createFileRoute("/_authenticated/contas")({
  head: () => ({ meta: [{ title: "Contas do site — SemSite" }, { name: "description", content: "Painel privado com as contas criadas no SemSite." }, { property: "og:title", content: "Contas do site — SemSite" }, { property: "og:description", content: "Painel privado de contas do SemSite." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" }] }),
  component: Contas,
});

const fmt = (d: string | null) => (d ? new Date(d).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: "short", timeStyle: "short" }) : "nunca entrou");

function Contas() {
  const [rows, setRows] = useState<Account[] | null>(null);
  const [query, setQuery] = useState("");
  useEffect(() => {
    (supabase.rpc as unknown as (n: string) => Promise<{ data: Account[] | null }>)("admin_accounts").then(({ data }) => setRows(data ?? []));
  }, []);
  const today = new Date().toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });
  const novasHoje = rows?.filter((r) => new Date(r.created_at).toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" }) === today).length ?? 0;
  const filtered = rows?.filter(r => matchesAccount(r, query)) ?? [];
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
            <div className="relative mt-5">
              <Search className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" />
              <Input aria-label="Pesquisar contas" placeholder="Pesquisar por @, e-mail ou nome" value={query} onChange={event => setQuery(event.target.value)} className="pl-9" type="search" />
            </div>
            <p role="status" className="mt-2 text-sm text-muted-foreground">{filtered.length} {filtered.length === 1 ? "conta encontrada" : "contas encontradas"}</p>
            {filtered.length === 0 && <p className="mt-4 text-muted-foreground">Nenhuma conta encontrada.</p>}
            <ul className="mt-4 flex flex-col gap-2">
              {filtered.map((r) => (
                <li key={(r.email ?? "") + r.created_at} className="rounded-xl border bg-card p-3">
                  {r.display_name && <p className="break-words font-bold">{r.display_name}</p>}
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
