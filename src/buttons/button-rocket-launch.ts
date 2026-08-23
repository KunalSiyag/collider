export interface RocketLaunchOptions {
  label?: string;
}

export function createRocketLaunchButton(container: HTMLElement, options: RocketLaunchOptions = {}): () => void {
  const { label = 'Launch' } = options;

  container.innerHTML = `
    <style>
      .cl-rk { position:relative; height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; overflow:hidden; }
      .cl-rk-ship { position:absolute; left:50%; bottom:-40px; font-size:34px; transform:translateX(-50%);
        transition:bottom 1.1s cubic-bezier(.55,0,.85,.45), opacity 1.1s ease; }
      .cl-rk-btn { padding:15px 38px; font-size:15.5px; font-weight:800; letter-spacing:.08em;
        text-transform:uppercase; color:#fff;
        background:linear-gradient(120deg,#8b5cf6,#f472b6); border:none; border-radius:999px; cursor:pointer;
        transition:filter .2s ease, transform .12s ease, opacity .3s ease; }
      .cl-rk-btn:hover { filter:brightness(1.12); }
      .cl-rk-btn:focus-visible { outline:2px solid #c4b5fd; outline-offset:4px; }
      .cl-rk-btn:active { transform:scale(.95); }
    </style>
    <div class="cl-rk">
      <span class="cl-rk-ship" aria-hidden="true">🚀</span>
      <button type="button" class="cl-rk-btn">${label}</button>
    </div>
  `;

  const wrap = container.querySelector<HTMLElement>('.cl-rk')!;
  const ship = container.querySelector<HTMLElement>('.cl-rk-ship')!;
  const btn = container.querySelector<HTMLButtonElement>('.cl-rk-btn')!;

  function onClick() {
    btn.disabled = true;
    btn.style.opacity = '0';
    ship.style.bottom = `${wrap.offsetHeight + 60}px`;
    ship.style.opacity = '0';
    setTimeout(() => {
      ship.style.transition = 'none';
      ship.style.bottom = '-40px';
      ship.style.opacity = '1';
      void ship.offsetWidth;
      ship.style.transition = '';
      btn.disabled = false;
      btn.style.opacity = '1';
    }, 1400);
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
