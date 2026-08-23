export interface LanternFestivalOptions {
  seed?: number;
  size?: number;
  lanterns?: number;
  glow?: string;
  accent?: string;
}

export function createLanternFestival(options: LanternFestivalOptions = {}): string {
  const { seed = 58, size = 720, lanterns = 9, glow = '#fbbf24', accent = '#f472b6' } = options;

  let s = seed >>> 0;
  const rnd = () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const els: string[] = [];
  for (let i = 0; i < lanterns; i++) {
    const x = size * (0.1 + rnd() * 0.8);
    const y = size * (0.15 + rnd() * 0.6);
    const w = size * (0.03 + rnd() * 0.03);
    const h = w * 1.3;
    const color = i % 4 === 1 ? accent : glow;
    els.push(`      <g>
        <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${w.toFixed(1)}" fill="${color}" opacity="0.12">
          <animate attributeName="r" values="${w.toFixed(1)};${(w * 1.8).toFixed(1)};${w.toFixed(1)}" dur="${(4 + rnd() * 4).toFixed(1)}s" repeatCount="indefinite" />
        </circle>
        <ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(w * 0.7).toFixed(1)}" ry="${h.toFixed(1)}" fill="${color}" fill-opacity="0.55" stroke="#52525b" stroke-width="1" />
        <line x1="${(x - w * 0.7).toFixed(1)}" y1="${(y - h).toFixed(1)}" x2="${(x + w * 0.7).toFixed(1)}" y2="${(y - h).toFixed(1)}" stroke="#52525b" stroke-width="2" />
      </g>`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
</svg>`;
}
