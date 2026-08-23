export interface SwingSetPendulumOptions {
  label?: string;
}

export function createSwingSetPendulum(
  container: HTMLElement,
  options: SwingSetPendulumOptions = {},
): () => void {
  container.innerHTML = `
    <style>
      .cl-n44 { height:100%; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:
          radial-gradient(circle at 30% 24%, rgba(103,232,249,.1), transparent 46%),
          linear-gradient(#0b0b10,#101014); perspective:800px; cursor:pointer; user-select:none; }
      .cl-n44-frame { position:relative; width:min(56%,250px); height:70%; transform-style:preserve-3d;
        transform:rotateY(-14deg); will-change:transform; transition:transform .4s ease; }
      .cl-n44-topbar { position:absolute; top:0; left:-4%; right:-4%; height:9px; border-radius:5px;
        background:linear-gradient(#67e8f9,#155e75); box-shadow:0 6px 16px rgba(0,0,0,.5); }
      .cl-n44-leg { position:absolute; top:0; width:7px; height:96%; background:linear-gradient(#22d3ee,#164e63); border-radius:4px; }
      .cl-n44-leg.l { left:0; } .cl-n44-leg.r { right:0; }
      .cl-n44-seatpivot { position:absolute; top:9px; left:50%; width:2px; height:52%;
        transform-origin:center top; will-change:transform; }
      .cl-n44.swinging .cl-n44-seatpivot { animation:cl-n44-pump 2s cubic-bezier(.42,.05,.58,.95) infinite; }
      @keyframes cl-n44-pump { from { transform:rotateZ(38deg); } to { transform:rotateZ(-38deg); } }
      .cl-n44-rope { position:absolute; inset:0 auto 0 0; width:2px; background:#a78bfaaa; }
      .cl-n44-rope.r2 { left:calc(100% - 2px); }
      .cl-n44-seat { position:absolute; bottom:-5px; left:50%; width:26px; height:6px; margin-left:-13px;
        border-radius:3px; background:#f472b6; box-shadow:0 0 12px rgba(244,114,182,.5); }
      .cl-n44-ground { position:absolute; bottom:-2%; left:-10%; right:-10%; height:6%; border-radius:50%;
        background:rgba(0,0,0,.5); filter:blur(8px); }
      .cl-n44-hint { position:absolute; top:12px; width:100%; text-align:center; color:#67e8f9; font-size:10px; letter-spacing:.3em; text-transform:uppercase; }
    </style>
    <div class="cl-n44">
      <div class="cl-n44-frame">
        <i class="cl-n44-leg l"></i><i class="cl-n44-leg r"></i>
        <div class="cl-n44-topbar"></div>
        <div class="cl-n44-seatpivot">
          <i class="cl-n44-rope"></i><i class="cl-n44-rope r2"></i>
          <div class="cl-n44-seat"></div>
        </div>
        <div class="cl-n44-ground"></div>
      </div>
      <div class="cl-n44-hint">Click to swing</div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n44')!;
  const frame = root.querySelector<HTMLElement>('.cl-n44-frame')!;

  let raf = 0;
  const t = { ry: -14 };
  const c = { ry: -14 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.ry += (t.ry - c.ry) * 0.09;
    frame.style.transform = `rotateY(${c.ry.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onClick() {
    root.classList.toggle('swinging');
  }

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.ry = -14 + ((e.clientX - rect.left) / rect.width - 0.5) * 40;
  }

  function onLeave() {
    t.ry = -14;
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
