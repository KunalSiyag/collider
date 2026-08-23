export interface DamSpillwayGatesOptions {
  gates?: number;
}

export function createDamSpillwayGates(
  container: HTMLElement,
  options: DamSpillwayGatesOptions = {},
): () => void {
  const n = Math.max(3, Math.min(options.gates ?? 4, 6));

  const gates = Array.from({ length: n }, (_, i) => `<div class="cl-n120-gate" style="--i:${i}"></div>`).join('');

  container.innerHTML = `
    <style>
      .cl-n121 { height:100%; position:relative; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:linear-gradient(#0b1120,#0c1a24); perspective:800px; cursor:pointer; user-select:none; }
      .cl-n121-scene { position:relative; width:min(74%,320px); height:70%;
        transform-style:preserve-3d; will-change:transform; transition:transform .5s ease; }
      .cl-n121-dam { position:absolute; inset:auto 0 14%; top:6%;
        border-radius:8px;
        background:
          repeating-linear-gradient(90deg, transparent 0 26px, rgba(2,6,23,.3) 26px 29px),
          repeating-linear-gradient(0deg, transparent 0 16px, rgba(2,6,23,.25) 16px 19px),
          linear-gradient(#334155,#1e293b);
        border:2px solid #27272a; transform-style:preserve-3d;
        box-shadow:-14px 22px 48px rgba(2,6,23,.6); overflow:hidden; }
      .cl-n121-slots { position:absolute; inset:12% 7%; display:flex; gap:4%; }
      .cl-n121-gate { flex:1; border-radius:5px;
        background:
          repeating-linear-gradient(45deg, rgba(250,204,21,.28) 0 6px, transparent 6px 13px),
          linear-gradient(#fbbf2455,#78350f88);
        border:2px solid #92400e66;
        transform-origin:center bottom;
        transition:translateY 1.3s cubic-bezier(.5,.05,.3,1), opacity .8s ease .6s; transition-delay:calc(var(--i) * .08s); }
      .cl-n121.open .cl-n121-gate { translateY(-58%); opacity:.35; }
      .cl-n121-fall { position:absolute; top:calc(6% + 46%); left:var(--x); width:9%; height:0%;
        border-radius:0 0 10px 10px;
        background:linear-gradient(rgba(103,232,249,.75), rgba(103,232,249,.15));
        filter:blur(1px); opacity:0;
        transition:height 1.4s cubic-bezier(.4,.05,.4,1) calc(var(--i) * .08s + .5s), opacity .5s ease calc(var(--i) * .08s + .5s);
        box-shadow:0 0 20px rgba(103,232,249,.3); }
      .cl-n121.open .cl-n121-fall { height:34%; opacity:1; }
      .cl-n121-river { position:absolute; bottom:4%; left:-4%; right:-4%; height:14%; border-radius:8px;
        background:linear-gradient(#155e75aa,#083344ee);
        animation:cl-n121-flow 4s ease-in-out infinite alternate; }
      @keyframes cl-n121-flow { from { translate:-5px 0; } to { translate:5px 0; } }
      .cl-n121-mist { position:absolute; bottom:17%; left:50%; width:60%; height:16%; margin-left:-30%; border-radius:50%;
        background:rgba(186,230,253,.16); filter:blur(9px); opacity:0; transition:opacity .8s ease 1.4s; }
      .cl-n121.open .cl-n121-mist { opacity:1; animation:cl-n121-driftmist 3s ease-in-out infinite alternate; }
      @keyframes cl-n121-driftmist { from { translate:-6px 0; } to { translate:6px -4px; } }
      .cl-n121-tag { position:absolute; top:10px; left:50%; translate:-50% 0; color:#67e8f9aa; font-size:10px; letter-spacing:.42em; text-transform:uppercase; z-index:2; }
    </style>
    <div class="cl-n121">
      <span class="cl-n121-tag">HYDRO DAM · CLICK TO OPEN GATES</span>
      <div class="cl-n121-scene">
        <div class="cl-n121-dam"><div class="cl-n121-slots">${gates}</div></div>
        ${Array.from({ length: n }, (_, i) => `<i class="cl-n121-fall" style="--x:${(11 + i * (76 / n)).toFixed(1)}%;--i:${i}"></i>`).join('')}
        <div class="cl-n121-river"></div>
        <div class="cl-n121-mist"></div>
      </div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n121')!;
  const scene = root.querySelector<HTMLElement>('.cl-n121-scene')!;

  let raf = 0;
  const t = { ry: 0 };
  const c = { ry: 0 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.ry += (t.ry - c.ry) * 0.09;
    scene.style.transform = `rotateY(${c.ry.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onClick() {
    root.classList.toggle('open');
  }

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.ry = ((e.clientX - rect.left) / rect.width - 0.5) * 32;
  }

  function onLeave() {
    t.ry = 0;
  }

  root.addEventListener('click', onClick);
  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerleave', onLeave);

  return () => {
    cancelAnimationFrame(raf);
    root.removeEventListener('click', onClick);
    container.removeEventListener('pointermove', onMove);
    container.removeEventListener('pointerleave', onLeave);
    container.innerHTML = '';
  };
}
