export interface EffectOptions {
  size?: number;
}

export function createGradientRingLoader(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { size = 110 } = options;

  container.innerHTML = `
    <style>
      .cl-grl { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-grl-wrap { position:relative; width:${size}px; height:${size}px; }
      .cl-grl-ring { position:absolute; inset:0; border-radius:50%;
        background:conic-gradient(from 0deg, #8b5cf6, #22d3ee, #f472b6, #8b5cf6);
        mask:radial-gradient(farthest-side, transparent calc(100% - 9px), black calc(100% - 8px));
        -webkit-mask:radial-gradient(farthest-side, transparent calc(100% - 9px), black calc(100% - 8px));
        animation:cl-grl-spin 1.4s linear infinite; }
      .cl-grl-ring2 { position:absolute; inset:16px; border-radius:50%;
        background:conic-gradient(from 180deg, transparent, rgba(103,232,249,0.9), transparent 55%);
        mask:radial-gradient(farthest-side, transparent calc(100% - 5px), black calc(100% - 4px));
        -webkit-mask:radial-gradient(farthest-side, transparent calc(100% - 5px), black calc(100% - 4px));
        animation:cl-grl-spin 0.9s linear infinite reverse; }
      @keyframes cl-grl-spin { to { transform:rotate(360deg); } }
      .cl-grl-dot { position:absolute; top:-3px; left:calc(50% - 3.5px); width:7px; height:7px; border-radius:50%;
        background:#67e8f9; box-shadow:0 0 8px #22d3ee; }
    </style>
    <div class="cl-grl"><div class="cl-grl-wrap">
      <div class="cl-grl-ring"></div>
      <div class="cl-grl-ring2"></div>
      <div style="position:relative; animation:cl-grl-spin 1.4s linear infinite;"><span class="cl-grl-dot"></span></div>
    </div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
