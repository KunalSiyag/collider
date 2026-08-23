export interface SolarPanelArrayTiltOptions {
  panels?: number;
}

export function createSolarPanelArrayTilt(
  container: HTMLElement,
  options: SolarPanelArrayTiltOptions = {},
): () => void {
  const n = Math.max(3, Math.min(options.panels ?? 5, 7));

  const panels = Array.from({ length: n }, (_, i) => `<div class="cl-n97-panel" style="--i:${i}"><b></b></div>`).join('');

  container.innerHTML = `
    <style>
      .cl-n97 { height:100%; display:flex; align-items:center; justify-content:center; gap:26px; overflow:hidden;
        background:
          radial-gradient(circle at 68% 22%, rgba(250,204,21,.14), transparent 44%),
          linear-gradient(#131317,#0b0b10); perspective:800px; cursor:pointer; user-select:none; }
      .cl-n97-scene { position:relative; width:min(74%,320px); height:56%;
        transform-style:preserve-3d; will-change:transform; transition:transform .5s ease; }
      .cl-n97-panel { position:relative; flex:1; height:100%; margin-right:-2px;
        transform-origin:bottom center; will-change:transform;
        transition:transform .8s cubic-bezier(.45,.05,.25,1); transition-delay:calc(var(--i) * .07s);
        transform-style:preserve-3d; }
      .cl-n97-panel b { position:absolute; inset:0; border-radius:4px;
        background:
          repeating-linear-gradient(90deg, transparent 0 9px, rgba(103,232,249,.35) 9px 10px),
          repeating-linear-gradient(0deg, transparent 0 12px, rgba(103,232,249,.25) 12px 13px),
          linear-gradient(150deg,#1e3a5f,#0c2036);
        border:2px solid #334155;
        box-shadow:inset 0 0 18px rgba(103,232,249,.12), 0 8px 18px rgba(0,0,0,.45); }
      .cl-n97.tilt .cl-n97-panel { transform:rotateX(-42deg); }
      .cl-n97-leg { position:absolute; bottom:-16%; width:5px; height:17%;
        background:linear-gradient(#52525b,#27272a); }
      .cl-n97-sun { width:44px; height:44px; border-radius:50%; flex-shrink:0;
        background:radial-gradient(circle at 36% 32%,#fef9c3,#f59e0b 62%);
        box-shadow:0 0 40px rgba(254,243,199,.6);
        animation:cl-n97-orbitY 5s ease-in-out infinite alternate; }
      @keyframes cl-n97-orbitY { from { translateY(40px); } to { translateY(-50px); } }
      .cl-n97-ground { position:absolute; bottom:-22%; left:-6%; right:-6%; height:12%; border-radius:8px;
        background:#101014; transform:rotateX(56deg); transform-origin:center top;
        box-shadow:inset 0 10px 24px rgba(0,0,0,.6); }
      .cl-n97-hint { position:absolute; bottom:10px; width:100%; text-align:center; color:#71717a; font-size:10px; letter-spacing:.3em; text-transform:uppercase; z-index:2; }
    </style>
    <div class="cl-n97">
      <div class="cl-n97-scene" style="display:flex;">
        <div class="cl-n97-sun"></div>
        ${panels}
        <div class="cl-n97-ground"></div>
      </div>
      <span class="cl-n97-hint">CLICK TO TRACK SUN</span>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n97')!;
  const scene = root.querySelector<HTMLElement>('.cl-n97-scene')!;

  let raf = 0;
  const t = { ry: 0 };
  const c = { ry: 0 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.ry += (t.ry - c.ry) * 0.09;
    scene.style.transform = `rotateX(14deg) rotateY(${c.ry.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onClick() {
    root.classList.toggle('tilt');
  }

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.ry = ((e.clientX - rect.left) / rect.width - 0.5) * 34;
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
