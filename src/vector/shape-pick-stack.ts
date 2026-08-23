export interface ShapePickStackOptions {
  colors?: string[];
  size?: number;
}

export function createShapePickStack(options: ShapePickStackOptions = {}): string {
  const { colors = ['#f472b6', '#8b5cf6', '#22d3ee'], size = 320 } = options;
  const picks: string[] = [];

  for (let i = 0; i < 3; i++) {
    const dx = i * 34 - 34;
    const dy = i * 26 - 26;
    picks.push(
      `  <path d="M ${(160 + dx).toFixed(0)} ${(90 + dy).toFixed(0)} c 44 6 66 40 62 78 c -4 42 -30 76 -62 96 c -32 -20 -58 -54 -62 -96 c -4 -38 18 -72 62 -78 Z" fill="${colors[i]}" opacity="${(1 - i * 0.15).toFixed(2)}" stroke="#18181b" stroke-width="5">
    <animateTransform attributeName="transform" type="translate" values="0 0;0 ${-4 - i};0 0" dur="${(4 + i * 0.7).toFixed(1)}s" repeatCount="indefinite" />
  </path>`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
${picks.join('\n')}
<circle cx="160" cy="196" r="10" fill="#0b0b10" opacity="0.6" />
</svg>`;
}
