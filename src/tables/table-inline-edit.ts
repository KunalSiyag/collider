/** Inline Edit Table — double-click a cell to edit with save/cancel on blur. */
export interface InlineEditTableOptions {
  rows?: Array<{ name: string; owner: string; role: string }>;
  accent?: string;
}

export function createInlineEditTable(container: HTMLElement, options: InlineEditTableOptions = {}): () => void {
  const {
    rows = [
      { name: 'Aurora', owner: 'ada', role: 'admin' },
      { name: 'Nimbus', owner: 'kai', role: 'editor' },
      { name: 'Zephyr', owner: 'rhea', role: 'viewer' },
    ],
    accent = '#22d3ee',
  } = options;

  container.innerHTML = `<style>
    .tb-ie{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .tb-ie table{border-collapse:collapse;background:#141417;border:1px solid #27272a;border-radius:14px;overflow:hidden}
    .tb-ie th{background:#18181b;color:#71717a;font:600 11px system-ui;text-transform:uppercase;
      letter-spacing:.06em;padding:11px 18px;text-align:left}
    .tb-ie td{padding:9px 18px;font:400 13px system-ui;color:#d4d4d8;border-top:1px solid #1e1e22;min-width:110px}
    .tb-ie .cell{cursor:text;border-radius:7px;padding:5px 8px;margin:-5px -8px;transition:background .15s ease,box-shadow .15s ease}
    .tb-ie .cell:hover{background:#ffffff08}
    .tb-ie .cell.editing{background:#0b0b10;box-shadow:0 0 0 2px ${accent};outline:none;color:#fafafa}
    .tb-ie .hint{margin-left:14px;color:#52525b;font:400 12px system-ui}
  </style>
  <div style="display:flex;align-items:center">
    <div class="tb-ie"><table>
      <thead><tr><th>Project</th><th>Owner</th><th>Role</th></tr></thead>
      <tbody>
        ${rows
          .map(
            (r) =>
              `<tr><td><div class="cell" tabindex="0">${r.name}</div></td><td><div class="cell" tabindex="0">${r.owner}</div></td><td><div class="cell" tabindex="0">${r.role}</div></td></tr>`,
          )
          .join('')}
      </tbody>
    </table></div>
    <span class="hint">double-click to edit</span>
  </div>`;

  const handler = (e: Event) => {
    const cell = e.target as HTMLElement;
    if (!cell.classList.contains('cell') || cell.classList.contains('editing')) return;
    const original = cell.textContent ?? '';
    cell.classList.add('editing');
    cell.contentEditable = 'true';
    cell.focus();
    document.getSelection()?.selectAllChildren(cell);

    const commit = (save: boolean) => {
      cell.contentEditable = 'false';
      cell.classList.remove('editing');
      if (!save || !cell.textContent!.trim()) cell.textContent = original;
      cell.removeEventListener('blur', blurHandler);
      cell.removeEventListener('keydown', keyHandler);
    };
    const blurHandler = () => commit(true);
    const keyHandler = (ev: KeyboardEvent) => {
      if (ev.key === 'Enter') { ev.preventDefault(); commit(true); }
      if (ev.key === 'Escape') commit(false);
    };
    cell.addEventListener('blur', blurHandler);
    cell.addEventListener('keydown', keyHandler);
  };

  container.addEventListener('dblclick', handler);
  return () => {
    container.removeEventListener('dblclick', handler);
    container.innerHTML = '';
  };
}
