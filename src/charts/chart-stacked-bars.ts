/** Stacked Bars — horizontal stacked segments animating out with a legend. */
export interface StackedBarsOptions {
  rows?: Array<{ label: string; parts: Array<{ value: number; color: string }> }>;
  width?: number;
  rowHeight?: number;
}

export function createStackedBars(options: StackedBarsOptions = {}): string {
  const {
    rows = [
      { label: 'Design', parts: [{ value: 60, color: '#8b5cf6' }, { value: 25, color: '#22d3ee' }, { value: 15, color: '#f472b6' }] },
      { label: 'Frontend', parts: [{ value: 45, color: '#8b5cf6' }, { value: 40, color: '#22d3ee' }, { value: 15, color: '#fbbf24' }] },
      { label: 'Backend', parts: [{ value: 30, color: '#22d3ee' }, { value: 55, color: '#4ade80' }, { value: 15, color: '#f472b6' }] },
    ],
    width = 620, rowHeight = 64,
  } = options;

  const labelW = 90;
  const barW = width - labelW - 20;

  const bars = rows
    .map((row, ri) => {
      const total = row.parts.reduce((s, p) => s + p.value, 0) || 1;
      const y = ri * rowHeight + 18;
      let x = labelW;
      const segs = row.parts
        .map((p, pi) => {
          const w = (p.value / total) * barW;
          const el = `<rect x="${x}" y="${y}" width="0" height="26" rx="${pi === 0 ? 7 : 0}" fill="${p.color}" opacity="0">
            <animate attributeName="width" from="0" to="${(w - (pi < row.parts.length - 1 ? 3 : 0)).toFixed(1)}" dur="0.7s" begin="${(ri * 0.18 + pi * 0.1).toFixed(2)}s" fill="freeze" calcMode="spline" keySplines="0.25 0.8 0.3 1"/>
            <animate attributeName="opacity" from="0" to="1" dur="0.25s" begin="${(ri * 0.18 + pi * 0.1).toFixed(2)}s" fill="freeze"/>
          </rect>`;
          x += w;
          return el;
        })
        .join('');
      return `<text x="0" y="${y + 18}" fill="#a1a1aa" font-size="13" font-family="system-ui">${row.label}</text>${segs}`;
    })
    .join('');

  return `<svg viewBox="0 0 ${width} ${rows.length * rowHeight + 10}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${bars}</svg>`;
}
