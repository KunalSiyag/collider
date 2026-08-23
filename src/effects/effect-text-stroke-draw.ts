export interface EffectOptions {
  text?: string;
}

export function createTextStrokeDraw(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { text = 'DRAWN' } = options;

  container.innerHTML = `
    <style>
      .cl-tsd { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-tsd svg { width:min(86%, 480px); overflow:visible; }
      .cl-tsd text { font-size:72px; font-weight:800; letter-spacing:0.08em;
        fill:none; stroke:#a78bfa; stroke-width:1.5;
        stroke-dasharray: 420; stroke-dashoffset: 420;
        animation: cl-tsd-draw 3.6s ease-in-out infinite alternate; }
      @keyframes cl-tsd-draw {
        0% { stroke-dashoffset: 420; }
        60%, 100% { stroke-dashoffset: 0; fill: rgba(139,92,246,0.12); }
      }
    </style>
    <div class="cl-tsd">
      <svg viewBox="0 0 420 100" role="img" aria-label="${text}">
        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle">${text}</text>
      </svg>
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
