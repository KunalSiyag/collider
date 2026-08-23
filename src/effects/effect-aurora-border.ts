export interface EffectOptions {
  label?: string;
}

export function createAuroraBorder(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { label = 'Aurora frame' } = options;

  container.innerHTML = `
    <style>
      .cl-ab { height:100%; display:flex; align-items:center; justify-content:center; background:#050508; }
      .cl-ab-box { position:relative; width:min(70%,300px); padding:2px; border-radius:20px; overflow:hidden;
        background:#0b0b10; }
      .cl-ab-box::before { content:''; position:absolute; inset:-150%;
        background: conic-gradient(#22d3ee, #8b5cf6, #f472b6, #22d3ee);
        animation: cl-ab-spin 4.5s linear infinite; }
      @keyframes cl-ab-spin { to { transform: rotate(1turn); } }
      .cl-ab-inner { position:relative; margin:3px; padding:34px 22px; border-radius:17px;
        background:#0b0b10; text-align:center; color:#e4e4e7; font-weight:600; z-index:1; }
    </style>
    <div class="cl-ab"><div class="cl-ab-box"><div class="cl-ab-inner">${label}</div></div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
