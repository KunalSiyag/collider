export interface EffectOptions {
  flakes?: number;
}

export function createSnowGlobePanel(container: HTMLElement, options: EffectOptions = {}): () => void {
  const n = options.flakes ?? 40;

  const flakes = Array.from({ length: n }, () => {
    const a = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * 42;
    const s = 2 + Math.random() * 3.5;
    const d = 2.4 + Math.random() * 3.6;
    return `<i style="--x:${(50 + r * Math.cos(a)).toFixed(1)}%; --y:${(50 + r * Math.sin(a)).toFixed(1)}%;
      width:${s.toFixed(1)}px; height:${s.toFixed(1)}px; --d:${d.toFixed(1)}s;
      --dl:${(-Math.random() * d).toFixed(1)}s"></i>`;
  }).join('');

  container.innerHTML = `
    <style>
      .cl-sgp { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-sgp-globe { position:relative; width:min(70vmin,300px); aspect-ratio:1; border-radius:50%;
        background:radial-gradient(circle at 32% 26%, #2b3550, #131b30 70%);
        border:3px solid rgba(167,139,250,0.45);
        box-shadow:inset -14px -18px 40px rgba(0,0,0,0.65), inset 10px 12px 30px rgba(103,232,249,0.08),
          0 24px 50px rgba(0,0,0,0.55); overflow:hidden;
        animation:cl-sgp-shake 7s ease-in-out infinite; }
      @keyframes cl-sgp-shake {
        0%, 82%, 100% { transform:rotate(0deg); }
        86% { transform:rotate(-4deg); } 90% { transform:rotate(4deg); }
        94% { transform:rotate(-2deg); }
      }
      .cl-sgp-house { position:absolute; bottom:16%; left:50%; transform:translateX(-50%); font-size:56px;
        filter:drop-shadow(0 6px 8px rgba(0,0,0,0.6)); }
      .cl-sgp i { position:absolute; left:var(--x); top:var(--y); border-radius:50%; background:#fff; opacity:0.9;
        box-shadow:0 0 4px rgba(255,255,255,0.9); pointer-events:none;
        animation:cl-sgp-fall var(--d) linear var(--dl) infinite alternate; }
      @keyframes cl-sgp-fall {
        from { transform:translateY(-46%) translateX(-6px); }
        to { transform:translateY(52%) translateX(8px); }
      }
    </style>
    <div class="cl-sgp"><div class="cl-sgp-globe">${flakes}<div class="cl-sgp-house">🏠</div></div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
