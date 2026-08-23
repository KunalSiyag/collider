export interface BirdFlockOptions {
  seed?: number;
  size?: number;
  birds?: number;
  stroke?: string;
  accent?: string;
}

export function createBirdFlock(options: BirdFlockOptions = {}): string {
  const { seed = 90, size = 720, birds = 18, stroke = '#3f3f46', accent = '#e4e4e7' } = options;

  let s = seed >>> 0;
  const rnd = () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const els: string[] = [];
  for (let i = 0; i < birds; i++) {
    const x = size * 0.1 + rnd() * size * 0.8;
    const y = size * 0.12 + rnd() * size * 0.55;
    const w = size * (0.02 + rnd() * 0.03);
    const flap = (2.5 + rnd() * 3).toFixed(2);
    const color = i % 6 === 0 ? accent : stroke;
    els.push(`      <g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${(0.7 + rnd() * 0.7).toFixed(2)})">
        <path d="M-${w.toFixed(1)} 0 Q-${(w * 0.5).toFixed(1)} -${(w * 0.7).toFixed(1)} 0 0 Q${(w * 0.5).toFixed(1)} -${(w * 0.7).toFixed(1)} ${w.toFixed(1)} 0" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round">
          <animateTransform attributeName="transform" type="scale" values="1 1; 1 0.45; 1 1" dur="${flap}s" repeatCount="indefinite" />
        </path>
        <animateTransform attributeName="transform" type="translate" from="${x.toFixed(1)} ${y.toFixed(1)}" to="${(x + 40).toFixed(1)} ${(y - 24).toFixed(1)}" dur="${(12 + rnd() * 10).toFixed(1)}s" repeatCount="indefinite" additive="replace" />
      </g>`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
  <circle cx="${size * 0.78}" cy="${size * 0.2}" r="${size * 0.07}" fill="#27272a" />
${els.join('\n')}
</svg>`;
}
