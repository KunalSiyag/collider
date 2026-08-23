export interface SashikoStitchOptions {
  size?: number;
  cells?: number;
  thread?: string;
  cloth?: string;
}

export function createSashikoStitch(options: SashikoStitchOptions = {}): string {
  const { size = 720, cells = 7, thread = '#67e8f9', cloth = '#14141c' } = options;
  const step = size / cells;
  const els: string[] = [];
  const dashLen = step * 0.3;

  els.push(`      <rect width="${size}" height="${size}" fill="${cloth}" />`);
  for (let r = 0; r <= cells; r++) {
    for (let c = 0; c <= cells; c++) {
      if (r === cells && c === cells) continue;
      if (r < cells) {
        const x = c * step + step / 2;
        const y0 = r * step + step * 0.12;
        const y1 = y0 + dashLen;
        els.push(`      <line x1="${x.toFixed(1)}" y1="${y0.toFixed(1)}" x2="${x.toFixed(1)}" y2="${y1.toFixed(1)}" stroke="${thread}" stroke-width="3" stroke-linecap="round" opacity="0.9" />`);
      }
      if (c < cells) {
        const y = r * step + step / 2;
        const x0 = c * step + step * 0.12;
        const x1 = x0 + dashLen;
        els.push(`      <line x1="${x0.toFixed(1)}" y1="${y.toFixed(1)}" x2="${x1.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${thread}" stroke-width="3" stroke-linecap="round" opacity="0.55">
          <animate attributeName="opacity" values="0.55;0.95;0.55" dur="5s" begin="${((r + c) * 0.25).toFixed(2)}s" repeatCount="indefinite" />
        </line>`);
      }
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${els.join('\n')}\n</svg>`;
}
