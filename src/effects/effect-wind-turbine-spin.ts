export interface EffectOptions {
  turbines?: number;
}

export function createWindTurbineSpin(container: HTMLElement, options: EffectOptions = {}): () => void {
  const n = options.turbines ?? 3;

  container.innerHTML = `
    <style>
      .cl-wts { height:100%; display:flex; align-items:flex-end; justify-content:center; gap:44px;
        padding-bottom:0; background:linear-gradient(to bottom, #0d1226, #0b0b10 75%);
        overflow:hidden; position:relative; }
      .cl-wts-t { display:flex; flex-direction:column; align-items:center; }
      .cl-wts-blades { position:relative; width:84px; height:84px;
        animation:cl-wts-spin var(--sp) linear infinite; transform-origin:50% 50%; }
      @keyframes cl-wts-spin { to { transform:rotate(360deg); } }
      .cl-wts-blades i { position:absolute; left:calc(50% - 4px); bottom:50%; width:8px; height:40px;
        border-radius:999px; transform-origin:50% 100%;
        background:linear-gradient(to top, rgba(196,181,253,0.95), rgba(103,232,249,0.75));
        clip-path:polygon(50% 0, 100% 100%, 0 100%); }
      .cl-wts-pole { width:9px; height:var(--h); margin-top:-8px; border-radius:4px;
        background:linear-gradient(90deg,#2c2c3a,#454558,#2c2c3a); box-shadow:6px 10px 14px rgba(0,0,0,0.4); }
      .cl-wts-hill { position:absolute; bottom:0; left:0; right:0; height:12%;
        background:#11131f; border-radius:100% 100% 0 0 / 200% 200% 0 0; }
    </style>
    <div class="cl-wts">
      ${Array.from({ length: n }, (_, i) => `<div class="cl-wts-t" style="--h:${(120 + i * 34)}px">
        <div class="cl-wts-blades" style="--sp:${(2.4 + i * 0.9).toFixed(1)}s">
          ${[0, 120, 240].map(a => `<i style="transform:rotate(${a}deg)"></i>`).join('')}
        </div>
        <div class="cl-wts-pole" style="--h:${120 + i * 34}px"></div>
      </div>`).join('')}
      <div class="cl-wts-hill"></div>
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
