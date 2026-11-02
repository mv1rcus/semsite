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
