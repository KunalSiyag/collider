export interface ShapeDnaHelixOptions {
  colors?: string[];
  size?: number;
}

export function createShapeDnaHelix(options: ShapeDnaHelixOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee'], size = 320 } = options;
  const rungs: string[] = [];
  const dotsA: string[] = [];
  const dotsB: string[] = [];

  for (let i = 0; i <= 16; i++) {
    const x = 30 + i * 17;
    const phase = i * 0.42;
    const ya = 160 + Math.sin(phase) * 62;
    const yb = 160 - Math.sin(phase) * 62;
    if (i % 2 === 0) {
      rungs.push(
        `<line x1="${x}" y1="${ya.toFixed(1)}" x2="${x}" y2="${yb.toFixed(1)}" stroke="#3f3f46" stroke-width="3"><animate attributeName="opacity" values="0.9;0.25;0.9" dur="4s" begin="${(i * 0.1).toFixed(1)}s" repeatCount="indefinite" /></line>`,
      );
    }
    dotsA.push(`<circle cx="${x}" cy="${ya.toFixed(1)}" r="5" fill="${colors[0]}"><animate attributeName="r" values="5;7;5" dur="3s" begin="${(i * 0.08).toFixed(2)}s" repeatCount="indefinite" /></circle>`);
    dotsB.push(`<circle cx="${x}" cy="${yb.toFixed(1)}" r="5" fill="${colors[1]}" />`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
${rungs.join('\n')}
${dotsA.join('')}
${dotsB.join('')}
</svg>`;
}
