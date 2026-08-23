export interface EffectOptions {
  items?: string[];
}

export function createGravityDropIn(container: HTMLElement, options: EffectOptions = {}): () => void {
  const items = options.items ?? ['DROP', 'IT', 'LIKE', 'ITS HOT'];

  container.innerHTML = `
    <style>
      .cl-gdi { height:100%; display:flex; align-items:center; justify-content:center; gap:16px; flex-wrap:wrap;
        padding:20px; background:#0b0b10; }
      .cl-gdi-chip { padding:14px 26px; border-radius:14px; font-weight:800; font-size:clamp(15px,2.4vw,22px);
        color:#fff; background:#18181b; border:1px solid rgba(139,92,246,0.4);
        animation:cl-gdi-fall 0.85s cubic-bezier(.25,.9,.3,1.3) both; animation-delay:var(--i); }
      @keyframes cl-gdi-fall {
        0% { transform:translateY(-320px) rotate(-6deg); opacity:0; }
        60% { opacity:1; }
        80% { transform:translateY(12px) rotate(2deg); }
        100% { transform:translateY(0) rotate(0); opacity:1; }
      }
    </style>
    <div class="cl-gdi">
      ${items.map((t, i) => `<span class="cl-gdi-chip" style="--i:${(i * 0.12).toFixed(2)}s">${t}</span>`).join('')}
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
