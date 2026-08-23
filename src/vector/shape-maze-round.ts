export interface ShapeMazeRoundOptions {
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

export function createShapeMazeRound(options: ShapeMazeRoundOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#67e8f9'], size = 320, seed = 7 } = options;
  const rand = mulberry32(seed);
  const cell = size / 8;
  const segs: string[] = [];

  for (let row = 0; row < 8; row++) {
    let d = '';
    let drawing = false;
    for (let col = 0; col < 8; col++) {
      if (rand() > 0.45) {
        const x = col * cell;
        const y = row * cell + cell / 2;
        d += drawing ? ` L ${(x + cell).toFixed(0)} ${y}` : ` M ${x} ${y} L ${(x + cell).toFixed(0)} ${y}`;
        drawing = true;
      } else {
        drawing = false;
      }
    }
    if (d) {
      const color = colors[Math.floor(rand() * colors.length)]!;
      segs.push(
        `  <path d="${d.trim()}" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round"><animate attributeName="opacity" values="0.55;1;0.55" dur="${(3 + rand() * 3).toFixed(1)}s" repeatCount="indefinite" /></path>`,
      );
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
${segs.join('\n')}
</svg>`;
}
