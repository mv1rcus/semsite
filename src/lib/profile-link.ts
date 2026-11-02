// Helpers for the profile link: turn whatever the user typed into a safe
// http(s) URL, and shorten it for display.

export function normalizeProfileLink(raw: string): string {
  const typed = raw.trim().replace(/\s+/g, "");
  if (!typed) return "";
  const withProto = /^https?:\/\//i.test(typed) ? typed : `https://${typed}`;
  try {
    const u = new URL(withProto);
    if (u.protocol !== "http:" && u.protocol !== "https:") return "";
    if (!u.hostname.includes(".") || u.hostname.length < 3) return "";
    return u.href.slice(0, 300);
  } catch {
    return "";
  }
}

export function profileLinkLabel(url: string): string {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./i, "");
    const path = u.pathname.replace(/\/+$/, "");
    const tail = path && path !== "/" ? `${path}${u.search}` : "";
    return `${host}${tail}`;
  } catch {
    return url;
  }
}

export const MAX_PROFILE_LINKS = 5;

// Several links are stored in the same field, one per line.
export function splitProfileLinks(stored: string): string[] {
  return (stored || "").split(/\n+/).map(s => s.trim()).filter(Boolean);
}

// Returns the cleaned list, or null when any typed line is not a valid link.
export function normalizeProfileLinks(raw: string): string[] | null {
  const out: string[] = [];
  for (const line of raw.split(/\n+/).map(s => s.trim()).filter(Boolean)) {
    const n = normalizeProfileLink(line);
    if (!n) return null;
    if (!out.includes(n)) out.push(n);
  }
  return out.slice(0, MAX_PROFILE_LINKS);
}
