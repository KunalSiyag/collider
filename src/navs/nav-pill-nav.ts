/** Pill Nav — a sliding pill indicator that glides between items. */
export interface PillNavOptions {
  items?: string[];
  active?: number;
  accent?: string;
  onSelect?: (item: string, index: number) => void;
}

export function createPillNav(container: HTMLElement, options: PillNavOptions = {}): () => void {
  const { items = ['Overview', 'Analytics', 'Reports', 'Settings'], active = 0, accent = '#8b5cf6', onSelect } = options;
  container.innerHTML = `<style>
    .nv-pn{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .nv-pn .bar{position:relative;display:inline-flex;gap:2px;padding:5px;border-radius:999px;
      background:#18181b;border:1px solid #27272a}
    .nv-pn .pill{position:absolute;top:5px;bottom:5px;border-radius:999px;background:${accent};
      transition:left .3s cubic-bezier(.3,1.2,.35,1),width .3s cubic-bezier(.3,1.2,.35,1);z-index:0}
    .nv-pn button{position:relative;z-index:1;border:none;background:transparent;color:#a1a1aa;cursor:pointer;
      font:500 13.5px system-ui;padding:9px 18px;border-radius:999px;transition:color .2s ease}
    .nv-pn button.on{color:#fff}
  </style>
  <div class="nv-pn"><nav class="bar" aria-label="Primary">
    <span class="pill"></span>
    ${items.map((t, i) => `<button type="button" class="${i === active ? 'on' : ''}" data-i="${i}">${t}</button>`).join('')}
  </nav></div>`;

  const pill = container.querySelector<HTMLElement>('.pill')!;
  const btns = [...container.querySelectorAll<HTMLButtonElement>('button')];

  const move = (btn: HTMLButtonElement) => {
    pill.style.left = `${btn.offsetLeft}px`;
    pill.style.width = `${btn.offsetWidth}px`;
  };

  const handler = (e: Event) => {
    const btn = e.currentTarget as HTMLButtonElement;
    btns.forEach((b) => b.classList.remove('on'));
    btn.classList.add('on');
    move(btn);
    onSelect?.(btn.textContent ?? '', Number(btn.dataset.i));
  };
  btns.forEach((b) => {
    b.addEventListener('click', handler);
    if (b.classList.contains('on')) move(b);
  });
  // Position once fonts/layout settle.
  requestAnimationFrame(() => {
    const on = container.querySelector<HTMLButtonElement>('button.on') ?? btns[0];
    move(on);
  });

  return () => {
    btns.forEach((b) => b.removeEventListener('click', handler));
    container.innerHTML = '';
  };
}
