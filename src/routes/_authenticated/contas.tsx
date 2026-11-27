import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ProspectTabs } from "@/components/ProspectTabs";
import { Input } from "@/components/ui/input";
import { Search, ChevronRight } from "lucide-react";
import { matchesAccount } from "@/lib/account-search";
import { Button } from "@/components/ui/button";
import { AdminTickets } from "@/components/AdminTickets";
import { AdminMetrics } from "@/components/AdminMetrics";
import { AdminSystem } from "@/components/AdminSystem";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

type Account = { email: string | null; created_at: string; last_sign_in_at: string | null; username: string | null; display_name: string | null };

export const Route = createFileRoute("/_authenticated/contas")({
  head: () => ({ meta: [{ title: "Contas do site — SemSite" }, { name: "description", content: "Painel privado com as contas criadas no SemSite." }, { property: "og:title", content: "Contas do site — SemSite" }, { property: "og:description", content: "Painel privado de contas do SemSite." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" }] }),
  component: Contas,
});

const fmt = (d: string | null) => (d ? new Date(d).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: "short", timeStyle: "short" }) : "nunca entrou");

function Contas() {
  const [rows, setRows] = useState<Account[] | null>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Account | null>(null);
  const [tab, setTab] = useState<"contas" | "tickets" | "metricas" | "sistema">("contas");
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
        <p className="page-kicker mb-3">/ ADMIN</p><h1 className="font-display text-4xl tracking-wide">Painel do SemSite</h1>
        <div role="tablist" aria-label="Seções do painel" className="mt-4 flex gap-2">
          <Button role="tab" aria-selected={tab === "contas"} variant={tab === "contas" ? "default" : "outline"} size="sm" onClick={() => setTab("contas")}>Contas</Button>
          <Button role="tab" aria-selected={tab === "tickets"} variant={tab === "tickets" ? "default" : "outline"} size="sm" onClick={() => setTab("tickets")}>Tickets</Button>
          <Button role="tab" aria-selected={tab === "metricas"} variant={tab === "metricas" ? "default" : "outline"} size="sm" onClick={() => setTab("metricas")}>Métricas</Button>
          <Button role="tab" aria-selected={tab === "sistema"} variant={tab === "sistema" ? "default" : "outline"} size="sm" onClick={() => setTab("sistema")}>Sistema</Button>
        </div>
        {tab === "tickets" && <AdminTickets />}
        {tab === "metricas" && <AdminMetrics />}
        {tab === "sistema" && <AdminSystem />}
        {tab === "contas" && (rows === null ? <p className="mt-4 text-muted-foreground">Carregando…</p> : rows.length === 0 ? <p className="mt-4 text-muted-foreground">Nada para mostrar aqui.</p> : (
          <>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="app-card p-4"><p className="text-sm text-muted-foreground">Total de contas</p><p className="font-display text-4xl text-primary">{rows.length}</p></div>
              <div className="app-card p-4"><p className="text-sm text-muted-foreground">Novas hoje</p><p className="font-display text-4xl">{novasHoje}</p></div>
            </div>
            <div className="relative mt-5">
              <Search className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" />
              <Input aria-label="Pesquisar contas" placeholder="Pesquisar por @, e-mail ou nome" value={query} onChange={event => setQuery(event.target.value)} className="pl-9" type="search" />
            </div>
            <p role="status" className="mt-2 text-sm text-muted-foreground">{filtered.length} {filtered.length === 1 ? "conta encontrada" : "contas encontradas"}</p>
            {filtered.length === 0 && <p className="mt-4 text-muted-foreground">Nenhuma conta encontrada.</p>}
            <ul className="mt-4 flex flex-col gap-2">
              {filtered.map((r) => (
                <li key={(r.email ?? "") + r.created_at} className="app-card">
                  <Button variant="ghost" aria-label={`Ver conta ${r.username ? `@${r.username}` : r.email ?? r.display_name ?? "sem nome"}`} onClick={() => setSelected(r)} className="h-auto w-full justify-between whitespace-normal p-3 text-left">
                  <span className="min-w-0 flex-1">
                  {r.display_name && <p className="break-words font-bold">{r.display_name}</p>}
                  <p className="break-all font-bold">{r.email}</p>
                  {r.username && <p className="text-sm text-primary">@{r.username}</p>}
                  <p className="text-sm text-muted-foreground">Criada: {fmt(r.created_at)} · Último acesso: {fmt(r.last_sign_in_at)}</p>
                  </span>
                  <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
                  </Button>
                </li>
              ))}
            </ul>
          </>
        ))}
      </main>
      <Dialog open={selected !== null} onOpenChange={open => { if (!open) setSelected(null); }}>
        <DialogContent className="max-h-[85dvh] w-[calc(100%-2rem)] overflow-y-auto rounded-lg">
          <DialogHeader>
            <DialogTitle className="break-words pr-5">Detalhes da conta</DialogTitle>
            <DialogDescription className="break-all">{selected?.username ? `@${selected.username}` : selected?.display_name ?? "Conta sem nome"}</DialogDescription>
          </DialogHeader>
          {selected && <>
            <dl className="grid gap-4 text-sm">
              <div><dt className="text-muted-foreground">Nome</dt><dd className="break-words font-medium">{selected.display_name || "Não informado"}</dd></div>
              <div><dt className="text-muted-foreground">E-mail</dt><dd className="break-all font-medium">{selected.email || "Não informado"}</dd></div>
              <div><dt className="text-muted-foreground">Conta criada</dt><dd className="font-medium">{fmt(selected.created_at)}</dd></div>
              <div><dt className="text-muted-foreground">Último login registrado</dt><dd className="font-medium">{fmt(selected.last_sign_in_at)}</dd></div>
            </dl>
            <section className="border-t pt-4"><h2 className="font-semibold">Páginas visitadas</h2><p className="mt-2 text-sm text-muted-foreground">Não há histórico de páginas vinculado a esta conta. O último login não indica que a pessoa está online agora.</p></section>
          </>}
        </DialogContent>
      </Dialog>
    </>
  );
}
