export interface FireflyGlowOptions {
  seed?: number;
  size?: number;
  flies?: number;
  body?: string;
  halo?: string;
}

export function createFireflyGlow(options: FireflyGlowOptions = {}): string {
  const { seed = 99, size = 720, flies = 16, body = '#fbbf24', halo = '#fbbf24' } = options;

  let s = seed >>> 0;
  const rnd = () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const els: string[] = [];
  for (let i = 0; i < flies; i++) {
    const x = rnd() * size;
    const y = rnd() * size;
    const rad = 3 + rnd() * 5;
    const dur = (3 + rnd() * 6).toFixed(1);
    const dx = ((rnd() - 0.5) * 120).toFixed(0);
    const dy = ((rnd() - 0.5) * 90).toFixed(0);
    els.push(`    <g>
      <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rad.toFixed(1)}" fill="${halo}" opacity="0.12">
        <animate attributeName="r" values="${rad.toFixed(1)};${(rad * 2.6).toFixed(1)};${rad.toFixed(1)}" dur="${dur}s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.05;0.22;0.05" dur="${dur}s" repeatCount="indefinite" />
      </circle>
      <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.2" fill="${body}">
        <animate attributeName="opacity" values="1;0.15;1" dur="${dur}s" repeatCount="indefinite" />
        <animateTransform attributeName="transform" type="translate" values="0 0; ${dx} ${dy}; 0 0" dur="${(+dur * 2).toFixed(1)}s" repeatCount="indefinite" />
      </circle>
    </g>`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
  <path d="M0 ${size * 0.82} Q${size * 0.25} ${size * 0.74} ${size * 0.5} ${size * 0.83} T${size} ${size * 0.8} L${size} ${size} L0 ${size} Z" fill="#101018" stroke="#27272a" stroke-width="1" />
${els.join('\n')}
</svg>`;
}
