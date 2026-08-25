/** Donut Chart — segments sweeping in around a center stat. */
export interface DonutChartOptions {
  segments?: Array<{ label: string; value: number; color: string }>;
  centerLabel?: string;
  centerValue?: string;
  size?: number;
  thickness?: number;
}

export function createDonutChart(options: DonutChartOptions = {}): string {
  const {
    segments = [
      { label: 'Direct', value: 42, color: '#8b5cf6' },
      { label: 'Organic', value: 28, color: '#22d3ee' },
      { label: 'Referral', value: 18, color: '#f472b6' },
      { label: 'Social', value: 12, color: '#fbbf24' },
    ],
    centerLabel = 'Total',
    centerValue = '100%',
    size = 320,
    thickness = 34,
  } = options;

  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const r = (size - thickness) / 2 - 6;
  const cx = size / 2;
  const cy = size / 2;
  const circ = 2 * Math.PI * r;

  let offset = 0;
  const rings = segments
    .map((seg, i) => {
      const frac = seg.value / total;
      const len = frac * circ;
      const gap = 3;
      const el = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${seg.color}" stroke-width="${thickness}"
        stroke-linecap="round" stroke-dasharray="0 ${circ}" transform="rotate(${(offset / circ) * 360 - 90} ${cx} ${cy})">
        <animate attributeName="stroke-dasharray" from="0 ${circ}" to="${Math.max(0, len - gap).toFixed(1)} ${circ}" dur="0.9s" begin="${(i * 0.16).toFixed(2)}s" fill="freeze" calcMode="spline" keySplines="0.3 0 0.2 1"/>
      </circle>`;
      offset += len;
      return el;
    })
    .join('');

  const legend = segments
    .map(
      (seg, i) =>
        `<g transform="translate(${size - 118} ${cy - ((segments.length - 1) * 22) / 2 + i * 22})">
          <rect width="10" height="10" rx="3" fill="${seg.color}"/>
          <text x="16" y="9" fill="#a1a1aa" font-size="12" font-family="system-ui">${seg.label} · ${seg.value}</text>
          <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="${(0.8 + i * 0.12).toFixed(2)}s" fill="freeze"/>
        </g>`,
    )
    .join('');

  return `<svg viewBox="0 0 ${size + 130} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  ${rings}
  <text x="${cx}" y="${cy - 2}" fill="#fafafa" font-size="26" font-weight="700" text-anchor="middle" font-family="system-ui">${centerValue}</text>
  <text x="${cx}" y="${cy + 20}" fill="#71717a" font-size="12" text-anchor="middle" font-family="system-ui">${centerLabel}</text>
  ${legend}
</svg>`;
}
