export interface ShapeCornerRippleOptions {
  colors?: string[];
  size?: number;
}

export function createShapeCornerRipple(options: ShapeCornerRippleOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6'], size = 320 } = options;
  const arcs: string[] = [];

  for (let i = 0; i < 6; i++) {
    const r = 40 + i * 46;
    arcs.push(
      `  <path d="M ${r} 0 A ${r} ${r} 0 0 1 0 ${r}" fill="none" stroke="${colors[i % colors.length]}" stroke-width="12" stroke-linecap="round" opacity="${(1 - i * 0.11).toFixed(2)}">
    <animate attributeName="opacity" values="${(1 - i * 0.11).toFixed(2)};${(0.2).toFixed(2)};${(1 - i * 0.11).toFixed(2)}" dur="3.6s" begin="${(i * 0.3).toFixed(1)}s" repeatCount="indefinite" />
  </path>`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#18181b" />
<g transform="rotate(-14 0 0)">
${arcs.join('\n')}
</g>
</svg>`;
}
