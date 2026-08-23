export interface CableCarGondolaOptions {
  label?: string;
}

export function createCableCarGondola(
  container: HTMLElement,
  options: CableCarGondolaOptions = {},
): () => void {
  const { label = 'ALPINE LINE' } = options;

  container.innerHTML = `
    <style>
      .cl-n47 { height:100%; position:relative; overflow:hidden;
        background:linear-gradient(#0b0b10,#1e1b4b 80%); perspective:900px; }
      .cl-n47-scene { position:absolute; inset:0; transform-style:preserve-3d; will-change:transform; }
      .cl-n47-cable { position:absolute; top:22%; left:-4%; right:-4%; height:2px; background:#71717a;
        box-shadow:0 1px 0 #27272a; }
      .cl-n47-pylon { position:absolute; top:10%; left:30%; width:8px; height:16%;
        background:linear-gradient(90deg,#3f3f46,#52525b); border-radius:3px; }
      .cl-n47-car { position:absolute; top:calc(22% - 2px); left:12%; width:64px; height:52px;
        transform-origin:center -6px; will-change:left, transform;
        animation:cl-n47-travel 9s ease-in-out infinite alternate; }
      @keyframes cl-n47-travel { from { left:12%; } to { left:74%; } }
      .cl-n47-hanger { position:absolute; top:-8px; left:50%; width:3px; height:14px; margin-left:-1.5px; background:#a78bfa; border-radius:2px; }
      .cl-n47-cabin { position:relative; width:100%; height:100%; margin-top:8px; border-radius:8px;
        background:linear-gradient(#67e8f9cc,#155e75); border:1px solid rgba(255,255,255,.25);
        box-shadow:0 14px 28px rgba(0,0,0,.55), inset 0 0 14px rgba(103,232,249,.25);
        animation:cl-n47-sway 3.4s ease-in-out infinite; }
      @keyframes cl-n47-sway { from { rotate:-2.4deg; } to { rotate:2.4deg; } }
      .cl-n47-window { position:absolute; top:9px; left:9px; right:9px; height:18px; border-radius:4px;
        background:rgba(255,255,255,.24); }
      .cl-n47-peaks { position:absolute; bottom:0; left:0; right:0; height:34%;
        background:
          linear-gradient(to top right, transparent 46%, #18181b 47%) left/51% 100% no-repeat,
          linear-gradient(to top left, transparent 46%, #101013 47%) right/51% 100% no-repeat,
          #0f0f14; filter:blur(.5px); }
      .cl-n47-label { position:absolute; bottom:38%; left:50%; transform:translateX(-50%);
        color:#a78bfa; font-size:10px; letter-spacing:.42em; text-transform:uppercase; text-shadow:0 0 12px rgba(167,139,250,.5); }
    </style>
    <div class="cl-n47">
      <div class="cl-n47-scene">
        <span class="cl-n47-label">${label}</span>
        <i class="cl-n47-pylon"></i>
        <div class="cl-n47-cable"></div>
        <div class="cl-n47-car"><i class="cl-n47-hanger"></i><div class="cl-n47-cabin"><i class="cl-n47-window"></i></div></div>
        <div class="cl-n47-peaks"></div>
      </div>
    </div>
  `;

  const scene = container.querySelector<HTMLElement>('.cl-n47-scene')!;

  let raf = 0;
  const t = { rx: 0, ry: 0 };
  const c = { rx: 0, ry: 0 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.rx += (t.rx - c.rx) * 0.08;
    c.ry += (t.ry - c.ry) * 0.08;
    scene.style.transform = `rotateX(${c.rx.toFixed(2)}deg) rotateY(${c.ry.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.rx = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    t.ry = ((e.clientX - rect.left) / rect.width - 0.5) * 26;
  }

  function onLeave() {
    t.rx = 0;
    t.ry = 0;
  }

  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerleave', onLeave);

  return () => {
    cancelAnimationFrame(raf);
    container.removeEventListener('pointermove', onMove);
    container.removeEventListener('pointerleave', onLeave);
    container.innerHTML = '';
  };
}
