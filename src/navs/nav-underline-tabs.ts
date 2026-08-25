/** Underline Tabs — tabs with an animated underline that stretches between them. */
export interface UnderlineTabsOptions {
  items?: string[];
  active?: number;
  accent?: string;
  onSelect?: (item: string, index: number) => void;
}

export function createUnderlineTabs(container: HTMLElement, options: UnderlineTabsOptions = {}): () => void {
  const { items = ['All', 'Docs', 'Guides', 'API', 'Changelog'], active = 0, accent = '#22d3ee', onSelect } = options;
  container.innerHTML = `<style>
    .nv-ut{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .nv-ut .tabs{position:relative;display:flex;gap:6px;border-bottom:1px solid #27272a;padding:0 8px}
    .nv-ut button{border:none;background:transparent;color:#71717a;cursor:pointer;font:500 14px system-ui;
      padding:13px 16px;transition:color .18s ease}
    .nv-ut button:hover{color:#d4d4d8}
    .nv-ut button.on{color:#fafafa}
    .nv-ut .line{position:absolute;bottom:-1px;height:2.5px;border-radius:2px;background:${accent};
      transition:left .32s cubic-bezier(.3,1,.35,1),width .32s cubic-bezier(.3,1,.35,1)}
  </style>
  <div class="nv-ut"><div class="tabs" role="tablist">
    <span class="line"></span>
    ${items.map((t, i) => `<button type="button" role="tab" aria-selected="${i === active}" class="${i === active ? 'on' : ''}" data-i="${i}">${t}</button>`).join('')}
  </div></div>`;

  const line = container.querySelector<HTMLElement>('.line')!;
  const btns = [...container.querySelectorAll<HTMLButtonElement>('button')];

  const move = (btn: HTMLButtonElement) => {
    line.style.left = `${btn.offsetLeft + 8}px`;
    line.style.width = `${btn.offsetWidth - 16}px`;
  };
  const handler = (e: Event) => {
    const btn = e.currentTarget as HTMLButtonElement;
    btns.forEach((b) => {
      b.classList.remove('on');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('on');
    btn.setAttribute('aria-selected', 'true');
    move(btn);
    onSelect?.(btn.textContent ?? '', Number(btn.dataset.i));
  };
  btns.forEach((b) => {
    b.addEventListener('click', handler);
    if (b.classList.contains('on')) move(b);
  });
  requestAnimationFrame(() => move(container.querySelector<HTMLButtonElement>('button.on') ?? btns[0]));

  return () => {
    btns.forEach((b) => b.removeEventListener('click', handler));
    container.innerHTML = '';
  };
}
