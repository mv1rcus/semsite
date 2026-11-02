// Parts of a text that should become links: @mentions and #hashtags.
export type MentionPart =
  | { kind: "text"; value: string }
  | { kind: "mention"; value: string }
  | { kind: "hashtag"; value: string };

const TOKEN = /(#[0-9a-zA-Z_]{2,30}|@[0-9a-zA-Z_]{2,30})/g;

/** Split text into plain pieces and linkable @mentions / #hashtags, in order. */
export function splitMentions(body: string): MentionPart[] {
  if (!body) return [];
  return body
    .split(TOKEN)
    .filter((part) => part !== "")
    .map((part) => {
      if (part.startsWith("@")) return { kind: "mention", value: part.slice(1) } as MentionPart;
      if (part.startsWith("#")) return { kind: "hashtag", value: part.slice(1) } as MentionPart;
      return { kind: "text", value: part } as MentionPart;
    });
}

/** Where an @mention in a bio or post should go. */
export function mentionProfile(value: string) {
  return { to: "/u/$username", params: { username: value } } as const;
}

/** Where a #hashtag should go. */
export function hashtagTag(value: string) {
  return { to: "/tag/$tag", params: { tag: value } } as const;
}
