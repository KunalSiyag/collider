export interface ShapeSundialOptions {
  colors?: string[];
  size?: number;
}

export function createShapeSundial(options: ShapeSundialOptions = {}): string {
  const { colors = ['#facc15', '#8b5cf6'], size = 320 } = options;
  const c = size / 2;
  const hourMarks: string[] = [];

  for (let i = 0; i <= 6; i++) {
    const a = Math.PI * (i / 6);
    const x1 = c - Math.cos(a) * 118;
    const y1 = 250 - Math.sin(a) * 118;
    const x2 = c - Math.cos(a) * 104;
    const y2 = 250 - Math.sin(a) * 104;
    hourMarks.push(`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#3f3f46" stroke-width="4" />`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
<path d="M 30 250 A 130 130 0 0 1 290 250" fill="#18181b" stroke="#27272a" stroke-width="4" />
${hourMarks.join('')}
<path d="M ${c} 250 L ${c} 132 L 210 236 Z" fill="${colors[0]}" opacity="0.85">
  <animateTransform attributeName="transform" type="rotate" values="-50 ${c} 250;50 ${c} 250;-50 ${c} 250" dur="12s" repeatCount="indefinite" />
</path>
<line x1="${c}" y1="250" x2="${c}" y2="120" stroke="${colors[1]}" stroke-width="6" stroke-linecap="round" />
<line x1="20" y1="250" x2="300" y2="250" stroke="#67e8f9" stroke-width="4" />
</svg>`;
}
