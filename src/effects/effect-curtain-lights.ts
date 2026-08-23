export interface EffectOptions {
  strands?: number;
  bulbsPerStrand?: number;
}

export function createCurtainLights(container: HTMLElement, options: EffectOptions = {}): () => void {
  const strands = options.strands ?? 14;
  const per = options.bulbsPerStrand ?? 7;
  const colors = ['#f472b6', '#a78bfa', '#22d3ee', '#67e8f9', '#fbbf24'];

  container.innerHTML = `
    <style>
      .cl-clt { position:relative; height:100%; background:#07070e; overflow:hidden; display:flex; gap:0; }
      .cl-clt-strand { flex:1; position:relative; border-left:1px solid rgba(255,255,255,0.05); }
      .cl-clt-strand::before { content:''; position:absolute; top:-6px; left:50%; width:2px; height:14px;
        background:#3f3f52; transform:translateX(-50%); }
      .cl-clt-bulb { position:absolute; left:50%; transform:translateX(-50%); width:10px; height:13px;
        border-radius:4px 4px 6px 6px; animation:cl-clt-glow var(--d) ease-in-out var(--dl) infinite alternate; }
      @keyframes cl-clt-glow {
        from { filter:brightness(0.3) saturate(0.5); box-shadow:none; }
        to { filter:brightness(1.35); box-shadow:0 0 12px 3px currentColor, 0 0 30px 8px rgba(255,255,255,0.06); }
      }
      .cl-clt-wash { position:absolute; inset:0; pointer-events:none;
        background:radial-gradient(ellipse at 50% -10%, rgba(139,92,246,0.16), transparent 55%); }
    </style>
    <div class="cl-clt">
      ${Array.from({ length: strands }, (_, s) => `<div class="cl-clt-strand">
        ${Array.from({ length: per }, (_, b) => {
          const c = colors[(s + b) % colors.length];
          const d = (1 + Math.random() * 2).toFixed(2);
          const dl = (-Math.random() * 3).toFixed(2);
          const top = 12 + (b * (88 / per));
          return `<i class="cl-clt-bulb" style="top:${top.toFixed(0)}%; background:${c}; color:${c};
            --d:${d}s; --dl:${dl}s"></i>`;
        }).join('')}
      </div>`).join('')}
      <div class="cl-clt-wash"></div>
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
