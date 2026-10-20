// A lightweight abstract globe: no WebGL, model downloads, or continuous render loop.
export function OceanScene() {
  return (
    <div className="ocean-backdrop pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <svg className="ocean-globe" viewBox="0 0 600 600" fill="none">
        <circle cx="300" cy="300" r="240" />
        {[70, 140, 205].map((radius) => <ellipse key={radius} cx="300" cy="300" rx={radius} ry="240" />)}
        {[100, 190, 300, 410, 500].map((y) => <path key={y} d={`M ${300 - Math.sqrt(240 ** 2 - (y - 300) ** 2)} ${y} Q 300 ${y + 38} ${300 + Math.sqrt(240 ** 2 - (y - 300) ** 2)} ${y}`} />)}
        <ellipse cx="300" cy="300" rx="285" ry="105" transform="rotate(-25 300 300)" />
        <circle cx="69" cy="414" r="5" className="ocean-node" />
        <circle cx="531" cy="186" r="5" className="ocean-node" />
      </svg>
    </div>
  );
}
