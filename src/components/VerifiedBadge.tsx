const LOBES = 8;
const PATH = (() => {
  const pts: string[] = [];
  for (let i = 0; i <= 96; i++) {
    const a = (i / 96) * Math.PI * 2;
    const r = 10 + 1.25 * Math.cos(LOBES * a);
    pts.push(`${(12 + r * Math.cos(a)).toFixed(2)} ${(12 + r * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join(" L")}Z`;
})();

export function VerifiedBadge({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Conta verificada" className="inline-block shrink-0 align-[-4px]">
      <path d={PATH} className="fill-primary" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M7.6 12.4l3 3 5.8-6.2" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
