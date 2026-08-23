export interface SnowfallDriftOptions {
  seed?: number;
  size?: number;
  flakes?: number;
  base?: string;
  accent?: string;
}

export function createSnowfallDrift(options: SnowfallDriftOptions = {}): string {
  const { seed = 53, size = 720, flakes = 70, base = '#e4e4e7', accent = '#a78bfa' } = options;

  let t = seed >>> 0;
  const rand = () => {
    t |= 0; t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const els: string[] = [];
  for (let i = 0; i < flakes; i++) {
    const x = rand() * size;
    const y = rand() * size;
    const r = 1 + rand() * rand() * 3.4;
    const color = rand() > 0.92 ? accent : base;
    const dur = (8 + rand() * 14).toFixed(1);
    const drift = ((rand() - 0.5) * 60).toFixed(0);
    const op = (0.3 + rand() * 0.6).toFixed(2);
    els.push(
      `    <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}" fill="${color}" opacity="${op}">
      <animateTransform attributeName="transform" type="translate" values="0 -20; ${drift} ${size + 40}" dur="${dur}s" repeatCount="indefinite" />
    </circle>`,
    );
  }

  const duneY = size * 0.88;
  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
  <path d="M0 ${duneY + 26} Q${(size * 0.3).toFixed(0)} ${duneY - 12} ${(size * 0.55).toFixed(0)} ${duneY + 10} T${size} ${duneY} L${size} ${size} L0 ${size} Z" fill="#14141c" stroke="#27272a" stroke-width="1" />
</svg>`;
}
