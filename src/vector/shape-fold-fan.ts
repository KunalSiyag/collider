export interface ShapeFoldFanOptions {
  colors?: string[];
  size?: number;
}

export function createShapeFoldFan(options: ShapeFoldFanOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6', '#a78bfa', '#67e8f9'], size = 320 } = options;
  const blades: string[] = [];

  for (let i = 0; i < 5; i++) {
    const angle = -60 + i * 30;
    blades.push(
      `  <g transform="rotate(${angle} 160 280)">
    <animateTransform attributeName="transform" type="rotate" values="${angle} 160 280;${angle + 14} 160 280;${angle} 160 280" dur="${(3.5 + i * 0.4).toFixed(1)}s" begin="${(i * 0.12).toFixed(2)}s" repeatCount="indefinite" additive="sum" />
    <path d="M 160 280 L 148 90 A 190 190 0 0 1 172 90 Z" fill="${colors[i % colors.length]}" />
  </g>`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
${blades.join('\n')}
<circle cx="160" cy="280" r="18" fill="#fafafa" />
<circle cx="160" cy="280" r="8" fill="#18181b" />
</svg>`;
}
