export interface EmberRiseOptions {
  seed?: number;
  size?: number;
  embers?: number;
  hot?: string;
  cool?: string;
}

export function createEmberRise(options: EmberRiseOptions = {}): string {
  const { seed = 19, size = 720, embers = 40, hot = '#fbbf24', cool = '#f472b6' } = options;

  let s = seed >>> 0;
  const rnd = () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const els: string[] = [];
  els.push(`      <path d="M0 ${size} L${(size * 0.2).toFixed(0)} ${(size * 0.9).toFixed(0)} L${(size * 0.45).toFixed(0)} ${(size * 0.97).toFixed(0)} L${(size * 0.7).toFixed(0)} ${(size * 0.88).toFixed(0)} L${size} ${(size * 0.94).toFixed(0)} L${size} ${size} Z" fill="#18181b" stroke="#3f3f46" stroke-width="1" />`);
  for (let i = 0; i < embers; i++) {
    const x = rnd() * size;
    const y = size * (0.75 + rnd() * 0.2);
    const r = 1.4 + rnd() * rnd() * 3;
    const color = rnd() > 0.5 ? hot : cool;
    const rise = size * (0.35 + rnd() * 0.55);
    const sway = ((rnd() - 0.5) * 90).toFixed(0);
    const dur = (3 + rnd() * 6).toFixed(1);
    els.push(`      <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${color}" opacity="0.85">
        <animate attributeName="cy" values="${y.toFixed(1)};${(y - rise).toFixed(1)}" dur="${dur}s" repeatCount="indefinite" />
        <animate attributeName="cx" values="${x.toFixed(1)};${(+x + +sway).toFixed(1)};${x.toFixed(1)}" dur="${(+dur * 1.4).toFixed(1)}s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;0.9;0" dur="${dur}s" repeatCount="indefinite" />
      </circle>`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
</svg>`;
}
