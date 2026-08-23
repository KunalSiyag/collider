export interface BambooGroveOptions {
  seed?: number;
  size?: number;
  stalks?: number;
  base?: string;
  accent?: string;
}

export function createBambooGrove(options: BambooGroveOptions = {}): string {
  const { seed = 82, size = 720, stalks = 9, base = '#27272a', accent = '#67e8f9' } = options;

  let s = seed >>> 0;
  const rnd = () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const els: string[] = [];
  for (let i = 0; i < stalks; i++) {
    const x = size * (0.08 + (i / (stalks - 1)) * 0.84) + (rnd() - 0.5) * 26;
    const w = size * (0.008 + rnd() * 0.01);
    const lean = (rnd() - 0.5) * size * 0.05;
    const topY = size * (0.02 + rnd() * 0.12);
    const color = i % 3 === 1 ? '#3f3f46' : base;
    els.push(`      <path d="M${x.toFixed(1)} ${size} L${(x + lean).toFixed(1)} ${topY.toFixed(1)}" stroke="${color}" stroke-width="${(w * 2).toFixed(1)}" />`);
    const segs = 7;
    for (let n = 1; n < segs; n++) {
      const t = n / segs;
      const ny = size + (topY - size) * t;
      const nx = x + lean * t;
      els.push(`      <line x1="${(nx - w).toFixed(1)}" y1="${ny.toFixed(1)}" x2="${(nx + w).toFixed(1)}" y2="${ny.toFixed(1)}" stroke="#18181b" stroke-width="3" />`);
      if (n % 2 === 1) {
        const side = n % 4 === 1 ? 1 : -1;
        els.push(`      <path d="M${nx.toFixed(1)} ${ny.toFixed(1)} q${(side * 30).toFixed(1)} ${(8 + rnd() * 8).toFixed(1)} ${(side * 58).toFixed(1)} ${(-6 - rnd() * 10).toFixed(1)}" fill="none" stroke="${i === stalks - 1 ? accent : '#3f3f46'}" stroke-width="1.5">
          <animateTransform attributeName="transform" type="rotate" values="-2 ${nx.toFixed(1)} ${ny.toFixed(1)}; 2 ${nx.toFixed(1)} ${ny.toFixed(1)}; -2 ${nx.toFixed(1)} ${ny.toFixed(1)}" dur="${(5 + rnd() * 4).toFixed(1)}s" repeatCount="indefinite" />
        </path>`);
      }
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
</svg>`;
}
