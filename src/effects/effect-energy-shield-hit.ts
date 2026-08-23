export interface EffectOptions {
  label?: string;
}

export function createEnergyShieldHit(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { label = 'CLICK THE SHIELD' } = options;

  container.innerHTML = `
    <style>
      .cl-esh { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:26px;
        background:#05070d; }
      .cl-esh-dome { position:relative; width:190px; height:190px; cursor:pointer; border-radius:50%;
        background:radial-gradient(circle at 38% 32%, rgba(34,211,238,0.28), rgba(139,92,246,0.12) 55%, transparent 72%);
        border:2px solid rgba(103,232,249,0.55);
        box-shadow:0 0 30px rgba(34,211,238,0.25), inset 0 0 30px rgba(139,92,246,0.18); }
      .cl-esh-core { position:absolute; inset:36%; border-radius:50%;
        background:radial-gradient(circle at 40% 35%, #a5f3fc, #0891b2 60%, #155e75);
        animation:cl-esh-breathe 2.2s ease-in-out infinite alternate; }
      @keyframes cl-esh-breathe { from { transform:scale(0.94); } to { transform:scale(1.06); } }
      .cl-esh-ring { position:absolute; inset:-6px; border-radius:50%; border:3px solid rgba(167,139,250,0.85);
        opacity:0; pointer-events:none; }
      .cl-esh-hit .cl-esh-ring { animation:cl-esh-wave .55s ease-out forwards; }
      @keyframes cl-esh-wave {
        0% { opacity:0.95; transform:scale(1); }
        100% { opacity:0; transform:scale(1.45); }
      }
      .cl-esh-hex { position:absolute; inset:0; border-radius:50%; overflow:hidden; opacity:0.5;
        background:
          repeating-linear-gradient(60deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 22px),
          repeating-linear-gradient(-60deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 22px),
          repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 19px); }
      .cl-esh-tag { color:#67e8f9; font-size:12px; letter-spacing:0.3em; }
    </style>
    <div class="cl-esh">
      <div class="cl-esh-dome"><div class="cl-esh-hex"></div><div class="cl-esh-core"></div><div class="cl-esh-ring"></div></div>
      <span class="cl-esh-tag">${label}</span>
    </div>
  `;

  const dome = container.querySelector('.cl-esh-dome')!;
  const onHit = () => {
    dome.classList.remove('cl-esh-hit');
    void dome.offsetWidth;
    dome.classList.add('cl-esh-hit');
  };
  dome.addEventListener('click', onHit);

  return () => {
    dome.removeEventListener('click', onHit);
    container.innerHTML = '';
  };
}
