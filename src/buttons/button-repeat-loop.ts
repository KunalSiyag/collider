export interface RepeatLoopOptions {
  label?: string;
}

export function createRepeatLoopButton(container: HTMLElement, options: RepeatLoopOptions = {}): () => void {
  const { label = 'Repeat' } = options;

  container.innerHTML = `
    <style>
      .cl-rp { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-rp-btn { position:relative; width:58px; height:58px; display:flex; align-items:center; justify-content:center;
        font-size:23px; color:#a1a1aa; background:#16161f; border:1px solid #3f3f46; border-radius:14px;
        cursor:pointer; transition:border-color .25s ease, color .25s ease, transform .15s ease; }
      .cl-rp-btn:hover { border-color:#22d3ee; color:#67e8f9; }
      .cl-rp-btn:focus-visible { outline:2px solid #67e8f9; outline-offset:4px; }
      .cl-rp-btn[data-mode="1"] { color:#22d3ee; border-color:#22d3ee; }
      .cl-rp-btn[data-mode="2"] { color:#f472b6; border-color:#f472b6; transform:rotate(0deg); }
      .cl-rp-badge { position:absolute; top:-7px; right:-7px; width:20px; height:20px; display:none;
        align-items:center; justify-content:center; font-size:11px; font-weight:900; color:#0b0b10;
        background:#22d3ee; border-radius:50%; transition:background .25s ease; }
      .cl-rp-btn[data-mode="2"] .cl-rp-badge { display:flex; background:#f472b6; }
    </style>
    <div class="cl-rp">
      <button type="button" class="cl-rp-btn" data-mode="0" aria-label="${label}: off">🔁<span class="cl-rp-badge">1</span></button>
    </div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-rp-btn')!;
  const modes = ['off', 'all', 'one'];
  let mode = 0;

  function onClick() {
    mode = (mode + 1) % 3;
    btn.dataset.mode = String(mode);
    btn.setAttribute('aria-label', `${label}: ${modes[mode]}`);
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
