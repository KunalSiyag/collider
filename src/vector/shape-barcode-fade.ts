export interface ShapeBarcodeFadeOptions {
  colors?: string[];
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

export function createShapeBarcodeFade(options: ShapeBarcodeFadeOptions = {}): string {
  const { colors = ['#fafafa', '#8b5cf6'], size = 320, seed = 88 } = options;
  const rand = mulberry32(seed);
  const bars: string[] = [];
  let x = 30;

  while (x < size - 40) {
    const w = 2 + rand() * 9;
    const fade = 1 - (x / size) * 0.75;
    bars.push(
      `<rect x="${x.toFixed(1)}" y="70" width="${w.toFixed(1)}" height="180" fill="${rand() > 0.82 ? colors[1] : colors[0]}" opacity="${fade.toFixed(2)}"><animate attributeName="height" values="180;${(150 + rand() * 20).toFixed(0)};180" dur="${(4 + rand() * 4).toFixed(1)}s" repeatCount="indefinite" /><animate attributeName="y" values="70;${(85).toFixed(0)};70" dur="0.01s" fill="freeze" /></rect>`,
    );
    x += w + 3 + rand() * 7;
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
${bars.join('\n')}
</svg>`;
}
