export interface EjectDiscOptions {
  label?: string;
}

export function createEjectDiscButton(container: HTMLElement, options: EjectDiscOptions = {}): () => void {
  const { label = 'Eject' } = options;

  container.innerHTML = `
    <style>
      .cl-ej { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; gap:16px; }
      .cl-ej-slot { position:relative; width:120px; height:14px; border-radius:4px; background:#050507;
        border:1px solid #3f3f46; overflow:hidden; }
      .cl-ej-disc { position:absolute; left:50%; top:100%; width:52px; height:52px; border-radius:50%;
        background:linear-gradient(135deg,#a78bfa,#22d3ee);
        transform:translate(-50%,0); transition:top .45s cubic-bezier(.34,1.56,.64,1); }
      .cl-ej-disc::after { content:''; position:absolute; left:50%; top:50%; width:12px; height:12px;
        border-radius:50%; background:#0b0b10; transform:translate(-50%,-50%); }
      .cl-ej-btn { padding:13px 30px; font-size:15px; font-weight:700; color:#e4e4e7;
        background:#16161f; border:1px solid #3f3f46; border-radius:10px; cursor:pointer;
        transition:border-color .25s ease, color .25s ease; }
      .cl-ej-btn:hover { border-color:#a78bfa; color:#c4b5fd; }
      .cl-ej-btn:focus-visible { outline:2px solid #a78bfa; outline-offset:3px; }
      .cl-ej-btn:active { transform:scale(.95); }
    </style>
    <div class="cl-ej">
      <span class="cl-ej-slot"><span class="cl-ej-disc"></span></span>
      <button type="button" class="cl-ej-btn">⏏ ${label}</button>
    </div>
  `;

  const disc = container.querySelector<HTMLElement>('.cl-ej-disc')!;
  const btn = container.querySelector<HTMLButtonElement>('.cl-ej-btn')!;
  let out = false;

  function onClick() {
    out = !out;
    disc.style.top = out ? '-58px' : '100%';
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
