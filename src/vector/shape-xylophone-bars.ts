export interface ShapeXylophoneBarsOptions {
  colors?: string[];
  size?: number;
}

export function createShapeXylophoneBars(options: ShapeXylophoneBarsOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6', '#facc15', '#4ade80', '#a78bfa'], size = 320 } = options;
  const bars: string[] = [];

  for (let i = 0; i < 6; i++) {
    const h = 200 - i * 28;
    const x = 26 + i * 46;
    bars.push(
      `  <rect x="${x}" y="${(280 - h).toFixed(0)}" width="34" height="${h}" rx="8" fill="${colors[i % colors.length]}">
    <animate attributeName="opacity" values="1;0.45;1" dur="2.6s" begin="${(i * 0.22).toFixed(2)}s" repeatCount="indefinite" />
  </rect>
  <circle cx="${x + 17}" cy="${(296 - h * 0.12).toFixed(0)}" r="3.5" fill="#18181b" />`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
${bars.join('\n')}
<g transform="rotate(-30 240 90)">
  <line x1="230" y1="40" x2="250" y2="140" stroke="#fafafa" stroke-width="5">
    <animateTransform attributeName="transform" type="rotate" values="-14 240 90;14 240 90;-14 240 90" dur="1.8s" repeatCount="indefinite" />
  </line>
  <circle cx="250" cy="144" r="9" fill="${colors[3]}"><animate attributeName="cy" values="144;150;144" dur="1.8s" repeatCount="indefinite" /></circle>
</g>
</svg>`;
}
