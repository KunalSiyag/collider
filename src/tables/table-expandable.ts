/** Expandable Table — rows that unfold extra detail with a rotating chevron. */
export interface ExpandableTableOptions {
  rows?: Array<{ name: string; status: string; tone: string; detail: string }>;
}

export function createExpandableTable(container: HTMLElement, options: ExpandableTableOptions = {}): () => void {
  const {
    rows = [
      { name: 'collider-web', status: 'Passing', tone: '#4ade80', detail: '1,842 tests · 2m 14s · node 22' },
      { name: 'design-tokens', status: 'Passing', tone: '#4ade80', detail: '312 tests · 41s · node 22' },
      { name: 'legacy-api', status: 'Failing', tone: '#ef4444', detail: '2 flaky tests · retrying · node 20' },
      { name: 'docs-site', status: 'Passing', tone: '#4ade80', detail: '96 tests · 33s · node 22' },
    ],
  } = options;

  container.innerHTML = `<style>
    .tb-ex{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .tb-ex table{border-collapse:collapse;background:#141417;border:1px solid #27272a;border-radius:14px;overflow:hidden;width:430px}
    .tb-ex .main{cursor:pointer}
    .tb-ex td{padding:12px 16px;font:400 13px system-ui;color:#d4d4d8;border-top:1px solid #1e1e22}
    .tb-ex tr:first-child td{border-top:none}
    .tb-ex .name{color:#fafafa;font-weight:600}
    .tb-ex .pill{display:inline-flex;align-items:center;gap:6px;font:600 11.5px system-ui;
      padding:3px 10px;border-radius:999px}
    .tb-ex .pill::before{content:'';width:6px;height:6px;border-radius:999px;background:var(--tone)}
    .tb-ex .pill{color:var(--tone);background:color-mix(in srgb,var(--tone) 14%,transparent)}
    .tb-ex .chev{border:none;background:transparent;color:#71717a;cursor:pointer;font-size:12px;
      transition:transform .25s cubic-bezier(.3,1.2,.4,1);padding:4px}
    .tb-ex tr.open .chev{transform:rotate(90deg);color:#fafafa}
    .tb-ex .detail td{background:#101013;color:#71717a;font:400 12px ui-monospace,monospace}
    .tb-ex .detail{display:none}
    .tb-ex tr.open + .detail{display:table-row;animation:tb-ex-in .3s ease}
    @keyframes tb-ex-in{from{opacity:0}to{opacity:1}}
  </style>
  <div class="tb-ex"><table>
    ${rows
      .map(
        (r, i) => `<tbody data-i="${i}">
          <tr class="main"><td class="name">${r.name}</td>
            <td><span class="pill" style="--tone:${r.tone}">${r.status}</span></td>
            <td style="text-align:right"><button type="button" class="chev" aria-label="Toggle detail">▶</button></td></tr>
          <tr class="detail"><td colspan="3">${r.detail}</td></tr>
        </tbody>`,
      )
      .join('')}
  </table></div>`;

  container.querySelectorAll('.main').forEach((tr) => {
    tr.addEventListener('click', () => tr.closest('tbody')!.classList.toggle('open'));
  });
  return () => { container.innerHTML = ''; };
}
