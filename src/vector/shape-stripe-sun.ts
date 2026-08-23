export interface ShapeStripeSunOptions {
  colors?: string[];
  size?: number;
}

export function createShapeStripeSun(options: ShapeStripeSunOptions = {}): string {
  const { colors = ['#f472b6', '#0b0b10'], size = 320 } = options;
  const stripes: string[] = [];

  for (let i = 0; i < 9; i++) {
    const w = 10 + i * 4;
    const x = 160 - (w * 9) / 2 + i * w;
    stripes.push(
      `  <rect x="${x.toFixed(1)}" y="70" width="${(w * 0.55).toFixed(1)}" height="90" fill="${i % 2 === 0 ? colors[0] : colors[1]}" />`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#18181b" />
<defs>
  <clipPath id="ss-clip"><path d="M 60 160 A 100 100 0 0 1 260 160 Z" /></clipPath>
</defs>
<g clip-path="url(#ss-clip)">
${stripes.join('\n')}
</g>
<path d="M 60 160 A 100 100 0 0 1 260 160 Z" fill="none" stroke="#f472b6" stroke-width="6">
  <animate attributeName="stroke-dasharray" values="0 620;620 0" dur="5s" repeatCount="indefinite" />
</path>
<line x1="30" y1="160" x2="290" y2="160" stroke="#fafafa" stroke-width="4" />
<circle cx="160" cy="230" r="14" fill="#facc15"><animate attributeName="cy" values="240;222;240" dur="6s" repeatCount="indefinite" /></circle>
</svg>`;
}
