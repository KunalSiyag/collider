/** Line Draw — a smooth line chart that draws itself with a trailing dot. */
export interface LineDrawOptions {
  values?: number[];
  accent?: string;
  width?: number;
  height?: number;
  area?: boolean;
}

export function createLineDraw(options: LineDrawOptions = {}): string {
  const {
    values = [12, 28, 22, 44, 38, 62, 54, 78, 70, 92],
    accent = '#22d3ee',
    width = 640,
    height = 320,
    area = true,
  } = options;

  const pad = 36;
  const innerW = width - pad * 2;
  const innerH = height - pad * 2;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;

  const pts = values.map((v, i) => ({
    x: pad + (innerW * i) / (values.length - 1),
    y: pad + innerH - ((v - min) / span) * innerH,
  }));

  // Catmull-Rom -> bezier for a smooth curve through every point.
  let d = `M${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }

  const last = pts[pts.length - 1];
  const areaPath = `${d} L${last.x.toFixed(1)} ${pad + innerH} L${pts[0].x.toFixed(1)} ${pad + innerH} Z`;
  const pathLen = 1600; // generous overestimate; dash animation still reads

  return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="ld-area" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.32"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  ${area ? `<path d="${areaPath}" fill="url(#ld-area)" opacity="0"><animate attributeName="opacity" from="0" to="1" dur="1.2s" begin="0.7s" fill="freeze"/></path>` : ''}
  <path d="${d}" fill="none" stroke="${accent}" stroke-width="3" stroke-linecap="round"
    stroke-dasharray="${pathLen}" stroke-dashoffset="${pathLen}">
    <animate attributeName="stroke-dashoffset" from="${pathLen}" to="0" dur="1.8s" begin="0.2s" fill="freeze" calcMode="spline" keySplines="0.3 0 0.2 1"/>
  </path>
  <circle cx="${last.x.toFixed(1)}" cy="${last.y.toFixed(1)}" r="5" fill="${accent}" opacity="0">
    <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="1.9s" fill="freeze"/>
    <animate attributeName="r" values="5;7;5" dur="2s" begin="2s" repeatCount="indefinite"/>
  </circle>
</svg>`;
}
