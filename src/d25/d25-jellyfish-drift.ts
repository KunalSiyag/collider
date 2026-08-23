export interface JellyfishDriftOptions {
  label?: string;
}

export function createJellyfishDrift(
  container: HTMLElement,
  options: JellyfishDriftOptions = {},
): () => void {
  const { label = 'ABYSS' } = options;

  container.innerHTML = `
    <style>
      .cl-n76 { height:100%; position:relative; overflow:hidden;
        background:
          radial-gradient(circle at 50% 80%, rgba(34,211,238,.12), transparent 46%),
          linear-gradient(#020617,#0e3a5c);
        perspective:800px; }
      .cl-n76-scene { position:absolute; inset:0; transform-style:preserve-3d; will-change:transform; transition:transform .6s ease; }
      .cl-n76-jelly { position:absolute; left:var(--x); top:var(--y); width:64px; height:84px;
        transform-style:preserve-3d;
        animation:cl-n76-drift var(--d) ease-in-out infinite alternate, cl-n76-pulse 2.8s ease-in-out infinite; }
      @keyframes cl-n76-drift { from { margin-left:-24px; } to { margin-left:26px; } }
      @keyframes cl-n76-pulse { 0%,100% { scale:1 1; opacity:.85; } 50% { scale:1.08 .92; opacity:1; } }
      .cl-n76-bell { width:100%; height:46%; border-radius:999px 999px 26% 26%;
        background:radial-gradient(circle at 38% 30%, #f9a8d4ee, #be185daa 62%, #50072488);
        box-shadow:0 0 26px rgba(244,114,182,.4), inset -6px -6px 14px rgba(0,0,0,.25); }
      .cl-n76-tent { display:flex; justify-content:center; gap:5px; margin-top:-3px; }
      .cl-n76-tent i { width:2.5px; border-radius:999px;
        background:linear-gradient(#f9a8d488, transparent);
        animation:cl-n76-wave 1.9s ease-in-out infinite alternate;
        animation-delay:inherit; }
      @keyframes cl-n76-wave { from { rotate:10deg; height:70%; } to { rotate:-10deg; height:100%; } }
      .cl-n76-mote { position:absolute; bottom:-8px; left:var(--x); width:3px; height:3px; border-radius:50%;
        background:#67e8f966; animation:cl-n76-rise var(--d) linear infinite; animation-delay:var(--dl); }
      @keyframes cl-n76-rise { to { translate:0 -110vh; opacity:0; } }
      .cl-n76-tag { position:absolute; top:14px; right:18px; color:#67e8f9aa; font-size:10px; letter-spacing:.42em; text-transform:uppercase; }
    </style>
    <div class="cl-n76">
      <div class="cl-n76-scene">
        <span class="cl-n76-tag">${label}</span>
        ${Array.from({ length: 5 }, (_, i) => `<div class="cl-n76-jelly" style="--x:${(12 + i * 17).toFixed(0)}%;--y:${(16 + ((i * 29) % 44)).toFixed(0)}%;--d:${(6 + i * 1.7).toFixed(1)}s">
          <div class="cl-n76-bell"></div>
          <div class="cl-n76-tent">${Array.from({ length: 5 }, () => '<i style="animation-delay:' + (i * 0.21).toFixed(2) + 's"></i>').join('')}</div>
        </div>`).join('')}
        ${Array.from({ length: 10 }, (_, i) => `<i class="cl-n76-mote" style="--x:${(4 + i * 9.4).toFixed(0)}%;--d:${(7 + (i % 5) * 2).toFixed(0)}s;--dl:${(-i * 1.3).toFixed(1)}s"></i>`).join('')}
      </div>
    </div>
  `;

  const scene = container.querySelector<HTMLElement>('.cl-n76-scene')!;

  let raf = 0;
  const t = { rx: 0, ry: 0 };
  const c = { rx: 0, ry: 0 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.rx += (t.rx - c.rx) * 0.06;
    c.ry += (t.ry - c.ry) * 0.06;
    scene.style.transform = `rotateX(${c.rx.toFixed(2)}deg) rotateY(${c.ry.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.rx = ((e.clientY - rect.top) / rect.height - 0.5) * -22;
    t.ry = ((e.clientX - rect.left) / rect.width - 0.5) * 28;
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
