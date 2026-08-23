export interface ShapeConstellationLinksOptions {
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

export function createShapeConstellationLinks(options: ShapeConstellationLinksOptions = {}): string {
  const { colors = ['#fafafa', '#67e8f9', '#a78bfa'], size = 320, seed = 99 } = options;
  const rand = mulberry32(seed);
  const stars: [number, number, number][] = [];

  for (let i = 0; i < 9; i++) {
    stars.push([40 + rand() * 240, 40 + rand() * 240, i === 0 ? 5 : 2 + rand() * 3]);
  }

  const links: string[] = [];
  for (let i = 0; i < stars.length - 1; i++) {
    const [x1, y1] = stars[i]!;
    const [x2, y2] = stars[i + 1]!;
    links.push(
      `<line x1="${x1.toFixed(0)}" y1="${y1.toFixed(0)}" x2="${x2.toFixed(0)}" y2="${y2.toFixed(0)}" stroke="#27272a" stroke-width="1.5"><animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="${(3 + i * 0.4).toFixed(1)}s" repeatCount="indefinite" /></line>`,
    );
  }

  const dots = stars
    .map(
      ([x, y, r], i) =>
        `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}" fill="${colors[i % colors.length]}"><animate attributeName="opacity" values="1;0.3;1" dur="${(2 + rand() * 2).toFixed(1)}s" begin="${(rand() * 2).toFixed(1)}s" repeatCount="indefinite" /></circle>`,
    )
    .join('');

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
${links.join('\n')}
${dots}
</svg>`;
}
