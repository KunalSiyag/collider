export interface GradientBorderRotateOptions {
  label?: string;
}

export function createGradientBorderRotateButton(container: HTMLElement, options: GradientBorderRotateOptions = {}): () => void {
  const { label = 'Orbit border' } = options;

  container.innerHTML = `
    <style>
      .cl-gbr { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-gbr-wrap { position:relative; padding:2px; border-radius:16px; overflow:hidden; }
      .cl-gbr-spin { position:absolute; inset:-120%;
        background:conic-gradient(#8b5cf6, #22d3ee, #f472b6, #a78bfa, #8b5cf6);
        animation:cl-gbr-turn 3.2s linear infinite; }
      @keyframes cl-gbr-turn { to { transform:rotate(360deg); } }
      .cl-gbr-btn { position:relative; display:block; padding:14px 40px; font-size:15.5px; font-weight:700;
        color:#fff; background:#12121c; border:none; border-radius:14px; cursor:pointer;
        transition:background .3s ease; z-index:1; }
      .cl-gbr-btn:hover { background:#1d1d30; }
      .cl-gbr-btn:focus-visible { outline:2px solid #a78bfa; outline-offset:3px; }
      .cl-gbr-btn:active { transform:scale(.97); }
    </style>
    <div class="cl-gbr">
      <span class="cl-gbr-wrap"><span class="cl-gbr-spin" aria-hidden="true"></span>
        <button type="button" class="cl-gbr-btn">${label}</button>
      </span>
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
