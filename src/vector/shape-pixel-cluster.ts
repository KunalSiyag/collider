export interface ShapePixelClusterOptions {
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

export function createShapePixelCluster(options: ShapePixelClusterOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6', '#a78bfa'], size = 320, seed = 42 } = options;
  const rand = mulberry32(seed);
  const cell = size / 10;
  const px: string[] = [];

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const dist = Math.hypot(col - 4.5, row - 4.5);
      if (rand() > dist / 7.5) {
        const color = colors[Math.floor(rand() * colors.length)]!;
        const blink = rand() > 0.75;
        const anim = blink
          ? `<animate attributeName="opacity" values="1;0.2;1" dur="${(1.5 + rand() * 2).toFixed(1)}s" repeatCount="indefinite" />`
          : '';
        px.push(
          `  <rect x="${col * cell + 1}" y="${row * cell + 1}" width="${cell - 2}" height="${cell - 2}" rx="3" fill="${color}" opacity="${(0.5 + rand() * 0.5).toFixed(2)}">${anim}</rect>`,
        );
      }
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
${px.join('\n')}
</svg>`;
}
