export interface BubbleWrapOptions {
  label?: string;
}

export function createBubbleWrapButton(container: HTMLElement, options: BubbleWrapOptions = {}): () => void {
  const { label = 'Pop' } = options;
  const cols = 6;

  container.innerHTML = `
    <style>
      .cl-bw { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-bw-grid { position:relative; display:grid; grid-template-columns:repeat(${cols}, 1fr); gap:9px;
        padding:18px; background:#141420; border:1px solid #3f3f46; border-radius:16px; }
      .cl-bw-cell { width:34px; height:34px; border-radius:50%; cursor:pointer; border:none;
        background:radial-gradient(circle at 35% 30%, #3a3a4d, #22222e 70%);
        box-shadow:inset -2px -3px 5px rgba(0,0,0,.55), inset 2px 2px 4px rgba(255,255,255,.08);
        transition:transform .12s ease, background .3s ease, box-shadow .3s ease; }
      .cl-bw-cell:hover { background:radial-gradient(circle at 35% 30%, #4c4c66, #26262f 70%); }
      .cl-bw-cell:focus-visible { outline:2px solid #a78bfa; outline-offset:2px; }
      .cl-bw-cell[data-popped="true"] { transform:scale(.82); cursor:default;
        background:radial-gradient(circle at 50% 50%, #12121a, #1b1b26);
        box-shadow:inset 3px 4px 7px rgba(0,0,0,.75); }
      .cl-bw-reset { margin-top:12px; grid-column:1 / -1; padding:8px 0; font-size:13px; font-weight:700;
        color:#a78bfa; background:none; border:none; border-radius:8px; cursor:pointer; transition:color .2s ease; }
      .cl-bw-reset:hover { color:#c4b5fd; }
      .cl-bw-reset:focus-visible { outline:2px solid #a78bfa; outline-offset:2px; }
    </style>
    <div class="cl-bw">
      <div class="cl-bw-grid" role="group" aria-label="${label} bubble wrap">
        ${Array.from({ length: cols * cols }, () => `<button type="button" class="cl-bw-cell" data-popped="false" aria-label="Pop bubble"></button>`).join('')}
        <button type="button" class="cl-bw-reset">Reset wrap</button>
      </div>
    </div>
  `;

  const cells = Array.from(container.querySelectorAll<HTMLButtonElement>('.cl-bw-cell'));
  const reset = container.querySelector<HTMLButtonElement>('.cl-bw-reset')!;

  function onCell(c: HTMLButtonElement) {
    return () => {
      if (c.dataset.popped === 'true') return;
      c.dataset.popped = 'true';
      c.setAttribute('aria-label', 'Popped');
      c.animate(
        [{ transform: 'scale(1.25)' }, { transform: 'scale(.82)' }],
        { duration: 180, easing: 'ease-out' },
      );
    };
  }

  const handlers = cells.map((c) => onCell(c));
  cells.forEach((c, i) => c.addEventListener('click', handlers[i]));

  function onReset() {
    cells.forEach((c) => {
      c.dataset.popped = 'false';
      c.setAttribute('aria-label', 'Pop bubble');
    });
  }

  reset.addEventListener('click', onReset);

  return () => {
    cells.forEach((c, i) => c.removeEventListener('click', handlers[i]));
    reset.removeEventListener('click', onReset);
    container.innerHTML = '';
  };
}
