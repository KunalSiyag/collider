export interface ShapeSunriseArcOptions {
  colors?: string[];
  size?: number;
}

export function createShapeSunriseArc(options: ShapeSunriseArcOptions = {}): string {
  const { colors = ['#facc15', '#f472b6', '#8b5cf6'], size = 320 } = options;
  const rays: string[] = [];

  for (let i = 0; i < 7; i++) {
    const angle = -180 + (i + 0.5) * (180 / 7);
    const rad = (angle * Math.PI) / 180;
    const x1 = 160 + Math.cos(rad) * 96;
    const y1 = 210 + Math.sin(rad) * 96;
    const x2 = 160 + Math.cos(rad) * 128;
    const y2 = 210 + Math.sin(rad) * 128;
    rays.push(
      `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#facc15" stroke-width="7" stroke-linecap="round"><animate attributeName="opacity" values="0.3;1;0.3" dur="${(2 + i * 0.3).toFixed(1)}s" repeatCount="indefinite" /></line>`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
<g clip-path="url(#sr-upper)">
${rays.join('\n')}
<circle cx="160" cy="210" r="72" fill="${colors[0]}"><animate attributeName="cy" values="250;196;250" dur="9s" repeatCount="indefinite" /></circle>
<circle cx="160" cy="210" r="52" fill="${colors[1]}" opacity="0.85"><animate attributeName="cy" values="250;196;250" dur="9s" repeatCount="indefinite" /></circle>
</g>
<defs><clipPath id="sr-upper"><rect x="0" y="30" width="320" height="182" /></clipPath></defs>
<rect x="0" y="212" width="320" height="108" fill="#18181b" />
<path d="M 0 232 Q 80 208 160 228 T 320 224 L 320 320 L 0 320 Z" fill="${colors[2]}" opacity="0.35" />
<line x1="0" y1="212" x2="320" y2="212" stroke="#67e8f9" stroke-width="3" />
</svg>`;
}
