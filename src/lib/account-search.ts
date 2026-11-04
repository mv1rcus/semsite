export type SearchableAccount = {
  email: string | null;
  username: string | null;
  display_name: string | null;
};

const normalize = (value: string) => value.trim().toLocaleLowerCase("pt-BR").normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export function matchesAccount(account: SearchableAccount, query: string): boolean {
  const term = normalize(query);
  if (!term) return true;
  if (term.startsWith("@")) return normalize(account.username ?? "").includes(term.slice(1));
  return [account.email, account.username, account.display_name].some(value => normalize(value ?? "").includes(term));
}