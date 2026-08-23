export interface ShapeKaleidoWedgeOptions {
  colors?: string[];
  size?: number;
  wedges?: number;
}

export function createShapeKaleidoWedge(options: ShapeKaleidoWedgeOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6', '#a78bfa', '#67e8f9', '#fafafa'], size = 320, wedges = 12 } =
    options;
  const c = size / 2;
  const petal = 'M 160 160 L 160 34 C 196 66 200 118 160 160 Z';
  const parts: string[] = [];

  for (let i = 0; i < wedges; i++) {
    const angle = (360 / wedges) * i;
    parts.push(
      `  <path d="${petal}" fill="${colors[i % colors.length]}" transform="rotate(${angle} ${c} ${c})" />`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
<g>
  <animateTransform attributeName="transform" type="rotate" from="0 ${c} ${c}" to="360 ${c} ${c}" dur="24s" repeatCount="indefinite" />
${parts.join('\n')}
</g>
<circle cx="${c}" cy="${c}" r="16" fill="#18181b" stroke="#f472b6" stroke-width="4" />
</svg>`;
}
