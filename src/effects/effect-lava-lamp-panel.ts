export interface EffectOptions {
  blobs?: number;
}

export function createLavaLampPanel(container: HTMLElement, options: EffectOptions = {}): () => void {
  const n = options.blobs ?? 7;

  const blobs = Array.from({ length: n }, (_, i) => {
    const w = 60 + Math.random() * 90;
    const l = Math.random() * 70 + 5;
    const d = 11 + Math.random() * 9;
    const dl = -Math.random() * d;
    const hue = i % 2 ? '#f472b6' : '#8b5cf6';
    return `<i style="width:${w.toFixed(0)}px; left:${l.toFixed(0)}%; background:${hue};
      --d:${d.toFixed(1)}s; --dl:${dl.toFixed(1)}s"></i>`;
  }).join('');

  container.innerHTML = `
    <style>
      .cl-lvl { position:relative; height:100%; overflow:hidden;
        background:linear-gradient(to bottom, #1a0f2e, #0d0716 80%);
        filter:url(#none); }
      .cl-lvl i { position:absolute; top:110%; aspect-ratio:1; border-radius:50%;
        filter:blur(26px); opacity:0.75;
        animation:cl-lvl-float var(--d) ease-in-out var(--dl) infinite alternate; }
      @keyframes cl-lvl-float {
        from { transform:translateY(0) translateX(0) scale(1); }
        to { transform:translateY(-115%) translateX(40px) scale(0.75); }
      }
      .cl-lvl::after { content:''; position:absolute; inset:0;
        background:radial-gradient(circle at 50% 120%, rgba(255,255,255,0.06), transparent 55%); pointer-events:none; }
    </style>
    <div class="cl-lvl">${blobs}</div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
