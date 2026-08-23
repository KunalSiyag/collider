export interface UploadPulseOptions {
  label?: string;
}

export function createUploadPulseButton(container: HTMLElement, options: UploadPulseOptions = {}): () => void {
  const { label = 'Upload file' } = options;

  container.innerHTML = `
    <style>
      .cl-up { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-up-btn { position:relative; padding:14px 34px; font-size:15px; font-weight:700; color:#0b0b10;
        background:linear-gradient(120deg,#67e8f9,#a78bfa); border:none; border-radius:12px; cursor:pointer;
        transition:transform .2s ease, filter .2s ease; }
      .cl-up-btn:hover { transform:translateY(-2px); filter:brightness(1.08); }
      .cl-up-btn:focus-visible { outline:2px solid #22d3ee; outline-offset:3px; }
      .cl-up-btn:active { transform:translateY(0) scale(.97); }
      .cl-up-btn[data-busy="true"] { animation:cl-up-pulse 1s ease-in-out infinite; }
      @keyframes cl-up-pulse {
        0%,100% { box-shadow:0 0 0 0 rgba(103,232,249,.55); }
        50% { box-shadow:0 0 0 12px rgba(103,232,249,0); }
      }
    </style>
    <div class="cl-up">
      <button type="button" class="cl-up-btn" data-busy="false">${label}</button>
    </div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-up-btn')!;
  let busy = false;

  function onClick() {
    busy = !busy;
    btn.dataset.busy = String(busy);
    btn.textContent = busy ? '⬆ Uploading…' : label;
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
