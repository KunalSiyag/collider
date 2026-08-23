export interface MushroomRingOptions {
  seed?: number;
  size?: number;
  count?: number;
  cap?: string;
  stem?: string;
  accent?: string;
}

export function createMushroomRing(options: MushroomRingOptions = {}): string {
  const { seed = 37, size = 720, count = 9, cap = '#3f3f46', stem: stemColor = '#27272a', accent = '#8b5cf6' } = options;

  let s = seed >>> 0;
  const rnd = () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const cx = size / 2;
  const cy = size * 0.62;
  const R = size * 0.26;
  const items: { y: number; el: string }[] = [];

  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2 + rnd() * 0.3;
    const x = cx + Math.cos(a) * R;
    const baseY = cy + Math.sin(a) * R * 0.5 + rnd() * 10;
    const h = size * (0.05 + rnd() * 0.09);
    const capR = h * 1.1;
    const isAccent = i % 4 === 2;
    const capColor = isAccent ? accent : cap;
    const topY = baseY - h;
    items.push({
      y: baseY,
      el:
        `      <rect x="${(x - capR * 0.16).toFixed(1)}" y="${topY.toFixed(1)}" width="${(capR * 0.32).toFixed(1)}" height="${h.toFixed(1)}" rx="${(capR * 0.12).toFixed(1)}" fill="${stemColor}" stroke="#52525b" stroke-width="0.8" />` +
        `      <path d="M${(x - capR).toFixed(1)} ${topY.toFixed(1)} A${capR.toFixed(1)} ${(capR * 0.75).toFixed(1)} 0 0 1 ${(x + capR).toFixed(1)} ${topY.toFixed(1)} Q${x.toFixed(1)} ${(topY + capR * 0.28).toFixed(1)} ${(x - capR).toFixed(1)} ${topY.toFixed(1)} Z" fill="${capColor}"${isAccent ? ' fill-opacity="0.45"' : ''} stroke="${isAccent ? accent : '#52525b'}" stroke-width="1.2">
          <animate attributeName="opacity" values="1;0.6;1" dur="${(4 + rnd() * 4).toFixed(1)}s" repeatCount="indefinite" />
        </path>`,
    });
  }
  items.sort((a, b) => a.y - b.y);

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
  <ellipse cx="${cx}" cy="${cy}" rx="${R * 1.3}" ry="${R * 0.55}" fill="#10101a" stroke="#27272a" stroke-width="1" />
${items.map((it) => it.el).join('\n')}
</svg>`;
}
