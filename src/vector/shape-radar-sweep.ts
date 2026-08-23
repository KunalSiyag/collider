export interface ShapeRadarSweepOptions {
  colors?: string[];
  size?: number;
}

export function createShapeRadarSweep(options: ShapeRadarSweepOptions = {}): string {
  const { colors = ['#22d3ee', '#8b5cf6'], size = 320 } = options;
  const c = size / 2;
  const rings: string[] = [];

  for (let i = 1; i <= 4; i++) {
    rings.push(`<circle cx="${c}" cy="${c}" r="${i * 34}" fill="none" stroke="#27272a" stroke-width="2" />`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
${rings.join('')}
<line x1="${c - 136}" y1="${c}" x2="${c + 136}" y2="${c}" stroke="#27272a" stroke-width="2" />
<line x1="${c}" y1="${c - 136}" x2="${c}" y2="${c + 136}" stroke="#27272a" stroke-width="2" />
<path d="M ${c} ${c} L ${c} ${c - 130} A 130 130 0 0 1 ${c + 92} ${c - 92} Z" fill="${colors[0]}" opacity="0.35">
  <animateTransform attributeName="transform" type="rotate" from="0 ${c} ${c}" to="360 ${c} ${c}" dur="4.5s" repeatCount="indefinite" />
</path>
<line x1="${c}" y1="${c}" x2="${c}" y2="${c - 130}" stroke="${colors[0]}" stroke-width="3">
  <animateTransform attributeName="transform" type="rotate" from="0 ${c} ${c}" to="360 ${c} ${c}" dur="4.5s" repeatCount="indefinite" />
</line>
<circle cx="${c + 60}" cy="${c - 80}" r="6" fill="${colors[1]}"><animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite" /></circle>
<circle cx="${c - 84}" cy="${c + 40}" r="5" fill="#f472b6"><animate attributeName="opacity" values="1;0.15;1" dur="2.7s" repeatCount="indefinite" /></circle>
</svg>`;
}
