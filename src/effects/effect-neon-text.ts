export interface EffectOptions {
  text?: string;
}

export function createNeonText(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { text = 'NEON' } = options;

  container.innerHTML = `
    <style>
      .cl-nt { height:100%; display:flex; align-items:center; justify-content:center; background:#050508; }
      .cl-nt span { font-size: clamp(48px, 9vw, 96px); font-weight:800; letter-spacing:0.12em; color:#f0abfc;
        text-shadow: 0 0 6px #f0abfc, 0 0 18px #e879f9, 0 0 42px #c026d3, 0 0 80px #a21caf;
        animation: cl-nt-flicker 3.2s infinite; }
      @keyframes cl-nt-flicker {
        0%, 18%, 22%, 25%, 53%, 57%, 100% { opacity:1; }
        20%, 24%, 55% { opacity:0.45; }
      }
    </style>
    <div class="cl-nt"><span>${text}</span></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
