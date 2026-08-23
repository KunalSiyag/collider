export interface EffectOptions {
  text?: string;
}

export function createFireText(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { text = 'FIRE' } = options;

  container.innerHTML = `
    <style>
      .cl-frt { height:100%; display:flex; align-items:center; justify-content:center; background:#0a0603; }
      .cl-frt span { font-size:clamp(56px,10vw,110px); font-weight:900; letter-spacing:0.06em;
        background:linear-gradient(to top, #fbbf24 15%, #f97316 40%, #ef4444 65%, #7c2d12 90%);
        -webkit-background-clip:text; background-clip:text; color:transparent;
        filter:brightness(1.1);
        animation:cl-frt-flicker 1.6s ease-in-out infinite alternate;
        position:relative; }
      .cl-frt span::after { content:'${text}'; position:absolute; inset:0;
        background:linear-gradient(to bottom, rgba(255,255,255,0.85), transparent 55%);
        -webkit-background-clip:text; background-clip:text; color:transparent;
        filter:blur(6px); opacity:0.8; animation:cl-frt-glow 0.9s ease-in-out infinite alternate; }
      @keyframes cl-frt-flicker { from { filter:brightness(1) saturate(1); } to { filter:brightness(1.25) saturate(1.3); } }
      @keyframes cl-frt-glow { from { transform:translateY(0) scaleY(1); opacity:0.5; } to { transform:translateY(-6px) scaleY(1.08); opacity:0.9; } }
    </style>
    <div class="cl-frt"><span>${text}</span></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
