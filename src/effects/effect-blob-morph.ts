export interface EffectOptions {
  color?: string;
}

export function createBlobMorph(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { color = '#8b5cf6' } = options;

  container.innerHTML = `
    <style>
      .cl-bm { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-bm-blob { width:min(52%, 220px); aspect-ratio:1; background:${color};
        animation: cl-bm-morph 7s ease-in-out infinite, cl-bm-hue 14s linear infinite; }
      @keyframes cl-bm-morph {
        0%, 100% { border-radius: 58% 42% 55% 45% / 48% 60% 40% 52%; transform: rotate(0deg) scale(1); }
        33% { border-radius: 45% 55% 40% 60% / 60% 42% 58% 40%; transform: rotate(8deg) scale(1.04); }
        66% { border-radius: 62% 38% 60% 40% / 42% 55% 45% 58%; transform: rotate(-6deg) scale(0.97); }
      }
      @keyframes cl-bm-hue { to { filter: hue-rotate(360deg); } }
    </style>
    <div class="cl-bm"><div class="cl-bm-blob"></div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
