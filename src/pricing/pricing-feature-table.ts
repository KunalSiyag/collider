/** Feature Table — a compare matrix with checkmarks popping in per column. */
export interface FeatureTableOptions {
  plans?: string[];
  features?: Array<{ name: string; values: Array<boolean | string> }>;
  accent?: string;
}

export function createFeatureTable(container: HTMLElement, options: FeatureTableOptions = {}): () => void {
  const {
    plans = ['Hobby', 'Pro', 'Team'],
    features = [
      { name: 'Projects', values: [3, 'Unlimited', 'Unlimited'] },
      { name: 'Custom domains', values: [false, true, true] },
      { name: 'Analytics', values: ['Basic', 'Advanced', 'Advanced'] },
      { name: 'SSO', values: [false, false, true] },
      { name: 'Support', values: ['Community', 'Priority', 'Dedicated'] },
    ],
    accent = '#8b5cf6',
  } = options;

  const cell = (v: boolean | string, r: number, c: number) => {
    if (v === true)
      return `<svg width="17" height="17" viewBox="0 0 17 17" opacity="0"><circle cx="8.5" cy="8.5" r="8" fill="${accent}22"/><path d="M5 8.7 l2.4 2.4 L12 6" stroke="${accent}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="${(0.3 + (r + c) * 0.09).toFixed(2)}s" fill="freeze"/></svg>`;
    if (v === false) return `<span style="color:#3f3f46" class="dash">—</span>`;
    return `<span style="color:#d4d4d8" class="txt">${v}</span>`;
  };

  container.innerHTML = `<style>
    .pr-ft{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .pr-ft table{border-collapse:separate;border-spacing:0;background:#141417;border:1px solid #27272a;
      border-radius:16px;overflow:hidden}
    .pr-ft th,.pr-ft td{padding:11px 22px;font:400 13px system-ui;text-align:center;border-bottom:1px solid #1e1e22}
    .pr-ft tr:last-child td{border-bottom:none}
    .pr-ft th{color:#fafafa;font-weight:700;font-size:13.5px;background:#18181b}
    .pr-ft td:first-child,.pr-ft th:first-child{text-align:left;color:#a1a1aa;font-weight:500}
    .pr-ft th:not(:first-child){color:${accent}}
    .pr-ft .dash,.pr-ft .txt{opacity:0;animation:pr-ft-in .35s ease forwards}
    @keyframes pr-ft-in{from{opacity:0;transform:scale(.85)}to{opacity:1;transform:none}}
  </style>
  <div class="pr-ft"><table>
    <thead><tr><th>Features</th>${plans.map((p) => `<th>${p}</th>`).join('')}</tr></thead>
    <tbody>
      ${features
        .map(
          (f, r) =>
            `<tr><td>${f.name}</td>${f.values.map((v, c) => `<td>${cell(v, r, c)}</td>`).join('')}</tr>`,
        )
        .join('')}
    </tbody>
  </table></div>`;
  return () => { container.innerHTML = ''; };
}
