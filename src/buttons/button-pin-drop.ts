export interface PinDropOptions {
  label?: string;
}

export function createPinDropButton(container: HTMLElement, options: PinDropOptions = {}): () => void {
  const { label = 'Drop pin' } = options;

  container.innerHTML = `
    <style>
      .cl-pd { position:relative; height:100%; display:flex; align-items:center; justify-content:center;
        background:#0b0b10; overflow:hidden; }
      .cl-pd-map { position:absolute; inset:0; opacity:.25; pointer-events:none;
        background-image:linear-gradient(#27272a 1px, transparent 1px), linear-gradient(90deg, #27272a 1px, transparent 1px);
        background-size:34px 34px; }
      .cl-pd-pin { position:absolute; left:50%; top:-40px; font-size:32px; transform:translateX(-50%);
        transition:top .5s cubic-bezier(.55,.06,.68,.19); filter:drop-shadow(0 4px 6px rgba(0,0,0,.6)); }
      .cl-pd-btn { z-index:2; padding:13px 30px; font-size:15px; font-weight:700; color:#e4e4e7;
        background:#16161fd9; border:1px solid #8b5cf6; border-radius:10px; cursor:pointer; backdrop-filter:blur(4px);
        transition:box-shadow .25s ease; }
      .cl-pd-btn:hover { box-shadow:0 0 16px rgba(139,92,246,.45); }
      .cl-pd-btn:focus-visible { outline:2px solid #a78bfa; outline-offset:3px; }
    </style>
    <div class="cl-pd">
      <span class="cl-pd-map" aria-hidden="true"></span>
      <span class="cl-pd-pin" aria-hidden="true">📍</span>
      <button type="button" class="cl-pd-btn">${label}</button>
    </div>
  `;

  const wrap = container.querySelector<HTMLElement>('.cl-pd')!;
  const pin = container.querySelector<HTMLElement>('.cl-pd-pin')!;
  const btn = container.querySelector<HTMLButtonElement>('.cl-pd-btn')!;

  function onClick() {
    const r = wrap.getBoundingClientRect();
    pin.style.left = `${15 + Math.random() * 70}%`;
    pin.style.top = '-40px';
    void pin.offsetWidth;
    pin.style.top = `${20 + Math.random() * 45}%`;
    pin.animate(
      [{ transform: 'translateX(-50%) scale(1.4)' }, { transform: 'translateX(-50%) scale(1)' }],
      { duration: 300, easing: 'ease-out' },
    );
    void r;
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
