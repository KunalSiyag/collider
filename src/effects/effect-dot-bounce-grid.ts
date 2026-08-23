export interface EffectOptions {
  size?: number;
}

export function createDotBounceGrid(container: HTMLElement, options: EffectOptions = {}): () => void {
  const n = options.size ?? 5;

  const dots = Array.from({ length: n * n }, (_, i) =>
    `<span style="--i:${i % n}; --j:${Math.floor(i / n)}"></span>`).join('');

  container.innerHTML = `
    <style>
      .cl-dbg { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-dbg-grid { display:grid; grid-template-columns:repeat(${n}, 22px); gap:12px; }
      .cl-dbg-grid span { width:12px; height:12px; border-radius:50%; background:#8b5cf6;
        animation:cl-dbg-hop 1.4s ease-in-out infinite; animation-delay:calc((var(--i) + var(--j)) * 0.09s); }
      @keyframes cl-dbg-hop {
        0%, 55%, 100% { transform:translateY(0); background:#3f3f52; }
        25% { transform:translateY(-14px); background:#22d3ee; box-shadow:0 6px 14px rgba(34,211,238,0.45); }
        40% { background:#a78bfa; }
      }
    </style>
    <div class="cl-dbg"><div class="cl-dbg-grid">${dots}</div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
