export interface EffectOptions {
  text?: string;
}

export function createOutlinePulse(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { text = 'PULSE' } = options;

  container.innerHTML = `
    <style>
      .cl-op { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-op span { font-size: clamp(48px, 9vw, 96px); font-weight:900; letter-spacing:0.1em;
        color:transparent; -webkit-text-stroke: 2px #8b5cf6;
        animation: cl-op-beat 2.4s ease-in-out infinite; }
      @keyframes cl-op-beat {
        0%, 100% { -webkit-text-stroke-width: 2px; -webkit-text-stroke-color:#8b5cf6; text-shadow:none; }
        50% { -webkit-text-stroke-width: 4px; -webkit-text-stroke-color:#f472b6; text-shadow:0 0 26px rgba(244,114,182,0.55); }
      }
    </style>
    <div class="cl-op"><span>${text}</span></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
