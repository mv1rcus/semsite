import { isMobilePhone, prospectPriority, rankProspects, type Lead } from "./leads";
import type { FollowUpClient } from "./follow-up";

export type ProspectFilter = "all" | "reachable" | "priority" | "new";
export type ProspectOrder = "priority" | "reviews" | "name";

export function filterProspects(leads: Lead[], clients: FollowUpClient[], filter: ProspectFilter, order: ProspectOrder, term = "") {
  const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");
  const stages = new Map(clients.map((client) => [client.id, client.stage]));
  const query = normalize(term.trim());
  const results = rankProspects(leads).filter((lead) => {
    if (query && !normalize(`${lead.name} ${lead.address} ${lead.category ?? ""}`).includes(query)) return false;
    if (filter === "reachable") return isMobilePhone(lead);
    if (filter === "priority") return prospectPriority(lead).score >= 65;
    if (filter === "new") return (stages.get(lead.id) ?? "new") === "new";
    return true;
  });
  if (order === "reviews") results.sort((a, b) => (b.reviews ?? 0) - (a.reviews ?? 0));
  if (order === "name") results.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  return results;
}