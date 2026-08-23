export interface EffectOptions {
  text?: string;
}

export function createMirrorText(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { text = 'MIRROR' } = options;

  container.innerHTML = `
    <style>
      .cl-mt { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px;
        background: linear-gradient(#0b0b10 55%, #13131a 55%, #1c1c22); }
      .cl-mt-main { font-size: clamp(44px, 8vw, 80px); font-weight:800; letter-spacing:0.08em; color:#fafafa; }
      .cl-mt-flip { font-size: clamp(44px, 8vw, 80px); font-weight:800; letter-spacing:0.08em; color:#8b5cf6;
        transform: scaleY(-1); opacity:0.35;
        -webkit-mask-image: linear-gradient(to bottom, transparent 30%, black 100%);
        mask-image: linear-gradient(to bottom, transparent 30%, black 100%); }
    </style>
    <div class="cl-mt"><span class="cl-mt-main">${text}</span><span class="cl-mt-flip" aria-hidden="true">${text}</span></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
