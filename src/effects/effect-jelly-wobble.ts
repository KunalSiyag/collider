export interface EffectOptions {
  emoji?: string;
}

export function createJellyWobble(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { emoji = '🟣' } = options;

  container.innerHTML = `
    <style>
      .cl-jly { height:100%; display:flex; flex-wrap:wrap; gap:22px; align-items:center; justify-content:center; background:#0b0b10; padding:20px; }
      .cl-jly-b { width:76px; height:76px; border-radius:26%; font-size:34px;
        display:flex; align-items:center; justify-content:center; cursor:pointer;
        background:linear-gradient(150deg,#8b5cf6,#6d28d9); box-shadow:0 10px 24px rgba(139,92,246,0.4);
        transition:transform 0.9s cubic-bezier(.2,1.8,.35,1), border-radius 0.9s ease; }
      .cl-jly-b:hover { animation:cl-jly-squish 0.85s cubic-bezier(.3,1.6,.4,1); }
      @keyframes cl-jly-squish {
        0% { transform:scale(1,1) translateY(0); }
        25% { transform:scale(1.28,0.72) translateY(14px); }
        45% { transform:scale(0.78,1.26) translateY(-18px); border-radius:50%; }
        65% { transform:scale(1.12,0.9) translateY(5px); }
        82% { transform:scale(0.95,1.05) translateY(-2px); }
        100% { transform:scale(1,1) translateY(0); }
      }
    </style>
    <div class="cl-jly">
      ${['🟣','💜','🔮','🫧'].map(e => `<div class="cl-jly-b">${e}</div>`).join('')}
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
