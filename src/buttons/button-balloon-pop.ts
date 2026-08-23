export interface BalloonPopOptions {
  label?: string;
}

export function createBalloonPopButton(container: HTMLElement, options: BalloonPopOptions = {}): () => void {
  const { label = 'Pop it' } = options;

  container.innerHTML = `
    <style>
      .cl-bp { position:relative; height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; overflow:hidden; }
      .cl-bp-balloon { position:absolute; bottom:-70px; left:50%; font-size:52px;
        transform:translateX(-50%); transition:bottom 2.4s ease-in, opacity .15s ease; }
      .cl-bp-btn { z-index:2; padding:13px 32px; font-size:15px; font-weight:800; color:#fff;
        background:linear-gradient(120deg,#f472b6,#8b5cf6); border:none; border-radius:999px; cursor:pointer;
        transition:filter .2s ease; }
      .cl-bp-btn:hover { filter:brightness(1.12); }
      .cl-bp-btn:focus-visible { outline:2px solid #f472b6; outline-offset:4px; }
    </style>
    <div class="cl-bp">
      <button type="button" class="cl-bp-btn">🎈 ${label}</button>
    </div>
  `;

  const wrap = container.querySelector<HTMLElement>('.cl-bp')!;
  const btn = container.querySelector<HTMLButtonElement>('.cl-bp-btn')!;
  let busy = false;

  function onClick() {
    if (busy) return;
    busy = true;
    const b = document.createElement('span');
    b.className = 'cl-bp-balloon';
    b.textContent = '🎈';
    b.style.left = `${20 + Math.random() * 60}%`;
    wrap.appendChild(b);
    requestAnimationFrame(() => { b.style.bottom = `${wrap.offsetHeight + 40}px`; });
    setTimeout(() => {
      b.textContent = '💥';
      b.style.opacity = '1';
      b.animate([{ transform: `translateX(-50%) scale(1.6)` }, { transform: 'translateX(-50%) scale(0)', opacity: 0 }],
        { duration: 260, easing: 'ease-out' }).onfinish = () => {
        b.remove();
        busy = false;
      };
    }, 2300);
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
