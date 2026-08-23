export interface EffectOptions {
  burstCount?: number;
}

export function createConfettiBurstPanel(container: HTMLElement, options: EffectOptions = {}): () => void {
  const n = options.burstCount ?? 60;
  const colors = ['#8b5cf6', '#a78bfa', '#22d3ee', '#67e8f9', '#f472b6'];

  container.innerHTML = `
    <style>
      .cl-cbp { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; overflow:hidden; }
      .cl-cbp-btn { padding:14px 30px; font-size:15px; font-weight:700; color:#fff; border:0; border-radius:999px;
        cursor:pointer; background:linear-gradient(90deg,#8b5cf6,#22d3ee); transition:transform .15s; }
      .cl-cbp-btn:active { transform:scale(0.95); }
      .cl-cbp-p { position:absolute; pointer-events:none; will-change:transform,opacity; }
      @keyframes cl-cpb-fly {
        to { transform:translate(var(--dx), var(--dy)) rotate(var(--rot)); opacity:0; }
      }
    </style>
    <div class="cl-cbp"><button class="cl-cbp-btn" type="button">Celebrate!</button></div>
  `;

  const root = container.querySelector('.cl-cbp')!;
  const btn = root.querySelector('.cl-cbp-btn') as HTMLElement;

  const burst = () => {
    const ox = btn.offsetLeft + btn.offsetWidth / 2;
    const oy = btn.offsetTop + btn.offsetHeight / 2;
    for (let i = 0; i < n; i++) {
      const p = document.createElement('span');
      p.className = 'cl-cbp-p';
      const size = 5 + Math.random() * 7;
      const ang = Math.random() * Math.PI * 2;
      const dist = 70 + Math.random() * 160;
      p.style.cssText = `left:${ox}px; top:${oy}px; width:${size}px; height:${size * (Math.random() > 0.5 ? 1 : 0.45)}px;
        background:${colors[i % colors.length]}; border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
        --dx:${Math.cos(ang) * dist}px; --dy:${Math.sin(ang) * dist - 70}px; --rot:${Math.random() * 720 - 360}deg;
        animation:cl-cpb-fly ${0.7 + Math.random() * 0.8}s cubic-bezier(.15,.6,.4,1) forwards;`;
      root.appendChild(p);
      setTimeout(() => p.remove(), 1600);
    }
  };

  btn.addEventListener('click', burst);

  return () => {
    btn.removeEventListener('click', burst);
    container.innerHTML = '';
  };
}
