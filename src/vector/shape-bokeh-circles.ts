export interface ShapeBokehCirclesOptions {
  colors?: string[];
  size?: number;
  count?: number;
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

export function createShapeBokehCircles(options: ShapeBokehCirclesOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6', '#facc15'], size = 320, count = 10, seed = 77 } = options;
  const rand = mulberry32(seed);
  const circles: string[] = [];

  for (let i = 0; i < count; i++) {
    const x = rand() * size;
    const y = rand() * size;
    const r = 16 + rand() * 46;
    circles.push(
      `  <circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(0)}" fill="${colors[Math.floor(rand() * colors.length)]}" opacity="${(0.12 + rand() * 0.22).toFixed(2)}" stroke="${colors[i % colors.length]}" stroke-opacity="0.35">
    <animate attributeName="opacity" values="${(0.12 + rand() * 0.22).toFixed(2)};${(0.3 + rand() * 0.15).toFixed(2)};${(0.12 + rand() * 0.22).toFixed(2)}" dur="${(4 + rand() * 5).toFixed(1)}s" begin="-${(rand() * 4).toFixed(1)}s" repeatCount="indefinite" />
    <animate attributeName="cy" values="${y.toFixed(0)};${(y - 14).toFixed(0)};${y.toFixed(0)}" dur="${(6 + rand() * 5).toFixed(1)}s" repeatCount="indefinite" />
  </circle>`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
${circles.join('\n')}
</svg>`;
}
