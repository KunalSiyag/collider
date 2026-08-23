export interface ShapeFeatherBarbOptions {
  colors?: string[];
  size?: number;
}

export function createShapeFeatherBarb(options: ShapeFeatherBarbOptions = {}): string {
  const { colors = ['#a78bfa', '#67e8f9'], size = 320 } = options;
  const barbs: string[] = [];

  for (let i = 0; i < 11; i++) {
    const t = i / 10;
    const x = 70 + t * 180;
    const y = 250 - t * 170;
    const len = 46 * Math.sin(t * Math.PI * 0.9 + 0.25);
    barbs.push(
      `<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${(x - len * 0.75).toFixed(1)}" y2="${(y - len).toFixed(1)}" stroke="${colors[i % 2]}" stroke-width="3.5" stroke-linecap="round">
      <animate attributeName="opacity" values="1;0.45;1" dur="${(2.6 + i * 0.18).toFixed(2)}s" begin="${(i * 0.08).toFixed(2)}s" repeatCount="indefinite" />
    </line>`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
<g transform="rotate(-18 160 160)">
${barbs.join('\n')}
<path d="M 62 258 Q 160 165 262 66" fill="none" stroke="#fafafa" stroke-width="4" stroke-linecap="round">
  <animate attributeName="stroke-dasharray" values="0 300;300 0" dur="5s" repeatCount="indefinite" />
</path>
</g>
</svg>`;
}
