export interface LotusPadsOptions {
  seed?: number;
  size?: number;
  pads?: number;
  base?: string;
  accent?: string;
}

export function createLotusPads(options: LotusPadsOptions = {}): string {
  const { seed = 76, size = 720, pads = 9, base = '#1c1c24', accent = '#f472b6' } = options;

  let s = seed >>> 0;
  const rnd = () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const els: string[] = [];
  const items: { y: number; el: string }[] = [];
  for (let i = 0; i < pads; i++) {
    const x = size * (0.12 + rnd() * 0.76);
    const y = size * (0.3 + rnd() * 0.6);
    const rx = size * (0.05 + rnd() * 0.09);
    const ry = rx * 0.42;
    const notch = rnd() > 0.5;
    const flower = rnd() > 0.72;
    items.push({
      y,
      el: `      <ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="${base}" stroke="#52525b" stroke-width="1" />` +
        (notch
          ? `      <path d="M${x.toFixed(1)} ${y.toFixed(1)} L${(x + rx).toFixed(1)} ${(y - ry * 0.9).toFixed(1)} L${(x + rx).toFixed(1)} ${(y + ry * 0.9).toFixed(1)} Z" fill="#0b0b10" />`
          : '') +
        (flower
          ? `      <g stroke="${accent}" stroke-width="1.4" fill="${accent}" fill-opacity="0.15">
          <path d="M${x.toFixed(1)} ${(y - 2).toFixed(1)} q-7 -18 0 -26 q7 8 0 26 Z" />
          <path d="M${x.toFixed(1)} ${(y - 2).toFixed(1)} q-16 -12 -14 -24 q14 2 14 24 Z" />
          <path d="M${x.toFixed(1)} ${(y - 2).toFixed(1)} q16 -12 14 -24 q-14 2 -14 24 Z">
            <animate attributeName="fill-opacity" values="0.15;0.35;0.15" dur="6s" repeatCount="indefinite" />
          </path>
        </g>`
          : ''),
    });
  }
  items.sort((a, b) => a.y - b.y);
  for (const it of items) els.push(it.el);

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
</svg>`;
}
