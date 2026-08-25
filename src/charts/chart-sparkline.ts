/** Sparkline — a tiny inline trend line with end dot, ideal for stat cards. */
export interface SparklineOptions {
  values?: number[];
  accent?: string;
  width?: number;
  height?: number;
}

export function createSparkline(options: SparklineOptions = {}): string {
  const {
    values = [8, 14, 11, 18, 15, 22, 19, 27],
    accent = '#8b5cf6', width = 200, height = 56,
  } = options;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const pad = 6;
  const pts = values.map((v, i) => ({
    x: pad + ((width - pad * 2) * i) / (values.length - 1),
    y: pad + (height - pad * 2) * (1 - (v - min) / span),
  }));
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const last = pts[pts.length - 1];
  const len = 400;
  return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="${d}" fill="none" stroke="${accent}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"
    stroke-dasharray="${len}" stroke-dashoffset="${len}">
    <animate attributeName="stroke-dashoffset" from="${len}" to="0" dur="1.1s" begin="0.1s" fill="freeze" calcMode="spline" keySplines="0.3 0 0.2 1"/>
  </path>
  <circle cx="${last.x}" cy="${last.y}" r="3.4" fill="${accent}">
    <animate attributeName="r" values="3.4;5;3.4" dur="2s" begin="1.1s" repeatCount="indefinite"/>
  </circle>
</svg>`;
}
