import { Link } from "@tanstack/react-router";

const TOKEN = /(#[0-9a-zA-Z_]{2,30}|@[0-9a-zA-Z_]{2,30})/g;

/** Text with clickable #hashtags and @mentions (posts and profile bios). */
export function PostText({ body, className = "mt-0.5 whitespace-pre-wrap break-words" }: { body: string; className?: string }) {
  if (!body) return null;
  return (
    <p className={className}>
      {body.split(TOKEN).map((part, i) => {
        if (!part) return null;
        if (part.startsWith("#")) {
          return (
            <Link key={i} to="/tag/$tag" params={{ tag: part.slice(1) }} className="font-medium text-primary hover:underline">
              {part}
            </Link>
          );
        }
        if (part.startsWith("@")) {
          return (
            <Link key={i} to="/u/$username" params={{ username: part.slice(1) }} className="font-medium text-primary hover:underline">
              {part}
            </Link>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </p>
  );
}
