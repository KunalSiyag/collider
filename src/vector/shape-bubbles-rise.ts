export interface ShapeBubblesRiseOptions {
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

export function createShapeBubblesRise(options: ShapeBubblesRiseOptions = {}): string {
  const { colors = ['#22d3ee', '#67e8f9', '#a78bfa'], size = 320, count = 12, seed = 23 } = options;
  const rand = mulberry32(seed);
  const bubbles: string[] = [];

  for (let i = 0; i < count; i++) {
    const x = 20 + rand() * (size - 40);
    const r = 5 + rand() * 16;
    const dur = 4 + rand() * 4;
    const delay = (rand() * dur).toFixed(2);
    bubbles.push(
      `  <g>
    <animate attributeName="transform" type="translate" values="0 ${size + 30};0 -60" dur="${dur.toFixed(1)}s" begin="-${delay}s" repeatCount="indefinite" />
    <circle cx="${x.toFixed(0)}" cy="160" r="${r.toFixed(1)}" fill="${colors[i % colors.length]}" fill-opacity="0.18" stroke="${colors[i % colors.length]}" stroke-width="2">
      <animate attributeName="cx" values="${x.toFixed(0)};${(x + 10).toFixed(0)};${x.toFixed(0)}" dur="${(dur / 3).toFixed(1)}s" repeatCount="indefinite" />
    </circle>
  </g>`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
${bubbles.join('\n')}
</svg>`;
}
