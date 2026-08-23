export interface PlaidWeaveOptions {
  size?: number;
  bands?: number;
  stroke?: string;
  accents?: string[];
}

export function createPlaidWeave(options: PlaidWeaveOptions = {}): string {
  const { size = 720, bands = 9, stroke = '#27272a', accents = ['#8b5cf6', '#22d3ee', '#f472b6'] } = options;
  const step = size / bands;
  const els: string[] = [];

  for (let i = 0; i <= bands; i++) {
    const p = i * step;
    const accentH = i % 3 === 0 ? accents[(i / 3) % accents.length] : undefined;
    const wH = accentH ? step * 0.34 : 1.4;
    els.push(`    <rect x="0" y="${(p - wH / 2).toFixed(1)}" width="${size}" height="${wH.toFixed(1)}" fill="${accentH ?? stroke}" opacity="${accentH ? 0.35 : 0.9}" />`);
    const accentV = i % 4 === 1 ? accents[(i % accents.length)] : undefined;
    const wV = accentV ? step * 0.28 : 1.4;
    els.push(`    <rect x="${(p - wV / 2).toFixed(1)}" y="0" width="${wV.toFixed(1)}" height="${size}" fill="${accentV ?? stroke}" opacity="${accentV ? 0.4 : 0.9}" />`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
</svg>`;
}
