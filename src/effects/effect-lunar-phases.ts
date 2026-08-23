export interface EffectOptions {
  phases?: number;
}

export function createLunarPhases(container: HTMLElement, options: EffectOptions = {}): () => void {
  const n = options.phases ?? 8;

  container.innerHTML = `
    <style>
      .cl-lnp { height:100%; display:flex; align-items:center; justify-content:center; gap:18px; flex-wrap:wrap;
        background:#08080f; padding:20px; }
      .cl-lnp-m { position:relative; width:56px; height:56px; border-radius:50%;
        background:#e8e4d8; overflow:hidden;
        box-shadow:inset -5px -5px 12px rgba(0,0,0,0.35), 0 0 14px rgba(232,228,216,0.25); }
      .cl-lnp-shade { position:absolute; inset:0; border-radius:50%; background:#0c0c16;
        transition:none; animation:cl-lnp-cycle 6s linear infinite; animation-delay:var(--d); }
      @keyframes cl-lnp-cycle {
        0% { transform:translateX(-100%); }
        50% { transform:translateX(0); }
        100% { transform:translateX(100%); }
      }
      .cl-lnp-cap { text-align:center; color:rgba(255,255,255,0.45); font-size:10px; letter-spacing:0.12em;
        margin-top:8px; }
      .cl-lnp-item { display:flex; flex-direction:column; align-items:center; }
    </style>
    <div class="cl-lnp">
      ${Array.from({ length: n }, (_, i) => `<div class="cl-lnp-item">
        <div class="cl-lnp-m"><i class="cl-lnp-shade" style="--d:${(-(i / n) * 6).toFixed(2)}s"></i></div>
        <span class="cl-lnp-cap">D${i + 1}</span>
      </div>`).join('')}
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
