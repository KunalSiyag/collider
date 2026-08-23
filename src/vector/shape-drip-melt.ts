export interface ShapeDripMeltOptions {
  colors?: string[];
  size?: number;
}

export function createShapeDripMelt(options: ShapeDripMeltOptions = {}): string {
  const { colors = ['#8b5cf6', '#a78bfa'], size = 320 } = options;
  const drips: string[] = [];

  for (let i = 0; i < 7; i++) {
    const x = 40 + i * 40;
    const len = 30 + ((i * 37) % 60);
    drips.push(
      `  <path d="M ${x} 120 L ${x + 16} 120 L ${x + 16} ${120 + len} a 8 8 0 0 1 -16 0 Z" fill="${i % 2 === 0 ? colors[0] : colors[1]}">
    <animate attributeName="d" values="M ${x} 120 L ${x + 16} 120 L ${x + 16} ${120 + len} a 8 8 0 0 1 -16 0 Z;M ${x} 120 L ${x + 16} 120 L ${x + 16} ${(120 + len * 1.3).toFixed(0)} a 8 8 0 0 1 -16 0 Z;M ${x} 120 L ${x + 16} 120 L ${x + 16} ${120 + len} a 8 8 0 0 1 -16 0 Z" dur="${(4 + i * 0.5).toFixed(1)}s" begin="${(i * 0.3).toFixed(1)}s" repeatCount="indefinite" />
  </path>`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#18181b" />
<path d="M 20 60 Q 160 40 300 60 L 300 122 Q 160 108 20 122 Z" fill="${colors[0]}" />
${drips.join('\n')}
</svg>`;
}
