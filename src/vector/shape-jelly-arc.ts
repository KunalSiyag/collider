export interface ShapeJellyArcOptions {
  colors?: string[];
  size?: number;
}

export function createShapeJellyArc(options: ShapeJellyArcOptions = {}): string {
  const { colors = ['#f472b6', '#a78bfa'], size = 320 } = options;
  const tentacles: string[] = [];

  for (let i = 0; i < 5; i++) {
    const x = 92 + i * 34;
    const sway = i % 2 === 0 ? 14 : -14;
    tentacles.push(
      `  <path d="M ${x} 172 q ${sway} 40 ${-sway / 2} 76 q ${-sway / 2} 32 ${sway} 60" fill="none" stroke="${colors[i % 2]}" stroke-width="4.5" stroke-linecap="round" opacity="${(1 - (i % 3) * 0.15).toFixed(2)}">
    <animate attributeName="d" values="M ${x} 172 q ${sway} 40 ${-sway / 2} 76 q ${-sway / 2} 32 ${sway} 60;M ${x} 172 q ${-sway} 40 ${sway / 2} 76 q ${sway / 2} 32 ${-sway} 60;M ${x} 172 q ${sway} 40 ${-sway / 2} 76 q ${-sway / 2} 32 ${sway} 60" dur="${(3 + i * 0.35).toFixed(2)}s" begin="${(i * 0.2).toFixed(1)}s" repeatCount="indefinite" />
  </path>`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
<g>
  <animateTransform attributeName="transform" type="translate" values="0 -6;0 6;0 -6" dur="5s" repeatCount="indefinite" />
  <path d="M 78 176 A 84 84 0 0 1 246 176 Z" fill="${colors[0]}" opacity="0.9">
    <animate attributeName="opacity" values="0.9;0.65;0.9" dur="4s" repeatCount="indefinite" />
  </path>
  <path d="M 96 176 A 66 66 0 0 1 228 176 Z" fill="#18181b" opacity="0.55" />
  <path d="M 78 176 A 84 84 0 0 1 246 176" fill="none" stroke="${colors[1]}" stroke-width="4" stroke-dasharray="8 8">
    <animate attributeName="stroke-dashoffset" from="-16" to="16" dur="2.4s" repeatCount="indefinite" />
  </path>
${tentacles.join('\n')}
</g>
</svg>`;
}
