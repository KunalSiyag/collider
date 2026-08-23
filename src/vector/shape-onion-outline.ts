export interface ShapeOnionOutlineOptions {
  colors?: string[];
  size?: number;
  layers?: number;
}

export function createShapeOnionOutline(options: ShapeOnionOutlineOptions = {}): string {
  const { colors = ['#8b5cf6', '#a78bfa', '#67e8f9', '#22d3ee'], size = 320, layers = 5 } = options;
  const proto = 'M 160 60 C 230 55, 272 110, 258 172 C 246 228, 210 264, 158 262 C 104 260, 62 220, 66 156 C 70 100, 104 64, 160 60 Z';
  const rings: string[] = [];

  for (let i = 0; i < layers; i++) {
    const s = 1 - i * 0.16;
    const tx = (160 * (1 - s)).toFixed(1);
    const ty = (161 * (1 - s)).toFixed(1);
    rings.push(
      `  <path d="${proto}" fill="none" stroke="${colors[i % colors.length]}" stroke-width="4" transform="translate(${tx} ${ty}) scale(${s.toFixed(2)})"><animateTransform attributeName="transform" type="scale" values="1;${(1.03).toFixed(2)};1" additive="sum" dur="${(4 + i * 0.5).toFixed(1)}s" repeatCount="indefinite" /><animate attributeName="stroke-opacity" values="1;0.5;1" dur="${(4 + i * 0.5).toFixed(1)}s" repeatCount="indefinite" /></path>`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#18181b" />
${rings.join('\n')}
<circle cx="160" cy="161" r="10" fill="#f472b6"><animate attributeName="r" values="10;15;10" dur="4s" repeatCount="indefinite" /></circle>
</svg>`;
}
