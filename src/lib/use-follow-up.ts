import { useEffect, useState } from "react";
import { FOLLOW_UP_KEY, parseClients, trackClient, updateClient, removeClients, type FollowUpClient, type Stage } from "./follow-up";
import { mergeClients } from "./backup";
import type { Lead } from "./leads";
import { cloudLoad, cloudSave, type CloudItem } from "./cloud-sync";

const toItems = (list: FollowUpClient[]): CloudItem[] => list.map((client) => ({ id: client.id, data: client as unknown as Record<string, unknown> }));

export function useFollowUp() {
  const [clients, setClients] = useState<FollowUpClient[]>([]);
  const [storageError, setStorageError] = useState("");
  useEffect(() => {
    function load() { try { setClients(parseClients(localStorage.getItem(FOLLOW_UP_KEY))); } catch { setStorageError("Não foi possível acessar os clientes salvos neste navegador."); } }
    load();
    let alive = true;
    // Conta: traz os clientes salvos no banco (e sobe os deste navegador na primeira vez).
    try {
      cloudLoad("client", toItems(parseClients(localStorage.getItem(FOLLOW_UP_KEY)))).then((result) => {
        if (!alive || !result.ready) return;
        const list = parseClients(JSON.stringify(result.items.map((item) => item.data)));
        try { localStorage.setItem(FOLLOW_UP_KEY, JSON.stringify(list)); } catch { /* cópia local opcional */ }
        setClients(list);
        window.dispatchEvent(new Event("follow-up-updated"));
      });
    } catch { /* sem storage: segue sem conta */ }
    window.addEventListener("storage", load);
    window.addEventListener("follow-up-updated", load);
    return () => { alive = false; window.removeEventListener("storage", load); window.removeEventListener("follow-up-updated", load); };
  }, []);
  function write(change: (current: FollowUpClient[]) => FollowUpClient[]) {
    try {
      const updated = change(parseClients(localStorage.getItem(FOLLOW_UP_KEY)));
      localStorage.setItem(FOLLOW_UP_KEY, JSON.stringify(updated)); setClients(updated); setStorageError("");
      cloudSave("client", toItems(updated));
      window.dispatchEvent(new Event("follow-up-updated"));
      return true;
    } catch { setStorageError("Não foi possível salvar. Permita o armazenamento neste navegador e tente novamente."); return false; }
  }
  return { clients, storageError,
    track: (lead: Lead, stage?: Stage) => write((current) => trackClient(current, lead, stage)),
    update: (id: string, patch: Partial<Pick<FollowUpClient, "stage" | "stageDate" | "nextContact" | "nextStep" | "noResponse">>) => write((current) => current.map((client) => client.id === id ? updateClient(client, patch) : client)),
    remove: (ids: string[]) => write((current) => removeClients(current, ids)),
    restore: (imported: FollowUpClient[]) => write((current) => mergeClients(current, imported)),
  };
}