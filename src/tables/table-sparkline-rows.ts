/** Sparkline Rows — a table where each row carries its own inline trend. */
export interface SparklineRowsOptions {
  rows?: Array<{ name: string; values: number[]; delta: string; tone: string }>;
}

export function createSparklineRows(container: HTMLElement, options: SparklineRowsOptions = {}): () => void {
  const {
    rows = [
      { name: 'Aurora', values: [12, 18, 15, 24, 22, 31], delta: '+18%', tone: '#4ade80' },
      { name: 'Nimbus', values: [30, 26, 28, 21, 19, 17], delta: '-9%', tone: '#ef4444' },
      { name: 'Zephyr', values: [8, 11, 10, 14, 13, 16], delta: '+11%', tone: '#4ade80' },
      { name: 'Quasar', values: [22, 22, 23, 22, 24, 23], delta: '+2%', tone: '#fbbf24' },
    ],
  } = options;

  const spark = (values: number[], tone: string) => {
    const min = Math.min(...values), max = Math.max(...values), span = max - min || 1;
    const pts = values
      .map((v, i) => `${4 + i * (92 / (values.length - 1))},${(20 - ((v - min) / span) * 16).toFixed(1)}`)
      .join(' ');
    return `<svg width="100" height="24" viewBox="0 0 100 24"><polyline points="${pts}" fill="none" stroke="${tone}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  };

  container.innerHTML = `<style>
    .tb-sr{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .tb-sr table{border-collapse:collapse;background:#141417;border:1px solid #27272a;border-radius:14px;overflow:hidden}
    .tb-sr th{background:#18181b;color:#71717a;font:600 11px system-ui;text-transform:uppercase;
      letter-spacing:.06em;padding:11px 18px;text-align:left}
    .tb-sr td{padding:9px 18px;font:400 13px system-ui;color:#d4d4d8;border-top:1px solid #1e1e22}
    .tb-sr td:first-child{color:#fafafa;font-weight:600}
    .tb-sr .delta{font:700 12px system-ui;color:var(--tone)}
    .tb-sr tbody tr{transition:background .15s ease}
    .tb-sr tbody tr:hover{background:#ffffff06}
  </style>
  <div class="tb-sr"><table>
    <thead><tr><th>Service</th><th>Trend (6w)</th><th>Change</th></tr></thead>
    <tbody>
      ${rows
        .map(
          (r) =>
            `<tr style="--tone:${r.tone}"><td>${r.name}</td><td>${spark(r.values, r.tone)}</td><td><span class="delta">${r.delta}</span></td></tr>`,
        )
        .join('')}
    </tbody>
  </table></div>`;
  return () => { container.innerHTML = ''; };
}
