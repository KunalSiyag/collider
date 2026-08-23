export interface ShapeGothicArchesOptions {
  colors?: string[];
  size?: number;
  count?: number;
}

export function createShapeGothicArches(options: ShapeGothicArchesOptions = {}): string {
  const { colors = ['#8b5cf6', '#67e8f9'], size = 320, count = 3 } = options;
  const arches: string[] = [];

  for (let i = 0; i < count; i++) {
    const x = 50 + i * (220 / count) + 10;
    const w = 200 / count - 20;
    arches.push(
      `  <g>
    <path d="M ${x} 280 L ${x} 140 Q ${x + w / 2} 60 ${x + w} 140 L ${x + w} 280 Z" fill="${colors[i % 2]}" opacity="${i % 2 === 0 ? 0.85 : 0.55}">
      <animate attributeName="opacity" values="${i % 2 === 0 ? '0.85;0.5;0.85' : '0.55;0.9;0.55'}" dur="${(4 + i).toFixed(0)}s" repeatCount="indefinite" />
    </path>
    <circle cx="${(x + w / 2).toFixed(1)}" cy="150" r="${(w * 0.18).toFixed(1)}" fill="#0b0b10" stroke="#fafafa" stroke-width="2.5" />
    <line x1="${(x + w / 2).toFixed(1)}" y1="150" x2="${(x + w / 2).toFixed(1)}" y2="${(150 + w * 0.18).toFixed(1)}" stroke="#fafafa" stroke-width="2" />
  </g>`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#18181b" />
${arches.join('\n')}
<rect x="30" y="280" width="260" height="12" rx="6" fill="#3f3f46" />
</svg>`;
}
