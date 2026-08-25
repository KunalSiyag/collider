/** Animated Bars — staggered bars rising to value with soft grid + labels. */
export interface AnimatedBarsOptions {
  values?: number[];
  labels?: string[];
  accent?: string;
  accentSoft?: string;
  width?: number;
  height?: number;
}

export function createAnimatedBars(options: AnimatedBarsOptions = {}): string {
  const {
    values = [42, 68, 35, 82, 56, 74],
    labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    accent = '#8b5cf6',
    accentSoft = '#22d3ee',
    width = 640,
    height = 360,
  } = options;

  const pad = { l: 44, r: 16, t: 24, b: 36 };
  const innerW = width - pad.l - pad.r;
  const innerH = height - pad.t - pad.b;
  const max = Math.max(...values) * 1.15;
  const slot = innerW / values.length;
  const barW = Math.min(46, slot * 0.52);

  const grid = [0.25, 0.5, 0.75, 1]
    .map(
      (f) =>
        `<line x1="${pad.l}" y1="${(pad.t + innerH * (1 - f)).toFixed(1)}" x2="${width - pad.r}" y2="${(pad.t + innerH * (1 - f)).toFixed(1)}" stroke="#27272a" stroke-width="1"/>
         <text x="${pad.l - 10}" y="${(pad.t + innerH * (1 - f) + 4).toFixed(1)}" fill="#71717a" font-size="11" text-anchor="end" font-family="system-ui">${Math.round(max * f)}</text>`,
    )
    .join('');

  const bars = values
    .map((v, i) => {
      const h = (v / max) * innerH;
      const x = pad.l + slot * i + (slot - barW) / 2;
      const y = pad.t + innerH - h;
      return `<g>
        <rect x="${x.toFixed(1)}" y="${pad.t + innerH}" width="${barW}" height="${h.toFixed(1)}" rx="7" fill="url(#ab-grad)">
          <animate attributeName="y" from="${pad.t + innerH}" to="${y.toFixed(1)}" dur="0.9s" begin="${(i * 0.09).toFixed(2)}s" fill="freeze" calcMode="spline" keySplines="0.22 1 0.36 1"/>
          <animate attributeName="height" from="0" to="${h.toFixed(1)}" dur="0.9s" begin="${(i * 0.09).toFixed(2)}s" fill="freeze" calcMode="spline" keySplines="0.22 1 0.36 1"/>
        </rect>
        <text x="${(x + barW / 2).toFixed(1)}" y="${(y - 8).toFixed(1)}" fill="#a1a1aa" font-size="11.5" font-weight="600" text-anchor="middle" font-family="system-ui" opacity="0">
          ${v}<animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="${(0.7 + i * 0.09).toFixed(2)}s" fill="freeze"/>
        </text>
        <text x="${(x + barW / 2).toFixed(1)}" y="${height - 12}" fill="#71717a" font-size="11" text-anchor="middle" font-family="system-ui">${labels[i] ?? ''}</text>
      </g>`;
    })
    .join('');

  return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="ab-grad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${accent}"/><stop offset="1" stop-color="${accentSoft}" stop-opacity="0.55"/>
    </linearGradient>
  </defs>
  ${grid}${bars}
</svg>`;
}
