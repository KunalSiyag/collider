export interface FoldUnfoldOptions {
  label?: string;
}

export function createFoldUnfoldButton(container: HTMLElement, options: FoldUnfoldOptions = {}): () => void {
  const { label = 'Unfold' } = options;

  container.innerHTML = `
    <style>
      .cl-fu { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; perspective:600px; }
      .cl-fu-btn { position:relative; padding:15px 40px; font-size:15.5px; font-weight:800; color:#fff;
        border:none; cursor:pointer; transform-style:preserve-3d; transition:transform .45s cubic-bezier(.65,0,.35,1); }
      .cl-fu-top, .cl-fu-bot { display:flex; align-items:center; justify-content:center; height:26px; }
      .cl-fu-top { background:linear-gradient(180deg,#a78bfa,#8b5cf6); border-radius:12px 12px 0 0; transform-origin:bottom; }
      .cl-fu-bot { background:#6d28d9; border-radius:0 0 12px 12px; transform-origin:top; }
      .cl-fu-btn:hover .cl-fu-top { transform:rotateX(38deg); }
      .cl-fu-btn:focus-visible { outline:2px solid #c4b5fd; outline-offset:4px; }
      .cl-fu-btn:active { transform:scale(.96); }
    </style>
    <div class="cl-fu">
      <button type="button" class="cl-fu-btn">
        <span class="cl-fu-top">${label}</span>
        <span class="cl-fu-bot" aria-hidden="true">&nbsp;</span>
      </button>
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
