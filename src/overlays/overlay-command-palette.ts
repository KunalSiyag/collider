/** Command Palette — a ⌘K launcher with fuzzy filter and keyboard navigation. */
export interface CommandPaletteOptions {
  commands?: string[];
  accent?: string;
}

export function createCommandPalette(container: HTMLElement, options: CommandPaletteOptions = {}): () => void {
  const {
    commands = [
      'Toggle dark mode', 'New project…', 'Invite teammate…', 'Open settings',
      'Search docs…', 'Switch workspace…', 'Duplicate page', 'Export as PDF',
    ],
    accent = '#8b5cf6',
  } = options;

  container.innerHTML = `<style>
    .ov-cp{height:100%;position:relative;display:grid;place-items:start center;background:#0b0b10;padding-top:60px}
    .ov-cp .dim{position:absolute;inset:0;background:rgba(0,0,0,.5)}
    .ov-cp .palette{position:relative;width:min(440px,90%);background:#141417;border:1px solid #3f3f46;
      border-radius:16px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.6);
      transform:translateY(-10px) scale(.98);opacity:0;transition:all .28s cubic-bezier(.3,1.1,.4,1)}
    .ov-cp.open .palette{transform:none;opacity:1}
    .ov-cp .search{display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid #27272a}
    .ov-cp .search svg{width:16px;height:16px;stroke:#71717a;flex:none}
    .ov-cp input{flex:1;background:transparent;border:none;outline:none;color:#fafafa;font:400 14.5px system-ui}
    .ov-cp kbd{font:600 10.5px ui-monospace,monospace;color:#71717a;border:1px solid #3f3f46;border-radius:5px;padding:2px 6px}
    .ov-cp ul{list-style:none;margin:0;padding:8px;max-height:240px;overflow:auto}
    .ov-cp li{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:9px;cursor:pointer;
      color:#a1a1aa;font:400 13.5px system-ui}
    .ov-cp li.sel{background:${accent}1f;color:#fafafa}
    .ov-cp li.sel::after{content:'↵';margin-left:auto;color:${accent};font-weight:700}
    .ov-cp .empty{padding:22px;text-align:center;color:#52525b;font:400 13px system-ui}
  </style>
  <div class="ov-cp open">
    <div class="dim"></div>
    <div class="palette" role="dialog" aria-label="Command palette">
      <div class="search">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
        <input type="text" placeholder="Type a command or search…" aria-label="Search commands"/>
        <kbd>ESC</kbd>
      </div>
      <ul></ul>
    </div>
  </div>`;

  const root = container.querySelector<HTMLElement>('.ov-cp')!;
  const input = container.querySelector<HTMLInputElement>('input')!;
  const list = container.querySelector<HTMLUListElement>('ul')!;
  let sel = 0;
  let visible: string[] = [];

  const render = () => {
    const q = input.value.toLowerCase();
    visible = commands.filter((c) => c.toLowerCase().includes(q));
    sel = Math.min(sel, Math.max(0, visible.length - 1));
    list.innerHTML = visible.length
      ? visible.map((c, i) => `<li class="${i === sel ? 'sel' : ''}" data-i="${i}">${c}</li>`).join('')
      : '<li class="empty">No matching commands</li>';
  };

  const move = (d: number) => {
    if (!visible.length) return;
    sel = (sel + d + visible.length) % visible.length;
    render();
  };

  input.addEventListener('input', () => {
    sel = 0;
    render();
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
    else if (e.key === 'Escape') root.classList.remove('open');
  });
  list.addEventListener('click', (e) => {
    const li = (e.target as HTMLElement).closest('li[data-i]');
    if (li) { input.value = visible[Number(li.dataset.i)]; render(); }
  });

  render();
  requestAnimationFrame(() => input.focus());
  return () => { container.innerHTML = ''; };
}
