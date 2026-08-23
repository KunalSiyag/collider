export interface ButtonOptions {
  label?: string;
}

export function createLoadingButton(container: HTMLElement, options: ButtonOptions = {}): () => void {
  const { label = 'Deploy' } = options;

  container.innerHTML = `
    <style>
      .cl-lb { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-lb-btn { min-width:150px; padding:14px 30px; font-size:15px; font-weight:600; color:#fafafa;
        background:#7c3aed; border:none; border-radius:12px; cursor:pointer;
        display:inline-flex; align-items:center; justify-content:center; gap:10px;
        transition:background .25s ease, opacity .2s ease; }
      .cl-lb-btn[data-state="loading"] { background:#3f3f46; cursor:progress; }
      .cl-lb-btn[data-state="done"] { background:#059669; }
      .cl-lb-btn:disabled { pointer-events:none; }
      .cl-lb-spin { width:16px; height:16px; border-radius:50%; border:2.5px solid rgba(255,255,255,.35);
        border-top-color:#fff; animation:cl-lb-rot .7s linear infinite; display:none; }
      [data-state="loading"] .cl-lb-spin { display:inline-block; }
      @keyframes cl-lb-rot { to { transform:rotate(360deg); } }
    </style>
    <div class="cl-lb">
      <button type="button" class="cl-lb-btn" data-state="idle">
        <span class="cl-lb-spin"></span><span class="cl-lb-text">${label}</span>
      </button>
    </div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-lb-btn')!;
  const textEl = btn.querySelector<HTMLElement>('.cl-lb-text')!;

  async function onClick() {
    if (btn.dataset.state !== 'idle') return;
    btn.dataset.state = 'loading';
    textEl.textContent = 'Deploying…';
    await new Promise((r) => setTimeout(r, 1600));
    btn.dataset.state = 'done';
    textEl.textContent = 'Shipped ✓';
    await new Promise((r) => setTimeout(r, 1400));
    btn.dataset.state = 'idle';
    textEl.textContent = label;
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
