export interface SkateHalfpipeRiderOptions {
  label?: string;
}

export function createSkateHalfpipeRider(
  container: HTMLElement,
  options: SkateHalfpipeRiderOptions = {},
): () => void {
  container.innerHTML = `
    <style>
      .cl-n54 { height:100%; position:relative; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:linear-gradient(#0b0b10,#18181b); perspective:800px; cursor:pointer; user-select:none; }
      .cl-n54-scene { position:relative; width:min(70%,320px); height:66%; transform-style:preserve-3d;
        transform:rotateX(20deg); will-change:transform; transition:transform .5s ease; }
      .cl-n54-pipe { position:absolute; inset:auto 4% 6%; height:58%; border-radius:999px;
        border-bottom:5px solid #67e8f9aa;
        background:linear-gradient(#27272a,#101014);
        box-shadow:inset 0 -14px 28px rgba(0,0,0,.55), 0 0 24px rgba(103,232,249,.12); }
      .cl-n54-rider { position:absolute; bottom:56%; left:50%; width:20px; height:34px; margin-left:-10px;
        transform-style:preserve-3d; z-index:2; }
      .cl-n54-board { position:absolute; bottom:0; width:100%; height:5px; border-radius:3px; background:#f472b6;
        box-shadow:0 0 12px rgba(244,114,182,.5); }
      .cl-n54-body { position:absolute; bottom:5px; left:5px; width:9px; height:24px; border-radius:5px;
        background:#a78bfa; }
      .cl-n54.riding .cl-n54-rider { animation:cl-n54-carve 2.4s cubic-bezier(.42,.05,.58,.95) infinite; }
      @keyframes cl-n54-carve {
        from { left:16%; bottom:20%; transform:rotateZ(34deg) rotateY(0deg); }
        to   { left:80%; bottom:20%; transform:rotateZ(-34deg) rotateY(360deg); }
      }
      .cl-n54-hint { position:absolute; top:12px; width:100%; text-align:center; color:#67e8f9; font-size:10px; letter-spacing:.3em; text-transform:uppercase; }
    </style>
    <div class="cl-n54">
      <div class="cl-n54-scene"><div class="cl-n54-pipe"></div><div class="cl-n54-rider"><i class="cl-n54-board"></i><i class="cl-n54-body"></i></div></div>
      <div class="cl-n54-hint">Click to drop in</div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n54')!;
  const scene = root.querySelector<HTMLElement>('.cl-n54-scene')!;

  let raf = 0;
  const t = { rx: 20 };
  const c = { rx: 20 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.rx += (t.rx - c.rx) * 0.09;
    scene.style.transform = `rotateX(${c.rx.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onClick() {
    root.classList.toggle('riding');
  }

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.rx = 20 + ((e.clientY - rect.top) / rect.height - 0.5) * -26;
  }

  function onLeave() {
    t.rx = 20;
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
