export interface LunarCratersOptions {
  seed?: number;
  size?: number;
  craters?: number;
  surface?: string;
  rim?: string;
}

export function createLunarCraters(options: LunarCratersOptions = {}): string {
  const { seed = 40, size = 720, craters = 12, surface = '#18181b', rim = '#3f3f46' } = options;

  let s = seed >>> 0;
  const rnd = () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const c = size / 2;
  const R = size * 0.36;
  const els: string[] = [];
  for (let i = 0; i < craters; i++) {
    const a = rnd() * Math.PI * 2;
    const d = Math.sqrt(rnd()) * R * 0.82;
    const x = c + Math.cos(a) * d;
    const y = c + Math.sin(a) * d;
    const r = size * (0.02 + rnd() * rnd() * 0.07);
    els.push(`      <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="#101016" stroke="${rim}" stroke-width="1.2" />`);
    els.push(`      <path d="M${(x - r).toFixed(1)} ${y.toFixed(1)} A${r.toFixed(1)} ${(r * 0.45).toFixed(1)} 0 0 0 ${(x + r).toFixed(1)} ${y.toFixed(1)}" fill="none" stroke="#27272a" stroke-width="1" opacity="0.8" />`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
  <circle cx="${c}" cy="${c}" r="${R}" fill="${surface}" stroke="${rim}" stroke-width="2" />
  <g>
${els.join('\n')}
  </g>
</svg>`;
}
