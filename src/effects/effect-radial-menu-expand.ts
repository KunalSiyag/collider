export interface EffectOptions {
  actions?: string[];
}

export function createRadialMenuExpand(container: HTMLElement, options: EffectOptions = {}): () => void {
  const actions = options.actions ?? ['✎', '⧉', '↺', '🗑'];
  const n = actions.length;

  container.innerHTML = `
    <style>
      .cl-rmx { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-rmx-stage { position:relative; width:240px; height:240px; }
      .cl-rmx-center { position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); z-index:3;
        width:62px; height:62px; border-radius:50%; border:0; cursor:pointer; font-size:26px; color:#fff;
        background:linear-gradient(135deg,#8b5cf6,#22d3ee); box-shadow:0 10px 24px rgba(139,92,246,0.5);
        transition:transform .35s cubic-bezier(.34,1.56,.64,1); }
      .cl-rmx.open .cl-rmx-center { transform:translate(-50%,-50%) rotate(135deg); }
      .cl-rmx-item { position:absolute; left:50%; top:50%; margin:-23px; z-index:2;
        width:46px; height:46px; border-radius:50%; border:1px solid rgba(167,139,250,0.55);
        background:#18181b; color:#a78bfa; font-size:19px; cursor:pointer;
        display:flex; align-items:center; justify-content:center;
        opacity:0; pointer-events:none;
        transition:opacity .3s ease var(--d), transform .45s cubic-bezier(.34,1.4,.64,1) var(--d),
          background .2s, color .2s; }
      .cl-rmx-item:hover { background:#8b5cf6; color:#fff; }
      .cl-rmx.open .cl-rmx-item { opacity:1; pointer-events:auto;
        transform:rotate(var(--a)) translateY(-88px) rotate(calc(var(--a) * -1)); }
    </style>
    <div class="cl-rmx"><div class="cl-rmx-stage">
      <button class="cl-rmx-center" type="button" aria-label="Toggle menu">+</button>
      ${actions.map((a, i) => {
        const ang = -90 + i * (360 / n);
        return `<button class="cl-rmx-item" style="--a:${ang}deg; --d:${(i * 0.04).toFixed(2)}s" type="button">${a}</button>`;
      }).join('')}
    </div></div>
  `;

  const root = container.querySelector('.cl-rmx')!;
  const center = root.querySelector('.cl-rmx-center') as HTMLElement;
  const onToggle = (e: Event) => { e.stopPropagation(); root.classList.toggle('open'); };
  center.addEventListener('click', onToggle);

  return () => {
    center.removeEventListener('click', onToggle);
    container.innerHTML = '';
  };
}
