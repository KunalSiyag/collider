export interface CameraFlashOptions {
  label?: string;
}

export function createCameraFlashButton(container: HTMLElement, options: CameraFlashOptions = {}): () => void {
  const { label = 'Snap photo' } = options;

  container.innerHTML = `
    <style>
      .cl-cf2 { position:relative; height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-cf2-flash { position:absolute; inset:0; background:#fff; opacity:0; pointer-events:none; }
      .cl-cf2-btn { padding:14px 34px; font-size:15.5px; font-weight:700; color:#fff;
        background:#1c1c28; border:1px solid #8b5cf6; border-radius:12px; cursor:pointer;
        transition:background .25s ease, transform .12s ease; }
      .cl-cf2-btn:hover { background:#28203f; }
      .cl-cf2-btn:focus-visible { outline:2px solid #a78bfa; outline-offset:3px; }
      .cl-cf2-btn:active { transform:scale(.95); }
    </style>
    <div class="cl-cf2">
      <span class="cl-cf2-flash" aria-hidden="true"></span>
      <button type="button" class="cl-cf2-btn">📷 ${label}</button>
    </div>
  `;

  const wrap = container.querySelector<HTMLElement>('.cl-cf2')!;
  const flash = container.querySelector<HTMLElement>('.cl-cf2-flash')!;
  const btn = container.querySelector<HTMLButtonElement>('.cl-cf2-btn')!;

  function onClick() {
    flash.animate(
      [{ opacity: 0 }, { opacity: .9, offset: .12 }, { opacity: 0 }],
      { duration: 380, easing: 'ease-out' },
    );
    btn.animate(
      [{ transform: 'translateY(0)' }, { transform: 'translateY(-4px)' }, { transform: 'translateY(0)' }],
      { duration: 300, easing: 'ease-out' },
    );
    void wrap;
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
