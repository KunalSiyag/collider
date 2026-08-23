export interface GlacierCracksOptions {
  seed?: number;
  size?: number;
  cracks?: number;
  base?: string;
  accent?: string;
}

export function createGlacierCracks(options: GlacierCracksOptions = {}): string {
  const { seed = 47, size = 720, cracks = 10, base = '#27272a', accent = '#67e8f9' } = options;

  let s = seed >>> 0;
  const rnd = () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const els: string[] = [];
  for (let i = 0; i < cracks; i++) {
    let x = rnd() * size;
    let y = size * (i / cracks) + rnd() * 30;
    const angleBase = rnd() > 0.5 ? 0.2 : Math.PI - 0.2;
    let d = `M${x.toFixed(1)} ${y.toFixed(1)}`;
    for (let seg = 0; seg < 8; seg++) {
      x += Math.cos(angleBase + (rnd() - 0.5) * 0.7) * size * 0.07;
      y += Math.sin(angleBase + (rnd() - 0.5) * 0.4) * size * 0.03;
      d += ` L${x.toFixed(1)} ${y.toFixed(1)}`;
      if (rnd() > 0.75 && seg < 5) {
        d += ` M${x.toFixed(1)} ${y.toFixed(1)} l${((rnd() - 0.5) * 40).toFixed(1)} ${(20 + rnd() * 30).toFixed(1)} m0 0 l0 0`;
      }
    }
    const isMain = i === 3;
    els.push(`      <path d="${d}" fill="none" stroke="${isMain ? accent : base}" stroke-width="${isMain ? 2 : 1.1}" opacity="0.9"${isMain ? '>\n        <animate attributeName="stroke-opacity" values="0.9;0.35;0.9" dur="5s" repeatCount="indefinite" />\n      ' : ''} />`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#10101a" />
${els.join('\n')}
</svg>`;
}
