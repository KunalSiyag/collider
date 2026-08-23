export interface CoralReefLayersOptions {
  label?: string;
}

export function createCoralReefLayers(
  container: HTMLElement,
  options: CoralReefLayersOptions = {},
): () => void {
  const { label = 'REEF' } = options;
  const hues = ['#f472b6', '#a78bfa', '#22d3ee', '#67e8f9'];

  const corals = Array.from({ length: 9 }, (_, i) => {
    const z = -(i * 40);
    const hue = hues[i % hues.length];
    const x = 6 + ((i * 29) % 84);
    const h = 34 + ((i * 17) % 30);
    const kind = i % 3;
    return `<div class="cl-n104-coral k${kind}" style="--z:${z}px;--c:${hue};--x:${x}%;--h:${h}%;--d:${(-i * 0.5).toFixed(1)}s"></div>`;
  }).join('');

  container.innerHTML = `
    <style>
      .cl-n105 { height:100%; position:relative; overflow:hidden;
        background:linear-gradient(#083344,#020617); perspective:900px; }
      .cl-n105-scene { position:absolute; inset:0; transform-style:preserve-3d; will-change:transform; }
      .cl-n105-sand { position:absolute; bottom:-4%; left:-8%; right:-8%; height:24%;
        background:linear-gradient(#155e75aa,#082f49); border-radius:50% 40% 46% 50%/100% 100% 0 0; }
      .cl-n105-coral { position:absolute; bottom:12%; left:var(--x); width:26px; height:var(--h);
        transform:translateZ(var(--z)); transform-origin:center bottom;
        animation:cl-n105-sway 4s ease-in-out infinite alternate; animation-delay:var(--d);
        filter:drop-shadow(0 10px 16px rgba(2,6,23,.5)); }
      @keyframes cl-n105-sway { from { rotate:-3deg; } to { rotate:3deg; } }
      .cl-n105-coral.k0 { border-radius:999px 999px 6px 6px;
        background:radial-gradient(circle at 38% 22%, color-mix(in srgb, var(--c) 75%, white), var(--c) 58%, #101014); }
      .cl-n105-coral.k1 { clip-path:polygon(50% 0,72% 28%,96% 44%,74% 62%,88% 100%,10% 100%,26% 60%,4% 42%,30% 26%);
        background:linear-gradient(color-mix(in srgb, var(--c) 80%, white), var(--c) 55%, #101014); }
      .cl-n105-coral.k2 { border-radius:50% 50% 8px 8px / 90% 90% 8px 8px;
        background:repeating-linear-gradient(0deg, color-mix(in srgb, var(--c) 85%, white) 0 5px, var(--c) 5px 11px, #101014 11px 13px); }
      .cl-n105-fish { position:absolute; top:var(--y); width:18px; height:8px; margin-left:-9px;
        background:#fbbf24cc; clip-path:polygon(0 50%,68% 0,100% 32%,86% 50%,100% 68%,68% 100%);
        animation:cl-n105-swim linear infinite; animation-duration:var(--d); opacity:.85; z-index:2; }
      @keyframes cl-n105-swim { from { left:-6%; } to { left:106%; } }
      .cl-n105-tag { position:absolute; top:12px; left:16px; color:#67e8f988; font-size:10px; letter-spacing:.44em; text-transform:uppercase; z-index:3; }
    </style>
    <div class="cl-n105">
      <div class="cl-n105-scene">
        <span class="cl-n105-tag">${label}</span>
        ${Array.from({ length: 4 }, (_, i) => `<i class="cl-n105-fish" style="--y:${(16 + i * 14).toFixed(0)}%;--d:${(7 + i * 3).toFixed(0)}s"></i>`).join('')}
        ${corals}
        <div class="cl-n105-sand"></div>
      </div>
    </div>
  `;

  const scene = container.querySelector<HTMLElement>('.cl-n105-scene')!;

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
    t.rx = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    t.ry = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
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
