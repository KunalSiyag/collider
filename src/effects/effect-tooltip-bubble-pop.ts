export interface EffectOptions {
  tip?: string;
  label?: string;
}

export function createTooltipBubblePop(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { tip = 'Copy-paste ready!', label = 'Hover me' } = options;

  container.innerHTML = `
    <style>
      .cl-tbp { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-tbp-wrap { position:relative; display:inline-block; }
      .cl-tbp-btn { padding:12px 26px; border-radius:999px; border:1px solid rgba(167,139,250,0.5); cursor:pointer;
        background:#18181b; color:#fafafa; font-size:14px; font-weight:600; transition:border-color .25s, box-shadow .25s; }
      .cl-tbp-wrap:hover .cl-tbp-btn { border-color:#8b5cf6; box-shadow:0 0 16px rgba(139,92,246,0.35); }
      .cl-tbp-tip { position:absolute; bottom:calc(100% + 12px); left:50%; transform:translateX(-50%) translateY(6px) scale(0.85);
        transform-origin:bottom center; padding:9px 15px; border-radius:11px; background:#f5f3ff; color:#4c1d95;
        font-size:13px; font-weight:600; white-space:nowrap; opacity:0; pointer-events:none;
        transition:opacity .22s, transform .28s cubic-bezier(.34,1.56,.64,1);
        box-shadow:0 10px 24px rgba(0,0,0,0.45); }
      .cl-tbp-tip::after { content:''; position:absolute; top:100%; left:50%; margin-left:-7px;
        border:7px solid transparent; border-top-color:#f5f3ff; }
      .cl-tbp-wrap:hover .cl-tbp-tip, .cl-tbp-wrap:focus-within .cl-tbp-tip {
        opacity:1; transform:translateX(-50%) translateY(0) scale(1); }
    </style>
    <div class="cl-tbp"><div class="cl-tbp-wrap">
      <button class="cl-tbp-btn" type="button">${label}</button>
      <span class="cl-tbp-tip" role="tooltip">${tip}</span>
    </div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
