export interface EffectOptions {
  progress?: number;
}

export function createLoadingBarStriped(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { progress = 72 } = options;

  container.innerHTML = `
    <style>
      .cl-lbs { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px;
        background:#0b0b10; padding:24px; }
      .cl-lbs-track { width:min(100%,380px); height:26px; border-radius:999px; background:#18181b;
        border:1px solid rgba(139,92,246,0.35); overflow:hidden; padding:3px; }
      .cl-lbs-fill { height:100%; border-radius:999px; position:relative; overflow:hidden;
        background:#8b5cf6;
        background-image:repeating-linear-gradient(-45deg, rgba(255,255,255,0.28) 0 12px, transparent 12px 24px);
        background-size:34px 100%;
        animation:cl-lbs-stripes 0.7s linear infinite;
        transition:width 1s cubic-bezier(.65,0,.35,1);
        box-shadow:0 0 16px rgba(139,92,246,0.5); }
      @keyframes cl-lbs-stripes { to { background-position-x:34px; } }
      .cl-lbs-label { color:rgba(255,255,255,0.65); font-size:13px; letter-spacing:0.14em; }
      .cl-lbs-num { color:#a78bfa; font-variant-numeric:tabular-nums; font-weight:700; }
    </style>
    <div class="cl-lbs">
      <div class="cl-lbs-track"><div class="cl-lbs-fill" style="width:${progress}%"></div></div>
      <div class="cl-lbs-label">Uploading… <span class="cl-lbs-num">${progress}%</span></div>
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
