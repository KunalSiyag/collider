export interface EffectOptions {
  steps?: string[];
}

export function createStepProgressTracker(container: HTMLElement, options: EffectOptions = {}): () => void {
  const steps = options.steps ?? ['Cart', 'Payment', 'Review', 'Done'];
  const active = Math.min(2, steps.length - 1);

  container.innerHTML = `
    <style>
      .cl-spt { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; padding:20px; }
      .cl-spt-track { display:flex; align-items:center; width:min(100%,460px); }
      .cl-spt-node { display:flex; flex-direction:column; align-items:center; gap:8px; position:relative; z-index:1; }
      .cl-spt-dot { width:34px; height:34px; border-radius:50%; display:flex; align-items:center; justify-content:center;
        font-size:13px; font-weight:700; background:#18181b; color:#52525f;
        border:2px solid #2c2c3a; transition:all .4s .3s; }
      .cl-spt-lbl { font-size:12px; color:rgba(255,255,255,0.55); transition:color .3s .3s; }
      .cl-spt-node.done .cl-spt-dot { background:#22d3ee; border-color:#22d3ee; color:#04202a; box-shadow:0 0 14px rgba(34,211,238,0.45); }
      .cl-spt-node.done .cl-spt-lbl { color:#67e8f9; }
      .cl-spt-bar { flex:1; height:4px; border-radius:999px; margin:0 -6px 26px; background:#23233a;
        overflow:hidden; position:relative; }
      .cl-spt-bar i { position:absolute; inset:0; background:linear-gradient(90deg,#8b5cf6,#22d3ee);
        transform:scaleX(0); transform-origin:left; transition:transform .6s ease .35s; }
      .cl-spt-bar.done i { transform:scaleX(1); }
    </style>
    <div class="cl-spt"><div class="cl-spt-track">
      ${steps.map((s, i) => `
        <div class="cl-spt-node ${i <= active ? 'done' : ''}">
          <div class="cl-spt-dot">${i < active ? '✓' : i + 1}</div>
          <div class="cl-spt-lbl">${s}</div>
        </div>
        ${i < steps.length - 1 ? `<div class="cl-spt-bar ${i < active ? 'done' : ''}"><i></i></div>` : ''}`).join('')}
    </div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
