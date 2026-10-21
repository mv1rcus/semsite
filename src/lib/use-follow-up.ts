import { useEffect, useState } from "react";
import { FOLLOW_UP_KEY, parseClients, trackClient, updateClient, removeClients, type FollowUpClient, type Stage } from "./follow-up";
import { mergeClients } from "./backup";
import type { Lead } from "./leads";

export function useFollowUp() {
  const [clients, setClients] = useState<FollowUpClient[]>([]);
  const [storageError, setStorageError] = useState("");
  useEffect(() => {
    function load() { try { setClients(parseClients(localStorage.getItem(FOLLOW_UP_KEY))); } catch { setStorageError("Não foi possível acessar os clientes salvos neste navegador."); } }
    load();
    window.addEventListener("storage", load);
    window.addEventListener("follow-up-updated", load);
    return () => { window.removeEventListener("storage", load); window.removeEventListener("follow-up-updated", load); };
  }, []);
  function write(change: (current: FollowUpClient[]) => FollowUpClient[]) {
    try {
      const updated = change(parseClients(localStorage.getItem(FOLLOW_UP_KEY)));
      localStorage.setItem(FOLLOW_UP_KEY, JSON.stringify(updated)); setClients(updated); setStorageError("");
      window.dispatchEvent(new Event("follow-up-updated"));
      return true;
    } catch { setStorageError("Não foi possível salvar. Permita o armazenamento neste navegador e tente novamente."); return false; }
  }
  return { clients, storageError,
    track: (lead: Lead, stage?: Stage) => write((current) => trackClient(current, lead, stage)),
    update: (id: string, patch: Partial<Pick<FollowUpClient, "stage" | "stageDate" | "nextContact" | "noResponse">>) => write((current) => current.map((client) => client.id === id ? updateClient(client, patch) : client)),
    remove: (ids: string[]) => write((current) => removeClients(current, ids)),
    restore: (imported: FollowUpClient[]) => write((current) => mergeClients(current, imported)),
  };
}