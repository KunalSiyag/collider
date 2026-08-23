export interface ShapeClockAbstractOptions {
  colors?: string[];
  size?: number;
}

export function createShapeClockAbstract(options: ShapeClockAbstractOptions = {}): string {
  const { colors = ['#8b5cf6', '#f472b6'], size = 320 } = options;
  const c = size / 2;
  const ticks: string[] = [];

  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    ticks.push(
      `<circle cx="${(c + Math.cos(a) * 128).toFixed(1)}" cy="${(c + Math.sin(a) * 128).toFixed(1)}" r="4" fill="#3f3f46" />`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
<circle cx="${c}" cy="${c}" r="146" fill="#18181b" stroke="#27272a" stroke-width="6" />
${ticks.join('')}
<g>
  <animateTransform attributeName="transform" type="rotate" from="0 ${c} ${c}" to="360 ${c} ${c}" dur="9s" repeatCount="indefinite" />
  <line x1="${c}" y1="${c}" x2="${c}" y2="${c - 96}" stroke="${colors[0]}" stroke-width="8" stroke-linecap="round" />
</g>
<g>
  <animateTransform attributeName="transform" type="rotate" from="360 ${c} ${c}" to="0 ${c} ${c}" dur="4.5s" repeatCount="indefinite" />
  <line x1="${c}" y1="${c}" x2="${c + 70}" y2="${c}" stroke="${colors[1]}" stroke-width="6" stroke-linecap="round" />
</g>
<circle cx="${c}" cy="${c}" r="9" fill="#67e8f9">
  <animate attributeName="r" values="9;12;9" dur="3s" repeatCount="indefinite" />
</circle>
</svg>`;
}
