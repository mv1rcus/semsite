import { Link } from "@tanstack/react-router";

import { hashtagTag, mentionProfile, splitMentions } from "@/lib/mention-text";

/** Text with clickable #hashtags and @mentions (posts and profile bios). */
export function PostText({ body, className = "mt-0.5 whitespace-pre-wrap break-words" }: { body: string; className?: string }) {
  if (!body) return null;
  return (
    <p className={className}>
      {splitMentions(body).map((part, i) => {
        if (part.kind === "hashtag") {
          return (
            <Link key={i} {...hashtagTag(part.value)} className="font-medium text-primary hover:underline">
              #{part.value}
            </Link>
          );
        }
        if (part.kind === "mention") {
          return (
            <Link key={i} {...mentionProfile(part.value)} className="font-medium text-primary hover:underline">
              @{part.value}
            </Link>
          );
        }
        return <span key={i}>{part.value}</span>;
      })}
    </p>
  );
}
