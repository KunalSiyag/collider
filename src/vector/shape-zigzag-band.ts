export interface ShapeZigzagBandOptions {
  colors?: string[];
  size?: number;
}

export function createShapeZigzagBand(options: ShapeZigzagBandOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee'], size = 320 } = options;
  const pts: string[] = [];

  for (let i = 0; i <= 12; i++) {
    const x = (i * size) / 12;
    const y = i % 2 === 0 ? 120 : 190;
    pts.push(`${x.toFixed(0)},${y}`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
<polyline points="${pts.join(' ')}" fill="none" stroke="${colors[0]}" stroke-width="26" stroke-linejoin="miter">
  <animate attributeName="stroke-dashoffset" from="0" to="-160" dur="4s" repeatCount="indefinite" />
</polyline>
<polyline points="${pts.map((p) => { const [x, y] = p.split(',').map(Number); return `${x},${y + 44}`; }).join(' ')}" fill="none" stroke="${colors[1]}" stroke-width="14" stroke-linejoin="round">
  <animate attributeName="stroke-dashoffset" from="-160" to="0" dur="5s" repeatCount="indefinite" />
</polyline>
<circle cx="290" cy="234" r="9" fill="#f472b6"><animate attributeName="cy" values="234;222;234" dur="2.2s" repeatCount="indefinite" /></circle>
</svg>`;
}
