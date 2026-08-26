/** Stat Card — a KPI tile with a delta arrow and an embedded sparkline. */
export interface StatCardOptions {
  label?: string;
  value?: string;
  delta?: number;
  accent?: string;
}

export function createStatCard(container: HTMLElement, options: StatCardOptions = {}): () => void {
  const { label = 'Monthly revenue', value = '$48,210', delta = 12.4, accent = '#4ade80' } = options;
  const up = delta >= 0;

  container.innerHTML = `<style>
    .cd-st{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cd-st .card{width:250px;background:#141417;border:1px solid #27272a;border-radius:16px;padding:18px;
      transition:border-color .2s ease}
    .cd-st .card:hover{border-color:#3f3f46}
    .cd-st .label{color:#71717a;font:500 12px system-ui}
    .cd-st .value{color:#fafafa;font:800 26px system-ui;margin:6px 0 4px;letter-spacing:-.02em}
    .cd-st .delta{display:inline-flex;align-items:center;gap:4px;color:${accent};background:${accent}1a;
      font:700 11.5px system-ui;padding:3px 8px;border-radius:999px}
    .cd-st svg.trend{display:block;margin-top:10px}
    .cd-st .trend path{stroke:${accent};stroke-width:2;fill:none;stroke-linecap:round;
      stroke-dasharray:220;stroke-dashoffset:220;animation:cd-st-draw 1.2s .2s forwards cubic-bezier(.3,0,.2,1)}
    @keyframes cd-st-draw{to{stroke-dashoffset:0}}
  </style>
  <div class="cd-st"><div class="card">
    <div class="label">${label}</div>
    <div class="value">${value}</div>
    <span class="delta">${up ? '▲' : '▼'} ${Math.abs(delta)}% vs last month</span>
    <svg class="trend" width="210" height="44" viewBox="0 0 210 44" preserveAspectRatio="none" aria-hidden="true">
      <path d="M2 36 L30 30 L58 33 L86 22 L114 26 L142 14 L170 18 L208 5"/>
    </svg>
  </div></div>`;
  return () => { container.innerHTML = ''; };
}
