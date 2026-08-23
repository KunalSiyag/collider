export interface QuiltedDiamondsOptions {
  size?: number;
  cells?: number;
  base?: string;
  accents?: string[];
}

export function createQuiltedDiamonds(options: QuiltedDiamondsOptions = {}): string {
  const { size = 720, cells = 6, base = '#1c1c24', accents = ['#8b5cf6', '#22d3ee', '#fbbf24'] } = options;
  const step = size / cells;
  const els: string[] = [];

  for (let row = 0; row < cells * 2; row++) {
    for (let col = 0; col < cells * 2; col++) {
      const cxp = col * step / 2 + step / 4;
      const cyp = row * step / 2 + step / 4;
      if ((row + col) % 2 !== 0) continue;
      const r = step * 0.46;
      const k = (Math.floor(row / 2) + Math.floor(col / 2)) % 3;
      const isAccent = (row * 3 + col) % 7 === 2;
      const fill = isAccent ? accents[k] : base;
      const pts = [
        [cxp, cyp - r],
        [cxp + r, cyp],
        [cxp, cyp + r],
        [cxp - r, cyp],
      ].map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
      els.push(`      <polygon points="${pts}" fill="${fill}" fill-opacity="${isAccent ? 0.4 : 0.95}" stroke="#3f3f46" stroke-width="1.2"${isAccent ? '>\n        <animate attributeName="fill-opacity" values="0.4;0.75;0.4" dur="5s" repeatCount="indefinite" />\n      ' : ''} />`);
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
${els.join('\n')}
</svg>`;
}
