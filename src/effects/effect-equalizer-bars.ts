export interface EffectOptions {
  bars?: number;
}

export function createEqualizerBars(container: HTMLElement, options: EffectOptions = {}): () => void {
  const n = options.bars ?? 24;

  const bars = Array.from({ length: n }, (_, i) => {
    const d = (0.6 + Math.random() * 0.9).toFixed(2);
    const dl = (-Math.random()).toFixed(2);
    return `<span style="--d:${d}s; --dl:${dl}s"></span>`;
  }).join('');

  container.innerHTML = `
    <style>
      .cl-eqb { height:100%; display:flex; align-items:flex-end; justify-content:center; gap:6px;
        padding-bottom:36px; background:#08080c; }
      .cl-eqb span { width:12px; height:20%; border-radius:5px 5px 0 0;
        background:linear-gradient(to top, #8b5cf6, #22d3ee 70%, #67e8f9);
        transform-origin:bottom; animation:cl-eqb-jump var(--d) ease-in-out var(--dl) infinite alternate; }
      @keyframes cl-eqb-jump { from { height:14%; } to { height:92%; } }
    </style>
    <div class="cl-eqb">${bars}</div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
