export interface RiverDeltaOptions {
  seed?: number;
  size?: number;
  branches?: number;
  base?: string;
  accent?: string;
}

export function createRiverDelta(options: RiverDeltaOptions = {}): string {
  const { seed = 8, size = 720, branches = 9, base = '#27272a', accent = '#67e8f9' } = options;

  let s = seed >>> 0;
  const rnd = () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const sourceX = size * 0.5;
  const sourceY = size * 0.1;
  const mouthY = size * 0.94;
  const els: string[] = [];

  const grow = (x: number, y: number, depth: number, width: number): void => {
    if (depth === 0 || y > mouthY) return;
    const spread = size * 0.055 * depth;
    const endX = x + (rnd() - 0.5) * spread * 2.2 + (x - sourceX) * 0.12;
    const endY = y + (mouthY - sourceY) / 3.2 + rnd() * 30;
    const cxp = x + (rnd() - 0.5) * spread * 1.4;
    els.push(`      <path d="M${x.toFixed(1)} ${y.toFixed(1)} Q${cxp.toFixed(1)} ${((y + endY) / 2).toFixed(1)} ${endX.toFixed(1)} ${endY.toFixed(1)}" fill="none" stroke="${depth > 2 ? accent : base}" stroke-width="${width.toFixed(1)}" opacity="${(0.35 + width / 14).toFixed(2)}" stroke-linecap="round" />`);
    const splits = rnd() > 0.45 ? 2 : 1;
    for (let i = 0; i < splits; i++) {
      grow(endX, endY, depth - 1, width * 0.62);
    }
  };
  grow(sourceX, sourceY, branches, 7);

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
  <circle cx="${sourceX}" cy="${sourceY}" r="7" fill="${accent}">
    <animate attributeName="opacity" values="1;0.5;1" dur="4s" repeatCount="indefinite" />
  </circle>
</svg>`;
}
