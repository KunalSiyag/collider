export interface VineLatticeOptions {
  size?: number;
  rows?: number;
  cols?: number;
  stem?: string;
  accent?: string;
}

export function createVineLattice(options: VineLatticeOptions = {}): string {
  const { size = 720, rows = 5, cols = 5, stem = '#3f3f46', accent = '#22d3ee' } = options;
  const step = size / (cols + 1);
  const els: string[] = [];

  for (let r = 0; r <= rows; r++) {
    els.push(`      <path d="M0 ${(step * (r + 1)).toFixed(1)} Q${(size / 2).toFixed(1)} ${(step * (r + 1) - 14).toFixed(1)} ${size} ${(step * (r + 1)).toFixed(1)}" fill="none" stroke="${stem}" stroke-width="1.2" />`);
  }
  for (let cIdx = 0; cIdx <= cols; cIdx++) {
    els.push(`      <path d="M${(step * (cIdx + 1)).toFixed(1)} 0 Q${(step * (cIdx + 1) + 14).toFixed(1)} ${(size / 2).toFixed(1)} ${(step * (cIdx + 1)).toFixed(1)} ${size}" fill="none" stroke="${stem}" stroke-width="1.2" />`);
  }
  for (let r = 1; r <= rows; r++) {
    for (let cIdx = 1; cIdx <= cols; cIdx++) {
      if ((r + cIdx) % 3 !== 0) continue;
      const x = step * cIdx;
      const y = step * r;
      const isAccent = (r * cols + cIdx) % 4 === 0;
      els.push(`      <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6" fill="none" stroke="${isAccent ? accent : '#52525b'}" stroke-width="${isAccent ? 2 : 1.2}">
        ${isAccent ? `<animate attributeName="r" values="6;9;6" dur="4s" repeatCount="indefinite" />` : ''}
      </circle>`);
      for (const [dx, dy] of [[8, -8], [-8, -8], [8, 8], [-8, 8]] as const) {
        els.push(`      <line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${x + dx}" y2="${y + dy}" stroke="#52525b" stroke-width="1" />`);
        void dx; void dy;
      }
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
${els.join('\n')}
</svg>`;
}
