import { loadStore, saveStore } from "./cloud-store.functions";

export type CloudKind = "client" | "funnel" | "saved_demo";
export type CloudItem = { id: string; data: Record<string, unknown> };

const known: Record<CloudKind, Set<string>> = { client: new Set(), funnel: new Set(), saved_demo: new Set() };
const ready: Record<CloudKind, boolean> = { client: false, funnel: false, saved_demo: false };
const loads: Partial<Record<CloudKind, Promise<{ ready: boolean; items: CloudItem[] }>>> = {};
const timers: Partial<Record<CloudKind, ReturnType<typeof setTimeout>>> = {};
const latest: Partial<Record<CloudKind, CloudItem[]>> = {};
const migratedKey = (kind: CloudKind) => `semsite-cloud-migrated-v1-${kind}`;

/**
 * Carrega os dados da conta. Na primeira vez em cada navegador, junta o que já estava salvo aqui
 * (localStorage) com o que está na conta e sobe o resultado. Depois disso a conta manda.
 * Se o banco ainda não tem a tabela, devolve ready=false e tudo segue como antes, só no navegador.
 */
export function cloudLoad(kind: CloudKind, local: CloudItem[]) {
  loads[kind] ??= (async () => {
    try {
      const res = await loadStore({ data: { kind } });
      if (!res.ready) return { ready: false, items: local };
      const fromServer: CloudItem[] = res.items.map((item: { id: string; json: string }) => ({ id: item.id, data: JSON.parse(item.json) as Record<string, unknown> }));
      known[kind] = new Set(fromServer.map((item) => item.id));
      let items: CloudItem[] = fromServer;
      let migrated = false;
      try { migrated = localStorage.getItem(migratedKey(kind)) === "1"; } catch { /* sem storage */ }
      if (!migrated) {
        const have = new Set(items.map((item) => item.id));
        const extra = local.filter((item) => !have.has(item.id));
        items = [...items, ...extra];
        if (extra.length) await flush(kind, items);
        try { localStorage.setItem(migratedKey(kind), "1"); } catch { /* sem storage */ }
      }
      ready[kind] = true;
      return { ready: true, items };
    } catch { return { ready: false, items: local }; }
  })();
  return loads[kind]!;
}

async function flush(kind: CloudKind, items: CloudItem[]) {
  await saveStore({ data: { kind, items: items.map((item, position) => ({ id: item.id, position, json: JSON.stringify(item.data) })), knownIds: [...known[kind]] } });
  known[kind] = new Set(items.map((item) => item.id));
}

/** Salva na conta em segundo plano (com pequena espera pra juntar várias mudanças seguidas). */
export function cloudSave(kind: CloudKind, items: CloudItem[]) {
  if (!ready[kind]) return;
  latest[kind] = items;
  clearTimeout(timers[kind]);
  timers[kind] = setTimeout(() => { const list = latest[kind]; if (list) flush(kind, list).catch(() => { /* o navegador continua com a cópia local */ }); }, 500);
}
