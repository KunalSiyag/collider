/** Context Menu — a right-click menu with icons, separators and a danger item. */
export interface ContextMenuOptions {
  items?: Array<{ label: string; icon?: string; danger?: boolean } | 'sep'>;
  accent?: string;
}

export function createContextContextMenu(container: HTMLElement, options: ContextMenuOptions = {}): () => void {
  const {
    items = [
      { label: 'Open', icon: '↗' },
      { label: 'Rename', icon: '✎' },
      { label: 'Duplicate', icon: '⧉' },
      'sep',
      { label: 'Move to trash', icon: '🗑', danger: true },
    ],
    accent = '#8b5cf6',
  } = options;

  container.innerHTML = `<style>
    .ov-cm{height:100%;display:grid;place-items:center;background:#0b0b10}
    .ov-cm .hint{color:#52525b;font:400 13px system-ui;user-select:none}
    .ov-cm .menu{position:fixed;z-index:50;min-width:190px;background:#18181b;border:1px solid #3f3f46;
      border-radius:12px;padding:6px;box-shadow:0 20px 50px rgba(0,0,0,.6);
      opacity:0;pointer-events:none;transform:scale(.94);transform-origin:top left;
      transition:opacity .15s ease,transform .18s cubic-bezier(.3,1.2,.4,1)}
    .ov-cm .menu.open{opacity:1;pointer-events:auto;transform:none}
    .ov-cm .mi{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;cursor:pointer;
      color:#d4d4d8;font:400 13px system-ui}
    .ov-cm .mi:hover{background:#27272a}
    .ov-cm .mi .ic{width:16px;text-align:center;color:#71717a}
    .ov-cm .mi.danger{color:#f87171}
    .ov-cm .mi.danger .ic{color:#f87171}
    .ov-cm .mi.danger:hover{background:#dc262622}
    .ov-cm hr{border:none;border-top:1px solid #27272a;margin:5px 8px}
  </style>
  <div class="ov-cm">
    <span class="hint">Right-click anywhere to open the menu</span>
    <div class="menu" role="menu">
      ${items
        .map((it) =>
          it === 'sep'
            ? '<hr/>'
            : `<div class="mi ${'danger' in it && it.danger ? 'danger' : ''}" role="menuitem"><span class="ic">${it.icon ?? ''}</span>${it.label}</div>`,
        )
        .join('')}
    </div>
  </div>`;

  const root = container.querySelector<HTMLElement>('.ov-cm')!;
  const menu = container.querySelector<HTMLElement>('.menu')!;

  const onContext = (e: MouseEvent) => {
    e.preventDefault();
    menu.classList.add('open');
    const mw = menu.offsetWidth, mh = menu.offsetHeight;
    menu.style.left = `${Math.min(e.clientX, window.innerWidth - mw - 8)}px`;
    menu.style.top = `${Math.min(e.clientY, window.innerHeight - mh - 8)}px`;
  };
  const onAnyClick = () => menu.classList.remove('open');
  root.addEventListener('contextmenu', onContext);
  window.addEventListener('click', onAnyClick);
  return () => {
    root.removeEventListener('contextmenu', onContext);
    window.removeEventListener('click', onAnyClick);
    container.innerHTML = '';
  };
}
