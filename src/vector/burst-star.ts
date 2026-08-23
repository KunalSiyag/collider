export interface BurstStarOptions {
  color?: string;
  points?: number;
  size?: number;
}

function burstPath(cx: number, cy: number, outerR: number, innerR: number, points: number): string {
  const step = Math.PI / points;
  let d = '';
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = i * step - Math.PI / 2;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    d += `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  return `${d}Z`;
}

export function createBurstStar(options: BurstStarOptions = {}): string {
  const { color = '#f59e0b', points = 16, size = 400 } = options;
  const c = size / 2;

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path
    d="${burstPath(c, c, size * 0.42, size * 0.34, points)}"
    fill="${color}"
  >
    <animateTransform attributeName="transform" type="rotate" values="0 ${c} ${c};8 ${c} ${c};-8 ${c} ${c};0 ${c} ${c}" dur="10s" repeatCount="indefinite" />
  </path>
  <circle cx="${c}" cy="${c}" r="${size * 0.12}" fill="#09090b" />
</svg>`;
}
