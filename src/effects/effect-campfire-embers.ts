export interface EffectOptions {
  emberCount?: number;
}

export function createCampfireEmbers(container: HTMLElement, options: EffectOptions = {}): () => void {
  const n = options.emberCount ?? 22;

  const embers = Array.from({ length: n }, () => {
    const s = 3 + Math.random() * 5;
    const d = 2.5 + Math.random() * 3.5;
    const dl = -Math.random() * d;
    const dx = (Math.random() * 120 - 60).toFixed(0);
    const hue = Math.random() > 0.5 ? '#f97316' : '#f472b6';
    return `<i style="left:${(20 + Math.random() * 60).toFixed(0)}%; width:${s.toFixed(1)}px; height:${s.toFixed(1)}px;
      background:${hue}; --d:${d.toFixed(1)}s; --dl:${dl.toFixed(1)}s; --dx:${dx}px"></i>`;
  }).join('');

  container.innerHTML = `
    <style>
      .cl-cfe { position:relative; height:100%; overflow:hidden; background:#0a0705; }
      .cl-cfe-fire { position:absolute; bottom:0; left:50%; transform:translateX(-50%); width:220px; height:150px;
        background:radial-gradient(ellipse at 50% 100%, #fbbf24 0%, #f97316 30%, rgba(249,115,22,0.25) 60%, transparent 75%);
        filter:blur(10px); animation:cl-cfe-flicker 0.9s ease-in-out infinite alternate; transform-origin:50% 100%; }
      @keyframes cl-cfe-flicker { from { transform:translateX(-50%) scaleY(1); opacity:0.9; } to { transform:translateX(-50%) scaleY(1.15); opacity:1; } }
      .cl-cfe i { position:absolute; bottom:-10px; border-radius:50%; box-shadow:0 0 6px currentColor;
        animation:cl-cfe-rise var(--d) ease-in var(--dl) infinite; }
      @keyframes cl-cfe-rise {
        0% { transform:translateY(0) translateX(0) scale(1); opacity:1; }
        100% { transform:translateY(-78vh) translateX(var(--dx)) scale(0.2); opacity:0; }
      }
    </style>
    <div class="cl-cfe"><div class="cl-cfe-fire"></div>${embers}</div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
