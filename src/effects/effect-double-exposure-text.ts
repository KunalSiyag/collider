export interface EffectOptions {
  text?: string;
}

export function createDoubleExposureText(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { text = 'EXPOSE' } = options;

  container.innerHTML = `
    <style>
      .cl-det { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-det-wrap { position:relative; font-size: clamp(44px, 8vw, 84px); font-weight:900; letter-spacing:0.06em; }
      .cl-det-a { color:#fafafa; animation: cl-det-drift-a 5s ease-in-out infinite alternate; }
      .cl-det-b { position:absolute; inset:0; color:transparent;
        -webkit-text-stroke:1.5px #22d3ee;
        background: linear-gradient(120deg, #8b5cf6, #22d3ee, #f472b6);
        -webkit-background-clip:text; background-clip:text;
        clip-path: polygon(0 0, 100% 0, 100% 42%, 0 58%);
        animation: cl-det-drift-b 5s ease-in-out infinite alternate; }
      @keyframes cl-det-drift-a { to { transform: translate(6px, -4px); } }
      @keyframes cl-det-drift-b { to { transform: translate(-8px, 6px); } }
    </style>
    <div class="cl-det"><div class="cl-det-wrap"><span class="cl-det-a">${text}</span><span class="cl-det-b" aria-hidden="true">${text}</span></div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
