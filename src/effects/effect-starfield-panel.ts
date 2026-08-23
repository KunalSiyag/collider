export interface EffectOptions {
  stars?: number;
  shooting?: boolean;
}

export function createStarfieldPanel(container: HTMLElement, options: EffectOptions = {}): () => void {
  const n = options.stars ?? 120;

  const stars = Array.from({ length: n }, () => {
    const s = Math.random() * 2 + 0.6;
    const d = (1.5 + Math.random() * 4).toFixed(2);
    const dl = (-Math.random() * 5).toFixed(2);
    return `<i style="left:${(Math.random() * 100).toFixed(2)}%; top:${(Math.random() * 100).toFixed(2)}%;
      width:${s.toFixed(1)}px; height:${s.toFixed(1)}px; --d:${d}s; --dl:${dl}s"></i>`;
  }).join('');

  container.innerHTML = `
    <style>
      .cl-sfp { position:relative; height:100%; overflow:hidden; background:#040409; }
      .cl-sfp i { position:absolute; border-radius:50%; background:#fff;
        animation:cl-sfp-tw var(--d) ease-in-out var(--dl) infinite alternate; }
      @keyframes cl-sfp-tw { from { opacity:0.15; } to { opacity:1; box-shadow:0 0 6px rgba(255,255,255,0.8); } }
      .cl-sfp-shoot { position:absolute; top:14%; left:-12%; width:130px; height:2px; border-radius:999px;
        background:linear-gradient(90deg, transparent, #fff); transform:rotate(-18deg); opacity:0;
        animation:cl-sfp-streak 9s linear infinite 2s; }
      @keyframes cl-sfp-streak {
        0%, 88% { transform:translateX(-160px) rotate(-18deg); opacity:0; }
        90% { opacity:1; } 97% { transform:translateX(calc(100vw + 200px)) rotate(-18deg); opacity:0.6; }
        98%, 100% { opacity:0; }
      }
    </style>
    <div class="cl-sfp">${stars}<div class="cl-sfp-shoot"></div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
