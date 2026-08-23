export interface HermannGridOptions {
  size?: number;
  cells?: number;
  line?: string;
  dotColor?: string;
}

export function createHermannGrid(options: HermannGridOptions = {}): string {
  const { size = 720, cells = 11, line = '#3f3f46', dotColor = '#8b5cf6' } = options;
  const step = size / cells;
  const els: string[] = [];

  for (let i = 0; i <= cells; i++) {
    const p = (i * step).toFixed(1);
    els.push(`      <line x1="0" y1="${p}" x2="${size}" y2="${p}" stroke="${line}" stroke-width="${Math.max(2, step * 0.09).toFixed(1)}" />`);
    els.push(`      <line x1="${p}" y1="0" x2="${p}" y2="${size}" stroke="${line}" stroke-width="${Math.max(2, step * 0.09).toFixed(1)}" />`);
  }
  els.push(`      <circle cx="${(step * Math.floor(cells / 2)).toFixed(1)}" cy="${(step * Math.floor(cells / 2)).toFixed(1)}" r="${(step * 0.14).toFixed(1)}" fill="${dotColor}" opacity="0">
        <animate attributeName="opacity" values="0;0.6;0" dur="4s" repeatCount="indefinite" />
      </circle>`);

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
</svg>`;
}
