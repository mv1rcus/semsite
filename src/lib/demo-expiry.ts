/** Validade da prévia e contagem de aberturas: regras puras, sem acesso a banco. */
export const DEFAULT_EXPIRY_DAYS = 30;
export const EXPIRY_OPTIONS = [3, 7, 15, 30, 60, 90] as const;
/** Duas aberturas dentro dessa janela contam como uma só (recarregar a página não infla o contador). */
export const OPEN_SESSION_MS = 30 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

export function expiryDate(days: number, now = Date.now()) {
  return new Date(now + Math.max(1, Math.round(days)) * DAY_MS).toISOString();
}

export function isExpired(expiresAt: string | null | undefined, now = Date.now()) {
  if (!expiresAt) return false;
  const at = Date.parse(expiresAt);
  return Number.isFinite(at) && at <= now;
}

/** Só conta uma nova abertura quando a anterior foi há mais de OPEN_SESSION_MS (ou nunca houve). */
export function isNewOpenSession(lastOpenedAt: string | null | undefined, now = Date.now()) {
  if (!lastOpenedAt) return true;
  const last = Date.parse(lastOpenedAt);
  return !Number.isFinite(last) || now - last >= OPEN_SESSION_MS;
}

export type ExpiryInfo = { state: "none" | "active" | "soon" | "expired"; daysLeft: number; label: string };

export function expiryInfo(expiresAt: string | null | undefined, now = Date.now()): ExpiryInfo {
  if (!expiresAt || !Number.isFinite(Date.parse(expiresAt))) return { state: "none", daysLeft: Infinity, label: "Sem validade" };
  const diff = Date.parse(expiresAt) - now;
  if (diff <= 0) return { state: "expired", daysLeft: 0, label: "Expirada" };
  const daysLeft = Math.ceil(diff / DAY_MS);
  const label = daysLeft === 1 ? "Expira em 1 dia" : `Expira em ${daysLeft} dias`;
  return { state: daysLeft <= 3 ? "soon" : "active", daysLeft, label };
}

export function openCountLabel(count: number | null | undefined) {
  const n = Math.max(0, Math.floor(count ?? 0));
  if (n === 0) return "Ninguém abriu ainda";
  return n === 1 ? "O cliente abriu 1 vez" : `O cliente abriu ${n} vezes`;
}

/** Texto de urgência pronto para o vendedor mandar ao cliente. */
export function urgencyMessage(name: string, link: string, expiresAt: string | null | undefined, now = Date.now()) {
  const info = expiryInfo(expiresAt, now);
  if (info.state === "none") return `Olá! O site de demonstração de ${name} está no ar: ${link}\nSe gostou, me avise que eu coloco o seu no ar.`;
  if (info.state === "expired") return `Olá! O site de demonstração de ${name} saiu do ar. Se ainda tiver interesse, me avise que eu reativo o link.`;
  const when = new Date(Date.parse(expiresAt as string)).toLocaleDateString("pt-BR");
  const left = info.daysLeft === 1 ? "amanhã" : `em ${info.daysLeft} dias`;
  return `Olá! O site de demonstração de ${name} fica no ar só até ${when} (${left}): ${link}\nSe gostou, me avise antes disso que eu garanto o seu.`;
}
