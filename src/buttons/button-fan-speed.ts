export interface FanSpeedOptions {
  label?: string;
}

export function createFanSpeedButton(container: HTMLElement, options: FanSpeedOptions = {}): () => void {
  const { label = 'Fan' } = options;

  container.innerHTML = `
    <style>
      .cl-fn { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; gap:14px;
        font-size:14px; font-weight:700; color:#a1a1aa; }
      .cl-fn-btn { position:relative; width:64px; height:64px; font-size:30px; line-height:1;
        background:#16161f; border:1px solid #3f3f46; border-radius:50%; cursor:pointer;
        transition:border-color .25s ease, box-shadow .3s ease; }
      .cl-fn-btn:hover { border-color:#22d3ee; }
      .cl-fn-btn:focus-visible { outline:2px solid #67e8f9; outline-offset:4px; }
      .cl-fn-blade { display:inline-block; }
      .cl-fn-btn[data-speed="0"] .cl-fn-blade { animation:none; }
      .cl-fn-btn[data-speed="1"] .cl-fn-blade { animation:cl-fn-spin 1.6s linear infinite; }
      .cl-fn-btn[data-speed="2"] .cl-fn-blade { animation:cl-fn-spin .8s linear infinite; }
      .cl-fn-btn[data-speed="3"] .cl-fn-blade { animation:cl-fn-spin .35s linear infinite;
        filter:blur(.5px); color:#67e8f9; }
      .cl-fn-btn[data-speed="3"] { border-color:#22d3ee; box-shadow:0 0 16px rgba(34,211,238,.4); }
      @keyframes cl-fn-spin { to { transform:rotate(360deg); } }
      .cl-fn-level { min-width:56px; text-align:left; }
    </style>
    <div class="cl-fn">
      <button type="button" class="cl-fn-btn" data-speed="0" aria-label="${label}: off"><span class="cl-fn-blade">✳</span></button>
      <span class="cl-fn-level">Off</span>
    </div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-fn-btn')!;
  const level = btn.nextElementSibling as HTMLElement;
  const names = ['Off', 'Low', 'Medium', 'High'];
  let speed = 0;

  function onClick() {
    speed = (speed + 1) % 4;
    btn.dataset.speed = String(speed);
    level.textContent = names[speed];
    btn.setAttribute('aria-label', `${label}: ${names[speed]}`);
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
