export interface BookmarkSaveOptions {
  label?: string;
}

export function createBookmarkSaveButton(container: HTMLElement, options: BookmarkSaveOptions = {}): () => void {
  const { label = 'Save' } = options;

  container.innerHTML = `
    <style>
      .cl-bm { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-bm-btn { display:flex; align-items:center; gap:9px; padding:12px 26px; font-size:15px; font-weight:700;
        color:#e4e4e7; background:#16161f; border:1px solid #3f3f46; border-radius:10px; cursor:pointer;
        transition:border-color .25s ease, color .25s ease; }
      .cl-bm-btn:hover { border-color:#a78bfa; }
      .cl-bm-btn:focus-visible { outline:2px solid #a78bfa; outline-offset:3px; }
      .cl-bm-icon { font-size:17px; line-height:1; filter:grayscale(1); opacity:.75; transition:filter .2s ease, transform .2s cubic-bezier(.34,1.56,.64,1); }
      .cl-bm-btn[aria-pressed="true"] { border-color:#8b5cf6; color:#c4b5fd; }
      .cl-bm-btn[aria-pressed="true"] .cl-bm-icon { filter:none; opacity:1; transform:translateY(-2px) scale(1.15); }
    </style>
    <div class="cl-bm">
      <button type="button" class="cl-bm-btn" aria-pressed="false"><span class="cl-bm-icon">🔖</span>${label}</button>
    </div>
  `;

  const btn = container.querySelector<HTMLButtonElement>('.cl-bm-btn')!;
  let saved = false;

  function onClick() {
    saved = !saved;
    btn.setAttribute('aria-pressed', String(saved));
    btn.lastChild!.textContent = saved ? 'Saved' : label;
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
