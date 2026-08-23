export interface EffectOptions {
  rungs?: number;
}

export function createDnaHelix(container: HTMLElement, options: EffectOptions = {}): () => void {
  const n = options.rungs ?? 16;

  container.innerHTML = `
    <style>
      .cl-dna { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-dna-track { position:relative; width:150px; height:min(80%,340px); }
      .cl-dna-rung { position:absolute; left:0; right:0; height:2px; top:calc(var(--p) * 100%);
        animation:cl-dna-twist 3.4s linear infinite; animation-delay:var(--d); }
      .cl-dna-rung::before, .cl-dna-rung::after { content:''; position:absolute; top:50%; width:13px; height:13px;
        border-radius:50%; margin-top:-6.5px; }
      .cl-dna-rung::before { left:-4px; background:#8b5cf6; box-shadow:0 0 9px rgba(139,92,246,0.8); }
      .cl-dna-rung::after { right:-4px; background:#22d3ee; box-shadow:0 0 9px rgba(34,211,238,0.8); }
      .cl-dna-line { position:absolute; inset:0;
        background:linear-gradient(rgba(167,139,250,0), rgba(167,139,250,0.35), rgba(167,139,250,0)) no-repeat 50% / 2px 100%;
        opacity:0.5; }
      @keyframes cl-dna-twist {
        from { transform:scaleX(1); }
        to { transform:scaleX(-1); }
      }
    </style>
    <div class="cl-dna"><div class="cl-dna-track">
      <div class="cl-dna-line"></div>
      ${Array.from({ length: n }, (_, i) => `<i class="cl-dna-rung" style="--p:${(i / (n - 1)).toFixed(3)};
        --d:${(-(i / n) * 3.4).toFixed(2)}s"></i>`).join('')}
    </div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
