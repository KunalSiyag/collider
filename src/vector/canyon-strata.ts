export interface CanyonStrataOptions {
  seed?: number;
  size?: number;
  layers?: number;
  base?: string;
  accent?: string;
}

export function createCanyonStrata(options: CanyonStrataOptions = {}): string {
  const { seed = 25, size = 720, layers = 12, base = '#1c1c24', accent = '#f472b6' } = options;

  let s = seed >>> 0;
  const rnd = () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const els: string[] = [];
  for (let l = 0; l < layers; l++) {
    const yTop = size * (0.08 + (l / layers) * 0.86);
    const h = size * (0.05 + rnd() * 0.04);
    const isAccent = l === Math.floor(layers * 0.7);
    const color = isAccent ? accent : base;
    const jag = [];
    const segs = 14;
    let d = `M0 ${(yTop + rnd() * 8).toFixed(1)}`;
    for (let p = 1; p <= segs; p++) {
      d += ` L${((p / segs) * size).toFixed(1)} ${(yTop + (rnd() - 0.5) * 14).toFixed(1)}`;
    }
    void jag;
    d += ` L${size} ${(yTop + h).toFixed(1)} L0 ${(yTop + h).toFixed(1)} Z`;
    els.push(`      <path d="${d}" fill="${color}" fill-opacity="${isAccent ? 0.45 : 0.85}" stroke="#3f3f46" stroke-width="1"${isAccent ? '>\n        <animate attributeName="fill-opacity" values="0.45;0.75;0.45" dur="6s" repeatCount="indefinite" />\n      ' : ''} />`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
</svg>`;
}
