export function Letters3D({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={className} style={{ perspective: 600 }} aria-label={text}>
      {text.split("").map((c, i) => (
        <span
          key={i}
          aria-hidden
          className="letter-3d animate-in fade-in slide-in-from-bottom-4 fill-mode-both"
          style={{ animationDelay: `${i * 40}ms`, animationDuration: "600ms" }}
        >
          {c === " " ? "\u00A0" : c}
        </span>
      ))}
    </span>
  );
}
