export interface VinylSpinOptions {
  label?: string;
}

export function createVinylSpinButton(container: HTMLElement, options: VinylSpinOptions = {}): () => void {
  const { label = 'Play record' } = options;

  container.innerHTML = `
    <style>
      .cl-vn { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; gap:18px;
        font-size:14.5px; font-weight:600; color:#e4e4e7; }
      .cl-vn-disc { width:74px; height:74px; border-radius:50%;
        background:repeating-radial-gradient(circle, #18181f 0 3px, #232330 3px 4px);
        border:2px solid #3f3f46; position:relative; cursor:pointer;
        display:flex; align-items:center; justify-content:center;
        transition:box-shadow .3s ease; }
      .cl-vn-disc:hover { box-shadow:0 0 20px rgba(139,92,246,.35); }
      .cl-vn-label { width:24px; height:24px; border-radius:50%; background:#f472b6; }
      .cl-vn-spin { animation:cl-vn-turn 1.8s linear infinite; }
      @keyframes cl-vn-turn { to { transform:rotate(360deg); } }
      .cl-vn-btn { padding:11px 24px; font-size:15px; font-weight:700; color:#fff;
        background:linear-gradient(120deg,#8b5cf6,#f472b6); border:none; border-radius:999px; cursor:pointer;
        transition:filter .2s ease; }
      .cl-vn-btn:hover { filter:brightness(1.12); }
      .cl-vn-btn:focus-visible { outline:2px solid #a78bfa; outline-offset:3px; }
    </style>
    <div class="cl-vn">
      <button type="button" class="cl-vn-btn" aria-pressed="false">${label}</button>
      <span class="cl-vn-disc" aria-hidden="true"><span class="cl-vn-label"></span></span>
    </div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-vn-btn')!;
  const disc = container.querySelector<HTMLElement>('.cl-vn-disc')!;
  let on = false;

  function onClick() {
    on = !on;
    btn.setAttribute('aria-pressed', String(on));
    btn.textContent = on ? 'Stop' : label;
    disc.classList.toggle('cl-vn-spin', on);
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
