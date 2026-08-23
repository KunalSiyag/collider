export interface CampfireDepthOptions {
  label?: string;
}

export function createCampfireDepth(
  container: HTMLElement,
  options: CampfireDepthOptions = {},
): () => void {
  const { label = 'CAMPFIRE' } = options;

  container.innerHTML = `
    <style>
      .cl-n106 { height:100%; position:relative; overflow:hidden;
        background:
          radial-gradient(circle at 50% 72%, rgba(249,115,22,.2), transparent 42%),
          linear-gradient(#0c0a09,#1c1917); perspective:800px; }
      .cl-n106-scene { position:absolute; inset:0; transform-style:preserve-3d; will-change:transform; transition:transform .6s ease; }
      .cl-n106-log { position:absolute; left:50%; bottom:22%; width:110px; height:16px; border-radius:999px;
        background:
          repeating-linear-gradient(90deg, #451a03 0 10px, #7c2d12 10px 20px),
          linear-gradient(#92400e,#451a03);
        box-shadow:0 8px 18px rgba(0,0,0,.5);
        transform-origin:center bottom; transform-style:preserve-3d; }
      .cl-n106-log.a { margin-left:-55px; transform:rotateZ(-11deg) rotateY(-26deg); }
      .cl-n106-log.b { margin-left:-52px; bottom:calc(22% + 4px); transform:rotateZ(9deg) rotateY(30deg) translateZ(6px); }
      .cl-n106-log.c { margin-left:-48px; width:96px; bottom:calc(22% + 12px); transform:rotateZ(-3deg) rotateY(4deg) translateZ(14px); }
      .cl-n106-flame { position:absolute; left:50%; bottom:calc(22% + 14px); width:44px; height:74px; margin-left:-22px;
        background:radial-gradient(circle at 50% 88%, #fef08a, #f97316 46%, rgba(239,68,68,.65) 66%, transparent 82%);
        clip-path:polygon(50% 0,72% 34%,92% 62%,78% 88%,50% 100%,22% 88%,8% 60%,28% 32%);
        filter:blur(.5px);
        transform-origin:center bottom;
        animation:cl-n106-flicker .9s ease-in-out infinite alternate, cl-n106-sway 2.6s ease-in-out infinite alternate; }
      @keyframes cl-n106-flicker { from { scale:1 .94; opacity:.92; } to { scale:.94 1.06; opacity:1; } }
      @keyframes cl-n106-sway { from { rotate:-3deg; } to { rotate:3deg; } }
      .cl-n106-ember { position:absolute; left:var(--x); bottom:26%; width:4px; height:4px; border-radius:50%;
        background:#fbbf24; box-shadow:0 0 10px rgba(251,191,36,.9);
        animation:cl-n106-rise linear infinite; animation-delay:var(--d); opacity:0; }
      @keyframes cl-n106-rise { 0% { bottom:28%; opacity:1; } 100% { bottom:76%; opacity:0; } }
      .cl-n106-glowring { position:absolute; left:50%; bottom:16%; width:190px; height:54px; margin-left:-95px; border-radius:50%;
        background:radial-gradient(circle, rgba(249,115,22,.35), transparent 70%);
        filter:blur(10px); animation:cl-n106-pulse 1.4s ease-in-out infinite alternate; }
      @keyframes cl-n106-pulse { from { opacity:.55; scale:.96; } to { opacity:.9; scale:1.04; } }
      .cl-n106-stone { position:absolute; bottom:15%; width:26px; height:13px; border-radius:50% 50% 40% 40%;
        background:radial-gradient(circle at 38% 28%,#57534e,#292524); box-shadow:0 5px 10px rgba(0,0,0,.45); }
      .cl-n106-tag { position:absolute; top:12px; left:16px; color:#fdba7499; font-size:10px; letter-spacing:.44em; text-transform:uppercase; z-index:2; }
    </style>
    <div class="cl-n106">
      <div class="cl-n106-scene">
        <span class="cl-n106-tag">${label}</span>
        <div class="cl-n106-glowring"></div>
        ${Array.from({ length: 6 }, (_, i) => `<i class="cl-n106-ember" style="--x:${(38 + i * 5).toFixed(0)}%;--d:${(-i * 0.53).toFixed(2)}s"></i>`).join('')}
        ${Array.from({ length: 7 }, (_, i) => `<i class="cl-n106-stone" style="left:${(18 + i * 10.5).toFixed(0)}%"></i>`).join('')}
        <div class="cl-n106-log a"></div>
        <div class="cl-n106-log b"></div>
        <div class="cl-n106-log c"></div>
        <div class="cl-n106-flame"></div>
      </div>
    </div>
  `;

  const scene = container.querySelector<HTMLElement>('.cl-n106-scene')!;

  let raf = 0;
  const t = { rx: 0, ry: 0 };
  const c = { rx: 0, ry: 0 };

  function loop() {
    raf = requestAnimationFrame(loop);
    c.rx += (t.rx - c.rx) * 0.07;
    c.ry += (t.ry - c.ry) * 0.07;
    scene.style.transform = `rotateX(${c.rx.toFixed(2)}deg) rotateY(${c.ry.toFixed(2)}deg)`;
  }
  raf = requestAnimationFrame(loop);

  function onMove(e: PointerEvent) {
    const rect = container.getBoundingClientRect();
    t.rx = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    t.ry = ((e.clientX - rect.left) / rect.width - 0.5) * 32;
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
