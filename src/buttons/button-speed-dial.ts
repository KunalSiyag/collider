export interface SpeedDialOptions {
  actions?: string[];
}

export function createSpeedDialButton(container: HTMLElement, options: SpeedDialOptions = {}): () => void {
  const actions = options.actions ?? ['✎', '📎', '🗑'];
  const n = actions.length;

  container.innerHTML = `
    <style>
      .cl-sd { position:relative; height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-sd-main { position:relative; z-index:2; width:58px; height:58px; font-size:24px; color:#fff;
        background:linear-gradient(135deg,#8b5cf6,#f472b6); border:none; border-radius:50%; cursor:pointer;
        box-shadow:0 6px 20px rgba(139,92,246,.45); transition:transform .3s cubic-bezier(.34,1.56,.64,1); }
      .cl-sd-main:hover { transform:scale(1.08); }
      .cl-sd-main:focus-visible { outline:2px solid #a78bfa; outline-offset:4px; }
      .cl-sd-main[aria-expanded="true"] { transform:rotate(135deg); }
      .cl-sd-item { position:absolute; left:50%; top:50%; width:44px; height:44px; font-size:17px; color:#e4e4e7;
        background:#1c1c28; border:1px solid #3f3f46; border-radius:50%; cursor:pointer;
        transition:transform .3s cubic-bezier(.34,1.56,.64,1), opacity .25s ease, background .2s ease;
        opacity:0; pointer-events:none; }
      .cl-sd-item:hover { background:#8b5cf6; color:#fff; }
      .cl-sd-item:focus-visible { outline:2px solid #22d3ee; outline-offset:2px; }
    </style>
    <div class="cl-sd">
      <button type="button" class="cl-sd-main" aria-expanded="false" aria-label="Open quick actions">+</button>
      ${actions.map((_, i) => `<button type="button" class="cl-sd-item" data-i="${i}" aria-label="Action ${i + 1}">${actions[i]}</button>`).join('')}
    </div>
  `;

  const main = container.querySelector<HTMLButtonElement>('.cl-sd-main')!;
  const items = Array.from(container.querySelectorAll<HTMLButtonElement>('.cl-sd-item'));
  let open = false;

  function layout() {
    items.forEach((item, i) => {
      if (!open) {
        item.style.transform = 'translate(-50%,-50%)';
        return;
      }
      const angle = -Math.PI / 2 + (i - (n - 1) / 2) * 0.62;
      const r = 86;
      item.style.transform =
        `translate(calc(-50% + ${Math.cos(angle) * r}px), calc(-50% + ${Math.sin(angle) * r}px))`;
    });
    items.forEach((it) => {
      it.style.opacity = open ? '1' : '0';
      it.style.pointerEvents = open ? 'auto' : 'none';
    });
  }

  function toggle() {
    open = !open;
    main.setAttribute('aria-expanded', String(open));
    layout();
  }

  main.addEventListener('click', toggle);

  return () => {
    main.removeEventListener('click', toggle);
    container.innerHTML = '';
  };
}
