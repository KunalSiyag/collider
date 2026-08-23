export interface IconMorphOptions {
  label?: string;
}

export function createIconMorphButton(container: HTMLElement, options: IconMorphOptions = {}): () => void {
  const { label = 'Morph icon' } = options;

  container.innerHTML = `
    <style>
      .cl-im { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; gap:12px;
        font-size:15px; font-weight:600; color:#e4e4e7; }
      .cl-im-btn { display:flex; align-items:center; gap:10px; padding:13px 26px; font-size:15px; font-weight:700;
        color:#fff; background:#1c1c28; border:1px solid #3f3f46; border-radius:999px; cursor:pointer;
        transition:background .25s ease, border-color .25s ease; }
      .cl-im-btn:hover { background:#26263a; border-color:#8b5cf6; }
      .cl-im-btn:focus-visible { outline:2px solid #a78bfa; outline-offset:3px; }
      .cl-im-btn:active { transform:scale(.97); }
      .cl-im-box { position:relative; width:18px; height:18px; }
      .cl-im-box span { position:absolute; inset:0; border-radius:4px; background:#22d3ee;
        transition:transform .45s cubic-bezier(.34,1.56,.64,1), border-radius .45s ease, opacity .3s ease; }
      .cl-im-a { transform:rotate(0deg) scale(1); }
      .cl-im-b { opacity:0; transform:rotate(180deg) scale(.2); border-radius:50%; background:#f472b6 !important; }
      .cl-im-btn[data-alt="true"] .cl-im-a { opacity:0; transform:rotate(-180deg) scale(.2); }
      .cl-im-btn[data-alt="true"] .cl-im-b { opacity:1; transform:rotate(360deg) scale(1); }
    </style>
    <div class="cl-im">
      <button type="button" class="cl-im-btn" data-alt="false">
        <span class="cl-im-box"><span class="cl-im-a"></span><span class="cl-im-b"></span></span>
        ${label}
      </button>
    </div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-im-btn')!;
  let alt = false;

  function onClick() {
    alt = !alt;
    btn.dataset.alt = String(alt);
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
