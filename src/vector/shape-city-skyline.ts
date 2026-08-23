export interface ShapeCitySkylineOptions {
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

export function createShapeCitySkyline(options: ShapeCitySkylineOptions = {}): string {
  const { colors = ['#8b5cf6', '#facc15'], size = 320, seed = 31 } = options;
  const rand = mulberry32(seed);
  const buildings: string[] = [];
  let x = 0;

  while (x < size) {
    const w = 30 + rand() * 40;
    const h = 60 + rand() * 150;
    buildings.push(
      `<rect x="${x.toFixed(0)}" y="${(320 - h).toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="#18181b" stroke="#27272a" />`,
    );
    const rows = Math.floor(h / 34);
    for (let r = 0; r < rows; r++) {
      if (rand() > 0.45) continue;
      buildings.push(
        `<rect x="${(x + w * 0.25).toFixed(1)}" y="${(320 - h + 12 + r * 34).toFixed(0)}" width="8" height="10" fill="${colors[1]}"><animate attributeName="opacity" values="1;0.2;1" dur="${(3 + rand() * 4).toFixed(1)}s" begin="-${(rand() * 3).toFixed(1)}s" repeatCount="indefinite" /></rect>`,
      );
    }
    x += w + rand() * 8;
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
<circle cx="250" cy="70" r="24" fill="${colors[0]}" opacity="0.9"><animate attributeName="opacity" values="0.9;0.6;0.9" dur="5s" repeatCount="indefinite" /></circle>
${buildings.join('\n')}
</svg>`;
}
