export interface CartAddOptions {
  label?: string;
}

export function createCartAddButton(container: HTMLElement, options: CartAddOptions = {}): () => void {
  const { label = 'Add to cart' } = options;

  container.innerHTML = `
    <style>
      .cl-crt { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-crt-btn { display:flex; align-items:center; gap:10px; padding:13px 28px; font-size:15px; font-weight:700;
        color:#0b0b10; background:#67e8f9; border:none; border-radius:12px; cursor:pointer;
        transition:filter .2s ease, transform .12s ease; }
      .cl-crt-btn:hover { filter:brightness(1.1); }
      .cl-crt-btn:focus-visible { outline:2px solid #22d3ee; outline-offset:3px; }
      .cl-crt-btn:active { transform:scale(.96); }
      .cl-crt-fly { position:absolute; font-size:16px; pointer-events:none; z-index:5; }
    </style>
    <div class="cl-crt" style="position:relative">
      <button type="button" class="cl-crt-btn">🛒 ${label}</button>
    </div>
  `;

  const wrap = container.querySelector<HTMLElement>('.cl-crt')!;
  const btn = container.querySelector<HTMLButtonElement>('.cl-crt-btn')!;

  function onClick(e: MouseEvent) {
    const r = wrap.getBoundingClientRect();
    const fly = document.createElement('span');
    fly.className = 'cl-crt-fly';
    fly.textContent = '📦';
    fly.style.left = `${e.clientX - r.left}px`;
    fly.style.top = `${e.clientY - r.top}px`;
    wrap.appendChild(fly);
    fly.animate(
      [
        { transform: 'translate(0,0) scale(1)', opacity: 1 },
        { transform: 'translate(70px,-46px) scale(.35)', opacity: 0 },
      ],
      { duration: 600, easing: 'cubic-bezier(.4,0,.6,1)' },
    ).onfinish = () => {
      fly.remove();
      btn.animate(
        [{ transform: 'scale(1)' }, { transform: 'scale(1.06)' }, { transform: 'scale(1)' }],
        { duration: 240, easing: 'ease-out' },
      );
    };
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
