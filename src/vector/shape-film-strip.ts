export interface ShapeFilmStripOptions {
  colors?: string[];
  size?: number;
}

export function createShapeFilmStrip(options: ShapeFilmStripOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6'], size = 320 } = options;
  const frames: string[] = [];

  for (let i = 0; i < 4; i++) {
    const x = i * 80;
    frames.push(
      `<rect x="${x + 8}" y="112" width="64" height="96" rx="4" fill="${colors[i % colors.length]}" opacity="0.85"><animate attributeName="fill-opacity" values="0.85;0.5;0.85" dur="${(3 + i).toFixed(0)}s" repeatCount="indefinite" /></rect>`,
    );
  }

  const holes: string[] = [];
  for (let i = 0; i < 16; i++) {
    const x = ((i * 22) % 320);
    holes.push(`<rect x="${x}" y="88" width="10" height="12" rx="2" fill="#fafafa" opacity="0.9" />`);
    holes.push(`<rect x="${x}" y="220" width="10" height="12" rx="2" fill="#fafafa" opacity="0.9" />`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
<rect x="0" y="76" width="320" height="168" fill="#18181b" />
<g>
  <animateTransform attributeName="transform" type="translate" values="-80 0;0 0;-80 0" dur="4s" repeatCount="indefinite" />
${frames.join('\n')}
${holes.join('')}
</g>
</svg>`;
}
