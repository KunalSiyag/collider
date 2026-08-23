export interface ShapeIceCreamConeOptions {
  colors?: string[];
  size?: number;
}

export function createShapeIceCreamCone(options: ShapeIceCreamConeOptions = {}): string {
  const { colors = ['#f472b6', '#8b5cf6'], size = 320 } = options;
  const waffle: string[] = [];

  for (let i = 1; i < 4; i++) {
    waffle.push(`<line x1="${120 - i * 12}" y1="${190 + i * 22}" x2="${200 + i * 12}" y2="${190 + i * 22}" stroke="#a16207" stroke-width="2" opacity="0.7" />`);
  }
  for (let i = -2; i <= 2; i++) {
    waffle.push(`<line x1="${160 + i * 18}" y1="186" x2="${160 + i * 34}" y2="296" stroke="#a16207" stroke-width="2" opacity="0.7" />`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
<polygon points="118,182 202,182 160,300" fill="#d97706">
${waffle.join('\n')}
</polygon>
<circle cx="138" cy="150" r="38" fill="${colors[1]}">
  <animate attributeName="cy" values="150;146;150" dur="5s" repeatCount="indefinite" />
</circle>
<circle cx="184" cy="146" r="36" fill="${colors[0]}">
  <animate attributeName="cy" values="146;142;146" dur="6s" repeatCount="indefinite" />
</circle>
<circle cx="161" cy="106" r="26" fill="#fafafa" opacity="0.9"><animate attributeName="cy" values="106;102;106" dur="4s" repeatCount="indefinite" /></circle>
<circle cx="176" cy="76" r="9" fill="#f43f5e">
  <animate attributeName="cy" values="76;70;76" dur="3s" repeatCount="indefinite" />
</circle>
<line x1="176" y1="85" x2="180" y2="98" stroke="#4ade80" stroke-width="3" />
</svg>`;
}
