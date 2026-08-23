export interface KelpForestOptions {
  seed?: number;
  size?: number;
  stalks?: number;
  base?: string;
  accent?: string;
}

export function createKelpForest(options: KelpForestOptions = {}): string {
  const { seed = 21, size = 720, stalks = 10, base = '#27272a', accent = '#22d3ee' } = options;

  let s = seed >>> 0;
  const rnd = () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const els: string[] = [];
  for (let i = 0; i < stalks; i++) {
    const x = size * (0.08 + (i / (stalks - 1)) * 0.84) + (rnd() - 0.5) * 20;
    const topY = size * (0.08 + rnd() * 0.25);
    const amp = 18 + rnd() * 34;
    const dur = (5 + rnd() * 5).toFixed(1);
    const color = i % 4 === 1 ? accent : base;
    els.push(`      <path d="M${x.toFixed(1)} ${size} C${(x - amp).toFixed(1)} ${(size * 0.7).toFixed(1)} ${(x + amp).toFixed(1)} ${((size * 0.7 + topY) / 2).toFixed(1)} ${(x - amp * 0.6).toFixed(1)} ${((topY + size * 0.3)).toFixed(1)}" fill="none" stroke="${color}" stroke-width="${(2 + rnd() * 2).toFixed(1)}" stroke-linecap="round">
        <animateTransform attributeName="transform" type="skewX" values="-2;2;-2" dur="${dur}s" repeatCount="indefinite" />
      </path>`);
    for (let l = 1; l <= 4; l++) {
      const ly = size - ((size - topY) * l) / 4.5;
      const side = l % 2 === 0 ? 1 : -1;
      els.push(`      <path d="M${x.toFixed(1)} ${ly.toFixed(1)} q${(side * 26).toFixed(1)} -8 ${(side * 44).toFixed(1)} 6" fill="none" stroke="${color}" stroke-width="1.6" opacity="0.85">
        <animateTransform attributeName="transform" type="rotate" values="${-3 * side} ${x.toFixed(1)} ${ly.toFixed(1)}; ${3 * side} ${x.toFixed(1)} ${ly.toFixed(1)}; ${-3 * side} ${x.toFixed(1)} ${ly.toFixed(1)}" dur="${dur}s" repeatCount="indefinite" />
      </path>`);
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
</svg>`;
}
