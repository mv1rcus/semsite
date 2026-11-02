const KEY = "semsite.notificationsSeenAt";

/** Returns the previous "seen" timestamp and stores now. */
export function markNotificationsSeen(): number {
  const prev = Number(localStorage.getItem(KEY) || 0);
  localStorage.setItem(KEY, String(Date.now()));
  window.dispatchEvent(new Event("semsite-unread"));
  return prev;
}

export function notificationsSeenAt(): number {
  return Number(localStorage.getItem(KEY) || 0);
}
