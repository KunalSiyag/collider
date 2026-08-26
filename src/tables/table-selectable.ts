/** Selectable Table — row checkboxes with a floating bulk-action bar. */
export interface SelectableTableOptions {
  rows?: string[];
  accent?: string;
}

export function createSelectableTable(container: HTMLElement, options: SelectableTableOptions = {}): () => void {
  const {
    rows = ['aurora-hero.ts', 'neon-city.ts', 'meadow-scene.ts', 'koi-pond.ts', 'gantt-chart.ts'],
    accent = '#8b5cf6',
  } = options;

  container.innerHTML = `<style>
    .tb-sel{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#0b0b10;gap:0}
    .tb-sel table{border-collapse:collapse;background:#141417;border:1px solid #27272a;border-radius:14px;overflow:hidden}
    .tb-sel td,.tb-sel th{padding:10px 18px;font:400 13px system-ui;border-top:1px solid #1e1e22}
    .tb-sel th{border-top:none;background:#18181b;color:#71717a;font-weight:600;font-size:11px;
      text-transform:uppercase;letter-spacing:.06em;text-align:left}
    .tb-sel td:first-child,.tb-sel th:first-child{width:40px;text-align:center}
    .tb-sel input{accent-color:${accent};width:15px;height:15px;cursor:pointer}
    .tb-sel tbody tr{transition:background .15s ease}
    .tb-sel tbody tr:has(input:checked){background:${accent}14}
    .tb-sel .bulk{position:relative;margin-top:-1px;width:100%;box-sizing:border-box;display:flex;align-items:center;gap:12px;
      background:${accent};color:#fff;font:600 12.5px system-ui;padding:10px 16px;border-radius:0 0 14px 14px;
      overflow:hidden;transition:transform .3s cubic-bezier(.3,1.1,.4,1);transform:translateY(110%)}
    .tb-sel .bulk.show{transform:none}
    .tb-sel .bulk .count{font-weight:800}
    .tb-sel .bulk button{margin-left:auto;border:none;background:rgba(255,255,255,.18);color:#fff;
      font:600 12px system-ui;padding:6px 12px;border-radius:8px;cursor:pointer}
    .tb-sel .bulk button:hover{background:rgba(255,255,255,.3)}
  </style>
  <div class="tb-sel"><div>
    <table>
      <thead><tr><th><input type="checkbox" aria-label="Select all" id="tb-sel-all"/></th><th>File</th><th>Size</th></tr></thead>
      <tbody>
        ${rows.map((r) => `<tr><td><input type="checkbox" aria-label="Select ${r}"/></td><td>${r}</td><td>${(2 + Math.random() * 20).toFixed(1)} KB</td></tr>`).join('')}
      </tbody>
    </table>
    <div class="bulk"><span class="count">0 selected</span><button type="button">Delete</button></div>
  </div></div>`;

  const boxes = [...container.querySelectorAll<HTMLInputElement>('tbody input')];
  const all = container.querySelector<HTMLInputElement>('#tb-sel-all')!;
  const bulk = container.querySelector<HTMLElement>('.bulk')!;
  const count = container.querySelector<HTMLElement>('.count')!;

  const render = () => {
    const n = boxes.filter((b) => b.checked).length;
    count.textContent = `${n} selected`;
    bulk.classList.toggle('show', n > 0);
    all.checked = n === boxes.length;
    all.indeterminate = n > 0 && n < boxes.length;
  };
  boxes.forEach((b) => b.addEventListener('change', render));
  all.addEventListener('change', () => {
    boxes.forEach((b) => (b.checked = all.checked));
    render();
  });
  return () => { container.innerHTML = ''; };
}
