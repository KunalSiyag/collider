/** Sortable Table — click headers to sort with animated direction arrows. */
export interface SortableTableOptions {
  columns?: string[];
  rows?: Array<Array<string | number>>;
  accent?: string;
}

export function createSortableTable(container: HTMLElement, options: SortableTableOptions = {}): () => void {
  const {
    columns = ['Region', 'Users', 'Revenue', 'Churn'],
    rows = [
      ['North America', 48210, '$128k', '1.2%'],
      ['Europe', 31980, '$96k', '0.9%'],
      ['Asia Pacific', 27455, '$74k', '1.6%'],
      ['Latin America', 9120, '$21k', '2.1%'],
    ],
    accent = '#8b5cf6',
  } = options;

  container.innerHTML = `<style>
    .tb-so{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .tb-so table{border-collapse:collapse;background:#141417;border:1px solid #27272a;border-radius:14px;overflow:hidden}
    .tb-so th{background:#18181b;color:#71717a;font:600 12px system-ui;text-transform:uppercase;letter-spacing:.06em;
      padding:12px 20px;text-align:left;cursor:pointer;user-select:none;white-space:nowrap}
    .tb-so th:hover{color:#d4d4d8}
    .tb-so th .arr{display:inline-block;margin-left:6px;color:${accent};opacity:0;transition:transform .2s ease}
    .tb-so th.sorted .arr{opacity:1}
    .tb-so th.desc .arr{transform:rotate(180deg)}
    .tb-so td{padding:12px 20px;color:#d4d4d8;font:400 13.5px system-ui;border-top:1px solid #1e1e22}
    .tb-so td:first-child{color:#fafafa;font-weight:600}
    .tb-so tbody tr{transition:background .15s ease}
    .tb-so tbody tr:hover{background:#8b5cf60d}
  </style>
  <div class="tb-so"><table>
    <thead><tr>${columns.map((c, i) => `<th data-i="${i}">${c}<span class="arr">▲</span></th>`).join('')}</tr></thead>
    <tbody></tbody>
  </table></div>`;

  const tbody = container.querySelector<HTMLTableSectionElement>('tbody')!;
  const ths = [...container.querySelectorAll<HTMLTableElement>('th')];
  let sortIdx = -1;
  let desc = false;

  const render = () => {
    const data = [...rows];
    if (sortIdx >= 0) {
      data.sort((a, b) => {
        const va = a[sortIdx], vb = b[sortIdx];
        const cmp = typeof va === 'number' && typeof vb === 'number'
          ? va - vb
          : String(va).localeCompare(String(vb));
        return desc ? -cmp : cmp;
      });
    }
    tbody.innerHTML = data.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('');
  };

  const handler = (e: Event) => {
    const th = e.currentTarget as HTMLTableCellElement;
    const i = Number(th.dataset.i);
    if (sortIdx === i) desc = !desc;
    else { sortIdx = i; desc = false; }
    ths.forEach((t) => {
      t.classList.toggle('sorted', t === th);
      t.classList.toggle('desc', t === th && desc);
    });
    render();
  };
  ths.forEach((t) => t.addEventListener('click', handler));
  render();
  return () => {
    ths.forEach((t) => t.removeEventListener('click', handler));
    container.innerHTML = '';
  };
}
