import { describe, expect, it } from "vitest";

import { hashtagTag, mentionProfile, splitMentions } from "@/lib/mention-text";

describe("Mentions in bios and posts", () => {
  it("turns @semsite in a bio into a mention pointing at that profile", () => {
    const parts = splitMentions("Fundador & dev do @semsite 💻");
    expect(parts).toContainEqual({ kind: "mention", value: "semsite" });
    expect(mentionProfile("semsite")).toEqual({ to: "/u/$username", params: { username: "semsite" } });
  });

  it("keeps the text around the mention untouched", () => {
    const parts = splitMentions("Oi, sou @mvthebest e crio sites");
    expect(parts.map((p) => p.value)).toEqual(["Oi, sou ", "mvthebest", " e crio sites"]);
    expect(parts[1]).toEqual({ kind: "mention", value: "mvthebest" });
  });

  it("treats a lone @ or a one-letter @ as plain text", () => {
    expect(splitMentions("e-mail: marcus @ x")).toEqual([{ kind: "text", value: "e-mail: marcus @ x" }]);
  });

  it("recognises hashtags and sends them to the tag page", () => {
    const parts = splitMentions("Dica #prospeccao hoje");
    expect(parts).toContainEqual({ kind: "hashtag", value: "prospeccao" });
    expect(hashtagTag("prospeccao")).toEqual({ to: "/tag/$tag", params: { tag: "prospeccao" } });
  });

  it("returns nothing for an empty bio", () => {
    expect(splitMentions("")).toEqual([]);
  });
});
