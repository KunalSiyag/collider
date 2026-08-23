export interface EffectOptions {
  text?: string;
}

export function createTypographicWave(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { text = 'WAVEFORM' } = options;

  container.innerHTML = `
    <style>
      .cl-tyw { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-tyw-word { display:flex; }
      .cl-tyw-c { font-size:clamp(38px,7vw,68px); font-weight:800; color:#a78bfa; display:inline-block;
        animation:cl-tyw-wave 2.2s ease-in-out infinite; animation-delay:calc(var(--i) * 0.09s); }
      @keyframes cl-tyw-wave {
        0%, 100% { transform:translateY(0) scale(1); color:#a78bfa; }
        30% { transform:translateY(-18px) scale(1.08); color:#67e8f9; }
        60% { transform:translateY(6px) scale(0.96); color:#8b5cf6; }
      }
    </style>
    <div class="cl-tyw"><div class="cl-tyw-word">
      ${text.split('').map((c, i) => `<span class="cl-tyw-c" style="--i:${i}">${c === ' ' ? '&nbsp;' : c}</span>`).join('')}
    </div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
