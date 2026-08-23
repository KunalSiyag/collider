export interface EffectOptions {
  segments?: number;
}

export function createKaleidoscopePanel(container: HTMLElement, options: EffectOptions = {}): () => void {
  const n = options.segments ?? 8;

  container.innerHTML = `
    <style>
      .cl-kld { height:100%; display:flex; align-items:center; justify-content:center;
        background:#050508; overflow:hidden; }
      .cl-kld-stage { position:relative; width:min(72vmin,320px); aspect-ratio:1; }
      .cl-kld-seg { position:absolute; inset:0;
        clip-path:polygon(50% 0, 100% ${100 / n}%, 50% 12%, ${50 - 100 / n}% ${100 / n}%,
          50% 24%, 100% calc(36% + 0%), 50% 36%, ${50 - 100 / n}% calc(48%));
        opacity:0.85;
        background:
          radial-gradient(circle at 60% 30%, rgba(244,114,182,0.7), transparent 34%),
          conic-gradient(from var(--rot), #8b5cf6, #22d3ee, #67e8f9, #f472b6, #8b5cf6);
        animation:cl-kld-spin var(--d) ease-in-out infinite alternate; }
      @keyframes cl-kld-spin {
        from { transform:rotate(var(--base)) scale(1); }
        to { transform:rotate(calc(var(--base) + 180deg)) scale(1.06); }
      }
    </style>
    <div class="cl-kld"><div class="cl-kld-stage">
      ${Array.from({ length: n }, (_, i) => `<i class="cl-kld-seg" style="--base:${i * (360 / n)}deg;
        --rot:${i * 40}deg; --d:${(4 + (i % 3) * 2).toFixed(1)}s"></i>`).join('')}
    </div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
