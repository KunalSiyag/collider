export interface EffectOptions {
  emoji?: string;
}

export function createZoomBlurEnter(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { emoji = '🚀' } = options;

  container.innerHTML = `
    <style>
      .cl-zbe { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; overflow:hidden; }
      .cl-zbe-stage { font-size:76px; line-height:1;
        animation:cl-zbe-zoom 2.8s cubic-bezier(.16,.8,.3,1) infinite; will-change:transform,filter,opacity; }
      @keyframes cl-zbe-zoom {
        0% { transform:scale(2.6); filter:blur(18px); opacity:0; }
        18% { opacity:1; }
        45% { transform:scale(1); filter:blur(0); }
        72% { transform:scale(1); filter:blur(0); opacity:1; }
        88% { transform:scale(0.4); filter:blur(10px); opacity:0; }
        100% { transform:scale(2.6); filter:blur(18px); opacity:0; }
      }
      .cl-zbe-streaks { position:absolute; inset:0; pointer-events:none;
        background:
          repeating-conic-gradient(from 0deg at 50% 50%,
            rgba(139,92,246,0.14) 0deg 1.2deg, transparent 1.2deg 9deg);
        mask:radial-gradient(circle at 50% 50%, transparent 26%, black 60%);
        -webkit-mask:radial-gradient(circle at 50% 50%, transparent 26%, black 60%);
        animation:cl-zbe-rays 2.8s cubic-bezier(.16,.8,.3,1) infinite; }
      @keyframes cl-zbe-rays {
        0% { transform:scale(2.2); opacity:0; } 20% { opacity:1; }
        45% { transform:scale(1); opacity:0.5; } 100% { transform:scale(0.7); opacity:0; }
      }
    </style>
    <div class="cl-zbe">
      <div class="cl-zbe-streaks"></div>
      <div class="cl-zbe-stage">${emoji}</div>
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
