/** Rail Nav — a slim vertical rail with tooltips and an active indicator dot. */
export interface RailNavOptions {
  items?: Array<{ icon: string; label: string }>;
  active?: number;
  accent?: string;
  onSelect?: (index: number) => void;
}

export function createRailNav(container: HTMLElement, options: RailNavOptions = {}): () => void {
  const {
    items = [
      { icon: '⌂', label: 'Home' },
      { icon: '✉', label: 'Inbox' },
      { icon: '📅', label: 'Calendar' },
      { icon: '✎', label: 'Drafts' },
      { icon: '⚙', label: 'Settings' },
    ],
    active = 1, accent = '#8b5cf6', onSelect,
  } = options;

  container.innerHTML = `<style>
    .nv-rl{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .nv-rl .rail{display:flex;flex-direction:column;gap:6px;padding:12px 10px;border-radius:16px;
      background:#18181b;border:1px solid #27272a}
    .nv-rl .item{position:relative;display:grid;place-items:center;width:44px;height:44px;border-radius:12px;
      border:none;background:transparent;color:#71717a;font-size:19px;cursor:pointer;transition:all .18s ease}
    .nv-rl .item:hover{color:#fafafa;background:#27272a}
    .nv-rl .item.on{color:${accent};background:${accent}1c}
    .nv-rl .item.on::before{content:'';position:absolute;left:-10px;top:50%;translate:0 -50%;
      width:4px;height:22px;border-radius:4px;background:${accent}}
    .nv-rl .tip{position:absolute;left:calc(100% + 12px);top:50%;translate:0 -50%;white-space:nowrap;
      background:#fafafa;color:#18181b;font:600 11.5px system-ui;padding:5px 9px;border-radius:7px;
      opacity:0;pointer-events:none;transition:opacity .15s ease,translate .15s ease}
    .nv-rl .item:hover .tip{opacity:1;translate:4px -50%}
  </style>
  <div class="nv-rl"><nav class="rail" aria-label="Rail">
    ${items
      .map(
        (it, i) =>
          `<button type="button" class="item ${i === active ? 'on' : ''}" data-i="${i}" aria-label="${it.label}">${it.icon}<span class="tip">${it.label}</span></button>`,
      )
      .join('')}
  </nav></div>`;

  const btns = [...container.querySelectorAll<HTMLButtonElement>('.item')];
  const handler = (e: Event) => {
    const btn = e.currentTarget as HTMLButtonElement;
    btns.forEach((b) => b.classList.remove('on'));
    btn.classList.add('on');
    onSelect?.(Number(btn.dataset.i));
  };
  btns.forEach((b) => b.addEventListener('click', handler));
  return () => {
    btns.forEach((b) => b.removeEventListener('click', handler));
    container.innerHTML = '';
  };
}
