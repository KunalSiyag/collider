/** Progress Rings — a trio of small KPI rings filling to different targets. */
export interface ProgressRingsOptions {
  items?: Array<{ label: string; value: number; color: string }>;
  size?: number;
}

export function createProgressRings(options: ProgressRingsOptions = {}): string {
  const {
    items = [
      { label: 'Storage', value: 0.72, color: '#8b5cf6' },
      { label: 'Bandwidth', value: 0.48, color: '#22d3ee' },
      { label: 'Uptime', value: 0.93, color: '#4ade80' },
    ],
    size = 110,
  } = options;

  const stroke = 10;
  const r = size / 2 - stroke;
  const circ = 2 * Math.PI * r;
  const gap = 34;

  const rings = items
    .map((item, i) => {
      const cx = size / 2 + i * (size + gap);
      const cy = size / 2;
      return `<g>
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#27272a" stroke-width="${stroke}"/>
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${item.color}" stroke-width="${stroke}" stroke-linecap="round"
          stroke-dasharray="0 ${circ}" transform="rotate(-90 ${cx} ${cy})">
          <animate attributeName="stroke-dasharray" from="0 ${circ}" to="${(circ * item.value).toFixed(1)} ${circ}" dur="1.2s" begin="${(i * 0.18).toFixed(2)}s" fill="freeze" calcMode="spline" keySplines="0.3 0 0.2 1"/>
        </circle>
        <text x="${cx}" y="${cy + 1}" fill="#fafafa" font-size="19" font-weight="700" text-anchor="middle" font-family="system-ui" opacity="0">
          ${Math.round(item.value * 100)}%<animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="${(1 + i * 0.18).toFixed(2)}s" fill="freeze"/>
        </text>
        <text x="${cx}" y="${cy + 22}" fill="#71717a" font-size="10.5" text-anchor="middle" font-family="system-ui">${item.label}</text>
      </g>`;
    })
    .join('');

  return `<svg viewBox="0 0 ${items.length * (size + gap) - gap} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${rings}</svg>`;
}
