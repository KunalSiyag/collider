export interface ShapeHourglassFlowOptions {
  colors?: string[];
  size?: number;
}

export function createShapeHourglassFlow(options: ShapeHourglassFlowOptions = {}): string {
  const { colors = ['#facc15', '#f472b6'], size = 320 } = options;
  const grains: string[] = [];

  for (let i = 0; i < 8; i++) {
    const delay = (i * 0.45).toFixed(2);
    grains.push(
      `  <circle cx="160" cy="118" r="3.5" fill="${colors[0]}"><animate attributeName="cy" values="112;208" dur="2.2s" begin="${delay}s" repeatCount="indefinite" /><animate attributeName="cx" values="160;158;162;160" dur="2.2s" begin="${delay}s" repeatCount="indefinite" /></circle>`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
<rect x="70" y="34" width="180" height="14" rx="7" fill="#3f3f46" />
<rect x="70" y="272" width="180" height="14" rx="7" fill="#3f3f46" />
<path d="M 88 48 L 232 48 L 172 152 L 172 168 L 232 272 L 88 272 L 148 168 L 148 152 Z" fill="none" stroke="#a78bfa" stroke-width="6" stroke-linejoin="round" />
<path d="M 96 56 L 224 56 L 166 154 L 166 166 L 210 240 L 110 240 L 154 166 L 154 154 Z" fill="${colors[1]}" opacity="0.18" />
${grains.join('\n')}
<path d="M 120 262 Q 160 244 200 262 L 200 266 Q 160 252 120 266 Z" fill="${colors[0]}"><animate attributeName="d" values="M 120 262 Q 160 246 200 262 Z;M 116 260 Q 160 238 204 260 Z;M 120 262 Q 160 246 200 262 Z" dur="2s" repeatCount="indefinite" /></path>
</svg>`;
}
