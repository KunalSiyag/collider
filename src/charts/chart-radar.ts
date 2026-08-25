/** Radar Chart — a polygon capability map drawing itself over a web grid. */
export interface RadarChartOptions {
  axes?: string[];
  values?: number[];
  accent?: string;
  size?: number;
}

export function createRadarChart(options: RadarChartOptions = {}): string {
  const {
    axes = ['Speed', 'Power', 'Range', 'Armor', 'Stealth', 'Cargo'],
    values = [0.8, 0.65, 0.9, 0.5, 0.75, 0.6],
    accent = '#22d3ee', size = 340,
  } = options;

  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 46;
  const n = axes.length;

  const pt = (i: number, frac: number) => {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
    return [cx + Math.cos(a) * r * frac, cy + Math.sin(a) * r * frac] as const;
  };

  const web = [0.25, 0.5, 0.75, 1]
    .map((f) =>
      `<polygon points="${Array.from({ length: n }, (_, i) => pt(i, f).map((v) => v.toFixed(1)).join(',')).join(' ')}"
        fill="none" stroke="#27272a" stroke-width="1"/>`,
    )
    .join('');

  const spokes = axes
    .map((label, i) => {
      const [x, y] = pt(i, 1);
      const [lx, ly] = pt(i, 1.16);
      return `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#27272a" stroke-width="1"/>
        <text x="${lx.toFixed(1)}" y="${(ly + 4).toFixed(1)}" fill="#a1a1aa" font-size="11.5" text-anchor="middle" font-family="system-ui">${label}</text>`;
    })
    .join('');

  const polyPoints = values.map((v, i) => pt(i, Math.max(0.05, Math.min(1, v))));
  const poly = polyPoints.map((p) => p.map((v) => v.toFixed(1)).join(',')).join(' ');
  const dots = polyPoints
    .map(
      ([x, y], i) =>
        `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="${accent}" opacity="0">
          <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="${(0.9 + i * 0.1).toFixed(2)}s" fill="freeze"/>
        </circle>`,
    )
    .join('');

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  ${web}${spokes}
  <polygon points="${poly}" fill="${accent}" fill-opacity="0.16" stroke="${accent}" stroke-width="2.4" stroke-linejoin="round">
    <animateTransform attributeName="transform" type="scale" from="0.4 0.4" to="1 1" dur="0.9s" begin="0.15s" fill="freeze" calcMode="spline" keySplines="0.25 0.8 0.3 1"/>
    <animateTransform attributeName="transform" type="translate" from="${cx * 0.6} ${cy * 0.6}" to="0 0" dur="0.9s" begin="0.15s" fill="freeze" additive="sum" calcMode="spline" keySplines="0.25 0.8 0.3 1"/>
  </polygon>
  ${dots}
</svg>`;
}
