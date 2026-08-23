export interface RailwayCrossingGateOptions {
  label?: string;
}

export function createRailwayCrossingGate(
  container: HTMLElement,
  options: RailwayCrossingGateOptions = {},
): () => void {
  container.innerHTML = `
    <style>
      .cl-n63 { height:100%; position:relative; display:flex; align-items:center; justify-content:center; overflow:hidden;
        background:linear-gradient(#0b0b10,#131317); perspective:800px; cursor:pointer; user-select:none; }
      .cl-n63-scene { position:relative; width:min(74%,320px); height:64%; transform-style:preserve-3d;
        transform:rotateX(24deg); will-change:transform; transition:transform .5s ease; }
      .cl-n63-track { position:absolute; top:44%; left:0; right:0; height:12%;
        background:
          repeating-linear-gradient(90deg,#52525b88 0 4px, transparent 4px 26px),
          linear-gradient(#27272a,#101014); border-radius:6px;
        box-shadow:0 8px 20px rgba(0,0,0,.55); }
      .cl-n63-train { position:absolute; top:40%; left:-40%; width:34%; height:18%;
        border-radius:6px; background:linear-gradient(#f43f5ecc,#881337); border:1px solid #fb718555;
        box-shadow:0 6px 16px rgba(0,0,0,.5); }
      .cl-n63.pass .cl-n63-train { animation:cl-n63-pass 2.8s linear forwards; }
      @keyframes cl-n63-pass { from { left:-40%; } to { left:110%; } }
      .cl-n63-post { position:absolute; bottom:10%; right:22%; width:9px; height:52%;
        background:repeating-linear-gradient(45deg,#fafafa 0 7px,#b91c1c 7px 14px); border-radius:5px;
        transform-style:preserve-3d; box-shadow:-8px 10px 22px rgba(0,0,0,.5); }
      .cl-n63-armwrap { position:absolute; bottom:calc(10% + 46%); right:calc(22% - 4px);
        transform-origin:left bottom; transform-style:preserve-3d; will-change:transform;
        transition:transform 1.1s cubic-bezier(.5,.05,.3,1.15); }
      .cl-n63.down .cl-n63-armwrap { transform:rotateZ(78deg); }
      .cl-n63-arm { width:36%; height:11px; min-width:120px; border-radius:6px;
        background:repeating-linear-gradient(45deg,#fafafa 0 9px,#dc2626 9px 18px);
        box-shadow:0 5px 12px rgba(0,0,0,.5); display:flex; align-items:center; justify-content:flex-end; padding-right:8px; }
      .cl-n63-light { width:9px; height:9px; border-radius:50%;
        background:#f43f5e; box-shadow:0 0 12px rgba(244,63,94,.85);
        animation:cl-n63-blink 0.8s steps(2) infinite; animation-play-state:paused; }
      .cl-n63.down .cl-n63-light { animation-play-state:running; }
      @keyframes cl-n63-blink { 50% { opacity:.25; } }
      .cl-n63-hint { position:absolute; top:12px; width:100%; text-align:center; color:#a78bfa; font-size:10px; letter-spacing:.3em; text-transform:uppercase; }
    </style>
    <div class="cl-n63">
      <span class="cl-n63-hint">CLICK TO LOWER GATE</span>
      <div class="cl-n63-scene">
        <div class="cl-n63-track"></div>
        <div class="cl-n63-train"></div>
        <div class="cl-n63-post"></div>
        <div class="cl-n63-armwrap"><div class="cl-n63-arm"><i class="cl-n63-light"></i></div></div>
      </div>
    </div>
  `;

  const root = container.querySelector<HTMLElement>('.cl-n63')!;
  const scene = root.querySelector<HTMLElement>('.cl-n63-scene')!;

  let raf = 0;
  const t = { rx: 24 };
  const c = { rx: 24 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.rx += (t.rx - c.rx) * 0.09;
    scene.style.transform = `rotateX(${c.rx.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onClick() {
    if (root.classList.contains('pass')) return;
    root.classList.add('down');
    setTimeout(() => root.classList.add('pass'), 900);
    setTimeout(() => root.classList.remove('down', 'pass'), 4200);
  }

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.rx = 24 + ((e.clientY - rect.top) / rect.height - 0.5) * -22;
  }

  function onLeave() {
    t.rx = 24;
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
