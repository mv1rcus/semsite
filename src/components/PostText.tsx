import { Link } from "@tanstack/react-router";

const TOKEN = /(#[0-9a-zA-Z_]{2,30}|@[0-9a-zA-Z_]{2,30})/g;

/** Post text with clickable #hashtags and @mentions. */
export function PostText({ body }: { body: string }) {
  if (!body) return null;
  return (
    <p className="mt-0.5 whitespace-pre-wrap break-words">
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
