export interface TerracedFieldsOptions {
  size?: number;
  terraces?: number;
  base?: string;
  accent?: string;
}

export function createTerracedFields(options: TerracedFieldsOptions = {}): string {
  const { size = 720, terraces = 8, base = '#1c1c24', accent = '#22d3ee' } = options;
  const cx = size * 0.5;
  const els: string[] = [];

  for (let t = terraces; t >= 1; t--) {
    const rx = size * 0.46 * (t / terraces);
    const ry = rx * 0.42;
    const cy = size * 0.62 - (terraces - t) * size * 0.055;
    const isAccent = t === Math.ceil(terraces / 2);
    const color = isAccent ? accent : base;
    els.push(`      <path d="M${(cx - rx).toFixed(1)} ${cy.toFixed(1)} A${rx.toFixed(1)} ${ry.toFixed(1)} 0 0 1 ${(cx + rx).toFixed(1)} ${cy.toFixed(1)} L${(cx + rx * 0.86).toFixed(1)} ${(cy + size * 0.05).toFixed(1)} L${(cx - rx * 0.86).toFixed(1)} ${(cy + size * 0.05).toFixed(1)} Z" fill="${color}" fill-opacity="${isAccent ? 0.4 : 0.9}" stroke="#3f3f46" stroke-width="1.3"${isAccent ? '>\n        <animate attributeName="fill-opacity" values="0.4;0.7;0.4" dur="6s" repeatCount="indefinite" />\n      ' : ''} />`);
    if (!isAccent) {
      els.push(`      <line x1="${(cx - rx * 0.9).toFixed(1)}" y1="${cy.toFixed(1)}" x2="${(cx + rx * 0.9).toFixed(1)}" y2="${cy.toFixed(1)}" stroke="#27272a" stroke-width="0.8" />`);
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
</svg>`;
}
