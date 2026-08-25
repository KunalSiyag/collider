/** Area Flow — a layered area chart with two series and a moving scan line. */
export interface AreaFlowOptions {
  seriesA?: number[];
  seriesB?: number[];
  colorA?: string;
  colorB?: string;
  width?: number;
  height?: number;
}

export function createAreaFlow(options: AreaFlowOptions = {}): string {
  const {
    seriesA = [30, 44, 38, 56, 48, 66, 60, 78],
    seriesB = [18, 26, 22, 34, 30, 40, 36, 48],
    colorA = '#8b5cf6', colorB = '#22d3ee',
    width = 640, height = 300,
  } = options;

  const pad = { l: 16, r: 16, t: 20, b: 16 };
  const innerW = width - pad.l - pad.r;
  const innerH = height - pad.t - pad.b;
  const max = Math.max(...seriesA, ...seriesB) * 1.15;

  const path = (vals: number[]) => {
    const pts = vals.map((v, i) => ({
      x: pad.l + (innerW * i) / (vals.length - 1),
      y: pad.t + innerH - (v / max) * innerH,
    }));
    let d = `M${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
    for (let i = 1; i < pts.length; i++) {
      const px = pts[i - 1].x, py = pts[i - 1].y, x = pts[i].x, y = pts[i].y;
      const mx = (px + x) / 2;
      d += ` C ${mx.toFixed(1)} ${py.toFixed(1)} ${mx.toFixed(1)} ${y.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    return { d, pts };
  };

  const a = path(seriesA);
  const b = path(seriesB);
  const scanX = pad.l + innerW * 0.62;

  return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="af-a" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${colorA}" stop-opacity="0.4"/><stop offset="1" stop-color="${colorA}" stop-opacity="0.02"/>
    </linearGradient>
    <linearGradient id="af-b" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${colorB}" stop-opacity="0.35"/><stop offset="1" stop-color="${colorB}" stop-opacity="0.02"/>
    </linearGradient>
    <clipPath id="af-reveal"><rect x="${pad.l}" y="0" width="0" height="${height}">
      <animate attributeName="width" from="0" to="${innerW}" dur="1.6s" begin="0.1s" fill="freeze" calcMode="spline" keySplines="0.3 0 0.2 1"/>
    </rect></clipPath>
  </defs>
  <g clip-path="url(#af-reveal)">
    <path d="${a.d} L${a.pts[a.pts.length - 1].x} ${pad.t + innerH} L${a.pts[0].x} ${pad.t + innerH} Z" fill="url(#af-a)"/>
    <path d="${a.d}" fill="none" stroke="${colorA}" stroke-width="2.6" stroke-linecap="round"/>
    <path d="${b.d} L${b.pts[b.pts.length - 1].x} ${pad.t + innerH} L${b.pts[0].x} ${pad.t + innerH} Z" fill="url(#af-b)"/>
    <path d="${b.d}" fill="none" stroke="${colorB}" stroke-width="2.6" stroke-linecap="round"/>
  </g>
  <!-- scan line sweeping forever -->
  <line x1="${scanX}" y1="${pad.t}" x2="${scanX}" y2="${pad.t + innerH}" stroke="#fafafa" stroke-width="1" opacity="0.25">
    <animate attributeName="x1" values="${pad.l};${pad.l + innerW}" dur="6s" begin="1.8s" repeatCount="indefinite"/>
    <animate attributeName="x2" values="${pad.l};${pad.l + innerW}" dur="6s" begin="1.8s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0;0.3;0" dur="6s" begin="1.8s" repeatCount="indefinite"/>
  </line>
</svg>`;
}
