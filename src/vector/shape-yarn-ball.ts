export interface ShapeYarnBallOptions {
  colors?: string[];
  size?: number;
}

export function createShapeYarnBall(options: ShapeYarnBallOptions = {}): string {
  const { colors = ['#f472b6', '#8b5cf6'], size = 320 } = options;
  const c = size / 2;
  const strands: string[] = [];

  for (let i = 0; i < 6; i++) {
    const off = (i - 2.5) * 26;
    strands.push(
      `<path d="M ${c + off} 40 A ${Math.abs(off) + 90} 130 0 0 ${off < 0 ? 1 : 0} ${c + off} 280" fill="none" stroke="${i % 2 === 0 ? colors[0] : colors[1]}" stroke-width="4" opacity="0.9"><animate attributeName="stroke-opacity" values="0.9;0.4;0.9" dur="${(3 + i * 0.4).toFixed(1)}s" repeatCount="indefinite" /></path>`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#18181b" />
<g clip-path="url(#yb-clip)">
${strands.join('\n')}
</g>
<defs><clipPath id="yb-clip"><circle cx="${c}" cy="${c}" r="122" /></clipPath></defs>
<circle cx="${c}" cy="${c}" r="122" fill="none" stroke="${colors[0]}" stroke-width="5">
  <animate attributeName="stroke-dasharray" values="768 0;700 68;768 0" dur="6s" repeatCount="indefinite" />
</circle>
<path d="M 240 250 q 30 14 44 44" fill="none" stroke="${colors[1]}" stroke-width="4" />
</svg>`;
}
