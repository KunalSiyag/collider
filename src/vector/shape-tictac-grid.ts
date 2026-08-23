export interface ShapeTicTacGridOptions {
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

export function createShapeTicTacGrid(options: ShapeTicTacGridOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee'], size = 320, seed = 4 } = options;
  const rand = mulberry32(seed);
  const marks: string[] = [];

  const cells = [0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => [r, c] as [number, number]));
  for (const [r, c] of cells) {
    const x = 60 + c * 80;
    const y = 60 + r * 80;
    const isX = rand() > 0.5;
    if (isX) {
      marks.push(
        `  <g stroke="${colors[0]}" stroke-width="8" stroke-linecap="round"><line x1="${x - 22}" y1="${y - 22}" x2="${x + 22}" y2="${y + 22}" /><line x1="${x + 22}" y1="${y - 22}" x2="${x - 22}" y2="${y + 22}" /><animate attributeName="opacity" values="1;0.75;1" dur="3s" begin="${(rand() * 2).toFixed(1)}s" repeatCount="indefinite" /></g>`,
      );
    } else {
      marks.push(
        `  <circle cx="${x}" cy="${y}" r="24" fill="none" stroke="${colors[1]}" stroke-width="8"><animate attributeName="stroke-dasharray" values="0 151;151 0" dur="1.8s" begin="${(rand() * 1.5).toFixed(1)}s" repeatCount="indefinite" /></circle>`,
      );
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
<g stroke="#27272a" stroke-width="4">
  <line x1="140" y1="30" x2="140" y2="290" /><line x1="220" y1="30" x2="220" y2="290" />
  <line x1="30" y1="140" x2="290" y2="140" /><line x1="30" y1="220" x2="290" y2="220" />
</g>
${marks.join('\n')}
</svg>`;
}
