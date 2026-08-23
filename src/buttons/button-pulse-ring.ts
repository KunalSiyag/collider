export interface PulseRingOptions {
  label?: string;
}

export function createPulseRingButton(container: HTMLElement, options: PulseRingOptions = {}): () => void {
  const { label = 'Live now' } = options;

  container.innerHTML = `
    <style>
      .cl-pr { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-pr-btn { position:relative; padding:14px 34px; font-size:15.5px; font-weight:700; color:#fff;
        background:#18181f; border:none; border-radius:999px; cursor:pointer; }
      .cl-pr-btn:hover { background:#221d33; }
      .cl-pr-btn:focus-visible { outline:2px solid #f472b6; outline-offset:4px; }
      .cl-pr-btn:active { transform:scale(.96); }
      .cl-pr-ring { position:absolute; inset:0; border-radius:inherit; border:2px solid #f472b6;
        opacity:0; pointer-events:none; animation:cl-pr-emit 1.8s ease-out infinite; }
      .cl-pr-ring:nth-of-type(2) { animation-delay:.6s; }
      .cl-pr-ring:nth-of-type(3) { animation-delay:1.2s; }
      @keyframes cl-pr-emit {
        from { transform:scale(1); opacity:.7; }
        to { transform:scale(1.45); opacity:0; }
      }
      .cl-pr-dot { position:absolute; top:-4px; right:-4px; width:11px; height:11px; border-radius:50%;
        background:#22d3ee; box-shadow:0 0 10px rgba(34,211,238,.9); }
    </style>
    <div class="cl-pr">
      <button type="button" class="cl-pr-btn">
        ${label}
        <span class="cl-pr-dot" aria-hidden="true"></span>
        <span class="cl-pr-ring" aria-hidden="true"></span><span class="cl-pr-ring" aria-hidden="true"></span><span class="cl-pr-ring" aria-hidden="true"></span>
      </button>
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
