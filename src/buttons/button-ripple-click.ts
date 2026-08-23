export interface RippleClickOptions {
  label?: string;
}

export function createRippleClickButton(container: HTMLElement, options: RippleClickOptions = {}): () => void {
  const { label = 'Ripple click' } = options;

  container.innerHTML = `
    <style>
      .cl-rc { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-rc-btn { position:relative; overflow:hidden; padding:16px 44px; font-size:15.5px; font-weight:700;
        color:#fff; background:#8b5cf6; border:none; border-radius:12px; cursor:pointer;
        transition:filter .2s ease, transform .1s ease; }
      .cl-rc-btn:hover { filter:brightness(1.1); }
      .cl-rc-btn:focus-visible { outline:2px solid #c4b5fd; outline-offset:3px; }
      .cl-rc-btn:active { transform:scale(.97); }
      .cl-rc-wave { position:absolute; border-radius:50%; transform:translate(-50%,-50%) scale(0);
        background:rgba(255,255,255,.45); pointer-events:none; animation:cl-rc-spread .6s ease-out forwards; }
      @keyframes cl-rc-spread { to { transform:translate(-50%,-50%) scale(1); opacity:0; } }
    </style>
    <div class="cl-rc"><button type="button" class="cl-rc-btn">${label}</button></div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-rc-btn')!;

  function onClick(e: MouseEvent) {
    const r = btn.getBoundingClientRect();
    const size = Math.max(r.width, r.height) * 2.2;
    const wave = document.createElement('span');
    wave.className = 'cl-rc-wave';
    wave.style.width = wave.style.height = `${size}px`;
    wave.style.left = `${e.clientX - r.left}px`;
    wave.style.top = `${e.clientY - r.top}px`;
    btn.appendChild(wave);
    wave.addEventListener('animationend', () => wave.remove());
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
