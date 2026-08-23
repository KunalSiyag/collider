export interface ShapeCrosshatchPatchOptions {
  color?: string;
  size?: number;
}

export function createShapeCrosshatchPatch(options: ShapeCrosshatchPatchOptions = {}): string {
  const { color = '#8b5cf6', size = 320 } = options;
  const linesA: string[] = [];
  const linesB: string[] = [];

  for (let i = -8; i <= 8; i++) {
    linesA.push(`<line x1="${i * 24 - 100}" y1="-20" x2="${i * 24 + 100}" y2="340" stroke="${color}" stroke-width="3">`);
    linesB.push(`<line x1="${i * 24 + 100}" y1="-20" x2="${i * 24 - 100}" y2="340" stroke="#67e8f9" stroke-width="3">`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
<defs><clipPath id="ch-circle"><circle cx="160" cy="160" r="120" /></clipPath></defs>
<g clip-path="url(#ch-circle)">
<g opacity="0.9">${linesA.map((l) => `${l}<animate attributeName="stroke-opacity" values="1;0.35;1" dur="5s" repeatCount="indefinite" /></line>`).join('')}</g>
<g opacity="0.7">${linesB.map((l) => `${l}<animate attributeName="stroke-opacity" values="0.35;1;0.35" dur="5s" repeatCount="indefinite" /></line>`).join('')}</g>
</g>
<circle cx="160" cy="160" r="120" fill="none" stroke="#3f3f46" stroke-width="5" />
</svg>`;
}
