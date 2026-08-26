/** Skeleton Table — shimmer rows that resolve into real data after a beat. */
export interface SkeletonTableOptions {
  rows?: number;
  delay?: number;
}

export function createSkeletonTable(container: HTMLElement, options: SkeletonTableOptions = {}): () => void {
  const {
    rows = 4,
    delay = 1800,
  } = options;
  const data = [
    ['particle-field', 'WebGL', '2 days ago'],
    ['chart-donut', 'SVG', '5 hours ago'],
    ['nav-stepper', 'Component', 'yesterday'],
    ['pricing-hero', 'Component', '3 days ago'],
  ].slice(0, rows);

  container.innerHTML = `<style>
    .tb-sk{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .tb-sk table{border-collapse:collapse;background:#141417;border:1px solid #27272a;border-radius:14px;overflow:hidden;min-width:380px}
    .tb-sk th{background:#18181b;color:#71717a;font:600 11px system-ui;text-transform:uppercase;
      letter-spacing:.06em;padding:11px 18px;text-align:left}
    .tb-sk td{padding:12px 18px;font:400 13px system-ui;color:#d4d4d8;border-top:1px solid #1e1e22}
    .tb-sk .sk{height:11px;border-radius:6px;background:linear-gradient(90deg,#1c1c22 25%,#27272a 45%,#1c1c22 65%);
      background-size:220% 100%;animation:tb-sk-shine 1.2s linear infinite}
    @keyframes tb-sk-shine{to{background-position:-220% 0}}
    .tb-sk tbody{transition:opacity .3s ease}
    .tb-sk.loaded .sk{display:none}
    .tb-sk td .kind{color:#71717a;font-size:12px}
  </style>
  <div class="tb-sk"><table>
    <thead><tr><th>Name</th><th>Type</th><th>Updated</th></tr></thead>
    <tbody>
      ${Array.from({ length: rows }, () => `<tr>
        <td><div class="sk" style="width:${90 + Math.random() * 70}px"></div></td>
        <td><div class="sk" style="width:52px"></div></td>
        <td><div class="sk" style="width:74px"></div></td>
      </tr>`).join('')}
    </tbody>
  </table></div>`;

  const root = container.querySelector<HTMLElement>('.tb-sk')!;
  const tbody = container.querySelector<HTMLTableSectionElement>('tbody')!;
  const timer = window.setTimeout(() => {
    tbody.innerHTML = data
      .map(([n, k, u]) => `<tr><td style="color:#fafafa;font-weight:600">${n}</td><td class="kind">${k}</td><td class="kind">${u}</td></tr>`)
      .join('');
    root.classList.add('loaded');
  }, delay);

  return () => {
    window.clearTimeout(timer);
    container.innerHTML = '';
  };
}
