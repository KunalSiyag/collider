export interface ShapeInkblotSymmetryOptions {
  color?: string;
  size?: number;
  seed?: number;
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createShapeInkblotSymmetry(options: ShapeInkblotSymmetryOptions = {}): string {
  const { color = '#8b5cf6', size = 320, seed = 71 } = options;
  const rand = mulberry32(seed);
  let d = 'M 160 70';

  for (let i = 1; i <= 6; i++) {
    const y = 70 + i * 30;
    const x = 160 + rand() * 90 + 10;
    const cx = 160 + rand() * 110 + 15;
    d += ` C ${cx.toFixed(0)} ${(y - 22).toFixed(0)}, ${(cx - 18).toFixed(0)} ${(y + 14).toFixed(0)}, ${x.toFixed(0)} ${y}`;
  }
  d += ' C 200 280, 120 280, 160 70 Z';

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
<g>
  <animateTransform attributeName="transform" type="scale" values="1 1;1.04 0.97;1 1" additive="sum" dur="9s" repeatCount="indefinite" />
  <path d="${d}" fill="${color}" opacity="0.92" />
  <use href="#ink-half" transform="scale(-1 1) translate(-320 0)" />
</g>
<path id="ink-half" d="${d}" fill="${color}" opacity="0.55" transform="translate(320 0) scale(-1 1)" />
<line x1="160" y1="30" x2="160" y2="290" stroke="#3f3f46" stroke-width="2" stroke-dasharray="4 6" />
</svg>`;
}
