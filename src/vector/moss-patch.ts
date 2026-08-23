export interface MossPatchOptions {
  seed?: number;
  size?: number;
  blades?: number;
  base?: string;
  accent?: string;
}

export function createMossPatch(options: MossPatchOptions = {}): string {
  const { seed = 61, size = 720, blades = 130, base = '#27272a', accent = '#67e8f9' } = options;

  let s = seed >>> 0;
  const rnd = () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const els: string[] = [];
  for (let i = 0; i < blades; i++) {
    const x = rnd() * size;
    const y = size - Math.pow(rnd(), 0.6) * size * 0.55;
    const h = size * (0.02 + rnd() * 0.06);
    const bend = (rnd() - 0.5) * h * 0.8;
    const color = rnd() > 0.93 ? accent : base;
    els.push(`      <path d="M${x.toFixed(1)} ${y.toFixed(1)} q${bend.toFixed(1)} ${(-h * 0.6).toFixed(1)} ${(bend * 1.4).toFixed(1)} ${(-h).toFixed(1)}" fill="none" stroke="${color}" stroke-width="${(0.8 + rnd()).toFixed(1)}" opacity="${(0.4 + rnd() * 0.55).toFixed(2)}">
        <animateTransform attributeName="transform" type="skewX" values="0;2;0;-2;0" dur="${(4 + rnd() * 5).toFixed(1)}s" repeatCount="indefinite" />
      </path>`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
</svg>`;
}
