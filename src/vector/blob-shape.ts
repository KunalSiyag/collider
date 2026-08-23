export interface BlobShapeOptions {
  from?: string;
  to?: string;
  seed?: number;
  size?: number;
  wobble?: number;
}

function smoothBlobPath(cx: number, cy: number, baseRadius: number, wobble: number, seed: number): string {
  const n = 8;
  const radii: number[] = [];
  for (let i = 0; i < n; i++) {
    const noise = Math.sin(seed + i * 2.3) * 0.5 + Math.sin(seed * 1.7 + i * 1.1) * 0.5;
    radii.push(baseRadius * (1 + noise * wobble));
  }

  const points = radii.map((r, i) => {
    const angle = (i / n) * Math.PI * 2;
    return {
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
    };
  });

  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const current = points[i];
    const next = points[(i + 1) % n];
    const midX = (current.x + next.x) / 2;
    const midY = (current.y + next.y) / 2;
    d += ` Q ${current.x.toFixed(1)} ${current.y.toFixed(1)} ${midX.toFixed(1)} ${midY.toFixed(1)}`;
  }
  return `${d} Z`;
}

export function createBlobShape(options: BlobShapeOptions = {}): string {
  const { from = '#8b5cf6', to = '#22d3ee', seed = 3.7, size = 600, wobble = 0.18 } = options;
  const c = size / 2;

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="blob-grad" x1="0" y1="0" x2="${size}" y2="${size}" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${from}" />
      <stop offset="100%" stop-color="${to}" />
    </linearGradient>
    <filter id="blob-glow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="${size * 0.04}" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
  <path
    d="${smoothBlobPath(c, c, size * 0.32, wobble, seed)}"
    fill="url(#blob-grad)"
    filter="url(#blob-glow)"
  >
    <animateTransform attributeName="transform" type="rotate" values="0 ${c} ${c};360 ${c} ${c}" dur="60s" repeatCount="indefinite" />
  </path>
</svg>`;
}
