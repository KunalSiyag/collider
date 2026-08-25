/** Radial Gauge — a needle-less gauge filling toward a target with ticks. */
export interface RadialGaugeOptions {
  value?: number;
  max?: number;
  label?: string;
  accent?: string;
  size?: number;
}

export function createRadialGauge(options: RadialGaugeOptions = {}): string {
  const {
    value = 72, max = 100, label = 'CPU load', accent = '#4ade80', size = 280,
  } = options;

  const stroke = 22;
  const r = size / 2 - stroke;
  const cx = size / 2;
  const cy = size / 2 + 8;
  // 240-degree sweep, opening at the bottom.
  const arc = (Math.PI / 180) * 240;
  const circ = 2 * Math.PI * r;
  const arcLen = (arc / (2 * Math.PI)) * circ;
  const frac = Math.min(1, Math.max(0, value / max));

  const ticks = Array.from({ length: 9 }, (_, i) => {
    const a = -Math.PI / 2 - arc / 2 + (arc * i) / 8;
    const x1 = cx + Math.cos(a) * (r - stroke / 2 - 6);
    const y1 = cy + Math.sin(a) * (r - stroke / 2 - 6);
    const x2 = cx + Math.cos(a) * (r - stroke / 2 - 14);
    const y2 = cy + Math.sin(a) * (r - stroke / 2 - 14);
    return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#3f3f46" stroke-width="2.4"/>`;
  }).join('');

  return `<svg viewBox="0 0 ${size} ${size - 10}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g transform="rotate(150 ${cx} ${cy})">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#27272a" stroke-width="${stroke}"
      stroke-linecap="round" stroke-dasharray="${arcLen.toFixed(1)} ${circ}"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${accent}" stroke-width="${stroke}"
      stroke-linecap="round" stroke-dasharray="0 ${circ}">
      <animate attributeName="stroke-dasharray" from="0 ${circ}" to="${(arcLen * frac).toFixed(1)} ${circ}" dur="1.4s" begin="0.2s" fill="freeze" calcMode="spline" keySplines="0.25 0.1 0.25 1"/>
    </circle>
  </g>
  ${ticks}
  <text x="${cx}" y="${cy + 2}" fill="#fafafa" font-size="40" font-weight="800" text-anchor="middle" font-family="system-ui" opacity="0">${Math.round(value)}<animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="1.2s" fill="freeze"/></text>
  <text x="${cx}" y="${cy + 30}" fill="#71717a" font-size="13" text-anchor="middle" font-family="system-ui">${label}</text>
</svg>`;
}
