export interface RainVeilOptions {
  seed?: number;
  size?: number;
  drops?: number;
  stroke?: string;
  accent?: string;
}

export function createRainVeil(options: RainVeilOptions = {}): string {
  const { seed = 31, size = 720, drops = 90, stroke = '#3f3f46', accent = '#67e8f9' } = options;

  let t = seed >>> 0;
  const rand = () => {
    t |= 0; t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const lines: string[] = [];
  for (let i = 0; i < drops; i++) {
    const x = rand() * (size + 80) - 40;
    const y = rand() * size;
    const len = 14 + rand() * 34;
    const tilt = len * 0.28;
    const color = rand() > 0.9 ? accent : stroke;
    const op = 0.25 + rand() * 0.6;
    lines.push(
      `    <line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${(x - tilt).toFixed(1)}" y2="${(y + len).toFixed(1)}" stroke="${color}" stroke-width="${rand() > 0.8 ? 1.6 : 1}" opacity="${op.toFixed(2)}">
      <animateTransform attributeName="transform" type="translate" values="0 -40; -12 ${size * 0.5}" dur="${(1.4 + rand() * 2.6).toFixed(2)}s" repeatCount="indefinite" />
    </line>`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${lines.join('\n')}
</svg>`;
}
