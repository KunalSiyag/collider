export interface MeteorShowerOptions {
  seed?: number;
  size?: number;
  meteors?: number;
  stroke?: string;
  accent?: string;
}

export function createMeteorShower(options: MeteorShowerOptions = {}): string {
  const { seed = 71, size = 720, meteors = 12, stroke = '#3f3f46', accent = '#67e8f9' } = options;

  let s = seed >>> 0;
  const rnd = () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const els: string[] = [];
  for (let i = 0; i < meteors; i++) {
    const x = rnd() * size * 1.1 - size * 0.05;
    const y = rnd() * size * 0.5;
    const len = size * (0.08 + rnd() * 0.14);
    const dx = len;
    const dy = len * 0.55;
    const color = i % 4 === 0 ? accent : stroke;
    els.push(`      <line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${(x + dx).toFixed(1)}" y2="${(y + dy).toFixed(1)}" stroke="${color}" stroke-width="${i % 4 === 0 ? 2.2 : 1.2}" stroke-linecap="round" opacity="0.8">
        <animateTransform attributeName="transform" type="translate" values="0 0; ${(-dx * 3).toFixed(0)} ${(-dy * 3).toFixed(0)}" dur="${(1.6 + rnd() * 2.4).toFixed(2)}s" repeatCount="indefinite" />
      </line>`);
    if (i % 4 === 0) {
      els.push(`      <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6" fill="${accent}">
        <animate attributeName="opacity" values="1;0;1" dur="${(1.6 + rnd()).toFixed(1)}s" repeatCount="indefinite" />
      </circle>`);
    }
  }
  for (let i = 0; i < 50; i++) {
    els.push(`      <circle cx="${(rnd() * size).toFixed(1)}" cy="${(rnd() * size).toFixed(1)}" r="${(rnd() * 1.2 + 0.3).toFixed(2)}" fill="#d4d4d8" opacity="${(0.2 + rnd() * 0.5).toFixed(2)}" />`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
</svg>`;
}
