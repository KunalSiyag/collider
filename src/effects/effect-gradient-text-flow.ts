export interface EffectOptions {
  text?: string;
}

export function createGradientTextFlow(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { text = 'Flowing gradient headline' } = options;

  container.innerHTML = `
    <style>
      .cl-gt2 { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-gt2 span { font-size: clamp(28px, 5vw, 54px); font-weight:800; letter-spacing:-0.02em;
        background: linear-gradient(100deg, #8b5cf6 10%, #22d3ee 35%, #f472b6 60%, #8b5cf6 90%);
        background-size: 220% auto;
        -webkit-background-clip:text; background-clip:text; color:transparent;
        animation: cl-gt2-flow 4.5s linear infinite; }
      @keyframes cl-gt2-flow { to { background-position: 220% center; } }
    </style>
    <div class="cl-gt2"><span>${text}</span></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
